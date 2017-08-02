export interface LeagueGameWeb {

    info: LeagueGame;
    blueTeam: SummonersInGame[];
    redTeam: SummonersInGame[];
}

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
    Participant: CurrentGameParticipant;
}

export interface CurrentGameParticipant {

    ProfileIconId: number;
    ChampionId: number;
    SummonerName: string;
    Runes: Rune[];
    Bot: boolean;
    TeamId: number;
    Spell1Id: number;
    Spell2Id: number;
    Masteries: Mastery[];
    SummonerId: number;
}

// === Rune === //

export type Rune = {
    count?: number;
    runeId: number;
    rank?: number;
};

// === Mastery === //

export type Mastery = {
    masteryId: number;
    rank: number;
};

export type SummonerSpells = {

    [key: string]: {
        name: string;
        icon: string;
    }
};

export const SummonerSpells: SummonerSpells = {

    "21": { name: "SummonerBarrier", icon: "SummonerBarrier.png" },
    "1": { name: "SummonerBoost", icon: "SummonerBoost.png" },
    "14": { name: "SummonerDot", icon: "SummonerDot.png" },
    "3": { name: "SummonerExhaust", icon: "SummonerExhaust.png" },
    "4": { name: "SummonerFlash", icon: "SummonerFlash.png" },
    "6": { name: "SummonerHaste", icon: "SummonerHaste.png" },
    "7": { name: "SummonerHeal", icon: "SummonerHeal.png" },
    "13": { name: "SummonerMana", icon: "SummonerMana.png" },
    "30": { name: "SummonerPoroRecall", icon: "SummonerPoroRecall.png" },
    "31": { name: "SummonerPoroThrow", icon: "SummonerPoroThrow.png" },
    "11": { name: "SummonerSmite", icon: "SummonerSmite.png" },
    "32": { name: "SummonerSnowball", icon: "SummonerSnowball.png" },
    "12": { name: "SummonerTeleport", icon: "SummonerTeleport.png" }
};
