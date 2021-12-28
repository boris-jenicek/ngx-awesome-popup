import { ChangeDetectorRef, Component, Inject, ViewChild, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { boxAnimations } from '../../../core/animations/box.animations';
import { fadeInOut } from '../../../core/animations/fade-in-out.animation';
import { AppearanceAnimation, DisappearanceAnimation } from '../../../core/enums';
import { LayoutHelperService } from '../../../core/layout-helper.service';
import { ConfirmBoxBelonging, ConfirmBoxDefaultResponse } from '../core/classes';
export class ConfirmBoxWrapperComponent {
    constructor(confirmBoxBelonging, cd, layoutHelper) {
        this.confirmBoxBelonging = confirmBoxBelonging;
        this.cd = cd;
        this.layoutHelper = layoutHelper;
        this.fadeInOutAnimation = 'open';
        this.appearanceAnimation = AppearanceAnimation;
        this.disappearanceAnimation = DisappearanceAnimation;
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
                template: "<div\n  class=\"ngx-awesome-popup-overlay confirm-box-overlay\"\n  (dblclick)=\"onOverlayClicked($event)\"\n  [@fadeInOut]=\"{\n    value: fadeInOutAnimation,\n    params: {\n      closeDelay: confirmBoxBelonging.confirmBoxCoreConfig.animationOut === disappearanceAnimation.NONE ? '200ms' : '300ms'\n    }\n  }\">\n  <div\n    [@.disabled]=\"\n      confirmBoxBelonging.confirmBoxCoreConfig.animationIn === appearanceAnimation.NONE &&\n      confirmBoxBelonging.confirmBoxCoreConfig.animationOut === disappearanceAnimation.NONE\n    \"\n    [@boxAnimations]=\"boxAnimation\"\n    #elConfirmBoxWrapper\n    [className]=\"layoutHelper.getBoxClasses(confirmBoxBelonging.confirmBoxCoreConfig.layoutType, 'evolve-confirm-box')\"\n    [ngStyle]=\"{\n      width: confirmBoxBelonging.confirmBoxCoreConfig.width,\n      height: confirmBoxBelonging.confirmBoxCoreConfig.height,\n      opacity: confirmBoxBelonging.confirmBoxCoreConfig.animationIn === appearanceAnimation.NONE ? 1 : 0\n    }\">\n    <div class=\"confirm-box-title-content\" #elTitleWrapper *ngIf=\"confirmBoxBelonging.dispatch.title\">\n      <div class=\"dont-break-out\">\n        <div class=\"text-wrapper dont-break-out\">\n          <div class=\"confirm-box-title-text\">\n            {{ confirmBoxBelonging.dispatch.title }}\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div\n      class=\"content-holder\"\n      #elTextWrapper\n      [ngClass]=\"confirmBoxBelonging.dispatch.title ? '' : 'without-title'\"\n      *ngIf=\"confirmBoxBelonging.dispatch.message\">\n      <div class=\"icon-section\" *ngIf=\"!confirmBoxBelonging.confirmBoxCoreConfig.disableIcon\">\n        <span [className]=\"getIconClasses()\"></span>\n      </div>\n      <div class=\"text-wrapper-section confirm-box-inner-content\">\n        <div class=\"dont-break-out\">\n          <div class=\"text-wrapper\" [innerHTML]=\"confirmBoxBelonging.dispatch.message\"></div>\n        </div>\n      </div>\n    </div>\n    <div class=\"button-holder\" #elButtonWrapper>\n      <div\n        class=\"button-section\"\n        *ngIf=\"confirmBoxBelonging.buttons.length\"\n        [ngStyle]=\"{\n          'text-align': confirmBoxBelonging.confirmBoxCoreConfig.buttonPosition\n        }\">\n        <button\n          #elButton\n          *ngFor=\"let button of confirmBoxBelonging.buttons\"\n          (click)=\"onCustomButton(button)\"\n          [className]=\"layoutHelper.getButtonClasses(button.layoutType, 'ed-btn ed-btn-md')\">\n          {{ button.label }}\n        </button>\n      </div>\n      <div\n        class=\"button-section\"\n        *ngIf=\"!confirmBoxBelonging.buttons.length\"\n        [ngStyle]=\"{\n          'text-align': confirmBoxBelonging.confirmBoxCoreConfig.buttonPosition\n        }\">\n        <button\n          class=\"ed-btn ed-btn-md\"\n          #elButton\n          (click)=\"onButtonClick('confirm')\"\n          [className]=\"\n            layoutHelper.getButtonClasses(confirmBoxBelonging.confirmBoxCoreConfig.layoutType, 'ed-btn ed-btn-md', 'auto-button')\n          \">\n          {{ confirmBoxBelonging.confirmBoxCoreConfig.confirmLabel }}\n        </button>\n        <button\n          class=\"ed-btn ed-btn-md ed-btn-secondary\"\n          #elButton\n          (click)=\"onButtonClick('decline')\"\n          *ngIf=\"confirmBoxBelonging.confirmBoxCoreConfig.declineLabel\">\n          {{ confirmBoxBelonging.confirmBoxCoreConfig.declineLabel }}\n        </button>\n      </div>\n    </div>\n  </div>\n</div>\n",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlybS1ib3gtd3JhcHBlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9uZ3gtYXdlc29tZS1wb3B1cC90eXBlcy9jb25maXJtLWJveC9jb25maXJtLWJveC13cmFwcGVyL2NvbmZpcm0tYm94LXdyYXBwZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBaUIsaUJBQWlCLEVBQUUsU0FBUyxFQUFjLE1BQU0sRUFBYSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BJLE9BQU8sRUFBRSxVQUFVLEVBQVksTUFBTSxNQUFNLENBQUM7QUFDNUMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDM0UsT0FBTyxFQUFFLG1CQUFtQixFQUF1QixzQkFBc0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXZHLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBUWpGLE1BQU0sT0FBTywwQkFBMEI7SUFXckMsWUFFUyxtQkFBd0MsRUFDdkMsRUFBcUIsRUFDdEIsWUFBaUM7UUFGakMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN2QyxPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQUN0QixpQkFBWSxHQUFaLFlBQVksQ0FBcUI7UUFUMUMsdUJBQWtCLEdBQUcsTUFBTSxDQUFDO1FBRTVCLHdCQUFtQixHQUFHLG1CQUFtQixDQUFDO1FBQzFDLDJCQUFzQixHQUFHLHNCQUFzQixDQUFDO1FBUTlDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxJ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QUM7SUFFRCxjQUFjO1FBQ1osT0FBTyxDQUNMLHlCQUF5QjtZQUN6QixJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FDOUIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLG9CQUFvQixDQUFDLFVBQVUsRUFDeEQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLG9CQUFvQixDQUFDLGNBQWMsQ0FDN0QsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUVELGdCQUFnQixDQUFDLFVBQXNDO1FBQ3JELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN4RCxDQUFDOzs7WUE5R0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx5QkFBeUI7Z0JBQ25DLDQ3R0FBbUQ7Z0JBQ25ELFVBQVUsRUFBRSxDQUFDLFNBQVMsRUFBRSxFQUFFLGFBQWEsRUFBRSxDQUFDO2dCQUMxQyxTQUFTLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQzthQUNqQzs7O1lBUFEsbUJBQW1CLHVCQW9CdkIsTUFBTSxTQUFDLHFCQUFxQjtZQTVCVCxpQkFBaUI7WUFPaEMsbUJBQW1COzs7a0NBVXpCLFNBQVMsU0FBQyxxQkFBcUI7NEJBQy9CLFNBQVMsU0FBQyxlQUFlOzZCQUN6QixTQUFTLFNBQUMsZ0JBQWdCOzhCQUMxQixTQUFTLFNBQUMsaUJBQWlCO3VCQUMzQixZQUFZLFNBQUMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEluamVjdCwgUXVlcnlMaXN0LCBWaWV3Q2hpbGQsIFZpZXdDaGlsZHJlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgT2JzZXJ2ZXIgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlbGF5IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgYm94QW5pbWF0aW9ucyB9IGZyb20gJy4uLy4uLy4uL2NvcmUvYW5pbWF0aW9ucy9ib3guYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBmYWRlSW5PdXQgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2FuaW1hdGlvbnMvZmFkZS1pbi1vdXQuYW5pbWF0aW9uJztcbmltcG9ydCB7IEFwcGVhcmFuY2VBbmltYXRpb24sIEJ1dHRvbkxheW91dERpc3BsYXksIERpc2FwcGVhcmFuY2VBbmltYXRpb24gfSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudW1zJztcbmltcG9ydCB7IElCdXR0b24gfSBmcm9tICcuLi8uLi8uLi9jb3JlL2dsb2JhbC1pbnRlcmZhY2VzJztcbmltcG9ydCB7IExheW91dEhlbHBlclNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2xheW91dC1oZWxwZXIuc2VydmljZSc7XG5pbXBvcnQgeyBDb25maXJtQm94QmVsb25naW5nLCBDb25maXJtQm94RGVmYXVsdFJlc3BvbnNlIH0gZnJvbSAnLi4vY29yZS9jbGFzc2VzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLWNvbmZpcm0tYm94LXdyYXBwZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vY29uZmlybS1ib3gtd3JhcHBlci5jb21wb25lbnQuaHRtbCcsXG4gIGFuaW1hdGlvbnM6IFtmYWRlSW5PdXQoKSwgYm94QW5pbWF0aW9ucygpXSxcbiAgcHJvdmlkZXJzOiBbTGF5b3V0SGVscGVyU2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgQ29uZmlybUJveFdyYXBwZXJDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgQFZpZXdDaGlsZCgnZWxDb25maXJtQm94V3JhcHBlcicpIGVsQ29uZmlybUJveFdyYXBwZXI6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ2VsVGV4dFdyYXBwZXInKSBlbFRleHRXcmFwcGVyOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdlbFRpdGxlV3JhcHBlcicpIGVsVGl0bGVXcmFwcGVyOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdlbEJ1dHRvbldyYXBwZXInKSBlbEJ1dHRvbldyYXBwZXI6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGRyZW4oJ2VsQnV0dG9uJykgZWxCdXR0b246IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPjtcbiAgZmFkZUluT3V0QW5pbWF0aW9uID0gJ29wZW4nO1xuICBib3hBbmltYXRpb246IEFwcGVhcmFuY2VBbmltYXRpb24gfCBEaXNhcHBlYXJhbmNlQW5pbWF0aW9uO1xuICBhcHBlYXJhbmNlQW5pbWF0aW9uID0gQXBwZWFyYW5jZUFuaW1hdGlvbjtcbiAgZGlzYXBwZWFyYW5jZUFuaW1hdGlvbiA9IERpc2FwcGVhcmFuY2VBbmltYXRpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdCgnY29uZmlybUJveEJlbG9uZ2luZycpXG4gICAgcHVibGljIGNvbmZpcm1Cb3hCZWxvbmdpbmc6IENvbmZpcm1Cb3hCZWxvbmdpbmcsXG4gICAgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHVibGljIGxheW91dEhlbHBlcjogTGF5b3V0SGVscGVyU2VydmljZVxuICApIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuYm94QW5pbWF0aW9uID0gdGhpcy5jb25maXJtQm94QmVsb25naW5nLmNvbmZpcm1Cb3hDb3JlQ29uZmlnLmFuaW1hdGlvbkluO1xuICAgIH0sIDEpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuc2V0UmVzcG9uc2UoZmFsc2UpO1xuICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIHRoaXMuc2V0Q3VzdG9tU3R5bGVzKCk7XG4gIH1cblxuICBzZXRSZXNwb25zZShfSXNTdWNjZXNzOiBib29sZWFuLCBfQ2xpY2tlZEJ1dHRvbklEPzogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBuZXcgQ29uZmlybUJveERlZmF1bHRSZXNwb25zZSgpO1xuICAgIGlmIChfQ2xpY2tlZEJ1dHRvbklEKSB7XG4gICAgICByZXNwb25zZS5jbGlja2VkQnV0dG9uSUQgPSBfQ2xpY2tlZEJ1dHRvbklEO1xuICAgIH1cblxuICAgIHJlc3BvbnNlLnNldFN1Y2Nlc3MoX0lzU3VjY2Vzcyk7XG4gICAgcmVzcG9uc2Uuc2V0QmVsb25naW5nKHRoaXMuY29uZmlybUJveEJlbG9uZ2luZyk7XG4gICAgdGhpcy5jb25maXJtQm94QmVsb25naW5nLmV2ZW50c0NvbnRyb2xsZXIuc2V0RGVmYXVsdFJlc3BvbnNlKHJlc3BvbnNlKTtcbiAgfVxuXG4gIG9uT3ZlcmxheUNsaWNrZWQoZXZ0OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgLy8gY29uc29sZS5sb2coJ29uT3ZlcmxheUNsaWNrZWQnKTtcbiAgfVxuXG4gIG9uQ3VzdG9tQnV0dG9uKF9CdXR0b246IElCdXR0b24pOiB2b2lkIHtcbiAgICB0aGlzLmNvbmZpcm1Cb3hCZWxvbmdpbmcuZXZlbnRzQ29udHJvbGxlci5vbkJ1dHRvbkNsaWNrKF9CdXR0b24pO1xuICAgIHRoaXMuc2V0UmVzcG9uc2UodHJ1ZSwgX0J1dHRvbi5JRCk7XG4gICAgdGhpcy5jb25maXJtQm94QmVsb25naW5nLmV2ZW50c0NvbnRyb2xsZXIuY2xvc2UoKTtcbiAgfVxuXG4gIG9uQnV0dG9uQ2xpY2soX1R5cGU6ICdjb25maXJtJyB8ICdkZWNsaW5lJyk6IHZvaWQge1xuICAgIGxldCBidXR0b25JRDtcbiAgICBpZiAoX1R5cGUgPT09ICdjb25maXJtJykge1xuICAgICAgYnV0dG9uSUQgPSB0aGlzLmNvbmZpcm1Cb3hCZWxvbmdpbmcuY29uZmlybUJveENvcmVDb25maWcuY29uZmlybUxhYmVsLnRvTG93ZXJDYXNlKCk7XG4gICAgfSBlbHNlIGlmIChfVHlwZSA9PT0gJ2RlY2xpbmUnKSB7XG4gICAgICBidXR0b25JRCA9IHRoaXMuY29uZmlybUJveEJlbG9uZ2luZy5jb25maXJtQm94Q29yZUNvbmZpZy5kZWNsaW5lTGFiZWwudG9Mb3dlckNhc2UoKTtcbiAgICB9XG5cbiAgICB0aGlzLnNldFJlc3BvbnNlKF9UeXBlID09PSAnY29uZmlybScsIGJ1dHRvbklEKTtcblxuICAgIHRoaXMuY29uZmlybUJveEJlbG9uZ2luZy5ldmVudHNDb250cm9sbGVyLmNsb3NlKCk7XG4gIH1cblxuICBjbG9zZVBhcmVudCQoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICB0aGlzLmJveEFuaW1hdGlvbiA9IHRoaXMuY29uZmlybUJveEJlbG9uZ2luZy5jb25maXJtQm94Q29yZUNvbmZpZy5hbmltYXRpb25PdXQ7XG4gICAgY29uc3QgY2xvc2VEdXJhdGlvbiA9IHRoaXMuY29uZmlybUJveEJlbG9uZ2luZy5jb25maXJtQm94Q29yZUNvbmZpZy5hbmltYXRpb25PdXQgPyA4MDAgOiAyMDA7XG4gICAgdGhpcy5mYWRlSW5PdXRBbmltYXRpb24gPSAnY2xvc2UtZmFzdCc7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcjogT2JzZXJ2ZXI8YW55PikgPT4ge1xuICAgICAgb2JzZXJ2ZXIubmV4dCgnJyk7XG4gICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgIH0pLnBpcGUoZGVsYXkoY2xvc2VEdXJhdGlvbikpO1xuICB9XG5cbiAgc2V0Q3VzdG9tU3R5bGVzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNvbmZpcm1Cb3hCZWxvbmdpbmcuY29uZmlybUJveENvcmVDb25maWcuY3VzdG9tU3R5bGVzLndyYXBwZXJDU1MgJiYgdGhpcy5lbENvbmZpcm1Cb3hXcmFwcGVyKSB7XG4gICAgICB0aGlzLmVsQ29uZmlybUJveFdyYXBwZXIubmF0aXZlRWxlbWVudC5zdHlsZS5jc3NUZXh0ICs9IHRoaXMuY29uZmlybUJveEJlbG9uZ2luZy5jb25maXJtQm94Q29yZUNvbmZpZy5jdXN0b21TdHlsZXMud3JhcHBlckNTUztcbiAgICB9XG4gICAgaWYgKHRoaXMuY29uZmlybUJveEJlbG9uZ2luZy5jb25maXJtQm94Q29yZUNvbmZpZy5jdXN0b21TdHlsZXMudGV4dENTUyAmJiB0aGlzLmVsVGV4dFdyYXBwZXIpIHtcbiAgICAgIHRoaXMuZWxUZXh0V3JhcHBlci5uYXRpdmVFbGVtZW50LnN0eWxlLmNzc1RleHQgKz0gdGhpcy5jb25maXJtQm94QmVsb25naW5nLmNvbmZpcm1Cb3hDb3JlQ29uZmlnLmN1c3RvbVN0eWxlcy50ZXh0Q1NTO1xuICAgIH1cbiAgICBpZiAodGhpcy5jb25maXJtQm94QmVsb25naW5nLmNvbmZpcm1Cb3hDb3JlQ29uZmlnLmN1c3RvbVN0eWxlcy50aXRsZUNTUyAmJiB0aGlzLmVsVGl0bGVXcmFwcGVyKSB7XG4gICAgICB0aGlzLmVsVGl0bGVXcmFwcGVyLm5hdGl2ZUVsZW1lbnQuc3R5bGUuY3NzVGV4dCArPSB0aGlzLmNvbmZpcm1Cb3hCZWxvbmdpbmcuY29uZmlybUJveENvcmVDb25maWcuY3VzdG9tU3R5bGVzLnRpdGxlQ1NTO1xuICAgIH1cbiAgICBpZiAodGhpcy5jb25maXJtQm94QmVsb25naW5nLmNvbmZpcm1Cb3hDb3JlQ29uZmlnLmN1c3RvbVN0eWxlcy5idXR0b25TZWN0aW9uQ1NTICYmIHRoaXMuZWxCdXR0b25XcmFwcGVyKSB7XG4gICAgICB0aGlzLmVsQnV0dG9uV3JhcHBlci5uYXRpdmVFbGVtZW50LnN0eWxlLmNzc1RleHQgKz0gdGhpcy5jb25maXJtQm94QmVsb25naW5nLmNvbmZpcm1Cb3hDb3JlQ29uZmlnLmN1c3RvbVN0eWxlcy5idXR0b25TZWN0aW9uQ1NTO1xuICAgIH1cbiAgICBpZiAodGhpcy5jb25maXJtQm94QmVsb25naW5nLmNvbmZpcm1Cb3hDb3JlQ29uZmlnLmN1c3RvbVN0eWxlcy5idXR0b25DU1MgJiYgdGhpcy5lbEJ1dHRvbikge1xuICAgICAgdGhpcy5lbEJ1dHRvbi5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgZWwubmF0aXZlRWxlbWVudC5zdHlsZS5jc3NUZXh0ICs9IHRoaXMuY29uZmlybUJveEJlbG9uZ2luZy5jb25maXJtQm94Q29yZUNvbmZpZy5jdXN0b21TdHlsZXMuYnV0dG9uQ1NTO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0SWNvbkNsYXNzZXMoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gKFxuICAgICAgJ2ljb24tdHlwZS1jb25maXJtLWJveCAgJyArXG4gICAgICB0aGlzLmxheW91dEhlbHBlci5nZXRJY29uQ2xhc3NlcyhcbiAgICAgICAgdGhpcy5jb25maXJtQm94QmVsb25naW5nLmNvbmZpcm1Cb3hDb3JlQ29uZmlnLmxheW91dFR5cGUsXG4gICAgICAgIHRoaXMuY29uZmlybUJveEJlbG9uZ2luZy5jb25maXJtQm94Q29yZUNvbmZpZy5pY29uU3R5bGVDbGFzc1xuICAgICAgKVxuICAgICk7XG4gIH1cblxuICBnZXRCdXR0b25DbGFzc2VzKGxheW91dFR5cGU6IEJ1dHRvbkxheW91dERpc3BsYXkgfCBudWxsKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5sYXlvdXRIZWxwZXIuZ2V0QnV0dG9uQ2xhc3NlcyhsYXlvdXRUeXBlKTtcbiAgfVxufVxuIl19