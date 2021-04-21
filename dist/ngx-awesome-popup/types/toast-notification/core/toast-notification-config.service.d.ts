import { ToastNotificationInterface } from './model';
export declare class ToastNotificationConfigService {
    private userConfig;
    authorConfig: ToastNotificationInterface.IToastNotificationUserConfig;
    productionConfig: ToastNotificationInterface.IToastNotificationUserConfig;
    constructor(userConfig?: ToastNotificationInterface.IToastNotificationUserConfig);
}
