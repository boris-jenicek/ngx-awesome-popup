import { CommonModule } from '@angular/common';
import { Injector, ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GlobalConfigService } from './core/global-config.service';
import { IGlobalUserConfig } from './core/global-interfaces';
import { InsertionLoaderDirective } from './core/insertion-loader.directive';
import { InsertionDirective } from './core/insertion.directive';
import { DefaultLoaderComponent } from './default-loader/default-loader.component';
import { ServiceLocator } from './locator.service';
import { ConfirmBoxWrapperComponent } from './types/confirm-box/confirm-box-wrapper/confirm-box-wrapper.component';
import { ConfirmBoxBelonging } from './types/confirm-box/core/classes';
import { ConfirmBoxConfigService } from './types/confirm-box/core/confirm-box-config.service';
import { ConfirmBoxService } from './types/confirm-box/core/confirm-box-service';
import { IConfirmBoxUserConfig } from './types/confirm-box/core/interfaces';
import { DialogBelonging } from './types/dialog/core/classes';
import { DialogConfigService } from './types/dialog/core/dialog-config.service';
import { DialogService } from './types/dialog/core/dialog.service';
import { IDialogUserConfig } from './types/dialog/core/interfaces';
import { DialogWrapperComponent } from './types/dialog/dialog-wrapper/dialog-wrapper.component';
import { ToastNotificationBelonging } from './types/toast-notification/core/classes';
import { IToastNotificationUserConfig } from './types/toast-notification/core/interfaces';
import { ToastNotificationConfigService } from './types/toast-notification/core/toast-notification-config.service';
import { ToastNotificationService } from './types/toast-notification/core/toast-notification.service';
import { ToastNotificationSimpleWrapperComponent } from './types/toast-notification/toast-notification-simple-wrapper/toast-notification-simple-wrapper.component';
import { ToastNotificationWrapperComponent } from './types/toast-notification/toast-notification-wrapper/toast-notification-wrapper.component';

@NgModule({
  imports: [CommonModule, BrowserModule, BrowserAnimationsModule],
  providers: [GlobalConfigService]
})
export class NgxAwesomePopupModule {
  constructor(private injector: Injector) {
    ServiceLocator.injector = injector;
  }

  static forRoot(globalConfig?: IGlobalUserConfig): ModuleWithProviders<NgxAwesomePopupModule> {
    return {
      ngModule: NgxAwesomePopupModule,
      providers: [{ provide: 'cdGlobalConfig', useValue: globalConfig }]
    };
  }
}

@NgModule({
  declarations: [DialogWrapperComponent, DefaultLoaderComponent, InsertionDirective, InsertionLoaderDirective],
  imports: [CommonModule],
  providers: [DialogService, DialogConfigService],
  entryComponents: [DialogWrapperComponent, DefaultLoaderComponent]
})
export class DialogConfigModule {
  static forRoot(dialogConfig?: IDialogUserConfig): ModuleWithProviders<DialogConfigModule> {
    return {
      ngModule: DialogConfigModule,
      providers: [
        { provide: 'dialogConfig', useValue: dialogConfig },
        { provide: 'dialogBelonging', useClass: DialogBelonging }
      ]
    };
  }
}

@NgModule({
  declarations: [ConfirmBoxWrapperComponent],
  imports: [CommonModule],
  providers: [ConfirmBoxService, ConfirmBoxConfigService],
  entryComponents: [ConfirmBoxWrapperComponent]
})
export class ConfirmBoxConfigModule {
  static forRoot(confirmBoxConfig?: IConfirmBoxUserConfig): ModuleWithProviders<ConfirmBoxConfigModule> {
    return {
      ngModule: ConfirmBoxConfigModule,
      providers: [
        { provide: 'confirmBoxConfig', useValue: confirmBoxConfig },
        { provide: 'confirmBoxBelonging', useClass: ConfirmBoxBelonging }
      ]
    };
  }
}

@NgModule({
  declarations: [ToastNotificationWrapperComponent, ToastNotificationSimpleWrapperComponent],
  imports: [CommonModule],
  providers: [ToastNotificationService, ToastNotificationConfigService],
  entryComponents: [ToastNotificationWrapperComponent, ToastNotificationSimpleWrapperComponent]
})
export class ToastNotificationConfigModule {
  static forRoot(toastNotificationConfig?: IToastNotificationUserConfig): ModuleWithProviders<ToastNotificationConfigModule> {
    return {
      ngModule: ToastNotificationConfigModule,
      providers: [
        {
          provide: 'toastNotificationConfig',
          useValue: toastNotificationConfig
        },
        {
          provide: 'toastNotificationBelonging',
          useClass: ToastNotificationBelonging
        }
      ]
    };
  }
}
