using System.Threading.Tasks;
using Discord.Commands;
using LeagueBot.Entities.LeagueGame;
using LeagueBot.Services.LiveGame;
using LeagueBot.Services.ResponseFormatter;

namespace LeagueBot.Commands.Modules
{
    public class Help : ModuleBase
    {
        // === Private === //

        private LiveGameService _liveGameService;
        private ResponseFormatterService _formatter;

        // === Constructor === //

        public Help(LiveGameService liveGameService, ResponseFormatterService formatter)
        {
            this._liveGameService = liveGameService;
            this._formatter = formatter;
        }

        // === Commands === //

        [Command("help"), Summary("Displays the help.")]
        public async Task ShowHelp()
        {
            string msg = "Hello, I am LeagueBot. 🤖\n\n";
            
            msg += "I will watch your game status and when you go into a game, I will send you some data on that game to help you!\n\n";

            msg += "It's easy to get started. Just type: `!register your-summoner-name` or `!register \"your summoner name\"` if your name contains spaces. I will then start tracking your status.\n\n";

            msg += "If you would like me to stop tracking your games, then just type: `!remove`.\n\n";

            msg += "To see a preview of this in action and to see the data you get back, just type: `!preview`.\n\n";

            msg += "Good luck and have fun. 😉";

            await ReplyAsync(msg);
        }

        [Command("preview"), Summary("Shows a preview.")]
        public async Task Preview()
        {
            LeagueGame game = await this._liveGameService.Preview();

            if (game != null)
                await ReplyAsync(this._formatter.FormatGameResponse(game));
            else
                await ReplyAsync("😳 Uh-oh, something went wrong. Try again maybe...?");
        }
    }
}