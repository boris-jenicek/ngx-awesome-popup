import { Observable, Subject } from "rxjs";
import { map, take, tap } from "rxjs/operators";
import { DialogLayoutDisplay, VerticalPosition } from "../../../core/enums";
import { GlobalClass, GlobalInterface } from "../../../core/global";
import { ServiceLocator } from "../../../locator.service";
import { ToastNotificationConfigService } from "./toast-notification-config.service";
import { ToastNotificationService } from "./toast-notification.service";

export namespace ToastNotificationInterface {
  export interface IToastNotificationUserConfig {
    Buttons?: GlobalInterface.IButton[];
    ToastCoreConfig?: ToastNotificationInterface.IToastCoreConfig;
    Dispatch?: GlobalInterface.IDispatch;
    GlobalSettings?: ToastNotificationInterface.IGlobalToastSettings;
  }

  export interface IGlobalToastSettings {
    /** Number of popups allowed on screen, recommend 3-5 */
    AllowedNotificationsAtOnce: number;
  }

  export interface IToastCoreConfig {
    ToastPosition?: ToastPositionEnum;
    ProgressBar?: ToastProgressBarEnum;
    ToastUserViewType?: ToastUserViewTypeEnum;
    OpenInElementID?: string;
    ButtonPosition?: VerticalPosition;
    TextPosition?: VerticalPosition;
    LayoutType?: DialogLayoutDisplay;
    Dispatch?: GlobalInterface.IDispatch;
    /** Default confirm button Label */
    ConfirmLabel?: string;
    /** Default decline button Label */
    DeclineLabel?: string;
    /** Expressed in milliseconds */
    AutoCloseDelay?: number;
    DisableIcon?: boolean;
    AllowHTMLMessage?: boolean;
  }

  export interface IToastNotificationBelonging {
    Buttons: GlobalInterface.IButton[];
    ToastCoreConfig: ToastNotificationInterface.IToastCoreConfig;
    EntityUniqueID: string;
    EventsController: ToastNotificationClass.ToastNotificationEventsController;
  }

  export interface IToastNotificationResponse {
    setSuccess(_IsSuccess: boolean): void;

    setClickedButtonID(_ClickedButtonID): void;
  }

  export interface IToastNotificationPublicResponse {
    Success: boolean;
    ClickedButtonID: string;
  }

  export interface IPrivateResponseMerged
    extends IToastNotificationResponse,
      GlobalInterface.IPrivateResponse {
    toastNotificationBelonging: ToastNotificationInterface.IToastNotificationBelonging;
  }

  export interface IToastNotificationRawState {
    WeakMap: WeakMap<
      any,
      ToastNotificationClass.ToastNotificationEventsController
    >;
    ToastBelonging: ToastNotificationClass.ToastNotificationBelonging;
  }
}

export namespace ToastNotificationClass {
  // region *** Public ***
  export class ToastNotificationInitializer {
    private toastNotificationCarrier: ToastNotificationClass.ToastNotificationCarrier = new ToastNotificationClass.ToastNotificationCarrier();

    constructor() {}

    openToastNotification$(): Observable<ToastNotificationInterface.IToastNotificationPublicResponse> {
      return this.toastNotificationCarrier.openToastNotification$().pipe(
        map((resp) => {
          const basicToastNotificationResponse = new ToastNotificationResponse();
          const dataControl = new GlobalClass.DataControl();
          dataControl.copyValuesFrom(resp, basicToastNotificationResponse);
          return basicToastNotificationResponse;
        }),
        take(1)
      );
    }

    setButtons(_Buttons: GlobalInterface.IButton[]): void {
      this.toastNotificationCarrier.setButtons(_Buttons);
    }

    setConfig(
      _ToastNotificationConfig: ToastNotificationInterface.IToastCoreConfig
    ) {
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
    extends GlobalClass.DataControl
    implements
      ToastNotificationInterface.IToastNotificationResponse,
      ToastNotificationInterface.IToastNotificationPublicResponse {
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
    defaultResponse: ToastNotificationInterface.IPrivateResponseMerged;

    private readonly _afterClosed: Subject<ToastNotificationInterface.IPrivateResponseMerged> = new Subject<ToastNotificationInterface.IPrivateResponseMerged>();
    afterClosed$: Observable<ToastNotificationInterface.IPrivateResponseMerged> = this._afterClosed.asObservable();
    private readonly _onButtonClick: Subject<GlobalInterface.IButton> = new Subject<GlobalInterface.IButton>();
    onButtonClick$: Observable<GlobalInterface.IButton> = this._onButtonClick.asObservable();
    private readonly _buttonList: Subject<
      GlobalInterface.IButton[]
    > = new Subject<GlobalInterface.IButton[]>();
    buttonList$: Observable<
      GlobalInterface.IButton[]
    > = this._buttonList.asObservable();

    constructor(private EntityUniqueID: string) {}

    close(_Response?: ToastNotificationInterface.IPrivateResponseMerged): void {
      const response = _Response ? _Response : this.defaultResponse;
      this._afterClosed.next(response);
    }

    onButtonClick(_Button: GlobalInterface.IButton): void {
      this.defaultResponse.setClickedButtonID(_Button.ID);
      this._onButtonClick.next(_Button);
    }

    setButtonList(_ButtonList: GlobalInterface.IButton[]): void {
      this._buttonList.next(_ButtonList);
    }

    setDefaultResponse(
      _Response: ToastNotificationInterface.IPrivateResponseMerged
    ): void {
      this.defaultResponse = _Response;
    }
  }

  // endregion

  export class ToastNotificationDefaultResponse
    extends ToastNotificationResponse
    implements ToastNotificationInterface.IPrivateResponseMerged {
    toastNotificationBelonging: ToastNotificationBelonging = null;

    constructor() {
      super();
    }

    setBelonging(_ToastNotificationBelonging): void {
      this.toastNotificationBelonging = _ToastNotificationBelonging;
    }
  }

  export class ToastNotificationCarrier {
    toastNotificationBelonging: ToastNotificationClass.ToastNotificationBelonging = new ToastNotificationClass.ToastNotificationBelonging();

    constructor() {}

    setButtons(_Buttons: GlobalInterface.IButton[]) {
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

    setConfig(
      _ToastNotificationBelonging: ToastNotificationInterface.IToastCoreConfig
    ) {
      // region *** local UserConfig (defined on place where dialog is called) ***
      const dataControl = new GlobalClass.DataControl();
      dataControl.copyValuesFrom(
        _ToastNotificationBelonging,
        this.toastNotificationBelonging.ToastCoreConfig
      );
      // endregion
    }

    openToastNotification$(): Observable<ToastNotificationInterface.IPrivateResponseMerged> {
      if (
        !this.toastNotificationBelonging.Dispatch.Title &&
        !this.toastNotificationBelonging.Dispatch.Message
      ) {
        throw Error(
          "Toast notification can not be without both message and title."
        );
      }
      const service: ToastNotificationService = ServiceLocator.injector.get(
        ToastNotificationService
      );
      return service.openToast$(this.toastNotificationBelonging);
    }
  }

  export class GlobalToastSettings
    implements ToastNotificationInterface.IGlobalToastSettings {
    AllowedNotificationsAtOnce: number = null;
  }

  export class ResetToastGlobalSettings {
    constructor(
      globalToastConfig?: ToastNotificationInterface.IGlobalToastSettings
    ) {
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

  export class Settings {
    Buttons: GlobalInterface.IButton[] = [];
    ToastCoreConfig: ToastNotificationInterface.IToastCoreConfig = new ToastCoreConfig();
    Dispatch: GlobalInterface.IDispatch = new GlobalClass.Dispatch();
    GlobalSettings: GlobalToastSettings = new GlobalToastSettings();
  }

  export class ToastCoreConfig
    implements ToastNotificationInterface.IToastCoreConfig {
    ToastPosition: ToastPositionEnum = null;
    ProgressBar: ToastProgressBarEnum = null;
    ToastUserViewType: ToastUserViewTypeEnum = null;
    OpenInElementID: string = null;
    ButtonPosition: VerticalPosition = null;
    TextPosition: VerticalPosition = null;
    LayoutType: DialogLayoutDisplay = null;
    Dispatch: GlobalInterface.IDispatch = null;
    ConfirmLabel: string = null;
    DeclineLabel: string = null;
    AutoCloseDelay: number = null;
    DisableIcon: boolean = null;
    AllowHTMLMessage: boolean = null;
  }

  export class ToastNotificationBelonging
    extends ToastNotificationClass.Settings
    implements ToastNotificationInterface.IToastNotificationBelonging {
    EntityUniqueID: string = "T" + Math.random().toString(36).substr(2, 9);
    EventsController: ToastNotificationEventsController;

    constructor() {
      super();
      this.EventsController = new ToastNotificationEventsController(
        this.EntityUniqueID
      );
      const toastNotificationConfigurator: ToastNotificationConfigService = ServiceLocator.injector.get(
        ToastNotificationConfigService
      );
      const baseSettings = new ToastNotificationClass.Settings();
      const dataControl = new GlobalClass.DataControl();
      dataControl.copyValuesFrom(
        toastNotificationConfigurator.productionConfig.ToastCoreConfig,
        baseSettings.ToastCoreConfig
      );
      this.ToastCoreConfig = baseSettings.ToastCoreConfig;
      this.Buttons = toastNotificationConfigurator.productionConfig.Buttons.slice();
    }
  }
}

export enum ToastProgressBarEnum {
  NONE = 0,
  INCREASE = 1,
  DECREASE = 2,
}

export enum ToastPositionEnum {
  TOP_LEFT = "top-left",
  TOP_CENTER = "top-center",
  TOP_RIGHT = "top-right",
  TOP_FULL_WIDTH = "top-fullwidth",
  BOTTOM_LEFT = "bottom-left",
  BOTTOM_CENTER = "bottom-center",
  BOTTOM_RIGHT = "bottom-right",
  BOTTOM_FULL_WIDTH = "bottom-fullwidth",
}

export enum ToastUserViewTypeEnum {
  SIMPLE = "simple",
  STANDARD = "standard",
}
