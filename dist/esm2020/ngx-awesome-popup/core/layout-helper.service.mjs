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
LayoutHelperService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: LayoutHelperService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
LayoutHelperService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: LayoutHelperService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: LayoutHelperService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LWhlbHBlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbmd4LWF3ZXNvbWUtcG9wdXAvY29yZS9sYXlvdXQtaGVscGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxTQUFTLENBQUM7O0FBS25FLE1BQU0sT0FBTyxtQkFBbUI7SUFDOUIsY0FBYyxDQUFDLFVBQStCLEVBQUUsY0FBc0I7UUFDcEUsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLElBQUksY0FBYyxFQUFFO1lBQ2xCLFlBQVksSUFBSSxjQUFjLENBQUM7WUFDL0IsT0FBTyxZQUFZLENBQUM7U0FDckI7UUFDRCxRQUFRLFVBQVUsRUFBRTtZQUNsQixLQUFLLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNoQyxZQUFZLElBQUksbUNBQW1DLENBQUM7Z0JBQ3BELE1BQU07YUFDUDtZQUNELEtBQUssbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzdCLFlBQVksSUFBSSwrQkFBK0IsQ0FBQztnQkFDaEQsTUFBTTthQUNQO1lBQ0QsS0FBSyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDaEMsWUFBWSxJQUFJLDhCQUE4QixDQUFDO2dCQUMvQyxNQUFNO2FBQ1A7WUFDRCxLQUFLLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUMvQixZQUFZLElBQUksa0NBQWtDLENBQUM7Z0JBQ25ELE1BQU07YUFDUDtTQUNGO1FBQ0QsT0FBTyxZQUFZLENBQUM7SUFDdEIsQ0FBQztJQUVELGdCQUFnQixDQUFDLFVBQTRELEVBQUUsT0FBZSxFQUFFLEVBQUUsSUFBb0I7UUFDcEgsSUFBSSxZQUFZLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQztRQUM5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Q0FBQztnQkFDaEMsTUFBTTthQUNQO1lBQ0QsS0FBSyxtQkFBbUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDbkMsWUFBWSxJQUFJLGtCQUFrQixDQUFDO2dCQUNuQyxNQUFNO2FBQ1A7WUFDRCxLQUFLLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUNuQyxZQUFZLElBQUksa0JBQWtCLENBQUM7Z0JBQ25DLE1BQU07YUFDUDtZQUNELEtBQUssbUJBQW1CLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ3JDLFlBQVksSUFBSSxvQkFBb0IsQ0FBQztnQkFDckMsTUFBTTthQUNQO1lBQ0QsS0FBSyxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDcEMsWUFBWSxJQUFJLG1CQUFtQixDQUFDO2dCQUNwQyxNQUFNO2FBQ1A7WUFDRCxLQUFLLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUNwQyxZQUFZLElBQUksbUJBQW1CLENBQUM7Z0JBQ3BDLE1BQU07YUFDUDtTQUNGO1FBQ0QsT0FBTyxZQUFZLENBQUM7SUFDdEIsQ0FBQzs7Z0hBM0lVLG1CQUFtQjtvSEFBbkIsbUJBQW1CLGNBRmxCLE1BQU07MkZBRVAsbUJBQW1CO2tCQUgvQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJ1dHRvbkxheW91dERpc3BsYXksIERpYWxvZ0xheW91dERpc3BsYXkgfSBmcm9tICcuL2VudW1zJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTGF5b3V0SGVscGVyU2VydmljZSB7XG4gIGdldEljb25DbGFzc2VzKGxheW91dFR5cGU6IERpYWxvZ0xheW91dERpc3BsYXksIGljb25TdHlsZUNsYXNzOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGxldCByZXR1cm5TdHJpbmcgPSAnJztcbiAgICBpZiAoaWNvblN0eWxlQ2xhc3MpIHtcbiAgICAgIHJldHVyblN0cmluZyArPSBpY29uU3R5bGVDbGFzcztcbiAgICAgIHJldHVybiByZXR1cm5TdHJpbmc7XG4gICAgfVxuICAgIHN3aXRjaCAobGF5b3V0VHlwZSkge1xuICAgICAgY2FzZSBEaWFsb2dMYXlvdXREaXNwbGF5LlNVQ0NFU1M6IHtcbiAgICAgICAgcmV0dXJuU3RyaW5nICs9ICdhcC1pY29uLXN1Y2Nlc3MgaWNvbi1jaGVjay1jaXJjbGUnO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgRGlhbG9nTGF5b3V0RGlzcGxheS5JTkZPOiB7XG4gICAgICAgIHJldHVyblN0cmluZyArPSAnYXAtaWNvbi1pbmZvIGljb24taW5mby1jaXJjbGUnO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgRGlhbG9nTGF5b3V0RGlzcGxheS5XQVJOSU5HOiB7XG4gICAgICAgIHJldHVyblN0cmluZyArPSAnYXAtaWNvbi13YXJuaW5nIGljb24td2FybmluZyc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBEaWFsb2dMYXlvdXREaXNwbGF5LkRBTkdFUjoge1xuICAgICAgICByZXR1cm5TdHJpbmcgKz0gJ2FwLWljb24tZGFuZ2VyIGljb24tdGltZXMtY2lyY2xlJztcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXR1cm5TdHJpbmc7XG4gIH1cblxuICBnZXRCdXR0b25DbGFzc2VzKGxheW91dFR5cGU6IEJ1dHRvbkxheW91dERpc3BsYXkgfCBEaWFsb2dMYXlvdXREaXNwbGF5IHwgbnVsbCwgcGVybTogc3RyaW5nID0gJycsIHR5cGU/OiAnYXV0by1idXR0b24nKTogc3RyaW5nIHtcbiAgICBsZXQgcmV0dXJuU3RyaW5nID0gcGVybSArICcgJztcbiAgICBpZiAodHlwZSA9PT0gJ2F1dG8tYnV0dG9uJyAmJiBsYXlvdXRUeXBlID09PSBEaWFsb2dMYXlvdXREaXNwbGF5Lk5PTkUpIHtcbiAgICAgIGxheW91dFR5cGUgPSBCdXR0b25MYXlvdXREaXNwbGF5LlBSSU1BUlk7XG4gICAgfVxuICAgIHN3aXRjaCAobGF5b3V0VHlwZSkge1xuICAgICAgY2FzZSBCdXR0b25MYXlvdXREaXNwbGF5LlNVQ0NFU1M6IHtcbiAgICAgICAgcmV0dXJuU3RyaW5nICs9ICdlZC1idG4tc3VjY2Vzcyc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBCdXR0b25MYXlvdXREaXNwbGF5LklORk86IHtcbiAgICAgICAgcmV0dXJuU3RyaW5nICs9ICdlZC1idG4taW5mbyc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBCdXR0b25MYXlvdXREaXNwbGF5LldBUk5JTkc6IHtcbiAgICAgICAgcmV0dXJuU3RyaW5nICs9ICdlZC1idG4td2FybmluZyc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBCdXR0b25MYXlvdXREaXNwbGF5LkRBTkdFUjoge1xuICAgICAgICByZXR1cm5TdHJpbmcgKz0gJ2VkLWJ0bi1kYW5nZXInO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgQnV0dG9uTGF5b3V0RGlzcGxheS5EQVJLOiB7XG4gICAgICAgIHJldHVyblN0cmluZyArPSAnZWQtYnRuLWRhcmsnO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgQnV0dG9uTGF5b3V0RGlzcGxheS5MSUdIVDoge1xuICAgICAgICByZXR1cm5TdHJpbmcgKz0gJ2VkLWJ0bi1saWdodCc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBCdXR0b25MYXlvdXREaXNwbGF5LlBSSU1BUlk6IHtcbiAgICAgICAgcmV0dXJuU3RyaW5nICs9ICdlZC1idG4tcHJpbWFyeSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBCdXR0b25MYXlvdXREaXNwbGF5LlNFQ09OREFSWToge1xuICAgICAgICByZXR1cm5TdHJpbmcgKz0gJ2VkLWJ0bi1zZWNvbmRhcnknO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgQnV0dG9uTGF5b3V0RGlzcGxheS5MSU5LOiB7XG4gICAgICAgIHJldHVyblN0cmluZyArPSAnZWQtYnRuLWxpbmsnO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgQnV0dG9uTGF5b3V0RGlzcGxheS5DVVNUT01fT05FOiB7XG4gICAgICAgIHJldHVyblN0cmluZyArPSAnZWQtYnRuLWN1c3RvbW9uZSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBCdXR0b25MYXlvdXREaXNwbGF5LkNVU1RPTV9UV086IHtcbiAgICAgICAgcmV0dXJuU3RyaW5nICs9ICdlZC1idG4tY3VzdG9tdHdvJztcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIEJ1dHRvbkxheW91dERpc3BsYXkuQ1VTVE9NX1RIUkVFOiB7XG4gICAgICAgIHJldHVyblN0cmluZyArPSAnZWQtYnRuLWN1c3RvbXRocmVlJztcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIEJ1dHRvbkxheW91dERpc3BsYXkuQ1VTVE9NX0ZPVVI6IHtcbiAgICAgICAgcmV0dXJuU3RyaW5nICs9ICdlZC1idG4tY3VzdG9tZm91cic7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBCdXR0b25MYXlvdXREaXNwbGF5LkNVU1RPTV9GSVZFOiB7XG4gICAgICAgIHJldHVyblN0cmluZyArPSAnZWQtYnRuLWN1c3RvbWZpdmUnO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJldHVyblN0cmluZztcbiAgfVxuXG4gIGdldEJveENsYXNzZXMobGF5b3V0VHlwZTogRGlhbG9nTGF5b3V0RGlzcGxheSwgcGVybTogc3RyaW5nID0gJycpOiBzdHJpbmcge1xuICAgIGxldCByZXR1cm5TdHJpbmcgPSBwZXJtICsgJyAnO1xuICAgIHN3aXRjaCAobGF5b3V0VHlwZSkge1xuICAgICAgY2FzZSBEaWFsb2dMYXlvdXREaXNwbGF5Lk5PTkU6IHtcbiAgICAgICAgcmV0dXJuU3RyaW5nICs9ICdzdGFuZGFyZC1kaWFsb2cnO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgRGlhbG9nTGF5b3V0RGlzcGxheS5TVUNDRVNTOiB7XG4gICAgICAgIHJldHVyblN0cmluZyArPSAnc3VjY2Vzcy1kaWFsb2cnO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgRGlhbG9nTGF5b3V0RGlzcGxheS5JTkZPOiB7XG4gICAgICAgIHJldHVyblN0cmluZyArPSAnaW5mby1kaWFsb2cnO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgRGlhbG9nTGF5b3V0RGlzcGxheS5XQVJOSU5HOiB7XG4gICAgICAgIHJldHVyblN0cmluZyArPSAnd2FybmluZy1kaWFsb2cnO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgRGlhbG9nTGF5b3V0RGlzcGxheS5EQU5HRVI6IHtcbiAgICAgICAgcmV0dXJuU3RyaW5nICs9ICdkYW5nZXItZGlhbG9nJztcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIERpYWxvZ0xheW91dERpc3BsYXkuQ1VTVE9NX09ORToge1xuICAgICAgICByZXR1cm5TdHJpbmcgKz0gJ2N1c3RvbW9uZS1kaWFsb2cnO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgRGlhbG9nTGF5b3V0RGlzcGxheS5DVVNUT01fVFdPOiB7XG4gICAgICAgIHJldHVyblN0cmluZyArPSAnY3VzdG9tdHdvLWRpYWxvZyc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBEaWFsb2dMYXlvdXREaXNwbGF5LkNVU1RPTV9USFJFRToge1xuICAgICAgICByZXR1cm5TdHJpbmcgKz0gJ2N1c3RvbXRocmVlLWRpYWxvZyc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBEaWFsb2dMYXlvdXREaXNwbGF5LkNVU1RPTV9GT1VSOiB7XG4gICAgICAgIHJldHVyblN0cmluZyArPSAnY3VzdG9tZm91ci1kaWFsb2cnO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgRGlhbG9nTGF5b3V0RGlzcGxheS5DVVNUT01fRklWRToge1xuICAgICAgICByZXR1cm5TdHJpbmcgKz0gJ2N1c3RvbWZpdmUtZGlhbG9nJztcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXR1cm5TdHJpbmc7XG4gIH1cbn1cbiJdfQ==