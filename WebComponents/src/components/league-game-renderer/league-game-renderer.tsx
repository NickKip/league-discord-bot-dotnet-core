import { BaseComponent } from "components/base/BaseComponent";
import { prop, JSXElement } from "components/base";
import { ClientEvents } from "events";
import { LeagueGame, SummonersInGame, LeagueGameWeb, SummonerSpells } from "models/LegaueGame";
import { sortGameInfo, percToString } from "client/utils";

type Team = {

    blue: SummonersInGame[];
    red: SummonersInGame[];
};

export class LeagueGameRenderer extends BaseComponent {

    // === Props === //

    @prop({ type: Object, attribute: false })
    private game: LeagueGameWeb;

    static get is(): string {
        return "bot-league-game-renderer";
    }

    async _init(): Promise<void> {

        // Temp
        this.game = await this.manager.store.getFromState<LeagueGame>("leagueGames")[0];
    }

    _setupEventListeners(): void {

        this.manager.on(ClientEvents.NewLeagueGame, (game => this.newLeagueGame(game)));
    }

    private async newLeagueGame(game: LeagueGameWeb): Promise<void> {

        this.game = Object.assign({}, game);
        await this.manager.store.saveLeagueGame(game);

        // await this.manager.store.saveMessage(game);
        // this.game = await this.manager.store.getFromState<LeagueGame>("currentLeagueGame");
    }

    componentStyles(): JSXElement {

        return (
            <style>
                { require("./league-game-renderer.scss") }
            </style>
        );
    }

    componentMarkup(): JSXElement {

        if (!this.game || Object.keys(this.game).length === 0) {

            return null;

        }

        return (
            <div className="summTable">
                <div className="summRow header">
                    <div className="blue">
                        <span>Blue</span>
                    </div>
                    <div className="red">
                        <span>Red</span>
                    </div>
                </div>
                { this.game.blueTeam.map((x, idx) => this._renderSummoner(x, this.game.redTeam[idx])) }
            </div>
        );
    }

    private _renderSummoner(blueSummoner: SummonersInGame, redSummoner: SummonersInGame): JSXElement {

        return (

            <div className="summRow">
                <div className="blue">
                    <div><img src={`http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/${blueSummoner.Champion}.png `} width={40} height={40} /></div>
                    <div>
                        <p>
                            <strong>{ blueSummoner.Name } ({ blueSummoner.ChampGamesPlayed })</strong>&nbsp;
                            { blueSummoner.Wins } / { blueSummoner.Losses} (<strong>{ percToString(blueSummoner.Wins, (blueSummoner.Wins + blueSummoner.Losses), 2) }%</strong>)
                            { blueSummoner.Rank } 
                        </p>
                    </div>
                    {/* <div>
                        <img src={`http://ddragon.leagueoflegends.com/cdn/6.24.1/img/spell/${SummonerSpells[blueSummoner.Participant.Spell1Id.toString()].icon}`} width={48} height={48} />
                        <img src={`http://ddragon.leagueoflegends.com/cdn/6.24.1/img/spell/${SummonerSpells[blueSummoner.Participant.Spell2Id.toString()].icon}`} width={48} height={48} />
                    </div> */}
                </div>
                <div className="red">
                    <div><img src={`http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/${redSummoner.Champion}.png `} width={40} height={40} /></div>
                    <div>
                        <p>
                            <strong>{ redSummoner.Name } ({ redSummoner.ChampGamesPlayed })</strong>&nbsp;
                            { redSummoner.Wins } / { redSummoner.Losses} (<strong>{ percToString(redSummoner.Wins, (redSummoner.Wins + redSummoner.Losses), 2) }%</strong>)
                            { redSummoner.Rank } 
                        </p>
                    </div>
                    {/* <div>
                        <img src={`http://ddragon.leagueoflegends.com/cdn/6.24.1/img/spell/${SummonerSpells[redSummoner.Participant.Spell1Id.toString()].icon}`} width={48} height={48} />
                        <img src={`http://ddragon.leagueoflegends.com/cdn/6.24.1/img/spell/${SummonerSpells[redSummoner.Participant.Spell2Id.toString()].icon}`} width={48} height={48} />
                    </div> */}
                </div>
            </div>
        );
    }
}

LeagueGameRenderer.register();
