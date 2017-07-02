using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Threading.Tasks;
using LeagueBot.Config;
using LeagueBot.Logger;
using LeagueBot.Services.Riot.Matches;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace LeagueBot.Services.Riot 
{
    public class RiotService
    {
        private BotConfig config;

        // === Riot Api Details === //

        private string ApiKey;
        private string Region = "";

        // === Consts for Api === //

        private const string Protocol = "https://";
        private const string Champions = ".api.riotgames.com/lol/static-data/v3/champions";
        private const string LeagueV2 = "euw.api.riotgames.com/api/lol/EUW/v2.5/league/by-summoner/";
        private const string MatchV3ByAccount = ".api.riotgames.com/lol/match/v3/matchlists/by-account/";
        private const string MatchDtoById = ".api.riotgames.com/lol/match/v3/matches/";
        private const string SummonerV3 = ".api.riotgames.com/lol/summoner/v3/summoners/by-name/";
        private const string SpectatorV3 = ".api.riotgames.com/lol/spectator/v3/active-games/by-summoner/";

        // === Constructor === //

        public RiotService(BotConfig config)
        {
            this.config = config;
            this.ApiKey = config.RiotKey;
            this.Region = config.Region;
        }

        // === HTTP Request === //

        private async Task<string> HttpRequest(string uri)
        {
            WebRequest request = WebRequest.Create(uri);
            request.Method = "GET";
            request.Headers["X-Riot-Token"] = this.ApiKey;

            BotLogger.Log($"Attempting Riot API Request: {uri}");

            WebResponse response = await request.GetResponseAsync();

            Stream responseStream = response.GetResponseStream();
            StreamReader sr = new StreamReader(responseStream);
            var streamResult = await sr.ReadToEndAsync();

            return streamResult;
        }

        // === Public Methods === //

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
                BotLogger.Log(ex.ToString());
                return default(Dictionary<int, string>);
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
                BotLogger.Log(ex.ToString());
                return default(MatchList);
            }
        }

    }
}