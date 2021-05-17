import { GlobalInterface } from "./global";
export declare class GlobalConfigService {
    private userGlobalConfig;
    productionGlobalConfig: GlobalInterface.IGlobalConfig;
    private authorGlobalConfig;
    private userGeneratedConfig;
    constructor(userGlobalConfig: GlobalInterface.IGlobalUserConfig);
    resetStyles(): void;
    setNodeStyles(_ProductionColorTypes: GlobalInterface.IColorObject, _Reset?: boolean): void;
    setUserColors(_UserColorTypes: GlobalInterface.IColorTypes): void;
    getSheet(_StyleID: string): CSSStyleSheet;
    private setToastStyling;
    private setButtonStyling;
    private setIconStyling;
    private setDialogFrame;
    private setToastStyles;
}
