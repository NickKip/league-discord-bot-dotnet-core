using System;
using System.IO;
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
using Microsoft.Extensions.Configuration;
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

        public Bot(string env)
        {
            this.ReadConfig(env);
            this._liveService = new LiveGameService(this.Config);
            this._storage = new StorageService();;
        }

        // === Public Methods === //

        public void ReadConfig(string env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath($"{Directory.GetCurrentDirectory()}/Config/")
                .AddJsonFile($"config.{env}.json");

            var config = builder.Build();

            Config = config.GetSection("Bot").Get<BotConfig>();

            // Handle Bindings
            BotLogger.BotConfig = Config;
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
            _formatter = new ResponseFormatterService();

            await _commands.Install(_client, _storage, Config);

            await _client.LoginAsync(TokenType.Bot, Config.Token);
            await _client.StartAsync();

            _client.MessageReceived += MessageReceived;
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
            BotLogger.Log($"User update: {currentStatus.Username} - {currentStatus.Game.Value}!");

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

        private async Task MessageReceived(SocketMessage message)
        {
            bool isCommand = message.Content.StartsWith("!");

            if (message.Channel.Name.Contains("@") == true && !isCommand && message.Source.ToString() != "Bot")
            {
                await message.Channel.SendMessageAsync("Hello, I am LeagueBot. 🤖 I don't really talk, so to see what I can do, type: `!help`.");
            }
        }
    }
}