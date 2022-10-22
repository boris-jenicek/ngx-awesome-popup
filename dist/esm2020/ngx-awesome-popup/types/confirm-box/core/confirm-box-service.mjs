import { Injectable } from '@angular/core';
import { take, tap } from 'rxjs/operators';
import { DialogInjector } from '../../../core/dialog-injector';
import { ConfirmBoxWrapperComponent } from '../confirm-box-wrapper/confirm-box-wrapper.component';
import { ConfirmBoxeventsController } from './classes';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/global-config.service";
export class ConfirmBoxService {
    constructor(componentFactoryResolver, injector, appRef, gConfigService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.injector = injector;
        this.appRef = appRef;
        this.gConfigService = gConfigService;
        this.confirmBoxComponentRefList = [];
    }
    open(_ConfirmBoxBelonging) {
        const dialogController = _ConfirmBoxBelonging.eventsController;
        const componentRef = this.getComponentRef(dialogController, _ConfirmBoxBelonging);
        this.confirmBoxComponentRefList.push(componentRef);
        componentRef.instance.confirmBoxBelonging = _ConfirmBoxBelonging;
        this.appendToBodyParentComponent(componentRef);
        this.listeners(dialogController);
        return dialogController;
    }
    getComponentRef(_eventsController, _ConfirmBoxBelonging) {
        let componentFactory;
        const dialogIndex = this.findDialogIndex(_ConfirmBoxBelonging.entityUniqueID);
        if (dialogIndex === -1) {
            const weakMap = new WeakMap();
            weakMap.set(ConfirmBoxeventsController, _eventsController);
            componentFactory = this.componentFactoryResolver.resolveComponentFactory(ConfirmBoxWrapperComponent);
            return componentFactory.create(new DialogInjector(this.injector, weakMap));
        }
        return null;
    }
    listeners(_eventsController) {
        const closeDialogSubscription = _eventsController.afterClosed$.subscribe(response => {
            const modalIndex = this.findDialogIndex(response.confirmBoxBelonging.entityUniqueID);
            this.removeFromBodyParentComponent(modalIndex);
            closeDialogSubscription.unsubscribe();
        });
    }
    appendToBodyParentComponent(_ComponentRef) {
        this.appRef.attachView(_ComponentRef.hostView);
        const domElem = _ComponentRef.hostView.rootNodes[0];
        document.body.appendChild(domElem);
    }
    closeDialogWrapperComponent(_DialogUniqueID) {
        const modalIndex = this.findDialogIndex(_DialogUniqueID);
        this.removeFromBodyParentComponent(modalIndex);
    }
    removeFromBodyParentComponent(_DialogIndex) {
        if (_DialogIndex > -1) {
            this.confirmBoxComponentRefList[_DialogIndex].instance
                .closeParent$()
                .pipe(tap(item => {
                this.appRef.detachView(this.confirmBoxComponentRefList[_DialogIndex].hostView);
                this.confirmBoxComponentRefList[_DialogIndex].destroy();
                this.confirmBoxComponentRefList.splice(_DialogIndex, 1);
            }), take(1))
                .subscribe();
        }
    }
    findDialogIndex(_DialogUniqueID) {
        return this.confirmBoxComponentRefList.findIndex(item => {
            return _DialogUniqueID === item.instance.confirmBoxBelonging.entityUniqueID;
        });
    }
}
ConfirmBoxService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ConfirmBoxService, deps: [{ token: i0.ComponentFactoryResolver }, { token: i0.Injector }, { token: i0.ApplicationRef }, { token: i1.GlobalConfigService }], target: i0.ɵɵFactoryTarget.Injectable });
ConfirmBoxService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ConfirmBoxService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ConfirmBoxService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i0.Injector }, { type: i0.ApplicationRef }, { type: i1.GlobalConfigService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlybS1ib3gtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL25neC1hd2Vzb21lLXBvcHVwL3R5cGVzL2NvbmZpcm0tYm94L2NvcmUvY29uZmlybS1ib3gtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQTJFLFVBQVUsRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUM5SCxPQUFPLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUUvRCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxzREFBc0QsQ0FBQztBQUNsRyxPQUFPLEVBQXVCLDBCQUEwQixFQUFFLE1BQU0sV0FBVyxDQUFDOzs7QUFLNUUsTUFBTSxPQUFPLGlCQUFpQjtJQUc1QixZQUNVLHdCQUFrRCxFQUNsRCxRQUFrQixFQUNsQixNQUFzQixFQUN0QixjQUFtQztRQUhuQyw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO1FBQ2xELGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFDdEIsbUJBQWMsR0FBZCxjQUFjLENBQXFCO1FBTjdDLCtCQUEwQixHQUErQyxFQUFFLENBQUM7SUFPekUsQ0FBQztJQUVKLElBQUksQ0FBQyxvQkFBeUM7UUFDNUMsTUFBTSxnQkFBZ0IsR0FBRyxvQkFBb0IsQ0FBQyxnQkFBZ0IsQ0FBQztRQUMvRCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixFQUFFLG9CQUFvQixDQUFDLENBQUM7UUFFbEYsSUFBSSxDQUFDLDBCQUEwQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNuRCxZQUFZLENBQUMsUUFBUSxDQUFDLG1CQUFtQixHQUFHLG9CQUFvQixDQUFDO1FBRWpFLElBQUksQ0FBQywyQkFB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LENBQUM7OzhHQWxGVSxpQkFBaUI7a0hBQWpCLGlCQUFpQixjQUZoQixNQUFNOzJGQUVQLGlCQUFpQjtrQkFIN0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBsaWNhdGlvblJlZiwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBDb21wb25lbnRSZWYsIEVtYmVkZGVkVmlld1JlZiwgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHRha2UsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IERpYWxvZ0luamVjdG9yIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9kaWFsb2ctaW5qZWN0b3InO1xuaW1wb3J0IHsgR2xvYmFsQ29uZmlnU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvZ2xvYmFsLWNvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpcm1Cb3hXcmFwcGVyQ29tcG9uZW50IH0gZnJvbSAnLi4vY29uZmlybS1ib3gtd3JhcHBlci9jb25maXJtLWJveC13cmFwcGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb25maXJtQm94QmVsb25naW5nLCBDb25maXJtQm94ZXZlbnRzQ29udHJvbGxlciB9IGZyb20gJy4vY2xhc3Nlcyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIENvbmZpcm1Cb3hTZXJ2aWNlIHtcbiAgY29uZmlybUJveENvbXBvbmVudFJlZkxpc3Q6IENvbXBvbmVudFJlZjxDb25maXJtQm94V3JhcHBlckNvbXBvbmVudD5bXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgcHJpdmF0ZSBhcHBSZWY6IEFwcGxpY2F0aW9uUmVmLFxuICAgIHByaXZhdGUgZ0NvbmZpZ1NlcnZpY2U6IEdsb2JhbENvbmZpZ1NlcnZpY2VcbiAgKSB7fVxuXG4gIG9wZW4oX0NvbmZpcm1Cb3hCZWxvbmdpbmc6IENvbmZpcm1Cb3hCZWxvbmdpbmcpOiBDb25maXJtQm94ZXZlbnRzQ29udHJvbGxlciB7XG4gICAgY29uc3QgZGlhbG9nQ29udHJvbGxlciA9IF9Db25maXJtQm94QmVsb25naW5nLmV2ZW50c0NvbnRyb2xsZXI7XG4gICAgY29uc3QgY29tcG9uZW50UmVmID0gdGhpcy5nZXRDb21wb25lbnRSZWYoZGlhbG9nQ29udHJvbGxlciwgX0NvbmZpcm1Cb3hCZWxvbmdpbmcpO1xuXG4gICAgdGhpcy5jb25maXJtQm94Q29tcG9uZW50UmVmTGlzdC5wdXNoKGNvbXBvbmVudFJlZik7XG4gICAgY29tcG9uZW50UmVmLmluc3RhbmNlLmNvbmZpcm1Cb3hCZWxvbmdpbmcgPSBfQ29uZmlybUJveEJlbG9uZ2luZztcblxuICAgIHRoaXMuYXBwZW5kVG9Cb2R5UGFyZW50Q29tcG9uZW50KGNvbXBvbmVudFJlZik7XG5cbiAgICB0aGlzLmxpc3RlbmVycyhkaWFsb2dDb250cm9sbGVyKTtcblxuICAgIHJldHVybiBkaWFsb2dDb250cm9sbGVyO1xuICB9XG5cbiAgZ2V0Q29tcG9uZW50UmVmKF9ldmVudHNDb250cm9sbGVyOiBDb25maXJtQm94ZXZlbnRzQ29udHJvbGxlciwgX0NvbmZpcm1Cb3hCZWxvbmdpbmc6IENvbmZpcm1Cb3hCZWxvbmdpbmcpOiBDb21wb25lbnRSZWY8YW55PiB8IG51bGwge1xuICAgIGxldCBjb21wb25lbnRGYWN0b3J5O1xuXG4gICAgY29uc3QgZGlhbG9nSW5kZXggPSB0aGlzLmZpbmREaWFsb2dJbmRleChfQ29uZmlybUJveEJlbG9uZ2luZy5lbnRpdHlVbmlxdWVJRCk7XG4gICAgaWYgKGRpYWxvZ0luZGV4ID09PSAtMSkge1xuICAgICAgY29uc3Qgd2Vha01hcCA9IG5ldyBXZWFrTWFwKCk7XG4gICAgICB3ZWFrTWFwLnNldChDb25maXJtQm94ZXZlbnRzQ29udHJvbGxlciwgX2V2ZW50c0NvbnRyb2xsZXIpO1xuXG4gICAgICBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoQ29uZmlybUJveFdyYXBwZXJDb21wb25lbnQpO1xuICAgICAgcmV0dXJuIGNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKG5ldyBEaWFsb2dJbmplY3Rvcih0aGlzLmluamVjdG9yLCB3ZWFrTWFwKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBsaXN0ZW5lcnMoX2V2ZW50c0NvbnRyb2xsZXI6IENvbmZpcm1Cb3hldmVudHNDb250cm9sbGVyKTogdm9pZCB7XG4gICAgLy8gTGlzdGVuZXIgZm9yIGNsb3NpbmcgZGlhbG9nXG4gICAgY29uc3QgY2xvc2VEaWFsb2dTdWJzY3JpcHRpb24gPSBfZXZlbnRzQ29udHJvbGxlci5hZnRlckNsb3NlZCQuc3Vic2NyaWJlKHJlc3BvbnNlID0+IHtcbiAgICAgIGNvbnN0IG1vZGFsSW5kZXggPSB0aGlzLmZpbmREaWFsb2dJbmRleChyZXNwb25zZS5jb25maXJtQm94QmVsb25naW5nLmVudGl0eVVuaXF1ZUlEKTtcbiAgICAgIHRoaXMucmVtb3ZlRnJvbUJvZHlQYXJlbnRDb21wb25lbnQobW9kYWxJbmRleCk7XG4gICAgICBjbG9zZURpYWxvZ1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgYXBwZW5kVG9Cb2R5UGFyZW50Q29tcG9uZW50KF9Db21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxhbnk+KTogdm9pZCB7XG4gICAgLy8gYXR0YWNoIHZpZXcgdG8gaWduaXRlIGxpZmVjeWNsZSBob29rc1xuICAgIHRoaXMuYXBwUmVmLmF0dGFjaFZpZXcoX0NvbXBvbmVudFJlZi5ob3N0Vmlldyk7XG5cbiAgICAvLyBET01cbiAgICBjb25zdCBkb21FbGVtID0gKF9Db21wb25lbnRSZWYuaG9zdFZpZXcgYXMgRW1iZWRkZWRWaWV3UmVmPGFueT4pLnJvb3ROb2Rlc1swXSBhcyBIVE1MRWxlbWVudDtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRvbUVsZW0pO1xuICB9XG5cbiAgY2xvc2VEaWFsb2dXcmFwcGVyQ29tcG9uZW50KF9EaWFsb2dVbmlxdWVJRDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgbW9kYWxJbmRleCA9IHRoaXMuZmluZERpYWxvZ0luZGV4KF9EaWFsb2dVbmlxdWVJRCk7XG4gICAgdGhpcy5yZW1vdmVGcm9tQm9keVBhcmVudENvbXBvbmVudChtb2RhbEluZGV4KTtcbiAgfVxuXG4gIHJlbW92ZUZyb21Cb2R5UGFyZW50Q29tcG9uZW50KF9EaWFsb2dJbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKF9EaWFsb2dJbmRleCA+IC0xKSB7XG4gICAgICB0aGlzLmNvbmZpcm1Cb3hDb21wb25lbnRSZWZMaXN0W19EaWFsb2dJbmRleF0uaW5zdGFuY2VcbiAgICAgICAgLmNsb3NlUGFyZW50JCgpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIHRhcChpdGVtID0+IHtcbiAgICAgICAgICAgIHRoaXMuYXBwUmVmLmRldGFjaFZpZXcodGhpcy5jb25maXJtQm94Q29tcG9uZW50UmVmTGlzdFtfRGlhbG9nSW5kZXhdLmhvc3RWaWV3KTtcbiAgICAgICAgICAgIHRoaXMuY29uZmlybUJveENvbXBvbmVudFJlZkxpc3RbX0RpYWxvZ0luZGV4XS5kZXN0cm95KCk7XG4gICAgICAgICAgICB0aGlzLmNvbmZpcm1Cb3hDb21wb25lbnRSZWZMaXN0LnNwbGljZShfRGlhbG9nSW5kZXgsIDEpO1xuICAgICAgICAgIH0pLFxuICAgICAgICAgIHRha2UoMSlcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgZmluZERpYWxvZ0luZGV4KF9EaWFsb2dVbmlxdWVJRDogc3RyaW5nKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5jb25maXJtQm94Q29tcG9uZW50UmVmTGlzdC5maW5kSW5kZXgoaXRlbSA9PiB7XG4gICAgICByZXR1cm4gX0RpYWxvZ1VuaXF1ZUlEID09PSBpdGVtLmluc3RhbmNlLmNvbmZpcm1Cb3hCZWxvbmdpbmcuZW50aXR5VW5pcXVlSUQ7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==