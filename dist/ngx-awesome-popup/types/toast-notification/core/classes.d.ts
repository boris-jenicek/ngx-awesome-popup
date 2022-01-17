import { Observable } from 'rxjs';
import { AppearanceAnimation, DialogLayoutDisplay, DisappearanceAnimation, VerticalPosition } from '../../../core/enums';
import { DataControl } from '../../../core/global-classes';
import { IButton, IDispatch } from '../../../core/global-interfaces';
import { ToastPositionEnum, ToastProgressBarEnum, ToastUserViewTypeEnum } from './enums';
import { IGlobalToastSettings, IPrivateResponseMerged, IToastCoreConfig, IToastCustomStyles, IToastNotificationBelonging, IToastNotificationPublicResponse, IToastNotificationResponse } from './interfaces';
export declare class ToastNotificationInitializer {
    private toastNotificationCarrier;
    constructor();
    openToastNotification$(): Observable<IToastNotificationPublicResponse>;
    setButtons(_Buttons: IButton[]): void;
    setConfig(_ToastNotificationConfig: IToastCoreConfig): void;
    setDispatch(_Title: string, _Message?: string): void;
    setTitle(_Title: string): void;
    setMessage(_Message: string): void;
    setButtonLabels(_Confirm: string, _Decline?: string): void;
}
export declare class ToastNotificationResponse extends DataControl implements IToastNotificationResponse, IToastNotificationPublicResponse {
    success: boolean;
    clickedButtonID: string;
    constructor();
    setSuccess(_IsSuccess: boolean): void;
    setClickedButtonID(_ClickedButtonID: any): void;
}
export declare class ToastNotificationeventsController {
    private entityUniqueID;
    private readonly _onButtonClick;
    private readonly _afterClosed;
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
export declare class ToastNotificationDefaultResponse extends ToastNotificationResponse implements IPrivateResponseMerged {
    toastNotificationBelonging: ToastNotificationBelonging;
    constructor();
    setBelonging(_ToastNotificationBelonging: any): void;
}
export declare class ToastNotificationCarrier {
    toastNotificationBelonging: ToastNotificationBelonging;
    constructor();
    setButtons(_Buttons: IButton[]): void;
    setTitle(_Title: string): void;
    setMessage(_Message: string): void;
    setButtonLabels(_Confirm: string, _Decline: string): void;
    setConfig(_ToastNotificationBelonging: IToastCoreConfig): void;
    openToastNotification$(): Observable<IPrivateResponseMerged>;
}
export declare class GlobalToastSettings implements IGlobalToastSettings {
    allowedNotificationsAtOnce: number;
}
export declare class ResetToastGlobalSettings {
    constructor(globalToastConfig?: IGlobalToastSettings);
}
export declare class ToastSettings {
    buttons: IButton[];
    toastCoreConfig: IToastCoreConfig;
    dispatch: IDispatch;
    globalSettings: GlobalToastSettings;
}
export declare class ToastCustomStyles implements IToastCustomStyles {
    titleCSS: string;
    textCSS: string;
    buttonSectionCSS: string;
    buttonCSS: string;
}
export declare class toastCoreConfig implements IToastCoreConfig {
    toastPosition: ToastPositionEnum;
    progressBar: ToastProgressBarEnum;
    toastUserViewType: ToastUserViewTypeEnum;
    openInElementID: string;
    buttonPosition: VerticalPosition;
    textPosition: VerticalPosition;
    layoutType: DialogLayoutDisplay;
    dispatch: IDispatch;
    confirmLabel: string;
    declineLabel: string;
    autoCloseDelay: number;
    disableIcon: boolean;
    allowHtmlMessage: boolean;
    animationIn: AppearanceAnimation;
    animationOut: DisappearanceAnimation;
    customStyles: IToastCustomStyles;
    iconStyleClass: string;
}
export declare class ToastNotificationBelonging extends ToastSettings implements IToastNotificationBelonging {
    entityUniqueID: string;
    eventsController: ToastNotificationeventsController;
    constructor();
}
