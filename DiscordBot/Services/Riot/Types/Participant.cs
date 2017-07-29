using LeagueBot.Services.Riot.Masteries;
using LeagueBot.Services.Riot.Runes;

namespace LeagueBot.Services.Riot.Participant
{
    public class CurrentGameParticipant
    {
        public int              ProfileIconId       { get; set; }
        public int              ChampionId          { get; set; }
        public string           SummonerName        { get; set; }
        public Rune[]           Runes               { get; set; }
        public bool             Bot                 { get; set; }
        public int              TeamId              { get; set; }
        public int              Spell1Id            { get; set; }
        public int              Spell2Id            { get; set; }
        public Mastery[]        Masteries           { get; set; }
        public long             SummonerId          { get; set; }
    }
}