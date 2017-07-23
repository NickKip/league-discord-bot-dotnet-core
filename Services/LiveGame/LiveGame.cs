using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HtmlAgilityPack;
using HtmlAgilityPack.CssSelectors.NetCore;
using LeagueBot.Config;
using LeagueBot.Entities.LeagueGame;
using LeagueBot.Logger;
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

        public async Task<LeagueGame> GetCurrentGame(long summonerId, string summonerName)
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

                    // Todo: wrap this in some safety
                    int champScore = 0;
                    string champPerf = "0";

                    try
                    {
                        champScore = Convert.ToInt32(lolSkill.QuerySelector($"div[data-summoner-id=\"{p.SummonerId}\"] div .skillscore").InnerHtml.Replace(",", ""));
                        champPerf = lolSkill.QuerySelector($"div[data-summoner-id=\"{p.SummonerId}\"] .stats .stat").InnerHtml;
                    }
                    catch (Exception ex)
                    {
                        BotLogger.Log($"Failed to get champScore or champPerf: {ex.ToString()}");
                    }

                    SummonersInGame summ = new SummonersInGame
                    {
                        Name = p.SummonerName,
                        Id = p.SummonerId,
                        Champion = this.ChampionMap[p.ChampionId],
                        Team = p.TeamId,
                        ChampScore = champScore,
                        ChampPerf = champPerf,
                        Rank = "",
                        Wins = 0,
                        Losses = 0,
                        IsRegisteredUser = p.SummonerId == summonerId
                    };

                    return summ;
                }).OrderByDescending(s => s.ChampScore);

                // Todo: get ranked info for each summoner ... do we need to query riot for this?
                // Yes we should

                string winChance = "";

                try
                {
                    winChance = lolSkill.QuerySelector($"div.team-{teamId} .winchance .tooltip").InnerHtml;
                }
                catch (Exception ex)
                {
                    BotLogger.Log($"Failed to get winChance: {ex.ToString()}");
                }

                LeagueGame leagueGame = new LeagueGame
                {
                    GameId = game.GameId,
                    GameTypeId = game.GameQueueConfigId,
                    WinChance = winChance,
                    Summoners = summonersInGame,
                    IsFinished = false
                };

                return leagueGame;
            }
            else
            {
                return null;
            }
        }
    }
}