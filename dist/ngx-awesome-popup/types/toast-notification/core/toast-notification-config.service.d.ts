import { IGlobalToastSettings, IToastNotificationUserConfig } from './interfaces';
import * as i0 from "@angular/core";
export declare class ToastNotificationConfigService {
    private userConfig;
    private dataControl;
    authorConfig: IToastNotificationUserConfig;
    productionConfig: IToastNotificationUserConfig;
    constructor(userConfig?: IToastNotificationUserConfig);
    setResetGlobalToastConfig(globalToastConfig?: IGlobalToastSettings): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ToastNotificationConfigService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ToastNotificationConfigService>;
}
