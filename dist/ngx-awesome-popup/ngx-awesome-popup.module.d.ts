import { Injector, ModuleWithProviders } from '@angular/core';
import { IGlobalUserConfig } from './core/global-interfaces';
import { IConfirmBoxUserConfig } from './types/confirm-box/core/interfaces';
import { IDialogUserConfig } from './types/dialog/core/interfaces';
import { IToastNotificationUserConfig } from './types/toast-notification/core/interfaces';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/platform-browser";
import * as i3 from "@angular/platform-browser/animations";
import * as i4 from "./types/dialog/dialog-wrapper/dialog-wrapper.component";
import * as i5 from "./default-loader/default-loader.component";
import * as i6 from "./core/insertion.directive";
import * as i7 from "./core/insertion-loader.directive";
import * as i8 from "./types/confirm-box/confirm-box-wrapper/confirm-box-wrapper.component";
import * as i9 from "./types/toast-notification/toast-notification-wrapper/toast-notification-wrapper.component";
import * as i10 from "./types/toast-notification/toast-notification-simple-wrapper/toast-notification-simple-wrapper.component";
export declare class NgxAwesomePopupModule {
    private injector;
    constructor(injector: Injector);
    static forRoot(globalConfig?: IGlobalUserConfig): ModuleWithProviders<NgxAwesomePopupModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxAwesomePopupModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NgxAwesomePopupModule, never, [typeof i1.CommonModule, typeof i2.BrowserModule, typeof i3.BrowserAnimationsModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NgxAwesomePopupModule>;
}
export declare class DialogConfigModule {
    static forRoot(dialogConfig?: IDialogUserConfig): ModuleWithProviders<DialogConfigModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DialogConfigModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<DialogConfigModule, [typeof i4.DialogWrapperComponent, typeof i5.DefaultLoaderComponent, typeof i6.InsertionDirective, typeof i7.InsertionLoaderDirective], [typeof i1.CommonModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<DialogConfigModule>;
}
export declare class ConfirmBoxConfigModule {
    static forRoot(confirmBoxConfig?: IConfirmBoxUserConfig): ModuleWithProviders<ConfirmBoxConfigModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfirmBoxConfigModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ConfirmBoxConfigModule, [typeof i8.ConfirmBoxWrapperComponent], [typeof i1.CommonModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ConfirmBoxConfigModule>;
}
export declare class ToastNotificationConfigModule {
    static forRoot(toastNotificationConfig?: IToastNotificationUserConfig): ModuleWithProviders<ToastNotificationConfigModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ToastNotificationConfigModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ToastNotificationConfigModule, [typeof i9.ToastNotificationWrapperComponent, typeof i10.ToastNotificationSimpleWrapperComponent], [typeof i1.CommonModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ToastNotificationConfigModule>;
}
