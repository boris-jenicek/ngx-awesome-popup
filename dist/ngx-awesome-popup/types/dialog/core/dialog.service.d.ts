import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Injector, Type } from '@angular/core';
import { DialogClass } from './model';
export declare class DialogService {
    private componentFactoryResolver;
    private injector;
    private appRef;
    dialogParentComponentRefList: ComponentRef<any>[];
    constructor(componentFactoryResolver: ComponentFactoryResolver, injector: Injector, appRef: ApplicationRef);
    open(_ComponentType: Type<any>, _DialogBelonging: DialogClass.DialogBelonging): DialogClass.DialogEventsController;
    getComponentRef(_EventsController: DialogClass.DialogEventsController, _DialogBelonging: DialogClass.DialogBelonging): ComponentRef<any> | null;
    listeners(_EventsController: DialogClass.DialogEventsController): void;
    childComponentResolver(): void;
    appendToBodyParentComponent(_ComponentRef: ComponentRef<any>): void;
    closeDialogWrapperComponent(_DialogUniqueID: string): void;
    removeFromBodyDialogWrapperComponent(_DialogIndex: number): void;
    findDialogIndex(_DialogUniqueID: string): number;
}
