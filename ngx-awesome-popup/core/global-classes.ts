import { ButtonLayoutDisplay } from './enums';
import { IButton, IColorObject, IColorTypes, IGlobalConfig, IGlobalUserConfig, ISizes } from './global-interfaces';

export class Sizes implements ISizes {
  width: string = null;
  minWidth: string = null;
  maxWidth: string = null;
  height: string = null;
  minHeight: string = null;
  maxHeight: string = null;
  fullScreen: boolean = null;
}

export class dispatch {
  title: string = null;
  message: string = null;
}

export class ButtonMaker implements IButton {
  hidden = false;
  constructor(
    public label: string,
    public ID: string,
    public layoutType: ButtonLayoutDisplay = ButtonLayoutDisplay.PRIMARY,
    public disabled: boolean = false
  ) {}

  disable(): void {
    this.disabled = true;
  }
  enable(): void {
    this.disabled = false;
  }
  hide(): void {
    this.hidden = true;
  }
  show(): void {
    this.hidden = false;
  }
}

export class GlobalUserConfig implements IGlobalUserConfig {
  colorList: IColorTypes = new ColorTypes();

  constructor(_GlobalUserConfig: IGlobalUserConfig) {
    if (_GlobalUserConfig) {
      const dataControl = new DataControl();
      dataControl.copyValuesFrom(_GlobalUserConfig, this);
      const colorList = new ColorTypes();
      this.colorList = dataControl.copyValuesFrom(this.colorList, colorList);
    }
  }
}

export class ColorTypes implements IColorTypes {
  primary: string = null;
  secondary: string = null;
  success: string = null;
  info: string = null;
  warning: string = null;
  danger: string = null;
  light: string = null;
  dark: string = null;
  customOne: string = null;
  customTwo: string = null;
  customThree: string = null;
  customFour: string = null;
  customFive: string = null;
}

export class GlobalConfig implements IGlobalConfig {
  displayColor: IColorObject = new DisplayColor();
}

export class DisplayColor implements IColorObject {
  primary: ColorProvider = null;
  secondary: ColorProvider = null;
  success: ColorProvider = null;
  info: ColorProvider = null;
  warning: ColorProvider = null;
  danger: ColorProvider = null;
  light: ColorProvider = null;
  dark: ColorProvider = null;
  customOne: ColorProvider = null;
  customTwo: ColorProvider = null;
  customThree: ColorProvider = null;
  customFour: ColorProvider = null;
  customFive: ColorProvider = null;
}

export class ColorProvider {
  Base: string = null;
  Brighten: string = null;
  BrightenForShade: string = null;
  Darken: string = null;
  DarkenForShade: string = null;
  ContrastColor: string = null;
  TransparentDarkenVariance: string = null;
  BrightShade: string = null;
  BrightWarmly: string = null;
  IsBaseBright: boolean = null;

  constructor(_Color: string) {
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
      } else {
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

  saturate(_Rgb: string): string {
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

  public brightness(_Rgb: string, _Action: 'brighten' | 'darken', _Percentage: number): string {
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

  getLightnessOfRGB(_Rgb: string): number {
    const rgbIntArray = this.getRGBArray(_Rgb);

    const highest = Math.max(...rgbIntArray);
    const lowest = Math.min(...rgbIntArray);
    return (highest + lowest) / 2 / 255;
  }

  private isBright(_Rgb: string): boolean {
    return this.contrast(this.luminance(_Rgb));
  }

  //
  private getLowMidHi(_RgbArray: number[]): { index: number; val: number }[] {
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

  private contrast(_Luminance): boolean {
    const brightest = Math.max(1.05, _Luminance + 0.05);
    const darkest = Math.min(1.05, _Luminance + 0.05);
    const contrast = brightest / darkest;
    return contrast < 2.7;
  }

  private isColor(_StrColor): string {
    const CSSDeclaration = new Option().style;
    CSSDeclaration.color = _StrColor;
    return CSSDeclaration.color ? CSSDeclaration.color : null;
  }

  private getRGBArray(_Rgb: string): number[] {
    return _Rgb
      .replace(/^(rgb|rgba)\(/, '')
      .replace(/\)$/, '')
      .replace(/\s/g, '')
      .split(',')
      .map(x => +x);
  }

  private luminance(_Rgb: string): number {
    const rgbIntArray = this.getRGBArray(_Rgb);
    const W3algorithm = rgbIntArray.map(item => {
      item /= 255;
      return item <= 0.03928 ? item / 12.92 : Math.pow((item + 0.055) / 1.055, 2.4);
    });
    return W3algorithm[0] * 0.2126 + W3algorithm[1] * 0.7152 + W3algorithm[2] * 0.0722;
  }

  private transparentize(_Rgb: string, _Percentage: number): string {
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

export class DataControl {
  /**
   * @ignore
   */
  public copyValuesFrom(_Data: any, _DestinationObject: any): any {
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

export class Timer {
  TimePassed = 0;
  Timer: any;
  Progress = 0;
  Remaining = 100;
  Milliseconds: number;

  constructor() {}

  setMilliseconds(_Milliseconds: number): void {
    this.Milliseconds = _Milliseconds;
  }

  reset(): void {
    this.TimePassed = 0;
    this.Progress = 0;
  }

  pause(): void {
    this.TimePassed = 0;
    this.Progress = 0;
  }

  stop(): void {
    this.TimePassed = 0;
    clearInterval(this.Timer);
  }

  start(): void {
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
