using System;
using System.Threading.Tasks;
using LeagueBot.Bot;

namespace BotConsole
{
    public class Program
    {
        private Bot Bot;

        public static void Main(string[] args)
            => new Program().MainAsync(args).GetAwaiter().GetResult();

        public async Task MainAsync(string[] args)
        {
            string env = "dev";

            if (args != null)
                env = args[0];

            this.Bot = new Bot(env);
            await this.Bot.Login();

            await Task.Delay(-1);
        }
    }
}
