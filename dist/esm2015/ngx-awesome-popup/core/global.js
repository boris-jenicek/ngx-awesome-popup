import { ServiceLocator } from "../locator.service";
import { ButtonLayoutDisplay } from "./enums";
import { GlobalConfigService } from "./global-config.service";
export var GlobalClass;
(function (GlobalClass) {
    class Sizes {
        constructor() {
            this.Width = null;
            this.MinWidth = null;
            this.MaxWidth = null;
            this.Height = null;
            this.MinHeight = null;
            this.MaxHeight = null;
            this.FullScreen = null;
        }
    }
    GlobalClass.Sizes = Sizes;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbmd4LWF3ZXNvbWUtcG9wdXAvY29yZS9nbG9iYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUM5QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQTRHOUQsTUFBTSxLQUFXLFdBQVcsQ0E0WTNCO0FBNVlELFdBQWlCLFdBQVc7SUFDMUIsTUFBYSxLQUFLO1FBQWxCO1lBQ0UsVUFBSyxHQUFXLElBQUksQ0FBQztZQUNyQixhQUFRLEdBQVcsSUFBSSxDQUFDO1lBQ3hCLGFBQVEsR0FBVyxJQUFJLENBQUM7WUFDeEIsV0FBTSxHQUFXLElBQUksQ0FBQztZQUN0QixjQUFTLEdBQVcsSUFBSSxDQUFDO1lBQ3pCLGNBQVMsR0FBVyxJQUFJLENBQUM7WUFDekIsZUFBVSxHQUFZLElBQUksQ0FBQztRQUM3QixDQUFDO0tBQUE7SUFSWSxpQkFBSyxRQVFqQixDQUFBO0lBRUQsTUFBYSxRQUFRO1FBQXJCO1lBQ0UsVUFBSyxHQUFXLElBQUksQ0FBQztZQUNyQixZQUFPLEdBQVcsSUFBSSxDQUFDO1FBQ3pCLENBQUM7S0FBQTtJQUhZLG9CQUFRLFdBR3BCLENBQUE7SUFFRCxNQUFhLFdBQVc7UUFDdEIsWUFDUyxLQUFhLEVBQ2IsRUFBVSxFQUNWLGFBQWtDLG1CQUFtQixDQUFDLE9BQU87WUFGN0QsVUFBSyxHQUFMLEtBQUssQ0FBUTtZQUNiLE9BQUUsR0FBRixFQUFFLENBQVE7WUFDVixlQUFVLEdBQVYsVUFBVSxDQUFtRDtRQUNuRSxDQUFDO0tBQ0w7SUFOWSx1QkFBVyxjQU12QixDQUFBO0lBRUQsTUFBYSxnQkFBZ0I7UUFHM0IsWUFBWSxpQkFBb0Q7WUFGaEUsY0FBUyxHQUFnQyxJQUFJLFdB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NUIsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7b0JBQ3hDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzFCLE9BQU87aUJBQ1I7Z0JBQ0QsSUFBSSxDQUFDLFVBQVUsSUFBSSxHQUFHLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7Z0JBQzVELElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDdkMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsQ0FBQztLQUNGO0lBdkNZLGlCQUFLLFFBdUNqQixDQUFBO0FBQ0gsQ0FBQyxFQTVZZ0IsV0FBVyxLQUFYLFdBQVcsUUE0WTNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2VydmljZUxvY2F0b3IgfSBmcm9tIFwiLi4vbG9jYXRvci5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBCdXR0b25MYXlvdXREaXNwbGF5IH0gZnJvbSBcIi4vZW51bXNcIjtcbmltcG9ydCB7IEdsb2JhbENvbmZpZ1NlcnZpY2UgfSBmcm9tIFwiLi9nbG9iYWwtY29uZmlnLnNlcnZpY2VcIjtcblxuZXhwb3J0IG5hbWVzcGFjZSBHbG9iYWxJbnRlcmZhY2Uge1xuICBleHBvcnQgaW50ZXJmYWNlIElTaXplcyB7XG4gICAgV2lkdGg/OiBzdHJpbmc7XG4gICAgTWluV2lkdGg/OiBzdHJpbmc7XG4gICAgTWF4V2lkdGg/OiBzdHJpbmc7XG4gICAgSGVpZ2h0Pzogc3RyaW5nO1xuICAgIE1pbkhlaWdodD86IHN0cmluZztcbiAgICBNYXhIZWlnaHQ/OiBzdHJpbmc7XG4gICAgRnVsbFNjcmVlbj86IGJvb2xlYW47XG4gIH1cblxuICAvKipcbiAgICogRWFjaCBwcm9wZXJ0eSBvZiB7QGxpbmsgQ29sb3JMaXN0fSByZXByZXNlbnQgYSBzdHJpbmcgd2hpY2ggcmVwcmVzZW50IGEgY29sb3IgaW4gaGV4IG9yIHJnYi9yZ2JhIGZvcm1hdC5cbiAgICogRm9yIGF2YWlsYWJsZSBjb2xvciB0eXBlcyhwcm9wZXJ0aWVzKSBjaGVjayB7QGxpbmsgSUNvbG9yVHlwZXN9IGludGVyZmFjZS5cbiAgICogRXZlcnkgY29sb3IgaXMgb3B0aW9uYWwsIGFuZCBpdCB3aWxsIHJlZmxlY3Qgb24gZGlhbG9nIG9yIGJ1dHRvbiBjb2xvciB0eXBlcyBhbmQgaXRzIGNvbG9yIGNvbnRyYXN0IG9yIHZhcmlhbmNlLlxuICAgKiAgKiBgYGB0eXBlc2NyaXB0XG4gICAqIC8vIENvbG9yTGlzdCBvYmplY3QgZXhhbXBsZS5cbiAgICogY29uc3QgY29sb3JMaXN0ID0ge1xuICAgKiAgICAgICAgIENvbG9yTGlzdDoge1xuICAgKiAgICAgICAgICAgIFByaW1hcnkgIDogJyNmZjllMDAnLFxuICAgKiAgICAgICAgICAgIFNlY29uZGFyeTogJyM5ODllYTUnLFxuICAgKiAgICAgICAgICAgIEluZm8gICAgIDogJyMyZjhlZTUnLFxuICAgKiAgICAgICAgICAgIFN1Y2Nlc3MgIDogJyMzY2FlYTMnLFxuICAgKiAgICAgICAgICAgIFdhcm5pbmcgIDogJyNmZmMxMDcnLFxuICAgKiAgICAgICAgICAgIERhbmdlciAgIDogJyNlNDY0NjQnLFxuICAgKiAgICAgICAgICAgIExpZ2h0ICAgIDogJyNmYmZiZmInLFxuICAgKiAgICAgICAgICAgIERhcmsgICAgIDogJyMzNDNhNDAnXG4gICAqICAgICAgICAgICB9XG4gICAqICAgICAgICB9XG4gICAqIGBgYFxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBJR2xvYmFsVXNlckNvbmZpZyB7XG4gICAgQ29sb3JMaXN0PzogR2xvYmFsSW50ZXJmYWNlLklDb2xvclR5cGVzO1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBJR2xvYmFsQ29uZmlnIHtcbiAgICBEaXNwbGF5Q29sb3I/OiBHbG9iYWxJbnRlcmZhY2UuSUNvbG9yT2JqZWN0O1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBJQ29sb3JUeXBlcyB7XG4gICAgUHJpbWFyeT86IHN0cmluZztcbiAgICBTZWNvbmRhcnk/OiBzdHJpbmc7XG4gICAgU3VjY2Vzcz86IHN0cmluZztcbiAgICBJbmZvPzogc3RyaW5nO1xuICAgIFdhcm5pbmc/OiBzdHJpbmc7XG4gICAgRGFuZ2VyPzogc3RyaW5nO1xuICAgIExpZ2h0Pzogc3RyaW5nO1xuICAgIERhcms/OiBzdHJpbmc7XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIElQcml2YXRlUmVzcG9uc2Uge1xuICAgIHNldEJlbG9uZ2luZyhfRGlhbG9nQmVsb25naW5nKTogdm9pZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnRlcmZhY2UgZm9yIGN1c3RvbSBidXR0b24uXG4gICAqXG4gICAqIEV4YW1wbGU6XG4gICAqIGBgYHR5cGVzY3JpcHRcbiAgICogLy8gQ3VzdG9tIGJ1dHRvbiBvYmplY3QuXG4gICAqIGNvbnN0IGJ1dHRvbiA9IHtcbiAgICogICAgICAgIElEICAgICAgICAgOiAnY29uZmlybV9idG4nLFxuICAgKiAgICAgICAgTGFiZWw6ICAgICA6ICdDb25maXJtJ1xuICAgKiAgICAgICAgTGF5b3V0VHlwZSA6IEJ1dHRvbkxheW91dERpc3BsYXkuU1VDQ0VTU1xuICAgKiAgfVxuICAgKiAvLyBPciBpbnN0YW50aWF0ZWQgd2l0aCBCdXR0b25NYWtlciBjbGFzc1xuICAgKiBjb25zdCBidXR0b24yID0gbmV3IEJ1dHRvbk1ha2VyKCdDb25maXJtJywgJ2NvbmZpcm1fYnRuJywgQnV0dG9uTGF5b3V0RGlzcGxheS5TVUNDRVNTKVxuICAgKiBgYGBcbiAgICogKiBCdXR0b25MYXlvdXREaXNwbGF5OiB7QGxpbmsgQnV0dG9uTGF5b3V0RGlzcGxheX1cbiAgICovXG4gIGV4cG9ydCBpbnRlcmZhY2UgSUJ1dHRvbiB7XG4gICAgTGFiZWw6IHN0cmluZztcbiAgICBMYXlvdXRUeXBlOiBCdXR0b25MYXlvdXREaXNwbGF5IHwgbnVsbDtcbiAgICBJRD86IHN0cmluZztcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgSUNvbG9yT2JqZWN0IHtcbiAgICBQcmltYXJ5PzogR2xvYmFsSW50ZXJmYWNlLklDb2xvclByb3ZpZGVyO1xuICAgIFNlY29uZGFyeT86IEdsb2JhbEludGVyZmFjZS5JQ29sb3JQcm92aWRlcjtcbiAgICBTdWNjZXNzPzogR2xvYmFsSW50ZXJmYWNlLklDb2xvclByb3ZpZGVyO1xuICAgIEluZm8/OiBHbG9iYWxJbnRlcmZhY2UuSUNvbG9yUHJvdmlkZXI7XG4gICAgV2FybmluZz86IEdsb2JhbEludGVyZmFjZS5JQ29sb3JQcm92aWRlcjtcbiAgICBEYW5nZXI/OiBHbG9iYWxJbnRlcmZhY2UuSUNvbG9yUHJvdmlkZXI7XG4gICAgTGlnaHQ/OiBHbG9iYWxJbnRlcmZhY2UuSUNvbG9yUHJvdmlkZXI7XG4gICAgRGFyaz86IEdsb2JhbEludGVyZmFjZS5JQ29sb3JQcm92aWRlcjtcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgSUNvbG9yUHJvdmlkZXIge1xuICAgIEJhc2U6IHN0cmluZztcbiAgICBCcmlnaHRlbjogc3RyaW5nO1xuICAgIEJyaWdodGVuRm9yU2hhZGU6IHN0cmluZztcbiAgICBEYXJrZW46IHN0cmluZztcbiAgICBEYXJrZW5Gb3JTaGFkZTogc3RyaW5nO1xuICAgIENvbnRyYXN0Q29sb3I6IHN0cmluZztcbiAgICBCcmlnaHRTaGFkZTogc3RyaW5nO1xuICAgIEJyaWdodFdhcm1seTogc3RyaW5nO1xuICAgIFRyYW5zcGFyZW50RGFya2VuVmFyaWFuY2U6IHN0cmluZztcbiAgICBJc0Jhc2VCcmlnaHQ6IGJvb2xlYW47XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIElEaXNwYXRjaCB7XG4gICAgVGl0bGU6IHN0cmluZztcbiAgICBNZXNzYWdlOiBzdHJpbmc7XG4gIH1cbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBHbG9iYWxDbGFzcyB7XG4gIGV4cG9ydCBjbGFzcyBTaXplcyBpbXBsZW1lbnRzIEdsb2JhbEludGVyZmFjZS5JU2l6ZXMge1xuICAgIFdpZHRoOiBzdHJpbmcgPSBudWxsO1xuICAgIE1pbldpZHRoOiBzdHJpbmcgPSBudWxsO1xuICAgIE1heFdpZHRoOiBzdHJpbmcgPSBudWxsO1xuICAgIEhlaWdodDogc3RyaW5nID0gbnVsbDtcbiAgICBNaW5IZWlnaHQ6IHN0cmluZyA9IG51bGw7XG4gICAgTWF4SGVpZ2h0OiBzdHJpbmcgPSBudWxsO1xuICAgIEZ1bGxTY3JlZW46IGJvb2xlYW4gPSBudWxsO1xuICB9XG5cbiAgZXhwb3J0IGNsYXNzIERpc3BhdGNoIHtcbiAgICBUaXRsZTogc3RyaW5nID0gbnVsbDtcbiAgICBNZXNzYWdlOiBzdHJpbmcgPSBudWxsO1xuICB9XG5cbiAgZXhwb3J0IGNsYXNzIEJ1dHRvbk1ha2VyIGltcGxlbWVudHMgR2xvYmFsSW50ZXJmYWNlLklCdXR0b24ge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIExhYmVsOiBzdHJpbmcsXG4gICAgICBwdWJsaWMgSUQ6IHN0cmluZyxcbiAgICAgIHB1YmxpYyBMYXlvdXRUeXBlOiBCdXR0b25MYXlvdXREaXNwbGF5ID0gQnV0dG9uTGF5b3V0RGlzcGxheS5QUklNQVJZXG4gICAgKSB7fVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIEdsb2JhbFVzZXJDb25maWcgaW1wbGVtZW50cyBHbG9iYWxJbnRlcmZhY2UuSUdsb2JhbFVzZXJDb25maWcge1xuICAgIENvbG9yTGlzdDogR2xvYmFsSW50ZXJmYWNlLklDb2xvclR5cGVzID0gbmV3IEdsb2JhbENsYXNzLkNvbG9yVHlwZXMoKTtcblxuICAgIGNvbnN0cnVjdG9yKF9HbG9iYWxVc2VyQ29uZmlnOiBHbG9iYWxJbnRlcmZhY2UuSUdsb2JhbFVzZXJDb25maWcpIHtcbiAgICAgIGlmIChfR2xvYmFsVXNlckNvbmZpZykge1xuICAgICAgICBjb25zdCBkYXRhQ29udHJvbCA9IG5ldyBHbG9iYWxDbGFzcy5EYXRhQ29udHJvbCgpO1xuICAgICAgICBkYXRhQ29udHJvbC5jb3B5VmFsdWVzRnJvbShfR2xvYmFsVXNlckNvbmZpZywgdGhpcyk7XG4gICAgICAgIGNvbnN0IGNvbG9yTGlzdCA9IG5ldyBHbG9iYWxDbGFzcy5Db2xvclR5cGVzKCk7XG4gICAgICAgIHRoaXMuQ29sb3JMaXN0ID0gZGF0YUNvbnRyb2wuY29weVZhbHVlc0Zyb20odGhpcy5Db2xvckxpc3QsIGNvbG9yTGlzdCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIENvbG9yVHlwZXMgaW1wbGVtZW50cyBHbG9iYWxJbnRlcmZhY2UuSUNvbG9yVHlwZXMge1xuICAgIFByaW1hcnk6IHN0cmluZyA9IG51bGw7XG4gICAgU2Vjb25kYXJ5OiBzdHJpbmcgPSBudWxsO1xuICAgIFN1Y2Nlc3M6IHN0cmluZyA9IG51bGw7XG4gICAgSW5mbzogc3RyaW5nID0gbnVsbDtcbiAgICBXYXJuaW5nOiBzdHJpbmcgPSBudWxsO1xuICAgIERhbmdlcjogc3RyaW5nID0gbnVsbDtcbiAgICBMaWdodDogc3RyaW5nID0gbnVsbDtcbiAgICBEYXJrOiBzdHJpbmcgPSBudWxsO1xuICB9XG5cbiAgZXhwb3J0IGNsYXNzIFJlc2V0R2xvYmFsQ29uZmlnIHtcbiAgICBjb25zdHJ1Y3RvcihnbG9iYWxDb25maWc/OiBHbG9iYWxJbnRlcmZhY2UuSUdsb2JhbFVzZXJDb25maWcpIHtcbiAgICAgIGNvbnN0IGdsb2JhbENvbmZpZ1NlcnZpY2U6IEdsb2JhbENvbmZpZ1NlcnZpY2UgPSBTZXJ2aWNlTG9jYXRvci5pbmplY3Rvci5nZXQoXG4gICAgICAgIEdsb2JhbENvbmZpZ1NlcnZpY2VcbiAgICAgICk7XG4gICAgICBpZiAoZ2xvYmFsQ29uZmlnKSB7XG4gICAgICAgIGdsb2JhbENvbmZpZ1NlcnZpY2Uuc2V0VXNlckNvbG9ycyhnbG9iYWxDb25maWcuQ29sb3JMaXN0KTtcbiAgICAgICAgZ2xvYmFsQ29uZmlnU2VydmljZS5zZXROb2RlU3R5bGVzKFxuICAgICAgICAgIGdsb2JhbENvbmZpZ1NlcnZpY2UucHJvZHVjdGlvbkdsb2JhbENvbmZpZy5EaXNwbGF5Q29sb3IsXG4gICAgICAgICAgdHJ1ZVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZ2xvYmFsQ29uZmlnU2VydmljZS5yZXNldFN0eWxlcygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBHbG9iYWxDb25maWcgaW1wbGVtZW50cyBHbG9iYWxJbnRlcmZhY2UuSUdsb2JhbENvbmZpZyB7XG4gICAgRGlzcGxheUNvbG9yOiBHbG9iYWxJbnRlcmZhY2UuSUNvbG9yT2JqZWN0ID0gbmV3IEdsb2JhbENsYXNzLkRpc3BsYXlDb2xvcigpO1xuICB9XG5cbiAgZXhwb3J0IGNsYXNzIERpc3BsYXlDb2xvciBpbXBsZW1lbnRzIEdsb2JhbEludGVyZmFjZS5JQ29sb3JPYmplY3Qge1xuICAgIFByaW1hcnk6IENvbG9yUHJvdmlkZXIgPSBudWxsO1xuICAgIFNlY29uZGFyeTogQ29sb3JQcm92aWRlciA9IG51bGw7XG4gICAgU3VjY2VzczogQ29sb3JQcm92aWRlciA9IG51bGw7XG4gICAgSW5mbzogQ29sb3JQcm92aWRlciA9IG51bGw7XG4gICAgV2FybmluZzogQ29sb3JQcm92aWRlciA9IG51bGw7XG4gICAgRGFuZ2VyOiBDb2xvclByb3ZpZGVyID0gbnVsbDtcbiAgICBMaWdodDogQ29sb3JQcm92aWRlciA9IG51bGw7XG4gICAgRGFyazogQ29sb3JQcm92aWRlciA9IG51bGw7XG4gIH1cblxuICBleHBvcnQgY2xhc3MgQ29sb3JQcm92aWRlciB7XG4gICAgQmFzZTogc3RyaW5nID0gbnVsbDtcbiAgICBCcmlnaHRlbjogc3RyaW5nID0gbnVsbDtcbiAgICBCcmlnaHRlbkZvclNoYWRlOiBzdHJpbmcgPSBudWxsO1xuICAgIERhcmtlbjogc3RyaW5nID0gbnVsbDtcbiAgICBEYXJrZW5Gb3JTaGFkZTogc3RyaW5nID0gbnVsbDtcbiAgICBDb250cmFzdENvbG9yOiBzdHJpbmcgPSBudWxsO1xuICAgIFRyYW5zcGFyZW50RGFya2VuVmFyaWFuY2U6IHN0cmluZyA9IG51bGw7XG4gICAgQnJpZ2h0U2hhZGU6IHN0cmluZyA9IG51bGw7XG4gICAgQnJpZ2h0V2FybWx5OiBzdHJpbmcgPSBudWxsO1xuICAgIElzQmFzZUJyaWdodDogYm9vbGVhbiA9IG51bGw7XG5cbiAgICBjb25zdHJ1Y3RvcihfQ29sb3I6IHN0cmluZykge1xuICAgICAgaWYgKCh0aGlzLkJhc2UgPSB0aGlzLmlzQ29sb3IoX0NvbG9yKSkpIHtcbiAgICAgICAgdGhpcy5CcmlnaHRlbiA9IHRoaXMuYnJpZ2h0bmVzcyh0aGlzLkJhc2UsIFwiYnJpZ2h0ZW5cIiwgMjUpO1xuICAgICAgICB0aGlzLkJyaWdodGVuRm9yU2hhZGUgPSB0aGlzLmJyaWdodG5lc3ModGhpcy5CYXNlLCBcImJyaWdodGVuXCIsIDEwKTtcbiAgICAgICAgdGhpcy5EYXJrZW4gPSB0aGlzLmJyaWdodG5lc3ModGhpcy5CYXNlLCBcImRhcmtlblwiLCAyMCk7XG4gICAgICAgIHRoaXMuRGFya2VuRm9yU2hhZGUgPSB0aGlzLmJyaWdodG5lc3ModGhpcy5CYXNlLCBcImRhcmtlblwiLCAxMCk7XG4gICAgICAgIGNvbnN0IGx1bWluYW5jZSA9IE1hdGguZmxvb3IodGhpcy5sdW1pbmFuY2UodGhpcy5CYXNlKSAqIDEwMCk7XG4gICAgICAgIGNvbnN0IGRhcmtlbiA9XG4gICAgICAgICAgbHVtaW5hbmNlID4gNTBcbiAgICAgICAgICAgID8gNVxuICAgICAgICAgICAgOiBsdW1pbmFuY2UgPiA0MFxuICAgICAgICAgICAgPyAxMFxuICAgICAgICAgICAgOiBsdW1pbmFuY2UgPiAyMFxuICAgICAgICAgICAgPyAxNVxuICAgICAgICAgICAgOiBsdW1pbmFuY2U7XG4gICAgICAgIGNvbnN0IGJyaWdodGVuID1cbiAgICAgICAgICBsdW1pbmFuY2UgPiA1NVxuICAgICAgICAgICAgPyA2NVxuICAgICAgICAgICAgOiBsdW1pbmFuY2UgPiA0NVxuICAgICAgICAgICAgPyA2MFxuICAgICAgICAgICAgOiBsdW1pbmFuY2UgPiAyMFxuICAgICAgICAgICAgPyA1NVxuICAgICAgICAgICAgOiBsdW1pbmFuY2UgPiAxMFxuICAgICAgICAgICAgPyA0NVxuICAgICAgICAgICAgOiA4MDtcbiAgICAgICAgdGhpcy5CcmlnaHRTaGFkZSA9IHRoaXMuYnJpZ2h0bmVzcyhcbiAgICAgICAgICB0aGlzLmJyaWdodG5lc3ModGhpcy5CYXNlLCBcImRhcmtlblwiLCBkYXJrZW4pLFxuICAgICAgICAgIFwiYnJpZ2h0ZW5cIixcbiAgICAgICAgICBicmlnaHRlblxuICAgICAgICApO1xuICAgICAgICB0aGlzLkJyaWdodFdhcm1seSA9IHRoaXMuYnJpZ2h0bmVzcyhcbiAgICAgICAgICB0aGlzLmJyaWdodG5lc3ModGhpcy5zYXR1cmF0ZSh0aGlzLkJhc2UpLCBcImRhcmtlblwiLCBkYXJrZW4gLSAxMCksXG4gICAgICAgICAgXCJicmlnaHRlblwiLFxuICAgICAgICAgIGJyaWdodGVuIC0gNVxuICAgICAgICApO1xuICAgICAgICB0aGlzLlRyYW5zcGFyZW50RGFya2VuVmFyaWFuY2UgPSB0aGlzLmJyaWdodG5lc3MoXG4gICAgICAgICAgdGhpcy50cmFuc3BhcmVudGl6ZSh0aGlzLkJhc2UsIDgwKSxcbiAgICAgICAgICBcImRhcmtlblwiLFxuICAgICAgICAgIDQwXG4gICAgICAgICk7XG4gICAgICAgIGlmICh0aGlzLmlzQnJpZ2h0KHRoaXMuQmFzZSkpIHtcbiAgICAgICAgICB0aGlzLkNvbnRyYXN0Q29sb3IgPSBcInJnYmEoNTgsNjUsNzEsMC41KVwiO1xuICAgICAgICAgIHRoaXMuSXNCYXNlQnJpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLkNvbnRyYXN0Q29sb3IgPSBcInJnYigyNTUsMjU1LDI1NSwgMC43KVwiO1xuICAgICAgICAgIHRoaXMuSXNCYXNlQnJpZ2h0ID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvKlx0ICAgICAgIGNvbnNvbGUubG9nKCclYyBCcmlnaHRTaGFkZSAnLCBgYmFja2dyb3VuZDogJHt0aGlzLkJyaWdodFNoYWRlfTsgY29sb3I6ICR7dGhpcy5Db250cmFzdENvbG9yfWAsIHRoaXMuQnJpZ2h0U2hhZGUpO1xuXHRcdFx0XHRcdCAgICAgICBjb25zb2xlLmxvZygnJWMgQnJpZ2h0V2FybWx5ICcsIGBiYWNrZ3JvdW5kOiAke3RoaXMuQnJpZ2h0V2FybWx5fTsgY29sb3I6ICR7dGhpcy5Db250cmFzdENvbG9yfWAsIHRoaXMuQnJpZ2h0V2FybWx5KTtcblx0XHRcdFx0XHRcdCAgIGNvbnNvbGUubG9nKCclYyBCcmlnaHRlbiAnLCBgYmFja2dyb3VuZDogJHt0aGlzLkJyaWdodGVufTsgY29sb3I6ICR7dGhpcy5Db250cmFzdENvbG9yfWAsIHRoaXMuQnJpZ2h0ZW4pO1xuXHRcdFx0XHRcdFx0ICAgY29uc29sZS5sb2coJyVjIEJyaWdodGVuRm9yU2hhZGUgJywgYGJhY2tncm91bmQ6ICR7dGhpcy5CcmlnaHRlbkZvclNoYWRlfTsgY29sb3I6ICR7dGhpcy5Db250cmFzdENvbG9yfWAsIHRoaXMuQnJpZ2h0ZW5Gb3JTaGFkZSk7XG5cdFx0XHRcdFx0ICAgICAgIGNvbnNvbGUubG9nKCclYyBCYXNlICcsIGBiYWNrZ3JvdW5kOiAke3RoaXMuQmFzZX07IGNvbG9yOiAke3RoaXMuQ29udHJhc3RDb2xvcn1gLCB0aGlzLkJhc2UpO1xuXHRcdFx0XHRcdCAgICAgICBjb25zb2xlLmxvZygnJWMgRGFya2VuRm9yU2hhZGUgJywgYGJhY2tncm91bmQ6ICR7dGhpcy5EYXJrZW5Gb3JTaGFkZX07IGNvbG9yOiAke3RoaXMuQ29udHJhc3RDb2xvcn1gLCB0aGlzLkRhcmtlbkZvclNoYWRlKTtcblx0XHRcdFx0XHQgICAgICAgY29uc29sZS5sb2coJyVjIERhcmtlbiAnLCBgYmFja2dyb3VuZDogJHt0aGlzLkRhcmtlbn07IGNvbG9yOiAke3RoaXMuQ29udHJhc3RDb2xvcn1gLCB0aGlzLkRhcmtlbik7XG5cdFx0XHRcdFx0XHQgICBjb25zb2xlLmxvZygnJWMgVHJhbnNwYXJlbnREYXJrZW5WYXJpYW5jZSAnLCBgYmFja2dyb3VuZDogJHt0aGlzLlRyYW5zcGFyZW50RGFya2VuVmFyaWFuY2V9OyBjb2xvcjogJHt0aGlzLkNvbnRyYXN0Q29sb3J9YCwgdGhpcy5UcmFuc3BhcmVudERhcmtlblZhcmlhbmNlKTtcblx0XHRcdCovXG4gICAgICB9XG4gICAgfVxuXG4gICAgc2F0dXJhdGUoX1JnYjogc3RyaW5nKSB7XG4gICAgICBjb25zdCByZ2JJbnRBcnJheSA9IHRoaXMuZ2V0UkdCQXJyYXkoX1JnYik7XG4gICAgICBjb25zdCBncmV5VmFsID0gdGhpcy5nZXRMaWdodG5lc3NPZlJHQihfUmdiKSAqIDU1O1xuICAgICAgY29uc3QgW2xvd2VzdCwgbWlkZGxlLCBoaWdoZXN0XSA9IHRoaXMuZ2V0TG93TWlkSGkocmdiSW50QXJyYXkpO1xuXG4gICAgICBpZiAobG93ZXN0LnZhbCA9PT0gaGlnaGVzdC52YWwpIHtcbiAgICAgICAgcmV0dXJuIF9SZ2I7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHNhdHVyYXRpb25SYW5nZSA9IE1hdGgucm91bmQoTWF0aC5taW4oMjU1IC0gZ3JleVZhbCwgZ3JleVZhbCkpO1xuICAgICAgY29uc3QgbWF4Q2hhbmdlID0gTWF0aC5taW4oMjU1IC0gaGlnaGVzdC52YWwsIGxvd2VzdC52YWwpO1xuICAgICAgY29uc3QgY2hhbmdlQW1vdW50ID0gTWF0aC5taW4oc2F0dXJhdGlvblJhbmdlIC8gMTAsIG1heENoYW5nZSk7XG4gICAgICBjb25zdCBtaWRkbGVWYWx1ZVJhdGlvID1cbiAgICAgICAgKGdyZXlWYWwgLSBtaWRkbGUudmFsKSAvIChncmV5VmFsIC0gaGlnaGVzdC52YWwpICsgMC4wNztcblxuICAgICAgY29uc3QgcmV0dXJuQXJyYXkgPSBbXTtcbiAgICAgIHJldHVybkFycmF5W2hpZ2hlc3QuaW5kZXhdID0gTWF0aC5yb3VuZChoaWdoZXN0LnZhbCArIGNoYW5nZUFtb3VudCk7XG4gICAgICByZXR1cm5BcnJheVtsb3dlc3QuaW5kZXhdID0gTWF0aC5yb3VuZChsb3dlc3QudmFsIC0gY2hhbmdlQW1vdW50KTtcbiAgICAgIHJldHVybkFycmF5W21pZGRsZS5pbmRleF0gPSBNYXRoLnJvdW5kKFxuICAgICAgICBncmV5VmFsICsgKHJldHVybkFycmF5W2hpZ2hlc3QuaW5kZXhdIC0gZ3JleVZhbCkgKiBtaWRkbGVWYWx1ZVJhdGlvICsgNVxuICAgICAgKTtcbiAgICAgIHJldHVybiBgcmdiKCR7W3JldHVybkFycmF5XS5qb2luKCl9KWA7XG4gICAgfVxuXG4gICAgcHVibGljIGJyaWdodG5lc3MoXG4gICAgICBfUmdiOiBzdHJpbmcsXG4gICAgICBfQWN0aW9uOiBcImJyaWdodGVuXCIgfCBcImRhcmtlblwiLFxuICAgICAgX1BlcmNlbnRhZ2U6IG51bWJlclxuICAgICk6IHN0cmluZyB7XG4gICAgICBjb25zdCByZ2JJbnRBcnJheSA9IHRoaXMuZ2V0UkdCQXJyYXkoX1JnYik7XG4gICAgICBjb25zdCBbbG93ZXN0LCBtaWRkbGUsIGhpZ2hlc3RdID0gdGhpcy5nZXRMb3dNaWRIaShyZ2JJbnRBcnJheSk7XG5cbiAgICAgIGlmIChfQWN0aW9uID09PSBcImJyaWdodGVuXCIgJiYgbG93ZXN0LnZhbCA9PT0gMjU1KSB7XG4gICAgICAgIHJldHVybiBfUmdiO1xuICAgICAgfVxuXG4gICAgICBpZiAoX0FjdGlvbiA9PT0gXCJkYXJrZW5cIiAmJiBoaWdoZXN0LnZhbCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gX1JnYjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYW1vdW50ID0gKF9QZXJjZW50YWdlIC8gMTAwKSAqIDI1NTtcblxuICAgICAgbGV0IHJldHVybkxpc3QgPSBbXTtcblxuICAgICAgaWYgKF9BY3Rpb24gPT09IFwiYnJpZ2h0ZW5cIikge1xuICAgICAgICByZXR1cm5MaXN0W2xvd2VzdC5pbmRleF0gPSBNYXRoLnJvdW5kKFxuICAgICAgICAgIGxvd2VzdC52YWwgKyBNYXRoLm1pbigyNTUgLSBsb3dlc3QudmFsLCBhbW91bnQpXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGluY3JlYXNlRnJhY3Rpb24gPVxuICAgICAgICAgIChyZXR1cm5MaXN0W2xvd2VzdC5pbmRleF0gLSBsb3dlc3QudmFsKSAvICgyNTUgLSBsb3dlc3QudmFsKTtcbiAgICAgICAgcmV0dXJuTGlzdFttaWRkbGUuaW5kZXhdID1cbiAgICAgICAgICBtaWRkbGUudmFsICsgKDI1NSAtIG1pZGRsZS52YWwpICogaW5jcmVhc2VGcmFjdGlvbjtcbiAgICAgICAgcmV0dXJuTGlzdFtoaWdoZXN0LmluZGV4XSA9XG4gICAgICAgICAgaGlnaGVzdC52YWwgKyAoMjU1IC0gaGlnaGVzdC52YWwpICogaW5jcmVhc2VGcmFjdGlvbjtcbiAgICAgIH1cbiAgICAgIGlmIChfQWN0aW9uID09PSBcImRhcmtlblwiKSB7XG4gICAgICAgIHJldHVybkxpc3RbaGlnaGVzdC5pbmRleF0gPSBoaWdoZXN0LnZhbCAtIE1hdGgubWluKGhpZ2hlc3QudmFsLCBhbW91bnQpO1xuICAgICAgICBjb25zdCBkZWNyZWFzZUZyYWN0aW9uID1cbiAgICAgICAgICAoaGlnaGVzdC52YWwgLSByZXR1cm5MaXN0W2hpZ2hlc3QuaW5kZXhdKSAvIGhpZ2hlc3QudmFsO1xuICAgICAgICByZXR1cm5MaXN0W21pZGRsZS5pbmRleF0gPSBtaWRkbGUudmFsIC0gbWlkZGxlLnZhbCAqIGRlY3JlYXNlRnJhY3Rpb247XG4gICAgICAgIHJldHVybkxpc3RbbG93ZXN0LmluZGV4XSA9IGxvd2VzdC52YWwgLSBsb3dlc3QudmFsICogZGVjcmVhc2VGcmFjdGlvbjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuTGlzdCA9IHJldHVybkxpc3QubWFwKChpdGVtKSA9PiBNYXRoLnJvdW5kKGl0ZW0pKTtcbiAgICAgIGlmIChyZ2JJbnRBcnJheS5sZW5ndGggPiAzKSB7XG4gICAgICAgIHJldHVybkxpc3QucHVzaChyZ2JJbnRBcnJheVszXSk7XG4gICAgICAgIHJldHVybiBgcmdiYSgke3JldHVybkxpc3Quam9pbigpfSlgO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGByZ2IoJHtyZXR1cm5MaXN0LmpvaW4oKX0pYDtcbiAgICB9XG5cbiAgICBnZXRMaWdodG5lc3NPZlJHQihfUmdiOiBzdHJpbmcpIHtcbiAgICAgIGNvbnN0IHJnYkludEFycmF5ID0gdGhpcy5nZXRSR0JBcnJheShfUmdiKTtcblxuICAgICAgY29uc3QgaGlnaGVzdCA9IE1hdGgubWF4KC4uLnJnYkludEFycmF5KTtcbiAgICAgIGNvbnN0IGxvd2VzdCA9IE1hdGgubWluKC4uLnJnYkludEFycmF5KTtcbiAgICAgIHJldHVybiAoaGlnaGVzdCArIGxvd2VzdCkgLyAyIC8gMjU1O1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNCcmlnaHQoX1JnYjogc3RyaW5nKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb250cmFzdCh0aGlzLmx1bWluYW5jZShfUmdiKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRMb3dNaWRIaShfUmdiQXJyYXk6IG51bWJlcltdKSB7XG4gICAgICBjb25zdCByZ2JBcnJheUNvcHkgPSBfUmdiQXJyYXkuc2xpY2UoKTtcbiAgICAgIGNvbnN0IHJnYkFycmF5V2l0aG91dEFscGhhID1cbiAgICAgICAgX1JnYkFycmF5Lmxlbmd0aCA+IDNcbiAgICAgICAgICA/IHJnYkFycmF5Q29weS5yZXZlcnNlKCkuc2xpY2UoMSkucmV2ZXJzZSgpXG4gICAgICAgICAgOiBfUmdiQXJyYXk7XG4gICAgICBsZXQgaGlnaGVzdCA9IHsgdmFsOiAtMSwgaW5kZXg6IC0xIH07XG4gICAgICBsZXQgbG93ZXN0ID0geyB2YWw6IEluZmluaXR5LCBpbmRleDogLTEgfTtcblxuICAgICAgcmdiQXJyYXlXaXRob3V0QWxwaGEubWFwKCh2YWwsIGluZGV4KSA9PiB7XG4gICAgICAgIGlmICh2YWwgPiBoaWdoZXN0LnZhbCkge1xuICAgICAgICAgIGhpZ2hlc3QgPSB7IHZhbDogdmFsLCBpbmRleDogaW5kZXggfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmFsIDwgbG93ZXN0LnZhbCkge1xuICAgICAgICAgIGxvd2VzdCA9IHsgdmFsOiB2YWwsIGluZGV4OiBpbmRleCB9O1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgaWYgKGxvd2VzdC5pbmRleCA9PT0gaGlnaGVzdC5pbmRleCkge1xuICAgICAgICBsb3dlc3QuaW5kZXggPSBoaWdoZXN0LmluZGV4ICsgMTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbWlkZGxlSW5kZXggPSAzIC0gaGlnaGVzdC5pbmRleCAtIGxvd2VzdC5pbmRleDtcbiAgICAgIGxldCBtaWRkbGUgPSB7XG4gICAgICAgIHZhbDogcmdiQXJyYXlXaXRob3V0QWxwaGFbbWlkZGxlSW5kZXhdLFxuICAgICAgICBpbmRleDogbWlkZGxlSW5kZXgsXG4gICAgICB9O1xuICAgICAgcmV0dXJuIFtsb3dlc3QsIG1pZGRsZSwgaGlnaGVzdF07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjb250cmFzdChfTHVtaW5hbmNlKSB7XG4gICAgICBjb25zdCBicmlnaHRlc3QgPSBNYXRoLm1heCgxLjA1LCBfTHVtaW5hbmNlICsgMC4wNSk7XG4gICAgICBjb25zdCBkYXJrZXN0ID0gTWF0aC5taW4oMS4wNSwgX0x1bWluYW5jZSArIDAuMDUpO1xuICAgICAgY29uc3QgY29udHJhc3QgPSBicmlnaHRlc3QgLyBkYXJrZXN0O1xuICAgICAgcmV0dXJuIGNvbnRyYXN0IDwgMi43O1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNDb2xvcihfU3RyQ29sb3IpIHtcbiAgICAgIGNvbnN0IENTU0RlY2xhcmF0aW9uID0gbmV3IE9wdGlvbigpLnN0eWxlO1xuICAgICAgQ1NTRGVjbGFyYXRpb24uY29sb3IgPSBfU3RyQ29sb3I7XG4gICAgICByZXR1cm4gISFDU1NEZWNsYXJhdGlvbi5jb2xvciA/IENTU0RlY2xhcmF0aW9uLmNvbG9yIDogbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFJHQkFycmF5KF9SZ2I6IHN0cmluZyk6IG51bWJlcltdIHtcbiAgICAgIHJldHVybiBfUmdiXG4gICAgICAgIC5yZXBsYWNlKC9eKHJnYnxyZ2JhKVxcKC8sIFwiXCIpXG4gICAgICAgIC5yZXBsYWNlKC9cXCkkLywgXCJcIilcbiAgICAgICAgLnJlcGxhY2UoL1xccy9nLCBcIlwiKVxuICAgICAgICAuc3BsaXQoXCIsXCIpXG4gICAgICAgIC5tYXAoKHgpID0+ICt4KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGx1bWluYW5jZShfUmdiOiBzdHJpbmcpIHtcbiAgICAgIGNvbnN0IHJnYkludEFycmF5ID0gdGhpcy5nZXRSR0JBcnJheShfUmdiKTtcbiAgICAgIGNvbnN0IFczYWxnb3JpdGhtID0gcmdiSW50QXJyYXkubWFwKChpdGVtKSA9PiB7XG4gICAgICAgIGl0ZW0gLz0gMjU1O1xuICAgICAgICByZXR1cm4gaXRlbSA8PSAwLjAzOTI4XG4gICAgICAgICAgPyBpdGVtIC8gMTIuOTJcbiAgICAgICAgICA6IE1hdGgucG93KChpdGVtICsgMC4wNTUpIC8gMS4wNTUsIDIuNCk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIFczYWxnb3JpdGhtWzBdICogMC4yMTI2ICtcbiAgICAgICAgVzNhbGdvcml0aG1bMV0gKiAwLjcxNTIgK1xuICAgICAgICBXM2FsZ29yaXRobVsyXSAqIDAuMDcyMlxuICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHRyYW5zcGFyZW50aXplKF9SZ2I6IHN0cmluZywgX1BlcmNlbnRhZ2U6IG51bWJlcikge1xuICAgICAgY29uc3QgYmFzZUFycmF5ID0gdGhpcy5CYXNlLnJlcGxhY2UoL14ocmdifHJnYmEpXFwoLywgXCJcIilcbiAgICAgICAgLnJlcGxhY2UoL1xcKSQvLCBcIlwiKVxuICAgICAgICAucmVwbGFjZSgvXFxzL2csIFwiXCIpXG4gICAgICAgIC5zcGxpdChcIixcIilcbiAgICAgICAgLm1hcCgoeCkgPT4gK3gpO1xuICAgICAgaWYgKGJhc2VBcnJheS5sZW5ndGggPiAzKSB7XG4gICAgICAgIGJhc2VBcnJheS5wb3AoKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGFtb3VudCA9ICgxMDAgLSBfUGVyY2VudGFnZSkgLyAxMDA7XG4gICAgICBiYXNlQXJyYXkucHVzaChhbW91bnQpO1xuICAgICAgcmV0dXJuIGByZ2IoJHtiYXNlQXJyYXkuam9pbigpfSlgO1xuICAgIH1cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBEYXRhQ29udHJvbCB7XG4gICAgLyoqXG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIHB1YmxpYyBjb3B5VmFsdWVzRnJvbShfRGF0YTogYW55LCBfRGVzdGluYXRpb25PYmplY3Q6IGFueSk6IGFueSB7XG4gICAgICBpZiAodHlwZW9mIF9EYXRhICE9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIHJldHVybiBfRGVzdGluYXRpb25PYmplY3Q7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRhdGFLZXlzID0gT2JqZWN0LmtleXMoX0RhdGEpO1xuICAgICAgY29uc3QgZGVzdGluYXRpb25PYmplY3RLZXlzID0gT2JqZWN0LmtleXMoX0Rlc3RpbmF0aW9uT2JqZWN0KTtcblxuICAgICAgZGF0YUtleXMuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBkZXN0aW5hdGlvbk9iamVjdEtleXMuZmluZChcbiAgICAgICAgICAgICh0S2V5KSA9PiB0S2V5ID09PSBrZXkgfHwgdEtleSA9PT0gXCJfXCIgKyBrZXlcbiAgICAgICAgICApXG4gICAgICAgICkge1xuICAgICAgICAgIGlmIChrZXkuaW5jbHVkZXMoXCJEYXRlXCIpKSB7XG4gICAgICAgICAgICBjb25zdCBkYXRlID0gRGF0ZS5wYXJzZShfRGF0YVtrZXldKTtcbiAgICAgICAgICAgIGlmIChkYXRlKSB7XG4gICAgICAgICAgICAgIF9EZXN0aW5hdGlvbk9iamVjdFtrZXldID0gbmV3IERhdGUoZGF0ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZiAoX0RhdGFba2V5XSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIF9EZXN0aW5hdGlvbk9iamVjdFtrZXldID0gX0RhdGFba2V5XTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoX0RhdGFba2V5XSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICBfRGVzdGluYXRpb25PYmplY3Rba2V5XSA9IF9EYXRhW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIF9EZXN0aW5hdGlvbk9iamVjdDtcbiAgICB9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgVGltZXIge1xuICAgIFRpbWVQYXNzZWQ6IG51bWJlciA9IDA7XG4gICAgVGltZXI6IGFueTtcbiAgICBQcm9ncmVzczogbnVtYmVyID0gMDtcbiAgICBSZW1haW5pbmc6IG51bWJlciA9IDEwMDtcbiAgICBNaWxsaXNlY29uZHM6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKCkge31cblxuICAgIHNldE1pbGxpc2Vjb25kcyhfTWlsbGlzZWNvbmRzOiBudW1iZXIpIHtcbiAgICAgIHRoaXMuTWlsbGlzZWNvbmRzID0gX01pbGxpc2Vjb25kcztcbiAgICB9XG5cbiAgICByZXNldCgpOiB2b2lkIHtcbiAgICAgIHRoaXMuVGltZVBhc3NlZCA9IDA7XG4gICAgICB0aGlzLlByb2dyZXNzID0gMDtcbiAgICB9XG5cbiAgICBwYXVzZSgpOiB2b2lkIHtcbiAgICAgIHRoaXMuVGltZVBhc3NlZCA9IDA7XG4gICAgICB0aGlzLlByb2dyZXNzID0gMDtcbiAgICB9XG5cbiAgICBzdG9wKCk6IHZvaWQge1xuICAgICAgdGhpcy5UaW1lUGFzc2VkID0gMDtcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5UaW1lcik7XG4gICAgfVxuXG4gICAgc3RhcnQoKTogdm9pZCB7XG4gICAgICB0aGlzLlRpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5UaW1lUGFzc2VkID49IHRoaXMuTWlsbGlzZWNvbmRzKSB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLlRpbWVyKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5UaW1lUGFzc2VkICs9IDEwMDtcbiAgICAgICAgdGhpcy5Qcm9ncmVzcyA9ICh0aGlzLlRpbWVQYXNzZWQgKiAxMDApIC8gdGhpcy5NaWxsaXNlY29uZHM7XG4gICAgICAgIHRoaXMuUmVtYWluaW5nID0gMTAwIC0gdGhpcy5Qcm9ncmVzcztcbiAgICAgIH0sIDEwMCk7XG4gICAgfVxuICB9XG59XG4iXX0=