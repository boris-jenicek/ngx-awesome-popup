import { ToastNotificationInterface } from './model';
export declare class ToastNotificationConfigService {
    private userConfig;
    authorConfig: ToastNotificationInterface.IToastNotificationUserConfig;
    productionConfig: ToastNotificationInterface.IToastNotificationUserConfig;
    private dataControl;
    constructor(userConfig?: ToastNotificationInterface.IToastNotificationUserConfig);
    setResetGlobalToastConfig(globalToastConfig?: ToastNotificationInterface.IGlobalToastSettings): void;
}
