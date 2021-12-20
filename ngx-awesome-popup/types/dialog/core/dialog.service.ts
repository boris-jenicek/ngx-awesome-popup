import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Type
} from '@angular/core';
import { take, tap } from 'rxjs/operators';
import { DialogInjector } from '../../../core/dialog-injector';
import { DialogWrapperComponent } from '../dialog-wrapper/dialog-wrapper.component';
import { DialogBelonging, DialogeventsController } from './classes';
import { IDialogeventsController } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  dialogParentComponentRefList: ComponentRef<any>[] = [];

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef
  ) {}

  open(_ComponentType: Type<any>, _DialogBelonging: DialogBelonging): IDialogeventsController {
    const dialogController = _DialogBelonging.eventsController;
    const componentRef = this.getComponentRef(dialogController, _DialogBelonging);

    this.dialogParentComponentRefList.push(componentRef);
    componentRef.instance.dialogBelonging = _DialogBelonging;
    componentRef.instance.childComponentType = _ComponentType;

    this.appendToBodyParentComponent(componentRef);

    this.listeners(dialogController);

    return dialogController;
  }

  getComponentRef(
    _eventsController: IDialogeventsController,
    _DialogBelonging: DialogBelonging
  ): ComponentRef<any> | null {
    let componentFactory;

    const dialogIndex = this.findDialogIndex(_DialogBelonging.entityUniqueID);
    if (dialogIndex === -1) {
      const weakMap = new WeakMap();
      weakMap.set(DialogeventsController, _eventsController);

      componentFactory = this.componentFactoryResolver.resolveComponentFactory(DialogWrapperComponent);
      return componentFactory.create(new DialogInjector(this.injector, weakMap));
    }

    return null;
  }

  listeners(_eventsController: IDialogeventsController): void {
    // Listener for closing dialog
    const closeDialogSubscription = _eventsController.afterClosed$.subscribe(response => {
      const modalIndex = this.findDialogIndex(response.DialogBelonging.entityUniqueID);
      this.removeFromBodyDialogWrapperComponent(modalIndex);
      closeDialogSubscription.unsubscribe();
    });

    // Listener for turning off loader
    const closeLoaderSubscription = _eventsController.afterLoader$.subscribe((_DialogUniqueID: string) => {
      if (_DialogUniqueID) {
        const modalIndex = this.findDialogIndex(_DialogUniqueID);
        if (modalIndex !== -1) {
          this.dialogParentComponentRefList[modalIndex].instance.closeLoader();
        }
      }

      closeLoaderSubscription.unsubscribe();
    });
  }

  childComponentResolver(): void {}

  appendToBodyParentComponent(_ComponentRef: ComponentRef<any>): void {
    // attach view to ignite lifecycle hooks
    this.appRef.attachView(_ComponentRef.hostView);

    // DOM
    const domElem = (_ComponentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
  }

  closeDialogWrapperComponent(_DialogUniqueID: string): void {
    const modalIndex = this.findDialogIndex(_DialogUniqueID);
    this.removeFromBodyDialogWrapperComponent(modalIndex);
  }

  removeFromBodyDialogWrapperComponent(_DialogIndex: number): void {
    if (_DialogIndex > -1) {
      this.dialogParentComponentRefList[_DialogIndex].instance
        .closeParent$()
        .pipe(
          tap(item => {
            this.appRef.detachView(this.dialogParentComponentRefList[_DialogIndex].hostView);
            this.dialogParentComponentRefList[_DialogIndex].destroy();
            this.dialogParentComponentRefList.splice(_DialogIndex, 1);
          }),
          take(1)
        )
        .subscribe();
    }
  }

  findDialogIndex(_DialogUniqueID: string): number {
    return this.dialogParentComponentRefList.findIndex(item => {
      return _DialogUniqueID === item.instance.dialogBelonging.entityUniqueID;
    });
  }
}
