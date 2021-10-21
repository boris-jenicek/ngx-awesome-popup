import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Injector } from '@angular/core';
import { ConfirmBoxWrapperComponent } from '../confirm-box-wrapper/confirm-box-wrapper.component';
import { ConfirmBoxBelonging, ConfirmBoxEventsController } from './classes';
export declare class ConfirmBoxService {
    private componentFactoryResolver;
    private injector;
    private appRef;
    confirmBoxComponentRefList: ComponentRef<ConfirmBoxWrapperComponent>[];
    constructor(componentFactoryResolver: ComponentFactoryResolver, injector: Injector, appRef: ApplicationRef);
    open(_ConfirmBoxBelonging: ConfirmBoxBelonging): ConfirmBoxEventsController;
    getComponentRef(_EventsController: ConfirmBoxEventsController, _ConfirmBoxBelonging: ConfirmBoxBelonging): ComponentRef<any> | null;
    listeners(_EventsController: ConfirmBoxEventsController): void;
    appendToBodyParentComponent(_ComponentRef: ComponentRef<any>): void;
    closeDialogWrapperComponent(_DialogUniqueID: string): void;
    removeFromBodyParentComponent(_DialogIndex: number): void;
    findDialogIndex(_DialogUniqueID: string): number;
}
