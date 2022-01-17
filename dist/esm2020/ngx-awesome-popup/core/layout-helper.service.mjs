import { Injectable } from '@angular/core';
import { ButtonLayoutDisplay, DialogLayoutDisplay } from './enums';
import * as i0 from "@angular/core";
export class LayoutHelperService {
    getIconClasses(layoutType, iconStyleClass) {
        let returnString = '';
        if (iconStyleClass) {
            returnString += iconStyleClass;
            return returnString;
        }
        switch (layoutType) {
            case DialogLayoutDisplay.SUCCESS: {
                returnString += 'ap-icon-success icon-check-circle';
                break;
            }
            case DialogLayoutDisplay.INFO: {
                returnString += 'ap-icon-info icon-info-circle';
                break;
            }
            case DialogLayoutDisplay.WARNING: {
                returnString += 'ap-icon-warning icon-warning';
                break;
            }
            case DialogLayoutDisplay.DANGER: {
                returnString += 'ap-icon-danger icon-times-circle';
                break;
            }
        }
        return returnString;
    }
    getButtonClasses(layoutType, perm = '', type) {
        let returnString = perm + ' ';
        if (type === 'auto-button' && layoutType === DialogLayoutDisplay.NONE) {
            layoutType = ButtonLayoutDisplay.PRIMARY;
        }
        switch (layoutType) {
            case ButtonLayoutDisplay.SUCCESS: {
                returnString += 'ed-btn-success';
                break;
            }
            case ButtonLayoutDisplay.INFO: {
                returnString += 'ed-btn-info';
                break;
            }
            case ButtonLayoutDisplay.WARNING: {
                returnString += 'ed-btn-warning';
                break;
            }
            case ButtonLayoutDisplay.DANGER: {
                returnString += 'ed-btn-danger';
                break;
            }
            case ButtonLayoutDisplay.DARK: {
                returnString += 'ed-btn-dark';
                break;
            }
            case ButtonLayoutDisplay.LIGHT: {
                returnString += 'ed-btn-light';
                break;
            }
            case ButtonLayoutDisplay.PRIMARY: {
                returnString += 'ed-btn-primary';
                break;
            }
            case ButtonLayoutDisplay.SECONDARY: {
                returnString += 'ed-btn-secondary';
                break;
            }
            case ButtonLayoutDisplay.LINK: {
                returnString += 'ed-btn-link';
                break;
            }
            case ButtonLayoutDisplay.CUSTOM_ONE: {
                returnString += 'ed-btn-customone';
                break;
            }
            case ButtonLayoutDisplay.CUSTOM_TWO: {
                returnString += 'ed-btn-customtwo';
                break;
            }
            case ButtonLayoutDisplay.CUSTOM_THREE: {
                returnString += 'ed-btn-customthree';
                break;
            }
            case ButtonLayoutDisplay.CUSTOM_FOUR: {
                returnString += 'ed-btn-customfour';
                break;
            }
            case ButtonLayoutDisplay.CUSTOM_FIVE: {
                returnString += 'ed-btn-customfive';
                break;
            }
        }
        return returnString;
    }
    getBoxClasses(layoutType, perm = '') {
        let returnString = perm + ' ';
        switch (layoutType) {
            case DialogLayoutDisplay.NONE: {
                returnString += 'standard-dialog';
                break;
            }
            case DialogLayoutDisplay.SUCCESS: {
                returnString += 'success-dialog';
                break;
            }
            case DialogLayoutDisplay.INFO: {
                returnString += 'info-dialog';
                break;
            }
            case DialogLayoutDisplay.WARNING: {
                returnString += 'warning-dialog';
                break;
            }
            case DialogLayoutDisplay.DANGER: {
                returnString += 'danger-dialog';
                break;
            }
            case DialogLayoutDisplay.CUSTOM_ONE: {
                returnString += 'customone-dialog';
                break;
            }
            case DialogLayoutDisplay.CUSTOM_TWO: {
                returnString += 'customtwo-dialog';
                break;
            }
            case DialogLayoutDisplay.CUSTOM_THREE: {
                returnString += 'customthree-dialog';
                break;
            }
            case DialogLayoutDisplay.CUSTOM_FOUR: {
                returnString += 'customfour-dialog';
                break;
            }
            case DialogLayoutDisplay.CUSTOM_FIVE: {
                returnString += 'customfive-dialog';
                break;
            }
        }
        return returnString;
    }
}
LayoutHelperService.ɵfac = function LayoutHelperService_Factory(t) { return new (t || LayoutHelperService)(); };
LayoutHelperService.ɵprov = i0.ɵɵdefineInjectable({ token: LayoutHelperService, factory: LayoutHelperService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LayoutHelperService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LWhlbHBlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbmd4LWF3ZXNvbWUtcG9wdXAvY29yZS9sYXlvdXQtaGVscGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxTQUFTLENBQUM7O0FBS25FLE1BQU0sT0FBTyxtQkFBbUI7SUFDOUIsY0FBYyxDQUFDLFVBQStCLEVBQUUsY0FBc0I7UUFDcEUsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLElBQUksY0FBYyxFQUFFO1lBQ2xCLFlBQVksSUFBSSxjQUFjLENBQUM7WUFDL0IsT0FBTyxZQUFZLENBQUM7U0FDckI7UUFDRCxRQUFRLFVBQVUsRUFBRTtZQUNsQixLQUFLLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNoQyxZQUFZLElBQUksbUNBQW1DLENBQUM7Z0JBQ3BELE1BQU07YUFDUDtZQUNELEtBQUssbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzdCLFlBQVksSUFBSSwrQkFBK0IsQ0FBQztnQkFDaEQsTUFBTTthQUNQO1lBQ0QsS0FBSyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDaEMsWUFBWSxJQUFJLDhCQUE4QixDQUFDO2dCQUMvQyxNQUFNO2FBQ1A7WUFDRCxLQUFLLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUMvQixZQUFZLElBQUksa0NBQWtDLENBQUM7Z0JBQ25ELE1BQU07YUFDUDtTQUNGO1FBQ0QsT0FBTyxZQUFZLENBQUM7SUFDdEIsQ0FBQztJQUVELGdCQUFnQixDQUFDLFVBQTRELEVBQUUsT0FBZSxFQUFFLEVBQUUsSUFBb0I7UUFDcEgsSUFBSSxZQUFZLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQztRQUM5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Q0FBQztnQkFDaEMsTUFBTTthQUNQO1lBQ0QsS0FBSyxtQkFBbUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDbkMsWUFBWSxJQUFJLGtCQUFrQixDQUFDO2dCQUNuQyxNQUFNO2FBQ1A7WUFDRCxLQUFLLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUNuQyxZQUFZLElBQUksa0JBQWtCLENBQUM7Z0JBQ25DLE1BQU07YUFDUDtZQUNELEtBQUssbUJBQW1CLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ3JDLFlBQVksSUFBSSxvQkFBb0IsQ0FBQztnQkFDckMsTUFBTTthQUNQO1lBQ0QsS0FBSyxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDcEMsWUFBWSxJQUFJLG1CQUFtQixDQUFDO2dCQUNwQyxNQUFNO2FBQ1A7WUFDRCxLQUFLLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUNwQyxZQUFZLElBQUksbUJBQW1CLENBQUM7Z0JBQ3BDLE1BQU07YUFDUDtTQUNGO1FBQ0QsT0FBTyxZQUFZLENBQUM7SUFDdEIsQ0FBQzs7c0ZBM0lVLG1CQUFtQjsyREFBbkIsbUJBQW1CLFdBQW5CLG1CQUFtQixtQkFGbEIsTUFBTTt1RkFFUCxtQkFBbUI7Y0FIL0IsVUFBVTtlQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQnV0dG9uTGF5b3V0RGlzcGxheSwgRGlhbG9nTGF5b3V0RGlzcGxheSB9IGZyb20gJy4vZW51bXMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBMYXlvdXRIZWxwZXJTZXJ2aWNlIHtcbiAgZ2V0SWNvbkNsYXNzZXMobGF5b3V0VHlwZTogRGlhbG9nTGF5b3V0RGlzcGxheSwgaWNvblN0eWxlQ2xhc3M6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgbGV0IHJldHVyblN0cmluZyA9ICcnO1xuICAgIGlmIChpY29uU3R5bGVDbGFzcykge1xuICAgICAgcmV0dXJuU3RyaW5nICs9IGljb25TdHlsZUNsYXNzO1xuICAgICAgcmV0dXJuIHJldHVyblN0cmluZztcbiAgICB9XG4gICAgc3dpdGNoIChsYXlvdXRUeXBlKSB7XG4gICAgICBjYXNlIERpYWxvZ0xheW91dERpc3BsYXkuU1VDQ0VTUzoge1xuICAgICAgICByZXR1cm5TdHJpbmcgKz0gJ2FwLWljb24tc3VjY2VzcyBpY29uLWNoZWNrLWNpcmNsZSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBEaWFsb2dMYXlvdXREaXNwbGF5LklORk86IHtcbiAgICAgICAgcmV0dXJuU3RyaW5nICs9ICdhcC1pY29uLWluZm8gaWNvbi1pbmZvLWNpcmNsZSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBEaWFsb2dMYXlvdXREaXNwbGF5LldBUk5JTkc6IHtcbiAgICAgICAgcmV0dXJuU3RyaW5nICs9ICdhcC1pY29uLXdhcm5pbmcgaWNvbi13YXJuaW5nJztcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIERpYWxvZ0xheW91dERpc3BsYXkuREFOR0VSOiB7XG4gICAgICAgIHJldHVyblN0cmluZyArPSAnYXAtaWNvbi1kYW5nZXIgaWNvbi10aW1lcy1jaXJjbGUnO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJldHVyblN0cmluZztcbiAgfVxuXG4gIGdldEJ1dHRvbkNsYXNzZXMobGF5b3V0VHlwZTogQnV0dG9uTGF5b3V0RGlzcGxheSB8IERpYWxvZ0xheW91dERpc3BsYXkgfCBudWxsLCBwZXJtOiBzdHJpbmcgPSAnJywgdHlwZT86ICdhdXRvLWJ1dHRvbicpOiBzdHJpbmcge1xuICAgIGxldCByZXR1cm5TdHJpbmcgPSBwZXJtICsgJyAnO1xuICAgIGlmICh0eXBlID09PSAnYXV0by1idXR0b24nICYmIGxheW91dFR5cGUgPT09IERpYWxvZ0xheW91dERpc3BsYXkuTk9ORSkge1xuICAgICAgbGF5b3V0VHlwZSA9IEJ1dHRvbkxheW91dERpc3BsYXkuUFJJTUFSWTtcbiAgICB9XG4gICAgc3dpdGNoIChsYXlvdXRUeXBlKSB7XG4gICAgICBjYXNlIEJ1dHRvbkxheW91dERpc3BsYXkuU1VDQ0VTUzoge1xuICAgICAgICByZXR1cm5TdHJpbmcgKz0gJ2VkLWJ0bi1zdWNjZXNzJztcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIEJ1dHRvbkxheW91dERpc3BsYXkuSU5GTzoge1xuICAgICAgICByZXR1cm5TdHJpbmcgKz0gJ2VkLWJ0bi1pbmZvJztcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIEJ1dHRvbkxheW91dERpc3BsYXkuV0FSTklORzoge1xuICAgICAgICByZXR1cm5TdHJpbmcgKz0gJ2VkLWJ0bi13YXJuaW5nJztcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIEJ1dHRvbkxheW91dERpc3BsYXkuREFOR0VSOiB7XG4gICAgICAgIHJldHVyblN0cmluZyArPSAnZWQtYnRuLWRhbmdlcic7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBCdXR0b25MYXlvdXREaXNwbGF5LkRBUks6IHtcbiAgICAgICAgcmV0dXJuU3RyaW5nICs9ICdlZC1idG4tZGFyayc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBCdXR0b25MYXlvdXREaXNwbGF5LkxJR0hUOiB7XG4gICAgICAgIHJldHVyblN0cmluZyArPSAnZWQtYnRuLWxpZ2h0JztcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIEJ1dHRvbkxheW91dERpc3BsYXkuUFJJTUFSWToge1xuICAgICAgICByZXR1cm5TdHJpbmcgKz0gJ2VkLWJ0bi1wcmltYXJ5JztcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIEJ1dHRvbkxheW91dERpc3BsYXkuU0VDT05EQVJZOiB7XG4gICAgICAgIHJldHVyblN0cmluZyArPSAnZWQtYnRuLXNlY29uZGFyeSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBCdXR0b25MYXlvdXREaXNwbGF5LkxJTks6IHtcbiAgICAgICAgcmV0dXJuU3RyaW5nICs9ICdlZC1idG4tbGluayc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBCdXR0b25MYXlvdXREaXNwbGF5LkNVU1RPTV9PTkU6IHtcbiAgICAgICAgcmV0dXJuU3RyaW5nICs9ICdlZC1idG4tY3VzdG9tb25lJztcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIEJ1dHRvbkxheW91dERpc3BsYXkuQ1VTVE9NX1RXTzoge1xuICAgICAgICByZXR1cm5TdHJpbmcgKz0gJ2VkLWJ0bi1jdXN0b210d28nO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgQnV0dG9uTGF5b3V0RGlzcGxheS5DVVNUT01fVEhSRUU6IHtcbiAgICAgICAgcmV0dXJuU3RyaW5nICs9ICdlZC1idG4tY3VzdG9tdGhyZWUnO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgQnV0dG9uTGF5b3V0RGlzcGxheS5DVVNUT01fRk9VUjoge1xuICAgICAgICByZXR1cm5TdHJpbmcgKz0gJ2VkLWJ0bi1jdXN0b21mb3VyJztcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIEJ1dHRvbkxheW91dERpc3BsYXkuQ1VTVE9NX0ZJVkU6IHtcbiAgICAgICAgcmV0dXJuU3RyaW5nICs9ICdlZC1idG4tY3VzdG9tZml2ZSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmV0dXJuU3RyaW5nO1xuICB9XG5cbiAgZ2V0Qm94Q2xhc3NlcyhsYXlvdXRUeXBlOiBEaWFsb2dMYXlvdXREaXNwbGF5LCBwZXJtOiBzdHJpbmcgPSAnJyk6IHN0cmluZyB7XG4gICAgbGV0IHJldHVyblN0cmluZyA9IHBlcm0gKyAnICc7XG4gICAgc3dpdGNoIChsYXlvdXRUeXBlKSB7XG4gICAgICBjYXNlIERpYWxvZ0xheW91dERpc3BsYXkuTk9ORToge1xuICAgICAgICByZXR1cm5TdHJpbmcgKz0gJ3N0YW5kYXJkLWRpYWxvZyc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBEaWFsb2dMYXlvdXREaXNwbGF5LlNVQ0NFU1M6IHtcbiAgICAgICAgcmV0dXJuU3RyaW5nICs9ICdzdWNjZXNzLWRpYWxvZyc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBEaWFsb2dMYXlvdXREaXNwbGF5LklORk86IHtcbiAgICAgICAgcmV0dXJuU3RyaW5nICs9ICdpbmZvLWRpYWxvZyc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBEaWFsb2dMYXlvdXREaXNwbGF5LldBUk5JTkc6IHtcbiAgICAgICAgcmV0dXJuU3RyaW5nICs9ICd3YXJuaW5nLWRpYWxvZyc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBEaWFsb2dMYXlvdXREaXNwbGF5LkRBTkdFUjoge1xuICAgICAgICByZXR1cm5TdHJpbmcgKz0gJ2Rhbmdlci1kaWFsb2cnO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgRGlhbG9nTGF5b3V0RGlzcGxheS5DVVNUT01fT05FOiB7XG4gICAgICAgIHJldHVyblN0cmluZyArPSAnY3VzdG9tb25lLWRpYWxvZyc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBEaWFsb2dMYXlvdXREaXNwbGF5LkNVU1RPTV9UV086IHtcbiAgICAgICAgcmV0dXJuU3RyaW5nICs9ICdjdXN0b210d28tZGlhbG9nJztcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIERpYWxvZ0xheW91dERpc3BsYXkuQ1VTVE9NX1RIUkVFOiB7XG4gICAgICAgIHJldHVyblN0cmluZyArPSAnY3VzdG9tdGhyZWUtZGlhbG9nJztcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIERpYWxvZ0xheW91dERpc3BsYXkuQ1VTVE9NX0ZPVVI6IHtcbiAgICAgICAgcmV0dXJuU3RyaW5nICs9ICdjdXN0b21mb3VyLWRpYWxvZyc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBEaWFsb2dMYXlvdXREaXNwbGF5LkNVU1RPTV9GSVZFOiB7XG4gICAgICAgIHJldHVyblN0cmluZyArPSAnY3VzdG9tZml2ZS1kaWFsb2cnO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJldHVyblN0cmluZztcbiAgfVxufVxuIl19