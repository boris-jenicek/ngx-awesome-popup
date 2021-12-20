import { Directive, ViewChild, ViewChildren } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { delay, take, tap } from 'rxjs/operators';
import { Timer } from '../../../core/global-classes';
import { ToastNotificationBelonging, ToastNotificationDefaultResponse } from './classes';
export class WrapperAbstraction {
    constructor(toastNotificationBelonging) {
        this.toastNotificationBelonging = toastNotificationBelonging;
        this.closeIsClicked = false;
        this.autoClosingHasStarted = false;
        this.fadeInOutAnimation = 'open';
        this.timerStarted$ = new BehaviorSubject('start-counter');
        this.isTimerStarted = false;
        this.timer = new Timer();
        setTimeout(() => {
            this.boxAnimation = this.toastNotificationBelonging.toastCoreConfig.animationIn;
        }, 1);
    }
    get autoCloseCondition() {
        return (this.toastNotificationBelonging.toastCoreConfig.autoCloseDelay &&
            !(this.toastNotificationBelonging.buttons.length ||
                this.toastNotificationBelonging.toastCoreConfig.declineLabel ||
                this.toastNotificationBelonging.toastCoreConfig.confirmLabel));
    }
    get buttonsExist() {
        return (!!this.toastNotificationBelonging.buttons.length ||
            !!this.toastNotificationBelonging.toastCoreConfig.declineLabel ||
            !!this.toastNotificationBelonging.toastCoreConfig.confirmLabel);
    }
    setCustomStyles() {
        if (this.toastNotificationBelonging.toastCoreConfig.customStyles.textCSS && this.elTextWrapper) {
            this.elTextWrapper.nativeElement.style.cssText +=
                this.toastNotificationBelonging.toastCoreConfig.customStyles.textCSS;
        }
        if (this.toastNotificationBelonging.toastCoreConfig.customStyles.titleCSS && this.elTitleWrapper) {
            this.elTitleWrapper.nativeElement.style.cssText +=
                this.toastNotificationBelonging.toastCoreConfig.customStyles.titleCSS;
        }
        if (this.toastNotificationBelonging.toastCoreConfig.customStyles.buttonSectionCSS && this.elButtonWrapper) {
            this.elButtonWrapper.nativeElement.style.cssText +=
                this.toastNotificationBelonging.toastCoreConfig.customStyles.buttonSectionCSS;
        }
        if (this.toastNotificationBelonging.toastCoreConfig.customStyles.buttonCSS && this.elButton) {
            this.elButton.forEach(el => {
                el.nativeElement.style.cssText += this.toastNotificationBelonging.toastCoreConfig.customStyles.buttonCSS;
            });
        }
    }
    mouseOver() {
        var _a;
        if (!this.buttonsExist && !this.closeIsClicked && !this.autoClosingHasStarted) {
            this.timerStarted$.next('stop-counter');
            this.fadeInOutAnimation = 'open';
            (_a = this.subsToClosingDelay) === null || _a === void 0 ? void 0 : _a.unsubscribe();
            this.boxAnimation = 'reset';
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
            response.clickedButtonID = _ClickedButtonID;
        }
        response.setSuccess(_IsSuccess);
        response.setBelonging(this.toastNotificationBelonging);
        this.toastNotificationBelonging.eventsController.setDefaultResponse(response);
    }
    onCustomButton(_Button) {
        this.toastNotificationBelonging.eventsController.onButtonClick(_Button);
        this.setResponse(true, _Button.ID);
        this.toastNotificationBelonging.eventsController.close();
    }
    onButtonClick(_Type) {
        let buttonID;
        if (_Type === 'confirm') {
            buttonID = this.toastNotificationBelonging.toastCoreConfig.confirmLabel.toLowerCase();
        }
        else if (_Type === 'decline') {
            buttonID = this.toastNotificationBelonging.toastCoreConfig.declineLabel.toLowerCase();
        }
        this.setResponse(_Type === 'confirm', buttonID);
        this.toastNotificationBelonging.eventsController.close();
    }
    autoClose() {
        if (this.autoCloseCondition) {
            this.timer.setMilliseconds(this.toastNotificationBelonging.toastCoreConfig.autoCloseDelay);
            this.subTimer = this.timerStarted$
                .pipe(tap(next => {
                if ('start-counter' === next) {
                    this.timer.start();
                    this.isTimerStarted = true;
                    this.timeout = setTimeout(() => {
                        this.subsToClosingDelay = this.closeParent$().subscribe(resp => {
                            this.toastNotificationBelonging.eventsController.close();
                        });
                    }, this.toastNotificationBelonging.toastCoreConfig.autoCloseDelay);
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
        this.boxAnimation = this.toastNotificationBelonging.toastCoreConfig.animationOut;
        const closeDuration = this.toastNotificationBelonging.toastCoreConfig.animationOut ? 400 : 200;
        this.fadeInOutAnimation = 'close-fast';
        return of('').pipe(delay(closeDuration));
    }
    close() {
        this.toastNotificationBelonging.eventsController.close();
    }
    closeIcon() {
        var _a;
        this.closeIsClicked = true;
        (_a = this.subsToClosingDelay) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        this.closeParent$()
            .pipe(take(1))
            .subscribe(resp => {
            this.toastNotificationBelonging.eventsController.close();
        });
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
    { type: ToastNotificationBelonging }
];
WrapperAbstraction.propDecorators = {
    elTextWrapper: [{ type: ViewChild, args: ['elTextWrapper',] }],
    elTitleWrapper: [{ type: ViewChild, args: ['elTitleWrapper',] }],
    elButtonWrapper: [{ type: ViewChild, args: ['elButtonWrapper',] }],
    elButton: [{ type: ViewChildren, args: ['elButton',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JhcHBlci1hYnN0cmFjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL25neC1hd2Vzb21lLXBvcHVwL3R5cGVzL3RvYXN0LW5vdGlmaWNhdGlvbi9jb3JlL3dyYXBwZXItYWJzdHJhY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBb0MsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRyxPQUFPLEVBQUUsZUFBZSxFQUFjLEVBQUUsRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDckUsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFbEQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBR3JELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUd6RixNQUFNLE9BQWdCLGtCQUFrQjtJQWdCdEMsWUFBNkIsMEJBQXNEO1FBQXRELCtCQUEwQixHQUExQiwwQkFBMEIsQ0FBNEI7UUFmM0UsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFDdkIsMEJBQXFCLEdBQUcsS0FBSyxDQUFDO1FBS3RDLHVCQUFrQixHQUFHLE1BQU0sQ0FBQztRQUM1QixrQkFBYSxHQUFHLElBQUksZUFBZSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBR3JELG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBRXZCLFVBQUssR0FBVSxJQUFJLEtBQUssRUFBRSxDQUFDO1FBSXpCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDO1FBQ2xGLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNSLENBQUM7SUFFRCxJQUFJLGtCQUFrQjtRQUNwQixPQUFPLENBQ0wsSUFB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LFlBQVksU0FBQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBPbkRlc3Ryb3ksIFF1ZXJ5TGlzdCwgVmlld0NoaWxkLCBWaWV3Q2hpbGRyZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSwgb2YsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVsYXksIHRha2UsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEFwcGVhcmFuY2VBbmltYXRpb24sIERpc2FwcGVhcmFuY2VBbmltYXRpb24gfSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudW1zJztcbmltcG9ydCB7IFRpbWVyIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9nbG9iYWwtY2xhc3Nlcyc7XG5pbXBvcnQgeyBJQnV0dG9uIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9nbG9iYWwtaW50ZXJmYWNlcyc7XG5cbmltcG9ydCB7IFRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLCBUb2FzdE5vdGlmaWNhdGlvbkRlZmF1bHRSZXNwb25zZSB9IGZyb20gJy4vY2xhc3Nlcyc7XG5cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFdyYXBwZXJBYnN0cmFjdGlvbiBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgY2xvc2VJc0NsaWNrZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBhdXRvQ2xvc2luZ0hhc1N0YXJ0ZWQgPSBmYWxzZTtcbiAgQFZpZXdDaGlsZCgnZWxUZXh0V3JhcHBlcicpIGVsVGV4dFdyYXBwZXI6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ2VsVGl0bGVXcmFwcGVyJykgZWxUaXRsZVdyYXBwZXI6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ2VsQnV0dG9uV3JhcHBlcicpIGVsQnV0dG9uV3JhcHBlcjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZHJlbignZWxCdXR0b24nKSBlbEJ1dHRvbjogUXVlcnlMaXN0PEVsZW1lbnRSZWY+O1xuICBmYWRlSW5PdXRBbmltYXRpb24gPSAnb3Blbic7XG4gIHRpbWVyU3RhcnRlZCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KCdzdGFydC1jb3VudGVyJyk7XG4gIHN1YnNUb0Nsb3NpbmdEZWxheTogU3Vic2NyaXB0aW9uO1xuICBzdWJUaW1lcjogU3Vic2NyaXB0aW9uO1xuICBpc1RpbWVyU3RhcnRlZCA9IGZhbHNlO1xuICB0aW1lb3V0O1xuICB0aW1lcjogVGltZXIgPSBuZXcgVGltZXIoKTtcbiAgYm94QW5pbWF0aW9uOiBBcHBlYXJhbmNlQW5pbWF0aW9uIHwgRGlzYXBwZWFyYW5jZUFuaW1hdGlvbiB8ICdyZXNldCc7XG5cbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKHB1YmxpYyB0b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZzogVG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuYm94QW5pbWF0aW9uID0gdGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy50b2FzdENvcmVDb25maWcuYW5pbWF0aW9uSW47XG4gICAgfSwgMSk7XG4gIH1cblxuICBnZXQgYXV0b0Nsb3NlQ29uZGl0aW9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLnRvYXN0Q29yZUNvbmZpZy5hdXRvQ2xvc2VEZWxheSAmJlxuICAgICAgIShcbiAgICAgICAgdGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5idXR0b25zLmxlbmd0aCB8fFxuICAgICAgICB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLnRvYXN0Q29yZUNvbmZpZy5kZWNsaW5lTGFiZWwgfHxcbiAgICAgICAgdGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy50b2FzdENvcmVDb25maWcuY29uZmlybUxhYmVsXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIGdldCBidXR0b25zRXhpc3QoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgICEhdGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5idXR0b25zLmxlbmd0aCB8fFxuICAgICAgISF0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLnRvYXN0Q29yZUNvbmZpZy5kZWNsaW5lTGFiZWwgfHxcbiAgICAgICEhdGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy50b2FzdENvcmVDb25maWcuY29uZmlybUxhYmVsXG4gICAgKTtcbiAgfVxuXG4gIHNldEN1c3RvbVN0eWxlcygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy50b2FzdENvcmVDb25maWcuY3VzdG9tU3R5bGVzLnRleHRDU1MgJiYgdGhpcy5lbFRleHRXcmFwcGVyKSB7XG4gICAgICB0aGlzLmVsVGV4dFdyYXBwZXIubmF0aXZlRWxlbWVudC5zdHlsZS5jc3NUZXh0ICs9XG4gICAgICAgIHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcudG9hc3RDb3JlQ29uZmlnLmN1c3RvbVN0eWxlcy50ZXh0Q1NTO1xuICAgIH1cbiAgICBpZiAodGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy50b2FzdENvcmVDb25maWcuY3VzdG9tU3R5bGVzLnRpdGxlQ1NTICYmIHRoaXMuZWxUaXRsZVdyYXBwZXIpIHtcbiAgICAgIHRoaXMuZWxUaXRsZVdyYXBwZXIubmF0aXZlRWxlbWVudC5zdHlsZS5jc3NUZXh0ICs9XG4gICAgICAgIHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcudG9hc3RDb3JlQ29uZmlnLmN1c3RvbVN0eWxlcy50aXRsZUNTUztcbiAgICB9XG4gICAgaWYgKHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcudG9hc3RDb3JlQ29uZmlnLmN1c3RvbVN0eWxlcy5idXR0b25TZWN0aW9uQ1NTICYmIHRoaXMuZWxCdXR0b25XcmFwcGVyKSB7XG4gICAgICB0aGlzLmVsQnV0dG9uV3JhcHBlci5uYXRpdmVFbGVtZW50LnN0eWxlLmNzc1RleHQgKz1cbiAgICAgICAgdGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy50b2FzdENvcmVDb25maWcuY3VzdG9tU3R5bGVzLmJ1dHRvblNlY3Rpb25DU1M7XG4gICAgfVxuICAgIGlmICh0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLnRvYXN0Q29yZUNvbmZpZy5jdXN0b21TdHlsZXMuYnV0dG9uQ1NTICYmIHRoaXMuZWxCdXR0b24pIHtcbiAgICAgIHRoaXMuZWxCdXR0b24uZm9yRWFjaChlbCA9PiB7XG4gICAgICAgIGVsLm5hdGl2ZUVsZW1lbnQuc3R5bGUuY3NzVGV4dCArPSB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLnRvYXN0Q29yZUNvbmZpZy5jdXN0b21TdHlsZXMuYnV0dG9uQ1NTO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbW91c2VPdmVyKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5idXR0b25zRXhpc3QgJiYgIXRoaXMuY2xvc2VJc0NsaWNrZWQgJiYgIXRoaXMuYXV0b0Nsb3NpbmdIYXNTdGFydGVkKSB7XG4gICAgICB0aGlzLnRpbWVyU3RhcnRlZCQubmV4dCgnc3RvcC1jb3VudGVyJyk7XG4gICAgICB0aGlzLmZhZGVJbk91dEFuaW1hdGlvbiA9ICdvcGVuJztcbiAgICAgIHRoaXMuc3Vic1RvQ2xvc2luZ0RlbGF5Py51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5ib3hBbmltYXRpb24gPSAncmVzZXQnO1xuICAgIH1cbiAgfVxuXG4gIG1vdXNlT3V0KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5idXR0b25zRXhpc3QgJiYgIXRoaXMuY2xvc2VJc0NsaWNrZWQgJiYgIXRoaXMuYXV0b0Nsb3NpbmdIYXNTdGFydGVkKSB7XG4gICAgICB0aGlzLnRpbWVyU3RhcnRlZCQubmV4dCgnc3RhcnQtY291bnRlcicpO1xuICAgIH1cbiAgfVxuXG4gIG9uT3ZlcmxheUNsaWNrZWQoZXZ0OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgLy8gIGNvbnNvbGUubG9nKCdvbk92ZXJsYXlDbGlja2VkJyk7XG4gIH1cblxuICBvblRvYXN0Q2xpY2tlZChldnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICAvLyBjb25zb2xlLmxvZygnb25PdmVybGF5Q2xpY2tlZCcpO1xuICB9XG5cbiAgc2V0UmVzcG9uc2UoX0lzU3VjY2VzczogYm9vbGVhbiwgX0NsaWNrZWRCdXR0b25JRD86IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gbmV3IFRvYXN0Tm90aWZpY2F0aW9uRGVmYXVsdFJlc3BvbnNlKCk7XG4gICAgaWYgKF9DbGlja2VkQnV0dG9uSUQpIHtcbiAgICAgIHJlc3BvbnNlLmNsaWNrZWRCdXR0b25JRCA9IF9DbGlja2VkQnV0dG9uSUQ7XG4gICAgfVxuXG4gICAgcmVzcG9uc2Uuc2V0U3VjY2VzcyhfSXNTdWNjZXNzKTtcbiAgICByZXNwb25zZS5zZXRCZWxvbmdpbmcodGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZyk7XG4gICAgdGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5ldmVudHNDb250cm9sbGVyLnNldERlZmF1bHRSZXNwb25zZShyZXNwb25zZSk7XG4gIH1cblxuICBvbkN1c3RvbUJ1dHRvbihfQnV0dG9uOiBJQnV0dG9uKTogdm9pZCB7XG4gICAgdGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5ldmVudHNDb250cm9sbGVyLm9uQnV0dG9uQ2xpY2soX0J1dHRvbik7XG4gICAgdGhpcy5zZXRSZXNwb25zZSh0cnVlLCBfQnV0dG9uLklEKTtcbiAgICB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLmV2ZW50c0NvbnRyb2xsZXIuY2xvc2UoKTtcbiAgfVxuXG4gIG9uQnV0dG9uQ2xpY2soX1R5cGU6ICdjb25maXJtJyB8ICdkZWNsaW5lJyk6IHZvaWQge1xuICAgIGxldCBidXR0b25JRDtcbiAgICBpZiAoX1R5cGUgPT09ICdjb25maXJtJykge1xuICAgICAgYnV0dG9uSUQgPSB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLnRvYXN0Q29yZUNvbmZpZy5jb25maXJtTGFiZWwudG9Mb3dlckNhc2UoKTtcbiAgICB9IGVsc2UgaWYgKF9UeXBlID09PSAnZGVjbGluZScpIHtcbiAgICAgIGJ1dHRvbklEID0gdGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy50b2FzdENvcmVDb25maWcuZGVjbGluZUxhYmVsLnRvTG93ZXJDYXNlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5zZXRSZXNwb25zZShfVHlwZSA9PT0gJ2NvbmZpcm0nLCBidXR0b25JRCk7XG4gICAgdGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5ldmVudHNDb250cm9sbGVyLmNsb3NlKCk7XG4gIH1cblxuICBhdXRvQ2xvc2UoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuYXV0b0Nsb3NlQ29uZGl0aW9uKSB7XG4gICAgICB0aGlzLnRpbWVyLnNldE1pbGxpc2Vjb25kcyh0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLnRvYXN0Q29yZUNvbmZpZy5hdXRvQ2xvc2VEZWxheSk7XG4gICAgICB0aGlzLnN1YlRpbWVyID0gdGhpcy50aW1lclN0YXJ0ZWQkXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIHRhcChuZXh0ID0+IHtcbiAgICAgICAgICAgIGlmICgnc3RhcnQtY291bnRlcicgPT09IG5leHQpIHtcbiAgICAgICAgICAgICAgdGhpcy50aW1lci5zdGFydCgpO1xuICAgICAgICAgICAgICB0aGlzLmlzVGltZXJTdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdWJzVG9DbG9zaW5nRGVsYXkgPSB0aGlzLmNsb3NlUGFyZW50JCgpLnN1YnNjcmliZShyZXNwID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuZXZlbnRzQ29udHJvbGxlci5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9LCB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLnRvYXN0Q29yZUNvbmZpZy5hdXRvQ2xvc2VEZWxheSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCdzdG9wLWNvdW50ZXInID09PSBuZXh0KSB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLmlzVGltZXJTdGFydGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lci5zdG9wKCk7XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1RpbWVyU3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgY2xvc2VQYXJlbnQkKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgdGhpcy5hdXRvQ2xvc2luZ0hhc1N0YXJ0ZWQgPSB0cnVlO1xuICAgIHRoaXMuYm94QW5pbWF0aW9uID0gdGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy50b2FzdENvcmVDb25maWcuYW5pbWF0aW9uT3V0O1xuICAgIGNvbnN0IGNsb3NlRHVyYXRpb24gPSB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLnRvYXN0Q29yZUNvbmZpZy5hbmltYXRpb25PdXQgPyA0MDAgOiAyMDA7XG4gICAgdGhpcy5mYWRlSW5PdXRBbmltYXRpb24gPSAnY2xvc2UtZmFzdCc7XG4gICAgcmV0dXJuIG9mKCcnKS5waXBlKGRlbGF5KGNsb3NlRHVyYXRpb24pKTtcbiAgfVxuXG4gIGNsb3NlKCk6IHZvaWQge1xuICAgIHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuZXZlbnRzQ29udHJvbGxlci5jbG9zZSgpO1xuICB9XG5cbiAgY2xvc2VJY29uKCk6IHZvaWQge1xuICAgIHRoaXMuY2xvc2VJc0NsaWNrZWQgPSB0cnVlO1xuICAgIHRoaXMuc3Vic1RvQ2xvc2luZ0RlbGF5Py51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuY2xvc2VQYXJlbnQkKClcbiAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAuc3Vic2NyaWJlKHJlc3AgPT4ge1xuICAgICAgICB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLmV2ZW50c0NvbnRyb2xsZXIuY2xvc2UoKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzVG9DbG9zaW5nRGVsYXk/LnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5zdWJUaW1lcj8udW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19