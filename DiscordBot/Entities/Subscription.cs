namespace LeagueBot.Entities.Subscription
{
    public class Subscription
    {
        public long     SummonerId      { get; set; }
        public string   SummonerName    { get; set; }
        public long     LastGameId      { get; set; }
    }
}