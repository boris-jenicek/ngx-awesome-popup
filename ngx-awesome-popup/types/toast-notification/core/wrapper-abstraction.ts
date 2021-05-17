import { Directive, OnDestroy } from "@angular/core";
import { BehaviorSubject, Observable, of, Subscription } from "rxjs";
import { delay, tap } from "rxjs/operators";
import { GlobalClass, GlobalInterface } from "../../../core/global";
import { ToastNotificationClass } from "./model";

@Directive()
export abstract class WrapperAbstraction implements OnDestroy {
  fadeInOutAnimation: string = "open";
  timerStarted$ = new BehaviorSubject("start-counter");
  subsToClosingDelay: Subscription;
  subTimer: Subscription;
  isTimerStarted = false;
  timeout;
  timer: GlobalClass.Timer = new GlobalClass.Timer();

  protected constructor(
    public toastNotificationBelonging: ToastNotificationClass.ToastNotificationBelonging
  ) {}

  mouseOver() {
    this.timerStarted$.next("stop-counter");
    this.fadeInOutAnimation = "open";
    this.subsToClosingDelay?.unsubscribe();
  }

  mouseOut() {
    this.timerStarted$.next("start-counter");
  }

  onOverlayClicked(evt: MouseEvent): void {
    //  console.log('onOverlayClicked');
  }

  onToastClicked(evt: MouseEvent): void {
    // console.log('onOverlayClicked');
  }

  setResponse(_IsSuccess: boolean, _ClickedButtonID?: string): void {
    const response = new ToastNotificationClass.ToastNotificationDefaultResponse();
    if (_ClickedButtonID) {
      response.ClickedButtonID = _ClickedButtonID;
    }

    response.setSuccess(_IsSuccess);
    response.setBelonging(this.toastNotificationBelonging);
    this.toastNotificationBelonging.EventsController.setDefaultResponse(
      response
    );
  }

  onCustomButton(_Button: GlobalInterface.IButton): void {
    this.toastNotificationBelonging.EventsController.onButtonClick(_Button);
    this.setResponse(true, _Button.ID);
    this.toastNotificationBelonging.EventsController.close();
  }

  onButtonClick(_Type: "confirm" | "decline") {
    let buttonID;
    if (_Type === "confirm") {
      buttonID = this.toastNotificationBelonging.ToastCoreConfig.ConfirmLabel.toLowerCase();
    } else if (_Type === "decline") {
      buttonID = this.toastNotificationBelonging.ToastCoreConfig.DeclineLabel.toLowerCase();
    }

    this.setResponse(_Type === "confirm", buttonID);
    this.toastNotificationBelonging.EventsController.close();
  }

  autoClose() {
    if (this.autoCloseCondition()) {
      this.timer.setMilliseconds(
        this.toastNotificationBelonging.ToastCoreConfig.AutoCloseDelay
      );
      this.subTimer = this.timerStarted$
        .pipe(
          tap((next) => {
            if ("start-counter" === next) {
              this.timer.start();
              this.isTimerStarted = true;
              this.timeout = setTimeout(() => {
                this.subsToClosingDelay = this.closeParent$(
                  "close-slow"
                ).subscribe((resp) => {
                  this.toastNotificationBelonging.EventsController.close();
                });
              }, this.toastNotificationBelonging.ToastCoreConfig.AutoCloseDelay);
            } else if ("stop-counter" === next) {
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

  autoCloseCondition(): boolean {
    return (
      this.toastNotificationBelonging.ToastCoreConfig.AutoCloseDelay &&
      !(
        this.toastNotificationBelonging.Buttons.length ||
        this.toastNotificationBelonging.ToastCoreConfig.DeclineLabel ||
        this.toastNotificationBelonging.ToastCoreConfig.ConfirmLabel
      )
    );
  }

  closeParent$(_ClosingAnimation: string): Observable<any> {
    this.fadeInOutAnimation = _ClosingAnimation;
    const timer = _ClosingAnimation === "close-slow" ? 1400 : 150;
    return of("").pipe(delay(timer));
  }

  close() {
    this.toastNotificationBelonging.EventsController.close();
  }

  ngOnDestroy() {
    this.subsToClosingDelay?.unsubscribe();
    this.subTimer?.unsubscribe();
  }
}
