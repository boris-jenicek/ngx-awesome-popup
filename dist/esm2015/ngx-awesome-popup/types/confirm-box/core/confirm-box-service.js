import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
import { map } from 'rxjs/operators';
import { DialogInjector } from '../../../core/dialog-injector';
import { ConfirmBoxWrapperComponent } from '../confirm-box-wrapper/confirm-box-wrapper.component';
import { ConfirmBoxClass } from './model';
import * as i0 from "@angular/core";
export class ConfirmBoxService {
    constructor(componentFactoryResolver, injector, appRef) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.injector = injector;
        this.appRef = appRef;
        this.confirmBoxComponentRefList = [];
    }
    open(_ConfirmBoxBelonging) {
        const dialogController = _ConfirmBoxBelonging.EventsController;
        const componentRef = this.getComponentRef(dialogController, _ConfirmBoxBelonging);
        this.confirmBoxComponentRefList.push(componentRef);
        componentRef.instance.confirmBoxBelonging = _ConfirmBoxBelonging;
        this.appendToBodyParentComponent(componentRef);
        this.listeners(dialogController);
        return dialogController;
    }
    getComponentRef(_EventsController, _ConfirmBoxBelonging) {
        let componentFactory;
        const dialogIndex = this.findDialogIndex(_ConfirmBoxBelonging.EntityUniqueID);
        if (dialogIndex === -1) {
            const weakMap = new WeakMap();
            weakMap.set(ConfirmBoxClass.ConfirmBoxEventsController, _EventsController);
            componentFactory = this.componentFactoryResolver.resolveComponentFactory(ConfirmBoxWrapperComponent);
            return componentFactory.create(new DialogInjector(this.injector, weakMap));
        }
        return null;
    }
    listeners(_EventsController) {
        // Listener for closing dialog
        const closeDialogSubscription = _EventsController.afterClosed$.subscribe((response) => {
            const modalIndex = this.findDialogIndex(response.confirmBoxBelonging.EntityUniqueID);
            this.removeFromBodyParentComponent(modalIndex);
            closeDialogSubscription.unsubscribe();
        });
    }
    appendToBodyParentComponent(_ComponentRef) {
        // attach view to ignite lifecycle hooks
        this.appRef.attachView(_ComponentRef.hostView);
        // DOM
        const domElem = _ComponentRef.hostView.rootNodes[0];
        document.body.appendChild(domElem);
    }
    closeDialogWrapperComponent(_DialogUniqueID) {
        const modalIndex = this.findDialogIndex(_DialogUniqueID);
        this.removeFromBodyParentComponent(modalIndex);
    }
    removeFromBodyParentComponent(_DialogIndex) {
        if (_DialogIndex > -1) {
            this.confirmBoxComponentRefList[_DialogIndex].instance.closeParent$('close-fast').pipe(map(item => {
                this.appRef.detachView(this.confirmBoxComponentRefList[_DialogIndex].hostView);
                this.confirmBoxComponentRefList[_DialogIndex].destroy();
                this.confirmBoxComponentRefList.splice(_DialogIndex, 1);
            })).subscribe();
        }
    }
    findDialogIndex(_DialogUniqueID) {
        return this.confirmBoxComponentRefList.findIndex((item) => {
            return _DialogUniqueID === item.instance.confirmBoxBelonging.EntityUniqueID;
        });
    }
}
ConfirmBoxService.ɵprov = i0.ɵɵdefineInjectable({ factory: function ConfirmBoxService_Factory() { return new ConfirmBoxService(i0.ɵɵinject(i0.ComponentFactoryResolver), i0.ɵɵinject(i0.INJECTOR), i0.ɵɵinject(i0.ApplicationRef)); }, token: ConfirmBoxService, providedIn: "root" });
ConfirmBoxService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
ConfirmBoxService.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: Injector },
    { type: ApplicationRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlybS1ib3gtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL25neC1hd2Vzb21lLXBvcHVwL3R5cGVzL2NvbmZpcm0tYm94L2NvcmUvY29uZmlybS1ib3gtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsY0FBYyxFQUFFLHdCQUF3QixFQUFpQyxVQUFVLEVBQUUsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVILE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuQyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFDN0QsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0sc0RBQXNELENBQUM7QUFDaEcsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLFNBQVMsQ0FBQzs7QUFLeEMsTUFBTSxPQUFPLGlCQUFpQjtJQUk3QixZQUFvQix3QkFBa0QsRUFBVSxRQUFrQixFQUFVLE1BQXNCO1FBQTlHLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFGbEksK0JBQTBCLEdBQStDLEVBQUUsQ0FBQztJQUc1RSxDQUFDO0lBRUQsSUFBSSxDQUFDLG9CQUF5RDtRQUM3RCxNQUFNLGdCQUFnQixHQUFHLG9CQUFvQixDQUFDLGdCQUFnQixDQUFDO1FBQy9ELE1BQU0sWUFBWSxHQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztRQUV0RixJQUFJLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ25ELFlBQVksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLEdBQUcsb0JBQW9CLENBQUM7UUFFakUsSUFBSSxDQUFDLDJCQUEyQixDQUFDLFlBQVksQ0FBQyxDQUFDO1FB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QUFDLENBQUM7SUFDSixDQUFDOzs7O1lBcEZELFVBQVUsU0FBQztnQkFDWCxVQUFVLEVBQUUsTUFBTTthQUNsQjs7O1lBUnVCLHdCQUF3QjtZQUE2QyxRQUFRO1lBQTdGLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0FwcGxpY2F0aW9uUmVmLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIENvbXBvbmVudFJlZiwgRW1iZWRkZWRWaWV3UmVmLCBJbmplY3RhYmxlLCBJbmplY3Rvcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge21hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtEaWFsb2dJbmplY3Rvcn0gZnJvbSAnLi4vLi4vLi4vY29yZS9kaWFsb2ctaW5qZWN0b3InO1xuaW1wb3J0IHtDb25maXJtQm94V3JhcHBlckNvbXBvbmVudH0gZnJvbSAnLi4vY29uZmlybS1ib3gtd3JhcHBlci9jb25maXJtLWJveC13cmFwcGVyLmNvbXBvbmVudCc7XG5pbXBvcnQge0NvbmZpcm1Cb3hDbGFzc30gZnJvbSAnLi9tb2RlbCc7XG5cbkBJbmplY3RhYmxlKHtcblx0cHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIENvbmZpcm1Cb3hTZXJ2aWNlIHtcblxuXHRjb25maXJtQm94Q29tcG9uZW50UmVmTGlzdDogQ29tcG9uZW50UmVmPENvbmZpcm1Cb3hXcmFwcGVyQ29tcG9uZW50PltdID0gW107XG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsIHByaXZhdGUgYXBwUmVmOiBBcHBsaWNhdGlvblJlZikge1xuXHR9XG5cblx0b3BlbihfQ29uZmlybUJveEJlbG9uZ2luZzogQ29uZmlybUJveENsYXNzLkNvbmZpcm1Cb3hCZWxvbmdpbmcpOiBDb25maXJtQm94Q2xhc3MuQ29uZmlybUJveEV2ZW50c0NvbnRyb2xsZXIge1xuXHRcdGNvbnN0IGRpYWxvZ0NvbnRyb2xsZXIgPSBfQ29uZmlybUJveEJlbG9uZ2luZy5FdmVudHNDb250cm9sbGVyO1xuXHRcdGNvbnN0IGNvbXBvbmVudFJlZiAgICAgPSB0aGlzLmdldENvbXBvbmVudFJlZihkaWFsb2dDb250cm9sbGVyLCBfQ29uZmlybUJveEJlbG9uZ2luZyk7XG5cblx0XHR0aGlzLmNvbmZpcm1Cb3hDb21wb25lbnRSZWZMaXN0LnB1c2goY29tcG9uZW50UmVmKTtcblx0XHRjb21wb25lbnRSZWYuaW5zdGFuY2UuY29uZmlybUJveEJlbG9uZ2luZyA9IF9Db25maXJtQm94QmVsb25naW5nO1xuXG5cdFx0dGhpcy5hcHBlbmRUb0JvZHlQYXJlbnRDb21wb25lbnQoY29tcG9uZW50UmVmKTtcblxuXHRcdHRoaXMubGlzdGVuZXJzKGRpYWxvZ0NvbnRyb2xsZXIpO1xuXG5cdFx0cmV0dXJuIGRpYWxvZ0NvbnRyb2xsZXI7XG5cblx0fVxuXG5cdGdldENvbXBvbmVudFJlZihfRXZlbnRzQ29udHJvbGxlcjogQ29uZmlybUJveENsYXNzLkNvbmZpcm1Cb3hFdmVudHNDb250cm9sbGVyLCBfQ29uZmlybUJveEJlbG9uZ2luZzogQ29uZmlybUJveENsYXNzLkNvbmZpcm1Cb3hCZWxvbmdpbmcpOiBDb21wb25lbnRSZWY8YW55PiB8IG51bGwge1xuXHRcdGxldCBjb21wb25lbnRGYWN0b3J5O1xuXG5cdFx0Y29uc3QgZGlhbG9nSW5kZXggPSB0aGlzLmZpbmREaWFsb2dJbmRleChfQ29uZmlybUJveEJlbG9uZ2luZy5FbnRpdHlVbmlxdWVJRCk7XG5cdFx0aWYgKGRpYWxvZ0luZGV4ID09PSAtMSkge1xuXG5cdFx0XHRjb25zdCB3ZWFrTWFwID0gbmV3IFdlYWtNYXAoKTtcblx0XHRcdHdlYWtNYXAuc2V0KENvbmZpcm1Cb3hDbGFzcy5Db25maXJtQm94RXZlbnRzQ29udHJvbGxlciwgX0V2ZW50c0NvbnRyb2xsZXIpO1xuXG5cdFx0XHRjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoQ29uZmlybUJveFdyYXBwZXJDb21wb25lbnQpO1xuXHRcdFx0cmV0dXJuIGNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKG5ldyBEaWFsb2dJbmplY3Rvcih0aGlzLmluamVjdG9yLCB3ZWFrTWFwKSk7XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdGxpc3RlbmVycyhfRXZlbnRzQ29udHJvbGxlcjogQ29uZmlybUJveENsYXNzLkNvbmZpcm1Cb3hFdmVudHNDb250cm9sbGVyKSB7XG5cblx0XHQvLyBMaXN0ZW5lciBmb3IgY2xvc2luZyBkaWFsb2dcblx0XHRjb25zdCBjbG9zZURpYWxvZ1N1YnNjcmlwdGlvbiA9IF9FdmVudHNDb250cm9sbGVyLmFmdGVyQ2xvc2VkJC5zdWJzY3JpYmUoKHJlc3BvbnNlKSA9PiB7XG5cdFx0XHRjb25zdCBtb2RhbEluZGV4ID0gdGhpcy5maW5kRGlhbG9nSW5kZXgocmVzcG9uc2UuY29uZmlybUJveEJlbG9uZ2luZy5FbnRpdHlVbmlxdWVJRCk7XG5cdFx0XHR0aGlzLnJlbW92ZUZyb21Cb2R5UGFyZW50Q29tcG9uZW50KG1vZGFsSW5kZXgpO1xuXHRcdFx0Y2xvc2VEaWFsb2dTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcblx0XHR9KTtcblxuXHR9XG5cblxuXHRhcHBlbmRUb0JvZHlQYXJlbnRDb21wb25lbnQoX0NvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPGFueT4pOiB2b2lkIHtcblxuXHRcdC8vIGF0dGFjaCB2aWV3IHRvIGlnbml0ZSBsaWZlY3ljbGUgaG9va3Ncblx0XHR0aGlzLmFwcFJlZi5hdHRhY2hWaWV3KF9Db21wb25lbnRSZWYuaG9zdFZpZXcpO1xuXG5cdFx0Ly8gRE9NXG5cdFx0Y29uc3QgZG9tRWxlbSA9IChfQ29tcG9uZW50UmVmLmhvc3RWaWV3IGFzIEVtYmVkZGVkVmlld1JlZjxhbnk+KS5yb290Tm9kZXNbMF0gYXMgSFRNTEVsZW1lbnQ7XG5cdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkb21FbGVtKTtcblxuXHR9XG5cblx0Y2xvc2VEaWFsb2dXcmFwcGVyQ29tcG9uZW50KF9EaWFsb2dVbmlxdWVJRDogc3RyaW5nKSB7XG5cdFx0Y29uc3QgbW9kYWxJbmRleCA9IHRoaXMuZmluZERpYWxvZ0luZGV4KF9EaWFsb2dVbmlxdWVJRCk7XG5cdFx0dGhpcy5yZW1vdmVGcm9tQm9keVBhcmVudENvbXBvbmVudChtb2RhbEluZGV4KTtcblx0fVxuXG5cdHJlbW92ZUZyb21Cb2R5UGFyZW50Q29tcG9uZW50KF9EaWFsb2dJbmRleDogbnVtYmVyKTogdm9pZCB7XG5cdFx0aWYgKF9EaWFsb2dJbmRleCA+IC0xKSB7XG5cdFx0XHR0aGlzLmNvbmZpcm1Cb3hDb21wb25lbnRSZWZMaXN0W19EaWFsb2dJbmRleF0uaW5zdGFuY2UuY2xvc2VQYXJlbnQkKCdjbG9zZS1mYXN0JykucGlwZShtYXAoaXRlbSA9PiB7XG5cdFx0XHRcdHRoaXMuYXBwUmVmLmRldGFjaFZpZXcodGhpcy5jb25maXJtQm94Q29tcG9uZW50UmVmTGlzdFtfRGlhbG9nSW5kZXhdLmhvc3RWaWV3KTtcblx0XHRcdFx0dGhpcy5jb25maXJtQm94Q29tcG9uZW50UmVmTGlzdFtfRGlhbG9nSW5kZXhdLmRlc3Ryb3koKTtcblx0XHRcdFx0dGhpcy5jb25maXJtQm94Q29tcG9uZW50UmVmTGlzdC5zcGxpY2UoX0RpYWxvZ0luZGV4LCAxKTtcblx0XHRcdH0pKS5zdWJzY3JpYmUoKTtcblx0XHR9XG5cdH1cblxuXHRmaW5kRGlhbG9nSW5kZXgoX0RpYWxvZ1VuaXF1ZUlEOiBzdHJpbmcpOiBudW1iZXIge1xuXHRcdHJldHVybiB0aGlzLmNvbmZpcm1Cb3hDb21wb25lbnRSZWZMaXN0LmZpbmRJbmRleCgoaXRlbSkgPT4ge1xuXHRcdFx0cmV0dXJuIF9EaWFsb2dVbmlxdWVJRCA9PT0gaXRlbS5pbnN0YW5jZS5jb25maXJtQm94QmVsb25naW5nLkVudGl0eVVuaXF1ZUlEO1xuXHRcdH0pO1xuXHR9XG59XG4iXX0=