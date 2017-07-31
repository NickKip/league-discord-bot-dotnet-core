import { LeagueGame } from "models/LegaueGame";

export interface State {

    _id?: string;
    _rev?: string;
    leagueGames: LeagueGame[];
    messages: string[];
}
