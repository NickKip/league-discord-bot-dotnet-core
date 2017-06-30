using System.Threading.Tasks;
using Discord.Commands;

namespace LeagueBot.Commands.Modules
{
    public class TestCommand : ModuleBase
    {
        [Command("say"), Summary("Echos a message.")]
        public async Task Say([Remainder, Summary("The text to echo")] string echo)
        {
            await ReplyAsync(echo);
        }
    }
}