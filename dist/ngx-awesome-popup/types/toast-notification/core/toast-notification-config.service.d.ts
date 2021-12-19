import { IGlobalToastSettings, IToastNotificationUserConfig } from './interfaces';
export declare class ToastNotificationConfigService {
    private userConfig;
    private dataControl;
    authorConfig: IToastNotificationUserConfig;
    productionConfig: IToastNotificationUserConfig;
    constructor(userConfig?: IToastNotificationUserConfig);
    setResetGlobalToastConfig(globalToastConfig?: IGlobalToastSettings): void;
}
