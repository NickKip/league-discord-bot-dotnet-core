using System;
using System.Diagnostics;
using System.Threading.Tasks;
using Discord.Commands;
using LeagueBot.Entities.LeagueGame;
using LeagueBot.Logger;
using LeagueBot.Services.LiveGame;
using LeagueBot.Services.ResponseFormatter;
using LeagueBot.Services.Riot;
using LeagueBot.Services.Storage;

namespace LeagueBot.Commands.Modules
{
    [DontAutoLoad]
    public class TestCommands : ModuleBase
    {
        // === Private === //

        private RiotService _riot;
        private LiveGameService _liveGameService;
        private ResponseFormatterService _formatter;
        private Stopwatch _stopwatch;
        private StorageService _storage;

        // === Constructor === //

        public TestCommands(RiotService riotService, LiveGameService liveGameService, ResponseFormatterService formatter, Stopwatch stopwatch, StorageService storage)
        {
            this._riot = riotService;
            this._liveGameService = liveGameService;
            this._formatter = formatter;
            this._stopwatch = stopwatch;
            this._storage = storage;
        }

        // === Commands === //

        [Command("say"), Summary("Echos a message.")]
        public async Task Say([Remainder, Summary("The text to echo")] string echo)
        {
            this._stopwatch.Start();

            await this._riot.GetChampions();
            var result = await this._riot.GetMatchesByAccount(207017735);

            this._stopwatch.Stop();

            // BotLogger.Log($"Did this work: {result.TotalGames} - Time taken: {this._stopwatch.Elapsed}");

            await ReplyAsync($"Something happened. You have played {result.TotalGames} games. This request took: {this._stopwatch.Elapsed}");
        }

        [Command("runtest"), Summary("Runs a test")]
        public async Task RunTest(string summId, string summName)
        {
            // BotLogger.Log($"Summ Id: {summId}, Summ Name: {summName}");

            this._stopwatch.Start();

            LeagueGame game = await this._liveGameService.GetCurrentGame(Convert.ToInt32(summId), summName);

            this._stopwatch.Stop();

            if (game == null)
            {
                // Most likely the game has ended
                // Need a better error message
                await ReplyAsync($"😢 {summName} is no longer in a game.");
            }
            else {

                BotLogger.Log($"Runtest took {this._stopwatch.Elapsed}");

                await ReplyAsync(this._formatter.FormatGameResponse(game));
            }
        }

        [Command("showsubs"), Summary("Shows the subs")]
        public async Task ShowSubs()
        {
            var subs = this._storage.GetAllSubs();

            if (subs == null)
            {
                await ReplyAsync("No subs registered yet.");
            }
            else 
            {
                string res = "```Markdown\n\n";

                foreach(var s in subs)
                {
                    res += $"{s.Key}: {s.Value.SummonerName}, {s.Value.SummonerId}\n";
                }

                res += "```";

                await ReplyAsync(res);
            }
        }
    }
}