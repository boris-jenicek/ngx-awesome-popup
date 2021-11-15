import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { AppearanceAnimation } from '../../../core/enums';
import { Timer } from '../../../core/global-classes';
import { ToastNotificationBelonging, ToastNotificationDefaultResponse } from './classes';
export class WrapperAbstraction {
    constructor(toastNotificationBelonging) {
        this.toastNotificationBelonging = toastNotificationBelonging;
        this.fadeInOutAnimation = 'open';
        this.timerStarted$ = new BehaviorSubject('start-counter');
        this.isTimerStarted = false;
        this.timer = new Timer();
        this.boxAnimation = AppearanceAnimation.NONE;
        this.closeIsClicked = false;
        this.autoClosingHasStarted = false;
        setTimeout(() => {
            this.boxAnimation = this.toastNotificationBelonging.ToastCoreConfig.AnimationIn;
        }, 1);
    }
    get autoCloseCondition() {
        return (this.toastNotificationBelonging.ToastCoreConfig.AutoCloseDelay &&
            !(this.toastNotificationBelonging.Buttons.length ||
                this.toastNotificationBelonging.ToastCoreConfig.DeclineLabel ||
                this.toastNotificationBelonging.ToastCoreConfig.ConfirmLabel));
    }
    get buttonsExist() {
        return (!!this.toastNotificationBelonging.Buttons.length ||
            !!this.toastNotificationBelonging.ToastCoreConfig.DeclineLabel ||
            !!this.toastNotificationBelonging.ToastCoreConfig.ConfirmLabel);
    }
    mouseOver() {
        var _a;
        if (!this.buttonsExist && !this.closeIsClicked && !this.autoClosingHasStarted) {
            this.timerStarted$.next('stop-counter');
            this.fadeInOutAnimation = 'open';
            (_a = this.subsToClosingDelay) === null || _a === void 0 ? void 0 : _a.unsubscribe();
            this.boxAnimation = 0;
        }
    }
    mouseOut() {
        if (!this.buttonsExist && !this.closeIsClicked && !this.autoClosingHasStarted) {
            this.timerStarted$.next('start-counter');
        }
    }
    onOverlayClicked(evt) {
        //  console.log('onOverlayClicked');
    }
    onToastClicked(evt) {
        // console.log('onOverlayClicked');
    }
    setResponse(_IsSuccess, _ClickedButtonID) {
        const response = new ToastNotificationDefaultResponse();
        if (_ClickedButtonID) {
            response.ClickedButtonID = _ClickedButtonID;
        }
        response.setSuccess(_IsSuccess);
        response.setBelonging(this.toastNotificationBelonging);
        this.toastNotificationBelonging.EventsController.setDefaultResponse(response);
    }
    onCustomButton(_Button) {
        this.toastNotificationBelonging.EventsController.onButtonClick(_Button);
        this.setResponse(true, _Button.ID);
        this.toastNotificationBelonging.EventsController.close();
    }
    onButtonClick(_Type) {
        let buttonID;
        if (_Type === 'confirm') {
            buttonID = this.toastNotificationBelonging.ToastCoreConfig.ConfirmLabel.toLowerCase();
        }
        else if (_Type === 'decline') {
            buttonID = this.toastNotificationBelonging.ToastCoreConfig.DeclineLabel.toLowerCase();
        }
        this.setResponse(_Type === 'confirm', buttonID);
        this.toastNotificationBelonging.EventsController.close();
    }
    autoClose() {
        if (this.autoCloseCondition) {
            this.timer.setMilliseconds(this.toastNotificationBelonging.ToastCoreConfig.AutoCloseDelay);
            this.subTimer = this.timerStarted$
                .pipe(tap(next => {
                if ('start-counter' === next) {
                    this.timer.start();
                    this.isTimerStarted = true;
                    this.timeout = setTimeout(() => {
                        this.subsToClosingDelay = this.closeParent$().subscribe(resp => {
                            this.toastNotificationBelonging.EventsController.close();
                        });
                    }, this.toastNotificationBelonging.ToastCoreConfig.AutoCloseDelay);
                }
                else if ('stop-counter' === next) {
                    if (this.isTimerStarted) {
                        this.timer.stop();
                        clearTimeout(this.timeout);
                        this.isTimerStarted = false;
                    }
                }
            }))
                .subscribe();
        }
    }
    closeParent$() {
        this.autoClosingHasStarted = true;
        this.boxAnimation = this.toastNotificationBelonging.ToastCoreConfig.AnimationOut;
        const closeDuration = this.toastNotificationBelonging.ToastCoreConfig.AnimationOut ? 400 : 200;
        this.fadeInOutAnimation = 'close-fast';
        return of('').pipe(delay(closeDuration));
    }
    close() {
        this.toastNotificationBelonging.EventsController.close();
    }
    closeIcon() {
        var _a;
        this.closeIsClicked = true;
        (_a = this.subsToClosingDelay) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        this.closeParent$().subscribe(resp => {
            this.toastNotificationBelonging.EventsController.close();
        });
    }
    ngOnDestroy() {
        var _a, _b;
        (_a = this.subsToClosingDelay) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        (_b = this.subTimer) === null || _b === void 0 ? void 0 : _b.unsubscribe();
    }
}
WrapperAbstraction.decorators = [
    { type: Injectable }
];
WrapperAbstraction.ctorParameters = () => [
    { type: ToastNotificationBelonging }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JhcHBlci1hYnN0cmFjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL25neC1hd2Vzb21lLXBvcHVwL3R5cGVzL3RvYXN0LW5vdGlmaWNhdGlvbi9jb3JlL3dyYXBwZXItYWJzdHJhY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN0RCxPQUFPLEVBQUUsZUFBZSxFQUFjLEVBQUUsRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDckUsT0FBTyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLEVBQUUsbUJBQW1CLEVBQTBCLE1BQU0scUJBQXFCLENBQUM7QUFDbEYsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBR3JELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUd6RixNQUFNLE9BQWdCLGtCQUFrQjtJQVl0QyxZQUE2QiwwQkFBc0Q7UUFBdEQsK0JBQTBCLEdBQTFCLDBCQUEwQixDQUE0QjtRQVhuRix1QkFBa0IsR0FBVyxNQUFNLENBQUM7UUFDcEMsa0JBQWEsR0FBRyxJQUFJLGVBQWUsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUdyRCxtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUV2QixVQUFLLEdBQVUsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUMzQixpQkFBWSxHQUFpRCxtQkFBbUIsQ0FBQyxJQUFJLENBQUM7UUFDOUUsbUJBQWMsR0FBWSxLQUFLLENBQUM7UUFDaEMsMEJBQXFCLEdBQVksS0FBSyxDQUFDO1FBRzdDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDO1FBQ2xGLENBQUMsRUFBRSxDQUFDLENB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T25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIG9mLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlbGF5LCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBcHBlYXJhbmNlQW5pbWF0aW9uLCBEaXNhcHBlYXJhbmNlQW5pbWF0aW9uIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9lbnVtcyc7XG5pbXBvcnQgeyBUaW1lciB9IGZyb20gJy4uLy4uLy4uL2NvcmUvZ2xvYmFsLWNsYXNzZXMnO1xuaW1wb3J0IHsgSUJ1dHRvbiB9IGZyb20gJy4uLy4uLy4uL2NvcmUvZ2xvYmFsLWludGVyZmFjZXMnO1xuXG5pbXBvcnQgeyBUb2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZywgVG9hc3ROb3RpZmljYXRpb25EZWZhdWx0UmVzcG9uc2UgfSBmcm9tICcuL2NsYXNzZXMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgV3JhcHBlckFic3RyYWN0aW9uIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgZmFkZUluT3V0QW5pbWF0aW9uOiBzdHJpbmcgPSAnb3Blbic7XG4gIHRpbWVyU3RhcnRlZCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KCdzdGFydC1jb3VudGVyJyk7XG4gIHN1YnNUb0Nsb3NpbmdEZWxheTogU3Vic2NyaXB0aW9uO1xuICBzdWJUaW1lcjogU3Vic2NyaXB0aW9uO1xuICBpc1RpbWVyU3RhcnRlZCA9IGZhbHNlO1xuICB0aW1lb3V0O1xuICB0aW1lcjogVGltZXIgPSBuZXcgVGltZXIoKTtcbiAgYm94QW5pbWF0aW9uOiBBcHBlYXJhbmNlQW5pbWF0aW9uIHwgRGlzYXBwZWFyYW5jZUFuaW1hdGlvbiA9IEFwcGVhcmFuY2VBbmltYXRpb24uTk9ORTtcbiAgcHJpdmF0ZSBjbG9zZUlzQ2xpY2tlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIGF1dG9DbG9zaW5nSGFzU3RhcnRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHByb3RlY3RlZCBjb25zdHJ1Y3RvcihwdWJsaWMgdG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmc6IFRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmJveEFuaW1hdGlvbiA9IHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuVG9hc3RDb3JlQ29uZmlnLkFuaW1hdGlvbkluO1xuICAgIH0sIDEpO1xuICB9XG5cbiAgZ2V0IGF1dG9DbG9zZUNvbmRpdGlvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5Ub2FzdENvcmVDb25maWcuQXV0b0Nsb3NlRGVsYXkgJiZcbiAgICAgICEoXG4gICAgICAgIHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuQnV0dG9ucy5sZW5ndGggfHxcbiAgICAgICAgdGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5Ub2FzdENvcmVDb25maWcuRGVjbGluZUxhYmVsIHx8XG4gICAgICAgIHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuVG9hc3RDb3JlQ29uZmlnLkNvbmZpcm1MYWJlbFxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICBnZXQgYnV0dG9uc0V4aXN0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICAhIXRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuQnV0dG9ucy5sZW5ndGggfHxcbiAgICAgICEhdGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5Ub2FzdENvcmVDb25maWcuRGVjbGluZUxhYmVsIHx8XG4gICAgICAhIXRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuVG9hc3RDb3JlQ29uZmlnLkNvbmZpcm1MYWJlbFxuICAgICk7XG4gIH1cblxuICBtb3VzZU92ZXIoKSB7XG4gICAgaWYgKCF0aGlzLmJ1dHRvbnNFeGlzdCAmJiAhdGhpcy5jbG9zZUlzQ2xpY2tlZCAmJiAhdGhpcy5hdXRvQ2xvc2luZ0hhc1N0YXJ0ZWQpIHtcbiAgICAgIHRoaXMudGltZXJTdGFydGVkJC5uZXh0KCdzdG9wLWNvdW50ZXInKTtcbiAgICAgIHRoaXMuZmFkZUluT3V0QW5pbWF0aW9uID0gJ29wZW4nO1xuICAgICAgdGhpcy5zdWJzVG9DbG9zaW5nRGVsYXk/LnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLmJveEFuaW1hdGlvbiA9IDA7XG4gICAgfVxuICB9XG5cbiAgbW91c2VPdXQoKSB7XG4gICAgaWYgKCF0aGlzLmJ1dHRvbnNFeGlzdCAmJiAhdGhpcy5jbG9zZUlzQ2xpY2tlZCAmJiAhdGhpcy5hdXRvQ2xvc2luZ0hhc1N0YXJ0ZWQpIHtcbiAgICAgIHRoaXMudGltZXJTdGFydGVkJC5uZXh0KCdzdGFydC1jb3VudGVyJyk7XG4gICAgfVxuICB9XG5cbiAgb25PdmVybGF5Q2xpY2tlZChldnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICAvLyAgY29uc29sZS5sb2coJ29uT3ZlcmxheUNsaWNrZWQnKTtcbiAgfVxuXG4gIG9uVG9hc3RDbGlja2VkKGV2dDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIC8vIGNvbnNvbGUubG9nKCdvbk92ZXJsYXlDbGlja2VkJyk7XG4gIH1cblxuICBzZXRSZXNwb25zZShfSXNTdWNjZXNzOiBib29sZWFuLCBfQ2xpY2tlZEJ1dHRvbklEPzogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBuZXcgVG9hc3ROb3RpZmljYXRpb25EZWZhdWx0UmVzcG9uc2UoKTtcbiAgICBpZiAoX0NsaWNrZWRCdXR0b25JRCkge1xuICAgICAgcmVzcG9uc2UuQ2xpY2tlZEJ1dHRvbklEID0gX0NsaWNrZWRCdXR0b25JRDtcbiAgICB9XG5cbiAgICByZXNwb25zZS5zZXRTdWNjZXNzKF9Jc1N1Y2Nlc3MpO1xuICAgIHJlc3BvbnNlLnNldEJlbG9uZ2luZyh0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nKTtcbiAgICB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLkV2ZW50c0NvbnRyb2xsZXIuc2V0RGVmYXVsdFJlc3BvbnNlKHJlc3BvbnNlKTtcbiAgfVxuXG4gIG9uQ3VzdG9tQnV0dG9uKF9CdXR0b246IElCdXR0b24pOiB2b2lkIHtcbiAgICB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLkV2ZW50c0NvbnRyb2xsZXIub25CdXR0b25DbGljayhfQnV0dG9uKTtcbiAgICB0aGlzLnNldFJlc3BvbnNlKHRydWUsIF9CdXR0b24uSUQpO1xuICAgIHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuRXZlbnRzQ29udHJvbGxlci5jbG9zZSgpO1xuICB9XG5cbiAgb25CdXR0b25DbGljayhfVHlwZTogJ2NvbmZpcm0nIHwgJ2RlY2xpbmUnKSB7XG4gICAgbGV0IGJ1dHRvbklEO1xuICAgIGlmIChfVHlwZSA9PT0gJ2NvbmZpcm0nKSB7XG4gICAgICBidXR0b25JRCA9IHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuVG9hc3RDb3JlQ29uZmlnLkNvbmZpcm1MYWJlbC50b0xvd2VyQ2FzZSgpO1xuICAgIH0gZWxzZSBpZiAoX1R5cGUgPT09ICdkZWNsaW5lJykge1xuICAgICAgYnV0dG9uSUQgPSB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLlRvYXN0Q29yZUNvbmZpZy5EZWNsaW5lTGFiZWwudG9Mb3dlckNhc2UoKTtcbiAgICB9XG5cbiAgICB0aGlzLnNldFJlc3BvbnNlKF9UeXBlID09PSAnY29uZmlybScsIGJ1dHRvbklEKTtcbiAgICB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLkV2ZW50c0NvbnRyb2xsZXIuY2xvc2UoKTtcbiAgfVxuXG4gIGF1dG9DbG9zZSgpIHtcbiAgICBpZiAodGhpcy5hdXRvQ2xvc2VDb25kaXRpb24pIHtcbiAgICAgIHRoaXMudGltZXIuc2V0TWlsbGlzZWNvbmRzKHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuVG9hc3RDb3JlQ29uZmlnLkF1dG9DbG9zZURlbGF5KTtcbiAgICAgIHRoaXMuc3ViVGltZXIgPSB0aGlzLnRpbWVyU3RhcnRlZCRcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgdGFwKG5leHQgPT4ge1xuICAgICAgICAgICAgaWYgKCdzdGFydC1jb3VudGVyJyA9PT0gbmV4dCkge1xuICAgICAgICAgICAgICB0aGlzLnRpbWVyLnN0YXJ0KCk7XG4gICAgICAgICAgICAgIHRoaXMuaXNUaW1lclN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnN1YnNUb0Nsb3NpbmdEZWxheSA9IHRoaXMuY2xvc2VQYXJlbnQkKCkuc3Vic2NyaWJlKHJlc3AgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5FdmVudHNDb250cm9sbGVyLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0sIHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuVG9hc3RDb3JlQ29uZmlnLkF1dG9DbG9zZURlbGF5KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoJ3N0b3AtY291bnRlcicgPT09IG5leHQpIHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuaXNUaW1lclN0YXJ0ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVyLnN0b3AoKTtcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcbiAgICAgICAgICAgICAgICB0aGlzLmlzVGltZXJTdGFydGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBjbG9zZVBhcmVudCQoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICB0aGlzLmF1dG9DbG9zaW5nSGFzU3RhcnRlZCA9IHRydWU7XG4gICAgdGhpcy5ib3hBbmltYXRpb24gPSB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLlRvYXN0Q29yZUNvbmZpZy5BbmltYXRpb25PdXQ7XG4gICAgY29uc3QgY2xvc2VEdXJhdGlvbiA9IHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuVG9hc3RDb3JlQ29uZmlnLkFuaW1hdGlvbk91dCA/IDQwMCA6IDIwMDtcbiAgICB0aGlzLmZhZGVJbk91dEFuaW1hdGlvbiA9ICdjbG9zZS1mYXN0JztcbiAgICByZXR1cm4gb2YoJycpLnBpcGUoZGVsYXkoY2xvc2VEdXJhdGlvbikpO1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5FdmVudHNDb250cm9sbGVyLmNsb3NlKCk7XG4gIH1cblxuICBjbG9zZUljb24oKTogdm9pZCB7XG4gICAgdGhpcy5jbG9zZUlzQ2xpY2tlZCA9IHRydWU7XG4gICAgdGhpcy5zdWJzVG9DbG9zaW5nRGVsYXk/LnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5jbG9zZVBhcmVudCQoKS5zdWJzY3JpYmUocmVzcCA9PiB7XG4gICAgICB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLkV2ZW50c0NvbnRyb2xsZXIuY2xvc2UoKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic1RvQ2xvc2luZ0RlbGF5Py51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuc3ViVGltZXI/LnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==