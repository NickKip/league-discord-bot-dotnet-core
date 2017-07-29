namespace LeagueBot.Services.Riot.Champion
{
    public class BannedChampion
    {
        public int      PickTurn        { get; set; }
        public int      ChampionId      { get; set; }
        public int      TeamId          { get; set; }
    }

    public class ChampionMasteryDTO
    {
        public bool         ChestGranted                        { get; set; }
        public int          ChampionLevel                       { get; set; }
        public int          ChampionPoints                      { get; set; }
        public long         ChampionId                          { get; set; }
        public long         PlayerId                            { get; set; }
        public long         ChampionPointsUntilNextLevel        { get; set; }
        public long         ChampionPointsSinceLastLevel        { get; set; }
        public long         LastPlayTime                        { get; set; }
    }
}