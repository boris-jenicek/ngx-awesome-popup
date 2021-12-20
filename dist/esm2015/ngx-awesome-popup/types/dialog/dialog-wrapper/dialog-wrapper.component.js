import { ChangeDetectorRef, Component, ComponentFactoryResolver, HostListener, Inject, ViewChild, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { boxAnimations } from '../../../core/animations/box.animations';
import { fadeInOut } from '../../../core/animations/fade-in-out.animation';
import { InsertionLoaderDirective } from '../../../core/insertion-loader.directive';
import { InsertionDirective } from '../../../core/insertion.directive';
import { DialogBelonging, DialogDefaultResponse } from '../core/classes';
export class DialogWrapperComponent {
    constructor(dialogBelonging, componentFactoryResolver, cd) {
        this.dialogBelonging = dialogBelonging;
        this.componentFactoryResolver = componentFactoryResolver;
        this.cd = cd;
        this.fadeInOutAnimation = 'open';
        this.showLoader = true;
        setTimeout(() => {
            this.boxAnimation = this.dialogBelonging.dialogCoreConfig.animationIn;
        }, 1);
    }
    ngAfterViewInit() {
        this.hideScrollbar(); // hide scrollbar if config enabled
        this.loadChildComponent(this.childComponentType);
        this.loadLoaderComponent(this.dialogBelonging.dialogCoreConfig.loaderComponent);
        this.setDefaultResponse();
        this.cd.detectChanges();
        this.setCustomStyles();
    }
    hideScrollbar() {
        if (this.dialogBelonging.dialogCoreConfig.hideScrollbar) {
            this.bodyOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
        }
    }
    revertScrollbarSettings() {
        if (this.dialogBelonging.dialogCoreConfig.hideScrollbar) {
            document.body.style.overflow = this.bodyOverflow;
        }
    }
    setDefaultResponse() {
        const dialogResponse = new DialogDefaultResponse();
        dialogResponse.setBelonging(this.dialogBelonging);
        this.dialogBelonging.eventsController.setDefaultResponse(dialogResponse);
    }
    ngOnDestroy() {
        this.revertScrollbarSettings();
        if (this.childComponentRef) {
            this.childComponentRef.destroy();
        }
        if (this.loaderComponentRef) {
            this.loaderComponentRef.destroy();
        }
    }
    hideScroller() { }
    loadChildComponent(_ComponentType) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(_ComponentType);
        const viewContainerRef = this.insertionPoint.viewContainerRef;
        viewContainerRef.clear();
        this.childComponentRef = viewContainerRef.createComponent(componentFactory);
        this.childComponentRef.instance.dialogBelonging = this.dialogBelonging;
    }
    loadLoaderComponent(_LoaderRef) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(_LoaderRef);
        const viewContainerRef = this.loaderInsertionPoint.viewContainerRef;
        viewContainerRef.clear();
        this.loaderComponentRef = viewContainerRef.createComponent(componentFactory);
    }
    close() {
        this.dialogBelonging.eventsController.close();
    }
    closeParent$() {
        this.boxAnimation = this.dialogBelonging.dialogCoreConfig.animationOut;
        const closeDuration = this.dialogBelonging.dialogCoreConfig.animationOut ? 800 : 200;
        this.fadeInOutAnimation = 'close-fast';
        return new Observable((observer) => {
            observer.next('');
            observer.complete();
        }).pipe(delay(closeDuration));
    }
    onOverlayClicked(evt) {
        // console.log('onOverlayClicked');
    }
    onCustomButton(_Button) {
        this.dialogBelonging.eventsController.onButtonClick(_Button);
    }
    closeLoader() {
        this.showLoader = false;
    }
    setCustomStyles() {
        if (this.dialogBelonging.dialogCoreConfig.customStyles.wrapperCSS && this.elDialogWrapper) {
            this.elDialogWrapper.nativeElement.style.cssText += this.dialogBelonging.dialogCoreConfig.customStyles.wrapperCSS;
        }
        if (this.dialogBelonging.dialogCoreConfig.customStyles.buttonSectionCSS && this.elButtonWrapper) {
            this.elButtonWrapper.nativeElement.style.cssText +=
                this.dialogBelonging.dialogCoreConfig.customStyles.buttonSectionCSS;
        }
        if (this.dialogBelonging.dialogCoreConfig.customStyles.buttonCSS && this.elButton) {
            this.elButton.forEach(el => {
                el.nativeElement.style.cssText += this.dialogBelonging.dialogCoreConfig.customStyles.buttonCSS;
            });
        }
    }
    keyEvent(event) {
        if (event.key === 'Escape') {
            this.close();
        }
    }
}
DialogWrapperComponent.decorators = [
    { type: Component, args: [{
                selector: 'dialog-popup-wrapper',
                template: "<div\n  class=\"ngx-awesome-popup-overlay aw-dialog-modal\"\n  (dblclick)=\"onOverlayClicked($event)\"\n  [@fadeInOut]=\"{\n    value: fadeInOutAnimation,\n    params: {\n      closeDelay: dialogBelonging.dialogCoreConfig.animationOut === 0 ? '200ms' : '300ms'\n    }\n  }\"\n>\n  <div\n    class=\"evolve-parent-dialog\"\n    [@.disabled]=\"\n      dialogBelonging.dialogCoreConfig.animationIn === 0 && dialogBelonging.dialogCoreConfig.animationOut === 0\n    \"\n    [@boxAnimations]=\"boxAnimation\"\n    #elDialogWrapper\n    [ngStyle]=\"\n      dialogBelonging.dialogCoreConfig.fullScreen && {\n        maxWidth: '100%',\n        maxHeight: '100%',\n        height: '100%',\n        width: '100%',\n        borderRadius: '0'\n      }\n    \"\n    [ngClass]=\"{\n      'standard-dialog': dialogBelonging.dialogCoreConfig.layoutType === 0,\n      'success-dialog': dialogBelonging.dialogCoreConfig.layoutType === 1,\n      'info-dialog': dialogBelonging.dialogCoreConfig.layoutType === 2,\n      'warning-dialog': dialogBelonging.dialogCoreConfig.layoutType === 3,\n      'danger-dialog': dialogBelonging.dialogCoreConfig.layoutType === 4\n    }\"\n  >\n    <div\n      class=\"loader-holder\"\n      [ngClass]=\"\n        !dialogBelonging.dialogCoreConfig.displayLoader\n          ? 'dialog-loader-off'\n          : showLoader\n          ? 'dialog-loader-active'\n          : 'dialog-loader-gone'\n      \"\n    >\n      <!--dialogBelonging.dialogCoreConfig.DisplayLoader => initial config-->\n      <div class=\"dialog-loader\">\n        <ng-template appInsertionLoader></ng-template>\n      </div>\n    </div>\n    <ng-container *ngIf=\"!dialogBelonging.dialogCoreConfig.fullScreen; else fullScreen\"></ng-container>\n    <ng-template #fullScreen></ng-template>\n    <div\n      class=\"content-holder\"\n      [ngStyle]=\"\n        dialogBelonging.dialogCoreConfig.fullScreen\n          ? {\n              width: '100%',\n              height: '100%'\n            }\n          : {\n              width: dialogBelonging.dialogCoreConfig.width,\n              minWidth: dialogBelonging.dialogCoreConfig.minWidth,\n              maxWidth: dialogBelonging.dialogCoreConfig.maxWidth,\n              height: dialogBelonging.dialogCoreConfig.height,\n              minHeight: dialogBelonging.dialogCoreConfig.minHeight,\n              maxHeight: dialogBelonging.dialogCoreConfig.maxHeight\n            }\n      \"\n    >\n      <!--      <div\n      class=\"content-holder\"\n      [ngStyle]=\"\n        dialogBelonging.dialogCoreConfig.FullScreen\n          ? {\n              width: dialogBelonging.dialogCoreConfig.Width,\n              minWidth: dialogBelonging.dialogCoreConfig.MinWidth,\n              maxWidth: dialogBelonging.dialogCoreConfig.MaxWidth,\n              height: dialogBelonging.dialogCoreConfig.Height,\n              minHeight: dialogBelonging.dialogCoreConfig.MinHeight,\n              maxHeight: dialogBelonging.dialogCoreConfig.MaxHeight\n            }\n          : {\n              width: '100vw',\n              height: '100vh'\n            }\n      \"\n    >-->\n      <!--dialogBelonging.dialogCoreConfig.DisplayLoader => initial config-->\n      <div\n        class=\"component-content\"\n        [ngClass]=\"\n          !dialogBelonging.dialogCoreConfig.displayLoader\n            ? 'component-content-loader-off'\n            : showLoader\n            ? 'component-content-preparing'\n            : 'component-content-ready'\n        \"\n      >\n        <ng-template appInsertion></ng-template>\n      </div>\n    </div>\n\n    <div class=\"button-holder\" #elButtonWrapper>\n      <div\n        class=\"button-section\"\n        *ngIf=\"dialogBelonging.buttons.length > 0\"\n        [ngStyle]=\"{\n          'text-align': dialogBelonging.dialogCoreConfig.buttonPosition\n        }\"\n      >\n        <button\n          class=\"ed-btn ed-btn-lg\"\n          #elButton\n          *ngFor=\"let button of dialogBelonging.buttons\"\n          (click)=\"onCustomButton(button)\"\n          [ngClass]=\"{\n            '': button.layoutType ? button.layoutType === 0 : false,\n            'ed-btn-success': button.layoutType ? button.layoutType === 1 : false,\n            'ed-btn-info': button.layoutType ? button.layoutType === 2 : false,\n            'ed-btn-warning': button.layoutType ? button.layoutType === 3 : false,\n            'ed-btn-danger': button.layoutType ? button.layoutType === 4 : false,\n            'ed-btn-dark': button.layoutType ? button.layoutType === 5 : false,\n            'ed-btn-light': button.layoutType ? button.layoutType === 6 : false,\n            'ed-btn-primary': button.layoutType ? button.layoutType === 7 : false,\n            'ed-btn-secondary': button.layoutType ? button.layoutType === 8 : false,\n            'ed-btn-link': button.layoutType ? button.layoutType === 9 : false\n          }\"\n        >\n          {{ button.label }}\n        </button>\n      </div>\n    </div>\n  </div>\n</div>\n",
                // styleUrls: ['../../../styles/types/dialog-modal.scss'],
                animations: [fadeInOut(), boxAnimations()]
            },] }
];
DialogWrapperComponent.ctorParameters = () => [
    { type: DialogBelonging, decorators: [{ type: Inject, args: ['dialogBelonging',] }] },
    { type: ComponentFactoryResolver },
    { type: ChangeDetectorRef }
];
DialogWrapperComponent.propDecorators = {
    elDialogWrapper: [{ type: ViewChild, args: ['elDialogWrapper',] }],
    elButtonWrapper: [{ type: ViewChild, args: ['elButtonWrapper',] }],
    elButton: [{ type: ViewChildren, args: ['elButton',] }],
    insertionPoint: [{ type: ViewChild, args: [InsertionDirective, { static: true },] }],
    loaderInsertionPoint: [{ type: ViewChild, args: [InsertionLoaderDirective, { static: true },] }],
    keyEvent: [{ type: HostListener, args: ['window:keyup', ['$event'],] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLXdyYXBwZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbmd4LWF3ZXNvbWUtcG9wdXAvdHlwZXMvZGlhbG9nL2RpYWxvZy13cmFwcGVyL2RpYWxvZy13cmFwcGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCx3QkFBd0IsRUFHeEIsWUFBWSxFQUNaLE1BQU0sRUFJTixTQUFTLEVBQ1QsWUFBWSxFQUNiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxVQUFVLEVBQVksTUFBTSxNQUFNLENBQUM7QUFDNUMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFFM0UsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDcEYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDdkUsT0FBTyxFQUFFLGVBQWUsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBUXpFLE1BQU0sT0FBTyxzQkFBc0I7SUFtQmpDLFlBRVMsZUFBZ0MsRUFDL0Isd0JBQWtELEVBQ2xELEVBQXFCO1FBRnRCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUMvQiw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO1FBQ2xELE9BQUUsR0FBRixFQUFFLENBQW1CO1FBbkIvQix1QkFBa0IsR0FBRyxNQUFNLENBQUM7UUFDNUIsZUFBVSxHQUFHLElBQUksQ0FBQztRQW9CaEIsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNkLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxnQkFB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c0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICBDb21wb25lbnRSZWYsXG4gIEVsZW1lbnRSZWYsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5qZWN0LFxuICBPbkRlc3Ryb3ksXG4gIFF1ZXJ5TGlzdCxcbiAgVHlwZSxcbiAgVmlld0NoaWxkLFxuICBWaWV3Q2hpbGRyZW5cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBPYnNlcnZlciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVsYXkgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBib3hBbmltYXRpb25zIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9hbmltYXRpb25zL2JveC5hbmltYXRpb25zJztcbmltcG9ydCB7IGZhZGVJbk91dCB9IGZyb20gJy4uLy4uLy4uL2NvcmUvYW5pbWF0aW9ucy9mYWRlLWluLW91dC5hbmltYXRpb24nO1xuaW1wb3J0IHsgQXBwZWFyYW5jZUFuaW1hdGlvbiwgRGlzYXBwZWFyYW5jZUFuaW1hdGlvbiB9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW51bXMnO1xuaW1wb3J0IHsgSW5zZXJ0aW9uTG9hZGVyRGlyZWN0aXZlIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9pbnNlcnRpb24tbG9hZGVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBJbnNlcnRpb25EaXJlY3RpdmUgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2luc2VydGlvbi5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGlhbG9nQmVsb25naW5nLCBEaWFsb2dEZWZhdWx0UmVzcG9uc2UgfSBmcm9tICcuLi9jb3JlL2NsYXNzZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkaWFsb2ctcG9wdXAtd3JhcHBlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9kaWFsb2ctd3JhcHBlci5jb21wb25lbnQuaHRtbCcsXG4gIC8vIHN0eWxlVXJsczogWycuLi8uLi8uLi9zdHlsZXMvdHlwZXMvZGlhbG9nLW1vZGFsLnNjc3MnXSxcbiAgYW5pbWF0aW9uczogW2ZhZGVJbk91dCgpLCBib3hBbmltYXRpb25zKCldXG59KVxuZXhwb3J0IGNsYXNzIERpYWxvZ1dyYXBwZXJDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICBAVmlld0NoaWxkKCdlbERpYWxvZ1dyYXBwZXInKSBlbERpYWxvZ1dyYXBwZXI6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ2VsQnV0dG9uV3JhcHBlcicpIGVsQnV0dG9uV3JhcHBlcjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZHJlbignZWxCdXR0b24nKSBlbEJ1dHRvbjogUXVlcnlMaXN0PEVsZW1lbnRSZWY+O1xuICBmYWRlSW5PdXRBbmltYXRpb24gPSAnb3Blbic7XG4gIHNob3dMb2FkZXIgPSB0cnVlO1xuICBib2R5T3ZlcmZsb3c6IHN0cmluZztcblxuICBjaGlsZENvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPGFueT47XG4gIGNoaWxkQ29tcG9uZW50VHlwZTogVHlwZTxhbnk+O1xuICBsb2FkZXJDb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxhbnk+O1xuXG4gIEBWaWV3Q2hpbGQoSW5zZXJ0aW9uRGlyZWN0aXZlLCB7IHN0YXRpYzogdHJ1ZSB9KVxuICBpbnNlcnRpb25Qb2ludDogSW5zZXJ0aW9uRGlyZWN0aXZlO1xuICBAVmlld0NoaWxkKEluc2VydGlvbkxvYWRlckRpcmVjdGl2ZSwgeyBzdGF0aWM6IHRydWUgfSlcbiAgbG9hZGVySW5zZXJ0aW9uUG9pbnQ6IEluc2VydGlvbkxvYWRlckRpcmVjdGl2ZTtcblxuICBib3hBbmltYXRpb246IEFwcGVhcmFuY2VBbmltYXRpb24gfCBEaXNhcHBlYXJhbmNlQW5pbWF0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoJ2RpYWxvZ0JlbG9uZ2luZycpXG4gICAgcHVibGljIGRpYWxvZ0JlbG9uZ2luZzogRGlhbG9nQmVsb25naW5nLFxuICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmJveEFuaW1hdGlvbiA9IHRoaXMuZGlhbG9nQmVsb25naW5nLmRpYWxvZ0NvcmVDb25maWcuYW5pbWF0aW9uSW47XG4gICAgfSwgMSk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5oaWRlU2Nyb2xsYmFyKCk7IC8vIGhpZGUgc2Nyb2xsYmFyIGlmIGNvbmZpZyBlbmFibGVkXG5cbiAgICB0aGlzLmxvYWRDaGlsZENvbXBvbmVudCh0aGlzLmNoaWxkQ29tcG9uZW50VHlwZSk7XG4gICAgdGhpcy5sb2FkTG9hZGVyQ29tcG9uZW50KHRoaXMuZGlhbG9nQmVsb25naW5nLmRpYWxvZ0NvcmVDb25maWcubG9hZGVyQ29tcG9uZW50KTtcbiAgICB0aGlzLnNldERlZmF1bHRSZXNwb25zZSgpO1xuICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIHRoaXMuc2V0Q3VzdG9tU3R5bGVzKCk7XG4gIH1cblxuICBoaWRlU2Nyb2xsYmFyKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRpYWxvZ0JlbG9uZ2luZy5kaWFsb2dDb3JlQ29uZmlnLmhpZGVTY3JvbGxiYXIpIHtcbiAgICAgIHRoaXMuYm9keU92ZXJmbG93ID0gZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdztcbiAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcbiAgICB9XG4gIH1cblxuICByZXZlcnRTY3JvbGxiYXJTZXR0aW5ncygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kaWFsb2dCZWxvbmdpbmcuZGlhbG9nQ29yZUNvbmZpZy5oaWRlU2Nyb2xsYmFyKSB7XG4gICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gdGhpcy5ib2R5T3ZlcmZsb3c7XG4gICAgfVxuICB9XG5cbiAgc2V0RGVmYXVsdFJlc3BvbnNlKCk6IHZvaWQge1xuICAgIGNvbnN0IGRpYWxvZ1Jlc3BvbnNlID0gbmV3IERpYWxvZ0RlZmF1bHRSZXNwb25zZSgpO1xuICAgIGRpYWxvZ1Jlc3BvbnNlLnNldEJlbG9uZ2luZyh0aGlzLmRpYWxvZ0JlbG9uZ2luZyk7XG4gICAgdGhpcy5kaWFsb2dCZWxvbmdpbmcuZXZlbnRzQ29udHJvbGxlci5zZXREZWZhdWx0UmVzcG9uc2UoZGlhbG9nUmVzcG9uc2UpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5yZXZlcnRTY3JvbGxiYXJTZXR0aW5ncygpO1xuXG4gICAgaWYgKHRoaXMuY2hpbGRDb21wb25lbnRSZWYpIHtcbiAgICAgIHRoaXMuY2hpbGRDb21wb25lbnRSZWYuZGVzdHJveSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5sb2FkZXJDb21wb25lbnRSZWYpIHtcbiAgICAgIHRoaXMubG9hZGVyQ29tcG9uZW50UmVmLmRlc3Ryb3koKTtcbiAgICB9XG4gIH1cblxuICBoaWRlU2Nyb2xsZXIoKTogdm9pZCB7fVxuXG4gIGxvYWRDaGlsZENvbXBvbmVudChfQ29tcG9uZW50VHlwZTogVHlwZTxhbnk+KTogdm9pZCB7XG4gICAgY29uc3QgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KF9Db21wb25lbnRUeXBlKTtcbiAgICBjb25zdCB2aWV3Q29udGFpbmVyUmVmID0gdGhpcy5pbnNlcnRpb25Qb2ludC52aWV3Q29udGFpbmVyUmVmO1xuICAgIHZpZXdDb250YWluZXJSZWYuY2xlYXIoKTtcblxuICAgIHRoaXMuY2hpbGRDb21wb25lbnRSZWYgPSB2aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcblxuICAgIHRoaXMuY2hpbGRDb21wb25lbnRSZWYuaW5zdGFuY2UuZGlhbG9nQmVsb25naW5nID0gdGhpcy5kaWFsb2dCZWxvbmdpbmc7XG4gIH1cblxuICBsb2FkTG9hZGVyQ29tcG9uZW50KF9Mb2FkZXJSZWY6IFR5cGU8YW55Pik6IHZvaWQge1xuICAgIGNvbnN0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShfTG9hZGVyUmVmKTtcbiAgICBjb25zdCB2aWV3Q29udGFpbmVyUmVmID0gdGhpcy5sb2FkZXJJbnNlcnRpb25Qb2ludC52aWV3Q29udGFpbmVyUmVmO1xuICAgIHZpZXdDb250YWluZXJSZWYuY2xlYXIoKTtcblxuICAgIHRoaXMubG9hZGVyQ29tcG9uZW50UmVmID0gdmlld0NvbnRhaW5lclJlZi5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50RmFjdG9yeSk7XG4gIH1cblxuICBjbG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLmRpYWxvZ0JlbG9uZ2luZy5ldmVudHNDb250cm9sbGVyLmNsb3NlKCk7XG4gIH1cblxuICBjbG9zZVBhcmVudCQoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICB0aGlzLmJveEFuaW1hdGlvbiA9IHRoaXMuZGlhbG9nQmVsb25naW5nLmRpYWxvZ0NvcmVDb25maWcuYW5pbWF0aW9uT3V0O1xuICAgIGNvbnN0IGNsb3NlRHVyYXRpb24gPSB0aGlzLmRpYWxvZ0JlbG9uZ2luZy5kaWFsb2dDb3JlQ29uZmlnLmFuaW1hdGlvbk91dCA/IDgwMCA6IDIwMDtcbiAgICB0aGlzLmZhZGVJbk91dEFuaW1hdGlvbiA9ICdjbG9zZS1mYXN0JztcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyOiBPYnNlcnZlcjxhbnk+KSA9PiB7XG4gICAgICBvYnNlcnZlci5uZXh0KCcnKTtcbiAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgfSkucGlwZShkZWxheShjbG9zZUR1cmF0aW9uKSk7XG4gIH1cblxuICBvbk92ZXJsYXlDbGlja2VkKGV2dDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIC8vIGNvbnNvbGUubG9nKCdvbk92ZXJsYXlDbGlja2VkJyk7XG4gIH1cblxuICBvbkN1c3RvbUJ1dHRvbihfQnV0dG9uOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmRpYWxvZ0JlbG9uZ2luZy5ldmVudHNDb250cm9sbGVyLm9uQnV0dG9uQ2xpY2soX0J1dHRvbik7XG4gIH1cblxuICBjbG9zZUxvYWRlcigpOiB2b2lkIHtcbiAgICB0aGlzLnNob3dMb2FkZXIgPSBmYWxzZTtcbiAgfVxuXG4gIHNldEN1c3RvbVN0eWxlcygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kaWFsb2dCZWxvbmdpbmcuZGlhbG9nQ29yZUNvbmZpZy5jdXN0b21TdHlsZXMud3JhcHBlckNTUyAmJiB0aGlzLmVsRGlhbG9nV3JhcHBlcikge1xuICAgICAgdGhpcy5lbERpYWxvZ1dyYXBwZXIubmF0aXZlRWxlbWVudC5zdHlsZS5jc3NUZXh0ICs9IHRoaXMuZGlhbG9nQmVsb25naW5nLmRpYWxvZ0NvcmVDb25maWcuY3VzdG9tU3R5bGVzLndyYXBwZXJDU1M7XG4gICAgfVxuICAgIGlmICh0aGlzLmRpYWxvZ0JlbG9uZ2luZy5kaWFsb2dDb3JlQ29uZmlnLmN1c3RvbVN0eWxlcy5idXR0b25TZWN0aW9uQ1NTICYmIHRoaXMuZWxCdXR0b25XcmFwcGVyKSB7XG4gICAgICB0aGlzLmVsQnV0dG9uV3JhcHBlci5uYXRpdmVFbGVtZW50LnN0eWxlLmNzc1RleHQgKz1cbiAgICAgICAgdGhpcy5kaWFsb2dCZWxvbmdpbmcuZGlhbG9nQ29yZUNvbmZpZy5jdXN0b21TdHlsZXMuYnV0dG9uU2VjdGlvbkNTUztcbiAgICB9XG4gICAgaWYgKHRoaXMuZGlhbG9nQmVsb25naW5nLmRpYWxvZ0NvcmVDb25maWcuY3VzdG9tU3R5bGVzLmJ1dHRvbkNTUyAmJiB0aGlzLmVsQnV0dG9uKSB7XG4gICAgICB0aGlzLmVsQnV0dG9uLmZvckVhY2goZWwgPT4ge1xuICAgICAgICBlbC5uYXRpdmVFbGVtZW50LnN0eWxlLmNzc1RleHQgKz0gdGhpcy5kaWFsb2dCZWxvbmdpbmcuZGlhbG9nQ29yZUNvbmZpZy5jdXN0b21TdHlsZXMuYnV0dG9uQ1NTO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OmtleXVwJywgWyckZXZlbnQnXSlcbiAga2V5RXZlbnQoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZXZlbnQua2V5ID09PSAnRXNjYXBlJykge1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH1cbiAgfVxufVxuIl19