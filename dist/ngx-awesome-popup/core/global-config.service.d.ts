import { IColorObject, IColorTypes, IGlobalConfig, IGlobalUserConfig } from './global-interfaces';
import * as i0 from "@angular/core";
export declare class ResetGlobalConfig {
    constructor(globalConfig?: IGlobalUserConfig);
}
export declare class GlobalConfigService {
    private userGlobalConfig;
    private authorGlobalConfig;
    private userGeneratedConfig;
    productionGlobalConfig: IGlobalConfig;
    constructor(userGlobalConfig: IGlobalUserConfig);
    resetStyles(): void;
    setNodeStyles(_ProductionColorTypes: IColorObject, _Reset?: boolean): void;
    setUserColors(_UserColorTypes: IColorTypes): void;
    getSheet(_StyleID: string): undefined | CSSStyleSheet;
    private setToastStyling;
    private setButtonStyling;
    private setIconStyling;
    private setDialogFrame;
    private setToastStyles;
    static ɵfac: i0.ɵɵFactoryDeclaration<GlobalConfigService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<GlobalConfigService>;
}
