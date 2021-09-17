import * as i0 from '@angular/core';
import { Injectable, Inject, Component, ChangeDetectorRef, ComponentFactoryResolver, Injector, ApplicationRef, Directive, ViewContainerRef, ViewChild, NgModule } from '@angular/core';
import { Observable, Subject, BehaviorSubject, of } from 'rxjs';
import { delay, map, take, tap } from 'rxjs/operators';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// @dynamic
class ServiceLocator {
}

var DialogLayoutDisplay;
(function (DialogLayoutDisplay) {
    DialogLayoutDisplay[DialogLayoutDisplay["NONE"] = 0] = "NONE";
    DialogLayoutDisplay[DialogLayoutDisplay["SUCCESS"] = 1] = "SUCCESS";
    DialogLayoutDisplay[DialogLayoutDisplay["INFO"] = 2] = "INFO";
    DialogLayoutDisplay[DialogLayoutDisplay["WARNING"] = 3] = "WARNING";
    DialogLayoutDisplay[DialogLayoutDisplay["DANGER"] = 4] = "DANGER";
})(DialogLayoutDisplay || (DialogLayoutDisplay = {}));
var ButtonLayoutDisplay;
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
})(ButtonLayoutDisplay || (ButtonLayoutDisplay = {}));
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

class GlobalConfigService {
    constructor(userGlobalConfig) {
        this.userGlobalConfig = userGlobalConfig;
        this.productionGlobalConfig = new GlobalClass.GlobalConfig();
        this.authorGlobalConfig = new GlobalClass.GlobalConfig();
        this.userGeneratedConfig = new GlobalClass.GlobalUserConfig(userGlobalConfig);
        // region *** author global config values (if there is no user input) ***
        this.authorGlobalConfig.DisplayColor.Primary = null; // new GlobalClass.ColorProvider('#ff9e00');
        this.authorGlobalConfig.DisplayColor.Secondary = null; // new GlobalClass.ColorProvider('#989ea5');
        this.authorGlobalConfig.DisplayColor.Success = null; // new GlobalClass.ColorProvider('#3caea3');
        this.authorGlobalConfig.DisplayColor.Info = null; // new GlobalClass.ColorProvider('#2f8ee5');
        this.authorGlobalConfig.DisplayColor.Warning = null; // new GlobalClass.ColorProvider('#ffc107');
        this.authorGlobalConfig.DisplayColor.Danger = null; // new GlobalClass.ColorProvider('#e46464');
        this.authorGlobalConfig.DisplayColor.Light = null; // new GlobalClass.ColorProvider('#f8f9fa');
        this.authorGlobalConfig.DisplayColor.Dark = null; // new GlobalClass.ColorProvider('#343a40');
        // endregion
        this.productionGlobalConfig.DisplayColor = this.authorGlobalConfig.DisplayColor;
        // region *** global userConfig (user input app-module) ***
        this.setUserColors(this.userGeneratedConfig.ColorList);
        // endregion
        this.setNodeStyles(this.productionGlobalConfig.DisplayColor);
    }
    resetStyles() {
        this.setUserColors(this.userGeneratedConfig.ColorList);
        this.setNodeStyles(this.productionGlobalConfig.DisplayColor, true);
    }
    setNodeStyles(_ProductionColorTypes, _Reset = false) {
        if (_Reset) {
            let evolveDialogStyleNode = document.getElementById("ngx-awesome-popup-glob-styles");
            if (evolveDialogStyleNode) {
                evolveDialogStyleNode.remove();
            }
        }
        this.setToastStyles();
        Object.keys(_ProductionColorTypes).forEach((key) => {
            if (_ProductionColorTypes[key]) {
                this.setButtonStyling(key, _ProductionColorTypes[key]);
                this.setIconStyling(key, _ProductionColorTypes[key]);
                this.setToastStyling(key, _ProductionColorTypes[key]);
                this.setDialogFrame(key, _ProductionColorTypes[key]);
                if (ColorVariance[key.toUpperCase()] === ColorVariance.PRIMARY) {
                    this.getSheet("ngx-awesome-popup-styles").addRule(".ngx-awesome-popup-overlay", `background:  ${_ProductionColorTypes[key].TransparentDarkenVariance}!important;`);
                }
            }
        });
    }
    setUserColors(_UserColorTypes) {
        if (typeof _UserColorTypes !== "object") {
            return;
        }
        const userKeys = Object.keys(_UserColorTypes);
        const productionObjectKeys = Object.keys(this.productionGlobalConfig.DisplayColor);
        userKeys.forEach((key) => {
            if (productionObjectKeys.find((tKey) => tKey === key)) {
                if (_UserColorTypes[key]) {
                    const baseColorProvider = new GlobalClass.ColorProvider(_UserColorTypes[key]);
                    if (baseColorProvider.Base) {
                        this.productionGlobalConfig.DisplayColor[key] = baseColorProvider;
                    }
                }
                else {
                    this.productionGlobalConfig.DisplayColor[key] = null;
                }
            }
        });
    }
    getSheet(_StyleID) {
        // Create the <style> tag
        let evolveDialogStyleNode = document.getElementById(_StyleID);
        if (!evolveDialogStyleNode) {
            const headNode = document.head || document.getElementsByTagName("head")[0];
            if (!headNode) {
                return;
            }
            evolveDialogStyleNode = document.createElement("style");
            evolveDialogStyleNode.setAttribute("id", _StyleID);
            evolveDialogStyleNode.appendChild(document.createTextNode(""));
            headNode.appendChild(evolveDialogStyleNode);
        }
        return evolveDialogStyleNode ? evolveDialogStyleNode.sheet : null;
    }
    setToastStyling(_Key, _ColorProvider) {
        const standardToast = `.toast-wrapper.standard-toast .evolve-toast.${_Key.toLowerCase()}-dialog`;
        const standardToastStyle = `
        background:  ${_ColorProvider.BrightShade}!important;
        border-color: ${_ColorProvider.Brighten}!important;
        `;
        const simpleToast = `.toast-wrapper.simple-toast .evolve-toast.${_Key.toLowerCase()}-dialog`;
        const simpleToastStyle = `
        background:  ${_ColorProvider.BrightWarmly}!important;
        color:  ${_ColorProvider.Darken}!important;
        `;
        const baseProgress = `.toast-wrapper .evolve-toast.${_Key.toLowerCase()}-dialog .progress-bar`;
        const baseProgressStyle = `
        background-color:  ${_ColorProvider.Brighten}!important;
        `;
        this.getSheet("ngx-awesome-popup-glob-styles").addRule(baseProgress, baseProgressStyle);
        this.getSheet("ngx-awesome-popup-glob-styles").addRule(standardToast, standardToastStyle);
        this.getSheet("ngx-awesome-popup-glob-styles").addRule(simpleToast, simpleToastStyle);
    }
    setButtonStyling(_Key, _ColorProvider) {
        const baseButtonClass = `.ed-btn-${_Key.toLowerCase()}`;
        const baseStyle = `
        color: ${_ColorProvider.ContrastColor}!important;
        background:  ${_ColorProvider.Base}!important;
        border-color: ${_ColorProvider.BrightenForShade}!important;
        `;
        const hoverButtonClass = `.ed-btn-${_Key.toLowerCase()}:hover`;
        const hoverStyle = `
        background:  ${_ColorProvider.IsBaseBright
            ? _ColorProvider.DarkenForShade
            : _ColorProvider.BrightenForShade}!important;
        border-color: ${_ColorProvider.IsBaseBright
            ? _ColorProvider.Darken
            : _ColorProvider.Brighten}!important;
        `;
        const focusActiveButtonClass = `.ed-btn-${_Key.toLowerCase()}:focus, .ed-btn-${_Key.toLowerCase()}:active`;
        const focusActiveStyle = `
        box-shadow: 0 0 1px 2px ${_ColorProvider.IsBaseBright
            ? _ColorProvider.Darken
            : _ColorProvider.Brighten}!important;
        `;
        this.getSheet("ngx-awesome-popup-glob-styles").addRule(baseButtonClass, baseStyle);
        this.getSheet("ngx-awesome-popup-glob-styles").addRule(hoverButtonClass, hoverStyle);
        this.getSheet("ngx-awesome-popup-glob-styles").addRule(focusActiveButtonClass, focusActiveStyle);
    }
    setIconStyling(_Key, _ColorProvider) {
        const baseIconClass = `.ap-icon-${_Key.toLowerCase()}`;
        const baseStyle = `color: ${_ColorProvider.BrightenForShade}!important;`;
        this.getSheet("ngx-awesome-popup-glob-styles").addRule(baseIconClass, baseStyle);
    }
    setDialogFrame(_Key, _ColorProvider) {
        const baseDialogFrameClass = `.ngx-awesome-popup-overlay .${_Key.toLowerCase()}-dialog`;
        const baseStyle = `
        border-color: ${_ColorProvider.Brighten}!important;
        `;
        this.getSheet("ngx-awesome-popup-glob-styles").addRule(baseDialogFrameClass, baseStyle);
    }
    setToastStyles() {
        this.getSheet("ngx-awesome-popup-styles").addRule(`.toast-entity`, `all 0.5s ease;`);
        this.getSheet("ngx-awesome-popup-styles").addRule(`.toast-entity:first-child`, `animation: move 0.7s ease-out;`);
        const isIEOrEdge = /msie\s|trident\//i.test(window.navigator.userAgent);
        if (!isIEOrEdge) {
            this.getSheet("ngx-awesome-popup-styles").addRule(`@-webkit-keyframes move`, `
                                        0% {margin-top: -5px; opacity: 0.4;}
                                        30% {margin-top: -4px; opacity: 0.7;}
                                        100% {margin-top: 0px; opacity: 1;}
                                        `);
            this.getSheet("ngx-awesome-popup-styles").addRule(`@keyframes move`, `
                                        0% {margin-top: -5px; opacity: 0.4;}
                                        30% {margin-top: -4px; opacity: 0.7;}
                                        100% {margin-top: 0px; opacity: 1;}
                                        `);
        }
    }
}
GlobalConfigService.ɵprov = i0.ɵɵdefineInjectable({ factory: function GlobalConfigService_Factory() { return new GlobalConfigService(i0.ɵɵinject("globalConfig")); }, token: GlobalConfigService, providedIn: "root" });
GlobalConfigService.decorators = [
    { type: Injectable, args: [{
                providedIn: "root",
            },] }
];
GlobalConfigService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ["globalConfig",] }] }
];

var GlobalClass;
(function (GlobalClass) {
    class Dispatch {
        constructor() {
            this.Title = null;
            this.Message = null;
        }
    }
    GlobalClass.Dispatch = Dispatch;
    class ButtonMaker {
        constructor(Label, ID, LayoutType = ButtonLayoutDisplay.PRIMARY) {
            this.Label = Label;
            this.ID = ID;
            this.LayoutType = LayoutType;
        }
    }
    GlobalClass.ButtonMaker = ButtonMaker;
    class GlobalUserConfig {
        constructor(_GlobalUserConfig) {
            this.ColorList = new GlobalClass.ColorTypes();
            if (_GlobalUserConfig) {
                const dataControl = new GlobalClass.DataControl();
                dataControl.copyValuesFrom(_GlobalUserConfig, this);
                const colorList = new GlobalClass.ColorTypes();
                this.ColorList = dataControl.copyValuesFrom(this.ColorList, colorList);
            }
        }
    }
    GlobalClass.GlobalUserConfig = GlobalUserConfig;
    class ColorTypes {
        constructor() {
            this.Primary = null;
            this.Secondary = null;
            this.Success = null;
            this.Info = null;
            this.Warning = null;
            this.Danger = null;
            this.Light = null;
            this.Dark = null;
        }
    }
    GlobalClass.ColorTypes = ColorTypes;
    class ResetGlobalConfig {
        constructor(globalConfig) {
            const globalConfigService = ServiceLocator.injector.get(GlobalConfigService);
            if (globalConfig) {
                globalConfigService.setUserColors(globalConfig.ColorList);
                globalConfigService.setNodeStyles(globalConfigService.productionGlobalConfig.DisplayColor, true);
            }
            else {
                globalConfigService.resetStyles();
            }
        }
    }
    GlobalClass.ResetGlobalConfig = ResetGlobalConfig;
    class GlobalConfig {
        constructor() {
            this.DisplayColor = new GlobalClass.DisplayColor();
        }
    }
    GlobalClass.GlobalConfig = GlobalConfig;
    class DisplayColor {
        constructor() {
            this.Primary = null;
            this.Secondary = null;
            this.Success = null;
            this.Info = null;
            this.Warning = null;
            this.Danger = null;
            this.Light = null;
            this.Dark = null;
        }
    }
    GlobalClass.DisplayColor = DisplayColor;
    class ColorProvider {
        constructor(_Color) {
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
                this.Brighten = this.brightness(this.Base, "brighten", 25);
                this.BrightenForShade = this.brightness(this.Base, "brighten", 10);
                this.Darken = this.brightness(this.Base, "darken", 20);
                this.DarkenForShade = this.brightness(this.Base, "darken", 10);
                const luminance = Math.floor(this.luminance(this.Base) * 100);
                const darken = luminance > 50
                    ? 5
                    : luminance > 40
                        ? 10
                        : luminance > 20
                            ? 15
                            : luminance;
                const brighten = luminance > 55
                    ? 65
                    : luminance > 45
                        ? 60
                        : luminance > 20
                            ? 55
                            : luminance > 10
                                ? 45
                                : 80;
                this.BrightShade = this.brightness(this.brightness(this.Base, "darken", darken), "brighten", brighten);
                this.BrightWarmly = this.brightness(this.brightness(this.saturate(this.Base), "darken", darken - 10), "brighten", brighten - 5);
                this.TransparentDarkenVariance = this.brightness(this.transparentize(this.Base, 80), "darken", 40);
                if (this.isBright(this.Base)) {
                    this.ContrastColor = "rgba(58,65,71,0.5)";
                    this.IsBaseBright = true;
                }
                else {
                    this.ContrastColor = "rgb(255,255,255, 0.7)";
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
        saturate(_Rgb) {
            const rgbIntArray = this.getRGBArray(_Rgb);
            const greyVal = this.getLightnessOfRGB(_Rgb) * 55;
            const [lowest, middle, highest] = this.getLowMidHi(rgbIntArray);
            if (lowest.val === highest.val) {
                return _Rgb;
            }
            const saturationRange = Math.round(Math.min(255 - greyVal, greyVal));
            const maxChange = Math.min(255 - highest.val, lowest.val);
            const changeAmount = Math.min(saturationRange / 10, maxChange);
            const middleValueRatio = (greyVal - middle.val) / (greyVal - highest.val) + 0.07;
            const returnArray = [];
            returnArray[highest.index] = Math.round(highest.val + changeAmount);
            returnArray[lowest.index] = Math.round(lowest.val - changeAmount);
            returnArray[middle.index] = Math.round(greyVal + (returnArray[highest.index] - greyVal) * middleValueRatio + 5);
            return `rgb(${[returnArray].join()})`;
        }
        brightness(_Rgb, _Action, _Percentage) {
            const rgbIntArray = this.getRGBArray(_Rgb);
            const [lowest, middle, highest] = this.getLowMidHi(rgbIntArray);
            if (_Action === "brighten" && lowest.val === 255) {
                return _Rgb;
            }
            if (_Action === "darken" && highest.val === 0) {
                return _Rgb;
            }
            const amount = (_Percentage / 100) * 255;
            let returnList = [];
            if (_Action === "brighten") {
                returnList[lowest.index] = Math.round(lowest.val + Math.min(255 - lowest.val, amount));
                const increaseFraction = (returnList[lowest.index] - lowest.val) / (255 - lowest.val);
                returnList[middle.index] =
                    middle.val + (255 - middle.val) * increaseFraction;
                returnList[highest.index] =
                    highest.val + (255 - highest.val) * increaseFraction;
            }
            if (_Action === "darken") {
                returnList[highest.index] = highest.val - Math.min(highest.val, amount);
                const decreaseFraction = (highest.val - returnList[highest.index]) / highest.val;
                returnList[middle.index] = middle.val - middle.val * decreaseFraction;
                returnList[lowest.index] = lowest.val - lowest.val * decreaseFraction;
            }
            returnList = returnList.map((item) => Math.round(item));
            if (rgbIntArray.length > 3) {
                returnList.push(rgbIntArray[3]);
                return `rgba(${returnList.join()})`;
            }
            return `rgb(${returnList.join()})`;
        }
        getLightnessOfRGB(_Rgb) {
            const rgbIntArray = this.getRGBArray(_Rgb);
            const highest = Math.max(...rgbIntArray);
            const lowest = Math.min(...rgbIntArray);
            return (highest + lowest) / 2 / 255;
        }
        isBright(_Rgb) {
            return this.contrast(this.luminance(_Rgb));
        }
        getLowMidHi(_RgbArray) {
            const rgbArrayCopy = _RgbArray.slice();
            const rgbArrayWithoutAlpha = _RgbArray.length > 3
                ? rgbArrayCopy.reverse().slice(1).reverse()
                : _RgbArray;
            let highest = { val: -1, index: -1 };
            let lowest = { val: Infinity, index: -1 };
            rgbArrayWithoutAlpha.map((val, index) => {
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
            const middleIndex = 3 - highest.index - lowest.index;
            let middle = {
                val: rgbArrayWithoutAlpha[middleIndex],
                index: middleIndex,
            };
            return [lowest, middle, highest];
        }
        contrast(_Luminance) {
            const brightest = Math.max(1.05, _Luminance + 0.05);
            const darkest = Math.min(1.05, _Luminance + 0.05);
            const contrast = brightest / darkest;
            return contrast < 2.7;
        }
        isColor(_StrColor) {
            const CSSDeclaration = new Option().style;
            CSSDeclaration.color = _StrColor;
            return !!CSSDeclaration.color ? CSSDeclaration.color : null;
        }
        getRGBArray(_Rgb) {
            return _Rgb
                .replace(/^(rgb|rgba)\(/, "")
                .replace(/\)$/, "")
                .replace(/\s/g, "")
                .split(",")
                .map((x) => +x);
        }
        luminance(_Rgb) {
            const rgbIntArray = this.getRGBArray(_Rgb);
            const W3algorithm = rgbIntArray.map((item) => {
                item /= 255;
                return item <= 0.03928
                    ? item / 12.92
                    : Math.pow((item + 0.055) / 1.055, 2.4);
            });
            return (W3algorithm[0] * 0.2126 +
                W3algorithm[1] * 0.7152 +
                W3algorithm[2] * 0.0722);
        }
        transparentize(_Rgb, _Percentage) {
            const baseArray = this.Base.replace(/^(rgb|rgba)\(/, "")
                .replace(/\)$/, "")
                .replace(/\s/g, "")
                .split(",")
                .map((x) => +x);
            if (baseArray.length > 3) {
                baseArray.pop();
            }
            const amount = (100 - _Percentage) / 100;
            baseArray.push(amount);
            return `rgb(${baseArray.join()})`;
        }
    }
    GlobalClass.ColorProvider = ColorProvider;
    class DataControl {
        /**
         * @ignore
         */
        copyValuesFrom(_Data, _DestinationObject) {
            if (typeof _Data !== "object") {
                return _DestinationObject;
            }
            const dataKeys = Object.keys(_Data);
            const destinationObjectKeys = Object.keys(_DestinationObject);
            dataKeys.forEach((key) => {
                if (destinationObjectKeys.find((tKey) => tKey === key || tKey === "_" + key)) {
                    if (key.includes("Date")) {
                        const date = Date.parse(_Data[key]);
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
        }
    }
    GlobalClass.DataControl = DataControl;
    class Timer {
        constructor() {
            this.TimePassed = 0;
            this.Progress = 0;
            this.Remaining = 100;
        }
        setMilliseconds(_Milliseconds) {
            this.Milliseconds = _Milliseconds;
        }
        reset() {
            this.TimePassed = 0;
            this.Progress = 0;
        }
        pause() {
            this.TimePassed = 0;
            this.Progress = 0;
        }
        stop() {
            this.TimePassed = 0;
            clearInterval(this.Timer);
        }
        start() {
            this.Timer = setInterval(() => {
                if (this.TimePassed >= this.Milliseconds) {
                    clearInterval(this.Timer);
                    return;
                }
                this.TimePassed += 100;
                this.Progress = (this.TimePassed * 100) / this.Milliseconds;
                this.Remaining = 100 - this.Progress;
            }, 100);
        }
    }
    GlobalClass.Timer = Timer;
})(GlobalClass || (GlobalClass = {}));

class ConfirmBoxConfigService {
    constructor(userConfig = {}) {
        this.userConfig = userConfig;
        this.authorConfig = new ConfirmBoxClass.Settings();
        this.productionConfig = new ConfirmBoxClass.Settings();
        // region *** confirmBox userConfig (user input app-module) ***
        const userConfigBase = new ConfirmBoxClass.Settings();
        const dataControl = new GlobalClass.DataControl();
        dataControl.copyValuesFrom(userConfig.ConfirmBoxCoreConfig, userConfigBase.ConfirmBoxCoreConfig); // this will make sure that object has right properties
        userConfig.ConfirmBoxCoreConfig = userConfigBase.ConfirmBoxCoreConfig;
        // endregion
        // region *** author default config values (if there is no user input) ***
        this.authorConfig.ConfirmBoxCoreConfig.Width = "auto";
        this.authorConfig.ConfirmBoxCoreConfig.Height = "auto";
        this.authorConfig.ConfirmBoxCoreConfig.ButtonPosition = "center";
        this.authorConfig.ConfirmBoxCoreConfig.ConfirmLabel = "Confirm";
        this.authorConfig.ConfirmBoxCoreConfig.DeclineLabel = "Decline";
        this.authorConfig.ConfirmBoxCoreConfig.DisableIcon = false;
        this.authorConfig.ConfirmBoxCoreConfig.AllowHTMLMessage = false;
        this.authorConfig.ConfirmBoxCoreConfig.LayoutType =
            DialogLayoutDisplay.NONE;
        // endregion
        // region *** Production setup ***
        dataControl.copyValuesFrom(this.authorConfig.ConfirmBoxCoreConfig, this.productionConfig.ConfirmBoxCoreConfig);
        dataControl.copyValuesFrom(userConfig.ConfirmBoxCoreConfig, this.productionConfig.ConfirmBoxCoreConfig);
        // endregion
    }
}
ConfirmBoxConfigService.ɵprov = i0.ɵɵdefineInjectable({ factory: function ConfirmBoxConfigService_Factory() { return new ConfirmBoxConfigService(i0.ɵɵinject("confirmBoxConfig")); }, token: ConfirmBoxConfigService, providedIn: "root" });
ConfirmBoxConfigService.decorators = [
    { type: Injectable, args: [{
                providedIn: "root",
            },] }
];
ConfirmBoxConfigService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ["confirmBoxConfig",] }] }
];

class DialogInjector {
    constructor(ParentInjector, AdditionalTokens) {
        this.ParentInjector = ParentInjector;
        this.AdditionalTokens = AdditionalTokens;
    }
    get(token, notFoundValue, flags) {
        const value = this.AdditionalTokens.get(token);
        if (value) {
            return value;
        }
        return this.ParentInjector.get(token, notFoundValue);
    }
}

function fadeInOut(_OpacityMin = 0, _OpacityMax = 1) {
    return trigger("fadeInOut", [
        // ...
        state("open", style({
            opacity: _OpacityMax,
        })),
        state("closed", style({
            opacity: _OpacityMin,
        })),
        transition("* => close-fast", [animate("0.1s")]),
        transition("* => open", [animate("0.2s")]),
        transition("* => close-slow", [animate("1.3s")]),
        transition("* => close-instant", [animate("0s")]),
    ]);
}

class ConfirmBoxWrapperComponent {
    constructor(confirmBoxBelonging, cd) {
        this.confirmBoxBelonging = confirmBoxBelonging;
        this.cd = cd;
        this.fadeInOutAnimation = "open";
    }
    ngAfterViewInit() {
        this.setResponse(false);
        this.cd.detectChanges();
    }
    setResponse(_IsSuccess, _ClickedButtonID) {
        const response = new ConfirmBoxClass.ConfirmBoxDefaultResponse();
        if (_ClickedButtonID) {
            response.ClickedButtonID = _ClickedButtonID;
        }
        response.setSuccess(_IsSuccess);
        response.setBelonging(this.confirmBoxBelonging);
        this.confirmBoxBelonging.EventsController.setDefaultResponse(response);
    }
    onOverlayClicked(evt) {
        // console.log('onOverlayClicked');
    }
    onCustomButton(_Button) {
        this.confirmBoxBelonging.EventsController.onButtonClick(_Button);
        this.setResponse(true, _Button.ID);
        this.confirmBoxBelonging.EventsController.close();
    }
    onButtonClick(_Type) {
        let buttonID;
        if (_Type === "confirm") {
            buttonID = this.confirmBoxBelonging.ConfirmBoxCoreConfig.ConfirmLabel.toLowerCase();
        }
        else if (_Type === "decline") {
            buttonID = this.confirmBoxBelonging.ConfirmBoxCoreConfig.DeclineLabel.toLowerCase();
        }
        this.setResponse(_Type === "confirm", buttonID);
        this.confirmBoxBelonging.EventsController.close();
    }
    closeParent$(_ClosingAnimation) {
        this.fadeInOutAnimation = _ClosingAnimation;
        const timer = _ClosingAnimation === "close-slow" ? 1400 : 150;
        return new Observable((observer) => {
            observer.next("");
            observer.complete();
        }).pipe(delay(timer));
    }
}
ConfirmBoxWrapperComponent.decorators = [
    { type: Component, args: [{
                selector: "app-confirm-box-wrapper",
                template: "<div\n  class=\"ngx-awesome-popup-overlay\"\n  (dblclick)=\"onOverlayClicked($event)\"\n  [@fadeInOut]=\"fadeInOutAnimation\"\n>\n  <div\n    class=\"evolve-confirm-box\"\n    [ngClass]=\"{\n      'standard-dialog':\n        confirmBoxBelonging.ConfirmBoxCoreConfig.LayoutType === 0,\n      'success-dialog':\n        confirmBoxBelonging.ConfirmBoxCoreConfig.LayoutType === 1,\n      'info-dialog': confirmBoxBelonging.ConfirmBoxCoreConfig.LayoutType === 2,\n      'warning-dialog':\n        confirmBoxBelonging.ConfirmBoxCoreConfig.LayoutType === 3,\n      'danger-dialog': confirmBoxBelonging.ConfirmBoxCoreConfig.LayoutType === 4\n    }\"\n    [ngStyle]=\"{\n      width: confirmBoxBelonging.ConfirmBoxCoreConfig.Width,\n      height: confirmBoxBelonging.ConfirmBoxCoreConfig.Height\n    }\"\n  >\n    <div\n      class=\"confirm-box-title-content\"\n      *ngIf=\"confirmBoxBelonging.Dispatch.Title\"\n    >\n      <div class=\"dont-break-out\">\n        <div class=\"text-wrapper dont-break-out\">\n          <div class=\"confirm-box-title-text\">\n            {{ confirmBoxBelonging.Dispatch.Title }}\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div\n      class=\"content-holder\"\n      [ngClass]=\"confirmBoxBelonging.Dispatch.Title ? '' : 'without-title'\"\n      *ngIf=\"confirmBoxBelonging.Dispatch.Message\"\n    >\n      <div\n        class=\"icon-section\"\n        *ngIf=\"!confirmBoxBelonging.ConfirmBoxCoreConfig.DisableIcon\"\n      >\n        <span\n          class=\"icon-type-confirm-box\"\n          [ngClass]=\"{\n            '': confirmBoxBelonging.ConfirmBoxCoreConfig.LayoutType === 0,\n            'ap-icon-success icon-check-circle':\n              confirmBoxBelonging.ConfirmBoxCoreConfig.LayoutType === 1,\n            'ap-icon-info icon-info-circle':\n              confirmBoxBelonging.ConfirmBoxCoreConfig.LayoutType === 2,\n            'ap-icon-warning icon-warning':\n              confirmBoxBelonging.ConfirmBoxCoreConfig.LayoutType === 3,\n            'ap-icon-danger icon-times-circle':\n              confirmBoxBelonging.ConfirmBoxCoreConfig.LayoutType === 4\n          }\"\n        ></span>\n      </div>\n      <div class=\"text-wrapper-section confirm-box-inner-content\">\n        <!--<div class=\"dont-break-out\" [ngClass]=\"{'text-wrapper-section-with-icon': showIcon, 'text-wrapper-section': !showIcon}\">-->\n        <div class=\"dont-break-out\">\n          <div\n            class=\"text-wrapper dont-break-out\"\n            *ngIf=\"!confirmBoxBelonging.ConfirmBoxCoreConfig.AllowHTMLMessage\"\n          >\n            {{ confirmBoxBelonging.Dispatch.Message }}\n          </div>\n          <div\n            class=\"text-wrapper\"\n            *ngIf=\"confirmBoxBelonging.ConfirmBoxCoreConfig.AllowHTMLMessage\"\n            [innerHTML]=\"confirmBoxBelonging.Dispatch.Message\"\n          ></div>\n        </div>\n      </div>\n    </div>\n    <div class=\"button-holder\">\n      <div\n        class=\"button-section\"\n        *ngIf=\"confirmBoxBelonging.Buttons.length\"\n        [ngStyle]=\"{\n          'text-align': confirmBoxBelonging.ConfirmBoxCoreConfig.ButtonPosition\n        }\"\n      >\n        <button\n          class=\"ed-btn ed-btn-md\"\n          *ngFor=\"let button of confirmBoxBelonging.Buttons\"\n          (click)=\"onCustomButton(button)\"\n          [ngClass]=\"{\n            '': button.LayoutType ? button.LayoutType === 0 : false,\n            'ed-btn-success': button.LayoutType\n              ? button.LayoutType === 1\n              : false,\n            'ed-btn-info': button.LayoutType ? button.LayoutType === 2 : false,\n            'ed-btn-warning': button.LayoutType\n              ? button.LayoutType === 3\n              : false,\n            'ed-btn-danger': button.LayoutType\n              ? button.LayoutType === 4\n              : false,\n            'ed-btn-dark': button.LayoutType ? button.LayoutType === 5 : false,\n            'ed-btn-light': button.LayoutType ? button.LayoutType === 6 : false,\n            'ed-btn-primary': button.LayoutType\n              ? button.LayoutType === 7\n              : false,\n            'ed-btn-secondary': button.LayoutType\n              ? button.LayoutType === 8\n              : false,\n            'ed-btn-link': button.LayoutType ? button.LayoutType === 9 : false\n          }\"\n        >\n          {{ button.Label }}\n        </button>\n      </div>\n      <div\n        class=\"button-section\"\n        *ngIf=\"!confirmBoxBelonging.Buttons.length\"\n        [ngStyle]=\"{\n          'text-align': confirmBoxBelonging.ConfirmBoxCoreConfig.ButtonPosition\n        }\"\n      >\n        <button\n          class=\"ed-btn ed-btn-md\"\n          (click)=\"onButtonClick('confirm')\"\n          [ngClass]=\"{\n            'ed-btn-primary':\n              confirmBoxBelonging.ConfirmBoxCoreConfig.LayoutType === 0,\n            'ed-btn-success':\n              confirmBoxBelonging.ConfirmBoxCoreConfig.LayoutType === 1,\n            'ed-btn-info':\n              confirmBoxBelonging.ConfirmBoxCoreConfig.LayoutType === 2,\n            'ed-btn-warning':\n              confirmBoxBelonging.ConfirmBoxCoreConfig.LayoutType === 3,\n            'ed-btn-danger':\n              confirmBoxBelonging.ConfirmBoxCoreConfig.LayoutType === 4\n          }\"\n        >\n          {{ confirmBoxBelonging.ConfirmBoxCoreConfig.ConfirmLabel }}\n        </button>\n        <button\n          class=\"ed-btn ed-btn-md ed-btn-secondary\"\n          (click)=\"onButtonClick('decline')\"\n          *ngIf=\"confirmBoxBelonging.ConfirmBoxCoreConfig.DeclineLabel\"\n        >\n          {{ confirmBoxBelonging.ConfirmBoxCoreConfig.DeclineLabel }}\n        </button>\n      </div>\n    </div>\n  </div>\n</div>\n",
                animations: [fadeInOut(0, 1)],
                styles: ["@charset \"UTF-8\";.ed-btn-sm{font-size:12px;font-weight:400;margin-right:3px;min-width:40px;padding:2px 8px}.ed-btn-md{font-size:14px;margin-right:5px;min-width:60px;padding:3px 10px}.ed-btn-lg{font-size:16px;margin-right:5px;min-width:70px;padding:4px 10px}.ed-btn{background-color:initial;border:none;border-radius:3px;cursor:pointer;display:inline-block;line-height:1.5;text-align:center;text-decoration:none;-webkit-user-select:none;user-select:none;vertical-align:middle}.ed-btn:hover{color:#989ea5}.ed-btn-check:focus+.ed-btn,.ed-btn:focus{box-shadow:0 0 1px 2px;outline:0}.ed-btn-check:active+.ed-btn,.ed-btn-check:active+.ed-btn:focus,.ed-btn-check:checked+.ed-btn,.ed-btn-check:checked+.ed-btn:focus,.ed-btn.active,.ed-btn.active:focus,.ed-btn:active,.ed-btn:active:focus{box-shadow:0 0 1px 2px}.ed-btn.disabled,.ed-btn:disabled,fieldset:disabled .ed-btn{box-shadow:none;opacity:.6;pointer-events:none}.ed-btn-primary{color:hsla(0,0%,98.4%,.8);background:#ff9e00;border-color:#ff9e00}.ed-btn-primary:hover{color:#fbfbfb;border-color:#ffa81a;background:#ffb133}.ed-btn-check:focus+.ed-btn-primary,.ed-btn-primary:focus{outline:0;box-shadow:0 0 1px 2px #ffa81a}.ed-btn-check:active+.ed-btn-primary,.ed-btn-check:active+.ed-btn-primary:focus,.ed-btn-check:checked+.ed-btn-primary,.ed-btn-check:checked+.ed-btn-primary:focus,.ed-btn-primary.active,.ed-btn-primary.active:focus,.ed-btn-primary:active,.ed-btn-primary:active:focus{box-shadow:0 0 1px 2px #ffa81a}.ed-btn-secondary{color:hsla(0,0%,98.4%,.8);background:#989ea5;border-color:#989ea5}.ed-btn-secondary:hover{color:#fbfbfb;border-color:#a6abb1;background:#b3b8bd}.ed-btn-check:focus+.ed-btn-secondary,.ed-btn-secondary:focus{outline:0;box-shadow:0 0 1px 2px #a6abb1}.ed-btn-check:active+.ed-btn-secondary,.ed-btn-check:active+.ed-btn-secondary:focus,.ed-btn-check:checked+.ed-btn-secondary,.ed-btn-check:checked+.ed-btn-secondary:focus,.ed-btn-secondary.active,.ed-btn-secondary.active:focus,.ed-btn-secondary:active,.ed-btn-secondary:active:focus{box-shadow:0 0 1px 2px #a6abb1}.ed-btn-success{color:hsla(0,0%,98.4%,.8);background:#3caea3;border-color:#3caea3}.ed-btn-success:hover{color:#fbfbfb;border-color:#45bfb3;background:#58c5bb}.ed-btn-check:focus+.ed-btn-success,.ed-btn-success:focus{outline:0;box-shadow:0 0 1px 2px #45bfb3}.ed-btn-check:active+.ed-btn-success,.ed-btn-check:active+.ed-btn-success:focus,.ed-btn-check:checked+.ed-btn-success,.ed-btn-check:checked+.ed-btn-success:focus,.ed-btn-success.active,.ed-btn-success.active:focus,.ed-btn-success:active,.ed-btn-success:active:focus{box-shadow:0 0 1px 2px #45bfb3}.ed-btn-info{color:hsla(0,0%,98.4%,.8);background:#2f8ee5;border-color:#2f8ee5}.ed-btn-info:hover{color:#fbfbfb;border-color:#469ae8;background:#5ca7eb}.ed-btn-check:focus+.ed-btn-info,.ed-btn-info:focus{outline:0;box-shadow:0 0 1px 2px #469ae8}.ed-btn-check:active+.ed-btn-info,.ed-btn-check:active+.ed-btn-info:focus,.ed-btn-check:checked+.ed-btn-info,.ed-btn-check:checked+.ed-btn-info:focus,.ed-btn-info.active,.ed-btn-info.active:focus,.ed-btn-info:active,.ed-btn-info:active:focus{box-shadow:0 0 1px 2px #469ae8}.ed-btn-warning{color:hsla(0,0%,98.4%,.8);background:#ffc107;border-color:#ffc107}.ed-btn-warning:hover{color:#fbfbfb;border-color:#ffc721;background:#ffce3a}.ed-btn-check:focus+.ed-btn-warning,.ed-btn-warning:focus{outline:0;box-shadow:0 0 1px 2px #ffc721}.ed-btn-check:active+.ed-btn-warning,.ed-btn-check:active+.ed-btn-warning:focus,.ed-btn-check:checked+.ed-btn-warning,.ed-btn-check:checked+.ed-btn-warning:focus,.ed-btn-warning.active,.ed-btn-warning.active:focus,.ed-btn-warning:active,.ed-btn-warning:active:focus{box-shadow:0 0 1px 2px #ffc721}.ed-btn-danger{color:hsla(0,0%,98.4%,.8);background:#e46464;border-color:#e46464}.ed-btn-danger:hover{color:#fbfbfb;border-color:#e87a7a;background:#ec8f8f}.ed-btn-check:focus+.ed-btn-danger,.ed-btn-danger:focus{outline:0;box-shadow:0 0 1px 2px #e87a7a}.ed-btn-check:active+.ed-btn-danger,.ed-btn-check:active+.ed-btn-danger:focus,.ed-btn-check:checked+.ed-btn-danger,.ed-btn-check:checked+.ed-btn-danger:focus,.ed-btn-danger.active,.ed-btn-danger.active:focus,.ed-btn-danger:active,.ed-btn-danger:active:focus{box-shadow:0 0 1px 2px #e87a7a}.ed-btn-light{color:rgba(52,58,64,.8);background:#fbfbfb;border-color:#fbfbfb}.ed-btn-light:hover{color:#343a40;border-color:#fff;background:#fff}.ed-btn-check:focus+.ed-btn-light,.ed-btn-light:focus{outline:0;box-shadow:0 0 1px 2px #fff}.ed-btn-check:active+.ed-btn-light,.ed-btn-check:active+.ed-btn-light:focus,.ed-btn-check:checked+.ed-btn-light,.ed-btn-check:checked+.ed-btn-light:focus,.ed-btn-light.active,.ed-btn-light.active:focus,.ed-btn-light:active,.ed-btn-light:active:focus{box-shadow:0 0 1px 2px #fff}.ed-btn-dark{color:hsla(0,0%,98.4%,.8);background:#343a40;border-color:#343a40}.ed-btn-dark:hover{color:#fbfbfb;border-color:#3f474e;background:#4b545c}.ed-btn-check:focus+.ed-btn-dark,.ed-btn-dark:focus{outline:0;box-shadow:0 0 1px 2px #3f474e}.ed-btn-check:active+.ed-btn-dark,.ed-btn-check:active+.ed-btn-dark:focus,.ed-btn-check:checked+.ed-btn-dark,.ed-btn-check:checked+.ed-btn-dark:focus,.ed-btn-dark.active,.ed-btn-dark.active:focus,.ed-btn-dark:active,.ed-btn-dark:active:focus{box-shadow:0 0 1px 2px #3f474e}@font-face{font-family:icomoon;src:url(\"data:font/eot;base64,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\");src:url(\"data:font/eot;base64,CAgAAGQHAAABAAIAAAAAAAAAAAAAAAAAAAABAJABAAAAAExQAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAA/2/OwAAAAAAAAAAAAAAAAAAAAAAAAA4AaQBjAG8AbQBvAG8AbgAAAA4AUgBlAGcAdQBsAGEAcgAAABYAVgBlAHIAcwBpAG8AbgAgADEALgAwAAAADgBpAGMAbwBtAG8AbwBuAAAAAAAAAQAAAAsAgAADADBPUy8yDxIFbwAAALwAAABgY21hcBdW0ooAAAEcAAAAVGdhc3AAAAAQAAABcAAAAAhnbHlmw5gfRwAAAXgAAAOUaGVhZBxow6wAAAUMAAAANmhoZWEHuQPJAAAFRAAAACRobXR4FEoACQAABWgAAAAgbG9jYQLuAhQAAAWIAAAAEm1heHAADABaAAAFnAAAACBuYW1lmUoJ+wAABbwAAAGGcG9zdAADAAAAAAdEAAAAIAADA0IBkAAFAAACmQLMAAAAjwKZAswAAAHrADMBCQAAAAAAAAAAAAAAAAAAAAEQAAAAAAAAAAAAAAAAAAAAAEAAAOkDA8D/wABAA8AAQAAAAAEAAAAAAAAAAAAAACAAAAAAAAMAAAADAAAAHAABAAMAAAAcAAMAAQAAABwABAA4AAAACgAIAAIAAgABACDpA//9//8AAAAAACDpAP/9//8AAf/jFwQAAwABAAAAAAAAAAAAAAABAAH//wAPAAEAAAAAAAAAAAACAAA3OQEAAAAAAQAAAAAAAAAAAAIAADc5AQAAAAABAAAAAAAAAAAAAgAANzkBAAAAAAIAAAAAA24DbgA7AFcAAAE0Ji8BNz4BNTQmLwEuASMiBg8BJy4BIyIGDwEOARUUFh8BBw4BFRQWHwEeATMyNj8BFx4BMzI2PwE+ATcUBw4BBwYjIicuAScmNTQ3PgE3NjMyFx4BFxYCkQYFaGgFBgYFNAUOBwcOBWdoBQ0HCA0GMwUGBgVnZwUGBgUzBg0IBw0FaGcFDgcHDgU0BQbdIyJ3UFBbW1BQdyMiIiN3UFBbW1BQdyIjATYHDQVoZwUOBwcOBTQFBgYFaGgFBgYFNAUOBwcOBWdoBQ0HCA0GMwUGBgVnZwUGBgUzBg2JW1BQdyIjIyJ3UFBbW1BQdyIjIyJ3UFAAAwAJAAAD9wO3AA8AJgA8AAAlNTQmKwEiBh0BFBY7ATI2JxM0JicuASsBIgYHDgEVExQWOwEyNjUDARYUBw4BIyEiJicmNDcBPgEzMhYXAkkKCG4ICgoIbggKAQoCAwMHBH4EBwMDAgkMCGoHDAgBtwkKCiIT/JITIgoKCQG3CSMUFCMJpW0HDAwHbQgLC94BBgMGAgIEBAICBwP++wYHBwYCFvzbESYRERMTEREmEQMlERUVEQAAAAIAAAAAA24DbgAkAEAAAAE0Ji8BLgEjIgYPAScuASMiBg8BDgEVFBYfAR4BMzI2NwE+ATUXFAcOAQcGIyInLgEnJjU0Nz4BNzYzMhceARcWAt4FBjQFDQcIDQXpgQUOBwcOBTQFBQUFzwUOBwcOBQE2BgWQIyJ3UFBbW1BQdyMiIiN3UFBbW1BQdyIjAhMIDgUzBQYGBeiBBQYGBTQFDgcHDgXPBQUFBQE3BQ0HXFtQUHciIyMid1BQW1tQUHciIyMid1BQAAAAAwAAAAADbgNuAB8ALwBLAAAlNTQmKwERNCYrASIGHQEUFjsBFSMiBh0BFBYzITI2NQM1NCYrASIGHQEUFjsBMjYFFAcOAQcGIyInLgEnJjU0Nz4BNzYzMhceARcWAkkKCDcLB7cICgoINzcICgoIAQAICkkLB24ICgoIbgcLAW4jIndQUFtbUFB3IyIiI3dQUFtbUFB3IiOlWwgKASUICgoIXAcLtwoIWwgLCwgCAFsICgoIWwgLC+ZbUFB3IiMjIndQUFtbUFB3IiMjIndQUAAAAAABAAAAAAAAwM5v/18PPPUACwQAAAAAANyqP3wAAAAA3Ko/fAAAAAAD9wO3AAAACAACAAAAAAAAAAEAAAPA/8AAAAQAAAAAAAP3AAEAAAAAAAAAAAAAAAAAAAAIBAAAAAAAAAAAAAAAAgAAAANuAAAEAAAJA24AAANuAAAAAAAAAAoAFAAeAKAA/AFgAcoAAAABAAAACABYAAMAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAADgCuAAEAAAAAAAEABwAAAAEAAAAAAAIABwBgAAEAAAAAAAMABwA2AAEAAAAAAAQABwB1AAEAAAAAAAUACwAVAAEAAAAAAAYABwBLAAEAAAAAAAoAGgCKAAMAAQQJAAEADgAHAAMAAQQJAAIADgBnAAMAAQQJAAMADgA9AAMAAQQJAAQADgB8AAMAAQQJAAUAFgAgAAMAAQQJAAYADgBSAAMAAQQJAAoANACkaWNvbW9vbgBpAGMAbwBtAG8AbwBuVmVyc2lvbiAxLjAAVgBlAHIAcwBpAG8AbgAgADEALgAwaWNvbW9vbgBpAGMAbwBtAG8AbwBuaWNvbW9vbgBpAGMAbwBtAG8AbwBuUmVndWxhcgBSAGUAZwB1AGwAYQByaWNvbW9vbgBpAGMAbwBtAG8AbwBuRm9udCBnZW5lcmF0ZWQgYnkgSWNvTW9vbi4ARgBvAG4AdAAgAGcAZQBuAGUAcgBhAHQAZQBkACAAYgB5ACAASQBjAG8ATQBvAG8AbgAuAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==\") format(\"embedded-opentype\"),url(\"data:font/ttf;base64,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\") format(\"truetype\"),url(\"data:font/woff;base64,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\") format(\"woff\"),url(\"data:font/svg;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiID4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPG1ldGFkYXRhPkdlbmVyYXRlZCBieSBJY29Nb29uPC9tZXRhZGF0YT4KCTxkZWZzPgoJCTxmb250IGlkPSJpY29tb29uIiBob3Jpei1hZHYteD0iMTAyNCI+CgkJCTxmb250LWZhY2UgdW5pdHMtcGVyLWVtPSIxMDI0IiBhc2NlbnQ9Ijk2MCIgZGVzY2VudD0iLTY0Ii8+CgkJCTxtaXNzaW5nLWdseXBoIGhvcml6LWFkdi14PSIxMDI0Ii8+CgkJCTxnbHlwaCB1bmljb2RlPSImI3gyMDsiIGhvcml6LWFkdi14PSI1MTIiIGQ9IiIvPgoJCQk8Z2x5cGggdW5pY29kZT0iJiN4ZTkwMDsiIGdseXBoLW5hbWU9InRpbWVzLWNpcmNsZSIgaG9yaXotYWR2LXg9Ijg3OCIgZD0iTTY1Ni41NzEgMzA5LjcxNGMwIDkuNzE0LTQgMTguODU3LTEwLjg1NyAyNS43MTRsLTEwMy40MjkgMTAzLjQyOSAxMDMuNDI5IDEwMy40MjljNi44NTcgNi44NTcgMTAuODU3IDE2IDEwLjg1NyAyNS43MTRzLTQgMTkuNDI5LTEwLjg1NyAyNi4yODZsLTUxLjQyOSA1MS40MjljLTYuODU3IDYuODU3LTE2LjU3MSAxMC44NTctMjYuMjg2IDEwLjg1N3MtMTguODU3LTQtMjUuNzE0LTEwLjg1N2wtMTAzLjQyOS0xMDMuNDI5LTEwMy40MjkgMTAzLjQyOWMtNi44NTcgNi44NTctMTYgMTAuODU3LTI1LjcxNCAxMC44NTdzLTE5LjQyOS00LTI2LjI4Ni0xMC44NTdsLTUxLjQyOS01MS40MjljLTYuODU3LTYuODU3LTEwLjg1Ny0xNi41NzEtMTAuODU3LTI2LjI4NnM0LTE4Ljg1NyAxMC44NTctMjUuNzE0bDEwMy40MjktMTAzLjQyOS0xMDMuNDI5LTEwMy40MjljLTYuODU3LTYuODU3LTEwLjg1Ny0xNi0xMC44NTctMjUuNzE0czQtMTkuNDI5IDEwLjg1Ny0yNi4yODZsNTEuNDI5LTUxLjQyOWM2Ljg1Ny02Ljg1NyAxNi41NzEtMTAuODU3IDI2LjI4Ni0xMC44NTdzMTguODU3IDQgMjUuNzE0IDEwLjg1N2wxMDMuNDI5IDEwMy40MjkgMTAzLjQyOS0xMDMuNDI5YzYuODU3LTYuODU3IDE2LTEwLjg1NyAyNS43MTQtMTAuODU3czE5LjQyOSA0IDI2LjI4NiAxMC44NTdsNTEuNDI5IDUxLjQyOWM2Ljg1NyA2Ljg1NyAxMC44NTcgMTYuNTcxIDEwLjg1NyAyNi4yODZ6TTg3Ny43MTQgNDM4Ljg1N2MwLTI0Mi4yODYtMTk2LjU3MS00MzguODU3LTQzOC44NTctNDM4Ljg1N3MtNDM4Ljg1NyAxOTYuNTcxLTQzOC44NTcgNDM4Ljg1NyAxOTYuNTcxIDQzOC44NTcgNDM4Ljg1NyA0MzguODU3IDQzOC44NTctMTk2LjU3MSA0MzguODU3LTQzOC44NTd6Ii8+CgkJCTxnbHlwaCB1bmljb2RlPSImI3hlOTAxOyIgZ2x5cGgtbmFtZT0iZXhjbGFtYXRpb24tdHJpYW5nbGUsIHdhcm5pbmciIGQ9Ik01ODUuMTQzIDE2NS4xNDN2MTA4LjU3MWMwIDEwLjI4Ni04IDE4Ljg1Ny0xOC4yODYgMTguODU3aC0xMDkuNzE0Yy0xMC4yODYgMC0xOC4yODYtOC41NzEtMTguMjg2LTE4Ljg1N3YtMTA4LjU3MWMwLTEwLjI4NiA4LTE4Ljg1NyAxOC4yODYtMTguODU3aDEwOS43MTRjMTAuMjg2IDAgMTguMjg2IDguNTcxIDE4LjI4NiAxOC44NTd6TTU4NCAzNzguODU3bDEwLjI4NiAyNjIuMjg2YzAgMy40MjktMS43MTQgOC01LjcxNCAxMC44NTctMy40MjkgMi44NTctOC41NzEgNi4yODYtMTMuNzE0IDYuMjg2aC0xMjUuNzE0Yy01LjE0MyAwLTEwLjI4Ni0zLjQyOS0xMy43MTQtNi4yODYtNC0yLjg1Ny01LjcxNC04LjU3MS01LjcxNC0xMmw5LjcxNC0yNjEuMTQzYzAtNy40MjkgOC41NzEtMTMuMTQzIDE5LjQyOS0xMy4xNDNoMTA1LjcxNGMxMC4yODYgMCAxOC44NTcgNS43MTQgMTkuNDI5IDEzLjE0M3pNNTc2IDkxMi41NzFsNDM4Ljg1Ny04MDQuNTcxYzEyLjU3MS0yMi4yODYgMTItNDkuNzE0LTEuMTQzLTcycy0zNy4xNDMtMzYtNjIuODU3LTM2aC04NzcuNzE0Yy0yNS43MTQgMC00OS43MTQgMTMuNzE0LTYyLjg1NyAzNnMtMTMuNzE0IDQ5LjcxNC0xLjE0MyA3Mmw0MzguODU3IDgwNC41NzFjMTIuNTcxIDIzLjQyOSAzNy4xNDMgMzguMjg2IDY0IDM4LjI4NnM1MS40MjktMTQuODU3IDY0LTM4LjI4NnoiLz4KCQkJPGdseXBoIHVuaWNvZGU9IiYjeGU5MDI7IiBnbHlwaC1uYW1lPSJjaGVjay1jaXJjbGUiIGhvcml6LWFkdi14PSI4NzgiIGQ9Ik03MzMuNzE0IDUzMS40MjhjMCA5LjcxNC0zLjQyOSAxOS40MjktMTAuMjg2IDI2LjI4NmwtNTIgNTEuNDI5Yy02Ljg1NyA2Ljg1Ny0xNiAxMC44NTctMjUuNzE0IDEwLjg1N3MtMTguODU3LTQtMjUuNzE0LTEwLjg1N2wtMjMzLjE0My0yMzIuNTcxLTEyOS4xNDMgMTI5LjE0M2MtNi44NTcgNi44NTctMTYgMTAuODU3LTI1LjcxNCAxMC44NTdzLTE4Ljg1Ny00LTI1LjcxNC0xMC44NTdsLTUyLTUxLjQyOWMtNi44NTctNi44NTctMTAuMjg2LTE2LjU3MS0xMC4yODYtMjYuMjg2czMuNDI5LTE4Ljg1NyAxMC4yODYtMjUuNzE0bDIwNi44NTctMjA2Ljg1N2M2Ljg1Ny02Ljg1NyAxNi41NzEtMTAuODU3IDI1LjcxNC0xMC44NTcgOS43MTQgMCAxOS40MjkgNCAyNi4yODYgMTAuODU3bDMxMC4yODYgMzEwLjI4NmM2Ljg1NyA2Ljg1NyAxMC4yODYgMTYgMTAuMjg2IDI1LjcxNHpNODc3LjcxNCA0MzguODU3YzAtMjQyLjI4Ni0xOTYuNTcxLTQzOC44NTctNDM4Ljg1Ny00MzguODU3cy00MzguODU3IDE5Ni41NzEtNDM4Ljg1NyA0MzguODU3IDE5Ni41NzEgNDM4Ljg1NyA0MzguODU3IDQzOC44NTcgNDM4Ljg1Ny0xOTYuNTcxIDQzOC44NTctNDM4Ljg1N3oiLz4KCQkJPGdseXBoIHVuaWNvZGU9IiYjeGU5MDM7IiBnbHlwaC1uYW1lPSJpbmZvLWNpcmNsZSIgaG9yaXotYWR2LXg9Ijg3OCIgZD0iTTU4NS4xNDMgMTY0LjU3MXY5MS40MjljMCAxMC4yODYtOCAxOC4yODYtMTguMjg2IDE4LjI4NmgtNTQuODU3djI5Mi41NzFjMCAxMC4yODYtOCAxOC4yODYtMTguMjg2IDE4LjI4NmgtMTgyLjg1N2MtMTAuMjg2IDAtMTguMjg2LTgtMTguMjg2LTE4LjI4NnYtOTEuNDI5YzAtMTAuMjg2IDgtMTguMjg2IDE4LjI4Ni0xOC4yODZoNTQuODU3di0xODIuODU3aC01NC44NTdjLTEwLjI4NiAwLTE4LjI4Ni04LTE4LjI4Ni0xOC4yODZ2LTkxLjQyOWMwLTEwLjI4NiA4LTE4LjI4NiAxOC4yODYtMTguMjg2aDI1NmMxMC4yODYgMCAxOC4yODYgOCAxOC4yODYgMTguMjg2ek01MTIgNjc2LjU3MXY5MS40MjljMCAxMC4yODYtOCAxOC4yODYtMTguMjg2IDE4LjI4NmgtMTA5LjcxNGMtMTAuMjg2IDAtMTguMjg2LTgtMTguMjg2LTE4LjI4NnYtOTEuNDI5YzAtMTAuMjg2IDgtMTguMjg2IDE4LjI4Ni0xOC4yODZoMTA5LjcxNGMxMC4yODYgMCAxOC4yODYgOCAxOC4yODYgMTguMjg2ek04NzcuNzE0IDQzOC44NTdjMC0yNDIuMjg2LTE5Ni41NzEtNDM4Ljg1Ny00MzguODU3LTQzOC44NTdzLTQzOC44NTcgMTk2LjU3MS00MzguODU3IDQzOC44NTcgMTk2LjU3MSA0MzguODU3IDQzOC44NTcgNDM4Ljg1NyA0MzguODU3LTE5Ni41NzEgNDM4Ljg1Ny00MzguODU3eiIvPgoJCTwvZm9udD48L2RlZnM+Cjwvc3ZnPgo=\") format(\"svg\");font-weight:400;font-style:normal;font-display:block}[class*=\" icon-\"],[class^=icon-]{font-family:icomoon!important;-webkit-font-smoothing:antialiased;font-style:normal;font-variant:normal;font-weight:400;line-height:1;-moz-osx-font-smoothing:grayscale;speak:never;text-transform:none}.icon-times-circle:before{content:\"\uE900\"}.icon-exclamation-triangle:before,.icon-warning:before{content:\"\uE901\"}.icon-check-circle:before{content:\"\uE902\"}.icon-info-circle:before{content:\"\uE903\"}.ngx-awesome-popup-overlay{align-items:center;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px);background:rgba(51,32,0,.4);bottom:0;display:flex;flex-direction:column;justify-content:center;left:0;opacity:0;position:fixed;right:0;top:0;z-index:999999999}.evolve-confirm-box .text-wrapper,.evolve-parent-dialog .text-wrapper{text-align:center}.evolve-confirm-box .text-wrapper-section,.evolve-parent-dialog .text-wrapper-section,.evolve-toast .text-wrapper-section{width:100%}.evolve-confirm-box .text-wrapper-section .text-wrapper,.evolve-parent-dialog .text-wrapper-section .text-wrapper,.evolve-toast .text-wrapper-section .text-wrapper{display:block;width:100%}.evolve-confirm-box .text-wrapper-section .dont-break-out,.evolve-parent-dialog .text-wrapper-section .dont-break-out,.evolve-toast .text-wrapper-section .dont-break-out{-webkit-hyphens:auto;hyphens:auto;overflow-wrap:break-word;white-space:pre-wrap;word-wrap:break-word}.evolve-confirm-box,.evolve-parent-dialog{background:#fbfbfb;border-radius:5px;border-top:7px solid;box-shadow:0 0 4px 1px rgba(0,0,0,.25);display:flex;flex-direction:column;max-height:calc(100vh - 100px);max-width:calc(100vw - 100px);position:relative;vertical-align:bottom}.evolve-confirm-box.standard-dialog,.evolve-parent-dialog.standard-dialog{border-color:transparent;padding:17px 20px 10px}.evolve-confirm-box.success-dialog,.evolve-parent-dialog.success-dialog{border-color:#3caea3}.evolve-confirm-box.info-dialog,.evolve-parent-dialog.info-dialog{border-color:#2f8ee5}.evolve-confirm-box.warning-dialog,.evolve-parent-dialog.warning-dialog{border-color:#ffc107}.evolve-confirm-box.danger-dialog,.evolve-parent-dialog.danger-dialog{border-color:#e46464}.ap-icon-success{color:#58c5bb}.ap-icon-info{color:#5ca7eb}.ap-icon-warning{color:#ffce3a}.ap-icon-danger{color:#ec8f8f}.ngx-awesome-popup-overlay .evolve-confirm-box{padding:0 20px}.ngx-awesome-popup-overlay .evolve-confirm-box .confirm-box-title-content{align-items:center;background-clip:padding-box;border-bottom:1px solid rgba(0,0,0,.05);color:#6c757d;display:flex;flex-direction:column;height:auto;justify-content:center;margin:8px 0 10px;padding:2px 10px 5px;width:auto}.ngx-awesome-popup-overlay .evolve-confirm-box .confirm-box-title-content .confirm-box-title-text{font-size:18px;font-weight:700}.ngx-awesome-popup-overlay .evolve-confirm-box .content-holder{align-items:center;color:#495057;display:flex;flex-direction:row;height:100%;justify-content:space-between;overflow:auto;width:100%}.ngx-awesome-popup-overlay .evolve-confirm-box .content-holder.without-title{margin-top:10px}.ngx-awesome-popup-overlay .evolve-confirm-box .content-holder .icon-section .icon-type-confirm-box{font-size:34px;margin:4px}.ngx-awesome-popup-overlay .evolve-confirm-box .content-holder .confirm-box-inner-content{padding:5px 10px}.ngx-awesome-popup-overlay .evolve-confirm-box .content-holder .text-wrapper p{margin:0}.ngx-awesome-popup-overlay .evolve-confirm-box .button-holder{display:flex;flex-direction:column;justify-content:flex-end;margin:10px 0 8px;width:100%}.ngx-awesome-popup-overlay .evolve-confirm-box .button-holder .button-section{margin:0;padding:4px 10px}"]
            },] }
];
ConfirmBoxWrapperComponent.ctorParameters = () => [
    { type: ConfirmBoxClass.ConfirmBoxBelonging },
    { type: ChangeDetectorRef }
];

class ConfirmBoxService {
    constructor(componentFactoryResolver, injector, appRef) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.injector = injector;
        this.appRef = appRef;
        this.confirmBoxComponentRefList = [];
    }
    open(_ConfirmBoxBelonging) {
        const dialogController = _ConfirmBoxBelonging.EventsController;
        const componentRef = this.getComponentRef(dialogController, _ConfirmBoxBelonging);
        this.confirmBoxComponentRefList.push(componentRef);
        componentRef.instance.confirmBoxBelonging = _ConfirmBoxBelonging;
        this.appendToBodyParentComponent(componentRef);
        this.listeners(dialogController);
        return dialogController;
    }
    getComponentRef(_EventsController, _ConfirmBoxBelonging) {
        let componentFactory;
        const dialogIndex = this.findDialogIndex(_ConfirmBoxBelonging.EntityUniqueID);
        if (dialogIndex === -1) {
            const weakMap = new WeakMap();
            weakMap.set(ConfirmBoxClass.ConfirmBoxEventsController, _EventsController);
            componentFactory = this.componentFactoryResolver.resolveComponentFactory(ConfirmBoxWrapperComponent);
            return componentFactory.create(new DialogInjector(this.injector, weakMap));
        }
        return null;
    }
    listeners(_EventsController) {
        // Listener for closing dialog
        const closeDialogSubscription = _EventsController.afterClosed$.subscribe((response) => {
            const modalIndex = this.findDialogIndex(response.confirmBoxBelonging.EntityUniqueID);
            this.removeFromBodyParentComponent(modalIndex);
            closeDialogSubscription.unsubscribe();
        });
    }
    appendToBodyParentComponent(_ComponentRef) {
        // attach view to ignite lifecycle hooks
        this.appRef.attachView(_ComponentRef.hostView);
        // DOM
        const domElem = _ComponentRef.hostView
            .rootNodes[0];
        document.body.appendChild(domElem);
    }
    closeDialogWrapperComponent(_DialogUniqueID) {
        const modalIndex = this.findDialogIndex(_DialogUniqueID);
        this.removeFromBodyParentComponent(modalIndex);
    }
    removeFromBodyParentComponent(_DialogIndex) {
        if (_DialogIndex > -1) {
            this.confirmBoxComponentRefList[_DialogIndex].instance
                .closeParent$("close-fast")
                .pipe(map((item) => {
                this.appRef.detachView(this.confirmBoxComponentRefList[_DialogIndex].hostView);
                this.confirmBoxComponentRefList[_DialogIndex].destroy();
                this.confirmBoxComponentRefList.splice(_DialogIndex, 1);
            }))
                .subscribe();
        }
    }
    findDialogIndex(_DialogUniqueID) {
        return this.confirmBoxComponentRefList.findIndex((item) => {
            return (_DialogUniqueID === item.instance.confirmBoxBelonging.EntityUniqueID);
        });
    }
}
ConfirmBoxService.ɵprov = i0.ɵɵdefineInjectable({ factory: function ConfirmBoxService_Factory() { return new ConfirmBoxService(i0.ɵɵinject(i0.ComponentFactoryResolver), i0.ɵɵinject(i0.INJECTOR), i0.ɵɵinject(i0.ApplicationRef)); }, token: ConfirmBoxService, providedIn: "root" });
ConfirmBoxService.decorators = [
    { type: Injectable, args: [{
                providedIn: "root",
            },] }
];
ConfirmBoxService.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: Injector },
    { type: ApplicationRef }
];

var ConfirmBoxClass;
(function (ConfirmBoxClass) {
    // region *** Public ***
    class ConfirmBoxInitializer {
        constructor() {
            /** @internal */
            this.confirmBoxCarrier = new ConfirmBoxClass.ConfirmBoxCarrier();
        }
        openConfirmBox$() {
            return this.confirmBoxCarrier.openConfirmBox$().pipe(map((resp) => {
                const basicConfirmBoxResponse = new ConfirmBoxResponse();
                const dataControl = new GlobalClass.DataControl();
                dataControl.copyValuesFrom(resp, basicConfirmBoxResponse);
                return basicConfirmBoxResponse;
            }), take(1));
        }
        setButtons(_Buttons) {
            this.confirmBoxCarrier.setButtons(_Buttons);
        }
        setConfig(_ConfirmBoxCoreConfig) {
            this.confirmBoxCarrier.setConfig(_ConfirmBoxCoreConfig);
        }
        setDispatch(_Title, _Message = null) {
            this.confirmBoxCarrier.setTitle(_Title);
            this.confirmBoxCarrier.setMessage(_Message);
        }
        setTitle(_Title) {
            this.confirmBoxCarrier.setTitle(_Title);
        }
        setMessage(_Message) {
            this.confirmBoxCarrier.setMessage(_Message);
        }
        setButtonLabels(_Confirm, _Decline) {
            this.confirmBoxCarrier.setButtonLabels(_Confirm, _Decline);
        }
    }
    ConfirmBoxClass.ConfirmBoxInitializer = ConfirmBoxInitializer;
    class ConfirmBoxResponse extends GlobalClass.DataControl {
        constructor() {
            super();
            // private Response: DialogPrepareResponse            = new DialogPrepareResponse();
            this.Success = null;
            this.ClickedButtonID = null;
        }
        setSuccess(_IsSuccess) {
            this.Success = _IsSuccess;
        }
        setClickedButtonID(_ClickedButtonID) {
            this.ClickedButtonID = _ClickedButtonID;
        }
    }
    ConfirmBoxClass.ConfirmBoxResponse = ConfirmBoxResponse;
    class ConfirmBoxEventsController {
        constructor(EntityUniqueID) {
            this.EntityUniqueID = EntityUniqueID;
            this._afterClosed = new Subject();
            this.afterClosed$ = this._afterClosed.asObservable();
            this._onButtonClick = new Subject();
            this.onButtonClick$ = this._onButtonClick.asObservable();
            this._buttonList = new Subject();
            this.buttonList$ = this._buttonList.asObservable();
        }
        close(_Response) {
            const response = _Response ? _Response : this.defaultResponse;
            this._afterClosed.next(response);
        }
        onButtonClick(_Button) {
            this.defaultResponse.setClickedButtonID(_Button.ID);
            this._onButtonClick.next(_Button);
        }
        setButtonList(_ButtonList) {
            this._buttonList.next(_ButtonList);
        }
        setDefaultResponse(_Response) {
            this.defaultResponse = _Response;
        }
    }
    ConfirmBoxClass.ConfirmBoxEventsController = ConfirmBoxEventsController;
    // endregion
    class ConfirmBoxDefaultResponse extends ConfirmBoxResponse {
        constructor() {
            super();
            this.confirmBoxBelonging = null;
        }
        setBelonging(_ConfirmBoxBelonging) {
            this.confirmBoxBelonging = _ConfirmBoxBelonging;
        }
    }
    ConfirmBoxClass.ConfirmBoxDefaultResponse = ConfirmBoxDefaultResponse;
    class ConfirmBoxCarrier {
        constructor() {
            this.confirmBoxBelonging = new ConfirmBoxClass.ConfirmBoxBelonging();
        }
        setButtons(_Buttons) {
            if (_Buttons.length) {
                this.confirmBoxBelonging.Buttons = _Buttons;
            }
        }
        setTitle(_Title) {
            this.confirmBoxBelonging.Dispatch.Title = _Title;
        }
        setMessage(_Message) {
            this.confirmBoxBelonging.Dispatch.Message = _Message;
        }
        setButtonLabels(_Confirm, _Decline) {
            this.confirmBoxBelonging.ConfirmBoxCoreConfig.ConfirmLabel = _Confirm;
            this.confirmBoxBelonging.ConfirmBoxCoreConfig.DeclineLabel = _Decline;
        }
        setConfig(_ConfirmBoxBelonging) {
            // region *** local UserConfig (defined on place where dialog is called) ***
            const dataControl = new GlobalClass.DataControl();
            dataControl.copyValuesFrom(_ConfirmBoxBelonging, this.confirmBoxBelonging.ConfirmBoxCoreConfig);
            // endregion
        }
        openConfirmBox$() {
            const service = ServiceLocator.injector.get(ConfirmBoxService);
            const confirmBoxController = service.open(this.confirmBoxBelonging);
            return confirmBoxController.afterClosed$;
        }
    }
    ConfirmBoxClass.ConfirmBoxCarrier = ConfirmBoxCarrier;
    class Settings {
        constructor() {
            this.Buttons = [];
            this.ConfirmBoxCoreConfig = new ConfirmBoxCoreConfig();
            this.Dispatch = new GlobalClass.Dispatch();
        }
    }
    ConfirmBoxClass.Settings = Settings;
    class ConfirmBoxCoreConfig {
        constructor() {
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
    }
    ConfirmBoxClass.ConfirmBoxCoreConfig = ConfirmBoxCoreConfig;
    class ConfirmBoxBelonging extends ConfirmBoxClass.Settings {
        constructor() {
            super();
            this.EntityUniqueID = "C" + Math.random().toString(36).substr(2, 9);
            this.EventsController = new ConfirmBoxEventsController(this.EntityUniqueID);
            const ConfirmBoxCoreConfigurator = ServiceLocator.injector.get(ConfirmBoxConfigService);
            const baseSettings = new ConfirmBoxClass.Settings();
            const dataControl = new GlobalClass.DataControl();
            dataControl.copyValuesFrom(ConfirmBoxCoreConfigurator.productionConfig.ConfirmBoxCoreConfig, baseSettings.ConfirmBoxCoreConfig);
            this.ConfirmBoxCoreConfig = baseSettings.ConfirmBoxCoreConfig;
            this.Buttons = ConfirmBoxCoreConfigurator.productionConfig.Buttons.slice();
        }
    }
    ConfirmBoxClass.ConfirmBoxBelonging = ConfirmBoxBelonging;
})(ConfirmBoxClass || (ConfirmBoxClass = {}));

class DefaultLoaderComponent {
}
DefaultLoaderComponent.decorators = [
    { type: Component, args: [{
                selector: "ed-default-loader",
                template: "<div class=\"box-position\">\n  <div class=\"loader-center\">\n    <div class=\"lds-ring\">\n      <div></div>\n      <div></div>\n      <div></div>\n      <div></div>\n    </div>\n  </div>\n</div>\n",
                styles: [".box-position{height:auto;left:50%;margin:0 auto;position:absolute;text-align:center;top:44%;transform:translate(-50%,-40%)}.box-position .loader-center{align-items:center;display:flex;justify-content:center}.box-position .loader-center .lds-ring{display:inline-block;height:80px;position:relative;width:80px}.box-position .loader-center .lds-ring div{animation:lds-ring 1.2s cubic-bezier(.5,0,.5,1) infinite;border:8px solid transparent;border-top-color:#d4d4d4;border-radius:50%;box-sizing:border-box;display:block;height:64px;margin:8px;position:absolute;width:64px}.box-position .loader-center .lds-ring div:first-child{animation-delay:-.45s}.box-position .loader-center .lds-ring div:nth-child(2){animation-delay:-.3s}.box-position .loader-center .lds-ring div:nth-child(3){animation-delay:-.15s}@keyframes lds-ring{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}"]
            },] }
];

class DialogConfigService {
    constructor(userConfig = {}) {
        this.userConfig = userConfig;
        this.authorConfig = new DialogClass.DialogSettings();
        this.productionConfig = new DialogClass.DialogSettings();
        // region *** dialog userConfig (user input app-module) ***
        const userConfigBase = new DialogClass.DialogSettings();
        const dataControl = new GlobalClass.DataControl();
        dataControl.copyValuesFrom(userConfig.DialogCoreConfig, userConfigBase.DialogCoreConfig); // this will make sure that object has right properties
        userConfig.DialogCoreConfig = userConfigBase.DialogCoreConfig;
        if (userConfig.DialogCoreConfig.LoaderComponent !== null) {
            userConfig.DialogCoreConfig.DisplayLoader =
                userConfig.DialogCoreConfig.DisplayLoader === null;
        }
        // endregion
        // region *** author default config values (if there is no user input) ***
        this.authorConfig.DialogCoreConfig.Width = "auto";
        this.authorConfig.DialogCoreConfig.Height = "auto";
        this.authorConfig.DialogCoreConfig.ButtonPosition = "right";
        this.authorConfig.DialogCoreConfig.DisplayLoader = false;
        this.authorConfig.DialogCoreConfig.LayoutType = DialogLayoutDisplay.NONE;
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
}
DialogConfigService.ɵprov = i0.ɵɵdefineInjectable({ factory: function DialogConfigService_Factory() { return new DialogConfigService(i0.ɵɵinject("dialogConfig")); }, token: DialogConfigService, providedIn: "root" });
DialogConfigService.decorators = [
    { type: Injectable, args: [{
                providedIn: "root",
            },] }
];
DialogConfigService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ["dialogConfig",] }] }
];

class InsertionLoaderDirective {
    constructor(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
}
InsertionLoaderDirective.decorators = [
    { type: Directive, args: [{
                selector: "[appInsertionLoader]",
            },] }
];
InsertionLoaderDirective.ctorParameters = () => [
    { type: ViewContainerRef }
];

class InsertionDirective {
    constructor(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
}
InsertionDirective.decorators = [
    { type: Directive, args: [{
                selector: "[appInsertion]",
            },] }
];
InsertionDirective.ctorParameters = () => [
    { type: ViewContainerRef }
];

class DialogWrapperComponent {
    constructor(dialogBelonging, componentFactoryResolver, cd) {
        this.dialogBelonging = dialogBelonging;
        this.componentFactoryResolver = componentFactoryResolver;
        this.cd = cd;
        this.fadeInOutAnimation = "open";
        this.showLoader = true;
    }
    ngAfterViewInit() {
        this.loadChildComponent(this.childComponentType);
        this.loadLoaderComponent(this.dialogBelonging.DialogCoreConfig.LoaderComponent);
        this.setDefaultResponse();
        this.cd.detectChanges();
    }
    setDefaultResponse() {
        const dialogResponse = new DialogClass.DialogDefaultResponse();
        dialogResponse.setBelonging(this.dialogBelonging);
        this.dialogBelonging.EventsController.setDefaultResponse(dialogResponse);
    }
    ngOnDestroy() {
        if (this.childComponentRef) {
            this.childComponentRef.destroy();
        }
        if (this.loaderComponentRef) {
            this.loaderComponentRef.destroy();
        }
    }
    loadChildComponent(_ComponentType) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(_ComponentType);
        const viewContainerRef = this.insertionPoint.viewContainerRef;
        viewContainerRef.clear();
        this.childComponentRef = viewContainerRef.createComponent(componentFactory);
        this.childComponentRef.instance.dialogBelonging = this.dialogBelonging;
    }
    loadLoaderComponent(_LoaderRef) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(_LoaderRef);
        const viewContainerRef = this.loaderInsertionPoint.viewContainerRef;
        viewContainerRef.clear();
        this.loaderComponentRef = viewContainerRef.createComponent(componentFactory);
    }
    close() {
        this.dialogBelonging.EventsController.close();
    }
    closeParent$(_ClosingAnimation) {
        this.fadeInOutAnimation = _ClosingAnimation;
        const timer = _ClosingAnimation === "close-slow" ? 1400 : 150;
        return new Observable((observer) => {
            observer.next("");
            observer.complete();
        }).pipe(delay(timer));
    }
    onOverlayClicked(evt) {
        // console.log('onOverlayClicked');
    }
    onCustomButton(_Button) {
        this.dialogBelonging.EventsController.onButtonClick(_Button);
    }
    closeLoader() {
        this.showLoader = false;
    }
}
DialogWrapperComponent.decorators = [
    { type: Component, args: [{
                selector: "dialog-popup-wrapper",
                template: "<div\n  class=\"ngx-awesome-popup-overlay\"\n  (dblclick)=\"onOverlayClicked($event)\"\n  [@fadeInOut]=\"fadeInOutAnimation\"\n>\n  <div\n    class=\"evolve-parent-dialog\"\n    [ngClass]=\"{\n      'standard-dialog': dialogBelonging.DialogCoreConfig.LayoutType === 0,\n      'success-dialog': dialogBelonging.DialogCoreConfig.LayoutType === 1,\n      'info-dialog': dialogBelonging.DialogCoreConfig.LayoutType === 2,\n      'warning-dialog': dialogBelonging.DialogCoreConfig.LayoutType === 3,\n      'danger-dialog': dialogBelonging.DialogCoreConfig.LayoutType === 4\n    }\"\n  >\n    <div\n      class=\"loader-holder\"\n      [ngClass]=\"\n        !dialogBelonging.DialogCoreConfig.DisplayLoader\n          ? 'dialog-loader-off'\n          : showLoader\n          ? 'dialog-loader-active'\n          : 'dialog-loader-gone'\n      \"\n    >\n      <!--dialogBelonging.DialogCoreConfig.DisplayLoader => initial config-->\n      <div class=\"dialog-loader\">\n        <ng-template appInsertionLoader></ng-template>\n      </div>\n    </div>\n\n    <div\n      class=\"content-holder\"\n      [ngStyle]=\"{\n        width: dialogBelonging.DialogCoreConfig.Width,\n        height: dialogBelonging.DialogCoreConfig.Height\n      }\"\n    >\n      <!--dialogBelonging.DialogCoreConfig.DisplayLoader => initial config-->\n      <div\n        class=\"component-content\"\n        [ngClass]=\"\n          !dialogBelonging.DialogCoreConfig.DisplayLoader\n            ? 'component-content-loader-off'\n            : showLoader\n            ? 'component-content-preparing'\n            : 'component-content-ready'\n        \"\n      >\n        <ng-template appInsertion></ng-template>\n      </div>\n    </div>\n\n    <div class=\"button-holder\">\n      <div\n        class=\"button-section\"\n        *ngIf=\"dialogBelonging.Buttons.length > 0\"\n        [ngStyle]=\"{\n          'text-align': dialogBelonging.DialogCoreConfig.ButtonPosition\n        }\"\n      >\n        <button\n          class=\"ed-btn ed-btn-lg\"\n          *ngFor=\"let button of dialogBelonging.Buttons\"\n          (click)=\"onCustomButton(button)\"\n          [ngClass]=\"{\n            '': button.LayoutType ? button.LayoutType === 0 : false,\n            'ed-btn-success': button.LayoutType\n              ? button.LayoutType === 1\n              : false,\n            'ed-btn-info': button.LayoutType ? button.LayoutType === 2 : false,\n            'ed-btn-warning': button.LayoutType\n              ? button.LayoutType === 3\n              : false,\n            'ed-btn-danger': button.LayoutType\n              ? button.LayoutType === 4\n              : false,\n            'ed-btn-dark': button.LayoutType ? button.LayoutType === 5 : false,\n            'ed-btn-light': button.LayoutType ? button.LayoutType === 6 : false,\n            'ed-btn-primary': button.LayoutType\n              ? button.LayoutType === 7\n              : false,\n            'ed-btn-secondary': button.LayoutType\n              ? button.LayoutType === 8\n              : false,\n            'ed-btn-link': button.LayoutType ? button.LayoutType === 9 : false\n          }\"\n        >\n          {{ button.Label }}\n        </button>\n      </div>\n    </div>\n  </div>\n</div>\n",
                animations: [fadeInOut(0, 1)],
                styles: ["@charset \"UTF-8\";.ed-btn-sm{font-size:12px;font-weight:400;margin-right:3px;min-width:40px;padding:2px 8px}.ed-btn-md{font-size:14px;margin-right:5px;min-width:60px;padding:3px 10px}.ed-btn-lg{font-size:16px;margin-right:5px;min-width:70px;padding:4px 10px}.ed-btn{background-color:initial;border:none;border-radius:3px;cursor:pointer;display:inline-block;line-height:1.5;text-align:center;text-decoration:none;-webkit-user-select:none;user-select:none;vertical-align:middle}.ed-btn:hover{color:#989ea5}.ed-btn-check:focus+.ed-btn,.ed-btn:focus{box-shadow:0 0 1px 2px;outline:0}.ed-btn-check:active+.ed-btn,.ed-btn-check:active+.ed-btn:focus,.ed-btn-check:checked+.ed-btn,.ed-btn-check:checked+.ed-btn:focus,.ed-btn.active,.ed-btn.active:focus,.ed-btn:active,.ed-btn:active:focus{box-shadow:0 0 1px 2px}.ed-btn.disabled,.ed-btn:disabled,fieldset:disabled .ed-btn{box-shadow:none;opacity:.6;pointer-events:none}.ed-btn-primary{color:hsla(0,0%,98.4%,.8);background:#ff9e00;border-color:#ff9e00}.ed-btn-primary:hover{color:#fbfbfb;border-color:#ffa81a;background:#ffb133}.ed-btn-check:focus+.ed-btn-primary,.ed-btn-primary:focus{outline:0;box-shadow:0 0 1px 2px #ffa81a}.ed-btn-check:active+.ed-btn-primary,.ed-btn-check:active+.ed-btn-primary:focus,.ed-btn-check:checked+.ed-btn-primary,.ed-btn-check:checked+.ed-btn-primary:focus,.ed-btn-primary.active,.ed-btn-primary.active:focus,.ed-btn-primary:active,.ed-btn-primary:active:focus{box-shadow:0 0 1px 2px #ffa81a}.ed-btn-secondary{color:hsla(0,0%,98.4%,.8);background:#989ea5;border-color:#989ea5}.ed-btn-secondary:hover{color:#fbfbfb;border-color:#a6abb1;background:#b3b8bd}.ed-btn-check:focus+.ed-btn-secondary,.ed-btn-secondary:focus{outline:0;box-shadow:0 0 1px 2px #a6abb1}.ed-btn-check:active+.ed-btn-secondary,.ed-btn-check:active+.ed-btn-secondary:focus,.ed-btn-check:checked+.ed-btn-secondary,.ed-btn-check:checked+.ed-btn-secondary:focus,.ed-btn-secondary.active,.ed-btn-secondary.active:focus,.ed-btn-secondary:active,.ed-btn-secondary:active:focus{box-shadow:0 0 1px 2px #a6abb1}.ed-btn-success{color:hsla(0,0%,98.4%,.8);background:#3caea3;border-color:#3caea3}.ed-btn-success:hover{color:#fbfbfb;border-color:#45bfb3;background:#58c5bb}.ed-btn-check:focus+.ed-btn-success,.ed-btn-success:focus{outline:0;box-shadow:0 0 1px 2px #45bfb3}.ed-btn-check:active+.ed-btn-success,.ed-btn-check:active+.ed-btn-success:focus,.ed-btn-check:checked+.ed-btn-success,.ed-btn-check:checked+.ed-btn-success:focus,.ed-btn-success.active,.ed-btn-success.active:focus,.ed-btn-success:active,.ed-btn-success:active:focus{box-shadow:0 0 1px 2px #45bfb3}.ed-btn-info{color:hsla(0,0%,98.4%,.8);background:#2f8ee5;border-color:#2f8ee5}.ed-btn-info:hover{color:#fbfbfb;border-color:#469ae8;background:#5ca7eb}.ed-btn-check:focus+.ed-btn-info,.ed-btn-info:focus{outline:0;box-shadow:0 0 1px 2px #469ae8}.ed-btn-check:active+.ed-btn-info,.ed-btn-check:active+.ed-btn-info:focus,.ed-btn-check:checked+.ed-btn-info,.ed-btn-check:checked+.ed-btn-info:focus,.ed-btn-info.active,.ed-btn-info.active:focus,.ed-btn-info:active,.ed-btn-info:active:focus{box-shadow:0 0 1px 2px #469ae8}.ed-btn-warning{color:hsla(0,0%,98.4%,.8);background:#ffc107;border-color:#ffc107}.ed-btn-warning:hover{color:#fbfbfb;border-color:#ffc721;background:#ffce3a}.ed-btn-check:focus+.ed-btn-warning,.ed-btn-warning:focus{outline:0;box-shadow:0 0 1px 2px #ffc721}.ed-btn-check:active+.ed-btn-warning,.ed-btn-check:active+.ed-btn-warning:focus,.ed-btn-check:checked+.ed-btn-warning,.ed-btn-check:checked+.ed-btn-warning:focus,.ed-btn-warning.active,.ed-btn-warning.active:focus,.ed-btn-warning:active,.ed-btn-warning:active:focus{box-shadow:0 0 1px 2px #ffc721}.ed-btn-danger{color:hsla(0,0%,98.4%,.8);background:#e46464;border-color:#e46464}.ed-btn-danger:hover{color:#fbfbfb;border-color:#e87a7a;background:#ec8f8f}.ed-btn-check:focus+.ed-btn-danger,.ed-btn-danger:focus{outline:0;box-shadow:0 0 1px 2px #e87a7a}.ed-btn-check:active+.ed-btn-danger,.ed-btn-check:active+.ed-btn-danger:focus,.ed-btn-check:checked+.ed-btn-danger,.ed-btn-check:checked+.ed-btn-danger:focus,.ed-btn-danger.active,.ed-btn-danger.active:focus,.ed-btn-danger:active,.ed-btn-danger:active:focus{box-shadow:0 0 1px 2px #e87a7a}.ed-btn-light{color:rgba(52,58,64,.8);background:#fbfbfb;border-color:#fbfbfb}.ed-btn-light:hover{color:#343a40;border-color:#fff;background:#fff}.ed-btn-check:focus+.ed-btn-light,.ed-btn-light:focus{outline:0;box-shadow:0 0 1px 2px #fff}.ed-btn-check:active+.ed-btn-light,.ed-btn-check:active+.ed-btn-light:focus,.ed-btn-check:checked+.ed-btn-light,.ed-btn-check:checked+.ed-btn-light:focus,.ed-btn-light.active,.ed-btn-light.active:focus,.ed-btn-light:active,.ed-btn-light:active:focus{box-shadow:0 0 1px 2px #fff}.ed-btn-dark{color:hsla(0,0%,98.4%,.8);background:#343a40;border-color:#343a40}.ed-btn-dark:hover{color:#fbfbfb;border-color:#3f474e;background:#4b545c}.ed-btn-check:focus+.ed-btn-dark,.ed-btn-dark:focus{outline:0;box-shadow:0 0 1px 2px #3f474e}.ed-btn-check:active+.ed-btn-dark,.ed-btn-check:active+.ed-btn-dark:focus,.ed-btn-check:checked+.ed-btn-dark,.ed-btn-check:checked+.ed-btn-dark:focus,.ed-btn-dark.active,.ed-btn-dark.active:focus,.ed-btn-dark:active,.ed-btn-dark:active:focus{box-shadow:0 0 1px 2px #3f474e}@font-face{font-family:icomoon;src:url(\"data:font/eot;base64,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\");src:url(\"data:font/eot;base64,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\") format(\"embedded-opentype\"),url(\"data:font/ttf;base64,AAEAAAALAIAAAwAwT1MvMg8SBW8AAAC8AAAAYGNtYXAXVtKKAAABHAAAAFRnYXNwAAAAEAAAAXAAAAAIZ2x5ZsOYH0cAAAF4AAADlGhlYWQcaMOsAAAFDAAAADZoaGVhB7kDyQAABUQAAAAkaG10eBRKAAkAAAVoAAAAIGxvY2EC7gIUAAAFiAAAABJtYXhwAAwAWgAABZwAAAAgbmFtZZlKCfsAAAW8AAABhnBvc3QAAwAAAAAHRAAAACAAAwNCAZAABQAAApkCzAAAAI8CmQLMAAAB6wAzAQkAAAAAAAAAAAAAAAAAAAABEAAAAAAAAAAAAAAAAAAAAABAAADpAwPA/8AAQAPAAEAAAAABAAAAAAAAAAAAAAAgAAAAAAADAAAAAwAAABwAAQADAAAAHAADAAEAAAAcAAQAOAAAAAoACAACAAIAAQAg6QP//f//AAAAAAAg6QD//f//AAH/4xcEAAMAAQAAAAAAAAAAAAAAAQAB//8ADwABAAAAAAAAAAAAAgAANzkBAAAAAAEAAAAAAAAAAAACAAA3OQEAAAAAAQAAAAAAAAAAAAIAADc5AQAAAAACAAAAAANuA24AOwBXAAABNCYvATc+ATU0Ji8BLgEjIgYPAScuASMiBg8BDgEVFBYfAQcOARUUFh8BHgEzMjY/ARceATMyNj8BPgE3FAcOAQcGIyInLgEnJjU0Nz4BNzYzMhceARcWApEGBWhoBQYGBTQFDgcHDgVnaAUNBwgNBjMFBgYFZ2cFBgYFMwYNCAcNBWhnBQ4HBw4FNAUG3SMid1BQW1tQUHcjIiIjd1BQW1tQUHciIwE2Bw0FaGcFDgcHDgU0BQYGBWhoBQYGBTQFDgcHDgVnaAUNBwgNBjMFBgYFZ2cFBgYFMwYNiVtQUHciIyMid1BQW1tQUHciIyMid1BQAAMACQAAA/cDtwAPACYAPAAAJTU0JisBIgYdARQWOwEyNicTNCYnLgErASIGBw4BFRMUFjsBMjY1AwEWFAcOASMhIiYnJjQ3AT4BMzIWFwJJCghuCAoKCG4ICgEKAgMDBwR+BAcDAwIJDAhqBwwIAbcJCgoiE/ySEyIKCgkBtwkjFBQjCaVtBwwMB20ICwveAQYDBgICBAQCAgcD/vsGBwcGAhb82xEmERETExERJhEDJREVFREAAAACAAAAAANuA24AJABAAAABNCYvAS4BIyIGDwEnLgEjIgYPAQ4BFRQWHwEeATMyNjcBPgE1FxQHDgEHBiMiJy4BJyY1NDc+ATc2MzIXHgEXFgLeBQY0BQ0HCA0F6YEFDgcHDgU0BQUFBc8FDgcHDgUBNgYFkCMid1BQW1tQUHcjIiIjd1BQW1tQUHciIwITCA4FMwUGBgXogQUGBgU0BQ4HBw4FzwUFBQUBNwUNB1xbUFB3IiMjIndQUFtbUFB3IiMjIndQUAAAAAMAAAAAA24DbgAfAC8ASwAAJTU0JisBETQmKwEiBh0BFBY7ARUjIgYdARQWMyEyNjUDNTQmKwEiBh0BFBY7ATI2BRQHDgEHBiMiJy4BJyY1NDc+ATc2MzIXHgEXFgJJCgg3Cwe3CAoKCDc3CAoKCAEACApJCwduCAoKCG4HCwFuIyJ3UFBbW1BQdyMiIiN3UFBbW1BQdyIjpVsICgElCAoKCFwHC7cKCFsICwsIAgBbCAoKCFsICwvmW1BQdyIjIyJ3UFBbW1BQdyIjIyJ3UFAAAAAAAQAAAAAAAMDOb/9fDzz1AAsEAAAAAADcqj98AAAAANyqP3wAAAAAA/cDtwAAAAgAAgAAAAAAAAABAAADwP/AAAAEAAAAAAAD9wABAAAAAAAAAAAAAAAAAAAACAQAAAAAAAAAAAAAAAIAAAADbgAABAAACQNuAAADbgAAAAAAAAAKABQAHgCgAPwBYAHKAAAAAQAAAAgAWAADAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAA4ArgABAAAAAAABAAcAAAABAAAAAAACAAcAYAABAAAAAAADAAcANgABAAAAAAAEAAcAdQABAAAAAAAFAAsAFQABAAAAAAAGAAcASwABAAAAAAAKABoAigADAAEECQABAA4ABwADAAEECQACAA4AZwADAAEECQADAA4APQADAAEECQAEAA4AfAADAAEECQAFABYAIAADAAEECQAGAA4AUgADAAEECQAKADQApGljb21vb24AaQBjAG8AbQBvAG8AblZlcnNpb24gMS4wAFYAZQByAHMAaQBvAG4AIAAxAC4AMGljb21vb24AaQBjAG8AbQBvAG8Abmljb21vb24AaQBjAG8AbQBvAG8AblJlZ3VsYXIAUgBlAGcAdQBsAGEAcmljb21vb24AaQBjAG8AbQBvAG8AbkZvbnQgZ2VuZXJhdGVkIGJ5IEljb01vb24uAEYAbwBuAHQAIABnAGUAbgBlAHIAYQB0AGUAZAAgAGIAeQAgAEkAYwBvAE0AbwBvAG4ALgAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=\") format(\"truetype\"),url(\"data:font/woff;base64,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\") format(\"woff\"),url(\"data:font/svg;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiID4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPG1ldGFkYXRhPkdlbmVyYXRlZCBieSBJY29Nb29uPC9tZXRhZGF0YT4KCTxkZWZzPgoJCTxmb250IGlkPSJpY29tb29uIiBob3Jpei1hZHYteD0iMTAyNCI+CgkJCTxmb250LWZhY2UgdW5pdHMtcGVyLWVtPSIxMDI0IiBhc2NlbnQ9Ijk2MCIgZGVzY2VudD0iLTY0Ii8+CgkJCTxtaXNzaW5nLWdseXBoIGhvcml6LWFkdi14PSIxMDI0Ii8+CgkJCTxnbHlwaCB1bmljb2RlPSImI3gyMDsiIGhvcml6LWFkdi14PSI1MTIiIGQ9IiIvPgoJCQk8Z2x5cGggdW5pY29kZT0iJiN4ZTkwMDsiIGdseXBoLW5hbWU9InRpbWVzLWNpcmNsZSIgaG9yaXotYWR2LXg9Ijg3OCIgZD0iTTY1Ni41NzEgMzA5LjcxNGMwIDkuNzE0LTQgMTguODU3LTEwLjg1NyAyNS43MTRsLTEwMy40MjkgMTAzLjQyOSAxMDMuNDI5IDEwMy40MjljNi44NTcgNi44NTcgMTAuODU3IDE2IDEwLjg1NyAyNS43MTRzLTQgMTkuNDI5LTEwLjg1NyAyNi4yODZsLTUxLjQyOSA1MS40MjljLTYuODU3IDYuODU3LTE2LjU3MSAxMC44NTctMjYuMjg2IDEwLjg1N3MtMTguODU3LTQtMjUuNzE0LTEwLjg1N2wtMTAzLjQyOS0xMDMuNDI5LTEwMy40MjkgMTAzLjQyOWMtNi44NTcgNi44NTctMTYgMTAuODU3LTI1LjcxNCAxMC44NTdzLTE5LjQyOS00LTI2LjI4Ni0xMC44NTdsLTUxLjQyOS01MS40MjljLTYuODU3LTYuODU3LTEwLjg1Ny0xNi41NzEtMTAuODU3LTI2LjI4NnM0LTE4Ljg1NyAxMC44NTctMjUuNzE0bDEwMy40MjktMTAzLjQyOS0xMDMuNDI5LTEwMy40MjljLTYuODU3LTYuODU3LTEwLjg1Ny0xNi0xMC44NTctMjUuNzE0czQtMTkuNDI5IDEwLjg1Ny0yNi4yODZsNTEuNDI5LTUxLjQyOWM2Ljg1Ny02Ljg1NyAxNi41NzEtMTAuODU3IDI2LjI4Ni0xMC44NTdzMTguODU3IDQgMjUuNzE0IDEwLjg1N2wxMDMuNDI5IDEwMy40MjkgMTAzLjQyOS0xMDMuNDI5YzYuODU3LTYuODU3IDE2LTEwLjg1NyAyNS43MTQtMTAuODU3czE5LjQyOSA0IDI2LjI4NiAxMC44NTdsNTEuNDI5IDUxLjQyOWM2Ljg1NyA2Ljg1NyAxMC44NTcgMTYuNTcxIDEwLjg1NyAyNi4yODZ6TTg3Ny43MTQgNDM4Ljg1N2MwLTI0Mi4yODYtMTk2LjU3MS00MzguODU3LTQzOC44NTctNDM4Ljg1N3MtNDM4Ljg1NyAxOTYuNTcxLTQzOC44NTcgNDM4Ljg1NyAxOTYuNTcxIDQzOC44NTcgNDM4Ljg1NyA0MzguODU3IDQzOC44NTctMTk2LjU3MSA0MzguODU3LTQzOC44NTd6Ii8+CgkJCTxnbHlwaCB1bmljb2RlPSImI3hlOTAxOyIgZ2x5cGgtbmFtZT0iZXhjbGFtYXRpb24tdHJpYW5nbGUsIHdhcm5pbmciIGQ9Ik01ODUuMTQzIDE2NS4xNDN2MTA4LjU3MWMwIDEwLjI4Ni04IDE4Ljg1Ny0xOC4yODYgMTguODU3aC0xMDkuNzE0Yy0xMC4yODYgMC0xOC4yODYtOC41NzEtMTguMjg2LTE4Ljg1N3YtMTA4LjU3MWMwLTEwLjI4NiA4LTE4Ljg1NyAxOC4yODYtMTguODU3aDEwOS43MTRjMTAuMjg2IDAgMTguMjg2IDguNTcxIDE4LjI4NiAxOC44NTd6TTU4NCAzNzguODU3bDEwLjI4NiAyNjIuMjg2YzAgMy40MjktMS43MTQgOC01LjcxNCAxMC44NTctMy40MjkgMi44NTctOC41NzEgNi4yODYtMTMuNzE0IDYuMjg2aC0xMjUuNzE0Yy01LjE0MyAwLTEwLjI4Ni0zLjQyOS0xMy43MTQtNi4yODYtNC0yLjg1Ny01LjcxNC04LjU3MS01LjcxNC0xMmw5LjcxNC0yNjEuMTQzYzAtNy40MjkgOC41NzEtMTMuMTQzIDE5LjQyOS0xMy4xNDNoMTA1LjcxNGMxMC4yODYgMCAxOC44NTcgNS43MTQgMTkuNDI5IDEzLjE0M3pNNTc2IDkxMi41NzFsNDM4Ljg1Ny04MDQuNTcxYzEyLjU3MS0yMi4yODYgMTItNDkuNzE0LTEuMTQzLTcycy0zNy4xNDMtMzYtNjIuODU3LTM2aC04NzcuNzE0Yy0yNS43MTQgMC00OS43MTQgMTMuNzE0LTYyLjg1NyAzNnMtMTMuNzE0IDQ5LjcxNC0xLjE0MyA3Mmw0MzguODU3IDgwNC41NzFjMTIuNTcxIDIzLjQyOSAzNy4xNDMgMzguMjg2IDY0IDM4LjI4NnM1MS40MjktMTQuODU3IDY0LTM4LjI4NnoiLz4KCQkJPGdseXBoIHVuaWNvZGU9IiYjeGU5MDI7IiBnbHlwaC1uYW1lPSJjaGVjay1jaXJjbGUiIGhvcml6LWFkdi14PSI4NzgiIGQ9Ik03MzMuNzE0IDUzMS40MjhjMCA5LjcxNC0zLjQyOSAxOS40MjktMTAuMjg2IDI2LjI4NmwtNTIgNTEuNDI5Yy02Ljg1NyA2Ljg1Ny0xNiAxMC44NTctMjUuNzE0IDEwLjg1N3MtMTguODU3LTQtMjUuNzE0LTEwLjg1N2wtMjMzLjE0My0yMzIuNTcxLTEyOS4xNDMgMTI5LjE0M2MtNi44NTcgNi44NTctMTYgMTAuODU3LTI1LjcxNCAxMC44NTdzLTE4Ljg1Ny00LTI1LjcxNC0xMC44NTdsLTUyLTUxLjQyOWMtNi44NTctNi44NTctMTAuMjg2LTE2LjU3MS0xMC4yODYtMjYuMjg2czMuNDI5LTE4Ljg1NyAxMC4yODYtMjUuNzE0bDIwNi44NTctMjA2Ljg1N2M2Ljg1Ny02Ljg1NyAxNi41NzEtMTAuODU3IDI1LjcxNC0xMC44NTcgOS43MTQgMCAxOS40MjkgNCAyNi4yODYgMTAuODU3bDMxMC4yODYgMzEwLjI4NmM2Ljg1NyA2Ljg1NyAxMC4yODYgMTYgMTAuMjg2IDI1LjcxNHpNODc3LjcxNCA0MzguODU3YzAtMjQyLjI4Ni0xOTYuNTcxLTQzOC44NTctNDM4Ljg1Ny00MzguODU3cy00MzguODU3IDE5Ni41NzEtNDM4Ljg1NyA0MzguODU3IDE5Ni41NzEgNDM4Ljg1NyA0MzguODU3IDQzOC44NTcgNDM4Ljg1Ny0xOTYuNTcxIDQzOC44NTctNDM4Ljg1N3oiLz4KCQkJPGdseXBoIHVuaWNvZGU9IiYjeGU5MDM7IiBnbHlwaC1uYW1lPSJpbmZvLWNpcmNsZSIgaG9yaXotYWR2LXg9Ijg3OCIgZD0iTTU4NS4xNDMgMTY0LjU3MXY5MS40MjljMCAxMC4yODYtOCAxOC4yODYtMTguMjg2IDE4LjI4NmgtNTQuODU3djI5Mi41NzFjMCAxMC4yODYtOCAxOC4yODYtMTguMjg2IDE4LjI4NmgtMTgyLjg1N2MtMTAuMjg2IDAtMTguMjg2LTgtMTguMjg2LTE4LjI4NnYtOTEuNDI5YzAtMTAuMjg2IDgtMTguMjg2IDE4LjI4Ni0xOC4yODZoNTQuODU3di0xODIuODU3aC01NC44NTdjLTEwLjI4NiAwLTE4LjI4Ni04LTE4LjI4Ni0xOC4yODZ2LTkxLjQyOWMwLTEwLjI4NiA4LTE4LjI4NiAxOC4yODYtMTguMjg2aDI1NmMxMC4yODYgMCAxOC4yODYgOCAxOC4yODYgMTguMjg2ek01MTIgNjc2LjU3MXY5MS40MjljMCAxMC4yODYtOCAxOC4yODYtMTguMjg2IDE4LjI4NmgtMTA5LjcxNGMtMTAuMjg2IDAtMTguMjg2LTgtMTguMjg2LTE4LjI4NnYtOTEuNDI5YzAtMTAuMjg2IDgtMTguMjg2IDE4LjI4Ni0xOC4yODZoMTA5LjcxNGMxMC4yODYgMCAxOC4yODYgOCAxOC4yODYgMTguMjg2ek04NzcuNzE0IDQzOC44NTdjMC0yNDIuMjg2LTE5Ni41NzEtNDM4Ljg1Ny00MzguODU3LTQzOC44NTdzLTQzOC44NTcgMTk2LjU3MS00MzguODU3IDQzOC44NTcgMTk2LjU3MSA0MzguODU3IDQzOC44NTcgNDM4Ljg1NyA0MzguODU3LTE5Ni41NzEgNDM4Ljg1Ny00MzguODU3eiIvPgoJCTwvZm9udD48L2RlZnM+Cjwvc3ZnPgo=\") format(\"svg\");font-weight:400;font-style:normal;font-display:block}[class*=\" icon-\"],[class^=icon-]{font-family:icomoon!important;-webkit-font-smoothing:antialiased;font-style:normal;font-variant:normal;font-weight:400;line-height:1;-moz-osx-font-smoothing:grayscale;speak:never;text-transform:none}.icon-times-circle:before{content:\"\uE900\"}.icon-exclamation-triangle:before,.icon-warning:before{content:\"\uE901\"}.icon-check-circle:before{content:\"\uE902\"}.icon-info-circle:before{content:\"\uE903\"}.ngx-awesome-popup-overlay{align-items:center;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px);background:rgba(51,32,0,.4);bottom:0;display:flex;flex-direction:column;justify-content:center;left:0;opacity:0;position:fixed;right:0;top:0;z-index:999999999}.evolve-confirm-box .text-wrapper,.evolve-parent-dialog .text-wrapper{text-align:center}.evolve-confirm-box .text-wrapper-section,.evolve-parent-dialog .text-wrapper-section,.evolve-toast .text-wrapper-section{width:100%}.evolve-confirm-box .text-wrapper-section .text-wrapper,.evolve-parent-dialog .text-wrapper-section .text-wrapper,.evolve-toast .text-wrapper-section .text-wrapper{display:block;width:100%}.evolve-confirm-box .text-wrapper-section .dont-break-out,.evolve-parent-dialog .text-wrapper-section .dont-break-out,.evolve-toast .text-wrapper-section .dont-break-out{-webkit-hyphens:auto;hyphens:auto;overflow-wrap:break-word;white-space:pre-wrap;word-wrap:break-word}.evolve-confirm-box,.evolve-parent-dialog{background:#fbfbfb;border-radius:5px;border-top:7px solid;box-shadow:0 0 4px 1px rgba(0,0,0,.25);display:flex;flex-direction:column;max-height:calc(100vh - 100px);max-width:calc(100vw - 100px);position:relative;vertical-align:bottom}.evolve-confirm-box.standard-dialog,.evolve-parent-dialog.standard-dialog{border-color:transparent;padding:17px 20px 10px}.evolve-confirm-box.success-dialog,.evolve-parent-dialog.success-dialog{border-color:#3caea3}.evolve-confirm-box.info-dialog,.evolve-parent-dialog.info-dialog{border-color:#2f8ee5}.evolve-confirm-box.warning-dialog,.evolve-parent-dialog.warning-dialog{border-color:#ffc107}.evolve-confirm-box.danger-dialog,.evolve-parent-dialog.danger-dialog{border-color:#e46464}.ap-icon-success{color:#58c5bb}.ap-icon-info{color:#5ca7eb}.ap-icon-warning{color:#ffce3a}.ap-icon-danger{color:#ec8f8f}.evolve-parent-dialog{padding:20px 20px 10px}.evolve-parent-dialog .component-content{height:100%;max-width:95vw;transition-delay:.4s;transition-duration:.4s;transition-property:opacity;transition-timing-function:linear;width:100%}.evolve-parent-dialog .component-content-loader-off{opacity:1!important;transition:none!important}.evolve-parent-dialog .component-content-preparing{opacity:0;transition:none!important}.evolve-parent-dialog .component-content-ready{height:100%;opacity:1}.evolve-parent-dialog .dialog-loader{opacity:1}.evolve-parent-dialog .dialog-loader-off{display:none;opacity:0!important}.evolve-parent-dialog .dialog-loader-gone{opacity:0;pointer-events:none}.evolve-parent-dialog .dialog-loader-active{opacity:1}.loader-holder{align-items:center;background:#fbfbfb;height:100%;justify-content:center;margin:-20px;opacity:1;position:absolute;transition-delay:.4s;transition-duration:.4s;transition-property:opacity;transition-timing-function:linear;width:100%}.content-holder,.loader-holder{display:flex;flex-direction:column}.content-holder{max-width:calc(100vw - 100px);overflow:auto}.button-holder{display:flex;flex-direction:column;justify-content:flex-end;width:100%}.button-holder .button-section{background:rgba(222,226,230,.2);border-top:1px solid rgba(152,158,165,.2);margin:20px -20px -10px;padding:5px 20px}"]
            },] }
];
DialogWrapperComponent.ctorParameters = () => [
    { type: DialogClass.DialogBelonging },
    { type: ComponentFactoryResolver },
    { type: ChangeDetectorRef }
];
DialogWrapperComponent.propDecorators = {
    insertionPoint: [{ type: ViewChild, args: [InsertionDirective, { static: true },] }],
    loaderInsertionPoint: [{ type: ViewChild, args: [InsertionLoaderDirective, { static: true },] }]
};

class DialogService {
    constructor(componentFactoryResolver, injector, appRef) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.injector = injector;
        this.appRef = appRef;
        this.dialogParentComponentRefList = [];
    }
    open(_ComponentType, _DialogBelonging) {
        const dialogController = _DialogBelonging.EventsController;
        const componentRef = this.getComponentRef(dialogController, _DialogBelonging);
        this.dialogParentComponentRefList.push(componentRef);
        componentRef.instance.dialogBelonging = _DialogBelonging;
        componentRef.instance.childComponentType = _ComponentType;
        this.appendToBodyParentComponent(componentRef);
        this.listeners(dialogController);
        return dialogController;
    }
    getComponentRef(_EventsController, _DialogBelonging) {
        let componentFactory;
        const dialogIndex = this.findDialogIndex(_DialogBelonging.EntityUniqueID);
        if (dialogIndex === -1) {
            const weakMap = new WeakMap();
            weakMap.set(DialogClass.DialogEventsController, _EventsController);
            componentFactory = this.componentFactoryResolver.resolveComponentFactory(DialogWrapperComponent);
            return componentFactory.create(new DialogInjector(this.injector, weakMap));
        }
        return null;
    }
    listeners(_EventsController) {
        // Listener for closing dialog
        const closeDialogSubscription = _EventsController.afterClosed$.subscribe((response) => {
            const modalIndex = this.findDialogIndex(response.DialogBelonging.EntityUniqueID);
            this.removeFromBodyDialogWrapperComponent(modalIndex);
            closeDialogSubscription.unsubscribe();
        });
        // Listener for turning off loader
        const closeLoaderSubscription = _EventsController.afterLoader$.subscribe((_DialogUniqueID) => {
            if (_DialogUniqueID) {
                const modalIndex = this.findDialogIndex(_DialogUniqueID);
                if (modalIndex !== -1) {
                    this.dialogParentComponentRefList[modalIndex].instance.closeLoader();
                }
            }
            closeLoaderSubscription.unsubscribe();
        });
    }
    childComponentResolver() { }
    appendToBodyParentComponent(_ComponentRef) {
        // attach view to ignite lifecycle hooks
        this.appRef.attachView(_ComponentRef.hostView);
        // DOM
        const domElem = _ComponentRef.hostView
            .rootNodes[0];
        document.body.appendChild(domElem);
    }
    closeDialogWrapperComponent(_DialogUniqueID) {
        const modalIndex = this.findDialogIndex(_DialogUniqueID);
        this.removeFromBodyDialogWrapperComponent(modalIndex);
    }
    removeFromBodyDialogWrapperComponent(_DialogIndex) {
        if (_DialogIndex > -1) {
            this.dialogParentComponentRefList[_DialogIndex].instance
                .closeParent$("close-fast")
                .pipe(map((item) => {
                this.appRef.detachView(this.dialogParentComponentRefList[_DialogIndex].hostView);
                this.dialogParentComponentRefList[_DialogIndex].destroy();
                this.dialogParentComponentRefList.splice(_DialogIndex, 1);
            }))
                .subscribe();
        }
    }
    findDialogIndex(_DialogUniqueID) {
        return this.dialogParentComponentRefList.findIndex((item) => {
            return _DialogUniqueID === item.instance.dialogBelonging.EntityUniqueID;
        });
    }
}
DialogService.ɵprov = i0.ɵɵdefineInjectable({ factory: function DialogService_Factory() { return new DialogService(i0.ɵɵinject(i0.ComponentFactoryResolver), i0.ɵɵinject(i0.INJECTOR), i0.ɵɵinject(i0.ApplicationRef)); }, token: DialogService, providedIn: "root" });
DialogService.decorators = [
    { type: Injectable, args: [{
                providedIn: "root",
            },] }
];
DialogService.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: Injector },
    { type: ApplicationRef }
];

var DialogClass;
(function (DialogClass) {
    // region *** Public ***
    class DialogInitializer {
        constructor(component) {
            this.component = component;
            this.dialogCarrier = new DialogClass.DialogCarrier();
            this.dialogCarrier.setComponent(this.component);
        }
        /** Generic method accept expected payload from dynamic child component.*/
        openDialog$() {
            return this.dialogCarrier.openDialog$().pipe(map((resp) => {
                const basicDialogResponse = new DialogResponse();
                const dataControl = new GlobalClass.DataControl();
                dataControl.copyValuesFrom(resp, basicDialogResponse);
                return basicDialogResponse;
            }), take(1));
        }
        /** It accepts list of custom buttons */
        setButtons(_Buttons) {
            this.dialogCarrier.setButtons(_Buttons);
        }
        setCustomData(_CustomData) {
            this.dialogCarrier.setCustomData(_CustomData);
        }
        setConfig(_DialogConfig) {
            this.dialogCarrier.setConfig(_DialogConfig);
        }
    }
    DialogClass.DialogInitializer = DialogInitializer;
    class DialogResponse extends GlobalClass.DataControl {
        constructor() {
            super();
            // private Response: DialogPrepareResponse            = new DialogPrepareResponse();
            this.Payload = null;
            this.Success = null;
            this.ClickedButtonID = null;
        }
        /**
         * @ignore
         */
        setPayload(_Payload) {
            this.Payload = _Payload;
        }
        /**
         * @ignore
         */
        setClickedButtonID(_ClickedButtonID) {
            this.ClickedButtonID = _ClickedButtonID;
        }
    }
    DialogClass.DialogResponse = DialogResponse;
    class DialogEventsController {
        constructor(EntityUniqueID) {
            this.EntityUniqueID = EntityUniqueID;
            this._afterClosed = new Subject();
            this.afterClosed$ = this._afterClosed.asObservable();
            this._afterLoader = new Subject();
            this.afterLoader$ = this._afterLoader.asObservable();
            this._onButtonClick = new Subject();
            this.onButtonClick$ = this._onButtonClick.asObservable();
            this._buttonList = new Subject();
            this.buttonList$ = this._buttonList.asObservable();
        }
        close(_Payload = null) {
            this.defaultResponse.setPayload(_Payload);
            this._afterClosed.next(this.defaultResponse);
        }
        onButtonClick(_Button) {
            this.defaultResponse.setClickedButtonID(_Button.ID);
            this._onButtonClick.next(_Button);
        }
        setButtonList(_ButtonList) {
            this._buttonList.next(_ButtonList);
        }
        closeLoader() {
            setTimeout(() => {
                this._afterLoader.next(this.EntityUniqueID);
            }, 0);
        }
        setDefaultResponse(_Response) {
            this.defaultResponse = _Response;
        }
    }
    DialogClass.DialogEventsController = DialogEventsController;
    // endregion
    class DialogDefaultResponse extends DialogResponse {
        constructor() {
            super();
            this.DialogBelonging = null;
        }
        setBelonging(_DialogBelonging) {
            this.DialogBelonging = _DialogBelonging;
        }
    }
    DialogClass.DialogDefaultResponse = DialogDefaultResponse;
    class DialogCarrier {
        constructor() {
            this.dialogBelonging = new DialogBelonging();
        }
        setComponent(_Component) {
            this.component = _Component;
        }
        setButtons(_Buttons) {
            if (_Buttons.length) {
                this.dialogBelonging.Buttons = _Buttons;
            }
        }
        setCustomData(_CustomData) {
            this.dialogBelonging.CustomData = _CustomData;
        }
        setConfig(_DialogConfig) {
            // region *** local UserConfig (defined on place where dialog is called) ***
            const dataControl = new GlobalClass.DataControl();
            dataControl.copyValuesFrom(_DialogConfig, this.dialogBelonging.DialogCoreConfig);
            if (_DialogConfig === null || _DialogConfig === void 0 ? void 0 : _DialogConfig.LoaderComponent) {
                this.dialogBelonging.DialogCoreConfig.DisplayLoader = true;
            }
            // endregion
        }
        openDialog$() {
            const service = ServiceLocator.injector.get(DialogService);
            const dialogController = service.open(this.component, this.dialogBelonging);
            return dialogController.afterClosed$;
        }
    }
    DialogClass.DialogCarrier = DialogCarrier;
    class DialogCoreConfig {
        constructor() {
            this.Width = null;
            this.Height = null;
            this.ButtonPosition = null;
            this.LayoutType = null;
            this.DisplayLoader = null;
            this.LoaderComponent = null;
        }
    }
    DialogClass.DialogCoreConfig = DialogCoreConfig;
    class DialogSettings {
        constructor() {
            this.Buttons = [];
            this.DialogCoreConfig = new DialogCoreConfig();
        }
    }
    DialogClass.DialogSettings = DialogSettings;
    class DialogBelonging extends DialogSettings {
        constructor() {
            super();
            /** @internal */
            this.EntityUniqueID = "D" + Math.random().toString(36).substr(2, 9);
            this.CustomData = null;
            this.EventsController = new DialogEventsController(this.EntityUniqueID);
            const dialogConfigurator = ServiceLocator.injector.get(DialogConfigService);
            const baseSettings = new DialogSettings();
            const dataControl = new GlobalClass.DataControl();
            dataControl.copyValuesFrom(dialogConfigurator.productionConfig.DialogCoreConfig, baseSettings.DialogCoreConfig);
            this.DialogCoreConfig = baseSettings.DialogCoreConfig;
            this.Buttons = dialogConfigurator.productionConfig.Buttons.slice();
        }
    }
    DialogClass.DialogBelonging = DialogBelonging;
})(DialogClass || (DialogClass = {}));

class ToastNotificationConfigService {
    constructor(userConfig = {}) {
        this.userConfig = userConfig;
        this.authorConfig = new ToastNotificationClass.Settings();
        this.productionConfig = new ToastNotificationClass.Settings();
        this.dataControl = new GlobalClass.DataControl();
        // region *** confirmBox userConfig (user input app-module) ***
        const userConfigBase = new ToastNotificationClass.Settings();
        this.dataControl.copyValuesFrom(userConfig.ToastCoreConfig, userConfigBase.ToastCoreConfig); // this will make sure that object has right properties
        userConfig.ToastCoreConfig = userConfigBase.ToastCoreConfig;
        // endregion
        // region *** author default config values (if there is no user input) ***
        this.authorConfig.ToastCoreConfig.ButtonPosition = "right";
        this.authorConfig.ToastCoreConfig.TextPosition = "left";
        this.authorConfig.ToastCoreConfig.ToastPosition =
            ToastPositionEnum.TOP_RIGHT;
        this.authorConfig.ToastCoreConfig.ProgressBar =
            ToastProgressBarEnum.INCREASE;
        this.authorConfig.ToastCoreConfig.ToastUserViewType =
            ToastUserViewTypeEnum.SIMPLE;
        this.authorConfig.ToastCoreConfig.AutoCloseDelay = 2500;
        this.authorConfig.ToastCoreConfig.DisableIcon = false;
        this.authorConfig.ToastCoreConfig.AllowHTMLMessage = true;
        this.authorConfig.ToastCoreConfig.LayoutType = DialogLayoutDisplay.NONE;
        this.authorConfig.GlobalSettings.AllowedNotificationsAtOnce = 5;
        // endregion
        // region *** Production setup ***
        this.setResetGlobalToastConfig();
        this.dataControl.copyValuesFrom(this.authorConfig.ToastCoreConfig, this.productionConfig.ToastCoreConfig);
        this.dataControl.copyValuesFrom(this.userConfig.ToastCoreConfig, this.productionConfig.ToastCoreConfig);
        // endregion
    }
    setResetGlobalToastConfig(globalToastConfig) {
        this.dataControl.copyValuesFrom(this.authorConfig.GlobalSettings, this.productionConfig.GlobalSettings);
        this.dataControl.copyValuesFrom(globalToastConfig ? globalToastConfig : this.userConfig.GlobalSettings, this.productionConfig.GlobalSettings);
    }
}
ToastNotificationConfigService.ɵprov = i0.ɵɵdefineInjectable({ factory: function ToastNotificationConfigService_Factory() { return new ToastNotificationConfigService(i0.ɵɵinject("toastNotificationConfig")); }, token: ToastNotificationConfigService, providedIn: "root" });
ToastNotificationConfigService.decorators = [
    { type: Injectable, args: [{
                providedIn: "root",
            },] }
];
ToastNotificationConfigService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ["toastNotificationConfig",] }] }
];

class WrapperAbstraction {
    constructor(toastNotificationBelonging) {
        this.toastNotificationBelonging = toastNotificationBelonging;
        this.fadeInOutAnimation = "open";
        this.timerStarted$ = new BehaviorSubject("start-counter");
        this.isTimerStarted = false;
        this.timer = new GlobalClass.Timer();
    }
    mouseOver() {
        var _a;
        this.timerStarted$.next("stop-counter");
        this.fadeInOutAnimation = "open";
        (_a = this.subsToClosingDelay) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    }
    mouseOut() {
        this.timerStarted$.next("start-counter");
    }
    onOverlayClicked(evt) {
        //  console.log('onOverlayClicked');
    }
    onToastClicked(evt) {
        // console.log('onOverlayClicked');
    }
    setResponse(_IsSuccess, _ClickedButtonID) {
        const response = new ToastNotificationClass.ToastNotificationDefaultResponse();
        if (_ClickedButtonID) {
            response.ClickedButtonID = _ClickedButtonID;
        }
        response.setSuccess(_IsSuccess);
        response.setBelonging(this.toastNotificationBelonging);
        this.toastNotificationBelonging.EventsController.setDefaultResponse(response);
    }
    onCustomButton(_Button) {
        this.toastNotificationBelonging.EventsController.onButtonClick(_Button);
        this.setResponse(true, _Button.ID);
        this.toastNotificationBelonging.EventsController.close();
    }
    onButtonClick(_Type) {
        let buttonID;
        if (_Type === "confirm") {
            buttonID = this.toastNotificationBelonging.ToastCoreConfig.ConfirmLabel.toLowerCase();
        }
        else if (_Type === "decline") {
            buttonID = this.toastNotificationBelonging.ToastCoreConfig.DeclineLabel.toLowerCase();
        }
        this.setResponse(_Type === "confirm", buttonID);
        this.toastNotificationBelonging.EventsController.close();
    }
    autoClose() {
        if (this.autoCloseCondition()) {
            this.timer.setMilliseconds(this.toastNotificationBelonging.ToastCoreConfig.AutoCloseDelay);
            this.subTimer = this.timerStarted$
                .pipe(tap((next) => {
                if ("start-counter" === next) {
                    this.timer.start();
                    this.isTimerStarted = true;
                    this.timeout = setTimeout(() => {
                        this.subsToClosingDelay = this.closeParent$("close-slow").subscribe((resp) => {
                            this.toastNotificationBelonging.EventsController.close();
                        });
                    }, this.toastNotificationBelonging.ToastCoreConfig.AutoCloseDelay);
                }
                else if ("stop-counter" === next) {
                    if (this.isTimerStarted) {
                        this.timer.stop();
                        clearTimeout(this.timeout);
                        this.isTimerStarted = false;
                    }
                }
            }))
                .subscribe();
        }
    }
    autoCloseCondition() {
        return (this.toastNotificationBelonging.ToastCoreConfig.AutoCloseDelay &&
            !(this.toastNotificationBelonging.Buttons.length ||
                this.toastNotificationBelonging.ToastCoreConfig.DeclineLabel ||
                this.toastNotificationBelonging.ToastCoreConfig.ConfirmLabel));
    }
    closeParent$(_ClosingAnimation) {
        this.fadeInOutAnimation = _ClosingAnimation;
        const timer = _ClosingAnimation === "close-slow" ? 1400 : 150;
        return of("").pipe(delay(timer));
    }
    close() {
        this.toastNotificationBelonging.EventsController.close();
    }
    ngOnDestroy() {
        var _a, _b;
        (_a = this.subsToClosingDelay) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        (_b = this.subTimer) === null || _b === void 0 ? void 0 : _b.unsubscribe();
    }
}
WrapperAbstraction.decorators = [
    { type: Directive }
];
WrapperAbstraction.ctorParameters = () => [
    { type: ToastNotificationClass.ToastNotificationBelonging }
];

class ToastNotificationSimpleWrapperComponent extends WrapperAbstraction {
    constructor(gConfig, toastNotificationBelonging, cd) {
        super(toastNotificationBelonging);
        this.gConfig = gConfig;
        this.toastNotificationBelonging = toastNotificationBelonging;
        this.cd = cd;
    }
    ngAfterViewInit() {
        this.setResponse(false);
        this.cd.detectChanges();
        this.autoClose();
    }
}
ToastNotificationSimpleWrapperComponent.decorators = [
    { type: Component, args: [{
                selector: "app-toast-notification-simple-wrapper",
                template: "<div\n  class=\"toast-wrapper simple-toast\"\n  (dblclick)=\"onOverlayClicked($event)\"\n  [@fadeInOut]=\"fadeInOutAnimation\"\n>\n  <div\n    class=\"evolve-toast\"\n    (mouseover)=\"mouseOver()\"\n    (mouseout)=\"mouseOut()\"\n    (click)=\"onToastClicked($event)\"\n    [ngClass]=\"{\n      'standard-dialog':\n        0 === toastNotificationBelonging.ToastCoreConfig.LayoutType,\n      'success-dialog':\n        1 === toastNotificationBelonging.ToastCoreConfig.LayoutType,\n      'info-dialog':\n        2 === toastNotificationBelonging.ToastCoreConfig.LayoutType,\n      'warning-dialog':\n        3 === toastNotificationBelonging.ToastCoreConfig.LayoutType,\n      'danger-dialog':\n        4 === toastNotificationBelonging.ToastCoreConfig.LayoutType\n    }\"\n  >\n    <div\n      class=\"toast-title-content\"\n      *ngIf=\"toastNotificationBelonging.Dispatch.Title\"\n    >\n      <div\n        class=\"icon-section\"\n        *ngIf=\"!toastNotificationBelonging.ToastCoreConfig.DisableIcon\"\n      >\n        <span\n          class=\"icon-type-toast\"\n          [ngClass]=\"{\n            '': toastNotificationBelonging.ToastCoreConfig.LayoutType === 0,\n            'ap-icon-success icon-check-circle':\n              toastNotificationBelonging.ToastCoreConfig.LayoutType === 1,\n            'ap-icon-info icon-info-circle':\n              toastNotificationBelonging.ToastCoreConfig.LayoutType === 2,\n            'ap-icon-warning icon-warning':\n              toastNotificationBelonging.ToastCoreConfig.LayoutType === 3,\n            'ap-icon-danger icon-times-circle':\n              toastNotificationBelonging.ToastCoreConfig.LayoutType === 4\n          }\"\n        ></span>\n      </div>\n      <div class=\"dont-break-out\">\n        <div class=\"text-wrapper dont-break-out\">\n          <div class=\"toast-title-text toast-text\">\n            {{ toastNotificationBelonging.Dispatch.Title }}\n          </div>\n          <span\n            class=\"close-ico icon-times-circle\"\n            (click)=\"close()\"\n            *ngIf=\"\n              !toastNotificationBelonging.Buttons.length &&\n              !toastNotificationBelonging.ToastCoreConfig.DeclineLabel &&\n              !toastNotificationBelonging.ToastCoreConfig.ConfirmLabel\n            \"\n          ></span>\n        </div>\n      </div>\n    </div>\n\n    <div\n      class=\"content-holder toast-text\"\n      *ngIf=\"toastNotificationBelonging.Dispatch.Message\"\n    >\n      <div\n        class=\"text-wrapper-section toast-inner-content\"\n        [ngStyle]=\"{\n          'text-align': toastNotificationBelonging.ToastCoreConfig.TextPosition\n        }\"\n        [ngClass]=\"{\n          'only-message': !toastNotificationBelonging.Dispatch.Title\n        }\"\n      >\n        <div class=\"dont-break-out\">\n          <div\n            class=\"text-wrapper dont-break-out\"\n            *ngIf=\"!toastNotificationBelonging.ToastCoreConfig.AllowHTMLMessage\"\n          >\n            <p>{{ toastNotificationBelonging.Dispatch.Message }}</p>\n          </div>\n          <div\n            class=\"text-wrapper\"\n            *ngIf=\"toastNotificationBelonging.ToastCoreConfig.AllowHTMLMessage\"\n            [innerHTML]=\"toastNotificationBelonging.Dispatch.Message\"\n          ></div>\n        </div>\n      </div>\n      <span\n        class=\"close-ico icon-times-circle\"\n        (click)=\"close()\"\n        *ngIf=\"\n          !toastNotificationBelonging.Buttons.length &&\n          !toastNotificationBelonging.ToastCoreConfig.DeclineLabel &&\n          !toastNotificationBelonging.ToastCoreConfig.ConfirmLabel &&\n          !toastNotificationBelonging.Dispatch.Title\n        \"\n      ></span>\n    </div>\n\n    <div class=\"button-holder\">\n      <div\n        class=\"button-section\"\n        *ngIf=\"toastNotificationBelonging.Buttons.length\"\n        [ngStyle]=\"{\n          'text-align':\n            toastNotificationBelonging.ToastCoreConfig.ButtonPosition\n        }\"\n      >\n        <button\n          class=\"ed-btn ed-btn-sm\"\n          *ngFor=\"let button of toastNotificationBelonging.Buttons\"\n          (click)=\"onCustomButton(button)\"\n          [ngClass]=\"{\n            '': button.LayoutType ? button.LayoutType === 0 : false,\n            'ed-btn-success': button.LayoutType\n              ? button.LayoutType === 1\n              : false,\n            'ed-btn-info': button.LayoutType ? button.LayoutType === 2 : false,\n            'ed-btn-warning': button.LayoutType\n              ? button.LayoutType === 3\n              : false,\n            'ed-btn-danger': button.LayoutType\n              ? button.LayoutType === 4\n              : false,\n            'ed-btn-dark': button.LayoutType ? button.LayoutType === 5 : false,\n            'ed-btn-light': button.LayoutType ? button.LayoutType === 6 : false,\n            'ed-btn-primary': button.LayoutType\n              ? button.LayoutType === 7\n              : false,\n            'ed-btn-secondary': button.LayoutType\n              ? button.LayoutType === 8\n              : false,\n            'ed-btn-link': button.LayoutType ? button.LayoutType === 9 : false\n          }\"\n        >\n          {{ button.Label }}\n        </button>\n      </div>\n\n      <div\n        class=\"button-section\"\n        [ngStyle]=\"{\n          'text-align':\n            toastNotificationBelonging.ToastCoreConfig.ButtonPosition\n        }\"\n        *ngIf=\"\n          !toastNotificationBelonging.Buttons.length &&\n          (toastNotificationBelonging.ToastCoreConfig.DeclineLabel ||\n            toastNotificationBelonging.ToastCoreConfig.ConfirmLabel)\n        \"\n      >\n        <button\n          class=\"ed-btn ed-btn-sm\"\n          *ngIf=\"toastNotificationBelonging.ToastCoreConfig.ConfirmLabel\"\n          (click)=\"onButtonClick('confirm')\"\n          [ngClass]=\"{\n            'ed-btn-primary':\n              toastNotificationBelonging.ToastCoreConfig.LayoutType === 0,\n            'ed-btn-success':\n              toastNotificationBelonging.ToastCoreConfig.LayoutType === 1,\n            'ed-btn-info':\n              toastNotificationBelonging.ToastCoreConfig.LayoutType === 2,\n            'ed-btn-warning':\n              toastNotificationBelonging.ToastCoreConfig.LayoutType === 3,\n            'ed-btn-danger':\n              toastNotificationBelonging.ToastCoreConfig.LayoutType === 4\n          }\"\n        >\n          {{ toastNotificationBelonging.ToastCoreConfig.ConfirmLabel }}\n        </button>\n        <button\n          class=\"ed-btn ed-btn-sm ed-btn-secondary\"\n          (click)=\"onButtonClick('decline')\"\n          *ngIf=\"toastNotificationBelonging.ToastCoreConfig.DeclineLabel\"\n        >\n          {{ toastNotificationBelonging.ToastCoreConfig.DeclineLabel }}\n        </button>\n      </div>\n    </div>\n\n    <div\n      class=\"progress-bar-container\"\n      *ngIf=\"\n        !toastNotificationBelonging.Buttons.length &&\n        !toastNotificationBelonging.ToastCoreConfig.DeclineLabel &&\n        !toastNotificationBelonging.ToastCoreConfig.ConfirmLabel &&\n        toastNotificationBelonging.ToastCoreConfig.ProgressBar !== 0\n      \"\n    >\n      <div\n        class=\"progress-bar\"\n        [ngStyle]=\"{\n          width:\n            (toastNotificationBelonging.ToastCoreConfig.ProgressBar === 1\n              ? timer.Progress\n              : timer.Remaining) + '%'\n        }\"\n      ></div>\n    </div>\n  </div>\n</div>\n",
                animations: [fadeInOut(0, 1)],
                styles: ["@charset \"UTF-8\";.ed-btn-sm{font-size:12px;font-weight:400;margin-right:3px;min-width:40px;padding:2px 8px}.ed-btn-md{font-size:14px;margin-right:5px;min-width:60px;padding:3px 10px}.ed-btn-lg{font-size:16px;margin-right:5px;min-width:70px;padding:4px 10px}.ed-btn{background-color:initial;border:none;border-radius:3px;cursor:pointer;display:inline-block;line-height:1.5;text-align:center;text-decoration:none;-webkit-user-select:none;user-select:none;vertical-align:middle}.ed-btn:hover{color:#989ea5}.ed-btn-check:focus+.ed-btn,.ed-btn:focus{box-shadow:0 0 1px 2px;outline:0}.ed-btn-check:active+.ed-btn,.ed-btn-check:active+.ed-btn:focus,.ed-btn-check:checked+.ed-btn,.ed-btn-check:checked+.ed-btn:focus,.ed-btn.active,.ed-btn.active:focus,.ed-btn:active,.ed-btn:active:focus{box-shadow:0 0 1px 2px}.ed-btn.disabled,.ed-btn:disabled,fieldset:disabled .ed-btn{box-shadow:none;opacity:.6;pointer-events:none}.ed-btn-primary{color:hsla(0,0%,98.4%,.8);background:#ff9e00;border-color:#ff9e00}.ed-btn-primary:hover{color:#fbfbfb;border-color:#ffa81a;background:#ffb133}.ed-btn-check:focus+.ed-btn-primary,.ed-btn-primary:focus{outline:0;box-shadow:0 0 1px 2px #ffa81a}.ed-btn-check:active+.ed-btn-primary,.ed-btn-check:active+.ed-btn-primary:focus,.ed-btn-check:checked+.ed-btn-primary,.ed-btn-check:checked+.ed-btn-primary:focus,.ed-btn-primary.active,.ed-btn-primary.active:focus,.ed-btn-primary:active,.ed-btn-primary:active:focus{box-shadow:0 0 1px 2px #ffa81a}.ed-btn-secondary{color:hsla(0,0%,98.4%,.8);background:#989ea5;border-color:#989ea5}.ed-btn-secondary:hover{color:#fbfbfb;border-color:#a6abb1;background:#b3b8bd}.ed-btn-check:focus+.ed-btn-secondary,.ed-btn-secondary:focus{outline:0;box-shadow:0 0 1px 2px #a6abb1}.ed-btn-check:active+.ed-btn-secondary,.ed-btn-check:active+.ed-btn-secondary:focus,.ed-btn-check:checked+.ed-btn-secondary,.ed-btn-check:checked+.ed-btn-secondary:focus,.ed-btn-secondary.active,.ed-btn-secondary.active:focus,.ed-btn-secondary:active,.ed-btn-secondary:active:focus{box-shadow:0 0 1px 2px #a6abb1}.ed-btn-success{color:hsla(0,0%,98.4%,.8);background:#3caea3;border-color:#3caea3}.ed-btn-success:hover{color:#fbfbfb;border-color:#45bfb3;background:#58c5bb}.ed-btn-check:focus+.ed-btn-success,.ed-btn-success:focus{outline:0;box-shadow:0 0 1px 2px #45bfb3}.ed-btn-check:active+.ed-btn-success,.ed-btn-check:active+.ed-btn-success:focus,.ed-btn-check:checked+.ed-btn-success,.ed-btn-check:checked+.ed-btn-success:focus,.ed-btn-success.active,.ed-btn-success.active:focus,.ed-btn-success:active,.ed-btn-success:active:focus{box-shadow:0 0 1px 2px #45bfb3}.ed-btn-info{color:hsla(0,0%,98.4%,.8);background:#2f8ee5;border-color:#2f8ee5}.ed-btn-info:hover{color:#fbfbfb;border-color:#469ae8;background:#5ca7eb}.ed-btn-check:focus+.ed-btn-info,.ed-btn-info:focus{outline:0;box-shadow:0 0 1px 2px #469ae8}.ed-btn-check:active+.ed-btn-info,.ed-btn-check:active+.ed-btn-info:focus,.ed-btn-check:checked+.ed-btn-info,.ed-btn-check:checked+.ed-btn-info:focus,.ed-btn-info.active,.ed-btn-info.active:focus,.ed-btn-info:active,.ed-btn-info:active:focus{box-shadow:0 0 1px 2px #469ae8}.ed-btn-warning{color:hsla(0,0%,98.4%,.8);background:#ffc107;border-color:#ffc107}.ed-btn-warning:hover{color:#fbfbfb;border-color:#ffc721;background:#ffce3a}.ed-btn-check:focus+.ed-btn-warning,.ed-btn-warning:focus{outline:0;box-shadow:0 0 1px 2px #ffc721}.ed-btn-check:active+.ed-btn-warning,.ed-btn-check:active+.ed-btn-warning:focus,.ed-btn-check:checked+.ed-btn-warning,.ed-btn-check:checked+.ed-btn-warning:focus,.ed-btn-warning.active,.ed-btn-warning.active:focus,.ed-btn-warning:active,.ed-btn-warning:active:focus{box-shadow:0 0 1px 2px #ffc721}.ed-btn-danger{color:hsla(0,0%,98.4%,.8);background:#e46464;border-color:#e46464}.ed-btn-danger:hover{color:#fbfbfb;border-color:#e87a7a;background:#ec8f8f}.ed-btn-check:focus+.ed-btn-danger,.ed-btn-danger:focus{outline:0;box-shadow:0 0 1px 2px #e87a7a}.ed-btn-check:active+.ed-btn-danger,.ed-btn-check:active+.ed-btn-danger:focus,.ed-btn-check:checked+.ed-btn-danger,.ed-btn-check:checked+.ed-btn-danger:focus,.ed-btn-danger.active,.ed-btn-danger.active:focus,.ed-btn-danger:active,.ed-btn-danger:active:focus{box-shadow:0 0 1px 2px #e87a7a}.ed-btn-light{color:rgba(52,58,64,.8);background:#fbfbfb;border-color:#fbfbfb}.ed-btn-light:hover{color:#343a40;border-color:#fff;background:#fff}.ed-btn-check:focus+.ed-btn-light,.ed-btn-light:focus{outline:0;box-shadow:0 0 1px 2px #fff}.ed-btn-check:active+.ed-btn-light,.ed-btn-check:active+.ed-btn-light:focus,.ed-btn-check:checked+.ed-btn-light,.ed-btn-check:checked+.ed-btn-light:focus,.ed-btn-light.active,.ed-btn-light.active:focus,.ed-btn-light:active,.ed-btn-light:active:focus{box-shadow:0 0 1px 2px #fff}.ed-btn-dark{color:hsla(0,0%,98.4%,.8);background:#343a40;border-color:#343a40}.ed-btn-dark:hover{color:#fbfbfb;border-color:#3f474e;background:#4b545c}.ed-btn-check:focus+.ed-btn-dark,.ed-btn-dark:focus{outline:0;box-shadow:0 0 1px 2px #3f474e}.ed-btn-check:active+.ed-btn-dark,.ed-btn-check:active+.ed-btn-dark:focus,.ed-btn-check:checked+.ed-btn-dark,.ed-btn-check:checked+.ed-btn-dark:focus,.ed-btn-dark.active,.ed-btn-dark.active:focus,.ed-btn-dark:active,.ed-btn-dark:active:focus{box-shadow:0 0 1px 2px #3f474e}@font-face{font-family:icomoon;src:url(\"data:font/eot;base64,CAgAAGQHAAABAAIAAAAAAAAAAAAAAAAAAAABAJABAAAAAExQAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAA/2/OwAAAAAAAAAAAAAAAAAAAAAAAAA4AaQBjAG8AbQBvAG8AbgAAAA4AUgBlAGcAdQBsAGEAcgAAABYAVgBlAHIAcwBpAG8AbgAgADEALgAwAAAADgBpAGMAbwBtAG8AbwBuAAAAAAAAAQAAAAsAgAADADBPUy8yDxIFbwAAALwAAABgY21hcBdW0ooAAAEcAAAAVGdhc3AAAAAQAAABcAAAAAhnbHlmw5gfRwAAAXgAAAOUaGVhZBxow6wAAAUMAAAANmhoZWEHuQPJAAAFRAAAACRobXR4FEoACQAABWgAAAAgbG9jYQLuAhQAAAWIAAAAEm1heHAADABaAAAFnAAAACBuYW1lmUoJ+wAABbwAAAGGcG9zdAADAAAAAAdEAAAAIAADA0IBkAAFAAACmQLMAAAAjwKZAswAAAHrADMBCQAAAAAAAAAAAAAAAAAAAAEQAAAAAAAAAAAAAAAAAAAAAEAAAOkDA8D/wABAA8AAQAAAAAEAAAAAAAAAAAAAACAAAAAAAAMAAAADAAAAHAABAAMAAAAcAAMAAQAAABwABAA4AAAACgAIAAIAAgABACDpA//9//8AAAAAACDpAP/9//8AAf/jFwQAAwABAAAAAAAAAAAAAAABAAH//wAPAAEAAAAAAAAAAAACAAA3OQEAAAAAAQAAAAAAAAAAAAIAADc5AQAAAAABAAAAAAAAAAAAAgAANzkBAAAAAAIAAAAAA24DbgA7AFcAAAE0Ji8BNz4BNTQmLwEuASMiBg8BJy4BIyIGDwEOARUUFh8BBw4BFRQWHwEeATMyNj8BFx4BMzI2PwE+ATcUBw4BBwYjIicuAScmNTQ3PgE3NjMyFx4BFxYCkQYFaGgFBgYFNAUOBwcOBWdoBQ0HCA0GMwUGBgVnZwUGBgUzBg0IBw0FaGcFDgcHDgU0BQbdIyJ3UFBbW1BQdyMiIiN3UFBbW1BQdyIjATYHDQVoZwUOBwcOBTQFBgYFaGgFBgYFNAUOBwcOBWdoBQ0HCA0GMwUGBgVnZwUGBgUzBg2JW1BQdyIjIyJ3UFBbW1BQdyIjIyJ3UFAAAwAJAAAD9wO3AA8AJgA8AAAlNTQmKwEiBh0BFBY7ATI2JxM0JicuASsBIgYHDgEVExQWOwEyNjUDARYUBw4BIyEiJicmNDcBPgEzMhYXAkkKCG4ICgoIbggKAQoCAwMHBH4EBwMDAgkMCGoHDAgBtwkKCiIT/JITIgoKCQG3CSMUFCMJpW0HDAwHbQgLC94BBgMGAgIEBAICBwP++wYHBwYCFvzbESYRERMTEREmEQMlERUVEQAAAAIAAAAAA24DbgAkAEAAAAE0Ji8BLgEjIgYPAScuASMiBg8BDgEVFBYfAR4BMzI2NwE+ATUXFAcOAQcGIyInLgEnJjU0Nz4BNzYzMhceARcWAt4FBjQFDQcIDQXpgQUOBwcOBTQFBQUFzwUOBwcOBQE2BgWQIyJ3UFBbW1BQdyMiIiN3UFBbW1BQdyIjAhMIDgUzBQYGBeiBBQYGBTQFDgcHDgXPBQUFBQE3BQ0HXFtQUHciIyMid1BQW1tQUHciIyMid1BQAAAAAwAAAAADbgNuAB8ALwBLAAAlNTQmKwERNCYrASIGHQEUFjsBFSMiBh0BFBYzITI2NQM1NCYrASIGHQEUFjsBMjYFFAcOAQcGIyInLgEnJjU0Nz4BNzYzMhceARcWAkkKCDcLB7cICgoINzcICgoIAQAICkkLB24ICgoIbgcLAW4jIndQUFtbUFB3IyIiI3dQUFtbUFB3IiOlWwgKASUICgoIXAcLtwoIWwgLCwgCAFsICgoIWwgLC+ZbUFB3IiMjIndQUFtbUFB3IiMjIndQUAAAAAABAAAAAAAAwM5v/18PPPUACwQAAAAAANyqP3wAAAAA3Ko/fAAAAAAD9wO3AAAACAACAAAAAAAAAAEAAAPA/8AAAAQAAAAAAAP3AAEAAAAAAAAAAAAAAAAAAAAIBAAAAAAAAAAAAAAAAgAAAANuAAAEAAAJA24AAANuAAAAAAAAAAoAFAAeAKAA/AFgAcoAAAABAAAACABYAAMAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAADgCuAAEAAAAAAAEABwAAAAEAAAAAAAIABwBgAAEAAAAAAAMABwA2AAEAAAAAAAQABwB1AAEAAAAAAAUACwAVAAEAAAAAAAYABwBLAAEAAAAAAAoAGgCKAAMAAQQJAAEADgAHAAMAAQQJAAIADgBnAAMAAQQJAAMADgA9AAMAAQQJAAQADgB8AAMAAQQJAAUAFgAgAAMAAQQJAAYADgBSAAMAAQQJAAoANACkaWNvbW9vbgBpAGMAbwBtAG8AbwBuVmVyc2lvbiAxLjAAVgBlAHIAcwBpAG8AbgAgADEALgAwaWNvbW9vbgBpAGMAbwBtAG8AbwBuaWNvbW9vbgBpAGMAbwBtAG8AbwBuUmVndWxhcgBSAGUAZwB1AGwAYQByaWNvbW9vbgBpAGMAbwBtAG8AbwBuRm9udCBnZW5lcmF0ZWQgYnkgSWNvTW9vbi4ARgBvAG4AdAAgAGcAZQBuAGUAcgBhAHQAZQBkACAAYgB5ACAASQBjAG8ATQBvAG8AbgAuAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==\");src:url(\"data:font/eot;base64,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\") format(\"embedded-opentype\"),url(\"data:font/ttf;base64,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\") format(\"truetype\"),url(\"data:font/woff;base64,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\") format(\"woff\"),url(\"data:font/svg;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiID4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPG1ldGFkYXRhPkdlbmVyYXRlZCBieSBJY29Nb29uPC9tZXRhZGF0YT4KCTxkZWZzPgoJCTxmb250IGlkPSJpY29tb29uIiBob3Jpei1hZHYteD0iMTAyNCI+CgkJCTxmb250LWZhY2UgdW5pdHMtcGVyLWVtPSIxMDI0IiBhc2NlbnQ9Ijk2MCIgZGVzY2VudD0iLTY0Ii8+CgkJCTxtaXNzaW5nLWdseXBoIGhvcml6LWFkdi14PSIxMDI0Ii8+CgkJCTxnbHlwaCB1bmljb2RlPSImI3gyMDsiIGhvcml6LWFkdi14PSI1MTIiIGQ9IiIvPgoJCQk8Z2x5cGggdW5pY29kZT0iJiN4ZTkwMDsiIGdseXBoLW5hbWU9InRpbWVzLWNpcmNsZSIgaG9yaXotYWR2LXg9Ijg3OCIgZD0iTTY1Ni41NzEgMzA5LjcxNGMwIDkuNzE0LTQgMTguODU3LTEwLjg1NyAyNS43MTRsLTEwMy40MjkgMTAzLjQyOSAxMDMuNDI5IDEwMy40MjljNi44NTcgNi44NTcgMTAuODU3IDE2IDEwLjg1NyAyNS43MTRzLTQgMTkuNDI5LTEwLjg1NyAyNi4yODZsLTUxLjQyOSA1MS40MjljLTYuODU3IDYuODU3LTE2LjU3MSAxMC44NTctMjYuMjg2IDEwLjg1N3MtMTguODU3LTQtMjUuNzE0LTEwLjg1N2wtMTAzLjQyOS0xMDMuNDI5LTEwMy40MjkgMTAzLjQyOWMtNi44NTcgNi44NTctMTYgMTAuODU3LTI1LjcxNCAxMC44NTdzLTE5LjQyOS00LTI2LjI4Ni0xMC44NTdsLTUxLjQyOS01MS40MjljLTYuODU3LTYuODU3LTEwLjg1Ny0xNi41NzEtMTAuODU3LTI2LjI4NnM0LTE4Ljg1NyAxMC44NTctMjUuNzE0bDEwMy40MjktMTAzLjQyOS0xMDMuNDI5LTEwMy40MjljLTYuODU3LTYuODU3LTEwLjg1Ny0xNi0xMC44NTctMjUuNzE0czQtMTkuNDI5IDEwLjg1Ny0yNi4yODZsNTEuNDI5LTUxLjQyOWM2Ljg1Ny02Ljg1NyAxNi41NzEtMTAuODU3IDI2LjI4Ni0xMC44NTdzMTguODU3IDQgMjUuNzE0IDEwLjg1N2wxMDMuNDI5IDEwMy40MjkgMTAzLjQyOS0xMDMuNDI5YzYuODU3LTYuODU3IDE2LTEwLjg1NyAyNS43MTQtMTAuODU3czE5LjQyOSA0IDI2LjI4NiAxMC44NTdsNTEuNDI5IDUxLjQyOWM2Ljg1NyA2Ljg1NyAxMC44NTcgMTYuNTcxIDEwLjg1NyAyNi4yODZ6TTg3Ny43MTQgNDM4Ljg1N2MwLTI0Mi4yODYtMTk2LjU3MS00MzguODU3LTQzOC44NTctNDM4Ljg1N3MtNDM4Ljg1NyAxOTYuNTcxLTQzOC44NTcgNDM4Ljg1NyAxOTYuNTcxIDQzOC44NTcgNDM4Ljg1NyA0MzguODU3IDQzOC44NTctMTk2LjU3MSA0MzguODU3LTQzOC44NTd6Ii8+CgkJCTxnbHlwaCB1bmljb2RlPSImI3hlOTAxOyIgZ2x5cGgtbmFtZT0iZXhjbGFtYXRpb24tdHJpYW5nbGUsIHdhcm5pbmciIGQ9Ik01ODUuMTQzIDE2NS4xNDN2MTA4LjU3MWMwIDEwLjI4Ni04IDE4Ljg1Ny0xOC4yODYgMTguODU3aC0xMDkuNzE0Yy0xMC4yODYgMC0xOC4yODYtOC41NzEtMTguMjg2LTE4Ljg1N3YtMTA4LjU3MWMwLTEwLjI4NiA4LTE4Ljg1NyAxOC4yODYtMTguODU3aDEwOS43MTRjMTAuMjg2IDAgMTguMjg2IDguNTcxIDE4LjI4NiAxOC44NTd6TTU4NCAzNzguODU3bDEwLjI4NiAyNjIuMjg2YzAgMy40MjktMS43MTQgOC01LjcxNCAxMC44NTctMy40MjkgMi44NTctOC41NzEgNi4yODYtMTMuNzE0IDYuMjg2aC0xMjUuNzE0Yy01LjE0MyAwLTEwLjI4Ni0zLjQyOS0xMy43MTQtNi4yODYtNC0yLjg1Ny01LjcxNC04LjU3MS01LjcxNC0xMmw5LjcxNC0yNjEuMTQzYzAtNy40MjkgOC41NzEtMTMuMTQzIDE5LjQyOS0xMy4xNDNoMTA1LjcxNGMxMC4yODYgMCAxOC44NTcgNS43MTQgMTkuNDI5IDEzLjE0M3pNNTc2IDkxMi41NzFsNDM4Ljg1Ny04MDQuNTcxYzEyLjU3MS0yMi4yODYgMTItNDkuNzE0LTEuMTQzLTcycy0zNy4xNDMtMzYtNjIuODU3LTM2aC04NzcuNzE0Yy0yNS43MTQgMC00OS43MTQgMTMuNzE0LTYyLjg1NyAzNnMtMTMuNzE0IDQ5LjcxNC0xLjE0MyA3Mmw0MzguODU3IDgwNC41NzFjMTIuNTcxIDIzLjQyOSAzNy4xNDMgMzguMjg2IDY0IDM4LjI4NnM1MS40MjktMTQuODU3IDY0LTM4LjI4NnoiLz4KCQkJPGdseXBoIHVuaWNvZGU9IiYjeGU5MDI7IiBnbHlwaC1uYW1lPSJjaGVjay1jaXJjbGUiIGhvcml6LWFkdi14PSI4NzgiIGQ9Ik03MzMuNzE0IDUzMS40MjhjMCA5LjcxNC0zLjQyOSAxOS40MjktMTAuMjg2IDI2LjI4NmwtNTIgNTEuNDI5Yy02Ljg1NyA2Ljg1Ny0xNiAxMC44NTctMjUuNzE0IDEwLjg1N3MtMTguODU3LTQtMjUuNzE0LTEwLjg1N2wtMjMzLjE0My0yMzIuNTcxLTEyOS4xNDMgMTI5LjE0M2MtNi44NTcgNi44NTctMTYgMTAuODU3LTI1LjcxNCAxMC44NTdzLTE4Ljg1Ny00LTI1LjcxNC0xMC44NTdsLTUyLTUxLjQyOWMtNi44NTctNi44NTctMTAuMjg2LTE2LjU3MS0xMC4yODYtMjYuMjg2czMuNDI5LTE4Ljg1NyAxMC4yODYtMjUuNzE0bDIwNi44NTctMjA2Ljg1N2M2Ljg1Ny02Ljg1NyAxNi41NzEtMTAuODU3IDI1LjcxNC0xMC44NTcgOS43MTQgMCAxOS40MjkgNCAyNi4yODYgMTAuODU3bDMxMC4yODYgMzEwLjI4NmM2Ljg1NyA2Ljg1NyAxMC4yODYgMTYgMTAuMjg2IDI1LjcxNHpNODc3LjcxNCA0MzguODU3YzAtMjQyLjI4Ni0xOTYuNTcxLTQzOC44NTctNDM4Ljg1Ny00MzguODU3cy00MzguODU3IDE5Ni41NzEtNDM4Ljg1NyA0MzguODU3IDE5Ni41NzEgNDM4Ljg1NyA0MzguODU3IDQzOC44NTcgNDM4Ljg1Ny0xOTYuNTcxIDQzOC44NTctNDM4Ljg1N3oiLz4KCQkJPGdseXBoIHVuaWNvZGU9IiYjeGU5MDM7IiBnbHlwaC1uYW1lPSJpbmZvLWNpcmNsZSIgaG9yaXotYWR2LXg9Ijg3OCIgZD0iTTU4NS4xNDMgMTY0LjU3MXY5MS40MjljMCAxMC4yODYtOCAxOC4yODYtMTguMjg2IDE4LjI4NmgtNTQuODU3djI5Mi41NzFjMCAxMC4yODYtOCAxOC4yODYtMTguMjg2IDE4LjI4NmgtMTgyLjg1N2MtMTAuMjg2IDAtMTguMjg2LTgtMTguMjg2LTE4LjI4NnYtOTEuNDI5YzAtMTAuMjg2IDgtMTguMjg2IDE4LjI4Ni0xOC4yODZoNTQuODU3di0xODIuODU3aC01NC44NTdjLTEwLjI4NiAwLTE4LjI4Ni04LTE4LjI4Ni0xOC4yODZ2LTkxLjQyOWMwLTEwLjI4NiA4LTE4LjI4NiAxOC4yODYtMTguMjg2aDI1NmMxMC4yODYgMCAxOC4yODYgOCAxOC4yODYgMTguMjg2ek01MTIgNjc2LjU3MXY5MS40MjljMCAxMC4yODYtOCAxOC4yODYtMTguMjg2IDE4LjI4NmgtMTA5LjcxNGMtMTAuMjg2IDAtMTguMjg2LTgtMTguMjg2LTE4LjI4NnYtOTEuNDI5YzAtMTAuMjg2IDgtMTguMjg2IDE4LjI4Ni0xOC4yODZoMTA5LjcxNGMxMC4yODYgMCAxOC4yODYgOCAxOC4yODYgMTguMjg2ek04NzcuNzE0IDQzOC44NTdjMC0yNDIuMjg2LTE5Ni41NzEtNDM4Ljg1Ny00MzguODU3LTQzOC44NTdzLTQzOC44NTcgMTk2LjU3MS00MzguODU3IDQzOC44NTcgMTk2LjU3MSA0MzguODU3IDQzOC44NTcgNDM4Ljg1NyA0MzguODU3LTE5Ni41NzEgNDM4Ljg1Ny00MzguODU3eiIvPgoJCTwvZm9udD48L2RlZnM+Cjwvc3ZnPgo=\") format(\"svg\");font-weight:400;font-style:normal;font-display:block}[class*=\" icon-\"],[class^=icon-]{font-family:icomoon!important;-webkit-font-smoothing:antialiased;font-style:normal;font-variant:normal;font-weight:400;line-height:1;-moz-osx-font-smoothing:grayscale;speak:never;text-transform:none}.icon-times-circle:before{content:\"\uE900\"}.icon-exclamation-triangle:before,.icon-warning:before{content:\"\uE901\"}.icon-check-circle:before{content:\"\uE902\"}.icon-info-circle:before{content:\"\uE903\"}.ngx-awesome-popup-overlay{align-items:center;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px);background:rgba(51,32,0,.4);bottom:0;display:flex;flex-direction:column;justify-content:center;left:0;opacity:0;position:fixed;right:0;top:0;z-index:999999999}.evolve-confirm-box .text-wrapper,.evolve-parent-dialog .text-wrapper{text-align:center}.evolve-confirm-box .text-wrapper-section,.evolve-parent-dialog .text-wrapper-section,.evolve-toast .text-wrapper-section{width:100%}.evolve-confirm-box .text-wrapper-section .text-wrapper,.evolve-parent-dialog .text-wrapper-section .text-wrapper,.evolve-toast .text-wrapper-section .text-wrapper{display:block;width:100%}.evolve-confirm-box .text-wrapper-section .dont-break-out,.evolve-parent-dialog .text-wrapper-section .dont-break-out,.evolve-toast .text-wrapper-section .dont-break-out{-webkit-hyphens:auto;hyphens:auto;overflow-wrap:break-word;white-space:pre-wrap;word-wrap:break-word}.evolve-confirm-box,.evolve-parent-dialog{background:#fbfbfb;border-radius:5px;border-top:7px solid;box-shadow:0 0 4px 1px rgba(0,0,0,.25);display:flex;flex-direction:column;max-height:calc(100vh - 100px);max-width:calc(100vw - 100px);position:relative;vertical-align:bottom}.evolve-confirm-box.standard-dialog,.evolve-parent-dialog.standard-dialog{border-color:transparent;padding:17px 20px 10px}.evolve-confirm-box.success-dialog,.evolve-parent-dialog.success-dialog{border-color:#3caea3}.evolve-confirm-box.info-dialog,.evolve-parent-dialog.info-dialog{border-color:#2f8ee5}.evolve-confirm-box.warning-dialog,.evolve-parent-dialog.warning-dialog{border-color:#ffc107}.evolve-confirm-box.danger-dialog,.evolve-parent-dialog.danger-dialog{border-color:#e46464}.ap-icon-success{color:#58c5bb}.ap-icon-info{color:#5ca7eb}.ap-icon-warning{color:#ffce3a}.ap-icon-danger{color:#ec8f8f}.toast-wrapper{background:transparent;display:flex;flex-direction:column;margin:auto;opacity:0;padding:0;pointer-events:auto;position:relative;width:100%;z-index:0}.toast-wrapper .progress-bar-container{background:hsla(0,0%,100%,.2);border-radius:0 0 2px 2px}.toast-wrapper .progress-bar{height:4px;transition:none;width:0}.toast-wrapper .evolve-toast{background:#fbfbfb;border-radius:2px;box-shadow:0 0 2px 1px rgba(0,0,0,.25);display:flex;flex-direction:column;margin-top:10px;max-height:350px;position:relative;transition:box-shadow .3s ease-in-out;vertical-align:bottom}.toast-wrapper .evolve-toast:hover{box-shadow:0 0 4px 2px rgba(0,0,0,.25)}.toast-wrapper .evolve-toast.standard-dialog{border-color:transparent}.toast-wrapper .evolve-toast.standard-dialog .progress-bar{background-color:rgba(42,42,42,.2)}.toast-wrapper .evolve-toast.success-dialog{background-color:#91d9d2}.toast-wrapper .evolve-toast.success-dialog .progress-bar{background-color:#6bccc2}.toast-wrapper .evolve-toast.info-dialog{background-color:#b7d8f6}.toast-wrapper .evolve-toast.info-dialog .progress-bar{background-color:#73b3ee}.toast-wrapper .evolve-toast.warning-dialog{background-color:#ffe7a0}.toast-wrapper .evolve-toast.warning-dialog .progress-bar{background-color:#ffdb6d}.toast-wrapper .evolve-toast.danger-dialog{background-color:#f3bbbb}.toast-wrapper .evolve-toast.danger-dialog .progress-bar{background-color:#ec8f8f}.toast-wrapper .evolve-toast .close-ico{color:rgba(0,0,0,.2);cursor:pointer;font-size:18px;position:absolute;right:6px;top:4px}.toast-wrapper .evolve-toast .toast-title-content{align-content:space-around;align-items:center;background-clip:padding-box;border-radius:2px 2px 0 0;color:#6c757d;display:flex;flex-direction:row;flex-wrap:wrap;height:auto;justify-content:flex-start;padding:5px 10px;width:auto}.toast-wrapper .evolve-toast .toast-title-content .icon-section .icon-type-toast{font-size:20px;opacity:.8;padding:0 6px 0 0}.toast-wrapper .evolve-toast .toast-title-content .toast-title-text{font-size:.87rem}.toast-wrapper .evolve-toast .content-holder{align-items:center;color:#6c757d;display:flex;flex-wrap:nowrap;height:100%;justify-content:space-between;overflow:auto;width:100%}.toast-wrapper .evolve-toast .content-holder .toast-inner-content{padding:6px 10px}.toast-wrapper .evolve-toast .content-holder .only-message{padding:6px 27px 6px 10px}.toast-wrapper .evolve-toast .content-holder .text-wrapper{font-size:.97rem;margin:0}.toast-wrapper .evolve-toast .button-holder{display:flex;flex-direction:column;justify-content:flex-end;width:100%}.toast-wrapper .evolve-toast .button-holder .button-section{margin:0;padding:4px 10px}"]
            },] }
];
ToastNotificationSimpleWrapperComponent.ctorParameters = () => [
    { type: GlobalConfigService },
    { type: ToastNotificationClass.ToastNotificationBelonging },
    { type: ChangeDetectorRef }
];

class ToastNotificationWrapperComponent extends WrapperAbstraction {
    constructor(gConfig, toastNotificationBelonging, cd) {
        super(toastNotificationBelonging);
        this.gConfig = gConfig;
        this.toastNotificationBelonging = toastNotificationBelonging;
        this.cd = cd;
    }
    ngAfterViewInit() {
        this.setResponse(false);
        this.cd.detectChanges();
        this.autoClose();
    }
}
ToastNotificationWrapperComponent.decorators = [
    { type: Component, args: [{
                selector: "app-toast-notification-wrapper",
                template: "<div\n  class=\"toast-wrapper standard-toast\"\n  (dblclick)=\"onOverlayClicked($event)\"\n  [@fadeInOut]=\"fadeInOutAnimation\"\n>\n  <div\n    class=\"evolve-toast\"\n    (mouseover)=\"mouseOver()\"\n    (mouseout)=\"mouseOut()\"\n    (click)=\"onToastClicked($event)\"\n    [ngClass]=\"{\n      'standard-dialog':\n        0 === toastNotificationBelonging.ToastCoreConfig.LayoutType,\n      'success-dialog':\n        1 === toastNotificationBelonging.ToastCoreConfig.LayoutType,\n      'info-dialog':\n        2 === toastNotificationBelonging.ToastCoreConfig.LayoutType,\n      'warning-dialog':\n        3 === toastNotificationBelonging.ToastCoreConfig.LayoutType,\n      'danger-dialog':\n        4 === toastNotificationBelonging.ToastCoreConfig.LayoutType\n    }\"\n  >\n    <div\n      class=\"toast-title-content\"\n      *ngIf=\"toastNotificationBelonging.Dispatch.Title\"\n    >\n      <div class=\"dont-break-out\">\n        <div class=\"text-wrapper dont-break-out\">\n          <div class=\"toast-title-text\">\n            {{ toastNotificationBelonging.Dispatch.Title }}\n          </div>\n          <span\n            class=\"close-ico icon-times-circle\"\n            (click)=\"close()\"\n            *ngIf=\"\n              !toastNotificationBelonging.Buttons.length &&\n              !toastNotificationBelonging.ToastCoreConfig.DeclineLabel &&\n              !toastNotificationBelonging.ToastCoreConfig.ConfirmLabel\n            \"\n          ></span>\n        </div>\n      </div>\n    </div>\n\n    <div\n      class=\"content-holder\"\n      *ngIf=\"toastNotificationBelonging.Dispatch.Message\"\n    >\n      <div\n        class=\"icon-section\"\n        *ngIf=\"!toastNotificationBelonging.ToastCoreConfig.DisableIcon\"\n      >\n        <span\n          class=\"icon-type-toast\"\n          [ngClass]=\"{\n            '': toastNotificationBelonging.ToastCoreConfig.LayoutType === 0,\n            'ap-icon-success icon-check-circle':\n              toastNotificationBelonging.ToastCoreConfig.LayoutType === 1,\n            'ap-icon-info icon-info-circle':\n              toastNotificationBelonging.ToastCoreConfig.LayoutType === 2,\n            'ap-icon-warning icon-warning':\n              toastNotificationBelonging.ToastCoreConfig.LayoutType === 3,\n            'ap-icon-danger icon-times-circle':\n              toastNotificationBelonging.ToastCoreConfig.LayoutType === 4\n          }\"\n        ></span>\n      </div>\n      <div\n        class=\"text-wrapper-section toast-inner-content\"\n        [ngStyle]=\"{\n          'text-align': toastNotificationBelonging.ToastCoreConfig.TextPosition\n        }\"\n        [ngClass]=\"{\n          'only-message': !toastNotificationBelonging.Dispatch.Title\n        }\"\n      >\n        <div class=\"dont-break-out\">\n          <div\n            class=\"text-wrapper dont-break-out\"\n            *ngIf=\"!toastNotificationBelonging.ToastCoreConfig.AllowHTMLMessage\"\n          >\n            <p>{{ toastNotificationBelonging.Dispatch.Message }}</p>\n          </div>\n          <div\n            class=\"text-wrapper\"\n            *ngIf=\"toastNotificationBelonging.ToastCoreConfig.AllowHTMLMessage\"\n            [innerHTML]=\"toastNotificationBelonging.Dispatch.Message\"\n          ></div>\n        </div>\n      </div>\n      <span\n        class=\"close-ico icon-times-circle\"\n        (click)=\"close()\"\n        *ngIf=\"\n          !toastNotificationBelonging.Buttons.length &&\n          !toastNotificationBelonging.ToastCoreConfig.DeclineLabel &&\n          !toastNotificationBelonging.ToastCoreConfig.ConfirmLabel &&\n          !toastNotificationBelonging.Dispatch.Title\n        \"\n      ></span>\n    </div>\n\n    <div class=\"button-holder\">\n      <div\n        class=\"button-section\"\n        *ngIf=\"toastNotificationBelonging.Buttons.length\"\n        [ngStyle]=\"{\n          'text-align':\n            toastNotificationBelonging.ToastCoreConfig.ButtonPosition\n        }\"\n      >\n        <button\n          class=\"ed-btn ed-btn-sm\"\n          *ngFor=\"let button of toastNotificationBelonging.Buttons\"\n          (click)=\"onCustomButton(button)\"\n          [ngClass]=\"{\n            '': button.LayoutType ? button.LayoutType === 0 : false,\n            'ed-btn-success': button.LayoutType\n              ? button.LayoutType === 1\n              : false,\n            'ed-btn-info': button.LayoutType ? button.LayoutType === 2 : false,\n            'ed-btn-warning': button.LayoutType\n              ? button.LayoutType === 3\n              : false,\n            'ed-btn-danger': button.LayoutType\n              ? button.LayoutType === 4\n              : false,\n            'ed-btn-dark': button.LayoutType ? button.LayoutType === 5 : false,\n            'ed-btn-light': button.LayoutType ? button.LayoutType === 6 : false,\n            'ed-btn-primary': button.LayoutType\n              ? button.LayoutType === 7\n              : false,\n            'ed-btn-secondary': button.LayoutType\n              ? button.LayoutType === 8\n              : false,\n            'ed-btn-link': button.LayoutType ? button.LayoutType === 9 : false\n          }\"\n        >\n          {{ button.Label }}\n        </button>\n      </div>\n\n      <div\n        class=\"button-section\"\n        [ngStyle]=\"{\n          'text-align':\n            toastNotificationBelonging.ToastCoreConfig.ButtonPosition\n        }\"\n        *ngIf=\"\n          !toastNotificationBelonging.Buttons.length &&\n          (toastNotificationBelonging.ToastCoreConfig.DeclineLabel ||\n            toastNotificationBelonging.ToastCoreConfig.ConfirmLabel)\n        \"\n      >\n        <button\n          class=\"ed-btn ed-btn-sm\"\n          *ngIf=\"toastNotificationBelonging.ToastCoreConfig.ConfirmLabel\"\n          (click)=\"onButtonClick('confirm')\"\n          [ngClass]=\"{\n            'ed-btn-primary':\n              toastNotificationBelonging.ToastCoreConfig.LayoutType === 0,\n            'ed-btn-success':\n              toastNotificationBelonging.ToastCoreConfig.LayoutType === 1,\n            'ed-btn-info':\n              toastNotificationBelonging.ToastCoreConfig.LayoutType === 2,\n            'ed-btn-warning':\n              toastNotificationBelonging.ToastCoreConfig.LayoutType === 3,\n            'ed-btn-danger':\n              toastNotificationBelonging.ToastCoreConfig.LayoutType === 4\n          }\"\n        >\n          {{ toastNotificationBelonging.ToastCoreConfig.ConfirmLabel }}\n        </button>\n        <button\n          class=\"ed-btn ed-btn-sm ed-btn-secondary\"\n          (click)=\"onButtonClick('decline')\"\n          *ngIf=\"toastNotificationBelonging.ToastCoreConfig.DeclineLabel\"\n        >\n          {{ toastNotificationBelonging.ToastCoreConfig.DeclineLabel }}\n        </button>\n      </div>\n    </div>\n\n    <div\n      class=\"progress-bar-container\"\n      *ngIf=\"\n        !toastNotificationBelonging.Buttons.length &&\n        !toastNotificationBelonging.ToastCoreConfig.DeclineLabel &&\n        !toastNotificationBelonging.ToastCoreConfig.ConfirmLabel &&\n        toastNotificationBelonging.ToastCoreConfig.ProgressBar !== 0\n      \"\n    >\n      <div\n        class=\"progress-bar\"\n        [ngStyle]=\"{\n          width:\n            (toastNotificationBelonging.ToastCoreConfig.ProgressBar === 1\n              ? timer.Progress\n              : timer.Remaining) + '%'\n        }\"\n      ></div>\n    </div>\n  </div>\n</div>\n",
                animations: [fadeInOut(0, 1)],
                styles: ["@charset \"UTF-8\";.ed-btn-sm{font-size:12px;font-weight:400;margin-right:3px;min-width:40px;padding:2px 8px}.ed-btn-md{font-size:14px;margin-right:5px;min-width:60px;padding:3px 10px}.ed-btn-lg{font-size:16px;margin-right:5px;min-width:70px;padding:4px 10px}.ed-btn{background-color:initial;border:none;border-radius:3px;cursor:pointer;display:inline-block;line-height:1.5;text-align:center;text-decoration:none;-webkit-user-select:none;user-select:none;vertical-align:middle}.ed-btn:hover{color:#989ea5}.ed-btn-check:focus+.ed-btn,.ed-btn:focus{box-shadow:0 0 1px 2px;outline:0}.ed-btn-check:active+.ed-btn,.ed-btn-check:active+.ed-btn:focus,.ed-btn-check:checked+.ed-btn,.ed-btn-check:checked+.ed-btn:focus,.ed-btn.active,.ed-btn.active:focus,.ed-btn:active,.ed-btn:active:focus{box-shadow:0 0 1px 2px}.ed-btn.disabled,.ed-btn:disabled,fieldset:disabled .ed-btn{box-shadow:none;opacity:.6;pointer-events:none}.ed-btn-primary{color:hsla(0,0%,98.4%,.8);background:#ff9e00;border-color:#ff9e00}.ed-btn-primary:hover{color:#fbfbfb;border-color:#ffa81a;background:#ffb133}.ed-btn-check:focus+.ed-btn-primary,.ed-btn-primary:focus{outline:0;box-shadow:0 0 1px 2px #ffa81a}.ed-btn-check:active+.ed-btn-primary,.ed-btn-check:active+.ed-btn-primary:focus,.ed-btn-check:checked+.ed-btn-primary,.ed-btn-check:checked+.ed-btn-primary:focus,.ed-btn-primary.active,.ed-btn-primary.active:focus,.ed-btn-primary:active,.ed-btn-primary:active:focus{box-shadow:0 0 1px 2px #ffa81a}.ed-btn-secondary{color:hsla(0,0%,98.4%,.8);background:#989ea5;border-color:#989ea5}.ed-btn-secondary:hover{color:#fbfbfb;border-color:#a6abb1;background:#b3b8bd}.ed-btn-check:focus+.ed-btn-secondary,.ed-btn-secondary:focus{outline:0;box-shadow:0 0 1px 2px #a6abb1}.ed-btn-check:active+.ed-btn-secondary,.ed-btn-check:active+.ed-btn-secondary:focus,.ed-btn-check:checked+.ed-btn-secondary,.ed-btn-check:checked+.ed-btn-secondary:focus,.ed-btn-secondary.active,.ed-btn-secondary.active:focus,.ed-btn-secondary:active,.ed-btn-secondary:active:focus{box-shadow:0 0 1px 2px #a6abb1}.ed-btn-success{color:hsla(0,0%,98.4%,.8);background:#3caea3;border-color:#3caea3}.ed-btn-success:hover{color:#fbfbfb;border-color:#45bfb3;background:#58c5bb}.ed-btn-check:focus+.ed-btn-success,.ed-btn-success:focus{outline:0;box-shadow:0 0 1px 2px #45bfb3}.ed-btn-check:active+.ed-btn-success,.ed-btn-check:active+.ed-btn-success:focus,.ed-btn-check:checked+.ed-btn-success,.ed-btn-check:checked+.ed-btn-success:focus,.ed-btn-success.active,.ed-btn-success.active:focus,.ed-btn-success:active,.ed-btn-success:active:focus{box-shadow:0 0 1px 2px #45bfb3}.ed-btn-info{color:hsla(0,0%,98.4%,.8);background:#2f8ee5;border-color:#2f8ee5}.ed-btn-info:hover{color:#fbfbfb;border-color:#469ae8;background:#5ca7eb}.ed-btn-check:focus+.ed-btn-info,.ed-btn-info:focus{outline:0;box-shadow:0 0 1px 2px #469ae8}.ed-btn-check:active+.ed-btn-info,.ed-btn-check:active+.ed-btn-info:focus,.ed-btn-check:checked+.ed-btn-info,.ed-btn-check:checked+.ed-btn-info:focus,.ed-btn-info.active,.ed-btn-info.active:focus,.ed-btn-info:active,.ed-btn-info:active:focus{box-shadow:0 0 1px 2px #469ae8}.ed-btn-warning{color:hsla(0,0%,98.4%,.8);background:#ffc107;border-color:#ffc107}.ed-btn-warning:hover{color:#fbfbfb;border-color:#ffc721;background:#ffce3a}.ed-btn-check:focus+.ed-btn-warning,.ed-btn-warning:focus{outline:0;box-shadow:0 0 1px 2px #ffc721}.ed-btn-check:active+.ed-btn-warning,.ed-btn-check:active+.ed-btn-warning:focus,.ed-btn-check:checked+.ed-btn-warning,.ed-btn-check:checked+.ed-btn-warning:focus,.ed-btn-warning.active,.ed-btn-warning.active:focus,.ed-btn-warning:active,.ed-btn-warning:active:focus{box-shadow:0 0 1px 2px #ffc721}.ed-btn-danger{color:hsla(0,0%,98.4%,.8);background:#e46464;border-color:#e46464}.ed-btn-danger:hover{color:#fbfbfb;border-color:#e87a7a;background:#ec8f8f}.ed-btn-check:focus+.ed-btn-danger,.ed-btn-danger:focus{outline:0;box-shadow:0 0 1px 2px #e87a7a}.ed-btn-check:active+.ed-btn-danger,.ed-btn-check:active+.ed-btn-danger:focus,.ed-btn-check:checked+.ed-btn-danger,.ed-btn-check:checked+.ed-btn-danger:focus,.ed-btn-danger.active,.ed-btn-danger.active:focus,.ed-btn-danger:active,.ed-btn-danger:active:focus{box-shadow:0 0 1px 2px #e87a7a}.ed-btn-light{color:rgba(52,58,64,.8);background:#fbfbfb;border-color:#fbfbfb}.ed-btn-light:hover{color:#343a40;border-color:#fff;background:#fff}.ed-btn-check:focus+.ed-btn-light,.ed-btn-light:focus{outline:0;box-shadow:0 0 1px 2px #fff}.ed-btn-check:active+.ed-btn-light,.ed-btn-check:active+.ed-btn-light:focus,.ed-btn-check:checked+.ed-btn-light,.ed-btn-check:checked+.ed-btn-light:focus,.ed-btn-light.active,.ed-btn-light.active:focus,.ed-btn-light:active,.ed-btn-light:active:focus{box-shadow:0 0 1px 2px #fff}.ed-btn-dark{color:hsla(0,0%,98.4%,.8);background:#343a40;border-color:#343a40}.ed-btn-dark:hover{color:#fbfbfb;border-color:#3f474e;background:#4b545c}.ed-btn-check:focus+.ed-btn-dark,.ed-btn-dark:focus{outline:0;box-shadow:0 0 1px 2px #3f474e}.ed-btn-check:active+.ed-btn-dark,.ed-btn-check:active+.ed-btn-dark:focus,.ed-btn-check:checked+.ed-btn-dark,.ed-btn-check:checked+.ed-btn-dark:focus,.ed-btn-dark.active,.ed-btn-dark.active:focus,.ed-btn-dark:active,.ed-btn-dark:active:focus{box-shadow:0 0 1px 2px #3f474e}@font-face{font-family:icomoon;src:url(\"data:font/eot;base64,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\");src:url(\"data:font/eot;base64,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\") format(\"embedded-opentype\"),url(\"data:font/ttf;base64,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\") format(\"truetype\"),url(\"data:font/woff;base64,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\") format(\"woff\"),url(\"data:font/svg;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiID4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPG1ldGFkYXRhPkdlbmVyYXRlZCBieSBJY29Nb29uPC9tZXRhZGF0YT4KCTxkZWZzPgoJCTxmb250IGlkPSJpY29tb29uIiBob3Jpei1hZHYteD0iMTAyNCI+CgkJCTxmb250LWZhY2UgdW5pdHMtcGVyLWVtPSIxMDI0IiBhc2NlbnQ9Ijk2MCIgZGVzY2VudD0iLTY0Ii8+CgkJCTxtaXNzaW5nLWdseXBoIGhvcml6LWFkdi14PSIxMDI0Ii8+CgkJCTxnbHlwaCB1bmljb2RlPSImI3gyMDsiIGhvcml6LWFkdi14PSI1MTIiIGQ9IiIvPgoJCQk8Z2x5cGggdW5pY29kZT0iJiN4ZTkwMDsiIGdseXBoLW5hbWU9InRpbWVzLWNpcmNsZSIgaG9yaXotYWR2LXg9Ijg3OCIgZD0iTTY1Ni41NzEgMzA5LjcxNGMwIDkuNzE0LTQgMTguODU3LTEwLjg1NyAyNS43MTRsLTEwMy40MjkgMTAzLjQyOSAxMDMuNDI5IDEwMy40MjljNi44NTcgNi44NTcgMTAuODU3IDE2IDEwLjg1NyAyNS43MTRzLTQgMTkuNDI5LTEwLjg1NyAyNi4yODZsLTUxLjQyOSA1MS40MjljLTYuODU3IDYuODU3LTE2LjU3MSAxMC44NTctMjYuMjg2IDEwLjg1N3MtMTguODU3LTQtMjUuNzE0LTEwLjg1N2wtMTAzLjQyOS0xMDMuNDI5LTEwMy40MjkgMTAzLjQyOWMtNi44NTcgNi44NTctMTYgMTAuODU3LTI1LjcxNCAxMC44NTdzLTE5LjQyOS00LTI2LjI4Ni0xMC44NTdsLTUxLjQyOS01MS40MjljLTYuODU3LTYuODU3LTEwLjg1Ny0xNi41NzEtMTAuODU3LTI2LjI4NnM0LTE4Ljg1NyAxMC44NTctMjUuNzE0bDEwMy40MjktMTAzLjQyOS0xMDMuNDI5LTEwMy40MjljLTYuODU3LTYuODU3LTEwLjg1Ny0xNi0xMC44NTctMjUuNzE0czQtMTkuNDI5IDEwLjg1Ny0yNi4yODZsNTEuNDI5LTUxLjQyOWM2Ljg1Ny02Ljg1NyAxNi41NzEtMTAuODU3IDI2LjI4Ni0xMC44NTdzMTguODU3IDQgMjUuNzE0IDEwLjg1N2wxMDMuNDI5IDEwMy40MjkgMTAzLjQyOS0xMDMuNDI5YzYuODU3LTYuODU3IDE2LTEwLjg1NyAyNS43MTQtMTAuODU3czE5LjQyOSA0IDI2LjI4NiAxMC44NTdsNTEuNDI5IDUxLjQyOWM2Ljg1NyA2Ljg1NyAxMC44NTcgMTYuNTcxIDEwLjg1NyAyNi4yODZ6TTg3Ny43MTQgNDM4Ljg1N2MwLTI0Mi4yODYtMTk2LjU3MS00MzguODU3LTQzOC44NTctNDM4Ljg1N3MtNDM4Ljg1NyAxOTYuNTcxLTQzOC44NTcgNDM4Ljg1NyAxOTYuNTcxIDQzOC44NTcgNDM4Ljg1NyA0MzguODU3IDQzOC44NTctMTk2LjU3MSA0MzguODU3LTQzOC44NTd6Ii8+CgkJCTxnbHlwaCB1bmljb2RlPSImI3hlOTAxOyIgZ2x5cGgtbmFtZT0iZXhjbGFtYXRpb24tdHJpYW5nbGUsIHdhcm5pbmciIGQ9Ik01ODUuMTQzIDE2NS4xNDN2MTA4LjU3MWMwIDEwLjI4Ni04IDE4Ljg1Ny0xOC4yODYgMTguODU3aC0xMDkuNzE0Yy0xMC4yODYgMC0xOC4yODYtOC41NzEtMTguMjg2LTE4Ljg1N3YtMTA4LjU3MWMwLTEwLjI4NiA4LTE4Ljg1NyAxOC4yODYtMTguODU3aDEwOS43MTRjMTAuMjg2IDAgMTguMjg2IDguNTcxIDE4LjI4NiAxOC44NTd6TTU4NCAzNzguODU3bDEwLjI4NiAyNjIuMjg2YzAgMy40MjktMS43MTQgOC01LjcxNCAxMC44NTctMy40MjkgMi44NTctOC41NzEgNi4yODYtMTMuNzE0IDYuMjg2aC0xMjUuNzE0Yy01LjE0MyAwLTEwLjI4Ni0zLjQyOS0xMy43MTQtNi4yODYtNC0yLjg1Ny01LjcxNC04LjU3MS01LjcxNC0xMmw5LjcxNC0yNjEuMTQzYzAtNy40MjkgOC41NzEtMTMuMTQzIDE5LjQyOS0xMy4xNDNoMTA1LjcxNGMxMC4yODYgMCAxOC44NTcgNS43MTQgMTkuNDI5IDEzLjE0M3pNNTc2IDkxMi41NzFsNDM4Ljg1Ny04MDQuNTcxYzEyLjU3MS0yMi4yODYgMTItNDkuNzE0LTEuMTQzLTcycy0zNy4xNDMtMzYtNjIuODU3LTM2aC04NzcuNzE0Yy0yNS43MTQgMC00OS43MTQgMTMuNzE0LTYyLjg1NyAzNnMtMTMuNzE0IDQ5LjcxNC0xLjE0MyA3Mmw0MzguODU3IDgwNC41NzFjMTIuNTcxIDIzLjQyOSAzNy4xNDMgMzguMjg2IDY0IDM4LjI4NnM1MS40MjktMTQuODU3IDY0LTM4LjI4NnoiLz4KCQkJPGdseXBoIHVuaWNvZGU9IiYjeGU5MDI7IiBnbHlwaC1uYW1lPSJjaGVjay1jaXJjbGUiIGhvcml6LWFkdi14PSI4NzgiIGQ9Ik03MzMuNzE0IDUzMS40MjhjMCA5LjcxNC0zLjQyOSAxOS40MjktMTAuMjg2IDI2LjI4NmwtNTIgNTEuNDI5Yy02Ljg1NyA2Ljg1Ny0xNiAxMC44NTctMjUuNzE0IDEwLjg1N3MtMTguODU3LTQtMjUuNzE0LTEwLjg1N2wtMjMzLjE0My0yMzIuNTcxLTEyOS4xNDMgMTI5LjE0M2MtNi44NTcgNi44NTctMTYgMTAuODU3LTI1LjcxNCAxMC44NTdzLTE4Ljg1Ny00LTI1LjcxNC0xMC44NTdsLTUyLTUxLjQyOWMtNi44NTctNi44NTctMTAuMjg2LTE2LjU3MS0xMC4yODYtMjYuMjg2czMuNDI5LTE4Ljg1NyAxMC4yODYtMjUuNzE0bDIwNi44NTctMjA2Ljg1N2M2Ljg1Ny02Ljg1NyAxNi41NzEtMTAuODU3IDI1LjcxNC0xMC44NTcgOS43MTQgMCAxOS40MjkgNCAyNi4yODYgMTAuODU3bDMxMC4yODYgMzEwLjI4NmM2Ljg1NyA2Ljg1NyAxMC4yODYgMTYgMTAuMjg2IDI1LjcxNHpNODc3LjcxNCA0MzguODU3YzAtMjQyLjI4Ni0xOTYuNTcxLTQzOC44NTctNDM4Ljg1Ny00MzguODU3cy00MzguODU3IDE5Ni41NzEtNDM4Ljg1NyA0MzguODU3IDE5Ni41NzEgNDM4Ljg1NyA0MzguODU3IDQzOC44NTcgNDM4Ljg1Ny0xOTYuNTcxIDQzOC44NTctNDM4Ljg1N3oiLz4KCQkJPGdseXBoIHVuaWNvZGU9IiYjeGU5MDM7IiBnbHlwaC1uYW1lPSJpbmZvLWNpcmNsZSIgaG9yaXotYWR2LXg9Ijg3OCIgZD0iTTU4NS4xNDMgMTY0LjU3MXY5MS40MjljMCAxMC4yODYtOCAxOC4yODYtMTguMjg2IDE4LjI4NmgtNTQuODU3djI5Mi41NzFjMCAxMC4yODYtOCAxOC4yODYtMTguMjg2IDE4LjI4NmgtMTgyLjg1N2MtMTAuMjg2IDAtMTguMjg2LTgtMTguMjg2LTE4LjI4NnYtOTEuNDI5YzAtMTAuMjg2IDgtMTguMjg2IDE4LjI4Ni0xOC4yODZoNTQuODU3di0xODIuODU3aC01NC44NTdjLTEwLjI4NiAwLTE4LjI4Ni04LTE4LjI4Ni0xOC4yODZ2LTkxLjQyOWMwLTEwLjI4NiA4LTE4LjI4NiAxOC4yODYtMTguMjg2aDI1NmMxMC4yODYgMCAxOC4yODYgOCAxOC4yODYgMTguMjg2ek01MTIgNjc2LjU3MXY5MS40MjljMCAxMC4yODYtOCAxOC4yODYtMTguMjg2IDE4LjI4NmgtMTA5LjcxNGMtMTAuMjg2IDAtMTguMjg2LTgtMTguMjg2LTE4LjI4NnYtOTEuNDI5YzAtMTAuMjg2IDgtMTguMjg2IDE4LjI4Ni0xOC4yODZoMTA5LjcxNGMxMC4yODYgMCAxOC4yODYgOCAxOC4yODYgMTguMjg2ek04NzcuNzE0IDQzOC44NTdjMC0yNDIuMjg2LTE5Ni41NzEtNDM4Ljg1Ny00MzguODU3LTQzOC44NTdzLTQzOC44NTcgMTk2LjU3MS00MzguODU3IDQzOC44NTcgMTk2LjU3MSA0MzguODU3IDQzOC44NTcgNDM4Ljg1NyA0MzguODU3LTE5Ni41NzEgNDM4Ljg1Ny00MzguODU3eiIvPgoJCTwvZm9udD48L2RlZnM+Cjwvc3ZnPgo=\") format(\"svg\");font-weight:400;font-style:normal;font-display:block}[class*=\" icon-\"],[class^=icon-]{font-family:icomoon!important;-webkit-font-smoothing:antialiased;font-style:normal;font-variant:normal;font-weight:400;line-height:1;-moz-osx-font-smoothing:grayscale;speak:never;text-transform:none}.icon-times-circle:before{content:\"\uE900\"}.icon-exclamation-triangle:before,.icon-warning:before{content:\"\uE901\"}.icon-check-circle:before{content:\"\uE902\"}.icon-info-circle:before{content:\"\uE903\"}.ngx-awesome-popup-overlay{align-items:center;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px);background:rgba(51,32,0,.4);bottom:0;display:flex;flex-direction:column;justify-content:center;left:0;opacity:0;position:fixed;right:0;top:0;z-index:999999999}.evolve-confirm-box .text-wrapper,.evolve-parent-dialog .text-wrapper{text-align:center}.evolve-confirm-box .text-wrapper-section,.evolve-parent-dialog .text-wrapper-section,.evolve-toast .text-wrapper-section{width:100%}.evolve-confirm-box .text-wrapper-section .text-wrapper,.evolve-parent-dialog .text-wrapper-section .text-wrapper,.evolve-toast .text-wrapper-section .text-wrapper{display:block;width:100%}.evolve-confirm-box .text-wrapper-section .dont-break-out,.evolve-parent-dialog .text-wrapper-section .dont-break-out,.evolve-toast .text-wrapper-section .dont-break-out{-webkit-hyphens:auto;hyphens:auto;overflow-wrap:break-word;white-space:pre-wrap;word-wrap:break-word}.evolve-confirm-box,.evolve-parent-dialog{background:#fbfbfb;border-radius:5px;border-top:7px solid;box-shadow:0 0 4px 1px rgba(0,0,0,.25);display:flex;flex-direction:column;max-height:calc(100vh - 100px);max-width:calc(100vw - 100px);position:relative;vertical-align:bottom}.evolve-confirm-box.standard-dialog,.evolve-parent-dialog.standard-dialog{border-color:transparent;padding:17px 20px 10px}.evolve-confirm-box.success-dialog,.evolve-parent-dialog.success-dialog{border-color:#3caea3}.evolve-confirm-box.info-dialog,.evolve-parent-dialog.info-dialog{border-color:#2f8ee5}.evolve-confirm-box.warning-dialog,.evolve-parent-dialog.warning-dialog{border-color:#ffc107}.evolve-confirm-box.danger-dialog,.evolve-parent-dialog.danger-dialog{border-color:#e46464}.ap-icon-success{color:#58c5bb}.ap-icon-info{color:#5ca7eb}.ap-icon-warning{color:#ffce3a}.ap-icon-danger{color:#ec8f8f}.toast-wrapper{background:transparent;display:flex;flex-direction:column;margin:auto;opacity:0;padding:0;pointer-events:auto;position:relative;width:100%;z-index:0}.toast-wrapper .progress-bar-container{background:hsla(0,0%,100%,.2);border-radius:0 0 5px 5px}.toast-wrapper .progress-bar{height:4px;transition:none;width:0}.toast-wrapper .evolve-toast{background:#fbfbfb;border-radius:5px;border-right:4px solid;box-shadow:0 0 4px 1px rgba(0,0,0,.25);display:flex;flex-direction:column;margin-top:10px;max-height:350px;position:relative;transition:box-shadow .3s ease-in-out;vertical-align:bottom}.toast-wrapper .evolve-toast:hover{box-shadow:0 0 4px 3px rgba(0,0,0,.25)}.toast-wrapper .evolve-toast.standard-dialog{border-color:transparent}.toast-wrapper .evolve-toast.standard-dialog .progress-bar{background-color:rgba(42,42,42,.2)}.toast-wrapper .evolve-toast.success-dialog{background-color:#dcf3f1;border-color:#3caea3}.toast-wrapper .evolve-toast.success-dialog .progress-bar{background-color:#91d9d2}.toast-wrapper .evolve-toast.info-dialog{background-color:#e4f1fc;border-color:#2f8ee5}.toast-wrapper .evolve-toast.info-dialog .progress-bar{background-color:#a0ccf3}.toast-wrapper .evolve-toast.warning-dialog{background-color:#fff4d3;border-color:#ffc107}.toast-wrapper .evolve-toast.warning-dialog .progress-bar{background-color:#ffe187}.toast-wrapper .evolve-toast.danger-dialog{background-color:#f7d1d1;border-color:#e46464}.toast-wrapper .evolve-toast.danger-dialog .progress-bar{background-color:#ec8f8f}.toast-wrapper .evolve-toast .close-ico{color:rgba(0,0,0,.2);cursor:pointer;font-size:20px;position:absolute;right:6px;top:4px}.toast-wrapper .evolve-toast .toast-title-content{align-items:flex-start;background-clip:padding-box;background-color:hsla(0,0%,100%,.55);border-bottom:1px solid rgba(0,0,0,.05);border-radius:5px 5px 0 0;color:#6c757d;display:flex;flex-direction:column;height:auto;justify-content:flex-start;padding:5px 10px;width:auto}.toast-wrapper .evolve-toast .toast-title-content .toast-title-text{font-size:.87rem}.toast-wrapper .evolve-toast .content-holder{align-items:center;color:#6c757d;display:flex;flex-wrap:nowrap;height:100%;justify-content:space-between;overflow:auto;width:100%}.toast-wrapper .evolve-toast .content-holder .icon-section .icon-type-toast{font-size:24px;padding:0 2px 0 6px}.toast-wrapper .evolve-toast .content-holder .toast-inner-content{padding:6px 10px}.toast-wrapper .evolve-toast .content-holder .only-message{padding:6px 27px 6px 10px}.toast-wrapper .evolve-toast .content-holder .text-wrapper{font-size:.97rem;margin:0}.toast-wrapper .evolve-toast .button-holder{display:flex;flex-direction:column;justify-content:flex-end;width:100%}.toast-wrapper .evolve-toast .button-holder .button-section{margin:0;padding:4px 10px}"]
            },] }
];
ToastNotificationWrapperComponent.ctorParameters = () => [
    { type: GlobalConfigService },
    { type: ToastNotificationClass.ToastNotificationBelonging },
    { type: ChangeDetectorRef }
];

class ToastNotificationService {
    constructor(componentFactoryResolver, injector, appRef, toastConfig, gConfigService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.injector = injector;
        this.appRef = appRef;
        this.toastConfig = toastConfig;
        this.gConfigService = gConfigService;
        // toastComponentRefList: ComponentRef<ToastNotificationWrapperComponent>[]    = [];
        this.toastComponentRefList = [];
        this.bufferToastRawList = [];
        this.bufferCheckingIntervalIsReady = true;
    }
    openToast$(_ToastNotificationBelonging) {
        let eventController = _ToastNotificationBelonging.EventsController;
        // console.log(`%c ${_ToastNotificationBelonging.EntityUniqueID} `, `background: #339933; color: #fff`);
        const toastRawInstance = this.prepareRawToast(eventController, _ToastNotificationBelonging);
        this.listeners(eventController);
        this.internalRouting(toastRawInstance);
        return eventController.afterClosed$;
    }
    internalRouting(_ToastRawInstance) {
        if (this.isRefListAvailable()) {
            this.sendToProduction(_ToastRawInstance);
            return true;
        }
        else {
            this.sendToBuffer(_ToastRawInstance);
            return false;
        }
    }
    sendToBuffer(_ToastRawInstance) {
        this.bufferToastRawList.push(_ToastRawInstance);
    }
    sendToProduction(_ToastRawInstance) {
        const componentRef = this.getComponentRef(_ToastRawInstance);
        if (componentRef) {
            this.toastComponentRefList.push(componentRef);
            componentRef.instance.toastNotificationBelonging =
                _ToastRawInstance.ToastBelonging;
            this.appendToBodyParentComponent(componentRef);
        }
    }
    isRefListAvailable() {
        return (this.toastComponentRefList.length <
            this.toastConfig.productionConfig.GlobalSettings
                .AllowedNotificationsAtOnce);
    }
    prepareRawToast(_EventsController, _ToastNotificationBelonging) {
        const weakMap = new WeakMap();
        weakMap.set(ToastNotificationClass.ToastNotificationEventsController, _EventsController);
        return {
            WeakMap: weakMap,
            ToastBelonging: _ToastNotificationBelonging,
        };
    }
    getComponentRef(_ToastNotificationRawState) {
        const dialogIndex = this.findDialogIndex(_ToastNotificationRawState.ToastBelonging.EntityUniqueID);
        if (dialogIndex === -1) {
            let toastUserViewComponent = ToastNotificationWrapperComponent;
            if (_ToastNotificationRawState.ToastBelonging.ToastCoreConfig
                .ToastUserViewType === ToastUserViewTypeEnum.SIMPLE) {
                toastUserViewComponent = ToastNotificationSimpleWrapperComponent;
            }
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(toastUserViewComponent);
            return componentFactory.create(new DialogInjector(this.injector, _ToastNotificationRawState.WeakMap));
        }
        return null;
    }
    listeners(_EventsController) {
        // Listener for closing dialog
        const closeDialogSubscription = _EventsController.afterClosed$.subscribe((response) => {
            // this.removeFromBodyParentComponent(modalIndex);
            this.removeFromBody(response.toastNotificationBelonging.EntityUniqueID);
            closeDialogSubscription.unsubscribe();
        });
    }
    appendToBodyParentComponent(_ComponentRef) {
        // attach view to ignite lifecycle hooks
        this.appRef.attachView(_ComponentRef.hostView);
        const toastPosition = _ComponentRef.instance.toastNotificationBelonging.ToastCoreConfig
            .ToastPosition;
        const openInElementID = _ComponentRef.instance.toastNotificationBelonging.ToastCoreConfig
            .OpenInElementID;
        let targetNode;
        if (!openInElementID) {
            this.setToastWrapperNode(_ComponentRef.instance.toastNotificationBelonging.ToastCoreConfig
                .ToastPosition, this.setToastOverlayNode());
            targetNode = document.getElementById(`toast-wrapper-${toastPosition}`);
        }
        else {
            targetNode = document.getElementById(openInElementID);
        }
        const domElem = _ComponentRef.hostView
            .rootNodes[0];
        const toastEntity = document.createElement("div");
        toastEntity.setAttribute("id", _ComponentRef.instance.toastNotificationBelonging.EntityUniqueID);
        toastEntity.className = "toast-entity";
        const split = toastPosition.split("-");
        if (split[1] === "fullwidth") {
            toastEntity.style.width = "93vw";
        }
        else if (openInElementID) {
            toastEntity.style.width = "100%";
        }
        else {
            toastEntity.style.width = "300px";
        }
        toastEntity.style.margin = "auto";
        toastEntity.prepend(domElem);
        // targetNode.prepend(toastEntity);
        setTimeout(() => {
            targetNode.prepend(toastEntity);
        }, 200);
    }
    removeFromBody(_EntityUniqueID) {
        const modalIndex = this.findDialogIndex(_EntityUniqueID);
        if (modalIndex > -1) {
            if (this.bufferToastRawList.length) {
                this.sendToProduction(this.bufferToastRawList[0]);
                this.bufferToastRawList.splice(0, 1);
            }
            this.toastComponentRefList[modalIndex].instance
                .closeParent$("close-fast")
                .pipe(map((item) => {
                const modalIndex = this.findDialogIndex(_EntityUniqueID);
                if (this.toastComponentRefList[modalIndex]) {
                    const toastEntity = document.getElementById(this.toastComponentRefList[modalIndex].instance
                        .toastNotificationBelonging.EntityUniqueID);
                    toastEntity.remove();
                    // console.log(`%c ${this.toastComponentRefList[modalIndex].instance.toastNotificationBelonging.EntityUniqueID} `, `background: #cc3333; color: #fff`);
                    this.appRef.detachView(this.toastComponentRefList[modalIndex].hostView);
                    this.toastComponentRefList[modalIndex].destroy();
                    this.toastComponentRefList.splice(modalIndex, 1);
                }
            }))
                .subscribe();
        }
    }
    findDialogIndex(_DialogUniqueID) {
        return this.toastComponentRefList.findIndex((item) => {
            return (_DialogUniqueID ===
                item.instance.toastNotificationBelonging.EntityUniqueID);
        });
    }
    setToastOverlayNode() {
        const bodyNode = document.body || document.getElementsByTagName("body")[0];
        if (!bodyNode) {
            return;
        }
        // check the overlay
        let toastOverlayNode = document.getElementById("toast-overlay-container");
        if (!toastOverlayNode) {
            let toastOverlayNode = document.createElement("div");
            toastOverlayNode.setAttribute("id", "toast-overlay-container");
            toastOverlayNode.appendChild(document.createTextNode(""));
            toastOverlayNode.style.position = "fixed";
            toastOverlayNode.style.top = "0";
            toastOverlayNode.style.left = "0";
            toastOverlayNode.style.zIndex = "999999999";
            bodyNode.appendChild(toastOverlayNode);
            return toastOverlayNode;
        }
        return toastOverlayNode;
    }
    setToastWrapperNode(_Position, _ToastOverlayNode) {
        let toastWrapperNode = document.getElementById(`toast-wrapper-${_Position}`);
        if (!toastWrapperNode) {
            const toastWrapper = document.createElement("div");
            toastWrapper.setAttribute("id", "toast-wrapper-" + _Position);
            toastWrapper.appendChild(document.createTextNode(""));
            _ToastOverlayNode.prepend(toastWrapper);
            const split = _Position.split("-");
            if (split[1] === "right" || split[1] === "left") {
                this.gConfigService
                    .getSheet("ngx-awesome-popup-styles")
                    .addRule(`#toast-wrapper-${_Position}`, `${split[0]}: 20px; ${split[1]}: 20px; position: fixed; z-index: 999999;`);
            }
            if (split[1] === "center") {
                this.gConfigService
                    .getSheet("ngx-awesome-popup-styles")
                    .addRule(`#toast-wrapper-${_Position}`, `${split[0]}: 20px; width: 100%; position: fixed; z-index: 999999; pointer-events: none;`);
            }
            if (split[1] === "fullwidth") {
                this.gConfigService
                    .getSheet("ngx-awesome-popup-styles")
                    .addRule(`#toast-wrapper-${_Position}`, `${split[0]}: 10px; width: 100%; position: fixed; z-index: 999999; pointer-events: none;`);
            }
        }
    }
}
ToastNotificationService.ɵprov = i0.ɵɵdefineInjectable({ factory: function ToastNotificationService_Factory() { return new ToastNotificationService(i0.ɵɵinject(i0.ComponentFactoryResolver), i0.ɵɵinject(i0.INJECTOR), i0.ɵɵinject(i0.ApplicationRef), i0.ɵɵinject(ToastNotificationConfigService), i0.ɵɵinject(GlobalConfigService)); }, token: ToastNotificationService, providedIn: "root" });
ToastNotificationService.decorators = [
    { type: Injectable, args: [{
                providedIn: "root",
            },] }
];
ToastNotificationService.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: Injector },
    { type: ApplicationRef },
    { type: ToastNotificationConfigService },
    { type: GlobalConfigService }
];

var ToastNotificationClass;
(function (ToastNotificationClass) {
    // region *** Public ***
    class ToastNotificationInitializer {
        constructor() {
            this.toastNotificationCarrier = new ToastNotificationClass.ToastNotificationCarrier();
        }
        openToastNotification$() {
            return this.toastNotificationCarrier.openToastNotification$().pipe(map((resp) => {
                const basicToastNotificationResponse = new ToastNotificationResponse();
                const dataControl = new GlobalClass.DataControl();
                dataControl.copyValuesFrom(resp, basicToastNotificationResponse);
                return basicToastNotificationResponse;
            }), take(1));
        }
        setButtons(_Buttons) {
            this.toastNotificationCarrier.setButtons(_Buttons);
        }
        setConfig(_ToastNotificationConfig) {
            this.toastNotificationCarrier.setConfig(_ToastNotificationConfig);
        }
        setDispatch(_Title, _Message = null) {
            this.toastNotificationCarrier.setTitle(_Title);
            this.toastNotificationCarrier.setMessage(_Message);
        }
        setTitle(_Title) {
            this.toastNotificationCarrier.setTitle(_Title);
        }
        setMessage(_Message) {
            this.toastNotificationCarrier.setMessage(_Message);
        }
        setButtonLabels(_Confirm, _Decline) {
            this.toastNotificationCarrier.setButtonLabels(_Confirm, _Decline);
        }
    }
    ToastNotificationClass.ToastNotificationInitializer = ToastNotificationInitializer;
    class ToastNotificationResponse extends GlobalClass.DataControl {
        constructor() {
            super();
            // private Response: DialogPrepareResponse            = new DialogPrepareResponse();
            this.Success = null;
            this.ClickedButtonID = null;
        }
        setSuccess(_IsSuccess) {
            this.Success = _IsSuccess;
        }
        setClickedButtonID(_ClickedButtonID) {
            this.ClickedButtonID = _ClickedButtonID;
        }
    }
    ToastNotificationClass.ToastNotificationResponse = ToastNotificationResponse;
    class ToastNotificationEventsController {
        constructor(EntityUniqueID) {
            this.EntityUniqueID = EntityUniqueID;
            this._afterClosed = new Subject();
            this.afterClosed$ = this._afterClosed.asObservable();
            this._onButtonClick = new Subject();
            this.onButtonClick$ = this._onButtonClick.asObservable();
            this._buttonList = new Subject();
            this.buttonList$ = this._buttonList.asObservable();
        }
        close(_Response) {
            const response = _Response ? _Response : this.defaultResponse;
            this._afterClosed.next(response);
        }
        onButtonClick(_Button) {
            this.defaultResponse.setClickedButtonID(_Button.ID);
            this._onButtonClick.next(_Button);
        }
        setButtonList(_ButtonList) {
            this._buttonList.next(_ButtonList);
        }
        setDefaultResponse(_Response) {
            this.defaultResponse = _Response;
        }
    }
    ToastNotificationClass.ToastNotificationEventsController = ToastNotificationEventsController;
    // endregion
    class ToastNotificationDefaultResponse extends ToastNotificationResponse {
        constructor() {
            super();
            this.toastNotificationBelonging = null;
        }
        setBelonging(_ToastNotificationBelonging) {
            this.toastNotificationBelonging = _ToastNotificationBelonging;
        }
    }
    ToastNotificationClass.ToastNotificationDefaultResponse = ToastNotificationDefaultResponse;
    class ToastNotificationCarrier {
        constructor() {
            this.toastNotificationBelonging = new ToastNotificationClass.ToastNotificationBelonging();
        }
        setButtons(_Buttons) {
            if (_Buttons.length) {
                this.toastNotificationBelonging.Buttons = _Buttons;
            }
        }
        setTitle(_Title) {
            this.toastNotificationBelonging.Dispatch.Title = _Title;
        }
        setMessage(_Message) {
            this.toastNotificationBelonging.Dispatch.Message = _Message;
        }
        setButtonLabels(_Confirm, _Decline) {
            this.toastNotificationBelonging.ToastCoreConfig.ConfirmLabel = _Confirm;
            this.toastNotificationBelonging.ToastCoreConfig.DeclineLabel = _Decline;
        }
        setConfig(_ToastNotificationBelonging) {
            // region *** local UserConfig (defined on place where dialog is called) ***
            const dataControl = new GlobalClass.DataControl();
            dataControl.copyValuesFrom(_ToastNotificationBelonging, this.toastNotificationBelonging.ToastCoreConfig);
            // endregion
        }
        openToastNotification$() {
            if (!this.toastNotificationBelonging.Dispatch.Title &&
                !this.toastNotificationBelonging.Dispatch.Message) {
                throw Error("Toast notification can not be without both message and title.");
            }
            const service = ServiceLocator.injector.get(ToastNotificationService);
            return service.openToast$(this.toastNotificationBelonging);
        }
    }
    ToastNotificationClass.ToastNotificationCarrier = ToastNotificationCarrier;
    class GlobalToastSettings {
        constructor() {
            this.AllowedNotificationsAtOnce = null;
        }
    }
    ToastNotificationClass.GlobalToastSettings = GlobalToastSettings;
    class ResetToastGlobalSettings {
        constructor(globalToastConfig) {
            const globalToastConfigService = ServiceLocator.injector.get(ToastNotificationConfigService);
            if (globalToastConfigService) {
                globalToastConfigService.setResetGlobalToastConfig(globalToastConfig);
            }
            else {
                globalToastConfigService.setResetGlobalToastConfig();
            }
        }
    }
    ToastNotificationClass.ResetToastGlobalSettings = ResetToastGlobalSettings;
    class Settings {
        constructor() {
            this.Buttons = [];
            this.ToastCoreConfig = new ToastCoreConfig();
            this.Dispatch = new GlobalClass.Dispatch();
            this.GlobalSettings = new GlobalToastSettings();
        }
    }
    ToastNotificationClass.Settings = Settings;
    class ToastCoreConfig {
        constructor() {
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
    }
    ToastNotificationClass.ToastCoreConfig = ToastCoreConfig;
    class ToastNotificationBelonging extends ToastNotificationClass.Settings {
        constructor() {
            super();
            this.EntityUniqueID = "T" + Math.random().toString(36).substr(2, 9);
            this.EventsController = new ToastNotificationEventsController(this.EntityUniqueID);
            const toastNotificationConfigurator = ServiceLocator.injector.get(ToastNotificationConfigService);
            const baseSettings = new ToastNotificationClass.Settings();
            const dataControl = new GlobalClass.DataControl();
            dataControl.copyValuesFrom(toastNotificationConfigurator.productionConfig.ToastCoreConfig, baseSettings.ToastCoreConfig);
            this.ToastCoreConfig = baseSettings.ToastCoreConfig;
            this.Buttons = toastNotificationConfigurator.productionConfig.Buttons.slice();
        }
    }
    ToastNotificationClass.ToastNotificationBelonging = ToastNotificationBelonging;
})(ToastNotificationClass || (ToastNotificationClass = {}));
var ToastProgressBarEnum;
(function (ToastProgressBarEnum) {
    ToastProgressBarEnum[ToastProgressBarEnum["NONE"] = 0] = "NONE";
    ToastProgressBarEnum[ToastProgressBarEnum["INCREASE"] = 1] = "INCREASE";
    ToastProgressBarEnum[ToastProgressBarEnum["DECREASE"] = 2] = "DECREASE";
})(ToastProgressBarEnum || (ToastProgressBarEnum = {}));
var ToastPositionEnum;
(function (ToastPositionEnum) {
    ToastPositionEnum["TOP_LEFT"] = "top-left";
    ToastPositionEnum["TOP_CENTER"] = "top-center";
    ToastPositionEnum["TOP_RIGHT"] = "top-right";
    ToastPositionEnum["TOP_FULL_WIDTH"] = "top-fullwidth";
    ToastPositionEnum["BOTTOM_LEFT"] = "bottom-left";
    ToastPositionEnum["BOTTOM_CENTER"] = "bottom-center";
    ToastPositionEnum["BOTTOM_RIGHT"] = "bottom-right";
    ToastPositionEnum["BOTTOM_FULL_WIDTH"] = "bottom-fullwidth";
})(ToastPositionEnum || (ToastPositionEnum = {}));
var ToastUserViewTypeEnum;
(function (ToastUserViewTypeEnum) {
    ToastUserViewTypeEnum["SIMPLE"] = "simple";
    ToastUserViewTypeEnum["STANDARD"] = "standard";
})(ToastUserViewTypeEnum || (ToastUserViewTypeEnum = {}));

class NgxAwesomePopupModule {
    constructor(injector, gConfigService) {
        this.injector = injector;
        this.gConfigService = gConfigService;
        ServiceLocator.injector = injector;
    }
    static forRoot(globalConfig) {
        return {
            ngModule: NgxAwesomePopupModule,
            providers: [
                GlobalConfigService,
                { provide: "globalConfig", useValue: globalConfig },
            ],
        };
    }
}
NgxAwesomePopupModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    DialogWrapperComponent,
                    InsertionDirective,
                    InsertionLoaderDirective,
                    DefaultLoaderComponent,
                    ConfirmBoxWrapperComponent,
                    ToastNotificationWrapperComponent,
                    ToastNotificationSimpleWrapperComponent,
                ],
                imports: [CommonModule, BrowserModule, BrowserAnimationsModule],
                providers: [
                    DialogService,
                    ConfirmBoxService,
                    ToastNotificationService,
                    GlobalConfigService,
                    DialogConfigService,
                    ConfirmBoxConfigService,
                    ToastNotificationConfigService,
                    DialogClass.DialogBelonging,
                    ConfirmBoxClass.ConfirmBoxBelonging,
                    ToastNotificationClass.ToastNotificationBelonging,
                ],
                entryComponents: [
                    DialogWrapperComponent,
                    DefaultLoaderComponent,
                    ConfirmBoxWrapperComponent,
                    ToastNotificationWrapperComponent,
                    ToastNotificationSimpleWrapperComponent,
                ],
            },] }
];
NgxAwesomePopupModule.ctorParameters = () => [
    { type: Injector },
    { type: GlobalConfigService }
];
class DialogConfigModule {
    static forRoot(dialogConfig) {
        return {
            ngModule: DialogConfigModule,
            providers: [
                DialogConfigService,
                { provide: "dialogConfig", useValue: dialogConfig },
            ],
        };
    }
}
DialogConfigModule.decorators = [
    { type: NgModule, args: [{},] }
];
class ConfirmBoxConfigModule {
    static forRoot(confirmBoxConfig) {
        return {
            ngModule: ConfirmBoxConfigModule,
            providers: [
                ConfirmBoxConfigService,
                { provide: "confirmBoxConfig", useValue: confirmBoxConfig },
            ],
        };
    }
}
ConfirmBoxConfigModule.decorators = [
    { type: NgModule, args: [{},] }
];
class ToastNotificationConfigModule {
    static forRoot(toastNotificationConfig) {
        return {
            ngModule: ToastNotificationConfigModule,
            providers: [
                ToastNotificationConfigService,
                {
                    provide: "toastNotificationConfig",
                    useValue: toastNotificationConfig,
                },
            ],
        };
    }
}
ToastNotificationConfigModule.decorators = [
    { type: NgModule, args: [{},] }
];

var ConfirmBoxInitializer = ConfirmBoxClass.ConfirmBoxInitializer;
var DialogBelonging = DialogClass.DialogBelonging;
var DialogInitializer = DialogClass.DialogInitializer;
var ButtonMaker = GlobalClass.ButtonMaker;
var ResetGlobalConfig = GlobalClass.ResetGlobalConfig;
var ResetToastGlobalSettings = ToastNotificationClass.ResetToastGlobalSettings;
var ToastNotificationInitializer = ToastNotificationClass.ToastNotificationInitializer;
// endregion

/**
 * Generated bundle index. Do not edit.
 */

export { ButtonLayoutDisplay, ButtonMaker, ConfirmBoxConfigModule, ConfirmBoxInitializer, DialogBelonging, DialogConfigModule, DialogInitializer, DialogLayoutDisplay, NgxAwesomePopupModule, ResetGlobalConfig, ResetToastGlobalSettings, ToastNotificationConfigModule, ToastNotificationInitializer, ToastPositionEnum, ToastProgressBarEnum, ToastUserViewTypeEnum, DialogWrapperComponent as ɵa, fadeInOut as ɵb, InsertionDirective as ɵc, InsertionLoaderDirective as ɵd, DialogClass as ɵe, DefaultLoaderComponent as ɵf, ConfirmBoxWrapperComponent as ɵg, ConfirmBoxClass as ɵh, ToastNotificationWrapperComponent as ɵi, WrapperAbstraction as ɵj, ToastNotificationClass as ɵk, GlobalConfigService as ɵl, ToastNotificationSimpleWrapperComponent as ɵn, DialogService as ɵo, ConfirmBoxService as ɵp, ToastNotificationService as ɵq, ToastNotificationConfigService as ɵr, DialogConfigService as ɵt, ConfirmBoxConfigService as ɵv };
//# sourceMappingURL=costlydeveloper-ngx-awesome-popup.js.map
