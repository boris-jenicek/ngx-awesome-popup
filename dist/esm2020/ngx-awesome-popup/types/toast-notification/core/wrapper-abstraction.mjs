import { Directive, Inject, ViewChild, ViewChildren } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { delay, take, tap } from 'rxjs/operators';
import { AppearanceAnimation, DisappearanceAnimation } from '../../../core/enums';
import { Timer } from '../../../core/global-classes';
import { ToastNotificationDefaultResponse } from './classes';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/layout-helper.service";
import * as i2 from "./classes";
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
WrapperAbstraction.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: WrapperAbstraction, deps: [{ token: 'toastNotificationBelonging' }, { token: i1.LayoutHelperService }], target: i0.ɵɵFactoryTarget.Directive });
WrapperAbstraction.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: WrapperAbstraction, viewQueries: [{ propertyName: "elTextWrapper", first: true, predicate: ["elTextWrapper"], descendants: true }, { propertyName: "elTitleWrapper", first: true, predicate: ["elTitleWrapper"], descendants: true }, { propertyName: "elButtonWrapper", first: true, predicate: ["elButtonWrapper"], descendants: true }, { propertyName: "elButton", predicate: ["elButton"], descendants: true }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: WrapperAbstraction, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i2.ToastNotificationBelonging, decorators: [{
                    type: Inject,
                    args: ['toastNotificationBelonging']
                }] }, { type: i1.LayoutHelperService }]; }, propDecorators: { elTextWrapper: [{
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
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JhcHBlci1hYnN0cmFjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL25neC1hd2Vzb21lLXBvcHVwL3R5cGVzL3RvYXN0LW5vdGlmaWNhdGlvbi9jb3JlL3dyYXBwZXItYWJzdHJhY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBYyxNQUFNLEVBQXdCLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0csT0FBTyxFQUFFLGVBQWUsRUFBYyxFQUFFLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2xGLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUlyRCxPQUFPLEVBQThCLGdDQUFnQyxFQUFFLE1BQU0sV0FBVyxDQUFDOzs7O0FBR3pGLE1BQU0sT0FBZ0Isa0JBQWtCO0lBa0J0QyxZQUMrQywwQkFBc0QsRUFDNUYsWUFBaUM7UUFESywrQkFBMEIsR0FBMUIsMEJBQTBCLENBQTRCO1FBQzVGLGlCQUFZLEdBQVosWUFBWSxDQUFxQjtRQW5CbEMsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFDdkIsMEJBQXFCLEdBQUcsS0FBSyxDQUFDO1FBS3RDLHVCQUFrQixHQUFHLE1BQU0sQ0FBQztRQUM1QixrQkFBYSxHQUFHLElBQUksZUFBZSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBR3JELG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBRXZCLFVBQUssR0FBVSxJQUFJLEtBQUssRUFBRSxDQUFDO1FBRTNCLHdCQUFtQixHQUFHLG1CQUFtQixDQUFDO1FBQzFDLDJCQUFzQixHQUFHLHNCQUFzQixDQUFDO1FBTTlDLFVBQVUs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Y0FBYztRQUNaLE9BQU8sQ0FDTCxrQkFBa0I7WUFDbEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQzlCLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxlQUFlLENBQUMsVUFBVSxFQUMxRCxJQUFJLENBQUMsMEJBQTBCLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FDL0QsQ0FDRixDQUFDO0lBQ0osQ0FBQzs7K0dBakxtQixrQkFBa0Isa0JBbUI1Qiw0QkFBNEI7bUdBbkJsQixrQkFBa0I7MkZBQWxCLGtCQUFrQjtrQkFEdkMsU0FBUzs7MEJBb0JMLE1BQU07MkJBQUMsNEJBQTRCOzhFQWhCVixhQUFhO3NCQUF4QyxTQUFTO3VCQUFDLGVBQWU7Z0JBQ0csY0FBYztzQkFBMUMsU0FBUzt1QkFBQyxnQkFBZ0I7Z0JBQ0csZUFBZTtzQkFBNUMsU0FBUzt1QkFBQyxpQkFBaUI7Z0JBQ0YsUUFBUTtzQkFBakMsWUFBWTt1QkFBQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbmplY3QsIE9uRGVzdHJveSwgUXVlcnlMaXN0LCBWaWV3Q2hpbGQsIFZpZXdDaGlsZHJlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBvZiwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWxheSwgdGFrZSwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQXBwZWFyYW5jZUFuaW1hdGlvbiwgRGlzYXBwZWFyYW5jZUFuaW1hdGlvbiB9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW51bXMnO1xuaW1wb3J0IHsgVGltZXIgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2dsb2JhbC1jbGFzc2VzJztcbmltcG9ydCB7IElCdXR0b24gfSBmcm9tICcuLi8uLi8uLi9jb3JlL2dsb2JhbC1pbnRlcmZhY2VzJztcbmltcG9ydCB7IExheW91dEhlbHBlclNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2xheW91dC1oZWxwZXIuc2VydmljZSc7XG5cbmltcG9ydCB7IFRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLCBUb2FzdE5vdGlmaWNhdGlvbkRlZmF1bHRSZXNwb25zZSB9IGZyb20gJy4vY2xhc3Nlcyc7XG5cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFdyYXBwZXJBYnN0cmFjdGlvbiBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgY2xvc2VJc0NsaWNrZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBhdXRvQ2xvc2luZ0hhc1N0YXJ0ZWQgPSBmYWxzZTtcbiAgQFZpZXdDaGlsZCgnZWxUZXh0V3JhcHBlcicpIGVsVGV4dFdyYXBwZXI6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ2VsVGl0bGVXcmFwcGVyJykgZWxUaXRsZVdyYXBwZXI6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ2VsQnV0dG9uV3JhcHBlcicpIGVsQnV0dG9uV3JhcHBlcjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZHJlbignZWxCdXR0b24nKSBlbEJ1dHRvbjogUXVlcnlMaXN0PEVsZW1lbnRSZWY+O1xuICBmYWRlSW5PdXRBbmltYXRpb24gPSAnb3Blbic7XG4gIHRpbWVyU3RhcnRlZCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KCdzdGFydC1jb3VudGVyJyk7XG4gIHN1YnNUb0Nsb3NpbmdEZWxheTogU3Vic2NyaXB0aW9uO1xuICBzdWJUaW1lcjogU3Vic2NyaXB0aW9uO1xuICBpc1RpbWVyU3RhcnRlZCA9IGZhbHNlO1xuICB0aW1lb3V0O1xuICB0aW1lcjogVGltZXIgPSBuZXcgVGltZXIoKTtcbiAgYm94QW5pbWF0aW9uOiBBcHBlYXJhbmNlQW5pbWF0aW9uIHwgRGlzYXBwZWFyYW5jZUFuaW1hdGlvbiB8ICdyZXNldCc7XG4gIGFwcGVhcmFuY2VBbmltYXRpb24gPSBBcHBlYXJhbmNlQW5pbWF0aW9uO1xuICBkaXNhcHBlYXJhbmNlQW5pbWF0aW9uID0gRGlzYXBwZWFyYW5jZUFuaW1hdGlvbjtcblxuICBwcm90ZWN0ZWQgY29uc3RydWN0b3IoXG4gICAgQEluamVjdCgndG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcnKSBwdWJsaWMgdG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmc6IFRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLFxuICAgIHB1YmxpYyBsYXlvdXRIZWxwZXI6IExheW91dEhlbHBlclNlcnZpY2VcbiAgKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmJveEFuaW1hdGlvbiA9IHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcudG9hc3RDb3JlQ29uZmlnLmFuaW1hdGlvbkluO1xuICAgIH0sIDEpO1xuICB9XG5cbiAgZ2V0IGF1dG9DbG9zZUNvbmRpdGlvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy50b2FzdENvcmVDb25maWcuYXV0b0Nsb3NlRGVsYXkgJiZcbiAgICAgICEoXG4gICAgICAgIHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuYnV0dG9ucy5sZW5ndGggfHxcbiAgICAgICAgdGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy50b2FzdENvcmVDb25maWcuZGVjbGluZUxhYmVsIHx8XG4gICAgICAgIHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcudG9hc3RDb3JlQ29uZmlnLmNvbmZpcm1MYWJlbFxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICBnZXQgYnV0dG9uc0V4aXN0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICAhIXRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuYnV0dG9ucy5sZW5ndGggfHxcbiAgICAgICEhdGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy50b2FzdENvcmVDb25maWcuZGVjbGluZUxhYmVsIHx8XG4gICAgICAhIXRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcudG9hc3RDb3JlQ29uZmlnLmNvbmZpcm1MYWJlbFxuICAgICk7XG4gIH1cblxuICBzZXRDdXN0b21TdHlsZXMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcudG9hc3RDb3JlQ29uZmlnLmN1c3RvbVN0eWxlcy50ZXh0Q1NTICYmIHRoaXMuZWxUZXh0V3JhcHBlcikge1xuICAgICAgdGhpcy5lbFRleHRXcmFwcGVyLm5hdGl2ZUVsZW1lbnQuc3R5bGUuY3NzVGV4dCArPSB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLnRvYXN0Q29yZUNvbmZpZy5jdXN0b21TdHlsZXMudGV4dENTUztcbiAgICB9XG4gICAgaWYgKHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcudG9hc3RDb3JlQ29uZmlnLmN1c3RvbVN0eWxlcy50aXRsZUNTUyAmJiB0aGlzLmVsVGl0bGVXcmFwcGVyKSB7XG4gICAgICB0aGlzLmVsVGl0bGVXcmFwcGVyLm5hdGl2ZUVsZW1lbnQuc3R5bGUuY3NzVGV4dCArPSB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLnRvYXN0Q29yZUNvbmZpZy5jdXN0b21TdHlsZXMudGl0bGVDU1M7XG4gICAgfVxuICAgIGlmICh0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLnRvYXN0Q29yZUNvbmZpZy5jdXN0b21TdHlsZXMuYnV0dG9uU2VjdGlvbkNTUyAmJiB0aGlzLmVsQnV0dG9uV3JhcHBlcikge1xuICAgICAgdGhpcy5lbEJ1dHRvbldyYXBwZXIubmF0aXZlRWxlbWVudC5zdHlsZS5jc3NUZXh0ICs9IHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcudG9hc3RDb3JlQ29uZmlnLmN1c3RvbVN0eWxlcy5idXR0b25TZWN0aW9uQ1NTO1xuICAgIH1cbiAgICBpZiAodGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy50b2FzdENvcmVDb25maWcuY3VzdG9tU3R5bGVzLmJ1dHRvbkNTUyAmJiB0aGlzLmVsQnV0dG9uKSB7XG4gICAgICB0aGlzLmVsQnV0dG9uLmZvckVhY2goZWwgPT4ge1xuICAgICAgICBlbC5uYXRpdmVFbGVtZW50LnN0eWxlLmNzc1RleHQgKz0gdGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy50b2FzdENvcmVDb25maWcuY3VzdG9tU3R5bGVzLmJ1dHRvbkNTUztcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG1vdXNlT3ZlcigpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuYnV0dG9uc0V4aXN0ICYmICF0aGlzLmNsb3NlSXNDbGlja2VkICYmICF0aGlzLmF1dG9DbG9zaW5nSGFzU3RhcnRlZCkge1xuICAgICAgdGhpcy50aW1lclN0YXJ0ZWQkLm5leHQoJ3N0b3AtY291bnRlcicpO1xuICAgICAgdGhpcy5mYWRlSW5PdXRBbmltYXRpb24gPSAnb3Blbic7XG4gICAgICB0aGlzLnN1YnNUb0Nsb3NpbmdEZWxheT8udW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMuYm94QW5pbWF0aW9uID0gJ3Jlc2V0JztcbiAgICB9XG4gIH1cblxuICBtb3VzZU91dCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuYnV0dG9uc0V4aXN0ICYmICF0aGlzLmNsb3NlSXNDbGlja2VkICYmICF0aGlzLmF1dG9DbG9zaW5nSGFzU3RhcnRlZCkge1xuICAgICAgdGhpcy50aW1lclN0YXJ0ZWQkLm5leHQoJ3N0YXJ0LWNvdW50ZXInKTtcbiAgICB9XG4gIH1cblxuICBvbk92ZXJsYXlDbGlja2VkKGV2dDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIC8vICBjb25zb2xlLmxvZygnb25PdmVybGF5Q2xpY2tlZCcpO1xuICB9XG5cbiAgb25Ub2FzdENsaWNrZWQoZXZ0OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgLy8gY29uc29sZS5sb2coJ29uT3ZlcmxheUNsaWNrZWQnKTtcbiAgfVxuXG4gIHNldFJlc3BvbnNlKF9Jc1N1Y2Nlc3M6IGJvb2xlYW4sIF9DbGlja2VkQnV0dG9uSUQ/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCByZXNwb25zZSA9IG5ldyBUb2FzdE5vdGlmaWNhdGlvbkRlZmF1bHRSZXNwb25zZSgpO1xuICAgIGlmIChfQ2xpY2tlZEJ1dHRvbklEKSB7XG4gICAgICByZXNwb25zZS5jbGlja2VkQnV0dG9uSUQgPSBfQ2xpY2tlZEJ1dHRvbklEO1xuICAgIH1cblxuICAgIHJlc3BvbnNlLnNldFN1Y2Nlc3MoX0lzU3VjY2Vzcyk7XG4gICAgcmVzcG9uc2Uuc2V0QmVsb25naW5nKHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcpO1xuICAgIHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuZXZlbnRzQ29udHJvbGxlci5zZXREZWZhdWx0UmVzcG9uc2UocmVzcG9uc2UpO1xuICB9XG5cbiAgb25DdXN0b21CdXR0b24oX0J1dHRvbjogSUJ1dHRvbik6IHZvaWQge1xuICAgIHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuZXZlbnRzQ29udHJvbGxlci5vbkJ1dHRvbkNsaWNrKF9CdXR0b24pO1xuICAgIHRoaXMuc2V0UmVzcG9uc2UodHJ1ZSwgX0J1dHRvbi5JRCk7XG4gICAgdGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5ldmVudHNDb250cm9sbGVyLmNsb3NlKCk7XG4gIH1cblxuICBvbkJ1dHRvbkNsaWNrKF9UeXBlOiAnY29uZmlybScgfCAnZGVjbGluZScpOiB2b2lkIHtcbiAgICBsZXQgYnV0dG9uSUQ7XG4gICAgaWYgKF9UeXBlID09PSAnY29uZmlybScpIHtcbiAgICAgIGJ1dHRvbklEID0gdGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy50b2FzdENvcmVDb25maWcuY29uZmlybUxhYmVsLnRvTG93ZXJDYXNlKCk7XG4gICAgfSBlbHNlIGlmIChfVHlwZSA9PT0gJ2RlY2xpbmUnKSB7XG4gICAgICBidXR0b25JRCA9IHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcudG9hc3RDb3JlQ29uZmlnLmRlY2xpbmVMYWJlbC50b0xvd2VyQ2FzZSgpO1xuICAgIH1cblxuICAgIHRoaXMuc2V0UmVzcG9uc2UoX1R5cGUgPT09ICdjb25maXJtJywgYnV0dG9uSUQpO1xuICAgIHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuZXZlbnRzQ29udHJvbGxlci5jbG9zZSgpO1xuICB9XG5cbiAgYXV0b0Nsb3NlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmF1dG9DbG9zZUNvbmRpdGlvbikge1xuICAgICAgdGhpcy50aW1lci5zZXRNaWxsaXNlY29uZHModGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy50b2FzdENvcmVDb25maWcuYXV0b0Nsb3NlRGVsYXkpO1xuICAgICAgdGhpcy5zdWJUaW1lciA9IHRoaXMudGltZXJTdGFydGVkJFxuICAgICAgICAucGlwZShcbiAgICAgICAgICB0YXAobmV4dCA9PiB7XG4gICAgICAgICAgICBpZiAoJ3N0YXJ0LWNvdW50ZXInID09PSBuZXh0KSB7XG4gICAgICAgICAgICAgIHRoaXMudGltZXIuc3RhcnQoKTtcbiAgICAgICAgICAgICAgdGhpcy5pc1RpbWVyU3RhcnRlZCA9IHRydWU7XG4gICAgICAgICAgICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc3Vic1RvQ2xvc2luZ0RlbGF5ID0gdGhpcy5jbG9zZVBhcmVudCQoKS5zdWJzY3JpYmUocmVzcCA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLmV2ZW50c0NvbnRyb2xsZXIuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSwgdGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy50b2FzdENvcmVDb25maWcuYXV0b0Nsb3NlRGVsYXkpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICgnc3RvcC1jb3VudGVyJyA9PT0gbmV4dCkge1xuICAgICAgICAgICAgICBpZiAodGhpcy5pc1RpbWVyU3RhcnRlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMudGltZXIuc3RvcCgpO1xuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNUaW1lclN0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIGNsb3NlUGFyZW50JCgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHRoaXMuYXV0b0Nsb3NpbmdIYXNTdGFydGVkID0gdHJ1ZTtcbiAgICB0aGlzLmJveEFuaW1hdGlvbiA9IHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcudG9hc3RDb3JlQ29uZmlnLmFuaW1hdGlvbk91dDtcbiAgICBjb25zdCBjbG9zZUR1cmF0aW9uID0gdGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy50b2FzdENvcmVDb25maWcuYW5pbWF0aW9uT3V0ID8gNDAwIDogMjAwO1xuICAgIHRoaXMuZmFkZUluT3V0QW5pbWF0aW9uID0gJ2Nsb3NlLWZhc3QnO1xuICAgIHJldHVybiBvZignJykucGlwZShkZWxheShjbG9zZUR1cmF0aW9uKSk7XG4gIH1cblxuICBjbG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLmV2ZW50c0NvbnRyb2xsZXIuY2xvc2UoKTtcbiAgfVxuXG4gIGNsb3NlSWNvbigpOiB2b2lkIHtcbiAgICB0aGlzLmNsb3NlSXNDbGlja2VkID0gdHJ1ZTtcbiAgICB0aGlzLnN1YnNUb0Nsb3NpbmdEZWxheT8udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLmNsb3NlUGFyZW50JCgpXG4gICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgLnN1YnNjcmliZShyZXNwID0+IHtcbiAgICAgICAgdGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5ldmVudHNDb250cm9sbGVyLmNsb3NlKCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic1RvQ2xvc2luZ0RlbGF5Py51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuc3ViVGltZXI/LnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBnZXRJY29uQ2xhc3NlcygpOiBzdHJpbmcge1xuICAgIHJldHVybiAoXG4gICAgICAnaWNvbi10eXBlLXRvYXN0ICcgK1xuICAgICAgdGhpcy5sYXlvdXRIZWxwZXIuZ2V0SWNvbkNsYXNzZXMoXG4gICAgICAgIHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcudG9hc3RDb3JlQ29uZmlnLmxheW91dFR5cGUsXG4gICAgICAgIHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcudG9hc3RDb3JlQ29uZmlnLmljb25TdHlsZUNsYXNzXG4gICAgICApXG4gICAgKTtcbiAgfVxufVxuIl19