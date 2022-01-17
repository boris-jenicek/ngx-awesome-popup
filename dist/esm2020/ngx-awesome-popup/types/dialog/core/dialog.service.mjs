import { Injectable } from '@angular/core';
import { take, tap } from 'rxjs/operators';
import { DialogInjector } from '../../../core/dialog-injector';
import { DialogWrapperComponent } from '../dialog-wrapper/dialog-wrapper.component';
import { DialogeventsController } from './classes';
import * as i0 from "@angular/core";
export class DialogService {
    constructor(componentFactoryResolver, injector, appRef) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.injector = injector;
        this.appRef = appRef;
        this.dialogParentComponentRefList = [];
    }
    open(_ComponentType, _DialogBelonging) {
        const dialogController = _DialogBelonging.eventsController;
        const componentRef = this.getComponentRef(dialogController, _DialogBelonging);
        this.dialogParentComponentRefList.push(componentRef);
        componentRef.instance.dialogBelonging = _DialogBelonging;
        componentRef.instance.childComponentType = _ComponentType;
        this.appendToBodyParentComponent(componentRef);
        this.listeners(dialogController);
        return dialogController;
    }
    getComponentRef(_eventsController, _DialogBelonging) {
        let componentFactory;
        const dialogIndex = this.findDialogIndex(_DialogBelonging.entityUniqueID);
        if (dialogIndex === -1) {
            const weakMap = new WeakMap();
            weakMap.set(DialogeventsController, _eventsController);
            componentFactory = this.componentFactoryResolver.resolveComponentFactory(DialogWrapperComponent);
            return componentFactory.create(new DialogInjector(this.injector, weakMap));
        }
        return null;
    }
    listeners(_eventsController) {
        const closeDialogSubscription = _eventsController.afterClosed$.subscribe(response => {
            const modalIndex = this.findDialogIndex(response.DialogBelonging.entityUniqueID);
            this.removeFromBodyDialogWrapperComponent(modalIndex);
            closeDialogSubscription.unsubscribe();
        });
        const closeLoaderSubscription = _eventsController.afterLoader$.subscribe((_DialogUniqueID) => {
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
        this.appRef.attachView(_ComponentRef.hostView);
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
                .pipe(tap(item => {
                this.appRef.detachView(this.dialogParentComponentRefList[_DialogIndex].hostView);
                this.dialogParentComponentRefList[_DialogIndex].destroy();
                this.dialogParentComponentRefList.splice(_DialogIndex, 1);
            }), take(1))
                .subscribe();
        }
    }
    findDialogIndex(_DialogUniqueID) {
        return this.dialogParentComponentRefList.findIndex(item => {
            return _DialogUniqueID === item.instance.dialogBelonging.entityUniqueID;
        });
    }
}
DialogService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: DialogService, deps: [{ token: i0.ComponentFactoryResolver }, { token: i0.Injector }, { token: i0.ApplicationRef }], target: i0.ɵɵFactoryTarget.Injectable });
DialogService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: DialogService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: DialogService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i0.Injector }, { type: i0.ApplicationRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9uZ3gtYXdlc29tZS1wb3B1cC90eXBlcy9kaWFsb2cvY29yZS9kaWFsb2cuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBS0wsVUFBVSxFQUdYLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3BGLE9BQU8sRUFBbUIsc0JBQXNCLEVBQUUsTUFBTSxXQUFXLENBQUM7O0FBTXBFLE1BQU0sT0FBTyxhQUFhO0lBR3hCLFlBQ1Usd0JBQWtELEVBQ2xELFFBQWtCLEVBQ2xCLE1BQXNCO1FBRnRCLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFDbEQsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQUxoQyxpQ0FBNEIsR0FBd0IsRUFBRSxDQUFDO0lBTXBELENBQUM7SUFFSixJQUFJLENBQUMsY0FBeUIsRUFBRSxnQkFBaUM7UUFDL0QsTUFBTSxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQztRQUMzRCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFFOUUsSUFBSSxDQUFDLDRCQUE0QixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNyRCxZQUFZLENBQUMsUUFBUSxDQUFDLGVBQWUsR0FBRyxnQkFBZ0IsQ0FBQztRQUN6RCxZQUFZLENBQUMsUUFBUSxDQUFDLGtCQUFrQixHQUFHLGNBQWMsQ0FBQztRQUUxRCxJQUFJLENBQUMsMkJBQTJC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WUFBWSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQzFELElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzVELENBQUMsQ0FBQyxFQUNGLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FDUjtpQkFDQSxTQUFTLEVBQUUsQ0FBQztTQUNoQjtJQUNILENBQUM7SUFFRCxlQUFlLENBQUMsZUFBdUI7UUFDckMsT0FBTyxJQUFJLENBQUMsNEJBQTRCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3hELE9BQU8sZUFBZSxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQztRQUMxRSxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7OzBHQW5HVSxhQUFhOzhHQUFiLGFBQWEsY0FGWixNQUFNOzJGQUVQLGFBQWE7a0JBSHpCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQXBwbGljYXRpb25SZWYsXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgQ29tcG9uZW50UmVmLFxuICBFbWJlZGRlZFZpZXdSZWYsXG4gIEluamVjdGFibGUsXG4gIEluamVjdG9yLFxuICBUeXBlXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgdGFrZSwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRGlhbG9nSW5qZWN0b3IgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2RpYWxvZy1pbmplY3Rvcic7XG5pbXBvcnQgeyBEaWFsb2dXcmFwcGVyQ29tcG9uZW50IH0gZnJvbSAnLi4vZGlhbG9nLXdyYXBwZXIvZGlhbG9nLXdyYXBwZXIuY29tcG9uZW50JztcbmltcG9ydCB7IERpYWxvZ0JlbG9uZ2luZywgRGlhbG9nZXZlbnRzQ29udHJvbGxlciB9IGZyb20gJy4vY2xhc3Nlcyc7XG5pbXBvcnQgeyBJRGlhbG9nZXZlbnRzQ29udHJvbGxlciB9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIERpYWxvZ1NlcnZpY2Uge1xuICBkaWFsb2dQYXJlbnRDb21wb25lbnRSZWZMaXN0OiBDb21wb25lbnRSZWY8YW55PltdID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgICBwcml2YXRlIGFwcFJlZjogQXBwbGljYXRpb25SZWZcbiAgKSB7fVxuXG4gIG9wZW4oX0NvbXBvbmVudFR5cGU6IFR5cGU8YW55PiwgX0RpYWxvZ0JlbG9uZ2luZzogRGlhbG9nQmVsb25naW5nKTogSURpYWxvZ2V2ZW50c0NvbnRyb2xsZXIge1xuICAgIGNvbnN0IGRpYWxvZ0NvbnRyb2xsZXIgPSBfRGlhbG9nQmVsb25naW5nLmV2ZW50c0NvbnRyb2xsZXI7XG4gICAgY29uc3QgY29tcG9uZW50UmVmID0gdGhpcy5nZXRDb21wb25lbnRSZWYoZGlhbG9nQ29udHJvbGxlciwgX0RpYWxvZ0JlbG9uZ2luZyk7XG5cbiAgICB0aGlzLmRpYWxvZ1BhcmVudENvbXBvbmVudFJlZkxpc3QucHVzaChjb21wb25lbnRSZWYpO1xuICAgIGNvbXBvbmVudFJlZi5pbnN0YW5jZS5kaWFsb2dCZWxvbmdpbmcgPSBfRGlhbG9nQmVsb25naW5nO1xuICAgIGNvbXBvbmVudFJlZi5pbnN0YW5jZS5jaGlsZENvbXBvbmVudFR5cGUgPSBfQ29tcG9uZW50VHlwZTtcblxuICAgIHRoaXMuYXBwZW5kVG9Cb2R5UGFyZW50Q29tcG9uZW50KGNvbXBvbmVudFJlZik7XG5cbiAgICB0aGlzLmxpc3RlbmVycyhkaWFsb2dDb250cm9sbGVyKTtcblxuICAgIHJldHVybiBkaWFsb2dDb250cm9sbGVyO1xuICB9XG5cbiAgZ2V0Q29tcG9uZW50UmVmKFxuICAgIF9ldmVudHNDb250cm9sbGVyOiBJRGlhbG9nZXZlbnRzQ29udHJvbGxlcixcbiAgICBfRGlhbG9nQmVsb25naW5nOiBEaWFsb2dCZWxvbmdpbmdcbiAgKTogQ29tcG9uZW50UmVmPGFueT4gfCBudWxsIHtcbiAgICBsZXQgY29tcG9uZW50RmFjdG9yeTtcblxuICAgIGNvbnN0IGRpYWxvZ0luZGV4ID0gdGhpcy5maW5kRGlhbG9nSW5kZXgoX0RpYWxvZ0JlbG9uZ2luZy5lbnRpdHlVbmlxdWVJRCk7XG4gICAgaWYgKGRpYWxvZ0luZGV4ID09PSAtMSkge1xuICAgICAgY29uc3Qgd2Vha01hcCA9IG5ldyBXZWFrTWFwKCk7XG4gICAgICB3ZWFrTWFwLnNldChEaWFsb2dldmVudHNDb250cm9sbGVyLCBfZXZlbnRzQ29udHJvbGxlcik7XG5cbiAgICAgIGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShEaWFsb2dXcmFwcGVyQ29tcG9uZW50KTtcbiAgICAgIHJldHVybiBjb21wb25lbnRGYWN0b3J5LmNyZWF0ZShuZXcgRGlhbG9nSW5qZWN0b3IodGhpcy5pbmplY3Rvciwgd2Vha01hcCkpO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgbGlzdGVuZXJzKF9ldmVudHNDb250cm9sbGVyOiBJRGlhbG9nZXZlbnRzQ29udHJvbGxlcik6IHZvaWQge1xuICAgIC8vIExpc3RlbmVyIGZvciBjbG9zaW5nIGRpYWxvZ1xuICAgIGNvbnN0IGNsb3NlRGlhbG9nU3Vic2NyaXB0aW9uID0gX2V2ZW50c0NvbnRyb2xsZXIuYWZ0ZXJDbG9zZWQkLnN1YnNjcmliZShyZXNwb25zZSA9PiB7XG4gICAgICBjb25zdCBtb2RhbEluZGV4ID0gdGhpcy5maW5kRGlhbG9nSW5kZXgocmVzcG9uc2UuRGlhbG9nQmVsb25naW5nLmVudGl0eVVuaXF1ZUlEKTtcbiAgICAgIHRoaXMucmVtb3ZlRnJvbUJvZHlEaWFsb2dXcmFwcGVyQ29tcG9uZW50KG1vZGFsSW5kZXgpO1xuICAgICAgY2xvc2VEaWFsb2dTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9KTtcblxuICAgIC8vIExpc3RlbmVyIGZvciB0dXJuaW5nIG9mZiBsb2FkZXJcbiAgICBjb25zdCBjbG9zZUxvYWRlclN1YnNjcmlwdGlvbiA9IF9ldmVudHNDb250cm9sbGVyLmFmdGVyTG9hZGVyJC5zdWJzY3JpYmUoKF9EaWFsb2dVbmlxdWVJRDogc3RyaW5nKSA9PiB7XG4gICAgICBpZiAoX0RpYWxvZ1VuaXF1ZUlEKSB7XG4gICAgICAgIGNvbnN0IG1vZGFsSW5kZXggPSB0aGlzLmZpbmREaWFsb2dJbmRleChfRGlhbG9nVW5pcXVlSUQpO1xuICAgICAgICBpZiAobW9kYWxJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICB0aGlzLmRpYWxvZ1BhcmVudENvbXBvbmVudFJlZkxpc3RbbW9kYWxJbmRleF0uaW5zdGFuY2UuY2xvc2VMb2FkZXIoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjbG9zZUxvYWRlclN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgY2hpbGRDb21wb25lbnRSZXNvbHZlcigpOiB2b2lkIHt9XG5cbiAgYXBwZW5kVG9Cb2R5UGFyZW50Q29tcG9uZW50KF9Db21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxhbnk+KTogdm9pZCB7XG4gICAgLy8gYXR0YWNoIHZpZXcgdG8gaWduaXRlIGxpZmVjeWNsZSBob29rc1xuICAgIHRoaXMuYXBwUmVmLmF0dGFjaFZpZXcoX0NvbXBvbmVudFJlZi5ob3N0Vmlldyk7XG5cbiAgICAvLyBET01cbiAgICBjb25zdCBkb21FbGVtID0gKF9Db21wb25lbnRSZWYuaG9zdFZpZXcgYXMgRW1iZWRkZWRWaWV3UmVmPGFueT4pLnJvb3ROb2Rlc1swXSBhcyBIVE1MRWxlbWVudDtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRvbUVsZW0pO1xuICB9XG5cbiAgY2xvc2VEaWFsb2dXcmFwcGVyQ29tcG9uZW50KF9EaWFsb2dVbmlxdWVJRDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgbW9kYWxJbmRleCA9IHRoaXMuZmluZERpYWxvZ0luZGV4KF9EaWFsb2dVbmlxdWVJRCk7XG4gICAgdGhpcy5yZW1vdmVGcm9tQm9keURpYWxvZ1dyYXBwZXJDb21wb25lbnQobW9kYWxJbmRleCk7XG4gIH1cblxuICByZW1vdmVGcm9tQm9keURpYWxvZ1dyYXBwZXJDb21wb25lbnQoX0RpYWxvZ0luZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoX0RpYWxvZ0luZGV4ID4gLTEpIHtcbiAgICAgIHRoaXMuZGlhbG9nUGFyZW50Q29tcG9uZW50UmVmTGlzdFtfRGlhbG9nSW5kZXhdLmluc3RhbmNlXG4gICAgICAgIC5jbG9zZVBhcmVudCQoKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICB0YXAoaXRlbSA9PiB7XG4gICAgICAgICAgICB0aGlzLmFwcFJlZi5kZXRhY2hWaWV3KHRoaXMuZGlhbG9nUGFyZW50Q29tcG9uZW50UmVmTGlzdFtfRGlhbG9nSW5kZXhdLmhvc3RWaWV3KTtcbiAgICAgICAgICAgIHRoaXMuZGlhbG9nUGFyZW50Q29tcG9uZW50UmVmTGlzdFtfRGlhbG9nSW5kZXhdLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHRoaXMuZGlhbG9nUGFyZW50Q29tcG9uZW50UmVmTGlzdC5zcGxpY2UoX0RpYWxvZ0luZGV4LCAxKTtcbiAgICAgICAgICB9KSxcbiAgICAgICAgICB0YWtlKDEpXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIGZpbmREaWFsb2dJbmRleChfRGlhbG9nVW5pcXVlSUQ6IHN0cmluZyk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZGlhbG9nUGFyZW50Q29tcG9uZW50UmVmTGlzdC5maW5kSW5kZXgoaXRlbSA9PiB7XG4gICAgICByZXR1cm4gX0RpYWxvZ1VuaXF1ZUlEID09PSBpdGVtLmluc3RhbmNlLmRpYWxvZ0JlbG9uZ2luZy5lbnRpdHlVbmlxdWVJRDtcbiAgICB9KTtcbiAgfVxufVxuIl19