import { IColorObject, IColorTypes, IGlobalConfig, IGlobalUserConfig } from './global-interfaces';
export declare class GlobalConfigService {
    private userGlobalConfig;
    productionGlobalConfig: IGlobalConfig;
    private authorGlobalConfig;
    private userGeneratedConfig;
    constructor(userGlobalConfig: IGlobalUserConfig);
    resetStyles(): void;
    setNodeStyles(_ProductionColorTypes: IColorObject, _Reset?: boolean): void;
    setUserColors(_UserColorTypes: IColorTypes): void;
    getSheet(_StyleID: string): CSSStyleSheet;
    private setToastStyling;
    private setButtonStyling;
    private setIconStyling;
    private setDialogFrame;
    private setToastStyles;
}
