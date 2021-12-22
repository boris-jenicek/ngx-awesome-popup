import { ChangeDetectorRef, Component, ComponentFactoryResolver, HostListener, Inject, ViewChild, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { boxAnimations } from '../../../core/animations/box.animations';
import { fadeInOut } from '../../../core/animations/fade-in-out.animation';
import { InsertionLoaderDirective } from '../../../core/insertion-loader.directive';
import { InsertionDirective } from '../../../core/insertion.directive';
import { LayoutHelperService } from '../../../core/layout-helper.service';
import { DialogBelonging, DialogDefaultResponse } from '../core/classes';
export class DialogWrapperComponent {
    constructor(dialogBelonging, componentFactoryResolver, cd, layoutHelper) {
        this.dialogBelonging = dialogBelonging;
        this.componentFactoryResolver = componentFactoryResolver;
        this.cd = cd;
        this.layoutHelper = layoutHelper;
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
            this.elButtonWrapper.nativeElement.style.cssText += this.dialogBelonging.dialogCoreConfig.customStyles.buttonSectionCSS;
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
                template: "<div\n  class=\"ngx-awesome-popup-overlay aw-dialog-modal\"\n  (dblclick)=\"onOverlayClicked($event)\"\n  [@fadeInOut]=\"{\n    value: fadeInOutAnimation,\n    params: {\n      closeDelay: dialogBelonging.dialogCoreConfig.animationOut === 0 ? '200ms' : '300ms'\n    }\n  }\">\n  <div\n    class=\"evolve-parent-dialog\"\n    [@.disabled]=\"dialogBelonging.dialogCoreConfig.animationIn === 0 && dialogBelonging.dialogCoreConfig.animationOut === 0\"\n    [@boxAnimations]=\"boxAnimation\"\n    #elDialogWrapper\n    [ngStyle]=\"\n      dialogBelonging.dialogCoreConfig.fullScreen && {\n        maxWidth: '100%',\n        maxHeight: '100%',\n        height: '100%',\n        width: '100%',\n        borderRadius: '0'\n      }\n    \"\n    [className]=\"layoutHelper.getBoxClasses(dialogBelonging.dialogCoreConfig.layoutType, 'evolve-parent-dialog')\">\n    <div\n      class=\"loader-holder\"\n      [ngClass]=\"\n        !dialogBelonging.dialogCoreConfig.displayLoader ? 'dialog-loader-off' : showLoader ? 'dialog-loader-active' : 'dialog-loader-gone'\n      \">\n      <div class=\"dialog-loader\">\n        <ng-template appInsertionLoader></ng-template>\n      </div>\n    </div>\n    <ng-container *ngIf=\"!dialogBelonging.dialogCoreConfig.fullScreen; else fullScreen\"></ng-container>\n    <ng-template #fullScreen></ng-template>\n    <div\n      class=\"content-holder\"\n      [ngStyle]=\"\n        dialogBelonging.dialogCoreConfig.fullScreen\n          ? {\n              width: '100%',\n              height: '100%'\n            }\n          : {\n              width: dialogBelonging.dialogCoreConfig.width,\n              minWidth: dialogBelonging.dialogCoreConfig.minWidth,\n              maxWidth: dialogBelonging.dialogCoreConfig.maxWidth,\n              height: dialogBelonging.dialogCoreConfig.height,\n              minHeight: dialogBelonging.dialogCoreConfig.minHeight,\n              maxHeight: dialogBelonging.dialogCoreConfig.maxHeight\n            }\n      \">\n      <div\n        class=\"component-content\"\n        [ngClass]=\"\n          !dialogBelonging.dialogCoreConfig.displayLoader\n            ? 'component-content-loader-off'\n            : showLoader\n            ? 'component-content-preparing'\n            : 'component-content-ready'\n        \">\n        <ng-template appInsertion></ng-template>\n      </div>\n    </div>\n\n    <div class=\"button-holder\" #elButtonWrapper>\n      <div\n        class=\"button-section\"\n        *ngIf=\"dialogBelonging.buttons.length > 0\"\n        [ngStyle]=\"{\n          'text-align': dialogBelonging.dialogCoreConfig.buttonPosition\n        }\">\n        <button\n          #elButton\n          *ngFor=\"let button of dialogBelonging.buttons\"\n          (click)=\"onCustomButton(button)\"\n          [className]=\"layoutHelper.getButtonClasses(button.layoutType, 'ed-btn ed-btn-lg')\">\n          {{ button.label }}\n        </button>\n      </div>\n    </div>\n  </div>\n</div>\n",
                animations: [fadeInOut(), boxAnimations()],
                providers: [LayoutHelperService]
            },] }
];
DialogWrapperComponent.ctorParameters = () => [
    { type: DialogBelonging, decorators: [{ type: Inject, args: ['dialogBelonging',] }] },
    { type: ComponentFactoryResolver },
    { type: ChangeDetectorRef },
    { type: LayoutHelperService }
];
DialogWrapperComponent.propDecorators = {
    elDialogWrapper: [{ type: ViewChild, args: ['elDialogWrapper',] }],
    elButtonWrapper: [{ type: ViewChild, args: ['elButtonWrapper',] }],
    elButton: [{ type: ViewChildren, args: ['elButton',] }],
    insertionPoint: [{ type: ViewChild, args: [InsertionDirective, { static: true },] }],
    loaderInsertionPoint: [{ type: ViewChild, args: [InsertionLoaderDirective, { static: true },] }],
    keyEvent: [{ type: HostListener, args: ['window:keyup', ['$event'],] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLXdyYXBwZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbmd4LWF3ZXNvbWUtcG9wdXAvdHlwZXMvZGlhbG9nL2RpYWxvZy13cmFwcGVyL2RpYWxvZy13cmFwcGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCx3QkFBd0IsRUFHeEIsWUFBWSxFQUNaLE1BQU0sRUFJTixTQUFTLEVBQ1QsWUFBWSxFQUNiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxVQUFVLEVBQVksTUFBTSxNQUFNLENBQUM7QUFDNUMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFFM0UsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDcEYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDdkUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDMUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBUXpFLE1BQU0sT0FBTyxzQkFBc0I7SUFtQmpDLFlBRVMsZUFBZ0MsRUFDL0Isd0JBQWtELEVBQ2xELEVBQXFCLEVBQ3RCLFlBQWlDO1FBSGpDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUMvQiw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO1FBQ2xELE9BQUUsR0FBRixFQUFFLENBQW1CO1FBQ3RCLGlCQUFZLEdBQVosWUFBWSxDQUFxQjtRQXBCMUMsdUJBQWtCLEdBQUcsTUFBTSxDQUFDO1FBQzVCLGVBQVUsR0FBRyxJ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SUFBSSxFQUFFO21DQUU5QyxTQUFTLFNBQUMsd0JBQXdCLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO3VCQXFIcEQsWUFBWSxTQUFDLGNBQWMsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgQ29tcG9uZW50UmVmLFxuICBFbGVtZW50UmVmLFxuICBIb3N0TGlzdGVuZXIsXG4gIEluamVjdCxcbiAgT25EZXN0cm95LFxuICBRdWVyeUxpc3QsXG4gIFR5cGUsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NoaWxkcmVuXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgT2JzZXJ2ZXIgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlbGF5IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgYm94QW5pbWF0aW9ucyB9IGZyb20gJy4uLy4uLy4uL2NvcmUvYW5pbWF0aW9ucy9ib3guYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBmYWRlSW5PdXQgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2FuaW1hdGlvbnMvZmFkZS1pbi1vdXQuYW5pbWF0aW9uJztcbmltcG9ydCB7IEFwcGVhcmFuY2VBbmltYXRpb24sIERpc2FwcGVhcmFuY2VBbmltYXRpb24gfSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudW1zJztcbmltcG9ydCB7IEluc2VydGlvbkxvYWRlckRpcmVjdGl2ZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvaW5zZXJ0aW9uLWxvYWRlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgSW5zZXJ0aW9uRGlyZWN0aXZlIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9pbnNlcnRpb24uZGlyZWN0aXZlJztcbmltcG9ydCB7IExheW91dEhlbHBlclNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2xheW91dC1oZWxwZXIuc2VydmljZSc7XG5pbXBvcnQgeyBEaWFsb2dCZWxvbmdpbmcsIERpYWxvZ0RlZmF1bHRSZXNwb25zZSB9IGZyb20gJy4uL2NvcmUvY2xhc3Nlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RpYWxvZy1wb3B1cC13cmFwcGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2RpYWxvZy13cmFwcGVyLmNvbXBvbmVudC5odG1sJyxcbiAgYW5pbWF0aW9uczogW2ZhZGVJbk91dCgpLCBib3hBbmltYXRpb25zKCldLFxuICBwcm92aWRlcnM6IFtMYXlvdXRIZWxwZXJTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBEaWFsb2dXcmFwcGVyQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgQFZpZXdDaGlsZCgnZWxEaWFsb2dXcmFwcGVyJykgZWxEaWFsb2dXcmFwcGVyOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdlbEJ1dHRvbldyYXBwZXInKSBlbEJ1dHRvbldyYXBwZXI6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGRyZW4oJ2VsQnV0dG9uJykgZWxCdXR0b246IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPjtcbiAgZmFkZUluT3V0QW5pbWF0aW9uID0gJ29wZW4nO1xuICBzaG93TG9hZGVyID0gdHJ1ZTtcbiAgYm9keU92ZXJmbG93OiBzdHJpbmc7XG5cbiAgY2hpbGRDb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxhbnk+O1xuICBjaGlsZENvbXBvbmVudFR5cGU6IFR5cGU8YW55PjtcbiAgbG9hZGVyQ29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8YW55PjtcblxuICBAVmlld0NoaWxkKEluc2VydGlvbkRpcmVjdGl2ZSwgeyBzdGF0aWM6IHRydWUgfSlcbiAgaW5zZXJ0aW9uUG9pbnQ6IEluc2VydGlvbkRpcmVjdGl2ZTtcbiAgQFZpZXdDaGlsZChJbnNlcnRpb25Mb2FkZXJEaXJlY3RpdmUsIHsgc3RhdGljOiB0cnVlIH0pXG4gIGxvYWRlckluc2VydGlvblBvaW50OiBJbnNlcnRpb25Mb2FkZXJEaXJlY3RpdmU7XG5cbiAgYm94QW5pbWF0aW9uOiBBcHBlYXJhbmNlQW5pbWF0aW9uIHwgRGlzYXBwZWFyYW5jZUFuaW1hdGlvbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KCdkaWFsb2dCZWxvbmdpbmcnKVxuICAgIHB1YmxpYyBkaWFsb2dCZWxvbmdpbmc6IERpYWxvZ0JlbG9uZ2luZyxcbiAgICBwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHB1YmxpYyBsYXlvdXRIZWxwZXI6IExheW91dEhlbHBlclNlcnZpY2VcbiAgKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmJveEFuaW1hdGlvbiA9IHRoaXMuZGlhbG9nQmVsb25naW5nLmRpYWxvZ0NvcmVDb25maWcuYW5pbWF0aW9uSW47XG4gICAgfSwgMSk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5oaWRlU2Nyb2xsYmFyKCk7IC8vIGhpZGUgc2Nyb2xsYmFyIGlmIGNvbmZpZyBlbmFibGVkXG5cbiAgICB0aGlzLmxvYWRDaGlsZENvbXBvbmVudCh0aGlzLmNoaWxkQ29tcG9uZW50VHlwZSk7XG4gICAgdGhpcy5sb2FkTG9hZGVyQ29tcG9uZW50KHRoaXMuZGlhbG9nQmVsb25naW5nLmRpYWxvZ0NvcmVDb25maWcubG9hZGVyQ29tcG9uZW50KTtcbiAgICB0aGlzLnNldERlZmF1bHRSZXNwb25zZSgpO1xuICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIHRoaXMuc2V0Q3VzdG9tU3R5bGVzKCk7XG4gIH1cblxuICBoaWRlU2Nyb2xsYmFyKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRpYWxvZ0JlbG9uZ2luZy5kaWFsb2dDb3JlQ29uZmlnLmhpZGVTY3JvbGxiYXIpIHtcbiAgICAgIHRoaXMuYm9keU92ZXJmbG93ID0gZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdztcbiAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcbiAgICB9XG4gIH1cblxuICByZXZlcnRTY3JvbGxiYXJTZXR0aW5ncygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kaWFsb2dCZWxvbmdpbmcuZGlhbG9nQ29yZUNvbmZpZy5oaWRlU2Nyb2xsYmFyKSB7XG4gICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gdGhpcy5ib2R5T3ZlcmZsb3c7XG4gICAgfVxuICB9XG5cbiAgc2V0RGVmYXVsdFJlc3BvbnNlKCk6IHZvaWQge1xuICAgIGNvbnN0IGRpYWxvZ1Jlc3BvbnNlID0gbmV3IERpYWxvZ0RlZmF1bHRSZXNwb25zZSgpO1xuICAgIGRpYWxvZ1Jlc3BvbnNlLnNldEJlbG9uZ2luZyh0aGlzLmRpYWxvZ0JlbG9uZ2luZyk7XG4gICAgdGhpcy5kaWFsb2dCZWxvbmdpbmcuZXZlbnRzQ29udHJvbGxlci5zZXREZWZhdWx0UmVzcG9uc2UoZGlhbG9nUmVzcG9uc2UpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5yZXZlcnRTY3JvbGxiYXJTZXR0aW5ncygpO1xuXG4gICAgaWYgKHRoaXMuY2hpbGRDb21wb25lbnRSZWYpIHtcbiAgICAgIHRoaXMuY2hpbGRDb21wb25lbnRSZWYuZGVzdHJveSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5sb2FkZXJDb21wb25lbnRSZWYpIHtcbiAgICAgIHRoaXMubG9hZGVyQ29tcG9uZW50UmVmLmRlc3Ryb3koKTtcbiAgICB9XG4gIH1cblxuICBoaWRlU2Nyb2xsZXIoKTogdm9pZCB7fVxuXG4gIGxvYWRDaGlsZENvbXBvbmVudChfQ29tcG9uZW50VHlwZTogVHlwZTxhbnk+KTogdm9pZCB7XG4gICAgY29uc3QgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KF9Db21wb25lbnRUeXBlKTtcbiAgICBjb25zdCB2aWV3Q29udGFpbmVyUmVmID0gdGhpcy5pbnNlcnRpb25Qb2ludC52aWV3Q29udGFpbmVyUmVmO1xuICAgIHZpZXdDb250YWluZXJSZWYuY2xlYXIoKTtcblxuICAgIHRoaXMuY2hpbGRDb21wb25lbnRSZWYgPSB2aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcblxuICAgIHRoaXMuY2hpbGRDb21wb25lbnRSZWYuaW5zdGFuY2UuZGlhbG9nQmVsb25naW5nID0gdGhpcy5kaWFsb2dCZWxvbmdpbmc7XG4gIH1cblxuICBsb2FkTG9hZGVyQ29tcG9uZW50KF9Mb2FkZXJSZWY6IFR5cGU8YW55Pik6IHZvaWQge1xuICAgIGNvbnN0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShfTG9hZGVyUmVmKTtcbiAgICBjb25zdCB2aWV3Q29udGFpbmVyUmVmID0gdGhpcy5sb2FkZXJJbnNlcnRpb25Qb2ludC52aWV3Q29udGFpbmVyUmVmO1xuICAgIHZpZXdDb250YWluZXJSZWYuY2xlYXIoKTtcblxuICAgIHRoaXMubG9hZGVyQ29tcG9uZW50UmVmID0gdmlld0NvbnRhaW5lclJlZi5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50RmFjdG9yeSk7XG4gIH1cblxuICBjbG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLmRpYWxvZ0JlbG9uZ2luZy5ldmVudHNDb250cm9sbGVyLmNsb3NlKCk7XG4gIH1cblxuICBjbG9zZVBhcmVudCQoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICB0aGlzLmJveEFuaW1hdGlvbiA9IHRoaXMuZGlhbG9nQmVsb25naW5nLmRpYWxvZ0NvcmVDb25maWcuYW5pbWF0aW9uT3V0O1xuICAgIGNvbnN0IGNsb3NlRHVyYXRpb24gPSB0aGlzLmRpYWxvZ0JlbG9uZ2luZy5kaWFsb2dDb3JlQ29uZmlnLmFuaW1hdGlvbk91dCA/IDgwMCA6IDIwMDtcbiAgICB0aGlzLmZhZGVJbk91dEFuaW1hdGlvbiA9ICdjbG9zZS1mYXN0JztcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyOiBPYnNlcnZlcjxhbnk+KSA9PiB7XG4gICAgICBvYnNlcnZlci5uZXh0KCcnKTtcbiAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgfSkucGlwZShkZWxheShjbG9zZUR1cmF0aW9uKSk7XG4gIH1cblxuICBvbk92ZXJsYXlDbGlja2VkKGV2dDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIC8vIGNvbnNvbGUubG9nKCdvbk92ZXJsYXlDbGlja2VkJyk7XG4gIH1cblxuICBvbkN1c3RvbUJ1dHRvbihfQnV0dG9uOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmRpYWxvZ0JlbG9uZ2luZy5ldmVudHNDb250cm9sbGVyLm9uQnV0dG9uQ2xpY2soX0J1dHRvbik7XG4gIH1cblxuICBjbG9zZUxvYWRlcigpOiB2b2lkIHtcbiAgICB0aGlzLnNob3dMb2FkZXIgPSBmYWxzZTtcbiAgfVxuXG4gIHNldEN1c3RvbVN0eWxlcygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kaWFsb2dCZWxvbmdpbmcuZGlhbG9nQ29yZUNvbmZpZy5jdXN0b21TdHlsZXMud3JhcHBlckNTUyAmJiB0aGlzLmVsRGlhbG9nV3JhcHBlcikge1xuICAgICAgdGhpcy5lbERpYWxvZ1dyYXBwZXIubmF0aXZlRWxlbWVudC5zdHlsZS5jc3NUZXh0ICs9IHRoaXMuZGlhbG9nQmVsb25naW5nLmRpYWxvZ0NvcmVDb25maWcuY3VzdG9tU3R5bGVzLndyYXBwZXJDU1M7XG4gICAgfVxuICAgIGlmICh0aGlzLmRpYWxvZ0JlbG9uZ2luZy5kaWFsb2dDb3JlQ29uZmlnLmN1c3RvbVN0eWxlcy5idXR0b25TZWN0aW9uQ1NTICYmIHRoaXMuZWxCdXR0b25XcmFwcGVyKSB7XG4gICAgICB0aGlzLmVsQnV0dG9uV3JhcHBlci5uYXRpdmVFbGVtZW50LnN0eWxlLmNzc1RleHQgKz0gdGhpcy5kaWFsb2dCZWxvbmdpbmcuZGlhbG9nQ29yZUNvbmZpZy5jdXN0b21TdHlsZXMuYnV0dG9uU2VjdGlvbkNTUztcbiAgICB9XG4gICAgaWYgKHRoaXMuZGlhbG9nQmVsb25naW5nLmRpYWxvZ0NvcmVDb25maWcuY3VzdG9tU3R5bGVzLmJ1dHRvbkNTUyAmJiB0aGlzLmVsQnV0dG9uKSB7XG4gICAgICB0aGlzLmVsQnV0dG9uLmZvckVhY2goZWwgPT4ge1xuICAgICAgICBlbC5uYXRpdmVFbGVtZW50LnN0eWxlLmNzc1RleHQgKz0gdGhpcy5kaWFsb2dCZWxvbmdpbmcuZGlhbG9nQ29yZUNvbmZpZy5jdXN0b21TdHlsZXMuYnV0dG9uQ1NTO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OmtleXVwJywgWyckZXZlbnQnXSlcbiAga2V5RXZlbnQoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZXZlbnQua2V5ID09PSAnRXNjYXBlJykge1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH1cbiAgfVxufVxuIl19