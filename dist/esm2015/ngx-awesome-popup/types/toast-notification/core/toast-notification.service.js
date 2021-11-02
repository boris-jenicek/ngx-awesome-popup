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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3Qtbm90aWZpY2F0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9uZ3gtYXdlc29tZS1wb3B1cC90eXBlcy90b2FzdC1ub3RpZmljYXRpb24vY29yZS90b2FzdC1ub3RpZmljYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsY0FBYyxFQUNkLHdCQUF3QixFQUd4QixVQUFVLEVBQ1YsUUFBUSxFQUVULE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDL0QsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDMUUsT0FBTyxFQUFFLHVDQUF1QyxFQUFFLE1BQU0sa0ZBQWtGLENBQUM7QUFDM0ksT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0sb0VBQW9FLENBQUM7QUFDdkgsT0FBTyxFQUVMLGlDQUFpQyxFQUNsQyxNQUFNLFdBQVcsQ0FBQztBQUNuQixPQUFPLEVBQXFCLHFCQUFxQixFQUFFLE1BQU0sU0FBUyxDQUFDO0FBTW5FLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDOzs7O0FBS3JGLE1BQU0sT0FBTyx3QkFBd0I7SUFLbkMsWUFDVSx3QkFBa0QsRUFDbEQsUUFBa0IsRUFDbEIsTUFBc0IsRUFDdEIsV0FBMkMsRUFDM0MsY0FBbUM7UUFKbkMsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUNsRCxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBQ3RCLGdCQUFXLEdBQVgsV0FBVyxDQUFnQztRQUMzQyxtQkFBYyxHQUFkLGNBQWMsQ0FBcUI7UUFUN0MsMEJBQXFCLEdBQXdCLEVBQUUsQ0FBQztRQUNoRCx1QkFB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cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQXBwbGljYXRpb25SZWYsXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgQ29tcG9uZW50UmVmLFxuICBFbWJlZGRlZFZpZXdSZWYsXG4gIEluamVjdGFibGUsXG4gIEluamVjdG9yLFxuICBUeXBlXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRGlhbG9nSW5qZWN0b3IgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2RpYWxvZy1pbmplY3Rvcic7XG5pbXBvcnQgeyBHbG9iYWxDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9nbG9iYWwtY29uZmlnLnNlcnZpY2UnO1xuaW1wb3J0IHsgVG9hc3ROb3RpZmljYXRpb25TaW1wbGVXcmFwcGVyQ29tcG9uZW50IH0gZnJvbSAnLi4vdG9hc3Qtbm90aWZpY2F0aW9uLXNpbXBsZS13cmFwcGVyL3RvYXN0LW5vdGlmaWNhdGlvbi1zaW1wbGUtd3JhcHBlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVG9hc3ROb3RpZmljYXRpb25XcmFwcGVyQ29tcG9uZW50IH0gZnJvbSAnLi4vdG9hc3Qtbm90aWZpY2F0aW9uLXdyYXBwZXIvdG9hc3Qtbm90aWZpY2F0aW9uLXdyYXBwZXIuY29tcG9uZW50JztcbmltcG9ydCB7XG4gIFRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLFxuICBUb2FzdE5vdGlmaWNhdGlvbkV2ZW50c0NvbnRyb2xsZXJcbn0gZnJvbSAnLi9jbGFzc2VzJztcbmltcG9ydCB7IFRvYXN0UG9zaXRpb25FbnVtLCBUb2FzdFVzZXJWaWV3VHlwZUVudW0gfSBmcm9tICcuL2VudW1zJztcbmltcG9ydCB7XG4gIElQcml2YXRlUmVzcG9uc2VNZXJnZWQsXG4gIElUb2FzdE5vdGlmaWNhdGlvblJhd1N0YXRlXG59IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5cbmltcG9ydCB7IFRvYXN0Tm90aWZpY2F0aW9uQ29uZmlnU2VydmljZSB9IGZyb20gJy4vdG9hc3Qtbm90aWZpY2F0aW9uLWNvbmZpZy5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgVG9hc3ROb3RpZmljYXRpb25TZXJ2aWNlIHtcbiAgdG9hc3RDb21wb25lbnRSZWZMaXN0OiBDb21wb25lbnRSZWY8YW55PltdID0gW107XG4gIGJ1ZmZlclRvYXN0UmF3TGlzdDogSVRvYXN0Tm90aWZpY2F0aW9uUmF3U3RhdGVbXSA9IFtdO1xuICBidWZmZXJDaGVja2luZ0ludGVydmFsSXNSZWFkeTogYm9vbGVhbiA9IHRydWU7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgICBwcml2YXRlIGFwcFJlZjogQXBwbGljYXRpb25SZWYsXG4gICAgcHJpdmF0ZSB0b2FzdENvbmZpZzogVG9hc3ROb3RpZmljYXRpb25Db25maWdTZXJ2aWNlLFxuICAgIHByaXZhdGUgZ0NvbmZpZ1NlcnZpY2U6IEdsb2JhbENvbmZpZ1NlcnZpY2VcbiAgKSB7fVxuXG4gIG9wZW5Ub2FzdCQoXG4gICAgX1RvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nOiBUb2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZ1xuICApOiBPYnNlcnZhYmxlPElQcml2YXRlUmVzcG9uc2VNZXJnZWQ+IHtcbiAgICBsZXQgZXZlbnRDb250cm9sbGVyID0gX1RvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLkV2ZW50c0NvbnRyb2xsZXI7XG4gICAgLy8gY29uc29sZS5sb2coYCVjICR7X1RvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLkVudGl0eVVuaXF1ZUlEfSBgLCBgYmFja2dyb3VuZDogIzMzOTkzMzsgY29sb3I6ICNmZmZgKTtcblxuICAgIGNvbnN0IHRvYXN0UmF3SW5zdGFuY2UgPSB0aGlzLnByZXBhcmVSYXdUb2FzdChcbiAgICAgIGV2ZW50Q29udHJvbGxlcixcbiAgICAgIF9Ub2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZ1xuICAgICk7XG4gICAgdGhpcy5saXN0ZW5lcnMoZXZlbnRDb250cm9sbGVyKTtcbiAgICB0aGlzLmludGVybmFsUm91dGluZyh0b2FzdFJhd0luc3RhbmNlKTtcbiAgICByZXR1cm4gZXZlbnRDb250cm9sbGVyLmFmdGVyQ2xvc2VkJDtcbiAgfVxuXG4gIGludGVybmFsUm91dGluZyhfVG9hc3RSYXdJbnN0YW5jZTogSVRvYXN0Tm90aWZpY2F0aW9uUmF3U3RhdGUpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5pc1JlZkxpc3RBdmFpbGFibGUoKSkge1xuICAgICAgdGhpcy5zZW5kVG9Qcm9kdWN0aW9uKF9Ub2FzdFJhd0luc3RhbmNlKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlbmRUb0J1ZmZlcihfVG9hc3RSYXdJbnN0YW5jZSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgc2VuZFRvQnVmZmVyKF9Ub2FzdFJhd0luc3RhbmNlOiBJVG9hc3ROb3RpZmljYXRpb25SYXdTdGF0ZSkge1xuICAgIHRoaXMuYnVmZmVyVG9hc3RSYXdMaXN0LnB1c2goX1RvYXN0UmF3SW5zdGFuY2UpO1xuICB9XG5cbiAgc2VuZFRvUHJvZHVjdGlvbihfVG9hc3RSYXdJbnN0YW5jZTogSVRvYXN0Tm90aWZpY2F0aW9uUmF3U3RhdGUpOiB2b2lkIHtcbiAgICBjb25zdCBjb21wb25lbnRSZWYgPSB0aGlzLmdldENvbXBvbmVudFJlZihfVG9hc3RSYXdJbnN0YW5jZSk7XG4gICAgaWYgKGNvbXBvbmVudFJlZikge1xuICAgICAgdGhpcy50b2FzdENvbXBvbmVudFJlZkxpc3QucHVzaChjb21wb25lbnRSZWYpO1xuICAgICAgY29tcG9uZW50UmVmLmluc3RhbmNlLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nID1cbiAgICAgICAgX1RvYXN0UmF3SW5zdGFuY2UuVG9hc3RCZWxvbmdpbmc7XG4gICAgICB0aGlzLmFwcGVuZFRvQm9keVBhcmVudENvbXBvbmVudChjb21wb25lbnRSZWYpO1xuICAgIH1cbiAgfVxuXG4gIGlzUmVmTGlzdEF2YWlsYWJsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy50b2FzdENvbXBvbmVudFJlZkxpc3QubGVuZ3RoIDxcbiAgICAgIHRoaXMudG9hc3RDb25maWcucHJvZHVjdGlvbkNvbmZpZy5HbG9iYWxTZXR0aW5nc1xuICAgICAgICAuQWxsb3dlZE5vdGlmaWNhdGlvbnNBdE9uY2VcbiAgICApO1xuICB9XG5cbiAgcHJlcGFyZVJhd1RvYXN0KFxuICAgIF9FdmVudHNDb250cm9sbGVyOiBUb2FzdE5vdGlmaWNhdGlvbkV2ZW50c0NvbnRyb2xsZXIsXG4gICAgX1RvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nOiBUb2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZ1xuICApOiBJVG9hc3ROb3RpZmljYXRpb25SYXdTdGF0ZSB7XG4gICAgY29uc3Qgd2Vha01hcCA9IG5ldyBXZWFrTWFwKCk7XG4gICAgd2Vha01hcC5zZXQoVG9hc3ROb3RpZmljYXRpb25FdmVudHNDb250cm9sbGVyLCBfRXZlbnRzQ29udHJvbGxlcik7XG5cbiAgICByZXR1cm4ge1xuICAgICAgV2Vha01hcDogd2Vha01hcCxcbiAgICAgIFRvYXN0QmVsb25naW5nOiBfVG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmdcbiAgICB9O1xuICB9XG5cbiAgZ2V0Q29tcG9uZW50UmVmKFxuICAgIF9Ub2FzdE5vdGlmaWNhdGlvblJhd1N0YXRlOiBJVG9hc3ROb3RpZmljYXRpb25SYXdTdGF0ZVxuICApOiBDb21wb25lbnRSZWY8YW55PiB8IG51bGwge1xuICAgIGNvbnN0IGRpYWxvZ0luZGV4ID0gdGhpcy5maW5kRGlhbG9nSW5kZXgoXG4gICAgICBfVG9hc3ROb3RpZmljYXRpb25SYXdTdGF0ZS5Ub2FzdEJlbG9uZ2luZy5FbnRpdHlVbmlxdWVJRFxuICAgICk7XG4gICAgaWYgKGRpYWxvZ0luZGV4ID09PSAtMSkge1xuICAgICAgbGV0IHRvYXN0VXNlclZpZXdDb21wb25lbnQ6IFR5cGU8YW55PiA9IFRvYXN0Tm90aWZpY2F0aW9uV3JhcHBlckNvbXBvbmVudDtcbiAgICAgIGlmIChcbiAgICAgICAgX1RvYXN0Tm90aWZpY2F0aW9uUmF3U3RhdGUuVG9hc3RCZWxvbmdpbmcuVG9hc3RDb3JlQ29uZmlnXG4gICAgICAgICAgLlRvYXN0VXNlclZpZXdUeXBlID09PSBUb2FzdFVzZXJWaWV3VHlwZUVudW0uU0lNUExFXG4gICAgICApIHtcbiAgICAgICAgdG9hc3RVc2VyVmlld0NvbXBvbmVudCA9IFRvYXN0Tm90aWZpY2F0aW9uU2ltcGxlV3JhcHBlckNvbXBvbmVudDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShcbiAgICAgICAgdG9hc3RVc2VyVmlld0NvbXBvbmVudFxuICAgICAgKTtcbiAgICAgIHJldHVybiBjb21wb25lbnRGYWN0b3J5LmNyZWF0ZShcbiAgICAgICAgbmV3IERpYWxvZ0luamVjdG9yKHRoaXMuaW5qZWN0b3IsIF9Ub2FzdE5vdGlmaWNhdGlvblJhd1N0YXRlLldlYWtNYXApXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGxpc3RlbmVycyhfRXZlbnRzQ29udHJvbGxlcjogVG9hc3ROb3RpZmljYXRpb25FdmVudHNDb250cm9sbGVyKSB7XG4gICAgLy8gTGlzdGVuZXIgZm9yIGNsb3NpbmcgZGlhbG9nXG4gICAgY29uc3QgY2xvc2VEaWFsb2dTdWJzY3JpcHRpb24gPSBfRXZlbnRzQ29udHJvbGxlci5hZnRlckNsb3NlZCQuc3Vic2NyaWJlKFxuICAgICAgcmVzcG9uc2UgPT4ge1xuICAgICAgICAvLyB0aGlzLnJlbW92ZUZyb21Cb2R5UGFyZW50Q29tcG9uZW50KG1vZGFsSW5kZXgpO1xuICAgICAgICB0aGlzLnJlbW92ZUZyb21Cb2R5KHJlc3BvbnNlLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLkVudGl0eVVuaXF1ZUlEKTtcbiAgICAgICAgY2xvc2VEaWFsb2dTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgYXBwZW5kVG9Cb2R5UGFyZW50Q29tcG9uZW50KF9Db21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxhbnk+KTogdm9pZCB7XG4gICAgLy8gYXR0YWNoIHZpZXcgdG8gaWduaXRlIGxpZmVjeWNsZSBob29rc1xuICAgIHRoaXMuYXBwUmVmLmF0dGFjaFZpZXcoX0NvbXBvbmVudFJlZi5ob3N0Vmlldyk7XG5cbiAgICBjb25zdCB0b2FzdFBvc2l0aW9uOiBUb2FzdFBvc2l0aW9uRW51bSA9XG4gICAgICBfQ29tcG9uZW50UmVmLmluc3RhbmNlLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLlRvYXN0Q29yZUNvbmZpZ1xuICAgICAgICAuVG9hc3RQb3NpdGlvbjtcbiAgICBjb25zdCBvcGVuSW5FbGVtZW50SUQgPVxuICAgICAgX0NvbXBvbmVudFJlZi5pbnN0YW5jZS50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5Ub2FzdENvcmVDb25maWdcbiAgICAgICAgLk9wZW5JbkVsZW1lbnRJRDtcbiAgICBsZXQgdGFyZ2V0Tm9kZTogSFRNTEVsZW1lbnQ7XG4gICAgaWYgKCFvcGVuSW5FbGVtZW50SUQpIHtcbiAgICAgIHRoaXMuc2V0VG9hc3RXcmFwcGVyTm9kZShcbiAgICAgICAgX0NvbXBvbmVudFJlZi5pbnN0YW5jZS50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5Ub2FzdENvcmVDb25maWdcbiAgICAgICAgICAuVG9hc3RQb3NpdGlvbixcbiAgICAgICAgdGhpcy5zZXRUb2FzdE92ZXJsYXlOb2RlKClcbiAgICAgICk7XG4gICAgICB0YXJnZXROb2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHRvYXN0LXdyYXBwZXItJHt0b2FzdFBvc2l0aW9ufWApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0YXJnZXROb2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQob3BlbkluRWxlbWVudElEKTtcbiAgICB9XG5cbiAgICBjb25zdCBkb21FbGVtID0gKF9Db21wb25lbnRSZWYuaG9zdFZpZXcgYXMgRW1iZWRkZWRWaWV3UmVmPGFueT4pXG4gICAgICAucm9vdE5vZGVzWzBdIGFzIEhUTUxFbGVtZW50O1xuXG4gICAgY29uc3QgdG9hc3RFbnRpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0b2FzdEVudGl0eS5zZXRBdHRyaWJ1dGUoXG4gICAgICAnaWQnLFxuICAgICAgX0NvbXBvbmVudFJlZi5pbnN0YW5jZS50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5FbnRpdHlVbmlxdWVJRFxuICAgICk7XG4gICAgdG9hc3RFbnRpdHkuY2xhc3NOYW1lID0gJ3RvYXN0LWVudGl0eSc7XG4gICAgY29uc3Qgc3BsaXQgPSB0b2FzdFBvc2l0aW9uLnNwbGl0KCctJyk7XG4gICAgaWYgKHNwbGl0WzFdID09PSAnZnVsbHdpZHRoJykge1xuICAgICAgdG9hc3RFbnRpdHkuc3R5bGUud2lkdGggPSAnOTN2dyc7XG4gICAgfSBlbHNlIGlmIChvcGVuSW5FbGVtZW50SUQpIHtcbiAgICAgIHRvYXN0RW50aXR5LnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgIH0gZWxzZSB7XG4gICAgICB0b2FzdEVudGl0eS5zdHlsZS53aWR0aCA9ICczMDBweCc7XG4gICAgfVxuICAgIHRvYXN0RW50aXR5LnN0eWxlLm1hcmdpbiA9ICdhdXRvJztcbiAgICB0b2FzdEVudGl0eS5wcmVwZW5kKGRvbUVsZW0pO1xuICAgIC8vIHRhcmdldE5vZGUucHJlcGVuZCh0b2FzdEVudGl0eSk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0YXJnZXROb2RlLnByZXBlbmQodG9hc3RFbnRpdHkpO1xuICAgIH0sIDIwMCk7XG4gIH1cblxuICByZW1vdmVGcm9tQm9keShfRW50aXR5VW5pcXVlSUQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IG1vZGFsSW5kZXggPSB0aGlzLmZpbmREaWFsb2dJbmRleChfRW50aXR5VW5pcXVlSUQpO1xuICAgIGlmIChtb2RhbEluZGV4ID4gLTEpIHtcbiAgICAgIGlmICh0aGlzLmJ1ZmZlclRvYXN0UmF3TGlzdC5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5zZW5kVG9Qcm9kdWN0aW9uKHRoaXMuYnVmZmVyVG9hc3RSYXdMaXN0WzBdKTtcbiAgICAgICAgdGhpcy5idWZmZXJUb2FzdFJhd0xpc3Quc3BsaWNlKDAsIDEpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnRvYXN0Q29tcG9uZW50UmVmTGlzdFttb2RhbEluZGV4XS5pbnN0YW5jZVxuICAgICAgICAuY2xvc2VQYXJlbnQkKCdjbG9zZS1mYXN0JylcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgbWFwKGl0ZW0gPT4ge1xuICAgICAgICAgICAgY29uc3QgbW9kYWxJbmRleCA9IHRoaXMuZmluZERpYWxvZ0luZGV4KF9FbnRpdHlVbmlxdWVJRCk7XG4gICAgICAgICAgICBpZiAodGhpcy50b2FzdENvbXBvbmVudFJlZkxpc3RbbW9kYWxJbmRleF0pIHtcbiAgICAgICAgICAgICAgY29uc3QgdG9hc3RFbnRpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAgICAgICAgICAgICB0aGlzLnRvYXN0Q29tcG9uZW50UmVmTGlzdFttb2RhbEluZGV4XS5pbnN0YW5jZVxuICAgICAgICAgICAgICAgICAgLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLkVudGl0eVVuaXF1ZUlEXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIHRvYXN0RW50aXR5LnJlbW92ZSgpO1xuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgJWMgJHt0aGlzLnRvYXN0Q29tcG9uZW50UmVmTGlzdFttb2RhbEluZGV4XS5pbnN0YW5jZS50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5FbnRpdHlVbmlxdWVJRH0gYCwgYGJhY2tncm91bmQ6ICNjYzMzMzM7IGNvbG9yOiAjZmZmYCk7XG4gICAgICAgICAgICAgIHRoaXMuYXBwUmVmLmRldGFjaFZpZXcoXG4gICAgICAgICAgICAgICAgdGhpcy50b2FzdENvbXBvbmVudFJlZkxpc3RbbW9kYWxJbmRleF0uaG9zdFZpZXdcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgdGhpcy50b2FzdENvbXBvbmVudFJlZkxpc3RbbW9kYWxJbmRleF0uZGVzdHJveSgpO1xuICAgICAgICAgICAgICB0aGlzLnRvYXN0Q29tcG9uZW50UmVmTGlzdC5zcGxpY2UobW9kYWxJbmRleCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgZmluZERpYWxvZ0luZGV4KF9EaWFsb2dVbmlxdWVJRDogc3RyaW5nKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy50b2FzdENvbXBvbmVudFJlZkxpc3QuZmluZEluZGV4KGl0ZW0gPT4ge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgX0RpYWxvZ1VuaXF1ZUlEID09PVxuICAgICAgICBpdGVtLmluc3RhbmNlLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLkVudGl0eVVuaXF1ZUlEXG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRUb2FzdE92ZXJsYXlOb2RlKCk6IEhUTUxFbGVtZW50IHtcbiAgICBjb25zdCBib2R5Tm9kZSA9IGRvY3VtZW50LmJvZHkgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXTtcbiAgICBpZiAoIWJvZHlOb2RlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIGNoZWNrIHRoZSBvdmVybGF5XG4gICAgbGV0IHRvYXN0T3ZlcmxheU5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAgICd0b2FzdC1vdmVybGF5LWNvbnRhaW5lcidcbiAgICApIGFzIEhUTUxTdHlsZUVsZW1lbnQ7XG5cbiAgICBpZiAoIXRvYXN0T3ZlcmxheU5vZGUpIHtcbiAgICAgIGxldCB0b2FzdE92ZXJsYXlOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB0b2FzdE92ZXJsYXlOb2RlLnNldEF0dHJpYnV0ZSgnaWQnLCAndG9hc3Qtb3ZlcmxheS1jb250YWluZXInKTtcbiAgICAgIHRvYXN0T3ZlcmxheU5vZGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpKTtcbiAgICAgIHRvYXN0T3ZlcmxheU5vZGUuc3R5bGUucG9zaXRpb24gPSAnZml4ZWQnO1xuICAgICAgdG9hc3RPdmVybGF5Tm9kZS5zdHlsZS50b3AgPSAnMCc7XG4gICAgICB0b2FzdE92ZXJsYXlOb2RlLnN0eWxlLmxlZnQgPSAnMCc7XG4gICAgICB0b2FzdE92ZXJsYXlOb2RlLnN0eWxlLnpJbmRleCA9ICc5OTk5OTk5OTknO1xuICAgICAgYm9keU5vZGUuYXBwZW5kQ2hpbGQodG9hc3RPdmVybGF5Tm9kZSk7XG4gICAgICByZXR1cm4gdG9hc3RPdmVybGF5Tm9kZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdG9hc3RPdmVybGF5Tm9kZTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0VG9hc3RXcmFwcGVyTm9kZShcbiAgICBfUG9zaXRpb246IFRvYXN0UG9zaXRpb25FbnVtLFxuICAgIF9Ub2FzdE92ZXJsYXlOb2RlOiBIVE1MRWxlbWVudFxuICApIHtcbiAgICBsZXQgdG9hc3RXcmFwcGVyTm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgICAgYHRvYXN0LXdyYXBwZXItJHtfUG9zaXRpb259YFxuICAgICkgYXMgSFRNTFN0eWxlRWxlbWVudDtcbiAgICBpZiAoIXRvYXN0V3JhcHBlck5vZGUpIHtcbiAgICAgIGNvbnN0IHRvYXN0V3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgdG9hc3RXcmFwcGVyLnNldEF0dHJpYnV0ZSgnaWQnLCAndG9hc3Qtd3JhcHBlci0nICsgX1Bvc2l0aW9uKTtcbiAgICAgIHRvYXN0V3JhcHBlci5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJykpO1xuICAgICAgX1RvYXN0T3ZlcmxheU5vZGUucHJlcGVuZCh0b2FzdFdyYXBwZXIpO1xuXG4gICAgICBjb25zdCBzcGxpdCA9IF9Qb3NpdGlvbi5zcGxpdCgnLScpO1xuXG4gICAgICBpZiAoc3BsaXRbMV0gPT09ICdyaWdodCcgfHwgc3BsaXRbMV0gPT09ICdsZWZ0Jykge1xuICAgICAgICB0aGlzLmdDb25maWdTZXJ2aWNlXG4gICAgICAgICAgLmdldFNoZWV0KCduZ3gtYXdlc29tZS1wb3B1cC1zdHlsZXMnKVxuICAgICAgICAgIC5hZGRSdWxlKFxuICAgICAgICAgICAgYCN0b2FzdC13cmFwcGVyLSR7X1Bvc2l0aW9ufWAsXG4gICAgICAgICAgICBgJHtzcGxpdFswXX06IDIwcHg7ICR7c3BsaXRbMV19OiAyMHB4OyBwb3NpdGlvbjogZml4ZWQ7IHotaW5kZXg6IDk5OTk5OTtgXG4gICAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGlmIChzcGxpdFsxXSA9PT0gJ2NlbnRlcicpIHtcbiAgICAgICAgdGhpcy5nQ29uZmlnU2VydmljZVxuICAgICAgICAgIC5nZXRTaGVldCgnbmd4LWF3ZXNvbWUtcG9wdXAtc3R5bGVzJylcbiAgICAgICAgICAuYWRkUnVsZShcbiAgICAgICAgICAgIGAjdG9hc3Qtd3JhcHBlci0ke19Qb3NpdGlvbn1gLFxuICAgICAgICAgICAgYCR7c3BsaXRbMF19OiAyMHB4OyB3aWR0aDogMTAwJTsgcG9zaXRpb246IGZpeGVkOyB6LWluZGV4OiA5OTk5OTk7IHBvaW50ZXItZXZlbnRzOiBub25lO2BcbiAgICAgICAgICApO1xuICAgICAgfVxuICAgICAgaWYgKHNwbGl0WzFdID09PSAnZnVsbHdpZHRoJykge1xuICAgICAgICB0aGlzLmdDb25maWdTZXJ2aWNlXG4gICAgICAgICAgLmdldFNoZWV0KCduZ3gtYXdlc29tZS1wb3B1cC1zdHlsZXMnKVxuICAgICAgICAgIC5hZGRSdWxlKFxuICAgICAgICAgICAgYCN0b2FzdC13cmFwcGVyLSR7X1Bvc2l0aW9ufWAsXG4gICAgICAgICAgICBgJHtzcGxpdFswXX06IDEwcHg7IHdpZHRoOiAxMDAlOyBwb3NpdGlvbjogZml4ZWQ7IHotaW5kZXg6IDk5OTk5OTsgcG9pbnRlci1ldmVudHM6IG5vbmU7YFxuICAgICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=