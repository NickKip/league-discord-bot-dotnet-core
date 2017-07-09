using System.Collections.Generic;
using System.Diagnostics;
using System.Threading.Tasks;
using Discord.Commands;
using LeagueBot.Entities.LeagueGame;
using LeagueBot.Entities.Subscription;
using LeagueBot.Logger;
using LeagueBot.Services.Riot;
using LeagueBot.Services.Riot.Summoner;

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

        public Registration(RiotService riotService, Stopwatch stopwatch)
        {
            this._riot = riotService;
            this._stopwatch = stopwatch;
            this.Games = new Dictionary<string, LeagueStats>();
            this.Subscriptions = new Dictionary<string, Subscription>();
        }

        // === Commands === //

        [Command("register"), Summary("Registers your summoner name.")]
        public async Task Register([Summary("Your summoner name.")] string summonerName)
        {
            BotLogger.Log($"Summoner name: {summonerName}");

            Subscription subscription;

            if (this.Subscriptions.TryGetValue(Context.Client.CurrentUser.Username, out subscription) == false)
            {
                SummonerAccount summoner = await this._riot.GetSummonerByName(summonerName);

                if (summoner != null)
                {
                    LeagueStats existing;

                    if (this.Games.TryGetValue(summonerName, out existing) == false)
                        this.Games.Add(summonerName, new LeagueStats { LastGameId = 0, Games = new List<LeagueGame>() });

                    this.Subscriptions.Add(Context.Client.CurrentUser.Username, new Subscription { SummonerId = summoner.Id, SummonerName = summonerName });

                    await ReplyAsync($"Summoner: `{summonerName}` has been successfully registered. You will now receive updates when you enter games!");
                }
                else
                    await ReplyAsync($"Summoner: `{summonerName}` was not found. Please try again.");
            }
            else
                await ReplyAsync($"You are already subscribed to summoner: `{summonerName}`.");
        }
    }
}