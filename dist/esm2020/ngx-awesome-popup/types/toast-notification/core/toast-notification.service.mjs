import { Injectable } from '@angular/core';
import { take, tap } from 'rxjs/operators';
import { DialogInjector } from '../../../core/dialog-injector';
import { ToastNotificationSimpleWrapperComponent } from '../toast-notification-simple-wrapper/toast-notification-simple-wrapper.component';
import { ToastNotificationWrapperComponent } from '../toast-notification-wrapper/toast-notification-wrapper.component';
import { ToastNotificationeventsController } from './classes';
import { ToastUserViewTypeEnum } from './enums';
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
        const eventController = _ToastNotificationBelonging.eventsController;
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
            componentRef.instance.toastNotificationBelonging = _ToastRawInstance.toastBelonging;
            this.appendToBodyParentComponent(componentRef);
        }
    }
    isRefListAvailable() {
        return (this.toastComponentRefList.length < this.toastConfig.productionConfig.globalSettings.allowedNotificationsAtOnce);
    }
    prepareRawToast(_eventsController, _ToastNotificationBelonging) {
        const weakMap = new WeakMap();
        weakMap.set(ToastNotificationeventsController, _eventsController);
        return {
            weakMap: weakMap,
            toastBelonging: _ToastNotificationBelonging
        };
    }
    getComponentRef(_ToastNotificationRawState) {
        const dialogIndex = this.findDialogIndex(_ToastNotificationRawState.toastBelonging.entityUniqueID);
        if (dialogIndex === -1) {
            let toastUserViewComponent = ToastNotificationWrapperComponent;
            if (_ToastNotificationRawState.toastBelonging.toastCoreConfig.toastUserViewType === ToastUserViewTypeEnum.SIMPLE) {
                toastUserViewComponent = ToastNotificationSimpleWrapperComponent;
            }
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(toastUserViewComponent);
            return componentFactory.create(new DialogInjector(this.injector, _ToastNotificationRawState.weakMap));
        }
        return null;
    }
    listeners(_eventsController) {
        const closeDialogSubscription = _eventsController.afterClosed$.subscribe(response => {
            this.removeFromBody(response.toastNotificationBelonging.entityUniqueID);
            closeDialogSubscription.unsubscribe();
        });
    }
    appendToBodyParentComponent(_ComponentRef) {
        this.appRef.attachView(_ComponentRef.hostView);
        const toastPosition = _ComponentRef.instance.toastNotificationBelonging.toastCoreConfig.toastPosition;
        const openInElementID = _ComponentRef.instance.toastNotificationBelonging.toastCoreConfig.openInElementID;
        let targetNode;
        if (!openInElementID) {
            this.setToastWrapperNode(_ComponentRef.instance.toastNotificationBelonging.toastCoreConfig.toastPosition, this.setToastOverlayNode());
            targetNode = document.getElementById(`toast-wrapper-${toastPosition}`);
        }
        else {
            targetNode = document.getElementById(openInElementID);
        }
        const domElem = _ComponentRef.hostView.rootNodes[0];
        const toastEntity = document.createElement('div');
        toastEntity.setAttribute('id', _ComponentRef.instance.toastNotificationBelonging.entityUniqueID);
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
    }
    removeFromBody(_entityUniqueID) {
        const modalIndex = this.findDialogIndex(_entityUniqueID);
        if (modalIndex > -1) {
            if (this.bufferToastRawList.length) {
                this.sendToProduction(this.bufferToastRawList[0]);
                this.bufferToastRawList.splice(0, 1);
            }
            this.toastComponentRefList[modalIndex].instance
                .closeParent$()
                .pipe(tap(item => {
                const modalIndex = this.findDialogIndex(_entityUniqueID);
                if (this.toastComponentRefList[modalIndex]) {
                    const toastEntity = document.getElementById(this.toastComponentRefList[modalIndex].instance.toastNotificationBelonging.entityUniqueID);
                    toastEntity.remove();
                    this.appRef.detachView(this.toastComponentRefList[modalIndex].hostView);
                    this.toastComponentRefList[modalIndex].destroy();
                    this.toastComponentRefList.splice(modalIndex, 1);
                }
            }), take(1))
                .subscribe();
        }
    }
    findDialogIndex(_DialogUniqueID) {
        return this.toastComponentRefList.findIndex(item => {
            return _DialogUniqueID === item.instance.toastNotificationBelonging.entityUniqueID;
        });
    }
    setToastOverlayNode() {
        const bodyNode = document.body || document.getElementsByTagName('body')[0];
        if (!bodyNode) {
            return;
        }
        const toastOverlayNode = document.getElementById('toast-overlay-container');
        if (!toastOverlayNode) {
            const toastOverlayNode = document.createElement('div');
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
        const toastWrapperNode = document.getElementById(`toast-wrapper-${_Position}`);
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
ToastNotificationService.ɵfac = function ToastNotificationService_Factory(t) { return new (t || ToastNotificationService)(i0.ɵɵinject(i0.ComponentFactoryResolver), i0.ɵɵinject(i0.Injector), i0.ɵɵinject(i0.ApplicationRef), i0.ɵɵinject(i1.ToastNotificationConfigService), i0.ɵɵinject(i2.GlobalConfigService)); };
ToastNotificationService.ɵprov = i0.ɵɵdefineInjectable({ token: ToastNotificationService, factory: ToastNotificationService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ToastNotificationService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: i0.ComponentFactoryResolver }, { type: i0.Injector }, { type: i0.ApplicationRef }, { type: i1.ToastNotificationConfigService }, { type: i2.GlobalConfigService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3Qtbm90aWZpY2F0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9uZ3gtYXdlc29tZS1wb3B1cC90eXBlcy90b2FzdC1ub3RpZmljYXRpb24vY29yZS90b2FzdC1ub3RpZmljYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBS0wsVUFBVSxFQUdYLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRS9ELE9BQU8sRUFBRSx1Q0FBdUMsRUFBRSxNQUFNLGtGQUFrRixDQUFDO0FBQzNJLE9BQU8sRUFBRSxpQ0FBaUMsRUFBRSxNQUFNLG9FQUFvRSxDQUFDO0FBQ3ZILE9BQU8sRUFBOEIsaUNBQWlDLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDMUYsT0FBTyxFQUFxQixxQkFBcUIsRUFBRSxNQUFNLFNBQVMsQ0FBQzs7OztBQVFuRSxNQUFNLE9BQU8sd0JBQXdCO0lBS25DLFlBQ1Usd0JBQWtELEVBQ2xELFFBQWtCLEVBQ2xCLE1BQXNCLEVBQ3RCLFdBQTJDLEVBQzNDLGNBQW1DO1FBSm5DLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFDbEQsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQUN0QixnQkFBVyxHQUFYLFdBQVcsQ0FBZ0M7UUFDM0MsbUJBQWMsR0FBZCxjQUFjLENBQXFCO1FBVDdDLDBCQUFxQixHQUF3QixFQUFFLENBQUM7UUFDaEQsdUJBQWtCLEdBQWlDLEVBQUUsQ0FBQztRQUN0RCxrQ0FBNkIsR0FBRyxJQUFJLENBQUM7SUFRbEMsQ0FBQztJQUVKLFVBQVUsQ0FBQywyQkFBdUQ7UUFDaEUsTUFBTSxlQUFlLEdBQUcsMkJBQTJCLENBQUMs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QkFBMEIsQ0FBQztxQkFDcEMsT0FBTyxDQUNOLGtCQUFrQixTQUFTLEVBQUUsRUFDN0IsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLFdBQVcsS0FBSyxDQUFDLENBQUMsQ0FBQyw4Q0FBOEMsQ0FDN0UsQ0FBQzthQUNMO1lBQ0QsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxFQUFFO2dCQUN6QixJQUFJLENBQUMsY0FBYztxQkFDaEIsUUFBUSxDQUFDLDBCQUEwQixDQUFDO3FCQUNwQyxPQUFPLENBQ04sa0JBQWtCLFNBQVMsRUFBRSxFQUM3QixHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsaUZBQWlGLENBQzdGLENBQUM7YUFDTDtZQUNELElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLFdBQVcsRUFBRTtnQkFDNUIsSUFBSSxDQUFDLGNBQWM7cUJBQ2hCLFFBQVEsQ0FBQywwQkFBMEIsQ0FBQztxQkFDcEMsT0FBTyxDQUNOLGtCQUFrQixTQUFTLEVBQUUsRUFDN0IsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLGlGQUFpRixDQUM3RixDQUFDO2FBQ0w7U0FDRjtJQUNILENBQUM7O2dHQTlOVSx3QkFBd0I7Z0VBQXhCLHdCQUF3QixXQUF4Qix3QkFBd0IsbUJBRnZCLE1BQU07dUZBRVAsd0JBQXdCO2NBSHBDLFVBQVU7ZUFBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFwcGxpY2F0aW9uUmVmLFxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIENvbXBvbmVudFJlZixcbiAgRW1iZWRkZWRWaWV3UmVmLFxuICBJbmplY3RhYmxlLFxuICBJbmplY3RvcixcbiAgVHlwZVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2UsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IERpYWxvZ0luamVjdG9yIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9kaWFsb2ctaW5qZWN0b3InO1xuaW1wb3J0IHsgR2xvYmFsQ29uZmlnU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvZ2xvYmFsLWNvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7IFRvYXN0Tm90aWZpY2F0aW9uU2ltcGxlV3JhcHBlckNvbXBvbmVudCB9IGZyb20gJy4uL3RvYXN0LW5vdGlmaWNhdGlvbi1zaW1wbGUtd3JhcHBlci90b2FzdC1ub3RpZmljYXRpb24tc2ltcGxlLXdyYXBwZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFRvYXN0Tm90aWZpY2F0aW9uV3JhcHBlckNvbXBvbmVudCB9IGZyb20gJy4uL3RvYXN0LW5vdGlmaWNhdGlvbi13cmFwcGVyL3RvYXN0LW5vdGlmaWNhdGlvbi13cmFwcGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUb2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZywgVG9hc3ROb3RpZmljYXRpb25ldmVudHNDb250cm9sbGVyIH0gZnJvbSAnLi9jbGFzc2VzJztcbmltcG9ydCB7IFRvYXN0UG9zaXRpb25FbnVtLCBUb2FzdFVzZXJWaWV3VHlwZUVudW0gfSBmcm9tICcuL2VudW1zJztcbmltcG9ydCB7IElQcml2YXRlUmVzcG9uc2VNZXJnZWQsIElUb2FzdE5vdGlmaWNhdGlvblJhd1N0YXRlIH0gZnJvbSAnLi9pbnRlcmZhY2VzJztcblxuaW1wb3J0IHsgVG9hc3ROb3RpZmljYXRpb25Db25maWdTZXJ2aWNlIH0gZnJvbSAnLi90b2FzdC1ub3RpZmljYXRpb24tY29uZmlnLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBUb2FzdE5vdGlmaWNhdGlvblNlcnZpY2Uge1xuICB0b2FzdENvbXBvbmVudFJlZkxpc3Q6IENvbXBvbmVudFJlZjxhbnk+W10gPSBbXTtcbiAgYnVmZmVyVG9hc3RSYXdMaXN0OiBJVG9hc3ROb3RpZmljYXRpb25SYXdTdGF0ZVtdID0gW107XG4gIGJ1ZmZlckNoZWNraW5nSW50ZXJ2YWxJc1JlYWR5ID0gdHJ1ZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIHByaXZhdGUgYXBwUmVmOiBBcHBsaWNhdGlvblJlZixcbiAgICBwcml2YXRlIHRvYXN0Q29uZmlnOiBUb2FzdE5vdGlmaWNhdGlvbkNvbmZpZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBnQ29uZmlnU2VydmljZTogR2xvYmFsQ29uZmlnU2VydmljZVxuICApIHt9XG5cbiAgb3BlblRvYXN0JChfVG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmc6IFRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nKTogT2JzZXJ2YWJsZTxJUHJpdmF0ZVJlc3BvbnNlTWVyZ2VkPiB7XG4gICAgY29uc3QgZXZlbnRDb250cm9sbGVyID0gX1RvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLmV2ZW50c0NvbnRyb2xsZXI7XG4gICAgLy8gY29uc29sZS5sb2coYCVjICR7X1RvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLmVudGl0eVVuaXF1ZUlEfSBgLCBgYmFja2dyb3VuZDogIzMzOTkzMzsgY29sb3I6ICNmZmZgKTtcblxuICAgIGNvbnN0IHRvYXN0UmF3SW5zdGFuY2UgPSB0aGlzLnByZXBhcmVSYXdUb2FzdChldmVudENvbnRyb2xsZXIsIF9Ub2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZyk7XG4gICAgdGhpcy5saXN0ZW5lcnMoZXZlbnRDb250cm9sbGVyKTtcbiAgICB0aGlzLmludGVybmFsUm91dGluZyh0b2FzdFJhd0luc3RhbmNlKTtcbiAgICByZXR1cm4gZXZlbnRDb250cm9sbGVyLmFmdGVyQ2xvc2VkJDtcbiAgfVxuXG4gIGludGVybmFsUm91dGluZyhfVG9hc3RSYXdJbnN0YW5jZTogSVRvYXN0Tm90aWZpY2F0aW9uUmF3U3RhdGUpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5pc1JlZkxpc3RBdmFpbGFibGUoKSkge1xuICAgICAgdGhpcy5zZW5kVG9Qcm9kdWN0aW9uKF9Ub2FzdFJhd0luc3RhbmNlKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlbmRUb0J1ZmZlcihfVG9hc3RSYXdJbnN0YW5jZSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgc2VuZFRvQnVmZmVyKF9Ub2FzdFJhd0luc3RhbmNlOiBJVG9hc3ROb3RpZmljYXRpb25SYXdTdGF0ZSk6IHZvaWQge1xuICAgIHRoaXMuYnVmZmVyVG9hc3RSYXdMaXN0LnB1c2goX1RvYXN0UmF3SW5zdGFuY2UpO1xuICB9XG5cbiAgc2VuZFRvUHJvZHVjdGlvbihfVG9hc3RSYXdJbnN0YW5jZTogSVRvYXN0Tm90aWZpY2F0aW9uUmF3U3RhdGUpOiB2b2lkIHtcbiAgICBjb25zdCBjb21wb25lbnRSZWYgPSB0aGlzLmdldENvbXBvbmVudFJlZihfVG9hc3RSYXdJbnN0YW5jZSk7XG4gICAgaWYgKGNvbXBvbmVudFJlZikge1xuICAgICAgdGhpcy50b2FzdENvbXBvbmVudFJlZkxpc3QucHVzaChjb21wb25lbnRSZWYpO1xuICAgICAgY29tcG9uZW50UmVmLmluc3RhbmNlLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nID0gX1RvYXN0UmF3SW5zdGFuY2UudG9hc3RCZWxvbmdpbmc7XG4gICAgICB0aGlzLmFwcGVuZFRvQm9keVBhcmVudENvbXBvbmVudChjb21wb25lbnRSZWYpO1xuICAgIH1cbiAgfVxuXG4gIGlzUmVmTGlzdEF2YWlsYWJsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy50b2FzdENvbXBvbmVudFJlZkxpc3QubGVuZ3RoIDwgdGhpcy50b2FzdENvbmZpZy5wcm9kdWN0aW9uQ29uZmlnLmdsb2JhbFNldHRpbmdzLmFsbG93ZWROb3RpZmljYXRpb25zQXRPbmNlXG4gICAgKTtcbiAgfVxuXG4gIHByZXBhcmVSYXdUb2FzdChcbiAgICBfZXZlbnRzQ29udHJvbGxlcjogVG9hc3ROb3RpZmljYXRpb25ldmVudHNDb250cm9sbGVyLFxuICAgIF9Ub2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZzogVG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmdcbiAgKTogSVRvYXN0Tm90aWZpY2F0aW9uUmF3U3RhdGUge1xuICAgIGNvbnN0IHdlYWtNYXAgPSBuZXcgV2Vha01hcCgpO1xuICAgIHdlYWtNYXAuc2V0KFRvYXN0Tm90aWZpY2F0aW9uZXZlbnRzQ29udHJvbGxlciwgX2V2ZW50c0NvbnRyb2xsZXIpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHdlYWtNYXA6IHdlYWtNYXAsXG4gICAgICB0b2FzdEJlbG9uZ2luZzogX1RvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nXG4gICAgfTtcbiAgfVxuXG4gIGdldENvbXBvbmVudFJlZihfVG9hc3ROb3RpZmljYXRpb25SYXdTdGF0ZTogSVRvYXN0Tm90aWZpY2F0aW9uUmF3U3RhdGUpOiBDb21wb25lbnRSZWY8YW55PiB8IG51bGwge1xuICAgIGNvbnN0IGRpYWxvZ0luZGV4ID0gdGhpcy5maW5kRGlhbG9nSW5kZXgoX1RvYXN0Tm90aWZpY2F0aW9uUmF3U3RhdGUudG9hc3RCZWxvbmdpbmcuZW50aXR5VW5pcXVlSUQpO1xuICAgIGlmIChkaWFsb2dJbmRleCA9PT0gLTEpIHtcbiAgICAgIGxldCB0b2FzdFVzZXJWaWV3Q29tcG9uZW50OiBUeXBlPGFueT4gPSBUb2FzdE5vdGlmaWNhdGlvbldyYXBwZXJDb21wb25lbnQ7XG4gICAgICBpZiAoXG4gICAgICAgIF9Ub2FzdE5vdGlmaWNhdGlvblJhd1N0YXRlLnRvYXN0QmVsb25naW5nLnRvYXN0Q29yZUNvbmZpZy50b2FzdFVzZXJWaWV3VHlwZSA9PT0gVG9hc3RVc2VyVmlld1R5cGVFbnVtLlNJTVBMRVxuICAgICAgKSB7XG4gICAgICAgIHRvYXN0VXNlclZpZXdDb21wb25lbnQgPSBUb2FzdE5vdGlmaWNhdGlvblNpbXBsZVdyYXBwZXJDb21wb25lbnQ7XG4gICAgICB9XG4gICAgICBjb25zdCBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkodG9hc3RVc2VyVmlld0NvbXBvbmVudCk7XG4gICAgICByZXR1cm4gY29tcG9uZW50RmFjdG9yeS5jcmVhdGUobmV3IERpYWxvZ0luamVjdG9yKHRoaXMuaW5qZWN0b3IsIF9Ub2FzdE5vdGlmaWNhdGlvblJhd1N0YXRlLndlYWtNYXApKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBsaXN0ZW5lcnMoX2V2ZW50c0NvbnRyb2xsZXI6IFRvYXN0Tm90aWZpY2F0aW9uZXZlbnRzQ29udHJvbGxlcik6IHZvaWQge1xuICAgIC8vIExpc3RlbmVyIGZvciBjbG9zaW5nIGRpYWxvZ1xuICAgIGNvbnN0IGNsb3NlRGlhbG9nU3Vic2NyaXB0aW9uID0gX2V2ZW50c0NvbnRyb2xsZXIuYWZ0ZXJDbG9zZWQkLnN1YnNjcmliZShyZXNwb25zZSA9PiB7XG4gICAgICAvLyB0aGlzLnJlbW92ZUZyb21Cb2R5UGFyZW50Q29tcG9uZW50KG1vZGFsSW5kZXgpO1xuICAgICAgdGhpcy5yZW1vdmVGcm9tQm9keShyZXNwb25zZS50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5lbnRpdHlVbmlxdWVJRCk7XG4gICAgICBjbG9zZURpYWxvZ1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgYXBwZW5kVG9Cb2R5UGFyZW50Q29tcG9uZW50KF9Db21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxhbnk+KTogdm9pZCB7XG4gICAgLy8gYXR0YWNoIHZpZXcgdG8gaWduaXRlIGxpZmVjeWNsZSBob29rc1xuICAgIHRoaXMuYXBwUmVmLmF0dGFjaFZpZXcoX0NvbXBvbmVudFJlZi5ob3N0Vmlldyk7XG5cbiAgICBjb25zdCB0b2FzdFBvc2l0aW9uOiBUb2FzdFBvc2l0aW9uRW51bSA9XG4gICAgICBfQ29tcG9uZW50UmVmLmluc3RhbmNlLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLnRvYXN0Q29yZUNvbmZpZy50b2FzdFBvc2l0aW9uO1xuICAgIGNvbnN0IG9wZW5JbkVsZW1lbnRJRCA9IF9Db21wb25lbnRSZWYuaW5zdGFuY2UudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcudG9hc3RDb3JlQ29uZmlnLm9wZW5JbkVsZW1lbnRJRDtcbiAgICBsZXQgdGFyZ2V0Tm9kZTogSFRNTEVsZW1lbnQ7XG4gICAgaWYgKCFvcGVuSW5FbGVtZW50SUQpIHtcbiAgICAgIHRoaXMuc2V0VG9hc3RXcmFwcGVyTm9kZShcbiAgICAgICAgX0NvbXBvbmVudFJlZi5pbnN0YW5jZS50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy50b2FzdENvcmVDb25maWcudG9hc3RQb3NpdGlvbixcbiAgICAgICAgdGhpcy5zZXRUb2FzdE92ZXJsYXlOb2RlKClcbiAgICAgICk7XG4gICAgICB0YXJnZXROb2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHRvYXN0LXdyYXBwZXItJHt0b2FzdFBvc2l0aW9ufWApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0YXJnZXROb2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQob3BlbkluRWxlbWVudElEKTtcbiAgICB9XG5cbiAgICBjb25zdCBkb21FbGVtID0gKF9Db21wb25lbnRSZWYuaG9zdFZpZXcgYXMgRW1iZWRkZWRWaWV3UmVmPGFueT4pLnJvb3ROb2Rlc1swXSBhcyBIVE1MRWxlbWVudDtcblxuICAgIGNvbnN0IHRvYXN0RW50aXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdG9hc3RFbnRpdHkuc2V0QXR0cmlidXRlKCdpZCcsIF9Db21wb25lbnRSZWYuaW5zdGFuY2UudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuZW50aXR5VW5pcXVlSUQpO1xuICAgIHRvYXN0RW50aXR5LmNsYXNzTmFtZSA9ICd0b2FzdC1lbnRpdHknO1xuICAgIGNvbnN0IHNwbGl0ID0gdG9hc3RQb3NpdGlvbi5zcGxpdCgnLScpO1xuICAgIGlmIChzcGxpdFsxXSA9PT0gJ2Z1bGx3aWR0aCcpIHtcbiAgICAgIHRvYXN0RW50aXR5LnN0eWxlLndpZHRoID0gJzkzdncnO1xuICAgIH0gZWxzZSBpZiAob3BlbkluRWxlbWVudElEKSB7XG4gICAgICB0b2FzdEVudGl0eS5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICB9IGVsc2Uge1xuICAgICAgdG9hc3RFbnRpdHkuc3R5bGUud2lkdGggPSAnMzAwcHgnO1xuICAgIH1cbiAgICB0b2FzdEVudGl0eS5zdHlsZS5tYXJnaW4gPSAnYXV0byc7XG4gICAgdG9hc3RFbnRpdHkucHJlcGVuZChkb21FbGVtKTtcbiAgICB0YXJnZXROb2RlLnByZXBlbmQodG9hc3RFbnRpdHkpO1xuICAgIC8qc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0YXJnZXROb2RlLnByZXBlbmQodG9hc3RFbnRpdHkpO1xuICAgIH0sIDIwMCk7Ki9cbiAgfVxuXG4gIHJlbW92ZUZyb21Cb2R5KF9lbnRpdHlVbmlxdWVJRDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgbW9kYWxJbmRleCA9IHRoaXMuZmluZERpYWxvZ0luZGV4KF9lbnRpdHlVbmlxdWVJRCk7XG4gICAgaWYgKG1vZGFsSW5kZXggPiAtMSkge1xuICAgICAgaWYgKHRoaXMuYnVmZmVyVG9hc3RSYXdMaXN0Lmxlbmd0aCkge1xuICAgICAgICB0aGlzLnNlbmRUb1Byb2R1Y3Rpb24odGhpcy5idWZmZXJUb2FzdFJhd0xpc3RbMF0pO1xuICAgICAgICB0aGlzLmJ1ZmZlclRvYXN0UmF3TGlzdC5zcGxpY2UoMCwgMSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMudG9hc3RDb21wb25lbnRSZWZMaXN0W21vZGFsSW5kZXhdLmluc3RhbmNlXG4gICAgICAgIC5jbG9zZVBhcmVudCQoKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICB0YXAoaXRlbSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtb2RhbEluZGV4ID0gdGhpcy5maW5kRGlhbG9nSW5kZXgoX2VudGl0eVVuaXF1ZUlEKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnRvYXN0Q29tcG9uZW50UmVmTGlzdFttb2RhbEluZGV4XSkge1xuICAgICAgICAgICAgICBjb25zdCB0b2FzdEVudGl0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgICAgICAgICAgICAgIHRoaXMudG9hc3RDb21wb25lbnRSZWZMaXN0W21vZGFsSW5kZXhdLmluc3RhbmNlLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLmVudGl0eVVuaXF1ZUlEXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIHRvYXN0RW50aXR5LnJlbW92ZSgpO1xuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgJWMgJHt0aGlzLnRvYXN0Q29tcG9uZW50UmVmTGlzdFttb2RhbEluZGV4XS5pbnN0YW5jZS50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5lbnRpdHlVbmlxdWVJRH0gYCwgYGJhY2tncm91bmQ6ICNjYzMzMzM7IGNvbG9yOiAjZmZmYCk7XG4gICAgICAgICAgICAgIHRoaXMuYXBwUmVmLmRldGFjaFZpZXcodGhpcy50b2FzdENvbXBvbmVudFJlZkxpc3RbbW9kYWxJbmRleF0uaG9zdFZpZXcpO1xuICAgICAgICAgICAgICB0aGlzLnRvYXN0Q29tcG9uZW50UmVmTGlzdFttb2RhbEluZGV4XS5kZXN0cm95KCk7XG4gICAgICAgICAgICAgIHRoaXMudG9hc3RDb21wb25lbnRSZWZMaXN0LnNwbGljZShtb2RhbEluZGV4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSxcbiAgICAgICAgICB0YWtlKDEpXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIGZpbmREaWFsb2dJbmRleChfRGlhbG9nVW5pcXVlSUQ6IHN0cmluZyk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMudG9hc3RDb21wb25lbnRSZWZMaXN0LmZpbmRJbmRleChpdGVtID0+IHtcbiAgICAgIHJldHVybiBfRGlhbG9nVW5pcXVlSUQgPT09IGl0ZW0uaW5zdGFuY2UudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuZW50aXR5VW5pcXVlSUQ7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHNldFRvYXN0T3ZlcmxheU5vZGUoKTogSFRNTEVsZW1lbnQge1xuICAgIGNvbnN0IGJvZHlOb2RlID0gZG9jdW1lbnQuYm9keSB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdO1xuICAgIGlmICghYm9keU5vZGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gY2hlY2sgdGhlIG92ZXJsYXlcbiAgICBjb25zdCB0b2FzdE92ZXJsYXlOb2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvYXN0LW92ZXJsYXktY29udGFpbmVyJykgYXMgSFRNTFN0eWxlRWxlbWVudDtcblxuICAgIGlmICghdG9hc3RPdmVybGF5Tm9kZSkge1xuICAgICAgY29uc3QgdG9hc3RPdmVybGF5Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgdG9hc3RPdmVybGF5Tm9kZS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3RvYXN0LW92ZXJsYXktY29udGFpbmVyJyk7XG4gICAgICB0b2FzdE92ZXJsYXlOb2RlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKSk7XG4gICAgICB0b2FzdE92ZXJsYXlOb2RlLnN0eWxlLnBvc2l0aW9uID0gJ2ZpeGVkJztcbiAgICAgIHRvYXN0T3ZlcmxheU5vZGUuc3R5bGUudG9wID0gJzAnO1xuICAgICAgdG9hc3RPdmVybGF5Tm9kZS5zdHlsZS5sZWZ0ID0gJzAnO1xuICAgICAgdG9hc3RPdmVybGF5Tm9kZS5zdHlsZS56SW5kZXggPSAnOTk5OTk5OTk5OTk5JztcbiAgICAgIGJvZHlOb2RlLmFwcGVuZENoaWxkKHRvYXN0T3ZlcmxheU5vZGUpO1xuICAgICAgcmV0dXJuIHRvYXN0T3ZlcmxheU5vZGU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRvYXN0T3ZlcmxheU5vZGU7XG4gIH1cblxuICBwcml2YXRlIHNldFRvYXN0V3JhcHBlck5vZGUoX1Bvc2l0aW9uOiBUb2FzdFBvc2l0aW9uRW51bSwgX1RvYXN0T3ZlcmxheU5vZGU6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgY29uc3QgdG9hc3RXcmFwcGVyTm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGB0b2FzdC13cmFwcGVyLSR7X1Bvc2l0aW9ufWApIGFzIEhUTUxTdHlsZUVsZW1lbnQ7XG4gICAgaWYgKCF0b2FzdFdyYXBwZXJOb2RlKSB7XG4gICAgICBjb25zdCB0b2FzdFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHRvYXN0V3JhcHBlci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3RvYXN0LXdyYXBwZXItJyArIF9Qb3NpdGlvbik7XG4gICAgICB0b2FzdFdyYXBwZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpKTtcbiAgICAgIF9Ub2FzdE92ZXJsYXlOb2RlLnByZXBlbmQodG9hc3RXcmFwcGVyKTtcblxuICAgICAgY29uc3Qgc3BsaXQgPSBfUG9zaXRpb24uc3BsaXQoJy0nKTtcblxuICAgICAgaWYgKHNwbGl0WzFdID09PSAncmlnaHQnIHx8IHNwbGl0WzFdID09PSAnbGVmdCcpIHtcbiAgICAgICAgdGhpcy5nQ29uZmlnU2VydmljZVxuICAgICAgICAgIC5nZXRTaGVldCgnbmd4LWF3ZXNvbWUtcG9wdXAtc3R5bGVzJylcbiAgICAgICAgICAuYWRkUnVsZShcbiAgICAgICAgICAgIGAjdG9hc3Qtd3JhcHBlci0ke19Qb3NpdGlvbn1gLFxuICAgICAgICAgICAgYCR7c3BsaXRbMF19OiAyMHB4OyAke3NwbGl0WzFdfTogMjBweDsgcG9zaXRpb246IGZpeGVkOyB6LWluZGV4OiA5OTk5OTk5OTk7YFxuICAgICAgICAgICk7XG4gICAgICB9XG4gICAgICBpZiAoc3BsaXRbMV0gPT09ICdjZW50ZXInKSB7XG4gICAgICAgIHRoaXMuZ0NvbmZpZ1NlcnZpY2VcbiAgICAgICAgICAuZ2V0U2hlZXQoJ25neC1hd2Vzb21lLXBvcHVwLXN0eWxlcycpXG4gICAgICAgICAgLmFkZFJ1bGUoXG4gICAgICAgICAgICBgI3RvYXN0LXdyYXBwZXItJHtfUG9zaXRpb259YCxcbiAgICAgICAgICAgIGAke3NwbGl0WzBdfTogMjBweDsgd2lkdGg6IDEwMCU7IHBvc2l0aW9uOiBmaXhlZDsgei1pbmRleDogOTk5OTk5OTk5OyBwb2ludGVyLWV2ZW50czogbm9uZTtgXG4gICAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGlmIChzcGxpdFsxXSA9PT0gJ2Z1bGx3aWR0aCcpIHtcbiAgICAgICAgdGhpcy5nQ29uZmlnU2VydmljZVxuICAgICAgICAgIC5nZXRTaGVldCgnbmd4LWF3ZXNvbWUtcG9wdXAtc3R5bGVzJylcbiAgICAgICAgICAuYWRkUnVsZShcbiAgICAgICAgICAgIGAjdG9hc3Qtd3JhcHBlci0ke19Qb3NpdGlvbn1gLFxuICAgICAgICAgICAgYCR7c3BsaXRbMF19OiAxMHB4OyB3aWR0aDogMTAwJTsgcG9zaXRpb246IGZpeGVkOyB6LWluZGV4OiA5OTk5OTk5OTk7IHBvaW50ZXItZXZlbnRzOiBub25lO2BcbiAgICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19