import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
import { map } from 'rxjs/operators';
import { DialogInjector } from '../../../core/dialog-injector';
import { DialogWrapperComponent } from '../dialog-wrapper/dialog-wrapper.component';
import { DialogEventsController } from './classes';
import * as i0 from "@angular/core";
export class DialogService {
    constructor(componentFactoryResolver, injector, appRef) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.injector = injector;
        this.appRef = appRef;
        this.dialogParentComponentRefList = [];
    }
    open(_ComponentType, _DialogBelonging) {
        const dialogController = _DialogBelonging.EventsController;
        const componentRef = this.getComponentRef(dialogController, _DialogBelonging);
        this.dialogParentComponentRefList.push(componentRef);
        componentRef.instance.dialogBelonging = _DialogBelonging;
        componentRef.instance.childComponentType = _ComponentType;
        this.appendToBodyParentComponent(componentRef);
        this.listeners(dialogController);
        return dialogController;
    }
    getComponentRef(_EventsController, _DialogBelonging) {
        let componentFactory;
        const dialogIndex = this.findDialogIndex(_DialogBelonging.EntityUniqueID);
        if (dialogIndex === -1) {
            const weakMap = new WeakMap();
            weakMap.set(DialogEventsController, _EventsController);
            componentFactory = this.componentFactoryResolver.resolveComponentFactory(DialogWrapperComponent);
            return componentFactory.create(new DialogInjector(this.injector, weakMap));
        }
        return null;
    }
    listeners(_EventsController) {
        // Listener for closing dialog
        const closeDialogSubscription = _EventsController.afterClosed$.subscribe(response => {
            const modalIndex = this.findDialogIndex(response.DialogBelonging.EntityUniqueID);
            this.removeFromBodyDialogWrapperComponent(modalIndex);
            closeDialogSubscription.unsubscribe();
        });
        // Listener for turning off loader
        const closeLoaderSubscription = _EventsController.afterLoader$.subscribe((_DialogUniqueID) => {
            if (_DialogUniqueID) {
                const modalIndex = this.findDialogIndex(_DialogUniqueID);
                if (modalIndex !== -1) {
                    this.dialogParentComponentRefList[modalIndex].instance.closeLoader();
                }
            }
            closeLoaderSubscription.unsubscribe();
        });
    }
    childComponentResolver() { }
    appendToBodyParentComponent(_ComponentRef) {
        // attach view to ignite lifecycle hooks
        this.appRef.attachView(_ComponentRef.hostView);
        // DOM
        const domElem = _ComponentRef.hostView.rootNodes[0];
        document.body.appendChild(domElem);
    }
    closeDialogWrapperComponent(_DialogUniqueID) {
        const modalIndex = this.findDialogIndex(_DialogUniqueID);
        this.removeFromBodyDialogWrapperComponent(modalIndex);
    }
    removeFromBodyDialogWrapperComponent(_DialogIndex) {
        if (_DialogIndex > -1) {
            this.dialogParentComponentRefList[_DialogIndex].instance
                .closeParent$()
                .pipe(map(item => {
                this.appRef.detachView(this.dialogParentComponentRefList[_DialogIndex].hostView);
                this.dialogParentComponentRefList[_DialogIndex].destroy();
                this.dialogParentComponentRefList.splice(_DialogIndex, 1);
            }))
                .subscribe();
        }
    }
    findDialogIndex(_DialogUniqueID) {
        return this.dialogParentComponentRefList.findIndex(item => {
            return _DialogUniqueID === item.instance.dialogBelonging.EntityUniqueID;
        });
    }
}
DialogService.ɵprov = i0.ɵɵdefineInjectable({ factory: function DialogService_Factory() { return new DialogService(i0.ɵɵinject(i0.ComponentFactoryResolver), i0.ɵɵinject(i0.INJECTOR), i0.ɵɵinject(i0.ApplicationRef)); }, token: DialogService, providedIn: "root" });
DialogService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
DialogService.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: Injector },
    { type: ApplicationRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9uZ3gtYXdlc29tZS1wb3B1cC90eXBlcy9kaWFsb2cvY29yZS9kaWFsb2cuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsY0FBYyxFQUNkLHdCQUF3QixFQUd4QixVQUFVLEVBQ1YsUUFBUSxFQUVULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDL0QsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDcEYsT0FBTyxFQUFtQixzQkFBc0IsRUFBRSxNQUFNLFdBQVcsQ0FBQzs7QUFNcEUsTUFBTSxPQUFPLGFBQWE7SUFHeEIsWUFDVSx3QkFBa0QsRUFDbEQsUUFBa0IsRUFDbEIsTUFBc0I7UUFGdEIsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUNsRCxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBTGhDLGlDQUE0QixHQUF3QixFQUFFLENBQUM7SUFNcEQsQ0FBQztJQUVKLElBQUksQ0FBQyxjQUF5QixFQUFFLGdCQUFpQztRQUMvRCxNQUFNLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDO1FBQzNELE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUU5RSxJQUFJLENBQUMsNEJBQTRCLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3JELFlBQVksQ0FBQyxRQUFRLENBQUMsZUFBZSxHQUFHLGdCQUFnQixDQUFDO1FBQ3pELFlBQVksQ0FBQyxRQUFRLENBQUMsa0JBQWtCLEdBQUcsY0FBYyxDQUFD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LDRCQUE0QixDQUFDLFlBQVksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNqRixJQUFJLENBQUMsNEJBQTRCLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQzFELElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzVELENBQUMsQ0FBQyxDQUNIO2lCQUNBLFNBQVMsRUFBRSxDQUFDO1NBQ2hCO0lBQ0gsQ0FBQztJQUVELGVBQWUsQ0FBQyxlQUF1QjtRQUNyQyxPQUFPLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDeEQsT0FBTyxlQUFlLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDO1FBQzFFLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7OztZQXJHRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7OztZQWZDLHdCQUF3QjtZQUl4QixRQUFRO1lBTFIsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFwcGxpY2F0aW9uUmVmLFxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIENvbXBvbmVudFJlZixcbiAgRW1iZWRkZWRWaWV3UmVmLFxuICBJbmplY3RhYmxlLFxuICBJbmplY3RvcixcbiAgVHlwZVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IERpYWxvZ0luamVjdG9yIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9kaWFsb2ctaW5qZWN0b3InO1xuaW1wb3J0IHsgRGlhbG9nV3JhcHBlckNvbXBvbmVudCB9IGZyb20gJy4uL2RpYWxvZy13cmFwcGVyL2RpYWxvZy13cmFwcGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEaWFsb2dCZWxvbmdpbmcsIERpYWxvZ0V2ZW50c0NvbnRyb2xsZXIgfSBmcm9tICcuL2NsYXNzZXMnO1xuaW1wb3J0IHsgSURpYWxvZ0V2ZW50c0NvbnRyb2xsZXIgfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBEaWFsb2dTZXJ2aWNlIHtcbiAgZGlhbG9nUGFyZW50Q29tcG9uZW50UmVmTGlzdDogQ29tcG9uZW50UmVmPGFueT5bXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgcHJpdmF0ZSBhcHBSZWY6IEFwcGxpY2F0aW9uUmVmXG4gICkge31cblxuICBvcGVuKF9Db21wb25lbnRUeXBlOiBUeXBlPGFueT4sIF9EaWFsb2dCZWxvbmdpbmc6IERpYWxvZ0JlbG9uZ2luZyk6IElEaWFsb2dFdmVudHNDb250cm9sbGVyIHtcbiAgICBjb25zdCBkaWFsb2dDb250cm9sbGVyID0gX0RpYWxvZ0JlbG9uZ2luZy5FdmVudHNDb250cm9sbGVyO1xuICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IHRoaXMuZ2V0Q29tcG9uZW50UmVmKGRpYWxvZ0NvbnRyb2xsZXIsIF9EaWFsb2dCZWxvbmdpbmcpO1xuXG4gICAgdGhpcy5kaWFsb2dQYXJlbnRDb21wb25lbnRSZWZMaXN0LnB1c2goY29tcG9uZW50UmVmKTtcbiAgICBjb21wb25lbnRSZWYuaW5zdGFuY2UuZGlhbG9nQmVsb25naW5nID0gX0RpYWxvZ0JlbG9uZ2luZztcbiAgICBjb21wb25lbnRSZWYuaW5zdGFuY2UuY2hpbGRDb21wb25lbnRUeXBlID0gX0NvbXBvbmVudFR5cGU7XG5cbiAgICB0aGlzLmFwcGVuZFRvQm9keVBhcmVudENvbXBvbmVudChjb21wb25lbnRSZWYpO1xuXG4gICAgdGhpcy5saXN0ZW5lcnMoZGlhbG9nQ29udHJvbGxlcik7XG5cbiAgICByZXR1cm4gZGlhbG9nQ29udHJvbGxlcjtcbiAgfVxuXG4gIGdldENvbXBvbmVudFJlZihcbiAgICBfRXZlbnRzQ29udHJvbGxlcjogSURpYWxvZ0V2ZW50c0NvbnRyb2xsZXIsXG4gICAgX0RpYWxvZ0JlbG9uZ2luZzogRGlhbG9nQmVsb25naW5nXG4gICk6IENvbXBvbmVudFJlZjxhbnk+IHwgbnVsbCB7XG4gICAgbGV0IGNvbXBvbmVudEZhY3Rvcnk7XG5cbiAgICBjb25zdCBkaWFsb2dJbmRleCA9IHRoaXMuZmluZERpYWxvZ0luZGV4KF9EaWFsb2dCZWxvbmdpbmcuRW50aXR5VW5pcXVlSUQpO1xuICAgIGlmIChkaWFsb2dJbmRleCA9PT0gLTEpIHtcbiAgICAgIGNvbnN0IHdlYWtNYXAgPSBuZXcgV2Vha01hcCgpO1xuICAgICAgd2Vha01hcC5zZXQoRGlhbG9nRXZlbnRzQ29udHJvbGxlciwgX0V2ZW50c0NvbnRyb2xsZXIpO1xuXG4gICAgICBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoRGlhbG9nV3JhcHBlckNvbXBvbmVudCk7XG4gICAgICByZXR1cm4gY29tcG9uZW50RmFjdG9yeS5jcmVhdGUobmV3IERpYWxvZ0luamVjdG9yKHRoaXMuaW5qZWN0b3IsIHdlYWtNYXApKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGxpc3RlbmVycyhfRXZlbnRzQ29udHJvbGxlcjogSURpYWxvZ0V2ZW50c0NvbnRyb2xsZXIpIHtcbiAgICAvLyBMaXN0ZW5lciBmb3IgY2xvc2luZyBkaWFsb2dcbiAgICBjb25zdCBjbG9zZURpYWxvZ1N1YnNjcmlwdGlvbiA9IF9FdmVudHNDb250cm9sbGVyLmFmdGVyQ2xvc2VkJC5zdWJzY3JpYmUocmVzcG9uc2UgPT4ge1xuICAgICAgY29uc3QgbW9kYWxJbmRleCA9IHRoaXMuZmluZERpYWxvZ0luZGV4KHJlc3BvbnNlLkRpYWxvZ0JlbG9uZ2luZy5FbnRpdHlVbmlxdWVJRCk7XG4gICAgICB0aGlzLnJlbW92ZUZyb21Cb2R5RGlhbG9nV3JhcHBlckNvbXBvbmVudChtb2RhbEluZGV4KTtcbiAgICAgIGNsb3NlRGlhbG9nU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfSk7XG5cbiAgICAvLyBMaXN0ZW5lciBmb3IgdHVybmluZyBvZmYgbG9hZGVyXG4gICAgY29uc3QgY2xvc2VMb2FkZXJTdWJzY3JpcHRpb24gPSBfRXZlbnRzQ29udHJvbGxlci5hZnRlckxvYWRlciQuc3Vic2NyaWJlKChfRGlhbG9nVW5pcXVlSUQ6IHN0cmluZykgPT4ge1xuICAgICAgaWYgKF9EaWFsb2dVbmlxdWVJRCkge1xuICAgICAgICBjb25zdCBtb2RhbEluZGV4ID0gdGhpcy5maW5kRGlhbG9nSW5kZXgoX0RpYWxvZ1VuaXF1ZUlEKTtcbiAgICAgICAgaWYgKG1vZGFsSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgdGhpcy5kaWFsb2dQYXJlbnRDb21wb25lbnRSZWZMaXN0W21vZGFsSW5kZXhdLmluc3RhbmNlLmNsb3NlTG9hZGVyKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY2xvc2VMb2FkZXJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNoaWxkQ29tcG9uZW50UmVzb2x2ZXIoKSB7fVxuXG4gIGFwcGVuZFRvQm9keVBhcmVudENvbXBvbmVudChfQ29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8YW55Pik6IHZvaWQge1xuICAgIC8vIGF0dGFjaCB2aWV3IHRvIGlnbml0ZSBsaWZlY3ljbGUgaG9va3NcbiAgICB0aGlzLmFwcFJlZi5hdHRhY2hWaWV3KF9Db21wb25lbnRSZWYuaG9zdFZpZXcpO1xuXG4gICAgLy8gRE9NXG4gICAgY29uc3QgZG9tRWxlbSA9IChfQ29tcG9uZW50UmVmLmhvc3RWaWV3IGFzIEVtYmVkZGVkVmlld1JlZjxhbnk+KS5yb290Tm9kZXNbMF0gYXMgSFRNTEVsZW1lbnQ7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkb21FbGVtKTtcbiAgfVxuXG4gIGNsb3NlRGlhbG9nV3JhcHBlckNvbXBvbmVudChfRGlhbG9nVW5pcXVlSUQ6IHN0cmluZykge1xuICAgIGNvbnN0IG1vZGFsSW5kZXggPSB0aGlzLmZpbmREaWFsb2dJbmRleChfRGlhbG9nVW5pcXVlSUQpO1xuICAgIHRoaXMucmVtb3ZlRnJvbUJvZHlEaWFsb2dXcmFwcGVyQ29tcG9uZW50KG1vZGFsSW5kZXgpO1xuICB9XG5cbiAgcmVtb3ZlRnJvbUJvZHlEaWFsb2dXcmFwcGVyQ29tcG9uZW50KF9EaWFsb2dJbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKF9EaWFsb2dJbmRleCA+IC0xKSB7XG4gICAgICB0aGlzLmRpYWxvZ1BhcmVudENvbXBvbmVudFJlZkxpc3RbX0RpYWxvZ0luZGV4XS5pbnN0YW5jZVxuICAgICAgICAuY2xvc2VQYXJlbnQkKClcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgbWFwKGl0ZW0gPT4ge1xuICAgICAgICAgICAgdGhpcy5hcHBSZWYuZGV0YWNoVmlldyh0aGlzLmRpYWxvZ1BhcmVudENvbXBvbmVudFJlZkxpc3RbX0RpYWxvZ0luZGV4XS5ob3N0Vmlldyk7XG4gICAgICAgICAgICB0aGlzLmRpYWxvZ1BhcmVudENvbXBvbmVudFJlZkxpc3RbX0RpYWxvZ0luZGV4XS5kZXN0cm95KCk7XG4gICAgICAgICAgICB0aGlzLmRpYWxvZ1BhcmVudENvbXBvbmVudFJlZkxpc3Quc3BsaWNlKF9EaWFsb2dJbmRleCwgMSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgZmluZERpYWxvZ0luZGV4KF9EaWFsb2dVbmlxdWVJRDogc3RyaW5nKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5kaWFsb2dQYXJlbnRDb21wb25lbnRSZWZMaXN0LmZpbmRJbmRleChpdGVtID0+IHtcbiAgICAgIHJldHVybiBfRGlhbG9nVW5pcXVlSUQgPT09IGl0ZW0uaW5zdGFuY2UuZGlhbG9nQmVsb25naW5nLkVudGl0eVVuaXF1ZUlEO1xuICAgIH0pO1xuICB9XG59XG4iXX0=