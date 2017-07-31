import { State } from "store/state";

type PouchResponse = {

    ok: boolean;
    id: string;
    rev: string;
};

export class Store {

    // === Private === //

    private state: State;
    private name: string;

    // tslint:disable-next-line no-any
    private _db: any;
    private _saveDebouncer: number;
    private _saveToPersistentQueue: Promise<void> = Promise.resolve();

    // === Constructor === //

    constructor(name: string) {

        this.name = name;
        this._db = new window.PouchDB(name);
    }

    // === Public === //

    public async init(): Promise<void> {

        this.state = await this._getFromPersistent();
    }

    public getFromState<T>(key: string): T {

        return this.state[key] || null;
    }

    public async saveMessage(message: string): Promise<void> {

        this.state.messages = [ message, ...this.state.messages ];
        return await this._saveToPersistent();
    }

    // === Private === //

    private async _saveToPersistent(): Promise<void> {

        clearTimeout(this._saveDebouncer);

        this._saveDebouncer = setTimeout(() => {

            if (this._db) {

                this._saveToPersistentQueue = this._saveToPersistentQueue.then(async () => {

                    try {

                        const res: PouchResponse = await this._db.put(this.state);
                        this.state._rev = res.rev;
                    }
                    catch (ex) {

                        throw new Error(ex);
                    }
                });

            } else {

                localStorage[this.name] = JSON.stringify(this.state);
            }
        }, 500);
    }

    private async _getFromPersistent(): Promise<State> {

        if (this._db) {

            try {

                return await this._db.get(this.name);
            }
            catch (ex) {

                const state: State = this._generateInitialState();

                const res: PouchResponse = await this._db.put(state);
                state._rev = res.rev;

                return state;
            }

        } else {

            const state: State = localStorage.getItem(this.name)
                ? JSON.parse(localStorage.getItem(this.name))
                : this._generateInitialState();
        }
    }

    private _generateInitialState(): State {

        return {

            _id: this.name,
            _rev: "",
            leagueGames: [],
            messages: []
        };
    }
}
