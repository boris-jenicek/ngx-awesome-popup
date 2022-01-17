import { Directive, ViewChild, ViewChildren } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { delay, take, tap } from 'rxjs/operators';
import { AppearanceAnimation, DisappearanceAnimation } from '../../../core/enums';
import { Timer } from '../../../core/global-classes';
import { ToastNotificationDefaultResponse } from './classes';
import * as i0 from "@angular/core";
import * as i1 from "./classes";
import * as i2 from "../../../core/layout-helper.service";
const _c0 = ["elTextWrapper"];
const _c1 = ["elTitleWrapper"];
const _c2 = ["elButtonWrapper"];
const _c3 = ["elButton"];
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
        this.appearanceAnimation = AppearanceAnimation;
        this.disappearanceAnimation = DisappearanceAnimation;
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
        if (!this.buttonsExist && !this.closeIsClicked && !this.autoClosingHasStarted) {
            this.timerStarted$.next('stop-counter');
            this.fadeInOutAnimation = 'open';
            this.subsToClosingDelay?.unsubscribe();
            this.boxAnimation = 'reset';
        }
    }
    mouseOut() {
        if (!this.buttonsExist && !this.closeIsClicked && !this.autoClosingHasStarted) {
            this.timerStarted$.next('start-counter');
        }
    }
    onOverlayClicked(evt) {
    }
    onToastClicked(evt) {
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
        this.closeIsClicked = true;
        this.subsToClosingDelay?.unsubscribe();
        this.closeParent$()
            .pipe(take(1))
            .subscribe(resp => {
            this.toastNotificationBelonging.eventsController.close();
        });
    }
    ngOnDestroy() {
        this.subsToClosingDelay?.unsubscribe();
        this.subTimer?.unsubscribe();
    }
    getIconClasses() {
        return ('icon-type-toast ' +
            this.layoutHelper.getIconClasses(this.toastNotificationBelonging.toastCoreConfig.layoutType, this.toastNotificationBelonging.toastCoreConfig.iconStyleClass));
    }
}
WrapperAbstraction.ɵfac = function WrapperAbstraction_Factory(t) { return new (t || WrapperAbstraction)(i0.ɵɵdirectiveInject(i1.ToastNotificationBelonging), i0.ɵɵdirectiveInject(i2.LayoutHelperService)); };
WrapperAbstraction.ɵdir = i0.ɵɵdefineDirective({ type: WrapperAbstraction, viewQuery: function WrapperAbstraction_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 5);
        i0.ɵɵviewQuery(_c1, 5);
        i0.ɵɵviewQuery(_c2, 5);
        i0.ɵɵviewQuery(_c3, 5);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.elTextWrapper = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.elTitleWrapper = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.elButtonWrapper = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.elButton = _t);
    } } });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(WrapperAbstraction, [{
        type: Directive
    }], function () { return [{ type: i1.ToastNotificationBelonging }, { type: i2.LayoutHelperService }]; }, { elTextWrapper: [{
            type: ViewChild,
            args: ['elTextWrapper']
        }], elTitleWrapper: [{
            type: ViewChild,
            args: ['elTitleWrapper']
        }], elButtonWrapper: [{
            type: ViewChild,
            args: ['elButtonWrapper']
        }], elButton: [{
            type: ViewChildren,
            args: ['elButton']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JhcHBlci1hYnN0cmFjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL25neC1hd2Vzb21lLXBvcHVwL3R5cGVzL3RvYXN0LW5vdGlmaWNhdGlvbi9jb3JlL3dyYXBwZXItYWJzdHJhY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBb0MsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRyxPQUFPLEVBQUUsZUFBZSxFQUFjLEVBQUUsRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDckUsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLHNCQUFzQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbEYsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBSXJELE9BQU8sRUFBOEIsZ0NBQWdDLEVBQUUsTUFBTSxXQUFXLENBQUM7Ozs7Ozs7O0FBR3pGLE1BQU0sT0FBZ0Isa0JBQWtCO0lBa0J0QyxZQUE2QiwwQkFBc0QsRUFBUyxZQUFpQztRQUFoRywrQkFBMEIsR0FBMUIsMEJBQTBCLENBQTRCO1FBQVMsaUJBQVksR0FBWixZQUFZLENBQXFCO1FBakJySCxtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUN2QiwwQkFBcUIsR0FBRyxLQUFLLENBQUM7UUFLdEMsdUJBQWtCLEdBQUcsTUFBTSxDQUFDO1FBQzVCLGtCQUFhLEdBQUcsSUFBSSxlQUFlLENBQUMsZUFBZSxDQUFDLENBQUM7UUFHckQsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFFdkIsVUFBSyxHQUFVLElBQUksS0FBSyxFQUFFLENBQUM7UUFFM0Isd0JBQW1CLEdBQUcsbUJBQW1CLENBQUM7UUFDMUMsMkJBQXNCLEdBQUcsc0JBQXNCLENBQUM7UUFHOUMsVUFBVSxDQUFDLEdB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Q1osT0FBTyxDQUNMLGtCQUFrQjtZQUNsQixJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FDOUIsSUFBSSxDQUFDLDBCQUEwQixDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQzFELElBQUksQ0FBQywwQkFBMEIsQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUMvRCxDQUNGLENBQUM7SUFDSixDQUFDOztvRkE5S21CLGtCQUFrQjt1REFBbEIsa0JBQWtCOzs7Ozs7Ozs7Ozs7dUZBQWxCLGtCQUFrQjtjQUR2QyxTQUFTOytHQUlvQixhQUFhO2tCQUF4QyxTQUFTO21CQUFDLGVBQWU7WUFDRyxjQUFjO2tCQUExQyxTQUFTO21CQUFDLGdCQUFnQjtZQUNHLGVBQWU7a0JBQTVDLFNBQVM7bUJBQUMsaUJBQWlCO1lBQ0YsUUFBUTtrQkFBakMsWUFBWTttQkFBQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBPbkRlc3Ryb3ksIFF1ZXJ5TGlzdCwgVmlld0NoaWxkLCBWaWV3Q2hpbGRyZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSwgb2YsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVsYXksIHRha2UsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEFwcGVhcmFuY2VBbmltYXRpb24sIERpc2FwcGVhcmFuY2VBbmltYXRpb24gfSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudW1zJztcbmltcG9ydCB7IFRpbWVyIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9nbG9iYWwtY2xhc3Nlcyc7XG5pbXBvcnQgeyBJQnV0dG9uIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9nbG9iYWwtaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBMYXlvdXRIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9sYXlvdXQtaGVscGVyLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBUb2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZywgVG9hc3ROb3RpZmljYXRpb25EZWZhdWx0UmVzcG9uc2UgfSBmcm9tICcuL2NsYXNzZXMnO1xuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBXcmFwcGVyQWJzdHJhY3Rpb24gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcml2YXRlIGNsb3NlSXNDbGlja2VkID0gZmFsc2U7XG4gIHByaXZhdGUgYXV0b0Nsb3NpbmdIYXNTdGFydGVkID0gZmFsc2U7XG4gIEBWaWV3Q2hpbGQoJ2VsVGV4dFdyYXBwZXInKSBlbFRleHRXcmFwcGVyOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdlbFRpdGxlV3JhcHBlcicpIGVsVGl0bGVXcmFwcGVyOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdlbEJ1dHRvbldyYXBwZXInKSBlbEJ1dHRvbldyYXBwZXI6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGRyZW4oJ2VsQnV0dG9uJykgZWxCdXR0b246IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPjtcbiAgZmFkZUluT3V0QW5pbWF0aW9uID0gJ29wZW4nO1xuICB0aW1lclN0YXJ0ZWQkID0gbmV3IEJlaGF2aW9yU3ViamVjdCgnc3RhcnQtY291bnRlcicpO1xuICBzdWJzVG9DbG9zaW5nRGVsYXk6IFN1YnNjcmlwdGlvbjtcbiAgc3ViVGltZXI6IFN1YnNjcmlwdGlvbjtcbiAgaXNUaW1lclN0YXJ0ZWQgPSBmYWxzZTtcbiAgdGltZW91dDtcbiAgdGltZXI6IFRpbWVyID0gbmV3IFRpbWVyKCk7XG4gIGJveEFuaW1hdGlvbjogQXBwZWFyYW5jZUFuaW1hdGlvbiB8IERpc2FwcGVhcmFuY2VBbmltYXRpb24gfCAncmVzZXQnO1xuICBhcHBlYXJhbmNlQW5pbWF0aW9uID0gQXBwZWFyYW5jZUFuaW1hdGlvbjtcbiAgZGlzYXBwZWFyYW5jZUFuaW1hdGlvbiA9IERpc2FwcGVhcmFuY2VBbmltYXRpb247XG5cbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKHB1YmxpYyB0b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZzogVG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcsIHB1YmxpYyBsYXlvdXRIZWxwZXI6IExheW91dEhlbHBlclNlcnZpY2UpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuYm94QW5pbWF0aW9uID0gdGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy50b2FzdENvcmVDb25maWcuYW5pbWF0aW9uSW47XG4gICAgfSwgMSk7XG4gIH1cblxuICBnZXQgYXV0b0Nsb3NlQ29uZGl0aW9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLnRvYXN0Q29yZUNvbmZpZy5hdXRvQ2xvc2VEZWxheSAmJlxuICAgICAgIShcbiAgICAgICAgdGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5idXR0b25zLmxlbmd0aCB8fFxuICAgICAgICB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLnRvYXN0Q29yZUNvbmZpZy5kZWNsaW5lTGFiZWwgfHxcbiAgICAgICAgdGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy50b2FzdENvcmVDb25maWcuY29uZmlybUxhYmVsXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIGdldCBidXR0b25zRXhpc3QoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgICEhdGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5idXR0b25zLmxlbmd0aCB8fFxuICAgICAgISF0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLnRvYXN0Q29yZUNvbmZpZy5kZWNsaW5lTGFiZWwgfHxcbiAgICAgICEhdGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy50b2FzdENvcmVDb25maWcuY29uZmlybUxhYmVsXG4gICAgKTtcbiAgfVxuXG4gIHNldEN1c3RvbVN0eWxlcygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy50b2FzdENvcmVDb25maWcuY3VzdG9tU3R5bGVzLnRleHRDU1MgJiYgdGhpcy5lbFRleHRXcmFwcGVyKSB7XG4gICAgICB0aGlzLmVsVGV4dFdyYXBwZXIubmF0aXZlRWxlbWVudC5zdHlsZS5jc3NUZXh0ICs9IHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcudG9hc3RDb3JlQ29uZmlnLmN1c3RvbVN0eWxlcy50ZXh0Q1NTO1xuICAgIH1cbiAgICBpZiAodGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy50b2FzdENvcmVDb25maWcuY3VzdG9tU3R5bGVzLnRpdGxlQ1NTICYmIHRoaXMuZWxUaXRsZVdyYXBwZXIpIHtcbiAgICAgIHRoaXMuZWxUaXRsZVdyYXBwZXIubmF0aXZlRWxlbWVudC5zdHlsZS5jc3NUZXh0ICs9IHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcudG9hc3RDb3JlQ29uZmlnLmN1c3RvbVN0eWxlcy50aXRsZUNTUztcbiAgICB9XG4gICAgaWYgKHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcudG9hc3RDb3JlQ29uZmlnLmN1c3RvbVN0eWxlcy5idXR0b25TZWN0aW9uQ1NTICYmIHRoaXMuZWxCdXR0b25XcmFwcGVyKSB7XG4gICAgICB0aGlzLmVsQnV0dG9uV3JhcHBlci5uYXRpdmVFbGVtZW50LnN0eWxlLmNzc1RleHQgKz0gdGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy50b2FzdENvcmVDb25maWcuY3VzdG9tU3R5bGVzLmJ1dHRvblNlY3Rpb25DU1M7XG4gICAgfVxuICAgIGlmICh0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLnRvYXN0Q29yZUNvbmZpZy5jdXN0b21TdHlsZXMuYnV0dG9uQ1NTICYmIHRoaXMuZWxCdXR0b24pIHtcbiAgICAgIHRoaXMuZWxCdXR0b24uZm9yRWFjaChlbCA9PiB7XG4gICAgICAgIGVsLm5hdGl2ZUVsZW1lbnQuc3R5bGUuY3NzVGV4dCArPSB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLnRvYXN0Q29yZUNvbmZpZy5jdXN0b21TdHlsZXMuYnV0dG9uQ1NTO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbW91c2VPdmVyKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5idXR0b25zRXhpc3QgJiYgIXRoaXMuY2xvc2VJc0NsaWNrZWQgJiYgIXRoaXMuYXV0b0Nsb3NpbmdIYXNTdGFydGVkKSB7XG4gICAgICB0aGlzLnRpbWVyU3RhcnRlZCQubmV4dCgnc3RvcC1jb3VudGVyJyk7XG4gICAgICB0aGlzLmZhZGVJbk91dEFuaW1hdGlvbiA9ICdvcGVuJztcbiAgICAgIHRoaXMuc3Vic1RvQ2xvc2luZ0RlbGF5Py51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5ib3hBbmltYXRpb24gPSAncmVzZXQnO1xuICAgIH1cbiAgfVxuXG4gIG1vdXNlT3V0KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5idXR0b25zRXhpc3QgJiYgIXRoaXMuY2xvc2VJc0NsaWNrZWQgJiYgIXRoaXMuYXV0b0Nsb3NpbmdIYXNTdGFydGVkKSB7XG4gICAgICB0aGlzLnRpbWVyU3RhcnRlZCQubmV4dCgnc3RhcnQtY291bnRlcicpO1xuICAgIH1cbiAgfVxuXG4gIG9uT3ZlcmxheUNsaWNrZWQoZXZ0OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgLy8gIGNvbnNvbGUubG9nKCdvbk92ZXJsYXlDbGlja2VkJyk7XG4gIH1cblxuICBvblRvYXN0Q2xpY2tlZChldnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICAvLyBjb25zb2xlLmxvZygnb25PdmVybGF5Q2xpY2tlZCcpO1xuICB9XG5cbiAgc2V0UmVzcG9uc2UoX0lzU3VjY2VzczogYm9vbGVhbiwgX0NsaWNrZWRCdXR0b25JRD86IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gbmV3IFRvYXN0Tm90aWZpY2F0aW9uRGVmYXVsdFJlc3BvbnNlKCk7XG4gICAgaWYgKF9DbGlja2VkQnV0dG9uSUQpIHtcbiAgICAgIHJlc3BvbnNlLmNsaWNrZWRCdXR0b25JRCA9IF9DbGlja2VkQnV0dG9uSUQ7XG4gICAgfVxuXG4gICAgcmVzcG9uc2Uuc2V0U3VjY2VzcyhfSXNTdWNjZXNzKTtcbiAgICByZXNwb25zZS5zZXRCZWxvbmdpbmcodGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZyk7XG4gICAgdGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5ldmVudHNDb250cm9sbGVyLnNldERlZmF1bHRSZXNwb25zZShyZXNwb25zZSk7XG4gIH1cblxuICBvbkN1c3RvbUJ1dHRvbihfQnV0dG9uOiBJQnV0dG9uKTogdm9pZCB7XG4gICAgdGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5ldmVudHNDb250cm9sbGVyLm9uQnV0dG9uQ2xpY2soX0J1dHRvbik7XG4gICAgdGhpcy5zZXRSZXNwb25zZSh0cnVlLCBfQnV0dG9uLklEKTtcbiAgICB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLmV2ZW50c0NvbnRyb2xsZXIuY2xvc2UoKTtcbiAgfVxuXG4gIG9uQnV0dG9uQ2xpY2soX1R5cGU6ICdjb25maXJtJyB8ICdkZWNsaW5lJyk6IHZvaWQge1xuICAgIGxldCBidXR0b25JRDtcbiAgICBpZiAoX1R5cGUgPT09ICdjb25maXJtJykge1xuICAgICAgYnV0dG9uSUQgPSB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLnRvYXN0Q29yZUNvbmZpZy5jb25maXJtTGFiZWwudG9Mb3dlckNhc2UoKTtcbiAgICB9IGVsc2UgaWYgKF9UeXBlID09PSAnZGVjbGluZScpIHtcbiAgICAgIGJ1dHRvbklEID0gdGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy50b2FzdENvcmVDb25maWcuZGVjbGluZUxhYmVsLnRvTG93ZXJDYXNlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5zZXRSZXNwb25zZShfVHlwZSA9PT0gJ2NvbmZpcm0nLCBidXR0b25JRCk7XG4gICAgdGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5ldmVudHNDb250cm9sbGVyLmNsb3NlKCk7XG4gIH1cblxuICBhdXRvQ2xvc2UoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuYXV0b0Nsb3NlQ29uZGl0aW9uKSB7XG4gICAgICB0aGlzLnRpbWVyLnNldE1pbGxpc2Vjb25kcyh0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLnRvYXN0Q29yZUNvbmZpZy5hdXRvQ2xvc2VEZWxheSk7XG4gICAgICB0aGlzLnN1YlRpbWVyID0gdGhpcy50aW1lclN0YXJ0ZWQkXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIHRhcChuZXh0ID0+IHtcbiAgICAgICAgICAgIGlmICgnc3RhcnQtY291bnRlcicgPT09IG5leHQpIHtcbiAgICAgICAgICAgICAgdGhpcy50aW1lci5zdGFydCgpO1xuICAgICAgICAgICAgICB0aGlzLmlzVGltZXJTdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdWJzVG9DbG9zaW5nRGVsYXkgPSB0aGlzLmNsb3NlUGFyZW50JCgpLnN1YnNjcmliZShyZXNwID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuZXZlbnRzQ29udHJvbGxlci5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9LCB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLnRvYXN0Q29yZUNvbmZpZy5hdXRvQ2xvc2VEZWxheSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCdzdG9wLWNvdW50ZXInID09PSBuZXh0KSB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLmlzVGltZXJTdGFydGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lci5zdG9wKCk7XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1RpbWVyU3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgY2xvc2VQYXJlbnQkKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgdGhpcy5hdXRvQ2xvc2luZ0hhc1N0YXJ0ZWQgPSB0cnVlO1xuICAgIHRoaXMuYm94QW5pbWF0aW9uID0gdGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy50b2FzdENvcmVDb25maWcuYW5pbWF0aW9uT3V0O1xuICAgIGNvbnN0IGNsb3NlRHVyYXRpb24gPSB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLnRvYXN0Q29yZUNvbmZpZy5hbmltYXRpb25PdXQgPyA0MDAgOiAyMDA7XG4gICAgdGhpcy5mYWRlSW5PdXRBbmltYXRpb24gPSAnY2xvc2UtZmFzdCc7XG4gICAgcmV0dXJuIG9mKCcnKS5waXBlKGRlbGF5KGNsb3NlRHVyYXRpb24pKTtcbiAgfVxuXG4gIGNsb3NlKCk6IHZvaWQge1xuICAgIHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuZXZlbnRzQ29udHJvbGxlci5jbG9zZSgpO1xuICB9XG5cbiAgY2xvc2VJY29uKCk6IHZvaWQge1xuICAgIHRoaXMuY2xvc2VJc0NsaWNrZWQgPSB0cnVlO1xuICAgIHRoaXMuc3Vic1RvQ2xvc2luZ0RlbGF5Py51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuY2xvc2VQYXJlbnQkKClcbiAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAuc3Vic2NyaWJlKHJlc3AgPT4ge1xuICAgICAgICB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLmV2ZW50c0NvbnRyb2xsZXIuY2xvc2UoKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzVG9DbG9zaW5nRGVsYXk/LnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5zdWJUaW1lcj8udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIGdldEljb25DbGFzc2VzKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIChcbiAgICAgICdpY29uLXR5cGUtdG9hc3QgJyArXG4gICAgICB0aGlzLmxheW91dEhlbHBlci5nZXRJY29uQ2xhc3NlcyhcbiAgICAgICAgdGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy50b2FzdENvcmVDb25maWcubGF5b3V0VHlwZSxcbiAgICAgICAgdGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy50b2FzdENvcmVDb25maWcuaWNvblN0eWxlQ2xhc3NcbiAgICAgIClcbiAgICApO1xuICB9XG59XG4iXX0=