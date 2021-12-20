import {
  AppearanceAnimation,
  DialogLayoutDisplay,
  DisappearanceAnimation,
  VerticalPosition
} from '../../../core/enums';
import { IButton, IDispatch, IPrivateResponse } from '../../../core/global-interfaces';
import { ConfirmBoxeventsController } from './classes';

export interface IConfirmBoxUserConfig {
  buttons?: IButton[];
  confirmBoxCoreConfig?: IConfirmBoxCoreConfig;
  dispatch?: IDispatch;
}

export interface IConfirmBoxUserConfig {
  buttons?: IButton[];
  confirmBoxCoreConfig?: IConfirmBoxCoreConfig;
  dispatch?: IDispatch;
}

export interface IConfirmBoxCustomStyles {
  titleCSS?: string;
  textCSS?: string;
  buttonSectionCSS?: string;
  buttonCSS?: string;
  wrapperCSS?: string;
}

export interface IConfirmBoxCoreConfig {
  /** Fixed popup width */
  width?: string;
  /** Fixed popup height */
  height?: string;
  buttonPosition?: VerticalPosition;
  layoutType?: DialogLayoutDisplay;
  dispatch?: IDispatch;
  confirmLabel?: string;
  declineLabel?: string;
  disableIcon?: boolean;
  allowHtmlMessage?: boolean;
  animationIn?: AppearanceAnimation;
  animationOut?: DisappearanceAnimation;
  customStyles?: IConfirmBoxCustomStyles;
}

export interface IConfirmBoxBelonging {
  buttons: IButton[];
  confirmBoxCoreConfig: IConfirmBoxCoreConfig;
  entityUniqueID: string;
  eventsController: ConfirmBoxeventsController;
}

export interface IConfirmBoxResponse {
  setSuccess(_IsSuccess: boolean): void;

  setClickedButtonID(_ClickedButtonID): void;
}

export interface IConfirmBoxPublicResponse {
  success: boolean;
  clickedButtonID: string;
}

export interface IPrivateResponseMerged extends IConfirmBoxResponse, IPrivateResponse {
  confirmBoxBelonging: IConfirmBoxBelonging;
}
