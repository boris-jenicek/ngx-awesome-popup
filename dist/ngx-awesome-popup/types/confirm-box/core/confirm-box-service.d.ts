import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Injector } from "@angular/core";
import { ConfirmBoxWrapperComponent } from "../confirm-box-wrapper/confirm-box-wrapper.component";
import { ConfirmBoxClass } from "./model";
export declare class ConfirmBoxService {
    private componentFactoryResolver;
    private injector;
    private appRef;
    confirmBoxComponentRefList: ComponentRef<ConfirmBoxWrapperComponent>[];
    constructor(componentFactoryResolver: ComponentFactoryResolver, injector: Injector, appRef: ApplicationRef);
    open(_ConfirmBoxBelonging: ConfirmBoxClass.ConfirmBoxBelonging): ConfirmBoxClass.ConfirmBoxEventsController;
    getComponentRef(_EventsController: ConfirmBoxClass.ConfirmBoxEventsController, _ConfirmBoxBelonging: ConfirmBoxClass.ConfirmBoxBelonging): ComponentRef<any> | null;
    listeners(_EventsController: ConfirmBoxClass.ConfirmBoxEventsController): void;
    appendToBodyParentComponent(_ComponentRef: ComponentRef<any>): void;
    closeDialogWrapperComponent(_DialogUniqueID: string): void;
    removeFromBodyParentComponent(_DialogIndex: number): void;
    findDialogIndex(_DialogUniqueID: string): number;
}
