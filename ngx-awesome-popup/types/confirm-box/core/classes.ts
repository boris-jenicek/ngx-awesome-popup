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
import { ConfirmBoxConfigService } from './confirm-box-config.service';
import { ConfirmBoxService } from './confirm-box-service';
import {
  IConfirmBoxBelonging,
  IConfirmBoxCoreConfig,
  IConfirmBoxPublicResponse,
  IConfirmBoxResponse,
  IPrivateResponseMerged
} from './interfaces';

export class ConfirmBoxInitializer {
  /** @internal */
  private confirmBoxCarrier: ConfirmBoxCarrier = new ConfirmBoxCarrier();

  constructor() {}

  openConfirmBox$(): Observable<IConfirmBoxPublicResponse> {
    return this.confirmBoxCarrier.openConfirmBox$().pipe(
      map(resp => {
        const basicConfirmBoxResponse = new ConfirmBoxResponse();
        const dataControl = new DataControl();
        dataControl.copyValuesFrom(resp, basicConfirmBoxResponse);
        return basicConfirmBoxResponse;
      }),
      take(1)
    );
  }

  setButtons(_Buttons: IButton[]): void {
    this.confirmBoxCarrier.setButtons(_Buttons);
  }

  setConfig(_ConfirmBoxCoreConfig: IConfirmBoxCoreConfig) {
    this.confirmBoxCarrier.setConfig(_ConfirmBoxCoreConfig);
  }

  setDispatch(_Title: string, _Message: string = null): void {
    this.confirmBoxCarrier.setTitle(_Title);
    this.confirmBoxCarrier.setMessage(_Message);
  }

  setTitle(_Title: string): void {
    this.confirmBoxCarrier.setTitle(_Title);
  }

  setMessage(_Message: string): void {
    this.confirmBoxCarrier.setMessage(_Message);
  }

  setButtonLabels(_Confirm: string, _Decline?: string): void {
    this.confirmBoxCarrier.setButtonLabels(_Confirm, _Decline);
  }
}

export class ConfirmBoxResponse
  extends DataControl
  implements IConfirmBoxResponse, IConfirmBoxPublicResponse {
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

export class ConfirmBoxEventsController {
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

export class ConfirmBoxDefaultResponse
  extends ConfirmBoxResponse
  implements IPrivateResponseMerged {
  confirmBoxBelonging: ConfirmBoxBelonging = null;

  constructor() {
    super();
  }

  setBelonging(_ConfirmBoxBelonging): void {
    this.confirmBoxBelonging = _ConfirmBoxBelonging;
  }
}

export class ConfirmBoxCarrier {
  confirmBoxBelonging: ConfirmBoxBelonging = new ConfirmBoxBelonging();

  constructor() {}

  setButtons(_Buttons: IButton[]) {
    if (_Buttons.length) {
      this.confirmBoxBelonging.Buttons = _Buttons;
    }
  }

  setTitle(_Title: string): void {
    this.confirmBoxBelonging.Dispatch.Title = _Title;
  }

  setMessage(_Message: string): void {
    this.confirmBoxBelonging.Dispatch.Message = _Message;
  }

  setButtonLabels(_Confirm: string, _Decline: string): void {
    this.confirmBoxBelonging.ConfirmBoxCoreConfig.ConfirmLabel = _Confirm;
    this.confirmBoxBelonging.ConfirmBoxCoreConfig.DeclineLabel = _Decline;
  }

  setConfig(_ConfirmBoxBelonging: IConfirmBoxCoreConfig) {
    // region *** local UserConfig (defined on place where dialog is called) ***
    const dataControl = new DataControl();
    dataControl.copyValuesFrom(
      _ConfirmBoxBelonging,
      this.confirmBoxBelonging.ConfirmBoxCoreConfig
    );
    // endregion
  }

  openConfirmBox$(): Observable<IPrivateResponseMerged> {
    const service: ConfirmBoxService = ServiceLocator.injector.get(
      ConfirmBoxService
    );
    const confirmBoxController = service.open(this.confirmBoxBelonging);
    return confirmBoxController.afterClosed$;
  }
}

export class ConfirmBoxSettings {
  Buttons: IButton[] = [];
  ConfirmBoxCoreConfig: IConfirmBoxCoreConfig = new ConfirmBoxCoreConfig();
  Dispatch: IDispatch = new Dispatch();
}

export class ConfirmBoxCoreConfig implements IConfirmBoxCoreConfig {
  Width: string = null;
  Height: string = null;
  ButtonPosition: VerticalPosition = null;
  LayoutType: DialogLayoutDisplay = null;
  Dispatch: IDispatch = null;
  ConfirmLabel: string = null;
  DeclineLabel: string = null;
  DisableIcon: boolean = null;
  AllowHTMLMessage: boolean = null;
  AnimationIn: AppearanceAnimation = null;
  AnimationOut: DisappearanceAnimation = null;
}

export class ConfirmBoxBelonging
  extends ConfirmBoxSettings
  implements IConfirmBoxBelonging {
  EntityUniqueID: string = 'C' + Math.random().toString(36).substr(2, 9);
  EventsController: ConfirmBoxEventsController;

  constructor() {
    super();
    this.EventsController = new ConfirmBoxEventsController(this.EntityUniqueID);
    const ConfirmBoxCoreConfigurator: ConfirmBoxConfigService = ServiceLocator.injector.get(
      ConfirmBoxConfigService
    );
    const baseSettings = new ConfirmBoxSettings();
    const dataControl = new DataControl();
    dataControl.copyValuesFrom(
      ConfirmBoxCoreConfigurator.productionConfig.ConfirmBoxCoreConfig,
      baseSettings.ConfirmBoxCoreConfig
    );
    this.ConfirmBoxCoreConfig = baseSettings.ConfirmBoxCoreConfig;
    this.Buttons = ConfirmBoxCoreConfigurator.productionConfig.Buttons.slice();
  }
}
