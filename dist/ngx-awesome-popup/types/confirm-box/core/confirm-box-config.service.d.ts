import { IConfirmBoxUserConfig } from './interfaces';
export declare class ConfirmBoxConfigService {
    private userConfig;
    authorConfig: IConfirmBoxUserConfig;
    productionConfig: IConfirmBoxUserConfig;
    constructor(userConfig?: IConfirmBoxUserConfig);
}
