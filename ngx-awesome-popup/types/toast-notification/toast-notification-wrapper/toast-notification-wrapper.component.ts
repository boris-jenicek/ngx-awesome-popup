import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {ToastNotificationClass} from '../core/model';
import {BehaviorSubject, Observable, of, Subscription} from 'rxjs';
import {delay, tap} from 'rxjs/operators';
import {fadeInOut} from '../../../core/animations';
import {GlobalInterface} from '../../../core/global';
import {GlobalConfigService} from '../../../core/global-config.service';

@Component({
    selector   : 'app-toast-notification-wrapper',
    templateUrl: './toast-notification-wrapper.component.html',
    styleUrls  : ['./toast-notification-wrapper.component.scss'],
    animations : [fadeInOut(0, 1)]
})
export class ToastNotificationWrapperComponent implements AfterViewInit, OnDestroy {
    fadeInOutAnimation: string = 'open';
    timerStarted$              = new BehaviorSubject('start-counter');
    subTimer: Subscription;
    isTimerStarted             = false;
    subsToClosingDelay: Subscription;
    timer;
    
    constructor(public gConfig: GlobalConfigService, public toastNotificationBelonging: ToastNotificationClass.ToastNotificationBelonging, private cd: ChangeDetectorRef) {
    }
    
    ngAfterViewInit(): void {
        this.setResponse(false);
        this.cd.detectChanges();
        this.autoClose();
    }
    
    setResponse(_IsSuccess: boolean, _ClickedButtonID?: string): void {
        const response = new ToastNotificationClass.ToastNotificationDefaultResponse();
        if (_ClickedButtonID) {
            response.ClickedButtonID = _ClickedButtonID;
        }
        
        response.setSuccess(_IsSuccess);
        response.setBelonging(this.toastNotificationBelonging);
        this.toastNotificationBelonging.EventsController.setDefaultResponse(response);
    }
    
    onOverlayClicked(evt: MouseEvent): void {
        // console.log('onOverlayClicked');
    }
    
    onToastClicked(evt: MouseEvent): void {
        // console.log('onOverlayClicked');
    }
    
    onCustomButton(_Button: GlobalInterface.IButton): void {
        this.toastNotificationBelonging.EventsController.onButtonClick(_Button);
        this.setResponse(true, _Button.ID);
        this.toastNotificationBelonging.EventsController.close();
    }
    
    onButtonClick(_Type: 'confirm' | 'decline') {
        this.setResponse(_Type === 'confirm');
        this.toastNotificationBelonging.EventsController.close();
    }
    
    autoClose() {
        if (this.autoCloseCondition()) {
            this.subTimer = this.timerStarted$.pipe(
                tap((next) => {
                    if ('start-counter' === next) {
                        this.isTimerStarted = true;
                        this.timer          = setTimeout(() => {
                            this.subsToClosingDelay = this.closeParent$('close-slow').subscribe(resp => {
                                this.toastNotificationBelonging.EventsController.close();
                            });
                        }, this.toastNotificationBelonging.ToastCoreConfig.AutoCloseDelay);
                    } else if ('stop-counter' === next) {
                        if (this.isTimerStarted) {
                            clearTimeout(this.timer);
                            this.isTimerStarted = false;
                        }
                    }
                })
            ).subscribe();
        }
    }
    
    autoCloseCondition(): boolean {
        return this.toastNotificationBelonging.ToastCoreConfig.AutoCloseDelay
            && !(this.toastNotificationBelonging.Buttons.length
                || this.toastNotificationBelonging.ToastCoreConfig.DeclineLabel
                || this.toastNotificationBelonging.ToastCoreConfig.ConfirmLabel);
    }
    
    closeParent$(_ClosingAnimation: string): Observable<any> {
        this.fadeInOutAnimation = _ClosingAnimation;
        const timer             = _ClosingAnimation === 'close-slow' ? 1400 : 150;
        return of('').pipe(delay(timer));
    }
    
    close() {
        
        this.toastNotificationBelonging.EventsController.close();
    }
    
    mouseOver() {
        this.timerStarted$.next('stop-counter');
        this.fadeInOutAnimation = 'open';
        this.subsToClosingDelay?.unsubscribe();
    }
    
    mouseOut() {
        this.timerStarted$.next('start-counter');
    }
    
    ngOnDestroy() {
        this.subsToClosingDelay?.unsubscribe();
        this.subTimer?.unsubscribe();
    }
}
