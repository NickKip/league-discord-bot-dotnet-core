using System.Collections.Generic;
using System.Diagnostics;
using System.Threading.Tasks;
using Discord.Commands;
using LeagueBot.Entities.LeagueGame;
using LeagueBot.Entities.Subscription;
using LeagueBot.Logger;
using LeagueBot.Services.Riot;

namespace LeagueBot.Commands.Modules
{
    public class Registration : ModuleBase
    {
        // === Injected === //

        private RiotService _riot;
        private Stopwatch _stopwatch;

        // === Private Props === //

        private Dictionary<string, LeagueStats> Games;
        private Dictionary<string, Subscription> Subscriptions;

        // === Constructor === //

        public Registration()
        {
            this.Games = new Dictionary<string, LeagueStats>();
            this.Subscriptions = new Dictionary<string, Subscription>();
        }

        // === Commands === //

        [Command("register"), Summary("Echos a message.")]
        public async Task Register([Summary("The summoner name you wish to track.")] string summonerName)
        {
            BotLogger.Log($"Summoner name: {summonerName}");

            LeagueStats existing;

            if (this.Games.TryGetValue(summonerName, out existing) == false)
            {
                this.Games.Add(summonerName, new LeagueStats { LastGameId = 0, Games = new List<LeagueGame>() });
            }

            Subscription subscription;

            if (this.Subscriptions.TryGetValue(Context.Client.CurrentUser.Username, out subscription) == false)
            {
                long summonerId = this._riot.GetSummonerId(summonerName);

                if (summonerId != 0)
                {
                    this.Subscriptions.Add(Context.Client.CurrentUser.Username, new Subscription { SummonerId = summonerId, SummonerName = summonerName });

                    await ReplyAsync($"Summoner: `{summonerName}` has been successfully registered. You will now receive updates on their live games!");
                }
                else
                    await ReplyAsync($"Summoner: `{summonerName}` was not found. Please try again.");
            }
            else
                await ReplyAsync($"You are already subscribed to summoner: `{summonerName}`.");
        }
    }
}