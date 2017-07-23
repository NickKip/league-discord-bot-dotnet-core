using Microsoft.Extensions.Configuration;
using System;
using System.Threading.Tasks;
using Discord;
using Discord.WebSocket;
using System.IO;
using System.Text;
using LeagueBot.Bot;
using LeagueBot.Config;
using LeagueBot.Logger;
using LeagueBot.Services.Storage;

namespace LeagueBot
{
    public class Program
    {
        private static BotConfig BotConfig { get; set; }
        private LeagueBot.Bot.Bot Bot;

        public static void Main(string[] args)
            => new Program().MainAsync(args).GetAwaiter().GetResult();

        public async Task MainAsync(string[] args)
        {
            if (args != null)
                this.ReadConfig(args[0]);
            else
                this.ReadConfig("dev");

            BotLogger.Log($"League Bot Config Loaded, Name: {BotConfig.ConfigName} - Version: {BotConfig.Version}");

            StorageService storage = new StorageService();

            this.Bot = new LeagueBot.Bot.Bot(BotConfig, storage);
            await this.Bot.Login();

            await Task.Delay(-1);
        }

        private void ReadConfig(string env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile($"config.{env}.json");

            var config = builder.Build();

            BotConfig = config.GetSection("Bot").Get<BotConfig>();

            // Handle Bindings
            BotLogger.BotConfig = BotConfig;
        }
    }
}
