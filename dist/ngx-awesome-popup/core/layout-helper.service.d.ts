import { ButtonLayoutDisplay, DialogLayoutDisplay } from './enums';
export declare class LayoutHelperService {
    getIconClasses(layoutType: DialogLayoutDisplay, iconStyleClass: string): string;
    getButtonClasses(layoutType: ButtonLayoutDisplay | DialogLayoutDisplay | null, perm?: string, type?: 'auto-button'): string;
    getBoxClasses(layoutType: DialogLayoutDisplay, perm?: string): string;
}
