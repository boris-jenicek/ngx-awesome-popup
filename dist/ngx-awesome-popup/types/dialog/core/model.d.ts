import { Observable } from 'rxjs';
import { Type } from '@angular/core';
import { DialogLayoutDisplay, VerticalPosition } from '../../../core/enums';
import { GlobalClass, GlobalInterface } from '../../../core/global';
export declare namespace DialogInterface {
    /**
     * Check interface of properties.
     */
    interface IDialogUserConfig {
        Buttons?: GlobalInterface.IButton[];
        DialogCoreConfig?: DialogInterface.IDialogCoreConfig;
    }
    /**
     * Optional user configuration.
     *
     * Example:
     * ```typescript
     * // Dialog core config object example.
     * const dialogCoreConfig = {
     *     DialogCoreConfig: {
     *        Width         : '500px',
     *        Height        : '500px',
     *        ButtonPosition: 'right',
     *        LayoutType: DialogLayoutDisplay.INFO,
     *        LoaderComponent: // Any Angular component class name can be included as a loader.
     *        DisplayLoader: false // This will override LoaderComponent.
     *     }
     *  }
     * ```
     */
    interface IDialogCoreConfig {
        /** Fixed popup width */
        Width?: string;
        /** Fixed popup height */
        Height?: string;
        ButtonPosition?: VerticalPosition;
        LayoutType?: DialogLayoutDisplay;
        DisplayLoader?: boolean;
        LoaderComponent?: Type<any>;
    }
    interface IDialogBelonging {
        Buttons: GlobalInterface.IButton[];
        DialogCoreConfig: DialogInterface.IDialogCoreConfig;
        EntityUniqueID: string;
        CustomData: any;
        EventsController: DialogInterface.IDialogEventsController;
    }
    interface IDialogEventsController {
        /** @internal */
        defaultResponse: DialogInterface.IPrivateResponseMerged;
        /** @internal */
        afterClosed$: Observable<DialogInterface.IPrivateResponseMerged>;
        /** @internal */
        afterLoader$: Observable<string>;
        /** @internal */
        onButtonClick$: Observable<GlobalInterface.IButton>;
        /** @internal */
        buttonList$: Observable<GlobalInterface.IButton[]>;
        close(_Payload?: any): void;
        onButtonClick(_Button: GlobalInterface.IButton): void;
        setButtonList(_ButtonList: GlobalInterface.IButton[]): void;
        closeLoader(): void;
        setDefaultResponse(_Response: DialogInterface.IPrivateResponseMerged): void;
        setDefaultResponse(_Response: DialogInterface.IPrivateResponseMerged): void;
    }
    interface IDialogResponse {
        setPayload(_Payload: any): void;
        setClickedButtonID(_ClickedButtonID: any): void;
    }
    interface IDialogPublicResponse<ResponsePayload> {
        /** Generic property type, accept expected payload from dynamic child component. */
        Payload: ResponsePayload;
        Success: boolean;
        ClickedButtonID: string;
    }
    interface IPrivateResponseMerged extends IDialogResponse, GlobalInterface.IPrivateResponse {
        DialogBelonging: DialogInterface.IDialogBelonging;
    }
}
export declare namespace DialogClass {
    class DialogInitializer {
        private component;
        private dialogCarrier;
        constructor(component: Type<any>);
        /** Generic method accept expected payload from dynamic child component.*/
        openDialog$<ResponsePayload = any>(): Observable<DialogInterface.IDialogPublicResponse<ResponsePayload>>;
        /** It accepts list of custom buttons */
        setButtons(_Buttons: GlobalInterface.IButton[]): void;
        setCustomData(_CustomData: any): void;
        setConfig(_DialogConfig: DialogInterface.IDialogCoreConfig): void;
    }
    class DialogResponse extends GlobalClass.DataControl implements DialogInterface.IDialogResponse, DialogInterface.IDialogPublicResponse<any> {
        Payload: any;
        Success: boolean;
        ClickedButtonID: string;
        constructor();
        /**
         * @ignore
         */
        setPayload(_Payload: any): void;
        /**
         * @ignore
         */
        setClickedButtonID(_ClickedButtonID: any): void;
    }
    class DialogEventsController implements DialogInterface.IDialogEventsController {
        private EntityUniqueID;
        defaultResponse: DialogInterface.IPrivateResponseMerged;
        private readonly _afterClosed;
        afterClosed$: Observable<DialogInterface.IPrivateResponseMerged>;
        private readonly _afterLoader;
        afterLoader$: Observable<string>;
        private readonly _onButtonClick;
        onButtonClick$: Observable<GlobalInterface.IButton>;
        private readonly _buttonList;
        buttonList$: Observable<GlobalInterface.IButton[]>;
        constructor(EntityUniqueID: string);
        close(_Payload?: any): void;
        onButtonClick(_Button: GlobalInterface.IButton): void;
        setButtonList(_ButtonList: GlobalInterface.IButton[]): void;
        closeLoader(): void;
        setDefaultResponse(_Response: DialogInterface.IPrivateResponseMerged): void;
    }
    class DialogDefaultResponse extends DialogResponse implements DialogInterface.IPrivateResponseMerged {
        DialogBelonging: DialogInterface.IDialogBelonging;
        constructor();
        setBelonging(_DialogBelonging: any): void;
    }
    class DialogCarrier {
        dialogBelonging: DialogBelonging;
        private component;
        constructor();
        setComponent(_Component: Type<any>): void;
        setButtons(_Buttons: GlobalInterface.IButton[]): void;
        setCustomData(_CustomData: any): void;
        setConfig(_DialogConfig: DialogInterface.IDialogCoreConfig): void;
        openDialog$(): Observable<DialogInterface.IPrivateResponseMerged>;
    }
    class DialogCoreConfig implements DialogInterface.IDialogCoreConfig {
        Width: string;
        Height: string;
        ButtonPosition: VerticalPosition;
        LayoutType: DialogLayoutDisplay;
        DisplayLoader: boolean;
        LoaderComponent: Type<any>;
    }
    class DialogSettings {
        Buttons: GlobalInterface.IButton[];
        DialogCoreConfig: DialogInterface.IDialogCoreConfig;
    }
    class DialogBelonging<CustomData = any> extends DialogSettings implements DialogInterface.IDialogBelonging {
        /** @internal */
        EntityUniqueID: string;
        CustomData: CustomData;
        EventsController: DialogInterface.IDialogEventsController;
        constructor();
    }
}
