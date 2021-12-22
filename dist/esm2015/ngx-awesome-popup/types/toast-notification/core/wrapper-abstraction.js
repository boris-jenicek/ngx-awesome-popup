import { Directive, ViewChild, ViewChildren } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { delay, take, tap } from 'rxjs/operators';
import { Timer } from '../../../core/global-classes';
import { LayoutHelperService } from '../../../core/layout-helper.service';
import { ToastNotificationBelonging, ToastNotificationDefaultResponse } from './classes';
export class WrapperAbstraction {
    constructor(toastNotificationBelonging, layoutHelper) {
        this.toastNotificationBelonging = toastNotificationBelonging;
        this.layoutHelper = layoutHelper;
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
    getIconClasses() {
        return ('icon-type-toast ' +
            this.layoutHelper.getIconClasses(this.toastNotificationBelonging.toastCoreConfig.layoutType, this.toastNotificationBelonging.toastCoreConfig.iconStyleClass));
    }
}
WrapperAbstraction.decorators = [
    { type: Directive }
];
WrapperAbstraction.ctorParameters = () => [
    { type: ToastNotificationBelonging },
    { type: LayoutHelperService }
];
WrapperAbstraction.propDecorators = {
    elTextWrapper: [{ type: ViewChild, args: ['elTextWrapper',] }],
    elTitleWrapper: [{ type: ViewChild, args: ['elTitleWrapper',] }],
    elButtonWrapper: [{ type: ViewChild, args: ['elButtonWrapper',] }],
    elButton: [{ type: ViewChildren, args: ['elButton',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JhcHBlci1hYnN0cmFjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL25neC1hd2Vzb21lLXBvcHVwL3R5cGVzL3RvYXN0LW5vdGlmaWNhdGlvbi9jb3JlL3dyYXBwZXItYWJzdHJhY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBb0MsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRyxPQUFPLEVBQUUsZUFBZSxFQUFjLEVBQUUsRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDckUsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFbEQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRXJELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBRTFFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUd6RixNQUFNLE9BQWdCLGtCQUFrQjtJQWdCdEMsWUFBNkIsMEJBQXNELEVBQVMsWUFBaUM7UUFBaEcsK0JBQTBCLEdBQTFCLDBCQUEwQixDQUE0QjtRQUFTLGlCQUFZLEdBQVosWUFBWSxDQUFxQjtRQWZySCxtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUN2QiwwQkFBcUIsR0FBRyxLQUFLLENBQUM7UUFLdEMsdUJBQWtCLEdBQUcsTUFBTSxDQUFDO1FBQzVCLGtCQUFhLEdBQUcsSUFBSSxlQUFlLENBQUMsZUFBZSxDQUFDLENBQUM7UUFHckQsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFFdkIsVUFBSyxHQUFVLElBQUksS0FBSyxFQUFFLENBQUM7UUFJekIsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNkLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLDBCQUEwQixDQUFDLGVBQWUsQ0FBQyxXQUFX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QWtCO1lBQ2xCLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUM5QixJQUFJLENBQUMsMEJBQTBCLENBQUMsZUFBZSxDQUFDLFVBQVUsRUFDMUQsSUFBSSxDQUFDLDBCQUEwQixDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQy9ELENBQ0YsQ0FBQztJQUNKLENBQUM7OztZQTdLRixTQUFTOzs7WUFGRCwwQkFBMEI7WUFGMUIsbUJBQW1COzs7NEJBUXpCLFNBQVMsU0FBQyxlQUFlOzZCQUN6QixTQUFTLFNBQUMsZ0JBQWdCOzhCQUMxQixTQUFTLFNBQUMsaUJBQWlCO3VCQUMzQixZQUFZLFNBQUMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgT25EZXN0cm95LCBRdWVyeUxpc3QsIFZpZXdDaGlsZCwgVmlld0NoaWxkcmVuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIG9mLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlbGF5LCB0YWtlLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBcHBlYXJhbmNlQW5pbWF0aW9uLCBEaXNhcHBlYXJhbmNlQW5pbWF0aW9uIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9lbnVtcyc7XG5pbXBvcnQgeyBUaW1lciB9IGZyb20gJy4uLy4uLy4uL2NvcmUvZ2xvYmFsLWNsYXNzZXMnO1xuaW1wb3J0IHsgSUJ1dHRvbiB9IGZyb20gJy4uLy4uLy4uL2NvcmUvZ2xvYmFsLWludGVyZmFjZXMnO1xuaW1wb3J0IHsgTGF5b3V0SGVscGVyU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvbGF5b3V0LWhlbHBlci5zZXJ2aWNlJztcblxuaW1wb3J0IHsgVG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcsIFRvYXN0Tm90aWZpY2F0aW9uRGVmYXVsdFJlc3BvbnNlIH0gZnJvbSAnLi9jbGFzc2VzJztcblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgV3JhcHBlckFic3RyYWN0aW9uIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBjbG9zZUlzQ2xpY2tlZCA9IGZhbHNlO1xuICBwcml2YXRlIGF1dG9DbG9zaW5nSGFzU3RhcnRlZCA9IGZhbHNlO1xuICBAVmlld0NoaWxkKCdlbFRleHRXcmFwcGVyJykgZWxUZXh0V3JhcHBlcjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnZWxUaXRsZVdyYXBwZXInKSBlbFRpdGxlV3JhcHBlcjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnZWxCdXR0b25XcmFwcGVyJykgZWxCdXR0b25XcmFwcGVyOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkcmVuKCdlbEJ1dHRvbicpIGVsQnV0dG9uOiBRdWVyeUxpc3Q8RWxlbWVudFJlZj47XG4gIGZhZGVJbk91dEFuaW1hdGlvbiA9ICdvcGVuJztcbiAgdGltZXJTdGFydGVkJCA9IG5ldyBCZWhhdmlvclN1YmplY3QoJ3N0YXJ0LWNvdW50ZXInKTtcbiAgc3Vic1RvQ2xvc2luZ0RlbGF5OiBTdWJzY3JpcHRpb247XG4gIHN1YlRpbWVyOiBTdWJzY3JpcHRpb247XG4gIGlzVGltZXJTdGFydGVkID0gZmFsc2U7XG4gIHRpbWVvdXQ7XG4gIHRpbWVyOiBUaW1lciA9IG5ldyBUaW1lcigpO1xuICBib3hBbmltYXRpb246IEFwcGVhcmFuY2VBbmltYXRpb24gfCBEaXNhcHBlYXJhbmNlQW5pbWF0aW9uIHwgJ3Jlc2V0JztcblxuICBwcm90ZWN0ZWQgY29uc3RydWN0b3IocHVibGljIHRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nOiBUb2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZywgcHVibGljIGxheW91dEhlbHBlcjogTGF5b3V0SGVscGVyU2VydmljZSkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5ib3hBbmltYXRpb24gPSB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLnRvYXN0Q29yZUNvbmZpZy5hbmltYXRpb25JbjtcbiAgICB9LCAxKTtcbiAgfVxuXG4gIGdldCBhdXRvQ2xvc2VDb25kaXRpb24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcudG9hc3RDb3JlQ29uZmlnLmF1dG9DbG9zZURlbGF5ICYmXG4gICAgICAhKFxuICAgICAgICB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLmJ1dHRvbnMubGVuZ3RoIHx8XG4gICAgICAgIHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcudG9hc3RDb3JlQ29uZmlnLmRlY2xpbmVMYWJlbCB8fFxuICAgICAgICB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLnRvYXN0Q29yZUNvbmZpZy5jb25maXJtTGFiZWxcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgZ2V0IGJ1dHRvbnNFeGlzdCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgISF0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLmJ1dHRvbnMubGVuZ3RoIHx8XG4gICAgICAhIXRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcudG9hc3RDb3JlQ29uZmlnLmRlY2xpbmVMYWJlbCB8fFxuICAgICAgISF0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLnRvYXN0Q29yZUNvbmZpZy5jb25maXJtTGFiZWxcbiAgICApO1xuICB9XG5cbiAgc2V0Q3VzdG9tU3R5bGVzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLnRvYXN0Q29yZUNvbmZpZy5jdXN0b21TdHlsZXMudGV4dENTUyAmJiB0aGlzLmVsVGV4dFdyYXBwZXIpIHtcbiAgICAgIHRoaXMuZWxUZXh0V3JhcHBlci5uYXRpdmVFbGVtZW50LnN0eWxlLmNzc1RleHQgKz0gdGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy50b2FzdENvcmVDb25maWcuY3VzdG9tU3R5bGVzLnRleHRDU1M7XG4gICAgfVxuICAgIGlmICh0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLnRvYXN0Q29yZUNvbmZpZy5jdXN0b21TdHlsZXMudGl0bGVDU1MgJiYgdGhpcy5lbFRpdGxlV3JhcHBlcikge1xuICAgICAgdGhpcy5lbFRpdGxlV3JhcHBlci5uYXRpdmVFbGVtZW50LnN0eWxlLmNzc1RleHQgKz0gdGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy50b2FzdENvcmVDb25maWcuY3VzdG9tU3R5bGVzLnRpdGxlQ1NTO1xuICAgIH1cbiAgICBpZiAodGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy50b2FzdENvcmVDb25maWcuY3VzdG9tU3R5bGVzLmJ1dHRvblNlY3Rpb25DU1MgJiYgdGhpcy5lbEJ1dHRvbldyYXBwZXIpIHtcbiAgICAgIHRoaXMuZWxCdXR0b25XcmFwcGVyLm5hdGl2ZUVsZW1lbnQuc3R5bGUuY3NzVGV4dCArPSB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLnRvYXN0Q29yZUNvbmZpZy5jdXN0b21TdHlsZXMuYnV0dG9uU2VjdGlvbkNTUztcbiAgICB9XG4gICAgaWYgKHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcudG9hc3RDb3JlQ29uZmlnLmN1c3RvbVN0eWxlcy5idXR0b25DU1MgJiYgdGhpcy5lbEJ1dHRvbikge1xuICAgICAgdGhpcy5lbEJ1dHRvbi5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgZWwubmF0aXZlRWxlbWVudC5zdHlsZS5jc3NUZXh0ICs9IHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcudG9hc3RDb3JlQ29uZmlnLmN1c3RvbVN0eWxlcy5idXR0b25DU1M7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBtb3VzZU92ZXIoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmJ1dHRvbnNFeGlzdCAmJiAhdGhpcy5jbG9zZUlzQ2xpY2tlZCAmJiAhdGhpcy5hdXRvQ2xvc2luZ0hhc1N0YXJ0ZWQpIHtcbiAgICAgIHRoaXMudGltZXJTdGFydGVkJC5uZXh0KCdzdG9wLWNvdW50ZXInKTtcbiAgICAgIHRoaXMuZmFkZUluT3V0QW5pbWF0aW9uID0gJ29wZW4nO1xuICAgICAgdGhpcy5zdWJzVG9DbG9zaW5nRGVsYXk/LnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLmJveEFuaW1hdGlvbiA9ICdyZXNldCc7XG4gICAgfVxuICB9XG5cbiAgbW91c2VPdXQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmJ1dHRvbnNFeGlzdCAmJiAhdGhpcy5jbG9zZUlzQ2xpY2tlZCAmJiAhdGhpcy5hdXRvQ2xvc2luZ0hhc1N0YXJ0ZWQpIHtcbiAgICAgIHRoaXMudGltZXJTdGFydGVkJC5uZXh0KCdzdGFydC1jb3VudGVyJyk7XG4gICAgfVxuICB9XG5cbiAgb25PdmVybGF5Q2xpY2tlZChldnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICAvLyAgY29uc29sZS5sb2coJ29uT3ZlcmxheUNsaWNrZWQnKTtcbiAgfVxuXG4gIG9uVG9hc3RDbGlja2VkKGV2dDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIC8vIGNvbnNvbGUubG9nKCdvbk92ZXJsYXlDbGlja2VkJyk7XG4gIH1cblxuICBzZXRSZXNwb25zZShfSXNTdWNjZXNzOiBib29sZWFuLCBfQ2xpY2tlZEJ1dHRvbklEPzogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBuZXcgVG9hc3ROb3RpZmljYXRpb25EZWZhdWx0UmVzcG9uc2UoKTtcbiAgICBpZiAoX0NsaWNrZWRCdXR0b25JRCkge1xuICAgICAgcmVzcG9uc2UuY2xpY2tlZEJ1dHRvbklEID0gX0NsaWNrZWRCdXR0b25JRDtcbiAgICB9XG5cbiAgICByZXNwb25zZS5zZXRTdWNjZXNzKF9Jc1N1Y2Nlc3MpO1xuICAgIHJlc3BvbnNlLnNldEJlbG9uZ2luZyh0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nKTtcbiAgICB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLmV2ZW50c0NvbnRyb2xsZXIuc2V0RGVmYXVsdFJlc3BvbnNlKHJlc3BvbnNlKTtcbiAgfVxuXG4gIG9uQ3VzdG9tQnV0dG9uKF9CdXR0b246IElCdXR0b24pOiB2b2lkIHtcbiAgICB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLmV2ZW50c0NvbnRyb2xsZXIub25CdXR0b25DbGljayhfQnV0dG9uKTtcbiAgICB0aGlzLnNldFJlc3BvbnNlKHRydWUsIF9CdXR0b24uSUQpO1xuICAgIHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuZXZlbnRzQ29udHJvbGxlci5jbG9zZSgpO1xuICB9XG5cbiAgb25CdXR0b25DbGljayhfVHlwZTogJ2NvbmZpcm0nIHwgJ2RlY2xpbmUnKTogdm9pZCB7XG4gICAgbGV0IGJ1dHRvbklEO1xuICAgIGlmIChfVHlwZSA9PT0gJ2NvbmZpcm0nKSB7XG4gICAgICBidXR0b25JRCA9IHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcudG9hc3RDb3JlQ29uZmlnLmNvbmZpcm1MYWJlbC50b0xvd2VyQ2FzZSgpO1xuICAgIH0gZWxzZSBpZiAoX1R5cGUgPT09ICdkZWNsaW5lJykge1xuICAgICAgYnV0dG9uSUQgPSB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLnRvYXN0Q29yZUNvbmZpZy5kZWNsaW5lTGFiZWwudG9Mb3dlckNhc2UoKTtcbiAgICB9XG5cbiAgICB0aGlzLnNldFJlc3BvbnNlKF9UeXBlID09PSAnY29uZmlybScsIGJ1dHRvbklEKTtcbiAgICB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLmV2ZW50c0NvbnRyb2xsZXIuY2xvc2UoKTtcbiAgfVxuXG4gIGF1dG9DbG9zZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5hdXRvQ2xvc2VDb25kaXRpb24pIHtcbiAgICAgIHRoaXMudGltZXIuc2V0TWlsbGlzZWNvbmRzKHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcudG9hc3RDb3JlQ29uZmlnLmF1dG9DbG9zZURlbGF5KTtcbiAgICAgIHRoaXMuc3ViVGltZXIgPSB0aGlzLnRpbWVyU3RhcnRlZCRcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgdGFwKG5leHQgPT4ge1xuICAgICAgICAgICAgaWYgKCdzdGFydC1jb3VudGVyJyA9PT0gbmV4dCkge1xuICAgICAgICAgICAgICB0aGlzLnRpbWVyLnN0YXJ0KCk7XG4gICAgICAgICAgICAgIHRoaXMuaXNUaW1lclN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnN1YnNUb0Nsb3NpbmdEZWxheSA9IHRoaXMuY2xvc2VQYXJlbnQkKCkuc3Vic2NyaWJlKHJlc3AgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5ldmVudHNDb250cm9sbGVyLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0sIHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcudG9hc3RDb3JlQ29uZmlnLmF1dG9DbG9zZURlbGF5KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoJ3N0b3AtY291bnRlcicgPT09IG5leHQpIHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuaXNUaW1lclN0YXJ0ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVyLnN0b3AoKTtcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcbiAgICAgICAgICAgICAgICB0aGlzLmlzVGltZXJTdGFydGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBjbG9zZVBhcmVudCQoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICB0aGlzLmF1dG9DbG9zaW5nSGFzU3RhcnRlZCA9IHRydWU7XG4gICAgdGhpcy5ib3hBbmltYXRpb24gPSB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLnRvYXN0Q29yZUNvbmZpZy5hbmltYXRpb25PdXQ7XG4gICAgY29uc3QgY2xvc2VEdXJhdGlvbiA9IHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcudG9hc3RDb3JlQ29uZmlnLmFuaW1hdGlvbk91dCA/IDQwMCA6IDIwMDtcbiAgICB0aGlzLmZhZGVJbk91dEFuaW1hdGlvbiA9ICdjbG9zZS1mYXN0JztcbiAgICByZXR1cm4gb2YoJycpLnBpcGUoZGVsYXkoY2xvc2VEdXJhdGlvbikpO1xuICB9XG5cbiAgY2xvc2UoKTogdm9pZCB7XG4gICAgdGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5ldmVudHNDb250cm9sbGVyLmNsb3NlKCk7XG4gIH1cblxuICBjbG9zZUljb24oKTogdm9pZCB7XG4gICAgdGhpcy5jbG9zZUlzQ2xpY2tlZCA9IHRydWU7XG4gICAgdGhpcy5zdWJzVG9DbG9zaW5nRGVsYXk/LnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5jbG9zZVBhcmVudCQoKVxuICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgIC5zdWJzY3JpYmUocmVzcCA9PiB7XG4gICAgICAgIHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuZXZlbnRzQ29udHJvbGxlci5jbG9zZSgpO1xuICAgICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNUb0Nsb3NpbmdEZWxheT8udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLnN1YlRpbWVyPy51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgZ2V0SWNvbkNsYXNzZXMoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gKFxuICAgICAgJ2ljb24tdHlwZS10b2FzdCAnICtcbiAgICAgIHRoaXMubGF5b3V0SGVscGVyLmdldEljb25DbGFzc2VzKFxuICAgICAgICB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLnRvYXN0Q29yZUNvbmZpZy5sYXlvdXRUeXBlLFxuICAgICAgICB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLnRvYXN0Q29yZUNvbmZpZy5pY29uU3R5bGVDbGFzc1xuICAgICAgKVxuICAgICk7XG4gIH1cbn1cbiJdfQ==