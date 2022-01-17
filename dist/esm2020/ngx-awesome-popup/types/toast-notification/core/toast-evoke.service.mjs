var _ToastEvokeService_instances, _ToastEvokeService_extender;
import { __classPrivateFieldGet } from "tslib";
import { Injectable } from '@angular/core';
import { DialogLayoutDisplay } from '../../../core/enums';
import { ToastNotificationInitializer } from './classes';
import * as i0 from "@angular/core";
export class ToastEvokeService {
    constructor() {
        _ToastEvokeService_instances.add(this);
    }
    success(title, message, confirmLabel, declineLabel) {
        const toast = __classPrivateFieldGet(this, _ToastEvokeService_instances, "m", _ToastEvokeService_extender).call(this, title, message, confirmLabel, declineLabel);
        toast.setConfig({
            layoutType: DialogLayoutDisplay.SUCCESS
        });
        return toast.openToastNotification$();
    }
    info(title, message, confirmLabel, declineLabel) {
        const toast = __classPrivateFieldGet(this, _ToastEvokeService_instances, "m", _ToastEvokeService_extender).call(this, title, message, confirmLabel, declineLabel);
        toast.setConfig({
            layoutType: DialogLayoutDisplay.INFO
        });
        return toast.openToastNotification$();
    }
    warning(title, message, confirmLabel, declineLabel) {
        const toast = __classPrivateFieldGet(this, _ToastEvokeService_instances, "m", _ToastEvokeService_extender).call(this, title, message, confirmLabel, declineLabel);
        toast.setConfig({
            layoutType: DialogLayoutDisplay.WARNING
        });
        return toast.openToastNotification$();
    }
    danger(title, message, confirmLabel, declineLabel) {
        const toast = __classPrivateFieldGet(this, _ToastEvokeService_instances, "m", _ToastEvokeService_extender).call(this, title, message, confirmLabel, declineLabel);
        toast.setConfig({
            layoutType: DialogLayoutDisplay.DANGER
        });
        return toast.openToastNotification$();
    }
    customOne(title, message, confirmLabel, declineLabel) {
        const toast = __classPrivateFieldGet(this, _ToastEvokeService_instances, "m", _ToastEvokeService_extender).call(this, title, message, confirmLabel, declineLabel);
        toast.setConfig({
            layoutType: DialogLayoutDisplay.CUSTOM_ONE
        });
        return toast.openToastNotification$();
    }
    customTwo(title, message, confirmLabel, declineLabel) {
        const toast = __classPrivateFieldGet(this, _ToastEvokeService_instances, "m", _ToastEvokeService_extender).call(this, title, message, confirmLabel, declineLabel);
        toast.setConfig({
            layoutType: DialogLayoutDisplay.CUSTOM_TWO
        });
        return toast.openToastNotification$();
    }
    customThree(title, message, confirmLabel, declineLabel) {
        const toast = __classPrivateFieldGet(this, _ToastEvokeService_instances, "m", _ToastEvokeService_extender).call(this, title, message, confirmLabel, declineLabel);
        toast.setConfig({
            layoutType: DialogLayoutDisplay.CUSTOM_THREE
        });
        return toast.openToastNotification$();
    }
    customFour(title, message, confirmLabel, declineLabel) {
        const toast = __classPrivateFieldGet(this, _ToastEvokeService_instances, "m", _ToastEvokeService_extender).call(this, title, message, confirmLabel, declineLabel);
        toast.setConfig({
            layoutType: DialogLayoutDisplay.CUSTOM_FOUR
        });
        return toast.openToastNotification$();
    }
    customFive(title, message, confirmLabel, declineLabel) {
        const toast = __classPrivateFieldGet(this, _ToastEvokeService_instances, "m", _ToastEvokeService_extender).call(this, title, message, confirmLabel, declineLabel);
        toast.setConfig({
            layoutType: DialogLayoutDisplay.CUSTOM_FIVE
        });
        return toast.openToastNotification$();
    }
}
_ToastEvokeService_instances = new WeakSet(), _ToastEvokeService_extender = function _ToastEvokeService_extender(title, message, confirmLabel, declineLabel) {
    const toast = new ToastNotificationInitializer();
    toast.setTitle(title);
    toast.setMessage(message);
    toast.setButtonLabels(confirmLabel, declineLabel);
    return toast;
};
ToastEvokeService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ToastEvokeService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ToastEvokeService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ToastEvokeService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ToastEvokeService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3QtZXZva2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL25neC1hd2Vzb21lLXBvcHVwL3R5cGVzL3RvYXN0LW5vdGlmaWNhdGlvbi9jb3JlL3RvYXN0LWV2b2tlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzFELE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLFdBQVcsQ0FBQzs7QUFNekQsTUFBTSxPQUFPLGlCQUFpQjtJQUg5Qjs7S0FtRkM7SUEvRUMsT0FBTyxDQUFDLEtBQWEsRUFBRSxPQUFlLEVBQUUsWUFBcUIsRUFBRSxZQUFxQjtRQUNsRixNQUFNLEtBQUssR0FBRyx1QkFBQSxJQUFJLGlFQUFVLE1BQWQsSUFBSSxFQUFXLEtBQUssRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ3pFLEtBQUssQ0FBQyxTQUFTLENBQUM7WUFDZCxVQUFVLEVBQUUsbUJBQW1CLENBQUMsT0FBTztTQUN4QyxDQUFDLENBQUM7UUFDSCxPQUFPLEtBQUssQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFFRCxJQUFJLENBQUMsS0FBYSxFQUFFLE9BQWUsRUFBRSxZQUFxQixFQUFFLFlBQXFCO1FBQy9FLE1BQU0sS0FBSyxHQUFHLHVCQUFBLElBQUksaUVBQVUsTUFBZCxJQUFJLEVBQVcsS0FBSyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDekUsS0FBSyxDQUFDLFNBQVMsQ0FBQztZQUNkLFVBQVUsRUFBRSxtQkFBbUIsQ0FBQyxJQUFJO1NBQ3JDLENBQUMsQ0FBQztRQUNILE9BQU8sS0FBSyxDQUFDLHNCQUFzQixFQUFFLENBQUM7SUFDeEMsQ0FBQztJ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UyxDQUFDO1lBQ2QsVUFBVSxFQUFFLG1CQUFtQixDQUFDLFdBQVc7U0FDNUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxLQUFLLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztJQUN4QyxDQUFDOztpSEFFUyxLQUFhLEVBQUUsT0FBZSxFQUFFLFlBQXFCLEVBQUUsWUFBcUI7SUFDcEYsTUFBTSxLQUFLLEdBQUcsSUFBSSw0QkFBNEIsRUFBRSxDQUFDO0lBQ2pELEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEIsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMxQixLQUFLLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBRSxZQUFZLENBQUMsQ0FBQztJQUNsRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7OEdBL0VVLGlCQUFpQjtrSEFBakIsaUJBQWlCLGNBRmhCLE1BQU07MkZBRVAsaUJBQWlCO2tCQUg3QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERpYWxvZ0xheW91dERpc3BsYXkgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudW1zJztcbmltcG9ydCB7IFRvYXN0Tm90aWZpY2F0aW9uSW5pdGlhbGl6ZXIgfSBmcm9tICcuL2NsYXNzZXMnO1xuaW1wb3J0IHsgSVRvYXN0Tm90aWZpY2F0aW9uUHVibGljUmVzcG9uc2UgfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBUb2FzdEV2b2tlU2VydmljZSB7XG4gIHN1Y2Nlc3ModGl0bGU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nLCBjb25maXJtTGFiZWw/OiBzdHJpbmcsIGRlY2xpbmVMYWJlbD86IHN0cmluZyk6IE9ic2VydmFibGU8SVRvYXN0Tm90aWZpY2F0aW9uUHVibGljUmVzcG9uc2U+IHtcbiAgICBjb25zdCB0b2FzdCA9IHRoaXMuI2V4dGVuZGVyKHRpdGxlLCBtZXNzYWdlLCBjb25maXJtTGFiZWwsIGRlY2xpbmVMYWJlbCk7XG4gICAgdG9hc3Quc2V0Q29uZmlnKHtcbiAgICAgIGxheW91dFR5cGU6IERpYWxvZ0xheW91dERpc3BsYXkuU1VDQ0VTU1xuICAgIH0pO1xuICAgIHJldHVybiB0b2FzdC5vcGVuVG9hc3ROb3RpZmljYXRpb24kKCk7XG4gIH1cblxuICBpbmZvKHRpdGxlOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZywgY29uZmlybUxhYmVsPzogc3RyaW5nLCBkZWNsaW5lTGFiZWw/OiBzdHJpbmcpOiBPYnNlcnZhYmxlPElUb2FzdE5vdGlmaWNhdGlvblB1YmxpY1Jlc3BvbnNlPiB7XG4gICAgY29uc3QgdG9hc3QgPSB0aGlzLiNleHRlbmRlcih0aXRsZSwgbWVzc2FnZSwgY29uZmlybUxhYmVsLCBkZWNsaW5lTGFiZWwpO1xuICAgIHRvYXN0LnNldENvbmZpZyh7XG4gICAgICBsYXlvdXRUeXBlOiBEaWFsb2dMYXlvdXREaXNwbGF5LklORk9cbiAgICB9KTtcbiAgICByZXR1cm4gdG9hc3Qub3BlblRvYXN0Tm90aWZpY2F0aW9uJCgpO1xuICB9XG5cbiAgd2FybmluZyh0aXRsZTogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcsIGNvbmZpcm1MYWJlbD86IHN0cmluZywgZGVjbGluZUxhYmVsPzogc3RyaW5nKTogT2JzZXJ2YWJsZTxJVG9hc3ROb3RpZmljYXRpb25QdWJsaWNSZXNwb25zZT4ge1xuICAgIGNvbnN0IHRvYXN0ID0gdGhpcy4jZXh0ZW5kZXIodGl0bGUsIG1lc3NhZ2UsIGNvbmZpcm1MYWJlbCwgZGVjbGluZUxhYmVsKTtcbiAgICB0b2FzdC5zZXRDb25maWcoe1xuICAgICAgbGF5b3V0VHlwZTogRGlhbG9nTGF5b3V0RGlzcGxheS5XQVJOSU5HXG4gICAgfSk7XG4gICAgcmV0dXJuIHRvYXN0Lm9wZW5Ub2FzdE5vdGlmaWNhdGlvbiQoKTtcbiAgfVxuXG4gIGRhbmdlcih0aXRsZTogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcsIGNvbmZpcm1MYWJlbD86IHN0cmluZywgZGVjbGluZUxhYmVsPzogc3RyaW5nKTogT2JzZXJ2YWJsZTxJVG9hc3ROb3RpZmljYXRpb25QdWJsaWNSZXNwb25zZT4ge1xuICAgIGNvbnN0IHRvYXN0ID0gdGhpcy4jZXh0ZW5kZXIodGl0bGUsIG1lc3NhZ2UsIGNvbmZpcm1MYWJlbCwgZGVjbGluZUxhYmVsKTtcbiAgICB0b2FzdC5zZXRDb25maWcoe1xuICAgICAgbGF5b3V0VHlwZTogRGlhbG9nTGF5b3V0RGlzcGxheS5EQU5HRVJcbiAgICB9KTtcbiAgICByZXR1cm4gdG9hc3Qub3BlblRvYXN0Tm90aWZpY2F0aW9uJCgpO1xuICB9XG5cbiAgY3VzdG9tT25lKHRpdGxlOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZywgY29uZmlybUxhYmVsPzogc3RyaW5nLCBkZWNsaW5lTGFiZWw/OiBzdHJpbmcpOiBPYnNlcnZhYmxlPElUb2FzdE5vdGlmaWNhdGlvblB1YmxpY1Jlc3BvbnNlPiB7XG4gICAgY29uc3QgdG9hc3QgPSB0aGlzLiNleHRlbmRlcih0aXRsZSwgbWVzc2FnZSwgY29uZmlybUxhYmVsLCBkZWNsaW5lTGFiZWwpO1xuICAgIHRvYXN0LnNldENvbmZpZyh7XG4gICAgICBsYXlvdXRUeXBlOiBEaWFsb2dMYXlvdXREaXNwbGF5LkNVU1RPTV9PTkVcbiAgICB9KTtcbiAgICByZXR1cm4gdG9hc3Qub3BlblRvYXN0Tm90aWZpY2F0aW9uJCgpO1xuICB9XG5cbiAgY3VzdG9tVHdvKHRpdGxlOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZywgY29uZmlybUxhYmVsPzogc3RyaW5nLCBkZWNsaW5lTGFiZWw/OiBzdHJpbmcpOiBPYnNlcnZhYmxlPElUb2FzdE5vdGlmaWNhdGlvblB1YmxpY1Jlc3BvbnNlPiB7XG4gICAgY29uc3QgdG9hc3QgPSB0aGlzLiNleHRlbmRlcih0aXRsZSwgbWVzc2FnZSwgY29uZmlybUxhYmVsLCBkZWNsaW5lTGFiZWwpO1xuICAgIHRvYXN0LnNldENvbmZpZyh7XG4gICAgICBsYXlvdXRUeXBlOiBEaWFsb2dMYXlvdXREaXNwbGF5LkNVU1RPTV9UV09cbiAgICB9KTtcbiAgICByZXR1cm4gdG9hc3Qub3BlblRvYXN0Tm90aWZpY2F0aW9uJCgpO1xuICB9XG5cbiAgY3VzdG9tVGhyZWUodGl0bGU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nLCBjb25maXJtTGFiZWw/OiBzdHJpbmcsIGRlY2xpbmVMYWJlbD86IHN0cmluZyk6IE9ic2VydmFibGU8SVRvYXN0Tm90aWZpY2F0aW9uUHVibGljUmVzcG9uc2U+IHtcbiAgICBjb25zdCB0b2FzdCA9IHRoaXMuI2V4dGVuZGVyKHRpdGxlLCBtZXNzYWdlLCBjb25maXJtTGFiZWwsIGRlY2xpbmVMYWJlbCk7XG4gICAgdG9hc3Quc2V0Q29uZmlnKHtcbiAgICAgIGxheW91dFR5cGU6IERpYWxvZ0xheW91dERpc3BsYXkuQ1VTVE9NX1RIUkVFXG4gICAgfSk7XG4gICAgcmV0dXJuIHRvYXN0Lm9wZW5Ub2FzdE5vdGlmaWNhdGlvbiQoKTtcbiAgfVxuXG4gIGN1c3RvbUZvdXIodGl0bGU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nLCBjb25maXJtTGFiZWw/OiBzdHJpbmcsIGRlY2xpbmVMYWJlbD86IHN0cmluZyk6IE9ic2VydmFibGU8SVRvYXN0Tm90aWZpY2F0aW9uUHVibGljUmVzcG9uc2U+IHtcbiAgICBjb25zdCB0b2FzdCA9IHRoaXMuI2V4dGVuZGVyKHRpdGxlLCBtZXNzYWdlLCBjb25maXJtTGFiZWwsIGRlY2xpbmVMYWJlbCk7XG4gICAgdG9hc3Quc2V0Q29uZmlnKHtcbiAgICAgIGxheW91dFR5cGU6IERpYWxvZ0xheW91dERpc3BsYXkuQ1VTVE9NX0ZPVVJcbiAgICB9KTtcbiAgICByZXR1cm4gdG9hc3Qub3BlblRvYXN0Tm90aWZpY2F0aW9uJCgpO1xuICB9XG5cbiAgY3VzdG9tRml2ZSh0aXRsZTogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcsIGNvbmZpcm1MYWJlbD86IHN0cmluZywgZGVjbGluZUxhYmVsPzogc3RyaW5nKTogT2JzZXJ2YWJsZTxJVG9hc3ROb3RpZmljYXRpb25QdWJsaWNSZXNwb25zZT4ge1xuICAgIGNvbnN0IHRvYXN0ID0gdGhpcy4jZXh0ZW5kZXIodGl0bGUsIG1lc3NhZ2UsIGNvbmZpcm1MYWJlbCwgZGVjbGluZUxhYmVsKTtcbiAgICB0b2FzdC5zZXRDb25maWcoe1xuICAgICAgbGF5b3V0VHlwZTogRGlhbG9nTGF5b3V0RGlzcGxheS5DVVNUT01fRklWRVxuICAgIH0pO1xuICAgIHJldHVybiB0b2FzdC5vcGVuVG9hc3ROb3RpZmljYXRpb24kKCk7XG4gIH1cblxuICAjZXh0ZW5kZXIodGl0bGU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nLCBjb25maXJtTGFiZWw/OiBzdHJpbmcsIGRlY2xpbmVMYWJlbD86IHN0cmluZyk6IFRvYXN0Tm90aWZpY2F0aW9uSW5pdGlhbGl6ZXIge1xuICAgIGNvbnN0IHRvYXN0ID0gbmV3IFRvYXN0Tm90aWZpY2F0aW9uSW5pdGlhbGl6ZXIoKTtcbiAgICB0b2FzdC5zZXRUaXRsZSh0aXRsZSk7XG4gICAgdG9hc3Quc2V0TWVzc2FnZShtZXNzYWdlKTtcbiAgICB0b2FzdC5zZXRCdXR0b25MYWJlbHMoY29uZmlybUxhYmVsLCBkZWNsaW5lTGFiZWwpO1xuICAgIHJldHVybiB0b2FzdDtcbiAgfVxufVxuIl19