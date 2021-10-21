import { ButtonLayoutDisplay } from './enums';
import { IButton, IColorObject, IColorTypes, IGlobalConfig, IGlobalUserConfig, ISizes } from './global-interfaces';
export declare class Sizes implements ISizes {
    Width: string;
    MinWidth: string;
    MaxWidth: string;
    Height: string;
    MinHeight: string;
    MaxHeight: string;
    FullScreen: boolean;
}
export declare class Dispatch {
    Title: string;
    Message: string;
}
export declare class ButtonMaker implements IButton {
    Label: string;
    ID: string;
    LayoutType: ButtonLayoutDisplay;
    constructor(Label: string, ID: string, LayoutType?: ButtonLayoutDisplay);
}
export declare class GlobalUserConfig implements IGlobalUserConfig {
    ColorList: IColorTypes;
    constructor(_GlobalUserConfig: IGlobalUserConfig);
}
export declare class ColorTypes implements IColorTypes {
    Primary: string;
    Secondary: string;
    Success: string;
    Info: string;
    Warning: string;
    Danger: string;
    Light: string;
    Dark: string;
}
export declare class ResetGlobalConfig {
    constructor(globalConfig?: IGlobalUserConfig);
}
export declare class GlobalConfig implements IGlobalConfig {
    DisplayColor: IColorObject;
}
export declare class DisplayColor implements IColorObject {
    Primary: ColorProvider;
    Secondary: ColorProvider;
    Success: ColorProvider;
    Info: ColorProvider;
    Warning: ColorProvider;
    Danger: ColorProvider;
    Light: ColorProvider;
    Dark: ColorProvider;
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
    /**
     * @ignore
     */
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
