(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs'), require('rxjs/operators'), require('@angular/core'), require('@angular/animations'), require('@angular/common'), require('@angular/platform-browser'), require('@angular/platform-browser/animations')) :
    typeof define === 'function' && define.amd ? define('@costlydeveloper/ngx-awesome-popup', ['exports', 'rxjs', 'rxjs/operators', '@angular/core', '@angular/animations', '@angular/common', '@angular/platform-browser', '@angular/platform-browser/animations'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.costlydeveloper = global.costlydeveloper || {}, global.costlydeveloper["ngx-awesome-popup"] = {}), global.rxjs, global.rxjs.operators, global.ng.core, global.ng.animations, global.ng.common, global.ng.platformBrowser, global.ng.platformBrowser.animations));
})(this, (function (exports, rxjs, operators, i0, animations, common, platformBrowser, animations$1) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
            to[j] = from[i];
        return to;
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

    // @dynamic
    var ServiceLocator = /** @class */ (function () {
        function ServiceLocator() {
        }
        return ServiceLocator;
    }());

    exports.DialogLayoutDisplay = void 0;
    (function (DialogLayoutDisplay) {
        DialogLayoutDisplay[DialogLayoutDisplay["NONE"] = 0] = "NONE";
        DialogLayoutDisplay[DialogLayoutDisplay["SUCCESS"] = 1] = "SUCCESS";
        DialogLayoutDisplay[DialogLayoutDisplay["INFO"] = 2] = "INFO";
        DialogLayoutDisplay[DialogLayoutDisplay["WARNING"] = 3] = "WARNING";
        DialogLayoutDisplay[DialogLayoutDisplay["DANGER"] = 4] = "DANGER";
    })(exports.DialogLayoutDisplay || (exports.DialogLayoutDisplay = {}));
    exports.ButtonLayoutDisplay = void 0;
    (function (ButtonLayoutDisplay) {
        ButtonLayoutDisplay[ButtonLayoutDisplay["NONE"] = 0] = "NONE";
        ButtonLayoutDisplay[ButtonLayoutDisplay["SUCCESS"] = 1] = "SUCCESS";
        ButtonLayoutDisplay[ButtonLayoutDisplay["INFO"] = 2] = "INFO";
        ButtonLayoutDisplay[ButtonLayoutDisplay["WARNING"] = 3] = "WARNING";
        ButtonLayoutDisplay[ButtonLayoutDisplay["DANGER"] = 4] = "DANGER";
        ButtonLayoutDisplay[ButtonLayoutDisplay["DARK"] = 5] = "DARK";
        ButtonLayoutDisplay[ButtonLayoutDisplay["LIGHT"] = 6] = "LIGHT";
        ButtonLayoutDisplay[ButtonLayoutDisplay["PRIMARY"] = 7] = "PRIMARY";
        ButtonLayoutDisplay[ButtonLayoutDisplay["SECONDARY"] = 8] = "SECONDARY";
        ButtonLayoutDisplay[ButtonLayoutDisplay["LINK"] = 9] = "LINK";
    })(exports.ButtonLayoutDisplay || (exports.ButtonLayoutDisplay = {}));
    var ColorVariance;
    (function (ColorVariance) {
        ColorVariance[ColorVariance["SUCCESS"] = 1] = "SUCCESS";
        ColorVariance[ColorVariance["INFO"] = 2] = "INFO";
        ColorVariance[ColorVariance["WARNING"] = 3] = "WARNING";
        ColorVariance[ColorVariance["DANGER"] = 4] = "DANGER";
        ColorVariance[ColorVariance["DARK"] = 5] = "DARK";
        ColorVariance[ColorVariance["LIGHT"] = 6] = "LIGHT";
        ColorVariance[ColorVariance["PRIMARY"] = 7] = "PRIMARY";
        ColorVariance[ColorVariance["SECONDARY"] = 8] = "SECONDARY";
    })(ColorVariance || (ColorVariance = {}));

    var GlobalConfigService = /** @class */ (function () {
        function GlobalConfigService(userGlobalConfig) {
            this.userGlobalConfig = userGlobalConfig;
            this.productionGlobalConfig = new GlobalConfig();
            this.authorGlobalConfig = new GlobalConfig();
            this.userGeneratedConfig = new GlobalUserConfig(userGlobalConfig);
            // region *** author global config values (if there is no user input) ***
            this.authorGlobalConfig.DisplayColor.Primary = null; // new ColorProvider('#ff9e00');
            this.authorGlobalConfig.DisplayColor.Secondary = null; // new ColorProvider('#989ea5');
            this.authorGlobalConfig.DisplayColor.Success = null; // new ColorProvider('#3caea3');
            this.authorGlobalConfig.DisplayColor.Info = null; // new ColorProvider('#2f8ee5');
            this.authorGlobalConfig.DisplayColor.Warning = null; // new ColorProvider('#ffc107');
            this.authorGlobalConfig.DisplayColor.Danger = null; // new ColorProvider('#e46464');
            this.authorGlobalConfig.DisplayColor.Light = null; // new ColorProvider('#f8f9fa');
            this.authorGlobalConfig.DisplayColor.Dark = null; // new ColorProvider('#343a40');
            // endregion
            this.productionGlobalConfig.DisplayColor = this.authorGlobalConfig.DisplayColor;
            // region *** global userConfig (user input app-module) ***
            this.setUserColors(this.userGeneratedConfig.ColorList);
            // endregion
            this.setNodeStyles(this.productionGlobalConfig.DisplayColor);
        }
        GlobalConfigService.prototype.resetStyles = function () {
            this.setUserColors(this.userGeneratedConfig.ColorList);
            this.setNodeStyles(this.productionGlobalConfig.DisplayColor, true);
        };
        GlobalConfigService.prototype.setNodeStyles = function (_ProductionColorTypes, _Reset) {
            var _this = this;
            if (_Reset === void 0) { _Reset = false; }
            if (_Reset) {
                var evolveDialogStyleNode = document.getElementById('ngx-awesome-popup-glob-styles');
                if (evolveDialogStyleNode) {
                    evolveDialogStyleNode.remove();
                }
            }
            this.setToastStyles();
            Object.keys(_ProductionColorTypes).forEach(function (key) {
                if (_ProductionColorTypes[key]) {
                    _this.setButtonStyling(key, _ProductionColorTypes[key]);
                    _this.setIconStyling(key, _ProductionColorTypes[key]);
                    _this.setToastStyling(key, _ProductionColorTypes[key]);
                    _this.setDialogFrame(key, _ProductionColorTypes[key]);
                    if (ColorVariance[key.toUpperCase()] === ColorVariance.PRIMARY) {
                        _this.getSheet('ngx-awesome-popup-styles').addRule('.ngx-awesome-popup-overlay', "background:  " + _ProductionColorTypes[key].TransparentDarkenVariance + "!important;");
                    }
                }
            });
        };
        GlobalConfigService.prototype.setUserColors = function (_UserColorTypes) {
            var _this = this;
            if (typeof _UserColorTypes !== 'object') {
                return;
            }
            var userKeys = Object.keys(_UserColorTypes);
            var productionObjectKeys = Object.keys(this.productionGlobalConfig.DisplayColor);
            userKeys.forEach(function (key) {
                if (productionObjectKeys.find(function (tKey) { return tKey === key; })) {
                    if (_UserColorTypes[key]) {
                        var baseColorProvider = new ColorProvider(_UserColorTypes[key]);
                        if (baseColorProvider.Base) {
                            _this.productionGlobalConfig.DisplayColor[key] = baseColorProvider;
                        }
                    }
                    else {
                        _this.productionGlobalConfig.DisplayColor[key] = null;
                    }
                }
            });
        };
        GlobalConfigService.prototype.getSheet = function (_StyleID) {
            // Create the <style> tag
            var evolveDialogStyleNode = document.getElementById(_StyleID);
            if (!evolveDialogStyleNode) {
                var headNode = document.head || document.getElementsByTagName('head')[0];
                if (!headNode) {
                    return;
                }
                evolveDialogStyleNode = document.createElement('style');
                evolveDialogStyleNode.setAttribute('id', _StyleID);
                evolveDialogStyleNode.appendChild(document.createTextNode(''));
                headNode.appendChild(evolveDialogStyleNode);
            }
            return evolveDialogStyleNode ? evolveDialogStyleNode.sheet : null;
        };
        GlobalConfigService.prototype.setToastStyling = function (_Key, _ColorProvider) {
            var standardToast = ".toast-wrapper.standard-toast .evolve-toast." + _Key.toLowerCase() + "-dialog";
            var standardToastStyle = "\n        background:  " + _ColorProvider.BrightShade + "!important;\n        border-color: " + _ColorProvider.Brighten + "!important;\n        ";
            var simpleToast = ".toast-wrapper.simple-toast .evolve-toast." + _Key.toLowerCase() + "-dialog";
            var simpleToastStyle = "\n        background:  " + _ColorProvider.BrightWarmly + "!important;\n        color:  " + _ColorProvider.Darken + "!important;\n        ";
            var baseProgress = ".toast-wrapper .evolve-toast." + _Key.toLowerCase() + "-dialog .progress-bar";
            var baseProgressStyle = "\n        background-color:  " + _ColorProvider.Brighten + "!important;\n        ";
            this.getSheet('ngx-awesome-popup-glob-styles').addRule(baseProgress, baseProgressStyle);
            this.getSheet('ngx-awesome-popup-glob-styles').addRule(standardToast, standardToastStyle);
            this.getSheet('ngx-awesome-popup-glob-styles').addRule(simpleToast, simpleToastStyle);
        };
        GlobalConfigService.prototype.setButtonStyling = function (_Key, _ColorProvider) {
            var baseButtonClass = ".ed-btn-" + _Key.toLowerCase();
            var baseStyle = "\n        color: " + _ColorProvider.ContrastColor + "!important;\n        background:  " + _ColorProvider.Base + "!important;\n        border-color: " + _ColorProvider.BrightenForShade + "!important;\n        ";
            var hoverButtonClass = ".ed-btn-" + _Key.toLowerCase() + ":hover";
            var hoverStyle = "\n        background:  " + (_ColorProvider.IsBaseBright
                ? _ColorProvider.DarkenForShade
                : _ColorProvider.BrightenForShade) + "!important;\n        border-color: " + (_ColorProvider.IsBaseBright
                ? _ColorProvider.Darken
                : _ColorProvider.Brighten) + "!important;\n        ";
            var focusActiveButtonClass = ".ed-btn-" + _Key.toLowerCase() + ":focus, .ed-btn-" + _Key.toLowerCase() + ":active";
            var focusActiveStyle = "\n        box-shadow: 0 0 1px 2px " + (_ColorProvider.IsBaseBright
                ? _ColorProvider.Darken
                : _ColorProvider.Brighten) + "!important;\n        ";
            this.getSheet('ngx-awesome-popup-glob-styles').addRule(baseButtonClass, baseStyle);
            this.getSheet('ngx-awesome-popup-glob-styles').addRule(hoverButtonClass, hoverStyle);
            this.getSheet('ngx-awesome-popup-glob-styles').addRule(focusActiveButtonClass, focusActiveStyle);
        };
        GlobalConfigService.prototype.setIconStyling = function (_Key, _ColorProvider) {
            var baseIconClass = ".ap-icon-" + _Key.toLowerCase();
            var baseStyle = "color: " + _ColorProvider.BrightenForShade + "!important;";
            this.getSheet('ngx-awesome-popup-glob-styles').addRule(baseIconClass, baseStyle);
        };
        GlobalConfigService.prototype.setDialogFrame = function (_Key, _ColorProvider) {
            var baseDialogFrameClass = ".ngx-awesome-popup-overlay ." + _Key.toLowerCase() + "-dialog";
            var baseStyle = "\n        border-color: " + _ColorProvider.Brighten + "!important;\n        ";
            this.getSheet('ngx-awesome-popup-glob-styles').addRule(baseDialogFrameClass, baseStyle);
        };
        GlobalConfigService.prototype.setToastStyles = function () {
            this.getSheet('ngx-awesome-popup-styles').addRule(".toast-entity", "all 0.5s ease;");
            this.getSheet('ngx-awesome-popup-styles').addRule(".toast-entity:first-child", "animation: move 0.7s ease-out;");
            var isIEOrEdge = /msie\s|trident\//i.test(window.navigator.userAgent);
            if (!isIEOrEdge) {
                this.getSheet('ngx-awesome-popup-styles').addRule("@-webkit-keyframes move", "\n                                        0% {margin-top: -5px; opacity: 0.4;}\n                                        30% {margin-top: -4px; opacity: 0.7;}\n                                        100% {margin-top: 0px; opacity: 1;}\n                                        ");
                this.getSheet('ngx-awesome-popup-styles').addRule("@keyframes move", "\n                                        0% {margin-top: -5px; opacity: 0.4;}\n                                        30% {margin-top: -4px; opacity: 0.7;}\n                                        100% {margin-top: 0px; opacity: 1;}\n                                        ");
            }
        };
        return GlobalConfigService;
    }());
    GlobalConfigService.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function GlobalConfigService_Factory() { return new GlobalConfigService(i0__namespace.ɵɵinject("cdGlobalConfig")); }, token: GlobalConfigService, providedIn: "root" });
    GlobalConfigService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    GlobalConfigService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: ['cdGlobalConfig',] }] }
    ]; };

    var Sizes = /** @class */ (function () {
        function Sizes() {
            this.Width = null;
            this.MinWidth = null;
            this.MaxWidth = null;
            this.Height = null;
            this.MinHeight = null;
            this.MaxHeight = null;
            this.FullScreen = null;
        }
        return Sizes;
    }());
    var Dispatch = /** @class */ (function () {
        function Dispatch() {
            this.Title = null;
            this.Message = null;
        }
        return Dispatch;
    }());
    var ButtonMaker = /** @class */ (function () {
        function ButtonMaker(Label, ID, LayoutType) {
            if (LayoutType === void 0) { LayoutType = exports.ButtonLayoutDisplay.PRIMARY; }
            this.Label = Label;
            this.ID = ID;
            this.LayoutType = LayoutType;
        }
        return ButtonMaker;
    }());
    var GlobalUserConfig = /** @class */ (function () {
        function GlobalUserConfig(_GlobalUserConfig) {
            this.ColorList = new ColorTypes();
            if (_GlobalUserConfig) {
                var dataControl = new DataControl();
                dataControl.copyValuesFrom(_GlobalUserConfig, this);
                var colorList = new ColorTypes();
                this.ColorList = dataControl.copyValuesFrom(this.ColorList, colorList);
            }
        }
        return GlobalUserConfig;
    }());
    var ColorTypes = /** @class */ (function () {
        function ColorTypes() {
            this.Primary = null;
            this.Secondary = null;
            this.Success = null;
            this.Info = null;
            this.Warning = null;
            this.Danger = null;
            this.Light = null;
            this.Dark = null;
        }
        return ColorTypes;
    }());
    var ResetGlobalConfig = /** @class */ (function () {
        function ResetGlobalConfig(globalConfig) {
            var globalConfigService = ServiceLocator.injector.get(GlobalConfigService);
            if (globalConfig) {
                globalConfigService.setUserColors(globalConfig.ColorList);
                globalConfigService.setNodeStyles(globalConfigService.productionGlobalConfig.DisplayColor, true);
            }
            else {
                globalConfigService.resetStyles();
            }
        }
        return ResetGlobalConfig;
    }());
    var GlobalConfig = /** @class */ (function () {
        function GlobalConfig() {
            this.DisplayColor = new DisplayColor();
        }
        return GlobalConfig;
    }());
    var DisplayColor = /** @class */ (function () {
        function DisplayColor() {
            this.Primary = null;
            this.Secondary = null;
            this.Success = null;
            this.Info = null;
            this.Warning = null;
            this.Danger = null;
            this.Light = null;
            this.Dark = null;
        }
        return DisplayColor;
    }());
    var ColorProvider = /** @class */ (function () {
        function ColorProvider(_Color) {
            this.Base = null;
            this.Brighten = null;
            this.BrightenForShade = null;
            this.Darken = null;
            this.DarkenForShade = null;
            this.ContrastColor = null;
            this.TransparentDarkenVariance = null;
            this.BrightShade = null;
            this.BrightWarmly = null;
            this.IsBaseBright = null;
            if ((this.Base = this.isColor(_Color))) {
                this.Brighten = this.brightness(this.Base, 'brighten', 25);
                this.BrightenForShade = this.brightness(this.Base, 'brighten', 10);
                this.Darken = this.brightness(this.Base, 'darken', 20);
                this.DarkenForShade = this.brightness(this.Base, 'darken', 10);
                var luminance = Math.floor(this.luminance(this.Base) * 100);
                var darken = luminance > 50
                    ? 5
                    : luminance > 40
                        ? 10
                        : luminance > 20
                            ? 15
                            : luminance;
                var brighten = luminance > 55
                    ? 65
                    : luminance > 45
                        ? 60
                        : luminance > 20
                            ? 55
                            : luminance > 10
                                ? 45
                                : 80;
                this.BrightShade = this.brightness(this.brightness(this.Base, 'darken', darken), 'brighten', brighten);
                this.BrightWarmly = this.brightness(this.brightness(this.saturate(this.Base), 'darken', darken - 10), 'brighten', brighten - 5);
                this.TransparentDarkenVariance = this.brightness(this.transparentize(this.Base, 80), 'darken', 40);
                if (this.isBright(this.Base)) {
                    this.ContrastColor = 'rgba(58,65,71,0.5)';
                    this.IsBaseBright = true;
                }
                else {
                    this.ContrastColor = 'rgb(255,255,255, 0.7)';
                    this.IsBaseBright = false;
                }
                /*	       console.log('%c BrightShade ', `background: ${this.BrightShade}; color: ${this.ContrastColor}`, this.BrightShade);
                                     console.log('%c BrightWarmly ', `background: ${this.BrightWarmly}; color: ${this.ContrastColor}`, this.BrightWarmly);
                                     console.log('%c Brighten ', `background: ${this.Brighten}; color: ${this.ContrastColor}`, this.Brighten);
                                     console.log('%c BrightenForShade ', `background: ${this.BrightenForShade}; color: ${this.ContrastColor}`, this.BrightenForShade);
                                     console.log('%c Base ', `background: ${this.Base}; color: ${this.ContrastColor}`, this.Base);
                                     console.log('%c DarkenForShade ', `background: ${this.DarkenForShade}; color: ${this.ContrastColor}`, this.DarkenForShade);
                                     console.log('%c Darken ', `background: ${this.Darken}; color: ${this.ContrastColor}`, this.Darken);
                                     console.log('%c TransparentDarkenVariance ', `background: ${this.TransparentDarkenVariance}; color: ${this.ContrastColor}`, this.TransparentDarkenVariance);
                      */
            }
        }
        ColorProvider.prototype.saturate = function (_Rgb) {
            var rgbIntArray = this.getRGBArray(_Rgb);
            var greyVal = this.getLightnessOfRGB(_Rgb) * 55;
            var _a = __read(this.getLowMidHi(rgbIntArray), 3), lowest = _a[0], middle = _a[1], highest = _a[2];
            if (lowest.val === highest.val) {
                return _Rgb;
            }
            var saturationRange = Math.round(Math.min(255 - greyVal, greyVal));
            var maxChange = Math.min(255 - highest.val, lowest.val);
            var changeAmount = Math.min(saturationRange / 10, maxChange);
            var middleValueRatio = (greyVal - middle.val) / (greyVal - highest.val) + 0.07;
            var returnArray = [];
            returnArray[highest.index] = Math.round(highest.val + changeAmount);
            returnArray[lowest.index] = Math.round(lowest.val - changeAmount);
            returnArray[middle.index] = Math.round(greyVal + (returnArray[highest.index] - greyVal) * middleValueRatio + 5);
            return "rgb(" + [returnArray].join() + ")";
        };
        ColorProvider.prototype.brightness = function (_Rgb, _Action, _Percentage) {
            var rgbIntArray = this.getRGBArray(_Rgb);
            var _a = __read(this.getLowMidHi(rgbIntArray), 3), lowest = _a[0], middle = _a[1], highest = _a[2];
            if (_Action === 'brighten' && lowest.val === 255) {
                return _Rgb;
            }
            if (_Action === 'darken' && highest.val === 0) {
                return _Rgb;
            }
            var amount = (_Percentage / 100) * 255;
            var returnList = [];
            if (_Action === 'brighten') {
                returnList[lowest.index] = Math.round(lowest.val + Math.min(255 - lowest.val, amount));
                var increaseFraction = (returnList[lowest.index] - lowest.val) / (255 - lowest.val);
                returnList[middle.index] =
                    middle.val + (255 - middle.val) * increaseFraction;
                returnList[highest.index] =
                    highest.val + (255 - highest.val) * increaseFraction;
            }
            if (_Action === 'darken') {
                returnList[highest.index] = highest.val - Math.min(highest.val, amount);
                var decreaseFraction = (highest.val - returnList[highest.index]) / highest.val;
                returnList[middle.index] = middle.val - middle.val * decreaseFraction;
                returnList[lowest.index] = lowest.val - lowest.val * decreaseFraction;
            }
            returnList = returnList.map(function (item) { return Math.round(item); });
            if (rgbIntArray.length > 3) {
                returnList.push(rgbIntArray[3]);
                return "rgba(" + returnList.join() + ")";
            }
            return "rgb(" + returnList.join() + ")";
        };
        ColorProvider.prototype.getLightnessOfRGB = function (_Rgb) {
            var rgbIntArray = this.getRGBArray(_Rgb);
            var highest = Math.max.apply(Math, __spreadArray([], __read(rgbIntArray)));
            var lowest = Math.min.apply(Math, __spreadArray([], __read(rgbIntArray)));
            return (highest + lowest) / 2 / 255;
        };
        ColorProvider.prototype.isBright = function (_Rgb) {
            return this.contrast(this.luminance(_Rgb));
        };
        ColorProvider.prototype.getLowMidHi = function (_RgbArray) {
            var rgbArrayCopy = _RgbArray.slice();
            var rgbArrayWithoutAlpha = _RgbArray.length > 3
                ? rgbArrayCopy.reverse().slice(1).reverse()
                : _RgbArray;
            var highest = { val: -1, index: -1 };
            var lowest = { val: Infinity, index: -1 };
            rgbArrayWithoutAlpha.map(function (val, index) {
                if (val > highest.val) {
                    highest = { val: val, index: index };
                }
                if (val < lowest.val) {
                    lowest = { val: val, index: index };
                }
            });
            if (lowest.index === highest.index) {
                lowest.index = highest.index + 1;
            }
            var middleIndex = 3 - highest.index - lowest.index;
            var middle = {
                val: rgbArrayWithoutAlpha[middleIndex],
                index: middleIndex
            };
            return [lowest, middle, highest];
        };
        ColorProvider.prototype.contrast = function (_Luminance) {
            var brightest = Math.max(1.05, _Luminance + 0.05);
            var darkest = Math.min(1.05, _Luminance + 0.05);
            var contrast = brightest / darkest;
            return contrast < 2.7;
        };
        ColorProvider.prototype.isColor = function (_StrColor) {
            var CSSDeclaration = new Option().style;
            CSSDeclaration.color = _StrColor;
            return !!CSSDeclaration.color ? CSSDeclaration.color : null;
        };
        ColorProvider.prototype.getRGBArray = function (_Rgb) {
            return _Rgb
                .replace(/^(rgb|rgba)\(/, '')
                .replace(/\)$/, '')
                .replace(/\s/g, '')
                .split(',')
                .map(function (x) { return +x; });
        };
        ColorProvider.prototype.luminance = function (_Rgb) {
            var rgbIntArray = this.getRGBArray(_Rgb);
            var W3algorithm = rgbIntArray.map(function (item) {
                item /= 255;
                return item <= 0.03928
                    ? item / 12.92
                    : Math.pow((item + 0.055) / 1.055, 2.4);
            });
            return (W3algorithm[0] * 0.2126 +
                W3algorithm[1] * 0.7152 +
                W3algorithm[2] * 0.0722);
        };
        ColorProvider.prototype.transparentize = function (_Rgb, _Percentage) {
            var baseArray = this.Base.replace(/^(rgb|rgba)\(/, '')
                .replace(/\)$/, '')
                .replace(/\s/g, '')
                .split(',')
                .map(function (x) { return +x; });
            if (baseArray.length > 3) {
                baseArray.pop();
            }
            var amount = (100 - _Percentage) / 100;
            baseArray.push(amount);
            return "rgb(" + baseArray.join() + ")";
        };
        return ColorProvider;
    }());
    var DataControl = /** @class */ (function () {
        function DataControl() {
        }
        /**
         * @ignore
         */
        DataControl.prototype.copyValuesFrom = function (_Data, _DestinationObject) {
            if (typeof _Data !== 'object') {
                return _DestinationObject;
            }
            var dataKeys = Object.keys(_Data);
            var destinationObjectKeys = Object.keys(_DestinationObject);
            dataKeys.forEach(function (key) {
                if (destinationObjectKeys.find(function (tKey) { return tKey === key || tKey === '_' + key; })) {
                    if (key.includes('Date')) {
                        var date = Date.parse(_Data[key]);
                        if (date) {
                            _DestinationObject[key] = new Date(date);
                        }
                        else {
                            if (_Data[key] !== null) {
                                _DestinationObject[key] = _Data[key];
                            }
                        }
                    }
                    else {
                        if (_Data[key] !== null) {
                            _DestinationObject[key] = _Data[key];
                        }
                    }
                }
            });
            return _DestinationObject;
        };
        return DataControl;
    }());
    var Timer = /** @class */ (function () {
        function Timer() {
            this.TimePassed = 0;
            this.Progress = 0;
            this.Remaining = 100;
        }
        Timer.prototype.setMilliseconds = function (_Milliseconds) {
            this.Milliseconds = _Milliseconds;
        };
        Timer.prototype.reset = function () {
            this.TimePassed = 0;
            this.Progress = 0;
        };
        Timer.prototype.pause = function () {
            this.TimePassed = 0;
            this.Progress = 0;
        };
        Timer.prototype.stop = function () {
            this.TimePassed = 0;
            clearInterval(this.Timer);
        };
        Timer.prototype.start = function () {
            var _this = this;
            this.Timer = setInterval(function () {
                if (_this.TimePassed >= _this.Milliseconds) {
                    clearInterval(_this.Timer);
                    return;
                }
                _this.TimePassed += 100;
                _this.Progress = (_this.TimePassed * 100) / _this.Milliseconds;
                _this.Remaining = 100 - _this.Progress;
            }, 100);
        };
        return Timer;
    }());

    var ConfirmBoxConfigService = /** @class */ (function () {
        function ConfirmBoxConfigService(userConfig) {
            if (userConfig === void 0) { userConfig = {}; }
            this.userConfig = userConfig;
            this.authorConfig = new ConfirmBoxSettings();
            this.productionConfig = new ConfirmBoxSettings();
            // region *** confirmBox userConfig (user input app-module) ***
            var userConfigBase = new ConfirmBoxSettings();
            var dataControl = new DataControl();
            dataControl.copyValuesFrom(userConfig.ConfirmBoxCoreConfig, userConfigBase.ConfirmBoxCoreConfig); // this will make sure that object has right properties
            userConfig.ConfirmBoxCoreConfig = userConfigBase.ConfirmBoxCoreConfig;
            // endregion
            // region *** author default config values (if there is no user input) ***
            this.authorConfig.ConfirmBoxCoreConfig.Width = 'auto';
            this.authorConfig.ConfirmBoxCoreConfig.Height = 'auto';
            this.authorConfig.ConfirmBoxCoreConfig.ButtonPosition = 'center';
            this.authorConfig.ConfirmBoxCoreConfig.ConfirmLabel = 'Confirm';
            this.authorConfig.ConfirmBoxCoreConfig.DeclineLabel = 'Decline';
            this.authorConfig.ConfirmBoxCoreConfig.DisableIcon = false;
            this.authorConfig.ConfirmBoxCoreConfig.AllowHTMLMessage = false;
            this.authorConfig.ConfirmBoxCoreConfig.LayoutType =
                exports.DialogLayoutDisplay.NONE;
            // endregion
            // region *** Production setup ***
            dataControl.copyValuesFrom(this.authorConfig.ConfirmBoxCoreConfig, this.productionConfig.ConfirmBoxCoreConfig);
            dataControl.copyValuesFrom(userConfig.ConfirmBoxCoreConfig, this.productionConfig.ConfirmBoxCoreConfig);
            // endregion
        }
        return ConfirmBoxConfigService;
    }());
    ConfirmBoxConfigService.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function ConfirmBoxConfigService_Factory() { return new ConfirmBoxConfigService(i0__namespace.ɵɵinject("confirmBoxConfig")); }, token: ConfirmBoxConfigService, providedIn: "root" });
    ConfirmBoxConfigService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    ConfirmBoxConfigService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: ['confirmBoxConfig',] }] }
    ]; };

    var DialogInjector = /** @class */ (function () {
        function DialogInjector(ParentInjector, AdditionalTokens) {
            this.ParentInjector = ParentInjector;
            this.AdditionalTokens = AdditionalTokens;
        }
        DialogInjector.prototype.get = function (token, notFoundValue, flags) {
            var value = this.AdditionalTokens.get(token);
            if (value) {
                return value;
            }
            return this.ParentInjector.get(token, notFoundValue);
        };
        return DialogInjector;
    }());

    function fadeInOut(_OpacityMin, _OpacityMax) {
        if (_OpacityMin === void 0) { _OpacityMin = 0; }
        if (_OpacityMax === void 0) { _OpacityMax = 1; }
        return animations.trigger("fadeInOut", [
            // ...
            animations.state("open", animations.style({
                opacity: _OpacityMax,
            })),
            animations.state("closed", animations.style({
                opacity: _OpacityMin,
            })),
            animations.transition("* => close-fast", [animations.animate("0.1s")]),
            animations.transition("* => open", [animations.animate("0.2s")]),
            animations.transition("* => close-slow", [animations.animate("1.3s")]),
            animations.transition("* => close-instant", [animations.animate("0s")]),
        ]);
    }

    var ConfirmBoxWrapperComponent = /** @class */ (function () {
        function ConfirmBoxWrapperComponent(confirmBoxBelonging, cd) {
            this.confirmBoxBelonging = confirmBoxBelonging;
            this.cd = cd;
            this.fadeInOutAnimation = 'open';
        }
        ConfirmBoxWrapperComponent.prototype.ngAfterViewInit = function () {
            this.setResponse(false);
            this.cd.detectChanges();
        };
        ConfirmBoxWrapperComponent.prototype.setResponse = function (_IsSuccess, _ClickedButtonID) {
            var response = new ConfirmBoxDefaultResponse();
            if (_ClickedButtonID) {
                response.ClickedButtonID = _ClickedButtonID;
            }
            response.setSuccess(_IsSuccess);
            response.setBelonging(this.confirmBoxBelonging);
            this.confirmBoxBelonging.EventsController.setDefaultResponse(response);
        };
        ConfirmBoxWrapperComponent.prototype.onOverlayClicked = function (evt) {
            // console.log('onOverlayClicked');
        };
        ConfirmBoxWrapperComponent.prototype.onCustomButton = function (_Button) {
            this.confirmBoxBelonging.EventsController.onButtonClick(_Button);
            this.setResponse(true, _Button.ID);
            this.confirmBoxBelonging.EventsController.close();
        };
        ConfirmBoxWrapperComponent.prototype.onButtonClick = function (_Type) {
            var buttonID;
            if (_Type === 'confirm') {
                buttonID = this.confirmBoxBelonging.ConfirmBoxCoreConfig.ConfirmLabel.toLowerCase();
            }
            else if (_Type === 'decline') {
                buttonID = this.confirmBoxBelonging.ConfirmBoxCoreConfig.DeclineLabel.toLowerCase();
            }
            this.setResponse(_Type === 'confirm', buttonID);
            this.confirmBoxBelonging.EventsController.close();
        };
        ConfirmBoxWrapperComponent.prototype.closeParent$ = function (_ClosingAnimation) {
            this.fadeInOutAnimation = _ClosingAnimation;
            var timer = _ClosingAnimation === 'close-slow' ? 1400 : 150;
            return new rxjs.Observable(function (observer) {
                observer.next('');
                observer.complete();
            }).pipe(operators.delay(timer));
        };
        return ConfirmBoxWrapperComponent;
    }());
    ConfirmBoxWrapperComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'app-confirm-box-wrapper',
                    template: "<div\n  class=\"ngx-awesome-popup-overlay\"\n  (dblclick)=\"onOverlayClicked($event)\"\n  [@fadeInOut]=\"fadeInOutAnimation\"\n>\n  <div\n    class=\"evolve-confirm-box\"\n    [ngClass]=\"{\n      'standard-dialog':\n        confirmBoxBelonging.ConfirmBoxCoreConfig.LayoutType === 0,\n      'success-dialog':\n        confirmBoxBelonging.ConfirmBoxCoreConfig.LayoutType === 1,\n      'info-dialog': confirmBoxBelonging.ConfirmBoxCoreConfig.LayoutType === 2,\n      'warning-dialog':\n        confirmBoxBelonging.ConfirmBoxCoreConfig.LayoutType === 3,\n      'danger-dialog': confirmBoxBelonging.ConfirmBoxCoreConfig.LayoutType === 4\n    }\"\n    [ngStyle]=\"{\n      width: confirmBoxBelonging.ConfirmBoxCoreConfig.Width,\n      height: confirmBoxBelonging.ConfirmBoxCoreConfig.Height\n    }\"\n  >\n    <div\n      class=\"confirm-box-title-content\"\n      *ngIf=\"confirmBoxBelonging.Dispatch.Title\"\n    >\n      <div class=\"dont-break-out\">\n        <div class=\"text-wrapper dont-break-out\">\n          <div class=\"confirm-box-title-text\">\n            {{ confirmBoxBelonging.Dispatch.Title }}\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div\n      class=\"content-holder\"\n      [ngClass]=\"confirmBoxBelonging.Dispatch.Title ? '' : 'without-title'\"\n      *ngIf=\"confirmBoxBelonging.Dispatch.Message\"\n    >\n      <div\n        class=\"icon-section\"\n        *ngIf=\"!confirmBoxBelonging.ConfirmBoxCoreConfig.DisableIcon\"\n      >\n        <span\n          class=\"icon-type-confirm-box\"\n          [ngClass]=\"{\n            '': confirmBoxBelonging.ConfirmBoxCoreConfig.LayoutType === 0,\n            'ap-icon-success icon-check-circle':\n              confirmBoxBelonging.ConfirmBoxCoreConfig.LayoutType === 1,\n            'ap-icon-info icon-info-circle':\n              confirmBoxBelonging.ConfirmBoxCoreConfig.LayoutType === 2,\n            'ap-icon-warning icon-warning':\n              confirmBoxBelonging.ConfirmBoxCoreConfig.LayoutType === 3,\n            'ap-icon-danger icon-times-circle':\n              confirmBoxBelonging.ConfirmBoxCoreConfig.LayoutType === 4\n          }\"\n        ></span>\n      </div>\n      <div class=\"text-wrapper-section confirm-box-inner-content\">\n        <!--<div class=\"dont-break-out\" [ngClass]=\"{'text-wrapper-section-with-icon': showIcon, 'text-wrapper-section': !showIcon}\">-->\n        <div class=\"dont-break-out\">\n          <div\n            class=\"text-wrapper dont-break-out\"\n            *ngIf=\"!confirmBoxBelonging.ConfirmBoxCoreConfig.AllowHTMLMessage\"\n          >\n            {{ confirmBoxBelonging.Dispatch.Message }}\n          </div>\n          <div\n            class=\"text-wrapper\"\n            *ngIf=\"confirmBoxBelonging.ConfirmBoxCoreConfig.AllowHTMLMessage\"\n            [innerHTML]=\"confirmBoxBelonging.Dispatch.Message\"\n          ></div>\n        </div>\n      </div>\n    </div>\n    <div class=\"button-holder\">\n      <div\n        class=\"button-section\"\n        *ngIf=\"confirmBoxBelonging.Buttons.length\"\n        [ngStyle]=\"{\n          'text-align': confirmBoxBelonging.ConfirmBoxCoreConfig.ButtonPosition\n        }\"\n      >\n        <button\n          class=\"ed-btn ed-btn-md\"\n          *ngFor=\"let button of confirmBoxBelonging.Buttons\"\n          (click)=\"onCustomButton(button)\"\n          [ngClass]=\"{\n            '': button.LayoutType ? button.LayoutType === 0 : false,\n            'ed-btn-success': button.LayoutType\n              ? button.LayoutType === 1\n              : false,\n            'ed-btn-info': button.LayoutType ? button.LayoutType === 2 : false,\n            'ed-btn-warning': button.LayoutType\n              ? button.LayoutType === 3\n              : false,\n            'ed-btn-danger': button.LayoutType\n              ? button.LayoutType === 4\n              : false,\n            'ed-btn-dark': button.LayoutType ? button.LayoutType === 5 : false,\n            'ed-btn-light': button.LayoutType ? button.LayoutType === 6 : false,\n            'ed-btn-primary': button.LayoutType\n              ? button.LayoutType === 7\n              : false,\n            'ed-btn-secondary': button.LayoutType\n              ? button.LayoutType === 8\n              : false,\n            'ed-btn-link': button.LayoutType ? button.LayoutType === 9 : false\n          }\"\n        >\n          {{ button.Label }}\n        </button>\n      </div>\n      <div\n        class=\"button-section\"\n        *ngIf=\"!confirmBoxBelonging.Buttons.length\"\n        [ngStyle]=\"{\n          'text-align': confirmBoxBelonging.ConfirmBoxCoreConfig.ButtonPosition\n        }\"\n      >\n        <button\n          class=\"ed-btn ed-btn-md\"\n          (click)=\"onButtonClick('confirm')\"\n          [ngClass]=\"{\n            'ed-btn-primary':\n              confirmBoxBelonging.ConfirmBoxCoreConfig.LayoutType === 0,\n            'ed-btn-success':\n              confirmBoxBelonging.ConfirmBoxCoreConfig.LayoutType === 1,\n            'ed-btn-info':\n              confirmBoxBelonging.ConfirmBoxCoreConfig.LayoutType === 2,\n            'ed-btn-warning':\n              confirmBoxBelonging.ConfirmBoxCoreConfig.LayoutType === 3,\n            'ed-btn-danger':\n              confirmBoxBelonging.ConfirmBoxCoreConfig.LayoutType === 4\n          }\"\n        >\n          {{ confirmBoxBelonging.ConfirmBoxCoreConfig.ConfirmLabel }}\n        </button>\n        <button\n          class=\"ed-btn ed-btn-md ed-btn-secondary\"\n          (click)=\"onButtonClick('decline')\"\n          *ngIf=\"confirmBoxBelonging.ConfirmBoxCoreConfig.DeclineLabel\"\n        >\n          {{ confirmBoxBelonging.ConfirmBoxCoreConfig.DeclineLabel }}\n        </button>\n      </div>\n    </div>\n  </div>\n</div>\n",
                    animations: [fadeInOut(0, 1)],
                    styles: [".ed-btn-sm{font-size:12px;font-weight:normal;margin-right:3px;min-width:40px;padding:2px 8px}.ed-btn-md{font-size:14px;margin-right:5px;min-width:60px;padding:3px 10px}.ed-btn-lg{font-size:16px;margin-right:5px;min-width:70px;padding:4px 10px}.ed-btn{background-color:transparent;border:none;border-radius:3px;cursor:pointer;display:inline-block;line-height:1.5;text-align:center;text-decoration:none;-webkit-user-select:none;user-select:none;vertical-align:middle}.ed-btn:hover{color:#989ea5}.ed-btn-check:focus+.ed-btn,.ed-btn:focus{box-shadow:0 0 1px 2px;outline:0}.ed-btn-check:checked+.ed-btn,.ed-btn-check:active+.ed-btn,.ed-btn:active,.ed-btn.active{box-shadow:0 0 1px 2px}.ed-btn-check:checked+.ed-btn:focus,.ed-btn-check:active+.ed-btn:focus,.ed-btn:active:focus,.ed-btn.active:focus{box-shadow:0 0 1px 2px}.ed-btn:disabled,.ed-btn.disabled,fieldset:disabled .ed-btn{box-shadow:none;opacity:.6;pointer-events:none}.ed-btn-primary{color:#fbfbfbcc;background:#ff9e00;border-color:#ff9e00}.ed-btn-primary:hover{color:#fbfbfb;border-color:#ffa81a;background:#ffb133}.ed-btn-check:focus+.ed-btn-primary,.ed-btn-primary:focus{outline:0;box-shadow:0 0 1px 2px #ffa81a}.ed-btn-check:checked+.ed-btn-primary,.ed-btn-check:active+.ed-btn-primary,.ed-btn-primary:active,.ed-btn-primary.active{box-shadow:0 0 1px 2px #ffa81a}.ed-btn-check:checked+.ed-btn-primary:focus,.ed-btn-check:active+.ed-btn-primary:focus,.ed-btn-primary:active:focus,.ed-btn-primary.active:focus{box-shadow:0 0 1px 2px #ffa81a}.ed-btn-secondary{color:#fbfbfbcc;background:#989ea5;border-color:#989ea5}.ed-btn-secondary:hover{color:#fbfbfb;border-color:#a6abb1;background:#b3b8bd}.ed-btn-check:focus+.ed-btn-secondary,.ed-btn-secondary:focus{outline:0;box-shadow:0 0 1px 2px #a6abb1}.ed-btn-check:checked+.ed-btn-secondary,.ed-btn-check:active+.ed-btn-secondary,.ed-btn-secondary:active,.ed-btn-secondary.active{box-shadow:0 0 1px 2px #a6abb1}.ed-btn-check:checked+.ed-btn-secondary:focus,.ed-btn-check:active+.ed-btn-secondary:focus,.ed-btn-secondary:active:focus,.ed-btn-secondary.active:focus{box-shadow:0 0 1px 2px #a6abb1}.ed-btn-success{color:#fbfbfbcc;background:#3caea3;border-color:#3caea3}.ed-btn-success:hover{color:#fbfbfb;border-color:#45bfb3;background:#58c5bb}.ed-btn-check:focus+.ed-btn-success,.ed-btn-success:focus{outline:0;box-shadow:0 0 1px 2px #45bfb3}.ed-btn-check:checked+.ed-btn-success,.ed-btn-check:active+.ed-btn-success,.ed-btn-success:active,.ed-btn-success.active{box-shadow:0 0 1px 2px #45bfb3}.ed-btn-check:checked+.ed-btn-success:focus,.ed-btn-check:active+.ed-btn-success:focus,.ed-btn-success:active:focus,.ed-btn-success.active:focus{box-shadow:0 0 1px 2px #45bfb3}.ed-btn-info{color:#fbfbfbcc;background:#2f8ee5;border-color:#2f8ee5}.ed-btn-info:hover{color:#fbfbfb;border-color:#469ae8;background:#5ca7eb}.ed-btn-check:focus+.ed-btn-info,.ed-btn-info:focus{outline:0;box-shadow:0 0 1px 2px #469ae8}.ed-btn-check:checked+.ed-btn-info,.ed-btn-check:active+.ed-btn-info,.ed-btn-info:active,.ed-btn-info.active{box-shadow:0 0 1px 2px #469ae8}.ed-btn-check:checked+.ed-btn-info:focus,.ed-btn-check:active+.ed-btn-info:focus,.ed-btn-info:active:focus,.ed-btn-info.active:focus{box-shadow:0 0 1px 2px #469ae8}.ed-btn-warning{color:#fbfbfbcc;background:#ffc107;border-color:#ffc107}.ed-btn-warning:hover{color:#fbfbfb;border-color:#ffc721;background:#ffce3a}.ed-btn-check:focus+.ed-btn-warning,.ed-btn-warning:focus{outline:0;box-shadow:0 0 1px 2px #ffc721}.ed-btn-check:checked+.ed-btn-warning,.ed-btn-check:active+.ed-btn-warning,.ed-btn-warning:active,.ed-btn-warning.active{box-shadow:0 0 1px 2px #ffc721}.ed-btn-check:checked+.ed-btn-warning:focus,.ed-btn-check:active+.ed-btn-warning:focus,.ed-btn-warning:active:focus,.ed-btn-warning.active:focus{box-shadow:0 0 1px 2px #ffc721}.ed-btn-danger{color:#fbfbfbcc;background:#e46464;border-color:#e46464}.ed-btn-danger:hover{color:#fbfbfb;border-color:#e87a7a;background:#ec8f8f}.ed-btn-check:focus+.ed-btn-danger,.ed-btn-danger:focus{outline:0;box-shadow:0 0 1px 2px #e87a7a}.ed-btn-check:checked+.ed-btn-danger,.ed-btn-check:active+.ed-btn-danger,.ed-btn-danger:active,.ed-btn-danger.active{box-shadow:0 0 1px 2px #e87a7a}.ed-btn-check:checked+.ed-btn-danger:focus,.ed-btn-check:active+.ed-btn-danger:focus,.ed-btn-danger:active:focus,.ed-btn-danger.active:focus{box-shadow:0 0 1px 2px #e87a7a}.ed-btn-light{color:#343a40cc;background:#fbfbfb;border-color:#fbfbfb}.ed-btn-light:hover{color:#343a40;border-color:#fff;background:white}.ed-btn-check:focus+.ed-btn-light,.ed-btn-light:focus{outline:0;box-shadow:0 0 1px 2px #fff}.ed-btn-check:checked+.ed-btn-light,.ed-btn-check:active+.ed-btn-light,.ed-btn-light:active,.ed-btn-light.active{box-shadow:0 0 1px 2px #fff}.ed-btn-check:checked+.ed-btn-light:focus,.ed-btn-check:active+.ed-btn-light:focus,.ed-btn-light:active:focus,.ed-btn-light.active:focus{box-shadow:0 0 1px 2px #fff}.ed-btn-dark{color:#fbfbfbcc;background:#343a40;border-color:#343a40}.ed-btn-dark:hover{color:#fbfbfb;border-color:#3f474e;background:#4b545c}.ed-btn-check:focus+.ed-btn-dark,.ed-btn-dark:focus{outline:0;box-shadow:0 0 1px 2px #3f474e}.ed-btn-check:checked+.ed-btn-dark,.ed-btn-check:active+.ed-btn-dark,.ed-btn-dark:active,.ed-btn-dark.active{box-shadow:0 0 1px 2px #3f474e}.ed-btn-check:checked+.ed-btn-dark:focus,.ed-btn-check:active+.ed-btn-dark:focus,.ed-btn-dark:active:focus,.ed-btn-dark.active:focus{box-shadow:0 0 1px 2px #3f474e}@font-face{font-family:\"icomoon\";src:url(data:font/eot;base64,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);src:url(data:font/eot;base64,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) format(\"embedded-opentype\"),url(data:font/ttf;base64,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) format(\"truetype\"),url(data:font/woff;base64,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) format(\"woff\"),url(data:font/svg;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiID4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPG1ldGFkYXRhPkdlbmVyYXRlZCBieSBJY29Nb29uPC9tZXRhZGF0YT4KCTxkZWZzPgoJCTxmb250IGlkPSJpY29tb29uIiBob3Jpei1hZHYteD0iMTAyNCI+CgkJCTxmb250LWZhY2UgdW5pdHMtcGVyLWVtPSIxMDI0IiBhc2NlbnQ9Ijk2MCIgZGVzY2VudD0iLTY0Ii8+CgkJCTxtaXNzaW5nLWdseXBoIGhvcml6LWFkdi14PSIxMDI0Ii8+CgkJCTxnbHlwaCB1bmljb2RlPSImI3gyMDsiIGhvcml6LWFkdi14PSI1MTIiIGQ9IiIvPgoJCQk8Z2x5cGggdW5pY29kZT0iJiN4ZTkwMDsiIGdseXBoLW5hbWU9InRpbWVzLWNpcmNsZSIgaG9yaXotYWR2LXg9Ijg3OCIgZD0iTTY1Ni41NzEgMzA5LjcxNGMwIDkuNzE0LTQgMTguODU3LTEwLjg1NyAyNS43MTRsLTEwMy40MjkgMTAzLjQyOSAxMDMuNDI5IDEwMy40MjljNi44NTcgNi44NTcgMTAuODU3IDE2IDEwLjg1NyAyNS43MTRzLTQgMTkuNDI5LTEwLjg1NyAyNi4yODZsLTUxLjQyOSA1MS40MjljLTYuODU3IDYuODU3LTE2LjU3MSAxMC44NTctMjYuMjg2IDEwLjg1N3MtMTguODU3LTQtMjUuNzE0LTEwLjg1N2wtMTAzLjQyOS0xMDMuNDI5LTEwMy40MjkgMTAzLjQyOWMtNi44NTcgNi44NTctMTYgMTAuODU3LTI1LjcxNCAxMC44NTdzLTE5LjQyOS00LTI2LjI4Ni0xMC44NTdsLTUxLjQyOS01MS40MjljLTYuODU3LTYuODU3LTEwLjg1Ny0xNi41NzEtMTAuODU3LTI2LjI4NnM0LTE4Ljg1NyAxMC44NTctMjUuNzE0bDEwMy40MjktMTAzLjQyOS0xMDMuNDI5LTEwMy40MjljLTYuODU3LTYuODU3LTEwLjg1Ny0xNi0xMC44NTctMjUuNzE0czQtMTkuNDI5IDEwLjg1Ny0yNi4yODZsNTEuNDI5LTUxLjQyOWM2Ljg1Ny02Ljg1NyAxNi41NzEtMTAuODU3IDI2LjI4Ni0xMC44NTdzMTguODU3IDQgMjUuNzE0IDEwLjg1N2wxMDMuNDI5IDEwMy40MjkgMTAzLjQyOS0xMDMuNDI5YzYuODU3LTYuODU3IDE2LTEwLjg1NyAyNS43MTQtMTAuODU3czE5LjQyOSA0IDI2LjI4NiAxMC44NTdsNTEuNDI5IDUxLjQyOWM2Ljg1NyA2Ljg1NyAxMC44NTcgMTYuNTcxIDEwLjg1NyAyNi4yODZ6TTg3Ny43MTQgNDM4Ljg1N2MwLTI0Mi4yODYtMTk2LjU3MS00MzguODU3LTQzOC44NTctNDM4Ljg1N3MtNDM4Ljg1NyAxOTYuNTcxLTQzOC44NTcgNDM4Ljg1NyAxOTYuNTcxIDQzOC44NTcgNDM4Ljg1NyA0MzguODU3IDQzOC44NTctMTk2LjU3MSA0MzguODU3LTQzOC44NTd6Ii8+CgkJCTxnbHlwaCB1bmljb2RlPSImI3hlOTAxOyIgZ2x5cGgtbmFtZT0iZXhjbGFtYXRpb24tdHJpYW5nbGUsIHdhcm5pbmciIGQ9Ik01ODUuMTQzIDE2NS4xNDN2MTA4LjU3MWMwIDEwLjI4Ni04IDE4Ljg1Ny0xOC4yODYgMTguODU3aC0xMDkuNzE0Yy0xMC4yODYgMC0xOC4yODYtOC41NzEtMTguMjg2LTE4Ljg1N3YtMTA4LjU3MWMwLTEwLjI4NiA4LTE4Ljg1NyAxOC4yODYtMTguODU3aDEwOS43MTRjMTAuMjg2IDAgMTguMjg2IDguNTcxIDE4LjI4NiAxOC44NTd6TTU4NCAzNzguODU3bDEwLjI4NiAyNjIuMjg2YzAgMy40MjktMS43MTQgOC01LjcxNCAxMC44NTctMy40MjkgMi44NTctOC41NzEgNi4yODYtMTMuNzE0IDYuMjg2aC0xMjUuNzE0Yy01LjE0MyAwLTEwLjI4Ni0zLjQyOS0xMy43MTQtNi4yODYtNC0yLjg1Ny01LjcxNC04LjU3MS01LjcxNC0xMmw5LjcxNC0yNjEuMTQzYzAtNy40MjkgOC41NzEtMTMuMTQzIDE5LjQyOS0xMy4xNDNoMTA1LjcxNGMxMC4yODYgMCAxOC44NTcgNS43MTQgMTkuNDI5IDEzLjE0M3pNNTc2IDkxMi41NzFsNDM4Ljg1Ny04MDQuNTcxYzEyLjU3MS0yMi4yODYgMTItNDkuNzE0LTEuMTQzLTcycy0zNy4xNDMtMzYtNjIuODU3LTM2aC04NzcuNzE0Yy0yNS43MTQgMC00OS43MTQgMTMuNzE0LTYyLjg1NyAzNnMtMTMuNzE0IDQ5LjcxNC0xLjE0MyA3Mmw0MzguODU3IDgwNC41NzFjMTIuNTcxIDIzLjQyOSAzNy4xNDMgMzguMjg2IDY0IDM4LjI4NnM1MS40MjktMTQuODU3IDY0LTM4LjI4NnoiLz4KCQkJPGdseXBoIHVuaWNvZGU9IiYjeGU5MDI7IiBnbHlwaC1uYW1lPSJjaGVjay1jaXJjbGUiIGhvcml6LWFkdi14PSI4NzgiIGQ9Ik03MzMuNzE0IDUzMS40MjhjMCA5LjcxNC0zLjQyOSAxOS40MjktMTAuMjg2IDI2LjI4NmwtNTIgNTEuNDI5Yy02Ljg1NyA2Ljg1Ny0xNiAxMC44NTctMjUuNzE0IDEwLjg1N3MtMTguODU3LTQtMjUuNzE0LTEwLjg1N2wtMjMzLjE0My0yMzIuNTcxLTEyOS4xNDMgMTI5LjE0M2MtNi44NTcgNi44NTctMTYgMTAuODU3LTI1LjcxNCAxMC44NTdzLTE4Ljg1Ny00LTI1LjcxNC0xMC44NTdsLTUyLTUxLjQyOWMtNi44NTctNi44NTctMTAuMjg2LTE2LjU3MS0xMC4yODYtMjYuMjg2czMuNDI5LTE4Ljg1NyAxMC4yODYtMjUuNzE0bDIwNi44NTctMjA2Ljg1N2M2Ljg1Ny02Ljg1NyAxNi41NzEtMTAuODU3IDI1LjcxNC0xMC44NTcgOS43MTQgMCAxOS40MjkgNCAyNi4yODYgMTAuODU3bDMxMC4yODYgMzEwLjI4NmM2Ljg1NyA2Ljg1NyAxMC4yODYgMTYgMTAuMjg2IDI1LjcxNHpNODc3LjcxNCA0MzguODU3YzAtMjQyLjI4Ni0xOTYuNTcxLTQzOC44NTctNDM4Ljg1Ny00MzguODU3cy00MzguODU3IDE5Ni41NzEtNDM4Ljg1NyA0MzguODU3IDE5Ni41NzEgNDM4Ljg1NyA0MzguODU3IDQzOC44NTcgNDM4Ljg1Ny0xOTYuNTcxIDQzOC44NTctNDM4Ljg1N3oiLz4KCQkJPGdseXBoIHVuaWNvZGU9IiYjeGU5MDM7IiBnbHlwaC1uYW1lPSJpbmZvLWNpcmNsZSIgaG9yaXotYWR2LXg9Ijg3OCIgZD0iTTU4NS4xNDMgMTY0LjU3MXY5MS40MjljMCAxMC4yODYtOCAxOC4yODYtMTguMjg2IDE4LjI4NmgtNTQuODU3djI5Mi41NzFjMCAxMC4yODYtOCAxOC4yODYtMTguMjg2IDE4LjI4NmgtMTgyLjg1N2MtMTAuMjg2IDAtMTguMjg2LTgtMTguMjg2LTE4LjI4NnYtOTEuNDI5YzAtMTAuMjg2IDgtMTguMjg2IDE4LjI4Ni0xOC4yODZoNTQuODU3di0xODIuODU3aC01NC44NTdjLTEwLjI4NiAwLTE4LjI4Ni04LTE4LjI4Ni0xOC4yODZ2LTkxLjQyOWMwLTEwLjI4NiA4LTE4LjI4NiAxOC4yODYtMTguMjg2aDI1NmMxMC4yODYgMCAxOC4yODYgOCAxOC4yODYgMTguMjg2ek01MTIgNjc2LjU3MXY5MS40MjljMCAxMC4yODYtOCAxOC4yODYtMTguMjg2IDE4LjI4NmgtMTA5LjcxNGMtMTAuMjg2IDAtMTguMjg2LTgtMTguMjg2LTE4LjI4NnYtOTEuNDI5YzAtMTAuMjg2IDgtMTguMjg2IDE4LjI4Ni0xOC4yODZoMTA5LjcxNGMxMC4yODYgMCAxOC4yODYgOCAxOC4yODYgMTguMjg2ek04NzcuNzE0IDQzOC44NTdjMC0yNDIuMjg2LTE5Ni41NzEtNDM4Ljg1Ny00MzguODU3LTQzOC44NTdzLTQzOC44NTcgMTk2LjU3MS00MzguODU3IDQzOC44NTcgMTk2LjU3MSA0MzguODU3IDQzOC44NTcgNDM4Ljg1NyA0MzguODU3LTE5Ni41NzEgNDM4Ljg1Ny00MzguODU3eiIvPgoJCTwvZm9udD48L2RlZnM+Cjwvc3ZnPgo=) format(\"svg\");font-weight:normal;font-style:normal;font-display:block}[class^=icon-],[class*=\" icon-\"]{font-family:\"icomoon\"!important;-webkit-font-smoothing:antialiased;font-style:normal;font-feature-settings:normal;font-variant:normal;font-weight:normal;line-height:1;-moz-osx-font-smoothing:grayscale;speak:never;text-transform:none}.icon-times-circle:before{content:\"\\e900\"}.icon-exclamation-triangle:before{content:\"\\e901\"}.icon-warning:before{content:\"\\e901\"}.icon-check-circle:before{content:\"\\e902\"}.icon-info-circle:before{content:\"\\e903\"}.ngx-awesome-popup-overlay{align-items:center;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px);background:rgba(51,32,0,.4);bottom:0;display:flex;flex-direction:column;justify-content:center;left:0;opacity:0;position:fixed;right:0;top:0;z-index:999999999}.evolve-parent-dialog .text-wrapper,.evolve-confirm-box .text-wrapper{text-align:center}.evolve-parent-dialog .text-wrapper-section,.evolve-confirm-box .text-wrapper-section,.evolve-toast .text-wrapper-section{width:100%}.evolve-parent-dialog .text-wrapper-section .text-wrapper,.evolve-confirm-box .text-wrapper-section .text-wrapper,.evolve-toast .text-wrapper-section .text-wrapper{display:block;width:100%}.evolve-parent-dialog .text-wrapper-section .dont-break-out,.evolve-confirm-box .text-wrapper-section .dont-break-out,.evolve-toast .text-wrapper-section .dont-break-out{-webkit-hyphens:auto;hyphens:auto;overflow-wrap:break-word;white-space:pre-wrap;word-wrap:break-word}.evolve-parent-dialog,.evolve-confirm-box{background:#fbfbfb;border-radius:5px;border-top:7px solid;box-shadow:0 0 4px 1px #00000040;display:flex;flex-direction:column;max-height:calc(100vh - 100px);max-width:calc(100vw - 100px);box-sizing:border-box;position:relative;vertical-align:bottom}.evolve-parent-dialog.standard-dialog,.evolve-confirm-box.standard-dialog{border-color:transparent;padding:17px 20px 10px}.evolve-parent-dialog.success-dialog,.evolve-confirm-box.success-dialog{border-color:#3caea3}.evolve-parent-dialog.info-dialog,.evolve-confirm-box.info-dialog{border-color:#2f8ee5}.evolve-parent-dialog.warning-dialog,.evolve-confirm-box.warning-dialog{border-color:#ffc107}.evolve-parent-dialog.danger-dialog,.evolve-confirm-box.danger-dialog{border-color:#e46464}.ap-icon-success{color:#58c5bb}.ap-icon-info{color:#5ca7eb}.ap-icon-warning{color:#ffce3a}.ap-icon-danger{color:#ec8f8f}.ngx-awesome-popup-overlay .evolve-confirm-box{padding:0 20px}.ngx-awesome-popup-overlay .evolve-confirm-box .confirm-box-title-content{align-items:center;background-clip:padding-box;border-bottom:1px solid rgba(0,0,0,.05);color:#6c757d;display:flex;flex-direction:column;height:auto;justify-content:center;margin:8px 0 10px;padding:2px 10px 5px;width:auto}.ngx-awesome-popup-overlay .evolve-confirm-box .confirm-box-title-content .confirm-box-title-text{font-size:18px;font-weight:bold}.ngx-awesome-popup-overlay .evolve-confirm-box .content-holder{align-items:center;color:#495057;display:flex;flex-direction:row;height:100%;justify-content:space-between;overflow:auto;width:100%}.ngx-awesome-popup-overlay .evolve-confirm-box .content-holder.without-title{margin-top:10px}.ngx-awesome-popup-overlay .evolve-confirm-box .content-holder .icon-section .icon-type-confirm-box{font-size:34px;margin:4px}.ngx-awesome-popup-overlay .evolve-confirm-box .content-holder .confirm-box-inner-content{padding:5px 10px}.ngx-awesome-popup-overlay .evolve-confirm-box .content-holder .text-wrapper p{margin:0}.ngx-awesome-popup-overlay .evolve-confirm-box .button-holder{display:flex;flex-direction:column;justify-content:flex-end;margin:10px 0 8px;width:100%}.ngx-awesome-popup-overlay .evolve-confirm-box .button-holder .button-section{margin:0;padding:4px 10px}\n"]
                },] }
    ];
    ConfirmBoxWrapperComponent.ctorParameters = function () { return [
        { type: ConfirmBoxBelonging, decorators: [{ type: i0.Inject, args: ['confirmBoxBelonging',] }] },
        { type: i0.ChangeDetectorRef }
    ]; };

    var ConfirmBoxService = /** @class */ (function () {
        function ConfirmBoxService(componentFactoryResolver, injector, appRef) {
            this.componentFactoryResolver = componentFactoryResolver;
            this.injector = injector;
            this.appRef = appRef;
            this.confirmBoxComponentRefList = [];
        }
        ConfirmBoxService.prototype.open = function (_ConfirmBoxBelonging) {
            var dialogController = _ConfirmBoxBelonging.EventsController;
            var componentRef = this.getComponentRef(dialogController, _ConfirmBoxBelonging);
            this.confirmBoxComponentRefList.push(componentRef);
            componentRef.instance.confirmBoxBelonging = _ConfirmBoxBelonging;
            this.appendToBodyParentComponent(componentRef);
            this.listeners(dialogController);
            return dialogController;
        };
        ConfirmBoxService.prototype.getComponentRef = function (_EventsController, _ConfirmBoxBelonging) {
            var componentFactory;
            var dialogIndex = this.findDialogIndex(_ConfirmBoxBelonging.EntityUniqueID);
            if (dialogIndex === -1) {
                var weakMap = new WeakMap();
                weakMap.set(ConfirmBoxEventsController, _EventsController);
                componentFactory = this.componentFactoryResolver.resolveComponentFactory(ConfirmBoxWrapperComponent);
                return componentFactory.create(new DialogInjector(this.injector, weakMap));
            }
            return null;
        };
        ConfirmBoxService.prototype.listeners = function (_EventsController) {
            var _this = this;
            // Listener for closing dialog
            var closeDialogSubscription = _EventsController.afterClosed$.subscribe(function (response) {
                var modalIndex = _this.findDialogIndex(response.confirmBoxBelonging.EntityUniqueID);
                _this.removeFromBodyParentComponent(modalIndex);
                closeDialogSubscription.unsubscribe();
            });
        };
        ConfirmBoxService.prototype.appendToBodyParentComponent = function (_ComponentRef) {
            // attach view to ignite lifecycle hooks
            this.appRef.attachView(_ComponentRef.hostView);
            // DOM
            var domElem = _ComponentRef.hostView
                .rootNodes[0];
            document.body.appendChild(domElem);
        };
        ConfirmBoxService.prototype.closeDialogWrapperComponent = function (_DialogUniqueID) {
            var modalIndex = this.findDialogIndex(_DialogUniqueID);
            this.removeFromBodyParentComponent(modalIndex);
        };
        ConfirmBoxService.prototype.removeFromBodyParentComponent = function (_DialogIndex) {
            var _this = this;
            if (_DialogIndex > -1) {
                this.confirmBoxComponentRefList[_DialogIndex].instance
                    .closeParent$('close-fast')
                    .pipe(operators.map(function (item) {
                    _this.appRef.detachView(_this.confirmBoxComponentRefList[_DialogIndex].hostView);
                    _this.confirmBoxComponentRefList[_DialogIndex].destroy();
                    _this.confirmBoxComponentRefList.splice(_DialogIndex, 1);
                }))
                    .subscribe();
            }
        };
        ConfirmBoxService.prototype.findDialogIndex = function (_DialogUniqueID) {
            return this.confirmBoxComponentRefList.findIndex(function (item) {
                return (_DialogUniqueID === item.instance.confirmBoxBelonging.EntityUniqueID);
            });
        };
        return ConfirmBoxService;
    }());
    ConfirmBoxService.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function ConfirmBoxService_Factory() { return new ConfirmBoxService(i0__namespace.ɵɵinject(i0__namespace.ComponentFactoryResolver), i0__namespace.ɵɵinject(i0__namespace.INJECTOR), i0__namespace.ɵɵinject(i0__namespace.ApplicationRef)); }, token: ConfirmBoxService, providedIn: "root" });
    ConfirmBoxService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    ConfirmBoxService.ctorParameters = function () { return [
        { type: i0.ComponentFactoryResolver },
        { type: i0.Injector },
        { type: i0.ApplicationRef }
    ]; };

    var ConfirmBoxInitializer = /** @class */ (function () {
        function ConfirmBoxInitializer() {
            /** @internal */
            this.confirmBoxCarrier = new ConfirmBoxCarrier();
        }
        ConfirmBoxInitializer.prototype.openConfirmBox$ = function () {
            return this.confirmBoxCarrier.openConfirmBox$().pipe(operators.map(function (resp) {
                var basicConfirmBoxResponse = new ConfirmBoxResponse();
                var dataControl = new DataControl();
                dataControl.copyValuesFrom(resp, basicConfirmBoxResponse);
                return basicConfirmBoxResponse;
            }), operators.take(1));
        };
        ConfirmBoxInitializer.prototype.setButtons = function (_Buttons) {
            this.confirmBoxCarrier.setButtons(_Buttons);
        };
        ConfirmBoxInitializer.prototype.setConfig = function (_ConfirmBoxCoreConfig) {
            this.confirmBoxCarrier.setConfig(_ConfirmBoxCoreConfig);
        };
        ConfirmBoxInitializer.prototype.setDispatch = function (_Title, _Message) {
            if (_Message === void 0) { _Message = null; }
            this.confirmBoxCarrier.setTitle(_Title);
            this.confirmBoxCarrier.setMessage(_Message);
        };
        ConfirmBoxInitializer.prototype.setTitle = function (_Title) {
            this.confirmBoxCarrier.setTitle(_Title);
        };
        ConfirmBoxInitializer.prototype.setMessage = function (_Message) {
            this.confirmBoxCarrier.setMessage(_Message);
        };
        ConfirmBoxInitializer.prototype.setButtonLabels = function (_Confirm, _Decline) {
            this.confirmBoxCarrier.setButtonLabels(_Confirm, _Decline);
        };
        return ConfirmBoxInitializer;
    }());
    var ConfirmBoxResponse = /** @class */ (function (_super) {
        __extends(ConfirmBoxResponse, _super);
        function ConfirmBoxResponse() {
            var _this = _super.call(this) || this;
            // private Response: DialogPrepareResponse            = new DialogPrepareResponse();
            _this.Success = null;
            _this.ClickedButtonID = null;
            return _this;
        }
        ConfirmBoxResponse.prototype.setSuccess = function (_IsSuccess) {
            this.Success = _IsSuccess;
        };
        ConfirmBoxResponse.prototype.setClickedButtonID = function (_ClickedButtonID) {
            this.ClickedButtonID = _ClickedButtonID;
        };
        return ConfirmBoxResponse;
    }(DataControl));
    var ConfirmBoxEventsController = /** @class */ (function () {
        function ConfirmBoxEventsController(EntityUniqueID) {
            this.EntityUniqueID = EntityUniqueID;
            this._afterClosed = new rxjs.Subject();
            this.afterClosed$ = this._afterClosed.asObservable();
            this._onButtonClick = new rxjs.Subject();
            this.onButtonClick$ = this._onButtonClick.asObservable();
            this._buttonList = new rxjs.Subject();
            this.buttonList$ = this._buttonList.asObservable();
        }
        ConfirmBoxEventsController.prototype.close = function (_Response) {
            var response = _Response ? _Response : this.defaultResponse;
            this._afterClosed.next(response);
        };
        ConfirmBoxEventsController.prototype.onButtonClick = function (_Button) {
            this.defaultResponse.setClickedButtonID(_Button.ID);
            this._onButtonClick.next(_Button);
        };
        ConfirmBoxEventsController.prototype.setButtonList = function (_ButtonList) {
            this._buttonList.next(_ButtonList);
        };
        ConfirmBoxEventsController.prototype.setDefaultResponse = function (_Response) {
            this.defaultResponse = _Response;
        };
        return ConfirmBoxEventsController;
    }());
    // endregion
    var ConfirmBoxDefaultResponse = /** @class */ (function (_super) {
        __extends(ConfirmBoxDefaultResponse, _super);
        function ConfirmBoxDefaultResponse() {
            var _this = _super.call(this) || this;
            _this.confirmBoxBelonging = null;
            return _this;
        }
        ConfirmBoxDefaultResponse.prototype.setBelonging = function (_ConfirmBoxBelonging) {
            this.confirmBoxBelonging = _ConfirmBoxBelonging;
        };
        return ConfirmBoxDefaultResponse;
    }(ConfirmBoxResponse));
    var ConfirmBoxCarrier = /** @class */ (function () {
        function ConfirmBoxCarrier() {
            this.confirmBoxBelonging = new ConfirmBoxBelonging();
        }
        ConfirmBoxCarrier.prototype.setButtons = function (_Buttons) {
            if (_Buttons.length) {
                this.confirmBoxBelonging.Buttons = _Buttons;
            }
        };
        ConfirmBoxCarrier.prototype.setTitle = function (_Title) {
            this.confirmBoxBelonging.Dispatch.Title = _Title;
        };
        ConfirmBoxCarrier.prototype.setMessage = function (_Message) {
            this.confirmBoxBelonging.Dispatch.Message = _Message;
        };
        ConfirmBoxCarrier.prototype.setButtonLabels = function (_Confirm, _Decline) {
            this.confirmBoxBelonging.ConfirmBoxCoreConfig.ConfirmLabel = _Confirm;
            this.confirmBoxBelonging.ConfirmBoxCoreConfig.DeclineLabel = _Decline;
        };
        ConfirmBoxCarrier.prototype.setConfig = function (_ConfirmBoxBelonging) {
            // region *** local UserConfig (defined on place where dialog is called) ***
            var dataControl = new DataControl();
            dataControl.copyValuesFrom(_ConfirmBoxBelonging, this.confirmBoxBelonging.ConfirmBoxCoreConfig);
            // endregion
        };
        ConfirmBoxCarrier.prototype.openConfirmBox$ = function () {
            var service = ServiceLocator.injector.get(ConfirmBoxService);
            var confirmBoxController = service.open(this.confirmBoxBelonging);
            return confirmBoxController.afterClosed$;
        };
        return ConfirmBoxCarrier;
    }());
    var ConfirmBoxSettings = /** @class */ (function () {
        function ConfirmBoxSettings() {
            this.Buttons = [];
            this.ConfirmBoxCoreConfig = new ConfirmBoxCoreConfig();
            this.Dispatch = new Dispatch();
        }
        return ConfirmBoxSettings;
    }());
    var ConfirmBoxCoreConfig = /** @class */ (function () {
        function ConfirmBoxCoreConfig() {
            this.Width = null;
            this.Height = null;
            this.ButtonPosition = null;
            this.LayoutType = null;
            this.Dispatch = null;
            this.ConfirmLabel = null;
            this.DeclineLabel = null;
            this.DisableIcon = null;
            this.AllowHTMLMessage = null;
        }
        return ConfirmBoxCoreConfig;
    }());
    var ConfirmBoxBelonging = /** @class */ (function (_super) {
        __extends(ConfirmBoxBelonging, _super);
        function ConfirmBoxBelonging() {
            var _this = _super.call(this) || this;
            _this.EntityUniqueID = 'C' + Math.random().toString(36).substr(2, 9);
            _this.EventsController = new ConfirmBoxEventsController(_this.EntityUniqueID);
            var ConfirmBoxCoreConfigurator = ServiceLocator.injector.get(ConfirmBoxConfigService);
            var baseSettings = new ConfirmBoxSettings();
            var dataControl = new DataControl();
            dataControl.copyValuesFrom(ConfirmBoxCoreConfigurator.productionConfig.ConfirmBoxCoreConfig, baseSettings.ConfirmBoxCoreConfig);
            _this.ConfirmBoxCoreConfig = baseSettings.ConfirmBoxCoreConfig;
            _this.Buttons = ConfirmBoxCoreConfigurator.productionConfig.Buttons.slice();
            return _this;
        }
        return ConfirmBoxBelonging;
    }(ConfirmBoxSettings));

    var DefaultLoaderComponent = /** @class */ (function () {
        function DefaultLoaderComponent() {
        }
        return DefaultLoaderComponent;
    }());
    DefaultLoaderComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: "ed-default-loader",
                    template: "<div class=\"box-position\">\n  <div class=\"loader-center\">\n    <div class=\"lds-ring\">\n      <div></div>\n      <div></div>\n      <div></div>\n      <div></div>\n    </div>\n  </div>\n</div>\n",
                    styles: [".box-position{height:auto;left:50%;margin:0 auto;position:absolute;text-align:center;top:44%;transform:translate(-50%,-40%)}.box-position .loader-center{align-items:center;display:flex;justify-content:center}.box-position .loader-center .lds-ring{display:inline-block;height:80px;position:relative;width:80px}.box-position .loader-center .lds-ring div{animation:lds-ring 1.2s cubic-bezier(.5,0,.5,1) infinite;border:8px solid;border-color:#d4d4d4 transparent transparent transparent;border-radius:50%;box-sizing:border-box;display:block;height:64px;margin:8px;position:absolute;width:64px}.box-position .loader-center .lds-ring div:nth-child(1){animation-delay:-.45s}.box-position .loader-center .lds-ring div:nth-child(2){animation-delay:-.3s}.box-position .loader-center .lds-ring div:nth-child(3){animation-delay:-.15s}@keyframes lds-ring{0%{transform:rotate(0)}to{transform:rotate(360deg)}}\n"]
                },] }
    ];

    var DialogConfigService = /** @class */ (function () {
        function DialogConfigService(userConfig) {
            if (userConfig === void 0) { userConfig = {}; }
            this.userConfig = userConfig;
            this.authorConfig = new DialogSettings();
            this.productionConfig = new DialogSettings();
            // region *** dialog userConfig (user input app-module) ***
            var userConfigBase = new DialogSettings();
            var dataControl = new DataControl();
            dataControl.copyValuesFrom(userConfig.DialogCoreConfig, userConfigBase.DialogCoreConfig); // this will make sure that object has right properties
            userConfig.DialogCoreConfig = userConfigBase.DialogCoreConfig;
            if (userConfig.DialogCoreConfig.LoaderComponent !== null) {
                userConfig.DialogCoreConfig.DisplayLoader =
                    userConfig.DialogCoreConfig.DisplayLoader === null;
            }
            // endregion
            // region *** author default config values (if there is no user input) ***
            this.authorConfig.DialogCoreConfig.Width = 'auto';
            this.authorConfig.DialogCoreConfig.Height = 'auto';
            this.authorConfig.DialogCoreConfig.HideScrollbar = false;
            this.authorConfig.DialogCoreConfig.EscapeKeyClose = false;
            this.authorConfig.DialogCoreConfig.ButtonPosition = 'right';
            this.authorConfig.DialogCoreConfig.DisplayLoader = false;
            this.authorConfig.DialogCoreConfig.FullScreen = false;
            this.authorConfig.DialogCoreConfig.LayoutType = exports.DialogLayoutDisplay.NONE;
            this.authorConfig.DialogCoreConfig.LoaderComponent = DefaultLoaderComponent;
            // endregion
            dataControl.copyValuesFrom(this.authorConfig.DialogCoreConfig, this.productionConfig.DialogCoreConfig);
            dataControl.copyValuesFrom(userConfig.DialogCoreConfig, this.productionConfig.DialogCoreConfig);
            // Buttons
            /*if(userConfig.Buttons){
                    this.config.Buttons.push(
                        new ButtonMaker('Ok', 'ok', ButtonLayoutDisplay.PRIMARY)
                        ,new ButtonMaker('Cancel', 'cancel', ButtonLayoutDisplay.SECONDARY)
                    );
                }*/
        }
        return DialogConfigService;
    }());
    DialogConfigService.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function DialogConfigService_Factory() { return new DialogConfigService(i0__namespace.ɵɵinject("dialogConfig")); }, token: DialogConfigService, providedIn: "root" });
    DialogConfigService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    DialogConfigService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: ['dialogConfig',] }] }
    ]; };

    var InsertionLoaderDirective = /** @class */ (function () {
        function InsertionLoaderDirective(viewContainerRef) {
            this.viewContainerRef = viewContainerRef;
        }
        return InsertionLoaderDirective;
    }());
    InsertionLoaderDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: "[appInsertionLoader]",
                },] }
    ];
    InsertionLoaderDirective.ctorParameters = function () { return [
        { type: i0.ViewContainerRef }
    ]; };

    var InsertionDirective = /** @class */ (function () {
        function InsertionDirective(viewContainerRef) {
            this.viewContainerRef = viewContainerRef;
        }
        return InsertionDirective;
    }());
    InsertionDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: "[appInsertion]",
                },] }
    ];
    InsertionDirective.ctorParameters = function () { return [
        { type: i0.ViewContainerRef }
    ]; };

    var DialogWrapperComponent = /** @class */ (function () {
        function DialogWrapperComponent(dialogBelonging, componentFactoryResolver, cd) {
            this.dialogBelonging = dialogBelonging;
            this.componentFactoryResolver = componentFactoryResolver;
            this.cd = cd;
            this.fadeInOutAnimation = 'open';
            this.showLoader = true;
        }
        DialogWrapperComponent.prototype.ngAfterViewInit = function () {
            this.hideScrollbar(); // hide scrollbar if config enabled
            this.loadChildComponent(this.childComponentType);
            this.loadLoaderComponent(this.dialogBelonging.DialogCoreConfig.LoaderComponent);
            this.setDefaultResponse();
            this.cd.detectChanges();
        };
        DialogWrapperComponent.prototype.hideScrollbar = function () {
            if (this.dialogBelonging.DialogCoreConfig.HideScrollbar) {
                this.bodyOverflow = document.body.style.overflow;
                document.body.style.overflow = 'hidden';
            }
        };
        DialogWrapperComponent.prototype.revertScrollbarSettings = function () {
            if (this.dialogBelonging.DialogCoreConfig.HideScrollbar) {
                document.body.style.overflow = this.bodyOverflow;
            }
        };
        DialogWrapperComponent.prototype.setDefaultResponse = function () {
            var dialogResponse = new DialogDefaultResponse();
            dialogResponse.setBelonging(this.dialogBelonging);
            this.dialogBelonging.EventsController.setDefaultResponse(dialogResponse);
        };
        DialogWrapperComponent.prototype.ngOnDestroy = function () {
            this.revertScrollbarSettings();
            if (this.childComponentRef) {
                this.childComponentRef.destroy();
            }
            if (this.loaderComponentRef) {
                this.loaderComponentRef.destroy();
            }
        };
        DialogWrapperComponent.prototype.hideScroller = function () { };
        DialogWrapperComponent.prototype.loadChildComponent = function (_ComponentType) {
            var componentFactory = this.componentFactoryResolver.resolveComponentFactory(_ComponentType);
            var viewContainerRef = this.insertionPoint.viewContainerRef;
            viewContainerRef.clear();
            this.childComponentRef = viewContainerRef.createComponent(componentFactory);
            this.childComponentRef.instance.dialogBelonging = this.dialogBelonging;
        };
        DialogWrapperComponent.prototype.loadLoaderComponent = function (_LoaderRef) {
            var componentFactory = this.componentFactoryResolver.resolveComponentFactory(_LoaderRef);
            var viewContainerRef = this.loaderInsertionPoint.viewContainerRef;
            viewContainerRef.clear();
            this.loaderComponentRef = viewContainerRef.createComponent(componentFactory);
        };
        DialogWrapperComponent.prototype.close = function () {
            this.dialogBelonging.EventsController.close();
        };
        DialogWrapperComponent.prototype.closeParent$ = function (_ClosingAnimation) {
            this.fadeInOutAnimation = _ClosingAnimation;
            var timer = _ClosingAnimation === 'close-slow' ? 1400 : 150;
            return new rxjs.Observable(function (observer) {
                observer.next('');
                observer.complete();
            }).pipe(operators.delay(timer));
        };
        DialogWrapperComponent.prototype.onOverlayClicked = function (evt) {
            // console.log('onOverlayClicked');
        };
        DialogWrapperComponent.prototype.onCustomButton = function (_Button) {
            this.dialogBelonging.EventsController.onButtonClick(_Button);
        };
        DialogWrapperComponent.prototype.closeLoader = function () {
            this.showLoader = false;
        };
        DialogWrapperComponent.prototype.keyEvent = function (event) {
            if (event.key === 'Escape') {
                this.close();
            }
        };
        return DialogWrapperComponent;
    }());
    DialogWrapperComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'dialog-popup-wrapper',
                    template: "<div\n  class=\"ngx-awesome-popup-overlay\"\n  (dblclick)=\"onOverlayClicked($event)\"\n  [@fadeInOut]=\"fadeInOutAnimation\"\n>\n  <div\n    class=\"evolve-parent-dialog\"\n    [ngStyle]=\"\n      dialogBelonging.DialogCoreConfig.FullScreen && {\n        maxWidth: '100vw',\n        maxHeight: '100vh',\n        width: '100%',\n        borderRadius: '0'\n      }\n    \"\n    [ngClass]=\"{\n      'standard-dialog': dialogBelonging.DialogCoreConfig.LayoutType === 0,\n      'success-dialog': dialogBelonging.DialogCoreConfig.LayoutType === 1,\n      'info-dialog': dialogBelonging.DialogCoreConfig.LayoutType === 2,\n      'warning-dialog': dialogBelonging.DialogCoreConfig.LayoutType === 3,\n      'danger-dialog': dialogBelonging.DialogCoreConfig.LayoutType === 4\n    }\"\n  >\n    <div\n      class=\"loader-holder\"\n      [ngClass]=\"\n        !dialogBelonging.DialogCoreConfig.DisplayLoader\n          ? 'dialog-loader-off'\n          : showLoader\n          ? 'dialog-loader-active'\n          : 'dialog-loader-gone'\n      \"\n    >\n      <!--dialogBelonging.DialogCoreConfig.DisplayLoader => initial config-->\n      <div class=\"dialog-loader\">\n        <ng-template appInsertionLoader></ng-template>\n      </div>\n    </div>\n    <ng-container\n      *ngIf=\"!dialogBelonging.DialogCoreConfig.FullScreen; else fullScreen\"\n    >\n    </ng-container>\n    <ng-template #fullScreen></ng-template>\n    <div\n      class=\"content-holder\"\n      [ngStyle]=\"\n        dialogBelonging.DialogCoreConfig.FullScreen\n          ? {\n              width: '100vw',\n              height: '100vh'\n            }\n          : {\n              width: dialogBelonging.DialogCoreConfig.Width,\n              minWidth: dialogBelonging.DialogCoreConfig.MinWidth,\n              maxWidth: dialogBelonging.DialogCoreConfig.MaxWidth,\n              height: dialogBelonging.DialogCoreConfig.Height,\n              minHeight: dialogBelonging.DialogCoreConfig.MinHeight,\n              maxHeight: dialogBelonging.DialogCoreConfig.MaxHeight\n            }\n      \"\n    >\n      <!--      <div\n      class=\"content-holder\"\n      [ngStyle]=\"\n        dialogBelonging.DialogCoreConfig.FullScreen\n          ? {\n              width: dialogBelonging.DialogCoreConfig.Width,\n              minWidth: dialogBelonging.DialogCoreConfig.MinWidth,\n              maxWidth: dialogBelonging.DialogCoreConfig.MaxWidth,\n              height: dialogBelonging.DialogCoreConfig.Height,\n              minHeight: dialogBelonging.DialogCoreConfig.MinHeight,\n              maxHeight: dialogBelonging.DialogCoreConfig.MaxHeight\n            }\n          : {\n              width: '100vw',\n              height: '100vh'\n            }\n      \"\n    >-->\n      <!--dialogBelonging.DialogCoreConfig.DisplayLoader => initial config-->\n      <div\n        class=\"component-content\"\n        [ngClass]=\"\n          !dialogBelonging.DialogCoreConfig.DisplayLoader\n            ? 'component-content-loader-off'\n            : showLoader\n            ? 'component-content-preparing'\n            : 'component-content-ready'\n        \"\n      >\n        <ng-template appInsertion></ng-template>\n      </div>\n    </div>\n\n    <div class=\"button-holder\">\n      <div\n        class=\"button-section\"\n        *ngIf=\"dialogBelonging.Buttons.length > 0\"\n        [ngStyle]=\"{\n          'text-align': dialogBelonging.DialogCoreConfig.ButtonPosition\n        }\"\n      >\n        <button\n          class=\"ed-btn ed-btn-lg\"\n          *ngFor=\"let button of dialogBelonging.Buttons\"\n          (click)=\"onCustomButton(button)\"\n          [ngClass]=\"{\n            '': button.LayoutType ? button.LayoutType === 0 : false,\n            'ed-btn-success': button.LayoutType\n              ? button.LayoutType === 1\n              : false,\n            'ed-btn-info': button.LayoutType ? button.LayoutType === 2 : false,\n            'ed-btn-warning': button.LayoutType\n              ? button.LayoutType === 3\n              : false,\n            'ed-btn-danger': button.LayoutType\n              ? button.LayoutType === 4\n              : false,\n            'ed-btn-dark': button.LayoutType ? button.LayoutType === 5 : false,\n            'ed-btn-light': button.LayoutType ? button.LayoutType === 6 : false,\n            'ed-btn-primary': button.LayoutType\n              ? button.LayoutType === 7\n              : false,\n            'ed-btn-secondary': button.LayoutType\n              ? button.LayoutType === 8\n              : false,\n            'ed-btn-link': button.LayoutType ? button.LayoutType === 9 : false\n          }\"\n        >\n          {{ button.Label }}\n        </button>\n      </div>\n    </div>\n  </div>\n</div>\n",
                    animations: [fadeInOut(0, 1)],
                    styles: [".ed-btn-sm{font-size:12px;font-weight:normal;margin-right:3px;min-width:40px;padding:2px 8px}.ed-btn-md{font-size:14px;margin-right:5px;min-width:60px;padding:3px 10px}.ed-btn-lg{font-size:16px;margin-right:5px;min-width:70px;padding:4px 10px}.ed-btn{background-color:transparent;border:none;border-radius:3px;cursor:pointer;display:inline-block;line-height:1.5;text-align:center;text-decoration:none;-webkit-user-select:none;user-select:none;vertical-align:middle}.ed-btn:hover{color:#989ea5}.ed-btn-check:focus+.ed-btn,.ed-btn:focus{box-shadow:0 0 1px 2px;outline:0}.ed-btn-check:checked+.ed-btn,.ed-btn-check:active+.ed-btn,.ed-btn:active,.ed-btn.active{box-shadow:0 0 1px 2px}.ed-btn-check:checked+.ed-btn:focus,.ed-btn-check:active+.ed-btn:focus,.ed-btn:active:focus,.ed-btn.active:focus{box-shadow:0 0 1px 2px}.ed-btn:disabled,.ed-btn.disabled,fieldset:disabled .ed-btn{box-shadow:none;opacity:.6;pointer-events:none}.ed-btn-primary{color:#fbfbfbcc;background:#ff9e00;border-color:#ff9e00}.ed-btn-primary:hover{color:#fbfbfb;border-color:#ffa81a;background:#ffb133}.ed-btn-check:focus+.ed-btn-primary,.ed-btn-primary:focus{outline:0;box-shadow:0 0 1px 2px #ffa81a}.ed-btn-check:checked+.ed-btn-primary,.ed-btn-check:active+.ed-btn-primary,.ed-btn-primary:active,.ed-btn-primary.active{box-shadow:0 0 1px 2px #ffa81a}.ed-btn-check:checked+.ed-btn-primary:focus,.ed-btn-check:active+.ed-btn-primary:focus,.ed-btn-primary:active:focus,.ed-btn-primary.active:focus{box-shadow:0 0 1px 2px #ffa81a}.ed-btn-secondary{color:#fbfbfbcc;background:#989ea5;border-color:#989ea5}.ed-btn-secondary:hover{color:#fbfbfb;border-color:#a6abb1;background:#b3b8bd}.ed-btn-check:focus+.ed-btn-secondary,.ed-btn-secondary:focus{outline:0;box-shadow:0 0 1px 2px #a6abb1}.ed-btn-check:checked+.ed-btn-secondary,.ed-btn-check:active+.ed-btn-secondary,.ed-btn-secondary:active,.ed-btn-secondary.active{box-shadow:0 0 1px 2px #a6abb1}.ed-btn-check:checked+.ed-btn-secondary:focus,.ed-btn-check:active+.ed-btn-secondary:focus,.ed-btn-secondary:active:focus,.ed-btn-secondary.active:focus{box-shadow:0 0 1px 2px #a6abb1}.ed-btn-success{color:#fbfbfbcc;background:#3caea3;border-color:#3caea3}.ed-btn-success:hover{color:#fbfbfb;border-color:#45bfb3;background:#58c5bb}.ed-btn-check:focus+.ed-btn-success,.ed-btn-success:focus{outline:0;box-shadow:0 0 1px 2px #45bfb3}.ed-btn-check:checked+.ed-btn-success,.ed-btn-check:active+.ed-btn-success,.ed-btn-success:active,.ed-btn-success.active{box-shadow:0 0 1px 2px #45bfb3}.ed-btn-check:checked+.ed-btn-success:focus,.ed-btn-check:active+.ed-btn-success:focus,.ed-btn-success:active:focus,.ed-btn-success.active:focus{box-shadow:0 0 1px 2px #45bfb3}.ed-btn-info{color:#fbfbfbcc;background:#2f8ee5;border-color:#2f8ee5}.ed-btn-info:hover{color:#fbfbfb;border-color:#469ae8;background:#5ca7eb}.ed-btn-check:focus+.ed-btn-info,.ed-btn-info:focus{outline:0;box-shadow:0 0 1px 2px #469ae8}.ed-btn-check:checked+.ed-btn-info,.ed-btn-check:active+.ed-btn-info,.ed-btn-info:active,.ed-btn-info.active{box-shadow:0 0 1px 2px #469ae8}.ed-btn-check:checked+.ed-btn-info:focus,.ed-btn-check:active+.ed-btn-info:focus,.ed-btn-info:active:focus,.ed-btn-info.active:focus{box-shadow:0 0 1px 2px #469ae8}.ed-btn-warning{color:#fbfbfbcc;background:#ffc107;border-color:#ffc107}.ed-btn-warning:hover{color:#fbfbfb;border-color:#ffc721;background:#ffce3a}.ed-btn-check:focus+.ed-btn-warning,.ed-btn-warning:focus{outline:0;box-shadow:0 0 1px 2px #ffc721}.ed-btn-check:checked+.ed-btn-warning,.ed-btn-check:active+.ed-btn-warning,.ed-btn-warning:active,.ed-btn-warning.active{box-shadow:0 0 1px 2px #ffc721}.ed-btn-check:checked+.ed-btn-warning:focus,.ed-btn-check:active+.ed-btn-warning:focus,.ed-btn-warning:active:focus,.ed-btn-warning.active:focus{box-shadow:0 0 1px 2px #ffc721}.ed-btn-danger{color:#fbfbfbcc;background:#e46464;border-color:#e46464}.ed-btn-danger:hover{color:#fbfbfb;border-color:#e87a7a;background:#ec8f8f}.ed-btn-check:focus+.ed-btn-danger,.ed-btn-danger:focus{outline:0;box-shadow:0 0 1px 2px #e87a7a}.ed-btn-check:checked+.ed-btn-danger,.ed-btn-check:active+.ed-btn-danger,.ed-btn-danger:active,.ed-btn-danger.active{box-shadow:0 0 1px 2px #e87a7a}.ed-btn-check:checked+.ed-btn-danger:focus,.ed-btn-check:active+.ed-btn-danger:focus,.ed-btn-danger:active:focus,.ed-btn-danger.active:focus{box-shadow:0 0 1px 2px #e87a7a}.ed-btn-light{color:#343a40cc;background:#fbfbfb;border-color:#fbfbfb}.ed-btn-light:hover{color:#343a40;border-color:#fff;background:white}.ed-btn-check:focus+.ed-btn-light,.ed-btn-light:focus{outline:0;box-shadow:0 0 1px 2px #fff}.ed-btn-check:checked+.ed-btn-light,.ed-btn-check:active+.ed-btn-light,.ed-btn-light:active,.ed-btn-light.active{box-shadow:0 0 1px 2px #fff}.ed-btn-check:checked+.ed-btn-light:focus,.ed-btn-check:active+.ed-btn-light:focus,.ed-btn-light:active:focus,.ed-btn-light.active:focus{box-shadow:0 0 1px 2px #fff}.ed-btn-dark{color:#fbfbfbcc;background:#343a40;border-color:#343a40}.ed-btn-dark:hover{color:#fbfbfb;border-color:#3f474e;background:#4b545c}.ed-btn-check:focus+.ed-btn-dark,.ed-btn-dark:focus{outline:0;box-shadow:0 0 1px 2px #3f474e}.ed-btn-check:checked+.ed-btn-dark,.ed-btn-check:active+.ed-btn-dark,.ed-btn-dark:active,.ed-btn-dark.active{box-shadow:0 0 1px 2px #3f474e}.ed-btn-check:checked+.ed-btn-dark:focus,.ed-btn-check:active+.ed-btn-dark:focus,.ed-btn-dark:active:focus,.ed-btn-dark.active:focus{box-shadow:0 0 1px 2px #3f474e}@font-face{font-family:\"icomoon\";src:url(data:font/eot;base64,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);src:url(data:font/eot;base64,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) format(\"embedded-opentype\"),url(data:font/ttf;base64,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) format(\"truetype\"),url(data:font/woff;base64,d09GRgABAAAAAAewAAsAAAAAB2QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABPUy8yAAABCAAAAGAAAABgDxIFb2NtYXAAAAFoAAAAVAAAAFQXVtKKZ2FzcAAAAbwAAAAIAAAACAAAABBnbHlmAAABxAAAA5QAAAOUw5gfR2hlYWQAAAVYAAAANgAAADYcaMOsaGhlYQAABZAAAAAkAAAAJAe5A8lobXR4AAAFtAAAACAAAAAgFEoACWxvY2EAAAXUAAAAEgAAABIC7gIUbWF4cAAABegAAAAgAAAAIAAMAFpuYW1lAAAGCAAAAYYAAAGGmUoJ+3Bvc3QAAAeQAAAAIAAAACAAAwAAAAMDQgGQAAUAAAKZAswAAACPApkCzAAAAesAMwEJAAAAAAAAAAAAAAAAAAAAARAAAAAAAAAAAAAAAAAAAAAAQAAA6QMDwP/AAEADwABAAAAAAQAAAAAAAAAAAAAAIAAAAAAAAwAAAAMAAAAcAAEAAwAAABwAAwABAAAAHAAEADgAAAAKAAgAAgACAAEAIOkD//3//wAAAAAAIOkA//3//wAB/+MXBAADAAEAAAAAAAAAAAAAAAEAAf//AA8AAQAAAAAAAAAAAAIAADc5AQAAAAABAAAAAAAAAAAAAgAANzkBAAAAAAEAAAAAAAAAAAACAAA3OQEAAAAAAgAAAAADbgNuADsAVwAAATQmLwE3PgE1NCYvAS4BIyIGDwEnLgEjIgYPAQ4BFRQWHwEHDgEVFBYfAR4BMzI2PwEXHgEzMjY/AT4BNxQHDgEHBiMiJy4BJyY1NDc+ATc2MzIXHgEXFgKRBgVoaAUGBgU0BQ4HBw4FZ2gFDQcIDQYzBQYGBWdnBQYGBTMGDQgHDQVoZwUOBwcOBTQFBt0jIndQUFtbUFB3IyIiI3dQUFtbUFB3IiMBNgcNBWhnBQ4HBw4FNAUGBgVoaAUGBgU0BQ4HBw4FZ2gFDQcIDQYzBQYGBWdnBQYGBTMGDYlbUFB3IiMjIndQUFtbUFB3IiMjIndQUAADAAkAAAP3A7cADwAmADwAACU1NCYrASIGHQEUFjsBMjYnEzQmJy4BKwEiBgcOARUTFBY7ATI2NQMBFhQHDgEjISImJyY0NwE+ATMyFhcCSQoIbggKCghuCAoBCgIDAwcEfgQHAwMCCQwIagcMCAG3CQoKIhP8khMiCgoJAbcJIxQUIwmlbQcMDAdtCAsL3gEGAwYCAgQEAgIHA/77BgcHBgIW/NsRJhERExMRESYRAyURFRURAAAAAgAAAAADbgNuACQAQAAAATQmLwEuASMiBg8BJy4BIyIGDwEOARUUFh8BHgEzMjY3AT4BNRcUBw4BBwYjIicuAScmNTQ3PgE3NjMyFx4BFxYC3gUGNAUNBwgNBemBBQ4HBw4FNAUFBQXPBQ4HBw4FATYGBZAjIndQUFtbUFB3IyIiI3dQUFtbUFB3IiMCEwgOBTMFBgYF6IEFBgYFNAUOBwcOBc8FBQUFATcFDQdcW1BQdyIjIyJ3UFBbW1BQdyIjIyJ3UFAAAAADAAAAAANuA24AHwAvAEsAACU1NCYrARE0JisBIgYdARQWOwEVIyIGHQEUFjMhMjY1AzU0JisBIgYdARQWOwEyNgUUBw4BBwYjIicuAScmNTQ3PgE3NjMyFx4BFxYCSQoINwsHtwgKCgg3NwgKCggBAAgKSQsHbggKCghuBwsBbiMid1BQW1tQUHcjIiIjd1BQW1tQUHciI6VbCAoBJQgKCghcBwu3CghbCAsLCAIAWwgKCghbCAsL5ltQUHciIyMid1BQW1tQUHciIyMid1BQAAAAAAEAAAAAAADAzm//Xw889QALBAAAAAAA3Ko/fAAAAADcqj98AAAAAAP3A7cAAAAIAAIAAAAAAAAAAQAAA8D/wAAABAAAAAAAA/cAAQAAAAAAAAAAAAAAAAAAAAgEAAAAAAAAAAAAAAACAAAAA24AAAQAAAkDbgAAA24AAAAAAAAACgAUAB4AoAD8AWABygAAAAEAAAAIAFgAAwAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAOAK4AAQAAAAAAAQAHAAAAAQAAAAAAAgAHAGAAAQAAAAAAAwAHADYAAQAAAAAABAAHAHUAAQAAAAAABQALABUAAQAAAAAABgAHAEsAAQAAAAAACgAaAIoAAwABBAkAAQAOAAcAAwABBAkAAgAOAGcAAwABBAkAAwAOAD0AAwABBAkABAAOAHwAAwABBAkABQAWACAAAwABBAkABgAOAFIAAwABBAkACgA0AKRpY29tb29uAGkAYwBvAG0AbwBvAG5WZXJzaW9uIDEuMABWAGUAcgBzAGkAbwBuACAAMQAuADBpY29tb29uAGkAYwBvAG0AbwBvAG5pY29tb29uAGkAYwBvAG0AbwBvAG5SZWd1bGFyAFIAZQBnAHUAbABhAHJpY29tb29uAGkAYwBvAG0AbwBvAG5Gb250IGdlbmVyYXRlZCBieSBJY29Nb29uLgBGAG8AbgB0ACAAZwBlAG4AZQByAGEAdABlAGQAIABiAHkAIABJAGMAbwBNAG8AbwBuAC4AAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA) format(\"woff\"),url(data:font/svg;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiID4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPG1ldGFkYXRhPkdlbmVyYXRlZCBieSBJY29Nb29uPC9tZXRhZGF0YT4KCTxkZWZzPgoJCTxmb250IGlkPSJpY29tb29uIiBob3Jpei1hZHYteD0iMTAyNCI+CgkJCTxmb250LWZhY2UgdW5pdHMtcGVyLWVtPSIxMDI0IiBhc2NlbnQ9Ijk2MCIgZGVzY2VudD0iLTY0Ii8+CgkJCTxtaXNzaW5nLWdseXBoIGhvcml6LWFkdi14PSIxMDI0Ii8+CgkJCTxnbHlwaCB1bmljb2RlPSImI3gyMDsiIGhvcml6LWFkdi14PSI1MTIiIGQ9IiIvPgoJCQk8Z2x5cGggdW5pY29kZT0iJiN4ZTkwMDsiIGdseXBoLW5hbWU9InRpbWVzLWNpcmNsZSIgaG9yaXotYWR2LXg9Ijg3OCIgZD0iTTY1Ni41NzEgMzA5LjcxNGMwIDkuNzE0LTQgMTguODU3LTEwLjg1NyAyNS43MTRsLTEwMy40MjkgMTAzLjQyOSAxMDMuNDI5IDEwMy40MjljNi44NTcgNi44NTcgMTAuODU3IDE2IDEwLjg1NyAyNS43MTRzLTQgMTkuNDI5LTEwLjg1NyAyNi4yODZsLTUxLjQyOSA1MS40MjljLTYuODU3IDYuODU3LTE2LjU3MSAxMC44NTctMjYuMjg2IDEwLjg1N3MtMTguODU3LTQtMjUuNzE0LTEwLjg1N2wtMTAzLjQyOS0xMDMuNDI5LTEwMy40MjkgMTAzLjQyOWMtNi44NTcgNi44NTctMTYgMTAuODU3LTI1LjcxNCAxMC44NTdzLTE5LjQyOS00LTI2LjI4Ni0xMC44NTdsLTUxLjQyOS01MS40MjljLTYuODU3LTYuODU3LTEwLjg1Ny0xNi41NzEtMTAuODU3LTI2LjI4NnM0LTE4Ljg1NyAxMC44NTctMjUuNzE0bDEwMy40MjktMTAzLjQyOS0xMDMuNDI5LTEwMy40MjljLTYuODU3LTYuODU3LTEwLjg1Ny0xNi0xMC44NTctMjUuNzE0czQtMTkuNDI5IDEwLjg1Ny0yNi4yODZsNTEuNDI5LTUxLjQyOWM2Ljg1Ny02Ljg1NyAxNi41NzEtMTAuODU3IDI2LjI4Ni0xMC44NTdzMTguODU3IDQgMjUuNzE0IDEwLjg1N2wxMDMuNDI5IDEwMy40MjkgMTAzLjQyOS0xMDMuNDI5YzYuODU3LTYuODU3IDE2LTEwLjg1NyAyNS43MTQtMTAuODU3czE5LjQyOSA0IDI2LjI4NiAxMC44NTdsNTEuNDI5IDUxLjQyOWM2Ljg1NyA2Ljg1NyAxMC44NTcgMTYuNTcxIDEwLjg1NyAyNi4yODZ6TTg3Ny43MTQgNDM4Ljg1N2MwLTI0Mi4yODYtMTk2LjU3MS00MzguODU3LTQzOC44NTctNDM4Ljg1N3MtNDM4Ljg1NyAxOTYuNTcxLTQzOC44NTcgNDM4Ljg1NyAxOTYuNTcxIDQzOC44NTcgNDM4Ljg1NyA0MzguODU3IDQzOC44NTctMTk2LjU3MSA0MzguODU3LTQzOC44NTd6Ii8+CgkJCTxnbHlwaCB1bmljb2RlPSImI3hlOTAxOyIgZ2x5cGgtbmFtZT0iZXhjbGFtYXRpb24tdHJpYW5nbGUsIHdhcm5pbmciIGQ9Ik01ODUuMTQzIDE2NS4xNDN2MTA4LjU3MWMwIDEwLjI4Ni04IDE4Ljg1Ny0xOC4yODYgMTguODU3aC0xMDkuNzE0Yy0xMC4yODYgMC0xOC4yODYtOC41NzEtMTguMjg2LTE4Ljg1N3YtMTA4LjU3MWMwLTEwLjI4NiA4LTE4Ljg1NyAxOC4yODYtMTguODU3aDEwOS43MTRjMTAuMjg2IDAgMTguMjg2IDguNTcxIDE4LjI4NiAxOC44NTd6TTU4NCAzNzguODU3bDEwLjI4NiAyNjIuMjg2YzAgMy40MjktMS43MTQgOC01LjcxNCAxMC44NTctMy40MjkgMi44NTctOC41NzEgNi4yODYtMTMuNzE0IDYuMjg2aC0xMjUuNzE0Yy01LjE0MyAwLTEwLjI4Ni0zLjQyOS0xMy43MTQtNi4yODYtNC0yLjg1Ny01LjcxNC04LjU3MS01LjcxNC0xMmw5LjcxNC0yNjEuMTQzYzAtNy40MjkgOC41NzEtMTMuMTQzIDE5LjQyOS0xMy4xNDNoMTA1LjcxNGMxMC4yODYgMCAxOC44NTcgNS43MTQgMTkuNDI5IDEzLjE0M3pNNTc2IDkxMi41NzFsNDM4Ljg1Ny04MDQuNTcxYzEyLjU3MS0yMi4yODYgMTItNDkuNzE0LTEuMTQzLTcycy0zNy4xNDMtMzYtNjIuODU3LTM2aC04NzcuNzE0Yy0yNS43MTQgMC00OS43MTQgMTMuNzE0LTYyLjg1NyAzNnMtMTMuNzE0IDQ5LjcxNC0xLjE0MyA3Mmw0MzguODU3IDgwNC41NzFjMTIuNTcxIDIzLjQyOSAzNy4xNDMgMzguMjg2IDY0IDM4LjI4NnM1MS40MjktMTQuODU3IDY0LTM4LjI4NnoiLz4KCQkJPGdseXBoIHVuaWNvZGU9IiYjeGU5MDI7IiBnbHlwaC1uYW1lPSJjaGVjay1jaXJjbGUiIGhvcml6LWFkdi14PSI4NzgiIGQ9Ik03MzMuNzE0IDUzMS40MjhjMCA5LjcxNC0zLjQyOSAxOS40MjktMTAuMjg2IDI2LjI4NmwtNTIgNTEuNDI5Yy02Ljg1NyA2Ljg1Ny0xNiAxMC44NTctMjUuNzE0IDEwLjg1N3MtMTguODU3LTQtMjUuNzE0LTEwLjg1N2wtMjMzLjE0My0yMzIuNTcxLTEyOS4xNDMgMTI5LjE0M2MtNi44NTcgNi44NTctMTYgMTAuODU3LTI1LjcxNCAxMC44NTdzLTE4Ljg1Ny00LTI1LjcxNC0xMC44NTdsLTUyLTUxLjQyOWMtNi44NTctNi44NTctMTAuMjg2LTE2LjU3MS0xMC4yODYtMjYuMjg2czMuNDI5LTE4Ljg1NyAxMC4yODYtMjUuNzE0bDIwNi44NTctMjA2Ljg1N2M2Ljg1Ny02Ljg1NyAxNi41NzEtMTAuODU3IDI1LjcxNC0xMC44NTcgOS43MTQgMCAxOS40MjkgNCAyNi4yODYgMTAuODU3bDMxMC4yODYgMzEwLjI4NmM2Ljg1NyA2Ljg1NyAxMC4yODYgMTYgMTAuMjg2IDI1LjcxNHpNODc3LjcxNCA0MzguODU3YzAtMjQyLjI4Ni0xOTYuNTcxLTQzOC44NTctNDM4Ljg1Ny00MzguODU3cy00MzguODU3IDE5Ni41NzEtNDM4Ljg1NyA0MzguODU3IDE5Ni41NzEgNDM4Ljg1NyA0MzguODU3IDQzOC44NTcgNDM4Ljg1Ny0xOTYuNTcxIDQzOC44NTctNDM4Ljg1N3oiLz4KCQkJPGdseXBoIHVuaWNvZGU9IiYjeGU5MDM7IiBnbHlwaC1uYW1lPSJpbmZvLWNpcmNsZSIgaG9yaXotYWR2LXg9Ijg3OCIgZD0iTTU4NS4xNDMgMTY0LjU3MXY5MS40MjljMCAxMC4yODYtOCAxOC4yODYtMTguMjg2IDE4LjI4NmgtNTQuODU3djI5Mi41NzFjMCAxMC4yODYtOCAxOC4yODYtMTguMjg2IDE4LjI4NmgtMTgyLjg1N2MtMTAuMjg2IDAtMTguMjg2LTgtMTguMjg2LTE4LjI4NnYtOTEuNDI5YzAtMTAuMjg2IDgtMTguMjg2IDE4LjI4Ni0xOC4yODZoNTQuODU3di0xODIuODU3aC01NC44NTdjLTEwLjI4NiAwLTE4LjI4Ni04LTE4LjI4Ni0xOC4yODZ2LTkxLjQyOWMwLTEwLjI4NiA4LTE4LjI4NiAxOC4yODYtMTguMjg2aDI1NmMxMC4yODYgMCAxOC4yODYgOCAxOC4yODYgMTguMjg2ek01MTIgNjc2LjU3MXY5MS40MjljMCAxMC4yODYtOCAxOC4yODYtMTguMjg2IDE4LjI4NmgtMTA5LjcxNGMtMTAuMjg2IDAtMTguMjg2LTgtMTguMjg2LTE4LjI4NnYtOTEuNDI5YzAtMTAuMjg2IDgtMTguMjg2IDE4LjI4Ni0xOC4yODZoMTA5LjcxNGMxMC4yODYgMCAxOC4yODYgOCAxOC4yODYgMTguMjg2ek04NzcuNzE0IDQzOC44NTdjMC0yNDIuMjg2LTE5Ni41NzEtNDM4Ljg1Ny00MzguODU3LTQzOC44NTdzLTQzOC44NTcgMTk2LjU3MS00MzguODU3IDQzOC44NTcgMTk2LjU3MSA0MzguODU3IDQzOC44NTcgNDM4Ljg1NyA0MzguODU3LTE5Ni41NzEgNDM4Ljg1Ny00MzguODU3eiIvPgoJCTwvZm9udD48L2RlZnM+Cjwvc3ZnPgo=) format(\"svg\");font-weight:normal;font-style:normal;font-display:block}[class^=icon-],[class*=\" icon-\"]{font-family:\"icomoon\"!important;-webkit-font-smoothing:antialiased;font-style:normal;font-feature-settings:normal;font-variant:normal;font-weight:normal;line-height:1;-moz-osx-font-smoothing:grayscale;speak:never;text-transform:none}.icon-times-circle:before{content:\"\\e900\"}.icon-exclamation-triangle:before{content:\"\\e901\"}.icon-warning:before{content:\"\\e901\"}.icon-check-circle:before{content:\"\\e902\"}.icon-info-circle:before{content:\"\\e903\"}.ngx-awesome-popup-overlay{align-items:center;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px);background:rgba(51,32,0,.4);bottom:0;display:flex;flex-direction:column;justify-content:center;left:0;opacity:0;position:fixed;right:0;top:0;z-index:999999999}.evolve-parent-dialog .text-wrapper,.evolve-confirm-box .text-wrapper{text-align:center}.evolve-parent-dialog .text-wrapper-section,.evolve-confirm-box .text-wrapper-section,.evolve-toast .text-wrapper-section{width:100%}.evolve-parent-dialog .text-wrapper-section .text-wrapper,.evolve-confirm-box .text-wrapper-section .text-wrapper,.evolve-toast .text-wrapper-section .text-wrapper{display:block;width:100%}.evolve-parent-dialog .text-wrapper-section .dont-break-out,.evolve-confirm-box .text-wrapper-section .dont-break-out,.evolve-toast .text-wrapper-section .dont-break-out{-webkit-hyphens:auto;hyphens:auto;overflow-wrap:break-word;white-space:pre-wrap;word-wrap:break-word}.evolve-parent-dialog,.evolve-confirm-box{background:#fbfbfb;border-radius:5px;border-top:7px solid;box-shadow:0 0 4px 1px #00000040;display:flex;flex-direction:column;max-height:calc(100vh - 100px);max-width:calc(100vw - 100px);box-sizing:border-box;position:relative;vertical-align:bottom}.evolve-parent-dialog.standard-dialog,.evolve-confirm-box.standard-dialog{border-color:transparent;padding:17px 20px 10px}.evolve-parent-dialog.success-dialog,.evolve-confirm-box.success-dialog{border-color:#3caea3}.evolve-parent-dialog.info-dialog,.evolve-confirm-box.info-dialog{border-color:#2f8ee5}.evolve-parent-dialog.warning-dialog,.evolve-confirm-box.warning-dialog{border-color:#ffc107}.evolve-parent-dialog.danger-dialog,.evolve-confirm-box.danger-dialog{border-color:#e46464}.ap-icon-success{color:#58c5bb}.ap-icon-info{color:#5ca7eb}.ap-icon-warning{color:#ffce3a}.ap-icon-danger{color:#ec8f8f}.evolve-parent-dialog{padding:20px 20px 10px}.evolve-parent-dialog .component-content{height:100%;max-width:95vw;transition-delay:.4s;transition-duration:.4s;transition-property:opacity;transition-timing-function:linear;width:100%}.evolve-parent-dialog .component-content-loader-off{opacity:1!important;transition:none!important}.evolve-parent-dialog .component-content-preparing{opacity:0;transition:none!important}.evolve-parent-dialog .component-content-ready{height:100%;opacity:1}.evolve-parent-dialog .dialog-loader{opacity:1}.evolve-parent-dialog .dialog-loader-off{display:none;opacity:0!important}.evolve-parent-dialog .dialog-loader-gone{opacity:0;pointer-events:none}.evolve-parent-dialog .dialog-loader-active{opacity:1}.loader-holder{align-items:center;background:#fbfbfb;display:flex;flex-direction:column;height:100%;justify-content:center;margin:-20px;opacity:1;position:absolute;transition-delay:.4s;transition-duration:.4s;transition-property:opacity;transition-timing-function:linear;width:100%}.content-holder{display:flex;flex-direction:column;max-width:calc(100vw - 100px);overflow:auto}.button-holder{display:flex;flex-direction:column;justify-content:flex-end;width:100%}.button-holder .button-section{background:rgba(222,226,230,.2);border-top:1px solid rgba(152,158,165,.2);margin:20px -20px -10px;padding:5px 20px}\n"]
                },] }
    ];
    DialogWrapperComponent.ctorParameters = function () { return [
        { type: DialogBelonging, decorators: [{ type: i0.Inject, args: ['dialogBelonging',] }] },
        { type: i0.ComponentFactoryResolver },
        { type: i0.ChangeDetectorRef }
    ]; };
    DialogWrapperComponent.propDecorators = {
        insertionPoint: [{ type: i0.ViewChild, args: [InsertionDirective, { static: true },] }],
        loaderInsertionPoint: [{ type: i0.ViewChild, args: [InsertionLoaderDirective, { static: true },] }],
        keyEvent: [{ type: i0.HostListener, args: ['window:keyup', ['$event'],] }]
    };

    var DialogService = /** @class */ (function () {
        function DialogService(componentFactoryResolver, injector, appRef) {
            this.componentFactoryResolver = componentFactoryResolver;
            this.injector = injector;
            this.appRef = appRef;
            this.dialogParentComponentRefList = [];
        }
        DialogService.prototype.open = function (_ComponentType, _DialogBelonging) {
            var dialogController = _DialogBelonging.EventsController;
            var componentRef = this.getComponentRef(dialogController, _DialogBelonging);
            this.dialogParentComponentRefList.push(componentRef);
            componentRef.instance.dialogBelonging = _DialogBelonging;
            componentRef.instance.childComponentType = _ComponentType;
            this.appendToBodyParentComponent(componentRef);
            this.listeners(dialogController);
            return dialogController;
        };
        DialogService.prototype.getComponentRef = function (_EventsController, _DialogBelonging) {
            var componentFactory;
            var dialogIndex = this.findDialogIndex(_DialogBelonging.EntityUniqueID);
            if (dialogIndex === -1) {
                var weakMap = new WeakMap();
                weakMap.set(DialogEventsController, _EventsController);
                componentFactory = this.componentFactoryResolver.resolveComponentFactory(DialogWrapperComponent);
                return componentFactory.create(new DialogInjector(this.injector, weakMap));
            }
            return null;
        };
        DialogService.prototype.listeners = function (_EventsController) {
            var _this = this;
            // Listener for closing dialog
            var closeDialogSubscription = _EventsController.afterClosed$.subscribe(function (response) {
                var modalIndex = _this.findDialogIndex(response.DialogBelonging.EntityUniqueID);
                _this.removeFromBodyDialogWrapperComponent(modalIndex);
                closeDialogSubscription.unsubscribe();
            });
            // Listener for turning off loader
            var closeLoaderSubscription = _EventsController.afterLoader$.subscribe(function (_DialogUniqueID) {
                if (_DialogUniqueID) {
                    var modalIndex = _this.findDialogIndex(_DialogUniqueID);
                    if (modalIndex !== -1) {
                        _this.dialogParentComponentRefList[modalIndex].instance.closeLoader();
                    }
                }
                closeLoaderSubscription.unsubscribe();
            });
        };
        DialogService.prototype.childComponentResolver = function () { };
        DialogService.prototype.appendToBodyParentComponent = function (_ComponentRef) {
            // attach view to ignite lifecycle hooks
            this.appRef.attachView(_ComponentRef.hostView);
            // DOM
            var domElem = _ComponentRef.hostView
                .rootNodes[0];
            document.body.appendChild(domElem);
        };
        DialogService.prototype.closeDialogWrapperComponent = function (_DialogUniqueID) {
            var modalIndex = this.findDialogIndex(_DialogUniqueID);
            this.removeFromBodyDialogWrapperComponent(modalIndex);
        };
        DialogService.prototype.removeFromBodyDialogWrapperComponent = function (_DialogIndex) {
            var _this = this;
            if (_DialogIndex > -1) {
                this.dialogParentComponentRefList[_DialogIndex].instance
                    .closeParent$('close-fast')
                    .pipe(operators.map(function (item) {
                    _this.appRef.detachView(_this.dialogParentComponentRefList[_DialogIndex].hostView);
                    _this.dialogParentComponentRefList[_DialogIndex].destroy();
                    _this.dialogParentComponentRefList.splice(_DialogIndex, 1);
                }))
                    .subscribe();
            }
        };
        DialogService.prototype.findDialogIndex = function (_DialogUniqueID) {
            return this.dialogParentComponentRefList.findIndex(function (item) {
                return _DialogUniqueID === item.instance.dialogBelonging.EntityUniqueID;
            });
        };
        return DialogService;
    }());
    DialogService.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function DialogService_Factory() { return new DialogService(i0__namespace.ɵɵinject(i0__namespace.ComponentFactoryResolver), i0__namespace.ɵɵinject(i0__namespace.INJECTOR), i0__namespace.ɵɵinject(i0__namespace.ApplicationRef)); }, token: DialogService, providedIn: "root" });
    DialogService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    DialogService.ctorParameters = function () { return [
        { type: i0.ComponentFactoryResolver },
        { type: i0.Injector },
        { type: i0.ApplicationRef }
    ]; };

    // region *** Public ***
    var DialogInitializer = /** @class */ (function () {
        function DialogInitializer(component) {
            this.component = component;
            this.dialogCarrier = new DialogCarrier();
            this.dialogCarrier.setComponent(this.component);
        }
        /** Generic method accept expected payload from dynamic child component.*/
        DialogInitializer.prototype.openDialog$ = function () {
            return this.dialogCarrier.openDialog$().pipe(operators.map(function (resp) {
                var basicDialogResponse = new DialogResponse();
                var dataControl = new DataControl();
                dataControl.copyValuesFrom(resp, basicDialogResponse);
                return basicDialogResponse;
            }), operators.take(1));
        };
        /** It accepts list of custom buttons */
        DialogInitializer.prototype.setButtons = function (_Buttons) {
            this.dialogCarrier.setButtons(_Buttons);
        };
        DialogInitializer.prototype.setCustomData = function (_CustomData) {
            this.dialogCarrier.setCustomData(_CustomData);
        };
        DialogInitializer.prototype.setConfig = function (_DialogConfig) {
            this.dialogCarrier.setConfig(_DialogConfig);
        };
        return DialogInitializer;
    }());
    var DialogResponse = /** @class */ (function (_super) {
        __extends(DialogResponse, _super);
        function DialogResponse() {
            var _this = _super.call(this) || this;
            // private Response: DialogPrepareResponse            = new DialogPrepareResponse();
            _this.Payload = null;
            _this.Success = null;
            _this.ClickedButtonID = null;
            return _this;
        }
        /**
         * @ignore
         */
        DialogResponse.prototype.setPayload = function (_Payload) {
            this.Payload = _Payload;
        };
        /**
         * @ignore
         */
        DialogResponse.prototype.setClickedButtonID = function (_ClickedButtonID) {
            this.ClickedButtonID = _ClickedButtonID;
        };
        return DialogResponse;
    }(DataControl));
    var DialogEventsController = /** @class */ (function () {
        function DialogEventsController(EntityUniqueID) {
            this.EntityUniqueID = EntityUniqueID;
            this._afterClosed = new rxjs.Subject();
            this.afterClosed$ = this._afterClosed.asObservable();
            this._afterLoader = new rxjs.Subject();
            this.afterLoader$ = this._afterLoader.asObservable();
            this._onButtonClick = new rxjs.Subject();
            this.onButtonClick$ = this._onButtonClick.asObservable();
            this._buttonList = new rxjs.Subject();
            this.buttonList$ = this._buttonList.asObservable();
        }
        DialogEventsController.prototype.close = function (_Payload) {
            if (_Payload === void 0) { _Payload = null; }
            console.log(this.defaultResponse);
            this.defaultResponse.setPayload(_Payload);
            this._afterClosed.next(this.defaultResponse);
        };
        DialogEventsController.prototype.onButtonClick = function (_Button) {
            this.defaultResponse.setClickedButtonID(_Button.ID);
            this._onButtonClick.next(_Button);
        };
        DialogEventsController.prototype.setButtonList = function (_ButtonList) {
            this._buttonList.next(_ButtonList);
        };
        DialogEventsController.prototype.closeLoader = function () {
            var _this = this;
            setTimeout(function () {
                _this._afterLoader.next(_this.EntityUniqueID);
            }, 0);
        };
        DialogEventsController.prototype.setDefaultResponse = function (_Response) {
            this.defaultResponse = _Response;
        };
        return DialogEventsController;
    }());
    // endregion
    var DialogDefaultResponse = /** @class */ (function (_super) {
        __extends(DialogDefaultResponse, _super);
        function DialogDefaultResponse() {
            var _this = _super.call(this) || this;
            _this.DialogBelonging = null;
            return _this;
        }
        DialogDefaultResponse.prototype.setBelonging = function (_DialogBelonging) {
            this.DialogBelonging = _DialogBelonging;
        };
        return DialogDefaultResponse;
    }(DialogResponse));
    var DialogCarrier = /** @class */ (function () {
        function DialogCarrier() {
            this.dialogBelonging = new DialogBelonging();
        }
        DialogCarrier.prototype.setComponent = function (_Component) {
            this.component = _Component;
        };
        DialogCarrier.prototype.setButtons = function (_Buttons) {
            if (_Buttons.length) {
                this.dialogBelonging.Buttons = _Buttons;
            }
        };
        DialogCarrier.prototype.setCustomData = function (_CustomData) {
            this.dialogBelonging.CustomData = _CustomData;
        };
        DialogCarrier.prototype.setConfig = function (_DialogConfig) {
            // region *** local UserConfig (defined on place where dialog is called) ***
            var dataControl = new DataControl();
            dataControl.copyValuesFrom(_DialogConfig, this.dialogBelonging.DialogCoreConfig);
            if (_DialogConfig === null || _DialogConfig === void 0 ? void 0 : _DialogConfig.LoaderComponent) {
                this.dialogBelonging.DialogCoreConfig.DisplayLoader = true;
            }
            // endregion
        };
        DialogCarrier.prototype.openDialog$ = function () {
            var service = ServiceLocator.injector.get(DialogService);
            var dialogController = service.open(this.component, this.dialogBelonging);
            return dialogController.afterClosed$;
        };
        return DialogCarrier;
    }());
    var DialogCoreConfig = /** @class */ (function (_super) {
        __extends(DialogCoreConfig, _super);
        function DialogCoreConfig() {
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
            _this.EscapeKeyClose = null;
            _this.HideScrollbar = null;
            _this.ButtonPosition = null;
            _this.LayoutType = null;
            _this.DisplayLoader = null;
            _this.LoaderComponent = null;
            return _this;
        }
        return DialogCoreConfig;
    }(Sizes));
    var DialogSettings = /** @class */ (function () {
        function DialogSettings() {
            this.Buttons = [];
            this.DialogCoreConfig = new DialogCoreConfig();
        }
        return DialogSettings;
    }());
    var DialogBelonging = /** @class */ (function (_super) {
        __extends(DialogBelonging, _super);
        function DialogBelonging() {
            var _this = _super.call(this) || this;
            /** @internal */
            _this.EntityUniqueID = 'D' + Math.random().toString(36).substr(2, 9);
            _this.CustomData = null;
            _this.EventsController = new DialogEventsController(_this.EntityUniqueID);
            var dialogConfigurator = ServiceLocator.injector.get(DialogConfigService);
            var baseSettings = new DialogSettings();
            var dataControl = new DataControl();
            dataControl.copyValuesFrom(dialogConfigurator.productionConfig.DialogCoreConfig, baseSettings.DialogCoreConfig);
            _this.DialogCoreConfig = baseSettings.DialogCoreConfig;
            _this.Buttons = dialogConfigurator.productionConfig.Buttons.slice();
            return _this;
        }
        return DialogBelonging;
    }(DialogSettings));

    exports.ToastProgressBarEnum = void 0;
    (function (ToastProgressBarEnum) {
        ToastProgressBarEnum[ToastProgressBarEnum["NONE"] = 0] = "NONE";
        ToastProgressBarEnum[ToastProgressBarEnum["INCREASE"] = 1] = "INCREASE";
        ToastProgressBarEnum[ToastProgressBarEnum["DECREASE"] = 2] = "DECREASE";
    })(exports.ToastProgressBarEnum || (exports.ToastProgressBarEnum = {}));
    exports.ToastPositionEnum = void 0;
    (function (ToastPositionEnum) {
        ToastPositionEnum["TOP_LEFT"] = "top-left";
        ToastPositionEnum["TOP_CENTER"] = "top-center";
        ToastPositionEnum["TOP_RIGHT"] = "top-right";
        ToastPositionEnum["TOP_FULL_WIDTH"] = "top-fullwidth";
        ToastPositionEnum["BOTTOM_LEFT"] = "bottom-left";
        ToastPositionEnum["BOTTOM_CENTER"] = "bottom-center";
        ToastPositionEnum["BOTTOM_RIGHT"] = "bottom-right";
        ToastPositionEnum["BOTTOM_FULL_WIDTH"] = "bottom-fullwidth";
    })(exports.ToastPositionEnum || (exports.ToastPositionEnum = {}));
    exports.ToastUserViewTypeEnum = void 0;
    (function (ToastUserViewTypeEnum) {
        ToastUserViewTypeEnum["SIMPLE"] = "simple";
        ToastUserViewTypeEnum["STANDARD"] = "standard";
    })(exports.ToastUserViewTypeEnum || (exports.ToastUserViewTypeEnum = {}));

    var ToastNotificationConfigService = /** @class */ (function () {
        function ToastNotificationConfigService(userConfig) {
            if (userConfig === void 0) { userConfig = {}; }
            this.userConfig = userConfig;
            this.authorConfig = new ToastSettings();
            this.productionConfig = new ToastSettings();
            this.dataControl = new DataControl();
            // region *** toastNotification userConfig (user input app-module) ***
            var userConfigBase = new ToastSettings();
            this.dataControl.copyValuesFrom(userConfig.ToastCoreConfig, userConfigBase.ToastCoreConfig); // this will make sure that object has right properties
            userConfig.ToastCoreConfig = userConfigBase.ToastCoreConfig;
            // endregion
            // region *** author default config values (if there is no user input) ***
            this.authorConfig.ToastCoreConfig.ButtonPosition = 'right';
            this.authorConfig.ToastCoreConfig.TextPosition = 'left';
            this.authorConfig.ToastCoreConfig.ToastPosition =
                exports.ToastPositionEnum.TOP_RIGHT;
            this.authorConfig.ToastCoreConfig.ProgressBar =
                exports.ToastProgressBarEnum.INCREASE;
            this.authorConfig.ToastCoreConfig.ToastUserViewType =
                exports.ToastUserViewTypeEnum.SIMPLE;
            this.authorConfig.ToastCoreConfig.AutoCloseDelay = 2500;
            this.authorConfig.ToastCoreConfig.DisableIcon = false;
            this.authorConfig.ToastCoreConfig.AllowHTMLMessage = true;
            this.authorConfig.ToastCoreConfig.LayoutType = exports.DialogLayoutDisplay.NONE;
            this.authorConfig.GlobalSettings.AllowedNotificationsAtOnce = 5;
            // endregion
            // region *** Production setup ***
            this.setResetGlobalToastConfig();
            this.dataControl.copyValuesFrom(this.authorConfig.ToastCoreConfig, this.productionConfig.ToastCoreConfig);
            this.dataControl.copyValuesFrom(this.userConfig.ToastCoreConfig, this.productionConfig.ToastCoreConfig);
            // endregion
        }
        ToastNotificationConfigService.prototype.setResetGlobalToastConfig = function (globalToastConfig) {
            this.dataControl.copyValuesFrom(this.authorConfig.GlobalSettings, this.productionConfig.GlobalSettings);
            this.dataControl.copyValuesFrom(globalToastConfig ? globalToastConfig : this.userConfig.GlobalSettings, this.productionConfig.GlobalSettings);
        };
        return ToastNotificationConfigService;
    }());
    ToastNotificationConfigService.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function ToastNotificationConfigService_Factory() { return new ToastNotificationConfigService(i0__namespace.ɵɵinject("toastNotificationConfig")); }, token: ToastNotificationConfigService, providedIn: "root" });
    ToastNotificationConfigService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    ToastNotificationConfigService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: ['toastNotificationConfig',] }] }
    ]; };

    var WrapperAbstraction = /** @class */ (function () {
        function WrapperAbstraction(toastNotificationBelonging) {
            this.toastNotificationBelonging = toastNotificationBelonging;
            this.fadeInOutAnimation = 'open';
            this.timerStarted$ = new rxjs.BehaviorSubject('start-counter');
            this.isTimerStarted = false;
            this.timer = new Timer();
        }
        WrapperAbstraction.prototype.mouseOver = function () {
            var _a;
            this.timerStarted$.next('stop-counter');
            this.fadeInOutAnimation = 'open';
            (_a = this.subsToClosingDelay) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        };
        WrapperAbstraction.prototype.mouseOut = function () {
            this.timerStarted$.next('start-counter');
        };
        WrapperAbstraction.prototype.onOverlayClicked = function (evt) {
            //  console.log('onOverlayClicked');
        };
        WrapperAbstraction.prototype.onToastClicked = function (evt) {
            // console.log('onOverlayClicked');
        };
        WrapperAbstraction.prototype.setResponse = function (_IsSuccess, _ClickedButtonID) {
            var response = new ToastNotificationDefaultResponse();
            if (_ClickedButtonID) {
                response.ClickedButtonID = _ClickedButtonID;
            }
            response.setSuccess(_IsSuccess);
            response.setBelonging(this.toastNotificationBelonging);
            this.toastNotificationBelonging.EventsController.setDefaultResponse(response);
        };
        WrapperAbstraction.prototype.onCustomButton = function (_Button) {
            this.toastNotificationBelonging.EventsController.onButtonClick(_Button);
            this.setResponse(true, _Button.ID);
            this.toastNotificationBelonging.EventsController.close();
        };
        WrapperAbstraction.prototype.onButtonClick = function (_Type) {
            var buttonID;
            if (_Type === 'confirm') {
                buttonID = this.toastNotificationBelonging.ToastCoreConfig.ConfirmLabel.toLowerCase();
            }
            else if (_Type === 'decline') {
                buttonID = this.toastNotificationBelonging.ToastCoreConfig.DeclineLabel.toLowerCase();
            }
            this.setResponse(_Type === 'confirm', buttonID);
            this.toastNotificationBelonging.EventsController.close();
        };
        WrapperAbstraction.prototype.autoClose = function () {
            var _this = this;
            if (this.autoCloseCondition()) {
                this.timer.setMilliseconds(this.toastNotificationBelonging.ToastCoreConfig.AutoCloseDelay);
                this.subTimer = this.timerStarted$
                    .pipe(operators.tap(function (next) {
                    if ('start-counter' === next) {
                        _this.timer.start();
                        _this.isTimerStarted = true;
                        _this.timeout = setTimeout(function () {
                            _this.subsToClosingDelay = _this.closeParent$('close-slow').subscribe(function (resp) {
                                _this.toastNotificationBelonging.EventsController.close();
                            });
                        }, _this.toastNotificationBelonging.ToastCoreConfig.AutoCloseDelay);
                    }
                    else if ('stop-counter' === next) {
                        if (_this.isTimerStarted) {
                            _this.timer.stop();
                            clearTimeout(_this.timeout);
                            _this.isTimerStarted = false;
                        }
                    }
                }))
                    .subscribe();
            }
        };
        WrapperAbstraction.prototype.autoCloseCondition = function () {
            return (this.toastNotificationBelonging.ToastCoreConfig.AutoCloseDelay &&
                !(this.toastNotificationBelonging.Buttons.length ||
                    this.toastNotificationBelonging.ToastCoreConfig.DeclineLabel ||
                    this.toastNotificationBelonging.ToastCoreConfig.ConfirmLabel));
        };
        WrapperAbstraction.prototype.closeParent$ = function (_ClosingAnimation) {
            this.fadeInOutAnimation = _ClosingAnimation;
            var timer = _ClosingAnimation === 'close-slow' ? 1400 : 150;
            return rxjs.of('').pipe(operators.delay(timer));
        };
        WrapperAbstraction.prototype.close = function () {
            this.toastNotificationBelonging.EventsController.close();
        };
        WrapperAbstraction.prototype.ngOnDestroy = function () {
            var _a, _b;
            (_a = this.subsToClosingDelay) === null || _a === void 0 ? void 0 : _a.unsubscribe();
            (_b = this.subTimer) === null || _b === void 0 ? void 0 : _b.unsubscribe();
        };
        return WrapperAbstraction;
    }());
    WrapperAbstraction.decorators = [
        { type: i0.Injectable }
    ];
    WrapperAbstraction.ctorParameters = function () { return [
        { type: ToastNotificationBelonging }
    ]; };

    var ToastNotificationSimpleWrapperComponent = /** @class */ (function (_super) {
        __extends(ToastNotificationSimpleWrapperComponent, _super);
        function ToastNotificationSimpleWrapperComponent(toastNotificationBelonging, gConfig, cd) {
            var _this = _super.call(this, toastNotificationBelonging) || this;
            _this.toastNotificationBelonging = toastNotificationBelonging;
            _this.gConfig = gConfig;
            _this.cd = cd;
            return _this;
        }
        ToastNotificationSimpleWrapperComponent.prototype.ngAfterViewInit = function () {
            this.setResponse(false);
            this.cd.detectChanges();
            this.autoClose();
        };
        return ToastNotificationSimpleWrapperComponent;
    }(WrapperAbstraction));
    ToastNotificationSimpleWrapperComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'app-toast-notification-simple-wrapper',
                    template: "<div\n  class=\"toast-wrapper simple-toast\"\n  (dblclick)=\"onOverlayClicked($event)\"\n  [@fadeInOut]=\"fadeInOutAnimation\"\n>\n  <div\n    class=\"evolve-toast\"\n    (mouseover)=\"mouseOver()\"\n    (mouseout)=\"mouseOut()\"\n    (click)=\"onToastClicked($event)\"\n    [ngClass]=\"{\n      'standard-dialog':\n        0 === toastNotificationBelonging.ToastCoreConfig.LayoutType,\n      'success-dialog':\n        1 === toastNotificationBelonging.ToastCoreConfig.LayoutType,\n      'info-dialog':\n        2 === toastNotificationBelonging.ToastCoreConfig.LayoutType,\n      'warning-dialog':\n        3 === toastNotificationBelonging.ToastCoreConfig.LayoutType,\n      'danger-dialog':\n        4 === toastNotificationBelonging.ToastCoreConfig.LayoutType\n    }\"\n  >\n    <div\n      class=\"toast-title-content\"\n      *ngIf=\"toastNotificationBelonging.Dispatch.Title\"\n    >\n      <div\n        class=\"icon-section\"\n        *ngIf=\"!toastNotificationBelonging.ToastCoreConfig.DisableIcon\"\n      >\n        <span\n          class=\"icon-type-toast\"\n          [ngClass]=\"{\n            '': toastNotificationBelonging.ToastCoreConfig.LayoutType === 0,\n            'ap-icon-success icon-check-circle':\n              toastNotificationBelonging.ToastCoreConfig.LayoutType === 1,\n            'ap-icon-info icon-info-circle':\n              toastNotificationBelonging.ToastCoreConfig.LayoutType === 2,\n            'ap-icon-warning icon-warning':\n              toastNotificationBelonging.ToastCoreConfig.LayoutType === 3,\n            'ap-icon-danger icon-times-circle':\n              toastNotificationBelonging.ToastCoreConfig.LayoutType === 4\n          }\"\n        ></span>\n      </div>\n      <div class=\"dont-break-out\">\n        <div class=\"text-wrapper dont-break-out\">\n          <div class=\"toast-title-text toast-text\">\n            {{ toastNotificationBelonging.Dispatch.Title }}\n          </div>\n          <span\n            class=\"close-ico icon-times-circle\"\n            (click)=\"close()\"\n            *ngIf=\"\n              !toastNotificationBelonging.Buttons.length &&\n              !toastNotificationBelonging.ToastCoreConfig.DeclineLabel &&\n              !toastNotificationBelonging.ToastCoreConfig.ConfirmLabel\n            \"\n          ></span>\n        </div>\n      </div>\n    </div>\n\n    <div\n      class=\"content-holder toast-text\"\n      *ngIf=\"toastNotificationBelonging.Dispatch.Message\"\n    >\n      <div\n        class=\"text-wrapper-section toast-inner-content\"\n        [ngStyle]=\"{\n          'text-align': toastNotificationBelonging.ToastCoreConfig.TextPosition\n        }\"\n        [ngClass]=\"{\n          'only-message': !toastNotificationBelonging.Dispatch.Title\n        }\"\n      >\n        <div class=\"dont-break-out\">\n          <div\n            class=\"text-wrapper dont-break-out\"\n            *ngIf=\"!toastNotificationBelonging.ToastCoreConfig.AllowHTMLMessage\"\n          >\n            <p>{{ toastNotificationBelonging.Dispatch.Message }}</p>\n          </div>\n          <div\n            class=\"text-wrapper\"\n            *ngIf=\"toastNotificationBelonging.ToastCoreConfig.AllowHTMLMessage\"\n            [innerHTML]=\"toastNotificationBelonging.Dispatch.Message\"\n          ></div>\n        </div>\n      </div>\n      <span\n        class=\"close-ico icon-times-circle\"\n        (click)=\"close()\"\n        *ngIf=\"\n          !toastNotificationBelonging.Buttons.length &&\n          !toastNotificationBelonging.ToastCoreConfig.DeclineLabel &&\n          !toastNotificationBelonging.ToastCoreConfig.ConfirmLabel &&\n          !toastNotificationBelonging.Dispatch.Title\n        \"\n      ></span>\n    </div>\n\n    <div class=\"button-holder\">\n      <div\n        class=\"button-section\"\n        *ngIf=\"toastNotificationBelonging.Buttons.length\"\n        [ngStyle]=\"{\n          'text-align':\n            toastNotificationBelonging.ToastCoreConfig.ButtonPosition\n        }\"\n      >\n        <button\n          class=\"ed-btn ed-btn-sm\"\n          *ngFor=\"let button of toastNotificationBelonging.Buttons\"\n          (click)=\"onCustomButton(button)\"\n          [ngClass]=\"{\n            '': button.LayoutType ? button.LayoutType === 0 : false,\n            'ed-btn-success': button.LayoutType\n              ? button.LayoutType === 1\n              : false,\n            'ed-btn-info': button.LayoutType ? button.LayoutType === 2 : false,\n            'ed-btn-warning': button.LayoutType\n              ? button.LayoutType === 3\n              : false,\n            'ed-btn-danger': button.LayoutType\n              ? button.LayoutType === 4\n              : false,\n            'ed-btn-dark': button.LayoutType ? button.LayoutType === 5 : false,\n            'ed-btn-light': button.LayoutType ? button.LayoutType === 6 : false,\n            'ed-btn-primary': button.LayoutType\n              ? button.LayoutType === 7\n              : false,\n            'ed-btn-secondary': button.LayoutType\n              ? button.LayoutType === 8\n              : false,\n            'ed-btn-link': button.LayoutType ? button.LayoutType === 9 : false\n          }\"\n        >\n          {{ button.Label }}\n        </button>\n      </div>\n\n      <div\n        class=\"button-section\"\n        [ngStyle]=\"{\n          'text-align':\n            toastNotificationBelonging.ToastCoreConfig.ButtonPosition\n        }\"\n        *ngIf=\"\n          !toastNotificationBelonging.Buttons.length &&\n          (toastNotificationBelonging.ToastCoreConfig.DeclineLabel ||\n            toastNotificationBelonging.ToastCoreConfig.ConfirmLabel)\n        \"\n      >\n        <button\n          class=\"ed-btn ed-btn-sm\"\n          *ngIf=\"toastNotificationBelonging.ToastCoreConfig.ConfirmLabel\"\n          (click)=\"onButtonClick('confirm')\"\n          [ngClass]=\"{\n            'ed-btn-primary':\n              toastNotificationBelonging.ToastCoreConfig.LayoutType === 0,\n            'ed-btn-success':\n              toastNotificationBelonging.ToastCoreConfig.LayoutType === 1,\n            'ed-btn-info':\n              toastNotificationBelonging.ToastCoreConfig.LayoutType === 2,\n            'ed-btn-warning':\n              toastNotificationBelonging.ToastCoreConfig.LayoutType === 3,\n            'ed-btn-danger':\n              toastNotificationBelonging.ToastCoreConfig.LayoutType === 4\n          }\"\n        >\n          {{ toastNotificationBelonging.ToastCoreConfig.ConfirmLabel }}\n        </button>\n        <button\n          class=\"ed-btn ed-btn-sm ed-btn-secondary\"\n          (click)=\"onButtonClick('decline')\"\n          *ngIf=\"toastNotificationBelonging.ToastCoreConfig.DeclineLabel\"\n        >\n          {{ toastNotificationBelonging.ToastCoreConfig.DeclineLabel }}\n        </button>\n      </div>\n    </div>\n\n    <div\n      class=\"progress-bar-container\"\n      *ngIf=\"\n        !toastNotificationBelonging.Buttons.length &&\n        !toastNotificationBelonging.ToastCoreConfig.DeclineLabel &&\n        !toastNotificationBelonging.ToastCoreConfig.ConfirmLabel &&\n        toastNotificationBelonging.ToastCoreConfig.ProgressBar !== 0\n      \"\n    >\n      <div\n        class=\"progress-bar\"\n        [ngStyle]=\"{\n          width:\n            (toastNotificationBelonging.ToastCoreConfig.ProgressBar === 1\n              ? timer.Progress\n              : timer.Remaining) + '%'\n        }\"\n      ></div>\n    </div>\n  </div>\n</div>\n",
                    animations: [fadeInOut(0, 1)],
                    styles: [".ed-btn-sm{font-size:12px;font-weight:normal;margin-right:3px;min-width:40px;padding:2px 8px}.ed-btn-md{font-size:14px;margin-right:5px;min-width:60px;padding:3px 10px}.ed-btn-lg{font-size:16px;margin-right:5px;min-width:70px;padding:4px 10px}.ed-btn{background-color:transparent;border:none;border-radius:3px;cursor:pointer;display:inline-block;line-height:1.5;text-align:center;text-decoration:none;-webkit-user-select:none;user-select:none;vertical-align:middle}.ed-btn:hover{color:#989ea5}.ed-btn-check:focus+.ed-btn,.ed-btn:focus{box-shadow:0 0 1px 2px;outline:0}.ed-btn-check:checked+.ed-btn,.ed-btn-check:active+.ed-btn,.ed-btn:active,.ed-btn.active{box-shadow:0 0 1px 2px}.ed-btn-check:checked+.ed-btn:focus,.ed-btn-check:active+.ed-btn:focus,.ed-btn:active:focus,.ed-btn.active:focus{box-shadow:0 0 1px 2px}.ed-btn:disabled,.ed-btn.disabled,fieldset:disabled .ed-btn{box-shadow:none;opacity:.6;pointer-events:none}.ed-btn-primary{color:#fbfbfbcc;background:#ff9e00;border-color:#ff9e00}.ed-btn-primary:hover{color:#fbfbfb;border-color:#ffa81a;background:#ffb133}.ed-btn-check:focus+.ed-btn-primary,.ed-btn-primary:focus{outline:0;box-shadow:0 0 1px 2px #ffa81a}.ed-btn-check:checked+.ed-btn-primary,.ed-btn-check:active+.ed-btn-primary,.ed-btn-primary:active,.ed-btn-primary.active{box-shadow:0 0 1px 2px #ffa81a}.ed-btn-check:checked+.ed-btn-primary:focus,.ed-btn-check:active+.ed-btn-primary:focus,.ed-btn-primary:active:focus,.ed-btn-primary.active:focus{box-shadow:0 0 1px 2px #ffa81a}.ed-btn-secondary{color:#fbfbfbcc;background:#989ea5;border-color:#989ea5}.ed-btn-secondary:hover{color:#fbfbfb;border-color:#a6abb1;background:#b3b8bd}.ed-btn-check:focus+.ed-btn-secondary,.ed-btn-secondary:focus{outline:0;box-shadow:0 0 1px 2px #a6abb1}.ed-btn-check:checked+.ed-btn-secondary,.ed-btn-check:active+.ed-btn-secondary,.ed-btn-secondary:active,.ed-btn-secondary.active{box-shadow:0 0 1px 2px #a6abb1}.ed-btn-check:checked+.ed-btn-secondary:focus,.ed-btn-check:active+.ed-btn-secondary:focus,.ed-btn-secondary:active:focus,.ed-btn-secondary.active:focus{box-shadow:0 0 1px 2px #a6abb1}.ed-btn-success{color:#fbfbfbcc;background:#3caea3;border-color:#3caea3}.ed-btn-success:hover{color:#fbfbfb;border-color:#45bfb3;background:#58c5bb}.ed-btn-check:focus+.ed-btn-success,.ed-btn-success:focus{outline:0;box-shadow:0 0 1px 2px #45bfb3}.ed-btn-check:checked+.ed-btn-success,.ed-btn-check:active+.ed-btn-success,.ed-btn-success:active,.ed-btn-success.active{box-shadow:0 0 1px 2px #45bfb3}.ed-btn-check:checked+.ed-btn-success:focus,.ed-btn-check:active+.ed-btn-success:focus,.ed-btn-success:active:focus,.ed-btn-success.active:focus{box-shadow:0 0 1px 2px #45bfb3}.ed-btn-info{color:#fbfbfbcc;background:#2f8ee5;border-color:#2f8ee5}.ed-btn-info:hover{color:#fbfbfb;border-color:#469ae8;background:#5ca7eb}.ed-btn-check:focus+.ed-btn-info,.ed-btn-info:focus{outline:0;box-shadow:0 0 1px 2px #469ae8}.ed-btn-check:checked+.ed-btn-info,.ed-btn-check:active+.ed-btn-info,.ed-btn-info:active,.ed-btn-info.active{box-shadow:0 0 1px 2px #469ae8}.ed-btn-check:checked+.ed-btn-info:focus,.ed-btn-check:active+.ed-btn-info:focus,.ed-btn-info:active:focus,.ed-btn-info.active:focus{box-shadow:0 0 1px 2px #469ae8}.ed-btn-warning{color:#fbfbfbcc;background:#ffc107;border-color:#ffc107}.ed-btn-warning:hover{color:#fbfbfb;border-color:#ffc721;background:#ffce3a}.ed-btn-check:focus+.ed-btn-warning,.ed-btn-warning:focus{outline:0;box-shadow:0 0 1px 2px #ffc721}.ed-btn-check:checked+.ed-btn-warning,.ed-btn-check:active+.ed-btn-warning,.ed-btn-warning:active,.ed-btn-warning.active{box-shadow:0 0 1px 2px #ffc721}.ed-btn-check:checked+.ed-btn-warning:focus,.ed-btn-check:active+.ed-btn-warning:focus,.ed-btn-warning:active:focus,.ed-btn-warning.active:focus{box-shadow:0 0 1px 2px #ffc721}.ed-btn-danger{color:#fbfbfbcc;background:#e46464;border-color:#e46464}.ed-btn-danger:hover{color:#fbfbfb;border-color:#e87a7a;background:#ec8f8f}.ed-btn-check:focus+.ed-btn-danger,.ed-btn-danger:focus{outline:0;box-shadow:0 0 1px 2px #e87a7a}.ed-btn-check:checked+.ed-btn-danger,.ed-btn-check:active+.ed-btn-danger,.ed-btn-danger:active,.ed-btn-danger.active{box-shadow:0 0 1px 2px #e87a7a}.ed-btn-check:checked+.ed-btn-danger:focus,.ed-btn-check:active+.ed-btn-danger:focus,.ed-btn-danger:active:focus,.ed-btn-danger.active:focus{box-shadow:0 0 1px 2px #e87a7a}.ed-btn-light{color:#343a40cc;background:#fbfbfb;border-color:#fbfbfb}.ed-btn-light:hover{color:#343a40;border-color:#fff;background:white}.ed-btn-check:focus+.ed-btn-light,.ed-btn-light:focus{outline:0;box-shadow:0 0 1px 2px #fff}.ed-btn-check:checked+.ed-btn-light,.ed-btn-check:active+.ed-btn-light,.ed-btn-light:active,.ed-btn-light.active{box-shadow:0 0 1px 2px #fff}.ed-btn-check:checked+.ed-btn-light:focus,.ed-btn-check:active+.ed-btn-light:focus,.ed-btn-light:active:focus,.ed-btn-light.active:focus{box-shadow:0 0 1px 2px #fff}.ed-btn-dark{color:#fbfbfbcc;background:#343a40;border-color:#343a40}.ed-btn-dark:hover{color:#fbfbfb;border-color:#3f474e;background:#4b545c}.ed-btn-check:focus+.ed-btn-dark,.ed-btn-dark:focus{outline:0;box-shadow:0 0 1px 2px #3f474e}.ed-btn-check:checked+.ed-btn-dark,.ed-btn-check:active+.ed-btn-dark,.ed-btn-dark:active,.ed-btn-dark.active{box-shadow:0 0 1px 2px #3f474e}.ed-btn-check:checked+.ed-btn-dark:focus,.ed-btn-check:active+.ed-btn-dark:focus,.ed-btn-dark:active:focus,.ed-btn-dark.active:focus{box-shadow:0 0 1px 2px #3f474e}@font-face{font-family:\"icomoon\";src:url(data:font/eot;base64,CAgAAGQHAAABAAIAAAAAAAAAAAAAAAAAAAABAJABAAAAAExQAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAA/2/OwAAAAAAAAAAAAAAAAAAAAAAAAA4AaQBjAG8AbQBvAG8AbgAAAA4AUgBlAGcAdQBsAGEAcgAAABYAVgBlAHIAcwBpAG8AbgAgADEALgAwAAAADgBpAGMAbwBtAG8AbwBuAAAAAAAAAQAAAAsAgAADADBPUy8yDxIFbwAAALwAAABgY21hcBdW0ooAAAEcAAAAVGdhc3AAAAAQAAABcAAAAAhnbHlmw5gfRwAAAXgAAAOUaGVhZBxow6wAAAUMAAAANmhoZWEHuQPJAAAFRAAAACRobXR4FEoACQAABWgAAAAgbG9jYQLuAhQAAAWIAAAAEm1heHAADABaAAAFnAAAACBuYW1lmUoJ+wAABbwAAAGGcG9zdAADAAAAAAdEAAAAIAADA0IBkAAFAAACmQLMAAAAjwKZAswAAAHrADMBCQAAAAAAAAAAAAAAAAAAAAEQAAAAAAAAAAAAAAAAAAAAAEAAAOkDA8D/wABAA8AAQAAAAAEAAAAAAAAAAAAAACAAAAAAAAMAAAADAAAAHAABAAMAAAAcAAMAAQAAABwABAA4AAAACgAIAAIAAgABACDpA//9//8AAAAAACDpAP/9//8AAf/jFwQAAwABAAAAAAAAAAAAAAABAAH//wAPAAEAAAAAAAAAAAACAAA3OQEAAAAAAQAAAAAAAAAAAAIAADc5AQAAAAABAAAAAAAAAAAAAgAANzkBAAAAAAIAAAAAA24DbgA7AFcAAAE0Ji8BNz4BNTQmLwEuASMiBg8BJy4BIyIGDwEOARUUFh8BBw4BFRQWHwEeATMyNj8BFx4BMzI2PwE+ATcUBw4BBwYjIicuAScmNTQ3PgE3NjMyFx4BFxYCkQYFaGgFBgYFNAUOBwcOBWdoBQ0HCA0GMwUGBgVnZwUGBgUzBg0IBw0FaGcFDgcHDgU0BQbdIyJ3UFBbW1BQdyMiIiN3UFBbW1BQdyIjATYHDQVoZwUOBwcOBTQFBgYFaGgFBgYFNAUOBwcOBWdoBQ0HCA0GMwUGBgVnZwUGBgUzBg2JW1BQdyIjIyJ3UFBbW1BQdyIjIyJ3UFAAAwAJAAAD9wO3AA8AJgA8AAAlNTQmKwEiBh0BFBY7ATI2JxM0JicuASsBIgYHDgEVExQWOwEyNjUDARYUBw4BIyEiJicmNDcBPgEzMhYXAkkKCG4ICgoIbggKAQoCAwMHBH4EBwMDAgkMCGoHDAgBtwkKCiIT/JITIgoKCQG3CSMUFCMJpW0HDAwHbQgLC94BBgMGAgIEBAICBwP++wYHBwYCFvzbESYRERMTEREmEQMlERUVEQAAAAIAAAAAA24DbgAkAEAAAAE0Ji8BLgEjIgYPAScuASMiBg8BDgEVFBYfAR4BMzI2NwE+ATUXFAcOAQcGIyInLgEnJjU0Nz4BNzYzMhceARcWAt4FBjQFDQcIDQXpgQUOBwcOBTQFBQUFzwUOBwcOBQE2BgWQIyJ3UFBbW1BQdyMiIiN3UFBbW1BQdyIjAhMIDgUzBQYGBeiBBQYGBTQFDgcHDgXPBQUFBQE3BQ0HXFtQUHciIyMid1BQW1tQUHciIyMid1BQAAAAAwAAAAADbgNuAB8ALwBLAAAlNTQmKwERNCYrASIGHQEUFjsBFSMiBh0BFBYzITI2NQM1NCYrASIGHQEUFjsBMjYFFAcOAQcGIyInLgEnJjU0Nz4BNzYzMhceARcWAkkKCDcLB7cICgoINzcICgoIAQAICkkLB24ICgoIbgcLAW4jIndQUFtbUFB3IyIiI3dQUFtbUFB3IiOlWwgKASUICgoIXAcLtwoIWwgLCwgCAFsICgoIWwgLC+ZbUFB3IiMjIndQUFtbUFB3IiMjIndQUAAAAAABAAAAAAAAwM5v/18PPPUACwQAAAAAANyqP3wAAAAA3Ko/fAAAAAAD9wO3AAAACAACAAAAAAAAAAEAAAPA/8AAAAQAAAAAAAP3AAEAAAAAAAAAAAAAAAAAAAAIBAAAAAAAAAAAAAAAAgAAAANuAAAEAAAJA24AAANuAAAAAAAAAAoAFAAeAKAA/AFgAcoAAAABAAAACABYAAMAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAADgCuAAEAAAAAAAEABwAAAAEAAAAAAAIABwBgAAEAAAAAAAMABwA2AAEAAAAAAAQABwB1AAEAAAAAAAUACwAVAAEAAAAAAAYABwBLAAEAAAAAAAoAGgCKAAMAAQQJAAEADgAHAAMAAQQJAAIADgBnAAMAAQQJAAMADgA9AAMAAQQJAAQADgB8AAMAAQQJAAUAFgAgAAMAAQQJAAYADgBSAAMAAQQJAAoANACkaWNvbW9vbgBpAGMAbwBtAG8AbwBuVmVyc2lvbiAxLjAAVgBlAHIAcwBpAG8AbgAgADEALgAwaWNvbW9vbgBpAGMAbwBtAG8AbwBuaWNvbW9vbgBpAGMAbwBtAG8AbwBuUmVndWxhcgBSAGUAZwB1AGwAYQByaWNvbW9vbgBpAGMAbwBtAG8AbwBuRm9udCBnZW5lcmF0ZWQgYnkgSWNvTW9vbi4ARgBvAG4AdAAgAGcAZQBuAGUAcgBhAHQAZQBkACAAYgB5ACAASQBjAG8ATQBvAG8AbgAuAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==);src:url(data:font/eot;base64,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) format(\"embedded-opentype\"),url(data:font/ttf;base64,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) format(\"truetype\"),url(data:font/woff;base64,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) format(\"woff\"),url(data:font/svg;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiID4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPG1ldGFkYXRhPkdlbmVyYXRlZCBieSBJY29Nb29uPC9tZXRhZGF0YT4KCTxkZWZzPgoJCTxmb250IGlkPSJpY29tb29uIiBob3Jpei1hZHYteD0iMTAyNCI+CgkJCTxmb250LWZhY2UgdW5pdHMtcGVyLWVtPSIxMDI0IiBhc2NlbnQ9Ijk2MCIgZGVzY2VudD0iLTY0Ii8+CgkJCTxtaXNzaW5nLWdseXBoIGhvcml6LWFkdi14PSIxMDI0Ii8+CgkJCTxnbHlwaCB1bmljb2RlPSImI3gyMDsiIGhvcml6LWFkdi14PSI1MTIiIGQ9IiIvPgoJCQk8Z2x5cGggdW5pY29kZT0iJiN4ZTkwMDsiIGdseXBoLW5hbWU9InRpbWVzLWNpcmNsZSIgaG9yaXotYWR2LXg9Ijg3OCIgZD0iTTY1Ni41NzEgMzA5LjcxNGMwIDkuNzE0LTQgMTguODU3LTEwLjg1NyAyNS43MTRsLTEwMy40MjkgMTAzLjQyOSAxMDMuNDI5IDEwMy40MjljNi44NTcgNi44NTcgMTAuODU3IDE2IDEwLjg1NyAyNS43MTRzLTQgMTkuNDI5LTEwLjg1NyAyNi4yODZsLTUxLjQyOSA1MS40MjljLTYuODU3IDYuODU3LTE2LjU3MSAxMC44NTctMjYuMjg2IDEwLjg1N3MtMTguODU3LTQtMjUuNzE0LTEwLjg1N2wtMTAzLjQyOS0xMDMuNDI5LTEwMy40MjkgMTAzLjQyOWMtNi44NTcgNi44NTctMTYgMTAuODU3LTI1LjcxNCAxMC44NTdzLTE5LjQyOS00LTI2LjI4Ni0xMC44NTdsLTUxLjQyOS01MS40MjljLTYuODU3LTYuODU3LTEwLjg1Ny0xNi41NzEtMTAuODU3LTI2LjI4NnM0LTE4Ljg1NyAxMC44NTctMjUuNzE0bDEwMy40MjktMTAzLjQyOS0xMDMuNDI5LTEwMy40MjljLTYuODU3LTYuODU3LTEwLjg1Ny0xNi0xMC44NTctMjUuNzE0czQtMTkuNDI5IDEwLjg1Ny0yNi4yODZsNTEuNDI5LTUxLjQyOWM2Ljg1Ny02Ljg1NyAxNi41NzEtMTAuODU3IDI2LjI4Ni0xMC44NTdzMTguODU3IDQgMjUuNzE0IDEwLjg1N2wxMDMuNDI5IDEwMy40MjkgMTAzLjQyOS0xMDMuNDI5YzYuODU3LTYuODU3IDE2LTEwLjg1NyAyNS43MTQtMTAuODU3czE5LjQyOSA0IDI2LjI4NiAxMC44NTdsNTEuNDI5IDUxLjQyOWM2Ljg1NyA2Ljg1NyAxMC44NTcgMTYuNTcxIDEwLjg1NyAyNi4yODZ6TTg3Ny43MTQgNDM4Ljg1N2MwLTI0Mi4yODYtMTk2LjU3MS00MzguODU3LTQzOC44NTctNDM4Ljg1N3MtNDM4Ljg1NyAxOTYuNTcxLTQzOC44NTcgNDM4Ljg1NyAxOTYuNTcxIDQzOC44NTcgNDM4Ljg1NyA0MzguODU3IDQzOC44NTctMTk2LjU3MSA0MzguODU3LTQzOC44NTd6Ii8+CgkJCTxnbHlwaCB1bmljb2RlPSImI3hlOTAxOyIgZ2x5cGgtbmFtZT0iZXhjbGFtYXRpb24tdHJpYW5nbGUsIHdhcm5pbmciIGQ9Ik01ODUuMTQzIDE2NS4xNDN2MTA4LjU3MWMwIDEwLjI4Ni04IDE4Ljg1Ny0xOC4yODYgMTguODU3aC0xMDkuNzE0Yy0xMC4yODYgMC0xOC4yODYtOC41NzEtMTguMjg2LTE4Ljg1N3YtMTA4LjU3MWMwLTEwLjI4NiA4LTE4Ljg1NyAxOC4yODYtMTguODU3aDEwOS43MTRjMTAuMjg2IDAgMTguMjg2IDguNTcxIDE4LjI4NiAxOC44NTd6TTU4NCAzNzguODU3bDEwLjI4NiAyNjIuMjg2YzAgMy40MjktMS43MTQgOC01LjcxNCAxMC44NTctMy40MjkgMi44NTctOC41NzEgNi4yODYtMTMuNzE0IDYuMjg2aC0xMjUuNzE0Yy01LjE0MyAwLTEwLjI4Ni0zLjQyOS0xMy43MTQtNi4yODYtNC0yLjg1Ny01LjcxNC04LjU3MS01LjcxNC0xMmw5LjcxNC0yNjEuMTQzYzAtNy40MjkgOC41NzEtMTMuMTQzIDE5LjQyOS0xMy4xNDNoMTA1LjcxNGMxMC4yODYgMCAxOC44NTcgNS43MTQgMTkuNDI5IDEzLjE0M3pNNTc2IDkxMi41NzFsNDM4Ljg1Ny04MDQuNTcxYzEyLjU3MS0yMi4yODYgMTItNDkuNzE0LTEuMTQzLTcycy0zNy4xNDMtMzYtNjIuODU3LTM2aC04NzcuNzE0Yy0yNS43MTQgMC00OS43MTQgMTMuNzE0LTYyLjg1NyAzNnMtMTMuNzE0IDQ5LjcxNC0xLjE0MyA3Mmw0MzguODU3IDgwNC41NzFjMTIuNTcxIDIzLjQyOSAzNy4xNDMgMzguMjg2IDY0IDM4LjI4NnM1MS40MjktMTQuODU3IDY0LTM4LjI4NnoiLz4KCQkJPGdseXBoIHVuaWNvZGU9IiYjeGU5MDI7IiBnbHlwaC1uYW1lPSJjaGVjay1jaXJjbGUiIGhvcml6LWFkdi14PSI4NzgiIGQ9Ik03MzMuNzE0IDUzMS40MjhjMCA5LjcxNC0zLjQyOSAxOS40MjktMTAuMjg2IDI2LjI4NmwtNTIgNTEuNDI5Yy02Ljg1NyA2Ljg1Ny0xNiAxMC44NTctMjUuNzE0IDEwLjg1N3MtMTguODU3LTQtMjUuNzE0LTEwLjg1N2wtMjMzLjE0My0yMzIuNTcxLTEyOS4xNDMgMTI5LjE0M2MtNi44NTcgNi44NTctMTYgMTAuODU3LTI1LjcxNCAxMC44NTdzLTE4Ljg1Ny00LTI1LjcxNC0xMC44NTdsLTUyLTUxLjQyOWMtNi44NTctNi44NTctMTAuMjg2LTE2LjU3MS0xMC4yODYtMjYuMjg2czMuNDI5LTE4Ljg1NyAxMC4yODYtMjUuNzE0bDIwNi44NTctMjA2Ljg1N2M2Ljg1Ny02Ljg1NyAxNi41NzEtMTAuODU3IDI1LjcxNC0xMC44NTcgOS43MTQgMCAxOS40MjkgNCAyNi4yODYgMTAuODU3bDMxMC4yODYgMzEwLjI4NmM2Ljg1NyA2Ljg1NyAxMC4yODYgMTYgMTAuMjg2IDI1LjcxNHpNODc3LjcxNCA0MzguODU3YzAtMjQyLjI4Ni0xOTYuNTcxLTQzOC44NTctNDM4Ljg1Ny00MzguODU3cy00MzguODU3IDE5Ni41NzEtNDM4Ljg1NyA0MzguODU3IDE5Ni41NzEgNDM4Ljg1NyA0MzguODU3IDQzOC44NTcgNDM4Ljg1Ny0xOTYuNTcxIDQzOC44NTctNDM4Ljg1N3oiLz4KCQkJPGdseXBoIHVuaWNvZGU9IiYjeGU5MDM7IiBnbHlwaC1uYW1lPSJpbmZvLWNpcmNsZSIgaG9yaXotYWR2LXg9Ijg3OCIgZD0iTTU4NS4xNDMgMTY0LjU3MXY5MS40MjljMCAxMC4yODYtOCAxOC4yODYtMTguMjg2IDE4LjI4NmgtNTQuODU3djI5Mi41NzFjMCAxMC4yODYtOCAxOC4yODYtMTguMjg2IDE4LjI4NmgtMTgyLjg1N2MtMTAuMjg2IDAtMTguMjg2LTgtMTguMjg2LTE4LjI4NnYtOTEuNDI5YzAtMTAuMjg2IDgtMTguMjg2IDE4LjI4Ni0xOC4yODZoNTQuODU3di0xODIuODU3aC01NC44NTdjLTEwLjI4NiAwLTE4LjI4Ni04LTE4LjI4Ni0xOC4yODZ2LTkxLjQyOWMwLTEwLjI4NiA4LTE4LjI4NiAxOC4yODYtMTguMjg2aDI1NmMxMC4yODYgMCAxOC4yODYgOCAxOC4yODYgMTguMjg2ek01MTIgNjc2LjU3MXY5MS40MjljMCAxMC4yODYtOCAxOC4yODYtMTguMjg2IDE4LjI4NmgtMTA5LjcxNGMtMTAuMjg2IDAtMTguMjg2LTgtMTguMjg2LTE4LjI4NnYtOTEuNDI5YzAtMTAuMjg2IDgtMTguMjg2IDE4LjI4Ni0xOC4yODZoMTA5LjcxNGMxMC4yODYgMCAxOC4yODYgOCAxOC4yODYgMTguMjg2ek04NzcuNzE0IDQzOC44NTdjMC0yNDIuMjg2LTE5Ni41NzEtNDM4Ljg1Ny00MzguODU3LTQzOC44NTdzLTQzOC44NTcgMTk2LjU3MS00MzguODU3IDQzOC44NTcgMTk2LjU3MSA0MzguODU3IDQzOC44NTcgNDM4Ljg1NyA0MzguODU3LTE5Ni41NzEgNDM4Ljg1Ny00MzguODU3eiIvPgoJCTwvZm9udD48L2RlZnM+Cjwvc3ZnPgo=) format(\"svg\");font-weight:normal;font-style:normal;font-display:block}[class^=icon-],[class*=\" icon-\"]{font-family:\"icomoon\"!important;-webkit-font-smoothing:antialiased;font-style:normal;font-feature-settings:normal;font-variant:normal;font-weight:normal;line-height:1;-moz-osx-font-smoothing:grayscale;speak:never;text-transform:none}.icon-times-circle:before{content:\"\\e900\"}.icon-exclamation-triangle:before{content:\"\\e901\"}.icon-warning:before{content:\"\\e901\"}.icon-check-circle:before{content:\"\\e902\"}.icon-info-circle:before{content:\"\\e903\"}.ngx-awesome-popup-overlay{align-items:center;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px);background:rgba(51,32,0,.4);bottom:0;display:flex;flex-direction:column;justify-content:center;left:0;opacity:0;position:fixed;right:0;top:0;z-index:999999999}.evolve-parent-dialog .text-wrapper,.evolve-confirm-box .text-wrapper{text-align:center}.evolve-parent-dialog .text-wrapper-section,.evolve-confirm-box .text-wrapper-section,.evolve-toast .text-wrapper-section{width:100%}.evolve-parent-dialog .text-wrapper-section .text-wrapper,.evolve-confirm-box .text-wrapper-section .text-wrapper,.evolve-toast .text-wrapper-section .text-wrapper{display:block;width:100%}.evolve-parent-dialog .text-wrapper-section .dont-break-out,.evolve-confirm-box .text-wrapper-section .dont-break-out,.evolve-toast .text-wrapper-section .dont-break-out{-webkit-hyphens:auto;hyphens:auto;overflow-wrap:break-word;white-space:pre-wrap;word-wrap:break-word}.evolve-parent-dialog,.evolve-confirm-box{background:#fbfbfb;border-radius:5px;border-top:7px solid;box-shadow:0 0 4px 1px #00000040;display:flex;flex-direction:column;max-height:calc(100vh - 100px);max-width:calc(100vw - 100px);box-sizing:border-box;position:relative;vertical-align:bottom}.evolve-parent-dialog.standard-dialog,.evolve-confirm-box.standard-dialog{border-color:transparent;padding:17px 20px 10px}.evolve-parent-dialog.success-dialog,.evolve-confirm-box.success-dialog{border-color:#3caea3}.evolve-parent-dialog.info-dialog,.evolve-confirm-box.info-dialog{border-color:#2f8ee5}.evolve-parent-dialog.warning-dialog,.evolve-confirm-box.warning-dialog{border-color:#ffc107}.evolve-parent-dialog.danger-dialog,.evolve-confirm-box.danger-dialog{border-color:#e46464}.ap-icon-success{color:#58c5bb}.ap-icon-info{color:#5ca7eb}.ap-icon-warning{color:#ffce3a}.ap-icon-danger{color:#ec8f8f}.toast-wrapper{background:transparent;display:flex;flex-direction:column;margin:auto;opacity:0;padding:0;pointer-events:auto;position:relative;width:100%;z-index:0}.toast-wrapper .progress-bar-container{background:rgba(255,255,255,.2);border-radius:0 0 2px 2px}.toast-wrapper .progress-bar{height:4px;transition:none;width:0}.toast-wrapper .evolve-toast{background:#fbfbfb;border-radius:2px;box-shadow:0 0 2px 1px #00000040;display:flex;flex-direction:column;margin-top:10px;max-height:350px;position:relative;transition:box-shadow .3s ease-in-out;vertical-align:bottom}.toast-wrapper .evolve-toast:hover{box-shadow:0 0 4px 2px #00000040}.toast-wrapper .evolve-toast.standard-dialog{border-color:transparent}.toast-wrapper .evolve-toast.standard-dialog .progress-bar{background-color:#2a2a2a33}.toast-wrapper .evolve-toast.success-dialog{background-color:#91d9d2}.toast-wrapper .evolve-toast.success-dialog .progress-bar{background-color:#6bccc2}.toast-wrapper .evolve-toast.info-dialog{background-color:#b7d8f6}.toast-wrapper .evolve-toast.info-dialog .progress-bar{background-color:#73b3ee}.toast-wrapper .evolve-toast.warning-dialog{background-color:#ffe7a0}.toast-wrapper .evolve-toast.warning-dialog .progress-bar{background-color:#ffdb6d}.toast-wrapper .evolve-toast.danger-dialog{background-color:#f3bbbb}.toast-wrapper .evolve-toast.danger-dialog .progress-bar{background-color:#ec8f8f}.toast-wrapper .evolve-toast .close-ico{color:#0003;cursor:pointer;font-size:18px;position:absolute;right:6px;top:4px}.toast-wrapper .evolve-toast .toast-title-content{align-content:space-around;align-items:center;background-clip:padding-box;border-radius:2px 2px 0 0;color:#6c757d;display:flex;flex-direction:row;flex-wrap:wrap;height:auto;justify-content:flex-start;padding:5px 10px;width:auto}.toast-wrapper .evolve-toast .toast-title-content .icon-section .icon-type-toast{font-size:20px;opacity:.8;padding:0 6px 0 0}.toast-wrapper .evolve-toast .toast-title-content .toast-title-text{font-size:.87rem}.toast-wrapper .evolve-toast .content-holder{align-items:center;color:#6c757d;display:flex;flex-wrap:nowrap;height:100%;justify-content:space-between;overflow:auto;width:100%}.toast-wrapper .evolve-toast .content-holder .toast-inner-content{padding:6px 10px}.toast-wrapper .evolve-toast .content-holder .only-message{padding:6px 27px 6px 10px}.toast-wrapper .evolve-toast .content-holder .text-wrapper{font-size:.97rem;margin:0}.toast-wrapper .evolve-toast .button-holder{display:flex;flex-direction:column;justify-content:flex-end;width:100%}.toast-wrapper .evolve-toast .button-holder .button-section{margin:0;padding:4px 10px}\n"]
                },] }
    ];
    ToastNotificationSimpleWrapperComponent.ctorParameters = function () { return [
        { type: ToastNotificationBelonging, decorators: [{ type: i0.Inject, args: ['toastNotificationBelonging',] }] },
        { type: GlobalConfigService },
        { type: i0.ChangeDetectorRef }
    ]; };

    var ToastNotificationWrapperComponent = /** @class */ (function (_super) {
        __extends(ToastNotificationWrapperComponent, _super);
        function ToastNotificationWrapperComponent(toastNotificationBelonging, gConfig, cd) {
            var _this = _super.call(this, toastNotificationBelonging) || this;
            _this.toastNotificationBelonging = toastNotificationBelonging;
            _this.gConfig = gConfig;
            _this.cd = cd;
            return _this;
        }
        ToastNotificationWrapperComponent.prototype.ngAfterViewInit = function () {
            this.setResponse(false);
            this.cd.detectChanges();
            this.autoClose();
        };
        return ToastNotificationWrapperComponent;
    }(WrapperAbstraction));
    ToastNotificationWrapperComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'app-toast-notification-wrapper',
                    template: "<div\n  class=\"toast-wrapper standard-toast\"\n  (dblclick)=\"onOverlayClicked($event)\"\n  [@fadeInOut]=\"fadeInOutAnimation\"\n>\n  <div\n    class=\"evolve-toast\"\n    (mouseover)=\"mouseOver()\"\n    (mouseout)=\"mouseOut()\"\n    (click)=\"onToastClicked($event)\"\n    [ngClass]=\"{\n      'standard-dialog':\n        0 === toastNotificationBelonging.ToastCoreConfig.LayoutType,\n      'success-dialog':\n        1 === toastNotificationBelonging.ToastCoreConfig.LayoutType,\n      'info-dialog':\n        2 === toastNotificationBelonging.ToastCoreConfig.LayoutType,\n      'warning-dialog':\n        3 === toastNotificationBelonging.ToastCoreConfig.LayoutType,\n      'danger-dialog':\n        4 === toastNotificationBelonging.ToastCoreConfig.LayoutType\n    }\"\n  >\n    <div\n      class=\"toast-title-content\"\n      *ngIf=\"toastNotificationBelonging.Dispatch.Title\"\n    >\n      <div class=\"dont-break-out\">\n        <div class=\"text-wrapper dont-break-out\">\n          <div class=\"toast-title-text\">\n            {{ toastNotificationBelonging.Dispatch.Title }}\n          </div>\n          <span\n            class=\"close-ico icon-times-circle\"\n            (click)=\"close()\"\n            *ngIf=\"\n              !toastNotificationBelonging.Buttons.length &&\n              !toastNotificationBelonging.ToastCoreConfig.DeclineLabel &&\n              !toastNotificationBelonging.ToastCoreConfig.ConfirmLabel\n            \"\n          ></span>\n        </div>\n      </div>\n    </div>\n\n    <div\n      class=\"content-holder\"\n      *ngIf=\"toastNotificationBelonging.Dispatch.Message\"\n    >\n      <div\n        class=\"icon-section\"\n        *ngIf=\"!toastNotificationBelonging.ToastCoreConfig.DisableIcon\"\n      >\n        <span\n          class=\"icon-type-toast\"\n          [ngClass]=\"{\n            '': toastNotificationBelonging.ToastCoreConfig.LayoutType === 0,\n            'ap-icon-success icon-check-circle':\n              toastNotificationBelonging.ToastCoreConfig.LayoutType === 1,\n            'ap-icon-info icon-info-circle':\n              toastNotificationBelonging.ToastCoreConfig.LayoutType === 2,\n            'ap-icon-warning icon-warning':\n              toastNotificationBelonging.ToastCoreConfig.LayoutType === 3,\n            'ap-icon-danger icon-times-circle':\n              toastNotificationBelonging.ToastCoreConfig.LayoutType === 4\n          }\"\n        ></span>\n      </div>\n      <div\n        class=\"text-wrapper-section toast-inner-content\"\n        [ngStyle]=\"{\n          'text-align': toastNotificationBelonging.ToastCoreConfig.TextPosition\n        }\"\n        [ngClass]=\"{\n          'only-message': !toastNotificationBelonging.Dispatch.Title\n        }\"\n      >\n        <div class=\"dont-break-out\">\n          <div\n            class=\"text-wrapper dont-break-out\"\n            *ngIf=\"!toastNotificationBelonging.ToastCoreConfig.AllowHTMLMessage\"\n          >\n            <p>{{ toastNotificationBelonging.Dispatch.Message }}</p>\n          </div>\n          <div\n            class=\"text-wrapper\"\n            *ngIf=\"toastNotificationBelonging.ToastCoreConfig.AllowHTMLMessage\"\n            [innerHTML]=\"toastNotificationBelonging.Dispatch.Message\"\n          ></div>\n        </div>\n      </div>\n      <span\n        class=\"close-ico icon-times-circle\"\n        (click)=\"close()\"\n        *ngIf=\"\n          !toastNotificationBelonging.Buttons.length &&\n          !toastNotificationBelonging.ToastCoreConfig.DeclineLabel &&\n          !toastNotificationBelonging.ToastCoreConfig.ConfirmLabel &&\n          !toastNotificationBelonging.Dispatch.Title\n        \"\n      ></span>\n    </div>\n\n    <div class=\"button-holder\">\n      <div\n        class=\"button-section\"\n        *ngIf=\"toastNotificationBelonging.Buttons.length\"\n        [ngStyle]=\"{\n          'text-align':\n            toastNotificationBelonging.ToastCoreConfig.ButtonPosition\n        }\"\n      >\n        <button\n          class=\"ed-btn ed-btn-sm\"\n          *ngFor=\"let button of toastNotificationBelonging.Buttons\"\n          (click)=\"onCustomButton(button)\"\n          [ngClass]=\"{\n            '': button.LayoutType ? button.LayoutType === 0 : false,\n            'ed-btn-success': button.LayoutType\n              ? button.LayoutType === 1\n              : false,\n            'ed-btn-info': button.LayoutType ? button.LayoutType === 2 : false,\n            'ed-btn-warning': button.LayoutType\n              ? button.LayoutType === 3\n              : false,\n            'ed-btn-danger': button.LayoutType\n              ? button.LayoutType === 4\n              : false,\n            'ed-btn-dark': button.LayoutType ? button.LayoutType === 5 : false,\n            'ed-btn-light': button.LayoutType ? button.LayoutType === 6 : false,\n            'ed-btn-primary': button.LayoutType\n              ? button.LayoutType === 7\n              : false,\n            'ed-btn-secondary': button.LayoutType\n              ? button.LayoutType === 8\n              : false,\n            'ed-btn-link': button.LayoutType ? button.LayoutType === 9 : false\n          }\"\n        >\n          {{ button.Label }}\n        </button>\n      </div>\n\n      <div\n        class=\"button-section\"\n        [ngStyle]=\"{\n          'text-align':\n            toastNotificationBelonging.ToastCoreConfig.ButtonPosition\n        }\"\n        *ngIf=\"\n          !toastNotificationBelonging.Buttons.length &&\n          (toastNotificationBelonging.ToastCoreConfig.DeclineLabel ||\n            toastNotificationBelonging.ToastCoreConfig.ConfirmLabel)\n        \"\n      >\n        <button\n          class=\"ed-btn ed-btn-sm\"\n          *ngIf=\"toastNotificationBelonging.ToastCoreConfig.ConfirmLabel\"\n          (click)=\"onButtonClick('confirm')\"\n          [ngClass]=\"{\n            'ed-btn-primary':\n              toastNotificationBelonging.ToastCoreConfig.LayoutType === 0,\n            'ed-btn-success':\n              toastNotificationBelonging.ToastCoreConfig.LayoutType === 1,\n            'ed-btn-info':\n              toastNotificationBelonging.ToastCoreConfig.LayoutType === 2,\n            'ed-btn-warning':\n              toastNotificationBelonging.ToastCoreConfig.LayoutType === 3,\n            'ed-btn-danger':\n              toastNotificationBelonging.ToastCoreConfig.LayoutType === 4\n          }\"\n        >\n          {{ toastNotificationBelonging.ToastCoreConfig.ConfirmLabel }}\n        </button>\n        <button\n          class=\"ed-btn ed-btn-sm ed-btn-secondary\"\n          (click)=\"onButtonClick('decline')\"\n          *ngIf=\"toastNotificationBelonging.ToastCoreConfig.DeclineLabel\"\n        >\n          {{ toastNotificationBelonging.ToastCoreConfig.DeclineLabel }}\n        </button>\n      </div>\n    </div>\n\n    <div\n      class=\"progress-bar-container\"\n      *ngIf=\"\n        !toastNotificationBelonging.Buttons.length &&\n        !toastNotificationBelonging.ToastCoreConfig.DeclineLabel &&\n        !toastNotificationBelonging.ToastCoreConfig.ConfirmLabel &&\n        toastNotificationBelonging.ToastCoreConfig.ProgressBar !== 0\n      \"\n    >\n      <div\n        class=\"progress-bar\"\n        [ngStyle]=\"{\n          width:\n            (toastNotificationBelonging.ToastCoreConfig.ProgressBar === 1\n              ? timer.Progress\n              : timer.Remaining) + '%'\n        }\"\n      ></div>\n    </div>\n  </div>\n</div>\n",
                    animations: [fadeInOut(0, 1)],
                    styles: [".ed-btn-sm{font-size:12px;font-weight:normal;margin-right:3px;min-width:40px;padding:2px 8px}.ed-btn-md{font-size:14px;margin-right:5px;min-width:60px;padding:3px 10px}.ed-btn-lg{font-size:16px;margin-right:5px;min-width:70px;padding:4px 10px}.ed-btn{background-color:transparent;border:none;border-radius:3px;cursor:pointer;display:inline-block;line-height:1.5;text-align:center;text-decoration:none;-webkit-user-select:none;user-select:none;vertical-align:middle}.ed-btn:hover{color:#989ea5}.ed-btn-check:focus+.ed-btn,.ed-btn:focus{box-shadow:0 0 1px 2px;outline:0}.ed-btn-check:checked+.ed-btn,.ed-btn-check:active+.ed-btn,.ed-btn:active,.ed-btn.active{box-shadow:0 0 1px 2px}.ed-btn-check:checked+.ed-btn:focus,.ed-btn-check:active+.ed-btn:focus,.ed-btn:active:focus,.ed-btn.active:focus{box-shadow:0 0 1px 2px}.ed-btn:disabled,.ed-btn.disabled,fieldset:disabled .ed-btn{box-shadow:none;opacity:.6;pointer-events:none}.ed-btn-primary{color:#fbfbfbcc;background:#ff9e00;border-color:#ff9e00}.ed-btn-primary:hover{color:#fbfbfb;border-color:#ffa81a;background:#ffb133}.ed-btn-check:focus+.ed-btn-primary,.ed-btn-primary:focus{outline:0;box-shadow:0 0 1px 2px #ffa81a}.ed-btn-check:checked+.ed-btn-primary,.ed-btn-check:active+.ed-btn-primary,.ed-btn-primary:active,.ed-btn-primary.active{box-shadow:0 0 1px 2px #ffa81a}.ed-btn-check:checked+.ed-btn-primary:focus,.ed-btn-check:active+.ed-btn-primary:focus,.ed-btn-primary:active:focus,.ed-btn-primary.active:focus{box-shadow:0 0 1px 2px #ffa81a}.ed-btn-secondary{color:#fbfbfbcc;background:#989ea5;border-color:#989ea5}.ed-btn-secondary:hover{color:#fbfbfb;border-color:#a6abb1;background:#b3b8bd}.ed-btn-check:focus+.ed-btn-secondary,.ed-btn-secondary:focus{outline:0;box-shadow:0 0 1px 2px #a6abb1}.ed-btn-check:checked+.ed-btn-secondary,.ed-btn-check:active+.ed-btn-secondary,.ed-btn-secondary:active,.ed-btn-secondary.active{box-shadow:0 0 1px 2px #a6abb1}.ed-btn-check:checked+.ed-btn-secondary:focus,.ed-btn-check:active+.ed-btn-secondary:focus,.ed-btn-secondary:active:focus,.ed-btn-secondary.active:focus{box-shadow:0 0 1px 2px #a6abb1}.ed-btn-success{color:#fbfbfbcc;background:#3caea3;border-color:#3caea3}.ed-btn-success:hover{color:#fbfbfb;border-color:#45bfb3;background:#58c5bb}.ed-btn-check:focus+.ed-btn-success,.ed-btn-success:focus{outline:0;box-shadow:0 0 1px 2px #45bfb3}.ed-btn-check:checked+.ed-btn-success,.ed-btn-check:active+.ed-btn-success,.ed-btn-success:active,.ed-btn-success.active{box-shadow:0 0 1px 2px #45bfb3}.ed-btn-check:checked+.ed-btn-success:focus,.ed-btn-check:active+.ed-btn-success:focus,.ed-btn-success:active:focus,.ed-btn-success.active:focus{box-shadow:0 0 1px 2px #45bfb3}.ed-btn-info{color:#fbfbfbcc;background:#2f8ee5;border-color:#2f8ee5}.ed-btn-info:hover{color:#fbfbfb;border-color:#469ae8;background:#5ca7eb}.ed-btn-check:focus+.ed-btn-info,.ed-btn-info:focus{outline:0;box-shadow:0 0 1px 2px #469ae8}.ed-btn-check:checked+.ed-btn-info,.ed-btn-check:active+.ed-btn-info,.ed-btn-info:active,.ed-btn-info.active{box-shadow:0 0 1px 2px #469ae8}.ed-btn-check:checked+.ed-btn-info:focus,.ed-btn-check:active+.ed-btn-info:focus,.ed-btn-info:active:focus,.ed-btn-info.active:focus{box-shadow:0 0 1px 2px #469ae8}.ed-btn-warning{color:#fbfbfbcc;background:#ffc107;border-color:#ffc107}.ed-btn-warning:hover{color:#fbfbfb;border-color:#ffc721;background:#ffce3a}.ed-btn-check:focus+.ed-btn-warning,.ed-btn-warning:focus{outline:0;box-shadow:0 0 1px 2px #ffc721}.ed-btn-check:checked+.ed-btn-warning,.ed-btn-check:active+.ed-btn-warning,.ed-btn-warning:active,.ed-btn-warning.active{box-shadow:0 0 1px 2px #ffc721}.ed-btn-check:checked+.ed-btn-warning:focus,.ed-btn-check:active+.ed-btn-warning:focus,.ed-btn-warning:active:focus,.ed-btn-warning.active:focus{box-shadow:0 0 1px 2px #ffc721}.ed-btn-danger{color:#fbfbfbcc;background:#e46464;border-color:#e46464}.ed-btn-danger:hover{color:#fbfbfb;border-color:#e87a7a;background:#ec8f8f}.ed-btn-check:focus+.ed-btn-danger,.ed-btn-danger:focus{outline:0;box-shadow:0 0 1px 2px #e87a7a}.ed-btn-check:checked+.ed-btn-danger,.ed-btn-check:active+.ed-btn-danger,.ed-btn-danger:active,.ed-btn-danger.active{box-shadow:0 0 1px 2px #e87a7a}.ed-btn-check:checked+.ed-btn-danger:focus,.ed-btn-check:active+.ed-btn-danger:focus,.ed-btn-danger:active:focus,.ed-btn-danger.active:focus{box-shadow:0 0 1px 2px #e87a7a}.ed-btn-light{color:#343a40cc;background:#fbfbfb;border-color:#fbfbfb}.ed-btn-light:hover{color:#343a40;border-color:#fff;background:white}.ed-btn-check:focus+.ed-btn-light,.ed-btn-light:focus{outline:0;box-shadow:0 0 1px 2px #fff}.ed-btn-check:checked+.ed-btn-light,.ed-btn-check:active+.ed-btn-light,.ed-btn-light:active,.ed-btn-light.active{box-shadow:0 0 1px 2px #fff}.ed-btn-check:checked+.ed-btn-light:focus,.ed-btn-check:active+.ed-btn-light:focus,.ed-btn-light:active:focus,.ed-btn-light.active:focus{box-shadow:0 0 1px 2px #fff}.ed-btn-dark{color:#fbfbfbcc;background:#343a40;border-color:#343a40}.ed-btn-dark:hover{color:#fbfbfb;border-color:#3f474e;background:#4b545c}.ed-btn-check:focus+.ed-btn-dark,.ed-btn-dark:focus{outline:0;box-shadow:0 0 1px 2px #3f474e}.ed-btn-check:checked+.ed-btn-dark,.ed-btn-check:active+.ed-btn-dark,.ed-btn-dark:active,.ed-btn-dark.active{box-shadow:0 0 1px 2px #3f474e}.ed-btn-check:checked+.ed-btn-dark:focus,.ed-btn-check:active+.ed-btn-dark:focus,.ed-btn-dark:active:focus,.ed-btn-dark.active:focus{box-shadow:0 0 1px 2px #3f474e}@font-face{font-family:\"icomoon\";src:url(data:font/eot;base64,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);src:url(data:font/eot;base64,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) format(\"embedded-opentype\"),url(data:font/ttf;base64,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) format(\"truetype\"),url(data:font/woff;base64,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) format(\"woff\"),url(data:font/svg;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiID4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPG1ldGFkYXRhPkdlbmVyYXRlZCBieSBJY29Nb29uPC9tZXRhZGF0YT4KCTxkZWZzPgoJCTxmb250IGlkPSJpY29tb29uIiBob3Jpei1hZHYteD0iMTAyNCI+CgkJCTxmb250LWZhY2UgdW5pdHMtcGVyLWVtPSIxMDI0IiBhc2NlbnQ9Ijk2MCIgZGVzY2VudD0iLTY0Ii8+CgkJCTxtaXNzaW5nLWdseXBoIGhvcml6LWFkdi14PSIxMDI0Ii8+CgkJCTxnbHlwaCB1bmljb2RlPSImI3gyMDsiIGhvcml6LWFkdi14PSI1MTIiIGQ9IiIvPgoJCQk8Z2x5cGggdW5pY29kZT0iJiN4ZTkwMDsiIGdseXBoLW5hbWU9InRpbWVzLWNpcmNsZSIgaG9yaXotYWR2LXg9Ijg3OCIgZD0iTTY1Ni41NzEgMzA5LjcxNGMwIDkuNzE0LTQgMTguODU3LTEwLjg1NyAyNS43MTRsLTEwMy40MjkgMTAzLjQyOSAxMDMuNDI5IDEwMy40MjljNi44NTcgNi44NTcgMTAuODU3IDE2IDEwLjg1NyAyNS43MTRzLTQgMTkuNDI5LTEwLjg1NyAyNi4yODZsLTUxLjQyOSA1MS40MjljLTYuODU3IDYuODU3LTE2LjU3MSAxMC44NTctMjYuMjg2IDEwLjg1N3MtMTguODU3LTQtMjUuNzE0LTEwLjg1N2wtMTAzLjQyOS0xMDMuNDI5LTEwMy40MjkgMTAzLjQyOWMtNi44NTcgNi44NTctMTYgMTAuODU3LTI1LjcxNCAxMC44NTdzLTE5LjQyOS00LTI2LjI4Ni0xMC44NTdsLTUxLjQyOS01MS40MjljLTYuODU3LTYuODU3LTEwLjg1Ny0xNi41NzEtMTAuODU3LTI2LjI4NnM0LTE4Ljg1NyAxMC44NTctMjUuNzE0bDEwMy40MjktMTAzLjQyOS0xMDMuNDI5LTEwMy40MjljLTYuODU3LTYuODU3LTEwLjg1Ny0xNi0xMC44NTctMjUuNzE0czQtMTkuNDI5IDEwLjg1Ny0yNi4yODZsNTEuNDI5LTUxLjQyOWM2Ljg1Ny02Ljg1NyAxNi41NzEtMTAuODU3IDI2LjI4Ni0xMC44NTdzMTguODU3IDQgMjUuNzE0IDEwLjg1N2wxMDMuNDI5IDEwMy40MjkgMTAzLjQyOS0xMDMuNDI5YzYuODU3LTYuODU3IDE2LTEwLjg1NyAyNS43MTQtMTAuODU3czE5LjQyOSA0IDI2LjI4NiAxMC44NTdsNTEuNDI5IDUxLjQyOWM2Ljg1NyA2Ljg1NyAxMC44NTcgMTYuNTcxIDEwLjg1NyAyNi4yODZ6TTg3Ny43MTQgNDM4Ljg1N2MwLTI0Mi4yODYtMTk2LjU3MS00MzguODU3LTQzOC44NTctNDM4Ljg1N3MtNDM4Ljg1NyAxOTYuNTcxLTQzOC44NTcgNDM4Ljg1NyAxOTYuNTcxIDQzOC44NTcgNDM4Ljg1NyA0MzguODU3IDQzOC44NTctMTk2LjU3MSA0MzguODU3LTQzOC44NTd6Ii8+CgkJCTxnbHlwaCB1bmljb2RlPSImI3hlOTAxOyIgZ2x5cGgtbmFtZT0iZXhjbGFtYXRpb24tdHJpYW5nbGUsIHdhcm5pbmciIGQ9Ik01ODUuMTQzIDE2NS4xNDN2MTA4LjU3MWMwIDEwLjI4Ni04IDE4Ljg1Ny0xOC4yODYgMTguODU3aC0xMDkuNzE0Yy0xMC4yODYgMC0xOC4yODYtOC41NzEtMTguMjg2LTE4Ljg1N3YtMTA4LjU3MWMwLTEwLjI4NiA4LTE4Ljg1NyAxOC4yODYtMTguODU3aDEwOS43MTRjMTAuMjg2IDAgMTguMjg2IDguNTcxIDE4LjI4NiAxOC44NTd6TTU4NCAzNzguODU3bDEwLjI4NiAyNjIuMjg2YzAgMy40MjktMS43MTQgOC01LjcxNCAxMC44NTctMy40MjkgMi44NTctOC41NzEgNi4yODYtMTMuNzE0IDYuMjg2aC0xMjUuNzE0Yy01LjE0MyAwLTEwLjI4Ni0zLjQyOS0xMy43MTQtNi4yODYtNC0yLjg1Ny01LjcxNC04LjU3MS01LjcxNC0xMmw5LjcxNC0yNjEuMTQzYzAtNy40MjkgOC41NzEtMTMuMTQzIDE5LjQyOS0xMy4xNDNoMTA1LjcxNGMxMC4yODYgMCAxOC44NTcgNS43MTQgMTkuNDI5IDEzLjE0M3pNNTc2IDkxMi41NzFsNDM4Ljg1Ny04MDQuNTcxYzEyLjU3MS0yMi4yODYgMTItNDkuNzE0LTEuMTQzLTcycy0zNy4xNDMtMzYtNjIuODU3LTM2aC04NzcuNzE0Yy0yNS43MTQgMC00OS43MTQgMTMuNzE0LTYyLjg1NyAzNnMtMTMuNzE0IDQ5LjcxNC0xLjE0MyA3Mmw0MzguODU3IDgwNC41NzFjMTIuNTcxIDIzLjQyOSAzNy4xNDMgMzguMjg2IDY0IDM4LjI4NnM1MS40MjktMTQuODU3IDY0LTM4LjI4NnoiLz4KCQkJPGdseXBoIHVuaWNvZGU9IiYjeGU5MDI7IiBnbHlwaC1uYW1lPSJjaGVjay1jaXJjbGUiIGhvcml6LWFkdi14PSI4NzgiIGQ9Ik03MzMuNzE0IDUzMS40MjhjMCA5LjcxNC0zLjQyOSAxOS40MjktMTAuMjg2IDI2LjI4NmwtNTIgNTEuNDI5Yy02Ljg1NyA2Ljg1Ny0xNiAxMC44NTctMjUuNzE0IDEwLjg1N3MtMTguODU3LTQtMjUuNzE0LTEwLjg1N2wtMjMzLjE0My0yMzIuNTcxLTEyOS4xNDMgMTI5LjE0M2MtNi44NTcgNi44NTctMTYgMTAuODU3LTI1LjcxNCAxMC44NTdzLTE4Ljg1Ny00LTI1LjcxNC0xMC44NTdsLTUyLTUxLjQyOWMtNi44NTctNi44NTctMTAuMjg2LTE2LjU3MS0xMC4yODYtMjYuMjg2czMuNDI5LTE4Ljg1NyAxMC4yODYtMjUuNzE0bDIwNi44NTctMjA2Ljg1N2M2Ljg1Ny02Ljg1NyAxNi41NzEtMTAuODU3IDI1LjcxNC0xMC44NTcgOS43MTQgMCAxOS40MjkgNCAyNi4yODYgMTAuODU3bDMxMC4yODYgMzEwLjI4NmM2Ljg1NyA2Ljg1NyAxMC4yODYgMTYgMTAuMjg2IDI1LjcxNHpNODc3LjcxNCA0MzguODU3YzAtMjQyLjI4Ni0xOTYuNTcxLTQzOC44NTctNDM4Ljg1Ny00MzguODU3cy00MzguODU3IDE5Ni41NzEtNDM4Ljg1NyA0MzguODU3IDE5Ni41NzEgNDM4Ljg1NyA0MzguODU3IDQzOC44NTcgNDM4Ljg1Ny0xOTYuNTcxIDQzOC44NTctNDM4Ljg1N3oiLz4KCQkJPGdseXBoIHVuaWNvZGU9IiYjeGU5MDM7IiBnbHlwaC1uYW1lPSJpbmZvLWNpcmNsZSIgaG9yaXotYWR2LXg9Ijg3OCIgZD0iTTU4NS4xNDMgMTY0LjU3MXY5MS40MjljMCAxMC4yODYtOCAxOC4yODYtMTguMjg2IDE4LjI4NmgtNTQuODU3djI5Mi41NzFjMCAxMC4yODYtOCAxOC4yODYtMTguMjg2IDE4LjI4NmgtMTgyLjg1N2MtMTAuMjg2IDAtMTguMjg2LTgtMTguMjg2LTE4LjI4NnYtOTEuNDI5YzAtMTAuMjg2IDgtMTguMjg2IDE4LjI4Ni0xOC4yODZoNTQuODU3di0xODIuODU3aC01NC44NTdjLTEwLjI4NiAwLTE4LjI4Ni04LTE4LjI4Ni0xOC4yODZ2LTkxLjQyOWMwLTEwLjI4NiA4LTE4LjI4NiAxOC4yODYtMTguMjg2aDI1NmMxMC4yODYgMCAxOC4yODYgOCAxOC4yODYgMTguMjg2ek01MTIgNjc2LjU3MXY5MS40MjljMCAxMC4yODYtOCAxOC4yODYtMTguMjg2IDE4LjI4NmgtMTA5LjcxNGMtMTAuMjg2IDAtMTguMjg2LTgtMTguMjg2LTE4LjI4NnYtOTEuNDI5YzAtMTAuMjg2IDgtMTguMjg2IDE4LjI4Ni0xOC4yODZoMTA5LjcxNGMxMC4yODYgMCAxOC4yODYgOCAxOC4yODYgMTguMjg2ek04NzcuNzE0IDQzOC44NTdjMC0yNDIuMjg2LTE5Ni41NzEtNDM4Ljg1Ny00MzguODU3LTQzOC44NTdzLTQzOC44NTcgMTk2LjU3MS00MzguODU3IDQzOC44NTcgMTk2LjU3MSA0MzguODU3IDQzOC44NTcgNDM4Ljg1NyA0MzguODU3LTE5Ni41NzEgNDM4Ljg1Ny00MzguODU3eiIvPgoJCTwvZm9udD48L2RlZnM+Cjwvc3ZnPgo=) format(\"svg\");font-weight:normal;font-style:normal;font-display:block}[class^=icon-],[class*=\" icon-\"]{font-family:\"icomoon\"!important;-webkit-font-smoothing:antialiased;font-style:normal;font-feature-settings:normal;font-variant:normal;font-weight:normal;line-height:1;-moz-osx-font-smoothing:grayscale;speak:never;text-transform:none}.icon-times-circle:before{content:\"\\e900\"}.icon-exclamation-triangle:before{content:\"\\e901\"}.icon-warning:before{content:\"\\e901\"}.icon-check-circle:before{content:\"\\e902\"}.icon-info-circle:before{content:\"\\e903\"}.ngx-awesome-popup-overlay{align-items:center;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px);background:rgba(51,32,0,.4);bottom:0;display:flex;flex-direction:column;justify-content:center;left:0;opacity:0;position:fixed;right:0;top:0;z-index:999999999}.evolve-parent-dialog .text-wrapper,.evolve-confirm-box .text-wrapper{text-align:center}.evolve-parent-dialog .text-wrapper-section,.evolve-confirm-box .text-wrapper-section,.evolve-toast .text-wrapper-section{width:100%}.evolve-parent-dialog .text-wrapper-section .text-wrapper,.evolve-confirm-box .text-wrapper-section .text-wrapper,.evolve-toast .text-wrapper-section .text-wrapper{display:block;width:100%}.evolve-parent-dialog .text-wrapper-section .dont-break-out,.evolve-confirm-box .text-wrapper-section .dont-break-out,.evolve-toast .text-wrapper-section .dont-break-out{-webkit-hyphens:auto;hyphens:auto;overflow-wrap:break-word;white-space:pre-wrap;word-wrap:break-word}.evolve-parent-dialog,.evolve-confirm-box{background:#fbfbfb;border-radius:5px;border-top:7px solid;box-shadow:0 0 4px 1px #00000040;display:flex;flex-direction:column;max-height:calc(100vh - 100px);max-width:calc(100vw - 100px);box-sizing:border-box;position:relative;vertical-align:bottom}.evolve-parent-dialog.standard-dialog,.evolve-confirm-box.standard-dialog{border-color:transparent;padding:17px 20px 10px}.evolve-parent-dialog.success-dialog,.evolve-confirm-box.success-dialog{border-color:#3caea3}.evolve-parent-dialog.info-dialog,.evolve-confirm-box.info-dialog{border-color:#2f8ee5}.evolve-parent-dialog.warning-dialog,.evolve-confirm-box.warning-dialog{border-color:#ffc107}.evolve-parent-dialog.danger-dialog,.evolve-confirm-box.danger-dialog{border-color:#e46464}.ap-icon-success{color:#58c5bb}.ap-icon-info{color:#5ca7eb}.ap-icon-warning{color:#ffce3a}.ap-icon-danger{color:#ec8f8f}.toast-wrapper{background:transparent;display:flex;flex-direction:column;margin:auto;opacity:0;padding:0;pointer-events:auto;position:relative;width:100%;z-index:0}.toast-wrapper .progress-bar-container{background:rgba(255,255,255,.2);border-radius:0 0 5px 5px}.toast-wrapper .progress-bar{height:4px;transition:none;width:0}.toast-wrapper .evolve-toast{background:#fbfbfb;border-radius:5px;border-right:4px solid;box-shadow:0 0 4px 1px #00000040;display:flex;flex-direction:column;margin-top:10px;max-height:350px;position:relative;transition:box-shadow .3s ease-in-out;vertical-align:bottom}.toast-wrapper .evolve-toast:hover{box-shadow:0 0 4px 3px #00000040}.toast-wrapper .evolve-toast.standard-dialog{border-color:transparent}.toast-wrapper .evolve-toast.standard-dialog .progress-bar{background-color:#2a2a2a33}.toast-wrapper .evolve-toast.success-dialog{background-color:#dcf3f1;border-color:#3caea3}.toast-wrapper .evolve-toast.success-dialog .progress-bar{background-color:#91d9d2}.toast-wrapper .evolve-toast.info-dialog{background-color:#e4f1fc;border-color:#2f8ee5}.toast-wrapper .evolve-toast.info-dialog .progress-bar{background-color:#a0ccf3}.toast-wrapper .evolve-toast.warning-dialog{background-color:#fff4d3;border-color:#ffc107}.toast-wrapper .evolve-toast.warning-dialog .progress-bar{background-color:#ffe187}.toast-wrapper .evolve-toast.danger-dialog{background-color:#f7d1d1;border-color:#e46464}.toast-wrapper .evolve-toast.danger-dialog .progress-bar{background-color:#ec8f8f}.toast-wrapper .evolve-toast .close-ico{color:#0003;cursor:pointer;font-size:20px;position:absolute;right:6px;top:4px}.toast-wrapper .evolve-toast .toast-title-content{align-items:flex-start;background-clip:padding-box;background-color:#ffffff8c;border-bottom:1px solid rgba(0,0,0,.05);border-radius:5px 5px 0 0;color:#6c757d;display:flex;flex-direction:column;height:auto;justify-content:flex-start;padding:5px 10px;width:auto}.toast-wrapper .evolve-toast .toast-title-content .toast-title-text{font-size:.87rem}.toast-wrapper .evolve-toast .content-holder{align-items:center;color:#6c757d;display:flex;flex-wrap:nowrap;height:100%;justify-content:space-between;overflow:auto;width:100%}.toast-wrapper .evolve-toast .content-holder .icon-section .icon-type-toast{font-size:24px;padding:0 2px 0 6px}.toast-wrapper .evolve-toast .content-holder .toast-inner-content{padding:6px 10px}.toast-wrapper .evolve-toast .content-holder .only-message{padding:6px 27px 6px 10px}.toast-wrapper .evolve-toast .content-holder .text-wrapper{font-size:.97rem;margin:0}.toast-wrapper .evolve-toast .button-holder{display:flex;flex-direction:column;justify-content:flex-end;width:100%}.toast-wrapper .evolve-toast .button-holder .button-section{margin:0;padding:4px 10px}\n"]
                },] }
    ];
    ToastNotificationWrapperComponent.ctorParameters = function () { return [
        { type: ToastNotificationBelonging, decorators: [{ type: i0.Inject, args: ['toastNotificationBelonging',] }] },
        { type: GlobalConfigService },
        { type: i0.ChangeDetectorRef }
    ]; };

    var ToastNotificationService = /** @class */ (function () {
        function ToastNotificationService(componentFactoryResolver, injector, appRef, toastConfig, gConfigService) {
            this.componentFactoryResolver = componentFactoryResolver;
            this.injector = injector;
            this.appRef = appRef;
            this.toastConfig = toastConfig;
            this.gConfigService = gConfigService;
            this.toastComponentRefList = [];
            this.bufferToastRawList = [];
            this.bufferCheckingIntervalIsReady = true;
        }
        ToastNotificationService.prototype.openToast$ = function (_ToastNotificationBelonging) {
            var eventController = _ToastNotificationBelonging.EventsController;
            // console.log(`%c ${_ToastNotificationBelonging.EntityUniqueID} `, `background: #339933; color: #fff`);
            var toastRawInstance = this.prepareRawToast(eventController, _ToastNotificationBelonging);
            this.listeners(eventController);
            this.internalRouting(toastRawInstance);
            return eventController.afterClosed$;
        };
        ToastNotificationService.prototype.internalRouting = function (_ToastRawInstance) {
            if (this.isRefListAvailable()) {
                this.sendToProduction(_ToastRawInstance);
                return true;
            }
            else {
                this.sendToBuffer(_ToastRawInstance);
                return false;
            }
        };
        ToastNotificationService.prototype.sendToBuffer = function (_ToastRawInstance) {
            this.bufferToastRawList.push(_ToastRawInstance);
        };
        ToastNotificationService.prototype.sendToProduction = function (_ToastRawInstance) {
            var componentRef = this.getComponentRef(_ToastRawInstance);
            if (componentRef) {
                this.toastComponentRefList.push(componentRef);
                componentRef.instance.toastNotificationBelonging =
                    _ToastRawInstance.ToastBelonging;
                this.appendToBodyParentComponent(componentRef);
            }
        };
        ToastNotificationService.prototype.isRefListAvailable = function () {
            return (this.toastComponentRefList.length <
                this.toastConfig.productionConfig.GlobalSettings
                    .AllowedNotificationsAtOnce);
        };
        ToastNotificationService.prototype.prepareRawToast = function (_EventsController, _ToastNotificationBelonging) {
            var weakMap = new WeakMap();
            weakMap.set(ToastNotificationEventsController, _EventsController);
            return {
                WeakMap: weakMap,
                ToastBelonging: _ToastNotificationBelonging
            };
        };
        ToastNotificationService.prototype.getComponentRef = function (_ToastNotificationRawState) {
            var dialogIndex = this.findDialogIndex(_ToastNotificationRawState.ToastBelonging.EntityUniqueID);
            if (dialogIndex === -1) {
                var toastUserViewComponent = ToastNotificationWrapperComponent;
                if (_ToastNotificationRawState.ToastBelonging.ToastCoreConfig
                    .ToastUserViewType === exports.ToastUserViewTypeEnum.SIMPLE) {
                    toastUserViewComponent = ToastNotificationSimpleWrapperComponent;
                }
                var componentFactory = this.componentFactoryResolver.resolveComponentFactory(toastUserViewComponent);
                return componentFactory.create(new DialogInjector(this.injector, _ToastNotificationRawState.WeakMap));
            }
            return null;
        };
        ToastNotificationService.prototype.listeners = function (_EventsController) {
            var _this = this;
            // Listener for closing dialog
            var closeDialogSubscription = _EventsController.afterClosed$.subscribe(function (response) {
                // this.removeFromBodyParentComponent(modalIndex);
                _this.removeFromBody(response.toastNotificationBelonging.EntityUniqueID);
                closeDialogSubscription.unsubscribe();
            });
        };
        ToastNotificationService.prototype.appendToBodyParentComponent = function (_ComponentRef) {
            // attach view to ignite lifecycle hooks
            this.appRef.attachView(_ComponentRef.hostView);
            var toastPosition = _ComponentRef.instance.toastNotificationBelonging.ToastCoreConfig
                .ToastPosition;
            var openInElementID = _ComponentRef.instance.toastNotificationBelonging.ToastCoreConfig
                .OpenInElementID;
            var targetNode;
            if (!openInElementID) {
                this.setToastWrapperNode(_ComponentRef.instance.toastNotificationBelonging.ToastCoreConfig
                    .ToastPosition, this.setToastOverlayNode());
                targetNode = document.getElementById("toast-wrapper-" + toastPosition);
            }
            else {
                targetNode = document.getElementById(openInElementID);
            }
            var domElem = _ComponentRef.hostView
                .rootNodes[0];
            var toastEntity = document.createElement('div');
            toastEntity.setAttribute('id', _ComponentRef.instance.toastNotificationBelonging.EntityUniqueID);
            toastEntity.className = 'toast-entity';
            var split = toastPosition.split('-');
            if (split[1] === 'fullwidth') {
                toastEntity.style.width = '93vw';
            }
            else if (openInElementID) {
                toastEntity.style.width = '100%';
            }
            else {
                toastEntity.style.width = '300px';
            }
            toastEntity.style.margin = 'auto';
            toastEntity.prepend(domElem);
            // targetNode.prepend(toastEntity);
            setTimeout(function () {
                targetNode.prepend(toastEntity);
            }, 200);
        };
        ToastNotificationService.prototype.removeFromBody = function (_EntityUniqueID) {
            var _this = this;
            var modalIndex = this.findDialogIndex(_EntityUniqueID);
            if (modalIndex > -1) {
                if (this.bufferToastRawList.length) {
                    this.sendToProduction(this.bufferToastRawList[0]);
                    this.bufferToastRawList.splice(0, 1);
                }
                this.toastComponentRefList[modalIndex].instance
                    .closeParent$('close-fast')
                    .pipe(operators.map(function (item) {
                    var modalIndex = _this.findDialogIndex(_EntityUniqueID);
                    if (_this.toastComponentRefList[modalIndex]) {
                        var toastEntity = document.getElementById(_this.toastComponentRefList[modalIndex].instance
                            .toastNotificationBelonging.EntityUniqueID);
                        toastEntity.remove();
                        // console.log(`%c ${this.toastComponentRefList[modalIndex].instance.toastNotificationBelonging.EntityUniqueID} `, `background: #cc3333; color: #fff`);
                        _this.appRef.detachView(_this.toastComponentRefList[modalIndex].hostView);
                        _this.toastComponentRefList[modalIndex].destroy();
                        _this.toastComponentRefList.splice(modalIndex, 1);
                    }
                }))
                    .subscribe();
            }
        };
        ToastNotificationService.prototype.findDialogIndex = function (_DialogUniqueID) {
            return this.toastComponentRefList.findIndex(function (item) {
                return (_DialogUniqueID ===
                    item.instance.toastNotificationBelonging.EntityUniqueID);
            });
        };
        ToastNotificationService.prototype.setToastOverlayNode = function () {
            var bodyNode = document.body || document.getElementsByTagName('body')[0];
            if (!bodyNode) {
                return;
            }
            // check the overlay
            var toastOverlayNode = document.getElementById('toast-overlay-container');
            if (!toastOverlayNode) {
                var toastOverlayNode_1 = document.createElement('div');
                toastOverlayNode_1.setAttribute('id', 'toast-overlay-container');
                toastOverlayNode_1.appendChild(document.createTextNode(''));
                toastOverlayNode_1.style.position = 'fixed';
                toastOverlayNode_1.style.top = '0';
                toastOverlayNode_1.style.left = '0';
                toastOverlayNode_1.style.zIndex = '999999999';
                bodyNode.appendChild(toastOverlayNode_1);
                return toastOverlayNode_1;
            }
            return toastOverlayNode;
        };
        ToastNotificationService.prototype.setToastWrapperNode = function (_Position, _ToastOverlayNode) {
            var toastWrapperNode = document.getElementById("toast-wrapper-" + _Position);
            if (!toastWrapperNode) {
                var toastWrapper = document.createElement('div');
                toastWrapper.setAttribute('id', 'toast-wrapper-' + _Position);
                toastWrapper.appendChild(document.createTextNode(''));
                _ToastOverlayNode.prepend(toastWrapper);
                var split = _Position.split('-');
                if (split[1] === 'right' || split[1] === 'left') {
                    this.gConfigService
                        .getSheet('ngx-awesome-popup-styles')
                        .addRule("#toast-wrapper-" + _Position, split[0] + ": 20px; " + split[1] + ": 20px; position: fixed; z-index: 999999;");
                }
                if (split[1] === 'center') {
                    this.gConfigService
                        .getSheet('ngx-awesome-popup-styles')
                        .addRule("#toast-wrapper-" + _Position, split[0] + ": 20px; width: 100%; position: fixed; z-index: 999999; pointer-events: none;");
                }
                if (split[1] === 'fullwidth') {
                    this.gConfigService
                        .getSheet('ngx-awesome-popup-styles')
                        .addRule("#toast-wrapper-" + _Position, split[0] + ": 10px; width: 100%; position: fixed; z-index: 999999; pointer-events: none;");
                }
            }
        };
        return ToastNotificationService;
    }());
    ToastNotificationService.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function ToastNotificationService_Factory() { return new ToastNotificationService(i0__namespace.ɵɵinject(i0__namespace.ComponentFactoryResolver), i0__namespace.ɵɵinject(i0__namespace.INJECTOR), i0__namespace.ɵɵinject(i0__namespace.ApplicationRef), i0__namespace.ɵɵinject(ToastNotificationConfigService), i0__namespace.ɵɵinject(GlobalConfigService)); }, token: ToastNotificationService, providedIn: "root" });
    ToastNotificationService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    ToastNotificationService.ctorParameters = function () { return [
        { type: i0.ComponentFactoryResolver },
        { type: i0.Injector },
        { type: i0.ApplicationRef },
        { type: ToastNotificationConfigService },
        { type: GlobalConfigService }
    ]; };

    // region *** Public ***
    var ToastNotificationInitializer = /** @class */ (function () {
        function ToastNotificationInitializer() {
            this.toastNotificationCarrier = new ToastNotificationCarrier();
        }
        ToastNotificationInitializer.prototype.openToastNotification$ = function () {
            return this.toastNotificationCarrier.openToastNotification$().pipe(operators.map(function (resp) {
                var basicToastNotificationResponse = new ToastNotificationResponse();
                var dataControl = new DataControl();
                dataControl.copyValuesFrom(resp, basicToastNotificationResponse);
                return basicToastNotificationResponse;
            }), operators.take(1));
        };
        ToastNotificationInitializer.prototype.setButtons = function (_Buttons) {
            this.toastNotificationCarrier.setButtons(_Buttons);
        };
        ToastNotificationInitializer.prototype.setConfig = function (_ToastNotificationConfig) {
            this.toastNotificationCarrier.setConfig(_ToastNotificationConfig);
        };
        ToastNotificationInitializer.prototype.setDispatch = function (_Title, _Message) {
            if (_Message === void 0) { _Message = null; }
            this.toastNotificationCarrier.setTitle(_Title);
            this.toastNotificationCarrier.setMessage(_Message);
        };
        ToastNotificationInitializer.prototype.setTitle = function (_Title) {
            this.toastNotificationCarrier.setTitle(_Title);
        };
        ToastNotificationInitializer.prototype.setMessage = function (_Message) {
            this.toastNotificationCarrier.setMessage(_Message);
        };
        ToastNotificationInitializer.prototype.setButtonLabels = function (_Confirm, _Decline) {
            this.toastNotificationCarrier.setButtonLabels(_Confirm, _Decline);
        };
        return ToastNotificationInitializer;
    }());
    var ToastNotificationResponse = /** @class */ (function (_super) {
        __extends(ToastNotificationResponse, _super);
        function ToastNotificationResponse() {
            var _this = _super.call(this) || this;
            // private Response: DialogPrepareResponse            = new DialogPrepareResponse();
            _this.Success = null;
            _this.ClickedButtonID = null;
            return _this;
        }
        ToastNotificationResponse.prototype.setSuccess = function (_IsSuccess) {
            this.Success = _IsSuccess;
        };
        ToastNotificationResponse.prototype.setClickedButtonID = function (_ClickedButtonID) {
            this.ClickedButtonID = _ClickedButtonID;
        };
        return ToastNotificationResponse;
    }(DataControl));
    var ToastNotificationEventsController = /** @class */ (function () {
        function ToastNotificationEventsController(EntityUniqueID) {
            this.EntityUniqueID = EntityUniqueID;
            this._afterClosed = new rxjs.Subject();
            this.afterClosed$ = this._afterClosed.asObservable();
            this._onButtonClick = new rxjs.Subject();
            this.onButtonClick$ = this._onButtonClick.asObservable();
            this._buttonList = new rxjs.Subject();
            this.buttonList$ = this._buttonList.asObservable();
        }
        ToastNotificationEventsController.prototype.close = function (_Response) {
            var response = _Response ? _Response : this.defaultResponse;
            this._afterClosed.next(response);
        };
        ToastNotificationEventsController.prototype.onButtonClick = function (_Button) {
            this.defaultResponse.setClickedButtonID(_Button.ID);
            this._onButtonClick.next(_Button);
        };
        ToastNotificationEventsController.prototype.setButtonList = function (_ButtonList) {
            this._buttonList.next(_ButtonList);
        };
        ToastNotificationEventsController.prototype.setDefaultResponse = function (_Response) {
            this.defaultResponse = _Response;
        };
        return ToastNotificationEventsController;
    }());
    // endregion
    var ToastNotificationDefaultResponse = /** @class */ (function (_super) {
        __extends(ToastNotificationDefaultResponse, _super);
        function ToastNotificationDefaultResponse() {
            var _this = _super.call(this) || this;
            _this.toastNotificationBelonging = null;
            return _this;
        }
        ToastNotificationDefaultResponse.prototype.setBelonging = function (_ToastNotificationBelonging) {
            this.toastNotificationBelonging = _ToastNotificationBelonging;
        };
        return ToastNotificationDefaultResponse;
    }(ToastNotificationResponse));
    var ToastNotificationCarrier = /** @class */ (function () {
        function ToastNotificationCarrier() {
            this.toastNotificationBelonging = new ToastNotificationBelonging();
        }
        ToastNotificationCarrier.prototype.setButtons = function (_Buttons) {
            if (_Buttons.length) {
                this.toastNotificationBelonging.Buttons = _Buttons;
            }
        };
        ToastNotificationCarrier.prototype.setTitle = function (_Title) {
            this.toastNotificationBelonging.Dispatch.Title = _Title;
        };
        ToastNotificationCarrier.prototype.setMessage = function (_Message) {
            this.toastNotificationBelonging.Dispatch.Message = _Message;
        };
        ToastNotificationCarrier.prototype.setButtonLabels = function (_Confirm, _Decline) {
            this.toastNotificationBelonging.ToastCoreConfig.ConfirmLabel = _Confirm;
            this.toastNotificationBelonging.ToastCoreConfig.DeclineLabel = _Decline;
        };
        ToastNotificationCarrier.prototype.setConfig = function (_ToastNotificationBelonging) {
            // region *** local UserConfig (defined on place where dialog is called) ***
            var dataControl = new DataControl();
            dataControl.copyValuesFrom(_ToastNotificationBelonging, this.toastNotificationBelonging.ToastCoreConfig);
            // endregion
        };
        ToastNotificationCarrier.prototype.openToastNotification$ = function () {
            if (!this.toastNotificationBelonging.Dispatch.Title &&
                !this.toastNotificationBelonging.Dispatch.Message) {
                throw Error('Toast notification can not be without both message and title.');
            }
            var service = ServiceLocator.injector.get(ToastNotificationService);
            return service.openToast$(this.toastNotificationBelonging);
        };
        return ToastNotificationCarrier;
    }());
    var GlobalToastSettings = /** @class */ (function () {
        function GlobalToastSettings() {
            this.AllowedNotificationsAtOnce = null;
        }
        return GlobalToastSettings;
    }());
    var ResetToastGlobalSettings = /** @class */ (function () {
        function ResetToastGlobalSettings(globalToastConfig) {
            var globalToastConfigService = ServiceLocator.injector.get(ToastNotificationConfigService);
            if (globalToastConfigService) {
                globalToastConfigService.setResetGlobalToastConfig(globalToastConfig);
            }
            else {
                globalToastConfigService.setResetGlobalToastConfig();
            }
        }
        return ResetToastGlobalSettings;
    }());
    var ToastSettings = /** @class */ (function () {
        function ToastSettings() {
            this.Buttons = [];
            this.ToastCoreConfig = new ToastCoreConfig();
            this.Dispatch = new Dispatch();
            this.GlobalSettings = new GlobalToastSettings();
        }
        return ToastSettings;
    }());
    var ToastCoreConfig = /** @class */ (function () {
        function ToastCoreConfig() {
            this.ToastPosition = null;
            this.ProgressBar = null;
            this.ToastUserViewType = null;
            this.OpenInElementID = null;
            this.ButtonPosition = null;
            this.TextPosition = null;
            this.LayoutType = null;
            this.Dispatch = null;
            this.ConfirmLabel = null;
            this.DeclineLabel = null;
            this.AutoCloseDelay = null;
            this.DisableIcon = null;
            this.AllowHTMLMessage = null;
        }
        return ToastCoreConfig;
    }());
    var ToastNotificationBelonging = /** @class */ (function (_super) {
        __extends(ToastNotificationBelonging, _super);
        function ToastNotificationBelonging() {
            var _this = _super.call(this) || this;
            _this.EntityUniqueID = 'T' + Math.random().toString(36).substr(2, 9);
            _this.EventsController = new ToastNotificationEventsController(_this.EntityUniqueID);
            var toastNotificationConfigurator = ServiceLocator.injector.get(ToastNotificationConfigService);
            var baseSettings = new ToastSettings();
            var dataControl = new DataControl();
            dataControl.copyValuesFrom(toastNotificationConfigurator.productionConfig.ToastCoreConfig, baseSettings.ToastCoreConfig);
            _this.ToastCoreConfig = baseSettings.ToastCoreConfig;
            _this.Buttons = toastNotificationConfigurator.productionConfig.Buttons.slice();
            return _this;
        }
        return ToastNotificationBelonging;
    }(ToastSettings));

    var NgxAwesomePopupModule = /** @class */ (function () {
        function NgxAwesomePopupModule(injector) {
            this.injector = injector;
            ServiceLocator.injector = injector;
        }
        NgxAwesomePopupModule.forRoot = function (globalConfig) {
            return {
                ngModule: NgxAwesomePopupModule,
                providers: [{ provide: 'cdGlobalConfig', useValue: globalConfig }]
            };
        };
        return NgxAwesomePopupModule;
    }());
    NgxAwesomePopupModule.decorators = [
        { type: i0.NgModule, args: [{
                    imports: [common.CommonModule, platformBrowser.BrowserModule, animations$1.BrowserAnimationsModule],
                    providers: [GlobalConfigService]
                },] }
    ];
    NgxAwesomePopupModule.ctorParameters = function () { return [
        { type: i0.Injector }
    ]; };
    var DialogConfigModule = /** @class */ (function () {
        function DialogConfigModule() {
        }
        DialogConfigModule.forRoot = function (dialogConfig) {
            return {
                ngModule: DialogConfigModule,
                providers: [
                    { provide: 'dialogConfig', useValue: dialogConfig },
                    { provide: 'dialogBelonging', useClass: DialogBelonging }
                ]
            };
        };
        return DialogConfigModule;
    }());
    DialogConfigModule.decorators = [
        { type: i0.NgModule, args: [{
                    declarations: [
                        DialogWrapperComponent,
                        DefaultLoaderComponent,
                        InsertionDirective,
                        InsertionLoaderDirective
                    ],
                    imports: [common.CommonModule],
                    providers: [DialogService, DialogConfigService],
                    entryComponents: [DialogWrapperComponent, DefaultLoaderComponent]
                },] }
    ];
    var ConfirmBoxConfigModule = /** @class */ (function () {
        function ConfirmBoxConfigModule() {
        }
        ConfirmBoxConfigModule.forRoot = function (confirmBoxConfig) {
            return {
                ngModule: ConfirmBoxConfigModule,
                providers: [
                    { provide: 'confirmBoxConfig', useValue: confirmBoxConfig },
                    { provide: 'confirmBoxBelonging', useClass: ConfirmBoxBelonging }
                ]
            };
        };
        return ConfirmBoxConfigModule;
    }());
    ConfirmBoxConfigModule.decorators = [
        { type: i0.NgModule, args: [{
                    declarations: [ConfirmBoxWrapperComponent],
                    imports: [common.CommonModule],
                    providers: [ConfirmBoxService, ConfirmBoxConfigService],
                    entryComponents: [ConfirmBoxWrapperComponent]
                },] }
    ];
    var ToastNotificationConfigModule = /** @class */ (function () {
        function ToastNotificationConfigModule() {
        }
        ToastNotificationConfigModule.forRoot = function (toastNotificationConfig) {
            return {
                ngModule: ToastNotificationConfigModule,
                providers: [
                    {
                        provide: 'toastNotificationConfig',
                        useValue: toastNotificationConfig
                    },
                    {
                        provide: 'toastNotificationBelonging',
                        useClass: ToastNotificationBelonging
                    }
                ]
            };
        };
        return ToastNotificationConfigModule;
    }());
    ToastNotificationConfigModule.decorators = [
        { type: i0.NgModule, args: [{
                    declarations: [
                        ToastNotificationWrapperComponent,
                        ToastNotificationSimpleWrapperComponent
                    ],
                    imports: [common.CommonModule],
                    providers: [ToastNotificationService, ToastNotificationConfigService],
                    entryComponents: [
                        ToastNotificationWrapperComponent,
                        ToastNotificationSimpleWrapperComponent
                    ]
                },] }
    ];

    // endregion

    /**
     * Generated bundle index. Do not edit.
     */

    exports.ButtonMaker = ButtonMaker;
    exports.ConfirmBoxConfigModule = ConfirmBoxConfigModule;
    exports.ConfirmBoxInitializer = ConfirmBoxInitializer;
    exports.DialogBelonging = DialogBelonging;
    exports.DialogConfigModule = DialogConfigModule;
    exports.DialogInitializer = DialogInitializer;
    exports.NgxAwesomePopupModule = NgxAwesomePopupModule;
    exports.ResetGlobalConfig = ResetGlobalConfig;
    exports.ResetToastGlobalSettings = ResetToastGlobalSettings;
    exports.ToastNotificationConfigModule = ToastNotificationConfigModule;
    exports.ToastNotificationInitializer = ToastNotificationInitializer;
    exports["ɵa"] = ToastSettings;
    exports["ɵb"] = ToastNotificationBelonging;
    exports["ɵc"] = DialogSettings;
    exports["ɵd"] = ConfirmBoxSettings;
    exports["ɵe"] = ConfirmBoxBelonging;
    exports["ɵf"] = GlobalConfigService;
    exports["ɵg"] = DialogWrapperComponent;
    exports["ɵh"] = fadeInOut;
    exports["ɵi"] = InsertionDirective;
    exports["ɵj"] = InsertionLoaderDirective;
    exports["ɵk"] = DefaultLoaderComponent;
    exports["ɵl"] = DialogService;
    exports["ɵm"] = DialogConfigService;
    exports["ɵn"] = ConfirmBoxWrapperComponent;
    exports["ɵo"] = ConfirmBoxService;
    exports["ɵp"] = ConfirmBoxConfigService;
    exports["ɵq"] = ToastNotificationWrapperComponent;
    exports["ɵr"] = WrapperAbstraction;
    exports["ɵs"] = ToastNotificationSimpleWrapperComponent;
    exports["ɵt"] = ToastNotificationService;
    exports["ɵu"] = ToastNotificationConfigService;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=costlydeveloper-ngx-awesome-popup.umd.js.map
