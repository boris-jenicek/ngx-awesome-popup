import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector, } from "@angular/core";
import { map } from "rxjs/operators";
import { DialogInjector } from "../../../core/dialog-injector";
import { GlobalConfigService } from "../../../core/global-config.service";
import { ToastNotificationSimpleWrapperComponent } from "../toast-notification-simple-wrapper/toast-notification-simple-wrapper.component";
import { ToastNotificationWrapperComponent } from "../toast-notification-wrapper/toast-notification-wrapper.component";
import { ToastNotificationClass, ToastUserViewTypeEnum, } from "./model";
import { ToastNotificationConfigService } from "./toast-notification-config.service";
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
        weakMap.set(ToastNotificationClass.ToastNotificationEventsController, _EventsController);
        return {
            WeakMap: weakMap,
            ToastBelonging: _ToastNotificationBelonging,
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
        const closeDialogSubscription = _EventsController.afterClosed$.subscribe((response) => {
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
        const toastEntity = document.createElement("div");
        toastEntity.setAttribute("id", _ComponentRef.instance.toastNotificationBelonging.EntityUniqueID);
        toastEntity.className = "toast-entity";
        const split = toastPosition.split("-");
        if (split[1] === "fullwidth") {
            toastEntity.style.width = "93vw";
        }
        else if (openInElementID) {
            toastEntity.style.width = "100%";
        }
        else {
            toastEntity.style.width = "300px";
        }
        toastEntity.style.margin = "auto";
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
                .closeParent$("close-fast")
                .pipe(map((item) => {
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
        return this.toastComponentRefList.findIndex((item) => {
            return (_DialogUniqueID ===
                item.instance.toastNotificationBelonging.EntityUniqueID);
        });
    }
    setToastOverlayNode() {
        const bodyNode = document.body || document.getElementsByTagName("body")[0];
        if (!bodyNode) {
            return;
        }
        // check the overlay
        let toastOverlayNode = document.getElementById("toast-overlay-container");
        if (!toastOverlayNode) {
            let toastOverlayNode = document.createElement("div");
            toastOverlayNode.setAttribute("id", "toast-overlay-container");
            toastOverlayNode.appendChild(document.createTextNode(""));
            toastOverlayNode.style.position = "fixed";
            toastOverlayNode.style.top = "0";
            toastOverlayNode.style.left = "0";
            toastOverlayNode.style.zIndex = "999999999";
            bodyNode.appendChild(toastOverlayNode);
            return toastOverlayNode;
        }
        return toastOverlayNode;
    }
    setToastWrapperNode(_Position, _ToastOverlayNode) {
        let toastWrapperNode = document.getElementById(`toast-wrapper-${_Position}`);
        if (!toastWrapperNode) {
            const toastWrapper = document.createElement("div");
            toastWrapper.setAttribute("id", "toast-wrapper-" + _Position);
            toastWrapper.appendChild(document.createTextNode(""));
            _ToastOverlayNode.prepend(toastWrapper);
            const split = _Position.split("-");
            if (split[1] === "right" || split[1] === "left") {
                this.gConfigService
                    .getSheet("ngx-awesome-popup-styles")
                    .addRule(`#toast-wrapper-${_Position}`, `${split[0]}: 20px; ${split[1]}: 20px; position: fixed; z-index: 999999;`);
            }
            if (split[1] === "center") {
                this.gConfigService
                    .getSheet("ngx-awesome-popup-styles")
                    .addRule(`#toast-wrapper-${_Position}`, `${split[0]}: 20px; width: 100%; position: fixed; z-index: 999999; pointer-events: none;`);
            }
            if (split[1] === "fullwidth") {
                this.gConfigService
                    .getSheet("ngx-awesome-popup-styles")
                    .addRule(`#toast-wrapper-${_Position}`, `${split[0]}: 10px; width: 100%; position: fixed; z-index: 999999; pointer-events: none;`);
            }
        }
    }
}
ToastNotificationService.ɵprov = i0.ɵɵdefineInjectable({ factory: function ToastNotificationService_Factory() { return new ToastNotificationService(i0.ɵɵinject(i0.ComponentFactoryResolver), i0.ɵɵinject(i0.INJECTOR), i0.ɵɵinject(i0.ApplicationRef), i0.ɵɵinject(i1.ToastNotificationConfigService), i0.ɵɵinject(i2.GlobalConfigService)); }, token: ToastNotificationService, providedIn: "root" });
ToastNotificationService.decorators = [
    { type: Injectable, args: [{
                providedIn: "root",
            },] }
];
ToastNotificationService.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: Injector },
    { type: ApplicationRef },
    { type: ToastNotificationConfigService },
    { type: GlobalConfigService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3Qtbm90aWZpY2F0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9uZ3gtYXdlc29tZS1wb3B1cC90eXBlcy90b2FzdC1ub3RpZmljYXRpb24vY29yZS90b2FzdC1ub3RpZmljYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsY0FBYyxFQUNkLHdCQUF3QixFQUd4QixVQUFVLEVBQ1YsUUFBUSxHQUVULE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDL0QsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDMUUsT0FBTyxFQUFFLHVDQUF1QyxFQUFFLE1BQU0sa0ZBQWtGLENBQUM7QUFDM0ksT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0sb0VBQW9FLENBQUM7QUFDdkgsT0FBTyxFQUNMLHNCQUFzQixFQUd0QixxQkFBcUIsR0FDdEIsTUFBTSxTQUFTLENBQUM7QUFDakIsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0scUNBQXFDLENBQUM7Ozs7QUFLckYsTUFBTSxPQUFPLHdCQUF3QjtJQU1uQyxZQUNVLHdCQUFrRCxFQUNsRCxRQUFrQixFQUNsQixNQUFzQixFQUN0QixXQUEyQyxFQUMzQyxjQUFtQztRQUpuQyw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO1FBQ2xELGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFDdEIsZ0JBQVcsR0FBWCxXQUFXLENBQWdDO1FBQzNDLG1CQUFjLEdBQWQsY0FBYyxDQUFxQjtRQVY3QyxvRkFBb0Y7UUFDcEYsMEJBQXFCLEdBQXdCLEVBQUUsQ0FBQztRQUNoRCx1QkFBa0IsR0FBNEQsRUFBRSxDQUFD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QUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFwcGxpY2F0aW9uUmVmLFxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIENvbXBvbmVudFJlZixcbiAgRW1iZWRkZWRWaWV3UmVmLFxuICBJbmplY3RhYmxlLFxuICBJbmplY3RvcixcbiAgVHlwZSxcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBEaWFsb2dJbmplY3RvciB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2RpYWxvZy1pbmplY3RvclwiO1xuaW1wb3J0IHsgR2xvYmFsQ29uZmlnU2VydmljZSB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2dsb2JhbC1jb25maWcuc2VydmljZVwiO1xuaW1wb3J0IHsgVG9hc3ROb3RpZmljYXRpb25TaW1wbGVXcmFwcGVyQ29tcG9uZW50IH0gZnJvbSBcIi4uL3RvYXN0LW5vdGlmaWNhdGlvbi1zaW1wbGUtd3JhcHBlci90b2FzdC1ub3RpZmljYXRpb24tc2ltcGxlLXdyYXBwZXIuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBUb2FzdE5vdGlmaWNhdGlvbldyYXBwZXJDb21wb25lbnQgfSBmcm9tIFwiLi4vdG9hc3Qtbm90aWZpY2F0aW9uLXdyYXBwZXIvdG9hc3Qtbm90aWZpY2F0aW9uLXdyYXBwZXIuY29tcG9uZW50XCI7XG5pbXBvcnQge1xuICBUb2FzdE5vdGlmaWNhdGlvbkNsYXNzLFxuICBUb2FzdE5vdGlmaWNhdGlvbkludGVyZmFjZSxcbiAgVG9hc3RQb3NpdGlvbkVudW0sXG4gIFRvYXN0VXNlclZpZXdUeXBlRW51bSxcbn0gZnJvbSBcIi4vbW9kZWxcIjtcbmltcG9ydCB7IFRvYXN0Tm90aWZpY2F0aW9uQ29uZmlnU2VydmljZSB9IGZyb20gXCIuL3RvYXN0LW5vdGlmaWNhdGlvbi1jb25maWcuc2VydmljZVwiO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46IFwicm9vdFwiLFxufSlcbmV4cG9ydCBjbGFzcyBUb2FzdE5vdGlmaWNhdGlvblNlcnZpY2Uge1xuICAvLyB0b2FzdENvbXBvbmVudFJlZkxpc3Q6IENvbXBvbmVudFJlZjxUb2FzdE5vdGlmaWNhdGlvbldyYXBwZXJDb21wb25lbnQ+W10gICAgPSBbXTtcbiAgdG9hc3RDb21wb25lbnRSZWZMaXN0OiBDb21wb25lbnRSZWY8YW55PltdID0gW107XG4gIGJ1ZmZlclRvYXN0UmF3TGlzdDogVG9hc3ROb3RpZmljYXRpb25JbnRlcmZhY2UuSVRvYXN0Tm90aWZpY2F0aW9uUmF3U3RhdGVbXSA9IFtdO1xuICBidWZmZXJDaGVja2luZ0ludGVydmFsSXNSZWFkeTogYm9vbGVhbiA9IHRydWU7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgICBwcml2YXRlIGFwcFJlZjogQXBwbGljYXRpb25SZWYsXG4gICAgcHJpdmF0ZSB0b2FzdENvbmZpZzogVG9hc3ROb3RpZmljYXRpb25Db25maWdTZXJ2aWNlLFxuICAgIHByaXZhdGUgZ0NvbmZpZ1NlcnZpY2U6IEdsb2JhbENvbmZpZ1NlcnZpY2VcbiAgKSB7fVxuXG4gIG9wZW5Ub2FzdCQoXG4gICAgX1RvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nOiBUb2FzdE5vdGlmaWNhdGlvbkNsYXNzLlRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nXG4gICk6IE9ic2VydmFibGU8VG9hc3ROb3RpZmljYXRpb25JbnRlcmZhY2UuSVByaXZhdGVSZXNwb25zZU1lcmdlZD4ge1xuICAgIGxldCBldmVudENvbnRyb2xsZXIgPSBfVG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuRXZlbnRzQ29udHJvbGxlcjtcbiAgICAvLyBjb25zb2xlLmxvZyhgJWMgJHtfVG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuRW50aXR5VW5pcXVlSUR9IGAsIGBiYWNrZ3JvdW5kOiAjMzM5OTMzOyBjb2xvcjogI2ZmZmApO1xuXG4gICAgY29uc3QgdG9hc3RSYXdJbnN0YW5jZSA9IHRoaXMucHJlcGFyZVJhd1RvYXN0KFxuICAgICAgZXZlbnRDb250cm9sbGVyLFxuICAgICAgX1RvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nXG4gICAgKTtcbiAgICB0aGlzLmxpc3RlbmVycyhldmVudENvbnRyb2xsZXIpO1xuICAgIHRoaXMuaW50ZXJuYWxSb3V0aW5nKHRvYXN0UmF3SW5zdGFuY2UpO1xuICAgIHJldHVybiBldmVudENvbnRyb2xsZXIuYWZ0ZXJDbG9zZWQkO1xuICB9XG5cbiAgaW50ZXJuYWxSb3V0aW5nKFxuICAgIF9Ub2FzdFJhd0luc3RhbmNlOiBUb2FzdE5vdGlmaWNhdGlvbkludGVyZmFjZS5JVG9hc3ROb3RpZmljYXRpb25SYXdTdGF0ZVxuICApOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5pc1JlZkxpc3RBdmFpbGFibGUoKSkge1xuICAgICAgdGhpcy5zZW5kVG9Qcm9kdWN0aW9uKF9Ub2FzdFJhd0luc3RhbmNlKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlbmRUb0J1ZmZlcihfVG9hc3RSYXdJbnN0YW5jZSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgc2VuZFRvQnVmZmVyKFxuICAgIF9Ub2FzdFJhd0luc3RhbmNlOiBUb2FzdE5vdGlmaWNhdGlvbkludGVyZmFjZS5JVG9hc3ROb3RpZmljYXRpb25SYXdTdGF0ZVxuICApIHtcbiAgICB0aGlzLmJ1ZmZlclRvYXN0UmF3TGlzdC5wdXNoKF9Ub2FzdFJhd0luc3RhbmNlKTtcbiAgfVxuXG4gIHNlbmRUb1Byb2R1Y3Rpb24oXG4gICAgX1RvYXN0UmF3SW5zdGFuY2U6IFRvYXN0Tm90aWZpY2F0aW9uSW50ZXJmYWNlLklUb2FzdE5vdGlmaWNhdGlvblJhd1N0YXRlXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IHRoaXMuZ2V0Q29tcG9uZW50UmVmKF9Ub2FzdFJhd0luc3RhbmNlKTtcbiAgICBpZiAoY29tcG9uZW50UmVmKSB7XG4gICAgICB0aGlzLnRvYXN0Q29tcG9uZW50UmVmTGlzdC5wdXNoKGNvbXBvbmVudFJlZik7XG4gICAgICBjb21wb25lbnRSZWYuaW5zdGFuY2UudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcgPVxuICAgICAgICBfVG9hc3RSYXdJbnN0YW5jZS5Ub2FzdEJlbG9uZ2luZztcbiAgICAgIHRoaXMuYXBwZW5kVG9Cb2R5UGFyZW50Q29tcG9uZW50KGNvbXBvbmVudFJlZik7XG4gICAgfVxuICB9XG5cbiAgaXNSZWZMaXN0QXZhaWxhYmxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLnRvYXN0Q29tcG9uZW50UmVmTGlzdC5sZW5ndGggPFxuICAgICAgdGhpcy50b2FzdENvbmZpZy5wcm9kdWN0aW9uQ29uZmlnLkdsb2JhbFNldHRpbmdzXG4gICAgICAgIC5BbGxvd2VkTm90aWZpY2F0aW9uc0F0T25jZVxuICAgICk7XG4gIH1cblxuICBwcmVwYXJlUmF3VG9hc3QoXG4gICAgX0V2ZW50c0NvbnRyb2xsZXI6IFRvYXN0Tm90aWZpY2F0aW9uQ2xhc3MuVG9hc3ROb3RpZmljYXRpb25FdmVudHNDb250cm9sbGVyLFxuICAgIF9Ub2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZzogVG9hc3ROb3RpZmljYXRpb25DbGFzcy5Ub2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZ1xuICApOiBUb2FzdE5vdGlmaWNhdGlvbkludGVyZmFjZS5JVG9hc3ROb3RpZmljYXRpb25SYXdTdGF0ZSB7XG4gICAgY29uc3Qgd2Vha01hcCA9IG5ldyBXZWFrTWFwKCk7XG4gICAgd2Vha01hcC5zZXQoXG4gICAgICBUb2FzdE5vdGlmaWNhdGlvbkNsYXNzLlRvYXN0Tm90aWZpY2F0aW9uRXZlbnRzQ29udHJvbGxlcixcbiAgICAgIF9FdmVudHNDb250cm9sbGVyXG4gICAgKTtcblxuICAgIHJldHVybiB7XG4gICAgICBXZWFrTWFwOiB3ZWFrTWFwLFxuICAgICAgVG9hc3RCZWxvbmdpbmc6IF9Ub2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZyxcbiAgICB9O1xuICB9XG5cbiAgZ2V0Q29tcG9uZW50UmVmKFxuICAgIF9Ub2FzdE5vdGlmaWNhdGlvblJhd1N0YXRlOiBUb2FzdE5vdGlmaWNhdGlvbkludGVyZmFjZS5JVG9hc3ROb3RpZmljYXRpb25SYXdTdGF0ZVxuICApOiBDb21wb25lbnRSZWY8YW55PiB8IG51bGwge1xuICAgIGNvbnN0IGRpYWxvZ0luZGV4ID0gdGhpcy5maW5kRGlhbG9nSW5kZXgoXG4gICAgICBfVG9hc3ROb3RpZmljYXRpb25SYXdTdGF0ZS5Ub2FzdEJlbG9uZ2luZy5FbnRpdHlVbmlxdWVJRFxuICAgICk7XG4gICAgaWYgKGRpYWxvZ0luZGV4ID09PSAtMSkge1xuICAgICAgbGV0IHRvYXN0VXNlclZpZXdDb21wb25lbnQ6IFR5cGU8YW55PiA9IFRvYXN0Tm90aWZpY2F0aW9uV3JhcHBlckNvbXBvbmVudDtcbiAgICAgIGlmIChcbiAgICAgICAgX1RvYXN0Tm90aWZpY2F0aW9uUmF3U3RhdGUuVG9hc3RCZWxvbmdpbmcuVG9hc3RDb3JlQ29uZmlnXG4gICAgICAgICAgLlRvYXN0VXNlclZpZXdUeXBlID09PSBUb2FzdFVzZXJWaWV3VHlwZUVudW0uU0lNUExFXG4gICAgICApIHtcbiAgICAgICAgdG9hc3RVc2VyVmlld0NvbXBvbmVudCA9IFRvYXN0Tm90aWZpY2F0aW9uU2ltcGxlV3JhcHBlckNvbXBvbmVudDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShcbiAgICAgICAgdG9hc3RVc2VyVmlld0NvbXBvbmVudFxuICAgICAgKTtcbiAgICAgIHJldHVybiBjb21wb25lbnRGYWN0b3J5LmNyZWF0ZShcbiAgICAgICAgbmV3IERpYWxvZ0luamVjdG9yKHRoaXMuaW5qZWN0b3IsIF9Ub2FzdE5vdGlmaWNhdGlvblJhd1N0YXRlLldlYWtNYXApXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGxpc3RlbmVycyhcbiAgICBfRXZlbnRzQ29udHJvbGxlcjogVG9hc3ROb3RpZmljYXRpb25DbGFzcy5Ub2FzdE5vdGlmaWNhdGlvbkV2ZW50c0NvbnRyb2xsZXJcbiAgKSB7XG4gICAgLy8gTGlzdGVuZXIgZm9yIGNsb3NpbmcgZGlhbG9nXG4gICAgY29uc3QgY2xvc2VEaWFsb2dTdWJzY3JpcHRpb24gPSBfRXZlbnRzQ29udHJvbGxlci5hZnRlckNsb3NlZCQuc3Vic2NyaWJlKFxuICAgICAgKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIC8vIHRoaXMucmVtb3ZlRnJvbUJvZHlQYXJlbnRDb21wb25lbnQobW9kYWxJbmRleCk7XG4gICAgICAgIHRoaXMucmVtb3ZlRnJvbUJvZHkocmVzcG9uc2UudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuRW50aXR5VW5pcXVlSUQpO1xuICAgICAgICBjbG9zZURpYWxvZ1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBhcHBlbmRUb0JvZHlQYXJlbnRDb21wb25lbnQoX0NvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPGFueT4pOiB2b2lkIHtcbiAgICAvLyBhdHRhY2ggdmlldyB0byBpZ25pdGUgbGlmZWN5Y2xlIGhvb2tzXG4gICAgdGhpcy5hcHBSZWYuYXR0YWNoVmlldyhfQ29tcG9uZW50UmVmLmhvc3RWaWV3KTtcblxuICAgIGNvbnN0IHRvYXN0UG9zaXRpb246IFRvYXN0UG9zaXRpb25FbnVtID1cbiAgICAgIF9Db21wb25lbnRSZWYuaW5zdGFuY2UudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuVG9hc3RDb3JlQ29uZmlnXG4gICAgICAgIC5Ub2FzdFBvc2l0aW9uO1xuICAgIGNvbnN0IG9wZW5JbkVsZW1lbnRJRCA9XG4gICAgICBfQ29tcG9uZW50UmVmLmluc3RhbmNlLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLlRvYXN0Q29yZUNvbmZpZ1xuICAgICAgICAuT3BlbkluRWxlbWVudElEO1xuICAgIGxldCB0YXJnZXROb2RlOiBIVE1MRWxlbWVudDtcbiAgICBpZiAoIW9wZW5JbkVsZW1lbnRJRCkge1xuICAgICAgdGhpcy5zZXRUb2FzdFdyYXBwZXJOb2RlKFxuICAgICAgICBfQ29tcG9uZW50UmVmLmluc3RhbmNlLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLlRvYXN0Q29yZUNvbmZpZ1xuICAgICAgICAgIC5Ub2FzdFBvc2l0aW9uLFxuICAgICAgICB0aGlzLnNldFRvYXN0T3ZlcmxheU5vZGUoKVxuICAgICAgKTtcbiAgICAgIHRhcmdldE5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgdG9hc3Qtd3JhcHBlci0ke3RvYXN0UG9zaXRpb259YCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRhcmdldE5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChvcGVuSW5FbGVtZW50SUQpO1xuICAgIH1cblxuICAgIGNvbnN0IGRvbUVsZW0gPSAoX0NvbXBvbmVudFJlZi5ob3N0VmlldyBhcyBFbWJlZGRlZFZpZXdSZWY8YW55PilcbiAgICAgIC5yb290Tm9kZXNbMF0gYXMgSFRNTEVsZW1lbnQ7XG5cbiAgICBjb25zdCB0b2FzdEVudGl0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdG9hc3RFbnRpdHkuc2V0QXR0cmlidXRlKFxuICAgICAgXCJpZFwiLFxuICAgICAgX0NvbXBvbmVudFJlZi5pbnN0YW5jZS50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5FbnRpdHlVbmlxdWVJRFxuICAgICk7XG4gICAgdG9hc3RFbnRpdHkuY2xhc3NOYW1lID0gXCJ0b2FzdC1lbnRpdHlcIjtcbiAgICBjb25zdCBzcGxpdCA9IHRvYXN0UG9zaXRpb24uc3BsaXQoXCItXCIpO1xuICAgIGlmIChzcGxpdFsxXSA9PT0gXCJmdWxsd2lkdGhcIikge1xuICAgICAgdG9hc3RFbnRpdHkuc3R5bGUud2lkdGggPSBcIjkzdndcIjtcbiAgICB9IGVsc2UgaWYgKG9wZW5JbkVsZW1lbnRJRCkge1xuICAgICAgdG9hc3RFbnRpdHkuc3R5bGUud2lkdGggPSBcIjEwMCVcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgdG9hc3RFbnRpdHkuc3R5bGUud2lkdGggPSBcIjMwMHB4XCI7XG4gICAgfVxuICAgIHRvYXN0RW50aXR5LnN0eWxlLm1hcmdpbiA9IFwiYXV0b1wiO1xuICAgIHRvYXN0RW50aXR5LnByZXBlbmQoZG9tRWxlbSk7XG4gICAgLy8gdGFyZ2V0Tm9kZS5wcmVwZW5kKHRvYXN0RW50aXR5KTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRhcmdldE5vZGUucHJlcGVuZCh0b2FzdEVudGl0eSk7XG4gICAgfSwgMjAwKTtcbiAgfVxuXG4gIHJlbW92ZUZyb21Cb2R5KF9FbnRpdHlVbmlxdWVJRDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgbW9kYWxJbmRleCA9IHRoaXMuZmluZERpYWxvZ0luZGV4KF9FbnRpdHlVbmlxdWVJRCk7XG4gICAgaWYgKG1vZGFsSW5kZXggPiAtMSkge1xuICAgICAgaWYgKHRoaXMuYnVmZmVyVG9hc3RSYXdMaXN0Lmxlbmd0aCkge1xuICAgICAgICB0aGlzLnNlbmRUb1Byb2R1Y3Rpb24odGhpcy5idWZmZXJUb2FzdFJhd0xpc3RbMF0pO1xuICAgICAgICB0aGlzLmJ1ZmZlclRvYXN0UmF3TGlzdC5zcGxpY2UoMCwgMSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMudG9hc3RDb21wb25lbnRSZWZMaXN0W21vZGFsSW5kZXhdLmluc3RhbmNlXG4gICAgICAgIC5jbG9zZVBhcmVudCQoXCJjbG9zZS1mYXN0XCIpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIG1hcCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbW9kYWxJbmRleCA9IHRoaXMuZmluZERpYWxvZ0luZGV4KF9FbnRpdHlVbmlxdWVJRCk7XG4gICAgICAgICAgICBpZiAodGhpcy50b2FzdENvbXBvbmVudFJlZkxpc3RbbW9kYWxJbmRleF0pIHtcbiAgICAgICAgICAgICAgY29uc3QgdG9hc3RFbnRpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAgICAgICAgICAgICB0aGlzLnRvYXN0Q29tcG9uZW50UmVmTGlzdFttb2RhbEluZGV4XS5pbnN0YW5jZVxuICAgICAgICAgICAgICAgICAgLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLkVudGl0eVVuaXF1ZUlEXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIHRvYXN0RW50aXR5LnJlbW92ZSgpO1xuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgJWMgJHt0aGlzLnRvYXN0Q29tcG9uZW50UmVmTGlzdFttb2RhbEluZGV4XS5pbnN0YW5jZS50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5FbnRpdHlVbmlxdWVJRH0gYCwgYGJhY2tncm91bmQ6ICNjYzMzMzM7IGNvbG9yOiAjZmZmYCk7XG4gICAgICAgICAgICAgIHRoaXMuYXBwUmVmLmRldGFjaFZpZXcoXG4gICAgICAgICAgICAgICAgdGhpcy50b2FzdENvbXBvbmVudFJlZkxpc3RbbW9kYWxJbmRleF0uaG9zdFZpZXdcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgdGhpcy50b2FzdENvbXBvbmVudFJlZkxpc3RbbW9kYWxJbmRleF0uZGVzdHJveSgpO1xuICAgICAgICAgICAgICB0aGlzLnRvYXN0Q29tcG9uZW50UmVmTGlzdC5zcGxpY2UobW9kYWxJbmRleCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgZmluZERpYWxvZ0luZGV4KF9EaWFsb2dVbmlxdWVJRDogc3RyaW5nKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy50b2FzdENvbXBvbmVudFJlZkxpc3QuZmluZEluZGV4KChpdGVtKSA9PiB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBfRGlhbG9nVW5pcXVlSUQgPT09XG4gICAgICAgIGl0ZW0uaW5zdGFuY2UudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuRW50aXR5VW5pcXVlSURcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHNldFRvYXN0T3ZlcmxheU5vZGUoKTogSFRNTEVsZW1lbnQge1xuICAgIGNvbnN0IGJvZHlOb2RlID0gZG9jdW1lbnQuYm9keSB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImJvZHlcIilbMF07XG4gICAgaWYgKCFib2R5Tm9kZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBjaGVjayB0aGUgb3ZlcmxheVxuICAgIGxldCB0b2FzdE92ZXJsYXlOb2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgICBcInRvYXN0LW92ZXJsYXktY29udGFpbmVyXCJcbiAgICApIGFzIEhUTUxTdHlsZUVsZW1lbnQ7XG5cbiAgICBpZiAoIXRvYXN0T3ZlcmxheU5vZGUpIHtcbiAgICAgIGxldCB0b2FzdE92ZXJsYXlOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHRvYXN0T3ZlcmxheU5vZGUuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJ0b2FzdC1vdmVybGF5LWNvbnRhaW5lclwiKTtcbiAgICAgIHRvYXN0T3ZlcmxheU5vZGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJcIikpO1xuICAgICAgdG9hc3RPdmVybGF5Tm9kZS5zdHlsZS5wb3NpdGlvbiA9IFwiZml4ZWRcIjtcbiAgICAgIHRvYXN0T3ZlcmxheU5vZGUuc3R5bGUudG9wID0gXCIwXCI7XG4gICAgICB0b2FzdE92ZXJsYXlOb2RlLnN0eWxlLmxlZnQgPSBcIjBcIjtcbiAgICAgIHRvYXN0T3ZlcmxheU5vZGUuc3R5bGUuekluZGV4ID0gXCI5OTk5OTk5OTlcIjtcbiAgICAgIGJvZHlOb2RlLmFwcGVuZENoaWxkKHRvYXN0T3ZlcmxheU5vZGUpO1xuICAgICAgcmV0dXJuIHRvYXN0T3ZlcmxheU5vZGU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRvYXN0T3ZlcmxheU5vZGU7XG4gIH1cblxuICBwcml2YXRlIHNldFRvYXN0V3JhcHBlck5vZGUoXG4gICAgX1Bvc2l0aW9uOiBUb2FzdFBvc2l0aW9uRW51bSxcbiAgICBfVG9hc3RPdmVybGF5Tm9kZTogSFRNTEVsZW1lbnRcbiAgKSB7XG4gICAgbGV0IHRvYXN0V3JhcHBlck5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAgIGB0b2FzdC13cmFwcGVyLSR7X1Bvc2l0aW9ufWBcbiAgICApIGFzIEhUTUxTdHlsZUVsZW1lbnQ7XG4gICAgaWYgKCF0b2FzdFdyYXBwZXJOb2RlKSB7XG4gICAgICBjb25zdCB0b2FzdFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgdG9hc3RXcmFwcGVyLnNldEF0dHJpYnV0ZShcImlkXCIsIFwidG9hc3Qtd3JhcHBlci1cIiArIF9Qb3NpdGlvbik7XG4gICAgICB0b2FzdFdyYXBwZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJcIikpO1xuICAgICAgX1RvYXN0T3ZlcmxheU5vZGUucHJlcGVuZCh0b2FzdFdyYXBwZXIpO1xuXG4gICAgICBjb25zdCBzcGxpdCA9IF9Qb3NpdGlvbi5zcGxpdChcIi1cIik7XG5cbiAgICAgIGlmIChzcGxpdFsxXSA9PT0gXCJyaWdodFwiIHx8IHNwbGl0WzFdID09PSBcImxlZnRcIikge1xuICAgICAgICB0aGlzLmdDb25maWdTZXJ2aWNlXG4gICAgICAgICAgLmdldFNoZWV0KFwibmd4LWF3ZXNvbWUtcG9wdXAtc3R5bGVzXCIpXG4gICAgICAgICAgLmFkZFJ1bGUoXG4gICAgICAgICAgICBgI3RvYXN0LXdyYXBwZXItJHtfUG9zaXRpb259YCxcbiAgICAgICAgICAgIGAke3NwbGl0WzBdfTogMjBweDsgJHtzcGxpdFsxXX06IDIwcHg7IHBvc2l0aW9uOiBmaXhlZDsgei1pbmRleDogOTk5OTk5O2BcbiAgICAgICAgICApO1xuICAgICAgfVxuICAgICAgaWYgKHNwbGl0WzFdID09PSBcImNlbnRlclwiKSB7XG4gICAgICAgIHRoaXMuZ0NvbmZpZ1NlcnZpY2VcbiAgICAgICAgICAuZ2V0U2hlZXQoXCJuZ3gtYXdlc29tZS1wb3B1cC1zdHlsZXNcIilcbiAgICAgICAgICAuYWRkUnVsZShcbiAgICAgICAgICAgIGAjdG9hc3Qtd3JhcHBlci0ke19Qb3NpdGlvbn1gLFxuICAgICAgICAgICAgYCR7c3BsaXRbMF19OiAyMHB4OyB3aWR0aDogMTAwJTsgcG9zaXRpb246IGZpeGVkOyB6LWluZGV4OiA5OTk5OTk7IHBvaW50ZXItZXZlbnRzOiBub25lO2BcbiAgICAgICAgICApO1xuICAgICAgfVxuICAgICAgaWYgKHNwbGl0WzFdID09PSBcImZ1bGx3aWR0aFwiKSB7XG4gICAgICAgIHRoaXMuZ0NvbmZpZ1NlcnZpY2VcbiAgICAgICAgICAuZ2V0U2hlZXQoXCJuZ3gtYXdlc29tZS1wb3B1cC1zdHlsZXNcIilcbiAgICAgICAgICAuYWRkUnVsZShcbiAgICAgICAgICAgIGAjdG9hc3Qtd3JhcHBlci0ke19Qb3NpdGlvbn1gLFxuICAgICAgICAgICAgYCR7c3BsaXRbMF19OiAxMHB4OyB3aWR0aDogMTAwJTsgcG9zaXRpb246IGZpeGVkOyB6LWluZGV4OiA5OTk5OTk7IHBvaW50ZXItZXZlbnRzOiBub25lO2BcbiAgICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19