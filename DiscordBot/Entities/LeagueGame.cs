using System.Collections.Generic;
using LeagueBot.Services.Riot.Participant;

namespace LeagueBot.Entities.LeagueGame
{
    public class LeagueStats
    {
        public long                             LastGameId          { get; set; }
        public IList<LeagueGame>                Games               { get; set; }
    }

    public class LeagueGame
    {
        public long                             GameId              { get; set; }
        public int                              GameTypeId          { get; set; }
        // public string                           WinChance           { get; set; }
        public IEnumerable<SummonersInGame>     Summoners           { get; set; }
        public bool                             IsFinished          { get; set; }
    }

    public class SummonersInGame
    {
        public string                           Name                { get; set; }
        public long                             Id                  { get; set; }
        public string                           Champion            { get; set; }
        public int                              ChampionId          { get; set; }
        public int                              Team                { get; set; }
        // public int                              ChampScore          { get; set; }
        // public string                           ChampPerf           { get; set; }
        public string                           Rank                { get; set; }
        public int                              Tier                { get; set; }
        public int                              Wins                { get; set; }
        public int                              Losses              { get; set; }
        public bool                             IsRegisteredUser    { get; set; }
        public int                              ChampGamesPlayed    { get; set; }
        public CurrentGameParticipant           Participant         { get; set; }
    }
}