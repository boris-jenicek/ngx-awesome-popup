import { Observable, Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AppearanceAnimation, DialogLayoutDisplay, DisappearanceAnimation, VerticalPosition } from '../../../core/enums';
import { DataControl, dispatch } from '../../../core/global-classes';
import { IButton, IDispatch } from '../../../core/global-interfaces';
import { ServiceLocator } from '../../../locator.service';
import { ConfirmBoxConfigService } from './confirm-box-config.service';
import { ConfirmBoxService } from './confirm-box-service';
import {
  IConfirmBoxBelonging,
  IConfirmBoxCoreConfig,
  IConfirmBoxCustomStyles,
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

  setConfig(_ConfirmBoxCoreConfig: IConfirmBoxCoreConfig): void {
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

export class ConfirmBoxResponse extends DataControl implements IConfirmBoxResponse, IConfirmBoxPublicResponse {
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

export class ConfirmBoxeventsController {
  private readonly _afterClosed: Subject<IPrivateResponseMerged> = new Subject<IPrivateResponseMerged>();
  private readonly _onButtonClick: Subject<IButton> = new Subject<IButton>();
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

export class ConfirmBoxDefaultResponse extends ConfirmBoxResponse implements IPrivateResponseMerged {
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

  setButtons(_Buttons: IButton[]): void {
    if (_Buttons.length) {
      this.confirmBoxBelonging.buttons = _Buttons;
    }
  }

  setTitle(_Title: string): void {
    this.confirmBoxBelonging.dispatch.title = _Title;
  }

  setMessage(_Message: string): void {
    this.confirmBoxBelonging.dispatch.message = _Message;
  }

  setButtonLabels(_Confirm: string, _Decline: string): void {
    this.confirmBoxBelonging.confirmBoxCoreConfig.confirmLabel = _Confirm;
    this.confirmBoxBelonging.confirmBoxCoreConfig.declineLabel = _Decline;
  }

  setConfig(_ConfirmBoxBelonging: IConfirmBoxCoreConfig): void {
    // region *** local UserConfig (defined on place where dialog is called) ***
    const dataControl = new DataControl();
    dataControl.copyValuesFrom(_ConfirmBoxBelonging, this.confirmBoxBelonging.confirmBoxCoreConfig);
    // endregion
  }

  openConfirmBox$(): Observable<IPrivateResponseMerged> {
    const service: ConfirmBoxService = ServiceLocator.injector.get(ConfirmBoxService);
    const confirmBoxController = service.open(this.confirmBoxBelonging);
    return confirmBoxController.afterClosed$;
  }
}

export class ConfirmBoxSettings {
  buttons: IButton[] = [];
  confirmBoxCoreConfig: IConfirmBoxCoreConfig = new confirmBoxCoreConfig();
  dispatch: IDispatch = new dispatch();
}

export class ConfirmBoxCustomStyles implements IConfirmBoxCustomStyles {
  titleCSS: string = null;
  textCSS: string = null;
  buttonSectionCSS: string = null;
  buttonCSS: string = null;
  wrapperCSS: string = null;
}

export class confirmBoxCoreConfig implements IConfirmBoxCoreConfig {
  width: string = null;
  height: string = null;
  buttonPosition: VerticalPosition = null;
  layoutType: DialogLayoutDisplay = null;
  dispatch: IDispatch = null;
  confirmLabel: string = null;
  declineLabel: string = null;
  disableIcon: boolean = null;
  allowHtmlMessage: boolean = null;
  animationIn: AppearanceAnimation = null;
  animationOut: DisappearanceAnimation = null;
  customStyles: ConfirmBoxCustomStyles = new ConfirmBoxCustomStyles();
  iconStyleClass: string = null;
}

export class ConfirmBoxBelonging extends ConfirmBoxSettings implements IConfirmBoxBelonging {
  entityUniqueID: string = 'C' + Math.random().toString(36).substr(2, 9);
  eventsController: ConfirmBoxeventsController;

  constructor() {
    super();
    this.eventsController = new ConfirmBoxeventsController(this.entityUniqueID);
    const ConfirmBoxCoreConfigurator: ConfirmBoxConfigService = ServiceLocator.injector.get(ConfirmBoxConfigService);
    const baseSettings = new ConfirmBoxSettings();
    const dataControl = new DataControl();
    dataControl.copyValuesFrom(ConfirmBoxCoreConfigurator.productionConfig.confirmBoxCoreConfig, baseSettings.confirmBoxCoreConfig);
    this.confirmBoxCoreConfig = baseSettings.confirmBoxCoreConfig;
    this.buttons = ConfirmBoxCoreConfigurator.productionConfig.buttons.slice();
  }
}
