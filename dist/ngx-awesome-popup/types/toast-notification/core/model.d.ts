import { Observable } from "rxjs";
import { DialogLayoutDisplay, VerticalPosition } from "../../../core/enums";
import { GlobalClass, GlobalInterface } from "../../../core/global";
export declare namespace ToastNotificationInterface {
    interface IToastNotificationUserConfig {
        Buttons?: GlobalInterface.IButton[];
        ToastCoreConfig?: ToastNotificationInterface.IToastCoreConfig;
        Dispatch?: GlobalInterface.IDispatch;
        GlobalSettings?: ToastNotificationInterface.IGlobalToastSettings;
    }
    interface IGlobalToastSettings {
        /** Number of popups allowed on screen, recommend 3-5 */
        AllowedNotificationsAtOnce: number;
    }
    interface IToastCoreConfig {
        ToastPosition?: ToastPositionEnum;
        ProgressBar?: ToastProgressBarEnum;
        ToastUserViewType?: ToastUserViewTypeEnum;
        OpenInElementID?: string;
        ButtonPosition?: VerticalPosition;
        TextPosition?: VerticalPosition;
        LayoutType?: DialogLayoutDisplay;
        Dispatch?: GlobalInterface.IDispatch;
        /** Default confirm button Label */
        ConfirmLabel?: string;
        /** Default decline button Label */
        DeclineLabel?: string;
        /** Expressed in milliseconds */
        AutoCloseDelay?: number;
        DisableIcon?: boolean;
        AllowHTMLMessage?: boolean;
    }
    interface IToastNotificationBelonging {
        Buttons: GlobalInterface.IButton[];
        ToastCoreConfig: ToastNotificationInterface.IToastCoreConfig;
        EntityUniqueID: string;
        EventsController: ToastNotificationClass.ToastNotificationEventsController;
    }
    interface IToastNotificationResponse {
        setSuccess(_IsSuccess: boolean): void;
        setClickedButtonID(_ClickedButtonID: any): void;
    }
    interface IToastNotificationPublicResponse {
        Success: boolean;
        ClickedButtonID: string;
    }
    interface IPrivateResponseMerged extends IToastNotificationResponse, GlobalInterface.IPrivateResponse {
        toastNotificationBelonging: ToastNotificationInterface.IToastNotificationBelonging;
    }
    interface IToastNotificationRawState {
        WeakMap: WeakMap<any, ToastNotificationClass.ToastNotificationEventsController>;
        ToastBelonging: ToastNotificationClass.ToastNotificationBelonging;
    }
}
export declare namespace ToastNotificationClass {
    class ToastNotificationInitializer {
        private toastNotificationCarrier;
        constructor();
        openToastNotification$(): Observable<ToastNotificationInterface.IToastNotificationPublicResponse>;
        setButtons(_Buttons: GlobalInterface.IButton[]): void;
        setConfig(_ToastNotificationConfig: ToastNotificationInterface.IToastCoreConfig): void;
        setDispatch(_Title: string, _Message?: string): void;
        setTitle(_Title: string): void;
        setMessage(_Message: string): void;
        setButtonLabels(_Confirm: string, _Decline?: string): void;
    }
    class ToastNotificationResponse extends GlobalClass.DataControl implements ToastNotificationInterface.IToastNotificationResponse, ToastNotificationInterface.IToastNotificationPublicResponse {
        Success: boolean;
        ClickedButtonID: string;
        constructor();
        setSuccess(_IsSuccess: boolean): void;
        setClickedButtonID(_ClickedButtonID: any): void;
    }
    class ToastNotificationEventsController {
        private EntityUniqueID;
        defaultResponse: ToastNotificationInterface.IPrivateResponseMerged;
        private readonly _afterClosed;
        afterClosed$: Observable<ToastNotificationInterface.IPrivateResponseMerged>;
        private readonly _onButtonClick;
        onButtonClick$: Observable<GlobalInterface.IButton>;
        private readonly _buttonList;
        buttonList$: Observable<GlobalInterface.IButton[]>;
        constructor(EntityUniqueID: string);
        close(_Response?: ToastNotificationInterface.IPrivateResponseMerged): void;
        onButtonClick(_Button: GlobalInterface.IButton): void;
        setButtonList(_ButtonList: GlobalInterface.IButton[]): void;
        setDefaultResponse(_Response: ToastNotificationInterface.IPrivateResponseMerged): void;
    }
    class ToastNotificationDefaultResponse extends ToastNotificationResponse implements ToastNotificationInterface.IPrivateResponseMerged {
        toastNotificationBelonging: ToastNotificationBelonging;
        constructor();
        setBelonging(_ToastNotificationBelonging: any): void;
    }
    class ToastNotificationCarrier {
        toastNotificationBelonging: ToastNotificationClass.ToastNotificationBelonging;
        constructor();
        setButtons(_Buttons: GlobalInterface.IButton[]): void;
        setTitle(_Title: string): void;
        setMessage(_Message: string): void;
        setButtonLabels(_Confirm: string, _Decline: string): void;
        setConfig(_ToastNotificationBelonging: ToastNotificationInterface.IToastCoreConfig): void;
        openToastNotification$(): Observable<ToastNotificationInterface.IPrivateResponseMerged>;
    }
    class GlobalToastSettings implements ToastNotificationInterface.IGlobalToastSettings {
        AllowedNotificationsAtOnce: number;
    }
    class ResetToastGlobalSettings {
        constructor(globalToastConfig?: ToastNotificationInterface.IGlobalToastSettings);
    }
    class Settings {
        Buttons: GlobalInterface.IButton[];
        ToastCoreConfig: ToastNotificationInterface.IToastCoreConfig;
        Dispatch: GlobalInterface.IDispatch;
        GlobalSettings: GlobalToastSettings;
    }
    class ToastCoreConfig implements ToastNotificationInterface.IToastCoreConfig {
        ToastPosition: ToastPositionEnum;
        ProgressBar: ToastProgressBarEnum;
        ToastUserViewType: ToastUserViewTypeEnum;
        OpenInElementID: string;
        ButtonPosition: VerticalPosition;
        TextPosition: VerticalPosition;
        LayoutType: DialogLayoutDisplay;
        Dispatch: GlobalInterface.IDispatch;
        ConfirmLabel: string;
        DeclineLabel: string;
        AutoCloseDelay: number;
        DisableIcon: boolean;
        AllowHTMLMessage: boolean;
    }
    class ToastNotificationBelonging extends ToastNotificationClass.Settings implements ToastNotificationInterface.IToastNotificationBelonging {
        EntityUniqueID: string;
        EventsController: ToastNotificationEventsController;
        constructor();
    }
}
export declare enum ToastProgressBarEnum {
    NONE = 0,
    INCREASE = 1,
    DECREASE = 2
}
export declare enum ToastPositionEnum {
    TOP_LEFT = "top-left",
    TOP_CENTER = "top-center",
    TOP_RIGHT = "top-right",
    TOP_FULL_WIDTH = "top-fullwidth",
    BOTTOM_LEFT = "bottom-left",
    BOTTOM_CENTER = "bottom-center",
    BOTTOM_RIGHT = "bottom-right",
    BOTTOM_FULL_WIDTH = "bottom-fullwidth"
}
export declare enum ToastUserViewTypeEnum {
    SIMPLE = "simple",
    STANDARD = "standard"
}
