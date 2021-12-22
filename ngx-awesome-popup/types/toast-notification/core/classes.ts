import { Observable, Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import {
  AppearanceAnimation,
  DialogLayoutDisplay,
  DisappearanceAnimation,
  VerticalPosition
} from '../../../core/enums';
import { DataControl, dispatch } from '../../../core/global-classes';
import { IButton, IDispatch } from '../../../core/global-interfaces';
import { ServiceLocator } from '../../../locator.service';
import { ToastPositionEnum, ToastProgressBarEnum, ToastUserViewTypeEnum } from './enums';
import {
  IGlobalToastSettings,
  IPrivateResponseMerged,
  IToastCoreConfig,
  IToastCustomStyles,
  IToastNotificationBelonging,
  IToastNotificationPublicResponse,
  IToastNotificationResponse
} from './interfaces';
import { ToastNotificationConfigService } from './toast-notification-config.service';
import { ToastNotificationService } from './toast-notification.service';

// region *** Public ***
export class ToastNotificationInitializer {
  private toastNotificationCarrier: ToastNotificationCarrier = new ToastNotificationCarrier();

  constructor() {}

  openToastNotification$(): Observable<IToastNotificationPublicResponse> {
    return this.toastNotificationCarrier.openToastNotification$().pipe(
      map(resp => {
        const basicToastNotificationResponse = new ToastNotificationResponse();
        const dataControl = new DataControl();
        dataControl.copyValuesFrom(resp, basicToastNotificationResponse);
        return basicToastNotificationResponse;
      }),
      take(1)
    );
  }

  setButtons(_Buttons: IButton[]): void {
    this.toastNotificationCarrier.setButtons(_Buttons);
  }

  setConfig(_ToastNotificationConfig: IToastCoreConfig): void {
    this.toastNotificationCarrier.setConfig(_ToastNotificationConfig);
  }

  setDispatch(_Title: string, _Message: string = null): void {
    this.toastNotificationCarrier.setTitle(_Title);
    this.toastNotificationCarrier.setMessage(_Message);
  }

  setTitle(_Title: string): void {
    this.toastNotificationCarrier.setTitle(_Title);
  }

  setMessage(_Message: string): void {
    this.toastNotificationCarrier.setMessage(_Message);
  }

  setButtonLabels(_Confirm: string, _Decline?: string): void {
    this.toastNotificationCarrier.setButtonLabels(_Confirm, _Decline);
  }
}

export class ToastNotificationResponse
  extends DataControl
  implements IToastNotificationResponse, IToastNotificationPublicResponse
{
  // private Response: DialogPrepareResponse            = new DialogPrepareResponse();

  success: boolean = null;
  clickedButtonID: string = null;

  constructor() {
    super();
  }

  setSuccess(_IsSuccess: boolean): void {
    this.success = _IsSuccess;
  }

  setClickedButtonID(_ClickedButtonID): void {
    this.clickedButtonID = _ClickedButtonID;
  }
}

export class ToastNotificationeventsController {
  private readonly _onButtonClick: Subject<IButton> = new Subject<IButton>();
  private readonly _afterClosed: Subject<IPrivateResponseMerged> = new Subject<IPrivateResponseMerged>();
  private readonly _buttonList: Subject<IButton[]> = new Subject<IButton[]>();
  defaultResponse: IPrivateResponseMerged;
  afterClosed$: Observable<IPrivateResponseMerged> = this._afterClosed.asObservable();
  onButtonClick$: Observable<IButton> = this._onButtonClick.asObservable();
  buttonList$: Observable<IButton[]> = this._buttonList.asObservable();

  constructor(private entityUniqueID: string) {}

  close(_Response?: IPrivateResponseMerged): void {
    const response = _Response ? _Response : this.defaultResponse;
    this._afterClosed.next(response);
  }

  onButtonClick(_Button: IButton): void {
    this.defaultResponse.setClickedButtonID(_Button.ID);
    this._onButtonClick.next(_Button);
  }

  setButtonList(_ButtonList: IButton[]): void {
    this._buttonList.next(_ButtonList);
  }

  setDefaultResponse(_Response: IPrivateResponseMerged): void {
    this.defaultResponse = _Response;
  }
}

// endregion

export class ToastNotificationDefaultResponse extends ToastNotificationResponse implements IPrivateResponseMerged {
  toastNotificationBelonging: ToastNotificationBelonging = null;

  constructor() {
    super();
  }

  setBelonging(_ToastNotificationBelonging): void {
    this.toastNotificationBelonging = _ToastNotificationBelonging;
  }
}

export class ToastNotificationCarrier {
  toastNotificationBelonging: ToastNotificationBelonging = new ToastNotificationBelonging();

  constructor() {}

  setButtons(_Buttons: IButton[]): void {
    if (_Buttons.length) {
      this.toastNotificationBelonging.buttons = _Buttons;
    }
  }

  setTitle(_Title: string): void {
    this.toastNotificationBelonging.dispatch.title = _Title;
  }

  setMessage(_Message: string): void {
    this.toastNotificationBelonging.dispatch.message = _Message;
  }

  setButtonLabels(_Confirm: string, _Decline: string): void {
    this.toastNotificationBelonging.toastCoreConfig.confirmLabel = _Confirm;
    this.toastNotificationBelonging.toastCoreConfig.declineLabel = _Decline;
  }

  setConfig(_ToastNotificationBelonging: IToastCoreConfig): void {
    // region *** local UserConfig (defined on place where dialog is called) ***
    const dataControl = new DataControl();
    dataControl.copyValuesFrom(_ToastNotificationBelonging, this.toastNotificationBelonging.toastCoreConfig);
    // endregion
  }

  openToastNotification$(): Observable<IPrivateResponseMerged> {
    if (!this.toastNotificationBelonging.dispatch.title && !this.toastNotificationBelonging.dispatch.message) {
      throw Error('Toast notification can not be without both message and title.');
    }
    const service: ToastNotificationService = ServiceLocator.injector.get(ToastNotificationService);
    return service.openToast$(this.toastNotificationBelonging);
  }
}

export class GlobalToastSettings implements IGlobalToastSettings {
  allowedNotificationsAtOnce: number = null;
}

export class ResetToastGlobalSettings {
  constructor(globalToastConfig?: IGlobalToastSettings) {
    const globalToastConfigService: ToastNotificationConfigService =
      ServiceLocator.injector.get(ToastNotificationConfigService);
    if (globalToastConfigService) {
      globalToastConfigService.setResetGlobalToastConfig(globalToastConfig);
    } else {
      globalToastConfigService.setResetGlobalToastConfig();
    }
  }
}

export class ToastSettings {
  buttons: IButton[] = [];
  toastCoreConfig: IToastCoreConfig = new toastCoreConfig();
  dispatch: IDispatch = new dispatch();
  globalSettings: GlobalToastSettings = new GlobalToastSettings();
}

export class ToastCustomStyles implements IToastCustomStyles {
  titleCSS: string = null;
  textCSS: string = null;
  buttonSectionCSS: string = null;
  buttonCSS: string = null;
}

export class toastCoreConfig implements IToastCoreConfig {
  toastPosition: ToastPositionEnum = null;
  progressBar: ToastProgressBarEnum = null;
  toastUserViewType: ToastUserViewTypeEnum = null;
  openInElementID: string = null;
  buttonPosition: VerticalPosition = null;
  textPosition: VerticalPosition = null;
  layoutType: DialogLayoutDisplay = null;
  dispatch: IDispatch = null;
  confirmLabel: string = null;
  declineLabel: string = null;
  autoCloseDelay: number = null;
  disableIcon: boolean = null;
  allowHtmlMessage: boolean = null;
  animationIn: AppearanceAnimation = null;
  animationOut: DisappearanceAnimation = null;
  customStyles: IToastCustomStyles = new ToastCustomStyles();
  iconStyleClass: string = null;
}

export class ToastNotificationBelonging extends ToastSettings implements IToastNotificationBelonging {
  entityUniqueID: string = 'T' + Math.random().toString(36).substr(2, 9);
  eventsController: ToastNotificationeventsController;

  constructor() {
    super();
    this.eventsController = new ToastNotificationeventsController(this.entityUniqueID);
    const toastNotificationConfigurator: ToastNotificationConfigService =
      ServiceLocator.injector.get(ToastNotificationConfigService);
    const baseSettings = new ToastSettings();
    const dataControl = new DataControl();
    dataControl.copyValuesFrom(
      toastNotificationConfigurator.productionConfig.toastCoreConfig,
      baseSettings.toastCoreConfig
    );
    this.toastCoreConfig = baseSettings.toastCoreConfig;
    this.buttons = toastNotificationConfigurator.productionConfig.buttons.slice();
  }
}
