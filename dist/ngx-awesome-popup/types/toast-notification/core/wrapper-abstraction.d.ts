import { OnDestroy } from "@angular/core";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { GlobalClass, GlobalInterface } from "../../../core/global";
import { ToastNotificationClass } from "./model";
export declare abstract class WrapperAbstraction implements OnDestroy {
    toastNotificationBelonging: ToastNotificationClass.ToastNotificationBelonging;
    fadeInOutAnimation: string;
    timerStarted$: BehaviorSubject<string>;
    subsToClosingDelay: Subscription;
    subTimer: Subscription;
    isTimerStarted: boolean;
    timeout: any;
    timer: GlobalClass.Timer;
    protected constructor(toastNotificationBelonging: ToastNotificationClass.ToastNotificationBelonging);
    mouseOver(): void;
    mouseOut(): void;
    onOverlayClicked(evt: MouseEvent): void;
    onToastClicked(evt: MouseEvent): void;
    setResponse(_IsSuccess: boolean, _ClickedButtonID?: string): void;
    onCustomButton(_Button: GlobalInterface.IButton): void;
    onButtonClick(_Type: "confirm" | "decline"): void;
    autoClose(): void;
    autoCloseCondition(): boolean;
    closeParent$(_ClosingAnimation: string): Observable<any>;
    close(): void;
    ngOnDestroy(): void;
}
