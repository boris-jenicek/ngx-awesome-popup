import {Observable, Subject} from 'rxjs';
import {Type} from '@angular/core';
import {ServiceLocator} from '../../../locator.service';
import {DialogConfigService} from './dialog-config.service';
import {DialogLayoutDisplay, VerticalPosition} from '../../../core/enums';
import {map} from 'rxjs/operators';
import {GlobalClass, GlobalInterface} from '../../../core/global';
import {DialogService} from './dialog.service';

export namespace DialogInterface {
    
    /**
     * Check interface of properties.
     */
    export interface IDialogUserConfig {
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
    export interface IDialogCoreConfig {
        /** Fixed popup width */
        Width?: string;
        /** Fixed popup height */
        Height?: string;
        ButtonPosition?: VerticalPosition;
        LayoutType?: DialogLayoutDisplay;
        DisplayLoader?: boolean;
        LoaderComponent?: Type<any>;
    }
    
    export interface IDialogBelonging {
        Buttons: GlobalInterface.IButton[];
        DialogCoreConfig: DialogInterface.IDialogCoreConfig;
        EntityUniqueID: string;
        CustomData: any;
        EventsController: DialogInterface.IDialogEventsController;
    }
    
    export interface IDialogEventsController {
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
    
    export interface IDialogResponse {
        
        setPayload(_Payload: any): void;
        
        setClickedButtonID(_ClickedButtonID): void;
        
    }
    
    export interface IDialogPublicResponse<ResponsePayload> {
        /** Generic property type, accept expected payload from dynamic child component. */
        Payload: ResponsePayload;
        Success: boolean;
        ClickedButtonID: string
    }
    
    export interface IPrivateResponseMerged extends IDialogResponse, GlobalInterface.IPrivateResponse {
        
        DialogBelonging: DialogInterface.IDialogBelonging;
    }
    
    
}

export namespace DialogClass {
    
    // region *** Public ***
    
    export class DialogInitializer {
        
        private dialogCarrier: DialogCarrier = new DialogClass.DialogCarrier();
        
        constructor(private component: Type<any>) {
            this.dialogCarrier.setComponent(this.component);
        }
        
        /** Generic method accept expected payload from dynamic child component.*/
        openDialog$<ResponsePayload = any>(): Observable<DialogInterface.IDialogPublicResponse<ResponsePayload>> {
            return this.dialogCarrier.openDialog$().pipe(map(resp => {
                const basicDialogResponse = new DialogResponse();
                const dataControl         = new GlobalClass.DataControl();
                dataControl.copyValuesFrom(resp, basicDialogResponse);
                return basicDialogResponse;
            }));
        }
        
        /** It accepts list of custom buttons */
        setButtons(_Buttons: GlobalInterface.IButton[]): void {
            this.dialogCarrier.setButtons(_Buttons);
        }
        
        setCustomData(_CustomData: any) {
            this.dialogCarrier.setCustomData(_CustomData);
        }
        
        setConfig(_DialogConfig: DialogInterface.IDialogCoreConfig) {
            this.dialogCarrier.setConfig(_DialogConfig);
        }
        
    }
    
    export class DialogResponse extends GlobalClass.DataControl implements DialogInterface.IDialogResponse, DialogInterface.IDialogPublicResponse<any> {
        // private Response: DialogPrepareResponse            = new DialogPrepareResponse();
        
        Payload: any            = null;
        Success: boolean        = null;
        ClickedButtonID: string = null;
        
        constructor() {
            super();
        }
        
        /**
         * @ignore
         */
        setPayload(_Payload: any): void {
            this.Payload = _Payload;
        }
        
        /**
         * @ignore
         */
        setClickedButtonID(_ClickedButtonID): void {
            this.ClickedButtonID = _ClickedButtonID;
        }
        
    }
    
    export class DialogEventsController implements DialogInterface.IDialogEventsController {
        
        defaultResponse: DialogInterface.IPrivateResponseMerged;
        
        private readonly _afterClosed: Subject<DialogInterface.IPrivateResponseMerged> = new Subject<DialogInterface.IPrivateResponseMerged>();
        afterClosed$: Observable<DialogInterface.IPrivateResponseMerged>               = this._afterClosed.asObservable();
    
        private readonly _afterLoader: any                                = new Subject<string>();
        afterLoader$: Observable<string>                                  = this._afterLoader.asObservable();
        private readonly _onButtonClick: Subject<GlobalInterface.IButton> = new Subject<GlobalInterface.IButton>();
        onButtonClick$: Observable<GlobalInterface.IButton>               = this._onButtonClick.asObservable();
        private readonly _buttonList: Subject<GlobalInterface.IButton[]>  = new Subject<GlobalInterface.IButton[]>();
        buttonList$: Observable<GlobalInterface.IButton[]>                = this._buttonList.asObservable();
    
        constructor(private EntityUniqueID: string) {
        }
    
        close(_Payload: any = null): void {
            this.defaultResponse.setPayload(_Payload);
            this._afterClosed.next(this.defaultResponse);
        }
    
        onButtonClick(_Button: GlobalInterface.IButton): void {
            this.defaultResponse.setClickedButtonID(_Button.ID);
            this._onButtonClick.next(_Button);
        }
    
        setButtonList(_ButtonList: GlobalInterface.IButton[]): void {
            this._buttonList.next(_ButtonList);
        }
        
        closeLoader(): void {
            setTimeout(() => {
                this._afterLoader.next(this.EntityUniqueID);
            }, 0);
            
        }
        
        setDefaultResponse(_Response: DialogInterface.IPrivateResponseMerged): void {
            this.defaultResponse = _Response;
        }
    }
    
    // endregion
    
    export class DialogDefaultResponse extends DialogResponse implements DialogInterface.IPrivateResponseMerged {
        DialogBelonging: DialogInterface.IDialogBelonging = null;
        
        constructor() {
            super();
        }
        
        setBelonging(_DialogBelonging): void {
            this.DialogBelonging = _DialogBelonging;
        }
        
    }
    
    export class DialogCarrier {
        
        dialogBelonging: DialogBelonging = new DialogBelonging();
        private component: Type<any>;
        
        constructor() {
        }
        
        setComponent(_Component: Type<any>): void {
            this.component = _Component;
        }
        
        setButtons(_Buttons: GlobalInterface.IButton[]) {
            if (_Buttons.length) {
                this.dialogBelonging.Buttons = _Buttons;
            }
        }
        
        setCustomData(_CustomData: any) {
            this.dialogBelonging.CustomData = _CustomData;
        }
        
        setConfig(_DialogConfig: DialogInterface.IDialogCoreConfig) {
            // region *** local UserConfig (defined on place where dialog is called) ***
            const dataControl = new GlobalClass.DataControl();
            dataControl.copyValuesFrom(_DialogConfig, this.dialogBelonging.DialogCoreConfig);
            if (_DialogConfig?.LoaderComponent) {
                this.dialogBelonging.DialogCoreConfig.DisplayLoader = true;
            }
            // endregion
        }
        
        openDialog$(): Observable<DialogInterface.IPrivateResponseMerged> {
            const service: DialogService = ServiceLocator.injector.get(DialogService);
            const dialogController       = service.open(this.component, this.dialogBelonging);
            return dialogController.afterClosed$;
        }
        
    }
    
    export class DialogCoreConfig implements DialogInterface.IDialogCoreConfig {
        Width: string                    = null;
        Height: string                   = null;
        ButtonPosition: VerticalPosition = null;
        LayoutType: DialogLayoutDisplay  = null;
        DisplayLoader: boolean           = null;
        LoaderComponent: Type<any>       = null;
    }
    
    export class DialogSettings {
        Buttons: GlobalInterface.IButton[]                  = [];
        DialogCoreConfig: DialogInterface.IDialogCoreConfig = new DialogCoreConfig();
    }
    
    export class DialogBelonging<CustomData = any> extends DialogSettings implements DialogInterface.IDialogBelonging {
        
        /** @internal */
        EntityUniqueID: string = 'D' + Math.random().toString(36).substr(2, 9);
        
        CustomData: CustomData = null;
        EventsController: DialogInterface.IDialogEventsController;
        
        constructor() {
            super();
            this.EventsController                         = new DialogEventsController(this.EntityUniqueID);
            const dialogConfigurator: DialogConfigService = ServiceLocator.injector.get(DialogConfigService);
            const baseSettings                            = new DialogSettings();
            const dataControl                             = new GlobalClass.DataControl();
            dataControl.copyValuesFrom(dialogConfigurator.productionConfig.DialogCoreConfig, baseSettings.DialogCoreConfig);
            this.DialogCoreConfig = baseSettings.DialogCoreConfig;
            this.Buttons          = dialogConfigurator.productionConfig.Buttons.slice();
        }
        
    }
}



