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
        BrightWarmly: string;
        TransparentDarkenVariance: string;
        IsBaseBright: boolean;
    }
    interface IDispatch {
        Title: string;
        Message: string;
    }
}
export declare namespace GlobalClass {
    class Dispatch {
        Title: string;
        Message: string;
    }
    class ButtonMaker implements GlobalInterface.IButton {
        Label: string;
        ID: string;
        LayoutType: ButtonLayoutDisplay;
        constructor(Label: string, ID: string, LayoutType?: ButtonLayoutDisplay);
    }
    class GlobalUserConfig implements GlobalInterface.IGlobalUserConfig {
        ColorList: GlobalInterface.IColorTypes;
        constructor(_GlobalUserConfig: GlobalInterface.IGlobalUserConfig);
    }
    class ColorTypes implements GlobalInterface.IColorTypes {
        Primary: string;
        Secondary: string;
        Success: string;
        Info: string;
        Warning: string;
        Danger: string;
        Light: string;
        Dark: string;
    }
    class ResetGlobalConfig {
        constructor(globalConfig?: GlobalInterface.IGlobalUserConfig);
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
    class DataControl {
        /**
         * @ignore
         */
        copyValuesFrom(_Data: any, _DestinationObject: any): any;
    }
    class Timer {
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
}
