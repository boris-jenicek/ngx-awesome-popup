import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Type
} from '@angular/core';
import { map } from 'rxjs/operators';
import { DialogInjector } from '../../../core/dialog-injector';
import { DialogWrapperComponent } from '../dialog-wrapper/dialog-wrapper.component';
import { DialogBelonging, DialogEventsController } from './classes';
import { IDialogEventsController } from './interfaces';

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

  open(_ComponentType: Type<any>, _DialogBelonging: DialogBelonging): IDialogEventsController {
    const dialogController = _DialogBelonging.EventsController;
    const componentRef = this.getComponentRef(dialogController, _DialogBelonging);

    this.dialogParentComponentRefList.push(componentRef);
    componentRef.instance.dialogBelonging = _DialogBelonging;
    componentRef.instance.childComponentType = _ComponentType;

    this.appendToBodyParentComponent(componentRef);

    this.listeners(dialogController);

    return dialogController;
  }

  getComponentRef(
    _EventsController: IDialogEventsController,
    _DialogBelonging: DialogBelonging
  ): ComponentRef<any> | null {
    let componentFactory;

    const dialogIndex = this.findDialogIndex(_DialogBelonging.EntityUniqueID);
    if (dialogIndex === -1) {
      const weakMap = new WeakMap();
      weakMap.set(DialogEventsController, _EventsController);

      componentFactory = this.componentFactoryResolver.resolveComponentFactory(DialogWrapperComponent);
      return componentFactory.create(new DialogInjector(this.injector, weakMap));
    }

    return null;
  }

  listeners(_EventsController: IDialogEventsController) {
    // Listener for closing dialog
    const closeDialogSubscription = _EventsController.afterClosed$.subscribe(response => {
      const modalIndex = this.findDialogIndex(response.DialogBelonging.EntityUniqueID);
      this.removeFromBodyDialogWrapperComponent(modalIndex);
      closeDialogSubscription.unsubscribe();
    });

    // Listener for turning off loader
    const closeLoaderSubscription = _EventsController.afterLoader$.subscribe((_DialogUniqueID: string) => {
      if (_DialogUniqueID) {
        const modalIndex = this.findDialogIndex(_DialogUniqueID);
        if (modalIndex !== -1) {
          this.dialogParentComponentRefList[modalIndex].instance.closeLoader();
        }
      }

      closeLoaderSubscription.unsubscribe();
    });
  }

  childComponentResolver() {}

  appendToBodyParentComponent(_ComponentRef: ComponentRef<any>): void {
    // attach view to ignite lifecycle hooks
    this.appRef.attachView(_ComponentRef.hostView);

    // DOM
    const domElem = (_ComponentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
  }

  closeDialogWrapperComponent(_DialogUniqueID: string) {
    const modalIndex = this.findDialogIndex(_DialogUniqueID);
    this.removeFromBodyDialogWrapperComponent(modalIndex);
  }

  removeFromBodyDialogWrapperComponent(_DialogIndex: number): void {
    if (_DialogIndex > -1) {
      this.dialogParentComponentRefList[_DialogIndex].instance
        .closeParent$()
        .pipe(
          map(item => {
            this.appRef.detachView(this.dialogParentComponentRefList[_DialogIndex].hostView);
            this.dialogParentComponentRefList[_DialogIndex].destroy();
            this.dialogParentComponentRefList.splice(_DialogIndex, 1);
          })
        )
        .subscribe();
    }
  }

  findDialogIndex(_DialogUniqueID: string): number {
    return this.dialogParentComponentRefList.findIndex(item => {
      return _DialogUniqueID === item.instance.dialogBelonging.EntityUniqueID;
    });
  }
}
