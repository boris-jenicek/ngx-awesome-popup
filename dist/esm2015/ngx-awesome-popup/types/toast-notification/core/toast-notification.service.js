import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
import { take, tap } from 'rxjs/operators';
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
        const eventController = _ToastNotificationBelonging.EventsController;
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
                .pipe(tap(item => {
                const modalIndex = this.findDialogIndex(_EntityUniqueID);
                if (this.toastComponentRefList[modalIndex]) {
                    const toastEntity = document.getElementById(this.toastComponentRefList[modalIndex].instance.toastNotificationBelonging.EntityUniqueID);
                    toastEntity.remove();
                    // console.log(`%c ${this.toastComponentRefList[modalIndex].instance.toastNotificationBelonging.EntityUniqueID} `, `background: #cc3333; color: #fff`);
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
            return _DialogUniqueID === item.instance.toastNotificationBelonging.EntityUniqueID;
        });
    }
    setToastOverlayNode() {
        const bodyNode = document.body || document.getElementsByTagName('body')[0];
        if (!bodyNode) {
            return;
        }
        // check the overlay
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3Qtbm90aWZpY2F0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9uZ3gtYXdlc29tZS1wb3B1cC90eXBlcy90b2FzdC1ub3RpZmljYXRpb24vY29yZS90b2FzdC1ub3RpZmljYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsY0FBYyxFQUNkLHdCQUF3QixFQUd4QixVQUFVLEVBQ1YsUUFBUSxFQUVULE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSx1Q0FBdUMsRUFBRSxNQUFNLGtGQUFrRixDQUFDO0FBQzNJLE9BQU8sRUFBRSxpQ0FBaUMsRUFBRSxNQUFNLG9FQUFvRSxDQUFDO0FBQ3ZILE9BQU8sRUFBOEIsaUNBQWlDLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDMUYsT0FBTyxFQUFxQixxQkFBcUIsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUduRSxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQzs7OztBQUtyRixNQUFNLE9BQU8sd0JBQXdCO0lBS25DLFlBQ1Usd0JBQWtELEVBQ2xELFFBQWtCLEVBQ2xCLE1BQXNCLEVBQ3RCLFdBQTJDLEVBQzNDLGNBQW1DO1FBSm5DLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFDbEQsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQUN0QixnQkFBVyxHQUFYLFdBQVcsQ0FBZ0M7UUFDM0MsbUJBQWMsR0FBZCxjQUFjLENBQXFCO1FBVDdDLDBCQUFxQixHQUF3QixFQUFFLENBQUM7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aUJBQWlCLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBRXhDLE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFbkMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssT0FBTyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxNQUFNLEVBQUU7Z0JBQy9DLElBQUksQ0FBQyxjQUFjO3FCQUNoQixRQUFRLENBQUMsMEJBQTBCLENBQUM7cUJBQ3BDLE9BQU8sQ0FDTixrQkFBa0IsU0FBUyxFQUFFLEVBQzdCLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxXQUFXLEtBQUssQ0FBQyxDQUFDLENBQUMsOENBQThDLENBQzdFLENBQUM7YUFDTDtZQUNELElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsRUFBRTtnQkFDekIsSUFBSSxDQUFDLGNBQWM7cUJBQ2hCLFFBQVEsQ0FBQywwQkFBMEIsQ0FBQztxQkFDcEMsT0FBTyxDQUNOLGtCQUFrQixTQUFTLEVBQUUsRUFDN0IsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLGlGQUFpRixDQUM3RixDQUFDO2FBQ0w7WUFDRCxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxXQUFXLEVBQUU7Z0JBQzVCLElBQUksQ0FBQyxjQUFjO3FCQUNoQixRQUFRLENBQUMsMEJBQTBCLENBQUM7cUJBQ3BDLE9BQU8sQ0FDTixrQkFBa0IsU0FBUyxFQUFFLEVBQzdCLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxpRkFBaUYsQ0FDN0YsQ0FBQzthQUNMO1NBQ0Y7SUFDSCxDQUFDOzs7O1lBak9GLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7O1lBckJDLHdCQUF3QjtZQUl4QixRQUFRO1lBTFIsY0FBYztZQWtCUCw4QkFBOEI7WUFQOUIsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQXBwbGljYXRpb25SZWYsXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgQ29tcG9uZW50UmVmLFxuICBFbWJlZGRlZFZpZXdSZWYsXG4gIEluamVjdGFibGUsXG4gIEluamVjdG9yLFxuICBUeXBlXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZSwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRGlhbG9nSW5qZWN0b3IgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2RpYWxvZy1pbmplY3Rvcic7XG5pbXBvcnQgeyBHbG9iYWxDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9nbG9iYWwtY29uZmlnLnNlcnZpY2UnO1xuaW1wb3J0IHsgVG9hc3ROb3RpZmljYXRpb25TaW1wbGVXcmFwcGVyQ29tcG9uZW50IH0gZnJvbSAnLi4vdG9hc3Qtbm90aWZpY2F0aW9uLXNpbXBsZS13cmFwcGVyL3RvYXN0LW5vdGlmaWNhdGlvbi1zaW1wbGUtd3JhcHBlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVG9hc3ROb3RpZmljYXRpb25XcmFwcGVyQ29tcG9uZW50IH0gZnJvbSAnLi4vdG9hc3Qtbm90aWZpY2F0aW9uLXdyYXBwZXIvdG9hc3Qtbm90aWZpY2F0aW9uLXdyYXBwZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLCBUb2FzdE5vdGlmaWNhdGlvbkV2ZW50c0NvbnRyb2xsZXIgfSBmcm9tICcuL2NsYXNzZXMnO1xuaW1wb3J0IHsgVG9hc3RQb3NpdGlvbkVudW0sIFRvYXN0VXNlclZpZXdUeXBlRW51bSB9IGZyb20gJy4vZW51bXMnO1xuaW1wb3J0IHsgSVByaXZhdGVSZXNwb25zZU1lcmdlZCwgSVRvYXN0Tm90aWZpY2F0aW9uUmF3U3RhdGUgfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuXG5pbXBvcnQgeyBUb2FzdE5vdGlmaWNhdGlvbkNvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL3RvYXN0LW5vdGlmaWNhdGlvbi1jb25maWcuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFRvYXN0Tm90aWZpY2F0aW9uU2VydmljZSB7XG4gIHRvYXN0Q29tcG9uZW50UmVmTGlzdDogQ29tcG9uZW50UmVmPGFueT5bXSA9IFtdO1xuICBidWZmZXJUb2FzdFJhd0xpc3Q6IElUb2FzdE5vdGlmaWNhdGlvblJhd1N0YXRlW10gPSBbXTtcbiAgYnVmZmVyQ2hlY2tpbmdJbnRlcnZhbElzUmVhZHkgPSB0cnVlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgcHJpdmF0ZSBhcHBSZWY6IEFwcGxpY2F0aW9uUmVmLFxuICAgIHByaXZhdGUgdG9hc3RDb25maWc6IFRvYXN0Tm90aWZpY2F0aW9uQ29uZmlnU2VydmljZSxcbiAgICBwcml2YXRlIGdDb25maWdTZXJ2aWNlOiBHbG9iYWxDb25maWdTZXJ2aWNlXG4gICkge31cblxuICBvcGVuVG9hc3QkKF9Ub2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZzogVG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcpOiBPYnNlcnZhYmxlPElQcml2YXRlUmVzcG9uc2VNZXJnZWQ+IHtcbiAgICBjb25zdCBldmVudENvbnRyb2xsZXIgPSBfVG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuRXZlbnRzQ29udHJvbGxlcjtcbiAgICAvLyBjb25zb2xlLmxvZyhgJWMgJHtfVG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuRW50aXR5VW5pcXVlSUR9IGAsIGBiYWNrZ3JvdW5kOiAjMzM5OTMzOyBjb2xvcjogI2ZmZmApO1xuXG4gICAgY29uc3QgdG9hc3RSYXdJbnN0YW5jZSA9IHRoaXMucHJlcGFyZVJhd1RvYXN0KGV2ZW50Q29udHJvbGxlciwgX1RvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nKTtcbiAgICB0aGlzLmxpc3RlbmVycyhldmVudENvbnRyb2xsZXIpO1xuICAgIHRoaXMuaW50ZXJuYWxSb3V0aW5nKHRvYXN0UmF3SW5zdGFuY2UpO1xuICAgIHJldHVybiBldmVudENvbnRyb2xsZXIuYWZ0ZXJDbG9zZWQkO1xuICB9XG5cbiAgaW50ZXJuYWxSb3V0aW5nKF9Ub2FzdFJhd0luc3RhbmNlOiBJVG9hc3ROb3RpZmljYXRpb25SYXdTdGF0ZSk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmlzUmVmTGlzdEF2YWlsYWJsZSgpKSB7XG4gICAgICB0aGlzLnNlbmRUb1Byb2R1Y3Rpb24oX1RvYXN0UmF3SW5zdGFuY2UpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VuZFRvQnVmZmVyKF9Ub2FzdFJhd0luc3RhbmNlKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBzZW5kVG9CdWZmZXIoX1RvYXN0UmF3SW5zdGFuY2U6IElUb2FzdE5vdGlmaWNhdGlvblJhd1N0YXRlKTogdm9pZCB7XG4gICAgdGhpcy5idWZmZXJUb2FzdFJhd0xpc3QucHVzaChfVG9hc3RSYXdJbnN0YW5jZSk7XG4gIH1cblxuICBzZW5kVG9Qcm9kdWN0aW9uKF9Ub2FzdFJhd0luc3RhbmNlOiBJVG9hc3ROb3RpZmljYXRpb25SYXdTdGF0ZSk6IHZvaWQge1xuICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IHRoaXMuZ2V0Q29tcG9uZW50UmVmKF9Ub2FzdFJhd0luc3RhbmNlKTtcbiAgICBpZiAoY29tcG9uZW50UmVmKSB7XG4gICAgICB0aGlzLnRvYXN0Q29tcG9uZW50UmVmTGlzdC5wdXNoKGNvbXBvbmVudFJlZik7XG4gICAgICBjb21wb25lbnRSZWYuaW5zdGFuY2UudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcgPSBfVG9hc3RSYXdJbnN0YW5jZS5Ub2FzdEJlbG9uZ2luZztcbiAgICAgIHRoaXMuYXBwZW5kVG9Cb2R5UGFyZW50Q29tcG9uZW50KGNvbXBvbmVudFJlZik7XG4gICAgfVxuICB9XG5cbiAgaXNSZWZMaXN0QXZhaWxhYmxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLnRvYXN0Q29tcG9uZW50UmVmTGlzdC5sZW5ndGggPCB0aGlzLnRvYXN0Q29uZmlnLnByb2R1Y3Rpb25Db25maWcuR2xvYmFsU2V0dGluZ3MuQWxsb3dlZE5vdGlmaWNhdGlvbnNBdE9uY2VcbiAgICApO1xuICB9XG5cbiAgcHJlcGFyZVJhd1RvYXN0KFxuICAgIF9FdmVudHNDb250cm9sbGVyOiBUb2FzdE5vdGlmaWNhdGlvbkV2ZW50c0NvbnRyb2xsZXIsXG4gICAgX1RvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nOiBUb2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZ1xuICApOiBJVG9hc3ROb3RpZmljYXRpb25SYXdTdGF0ZSB7XG4gICAgY29uc3Qgd2Vha01hcCA9IG5ldyBXZWFrTWFwKCk7XG4gICAgd2Vha01hcC5zZXQoVG9hc3ROb3RpZmljYXRpb25FdmVudHNDb250cm9sbGVyLCBfRXZlbnRzQ29udHJvbGxlcik7XG5cbiAgICByZXR1cm4ge1xuICAgICAgV2Vha01hcDogd2Vha01hcCxcbiAgICAgIFRvYXN0QmVsb25naW5nOiBfVG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmdcbiAgICB9O1xuICB9XG5cbiAgZ2V0Q29tcG9uZW50UmVmKF9Ub2FzdE5vdGlmaWNhdGlvblJhd1N0YXRlOiBJVG9hc3ROb3RpZmljYXRpb25SYXdTdGF0ZSk6IENvbXBvbmVudFJlZjxhbnk+IHwgbnVsbCB7XG4gICAgY29uc3QgZGlhbG9nSW5kZXggPSB0aGlzLmZpbmREaWFsb2dJbmRleChfVG9hc3ROb3RpZmljYXRpb25SYXdTdGF0ZS5Ub2FzdEJlbG9uZ2luZy5FbnRpdHlVbmlxdWVJRCk7XG4gICAgaWYgKGRpYWxvZ0luZGV4ID09PSAtMSkge1xuICAgICAgbGV0IHRvYXN0VXNlclZpZXdDb21wb25lbnQ6IFR5cGU8YW55PiA9IFRvYXN0Tm90aWZpY2F0aW9uV3JhcHBlckNvbXBvbmVudDtcbiAgICAgIGlmIChcbiAgICAgICAgX1RvYXN0Tm90aWZpY2F0aW9uUmF3U3RhdGUuVG9hc3RCZWxvbmdpbmcuVG9hc3RDb3JlQ29uZmlnLlRvYXN0VXNlclZpZXdUeXBlID09PSBUb2FzdFVzZXJWaWV3VHlwZUVudW0uU0lNUExFXG4gICAgICApIHtcbiAgICAgICAgdG9hc3RVc2VyVmlld0NvbXBvbmVudCA9IFRvYXN0Tm90aWZpY2F0aW9uU2ltcGxlV3JhcHBlckNvbXBvbmVudDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeSh0b2FzdFVzZXJWaWV3Q29tcG9uZW50KTtcbiAgICAgIHJldHVybiBjb21wb25lbnRGYWN0b3J5LmNyZWF0ZShuZXcgRGlhbG9nSW5qZWN0b3IodGhpcy5pbmplY3RvciwgX1RvYXN0Tm90aWZpY2F0aW9uUmF3U3RhdGUuV2Vha01hcCkpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGxpc3RlbmVycyhfRXZlbnRzQ29udHJvbGxlcjogVG9hc3ROb3RpZmljYXRpb25FdmVudHNDb250cm9sbGVyKTogdm9pZCB7XG4gICAgLy8gTGlzdGVuZXIgZm9yIGNsb3NpbmcgZGlhbG9nXG4gICAgY29uc3QgY2xvc2VEaWFsb2dTdWJzY3JpcHRpb24gPSBfRXZlbnRzQ29udHJvbGxlci5hZnRlckNsb3NlZCQuc3Vic2NyaWJlKHJlc3BvbnNlID0+IHtcbiAgICAgIC8vIHRoaXMucmVtb3ZlRnJvbUJvZHlQYXJlbnRDb21wb25lbnQobW9kYWxJbmRleCk7XG4gICAgICB0aGlzLnJlbW92ZUZyb21Cb2R5KHJlc3BvbnNlLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLkVudGl0eVVuaXF1ZUlEKTtcbiAgICAgIGNsb3NlRGlhbG9nU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfSk7XG4gIH1cblxuICBhcHBlbmRUb0JvZHlQYXJlbnRDb21wb25lbnQoX0NvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPGFueT4pOiB2b2lkIHtcbiAgICAvLyBhdHRhY2ggdmlldyB0byBpZ25pdGUgbGlmZWN5Y2xlIGhvb2tzXG4gICAgdGhpcy5hcHBSZWYuYXR0YWNoVmlldyhfQ29tcG9uZW50UmVmLmhvc3RWaWV3KTtcblxuICAgIGNvbnN0IHRvYXN0UG9zaXRpb246IFRvYXN0UG9zaXRpb25FbnVtID1cbiAgICAgIF9Db21wb25lbnRSZWYuaW5zdGFuY2UudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuVG9hc3RDb3JlQ29uZmlnLlRvYXN0UG9zaXRpb247XG4gICAgY29uc3Qgb3BlbkluRWxlbWVudElEID0gX0NvbXBvbmVudFJlZi5pbnN0YW5jZS50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5Ub2FzdENvcmVDb25maWcuT3BlbkluRWxlbWVudElEO1xuICAgIGxldCB0YXJnZXROb2RlOiBIVE1MRWxlbWVudDtcbiAgICBpZiAoIW9wZW5JbkVsZW1lbnRJRCkge1xuICAgICAgdGhpcy5zZXRUb2FzdFdyYXBwZXJOb2RlKFxuICAgICAgICBfQ29tcG9uZW50UmVmLmluc3RhbmNlLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLlRvYXN0Q29yZUNvbmZpZy5Ub2FzdFBvc2l0aW9uLFxuICAgICAgICB0aGlzLnNldFRvYXN0T3ZlcmxheU5vZGUoKVxuICAgICAgKTtcbiAgICAgIHRhcmdldE5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgdG9hc3Qtd3JhcHBlci0ke3RvYXN0UG9zaXRpb259YCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRhcmdldE5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChvcGVuSW5FbGVtZW50SUQpO1xuICAgIH1cblxuICAgIGNvbnN0IGRvbUVsZW0gPSAoX0NvbXBvbmVudFJlZi5ob3N0VmlldyBhcyBFbWJlZGRlZFZpZXdSZWY8YW55Pikucm9vdE5vZGVzWzBdIGFzIEhUTUxFbGVtZW50O1xuXG4gICAgY29uc3QgdG9hc3RFbnRpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0b2FzdEVudGl0eS5zZXRBdHRyaWJ1dGUoJ2lkJywgX0NvbXBvbmVudFJlZi5pbnN0YW5jZS50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5FbnRpdHlVbmlxdWVJRCk7XG4gICAgdG9hc3RFbnRpdHkuY2xhc3NOYW1lID0gJ3RvYXN0LWVudGl0eSc7XG4gICAgY29uc3Qgc3BsaXQgPSB0b2FzdFBvc2l0aW9uLnNwbGl0KCctJyk7XG4gICAgaWYgKHNwbGl0WzFdID09PSAnZnVsbHdpZHRoJykge1xuICAgICAgdG9hc3RFbnRpdHkuc3R5bGUud2lkdGggPSAnOTN2dyc7XG4gICAgfSBlbHNlIGlmIChvcGVuSW5FbGVtZW50SUQpIHtcbiAgICAgIHRvYXN0RW50aXR5LnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgIH0gZWxzZSB7XG4gICAgICB0b2FzdEVudGl0eS5zdHlsZS53aWR0aCA9ICczMDBweCc7XG4gICAgfVxuICAgIHRvYXN0RW50aXR5LnN0eWxlLm1hcmdpbiA9ICdhdXRvJztcbiAgICB0b2FzdEVudGl0eS5wcmVwZW5kKGRvbUVsZW0pO1xuICAgIHRhcmdldE5vZGUucHJlcGVuZCh0b2FzdEVudGl0eSk7XG4gICAgLypzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRhcmdldE5vZGUucHJlcGVuZCh0b2FzdEVudGl0eSk7XG4gICAgfSwgMjAwKTsqL1xuICB9XG5cbiAgcmVtb3ZlRnJvbUJvZHkoX0VudGl0eVVuaXF1ZUlEOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBtb2RhbEluZGV4ID0gdGhpcy5maW5kRGlhbG9nSW5kZXgoX0VudGl0eVVuaXF1ZUlEKTtcbiAgICBpZiAobW9kYWxJbmRleCA+IC0xKSB7XG4gICAgICBpZiAodGhpcy5idWZmZXJUb2FzdFJhd0xpc3QubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuc2VuZFRvUHJvZHVjdGlvbih0aGlzLmJ1ZmZlclRvYXN0UmF3TGlzdFswXSk7XG4gICAgICAgIHRoaXMuYnVmZmVyVG9hc3RSYXdMaXN0LnNwbGljZSgwLCAxKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy50b2FzdENvbXBvbmVudFJlZkxpc3RbbW9kYWxJbmRleF0uaW5zdGFuY2VcbiAgICAgICAgLmNsb3NlUGFyZW50JCgpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIHRhcChpdGVtID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1vZGFsSW5kZXggPSB0aGlzLmZpbmREaWFsb2dJbmRleChfRW50aXR5VW5pcXVlSUQpO1xuICAgICAgICAgICAgaWYgKHRoaXMudG9hc3RDb21wb25lbnRSZWZMaXN0W21vZGFsSW5kZXhdKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHRvYXN0RW50aXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgICAgICAgICAgICAgdGhpcy50b2FzdENvbXBvbmVudFJlZkxpc3RbbW9kYWxJbmRleF0uaW5zdGFuY2UudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuRW50aXR5VW5pcXVlSURcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgdG9hc3RFbnRpdHkucmVtb3ZlKCk7XG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGAlYyAke3RoaXMudG9hc3RDb21wb25lbnRSZWZMaXN0W21vZGFsSW5kZXhdLmluc3RhbmNlLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLkVudGl0eVVuaXF1ZUlEfSBgLCBgYmFja2dyb3VuZDogI2NjMzMzMzsgY29sb3I6ICNmZmZgKTtcbiAgICAgICAgICAgICAgdGhpcy5hcHBSZWYuZGV0YWNoVmlldyh0aGlzLnRvYXN0Q29tcG9uZW50UmVmTGlzdFttb2RhbEluZGV4XS5ob3N0Vmlldyk7XG4gICAgICAgICAgICAgIHRoaXMudG9hc3RDb21wb25lbnRSZWZMaXN0W21vZGFsSW5kZXhdLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgdGhpcy50b2FzdENvbXBvbmVudFJlZkxpc3Quc3BsaWNlKG1vZGFsSW5kZXgsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIHRha2UoMSlcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgZmluZERpYWxvZ0luZGV4KF9EaWFsb2dVbmlxdWVJRDogc3RyaW5nKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy50b2FzdENvbXBvbmVudFJlZkxpc3QuZmluZEluZGV4KGl0ZW0gPT4ge1xuICAgICAgcmV0dXJuIF9EaWFsb2dVbmlxdWVJRCA9PT0gaXRlbS5pbnN0YW5jZS50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5FbnRpdHlVbmlxdWVJRDtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0VG9hc3RPdmVybGF5Tm9kZSgpOiBIVE1MRWxlbWVudCB7XG4gICAgY29uc3QgYm9keU5vZGUgPSBkb2N1bWVudC5ib2R5IHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF07XG4gICAgaWYgKCFib2R5Tm9kZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBjaGVjayB0aGUgb3ZlcmxheVxuICAgIGNvbnN0IHRvYXN0T3ZlcmxheU5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9hc3Qtb3ZlcmxheS1jb250YWluZXInKSBhcyBIVE1MU3R5bGVFbGVtZW50O1xuXG4gICAgaWYgKCF0b2FzdE92ZXJsYXlOb2RlKSB7XG4gICAgICBjb25zdCB0b2FzdE92ZXJsYXlOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB0b2FzdE92ZXJsYXlOb2RlLnNldEF0dHJpYnV0ZSgnaWQnLCAndG9hc3Qtb3ZlcmxheS1jb250YWluZXInKTtcbiAgICAgIHRvYXN0T3ZlcmxheU5vZGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpKTtcbiAgICAgIHRvYXN0T3ZlcmxheU5vZGUuc3R5bGUucG9zaXRpb24gPSAnZml4ZWQnO1xuICAgICAgdG9hc3RPdmVybGF5Tm9kZS5zdHlsZS50b3AgPSAnMCc7XG4gICAgICB0b2FzdE92ZXJsYXlOb2RlLnN0eWxlLmxlZnQgPSAnMCc7XG4gICAgICB0b2FzdE92ZXJsYXlOb2RlLnN0eWxlLnpJbmRleCA9ICc5OTk5OTk5OTk5OTknO1xuICAgICAgYm9keU5vZGUuYXBwZW5kQ2hpbGQodG9hc3RPdmVybGF5Tm9kZSk7XG4gICAgICByZXR1cm4gdG9hc3RPdmVybGF5Tm9kZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdG9hc3RPdmVybGF5Tm9kZTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0VG9hc3RXcmFwcGVyTm9kZShfUG9zaXRpb246IFRvYXN0UG9zaXRpb25FbnVtLCBfVG9hc3RPdmVybGF5Tm9kZTogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICBjb25zdCB0b2FzdFdyYXBwZXJOb2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHRvYXN0LXdyYXBwZXItJHtfUG9zaXRpb259YCkgYXMgSFRNTFN0eWxlRWxlbWVudDtcbiAgICBpZiAoIXRvYXN0V3JhcHBlck5vZGUpIHtcbiAgICAgIGNvbnN0IHRvYXN0V3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgdG9hc3RXcmFwcGVyLnNldEF0dHJpYnV0ZSgnaWQnLCAndG9hc3Qtd3JhcHBlci0nICsgX1Bvc2l0aW9uKTtcbiAgICAgIHRvYXN0V3JhcHBlci5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJykpO1xuICAgICAgX1RvYXN0T3ZlcmxheU5vZGUucHJlcGVuZCh0b2FzdFdyYXBwZXIpO1xuXG4gICAgICBjb25zdCBzcGxpdCA9IF9Qb3NpdGlvbi5zcGxpdCgnLScpO1xuXG4gICAgICBpZiAoc3BsaXRbMV0gPT09ICdyaWdodCcgfHwgc3BsaXRbMV0gPT09ICdsZWZ0Jykge1xuICAgICAgICB0aGlzLmdDb25maWdTZXJ2aWNlXG4gICAgICAgICAgLmdldFNoZWV0KCduZ3gtYXdlc29tZS1wb3B1cC1zdHlsZXMnKVxuICAgICAgICAgIC5hZGRSdWxlKFxuICAgICAgICAgICAgYCN0b2FzdC13cmFwcGVyLSR7X1Bvc2l0aW9ufWAsXG4gICAgICAgICAgICBgJHtzcGxpdFswXX06IDIwcHg7ICR7c3BsaXRbMV19OiAyMHB4OyBwb3NpdGlvbjogZml4ZWQ7IHotaW5kZXg6IDk5OTk5OTk5OTtgXG4gICAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGlmIChzcGxpdFsxXSA9PT0gJ2NlbnRlcicpIHtcbiAgICAgICAgdGhpcy5nQ29uZmlnU2VydmljZVxuICAgICAgICAgIC5nZXRTaGVldCgnbmd4LWF3ZXNvbWUtcG9wdXAtc3R5bGVzJylcbiAgICAgICAgICAuYWRkUnVsZShcbiAgICAgICAgICAgIGAjdG9hc3Qtd3JhcHBlci0ke19Qb3NpdGlvbn1gLFxuICAgICAgICAgICAgYCR7c3BsaXRbMF19OiAyMHB4OyB3aWR0aDogMTAwJTsgcG9zaXRpb246IGZpeGVkOyB6LWluZGV4OiA5OTk5OTk5OTk7IHBvaW50ZXItZXZlbnRzOiBub25lO2BcbiAgICAgICAgICApO1xuICAgICAgfVxuICAgICAgaWYgKHNwbGl0WzFdID09PSAnZnVsbHdpZHRoJykge1xuICAgICAgICB0aGlzLmdDb25maWdTZXJ2aWNlXG4gICAgICAgICAgLmdldFNoZWV0KCduZ3gtYXdlc29tZS1wb3B1cC1zdHlsZXMnKVxuICAgICAgICAgIC5hZGRSdWxlKFxuICAgICAgICAgICAgYCN0b2FzdC13cmFwcGVyLSR7X1Bvc2l0aW9ufWAsXG4gICAgICAgICAgICBgJHtzcGxpdFswXX06IDEwcHg7IHdpZHRoOiAxMDAlOyBwb3NpdGlvbjogZml4ZWQ7IHotaW5kZXg6IDk5OTk5OTk5OTsgcG9pbnRlci1ldmVudHM6IG5vbmU7YFxuICAgICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=