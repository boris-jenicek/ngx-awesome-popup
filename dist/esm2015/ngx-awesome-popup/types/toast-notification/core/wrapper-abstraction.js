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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JhcHBlci1hYnN0cmFjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL25neC1hd2Vzb21lLXBvcHVwL3R5cGVzL3RvYXN0LW5vdGlmaWNhdGlvbi9jb3JlL3dyYXBwZXItYWJzdHJhY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUMsZUFBZSxFQUFjLEVBQUUsRUFBZSxNQUFNLE1BQU0sQ0FBQztBQUNuRSxPQUFPLEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzFDLE9BQU8sRUFBQyxXQUFXLEVBQWtCLE1BQU0sc0JBQXNCLENBQUM7QUFDbEUsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sU0FBUyxDQUFDO0FBRy9DLE1BQU0sT0FBZ0Isa0JBQWtCO0lBVXZDLFlBQ1EsMEJBQTZFO1FBQTdFLCtCQUEwQixHQUExQiwwQkFBMEIsQ0FBbUQ7UUFUckYsdUJBQWtCLEdBQVcsTUFBTSxDQUFDO1FBQ3BDLGtCQUFhLEdBQWdCLElBQUksZUFBZSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBR2xFLG1CQUFjLEdBQWUsS0FBSyxDQUFDO1FBRW5DLFVBQUssR0FBd0IsSUFBSSxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7SUFLckQsQ0FBQztJQUVELFNBQVM7O1FBQ1IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLE1BQU0sQ0FBQztRQUNqQyxNQUFBLElBQUksQ0FBQyxrQkFBa0IsMENBQUUsV0FBVyxHQUFHO0lBQ3hDLENBQUM7SUFFRCxRQUFRO1FBQ1AsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUdELGdCQUFnQixDQUFDLEdBQWU7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O1lBQ0YsQ0FBQyxDQUFDLENBQ0YsQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUNkO0lBQ0YsQ0FBQztJQUVELGtCQUFrQjtRQUNqQixPQUFPLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxlQUFlLENBQUMsY0FBYztlQUNqRSxDQUFDLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLE9BQU8sQ0FBQyxNQUFNO21CQUMvQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsZUFBZSxDQUFDLFlBQVk7bUJBQzVELElBQUksQ0FBQywwQkFBMEIsQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVELFlBQVksQ0FBQyxpQkFBeUI7UUFDckMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLGlCQUFpQixDQUFDO1FBQzVDLE1BQU0sS0FBSyxHQUFlLGlCQUFpQixLQUFLLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDMUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRCxLQUFLO1FBRUosSUFBSSxDQUFDLDBCQUEwQixDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzFELENBQUM7SUFFRCxXQUFXOztRQUNWLE1BQUEsSUFBSSxDQUFDLGtCQUFrQiwwQ0FBRSxXQUFXLEdBQUc7UUFDdkMsTUFBQSxJQUFJLENBQUMsUUFBUSwwQ0FBRSxXQUFXLEdBQUc7SUFDOUIsQ0FBQzs7O1lBaEhELFNBQVM7OztZQUZGLHNCQUFzQixDQWM4QiwwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RpcmVjdGl2ZSwgT25EZXN0cm95fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBvZiwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZGVsYXksIHRhcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtHbG9iYWxDbGFzcywgR2xvYmFsSW50ZXJmYWNlfSBmcm9tICcuLi8uLi8uLi9jb3JlL2dsb2JhbCc7XG5pbXBvcnQge1RvYXN0Tm90aWZpY2F0aW9uQ2xhc3N9IGZyb20gJy4vbW9kZWwnO1xuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBXcmFwcGVyQWJzdHJhY3Rpb24gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG5cdGZhZGVJbk91dEFuaW1hdGlvbjogc3RyaW5nID0gJ29wZW4nO1xuXHR0aW1lclN0YXJ0ZWQkICAgICAgICAgICAgICA9IG5ldyBCZWhhdmlvclN1YmplY3QoJ3N0YXJ0LWNvdW50ZXInKTtcblx0c3Vic1RvQ2xvc2luZ0RlbGF5OiBTdWJzY3JpcHRpb247XG5cdHN1YlRpbWVyOiBTdWJzY3JpcHRpb247XG5cdGlzVGltZXJTdGFydGVkICAgICAgICAgICAgID0gZmFsc2U7XG5cdHRpbWVvdXQ7XG5cdHRpbWVyOiBHbG9iYWxDbGFzcy5UaW1lciAgID0gbmV3IEdsb2JhbENsYXNzLlRpbWVyKCk7XG5cblx0cHJvdGVjdGVkIGNvbnN0cnVjdG9yKFxuXHRcdHB1YmxpYyB0b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZzogVG9hc3ROb3RpZmljYXRpb25DbGFzcy5Ub2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZ1xuXHQpIHtcblx0fVxuXG5cdG1vdXNlT3ZlcigpIHtcblx0XHR0aGlzLnRpbWVyU3RhcnRlZCQubmV4dCgnc3RvcC1jb3VudGVyJyk7XG5cdFx0dGhpcy5mYWRlSW5PdXRBbmltYXRpb24gPSAnb3Blbic7XG5cdFx0dGhpcy5zdWJzVG9DbG9zaW5nRGVsYXk/LnVuc3Vic2NyaWJlKCk7XG5cdH1cblxuXHRtb3VzZU91dCgpIHtcblx0XHR0aGlzLnRpbWVyU3RhcnRlZCQubmV4dCgnc3RhcnQtY291bnRlcicpO1xuXHR9XG5cblxuXHRvbk92ZXJsYXlDbGlja2VkKGV2dDogTW91c2VFdmVudCk6IHZvaWQge1xuXHRcdC8vICBjb25zb2xlLmxvZygnb25PdmVybGF5Q2xpY2tlZCcpO1xuXHR9XG5cblxuXHRvblRvYXN0Q2xpY2tlZChldnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcblx0XHQvLyBjb25zb2xlLmxvZygnb25PdmVybGF5Q2xpY2tlZCcpO1xuXHR9XG5cblx0c2V0UmVzcG9uc2UoX0lzU3VjY2VzczogYm9vbGVhbiwgX0NsaWNrZWRCdXR0b25JRD86IHN0cmluZyk6IHZvaWQge1xuXHRcdGNvbnN0IHJlc3BvbnNlID0gbmV3IFRvYXN0Tm90aWZpY2F0aW9uQ2xhc3MuVG9hc3ROb3RpZmljYXRpb25EZWZhdWx0UmVzcG9uc2UoKTtcblx0XHRpZiAoX0NsaWNrZWRCdXR0b25JRCkge1xuXHRcdFx0cmVzcG9uc2UuQ2xpY2tlZEJ1dHRvbklEID0gX0NsaWNrZWRCdXR0b25JRDtcblx0XHR9XG5cblx0XHRyZXNwb25zZS5zZXRTdWNjZXNzKF9Jc1N1Y2Nlc3MpO1xuXHRcdHJlc3BvbnNlLnNldEJlbG9uZ2luZyh0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nKTtcblx0XHR0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLkV2ZW50c0NvbnRyb2xsZXIuc2V0RGVmYXVsdFJlc3BvbnNlKHJlc3BvbnNlKTtcblx0fVxuXG5cdG9uQ3VzdG9tQnV0dG9uKF9CdXR0b246IEdsb2JhbEludGVyZmFjZS5JQnV0dG9uKTogdm9pZCB7XG5cdFx0dGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5FdmVudHNDb250cm9sbGVyLm9uQnV0dG9uQ2xpY2soX0J1dHRvbik7XG5cdFx0dGhpcy5zZXRSZXNwb25zZSh0cnVlLCBfQnV0dG9uLklEKTtcblx0XHR0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLkV2ZW50c0NvbnRyb2xsZXIuY2xvc2UoKTtcblx0fVxuXG5cdG9uQnV0dG9uQ2xpY2soX1R5cGU6ICdjb25maXJtJyB8ICdkZWNsaW5lJykge1xuXG5cdFx0bGV0IGJ1dHRvbklEO1xuXHRcdGlmIChfVHlwZSA9PT0gJ2NvbmZpcm0nKSB7XG5cdFx0XHRidXR0b25JRCA9IHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuVG9hc3RDb3JlQ29uZmlnLkNvbmZpcm1MYWJlbC50b0xvd2VyQ2FzZSgpO1xuXHRcdH0gZWxzZSBpZiAoX1R5cGUgPT09ICdkZWNsaW5lJykge1xuXHRcdFx0YnV0dG9uSUQgPSB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLlRvYXN0Q29yZUNvbmZpZy5EZWNsaW5lTGFiZWwudG9Mb3dlckNhc2UoKTtcblx0XHR9XG5cblx0XHR0aGlzLnNldFJlc3BvbnNlKF9UeXBlID09PSAnY29uZmlybScsIGJ1dHRvbklEKTtcblx0XHR0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLkV2ZW50c0NvbnRyb2xsZXIuY2xvc2UoKTtcblx0fVxuXG5cdGF1dG9DbG9zZSgpIHtcblx0XHRpZiAodGhpcy5hdXRvQ2xvc2VDb25kaXRpb24oKSkge1xuXHRcdFx0dGhpcy50aW1lci5zZXRNaWxsaXNlY29uZHModGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5Ub2FzdENvcmVDb25maWcuQXV0b0Nsb3NlRGVsYXkpO1xuXHRcdFx0dGhpcy5zdWJUaW1lciA9IHRoaXMudGltZXJTdGFydGVkJC5waXBlKFxuXHRcdFx0XHR0YXAoKG5leHQpID0+IHtcblx0XHRcdFx0XHRpZiAoJ3N0YXJ0LWNvdW50ZXInID09PSBuZXh0KSB7XG5cdFx0XHRcdFx0XHR0aGlzLnRpbWVyLnN0YXJ0KCk7XG5cdFx0XHRcdFx0XHR0aGlzLmlzVGltZXJTdGFydGVkID0gdHJ1ZTtcblx0XHRcdFx0XHRcdHRoaXMudGltZW91dCAgICAgICAgPSBzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdFx0XHRcdFx0dGhpcy5zdWJzVG9DbG9zaW5nRGVsYXkgPSB0aGlzLmNsb3NlUGFyZW50JCgnY2xvc2Utc2xvdycpLnN1YnNjcmliZShyZXNwID0+IHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLkV2ZW50c0NvbnRyb2xsZXIuY2xvc2UoKTtcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9LCB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLlRvYXN0Q29yZUNvbmZpZy5BdXRvQ2xvc2VEZWxheSk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmICgnc3RvcC1jb3VudGVyJyA9PT0gbmV4dCkge1xuXHRcdFx0XHRcdFx0aWYgKHRoaXMuaXNUaW1lclN0YXJ0ZWQpIHtcblx0XHRcdFx0XHRcdFx0dGhpcy50aW1lci5zdG9wKCk7XG5cdFx0XHRcdFx0XHRcdGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuXHRcdFx0XHRcdFx0XHR0aGlzLmlzVGltZXJTdGFydGVkID0gZmFsc2U7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxuXHRcdFx0KS5zdWJzY3JpYmUoKTtcblx0XHR9XG5cdH1cblxuXHRhdXRvQ2xvc2VDb25kaXRpb24oKTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuIHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuVG9hc3RDb3JlQ29uZmlnLkF1dG9DbG9zZURlbGF5XG5cdFx0XHQmJiAhKHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuQnV0dG9ucy5sZW5ndGhcblx0XHRcdFx0fHwgdGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5Ub2FzdENvcmVDb25maWcuRGVjbGluZUxhYmVsXG5cdFx0XHRcdHx8IHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuVG9hc3RDb3JlQ29uZmlnLkNvbmZpcm1MYWJlbCk7XG5cdH1cblxuXHRjbG9zZVBhcmVudCQoX0Nsb3NpbmdBbmltYXRpb246IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG5cdFx0dGhpcy5mYWRlSW5PdXRBbmltYXRpb24gPSBfQ2xvc2luZ0FuaW1hdGlvbjtcblx0XHRjb25zdCB0aW1lciAgICAgICAgICAgICA9IF9DbG9zaW5nQW5pbWF0aW9uID09PSAnY2xvc2Utc2xvdycgPyAxNDAwIDogMTUwO1xuXHRcdHJldHVybiBvZignJykucGlwZShkZWxheSh0aW1lcikpO1xuXHR9XG5cblx0Y2xvc2UoKSB7XG5cblx0XHR0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLkV2ZW50c0NvbnRyb2xsZXIuY2xvc2UoKTtcblx0fVxuXG5cdG5nT25EZXN0cm95KCkge1xuXHRcdHRoaXMuc3Vic1RvQ2xvc2luZ0RlbGF5Py51bnN1YnNjcmliZSgpO1xuXHRcdHRoaXMuc3ViVGltZXI/LnVuc3Vic2NyaWJlKCk7XG5cdH1cblxufVxuIl19