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
    Success: boolean;
    ClickedButtonID: string;
    constructor();
    setSuccess(_IsSuccess: boolean): void;
    setClickedButtonID(_ClickedButtonID: any): void;
}
export declare class ToastNotificationEventsController {
    private EntityUniqueID;
    defaultResponse: IPrivateResponseMerged;
    private readonly _afterClosed;
    afterClosed$: Observable<IPrivateResponseMerged>;
    private readonly _onButtonClick;
    onButtonClick$: Observable<IButton>;
    private readonly _buttonList;
    buttonList$: Observable<IButton[]>;
    constructor(EntityUniqueID: string);
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
    AllowedNotificationsAtOnce: number;
}
export declare class ResetToastGlobalSettings {
    constructor(globalToastConfig?: IGlobalToastSettings);
}
export declare class ToastSettings {
    Buttons: IButton[];
    ToastCoreConfig: IToastCoreConfig;
    Dispatch: IDispatch;
    GlobalSettings: GlobalToastSettings;
}
export declare class ToastCustomStyles implements IToastCustomStyles {
    TitleCSS: string;
    TextCSS: string;
    ButtonSectionCSS: string;
    ButtonCSS: string;
}
export declare class ToastCoreConfig implements IToastCoreConfig {
    ToastPosition: ToastPositionEnum;
    ProgressBar: ToastProgressBarEnum;
    ToastUserViewType: ToastUserViewTypeEnum;
    OpenInElementID: string;
    ButtonPosition: VerticalPosition;
    TextPosition: VerticalPosition;
    LayoutType: DialogLayoutDisplay;
    Dispatch: IDispatch;
    ConfirmLabel: string;
    DeclineLabel: string;
    AutoCloseDelay: number;
    DisableIcon: boolean;
    AllowHTMLMessage: boolean;
    AnimationIn: AppearanceAnimation;
    AnimationOut: DisappearanceAnimation;
    CustomStyles: IToastCustomStyles;
}
export declare class ToastNotificationBelonging extends ToastSettings implements IToastNotificationBelonging {
    EntityUniqueID: string;
    EventsController: ToastNotificationEventsController;
    constructor();
}
