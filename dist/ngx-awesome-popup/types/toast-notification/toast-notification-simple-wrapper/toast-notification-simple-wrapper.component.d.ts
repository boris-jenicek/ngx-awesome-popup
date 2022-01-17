import { AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { GlobalConfigService } from '../../../core/global-config.service';
import { LayoutHelperService } from '../../../core/layout-helper.service';
import { ToastNotificationBelonging } from '../core/classes';
import { WrapperAbstraction } from '../core/wrapper-abstraction';
import * as i0 from "@angular/core";
export declare class ToastNotificationSimpleWrapperComponent extends WrapperAbstraction implements AfterViewInit {
    toastNotificationBelonging: ToastNotificationBelonging;
    gConfig: GlobalConfigService;
    private cd;
    layoutHelper: LayoutHelperService;
    constructor(toastNotificationBelonging: ToastNotificationBelonging, gConfig: GlobalConfigService, cd: ChangeDetectorRef, layoutHelper: LayoutHelperService);
    ngAfterViewInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ToastNotificationSimpleWrapperComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ToastNotificationSimpleWrapperComponent, "app-toast-notification-simple-wrapper", never, {}, {}, never, never>;
}
