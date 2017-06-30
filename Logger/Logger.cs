using System;
using LeagueBot.Config;

namespace LeagueBot.Logger {
    public static class BotLogger {

        public static BotConfig BotConfig;

        public static void Log(string msg)
        {
            if (BotConfig.Logging) 
                Console.WriteLine(msg);
        }
    }
}