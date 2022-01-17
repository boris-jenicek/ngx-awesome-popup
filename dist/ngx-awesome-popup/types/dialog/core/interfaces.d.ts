import { Type } from '@angular/core';
import { Observable } from 'rxjs';
import { AppearanceAnimation, DialogLayoutDisplay, DisappearanceAnimation, VerticalPosition } from '../../../core/enums';
import { IButton, IPrivateResponse, ISizes } from '../../../core/global-interfaces';
export interface IDialogUserConfig {
    buttons?: IButton[];
    dialogCoreConfig?: IDialogCoreConfig;
}
export interface IDialogCustomStyles {
    buttonSectionCSS?: string;
    buttonCSS?: string;
    wrapperCSS?: string;
}
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
    defaultResponse: IPrivateResponseMerged;
    afterClosed$: Observable<IPrivateResponseMerged>;
    afterLoader$: Observable<string>;
    onButtonClick$: Observable<IButton>;
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
    setClickedButtonID(_ClickedButtonID: any): void;
}
export interface IDialogPublicResponse<ResponsePayload> {
    payload: ResponsePayload;
    success: boolean;
    clickedButtonID: string;
}
export interface IPrivateResponseMerged extends IDialogResponse, IPrivateResponse {
    DialogBelonging: IDialogBelonging;
}
