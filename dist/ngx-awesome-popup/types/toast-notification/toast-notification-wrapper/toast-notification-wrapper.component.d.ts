import { AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { GlobalConfigService } from '../../../core/global-config.service';
import { LayoutHelperService } from '../../../core/layout-helper.service';
import { ToastNotificationBelonging } from '../core/classes';
import { WrapperAbstraction } from '../core/wrapper-abstraction';
import * as i0 from "@angular/core";
export declare class ToastNotificationWrapperComponent extends WrapperAbstraction implements AfterViewInit {
    toastNotificationBelonging: ToastNotificationBelonging;
    gConfig: GlobalConfigService;
    private cd;
    layoutHelper: LayoutHelperService;
    constructor(toastNotificationBelonging: ToastNotificationBelonging, gConfig: GlobalConfigService, cd: ChangeDetectorRef, layoutHelper: LayoutHelperService);
    ngAfterViewInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ToastNotificationWrapperComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ToastNotificationWrapperComponent, "app-toast-notification-wrapper", never, {}, {}, never, never>;
}
