import { BaseComponent } from "components/base/BaseComponent";
import { prop } from "components/base/decorators/prop";
import { JSXElement } from "components/base";
import { ClientEvents } from "events";

export class WSTest extends BaseComponent {

    @prop({ type: Array, attribute: false, default: [] })
    private messages: string[];

    static get is(): string {
        return "bot-wstest";
    }

    async _init(): Promise<void> {

        this.messages = await this.manager.store.getFromState<string[]>("messages");
    }

    _setupEventListeners(): void {

        this.manager.on(ClientEvents.NewWsMessage, (msg => this.newWs(msg)));
    }

    private async newWs(msg: string): Promise<void> {

        await this.manager.store.saveMessage(msg);
        this.messages = await this.manager.store.getFromState<string[]>("messages");
    }

    componentStyles(): JSXElement {

        const styles: string = `
        `;

        return (
            <style>
                { styles }
            </style>
        );
    }

    componentMarkup(): JSXElement {

        return (
            <div>
                {
                    this.messages.map(x => <p>{ x }</p>)
                }
            </div>
        );
    }

}

WSTest.register();
