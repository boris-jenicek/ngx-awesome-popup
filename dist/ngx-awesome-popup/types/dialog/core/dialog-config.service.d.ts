import { IDialogUserConfig } from './interfaces';
export declare class DialogConfigService {
    private userConfig;
    authorConfig: IDialogUserConfig;
    productionConfig: IDialogUserConfig;
    constructor(userConfig?: IDialogUserConfig);
}
