import { GlobalConfigService } from '../../../core/global-config.service';
import { IDialogUserConfig } from './interfaces';
import * as i0 from "@angular/core";
export declare class DialogConfigService {
    private userConfig;
    private gConfigService;
    authorConfig: IDialogUserConfig;
    productionConfig: IDialogUserConfig;
    constructor(userConfig: IDialogUserConfig, gConfigService: GlobalConfigService);
    static ɵfac: i0.ɵɵFactoryDeclaration<DialogConfigService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DialogConfigService>;
}
