import { Type } from '@angular/core';
import { Observable } from 'rxjs';
import { AppearanceAnimation, DialogLayoutDisplay, DisappearanceAnimation, VerticalPosition } from '../../../core/enums';
import { DataControl, Sizes } from '../../../core/global-classes';
import { IButton } from '../../../core/global-interfaces';
import { IDialogBelonging, IDialogCoreConfig, IDialogCustomStyles, IDialogeventsController, IDialogPublicResponse, IDialogResponse, IPrivateResponseMerged } from './interfaces';
export declare class DialogInitializer {
    private component;
    private dialogCarrier;
    constructor(component: Type<any>);
    openDialog$<ResponsePayload = any>(): Observable<IDialogPublicResponse<ResponsePayload>>;
    setButtons(_Buttons: IButton[]): void;
    setCustomData(_CustomData: any): void;
    setConfig(_DialogConfig: IDialogCoreConfig): void;
}
export declare class DialogResponse extends DataControl implements IDialogResponse, IDialogPublicResponse<any> {
    payload: any;
    success: boolean;
    clickedButtonID: string;
    constructor();
    setPayload(_Payload: any): void;
    setClickedButtonID(_ClickedButtonID: any): void;
}
export declare class DialogeventsController implements IDialogeventsController {
    private entityUniqueID;
    private readonly _afterClosed;
    private readonly _afterLoader;
    private readonly _onButtonClick;
    private readonly _buttonList;
    defaultResponse: IPrivateResponseMerged;
    onButtonClick$: Observable<IButton>;
    afterClosed$: Observable<IPrivateResponseMerged>;
    afterLoader$: Observable<string>;
    buttonList$: Observable<IButton[]>;
    constructor(entityUniqueID: string);
    close(_Payload?: any): void;
    onButtonClick(_Button: IButton): void;
    setButtonList(_ButtonList: IButton[]): void;
    closeLoader(): void;
    setDefaultResponse(_Response: IPrivateResponseMerged): void;
}
export declare class DialogDefaultResponse extends DialogResponse implements IPrivateResponseMerged {
    DialogBelonging: IDialogBelonging;
    constructor();
    setBelonging(_DialogBelonging: any): void;
}
export declare class DialogCarrier {
    private component;
    dialogBelonging: DialogBelonging;
    constructor();
    setComponent(_Component: Type<any>): void;
    setButtons(_Buttons: IButton[]): void;
    setCustomData(_CustomData: any): void;
    setConfig(_DialogConfig: IDialogCoreConfig): void;
    openDialog$(): Observable<IPrivateResponseMerged>;
}
export declare class DialogCustomStyles implements IDialogCustomStyles {
    buttonSectionCSS: string;
    buttonCSS: string;
    wrapperCSS: string;
}
export declare class dialogCoreConfig extends Sizes implements IDialogCoreConfig {
    escapeKeyClose: boolean;
    hideScrollbar: boolean;
    buttonPosition: VerticalPosition;
    layoutType: DialogLayoutDisplay;
    displayLoader: boolean;
    loaderComponent: Type<any>;
    animationIn: AppearanceAnimation;
    animationOut: DisappearanceAnimation;
    customStyles: IDialogCustomStyles;
}
export declare class DialogSettings {
    buttons: IButton[];
    dialogCoreConfig: IDialogCoreConfig;
}
export declare class DialogBelonging<CustomData = any> extends DialogSettings implements IDialogBelonging {
    entityUniqueID: string;
    customData: CustomData;
    eventsController: IDialogeventsController;
    constructor();
}
