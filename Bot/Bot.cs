using System;
using System.Threading.Tasks;
using Discord;
using Discord.Commands;
using Discord.WebSocket;
using LeagueBot.Commands;
using LeagueBot.Config;
using LeagueBot.Logger;
using LeagueBot.Services.LiveGame;
using Microsoft.Extensions.DependencyInjection;

namespace LeagueBot.Bot 
{
    public class Bot
    {
        // === Private === //

        private BotConfig Config;
        private CommandHandler _commands;
        private DiscordSocketClient _client;
        private LiveGameService _liveService;

        // === Constructor === //

        public Bot(BotConfig config)
        {
            this.Config = config;
            this._liveService = new LiveGameService(this.Config);
        }

        // === Public Methods === //

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

            _client.GuildMemberUpdated += UserUpdated;

            _client.Ready += () => {

                BotLogger.Log("League Bot Connected!");
                return Task.CompletedTask;
            };
        }

        // === Private Methods === //

        private Task Log(LogMessage msg)
        {
            BotLogger.Log(msg.ToString());
            return Task.CompletedTask;
        }

        private Task UserUpdated(SocketUser previousStatus, SocketUser currentStatus)
        {
            BotLogger.Log($"User update!");

            if (currentStatus.Game != null)
                BotLogger.Log($"Game update: {currentStatus.Game.Value}");

            return Task.CompletedTask;
        }
    }
}