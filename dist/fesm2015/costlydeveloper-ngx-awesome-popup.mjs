import { Observable, Subject, BehaviorSubject, of } from 'rxjs';
import { delay, tap, take, map } from 'rxjs/operators';
import * as i0 from '@angular/core';
import { Injectable, Inject, Component, ViewChild, ViewChildren, Directive, HostListener, NgModule } from '@angular/core';
import { style, trigger, state, transition, animate, keyframes, query, animateChild } from '@angular/animations';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { __classPrivateFieldGet } from 'tslib';

var DialogLayoutDisplay;
(function (DialogLayoutDisplay) {
    DialogLayoutDisplay[DialogLayoutDisplay["NONE"] = 0] = "NONE";
    DialogLayoutDisplay[DialogLayoutDisplay["SUCCESS"] = 1] = "SUCCESS";
    DialogLayoutDisplay[DialogLayoutDisplay["INFO"] = 2] = "INFO";
    DialogLayoutDisplay[DialogLayoutDisplay["WARNING"] = 3] = "WARNING";
    DialogLayoutDisplay[DialogLayoutDisplay["DANGER"] = 4] = "DANGER";
    DialogLayoutDisplay[DialogLayoutDisplay["CUSTOM_ONE"] = 20] = "CUSTOM_ONE";
    DialogLayoutDisplay[DialogLayoutDisplay["CUSTOM_TWO"] = 21] = "CUSTOM_TWO";
    DialogLayoutDisplay[DialogLayoutDisplay["CUSTOM_THREE"] = 22] = "CUSTOM_THREE";
    DialogLayoutDisplay[DialogLayoutDisplay["CUSTOM_FOUR"] = 23] = "CUSTOM_FOUR";
    DialogLayoutDisplay[DialogLayoutDisplay["CUSTOM_FIVE"] = 24] = "CUSTOM_FIVE";
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
    ButtonLayoutDisplay[ButtonLayoutDisplay["CUSTOM_ONE"] = 20] = "CUSTOM_ONE";
    ButtonLayoutDisplay[ButtonLayoutDisplay["CUSTOM_TWO"] = 21] = "CUSTOM_TWO";
    ButtonLayoutDisplay[ButtonLayoutDisplay["CUSTOM_THREE"] = 22] = "CUSTOM_THREE";
    ButtonLayoutDisplay[ButtonLayoutDisplay["CUSTOM_FOUR"] = 23] = "CUSTOM_FOUR";
    ButtonLayoutDisplay[ButtonLayoutDisplay["CUSTOM_FIVE"] = 24] = "CUSTOM_FIVE";
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
    ColorVariance[ColorVariance["LINK"] = 9] = "LINK";
    ColorVariance[ColorVariance["CUSTOM_ONE"] = 20] = "CUSTOM_ONE";
    ColorVariance[ColorVariance["CUSTOM_TWO"] = 21] = "CUSTOM_TWO";
    ColorVariance[ColorVariance["CUSTOM_THREE"] = 22] = "CUSTOM_THREE";
    ColorVariance[ColorVariance["CUSTOM_FOUR"] = 23] = "CUSTOM_FOUR";
    ColorVariance[ColorVariance["CUSTOM_FIVE"] = 24] = "CUSTOM_FIVE";
})(ColorVariance || (ColorVariance = {}));
var AppearanceAnimation;
(function (AppearanceAnimation) {
    AppearanceAnimation["NONE"] = "noneIn";
    AppearanceAnimation["BOUNCE_IN"] = "bounceIn";
    AppearanceAnimation["SWING"] = "swing";
    AppearanceAnimation["ZOOM_IN"] = "zoomIn";
    AppearanceAnimation["ZOOM_IN_ROTATE"] = "zoomInRotate";
    AppearanceAnimation["ELASTIC"] = "elastic";
    AppearanceAnimation["JELLO"] = "jello";
    AppearanceAnimation["FADE_IN"] = "fadeIn";
    AppearanceAnimation["SLIDE_IN_UP"] = "slideInUp";
    AppearanceAnimation["SLIDE_IN_DOWN"] = "slideInDown";
    AppearanceAnimation["SLIDE_IN_LEFT"] = "slideInLeft";
    AppearanceAnimation["SLIDE_IN_RIGHT"] = "slideInRight";
})(AppearanceAnimation || (AppearanceAnimation = {}));
var DisappearanceAnimation;
(function (DisappearanceAnimation) {
    DisappearanceAnimation["NONE"] = "noneOut";
    DisappearanceAnimation["FADE_OUT"] = "fadeOut";
    DisappearanceAnimation["ZOOM_OUT_WIND"] = "zoomOutWind";
    DisappearanceAnimation["BOUNCE_OUT"] = "bounceOut";
    DisappearanceAnimation["FLIP_OUT"] = "flipOutY";
    DisappearanceAnimation["ZOOM_OUT"] = "zoomOut";
    DisappearanceAnimation["ZOOM_OUT_ROTATE"] = "zoomOutRotate";
    DisappearanceAnimation["SLIDE_OUT_UP"] = "slideOutUp";
    DisappearanceAnimation["SLIDE_OUT_DOWN"] = "slideOutDown";
    DisappearanceAnimation["SLIDE_OUT_LEFT"] = "slideOutLeft";
    DisappearanceAnimation["SLIDE_OUT_RIGHT"] = "slideOutRight";
})(DisappearanceAnimation || (DisappearanceAnimation = {}));
var MotionBlockAnimation;
(function (MotionBlockAnimation) {
    MotionBlockAnimation[MotionBlockAnimation["NONE"] = 0] = "NONE";
    MotionBlockAnimation["WOBBLE"] = "wobble";
})(MotionBlockAnimation || (MotionBlockAnimation = {}));

class Sizes {
    constructor() {
        this.width = null;
        this.minWidth = null;
        this.maxWidth = null;
        this.height = null;
        this.minHeight = null;
        this.maxHeight = null;
        this.fullScreen = null;
    }
}
class dispatch {
    constructor() {
        this.title = null;
        this.message = null;
    }
}
class ButtonMaker {
    constructor(label, ID, layoutType = ButtonLayoutDisplay.PRIMARY) {
        this.label = label;
        this.ID = ID;
        this.layoutType = layoutType;
    }
}
class GlobalUserConfig {
    constructor(_GlobalUserConfig) {
        this.colorList = new ColorTypes();
        if (_GlobalUserConfig) {
            const dataControl = new DataControl();
            dataControl.copyValuesFrom(_GlobalUserConfig, this);
            const colorList = new ColorTypes();
            this.colorList = dataControl.copyValuesFrom(this.colorList, colorList);
        }
    }
}
class ColorTypes {
    constructor() {
        this.primary = null;
        this.secondary = null;
        this.success = null;
        this.info = null;
        this.warning = null;
        this.danger = null;
        this.light = null;
        this.dark = null;
        this.customOne = null;
        this.customTwo = null;
        this.customThree = null;
        this.customFour = null;
        this.customFive = null;
    }
}
class GlobalConfig {
    constructor() {
        this.displayColor = new DisplayColor();
    }
}
class DisplayColor {
    constructor() {
        this.primary = null;
        this.secondary = null;
        this.success = null;
        this.info = null;
        this.warning = null;
        this.danger = null;
        this.light = null;
        this.dark = null;
        this.customOne = null;
        this.customTwo = null;
        this.customThree = null;
        this.customFour = null;
        this.customFive = null;
    }
}
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
            this.Brighten = this.brightness(this.Base, 'brighten', 25);
            this.BrightenForShade = this.brightness(this.Base, 'brighten', 10);
            this.Darken = this.brightness(this.Base, 'darken', 20);
            this.DarkenForShade = this.brightness(this.Base, 'darken', 10);
            const luminance = Math.floor(this.luminance(this.Base) * 100);
            const darken = luminance > 50 ? 5 : luminance > 40 ? 10 : luminance > 20 ? 15 : luminance;
            const brighten = luminance > 55 ? 65 : luminance > 45 ? 60 : luminance > 20 ? 55 : luminance > 10 ? 45 : 80;
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
        if (_Action === 'brighten' && lowest.val === 255) {
            return _Rgb;
        }
        if (_Action === 'darken' && highest.val === 0) {
            return _Rgb;
        }
        const amount = (_Percentage / 100) * 255;
        let returnList = [];
        if (_Action === 'brighten') {
            returnList[lowest.index] = Math.round(lowest.val + Math.min(255 - lowest.val, amount));
            const increaseFraction = (returnList[lowest.index] - lowest.val) / (255 - lowest.val);
            returnList[middle.index] = middle.val + (255 - middle.val) * increaseFraction;
            returnList[highest.index] = highest.val + (255 - highest.val) * increaseFraction;
        }
        if (_Action === 'darken') {
            returnList[highest.index] = highest.val - Math.min(highest.val, amount);
            const decreaseFraction = (highest.val - returnList[highest.index]) / highest.val;
            returnList[middle.index] = middle.val - middle.val * decreaseFraction;
            returnList[lowest.index] = lowest.val - lowest.val * decreaseFraction;
        }
        returnList = returnList.map(item => Math.round(item));
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
        const rgbArrayWithoutAlpha = _RgbArray.length > 3 ? rgbArrayCopy.reverse().slice(1).reverse() : _RgbArray;
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
        const middle = {
            val: rgbArrayWithoutAlpha[middleIndex],
            index: middleIndex
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
        return CSSDeclaration.color ? CSSDeclaration.color : null;
    }
    getRGBArray(_Rgb) {
        return _Rgb
            .replace(/^(rgb|rgba)\(/, '')
            .replace(/\)$/, '')
            .replace(/\s/g, '')
            .split(',')
            .map(x => +x);
    }
    luminance(_Rgb) {
        const rgbIntArray = this.getRGBArray(_Rgb);
        const W3algorithm = rgbIntArray.map(item => {
            item /= 255;
            return item <= 0.03928 ? item / 12.92 : Math.pow((item + 0.055) / 1.055, 2.4);
        });
        return W3algorithm[0] * 0.2126 + W3algorithm[1] * 0.7152 + W3algorithm[2] * 0.0722;
    }
    transparentize(_Rgb, _Percentage) {
        const baseArray = this.Base.replace(/^(rgb|rgba)\(/, '')
            .replace(/\)$/, '')
            .replace(/\s/g, '')
            .split(',')
            .map(x => +x);
        if (baseArray.length > 3) {
            baseArray.pop();
        }
        const amount = (100 - _Percentage) / 100;
        baseArray.push(amount);
        return `rgb(${baseArray.join()})`;
    }
}
class DataControl {
    copyValuesFrom(_Data, _DestinationObject) {
        if (typeof _Data !== 'object') {
            return _DestinationObject;
        }
        const dataKeys = Object.keys(_Data);
        const destinationObjectKeys = Object.keys(_DestinationObject);
        dataKeys.forEach(key => {
            if (destinationObjectKeys.find(tKey => tKey === key || tKey === '_' + key)) {
                if (key.includes('Date')) {
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

class ServiceLocator {
}

class ConfirmBoxConfigService {
    constructor(userConfig = {}) {
        this.userConfig = userConfig;
        this.authorConfig = new ConfirmBoxSettings();
        this.productionConfig = new ConfirmBoxSettings();
        const userConfigBase = new ConfirmBoxSettings();
        const dataControl = new DataControl();
        dataControl.copyValuesFrom(userConfig.confirmBoxCoreConfig, userConfigBase.confirmBoxCoreConfig);
        userConfig.confirmBoxCoreConfig = userConfigBase.confirmBoxCoreConfig;
        this.authorConfig.confirmBoxCoreConfig.width = 'auto';
        this.authorConfig.confirmBoxCoreConfig.height = 'auto';
        this.authorConfig.confirmBoxCoreConfig.buttonPosition = 'center';
        this.authorConfig.confirmBoxCoreConfig.confirmLabel = 'Confirm';
        this.authorConfig.confirmBoxCoreConfig.declineLabel = 'Decline';
        this.authorConfig.confirmBoxCoreConfig.disableIcon = false;
        this.authorConfig.confirmBoxCoreConfig.allowHtmlMessage = false;
        this.authorConfig.confirmBoxCoreConfig.layoutType = DialogLayoutDisplay.NONE;
        this.authorConfig.confirmBoxCoreConfig.animationIn = AppearanceAnimation.ZOOM_IN;
        this.authorConfig.confirmBoxCoreConfig.animationOut = DisappearanceAnimation.ZOOM_OUT;
        this.authorConfig.confirmBoxCoreConfig.customStyles = new ConfirmBoxCustomStyles();
        this.authorConfig.confirmBoxCoreConfig.iconStyleClass = null;
        dataControl.copyValuesFrom(this.authorConfig.confirmBoxCoreConfig, this.productionConfig.confirmBoxCoreConfig);
        dataControl.copyValuesFrom(userConfig.confirmBoxCoreConfig, this.productionConfig.confirmBoxCoreConfig);
    }
}
ConfirmBoxConfigService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ConfirmBoxConfigService, deps: [{ token: 'confirmBoxConfig' }], target: i0.ɵɵFactoryTarget.Injectable });
ConfirmBoxConfigService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ConfirmBoxConfigService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ConfirmBoxConfigService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () {
        return [{ type: undefined, decorators: [{
                        type: Inject,
                        args: ['confirmBoxConfig']
                    }] }];
    } });

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

const bounceIn = [
    style({
        transform: 'scale3d(0.7, 0.7, 0.7)',
        offset: 0,
        opacity: 0
    }),
    style({
        transform: 'scale3d(1.3, 1.3, 1.3)',
        offset: 0.3,
        opacity: 0.3
    }),
    style({
        transform: 'scale3d(0.95, 0.95, 0.95)',
        offset: 0.6,
        opacity: 1
    }),
    style({
        transform: 'scale3d(1.03, 1.03, 1.03)',
        opacity: 1,
        offset: 0.8
    }),
    style({
        transform: 'scale3d(0.97, 0.97, 0.97)',
        offset: 0.9
    }),
    style({
        transform: 'scale3d(1, 1, 1)',
        offset: 1,
        opacity: 1
    })
];
const swing = [
    style({ offset: 0, opacity: 0 }),
    style({ transform: 'rotate3d(0, 0, 1, 10deg)', offset: 0.2 }),
    style({ transform: 'rotate3d(0, 0, 1, -7deg)', offset: 0.3, opacity: 1 }),
    style({ transform: 'rotate3d(0, 0, 1, 3deg)', offset: 0.55 }),
    style({ transform: 'rotate3d(0, 0, 1, -3deg)', offset: 0.8 }),
    style({ transform: 'none', offset: 1 })
];
const zoomIn = [
    style({
        transform: 'scale3d(0.3, 0.3, 0.3)',
        offset: 0
    }),
    style({
        offset: 0.1,
        opacity: 1
    }),
    style({
        transform: 'scale3d(1, 1, 1)',
        offset: 1
    })
];
const zoomInRotate = [
    style({
        transform: 'scale(0.1) rotate(30deg)',
        offset: 0,
        opacity: 0
    }),
    style({
        transform: 'rotate(-10deg)',
        offset: 0.5,
        opacity: 1
    }),
    style({
        transform: 'rotate(3deg)',
        offset: 0.7
    }),
    style({
        transform: 'scale(1)',
        offset: 1
    })
];
const elastic = [
    style({ transform: 'scale3d(1, 1, 1)', offset: 0, opacity: 0 }),
    style({ transform: 'scale3d(1.25, 0.75, 1)', offset: 0.3 }),
    style({ transform: 'scale3d(0.75, 1.25, 1)', offset: 0.4, opacity: 1 }),
    style({ transform: 'scale3d(1.15, 0.85, 1)', offset: 0.5 }),
    style({ transform: 'scale3d(0.95, 1.05, 1)', offset: 0.6 }),
    style({ transform: 'scale3d(1.05, 0.95, 1)', offset: 0.7 }),
    style({ transform: 'scale3d(1, 1, 1)', offset: 1 })
];
const jello = [
    style({ offset: 0, opacity: 0 }),
    style({ transform: 'skewX(-12.5deg) skewY(-12.5deg)', offset: 0.111 }),
    style({ transform: 'skewX(6.25deg) skewY(6.25deg)', offset: 0.222 }),
    style({ transform: 'skewX(-3.125deg) skewY(-3.125deg)', offset: 0.333, opacity: 1 }),
    style({ transform: 'skewX(1.5625deg) skewY(1.5625deg)', offset: 0.444 }),
    style({ transform: 'skewX(-0.78125deg) skewY(-0.78125deg)', offset: 0.555 }),
    style({ transform: 'skewX(0.390625deg) skewY(0.390625deg)', offset: 0.666 }),
    style({ transform: 'skewX(0.390625deg) skewY(0.390625deg)', offset: 0.777 }),
    style({
        transform: 'skewX(-0.1953125deg) skewY(-0.1953125deg)',
        offset: 0.888
    }),
    style({ transform: 'none', offset: 1 })
];
const fadeIn = [style({ offset: 0, opacity: 0 }), style({ offset: 1, opacity: 1 })];
const slideInUp = [
    style({ offset: 0, opacity: 0, transform: 'translate3d(0, 100%, 0)' }),
    style({ offset: 1, opacity: 1, transform: 'translate3d(0, 0, 0)' })
];
const slideInDown = [
    style({ offset: 0, opacity: 0, transform: 'translate3d(0, -100%, 0)' }),
    style({ offset: 1, opacity: 1, transform: 'translate3d(0, 0, 0)' })
];
const slideInLeft = [
    style({ offset: 0, opacity: 0, transform: 'translate3d(-100%, 0, 0)' }),
    style({ offset: 1, opacity: 1, transform: 'translate3d(0, 0, 0)' })
];
const slideInRight = [
    style({ offset: 0, opacity: 0, transform: 'translate3d(100%, 0, 0)' }),
    style({ offset: 1, opacity: 1, transform: 'translate3d(0, 0, 0)' })
];
const fadeOut = [style({ offset: 0, opacity: 1 }), style({ offset: 1, opacity: 0 })];
const zoomOutWind = [
    style({
        transform: 'scale3d(.475, .475, .475) translate3d(-42px, 0, 0)',
        offset: 0.4
    }),
    style({
        transform: 'scale(.1) translate3d(400px, 0, 0)',
        'transform-origin': 'top center',
        offset: 1,
        opacity: 0
    })
];
const bounceOut = [
    style({
        transform: 'scale3d(1.3, 1.3, 1.3)',
        offset: 0.3
    }),
    style({
        transform: 'scale3d(0.9, 0.9, 0.9)',
        offset: 0.5
    }),
    style({
        transform: 'scale3d(0.3, 0.3, 0.3)',
        opacity: 0,
        offset: 1
    })
];
const flipOutY = [
    style({ transform: 'perspective(400px)', offset: 0 }),
    style({
        transform: 'perspective(400px) rotate3d(0, 1, 0, -15deg)',
        opacity: 1,
        offset: 0.33
    }),
    style({
        transform: 'perspective(400px) rotate3d(0, 1, 0, 90deg)',
        opacity: 0,
        offset: 0.9
    })
];
const zoomOut = [
    style({
        opacity: 1,
        offset: 0
    }),
    style({
        offset: 0.5,
        transform: 'scale3d(0.3, 0.3, 0.3)',
        opacity: 0
    }),
    style({
        offset: 1,
        opacity: 0
    })
];
const zoomOutRotate = [
    style({
        opacity: 1,
        offset: 0
    }),
    style({
        offset: 0.9,
        transform: 'rotate(200deg) scale(0.1)',
        opacity: 0
    })
];
const slideOutUp = [
    style({ transform: 'translate3d(0, 0, 0)', offset: 0 }),
    style({ transform: 'translate3d(0, -100%, 0)', opacity: 0, offset: 1 })
];
const slideOutDown = [
    style({ transform: 'translate3d(0, 0, 0)', offset: 0 }),
    style({ transform: 'translate3d(0, 100%, 0)', opacity: 0, offset: 1 })
];
const slideOutLeft = [
    style({ transform: 'translate3d(0, 0, 0)', offset: 0 }),
    style({ transform: 'translate3d(-100%, 0, 0)', opacity: 0, offset: 1 })
];
const slideOutRight = [
    style({ transform: 'translate3d(0, 0, 0)', offset: 0 }),
    style({ transform: 'translate3d(100%, 0, 0)', opacity: 0, offset: 1 })
];
const wobble = [
    style({
        transform: 'translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg)',
        offset: 0.15
    }),
    style({
        transform: 'translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg)',
        offset: 0.3
    }),
    style({
        transform: 'translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg)',
        offset: 0.45
    }),
    style({
        transform: 'translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg)',
        offset: 0.6
    }),
    style({
        transform: 'translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg)',
        offset: 0.75
    }),
    style({ transform: 'none', offset: 1 })
];

function boxAnimations() {
    return trigger('boxAnimations', [
        state('reset', style({ opacity: 1 })),
        state('noneIn', style({ opacity: 1 })),
        state('bounceIn', style({ opacity: 1 })),
        state('swing', style({ opacity: 1 })),
        state('zoomIn', style({ opacity: 1 })),
        state('zoomInRotate', style({ opacity: 1 })),
        state('elastic', style({ opacity: 1 })),
        state('jello', style({ opacity: 1 })),
        state('fadeIn', style({ opacity: 1 })),
        state('slideInUp', style({ opacity: 1 })),
        state('slideInDown', style({ opacity: 1 })),
        state('slideInLeft', style({ opacity: 1 })),
        state('slideInRight', style({ opacity: 1 })),
        transition('* => noneIn', animate('10ms', keyframes(fadeIn))),
        transition('* => bounceIn', animate('1000ms cubic-bezier(0.215, 0.61, 0.355, 1)', keyframes(bounceIn))),
        transition('* => swing', animate('800ms', keyframes(swing))),
        transition('* => zoomIn', animate('400ms ease-in', keyframes(zoomIn))),
        transition('* => zoomInRotate', animate('800ms ease-in', keyframes(zoomInRotate))),
        transition('* => elastic', animate('1000ms', keyframes(elastic))),
        transition('* => jello', animate(1000, keyframes(jello))),
        transition('* => fadeIn', animate('400ms ease-in', keyframes(fadeIn))),
        transition('* => slideInUp', animate('400ms ease-in', keyframes(slideInUp))),
        transition('* => slideInDown', animate('400ms ease-in', keyframes(slideInDown))),
        transition('* => slideInLeft', animate('400ms ease-in', keyframes(slideInLeft))),
        transition('* => slideInRight', animate('400ms ease-in', keyframes(slideInRight))),
        transition('* => reset', style({ opacity: 1 })),
        state('noneOut', style({ opacity: 0 })),
        state('fadeOut', style({ opacity: 0 })),
        state('zoomOutWind', style({ opacity: 0 })),
        state('bounceOut', style({ opacity: 0 })),
        state('flipOutY', style({ opacity: 0 })),
        state('zoomOut', style({ opacity: 0 })),
        state('zoomOutRotate', style({ opacity: 0 })),
        state('slideOutUp', style({ opacity: 0 })),
        state('slideOutDown', style({ opacity: 0 })),
        state('slideOutLeft', style({ opacity: 0 })),
        state('slideOutRight', style({ opacity: 0 })),
        transition('* => noneOut', animate('100ms ease-out', keyframes(fadeOut))),
        transition('* => fadeOut', animate('300ms ease-out', keyframes(fadeOut))),
        transition('* => zoomOutWind', animate('400ms ease-out', keyframes(zoomOutWind))),
        transition('* => bounceOut', animate('400ms ease-out', keyframes(bounceOut))),
        transition('* => flipOutY', animate('400ms ease-out', keyframes(flipOutY))),
        transition('* => zoomOut', animate('400ms ease-out', keyframes(zoomOut))),
        transition('* => zoomOutRotate', animate('400ms ease-out', keyframes(zoomOutRotate))),
        transition('* => slideOutUp', animate('300ms ease-out', keyframes(slideOutUp))),
        transition('* => slideOutDown', animate('300ms ease-out', keyframes(slideOutDown))),
        transition('* => slideOutLeft', animate('300ms ease-out', keyframes(slideOutLeft))),
        transition('* => slideOutRight', animate('300ms ease-out', keyframes(slideOutRight))),
        transition('* => wobble', animate(1000, keyframes(wobble)))
    ]);
}

function fadeInOut() {
    return trigger('fadeInOut', [
        state('open', style({
            opacity: 1
        })),
        state('close-fast', style({
            opacity: 0
        })),
        state('close-instant', style({
            opacity: 0
        })),
        transition('* => close-fast', [query('*', [animateChild()]), animate('{{closeDelay}}')]),
        transition('* => open', [animate(100)]),
        transition('* => close-instant', [animate(0)])
    ]);
}

class LayoutHelperService {
    getIconClasses(layoutType, iconStyleClass) {
        let returnString = '';
        if (iconStyleClass) {
            returnString += iconStyleClass;
            return returnString;
        }
        switch (layoutType) {
            case DialogLayoutDisplay.SUCCESS: {
                returnString += 'ap-icon-success icon-check-circle';
                break;
            }
            case DialogLayoutDisplay.INFO: {
                returnString += 'ap-icon-info icon-info-circle';
                break;
            }
            case DialogLayoutDisplay.WARNING: {
                returnString += 'ap-icon-warning icon-warning';
                break;
            }
            case DialogLayoutDisplay.DANGER: {
                returnString += 'ap-icon-danger icon-times-circle';
                break;
            }
        }
        return returnString;
    }
    getButtonClasses(layoutType, perm = '', type) {
        let returnString = perm + ' ';
        if (type === 'auto-button' && layoutType === DialogLayoutDisplay.NONE) {
            layoutType = ButtonLayoutDisplay.PRIMARY;
        }
        switch (layoutType) {
            case ButtonLayoutDisplay.SUCCESS: {
                returnString += 'ed-btn-success';
                break;
            }
            case ButtonLayoutDisplay.INFO: {
                returnString += 'ed-btn-info';
                break;
            }
            case ButtonLayoutDisplay.WARNING: {
                returnString += 'ed-btn-warning';
                break;
            }
            case ButtonLayoutDisplay.DANGER: {
                returnString += 'ed-btn-danger';
                break;
            }
            case ButtonLayoutDisplay.DARK: {
                returnString += 'ed-btn-dark';
                break;
            }
            case ButtonLayoutDisplay.LIGHT: {
                returnString += 'ed-btn-light';
                break;
            }
            case ButtonLayoutDisplay.PRIMARY: {
                returnString += 'ed-btn-primary';
                break;
            }
            case ButtonLayoutDisplay.SECONDARY: {
                returnString += 'ed-btn-secondary';
                break;
            }
            case ButtonLayoutDisplay.LINK: {
                returnString += 'ed-btn-link';
                break;
            }
            case ButtonLayoutDisplay.CUSTOM_ONE: {
                returnString += 'ed-btn-customone';
                break;
            }
            case ButtonLayoutDisplay.CUSTOM_TWO: {
                returnString += 'ed-btn-customtwo';
                break;
            }
            case ButtonLayoutDisplay.CUSTOM_THREE: {
                returnString += 'ed-btn-customthree';
                break;
            }
            case ButtonLayoutDisplay.CUSTOM_FOUR: {
                returnString += 'ed-btn-customfour';
                break;
            }
            case ButtonLayoutDisplay.CUSTOM_FIVE: {
                returnString += 'ed-btn-customfive';
                break;
            }
        }
        return returnString;
    }
    getBoxClasses(layoutType, perm = '') {
        let returnString = perm + ' ';
        switch (layoutType) {
            case DialogLayoutDisplay.NONE: {
                returnString += 'standard-dialog';
                break;
            }
            case DialogLayoutDisplay.SUCCESS: {
                returnString += 'success-dialog';
                break;
            }
            case DialogLayoutDisplay.INFO: {
                returnString += 'info-dialog';
                break;
            }
            case DialogLayoutDisplay.WARNING: {
                returnString += 'warning-dialog';
                break;
            }
            case DialogLayoutDisplay.DANGER: {
                returnString += 'danger-dialog';
                break;
            }
            case DialogLayoutDisplay.CUSTOM_ONE: {
                returnString += 'customone-dialog';
                break;
            }
            case DialogLayoutDisplay.CUSTOM_TWO: {
                returnString += 'customtwo-dialog';
                break;
            }
            case DialogLayoutDisplay.CUSTOM_THREE: {
                returnString += 'customthree-dialog';
                break;
            }
            case DialogLayoutDisplay.CUSTOM_FOUR: {
                returnString += 'customfour-dialog';
                break;
            }
            case DialogLayoutDisplay.CUSTOM_FIVE: {
                returnString += 'customfive-dialog';
                break;
            }
        }
        return returnString;
    }
}
LayoutHelperService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: LayoutHelperService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
LayoutHelperService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: LayoutHelperService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: LayoutHelperService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class ConfirmBoxWrapperComponent {
    constructor(confirmBoxBelonging, cd, layoutHelper) {
        this.confirmBoxBelonging = confirmBoxBelonging;
        this.cd = cd;
        this.layoutHelper = layoutHelper;
        this.fadeInOutAnimation = 'open';
        this.appearanceAnimation = AppearanceAnimation;
        this.disappearanceAnimation = DisappearanceAnimation;
        setTimeout(() => {
            this.boxAnimation = this.confirmBoxBelonging.confirmBoxCoreConfig.animationIn;
        }, 1);
    }
    ngAfterViewInit() {
        this.setResponse(false);
        this.cd.detectChanges();
        this.setCustomStyles();
    }
    setResponse(_IsSuccess, _ClickedButtonID) {
        const response = new ConfirmBoxDefaultResponse();
        if (_ClickedButtonID) {
            response.clickedButtonID = _ClickedButtonID;
        }
        response.setSuccess(_IsSuccess);
        response.setBelonging(this.confirmBoxBelonging);
        this.confirmBoxBelonging.eventsController.setDefaultResponse(response);
    }
    onOverlayClicked(evt) {
    }
    onCustomButton(_Button) {
        this.confirmBoxBelonging.eventsController.onButtonClick(_Button);
        this.setResponse(true, _Button.ID);
        this.confirmBoxBelonging.eventsController.close();
    }
    onButtonClick(_Type) {
        let buttonID;
        if (_Type === 'confirm') {
            buttonID = this.confirmBoxBelonging.confirmBoxCoreConfig.confirmLabel.toLowerCase();
        }
        else if (_Type === 'decline') {
            buttonID = this.confirmBoxBelonging.confirmBoxCoreConfig.declineLabel.toLowerCase();
        }
        this.setResponse(_Type === 'confirm', buttonID);
        this.confirmBoxBelonging.eventsController.close();
    }
    closeParent$() {
        this.boxAnimation = this.confirmBoxBelonging.confirmBoxCoreConfig.animationOut;
        const closeDuration = this.confirmBoxBelonging.confirmBoxCoreConfig.animationOut ? 800 : 200;
        this.fadeInOutAnimation = 'close-fast';
        return new Observable((observer) => {
            observer.next('');
            observer.complete();
        }).pipe(delay(closeDuration));
    }
    setCustomStyles() {
        if (this.confirmBoxBelonging.confirmBoxCoreConfig.customStyles.wrapperCSS && this.elConfirmBoxWrapper) {
            this.elConfirmBoxWrapper.nativeElement.style.cssText += this.confirmBoxBelonging.confirmBoxCoreConfig.customStyles.wrapperCSS;
        }
        if (this.confirmBoxBelonging.confirmBoxCoreConfig.customStyles.textCSS && this.elTextWrapper) {
            this.elTextWrapper.nativeElement.style.cssText += this.confirmBoxBelonging.confirmBoxCoreConfig.customStyles.textCSS;
        }
        if (this.confirmBoxBelonging.confirmBoxCoreConfig.customStyles.titleCSS && this.elTitleWrapper) {
            this.elTitleWrapper.nativeElement.style.cssText += this.confirmBoxBelonging.confirmBoxCoreConfig.customStyles.titleCSS;
        }
        if (this.confirmBoxBelonging.confirmBoxCoreConfig.customStyles.buttonSectionCSS && this.elButtonWrapper) {
            this.elButtonWrapper.nativeElement.style.cssText += this.confirmBoxBelonging.confirmBoxCoreConfig.customStyles.buttonSectionCSS;
        }
        if (this.confirmBoxBelonging.confirmBoxCoreConfig.customStyles.buttonCSS && this.elButton) {
            this.elButton.forEach(el => {
                el.nativeElement.style.cssText += this.confirmBoxBelonging.confirmBoxCoreConfig.customStyles.buttonCSS;
            });
        }
    }
    getIconClasses() {
        return ('icon-type-confirm-box  ' +
            this.layoutHelper.getIconClasses(this.confirmBoxBelonging.confirmBoxCoreConfig.layoutType, this.confirmBoxBelonging.confirmBoxCoreConfig.iconStyleClass));
    }
    getButtonClasses(layoutType) {
        return this.layoutHelper.getButtonClasses(layoutType);
    }
}
ConfirmBoxWrapperComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ConfirmBoxWrapperComponent, deps: [{ token: 'confirmBoxBelonging' }, { token: i0.ChangeDetectorRef }, { token: LayoutHelperService }], target: i0.ɵɵFactoryTarget.Component });
ConfirmBoxWrapperComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: ConfirmBoxWrapperComponent, selector: "app-confirm-box-wrapper", providers: [LayoutHelperService], viewQueries: [{ propertyName: "elConfirmBoxWrapper", first: true, predicate: ["elConfirmBoxWrapper"], descendants: true }, { propertyName: "elTextWrapper", first: true, predicate: ["elTextWrapper"], descendants: true }, { propertyName: "elTitleWrapper", first: true, predicate: ["elTitleWrapper"], descendants: true }, { propertyName: "elButtonWrapper", first: true, predicate: ["elButtonWrapper"], descendants: true }, { propertyName: "elButton", predicate: ["elButton"], descendants: true }], ngImport: i0, template: "<div\n  class=\"ngx-awesome-popup-overlay confirm-box-overlay\"\n  (dblclick)=\"onOverlayClicked($event)\"\n  [@fadeInOut]=\"{\n    value: fadeInOutAnimation,\n    params: {\n      closeDelay: confirmBoxBelonging.confirmBoxCoreConfig.animationOut === disappearanceAnimation.NONE ? '200ms' : '300ms'\n    }\n  }\">\n  <div\n    [@.disabled]=\"\n      confirmBoxBelonging.confirmBoxCoreConfig.animationIn === appearanceAnimation.NONE &&\n      confirmBoxBelonging.confirmBoxCoreConfig.animationOut === disappearanceAnimation.NONE\n    \"\n    [@boxAnimations]=\"boxAnimation\"\n    #elConfirmBoxWrapper\n    [className]=\"layoutHelper.getBoxClasses(confirmBoxBelonging.confirmBoxCoreConfig.layoutType, 'evolve-confirm-box')\"\n    [ngStyle]=\"{\n      width: confirmBoxBelonging.confirmBoxCoreConfig.width,\n      height: confirmBoxBelonging.confirmBoxCoreConfig.height,\n      opacity: confirmBoxBelonging.confirmBoxCoreConfig.animationIn === appearanceAnimation.NONE ? 1 : 0\n    }\">\n    <div class=\"confirm-box-title-content\" #elTitleWrapper *ngIf=\"confirmBoxBelonging.dispatch.title\">\n      <div class=\"dont-break-out\">\n        <div class=\"text-wrapper dont-break-out\">\n          <div class=\"confirm-box-title-text\">\n            {{ confirmBoxBelonging.dispatch.title }}\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div\n      class=\"content-holder\"\n      #elTextWrapper\n      [ngClass]=\"confirmBoxBelonging.dispatch.title ? '' : 'without-title'\"\n      *ngIf=\"confirmBoxBelonging.dispatch.message\">\n      <div class=\"icon-section\" *ngIf=\"!confirmBoxBelonging.confirmBoxCoreConfig.disableIcon\">\n        <span [className]=\"getIconClasses()\"></span>\n      </div>\n      <div class=\"text-wrapper-section confirm-box-inner-content\">\n        <div class=\"dont-break-out\">\n          <div class=\"text-wrapper\" [innerHTML]=\"confirmBoxBelonging.dispatch.message\"></div>\n        </div>\n      </div>\n    </div>\n    <div class=\"button-holder\" #elButtonWrapper>\n      <div\n        class=\"button-section\"\n        *ngIf=\"confirmBoxBelonging.buttons.length\"\n        [ngStyle]=\"{\n          'text-align': confirmBoxBelonging.confirmBoxCoreConfig.buttonPosition\n        }\">\n        <button\n          #elButton\n          *ngFor=\"let button of confirmBoxBelonging.buttons\"\n          (click)=\"onCustomButton(button)\"\n          [className]=\"layoutHelper.getButtonClasses(button.layoutType, 'ed-btn ed-btn-md')\">\n          {{ button.label }}\n        </button>\n      </div>\n      <div\n        class=\"button-section\"\n        *ngIf=\"!confirmBoxBelonging.buttons.length\"\n        [ngStyle]=\"{\n          'text-align': confirmBoxBelonging.confirmBoxCoreConfig.buttonPosition\n        }\">\n        <button\n          class=\"ed-btn ed-btn-md\"\n          #elButton\n          (click)=\"onButtonClick('confirm')\"\n          [className]=\"\n            layoutHelper.getButtonClasses(confirmBoxBelonging.confirmBoxCoreConfig.layoutType, 'ed-btn ed-btn-md', 'auto-button')\n          \">\n          {{ confirmBoxBelonging.confirmBoxCoreConfig.confirmLabel }}\n        </button>\n        <button\n          class=\"ed-btn ed-btn-md ed-btn-secondary\"\n          #elButton\n          (click)=\"onButtonClick('decline')\"\n          *ngIf=\"confirmBoxBelonging.confirmBoxCoreConfig.declineLabel\">\n          {{ confirmBoxBelonging.confirmBoxCoreConfig.declineLabel }}\n        </button>\n      </div>\n    </div>\n  </div>\n</div>\n", directives: [{ type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], animations: [fadeInOut(), boxAnimations()] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ConfirmBoxWrapperComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-confirm-box-wrapper', animations: [fadeInOut(), boxAnimations()], providers: [LayoutHelperService], template: "<div\n  class=\"ngx-awesome-popup-overlay confirm-box-overlay\"\n  (dblclick)=\"onOverlayClicked($event)\"\n  [@fadeInOut]=\"{\n    value: fadeInOutAnimation,\n    params: {\n      closeDelay: confirmBoxBelonging.confirmBoxCoreConfig.animationOut === disappearanceAnimation.NONE ? '200ms' : '300ms'\n    }\n  }\">\n  <div\n    [@.disabled]=\"\n      confirmBoxBelonging.confirmBoxCoreConfig.animationIn === appearanceAnimation.NONE &&\n      confirmBoxBelonging.confirmBoxCoreConfig.animationOut === disappearanceAnimation.NONE\n    \"\n    [@boxAnimations]=\"boxAnimation\"\n    #elConfirmBoxWrapper\n    [className]=\"layoutHelper.getBoxClasses(confirmBoxBelonging.confirmBoxCoreConfig.layoutType, 'evolve-confirm-box')\"\n    [ngStyle]=\"{\n      width: confirmBoxBelonging.confirmBoxCoreConfig.width,\n      height: confirmBoxBelonging.confirmBoxCoreConfig.height,\n      opacity: confirmBoxBelonging.confirmBoxCoreConfig.animationIn === appearanceAnimation.NONE ? 1 : 0\n    }\">\n    <div class=\"confirm-box-title-content\" #elTitleWrapper *ngIf=\"confirmBoxBelonging.dispatch.title\">\n      <div class=\"dont-break-out\">\n        <div class=\"text-wrapper dont-break-out\">\n          <div class=\"confirm-box-title-text\">\n            {{ confirmBoxBelonging.dispatch.title }}\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div\n      class=\"content-holder\"\n      #elTextWrapper\n      [ngClass]=\"confirmBoxBelonging.dispatch.title ? '' : 'without-title'\"\n      *ngIf=\"confirmBoxBelonging.dispatch.message\">\n      <div class=\"icon-section\" *ngIf=\"!confirmBoxBelonging.confirmBoxCoreConfig.disableIcon\">\n        <span [className]=\"getIconClasses()\"></span>\n      </div>\n      <div class=\"text-wrapper-section confirm-box-inner-content\">\n        <div class=\"dont-break-out\">\n          <div class=\"text-wrapper\" [innerHTML]=\"confirmBoxBelonging.dispatch.message\"></div>\n        </div>\n      </div>\n    </div>\n    <div class=\"button-holder\" #elButtonWrapper>\n      <div\n        class=\"button-section\"\n        *ngIf=\"confirmBoxBelonging.buttons.length\"\n        [ngStyle]=\"{\n          'text-align': confirmBoxBelonging.confirmBoxCoreConfig.buttonPosition\n        }\">\n        <button\n          #elButton\n          *ngFor=\"let button of confirmBoxBelonging.buttons\"\n          (click)=\"onCustomButton(button)\"\n          [className]=\"layoutHelper.getButtonClasses(button.layoutType, 'ed-btn ed-btn-md')\">\n          {{ button.label }}\n        </button>\n      </div>\n      <div\n        class=\"button-section\"\n        *ngIf=\"!confirmBoxBelonging.buttons.length\"\n        [ngStyle]=\"{\n          'text-align': confirmBoxBelonging.confirmBoxCoreConfig.buttonPosition\n        }\">\n        <button\n          class=\"ed-btn ed-btn-md\"\n          #elButton\n          (click)=\"onButtonClick('confirm')\"\n          [className]=\"\n            layoutHelper.getButtonClasses(confirmBoxBelonging.confirmBoxCoreConfig.layoutType, 'ed-btn ed-btn-md', 'auto-button')\n          \">\n          {{ confirmBoxBelonging.confirmBoxCoreConfig.confirmLabel }}\n        </button>\n        <button\n          class=\"ed-btn ed-btn-md ed-btn-secondary\"\n          #elButton\n          (click)=\"onButtonClick('decline')\"\n          *ngIf=\"confirmBoxBelonging.confirmBoxCoreConfig.declineLabel\">\n          {{ confirmBoxBelonging.confirmBoxCoreConfig.declineLabel }}\n        </button>\n      </div>\n    </div>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () {
        return [{ type: ConfirmBoxBelonging, decorators: [{
                        type: Inject,
                        args: ['confirmBoxBelonging']
                    }] }, { type: i0.ChangeDetectorRef }, { type: LayoutHelperService }];
    }, propDecorators: { elConfirmBoxWrapper: [{
                type: ViewChild,
                args: ['elConfirmBoxWrapper']
            }], elTextWrapper: [{
                type: ViewChild,
                args: ['elTextWrapper']
            }], elTitleWrapper: [{
                type: ViewChild,
                args: ['elTitleWrapper']
            }], elButtonWrapper: [{
                type: ViewChild,
                args: ['elButtonWrapper']
            }], elButton: [{
                type: ViewChildren,
                args: ['elButton']
            }] } });

class ConfirmBoxService {
    constructor(componentFactoryResolver, injector, appRef) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.injector = injector;
        this.appRef = appRef;
        this.confirmBoxComponentRefList = [];
    }
    open(_ConfirmBoxBelonging) {
        const dialogController = _ConfirmBoxBelonging.eventsController;
        const componentRef = this.getComponentRef(dialogController, _ConfirmBoxBelonging);
        this.confirmBoxComponentRefList.push(componentRef);
        componentRef.instance.confirmBoxBelonging = _ConfirmBoxBelonging;
        this.appendToBodyParentComponent(componentRef);
        this.listeners(dialogController);
        return dialogController;
    }
    getComponentRef(_eventsController, _ConfirmBoxBelonging) {
        let componentFactory;
        const dialogIndex = this.findDialogIndex(_ConfirmBoxBelonging.entityUniqueID);
        if (dialogIndex === -1) {
            const weakMap = new WeakMap();
            weakMap.set(ConfirmBoxeventsController, _eventsController);
            componentFactory = this.componentFactoryResolver.resolveComponentFactory(ConfirmBoxWrapperComponent);
            return componentFactory.create(new DialogInjector(this.injector, weakMap));
        }
        return null;
    }
    listeners(_eventsController) {
        const closeDialogSubscription = _eventsController.afterClosed$.subscribe(response => {
            const modalIndex = this.findDialogIndex(response.confirmBoxBelonging.entityUniqueID);
            this.removeFromBodyParentComponent(modalIndex);
            closeDialogSubscription.unsubscribe();
        });
    }
    appendToBodyParentComponent(_ComponentRef) {
        this.appRef.attachView(_ComponentRef.hostView);
        const domElem = _ComponentRef.hostView.rootNodes[0];
        document.body.appendChild(domElem);
    }
    closeDialogWrapperComponent(_DialogUniqueID) {
        const modalIndex = this.findDialogIndex(_DialogUniqueID);
        this.removeFromBodyParentComponent(modalIndex);
    }
    removeFromBodyParentComponent(_DialogIndex) {
        if (_DialogIndex > -1) {
            this.confirmBoxComponentRefList[_DialogIndex].instance
                .closeParent$()
                .pipe(tap(item => {
                this.appRef.detachView(this.confirmBoxComponentRefList[_DialogIndex].hostView);
                this.confirmBoxComponentRefList[_DialogIndex].destroy();
                this.confirmBoxComponentRefList.splice(_DialogIndex, 1);
            }), take(1))
                .subscribe();
        }
    }
    findDialogIndex(_DialogUniqueID) {
        return this.confirmBoxComponentRefList.findIndex(item => {
            return _DialogUniqueID === item.instance.confirmBoxBelonging.entityUniqueID;
        });
    }
}
ConfirmBoxService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ConfirmBoxService, deps: [{ token: i0.ComponentFactoryResolver }, { token: i0.Injector }, { token: i0.ApplicationRef }], target: i0.ɵɵFactoryTarget.Injectable });
ConfirmBoxService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ConfirmBoxService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ConfirmBoxService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i0.Injector }, { type: i0.ApplicationRef }]; } });

class ConfirmBoxInitializer {
    constructor() {
        this.confirmBoxCarrier = new ConfirmBoxCarrier();
    }
    openConfirmBox$() {
        return this.confirmBoxCarrier.openConfirmBox$().pipe(map(resp => {
            const basicConfirmBoxResponse = new ConfirmBoxResponse();
            const dataControl = new DataControl();
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
class ConfirmBoxResponse extends DataControl {
    constructor() {
        super();
        this.success = null;
        this.clickedButtonID = null;
    }
    setSuccess(_IsSuccess) {
        this.success = _IsSuccess;
    }
    setClickedButtonID(_ClickedButtonID) {
        this.clickedButtonID = _ClickedButtonID;
    }
}
class ConfirmBoxeventsController {
    constructor(entityUniqueID) {
        this.entityUniqueID = entityUniqueID;
        this._afterClosed = new Subject();
        this._onButtonClick = new Subject();
        this._buttonList = new Subject();
        this.afterClosed$ = this._afterClosed.asObservable();
        this.onButtonClick$ = this._onButtonClick.asObservable();
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
class ConfirmBoxDefaultResponse extends ConfirmBoxResponse {
    constructor() {
        super();
        this.confirmBoxBelonging = null;
    }
    setBelonging(_ConfirmBoxBelonging) {
        this.confirmBoxBelonging = _ConfirmBoxBelonging;
    }
}
class ConfirmBoxCarrier {
    constructor() {
        this.confirmBoxBelonging = new ConfirmBoxBelonging();
    }
    setButtons(_Buttons) {
        if (_Buttons.length) {
            this.confirmBoxBelonging.buttons = _Buttons;
        }
    }
    setTitle(_Title) {
        this.confirmBoxBelonging.dispatch.title = _Title;
    }
    setMessage(_Message) {
        this.confirmBoxBelonging.dispatch.message = _Message;
    }
    setButtonLabels(_Confirm, _Decline) {
        this.confirmBoxBelonging.confirmBoxCoreConfig.confirmLabel = _Confirm;
        this.confirmBoxBelonging.confirmBoxCoreConfig.declineLabel = _Decline;
    }
    setConfig(_ConfirmBoxBelonging) {
        const dataControl = new DataControl();
        dataControl.copyValuesFrom(_ConfirmBoxBelonging, this.confirmBoxBelonging.confirmBoxCoreConfig);
    }
    openConfirmBox$() {
        const service = ServiceLocator.injector.get(ConfirmBoxService);
        const confirmBoxController = service.open(this.confirmBoxBelonging);
        return confirmBoxController.afterClosed$;
    }
}
class ConfirmBoxSettings {
    constructor() {
        this.buttons = [];
        this.confirmBoxCoreConfig = new confirmBoxCoreConfig();
        this.dispatch = new dispatch();
    }
}
class ConfirmBoxCustomStyles {
    constructor() {
        this.titleCSS = null;
        this.textCSS = null;
        this.buttonSectionCSS = null;
        this.buttonCSS = null;
        this.wrapperCSS = null;
    }
}
class confirmBoxCoreConfig {
    constructor() {
        this.width = null;
        this.height = null;
        this.buttonPosition = null;
        this.layoutType = null;
        this.dispatch = null;
        this.confirmLabel = null;
        this.declineLabel = null;
        this.disableIcon = null;
        this.allowHtmlMessage = null;
        this.animationIn = null;
        this.animationOut = null;
        this.customStyles = new ConfirmBoxCustomStyles();
        this.iconStyleClass = null;
    }
}
class ConfirmBoxBelonging extends ConfirmBoxSettings {
    constructor() {
        super();
        this.entityUniqueID = 'C' + Math.random().toString(36).substr(2, 9);
        this.eventsController = new ConfirmBoxeventsController(this.entityUniqueID);
        const ConfirmBoxCoreConfigurator = ServiceLocator.injector.get(ConfirmBoxConfigService);
        const baseSettings = new ConfirmBoxSettings();
        const dataControl = new DataControl();
        dataControl.copyValuesFrom(ConfirmBoxCoreConfigurator.productionConfig.confirmBoxCoreConfig, baseSettings.confirmBoxCoreConfig);
        this.confirmBoxCoreConfig = baseSettings.confirmBoxCoreConfig;
        this.buttons = ConfirmBoxCoreConfigurator.productionConfig.buttons.slice();
    }
}

class DefaultLoaderComponent {
}
DefaultLoaderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: DefaultLoaderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
DefaultLoaderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: DefaultLoaderComponent, selector: "ng-component", ngImport: i0, template: "<div class=\"box-position\">\n  <div class=\"loader-center\">\n    <div class=\"lds-ring\">\n      <div></div>\n      <div></div>\n      <div></div>\n      <div></div>\n    </div>\n  </div>\n</div>\n", styles: [".box-position{height:auto;left:50%;margin:0 auto;position:absolute;text-align:center;top:44%;transform:translate(-50%,-40%)}.box-position .loader-center{align-items:center;display:flex;justify-content:center}.box-position .loader-center .lds-ring{display:inline-block;height:80px;position:relative;width:80px}.box-position .loader-center .lds-ring div{animation:lds-ring 1.2s cubic-bezier(.5,0,.5,1) infinite;border:8px solid;border-color:#d4d4d4 transparent transparent transparent;border-radius:50%;box-sizing:border-box;display:block;height:64px;margin:8px;position:absolute;width:64px}.box-position .loader-center .lds-ring div:nth-child(1){animation-delay:-.45s}.box-position .loader-center .lds-ring div:nth-child(2){animation-delay:-.3s}.box-position .loader-center .lds-ring div:nth-child(3){animation-delay:-.15s}@keyframes lds-ring{0%{transform:rotate(0)}to{transform:rotate(360deg)}}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: DefaultLoaderComponent, decorators: [{
            type: Component,
            args: [{ template: "<div class=\"box-position\">\n  <div class=\"loader-center\">\n    <div class=\"lds-ring\">\n      <div></div>\n      <div></div>\n      <div></div>\n      <div></div>\n    </div>\n  </div>\n</div>\n", styles: [".box-position{height:auto;left:50%;margin:0 auto;position:absolute;text-align:center;top:44%;transform:translate(-50%,-40%)}.box-position .loader-center{align-items:center;display:flex;justify-content:center}.box-position .loader-center .lds-ring{display:inline-block;height:80px;position:relative;width:80px}.box-position .loader-center .lds-ring div{animation:lds-ring 1.2s cubic-bezier(.5,0,.5,1) infinite;border:8px solid;border-color:#d4d4d4 transparent transparent transparent;border-radius:50%;box-sizing:border-box;display:block;height:64px;margin:8px;position:absolute;width:64px}.box-position .loader-center .lds-ring div:nth-child(1){animation-delay:-.45s}.box-position .loader-center .lds-ring div:nth-child(2){animation-delay:-.3s}.box-position .loader-center .lds-ring div:nth-child(3){animation-delay:-.15s}@keyframes lds-ring{0%{transform:rotate(0)}to{transform:rotate(360deg)}}\n"] }]
        }] });

class DialogConfigService {
    constructor(userConfig = {}) {
        this.userConfig = userConfig;
        this.authorConfig = new DialogSettings();
        this.productionConfig = new DialogSettings();
        const userConfigBase = new DialogSettings();
        const dataControl = new DataControl();
        dataControl.copyValuesFrom(userConfig.dialogCoreConfig, userConfigBase.dialogCoreConfig);
        userConfig.dialogCoreConfig = userConfigBase.dialogCoreConfig;
        if (userConfig.dialogCoreConfig.loaderComponent !== null) {
            userConfig.dialogCoreConfig.displayLoader = userConfig.dialogCoreConfig.displayLoader === null;
        }
        this.authorConfig.dialogCoreConfig.width = 'auto';
        this.authorConfig.dialogCoreConfig.height = 'auto';
        this.authorConfig.dialogCoreConfig.hideScrollbar = false;
        this.authorConfig.dialogCoreConfig.escapeKeyClose = false;
        this.authorConfig.dialogCoreConfig.buttonPosition = 'right';
        this.authorConfig.dialogCoreConfig.displayLoader = false;
        this.authorConfig.dialogCoreConfig.fullScreen = false;
        this.authorConfig.dialogCoreConfig.layoutType = DialogLayoutDisplay.NONE;
        this.authorConfig.dialogCoreConfig.loaderComponent = DefaultLoaderComponent;
        this.authorConfig.dialogCoreConfig.animationIn = AppearanceAnimation.ZOOM_IN;
        this.authorConfig.dialogCoreConfig.animationOut = DisappearanceAnimation.ZOOM_OUT;
        this.authorConfig.dialogCoreConfig.customStyles = new DialogCustomStyles();
        dataControl.copyValuesFrom(this.authorConfig.dialogCoreConfig, this.productionConfig.dialogCoreConfig);
        dataControl.copyValuesFrom(userConfig.dialogCoreConfig, this.productionConfig.dialogCoreConfig);
    }
}
DialogConfigService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: DialogConfigService, deps: [{ token: 'dialogConfig' }], target: i0.ɵɵFactoryTarget.Injectable });
DialogConfigService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: DialogConfigService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: DialogConfigService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () {
        return [{ type: undefined, decorators: [{
                        type: Inject,
                        args: ['dialogConfig']
                    }] }];
    } });

class InsertionLoaderDirective {
    constructor(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
}
InsertionLoaderDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: InsertionLoaderDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
InsertionLoaderDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: InsertionLoaderDirective, selector: "[appInsertionLoader]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: InsertionLoaderDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[appInsertionLoader]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });

class InsertionDirective {
    constructor(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
}
InsertionDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: InsertionDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
InsertionDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: InsertionDirective, selector: "[appInsertion]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: InsertionDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[appInsertion]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });

class DialogWrapperComponent {
    constructor(dialogBelonging, componentFactoryResolver, cd, layoutHelper) {
        this.dialogBelonging = dialogBelonging;
        this.componentFactoryResolver = componentFactoryResolver;
        this.cd = cd;
        this.layoutHelper = layoutHelper;
        this.fadeInOutAnimation = 'open';
        this.showLoader = true;
        this.appearanceAnimation = AppearanceAnimation;
        this.disappearanceAnimation = DisappearanceAnimation;
        setTimeout(() => {
            this.boxAnimation = this.dialogBelonging.dialogCoreConfig.animationIn;
        }, 1);
    }
    ngAfterViewInit() {
        this.hideScrollbar();
        this.loadChildComponent(this.childComponentType);
        this.loadLoaderComponent(this.dialogBelonging.dialogCoreConfig.loaderComponent);
        this.setDefaultResponse();
        this.cd.detectChanges();
        this.setCustomStyles();
    }
    hideScrollbar() {
        if (this.dialogBelonging.dialogCoreConfig.hideScrollbar) {
            this.bodyOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
        }
    }
    revertScrollbarSettings() {
        if (this.dialogBelonging.dialogCoreConfig.hideScrollbar) {
            document.body.style.overflow = this.bodyOverflow;
        }
    }
    setDefaultResponse() {
        const dialogResponse = new DialogDefaultResponse();
        dialogResponse.setBelonging(this.dialogBelonging);
        this.dialogBelonging.eventsController.setDefaultResponse(dialogResponse);
    }
    ngOnDestroy() {
        this.revertScrollbarSettings();
        if (this.childComponentRef) {
            this.childComponentRef.destroy();
        }
        if (this.loaderComponentRef) {
            this.loaderComponentRef.destroy();
        }
    }
    hideScroller() { }
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
        this.dialogBelonging.eventsController.close();
    }
    closeParent$() {
        this.boxAnimation = this.dialogBelonging.dialogCoreConfig.animationOut;
        const closeDuration = this.dialogBelonging.dialogCoreConfig.animationOut ? 800 : 200;
        this.fadeInOutAnimation = 'close-fast';
        return new Observable((observer) => {
            observer.next('');
            observer.complete();
        }).pipe(delay(closeDuration));
    }
    onOverlayClicked(evt) {
    }
    onCustomButton(_Button) {
        this.dialogBelonging.eventsController.onButtonClick(_Button);
    }
    closeLoader() {
        this.showLoader = false;
    }
    setCustomStyles() {
        if (this.dialogBelonging.dialogCoreConfig.customStyles.wrapperCSS && this.elDialogWrapper) {
            this.elDialogWrapper.nativeElement.style.cssText += this.dialogBelonging.dialogCoreConfig.customStyles.wrapperCSS;
        }
        if (this.dialogBelonging.dialogCoreConfig.customStyles.buttonSectionCSS && this.elButtonWrapper) {
            this.elButtonWrapper.nativeElement.style.cssText += this.dialogBelonging.dialogCoreConfig.customStyles.buttonSectionCSS;
        }
        if (this.dialogBelonging.dialogCoreConfig.customStyles.buttonCSS && this.elButton) {
            this.elButton.forEach(el => {
                el.nativeElement.style.cssText += this.dialogBelonging.dialogCoreConfig.customStyles.buttonCSS;
            });
        }
    }
    keyEvent(event) {
        if (event.key === 'Escape' && this.dialogBelonging.dialogCoreConfig.escapeKeyClose) {
            this.close();
        }
    }
}
DialogWrapperComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: DialogWrapperComponent, deps: [{ token: 'dialogBelonging' }, { token: i0.ComponentFactoryResolver }, { token: i0.ChangeDetectorRef }, { token: LayoutHelperService }], target: i0.ɵɵFactoryTarget.Component });
DialogWrapperComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: DialogWrapperComponent, selector: "dialog-popup-wrapper", host: { listeners: { "window:keyup": "keyEvent($event)" } }, providers: [LayoutHelperService], viewQueries: [{ propertyName: "elDialogWrapper", first: true, predicate: ["elDialogWrapper"], descendants: true }, { propertyName: "elButtonWrapper", first: true, predicate: ["elButtonWrapper"], descendants: true }, { propertyName: "insertionPoint", first: true, predicate: InsertionDirective, descendants: true, static: true }, { propertyName: "loaderInsertionPoint", first: true, predicate: InsertionLoaderDirective, descendants: true, static: true }, { propertyName: "elButton", predicate: ["elButton"], descendants: true }], ngImport: i0, template: "<div\n  class=\"ngx-awesome-popup-overlay aw-dialog-modal\"\n  (dblclick)=\"onOverlayClicked($event)\"\n  [@fadeInOut]=\"{\n    value: fadeInOutAnimation,\n    params: {\n      closeDelay: dialogBelonging.dialogCoreConfig.animationOut === disappearanceAnimation.NONE ? '200ms' : '300ms'\n    }\n  }\">\n  <div\n    class=\"evolve-parent-dialog\"\n    [@.disabled]=\"\n      dialogBelonging.dialogCoreConfig.animationIn === appearanceAnimation.NONE &&\n      dialogBelonging.dialogCoreConfig.animationOut === disappearanceAnimation.NONE\n    \"\n    [@boxAnimations]=\"boxAnimation\"\n    #elDialogWrapper\n    [ngStyle]=\"\n      dialogBelonging.dialogCoreConfig.fullScreen && {\n        maxWidth: '100%',\n        maxHeight: '100%',\n        height: '100%',\n        width: '100%',\n        borderRadius: '0'\n      }\n    \"\n    [className]=\"layoutHelper.getBoxClasses(dialogBelonging.dialogCoreConfig.layoutType, 'evolve-parent-dialog')\">\n    <div\n      class=\"loader-holder\"\n      [ngClass]=\"\n        !dialogBelonging.dialogCoreConfig.displayLoader ? 'dialog-loader-off' : showLoader ? 'dialog-loader-active' : 'dialog-loader-gone'\n      \">\n      <div class=\"dialog-loader\">\n        <ng-template appInsertionLoader></ng-template>\n      </div>\n    </div>\n    <ng-container *ngIf=\"!dialogBelonging.dialogCoreConfig.fullScreen; else fullScreen\"></ng-container>\n    <ng-template #fullScreen></ng-template>\n    <div\n      class=\"content-holder\"\n      [ngStyle]=\"\n        dialogBelonging.dialogCoreConfig.fullScreen\n          ? {\n              width: '100%',\n              height: '100%'\n            }\n          : {\n              width: dialogBelonging.dialogCoreConfig.width,\n              minWidth: dialogBelonging.dialogCoreConfig.minWidth,\n              maxWidth: dialogBelonging.dialogCoreConfig.maxWidth,\n              height: dialogBelonging.dialogCoreConfig.height,\n              minHeight: dialogBelonging.dialogCoreConfig.minHeight,\n              maxHeight: dialogBelonging.dialogCoreConfig.maxHeight\n            }\n      \">\n      <div\n        class=\"component-content\"\n        [ngClass]=\"\n          !dialogBelonging.dialogCoreConfig.displayLoader\n            ? 'component-content-loader-off'\n            : showLoader\n            ? 'component-content-preparing'\n            : 'component-content-ready'\n        \">\n        <ng-template appInsertion></ng-template>\n      </div>\n    </div>\n\n    <div class=\"button-holder\" #elButtonWrapper>\n      <div\n        class=\"button-section\"\n        *ngIf=\"dialogBelonging.buttons.length > 0\"\n        [ngStyle]=\"{\n          'text-align': dialogBelonging.dialogCoreConfig.buttonPosition\n        }\">\n        <button\n          #elButton\n          *ngFor=\"let button of dialogBelonging.buttons\"\n          (click)=\"onCustomButton(button)\"\n          [className]=\"layoutHelper.getButtonClasses(button.layoutType, 'ed-btn ed-btn-lg')\">\n          {{ button.label }}\n        </button>\n      </div>\n    </div>\n  </div>\n</div>\n", directives: [{ type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: InsertionLoaderDirective, selector: "[appInsertionLoader]" }, { type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: InsertionDirective, selector: "[appInsertion]" }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], animations: [fadeInOut(), boxAnimations()] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: DialogWrapperComponent, decorators: [{
            type: Component,
            args: [{ selector: 'dialog-popup-wrapper', animations: [fadeInOut(), boxAnimations()], providers: [LayoutHelperService], template: "<div\n  class=\"ngx-awesome-popup-overlay aw-dialog-modal\"\n  (dblclick)=\"onOverlayClicked($event)\"\n  [@fadeInOut]=\"{\n    value: fadeInOutAnimation,\n    params: {\n      closeDelay: dialogBelonging.dialogCoreConfig.animationOut === disappearanceAnimation.NONE ? '200ms' : '300ms'\n    }\n  }\">\n  <div\n    class=\"evolve-parent-dialog\"\n    [@.disabled]=\"\n      dialogBelonging.dialogCoreConfig.animationIn === appearanceAnimation.NONE &&\n      dialogBelonging.dialogCoreConfig.animationOut === disappearanceAnimation.NONE\n    \"\n    [@boxAnimations]=\"boxAnimation\"\n    #elDialogWrapper\n    [ngStyle]=\"\n      dialogBelonging.dialogCoreConfig.fullScreen && {\n        maxWidth: '100%',\n        maxHeight: '100%',\n        height: '100%',\n        width: '100%',\n        borderRadius: '0'\n      }\n    \"\n    [className]=\"layoutHelper.getBoxClasses(dialogBelonging.dialogCoreConfig.layoutType, 'evolve-parent-dialog')\">\n    <div\n      class=\"loader-holder\"\n      [ngClass]=\"\n        !dialogBelonging.dialogCoreConfig.displayLoader ? 'dialog-loader-off' : showLoader ? 'dialog-loader-active' : 'dialog-loader-gone'\n      \">\n      <div class=\"dialog-loader\">\n        <ng-template appInsertionLoader></ng-template>\n      </div>\n    </div>\n    <ng-container *ngIf=\"!dialogBelonging.dialogCoreConfig.fullScreen; else fullScreen\"></ng-container>\n    <ng-template #fullScreen></ng-template>\n    <div\n      class=\"content-holder\"\n      [ngStyle]=\"\n        dialogBelonging.dialogCoreConfig.fullScreen\n          ? {\n              width: '100%',\n              height: '100%'\n            }\n          : {\n              width: dialogBelonging.dialogCoreConfig.width,\n              minWidth: dialogBelonging.dialogCoreConfig.minWidth,\n              maxWidth: dialogBelonging.dialogCoreConfig.maxWidth,\n              height: dialogBelonging.dialogCoreConfig.height,\n              minHeight: dialogBelonging.dialogCoreConfig.minHeight,\n              maxHeight: dialogBelonging.dialogCoreConfig.maxHeight\n            }\n      \">\n      <div\n        class=\"component-content\"\n        [ngClass]=\"\n          !dialogBelonging.dialogCoreConfig.displayLoader\n            ? 'component-content-loader-off'\n            : showLoader\n            ? 'component-content-preparing'\n            : 'component-content-ready'\n        \">\n        <ng-template appInsertion></ng-template>\n      </div>\n    </div>\n\n    <div class=\"button-holder\" #elButtonWrapper>\n      <div\n        class=\"button-section\"\n        *ngIf=\"dialogBelonging.buttons.length > 0\"\n        [ngStyle]=\"{\n          'text-align': dialogBelonging.dialogCoreConfig.buttonPosition\n        }\">\n        <button\n          #elButton\n          *ngFor=\"let button of dialogBelonging.buttons\"\n          (click)=\"onCustomButton(button)\"\n          [className]=\"layoutHelper.getButtonClasses(button.layoutType, 'ed-btn ed-btn-lg')\">\n          {{ button.label }}\n        </button>\n      </div>\n    </div>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () {
        return [{ type: DialogBelonging, decorators: [{
                        type: Inject,
                        args: ['dialogBelonging']
                    }] }, { type: i0.ComponentFactoryResolver }, { type: i0.ChangeDetectorRef }, { type: LayoutHelperService }];
    }, propDecorators: { elDialogWrapper: [{
                type: ViewChild,
                args: ['elDialogWrapper']
            }], elButtonWrapper: [{
                type: ViewChild,
                args: ['elButtonWrapper']
            }], elButton: [{
                type: ViewChildren,
                args: ['elButton']
            }], insertionPoint: [{
                type: ViewChild,
                args: [InsertionDirective, { static: true }]
            }], loaderInsertionPoint: [{
                type: ViewChild,
                args: [InsertionLoaderDirective, { static: true }]
            }], keyEvent: [{
                type: HostListener,
                args: ['window:keyup', ['$event']]
            }] } });

class DialogService {
    constructor(componentFactoryResolver, injector, appRef) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.injector = injector;
        this.appRef = appRef;
        this.dialogParentComponentRefList = [];
    }
    open(_ComponentType, _DialogBelonging) {
        const dialogController = _DialogBelonging.eventsController;
        const componentRef = this.getComponentRef(dialogController, _DialogBelonging);
        this.dialogParentComponentRefList.push(componentRef);
        componentRef.instance.dialogBelonging = _DialogBelonging;
        componentRef.instance.childComponentType = _ComponentType;
        this.appendToBodyParentComponent(componentRef);
        this.listeners(dialogController);
        return dialogController;
    }
    getComponentRef(_eventsController, _DialogBelonging) {
        let componentFactory;
        const dialogIndex = this.findDialogIndex(_DialogBelonging.entityUniqueID);
        if (dialogIndex === -1) {
            const weakMap = new WeakMap();
            weakMap.set(DialogeventsController, _eventsController);
            componentFactory = this.componentFactoryResolver.resolveComponentFactory(DialogWrapperComponent);
            return componentFactory.create(new DialogInjector(this.injector, weakMap));
        }
        return null;
    }
    listeners(_eventsController) {
        const closeDialogSubscription = _eventsController.afterClosed$.subscribe(response => {
            const modalIndex = this.findDialogIndex(response.DialogBelonging.entityUniqueID);
            this.removeFromBodyDialogWrapperComponent(modalIndex);
            closeDialogSubscription.unsubscribe();
        });
        const closeLoaderSubscription = _eventsController.afterLoader$.subscribe((_DialogUniqueID) => {
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
        this.appRef.attachView(_ComponentRef.hostView);
        const domElem = _ComponentRef.hostView.rootNodes[0];
        document.body.appendChild(domElem);
    }
    closeDialogWrapperComponent(_DialogUniqueID) {
        const modalIndex = this.findDialogIndex(_DialogUniqueID);
        this.removeFromBodyDialogWrapperComponent(modalIndex);
    }
    removeFromBodyDialogWrapperComponent(_DialogIndex) {
        if (_DialogIndex > -1) {
            this.dialogParentComponentRefList[_DialogIndex].instance
                .closeParent$()
                .pipe(tap(item => {
                this.appRef.detachView(this.dialogParentComponentRefList[_DialogIndex].hostView);
                this.dialogParentComponentRefList[_DialogIndex].destroy();
                this.dialogParentComponentRefList.splice(_DialogIndex, 1);
            }), take(1))
                .subscribe();
        }
    }
    findDialogIndex(_DialogUniqueID) {
        return this.dialogParentComponentRefList.findIndex(item => {
            return _DialogUniqueID === item.instance.dialogBelonging.entityUniqueID;
        });
    }
}
DialogService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: DialogService, deps: [{ token: i0.ComponentFactoryResolver }, { token: i0.Injector }, { token: i0.ApplicationRef }], target: i0.ɵɵFactoryTarget.Injectable });
DialogService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: DialogService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: DialogService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i0.Injector }, { type: i0.ApplicationRef }]; } });

class DialogInitializer {
    constructor(component) {
        this.component = component;
        this.dialogCarrier = new DialogCarrier();
        this.dialogCarrier.setComponent(this.component);
    }
    openDialog$() {
        return this.dialogCarrier.openDialog$().pipe(map(resp => {
            const basicDialogResponse = new DialogResponse();
            const dataControl = new DataControl();
            dataControl.copyValuesFrom(resp, basicDialogResponse);
            return basicDialogResponse;
        }), take(1));
    }
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
class DialogResponse extends DataControl {
    constructor() {
        super();
        this.payload = null;
        this.success = null;
        this.clickedButtonID = null;
    }
    setPayload(_Payload) {
        this.payload = _Payload;
    }
    setClickedButtonID(_ClickedButtonID) {
        this.clickedButtonID = _ClickedButtonID;
    }
}
class DialogeventsController {
    constructor(entityUniqueID) {
        this.entityUniqueID = entityUniqueID;
        this._afterClosed = new Subject();
        this._afterLoader = new Subject();
        this._onButtonClick = new Subject();
        this._buttonList = new Subject();
        this.onButtonClick$ = this._onButtonClick.asObservable();
        this.afterClosed$ = this._afterClosed.asObservable();
        this.afterLoader$ = this._afterLoader.asObservable();
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
            this._afterLoader.next(this.entityUniqueID);
        }, 0);
    }
    setDefaultResponse(_Response) {
        this.defaultResponse = _Response;
    }
}
class DialogDefaultResponse extends DialogResponse {
    constructor() {
        super();
        this.DialogBelonging = null;
    }
    setBelonging(_DialogBelonging) {
        this.DialogBelonging = _DialogBelonging;
    }
}
class DialogCarrier {
    constructor() {
        this.dialogBelonging = new DialogBelonging();
    }
    setComponent(_Component) {
        this.component = _Component;
    }
    setButtons(_Buttons) {
        if (_Buttons.length) {
            this.dialogBelonging.buttons = _Buttons;
        }
    }
    setCustomData(_CustomData) {
        this.dialogBelonging.customData = _CustomData;
    }
    setConfig(_DialogConfig) {
        const dataControl = new DataControl();
        dataControl.copyValuesFrom(_DialogConfig, this.dialogBelonging.dialogCoreConfig);
        if (_DialogConfig === null || _DialogConfig === void 0 ? void 0 : _DialogConfig.loaderComponent) {
            this.dialogBelonging.dialogCoreConfig.displayLoader = true;
        }
    }
    openDialog$() {
        const service = ServiceLocator.injector.get(DialogService);
        const dialogController = service.open(this.component, this.dialogBelonging);
        return dialogController.afterClosed$;
    }
}
class DialogCustomStyles {
    constructor() {
        this.buttonSectionCSS = null;
        this.buttonCSS = null;
        this.wrapperCSS = null;
    }
}
class dialogCoreConfig extends Sizes {
    constructor() {
        super(...arguments);
        this.escapeKeyClose = null;
        this.hideScrollbar = null;
        this.buttonPosition = null;
        this.layoutType = null;
        this.displayLoader = null;
        this.loaderComponent = null;
        this.animationIn = null;
        this.animationOut = null;
        this.customStyles = new DialogCustomStyles();
    }
}
class DialogSettings {
    constructor() {
        this.buttons = [];
        this.dialogCoreConfig = new dialogCoreConfig();
    }
}
class DialogBelonging extends DialogSettings {
    constructor() {
        super();
        this.entityUniqueID = 'D' + Math.random().toString(36).substr(2, 9);
        this.customData = null;
        this.eventsController = new DialogeventsController(this.entityUniqueID);
        const dialogConfigurator = ServiceLocator.injector.get(DialogConfigService);
        const baseSettings = new DialogSettings();
        const dataControl = new DataControl();
        dataControl.copyValuesFrom(dialogConfigurator.productionConfig.dialogCoreConfig, baseSettings.dialogCoreConfig);
        this.dialogCoreConfig = baseSettings.dialogCoreConfig;
        this.buttons = dialogConfigurator.productionConfig.buttons.slice();
    }
}

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

class ToastNotificationConfigService {
    constructor(userConfig = {}) {
        this.userConfig = userConfig;
        this.dataControl = new DataControl();
        this.authorConfig = new ToastSettings();
        this.productionConfig = new ToastSettings();
        const userConfigBase = new ToastSettings();
        this.dataControl.copyValuesFrom(userConfig.toastCoreConfig, userConfigBase.toastCoreConfig);
        userConfig.toastCoreConfig = userConfigBase.toastCoreConfig;
        this.authorConfig.toastCoreConfig.buttonPosition = 'right';
        this.authorConfig.toastCoreConfig.textPosition = 'left';
        this.authorConfig.toastCoreConfig.toastPosition = ToastPositionEnum.TOP_RIGHT;
        this.authorConfig.toastCoreConfig.progressBar = ToastProgressBarEnum.INCREASE;
        this.authorConfig.toastCoreConfig.toastUserViewType = ToastUserViewTypeEnum.SIMPLE;
        this.authorConfig.toastCoreConfig.autoCloseDelay = 2500;
        this.authorConfig.toastCoreConfig.disableIcon = false;
        this.authorConfig.toastCoreConfig.allowHtmlMessage = true;
        this.authorConfig.toastCoreConfig.layoutType = DialogLayoutDisplay.NONE;
        this.authorConfig.globalSettings.allowedNotificationsAtOnce = 5;
        this.authorConfig.toastCoreConfig.animationIn = AppearanceAnimation.ZOOM_IN;
        this.authorConfig.toastCoreConfig.animationOut = DisappearanceAnimation.ZOOM_OUT;
        this.authorConfig.toastCoreConfig.customStyles = new ToastCustomStyles();
        this.authorConfig.toastCoreConfig.iconStyleClass = null;
        this.setResetGlobalToastConfig();
        this.dataControl.copyValuesFrom(this.authorConfig.toastCoreConfig, this.productionConfig.toastCoreConfig);
        this.dataControl.copyValuesFrom(this.userConfig.toastCoreConfig, this.productionConfig.toastCoreConfig);
    }
    setResetGlobalToastConfig(globalToastConfig) {
        this.dataControl.copyValuesFrom(this.authorConfig.globalSettings, this.productionConfig.globalSettings);
        this.dataControl.copyValuesFrom(globalToastConfig ? globalToastConfig : this.userConfig.globalSettings, this.productionConfig.globalSettings);
    }
}
ToastNotificationConfigService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ToastNotificationConfigService, deps: [{ token: 'toastNotificationConfig' }], target: i0.ɵɵFactoryTarget.Injectable });
ToastNotificationConfigService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ToastNotificationConfigService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ToastNotificationConfigService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () {
        return [{ type: undefined, decorators: [{
                        type: Inject,
                        args: ['toastNotificationConfig']
                    }] }];
    } });

class WrapperAbstraction {
    constructor(toastNotificationBelonging, layoutHelper) {
        this.toastNotificationBelonging = toastNotificationBelonging;
        this.layoutHelper = layoutHelper;
        this.closeIsClicked = false;
        this.autoClosingHasStarted = false;
        this.fadeInOutAnimation = 'open';
        this.timerStarted$ = new BehaviorSubject('start-counter');
        this.isTimerStarted = false;
        this.timer = new Timer();
        this.appearanceAnimation = AppearanceAnimation;
        this.disappearanceAnimation = DisappearanceAnimation;
        setTimeout(() => {
            this.boxAnimation = this.toastNotificationBelonging.toastCoreConfig.animationIn;
        }, 1);
    }
    get autoCloseCondition() {
        return (this.toastNotificationBelonging.toastCoreConfig.autoCloseDelay &&
            !(this.toastNotificationBelonging.buttons.length ||
                this.toastNotificationBelonging.toastCoreConfig.declineLabel ||
                this.toastNotificationBelonging.toastCoreConfig.confirmLabel));
    }
    get buttonsExist() {
        return (!!this.toastNotificationBelonging.buttons.length ||
            !!this.toastNotificationBelonging.toastCoreConfig.declineLabel ||
            !!this.toastNotificationBelonging.toastCoreConfig.confirmLabel);
    }
    setCustomStyles() {
        if (this.toastNotificationBelonging.toastCoreConfig.customStyles.textCSS && this.elTextWrapper) {
            this.elTextWrapper.nativeElement.style.cssText += this.toastNotificationBelonging.toastCoreConfig.customStyles.textCSS;
        }
        if (this.toastNotificationBelonging.toastCoreConfig.customStyles.titleCSS && this.elTitleWrapper) {
            this.elTitleWrapper.nativeElement.style.cssText += this.toastNotificationBelonging.toastCoreConfig.customStyles.titleCSS;
        }
        if (this.toastNotificationBelonging.toastCoreConfig.customStyles.buttonSectionCSS && this.elButtonWrapper) {
            this.elButtonWrapper.nativeElement.style.cssText += this.toastNotificationBelonging.toastCoreConfig.customStyles.buttonSectionCSS;
        }
        if (this.toastNotificationBelonging.toastCoreConfig.customStyles.buttonCSS && this.elButton) {
            this.elButton.forEach(el => {
                el.nativeElement.style.cssText += this.toastNotificationBelonging.toastCoreConfig.customStyles.buttonCSS;
            });
        }
    }
    mouseOver() {
        var _a;
        if (!this.buttonsExist && !this.closeIsClicked && !this.autoClosingHasStarted) {
            this.timerStarted$.next('stop-counter');
            this.fadeInOutAnimation = 'open';
            (_a = this.subsToClosingDelay) === null || _a === void 0 ? void 0 : _a.unsubscribe();
            this.boxAnimation = 'reset';
        }
    }
    mouseOut() {
        if (!this.buttonsExist && !this.closeIsClicked && !this.autoClosingHasStarted) {
            this.timerStarted$.next('start-counter');
        }
    }
    onOverlayClicked(evt) {
    }
    onToastClicked(evt) {
    }
    setResponse(_IsSuccess, _ClickedButtonID) {
        const response = new ToastNotificationDefaultResponse();
        if (_ClickedButtonID) {
            response.clickedButtonID = _ClickedButtonID;
        }
        response.setSuccess(_IsSuccess);
        response.setBelonging(this.toastNotificationBelonging);
        this.toastNotificationBelonging.eventsController.setDefaultResponse(response);
    }
    onCustomButton(_Button) {
        this.toastNotificationBelonging.eventsController.onButtonClick(_Button);
        this.setResponse(true, _Button.ID);
        this.toastNotificationBelonging.eventsController.close();
    }
    onButtonClick(_Type) {
        let buttonID;
        if (_Type === 'confirm') {
            buttonID = this.toastNotificationBelonging.toastCoreConfig.confirmLabel.toLowerCase();
        }
        else if (_Type === 'decline') {
            buttonID = this.toastNotificationBelonging.toastCoreConfig.declineLabel.toLowerCase();
        }
        this.setResponse(_Type === 'confirm', buttonID);
        this.toastNotificationBelonging.eventsController.close();
    }
    autoClose() {
        if (this.autoCloseCondition) {
            this.timer.setMilliseconds(this.toastNotificationBelonging.toastCoreConfig.autoCloseDelay);
            this.subTimer = this.timerStarted$
                .pipe(tap(next => {
                if ('start-counter' === next) {
                    this.timer.start();
                    this.isTimerStarted = true;
                    this.timeout = setTimeout(() => {
                        this.subsToClosingDelay = this.closeParent$().subscribe(resp => {
                            this.toastNotificationBelonging.eventsController.close();
                        });
                    }, this.toastNotificationBelonging.toastCoreConfig.autoCloseDelay);
                }
                else if ('stop-counter' === next) {
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
    closeParent$() {
        this.autoClosingHasStarted = true;
        this.boxAnimation = this.toastNotificationBelonging.toastCoreConfig.animationOut;
        const closeDuration = this.toastNotificationBelonging.toastCoreConfig.animationOut ? 400 : 200;
        this.fadeInOutAnimation = 'close-fast';
        return of('').pipe(delay(closeDuration));
    }
    close() {
        this.toastNotificationBelonging.eventsController.close();
    }
    closeIcon() {
        var _a;
        this.closeIsClicked = true;
        (_a = this.subsToClosingDelay) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        this.closeParent$()
            .pipe(take(1))
            .subscribe(resp => {
            this.toastNotificationBelonging.eventsController.close();
        });
    }
    ngOnDestroy() {
        var _a, _b;
        (_a = this.subsToClosingDelay) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        (_b = this.subTimer) === null || _b === void 0 ? void 0 : _b.unsubscribe();
    }
    getIconClasses() {
        return ('icon-type-toast ' +
            this.layoutHelper.getIconClasses(this.toastNotificationBelonging.toastCoreConfig.layoutType, this.toastNotificationBelonging.toastCoreConfig.iconStyleClass));
    }
}
WrapperAbstraction.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: WrapperAbstraction, deps: [{ token: 'toastNotificationBelonging' }, { token: LayoutHelperService }], target: i0.ɵɵFactoryTarget.Directive });
WrapperAbstraction.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: WrapperAbstraction, viewQueries: [{ propertyName: "elTextWrapper", first: true, predicate: ["elTextWrapper"], descendants: true }, { propertyName: "elTitleWrapper", first: true, predicate: ["elTitleWrapper"], descendants: true }, { propertyName: "elButtonWrapper", first: true, predicate: ["elButtonWrapper"], descendants: true }, { propertyName: "elButton", predicate: ["elButton"], descendants: true }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: WrapperAbstraction, decorators: [{
            type: Directive
        }], ctorParameters: function () {
        return [{ type: ToastNotificationBelonging, decorators: [{
                        type: Inject,
                        args: ['toastNotificationBelonging']
                    }] }, { type: LayoutHelperService }];
    }, propDecorators: { elTextWrapper: [{
                type: ViewChild,
                args: ['elTextWrapper']
            }], elTitleWrapper: [{
                type: ViewChild,
                args: ['elTitleWrapper']
            }], elButtonWrapper: [{
                type: ViewChild,
                args: ['elButtonWrapper']
            }], elButton: [{
                type: ViewChildren,
                args: ['elButton']
            }] } });

class ResetGlobalConfig {
    constructor(globalConfig) {
        const globalConfigService = ServiceLocator.injector.get(GlobalConfigService);
        if (globalConfig) {
            globalConfigService.setUserColors(globalConfig.colorList);
            globalConfigService.setNodeStyles(globalConfigService.productionGlobalConfig.displayColor, true);
        }
        else {
            globalConfigService.resetStyles();
        }
    }
}
class GlobalConfigService {
    constructor(userGlobalConfig) {
        this.userGlobalConfig = userGlobalConfig;
        this.authorGlobalConfig = new GlobalConfig();
        this.productionGlobalConfig = new GlobalConfig();
        this.userGeneratedConfig = new GlobalUserConfig(userGlobalConfig);
        this.authorGlobalConfig.displayColor.primary = null;
        this.authorGlobalConfig.displayColor.secondary = null;
        this.authorGlobalConfig.displayColor.success = null;
        this.authorGlobalConfig.displayColor.info = null;
        this.authorGlobalConfig.displayColor.warning = null;
        this.authorGlobalConfig.displayColor.danger = null;
        this.authorGlobalConfig.displayColor.light = null;
        this.authorGlobalConfig.displayColor.dark = null;
        this.authorGlobalConfig.displayColor.customOne = null;
        this.authorGlobalConfig.displayColor.customTwo = null;
        this.authorGlobalConfig.displayColor.customThree = null;
        this.authorGlobalConfig.displayColor.customFour = null;
        this.authorGlobalConfig.displayColor.customFive = null;
        this.productionGlobalConfig.displayColor = this.authorGlobalConfig.displayColor;
        this.setUserColors(this.userGeneratedConfig.colorList);
        this.setNodeStyles(this.productionGlobalConfig.displayColor);
    }
    resetStyles() {
        this.setUserColors(this.userGeneratedConfig.colorList);
        this.setNodeStyles(this.productionGlobalConfig.displayColor, true);
    }
    setNodeStyles(_ProductionColorTypes, _Reset = false) {
        if (_Reset) {
            const evolveDialogStyleNode = document.getElementById('ngx-awesome-popup-glob-styles');
            if (evolveDialogStyleNode) {
                evolveDialogStyleNode.remove();
            }
        }
        this.setToastStyles();
        Object.keys(_ProductionColorTypes).forEach(key => {
            if (_ProductionColorTypes[key]) {
                this.setButtonStyling(key, _ProductionColorTypes[key]);
                this.setIconStyling(key, _ProductionColorTypes[key]);
                this.setToastStyling(key, _ProductionColorTypes[key]);
                this.setDialogFrame(key, _ProductionColorTypes[key]);
                if (ColorVariance[key.toUpperCase()] === ColorVariance.PRIMARY) {
                    this.getSheet('ngx-awesome-popup-styles').addRule('.ngx-awesome-popup-overlay', `background:  ${_ProductionColorTypes[key].TransparentDarkenVariance}!important;`);
                }
            }
        });
    }
    setUserColors(_UserColorTypes) {
        if (typeof _UserColorTypes !== 'object') {
            return;
        }
        const userKeys = Object.keys(_UserColorTypes);
        const productionObjectKeys = Object.keys(this.productionGlobalConfig.displayColor);
        userKeys.forEach(key => {
            if (productionObjectKeys.find(tKey => tKey === key)) {
                if (_UserColorTypes[key]) {
                    const baseColorProvider = new ColorProvider(_UserColorTypes[key]);
                    if (baseColorProvider.Base) {
                        this.productionGlobalConfig.displayColor[key] = baseColorProvider;
                    }
                }
                else {
                    this.productionGlobalConfig.displayColor[key] = null;
                }
            }
        });
    }
    getSheet(_StyleID) {
        let evolveDialogStyleNode = document.getElementById(_StyleID);
        if (!evolveDialogStyleNode) {
            const headNode = document.head || document.getElementsByTagName('head')[0];
            if (!headNode) {
                return;
            }
            evolveDialogStyleNode = document.createElement('style');
            evolveDialogStyleNode.setAttribute('id', _StyleID);
            evolveDialogStyleNode.appendChild(document.createTextNode(''));
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
        this.getSheet('ngx-awesome-popup-glob-styles').addRule(baseProgress, baseProgressStyle);
        this.getSheet('ngx-awesome-popup-glob-styles').addRule(standardToast, standardToastStyle);
        this.getSheet('ngx-awesome-popup-glob-styles').addRule(simpleToast, simpleToastStyle);
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
        background:  ${_ColorProvider.IsBaseBright ? _ColorProvider.DarkenForShade : _ColorProvider.BrightenForShade}!important;
        border-color: ${_ColorProvider.IsBaseBright ? _ColorProvider.Darken : _ColorProvider.Brighten}!important;
        `;
        const focusActiveButtonClass = `.ed-btn-${_Key.toLowerCase()}:focus, .ed-btn-${_Key.toLowerCase()}:active`;
        const focusActiveStyle = `
        box-shadow: 0 0 1px 2px ${_ColorProvider.IsBaseBright ? _ColorProvider.Darken : _ColorProvider.Brighten}!important;
        `;
        this.getSheet('ngx-awesome-popup-glob-styles').addRule(baseButtonClass, baseStyle);
        this.getSheet('ngx-awesome-popup-glob-styles').addRule(hoverButtonClass, hoverStyle);
        this.getSheet('ngx-awesome-popup-glob-styles').addRule(focusActiveButtonClass, focusActiveStyle);
    }
    setIconStyling(_Key, _ColorProvider) {
        const baseIconClass = `.ap-icon-${_Key.toLowerCase()}`;
        const baseStyle = `color: ${_ColorProvider.BrightenForShade}!important;`;
        this.getSheet('ngx-awesome-popup-glob-styles').addRule(baseIconClass, baseStyle);
    }
    setDialogFrame(_Key, _ColorProvider) {
        const baseDialogFrameClass = `.ngx-awesome-popup-overlay .${_Key.toLowerCase()}-dialog`;
        const baseStyle = `
        border-color: ${_ColorProvider.Brighten}!important;
        `;
        this.getSheet('ngx-awesome-popup-glob-styles').addRule(baseDialogFrameClass, baseStyle);
    }
    setToastStyles() {
        this.getSheet('ngx-awesome-popup-styles').addRule(`.toast-entity`, `all 0.5s ease;`);
        this.getSheet('ngx-awesome-popup-styles').addRule(`.toast-entity:first-child`, `animation: move 0.7s ease-out;`);
        const isIEOrEdge = /msie\s|trident\//i.test(window.navigator.userAgent);
        if (!isIEOrEdge) {
            this.getSheet('ngx-awesome-popup-styles').addRule(`@-webkit-keyframes move`, `
                                        0% {margin-top: -5px; opacity: 0.4;}
                                        30% {margin-top: -4px; opacity: 0.7;}
                                        100% {margin-top: 0px; opacity: 1;}
                                        `);
            this.getSheet('ngx-awesome-popup-styles').addRule(`@keyframes move`, `
                                        0% {margin-top: -5px; opacity: 0.4;}
                                        30% {margin-top: -4px; opacity: 0.7;}
                                        100% {margin-top: 0px; opacity: 1;}
                                        `);
        }
    }
}
GlobalConfigService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: GlobalConfigService, deps: [{ token: 'cdGlobalConfig' }], target: i0.ɵɵFactoryTarget.Injectable });
GlobalConfigService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: GlobalConfigService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: GlobalConfigService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () {
        return [{ type: undefined, decorators: [{
                        type: Inject,
                        args: ['cdGlobalConfig']
                    }] }];
    } });

class ToastNotificationSimpleWrapperComponent extends WrapperAbstraction {
    constructor(toastNotificationBelonging, gConfig, cd, layoutHelper) {
        super(toastNotificationBelonging, layoutHelper);
        this.toastNotificationBelonging = toastNotificationBelonging;
        this.gConfig = gConfig;
        this.cd = cd;
        this.layoutHelper = layoutHelper;
    }
    ngAfterViewInit() {
        this.setResponse(false);
        this.cd.detectChanges();
        this.autoClose();
        this.setCustomStyles();
    }
}
ToastNotificationSimpleWrapperComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ToastNotificationSimpleWrapperComponent, deps: [{ token: 'toastNotificationBelonging' }, { token: GlobalConfigService }, { token: i0.ChangeDetectorRef }, { token: LayoutHelperService }], target: i0.ɵɵFactoryTarget.Component });
ToastNotificationSimpleWrapperComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: ToastNotificationSimpleWrapperComponent, selector: "app-toast-notification-simple-wrapper", providers: [LayoutHelperService], usesInheritance: true, ngImport: i0, template: "<div\n  class=\"toast-wrapper simple-toast\"\n  (dblclick)=\"onOverlayClicked($event)\"\n  [@fadeInOut]=\"{\n    value: fadeInOutAnimation,\n    params: {\n      closeDelay: toastNotificationBelonging.toastCoreConfig.animationOut === disappearanceAnimation.NONE ? '200ms' : '300ms'\n    }\n  }\">\n  <div\n    [@.disabled]=\"\n      toastNotificationBelonging.toastCoreConfig.animationIn === appearanceAnimation.NONE &&\n      toastNotificationBelonging.toastCoreConfig.animationOut === disappearanceAnimation.NONE\n    \"\n    [@boxAnimations]=\"boxAnimation\"\n    (mouseover)=\"mouseOver()\"\n    (mouseout)=\"mouseOut()\"\n    (click)=\"onToastClicked($event)\"\n    [className]=\"layoutHelper.getBoxClasses(toastNotificationBelonging.toastCoreConfig.layoutType, 'evolve-toast')\">\n    <div class=\"toast-title-content\" #elTitleWrapper *ngIf=\"toastNotificationBelonging.dispatch.title\">\n      <div class=\"icon-section\" *ngIf=\"!toastNotificationBelonging.toastCoreConfig.disableIcon\">\n        <span [className]=\"getIconClasses()\"></span>\n      </div>\n      <div class=\"dont-break-out\">\n        <div class=\"text-wrapper dont-break-out\">\n          {{ toastNotificationBelonging.dispatch.title }}\n          <span class=\"close-ico icon-times-circle\" (click)=\"closeIcon()\" *ngIf=\"!buttonsExist\"></span>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"content-holder toast-text\" #elTextWrapper *ngIf=\"toastNotificationBelonging.dispatch.message\">\n      <div\n        class=\"text-wrapper-section toast-inner-content\"\n        [ngStyle]=\"{\n          'text-align': toastNotificationBelonging.toastCoreConfig.textPosition\n        }\"\n        [ngClass]=\"{\n          'only-message': !toastNotificationBelonging.dispatch.title\n        }\">\n        <div class=\"dont-break-out\">\n          <div class=\"text-wrapper dont-break-out\" *ngIf=\"!toastNotificationBelonging.toastCoreConfig.allowHtmlMessage\">\n            <p>{{ toastNotificationBelonging.dispatch.message }}</p>\n          </div>\n          <div\n            class=\"text-wrapper\"\n            *ngIf=\"toastNotificationBelonging.toastCoreConfig.allowHtmlMessage\"\n            [innerHTML]=\"toastNotificationBelonging.dispatch.message\"></div>\n        </div>\n      </div>\n      <span\n        class=\"close-ico icon-times-circle\"\n        (click)=\"closeIcon()\"\n        *ngIf=\"buttonsExist && !toastNotificationBelonging.dispatch.title\"></span>\n    </div>\n\n    <div class=\"button-holder\" #elButtonWrapper>\n      <div\n        class=\"button-section\"\n        *ngIf=\"toastNotificationBelonging.buttons.length\"\n        [ngStyle]=\"{\n          'text-align': toastNotificationBelonging.toastCoreConfig.buttonPosition\n        }\">\n        <button\n          #elButton\n          *ngFor=\"let button of toastNotificationBelonging.buttons\"\n          (click)=\"onCustomButton(button)\"\n          [className]=\"layoutHelper.getButtonClasses(button.layoutType, 'ed-btn ed-btn-sm')\">\n          {{ button.label }}\n        </button>\n      </div>\n\n      <div\n        class=\"button-section\"\n        [ngStyle]=\"{\n          'text-align': toastNotificationBelonging.toastCoreConfig.buttonPosition\n        }\"\n        *ngIf=\"\n          !toastNotificationBelonging.buttons.length &&\n          (toastNotificationBelonging.toastCoreConfig.declineLabel || toastNotificationBelonging.toastCoreConfig.confirmLabel)\n        \">\n        <button\n          *ngIf=\"toastNotificationBelonging.toastCoreConfig.confirmLabel\"\n          (click)=\"onButtonClick('confirm')\"\n          [className]=\"\n            layoutHelper.getButtonClasses(toastNotificationBelonging.toastCoreConfig.layoutType, 'ed-btn ed-btn-sm', 'auto-button')\n          \">\n          {{ toastNotificationBelonging.toastCoreConfig.confirmLabel }}\n        </button>\n        <button\n          class=\"ed-btn ed-btn-sm ed-btn-secondary\"\n          (click)=\"onButtonClick('decline')\"\n          *ngIf=\"toastNotificationBelonging.toastCoreConfig.declineLabel\">\n          {{ toastNotificationBelonging.toastCoreConfig.declineLabel }}\n        </button>\n      </div>\n    </div>\n\n    <div class=\"progress-bar-container\" *ngIf=\"!buttonsExist && toastNotificationBelonging.toastCoreConfig.progressBar !== 0\">\n      <div\n        class=\"progress-bar\"\n        [ngStyle]=\"{\n          width: (toastNotificationBelonging.toastCoreConfig.progressBar === 1 ? timer.Progress : timer.Remaining) + '%'\n        }\"></div>\n    </div>\n  </div>\n</div>\n", directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], animations: [fadeInOut(), boxAnimations()] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ToastNotificationSimpleWrapperComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-toast-notification-simple-wrapper', animations: [fadeInOut(), boxAnimations()], providers: [LayoutHelperService], template: "<div\n  class=\"toast-wrapper simple-toast\"\n  (dblclick)=\"onOverlayClicked($event)\"\n  [@fadeInOut]=\"{\n    value: fadeInOutAnimation,\n    params: {\n      closeDelay: toastNotificationBelonging.toastCoreConfig.animationOut === disappearanceAnimation.NONE ? '200ms' : '300ms'\n    }\n  }\">\n  <div\n    [@.disabled]=\"\n      toastNotificationBelonging.toastCoreConfig.animationIn === appearanceAnimation.NONE &&\n      toastNotificationBelonging.toastCoreConfig.animationOut === disappearanceAnimation.NONE\n    \"\n    [@boxAnimations]=\"boxAnimation\"\n    (mouseover)=\"mouseOver()\"\n    (mouseout)=\"mouseOut()\"\n    (click)=\"onToastClicked($event)\"\n    [className]=\"layoutHelper.getBoxClasses(toastNotificationBelonging.toastCoreConfig.layoutType, 'evolve-toast')\">\n    <div class=\"toast-title-content\" #elTitleWrapper *ngIf=\"toastNotificationBelonging.dispatch.title\">\n      <div class=\"icon-section\" *ngIf=\"!toastNotificationBelonging.toastCoreConfig.disableIcon\">\n        <span [className]=\"getIconClasses()\"></span>\n      </div>\n      <div class=\"dont-break-out\">\n        <div class=\"text-wrapper dont-break-out\">\n          {{ toastNotificationBelonging.dispatch.title }}\n          <span class=\"close-ico icon-times-circle\" (click)=\"closeIcon()\" *ngIf=\"!buttonsExist\"></span>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"content-holder toast-text\" #elTextWrapper *ngIf=\"toastNotificationBelonging.dispatch.message\">\n      <div\n        class=\"text-wrapper-section toast-inner-content\"\n        [ngStyle]=\"{\n          'text-align': toastNotificationBelonging.toastCoreConfig.textPosition\n        }\"\n        [ngClass]=\"{\n          'only-message': !toastNotificationBelonging.dispatch.title\n        }\">\n        <div class=\"dont-break-out\">\n          <div class=\"text-wrapper dont-break-out\" *ngIf=\"!toastNotificationBelonging.toastCoreConfig.allowHtmlMessage\">\n            <p>{{ toastNotificationBelonging.dispatch.message }}</p>\n          </div>\n          <div\n            class=\"text-wrapper\"\n            *ngIf=\"toastNotificationBelonging.toastCoreConfig.allowHtmlMessage\"\n            [innerHTML]=\"toastNotificationBelonging.dispatch.message\"></div>\n        </div>\n      </div>\n      <span\n        class=\"close-ico icon-times-circle\"\n        (click)=\"closeIcon()\"\n        *ngIf=\"buttonsExist && !toastNotificationBelonging.dispatch.title\"></span>\n    </div>\n\n    <div class=\"button-holder\" #elButtonWrapper>\n      <div\n        class=\"button-section\"\n        *ngIf=\"toastNotificationBelonging.buttons.length\"\n        [ngStyle]=\"{\n          'text-align': toastNotificationBelonging.toastCoreConfig.buttonPosition\n        }\">\n        <button\n          #elButton\n          *ngFor=\"let button of toastNotificationBelonging.buttons\"\n          (click)=\"onCustomButton(button)\"\n          [className]=\"layoutHelper.getButtonClasses(button.layoutType, 'ed-btn ed-btn-sm')\">\n          {{ button.label }}\n        </button>\n      </div>\n\n      <div\n        class=\"button-section\"\n        [ngStyle]=\"{\n          'text-align': toastNotificationBelonging.toastCoreConfig.buttonPosition\n        }\"\n        *ngIf=\"\n          !toastNotificationBelonging.buttons.length &&\n          (toastNotificationBelonging.toastCoreConfig.declineLabel || toastNotificationBelonging.toastCoreConfig.confirmLabel)\n        \">\n        <button\n          *ngIf=\"toastNotificationBelonging.toastCoreConfig.confirmLabel\"\n          (click)=\"onButtonClick('confirm')\"\n          [className]=\"\n            layoutHelper.getButtonClasses(toastNotificationBelonging.toastCoreConfig.layoutType, 'ed-btn ed-btn-sm', 'auto-button')\n          \">\n          {{ toastNotificationBelonging.toastCoreConfig.confirmLabel }}\n        </button>\n        <button\n          class=\"ed-btn ed-btn-sm ed-btn-secondary\"\n          (click)=\"onButtonClick('decline')\"\n          *ngIf=\"toastNotificationBelonging.toastCoreConfig.declineLabel\">\n          {{ toastNotificationBelonging.toastCoreConfig.declineLabel }}\n        </button>\n      </div>\n    </div>\n\n    <div class=\"progress-bar-container\" *ngIf=\"!buttonsExist && toastNotificationBelonging.toastCoreConfig.progressBar !== 0\">\n      <div\n        class=\"progress-bar\"\n        [ngStyle]=\"{\n          width: (toastNotificationBelonging.toastCoreConfig.progressBar === 1 ? timer.Progress : timer.Remaining) + '%'\n        }\"></div>\n    </div>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () {
        return [{ type: ToastNotificationBelonging, decorators: [{
                        type: Inject,
                        args: ['toastNotificationBelonging']
                    }] }, { type: GlobalConfigService }, { type: i0.ChangeDetectorRef }, { type: LayoutHelperService }];
    } });

class ToastNotificationWrapperComponent extends WrapperAbstraction {
    constructor(toastNotificationBelonging, gConfig, cd, layoutHelper) {
        super(toastNotificationBelonging, layoutHelper);
        this.toastNotificationBelonging = toastNotificationBelonging;
        this.gConfig = gConfig;
        this.cd = cd;
        this.layoutHelper = layoutHelper;
    }
    ngAfterViewInit() {
        this.setResponse(false);
        this.cd.detectChanges();
        this.autoClose();
        this.setCustomStyles();
    }
}
ToastNotificationWrapperComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ToastNotificationWrapperComponent, deps: [{ token: 'toastNotificationBelonging' }, { token: GlobalConfigService }, { token: i0.ChangeDetectorRef }, { token: LayoutHelperService }], target: i0.ɵɵFactoryTarget.Component });
ToastNotificationWrapperComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: ToastNotificationWrapperComponent, selector: "app-toast-notification-wrapper", providers: [LayoutHelperService], usesInheritance: true, ngImport: i0, template: "<div\n  class=\"toast-wrapper standard-toast\"\n  (dblclick)=\"onOverlayClicked($event)\"\n  [@fadeInOut]=\"{\n    value: fadeInOutAnimation,\n    params: {\n      closeDelay: toastNotificationBelonging.toastCoreConfig.animationOut === disappearanceAnimation.NONE ? '200ms' : '300ms'\n    }\n  }\">\n  <div\n    [@.disabled]=\"\n      toastNotificationBelonging.toastCoreConfig.animationIn === appearanceAnimation.NONE &&\n      toastNotificationBelonging.toastCoreConfig.animationOut === disappearanceAnimation.NONE\n    \"\n    [@boxAnimations]=\"boxAnimation\"\n    (mouseover)=\"mouseOver()\"\n    (mouseout)=\"mouseOut()\"\n    (click)=\"onToastClicked($event)\"\n    [className]=\"layoutHelper.getBoxClasses(toastNotificationBelonging.toastCoreConfig.layoutType, 'evolve-toast')\">\n    <div class=\"toast-title-content\" #elTitleWrapper *ngIf=\"toastNotificationBelonging.dispatch.title\">\n      <div class=\"dont-break-out\">\n        <div class=\"text-wrapper dont-break-out\">\n          {{ toastNotificationBelonging.dispatch.title }}\n          <span class=\"close-ico icon-times-circle\" (click)=\"closeIcon()\" *ngIf=\"!buttonsExist\"></span>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"content-holder toast-text\" #elTextWrapper *ngIf=\"toastNotificationBelonging.dispatch.message\">\n      <div class=\"icon-section\" *ngIf=\"!toastNotificationBelonging.toastCoreConfig.disableIcon\">\n        <span [className]=\"getIconClasses()\"></span>\n      </div>\n      <div\n        class=\"text-wrapper-section toast-inner-content\"\n        [ngStyle]=\"{\n          'text-align': toastNotificationBelonging.toastCoreConfig.textPosition\n        }\"\n        [ngClass]=\"{\n          'only-message': !toastNotificationBelonging.dispatch.title\n        }\">\n        <div class=\"dont-break-out\">\n          <div class=\"text-wrapper dont-break-out\" *ngIf=\"!toastNotificationBelonging.toastCoreConfig.allowHtmlMessage\">\n            <p>{{ toastNotificationBelonging.dispatch.message }}</p>\n          </div>\n          <div\n            class=\"text-wrapper\"\n            *ngIf=\"toastNotificationBelonging.toastCoreConfig.allowHtmlMessage\"\n            [innerHTML]=\"toastNotificationBelonging.dispatch.message\"></div>\n        </div>\n      </div>\n      <span\n        class=\"close-ico icon-times-circle\"\n        (click)=\"closeIcon()\"\n        *ngIf=\"buttonsExist && !toastNotificationBelonging.dispatch.title\"></span>\n    </div>\n\n    <div class=\"button-holder\" #elButtonWrapper>\n      <div\n        class=\"button-section\"\n        *ngIf=\"toastNotificationBelonging.buttons.length\"\n        [ngStyle]=\"{\n          'text-align': toastNotificationBelonging.toastCoreConfig.buttonPosition\n        }\">\n        <button\n          #elButton\n          *ngFor=\"let button of toastNotificationBelonging.buttons\"\n          (click)=\"onCustomButton(button)\"\n          [className]=\"layoutHelper.getButtonClasses(button.layoutType, 'ed-btn ed-btn-sm')\">\n          {{ button.label }}\n        </button>\n      </div>\n\n      <div\n        class=\"button-section\"\n        [ngStyle]=\"{\n          'text-align': toastNotificationBelonging.toastCoreConfig.buttonPosition\n        }\"\n        *ngIf=\"\n          !toastNotificationBelonging.buttons.length &&\n          (toastNotificationBelonging.toastCoreConfig.declineLabel || toastNotificationBelonging.toastCoreConfig.confirmLabel)\n        \">\n        <button\n          #elButton\n          *ngIf=\"toastNotificationBelonging.toastCoreConfig.confirmLabel\"\n          (click)=\"onButtonClick('confirm')\"\n          [className]=\"\n            layoutHelper.getButtonClasses(toastNotificationBelonging.toastCoreConfig.layoutType, 'ed-btn ed-btn-sm', 'auto-button')\n          \">\n          {{ toastNotificationBelonging.toastCoreConfig.confirmLabel }}\n        </button>\n        <button\n          class=\"ed-btn ed-btn-sm ed-btn-secondary\"\n          #elButton\n          (click)=\"onButtonClick('decline')\"\n          *ngIf=\"toastNotificationBelonging.toastCoreConfig.declineLabel\">\n          {{ toastNotificationBelonging.toastCoreConfig.declineLabel }}\n        </button>\n      </div>\n    </div>\n\n    <div class=\"progress-bar-container\" *ngIf=\"!buttonsExist && toastNotificationBelonging.toastCoreConfig.progressBar !== 0\">\n      <div\n        class=\"progress-bar\"\n        [ngStyle]=\"{\n          width: (toastNotificationBelonging.toastCoreConfig.progressBar === 1 ? timer.Progress : timer.Remaining) + '%'\n        }\"></div>\n    </div>\n  </div>\n</div>\n", directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], animations: [fadeInOut(), boxAnimations()] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ToastNotificationWrapperComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-toast-notification-wrapper', animations: [fadeInOut(), boxAnimations()], providers: [LayoutHelperService], template: "<div\n  class=\"toast-wrapper standard-toast\"\n  (dblclick)=\"onOverlayClicked($event)\"\n  [@fadeInOut]=\"{\n    value: fadeInOutAnimation,\n    params: {\n      closeDelay: toastNotificationBelonging.toastCoreConfig.animationOut === disappearanceAnimation.NONE ? '200ms' : '300ms'\n    }\n  }\">\n  <div\n    [@.disabled]=\"\n      toastNotificationBelonging.toastCoreConfig.animationIn === appearanceAnimation.NONE &&\n      toastNotificationBelonging.toastCoreConfig.animationOut === disappearanceAnimation.NONE\n    \"\n    [@boxAnimations]=\"boxAnimation\"\n    (mouseover)=\"mouseOver()\"\n    (mouseout)=\"mouseOut()\"\n    (click)=\"onToastClicked($event)\"\n    [className]=\"layoutHelper.getBoxClasses(toastNotificationBelonging.toastCoreConfig.layoutType, 'evolve-toast')\">\n    <div class=\"toast-title-content\" #elTitleWrapper *ngIf=\"toastNotificationBelonging.dispatch.title\">\n      <div class=\"dont-break-out\">\n        <div class=\"text-wrapper dont-break-out\">\n          {{ toastNotificationBelonging.dispatch.title }}\n          <span class=\"close-ico icon-times-circle\" (click)=\"closeIcon()\" *ngIf=\"!buttonsExist\"></span>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"content-holder toast-text\" #elTextWrapper *ngIf=\"toastNotificationBelonging.dispatch.message\">\n      <div class=\"icon-section\" *ngIf=\"!toastNotificationBelonging.toastCoreConfig.disableIcon\">\n        <span [className]=\"getIconClasses()\"></span>\n      </div>\n      <div\n        class=\"text-wrapper-section toast-inner-content\"\n        [ngStyle]=\"{\n          'text-align': toastNotificationBelonging.toastCoreConfig.textPosition\n        }\"\n        [ngClass]=\"{\n          'only-message': !toastNotificationBelonging.dispatch.title\n        }\">\n        <div class=\"dont-break-out\">\n          <div class=\"text-wrapper dont-break-out\" *ngIf=\"!toastNotificationBelonging.toastCoreConfig.allowHtmlMessage\">\n            <p>{{ toastNotificationBelonging.dispatch.message }}</p>\n          </div>\n          <div\n            class=\"text-wrapper\"\n            *ngIf=\"toastNotificationBelonging.toastCoreConfig.allowHtmlMessage\"\n            [innerHTML]=\"toastNotificationBelonging.dispatch.message\"></div>\n        </div>\n      </div>\n      <span\n        class=\"close-ico icon-times-circle\"\n        (click)=\"closeIcon()\"\n        *ngIf=\"buttonsExist && !toastNotificationBelonging.dispatch.title\"></span>\n    </div>\n\n    <div class=\"button-holder\" #elButtonWrapper>\n      <div\n        class=\"button-section\"\n        *ngIf=\"toastNotificationBelonging.buttons.length\"\n        [ngStyle]=\"{\n          'text-align': toastNotificationBelonging.toastCoreConfig.buttonPosition\n        }\">\n        <button\n          #elButton\n          *ngFor=\"let button of toastNotificationBelonging.buttons\"\n          (click)=\"onCustomButton(button)\"\n          [className]=\"layoutHelper.getButtonClasses(button.layoutType, 'ed-btn ed-btn-sm')\">\n          {{ button.label }}\n        </button>\n      </div>\n\n      <div\n        class=\"button-section\"\n        [ngStyle]=\"{\n          'text-align': toastNotificationBelonging.toastCoreConfig.buttonPosition\n        }\"\n        *ngIf=\"\n          !toastNotificationBelonging.buttons.length &&\n          (toastNotificationBelonging.toastCoreConfig.declineLabel || toastNotificationBelonging.toastCoreConfig.confirmLabel)\n        \">\n        <button\n          #elButton\n          *ngIf=\"toastNotificationBelonging.toastCoreConfig.confirmLabel\"\n          (click)=\"onButtonClick('confirm')\"\n          [className]=\"\n            layoutHelper.getButtonClasses(toastNotificationBelonging.toastCoreConfig.layoutType, 'ed-btn ed-btn-sm', 'auto-button')\n          \">\n          {{ toastNotificationBelonging.toastCoreConfig.confirmLabel }}\n        </button>\n        <button\n          class=\"ed-btn ed-btn-sm ed-btn-secondary\"\n          #elButton\n          (click)=\"onButtonClick('decline')\"\n          *ngIf=\"toastNotificationBelonging.toastCoreConfig.declineLabel\">\n          {{ toastNotificationBelonging.toastCoreConfig.declineLabel }}\n        </button>\n      </div>\n    </div>\n\n    <div class=\"progress-bar-container\" *ngIf=\"!buttonsExist && toastNotificationBelonging.toastCoreConfig.progressBar !== 0\">\n      <div\n        class=\"progress-bar\"\n        [ngStyle]=\"{\n          width: (toastNotificationBelonging.toastCoreConfig.progressBar === 1 ? timer.Progress : timer.Remaining) + '%'\n        }\"></div>\n    </div>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () {
        return [{ type: ToastNotificationBelonging, decorators: [{
                        type: Inject,
                        args: ['toastNotificationBelonging']
                    }] }, { type: GlobalConfigService }, { type: i0.ChangeDetectorRef }, { type: LayoutHelperService }];
    } });

class ToastNotificationService {
    constructor(componentFactoryResolver, injector, appRef, toastConfig, gConfigService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.injector = injector;
        this.appRef = appRef;
        this.toastConfig = toastConfig;
        this.gConfigService = gConfigService;
        this.toastComponentRefList = [];
        this.bufferToastRawList = [];
        this.bufferCheckingIntervalIsReady = true;
    }
    openToast$(_ToastNotificationBelonging) {
        const eventController = _ToastNotificationBelonging.eventsController;
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
            componentRef.instance.toastNotificationBelonging = _ToastRawInstance.toastBelonging;
            this.appendToBodyParentComponent(componentRef);
        }
    }
    isRefListAvailable() {
        return (this.toastComponentRefList.length < this.toastConfig.productionConfig.globalSettings.allowedNotificationsAtOnce);
    }
    prepareRawToast(_eventsController, _ToastNotificationBelonging) {
        const weakMap = new WeakMap();
        weakMap.set(ToastNotificationeventsController, _eventsController);
        return {
            weakMap: weakMap,
            toastBelonging: _ToastNotificationBelonging
        };
    }
    getComponentRef(_ToastNotificationRawState) {
        const dialogIndex = this.findDialogIndex(_ToastNotificationRawState.toastBelonging.entityUniqueID);
        if (dialogIndex === -1) {
            let toastUserViewComponent = ToastNotificationWrapperComponent;
            if (_ToastNotificationRawState.toastBelonging.toastCoreConfig.toastUserViewType === ToastUserViewTypeEnum.SIMPLE) {
                toastUserViewComponent = ToastNotificationSimpleWrapperComponent;
            }
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(toastUserViewComponent);
            return componentFactory.create(new DialogInjector(this.injector, _ToastNotificationRawState.weakMap));
        }
        return null;
    }
    listeners(_eventsController) {
        const closeDialogSubscription = _eventsController.afterClosed$.subscribe(response => {
            this.removeFromBody(response.toastNotificationBelonging.entityUniqueID);
            closeDialogSubscription.unsubscribe();
        });
    }
    appendToBodyParentComponent(_ComponentRef) {
        this.appRef.attachView(_ComponentRef.hostView);
        const toastPosition = _ComponentRef.instance.toastNotificationBelonging.toastCoreConfig.toastPosition;
        const openInElementID = _ComponentRef.instance.toastNotificationBelonging.toastCoreConfig.openInElementID;
        let targetNode;
        if (!openInElementID) {
            this.setToastWrapperNode(_ComponentRef.instance.toastNotificationBelonging.toastCoreConfig.toastPosition, this.setToastOverlayNode());
            targetNode = document.getElementById(`toast-wrapper-${toastPosition}`);
        }
        else {
            targetNode = document.getElementById(openInElementID);
        }
        const domElem = _ComponentRef.hostView.rootNodes[0];
        const toastEntity = document.createElement('div');
        toastEntity.setAttribute('id', _ComponentRef.instance.toastNotificationBelonging.entityUniqueID);
        toastEntity.className = 'toast-entity';
        const split = toastPosition.split('-');
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
        targetNode.prepend(toastEntity);
    }
    removeFromBody(_entityUniqueID) {
        const modalIndex = this.findDialogIndex(_entityUniqueID);
        if (modalIndex > -1) {
            if (this.bufferToastRawList.length) {
                this.sendToProduction(this.bufferToastRawList[0]);
                this.bufferToastRawList.splice(0, 1);
            }
            this.toastComponentRefList[modalIndex].instance
                .closeParent$()
                .pipe(tap(item => {
                const modalIndex = this.findDialogIndex(_entityUniqueID);
                if (this.toastComponentRefList[modalIndex]) {
                    const toastEntity = document.getElementById(this.toastComponentRefList[modalIndex].instance.toastNotificationBelonging.entityUniqueID);
                    toastEntity.remove();
                    this.appRef.detachView(this.toastComponentRefList[modalIndex].hostView);
                    this.toastComponentRefList[modalIndex].destroy();
                    this.toastComponentRefList.splice(modalIndex, 1);
                }
            }), take(1))
                .subscribe();
        }
    }
    findDialogIndex(_DialogUniqueID) {
        return this.toastComponentRefList.findIndex(item => {
            return _DialogUniqueID === item.instance.toastNotificationBelonging.entityUniqueID;
        });
    }
    setToastOverlayNode() {
        const bodyNode = document.body || document.getElementsByTagName('body')[0];
        if (!bodyNode) {
            return;
        }
        const toastOverlayNode = document.getElementById('toast-overlay-container');
        if (!toastOverlayNode) {
            const toastOverlayNode = document.createElement('div');
            toastOverlayNode.setAttribute('id', 'toast-overlay-container');
            toastOverlayNode.appendChild(document.createTextNode(''));
            toastOverlayNode.style.position = 'fixed';
            toastOverlayNode.style.top = '0';
            toastOverlayNode.style.left = '0';
            toastOverlayNode.style.zIndex = '999999999999';
            bodyNode.appendChild(toastOverlayNode);
            return toastOverlayNode;
        }
        return toastOverlayNode;
    }
    setToastWrapperNode(_Position, _ToastOverlayNode) {
        const toastWrapperNode = document.getElementById(`toast-wrapper-${_Position}`);
        if (!toastWrapperNode) {
            const toastWrapper = document.createElement('div');
            toastWrapper.setAttribute('id', 'toast-wrapper-' + _Position);
            toastWrapper.appendChild(document.createTextNode(''));
            _ToastOverlayNode.prepend(toastWrapper);
            const split = _Position.split('-');
            if (split[1] === 'right' || split[1] === 'left') {
                this.gConfigService
                    .getSheet('ngx-awesome-popup-styles')
                    .addRule(`#toast-wrapper-${_Position}`, `${split[0]}: 20px; ${split[1]}: 20px; position: fixed; z-index: 999999999;`);
            }
            if (split[1] === 'center') {
                this.gConfigService
                    .getSheet('ngx-awesome-popup-styles')
                    .addRule(`#toast-wrapper-${_Position}`, `${split[0]}: 20px; width: 100%; position: fixed; z-index: 999999999; pointer-events: none;`);
            }
            if (split[1] === 'fullwidth') {
                this.gConfigService
                    .getSheet('ngx-awesome-popup-styles')
                    .addRule(`#toast-wrapper-${_Position}`, `${split[0]}: 10px; width: 100%; position: fixed; z-index: 999999999; pointer-events: none;`);
            }
        }
    }
}
ToastNotificationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ToastNotificationService, deps: [{ token: i0.ComponentFactoryResolver }, { token: i0.Injector }, { token: i0.ApplicationRef }, { token: ToastNotificationConfigService }, { token: GlobalConfigService }], target: i0.ɵɵFactoryTarget.Injectable });
ToastNotificationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ToastNotificationService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ToastNotificationService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i0.Injector }, { type: i0.ApplicationRef }, { type: ToastNotificationConfigService }, { type: GlobalConfigService }]; } });

class ToastNotificationInitializer {
    constructor() {
        this.toastNotificationCarrier = new ToastNotificationCarrier();
    }
    openToastNotification$() {
        return this.toastNotificationCarrier.openToastNotification$().pipe(map(resp => {
            const basicToastNotificationResponse = new ToastNotificationResponse();
            const dataControl = new DataControl();
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
class ToastNotificationResponse extends DataControl {
    constructor() {
        super();
        this.success = null;
        this.clickedButtonID = null;
    }
    setSuccess(_IsSuccess) {
        this.success = _IsSuccess;
    }
    setClickedButtonID(_ClickedButtonID) {
        this.clickedButtonID = _ClickedButtonID;
    }
}
class ToastNotificationeventsController {
    constructor(entityUniqueID) {
        this.entityUniqueID = entityUniqueID;
        this._onButtonClick = new Subject();
        this._afterClosed = new Subject();
        this._buttonList = new Subject();
        this.afterClosed$ = this._afterClosed.asObservable();
        this.onButtonClick$ = this._onButtonClick.asObservable();
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
class ToastNotificationDefaultResponse extends ToastNotificationResponse {
    constructor() {
        super();
        this.toastNotificationBelonging = null;
    }
    setBelonging(_ToastNotificationBelonging) {
        this.toastNotificationBelonging = _ToastNotificationBelonging;
    }
}
class ToastNotificationCarrier {
    constructor() {
        this.toastNotificationBelonging = new ToastNotificationBelonging();
    }
    setButtons(_Buttons) {
        if (_Buttons.length) {
            this.toastNotificationBelonging.buttons = _Buttons;
        }
    }
    setTitle(_Title) {
        this.toastNotificationBelonging.dispatch.title = _Title;
    }
    setMessage(_Message) {
        this.toastNotificationBelonging.dispatch.message = _Message;
    }
    setButtonLabels(_Confirm, _Decline) {
        this.toastNotificationBelonging.toastCoreConfig.confirmLabel = _Confirm;
        this.toastNotificationBelonging.toastCoreConfig.declineLabel = _Decline;
    }
    setConfig(_ToastNotificationBelonging) {
        const dataControl = new DataControl();
        dataControl.copyValuesFrom(_ToastNotificationBelonging, this.toastNotificationBelonging.toastCoreConfig);
    }
    openToastNotification$() {
        if (!this.toastNotificationBelonging.dispatch.title && !this.toastNotificationBelonging.dispatch.message) {
            throw Error('Toast notification can not be without both message and title.');
        }
        const service = ServiceLocator.injector.get(ToastNotificationService);
        return service.openToast$(this.toastNotificationBelonging);
    }
}
class GlobalToastSettings {
    constructor() {
        this.allowedNotificationsAtOnce = null;
    }
}
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
class ToastSettings {
    constructor() {
        this.buttons = [];
        this.toastCoreConfig = new toastCoreConfig();
        this.dispatch = new dispatch();
        this.globalSettings = new GlobalToastSettings();
    }
}
class ToastCustomStyles {
    constructor() {
        this.titleCSS = null;
        this.textCSS = null;
        this.buttonSectionCSS = null;
        this.buttonCSS = null;
    }
}
class toastCoreConfig {
    constructor() {
        this.toastPosition = null;
        this.progressBar = null;
        this.toastUserViewType = null;
        this.openInElementID = null;
        this.buttonPosition = null;
        this.textPosition = null;
        this.layoutType = null;
        this.dispatch = null;
        this.confirmLabel = null;
        this.declineLabel = null;
        this.autoCloseDelay = null;
        this.disableIcon = null;
        this.allowHtmlMessage = null;
        this.animationIn = null;
        this.animationOut = null;
        this.customStyles = new ToastCustomStyles();
        this.iconStyleClass = null;
    }
}
class ToastNotificationBelonging extends ToastSettings {
    constructor() {
        super();
        this.entityUniqueID = 'T' + Math.random().toString(36).substr(2, 9);
        this.eventsController = new ToastNotificationeventsController(this.entityUniqueID);
        const toastNotificationConfigurator = ServiceLocator.injector.get(ToastNotificationConfigService);
        const baseSettings = new ToastSettings();
        const dataControl = new DataControl();
        dataControl.copyValuesFrom(toastNotificationConfigurator.productionConfig.toastCoreConfig, baseSettings.toastCoreConfig);
        this.toastCoreConfig = baseSettings.toastCoreConfig;
        this.buttons = toastNotificationConfigurator.productionConfig.buttons.slice();
    }
}

class NgxAwesomePopupModule {
    constructor(injector) {
        this.injector = injector;
        ServiceLocator.injector = injector;
    }
    static forRoot(globalConfig) {
        return {
            ngModule: NgxAwesomePopupModule,
            providers: [{ provide: 'cdGlobalConfig', useValue: globalConfig }]
        };
    }
}
NgxAwesomePopupModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NgxAwesomePopupModule, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.NgModule });
NgxAwesomePopupModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NgxAwesomePopupModule, imports: [CommonModule, BrowserModule, BrowserAnimationsModule] });
NgxAwesomePopupModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NgxAwesomePopupModule, providers: [GlobalConfigService], imports: [[CommonModule, BrowserModule, BrowserAnimationsModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NgxAwesomePopupModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, BrowserModule, BrowserAnimationsModule],
                    providers: [GlobalConfigService]
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });
class DialogConfigModule {
    static forRoot(dialogConfig) {
        return {
            ngModule: DialogConfigModule,
            providers: [
                { provide: 'dialogConfig', useValue: dialogConfig },
                { provide: 'dialogBelonging', useClass: DialogBelonging }
            ]
        };
    }
}
DialogConfigModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: DialogConfigModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
DialogConfigModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: DialogConfigModule, declarations: [DialogWrapperComponent, DefaultLoaderComponent, InsertionDirective, InsertionLoaderDirective], imports: [CommonModule] });
DialogConfigModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: DialogConfigModule, providers: [DialogService, DialogConfigService], imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: DialogConfigModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [DialogWrapperComponent, DefaultLoaderComponent, InsertionDirective, InsertionLoaderDirective],
                    imports: [CommonModule],
                    providers: [DialogService, DialogConfigService],
                    entryComponents: [DialogWrapperComponent, DefaultLoaderComponent]
                }]
        }] });
class ConfirmBoxConfigModule {
    static forRoot(confirmBoxConfig) {
        return {
            ngModule: ConfirmBoxConfigModule,
            providers: [
                { provide: 'confirmBoxConfig', useValue: confirmBoxConfig },
                { provide: 'confirmBoxBelonging', useClass: ConfirmBoxBelonging }
            ]
        };
    }
}
ConfirmBoxConfigModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ConfirmBoxConfigModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfirmBoxConfigModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ConfirmBoxConfigModule, declarations: [ConfirmBoxWrapperComponent], imports: [CommonModule] });
ConfirmBoxConfigModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ConfirmBoxConfigModule, providers: [ConfirmBoxService, ConfirmBoxConfigService], imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ConfirmBoxConfigModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ConfirmBoxWrapperComponent],
                    imports: [CommonModule],
                    providers: [ConfirmBoxService, ConfirmBoxConfigService],
                    entryComponents: [ConfirmBoxWrapperComponent]
                }]
        }] });
class ToastNotificationConfigModule {
    static forRoot(toastNotificationConfig) {
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
    }
}
ToastNotificationConfigModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ToastNotificationConfigModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ToastNotificationConfigModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ToastNotificationConfigModule, declarations: [ToastNotificationWrapperComponent, ToastNotificationSimpleWrapperComponent], imports: [CommonModule] });
ToastNotificationConfigModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ToastNotificationConfigModule, providers: [ToastNotificationService, ToastNotificationConfigService], imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ToastNotificationConfigModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ToastNotificationWrapperComponent, ToastNotificationSimpleWrapperComponent],
                    imports: [CommonModule],
                    providers: [ToastNotificationService, ToastNotificationConfigService],
                    entryComponents: [ToastNotificationWrapperComponent, ToastNotificationSimpleWrapperComponent]
                }]
        }] });

var _ConfirmBoxEvokeService_instances, _ConfirmBoxEvokeService_extender;
class ConfirmBoxEvokeService {
    constructor() {
        _ConfirmBoxEvokeService_instances.add(this);
    }
    success(title, message, confirmLabel, declineLabel) {
        const confirmBox = __classPrivateFieldGet(this, _ConfirmBoxEvokeService_instances, "m", _ConfirmBoxEvokeService_extender).call(this, title, message, confirmLabel, declineLabel);
        confirmBox.setConfig({
            layoutType: DialogLayoutDisplay.SUCCESS
        });
        return confirmBox.openConfirmBox$();
    }
    info(title, message, confirmLabel, declineLabel) {
        const confirmBox = __classPrivateFieldGet(this, _ConfirmBoxEvokeService_instances, "m", _ConfirmBoxEvokeService_extender).call(this, title, message, confirmLabel, declineLabel);
        confirmBox.setConfig({
            layoutType: DialogLayoutDisplay.INFO
        });
        return confirmBox.openConfirmBox$();
    }
    warning(title, message, confirmLabel, declineLabel) {
        const confirmBox = __classPrivateFieldGet(this, _ConfirmBoxEvokeService_instances, "m", _ConfirmBoxEvokeService_extender).call(this, title, message, confirmLabel, declineLabel);
        confirmBox.setConfig({
            layoutType: DialogLayoutDisplay.WARNING
        });
        return confirmBox.openConfirmBox$();
    }
    danger(title, message, confirmLabel, declineLabel) {
        const confirmBox = __classPrivateFieldGet(this, _ConfirmBoxEvokeService_instances, "m", _ConfirmBoxEvokeService_extender).call(this, title, message, confirmLabel, declineLabel);
        confirmBox.setConfig({
            layoutType: DialogLayoutDisplay.DANGER
        });
        return confirmBox.openConfirmBox$();
    }
    customOne(title, message, confirmLabel, declineLabel) {
        const confirmBox = __classPrivateFieldGet(this, _ConfirmBoxEvokeService_instances, "m", _ConfirmBoxEvokeService_extender).call(this, title, message, confirmLabel, declineLabel);
        confirmBox.setConfig({
            layoutType: DialogLayoutDisplay.CUSTOM_ONE
        });
        return confirmBox.openConfirmBox$();
    }
    customTwo(title, message, confirmLabel, declineLabel) {
        const confirmBox = __classPrivateFieldGet(this, _ConfirmBoxEvokeService_instances, "m", _ConfirmBoxEvokeService_extender).call(this, title, message, confirmLabel, declineLabel);
        confirmBox.setConfig({
            layoutType: DialogLayoutDisplay.CUSTOM_TWO
        });
        return confirmBox.openConfirmBox$();
    }
    customThree(title, message, confirmLabel, declineLabel) {
        const confirmBox = __classPrivateFieldGet(this, _ConfirmBoxEvokeService_instances, "m", _ConfirmBoxEvokeService_extender).call(this, title, message, confirmLabel, declineLabel);
        confirmBox.setConfig({
            layoutType: DialogLayoutDisplay.CUSTOM_THREE
        });
        return confirmBox.openConfirmBox$();
    }
    customFour(title, message, confirmLabel, declineLabel) {
        const confirmBox = __classPrivateFieldGet(this, _ConfirmBoxEvokeService_instances, "m", _ConfirmBoxEvokeService_extender).call(this, title, message, confirmLabel, declineLabel);
        confirmBox.setConfig({
            layoutType: DialogLayoutDisplay.CUSTOM_FOUR
        });
        return confirmBox.openConfirmBox$();
    }
    customFive(title, message, confirmLabel, declineLabel) {
        const confirmBox = __classPrivateFieldGet(this, _ConfirmBoxEvokeService_instances, "m", _ConfirmBoxEvokeService_extender).call(this, title, message, confirmLabel, declineLabel);
        confirmBox.setConfig({
            layoutType: DialogLayoutDisplay.CUSTOM_FIVE
        });
        return confirmBox.openConfirmBox$();
    }
}
_ConfirmBoxEvokeService_instances = new WeakSet(), _ConfirmBoxEvokeService_extender = function _ConfirmBoxEvokeService_extender(title, message, confirmLabel, declineLabel) {
    const confirmBox = new ConfirmBoxInitializer();
    confirmBox.setTitle(title);
    confirmBox.setMessage(message);
    confirmBox.setButtonLabels(confirmLabel, declineLabel);
    return confirmBox;
};
ConfirmBoxEvokeService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ConfirmBoxEvokeService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ConfirmBoxEvokeService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ConfirmBoxEvokeService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ConfirmBoxEvokeService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

var _ToastEvokeService_instances, _ToastEvokeService_extender;
class ToastEvokeService {
    constructor() {
        _ToastEvokeService_instances.add(this);
    }
    success(title, message, confirmLabel, declineLabel) {
        const toast = __classPrivateFieldGet(this, _ToastEvokeService_instances, "m", _ToastEvokeService_extender).call(this, title, message, confirmLabel, declineLabel);
        toast.setConfig({
            layoutType: DialogLayoutDisplay.SUCCESS
        });
        return toast.openToastNotification$();
    }
    info(title, message, confirmLabel, declineLabel) {
        const toast = __classPrivateFieldGet(this, _ToastEvokeService_instances, "m", _ToastEvokeService_extender).call(this, title, message, confirmLabel, declineLabel);
        toast.setConfig({
            layoutType: DialogLayoutDisplay.INFO
        });
        return toast.openToastNotification$();
    }
    warning(title, message, confirmLabel, declineLabel) {
        const toast = __classPrivateFieldGet(this, _ToastEvokeService_instances, "m", _ToastEvokeService_extender).call(this, title, message, confirmLabel, declineLabel);
        toast.setConfig({
            layoutType: DialogLayoutDisplay.WARNING
        });
        return toast.openToastNotification$();
    }
    danger(title, message, confirmLabel, declineLabel) {
        const toast = __classPrivateFieldGet(this, _ToastEvokeService_instances, "m", _ToastEvokeService_extender).call(this, title, message, confirmLabel, declineLabel);
        toast.setConfig({
            layoutType: DialogLayoutDisplay.DANGER
        });
        return toast.openToastNotification$();
    }
    customOne(title, message, confirmLabel, declineLabel) {
        const toast = __classPrivateFieldGet(this, _ToastEvokeService_instances, "m", _ToastEvokeService_extender).call(this, title, message, confirmLabel, declineLabel);
        toast.setConfig({
            layoutType: DialogLayoutDisplay.CUSTOM_ONE
        });
        return toast.openToastNotification$();
    }
    customTwo(title, message, confirmLabel, declineLabel) {
        const toast = __classPrivateFieldGet(this, _ToastEvokeService_instances, "m", _ToastEvokeService_extender).call(this, title, message, confirmLabel, declineLabel);
        toast.setConfig({
            layoutType: DialogLayoutDisplay.CUSTOM_TWO
        });
        return toast.openToastNotification$();
    }
    customThree(title, message, confirmLabel, declineLabel) {
        const toast = __classPrivateFieldGet(this, _ToastEvokeService_instances, "m", _ToastEvokeService_extender).call(this, title, message, confirmLabel, declineLabel);
        toast.setConfig({
            layoutType: DialogLayoutDisplay.CUSTOM_THREE
        });
        return toast.openToastNotification$();
    }
    customFour(title, message, confirmLabel, declineLabel) {
        const toast = __classPrivateFieldGet(this, _ToastEvokeService_instances, "m", _ToastEvokeService_extender).call(this, title, message, confirmLabel, declineLabel);
        toast.setConfig({
            layoutType: DialogLayoutDisplay.CUSTOM_FOUR
        });
        return toast.openToastNotification$();
    }
    customFive(title, message, confirmLabel, declineLabel) {
        const toast = __classPrivateFieldGet(this, _ToastEvokeService_instances, "m", _ToastEvokeService_extender).call(this, title, message, confirmLabel, declineLabel);
        toast.setConfig({
            layoutType: DialogLayoutDisplay.CUSTOM_FIVE
        });
        return toast.openToastNotification$();
    }
}
_ToastEvokeService_instances = new WeakSet(), _ToastEvokeService_extender = function _ToastEvokeService_extender(title, message, confirmLabel, declineLabel) {
    const toast = new ToastNotificationInitializer();
    toast.setTitle(title);
    toast.setMessage(message);
    toast.setButtonLabels(confirmLabel, declineLabel);
    return toast;
};
ToastEvokeService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ToastEvokeService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ToastEvokeService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ToastEvokeService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ToastEvokeService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

export { AppearanceAnimation, ButtonLayoutDisplay, ButtonMaker, ConfirmBoxConfigModule, ConfirmBoxEvokeService, ConfirmBoxInitializer, DialogBelonging, DialogConfigModule, DialogInitializer, DialogLayoutDisplay, DisappearanceAnimation, NgxAwesomePopupModule, ResetGlobalConfig, ResetToastGlobalSettings, ToastEvokeService, ToastNotificationConfigModule, ToastNotificationInitializer, ToastPositionEnum, ToastProgressBarEnum, ToastUserViewTypeEnum };
//# sourceMappingURL=costlydeveloper-ngx-awesome-popup.mjs.map
