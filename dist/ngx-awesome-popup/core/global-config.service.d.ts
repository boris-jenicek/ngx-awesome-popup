import { GlobalInterface } from './global';
export declare class GlobalConfigService {
    private userGlobalConfig;
    productionGlobalConfig: GlobalInterface.IGlobalConfig;
    private authorGlobalConfig;
    constructor(userGlobalConfig: GlobalInterface.IGlobalUserConfig);
    private setNodeStyles;
    private setToastStyling;
    private setButtonStyling;
    private setIconStyling;
    private setDialogFrame;
    private getSheet;
    private setToastNode;
    private setUserColors;
}
