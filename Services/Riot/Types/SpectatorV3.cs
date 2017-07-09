using System.Collections.Generic;
using LeagueBot.Services.Riot.Champion;
using LeagueBot.Services.Riot.Observer;
using LeagueBot.Services.Riot.Participant;

namespace LeagueBot.Services.Riot.Spectator
{
    public class SpectatorV3
    {
        public long                                     GameId                  { get; set; }
        public long                                     GameStartTime           { get; set; }
        public string                                   PlatformId              { get; set; }
        public string                                   GameMode                { get; set; }
        public int                                      MapId                   { get; set; }
        public string                                   GameType                { get; set; }
        public IEnumerable<BannedChampion>              BannedChampions         { get; set; }
        public Observers                                Observers               { get; set; }
        public IEnumerable<CurrentGameParticipant>      Participants            { get; set; }
        public long                                     GameLength              { get; set; }
        public int                                      GameQueueConfigId       { get; set; }
    }
}