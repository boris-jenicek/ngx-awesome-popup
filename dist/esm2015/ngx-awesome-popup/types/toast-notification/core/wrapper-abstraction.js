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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JhcHBlci1hYnN0cmFjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL25neC1hd2Vzb21lLXBvcHVwL3R5cGVzL3RvYXN0LW5vdGlmaWNhdGlvbi9jb3JlL3dyYXBwZXItYWJzdHJhY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN0RCxPQUFPLEVBQUUsZUFBZSxFQUFjLEVBQUUsRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDckUsT0FBTyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFHckQsT0FBTyxFQUNMLDBCQUEwQixFQUMxQixnQ0FBZ0MsRUFDakMsTUFBTSxXQUFXLENBQUM7QUFHbkIsTUFBTSxPQUFnQixrQkFBa0I7SUFTdEMsWUFDUywwQkFBc0Q7UUFBdEQsK0JBQTBCLEdBQTFCLDBCQUEwQixDQUE0QjtRQVQvRCx1QkFBa0IsR0FBVyxNQUFNLENBQUM7UUFDcEMsa0JBQWEsR0FBRyxJQUFJLGVBQWUsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUdyRCxtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUV2QixVQUFLLEdBQVUsSUFBSSxLQUFLLEVBQUUsQ0FBQztJQUl4QixDQUFDO0lBRUosU0FBUzs7UUFDUCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsTUFBTSxDQUFDO1FBQ2pDLE1BQUEsSUFBSSxDQUFDLGtCQUFrQiwwQ0FBRSxXQUFXLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRCxnQkFBZ0IsQ0FB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QUFDLENBQUMsQ0FDSDtpQkFDQSxTQUFTLEVBQUUsQ0FBQztTQUNoQjtJQUNILENBQUM7SUFFRCxrQkFBa0I7UUFDaEIsT0FBTyxDQUNMLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxlQUFlLENBQUMsY0FBYztZQUM5RCxDQUFDLENBQ0MsSUFBSSxDQUFDLDBCQUEwQixDQUFDLE9BQU8sQ0FBQyxNQUFNO2dCQUM5QyxJQUFJLENBQUMsMEJBQTBCLENBQUMsZUFBZSxDQUFDLFlBQVk7Z0JBQzVELElBQUksQ0FBQywwQkFBMEIsQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUM3RCxDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQsWUFBWSxDQUFDLGlCQUF5QjtRQUNwQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsaUJBQWlCLENBQUM7UUFDNUMsTUFBTSxLQUFLLEdBQUcsaUJBQWlCLEtBQUssWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUM5RCxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELEtBQUs7UUFDSCxJQUFJLENBQUMsMEJBQTBCLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDM0QsQ0FBQztJQUVELFdBQVc7O1FBQ1QsTUFBQSxJQUFJLENBQUMsa0JBQWtCLDBDQUFFLFdBQVcsRUFBRSxDQUFDO1FBQ3ZDLE1BQUEsSUFBSSxDQUFDLFFBQVEsMENBQUUsV0FBVyxFQUFFLENBQUM7SUFDL0IsQ0FBQzs7O1lBdEhGLFVBQVU7OztZQUpULDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBvZiwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWxheSwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgVGltZXIgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2dsb2JhbC1jbGFzc2VzJztcbmltcG9ydCB7IElCdXR0b24gfSBmcm9tICcuLi8uLi8uLi9jb3JlL2dsb2JhbC1pbnRlcmZhY2VzJztcblxuaW1wb3J0IHtcbiAgVG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcsXG4gIFRvYXN0Tm90aWZpY2F0aW9uRGVmYXVsdFJlc3BvbnNlXG59IGZyb20gJy4vY2xhc3Nlcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBXcmFwcGVyQWJzdHJhY3Rpb24gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBmYWRlSW5PdXRBbmltYXRpb246IHN0cmluZyA9ICdvcGVuJztcbiAgdGltZXJTdGFydGVkJCA9IG5ldyBCZWhhdmlvclN1YmplY3QoJ3N0YXJ0LWNvdW50ZXInKTtcbiAgc3Vic1RvQ2xvc2luZ0RlbGF5OiBTdWJzY3JpcHRpb247XG4gIHN1YlRpbWVyOiBTdWJzY3JpcHRpb247XG4gIGlzVGltZXJTdGFydGVkID0gZmFsc2U7XG4gIHRpbWVvdXQ7XG4gIHRpbWVyOiBUaW1lciA9IG5ldyBUaW1lcigpO1xuXG4gIHByb3RlY3RlZCBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgdG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmc6IFRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nXG4gICkge31cblxuICBtb3VzZU92ZXIoKSB7XG4gICAgdGhpcy50aW1lclN0YXJ0ZWQkLm5leHQoJ3N0b3AtY291bnRlcicpO1xuICAgIHRoaXMuZmFkZUluT3V0QW5pbWF0aW9uID0gJ29wZW4nO1xuICAgIHRoaXMuc3Vic1RvQ2xvc2luZ0RlbGF5Py51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgbW91c2VPdXQoKSB7XG4gICAgdGhpcy50aW1lclN0YXJ0ZWQkLm5leHQoJ3N0YXJ0LWNvdW50ZXInKTtcbiAgfVxuXG4gIG9uT3ZlcmxheUNsaWNrZWQoZXZ0OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgLy8gIGNvbnNvbGUubG9nKCdvbk92ZXJsYXlDbGlja2VkJyk7XG4gIH1cblxuICBvblRvYXN0Q2xpY2tlZChldnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICAvLyBjb25zb2xlLmxvZygnb25PdmVybGF5Q2xpY2tlZCcpO1xuICB9XG5cbiAgc2V0UmVzcG9uc2UoX0lzU3VjY2VzczogYm9vbGVhbiwgX0NsaWNrZWRCdXR0b25JRD86IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gbmV3IFRvYXN0Tm90aWZpY2F0aW9uRGVmYXVsdFJlc3BvbnNlKCk7XG4gICAgaWYgKF9DbGlja2VkQnV0dG9uSUQpIHtcbiAgICAgIHJlc3BvbnNlLkNsaWNrZWRCdXR0b25JRCA9IF9DbGlja2VkQnV0dG9uSUQ7XG4gICAgfVxuXG4gICAgcmVzcG9uc2Uuc2V0U3VjY2VzcyhfSXNTdWNjZXNzKTtcbiAgICByZXNwb25zZS5zZXRCZWxvbmdpbmcodGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZyk7XG4gICAgdGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5FdmVudHNDb250cm9sbGVyLnNldERlZmF1bHRSZXNwb25zZShcbiAgICAgIHJlc3BvbnNlXG4gICAgKTtcbiAgfVxuXG4gIG9uQ3VzdG9tQnV0dG9uKF9CdXR0b246IElCdXR0b24pOiB2b2lkIHtcbiAgICB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLkV2ZW50c0NvbnRyb2xsZXIub25CdXR0b25DbGljayhfQnV0dG9uKTtcbiAgICB0aGlzLnNldFJlc3BvbnNlKHRydWUsIF9CdXR0b24uSUQpO1xuICAgIHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuRXZlbnRzQ29udHJvbGxlci5jbG9zZSgpO1xuICB9XG5cbiAgb25CdXR0b25DbGljayhfVHlwZTogJ2NvbmZpcm0nIHwgJ2RlY2xpbmUnKSB7XG4gICAgbGV0IGJ1dHRvbklEO1xuICAgIGlmIChfVHlwZSA9PT0gJ2NvbmZpcm0nKSB7XG4gICAgICBidXR0b25JRCA9IHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuVG9hc3RDb3JlQ29uZmlnLkNvbmZpcm1MYWJlbC50b0xvd2VyQ2FzZSgpO1xuICAgIH0gZWxzZSBpZiAoX1R5cGUgPT09ICdkZWNsaW5lJykge1xuICAgICAgYnV0dG9uSUQgPSB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLlRvYXN0Q29yZUNvbmZpZy5EZWNsaW5lTGFiZWwudG9Mb3dlckNhc2UoKTtcbiAgICB9XG5cbiAgICB0aGlzLnNldFJlc3BvbnNlKF9UeXBlID09PSAnY29uZmlybScsIGJ1dHRvbklEKTtcbiAgICB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLkV2ZW50c0NvbnRyb2xsZXIuY2xvc2UoKTtcbiAgfVxuXG4gIGF1dG9DbG9zZSgpIHtcbiAgICBpZiAodGhpcy5hdXRvQ2xvc2VDb25kaXRpb24oKSkge1xuICAgICAgdGhpcy50aW1lci5zZXRNaWxsaXNlY29uZHMoXG4gICAgICAgIHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuVG9hc3RDb3JlQ29uZmlnLkF1dG9DbG9zZURlbGF5XG4gICAgICApO1xuICAgICAgdGhpcy5zdWJUaW1lciA9IHRoaXMudGltZXJTdGFydGVkJFxuICAgICAgICAucGlwZShcbiAgICAgICAgICB0YXAobmV4dCA9PiB7XG4gICAgICAgICAgICBpZiAoJ3N0YXJ0LWNvdW50ZXInID09PSBuZXh0KSB7XG4gICAgICAgICAgICAgIHRoaXMudGltZXIuc3RhcnQoKTtcbiAgICAgICAgICAgICAgdGhpcy5pc1RpbWVyU3RhcnRlZCA9IHRydWU7XG4gICAgICAgICAgICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc3Vic1RvQ2xvc2luZ0RlbGF5ID0gdGhpcy5jbG9zZVBhcmVudCQoXG4gICAgICAgICAgICAgICAgICAnY2xvc2Utc2xvdydcbiAgICAgICAgICAgICAgICApLnN1YnNjcmliZShyZXNwID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuRXZlbnRzQ29udHJvbGxlci5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9LCB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLlRvYXN0Q29yZUNvbmZpZy5BdXRvQ2xvc2VEZWxheSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCdzdG9wLWNvdW50ZXInID09PSBuZXh0KSB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLmlzVGltZXJTdGFydGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lci5zdG9wKCk7XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1RpbWVyU3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgYXV0b0Nsb3NlQ29uZGl0aW9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLlRvYXN0Q29yZUNvbmZpZy5BdXRvQ2xvc2VEZWxheSAmJlxuICAgICAgIShcbiAgICAgICAgdGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5CdXR0b25zLmxlbmd0aCB8fFxuICAgICAgICB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLlRvYXN0Q29yZUNvbmZpZy5EZWNsaW5lTGFiZWwgfHxcbiAgICAgICAgdGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5Ub2FzdENvcmVDb25maWcuQ29uZmlybUxhYmVsXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIGNsb3NlUGFyZW50JChfQ2xvc2luZ0FuaW1hdGlvbjogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICB0aGlzLmZhZGVJbk91dEFuaW1hdGlvbiA9IF9DbG9zaW5nQW5pbWF0aW9uO1xuICAgIGNvbnN0IHRpbWVyID0gX0Nsb3NpbmdBbmltYXRpb24gPT09ICdjbG9zZS1zbG93JyA/IDE0MDAgOiAxNTA7XG4gICAgcmV0dXJuIG9mKCcnKS5waXBlKGRlbGF5KHRpbWVyKSk7XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLkV2ZW50c0NvbnRyb2xsZXIuY2xvc2UoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic1RvQ2xvc2luZ0RlbGF5Py51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuc3ViVGltZXI/LnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==