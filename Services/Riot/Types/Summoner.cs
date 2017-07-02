namespace LeagueBot.Services.Riot.Summoner
{
    public class SummonerAccount
    {
        public int          ProfileIconId       { get; set; }
        public string       Name                { get; set; }
        public long         SummonerLevel       { get; set; }
        public long         RevisionDate        { get; set; }
        public long         Id                  { get; set; }
        public long         AccountId           { get; set; }
    }
}