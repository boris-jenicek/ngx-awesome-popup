import { Observable, Subject } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import * as i0 from '@angular/core';
import { Injectable, Inject, Component, ChangeDetectorRef, ComponentFactoryResolver, Injector, ApplicationRef, Directive, ViewContainerRef, ViewChild, NgModule } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

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

var GlobalClass;
(function (GlobalClass) {
    class Message {
        constructor() {
            this.Title = null;
            this.Description = null;
        }
    }
    GlobalClass.Message = Message;
    class ButtonMaker {
        constructor(Label, ID, LayoutType = ButtonLayoutDisplay.PRIMARY) {
            this.Label = Label;
            this.ID = ID;
            this.LayoutType = LayoutType;
        }
    }
    GlobalClass.ButtonMaker = ButtonMaker;
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
            this.IsBaseBright = null;
            if (this.Base = this.isColor(_Color)) {
                this.Brighten = this.brightness(this.Base, 'brighten', 20);
                this.BrightenForShade = this.brightness(this.Base, 'brighten', 10);
                this.Darken = this.brightness(this.Base, 'darken', 20);
                this.DarkenForShade = this.brightness(this.Base, 'darken', 10);
                const luminance = Math.floor(this.luminance(this.Base) * 100);
                const darken = luminance > 50 ? 5 : (luminance > 40 ? 10 : (luminance > 20 ? 15 : luminance));
                const brighten = luminance > 55 ? 65 : (luminance > 45 ? 60 : (luminance > 20 ? 55 : (luminance > 10 ? 45 : 80)));
                this.BrightShade = this.brightness(this.brightness(this.Base, 'darken', darken), 'brighten', brighten);
                this.TransparentDarkenVariance = this.brightness(this.transparentize(this.Base, 80), 'darken', 40);
                if (this.isBright(this.Base)) {
                    this.ContrastColor = 'rgb(52, 58, 64)';
                    this.IsBaseBright = true;
                }
                else {
                    this.ContrastColor = 'rgb(255,255,255)';
                    this.IsBaseBright = false;
                }
                /*         console.log('%c Color ', `background: ${this.BrightShade}; color: ${this.ContrastColor}`, luminance, darken, brighten);
                           console.log('%c Brighten ', `background: ${this.Brighten}; color: ${this.ContrastColor}`, this.Brighten);
                           console.log('%c BrightenForShade ', `background: ${this.BrightenForShade}; color: ${this.ContrastColor}`, this.BrightenForShade);
                           console.log('%c Darken ', `background: ${this.Darken}; color: ${this.ContrastColor}`, this.Darken);
                           console.log('%c DarkenForShade ', `background: ${this.DarkenForShade}; color: ${this.ContrastColor}`, this.DarkenForShade);*/
            }
        }
        isBright(_Rgb) {
            return this.contrast(this.luminance(_Rgb));
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
            const amount = _Percentage / 100 * 255;
            let returnList = [];
            if (_Action === 'brighten') {
                returnList[lowest.index] = Math.round(lowest.val + (Math.min(255 - lowest.val, amount)));
                const increaseFraction = (returnList[lowest.index] - lowest.val) / (255 - lowest.val);
                returnList[middle.index] = middle.val + (255 - middle.val) * increaseFraction;
                returnList[highest.index] = highest.val + (255 - highest.val) * increaseFraction;
            }
            if (_Action === 'darken') {
                returnList[highest.index] = highest.val - (Math.min(highest.val, amount));
                const decreaseFraction = (highest.val - returnList[highest.index]) / (highest.val);
                returnList[middle.index] = middle.val - middle.val * decreaseFraction;
                returnList[lowest.index] = lowest.val - lowest.val * decreaseFraction;
            }
            returnList = returnList.map(item => Math.round(item));
            if (rgbIntArray.length > 3) {
                returnList.push(rgbIntArray[3]);
                return (`rgba(${returnList.join()})`);
            }
            return (`rgb(${returnList.join()})`);
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
            const middleIndex = (3 - highest.index - lowest.index);
            let middle = { val: rgbArrayWithoutAlpha[middleIndex], index: middleIndex };
            return [lowest, middle, highest];
        }
        contrast(_Luminance) {
            const brightest = Math.max(1.05, _Luminance + 0.05);
            const darkest = Math.min(1.05, _Luminance + 0.05);
            const contrast = (brightest) / (darkest);
            return contrast < 3;
        }
        isColor(_StrColor) {
            const CSSDeclaration = new Option().style;
            CSSDeclaration.color = _StrColor;
            return !!CSSDeclaration.color ? CSSDeclaration.color : null;
        }
        getRGBArray(_Rgb) {
            return _Rgb.replace(/^(rgb|rgba)\(/, '').replace(/\)$/, '').replace(/\s/g, '').split(',').map(x => +x);
        }
        luminance(_Rgb) {
            const rgbIntArray = this.getRGBArray(_Rgb);
            const W3algorithm = rgbIntArray.map(item => {
                item /= 255;
                return item <= 0.03928
                    ? item / 12.92
                    : Math.pow((item + 0.055) / 1.055, 2.4);
            });
            return W3algorithm[0] * 0.2126 + W3algorithm[1] * 0.7152 + W3algorithm[2] * 0.0722;
        }
        transparentize(_Rgb, _Percentage) {
            const baseArray = this.Base.replace(/^(rgb|rgba)\(/, '').replace(/\)$/, '').replace(/\s/g, '').split(',').map(x => +x);
            if (baseArray.length > 3) {
                baseArray.pop();
            }
            const amount = (100 - _Percentage) / 100;
            baseArray.push(amount);
            return (`rgb(${baseArray.join()})`);
        }
    }
    GlobalClass.ColorProvider = ColorProvider;
    class DataControl {
        /**
         * @ignore
         */
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
    GlobalClass.DataControl = DataControl;
})(GlobalClass || (GlobalClass = {}));

// @dynamic
class ServiceLocator {
}

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
        this.authorConfig.ConfirmBoxCoreConfig.Width = 'auto';
        this.authorConfig.ConfirmBoxCoreConfig.Height = 'auto';
        this.authorConfig.ConfirmBoxCoreConfig.ButtonPosition = 'center';
        this.authorConfig.ConfirmBoxCoreConfig.ConfirmLabel = 'Confirm';
        this.authorConfig.ConfirmBoxCoreConfig.DeclineLabel = 'Decline';
        this.authorConfig.ConfirmBoxCoreConfig.LayoutType = DialogLayoutDisplay.NONE;
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
                providedIn: 'root'
            },] }
];
ConfirmBoxConfigService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['confirmBoxConfig',] }] }
];

function fadeInOut(_OpacityMin = 0, _OpacityMax = 1) {
    return trigger('fadeInOut', [
        // ...
        state('open', style({
            opacity: _OpacityMax
        })),
        state('closed', style({
            opacity: _OpacityMin
        })),
        transition('* => close-fast', [
            animate('0.1s')
        ]),
        transition('* => open', [
            animate('0.2s')
        ]),
        transition('* => close-slow', [
            animate('1.3s')
        ]),
        transition('* => close-instant', [
            animate('0s')
        ])
    ]);
}
;

class ConfirmBoxWrapperComponent {
    constructor(confirmBoxBelonging, cd) {
        this.confirmBoxBelonging = confirmBoxBelonging;
        this.cd = cd;
        this.fadeInOutAnimation = 'open';
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
        this.setResponse(_Type === 'confirm');
        this.confirmBoxBelonging.EventsController.close();
    }
    closeParent$(_ClosingAnimation) {
        this.fadeInOutAnimation = _ClosingAnimation;
        const timer = _ClosingAnimation === 'close-slow' ? 1400 : 150;
        return new Observable((observer) => {
            observer.next('');
            observer.complete();
        }).pipe(delay(timer));
    }
}
ConfirmBoxWrapperComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-confirm-box-wrapper',
                template: "<div class=\"ngx-awesome-popup-overlay\" (dblclick)=\"onOverlayClicked($event)\" [@fadeInOut]=\"fadeInOutAnimation\">\n\t\n\t<div class=\"evolve-confirm-box\"\n\t\t\t[ngClass]=\"{\n\t\t\t\t  'standard-dialog': confirmBoxBelonging.ConfirmBoxCoreConfig.LayoutType === 0,\n\t\t\t\t  'success-dialog': confirmBoxBelonging.ConfirmBoxCoreConfig.LayoutType === 1,\n\t\t\t\t  'info-dialog': confirmBoxBelonging.ConfirmBoxCoreConfig.LayoutType === 2,\n\t\t\t\t  'warning-dialog': confirmBoxBelonging.ConfirmBoxCoreConfig.LayoutType === 3,\n\t\t\t\t  'danger-dialog': confirmBoxBelonging.ConfirmBoxCoreConfig.LayoutType === 4\n\t\t\t\t}\" [ngStyle]=\"{'width': confirmBoxBelonging.ConfirmBoxCoreConfig.Width, 'height': confirmBoxBelonging.ConfirmBoxCoreConfig.Height}\">\n\t\t\n\t\t\t\n\t\t\t<div class=\"confirm-box-title-content\" *ngIf=\"confirmBoxBelonging.Message.Title\">\n\t\t\t\t\n\t\t\t\t<div class=\"dont-break-out\">\n\t\t\t\t\t<div class=\"text-wrapper dont-break-out\">\n\t\t\t\t\t\t<div class=\"confirm-box-title-text\">{{confirmBoxBelonging.Message.Title}}</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\n\t\t\t</div>\n\t\t\n\t\t<div class=\"content-holder\" *ngIf=\"confirmBoxBelonging.Message.Description\">\n\t\t\t\n\t\t\t<div class=\"text-wrapper-section confirm-box-inner-content\" [ngStyle]=\"{'width': confirmBoxBelonging.ConfirmBoxCoreConfig.Width, 'height': confirmBoxBelonging.ConfirmBoxCoreConfig.Height}\">\n\t\t\t\t\n\t\t\t\t<!--<div class=\"dont-break-out\" [ngClass]=\"{'text-wrapper-section-with-icon': showIcon, 'text-wrapper-section': !showIcon}\">-->\n\t\t\t\t<div class=\"dont-break-out\">\n\t\t\t\t\t<div class=\"text-wrapper dont-break-out\">{{confirmBoxBelonging.Message.Description}}</div>\n\t\t\t\t</div>\n\t\t\t\n\t\t\t</div>\n\t\t\t\n\t\t\n\t</div>\n\t\t<div class=\"button-holder\">\n\t\t\t<div class=\"button-section\" *ngIf=\"confirmBoxBelonging.Buttons.length\" [ngStyle]=\"{ 'text-align': confirmBoxBelonging.ConfirmBoxCoreConfig.ButtonPosition }\">\n\t\t\t\t\n\t\t\t\t<button\n\t\t\t\t\t\tclass=\"ed-btn ed-btn-md\" *ngFor=\"let button of confirmBoxBelonging.Buttons\" (click)=\"onCustomButton(button)\"\n\t\t\t\t\t\t[ngClass]=\"{\n\t\t\t                   '': (button.LayoutType ? (button.LayoutType === 0)  : false),\n                              'ed-btn-success': (button.LayoutType ? (button.LayoutType === 1) : false),\n                              'ed-btn-info': (button.LayoutType ? (button.LayoutType === 2) : false),\n                              'ed-btn-warning': (button.LayoutType ? (button.LayoutType === 3)  : false),\n                              'ed-btn-danger': (button.LayoutType ? (button.LayoutType === 4)  : false),\n                              'ed-btn-dark': (button.LayoutType ? (button.LayoutType === 5)  : false),\n                              'ed-btn-light': (button.LayoutType ? (button.LayoutType === 6)  : false),\n                               'ed-btn-primary': (button.LayoutType ? (button.LayoutType === 7) : false),\n                              'ed-btn-secondary': (button.LayoutType ? (button.LayoutType === 8)  : false),\n                              'ed-btn-link': (button.LayoutType ? (button.LayoutType === 9)  : false)\n                            }\"\n\t\t\t\t>{{button.Label}}</button>\n\t\t\t\n\t\t\t</div>\n\t\t\t<div class=\"button-section\" *ngIf=\"!confirmBoxBelonging.Buttons.length\" [ngStyle]=\"{ 'text-align': confirmBoxBelonging.ConfirmBoxCoreConfig.ButtonPosition }\">\n\t\t\t\t\n\t\t\t\t<button class=\"ed-btn ed-btn-md\" (click)=\"onButtonClick('confirm')\"\n\t\t\t\t        [ngClass]=\"{\n\t\t\t\t          'ed-btn-primary': confirmBoxBelonging.ConfirmBoxCoreConfig.LayoutType === 0,\n\t\t\t\t          'ed-btn-success': confirmBoxBelonging.ConfirmBoxCoreConfig.LayoutType === 1,\n\t\t\t\t          'ed-btn-info': confirmBoxBelonging.ConfirmBoxCoreConfig.LayoutType === 2,\n\t\t\t\t          'ed-btn-warning': confirmBoxBelonging.ConfirmBoxCoreConfig.LayoutType === 3,\n\t\t\t\t          'ed-btn-danger': confirmBoxBelonging.ConfirmBoxCoreConfig.LayoutType === 4\n\t\t\t\t        }\"\n\t\t\t\t>{{confirmBoxBelonging.ConfirmBoxCoreConfig.ConfirmLabel}}\n\t\t\t\t</button>\n\t\t\t\t<button (click)=\"onButtonClick('decline')\" *ngIf=\"confirmBoxBelonging.ConfirmBoxCoreConfig.DeclineLabel\" class=\"ed-btn ed-btn-md ed-btn-secondary\">\n\t\t\t\t\t{{confirmBoxBelonging.ConfirmBoxCoreConfig.DeclineLabel}}\n\t\t\t\t</button>\n\t\t\t\n\t\t\t</div>\n\t\t</div>\n\t\n\t</div>\n",
                animations: [fadeInOut(0, 1)],
                styles: [".ed-btn-sm{font-size:12px;font-weight:400;margin-right:3px;padding:2px 8px}.ed-btn-md{font-size:14px;font-weight:bolder;margin-right:5px;padding:3px 6px}.ed-btn-lg{font-size:16px;font-weight:700;margin-right:5px;padding:4px 10px}.ed-btn{background-color:initial;border:none;border-radius:3px;cursor:pointer;display:inline-block;line-height:1.5;text-align:center;text-decoration:none;-webkit-user-select:none;user-select:none;vertical-align:middle}.ed-btn:hover{color:#989ea5}.ed-btn-check:focus+.ed-btn,.ed-btn:focus{box-shadow:0 0 1px 2px;outline:0}.ed-btn-check:active+.ed-btn,.ed-btn-check:active+.ed-btn:focus,.ed-btn-check:checked+.ed-btn,.ed-btn-check:checked+.ed-btn:focus,.ed-btn.active,.ed-btn.active:focus,.ed-btn:active,.ed-btn:active:focus{box-shadow:0 0 1px 2px}.ed-btn.disabled,.ed-btn:disabled,fieldset:disabled .ed-btn{box-shadow:none;opacity:.6;pointer-events:none}.ed-btn-primary{color:#fbfbfb;background:#ff9e00;border-color:#ff9e00}.ed-btn-primary:hover{color:#fbfbfb;border-color:#ffa81a;background:#ffb133}.ed-btn-check:focus+.ed-btn-primary,.ed-btn-primary:focus{outline:0;box-shadow:0 0 1px 2px #ffa81a}.ed-btn-check:active+.ed-btn-primary,.ed-btn-check:active+.ed-btn-primary:focus,.ed-btn-check:checked+.ed-btn-primary,.ed-btn-check:checked+.ed-btn-primary:focus,.ed-btn-primary.active,.ed-btn-primary.active:focus,.ed-btn-primary:active,.ed-btn-primary:active:focus{box-shadow:0 0 1px 2px #ffa81a}.ed-btn-secondary{color:#343a40;background:#989ea5;border-color:#989ea5}.ed-btn-secondary:hover{color:#343a40;border-color:#a6abb1;background:#b3b8bd}.ed-btn-check:focus+.ed-btn-secondary,.ed-btn-secondary:focus{outline:0;box-shadow:0 0 1px 2px #a6abb1}.ed-btn-check:active+.ed-btn-secondary,.ed-btn-check:active+.ed-btn-secondary:focus,.ed-btn-check:checked+.ed-btn-secondary,.ed-btn-check:checked+.ed-btn-secondary:focus,.ed-btn-secondary.active,.ed-btn-secondary.active:focus,.ed-btn-secondary:active,.ed-btn-secondary:active:focus{box-shadow:0 0 1px 2px #a6abb1}.ed-btn-success{color:#fbfbfb;background:#3caea3;border-color:#3caea3}.ed-btn-success:hover{color:#fbfbfb;border-color:#45bfb3;background:#58c5bb}.ed-btn-check:focus+.ed-btn-success,.ed-btn-success:focus{outline:0;box-shadow:0 0 1px 2px #45bfb3}.ed-btn-check:active+.ed-btn-success,.ed-btn-check:active+.ed-btn-success:focus,.ed-btn-check:checked+.ed-btn-success,.ed-btn-check:checked+.ed-btn-success:focus,.ed-btn-success.active,.ed-btn-success.active:focus,.ed-btn-success:active,.ed-btn-success:active:focus{box-shadow:0 0 1px 2px #45bfb3}.ed-btn-info{color:#fbfbfb;background:#2f8ee5;border-color:#2f8ee5}.ed-btn-info:hover{color:#fbfbfb;border-color:#469ae8;background:#5ca7eb}.ed-btn-check:focus+.ed-btn-info,.ed-btn-info:focus{outline:0;box-shadow:0 0 1px 2px #469ae8}.ed-btn-check:active+.ed-btn-info,.ed-btn-check:active+.ed-btn-info:focus,.ed-btn-check:checked+.ed-btn-info,.ed-btn-check:checked+.ed-btn-info:focus,.ed-btn-info.active,.ed-btn-info.active:focus,.ed-btn-info:active,.ed-btn-info:active:focus{box-shadow:0 0 1px 2px #469ae8}.ed-btn-warning{color:#fbfbfb;background:#ffc107;border-color:#ffc107}.ed-btn-warning:hover{color:#fbfbfb;border-color:#ffc721;background:#ffce3a}.ed-btn-check:focus+.ed-btn-warning,.ed-btn-warning:focus{outline:0;box-shadow:0 0 1px 2px #ffc721}.ed-btn-check:active+.ed-btn-warning,.ed-btn-check:active+.ed-btn-warning:focus,.ed-btn-check:checked+.ed-btn-warning,.ed-btn-check:checked+.ed-btn-warning:focus,.ed-btn-warning.active,.ed-btn-warning.active:focus,.ed-btn-warning:active,.ed-btn-warning:active:focus{box-shadow:0 0 1px 2px #ffc721}.ed-btn-danger{color:#343a40;background:#e46464;border-color:#e46464}.ed-btn-danger:hover{color:#343a40;border-color:#e87a7a;background:#ec8f8f}.ed-btn-check:focus+.ed-btn-danger,.ed-btn-danger:focus{outline:0;box-shadow:0 0 1px 2px #e87a7a}.ed-btn-check:active+.ed-btn-danger,.ed-btn-check:active+.ed-btn-danger:focus,.ed-btn-check:checked+.ed-btn-danger,.ed-btn-check:checked+.ed-btn-danger:focus,.ed-btn-danger.active,.ed-btn-danger.active:focus,.ed-btn-danger:active,.ed-btn-danger:active:focus{box-shadow:0 0 1px 2px #e87a7a}.ed-btn-light{color:#343a40;background:#fbfbfb;border-color:#fbfbfb}.ed-btn-light:hover{color:#343a40;border-color:#fff;background:#fff}.ed-btn-check:focus+.ed-btn-light,.ed-btn-light:focus{outline:0;box-shadow:0 0 1px 2px #fff}.ed-btn-check:active+.ed-btn-light,.ed-btn-check:active+.ed-btn-light:focus,.ed-btn-check:checked+.ed-btn-light,.ed-btn-check:checked+.ed-btn-light:focus,.ed-btn-light.active,.ed-btn-light.active:focus,.ed-btn-light:active,.ed-btn-light:active:focus{box-shadow:0 0 1px 2px #fff}.ed-btn-dark{color:#fbfbfb;background:#343a40;border-color:#343a40}.ed-btn-dark:hover{color:#fbfbfb;border-color:#3f474e;background:#4b545c}.ed-btn-check:focus+.ed-btn-dark,.ed-btn-dark:focus{outline:0;box-shadow:0 0 1px 2px #3f474e}.ed-btn-check:active+.ed-btn-dark,.ed-btn-check:active+.ed-btn-dark:focus,.ed-btn-check:checked+.ed-btn-dark,.ed-btn-check:checked+.ed-btn-dark:focus,.ed-btn-dark.active,.ed-btn-dark.active:focus,.ed-btn-dark:active,.ed-btn-dark:active:focus{box-shadow:0 0 1px 2px #3f474e}.ngx-awesome-popup-overlay{align-items:center;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px);background:rgba(51,32,0,.4);bottom:0;display:flex;flex-direction:column;justify-content:center;left:0;opacity:0;position:fixed;right:0;top:0;z-index:1000}.evolve-confirm-box .text-wrapper-section,.evolve-parent-dialog .text-wrapper-section,.evolve-toast .text-wrapper-section{width:100%}.evolve-confirm-box .text-wrapper-section .text-wrapper,.evolve-parent-dialog .text-wrapper-section .text-wrapper,.evolve-toast .text-wrapper-section .text-wrapper{display:block;text-align:center;width:100%}.evolve-confirm-box .text-wrapper-section .dont-break-out,.evolve-parent-dialog .text-wrapper-section .dont-break-out,.evolve-toast .text-wrapper-section .dont-break-out{-webkit-hyphens:auto;hyphens:auto;overflow-wrap:break-word;white-space:pre-wrap;word-wrap:break-word}.evolve-confirm-box,.evolve-parent-dialog{background:#fbfbfb;border-radius:5px;border-top:7px solid;box-shadow:0 0 4px 1px rgba(0,0,0,.25);display:flex;flex-direction:column;max-height:calc(100vh - 100px);max-width:calc(100vw - 100px);position:relative;vertical-align:bottom}.evolve-confirm-box.standard-dialog,.evolve-parent-dialog.standard-dialog{border-color:transparent;padding:17px 20px 10px}.evolve-confirm-box.success-dialog,.evolve-parent-dialog.success-dialog{border-color:#3caea3}.evolve-confirm-box.info-dialog,.evolve-parent-dialog.info-dialog{border-color:#2f8ee5}.evolve-confirm-box.warning-dialog,.evolve-parent-dialog.warning-dialog{border-color:#ffc107}.evolve-confirm-box.danger-dialog,.evolve-parent-dialog.danger-dialog{border-color:#e46464}.ngx-awesome-popup-overlay .evolve-confirm-box{padding:0 20px}.ngx-awesome-popup-overlay .evolve-confirm-box .confirm-box-title-content{align-items:center;background-clip:padding-box;border-bottom:1px solid rgba(0,0,0,.05);color:#6c757d;display:flex;flex-direction:column;height:auto;justify-content:center;padding:2px 10px 5px;margin:8px 0 10px;width:auto}.ngx-awesome-popup-overlay .evolve-confirm-box .confirm-box-title-content .confirm-box-title-text{font-weight:700;font-size:18px}.ngx-awesome-popup-overlay .evolve-confirm-box .content-holder{display:flex;flex-direction:row-reverse;height:100%;overflow:auto;width:100%;color:#495057}.ngx-awesome-popup-overlay .evolve-confirm-box .content-holder .confirm-box-inner-content{padding:5px 10px}.ngx-awesome-popup-overlay .evolve-confirm-box .content-holder .text-wrapper p{margin:0}.ngx-awesome-popup-overlay .evolve-confirm-box .button-holder{display:flex;flex-direction:column;justify-content:flex-end;width:100%;margin:10px 0 8px}.ngx-awesome-popup-overlay .evolve-confirm-box .button-holder .button-section{margin:0;padding:4px 10px}"]
            },] }
];
ConfirmBoxWrapperComponent.ctorParameters = () => [
    { type: ConfirmBoxClass.ConfirmBoxBelonging },
    { type: ChangeDetectorRef }
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
        const domElem = _ComponentRef.hostView.rootNodes[0];
        document.body.appendChild(domElem);
    }
    closeDialogWrapperComponent(_DialogUniqueID) {
        const modalIndex = this.findDialogIndex(_DialogUniqueID);
        this.removeFromBodyParentComponent(modalIndex);
    }
    removeFromBodyParentComponent(_DialogIndex) {
        if (_DialogIndex > -1) {
            this.confirmBoxComponentRefList[_DialogIndex].instance.closeParent$('close-fast').pipe(map(item => {
                this.appRef.detachView(this.confirmBoxComponentRefList[_DialogIndex].hostView);
                this.confirmBoxComponentRefList[_DialogIndex].destroy();
                this.confirmBoxComponentRefList.splice(_DialogIndex, 1);
            })).subscribe();
        }
    }
    findDialogIndex(_DialogUniqueID) {
        return this.confirmBoxComponentRefList.findIndex((item) => {
            return _DialogUniqueID === item.instance.confirmBoxBelonging.EntityUniqueID;
        });
    }
}
ConfirmBoxService.ɵprov = i0.ɵɵdefineInjectable({ factory: function ConfirmBoxService_Factory() { return new ConfirmBoxService(i0.ɵɵinject(i0.ComponentFactoryResolver), i0.ɵɵinject(i0.INJECTOR), i0.ɵɵinject(i0.ApplicationRef)); }, token: ConfirmBoxService, providedIn: "root" });
ConfirmBoxService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
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
            return this.confirmBoxCarrier.openConfirmBox$().pipe(map(resp => {
                const basicConfirmBoxResponse = new ConfirmBoxResponse();
                const dataControl = new GlobalClass.DataControl();
                dataControl.copyValuesFrom(resp, basicConfirmBoxResponse);
                return basicConfirmBoxResponse;
            }));
        }
        setButtons(_Buttons) {
            this.confirmBoxCarrier.setButtons(_Buttons);
        }
        setConfig(_ConfirmBoxCoreConfig) {
            this.confirmBoxCarrier.setConfig(_ConfirmBoxCoreConfig);
        }
        setMessage(_Title, _Description = null) {
            this.confirmBoxCarrier.setTitle(_Title);
            this.confirmBoxCarrier.setDescription(_Description);
        }
        setTitle(_Title) {
            this.confirmBoxCarrier.setTitle(_Title);
        }
        setDescription(_Description) {
            this.confirmBoxCarrier.setDescription(_Description);
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
            this.confirmBoxBelonging.Message.Title = _Title;
        }
        setDescription(_Description) {
            this.confirmBoxBelonging.Message.Description = _Description;
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
            this.Message = new GlobalClass.Message();
        }
    }
    ConfirmBoxClass.Settings = Settings;
    class ConfirmBoxCoreConfig {
        constructor() {
            this.Width = null;
            this.Height = null;
            this.ButtonPosition = null;
            this.LayoutType = null;
            this.Message = null;
            this.ConfirmLabel = null;
            this.DeclineLabel = null;
        }
    }
    ConfirmBoxClass.ConfirmBoxCoreConfig = ConfirmBoxCoreConfig;
    class ConfirmBoxBelonging extends ConfirmBoxClass.Settings {
        constructor() {
            super();
            this.EntityUniqueID = 'C' + Math.random().toString(36).substr(2, 9);
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

class ToastNotificationWrapperComponent {
    constructor(toastNotificationBelonging, cd) {
        this.toastNotificationBelonging = toastNotificationBelonging;
        this.cd = cd;
        this.fadeInOutAnimation = 'open';
    }
    ngAfterViewInit() {
        this.setResponse(false);
        this.cd.detectChanges();
        this.autoClose();
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
    onOverlayClicked(evt) {
        // console.log('onOverlayClicked');
    }
    onToastClicked(evt) {
        // console.log('onOverlayClicked');
    }
    onCustomButton(_Button) {
        this.toastNotificationBelonging.EventsController.onButtonClick(_Button);
        this.setResponse(true, _Button.ID);
        this.toastNotificationBelonging.EventsController.close();
    }
    onButtonClick(_Type) {
        this.setResponse(_Type === 'confirm');
        this.toastNotificationBelonging.EventsController.close();
    }
    autoClose() {
        if (this.toastNotificationBelonging.ToastCoreConfig.AutoCloseDelay
            && !(this.toastNotificationBelonging.Buttons.length
                || this.toastNotificationBelonging.ToastCoreConfig.DeclineLabel
                || this.toastNotificationBelonging.ToastCoreConfig.ConfirmLabel)) {
            setTimeout(() => {
                this.closeParent$('close-slow').subscribe(resp => {
                    this.toastNotificationBelonging.EventsController.close();
                });
            }, this.toastNotificationBelonging.ToastCoreConfig.AutoCloseDelay);
        }
    }
    closeParent$(_ClosingAnimation) {
        this.fadeInOutAnimation = _ClosingAnimation;
        const timer = _ClosingAnimation === 'close-slow' ? 1400 : 150;
        return new Observable((observer) => {
            observer.next('');
            observer.complete();
        }).pipe(delay(timer));
    }
    close() {
        this.toastNotificationBelonging.EventsController.close();
    }
}
ToastNotificationWrapperComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-toast-notification-wrapper',
                template: "<div class=\"overlay-toast\" (dblclick)=\"onOverlayClicked($event)\" [@fadeInOut]=\"fadeInOutAnimation\">\n\t\n\t<div\n\t\t\tclass=\"evolve-toast\" (click)=\"onToastClicked($event)\" [ngClass]=\"{\n          'standard-dialog': 0 === toastNotificationBelonging.ToastCoreConfig.LayoutType,\n          'success-dialog': 1 === toastNotificationBelonging.ToastCoreConfig.LayoutType,\n          'info-dialog': 2 === toastNotificationBelonging.ToastCoreConfig.LayoutType,\n          'warning-dialog': 3 === toastNotificationBelonging.ToastCoreConfig.LayoutType,\n          'danger-dialog': 4 === toastNotificationBelonging.ToastCoreConfig.LayoutType\n        }\"\n\t\t\t[ngStyle]=\"{'width': toastNotificationBelonging.ToastCoreConfig.Width, 'height': toastNotificationBelonging.ToastCoreConfig.Height}\"\n\t>\n\t\t<div class=\"toast-title-content\" *ngIf=\"toastNotificationBelonging.Message.Title\">\n\t\t\t\n\t\t\t<div class=\"dont-break-out\">\n\t\t\t\t<div class=\"text-wrapper dont-break-out\">\n\t\t\t\t\t<div class=\"toast-title-text\">{{toastNotificationBelonging.Message.Title}}</div>\n\t\t\t\t\t<div class=\"close-ico\" (click)=\"close()\"\n\t\t\t\t\t\t\t*ngIf=\"\n\t\t\t\t\t     !toastNotificationBelonging.Buttons.length\n\t\t\t\t\t     && !toastNotificationBelonging.ToastCoreConfig.DeclineLabel\n\t\t\t\t\t     && !toastNotificationBelonging.ToastCoreConfig.ConfirmLabel\n\t\t\t\t\t     \"\n\t\t\t\t\t></div>\n\t\t\t\t\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\n\t\t</div>\n\t\t\n\t\t<div class=\"content-holder\" *ngIf=\"toastNotificationBelonging.Message.Description\">\n\t\t\t\n\t\t\t<div class=\"text-wrapper-section toast-inner-content\" [ngStyle]=\"{'width': toastNotificationBelonging.ToastCoreConfig.Width, 'height': toastNotificationBelonging.ToastCoreConfig.Height}\">\n\t\t\t\t\n\t\t\t\t<!--<div class=\"dont-break-out\" [ngClass]=\"{'text-wrapper-section-with-icon': showIcon, 'text-wrapper-section': !showIcon}\">-->\n\t\t\t\t<div class=\"dont-break-out\">\n\t\t\t\t\t<div class=\"text-wrapper dont-break-out\"><p>{{toastNotificationBelonging.Message.Description}}</p></div>\n\t\t\t\t</div>\n\t\t\t\n\t\t\t</div>\n\t\t\t\n\t\t\t<div class=\"close-ico\" (click)=\"close()\"\n\t\t\t     *ngIf=\"\n\t\t\t\t\t     !toastNotificationBelonging.Buttons.length\n\t\t\t\t\t     && !toastNotificationBelonging.ToastCoreConfig.DeclineLabel\n\t\t\t\t\t     && !toastNotificationBelonging.ToastCoreConfig.ConfirmLabel\n\t\t\t\t\t     && !toastNotificationBelonging.Message.Title\n\t\t\t\t\t     \"\n\t\t\t></div>\n\t\t\t\n\t\t</div>\n\t\t\n\t\t<div class=\"button-holder\">\n\t\t\t<div class=\"button-section\" *ngIf=\"toastNotificationBelonging.Buttons.length\" [ngStyle]=\"{ 'text-align': toastNotificationBelonging.ToastCoreConfig.ButtonPosition }\">\n\t\t\t\t\n\t\t\t\t<button\n\t\t\t\t\t\tclass=\"ed-btn ed-btn-sm\" *ngFor=\"let button of toastNotificationBelonging.Buttons\" (click)=\"onCustomButton(button)\"\n\t\t\t\t\t\t[ngClass]=\"{\n\t\t\t                   '': (button.LayoutType ? (button.LayoutType === 0)  : false),\n                              'ed-btn-success': (button.LayoutType ? (button.LayoutType === 1) : false),\n                              'ed-btn-info': (button.LayoutType ? (button.LayoutType === 2) : false),\n                              'ed-btn-warning': (button.LayoutType ? (button.LayoutType === 3)  : false),\n                              'ed-btn-danger': (button.LayoutType ? (button.LayoutType === 4)  : false),\n                              'ed-btn-dark': (button.LayoutType ? (button.LayoutType === 5)  : false),\n                              'ed-btn-light': (button.LayoutType ? (button.LayoutType === 6)  : false),\n                               'ed-btn-primary': (button.LayoutType ? (button.LayoutType === 7) : false),\n                              'ed-btn-secondary': (button.LayoutType ? (button.LayoutType === 8)  : false),\n                              'ed-btn-link': (button.LayoutType ? (button.LayoutType === 9)  : false)\n                            }\"\n\t\t\t\t>{{button.Label}}\n\t\t\t\t</button>\n\t\t\t</div>\n\t\t\t\n\t\t\t<div\n\t\t\t\t\tclass=\"button-section\" [ngStyle]=\"{ 'text-align': toastNotificationBelonging.ToastCoreConfig.ButtonPosition }\"\n\t\t\t\t\t*ngIf=\"\n\t\t\t     !toastNotificationBelonging.Buttons.length\n\t\t\t     && (\n\t\t\t      toastNotificationBelonging.ToastCoreConfig.DeclineLabel\n\t\t\t      ||  toastNotificationBelonging.ToastCoreConfig.ConfirmLabel\n\t\t\t     )\"\n\t\t\t>\n\t\t\t\t\n\t\t\t\t<button\n\t\t\t\t\t\t*ngIf=\"toastNotificationBelonging.ToastCoreConfig.ConfirmLabel\"\n\t\t\t\t\t\tclass=\"ed-btn ed-btn-sm\" (click)=\"onButtonClick('confirm')\"\n\t\t\t\t\t\t[ngClass]=\"{\n\t\t\t\t          'ed-btn-primary': toastNotificationBelonging.ToastCoreConfig.LayoutType === 0,\n\t\t\t\t          'ed-btn-success': toastNotificationBelonging.ToastCoreConfig.LayoutType === 1,\n\t\t\t\t          'ed-btn-info': toastNotificationBelonging.ToastCoreConfig.LayoutType === 2,\n\t\t\t\t          'ed-btn-warning': toastNotificationBelonging.ToastCoreConfig.LayoutType === 3,\n\t\t\t\t          'ed-btn-danger': toastNotificationBelonging.ToastCoreConfig.LayoutType === 4\n\t\t\t\t        }\"\n\t\t\t\t>{{toastNotificationBelonging.ToastCoreConfig.ConfirmLabel}}\n\t\t\t\t</button>\n\t\t\t\t<button class=\"ed-btn ed-btn-sm ed-btn-secondary\" (click)=\"onButtonClick('decline')\" *ngIf=\"toastNotificationBelonging.ToastCoreConfig.DeclineLabel\">\n\t\t\t\t\t{{toastNotificationBelonging.ToastCoreConfig.DeclineLabel}}\n\t\t\t\t</button>\n\t\t\t\n\t\t\t</div>\n\t\t</div>\n\t\n\t</div>\n\n</div>\n",
                animations: [fadeInOut(0, 1)],
                styles: ["@charset \"UTF-8\";.ed-btn-sm{font-size:12px;font-weight:400;margin-right:3px;padding:2px 8px}.ed-btn-md{font-size:14px;font-weight:bolder;margin-right:5px;padding:3px 6px}.ed-btn-lg{font-size:16px;font-weight:700;margin-right:5px;padding:4px 10px}.ed-btn{background-color:initial;border:none;border-radius:3px;cursor:pointer;display:inline-block;line-height:1.5;text-align:center;text-decoration:none;-webkit-user-select:none;user-select:none;vertical-align:middle}.ed-btn:hover{color:#989ea5}.ed-btn-check:focus+.ed-btn,.ed-btn:focus{box-shadow:0 0 1px 2px;outline:0}.ed-btn-check:active+.ed-btn,.ed-btn-check:active+.ed-btn:focus,.ed-btn-check:checked+.ed-btn,.ed-btn-check:checked+.ed-btn:focus,.ed-btn.active,.ed-btn.active:focus,.ed-btn:active,.ed-btn:active:focus{box-shadow:0 0 1px 2px}.ed-btn.disabled,.ed-btn:disabled,fieldset:disabled .ed-btn{box-shadow:none;opacity:.6;pointer-events:none}.ed-btn-primary{color:#fbfbfb;background:#ff9e00;border-color:#ff9e00}.ed-btn-primary:hover{color:#fbfbfb;border-color:#ffa81a;background:#ffb133}.ed-btn-check:focus+.ed-btn-primary,.ed-btn-primary:focus{outline:0;box-shadow:0 0 1px 2px #ffa81a}.ed-btn-check:active+.ed-btn-primary,.ed-btn-check:active+.ed-btn-primary:focus,.ed-btn-check:checked+.ed-btn-primary,.ed-btn-check:checked+.ed-btn-primary:focus,.ed-btn-primary.active,.ed-btn-primary.active:focus,.ed-btn-primary:active,.ed-btn-primary:active:focus{box-shadow:0 0 1px 2px #ffa81a}.ed-btn-secondary{color:#343a40;background:#989ea5;border-color:#989ea5}.ed-btn-secondary:hover{color:#343a40;border-color:#a6abb1;background:#b3b8bd}.ed-btn-check:focus+.ed-btn-secondary,.ed-btn-secondary:focus{outline:0;box-shadow:0 0 1px 2px #a6abb1}.ed-btn-check:active+.ed-btn-secondary,.ed-btn-check:active+.ed-btn-secondary:focus,.ed-btn-check:checked+.ed-btn-secondary,.ed-btn-check:checked+.ed-btn-secondary:focus,.ed-btn-secondary.active,.ed-btn-secondary.active:focus,.ed-btn-secondary:active,.ed-btn-secondary:active:focus{box-shadow:0 0 1px 2px #a6abb1}.ed-btn-success{color:#fbfbfb;background:#3caea3;border-color:#3caea3}.ed-btn-success:hover{color:#fbfbfb;border-color:#45bfb3;background:#58c5bb}.ed-btn-check:focus+.ed-btn-success,.ed-btn-success:focus{outline:0;box-shadow:0 0 1px 2px #45bfb3}.ed-btn-check:active+.ed-btn-success,.ed-btn-check:active+.ed-btn-success:focus,.ed-btn-check:checked+.ed-btn-success,.ed-btn-check:checked+.ed-btn-success:focus,.ed-btn-success.active,.ed-btn-success.active:focus,.ed-btn-success:active,.ed-btn-success:active:focus{box-shadow:0 0 1px 2px #45bfb3}.ed-btn-info{color:#fbfbfb;background:#2f8ee5;border-color:#2f8ee5}.ed-btn-info:hover{color:#fbfbfb;border-color:#469ae8;background:#5ca7eb}.ed-btn-check:focus+.ed-btn-info,.ed-btn-info:focus{outline:0;box-shadow:0 0 1px 2px #469ae8}.ed-btn-check:active+.ed-btn-info,.ed-btn-check:active+.ed-btn-info:focus,.ed-btn-check:checked+.ed-btn-info,.ed-btn-check:checked+.ed-btn-info:focus,.ed-btn-info.active,.ed-btn-info.active:focus,.ed-btn-info:active,.ed-btn-info:active:focus{box-shadow:0 0 1px 2px #469ae8}.ed-btn-warning{color:#fbfbfb;background:#ffc107;border-color:#ffc107}.ed-btn-warning:hover{color:#fbfbfb;border-color:#ffc721;background:#ffce3a}.ed-btn-check:focus+.ed-btn-warning,.ed-btn-warning:focus{outline:0;box-shadow:0 0 1px 2px #ffc721}.ed-btn-check:active+.ed-btn-warning,.ed-btn-check:active+.ed-btn-warning:focus,.ed-btn-check:checked+.ed-btn-warning,.ed-btn-check:checked+.ed-btn-warning:focus,.ed-btn-warning.active,.ed-btn-warning.active:focus,.ed-btn-warning:active,.ed-btn-warning:active:focus{box-shadow:0 0 1px 2px #ffc721}.ed-btn-danger{color:#343a40;background:#e46464;border-color:#e46464}.ed-btn-danger:hover{color:#343a40;border-color:#e87a7a;background:#ec8f8f}.ed-btn-check:focus+.ed-btn-danger,.ed-btn-danger:focus{outline:0;box-shadow:0 0 1px 2px #e87a7a}.ed-btn-check:active+.ed-btn-danger,.ed-btn-check:active+.ed-btn-danger:focus,.ed-btn-check:checked+.ed-btn-danger,.ed-btn-check:checked+.ed-btn-danger:focus,.ed-btn-danger.active,.ed-btn-danger.active:focus,.ed-btn-danger:active,.ed-btn-danger:active:focus{box-shadow:0 0 1px 2px #e87a7a}.ed-btn-light{color:#343a40;background:#fbfbfb;border-color:#fbfbfb}.ed-btn-light:hover{color:#343a40;border-color:#fff;background:#fff}.ed-btn-check:focus+.ed-btn-light,.ed-btn-light:focus{outline:0;box-shadow:0 0 1px 2px #fff}.ed-btn-check:active+.ed-btn-light,.ed-btn-check:active+.ed-btn-light:focus,.ed-btn-check:checked+.ed-btn-light,.ed-btn-check:checked+.ed-btn-light:focus,.ed-btn-light.active,.ed-btn-light.active:focus,.ed-btn-light:active,.ed-btn-light:active:focus{box-shadow:0 0 1px 2px #fff}.ed-btn-dark{color:#fbfbfb;background:#343a40;border-color:#343a40}.ed-btn-dark:hover{color:#fbfbfb;border-color:#3f474e;background:#4b545c}.ed-btn-check:focus+.ed-btn-dark,.ed-btn-dark:focus{outline:0;box-shadow:0 0 1px 2px #3f474e}.ed-btn-check:active+.ed-btn-dark,.ed-btn-check:active+.ed-btn-dark:focus,.ed-btn-check:checked+.ed-btn-dark,.ed-btn-check:checked+.ed-btn-dark:focus,.ed-btn-dark.active,.ed-btn-dark.active:focus,.ed-btn-dark:active,.ed-btn-dark:active:focus{box-shadow:0 0 1px 2px #3f474e}.ngx-awesome-popup-overlay{align-items:center;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px);background:rgba(51,32,0,.4);bottom:0;display:flex;flex-direction:column;justify-content:center;left:0;opacity:0;position:fixed;right:0;top:0;z-index:1000}.evolve-confirm-box .text-wrapper-section,.evolve-parent-dialog .text-wrapper-section,.evolve-toast .text-wrapper-section{width:100%}.evolve-confirm-box .text-wrapper-section .text-wrapper,.evolve-parent-dialog .text-wrapper-section .text-wrapper,.evolve-toast .text-wrapper-section .text-wrapper{display:block;text-align:center;width:100%}.evolve-confirm-box .text-wrapper-section .dont-break-out,.evolve-parent-dialog .text-wrapper-section .dont-break-out,.evolve-toast .text-wrapper-section .dont-break-out{-webkit-hyphens:auto;hyphens:auto;overflow-wrap:break-word;white-space:pre-wrap;word-wrap:break-word}.evolve-confirm-box,.evolve-parent-dialog{background:#fbfbfb;border-radius:5px;border-top:7px solid;box-shadow:0 0 4px 1px rgba(0,0,0,.25);display:flex;flex-direction:column;max-height:calc(100vh - 100px);max-width:calc(100vw - 100px);position:relative;vertical-align:bottom}.evolve-confirm-box.standard-dialog,.evolve-parent-dialog.standard-dialog{border-color:transparent;padding:17px 20px 10px}.evolve-confirm-box.success-dialog,.evolve-parent-dialog.success-dialog{border-color:#3caea3}.evolve-confirm-box.info-dialog,.evolve-parent-dialog.info-dialog{border-color:#2f8ee5}.evolve-confirm-box.warning-dialog,.evolve-parent-dialog.warning-dialog{border-color:#ffc107}.evolve-confirm-box.danger-dialog,.evolve-parent-dialog.danger-dialog{border-color:#e46464}.overlay-toast{background:transparent;margin:0;opacity:0;padding:0;z-index:0}.overlay-toast,.overlay-toast .evolve-toast{display:flex;flex-direction:column;position:relative}.overlay-toast .evolve-toast{background:#fbfbfb;border-radius:5px;border-right:4px solid;box-shadow:0 0 4px 1px rgba(0,0,0,.25);margin-left:auto;margin-top:10px;max-height:350px;max-width:350px;min-width:200px;vertical-align:bottom}.overlay-toast .evolve-toast.standard-dialog{border-color:transparent}.overlay-toast .evolve-toast.success-dialog{background-color:#dcf3f1;border-color:#3caea3}.overlay-toast .evolve-toast.info-dialog{background-color:#e4f1fc;border-color:#2f8ee5}.overlay-toast .evolve-toast.warning-dialog{background-color:#fff4d3;border-color:#ffc107}.overlay-toast .evolve-toast.danger-dialog{background-color:#f7d1d1;border-color:#e46464}.overlay-toast .evolve-toast .close-ico{background:rgba(0,0,0,.2);border-radius:50%;cursor:pointer;height:18px;position:absolute;right:6px;top:6px;width:18px}.overlay-toast .evolve-toast div.close-ico:after{color:hsla(0,0%,100%,.5);content:\"\u00D7\";font-size:15px;left:5px;position:relative;text-align:center;top:-1px}.overlay-toast .evolve-toast .toast-title-content{align-items:flex-start;background-clip:padding-box;background-color:hsla(0,0%,100%,.55);border-bottom:1px solid rgba(0,0,0,.05);border-radius:5px 5px 0 0;color:#6c757d;display:flex;flex-direction:column;height:auto;justify-content:flex-start;padding:5px 10px;width:auto}.overlay-toast .evolve-toast .toast-title-content .toast-title-text{font-weight:700}.overlay-toast .evolve-toast .content-holder{display:flex;flex-direction:row-reverse;height:100%;overflow:auto;width:100%;color:#495057}.overlay-toast .evolve-toast .content-holder .toast-inner-content{padding:5px 10px}.overlay-toast .evolve-toast .content-holder .text-wrapper p{margin:0}.overlay-toast .evolve-toast .button-holder{display:flex;flex-direction:column;justify-content:flex-end;width:100%}.overlay-toast .evolve-toast .button-holder .button-section{margin:0;padding:4px 10px}"]
            },] }
];
ToastNotificationWrapperComponent.ctorParameters = () => [
    { type: ToastNotificationClass.ToastNotificationBelonging },
    { type: ChangeDetectorRef }
];

class ToastNotificationConfigService {
    constructor(userConfig = {}) {
        this.userConfig = userConfig;
        this.authorConfig = new ToastNotificationClass.Settings();
        this.productionConfig = new ToastNotificationClass.Settings();
        // region *** confirmBox userConfig (user input app-module) ***
        const userConfigBase = new ToastNotificationClass.Settings();
        const dataControl = new GlobalClass.DataControl();
        dataControl.copyValuesFrom(userConfig.ToastCoreConfig, userConfigBase.ToastCoreConfig); // this will make sure that object has right properties
        userConfig.ToastCoreConfig = userConfigBase.ToastCoreConfig;
        // endregion
        // region *** author default config values (if there is no user input) ***
        this.authorConfig.ToastCoreConfig.Width = 'auto';
        this.authorConfig.ToastCoreConfig.Height = 'auto';
        this.authorConfig.ToastCoreConfig.ButtonPosition = 'right';
        // this.authorConfig.ToastCoreConfig.ConfirmLabel   = 'Confirm';
        // this.authorConfig.ToastCoreConfig.DeclineLabel   = 'Decline';
        this.authorConfig.ToastCoreConfig.AutoCloseDelay = 2500;
        this.authorConfig.ToastCoreConfig.LayoutType = DialogLayoutDisplay.NONE;
        this.authorConfig.GlobalSettings.AllowedMessagesAtOnce = 5;
        // endregion
        // region *** Production setup ***
        dataControl.copyValuesFrom(this.authorConfig.GlobalSettings, this.productionConfig.GlobalSettings);
        dataControl.copyValuesFrom(userConfig.GlobalSettings, this.productionConfig.GlobalSettings);
        dataControl.copyValuesFrom(this.authorConfig.ToastCoreConfig, this.productionConfig.ToastCoreConfig);
        dataControl.copyValuesFrom(userConfig.ToastCoreConfig, this.productionConfig.ToastCoreConfig);
        // endregion
    }
}
ToastNotificationConfigService.ɵprov = i0.ɵɵdefineInjectable({ factory: function ToastNotificationConfigService_Factory() { return new ToastNotificationConfigService(i0.ɵɵinject("toastNotificationConfig")); }, token: ToastNotificationConfigService, providedIn: "root" });
ToastNotificationConfigService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
ToastNotificationConfigService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['toastNotificationConfig',] }] }
];

class ToastNotificationService {
    constructor(componentFactoryResolver, injector, appRef, toastConfig) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.injector = injector;
        this.appRef = appRef;
        this.toastConfig = toastConfig;
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
            componentRef.instance.toastNotificationBelonging = _ToastRawInstance.ToastBelonging;
            this.appendToBodyParentComponent(componentRef);
        }
    }
    isRefListAvailable() {
        return this.toastComponentRefList.length < this.toastConfig.productionConfig.GlobalSettings.AllowedMessagesAtOnce;
    }
    prepareRawToast(_EventsController, _ToastNotificationBelonging) {
        const weakMap = new WeakMap();
        weakMap.set(ToastNotificationClass.ToastNotificationEventsController, _EventsController);
        return {
            WeakMap: weakMap,
            ToastBelonging: _ToastNotificationBelonging
        };
    }
    getComponentRef(_ToastNotificationRawState) {
        const dialogIndex = this.findDialogIndex(_ToastNotificationRawState.ToastBelonging.EntityUniqueID);
        if (dialogIndex === -1) {
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ToastNotificationWrapperComponent);
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
        // DOM
        const domElem = _ComponentRef.hostView.rootNodes[0];
        const targetNode = document.getElementById('toast-wrapper');
        const toastEntity = document.createElement('div');
        toastEntity.setAttribute('id', _ComponentRef.instance.toastNotificationBelonging.EntityUniqueID);
        toastEntity.className = 'toast-entity';
        toastEntity.prepend(domElem);
        // targetNode.prepend(toastEntity);
        setTimeout(() => {
            targetNode.appendChild(toastEntity);
        }, 200);
    }
    removeFromBody(_EntityUniqueID) {
        const modalIndex = this.findDialogIndex(_EntityUniqueID);
        if (modalIndex > -1) {
            if (this.bufferToastRawList.length) {
                this.sendToProduction(this.bufferToastRawList[0]);
                this.bufferToastRawList.splice(0, 1);
            }
            this.toastComponentRefList[modalIndex].instance.closeParent$('close-fast').pipe(map(item => {
                const modalIndex = this.findDialogIndex(_EntityUniqueID);
                if (this.toastComponentRefList[modalIndex]) {
                    const toastEntity = document.getElementById(this.toastComponentRefList[modalIndex].instance.toastNotificationBelonging.EntityUniqueID);
                    toastEntity.remove();
                    // console.log(`%c ${this.toastComponentRefList[modalIndex].instance.toastNotificationBelonging.EntityUniqueID} `, `background: #cc3333; color: #fff`);
                    this.appRef.detachView(this.toastComponentRefList[modalIndex].hostView);
                    this.toastComponentRefList[modalIndex].destroy();
                    this.toastComponentRefList.splice(modalIndex, 1);
                }
            })).subscribe();
        }
    }
    findDialogIndex(_DialogUniqueID) {
        return this.toastComponentRefList.findIndex((item) => {
            return _DialogUniqueID === item.instance.toastNotificationBelonging.EntityUniqueID;
        });
    }
}
ToastNotificationService.ɵprov = i0.ɵɵdefineInjectable({ factory: function ToastNotificationService_Factory() { return new ToastNotificationService(i0.ɵɵinject(i0.ComponentFactoryResolver), i0.ɵɵinject(i0.INJECTOR), i0.ɵɵinject(i0.ApplicationRef), i0.ɵɵinject(ToastNotificationConfigService)); }, token: ToastNotificationService, providedIn: "root" });
ToastNotificationService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
ToastNotificationService.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: Injector },
    { type: ApplicationRef },
    { type: ToastNotificationConfigService }
];

var ToastNotificationClass;
(function (ToastNotificationClass) {
    // region *** Public ***
    class ToastNotificationInitializer {
        constructor() {
            this.toastNotificationCarrier = new ToastNotificationClass.ToastNotificationCarrier();
        }
        openToastNotification$() {
            return this.toastNotificationCarrier.openToastNotification$().pipe(map(resp => {
                const basicToastNotificationResponse = new ToastNotificationResponse();
                const dataControl = new GlobalClass.DataControl();
                dataControl.copyValuesFrom(resp, basicToastNotificationResponse);
                return basicToastNotificationResponse;
            }));
        }
        setButtons(_Buttons) {
            this.toastNotificationCarrier.setButtons(_Buttons);
        }
        setConfig(_ToastNotificationConfig) {
            this.toastNotificationCarrier.setConfig(_ToastNotificationConfig);
        }
        setMessage(_Title, _Description = null) {
            this.toastNotificationCarrier.setTitle(_Title);
            this.toastNotificationCarrier.setDescription(_Description);
        }
        setTitle(_Title) {
            this.toastNotificationCarrier.setTitle(_Title);
        }
        setDescription(_Description) {
            this.toastNotificationCarrier.setDescription(_Description);
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
            this.toastNotificationBelonging.Message.Title = _Title;
        }
        setDescription(_Description) {
            this.toastNotificationBelonging.Message.Description = _Description;
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
            if (!this.toastNotificationBelonging.Message.Title
                && !this.toastNotificationBelonging.Message.Description) {
                throw Error('Toast message fail.');
            }
            const service = ServiceLocator.injector.get(ToastNotificationService);
            return service.openToast$(this.toastNotificationBelonging);
        }
    }
    ToastNotificationClass.ToastNotificationCarrier = ToastNotificationCarrier;
    class GlobalToastSettings {
        constructor() {
            this.AllowedMessagesAtOnce = null;
        }
    }
    ToastNotificationClass.GlobalToastSettings = GlobalToastSettings;
    class Settings {
        constructor() {
            this.Buttons = [];
            this.ToastCoreConfig = new ToastCoreConfig();
            this.Message = new GlobalClass.Message();
            this.GlobalSettings = new GlobalToastSettings();
        }
    }
    ToastNotificationClass.Settings = Settings;
    class ToastCoreConfig {
        constructor() {
            this.Width = null;
            this.Height = null;
            this.ButtonPosition = null;
            this.LayoutType = null;
            this.Message = null;
            this.ConfirmLabel = null;
            this.DeclineLabel = null;
            this.AutoCloseDelay = null;
        }
    }
    ToastNotificationClass.ToastCoreConfig = ToastCoreConfig;
    class ToastNotificationBelonging extends ToastNotificationClass.Settings {
        constructor() {
            super();
            this.EntityUniqueID = 'T' + Math.random().toString(36).substr(2, 9);
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

class DefaultLoaderComponent {
}
DefaultLoaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'ed-default-loader',
                template: "<div class=\"box-position\">\n\t<div class=\"loader-center\">\n\t\t<div class=\"lds-ring\">\n\t\t\t<div></div>\n\t\t\t<div></div>\n\t\t\t<div></div>\n\t\t\t<div></div>\n\t\t</div>\n\t</div>\n</div>\n",
                styles: [".box-position{position:absolute;top:44%;left:50%;height:auto;margin:0 auto;transform:translate(-50%,-40%);text-align:center}.box-position .loader-center{display:flex;align-items:center;justify-content:center}.box-position .loader-center .lds-ring{position:relative;display:inline-block;width:80px;height:80px}.box-position .loader-center .lds-ring div{position:absolute;display:block;box-sizing:border-box;width:64px;height:64px;margin:8px;animation:lds-ring 1.2s cubic-bezier(.5,0,.5,1) infinite;border:8px solid transparent;border-top-color:#d4d4d4;border-radius:50%}.box-position .loader-center .lds-ring div:first-child{animation-delay:-.45s}.box-position .loader-center .lds-ring div:nth-child(2){animation-delay:-.3s}.box-position .loader-center .lds-ring div:nth-child(3){animation-delay:-.15s}@keyframes lds-ring{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}"]
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
            userConfig.DialogCoreConfig.DisplayLoader = userConfig.DialogCoreConfig.DisplayLoader === null;
        }
        // endregion
        // region *** author default config values (if there is no user input) ***
        this.authorConfig.DialogCoreConfig.Width = 'auto';
        this.authorConfig.DialogCoreConfig.Height = 'auto';
        this.authorConfig.DialogCoreConfig.ButtonPosition = 'right';
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
                providedIn: 'root'
            },] }
];
DialogConfigService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['dialogConfig',] }] }
];

class InsertionDirective {
    constructor(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
}
InsertionDirective.decorators = [
    { type: Directive, args: [{
                selector: '[appInsertion]',
            },] }
];
InsertionDirective.ctorParameters = () => [
    { type: ViewContainerRef }
];

class InsertionLoaderDirective {
    constructor(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
}
InsertionLoaderDirective.decorators = [
    { type: Directive, args: [{
                selector: '[appInsertionLoader]',
            },] }
];
InsertionLoaderDirective.ctorParameters = () => [
    { type: ViewContainerRef }
];

class DialogWrapperComponent {
    constructor(dialogBelonging, componentFactoryResolver, cd) {
        this.dialogBelonging = dialogBelonging;
        this.componentFactoryResolver = componentFactoryResolver;
        this.cd = cd;
        this.fadeInOutAnimation = 'open';
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
        dialogResponse.setSuccess(false);
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
        const timer = _ClosingAnimation === 'close-slow' ? 1400 : 150;
        return new Observable((observer) => {
            observer.next('');
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
                selector: 'dialog-popup-wrapper',
                template: "<div class=\"ngx-awesome-popup-overlay\" (dblclick)=\"onOverlayClicked($event)\" [@fadeInOut]=\"fadeInOutAnimation\">\n\t\n\t<div class=\"evolve-parent-dialog\"\n\t\t\t[ngClass]=\"{\n          'standard-dialog': dialogBelonging.DialogCoreConfig.LayoutType === 0,\n          'success-dialog': dialogBelonging.DialogCoreConfig.LayoutType === 1,\n          'info-dialog': dialogBelonging.DialogCoreConfig.LayoutType === 2,\n          'warning-dialog': dialogBelonging.DialogCoreConfig.LayoutType === 3,\n          'danger-dialog': dialogBelonging.DialogCoreConfig.LayoutType === 4\n        }\"\n\t>\n\t\t<div class=\"loader-holder\" [ngClass]=\"!dialogBelonging.DialogCoreConfig.DisplayLoader ? 'dialog-loader-off' : (showLoader ? 'dialog-loader-active' : 'dialog-loader-gone')\">\n\t\t\t<!--dialogBelonging.DialogCoreConfig.DisplayLoader => initial config-->\n\t\t\t<div class=\"dialog-loader\">\n\t\t\t\t<ng-template appInsertionLoader></ng-template>\n\t\t\t</div>\n\t\t</div>\n\t\t\n\t\t<div class=\"content-holder\" [ngStyle]=\"{'width': dialogBelonging.DialogCoreConfig.Width, 'height': dialogBelonging.DialogCoreConfig.Height}\">\n\n\t\t\t<!--dialogBelonging.DialogCoreConfig.DisplayLoader => initial config-->\n\t\t\t<div class=\"component-content\" [ngClass]=\"!dialogBelonging.DialogCoreConfig.DisplayLoader ? 'component-content-loader-off' : (showLoader ? 'component-content-preparing' : 'component-content-ready')\">\n\t\t\t\t<ng-template appInsertion></ng-template>\n\t\t\t</div>\n\t\t\t\n\t\t</div>\n\t\t\n\t\t<div class=\"button-holder\">\n\t\t\t<div class=\"button-section\" *ngIf=\"dialogBelonging.Buttons.length > 0\" [ngStyle]=\"{ 'text-align': dialogBelonging.DialogCoreConfig.ButtonPosition }\">\n\t\t\t\t\n\t\t\t\t<button\n\t\t\t\t\t\tclass=\"ed-btn ed-btn-lg\" *ngFor=\"let button of dialogBelonging.Buttons\" (click)=\"onCustomButton(button)\"\n\t\t\t\t\t\t[ngClass]=\"{\n\t\t\t                   '': (button.LayoutType ? (button.LayoutType === 0)  : false),\n                              'ed-btn-success': (button.LayoutType ? (button.LayoutType === 1) : false),\n                              'ed-btn-info': (button.LayoutType ? (button.LayoutType === 2) : false),\n                              'ed-btn-warning': (button.LayoutType ? (button.LayoutType === 3)  : false),\n                              'ed-btn-danger': (button.LayoutType ? (button.LayoutType === 4)  : false),\n                              'ed-btn-dark': (button.LayoutType ? (button.LayoutType === 5)  : false),\n                              'ed-btn-light': (button.LayoutType ? (button.LayoutType === 6)  : false),\n                               'ed-btn-primary': (button.LayoutType ? (button.LayoutType === 7) : false),\n                              'ed-btn-secondary': (button.LayoutType ? (button.LayoutType === 8)  : false),\n                              'ed-btn-link': (button.LayoutType ? (button.LayoutType === 9)  : false)\n                            }\"\n\t\t\t\t>{{button.Label}}</button>\n\t\t\t\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t\n</div>\n",
                animations: [fadeInOut(0, 1)],
                styles: [".ed-btn-sm{font-size:12px;font-weight:400;margin-right:3px;padding:2px 8px}.ed-btn-md{font-size:14px;font-weight:bolder;margin-right:5px;padding:3px 6px}.ed-btn-lg{font-size:16px;font-weight:700;margin-right:5px;padding:4px 10px}.ed-btn{background-color:initial;border:none;border-radius:3px;cursor:pointer;display:inline-block;line-height:1.5;text-align:center;text-decoration:none;-webkit-user-select:none;user-select:none;vertical-align:middle}.ed-btn:hover{color:#989ea5}.ed-btn-check:focus+.ed-btn,.ed-btn:focus{box-shadow:0 0 1px 2px;outline:0}.ed-btn-check:active+.ed-btn,.ed-btn-check:active+.ed-btn:focus,.ed-btn-check:checked+.ed-btn,.ed-btn-check:checked+.ed-btn:focus,.ed-btn.active,.ed-btn.active:focus,.ed-btn:active,.ed-btn:active:focus{box-shadow:0 0 1px 2px}.ed-btn.disabled,.ed-btn:disabled,fieldset:disabled .ed-btn{box-shadow:none;opacity:.6;pointer-events:none}.ed-btn-primary{color:#fbfbfb;background:#ff9e00;border-color:#ff9e00}.ed-btn-primary:hover{color:#fbfbfb;border-color:#ffa81a;background:#ffb133}.ed-btn-check:focus+.ed-btn-primary,.ed-btn-primary:focus{outline:0;box-shadow:0 0 1px 2px #ffa81a}.ed-btn-check:active+.ed-btn-primary,.ed-btn-check:active+.ed-btn-primary:focus,.ed-btn-check:checked+.ed-btn-primary,.ed-btn-check:checked+.ed-btn-primary:focus,.ed-btn-primary.active,.ed-btn-primary.active:focus,.ed-btn-primary:active,.ed-btn-primary:active:focus{box-shadow:0 0 1px 2px #ffa81a}.ed-btn-secondary{color:#343a40;background:#989ea5;border-color:#989ea5}.ed-btn-secondary:hover{color:#343a40;border-color:#a6abb1;background:#b3b8bd}.ed-btn-check:focus+.ed-btn-secondary,.ed-btn-secondary:focus{outline:0;box-shadow:0 0 1px 2px #a6abb1}.ed-btn-check:active+.ed-btn-secondary,.ed-btn-check:active+.ed-btn-secondary:focus,.ed-btn-check:checked+.ed-btn-secondary,.ed-btn-check:checked+.ed-btn-secondary:focus,.ed-btn-secondary.active,.ed-btn-secondary.active:focus,.ed-btn-secondary:active,.ed-btn-secondary:active:focus{box-shadow:0 0 1px 2px #a6abb1}.ed-btn-success{color:#fbfbfb;background:#3caea3;border-color:#3caea3}.ed-btn-success:hover{color:#fbfbfb;border-color:#45bfb3;background:#58c5bb}.ed-btn-check:focus+.ed-btn-success,.ed-btn-success:focus{outline:0;box-shadow:0 0 1px 2px #45bfb3}.ed-btn-check:active+.ed-btn-success,.ed-btn-check:active+.ed-btn-success:focus,.ed-btn-check:checked+.ed-btn-success,.ed-btn-check:checked+.ed-btn-success:focus,.ed-btn-success.active,.ed-btn-success.active:focus,.ed-btn-success:active,.ed-btn-success:active:focus{box-shadow:0 0 1px 2px #45bfb3}.ed-btn-info{color:#fbfbfb;background:#2f8ee5;border-color:#2f8ee5}.ed-btn-info:hover{color:#fbfbfb;border-color:#469ae8;background:#5ca7eb}.ed-btn-check:focus+.ed-btn-info,.ed-btn-info:focus{outline:0;box-shadow:0 0 1px 2px #469ae8}.ed-btn-check:active+.ed-btn-info,.ed-btn-check:active+.ed-btn-info:focus,.ed-btn-check:checked+.ed-btn-info,.ed-btn-check:checked+.ed-btn-info:focus,.ed-btn-info.active,.ed-btn-info.active:focus,.ed-btn-info:active,.ed-btn-info:active:focus{box-shadow:0 0 1px 2px #469ae8}.ed-btn-warning{color:#fbfbfb;background:#ffc107;border-color:#ffc107}.ed-btn-warning:hover{color:#fbfbfb;border-color:#ffc721;background:#ffce3a}.ed-btn-check:focus+.ed-btn-warning,.ed-btn-warning:focus{outline:0;box-shadow:0 0 1px 2px #ffc721}.ed-btn-check:active+.ed-btn-warning,.ed-btn-check:active+.ed-btn-warning:focus,.ed-btn-check:checked+.ed-btn-warning,.ed-btn-check:checked+.ed-btn-warning:focus,.ed-btn-warning.active,.ed-btn-warning.active:focus,.ed-btn-warning:active,.ed-btn-warning:active:focus{box-shadow:0 0 1px 2px #ffc721}.ed-btn-danger{color:#343a40;background:#e46464;border-color:#e46464}.ed-btn-danger:hover{color:#343a40;border-color:#e87a7a;background:#ec8f8f}.ed-btn-check:focus+.ed-btn-danger,.ed-btn-danger:focus{outline:0;box-shadow:0 0 1px 2px #e87a7a}.ed-btn-check:active+.ed-btn-danger,.ed-btn-check:active+.ed-btn-danger:focus,.ed-btn-check:checked+.ed-btn-danger,.ed-btn-check:checked+.ed-btn-danger:focus,.ed-btn-danger.active,.ed-btn-danger.active:focus,.ed-btn-danger:active,.ed-btn-danger:active:focus{box-shadow:0 0 1px 2px #e87a7a}.ed-btn-light{color:#343a40;background:#fbfbfb;border-color:#fbfbfb}.ed-btn-light:hover{color:#343a40;border-color:#fff;background:#fff}.ed-btn-check:focus+.ed-btn-light,.ed-btn-light:focus{outline:0;box-shadow:0 0 1px 2px #fff}.ed-btn-check:active+.ed-btn-light,.ed-btn-check:active+.ed-btn-light:focus,.ed-btn-check:checked+.ed-btn-light,.ed-btn-check:checked+.ed-btn-light:focus,.ed-btn-light.active,.ed-btn-light.active:focus,.ed-btn-light:active,.ed-btn-light:active:focus{box-shadow:0 0 1px 2px #fff}.ed-btn-dark{color:#fbfbfb;background:#343a40;border-color:#343a40}.ed-btn-dark:hover{color:#fbfbfb;border-color:#3f474e;background:#4b545c}.ed-btn-check:focus+.ed-btn-dark,.ed-btn-dark:focus{outline:0;box-shadow:0 0 1px 2px #3f474e}.ed-btn-check:active+.ed-btn-dark,.ed-btn-check:active+.ed-btn-dark:focus,.ed-btn-check:checked+.ed-btn-dark,.ed-btn-check:checked+.ed-btn-dark:focus,.ed-btn-dark.active,.ed-btn-dark.active:focus,.ed-btn-dark:active,.ed-btn-dark:active:focus{box-shadow:0 0 1px 2px #3f474e}.ngx-awesome-popup-overlay{align-items:center;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px);background:rgba(51,32,0,.4);bottom:0;display:flex;flex-direction:column;justify-content:center;left:0;opacity:0;position:fixed;right:0;top:0;z-index:1000}.evolve-confirm-box .text-wrapper-section,.evolve-parent-dialog .text-wrapper-section,.evolve-toast .text-wrapper-section{width:100%}.evolve-confirm-box .text-wrapper-section .text-wrapper,.evolve-parent-dialog .text-wrapper-section .text-wrapper,.evolve-toast .text-wrapper-section .text-wrapper{display:block;text-align:center;width:100%}.evolve-confirm-box .text-wrapper-section .dont-break-out,.evolve-parent-dialog .text-wrapper-section .dont-break-out,.evolve-toast .text-wrapper-section .dont-break-out{-webkit-hyphens:auto;hyphens:auto;overflow-wrap:break-word;white-space:pre-wrap;word-wrap:break-word}.evolve-confirm-box,.evolve-parent-dialog{background:#fbfbfb;border-radius:5px;border-top:7px solid;box-shadow:0 0 4px 1px rgba(0,0,0,.25);display:flex;flex-direction:column;max-height:calc(100vh - 100px);max-width:calc(100vw - 100px);position:relative;vertical-align:bottom}.evolve-confirm-box.standard-dialog,.evolve-parent-dialog.standard-dialog{border-color:transparent;padding:17px 20px 10px}.evolve-confirm-box.success-dialog,.evolve-parent-dialog.success-dialog{border-color:#3caea3}.evolve-confirm-box.info-dialog,.evolve-parent-dialog.info-dialog{border-color:#2f8ee5}.evolve-confirm-box.warning-dialog,.evolve-parent-dialog.warning-dialog{border-color:#ffc107}.evolve-confirm-box.danger-dialog,.evolve-parent-dialog.danger-dialog{border-color:#e46464}.evolve-parent-dialog{padding:20px 20px 10px}.evolve-parent-dialog .component-content{width:100%;height:100%;transition-delay:.4s;transition-timing-function:linear;transition-duration:.4s;transition-property:opacity}.evolve-parent-dialog .component-content-loader-off{transition:none!important;opacity:1!important}.evolve-parent-dialog .component-content-preparing{transition:none!important;opacity:0}.evolve-parent-dialog .component-content-ready{height:100%;opacity:1}.evolve-parent-dialog .dialog-loader{opacity:1}.evolve-parent-dialog .dialog-loader-off{display:none;opacity:0!important}.evolve-parent-dialog .dialog-loader-gone{opacity:0;pointer-events:none}.evolve-parent-dialog .dialog-loader-active{opacity:1}.loader-holder{position:absolute;transition-delay:.4s;transition-timing-function:linear;transition-duration:.4s;transition-property:opacity;opacity:1;justify-content:center;align-items:center;background:#fbfbfb;width:100%;height:100%;margin:-20px}.content-holder,.loader-holder{display:flex;flex-direction:column}.content-holder{overflow:auto}.button-holder{width:100%;display:flex;justify-content:flex-end;flex-direction:column}.button-holder .button-section{margin:20px -20px -10px;border-top:1px solid rgba(152,158,165,.2);background:rgba(222,226,230,.2);padding:5px 20px}"]
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
    childComponentResolver() {
    }
    appendToBodyParentComponent(_ComponentRef) {
        // attach view to ignite lifecycle hooks
        this.appRef.attachView(_ComponentRef.hostView);
        // DOM
        const domElem = _ComponentRef.hostView.rootNodes[0];
        document.body.appendChild(domElem);
    }
    closeDialogWrapperComponent(_DialogUniqueID) {
        const modalIndex = this.findDialogIndex(_DialogUniqueID);
        this.removeFromBodyDialogWrapperComponent(modalIndex);
    }
    removeFromBodyDialogWrapperComponent(_DialogIndex) {
        if (_DialogIndex > -1) {
            this.dialogParentComponentRefList[_DialogIndex].instance.closeParent$('close-fast').pipe(map(item => {
                this.appRef.detachView(this.dialogParentComponentRefList[_DialogIndex].hostView);
                this.dialogParentComponentRefList[_DialogIndex].destroy();
                this.dialogParentComponentRefList.splice(_DialogIndex, 1);
            })).subscribe();
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
                providedIn: 'root'
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
            return this.dialogCarrier.openDialog$().pipe(map(resp => {
                const basicDialogResponse = new DialogResponse();
                const dataControl = new GlobalClass.DataControl();
                dataControl.copyValuesFrom(resp, basicDialogResponse);
                return basicDialogResponse;
            }));
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
        setSuccess(_IsSuccess) {
            this.Success = _IsSuccess;
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
            this.EntityUniqueID = 'D' + Math.random().toString(36).substr(2, 9);
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

class GlobalConfigService {
    constructor(userGlobalConfig) {
        this.userGlobalConfig = userGlobalConfig;
        this.productionGlobalConfig = new GlobalClass.GlobalConfig();
        this.authorGlobalConfig = new GlobalClass.GlobalConfig();
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
        this.setUserColors(userGlobalConfig.ColorList);
        // endregion
        this.setToastNode();
        this.setNodeStyles(this.productionGlobalConfig.DisplayColor);
    }
    setNodeStyles(_ProductionColorTypes) {
        Object.keys(_ProductionColorTypes).forEach(key => {
            if (_ProductionColorTypes[key]) {
                this.setButtonStyling(key, _ProductionColorTypes[key]);
                this.setToastStyling(key, _ProductionColorTypes[key]);
                this.setDialogFrame(key, _ProductionColorTypes[key]);
                if (ColorVariance[key.toUpperCase()] === ColorVariance.PRIMARY) {
                    this.getSheet().addRule('.ngx-awesome-popup-overlay', `background:  ${_ProductionColorTypes[key].TransparentDarkenVariance}!important;`);
                }
            }
        });
    }
    setToastStyling(_Key, _ColorProvider) {
        const baseClass = `.overlay-toast .evolve-toast.${_Key.toLowerCase()}-dialog`;
        const baseStyle = `
        background:  ${_ColorProvider.BrightShade}!important;
        border-color: ${_ColorProvider.Brighten}!important;
        `;
        this.getSheet().addRule(baseClass, baseStyle);
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
        this.getSheet().addRule(baseButtonClass, baseStyle);
        this.getSheet().addRule(hoverButtonClass, hoverStyle);
        this.getSheet().addRule(focusActiveButtonClass, focusActiveStyle);
    }
    setDialogFrame(_Key, _ColorProvider) {
        const baseDialogFrameClass = `.ngx-awesome-popup-overlay .${_Key.toLowerCase()}-dialog`;
        const baseStyle = `
        border-color: ${_ColorProvider.Brighten}!important;
        `;
        this.getSheet().addRule(baseDialogFrameClass, baseStyle);
    }
    getSheet() {
        // Create the <style> tag
        let evolveDialogStyleNode = document.getElementById('ngx-awesome-popup-styles');
        if (!evolveDialogStyleNode) {
            const headNode = document.head || document.getElementsByTagName('head')[0];
            if (!headNode) {
                return;
            }
            evolveDialogStyleNode = document.createElement('style');
            evolveDialogStyleNode.setAttribute('id', 'ngx-awesome-popup-styles');
            evolveDialogStyleNode.appendChild(document.createTextNode(''));
            headNode.appendChild(evolveDialogStyleNode);
        }
        return evolveDialogStyleNode ? evolveDialogStyleNode.sheet : null;
    }
    ;
    setToastNode() {
        const bodyNode = document.body || document.getElementsByTagName('body')[0];
        if (!bodyNode) {
            return;
        }
        const toastWrapper = document.createElement('div');
        toastWrapper.setAttribute('id', 'toast-wrapper');
        toastWrapper.appendChild(document.createTextNode(''));
        bodyNode.prepend(toastWrapper);
        // bodyNode.appendChild(toastWrapper);
        this.getSheet().addRule(`#toast-wrapper`, `position: fixed;
                                        z-index: 1001;
                                        top: 20px;
                                        right: 20px;`);
        this.getSheet().addRule(`.toast-entity`, `all 0.5s ease;`);
        this.getSheet().addRule(`.toast-entity:first-child`, `animation: move 0.7s ease-out;`);
        this.getSheet().addRule(`@-webkit-keyframes move`, `
                                        0% {margin-top: -5px; opacity: 0.4;}
                                        30% {margin-top: -4px; opacity: 0.7;}
                                        100% {margin-top: 0px; opacity: 1;}
                                        `);
        this.getSheet().addRule(`@keyframes move`, `
                                        0% {margin-top: -5px; opacity: 0.4;}
                                        30% {margin-top: -4px; opacity: 0.7;}
                                        100% {margin-top: 0px; opacity: 1;}
                                        `);
    }
    setUserColors(_UserColorTypes) {
        if (typeof _UserColorTypes !== 'object') {
            return;
        }
        const userKeys = Object.keys(_UserColorTypes);
        const productionObjectKeys = Object.keys(this.productionGlobalConfig.DisplayColor);
        userKeys.forEach(key => {
            if (productionObjectKeys.find(tKey => tKey === key)) {
                const baseColorProvider = new GlobalClass.ColorProvider(_UserColorTypes[key]);
                if (baseColorProvider.Base) {
                    this.productionGlobalConfig.DisplayColor[key] = baseColorProvider;
                }
            }
        });
    }
}
GlobalConfigService.ɵprov = i0.ɵɵdefineInjectable({ factory: function GlobalConfigService_Factory() { return new GlobalConfigService(i0.ɵɵinject("globalConfig")); }, token: GlobalConfigService, providedIn: "root" });
GlobalConfigService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
GlobalConfigService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['globalConfig',] }] }
];

class NgxAwesomePopupModule {
    constructor(injector, gConfigService) {
        this.injector = injector;
        this.gConfigService = gConfigService;
        ServiceLocator.injector = injector;
    }
    static forRoot(globalConfig) {
        return {
            ngModule: NgxAwesomePopupModule,
            providers: [GlobalConfigService, { provide: 'globalConfig', useValue: globalConfig }]
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
                    ToastNotificationWrapperComponent
                ],
                imports: [
                    CommonModule,
                    BrowserModule,
                    BrowserAnimationsModule
                ],
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
                    ToastNotificationClass.ToastNotificationBelonging
                ],
                entryComponents: [
                    DialogWrapperComponent,
                    DefaultLoaderComponent,
                    ConfirmBoxWrapperComponent,
                    ToastNotificationWrapperComponent
                ]
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
            providers: [DialogConfigService, { provide: 'dialogConfig', useValue: dialogConfig }]
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
            providers: [ConfirmBoxConfigService, { provide: 'confirmBoxConfig', useValue: confirmBoxConfig }]
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
            providers: [ToastNotificationConfigService, { provide: 'toastNotificationConfig', useValue: toastNotificationConfig }]
        };
    }
}
ToastNotificationConfigModule.decorators = [
    { type: NgModule, args: [{},] }
];

var ButtonMaker = GlobalClass.ButtonMaker;
var ConfirmBoxInitializer = ConfirmBoxClass.ConfirmBoxInitializer;
var ToastNotificationInitializer = ToastNotificationClass.ToastNotificationInitializer;
var DialogInitializer = DialogClass.DialogInitializer;
var DialogBelonging = DialogClass.DialogBelonging;
// endregion

/**
 * Generated bundle index. Do not edit.
 */

export { ButtonLayoutDisplay, ButtonMaker, ConfirmBoxConfigModule, ConfirmBoxInitializer, DialogBelonging, DialogConfigModule, DialogInitializer, DialogLayoutDisplay, NgxAwesomePopupModule, ToastNotificationConfigModule, ToastNotificationInitializer, DialogWrapperComponent as ɵa, fadeInOut as ɵb, InsertionDirective as ɵc, InsertionLoaderDirective as ɵd, DialogClass as ɵe, DefaultLoaderComponent as ɵf, ConfirmBoxWrapperComponent as ɵg, ConfirmBoxClass as ɵh, ToastNotificationWrapperComponent as ɵi, ToastNotificationClass as ɵj, DialogService as ɵk, ConfirmBoxService as ɵl, ToastNotificationService as ɵm, ToastNotificationConfigService as ɵn, GlobalConfigService as ɵp, DialogConfigService as ɵr, ConfirmBoxConfigService as ɵt };
//# sourceMappingURL=costlydeveloper-ngx-awesome-popup.js.map
