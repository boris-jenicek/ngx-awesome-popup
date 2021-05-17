import { ConfirmBoxInterface } from "./model";
export declare class ConfirmBoxConfigService {
    private userConfig;
    authorConfig: ConfirmBoxInterface.IConfirmBoxUserConfig;
    productionConfig: ConfirmBoxInterface.IConfirmBoxUserConfig;
    constructor(userConfig?: ConfirmBoxInterface.IConfirmBoxUserConfig);
}
