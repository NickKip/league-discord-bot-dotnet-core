import { Store } from "store/store";
import { ClientEvents } from "events";

export class ClientManager {

    // === Static === //

    static Registrations: Map<string, ClientManager> = new Map();

    static GetRegistration(name: string): ClientManager {

        return ClientManager.Registrations.get(name);
    }

    static FireReady(): void {

        document.dispatchEvent(new CustomEvent(ClientEvents.ClientManagerReady));
    }

    // === Private === //

    private name: string;

    // Todo: proper type defs
    private events: { [key: string]: Function[] } = {};

    // === Public === //

    public isReady: boolean = false;
    public store: Store;

    // === Constructor === //

    constructor(name: string) {

        this.name = name;
        ClientManager.Registrations.set(this.name, this);

        const store: Store = new Store(this.name);

        this.bootstrap(store);
    }

    private bootstrap(store: Store): Promise<void> {

        return Promise.resolve()
            .then(() => this._setStore(store))
            .then(() => {

                this.isReady = true;
                ClientManager.FireReady();
            });
    }

    private _setStore(store: Store): Promise<void> {

        return new Promise<void>(resolve => {

            this.store = store;
            this.store.init().then(() => resolve());
        });
    }

    // === Events === //

    // tslint:disable-next-line no-any
    public on(key: string, handler: any): void {

        const events: Function[] = this.events[key];

        if (events) {

            events.push(handler);
        }
        else {

            this.events[key] = [handler];
        }
    }

    // tslint:disable-next-line no-any
    public emit(key: string, data: any): void {

        const events: Function[] = this.events[key];

        if (events) {

            events.map(x => x(data));
        }
    }

    // === Public === //
}

window.ClientManager = ClientManager;
window.NKTemp = new ClientManager("nktemp");
