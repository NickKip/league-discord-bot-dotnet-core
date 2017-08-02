using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Discord;
using Discord.Commands;
using Discord.WebSocket;
using LeagueBot.Bot.Events;
using LeagueBot.Commands;
using LeagueBot.Config;
using LeagueBot.Entities.LeagueGame;
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
        // === Public === //

        public event Func<object, GameFinishedEventArgs, Task> GameFinished;

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
            this._storage = new StorageService();
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
            string currentUser = currentStatus.Username;
            var sub = this._storage.GetSubscriptionsFromKey(currentUser);

            BotLogger.Log($"User update: {currentUser} - {currentStatus.Game.Value}!");

            if (currentStatus.Game != null) 
            {
                BotLogger.Log($"Game update: {currentStatus.Game.Value}");

                // Todo: remove magic string
                if (currentStatus.Game.Value.ToString() == "League of Legends")
                {
                    if (sub != null)
                    {
                        LeagueGame game = await this._liveService.GetCurrentGame(sub.SummonerId, sub.SummonerName);
                        
                        if (game != null)
                        {
                            LeagueStats stats = this._storage.GetGamesFromKey(sub.SummonerName);

                            if (stats != null)
                            {
                                stats.LastGameId = game.GameId;
                                stats.Games.Add(game);
                                this._storage.SaveSingleGame(sub.SummonerName, stats);
                            }

                            var channel = await currentStatus.CreateDMChannelAsync();
                            await channel.SendMessageAsync(this._formatter.FormatGameResponse(game));

                            // Emit event
                            await OnGameFinished(new GameFinishedEventArgs(game));
                        }
                    }
                    else
                    {
                        BotLogger.Log("No subscription found.");
                    }
                }
            }
            else
            {
                if (sub != null)
                {
                    // Game has finished
                    LeagueStats stats = this._storage.GetGamesFromKey(sub.SummonerName);

                    if (stats != null)
                    {
                        LeagueGame finishedGame = stats.Games.LastOrDefault(x => x.IsFinished == false);
                        finishedGame.IsFinished = true;

                        // Todo: work out who won

                        // Emit event
                        await OnGameFinished(new GameFinishedEventArgs(finishedGame));
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

                if (message.Channel.Name.Contains("NKRange") == true)
                {
                    LeagueGame game = await this._liveService.Preview();

                    // Test which will echo what we send to the bot
                    await OnGameFinished(new GameFinishedEventArgs(game));
                }
            }
        }

        // === Events === //

        protected async Task OnGameFinished(GameFinishedEventArgs e)
        {
            Func<object, GameFinishedEventArgs, Task> handler = this.GameFinished;

            if (handler == null)
                return;

            Delegate[] invocationList = handler.GetInvocationList();
            Task[] handlerTasks = new Task[invocationList.Length];

            for (int i = 0; i < invocationList.Length; i++)
            {
                handlerTasks[i] = ((Func<object, GameFinishedEventArgs, Task>)invocationList[i])(this, e);
            }

            await Task.WhenAll(handlerTasks);
        }
    }
}