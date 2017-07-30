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

        public static void Info(string err)
        {
            if (BotConfig.Logging && BotConfig.LogLevel.Contains("info"))
                Console.WriteLine(err);
        }

        public static void Error(string err)
        {
            if (BotConfig.Logging && BotConfig.LogLevel.Contains("error"))
                Console.WriteLine(err);
        }
    }
}