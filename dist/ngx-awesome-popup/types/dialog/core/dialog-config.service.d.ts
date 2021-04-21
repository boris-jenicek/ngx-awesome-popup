import { DialogInterface } from './model';
export declare class DialogConfigService {
    private userConfig;
    authorConfig: DialogInterface.IDialogUserConfig;
    productionConfig: DialogInterface.IDialogUserConfig;
    constructor(userConfig?: DialogInterface.IDialogUserConfig);
}
