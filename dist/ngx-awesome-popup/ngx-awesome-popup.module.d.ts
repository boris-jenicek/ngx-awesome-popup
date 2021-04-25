import {Injector, ModuleWithProviders} from '@angular/core';
import {GlobalConfigService} from './core/global-config.service';
import {ToastNotificationInterface} from './types/toast-notification/core/model';
import {ConfirmBoxInterface} from './types/confirm-box/core/model';
import {DialogInterface} from './types/dialog/core/model';
import {GlobalInterface} from './core/global';

export declare class NgxAwesomePopupModule {
    private injector;
    private gConfigService;
    
    constructor(injector: Injector, gConfigService: GlobalConfigService);
    
    static forRoot(globalConfig?: GlobalInterface.IGlobalUserConfig): ModuleWithProviders<NgxAwesomePopupModule>;
}

export declare class DialogConfigModule {
    static forRoot(dialogConfig?: DialogInterface.IDialogUserConfig): ModuleWithProviders<DialogConfigModule>;
}
export declare class ConfirmBoxConfigModule {
    static forRoot(confirmBoxConfig?: ConfirmBoxInterface.IConfirmBoxUserConfig): ModuleWithProviders<ConfirmBoxConfigModule>;
}
export declare class ToastNotificationConfigModule {
    static forRoot(toastNotificationConfig?: ToastNotificationInterface.IToastNotificationUserConfig): ModuleWithProviders<ToastNotificationConfigModule>;
}
