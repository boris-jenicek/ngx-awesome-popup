import { IDialogUserConfig } from './interfaces';
import * as i0 from "@angular/core";
export declare class DialogConfigService {
    private userConfig;
    authorConfig: IDialogUserConfig;
    productionConfig: IDialogUserConfig;
    constructor(userConfig?: IDialogUserConfig);
    static ɵfac: i0.ɵɵFactoryDeclaration<DialogConfigService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DialogConfigService>;
}
