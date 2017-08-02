import { LeagueGame, LeagueGameWeb } from "models/LegaueGame";

export interface State {

    _id?: string;
    _rev?: string;
    leagueGames: LeagueGameWeb[];
    messages: string[];
}
