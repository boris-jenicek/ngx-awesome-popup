import { ButtonLayoutDisplay } from './enums';
export declare namespace GlobalInterface {
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
    interface IGlobalUserConfig {
        ColorList?: GlobalInterface.IColorTypes;
    }
    interface IGlobalConfig {
        DisplayColor?: GlobalInterface.IColorObject;
    }
    interface IColorTypes {
        Primary?: string;
        Secondary?: string;
        Success?: string;
        Info?: string;
        Warning?: string;
        Danger?: string;
        Light?: string;
        Dark?: string;
    }
    interface IPrivateResponse {
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
    interface IButton {
        Label: string;
        LayoutType: ButtonLayoutDisplay | null;
        ID?: string;
    }
    interface IColorObject {
        Primary?: GlobalInterface.IColorProvider;
        Secondary?: GlobalInterface.IColorProvider;
        Success?: GlobalInterface.IColorProvider;
        Info?: GlobalInterface.IColorProvider;
        Warning?: GlobalInterface.IColorProvider;
        Danger?: GlobalInterface.IColorProvider;
        Light?: GlobalInterface.IColorProvider;
        Dark?: GlobalInterface.IColorProvider;
    }
    interface IColorProvider {
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
    interface IMessage {
        Title: string;
        Description: string;
    }
}
export declare namespace GlobalClass {
    class Message {
        Title: string;
        Description: string;
    }
    class ButtonMaker implements GlobalInterface.IButton {
        Label: string;
        ID: string;
        LayoutType: ButtonLayoutDisplay;
        constructor(Label: string, ID: string, LayoutType?: ButtonLayoutDisplay);
    }
    class GlobalConfig implements GlobalInterface.IGlobalConfig {
        DisplayColor: GlobalInterface.IColorObject;
    }
    class DisplayColor implements GlobalInterface.IColorObject {
        Primary: ColorProvider;
        Secondary: ColorProvider;
        Success: ColorProvider;
        Info: ColorProvider;
        Warning: ColorProvider;
        Danger: ColorProvider;
        Light: ColorProvider;
        Dark: ColorProvider;
    }
    class ColorProvider {
        Base: string;
        Brighten: string;
        BrightenForShade: string;
        Darken: string;
        DarkenForShade: string;
        ContrastColor: string;
        TransparentDarkenVariance: string;
        BrightShade: string;
        IsBaseBright: boolean;
        constructor(_Color: string);
        private isBright;
        private brightness;
        private getLowMidHi;
        private contrast;
        private isColor;
        private getRGBArray;
        private luminance;
        private transparentize;
    }
    class DataControl {
        /**
         * @ignore
         */
        copyValuesFrom(_Data: any, _DestinationObject: any): any;
    }
}