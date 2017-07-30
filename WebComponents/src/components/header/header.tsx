import { BaseComponent } from "components/base/BaseComponent";
import { JSXElement } from "components/base";

export class Header extends BaseComponent {

    static get is(): string {
        return "bot-header";
    }

    _setupEventListeners(): void {}

    componentStyles(): JSXElement {

        const styles: string = `
            :host {
                display: block;
                width: 100vw;
                height: 40px;
                background-color: rgba(0, 0, 0, 0.8);
            }

            :host div {
                display: flex;
                height: 100%;
            }

            :host h1 {
                color: white;
                font-size: 18px;
                margin: auto;
            }
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

Header.register();
