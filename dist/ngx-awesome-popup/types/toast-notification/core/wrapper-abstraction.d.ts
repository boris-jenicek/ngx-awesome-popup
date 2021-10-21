import { OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Timer } from '../../../core/global-classes';
import { IButton } from '../../../core/global-interfaces';
import { ToastNotificationBelonging } from './classes';
export declare abstract class WrapperAbstraction implements OnDestroy {
    toastNotificationBelonging: ToastNotificationBelonging;
    fadeInOutAnimation: string;
    timerStarted$: BehaviorSubject<string>;
    subsToClosingDelay: Subscription;
    subTimer: Subscription;
    isTimerStarted: boolean;
    timeout: any;
    timer: Timer;
    protected constructor(toastNotificationBelonging: ToastNotificationBelonging);
    mouseOver(): void;
    mouseOut(): void;
    onOverlayClicked(evt: MouseEvent): void;
    onToastClicked(evt: MouseEvent): void;
    setResponse(_IsSuccess: boolean, _ClickedButtonID?: string): void;
    onCustomButton(_Button: IButton): void;
    onButtonClick(_Type: 'confirm' | 'decline'): void;
    autoClose(): void;
    autoCloseCondition(): boolean;
    closeParent$(_ClosingAnimation: string): Observable<any>;
    close(): void;
    ngOnDestroy(): void;
}
