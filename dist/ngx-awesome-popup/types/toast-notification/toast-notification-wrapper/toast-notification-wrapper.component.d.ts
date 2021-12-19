import { AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { GlobalConfigService } from '../../../core/global-config.service';
import { ToastNotificationBelonging } from '../core/classes';
import { WrapperAbstraction } from '../core/wrapper-abstraction';
export declare class ToastNotificationWrapperComponent extends WrapperAbstraction implements AfterViewInit {
    toastNotificationBelonging: ToastNotificationBelonging;
    gConfig: GlobalConfigService;
    private cd;
    constructor(toastNotificationBelonging: ToastNotificationBelonging, gConfig: GlobalConfigService, cd: ChangeDetectorRef);
    ngAfterViewInit(): void;
}
