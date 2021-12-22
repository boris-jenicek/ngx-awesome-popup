import { AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { GlobalConfigService } from '../../../core/global-config.service';
import { LayoutHelperService } from '../../../core/layout-helper.service';
import { ToastNotificationBelonging } from '../core/classes';
import { WrapperAbstraction } from '../core/wrapper-abstraction';
export declare class ToastNotificationWrapperComponent extends WrapperAbstraction implements AfterViewInit {
    toastNotificationBelonging: ToastNotificationBelonging;
    gConfig: GlobalConfigService;
    private cd;
    layoutHelper: LayoutHelperService;
    constructor(toastNotificationBelonging: ToastNotificationBelonging, gConfig: GlobalConfigService, cd: ChangeDetectorRef, layoutHelper: LayoutHelperService);
    ngAfterViewInit(): void;
}
