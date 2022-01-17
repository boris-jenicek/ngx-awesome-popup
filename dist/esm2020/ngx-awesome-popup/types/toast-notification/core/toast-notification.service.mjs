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
ToastNotificationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ToastNotificationService, deps: [{ token: i0.ComponentFactoryResolver }, { token: i0.Injector }, { token: i0.ApplicationRef }, { token: i1.ToastNotificationConfigService }, { token: i2.GlobalConfigService }], target: i0.ɵɵFactoryTarget.Injectable });
ToastNotificationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ToastNotificationService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ToastNotificationService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i0.Injector }, { type: i0.ApplicationRef }, { type: i1.ToastNotificationConfigService }, { type: i2.GlobalConfigService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3Qtbm90aWZpY2F0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9uZ3gtYXdlc29tZS1wb3B1cC90eXBlcy90b2FzdC1ub3RpZmljYXRpb24vY29yZS90b2FzdC1ub3RpZmljYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBS0wsVUFBVSxFQUdYLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRS9ELE9BQU8sRUFBRSx1Q0FBdUMsRUFBRSxNQUFNLGtGQUFrRixDQUFDO0FBQzNJLE9BQU8sRUFBRSxpQ0FBaUMsRUFBRSxNQUFNLG9FQUFvRSxDQUFDO0FBQ3ZILE9BQU8sRUFBOEIsaUNBQWlDLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDMUYsT0FBTyxFQUFxQixxQkFBcUIsRUFBRSxNQUFNLFNBQVMsQ0FBQzs7OztBQVFuRSxNQUFNLE9BQU8sd0JBQXdCO0lBS25DLFlBQ1Usd0JBQWtELEVBQ2xELFFBQWtCLEVBQ2xCLE1BQXNCLEVBQ3RCLFdBQTJDLEVBQzNDLGNBQW1DO1FBSm5DLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFDbEQsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQUN0QixnQkFBVyxHQUFYLFdBQVcsQ0FBZ0M7UUFDM0MsbUJBQWMsR0FBZCxjQUFjLENBQXFCO1FBVDdDLDBCQUFxQixHQUF3QixFQUFFLENBQUM7UUFDaEQsdUJBQWtCLEdBQWlDLEVBQUUsQ0FBQztRQUN0RCxrQ0FBNkIsR0FBRyxJQUFJLENBQUM7SUFRbEMsQ0FBQztJQUVKLFVBQVUsQ0FBQywyQkFBdUQ7UUFDaEUsTUFBTSxlQUFlLEdBQUcsMkJBQTJCLENBQUMs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QkFBMEIsQ0FBQztxQkFDcEMsT0FBTyxDQUNOLGtCQUFrQixTQUFTLEVBQUUsRUFDN0IsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLFdBQVcsS0FBSyxDQUFDLENBQUMsQ0FBQyw4Q0FBOEMsQ0FDN0UsQ0FBQzthQUNMO1lBQ0QsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxFQUFFO2dCQUN6QixJQUFJLENBQUMsY0FBYztxQkFDaEIsUUFBUSxDQUFDLDBCQUEwQixDQUFDO3FCQUNwQyxPQUFPLENBQ04sa0JBQWtCLFNBQVMsRUFBRSxFQUM3QixHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsaUZBQWlGLENBQzdGLENBQUM7YUFDTDtZQUNELElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLFdBQVcsRUFBRTtnQkFDNUIsSUFBSSxDQUFDLGNBQWM7cUJBQ2hCLFFBQVEsQ0FBQywwQkFBMEIsQ0FBQztxQkFDcEMsT0FBTyxDQUNOLGtCQUFrQixTQUFTLEVBQUUsRUFDN0IsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLGlGQUFpRixDQUM3RixDQUFDO2FBQ0w7U0FDRjtJQUNILENBQUM7O3FIQTlOVSx3QkFBd0I7eUhBQXhCLHdCQUF3QixjQUZ2QixNQUFNOzJGQUVQLHdCQUF3QjtrQkFIcEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBcHBsaWNhdGlvblJlZixcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICBDb21wb25lbnRSZWYsXG4gIEVtYmVkZGVkVmlld1JlZixcbiAgSW5qZWN0YWJsZSxcbiAgSW5qZWN0b3IsXG4gIFR5cGVcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBEaWFsb2dJbmplY3RvciB9IGZyb20gJy4uLy4uLy4uL2NvcmUvZGlhbG9nLWluamVjdG9yJztcbmltcG9ydCB7IEdsb2JhbENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2dsb2JhbC1jb25maWcuc2VydmljZSc7XG5pbXBvcnQgeyBUb2FzdE5vdGlmaWNhdGlvblNpbXBsZVdyYXBwZXJDb21wb25lbnQgfSBmcm9tICcuLi90b2FzdC1ub3RpZmljYXRpb24tc2ltcGxlLXdyYXBwZXIvdG9hc3Qtbm90aWZpY2F0aW9uLXNpbXBsZS13cmFwcGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUb2FzdE5vdGlmaWNhdGlvbldyYXBwZXJDb21wb25lbnQgfSBmcm9tICcuLi90b2FzdC1ub3RpZmljYXRpb24td3JhcHBlci90b2FzdC1ub3RpZmljYXRpb24td3JhcHBlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcsIFRvYXN0Tm90aWZpY2F0aW9uZXZlbnRzQ29udHJvbGxlciB9IGZyb20gJy4vY2xhc3Nlcyc7XG5pbXBvcnQgeyBUb2FzdFBvc2l0aW9uRW51bSwgVG9hc3RVc2VyVmlld1R5cGVFbnVtIH0gZnJvbSAnLi9lbnVtcyc7XG5pbXBvcnQgeyBJUHJpdmF0ZVJlc3BvbnNlTWVyZ2VkLCBJVG9hc3ROb3RpZmljYXRpb25SYXdTdGF0ZSB9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5cbmltcG9ydCB7IFRvYXN0Tm90aWZpY2F0aW9uQ29uZmlnU2VydmljZSB9IGZyb20gJy4vdG9hc3Qtbm90aWZpY2F0aW9uLWNvbmZpZy5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgVG9hc3ROb3RpZmljYXRpb25TZXJ2aWNlIHtcbiAgdG9hc3RDb21wb25lbnRSZWZMaXN0OiBDb21wb25lbnRSZWY8YW55PltdID0gW107XG4gIGJ1ZmZlclRvYXN0UmF3TGlzdDogSVRvYXN0Tm90aWZpY2F0aW9uUmF3U3RhdGVbXSA9IFtdO1xuICBidWZmZXJDaGVja2luZ0ludGVydmFsSXNSZWFkeSA9IHRydWU7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgICBwcml2YXRlIGFwcFJlZjogQXBwbGljYXRpb25SZWYsXG4gICAgcHJpdmF0ZSB0b2FzdENvbmZpZzogVG9hc3ROb3RpZmljYXRpb25Db25maWdTZXJ2aWNlLFxuICAgIHByaXZhdGUgZ0NvbmZpZ1NlcnZpY2U6IEdsb2JhbENvbmZpZ1NlcnZpY2VcbiAgKSB7fVxuXG4gIG9wZW5Ub2FzdCQoX1RvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nOiBUb2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZyk6IE9ic2VydmFibGU8SVByaXZhdGVSZXNwb25zZU1lcmdlZD4ge1xuICAgIGNvbnN0IGV2ZW50Q29udHJvbGxlciA9IF9Ub2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5ldmVudHNDb250cm9sbGVyO1xuICAgIC8vIGNvbnNvbGUubG9nKGAlYyAke19Ub2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5lbnRpdHlVbmlxdWVJRH0gYCwgYGJhY2tncm91bmQ6ICMzMzk5MzM7IGNvbG9yOiAjZmZmYCk7XG5cbiAgICBjb25zdCB0b2FzdFJhd0luc3RhbmNlID0gdGhpcy5wcmVwYXJlUmF3VG9hc3QoZXZlbnRDb250cm9sbGVyLCBfVG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcpO1xuICAgIHRoaXMubGlzdGVuZXJzKGV2ZW50Q29udHJvbGxlcik7XG4gICAgdGhpcy5pbnRlcm5hbFJvdXRpbmcodG9hc3RSYXdJbnN0YW5jZSk7XG4gICAgcmV0dXJuIGV2ZW50Q29udHJvbGxlci5hZnRlckNsb3NlZCQ7XG4gIH1cblxuICBpbnRlcm5hbFJvdXRpbmcoX1RvYXN0UmF3SW5zdGFuY2U6IElUb2FzdE5vdGlmaWNhdGlvblJhd1N0YXRlKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuaXNSZWZMaXN0QXZhaWxhYmxlKCkpIHtcbiAgICAgIHRoaXMuc2VuZFRvUHJvZHVjdGlvbihfVG9hc3RSYXdJbnN0YW5jZSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZW5kVG9CdWZmZXIoX1RvYXN0UmF3SW5zdGFuY2UpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHNlbmRUb0J1ZmZlcihfVG9hc3RSYXdJbnN0YW5jZTogSVRvYXN0Tm90aWZpY2F0aW9uUmF3U3RhdGUpOiB2b2lkIHtcbiAgICB0aGlzLmJ1ZmZlclRvYXN0UmF3TGlzdC5wdXNoKF9Ub2FzdFJhd0luc3RhbmNlKTtcbiAgfVxuXG4gIHNlbmRUb1Byb2R1Y3Rpb24oX1RvYXN0UmF3SW5zdGFuY2U6IElUb2FzdE5vdGlmaWNhdGlvblJhd1N0YXRlKTogdm9pZCB7XG4gICAgY29uc3QgY29tcG9uZW50UmVmID0gdGhpcy5nZXRDb21wb25lbnRSZWYoX1RvYXN0UmF3SW5zdGFuY2UpO1xuICAgIGlmIChjb21wb25lbnRSZWYpIHtcbiAgICAgIHRoaXMudG9hc3RDb21wb25lbnRSZWZMaXN0LnB1c2goY29tcG9uZW50UmVmKTtcbiAgICAgIGNvbXBvbmVudFJlZi5pbnN0YW5jZS50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZyA9IF9Ub2FzdFJhd0luc3RhbmNlLnRvYXN0QmVsb25naW5nO1xuICAgICAgdGhpcy5hcHBlbmRUb0JvZHlQYXJlbnRDb21wb25lbnQoY29tcG9uZW50UmVmKTtcbiAgICB9XG4gIH1cblxuICBpc1JlZkxpc3RBdmFpbGFibGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMudG9hc3RDb21wb25lbnRSZWZMaXN0Lmxlbmd0aCA8IHRoaXMudG9hc3RDb25maWcucHJvZHVjdGlvbkNvbmZpZy5nbG9iYWxTZXR0aW5ncy5hbGxvd2VkTm90aWZpY2F0aW9uc0F0T25jZVxuICAgICk7XG4gIH1cblxuICBwcmVwYXJlUmF3VG9hc3QoXG4gICAgX2V2ZW50c0NvbnRyb2xsZXI6IFRvYXN0Tm90aWZpY2F0aW9uZXZlbnRzQ29udHJvbGxlcixcbiAgICBfVG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmc6IFRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nXG4gICk6IElUb2FzdE5vdGlmaWNhdGlvblJhd1N0YXRlIHtcbiAgICBjb25zdCB3ZWFrTWFwID0gbmV3IFdlYWtNYXAoKTtcbiAgICB3ZWFrTWFwLnNldChUb2FzdE5vdGlmaWNhdGlvbmV2ZW50c0NvbnRyb2xsZXIsIF9ldmVudHNDb250cm9sbGVyKTtcblxuICAgIHJldHVybiB7XG4gICAgICB3ZWFrTWFwOiB3ZWFrTWFwLFxuICAgICAgdG9hc3RCZWxvbmdpbmc6IF9Ub2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZ1xuICAgIH07XG4gIH1cblxuICBnZXRDb21wb25lbnRSZWYoX1RvYXN0Tm90aWZpY2F0aW9uUmF3U3RhdGU6IElUb2FzdE5vdGlmaWNhdGlvblJhd1N0YXRlKTogQ29tcG9uZW50UmVmPGFueT4gfCBudWxsIHtcbiAgICBjb25zdCBkaWFsb2dJbmRleCA9IHRoaXMuZmluZERpYWxvZ0luZGV4KF9Ub2FzdE5vdGlmaWNhdGlvblJhd1N0YXRlLnRvYXN0QmVsb25naW5nLmVudGl0eVVuaXF1ZUlEKTtcbiAgICBpZiAoZGlhbG9nSW5kZXggPT09IC0xKSB7XG4gICAgICBsZXQgdG9hc3RVc2VyVmlld0NvbXBvbmVudDogVHlwZTxhbnk+ID0gVG9hc3ROb3RpZmljYXRpb25XcmFwcGVyQ29tcG9uZW50O1xuICAgICAgaWYgKFxuICAgICAgICBfVG9hc3ROb3RpZmljYXRpb25SYXdTdGF0ZS50b2FzdEJlbG9uZ2luZy50b2FzdENvcmVDb25maWcudG9hc3RVc2VyVmlld1R5cGUgPT09IFRvYXN0VXNlclZpZXdUeXBlRW51bS5TSU1QTEVcbiAgICAgICkge1xuICAgICAgICB0b2FzdFVzZXJWaWV3Q29tcG9uZW50ID0gVG9hc3ROb3RpZmljYXRpb25TaW1wbGVXcmFwcGVyQ29tcG9uZW50O1xuICAgICAgfVxuICAgICAgY29uc3QgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KHRvYXN0VXNlclZpZXdDb21wb25lbnQpO1xuICAgICAgcmV0dXJuIGNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKG5ldyBEaWFsb2dJbmplY3Rvcih0aGlzLmluamVjdG9yLCBfVG9hc3ROb3RpZmljYXRpb25SYXdTdGF0ZS53ZWFrTWFwKSk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgbGlzdGVuZXJzKF9ldmVudHNDb250cm9sbGVyOiBUb2FzdE5vdGlmaWNhdGlvbmV2ZW50c0NvbnRyb2xsZXIpOiB2b2lkIHtcbiAgICAvLyBMaXN0ZW5lciBmb3IgY2xvc2luZyBkaWFsb2dcbiAgICBjb25zdCBjbG9zZURpYWxvZ1N1YnNjcmlwdGlvbiA9IF9ldmVudHNDb250cm9sbGVyLmFmdGVyQ2xvc2VkJC5zdWJzY3JpYmUocmVzcG9uc2UgPT4ge1xuICAgICAgLy8gdGhpcy5yZW1vdmVGcm9tQm9keVBhcmVudENvbXBvbmVudChtb2RhbEluZGV4KTtcbiAgICAgIHRoaXMucmVtb3ZlRnJvbUJvZHkocmVzcG9uc2UudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuZW50aXR5VW5pcXVlSUQpO1xuICAgICAgY2xvc2VEaWFsb2dTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFwcGVuZFRvQm9keVBhcmVudENvbXBvbmVudChfQ29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8YW55Pik6IHZvaWQge1xuICAgIC8vIGF0dGFjaCB2aWV3IHRvIGlnbml0ZSBsaWZlY3ljbGUgaG9va3NcbiAgICB0aGlzLmFwcFJlZi5hdHRhY2hWaWV3KF9Db21wb25lbnRSZWYuaG9zdFZpZXcpO1xuXG4gICAgY29uc3QgdG9hc3RQb3NpdGlvbjogVG9hc3RQb3NpdGlvbkVudW0gPVxuICAgICAgX0NvbXBvbmVudFJlZi5pbnN0YW5jZS50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy50b2FzdENvcmVDb25maWcudG9hc3RQb3NpdGlvbjtcbiAgICBjb25zdCBvcGVuSW5FbGVtZW50SUQgPSBfQ29tcG9uZW50UmVmLmluc3RhbmNlLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLnRvYXN0Q29yZUNvbmZpZy5vcGVuSW5FbGVtZW50SUQ7XG4gICAgbGV0IHRhcmdldE5vZGU6IEhUTUxFbGVtZW50O1xuICAgIGlmICghb3BlbkluRWxlbWVudElEKSB7XG4gICAgICB0aGlzLnNldFRvYXN0V3JhcHBlck5vZGUoXG4gICAgICAgIF9Db21wb25lbnRSZWYuaW5zdGFuY2UudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcudG9hc3RDb3JlQ29uZmlnLnRvYXN0UG9zaXRpb24sXG4gICAgICAgIHRoaXMuc2V0VG9hc3RPdmVybGF5Tm9kZSgpXG4gICAgICApO1xuICAgICAgdGFyZ2V0Tm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGB0b2FzdC13cmFwcGVyLSR7dG9hc3RQb3NpdGlvbn1gKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGFyZ2V0Tm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG9wZW5JbkVsZW1lbnRJRCk7XG4gICAgfVxuXG4gICAgY29uc3QgZG9tRWxlbSA9IChfQ29tcG9uZW50UmVmLmhvc3RWaWV3IGFzIEVtYmVkZGVkVmlld1JlZjxhbnk+KS5yb290Tm9kZXNbMF0gYXMgSFRNTEVsZW1lbnQ7XG5cbiAgICBjb25zdCB0b2FzdEVudGl0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRvYXN0RW50aXR5LnNldEF0dHJpYnV0ZSgnaWQnLCBfQ29tcG9uZW50UmVmLmluc3RhbmNlLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLmVudGl0eVVuaXF1ZUlEKTtcbiAgICB0b2FzdEVudGl0eS5jbGFzc05hbWUgPSAndG9hc3QtZW50aXR5JztcbiAgICBjb25zdCBzcGxpdCA9IHRvYXN0UG9zaXRpb24uc3BsaXQoJy0nKTtcbiAgICBpZiAoc3BsaXRbMV0gPT09ICdmdWxsd2lkdGgnKSB7XG4gICAgICB0b2FzdEVudGl0eS5zdHlsZS53aWR0aCA9ICc5M3Z3JztcbiAgICB9IGVsc2UgaWYgKG9wZW5JbkVsZW1lbnRJRCkge1xuICAgICAgdG9hc3RFbnRpdHkuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRvYXN0RW50aXR5LnN0eWxlLndpZHRoID0gJzMwMHB4JztcbiAgICB9XG4gICAgdG9hc3RFbnRpdHkuc3R5bGUubWFyZ2luID0gJ2F1dG8nO1xuICAgIHRvYXN0RW50aXR5LnByZXBlbmQoZG9tRWxlbSk7XG4gICAgdGFyZ2V0Tm9kZS5wcmVwZW5kKHRvYXN0RW50aXR5KTtcbiAgICAvKnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGFyZ2V0Tm9kZS5wcmVwZW5kKHRvYXN0RW50aXR5KTtcbiAgICB9LCAyMDApOyovXG4gIH1cblxuICByZW1vdmVGcm9tQm9keShfZW50aXR5VW5pcXVlSUQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IG1vZGFsSW5kZXggPSB0aGlzLmZpbmREaWFsb2dJbmRleChfZW50aXR5VW5pcXVlSUQpO1xuICAgIGlmIChtb2RhbEluZGV4ID4gLTEpIHtcbiAgICAgIGlmICh0aGlzLmJ1ZmZlclRvYXN0UmF3TGlzdC5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5zZW5kVG9Qcm9kdWN0aW9uKHRoaXMuYnVmZmVyVG9hc3RSYXdMaXN0WzBdKTtcbiAgICAgICAgdGhpcy5idWZmZXJUb2FzdFJhd0xpc3Quc3BsaWNlKDAsIDEpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnRvYXN0Q29tcG9uZW50UmVmTGlzdFttb2RhbEluZGV4XS5pbnN0YW5jZVxuICAgICAgICAuY2xvc2VQYXJlbnQkKClcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgdGFwKGl0ZW0gPT4ge1xuICAgICAgICAgICAgY29uc3QgbW9kYWxJbmRleCA9IHRoaXMuZmluZERpYWxvZ0luZGV4KF9lbnRpdHlVbmlxdWVJRCk7XG4gICAgICAgICAgICBpZiAodGhpcy50b2FzdENvbXBvbmVudFJlZkxpc3RbbW9kYWxJbmRleF0pIHtcbiAgICAgICAgICAgICAgY29uc3QgdG9hc3RFbnRpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAgICAgICAgICAgICB0aGlzLnRvYXN0Q29tcG9uZW50UmVmTGlzdFttb2RhbEluZGV4XS5pbnN0YW5jZS50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5lbnRpdHlVbmlxdWVJRFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB0b2FzdEVudGl0eS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYCVjICR7dGhpcy50b2FzdENvbXBvbmVudFJlZkxpc3RbbW9kYWxJbmRleF0uaW5zdGFuY2UudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuZW50aXR5VW5pcXVlSUR9IGAsIGBiYWNrZ3JvdW5kOiAjY2MzMzMzOyBjb2xvcjogI2ZmZmApO1xuICAgICAgICAgICAgICB0aGlzLmFwcFJlZi5kZXRhY2hWaWV3KHRoaXMudG9hc3RDb21wb25lbnRSZWZMaXN0W21vZGFsSW5kZXhdLmhvc3RWaWV3KTtcbiAgICAgICAgICAgICAgdGhpcy50b2FzdENvbXBvbmVudFJlZkxpc3RbbW9kYWxJbmRleF0uZGVzdHJveSgpO1xuICAgICAgICAgICAgICB0aGlzLnRvYXN0Q29tcG9uZW50UmVmTGlzdC5zcGxpY2UobW9kYWxJbmRleCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSksXG4gICAgICAgICAgdGFrZSgxKVxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBmaW5kRGlhbG9nSW5kZXgoX0RpYWxvZ1VuaXF1ZUlEOiBzdHJpbmcpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnRvYXN0Q29tcG9uZW50UmVmTGlzdC5maW5kSW5kZXgoaXRlbSA9PiB7XG4gICAgICByZXR1cm4gX0RpYWxvZ1VuaXF1ZUlEID09PSBpdGVtLmluc3RhbmNlLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLmVudGl0eVVuaXF1ZUlEO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRUb2FzdE92ZXJsYXlOb2RlKCk6IEhUTUxFbGVtZW50IHtcbiAgICBjb25zdCBib2R5Tm9kZSA9IGRvY3VtZW50LmJvZHkgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXTtcbiAgICBpZiAoIWJvZHlOb2RlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIGNoZWNrIHRoZSBvdmVybGF5XG4gICAgY29uc3QgdG9hc3RPdmVybGF5Tm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2FzdC1vdmVybGF5LWNvbnRhaW5lcicpIGFzIEhUTUxTdHlsZUVsZW1lbnQ7XG5cbiAgICBpZiAoIXRvYXN0T3ZlcmxheU5vZGUpIHtcbiAgICAgIGNvbnN0IHRvYXN0T3ZlcmxheU5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHRvYXN0T3ZlcmxheU5vZGUuc2V0QXR0cmlidXRlKCdpZCcsICd0b2FzdC1vdmVybGF5LWNvbnRhaW5lcicpO1xuICAgICAgdG9hc3RPdmVybGF5Tm9kZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJykpO1xuICAgICAgdG9hc3RPdmVybGF5Tm9kZS5zdHlsZS5wb3NpdGlvbiA9ICdmaXhlZCc7XG4gICAgICB0b2FzdE92ZXJsYXlOb2RlLnN0eWxlLnRvcCA9ICcwJztcbiAgICAgIHRvYXN0T3ZlcmxheU5vZGUuc3R5bGUubGVmdCA9ICcwJztcbiAgICAgIHRvYXN0T3ZlcmxheU5vZGUuc3R5bGUuekluZGV4ID0gJzk5OTk5OTk5OTk5OSc7XG4gICAgICBib2R5Tm9kZS5hcHBlbmRDaGlsZCh0b2FzdE92ZXJsYXlOb2RlKTtcbiAgICAgIHJldHVybiB0b2FzdE92ZXJsYXlOb2RlO1xuICAgIH1cblxuICAgIHJldHVybiB0b2FzdE92ZXJsYXlOb2RlO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRUb2FzdFdyYXBwZXJOb2RlKF9Qb3NpdGlvbjogVG9hc3RQb3NpdGlvbkVudW0sIF9Ub2FzdE92ZXJsYXlOb2RlOiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgIGNvbnN0IHRvYXN0V3JhcHBlck5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgdG9hc3Qtd3JhcHBlci0ke19Qb3NpdGlvbn1gKSBhcyBIVE1MU3R5bGVFbGVtZW50O1xuICAgIGlmICghdG9hc3RXcmFwcGVyTm9kZSkge1xuICAgICAgY29uc3QgdG9hc3RXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB0b2FzdFdyYXBwZXIuc2V0QXR0cmlidXRlKCdpZCcsICd0b2FzdC13cmFwcGVyLScgKyBfUG9zaXRpb24pO1xuICAgICAgdG9hc3RXcmFwcGVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKSk7XG4gICAgICBfVG9hc3RPdmVybGF5Tm9kZS5wcmVwZW5kKHRvYXN0V3JhcHBlcik7XG5cbiAgICAgIGNvbnN0IHNwbGl0ID0gX1Bvc2l0aW9uLnNwbGl0KCctJyk7XG5cbiAgICAgIGlmIChzcGxpdFsxXSA9PT0gJ3JpZ2h0JyB8fCBzcGxpdFsxXSA9PT0gJ2xlZnQnKSB7XG4gICAgICAgIHRoaXMuZ0NvbmZpZ1NlcnZpY2VcbiAgICAgICAgICAuZ2V0U2hlZXQoJ25neC1hd2Vzb21lLXBvcHVwLXN0eWxlcycpXG4gICAgICAgICAgLmFkZFJ1bGUoXG4gICAgICAgICAgICBgI3RvYXN0LXdyYXBwZXItJHtfUG9zaXRpb259YCxcbiAgICAgICAgICAgIGAke3NwbGl0WzBdfTogMjBweDsgJHtzcGxpdFsxXX06IDIwcHg7IHBvc2l0aW9uOiBmaXhlZDsgei1pbmRleDogOTk5OTk5OTk5O2BcbiAgICAgICAgICApO1xuICAgICAgfVxuICAgICAgaWYgKHNwbGl0WzFdID09PSAnY2VudGVyJykge1xuICAgICAgICB0aGlzLmdDb25maWdTZXJ2aWNlXG4gICAgICAgICAgLmdldFNoZWV0KCduZ3gtYXdlc29tZS1wb3B1cC1zdHlsZXMnKVxuICAgICAgICAgIC5hZGRSdWxlKFxuICAgICAgICAgICAgYCN0b2FzdC13cmFwcGVyLSR7X1Bvc2l0aW9ufWAsXG4gICAgICAgICAgICBgJHtzcGxpdFswXX06IDIwcHg7IHdpZHRoOiAxMDAlOyBwb3NpdGlvbjogZml4ZWQ7IHotaW5kZXg6IDk5OTk5OTk5OTsgcG9pbnRlci1ldmVudHM6IG5vbmU7YFxuICAgICAgICAgICk7XG4gICAgICB9XG4gICAgICBpZiAoc3BsaXRbMV0gPT09ICdmdWxsd2lkdGgnKSB7XG4gICAgICAgIHRoaXMuZ0NvbmZpZ1NlcnZpY2VcbiAgICAgICAgICAuZ2V0U2hlZXQoJ25neC1hd2Vzb21lLXBvcHVwLXN0eWxlcycpXG4gICAgICAgICAgLmFkZFJ1bGUoXG4gICAgICAgICAgICBgI3RvYXN0LXdyYXBwZXItJHtfUG9zaXRpb259YCxcbiAgICAgICAgICAgIGAke3NwbGl0WzBdfTogMTBweDsgd2lkdGg6IDEwMCU7IHBvc2l0aW9uOiBmaXhlZDsgei1pbmRleDogOTk5OTk5OTk5OyBwb2ludGVyLWV2ZW50czogbm9uZTtgXG4gICAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==