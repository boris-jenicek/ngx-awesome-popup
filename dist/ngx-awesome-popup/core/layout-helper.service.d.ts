import { ButtonLayoutDisplay, DialogLayoutDisplay } from './enums';
import * as i0 from "@angular/core";
export declare class LayoutHelperService {
    getIconClasses(layoutType: DialogLayoutDisplay, iconStyleClass: string): string;
    getButtonClasses(layoutType: ButtonLayoutDisplay | DialogLayoutDisplay | null, perm?: string, type?: 'auto-button'): string;
    getBoxClasses(layoutType: DialogLayoutDisplay, perm?: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<LayoutHelperService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LayoutHelperService>;
}
