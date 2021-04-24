(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs'), require('rxjs/operators'), require('@angular/core'), require('@angular/animations'), require('@angular/common'), require('@angular/platform-browser/animations'), require('@angular/platform-browser')) :
    typeof define === 'function' && define.amd ? define('@costlydeveloper/ngx-awesome-popup', ['exports', 'rxjs', 'rxjs/operators', '@angular/core', '@angular/animations', '@angular/common', '@angular/platform-browser/animations', '@angular/platform-browser'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.costlydeveloper = global.costlydeveloper || {}, global.costlydeveloper['ngx-awesome-popup'] = {}), global.rxjs, global.rxjs.operators, global.ng.core, global.ng.animations, global.ng.common, global.ng.platformBrowser.animations, global.ng.platformBrowser));
}(this, (function (exports, rxjs, operators, i0, animations, common, animations$1, platformBrowser) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () {
                            return e[k];
                        }
                    });
                }
            });
        }
        n['default'] = e;
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

    var GlobalClass;
    (function (GlobalClass) {
        var Dispatch            = /** @class */ (function () {
            function Dispatch() {
                this.Title   = null;
                this.Message = null;
            }

            return Dispatch;
        }());
        GlobalClass.Dispatch    = Dispatch;
        var ButtonMaker         = /** @class */ (function () {
            function ButtonMaker(Label, ID, LayoutType) {
                if (LayoutType === void 0) { LayoutType = exports.ButtonLayoutDisplay.PRIMARY; }
                this.Label      = Label;
                this.ID = ID;
                this.LayoutType = LayoutType;
            }
            return ButtonMaker;
        }());
        GlobalClass.ButtonMaker = ButtonMaker;
        var GlobalUserConfig = /** @class */ (function () {
            function GlobalUserConfig(_GlobalUserConfig) {
                this.ColorList = new GlobalClass.ColorTypes();
                if (_GlobalUserConfig) {
                    var dataControl = new GlobalClass.DataControl();
                    dataControl.copyValuesFrom(_GlobalUserConfig, this);
                    var colorList = new GlobalClass.ColorTypes();
                    this.ColorList = dataControl.copyValuesFrom(this.ColorList, colorList);
                }
            }
            return GlobalUserConfig;
        }());
        GlobalClass.GlobalUserConfig = GlobalUserConfig;
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
        GlobalClass.ColorTypes = ColorTypes;
        var GlobalConfig = /** @class */ (function () {
            function GlobalConfig() {
                this.DisplayColor = new GlobalClass.DisplayColor();
            }
            return GlobalConfig;
        }());
        GlobalClass.GlobalConfig = GlobalConfig;
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
        GlobalClass.DisplayColor = DisplayColor;
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
                this.IsBaseBright = null;
                if (this.Base = this.isColor(_Color)) {
                    this.Brighten = this.brightness(this.Base, 'brighten', 20);
                    this.BrightenForShade = this.brightness(this.Base, 'brighten', 10);
                    this.Darken = this.brightness(this.Base, 'darken', 20);
                    this.DarkenForShade = this.brightness(this.Base, 'darken', 10);
                    var luminance = Math.floor(this.luminance(this.Base) * 100);
                    var darken = luminance > 50 ? 5 : (luminance > 40 ? 10 : (luminance > 20 ? 15 : luminance));
                    var brighten = luminance > 55 ? 65 : (luminance > 45 ? 60 : (luminance > 20 ? 55 : (luminance > 10 ? 45 : 80)));
                    this.BrightShade = this.brightness(this.brightness(this.Base, 'darken', darken), 'brighten', brighten);
                    this.TransparentDarkenVariance = this.brightness(this.transparentize(this.Base, 80), 'darken', 40);
                    if (this.isBright(this.Base)) {
                        this.ContrastColor = 'rgba(58,65,71,0.5)';
                        this.IsBaseBright  = true;
                    }
                    else {
                        this.ContrastColor = 'rgb(255,255,255, 0.7)';
                        this.IsBaseBright  = false;
                    }
                    /*         console.log('%c Color ', `background: ${this.BrightShade}; color: ${this.ContrastColor}`, luminance, darken, brighten);
                               console.log('%c Brighten ', `background: ${this.Brighten}; color: ${this.ContrastColor}`, this.Brighten);
                               console.log('%c BrightenForShade ', `background: ${this.BrightenForShade}; color: ${this.ContrastColor}`, this.BrightenForShade);
                               console.log('%c Darken ', `background: ${this.Darken}; color: ${this.ContrastColor}`, this.Darken);
                               console.log('%c DarkenForShade ', `background: ${this.DarkenForShade}; color: ${this.ContrastColor}`, this.DarkenForShade);*/
                }
            }
            ColorProvider.prototype.isBright = function (_Rgb) {
                return this.contrast(this.luminance(_Rgb));
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
                var amount = _Percentage / 100 * 255;
                var returnList = [];
                if (_Action === 'brighten') {
                    returnList[lowest.index] = Math.round(lowest.val + (Math.min(255 - lowest.val, amount)));
                    var increaseFraction = (returnList[lowest.index] - lowest.val) / (255 - lowest.val);
                    returnList[middle.index] = middle.val + (255 - middle.val) * increaseFraction;
                    returnList[highest.index] = highest.val + (255 - highest.val) * increaseFraction;
                }
                if (_Action === 'darken') {
                    returnList[highest.index] = highest.val - (Math.min(highest.val, amount));
                    var decreaseFraction = (highest.val - returnList[highest.index]) / (highest.val);
                    returnList[middle.index] = middle.val - middle.val * decreaseFraction;
                    returnList[lowest.index] = lowest.val - lowest.val * decreaseFraction;
                }
                returnList = returnList.map(function (item) { return Math.round(item); });
                if (rgbIntArray.length > 3) {
                    returnList.push(rgbIntArray[3]);
                    return ("rgba(" + returnList.join() + ")");
                }
                return ("rgb(" + returnList.join() + ")");
            };
            ColorProvider.prototype.getLowMidHi = function (_RgbArray) {
                var rgbArrayCopy = _RgbArray.slice();
                var rgbArrayWithoutAlpha = _RgbArray.length > 3 ? rgbArrayCopy.reverse().slice(1).reverse() : _RgbArray;
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
                var middleIndex = (3 - highest.index - lowest.index);
                var middle = { val: rgbArrayWithoutAlpha[middleIndex], index: middleIndex };
                return [lowest, middle, highest];
            };
            ColorProvider.prototype.contrast = function (_Luminance) {
                var brightest = Math.max(1.05, _Luminance + 0.05);
                var darkest = Math.min(1.05, _Luminance + 0.05);
                var contrast = (brightest) / (darkest);
                return contrast < 2.7;
            };
            ColorProvider.prototype.isColor = function (_StrColor) {
                var CSSDeclaration = new Option().style;
                CSSDeclaration.color = _StrColor;
                return !!CSSDeclaration.color ? CSSDeclaration.color : null;
            };
            ColorProvider.prototype.getRGBArray = function (_Rgb) {
                return _Rgb.replace(/^(rgb|rgba)\(/, '').replace(/\)$/, '').replace(/\s/g, '').split(',').map(function (x) { return +x; });
            };
            ColorProvider.prototype.luminance = function (_Rgb) {
                var rgbIntArray = this.getRGBArray(_Rgb);
                var W3algorithm = rgbIntArray.map(function (item) {
                    item /= 255;
                    return item <= 0.03928
                        ? item / 12.92
                        : Math.pow((item + 0.055) / 1.055, 2.4);
                });
                return W3algorithm[0] * 0.2126 + W3algorithm[1] * 0.7152 + W3algorithm[2] * 0.0722;
            };
            ColorProvider.prototype.transparentize = function (_Rgb, _Percentage) {
                var baseArray = this.Base.replace(/^(rgb|rgba)\(/, '').replace(/\)$/, '').replace(/\s/g, '').split(',').map(function (x) { return +x; });
                if (baseArray.length > 3) {
                    baseArray.pop();
                }
                var amount = (100 - _Percentage) / 100;
                baseArray.push(amount);
                return ("rgb(" + baseArray.join() + ")");
            };
            return ColorProvider;
        }());
        GlobalClass.ColorProvider = ColorProvider;
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
        GlobalClass.DataControl = DataControl;
    })(GlobalClass || (GlobalClass = {}));

    // @dynamic
    var ServiceLocator = /** @class */ (function () {
        function ServiceLocator() {
        }
        return ServiceLocator;
    }());

    var ConfirmBoxConfigService = /** @class */ (function () {
        function ConfirmBoxConfigService(userConfig) {
            if (userConfig === void 0) { userConfig = {}; }
            this.userConfig       = userConfig;
            this.authorConfig     = new exports.ɵh.Settings();
            this.productionConfig = new exports.ɵh.Settings();
            // region *** confirmBox userConfig (user input app-module) ***
            var userConfigBase    = new exports.ɵh.Settings();
            var dataControl       = new GlobalClass.DataControl();
            dataControl.copyValuesFrom(userConfig.ConfirmBoxCoreConfig, userConfigBase.ConfirmBoxCoreConfig); // this will make sure that object has right properties
            userConfig.ConfirmBoxCoreConfig = userConfigBase.ConfirmBoxCoreConfig;
            // endregion
            // region *** author default config values (if there is no user input) ***
            this.authorConfig.ConfirmBoxCoreConfig.Width            = 'auto';
            this.authorConfig.ConfirmBoxCoreConfig.Height           = 'auto';
            this.authorConfig.ConfirmBoxCoreConfig.ButtonPosition   = 'center';
            this.authorConfig.ConfirmBoxCoreConfig.ConfirmLabel     = 'Confirm';
            this.authorConfig.ConfirmBoxCoreConfig.DeclineLabel     = 'Decline';
            this.authorConfig.ConfirmBoxCoreConfig.DisableIcon      = false;
            this.authorConfig.ConfirmBoxCoreConfig.AllowHTMLMessage = false;
            this.authorConfig.ConfirmBoxCoreConfig.LayoutType       = exports.DialogLayoutDisplay.NONE;
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

    function fadeInOut(_OpacityMin, _OpacityMax) {
        if (_OpacityMin === void 0) { _OpacityMin = 0; }
        if (_OpacityMax === void 0) { _OpacityMax = 1; }
        return animations.trigger('fadeInOut', [
            // ...
            animations.state('open', animations.style({
                opacity: _OpacityMax
            })),
            animations.state('closed', animations.style({
                opacity: _OpacityMin
            })),
            animations.transition('* => close-fast', [
                animations.animate('0.1s')
            ]),
            animations.transition('* => open', [
                animations.animate('0.2s')
            ]),
            animations.transition('* => close-slow', [
                animations.animate('1.3s')
            ]),
            animations.transition('* => close-instant', [
                animations.animate('0s')
            ])
        ]);
    }
    ;

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
            var response = new exports.ɵh.ConfirmBoxDefaultResponse();
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
            this.setResponse(_Type === 'confirm');
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
                template: "<div class=\"ngx-awesome-popup-overlay\" (dblclick)=\"onOverlayClicked($event)\" [@fadeInOut]=\"fadeInOutAnimation\">\n\t\n\t<div class=\"evolve-confirm-box\"\n\t\t\t[ngClass]=\"{\n\t\t\t\t  'standard-dialog': confirmBoxBelonging.ConfirmBoxCoreConfig.LayoutType === 0,\n\t\t\t\t  'success-dialog': confirmBoxBelonging.ConfirmBoxCoreConfig.LayoutType === 1,\n\t\t\t\t  'info-dialog': confirmBoxBelonging.ConfirmBoxCoreConfig.LayoutType === 2,\n\t\t\t\t  'warning-dialog': confirmBoxBelonging.ConfirmBoxCoreConfig.LayoutType === 3,\n\t\t\t\t  'danger-dialog': confirmBoxBelonging.ConfirmBoxCoreConfig.LayoutType === 4\n\t\t\t\t}\" [ngStyle]=\"{'width': confirmBoxBelonging.ConfirmBoxCoreConfig.Width, 'height': confirmBoxBelonging.ConfirmBoxCoreConfig.Height}\">\n\t\t\n\t\t\t\n\t\t\t<div class=\"confirm-box-title-content\" *ngIf=\"confirmBoxBelonging.Dispatch.Title\">\n\t\t\t\t\n\t\t\t\t<div class=\"dont-break-out\">\n\t\t\t\t\t<div class=\"text-wrapper dont-break-out\">\n\t\t\t\t\t\t<div class=\"confirm-box-title-text\">{{confirmBoxBelonging.Dispatch.Title}}</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\n\t\t\t</div>\n\t\n\t\t\n\t\t<div class=\"content-holder\" *ngIf=\"confirmBoxBelonging.Dispatch.Message\">\n\t\t\t<div class=\"icon-section\" *ngIf=\"!confirmBoxBelonging.ConfirmBoxCoreConfig.DisableIcon\">\n\t\t\t\t\t<span\n\t\t\t\t\t\t\tclass=\"icon-type-confirm-box\" [ngClass]=\"{\n\t\t\t\t          '': confirmBoxBelonging.ConfirmBoxCoreConfig.LayoutType === 0,\n\t\t\t\t          'ap-icon-success icon-check-circle': confirmBoxBelonging.ConfirmBoxCoreConfig.LayoutType === 1,\n\t\t\t\t          'ap-icon-info icon-info-circle': confirmBoxBelonging.ConfirmBoxCoreConfig.LayoutType === 2,\n\t\t\t\t          'ap-icon-warning icon-warning': confirmBoxBelonging.ConfirmBoxCoreConfig.LayoutType === 3,\n\t\t\t\t          'ap-icon-danger icon-times-circle': confirmBoxBelonging.ConfirmBoxCoreConfig.LayoutType === 4\n\t\t\t\t        }\"\n\t\t\t\t\t></span>\n\t\t\t</div>\n\t\t\t<div class=\"text-wrapper-section confirm-box-inner-content\" [ngStyle]=\"{'width': confirmBoxBelonging.ConfirmBoxCoreConfig.Width, 'height': confirmBoxBelonging.ConfirmBoxCoreConfig.Height}\">\n\t\t\t\t\n\t\t\t\t<!--<div class=\"dont-break-out\" [ngClass]=\"{'text-wrapper-section-with-icon': showIcon, 'text-wrapper-section': !showIcon}\">-->\n\t\t\t\t<div class=\"dont-break-out\">\n\t\t\t\t\t<div *ngIf=\"!confirmBoxBelonging.ConfirmBoxCoreConfig.AllowHTMLMessage\" class=\"text-wrapper dont-break-out\">{{confirmBoxBelonging.Dispatch.Message}}</div>\n\t\t\t\t\t<div *ngIf=\"confirmBoxBelonging.ConfirmBoxCoreConfig.AllowHTMLMessage\" class=\"text-wrapper\" [innerHTML]=\"confirmBoxBelonging.Dispatch.Message\"></div>\n\t\t\t\t</div>\n\t\t\t\n\t\t\t</div>\n\t\t\t\n\t\t\n\t</div>\n\t\t<div class=\"button-holder\">\n\t\t\t<div class=\"button-section\" *ngIf=\"confirmBoxBelonging.Buttons.length\" [ngStyle]=\"{ 'text-align': confirmBoxBelonging.ConfirmBoxCoreConfig.ButtonPosition }\">\n\t\t\t\t\n\t\t\t\t<button\n\t\t\t\t\t\tclass=\"ed-btn ed-btn-md\" *ngFor=\"let button of confirmBoxBelonging.Buttons\" (click)=\"onCustomButton(button)\"\n\t\t\t\t\t\t[ngClass]=\"{\n\t\t\t                   '': (button.LayoutType ? (button.LayoutType === 0)  : false),\n                              'ed-btn-success': (button.LayoutType ? (button.LayoutType === 1) : false),\n                              'ed-btn-info': (button.LayoutType ? (button.LayoutType === 2) : false),\n                              'ed-btn-warning': (button.LayoutType ? (button.LayoutType === 3)  : false),\n                              'ed-btn-danger': (button.LayoutType ? (button.LayoutType === 4)  : false),\n                              'ed-btn-dark': (button.LayoutType ? (button.LayoutType === 5)  : false),\n                              'ed-btn-light': (button.LayoutType ? (button.LayoutType === 6)  : false),\n                               'ed-btn-primary': (button.LayoutType ? (button.LayoutType === 7) : false),\n                              'ed-btn-secondary': (button.LayoutType ? (button.LayoutType === 8)  : false),\n                              'ed-btn-link': (button.LayoutType ? (button.LayoutType === 9)  : false)\n                            }\"\n\t\t\t\t>{{button.Label}}</button>\n\t\t\t\n\t\t\t</div>\n\t\t\t<div class=\"button-section\" *ngIf=\"!confirmBoxBelonging.Buttons.length\" [ngStyle]=\"{ 'text-align': confirmBoxBelonging.ConfirmBoxCoreConfig.ButtonPosition }\">\n\t\t\t\t\n\t\t\t\t<button class=\"ed-btn ed-btn-md\" (click)=\"onButtonClick('confirm')\"\n\t\t\t\t        [ngClass]=\"{\n\t\t\t\t          'ed-btn-primary': confirmBoxBelonging.ConfirmBoxCoreConfig.LayoutType === 0,\n\t\t\t\t          'ed-btn-success': confirmBoxBelonging.ConfirmBoxCoreConfig.LayoutType === 1,\n\t\t\t\t          'ed-btn-info': confirmBoxBelonging.ConfirmBoxCoreConfig.LayoutType === 2,\n\t\t\t\t          'ed-btn-warning': confirmBoxBelonging.ConfirmBoxCoreConfig.LayoutType === 3,\n\t\t\t\t          'ed-btn-danger': confirmBoxBelonging.ConfirmBoxCoreConfig.LayoutType === 4\n\t\t\t\t        }\"\n\t\t\t\t>{{confirmBoxBelonging.ConfirmBoxCoreConfig.ConfirmLabel}}\n\t\t\t\t</button>\n\t\t\t\t<button (click)=\"onButtonClick('decline')\" *ngIf=\"confirmBoxBelonging.ConfirmBoxCoreConfig.DeclineLabel\" class=\"ed-btn ed-btn-md ed-btn-secondary\">\n\t\t\t\t\t{{confirmBoxBelonging.ConfirmBoxCoreConfig.DeclineLabel}}\n\t\t\t\t</button>\n\t\t\t\n\t\t\t</div>\n\t\t</div>\n\t\n\t</div>\n",
                animations: [fadeInOut(0, 1)],
                styles: ["@charset \"UTF-8\";.ed-btn-sm{font-size:12px;font-weight:400;margin-right:3px;min-width:40px;padding:2px 8px}.ed-btn-md{font-size:14px;margin-right:5px;min-width:60px;padding:3px 10px}.ed-btn-lg{font-size:16px;margin-right:5px;min-width:70px;padding:4px 10px}.ed-btn{background-color:initial;border:none;border-radius:3px;cursor:pointer;display:inline-block;line-height:1.5;text-align:center;text-decoration:none;-webkit-user-select:none;user-select:none;vertical-align:middle}.ed-btn:hover{color:#989ea5}.ed-btn-check:focus+.ed-btn,.ed-btn:focus{box-shadow:0 0 1px 2px;outline:0}.ed-btn-check:active+.ed-btn,.ed-btn-check:active+.ed-btn:focus,.ed-btn-check:checked+.ed-btn,.ed-btn-check:checked+.ed-btn:focus,.ed-btn.active,.ed-btn.active:focus,.ed-btn:active,.ed-btn:active:focus{box-shadow:0 0 1px 2px}.ed-btn.disabled,.ed-btn:disabled,fieldset:disabled .ed-btn{box-shadow:none;opacity:.6;pointer-events:none}.ed-btn-primary{color:hsla(0,0%,98.4%,.8);background:#ff9e00;border-color:#ff9e00}.ed-btn-primary:hover{color:#fbfbfb;border-color:#ffa81a;background:#ffb133}.ed-btn-check:focus+.ed-btn-primary,.ed-btn-primary:focus{outline:0;box-shadow:0 0 1px 2px #ffa81a}.ed-btn-check:active+.ed-btn-primary,.ed-btn-check:active+.ed-btn-primary:focus,.ed-btn-check:checked+.ed-btn-primary,.ed-btn-check:checked+.ed-btn-primary:focus,.ed-btn-primary.active,.ed-btn-primary.active:focus,.ed-btn-primary:active,.ed-btn-primary:active:focus{box-shadow:0 0 1px 2px #ffa81a}.ed-btn-secondary{color:hsla(0,0%,98.4%,.8);background:#989ea5;border-color:#989ea5}.ed-btn-secondary:hover{color:#fbfbfb;border-color:#a6abb1;background:#b3b8bd}.ed-btn-check:focus+.ed-btn-secondary,.ed-btn-secondary:focus{outline:0;box-shadow:0 0 1px 2px #a6abb1}.ed-btn-check:active+.ed-btn-secondary,.ed-btn-check:active+.ed-btn-secondary:focus,.ed-btn-check:checked+.ed-btn-secondary,.ed-btn-check:checked+.ed-btn-secondary:focus,.ed-btn-secondary.active,.ed-btn-secondary.active:focus,.ed-btn-secondary:active,.ed-btn-secondary:active:focus{box-shadow:0 0 1px 2px #a6abb1}.ed-btn-success{color:hsla(0,0%,98.4%,.8);background:#3caea3;border-color:#3caea3}.ed-btn-success:hover{color:#fbfbfb;border-color:#45bfb3;background:#58c5bb}.ed-btn-check:focus+.ed-btn-success,.ed-btn-success:focus{outline:0;box-shadow:0 0 1px 2px #45bfb3}.ed-btn-check:active+.ed-btn-success,.ed-btn-check:active+.ed-btn-success:focus,.ed-btn-check:checked+.ed-btn-success,.ed-btn-check:checked+.ed-btn-success:focus,.ed-btn-success.active,.ed-btn-success.active:focus,.ed-btn-success:active,.ed-btn-success:active:focus{box-shadow:0 0 1px 2px #45bfb3}.ed-btn-info{color:hsla(0,0%,98.4%,.8);background:#2f8ee5;border-color:#2f8ee5}.ed-btn-info:hover{color:#fbfbfb;border-color:#469ae8;background:#5ca7eb}.ed-btn-check:focus+.ed-btn-info,.ed-btn-info:focus{outline:0;box-shadow:0 0 1px 2px #469ae8}.ed-btn-check:active+.ed-btn-info,.ed-btn-check:active+.ed-btn-info:focus,.ed-btn-check:checked+.ed-btn-info,.ed-btn-check:checked+.ed-btn-info:focus,.ed-btn-info.active,.ed-btn-info.active:focus,.ed-btn-info:active,.ed-btn-info:active:focus{box-shadow:0 0 1px 2px #469ae8}.ed-btn-warning{color:hsla(0,0%,98.4%,.8);background:#ffc107;border-color:#ffc107}.ed-btn-warning:hover{color:#fbfbfb;border-color:#ffc721;background:#ffce3a}.ed-btn-check:focus+.ed-btn-warning,.ed-btn-warning:focus{outline:0;box-shadow:0 0 1px 2px #ffc721}.ed-btn-check:active+.ed-btn-warning,.ed-btn-check:active+.ed-btn-warning:focus,.ed-btn-check:checked+.ed-btn-warning,.ed-btn-check:checked+.ed-btn-warning:focus,.ed-btn-warning.active,.ed-btn-warning.active:focus,.ed-btn-warning:active,.ed-btn-warning:active:focus{box-shadow:0 0 1px 2px #ffc721}.ed-btn-danger{color:hsla(0,0%,98.4%,.8);background:#e46464;border-color:#e46464}.ed-btn-danger:hover{color:#fbfbfb;border-color:#e87a7a;background:#ec8f8f}.ed-btn-check:focus+.ed-btn-danger,.ed-btn-danger:focus{outline:0;box-shadow:0 0 1px 2px #e87a7a}.ed-btn-check:active+.ed-btn-danger,.ed-btn-check:active+.ed-btn-danger:focus,.ed-btn-check:checked+.ed-btn-danger,.ed-btn-check:checked+.ed-btn-danger:focus,.ed-btn-danger.active,.ed-btn-danger.active:focus,.ed-btn-danger:active,.ed-btn-danger:active:focus{box-shadow:0 0 1px 2px #e87a7a}.ed-btn-light{color:rgba(52,58,64,.8);background:#fbfbfb;border-color:#fbfbfb}.ed-btn-light:hover{color:#343a40;border-color:#fff;background:#fff}.ed-btn-check:focus+.ed-btn-light,.ed-btn-light:focus{outline:0;box-shadow:0 0 1px 2px #fff}.ed-btn-check:active+.ed-btn-light,.ed-btn-check:active+.ed-btn-light:focus,.ed-btn-check:checked+.ed-btn-light,.ed-btn-check:checked+.ed-btn-light:focus,.ed-btn-light.active,.ed-btn-light.active:focus,.ed-btn-light:active,.ed-btn-light:active:focus{box-shadow:0 0 1px 2px #fff}.ed-btn-dark{color:hsla(0,0%,98.4%,.8);background:#343a40;border-color:#343a40}.ed-btn-dark:hover{color:#fbfbfb;border-color:#3f474e;background:#4b545c}.ed-btn-check:focus+.ed-btn-dark,.ed-btn-dark:focus{outline:0;box-shadow:0 0 1px 2px #3f474e}.ed-btn-check:active+.ed-btn-dark,.ed-btn-check:active+.ed-btn-dark:focus,.ed-btn-check:checked+.ed-btn-dark,.ed-btn-check:checked+.ed-btn-dark:focus,.ed-btn-dark.active,.ed-btn-dark.active:focus,.ed-btn-dark:active,.ed-btn-dark:active:focus{box-shadow:0 0 1px 2px #3f474e}@font-face{font-family:icomoon;src:url(../assets/fonts/icomoon.eot?vap0ng);src:url(../assets/fonts/icomoon.eot?vap0ng#iefix) format(\"embedded-opentype\"),url(../assets/fonts/icomoon.ttf?vap0ng) format(\"truetype\"),url(../assets/fonts/icomoon.woff?vap0ng) format(\"woff\"),url(../assets/fonts/icomoon.svg?vap0ng#icomoon) format(\"svg\");font-weight:400;font-style:normal;font-display:block}[class*=\" icon-\"],[class^=icon-]{font-family:icomoon!important;speak:never;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;line-height:1;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.icon-times-circle:before{content:\"\uE900\"}.icon-exclamation-triangle:before,.icon-warning:before{content:\"\uE901\"}.icon-check-circle:before{content:\"\uE902\"}.icon-info-circle:before{content:\"\uE903\"}.ngx-awesome-popup-overlay{align-items:center;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px);background:rgba(51,32,0,.4);bottom:0;display:flex;flex-direction:column;justify-content:center;left:0;opacity:0;position:fixed;right:0;top:0;z-index:1000}.evolve-confirm-box .text-wrapper-section,.evolve-parent-dialog .text-wrapper-section,.evolve-toast .text-wrapper-section{width:100%}.evolve-confirm-box .text-wrapper-section .text-wrapper,.evolve-parent-dialog .text-wrapper-section .text-wrapper,.evolve-toast .text-wrapper-section .text-wrapper{display:block;text-align:center;width:100%}.evolve-confirm-box .text-wrapper-section .dont-break-out,.evolve-parent-dialog .text-wrapper-section .dont-break-out,.evolve-toast .text-wrapper-section .dont-break-out{-webkit-hyphens:auto;hyphens:auto;overflow-wrap:break-word;white-space:pre-wrap;word-wrap:break-word}.evolve-confirm-box,.evolve-parent-dialog{background:#fbfbfb;border-radius:5px;border-top:7px solid;box-shadow:0 0 4px 1px rgba(0,0,0,.25);display:flex;flex-direction:column;max-height:calc(100vh - 100px);max-width:calc(100vw - 100px);position:relative;vertical-align:bottom}.evolve-confirm-box.standard-dialog,.evolve-parent-dialog.standard-dialog{border-color:transparent;padding:17px 20px 10px}.evolve-confirm-box.success-dialog,.evolve-parent-dialog.success-dialog{border-color:#3caea3}.evolve-confirm-box.info-dialog,.evolve-parent-dialog.info-dialog{border-color:#2f8ee5}.evolve-confirm-box.warning-dialog,.evolve-parent-dialog.warning-dialog{border-color:#ffc107}.evolve-confirm-box.danger-dialog,.evolve-parent-dialog.danger-dialog{border-color:#e46464}.ap-icon-success{color:#58c5bb}.ap-icon-info{color:#5ca7eb}.ap-icon-warning{color:#ffce3a}.ap-icon-danger{color:#ec8f8f}.ngx-awesome-popup-overlay .evolve-confirm-box{padding:0 20px}.ngx-awesome-popup-overlay .evolve-confirm-box .confirm-box-title-content{align-items:center;background-clip:padding-box;border-bottom:1px solid rgba(0,0,0,.05);color:#6c757d;display:flex;flex-direction:column;height:auto;justify-content:center;padding:2px 10px 5px;margin:8px 0 10px;width:auto}.ngx-awesome-popup-overlay .evolve-confirm-box .confirm-box-title-content .confirm-box-title-text{font-weight:700;font-size:18px}.ngx-awesome-popup-overlay .evolve-confirm-box .content-holder{color:#495057;display:flex;flex-direction:row;height:100%;overflow:auto;width:100%;justify-content:space-between;align-items:center}.ngx-awesome-popup-overlay .evolve-confirm-box .content-holder .icon-section .icon-type-confirm-box{font-size:34px;margin:4px}.ngx-awesome-popup-overlay .evolve-confirm-box .content-holder .confirm-box-inner-content{padding:5px 10px}.ngx-awesome-popup-overlay .evolve-confirm-box .content-holder .text-wrapper p{margin:0}.ngx-awesome-popup-overlay .evolve-confirm-box .button-holder{display:flex;flex-direction:column;justify-content:flex-end;width:100%;margin:10px 0 8px}.ngx-awesome-popup-overlay .evolve-confirm-box .button-holder .button-section{margin:0;padding:4px 10px}"]
            },] }
    ];
    ConfirmBoxWrapperComponent.ctorParameters = function () { return [
        { type: exports.ɵh.ConfirmBoxBelonging },
        { type: i0.ChangeDetectorRef }
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
                weakMap.set(exports.ɵh.ConfirmBoxEventsController, _EventsController);
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
            var domElem = _ComponentRef.hostView.rootNodes[0];
            document.body.appendChild(domElem);
        };
        ConfirmBoxService.prototype.closeDialogWrapperComponent = function (_DialogUniqueID) {
            var modalIndex = this.findDialogIndex(_DialogUniqueID);
            this.removeFromBodyParentComponent(modalIndex);
        };
        ConfirmBoxService.prototype.removeFromBodyParentComponent = function (_DialogIndex) {
            var _this = this;
            if (_DialogIndex > -1) {
                this.confirmBoxComponentRefList[_DialogIndex].instance.closeParent$('close-fast').pipe(operators.map(function (item) {
                    _this.appRef.detachView(_this.confirmBoxComponentRefList[_DialogIndex].hostView);
                    _this.confirmBoxComponentRefList[_DialogIndex].destroy();
                    _this.confirmBoxComponentRefList.splice(_DialogIndex, 1);
                })).subscribe();
            }
        };
        ConfirmBoxService.prototype.findDialogIndex = function (_DialogUniqueID) {
            return this.confirmBoxComponentRefList.findIndex(function (item) {
                return _DialogUniqueID === item.instance.confirmBoxBelonging.EntityUniqueID;
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

    exports.ɵh = void 0;
    (function (ConfirmBoxClass) {
        // region *** Public ***
        var ConfirmBoxInitializer = /** @class */ (function () {
            function ConfirmBoxInitializer() {
                /** @internal */
                this.confirmBoxCarrier = new ConfirmBoxClass.ConfirmBoxCarrier();
            }
            ConfirmBoxInitializer.prototype.openConfirmBox$ = function () {
                return this.confirmBoxCarrier.openConfirmBox$().pipe(operators.map(function (resp) {
                    var basicConfirmBoxResponse = new ConfirmBoxResponse();
                    var dataControl = new GlobalClass.DataControl();
                    dataControl.copyValuesFrom(resp, basicConfirmBoxResponse);
                    return basicConfirmBoxResponse;
                }));
            };
            ConfirmBoxInitializer.prototype.setButtons      = function (_Buttons) {
                this.confirmBoxCarrier.setButtons(_Buttons);
            };
            ConfirmBoxInitializer.prototype.setConfig       = function (_ConfirmBoxCoreConfig) {
                this.confirmBoxCarrier.setConfig(_ConfirmBoxCoreConfig);
            };
            ConfirmBoxInitializer.prototype.setDispatch     = function (_Title, _Message) {
                if (_Message === void 0) { _Message = null; }
                this.confirmBoxCarrier.setTitle(_Title);
                this.confirmBoxCarrier.setMessage(_Message);
            };
            ConfirmBoxInitializer.prototype.setTitle        = function (_Title) {
                this.confirmBoxCarrier.setTitle(_Title);
            };
            ConfirmBoxInitializer.prototype.setMessage      = function (_Message) {
                this.confirmBoxCarrier.setMessage(_Message);
            };
            ConfirmBoxInitializer.prototype.setButtonLabels = function (_Confirm, _Decline) {
                this.confirmBoxCarrier.setButtonLabels(_Confirm, _Decline);
            };
            return ConfirmBoxInitializer;
        }());
        ConfirmBoxClass.ConfirmBoxInitializer = ConfirmBoxInitializer;
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
        }(GlobalClass.DataControl));
        ConfirmBoxClass.ConfirmBoxResponse = ConfirmBoxResponse;
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
        ConfirmBoxClass.ConfirmBoxEventsController = ConfirmBoxEventsController;
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
        ConfirmBoxClass.ConfirmBoxDefaultResponse = ConfirmBoxDefaultResponse;
        var ConfirmBoxCarrier = /** @class */ (function () {
            function ConfirmBoxCarrier() {
                this.confirmBoxBelonging = new ConfirmBoxClass.ConfirmBoxBelonging();
            }

            ConfirmBoxCarrier.prototype.setButtons      = function (_Buttons) {
                if (_Buttons.length) {
                    this.confirmBoxBelonging.Buttons = _Buttons;
                }
            };
            ConfirmBoxCarrier.prototype.setTitle        = function (_Title) {
                this.confirmBoxBelonging.Dispatch.Title = _Title;
            };
            ConfirmBoxCarrier.prototype.setMessage      = function (_Message) {
                this.confirmBoxBelonging.Dispatch.Message = _Message;
            };
            ConfirmBoxCarrier.prototype.setButtonLabels = function (_Confirm, _Decline) {
                this.confirmBoxBelonging.ConfirmBoxCoreConfig.ConfirmLabel = _Confirm;
                this.confirmBoxBelonging.ConfirmBoxCoreConfig.DeclineLabel = _Decline;
            };
            ConfirmBoxCarrier.prototype.setConfig       = function (_ConfirmBoxBelonging) {
                // region *** local UserConfig (defined on place where dialog is called) ***
                var dataControl = new GlobalClass.DataControl();
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
        ConfirmBoxClass.ConfirmBoxCarrier = ConfirmBoxCarrier;
        var Settings = /** @class */ (function () {
            function Settings() {
                this.Buttons              = [];
                this.ConfirmBoxCoreConfig = new ConfirmBoxCoreConfig();
                this.Dispatch             = new GlobalClass.Dispatch();
            }
            return Settings;
        }());
        ConfirmBoxClass.Settings = Settings;
        var ConfirmBoxCoreConfig = /** @class */ (function () {
            function ConfirmBoxCoreConfig() {
                this.Width            = null;
                this.Height           = null;
                this.ButtonPosition   = null;
                this.LayoutType       = null;
                this.Dispatch         = null;
                this.ConfirmLabel     = null;
                this.DeclineLabel     = null;
                this.DisableIcon      = null;
                this.AllowHTMLMessage = null;
            }
            return ConfirmBoxCoreConfig;
        }());
        ConfirmBoxClass.ConfirmBoxCoreConfig = ConfirmBoxCoreConfig;
        var ConfirmBoxBelonging = /** @class */ (function (_super) {
            __extends(ConfirmBoxBelonging, _super);
            function ConfirmBoxBelonging() {
                var _this = _super.call(this) || this;
                _this.EntityUniqueID = 'C' + Math.random().toString(36).substr(2, 9);
                _this.EventsController = new ConfirmBoxEventsController(_this.EntityUniqueID);
                var ConfirmBoxCoreConfigurator = ServiceLocator.injector.get(ConfirmBoxConfigService);
                var baseSettings = new ConfirmBoxClass.Settings();
                var dataControl = new GlobalClass.DataControl();
                dataControl.copyValuesFrom(ConfirmBoxCoreConfigurator.productionConfig.ConfirmBoxCoreConfig, baseSettings.ConfirmBoxCoreConfig);
                _this.ConfirmBoxCoreConfig = baseSettings.ConfirmBoxCoreConfig;
                _this.Buttons              = ConfirmBoxCoreConfigurator.productionConfig.Buttons.slice();
                return _this;
            }

            return ConfirmBoxBelonging;
        }(ConfirmBoxClass.Settings));
        ConfirmBoxClass.ConfirmBoxBelonging = ConfirmBoxBelonging;
    })(exports.ɵh || (exports.ɵh = {}));

    var GlobalConfigService            = /** @class */ (function () {
        function GlobalConfigService(userGlobalConfig) {
            this.userGlobalConfig                          = userGlobalConfig;
            this.productionGlobalConfig                    = new GlobalClass.GlobalConfig();
            this.authorGlobalConfig                        = new GlobalClass.GlobalConfig();
            userGlobalConfig                               = new GlobalClass.GlobalUserConfig(userGlobalConfig);
            // region *** author global config values (if there is no user input) ***
            this.authorGlobalConfig.DisplayColor.Primary   = null; // new GlobalClass.ColorProvider('#ff9e00');
            this.authorGlobalConfig.DisplayColor.Secondary = null; // new GlobalClass.ColorProvider('#989ea5');
            this.authorGlobalConfig.DisplayColor.Success   = null; // new GlobalClass.ColorProvider('#3caea3');
            this.authorGlobalConfig.DisplayColor.Info      = null; // new GlobalClass.ColorProvider('#2f8ee5');
            this.authorGlobalConfig.DisplayColor.Warning   = null; // new GlobalClass.ColorProvider('#ffc107');
            this.authorGlobalConfig.DisplayColor.Danger    = null; // new GlobalClass.ColorProvider('#e46464');
            this.authorGlobalConfig.DisplayColor.Light     = null; // new GlobalClass.ColorProvider('#f8f9fa');
            this.authorGlobalConfig.DisplayColor.Dark      = null; // new GlobalClass.ColorProvider('#343a40');
            // endregion
            this.productionGlobalConfig.DisplayColor = this.authorGlobalConfig.DisplayColor;
            // region *** global userConfig (user input app-module) ***
            this.setUserColors(userGlobalConfig.ColorList);
            // endregion
            this.setToastNode();
            this.setNodeStyles(this.productionGlobalConfig.DisplayColor);
        }

        GlobalConfigService.prototype.setNodeStyles    = function (_ProductionColorTypes) {
            var _this = this;
            Object.keys(_ProductionColorTypes).forEach(function (key) {
                if (_ProductionColorTypes[key]) {
                    _this.setButtonStyling(key, _ProductionColorTypes[key]);
                    _this.setIconStyling(key, _ProductionColorTypes[key]);
                    _this.setToastStyling(key, _ProductionColorTypes[key]);
                    _this.setDialogFrame(key, _ProductionColorTypes[key]);
                    if (ColorVariance[key.toUpperCase()] === ColorVariance.PRIMARY) {
                        _this.getSheet().addRule('.ngx-awesome-popup-overlay', "background:  " + _ProductionColorTypes[key].TransparentDarkenVariance + "!important;");
                    }
                }
            });
        };
        GlobalConfigService.prototype.setToastStyling  = function (_Key, _ColorProvider) {
            var baseClass = ".overlay-toast .evolve-toast." + _Key.toLowerCase() + "-dialog";
            var baseStyle = "\n        background:  " + _ColorProvider.BrightShade + "!important;\n        border-color: " + _ColorProvider.Brighten + "!important;\n        ";
            this.getSheet().addRule(baseClass, baseStyle);
        };
        GlobalConfigService.prototype.setButtonStyling = function (_Key, _ColorProvider) {
            var baseButtonClass        = ".ed-btn-" + _Key.toLowerCase();
            var baseStyle              = "\n        color: " + _ColorProvider.ContrastColor + "!important;\n        background:  " + _ColorProvider.Base + "!important;\n        border-color: " + _ColorProvider.BrightenForShade + "!important;\n        ";
            var hoverButtonClass       = ".ed-btn-" + _Key.toLowerCase() + ":hover";
            var hoverStyle             = "\n        background:  " + (_ColorProvider.IsBaseBright ? _ColorProvider.DarkenForShade : _ColorProvider.BrightenForShade) + "!important;\n        border-color: " + (_ColorProvider.IsBaseBright ? _ColorProvider.Darken : _ColorProvider.Brighten) + "!important;\n        ";
            var focusActiveButtonClass = ".ed-btn-" + _Key.toLowerCase() + ":focus, .ed-btn-" + _Key.toLowerCase() + ":active";
            var focusActiveStyle       = "\n        box-shadow: 0 0 1px 2px " + (_ColorProvider.IsBaseBright ? _ColorProvider.Darken : _ColorProvider.Brighten) + "!important;\n        ";
            this.getSheet().addRule(baseButtonClass, baseStyle);
            this.getSheet().addRule(hoverButtonClass, hoverStyle);
            this.getSheet().addRule(focusActiveButtonClass, focusActiveStyle);
        };
        GlobalConfigService.prototype.setIconStyling   = function (_Key, _ColorProvider) {
            var baseIconClass = ".ap-icon-" + _Key.toLowerCase();
            var baseStyle     = "\n        color: " + _ColorProvider.BrightenForShade + "!important;";
            this.getSheet().addRule(baseIconClass, baseStyle);
        };
        GlobalConfigService.prototype.setDialogFrame   = function (_Key, _ColorProvider) {
            var baseDialogFrameClass = ".ngx-awesome-popup-overlay ." + _Key.toLowerCase() + "-dialog";
            var baseStyle            = "\n        border-color: " + _ColorProvider.Brighten + "!important;\n        ";
            this.getSheet().addRule(baseDialogFrameClass, baseStyle);
        };
        GlobalConfigService.prototype.getSheet         = function () {
            // Create the <style> tag
            var evolveDialogStyleNode = document.getElementById('ngx-awesome-popup-styles');
            if (!evolveDialogStyleNode) {
                var headNode = document.head || document.getElementsByTagName('head')[0];
                if (!headNode) {
                    return;
                }
                evolveDialogStyleNode = document.createElement('style');
                evolveDialogStyleNode.setAttribute('id', 'ngx-awesome-popup-styles');
                evolveDialogStyleNode.appendChild(document.createTextNode(''));
                headNode.appendChild(evolveDialogStyleNode);
            }
            return evolveDialogStyleNode ? evolveDialogStyleNode.sheet : null;
        };
        ;
        GlobalConfigService.prototype.setToastNode  = function () {
            var bodyNode = document.body || document.getElementsByTagName('body')[0];
            if (!bodyNode) {
                return;
            }
            var toastWrapper = document.createElement('div');
            toastWrapper.setAttribute('id', 'toast-wrapper');
            toastWrapper.appendChild(document.createTextNode(''));
            bodyNode.prepend(toastWrapper);
            // bodyNode.appendChild(toastWrapper);
            this.getSheet().addRule("#toast-wrapper", "position: fixed;\n                                        z-index: 1001;\n                                        top: 20px;\n                                        right: 20px;");
            this.getSheet().addRule(".toast-entity", "all 0.5s ease;");
            this.getSheet().addRule(".toast-entity:first-child", "animation: move 0.7s ease-out;");
            this.getSheet().addRule("@-webkit-keyframes move", "\n                                        0% {margin-top: -5px; opacity: 0.4;}\n                                        30% {margin-top: -4px; opacity: 0.7;}\n                                        100% {margin-top: 0px; opacity: 1;}\n                                        ");
            this.getSheet().addRule("@keyframes move", "\n                                        0% {margin-top: -5px; opacity: 0.4;}\n                                        30% {margin-top: -4px; opacity: 0.7;}\n                                        100% {margin-top: 0px; opacity: 1;}\n                                        ");
        };
        GlobalConfigService.prototype.setUserColors = function (_UserColorTypes) {
            var _this = this;
            if (typeof _UserColorTypes !== 'object') {
                return;
            }
            var userKeys             = Object.keys(_UserColorTypes);
            var productionObjectKeys = Object.keys(this.productionGlobalConfig.DisplayColor);
            userKeys.forEach(function (key) {
                if (productionObjectKeys.find(function (tKey) { return tKey === key; })) {
                    var baseColorProvider = new GlobalClass.ColorProvider(_UserColorTypes[key]);
                    if (baseColorProvider.Base) {
                        _this.productionGlobalConfig.DisplayColor[key] = baseColorProvider;
                    }
                }
            });
        };
        return GlobalConfigService;
    }());
    GlobalConfigService.ɵprov          = i0__namespace.ɵɵdefineInjectable({
        factory: function GlobalConfigService_Factory() { return new GlobalConfigService(i0__namespace.ɵɵinject("globalConfig")); },
        token: GlobalConfigService,
        providedIn: "root"
    });
    GlobalConfigService.decorators     = [
        {
            type: i0.Injectable, args: [{
                providedIn: 'root'
            },]
        }
    ];
    GlobalConfigService.ctorParameters = function () {
        return [
            {type: undefined, decorators: [{type: i0.Inject, args: ['globalConfig',]}]}
        ];
    };

    var ToastNotificationWrapperComponent            = /** @class */ (function () {
        function ToastNotificationWrapperComponent(gConfig, toastNotificationBelonging, cd) {
            this.gConfig                    = gConfig;
            this.toastNotificationBelonging = toastNotificationBelonging;
            this.cd                         = cd;
            this.fadeInOutAnimation         = 'open';
            this.timerStarted$              = new rxjs.BehaviorSubject('start-counter');
            this.isTimerStarted             = false;
        }

        ToastNotificationWrapperComponent.prototype.ngAfterViewInit    = function () {
            this.setResponse(false);
            this.cd.detectChanges();
            this.autoClose();
        };
        ToastNotificationWrapperComponent.prototype.setResponse        = function (_IsSuccess, _ClickedButtonID) {
            var response = new exports.ɵl.ToastNotificationDefaultResponse();
            if (_ClickedButtonID) {
                response.ClickedButtonID = _ClickedButtonID;
            }
            response.setSuccess(_IsSuccess);
            response.setBelonging(this.toastNotificationBelonging);
            this.toastNotificationBelonging.EventsController.setDefaultResponse(response);
        };
        ToastNotificationWrapperComponent.prototype.onOverlayClicked   = function (evt) {
            // console.log('onOverlayClicked');
        };
        ToastNotificationWrapperComponent.prototype.onToastClicked     = function (evt) {
            // console.log('onOverlayClicked');
        };
        ToastNotificationWrapperComponent.prototype.onCustomButton     = function (_Button) {
            this.toastNotificationBelonging.EventsController.onButtonClick(_Button);
            this.setResponse(true, _Button.ID);
            this.toastNotificationBelonging.EventsController.close();
        };
        ToastNotificationWrapperComponent.prototype.onButtonClick      = function (_Type) {
            this.setResponse(_Type === 'confirm');
            this.toastNotificationBelonging.EventsController.close();
        };
        ToastNotificationWrapperComponent.prototype.autoClose          = function () {
            var _this = this;
            if (this.autoCloseCondition()) {
                this.subTimer = this.timerStarted$.pipe(operators.tap(function (next) {
                    if ('start-counter' === next) {
                        _this.isTimerStarted = true;
                        _this.timer          = setTimeout(function () {
                            _this.subsToClosingDelay = _this.closeParent$('close-slow').subscribe(function (resp) {
                                _this.toastNotificationBelonging.EventsController.close();
                            });
                        }, _this.toastNotificationBelonging.ToastCoreConfig.AutoCloseDelay);
                    } else if ('stop-counter' === next) {
                        if (_this.isTimerStarted) {
                            clearTimeout(_this.timer);
                            _this.isTimerStarted = false;
                        }
                    }
                })).subscribe();
            }
        };
        ToastNotificationWrapperComponent.prototype.autoCloseCondition = function () {
            return this.toastNotificationBelonging.ToastCoreConfig.AutoCloseDelay
                && !(this.toastNotificationBelonging.Buttons.length
                    || this.toastNotificationBelonging.ToastCoreConfig.DeclineLabel
                    || this.toastNotificationBelonging.ToastCoreConfig.ConfirmLabel);
        };
        ToastNotificationWrapperComponent.prototype.closeParent$       = function (_ClosingAnimation) {
            this.fadeInOutAnimation = _ClosingAnimation;
            var timer               = _ClosingAnimation === 'close-slow' ? 1400 : 150;
            return rxjs.of('').pipe(operators.delay(timer));
        };
        ToastNotificationWrapperComponent.prototype.close              = function () {
            this.toastNotificationBelonging.EventsController.close();
        };
        ToastNotificationWrapperComponent.prototype.mouseOver          = function () {
            var _a;
            this.timerStarted$.next('stop-counter');
            this.fadeInOutAnimation = 'open';
            (_a = this.subsToClosingDelay) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        };
        ToastNotificationWrapperComponent.prototype.mouseOut           = function () {
            this.timerStarted$.next('start-counter');
        };
        ToastNotificationWrapperComponent.prototype.ngOnDestroy        = function () {
            var _a, _b;
            (_a = this.subsToClosingDelay) === null || _a === void 0 ? void 0 : _a.unsubscribe();
            (_b = this.subTimer) === null || _b === void 0 ? void 0 : _b.unsubscribe();
        };
        return ToastNotificationWrapperComponent;
    }());
    ToastNotificationWrapperComponent.decorators = [
        { type: i0.Component, args: [{
                selector: 'app-toast-notification-wrapper',
                template: "<div class=\"overlay-toast\" (dblclick)=\"onOverlayClicked($event)\" [@fadeInOut]=\"fadeInOutAnimation\">\n\t\n\t<div\n        #evolveToast\n\t\t(mouseover)=\"mouseOver()\" (mouseout)=\"mouseOut()\"\n\t\tclass=\"evolve-toast\" (click)=\"onToastClicked($event)\" [ngClass]=\"{\n          'standard-dialog': 0 === toastNotificationBelonging.ToastCoreConfig.LayoutType,\n          'success-dialog': 1 === toastNotificationBelonging.ToastCoreConfig.LayoutType,\n          'info-dialog': 2 === toastNotificationBelonging.ToastCoreConfig.LayoutType,\n          'warning-dialog': 3 === toastNotificationBelonging.ToastCoreConfig.LayoutType,\n          'danger-dialog': 4 === toastNotificationBelonging.ToastCoreConfig.LayoutType\n        }\"\n\t\t[ngStyle]=\"{'width': toastNotificationBelonging.ToastCoreConfig.Width, 'height': toastNotificationBelonging.ToastCoreConfig.Height}\"\n\t>\n\t\t<div class=\"toast-title-content\" *ngIf=\"toastNotificationBelonging.Dispatch.Title\">\n\t\t\t\n\t\t\t<div class=\"dont-break-out\">\n\t\t\t\t<div class=\"text-wrapper dont-break-out\">\n\t\t\t\t\t<div class=\"toast-title-text\">{{toastNotificationBelonging.Dispatch.Title}}</div>\n\t\t\t\t\t<div\n\t\t\t\t\t\t\tclass=\"close-ico\" (click)=\"close()\"\n\t\t\t\t\t\t\t*ngIf=\"\n\t\t\t\t\t     !toastNotificationBelonging.Buttons.length\n\t\t\t\t\t     && !toastNotificationBelonging.ToastCoreConfig.DeclineLabel\n\t\t\t\t\t     && !toastNotificationBelonging.ToastCoreConfig.ConfirmLabel\n\t\t\t\t\t     \"\n\t\t\t\t\t></div>\n\t\t\t\t\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\n\t\t</div>\n\t\t\n\t\t<div class=\"content-holder\" *ngIf=\"toastNotificationBelonging.Dispatch.Message\">\n\t\t\t<div class=\"icon-section\" *ngIf=\"!toastNotificationBelonging.ToastCoreConfig.DisableIcon\">\n\t\t\t\t\t<span\n\t\t\t\t\t\t\tclass=\"icon-type-toast\" [ngClass]=\"{\n\t\t\t\t          '': toastNotificationBelonging.ToastCoreConfig.LayoutType === 0,\n\t\t\t\t          'ap-icon-success icon-check-circle': toastNotificationBelonging.ToastCoreConfig.LayoutType === 1,\n\t\t\t\t          'ap-icon-info icon-info-circle': toastNotificationBelonging.ToastCoreConfig.LayoutType === 2,\n\t\t\t\t          'ap-icon-warning icon-warning': toastNotificationBelonging.ToastCoreConfig.LayoutType === 3,\n\t\t\t\t          'ap-icon-danger icon-times-circle': toastNotificationBelonging.ToastCoreConfig.LayoutType === 4\n\t\t\t\t        }\"\n\t\t\t\t\t></span>\n\t\t\t</div>\n\t\t\t<div class=\"text-wrapper-section toast-inner-content\" [ngStyle]=\"{'width': toastNotificationBelonging.ToastCoreConfig.Width, 'height': toastNotificationBelonging.ToastCoreConfig.Height}\">\n\t\t\t\t\n\t\t\t\t<!--<div class=\"dont-break-out\" [ngClass]=\"{'text-wrapper-section-with-icon': showIcon, 'text-wrapper-section': !showIcon}\">-->\n\t\t\t\t<div class=\"dont-break-out\">\n\t\t\t\t\t<div  *ngIf=\"!toastNotificationBelonging.ToastCoreConfig.AllowHTMLMessage\" class=\"text-wrapper dont-break-out\"><p>{{toastNotificationBelonging.Dispatch.Message}}</p></div>\n\t\t\t\t\t<div *ngIf=\"toastNotificationBelonging.ToastCoreConfig.AllowHTMLMessage\" class=\"text-wrapper\" [innerHTML]=\"toastNotificationBelonging.Dispatch.Message\"></div>\n\t\t\t\t</div>\n\t\t\t\n\t\t\t</div>\n\t\t\t<!--<span class=\"icon-times-circle\"></span>-->\n\t\t\t<div\n\t\t\t\t\tclass=\"close-ico\" (click)=\"close()\"\n\t\t\t\t\t*ngIf=\"\n\t\t\t\t\t     !toastNotificationBelonging.Buttons.length\n\t\t\t\t\t     && !toastNotificationBelonging.ToastCoreConfig.DeclineLabel\n\t\t\t\t\t     && !toastNotificationBelonging.ToastCoreConfig.ConfirmLabel\n\t\t\t\t\t     && !toastNotificationBelonging.Dispatch.Title\n\t\t\t\t\t     \"\n\t\t\t></div>\n\t\t\n\t\t</div>\n\t\t\n\t\t<div class=\"button-holder\">\n\t\t\t<div class=\"button-section\" *ngIf=\"toastNotificationBelonging.Buttons.length\" [ngStyle]=\"{ 'text-align': toastNotificationBelonging.ToastCoreConfig.ButtonPosition }\">\n\t\t\t\t\n\t\t\t\t<button\n\t\t\t\t\t\tclass=\"ed-btn ed-btn-sm\" *ngFor=\"let button of toastNotificationBelonging.Buttons\" (click)=\"onCustomButton(button)\"\n\t\t\t\t\t\t[ngClass]=\"{\n\t\t\t                   '': (button.LayoutType ? (button.LayoutType === 0)  : false),\n                              'ed-btn-success': (button.LayoutType ? (button.LayoutType === 1) : false),\n                              'ed-btn-info': (button.LayoutType ? (button.LayoutType === 2) : false),\n                              'ed-btn-warning': (button.LayoutType ? (button.LayoutType === 3)  : false),\n                              'ed-btn-danger': (button.LayoutType ? (button.LayoutType === 4)  : false),\n                              'ed-btn-dark': (button.LayoutType ? (button.LayoutType === 5)  : false),\n                              'ed-btn-light': (button.LayoutType ? (button.LayoutType === 6)  : false),\n                               'ed-btn-primary': (button.LayoutType ? (button.LayoutType === 7) : false),\n                              'ed-btn-secondary': (button.LayoutType ? (button.LayoutType === 8)  : false),\n                              'ed-btn-link': (button.LayoutType ? (button.LayoutType === 9)  : false)\n                            }\"\n\t\t\t\t>{{button.Label}}\n\t\t\t\t</button>\n\t\t\t</div>\n\t\t\t\n\t\t\t<div\n\t\t\t\t\tclass=\"button-section\" [ngStyle]=\"{ 'text-align': toastNotificationBelonging.ToastCoreConfig.ButtonPosition }\"\n\t\t\t\t\t*ngIf=\"\n\t\t\t     !toastNotificationBelonging.Buttons.length\n\t\t\t     && (\n\t\t\t      toastNotificationBelonging.ToastCoreConfig.DeclineLabel\n\t\t\t      ||  toastNotificationBelonging.ToastCoreConfig.ConfirmLabel\n\t\t\t     )\"\n\t\t\t>\n\t\t\t\t\n\t\t\t\t<button\n\t\t\t\t\t\t*ngIf=\"toastNotificationBelonging.ToastCoreConfig.ConfirmLabel\"\n\t\t\t\t\t\tclass=\"ed-btn ed-btn-sm\" (click)=\"onButtonClick('confirm')\"\n\t\t\t\t\t\t[ngClass]=\"{\n\t\t\t\t          'ed-btn-primary': toastNotificationBelonging.ToastCoreConfig.LayoutType === 0,\n\t\t\t\t          'ed-btn-success': toastNotificationBelonging.ToastCoreConfig.LayoutType === 1,\n\t\t\t\t          'ed-btn-info': toastNotificationBelonging.ToastCoreConfig.LayoutType === 2,\n\t\t\t\t          'ed-btn-warning': toastNotificationBelonging.ToastCoreConfig.LayoutType === 3,\n\t\t\t\t          'ed-btn-danger': toastNotificationBelonging.ToastCoreConfig.LayoutType === 4\n\t\t\t\t        }\"\n\t\t\t\t>{{toastNotificationBelonging.ToastCoreConfig.ConfirmLabel}}\n\t\t\t\t</button>\n\t\t\t\t<button class=\"ed-btn ed-btn-sm ed-btn-secondary\" (click)=\"onButtonClick('decline')\" *ngIf=\"toastNotificationBelonging.ToastCoreConfig.DeclineLabel\">\n\t\t\t\t\t{{toastNotificationBelonging.ToastCoreConfig.DeclineLabel}}\n\t\t\t\t</button>\n\t\t\t\n\t\t\t</div>\n\t\t</div>\n\t\n\t</div>\n\n</div>\n",
                animations: [fadeInOut(0, 1)],
                styles: ["@charset \"UTF-8\";.ed-btn-sm{font-size:12px;font-weight:400;margin-right:3px;min-width:40px;padding:2px 8px}.ed-btn-md{font-size:14px;margin-right:5px;min-width:60px;padding:3px 10px}.ed-btn-lg{font-size:16px;margin-right:5px;min-width:70px;padding:4px 10px}.ed-btn{background-color:initial;border:none;border-radius:3px;cursor:pointer;display:inline-block;line-height:1.5;text-align:center;text-decoration:none;-webkit-user-select:none;user-select:none;vertical-align:middle}.ed-btn:hover{color:#989ea5}.ed-btn-check:focus+.ed-btn,.ed-btn:focus{box-shadow:0 0 1px 2px;outline:0}.ed-btn-check:active+.ed-btn,.ed-btn-check:active+.ed-btn:focus,.ed-btn-check:checked+.ed-btn,.ed-btn-check:checked+.ed-btn:focus,.ed-btn.active,.ed-btn.active:focus,.ed-btn:active,.ed-btn:active:focus{box-shadow:0 0 1px 2px}.ed-btn.disabled,.ed-btn:disabled,fieldset:disabled .ed-btn{box-shadow:none;opacity:.6;pointer-events:none}.ed-btn-primary{color:hsla(0,0%,98.4%,.8);background:#ff9e00;border-color:#ff9e00}.ed-btn-primary:hover{color:#fbfbfb;border-color:#ffa81a;background:#ffb133}.ed-btn-check:focus+.ed-btn-primary,.ed-btn-primary:focus{outline:0;box-shadow:0 0 1px 2px #ffa81a}.ed-btn-check:active+.ed-btn-primary,.ed-btn-check:active+.ed-btn-primary:focus,.ed-btn-check:checked+.ed-btn-primary,.ed-btn-check:checked+.ed-btn-primary:focus,.ed-btn-primary.active,.ed-btn-primary.active:focus,.ed-btn-primary:active,.ed-btn-primary:active:focus{box-shadow:0 0 1px 2px #ffa81a}.ed-btn-secondary{color:hsla(0,0%,98.4%,.8);background:#989ea5;border-color:#989ea5}.ed-btn-secondary:hover{color:#fbfbfb;border-color:#a6abb1;background:#b3b8bd}.ed-btn-check:focus+.ed-btn-secondary,.ed-btn-secondary:focus{outline:0;box-shadow:0 0 1px 2px #a6abb1}.ed-btn-check:active+.ed-btn-secondary,.ed-btn-check:active+.ed-btn-secondary:focus,.ed-btn-check:checked+.ed-btn-secondary,.ed-btn-check:checked+.ed-btn-secondary:focus,.ed-btn-secondary.active,.ed-btn-secondary.active:focus,.ed-btn-secondary:active,.ed-btn-secondary:active:focus{box-shadow:0 0 1px 2px #a6abb1}.ed-btn-success{color:hsla(0,0%,98.4%,.8);background:#3caea3;border-color:#3caea3}.ed-btn-success:hover{color:#fbfbfb;border-color:#45bfb3;background:#58c5bb}.ed-btn-check:focus+.ed-btn-success,.ed-btn-success:focus{outline:0;box-shadow:0 0 1px 2px #45bfb3}.ed-btn-check:active+.ed-btn-success,.ed-btn-check:active+.ed-btn-success:focus,.ed-btn-check:checked+.ed-btn-success,.ed-btn-check:checked+.ed-btn-success:focus,.ed-btn-success.active,.ed-btn-success.active:focus,.ed-btn-success:active,.ed-btn-success:active:focus{box-shadow:0 0 1px 2px #45bfb3}.ed-btn-info{color:hsla(0,0%,98.4%,.8);background:#2f8ee5;border-color:#2f8ee5}.ed-btn-info:hover{color:#fbfbfb;border-color:#469ae8;background:#5ca7eb}.ed-btn-check:focus+.ed-btn-info,.ed-btn-info:focus{outline:0;box-shadow:0 0 1px 2px #469ae8}.ed-btn-check:active+.ed-btn-info,.ed-btn-check:active+.ed-btn-info:focus,.ed-btn-check:checked+.ed-btn-info,.ed-btn-check:checked+.ed-btn-info:focus,.ed-btn-info.active,.ed-btn-info.active:focus,.ed-btn-info:active,.ed-btn-info:active:focus{box-shadow:0 0 1px 2px #469ae8}.ed-btn-warning{color:hsla(0,0%,98.4%,.8);background:#ffc107;border-color:#ffc107}.ed-btn-warning:hover{color:#fbfbfb;border-color:#ffc721;background:#ffce3a}.ed-btn-check:focus+.ed-btn-warning,.ed-btn-warning:focus{outline:0;box-shadow:0 0 1px 2px #ffc721}.ed-btn-check:active+.ed-btn-warning,.ed-btn-check:active+.ed-btn-warning:focus,.ed-btn-check:checked+.ed-btn-warning,.ed-btn-check:checked+.ed-btn-warning:focus,.ed-btn-warning.active,.ed-btn-warning.active:focus,.ed-btn-warning:active,.ed-btn-warning:active:focus{box-shadow:0 0 1px 2px #ffc721}.ed-btn-danger{color:hsla(0,0%,98.4%,.8);background:#e46464;border-color:#e46464}.ed-btn-danger:hover{color:#fbfbfb;border-color:#e87a7a;background:#ec8f8f}.ed-btn-check:focus+.ed-btn-danger,.ed-btn-danger:focus{outline:0;box-shadow:0 0 1px 2px #e87a7a}.ed-btn-check:active+.ed-btn-danger,.ed-btn-check:active+.ed-btn-danger:focus,.ed-btn-check:checked+.ed-btn-danger,.ed-btn-check:checked+.ed-btn-danger:focus,.ed-btn-danger.active,.ed-btn-danger.active:focus,.ed-btn-danger:active,.ed-btn-danger:active:focus{box-shadow:0 0 1px 2px #e87a7a}.ed-btn-light{color:rgba(52,58,64,.8);background:#fbfbfb;border-color:#fbfbfb}.ed-btn-light:hover{color:#343a40;border-color:#fff;background:#fff}.ed-btn-check:focus+.ed-btn-light,.ed-btn-light:focus{outline:0;box-shadow:0 0 1px 2px #fff}.ed-btn-check:active+.ed-btn-light,.ed-btn-check:active+.ed-btn-light:focus,.ed-btn-check:checked+.ed-btn-light,.ed-btn-check:checked+.ed-btn-light:focus,.ed-btn-light.active,.ed-btn-light.active:focus,.ed-btn-light:active,.ed-btn-light:active:focus{box-shadow:0 0 1px 2px #fff}.ed-btn-dark{color:hsla(0,0%,98.4%,.8);background:#343a40;border-color:#343a40}.ed-btn-dark:hover{color:#fbfbfb;border-color:#3f474e;background:#4b545c}.ed-btn-check:focus+.ed-btn-dark,.ed-btn-dark:focus{outline:0;box-shadow:0 0 1px 2px #3f474e}.ed-btn-check:active+.ed-btn-dark,.ed-btn-check:active+.ed-btn-dark:focus,.ed-btn-check:checked+.ed-btn-dark,.ed-btn-check:checked+.ed-btn-dark:focus,.ed-btn-dark.active,.ed-btn-dark.active:focus,.ed-btn-dark:active,.ed-btn-dark:active:focus{box-shadow:0 0 1px 2px #3f474e}@font-face{font-family:icomoon;src:url(../assets/fonts/icomoon.eot?vap0ng);src:url(../assets/fonts/icomoon.eot?vap0ng#iefix) format(\"embedded-opentype\"),url(../assets/fonts/icomoon.ttf?vap0ng) format(\"truetype\"),url(../assets/fonts/icomoon.woff?vap0ng) format(\"woff\"),url(../assets/fonts/icomoon.svg?vap0ng#icomoon) format(\"svg\");font-weight:400;font-style:normal;font-display:block}[class*=\" icon-\"],[class^=icon-]{font-family:icomoon!important;speak:never;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;line-height:1;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.icon-times-circle:before{content:\"\uE900\"}.icon-exclamation-triangle:before,.icon-warning:before{content:\"\uE901\"}.icon-check-circle:before{content:\"\uE902\"}.icon-info-circle:before{content:\"\uE903\"}.ngx-awesome-popup-overlay{align-items:center;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px);background:rgba(51,32,0,.4);bottom:0;display:flex;flex-direction:column;justify-content:center;left:0;opacity:0;position:fixed;right:0;top:0;z-index:1000}.evolve-confirm-box .text-wrapper-section,.evolve-parent-dialog .text-wrapper-section,.evolve-toast .text-wrapper-section{width:100%}.evolve-confirm-box .text-wrapper-section .text-wrapper,.evolve-parent-dialog .text-wrapper-section .text-wrapper,.evolve-toast .text-wrapper-section .text-wrapper{display:block;text-align:center;width:100%}.evolve-confirm-box .text-wrapper-section .dont-break-out,.evolve-parent-dialog .text-wrapper-section .dont-break-out,.evolve-toast .text-wrapper-section .dont-break-out{-webkit-hyphens:auto;hyphens:auto;overflow-wrap:break-word;white-space:pre-wrap;word-wrap:break-word}.evolve-confirm-box,.evolve-parent-dialog{background:#fbfbfb;border-radius:5px;border-top:7px solid;box-shadow:0 0 4px 1px rgba(0,0,0,.25);display:flex;flex-direction:column;max-height:calc(100vh - 100px);max-width:calc(100vw - 100px);position:relative;vertical-align:bottom}.evolve-confirm-box.standard-dialog,.evolve-parent-dialog.standard-dialog{border-color:transparent;padding:17px 20px 10px}.evolve-confirm-box.success-dialog,.evolve-parent-dialog.success-dialog{border-color:#3caea3}.evolve-confirm-box.info-dialog,.evolve-parent-dialog.info-dialog{border-color:#2f8ee5}.evolve-confirm-box.warning-dialog,.evolve-parent-dialog.warning-dialog{border-color:#ffc107}.evolve-confirm-box.danger-dialog,.evolve-parent-dialog.danger-dialog{border-color:#e46464}.ap-icon-success{color:#58c5bb}.ap-icon-info{color:#5ca7eb}.ap-icon-warning{color:#ffce3a}.ap-icon-danger{color:#ec8f8f}.overlay-toast{background:transparent;margin:0;opacity:0;padding:0;z-index:0}.overlay-toast,.overlay-toast .evolve-toast{display:flex;flex-direction:column;position:relative}.overlay-toast .evolve-toast{background:#fbfbfb;border-radius:5px;border-right:4px solid;box-shadow:0 0 4px 1px rgba(0,0,0,.25);margin-left:auto;margin-top:10px;max-height:350px;max-width:300px;min-width:300px;transition:box-shadow .3s ease-in-out;vertical-align:bottom}.overlay-toast .evolve-toast:hover{box-shadow:0 0 4px 3px rgba(0,0,0,.25)}.overlay-toast .evolve-toast.standard-dialog{border-color:transparent}.overlay-toast .evolve-toast.success-dialog{background-color:#dcf3f1;border-color:#3caea3}.overlay-toast .evolve-toast.info-dialog{background-color:#e4f1fc;border-color:#2f8ee5}.overlay-toast .evolve-toast.warning-dialog{background-color:#fff4d3;border-color:#ffc107}.overlay-toast .evolve-toast.danger-dialog{background-color:#f7d1d1;border-color:#e46464}.overlay-toast .evolve-toast .close-ico{background:rgba(0,0,0,.2);border-radius:50%;cursor:pointer;height:18px;position:absolute;right:6px;top:6px;width:18px}.overlay-toast .evolve-toast div.close-ico:after{color:hsla(0,0%,100%,.5);content:\"\u00D7\";font-size:15px;left:5px;position:relative;text-align:center;top:-1px}.overlay-toast .evolve-toast .toast-title-content{align-items:flex-start;background-clip:padding-box;background-color:hsla(0,0%,100%,.55);border-bottom:1px solid rgba(0,0,0,.05);border-radius:5px 5px 0 0;color:#6c757d;display:flex;flex-direction:column;height:auto;justify-content:flex-start;padding:5px 10px;width:auto}.overlay-toast .evolve-toast .toast-title-content .toast-title-text{font-size:15px}.overlay-toast .evolve-toast .content-holder{color:#6c757d;display:flex;height:100%;overflow:auto;width:100%;justify-content:space-between;align-items:center;flex-wrap:nowrap}.overlay-toast .evolve-toast .content-holder .icon-section .icon-type-toast{font-size:26px;padding:0 8px}.overlay-toast .evolve-toast .content-holder .toast-inner-content{padding:10px}.overlay-toast .evolve-toast .content-holder .text-wrapper p{font-size:14px;margin:0;text-align:right}.overlay-toast .evolve-toast .button-holder{display:flex;flex-direction:column;justify-content:flex-end;width:100%}.overlay-toast .evolve-toast .button-holder .button-section{margin:0;padding:4px 10px}"]
            },] }
    ];
    ToastNotificationWrapperComponent.ctorParameters = function () { return [
        {type: GlobalConfigService},
        {type: exports.ɵl.ToastNotificationBelonging},
        {type: i0.ChangeDetectorRef}
    ]; };

    var ToastNotificationConfigService = /** @class */ (function () {
        function ToastNotificationConfigService(userConfig) {
            if (userConfig === void 0) { userConfig = {}; }
            this.userConfig       = userConfig;
            this.authorConfig     = new exports.ɵl.Settings();
            this.productionConfig = new exports.ɵl.Settings();
            // region *** confirmBox userConfig (user input app-module) ***
            var userConfigBase    = new exports.ɵl.Settings();
            var dataControl       = new GlobalClass.DataControl();
            dataControl.copyValuesFrom(userConfig.ToastCoreConfig, userConfigBase.ToastCoreConfig); // this will make sure that object has right properties
            userConfig.ToastCoreConfig = userConfigBase.ToastCoreConfig;
            // endregion
            // region *** author default config values (if there is no user input) ***
            this.authorConfig.ToastCoreConfig.Width          = 'auto';
            this.authorConfig.ToastCoreConfig.Height         = 'auto';
            this.authorConfig.ToastCoreConfig.ButtonPosition = 'right';
            // this.authorConfig.ToastCoreConfig.ConfirmLabel   = 'Confirm';
            // this.authorConfig.ToastCoreConfig.DeclineLabel   = 'Decline';
            this.authorConfig.ToastCoreConfig.AutoCloseDelay            = 2500;
            this.authorConfig.ToastCoreConfig.DisableIcon               = false;
            this.authorConfig.ToastCoreConfig.AllowHTMLMessage          = true;
            this.authorConfig.ToastCoreConfig.LayoutType                = exports.DialogLayoutDisplay.NONE;
            this.authorConfig.GlobalSettings.AllowedNotificationsAtOnce = 5;
            // endregion
            // region *** Production setup ***
            dataControl.copyValuesFrom(this.authorConfig.GlobalSettings, this.productionConfig.GlobalSettings);
            dataControl.copyValuesFrom(userConfig.GlobalSettings, this.productionConfig.GlobalSettings);
            dataControl.copyValuesFrom(this.authorConfig.ToastCoreConfig, this.productionConfig.ToastCoreConfig);
            dataControl.copyValuesFrom(userConfig.ToastCoreConfig, this.productionConfig.ToastCoreConfig);
            // endregion
        }
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

    var ToastNotificationService = /** @class */ (function () {
        function ToastNotificationService(componentFactoryResolver, injector, appRef, toastConfig) {
            this.componentFactoryResolver = componentFactoryResolver;
            this.injector = injector;
            this.appRef = appRef;
            this.toastConfig = toastConfig;
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
                componentRef.instance.toastNotificationBelonging = _ToastRawInstance.ToastBelonging;
                this.appendToBodyParentComponent(componentRef);
            }
        };
        ToastNotificationService.prototype.isRefListAvailable = function () {
            return this.toastComponentRefList.length < this.toastConfig.productionConfig.GlobalSettings.AllowedNotificationsAtOnce;
        };
        ToastNotificationService.prototype.prepareRawToast = function (_EventsController, _ToastNotificationBelonging) {
            var weakMap = new WeakMap();
            weakMap.set(exports.ɵl.ToastNotificationEventsController, _EventsController);
            return {
                WeakMap: weakMap,
                ToastBelonging: _ToastNotificationBelonging
            };
        };
        ToastNotificationService.prototype.getComponentRef = function (_ToastNotificationRawState) {
            var dialogIndex = this.findDialogIndex(_ToastNotificationRawState.ToastBelonging.EntityUniqueID);
            if (dialogIndex === -1) {
                var componentFactory = this.componentFactoryResolver.resolveComponentFactory(ToastNotificationWrapperComponent);
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
            // DOM
            var domElem = _ComponentRef.hostView.rootNodes[0];
            var targetNode = document.getElementById('toast-wrapper');
            var toastEntity = document.createElement('div');
            toastEntity.setAttribute('id', _ComponentRef.instance.toastNotificationBelonging.EntityUniqueID);
            toastEntity.className = 'toast-entity';
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
                this.toastComponentRefList[modalIndex].instance.closeParent$('close-fast').pipe(operators.map(function (item) {
                    var modalIndex = _this.findDialogIndex(_EntityUniqueID);
                    if (_this.toastComponentRefList[modalIndex]) {
                        var toastEntity = document.getElementById(_this.toastComponentRefList[modalIndex].instance.toastNotificationBelonging.EntityUniqueID);
                        toastEntity.remove();
                        // console.log(`%c ${this.toastComponentRefList[modalIndex].instance.toastNotificationBelonging.EntityUniqueID} `, `background: #cc3333; color: #fff`);
                        _this.appRef.detachView(_this.toastComponentRefList[modalIndex].hostView);
                        _this.toastComponentRefList[modalIndex].destroy();
                        _this.toastComponentRefList.splice(modalIndex, 1);
                    }
                })).subscribe();
            }
        };
        ToastNotificationService.prototype.findDialogIndex = function (_DialogUniqueID) {
            return this.toastComponentRefList.findIndex(function (item) {
                return _DialogUniqueID === item.instance.toastNotificationBelonging.EntityUniqueID;
            });
        };
        return ToastNotificationService;
    }());
    ToastNotificationService.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function ToastNotificationService_Factory() { return new ToastNotificationService(i0__namespace.ɵɵinject(i0__namespace.ComponentFactoryResolver), i0__namespace.ɵɵinject(i0__namespace.INJECTOR), i0__namespace.ɵɵinject(i0__namespace.ApplicationRef), i0__namespace.ɵɵinject(ToastNotificationConfigService)); }, token: ToastNotificationService, providedIn: "root" });
    ToastNotificationService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    ToastNotificationService.ctorParameters = function () { return [
        { type: i0.ComponentFactoryResolver },
        { type: i0.Injector },
        { type: i0.ApplicationRef },
        { type: ToastNotificationConfigService }
    ]; };

    exports.ɵl                               = void 0;
    (function (ToastNotificationClass) {
        // region *** Public ***
        var ToastNotificationInitializer                  = /** @class */ (function () {
            function ToastNotificationInitializer() {
                this.toastNotificationCarrier = new ToastNotificationClass.ToastNotificationCarrier();
            }

            ToastNotificationInitializer.prototype.openToastNotification$ = function () {
                return this.toastNotificationCarrier.openToastNotification$().pipe(operators.map(function (resp) {
                    var basicToastNotificationResponse = new ToastNotificationResponse();
                    var dataControl                    = new GlobalClass.DataControl();
                    dataControl.copyValuesFrom(resp, basicToastNotificationResponse);
                    return basicToastNotificationResponse;
                }));
            };
            ToastNotificationInitializer.prototype.setButtons             = function (_Buttons) {
                this.toastNotificationCarrier.setButtons(_Buttons);
            };
            ToastNotificationInitializer.prototype.setConfig              = function (_ToastNotificationConfig) {
                this.toastNotificationCarrier.setConfig(_ToastNotificationConfig);
            };
            ToastNotificationInitializer.prototype.setDispatch            = function (_Title, _Message) {
                if (_Message === void 0) { _Message = null; }
                this.toastNotificationCarrier.setTitle(_Title);
                this.toastNotificationCarrier.setMessage(_Message);
            };
            ToastNotificationInitializer.prototype.setTitle               = function (_Title) {
                this.toastNotificationCarrier.setTitle(_Title);
            };
            ToastNotificationInitializer.prototype.setMessage             = function (_Message) {
                this.toastNotificationCarrier.setMessage(_Message);
            };
            ToastNotificationInitializer.prototype.setButtonLabels        = function (_Confirm, _Decline) {
                this.toastNotificationCarrier.setButtonLabels(_Confirm, _Decline);
            };
            return ToastNotificationInitializer;
        }());
        ToastNotificationClass.ToastNotificationInitializer = ToastNotificationInitializer;
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
        }(GlobalClass.DataControl));
        ToastNotificationClass.ToastNotificationResponse = ToastNotificationResponse;
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
        ToastNotificationClass.ToastNotificationEventsController = ToastNotificationEventsController;
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
        ToastNotificationClass.ToastNotificationDefaultResponse = ToastNotificationDefaultResponse;
        var ToastNotificationCarrier = /** @class */ (function () {
            function ToastNotificationCarrier() {
                this.toastNotificationBelonging = new ToastNotificationClass.ToastNotificationBelonging();
            }

            ToastNotificationCarrier.prototype.setButtons             = function (_Buttons) {
                if (_Buttons.length) {
                    this.toastNotificationBelonging.Buttons = _Buttons;
                }
            };
            ToastNotificationCarrier.prototype.setTitle               = function (_Title) {
                this.toastNotificationBelonging.Dispatch.Title = _Title;
            };
            ToastNotificationCarrier.prototype.setMessage             = function (_Message) {
                this.toastNotificationBelonging.Dispatch.Message = _Message;
            };
            ToastNotificationCarrier.prototype.setButtonLabels        = function (_Confirm, _Decline) {
                this.toastNotificationBelonging.ToastCoreConfig.ConfirmLabel = _Confirm;
                this.toastNotificationBelonging.ToastCoreConfig.DeclineLabel = _Decline;
            };
            ToastNotificationCarrier.prototype.setConfig              = function (_ToastNotificationBelonging) {
                // region *** local UserConfig (defined on place where dialog is called) ***
                var dataControl = new GlobalClass.DataControl();
                dataControl.copyValuesFrom(_ToastNotificationBelonging, this.toastNotificationBelonging.ToastCoreConfig);
                // endregion
            };
            ToastNotificationCarrier.prototype.openToastNotification$ = function () {
                if (!this.toastNotificationBelonging.Dispatch.Title
                    && !this.toastNotificationBelonging.Dispatch.Message) {
                    throw Error('Toast message fail.');
                }
                var service = ServiceLocator.injector.get(ToastNotificationService);
                return service.openToast$(this.toastNotificationBelonging);
            };
            return ToastNotificationCarrier;
        }());
        ToastNotificationClass.ToastNotificationCarrier = ToastNotificationCarrier;
        var GlobalToastSettings = /** @class */ (function () {
            function GlobalToastSettings() {
                this.AllowedNotificationsAtOnce = null;
            }
            return GlobalToastSettings;
        }());
        ToastNotificationClass.GlobalToastSettings = GlobalToastSettings;
        var Settings = /** @class */ (function () {
            function Settings() {
                this.Buttons         = [];
                this.ToastCoreConfig = new ToastCoreConfig();
                this.Dispatch        = new GlobalClass.Dispatch();
                this.GlobalSettings  = new GlobalToastSettings();
            }
            return Settings;
        }());
        ToastNotificationClass.Settings = Settings;
        var ToastCoreConfig = /** @class */ (function () {
            function ToastCoreConfig() {
                this.Width            = null;
                this.Height           = null;
                this.ButtonPosition   = null;
                this.LayoutType       = null;
                this.Dispatch         = null;
                this.ConfirmLabel     = null;
                this.DeclineLabel     = null;
                this.AutoCloseDelay   = null;
                this.DisableIcon      = null;
                this.AllowHTMLMessage = null;
            }
            return ToastCoreConfig;
        }());
        ToastNotificationClass.ToastCoreConfig = ToastCoreConfig;
        var ToastNotificationBelonging = /** @class */ (function (_super) {
            __extends(ToastNotificationBelonging, _super);
            function ToastNotificationBelonging() {
                var _this                         = _super.call(this) || this;
                _this.EntityUniqueID              = 'T' + Math.random().toString(36).substr(2, 9);
                _this.EventsController            = new ToastNotificationEventsController(_this.EntityUniqueID);
                var toastNotificationConfigurator = ServiceLocator.injector.get(ToastNotificationConfigService);
                var baseSettings                  = new ToastNotificationClass.Settings();
                var dataControl                   = new GlobalClass.DataControl();
                dataControl.copyValuesFrom(toastNotificationConfigurator.productionConfig.ToastCoreConfig, baseSettings.ToastCoreConfig);
                _this.ToastCoreConfig = baseSettings.ToastCoreConfig;
                _this.Buttons         = toastNotificationConfigurator.productionConfig.Buttons.slice();
                return _this;
            }

            return ToastNotificationBelonging;
        }(ToastNotificationClass.Settings));
        ToastNotificationClass.ToastNotificationBelonging = ToastNotificationBelonging;
    })(exports.ɵl || (exports.ɵl = {}));

    var DefaultLoaderComponent = /** @class */ (function () {
        function DefaultLoaderComponent() {
        }
        return DefaultLoaderComponent;
    }());
    DefaultLoaderComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'ed-default-loader',
                    template: "<div class=\"box-position\">\n\t<div class=\"loader-center\">\n\t\t<div class=\"lds-ring\">\n\t\t\t<div></div>\n\t\t\t<div></div>\n\t\t\t<div></div>\n\t\t\t<div></div>\n\t\t</div>\n\t</div>\n</div>\n",
                    styles: [".box-position{position:absolute;top:44%;left:50%;height:auto;margin:0 auto;transform:translate(-50%,-40%);text-align:center}.box-position .loader-center{display:flex;align-items:center;justify-content:center}.box-position .loader-center .lds-ring{position:relative;display:inline-block;width:80px;height:80px}.box-position .loader-center .lds-ring div{position:absolute;display:block;box-sizing:border-box;width:64px;height:64px;margin:8px;animation:lds-ring 1.2s cubic-bezier(.5,0,.5,1) infinite;border:8px solid transparent;border-top-color:#d4d4d4;border-radius:50%}.box-position .loader-center .lds-ring div:first-child{animation-delay:-.45s}.box-position .loader-center .lds-ring div:nth-child(2){animation-delay:-.3s}.box-position .loader-center .lds-ring div:nth-child(3){animation-delay:-.15s}@keyframes lds-ring{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}"]
                },] }
    ];

    var DialogConfigService = /** @class */ (function () {
        function DialogConfigService(userConfig) {
            if (userConfig === void 0) { userConfig = {}; }
            this.userConfig = userConfig;
            this.authorConfig = new exports.ɵe.DialogSettings();
            this.productionConfig = new exports.ɵe.DialogSettings();
            // region *** dialog userConfig (user input app-module) ***
            var userConfigBase = new exports.ɵe.DialogSettings();
            var dataControl = new GlobalClass.DataControl();
            dataControl.copyValuesFrom(userConfig.DialogCoreConfig, userConfigBase.DialogCoreConfig); // this will make sure that object has right properties
            userConfig.DialogCoreConfig = userConfigBase.DialogCoreConfig;
            if (userConfig.DialogCoreConfig.LoaderComponent !== null) {
                userConfig.DialogCoreConfig.DisplayLoader = userConfig.DialogCoreConfig.DisplayLoader === null;
            }
            // endregion
            // region *** author default config values (if there is no user input) ***
            this.authorConfig.DialogCoreConfig.Width = 'auto';
            this.authorConfig.DialogCoreConfig.Height = 'auto';
            this.authorConfig.DialogCoreConfig.ButtonPosition = 'right';
            this.authorConfig.DialogCoreConfig.DisplayLoader = false;
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

    var InsertionDirective = /** @class */ (function () {
        function InsertionDirective(viewContainerRef) {
            this.viewContainerRef = viewContainerRef;
        }
        return InsertionDirective;
    }());
    InsertionDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[appInsertion]',
                },] }
    ];
    InsertionDirective.ctorParameters = function () { return [
        { type: i0.ViewContainerRef }
    ]; };

    var InsertionLoaderDirective = /** @class */ (function () {
        function InsertionLoaderDirective(viewContainerRef) {
            this.viewContainerRef = viewContainerRef;
        }
        return InsertionLoaderDirective;
    }());
    InsertionLoaderDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[appInsertionLoader]',
                },] }
    ];
    InsertionLoaderDirective.ctorParameters = function () { return [
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
            this.loadChildComponent(this.childComponentType);
            this.loadLoaderComponent(this.dialogBelonging.DialogCoreConfig.LoaderComponent);
            this.setDefaultResponse();
            this.cd.detectChanges();
        };
        DialogWrapperComponent.prototype.setDefaultResponse = function () {
            var dialogResponse = new exports.ɵe.DialogDefaultResponse();
            dialogResponse.setBelonging(this.dialogBelonging);
            this.dialogBelonging.EventsController.setDefaultResponse(dialogResponse);
        };
        DialogWrapperComponent.prototype.ngOnDestroy = function () {
            if (this.childComponentRef) {
                this.childComponentRef.destroy();
            }
            if (this.loaderComponentRef) {
                this.loaderComponentRef.destroy();
            }
        };
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
        return DialogWrapperComponent;
    }());
    DialogWrapperComponent.decorators        = [
        { type: i0.Component, args: [{
                    selector: 'dialog-popup-wrapper',
                    template: "<div class=\"ngx-awesome-popup-overlay\" (dblclick)=\"onOverlayClicked($event)\" [@fadeInOut]=\"fadeInOutAnimation\">\n\t\n\t<div class=\"evolve-parent-dialog\"\n\t\t\t[ngClass]=\"{\n          'standard-dialog': dialogBelonging.DialogCoreConfig.LayoutType === 0,\n          'success-dialog': dialogBelonging.DialogCoreConfig.LayoutType === 1,\n          'info-dialog': dialogBelonging.DialogCoreConfig.LayoutType === 2,\n          'warning-dialog': dialogBelonging.DialogCoreConfig.LayoutType === 3,\n          'danger-dialog': dialogBelonging.DialogCoreConfig.LayoutType === 4\n        }\"\n\t>\n\t\t<div class=\"loader-holder\" [ngClass]=\"!dialogBelonging.DialogCoreConfig.DisplayLoader ? 'dialog-loader-off' : (showLoader ? 'dialog-loader-active' : 'dialog-loader-gone')\">\n\t\t\t<!--dialogBelonging.DialogCoreConfig.DisplayLoader => initial config-->\n\t\t\t<div class=\"dialog-loader\">\n\t\t\t\t<ng-template appInsertionLoader></ng-template>\n\t\t\t</div>\n\t\t</div>\n\t\t\n\t\t<div class=\"content-holder\" [ngStyle]=\"{'width': dialogBelonging.DialogCoreConfig.Width, 'height': dialogBelonging.DialogCoreConfig.Height}\">\n\n\t\t\t<!--dialogBelonging.DialogCoreConfig.DisplayLoader => initial config-->\n\t\t\t<div class=\"component-content\" [ngClass]=\"!dialogBelonging.DialogCoreConfig.DisplayLoader ? 'component-content-loader-off' : (showLoader ? 'component-content-preparing' : 'component-content-ready')\">\n\t\t\t\t<ng-template appInsertion></ng-template>\n\t\t\t</div>\n\t\t\t\n\t\t</div>\n\t\t\n\t\t<div class=\"button-holder\">\n\t\t\t<div class=\"button-section\" *ngIf=\"dialogBelonging.Buttons.length > 0\" [ngStyle]=\"{ 'text-align': dialogBelonging.DialogCoreConfig.ButtonPosition }\">\n\t\t\t\t\n\t\t\t\t<button\n\t\t\t\t\t\tclass=\"ed-btn ed-btn-lg\" *ngFor=\"let button of dialogBelonging.Buttons\" (click)=\"onCustomButton(button)\"\n\t\t\t\t\t\t[ngClass]=\"{\n\t\t\t                   '': (button.LayoutType ? (button.LayoutType === 0)  : false),\n                              'ed-btn-success': (button.LayoutType ? (button.LayoutType === 1) : false),\n                              'ed-btn-info': (button.LayoutType ? (button.LayoutType === 2) : false),\n                              'ed-btn-warning': (button.LayoutType ? (button.LayoutType === 3)  : false),\n                              'ed-btn-danger': (button.LayoutType ? (button.LayoutType === 4)  : false),\n                              'ed-btn-dark': (button.LayoutType ? (button.LayoutType === 5)  : false),\n                              'ed-btn-light': (button.LayoutType ? (button.LayoutType === 6)  : false),\n                               'ed-btn-primary': (button.LayoutType ? (button.LayoutType === 7) : false),\n                              'ed-btn-secondary': (button.LayoutType ? (button.LayoutType === 8)  : false),\n                              'ed-btn-link': (button.LayoutType ? (button.LayoutType === 9)  : false)\n                            }\"\n\t\t\t\t>{{button.Label}}</button>\n\t\t\t\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t\n</div>\n",
                    animations: [fadeInOut(0, 1)],
                styles: ["@charset \"UTF-8\";.ed-btn-sm{font-size:12px;font-weight:400;margin-right:3px;min-width:40px;padding:2px 8px}.ed-btn-md{font-size:14px;margin-right:5px;min-width:60px;padding:3px 10px}.ed-btn-lg{font-size:16px;margin-right:5px;min-width:70px;padding:4px 10px}.ed-btn{background-color:initial;border:none;border-radius:3px;cursor:pointer;display:inline-block;line-height:1.5;text-align:center;text-decoration:none;-webkit-user-select:none;user-select:none;vertical-align:middle}.ed-btn:hover{color:#989ea5}.ed-btn-check:focus+.ed-btn,.ed-btn:focus{box-shadow:0 0 1px 2px;outline:0}.ed-btn-check:active+.ed-btn,.ed-btn-check:active+.ed-btn:focus,.ed-btn-check:checked+.ed-btn,.ed-btn-check:checked+.ed-btn:focus,.ed-btn.active,.ed-btn.active:focus,.ed-btn:active,.ed-btn:active:focus{box-shadow:0 0 1px 2px}.ed-btn.disabled,.ed-btn:disabled,fieldset:disabled .ed-btn{box-shadow:none;opacity:.6;pointer-events:none}.ed-btn-primary{color:hsla(0,0%,98.4%,.8);background:#ff9e00;border-color:#ff9e00}.ed-btn-primary:hover{color:#fbfbfb;border-color:#ffa81a;background:#ffb133}.ed-btn-check:focus+.ed-btn-primary,.ed-btn-primary:focus{outline:0;box-shadow:0 0 1px 2px #ffa81a}.ed-btn-check:active+.ed-btn-primary,.ed-btn-check:active+.ed-btn-primary:focus,.ed-btn-check:checked+.ed-btn-primary,.ed-btn-check:checked+.ed-btn-primary:focus,.ed-btn-primary.active,.ed-btn-primary.active:focus,.ed-btn-primary:active,.ed-btn-primary:active:focus{box-shadow:0 0 1px 2px #ffa81a}.ed-btn-secondary{color:hsla(0,0%,98.4%,.8);background:#989ea5;border-color:#989ea5}.ed-btn-secondary:hover{color:#fbfbfb;border-color:#a6abb1;background:#b3b8bd}.ed-btn-check:focus+.ed-btn-secondary,.ed-btn-secondary:focus{outline:0;box-shadow:0 0 1px 2px #a6abb1}.ed-btn-check:active+.ed-btn-secondary,.ed-btn-check:active+.ed-btn-secondary:focus,.ed-btn-check:checked+.ed-btn-secondary,.ed-btn-check:checked+.ed-btn-secondary:focus,.ed-btn-secondary.active,.ed-btn-secondary.active:focus,.ed-btn-secondary:active,.ed-btn-secondary:active:focus{box-shadow:0 0 1px 2px #a6abb1}.ed-btn-success{color:hsla(0,0%,98.4%,.8);background:#3caea3;border-color:#3caea3}.ed-btn-success:hover{color:#fbfbfb;border-color:#45bfb3;background:#58c5bb}.ed-btn-check:focus+.ed-btn-success,.ed-btn-success:focus{outline:0;box-shadow:0 0 1px 2px #45bfb3}.ed-btn-check:active+.ed-btn-success,.ed-btn-check:active+.ed-btn-success:focus,.ed-btn-check:checked+.ed-btn-success,.ed-btn-check:checked+.ed-btn-success:focus,.ed-btn-success.active,.ed-btn-success.active:focus,.ed-btn-success:active,.ed-btn-success:active:focus{box-shadow:0 0 1px 2px #45bfb3}.ed-btn-info{color:hsla(0,0%,98.4%,.8);background:#2f8ee5;border-color:#2f8ee5}.ed-btn-info:hover{color:#fbfbfb;border-color:#469ae8;background:#5ca7eb}.ed-btn-check:focus+.ed-btn-info,.ed-btn-info:focus{outline:0;box-shadow:0 0 1px 2px #469ae8}.ed-btn-check:active+.ed-btn-info,.ed-btn-check:active+.ed-btn-info:focus,.ed-btn-check:checked+.ed-btn-info,.ed-btn-check:checked+.ed-btn-info:focus,.ed-btn-info.active,.ed-btn-info.active:focus,.ed-btn-info:active,.ed-btn-info:active:focus{box-shadow:0 0 1px 2px #469ae8}.ed-btn-warning{color:hsla(0,0%,98.4%,.8);background:#ffc107;border-color:#ffc107}.ed-btn-warning:hover{color:#fbfbfb;border-color:#ffc721;background:#ffce3a}.ed-btn-check:focus+.ed-btn-warning,.ed-btn-warning:focus{outline:0;box-shadow:0 0 1px 2px #ffc721}.ed-btn-check:active+.ed-btn-warning,.ed-btn-check:active+.ed-btn-warning:focus,.ed-btn-check:checked+.ed-btn-warning,.ed-btn-check:checked+.ed-btn-warning:focus,.ed-btn-warning.active,.ed-btn-warning.active:focus,.ed-btn-warning:active,.ed-btn-warning:active:focus{box-shadow:0 0 1px 2px #ffc721}.ed-btn-danger{color:hsla(0,0%,98.4%,.8);background:#e46464;border-color:#e46464}.ed-btn-danger:hover{color:#fbfbfb;border-color:#e87a7a;background:#ec8f8f}.ed-btn-check:focus+.ed-btn-danger,.ed-btn-danger:focus{outline:0;box-shadow:0 0 1px 2px #e87a7a}.ed-btn-check:active+.ed-btn-danger,.ed-btn-check:active+.ed-btn-danger:focus,.ed-btn-check:checked+.ed-btn-danger,.ed-btn-check:checked+.ed-btn-danger:focus,.ed-btn-danger.active,.ed-btn-danger.active:focus,.ed-btn-danger:active,.ed-btn-danger:active:focus{box-shadow:0 0 1px 2px #e87a7a}.ed-btn-light{color:rgba(52,58,64,.8);background:#fbfbfb;border-color:#fbfbfb}.ed-btn-light:hover{color:#343a40;border-color:#fff;background:#fff}.ed-btn-check:focus+.ed-btn-light,.ed-btn-light:focus{outline:0;box-shadow:0 0 1px 2px #fff}.ed-btn-check:active+.ed-btn-light,.ed-btn-check:active+.ed-btn-light:focus,.ed-btn-check:checked+.ed-btn-light,.ed-btn-check:checked+.ed-btn-light:focus,.ed-btn-light.active,.ed-btn-light.active:focus,.ed-btn-light:active,.ed-btn-light:active:focus{box-shadow:0 0 1px 2px #fff}.ed-btn-dark{color:hsla(0,0%,98.4%,.8);background:#343a40;border-color:#343a40}.ed-btn-dark:hover{color:#fbfbfb;border-color:#3f474e;background:#4b545c}.ed-btn-check:focus+.ed-btn-dark,.ed-btn-dark:focus{outline:0;box-shadow:0 0 1px 2px #3f474e}.ed-btn-check:active+.ed-btn-dark,.ed-btn-check:active+.ed-btn-dark:focus,.ed-btn-check:checked+.ed-btn-dark,.ed-btn-check:checked+.ed-btn-dark:focus,.ed-btn-dark.active,.ed-btn-dark.active:focus,.ed-btn-dark:active,.ed-btn-dark:active:focus{box-shadow:0 0 1px 2px #3f474e}@font-face{font-family:icomoon;src:url(../assets/fonts/icomoon.eot?vap0ng);src:url(../assets/fonts/icomoon.eot?vap0ng#iefix) format(\"embedded-opentype\"),url(../assets/fonts/icomoon.ttf?vap0ng) format(\"truetype\"),url(../assets/fonts/icomoon.woff?vap0ng) format(\"woff\"),url(../assets/fonts/icomoon.svg?vap0ng#icomoon) format(\"svg\");font-weight:400;font-style:normal;font-display:block}[class*=\" icon-\"],[class^=icon-]{font-family:icomoon!important;speak:never;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;line-height:1;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.icon-times-circle:before{content:\"\uE900\"}.icon-exclamation-triangle:before,.icon-warning:before{content:\"\uE901\"}.icon-check-circle:before{content:\"\uE902\"}.icon-info-circle:before{content:\"\uE903\"}.ngx-awesome-popup-overlay{align-items:center;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px);background:rgba(51,32,0,.4);bottom:0;display:flex;flex-direction:column;justify-content:center;left:0;opacity:0;position:fixed;right:0;top:0;z-index:1000}.evolve-confirm-box .text-wrapper-section,.evolve-parent-dialog .text-wrapper-section,.evolve-toast .text-wrapper-section{width:100%}.evolve-confirm-box .text-wrapper-section .text-wrapper,.evolve-parent-dialog .text-wrapper-section .text-wrapper,.evolve-toast .text-wrapper-section .text-wrapper{display:block;text-align:center;width:100%}.evolve-confirm-box .text-wrapper-section .dont-break-out,.evolve-parent-dialog .text-wrapper-section .dont-break-out,.evolve-toast .text-wrapper-section .dont-break-out{-webkit-hyphens:auto;hyphens:auto;overflow-wrap:break-word;white-space:pre-wrap;word-wrap:break-word}.evolve-confirm-box,.evolve-parent-dialog{background:#fbfbfb;border-radius:5px;border-top:7px solid;box-shadow:0 0 4px 1px rgba(0,0,0,.25);display:flex;flex-direction:column;max-height:calc(100vh - 100px);max-width:calc(100vw - 100px);position:relative;vertical-align:bottom}.evolve-confirm-box.standard-dialog,.evolve-parent-dialog.standard-dialog{border-color:transparent;padding:17px 20px 10px}.evolve-confirm-box.success-dialog,.evolve-parent-dialog.success-dialog{border-color:#3caea3}.evolve-confirm-box.info-dialog,.evolve-parent-dialog.info-dialog{border-color:#2f8ee5}.evolve-confirm-box.warning-dialog,.evolve-parent-dialog.warning-dialog{border-color:#ffc107}.evolve-confirm-box.danger-dialog,.evolve-parent-dialog.danger-dialog{border-color:#e46464}.ap-icon-success{color:#58c5bb}.ap-icon-info{color:#5ca7eb}.ap-icon-warning{color:#ffce3a}.ap-icon-danger{color:#ec8f8f}.evolve-parent-dialog{padding:20px 20px 10px}.evolve-parent-dialog .component-content{height:100%;max-width:95vw;transition-delay:.4s;transition-duration:.4s;transition-property:opacity;transition-timing-function:linear;width:100%}.evolve-parent-dialog .component-content-loader-off{transition:none!important;opacity:1!important}.evolve-parent-dialog .component-content-preparing{transition:none!important;opacity:0}.evolve-parent-dialog .component-content-ready{height:100%;opacity:1}.evolve-parent-dialog .dialog-loader{opacity:1}.evolve-parent-dialog .dialog-loader-off{display:none;opacity:0!important}.evolve-parent-dialog .dialog-loader-gone{opacity:0;pointer-events:none}.evolve-parent-dialog .dialog-loader-active{opacity:1}.loader-holder{position:absolute;transition-delay:.4s;transition-timing-function:linear;transition-duration:.4s;transition-property:opacity;opacity:1;justify-content:center;align-items:center;background:#fbfbfb;width:100%;height:100%;margin:-20px}.content-holder,.loader-holder{display:flex;flex-direction:column}.content-holder{overflow:auto}.button-holder{width:100%;display:flex;justify-content:flex-end;flex-direction:column}.button-holder .button-section{margin:20px -20px -10px;border-top:1px solid rgba(152,158,165,.2);background:rgba(222,226,230,.2);padding:5px 20px}"]
                },] }
    ];
    DialogWrapperComponent.ctorParameters = function () { return [
        { type: exports.ɵe.DialogBelonging },
        { type: i0.ComponentFactoryResolver },
        { type: i0.ChangeDetectorRef }
    ]; };
    DialogWrapperComponent.propDecorators = {
        insertionPoint: [{ type: i0.ViewChild, args: [InsertionDirective, { static: true },] }],
        loaderInsertionPoint: [{ type: i0.ViewChild, args: [InsertionLoaderDirective, { static: true },] }]
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
                weakMap.set(exports.ɵe.DialogEventsController, _EventsController);
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
        DialogService.prototype.childComponentResolver = function () {
        };
        DialogService.prototype.appendToBodyParentComponent = function (_ComponentRef) {
            // attach view to ignite lifecycle hooks
            this.appRef.attachView(_ComponentRef.hostView);
            // DOM
            var domElem = _ComponentRef.hostView.rootNodes[0];
            document.body.appendChild(domElem);
        };
        DialogService.prototype.closeDialogWrapperComponent = function (_DialogUniqueID) {
            var modalIndex = this.findDialogIndex(_DialogUniqueID);
            this.removeFromBodyDialogWrapperComponent(modalIndex);
        };
        DialogService.prototype.removeFromBodyDialogWrapperComponent = function (_DialogIndex) {
            var _this = this;
            if (_DialogIndex > -1) {
                this.dialogParentComponentRefList[_DialogIndex].instance.closeParent$('close-fast').pipe(operators.map(function (item) {
                    _this.appRef.detachView(_this.dialogParentComponentRefList[_DialogIndex].hostView);
                    _this.dialogParentComponentRefList[_DialogIndex].destroy();
                    _this.dialogParentComponentRefList.splice(_DialogIndex, 1);
                })).subscribe();
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

    exports.ɵe = void 0;
    (function (DialogClass) {
        // region *** Public ***
        var DialogInitializer = /** @class */ (function () {
            function DialogInitializer(component) {
                this.component = component;
                this.dialogCarrier = new DialogClass.DialogCarrier();
                this.dialogCarrier.setComponent(this.component);
            }
            /** Generic method accept expected payload from dynamic child component.*/
            DialogInitializer.prototype.openDialog$ = function () {
                return this.dialogCarrier.openDialog$().pipe(operators.map(function (resp) {
                    var basicDialogResponse = new DialogResponse();
                    var dataControl = new GlobalClass.DataControl();
                    dataControl.copyValuesFrom(resp, basicDialogResponse);
                    return basicDialogResponse;
                }));
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
        DialogClass.DialogInitializer = DialogInitializer;
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
        }(GlobalClass.DataControl));
        DialogClass.DialogResponse = DialogResponse;
        var DialogEventsController = /** @class */ (function () {
            function DialogEventsController(EntityUniqueID) {
                this.EntityUniqueID = EntityUniqueID;
                this._afterClosed   = new rxjs.Subject();
                this.afterClosed$   = this._afterClosed.asObservable();
                this._afterLoader   = new rxjs.Subject();
                this.afterLoader$   = this._afterLoader.asObservable();
                this._onButtonClick = new rxjs.Subject();
                this.onButtonClick$ = this._onButtonClick.asObservable();
                this._buttonList    = new rxjs.Subject();
                this.buttonList$    = this._buttonList.asObservable();
            }

            DialogEventsController.prototype.close       = function (_Payload) {
                if (_Payload === void 0) { _Payload = null; }
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
        DialogClass.DialogEventsController = DialogEventsController;
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
        DialogClass.DialogDefaultResponse = DialogDefaultResponse;
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
                var dataControl = new GlobalClass.DataControl();
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
        DialogClass.DialogCarrier = DialogCarrier;
        var DialogCoreConfig = /** @class */ (function () {
            function DialogCoreConfig() {
                this.Width = null;
                this.Height = null;
                this.ButtonPosition = null;
                this.LayoutType = null;
                this.DisplayLoader = null;
                this.LoaderComponent = null;
            }
            return DialogCoreConfig;
        }());
        DialogClass.DialogCoreConfig = DialogCoreConfig;
        var DialogSettings = /** @class */ (function () {
            function DialogSettings() {
                this.Buttons = [];
                this.DialogCoreConfig = new DialogCoreConfig();
            }
            return DialogSettings;
        }());
        DialogClass.DialogSettings = DialogSettings;
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
                var dataControl = new GlobalClass.DataControl();
                dataControl.copyValuesFrom(dialogConfigurator.productionConfig.DialogCoreConfig, baseSettings.DialogCoreConfig);
                _this.DialogCoreConfig = baseSettings.DialogCoreConfig;
                _this.Buttons = dialogConfigurator.productionConfig.Buttons.slice();
                return _this;
            }
            return DialogBelonging;
        }(DialogSettings));
        DialogClass.DialogBelonging = DialogBelonging;
    })(exports.ɵe || (exports.ɵe = {}));

    var NgxAwesomePopupModule = /** @class */ (function () {
        function NgxAwesomePopupModule(injector, gConfigService) {
            this.injector = injector;
            this.gConfigService = gConfigService;
            ServiceLocator.injector = injector;
        }
        NgxAwesomePopupModule.forRoot = function (globalConfig) {
            return {
                ngModule: NgxAwesomePopupModule,
                providers: [GlobalConfigService, { provide: 'globalConfig', useValue: globalConfig }]
            };
        };
        return NgxAwesomePopupModule;
    }());
    NgxAwesomePopupModule.decorators         = [
        { type: i0.NgModule, args: [{
                    declarations: [
                        DialogWrapperComponent,
                        InsertionDirective,
                        InsertionLoaderDirective,
                        DefaultLoaderComponent,
                        ConfirmBoxWrapperComponent,
                        ToastNotificationWrapperComponent
                    ],
                    imports: [
                        common.CommonModule,
                        platformBrowser.BrowserModule,
                        animations$1.BrowserAnimationsModule
                    ],
                    providers: [
                        DialogService,
                        ConfirmBoxService,
                        ToastNotificationService,
                        GlobalConfigService,
                        DialogConfigService,
                        ConfirmBoxConfigService,
                        ToastNotificationConfigService,
                        exports.ɵe.DialogBelonging,
                        exports.ɵh.ConfirmBoxBelonging,
                        exports.ɵl.ToastNotificationBelonging
                    ],
                    entryComponents: [
                        DialogWrapperComponent,
                        DefaultLoaderComponent,
                        ConfirmBoxWrapperComponent,
                        ToastNotificationWrapperComponent
                    ]
                },] }
    ];
    NgxAwesomePopupModule.ctorParameters = function () { return [
        { type: i0.Injector },
        { type: GlobalConfigService }
    ]; };
    var DialogConfigModule = /** @class */ (function () {
        function DialogConfigModule() {
        }
        DialogConfigModule.forRoot = function (dialogConfig) {
            return {
                ngModule: DialogConfigModule,
                providers: [DialogConfigService, { provide: 'dialogConfig', useValue: dialogConfig }]
            };
        };
        return DialogConfigModule;
    }());
    DialogConfigModule.decorators = [
        { type: i0.NgModule, args: [{},] }
    ];
    var ConfirmBoxConfigModule = /** @class */ (function () {
        function ConfirmBoxConfigModule() {
        }
        ConfirmBoxConfigModule.forRoot = function (confirmBoxConfig) {
            return {
                ngModule: ConfirmBoxConfigModule,
                providers: [ConfirmBoxConfigService, { provide: 'confirmBoxConfig', useValue: confirmBoxConfig }]
            };
        };
        return ConfirmBoxConfigModule;
    }());
    ConfirmBoxConfigModule.decorators = [
        { type: i0.NgModule, args: [{},] }
    ];
    var ToastNotificationConfigModule        = /** @class */ (function () {
        function ToastNotificationConfigModule() {
        }
        ToastNotificationConfigModule.forRoot = function (toastNotificationConfig) {
            return {
                ngModule: ToastNotificationConfigModule,
                providers: [ToastNotificationConfigService, { provide: 'toastNotificationConfig', useValue: toastNotificationConfig }]
            };
        };
        return ToastNotificationConfigModule;
    }());
    ToastNotificationConfigModule.decorators = [
        { type: i0.NgModule, args: [{},] }
    ];

    var ButtonMaker                  = GlobalClass.ButtonMaker;
    var ConfirmBoxInitializer        = exports.ɵh.ConfirmBoxInitializer;
    var ToastNotificationInitializer = exports.ɵl.ToastNotificationInitializer;
    var DialogInitializer            = exports.ɵe.DialogInitializer;
    var DialogBelonging              = exports.ɵe.DialogBelonging;
    // endregion

    /**
     * Generated bundle index. Do not edit.
     */

    exports.ButtonMaker                   = ButtonMaker;
    exports.ConfirmBoxConfigModule        = ConfirmBoxConfigModule;
    exports.ConfirmBoxInitializer         = ConfirmBoxInitializer;
    exports.DialogBelonging               = DialogBelonging;
    exports.DialogConfigModule            = DialogConfigModule;
    exports.DialogInitializer             = DialogInitializer;
    exports.NgxAwesomePopupModule         = NgxAwesomePopupModule;
    exports.ToastNotificationConfigModule = ToastNotificationConfigModule;
    exports.ToastNotificationInitializer  = ToastNotificationInitializer;
    exports.ɵa                            = DialogWrapperComponent;
    exports.ɵb                            = fadeInOut;
    exports.ɵc                            = InsertionDirective;
    exports.ɵd                            = InsertionLoaderDirective;
    exports.ɵf                            = DefaultLoaderComponent;
    exports.ɵg                            = ConfirmBoxWrapperComponent;
    exports.ɵi                            = ToastNotificationWrapperComponent;
    exports.ɵj                            = GlobalConfigService;
    exports.ɵm                            = DialogService;
    exports.ɵn                            = ConfirmBoxService;
    exports.ɵo                            = ToastNotificationService;
    exports.ɵp                            = ToastNotificationConfigService;
    exports.ɵr                            = DialogConfigService;
    exports.ɵt                            = ConfirmBoxConfigService;

    Object.defineProperty(exports, '__esModule', {value: true});

})));
//# sourceMappingURL=costlydeveloper-ngx-awesome-popup.umd.js.map
