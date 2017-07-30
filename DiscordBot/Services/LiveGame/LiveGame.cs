using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using LeagueBot.Config;
using LeagueBot.Entities.LeagueGame;
using LeagueBot.Logger;
using LeagueBot.Services.Riot;
using LeagueBot.Services.Riot.Featured;
using LeagueBot.Services.Riot.League;
using LeagueBot.Services.Riot.Matches;
using LeagueBot.Services.Riot.Participant;
using LeagueBot.Services.Riot.Spectator;
using LeagueBot.Services.Riot.Summoner;

namespace LeagueBot.Services.LiveGame
{
    public class LiveGameService
    {
        // === Private === //

        private BotConfig Config;
        private Dictionary<int, string> ChampionMap;
        private RiotService _riot;

        // === Constructor === //

        public LiveGameService(BotConfig config)
        {
            this.Config = config;
            this._riot = new RiotService(this.Config);
        }

        // === Public Methods === //

        public async Task<LeagueGame> Preview()
        {
            FeaturedGames games = await this._riot.GetFeaturedGames();

            if (games == null)
                return null;

            string summName = games.GameList.FirstOrDefault().Participants.FirstOrDefault().SummonerName;

            SummonerAccount acc = await this._riot.GetSummonerByName(summName);

            if (acc == null)
                return null;

            LeagueGame game = await this.GetCurrentGame(acc.Id, acc.Name);

            return game;
        }

        public async Task<LeagueGame> GetCurrentGame(long summonerId, string summonerName)
        {
            if (this.ChampionMap == null)
                this.ChampionMap = await this._riot.GetChampions();

            SpectatorV3 game = await this._riot.IsInGame(summonerId);
            int teamId = 100;

            if (game != null)
            {
                IList<SummonersInGame> summonersInGame = game.Participants.Select<CurrentGameParticipant, SummonersInGame>(p => {

                    if (p.SummonerId == summonerId) teamId = p.TeamId;

                    SummonersInGame summ = new SummonersInGame
                    {
                        Name = p.SummonerName,
                        Id = p.SummonerId,
                        Champion = this.ChampionMap[p.ChampionId],
                        ChampionId = p.ChampionId,
                        Team = p.TeamId,
                        Rank = "",
                        Wins = 0,
                        Losses = 0,
                        IsRegisteredUser = p.SummonerId == summonerId
                    };

                    return summ;
                }).ToList();

                foreach(var s in summonersInGame)
                {
                    // Todo: remove magic strings

                    IEnumerable<LeagueListDTO> leagues = await this._riot.GetSummonerLeagueInfo(s.Id);

                    // Cache this info and try to find in cache first. Could work out how many times we have played this player before...?
                    SummonerAccount summonerAccount = await this._riot.GetSummonerByName(s.Name);

                    MatchList matches = await this._riot.GetMatchesByAccountAndChamp(summonerAccount.AccountId, s.ChampionId);

                    LeagueListDTO soloQueue = leagues.FirstOrDefault(x => x.Queue == "RANKED_SOLO_5x5");

                    if (soloQueue != null)
                    {
                        LeagueItemDTO summoner = soloQueue.Entries.FirstOrDefault(x => x.PlayerOrTeamName == s.Name);

                        s.Rank = soloQueue.Tier;
                        s.Wins = summoner.Wins;
                        s.Tier = (int)Enum.Parse(typeof(LeagueTiers), soloQueue.Tier);
                        s.Losses = summoner.Losses;
                    }
                    else
                    {
                        string summLeagues = string.Join(",", leagues.Select<LeagueListDTO, string>(x => x.Queue).ToArray());

                        BotLogger.Log($"🤔 No ranked solo queue found for: {s.Name} ({s.Champion}). Leagues found: {summLeagues}");

                        s.Rank = "UNRANKED";
                        s.Tier = (int)LeagueTiers.UNRANKED;
                        s.Wins = 0;
                        s.Losses = 0;
                    }

                    if (matches != null)
                        s.ChampGamesPlayed = matches.TotalGames;
                    else
                        s.ChampGamesPlayed = 0;

                    // s.Champion = $"{s.Champion} ({s.ChampGamesPlayed})";
                }

                summonersInGame = summonersInGame.OrderByDescending(x => x.Tier).ThenByDescending(x => x.Wins).ToList();

                LeagueGame leagueGame = new LeagueGame
                {
                    GameId = game.GameId,
                    GameTypeId = game.GameQueueConfigId,
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