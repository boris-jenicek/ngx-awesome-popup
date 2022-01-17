import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Injector } from '@angular/core';
import { ConfirmBoxWrapperComponent } from '../confirm-box-wrapper/confirm-box-wrapper.component';
import { ConfirmBoxBelonging, ConfirmBoxeventsController } from './classes';
import * as i0 from "@angular/core";
export declare class ConfirmBoxService {
    private componentFactoryResolver;
    private injector;
    private appRef;
    confirmBoxComponentRefList: ComponentRef<ConfirmBoxWrapperComponent>[];
    constructor(componentFactoryResolver: ComponentFactoryResolver, injector: Injector, appRef: ApplicationRef);
    open(_ConfirmBoxBelonging: ConfirmBoxBelonging): ConfirmBoxeventsController;
    getComponentRef(_eventsController: ConfirmBoxeventsController, _ConfirmBoxBelonging: ConfirmBoxBelonging): ComponentRef<any> | null;
    listeners(_eventsController: ConfirmBoxeventsController): void;
    appendToBodyParentComponent(_ComponentRef: ComponentRef<any>): void;
    closeDialogWrapperComponent(_DialogUniqueID: string): void;
    removeFromBodyParentComponent(_DialogIndex: number): void;
    findDialogIndex(_DialogUniqueID: string): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfirmBoxService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConfirmBoxService>;
}
