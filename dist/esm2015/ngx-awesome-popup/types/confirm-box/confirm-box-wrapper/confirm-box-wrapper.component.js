import { ChangeDetectorRef, Component, Inject, ViewChild, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { boxAnimations } from '../../../core/animations/box.animations';
import { fadeInOut } from '../../../core/animations/fade-in-out.animation';
import { LayoutHelperService } from '../../../core/layout-helper.service';
import { ConfirmBoxBelonging, ConfirmBoxDefaultResponse } from '../core/classes';
export class ConfirmBoxWrapperComponent {
    constructor(confirmBoxBelonging, cd, layoutHelper) {
        this.confirmBoxBelonging = confirmBoxBelonging;
        this.cd = cd;
        this.layoutHelper = layoutHelper;
        this.fadeInOutAnimation = 'open';
        setTimeout(() => {
            this.boxAnimation = this.confirmBoxBelonging.confirmBoxCoreConfig.animationIn;
        }, 1);
    }
    ngAfterViewInit() {
        this.setResponse(false);
        this.cd.detectChanges();
        this.setCustomStyles();
    }
    setResponse(_IsSuccess, _ClickedButtonID) {
        const response = new ConfirmBoxDefaultResponse();
        if (_ClickedButtonID) {
            response.clickedButtonID = _ClickedButtonID;
        }
        response.setSuccess(_IsSuccess);
        response.setBelonging(this.confirmBoxBelonging);
        this.confirmBoxBelonging.eventsController.setDefaultResponse(response);
    }
    onOverlayClicked(evt) {
        // console.log('onOverlayClicked');
    }
    onCustomButton(_Button) {
        this.confirmBoxBelonging.eventsController.onButtonClick(_Button);
        this.setResponse(true, _Button.ID);
        this.confirmBoxBelonging.eventsController.close();
    }
    onButtonClick(_Type) {
        let buttonID;
        if (_Type === 'confirm') {
            buttonID = this.confirmBoxBelonging.confirmBoxCoreConfig.confirmLabel.toLowerCase();
        }
        else if (_Type === 'decline') {
            buttonID = this.confirmBoxBelonging.confirmBoxCoreConfig.declineLabel.toLowerCase();
        }
        this.setResponse(_Type === 'confirm', buttonID);
        this.confirmBoxBelonging.eventsController.close();
    }
    closeParent$() {
        this.boxAnimation = this.confirmBoxBelonging.confirmBoxCoreConfig.animationOut;
        const closeDuration = this.confirmBoxBelonging.confirmBoxCoreConfig.animationOut ? 800 : 200;
        this.fadeInOutAnimation = 'close-fast';
        return new Observable((observer) => {
            observer.next('');
            observer.complete();
        }).pipe(delay(closeDuration));
    }
    setCustomStyles() {
        if (this.confirmBoxBelonging.confirmBoxCoreConfig.customStyles.wrapperCSS && this.elConfirmBoxWrapper) {
            this.elConfirmBoxWrapper.nativeElement.style.cssText += this.confirmBoxBelonging.confirmBoxCoreConfig.customStyles.wrapperCSS;
        }
        if (this.confirmBoxBelonging.confirmBoxCoreConfig.customStyles.textCSS && this.elTextWrapper) {
            this.elTextWrapper.nativeElement.style.cssText += this.confirmBoxBelonging.confirmBoxCoreConfig.customStyles.textCSS;
        }
        if (this.confirmBoxBelonging.confirmBoxCoreConfig.customStyles.titleCSS && this.elTitleWrapper) {
            this.elTitleWrapper.nativeElement.style.cssText += this.confirmBoxBelonging.confirmBoxCoreConfig.customStyles.titleCSS;
        }
        if (this.confirmBoxBelonging.confirmBoxCoreConfig.customStyles.buttonSectionCSS && this.elButtonWrapper) {
            this.elButtonWrapper.nativeElement.style.cssText += this.confirmBoxBelonging.confirmBoxCoreConfig.customStyles.buttonSectionCSS;
        }
        if (this.confirmBoxBelonging.confirmBoxCoreConfig.customStyles.buttonCSS && this.elButton) {
            this.elButton.forEach(el => {
                el.nativeElement.style.cssText += this.confirmBoxBelonging.confirmBoxCoreConfig.customStyles.buttonCSS;
            });
        }
    }
    getIconClasses() {
        return ('icon-type-confirm-box  ' +
            this.layoutHelper.getIconClasses(this.confirmBoxBelonging.confirmBoxCoreConfig.layoutType, this.confirmBoxBelonging.confirmBoxCoreConfig.iconStyleClass));
    }
    getButtonClasses(layoutType) {
        return this.layoutHelper.getButtonClasses(layoutType);
    }
}
ConfirmBoxWrapperComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-confirm-box-wrapper',
                template: "<div\n  class=\"ngx-awesome-popup-overlay confirm-box-overlay\"\n  (dblclick)=\"onOverlayClicked($event)\"\n  [@fadeInOut]=\"{\n    value: fadeInOutAnimation,\n    params: {\n      closeDelay: confirmBoxBelonging.confirmBoxCoreConfig.animationOut === 0 ? '200ms' : '300ms'\n    }\n  }\">\n  <div\n    [@.disabled]=\"confirmBoxBelonging.confirmBoxCoreConfig.animationIn === 0 && confirmBoxBelonging.confirmBoxCoreConfig.animationOut === 0\"\n    [@boxAnimations]=\"boxAnimation\"\n    #elConfirmBoxWrapper\n    [className]=\"layoutHelper.getBoxClasses(confirmBoxBelonging.confirmBoxCoreConfig.layoutType, 'evolve-confirm-box')\"\n    [ngStyle]=\"{\n      width: confirmBoxBelonging.confirmBoxCoreConfig.width,\n      height: confirmBoxBelonging.confirmBoxCoreConfig.height,\n      opacity: confirmBoxBelonging.confirmBoxCoreConfig.animationIn === 0 ? 1 : 0\n    }\">\n    <div class=\"confirm-box-title-content\" #elTitleWrapper *ngIf=\"confirmBoxBelonging.dispatch.title\">\n      <div class=\"dont-break-out\">\n        <div class=\"text-wrapper dont-break-out\">\n          <div class=\"confirm-box-title-text\">\n            {{ confirmBoxBelonging.dispatch.title }}\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div\n      class=\"content-holder\"\n      #elTextWrapper\n      [ngClass]=\"confirmBoxBelonging.dispatch.title ? '' : 'without-title'\"\n      *ngIf=\"confirmBoxBelonging.dispatch.message\">\n      <div class=\"icon-section\" *ngIf=\"!confirmBoxBelonging.confirmBoxCoreConfig.disableIcon\">\n        <span [className]=\"getIconClasses()\"></span>\n      </div>\n      <div class=\"text-wrapper-section confirm-box-inner-content\">\n        <div class=\"dont-break-out\">\n          <div class=\"text-wrapper dont-break-out\" *ngIf=\"!confirmBoxBelonging.confirmBoxCoreConfig.allowHtmlMessage\">\n            {{ confirmBoxBelonging.dispatch.message }}\n          </div>\n          <div\n            class=\"text-wrapper\"\n            *ngIf=\"confirmBoxBelonging.confirmBoxCoreConfig.allowHtmlMessage\"\n            [innerHTML]=\"confirmBoxBelonging.dispatch.message\"></div>\n        </div>\n      </div>\n    </div>\n    <div class=\"button-holder\" #elButtonWrapper>\n      <div\n        class=\"button-section\"\n        *ngIf=\"confirmBoxBelonging.buttons.length\"\n        [ngStyle]=\"{\n          'text-align': confirmBoxBelonging.confirmBoxCoreConfig.buttonPosition\n        }\">\n        <button\n          #elButton\n          *ngFor=\"let button of confirmBoxBelonging.buttons\"\n          (click)=\"onCustomButton(button)\"\n          [className]=\"layoutHelper.getButtonClasses(button.layoutType, 'ed-btn ed-btn-md')\">\n          {{ button.label }}\n        </button>\n      </div>\n      <div\n        class=\"button-section\"\n        *ngIf=\"!confirmBoxBelonging.buttons.length\"\n        [ngStyle]=\"{\n          'text-align': confirmBoxBelonging.confirmBoxCoreConfig.buttonPosition\n        }\">\n        <button\n          class=\"ed-btn ed-btn-md\"\n          #elButton\n          (click)=\"onButtonClick('confirm')\"\n          [className]=\"\n            layoutHelper.getButtonClasses(confirmBoxBelonging.confirmBoxCoreConfig.layoutType, 'ed-btn ed-btn-md', 'auto-button')\n          \">\n          {{ confirmBoxBelonging.confirmBoxCoreConfig.confirmLabel }}\n        </button>\n        <button\n          class=\"ed-btn ed-btn-md ed-btn-secondary\"\n          #elButton\n          (click)=\"onButtonClick('decline')\"\n          *ngIf=\"confirmBoxBelonging.confirmBoxCoreConfig.declineLabel\">\n          {{ confirmBoxBelonging.confirmBoxCoreConfig.declineLabel }}\n        </button>\n      </div>\n    </div>\n  </div>\n</div>\n",
                animations: [fadeInOut(), boxAnimations()],
                providers: [LayoutHelperService]
            },] }
];
ConfirmBoxWrapperComponent.ctorParameters = () => [
    { type: ConfirmBoxBelonging, decorators: [{ type: Inject, args: ['confirmBoxBelonging',] }] },
    { type: ChangeDetectorRef },
    { type: LayoutHelperService }
];
ConfirmBoxWrapperComponent.propDecorators = {
    elConfirmBoxWrapper: [{ type: ViewChild, args: ['elConfirmBoxWrapper',] }],
    elTextWrapper: [{ type: ViewChild, args: ['elTextWrapper',] }],
    elTitleWrapper: [{ type: ViewChild, args: ['elTitleWrapper',] }],
    elButtonWrapper: [{ type: ViewChild, args: ['elButtonWrapper',] }],
    elButton: [{ type: ViewChildren, args: ['elButton',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlybS1ib3gtd3JhcHBlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9uZ3gtYXdlc29tZS1wb3B1cC90eXBlcy9jb25maXJtLWJveC9jb25maXJtLWJveC13cmFwcGVyL2NvbmZpcm0tYm94LXdyYXBwZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBaUIsaUJBQWlCLEVBQUUsU0FBUyxFQUFjLE1BQU0sRUFBYSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BJLE9BQU8sRUFBRSxVQUFVLEVBQVksTUFBTSxNQUFNLENBQUM7QUFDNUMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFHM0UsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDMUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLHlCQUF5QixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFRakYsTUFBTSxPQUFPLDBCQUEwQjtJQVNyQyxZQUVTLG1CQUF3QyxFQUN2QyxFQUFxQixFQUN0QixZQUFpQztRQUZqQyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3ZDLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBQ3RCLGlCQUFZLEdBQVosWUFBWSxDQUFxQjtRQVAxQyx1QkFBa0IsR0FBRyxNQUFNLENBQUM7UUFTMUIsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNkLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLG9CQUFvQixDQUFDLFdBQVcsQ0FBQztRQUNoRixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDUixDQUFDO0lBRUQsZUFBZTtRQUNi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QUFJLENBQUMsbUJBQW1CLENBQUMsb0JBQW9CLENBQUMsY0FBYyxDQUM3RCxDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQsZ0JBQWdCLENBQUMsVUFBc0M7UUFDckQsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3hELENBQUM7OztZQTVHRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjtnQkFDbkMsc25IQUFtRDtnQkFDbkQsVUFBVSxFQUFFLENBQUMsU0FBUyxFQUFFLEVBQUUsYUFBYSxFQUFFLENBQUM7Z0JBQzFDLFNBQVMsRUFBRSxDQUFDLG1CQUFtQixDQUFDO2FBQ2pDOzs7WUFQUSxtQkFBbUIsdUJBa0J2QixNQUFNLFNBQUMscUJBQXFCO1lBMUJULGlCQUFpQjtZQU9oQyxtQkFBbUI7OztrQ0FVekIsU0FBUyxTQUFDLHFCQUFxQjs0QkFDL0IsU0FBUyxTQUFDLGVBQWU7NkJBQ3pCLFNBQVMsU0FBQyxnQkFBZ0I7OEJBQzFCLFNBQVMsU0FBQyxpQkFBaUI7dUJBQzNCLFlBQVksU0FBQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgSW5qZWN0LCBRdWVyeUxpc3QsIFZpZXdDaGlsZCwgVmlld0NoaWxkcmVuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBPYnNlcnZlciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVsYXkgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBib3hBbmltYXRpb25zIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9hbmltYXRpb25zL2JveC5hbmltYXRpb25zJztcbmltcG9ydCB7IGZhZGVJbk91dCB9IGZyb20gJy4uLy4uLy4uL2NvcmUvYW5pbWF0aW9ucy9mYWRlLWluLW91dC5hbmltYXRpb24nO1xuaW1wb3J0IHsgQXBwZWFyYW5jZUFuaW1hdGlvbiwgQnV0dG9uTGF5b3V0RGlzcGxheSwgRGlzYXBwZWFyYW5jZUFuaW1hdGlvbiB9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW51bXMnO1xuaW1wb3J0IHsgSUJ1dHRvbiB9IGZyb20gJy4uLy4uLy4uL2NvcmUvZ2xvYmFsLWludGVyZmFjZXMnO1xuaW1wb3J0IHsgTGF5b3V0SGVscGVyU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvbGF5b3V0LWhlbHBlci5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpcm1Cb3hCZWxvbmdpbmcsIENvbmZpcm1Cb3hEZWZhdWx0UmVzcG9uc2UgfSBmcm9tICcuLi9jb3JlL2NsYXNzZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtY29uZmlybS1ib3gtd3JhcHBlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9jb25maXJtLWJveC13cmFwcGVyLmNvbXBvbmVudC5odG1sJyxcbiAgYW5pbWF0aW9uczogW2ZhZGVJbk91dCgpLCBib3hBbmltYXRpb25zKCldLFxuICBwcm92aWRlcnM6IFtMYXlvdXRIZWxwZXJTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBDb25maXJtQm94V3JhcHBlckNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICBAVmlld0NoaWxkKCdlbENvbmZpcm1Cb3hXcmFwcGVyJykgZWxDb25maXJtQm94V3JhcHBlcjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnZWxUZXh0V3JhcHBlcicpIGVsVGV4dFdyYXBwZXI6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ2VsVGl0bGVXcmFwcGVyJykgZWxUaXRsZVdyYXBwZXI6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ2VsQnV0dG9uV3JhcHBlcicpIGVsQnV0dG9uV3JhcHBlcjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZHJlbignZWxCdXR0b24nKSBlbEJ1dHRvbjogUXVlcnlMaXN0PEVsZW1lbnRSZWY+O1xuICBmYWRlSW5PdXRBbmltYXRpb24gPSAnb3Blbic7XG4gIGJveEFuaW1hdGlvbjogQXBwZWFyYW5jZUFuaW1hdGlvbiB8IERpc2FwcGVhcmFuY2VBbmltYXRpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdCgnY29uZmlybUJveEJlbG9uZ2luZycpXG4gICAgcHVibGljIGNvbmZpcm1Cb3hCZWxvbmdpbmc6IENvbmZpcm1Cb3hCZWxvbmdpbmcsXG4gICAgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHVibGljIGxheW91dEhlbHBlcjogTGF5b3V0SGVscGVyU2VydmljZVxuICApIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuYm94QW5pbWF0aW9uID0gdGhpcy5jb25maXJtQm94QmVsb25naW5nLmNvbmZpcm1Cb3hDb3JlQ29uZmlnLmFuaW1hdGlvbkluO1xuICAgIH0sIDEpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuc2V0UmVzcG9uc2UoZmFsc2UpO1xuICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIHRoaXMuc2V0Q3VzdG9tU3R5bGVzKCk7XG4gIH1cblxuICBzZXRSZXNwb25zZShfSXNTdWNjZXNzOiBib29sZWFuLCBfQ2xpY2tlZEJ1dHRvbklEPzogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBuZXcgQ29uZmlybUJveERlZmF1bHRSZXNwb25zZSgpO1xuICAgIGlmIChfQ2xpY2tlZEJ1dHRvbklEKSB7XG4gICAgICByZXNwb25zZS5jbGlja2VkQnV0dG9uSUQgPSBfQ2xpY2tlZEJ1dHRvbklEO1xuICAgIH1cblxuICAgIHJlc3BvbnNlLnNldFN1Y2Nlc3MoX0lzU3VjY2Vzcyk7XG4gICAgcmVzcG9uc2Uuc2V0QmVsb25naW5nKHRoaXMuY29uZmlybUJveEJlbG9uZ2luZyk7XG4gICAgdGhpcy5jb25maXJtQm94QmVsb25naW5nLmV2ZW50c0NvbnRyb2xsZXIuc2V0RGVmYXVsdFJlc3BvbnNlKHJlc3BvbnNlKTtcbiAgfVxuXG4gIG9uT3ZlcmxheUNsaWNrZWQoZXZ0OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgLy8gY29uc29sZS5sb2coJ29uT3ZlcmxheUNsaWNrZWQnKTtcbiAgfVxuXG4gIG9uQ3VzdG9tQnV0dG9uKF9CdXR0b246IElCdXR0b24pOiB2b2lkIHtcbiAgICB0aGlzLmNvbmZpcm1Cb3hCZWxvbmdpbmcuZXZlbnRzQ29udHJvbGxlci5vbkJ1dHRvbkNsaWNrKF9CdXR0b24pO1xuICAgIHRoaXMuc2V0UmVzcG9uc2UodHJ1ZSwgX0J1dHRvbi5JRCk7XG4gICAgdGhpcy5jb25maXJtQm94QmVsb25naW5nLmV2ZW50c0NvbnRyb2xsZXIuY2xvc2UoKTtcbiAgfVxuXG4gIG9uQnV0dG9uQ2xpY2soX1R5cGU6ICdjb25maXJtJyB8ICdkZWNsaW5lJyk6IHZvaWQge1xuICAgIGxldCBidXR0b25JRDtcbiAgICBpZiAoX1R5cGUgPT09ICdjb25maXJtJykge1xuICAgICAgYnV0dG9uSUQgPSB0aGlzLmNvbmZpcm1Cb3hCZWxvbmdpbmcuY29uZmlybUJveENvcmVDb25maWcuY29uZmlybUxhYmVsLnRvTG93ZXJDYXNlKCk7XG4gICAgfSBlbHNlIGlmIChfVHlwZSA9PT0gJ2RlY2xpbmUnKSB7XG4gICAgICBidXR0b25JRCA9IHRoaXMuY29uZmlybUJveEJlbG9uZ2luZy5jb25maXJtQm94Q29yZUNvbmZpZy5kZWNsaW5lTGFiZWwudG9Mb3dlckNhc2UoKTtcbiAgICB9XG5cbiAgICB0aGlzLnNldFJlc3BvbnNlKF9UeXBlID09PSAnY29uZmlybScsIGJ1dHRvbklEKTtcblxuICAgIHRoaXMuY29uZmlybUJveEJlbG9uZ2luZy5ldmVudHNDb250cm9sbGVyLmNsb3NlKCk7XG4gIH1cblxuICBjbG9zZVBhcmVudCQoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICB0aGlzLmJveEFuaW1hdGlvbiA9IHRoaXMuY29uZmlybUJveEJlbG9uZ2luZy5jb25maXJtQm94Q29yZUNvbmZpZy5hbmltYXRpb25PdXQ7XG4gICAgY29uc3QgY2xvc2VEdXJhdGlvbiA9IHRoaXMuY29uZmlybUJveEJlbG9uZ2luZy5jb25maXJtQm94Q29yZUNvbmZpZy5hbmltYXRpb25PdXQgPyA4MDAgOiAyMDA7XG4gICAgdGhpcy5mYWRlSW5PdXRBbmltYXRpb24gPSAnY2xvc2UtZmFzdCc7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcjogT2JzZXJ2ZXI8YW55PikgPT4ge1xuICAgICAgb2JzZXJ2ZXIubmV4dCgnJyk7XG4gICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgIH0pLnBpcGUoZGVsYXkoY2xvc2VEdXJhdGlvbikpO1xuICB9XG5cbiAgc2V0Q3VzdG9tU3R5bGVzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNvbmZpcm1Cb3hCZWxvbmdpbmcuY29uZmlybUJveENvcmVDb25maWcuY3VzdG9tU3R5bGVzLndyYXBwZXJDU1MgJiYgdGhpcy5lbENvbmZpcm1Cb3hXcmFwcGVyKSB7XG4gICAgICB0aGlzLmVsQ29uZmlybUJveFdyYXBwZXIubmF0aXZlRWxlbWVudC5zdHlsZS5jc3NUZXh0ICs9IHRoaXMuY29uZmlybUJveEJlbG9uZ2luZy5jb25maXJtQm94Q29yZUNvbmZpZy5jdXN0b21TdHlsZXMud3JhcHBlckNTUztcbiAgICB9XG4gICAgaWYgKHRoaXMuY29uZmlybUJveEJlbG9uZ2luZy5jb25maXJtQm94Q29yZUNvbmZpZy5jdXN0b21TdHlsZXMudGV4dENTUyAmJiB0aGlzLmVsVGV4dFdyYXBwZXIpIHtcbiAgICAgIHRoaXMuZWxUZXh0V3JhcHBlci5uYXRpdmVFbGVtZW50LnN0eWxlLmNzc1RleHQgKz0gdGhpcy5jb25maXJtQm94QmVsb25naW5nLmNvbmZpcm1Cb3hDb3JlQ29uZmlnLmN1c3RvbVN0eWxlcy50ZXh0Q1NTO1xuICAgIH1cbiAgICBpZiAodGhpcy5jb25maXJtQm94QmVsb25naW5nLmNvbmZpcm1Cb3hDb3JlQ29uZmlnLmN1c3RvbVN0eWxlcy50aXRsZUNTUyAmJiB0aGlzLmVsVGl0bGVXcmFwcGVyKSB7XG4gICAgICB0aGlzLmVsVGl0bGVXcmFwcGVyLm5hdGl2ZUVsZW1lbnQuc3R5bGUuY3NzVGV4dCArPSB0aGlzLmNvbmZpcm1Cb3hCZWxvbmdpbmcuY29uZmlybUJveENvcmVDb25maWcuY3VzdG9tU3R5bGVzLnRpdGxlQ1NTO1xuICAgIH1cbiAgICBpZiAodGhpcy5jb25maXJtQm94QmVsb25naW5nLmNvbmZpcm1Cb3hDb3JlQ29uZmlnLmN1c3RvbVN0eWxlcy5idXR0b25TZWN0aW9uQ1NTICYmIHRoaXMuZWxCdXR0b25XcmFwcGVyKSB7XG4gICAgICB0aGlzLmVsQnV0dG9uV3JhcHBlci5uYXRpdmVFbGVtZW50LnN0eWxlLmNzc1RleHQgKz0gdGhpcy5jb25maXJtQm94QmVsb25naW5nLmNvbmZpcm1Cb3hDb3JlQ29uZmlnLmN1c3RvbVN0eWxlcy5idXR0b25TZWN0aW9uQ1NTO1xuICAgIH1cbiAgICBpZiAodGhpcy5jb25maXJtQm94QmVsb25naW5nLmNvbmZpcm1Cb3hDb3JlQ29uZmlnLmN1c3RvbVN0eWxlcy5idXR0b25DU1MgJiYgdGhpcy5lbEJ1dHRvbikge1xuICAgICAgdGhpcy5lbEJ1dHRvbi5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgZWwubmF0aXZlRWxlbWVudC5zdHlsZS5jc3NUZXh0ICs9IHRoaXMuY29uZmlybUJveEJlbG9uZ2luZy5jb25maXJtQm94Q29yZUNvbmZpZy5jdXN0b21TdHlsZXMuYnV0dG9uQ1NTO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0SWNvbkNsYXNzZXMoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gKFxuICAgICAgJ2ljb24tdHlwZS1jb25maXJtLWJveCAgJyArXG4gICAgICB0aGlzLmxheW91dEhlbHBlci5nZXRJY29uQ2xhc3NlcyhcbiAgICAgICAgdGhpcy5jb25maXJtQm94QmVsb25naW5nLmNvbmZpcm1Cb3hDb3JlQ29uZmlnLmxheW91dFR5cGUsXG4gICAgICAgIHRoaXMuY29uZmlybUJveEJlbG9uZ2luZy5jb25maXJtQm94Q29yZUNvbmZpZy5pY29uU3R5bGVDbGFzc1xuICAgICAgKVxuICAgICk7XG4gIH1cblxuICBnZXRCdXR0b25DbGFzc2VzKGxheW91dFR5cGU6IEJ1dHRvbkxheW91dERpc3BsYXkgfCBudWxsKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5sYXlvdXRIZWxwZXIuZ2V0QnV0dG9uQ2xhc3NlcyhsYXlvdXRUeXBlKTtcbiAgfVxufVxuIl19