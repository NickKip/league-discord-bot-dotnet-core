using System;
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
            dict.Add("games", 0);
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
                if (s.ChampGamesPlayed.ToString().Length > paddings["games"]) paddings["games"] = s.ChampGamesPlayed.ToString().Length;
                if (s.Rank.Length > paddings["rank"]) paddings["rank"] = s.Rank.Length;
            }

            // Yay
            paddings["name"] += minPad;
            paddings["games"] += minPad;
            // paddings["score"] += minPad;
            // paddings["perf"] += minPad;
            paddings["rank"] += minPad;
            paddings["wl"] += minPad;

            // Rewrite this...
            string[] champs = leagueGame.Summoners.Select<SummonersInGame, string>(s => { 

                string isRegisteredSum = s.IsRegisteredUser == true ? "# " : "";

                string name = $"{isRegisteredSum}{s.Champion}";
                if (name.Length < paddings["name"]) name = name.PadRight(paddings["name"]);

                string games = $"{s.ChampGamesPlayed}";
                if (games.Length < paddings["games"]) games = games.PadRight(paddings["games"]);

                string rank = $"{s.Rank}";
                if (rank.Length < paddings["rank"]) rank = rank.PadRight(paddings["rank"]);

                double winRate = 0;

                if (s.Wins != 0 && s.Losses != 0)
                {
                    var total = s.Wins + s.Losses;

                    winRate = (double)Math.Round((double)((double)s.Wins / total) * 100, 2);
                    //winRate = Math.Round(winRate * 100, 2);
                }

                return $"{name}{games}{rank} (WL: {s.Wins} / {s.Losses}: {winRate}%)";
             }).ToArray();

            string res = $"```Markdown\n\n";

            foreach(var s in champs)
            {
                res += $"{s}\n";
            }

            res += "```";

            return res;
        }
    }
}