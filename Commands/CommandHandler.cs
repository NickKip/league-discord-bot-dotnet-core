using System;
using System.Diagnostics;
using System.Reflection;
using System.Threading.Tasks;
using Discord.Commands;
using Discord.WebSocket;
using LeagueBot.Config;
using LeagueBot.Logger;
using LeagueBot.Services.Riot;
using Microsoft.Extensions.DependencyInjection;

namespace LeagueBot.Commands
{
    public class CommandHandler 
    {
        private CommandService _commands;
        private DiscordSocketClient _client;
        private IServiceProvider _services;

        public async Task Install(DiscordSocketClient client, BotConfig config)
        {
            this._client = client;
            this._commands = new CommandService();

            // Inject Module Services

            _services = new ServiceCollection()
                .AddSingleton(new RiotService(config))
                .AddSingleton(new Stopwatch())
                .BuildServiceProvider();

            _client.MessageReceived += HandleCommand;
            await _commands.AddModulesAsync(Assembly.GetEntryAssembly());
        }

        private async Task HandleCommand(SocketMessage messageParam)
        {
            var message = messageParam as SocketUserMessage;
            if (message == null) return;

            int argPos = 0;

            if (!(message.HasCharPrefix('!', ref argPos) || message.HasMentionPrefix(_client.CurrentUser, ref argPos))) return;

            BotLogger.Log($"New command received: {message}");

            var context = new CommandContext(_client, message);

            var result = await _commands.ExecuteAsync(context, argPos, _services);

            if (!result.IsSuccess)
                await context.Channel.SendMessageAsync(result.ErrorReason);
        }
    }
}