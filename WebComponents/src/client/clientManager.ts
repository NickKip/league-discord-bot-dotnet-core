export class ClientManager {

    // === Static === //

    static Registrations: Map<string, ClientManager> = new Map();

    static GetRegistration(name: string): ClientManager {

        return ClientManager.Registrations.get(name);
    }

    // === Private === //

    private name: string;

    // Todo: proper type defs
    private events: { [key: string]: Function[] } = {};

    // === Constructor === //

    constructor(name: string) {

        this.name = name;
        ClientManager.Registrations.set(this.name, this);
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
