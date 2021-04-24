import {ButtonLayoutDisplay} from './enums';

export namespace GlobalInterface {
    
    /**
     * Each property of {@link ColorList} represent a string which represent a color in hex or rgb/rgba format.
     * For available color types(properties) check {@link IColorTypes} interface.
     * Every color is optional, and it will reflect on dialog or button color types and its color contrast or variance.
     *  * ```typescript
     * // ColorList object example.
     * const colorList = {
     *         ColorList: {
     *            Primary  : '#ff9e00',
     *            Secondary: '#989ea5',
     *            Info     : '#2f8ee5',
     *            Success  : '#3caea3',
     *            Warning  : '#ffc107',
     *            Danger   : '#e46464',
     *            Light    : '#fbfbfb',
     *            Dark     : '#343a40'
     *           }
     *        }
     * ```
     */
    export interface IGlobalUserConfig {
        ColorList?: GlobalInterface.IColorTypes;
    }
    
    export interface IGlobalConfig {
        DisplayColor?: GlobalInterface.IColorObject;
    }
    
    export interface IColorTypes {
        Primary?: string;
        Secondary?: string;
        Success?: string;
        Info?: string;
        Warning?: string;
        Danger?: string;
        Light?: string;
        Dark?: string;
    }
    
    export interface IPrivateResponse {
        
        setBelonging(_DialogBelonging): void
    }
    
    /**
     * Interface for custom button.
     *
     * Example:
     * ```typescript
     * // Custom button object.
     * const button = {
     *        ID         : 'confirm_btn',
     *        Label:     : 'Confirm'
     *        LayoutType : ButtonLayoutDisplay.SUCCESS
     *  }
     * // Or instantiated with ButtonMaker class
     * const button2 = new ButtonMaker('Confirm', 'confirm_btn', ButtonLayoutDisplay.SUCCESS)
     * ```
     * * ButtonLayoutDisplay: {@link ButtonLayoutDisplay}
     */
    export interface IButton {
        Label: string;
        LayoutType: ButtonLayoutDisplay | null;
        ID?: string;
    }
    
    export interface IColorObject {
        Primary?: GlobalInterface.IColorProvider;
        Secondary?: GlobalInterface.IColorProvider;
        Success?: GlobalInterface.IColorProvider;
        Info?: GlobalInterface.IColorProvider;
        Warning?: GlobalInterface.IColorProvider;
        Danger?: GlobalInterface.IColorProvider;
        Light?: GlobalInterface.IColorProvider;
        Dark?: GlobalInterface.IColorProvider;
    }
    
    export interface IColorProvider {
    
        Base: string;
        Brighten: string;
        BrightenForShade: string;
        Darken: string;
        DarkenForShade: string;
        ContrastColor: string;
        BrightShade: string;
        TransparentDarkenVariance: string;
        IsBaseBright: boolean;
    }
    
    export interface IDispatch {
        Title: string;
        Message: string;
    }
}

export namespace GlobalClass {
    
    export class Dispatch {
        Title: string   = null;
        Message: string = null;
    }
    
    export class ButtonMaker implements GlobalInterface.IButton {
        
        constructor(public Label: string, public ID: string, public LayoutType: ButtonLayoutDisplay = ButtonLayoutDisplay.PRIMARY) {
        }
    }
    
    export class GlobalUserConfig implements GlobalInterface.IGlobalUserConfig {
        ColorList: GlobalInterface.IColorTypes = new GlobalClass.ColorTypes();
        
        constructor(_GlobalUserConfig: GlobalInterface.IGlobalUserConfig) {
            if (_GlobalUserConfig){
                const dataControl    = new GlobalClass.DataControl();
                dataControl.copyValuesFrom(_GlobalUserConfig, this);
                const colorList = new GlobalClass.ColorTypes();
                this.ColorList  = dataControl.copyValuesFrom(this.ColorList, colorList);
            }
        }
    }
    
    export class ColorTypes implements  GlobalInterface.IColorTypes {
        Primary: string   = null;
        Secondary: string = null;
        Success: string   = null;
        Info: string      = null;
        Warning: string   = null;
        Danger: string    = null;
        Light: string     = null;
        Dark: string      = null;
    }
    
    export class GlobalConfig implements GlobalInterface.IGlobalConfig {
        DisplayColor: GlobalInterface.IColorObject = new GlobalClass.DisplayColor();
    }
    
    export class DisplayColor implements GlobalInterface.IColorObject {
        Primary: ColorProvider   = null;
        Secondary: ColorProvider = null;
        Success: ColorProvider   = null;
        Info: ColorProvider      = null;
        Warning: ColorProvider   = null;
        Danger: ColorProvider    = null;
        Light: ColorProvider     = null;
        Dark: ColorProvider      = null;
    }
    
    export class ColorProvider {
        
        Base: string                      = null;
        Brighten: string                  = null;
        BrightenForShade: string          = null;
        Darken: string                    = null;
        DarkenForShade: string            = null;
        ContrastColor: string             = null;
        TransparentDarkenVariance: string = null;
        BrightShade: string               = null;
        IsBaseBright: boolean             = null;
        
        
        constructor(_Color: string) {
            if (this.Base = this.isColor(_Color)) {
                this.Brighten                  = this.brightness(this.Base, 'brighten', 20);
                this.BrightenForShade          = this.brightness(this.Base, 'brighten', 10);
                this.Darken                    = this.brightness(this.Base, 'darken', 20);
                this.DarkenForShade            = this.brightness(this.Base, 'darken', 10);
                const luminance                = Math.floor(this.luminance(this.Base) * 100);
                const darken                   = luminance > 50 ? 5 : (luminance > 40 ? 10 : (luminance > 20 ? 15 : luminance));
                const brighten                 = luminance > 55 ? 65 : (luminance > 45 ? 60 : (luminance > 20 ? 55 : (luminance > 10 ? 45 : 80)));
                this.BrightShade               = this.brightness(this.brightness(this.Base, 'darken', darken), 'brighten', brighten);
                this.TransparentDarkenVariance = this.brightness(this.transparentize(this.Base, 80), 'darken', 40);
                if (this.isBright(this.Base)) {
                    this.ContrastColor = 'rgba(58,65,71,0.5)';
                    this.IsBaseBright  = true;
                } else {
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
        
        private isBright(_Rgb: string) {
            return this.contrast(this.luminance(_Rgb));
        }
        
        private brightness(_Rgb: string, _Action: 'brighten' | 'darken', _Percentage: number): string {
            const rgbIntArray               = this.getRGBArray(_Rgb);
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
                returnList[lowest.index]  = Math.round(lowest.val + (Math.min(255 - lowest.val, amount)));
                const increaseFraction    = (returnList[lowest.index] - lowest.val) / (255 - lowest.val);
                returnList[middle.index]  = middle.val + (255 - middle.val) * increaseFraction;
                returnList[highest.index] = highest.val + (255 - highest.val) * increaseFraction;
            }
            if (_Action === 'darken') {
                returnList[highest.index] = highest.val - (Math.min(highest.val, amount));
                const decreaseFraction    = (highest.val - returnList[highest.index]) / (highest.val);
                returnList[middle.index]  = middle.val - middle.val * decreaseFraction;
                returnList[lowest.index]  = lowest.val - lowest.val * decreaseFraction;
            }
            
            returnList = returnList.map(item => Math.round(item));
            if (rgbIntArray.length > 3) {
                returnList.push(rgbIntArray[3]);
                return (`rgba(${returnList.join()})`);
            }
            return (`rgb(${returnList.join()})`);
        }
        
        private getLowMidHi(_RgbArray: number[]) {
            const rgbArrayCopy         = _RgbArray.slice();
            const rgbArrayWithoutAlpha = _RgbArray.length > 3 ? rgbArrayCopy.reverse().slice(1).reverse() : _RgbArray;
            let highest                = {val: -1, index: -1};
            let lowest                 = {val: Infinity, index: -1};
            
            rgbArrayWithoutAlpha.map((val, index) => {
                if (val > highest.val) {
                    highest = {val: val, index: index};
                }
                if (val < lowest.val) {
                    lowest = {val: val, index: index};
                }
            });
            
            if (lowest.index === highest.index) {
                lowest.index = highest.index + 1;
            }
            
            const middleIndex = (3 - highest.index - lowest.index);
            let middle        = {val: rgbArrayWithoutAlpha[middleIndex], index: middleIndex};
            return [lowest, middle, highest];
        }
        
        private contrast(_Luminance) {
            const brightest = Math.max(1.05, _Luminance + 0.05);
            const darkest   = Math.min(1.05, _Luminance + 0.05);
            const contrast  = (brightest) / (darkest);
            return contrast < 2.7;
        }
        
        private isColor(_StrColor) {
            const CSSDeclaration = new Option().style;
            CSSDeclaration.color = _StrColor;
            return !!CSSDeclaration.color ? CSSDeclaration.color : null;
        }
        
        private getRGBArray(_Rgb: string): number[] {
            return _Rgb.replace(/^(rgb|rgba)\(/, '').replace(/\)$/, '').replace(/\s/g, '').split(',').map(x => +x);
        }
        
        private luminance(_Rgb: string) {
            const rgbIntArray = this.getRGBArray(_Rgb);
            const W3algorithm = rgbIntArray.map(item => {
                item /= 255;
                return item <= 0.03928
                    ? item / 12.92
                    : Math.pow((item + 0.055) / 1.055, 2.4);
            });
            return W3algorithm[0] * 0.2126 + W3algorithm[1] * 0.7152 + W3algorithm[2] * 0.0722;
        }
        
        private transparentize(_Rgb: string, _Percentage: number) {
            const baseArray = this.Base.replace(/^(rgb|rgba)\(/, '').replace(/\)$/, '').replace(/\s/g, '').split(',').map(x => +x);
            if (baseArray.length > 3) {
                baseArray.pop();
            }
            const amount = (100 - _Percentage) / 100;
            baseArray.push(amount);
            return (`rgb(${baseArray.join()})`);
        }
        
    }
    
    export class DataControl {
        /**
         * @ignore
         */
        public copyValuesFrom(_Data: any, _DestinationObject: any): any {
            
            if (typeof _Data !== 'object') {
                return _DestinationObject;
            }
            
            const dataKeys              = Object.keys(_Data);
            const destinationObjectKeys = Object.keys(_DestinationObject);
            
            dataKeys.forEach(key => {
                
                if (destinationObjectKeys.find(tKey => tKey === key || tKey === '_' + key)) {
                    
                    if (key.includes('Date')) {
                        const date = Date.parse(_Data[key]);
                        if (date) {
                            _DestinationObject[key] = new Date(date);
                        } else {
                            if (_Data[key] !== null) {
                                _DestinationObject[key] = _Data[key];
                            }
                        }
                    } else {
                        if (_Data[key] !== null) {
                            _DestinationObject[key] = _Data[key];
                        }
                        
                    }
                }
            });
            
            return _DestinationObject;
        }
    }
}
