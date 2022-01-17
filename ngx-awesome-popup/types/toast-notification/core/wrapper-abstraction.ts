import { Directive, ElementRef, Inject, OnDestroy, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { delay, take, tap } from 'rxjs/operators';
import { AppearanceAnimation, DisappearanceAnimation } from '../../../core/enums';
import { Timer } from '../../../core/global-classes';
import { IButton } from '../../../core/global-interfaces';
import { LayoutHelperService } from '../../../core/layout-helper.service';

import { ToastNotificationBelonging, ToastNotificationDefaultResponse } from './classes';

@Directive()
export abstract class WrapperAbstraction implements OnDestroy {
  private closeIsClicked = false;
  private autoClosingHasStarted = false;
  @ViewChild('elTextWrapper') elTextWrapper: ElementRef;
  @ViewChild('elTitleWrapper') elTitleWrapper: ElementRef;
  @ViewChild('elButtonWrapper') elButtonWrapper: ElementRef;
  @ViewChildren('elButton') elButton: QueryList<ElementRef>;
  fadeInOutAnimation = 'open';
  timerStarted$ = new BehaviorSubject('start-counter');
  subsToClosingDelay: Subscription;
  subTimer: Subscription;
  isTimerStarted = false;
  timeout;
  timer: Timer = new Timer();
  boxAnimation: AppearanceAnimation | DisappearanceAnimation | 'reset';
  appearanceAnimation = AppearanceAnimation;
  disappearanceAnimation = DisappearanceAnimation;

  protected constructor(
    @Inject('toastNotificationBelonging') public toastNotificationBelonging: ToastNotificationBelonging,
    public layoutHelper: LayoutHelperService
  ) {
    setTimeout(() => {
      this.boxAnimation = this.toastNotificationBelonging.toastCoreConfig.animationIn;
    }, 1);
  }

  get autoCloseCondition(): boolean {
    return (
      this.toastNotificationBelonging.toastCoreConfig.autoCloseDelay &&
      !(
        this.toastNotificationBelonging.buttons.length ||
        this.toastNotificationBelonging.toastCoreConfig.declineLabel ||
        this.toastNotificationBelonging.toastCoreConfig.confirmLabel
      )
    );
  }

  get buttonsExist(): boolean {
    return (
      !!this.toastNotificationBelonging.buttons.length ||
      !!this.toastNotificationBelonging.toastCoreConfig.declineLabel ||
      !!this.toastNotificationBelonging.toastCoreConfig.confirmLabel
    );
  }

  setCustomStyles(): void {
    if (this.toastNotificationBelonging.toastCoreConfig.customStyles.textCSS && this.elTextWrapper) {
      this.elTextWrapper.nativeElement.style.cssText += this.toastNotificationBelonging.toastCoreConfig.customStyles.textCSS;
    }
    if (this.toastNotificationBelonging.toastCoreConfig.customStyles.titleCSS && this.elTitleWrapper) {
      this.elTitleWrapper.nativeElement.style.cssText += this.toastNotificationBelonging.toastCoreConfig.customStyles.titleCSS;
    }
    if (this.toastNotificationBelonging.toastCoreConfig.customStyles.buttonSectionCSS && this.elButtonWrapper) {
      this.elButtonWrapper.nativeElement.style.cssText += this.toastNotificationBelonging.toastCoreConfig.customStyles.buttonSectionCSS;
    }
    if (this.toastNotificationBelonging.toastCoreConfig.customStyles.buttonCSS && this.elButton) {
      this.elButton.forEach(el => {
        el.nativeElement.style.cssText += this.toastNotificationBelonging.toastCoreConfig.customStyles.buttonCSS;
      });
    }
  }

  mouseOver(): void {
    if (!this.buttonsExist && !this.closeIsClicked && !this.autoClosingHasStarted) {
      this.timerStarted$.next('stop-counter');
      this.fadeInOutAnimation = 'open';
      this.subsToClosingDelay?.unsubscribe();
      this.boxAnimation = 'reset';
    }
  }

  mouseOut(): void {
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
      response.clickedButtonID = _ClickedButtonID;
    }

    response.setSuccess(_IsSuccess);
    response.setBelonging(this.toastNotificationBelonging);
    this.toastNotificationBelonging.eventsController.setDefaultResponse(response);
  }

  onCustomButton(_Button: IButton): void {
    this.toastNotificationBelonging.eventsController.onButtonClick(_Button);
    this.setResponse(true, _Button.ID);
    this.toastNotificationBelonging.eventsController.close();
  }

  onButtonClick(_Type: 'confirm' | 'decline'): void {
    let buttonID;
    if (_Type === 'confirm') {
      buttonID = this.toastNotificationBelonging.toastCoreConfig.confirmLabel.toLowerCase();
    } else if (_Type === 'decline') {
      buttonID = this.toastNotificationBelonging.toastCoreConfig.declineLabel.toLowerCase();
    }

    this.setResponse(_Type === 'confirm', buttonID);
    this.toastNotificationBelonging.eventsController.close();
  }

  autoClose(): void {
    if (this.autoCloseCondition) {
      this.timer.setMilliseconds(this.toastNotificationBelonging.toastCoreConfig.autoCloseDelay);
      this.subTimer = this.timerStarted$
        .pipe(
          tap(next => {
            if ('start-counter' === next) {
              this.timer.start();
              this.isTimerStarted = true;
              this.timeout = setTimeout(() => {
                this.subsToClosingDelay = this.closeParent$().subscribe(resp => {
                  this.toastNotificationBelonging.eventsController.close();
                });
              }, this.toastNotificationBelonging.toastCoreConfig.autoCloseDelay);
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
    this.boxAnimation = this.toastNotificationBelonging.toastCoreConfig.animationOut;
    const closeDuration = this.toastNotificationBelonging.toastCoreConfig.animationOut ? 400 : 200;
    this.fadeInOutAnimation = 'close-fast';
    return of('').pipe(delay(closeDuration));
  }

  close(): void {
    this.toastNotificationBelonging.eventsController.close();
  }

  closeIcon(): void {
    this.closeIsClicked = true;
    this.subsToClosingDelay?.unsubscribe();
    this.closeParent$()
      .pipe(take(1))
      .subscribe(resp => {
        this.toastNotificationBelonging.eventsController.close();
      });
  }

  ngOnDestroy(): void {
    this.subsToClosingDelay?.unsubscribe();
    this.subTimer?.unsubscribe();
  }

  getIconClasses(): string {
    return (
      'icon-type-toast ' +
      this.layoutHelper.getIconClasses(
        this.toastNotificationBelonging.toastCoreConfig.layoutType,
        this.toastNotificationBelonging.toastCoreConfig.iconStyleClass
      )
    );
  }
}
