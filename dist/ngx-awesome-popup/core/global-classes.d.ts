import { ButtonLayoutDisplay } from './enums';
import { IButton, IColorObject, IColorTypes, IGlobalConfig, IGlobalUserConfig, ISizes } from './global-interfaces';
export declare class Sizes implements ISizes {
    width: string;
    minWidth: string;
    maxWidth: string;
    height: string;
    minHeight: string;
    maxHeight: string;
    fullScreen: boolean;
}
export declare class dispatch {
    title: string;
    message: string;
}
export declare class ButtonMaker implements IButton {
    label: string;
    ID: string;
    layoutType: ButtonLayoutDisplay;
    constructor(label: string, ID: string, layoutType?: ButtonLayoutDisplay);
}
export declare class GlobalUserConfig implements IGlobalUserConfig {
    colorList: IColorTypes;
    constructor(_GlobalUserConfig: IGlobalUserConfig);
}
export declare class ColorTypes implements IColorTypes {
    primary: string;
    secondary: string;
    success: string;
    info: string;
    warning: string;
    danger: string;
    light: string;
    dark: string;
    customOne: string;
    customTwo: string;
    customThree: string;
    customFour: string;
    customFive: string;
}
export declare class GlobalConfig implements IGlobalConfig {
    displayColor: IColorObject;
}
export declare class DisplayColor implements IColorObject {
    primary: ColorProvider;
    secondary: ColorProvider;
    success: ColorProvider;
    info: ColorProvider;
    warning: ColorProvider;
    danger: ColorProvider;
    light: ColorProvider;
    dark: ColorProvider;
    customOne: ColorProvider;
    customTwo: ColorProvider;
    customThree: ColorProvider;
    customFour: ColorProvider;
    customFive: ColorProvider;
}
export declare class ColorProvider {
    Base: string;
    Brighten: string;
    BrightenForShade: string;
    Darken: string;
    DarkenForShade: string;
    ContrastColor: string;
    TransparentDarkenVariance: string;
    BrightShade: string;
    BrightWarmly: string;
    IsBaseBright: boolean;
    constructor(_Color: string);
    saturate(_Rgb: string): string;
    brightness(_Rgb: string, _Action: 'brighten' | 'darken', _Percentage: number): string;
    getLightnessOfRGB(_Rgb: string): number;
    private isBright;
    private getLowMidHi;
    private contrast;
    private isColor;
    private getRGBArray;
    private luminance;
    private transparentize;
}
export declare class DataControl {
    copyValuesFrom(_Data: any, _DestinationObject: any): any;
}
export declare class Timer {
    TimePassed: number;
    Timer: any;
    Progress: number;
    Remaining: number;
    Milliseconds: number;
    constructor();
    setMilliseconds(_Milliseconds: number): void;
    reset(): void;
    pause(): void;
    stop(): void;
    start(): void;
}
