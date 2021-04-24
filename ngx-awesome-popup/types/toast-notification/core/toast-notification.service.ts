import {ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector} from '@angular/core';
import {ToastNotificationWrapperComponent} from '../toast-notification-wrapper/toast-notification-wrapper.component';
import {ToastNotificationClass, ToastNotificationInterface} from './model';
import {DialogInjector} from '../../../core/dialog-injector';
import {map} from 'rxjs/operators';
import {ToastNotificationConfigService} from './toast-notification-config.service';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ToastNotificationService {
    
    toastComponentRefList: ComponentRef<ToastNotificationWrapperComponent>[]                  = [];
    bufferToastRawList: ToastNotificationInterface.IToastNotificationRawState[]               = [];
    bufferCheckingIntervalIsReady: boolean                                                    = true;

    constructor(private componentFactoryResolver: ComponentFactoryResolver, private injector: Injector, private appRef: ApplicationRef, private toastConfig: ToastNotificationConfigService) {
    }
    
    openToast$(_ToastNotificationBelonging: ToastNotificationClass.ToastNotificationBelonging): Observable<ToastNotificationInterface.IPrivateResponseMerged> {
        let eventController = _ToastNotificationBelonging.EventsController;
        // console.log(`%c ${_ToastNotificationBelonging.EntityUniqueID} `, `background: #339933; color: #fff`);
        
        const toastRawInstance = this.prepareRawToast(eventController, _ToastNotificationBelonging);
        this.listeners(eventController);
        this.internalRouting(toastRawInstance);
        return eventController.afterClosed$;
    }
    
    internalRouting(_ToastRawInstance: ToastNotificationInterface.IToastNotificationRawState): boolean {
        if (this.isRefListAvailable()) {
            this.sendToProduction(_ToastRawInstance);
            return true;
        } else {
            this.sendToBuffer(_ToastRawInstance);
            return false;
        }
    }
    
    sendToBuffer(_ToastRawInstance: ToastNotificationInterface.IToastNotificationRawState) {
        this.bufferToastRawList.push(_ToastRawInstance);
    }
    
    sendToProduction(_ToastRawInstance: ToastNotificationInterface.IToastNotificationRawState): void {
        const componentRef = this.getComponentRef(_ToastRawInstance);
        if (componentRef) {
            this.toastComponentRefList.push(componentRef);
            componentRef.instance.toastNotificationBelonging = _ToastRawInstance.ToastBelonging;
            this.appendToBodyParentComponent(componentRef);
            
        }
    }
 
    isRefListAvailable(): boolean {
        return this.toastComponentRefList.length < this.toastConfig.productionConfig.GlobalSettings.AllowedNotificationsAtOnce;
    }
    
    prepareRawToast(_EventsController: ToastNotificationClass.ToastNotificationEventsController, _ToastNotificationBelonging: ToastNotificationClass.ToastNotificationBelonging): ToastNotificationInterface.IToastNotificationRawState {
        
        const weakMap = new WeakMap();
        weakMap.set(ToastNotificationClass.ToastNotificationEventsController, _EventsController);
        
        return {
            WeakMap       : weakMap,
            ToastBelonging: _ToastNotificationBelonging
        };
    }
    
    getComponentRef(_ToastNotificationRawState: ToastNotificationInterface.IToastNotificationRawState): ComponentRef<any> | null {
        
        const dialogIndex = this.findDialogIndex(_ToastNotificationRawState.ToastBelonging.EntityUniqueID);
        if (dialogIndex === -1) {
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ToastNotificationWrapperComponent);
            return componentFactory.create(new DialogInjector(this.injector, _ToastNotificationRawState.WeakMap));
        }
        return null;
    }
    
    listeners(_EventsController: ToastNotificationClass.ToastNotificationEventsController) {
        
        // Listener for closing dialog
        const closeDialogSubscription = _EventsController.afterClosed$.subscribe((response) => {
            
            // this.removeFromBodyParentComponent(modalIndex);
            this.removeFromBody(response.toastNotificationBelonging.EntityUniqueID);
            closeDialogSubscription.unsubscribe();
        });
    }
    
    appendToBodyParentComponent(_ComponentRef: ComponentRef<any>): void {
        // attach view to ignite lifecycle hooks
        this.appRef.attachView(_ComponentRef.hostView);
        // DOM
        const domElem                 = (_ComponentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        const targetNode: HTMLElement = document.getElementById('toast-wrapper');
        const toastEntity             = document.createElement('div');
        toastEntity.setAttribute('id', _ComponentRef.instance.toastNotificationBelonging.EntityUniqueID);
        toastEntity.className = 'toast-entity';
        toastEntity.prepend(domElem);
        // targetNode.prepend(toastEntity);
        setTimeout(()=> {
            targetNode.prepend(toastEntity);
        }, 200);
        
        
    }
    
    removeFromBody(_EntityUniqueID: string): void {
        
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

    findDialogIndex(_DialogUniqueID: string): number {
        return this.toastComponentRefList.findIndex((item) => {
            return _DialogUniqueID === item.instance.toastNotificationBelonging.EntityUniqueID;
        });
    }
}
