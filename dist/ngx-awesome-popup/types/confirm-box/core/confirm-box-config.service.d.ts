import { IConfirmBoxUserConfig } from './interfaces';
import * as i0 from "@angular/core";
export declare class ConfirmBoxConfigService {
    private userConfig;
    authorConfig: IConfirmBoxUserConfig;
    productionConfig: IConfirmBoxUserConfig;
    constructor(userConfig?: IConfirmBoxUserConfig);
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfirmBoxConfigService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConfirmBoxConfigService>;
}
