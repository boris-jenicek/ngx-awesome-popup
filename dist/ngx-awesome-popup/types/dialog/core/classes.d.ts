import { Type } from '@angular/core';
import { Observable } from 'rxjs';
import { DialogLayoutDisplay, VerticalPosition } from '../../../core/enums';
import { DataControl, Sizes } from '../../../core/global-classes';
import { IButton } from '../../../core/global-interfaces';
import { IDialogBelonging, IDialogCoreConfig, IDialogEventsController, IDialogPublicResponse, IDialogResponse, IPrivateResponseMerged } from './interfaces';
export declare class DialogInitializer {
    private component;
    private dialogCarrier;
    constructor(component: Type<any>);
    /** Generic method accept expected payload from dynamic child component.*/
    openDialog$<ResponsePayload = any>(): Observable<IDialogPublicResponse<ResponsePayload>>;
    /** It accepts list of custom buttons */
    setButtons(_Buttons: IButton[]): void;
    setCustomData(_CustomData: any): void;
    setConfig(_DialogConfig: IDialogCoreConfig): void;
}
export declare class DialogResponse extends DataControl implements IDialogResponse, IDialogPublicResponse<any> {
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
export declare class DialogEventsController implements IDialogEventsController {
    private EntityUniqueID;
    defaultResponse: IPrivateResponseMerged;
    private readonly _afterClosed;
    afterClosed$: Observable<IPrivateResponseMerged>;
    private readonly _afterLoader;
    afterLoader$: Observable<string>;
    private readonly _onButtonClick;
    onButtonClick$: Observable<IButton>;
    private readonly _buttonList;
    buttonList$: Observable<IButton[]>;
    constructor(EntityUniqueID: string);
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
    dialogBelonging: DialogBelonging;
    private component;
    constructor();
    setComponent(_Component: Type<any>): void;
    setButtons(_Buttons: IButton[]): void;
    setCustomData(_CustomData: any): void;
    setConfig(_DialogConfig: IDialogCoreConfig): void;
    openDialog$(): Observable<IPrivateResponseMerged>;
}
export declare class DialogCoreConfig extends Sizes implements IDialogCoreConfig {
    EscapeKeyClose: boolean;
    HideScrollbar: boolean;
    ButtonPosition: VerticalPosition;
    LayoutType: DialogLayoutDisplay;
    DisplayLoader: boolean;
    LoaderComponent: Type<any>;
}
export declare class DialogSettings {
    Buttons: IButton[];
    DialogCoreConfig: IDialogCoreConfig;
}
export declare class DialogBelonging<CustomData = any> extends DialogSettings implements IDialogBelonging {
    /** @internal */
    EntityUniqueID: string;
    CustomData: CustomData;
    EventsController: IDialogEventsController;
    constructor();
}