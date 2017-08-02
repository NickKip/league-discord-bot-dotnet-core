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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_skatejs_src_index__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_skatejs_src_index___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_skatejs_src_index__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_client_clientManager__ = __webpack_require__(2);
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


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
    // === Private === //
    _bindManager(ev) {
        return __awaiter(this, void 0, void 0, function* () {
            this.manager = __WEBPACK_IMPORTED_MODULE_1_client_clientManager__["a" /* ClientManager */].GetRegistration(this.managerName);
            this._setupEventListeners();
            yield this._init();
        });
    }
    // === Lifecycle Events === //
    connectedCallback() {
        super.connectedCallback();
        const manager = __WEBPACK_IMPORTED_MODULE_1_client_clientManager__["a" /* ClientManager */].GetRegistration(this.managerName);
        if (!manager || !manager.isReady) {
            document.addEventListener("client-manager-ready" /* ClientManagerReady */, (ev) => this._bindManager(ev));
        }
        else {
            this.manager = manager;
            this._setupEventListeners();
            Promise.resolve().then(() => __awaiter(this, void 0, void 0, function* () { return yield this._init(); }));
        }
    }
    // === Render function === //
    renderCallback() {
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
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_store_store__ = __webpack_require__(9);

class ClientManager {
    // === Constructor === //
    constructor(name) {
        // Todo: proper type defs
        this.events = {};
        // === Public === //
        this.isReady = false;
        this.name = name;
        ClientManager.Registrations.set(this.name, this);
        const store = new __WEBPACK_IMPORTED_MODULE_0_store_store__["a" /* Store */](this.name);
        this.bootstrap(store);
    }
    static GetRegistration(name) {
        return ClientManager.Registrations.get(name);
    }
    static FireReady() {
        document.dispatchEvent(new CustomEvent("client-manager-ready" /* ClientManagerReady */));
    }
    bootstrap(store) {
        return Promise.resolve()
            .then(() => this._setStore(store))
            .then(() => {
            this.isReady = true;
            ClientManager.FireReady();
        });
    }
    _setStore(store) {
        return new Promise(resolve => {
            this.store = store;
            this.store.init().then(() => resolve());
        });
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
window.NKTemp = new ClientManager("nktemp");


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = sortGameInfo;
/* harmony export (immutable) */ __webpack_exports__["a"] = percToString;
function sortGameInfo(game) {
    const webGame = {
        info: game,
        blueTeam: game.Summoners.filter(x => x.Team === 100),
        redTeam: game.Summoners.filter(x => x.Team === 200)
    };
    return webGame;
}
function percToString(num, total, fix) {
    if (num === 0 || total === 0) {
        return "0";
    }
    return ((num / total) * 100).toFixed(fix);
}


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = skate;

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = prop;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_skatejs_src_index__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_skatejs_src_index___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_skatejs_src_index__);
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};

const identityFn = (x) => x;
function prop(property) {
    return function (target, propertyKey) {
        // obtain properties provide by the @prop decorator
        const { type } = property, skPropConfig = __rest(property, ["type"]);
        // parse to find out the type of property
        const configType = parseType(type);
        // reference the skatejs prop function, e.g. prop.string
        const skatePropTypeFn = __WEBPACK_IMPORTED_MODULE_0_skatejs_src_index__["prop"][configType] || identityFn;
        // get constructor of element
        const ctor = target.constructor;
        // grab any existing props previously defined
        const existingProps = (ctor.props || {});
        // concatenate all props together
        const newProps = Object.assign({}, existingProps, { [propertyKey]: skatePropTypeFn(skPropConfig) });
        // apply to the current instance of the component
        Object.defineProperty(ctor, "props", {
            configurable: true,
            get() {
                return newProps;
            }
        });
    };
}
function parseType(type) {
    if (typeof type !== "function") {
        return;
    }
    const inst = type();
    if (inst instanceof Array) {
        return "array";
    }
    if (typeof inst === "object") {
        return "object";
    }
    return (typeof inst);
}
// tslint:enable no-any


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__decorators_prop__ = __webpack_require__(5);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__decorators_prop__["a"]; });



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__websockets__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_components_title_title__ = __webpack_require__(10);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Title", function() { return __WEBPACK_IMPORTED_MODULE_1_components_title_title__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_components_header_header__ = __webpack_require__(11);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Header", function() { return __WEBPACK_IMPORTED_MODULE_2_components_header_header__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_components_wsTest_ws_test__ = __webpack_require__(14);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "WSTest", function() { return __WEBPACK_IMPORTED_MODULE_3_components_wsTest_ws_test__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_components_league_game_renderer_league_game_renderer__ = __webpack_require__(15);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "LeagueGameRenderer", function() { return __WEBPACK_IMPORTED_MODULE_4_components_league_game_renderer_league_game_renderer__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_components_win_loss_tracker_win_loss_tracker__ = __webpack_require__(18);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "WinLossTracker", function() { return __WEBPACK_IMPORTED_MODULE_5_components_win_loss_tracker_win_loss_tracker__["a"]; });

window.BotWebSocketHandler = new __WEBPACK_IMPORTED_MODULE_0__websockets__["a" /* BotWebSocketHandler */]();







/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_client_clientManager__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_client_utils__ = __webpack_require__(3);


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
        const game = JSON.parse(event.data);
        this.manager.emit("new-league-game" /* NewLeagueGame */, Object(__WEBPACK_IMPORTED_MODULE_1_client_utils__["b" /* sortGameInfo */])(game));
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BotWebSocketHandler;



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Store {
    // === Constructor === //
    constructor(name) {
        this._saveToPersistentQueue = Promise.resolve();
        this.name = name;
        this._db = new window.PouchDB(name);
    }
    // === Public === //
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.state = yield this._getFromPersistent();
        });
    }
    getFromState(key) {
        return this.state[key] || null;
    }
    saveMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            this.state.messages = [message, ...this.state.messages];
            return yield this._saveToPersistent();
        });
    }
    saveLeagueGame(game) {
        return __awaiter(this, void 0, void 0, function* () {
            this.state.leagueGames = [game, ...this.state.leagueGames];
            return yield this._saveToPersistent();
        });
    }
    // === Private === //
    _saveToPersistent() {
        return __awaiter(this, void 0, void 0, function* () {
            clearTimeout(this._saveDebouncer);
            this._saveDebouncer = setTimeout(() => {
                if (this._db) {
                    this._saveToPersistentQueue = this._saveToPersistentQueue.then(() => __awaiter(this, void 0, void 0, function* () {
                        try {
                            const res = yield this._db.put(this.state);
                            this.state._rev = res.rev;
                        }
                        catch (ex) {
                            throw new Error(ex);
                        }
                    }));
                }
                else {
                    localStorage[this.name] = JSON.stringify(this.state);
                }
            }, 500);
        });
    }
    _getFromPersistent() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._db) {
                try {
                    return yield this._db.get(this.name);
                }
                catch (ex) {
                    const state = this._generateInitialState();
                    const res = yield this._db.put(state);
                    state._rev = res.rev;
                    return state;
                }
            }
            else {
                const state = localStorage.getItem(this.name)
                    ? JSON.parse(localStorage.getItem(this.name))
                    : this._generateInitialState();
            }
        });
    }
    _generateInitialState() {
        return {
            _id: this.name,
            _rev: "",
            leagueGames: [],
            messages: []
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Store;



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_components_base_BaseComponent__ = __webpack_require__(0);
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

class Title extends __WEBPACK_IMPORTED_MODULE_0_components_base_BaseComponent__["a" /* BaseComponent */] {
    static get is() {
        return "bot-title";
    }
    _init() {
        return __awaiter(this, void 0, void 0, function* () { });
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
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_components_base_BaseComponent__ = __webpack_require__(0);
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

class Header extends __WEBPACK_IMPORTED_MODULE_0_components_base_BaseComponent__["a" /* BaseComponent */] {
    static get is() {
        return "bot-header";
    }
    _init() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    _setupEventListeners() { }
    componentStyles() {
        return (window.__CTRender("style", null, __webpack_require__(12)));
    }
    componentMarkup() {
        return (window.__CTRender("div", null,
            window.__CTRender("h1", null, "Gaming Weekend Stats")));
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Header;

Header.register();


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// css-to-string-loader: transforms styles from css-loader to a string output

// Get the styles
var styles = __webpack_require__(13);

if (typeof styles === 'string') {
  // Return an existing string
  module.exports = styles;
} else {
  // Call the custom toString method from css-loader module
  module.exports = styles.toString();
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ":host {\n  display: block;\n  width: 100vw;\n  height: 40px;\n  background-color: rgba(0, 0, 0, 0.8); }\n\n:host div {\n  display: flex;\n  height: 100%; }\n\n:host h1 {\n  color: white;\n  font-size: 18px;\n  margin: auto; }\n", ""]);

// exports


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_components_base_BaseComponent__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_components_base_decorators_prop__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


class WSTest extends __WEBPACK_IMPORTED_MODULE_0_components_base_BaseComponent__["a" /* BaseComponent */] {
    static get is() {
        return "bot-wstest";
    }
    _init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.messages = yield this.manager.store.getFromState("messages");
        });
    }
    _setupEventListeners() {
        this.manager.on("new-ws-message" /* NewWsMessage */, (msg => this.newWs(msg)));
    }
    newWs(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.manager.store.saveMessage(msg);
            this.messages = yield this.manager.store.getFromState("messages");
        });
    }
    componentStyles() {
        const styles = `
        `;
        return (window.__CTRender("style", null, styles));
    }
    componentMarkup() {
        return (window.__CTRender("div", null, this.messages.map(x => window.__CTRender("p", null, x))));
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = WSTest;

__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_components_base_decorators_prop__["a" /* prop */])({ type: Array, attribute: false, default: [] })
], WSTest.prototype, "messages", void 0);
WSTest.register();


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_components_base_BaseComponent__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_components_base__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_client_utils__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



class LeagueGameRenderer extends __WEBPACK_IMPORTED_MODULE_0_components_base_BaseComponent__["a" /* BaseComponent */] {
    static get is() {
        return "bot-league-game-renderer";
    }
    _init() {
        return __awaiter(this, void 0, void 0, function* () {
            // Temp
            this.game = yield this.manager.store.getFromState("leagueGames")[0];
        });
    }
    _setupEventListeners() {
        this.manager.on("new-league-game" /* NewLeagueGame */, (game => this.newLeagueGame(game)));
    }
    newLeagueGame(game) {
        return __awaiter(this, void 0, void 0, function* () {
            this.game = Object.assign({}, game);
            yield this.manager.store.saveLeagueGame(game);
            // await this.manager.store.saveMessage(game);
            // this.game = await this.manager.store.getFromState<LeagueGame>("currentLeagueGame");
        });
    }
    componentStyles() {
        return (window.__CTRender("style", null, __webpack_require__(16)));
    }
    componentMarkup() {
        if (!this.game || Object.keys(this.game).length === 0) {
            return null;
        }
        return (window.__CTRender("div", { className: "summTable" },
            window.__CTRender("div", { className: "summRow header" },
                window.__CTRender("div", { className: "blue" },
                    window.__CTRender("span", null, "Blue")),
                window.__CTRender("div", { className: "red" },
                    window.__CTRender("span", null, "Red"))),
            this.game.blueTeam.map((x, idx) => this._renderSummoner(x, this.game.redTeam[idx]))));
    }
    _renderSummoner(blueSummoner, redSummoner) {
        return (window.__CTRender("div", { className: "summRow" },
            window.__CTRender("div", { className: "blue" },
                window.__CTRender("div", null,
                    window.__CTRender("img", { src: `http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/${blueSummoner.Champion}.png `, width: 40, height: 40 })),
                window.__CTRender("div", null,
                    window.__CTRender("p", null,
                        window.__CTRender("strong", null,
                            blueSummoner.Name,
                            " (",
                            blueSummoner.ChampGamesPlayed,
                            ")"),
                        "\u00A0",
                        blueSummoner.Wins,
                        " / ",
                        blueSummoner.Losses,
                        " (",
                        window.__CTRender("strong", null,
                            Object(__WEBPACK_IMPORTED_MODULE_2_client_utils__["a" /* percToString */])(blueSummoner.Wins, (blueSummoner.Wins + blueSummoner.Losses), 2),
                            "%"),
                        ")",
                        blueSummoner.Rank))),
            window.__CTRender("div", { className: "red" },
                window.__CTRender("div", null,
                    window.__CTRender("img", { src: `http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/${redSummoner.Champion}.png `, width: 40, height: 40 })),
                window.__CTRender("div", null,
                    window.__CTRender("p", null,
                        window.__CTRender("strong", null,
                            redSummoner.Name,
                            " (",
                            redSummoner.ChampGamesPlayed,
                            ")"),
                        "\u00A0",
                        redSummoner.Wins,
                        " / ",
                        redSummoner.Losses,
                        " (",
                        window.__CTRender("strong", null,
                            Object(__WEBPACK_IMPORTED_MODULE_2_client_utils__["a" /* percToString */])(redSummoner.Wins, (redSummoner.Wins + redSummoner.Losses), 2),
                            "%"),
                        ")",
                        redSummoner.Rank)))));
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LeagueGameRenderer;

__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_components_base__["a" /* prop */])({ type: Object, attribute: false })
], LeagueGameRenderer.prototype, "game", void 0);
LeagueGameRenderer.register();


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// css-to-string-loader: transforms styles from css-loader to a string output

// Get the styles
var styles = __webpack_require__(17);

if (typeof styles === 'string') {
  // Return an existing string
  module.exports = styles;
} else {
  // Call the custom toString method from css-loader module
  module.exports = styles.toString();
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ":host {\n  display: flex;\n  box-sizing: border-box; }\n  :host div {\n    box-sizing: border-box; }\n  :host .summTable {\n    display: table;\n    width: 80vw;\n    margin: 0 auto; }\n    :host .summTable .summRow {\n      display: flex;\n      border: 1px solid #ccc; }\n      :host .summTable .summRow.header span {\n        margin: auto; }\n      :host .summTable .summRow .blue,\n      :host .summTable .summRow .red {\n        font-size: 14px;\n        padding: 10px;\n        display: flex;\n        flex: 0 0 50%; }\n        :host .summTable .summRow .blue div,\n        :host .summTable .summRow .red div {\n          margin: auto 10px; }\n          :host .summTable .summRow .blue div p,\n          :host .summTable .summRow .red div p {\n            margin: auto 0; }\n      :host .summTable .summRow .blue {\n        border-right: 1px solid #ccc; }\n", ""]);

// exports


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_components_base_BaseComponent__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_components_base__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


class WinLossTracker extends __WEBPACK_IMPORTED_MODULE_0_components_base_BaseComponent__["a" /* BaseComponent */] {
    constructor() {
        // === Props === //
        super(...arguments);
        this.wins = 0;
        this.losses = 0;
    }
    static get is() {
        return "bot-win-loss-tracker";
    }
    _init() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    _setupEventListeners() {
    }
    componentStyles() {
        return (window.__CTRender("style", null, __webpack_require__(19)));
    }
    componentMarkup() {
        return (window.__CTRender("div", null,
            window.__CTRender("div", { className: "results" },
                window.__CTRender("p", { className: "wins" }, "0"),
                window.__CTRender("p", { className: "sep" }, "/"),
                window.__CTRender("p", { className: "losses" }, "0"))));
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = WinLossTracker;

__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_components_base__["a" /* prop */])({ type: Number, attribute: false })
], WinLossTracker.prototype, "wins", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_components_base__["a" /* prop */])({ type: Number, attribute: false })
], WinLossTracker.prototype, "losses", void 0);
WinLossTracker.register();


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// css-to-string-loader: transforms styles from css-loader to a string output

// Get the styles
var styles = __webpack_require__(20);

if (typeof styles === 'string') {
  // Return an existing string
  module.exports = styles;
} else {
  // Call the custom toString method from css-loader module
  module.exports = styles.toString();
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ":host {\n  display: flex;\n  flex-direction: column;\n  width: 100%; }\n  :host .headings {\n    display: flex;\n    width: 50vw;\n    margin: auto;\n    justify-content: space-between; }\n  :host .results {\n    display: flex;\n    width: 80vw;\n    margin: auto;\n    font-size: 180px;\n    justify-content: space-between; }\n    :host .results p {\n      margin: 0; }\n      :host .results p.sep {\n        font-size: 60px;\n        margin: auto; }\n      :host .results p.wins {\n        color: green; }\n      :host .results p.losses {\n        color: red; }\n", ""]);

// exports


/***/ })
/******/ ]);