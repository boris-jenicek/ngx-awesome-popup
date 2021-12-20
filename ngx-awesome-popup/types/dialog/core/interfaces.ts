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
  buttons?: IButton[];
  dialogCoreConfig?: IDialogCoreConfig;
}

export interface IDialogCustomStyles {
  buttonSectionCSS?: string;
  buttonCSS?: string;
  wrapperCSS?: string;
}

/**
 * Optional user configuration.
 *
 * Example:
 * ```typescript
 * // Dialog core config object example.
 * const dialogCoreConfig = {
 *     dialogCoreConfig: {
 *        width          : '500px',
 *        // minWidth       : '300px',
 *        // maxWidth       : '700px',
 *        height         : '500px',
 *        // minHeight      : '100vh',
 *        // maxHeight      : '100px',
 *        hideScrollbar  : true,
 *        escapeKeyClose : true,
 *        // fullScreen : true,
 *        buttonPosition : 'right',
 *        layoutType: DialogLayoutDisplay.INFO,
 *        // loaderComponent: // Any Angular component class name can be included as a loader.
 *        displayLoader: false, // This will override LoaderComponent.
 *        customStyles: {
 *           buttonSectionCss: 'background: #333',
 *           buttonCss: 'font-size: 30px;',
 *           wrapperCss: 'background: #333;'
 *         }
 *     }
 *  }
 * ```
 */
export interface IDialogCoreConfig extends ISizes {
  escapeKeyClose?: boolean;
  hideScrollbar?: boolean;
  buttonPosition?: VerticalPosition;
  layoutType?: DialogLayoutDisplay;
  displayLoader?: boolean;
  loaderComponent?: Type<any>;
  animationIn?: AppearanceAnimation;
  animationOut?: DisappearanceAnimation;
  customStyles?: IDialogCustomStyles;
}

export interface IDialogBelonging {
  buttons: IButton[];
  dialogCoreConfig: IDialogCoreConfig;
  entityUniqueID: string;
  customData: any;
  eventsController: IDialogeventsController;
}

export interface IDialogeventsController {
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
  payload: ResponsePayload;
  success: boolean;
  clickedButtonID: string;
}

export interface IPrivateResponseMerged extends IDialogResponse, IPrivateResponse {
  DialogBelonging: IDialogBelonging;
}
