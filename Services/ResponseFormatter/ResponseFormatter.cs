using System.Collections.Generic;
using System.Linq;
using LeagueBot.Entities.LeagueGame;

namespace LeagueBot.Services.ResponseFormatter
{
    public class ResponseFormatterService
    {
        // === Constructor === //

        public ResponseFormatterService() {}

        // === Private === //

        private Dictionary<string, int> GeneratePaddings()
        {
            var dict = new Dictionary<string, int>();

            dict.Add("name", 0);
            dict.Add("score", 0);
            dict.Add("perf", 0);
            dict.Add("rank", 0);
            dict.Add("wl", 0);

            return dict;
        }

        // === Public === //

        public string FormatGameResponse(LeagueGame leagueGame)
        {
            int minPad = 5;
            Dictionary<string, int> paddings = this.GeneratePaddings();

            // Works out longest string length and sets padding to its value
            foreach (var s in leagueGame.Summoners)
            {
                if (s.Champion.Length > paddings["name"]) paddings["name"] = s.Champion.Length;
                if (s.ChampScore.ToString().Length > paddings["score"]) paddings["score"] = s.ChampScore.ToString().Length;
                if (s.ChampPerf.Length > paddings["perf"]) paddings["perf"] = s.ChampPerf.Length;
                if (s.Rank.Length > paddings["rank"]) paddings["rank"] = s.Rank.Length;
            }

            // Yay
            paddings["name"] += minPad;
            paddings["score"] += minPad;
            paddings["perf"] += minPad;
            paddings["rank"] += minPad;
            paddings["wl"] += minPad;

            // Rewrite this...
            string[] champs = leagueGame.Summoners.Select<SummonersInGame, string>(s => { 

                string isRegisteredSum = s.IsRegisteredUser == true ? "# " : "";

                string name = $"{isRegisteredSum}{s.Champion}";
                if (name.Length < paddings["name"]) name = name.PadRight(paddings["name"]);

                string champScore = $"{s.ChampScore}";
                if (champScore.Length < paddings["score"]) champScore = champScore.PadRight(paddings["score"]);

                string champPerf = $"{s.ChampPerf}";
                if (champPerf.Length < paddings["perf"]) champPerf = champPerf.PadRight(paddings["perf"]);

                string rank = $"{s.Rank}";
                if (rank.Length < paddings["rank"]) rank = rank.PadRight(paddings["rank"]);

                return $"{name}{champScore}{champPerf}{rank} (WL: {s.Wins} / {s.Losses})";
             }).ToArray();

            string res = $"```Markdown\n\n# {leagueGame.WinChance} \n\n";

            foreach(var s in champs)
            {
                res += $"{s}\n";
            }

            res += "```";

            return res;
        }
    }
}