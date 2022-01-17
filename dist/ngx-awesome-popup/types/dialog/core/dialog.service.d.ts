import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Injector, Type } from '@angular/core';
import { DialogBelonging } from './classes';
import { IDialogeventsController } from './interfaces';
import * as i0 from "@angular/core";
export declare class DialogService {
    private componentFactoryResolver;
    private injector;
    private appRef;
    dialogParentComponentRefList: ComponentRef<any>[];
    constructor(componentFactoryResolver: ComponentFactoryResolver, injector: Injector, appRef: ApplicationRef);
    open(_ComponentType: Type<any>, _DialogBelonging: DialogBelonging): IDialogeventsController;
    getComponentRef(_eventsController: IDialogeventsController, _DialogBelonging: DialogBelonging): ComponentRef<any> | null;
    listeners(_eventsController: IDialogeventsController): void;
    childComponentResolver(): void;
    appendToBodyParentComponent(_ComponentRef: ComponentRef<any>): void;
    closeDialogWrapperComponent(_DialogUniqueID: string): void;
    removeFromBodyDialogWrapperComponent(_DialogIndex: number): void;
    findDialogIndex(_DialogUniqueID: string): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<DialogService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DialogService>;
}
