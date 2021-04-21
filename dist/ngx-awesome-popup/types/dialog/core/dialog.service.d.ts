import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Injector, Type } from '@angular/core';
import { DialogClass, DialogInterface } from './model';
export declare class DialogService {
    private componentFactoryResolver;
    private injector;
    private appRef;
    dialogParentComponentRefList: ComponentRef<any>[];
    constructor(componentFactoryResolver: ComponentFactoryResolver, injector: Injector, appRef: ApplicationRef);
    open(_ComponentType: Type<any>, _DialogBelonging: DialogClass.DialogBelonging): DialogInterface.IDialogEventsController;
    getComponentRef(_EventsController: DialogInterface.IDialogEventsController, _DialogBelonging: DialogClass.DialogBelonging): ComponentRef<any> | null;
    listeners(_EventsController: DialogInterface.IDialogEventsController): void;
    childComponentResolver(): void;
    appendToBodyParentComponent(_ComponentRef: ComponentRef<any>): void;
    closeDialogWrapperComponent(_DialogUniqueID: string): void;
    removeFromBodyDialogWrapperComponent(_DialogIndex: number): void;
    findDialogIndex(_DialogUniqueID: string): number;
}
