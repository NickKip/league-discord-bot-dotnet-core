using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;
using LeagueBot.Config;
using LeagueBot.Logger;
using LeagueBot.Services.Riot.Featured;
using LeagueBot.Services.Riot.League;
using LeagueBot.Services.Riot.Matches;
using LeagueBot.Services.Riot.Spectator;
using LeagueBot.Services.Riot.Summoner;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace LeagueBot.Services.Riot 
{
    public class RiotService
    {
        private BotConfig Config;

        // === Riot Api Details === //

        private string ApiKey;
        private string Region = "";

        // === Consts for Api === //

        private const string Protocol = "https://";
        private const string Champions = ".api.riotgames.com/lol/static-data/v3/champions";
        private const string Featured = ".api.riotgames.com/lol/spectator/v3/featured-games";
        private const string LeagueV3 = ".api.riotgames.com/lol/league/v3/leagues/by-summoner/";
        private const string MatchV3ByAccount = ".api.riotgames.com/lol/match/v3/matchlists/by-account/";
        private const string MatchDtoById = ".api.riotgames.com/lol/match/v3/matches/";
        private const string SummonerV3 = ".api.riotgames.com/lol/summoner/v3/summoners/by-name/";
        private const string SpectatorV3 = ".api.riotgames.com/lol/spectator/v3/active-games/by-summoner/";

        // === Constructor === //

        public RiotService(BotConfig config)
        {
            this.Config = config;
            this.ApiKey = config.RiotKey;
            this.Region = config.Region;
        }

        // === HTTP Request === //

        private async Task<string> HttpRequest(string uri)
        {
            var httpClient = new HttpClient();
            httpClient.DefaultRequestHeaders.Add("X-Riot-Token", this.ApiKey);

            BotLogger.Info($"Attempting Riot API Request: {uri}");

            var response = await httpClient.GetAsync(uri);

            response.EnsureSuccessStatusCode();

            string result = await response.Content.ReadAsStringAsync();

            return result;
        }

        // === Public Methods === //

        public async Task<SummonerAccount> GetSummonerByName(string summonerName)
        {
            try
            {
                string requestResult = await this.HttpRequest($"{Protocol}{Region}{SummonerV3}{summonerName}");

                SummonerAccount summonerData = JsonConvert.DeserializeObject<SummonerAccount>(requestResult);
                return summonerData;
            }
            catch (Exception ex)
            {
                BotLogger.Error(ex.ToString());
                return default(SummonerAccount);
            }
        }

        public async Task<Dictionary<int, string>> GetChampions()
        {
            try
            {
                string requestResult = await this.HttpRequest($"{Protocol}{Region}{Champions}");

                var championData = JsonConvert.DeserializeObject<JObject>(requestResult);
                var championDictionary = new Dictionary<int, string>();

                foreach(JProperty c in championData["data"])
                {
                    championDictionary.Add(c.Value["id"].ToObject<int>(), c.Name);
                }

                return championDictionary;
            }
            catch (Exception ex)
            {
                BotLogger.Error(ex.ToString());
                return default(Dictionary<int, string>);
            }
        }

        public async Task<FeaturedGames> GetFeaturedGames()
        {
            try
            {
                string requestResult = await this.HttpRequest($"{Protocol}{Region}{Featured}");

                FeaturedGames games = JsonConvert.DeserializeObject<FeaturedGames>(requestResult);

                return games;
            }
            catch (Exception ex)
            {
                BotLogger.Error(ex.ToString());
                return default(FeaturedGames);
            }
        }

        public async Task<MatchList> GetMatchesByAccount(int accountId)
        {
            try
            {
                string requestResult = await this.HttpRequest($"{Protocol}{Region}{MatchV3ByAccount}{accountId}");

                MatchList list = JsonConvert.DeserializeObject<MatchList>(requestResult);

                return list;
            }
            catch (Exception ex)
            {
                BotLogger.Error(ex.ToString());
                return default(MatchList);
            }
        }

        public async Task<MatchList> GetMatchesByAccountAndChamp(long accountId, int championId)
        {
            // Todo calculate these
            int queue = 420;
            int season = 9;

            try
            {
                // Todo: search for more and different queues
                string requestResult = await this.HttpRequest($"{Protocol}{Region}{MatchV3ByAccount}{accountId}?queue={queue}&season={season}&champion={championId}");

                MatchList list = JsonConvert.DeserializeObject<MatchList>(requestResult);

                return list;
            }
            catch (Exception ex)
            {
                BotLogger.Log($"😕 Couldn't find any matches for: {accountId} with params: Queue {queue}, Season {season} & Champion {championId}");
                BotLogger.Error(ex.ToString());
                return default(MatchList);
            }
        }

        public async Task<SpectatorV3> IsInGame(long summonerId)
        {
            try
            {
                string requestResult = await this.HttpRequest($"{Protocol}{Region}{SpectatorV3}{summonerId}");

                SpectatorV3 spectator = JsonConvert.DeserializeObject<SpectatorV3>(requestResult);

                return spectator;
            }
            catch (Exception ex)
            {
                BotLogger.Error(ex.ToString());
                return default(SpectatorV3);
            }
        }

        public async Task<IEnumerable<LeagueListDTO>> GetSummonerLeagueInfo(long summonerId)
        {
            try
            {
                string requestResult = await this.HttpRequest($"{Protocol}{Region}{LeagueV3}{summonerId}");

                IEnumerable<LeagueListDTO> leagueInfo = JsonConvert.DeserializeObject<IEnumerable<LeagueListDTO>>(requestResult);

                return leagueInfo;
            }
            catch (Exception ex)
            {
                BotLogger.Log($"😕 Couldn't find any league info for: {summonerId}.");
                BotLogger.Error(ex.ToString());
                return default(IEnumerable<LeagueListDTO>);
            }
        }
    }
}