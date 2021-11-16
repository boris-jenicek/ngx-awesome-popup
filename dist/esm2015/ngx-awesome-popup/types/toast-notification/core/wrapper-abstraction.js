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
            this.boxAnimation = null;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JhcHBlci1hYnN0cmFjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL25neC1hd2Vzb21lLXBvcHVwL3R5cGVzL3RvYXN0LW5vdGlmaWNhdGlvbi9jb3JlL3dyYXBwZXItYWJzdHJhY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN0RCxPQUFPLEVBQUUsZUFBZSxFQUFjLEVBQUUsRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDckUsT0FBTyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU1QyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFHckQsT0FBTyxFQUFFLDBCQUEwQixFQUFFLGdDQUFnQyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBR3pGLE1BQU0sT0FBZ0Isa0JBQWtCO0lBWXRDLFlBQTZCLDBCQUFzRDtRQUF0RCwrQkFBMEIsR0FBMUIsMEJBQTBCLENBQTRCO1FBWG5GLHVCQUFrQixHQUFXLE1BQU0sQ0FBQztRQUNwQyxrQkFBYSxHQUFHLElBQUksZUFBZSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBR3JELG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBRXZCLFVBQUssR0FBVSxJQUFJLEtBQUssRUFBRSxDQUFDO1FBRW5CLG1CQUFjLEdBQVksS0FBSyxDQUFDO1FBQ2hDLDBCQUFxQixHQUFZLEtBQUssQ0FBQztRQUc3QyxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsMEJBQTBCLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQztRQUNsRixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDUixDQUFDO0lBRUQsSUFBSSxrQkFBa0I7UUFDcEIsT0FBTyxDQUNMLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxlQUFlLENBQUMsY0FB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QkFBcUIsR0FBRyxJQUFJLENBQUM7UUFDbEMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsMEJBQTBCLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQztRQUNqRixNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsMEJBQTBCLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDL0YsSUFBSSxDQUFDLGtCQUFrQixHQUFHLFlBQVksQ0FBQztRQUN2QyxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELEtBQUs7UUFDSCxJQUFJLENBQUMsMEJBQTBCLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDM0QsQ0FBQztJQUVELFNBQVM7O1FBQ1AsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7UUFDM0IsTUFBQSxJQUFJLENBQUMsa0JBQWtCLDBDQUFFLFdBQVcsRUFBRSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDbkMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzNELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFdBQVc7O1FBQ1QsTUFBQSxJQUFJLENBQUMsa0JBQWtCLDBDQUFFLFdBQVcsRUFBRSxDQUFDO1FBQ3ZDLE1BQUEsSUFBSSxDQUFDLFFBQVEsMENBQUUsV0FBVyxFQUFFLENBQUM7SUFDL0IsQ0FBQzs7O1lBNUlGLFVBQVU7OztZQUZGLDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBvZiwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWxheSwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQXBwZWFyYW5jZUFuaW1hdGlvbiwgRGlzYXBwZWFyYW5jZUFuaW1hdGlvbiB9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW51bXMnO1xuaW1wb3J0IHsgVGltZXIgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2dsb2JhbC1jbGFzc2VzJztcbmltcG9ydCB7IElCdXR0b24gfSBmcm9tICcuLi8uLi8uLi9jb3JlL2dsb2JhbC1pbnRlcmZhY2VzJztcblxuaW1wb3J0IHsgVG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcsIFRvYXN0Tm90aWZpY2F0aW9uRGVmYXVsdFJlc3BvbnNlIH0gZnJvbSAnLi9jbGFzc2VzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFdyYXBwZXJBYnN0cmFjdGlvbiBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIGZhZGVJbk91dEFuaW1hdGlvbjogc3RyaW5nID0gJ29wZW4nO1xuICB0aW1lclN0YXJ0ZWQkID0gbmV3IEJlaGF2aW9yU3ViamVjdCgnc3RhcnQtY291bnRlcicpO1xuICBzdWJzVG9DbG9zaW5nRGVsYXk6IFN1YnNjcmlwdGlvbjtcbiAgc3ViVGltZXI6IFN1YnNjcmlwdGlvbjtcbiAgaXNUaW1lclN0YXJ0ZWQgPSBmYWxzZTtcbiAgdGltZW91dDtcbiAgdGltZXI6IFRpbWVyID0gbmV3IFRpbWVyKCk7XG4gIGJveEFuaW1hdGlvbjogQXBwZWFyYW5jZUFuaW1hdGlvbiB8IERpc2FwcGVhcmFuY2VBbmltYXRpb247XG4gIHByaXZhdGUgY2xvc2VJc0NsaWNrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBhdXRvQ2xvc2luZ0hhc1N0YXJ0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwcm90ZWN0ZWQgY29uc3RydWN0b3IocHVibGljIHRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nOiBUb2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZykge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5ib3hBbmltYXRpb24gPSB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLlRvYXN0Q29yZUNvbmZpZy5BbmltYXRpb25JbjtcbiAgICB9LCAxKTtcbiAgfVxuXG4gIGdldCBhdXRvQ2xvc2VDb25kaXRpb24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuVG9hc3RDb3JlQ29uZmlnLkF1dG9DbG9zZURlbGF5ICYmXG4gICAgICAhKFxuICAgICAgICB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLkJ1dHRvbnMubGVuZ3RoIHx8XG4gICAgICAgIHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuVG9hc3RDb3JlQ29uZmlnLkRlY2xpbmVMYWJlbCB8fFxuICAgICAgICB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLlRvYXN0Q29yZUNvbmZpZy5Db25maXJtTGFiZWxcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgZ2V0IGJ1dHRvbnNFeGlzdCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgISF0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLkJ1dHRvbnMubGVuZ3RoIHx8XG4gICAgICAhIXRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuVG9hc3RDb3JlQ29uZmlnLkRlY2xpbmVMYWJlbCB8fFxuICAgICAgISF0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLlRvYXN0Q29yZUNvbmZpZy5Db25maXJtTGFiZWxcbiAgICApO1xuICB9XG5cbiAgbW91c2VPdmVyKCkge1xuICAgIGlmICghdGhpcy5idXR0b25zRXhpc3QgJiYgIXRoaXMuY2xvc2VJc0NsaWNrZWQgJiYgIXRoaXMuYXV0b0Nsb3NpbmdIYXNTdGFydGVkKSB7XG4gICAgICB0aGlzLnRpbWVyU3RhcnRlZCQubmV4dCgnc3RvcC1jb3VudGVyJyk7XG4gICAgICB0aGlzLmZhZGVJbk91dEFuaW1hdGlvbiA9ICdvcGVuJztcbiAgICAgIHRoaXMuc3Vic1RvQ2xvc2luZ0RlbGF5Py51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5ib3hBbmltYXRpb24gPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIG1vdXNlT3V0KCkge1xuICAgIGlmICghdGhpcy5idXR0b25zRXhpc3QgJiYgIXRoaXMuY2xvc2VJc0NsaWNrZWQgJiYgIXRoaXMuYXV0b0Nsb3NpbmdIYXNTdGFydGVkKSB7XG4gICAgICB0aGlzLnRpbWVyU3RhcnRlZCQubmV4dCgnc3RhcnQtY291bnRlcicpO1xuICAgIH1cbiAgfVxuXG4gIG9uT3ZlcmxheUNsaWNrZWQoZXZ0OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgLy8gIGNvbnNvbGUubG9nKCdvbk92ZXJsYXlDbGlja2VkJyk7XG4gIH1cblxuICBvblRvYXN0Q2xpY2tlZChldnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICAvLyBjb25zb2xlLmxvZygnb25PdmVybGF5Q2xpY2tlZCcpO1xuICB9XG5cbiAgc2V0UmVzcG9uc2UoX0lzU3VjY2VzczogYm9vbGVhbiwgX0NsaWNrZWRCdXR0b25JRD86IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gbmV3IFRvYXN0Tm90aWZpY2F0aW9uRGVmYXVsdFJlc3BvbnNlKCk7XG4gICAgaWYgKF9DbGlja2VkQnV0dG9uSUQpIHtcbiAgICAgIHJlc3BvbnNlLkNsaWNrZWRCdXR0b25JRCA9IF9DbGlja2VkQnV0dG9uSUQ7XG4gICAgfVxuXG4gICAgcmVzcG9uc2Uuc2V0U3VjY2VzcyhfSXNTdWNjZXNzKTtcbiAgICByZXNwb25zZS5zZXRCZWxvbmdpbmcodGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZyk7XG4gICAgdGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5FdmVudHNDb250cm9sbGVyLnNldERlZmF1bHRSZXNwb25zZShyZXNwb25zZSk7XG4gIH1cblxuICBvbkN1c3RvbUJ1dHRvbihfQnV0dG9uOiBJQnV0dG9uKTogdm9pZCB7XG4gICAgdGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5FdmVudHNDb250cm9sbGVyLm9uQnV0dG9uQ2xpY2soX0J1dHRvbik7XG4gICAgdGhpcy5zZXRSZXNwb25zZSh0cnVlLCBfQnV0dG9uLklEKTtcbiAgICB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLkV2ZW50c0NvbnRyb2xsZXIuY2xvc2UoKTtcbiAgfVxuXG4gIG9uQnV0dG9uQ2xpY2soX1R5cGU6ICdjb25maXJtJyB8ICdkZWNsaW5lJykge1xuICAgIGxldCBidXR0b25JRDtcbiAgICBpZiAoX1R5cGUgPT09ICdjb25maXJtJykge1xuICAgICAgYnV0dG9uSUQgPSB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLlRvYXN0Q29yZUNvbmZpZy5Db25maXJtTGFiZWwudG9Mb3dlckNhc2UoKTtcbiAgICB9IGVsc2UgaWYgKF9UeXBlID09PSAnZGVjbGluZScpIHtcbiAgICAgIGJ1dHRvbklEID0gdGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5Ub2FzdENvcmVDb25maWcuRGVjbGluZUxhYmVsLnRvTG93ZXJDYXNlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5zZXRSZXNwb25zZShfVHlwZSA9PT0gJ2NvbmZpcm0nLCBidXR0b25JRCk7XG4gICAgdGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5FdmVudHNDb250cm9sbGVyLmNsb3NlKCk7XG4gIH1cblxuICBhdXRvQ2xvc2UoKSB7XG4gICAgaWYgKHRoaXMuYXV0b0Nsb3NlQ29uZGl0aW9uKSB7XG4gICAgICB0aGlzLnRpbWVyLnNldE1pbGxpc2Vjb25kcyh0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLlRvYXN0Q29yZUNvbmZpZy5BdXRvQ2xvc2VEZWxheSk7XG4gICAgICB0aGlzLnN1YlRpbWVyID0gdGhpcy50aW1lclN0YXJ0ZWQkXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIHRhcChuZXh0ID0+IHtcbiAgICAgICAgICAgIGlmICgnc3RhcnQtY291bnRlcicgPT09IG5leHQpIHtcbiAgICAgICAgICAgICAgdGhpcy50aW1lci5zdGFydCgpO1xuICAgICAgICAgICAgICB0aGlzLmlzVGltZXJTdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdWJzVG9DbG9zaW5nRGVsYXkgPSB0aGlzLmNsb3NlUGFyZW50JCgpLnN1YnNjcmliZShyZXNwID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuRXZlbnRzQ29udHJvbGxlci5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9LCB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLlRvYXN0Q29yZUNvbmZpZy5BdXRvQ2xvc2VEZWxheSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCdzdG9wLWNvdW50ZXInID09PSBuZXh0KSB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLmlzVGltZXJTdGFydGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lci5zdG9wKCk7XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1RpbWVyU3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgY2xvc2VQYXJlbnQkKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgdGhpcy5hdXRvQ2xvc2luZ0hhc1N0YXJ0ZWQgPSB0cnVlO1xuICAgIHRoaXMuYm94QW5pbWF0aW9uID0gdGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5Ub2FzdENvcmVDb25maWcuQW5pbWF0aW9uT3V0O1xuICAgIGNvbnN0IGNsb3NlRHVyYXRpb24gPSB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLlRvYXN0Q29yZUNvbmZpZy5BbmltYXRpb25PdXQgPyA0MDAgOiAyMDA7XG4gICAgdGhpcy5mYWRlSW5PdXRBbmltYXRpb24gPSAnY2xvc2UtZmFzdCc7XG4gICAgcmV0dXJuIG9mKCcnKS5waXBlKGRlbGF5KGNsb3NlRHVyYXRpb24pKTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuRXZlbnRzQ29udHJvbGxlci5jbG9zZSgpO1xuICB9XG5cbiAgY2xvc2VJY29uKCk6IHZvaWQge1xuICAgIHRoaXMuY2xvc2VJc0NsaWNrZWQgPSB0cnVlO1xuICAgIHRoaXMuc3Vic1RvQ2xvc2luZ0RlbGF5Py51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuY2xvc2VQYXJlbnQkKCkuc3Vic2NyaWJlKHJlc3AgPT4ge1xuICAgICAgdGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5FdmVudHNDb250cm9sbGVyLmNsb3NlKCk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNUb0Nsb3NpbmdEZWxheT8udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLnN1YlRpbWVyPy51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=