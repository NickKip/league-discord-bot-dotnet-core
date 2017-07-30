import { BotWebSocketHandler } from "./websockets";
import { ClientManager } from "client/clientManager";

window.BotWebSocketHandler = new BotWebSocketHandler();

export { Title } from "components/title/title";
export { Header } from "components/header/header";
export { WSTest } from "components/wsTest/ws-test";
