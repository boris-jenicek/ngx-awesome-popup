import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Injector } from '@angular/core';
import { ToastNotificationWrapperComponent } from '../toast-notification-wrapper/toast-notification-wrapper.component';
import { ToastNotificationClass, ToastNotificationInterface } from './model';
import { ToastNotificationConfigService } from './toast-notification-config.service';
import { Observable } from 'rxjs';
export declare class ToastNotificationService {
    private componentFactoryResolver;
    private injector;
    private appRef;
    private toastConfig;
    toastComponentRefList: ComponentRef<ToastNotificationWrapperComponent>[];
    bufferToastRawList: ToastNotificationInterface.IToastNotificationRawState[];
    bufferCheckingIntervalIsReady: boolean;
    constructor(componentFactoryResolver: ComponentFactoryResolver, injector: Injector, appRef: ApplicationRef, toastConfig: ToastNotificationConfigService);
    openToast$(_ToastNotificationBelonging: ToastNotificationClass.ToastNotificationBelonging): Observable<ToastNotificationInterface.IPrivateResponseMerged>;
    internalRouting(_ToastRawInstance: ToastNotificationInterface.IToastNotificationRawState): boolean;
    sendToBuffer(_ToastRawInstance: ToastNotificationInterface.IToastNotificationRawState): void;
    sendToProduction(_ToastRawInstance: ToastNotificationInterface.IToastNotificationRawState): void;
    isRefListAvailable(): boolean;
    prepareRawToast(_EventsController: ToastNotificationClass.ToastNotificationEventsController, _ToastNotificationBelonging: ToastNotificationClass.ToastNotificationBelonging): ToastNotificationInterface.IToastNotificationRawState;
    getComponentRef(_ToastNotificationRawState: ToastNotificationInterface.IToastNotificationRawState): ComponentRef<any> | null;
    listeners(_EventsController: ToastNotificationClass.ToastNotificationEventsController): void;
    appendToBodyParentComponent(_ComponentRef: ComponentRef<any>): void;
    removeFromBody(_EntityUniqueID: string): void;
    findDialogIndex(_DialogUniqueID: string): number;
}
