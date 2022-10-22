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

/**
 * Each property of the colorList represent a string which represent a color in hex or rgb/rgba format.
 * For available color types(properties) check {@link IColorTypes} interface.
 * Every color is optional, and it will reflect on dialog or button color types and its color contrast or variance.
 *  * ```typescript
 * // colorList object example.
 * const colorList = {
 *         colorList: {
 *            primary  : '#ff9e00',
 *            secondary: '#989ea5',
 *            info     : '#2f8ee5',
 *            success  : '#3caea3',
 *            warning  : '#ffc107',
 *            danger   : '#e46464',
 *            light    : '#fbfbfb',
 *            dark     : '#343a40',
 *            customOne  : '#34fa40',
 *            customTwo  : '#343f40',
 *           }
 *        }
 * ```
 */
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
  setBelonging(_DialogBelonging): void;
}

/**
 * Interface for custom button.
 *
 * Example:
 * ```typescript
 * // Custom button object.
 * const button = {
 *        ID         : 'confirm_btn',
 *        label:     : 'Confirm',
 *        layoutType : ButtonLayoutDisplay.SUCCESS
 *  }
 * // Or instantiated with ButtonMaker class
 * const button2 = new ButtonMaker('Confirm', 'confirm_btn', ButtonLayoutDisplay.SUCCESS)
 * ```
 * * ButtonLayoutDisplay: {@link ButtonLayoutDisplay}
 */
export interface IButton {
  label: string;
  layoutType: ButtonLayoutDisplay | null;
  ID?: string;
  hidden: boolean;
  disabled: boolean;

  enable(): void;
  disable(): void;
  hide(): void;
  show(): void;
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
