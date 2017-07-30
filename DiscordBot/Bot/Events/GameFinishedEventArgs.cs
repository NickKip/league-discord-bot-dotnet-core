using System;
using LeagueBot.Entities.LeagueGame;

namespace LeagueBot.Bot.Events
{
    public class GameFinishedEventArgs : EventArgs
    {
        // === Public === //

        public LeagueGame Game;
        public string Message;

        // === Constructor === //

        public GameFinishedEventArgs(LeagueGame game, string message = null)
        {
            this.Game = game;
            this.Message = message;
        }
    }
}