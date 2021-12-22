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
LayoutHelperService.ɵprov = i0.ɵɵdefineInjectable({ factory: function LayoutHelperService_Factory() { return new LayoutHelperService(); }, token: LayoutHelperService, providedIn: "root" });
LayoutHelperService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LWhlbHBlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbmd4LWF3ZXNvbWUtcG9wdXAvY29yZS9sYXlvdXQtaGVscGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxTQUFTLENBQUM7O0FBS25FLE1BQU0sT0FBTyxtQkFBbUI7SUFDOUIsY0FBYyxDQUFDLFVBQStCLEVBQUUsY0FBc0I7UUFDcEUsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLElBQUksY0FBYyxFQUFFO1lBQ2xCLFlBQVksSUFBSSxjQUFjLENBQUM7WUFDL0IsT0FBTyxZQUFZLENBQUM7U0FDckI7UUFDRCxRQUFRLFVBQVUsRUFBRTtZQUNsQixLQUFLLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNoQyxZQUFZLElBQUksbUNBQW1DLENBQUM7Z0JBQ3BELE1BQU07YUFDUDtZQUNELEtBQUssbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzdCLFlBQVksSUFBSSwrQkFBK0IsQ0FBQztnQkFDaEQsTUFBTTthQUNQO1lBQ0QsS0FBSyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDaEMsWUFBWSxJQUFJLDhCQUE4QixDQUFDO2dCQUMvQyxNQUFNO2FBQ1A7WUFDRCxLQUFLLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUMvQixZQUFZLElBQUksa0NBQWtDLENBQUM7Z0JBQ25ELE1BQU07YUFDUDtTQUNGO1FBQ0QsT0FBTyxZQUFZLENBQUM7SUFDdEIsQ0FBQztJQUVELGdCQUFnQixDQUFDLFVBQTRELEVBQUUsT0FBZSxFQUFFLEVBQUUsSUFBb0I7UUFDcEgsSUFBSSxZQUFZLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQztRQUM5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Q0FBQztnQkFDaEMsTUFBTTthQUNQO1lBQ0QsS0FBSyxtQkFBbUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDbkMsWUFBWSxJQUFJLGtCQUFrQixDQUFDO2dCQUNuQyxNQUFNO2FBQ1A7WUFDRCxLQUFLLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUNuQyxZQUFZLElBQUksa0JBQWtCLENBQUM7Z0JBQ25DLE1BQU07YUFDUDtZQUNELEtBQUssbUJBQW1CLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ3JDLFlBQVksSUFBSSxvQkFBb0IsQ0FBQztnQkFDckMsTUFBTTthQUNQO1lBQ0QsS0FBSyxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDcEMsWUFBWSxJQUFJLG1CQUFtQixDQUFDO2dCQUNwQyxNQUFNO2FBQ1A7WUFDRCxLQUFLLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUNwQyxZQUFZLElBQUksbUJBQW1CLENBQUM7Z0JBQ3BDLE1BQU07YUFDUDtTQUNGO1FBQ0QsT0FBTyxZQUFZLENBQUM7SUFDdEIsQ0FBQzs7OztZQTlJRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCdXR0b25MYXlvdXREaXNwbGF5LCBEaWFsb2dMYXlvdXREaXNwbGF5IH0gZnJvbSAnLi9lbnVtcyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIExheW91dEhlbHBlclNlcnZpY2Uge1xuICBnZXRJY29uQ2xhc3NlcyhsYXlvdXRUeXBlOiBEaWFsb2dMYXlvdXREaXNwbGF5LCBpY29uU3R5bGVDbGFzczogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBsZXQgcmV0dXJuU3RyaW5nID0gJyc7XG4gICAgaWYgKGljb25TdHlsZUNsYXNzKSB7XG4gICAgICByZXR1cm5TdHJpbmcgKz0gaWNvblN0eWxlQ2xhc3M7XG4gICAgICByZXR1cm4gcmV0dXJuU3RyaW5nO1xuICAgIH1cbiAgICBzd2l0Y2ggKGxheW91dFR5cGUpIHtcbiAgICAgIGNhc2UgRGlhbG9nTGF5b3V0RGlzcGxheS5TVUNDRVNTOiB7XG4gICAgICAgIHJldHVyblN0cmluZyArPSAnYXAtaWNvbi1zdWNjZXNzIGljb24tY2hlY2stY2lyY2xlJztcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIERpYWxvZ0xheW91dERpc3BsYXkuSU5GTzoge1xuICAgICAgICByZXR1cm5TdHJpbmcgKz0gJ2FwLWljb24taW5mbyBpY29uLWluZm8tY2lyY2xlJztcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIERpYWxvZ0xheW91dERpc3BsYXkuV0FSTklORzoge1xuICAgICAgICByZXR1cm5TdHJpbmcgKz0gJ2FwLWljb24td2FybmluZyBpY29uLXdhcm5pbmcnO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgRGlhbG9nTGF5b3V0RGlzcGxheS5EQU5HRVI6IHtcbiAgICAgICAgcmV0dXJuU3RyaW5nICs9ICdhcC1pY29uLWRhbmdlciBpY29uLXRpbWVzLWNpcmNsZSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmV0dXJuU3RyaW5nO1xuICB9XG5cbiAgZ2V0QnV0dG9uQ2xhc3NlcyhsYXlvdXRUeXBlOiBCdXR0b25MYXlvdXREaXNwbGF5IHwgRGlhbG9nTGF5b3V0RGlzcGxheSB8IG51bGwsIHBlcm06IHN0cmluZyA9ICcnLCB0eXBlPzogJ2F1dG8tYnV0dG9uJyk6IHN0cmluZyB7XG4gICAgbGV0IHJldHVyblN0cmluZyA9IHBlcm0gKyAnICc7XG4gICAgaWYgKHR5cGUgPT09ICdhdXRvLWJ1dHRvbicgJiYgbGF5b3V0VHlwZSA9PT0gRGlhbG9nTGF5b3V0RGlzcGxheS5OT05FKSB7XG4gICAgICBsYXlvdXRUeXBlID0gQnV0dG9uTGF5b3V0RGlzcGxheS5QUklNQVJZO1xuICAgIH1cbiAgICBzd2l0Y2ggKGxheW91dFR5cGUpIHtcbiAgICAgIGNhc2UgQnV0dG9uTGF5b3V0RGlzcGxheS5TVUNDRVNTOiB7XG4gICAgICAgIHJldHVyblN0cmluZyArPSAnZWQtYnRuLXN1Y2Nlc3MnO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgQnV0dG9uTGF5b3V0RGlzcGxheS5JTkZPOiB7XG4gICAgICAgIHJldHVyblN0cmluZyArPSAnZWQtYnRuLWluZm8nO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgQnV0dG9uTGF5b3V0RGlzcGxheS5XQVJOSU5HOiB7XG4gICAgICAgIHJldHVyblN0cmluZyArPSAnZWQtYnRuLXdhcm5pbmcnO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgQnV0dG9uTGF5b3V0RGlzcGxheS5EQU5HRVI6IHtcbiAgICAgICAgcmV0dXJuU3RyaW5nICs9ICdlZC1idG4tZGFuZ2VyJztcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIEJ1dHRvbkxheW91dERpc3BsYXkuREFSSzoge1xuICAgICAgICByZXR1cm5TdHJpbmcgKz0gJ2VkLWJ0bi1kYXJrJztcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIEJ1dHRvbkxheW91dERpc3BsYXkuTElHSFQ6IHtcbiAgICAgICAgcmV0dXJuU3RyaW5nICs9ICdlZC1idG4tbGlnaHQnO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgQnV0dG9uTGF5b3V0RGlzcGxheS5QUklNQVJZOiB7XG4gICAgICAgIHJldHVyblN0cmluZyArPSAnZWQtYnRuLXByaW1hcnknO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgQnV0dG9uTGF5b3V0RGlzcGxheS5TRUNPTkRBUlk6IHtcbiAgICAgICAgcmV0dXJuU3RyaW5nICs9ICdlZC1idG4tc2Vjb25kYXJ5JztcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIEJ1dHRvbkxheW91dERpc3BsYXkuTElOSzoge1xuICAgICAgICByZXR1cm5TdHJpbmcgKz0gJ2VkLWJ0bi1saW5rJztcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIEJ1dHRvbkxheW91dERpc3BsYXkuQ1VTVE9NX09ORToge1xuICAgICAgICByZXR1cm5TdHJpbmcgKz0gJ2VkLWJ0bi1jdXN0b21vbmUnO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgQnV0dG9uTGF5b3V0RGlzcGxheS5DVVNUT01fVFdPOiB7XG4gICAgICAgIHJldHVyblN0cmluZyArPSAnZWQtYnRuLWN1c3RvbXR3byc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBCdXR0b25MYXlvdXREaXNwbGF5LkNVU1RPTV9USFJFRToge1xuICAgICAgICByZXR1cm5TdHJpbmcgKz0gJ2VkLWJ0bi1jdXN0b210aHJlZSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBCdXR0b25MYXlvdXREaXNwbGF5LkNVU1RPTV9GT1VSOiB7XG4gICAgICAgIHJldHVyblN0cmluZyArPSAnZWQtYnRuLWN1c3RvbWZvdXInO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgQnV0dG9uTGF5b3V0RGlzcGxheS5DVVNUT01fRklWRToge1xuICAgICAgICByZXR1cm5TdHJpbmcgKz0gJ2VkLWJ0bi1jdXN0b21maXZlJztcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXR1cm5TdHJpbmc7XG4gIH1cblxuICBnZXRCb3hDbGFzc2VzKGxheW91dFR5cGU6IERpYWxvZ0xheW91dERpc3BsYXksIHBlcm06IHN0cmluZyA9ICcnKTogc3RyaW5nIHtcbiAgICBsZXQgcmV0dXJuU3RyaW5nID0gcGVybSArICcgJztcbiAgICBzd2l0Y2ggKGxheW91dFR5cGUpIHtcbiAgICAgIGNhc2UgRGlhbG9nTGF5b3V0RGlzcGxheS5OT05FOiB7XG4gICAgICAgIHJldHVyblN0cmluZyArPSAnc3RhbmRhcmQtZGlhbG9nJztcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIERpYWxvZ0xheW91dERpc3BsYXkuU1VDQ0VTUzoge1xuICAgICAgICByZXR1cm5TdHJpbmcgKz0gJ3N1Y2Nlc3MtZGlhbG9nJztcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIERpYWxvZ0xheW91dERpc3BsYXkuSU5GTzoge1xuICAgICAgICByZXR1cm5TdHJpbmcgKz0gJ2luZm8tZGlhbG9nJztcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIERpYWxvZ0xheW91dERpc3BsYXkuV0FSTklORzoge1xuICAgICAgICByZXR1cm5TdHJpbmcgKz0gJ3dhcm5pbmctZGlhbG9nJztcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIERpYWxvZ0xheW91dERpc3BsYXkuREFOR0VSOiB7XG4gICAgICAgIHJldHVyblN0cmluZyArPSAnZGFuZ2VyLWRpYWxvZyc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBEaWFsb2dMYXlvdXREaXNwbGF5LkNVU1RPTV9PTkU6IHtcbiAgICAgICAgcmV0dXJuU3RyaW5nICs9ICdjdXN0b21vbmUtZGlhbG9nJztcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIERpYWxvZ0xheW91dERpc3BsYXkuQ1VTVE9NX1RXTzoge1xuICAgICAgICByZXR1cm5TdHJpbmcgKz0gJ2N1c3RvbXR3by1kaWFsb2cnO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgRGlhbG9nTGF5b3V0RGlzcGxheS5DVVNUT01fVEhSRUU6IHtcbiAgICAgICAgcmV0dXJuU3RyaW5nICs9ICdjdXN0b210aHJlZS1kaWFsb2cnO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgRGlhbG9nTGF5b3V0RGlzcGxheS5DVVNUT01fRk9VUjoge1xuICAgICAgICByZXR1cm5TdHJpbmcgKz0gJ2N1c3RvbWZvdXItZGlhbG9nJztcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIERpYWxvZ0xheW91dERpc3BsYXkuQ1VTVE9NX0ZJVkU6IHtcbiAgICAgICAgcmV0dXJuU3RyaW5nICs9ICdjdXN0b21maXZlLWRpYWxvZyc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmV0dXJuU3RyaW5nO1xuICB9XG59XG4iXX0=