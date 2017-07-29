using System.Collections.Generic;

namespace LeagueBot.Services.Riot.League
{
    public enum LeagueTiers
    {
        UNRANKED = 0,
        BRONZE = 1,
        SILVER = 2,
        GOLD = 3,
        PLATINUM = 4,
        DIAMOND = 5,
        MASTERS = 6,
        CHALLENGER = 7
    }

    public class LeagueListDTO
    {
        public string                           Tier                    { get; set; }
        public string                           Queue                   { get; set; }
        public string                           Name                    { get; set; }
        public IEnumerable<LeagueItemDTO>       Entries                 { get; set; }
    }

    public class LeagueItemDTO
    {
        public string                           Rank                    { get; set; }
        public bool                             HotStreak               { get; set; }
        public MiniSeriesDTO                    MiniSeries              { get; set; }
        public int                              Wins                    { get; set; }
        public bool                             Veteran                 { get; set; }
        public int                              Losses                  { get; set; }
        public string                           PlayerOrTeamId          { get; set; }
        public string                           PlayerOrTeamName        { get; set; }
        public bool                             Inactive                { get; set; }
        public bool                             FreshBlood              { get; set; }
        public int                              LeaguePoints            { get; set; }
    }

    public class MiniSeriesDTO
    {
        public int                              Wins                    { get; set; }
        public int                              Losses                  { get; set; }
        public int                              Target                  { get; set; }
        public string                           Process                 { get; set; }
    }
}