using Microsoft.Extensions.Configuration;
using System;
using System.Threading.Tasks;
using Discord;
using Discord.WebSocket;
using System.IO;
using System.Text;
using LeagueBot.Config;
using LeagueBot.Logger;

namespace LeagueBot
{
    public class Program
    {
        private static BotConfig BotConfig { get; set; } 

        private DiscordSocketClient _client;

        public static void Main(string[] args)
            => new Program().MainAsync(args).GetAwaiter().GetResult();

        public async Task MainAsync(string[] args)
        {
            if (args != null)
                this.ReadConfig(args[0]);
            else
                this.ReadConfig("dev");

            BotLogger.Log($"League Bot Version: {BotConfig.Version}");

            DiscordSocketConfig config = new DiscordSocketConfig {

                LogLevel = LogSeverity.Info,
                MessageCacheSize = 5
            };

            _client = new DiscordSocketClient(config);
            _client.Log += Log;

            string token = "";
            await _client.LoginAsync(TokenType.Bot, token);
            await _client.StartAsync();

            _client.Ready += () => {

                BotLogger.Log("League Bot Connected!");
                return Task.CompletedTask;
            };

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

        private Task Log(LogMessage msg)
        {
            BotLogger.Log(msg.ToString());
            return Task.CompletedTask;
        }
    }
}
