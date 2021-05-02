import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
import { map } from 'rxjs/operators';
import { DialogInjector } from '../../../core/dialog-injector';
import { GlobalConfigService } from '../../../core/global-config.service';
import { ToastNotificationSimpleWrapperComponent } from '../toast-notification-simple-wrapper/toast-notification-simple-wrapper.component';
import { ToastNotificationWrapperComponent } from '../toast-notification-wrapper/toast-notification-wrapper.component';
import { ToastNotificationClass, ToastUserViewTypeEnum } from './model';
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
            componentRef.instance.toastNotificationBelonging = _ToastRawInstance.ToastBelonging;
            this.appendToBodyParentComponent(componentRef);
        }
    }
    isRefListAvailable() {
        return this.toastComponentRefList.length < this.toastConfig.productionConfig.GlobalSettings.AllowedNotificationsAtOnce;
    }
    prepareRawToast(_EventsController, _ToastNotificationBelonging) {
        const weakMap = new WeakMap();
        weakMap.set(ToastNotificationClass.ToastNotificationEventsController, _EventsController);
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
        const closeDialogSubscription = _EventsController.afterClosed$.subscribe((response) => {
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
            toastEntity.style.width = '97vw';
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
            this.toastComponentRefList[modalIndex].instance.closeParent$('close-fast').pipe(map(item => {
                const modalIndex = this.findDialogIndex(_EntityUniqueID);
                if (this.toastComponentRefList[modalIndex]) {
                    const toastEntity = document.getElementById(this.toastComponentRefList[modalIndex].instance.toastNotificationBelonging.EntityUniqueID);
                    toastEntity.remove();
                    // console.log(`%c ${this.toastComponentRefList[modalIndex].instance.toastNotificationBelonging.EntityUniqueID} `, `background: #cc3333; color: #fff`);
                    this.appRef.detachView(this.toastComponentRefList[modalIndex].hostView);
                    this.toastComponentRefList[modalIndex].destroy();
                    this.toastComponentRefList.splice(modalIndex, 1);
                }
            })).subscribe();
        }
    }
    findDialogIndex(_DialogUniqueID) {
        return this.toastComponentRefList.findIndex((item) => {
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
                this.gConfigService.getSheet('ngx-awesome-popup-styles').addRule(`#toast-wrapper-${_Position}`, `${split[0]}: 20px; ${split[1]}: 20px; position: fixed; z-index: 999999;`);
            }
            if (split[1] === 'center') {
                this.gConfigService.getSheet('ngx-awesome-popup-styles').addRule(`#toast-wrapper-${_Position}`, `${split[0]}: 20px; width: 100%; position: fixed; z-index: 999999; pointer-events: none;`);
            }
            if (split[1] === 'fullwidth') {
                this.gConfigService.getSheet('ngx-awesome-popup-styles').addRule(`#toast-wrapper-${_Position}`, `${split[0]}: 10px; width: 100%; position: fixed; z-index: 999999; pointer-events: none;`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3Qtbm90aWZpY2F0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9uZ3gtYXdlc29tZS1wb3B1cC90eXBlcy90b2FzdC1ub3RpZmljYXRpb24vY29yZS90b2FzdC1ub3RpZmljYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsY0FBYyxFQUFFLHdCQUF3QixFQUFpQyxVQUFVLEVBQUUsUUFBUSxFQUFPLE1BQU0sZUFBZSxDQUFDO0FBRWxJLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuQyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFDN0QsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFDeEUsT0FBTyxFQUFDLHVDQUF1QyxFQUFDLE1BQU0sa0ZBQWtGLENBQUM7QUFDekksT0FBTyxFQUFDLGlDQUFpQyxFQUFDLE1BQU0sb0VBQW9FLENBQUM7QUFDckgsT0FBTyxFQUFDLHNCQUFzQixFQUFpRCxxQkFBcUIsRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUNySCxPQUFPLEVBQUMsOEJBQThCLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQzs7OztBQUtuRixNQUFNLE9BQU8sd0JBQXdCO0lBT3BDLFlBQW9CLHdCQUFrRCxFQUFVLFFBQWtCLEVBQVUsTUFBc0IsRUFBVSxXQUEyQyxFQUFVLGNBQW1DO1FBQWhOLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBZ0M7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBcUI7UUFMcE8sb0ZBQW9GO1FBQ3BGLDBCQUFxQixHQUF5RCxFQUFFLENBQUM7UUFDakYsdUJBQWtCLEdBQTRELEVBQUUsQ0FBQztRQUNqRixr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LENBQUM7WUFDdEQsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBRXhDLE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFbkMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssT0FBTyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxNQUFNLEVBQUU7Z0JBQ2hELElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLDBCQUEwQixDQUFDLENBQUMsT0FBTyxDQUFDLGtCQUFrQixTQUFTLEVBQUUsRUFBRSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsV0FBVyxLQUFLLENBQUMsQ0FBQyxDQUFDLDJDQUEyQyxDQUFDLENBQUM7YUFDM0s7WUFDRCxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLEVBQUU7Z0JBQzFCLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLDBCQUEwQixDQUFDLENBQUMsT0FBTyxDQUFDLGtCQUFrQixTQUFTLEVBQUUsRUFBRSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsOEVBQThFLENBQUMsQ0FBQzthQUMzTDtZQUNELElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLFdBQVcsRUFBRTtnQkFDN0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLFNBQVMsRUFBRSxFQUFFLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyw4RUFBOEUsQ0FBQyxDQUFDO2FBQzNMO1NBRUQ7SUFHRixDQUFDOzs7O1lBN01ELFVBQVUsU0FBQztnQkFDWCxVQUFVLEVBQUUsTUFBTTthQUNsQjs7O1lBWnVCLHdCQUF3QjtZQUE2QyxRQUFRO1lBQTdGLGNBQWM7WUFRZCw4QkFBOEI7WUFKOUIsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBcHBsaWNhdGlvblJlZiwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBDb21wb25lbnRSZWYsIEVtYmVkZGVkVmlld1JlZiwgSW5qZWN0YWJsZSwgSW5qZWN0b3IsIFR5cGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7bWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge0RpYWxvZ0luamVjdG9yfSBmcm9tICcuLi8uLi8uLi9jb3JlL2RpYWxvZy1pbmplY3Rvcic7XG5pbXBvcnQge0dsb2JhbENvbmZpZ1NlcnZpY2V9IGZyb20gJy4uLy4uLy4uL2NvcmUvZ2xvYmFsLWNvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7VG9hc3ROb3RpZmljYXRpb25TaW1wbGVXcmFwcGVyQ29tcG9uZW50fSBmcm9tICcuLi90b2FzdC1ub3RpZmljYXRpb24tc2ltcGxlLXdyYXBwZXIvdG9hc3Qtbm90aWZpY2F0aW9uLXNpbXBsZS13cmFwcGVyLmNvbXBvbmVudCc7XG5pbXBvcnQge1RvYXN0Tm90aWZpY2F0aW9uV3JhcHBlckNvbXBvbmVudH0gZnJvbSAnLi4vdG9hc3Qtbm90aWZpY2F0aW9uLXdyYXBwZXIvdG9hc3Qtbm90aWZpY2F0aW9uLXdyYXBwZXIuY29tcG9uZW50JztcbmltcG9ydCB7VG9hc3ROb3RpZmljYXRpb25DbGFzcywgVG9hc3ROb3RpZmljYXRpb25JbnRlcmZhY2UsIFRvYXN0UG9zaXRpb25FbnVtLCBUb2FzdFVzZXJWaWV3VHlwZUVudW19IGZyb20gJy4vbW9kZWwnO1xuaW1wb3J0IHtUb2FzdE5vdGlmaWNhdGlvbkNvbmZpZ1NlcnZpY2V9IGZyb20gJy4vdG9hc3Qtbm90aWZpY2F0aW9uLWNvbmZpZy5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuXHRwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgVG9hc3ROb3RpZmljYXRpb25TZXJ2aWNlIHtcblxuXHQvLyB0b2FzdENvbXBvbmVudFJlZkxpc3Q6IENvbXBvbmVudFJlZjxUb2FzdE5vdGlmaWNhdGlvbldyYXBwZXJDb21wb25lbnQ+W10gICAgPSBbXTtcblx0dG9hc3RDb21wb25lbnRSZWZMaXN0OiBDb21wb25lbnRSZWY8YW55PltdICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gW107XG5cdGJ1ZmZlclRvYXN0UmF3TGlzdDogVG9hc3ROb3RpZmljYXRpb25JbnRlcmZhY2UuSVRvYXN0Tm90aWZpY2F0aW9uUmF3U3RhdGVbXSA9IFtdO1xuXHRidWZmZXJDaGVja2luZ0ludGVydmFsSXNSZWFkeTogYm9vbGVhbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPSB0cnVlO1xuXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLCBwcml2YXRlIGFwcFJlZjogQXBwbGljYXRpb25SZWYsIHByaXZhdGUgdG9hc3RDb25maWc6IFRvYXN0Tm90aWZpY2F0aW9uQ29uZmlnU2VydmljZSwgcHJpdmF0ZSBnQ29uZmlnU2VydmljZTogR2xvYmFsQ29uZmlnU2VydmljZSkge1xuXHR9XG5cblx0b3BlblRvYXN0JChfVG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmc6IFRvYXN0Tm90aWZpY2F0aW9uQ2xhc3MuVG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcpOiBPYnNlcnZhYmxlPFRvYXN0Tm90aWZpY2F0aW9uSW50ZXJmYWNlLklQcml2YXRlUmVzcG9uc2VNZXJnZWQ+IHtcblx0XHRsZXQgZXZlbnRDb250cm9sbGVyID0gX1RvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLkV2ZW50c0NvbnRyb2xsZXI7XG5cdFx0Ly8gY29uc29sZS5sb2coYCVjICR7X1RvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLkVudGl0eVVuaXF1ZUlEfSBgLCBgYmFja2dyb3VuZDogIzMzOTkzMzsgY29sb3I6ICNmZmZgKTtcblxuXHRcdGNvbnN0IHRvYXN0UmF3SW5zdGFuY2UgPSB0aGlzLnByZXBhcmVSYXdUb2FzdChldmVudENvbnRyb2xsZXIsIF9Ub2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZyk7XG5cdFx0dGhpcy5saXN0ZW5lcnMoZXZlbnRDb250cm9sbGVyKTtcblx0XHR0aGlzLmludGVybmFsUm91dGluZyh0b2FzdFJhd0luc3RhbmNlKTtcblx0XHRyZXR1cm4gZXZlbnRDb250cm9sbGVyLmFmdGVyQ2xvc2VkJDtcblx0fVxuXG5cdGludGVybmFsUm91dGluZyhfVG9hc3RSYXdJbnN0YW5jZTogVG9hc3ROb3RpZmljYXRpb25JbnRlcmZhY2UuSVRvYXN0Tm90aWZpY2F0aW9uUmF3U3RhdGUpOiBib29sZWFuIHtcblx0XHRpZiAodGhpcy5pc1JlZkxpc3RBdmFpbGFibGUoKSkge1xuXHRcdFx0dGhpcy5zZW5kVG9Qcm9kdWN0aW9uKF9Ub2FzdFJhd0luc3RhbmNlKTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnNlbmRUb0J1ZmZlcihfVG9hc3RSYXdJbnN0YW5jZSk7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHR9XG5cblx0c2VuZFRvQnVmZmVyKF9Ub2FzdFJhd0luc3RhbmNlOiBUb2FzdE5vdGlmaWNhdGlvbkludGVyZmFjZS5JVG9hc3ROb3RpZmljYXRpb25SYXdTdGF0ZSkge1xuXHRcdHRoaXMuYnVmZmVyVG9hc3RSYXdMaXN0LnB1c2goX1RvYXN0UmF3SW5zdGFuY2UpO1xuXHR9XG5cblx0c2VuZFRvUHJvZHVjdGlvbihfVG9hc3RSYXdJbnN0YW5jZTogVG9hc3ROb3RpZmljYXRpb25JbnRlcmZhY2UuSVRvYXN0Tm90aWZpY2F0aW9uUmF3U3RhdGUpOiB2b2lkIHtcblx0XHRjb25zdCBjb21wb25lbnRSZWYgPSB0aGlzLmdldENvbXBvbmVudFJlZihfVG9hc3RSYXdJbnN0YW5jZSk7XG5cdFx0aWYgKGNvbXBvbmVudFJlZikge1xuXHRcdFx0dGhpcy50b2FzdENvbXBvbmVudFJlZkxpc3QucHVzaChjb21wb25lbnRSZWYpO1xuXHRcdFx0Y29tcG9uZW50UmVmLmluc3RhbmNlLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nID0gX1RvYXN0UmF3SW5zdGFuY2UuVG9hc3RCZWxvbmdpbmc7XG5cdFx0XHR0aGlzLmFwcGVuZFRvQm9keVBhcmVudENvbXBvbmVudChjb21wb25lbnRSZWYpO1xuXG5cdFx0fVxuXHR9XG5cblx0aXNSZWZMaXN0QXZhaWxhYmxlKCk6IGJvb2xlYW4ge1xuXHRcdHJldHVybiB0aGlzLnRvYXN0Q29tcG9uZW50UmVmTGlzdC5sZW5ndGggPCB0aGlzLnRvYXN0Q29uZmlnLnByb2R1Y3Rpb25Db25maWcuR2xvYmFsU2V0dGluZ3MuQWxsb3dlZE5vdGlmaWNhdGlvbnNBdE9uY2U7XG5cdH1cblxuXHRwcmVwYXJlUmF3VG9hc3QoX0V2ZW50c0NvbnRyb2xsZXI6IFRvYXN0Tm90aWZpY2F0aW9uQ2xhc3MuVG9hc3ROb3RpZmljYXRpb25FdmVudHNDb250cm9sbGVyLCBfVG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmc6IFRvYXN0Tm90aWZpY2F0aW9uQ2xhc3MuVG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcpOiBUb2FzdE5vdGlmaWNhdGlvbkludGVyZmFjZS5JVG9hc3ROb3RpZmljYXRpb25SYXdTdGF0ZSB7XG5cblx0XHRjb25zdCB3ZWFrTWFwID0gbmV3IFdlYWtNYXAoKTtcblx0XHR3ZWFrTWFwLnNldChUb2FzdE5vdGlmaWNhdGlvbkNsYXNzLlRvYXN0Tm90aWZpY2F0aW9uRXZlbnRzQ29udHJvbGxlciwgX0V2ZW50c0NvbnRyb2xsZXIpO1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdFdlYWtNYXAgICAgICAgOiB3ZWFrTWFwLFxuXHRcdFx0VG9hc3RCZWxvbmdpbmc6IF9Ub2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZ1xuXHRcdH07XG5cdH1cblxuXHRnZXRDb21wb25lbnRSZWYoX1RvYXN0Tm90aWZpY2F0aW9uUmF3U3RhdGU6IFRvYXN0Tm90aWZpY2F0aW9uSW50ZXJmYWNlLklUb2FzdE5vdGlmaWNhdGlvblJhd1N0YXRlKTogQ29tcG9uZW50UmVmPGFueT4gfCBudWxsIHtcblxuXHRcdGNvbnN0IGRpYWxvZ0luZGV4ID0gdGhpcy5maW5kRGlhbG9nSW5kZXgoX1RvYXN0Tm90aWZpY2F0aW9uUmF3U3RhdGUuVG9hc3RCZWxvbmdpbmcuRW50aXR5VW5pcXVlSUQpO1xuXHRcdGlmIChkaWFsb2dJbmRleCA9PT0gLTEpIHtcblxuXHRcdFx0bGV0IHRvYXN0VXNlclZpZXdDb21wb25lbnQ6IFR5cGU8YW55PiA9IFRvYXN0Tm90aWZpY2F0aW9uV3JhcHBlckNvbXBvbmVudDtcblx0XHRcdGlmIChfVG9hc3ROb3RpZmljYXRpb25SYXdTdGF0ZS5Ub2FzdEJlbG9uZ2luZy5Ub2FzdENvcmVDb25maWcuVG9hc3RVc2VyVmlld1R5cGUgPT09IFRvYXN0VXNlclZpZXdUeXBlRW51bS5TSU1QTEUpIHtcblx0XHRcdFx0dG9hc3RVc2VyVmlld0NvbXBvbmVudCA9IFRvYXN0Tm90aWZpY2F0aW9uU2ltcGxlV3JhcHBlckNvbXBvbmVudDtcblx0XHRcdH1cblx0XHRcdGNvbnN0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeSh0b2FzdFVzZXJWaWV3Q29tcG9uZW50KTtcblx0XHRcdHJldHVybiBjb21wb25lbnRGYWN0b3J5LmNyZWF0ZShuZXcgRGlhbG9nSW5qZWN0b3IodGhpcy5pbmplY3RvciwgX1RvYXN0Tm90aWZpY2F0aW9uUmF3U3RhdGUuV2Vha01hcCkpO1xuXHRcdH1cblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdGxpc3RlbmVycyhfRXZlbnRzQ29udHJvbGxlcjogVG9hc3ROb3RpZmljYXRpb25DbGFzcy5Ub2FzdE5vdGlmaWNhdGlvbkV2ZW50c0NvbnRyb2xsZXIpIHtcblxuXHRcdC8vIExpc3RlbmVyIGZvciBjbG9zaW5nIGRpYWxvZ1xuXHRcdGNvbnN0IGNsb3NlRGlhbG9nU3Vic2NyaXB0aW9uID0gX0V2ZW50c0NvbnRyb2xsZXIuYWZ0ZXJDbG9zZWQkLnN1YnNjcmliZSgocmVzcG9uc2UpID0+IHtcblxuXHRcdFx0Ly8gdGhpcy5yZW1vdmVGcm9tQm9keVBhcmVudENvbXBvbmVudChtb2RhbEluZGV4KTtcblx0XHRcdHRoaXMucmVtb3ZlRnJvbUJvZHkocmVzcG9uc2UudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuRW50aXR5VW5pcXVlSUQpO1xuXHRcdFx0Y2xvc2VEaWFsb2dTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcblx0XHR9KTtcblx0fVxuXG5cdGFwcGVuZFRvQm9keVBhcmVudENvbXBvbmVudChfQ29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8YW55Pik6IHZvaWQge1xuXHRcdC8vIGF0dGFjaCB2aWV3IHRvIGlnbml0ZSBsaWZlY3ljbGUgaG9va3Ncblx0XHR0aGlzLmFwcFJlZi5hdHRhY2hWaWV3KF9Db21wb25lbnRSZWYuaG9zdFZpZXcpO1xuXG5cblx0XHRjb25zdCB0b2FzdFBvc2l0aW9uOiBUb2FzdFBvc2l0aW9uRW51bSA9IF9Db21wb25lbnRSZWYuaW5zdGFuY2UudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuVG9hc3RDb3JlQ29uZmlnLlRvYXN0UG9zaXRpb247XG5cdFx0Y29uc3Qgb3BlbkluRWxlbWVudElEICAgICAgICAgICAgICAgICAgPSBfQ29tcG9uZW50UmVmLmluc3RhbmNlLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLlRvYXN0Q29yZUNvbmZpZy5PcGVuSW5FbGVtZW50SUQ7XG5cdFx0bGV0IHRhcmdldE5vZGU6IEhUTUxFbGVtZW50O1xuXHRcdGlmICghb3BlbkluRWxlbWVudElEKSB7XG5cdFx0XHR0aGlzLnNldFRvYXN0V3JhcHBlck5vZGUoX0NvbXBvbmVudFJlZi5pbnN0YW5jZS50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5Ub2FzdENvcmVDb25maWcuVG9hc3RQb3NpdGlvbiwgdGhpcy5zZXRUb2FzdE92ZXJsYXlOb2RlKCkpO1xuXHRcdFx0dGFyZ2V0Tm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGB0b2FzdC13cmFwcGVyLSR7dG9hc3RQb3NpdGlvbn1gKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGFyZ2V0Tm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG9wZW5JbkVsZW1lbnRJRCk7XG5cdFx0fVxuXG5cblx0XHRjb25zdCBkb21FbGVtID0gKF9Db21wb25lbnRSZWYuaG9zdFZpZXcgYXMgRW1iZWRkZWRWaWV3UmVmPGFueT4pLnJvb3ROb2Rlc1swXSBhcyBIVE1MRWxlbWVudDtcblxuXHRcdGNvbnN0IHRvYXN0RW50aXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0dG9hc3RFbnRpdHkuc2V0QXR0cmlidXRlKCdpZCcsIF9Db21wb25lbnRSZWYuaW5zdGFuY2UudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuRW50aXR5VW5pcXVlSUQpO1xuXHRcdHRvYXN0RW50aXR5LmNsYXNzTmFtZSA9ICd0b2FzdC1lbnRpdHknO1xuXHRcdGNvbnN0IHNwbGl0ICAgICAgICAgICA9IHRvYXN0UG9zaXRpb24uc3BsaXQoJy0nKTtcblx0XHRpZiAoc3BsaXRbMV0gPT09ICdmdWxsd2lkdGgnKSB7XG5cdFx0XHR0b2FzdEVudGl0eS5zdHlsZS53aWR0aCA9ICc5N3Z3Jztcblx0XHR9IGVsc2UgaWYgKG9wZW5JbkVsZW1lbnRJRCkge1xuXHRcdFx0dG9hc3RFbnRpdHkuc3R5bGUud2lkdGggPSAnMTAwJSc7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRvYXN0RW50aXR5LnN0eWxlLndpZHRoID0gJzMwMHB4Jztcblx0XHR9XG5cdFx0dG9hc3RFbnRpdHkuc3R5bGUubWFyZ2luID0gJ2F1dG8nO1xuXHRcdHRvYXN0RW50aXR5LnByZXBlbmQoZG9tRWxlbSk7XG5cdFx0Ly8gdGFyZ2V0Tm9kZS5wcmVwZW5kKHRvYXN0RW50aXR5KTtcblx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdHRhcmdldE5vZGUucHJlcGVuZCh0b2FzdEVudGl0eSk7XG5cdFx0fSwgMjAwKTtcblxuXHR9XG5cblx0cmVtb3ZlRnJvbUJvZHkoX0VudGl0eVVuaXF1ZUlEOiBzdHJpbmcpOiB2b2lkIHtcblxuXHRcdGNvbnN0IG1vZGFsSW5kZXggPSB0aGlzLmZpbmREaWFsb2dJbmRleChfRW50aXR5VW5pcXVlSUQpO1xuXHRcdGlmIChtb2RhbEluZGV4ID4gLTEpIHtcblxuXHRcdFx0aWYgKHRoaXMuYnVmZmVyVG9hc3RSYXdMaXN0Lmxlbmd0aCkge1xuXHRcdFx0XHR0aGlzLnNlbmRUb1Byb2R1Y3Rpb24odGhpcy5idWZmZXJUb2FzdFJhd0xpc3RbMF0pO1xuXHRcdFx0XHR0aGlzLmJ1ZmZlclRvYXN0UmF3TGlzdC5zcGxpY2UoMCwgMSk7XG5cblx0XHRcdH1cblxuXHRcdFx0dGhpcy50b2FzdENvbXBvbmVudFJlZkxpc3RbbW9kYWxJbmRleF0uaW5zdGFuY2UuY2xvc2VQYXJlbnQkKCdjbG9zZS1mYXN0JykucGlwZShtYXAoaXRlbSA9PiB7XG5cdFx0XHRcdGNvbnN0IG1vZGFsSW5kZXggPSB0aGlzLmZpbmREaWFsb2dJbmRleChfRW50aXR5VW5pcXVlSUQpO1xuXHRcdFx0XHRpZiAodGhpcy50b2FzdENvbXBvbmVudFJlZkxpc3RbbW9kYWxJbmRleF0pIHtcblx0XHRcdFx0XHRjb25zdCB0b2FzdEVudGl0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMudG9hc3RDb21wb25lbnRSZWZMaXN0W21vZGFsSW5kZXhdLmluc3RhbmNlLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLkVudGl0eVVuaXF1ZUlEKTtcblx0XHRcdFx0XHR0b2FzdEVudGl0eS5yZW1vdmUoKTtcblx0XHRcdFx0XHQvLyBjb25zb2xlLmxvZyhgJWMgJHt0aGlzLnRvYXN0Q29tcG9uZW50UmVmTGlzdFttb2RhbEluZGV4XS5pbnN0YW5jZS50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5FbnRpdHlVbmlxdWVJRH0gYCwgYGJhY2tncm91bmQ6ICNjYzMzMzM7IGNvbG9yOiAjZmZmYCk7XG5cdFx0XHRcdFx0dGhpcy5hcHBSZWYuZGV0YWNoVmlldyh0aGlzLnRvYXN0Q29tcG9uZW50UmVmTGlzdFttb2RhbEluZGV4XS5ob3N0Vmlldyk7XG5cdFx0XHRcdFx0dGhpcy50b2FzdENvbXBvbmVudFJlZkxpc3RbbW9kYWxJbmRleF0uZGVzdHJveSgpO1xuXHRcdFx0XHRcdHRoaXMudG9hc3RDb21wb25lbnRSZWZMaXN0LnNwbGljZShtb2RhbEluZGV4LCAxKTtcblx0XHRcdFx0fVxuXHRcdFx0fSkpLnN1YnNjcmliZSgpO1xuXHRcdH1cblx0fVxuXG5cdGZpbmREaWFsb2dJbmRleChfRGlhbG9nVW5pcXVlSUQ6IHN0cmluZyk6IG51bWJlciB7XG5cdFx0cmV0dXJuIHRoaXMudG9hc3RDb21wb25lbnRSZWZMaXN0LmZpbmRJbmRleCgoaXRlbSkgPT4ge1xuXHRcdFx0cmV0dXJuIF9EaWFsb2dVbmlxdWVJRCA9PT0gaXRlbS5pbnN0YW5jZS50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5FbnRpdHlVbmlxdWVJRDtcblx0XHR9KTtcblx0fVxuXG5cdHByaXZhdGUgc2V0VG9hc3RPdmVybGF5Tm9kZSgpOiBIVE1MRWxlbWVudCB7XG5cdFx0Y29uc3QgYm9keU5vZGUgPSBkb2N1bWVudC5ib2R5IHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF07XG5cdFx0aWYgKCFib2R5Tm9kZSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHQvLyBjaGVjayB0aGUgb3ZlcmxheVxuXHRcdGxldCB0b2FzdE92ZXJsYXlOb2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvYXN0LW92ZXJsYXktY29udGFpbmVyJykgYXMgSFRNTFN0eWxlRWxlbWVudDtcblxuXHRcdGlmICghdG9hc3RPdmVybGF5Tm9kZSkge1xuXHRcdFx0bGV0IHRvYXN0T3ZlcmxheU5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRcdHRvYXN0T3ZlcmxheU5vZGUuc2V0QXR0cmlidXRlKCdpZCcsICd0b2FzdC1vdmVybGF5LWNvbnRhaW5lcicpO1xuXHRcdFx0dG9hc3RPdmVybGF5Tm9kZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJykpO1xuXHRcdFx0dG9hc3RPdmVybGF5Tm9kZS5zdHlsZS5wb3NpdGlvbiA9ICdmaXhlZCc7XG5cdFx0XHR0b2FzdE92ZXJsYXlOb2RlLnN0eWxlLnRvcCAgICAgID0gJzAnO1xuXHRcdFx0dG9hc3RPdmVybGF5Tm9kZS5zdHlsZS5sZWZ0ICAgICA9ICcwJztcblx0XHRcdHRvYXN0T3ZlcmxheU5vZGUuc3R5bGUuekluZGV4ICAgPSAnOTk5OTk5OTk5Jztcblx0XHRcdGJvZHlOb2RlLmFwcGVuZENoaWxkKHRvYXN0T3ZlcmxheU5vZGUpO1xuXHRcdFx0cmV0dXJuIHRvYXN0T3ZlcmxheU5vZGU7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRvYXN0T3ZlcmxheU5vZGU7XG5cblx0fVxuXG5cdHByaXZhdGUgc2V0VG9hc3RXcmFwcGVyTm9kZShfUG9zaXRpb246IFRvYXN0UG9zaXRpb25FbnVtLCBfVG9hc3RPdmVybGF5Tm9kZTogSFRNTEVsZW1lbnQpIHtcblxuXHRcdGxldCB0b2FzdFdyYXBwZXJOb2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHRvYXN0LXdyYXBwZXItJHtfUG9zaXRpb259YCkgYXMgSFRNTFN0eWxlRWxlbWVudDtcblx0XHRpZiAoIXRvYXN0V3JhcHBlck5vZGUpIHtcblx0XHRcdGNvbnN0IHRvYXN0V3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdFx0dG9hc3RXcmFwcGVyLnNldEF0dHJpYnV0ZSgnaWQnLCAndG9hc3Qtd3JhcHBlci0nICsgX1Bvc2l0aW9uKTtcblx0XHRcdHRvYXN0V3JhcHBlci5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJykpO1xuXHRcdFx0X1RvYXN0T3ZlcmxheU5vZGUucHJlcGVuZCh0b2FzdFdyYXBwZXIpO1xuXG5cdFx0XHRjb25zdCBzcGxpdCA9IF9Qb3NpdGlvbi5zcGxpdCgnLScpO1xuXG5cdFx0XHRpZiAoc3BsaXRbMV0gPT09ICdyaWdodCcgfHwgc3BsaXRbMV0gPT09ICdsZWZ0Jykge1xuXHRcdFx0XHR0aGlzLmdDb25maWdTZXJ2aWNlLmdldFNoZWV0KCduZ3gtYXdlc29tZS1wb3B1cC1zdHlsZXMnKS5hZGRSdWxlKGAjdG9hc3Qtd3JhcHBlci0ke19Qb3NpdGlvbn1gLCBgJHtzcGxpdFswXX06IDIwcHg7ICR7c3BsaXRbMV19OiAyMHB4OyBwb3NpdGlvbjogZml4ZWQ7IHotaW5kZXg6IDk5OTk5OTtgKTtcblx0XHRcdH1cblx0XHRcdGlmIChzcGxpdFsxXSA9PT0gJ2NlbnRlcicpIHtcblx0XHRcdFx0dGhpcy5nQ29uZmlnU2VydmljZS5nZXRTaGVldCgnbmd4LWF3ZXNvbWUtcG9wdXAtc3R5bGVzJykuYWRkUnVsZShgI3RvYXN0LXdyYXBwZXItJHtfUG9zaXRpb259YCwgYCR7c3BsaXRbMF19OiAyMHB4OyB3aWR0aDogMTAwJTsgcG9zaXRpb246IGZpeGVkOyB6LWluZGV4OiA5OTk5OTk7IHBvaW50ZXItZXZlbnRzOiBub25lO2ApO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHNwbGl0WzFdID09PSAnZnVsbHdpZHRoJykge1xuXHRcdFx0XHR0aGlzLmdDb25maWdTZXJ2aWNlLmdldFNoZWV0KCduZ3gtYXdlc29tZS1wb3B1cC1zdHlsZXMnKS5hZGRSdWxlKGAjdG9hc3Qtd3JhcHBlci0ke19Qb3NpdGlvbn1gLCBgJHtzcGxpdFswXX06IDEwcHg7IHdpZHRoOiAxMDAlOyBwb3NpdGlvbjogZml4ZWQ7IHotaW5kZXg6IDk5OTk5OTsgcG9pbnRlci1ldmVudHM6IG5vbmU7YCk7XG5cdFx0XHR9XG5cblx0XHR9XG5cblxuXHR9XG59XG4iXX0=