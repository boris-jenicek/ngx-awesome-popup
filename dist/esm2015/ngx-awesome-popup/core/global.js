import { ServiceLocator } from '../locator.service';
import { ButtonLayoutDisplay } from './enums';
import { GlobalConfigService } from './global-config.service';
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
            if (this.Base = this.isColor(_Color)) {
                this.Brighten = this.brightness(this.Base, 'brighten', 25);
                this.BrightenForShade = this.brightness(this.Base, 'brighten', 10);
                this.Darken = this.brightness(this.Base, 'darken', 20);
                this.DarkenForShade = this.brightness(this.Base, 'darken', 10);
                const luminance = Math.floor(this.luminance(this.Base) * 100);
                const darken = luminance > 50 ? 5 : (luminance > 40 ? 10 : (luminance > 20 ? 15 : luminance));
                const brighten = luminance > 55 ? 65 : (luminance > 45 ? 60 : (luminance > 20 ? 55 : (luminance > 10 ? 45 : 80)));
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
            return contrast < 2.7;
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
        getLightnessOfRGB(_Rgb) {
            const rgbIntArray = this.getRGBArray(_Rgb);
            const highest = Math.max(...rgbIntArray);
            const lowest = Math.min(...rgbIntArray);
            return (highest + lowest) / 2 / 255;
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
                this.Progress = this.TimePassed * 100 / this.Milliseconds;
                this.Remaining = 100 - this.Progress;
            }, 100);
        }
    }
    GlobalClass.Timer = Timer;
})(GlobalClass || (GlobalClass = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbmd4LWF3ZXNvbWUtcG9wdXAvY29yZS9nbG9iYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUM1QyxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQXFHNUQsTUFBTSxLQUFXLFdBQVcsQ0EwVTNCO0FBMVVELFdBQWlCLFdBQVc7SUFFM0IsTUFBYSxRQUFRO1FBQXJCO1lBQ0MsVUFBSyxHQUFhLElBQUksQ0FBQztZQUN2QixZQUFPLEdBQVcsSUFBSSxDQUFDO1FBQ3hCLENBQUM7S0FBQTtJQUhZLG9CQUFRLFdBR3BCLENBQUE7SUFFRCxNQUFhLFdBQVc7UUFFdkIsWUFBbUIsS0FBYSxFQUFTLEVBQVUsRUFBUyxhQUFrQyxtQkFBbUIsQ0FBQyxPQUFPO1lBQXRHLFVBQUssR0FBTCxLQUFLLENBQVE7WUFBUyxPQUFFLEdBQUYsRUFBRSxDQUFRO1lBQVMsZUFBVSxHQUFWLFVBQVUsQ0FBbUQ7UUFDekgsQ0FBQztLQUNEO0lBSlksdUJBQVcsY0FJdkIsQ0FBQTtJQUVELE1BQWEsZ0JBQWdCO1FBRzVCLFlBQVksaUJBQW9EO1lBRmhFLGNBQVMsR0FBZ0MsSUFBSSxXQUFXLENBQUMsVUFBVSxFQUFFLENBQUM7WUFHckUsSUFBSSxpQkFBaUIsRUFBRTtnQkFDdEIsTUFBTSxXQUFXLEdBQUcsSUFBSSxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ2xELFdBQVcsQ0FBQyxjQUFjLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ3BELE1BQU0sU0FBUyxHQUFHLElBQUksV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUMvQyxJQUFJLENBQUMsU0FBUyxHQUFJLFdBQVcsQ0FB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SUFBSSxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDMUUsTUFBTSxTQUFTLEdBQWtCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7Z0JBQzdFLE1BQU0sTUFBTSxHQUFxQixTQUFTLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDaEgsTUFBTSxRQUFRLEdBQW1CLFNBQVMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsSSxJQUFJLENBQUMsV0FBVyxHQUFpQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUNySCxJQUFJLENBQUMsWUFBWSxHQUFpQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsUUFBUSxFQUFFLE1BQU0sR0FBRSxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUs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R0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO2dCQUMzRCxJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBRXRDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNULENBQUM7S0FDRDtJQTFDWSxpQkFBSyxRQTBDakIsQ0FBQTtBQUNGLENBQUMsRUExVWdCLFdBQVcsS0FBWCxXQUFXLFFBMFUzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7U2VydmljZUxvY2F0b3J9IGZyb20gJy4uL2xvY2F0b3Iuc2VydmljZSc7XG5pbXBvcnQge0J1dHRvbkxheW91dERpc3BsYXl9IGZyb20gJy4vZW51bXMnO1xuaW1wb3J0IHtHbG9iYWxDb25maWdTZXJ2aWNlfSBmcm9tICcuL2dsb2JhbC1jb25maWcuc2VydmljZSc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgR2xvYmFsSW50ZXJmYWNlIHtcblxuXHQvKipcblx0ICogRWFjaCBwcm9wZXJ0eSBvZiB7QGxpbmsgQ29sb3JMaXN0fSByZXByZXNlbnQgYSBzdHJpbmcgd2hpY2ggcmVwcmVzZW50IGEgY29sb3IgaW4gaGV4IG9yIHJnYi9yZ2JhIGZvcm1hdC5cblx0ICogRm9yIGF2YWlsYWJsZSBjb2xvciB0eXBlcyhwcm9wZXJ0aWVzKSBjaGVjayB7QGxpbmsgSUNvbG9yVHlwZXN9IGludGVyZmFjZS5cblx0ICogRXZlcnkgY29sb3IgaXMgb3B0aW9uYWwsIGFuZCBpdCB3aWxsIHJlZmxlY3Qgb24gZGlhbG9nIG9yIGJ1dHRvbiBjb2xvciB0eXBlcyBhbmQgaXRzIGNvbG9yIGNvbnRyYXN0IG9yIHZhcmlhbmNlLlxuXHQgKiAgKiBgYGB0eXBlc2NyaXB0XG5cdCAqIC8vIENvbG9yTGlzdCBvYmplY3QgZXhhbXBsZS5cblx0ICogY29uc3QgY29sb3JMaXN0ID0ge1xuXHQgKiAgICAgICAgIENvbG9yTGlzdDoge1xuXHQgKiAgICAgICAgICAgIFByaW1hcnkgIDogJyNmZjllMDAnLFxuXHQgKiAgICAgICAgICAgIFNlY29uZGFyeTogJyM5ODllYTUnLFxuXHQgKiAgICAgICAgICAgIEluZm8gICAgIDogJyMyZjhlZTUnLFxuXHQgKiAgICAgICAgICAgIFN1Y2Nlc3MgIDogJyMzY2FlYTMnLFxuXHQgKiAgICAgICAgICAgIFdhcm5pbmcgIDogJyNmZmMxMDcnLFxuXHQgKiAgICAgICAgICAgIERhbmdlciAgIDogJyNlNDY0NjQnLFxuXHQgKiAgICAgICAgICAgIExpZ2h0ICAgIDogJyNmYmZiZmInLFxuXHQgKiAgICAgICAgICAgIERhcmsgICAgIDogJyMzNDNhNDAnXG5cdCAqICAgICAgICAgICB9XG5cdCAqICAgICAgICB9XG5cdCAqIGBgYFxuXHQgKi9cblx0ZXhwb3J0IGludGVyZmFjZSBJR2xvYmFsVXNlckNvbmZpZyB7XG5cdFx0Q29sb3JMaXN0PzogR2xvYmFsSW50ZXJmYWNlLklDb2xvclR5cGVzO1xuXHR9XG5cblx0ZXhwb3J0IGludGVyZmFjZSBJR2xvYmFsQ29uZmlnIHtcblx0XHREaXNwbGF5Q29sb3I/OiBHbG9iYWxJbnRlcmZhY2UuSUNvbG9yT2JqZWN0O1xuXHR9XG5cblx0ZXhwb3J0IGludGVyZmFjZSBJQ29sb3JUeXBlcyB7XG5cdFx0UHJpbWFyeT86IHN0cmluZztcblx0XHRTZWNvbmRhcnk/OiBzdHJpbmc7XG5cdFx0U3VjY2Vzcz86IHN0cmluZztcblx0XHRJbmZvPzogc3RyaW5nO1xuXHRcdFdhcm5pbmc/OiBzdHJpbmc7XG5cdFx0RGFuZ2VyPzogc3RyaW5nO1xuXHRcdExpZ2h0Pzogc3RyaW5nO1xuXHRcdERhcms/OiBzdHJpbmc7XG5cdH1cblxuXHRleHBvcnQgaW50ZXJmYWNlIElQcml2YXRlUmVzcG9uc2Uge1xuXG5cdFx0c2V0QmVsb25naW5nKF9EaWFsb2dCZWxvbmdpbmcpOiB2b2lkXG5cdH1cblxuXHQvKipcblx0ICogSW50ZXJmYWNlIGZvciBjdXN0b20gYnV0dG9uLlxuXHQgKlxuXHQgKiBFeGFtcGxlOlxuXHQgKiBgYGB0eXBlc2NyaXB0XG5cdCAqIC8vIEN1c3RvbSBidXR0b24gb2JqZWN0LlxuXHQgKiBjb25zdCBidXR0b24gPSB7XG5cdCAqICAgICAgICBJRCAgICAgICAgIDogJ2NvbmZpcm1fYnRuJyxcblx0ICogICAgICAgIExhYmVsOiAgICAgOiAnQ29uZmlybSdcblx0ICogICAgICAgIExheW91dFR5cGUgOiBCdXR0b25MYXlvdXREaXNwbGF5LlNVQ0NFU1Ncblx0ICogIH1cblx0ICogLy8gT3IgaW5zdGFudGlhdGVkIHdpdGggQnV0dG9uTWFrZXIgY2xhc3Ncblx0ICogY29uc3QgYnV0dG9uMiA9IG5ldyBCdXR0b25NYWtlcignQ29uZmlybScsICdjb25maXJtX2J0bicsIEJ1dHRvbkxheW91dERpc3BsYXkuU1VDQ0VTUylcblx0ICogYGBgXG5cdCAqICogQnV0dG9uTGF5b3V0RGlzcGxheToge0BsaW5rIEJ1dHRvbkxheW91dERpc3BsYXl9XG5cdCAqL1xuXHRleHBvcnQgaW50ZXJmYWNlIElCdXR0b24ge1xuXHRcdExhYmVsOiBzdHJpbmc7XG5cdFx0TGF5b3V0VHlwZTogQnV0dG9uTGF5b3V0RGlzcGxheSB8IG51bGw7XG5cdFx0SUQ/OiBzdHJpbmc7XG5cdH1cblxuXHRleHBvcnQgaW50ZXJmYWNlIElDb2xvck9iamVjdCB7XG5cdFx0UHJpbWFyeT86IEdsb2JhbEludGVyZmFjZS5JQ29sb3JQcm92aWRlcjtcblx0XHRTZWNvbmRhcnk/OiBHbG9iYWxJbnRlcmZhY2UuSUNvbG9yUHJvdmlkZXI7XG5cdFx0U3VjY2Vzcz86IEdsb2JhbEludGVyZmFjZS5JQ29sb3JQcm92aWRlcjtcblx0XHRJbmZvPzogR2xvYmFsSW50ZXJmYWNlLklDb2xvclByb3ZpZGVyO1xuXHRcdFdhcm5pbmc/OiBHbG9iYWxJbnRlcmZhY2UuSUNvbG9yUHJvdmlkZXI7XG5cdFx0RGFuZ2VyPzogR2xvYmFsSW50ZXJmYWNlLklDb2xvclByb3ZpZGVyO1xuXHRcdExpZ2h0PzogR2xvYmFsSW50ZXJmYWNlLklDb2xvclByb3ZpZGVyO1xuXHRcdERhcms/OiBHbG9iYWxJbnRlcmZhY2UuSUNvbG9yUHJvdmlkZXI7XG5cdH1cblxuXHRleHBvcnQgaW50ZXJmYWNlIElDb2xvclByb3ZpZGVyIHtcblxuXHRcdEJhc2U6IHN0cmluZztcblx0XHRCcmlnaHRlbjogc3RyaW5nO1xuXHRcdEJyaWdodGVuRm9yU2hhZGU6IHN0cmluZztcblx0XHREYXJrZW46IHN0cmluZztcblx0XHREYXJrZW5Gb3JTaGFkZTogc3RyaW5nO1xuXHRcdENvbnRyYXN0Q29sb3I6IHN0cmluZztcblx0XHRCcmlnaHRTaGFkZTogc3RyaW5nO1xuXHRcdEJyaWdodFdhcm1seTogc3RyaW5nO1xuXHRcdFRyYW5zcGFyZW50RGFya2VuVmFyaWFuY2U6IHN0cmluZztcblx0XHRJc0Jhc2VCcmlnaHQ6IGJvb2xlYW47XG5cdH1cblxuXHRleHBvcnQgaW50ZXJmYWNlIElEaXNwYXRjaCB7XG5cdFx0VGl0bGU6IHN0cmluZztcblx0XHRNZXNzYWdlOiBzdHJpbmc7XG5cdH1cbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBHbG9iYWxDbGFzcyB7XG5cblx0ZXhwb3J0IGNsYXNzIERpc3BhdGNoIHtcblx0XHRUaXRsZTogc3RyaW5nICAgPSBudWxsO1xuXHRcdE1lc3NhZ2U6IHN0cmluZyA9IG51bGw7XG5cdH1cblxuXHRleHBvcnQgY2xhc3MgQnV0dG9uTWFrZXIgaW1wbGVtZW50cyBHbG9iYWxJbnRlcmZhY2UuSUJ1dHRvbiB7XG5cblx0XHRjb25zdHJ1Y3RvcihwdWJsaWMgTGFiZWw6IHN0cmluZywgcHVibGljIElEOiBzdHJpbmcsIHB1YmxpYyBMYXlvdXRUeXBlOiBCdXR0b25MYXlvdXREaXNwbGF5ID0gQnV0dG9uTGF5b3V0RGlzcGxheS5QUklNQVJZKSB7XG5cdFx0fVxuXHR9XG5cblx0ZXhwb3J0IGNsYXNzIEdsb2JhbFVzZXJDb25maWcgaW1wbGVtZW50cyBHbG9iYWxJbnRlcmZhY2UuSUdsb2JhbFVzZXJDb25maWcge1xuXHRcdENvbG9yTGlzdDogR2xvYmFsSW50ZXJmYWNlLklDb2xvclR5cGVzID0gbmV3IEdsb2JhbENsYXNzLkNvbG9yVHlwZXMoKTtcblxuXHRcdGNvbnN0cnVjdG9yKF9HbG9iYWxVc2VyQ29uZmlnOiBHbG9iYWxJbnRlcmZhY2UuSUdsb2JhbFVzZXJDb25maWcpIHtcblx0XHRcdGlmIChfR2xvYmFsVXNlckNvbmZpZykge1xuXHRcdFx0XHRjb25zdCBkYXRhQ29udHJvbCA9IG5ldyBHbG9iYWxDbGFzcy5EYXRhQ29udHJvbCgpO1xuXHRcdFx0XHRkYXRhQ29udHJvbC5jb3B5VmFsdWVzRnJvbShfR2xvYmFsVXNlckNvbmZpZywgdGhpcyk7XG5cdFx0XHRcdGNvbnN0IGNvbG9yTGlzdCA9IG5ldyBHbG9iYWxDbGFzcy5Db2xvclR5cGVzKCk7XG5cdFx0XHRcdHRoaXMuQ29sb3JMaXN0ICA9IGRhdGFDb250cm9sLmNvcHlWYWx1ZXNGcm9tKHRoaXMuQ29sb3JMaXN0LCBjb2xvckxpc3QpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGV4cG9ydCBjbGFzcyBDb2xvclR5cGVzIGltcGxlbWVudHMgR2xvYmFsSW50ZXJmYWNlLklDb2xvclR5cGVzIHtcblx0XHRQcmltYXJ5OiBzdHJpbmcgICA9IG51bGw7XG5cdFx0U2Vjb25kYXJ5OiBzdHJpbmcgPSBudWxsO1xuXHRcdFN1Y2Nlc3M6IHN0cmluZyAgID0gbnVsbDtcblx0XHRJbmZvOiBzdHJpbmcgICAgICA9IG51bGw7XG5cdFx0V2FybmluZzogc3RyaW5nICAgPSBudWxsO1xuXHRcdERhbmdlcjogc3RyaW5nICAgID0gbnVsbDtcblx0XHRMaWdodDogc3RyaW5nICAgICA9IG51bGw7XG5cdFx0RGFyazogc3RyaW5nICAgICAgPSBudWxsO1xuXHR9XG5cblx0ZXhwb3J0IGNsYXNzIFJlc2V0R2xvYmFsQ29uZmlnIHtcblx0XHRjb25zdHJ1Y3RvcihnbG9iYWxDb25maWc/OiBHbG9iYWxJbnRlcmZhY2UuSUdsb2JhbFVzZXJDb25maWcpIHtcblxuXHRcdFx0Y29uc3QgZ2xvYmFsQ29uZmlnU2VydmljZTogR2xvYmFsQ29uZmlnU2VydmljZSA9IFNlcnZpY2VMb2NhdG9yLmluamVjdG9yLmdldChHbG9iYWxDb25maWdTZXJ2aWNlKTtcblx0XHRcdGlmIChnbG9iYWxDb25maWcpIHtcblx0XHRcdFx0Z2xvYmFsQ29uZmlnU2VydmljZS5zZXRVc2VyQ29sb3JzKGdsb2JhbENvbmZpZy5Db2xvckxpc3QpO1xuXHRcdFx0XHRnbG9iYWxDb25maWdTZXJ2aWNlLnNldE5vZGVTdHlsZXMoZ2xvYmFsQ29uZmlnU2VydmljZS5wcm9kdWN0aW9uR2xvYmFsQ29uZmlnLkRpc3BsYXlDb2xvciwgdHJ1ZSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRnbG9iYWxDb25maWdTZXJ2aWNlLnJlc2V0U3R5bGVzKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0ZXhwb3J0IGNsYXNzIEdsb2JhbENvbmZpZyBpbXBsZW1lbnRzIEdsb2JhbEludGVyZmFjZS5JR2xvYmFsQ29uZmlnIHtcblx0XHREaXNwbGF5Q29sb3I6IEdsb2JhbEludGVyZmFjZS5JQ29sb3JPYmplY3QgPSBuZXcgR2xvYmFsQ2xhc3MuRGlzcGxheUNvbG9yKCk7XG5cdH1cblxuXHRleHBvcnQgY2xhc3MgRGlzcGxheUNvbG9yIGltcGxlbWVudHMgR2xvYmFsSW50ZXJmYWNlLklDb2xvck9iamVjdCB7XG5cdFx0UHJpbWFyeTogQ29sb3JQcm92aWRlciAgID0gbnVsbDtcblx0XHRTZWNvbmRhcnk6IENvbG9yUHJvdmlkZXIgPSBudWxsO1xuXHRcdFN1Y2Nlc3M6IENvbG9yUHJvdmlkZXIgICA9IG51bGw7XG5cdFx0SW5mbzogQ29sb3JQcm92aWRlciAgICAgID0gbnVsbDtcblx0XHRXYXJuaW5nOiBDb2xvclByb3ZpZGVyICAgPSBudWxsO1xuXHRcdERhbmdlcjogQ29sb3JQcm92aWRlciAgICA9IG51bGw7XG5cdFx0TGlnaHQ6IENvbG9yUHJvdmlkZXIgICAgID0gbnVsbDtcblx0XHREYXJrOiBDb2xvclByb3ZpZGVyICAgICAgPSBudWxsO1xuXHR9XG5cblx0ZXhwb3J0IGNsYXNzIENvbG9yUHJvdmlkZXIge1xuXG5cdFx0QmFzZTogc3RyaW5nICAgICAgICAgICAgICAgICAgICAgID0gbnVsbDtcblx0XHRCcmlnaHRlbjogc3RyaW5nICAgICAgICAgICAgICAgICAgPSBudWxsO1xuXHRcdEJyaWdodGVuRm9yU2hhZGU6IHN0cmluZyAgICAgICAgICA9IG51bGw7XG5cdFx0RGFya2VuOiBzdHJpbmcgICAgICAgICAgICAgICAgICAgID0gbnVsbDtcblx0XHREYXJrZW5Gb3JTaGFkZTogc3RyaW5nICAgICAgICAgICAgPSBudWxsO1xuXHRcdENvbnRyYXN0Q29sb3I6IHN0cmluZyAgICAgICAgICAgICA9IG51bGw7XG5cdFx0VHJhbnNwYXJlbnREYXJrZW5WYXJpYW5jZTogc3RyaW5nID0gbnVsbDtcblx0XHRCcmlnaHRTaGFkZTogc3RyaW5nICAgICAgICAgICAgICAgPSBudWxsO1xuXHRcdEJyaWdodFdhcm1seTogc3RyaW5nICAgICAgICAgICAgICAgPSBudWxsO1xuXHRcdElzQmFzZUJyaWdodDogYm9vbGVhbiAgICAgICAgICAgICA9IG51bGw7XG5cblxuXHRcdGNvbnN0cnVjdG9yKF9Db2xvcjogc3RyaW5nKSB7XG5cdFx0XHRpZiAodGhpcy5CYXNlID0gdGhpcy5pc0NvbG9yKF9Db2xvcikpIHtcblx0XHRcdFx0dGhpcy5CcmlnaHRlbiAgICAgICAgICAgICAgICAgID0gdGhpcy5icmlnaHRuZXNzKHRoaXMuQmFzZSwgJ2JyaWdodGVuJywgMjUpO1xuXHRcdFx0XHR0aGlzLkJyaWdodGVuRm9yU2hhZGUgICAgICAgICAgPSB0aGlzLmJyaWdodG5lc3ModGhpcy5CYXNlLCAnYnJpZ2h0ZW4nLCAxMCk7XG5cdFx0XHRcdHRoaXMuRGFya2VuICAgICAgICAgICAgICAgICAgICA9IHRoaXMuYnJpZ2h0bmVzcyh0aGlzLkJhc2UsICdkYXJrZW4nLCAyMCk7XG5cdFx0XHRcdHRoaXMuRGFya2VuRm9yU2hhZGUgICAgICAgICAgICA9IHRoaXMuYnJpZ2h0bmVzcyh0aGlzLkJhc2UsICdkYXJrZW4nLCAxMCk7XG5cdFx0XHRcdGNvbnN0IGx1bWluYW5jZSAgICAgICAgICAgICAgICA9IE1hdGguZmxvb3IodGhpcy5sdW1pbmFuY2UodGhpcy5CYXNlKSAqIDEwMCk7XG5cdFx0XHRcdGNvbnN0IGRhcmtlbiAgICAgICAgICAgICAgICAgICA9IGx1bWluYW5jZSA+IDUwID8gNSA6IChsdW1pbmFuY2UgPiA0MCA/IDEwIDogKGx1bWluYW5jZSA+IDIwID8gMTUgOiBsdW1pbmFuY2UpKTtcblx0XHRcdFx0Y29uc3QgYnJpZ2h0ZW4gICAgICAgICAgICAgICAgID0gbHVtaW5hbmNlID4gNTUgPyA2NSA6IChsdW1pbmFuY2UgPiA0NSA/IDYwIDogKGx1bWluYW5jZSA+IDIwID8gNTUgOiAobHVtaW5hbmNlID4gMTAgPyA0NSA6IDgwKSkpO1xuXHRcdFx0XHR0aGlzLkJyaWdodFNoYWRlICAgICAgICAgICAgICAgPSB0aGlzLmJyaWdodG5lc3ModGhpcy5icmlnaHRuZXNzKHRoaXMuQmFzZSwgJ2RhcmtlbicsIGRhcmtlbiksICdicmlnaHRlbicsIGJyaWdodGVuKTtcblx0XHRcdFx0dGhpcy5CcmlnaHRXYXJtbHkgICAgICAgICAgICAgICA9IHRoaXMuYnJpZ2h0bmVzcyh0aGlzLmJyaWdodG5lc3ModGhpcy5zYXR1cmF0ZSh0aGlzLkJhc2UpLCAnZGFya2VuJywgZGFya2VuIC0xMCksICdicmlnaHRlbicsIGJyaWdodGVuIC01KTtcblx0XHRcdFx0dGhpcy5UcmFuc3BhcmVudERhcmtlblZhcmlhbmNlID0gdGhpcy5icmlnaHRuZXNzKHRoaXMudHJhbnNwYXJlbnRpemUodGhpcy5CYXNlLCA4MCksICdkYXJrZW4nLCA0MCk7XG5cdFx0XHRcdGlmICh0aGlzLmlzQnJpZ2h0KHRoaXMuQmFzZSkpIHtcblx0XHRcdFx0XHR0aGlzLkNvbnRyYXN0Q29sb3IgPSAncmdiYSg1OCw2NSw3MSwwLjUpJztcblx0XHRcdFx0XHR0aGlzLklzQmFzZUJyaWdodCAgPSB0cnVlO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuQ29udHJhc3RDb2xvciA9ICdyZ2IoMjU1LDI1NSwyNTUsIDAuNyknO1xuXHRcdFx0XHRcdHRoaXMuSXNCYXNlQnJpZ2h0ICA9IGZhbHNlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LypcdCAgICAgICBjb25zb2xlLmxvZygnJWMgQnJpZ2h0U2hhZGUgJywgYGJhY2tncm91bmQ6ICR7dGhpcy5CcmlnaHRTaGFkZX07IGNvbG9yOiAke3RoaXMuQ29udHJhc3RDb2xvcn1gLCB0aGlzLkJyaWdodFNoYWRlKTtcblx0XHRcdFx0XHQgICAgICAgY29uc29sZS5sb2coJyVjIEJyaWdodFdhcm1seSAnLCBgYmFja2dyb3VuZDogJHt0aGlzLkJyaWdodFdhcm1seX07IGNvbG9yOiAke3RoaXMuQ29udHJhc3RDb2xvcn1gLCB0aGlzLkJyaWdodFdhcm1seSk7XG5cdFx0XHRcdFx0XHQgICBjb25zb2xlLmxvZygnJWMgQnJpZ2h0ZW4gJywgYGJhY2tncm91bmQ6ICR7dGhpcy5CcmlnaHRlbn07IGNvbG9yOiAke3RoaXMuQ29udHJhc3RDb2xvcn1gLCB0aGlzLkJyaWdodGVuKTtcblx0XHRcdFx0XHRcdCAgIGNvbnNvbGUubG9nKCclYyBCcmlnaHRlbkZvclNoYWRlICcsIGBiYWNrZ3JvdW5kOiAke3RoaXMuQnJpZ2h0ZW5Gb3JTaGFkZX07IGNvbG9yOiAke3RoaXMuQ29udHJhc3RDb2xvcn1gLCB0aGlzLkJyaWdodGVuRm9yU2hhZGUpO1xuXHRcdFx0XHRcdCAgICAgICBjb25zb2xlLmxvZygnJWMgQmFzZSAnLCBgYmFja2dyb3VuZDogJHt0aGlzLkJhc2V9OyBjb2xvcjogJHt0aGlzLkNvbnRyYXN0Q29sb3J9YCwgdGhpcy5CYXNlKTtcblx0XHRcdFx0XHQgICAgICAgY29uc29sZS5sb2coJyVjIERhcmtlbkZvclNoYWRlICcsIGBiYWNrZ3JvdW5kOiAke3RoaXMuRGFya2VuRm9yU2hhZGV9OyBjb2xvcjogJHt0aGlzLkNvbnRyYXN0Q29sb3J9YCwgdGhpcy5EYXJrZW5Gb3JTaGFkZSk7XG5cdFx0XHRcdFx0ICAgICAgIGNvbnNvbGUubG9nKCclYyBEYXJrZW4gJywgYGJhY2tncm91bmQ6ICR7dGhpcy5EYXJrZW59OyBjb2xvcjogJHt0aGlzLkNvbnRyYXN0Q29sb3J9YCwgdGhpcy5EYXJrZW4pO1xuXHRcdFx0XHRcdFx0ICAgY29uc29sZS5sb2coJyVjIFRyYW5zcGFyZW50RGFya2VuVmFyaWFuY2UgJywgYGJhY2tncm91bmQ6ICR7dGhpcy5UcmFuc3BhcmVudERhcmtlblZhcmlhbmNlfTsgY29sb3I6ICR7dGhpcy5Db250cmFzdENvbG9yfWAsIHRoaXMuVHJhbnNwYXJlbnREYXJrZW5WYXJpYW5jZSk7XG5cdFx0XHQqL1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHNhdHVyYXRlKF9SZ2I6IHN0cmluZykge1xuXHRcdFx0Y29uc3QgcmdiSW50QXJyYXkgICAgICAgICAgICAgICA9IHRoaXMuZ2V0UkdCQXJyYXkoX1JnYik7XG5cdFx0XHRjb25zdCBncmV5VmFsICAgICAgICAgICAgICAgICAgID0gdGhpcy5nZXRMaWdodG5lc3NPZlJHQihfUmdiKSAqIDU1O1xuXHRcdFx0Y29uc3QgW2xvd2VzdCwgbWlkZGxlLCBoaWdoZXN0XSA9IHRoaXMuZ2V0TG93TWlkSGkocmdiSW50QXJyYXkpO1xuXG5cdFx0XHRpZiAobG93ZXN0LnZhbCA9PT0gaGlnaGVzdC52YWwpIHtcblx0XHRcdFx0cmV0dXJuIF9SZ2I7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IHNhdHVyYXRpb25SYW5nZSA9IE1hdGgucm91bmQoTWF0aC5taW4oMjU1IC0gZ3JleVZhbCwgZ3JleVZhbCkpO1xuXHRcdFx0Y29uc3QgbWF4Q2hhbmdlID0gTWF0aC5taW4oMjU1IC0gaGlnaGVzdC52YWwsIGxvd2VzdC52YWwpO1xuXHRcdFx0Y29uc3QgY2hhbmdlQW1vdW50ID0gTWF0aC5taW4oc2F0dXJhdGlvblJhbmdlIC8gMTAsIG1heENoYW5nZSk7XG5cdFx0XHRjb25zdCBtaWRkbGVWYWx1ZVJhdGlvID0gKGdyZXlWYWwgLSBtaWRkbGUudmFsKSAvIChncmV5VmFsIC0gaGlnaGVzdC52YWwpICsgMC4wNztcblxuXHRcdFx0Y29uc3QgcmV0dXJuQXJyYXkgPSBbXTtcblx0XHRcdHJldHVybkFycmF5W2hpZ2hlc3QuaW5kZXhdID0gTWF0aC5yb3VuZChoaWdoZXN0LnZhbCArIGNoYW5nZUFtb3VudCk7XG5cdFx0XHRyZXR1cm5BcnJheVtsb3dlc3QuaW5kZXhdID0gTWF0aC5yb3VuZChsb3dlc3QudmFsIC0gY2hhbmdlQW1vdW50KTtcblx0XHRcdHJldHVybkFycmF5W21pZGRsZS5pbmRleF0gPSBNYXRoLnJvdW5kKFxuXHRcdFx0XHRncmV5VmFsICsgKHJldHVybkFycmF5W2hpZ2hlc3QuaW5kZXhdIC0gZ3JleVZhbCkgKiBtaWRkbGVWYWx1ZVJhdGlvICsgNVxuXHRcdFx0KTtcblx0XHRcdHJldHVybiBgcmdiKCR7W3JldHVybkFycmF5XS5qb2luKCl9KWA7XG5cdFx0fVxuXG5cblx0XHRwcml2YXRlIGlzQnJpZ2h0KF9SZ2I6IHN0cmluZykge1xuXHRcdFx0cmV0dXJuIHRoaXMuY29udHJhc3QodGhpcy5sdW1pbmFuY2UoX1JnYikpO1xuXHRcdH1cblxuXHRcdHB1YmxpYyBicmlnaHRuZXNzKF9SZ2I6IHN0cmluZywgX0FjdGlvbjogJ2JyaWdodGVuJyB8ICdkYXJrZW4nLCBfUGVyY2VudGFnZTogbnVtYmVyKTogc3RyaW5nIHtcblx0XHRcdGNvbnN0IHJnYkludEFycmF5ICAgICAgICAgICAgICAgPSB0aGlzLmdldFJHQkFycmF5KF9SZ2IpO1xuXHRcdFx0Y29uc3QgW2xvd2VzdCwgbWlkZGxlLCBoaWdoZXN0XSA9IHRoaXMuZ2V0TG93TWlkSGkocmdiSW50QXJyYXkpO1xuXG5cdFx0XHRpZiAoX0FjdGlvbiA9PT0gJ2JyaWdodGVuJyAmJiBsb3dlc3QudmFsID09PSAyNTUpIHtcblx0XHRcdFx0cmV0dXJuIF9SZ2I7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChfQWN0aW9uID09PSAnZGFya2VuJyAmJiBoaWdoZXN0LnZhbCA9PT0gMCkge1xuXHRcdFx0XHRyZXR1cm4gX1JnYjtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgYW1vdW50ID0gX1BlcmNlbnRhZ2UgLyAxMDAgKiAyNTU7XG5cblx0XHRcdGxldCByZXR1cm5MaXN0ID0gW107XG5cblx0XHRcdGlmIChfQWN0aW9uID09PSAnYnJpZ2h0ZW4nKSB7XG5cdFx0XHRcdHJldHVybkxpc3RbbG93ZXN0LmluZGV4XSAgPSBNYXRoLnJvdW5kKGxvd2VzdC52YWwgKyAoTWF0aC5taW4oMjU1IC0gbG93ZXN0LnZhbCwgYW1vdW50KSkpO1xuXHRcdFx0XHRjb25zdCBpbmNyZWFzZUZyYWN0aW9uICAgID0gKHJldHVybkxpc3RbbG93ZXN0LmluZGV4XSAtIGxvd2VzdC52YWwpIC8gKDI1NSAtIGxvd2VzdC52YWwpO1xuXHRcdFx0XHRyZXR1cm5MaXN0W21pZGRsZS5pbmRleF0gID0gbWlkZGxlLnZhbCArICgyNTUgLSBtaWRkbGUudmFsKSAqIGluY3JlYXNlRnJhY3Rpb247XG5cdFx0XHRcdHJldHVybkxpc3RbaGlnaGVzdC5pbmRleF0gPSBoaWdoZXN0LnZhbCArICgyNTUgLSBoaWdoZXN0LnZhbCkgKiBpbmNyZWFzZUZyYWN0aW9uO1xuXHRcdFx0fVxuXHRcdFx0aWYgKF9BY3Rpb24gPT09ICdkYXJrZW4nKSB7XG5cdFx0XHRcdHJldHVybkxpc3RbaGlnaGVzdC5pbmRleF0gPSBoaWdoZXN0LnZhbCAtIChNYXRoLm1pbihoaWdoZXN0LnZhbCwgYW1vdW50KSk7XG5cdFx0XHRcdGNvbnN0IGRlY3JlYXNlRnJhY3Rpb24gICAgPSAoaGlnaGVzdC52YWwgLSByZXR1cm5MaXN0W2hpZ2hlc3QuaW5kZXhdKSAvIChoaWdoZXN0LnZhbCk7XG5cdFx0XHRcdHJldHVybkxpc3RbbWlkZGxlLmluZGV4XSAgPSBtaWRkbGUudmFsIC0gbWlkZGxlLnZhbCAqIGRlY3JlYXNlRnJhY3Rpb247XG5cdFx0XHRcdHJldHVybkxpc3RbbG93ZXN0LmluZGV4XSAgPSBsb3dlc3QudmFsIC0gbG93ZXN0LnZhbCAqIGRlY3JlYXNlRnJhY3Rpb247XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybkxpc3QgPSByZXR1cm5MaXN0Lm1hcChpdGVtID0+IE1hdGgucm91bmQoaXRlbSkpO1xuXHRcdFx0aWYgKHJnYkludEFycmF5Lmxlbmd0aCA+IDMpIHtcblx0XHRcdFx0cmV0dXJuTGlzdC5wdXNoKHJnYkludEFycmF5WzNdKTtcblx0XHRcdFx0cmV0dXJuIChgcmdiYSgke3JldHVybkxpc3Quam9pbigpfSlgKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiAoYHJnYigke3JldHVybkxpc3Quam9pbigpfSlgKTtcblx0XHR9XG5cblx0XHRwcml2YXRlIGdldExvd01pZEhpKF9SZ2JBcnJheTogbnVtYmVyW10pIHtcblx0XHRcdGNvbnN0IHJnYkFycmF5Q29weSAgICAgICAgID0gX1JnYkFycmF5LnNsaWNlKCk7XG5cdFx0XHRjb25zdCByZ2JBcnJheVdpdGhvdXRBbHBoYSA9IF9SZ2JBcnJheS5sZW5ndGggPiAzID8gcmdiQXJyYXlDb3B5LnJldmVyc2UoKS5zbGljZSgxKS5yZXZlcnNlKCkgOiBfUmdiQXJyYXk7XG5cdFx0XHRsZXQgaGlnaGVzdCAgICAgICAgICAgICAgICA9IHt2YWw6IC0xLCBpbmRleDogLTF9O1xuXHRcdFx0bGV0IGxvd2VzdCAgICAgICAgICAgICAgICAgPSB7dmFsOiBJbmZpbml0eSwgaW5kZXg6IC0xfTtcblxuXHRcdFx0cmdiQXJyYXlXaXRob3V0QWxwaGEubWFwKCh2YWwsIGluZGV4KSA9PiB7XG5cdFx0XHRcdGlmICh2YWwgPiBoaWdoZXN0LnZhbCkge1xuXHRcdFx0XHRcdGhpZ2hlc3QgPSB7dmFsOiB2YWwsIGluZGV4OiBpbmRleH07XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHZhbCA8IGxvd2VzdC52YWwpIHtcblx0XHRcdFx0XHRsb3dlc3QgPSB7dmFsOiB2YWwsIGluZGV4OiBpbmRleH07XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRpZiAobG93ZXN0LmluZGV4ID09PSBoaWdoZXN0LmluZGV4KSB7XG5cdFx0XHRcdGxvd2VzdC5pbmRleCA9IGhpZ2hlc3QuaW5kZXggKyAxO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBtaWRkbGVJbmRleCA9ICgzIC0gaGlnaGVzdC5pbmRleCAtIGxvd2VzdC5pbmRleCk7XG5cdFx0XHRsZXQgbWlkZGxlICAgICAgICA9IHt2YWw6IHJnYkFycmF5V2l0aG91dEFscGhhW21pZGRsZUluZGV4XSwgaW5kZXg6IG1pZGRsZUluZGV4fTtcblx0XHRcdHJldHVybiBbbG93ZXN0LCBtaWRkbGUsIGhpZ2hlc3RdO1xuXHRcdH1cblxuXHRcdHByaXZhdGUgY29udHJhc3QoX0x1bWluYW5jZSkge1xuXHRcdFx0Y29uc3QgYnJpZ2h0ZXN0ID0gTWF0aC5tYXgoMS4wNSwgX0x1bWluYW5jZSArIDAuMDUpO1xuXHRcdFx0Y29uc3QgZGFya2VzdCAgID0gTWF0aC5taW4oMS4wNSwgX0x1bWluYW5jZSArIDAuMDUpO1xuXHRcdFx0Y29uc3QgY29udHJhc3QgID0gKGJyaWdodGVzdCkgLyAoZGFya2VzdCk7XG5cdFx0XHRyZXR1cm4gY29udHJhc3QgPCAyLjc7XG5cdFx0fVxuXG5cdFx0cHJpdmF0ZSBpc0NvbG9yKF9TdHJDb2xvcikge1xuXHRcdFx0Y29uc3QgQ1NTRGVjbGFyYXRpb24gPSBuZXcgT3B0aW9uKCkuc3R5bGU7XG5cdFx0XHRDU1NEZWNsYXJhdGlvbi5jb2xvciA9IF9TdHJDb2xvcjtcblx0XHRcdHJldHVybiAhIUNTU0RlY2xhcmF0aW9uLmNvbG9yID8gQ1NTRGVjbGFyYXRpb24uY29sb3IgOiBudWxsO1xuXHRcdH1cblxuXHRcdHByaXZhdGUgZ2V0UkdCQXJyYXkoX1JnYjogc3RyaW5nKTogbnVtYmVyW10ge1xuXHRcdFx0cmV0dXJuIF9SZ2IucmVwbGFjZSgvXihyZ2J8cmdiYSlcXCgvLCAnJykucmVwbGFjZSgvXFwpJC8sICcnKS5yZXBsYWNlKC9cXHMvZywgJycpLnNwbGl0KCcsJykubWFwKHggPT4gK3gpO1xuXHRcdH1cblxuXHRcdHByaXZhdGUgbHVtaW5hbmNlKF9SZ2I6IHN0cmluZykge1xuXHRcdFx0Y29uc3QgcmdiSW50QXJyYXkgPSB0aGlzLmdldFJHQkFycmF5KF9SZ2IpO1xuXHRcdFx0Y29uc3QgVzNhbGdvcml0aG0gPSByZ2JJbnRBcnJheS5tYXAoaXRlbSA9PiB7XG5cdFx0XHRcdGl0ZW0gLz0gMjU1O1xuXHRcdFx0XHRyZXR1cm4gaXRlbSA8PSAwLjAzOTI4XG5cdFx0XHRcdFx0PyBpdGVtIC8gMTIuOTJcblx0XHRcdFx0XHQ6IE1hdGgucG93KChpdGVtICsgMC4wNTUpIC8gMS4wNTUsIDIuNCk7XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBXM2FsZ29yaXRobVswXSAqIDAuMjEyNiArIFczYWxnb3JpdGhtWzFdICogMC43MTUyICsgVzNhbGdvcml0aG1bMl0gKiAwLjA3MjI7XG5cdFx0fVxuXG5cdFx0Z2V0TGlnaHRuZXNzT2ZSR0IoX1JnYjogc3RyaW5nKSB7XG5cdFx0XHRjb25zdCByZ2JJbnRBcnJheSA9IHRoaXMuZ2V0UkdCQXJyYXkoX1JnYik7XG5cblx0XHRcdGNvbnN0IGhpZ2hlc3QgPSBNYXRoLm1heCguLi5yZ2JJbnRBcnJheSk7XG5cdFx0XHRjb25zdCBsb3dlc3QgPSBNYXRoLm1pbiguLi5yZ2JJbnRBcnJheSk7XG5cdFx0XHRyZXR1cm4gKGhpZ2hlc3QgKyBsb3dlc3QpIC8gMiAvIDI1NTtcblx0XHR9XG5cblx0XHRwcml2YXRlIHRyYW5zcGFyZW50aXplKF9SZ2I6IHN0cmluZywgX1BlcmNlbnRhZ2U6IG51bWJlcikge1xuXHRcdFx0Y29uc3QgYmFzZUFycmF5ID0gdGhpcy5CYXNlLnJlcGxhY2UoL14ocmdifHJnYmEpXFwoLywgJycpLnJlcGxhY2UoL1xcKSQvLCAnJykucmVwbGFjZSgvXFxzL2csICcnKS5zcGxpdCgnLCcpLm1hcCh4ID0+ICt4KTtcblx0XHRcdGlmIChiYXNlQXJyYXkubGVuZ3RoID4gMykge1xuXHRcdFx0XHRiYXNlQXJyYXkucG9wKCk7XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBhbW91bnQgPSAoMTAwIC0gX1BlcmNlbnRhZ2UpIC8gMTAwO1xuXHRcdFx0YmFzZUFycmF5LnB1c2goYW1vdW50KTtcblx0XHRcdHJldHVybiAoYHJnYigke2Jhc2VBcnJheS5qb2luKCl9KWApO1xuXHRcdH1cblxuXHR9XG5cblx0ZXhwb3J0IGNsYXNzIERhdGFDb250cm9sIHtcblx0XHQvKipcblx0XHQgKiBAaWdub3JlXG5cdFx0ICovXG5cdFx0cHVibGljIGNvcHlWYWx1ZXNGcm9tKF9EYXRhOiBhbnksIF9EZXN0aW5hdGlvbk9iamVjdDogYW55KTogYW55IHtcblxuXHRcdFx0aWYgKHR5cGVvZiBfRGF0YSAhPT0gJ29iamVjdCcpIHtcblx0XHRcdFx0cmV0dXJuIF9EZXN0aW5hdGlvbk9iamVjdDtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgZGF0YUtleXMgICAgICAgICAgICAgID0gT2JqZWN0LmtleXMoX0RhdGEpO1xuXHRcdFx0Y29uc3QgZGVzdGluYXRpb25PYmplY3RLZXlzID0gT2JqZWN0LmtleXMoX0Rlc3RpbmF0aW9uT2JqZWN0KTtcblxuXHRcdFx0ZGF0YUtleXMuZm9yRWFjaChrZXkgPT4ge1xuXG5cdFx0XHRcdGlmIChkZXN0aW5hdGlvbk9iamVjdEtleXMuZmluZCh0S2V5ID0+IHRLZXkgPT09IGtleSB8fCB0S2V5ID09PSAnXycgKyBrZXkpKSB7XG5cblx0XHRcdFx0XHRpZiAoa2V5LmluY2x1ZGVzKCdEYXRlJykpIHtcblx0XHRcdFx0XHRcdGNvbnN0IGRhdGUgPSBEYXRlLnBhcnNlKF9EYXRhW2tleV0pO1xuXHRcdFx0XHRcdFx0aWYgKGRhdGUpIHtcblx0XHRcdFx0XHRcdFx0X0Rlc3RpbmF0aW9uT2JqZWN0W2tleV0gPSBuZXcgRGF0ZShkYXRlKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGlmIChfRGF0YVtrZXldICE9PSBudWxsKSB7XG5cdFx0XHRcdFx0XHRcdFx0X0Rlc3RpbmF0aW9uT2JqZWN0W2tleV0gPSBfRGF0YVtrZXldO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGlmIChfRGF0YVtrZXldICE9PSBudWxsKSB7XG5cdFx0XHRcdFx0XHRcdF9EZXN0aW5hdGlvbk9iamVjdFtrZXldID0gX0RhdGFba2V5XTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdHJldHVybiBfRGVzdGluYXRpb25PYmplY3Q7XG5cdFx0fVxuXHR9XG5cblx0ZXhwb3J0IGNsYXNzIFRpbWVyIHtcblx0XHRUaW1lUGFzc2VkOiBudW1iZXIgPSAwO1xuXHRcdFRpbWVyOiBhbnk7XG5cdFx0UHJvZ3Jlc3M6IG51bWJlciAgID0gMDtcblx0XHRSZW1haW5pbmc6IG51bWJlciAgPSAxMDA7XG5cdFx0TWlsbGlzZWNvbmRzOiBudW1iZXI7XG5cblx0XHRjb25zdHJ1Y3RvcigpIHtcblx0XHR9XG5cblx0XHRzZXRNaWxsaXNlY29uZHMoX01pbGxpc2Vjb25kczogbnVtYmVyKXtcblx0XHRcdHRoaXMuTWlsbGlzZWNvbmRzID0gX01pbGxpc2Vjb25kcztcblx0XHR9XG5cblx0XHRyZXNldCgpOiB2b2lkIHtcblx0XHRcdHRoaXMuVGltZVBhc3NlZCA9IDA7XG5cdFx0XHR0aGlzLlByb2dyZXNzICAgPSAwO1xuXHRcdH1cblxuXG5cdFx0cGF1c2UoKTogdm9pZCB7XG5cdFx0XHR0aGlzLlRpbWVQYXNzZWQgPSAwO1xuXHRcdFx0dGhpcy5Qcm9ncmVzcyAgID0gMDtcblx0XHR9XG5cblx0XHRzdG9wKCk6IHZvaWQge1xuXHRcdFx0dGhpcy5UaW1lUGFzc2VkID0gMDtcblx0XHRcdGNsZWFySW50ZXJ2YWwodGhpcy5UaW1lcik7XG5cdFx0fVxuXG5cdFx0c3RhcnQoKTogdm9pZCB7XG5cdFx0XHR0aGlzLlRpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuXHRcdFx0XHRpZiAodGhpcy5UaW1lUGFzc2VkID49IHRoaXMuTWlsbGlzZWNvbmRzKSB7XG5cdFx0XHRcdFx0Y2xlYXJJbnRlcnZhbCh0aGlzLlRpbWVyKTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5UaW1lUGFzc2VkICs9IDEwMDtcblx0XHRcdFx0dGhpcy5Qcm9ncmVzcyAgPSB0aGlzLlRpbWVQYXNzZWQgKiAxMDAgLyB0aGlzLk1pbGxpc2Vjb25kcztcblx0XHRcdFx0dGhpcy5SZW1haW5pbmcgPSAxMDAgLSB0aGlzLlByb2dyZXNzO1xuXG5cdFx0XHR9LCAxMDApO1xuXHRcdH1cblx0fVxufVxuIl19