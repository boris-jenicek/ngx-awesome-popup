import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Injector } from "@angular/core";
import { Observable } from "rxjs";
import { GlobalConfigService } from "../../../core/global-config.service";
import { ToastNotificationClass, ToastNotificationInterface } from "./model";
import { ToastNotificationConfigService } from "./toast-notification-config.service";
export declare class ToastNotificationService {
    private componentFactoryResolver;
    private injector;
    private appRef;
    private toastConfig;
    private gConfigService;
    toastComponentRefList: ComponentRef<any>[];
    bufferToastRawList: ToastNotificationInterface.IToastNotificationRawState[];
    bufferCheckingIntervalIsReady: boolean;
    constructor(componentFactoryResolver: ComponentFactoryResolver, injector: Injector, appRef: ApplicationRef, toastConfig: ToastNotificationConfigService, gConfigService: GlobalConfigService);
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
    private setToastOverlayNode;
    private setToastWrapperNode;
}
