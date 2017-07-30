import { BaseComponent } from "components/base/BaseComponent";
import { JSXElement } from "components/base";

export class WSTest extends BaseComponent {

    static get is(): string {
        return "bot-wstest";
    }

    _setupEventListeners(): void {

        this.manager.on("new-ws-event", (d => this.newWs(d)));
    }

    private newWs(d: string): void {

        // temp
        alert(d);
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
                <h1>Title</h1>
            </div>
        );
    }

}

WSTest.register();
