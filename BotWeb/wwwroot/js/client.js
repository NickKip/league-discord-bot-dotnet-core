/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_skatejs_src_index__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_skatejs_src_index___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_skatejs_src_index__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_client_clientManager__ = __webpack_require__(1);


// tslint:disable typedef
// tslint:disable no-any
window.__CTRender = window.skate.h;
class BaseComponent extends __WEBPACK_IMPORTED_MODULE_0_skatejs_src_index__["Component"] {
    constructor() {
        super(...arguments);
        // @prop({ type: string, attribute: true, default: "nktest" })
        this.managerName = "nktemp";
    }
    // === Static functions === //
    static register() {
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
    connectedCallback() {
        super.connectedCallback();
        // Hack
        const manager = __WEBPACK_IMPORTED_MODULE_1_client_clientManager__["a" /* ClientManager */].GetRegistration(this.managerName);
        if (!manager) {
            window.NKTemp = new __WEBPACK_IMPORTED_MODULE_1_client_clientManager__["a" /* ClientManager */]("nktemp");
        }
        this.manager = __WEBPACK_IMPORTED_MODULE_1_client_clientManager__["a" /* ClientManager */].GetRegistration(this.managerName);
        this._setupEventListeners();
    }
    // === Render function === //
    renderCallback() {
        // const styles: Array<JSXElement> = ensureArray(
        //     this.styleElements || []
        // );
        const styles = ensureArray(this.componentStyles());
        const html = ensureArray(this.componentMarkup
            ? this.componentMarkup() || []
            : []);
        return [
            ...styles,
            ...html
        ];
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BaseComponent;

BaseComponent.is = null;
function ensureArray(value) {
    return (value instanceof Array)
        ? value
        : [value];
}
// tslint:enable no-any
// tslint:enable typedef


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class ClientManager {
    // === Constructor === //
    constructor(name) {
        // Todo: proper type defs
        this.events = {};
        this.name = name;
        ClientManager.Registrations.set(this.name, this);
    }
    static GetRegistration(name) {
        return ClientManager.Registrations.get(name);
    }
    // === Events === //
    // tslint:disable-next-line no-any
    on(key, handler) {
        const events = this.events[key];
        if (events) {
            events.push(handler);
        }
        else {
            this.events[key] = [handler];
        }
    }
    // tslint:disable-next-line no-any
    emit(key, data) {
        const events = this.events[key];
        if (events) {
            events.map(x => x(data));
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ClientManager;

// === Static === //
ClientManager.Registrations = new Map();
window.ClientManager = ClientManager;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__websockets__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_components_title_title__ = __webpack_require__(4);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Title", function() { return __WEBPACK_IMPORTED_MODULE_1_components_title_title__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_components_header_header__ = __webpack_require__(6);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Header", function() { return __WEBPACK_IMPORTED_MODULE_2_components_header_header__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_components_wsTest_ws_test__ = __webpack_require__(7);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "WSTest", function() { return __WEBPACK_IMPORTED_MODULE_3_components_wsTest_ws_test__["a"]; });

window.BotWebSocketHandler = new __WEBPACK_IMPORTED_MODULE_0__websockets__["a" /* BotWebSocketHandler */]();





/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_client_clientManager__ = __webpack_require__(1);

class BotWebSocketHandler {
    // === Constructor === //
    constructor() {
        // === Private === //
        this.protocol = document.location.protocol === "https:" ? "wss" : "ws";
        this.port = document.location.port ? (":" + document.location.port) : "";
        this.wsUrl = `${this.protocol}://${document.location.hostname}${this.port}/ws`;
        this.socket = new WebSocket(this.wsUrl);
        this.manager = __WEBPACK_IMPORTED_MODULE_0_client_clientManager__["a" /* ClientManager */].GetRegistration("nktemp");
        this.socket.onopen = (e => this.onOpen(e));
        this.socket.onclose = (e => this.onClose(e));
        this.socket.onerror = (e => this.onError(e));
        this.socket.onmessage = (e => this.onMessage(e));
    }
    // === Event Handlers === //
    onOpen(event) {
        // tslint:disable-next-line no-console
        console.log("Websocket connected: ", event);
    }
    onClose(event) {
        // tslint:disable-next-line no-console
        console.log("Websocket closed: ", event);
    }
    onError(event) {
        // tslint:disable-next-line no-console
        console.log("Websocket error: ", event);
    }
    onMessage(event) {
        // tslint:disable-next-line no-console
        console.log("Websocket message: ", event);
        // Todo: create type defs for event data
        // tslint:disable-next-line no-any
        this.manager.emit("new-ws-event", event.data);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BotWebSocketHandler;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_components_base_BaseComponent__ = __webpack_require__(0);

class Title extends __WEBPACK_IMPORTED_MODULE_0_components_base_BaseComponent__["a" /* BaseComponent */] {
    static get is() {
        return "bot-title";
    }
    _setupEventListeners() { }
    componentStyles() {
        return (window.__CTRender("style", null, `<!-- inject: ./bot-title.css -->`));
    }
    componentMarkup() {
        return (window.__CTRender("div", null,
            window.__CTRender("h1", null, "Hello 2!")));
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Title;

Title.register();


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = skate;

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_components_base_BaseComponent__ = __webpack_require__(0);

class Header extends __WEBPACK_IMPORTED_MODULE_0_components_base_BaseComponent__["a" /* BaseComponent */] {
    static get is() {
        return "bot-header";
    }
    _setupEventListeners() { }
    componentStyles() {
        const styles = `
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
        return (window.__CTRender("style", null, styles));
    }
    componentMarkup() {
        return (window.__CTRender("div", null,
            window.__CTRender("h1", null, "Title")));
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Header;

Header.register();


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_components_base_BaseComponent__ = __webpack_require__(0);

class WSTest extends __WEBPACK_IMPORTED_MODULE_0_components_base_BaseComponent__["a" /* BaseComponent */] {
    static get is() {
        return "bot-wstest";
    }
    _setupEventListeners() {
        this.manager.on("new-ws-event", (d => this.newWs(d)));
    }
    newWs(d) {
        // temp
        alert(d);
    }
    componentStyles() {
        const styles = `
        `;
        return (window.__CTRender("style", null, styles));
    }
    componentMarkup() {
        return (window.__CTRender("div", null,
            window.__CTRender("h1", null, "Title")));
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = WSTest;

WSTest.register();


/***/ })
/******/ ]);