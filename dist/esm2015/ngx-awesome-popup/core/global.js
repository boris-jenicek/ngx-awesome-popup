import { ServiceLocator } from "../locator.service";
import { ButtonLayoutDisplay } from "./enums";
import { GlobalConfigService } from "./global-config.service";
export var GlobalClass;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbmd4LWF3ZXNvbWUtcG9wdXAvY29yZS9nbG9iYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUM5QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQWtHOUQsTUFBTSxLQUFXLFdBQVcsQ0FrWTNCO0FBbFlELFdBQWlCLFdBQVc7SUFDMUIsTUFBYSxRQUFRO1FBQXJCO1lBQ0UsVUFBSyxHQUFXLElBQUksQ0FBQztZQUNyQixZQUFPLEdBQVcsSUFBSSxDQUFDO1FBQ3pCLENBQUM7S0FBQTtJQUhZLG9CQUFRLFdBR3BCLENBQUE7SUFFRCxNQUFhLFdBQVc7UUFDdEIsWUFDUyxLQUFhLEVBQ2IsRUFBVSxFQUNWLGFBQWtDLG1CQUFtQixDQUFDLE9BQU87WUFGN0QsVUFBSyxHQUFMLEtBQUssQ0FBUTtZQUNiLE9BQUUsR0FBRixFQUFFLENBQVE7WUFDVixlQUFVLEdBQVYsVUFBVSxDQUFtRDtRQUNuRSxDQUFDO0tBQ0w7SUFOWSx1QkFBVyxjQU12QixDQUFBO0lBRUQsTUFBYSxnQkFBZ0I7UUFHM0IsWUFBWSxpQkFBb0Q7WUFGaEUsY0FBUyxHQUFnQyxJQUFJLFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUdwRSxJQUFJLGlCQUFpQixFQUFFO2dCQUNyQixNQUFNLFdBQVcsR0FBRyxJQUFJLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDbEQsV0FBVyxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDcEQsTUFBTSxTQUFTLEdBQUcsSUFBSSxXQUFXLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQy9DLElBQUksQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFD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QUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDdkMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsQ0FBQztLQUNGO0lBdkNZLGlCQUFLLFFBdUNqQixDQUFBO0FBQ0gsQ0FBQyxFQWxZZ0IsV0FBVyxLQUFYLFdBQVcsUUFrWTNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2VydmljZUxvY2F0b3IgfSBmcm9tIFwiLi4vbG9jYXRvci5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBCdXR0b25MYXlvdXREaXNwbGF5IH0gZnJvbSBcIi4vZW51bXNcIjtcbmltcG9ydCB7IEdsb2JhbENvbmZpZ1NlcnZpY2UgfSBmcm9tIFwiLi9nbG9iYWwtY29uZmlnLnNlcnZpY2VcIjtcblxuZXhwb3J0IG5hbWVzcGFjZSBHbG9iYWxJbnRlcmZhY2Uge1xuICAvKipcbiAgICogRWFjaCBwcm9wZXJ0eSBvZiB7QGxpbmsgQ29sb3JMaXN0fSByZXByZXNlbnQgYSBzdHJpbmcgd2hpY2ggcmVwcmVzZW50IGEgY29sb3IgaW4gaGV4IG9yIHJnYi9yZ2JhIGZvcm1hdC5cbiAgICogRm9yIGF2YWlsYWJsZSBjb2xvciB0eXBlcyhwcm9wZXJ0aWVzKSBjaGVjayB7QGxpbmsgSUNvbG9yVHlwZXN9IGludGVyZmFjZS5cbiAgICogRXZlcnkgY29sb3IgaXMgb3B0aW9uYWwsIGFuZCBpdCB3aWxsIHJlZmxlY3Qgb24gZGlhbG9nIG9yIGJ1dHRvbiBjb2xvciB0eXBlcyBhbmQgaXRzIGNvbG9yIGNvbnRyYXN0IG9yIHZhcmlhbmNlLlxuICAgKiAgKiBgYGB0eXBlc2NyaXB0XG4gICAqIC8vIENvbG9yTGlzdCBvYmplY3QgZXhhbXBsZS5cbiAgICogY29uc3QgY29sb3JMaXN0ID0ge1xuICAgKiAgICAgICAgIENvbG9yTGlzdDoge1xuICAgKiAgICAgICAgICAgIFByaW1hcnkgIDogJyNmZjllMDAnLFxuICAgKiAgICAgICAgICAgIFNlY29uZGFyeTogJyM5ODllYTUnLFxuICAgKiAgICAgICAgICAgIEluZm8gICAgIDogJyMyZjhlZTUnLFxuICAgKiAgICAgICAgICAgIFN1Y2Nlc3MgIDogJyMzY2FlYTMnLFxuICAgKiAgICAgICAgICAgIFdhcm5pbmcgIDogJyNmZmMxMDcnLFxuICAgKiAgICAgICAgICAgIERhbmdlciAgIDogJyNlNDY0NjQnLFxuICAgKiAgICAgICAgICAgIExpZ2h0ICAgIDogJyNmYmZiZmInLFxuICAgKiAgICAgICAgICAgIERhcmsgICAgIDogJyMzNDNhNDAnXG4gICAqICAgICAgICAgICB9XG4gICAqICAgICAgICB9XG4gICAqIGBgYFxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBJR2xvYmFsVXNlckNvbmZpZyB7XG4gICAgQ29sb3JMaXN0PzogR2xvYmFsSW50ZXJmYWNlLklDb2xvclR5cGVzO1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBJR2xvYmFsQ29uZmlnIHtcbiAgICBEaXNwbGF5Q29sb3I/OiBHbG9iYWxJbnRlcmZhY2UuSUNvbG9yT2JqZWN0O1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBJQ29sb3JUeXBlcyB7XG4gICAgUHJpbWFyeT86IHN0cmluZztcbiAgICBTZWNvbmRhcnk/OiBzdHJpbmc7XG4gICAgU3VjY2Vzcz86IHN0cmluZztcbiAgICBJbmZvPzogc3RyaW5nO1xuICAgIFdhcm5pbmc/OiBzdHJpbmc7XG4gICAgRGFuZ2VyPzogc3RyaW5nO1xuICAgIExpZ2h0Pzogc3RyaW5nO1xuICAgIERhcms/OiBzdHJpbmc7XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIElQcml2YXRlUmVzcG9uc2Uge1xuICAgIHNldEJlbG9uZ2luZyhfRGlhbG9nQmVsb25naW5nKTogdm9pZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnRlcmZhY2UgZm9yIGN1c3RvbSBidXR0b24uXG4gICAqXG4gICAqIEV4YW1wbGU6XG4gICAqIGBgYHR5cGVzY3JpcHRcbiAgICogLy8gQ3VzdG9tIGJ1dHRvbiBvYmplY3QuXG4gICAqIGNvbnN0IGJ1dHRvbiA9IHtcbiAgICogICAgICAgIElEICAgICAgICAgOiAnY29uZmlybV9idG4nLFxuICAgKiAgICAgICAgTGFiZWw6ICAgICA6ICdDb25maXJtJ1xuICAgKiAgICAgICAgTGF5b3V0VHlwZSA6IEJ1dHRvbkxheW91dERpc3BsYXkuU1VDQ0VTU1xuICAgKiAgfVxuICAgKiAvLyBPciBpbnN0YW50aWF0ZWQgd2l0aCBCdXR0b25NYWtlciBjbGFzc1xuICAgKiBjb25zdCBidXR0b24yID0gbmV3IEJ1dHRvbk1ha2VyKCdDb25maXJtJywgJ2NvbmZpcm1fYnRuJywgQnV0dG9uTGF5b3V0RGlzcGxheS5TVUNDRVNTKVxuICAgKiBgYGBcbiAgICogKiBCdXR0b25MYXlvdXREaXNwbGF5OiB7QGxpbmsgQnV0dG9uTGF5b3V0RGlzcGxheX1cbiAgICovXG4gIGV4cG9ydCBpbnRlcmZhY2UgSUJ1dHRvbiB7XG4gICAgTGFiZWw6IHN0cmluZztcbiAgICBMYXlvdXRUeXBlOiBCdXR0b25MYXlvdXREaXNwbGF5IHwgbnVsbDtcbiAgICBJRD86IHN0cmluZztcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgSUNvbG9yT2JqZWN0IHtcbiAgICBQcmltYXJ5PzogR2xvYmFsSW50ZXJmYWNlLklDb2xvclByb3ZpZGVyO1xuICAgIFNlY29uZGFyeT86IEdsb2JhbEludGVyZmFjZS5JQ29sb3JQcm92aWRlcjtcbiAgICBTdWNjZXNzPzogR2xvYmFsSW50ZXJmYWNlLklDb2xvclByb3ZpZGVyO1xuICAgIEluZm8/OiBHbG9iYWxJbnRlcmZhY2UuSUNvbG9yUHJvdmlkZXI7XG4gICAgV2FybmluZz86IEdsb2JhbEludGVyZmFjZS5JQ29sb3JQcm92aWRlcjtcbiAgICBEYW5nZXI/OiBHbG9iYWxJbnRlcmZhY2UuSUNvbG9yUHJvdmlkZXI7XG4gICAgTGlnaHQ/OiBHbG9iYWxJbnRlcmZhY2UuSUNvbG9yUHJvdmlkZXI7XG4gICAgRGFyaz86IEdsb2JhbEludGVyZmFjZS5JQ29sb3JQcm92aWRlcjtcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgSUNvbG9yUHJvdmlkZXIge1xuICAgIEJhc2U6IHN0cmluZztcbiAgICBCcmlnaHRlbjogc3RyaW5nO1xuICAgIEJyaWdodGVuRm9yU2hhZGU6IHN0cmluZztcbiAgICBEYXJrZW46IHN0cmluZztcbiAgICBEYXJrZW5Gb3JTaGFkZTogc3RyaW5nO1xuICAgIENvbnRyYXN0Q29sb3I6IHN0cmluZztcbiAgICBCcmlnaHRTaGFkZTogc3RyaW5nO1xuICAgIEJyaWdodFdhcm1seTogc3RyaW5nO1xuICAgIFRyYW5zcGFyZW50RGFya2VuVmFyaWFuY2U6IHN0cmluZztcbiAgICBJc0Jhc2VCcmlnaHQ6IGJvb2xlYW47XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIElEaXNwYXRjaCB7XG4gICAgVGl0bGU6IHN0cmluZztcbiAgICBNZXNzYWdlOiBzdHJpbmc7XG4gIH1cbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBHbG9iYWxDbGFzcyB7XG4gIGV4cG9ydCBjbGFzcyBEaXNwYXRjaCB7XG4gICAgVGl0bGU6IHN0cmluZyA9IG51bGw7XG4gICAgTWVzc2FnZTogc3RyaW5nID0gbnVsbDtcbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBCdXR0b25NYWtlciBpbXBsZW1lbnRzIEdsb2JhbEludGVyZmFjZS5JQnV0dG9uIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBMYWJlbDogc3RyaW5nLFxuICAgICAgcHVibGljIElEOiBzdHJpbmcsXG4gICAgICBwdWJsaWMgTGF5b3V0VHlwZTogQnV0dG9uTGF5b3V0RGlzcGxheSA9IEJ1dHRvbkxheW91dERpc3BsYXkuUFJJTUFSWVxuICAgICkge31cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBHbG9iYWxVc2VyQ29uZmlnIGltcGxlbWVudHMgR2xvYmFsSW50ZXJmYWNlLklHbG9iYWxVc2VyQ29uZmlnIHtcbiAgICBDb2xvckxpc3Q6IEdsb2JhbEludGVyZmFjZS5JQ29sb3JUeXBlcyA9IG5ldyBHbG9iYWxDbGFzcy5Db2xvclR5cGVzKCk7XG5cbiAgICBjb25zdHJ1Y3RvcihfR2xvYmFsVXNlckNvbmZpZzogR2xvYmFsSW50ZXJmYWNlLklHbG9iYWxVc2VyQ29uZmlnKSB7XG4gICAgICBpZiAoX0dsb2JhbFVzZXJDb25maWcpIHtcbiAgICAgICAgY29uc3QgZGF0YUNvbnRyb2wgPSBuZXcgR2xvYmFsQ2xhc3MuRGF0YUNvbnRyb2woKTtcbiAgICAgICAgZGF0YUNvbnRyb2wuY29weVZhbHVlc0Zyb20oX0dsb2JhbFVzZXJDb25maWcsIHRoaXMpO1xuICAgICAgICBjb25zdCBjb2xvckxpc3QgPSBuZXcgR2xvYmFsQ2xhc3MuQ29sb3JUeXBlcygpO1xuICAgICAgICB0aGlzLkNvbG9yTGlzdCA9IGRhdGFDb250cm9sLmNvcHlWYWx1ZXNGcm9tKHRoaXMuQ29sb3JMaXN0LCBjb2xvckxpc3QpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBDb2xvclR5cGVzIGltcGxlbWVudHMgR2xvYmFsSW50ZXJmYWNlLklDb2xvclR5cGVzIHtcbiAgICBQcmltYXJ5OiBzdHJpbmcgPSBudWxsO1xuICAgIFNlY29uZGFyeTogc3RyaW5nID0gbnVsbDtcbiAgICBTdWNjZXNzOiBzdHJpbmcgPSBudWxsO1xuICAgIEluZm86IHN0cmluZyA9IG51bGw7XG4gICAgV2FybmluZzogc3RyaW5nID0gbnVsbDtcbiAgICBEYW5nZXI6IHN0cmluZyA9IG51bGw7XG4gICAgTGlnaHQ6IHN0cmluZyA9IG51bGw7XG4gICAgRGFyazogc3RyaW5nID0gbnVsbDtcbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBSZXNldEdsb2JhbENvbmZpZyB7XG4gICAgY29uc3RydWN0b3IoZ2xvYmFsQ29uZmlnPzogR2xvYmFsSW50ZXJmYWNlLklHbG9iYWxVc2VyQ29uZmlnKSB7XG4gICAgICBjb25zdCBnbG9iYWxDb25maWdTZXJ2aWNlOiBHbG9iYWxDb25maWdTZXJ2aWNlID0gU2VydmljZUxvY2F0b3IuaW5qZWN0b3IuZ2V0KFxuICAgICAgICBHbG9iYWxDb25maWdTZXJ2aWNlXG4gICAgICApO1xuICAgICAgaWYgKGdsb2JhbENvbmZpZykge1xuICAgICAgICBnbG9iYWxDb25maWdTZXJ2aWNlLnNldFVzZXJDb2xvcnMoZ2xvYmFsQ29uZmlnLkNvbG9yTGlzdCk7XG4gICAgICAgIGdsb2JhbENvbmZpZ1NlcnZpY2Uuc2V0Tm9kZVN0eWxlcyhcbiAgICAgICAgICBnbG9iYWxDb25maWdTZXJ2aWNlLnByb2R1Y3Rpb25HbG9iYWxDb25maWcuRGlzcGxheUNvbG9yLFxuICAgICAgICAgIHRydWVcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGdsb2JhbENvbmZpZ1NlcnZpY2UucmVzZXRTdHlsZXMoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgR2xvYmFsQ29uZmlnIGltcGxlbWVudHMgR2xvYmFsSW50ZXJmYWNlLklHbG9iYWxDb25maWcge1xuICAgIERpc3BsYXlDb2xvcjogR2xvYmFsSW50ZXJmYWNlLklDb2xvck9iamVjdCA9IG5ldyBHbG9iYWxDbGFzcy5EaXNwbGF5Q29sb3IoKTtcbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBEaXNwbGF5Q29sb3IgaW1wbGVtZW50cyBHbG9iYWxJbnRlcmZhY2UuSUNvbG9yT2JqZWN0IHtcbiAgICBQcmltYXJ5OiBDb2xvclByb3ZpZGVyID0gbnVsbDtcbiAgICBTZWNvbmRhcnk6IENvbG9yUHJvdmlkZXIgPSBudWxsO1xuICAgIFN1Y2Nlc3M6IENvbG9yUHJvdmlkZXIgPSBudWxsO1xuICAgIEluZm86IENvbG9yUHJvdmlkZXIgPSBudWxsO1xuICAgIFdhcm5pbmc6IENvbG9yUHJvdmlkZXIgPSBudWxsO1xuICAgIERhbmdlcjogQ29sb3JQcm92aWRlciA9IG51bGw7XG4gICAgTGlnaHQ6IENvbG9yUHJvdmlkZXIgPSBudWxsO1xuICAgIERhcms6IENvbG9yUHJvdmlkZXIgPSBudWxsO1xuICB9XG5cbiAgZXhwb3J0IGNsYXNzIENvbG9yUHJvdmlkZXIge1xuICAgIEJhc2U6IHN0cmluZyA9IG51bGw7XG4gICAgQnJpZ2h0ZW46IHN0cmluZyA9IG51bGw7XG4gICAgQnJpZ2h0ZW5Gb3JTaGFkZTogc3RyaW5nID0gbnVsbDtcbiAgICBEYXJrZW46IHN0cmluZyA9IG51bGw7XG4gICAgRGFya2VuRm9yU2hhZGU6IHN0cmluZyA9IG51bGw7XG4gICAgQ29udHJhc3RDb2xvcjogc3RyaW5nID0gbnVsbDtcbiAgICBUcmFuc3BhcmVudERhcmtlblZhcmlhbmNlOiBzdHJpbmcgPSBudWxsO1xuICAgIEJyaWdodFNoYWRlOiBzdHJpbmcgPSBudWxsO1xuICAgIEJyaWdodFdhcm1seTogc3RyaW5nID0gbnVsbDtcbiAgICBJc0Jhc2VCcmlnaHQ6IGJvb2xlYW4gPSBudWxsO1xuXG4gICAgY29uc3RydWN0b3IoX0NvbG9yOiBzdHJpbmcpIHtcbiAgICAgIGlmICgodGhpcy5CYXNlID0gdGhpcy5pc0NvbG9yKF9Db2xvcikpKSB7XG4gICAgICAgIHRoaXMuQnJpZ2h0ZW4gPSB0aGlzLmJyaWdodG5lc3ModGhpcy5CYXNlLCBcImJyaWdodGVuXCIsIDI1KTtcbiAgICAgICAgdGhpcy5CcmlnaHRlbkZvclNoYWRlID0gdGhpcy5icmlnaHRuZXNzKHRoaXMuQmFzZSwgXCJicmlnaHRlblwiLCAxMCk7XG4gICAgICAgIHRoaXMuRGFya2VuID0gdGhpcy5icmlnaHRuZXNzKHRoaXMuQmFzZSwgXCJkYXJrZW5cIiwgMjApO1xuICAgICAgICB0aGlzLkRhcmtlbkZvclNoYWRlID0gdGhpcy5icmlnaHRuZXNzKHRoaXMuQmFzZSwgXCJkYXJrZW5cIiwgMTApO1xuICAgICAgICBjb25zdCBsdW1pbmFuY2UgPSBNYXRoLmZsb29yKHRoaXMubHVtaW5hbmNlKHRoaXMuQmFzZSkgKiAxMDApO1xuICAgICAgICBjb25zdCBkYXJrZW4gPVxuICAgICAgICAgIGx1bWluYW5jZSA+IDUwXG4gICAgICAgICAgICA/IDVcbiAgICAgICAgICAgIDogbHVtaW5hbmNlID4gNDBcbiAgICAgICAgICAgID8gMTBcbiAgICAgICAgICAgIDogbHVtaW5hbmNlID4gMjBcbiAgICAgICAgICAgID8gMTVcbiAgICAgICAgICAgIDogbHVtaW5hbmNlO1xuICAgICAgICBjb25zdCBicmlnaHRlbiA9XG4gICAgICAgICAgbHVtaW5hbmNlID4gNTVcbiAgICAgICAgICAgID8gNjVcbiAgICAgICAgICAgIDogbHVtaW5hbmNlID4gNDVcbiAgICAgICAgICAgID8gNjBcbiAgICAgICAgICAgIDogbHVtaW5hbmNlID4gMjBcbiAgICAgICAgICAgID8gNTVcbiAgICAgICAgICAgIDogbHVtaW5hbmNlID4gMTBcbiAgICAgICAgICAgID8gNDVcbiAgICAgICAgICAgIDogODA7XG4gICAgICAgIHRoaXMuQnJpZ2h0U2hhZGUgPSB0aGlzLmJyaWdodG5lc3MoXG4gICAgICAgICAgdGhpcy5icmlnaHRuZXNzKHRoaXMuQmFzZSwgXCJkYXJrZW5cIiwgZGFya2VuKSxcbiAgICAgICAgICBcImJyaWdodGVuXCIsXG4gICAgICAgICAgYnJpZ2h0ZW5cbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5CcmlnaHRXYXJtbHkgPSB0aGlzLmJyaWdodG5lc3MoXG4gICAgICAgICAgdGhpcy5icmlnaHRuZXNzKHRoaXMuc2F0dXJhdGUodGhpcy5CYXNlKSwgXCJkYXJrZW5cIiwgZGFya2VuIC0gMTApLFxuICAgICAgICAgIFwiYnJpZ2h0ZW5cIixcbiAgICAgICAgICBicmlnaHRlbiAtIDVcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5UcmFuc3BhcmVudERhcmtlblZhcmlhbmNlID0gdGhpcy5icmlnaHRuZXNzKFxuICAgICAgICAgIHRoaXMudHJhbnNwYXJlbnRpemUodGhpcy5CYXNlLCA4MCksXG4gICAgICAgICAgXCJkYXJrZW5cIixcbiAgICAgICAgICA0MFxuICAgICAgICApO1xuICAgICAgICBpZiAodGhpcy5pc0JyaWdodCh0aGlzLkJhc2UpKSB7XG4gICAgICAgICAgdGhpcy5Db250cmFzdENvbG9yID0gXCJyZ2JhKDU4LDY1LDcxLDAuNSlcIjtcbiAgICAgICAgICB0aGlzLklzQmFzZUJyaWdodCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5Db250cmFzdENvbG9yID0gXCJyZ2IoMjU1LDI1NSwyNTUsIDAuNylcIjtcbiAgICAgICAgICB0aGlzLklzQmFzZUJyaWdodCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLypcdCAgICAgICBjb25zb2xlLmxvZygnJWMgQnJpZ2h0U2hhZGUgJywgYGJhY2tncm91bmQ6ICR7dGhpcy5CcmlnaHRTaGFkZX07IGNvbG9yOiAke3RoaXMuQ29udHJhc3RDb2xvcn1gLCB0aGlzLkJyaWdodFNoYWRlKTtcblx0XHRcdFx0XHQgICAgICAgY29uc29sZS5sb2coJyVjIEJyaWdodFdhcm1seSAnLCBgYmFja2dyb3VuZDogJHt0aGlzLkJyaWdodFdhcm1seX07IGNvbG9yOiAke3RoaXMuQ29udHJhc3RDb2xvcn1gLCB0aGlzLkJyaWdodFdhcm1seSk7XG5cdFx0XHRcdFx0XHQgICBjb25zb2xlLmxvZygnJWMgQnJpZ2h0ZW4gJywgYGJhY2tncm91bmQ6ICR7dGhpcy5CcmlnaHRlbn07IGNvbG9yOiAke3RoaXMuQ29udHJhc3RDb2xvcn1gLCB0aGlzLkJyaWdodGVuKTtcblx0XHRcdFx0XHRcdCAgIGNvbnNvbGUubG9nKCclYyBCcmlnaHRlbkZvclNoYWRlICcsIGBiYWNrZ3JvdW5kOiAke3RoaXMuQnJpZ2h0ZW5Gb3JTaGFkZX07IGNvbG9yOiAke3RoaXMuQ29udHJhc3RDb2xvcn1gLCB0aGlzLkJyaWdodGVuRm9yU2hhZGUpO1xuXHRcdFx0XHRcdCAgICAgICBjb25zb2xlLmxvZygnJWMgQmFzZSAnLCBgYmFja2dyb3VuZDogJHt0aGlzLkJhc2V9OyBjb2xvcjogJHt0aGlzLkNvbnRyYXN0Q29sb3J9YCwgdGhpcy5CYXNlKTtcblx0XHRcdFx0XHQgICAgICAgY29uc29sZS5sb2coJyVjIERhcmtlbkZvclNoYWRlICcsIGBiYWNrZ3JvdW5kOiAke3RoaXMuRGFya2VuRm9yU2hhZGV9OyBjb2xvcjogJHt0aGlzLkNvbnRyYXN0Q29sb3J9YCwgdGhpcy5EYXJrZW5Gb3JTaGFkZSk7XG5cdFx0XHRcdFx0ICAgICAgIGNvbnNvbGUubG9nKCclYyBEYXJrZW4gJywgYGJhY2tncm91bmQ6ICR7dGhpcy5EYXJrZW59OyBjb2xvcjogJHt0aGlzLkNvbnRyYXN0Q29sb3J9YCwgdGhpcy5EYXJrZW4pO1xuXHRcdFx0XHRcdFx0ICAgY29uc29sZS5sb2coJyVjIFRyYW5zcGFyZW50RGFya2VuVmFyaWFuY2UgJywgYGJhY2tncm91bmQ6ICR7dGhpcy5UcmFuc3BhcmVudERhcmtlblZhcmlhbmNlfTsgY29sb3I6ICR7dGhpcy5Db250cmFzdENvbG9yfWAsIHRoaXMuVHJhbnNwYXJlbnREYXJrZW5WYXJpYW5jZSk7XG5cdFx0XHQqL1xuICAgICAgfVxuICAgIH1cblxuICAgIHNhdHVyYXRlKF9SZ2I6IHN0cmluZykge1xuICAgICAgY29uc3QgcmdiSW50QXJyYXkgPSB0aGlzLmdldFJHQkFycmF5KF9SZ2IpO1xuICAgICAgY29uc3QgZ3JleVZhbCA9IHRoaXMuZ2V0TGlnaHRuZXNzT2ZSR0IoX1JnYikgKiA1NTtcbiAgICAgIGNvbnN0IFtsb3dlc3QsIG1pZGRsZSwgaGlnaGVzdF0gPSB0aGlzLmdldExvd01pZEhpKHJnYkludEFycmF5KTtcblxuICAgICAgaWYgKGxvd2VzdC52YWwgPT09IGhpZ2hlc3QudmFsKSB7XG4gICAgICAgIHJldHVybiBfUmdiO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzYXR1cmF0aW9uUmFuZ2UgPSBNYXRoLnJvdW5kKE1hdGgubWluKDI1NSAtIGdyZXlWYWwsIGdyZXlWYWwpKTtcbiAgICAgIGNvbnN0IG1heENoYW5nZSA9IE1hdGgubWluKDI1NSAtIGhpZ2hlc3QudmFsLCBsb3dlc3QudmFsKTtcbiAgICAgIGNvbnN0IGNoYW5nZUFtb3VudCA9IE1hdGgubWluKHNhdHVyYXRpb25SYW5nZSAvIDEwLCBtYXhDaGFuZ2UpO1xuICAgICAgY29uc3QgbWlkZGxlVmFsdWVSYXRpbyA9XG4gICAgICAgIChncmV5VmFsIC0gbWlkZGxlLnZhbCkgLyAoZ3JleVZhbCAtIGhpZ2hlc3QudmFsKSArIDAuMDc7XG5cbiAgICAgIGNvbnN0IHJldHVybkFycmF5ID0gW107XG4gICAgICByZXR1cm5BcnJheVtoaWdoZXN0LmluZGV4XSA9IE1hdGgucm91bmQoaGlnaGVzdC52YWwgKyBjaGFuZ2VBbW91bnQpO1xuICAgICAgcmV0dXJuQXJyYXlbbG93ZXN0LmluZGV4XSA9IE1hdGgucm91bmQobG93ZXN0LnZhbCAtIGNoYW5nZUFtb3VudCk7XG4gICAgICByZXR1cm5BcnJheVttaWRkbGUuaW5kZXhdID0gTWF0aC5yb3VuZChcbiAgICAgICAgZ3JleVZhbCArIChyZXR1cm5BcnJheVtoaWdoZXN0LmluZGV4XSAtIGdyZXlWYWwpICogbWlkZGxlVmFsdWVSYXRpbyArIDVcbiAgICAgICk7XG4gICAgICByZXR1cm4gYHJnYigke1tyZXR1cm5BcnJheV0uam9pbigpfSlgO1xuICAgIH1cblxuICAgIHB1YmxpYyBicmlnaHRuZXNzKFxuICAgICAgX1JnYjogc3RyaW5nLFxuICAgICAgX0FjdGlvbjogXCJicmlnaHRlblwiIHwgXCJkYXJrZW5cIixcbiAgICAgIF9QZXJjZW50YWdlOiBudW1iZXJcbiAgICApOiBzdHJpbmcge1xuICAgICAgY29uc3QgcmdiSW50QXJyYXkgPSB0aGlzLmdldFJHQkFycmF5KF9SZ2IpO1xuICAgICAgY29uc3QgW2xvd2VzdCwgbWlkZGxlLCBoaWdoZXN0XSA9IHRoaXMuZ2V0TG93TWlkSGkocmdiSW50QXJyYXkpO1xuXG4gICAgICBpZiAoX0FjdGlvbiA9PT0gXCJicmlnaHRlblwiICYmIGxvd2VzdC52YWwgPT09IDI1NSkge1xuICAgICAgICByZXR1cm4gX1JnYjtcbiAgICAgIH1cblxuICAgICAgaWYgKF9BY3Rpb24gPT09IFwiZGFya2VuXCIgJiYgaGlnaGVzdC52YWwgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIF9SZ2I7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGFtb3VudCA9IChfUGVyY2VudGFnZSAvIDEwMCkgKiAyNTU7XG5cbiAgICAgIGxldCByZXR1cm5MaXN0ID0gW107XG5cbiAgICAgIGlmIChfQWN0aW9uID09PSBcImJyaWdodGVuXCIpIHtcbiAgICAgICAgcmV0dXJuTGlzdFtsb3dlc3QuaW5kZXhdID0gTWF0aC5yb3VuZChcbiAgICAgICAgICBsb3dlc3QudmFsICsgTWF0aC5taW4oMjU1IC0gbG93ZXN0LnZhbCwgYW1vdW50KVxuICAgICAgICApO1xuICAgICAgICBjb25zdCBpbmNyZWFzZUZyYWN0aW9uID1cbiAgICAgICAgICAocmV0dXJuTGlzdFtsb3dlc3QuaW5kZXhdIC0gbG93ZXN0LnZhbCkgLyAoMjU1IC0gbG93ZXN0LnZhbCk7XG4gICAgICAgIHJldHVybkxpc3RbbWlkZGxlLmluZGV4XSA9XG4gICAgICAgICAgbWlkZGxlLnZhbCArICgyNTUgLSBtaWRkbGUudmFsKSAqIGluY3JlYXNlRnJhY3Rpb247XG4gICAgICAgIHJldHVybkxpc3RbaGlnaGVzdC5pbmRleF0gPVxuICAgICAgICAgIGhpZ2hlc3QudmFsICsgKDI1NSAtIGhpZ2hlc3QudmFsKSAqIGluY3JlYXNlRnJhY3Rpb247XG4gICAgICB9XG4gICAgICBpZiAoX0FjdGlvbiA9PT0gXCJkYXJrZW5cIikge1xuICAgICAgICByZXR1cm5MaXN0W2hpZ2hlc3QuaW5kZXhdID0gaGlnaGVzdC52YWwgLSBNYXRoLm1pbihoaWdoZXN0LnZhbCwgYW1vdW50KTtcbiAgICAgICAgY29uc3QgZGVjcmVhc2VGcmFjdGlvbiA9XG4gICAgICAgICAgKGhpZ2hlc3QudmFsIC0gcmV0dXJuTGlzdFtoaWdoZXN0LmluZGV4XSkgLyBoaWdoZXN0LnZhbDtcbiAgICAgICAgcmV0dXJuTGlzdFttaWRkbGUuaW5kZXhdID0gbWlkZGxlLnZhbCAtIG1pZGRsZS52YWwgKiBkZWNyZWFzZUZyYWN0aW9uO1xuICAgICAgICByZXR1cm5MaXN0W2xvd2VzdC5pbmRleF0gPSBsb3dlc3QudmFsIC0gbG93ZXN0LnZhbCAqIGRlY3JlYXNlRnJhY3Rpb247XG4gICAgICB9XG5cbiAgICAgIHJldHVybkxpc3QgPSByZXR1cm5MaXN0Lm1hcCgoaXRlbSkgPT4gTWF0aC5yb3VuZChpdGVtKSk7XG4gICAgICBpZiAocmdiSW50QXJyYXkubGVuZ3RoID4gMykge1xuICAgICAgICByZXR1cm5MaXN0LnB1c2gocmdiSW50QXJyYXlbM10pO1xuICAgICAgICByZXR1cm4gYHJnYmEoJHtyZXR1cm5MaXN0LmpvaW4oKX0pYDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBgcmdiKCR7cmV0dXJuTGlzdC5qb2luKCl9KWA7XG4gICAgfVxuXG4gICAgZ2V0TGlnaHRuZXNzT2ZSR0IoX1JnYjogc3RyaW5nKSB7XG4gICAgICBjb25zdCByZ2JJbnRBcnJheSA9IHRoaXMuZ2V0UkdCQXJyYXkoX1JnYik7XG5cbiAgICAgIGNvbnN0IGhpZ2hlc3QgPSBNYXRoLm1heCguLi5yZ2JJbnRBcnJheSk7XG4gICAgICBjb25zdCBsb3dlc3QgPSBNYXRoLm1pbiguLi5yZ2JJbnRBcnJheSk7XG4gICAgICByZXR1cm4gKGhpZ2hlc3QgKyBsb3dlc3QpIC8gMiAvIDI1NTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzQnJpZ2h0KF9SZ2I6IHN0cmluZykge1xuICAgICAgcmV0dXJuIHRoaXMuY29udHJhc3QodGhpcy5sdW1pbmFuY2UoX1JnYikpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0TG93TWlkSGkoX1JnYkFycmF5OiBudW1iZXJbXSkge1xuICAgICAgY29uc3QgcmdiQXJyYXlDb3B5ID0gX1JnYkFycmF5LnNsaWNlKCk7XG4gICAgICBjb25zdCByZ2JBcnJheVdpdGhvdXRBbHBoYSA9XG4gICAgICAgIF9SZ2JBcnJheS5sZW5ndGggPiAzXG4gICAgICAgICAgPyByZ2JBcnJheUNvcHkucmV2ZXJzZSgpLnNsaWNlKDEpLnJldmVyc2UoKVxuICAgICAgICAgIDogX1JnYkFycmF5O1xuICAgICAgbGV0IGhpZ2hlc3QgPSB7IHZhbDogLTEsIGluZGV4OiAtMSB9O1xuICAgICAgbGV0IGxvd2VzdCA9IHsgdmFsOiBJbmZpbml0eSwgaW5kZXg6IC0xIH07XG5cbiAgICAgIHJnYkFycmF5V2l0aG91dEFscGhhLm1hcCgodmFsLCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAodmFsID4gaGlnaGVzdC52YWwpIHtcbiAgICAgICAgICBoaWdoZXN0ID0geyB2YWw6IHZhbCwgaW5kZXg6IGluZGV4IH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZhbCA8IGxvd2VzdC52YWwpIHtcbiAgICAgICAgICBsb3dlc3QgPSB7IHZhbDogdmFsLCBpbmRleDogaW5kZXggfTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGlmIChsb3dlc3QuaW5kZXggPT09IGhpZ2hlc3QuaW5kZXgpIHtcbiAgICAgICAgbG93ZXN0LmluZGV4ID0gaGlnaGVzdC5pbmRleCArIDE7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG1pZGRsZUluZGV4ID0gMyAtIGhpZ2hlc3QuaW5kZXggLSBsb3dlc3QuaW5kZXg7XG4gICAgICBsZXQgbWlkZGxlID0ge1xuICAgICAgICB2YWw6IHJnYkFycmF5V2l0aG91dEFscGhhW21pZGRsZUluZGV4XSxcbiAgICAgICAgaW5kZXg6IG1pZGRsZUluZGV4LFxuICAgICAgfTtcbiAgICAgIHJldHVybiBbbG93ZXN0LCBtaWRkbGUsIGhpZ2hlc3RdO1xuICAgIH1cblxuICAgIHByaXZhdGUgY29udHJhc3QoX0x1bWluYW5jZSkge1xuICAgICAgY29uc3QgYnJpZ2h0ZXN0ID0gTWF0aC5tYXgoMS4wNSwgX0x1bWluYW5jZSArIDAuMDUpO1xuICAgICAgY29uc3QgZGFya2VzdCA9IE1hdGgubWluKDEuMDUsIF9MdW1pbmFuY2UgKyAwLjA1KTtcbiAgICAgIGNvbnN0IGNvbnRyYXN0ID0gYnJpZ2h0ZXN0IC8gZGFya2VzdDtcbiAgICAgIHJldHVybiBjb250cmFzdCA8IDIuNztcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzQ29sb3IoX1N0ckNvbG9yKSB7XG4gICAgICBjb25zdCBDU1NEZWNsYXJhdGlvbiA9IG5ldyBPcHRpb24oKS5zdHlsZTtcbiAgICAgIENTU0RlY2xhcmF0aW9uLmNvbG9yID0gX1N0ckNvbG9yO1xuICAgICAgcmV0dXJuICEhQ1NTRGVjbGFyYXRpb24uY29sb3IgPyBDU1NEZWNsYXJhdGlvbi5jb2xvciA6IG51bGw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRSR0JBcnJheShfUmdiOiBzdHJpbmcpOiBudW1iZXJbXSB7XG4gICAgICByZXR1cm4gX1JnYlxuICAgICAgICAucmVwbGFjZSgvXihyZ2J8cmdiYSlcXCgvLCBcIlwiKVxuICAgICAgICAucmVwbGFjZSgvXFwpJC8sIFwiXCIpXG4gICAgICAgIC5yZXBsYWNlKC9cXHMvZywgXCJcIilcbiAgICAgICAgLnNwbGl0KFwiLFwiKVxuICAgICAgICAubWFwKCh4KSA9PiAreCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBsdW1pbmFuY2UoX1JnYjogc3RyaW5nKSB7XG4gICAgICBjb25zdCByZ2JJbnRBcnJheSA9IHRoaXMuZ2V0UkdCQXJyYXkoX1JnYik7XG4gICAgICBjb25zdCBXM2FsZ29yaXRobSA9IHJnYkludEFycmF5Lm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICBpdGVtIC89IDI1NTtcbiAgICAgICAgcmV0dXJuIGl0ZW0gPD0gMC4wMzkyOFxuICAgICAgICAgID8gaXRlbSAvIDEyLjkyXG4gICAgICAgICAgOiBNYXRoLnBvdygoaXRlbSArIDAuMDU1KSAvIDEuMDU1LCAyLjQpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBXM2FsZ29yaXRobVswXSAqIDAuMjEyNiArXG4gICAgICAgIFczYWxnb3JpdGhtWzFdICogMC43MTUyICtcbiAgICAgICAgVzNhbGdvcml0aG1bMl0gKiAwLjA3MjJcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB0cmFuc3BhcmVudGl6ZShfUmdiOiBzdHJpbmcsIF9QZXJjZW50YWdlOiBudW1iZXIpIHtcbiAgICAgIGNvbnN0IGJhc2VBcnJheSA9IHRoaXMuQmFzZS5yZXBsYWNlKC9eKHJnYnxyZ2JhKVxcKC8sIFwiXCIpXG4gICAgICAgIC5yZXBsYWNlKC9cXCkkLywgXCJcIilcbiAgICAgICAgLnJlcGxhY2UoL1xccy9nLCBcIlwiKVxuICAgICAgICAuc3BsaXQoXCIsXCIpXG4gICAgICAgIC5tYXAoKHgpID0+ICt4KTtcbiAgICAgIGlmIChiYXNlQXJyYXkubGVuZ3RoID4gMykge1xuICAgICAgICBiYXNlQXJyYXkucG9wKCk7XG4gICAgICB9XG4gICAgICBjb25zdCBhbW91bnQgPSAoMTAwIC0gX1BlcmNlbnRhZ2UpIC8gMTAwO1xuICAgICAgYmFzZUFycmF5LnB1c2goYW1vdW50KTtcbiAgICAgIHJldHVybiBgcmdiKCR7YmFzZUFycmF5LmpvaW4oKX0pYDtcbiAgICB9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgRGF0YUNvbnRyb2wge1xuICAgIC8qKlxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICBwdWJsaWMgY29weVZhbHVlc0Zyb20oX0RhdGE6IGFueSwgX0Rlc3RpbmF0aW9uT2JqZWN0OiBhbnkpOiBhbnkge1xuICAgICAgaWYgKHR5cGVvZiBfRGF0YSAhPT0gXCJvYmplY3RcIikge1xuICAgICAgICByZXR1cm4gX0Rlc3RpbmF0aW9uT2JqZWN0O1xuICAgICAgfVxuXG4gICAgICBjb25zdCBkYXRhS2V5cyA9IE9iamVjdC5rZXlzKF9EYXRhKTtcbiAgICAgIGNvbnN0IGRlc3RpbmF0aW9uT2JqZWN0S2V5cyA9IE9iamVjdC5rZXlzKF9EZXN0aW5hdGlvbk9iamVjdCk7XG5cbiAgICAgIGRhdGFLZXlzLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgZGVzdGluYXRpb25PYmplY3RLZXlzLmZpbmQoXG4gICAgICAgICAgICAodEtleSkgPT4gdEtleSA9PT0ga2V5IHx8IHRLZXkgPT09IFwiX1wiICsga2V5XG4gICAgICAgICAgKVxuICAgICAgICApIHtcbiAgICAgICAgICBpZiAoa2V5LmluY2x1ZGVzKFwiRGF0ZVwiKSkge1xuICAgICAgICAgICAgY29uc3QgZGF0ZSA9IERhdGUucGFyc2UoX0RhdGFba2V5XSk7XG4gICAgICAgICAgICBpZiAoZGF0ZSkge1xuICAgICAgICAgICAgICBfRGVzdGluYXRpb25PYmplY3Rba2V5XSA9IG5ldyBEYXRlKGRhdGUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKF9EYXRhW2tleV0gIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBfRGVzdGluYXRpb25PYmplY3Rba2V5XSA9IF9EYXRhW2tleV07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKF9EYXRhW2tleV0gIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgX0Rlc3RpbmF0aW9uT2JqZWN0W2tleV0gPSBfRGF0YVtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBfRGVzdGluYXRpb25PYmplY3Q7XG4gICAgfVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIFRpbWVyIHtcbiAgICBUaW1lUGFzc2VkOiBudW1iZXIgPSAwO1xuICAgIFRpbWVyOiBhbnk7XG4gICAgUHJvZ3Jlc3M6IG51bWJlciA9IDA7XG4gICAgUmVtYWluaW5nOiBudW1iZXIgPSAxMDA7XG4gICAgTWlsbGlzZWNvbmRzOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgICBzZXRNaWxsaXNlY29uZHMoX01pbGxpc2Vjb25kczogbnVtYmVyKSB7XG4gICAgICB0aGlzLk1pbGxpc2Vjb25kcyA9IF9NaWxsaXNlY29uZHM7XG4gICAgfVxuXG4gICAgcmVzZXQoKTogdm9pZCB7XG4gICAgICB0aGlzLlRpbWVQYXNzZWQgPSAwO1xuICAgICAgdGhpcy5Qcm9ncmVzcyA9IDA7XG4gICAgfVxuXG4gICAgcGF1c2UoKTogdm9pZCB7XG4gICAgICB0aGlzLlRpbWVQYXNzZWQgPSAwO1xuICAgICAgdGhpcy5Qcm9ncmVzcyA9IDA7XG4gICAgfVxuXG4gICAgc3RvcCgpOiB2b2lkIHtcbiAgICAgIHRoaXMuVGltZVBhc3NlZCA9IDA7XG4gICAgICBjbGVhckludGVydmFsKHRoaXMuVGltZXIpO1xuICAgIH1cblxuICAgIHN0YXJ0KCk6IHZvaWQge1xuICAgICAgdGhpcy5UaW1lciA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuVGltZVBhc3NlZCA+PSB0aGlzLk1pbGxpc2Vjb25kcykge1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5UaW1lcik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuVGltZVBhc3NlZCArPSAxMDA7XG4gICAgICAgIHRoaXMuUHJvZ3Jlc3MgPSAodGhpcy5UaW1lUGFzc2VkICogMTAwKSAvIHRoaXMuTWlsbGlzZWNvbmRzO1xuICAgICAgICB0aGlzLlJlbWFpbmluZyA9IDEwMCAtIHRoaXMuUHJvZ3Jlc3M7XG4gICAgICB9LCAxMDApO1xuICAgIH1cbiAgfVxufVxuIl19