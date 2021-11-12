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
import { map } from 'rxjs/operators';
import { DialogInjector } from '../../../core/dialog-injector';
import { GlobalConfigService } from '../../../core/global-config.service';
import { ToastNotificationSimpleWrapperComponent } from '../toast-notification-simple-wrapper/toast-notification-simple-wrapper.component';
import { ToastNotificationWrapperComponent } from '../toast-notification-wrapper/toast-notification-wrapper.component';
import { ToastNotificationBelonging, ToastNotificationEventsController } from './classes';
import { ToastPositionEnum, ToastUserViewTypeEnum } from './enums';
import { IPrivateResponseMerged, IToastNotificationRawState } from './interfaces';

import { ToastNotificationConfigService } from './toast-notification-config.service';

@Injectable({
  providedIn: 'root'
})
export class ToastNotificationService {
  toastComponentRefList: ComponentRef<any>[] = [];
  bufferToastRawList: IToastNotificationRawState[] = [];
  bufferCheckingIntervalIsReady: boolean = true;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef,
    private toastConfig: ToastNotificationConfigService,
    private gConfigService: GlobalConfigService
  ) {}

  openToast$(_ToastNotificationBelonging: ToastNotificationBelonging): Observable<IPrivateResponseMerged> {
    let eventController = _ToastNotificationBelonging.EventsController;
    // console.log(`%c ${_ToastNotificationBelonging.EntityUniqueID} `, `background: #339933; color: #fff`);

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

  sendToBuffer(_ToastRawInstance: IToastNotificationRawState) {
    this.bufferToastRawList.push(_ToastRawInstance);
  }

  sendToProduction(_ToastRawInstance: IToastNotificationRawState): void {
    const componentRef = this.getComponentRef(_ToastRawInstance);
    if (componentRef) {
      this.toastComponentRefList.push(componentRef);
      componentRef.instance.toastNotificationBelonging = _ToastRawInstance.ToastBelonging;
      this.appendToBodyParentComponent(componentRef);
    }
  }

  isRefListAvailable(): boolean {
    return (
      this.toastComponentRefList.length < this.toastConfig.productionConfig.GlobalSettings.AllowedNotificationsAtOnce
    );
  }

  prepareRawToast(
    _EventsController: ToastNotificationEventsController,
    _ToastNotificationBelonging: ToastNotificationBelonging
  ): IToastNotificationRawState {
    const weakMap = new WeakMap();
    weakMap.set(ToastNotificationEventsController, _EventsController);

    return {
      WeakMap: weakMap,
      ToastBelonging: _ToastNotificationBelonging
    };
  }

  getComponentRef(_ToastNotificationRawState: IToastNotificationRawState): ComponentRef<any> | null {
    const dialogIndex = this.findDialogIndex(_ToastNotificationRawState.ToastBelonging.EntityUniqueID);
    if (dialogIndex === -1) {
      let toastUserViewComponent: Type<any> = ToastNotificationWrapperComponent;
      if (
        _ToastNotificationRawState.ToastBelonging.ToastCoreConfig.ToastUserViewType === ToastUserViewTypeEnum.SIMPLE
      ) {
        toastUserViewComponent = ToastNotificationSimpleWrapperComponent;
      }
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(toastUserViewComponent);
      return componentFactory.create(new DialogInjector(this.injector, _ToastNotificationRawState.WeakMap));
    }
    return null;
  }

  listeners(_EventsController: ToastNotificationEventsController) {
    // Listener for closing dialog
    const closeDialogSubscription = _EventsController.afterClosed$.subscribe(response => {
      // this.removeFromBodyParentComponent(modalIndex);
      this.removeFromBody(response.toastNotificationBelonging.EntityUniqueID);
      closeDialogSubscription.unsubscribe();
    });
  }

  appendToBodyParentComponent(_ComponentRef: ComponentRef<any>): void {
    // attach view to ignite lifecycle hooks
    this.appRef.attachView(_ComponentRef.hostView);

    const toastPosition: ToastPositionEnum =
      _ComponentRef.instance.toastNotificationBelonging.ToastCoreConfig.ToastPosition;
    const openInElementID = _ComponentRef.instance.toastNotificationBelonging.ToastCoreConfig.OpenInElementID;
    let targetNode: HTMLElement;
    if (!openInElementID) {
      this.setToastWrapperNode(
        _ComponentRef.instance.toastNotificationBelonging.ToastCoreConfig.ToastPosition,
        this.setToastOverlayNode()
      );
      targetNode = document.getElementById(`toast-wrapper-${toastPosition}`);
    } else {
      targetNode = document.getElementById(openInElementID);
    }

    const domElem = (_ComponentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

    const toastEntity = document.createElement('div');
    toastEntity.setAttribute('id', _ComponentRef.instance.toastNotificationBelonging.EntityUniqueID);
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

  removeFromBody(_EntityUniqueID: string): void {
    const modalIndex = this.findDialogIndex(_EntityUniqueID);
    if (modalIndex > -1) {
      if (this.bufferToastRawList.length) {
        this.sendToProduction(this.bufferToastRawList[0]);
        this.bufferToastRawList.splice(0, 1);
      }

      this.toastComponentRefList[modalIndex].instance
        .closeParent$()
        .pipe(
          map(item => {
            const modalIndex = this.findDialogIndex(_EntityUniqueID);
            if (this.toastComponentRefList[modalIndex]) {
              const toastEntity = document.getElementById(
                this.toastComponentRefList[modalIndex].instance.toastNotificationBelonging.EntityUniqueID
              );
              toastEntity.remove();
              // console.log(`%c ${this.toastComponentRefList[modalIndex].instance.toastNotificationBelonging.EntityUniqueID} `, `background: #cc3333; color: #fff`);
              this.appRef.detachView(this.toastComponentRefList[modalIndex].hostView);
              this.toastComponentRefList[modalIndex].destroy();
              this.toastComponentRefList.splice(modalIndex, 1);
            }
          })
        )
        .subscribe();
    }
  }

  findDialogIndex(_DialogUniqueID: string): number {
    return this.toastComponentRefList.findIndex(item => {
      return _DialogUniqueID === item.instance.toastNotificationBelonging.EntityUniqueID;
    });
  }

  private setToastOverlayNode(): HTMLElement {
    const bodyNode = document.body || document.getElementsByTagName('body')[0];
    if (!bodyNode) {
      return;
    }
    // check the overlay
    let toastOverlayNode = document.getElementById('toast-overlay-container') as HTMLStyleElement;

    if (!toastOverlayNode) {
      let toastOverlayNode = document.createElement('div');
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

  private setToastWrapperNode(_Position: ToastPositionEnum, _ToastOverlayNode: HTMLElement) {
    let toastWrapperNode = document.getElementById(`toast-wrapper-${_Position}`) as HTMLStyleElement;
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
