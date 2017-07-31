export interface LeagueGame {

    GameId: number;
    GameTypeId: number;
    Summoners: SummonersInGame[];
    IsFinished: boolean;
}

export interface SummonersInGame {

    Name: string;
    Id: string;
    Champion: string;
    ChampionId: string;
    Team: number;
    Rank: string;
    Tier: number;
    Wins: number;
    Losses: number;
    IsRegisteredUser: boolean;
    ChampGamesPlayed: number;
}
