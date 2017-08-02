import { LeagueGame, SummonersInGame, LeagueGameWeb } from "models/LegaueGame";

export function sortGameInfo(game: LeagueGame): LeagueGameWeb {

    const webGame: LeagueGameWeb = {

        info: game,
        blueTeam: game.Summoners.filter(x => x.Team === 100),
        redTeam: game.Summoners.filter(x => x.Team === 200)
    };

    return webGame;
}

export function percToString(num: number, total: number, fix: number): string {

    if (num === 0 || total === 0) {

        return "0";
    }

    return ((num / total) * 100).toFixed(fix);
}
