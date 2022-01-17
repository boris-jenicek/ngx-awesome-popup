import { Observable } from 'rxjs';
import { AppearanceAnimation, DialogLayoutDisplay, DisappearanceAnimation, VerticalPosition } from '../../../core/enums';
import { DataControl } from '../../../core/global-classes';
import { IButton, IDispatch } from '../../../core/global-interfaces';
import { IConfirmBoxBelonging, IConfirmBoxCoreConfig, IConfirmBoxCustomStyles, IConfirmBoxPublicResponse, IConfirmBoxResponse, IPrivateResponseMerged } from './interfaces';
export declare class ConfirmBoxInitializer {
    private confirmBoxCarrier;
    constructor();
    openConfirmBox$(): Observable<IConfirmBoxPublicResponse>;
    setButtons(_Buttons: IButton[]): void;
    setConfig(_ConfirmBoxCoreConfig: IConfirmBoxCoreConfig): void;
    setDispatch(_Title: string, _Message?: string): void;
    setTitle(_Title: string): void;
    setMessage(_Message: string): void;
    setButtonLabels(_Confirm: string, _Decline?: string): void;
}
export declare class ConfirmBoxResponse extends DataControl implements IConfirmBoxResponse, IConfirmBoxPublicResponse {
    success: boolean;
    clickedButtonID: string;
    constructor();
    setSuccess(_IsSuccess: boolean): void;
    setClickedButtonID(_ClickedButtonID: any): void;
}
export declare class ConfirmBoxeventsController {
    private entityUniqueID;
    private readonly _afterClosed;
    private readonly _onButtonClick;
    private readonly _buttonList;
    defaultResponse: IPrivateResponseMerged;
    afterClosed$: Observable<IPrivateResponseMerged>;
    onButtonClick$: Observable<IButton>;
    buttonList$: Observable<IButton[]>;
    constructor(entityUniqueID: string);
    close(_Response?: IPrivateResponseMerged): void;
    onButtonClick(_Button: IButton): void;
    setButtonList(_ButtonList: IButton[]): void;
    setDefaultResponse(_Response: IPrivateResponseMerged): void;
}
export declare class ConfirmBoxDefaultResponse extends ConfirmBoxResponse implements IPrivateResponseMerged {
    confirmBoxBelonging: ConfirmBoxBelonging;
    constructor();
    setBelonging(_ConfirmBoxBelonging: any): void;
}
export declare class ConfirmBoxCarrier {
    confirmBoxBelonging: ConfirmBoxBelonging;
    constructor();
    setButtons(_Buttons: IButton[]): void;
    setTitle(_Title: string): void;
    setMessage(_Message: string): void;
    setButtonLabels(_Confirm: string, _Decline: string): void;
    setConfig(_ConfirmBoxBelonging: IConfirmBoxCoreConfig): void;
    openConfirmBox$(): Observable<IPrivateResponseMerged>;
}
export declare class ConfirmBoxSettings {
    buttons: IButton[];
    confirmBoxCoreConfig: IConfirmBoxCoreConfig;
    dispatch: IDispatch;
}
export declare class ConfirmBoxCustomStyles implements IConfirmBoxCustomStyles {
    titleCSS: string;
    textCSS: string;
    buttonSectionCSS: string;
    buttonCSS: string;
    wrapperCSS: string;
}
export declare class confirmBoxCoreConfig implements IConfirmBoxCoreConfig {
    width: string;
    height: string;
    buttonPosition: VerticalPosition;
    layoutType: DialogLayoutDisplay;
    dispatch: IDispatch;
    confirmLabel: string;
    declineLabel: string;
    disableIcon: boolean;
    allowHtmlMessage: boolean;
    animationIn: AppearanceAnimation;
    animationOut: DisappearanceAnimation;
    customStyles: ConfirmBoxCustomStyles;
    iconStyleClass: string;
}
export declare class ConfirmBoxBelonging extends ConfirmBoxSettings implements IConfirmBoxBelonging {
    entityUniqueID: string;
    eventsController: ConfirmBoxeventsController;
    constructor();
}
