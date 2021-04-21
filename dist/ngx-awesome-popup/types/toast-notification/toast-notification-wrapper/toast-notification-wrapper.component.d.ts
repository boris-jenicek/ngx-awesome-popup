import { AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ToastNotificationClass } from '../core/model';
import { Observable } from 'rxjs';
import { GlobalInterface } from '../../../core/global';
export declare class ToastNotificationWrapperComponent implements AfterViewInit {
    toastNotificationBelonging: ToastNotificationClass.ToastNotificationBelonging;
    private cd;
    fadeInOutAnimation: string;
    constructor(toastNotificationBelonging: ToastNotificationClass.ToastNotificationBelonging, cd: ChangeDetectorRef);
    ngAfterViewInit(): void;
    setResponse(_IsSuccess: boolean, _ClickedButtonID?: string): void;
    onOverlayClicked(evt: MouseEvent): void;
    onToastClicked(evt: MouseEvent): void;
    onCustomButton(_Button: GlobalInterface.IButton): void;
    onButtonClick(_Type: 'confirm' | 'decline'): void;
    autoClose(): void;
    closeParent$(_ClosingAnimation: string): Observable<any>;
    close(): void;
}
