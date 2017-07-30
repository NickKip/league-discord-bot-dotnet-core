namespace LeagueBot.Config 
{
    public class BotConfig 
    {
        // === Bot Config === //

        public string ConfigName {get; set; }
        public string Version { get; set; }
        public string Token { get; set; }
        public bool Logging { get; set; }
        public string LogLevel { get; set; }
        public bool TestCommands { get; set; }

        // === League Config === //

        public string LeagueGameName { get; set; }
        public string RiotKey { get; set; }
        public string Region { get; set; }
    }
}