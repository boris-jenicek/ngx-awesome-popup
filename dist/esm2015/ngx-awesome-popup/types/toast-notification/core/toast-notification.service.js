import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
import { map } from 'rxjs/operators';
import { DialogInjector } from '../../../core/dialog-injector';
import { GlobalConfigService } from '../../../core/global-config.service';
import { ToastNotificationSimpleWrapperComponent } from '../toast-notification-simple-wrapper/toast-notification-simple-wrapper.component';
import { ToastNotificationWrapperComponent } from '../toast-notification-wrapper/toast-notification-wrapper.component';
import { ToastNotificationEventsController } from './classes';
import { ToastUserViewTypeEnum } from './enums';
import { ToastNotificationConfigService } from './toast-notification-config.service';
import * as i0 from "@angular/core";
import * as i1 from "./toast-notification-config.service";
import * as i2 from "../../../core/global-config.service";
export class ToastNotificationService {
    constructor(componentFactoryResolver, injector, appRef, toastConfig, gConfigService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.injector = injector;
        this.appRef = appRef;
        this.toastConfig = toastConfig;
        this.gConfigService = gConfigService;
        this.toastComponentRefList = [];
        this.bufferToastRawList = [];
        this.bufferCheckingIntervalIsReady = true;
    }
    openToast$(_ToastNotificationBelonging) {
        let eventController = _ToastNotificationBelonging.EventsController;
        // console.log(`%c ${_ToastNotificationBelonging.EntityUniqueID} `, `background: #339933; color: #fff`);
        const toastRawInstance = this.prepareRawToast(eventController, _ToastNotificationBelonging);
        this.listeners(eventController);
        this.internalRouting(toastRawInstance);
        return eventController.afterClosed$;
    }
    internalRouting(_ToastRawInstance) {
        if (this.isRefListAvailable()) {
            this.sendToProduction(_ToastRawInstance);
            return true;
        }
        else {
            this.sendToBuffer(_ToastRawInstance);
            return false;
        }
    }
    sendToBuffer(_ToastRawInstance) {
        this.bufferToastRawList.push(_ToastRawInstance);
    }
    sendToProduction(_ToastRawInstance) {
        const componentRef = this.getComponentRef(_ToastRawInstance);
        if (componentRef) {
            this.toastComponentRefList.push(componentRef);
            componentRef.instance.toastNotificationBelonging = _ToastRawInstance.ToastBelonging;
            this.appendToBodyParentComponent(componentRef);
        }
    }
    isRefListAvailable() {
        return (this.toastComponentRefList.length < this.toastConfig.productionConfig.GlobalSettings.AllowedNotificationsAtOnce);
    }
    prepareRawToast(_EventsController, _ToastNotificationBelonging) {
        const weakMap = new WeakMap();
        weakMap.set(ToastNotificationEventsController, _EventsController);
        return {
            WeakMap: weakMap,
            ToastBelonging: _ToastNotificationBelonging
        };
    }
    getComponentRef(_ToastNotificationRawState) {
        const dialogIndex = this.findDialogIndex(_ToastNotificationRawState.ToastBelonging.EntityUniqueID);
        if (dialogIndex === -1) {
            let toastUserViewComponent = ToastNotificationWrapperComponent;
            if (_ToastNotificationRawState.ToastBelonging.ToastCoreConfig.ToastUserViewType === ToastUserViewTypeEnum.SIMPLE) {
                toastUserViewComponent = ToastNotificationSimpleWrapperComponent;
            }
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(toastUserViewComponent);
            return componentFactory.create(new DialogInjector(this.injector, _ToastNotificationRawState.WeakMap));
        }
        return null;
    }
    listeners(_EventsController) {
        // Listener for closing dialog
        const closeDialogSubscription = _EventsController.afterClosed$.subscribe(response => {
            // this.removeFromBodyParentComponent(modalIndex);
            this.removeFromBody(response.toastNotificationBelonging.EntityUniqueID);
            closeDialogSubscription.unsubscribe();
        });
    }
    appendToBodyParentComponent(_ComponentRef) {
        // attach view to ignite lifecycle hooks
        this.appRef.attachView(_ComponentRef.hostView);
        const toastPosition = _ComponentRef.instance.toastNotificationBelonging.ToastCoreConfig.ToastPosition;
        const openInElementID = _ComponentRef.instance.toastNotificationBelonging.ToastCoreConfig.OpenInElementID;
        let targetNode;
        if (!openInElementID) {
            this.setToastWrapperNode(_ComponentRef.instance.toastNotificationBelonging.ToastCoreConfig.ToastPosition, this.setToastOverlayNode());
            targetNode = document.getElementById(`toast-wrapper-${toastPosition}`);
        }
        else {
            targetNode = document.getElementById(openInElementID);
        }
        const domElem = _ComponentRef.hostView.rootNodes[0];
        const toastEntity = document.createElement('div');
        toastEntity.setAttribute('id', _ComponentRef.instance.toastNotificationBelonging.EntityUniqueID);
        toastEntity.className = 'toast-entity';
        const split = toastPosition.split('-');
        if (split[1] === 'fullwidth') {
            toastEntity.style.width = '93vw';
        }
        else if (openInElementID) {
            toastEntity.style.width = '100%';
        }
        else {
            toastEntity.style.width = '300px';
        }
        toastEntity.style.margin = 'auto';
        toastEntity.prepend(domElem);
        targetNode.prepend(toastEntity);
        /*setTimeout(() => {
          targetNode.prepend(toastEntity);
        }, 200);*/
    }
    removeFromBody(_EntityUniqueID) {
        const modalIndex = this.findDialogIndex(_EntityUniqueID);
        if (modalIndex > -1) {
            if (this.bufferToastRawList.length) {
                this.sendToProduction(this.bufferToastRawList[0]);
                this.bufferToastRawList.splice(0, 1);
            }
            this.toastComponentRefList[modalIndex].instance
                .closeParent$()
                .pipe(map(item => {
                const modalIndex = this.findDialogIndex(_EntityUniqueID);
                if (this.toastComponentRefList[modalIndex]) {
                    const toastEntity = document.getElementById(this.toastComponentRefList[modalIndex].instance.toastNotificationBelonging.EntityUniqueID);
                    toastEntity.remove();
                    // console.log(`%c ${this.toastComponentRefList[modalIndex].instance.toastNotificationBelonging.EntityUniqueID} `, `background: #cc3333; color: #fff`);
                    this.appRef.detachView(this.toastComponentRefList[modalIndex].hostView);
                    this.toastComponentRefList[modalIndex].destroy();
                    this.toastComponentRefList.splice(modalIndex, 1);
                }
            }))
                .subscribe();
        }
    }
    findDialogIndex(_DialogUniqueID) {
        return this.toastComponentRefList.findIndex(item => {
            return _DialogUniqueID === item.instance.toastNotificationBelonging.EntityUniqueID;
        });
    }
    setToastOverlayNode() {
        const bodyNode = document.body || document.getElementsByTagName('body')[0];
        if (!bodyNode) {
            return;
        }
        // check the overlay
        let toastOverlayNode = document.getElementById('toast-overlay-container');
        if (!toastOverlayNode) {
            let toastOverlayNode = document.createElement('div');
            toastOverlayNode.setAttribute('id', 'toast-overlay-container');
            toastOverlayNode.appendChild(document.createTextNode(''));
            toastOverlayNode.style.position = 'fixed';
            toastOverlayNode.style.top = '0';
            toastOverlayNode.style.left = '0';
            toastOverlayNode.style.zIndex = '999999999999';
            bodyNode.appendChild(toastOverlayNode);
            return toastOverlayNode;
        }
        return toastOverlayNode;
    }
    setToastWrapperNode(_Position, _ToastOverlayNode) {
        let toastWrapperNode = document.getElementById(`toast-wrapper-${_Position}`);
        if (!toastWrapperNode) {
            const toastWrapper = document.createElement('div');
            toastWrapper.setAttribute('id', 'toast-wrapper-' + _Position);
            toastWrapper.appendChild(document.createTextNode(''));
            _ToastOverlayNode.prepend(toastWrapper);
            const split = _Position.split('-');
            if (split[1] === 'right' || split[1] === 'left') {
                this.gConfigService
                    .getSheet('ngx-awesome-popup-styles')
                    .addRule(`#toast-wrapper-${_Position}`, `${split[0]}: 20px; ${split[1]}: 20px; position: fixed; z-index: 999999999;`);
            }
            if (split[1] === 'center') {
                this.gConfigService
                    .getSheet('ngx-awesome-popup-styles')
                    .addRule(`#toast-wrapper-${_Position}`, `${split[0]}: 20px; width: 100%; position: fixed; z-index: 999999999; pointer-events: none;`);
            }
            if (split[1] === 'fullwidth') {
                this.gConfigService
                    .getSheet('ngx-awesome-popup-styles')
                    .addRule(`#toast-wrapper-${_Position}`, `${split[0]}: 10px; width: 100%; position: fixed; z-index: 999999999; pointer-events: none;`);
            }
        }
    }
}
ToastNotificationService.ɵprov = i0.ɵɵdefineInjectable({ factory: function ToastNotificationService_Factory() { return new ToastNotificationService(i0.ɵɵinject(i0.ComponentFactoryResolver), i0.ɵɵinject(i0.INJECTOR), i0.ɵɵinject(i0.ApplicationRef), i0.ɵɵinject(i1.ToastNotificationConfigService), i0.ɵɵinject(i2.GlobalConfigService)); }, token: ToastNotificationService, providedIn: "root" });
ToastNotificationService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
ToastNotificationService.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: Injector },
    { type: ApplicationRef },
    { type: ToastNotificationConfigService },
    { type: GlobalConfigService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3Qtbm90aWZpY2F0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9uZ3gtYXdlc29tZS1wb3B1cC90eXBlcy90b2FzdC1ub3RpZmljYXRpb24vY29yZS90b2FzdC1ub3RpZmljYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsY0FBYyxFQUNkLHdCQUF3QixFQUd4QixVQUFVLEVBQ1YsUUFBUSxFQUVULE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDL0QsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDMUUsT0FBTyxFQUFFLHVDQUF1QyxFQUFFLE1BQU0sa0ZBQWtGLENBQUM7QUFDM0ksT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0sb0VBQW9FLENBQUM7QUFDdkgsT0FBTyxFQUE4QixpQ0FBaUMsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUMxRixPQUFPLEVBQXFCLHFCQUFxQixFQUFFLE1BQU0sU0FBUyxDQUFDO0FBR25FLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDOzs7O0FBS3JGLE1BQU0sT0FBTyx3QkFBd0I7SUFLbkMsWUFDVSx3QkFBa0QsRUFDbEQsUUFBa0IsRUFDbEIsTUFBc0IsRUFDdEIsV0FBMkMsRUFDM0MsY0FBbUM7UUFKbkMsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUNsRCxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBQ3RCLGdCQUFXLEdBQVgsV0FBVyxDQUFnQztRQUMzQyxtQkFBYyxHQUFkLGNBQWMsQ0FBcUI7UUFUN0MsMEJBQXFCLEdBQXdCLEVBQUUsQ0FBQztRQUNoRCx1QkFB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QztZQUV4QyxNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRW5DLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLE9BQU8sSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssTUFBTSxFQUFFO2dCQUMvQyxJQUFJLENBQUMsY0FBYztxQkFDaEIsUUFBUSxDQUFDLDBCQUEwQixDQUFDO3FCQUNwQyxPQUFPLENBQ04sa0JBQWtCLFNBQVMsRUFBRSxFQUM3QixHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsV0FBVyxLQUFLLENBQUMsQ0FBQyxDQUFDLDhDQUE4QyxDQUM3RSxDQUFDO2FBQ0w7WUFDRCxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLEVBQUU7Z0JBQ3pCLElBQUksQ0FBQyxjQUFjO3FCQUNoQixRQUFRLENBQUMsMEJBQTBCLENBQUM7cUJBQ3BDLE9BQU8sQ0FDTixrQkFBa0IsU0FBUyxFQUFFLEVBQzdCLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxpRkFBaUYsQ0FDN0YsQ0FBQzthQUNMO1lBQ0QsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssV0FBVyxFQUFFO2dCQUM1QixJQUFJLENBQUMsY0FBYztxQkFDaEIsUUFBUSxDQUFDLDBCQUEwQixDQUFDO3FCQUNwQyxPQUFPLENBQ04sa0JBQWtCLFNBQVMsRUFBRSxFQUM3QixHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsaUZBQWlGLENBQzdGLENBQUM7YUFDTDtTQUNGO0lBQ0gsQ0FBQzs7OztZQWhPRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7OztZQXJCQyx3QkFBd0I7WUFJeEIsUUFBUTtZQUxSLGNBQWM7WUFrQlAsOEJBQThCO1lBUDlCLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFwcGxpY2F0aW9uUmVmLFxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIENvbXBvbmVudFJlZixcbiAgRW1iZWRkZWRWaWV3UmVmLFxuICBJbmplY3RhYmxlLFxuICBJbmplY3RvcixcbiAgVHlwZVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IERpYWxvZ0luamVjdG9yIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9kaWFsb2ctaW5qZWN0b3InO1xuaW1wb3J0IHsgR2xvYmFsQ29uZmlnU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvZ2xvYmFsLWNvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7IFRvYXN0Tm90aWZpY2F0aW9uU2ltcGxlV3JhcHBlckNvbXBvbmVudCB9IGZyb20gJy4uL3RvYXN0LW5vdGlmaWNhdGlvbi1zaW1wbGUtd3JhcHBlci90b2FzdC1ub3RpZmljYXRpb24tc2ltcGxlLXdyYXBwZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFRvYXN0Tm90aWZpY2F0aW9uV3JhcHBlckNvbXBvbmVudCB9IGZyb20gJy4uL3RvYXN0LW5vdGlmaWNhdGlvbi13cmFwcGVyL3RvYXN0LW5vdGlmaWNhdGlvbi13cmFwcGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUb2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZywgVG9hc3ROb3RpZmljYXRpb25FdmVudHNDb250cm9sbGVyIH0gZnJvbSAnLi9jbGFzc2VzJztcbmltcG9ydCB7IFRvYXN0UG9zaXRpb25FbnVtLCBUb2FzdFVzZXJWaWV3VHlwZUVudW0gfSBmcm9tICcuL2VudW1zJztcbmltcG9ydCB7IElQcml2YXRlUmVzcG9uc2VNZXJnZWQsIElUb2FzdE5vdGlmaWNhdGlvblJhd1N0YXRlIH0gZnJvbSAnLi9pbnRlcmZhY2VzJztcblxuaW1wb3J0IHsgVG9hc3ROb3RpZmljYXRpb25Db25maWdTZXJ2aWNlIH0gZnJvbSAnLi90b2FzdC1ub3RpZmljYXRpb24tY29uZmlnLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBUb2FzdE5vdGlmaWNhdGlvblNlcnZpY2Uge1xuICB0b2FzdENvbXBvbmVudFJlZkxpc3Q6IENvbXBvbmVudFJlZjxhbnk+W10gPSBbXTtcbiAgYnVmZmVyVG9hc3RSYXdMaXN0OiBJVG9hc3ROb3RpZmljYXRpb25SYXdTdGF0ZVtdID0gW107XG4gIGJ1ZmZlckNoZWNraW5nSW50ZXJ2YWxJc1JlYWR5OiBib29sZWFuID0gdHJ1ZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIHByaXZhdGUgYXBwUmVmOiBBcHBsaWNhdGlvblJlZixcbiAgICBwcml2YXRlIHRvYXN0Q29uZmlnOiBUb2FzdE5vdGlmaWNhdGlvbkNvbmZpZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBnQ29uZmlnU2VydmljZTogR2xvYmFsQ29uZmlnU2VydmljZVxuICApIHt9XG5cbiAgb3BlblRvYXN0JChfVG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmc6IFRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nKTogT2JzZXJ2YWJsZTxJUHJpdmF0ZVJlc3BvbnNlTWVyZ2VkPiB7XG4gICAgbGV0IGV2ZW50Q29udHJvbGxlciA9IF9Ub2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5FdmVudHNDb250cm9sbGVyO1xuICAgIC8vIGNvbnNvbGUubG9nKGAlYyAke19Ub2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5FbnRpdHlVbmlxdWVJRH0gYCwgYGJhY2tncm91bmQ6ICMzMzk5MzM7IGNvbG9yOiAjZmZmYCk7XG5cbiAgICBjb25zdCB0b2FzdFJhd0luc3RhbmNlID0gdGhpcy5wcmVwYXJlUmF3VG9hc3QoZXZlbnRDb250cm9sbGVyLCBfVG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcpO1xuICAgIHRoaXMubGlzdGVuZXJzKGV2ZW50Q29udHJvbGxlcik7XG4gICAgdGhpcy5pbnRlcm5hbFJvdXRpbmcodG9hc3RSYXdJbnN0YW5jZSk7XG4gICAgcmV0dXJuIGV2ZW50Q29udHJvbGxlci5hZnRlckNsb3NlZCQ7XG4gIH1cblxuICBpbnRlcm5hbFJvdXRpbmcoX1RvYXN0UmF3SW5zdGFuY2U6IElUb2FzdE5vdGlmaWNhdGlvblJhd1N0YXRlKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuaXNSZWZMaXN0QXZhaWxhYmxlKCkpIHtcbiAgICAgIHRoaXMuc2VuZFRvUHJvZHVjdGlvbihfVG9hc3RSYXdJbnN0YW5jZSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZW5kVG9CdWZmZXIoX1RvYXN0UmF3SW5zdGFuY2UpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHNlbmRUb0J1ZmZlcihfVG9hc3RSYXdJbnN0YW5jZTogSVRvYXN0Tm90aWZpY2F0aW9uUmF3U3RhdGUpIHtcbiAgICB0aGlzLmJ1ZmZlclRvYXN0UmF3TGlzdC5wdXNoKF9Ub2FzdFJhd0luc3RhbmNlKTtcbiAgfVxuXG4gIHNlbmRUb1Byb2R1Y3Rpb24oX1RvYXN0UmF3SW5zdGFuY2U6IElUb2FzdE5vdGlmaWNhdGlvblJhd1N0YXRlKTogdm9pZCB7XG4gICAgY29uc3QgY29tcG9uZW50UmVmID0gdGhpcy5nZXRDb21wb25lbnRSZWYoX1RvYXN0UmF3SW5zdGFuY2UpO1xuICAgIGlmIChjb21wb25lbnRSZWYpIHtcbiAgICAgIHRoaXMudG9hc3RDb21wb25lbnRSZWZMaXN0LnB1c2goY29tcG9uZW50UmVmKTtcbiAgICAgIGNvbXBvbmVudFJlZi5pbnN0YW5jZS50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZyA9IF9Ub2FzdFJhd0luc3RhbmNlLlRvYXN0QmVsb25naW5nO1xuICAgICAgdGhpcy5hcHBlbmRUb0JvZHlQYXJlbnRDb21wb25lbnQoY29tcG9uZW50UmVmKTtcbiAgICB9XG4gIH1cblxuICBpc1JlZkxpc3RBdmFpbGFibGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMudG9hc3RDb21wb25lbnRSZWZMaXN0Lmxlbmd0aCA8IHRoaXMudG9hc3RDb25maWcucHJvZHVjdGlvbkNvbmZpZy5HbG9iYWxTZXR0aW5ncy5BbGxvd2VkTm90aWZpY2F0aW9uc0F0T25jZVxuICAgICk7XG4gIH1cblxuICBwcmVwYXJlUmF3VG9hc3QoXG4gICAgX0V2ZW50c0NvbnRyb2xsZXI6IFRvYXN0Tm90aWZpY2F0aW9uRXZlbnRzQ29udHJvbGxlcixcbiAgICBfVG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmc6IFRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nXG4gICk6IElUb2FzdE5vdGlmaWNhdGlvblJhd1N0YXRlIHtcbiAgICBjb25zdCB3ZWFrTWFwID0gbmV3IFdlYWtNYXAoKTtcbiAgICB3ZWFrTWFwLnNldChUb2FzdE5vdGlmaWNhdGlvbkV2ZW50c0NvbnRyb2xsZXIsIF9FdmVudHNDb250cm9sbGVyKTtcblxuICAgIHJldHVybiB7XG4gICAgICBXZWFrTWFwOiB3ZWFrTWFwLFxuICAgICAgVG9hc3RCZWxvbmdpbmc6IF9Ub2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZ1xuICAgIH07XG4gIH1cblxuICBnZXRDb21wb25lbnRSZWYoX1RvYXN0Tm90aWZpY2F0aW9uUmF3U3RhdGU6IElUb2FzdE5vdGlmaWNhdGlvblJhd1N0YXRlKTogQ29tcG9uZW50UmVmPGFueT4gfCBudWxsIHtcbiAgICBjb25zdCBkaWFsb2dJbmRleCA9IHRoaXMuZmluZERpYWxvZ0luZGV4KF9Ub2FzdE5vdGlmaWNhdGlvblJhd1N0YXRlLlRvYXN0QmVsb25naW5nLkVudGl0eVVuaXF1ZUlEKTtcbiAgICBpZiAoZGlhbG9nSW5kZXggPT09IC0xKSB7XG4gICAgICBsZXQgdG9hc3RVc2VyVmlld0NvbXBvbmVudDogVHlwZTxhbnk+ID0gVG9hc3ROb3RpZmljYXRpb25XcmFwcGVyQ29tcG9uZW50O1xuICAgICAgaWYgKFxuICAgICAgICBfVG9hc3ROb3RpZmljYXRpb25SYXdTdGF0ZS5Ub2FzdEJlbG9uZ2luZy5Ub2FzdENvcmVDb25maWcuVG9hc3RVc2VyVmlld1R5cGUgPT09IFRvYXN0VXNlclZpZXdUeXBlRW51bS5TSU1QTEVcbiAgICAgICkge1xuICAgICAgICB0b2FzdFVzZXJWaWV3Q29tcG9uZW50ID0gVG9hc3ROb3RpZmljYXRpb25TaW1wbGVXcmFwcGVyQ29tcG9uZW50O1xuICAgICAgfVxuICAgICAgY29uc3QgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KHRvYXN0VXNlclZpZXdDb21wb25lbnQpO1xuICAgICAgcmV0dXJuIGNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKG5ldyBEaWFsb2dJbmplY3Rvcih0aGlzLmluamVjdG9yLCBfVG9hc3ROb3RpZmljYXRpb25SYXdTdGF0ZS5XZWFrTWFwKSk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgbGlzdGVuZXJzKF9FdmVudHNDb250cm9sbGVyOiBUb2FzdE5vdGlmaWNhdGlvbkV2ZW50c0NvbnRyb2xsZXIpIHtcbiAgICAvLyBMaXN0ZW5lciBmb3IgY2xvc2luZyBkaWFsb2dcbiAgICBjb25zdCBjbG9zZURpYWxvZ1N1YnNjcmlwdGlvbiA9IF9FdmVudHNDb250cm9sbGVyLmFmdGVyQ2xvc2VkJC5zdWJzY3JpYmUocmVzcG9uc2UgPT4ge1xuICAgICAgLy8gdGhpcy5yZW1vdmVGcm9tQm9keVBhcmVudENvbXBvbmVudChtb2RhbEluZGV4KTtcbiAgICAgIHRoaXMucmVtb3ZlRnJvbUJvZHkocmVzcG9uc2UudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuRW50aXR5VW5pcXVlSUQpO1xuICAgICAgY2xvc2VEaWFsb2dTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFwcGVuZFRvQm9keVBhcmVudENvbXBvbmVudChfQ29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8YW55Pik6IHZvaWQge1xuICAgIC8vIGF0dGFjaCB2aWV3IHRvIGlnbml0ZSBsaWZlY3ljbGUgaG9va3NcbiAgICB0aGlzLmFwcFJlZi5hdHRhY2hWaWV3KF9Db21wb25lbnRSZWYuaG9zdFZpZXcpO1xuXG4gICAgY29uc3QgdG9hc3RQb3NpdGlvbjogVG9hc3RQb3NpdGlvbkVudW0gPVxuICAgICAgX0NvbXBvbmVudFJlZi5pbnN0YW5jZS50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5Ub2FzdENvcmVDb25maWcuVG9hc3RQb3NpdGlvbjtcbiAgICBjb25zdCBvcGVuSW5FbGVtZW50SUQgPSBfQ29tcG9uZW50UmVmLmluc3RhbmNlLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLlRvYXN0Q29yZUNvbmZpZy5PcGVuSW5FbGVtZW50SUQ7XG4gICAgbGV0IHRhcmdldE5vZGU6IEhUTUxFbGVtZW50O1xuICAgIGlmICghb3BlbkluRWxlbWVudElEKSB7XG4gICAgICB0aGlzLnNldFRvYXN0V3JhcHBlck5vZGUoXG4gICAgICAgIF9Db21wb25lbnRSZWYuaW5zdGFuY2UudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuVG9hc3RDb3JlQ29uZmlnLlRvYXN0UG9zaXRpb24sXG4gICAgICAgIHRoaXMuc2V0VG9hc3RPdmVybGF5Tm9kZSgpXG4gICAgICApO1xuICAgICAgdGFyZ2V0Tm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGB0b2FzdC13cmFwcGVyLSR7dG9hc3RQb3NpdGlvbn1gKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGFyZ2V0Tm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG9wZW5JbkVsZW1lbnRJRCk7XG4gICAgfVxuXG4gICAgY29uc3QgZG9tRWxlbSA9IChfQ29tcG9uZW50UmVmLmhvc3RWaWV3IGFzIEVtYmVkZGVkVmlld1JlZjxhbnk+KS5yb290Tm9kZXNbMF0gYXMgSFRNTEVsZW1lbnQ7XG5cbiAgICBjb25zdCB0b2FzdEVudGl0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRvYXN0RW50aXR5LnNldEF0dHJpYnV0ZSgnaWQnLCBfQ29tcG9uZW50UmVmLmluc3RhbmNlLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLkVudGl0eVVuaXF1ZUlEKTtcbiAgICB0b2FzdEVudGl0eS5jbGFzc05hbWUgPSAndG9hc3QtZW50aXR5JztcbiAgICBjb25zdCBzcGxpdCA9IHRvYXN0UG9zaXRpb24uc3BsaXQoJy0nKTtcbiAgICBpZiAoc3BsaXRbMV0gPT09ICdmdWxsd2lkdGgnKSB7XG4gICAgICB0b2FzdEVudGl0eS5zdHlsZS53aWR0aCA9ICc5M3Z3JztcbiAgICB9IGVsc2UgaWYgKG9wZW5JbkVsZW1lbnRJRCkge1xuICAgICAgdG9hc3RFbnRpdHkuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRvYXN0RW50aXR5LnN0eWxlLndpZHRoID0gJzMwMHB4JztcbiAgICB9XG4gICAgdG9hc3RFbnRpdHkuc3R5bGUubWFyZ2luID0gJ2F1dG8nO1xuICAgIHRvYXN0RW50aXR5LnByZXBlbmQoZG9tRWxlbSk7XG4gICAgdGFyZ2V0Tm9kZS5wcmVwZW5kKHRvYXN0RW50aXR5KTtcbiAgICAvKnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGFyZ2V0Tm9kZS5wcmVwZW5kKHRvYXN0RW50aXR5KTtcbiAgICB9LCAyMDApOyovXG4gIH1cblxuICByZW1vdmVGcm9tQm9keShfRW50aXR5VW5pcXVlSUQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IG1vZGFsSW5kZXggPSB0aGlzLmZpbmREaWFsb2dJbmRleChfRW50aXR5VW5pcXVlSUQpO1xuICAgIGlmIChtb2RhbEluZGV4ID4gLTEpIHtcbiAgICAgIGlmICh0aGlzLmJ1ZmZlclRvYXN0UmF3TGlzdC5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5zZW5kVG9Qcm9kdWN0aW9uKHRoaXMuYnVmZmVyVG9hc3RSYXdMaXN0WzBdKTtcbiAgICAgICAgdGhpcy5idWZmZXJUb2FzdFJhd0xpc3Quc3BsaWNlKDAsIDEpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnRvYXN0Q29tcG9uZW50UmVmTGlzdFttb2RhbEluZGV4XS5pbnN0YW5jZVxuICAgICAgICAuY2xvc2VQYXJlbnQkKClcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgbWFwKGl0ZW0gPT4ge1xuICAgICAgICAgICAgY29uc3QgbW9kYWxJbmRleCA9IHRoaXMuZmluZERpYWxvZ0luZGV4KF9FbnRpdHlVbmlxdWVJRCk7XG4gICAgICAgICAgICBpZiAodGhpcy50b2FzdENvbXBvbmVudFJlZkxpc3RbbW9kYWxJbmRleF0pIHtcbiAgICAgICAgICAgICAgY29uc3QgdG9hc3RFbnRpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAgICAgICAgICAgICB0aGlzLnRvYXN0Q29tcG9uZW50UmVmTGlzdFttb2RhbEluZGV4XS5pbnN0YW5jZS50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5FbnRpdHlVbmlxdWVJRFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB0b2FzdEVudGl0eS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYCVjICR7dGhpcy50b2FzdENvbXBvbmVudFJlZkxpc3RbbW9kYWxJbmRleF0uaW5zdGFuY2UudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuRW50aXR5VW5pcXVlSUR9IGAsIGBiYWNrZ3JvdW5kOiAjY2MzMzMzOyBjb2xvcjogI2ZmZmApO1xuICAgICAgICAgICAgICB0aGlzLmFwcFJlZi5kZXRhY2hWaWV3KHRoaXMudG9hc3RDb21wb25lbnRSZWZMaXN0W21vZGFsSW5kZXhdLmhvc3RWaWV3KTtcbiAgICAgICAgICAgICAgdGhpcy50b2FzdENvbXBvbmVudFJlZkxpc3RbbW9kYWxJbmRleF0uZGVzdHJveSgpO1xuICAgICAgICAgICAgICB0aGlzLnRvYXN0Q29tcG9uZW50UmVmTGlzdC5zcGxpY2UobW9kYWxJbmRleCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgZmluZERpYWxvZ0luZGV4KF9EaWFsb2dVbmlxdWVJRDogc3RyaW5nKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy50b2FzdENvbXBvbmVudFJlZkxpc3QuZmluZEluZGV4KGl0ZW0gPT4ge1xuICAgICAgcmV0dXJuIF9EaWFsb2dVbmlxdWVJRCA9PT0gaXRlbS5pbnN0YW5jZS50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5FbnRpdHlVbmlxdWVJRDtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0VG9hc3RPdmVybGF5Tm9kZSgpOiBIVE1MRWxlbWVudCB7XG4gICAgY29uc3QgYm9keU5vZGUgPSBkb2N1bWVudC5ib2R5IHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF07XG4gICAgaWYgKCFib2R5Tm9kZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBjaGVjayB0aGUgb3ZlcmxheVxuICAgIGxldCB0b2FzdE92ZXJsYXlOb2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvYXN0LW92ZXJsYXktY29udGFpbmVyJykgYXMgSFRNTFN0eWxlRWxlbWVudDtcblxuICAgIGlmICghdG9hc3RPdmVybGF5Tm9kZSkge1xuICAgICAgbGV0IHRvYXN0T3ZlcmxheU5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHRvYXN0T3ZlcmxheU5vZGUuc2V0QXR0cmlidXRlKCdpZCcsICd0b2FzdC1vdmVybGF5LWNvbnRhaW5lcicpO1xuICAgICAgdG9hc3RPdmVybGF5Tm9kZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJykpO1xuICAgICAgdG9hc3RPdmVybGF5Tm9kZS5zdHlsZS5wb3NpdGlvbiA9ICdmaXhlZCc7XG4gICAgICB0b2FzdE92ZXJsYXlOb2RlLnN0eWxlLnRvcCA9ICcwJztcbiAgICAgIHRvYXN0T3ZlcmxheU5vZGUuc3R5bGUubGVmdCA9ICcwJztcbiAgICAgIHRvYXN0T3ZlcmxheU5vZGUuc3R5bGUuekluZGV4ID0gJzk5OTk5OTk5OTk5OSc7XG4gICAgICBib2R5Tm9kZS5hcHBlbmRDaGlsZCh0b2FzdE92ZXJsYXlOb2RlKTtcbiAgICAgIHJldHVybiB0b2FzdE92ZXJsYXlOb2RlO1xuICAgIH1cblxuICAgIHJldHVybiB0b2FzdE92ZXJsYXlOb2RlO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRUb2FzdFdyYXBwZXJOb2RlKF9Qb3NpdGlvbjogVG9hc3RQb3NpdGlvbkVudW0sIF9Ub2FzdE92ZXJsYXlOb2RlOiBIVE1MRWxlbWVudCkge1xuICAgIGxldCB0b2FzdFdyYXBwZXJOb2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHRvYXN0LXdyYXBwZXItJHtfUG9zaXRpb259YCkgYXMgSFRNTFN0eWxlRWxlbWVudDtcbiAgICBpZiAoIXRvYXN0V3JhcHBlck5vZGUpIHtcbiAgICAgIGNvbnN0IHRvYXN0V3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgdG9hc3RXcmFwcGVyLnNldEF0dHJpYnV0ZSgnaWQnLCAndG9hc3Qtd3JhcHBlci0nICsgX1Bvc2l0aW9uKTtcbiAgICAgIHRvYXN0V3JhcHBlci5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJykpO1xuICAgICAgX1RvYXN0T3ZlcmxheU5vZGUucHJlcGVuZCh0b2FzdFdyYXBwZXIpO1xuXG4gICAgICBjb25zdCBzcGxpdCA9IF9Qb3NpdGlvbi5zcGxpdCgnLScpO1xuXG4gICAgICBpZiAoc3BsaXRbMV0gPT09ICdyaWdodCcgfHwgc3BsaXRbMV0gPT09ICdsZWZ0Jykge1xuICAgICAgICB0aGlzLmdDb25maWdTZXJ2aWNlXG4gICAgICAgICAgLmdldFNoZWV0KCduZ3gtYXdlc29tZS1wb3B1cC1zdHlsZXMnKVxuICAgICAgICAgIC5hZGRSdWxlKFxuICAgICAgICAgICAgYCN0b2FzdC13cmFwcGVyLSR7X1Bvc2l0aW9ufWAsXG4gICAgICAgICAgICBgJHtzcGxpdFswXX06IDIwcHg7ICR7c3BsaXRbMV19OiAyMHB4OyBwb3NpdGlvbjogZml4ZWQ7IHotaW5kZXg6IDk5OTk5OTk5OTtgXG4gICAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGlmIChzcGxpdFsxXSA9PT0gJ2NlbnRlcicpIHtcbiAgICAgICAgdGhpcy5nQ29uZmlnU2VydmljZVxuICAgICAgICAgIC5nZXRTaGVldCgnbmd4LWF3ZXNvbWUtcG9wdXAtc3R5bGVzJylcbiAgICAgICAgICAuYWRkUnVsZShcbiAgICAgICAgICAgIGAjdG9hc3Qtd3JhcHBlci0ke19Qb3NpdGlvbn1gLFxuICAgICAgICAgICAgYCR7c3BsaXRbMF19OiAyMHB4OyB3aWR0aDogMTAwJTsgcG9zaXRpb246IGZpeGVkOyB6LWluZGV4OiA5OTk5OTk5OTk7IHBvaW50ZXItZXZlbnRzOiBub25lO2BcbiAgICAgICAgICApO1xuICAgICAgfVxuICAgICAgaWYgKHNwbGl0WzFdID09PSAnZnVsbHdpZHRoJykge1xuICAgICAgICB0aGlzLmdDb25maWdTZXJ2aWNlXG4gICAgICAgICAgLmdldFNoZWV0KCduZ3gtYXdlc29tZS1wb3B1cC1zdHlsZXMnKVxuICAgICAgICAgIC5hZGRSdWxlKFxuICAgICAgICAgICAgYCN0b2FzdC13cmFwcGVyLSR7X1Bvc2l0aW9ufWAsXG4gICAgICAgICAgICBgJHtzcGxpdFswXX06IDEwcHg7IHdpZHRoOiAxMDAlOyBwb3NpdGlvbjogZml4ZWQ7IHotaW5kZXg6IDk5OTk5OTk5OTsgcG9pbnRlci1ldmVudHM6IG5vbmU7YFxuICAgICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=