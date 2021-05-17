import { AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { GlobalConfigService } from "../../../core/global-config.service";
import { ToastNotificationClass } from "../core/model";
import { WrapperAbstraction } from "../core/wrapper-abstraction";
export declare class ToastNotificationSimpleWrapperComponent extends WrapperAbstraction implements AfterViewInit {
    gConfig: GlobalConfigService;
    toastNotificationBelonging: ToastNotificationClass.ToastNotificationBelonging;
    private cd;
    constructor(gConfig: GlobalConfigService, toastNotificationBelonging: ToastNotificationClass.ToastNotificationBelonging, cd: ChangeDetectorRef);
    ngAfterViewInit(): void;
}
