import * as skate from "skatejs/src/index";
import { JSXElement } from "components/base";
import { ClientManager } from "client/clientManager";

// tslint:disable typedef
// tslint:disable no-any

(<any>window).__CTRender = (<any>window).skate.h;

export abstract class BaseComponent extends skate.Component<any> {

    // @prop({ type: string, attribute: true, default: "nktest" })
    protected managerName: string = "nktemp";
    protected manager: ClientManager;

    static is: string = null;

    styleElements: JSXElement;

    // === Render lifecycle events === //

    abstract _setupEventListeners(): void;

    abstract componentStyles(): JSXElement;

    abstract componentMarkup(): JSXElement;

    // === Static functions === //

    static register(): void {

        if (this.is === null) {

            // tslint:disable-next-line no-console
            console.error("Could not register component, please ensure that it has a static is property");
            return;
        }

        const existing = customElements.get(this.is);
        if (!existing) {

            customElements.define(this.is, this);
        }
    }

    connectedCallback(): void {

        super.connectedCallback();

        // Hack
        const manager: ClientManager = ClientManager.GetRegistration(this.managerName);

        if (!manager) {

            window.NKTemp = new ClientManager("nktemp");
        }

        this.manager = ClientManager.GetRegistration(this.managerName);

        this._setupEventListeners();
    }

    // === Render function === //

    renderCallback(): any[] {

        // const styles: Array<JSXElement> = ensureArray(
        //     this.styleElements || []
        // );

        const styles: JSXElement[] = ensureArray(this.componentStyles());

        const html: Array<JSXElement> = ensureArray(
            this.componentMarkup
                ? this.componentMarkup() || []
                : []
        );

        return [
            ...styles,
            ...html
        ];
    }
}

function ensureArray(value: JSXElement): Array<JSXElement> {

    return (value instanceof Array)
        ? value
        : [value];
}

// tslint:enable no-any
// tslint:enable typedef
