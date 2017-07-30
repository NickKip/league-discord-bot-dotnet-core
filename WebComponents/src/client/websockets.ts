import { ClientManager } from "client/clientManager";

export class BotWebSocketHandler {

    // === Private === //

    private protocol: string = document.location.protocol === "https:" ? "wss" : "ws";
    private port: string = document.location.port ? (":" + document.location.port) : "";
    private wsUrl: string = `${this.protocol}://${document.location.hostname}${this.port}/ws`;
    private socket: WebSocket;
    private manager: ClientManager;

    // === Constructor === //

    constructor() {

        this.socket = new WebSocket(this.wsUrl);
        this.manager = ClientManager.GetRegistration("nktemp");

        this.socket.onopen = (e => this.onOpen(e));
        this.socket.onclose = (e => this.onClose(e));
        this.socket.onerror = (e => this.onError(e));
        this.socket.onmessage = (e => this.onMessage(e));
    }

    // === Event Handlers === //

    private onOpen(event: Event): void {

        // tslint:disable-next-line no-console
        console.log("Websocket connected: ", event);
    }

    private onClose(event: Event): void {

        // tslint:disable-next-line no-console
        console.log("Websocket closed: ", event);
    }

    private onError(event: Event): void {

        // tslint:disable-next-line no-console
        console.log("Websocket error: ", event);
    }

    private onMessage(event: Event): void {

        // tslint:disable-next-line no-console
        console.log("Websocket message: ", event);

        // Todo: create type defs for event data

        // tslint:disable-next-line no-any
        this.manager.emit("new-ws-event", (<any>event).data);
    }
}
