import { Directive } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { GlobalClass } from '../../../core/global';
import { ToastNotificationClass } from './model';
export class WrapperAbstraction {
    constructor(toastNotificationBelonging) {
        this.toastNotificationBelonging = toastNotificationBelonging;
        this.fadeInOutAnimation = 'open';
        this.timerStarted$ = new BehaviorSubject('start-counter');
        this.isTimerStarted = false;
        this.timer = new GlobalClass.Timer();
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
        const response = new ToastNotificationClass.ToastNotificationDefaultResponse();
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
            this.subTimer = this.timerStarted$.pipe(tap((next) => {
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
            })).subscribe();
        }
    }
    autoCloseCondition() {
        return this.toastNotificationBelonging.ToastCoreConfig.AutoCloseDelay
            && !(this.toastNotificationBelonging.Buttons.length
                || this.toastNotificationBelonging.ToastCoreConfig.DeclineLabel
                || this.toastNotificationBelonging.ToastCoreConfig.ConfirmLabel);
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
    { type: Directive }
];
WrapperAbstraction.ctorParameters = () => [
    { type: ToastNotificationClass.ToastNotificationBelonging }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JhcHBlci1hYnN0cmFjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL25neC1hd2Vzb21lLXBvcHVwL3R5cGVzL3RvYXN0LW5vdGlmaWNhdGlvbi9jb3JlL3dyYXBwZXItYWJzdHJhY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFtQyxTQUFTLEVBQVksTUFBTSxlQUFlLENBQUM7QUFDckYsT0FBTyxFQUFDLGVBQWUsRUFBYyxFQUFFLEVBQWUsTUFBTSxNQUFNLENBQUM7QUFDbkUsT0FBTyxFQUFDLEtBQUssRUFBRSxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMxQyxPQUFPLEVBQUMsV0FBVyxFQUFrQixNQUFNLHNCQUFzQixDQUFDO0FBQ2xFLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUcvQyxNQUFNLE9BQWdCLGtCQUFrQjtJQVV2QyxZQUNRLDBCQUE2RTtRQUE3RSwrQkFBMEIsR0FBMUIsMEJBQTBCLENBQW1EO1FBVHJGLHVCQUFrQixHQUFXLE1BQU0sQ0FBQztRQUNwQyxrQkFBYSxHQUFnQixJQUFJLGVBQWUsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUdsRSxtQkFBYyxHQUFlLEtBQUssQ0FBQztRQUVuQyxVQUFLLEdBQXNCLElBQUksV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBS25ELENBQUM7SUFFRCxTQUFTOztRQUNSLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxNQUFNLENBQUM7UUFDakMsTUFBQSxJQUFJLENBQUMsa0JBQWtCLDBDQUFFLFdBQVcsR0FBRztJQUN4QyxDQUFDO0lBRUQsUUFBUTtRQUNQLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFJRCxnQkFBZ0IsQ0FBQyxHQUFlO1FBQy9CLG9DQUFvQztJQUNwQyxDQUFDO0lBR0YsY0FBYyxDQUFDLEdBQWU7UUFDNUIsbUNBQW1DO0lBQ3JDLENBQUM7SUFDRCxXQUFXLENBQUMsVUFBbUIsRUFBRSxnQkFBeUI7UUFDekQsTUFBTSxRQUFRLEdBQUcsSUFBSSxzQkFBc0IsQ0FBQyxnQ0FBZ0MsRUFBRSxDQUFDO1FBQy9FLElBQUksZ0JBQWdCLEVBQUU7WUFDckIsUUFBUSxDQUFDLGVBQWUsR0FBRyxnQkFBZ0IsQ0FBQztTQUM1QztRQUVELFFBQVEsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDaEMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsMEJBQTBCLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQUVELGNBQWMsQ0FBQyxPQUFnQztRQUM5QyxJQUFJLENBQUMsMEJBQTBCLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDMUQsQ0FBQztJQUVELGFBQWEsQ0FBQyxLQUE0QjtRQUV6QyxJQUFJLFFBQVEsQ0FBQztRQUNiLElBQUcsS0FBSyxLQUFLLFNBQVMsRUFBQztZQUN0QixRQUFRLEdBQUcsSUFBSSxDQUFDLDBCQUEwQixDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDdEY7YUFBSyxJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUM7WUFDN0IsUUFBUSxHQUFHLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3RGO1FBRUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQywwQkFBMEIsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUMxRCxDQUFDO0lBRUQsU0FBUztRQUNSLElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFLEVBQUU7WUFDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsQ0FBQTtZQUMxRixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUN0QyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDWixJQUFJLGVBQWUsS0FBSyxJQUFJLEVBQUU7b0JBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBQ25CLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO29CQUMzQixJQUFJLENBQUMsT0FBTyxHQUFZLFVBQVUsQ0FBQyxHQUFHLEVBQUU7d0JBQ3ZDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRTs0QkFDMUUsSUFBSSxDQUFDLDBCQUEwQixDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxDQUFDO3dCQUMxRCxDQUFDLENBQUMsQ0FBQztvQkFDSixDQUFDLEVBQUUsSUFBSSxDQUFDLDBCQUEwQixDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsQ0FBQztpQkFDbkU7cUJBQU0sSUFBSSxjQUFjLEtBQUssSUFBSSxFQUFFO29CQUNuQyxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7d0JBQ3hCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7d0JBQ2xCLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQzNCLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO3FCQUM1QjtpQkFDRDtZQUNGLENBQUMsQ0FBQyxDQUNGLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDZDtJQUNGLENBQUM7SUFFRCxrQkFBa0I7UUFDakIsT0FBTyxJQUFJLENBQUMsMEJBQTBCLENBQUMsZUFBZSxDQUFDLGNBQWM7ZUFDakUsQ0FBQyxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxPQUFPLENBQUMsTUFBTTttQkFDL0MsSUFBSSxDQUFDLDBCQUEwQixDQUFDLGVBQWUsQ0FBQyxZQUFZO21CQUM1RCxJQUFJLENBQUMsMEJBQTBCLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFRCxZQUFZLENBQUMsaUJBQXlCO1FBQ3JDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxpQkFBaUIsQ0FBQztRQUM1QyxNQUFNLEtBQUssR0FBZSxpQkFBaUIsS0FBSyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQzFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsS0FBSztRQUVKLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUMxRCxDQUFDO0lBRUQsV0FBVzs7UUFDVixNQUFBLElBQUksQ0FBQyxrQkFBa0IsMENBQUUsV0FBVyxHQUFHO1FBQ3ZDLE1BQUEsSUFBSSxDQUFDLFFBQVEsMENBQUUsV0FBVyxHQUFHO0lBQzlCLENBQUM7OztZQWhIRCxTQUFTOzs7WUFGRixzQkFBc0IsQ0FjOEIsMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBZnRlclZpZXdJbml0LCBDaGFuZ2VEZXRlY3RvclJlZiwgRGlyZWN0aXZlLCBPbkRlc3Ryb3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIG9mLCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtkZWxheSwgdGFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge0dsb2JhbENsYXNzLCBHbG9iYWxJbnRlcmZhY2V9IGZyb20gJy4uLy4uLy4uL2NvcmUvZ2xvYmFsJztcbmltcG9ydCB7VG9hc3ROb3RpZmljYXRpb25DbGFzc30gZnJvbSAnLi9tb2RlbCc7XG5cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFdyYXBwZXJBYnN0cmFjdGlvbiBpbXBsZW1lbnRzICBPbkRlc3Ryb3kge1xuXG5cdGZhZGVJbk91dEFuaW1hdGlvbjogc3RyaW5nID0gJ29wZW4nO1xuXHR0aW1lclN0YXJ0ZWQkICAgICAgICAgICAgICA9IG5ldyBCZWhhdmlvclN1YmplY3QoJ3N0YXJ0LWNvdW50ZXInKTtcblx0c3Vic1RvQ2xvc2luZ0RlbGF5OiBTdWJzY3JpcHRpb247XG5cdHN1YlRpbWVyOiBTdWJzY3JpcHRpb247XG5cdGlzVGltZXJTdGFydGVkICAgICAgICAgICAgID0gZmFsc2U7XG5cdHRpbWVvdXQ7XG5cdHRpbWVyOiBHbG9iYWxDbGFzcy5UaW1lciA9IG5ldyBHbG9iYWxDbGFzcy5UaW1lcigpO1xuXG5cdHByb3RlY3RlZCBjb25zdHJ1Y3Rvcihcblx0XHRwdWJsaWMgdG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmc6IFRvYXN0Tm90aWZpY2F0aW9uQ2xhc3MuVG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmdcblx0KSB7XG5cdH1cblxuXHRtb3VzZU92ZXIoKSB7XG5cdFx0dGhpcy50aW1lclN0YXJ0ZWQkLm5leHQoJ3N0b3AtY291bnRlcicpO1xuXHRcdHRoaXMuZmFkZUluT3V0QW5pbWF0aW9uID0gJ29wZW4nO1xuXHRcdHRoaXMuc3Vic1RvQ2xvc2luZ0RlbGF5Py51bnN1YnNjcmliZSgpO1xuXHR9XG5cblx0bW91c2VPdXQoKSB7XG5cdFx0dGhpcy50aW1lclN0YXJ0ZWQkLm5leHQoJ3N0YXJ0LWNvdW50ZXInKTtcblx0fVxuXG5cblxuXHRvbk92ZXJsYXlDbGlja2VkKGV2dDogTW91c2VFdmVudCk6IHZvaWQge1xuXHRcdC8vICBjb25zb2xlLmxvZygnb25PdmVybGF5Q2xpY2tlZCcpO1xuXHRcdH1cblxuXG5cdG9uVG9hc3RDbGlja2VkKGV2dDogTW91c2VFdmVudCk6IHZvaWQge1xuXHRcdCAvLyBjb25zb2xlLmxvZygnb25PdmVybGF5Q2xpY2tlZCcpO1xuXHR9XG5cdHNldFJlc3BvbnNlKF9Jc1N1Y2Nlc3M6IGJvb2xlYW4sIF9DbGlja2VkQnV0dG9uSUQ/OiBzdHJpbmcpOiB2b2lkIHtcblx0XHRjb25zdCByZXNwb25zZSA9IG5ldyBUb2FzdE5vdGlmaWNhdGlvbkNsYXNzLlRvYXN0Tm90aWZpY2F0aW9uRGVmYXVsdFJlc3BvbnNlKCk7XG5cdFx0aWYgKF9DbGlja2VkQnV0dG9uSUQpIHtcblx0XHRcdHJlc3BvbnNlLkNsaWNrZWRCdXR0b25JRCA9IF9DbGlja2VkQnV0dG9uSUQ7XG5cdFx0fVxuXG5cdFx0cmVzcG9uc2Uuc2V0U3VjY2VzcyhfSXNTdWNjZXNzKTtcblx0XHRyZXNwb25zZS5zZXRCZWxvbmdpbmcodGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZyk7XG5cdFx0dGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5FdmVudHNDb250cm9sbGVyLnNldERlZmF1bHRSZXNwb25zZShyZXNwb25zZSk7XG5cdH1cblxuXHRvbkN1c3RvbUJ1dHRvbihfQnV0dG9uOiBHbG9iYWxJbnRlcmZhY2UuSUJ1dHRvbik6IHZvaWQge1xuXHRcdHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuRXZlbnRzQ29udHJvbGxlci5vbkJ1dHRvbkNsaWNrKF9CdXR0b24pO1xuXHRcdHRoaXMuc2V0UmVzcG9uc2UodHJ1ZSwgX0J1dHRvbi5JRCk7XG5cdFx0dGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5FdmVudHNDb250cm9sbGVyLmNsb3NlKCk7XG5cdH1cblxuXHRvbkJ1dHRvbkNsaWNrKF9UeXBlOiAnY29uZmlybScgfCAnZGVjbGluZScpIHtcblxuXHRcdGxldCBidXR0b25JRDtcblx0XHRpZihfVHlwZSA9PT0gJ2NvbmZpcm0nKXtcblx0XHRcdGJ1dHRvbklEID0gdGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5Ub2FzdENvcmVDb25maWcuQ29uZmlybUxhYmVsLnRvTG93ZXJDYXNlKCk7XG5cdFx0fWVsc2UgaWYgKF9UeXBlID09PSAnZGVjbGluZScpe1xuXHRcdFx0YnV0dG9uSUQgPSB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLlRvYXN0Q29yZUNvbmZpZy5EZWNsaW5lTGFiZWwudG9Mb3dlckNhc2UoKTtcblx0XHR9XG5cblx0XHR0aGlzLnNldFJlc3BvbnNlKF9UeXBlID09PSAnY29uZmlybScsIGJ1dHRvbklEKTtcblx0XHR0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLkV2ZW50c0NvbnRyb2xsZXIuY2xvc2UoKTtcblx0fVxuXG5cdGF1dG9DbG9zZSgpIHtcblx0XHRpZiAodGhpcy5hdXRvQ2xvc2VDb25kaXRpb24oKSkge1xuXHRcdFx0dGhpcy50aW1lci5zZXRNaWxsaXNlY29uZHModGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5Ub2FzdENvcmVDb25maWcuQXV0b0Nsb3NlRGVsYXkpXG5cdFx0XHR0aGlzLnN1YlRpbWVyID0gdGhpcy50aW1lclN0YXJ0ZWQkLnBpcGUoXG5cdFx0XHRcdHRhcCgobmV4dCkgPT4ge1xuXHRcdFx0XHRcdGlmICgnc3RhcnQtY291bnRlcicgPT09IG5leHQpIHtcblx0XHRcdFx0XHRcdHRoaXMudGltZXIuc3RhcnQoKTtcblx0XHRcdFx0XHRcdHRoaXMuaXNUaW1lclN0YXJ0ZWQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0dGhpcy50aW1lb3V0ICAgICAgICAgID0gc2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuc3Vic1RvQ2xvc2luZ0RlbGF5ID0gdGhpcy5jbG9zZVBhcmVudCQoJ2Nsb3NlLXNsb3cnKS5zdWJzY3JpYmUocmVzcCA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5FdmVudHNDb250cm9sbGVyLmNsb3NlKCk7XG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0fSwgdGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5Ub2FzdENvcmVDb25maWcuQXV0b0Nsb3NlRGVsYXkpO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAoJ3N0b3AtY291bnRlcicgPT09IG5leHQpIHtcblx0XHRcdFx0XHRcdGlmICh0aGlzLmlzVGltZXJTdGFydGVkKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMudGltZXIuc3RvcCgpO1xuXHRcdFx0XHRcdFx0XHRjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcblx0XHRcdFx0XHRcdFx0dGhpcy5pc1RpbWVyU3RhcnRlZCA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSlcblx0XHRcdCkuc3Vic2NyaWJlKCk7XG5cdFx0fVxuXHR9XG5cblx0YXV0b0Nsb3NlQ29uZGl0aW9uKCk6IGJvb2xlYW4ge1xuXHRcdHJldHVybiB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLlRvYXN0Q29yZUNvbmZpZy5BdXRvQ2xvc2VEZWxheVxuXHRcdFx0JiYgISh0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLkJ1dHRvbnMubGVuZ3RoXG5cdFx0XHRcdHx8IHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuVG9hc3RDb3JlQ29uZmlnLkRlY2xpbmVMYWJlbFxuXHRcdFx0XHR8fCB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLlRvYXN0Q29yZUNvbmZpZy5Db25maXJtTGFiZWwpO1xuXHR9XG5cblx0Y2xvc2VQYXJlbnQkKF9DbG9zaW5nQW5pbWF0aW9uOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuXHRcdHRoaXMuZmFkZUluT3V0QW5pbWF0aW9uID0gX0Nsb3NpbmdBbmltYXRpb247XG5cdFx0Y29uc3QgdGltZXIgICAgICAgICAgICAgPSBfQ2xvc2luZ0FuaW1hdGlvbiA9PT0gJ2Nsb3NlLXNsb3cnID8gMTQwMCA6IDE1MDtcblx0XHRyZXR1cm4gb2YoJycpLnBpcGUoZGVsYXkodGltZXIpKTtcblx0fVxuXG5cdGNsb3NlKCkge1xuXG5cdFx0dGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5FdmVudHNDb250cm9sbGVyLmNsb3NlKCk7XG5cdH1cblxuXHRuZ09uRGVzdHJveSgpIHtcblx0XHR0aGlzLnN1YnNUb0Nsb3NpbmdEZWxheT8udW5zdWJzY3JpYmUoKTtcblx0XHR0aGlzLnN1YlRpbWVyPy51bnN1YnNjcmliZSgpO1xuXHR9XG5cbn1cbiJdfQ==