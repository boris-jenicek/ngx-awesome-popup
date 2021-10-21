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
        // toastComponentRefList: ComponentRef<ToastNotificationWrapperComponent>[]    = [];
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
            componentRef.instance.toastNotificationBelonging =
                _ToastRawInstance.ToastBelonging;
            this.appendToBodyParentComponent(componentRef);
        }
    }
    isRefListAvailable() {
        return (this.toastComponentRefList.length <
            this.toastConfig.productionConfig.GlobalSettings
                .AllowedNotificationsAtOnce);
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
            if (_ToastNotificationRawState.ToastBelonging.ToastCoreConfig
                .ToastUserViewType === ToastUserViewTypeEnum.SIMPLE) {
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
        const toastPosition = _ComponentRef.instance.toastNotificationBelonging.ToastCoreConfig
            .ToastPosition;
        const openInElementID = _ComponentRef.instance.toastNotificationBelonging.ToastCoreConfig
            .OpenInElementID;
        let targetNode;
        if (!openInElementID) {
            this.setToastWrapperNode(_ComponentRef.instance.toastNotificationBelonging.ToastCoreConfig
                .ToastPosition, this.setToastOverlayNode());
            targetNode = document.getElementById(`toast-wrapper-${toastPosition}`);
        }
        else {
            targetNode = document.getElementById(openInElementID);
        }
        const domElem = _ComponentRef.hostView
            .rootNodes[0];
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
        // targetNode.prepend(toastEntity);
        setTimeout(() => {
            targetNode.prepend(toastEntity);
        }, 200);
    }
    removeFromBody(_EntityUniqueID) {
        const modalIndex = this.findDialogIndex(_EntityUniqueID);
        if (modalIndex > -1) {
            if (this.bufferToastRawList.length) {
                this.sendToProduction(this.bufferToastRawList[0]);
                this.bufferToastRawList.splice(0, 1);
            }
            this.toastComponentRefList[modalIndex].instance
                .closeParent$('close-fast')
                .pipe(map(item => {
                const modalIndex = this.findDialogIndex(_EntityUniqueID);
                if (this.toastComponentRefList[modalIndex]) {
                    const toastEntity = document.getElementById(this.toastComponentRefList[modalIndex].instance
                        .toastNotificationBelonging.EntityUniqueID);
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
            return (_DialogUniqueID ===
                item.instance.toastNotificationBelonging.EntityUniqueID);
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
            toastOverlayNode.style.zIndex = '999999999';
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
                    .addRule(`#toast-wrapper-${_Position}`, `${split[0]}: 20px; ${split[1]}: 20px; position: fixed; z-index: 999999;`);
            }
            if (split[1] === 'center') {
                this.gConfigService
                    .getSheet('ngx-awesome-popup-styles')
                    .addRule(`#toast-wrapper-${_Position}`, `${split[0]}: 20px; width: 100%; position: fixed; z-index: 999999; pointer-events: none;`);
            }
            if (split[1] === 'fullwidth') {
                this.gConfigService
                    .getSheet('ngx-awesome-popup-styles')
                    .addRule(`#toast-wrapper-${_Position}`, `${split[0]}: 10px; width: 100%; position: fixed; z-index: 999999; pointer-events: none;`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3Qtbm90aWZpY2F0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9uZ3gtYXdlc29tZS1wb3B1cC90eXBlcy90b2FzdC1ub3RpZmljYXRpb24vY29yZS90b2FzdC1ub3RpZmljYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsY0FBYyxFQUNkLHdCQUF3QixFQUd4QixVQUFVLEVBQ1YsUUFBUSxFQUVULE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDL0QsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDMUUsT0FBTyxFQUFFLHVDQUF1QyxFQUFFLE1BQU0sa0ZBQWtGLENBQUM7QUFDM0ksT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0sb0VBQW9FLENBQUM7QUFDdkgsT0FBTyxFQUVMLGlDQUFpQyxFQUNsQyxNQUFNLFdBQVcsQ0FBQztBQUNuQixPQUFPLEVBQXFCLHFCQUFxQixFQUFFLE1BQU0sU0FBUyxDQUFDO0FBTW5FLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDOzs7O0FBS3JGLE1BQU0sT0FBTyx3QkFBd0I7SUFNbkMsWUFDVSx3QkFBa0QsRUFDbEQsUUFBa0IsRUFDbEIsTUFBc0IsRUFDdEIsV0FBMkMsRUFDM0MsY0FBbUM7UUFKbkMsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUNsRCxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBQ3RCLGdCQUFXLEdBQVgsV0FBVyxDQUFnQztRQUMzQyxtQkFBYyxHQUFkLGNBQWMsQ0FBcUI7UUFWN0Msb0ZBQW9GO1FBQ3BGLDBCQUFxQixHQUF3QixFQUFFLENB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LG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFwcGxpY2F0aW9uUmVmLFxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIENvbXBvbmVudFJlZixcbiAgRW1iZWRkZWRWaWV3UmVmLFxuICBJbmplY3RhYmxlLFxuICBJbmplY3RvcixcbiAgVHlwZVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IERpYWxvZ0luamVjdG9yIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9kaWFsb2ctaW5qZWN0b3InO1xuaW1wb3J0IHsgR2xvYmFsQ29uZmlnU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvZ2xvYmFsLWNvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7IFRvYXN0Tm90aWZpY2F0aW9uU2ltcGxlV3JhcHBlckNvbXBvbmVudCB9IGZyb20gJy4uL3RvYXN0LW5vdGlmaWNhdGlvbi1zaW1wbGUtd3JhcHBlci90b2FzdC1ub3RpZmljYXRpb24tc2ltcGxlLXdyYXBwZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFRvYXN0Tm90aWZpY2F0aW9uV3JhcHBlckNvbXBvbmVudCB9IGZyb20gJy4uL3RvYXN0LW5vdGlmaWNhdGlvbi13cmFwcGVyL3RvYXN0LW5vdGlmaWNhdGlvbi13cmFwcGVyLmNvbXBvbmVudCc7XG5pbXBvcnQge1xuICBUb2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZyxcbiAgVG9hc3ROb3RpZmljYXRpb25FdmVudHNDb250cm9sbGVyXG59IGZyb20gJy4vY2xhc3Nlcyc7XG5pbXBvcnQgeyBUb2FzdFBvc2l0aW9uRW51bSwgVG9hc3RVc2VyVmlld1R5cGVFbnVtIH0gZnJvbSAnLi9lbnVtcyc7XG5pbXBvcnQge1xuICBJUHJpdmF0ZVJlc3BvbnNlTWVyZ2VkLFxuICBJVG9hc3ROb3RpZmljYXRpb25SYXdTdGF0ZVxufSBmcm9tICcuL2ludGVyZmFjZXMnO1xuXG5pbXBvcnQgeyBUb2FzdE5vdGlmaWNhdGlvbkNvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL3RvYXN0LW5vdGlmaWNhdGlvbi1jb25maWcuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFRvYXN0Tm90aWZpY2F0aW9uU2VydmljZSB7XG4gIC8vIHRvYXN0Q29tcG9uZW50UmVmTGlzdDogQ29tcG9uZW50UmVmPFRvYXN0Tm90aWZpY2F0aW9uV3JhcHBlckNvbXBvbmVudD5bXSAgICA9IFtdO1xuICB0b2FzdENvbXBvbmVudFJlZkxpc3Q6IENvbXBvbmVudFJlZjxhbnk+W10gPSBbXTtcbiAgYnVmZmVyVG9hc3RSYXdMaXN0OiBJVG9hc3ROb3RpZmljYXRpb25SYXdTdGF0ZVtdID0gW107XG4gIGJ1ZmZlckNoZWNraW5nSW50ZXJ2YWxJc1JlYWR5OiBib29sZWFuID0gdHJ1ZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIHByaXZhdGUgYXBwUmVmOiBBcHBsaWNhdGlvblJlZixcbiAgICBwcml2YXRlIHRvYXN0Q29uZmlnOiBUb2FzdE5vdGlmaWNhdGlvbkNvbmZpZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBnQ29uZmlnU2VydmljZTogR2xvYmFsQ29uZmlnU2VydmljZVxuICApIHt9XG5cbiAgb3BlblRvYXN0JChcbiAgICBfVG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmc6IFRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nXG4gICk6IE9ic2VydmFibGU8SVByaXZhdGVSZXNwb25zZU1lcmdlZD4ge1xuICAgIGxldCBldmVudENvbnRyb2xsZXIgPSBfVG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuRXZlbnRzQ29udHJvbGxlcjtcbiAgICAvLyBjb25zb2xlLmxvZyhgJWMgJHtfVG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuRW50aXR5VW5pcXVlSUR9IGAsIGBiYWNrZ3JvdW5kOiAjMzM5OTMzOyBjb2xvcjogI2ZmZmApO1xuXG4gICAgY29uc3QgdG9hc3RSYXdJbnN0YW5jZSA9IHRoaXMucHJlcGFyZVJhd1RvYXN0KFxuICAgICAgZXZlbnRDb250cm9sbGVyLFxuICAgICAgX1RvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nXG4gICAgKTtcbiAgICB0aGlzLmxpc3RlbmVycyhldmVudENvbnRyb2xsZXIpO1xuICAgIHRoaXMuaW50ZXJuYWxSb3V0aW5nKHRvYXN0UmF3SW5zdGFuY2UpO1xuICAgIHJldHVybiBldmVudENvbnRyb2xsZXIuYWZ0ZXJDbG9zZWQkO1xuICB9XG5cbiAgaW50ZXJuYWxSb3V0aW5nKF9Ub2FzdFJhd0luc3RhbmNlOiBJVG9hc3ROb3RpZmljYXRpb25SYXdTdGF0ZSk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmlzUmVmTGlzdEF2YWlsYWJsZSgpKSB7XG4gICAgICB0aGlzLnNlbmRUb1Byb2R1Y3Rpb24oX1RvYXN0UmF3SW5zdGFuY2UpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VuZFRvQnVmZmVyKF9Ub2FzdFJhd0luc3RhbmNlKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBzZW5kVG9CdWZmZXIoX1RvYXN0UmF3SW5zdGFuY2U6IElUb2FzdE5vdGlmaWNhdGlvblJhd1N0YXRlKSB7XG4gICAgdGhpcy5idWZmZXJUb2FzdFJhd0xpc3QucHVzaChfVG9hc3RSYXdJbnN0YW5jZSk7XG4gIH1cblxuICBzZW5kVG9Qcm9kdWN0aW9uKF9Ub2FzdFJhd0luc3RhbmNlOiBJVG9hc3ROb3RpZmljYXRpb25SYXdTdGF0ZSk6IHZvaWQge1xuICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IHRoaXMuZ2V0Q29tcG9uZW50UmVmKF9Ub2FzdFJhd0luc3RhbmNlKTtcbiAgICBpZiAoY29tcG9uZW50UmVmKSB7XG4gICAgICB0aGlzLnRvYXN0Q29tcG9uZW50UmVmTGlzdC5wdXNoKGNvbXBvbmVudFJlZik7XG4gICAgICBjb21wb25lbnRSZWYuaW5zdGFuY2UudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcgPVxuICAgICAgICBfVG9hc3RSYXdJbnN0YW5jZS5Ub2FzdEJlbG9uZ2luZztcbiAgICAgIHRoaXMuYXBwZW5kVG9Cb2R5UGFyZW50Q29tcG9uZW50KGNvbXBvbmVudFJlZik7XG4gICAgfVxuICB9XG5cbiAgaXNSZWZMaXN0QXZhaWxhYmxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLnRvYXN0Q29tcG9uZW50UmVmTGlzdC5sZW5ndGggPFxuICAgICAgdGhpcy50b2FzdENvbmZpZy5wcm9kdWN0aW9uQ29uZmlnLkdsb2JhbFNldHRpbmdzXG4gICAgICAgIC5BbGxvd2VkTm90aWZpY2F0aW9uc0F0T25jZVxuICAgICk7XG4gIH1cblxuICBwcmVwYXJlUmF3VG9hc3QoXG4gICAgX0V2ZW50c0NvbnRyb2xsZXI6IFRvYXN0Tm90aWZpY2F0aW9uRXZlbnRzQ29udHJvbGxlcixcbiAgICBfVG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmc6IFRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nXG4gICk6IElUb2FzdE5vdGlmaWNhdGlvblJhd1N0YXRlIHtcbiAgICBjb25zdCB3ZWFrTWFwID0gbmV3IFdlYWtNYXAoKTtcbiAgICB3ZWFrTWFwLnNldChUb2FzdE5vdGlmaWNhdGlvbkV2ZW50c0NvbnRyb2xsZXIsIF9FdmVudHNDb250cm9sbGVyKTtcblxuICAgIHJldHVybiB7XG4gICAgICBXZWFrTWFwOiB3ZWFrTWFwLFxuICAgICAgVG9hc3RCZWxvbmdpbmc6IF9Ub2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZ1xuICAgIH07XG4gIH1cblxuICBnZXRDb21wb25lbnRSZWYoXG4gICAgX1RvYXN0Tm90aWZpY2F0aW9uUmF3U3RhdGU6IElUb2FzdE5vdGlmaWNhdGlvblJhd1N0YXRlXG4gICk6IENvbXBvbmVudFJlZjxhbnk+IHwgbnVsbCB7XG4gICAgY29uc3QgZGlhbG9nSW5kZXggPSB0aGlzLmZpbmREaWFsb2dJbmRleChcbiAgICAgIF9Ub2FzdE5vdGlmaWNhdGlvblJhd1N0YXRlLlRvYXN0QmVsb25naW5nLkVudGl0eVVuaXF1ZUlEXG4gICAgKTtcbiAgICBpZiAoZGlhbG9nSW5kZXggPT09IC0xKSB7XG4gICAgICBsZXQgdG9hc3RVc2VyVmlld0NvbXBvbmVudDogVHlwZTxhbnk+ID0gVG9hc3ROb3RpZmljYXRpb25XcmFwcGVyQ29tcG9uZW50O1xuICAgICAgaWYgKFxuICAgICAgICBfVG9hc3ROb3RpZmljYXRpb25SYXdTdGF0ZS5Ub2FzdEJlbG9uZ2luZy5Ub2FzdENvcmVDb25maWdcbiAgICAgICAgICAuVG9hc3RVc2VyVmlld1R5cGUgPT09IFRvYXN0VXNlclZpZXdUeXBlRW51bS5TSU1QTEVcbiAgICAgICkge1xuICAgICAgICB0b2FzdFVzZXJWaWV3Q29tcG9uZW50ID0gVG9hc3ROb3RpZmljYXRpb25TaW1wbGVXcmFwcGVyQ29tcG9uZW50O1xuICAgICAgfVxuICAgICAgY29uc3QgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KFxuICAgICAgICB0b2FzdFVzZXJWaWV3Q29tcG9uZW50XG4gICAgICApO1xuICAgICAgcmV0dXJuIGNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKFxuICAgICAgICBuZXcgRGlhbG9nSW5qZWN0b3IodGhpcy5pbmplY3RvciwgX1RvYXN0Tm90aWZpY2F0aW9uUmF3U3RhdGUuV2Vha01hcClcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgbGlzdGVuZXJzKF9FdmVudHNDb250cm9sbGVyOiBUb2FzdE5vdGlmaWNhdGlvbkV2ZW50c0NvbnRyb2xsZXIpIHtcbiAgICAvLyBMaXN0ZW5lciBmb3IgY2xvc2luZyBkaWFsb2dcbiAgICBjb25zdCBjbG9zZURpYWxvZ1N1YnNjcmlwdGlvbiA9IF9FdmVudHNDb250cm9sbGVyLmFmdGVyQ2xvc2VkJC5zdWJzY3JpYmUoXG4gICAgICByZXNwb25zZSA9PiB7XG4gICAgICAgIC8vIHRoaXMucmVtb3ZlRnJvbUJvZHlQYXJlbnRDb21wb25lbnQobW9kYWxJbmRleCk7XG4gICAgICAgIHRoaXMucmVtb3ZlRnJvbUJvZHkocmVzcG9uc2UudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuRW50aXR5VW5pcXVlSUQpO1xuICAgICAgICBjbG9zZURpYWxvZ1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBhcHBlbmRUb0JvZHlQYXJlbnRDb21wb25lbnQoX0NvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPGFueT4pOiB2b2lkIHtcbiAgICAvLyBhdHRhY2ggdmlldyB0byBpZ25pdGUgbGlmZWN5Y2xlIGhvb2tzXG4gICAgdGhpcy5hcHBSZWYuYXR0YWNoVmlldyhfQ29tcG9uZW50UmVmLmhvc3RWaWV3KTtcblxuICAgIGNvbnN0IHRvYXN0UG9zaXRpb246IFRvYXN0UG9zaXRpb25FbnVtID1cbiAgICAgIF9Db21wb25lbnRSZWYuaW5zdGFuY2UudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuVG9hc3RDb3JlQ29uZmlnXG4gICAgICAgIC5Ub2FzdFBvc2l0aW9uO1xuICAgIGNvbnN0IG9wZW5JbkVsZW1lbnRJRCA9XG4gICAgICBfQ29tcG9uZW50UmVmLmluc3RhbmNlLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLlRvYXN0Q29yZUNvbmZpZ1xuICAgICAgICAuT3BlbkluRWxlbWVudElEO1xuICAgIGxldCB0YXJnZXROb2RlOiBIVE1MRWxlbWVudDtcbiAgICBpZiAoIW9wZW5JbkVsZW1lbnRJRCkge1xuICAgICAgdGhpcy5zZXRUb2FzdFdyYXBwZXJOb2RlKFxuICAgICAgICBfQ29tcG9uZW50UmVmLmluc3RhbmNlLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLlRvYXN0Q29yZUNvbmZpZ1xuICAgICAgICAgIC5Ub2FzdFBvc2l0aW9uLFxuICAgICAgICB0aGlzLnNldFRvYXN0T3ZlcmxheU5vZGUoKVxuICAgICAgKTtcbiAgICAgIHRhcmdldE5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgdG9hc3Qtd3JhcHBlci0ke3RvYXN0UG9zaXRpb259YCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRhcmdldE5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChvcGVuSW5FbGVtZW50SUQpO1xuICAgIH1cblxuICAgIGNvbnN0IGRvbUVsZW0gPSAoX0NvbXBvbmVudFJlZi5ob3N0VmlldyBhcyBFbWJlZGRlZFZpZXdSZWY8YW55PilcbiAgICAgIC5yb290Tm9kZXNbMF0gYXMgSFRNTEVsZW1lbnQ7XG5cbiAgICBjb25zdCB0b2FzdEVudGl0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRvYXN0RW50aXR5LnNldEF0dHJpYnV0ZShcbiAgICAgICdpZCcsXG4gICAgICBfQ29tcG9uZW50UmVmLmluc3RhbmNlLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLkVudGl0eVVuaXF1ZUlEXG4gICAgKTtcbiAgICB0b2FzdEVudGl0eS5jbGFzc05hbWUgPSAndG9hc3QtZW50aXR5JztcbiAgICBjb25zdCBzcGxpdCA9IHRvYXN0UG9zaXRpb24uc3BsaXQoJy0nKTtcbiAgICBpZiAoc3BsaXRbMV0gPT09ICdmdWxsd2lkdGgnKSB7XG4gICAgICB0b2FzdEVudGl0eS5zdHlsZS53aWR0aCA9ICc5M3Z3JztcbiAgICB9IGVsc2UgaWYgKG9wZW5JbkVsZW1lbnRJRCkge1xuICAgICAgdG9hc3RFbnRpdHkuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRvYXN0RW50aXR5LnN0eWxlLndpZHRoID0gJzMwMHB4JztcbiAgICB9XG4gICAgdG9hc3RFbnRpdHkuc3R5bGUubWFyZ2luID0gJ2F1dG8nO1xuICAgIHRvYXN0RW50aXR5LnByZXBlbmQoZG9tRWxlbSk7XG4gICAgLy8gdGFyZ2V0Tm9kZS5wcmVwZW5kKHRvYXN0RW50aXR5KTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRhcmdldE5vZGUucHJlcGVuZCh0b2FzdEVudGl0eSk7XG4gICAgfSwgMjAwKTtcbiAgfVxuXG4gIHJlbW92ZUZyb21Cb2R5KF9FbnRpdHlVbmlxdWVJRDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgbW9kYWxJbmRleCA9IHRoaXMuZmluZERpYWxvZ0luZGV4KF9FbnRpdHlVbmlxdWVJRCk7XG4gICAgaWYgKG1vZGFsSW5kZXggPiAtMSkge1xuICAgICAgaWYgKHRoaXMuYnVmZmVyVG9hc3RSYXdMaXN0Lmxlbmd0aCkge1xuICAgICAgICB0aGlzLnNlbmRUb1Byb2R1Y3Rpb24odGhpcy5idWZmZXJUb2FzdFJhd0xpc3RbMF0pO1xuICAgICAgICB0aGlzLmJ1ZmZlclRvYXN0UmF3TGlzdC5zcGxpY2UoMCwgMSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMudG9hc3RDb21wb25lbnRSZWZMaXN0W21vZGFsSW5kZXhdLmluc3RhbmNlXG4gICAgICAgIC5jbG9zZVBhcmVudCQoJ2Nsb3NlLWZhc3QnKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBtYXAoaXRlbSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtb2RhbEluZGV4ID0gdGhpcy5maW5kRGlhbG9nSW5kZXgoX0VudGl0eVVuaXF1ZUlEKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnRvYXN0Q29tcG9uZW50UmVmTGlzdFttb2RhbEluZGV4XSkge1xuICAgICAgICAgICAgICBjb25zdCB0b2FzdEVudGl0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgICAgICAgICAgICAgIHRoaXMudG9hc3RDb21wb25lbnRSZWZMaXN0W21vZGFsSW5kZXhdLmluc3RhbmNlXG4gICAgICAgICAgICAgICAgICAudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuRW50aXR5VW5pcXVlSURcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgdG9hc3RFbnRpdHkucmVtb3ZlKCk7XG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGAlYyAke3RoaXMudG9hc3RDb21wb25lbnRSZWZMaXN0W21vZGFsSW5kZXhdLmluc3RhbmNlLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLkVudGl0eVVuaXF1ZUlEfSBgLCBgYmFja2dyb3VuZDogI2NjMzMzMzsgY29sb3I6ICNmZmZgKTtcbiAgICAgICAgICAgICAgdGhpcy5hcHBSZWYuZGV0YWNoVmlldyhcbiAgICAgICAgICAgICAgICB0aGlzLnRvYXN0Q29tcG9uZW50UmVmTGlzdFttb2RhbEluZGV4XS5ob3N0Vmlld1xuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB0aGlzLnRvYXN0Q29tcG9uZW50UmVmTGlzdFttb2RhbEluZGV4XS5kZXN0cm95KCk7XG4gICAgICAgICAgICAgIHRoaXMudG9hc3RDb21wb25lbnRSZWZMaXN0LnNwbGljZShtb2RhbEluZGV4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBmaW5kRGlhbG9nSW5kZXgoX0RpYWxvZ1VuaXF1ZUlEOiBzdHJpbmcpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnRvYXN0Q29tcG9uZW50UmVmTGlzdC5maW5kSW5kZXgoaXRlbSA9PiB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBfRGlhbG9nVW5pcXVlSUQgPT09XG4gICAgICAgIGl0ZW0uaW5zdGFuY2UudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuRW50aXR5VW5pcXVlSURcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHNldFRvYXN0T3ZlcmxheU5vZGUoKTogSFRNTEVsZW1lbnQge1xuICAgIGNvbnN0IGJvZHlOb2RlID0gZG9jdW1lbnQuYm9keSB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdO1xuICAgIGlmICghYm9keU5vZGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gY2hlY2sgdGhlIG92ZXJsYXlcbiAgICBsZXQgdG9hc3RPdmVybGF5Tm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgICAgJ3RvYXN0LW92ZXJsYXktY29udGFpbmVyJ1xuICAgICkgYXMgSFRNTFN0eWxlRWxlbWVudDtcblxuICAgIGlmICghdG9hc3RPdmVybGF5Tm9kZSkge1xuICAgICAgbGV0IHRvYXN0T3ZlcmxheU5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHRvYXN0T3ZlcmxheU5vZGUuc2V0QXR0cmlidXRlKCdpZCcsICd0b2FzdC1vdmVybGF5LWNvbnRhaW5lcicpO1xuICAgICAgdG9hc3RPdmVybGF5Tm9kZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJykpO1xuICAgICAgdG9hc3RPdmVybGF5Tm9kZS5zdHlsZS5wb3NpdGlvbiA9ICdmaXhlZCc7XG4gICAgICB0b2FzdE92ZXJsYXlOb2RlLnN0eWxlLnRvcCA9ICcwJztcbiAgICAgIHRvYXN0T3ZlcmxheU5vZGUuc3R5bGUubGVmdCA9ICcwJztcbiAgICAgIHRvYXN0T3ZlcmxheU5vZGUuc3R5bGUuekluZGV4ID0gJzk5OTk5OTk5OSc7XG4gICAgICBib2R5Tm9kZS5hcHBlbmRDaGlsZCh0b2FzdE92ZXJsYXlOb2RlKTtcbiAgICAgIHJldHVybiB0b2FzdE92ZXJsYXlOb2RlO1xuICAgIH1cblxuICAgIHJldHVybiB0b2FzdE92ZXJsYXlOb2RlO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRUb2FzdFdyYXBwZXJOb2RlKFxuICAgIF9Qb3NpdGlvbjogVG9hc3RQb3NpdGlvbkVudW0sXG4gICAgX1RvYXN0T3ZlcmxheU5vZGU6IEhUTUxFbGVtZW50XG4gICkge1xuICAgIGxldCB0b2FzdFdyYXBwZXJOb2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgICBgdG9hc3Qtd3JhcHBlci0ke19Qb3NpdGlvbn1gXG4gICAgKSBhcyBIVE1MU3R5bGVFbGVtZW50O1xuICAgIGlmICghdG9hc3RXcmFwcGVyTm9kZSkge1xuICAgICAgY29uc3QgdG9hc3RXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB0b2FzdFdyYXBwZXIuc2V0QXR0cmlidXRlKCdpZCcsICd0b2FzdC13cmFwcGVyLScgKyBfUG9zaXRpb24pO1xuICAgICAgdG9hc3RXcmFwcGVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKSk7XG4gICAgICBfVG9hc3RPdmVybGF5Tm9kZS5wcmVwZW5kKHRvYXN0V3JhcHBlcik7XG5cbiAgICAgIGNvbnN0IHNwbGl0ID0gX1Bvc2l0aW9uLnNwbGl0KCctJyk7XG5cbiAgICAgIGlmIChzcGxpdFsxXSA9PT0gJ3JpZ2h0JyB8fCBzcGxpdFsxXSA9PT0gJ2xlZnQnKSB7XG4gICAgICAgIHRoaXMuZ0NvbmZpZ1NlcnZpY2VcbiAgICAgICAgICAuZ2V0U2hlZXQoJ25neC1hd2Vzb21lLXBvcHVwLXN0eWxlcycpXG4gICAgICAgICAgLmFkZFJ1bGUoXG4gICAgICAgICAgICBgI3RvYXN0LXdyYXBwZXItJHtfUG9zaXRpb259YCxcbiAgICAgICAgICAgIGAke3NwbGl0WzBdfTogMjBweDsgJHtzcGxpdFsxXX06IDIwcHg7IHBvc2l0aW9uOiBmaXhlZDsgei1pbmRleDogOTk5OTk5O2BcbiAgICAgICAgICApO1xuICAgICAgfVxuICAgICAgaWYgKHNwbGl0WzFdID09PSAnY2VudGVyJykge1xuICAgICAgICB0aGlzLmdDb25maWdTZXJ2aWNlXG4gICAgICAgICAgLmdldFNoZWV0KCduZ3gtYXdlc29tZS1wb3B1cC1zdHlsZXMnKVxuICAgICAgICAgIC5hZGRSdWxlKFxuICAgICAgICAgICAgYCN0b2FzdC13cmFwcGVyLSR7X1Bvc2l0aW9ufWAsXG4gICAgICAgICAgICBgJHtzcGxpdFswXX06IDIwcHg7IHdpZHRoOiAxMDAlOyBwb3NpdGlvbjogZml4ZWQ7IHotaW5kZXg6IDk5OTk5OTsgcG9pbnRlci1ldmVudHM6IG5vbmU7YFxuICAgICAgICAgICk7XG4gICAgICB9XG4gICAgICBpZiAoc3BsaXRbMV0gPT09ICdmdWxsd2lkdGgnKSB7XG4gICAgICAgIHRoaXMuZ0NvbmZpZ1NlcnZpY2VcbiAgICAgICAgICAuZ2V0U2hlZXQoJ25neC1hd2Vzb21lLXBvcHVwLXN0eWxlcycpXG4gICAgICAgICAgLmFkZFJ1bGUoXG4gICAgICAgICAgICBgI3RvYXN0LXdyYXBwZXItJHtfUG9zaXRpb259YCxcbiAgICAgICAgICAgIGAke3NwbGl0WzBdfTogMTBweDsgd2lkdGg6IDEwMCU7IHBvc2l0aW9uOiBmaXhlZDsgei1pbmRleDogOTk5OTk5OyBwb2ludGVyLWV2ZW50czogbm9uZTtgXG4gICAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==