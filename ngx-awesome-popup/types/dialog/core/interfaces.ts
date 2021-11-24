import { Type } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AppearanceAnimation,
  DialogLayoutDisplay,
  DisappearanceAnimation,
  VerticalPosition
} from '../../../core/enums';
import { IButton, IPrivateResponse, ISizes } from '../../../core/global-interfaces';

/**
 * Check interface of properties.
 */
export interface IDialogUserConfig {
  Buttons?: IButton[];
  DialogCoreConfig?: IDialogCoreConfig;
}

export interface IDialogCustomStyles {
  ButtonSectionCSS?: string;
  ButtonCSS?: string;
  WrapperCSS?: string;
}

/**
 * Optional user configuration.
 *
 * Example:
 * ```typescript
 * // Dialog core config object example.
 * const dialogCoreConfig = {
 *     DialogCoreConfig: {
 *        Width          : '500px',
 *        // MinWidth       : '300px',
 *        // MaxWidth       : '700px',
 *        Height         : '500px',
 *        // MinHeight      : '100vh',
 *        // MaxHeight      : '100px',
 *        HideScrollbar  : true,
 *        EscapeKeyClose : true,
 *        // FullScreen : true,
 *        ButtonPosition : 'right',
 *        LayoutType: DialogLayoutDisplay.INFO,
 *        // LoaderComponent: // Any Angular component class name can be included as a loader.
 *        DisplayLoader: false, // This will override LoaderComponent.
 *        CustomStyles: {
 *           ButtonSectionCSS: 'background: #333',
 *           ButtonCSS: 'font-size: 30px;',
 *           WrapperCSS: 'background: #333;'
 *         }
 *     }
 *  }
 * ```
 */
export interface IDialogCoreConfig extends ISizes {
  EscapeKeyClose?: boolean;
  HideScrollbar?: boolean;
  ButtonPosition?: VerticalPosition;
  LayoutType?: DialogLayoutDisplay;
  DisplayLoader?: boolean;
  LoaderComponent?: Type<any>;
  AnimationIn?: AppearanceAnimation;
  AnimationOut?: DisappearanceAnimation;
  CustomStyles?: IDialogCustomStyles;
}

export interface IDialogBelonging {
  Buttons: IButton[];
  DialogCoreConfig: IDialogCoreConfig;
  EntityUniqueID: string;
  CustomData: any;
  EventsController: IDialogEventsController;
}

export interface IDialogEventsController {
  /** @internal */
  defaultResponse: IPrivateResponseMerged;
  /** @internal */
  afterClosed$: Observable<IPrivateResponseMerged>;
  /** @internal */
  afterLoader$: Observable<string>;
  /** @internal */
  onButtonClick$: Observable<IButton>;
  /** @internal */
  buttonList$: Observable<IButton[]>;

  close(_Payload?: any): void;

  onButtonClick(_Button: IButton): void;

  setButtonList(_ButtonList: IButton[]): void;

  closeLoader(): void;

  setDefaultResponse(_Response: IPrivateResponseMerged): void;

  setDefaultResponse(_Response: IPrivateResponseMerged): void;
}

export interface IDialogResponse {
  setPayload(_Payload: any): void;

  setClickedButtonID(_ClickedButtonID): void;
}

export interface IDialogPublicResponse<ResponsePayload> {
  /** Generic property type, accept expected payload from dynamic child component. */
  Payload: ResponsePayload;
  Success: boolean;
  ClickedButtonID: string;
}

export interface IPrivateResponseMerged extends IDialogResponse, IPrivateResponse {
  DialogBelonging: IDialogBelonging;
}
