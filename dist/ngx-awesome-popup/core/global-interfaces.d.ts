import { ButtonLayoutDisplay } from './enums';
export interface ISizes {
    width?: string;
    minWidth?: string;
    maxWidth?: string;
    height?: string;
    minHeight?: string;
    maxHeight?: string;
    fullScreen?: boolean;
}
export interface IGlobalUserConfig {
    colorList?: IColorTypes;
}
export interface IGlobalConfig {
    displayColor?: IColorObject;
}
export interface IColorTypes {
    primary?: string;
    secondary?: string;
    success?: string;
    info?: string;
    warning?: string;
    danger?: string;
    light?: string;
    dark?: string;
    customOne?: string;
    customTwo?: string;
    customThree?: string;
    customFour?: string;
    customFive?: string;
}
export interface IPrivateResponse {
    setBelonging(_DialogBelonging: any): void;
}
export interface IButton {
    label: string;
    layoutType: ButtonLayoutDisplay | null;
    ID?: string;
}
export interface IColorObject {
    primary?: IColorProvider;
    secondary?: IColorProvider;
    success?: IColorProvider;
    info?: IColorProvider;
    warning?: IColorProvider;
    danger?: IColorProvider;
    light?: IColorProvider;
    dark?: IColorProvider;
    customOne?: IColorProvider;
    customTwo?: IColorProvider;
    customThree?: IColorProvider;
    customFour?: IColorProvider;
    customFive?: IColorProvider;
}
export interface IColorProvider {
    Base: string;
    Brighten: string;
    BrightenForShade: string;
    Darken: string;
    DarkenForShade: string;
    ContrastColor: string;
    BrightShade: string;
    BrightWarmly: string;
    TransparentDarkenVariance: string;
    IsBaseBright: boolean;
}
export interface IDispatch {
    title: string;
    message: string;
}
