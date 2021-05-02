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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3Qtbm90aWZpY2F0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9uZ3gtYXdlc29tZS1wb3B1cC90eXBlcy90b2FzdC1ub3RpZmljYXRpb24vY29yZS90b2FzdC1ub3RpZmljYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsY0FBYyxFQUFFLHdCQUF3QixFQUFpQyxVQUFVLEVBQUUsUUFBUSxFQUFPLE1BQU0sZUFBZSxDQUFDO0FBRWxJLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuQyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFDN0QsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFDeEUsT0FBTyxFQUFDLHVDQUF1QyxFQUFDLE1BQU0sa0ZBQWtGLENBQUM7QUFDekksT0FBTyxFQUFDLGlDQUFpQyxFQUFDLE1BQU0sb0VBQW9FLENBQUM7QUFDckgsT0FBTyxFQUFDLHNCQUFzQixFQUFpRCxxQkFBcUIsRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUNySCxPQUFPLEVBQUMsOEJBQThCLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQzs7OztBQUtuRixNQUFNLE9BQU8sd0JBQXdCO0lBT3BDLFlBQW9CLHdCQUFrRCxFQUFVLFFBQWtCLEVBQVUsTUFBc0IsRUFBVSxXQUEyQyxFQUFVLGNBQW1DO1FBQWhOLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBZ0M7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBcUI7UUFMcE8sb0ZBQW9GO1FBQ3BGLDBCQUFxQixHQUEyQixFQUFFLENBQUM7UUFDbkQsdUJBQWtCLEdBQTRELEVBQUUsQ0FBQztRQUNqRixr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Q0FBQztnQkFDekQsSUFBSSxJQUFJLENBQUMscUJBQXFCLENBQUMsVUFBVSxDQUFDLEVBQUU7b0JBQzNDLE1BQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsQ0FBQywwQkFBMEIsQ0FBQyxjQUFjLENBQUMsQ0FBQztvQkFDdkksV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUNyQix1SkFBdUo7b0JBQ3ZKLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDeEUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUNqRCxJQUFJLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDakQ7WUFDRixDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQ2hCO0lBQ0YsQ0FBQztJQUVELGVBQWUsQ0FBQyxlQUF1QjtRQUN0QyxPQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNwRCxPQUFPLGVBQWUsS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDLDBCQUEwQixDQUFDLGNBQWMsQ0FBQztRQUNwRixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7Ozs7WUE1TUQsVUFBVSxTQUFDO2dCQUNYLFVBQVUsRUFBRSxNQUFNO2FBQ2xCOzs7WUFadUIsd0JBQXdCO1lBQTZDLFFBQVE7WUFBN0YsY0FBYztZQVFkLDhCQUE4QjtZQUo5QixtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0FwcGxpY2F0aW9uUmVmLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIENvbXBvbmVudFJlZiwgRW1iZWRkZWRWaWV3UmVmLCBJbmplY3RhYmxlLCBJbmplY3RvciwgVHlwZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHttYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7RGlhbG9nSW5qZWN0b3J9IGZyb20gJy4uLy4uLy4uL2NvcmUvZGlhbG9nLWluamVjdG9yJztcbmltcG9ydCB7R2xvYmFsQ29uZmlnU2VydmljZX0gZnJvbSAnLi4vLi4vLi4vY29yZS9nbG9iYWwtY29uZmlnLnNlcnZpY2UnO1xuaW1wb3J0IHtUb2FzdE5vdGlmaWNhdGlvblNpbXBsZVdyYXBwZXJDb21wb25lbnR9IGZyb20gJy4uL3RvYXN0LW5vdGlmaWNhdGlvbi1zaW1wbGUtd3JhcHBlci90b2FzdC1ub3RpZmljYXRpb24tc2ltcGxlLXdyYXBwZXIuY29tcG9uZW50JztcbmltcG9ydCB7VG9hc3ROb3RpZmljYXRpb25XcmFwcGVyQ29tcG9uZW50fSBmcm9tICcuLi90b2FzdC1ub3RpZmljYXRpb24td3JhcHBlci90b2FzdC1ub3RpZmljYXRpb24td3JhcHBlci5jb21wb25lbnQnO1xuaW1wb3J0IHtUb2FzdE5vdGlmaWNhdGlvbkNsYXNzLCBUb2FzdE5vdGlmaWNhdGlvbkludGVyZmFjZSwgVG9hc3RQb3NpdGlvbkVudW0sIFRvYXN0VXNlclZpZXdUeXBlRW51bX0gZnJvbSAnLi9tb2RlbCc7XG5pbXBvcnQge1RvYXN0Tm90aWZpY2F0aW9uQ29uZmlnU2VydmljZX0gZnJvbSAnLi90b2FzdC1ub3RpZmljYXRpb24tY29uZmlnLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7XG5cdHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBUb2FzdE5vdGlmaWNhdGlvblNlcnZpY2Uge1xuXG5cdC8vIHRvYXN0Q29tcG9uZW50UmVmTGlzdDogQ29tcG9uZW50UmVmPFRvYXN0Tm90aWZpY2F0aW9uV3JhcHBlckNvbXBvbmVudD5bXSAgICA9IFtdO1xuXHR0b2FzdENvbXBvbmVudFJlZkxpc3Q6IENvbXBvbmVudFJlZjxhbnk+W10gICAgPSBbXTtcblx0YnVmZmVyVG9hc3RSYXdMaXN0OiBUb2FzdE5vdGlmaWNhdGlvbkludGVyZmFjZS5JVG9hc3ROb3RpZmljYXRpb25SYXdTdGF0ZVtdID0gW107XG5cdGJ1ZmZlckNoZWNraW5nSW50ZXJ2YWxJc1JlYWR5OiBib29sZWFuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IHRydWU7XG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsIHByaXZhdGUgYXBwUmVmOiBBcHBsaWNhdGlvblJlZiwgcHJpdmF0ZSB0b2FzdENvbmZpZzogVG9hc3ROb3RpZmljYXRpb25Db25maWdTZXJ2aWNlLCBwcml2YXRlIGdDb25maWdTZXJ2aWNlOiBHbG9iYWxDb25maWdTZXJ2aWNlKSB7XG5cdH1cblxuXHRvcGVuVG9hc3QkKF9Ub2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZzogVG9hc3ROb3RpZmljYXRpb25DbGFzcy5Ub2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZyk6IE9ic2VydmFibGU8VG9hc3ROb3RpZmljYXRpb25JbnRlcmZhY2UuSVByaXZhdGVSZXNwb25zZU1lcmdlZD4ge1xuXHRcdGxldCBldmVudENvbnRyb2xsZXIgPSBfVG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuRXZlbnRzQ29udHJvbGxlcjtcblx0XHQvLyBjb25zb2xlLmxvZyhgJWMgJHtfVG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuRW50aXR5VW5pcXVlSUR9IGAsIGBiYWNrZ3JvdW5kOiAjMzM5OTMzOyBjb2xvcjogI2ZmZmApO1xuXG5cdFx0Y29uc3QgdG9hc3RSYXdJbnN0YW5jZSA9IHRoaXMucHJlcGFyZVJhd1RvYXN0KGV2ZW50Q29udHJvbGxlciwgX1RvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nKTtcblx0XHR0aGlzLmxpc3RlbmVycyhldmVudENvbnRyb2xsZXIpO1xuXHRcdHRoaXMuaW50ZXJuYWxSb3V0aW5nKHRvYXN0UmF3SW5zdGFuY2UpO1xuXHRcdHJldHVybiBldmVudENvbnRyb2xsZXIuYWZ0ZXJDbG9zZWQkO1xuXHR9XG5cblx0aW50ZXJuYWxSb3V0aW5nKF9Ub2FzdFJhd0luc3RhbmNlOiBUb2FzdE5vdGlmaWNhdGlvbkludGVyZmFjZS5JVG9hc3ROb3RpZmljYXRpb25SYXdTdGF0ZSk6IGJvb2xlYW4ge1xuXHRcdGlmICh0aGlzLmlzUmVmTGlzdEF2YWlsYWJsZSgpKSB7XG5cdFx0XHR0aGlzLnNlbmRUb1Byb2R1Y3Rpb24oX1RvYXN0UmF3SW5zdGFuY2UpO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuc2VuZFRvQnVmZmVyKF9Ub2FzdFJhd0luc3RhbmNlKTtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdH1cblxuXHRzZW5kVG9CdWZmZXIoX1RvYXN0UmF3SW5zdGFuY2U6IFRvYXN0Tm90aWZpY2F0aW9uSW50ZXJmYWNlLklUb2FzdE5vdGlmaWNhdGlvblJhd1N0YXRlKSB7XG5cdFx0dGhpcy5idWZmZXJUb2FzdFJhd0xpc3QucHVzaChfVG9hc3RSYXdJbnN0YW5jZSk7XG5cdH1cblxuXHRzZW5kVG9Qcm9kdWN0aW9uKF9Ub2FzdFJhd0luc3RhbmNlOiBUb2FzdE5vdGlmaWNhdGlvbkludGVyZmFjZS5JVG9hc3ROb3RpZmljYXRpb25SYXdTdGF0ZSk6IHZvaWQge1xuXHRcdGNvbnN0IGNvbXBvbmVudFJlZiA9IHRoaXMuZ2V0Q29tcG9uZW50UmVmKF9Ub2FzdFJhd0luc3RhbmNlKTtcblx0XHRpZiAoY29tcG9uZW50UmVmKSB7XG5cdFx0XHR0aGlzLnRvYXN0Q29tcG9uZW50UmVmTGlzdC5wdXNoKGNvbXBvbmVudFJlZik7XG5cdFx0XHRjb21wb25lbnRSZWYuaW5zdGFuY2UudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcgPSBfVG9hc3RSYXdJbnN0YW5jZS5Ub2FzdEJlbG9uZ2luZztcblx0XHRcdHRoaXMuYXBwZW5kVG9Cb2R5UGFyZW50Q29tcG9uZW50KGNvbXBvbmVudFJlZik7XG5cblx0XHR9XG5cdH1cblxuXHRpc1JlZkxpc3RBdmFpbGFibGUoKTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuIHRoaXMudG9hc3RDb21wb25lbnRSZWZMaXN0Lmxlbmd0aCA8IHRoaXMudG9hc3RDb25maWcucHJvZHVjdGlvbkNvbmZpZy5HbG9iYWxTZXR0aW5ncy5BbGxvd2VkTm90aWZpY2F0aW9uc0F0T25jZTtcblx0fVxuXG5cdHByZXBhcmVSYXdUb2FzdChfRXZlbnRzQ29udHJvbGxlcjogVG9hc3ROb3RpZmljYXRpb25DbGFzcy5Ub2FzdE5vdGlmaWNhdGlvbkV2ZW50c0NvbnRyb2xsZXIsIF9Ub2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZzogVG9hc3ROb3RpZmljYXRpb25DbGFzcy5Ub2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZyk6IFRvYXN0Tm90aWZpY2F0aW9uSW50ZXJmYWNlLklUb2FzdE5vdGlmaWNhdGlvblJhd1N0YXRlIHtcblxuXHRcdGNvbnN0IHdlYWtNYXAgPSBuZXcgV2Vha01hcCgpO1xuXHRcdHdlYWtNYXAuc2V0KFRvYXN0Tm90aWZpY2F0aW9uQ2xhc3MuVG9hc3ROb3RpZmljYXRpb25FdmVudHNDb250cm9sbGVyLCBfRXZlbnRzQ29udHJvbGxlcik7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0V2Vha01hcCAgICAgICA6IHdlYWtNYXAsXG5cdFx0XHRUb2FzdEJlbG9uZ2luZzogX1RvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nXG5cdFx0fTtcblx0fVxuXG5cdGdldENvbXBvbmVudFJlZihfVG9hc3ROb3RpZmljYXRpb25SYXdTdGF0ZTogVG9hc3ROb3RpZmljYXRpb25JbnRlcmZhY2UuSVRvYXN0Tm90aWZpY2F0aW9uUmF3U3RhdGUpOiBDb21wb25lbnRSZWY8YW55PiB8IG51bGwge1xuXG5cdFx0Y29uc3QgZGlhbG9nSW5kZXggPSB0aGlzLmZpbmREaWFsb2dJbmRleChfVG9hc3ROb3RpZmljYXRpb25SYXdTdGF0ZS5Ub2FzdEJlbG9uZ2luZy5FbnRpdHlVbmlxdWVJRCk7XG5cdFx0aWYgKGRpYWxvZ0luZGV4ID09PSAtMSkge1xuXG5cdFx0XHRsZXQgdG9hc3RVc2VyVmlld0NvbXBvbmVudDogVHlwZTxhbnk+ID0gVG9hc3ROb3RpZmljYXRpb25XcmFwcGVyQ29tcG9uZW50O1xuXHRcdFx0aWYoX1RvYXN0Tm90aWZpY2F0aW9uUmF3U3RhdGUuVG9hc3RCZWxvbmdpbmcuVG9hc3RDb3JlQ29uZmlnLlRvYXN0VXNlclZpZXdUeXBlID09PSBUb2FzdFVzZXJWaWV3VHlwZUVudW0uU0lNUExFKXtcblx0XHRcdFx0dG9hc3RVc2VyVmlld0NvbXBvbmVudCA9IFRvYXN0Tm90aWZpY2F0aW9uU2ltcGxlV3JhcHBlckNvbXBvbmVudDtcblx0XHRcdH1cblx0XHRcdGNvbnN0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeSh0b2FzdFVzZXJWaWV3Q29tcG9uZW50KTtcblx0XHRcdHJldHVybiBjb21wb25lbnRGYWN0b3J5LmNyZWF0ZShuZXcgRGlhbG9nSW5qZWN0b3IodGhpcy5pbmplY3RvciwgX1RvYXN0Tm90aWZpY2F0aW9uUmF3U3RhdGUuV2Vha01hcCkpO1xuXHRcdH1cblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdGxpc3RlbmVycyhfRXZlbnRzQ29udHJvbGxlcjogVG9hc3ROb3RpZmljYXRpb25DbGFzcy5Ub2FzdE5vdGlmaWNhdGlvbkV2ZW50c0NvbnRyb2xsZXIpIHtcblxuXHRcdC8vIExpc3RlbmVyIGZvciBjbG9zaW5nIGRpYWxvZ1xuXHRcdGNvbnN0IGNsb3NlRGlhbG9nU3Vic2NyaXB0aW9uID0gX0V2ZW50c0NvbnRyb2xsZXIuYWZ0ZXJDbG9zZWQkLnN1YnNjcmliZSgocmVzcG9uc2UpID0+IHtcblxuXHRcdFx0Ly8gdGhpcy5yZW1vdmVGcm9tQm9keVBhcmVudENvbXBvbmVudChtb2RhbEluZGV4KTtcblx0XHRcdHRoaXMucmVtb3ZlRnJvbUJvZHkocmVzcG9uc2UudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuRW50aXR5VW5pcXVlSUQpO1xuXHRcdFx0Y2xvc2VEaWFsb2dTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcblx0XHR9KTtcblx0fVxuXG5cdGFwcGVuZFRvQm9keVBhcmVudENvbXBvbmVudChfQ29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8YW55Pik6IHZvaWQge1xuXHRcdC8vIGF0dGFjaCB2aWV3IHRvIGlnbml0ZSBsaWZlY3ljbGUgaG9va3Ncblx0XHR0aGlzLmFwcFJlZi5hdHRhY2hWaWV3KF9Db21wb25lbnRSZWYuaG9zdFZpZXcpO1xuXG5cblx0XHRjb25zdCB0b2FzdFBvc2l0aW9uOiBUb2FzdFBvc2l0aW9uRW51bSA9IF9Db21wb25lbnRSZWYuaW5zdGFuY2UudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuVG9hc3RDb3JlQ29uZmlnLlRvYXN0UG9zaXRpb247XG5cdFx0Y29uc3Qgb3BlbkluRWxlbWVudElEID0gX0NvbXBvbmVudFJlZi5pbnN0YW5jZS50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5Ub2FzdENvcmVDb25maWcuT3BlbkluRWxlbWVudElEO1xuXHRcdGxldCB0YXJnZXROb2RlOiBIVE1MRWxlbWVudDtcblx0XHRpZighb3BlbkluRWxlbWVudElEKXtcblx0XHRcdHRoaXMuc2V0VG9hc3RXcmFwcGVyTm9kZShfQ29tcG9uZW50UmVmLmluc3RhbmNlLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLlRvYXN0Q29yZUNvbmZpZy5Ub2FzdFBvc2l0aW9uLCB0aGlzLnNldFRvYXN0T3ZlcmxheU5vZGUoKSk7XG5cdFx0XHR0YXJnZXROb2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHRvYXN0LXdyYXBwZXItJHt0b2FzdFBvc2l0aW9ufWApO1xuXHRcdH1lbHNle1xuXHRcdFx0dGFyZ2V0Tm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG9wZW5JbkVsZW1lbnRJRCk7XG5cdFx0fVxuXG5cblx0XHRjb25zdCBkb21FbGVtID0gKF9Db21wb25lbnRSZWYuaG9zdFZpZXcgYXMgRW1iZWRkZWRWaWV3UmVmPGFueT4pLnJvb3ROb2Rlc1swXSBhcyBIVE1MRWxlbWVudDtcblxuXHRcdGNvbnN0IHRvYXN0RW50aXR5ICAgICAgICAgICAgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0dG9hc3RFbnRpdHkuc2V0QXR0cmlidXRlKCdpZCcsIF9Db21wb25lbnRSZWYuaW5zdGFuY2UudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuRW50aXR5VW5pcXVlSUQpO1xuXHRcdHRvYXN0RW50aXR5LmNsYXNzTmFtZSA9ICd0b2FzdC1lbnRpdHknO1xuXHRcdGNvbnN0IHNwbGl0ID0gIHRvYXN0UG9zaXRpb24uc3BsaXQoJy0nKTtcblx0XHRpZihzcGxpdFsxXSA9PT0gJ2Z1bGx3aWR0aCcpe1xuXHRcdFx0dG9hc3RFbnRpdHkuc3R5bGUud2lkdGggPSAnOTd2dyc7XG5cdFx0fWVsc2UgaWYob3BlbkluRWxlbWVudElEKXtcblx0XHRcdHRvYXN0RW50aXR5LnN0eWxlLndpZHRoID0gJzEwMCUnO1xuXHRcdH1lbHNle1xuXHRcdFx0dG9hc3RFbnRpdHkuc3R5bGUud2lkdGggPSAnMzAwcHgnO1xuXHRcdH1cblx0XHR0b2FzdEVudGl0eS5zdHlsZS5tYXJnaW4gPSAnYXV0byc7XG5cdFx0dG9hc3RFbnRpdHkucHJlcGVuZChkb21FbGVtKTtcblx0XHQvLyB0YXJnZXROb2RlLnByZXBlbmQodG9hc3RFbnRpdHkpO1xuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0dGFyZ2V0Tm9kZS5wcmVwZW5kKHRvYXN0RW50aXR5KTtcblx0XHR9LCAyMDApO1xuXG5cdH1cblxuXHRwcml2YXRlIHNldFRvYXN0T3ZlcmxheU5vZGUoKTogSFRNTEVsZW1lbnQge1xuXHRcdGNvbnN0IGJvZHlOb2RlID0gZG9jdW1lbnQuYm9keSB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdO1xuXHRcdGlmICghYm9keU5vZGUpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0Ly8gY2hlY2sgdGhlIG92ZXJsYXlcblx0XHRsZXQgdG9hc3RPdmVybGF5Tm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2FzdC1vdmVybGF5LWNvbnRhaW5lcicpIGFzIEhUTUxTdHlsZUVsZW1lbnQ7XG5cblx0XHRpZighdG9hc3RPdmVybGF5Tm9kZSl7XG5cdFx0XHRsZXQgdG9hc3RPdmVybGF5Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdFx0dG9hc3RPdmVybGF5Tm9kZS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3RvYXN0LW92ZXJsYXktY29udGFpbmVyJyk7XG5cdFx0XHR0b2FzdE92ZXJsYXlOb2RlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKSk7XG5cdFx0XHR0b2FzdE92ZXJsYXlOb2RlLnN0eWxlLnBvc2l0aW9uID0gJ2ZpeGVkJztcblx0XHRcdHRvYXN0T3ZlcmxheU5vZGUuc3R5bGUudG9wID0gJzAnO1xuXHRcdFx0dG9hc3RPdmVybGF5Tm9kZS5zdHlsZS5sZWZ0ID0gJzAnO1xuXHRcdFx0Ym9keU5vZGUuYXBwZW5kQ2hpbGQodG9hc3RPdmVybGF5Tm9kZSk7XG5cdFx0XHRyZXR1cm4gdG9hc3RPdmVybGF5Tm9kZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdG9hc3RPdmVybGF5Tm9kZTtcblxuXHR9XG5cdHByaXZhdGUgc2V0VG9hc3RXcmFwcGVyTm9kZShfUG9zaXRpb246IFRvYXN0UG9zaXRpb25FbnVtLCBfVG9hc3RPdmVybGF5Tm9kZTogSFRNTEVsZW1lbnQgKSB7XG5cblx0XHQgICBsZXQgdG9hc3RXcmFwcGVyTm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGB0b2FzdC13cmFwcGVyLSR7X1Bvc2l0aW9ufWApIGFzIEhUTUxTdHlsZUVsZW1lbnQ7XG5cdFx0ICAgaWYoIXRvYXN0V3JhcHBlck5vZGUpe1xuXHRcdFx0ICAgY29uc3QgdG9hc3RXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0XHQgICB0b2FzdFdyYXBwZXIuc2V0QXR0cmlidXRlKCdpZCcsICd0b2FzdC13cmFwcGVyLScgKyBfUG9zaXRpb24pO1xuXHRcdFx0ICAgdG9hc3RXcmFwcGVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKSk7XG5cdFx0XHQgICBfVG9hc3RPdmVybGF5Tm9kZS5wcmVwZW5kKHRvYXN0V3JhcHBlcik7XG5cblx0XHRcdCAgIGNvbnN0IHNwbGl0ID0gIF9Qb3NpdGlvbi5zcGxpdCgnLScpO1xuXG5cdFx0XHQgICBpZihzcGxpdFsxXSA9PT0gJ3JpZ2h0JyB8fCBzcGxpdFsxXSA9PT0gJ2xlZnQnKXtcblx0XHRcdFx0ICAgdGhpcy5nQ29uZmlnU2VydmljZS5nZXRTaGVldCgnbmd4LWF3ZXNvbWUtcG9wdXAtc3R5bGVzJykuYWRkUnVsZShgI3RvYXN0LXdyYXBwZXItJHtfUG9zaXRpb259YCwgYCR7c3BsaXRbMF19OiAyMHB4OyAke3NwbGl0WzFdfTogMjBweDsgcG9zaXRpb246IGZpeGVkOyB6LWluZGV4OiA5OTk5OTk7YCk7XG5cdFx0XHQgICB9XG5cdFx0XHQgICBpZihzcGxpdFsxXSA9PT0gJ2NlbnRlcicpe1xuXHRcdFx0XHQgICB0aGlzLmdDb25maWdTZXJ2aWNlLmdldFNoZWV0KCduZ3gtYXdlc29tZS1wb3B1cC1zdHlsZXMnKS5hZGRSdWxlKGAjdG9hc3Qtd3JhcHBlci0ke19Qb3NpdGlvbn1gLCBgJHtzcGxpdFswXX06IDIwcHg7IHdpZHRoOiAxMDAlOyBwb3NpdGlvbjogZml4ZWQ7IHotaW5kZXg6IDk5OTk5OTsgcG9pbnRlci1ldmVudHM6IG5vbmU7YCk7XG5cdFx0XHQgICB9XG5cdFx0XHQgICBpZihzcGxpdFsxXSA9PT0gJ2Z1bGx3aWR0aCcpe1xuXHRcdFx0XHQgICB0aGlzLmdDb25maWdTZXJ2aWNlLmdldFNoZWV0KCduZ3gtYXdlc29tZS1wb3B1cC1zdHlsZXMnKS5hZGRSdWxlKGAjdG9hc3Qtd3JhcHBlci0ke19Qb3NpdGlvbn1gLCBgJHtzcGxpdFswXX06IDEwcHg7IHdpZHRoOiAxMDAlOyBwb3NpdGlvbjogZml4ZWQ7IHotaW5kZXg6IDk5OTk5OTsgcG9pbnRlci1ldmVudHM6IG5vbmU7YCk7XG5cdFx0XHQgICB9XG5cblx0XHQgICB9XG5cblxuXG5cdH1cblxuXHRyZW1vdmVGcm9tQm9keShfRW50aXR5VW5pcXVlSUQ6IHN0cmluZyk6IHZvaWQge1xuXG5cdFx0Y29uc3QgbW9kYWxJbmRleCA9IHRoaXMuZmluZERpYWxvZ0luZGV4KF9FbnRpdHlVbmlxdWVJRCk7XG5cdFx0aWYgKG1vZGFsSW5kZXggPiAtMSkge1xuXG5cdFx0XHRpZiAodGhpcy5idWZmZXJUb2FzdFJhd0xpc3QubGVuZ3RoKSB7XG5cdFx0XHRcdHRoaXMuc2VuZFRvUHJvZHVjdGlvbih0aGlzLmJ1ZmZlclRvYXN0UmF3TGlzdFswXSk7XG5cdFx0XHRcdHRoaXMuYnVmZmVyVG9hc3RSYXdMaXN0LnNwbGljZSgwLCAxKTtcblxuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLnRvYXN0Q29tcG9uZW50UmVmTGlzdFttb2RhbEluZGV4XS5pbnN0YW5jZS5jbG9zZVBhcmVudCQoJ2Nsb3NlLWZhc3QnKS5waXBlKG1hcChpdGVtID0+IHtcblx0XHRcdFx0Y29uc3QgbW9kYWxJbmRleCA9IHRoaXMuZmluZERpYWxvZ0luZGV4KF9FbnRpdHlVbmlxdWVJRCk7XG5cdFx0XHRcdGlmICh0aGlzLnRvYXN0Q29tcG9uZW50UmVmTGlzdFttb2RhbEluZGV4XSkge1xuXHRcdFx0XHRcdGNvbnN0IHRvYXN0RW50aXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy50b2FzdENvbXBvbmVudFJlZkxpc3RbbW9kYWxJbmRleF0uaW5zdGFuY2UudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuRW50aXR5VW5pcXVlSUQpO1xuXHRcdFx0XHRcdHRvYXN0RW50aXR5LnJlbW92ZSgpO1xuXHRcdFx0XHRcdC8vIGNvbnNvbGUubG9nKGAlYyAke3RoaXMudG9hc3RDb21wb25lbnRSZWZMaXN0W21vZGFsSW5kZXhdLmluc3RhbmNlLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLkVudGl0eVVuaXF1ZUlEfSBgLCBgYmFja2dyb3VuZDogI2NjMzMzMzsgY29sb3I6ICNmZmZgKTtcblx0XHRcdFx0XHR0aGlzLmFwcFJlZi5kZXRhY2hWaWV3KHRoaXMudG9hc3RDb21wb25lbnRSZWZMaXN0W21vZGFsSW5kZXhdLmhvc3RWaWV3KTtcblx0XHRcdFx0XHR0aGlzLnRvYXN0Q29tcG9uZW50UmVmTGlzdFttb2RhbEluZGV4XS5kZXN0cm95KCk7XG5cdFx0XHRcdFx0dGhpcy50b2FzdENvbXBvbmVudFJlZkxpc3Quc3BsaWNlKG1vZGFsSW5kZXgsIDEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KSkuc3Vic2NyaWJlKCk7XG5cdFx0fVxuXHR9XG5cblx0ZmluZERpYWxvZ0luZGV4KF9EaWFsb2dVbmlxdWVJRDogc3RyaW5nKTogbnVtYmVyIHtcblx0XHRyZXR1cm4gdGhpcy50b2FzdENvbXBvbmVudFJlZkxpc3QuZmluZEluZGV4KChpdGVtKSA9PiB7XG5cdFx0XHRyZXR1cm4gX0RpYWxvZ1VuaXF1ZUlEID09PSBpdGVtLmluc3RhbmNlLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLkVudGl0eVVuaXF1ZUlEO1xuXHRcdH0pO1xuXHR9XG59XG4iXX0=