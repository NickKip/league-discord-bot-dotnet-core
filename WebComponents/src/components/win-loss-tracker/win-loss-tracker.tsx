import { BaseComponent } from "components/base/BaseComponent";
import { prop, JSXElement } from "components/base";
import { ClientEvents } from "events";
import { LeagueGame, SummonersInGame, LeagueGameWeb, SummonerSpells } from "models/LegaueGame";
import { sortGameInfo, percToString } from "client/utils";

export class WinLossTracker extends BaseComponent {

    // === Props === //

    @prop({ type: Number, attribute: false })
    private wins: number = 0;

    @prop({ type: Number, attribute: false })
    private losses: number = 0;

    static get is(): string {
        return "bot-win-loss-tracker";
    }

    async _init(): Promise<void> {
    }

    _setupEventListeners(): void {
    }

    componentStyles(): JSXElement {

        return (
            <style>
                { require("./win-loss-tracker.scss") }
            </style>
        );
    }

    componentMarkup(): JSXElement {

        return (
            <div>
                <div className="results">
                    <p className="wins">0</p>
                    <p className="sep">/</p>
                    <p className="losses">0</p>
                </div>
            </div>
        );
    }
}

WinLossTracker.register();
