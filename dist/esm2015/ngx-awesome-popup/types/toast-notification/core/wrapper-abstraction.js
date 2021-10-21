import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Timer } from '../../../core/global-classes';
import { ToastNotificationBelonging, ToastNotificationDefaultResponse } from './classes';
export class WrapperAbstraction {
    constructor(toastNotificationBelonging) {
        this.toastNotificationBelonging = toastNotificationBelonging;
        this.fadeInOutAnimation = 'open';
        this.timerStarted$ = new BehaviorSubject('start-counter');
        this.isTimerStarted = false;
        this.timer = new Timer();
    }
    mouseOver() {
        var _a;
        this.timerStarted$.next('stop-counter');
        this.fadeInOutAnimation = 'open';
        (_a = this.subsToClosingDelay) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    }
    mouseOut() {
        this.timerStarted$.next('start-counter');
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
        if (this.autoCloseCondition()) {
            this.timer.setMilliseconds(this.toastNotificationBelonging.ToastCoreConfig.AutoCloseDelay);
            this.subTimer = this.timerStarted$
                .pipe(tap(next => {
                if ('start-counter' === next) {
                    this.timer.start();
                    this.isTimerStarted = true;
                    this.timeout = setTimeout(() => {
                        this.subsToClosingDelay = this.closeParent$('close-slow').subscribe(resp => {
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
    autoCloseCondition() {
        return (this.toastNotificationBelonging.ToastCoreConfig.AutoCloseDelay &&
            !(this.toastNotificationBelonging.Buttons.length ||
                this.toastNotificationBelonging.ToastCoreConfig.DeclineLabel ||
                this.toastNotificationBelonging.ToastCoreConfig.ConfirmLabel));
    }
    closeParent$(_ClosingAnimation) {
        this.fadeInOutAnimation = _ClosingAnimation;
        const timer = _ClosingAnimation === 'close-slow' ? 1400 : 150;
        return of('').pipe(delay(timer));
    }
    close() {
        this.toastNotificationBelonging.EventsController.close();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JhcHBlci1hYnN0cmFjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL25neC1hd2Vzb21lLXBvcHVwL3R5cGVzL3RvYXN0LW5vdGlmaWNhdGlvbi9jb3JlL3dyYXBwZXItYWJzdHJhY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFhLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUNqRSxPQUFPLEVBQUUsZUFBZSxFQUFjLEVBQUUsRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDckUsT0FBTyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFHckQsT0FBTyxFQUNMLDBCQUEwQixFQUMxQixnQ0FBZ0MsRUFDakMsTUFBTSxXQUFXLENBQUM7QUFHbkIsTUFBTSxPQUFnQixrQkFBa0I7SUFTdEMsWUFDUywwQkFBc0Q7UUFBdEQsK0JBQTBCLEdBQTFCLDBCQUEwQixDQUE0QjtRQVQvRCx1QkFBa0IsR0FBVyxNQUFNLENBQUM7UUFDcEMsa0JBQWEsR0FBRyxJQUFJLGVBQWUsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUdyRCxtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUV2QixVQUFLLEdBQVUsSUFBSSxLQUFLLEVBQUUsQ0FBQztJQUl4QixDQUFDO0lBRUosU0FBUzs7UUFDUCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsTUFBTSxDQUFDO1FBQ2pDLE1BQUEsSUFBSSxDQUFDLGtCQUFrQiwwQ0FBRSxXQUFXLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRCxnQkFBZ0IsQ0FB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QUFDLENBQUMsQ0FDSDtpQkFDQSxTQUFTLEVBQUUsQ0FBQztTQUNoQjtJQUNILENBQUM7SUFFRCxrQkFBa0I7UUFDaEIsT0FBTyxDQUNMLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxlQUFlLENBQUMsY0FBYztZQUM5RCxDQUFDLENBQ0MsSUFBSSxDQUFDLDBCQUEwQixDQUFDLE9BQU8sQ0FBQyxNQUFNO2dCQUM5QyxJQUFJLENBQUMsMEJBQTBCLENBQUMsZUFBZSxDQUFDLFlBQVk7Z0JBQzVELElBQUksQ0FBQywwQkFBMEIsQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUM3RCxDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQsWUFBWSxDQUFDLGlCQUF5QjtRQUNwQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsaUJBQWlCLENBQUM7UUFDNUMsTUFBTSxLQUFLLEdBQUcsaUJBQWlCLEtBQUssWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUM5RCxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELEtBQUs7UUFDSCxJQUFJLENBQUMsMEJBQTBCLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDM0QsQ0FBQztJQUVELFdBQVc7O1FBQ1QsTUFBQSxJQUFJLENBQUMsa0JBQWtCLDBDQUFFLFdBQVcsRUFBRSxDQUFDO1FBQ3ZDLE1BQUEsSUFBSSxDQUFDLFFBQVEsMENBQUUsV0FBVyxFQUFFLENBQUM7SUFDL0IsQ0FBQzs7O1lBdEhGLFVBQVU7OztZQUpULDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIG9mLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlbGF5LCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBUaW1lciB9IGZyb20gJy4uLy4uLy4uL2NvcmUvZ2xvYmFsLWNsYXNzZXMnO1xuaW1wb3J0IHsgSUJ1dHRvbiB9IGZyb20gJy4uLy4uLy4uL2NvcmUvZ2xvYmFsLWludGVyZmFjZXMnO1xuXG5pbXBvcnQge1xuICBUb2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZyxcbiAgVG9hc3ROb3RpZmljYXRpb25EZWZhdWx0UmVzcG9uc2Vcbn0gZnJvbSAnLi9jbGFzc2VzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFdyYXBwZXJBYnN0cmFjdGlvbiBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIGZhZGVJbk91dEFuaW1hdGlvbjogc3RyaW5nID0gJ29wZW4nO1xuICB0aW1lclN0YXJ0ZWQkID0gbmV3IEJlaGF2aW9yU3ViamVjdCgnc3RhcnQtY291bnRlcicpO1xuICBzdWJzVG9DbG9zaW5nRGVsYXk6IFN1YnNjcmlwdGlvbjtcbiAgc3ViVGltZXI6IFN1YnNjcmlwdGlvbjtcbiAgaXNUaW1lclN0YXJ0ZWQgPSBmYWxzZTtcbiAgdGltZW91dDtcbiAgdGltZXI6IFRpbWVyID0gbmV3IFRpbWVyKCk7XG5cbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyB0b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZzogVG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmdcbiAgKSB7fVxuXG4gIG1vdXNlT3ZlcigpIHtcbiAgICB0aGlzLnRpbWVyU3RhcnRlZCQubmV4dCgnc3RvcC1jb3VudGVyJyk7XG4gICAgdGhpcy5mYWRlSW5PdXRBbmltYXRpb24gPSAnb3Blbic7XG4gICAgdGhpcy5zdWJzVG9DbG9zaW5nRGVsYXk/LnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBtb3VzZU91dCgpIHtcbiAgICB0aGlzLnRpbWVyU3RhcnRlZCQubmV4dCgnc3RhcnQtY291bnRlcicpO1xuICB9XG5cbiAgb25PdmVybGF5Q2xpY2tlZChldnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICAvLyAgY29uc29sZS5sb2coJ29uT3ZlcmxheUNsaWNrZWQnKTtcbiAgfVxuXG4gIG9uVG9hc3RDbGlja2VkKGV2dDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIC8vIGNvbnNvbGUubG9nKCdvbk92ZXJsYXlDbGlja2VkJyk7XG4gIH1cblxuICBzZXRSZXNwb25zZShfSXNTdWNjZXNzOiBib29sZWFuLCBfQ2xpY2tlZEJ1dHRvbklEPzogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBuZXcgVG9hc3ROb3RpZmljYXRpb25EZWZhdWx0UmVzcG9uc2UoKTtcbiAgICBpZiAoX0NsaWNrZWRCdXR0b25JRCkge1xuICAgICAgcmVzcG9uc2UuQ2xpY2tlZEJ1dHRvbklEID0gX0NsaWNrZWRCdXR0b25JRDtcbiAgICB9XG5cbiAgICByZXNwb25zZS5zZXRTdWNjZXNzKF9Jc1N1Y2Nlc3MpO1xuICAgIHJlc3BvbnNlLnNldEJlbG9uZ2luZyh0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nKTtcbiAgICB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLkV2ZW50c0NvbnRyb2xsZXIuc2V0RGVmYXVsdFJlc3BvbnNlKFxuICAgICAgcmVzcG9uc2VcbiAgICApO1xuICB9XG5cbiAgb25DdXN0b21CdXR0b24oX0J1dHRvbjogSUJ1dHRvbik6IHZvaWQge1xuICAgIHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuRXZlbnRzQ29udHJvbGxlci5vbkJ1dHRvbkNsaWNrKF9CdXR0b24pO1xuICAgIHRoaXMuc2V0UmVzcG9uc2UodHJ1ZSwgX0J1dHRvbi5JRCk7XG4gICAgdGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5FdmVudHNDb250cm9sbGVyLmNsb3NlKCk7XG4gIH1cblxuICBvbkJ1dHRvbkNsaWNrKF9UeXBlOiAnY29uZmlybScgfCAnZGVjbGluZScpIHtcbiAgICBsZXQgYnV0dG9uSUQ7XG4gICAgaWYgKF9UeXBlID09PSAnY29uZmlybScpIHtcbiAgICAgIGJ1dHRvbklEID0gdGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5Ub2FzdENvcmVDb25maWcuQ29uZmlybUxhYmVsLnRvTG93ZXJDYXNlKCk7XG4gICAgfSBlbHNlIGlmIChfVHlwZSA9PT0gJ2RlY2xpbmUnKSB7XG4gICAgICBidXR0b25JRCA9IHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuVG9hc3RDb3JlQ29uZmlnLkRlY2xpbmVMYWJlbC50b0xvd2VyQ2FzZSgpO1xuICAgIH1cblxuICAgIHRoaXMuc2V0UmVzcG9uc2UoX1R5cGUgPT09ICdjb25maXJtJywgYnV0dG9uSUQpO1xuICAgIHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuRXZlbnRzQ29udHJvbGxlci5jbG9zZSgpO1xuICB9XG5cbiAgYXV0b0Nsb3NlKCkge1xuICAgIGlmICh0aGlzLmF1dG9DbG9zZUNvbmRpdGlvbigpKSB7XG4gICAgICB0aGlzLnRpbWVyLnNldE1pbGxpc2Vjb25kcyhcbiAgICAgICAgdGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5Ub2FzdENvcmVDb25maWcuQXV0b0Nsb3NlRGVsYXlcbiAgICAgICk7XG4gICAgICB0aGlzLnN1YlRpbWVyID0gdGhpcy50aW1lclN0YXJ0ZWQkXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIHRhcChuZXh0ID0+IHtcbiAgICAgICAgICAgIGlmICgnc3RhcnQtY291bnRlcicgPT09IG5leHQpIHtcbiAgICAgICAgICAgICAgdGhpcy50aW1lci5zdGFydCgpO1xuICAgICAgICAgICAgICB0aGlzLmlzVGltZXJTdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdWJzVG9DbG9zaW5nRGVsYXkgPSB0aGlzLmNsb3NlUGFyZW50JChcbiAgICAgICAgICAgICAgICAgICdjbG9zZS1zbG93J1xuICAgICAgICAgICAgICAgICkuc3Vic2NyaWJlKHJlc3AgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5FdmVudHNDb250cm9sbGVyLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0sIHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuVG9hc3RDb3JlQ29uZmlnLkF1dG9DbG9zZURlbGF5KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoJ3N0b3AtY291bnRlcicgPT09IG5leHQpIHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuaXNUaW1lclN0YXJ0ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVyLnN0b3AoKTtcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcbiAgICAgICAgICAgICAgICB0aGlzLmlzVGltZXJTdGFydGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBhdXRvQ2xvc2VDb25kaXRpb24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuVG9hc3RDb3JlQ29uZmlnLkF1dG9DbG9zZURlbGF5ICYmXG4gICAgICAhKFxuICAgICAgICB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLkJ1dHRvbnMubGVuZ3RoIHx8XG4gICAgICAgIHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuVG9hc3RDb3JlQ29uZmlnLkRlY2xpbmVMYWJlbCB8fFxuICAgICAgICB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLlRvYXN0Q29yZUNvbmZpZy5Db25maXJtTGFiZWxcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgY2xvc2VQYXJlbnQkKF9DbG9zaW5nQW5pbWF0aW9uOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHRoaXMuZmFkZUluT3V0QW5pbWF0aW9uID0gX0Nsb3NpbmdBbmltYXRpb247XG4gICAgY29uc3QgdGltZXIgPSBfQ2xvc2luZ0FuaW1hdGlvbiA9PT0gJ2Nsb3NlLXNsb3cnID8gMTQwMCA6IDE1MDtcbiAgICByZXR1cm4gb2YoJycpLnBpcGUoZGVsYXkodGltZXIpKTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuRXZlbnRzQ29udHJvbGxlci5jbG9zZSgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzVG9DbG9zaW5nRGVsYXk/LnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5zdWJUaW1lcj8udW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19