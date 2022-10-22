import { ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector } from '@angular/core';
import { take, tap } from 'rxjs/operators';
import { DialogInjector } from '../../../core/dialog-injector';
import { GlobalConfigService } from '../../../core/global-config.service';
import { ConfirmBoxWrapperComponent } from '../confirm-box-wrapper/confirm-box-wrapper.component';
import { ConfirmBoxBelonging, ConfirmBoxeventsController } from './classes';

@Injectable({
  providedIn: 'root'
})
export class ConfirmBoxService {
  confirmBoxComponentRefList: ComponentRef<ConfirmBoxWrapperComponent>[] = [];

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef,
    private gConfigService: GlobalConfigService
  ) {}

  open(_ConfirmBoxBelonging: ConfirmBoxBelonging): ConfirmBoxeventsController {
    const dialogController = _ConfirmBoxBelonging.eventsController;
    const componentRef = this.getComponentRef(dialogController, _ConfirmBoxBelonging);

    this.confirmBoxComponentRefList.push(componentRef);
    componentRef.instance.confirmBoxBelonging = _ConfirmBoxBelonging;

    this.appendToBodyParentComponent(componentRef);

    this.listeners(dialogController);

    return dialogController;
  }

  getComponentRef(_eventsController: ConfirmBoxeventsController, _ConfirmBoxBelonging: ConfirmBoxBelonging): ComponentRef<any> | null {
    let componentFactory;

    const dialogIndex = this.findDialogIndex(_ConfirmBoxBelonging.entityUniqueID);
    if (dialogIndex === -1) {
      const weakMap = new WeakMap();
      weakMap.set(ConfirmBoxeventsController, _eventsController);

      componentFactory = this.componentFactoryResolver.resolveComponentFactory(ConfirmBoxWrapperComponent);
      return componentFactory.create(new DialogInjector(this.injector, weakMap));
    }

    return null;
  }

  listeners(_eventsController: ConfirmBoxeventsController): void {
    // Listener for closing dialog
    const closeDialogSubscription = _eventsController.afterClosed$.subscribe(response => {
      const modalIndex = this.findDialogIndex(response.confirmBoxBelonging.entityUniqueID);
      this.removeFromBodyParentComponent(modalIndex);
      closeDialogSubscription.unsubscribe();
    });
  }

  appendToBodyParentComponent(_ComponentRef: ComponentRef<any>): void {
    // attach view to ignite lifecycle hooks
    this.appRef.attachView(_ComponentRef.hostView);

    // DOM
    const domElem = (_ComponentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
  }

  closeDialogWrapperComponent(_DialogUniqueID: string): void {
    const modalIndex = this.findDialogIndex(_DialogUniqueID);
    this.removeFromBodyParentComponent(modalIndex);
  }

  removeFromBodyParentComponent(_DialogIndex: number): void {
    if (_DialogIndex > -1) {
      this.confirmBoxComponentRefList[_DialogIndex].instance
        .closeParent$()
        .pipe(
          tap(item => {
            this.appRef.detachView(this.confirmBoxComponentRefList[_DialogIndex].hostView);
            this.confirmBoxComponentRefList[_DialogIndex].destroy();
            this.confirmBoxComponentRefList.splice(_DialogIndex, 1);
          }),
          take(1)
        )
        .subscribe();
    }
  }

  findDialogIndex(_DialogUniqueID: string): number {
    return this.confirmBoxComponentRefList.findIndex(item => {
      return _DialogUniqueID === item.instance.confirmBoxBelonging.entityUniqueID;
    });
  }
}
