import {AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';
import {ToastNotificationClass} from '../core/model';
import {Observable, Observer} from 'rxjs';
import {delay} from 'rxjs/operators';
import {fadeInOut} from '../../../core/animations';
import {GlobalInterface} from '../../../core/global';

@Component({
    selector   : 'app-toast-notification-wrapper',
    templateUrl: './toast-notification-wrapper.component.html',
    styleUrls  : ['./toast-notification-wrapper.component.scss'],
    animations : [fadeInOut(0, 1)]
})
export class ToastNotificationWrapperComponent implements AfterViewInit {
    fadeInOutAnimation: string = 'open';
    
    constructor(public toastNotificationBelonging: ToastNotificationClass.ToastNotificationBelonging, private cd: ChangeDetectorRef) {
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
        if (this.toastNotificationBelonging.ToastCoreConfig.AutoCloseDelay
            && !(this.toastNotificationBelonging.Buttons.length
            || this.toastNotificationBelonging.ToastCoreConfig.DeclineLabel
            || this.toastNotificationBelonging.ToastCoreConfig.ConfirmLabel)
        ) {
            setTimeout(() => {
                this.closeParent$('close-slow').subscribe( resp =>{
                    this.toastNotificationBelonging.EventsController.close();
                });
                
            }, this.toastNotificationBelonging.ToastCoreConfig.AutoCloseDelay);
        }
    }
    
    closeParent$(_ClosingAnimation: string): Observable<any> {
        this.fadeInOutAnimation = _ClosingAnimation;
        const timer             = _ClosingAnimation === 'close-slow' ? 1400 : 150;
        
        return new Observable((observer: Observer<any>) => {
            observer.next('');
            observer.complete();
        }).pipe(delay(timer));
    }

    
    close() {
        this.toastNotificationBelonging.EventsController.close();
    }
}
