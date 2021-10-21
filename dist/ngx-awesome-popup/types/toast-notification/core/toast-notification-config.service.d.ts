import { IGlobalToastSettings, IToastNotificationUserConfig } from './interfaces';
export declare class ToastNotificationConfigService {
    private userConfig;
    authorConfig: IToastNotificationUserConfig;
    productionConfig: IToastNotificationUserConfig;
    private dataControl;
    constructor(userConfig?: IToastNotificationUserConfig);
    setResetGlobalToastConfig(globalToastConfig?: IGlobalToastSettings): void;
}
