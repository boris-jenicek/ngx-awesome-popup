import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { AppearanceAnimation, DisappearanceAnimation } from '../../../core/enums';
import { Timer } from '../../../core/global-classes';
import { IButton } from '../../../core/global-interfaces';

import { ToastNotificationBelonging, ToastNotificationDefaultResponse } from './classes';

@Injectable()
export abstract class WrapperAbstraction implements OnDestroy {
  fadeInOutAnimation: string = 'open';
  timerStarted$ = new BehaviorSubject('start-counter');
  subsToClosingDelay: Subscription;
  subTimer: Subscription;
  isTimerStarted = false;
  timeout;
  timer: Timer = new Timer();
  boxAnimation: AppearanceAnimation | DisappearanceAnimation = AppearanceAnimation.NONE;
  private closeIsClicked: boolean = false;
  private autoClosingHasStarted: boolean = false;

  protected constructor(public toastNotificationBelonging: ToastNotificationBelonging) {
    setTimeout(() => {
      this.boxAnimation = this.toastNotificationBelonging.ToastCoreConfig.AnimationIn;
    }, 1);
  }

  get autoCloseCondition(): boolean {
    return (
      this.toastNotificationBelonging.ToastCoreConfig.AutoCloseDelay &&
      !(
        this.toastNotificationBelonging.Buttons.length ||
        this.toastNotificationBelonging.ToastCoreConfig.DeclineLabel ||
        this.toastNotificationBelonging.ToastCoreConfig.ConfirmLabel
      )
    );
  }

  get buttonsExist(): boolean {
    return (
      !!this.toastNotificationBelonging.Buttons.length ||
      !!this.toastNotificationBelonging.ToastCoreConfig.DeclineLabel ||
      !!this.toastNotificationBelonging.ToastCoreConfig.ConfirmLabel
    );
  }

  mouseOver() {
    if (!this.buttonsExist && !this.closeIsClicked && !this.autoClosingHasStarted) {
      this.timerStarted$.next('stop-counter');
      this.fadeInOutAnimation = 'open';
      this.subsToClosingDelay?.unsubscribe();
      this.boxAnimation = 0;
    }
  }

  mouseOut() {
    if (!this.buttonsExist && !this.closeIsClicked && !this.autoClosingHasStarted) {
      this.timerStarted$.next('start-counter');
    }
  }

  onOverlayClicked(evt: MouseEvent): void {
    //  console.log('onOverlayClicked');
  }

  onToastClicked(evt: MouseEvent): void {
    // console.log('onOverlayClicked');
  }

  setResponse(_IsSuccess: boolean, _ClickedButtonID?: string): void {
    const response = new ToastNotificationDefaultResponse();
    if (_ClickedButtonID) {
      response.ClickedButtonID = _ClickedButtonID;
    }

    response.setSuccess(_IsSuccess);
    response.setBelonging(this.toastNotificationBelonging);
    this.toastNotificationBelonging.EventsController.setDefaultResponse(response);
  }

  onCustomButton(_Button: IButton): void {
    this.toastNotificationBelonging.EventsController.onButtonClick(_Button);
    this.setResponse(true, _Button.ID);
    this.toastNotificationBelonging.EventsController.close();
  }

  onButtonClick(_Type: 'confirm' | 'decline') {
    let buttonID;
    if (_Type === 'confirm') {
      buttonID = this.toastNotificationBelonging.ToastCoreConfig.ConfirmLabel.toLowerCase();
    } else if (_Type === 'decline') {
      buttonID = this.toastNotificationBelonging.ToastCoreConfig.DeclineLabel.toLowerCase();
    }

    this.setResponse(_Type === 'confirm', buttonID);
    this.toastNotificationBelonging.EventsController.close();
  }

  autoClose() {
    if (this.autoCloseCondition) {
      this.timer.setMilliseconds(this.toastNotificationBelonging.ToastCoreConfig.AutoCloseDelay);
      this.subTimer = this.timerStarted$
        .pipe(
          tap(next => {
            if ('start-counter' === next) {
              this.timer.start();
              this.isTimerStarted = true;
              this.timeout = setTimeout(() => {
                this.subsToClosingDelay = this.closeParent$().subscribe(resp => {
                  this.toastNotificationBelonging.EventsController.close();
                });
              }, this.toastNotificationBelonging.ToastCoreConfig.AutoCloseDelay);
            } else if ('stop-counter' === next) {
              if (this.isTimerStarted) {
                this.timer.stop();
                clearTimeout(this.timeout);
                this.isTimerStarted = false;
              }
            }
          })
        )
        .subscribe();
    }
  }

  closeParent$(): Observable<any> {
    this.autoClosingHasStarted = true;
    this.boxAnimation = this.toastNotificationBelonging.ToastCoreConfig.AnimationOut;
    const closeDuration = this.toastNotificationBelonging.ToastCoreConfig.AnimationOut ? 400 : 200;
    this.fadeInOutAnimation = 'close-fast';
    return of('').pipe(delay(closeDuration));
  }

  close() {
    this.toastNotificationBelonging.EventsController.close();
  }

  closeIcon(): void {
    this.closeIsClicked = true;
    this.subsToClosingDelay?.unsubscribe();
    this.closeParent$().subscribe(resp => {
      this.toastNotificationBelonging.EventsController.close();
    });
  }

  ngOnDestroy() {
    this.subsToClosingDelay?.unsubscribe();
    this.subTimer?.unsubscribe();
  }
}
