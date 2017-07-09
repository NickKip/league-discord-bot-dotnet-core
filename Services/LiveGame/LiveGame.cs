using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HtmlAgilityPack;
using LeagueBot.Config;
using LeagueBot.Entities.LeagueGame;
using LeagueBot.Services.LolSkill;
using LeagueBot.Services.Riot;
using LeagueBot.Services.Riot.Participant;
using LeagueBot.Services.Riot.Spectator;

namespace LeagueBot.Services.LiveGame
{
    public class LiveGameService
    {
        // === Private === //

        private BotConfig Config;
        private Dictionary<int, string> ChampionMap;
        private LolSkillService _lolSkill;
        private RiotService _riot;

        // === Constructor === //

        public LiveGameService(BotConfig config)
        {
            this.Config = config;
            this._lolSkill = new LolSkillService();
            this._riot = new RiotService(this.Config);
        }

        // === Public Methods === //

        public async Task<LeagueGame> GetCurrentGame(int summonerId, string summonerName)
        {
            if (this.ChampionMap == null)
                this.ChampionMap = await this._riot.GetChampions();

            SpectatorV3 game = await this._riot.IsInGame(summonerId);
            int teamId = 100;

            if (game != null)
            {
                HtmlDocument lolSkill = await this._lolSkill.Get(summonerName);

                List<long> summIds = new List<long>();

                IEnumerable<SummonersInGame> summonersInGame = game.Participants.Select<CurrentGameParticipant, SummonersInGame>(p => {

                    if (p.SummonerId == summonerId) teamId = p.TeamId;

                    summIds.Add(p.SummonerId);

                    SummonersInGame summ = new SummonersInGame
                    {
                        Name = p.SummonerName,
                        Id = p.SummonerId,
                        Champion = this.ChampionMap[p.ChampionId],
                        Team = p.TeamId,
                        ChampScore = 0,
                        ChampPerf = "",
                        Rank = "",
                        Wins = 0,
                        Losses = 0,
                        IsRegisteredUser = p.SummonerId == summonerId
                    };

                    return summ;
                });

                // TODO: finish this...

                return null;
            }
            else
            {
                return null;
            }
        }
    }
}