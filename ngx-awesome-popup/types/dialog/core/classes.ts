import { Type } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import {
  AppearanceAnimation,
  DialogLayoutDisplay,
  DisappearanceAnimation,
  VerticalPosition
} from '../../../core/enums';
import { DataControl, Sizes } from '../../../core/global-classes';
import { IButton } from '../../../core/global-interfaces';
import { ServiceLocator } from '../../../locator.service';
import { DialogConfigService } from './dialog-config.service';
import { DialogService } from './dialog.service';
import {
  IDialogBelonging,
  IDialogCoreConfig,
  IDialogCustomStyles,
  IDialogEventsController,
  IDialogPublicResponse,
  IDialogResponse,
  IPrivateResponseMerged
} from './interfaces';

// region *** Public ***

export class DialogInitializer {
  private dialogCarrier: DialogCarrier = new DialogCarrier();

  constructor(private component: Type<any>) {
    this.dialogCarrier.setComponent(this.component);
  }

  /** Generic method accept expected payload from dynamic child component.*/
  openDialog$<ResponsePayload = any>(): Observable<IDialogPublicResponse<ResponsePayload>> {
    return this.dialogCarrier.openDialog$().pipe(
      map(resp => {
        const basicDialogResponse = new DialogResponse();
        const dataControl = new DataControl();
        dataControl.copyValuesFrom(resp, basicDialogResponse);
        return basicDialogResponse;
      }),
      take(1)
    );
  }

  /** It accepts list of custom buttons */
  setButtons(_Buttons: IButton[]): void {
    this.dialogCarrier.setButtons(_Buttons);
  }

  setCustomData(_CustomData: any): void {
    this.dialogCarrier.setCustomData(_CustomData);
  }

  setConfig(_DialogConfig: IDialogCoreConfig): void {
    this.dialogCarrier.setConfig(_DialogConfig);
  }
}

export class DialogResponse extends DataControl implements IDialogResponse, IDialogPublicResponse<any> {
  // private Response: DialogPrepareResponse            = new DialogPrepareResponse();

  Payload: any = null;
  Success: boolean = null;
  ClickedButtonID: string = null;

  constructor() {
    super();
  }

  /**
   * @ignore
   */
  setPayload(_Payload: any): void {
    this.Payload = _Payload;
  }

  /**
   * @ignore
   */
  setClickedButtonID(_ClickedButtonID): void {
    this.ClickedButtonID = _ClickedButtonID;
  }
}

export class DialogEventsController implements IDialogEventsController {
  private readonly _afterClosed: Subject<IPrivateResponseMerged> = new Subject<IPrivateResponseMerged>();
  private readonly _afterLoader: any = new Subject<string>();
  private readonly _onButtonClick: Subject<IButton> = new Subject<IButton>();
  private readonly _buttonList: Subject<IButton[]> = new Subject<IButton[]>();
  defaultResponse: IPrivateResponseMerged;
  onButtonClick$: Observable<IButton> = this._onButtonClick.asObservable();
  afterClosed$: Observable<IPrivateResponseMerged> = this._afterClosed.asObservable();
  afterLoader$: Observable<string> = this._afterLoader.asObservable();
  buttonList$: Observable<IButton[]> = this._buttonList.asObservable();

  constructor(private EntityUniqueID: string) {}

  close(_Payload: any = null): void {
    this.defaultResponse.setPayload(_Payload);
    this._afterClosed.next(this.defaultResponse);
  }

  onButtonClick(_Button: IButton): void {
    this.defaultResponse.setClickedButtonID(_Button.ID);
    this._onButtonClick.next(_Button);
  }

  setButtonList(_ButtonList: IButton[]): void {
    this._buttonList.next(_ButtonList);
  }

  closeLoader(): void {
    setTimeout(() => {
      this._afterLoader.next(this.EntityUniqueID);
    }, 0);
  }

  setDefaultResponse(_Response: IPrivateResponseMerged): void {
    this.defaultResponse = _Response;
  }
}

// endregion

export class DialogDefaultResponse extends DialogResponse implements IPrivateResponseMerged {
  DialogBelonging: IDialogBelonging = null;

  constructor() {
    super();
  }

  setBelonging(_DialogBelonging): void {
    this.DialogBelonging = _DialogBelonging;
  }
}

export class DialogCarrier {
  private component: Type<any>;
  dialogBelonging: DialogBelonging = new DialogBelonging();

  constructor() {}

  setComponent(_Component: Type<any>): void {
    this.component = _Component;
  }

  setButtons(_Buttons: IButton[]): void {
    if (_Buttons.length) {
      this.dialogBelonging.Buttons = _Buttons;
    }
  }

  setCustomData(_CustomData: any): void {
    this.dialogBelonging.CustomData = _CustomData;
  }

  setConfig(_DialogConfig: IDialogCoreConfig): void {
    // region *** local UserConfig (defined on place where dialog is called) ***
    const dataControl = new DataControl();
    dataControl.copyValuesFrom(_DialogConfig, this.dialogBelonging.DialogCoreConfig);
    if (_DialogConfig?.LoaderComponent) {
      this.dialogBelonging.DialogCoreConfig.DisplayLoader = true;
    }
    // endregion
  }

  openDialog$(): Observable<IPrivateResponseMerged> {
    const service: DialogService = ServiceLocator.injector.get(DialogService);
    const dialogController = service.open(this.component, this.dialogBelonging);
    return dialogController.afterClosed$;
  }
}

export class DialogCustomStyles implements IDialogCustomStyles {
  ButtonSectionCSS: string = null;
  ButtonCSS: string = null;
  WrapperCSS: string = null;
}

export class DialogCoreConfig extends Sizes implements IDialogCoreConfig {
  EscapeKeyClose: boolean = null;
  HideScrollbar: boolean = null;
  ButtonPosition: VerticalPosition = null;
  LayoutType: DialogLayoutDisplay = null;
  DisplayLoader: boolean = null;
  LoaderComponent: Type<any> = null;
  AnimationIn: AppearanceAnimation = null;
  AnimationOut: DisappearanceAnimation = null;
  CustomStyles: IDialogCustomStyles = new DialogCustomStyles();
}

export class DialogSettings {
  Buttons: IButton[] = [];
  DialogCoreConfig: IDialogCoreConfig = new DialogCoreConfig();
}

export class DialogBelonging<CustomData = any> extends DialogSettings implements IDialogBelonging {
  /** @internal */
  EntityUniqueID: string = 'D' + Math.random().toString(36).substr(2, 9);

  CustomData: CustomData = null;
  EventsController: IDialogEventsController;

  constructor() {
    super();
    this.EventsController = new DialogEventsController(this.EntityUniqueID);
    const dialogConfigurator: DialogConfigService = ServiceLocator.injector.get(DialogConfigService);
    const baseSettings = new DialogSettings();
    const dataControl = new DataControl();
    dataControl.copyValuesFrom(dialogConfigurator.productionConfig.DialogCoreConfig, baseSettings.DialogCoreConfig);
    this.DialogCoreConfig = baseSettings.DialogCoreConfig;
    this.Buttons = dialogConfigurator.productionConfig.Buttons.slice();
  }
}
