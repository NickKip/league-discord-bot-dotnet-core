using System;
using System.Threading.Tasks;
using Discord;
using Discord.Commands;
using Discord.WebSocket;
using LeagueBot.Commands;
using LeagueBot.Config;
using LeagueBot.Logger;
using LeagueBot.Services.LiveGame;
using LeagueBot.Services.ResponseFormatter;
using LeagueBot.Services.Storage;
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
        private ResponseFormatterService _formatter;
        private StorageService _storage;

        // === Constructor === //

        public Bot(BotConfig config, StorageService storage)
        {
            this.Config = config;
            this._liveService = new LiveGameService(this.Config);
            this._storage = storage;
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
            _formatter = new ResponseFormatterService();

            await _commands.Install(_client, _storage, Config);

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

        private async Task UserUpdated(SocketUser previousStatus, SocketUser currentStatus)
        {
            BotLogger.Log($"User update!");

            if (currentStatus.Game != null) 
            {
                BotLogger.Log($"Game update: {currentStatus.Game.Value}");

                // Todo: remove magic string
                if (currentStatus.Game.Value.ToString() == "League of Legends")
                {
                    string currentUser = currentStatus.Username;

                    var sub = this._storage.GetSubscriptionsFromKey(currentUser);

                    if (sub != null)
                    {
                        var game = await this._liveService.GetCurrentGame(sub.SummonerId, sub.SummonerName);

                        var channel = await currentStatus.CreateDMChannelAsync();
                        await channel.SendMessageAsync(this._formatter.FormatGameResponse(game));
                    }
                    else
                    {
                        BotLogger.Log("No subscription found.");
                    }
                }
            }
        }
    }
}