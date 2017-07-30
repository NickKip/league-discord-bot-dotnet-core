using System.Collections.Generic;
using LeagueBot.Entities.LeagueGame;
using LeagueBot.Entities.Subscription;
using Microsoft.Extensions.Caching.Memory;

namespace LeagueBot.Services.Storage
{
    public class StorageService
    {
        // === Private === //

        private MemoryCache _cache;

        // === Constructor === //

        public StorageService()
        {
            this._cache = new MemoryCache(new MemoryCacheOptions());

            // Todo: Replace fake with persistent
                // options include db or blob storage somewhere
        }

        // === Subscriptions === //

        public void SaveSubscriptions(Dictionary<string, Subscription> subscriptions)
        {
            this._cache.Set("subs", subscriptions);
        }

        public void SaveSingleSubscription(string key, Subscription sub)
        {
            Dictionary<string, Subscription> subs = this.GetAllSubs();

            if (this.GetSubscriptionsFromKey(key) != null)
            {
                subs[key] = sub;
                this.SaveSubscriptions(subs);
            }
        }

        public Dictionary<string, Subscription> GetAllSubs()
        {
            Dictionary<string, Subscription> subs;

            this._cache.TryGetValue("subs", out subs);

            if (subs != null)
                return subs;

            return null;
        }

        public Subscription GetSubscriptionsFromKey(string key)
        {
            Dictionary<string, Subscription> subs;

            this._cache.TryGetValue("subs", out subs);

            if (subs != null)
            {
                Subscription sub;

                subs.TryGetValue(key, out sub);

                return sub;
            }

            return null;
        }

        public Dictionary<string, Subscription> GetAllSubscriptions()
        {
            Dictionary<string, Subscription> subs;

            this._cache.TryGetValue("subs", out subs);

            if (subs != null)
                return subs;
            else
                return new Dictionary<string, Subscription>();
        }

        // === Games === //

        public void SaveGames(Dictionary<string, LeagueStats> games)
        {
            this._cache.Set("games", games);
        }

        public void SaveSingleGame(string key, LeagueStats game)
        {
            Dictionary<string, LeagueStats> games = this.GetAllGames();

            if (this.GetGamesFromKey(key) != null)
            {
                games[key] = game;
                this.SaveGames(games);
            }
        }

        public LeagueStats GetGamesFromKey(string key)
        {
            Dictionary<string, LeagueStats> games;

            this._cache.TryGetValue("games", out games);

            if (games != null)
            {
                LeagueStats game;

                games.TryGetValue(key, out game);

                return game;
            }

            return null;
        }

        public Dictionary<string, LeagueStats> GetAllGames()
        {
            Dictionary<string, LeagueStats> games;

            this._cache.TryGetValue("games", out games);

            if (games != null)
                return games;
            else
                return new Dictionary<string, LeagueStats>();
        }
    }
}