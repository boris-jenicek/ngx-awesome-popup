import {
  AppearanceAnimation,
  DialogLayoutDisplay,
  DisappearanceAnimation,
  VerticalPosition
} from '../../../core/enums';
import { IButton, IDispatch, IPrivateResponse } from '../../../core/global-interfaces';
import { ConfirmBoxEventsController } from './classes';

export interface IConfirmBoxUserConfig {
  Buttons?: IButton[];
  ConfirmBoxCoreConfig?: IConfirmBoxCoreConfig;
  Dispatch?: IDispatch;
}

export interface IConfirmBoxUserConfig {
  Buttons?: IButton[];
  ConfirmBoxCoreConfig?: IConfirmBoxCoreConfig;
  Dispatch?: IDispatch;
}

export interface IConfirmBoxCustomStyles {
  TitleCSS?: string;
  TextCSS?: string;
  ButtonSectionCSS?: string;
  ButtonCSS?: string;
  WrapperCSS?: string;
}

export interface IConfirmBoxCoreConfig {
  /** Fixed popup width */
  Width?: string;
  /** Fixed popup height */
  Height?: string;
  ButtonPosition?: VerticalPosition;
  LayoutType?: DialogLayoutDisplay;
  Dispatch?: IDispatch;
  ConfirmLabel?: string;
  DeclineLabel?: string;
  DisableIcon?: boolean;
  AllowHTMLMessage?: boolean;
  AnimationIn?: AppearanceAnimation;
  AnimationOut?: DisappearanceAnimation;
  CustomStyles?: IConfirmBoxCustomStyles;
}

export interface IConfirmBoxBelonging {
  Buttons: IButton[];
  ConfirmBoxCoreConfig: IConfirmBoxCoreConfig;
  EntityUniqueID: string;
  EventsController: ConfirmBoxEventsController;
}

export interface IConfirmBoxResponse {
  setSuccess(_IsSuccess: boolean): void;

  setClickedButtonID(_ClickedButtonID): void;
}

export interface IConfirmBoxPublicResponse {
  Success: boolean;
  ClickedButtonID: string;
}

export interface IPrivateResponseMerged extends IConfirmBoxResponse, IPrivateResponse {
  confirmBoxBelonging: IConfirmBoxBelonging;
}
