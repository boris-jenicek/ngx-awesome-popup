import { Injectable } from '@angular/core';
import { take, tap } from 'rxjs/operators';
import { DialogInjector } from '../../../core/dialog-injector';
import { ConfirmBoxWrapperComponent } from '../confirm-box-wrapper/confirm-box-wrapper.component';
import { ConfirmBoxeventsController } from './classes';
import * as i0 from "@angular/core";
export class ConfirmBoxService {
    constructor(componentFactoryResolver, injector, appRef) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.injector = injector;
        this.appRef = appRef;
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
ConfirmBoxService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ConfirmBoxService, deps: [{ token: i0.ComponentFactoryResolver }, { token: i0.Injector }, { token: i0.ApplicationRef }], target: i0.ɵɵFactoryTarget.Injectable });
ConfirmBoxService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ConfirmBoxService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ConfirmBoxService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i0.Injector }, { type: i0.ApplicationRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlybS1ib3gtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL25neC1hd2Vzb21lLXBvcHVwL3R5cGVzL2NvbmZpcm0tYm94L2NvcmUvY29uZmlybS1ib3gtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBS0wsVUFBVSxFQUVYLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQy9ELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHNEQUFzRCxDQUFDO0FBQ2xHLE9BQU8sRUFBdUIsMEJBQTBCLEVBQUUsTUFBTSxXQUFXLENBQUM7O0FBSzVFLE1BQU0sT0FBTyxpQkFBaUI7SUFHNUIsWUFDVSx3QkFBa0QsRUFDbEQsUUFBa0IsRUFDbEIsTUFBc0I7UUFGdEIsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUNsRCxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBTGhDLCtCQUEwQixHQUErQyxFQUFFLENBQUM7SUFNekUsQ0FBQztJQUVKLElBQUksQ0FBQyxvQkFBeUM7UUFDNUMsTUFBTSxnQkFBZ0IsR0FBRyxvQkFBb0IsQ0FBQyxnQkFBZ0IsQ0FBQztRQUMvRCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixFQUFFLG9CQUFvQixDQUFDLENBQUM7UUFFbEYsSUFBSSxDQUFDLDBCQUEwQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNuRCxZQUFZLENBQUMsUUFBUSxDQUFDLG1CQUFtQixHQUFHLG9CQUFvQixDQUFDO1FBRWpFLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUUvQyxJQUFJLENBQUMsU0FB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TUFBTTsyRkFFUCxpQkFBaUI7a0JBSDdCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQXBwbGljYXRpb25SZWYsXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgQ29tcG9uZW50UmVmLFxuICBFbWJlZGRlZFZpZXdSZWYsXG4gIEluamVjdGFibGUsXG4gIEluamVjdG9yXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgdGFrZSwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRGlhbG9nSW5qZWN0b3IgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2RpYWxvZy1pbmplY3Rvcic7XG5pbXBvcnQgeyBDb25maXJtQm94V3JhcHBlckNvbXBvbmVudCB9IGZyb20gJy4uL2NvbmZpcm0tYm94LXdyYXBwZXIvY29uZmlybS1ib3gtd3JhcHBlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29uZmlybUJveEJlbG9uZ2luZywgQ29uZmlybUJveGV2ZW50c0NvbnRyb2xsZXIgfSBmcm9tICcuL2NsYXNzZXMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBDb25maXJtQm94U2VydmljZSB7XG4gIGNvbmZpcm1Cb3hDb21wb25lbnRSZWZMaXN0OiBDb21wb25lbnRSZWY8Q29uZmlybUJveFdyYXBwZXJDb21wb25lbnQ+W10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIHByaXZhdGUgYXBwUmVmOiBBcHBsaWNhdGlvblJlZlxuICApIHt9XG5cbiAgb3BlbihfQ29uZmlybUJveEJlbG9uZ2luZzogQ29uZmlybUJveEJlbG9uZ2luZyk6IENvbmZpcm1Cb3hldmVudHNDb250cm9sbGVyIHtcbiAgICBjb25zdCBkaWFsb2dDb250cm9sbGVyID0gX0NvbmZpcm1Cb3hCZWxvbmdpbmcuZXZlbnRzQ29udHJvbGxlcjtcbiAgICBjb25zdCBjb21wb25lbnRSZWYgPSB0aGlzLmdldENvbXBvbmVudFJlZihkaWFsb2dDb250cm9sbGVyLCBfQ29uZmlybUJveEJlbG9uZ2luZyk7XG5cbiAgICB0aGlzLmNvbmZpcm1Cb3hDb21wb25lbnRSZWZMaXN0LnB1c2goY29tcG9uZW50UmVmKTtcbiAgICBjb21wb25lbnRSZWYuaW5zdGFuY2UuY29uZmlybUJveEJlbG9uZ2luZyA9IF9Db25maXJtQm94QmVsb25naW5nO1xuXG4gICAgdGhpcy5hcHBlbmRUb0JvZHlQYXJlbnRDb21wb25lbnQoY29tcG9uZW50UmVmKTtcblxuICAgIHRoaXMubGlzdGVuZXJzKGRpYWxvZ0NvbnRyb2xsZXIpO1xuXG4gICAgcmV0dXJuIGRpYWxvZ0NvbnRyb2xsZXI7XG4gIH1cblxuICBnZXRDb21wb25lbnRSZWYoXG4gICAgX2V2ZW50c0NvbnRyb2xsZXI6IENvbmZpcm1Cb3hldmVudHNDb250cm9sbGVyLFxuICAgIF9Db25maXJtQm94QmVsb25naW5nOiBDb25maXJtQm94QmVsb25naW5nXG4gICk6IENvbXBvbmVudFJlZjxhbnk+IHwgbnVsbCB7XG4gICAgbGV0IGNvbXBvbmVudEZhY3Rvcnk7XG5cbiAgICBjb25zdCBkaWFsb2dJbmRleCA9IHRoaXMuZmluZERpYWxvZ0luZGV4KF9Db25maXJtQm94QmVsb25naW5nLmVudGl0eVVuaXF1ZUlEKTtcbiAgICBpZiAoZGlhbG9nSW5kZXggPT09IC0xKSB7XG4gICAgICBjb25zdCB3ZWFrTWFwID0gbmV3IFdlYWtNYXAoKTtcbiAgICAgIHdlYWtNYXAuc2V0KENvbmZpcm1Cb3hldmVudHNDb250cm9sbGVyLCBfZXZlbnRzQ29udHJvbGxlcik7XG5cbiAgICAgIGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShDb25maXJtQm94V3JhcHBlckNvbXBvbmVudCk7XG4gICAgICByZXR1cm4gY29tcG9uZW50RmFjdG9yeS5jcmVhdGUobmV3IERpYWxvZ0luamVjdG9yKHRoaXMuaW5qZWN0b3IsIHdlYWtNYXApKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGxpc3RlbmVycyhfZXZlbnRzQ29udHJvbGxlcjogQ29uZmlybUJveGV2ZW50c0NvbnRyb2xsZXIpOiB2b2lkIHtcbiAgICAvLyBMaXN0ZW5lciBmb3IgY2xvc2luZyBkaWFsb2dcbiAgICBjb25zdCBjbG9zZURpYWxvZ1N1YnNjcmlwdGlvbiA9IF9ldmVudHNDb250cm9sbGVyLmFmdGVyQ2xvc2VkJC5zdWJzY3JpYmUocmVzcG9uc2UgPT4ge1xuICAgICAgY29uc3QgbW9kYWxJbmRleCA9IHRoaXMuZmluZERpYWxvZ0luZGV4KHJlc3BvbnNlLmNvbmZpcm1Cb3hCZWxvbmdpbmcuZW50aXR5VW5pcXVlSUQpO1xuICAgICAgdGhpcy5yZW1vdmVGcm9tQm9keVBhcmVudENvbXBvbmVudChtb2RhbEluZGV4KTtcbiAgICAgIGNsb3NlRGlhbG9nU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfSk7XG4gIH1cblxuICBhcHBlbmRUb0JvZHlQYXJlbnRDb21wb25lbnQoX0NvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPGFueT4pOiB2b2lkIHtcbiAgICAvLyBhdHRhY2ggdmlldyB0byBpZ25pdGUgbGlmZWN5Y2xlIGhvb2tzXG4gICAgdGhpcy5hcHBSZWYuYXR0YWNoVmlldyhfQ29tcG9uZW50UmVmLmhvc3RWaWV3KTtcblxuICAgIC8vIERPTVxuICAgIGNvbnN0IGRvbUVsZW0gPSAoX0NvbXBvbmVudFJlZi5ob3N0VmlldyBhcyBFbWJlZGRlZFZpZXdSZWY8YW55Pikucm9vdE5vZGVzWzBdIGFzIEhUTUxFbGVtZW50O1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZG9tRWxlbSk7XG4gIH1cblxuICBjbG9zZURpYWxvZ1dyYXBwZXJDb21wb25lbnQoX0RpYWxvZ1VuaXF1ZUlEOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBtb2RhbEluZGV4ID0gdGhpcy5maW5kRGlhbG9nSW5kZXgoX0RpYWxvZ1VuaXF1ZUlEKTtcbiAgICB0aGlzLnJlbW92ZUZyb21Cb2R5UGFyZW50Q29tcG9uZW50KG1vZGFsSW5kZXgpO1xuICB9XG5cbiAgcmVtb3ZlRnJvbUJvZHlQYXJlbnRDb21wb25lbnQoX0RpYWxvZ0luZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoX0RpYWxvZ0luZGV4ID4gLTEpIHtcbiAgICAgIHRoaXMuY29uZmlybUJveENvbXBvbmVudFJlZkxpc3RbX0RpYWxvZ0luZGV4XS5pbnN0YW5jZVxuICAgICAgICAuY2xvc2VQYXJlbnQkKClcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgdGFwKGl0ZW0gPT4ge1xuICAgICAgICAgICAgdGhpcy5hcHBSZWYuZGV0YWNoVmlldyh0aGlzLmNvbmZpcm1Cb3hDb21wb25lbnRSZWZMaXN0W19EaWFsb2dJbmRleF0uaG9zdFZpZXcpO1xuICAgICAgICAgICAgdGhpcy5jb25maXJtQm94Q29tcG9uZW50UmVmTGlzdFtfRGlhbG9nSW5kZXhdLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHRoaXMuY29uZmlybUJveENvbXBvbmVudFJlZkxpc3Quc3BsaWNlKF9EaWFsb2dJbmRleCwgMSk7XG4gICAgICAgICAgfSksXG4gICAgICAgICAgdGFrZSgxKVxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBmaW5kRGlhbG9nSW5kZXgoX0RpYWxvZ1VuaXF1ZUlEOiBzdHJpbmcpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmNvbmZpcm1Cb3hDb21wb25lbnRSZWZMaXN0LmZpbmRJbmRleChpdGVtID0+IHtcbiAgICAgIHJldHVybiBfRGlhbG9nVW5pcXVlSUQgPT09IGl0ZW0uaW5zdGFuY2UuY29uZmlybUJveEJlbG9uZ2luZy5lbnRpdHlVbmlxdWVJRDtcbiAgICB9KTtcbiAgfVxufVxuIl19