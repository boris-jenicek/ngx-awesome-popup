import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {GlobalClass, GlobalInterface} from '../../../core/global';
import {ServiceLocator} from '../../../locator.service';
import {DialogLayoutDisplay, VerticalPosition} from '../../../core/enums';
import {ConfirmBoxConfigService} from './confirm-box-config.service';
import {ConfirmBoxService} from './confirm-box-service';

export namespace ConfirmBoxInterface {
    
    export interface IConfirmBoxUserConfig {
        Buttons?: GlobalInterface.IButton[];
        ConfirmBoxCoreConfig?: ConfirmBoxInterface.IConfirmBoxCoreConfig;
        Message?: GlobalInterface.IMessage;
    }
    
    export interface IConfirmBoxCoreConfig {
        /** Fixed popup width */
        Width?: string;
        /** Fixed popup height */
        Height?: string;
        ButtonPosition?: VerticalPosition;
        LayoutType?: DialogLayoutDisplay;
        Message?: GlobalInterface.IMessage;
        ConfirmLabel?: string;
        DeclineLabel?: string;
    }
    
    export interface IConfirmBoxBelonging {
        Buttons: GlobalInterface.IButton[];
        ConfirmBoxCoreConfig: ConfirmBoxInterface.IConfirmBoxCoreConfig;
        EntityUniqueID: string;
        EventsController: ConfirmBoxClass.ConfirmBoxEventsController;
    }
    
    export interface IConfirmBoxResponse {
        
        setSuccess(_IsSuccess: boolean): void;
        
        setClickedButtonID(_ClickedButtonID): void;
        
    }
    
    export interface IConfirmBoxPublicResponse {
        Success: boolean;
        ClickedButtonID: string
    }
    
    export interface IPrivateResponseMerged extends IConfirmBoxResponse, GlobalInterface.IPrivateResponse {
        
        confirmBoxBelonging: ConfirmBoxInterface.IConfirmBoxBelonging;
    }
    
}

export namespace ConfirmBoxClass {
    
    // region *** Public ***
    

    export class ConfirmBoxInitializer {
        /** @internal */
        private confirmBoxCarrier: ConfirmBoxClass.ConfirmBoxCarrier = new ConfirmBoxClass.ConfirmBoxCarrier();
        
        constructor() {
        }
        
        openConfirmBox$(): Observable<ConfirmBoxInterface.IConfirmBoxPublicResponse> {
            return this.confirmBoxCarrier.openConfirmBox$().pipe(map(resp => {
                const basicConfirmBoxResponse = new ConfirmBoxResponse();
                const dataControl             = new GlobalClass.DataControl();
                dataControl.copyValuesFrom(resp, basicConfirmBoxResponse);
                return basicConfirmBoxResponse;
            }));
        }
        
        setButtons(_Buttons: GlobalInterface.IButton[]): void {
            this.confirmBoxCarrier.setButtons(_Buttons);
        }
        
        setConfig(_ConfirmBoxCoreConfig: ConfirmBoxInterface.IConfirmBoxCoreConfig) {
            this.confirmBoxCarrier.setConfig(_ConfirmBoxCoreConfig);
        }
        
        setMessage(_Title: string, _Description: string = null): void {
            this.confirmBoxCarrier.setTitle(_Title);
            this.confirmBoxCarrier.setDescription(_Description);
        }
        
        setTitle(_Title: string): void {
            this.confirmBoxCarrier.setTitle(_Title);
        }
    
        setDescription(_Description: string): void {
            this.confirmBoxCarrier.setDescription(_Description);
        }
        
        setButtonLabels(_Confirm: string, _Decline?: string): void {
            this.confirmBoxCarrier.setButtonLabels(_Confirm, _Decline);
        }
        
    }
    
    export class ConfirmBoxResponse extends GlobalClass.DataControl implements ConfirmBoxInterface.IConfirmBoxResponse, ConfirmBoxInterface.IConfirmBoxPublicResponse {
        // private Response: DialogPrepareResponse            = new DialogPrepareResponse();
        
        Success: boolean        = null;
        ClickedButtonID: string = null;
        
        constructor() {
            super();
        }
        
        setSuccess(_IsSuccess: boolean): void {
            this.Success = _IsSuccess;
        }
        
        setClickedButtonID(_ClickedButtonID): void {
            this.ClickedButtonID = _ClickedButtonID;
        }
        
        
    }
    
    export class ConfirmBoxEventsController {
        
        defaultResponse: ConfirmBoxInterface.IPrivateResponseMerged;
        
        private readonly _afterClosed: Subject<ConfirmBoxInterface.IPrivateResponseMerged> = new Subject<ConfirmBoxInterface.IPrivateResponseMerged>();
        afterClosed$: Observable<ConfirmBoxInterface.IPrivateResponseMerged>               = this._afterClosed.asObservable();
        
        
        private readonly _onButtonClick: Subject<GlobalInterface.IButton> = new Subject<GlobalInterface.IButton>();
        onButtonClick$: Observable<GlobalInterface.IButton>               = this._onButtonClick.asObservable();
        private readonly _buttonList: Subject<GlobalInterface.IButton[]>  = new Subject<GlobalInterface.IButton[]>();
        buttonList$: Observable<GlobalInterface.IButton[]>                = this._buttonList.asObservable();
        
        constructor(private EntityUniqueID: string) {
        }
        
        
        close(_Response?: ConfirmBoxInterface.IPrivateResponseMerged): void {
            const response = _Response ? _Response : this.defaultResponse;
            this._afterClosed.next(response);
        }
        
        onButtonClick(_Button: GlobalInterface.IButton): void {
            this.defaultResponse.setClickedButtonID(_Button.ID);
            this._onButtonClick.next(_Button);
        }
        
        setButtonList(_ButtonList: GlobalInterface.IButton[]): void {
            this._buttonList.next(_ButtonList);
        }
        
        setDefaultResponse(_Response: ConfirmBoxInterface.IPrivateResponseMerged): void {
            this.defaultResponse = _Response;
        }
    }
    // endregion
    
    export class ConfirmBoxDefaultResponse extends ConfirmBoxResponse implements ConfirmBoxInterface.IPrivateResponseMerged {
        confirmBoxBelonging: ConfirmBoxBelonging = null;
        
        constructor() {
            super();
        }
        
        setBelonging(_ConfirmBoxBelonging): void {
            this.confirmBoxBelonging = _ConfirmBoxBelonging;
        }
        
    }
    
    export class ConfirmBoxCarrier {
        
        confirmBoxBelonging: ConfirmBoxClass.ConfirmBoxBelonging = new ConfirmBoxClass.ConfirmBoxBelonging();
        
        constructor() {
        }
        
        setButtons(_Buttons: GlobalInterface.IButton[]) {
            if (_Buttons.length) {
                this.confirmBoxBelonging.Buttons = _Buttons;
            }
        }
        
        setTitle(_Title: string): void {
            this.confirmBoxBelonging.Message.Title = _Title;
        }
    
        setDescription(_Description: string): void {
            this.confirmBoxBelonging.Message.Description = _Description;
        }
    
    
        setButtonLabels(_Confirm: string, _Decline: string): void {
            this.confirmBoxBelonging.ConfirmBoxCoreConfig.ConfirmLabel = _Confirm;
            this.confirmBoxBelonging.ConfirmBoxCoreConfig.DeclineLabel = _Decline;
        }
        
        setConfig(_ConfirmBoxBelonging: ConfirmBoxInterface.IConfirmBoxCoreConfig) {
            // region *** local UserConfig (defined on place where dialog is called) ***
            const dataControl = new GlobalClass.DataControl();
            dataControl.copyValuesFrom(_ConfirmBoxBelonging, this.confirmBoxBelonging.ConfirmBoxCoreConfig);
            // endregion
        }
        
        openConfirmBox$(): Observable<ConfirmBoxInterface.IPrivateResponseMerged> {
            const service: ConfirmBoxService = ServiceLocator.injector.get(ConfirmBoxService);
            const confirmBoxController       = service.open(this.confirmBoxBelonging);
            return confirmBoxController.afterClosed$;
        }
        
    }
    
    export class Settings {
        Buttons: GlobalInterface.IButton[]                      = [];
        ConfirmBoxCoreConfig: ConfirmBoxInterface.IConfirmBoxCoreConfig = new ConfirmBoxCoreConfig();
        Message: GlobalInterface.IMessage                       = new GlobalClass.Message();
    }
    
    export class ConfirmBoxCoreConfig implements ConfirmBoxInterface.IConfirmBoxCoreConfig {
        Width: string                     = null;
        Height: string                    = null;
        ButtonPosition: VerticalPosition  = null;
        LayoutType: DialogLayoutDisplay   = null;
        Message: GlobalInterface.IMessage = null;
        ConfirmLabel: string              = null;
        DeclineLabel: string              = null;
    }
    
    export class ConfirmBoxBelonging extends ConfirmBoxClass.Settings implements ConfirmBoxInterface.IConfirmBoxBelonging {
        
        EntityUniqueID: string = 'C' + Math.random().toString(36).substr(2, 9);
        EventsController: ConfirmBoxEventsController;
        
        constructor() {
            super();
            this.EventsController                                       = new ConfirmBoxEventsController(this.EntityUniqueID);
            const ConfirmBoxCoreConfigurator: ConfirmBoxConfigService = ServiceLocator.injector.get(ConfirmBoxConfigService);
            const baseSettings                                          = new ConfirmBoxClass.Settings();
            const dataControl                                           = new GlobalClass.DataControl();
            dataControl.copyValuesFrom(ConfirmBoxCoreConfigurator.productionConfig.ConfirmBoxCoreConfig, baseSettings.ConfirmBoxCoreConfig);
            this.ConfirmBoxCoreConfig = baseSettings.ConfirmBoxCoreConfig;
            this.Buttons          = ConfirmBoxCoreConfigurator.productionConfig.Buttons.slice();
        }
        
    }
    
    
}
