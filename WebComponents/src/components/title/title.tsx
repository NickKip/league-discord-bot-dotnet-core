import { BaseComponent } from "components/base/BaseComponent";
import { JSXElement } from "components/base";

export class Title extends BaseComponent {

    static get is(): string {
        return "bot-title";
    }

    _setupEventListeners(): void {}

    componentStyles(): JSXElement {

        return (
            <style>
                { `<!-- inject: ./bot-title.css -->` }
            </style>
        );
    }

    componentMarkup(): JSXElement {

        return (
            <div><h1>Hello 2!</h1></div>
        );
    }
}

Title.register();
