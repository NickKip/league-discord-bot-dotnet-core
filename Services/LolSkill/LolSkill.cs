using System;
using System.IO;
using System.Net;
using System.Threading.Tasks;
using HtmlAgilityPack;
using LeagueBot.Logger;

namespace LeagueBot.Services.LolSkill
{
    public class LolSkillService
    {
        // === Private === //

        private const string Uri = "http://www.lolskill.net/game/EUW/";

        // === Constructor === //

        public LolSkillService() {}

        // === Private Methods === //

        private async Task<string> HttpRequest(string uri)
        {
            WebRequest request = WebRequest.Create(uri);
            request.Method = "GET";

            BotLogger.Log($"Attempting Lol Skill Request: {uri}");

            WebResponse response = await request.GetResponseAsync();

            Stream responseStream = response.GetResponseStream();
            StreamReader sr = new StreamReader(responseStream);
            var streamResult = await sr.ReadToEndAsync();

            return streamResult;
        }

        // === Public Methods === //

        public async Task<HtmlDocument> Get(string summonerName)
        {
            try
            {
                string requestResult = await this.HttpRequest($"{Uri}{summonerName}");

                HtmlDocument html = new HtmlDocument();
                html.LoadHtml(requestResult);

                return html;
            }
            catch (Exception ex)
            {
                BotLogger.Log(ex.ToString());
                return null;
            }
        }
    }
}