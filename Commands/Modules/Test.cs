using System.Diagnostics;
using System.Threading.Tasks;
using Discord.Commands;
using LeagueBot.Logger;
using LeagueBot.Services.Riot;

namespace LeagueBot.Commands.Modules
{
    public class TestCommand : ModuleBase
    {
        private RiotService _riot;
        private Stopwatch _stopwatch;

        public TestCommand(RiotService riotService, Stopwatch stopwatch)
        {
            this._riot = riotService;
            this._stopwatch = stopwatch;
        }

        [Command("say"), Summary("Echos a message.")]
        public async Task Say([Remainder, Summary("The text to echo")] string echo)
        {
            this._stopwatch.Start();

            await this._riot.GetChampions();
            var result = await this._riot.GetMatchesByAccount(207017735);

            this._stopwatch.Stop();

            BotLogger.Log($"Did this work: {result.TotalGames} - Time taken: {this._stopwatch.Elapsed}");

            await ReplyAsync(echo);
        }
    }
}