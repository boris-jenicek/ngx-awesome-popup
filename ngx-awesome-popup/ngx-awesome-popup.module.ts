import {Injector, ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ServiceLocator} from './locator.service';
import {InsertionDirective} from './core/insertion.directive';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {DialogConfigService} from './types/dialog/core/dialog-config.service';
import {DefaultLoaderComponent} from './default-loader/default-loader.component';
import {InsertionLoaderDirective} from './core/insertion-loader.directive';
import {GlobalConfigService} from './core/global-config.service';
import {GlobalInterface} from './core/global';
import {ConfirmBoxWrapperComponent} from './types/confirm-box/confirm-box-wrapper/confirm-box-wrapper.component';
import {ConfirmBoxConfigService} from './types/confirm-box/core/confirm-box-config.service';
import {ConfirmBoxClass, ConfirmBoxInterface} from './types/confirm-box/core/model';
import {DialogClass, DialogInterface} from './types/dialog/core/model';
import {ConfirmBoxService} from './types/confirm-box/core/confirm-box-service';
import {ToastNotificationWrapperComponent} from './types/toast-notification/toast-notification-wrapper/toast-notification-wrapper.component';
import {ToastNotificationClass, ToastNotificationInterface} from './types/toast-notification/core/model';
import {ToastNotificationConfigService} from './types/toast-notification/core/toast-notification-config.service';
import {ToastNotificationService} from './types/toast-notification/core/toast-notification.service';
import {DialogWrapperComponent} from './types/dialog/dialog-wrapper/dialog-wrapper.component';
import {DialogService} from './types/dialog/core/dialog.service';

@NgModule({
    declarations: [
        DialogWrapperComponent,
        InsertionDirective,
        InsertionLoaderDirective,
        DefaultLoaderComponent,
        ConfirmBoxWrapperComponent,
        ToastNotificationWrapperComponent
    ],
    imports     : [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule
    ],
    providers   : [
        DialogService,
        ConfirmBoxService,
        ToastNotificationService,
        GlobalConfigService,
        DialogConfigService,
        ConfirmBoxConfigService,
        ToastNotificationConfigService,
        DialogClass.DialogBelonging,
        ConfirmBoxClass.ConfirmBoxBelonging,
        ToastNotificationClass.ToastNotificationBelonging
    ],
    entryComponents: [
        DialogWrapperComponent,
        DefaultLoaderComponent,
        ConfirmBoxWrapperComponent,
        ToastNotificationWrapperComponent
    ]
})

export class NgxAwesomePopupModule {
    constructor(
        private injector: Injector,
        private gConfigService: GlobalConfigService
    ) {
        ServiceLocator.injector = injector;
    }
    static forRoot(globalConfig?: GlobalInterface.IGlobalUserConfig): ModuleWithProviders<NgxAwesomePopupModule> {
        return {
            ngModule: NgxAwesomePopupModule,
            providers: [GlobalConfigService, {provide: 'globalConfig', useValue: globalConfig}]
            
        };
    }
    
}

@NgModule({})
export class DialogConfigModule {
    
    static forRoot(dialogConfig?: DialogInterface.IDialogUserConfig): ModuleWithProviders<DialogConfigModule> {
        return {
            ngModule: DialogConfigModule,
            providers: [DialogConfigService, {provide: 'dialogConfig', useValue: dialogConfig}]
          
        };
    }
}

@NgModule({})
export class ConfirmBoxConfigModule {
    
    static forRoot(confirmBoxConfig?: ConfirmBoxInterface.IConfirmBoxUserConfig): ModuleWithProviders<ConfirmBoxConfigModule> {
        return {
            ngModule: ConfirmBoxConfigModule,
            providers: [ConfirmBoxConfigService, {provide: 'confirmBoxConfig', useValue: confirmBoxConfig}]
            
        };
    }
}
@NgModule({})
export class ToastNotificationConfigModule {
    
    static forRoot(toastNotificationConfig?: ToastNotificationInterface.IToastNotificationUserConfig): ModuleWithProviders<ToastNotificationConfigModule> {
        return {
            ngModule: ToastNotificationConfigModule,
            providers: [ToastNotificationConfigService, {provide: 'toastNotificationConfig', useValue: toastNotificationConfig}]
            
        };
    }
}


