import { Injector, ModuleWithProviders } from '@angular/core';
import { IGlobalUserConfig } from './core/global-interfaces';
import { IConfirmBoxUserConfig } from './types/confirm-box/core/interfaces';
import { IDialogUserConfig } from './types/dialog/core/interfaces';
import { IToastNotificationUserConfig } from './types/toast-notification/core/interfaces';
export declare class NgxAwesomePopupModule {
    private injector;
    constructor(injector: Injector);
    static forRoot(globalConfig?: IGlobalUserConfig): ModuleWithProviders<NgxAwesomePopupModule>;
}
export declare class DialogConfigModule {
    static forRoot(dialogConfig?: IDialogUserConfig): ModuleWithProviders<DialogConfigModule>;
}
export declare class ConfirmBoxConfigModule {
    static forRoot(confirmBoxConfig?: IConfirmBoxUserConfig): ModuleWithProviders<ConfirmBoxConfigModule>;
}
export declare class ToastNotificationConfigModule {
    static forRoot(toastNotificationConfig?: IToastNotificationUserConfig): ModuleWithProviders<ToastNotificationConfigModule>;
}
