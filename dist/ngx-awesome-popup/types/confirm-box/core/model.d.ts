import { Observable } from 'rxjs';
import { DialogLayoutDisplay, VerticalPosition } from '../../../core/enums';
import { GlobalClass, GlobalInterface } from '../../../core/global';
export interface IConfirmBoxUserConfig {
    Buttons?: GlobalInterface.IButton[];
    ConfirmBoxCoreConfig?: ConfirmBoxInterface.IConfirmBoxCoreConfig;
    Dispatch?: GlobalInterface.IDispatch;
}
export declare namespace ConfirmBoxInterface {
    interface IConfirmBoxUserConfig {
        Buttons?: GlobalInterface.IButton[];
        ConfirmBoxCoreConfig?: ConfirmBoxInterface.IConfirmBoxCoreConfig;
        Dispatch?: GlobalInterface.IDispatch;
    }
    interface IConfirmBoxCoreConfig {
        /** Fixed popup width */
        Width?: string;
        /** Fixed popup height */
        Height?: string;
        ButtonPosition?: VerticalPosition;
        LayoutType?: DialogLayoutDisplay;
        Dispatch?: GlobalInterface.IDispatch;
        ConfirmLabel?: string;
        DeclineLabel?: string;
        DisableIcon?: boolean;
        AllowHTMLMessage?: boolean;
    }
    interface IConfirmBoxBelonging {
        Buttons: GlobalInterface.IButton[];
        ConfirmBoxCoreConfig: ConfirmBoxInterface.IConfirmBoxCoreConfig;
        EntityUniqueID: string;
        EventsController: ConfirmBoxClass.ConfirmBoxEventsController;
    }
    interface IConfirmBoxResponse {
        setSuccess(_IsSuccess: boolean): void;
        setClickedButtonID(_ClickedButtonID: any): void;
    }
    interface IConfirmBoxPublicResponse {
        Success: boolean;
        ClickedButtonID: string;
    }
    interface IPrivateResponseMerged extends IConfirmBoxResponse, GlobalInterface.IPrivateResponse {
        confirmBoxBelonging: ConfirmBoxInterface.IConfirmBoxBelonging;
    }
}
export declare namespace ConfirmBoxClass {
    class ConfirmBoxInitializer {
        /** @internal */
        private confirmBoxCarrier;
        constructor();
        openConfirmBox$(): Observable<ConfirmBoxInterface.IConfirmBoxPublicResponse>;
        setButtons(_Buttons: GlobalInterface.IButton[]): void;
        setConfig(_ConfirmBoxCoreConfig: ConfirmBoxInterface.IConfirmBoxCoreConfig): void;
        setDispatch(_Title: string, _Message?: string): void;
        setTitle(_Title: string): void;
        setMessage(_Message: string): void;
        setButtonLabels(_Confirm: string, _Decline?: string): void;
    }
    class ConfirmBoxResponse extends GlobalClass.DataControl implements ConfirmBoxInterface.IConfirmBoxResponse, ConfirmBoxInterface.IConfirmBoxPublicResponse {
        Success: boolean;
        ClickedButtonID: string;
        constructor();
        setSuccess(_IsSuccess: boolean): void;
        setClickedButtonID(_ClickedButtonID: any): void;
    }
    class ConfirmBoxEventsController {
        private EntityUniqueID;
        defaultResponse: ConfirmBoxInterface.IPrivateResponseMerged;
        private readonly _afterClosed;
        afterClosed$: Observable<ConfirmBoxInterface.IPrivateResponseMerged>;
        private readonly _onButtonClick;
        onButtonClick$: Observable<GlobalInterface.IButton>;
        private readonly _buttonList;
        buttonList$: Observable<GlobalInterface.IButton[]>;
        constructor(EntityUniqueID: string);
        close(_Response?: ConfirmBoxInterface.IPrivateResponseMerged): void;
        onButtonClick(_Button: GlobalInterface.IButton): void;
        setButtonList(_ButtonList: GlobalInterface.IButton[]): void;
        setDefaultResponse(_Response: ConfirmBoxInterface.IPrivateResponseMerged): void;
    }
    class ConfirmBoxDefaultResponse extends ConfirmBoxResponse implements ConfirmBoxInterface.IPrivateResponseMerged {
        confirmBoxBelonging: ConfirmBoxBelonging;
        constructor();
        setBelonging(_ConfirmBoxBelonging: any): void;
    }
    class ConfirmBoxCarrier {
        confirmBoxBelonging: ConfirmBoxClass.ConfirmBoxBelonging;
        constructor();
        setButtons(_Buttons: GlobalInterface.IButton[]): void;
        setTitle(_Title: string): void;
        setMessage(_Message: string): void;
        setButtonLabels(_Confirm: string, _Decline: string): void;
        setConfig(_ConfirmBoxBelonging: ConfirmBoxInterface.IConfirmBoxCoreConfig): void;
        openConfirmBox$(): Observable<ConfirmBoxInterface.IPrivateResponseMerged>;
    }
    class Settings {
        Buttons: GlobalInterface.IButton[];
        ConfirmBoxCoreConfig: ConfirmBoxInterface.IConfirmBoxCoreConfig;
        Dispatch: GlobalInterface.IDispatch;
    }
    class ConfirmBoxCoreConfig implements ConfirmBoxInterface.IConfirmBoxCoreConfig {
        Width: string;
        Height: string;
        ButtonPosition: VerticalPosition;
        LayoutType: DialogLayoutDisplay;
        Dispatch: GlobalInterface.IDispatch;
        ConfirmLabel: string;
        DeclineLabel: string;
        DisableIcon: boolean;
        AllowHTMLMessage: boolean;
    }
    class ConfirmBoxBelonging extends ConfirmBoxClass.Settings implements ConfirmBoxInterface.IConfirmBoxBelonging {
        EntityUniqueID: string;
        EventsController: ConfirmBoxEventsController;
        constructor();
    }
}
