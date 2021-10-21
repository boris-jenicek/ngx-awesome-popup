import { ButtonLayoutDisplay } from './enums';
export interface ISizes {
    Width?: string;
    MinWidth?: string;
    MaxWidth?: string;
    Height?: string;
    MinHeight?: string;
    MaxHeight?: string;
    FullScreen?: boolean;
}
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
    ColorList?: IColorTypes;
}
export interface IGlobalConfig {
    DisplayColor?: IColorObject;
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
    setBelonging(_DialogBelonging: any): void;
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
    Primary?: IColorProvider;
    Secondary?: IColorProvider;
    Success?: IColorProvider;
    Info?: IColorProvider;
    Warning?: IColorProvider;
    Danger?: IColorProvider;
    Light?: IColorProvider;
    Dark?: IColorProvider;
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
    Title: string;
    Message: string;
}
