import { AfterViewInit, ChangeDetectorRef, ElementRef, QueryList } from '@angular/core';
import { GlobalConfigService } from '../../../core/global-config.service';
import { ToastNotificationBelonging } from '../core/classes';
import { WrapperAbstraction } from '../core/wrapper-abstraction';
export declare class ToastNotificationSimpleWrapperComponent extends WrapperAbstraction implements AfterViewInit {
    toastNotificationBelonging: ToastNotificationBelonging;
    gConfig: GlobalConfigService;
    private cd;
    elTextWrapper: ElementRef;
    elTitleWrapper: ElementRef;
    elButtonWrapper: ElementRef;
    elButton: QueryList<ElementRef>;
    constructor(toastNotificationBelonging: ToastNotificationBelonging, gConfig: GlobalConfigService, cd: ChangeDetectorRef);
    ngAfterViewInit(): void;
}
