import { Observable, Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import {
  AppearanceAnimation,
  DialogLayoutDisplay,
  DisappearanceAnimation,
  VerticalPosition
} from '../../../core/enums';
import { DataControl, Dispatch } from '../../../core/global-classes';
import { IButton, IDispatch } from '../../../core/global-interfaces';
import { ServiceLocator } from '../../../locator.service';
import { ToastPositionEnum, ToastProgressBarEnum, ToastUserViewTypeEnum } from './enums';
import {
  IGlobalToastSettings,
  IPrivateResponseMerged,
  IToastCoreConfig,
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

  setConfig(_ToastNotificationConfig: IToastCoreConfig) {
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
  implements IToastNotificationResponse, IToastNotificationPublicResponse {
  // private Response: DialogPrepareResponse            = new DialogPrepareResponse();

  Success: boolean = null;
  ClickedButtonID: string = null;

  constructor() {
    super();
  }

  setSuccess(_IsSuccess: boolean): void {
    this.Success = _IsSuccess;
  }

  setClickedButtonID(_ClickedButtonID): void {
    this.ClickedButtonID = _ClickedButtonID;
  }
}

export class ToastNotificationEventsController {
  defaultResponse: IPrivateResponseMerged;

  private readonly _afterClosed: Subject<IPrivateResponseMerged> = new Subject<IPrivateResponseMerged>();
  afterClosed$: Observable<IPrivateResponseMerged> = this._afterClosed.asObservable();
  private readonly _onButtonClick: Subject<IButton> = new Subject<IButton>();
  onButtonClick$: Observable<IButton> = this._onButtonClick.asObservable();
  private readonly _buttonList: Subject<IButton[]> = new Subject<IButton[]>();
  buttonList$: Observable<IButton[]> = this._buttonList.asObservable();

  constructor(private EntityUniqueID: string) {}

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

  setButtons(_Buttons: IButton[]) {
    if (_Buttons.length) {
      this.toastNotificationBelonging.Buttons = _Buttons;
    }
  }

  setTitle(_Title: string): void {
    this.toastNotificationBelonging.Dispatch.Title = _Title;
  }

  setMessage(_Message: string): void {
    this.toastNotificationBelonging.Dispatch.Message = _Message;
  }

  setButtonLabels(_Confirm: string, _Decline: string): void {
    this.toastNotificationBelonging.ToastCoreConfig.ConfirmLabel = _Confirm;
    this.toastNotificationBelonging.ToastCoreConfig.DeclineLabel = _Decline;
  }

  setConfig(_ToastNotificationBelonging: IToastCoreConfig) {
    // region *** local UserConfig (defined on place where dialog is called) ***
    const dataControl = new DataControl();
    dataControl.copyValuesFrom(_ToastNotificationBelonging, this.toastNotificationBelonging.ToastCoreConfig);
    // endregion
  }

  openToastNotification$(): Observable<IPrivateResponseMerged> {
    if (!this.toastNotificationBelonging.Dispatch.Title && !this.toastNotificationBelonging.Dispatch.Message) {
      throw Error('Toast notification can not be without both message and title.');
    }
    const service: ToastNotificationService = ServiceLocator.injector.get(ToastNotificationService);
    return service.openToast$(this.toastNotificationBelonging);
  }
}

export class GlobalToastSettings implements IGlobalToastSettings {
  AllowedNotificationsAtOnce: number = null;
}

export class ResetToastGlobalSettings {
  constructor(globalToastConfig?: IGlobalToastSettings) {
    const globalToastConfigService: ToastNotificationConfigService = ServiceLocator.injector.get(
      ToastNotificationConfigService
    );
    if (globalToastConfigService) {
      globalToastConfigService.setResetGlobalToastConfig(globalToastConfig);
    } else {
      globalToastConfigService.setResetGlobalToastConfig();
    }
  }
}

export class ToastSettings {
  Buttons: IButton[] = [];
  ToastCoreConfig: IToastCoreConfig = new ToastCoreConfig();
  Dispatch: IDispatch = new Dispatch();
  GlobalSettings: GlobalToastSettings = new GlobalToastSettings();
}

export class ToastCoreConfig implements IToastCoreConfig {
  ToastPosition: ToastPositionEnum = null;
  ProgressBar: ToastProgressBarEnum = null;
  ToastUserViewType: ToastUserViewTypeEnum = null;
  OpenInElementID: string = null;
  ButtonPosition: VerticalPosition = null;
  TextPosition: VerticalPosition = null;
  LayoutType: DialogLayoutDisplay = null;
  Dispatch: IDispatch = null;
  ConfirmLabel: string = null;
  DeclineLabel: string = null;
  AutoCloseDelay: number = null;
  DisableIcon: boolean = null;
  AllowHTMLMessage: boolean = null;
  AnimationIn: AppearanceAnimation = null;
  AnimationOut: DisappearanceAnimation = null;
}

export class ToastNotificationBelonging extends ToastSettings implements IToastNotificationBelonging {
  EntityUniqueID: string = 'T' + Math.random().toString(36).substr(2, 9);
  EventsController: ToastNotificationEventsController;

  constructor() {
    super();
    this.EventsController = new ToastNotificationEventsController(this.EntityUniqueID);
    const toastNotificationConfigurator: ToastNotificationConfigService = ServiceLocator.injector.get(
      ToastNotificationConfigService
    );
    const baseSettings = new ToastSettings();
    const dataControl = new DataControl();
    dataControl.copyValuesFrom(
      toastNotificationConfigurator.productionConfig.ToastCoreConfig,
      baseSettings.ToastCoreConfig
    );
    this.ToastCoreConfig = baseSettings.ToastCoreConfig;
    this.Buttons = toastNotificationConfigurator.productionConfig.Buttons.slice();
  }
}
