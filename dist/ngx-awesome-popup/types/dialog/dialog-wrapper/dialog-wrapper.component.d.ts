import { AfterViewInit, ChangeDetectorRef, ComponentFactoryResolver, ComponentRef, OnDestroy, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { InsertionDirective } from '../../../core/insertion.directive';
import { InsertionLoaderDirective } from '../../../core/insertion-loader.directive';
import { DialogClass } from '../core/model';
export declare class DialogWrapperComponent implements AfterViewInit, OnDestroy {
    dialogBelonging: DialogClass.DialogBelonging;
    private componentFactoryResolver;
    private cd;
    fadeInOutAnimation: string;
    showLoader: boolean;
    childComponentRef: ComponentRef<any>;
    childComponentType: Type<any>;
    loaderComponentRef: ComponentRef<any>;
    insertionPoint: InsertionDirective;
    loaderInsertionPoint: InsertionLoaderDirective;
    constructor(dialogBelonging: DialogClass.DialogBelonging, componentFactoryResolver: ComponentFactoryResolver, cd: ChangeDetectorRef);
    ngAfterViewInit(): void;
    setDefaultResponse(): void;
    ngOnDestroy(): void;
    loadChildComponent(_ComponentType: Type<any>): void;
    loadLoaderComponent(_LoaderRef: Type<any>): void;
    close(): void;
    closeParent$(_ClosingAnimation: string): Observable<any>;
    onOverlayClicked(evt: MouseEvent): void;
    onCustomButton(_Button: any): void;
    closeLoader(): void;
}
