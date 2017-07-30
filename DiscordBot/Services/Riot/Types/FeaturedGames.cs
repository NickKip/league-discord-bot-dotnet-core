using System.Collections.Generic;
using LeagueBot.Services.Riot.Champion;
using LeagueBot.Services.Riot.Observer;
using LeagueBot.Services.Riot.Participant;

namespace LeagueBot.Services.Riot.Featured
{
    public class FeaturedGames
    {
        public long                                     ClientRefreshInterval       { get; set; }
        public IEnumerable<FeaturedGameInfo>            GameList                    { get; set; }
    }

    public class FeaturedGameInfo
    {
        public long                                     GameId                      { get; set; }
        public long                                     GameStartTime               { get; set; }
        public string                                   PlatformId                  { get; set; }
        public string                                   GameMode                    { get; set; }
        public long                                     MapId                       { get; set; }
        public string                                   GameType                    { get; set; }
        public BannedChampion[]                         BannedChampions             { get; set; }
        public Observers                                Observers                   { get; set; }
        public IEnumerable<CurrentGameParticipant>      Participants                { get; set; }
        public long                                     GameLength                  { get; set; }
        public long                                     GameQueueConfigId           { get; set; }
    }
}