import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Type
} from '@angular/core';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { DialogInjector } from '../../../core/dialog-injector';
import { GlobalConfigService } from '../../../core/global-config.service';
import { ToastNotificationSimpleWrapperComponent } from '../toast-notification-simple-wrapper/toast-notification-simple-wrapper.component';
import { ToastNotificationWrapperComponent } from '../toast-notification-wrapper/toast-notification-wrapper.component';
import { ToastNotificationBelonging, ToastNotificationeventsController } from './classes';
import { ToastPositionEnum, ToastUserViewTypeEnum } from './enums';
import { IPrivateResponseMerged, IToastNotificationRawState } from './interfaces';

import { ToastNotificationConfigService } from './toast-notification-config.service';

@Injectable({
  providedIn: 'root'
})
export class ToastNotificationService {
  toastComponentRefList: ComponentRef<any>[] = [];
  bufferToastRawList: IToastNotificationRawState[] = [];
  bufferCheckingIntervalIsReady = true;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef,
    private toastConfig: ToastNotificationConfigService,
    private gConfigService: GlobalConfigService
  ) {}

  openToast$(_ToastNotificationBelonging: ToastNotificationBelonging): Observable<IPrivateResponseMerged> {
    const eventController = _ToastNotificationBelonging.eventsController;
    // console.log(`%c ${_ToastNotificationBelonging.entityUniqueID} `, `background: #339933; color: #fff`);

    const toastRawInstance = this.prepareRawToast(eventController, _ToastNotificationBelonging);
    this.listeners(eventController);
    this.internalRouting(toastRawInstance);
    return eventController.afterClosed$;
  }

  internalRouting(_ToastRawInstance: IToastNotificationRawState): boolean {
    if (this.isRefListAvailable()) {
      this.sendToProduction(_ToastRawInstance);
      return true;
    } else {
      this.sendToBuffer(_ToastRawInstance);
      return false;
    }
  }

  sendToBuffer(_ToastRawInstance: IToastNotificationRawState): void {
    this.bufferToastRawList.push(_ToastRawInstance);
  }

  sendToProduction(_ToastRawInstance: IToastNotificationRawState): void {
    const componentRef = this.getComponentRef(_ToastRawInstance);
    if (componentRef) {
      this.toastComponentRefList.push(componentRef);
      componentRef.instance.toastNotificationBelonging = _ToastRawInstance.toastBelonging;
      this.appendToBodyParentComponent(componentRef);
    }
  }

  isRefListAvailable(): boolean {
    return (
      this.toastComponentRefList.length < this.toastConfig.productionConfig.globalSettings.allowedNotificationsAtOnce
    );
  }

  prepareRawToast(
    _eventsController: ToastNotificationeventsController,
    _ToastNotificationBelonging: ToastNotificationBelonging
  ): IToastNotificationRawState {
    const weakMap = new WeakMap();
    weakMap.set(ToastNotificationeventsController, _eventsController);

    return {
      weakMap: weakMap,
      toastBelonging: _ToastNotificationBelonging
    };
  }

  getComponentRef(_ToastNotificationRawState: IToastNotificationRawState): ComponentRef<any> | null {
    const dialogIndex = this.findDialogIndex(_ToastNotificationRawState.toastBelonging.entityUniqueID);
    if (dialogIndex === -1) {
      let toastUserViewComponent: Type<any> = ToastNotificationWrapperComponent;
      if (
        _ToastNotificationRawState.toastBelonging.toastCoreConfig.toastUserViewType === ToastUserViewTypeEnum.SIMPLE
      ) {
        toastUserViewComponent = ToastNotificationSimpleWrapperComponent;
      }
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(toastUserViewComponent);
      return componentFactory.create(new DialogInjector(this.injector, _ToastNotificationRawState.weakMap));
    }
    return null;
  }

  listeners(_eventsController: ToastNotificationeventsController): void {
    // Listener for closing dialog
    const closeDialogSubscription = _eventsController.afterClosed$.subscribe(response => {
      // this.removeFromBodyParentComponent(modalIndex);
      this.removeFromBody(response.toastNotificationBelonging.entityUniqueID);
      closeDialogSubscription.unsubscribe();
    });
  }

  appendToBodyParentComponent(_ComponentRef: ComponentRef<any>): void {
    // attach view to ignite lifecycle hooks
    this.appRef.attachView(_ComponentRef.hostView);

    const toastPosition: ToastPositionEnum =
      _ComponentRef.instance.toastNotificationBelonging.toastCoreConfig.toastPosition;
    const openInElementID = _ComponentRef.instance.toastNotificationBelonging.toastCoreConfig.openInElementID;
    let targetNode: HTMLElement;
    if (!openInElementID) {
      this.setToastWrapperNode(
        _ComponentRef.instance.toastNotificationBelonging.toastCoreConfig.toastPosition,
        this.setToastOverlayNode()
      );
      targetNode = document.getElementById(`toast-wrapper-${toastPosition}`);
    } else {
      targetNode = document.getElementById(openInElementID);
    }

    const domElem = (_ComponentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

    const toastEntity = document.createElement('div');
    toastEntity.setAttribute('id', _ComponentRef.instance.toastNotificationBelonging.entityUniqueID);
    toastEntity.className = 'toast-entity';
    const split = toastPosition.split('-');
    if (split[1] === 'fullwidth') {
      toastEntity.style.width = '93vw';
    } else if (openInElementID) {
      toastEntity.style.width = '100%';
    } else {
      toastEntity.style.width = '300px';
    }
    toastEntity.style.margin = 'auto';
    toastEntity.prepend(domElem);
    targetNode.prepend(toastEntity);
    /*setTimeout(() => {
      targetNode.prepend(toastEntity);
    }, 200);*/
  }

  removeFromBody(_entityUniqueID: string): void {
    const modalIndex = this.findDialogIndex(_entityUniqueID);
    if (modalIndex > -1) {
      if (this.bufferToastRawList.length) {
        this.sendToProduction(this.bufferToastRawList[0]);
        this.bufferToastRawList.splice(0, 1);
      }

      this.toastComponentRefList[modalIndex].instance
        .closeParent$()
        .pipe(
          tap(item => {
            const modalIndex = this.findDialogIndex(_entityUniqueID);
            if (this.toastComponentRefList[modalIndex]) {
              const toastEntity = document.getElementById(
                this.toastComponentRefList[modalIndex].instance.toastNotificationBelonging.entityUniqueID
              );
              toastEntity.remove();
              // console.log(`%c ${this.toastComponentRefList[modalIndex].instance.toastNotificationBelonging.entityUniqueID} `, `background: #cc3333; color: #fff`);
              this.appRef.detachView(this.toastComponentRefList[modalIndex].hostView);
              this.toastComponentRefList[modalIndex].destroy();
              this.toastComponentRefList.splice(modalIndex, 1);
            }
          }),
          take(1)
        )
        .subscribe();
    }
  }

  findDialogIndex(_DialogUniqueID: string): number {
    return this.toastComponentRefList.findIndex(item => {
      return _DialogUniqueID === item.instance.toastNotificationBelonging.entityUniqueID;
    });
  }

  private setToastOverlayNode(): HTMLElement {
    const bodyNode = document.body || document.getElementsByTagName('body')[0];
    if (!bodyNode) {
      return;
    }
    // check the overlay
    const toastOverlayNode = document.getElementById('toast-overlay-container') as HTMLStyleElement;

    if (!toastOverlayNode) {
      const toastOverlayNode = document.createElement('div');
      toastOverlayNode.setAttribute('id', 'toast-overlay-container');
      toastOverlayNode.appendChild(document.createTextNode(''));
      toastOverlayNode.style.position = 'fixed';
      toastOverlayNode.style.top = '0';
      toastOverlayNode.style.left = '0';
      toastOverlayNode.style.zIndex = '999999999999';
      bodyNode.appendChild(toastOverlayNode);
      return toastOverlayNode;
    }

    return toastOverlayNode;
  }

  private setToastWrapperNode(_Position: ToastPositionEnum, _ToastOverlayNode: HTMLElement): void {
    const toastWrapperNode = document.getElementById(`toast-wrapper-${_Position}`) as HTMLStyleElement;
    if (!toastWrapperNode) {
      const toastWrapper = document.createElement('div');
      toastWrapper.setAttribute('id', 'toast-wrapper-' + _Position);
      toastWrapper.appendChild(document.createTextNode(''));
      _ToastOverlayNode.prepend(toastWrapper);

      const split = _Position.split('-');

      if (split[1] === 'right' || split[1] === 'left') {
        this.gConfigService
          .getSheet('ngx-awesome-popup-styles')
          .addRule(
            `#toast-wrapper-${_Position}`,
            `${split[0]}: 20px; ${split[1]}: 20px; position: fixed; z-index: 999999999;`
          );
      }
      if (split[1] === 'center') {
        this.gConfigService
          .getSheet('ngx-awesome-popup-styles')
          .addRule(
            `#toast-wrapper-${_Position}`,
            `${split[0]}: 20px; width: 100%; position: fixed; z-index: 999999999; pointer-events: none;`
          );
      }
      if (split[1] === 'fullwidth') {
        this.gConfigService
          .getSheet('ngx-awesome-popup-styles')
          .addRule(
            `#toast-wrapper-${_Position}`,
            `${split[0]}: 10px; width: 100%; position: fixed; z-index: 999999999; pointer-events: none;`
          );
      }
    }
  }
}
