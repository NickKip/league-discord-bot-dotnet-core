using System;
using System.Threading.Tasks;
using Discord;
using Discord.Commands;
using Discord.WebSocket;
using LeagueBot.Commands;
using LeagueBot.Config;
using LeagueBot.Logger;
using Microsoft.Extensions.DependencyInjection;

namespace LeagueBot.Bot 
{
    public class Bot
    {
        private BotConfig Config;

        private CommandHandler _commands;
        private DiscordSocketClient _client;
        private IServiceProvider _services;

        public Bot(BotConfig config)
        {
            this.Config = config;
        }

        public async Task Login()
        {
            DiscordSocketConfig config = new DiscordSocketConfig {

                LogLevel = LogSeverity.Info,
                MessageCacheSize = 5
            };

            _client = new DiscordSocketClient(config);
            _client.Log += Log;
            _commands = new CommandHandler();

            await _commands.Install(_client, Config);

            await _client.LoginAsync(TokenType.Bot, Config.Token);
            await _client.StartAsync();

            _client.Ready += () => {

                BotLogger.Log("League Bot Connected!");
                return Task.CompletedTask;
            };
        }

        private Task Log(LogMessage msg)
        {
            BotLogger.Log(msg.ToString());
            return Task.CompletedTask;
        }
    }
}