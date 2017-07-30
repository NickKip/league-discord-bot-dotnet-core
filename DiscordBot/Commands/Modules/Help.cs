using System.Threading.Tasks;
using Discord.Commands;

namespace LeagueBot.Commands.Modules
{
    public class Help : ModuleBase
    {
        // === Constructor === //

        public Help() {}

        // === Commands === //

        [Command("help"), Summary("Displays the help.")]
        public async Task ShowHelp()
        {
            string msg = "Hello, I am LeagueBot. 🤖\n\n";
            
            msg += "I will watch your game status and when you go into a game, I will send you some data on that game to help you!\n\n";

            msg += "It's easy to get started. Just type: `!register your-summoner-name` or `!register \"your summoner name\"` if your name contains spaces. I will then start tracking your status.\n\n";

            msg += "If you would like me to stop tracking your games, then just type: `!remove`.\n\n";

            msg += "Good luck and have fun. 😉";

            await ReplyAsync(msg);
        }
    }
}