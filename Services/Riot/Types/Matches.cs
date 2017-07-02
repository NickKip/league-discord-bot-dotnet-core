namespace LeagueBot.Services.Riot.Matches
{
    public class MatchList
    {
        public MatchV3[]        Matches         { get; set; }
        public int              TotalGames      { get; set; }
        public int              StartIndex      { get; set; }
        public int              EndIndex        { get; set; }
    }

    public class MatchV3
    {
        public string       Lane            { get; set; }
        public long         GameId          { get; set; }
        public int          Champion        { get; set; }
        public string       PlatformId      { get; set; }
        public long         Timestamp       { get; set; }
        public int          Queue           { get; set; }
        public string       Role            { get; set; }
        public int          Season          { get; set; }
    }

    // public class MatchDto
    // {
    //     public int                          SeasonId                    { get; set; }
    //     public int                          QueueId                     { get; set; }
    //     public int                          GameId                      { get; set; }
    //     public ParticipantIdentityDto       ParticipantIdentities       { get; set; }
    //     public string                       GameVersion                 { get; set; }
    //     public string                       PlatformId                  { get; set; }
    //     public string                       GameMode                    { get; set; }
    //     public int                          MapId                       { get; set; }
    //     public string                       GameType                    { get; set; }
    //     public TeamStatsDto                 Teams                       { get; set; }
    //     public ParticipantDto[]             Participants                { get; set; }
    //     public int                          GameDuration                { get; set; }
    //     public int                          GameCreation                { get; set; }
    // }
}