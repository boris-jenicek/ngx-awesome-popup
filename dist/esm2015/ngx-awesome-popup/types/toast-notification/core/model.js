import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { GlobalClass } from '../../../core/global';
import { ServiceLocator } from '../../../locator.service';
import { ToastNotificationService } from './toast-notification.service';
import { ToastNotificationConfigService } from './toast-notification-config.service';
export var ToastNotificationClass;
(function (ToastNotificationClass) {
    // region *** Public ***
    class ToastNotificationInitializer {
        constructor() {
            this.toastNotificationCarrier = new ToastNotificationClass.ToastNotificationCarrier();
        }
        openToastNotification$() {
            return this.toastNotificationCarrier.openToastNotification$().pipe(map(resp => {
                const basicToastNotificationResponse = new ToastNotificationResponse();
                const dataControl = new GlobalClass.DataControl();
                dataControl.copyValuesFrom(resp, basicToastNotificationResponse);
                return basicToastNotificationResponse;
            }));
        }
        setButtons(_Buttons) {
            this.toastNotificationCarrier.setButtons(_Buttons);
        }
        setConfig(_ToastNotificationConfig) {
            this.toastNotificationCarrier.setConfig(_ToastNotificationConfig);
        }
        setMessage(_Title, _Description = null) {
            this.toastNotificationCarrier.setTitle(_Title);
            this.toastNotificationCarrier.setDescription(_Description);
        }
        setTitle(_Title) {
            this.toastNotificationCarrier.setTitle(_Title);
        }
        setDescription(_Description) {
            this.toastNotificationCarrier.setDescription(_Description);
        }
        setButtonLabels(_Confirm, _Decline) {
            this.toastNotificationCarrier.setButtonLabels(_Confirm, _Decline);
        }
    }
    ToastNotificationClass.ToastNotificationInitializer = ToastNotificationInitializer;
    class ToastNotificationResponse extends GlobalClass.DataControl {
        constructor() {
            super();
            // private Response: DialogPrepareResponse            = new DialogPrepareResponse();
            this.Success = null;
            this.ClickedButtonID = null;
        }
        setSuccess(_IsSuccess) {
            this.Success = _IsSuccess;
        }
        setClickedButtonID(_ClickedButtonID) {
            this.ClickedButtonID = _ClickedButtonID;
        }
    }
    ToastNotificationClass.ToastNotificationResponse = ToastNotificationResponse;
    class ToastNotificationEventsController {
        constructor(EntityUniqueID) {
            this.EntityUniqueID = EntityUniqueID;
            this._afterClosed = new Subject();
            this.afterClosed$ = this._afterClosed.asObservable();
            this._onButtonClick = new Subject();
            this.onButtonClick$ = this._onButtonClick.asObservable();
            this._buttonList = new Subject();
            this.buttonList$ = this._buttonList.asObservable();
        }
        close(_Response) {
            const response = _Response ? _Response : this.defaultResponse;
            this._afterClosed.next(response);
        }
        onButtonClick(_Button) {
            this.defaultResponse.setClickedButtonID(_Button.ID);
            this._onButtonClick.next(_Button);
        }
        setButtonList(_ButtonList) {
            this._buttonList.next(_ButtonList);
        }
        setDefaultResponse(_Response) {
            this.defaultResponse = _Response;
        }
    }
    ToastNotificationClass.ToastNotificationEventsController = ToastNotificationEventsController;
    // endregion
    class ToastNotificationDefaultResponse extends ToastNotificationResponse {
        constructor() {
            super();
            this.toastNotificationBelonging = null;
        }
        setBelonging(_ToastNotificationBelonging) {
            this.toastNotificationBelonging = _ToastNotificationBelonging;
        }
    }
    ToastNotificationClass.ToastNotificationDefaultResponse = ToastNotificationDefaultResponse;
    class ToastNotificationCarrier {
        constructor() {
            this.toastNotificationBelonging = new ToastNotificationClass.ToastNotificationBelonging();
        }
        setButtons(_Buttons) {
            if (_Buttons.length) {
                this.toastNotificationBelonging.Buttons = _Buttons;
            }
        }
        setTitle(_Title) {
            this.toastNotificationBelonging.Message.Title = _Title;
        }
        setDescription(_Description) {
            this.toastNotificationBelonging.Message.Description = _Description;
        }
        setButtonLabels(_Confirm, _Decline) {
            this.toastNotificationBelonging.ToastCoreConfig.ConfirmLabel = _Confirm;
            this.toastNotificationBelonging.ToastCoreConfig.DeclineLabel = _Decline;
        }
        setConfig(_ToastNotificationBelonging) {
            // region *** local UserConfig (defined on place where dialog is called) ***
            const dataControl = new GlobalClass.DataControl();
            dataControl.copyValuesFrom(_ToastNotificationBelonging, this.toastNotificationBelonging.ToastCoreConfig);
            // endregion
        }
        openToastNotification$() {
            if (!this.toastNotificationBelonging.Message.Title
                && !this.toastNotificationBelonging.Message.Description) {
                throw Error('Toast message fail.');
            }
            const service = ServiceLocator.injector.get(ToastNotificationService);
            return service.openToast$(this.toastNotificationBelonging);
        }
    }
    ToastNotificationClass.ToastNotificationCarrier = ToastNotificationCarrier;
    class GlobalToastSettings {
        constructor() {
            this.AllowedMessagesAtOnce = null;
        }
    }
    ToastNotificationClass.GlobalToastSettings = GlobalToastSettings;
    class Settings {
        constructor() {
            this.Buttons = [];
            this.ToastCoreConfig = new ToastCoreConfig();
            this.Message = new GlobalClass.Message();
            this.GlobalSettings = new GlobalToastSettings();
        }
    }
    ToastNotificationClass.Settings = Settings;
    class ToastCoreConfig {
        constructor() {
            this.Width = null;
            this.Height = null;
            this.ButtonPosition = null;
            this.LayoutType = null;
            this.Message = null;
            this.ConfirmLabel = null;
            this.DeclineLabel = null;
            this.AutoCloseDelay = null;
        }
    }
    ToastNotificationClass.ToastCoreConfig = ToastCoreConfig;
    class ToastNotificationBelonging extends ToastNotificationClass.Settings {
        constructor() {
            super();
            this.EntityUniqueID = 'T' + Math.random().toString(36).substr(2, 9);
            this.EventsController = new ToastNotificationEventsController(this.EntityUniqueID);
            const toastNotificationConfigurator = ServiceLocator.injector.get(ToastNotificationConfigService);
            const baseSettings = new ToastNotificationClass.Settings();
            const dataControl = new GlobalClass.DataControl();
            dataControl.copyValuesFrom(toastNotificationConfigurator.productionConfig.ToastCoreConfig, baseSettings.ToastCoreConfig);
            this.ToastCoreConfig = baseSettings.ToastCoreConfig;
            this.Buttons = toastNotificationConfigurator.productionConfig.Buttons.slice();
        }
    }
    ToastNotificationClass.ToastNotificationBelonging = ToastNotificationBelonging;
})(ToastNotificationClass || (ToastNotificationClass = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9uZ3gtYXdlc29tZS1wb3B1cC90eXBlcy90b2FzdC1ub3RpZmljYXRpb24vY29yZS9tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWEsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuQyxPQUFPLEVBQUMsV0FBVyxFQUFrQixNQUFNLHNCQUFzQixDQUFDO0FBQ2xFLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUV4RCxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUN0RSxPQUFPLEVBQUMsOEJBQThCLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQztBQStEbkYsTUFBTSxLQUFXLHNCQUFzQixDQTJNdEM7QUEzTUQsV0FBaUIsc0JBQXNCO0lBRW5DLHdCQUF3QjtJQUN4QixNQUFhLDRCQUE0QjtRQUlyQztZQUZRLDZCQUF3QixHQUFvRCxJQUFJLHNCQUFzQixDQUFDLHdCQUF3QixFQUFFLENBQUM7UUFHMUksQ0FBQztRQUVELHNCQUFzQjtZQUNsQixPQUFPLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQzFFLE1BQU0sOEJBQThCLEdBQUcsSUFBSSx5QkFBeUIsRUFBRSxDQUFDO2dCQUN2RSxNQUFNLFdBQVcsR0FBc0IsSUFBSSxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ3JFLFdBQVcsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLDhCQUE4QixDQUFDLENBQUM7Z0JBQ2pFLE9BQU8sOEJBQThCLENBQUM7WUFDMUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNSLENBQUM7UUFFRCxVQUFVLENBQUMsUUFBbUM7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QixDQUFBO0lBRUQsTUFBYSwwQkFBMkIsU0FBUSxzQkFBc0IsQ0FBQyxRQUFRO1FBSzNFO1lBQ0ksS0FBSyxFQUFFLENBQUM7WUFKWixtQkFBYyxHQUFXLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFLbkUsSUFBSSxDQUFDLGdCQUFnQixHQUFpRCxJQUFJLGlDQUFpQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUNqSSxNQUFNLDZCQUE2QixHQUFtQyxjQUFjLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1lBQ2xJLE1BQU0sWUFBWSxHQUFvRCxJQUFJLHNCQUFzQixDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQzVHLE1BQU0sV0FBVyxHQUFxRCxJQUFJLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNwRyxXQUFXLENBQUMsY0FBYyxDQUFDLDZCQUE2QixDQUFDLGdCQUFnQixDQUFDLGVBQWUsRUFBRSxZQUFZLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDekgsSUFBSSxDQUFDLGVBQWUsR0FBRyxZQUFZLENBQUMsZUFBZSxDQUFDO1lBQ3BELElBQUksQ0FBQyxPQUFPLEdBQW1CLDZCQUE2QixDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNsRyxDQUFDO0tBRUo7SUFoQlksaURBQTBCLDZCQWdCdEMsQ0FBQTtBQUdMLENBQUMsRUEzTWdCLHNCQUFzQixLQUF0QixzQkFBc0IsUUEyTXRDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtPYnNlcnZhYmxlLCBTdWJqZWN0fSBmcm9tICdyeGpzJztcbmltcG9ydCB7bWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge0dsb2JhbENsYXNzLCBHbG9iYWxJbnRlcmZhY2V9IGZyb20gJy4uLy4uLy4uL2NvcmUvZ2xvYmFsJztcbmltcG9ydCB7U2VydmljZUxvY2F0b3J9IGZyb20gJy4uLy4uLy4uL2xvY2F0b3Iuc2VydmljZSc7XG5pbXBvcnQge0RpYWxvZ0xheW91dERpc3BsYXksIFZlcnRpY2FsUG9zaXRpb259IGZyb20gJy4uLy4uLy4uL2NvcmUvZW51bXMnO1xuaW1wb3J0IHtUb2FzdE5vdGlmaWNhdGlvblNlcnZpY2V9IGZyb20gJy4vdG9hc3Qtbm90aWZpY2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHtUb2FzdE5vdGlmaWNhdGlvbkNvbmZpZ1NlcnZpY2V9IGZyb20gJy4vdG9hc3Qtbm90aWZpY2F0aW9uLWNvbmZpZy5zZXJ2aWNlJztcblxuXG5leHBvcnQgbmFtZXNwYWNlIFRvYXN0Tm90aWZpY2F0aW9uSW50ZXJmYWNlIHtcbiAgICBcbiAgICBleHBvcnQgaW50ZXJmYWNlIElUb2FzdE5vdGlmaWNhdGlvblVzZXJDb25maWcge1xuICAgICAgICBCdXR0b25zPzogR2xvYmFsSW50ZXJmYWNlLklCdXR0b25bXTtcbiAgICAgICAgVG9hc3RDb3JlQ29uZmlnPzogVG9hc3ROb3RpZmljYXRpb25JbnRlcmZhY2UuSVRvYXN0Q29yZUNvbmZpZztcbiAgICAgICAgTWVzc2FnZT86IEdsb2JhbEludGVyZmFjZS5JTWVzc2FnZTtcbiAgICAgICAgR2xvYmFsU2V0dGluZ3M/OiBUb2FzdE5vdGlmaWNhdGlvbkludGVyZmFjZS5JR2xvYmFsVG9hc3RTZXR0aW5ncztcbiAgICB9XG4gICAgXG4gICAgZXhwb3J0IGludGVyZmFjZSBJR2xvYmFsVG9hc3RTZXR0aW5ncyB7XG4gICAgICAgIC8qKiBOdW1iZXIgb2YgcG9wdXBzIGFsbG93ZWQgb24gc2NyZWVuLCByZWNvbW1lbmQgMy01ICovXG4gICAgICAgIEFsbG93ZWRNZXNzYWdlc0F0T25jZTogbnVtYmVyO1xuICAgIH1cbiAgICBcbiAgICBleHBvcnQgaW50ZXJmYWNlIElUb2FzdENvcmVDb25maWcge1xuICAgICAgICAvKiogRml4ZWQgcG9wdXAgd2lkdGggKi9cbiAgICAgICAgV2lkdGg/OiBzdHJpbmc7XG4gICAgICAgIC8qKiBGaXhlZCBwb3B1cCBoZWlnaHQgKi9cbiAgICAgICAgSGVpZ2h0Pzogc3RyaW5nO1xuICAgICAgICBCdXR0b25Qb3NpdGlvbj86IFZlcnRpY2FsUG9zaXRpb247XG4gICAgICAgIExheW91dFR5cGU/OiBEaWFsb2dMYXlvdXREaXNwbGF5O1xuICAgICAgICBNZXNzYWdlPzogR2xvYmFsSW50ZXJmYWNlLklNZXNzYWdlO1xuICAgICAgICAvKiogRGVmYXVsdCBjb25maXJtIGJ1dHRvbiBMYWJlbCAqL1xuICAgICAgICBDb25maXJtTGFiZWw/OiBzdHJpbmc7XG4gICAgICAgIC8qKiBEZWZhdWx0IGRlY2xpbmUgYnV0dG9uIExhYmVsICovXG4gICAgICAgIERlY2xpbmVMYWJlbD86IHN0cmluZztcbiAgICAgICAgLyoqIEV4cHJlc3NlZCBpbiBtaWxsaXNlY29uZHMgKi9cbiAgICAgICAgQXV0b0Nsb3NlRGVsYXk/OiBudW1iZXI7XG4gICAgfVxuICAgIFxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSVRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nIHtcbiAgICAgICAgQnV0dG9uczogR2xvYmFsSW50ZXJmYWNlLklCdXR0b25bXTtcbiAgICAgICAgVG9hc3RDb3JlQ29uZmlnOiBUb2FzdE5vdGlmaWNhdGlvbkludGVyZmFjZS5JVG9hc3RDb3JlQ29uZmlnO1xuICAgICAgICBFbnRpdHlVbmlxdWVJRDogc3RyaW5nO1xuICAgICAgICBFdmVudHNDb250cm9sbGVyOiBUb2FzdE5vdGlmaWNhdGlvbkNsYXNzLlRvYXN0Tm90aWZpY2F0aW9uRXZlbnRzQ29udHJvbGxlcjtcbiAgICB9XG4gICAgXG4gICAgZXhwb3J0IGludGVyZmFjZSBJVG9hc3ROb3RpZmljYXRpb25SZXNwb25zZSB7XG4gICAgICAgIHNldFN1Y2Nlc3MoX0lzU3VjY2VzczogYm9vbGVhbik6IHZvaWQ7XG4gICAgICAgIHNldENsaWNrZWRCdXR0b25JRChfQ2xpY2tlZEJ1dHRvbklEKTogdm9pZDtcbiAgICAgICAgXG4gICAgfVxuICAgIFxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSVRvYXN0Tm90aWZpY2F0aW9uUHVibGljUmVzcG9uc2Uge1xuICAgICAgICBTdWNjZXNzOiBib29sZWFuO1xuICAgICAgICBDbGlja2VkQnV0dG9uSUQ6IHN0cmluZ1xuICAgIH1cbiAgICBcbiAgICBleHBvcnQgaW50ZXJmYWNlIElQcml2YXRlUmVzcG9uc2VNZXJnZWQgZXh0ZW5kcyBJVG9hc3ROb3RpZmljYXRpb25SZXNwb25zZSwgR2xvYmFsSW50ZXJmYWNlLklQcml2YXRlUmVzcG9uc2Uge1xuICAgICAgICBcbiAgICAgICAgdG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmc6IFRvYXN0Tm90aWZpY2F0aW9uSW50ZXJmYWNlLklUb2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZztcbiAgICB9XG4gICAgXG4gICAgZXhwb3J0IGludGVyZmFjZSBJVG9hc3ROb3RpZmljYXRpb25SYXdTdGF0ZSB7XG4gICAgICAgIFdlYWtNYXA6IFdlYWtNYXA8YW55LCBUb2FzdE5vdGlmaWNhdGlvbkNsYXNzLlRvYXN0Tm90aWZpY2F0aW9uRXZlbnRzQ29udHJvbGxlcj47XG4gICAgICAgIFRvYXN0QmVsb25naW5nOiBUb2FzdE5vdGlmaWNhdGlvbkNsYXNzLlRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nO1xuICAgIH1cbiAgICBcbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBUb2FzdE5vdGlmaWNhdGlvbkNsYXNzIHtcbiAgICBcbiAgICAvLyByZWdpb24gKioqIFB1YmxpYyAqKipcbiAgICBleHBvcnQgY2xhc3MgVG9hc3ROb3RpZmljYXRpb25Jbml0aWFsaXplciB7XG4gICAgICAgIFxuICAgICAgICBwcml2YXRlIHRvYXN0Tm90aWZpY2F0aW9uQ2FycmllcjogVG9hc3ROb3RpZmljYXRpb25DbGFzcy5Ub2FzdE5vdGlmaWNhdGlvbkNhcnJpZXIgPSBuZXcgVG9hc3ROb3RpZmljYXRpb25DbGFzcy5Ub2FzdE5vdGlmaWNhdGlvbkNhcnJpZXIoKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBvcGVuVG9hc3ROb3RpZmljYXRpb24kKCk6IE9ic2VydmFibGU8VG9hc3ROb3RpZmljYXRpb25JbnRlcmZhY2UuSVRvYXN0Tm90aWZpY2F0aW9uUHVibGljUmVzcG9uc2U+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQ2Fycmllci5vcGVuVG9hc3ROb3RpZmljYXRpb24kKCkucGlwZShtYXAocmVzcCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgYmFzaWNUb2FzdE5vdGlmaWNhdGlvblJlc3BvbnNlID0gbmV3IFRvYXN0Tm90aWZpY2F0aW9uUmVzcG9uc2UoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhQ29udHJvbCAgICAgICAgICAgICAgICAgICAgPSBuZXcgR2xvYmFsQ2xhc3MuRGF0YUNvbnRyb2woKTtcbiAgICAgICAgICAgICAgICBkYXRhQ29udHJvbC5jb3B5VmFsdWVzRnJvbShyZXNwLCBiYXNpY1RvYXN0Tm90aWZpY2F0aW9uUmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIHJldHVybiBiYXNpY1RvYXN0Tm90aWZpY2F0aW9uUmVzcG9uc2U7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHNldEJ1dHRvbnMoX0J1dHRvbnM6IEdsb2JhbEludGVyZmFjZS5JQnV0dG9uW10pOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMudG9hc3ROb3RpZmljYXRpb25DYXJyaWVyLnNldEJ1dHRvbnMoX0J1dHRvbnMpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBzZXRDb25maWcoX1RvYXN0Tm90aWZpY2F0aW9uQ29uZmlnOiBUb2FzdE5vdGlmaWNhdGlvbkludGVyZmFjZS5JVG9hc3RDb3JlQ29uZmlnKSB7XG4gICAgICAgICAgICB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQ2Fycmllci5zZXRDb25maWcoX1RvYXN0Tm90aWZpY2F0aW9uQ29uZmlnKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgc2V0TWVzc2FnZShfVGl0bGU6IHN0cmluZywgX0Rlc2NyaXB0aW9uOiBzdHJpbmcgPSBudWxsKTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQ2Fycmllci5zZXRUaXRsZShfVGl0bGUpO1xuICAgICAgICAgICAgdGhpcy50b2FzdE5vdGlmaWNhdGlvbkNhcnJpZXIuc2V0RGVzY3JpcHRpb24oX0Rlc2NyaXB0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgc2V0VGl0bGUoX1RpdGxlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMudG9hc3ROb3RpZmljYXRpb25DYXJyaWVyLnNldFRpdGxlKF9UaXRsZSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHNldERlc2NyaXB0aW9uKF9EZXNjcmlwdGlvbjogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQ2Fycmllci5zZXREZXNjcmlwdGlvbihfRGVzY3JpcHRpb24pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBzZXRCdXR0b25MYWJlbHMoX0NvbmZpcm06IHN0cmluZywgX0RlY2xpbmU/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMudG9hc3ROb3RpZmljYXRpb25DYXJyaWVyLnNldEJ1dHRvbkxhYmVscyhfQ29uZmlybSwgX0RlY2xpbmUpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cbiAgICBcbiAgICBleHBvcnQgY2xhc3MgVG9hc3ROb3RpZmljYXRpb25SZXNwb25zZSBleHRlbmRzIEdsb2JhbENsYXNzLkRhdGFDb250cm9sIGltcGxlbWVudHMgVG9hc3ROb3RpZmljYXRpb25JbnRlcmZhY2UuSVRvYXN0Tm90aWZpY2F0aW9uUmVzcG9uc2UsIFRvYXN0Tm90aWZpY2F0aW9uSW50ZXJmYWNlLklUb2FzdE5vdGlmaWNhdGlvblB1YmxpY1Jlc3BvbnNlIHtcbiAgICAgICAgLy8gcHJpdmF0ZSBSZXNwb25zZTogRGlhbG9nUHJlcGFyZVJlc3BvbnNlICAgICAgICAgICAgPSBuZXcgRGlhbG9nUHJlcGFyZVJlc3BvbnNlKCk7XG4gICAgICAgIFxuICAgICAgICBTdWNjZXNzOiBib29sZWFuICAgICAgICA9IG51bGw7XG4gICAgICAgIENsaWNrZWRCdXR0b25JRDogc3RyaW5nID0gbnVsbDtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgc2V0U3VjY2VzcyhfSXNTdWNjZXNzOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLlN1Y2Nlc3MgPSBfSXNTdWNjZXNzO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBzZXRDbGlja2VkQnV0dG9uSUQoX0NsaWNrZWRCdXR0b25JRCk6IHZvaWQge1xuICAgICAgICAgICAgdGhpcy5DbGlja2VkQnV0dG9uSUQgPSBfQ2xpY2tlZEJ1dHRvbklEO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBcbiAgICB9XG4gICAgXG4gICAgZXhwb3J0IGNsYXNzIFRvYXN0Tm90aWZpY2F0aW9uRXZlbnRzQ29udHJvbGxlciB7XG4gICAgICAgIFxuICAgICAgICBkZWZhdWx0UmVzcG9uc2U6IFRvYXN0Tm90aWZpY2F0aW9uSW50ZXJmYWNlLklQcml2YXRlUmVzcG9uc2VNZXJnZWQ7XG4gICAgICAgIFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9hZnRlckNsb3NlZDogU3ViamVjdDxUb2FzdE5vdGlmaWNhdGlvbkludGVyZmFjZS5JUHJpdmF0ZVJlc3BvbnNlTWVyZ2VkPiA9IG5ldyBTdWJqZWN0PFRvYXN0Tm90aWZpY2F0aW9uSW50ZXJmYWNlLklQcml2YXRlUmVzcG9uc2VNZXJnZWQ+KCk7XG4gICAgICAgIGFmdGVyQ2xvc2VkJDogT2JzZXJ2YWJsZTxUb2FzdE5vdGlmaWNhdGlvbkludGVyZmFjZS5JUHJpdmF0ZVJlc3BvbnNlTWVyZ2VkPiAgICAgICAgICAgICAgID0gdGhpcy5fYWZ0ZXJDbG9zZWQuYXNPYnNlcnZhYmxlKCk7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX29uQnV0dG9uQ2xpY2s6IFN1YmplY3Q8R2xvYmFsSW50ZXJmYWNlLklCdXR0b24+ICAgICAgICAgICAgICAgICAgICAgICAgID0gbmV3IFN1YmplY3Q8R2xvYmFsSW50ZXJmYWNlLklCdXR0b24+KCk7XG4gICAgICAgIG9uQnV0dG9uQ2xpY2skOiBPYnNlcnZhYmxlPEdsb2JhbEludGVyZmFjZS5JQnV0dG9uPiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gdGhpcy5fb25CdXR0b25DbGljay5hc09ic2VydmFibGUoKTtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfYnV0dG9uTGlzdDogU3ViamVjdDxHbG9iYWxJbnRlcmZhY2UuSUJ1dHRvbltdPiAgICAgICAgICAgICAgICAgICAgICAgICAgPSBuZXcgU3ViamVjdDxHbG9iYWxJbnRlcmZhY2UuSUJ1dHRvbltdPigpO1xuICAgICAgICBidXR0b25MaXN0JDogT2JzZXJ2YWJsZTxHbG9iYWxJbnRlcmZhY2UuSUJ1dHRvbltdPiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IHRoaXMuX2J1dHRvbkxpc3QuYXNPYnNlcnZhYmxlKCk7XG4gICAgICAgIFxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIEVudGl0eVVuaXF1ZUlEOiBzdHJpbmcpIHtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIGNsb3NlKF9SZXNwb25zZT86IFRvYXN0Tm90aWZpY2F0aW9uSW50ZXJmYWNlLklQcml2YXRlUmVzcG9uc2VNZXJnZWQpOiB2b2lkIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gX1Jlc3BvbnNlID8gX1Jlc3BvbnNlIDogdGhpcy5kZWZhdWx0UmVzcG9uc2U7XG4gICAgICAgICAgICB0aGlzLl9hZnRlckNsb3NlZC5uZXh0KHJlc3BvbnNlKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgb25CdXR0b25DbGljayhfQnV0dG9uOiBHbG9iYWxJbnRlcmZhY2UuSUJ1dHRvbik6IHZvaWQge1xuICAgICAgICAgICAgdGhpcy5kZWZhdWx0UmVzcG9uc2Uuc2V0Q2xpY2tlZEJ1dHRvbklEKF9CdXR0b24uSUQpO1xuICAgICAgICAgICAgdGhpcy5fb25CdXR0b25DbGljay5uZXh0KF9CdXR0b24pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBzZXRCdXR0b25MaXN0KF9CdXR0b25MaXN0OiBHbG9iYWxJbnRlcmZhY2UuSUJ1dHRvbltdKTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLl9idXR0b25MaXN0Lm5leHQoX0J1dHRvbkxpc3QpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBzZXREZWZhdWx0UmVzcG9uc2UoX1Jlc3BvbnNlOiBUb2FzdE5vdGlmaWNhdGlvbkludGVyZmFjZS5JUHJpdmF0ZVJlc3BvbnNlTWVyZ2VkKTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLmRlZmF1bHRSZXNwb25zZSA9IF9SZXNwb25zZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAvLyBlbmRyZWdpb25cbiAgICBcbiAgICBleHBvcnQgY2xhc3MgVG9hc3ROb3RpZmljYXRpb25EZWZhdWx0UmVzcG9uc2UgZXh0ZW5kcyBUb2FzdE5vdGlmaWNhdGlvblJlc3BvbnNlIGltcGxlbWVudHMgVG9hc3ROb3RpZmljYXRpb25JbnRlcmZhY2UuSVByaXZhdGVSZXNwb25zZU1lcmdlZCB7XG4gICAgICAgIHRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nOiBUb2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZyA9IG51bGw7XG4gICAgICAgIFxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHNldEJlbG9uZ2luZyhfVG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcgPSBfVG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmc7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuICAgIFxuICAgIGV4cG9ydCBjbGFzcyBUb2FzdE5vdGlmaWNhdGlvbkNhcnJpZXIge1xuICAgICAgICBcbiAgICAgICAgdG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmc6IFRvYXN0Tm90aWZpY2F0aW9uQ2xhc3MuVG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcgPSBuZXcgVG9hc3ROb3RpZmljYXRpb25DbGFzcy5Ub2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZygpO1xuICAgICAgICBcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHNldEJ1dHRvbnMoX0J1dHRvbnM6IEdsb2JhbEludGVyZmFjZS5JQnV0dG9uW10pIHtcbiAgICAgICAgICAgIGlmIChfQnV0dG9ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLkJ1dHRvbnMgPSBfQnV0dG9ucztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgc2V0VGl0bGUoX1RpdGxlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuTWVzc2FnZS5UaXRsZSA9IF9UaXRsZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgc2V0RGVzY3JpcHRpb24oX0Rlc2NyaXB0aW9uOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuTWVzc2FnZS5EZXNjcmlwdGlvbiA9IF9EZXNjcmlwdGlvbjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgc2V0QnV0dG9uTGFiZWxzKF9Db25maXJtOiBzdHJpbmcsIF9EZWNsaW5lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuVG9hc3RDb3JlQ29uZmlnLkNvbmZpcm1MYWJlbCA9IF9Db25maXJtO1xuICAgICAgICAgICAgdGhpcy50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5Ub2FzdENvcmVDb25maWcuRGVjbGluZUxhYmVsID0gX0RlY2xpbmU7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHNldENvbmZpZyhfVG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmc6IFRvYXN0Tm90aWZpY2F0aW9uSW50ZXJmYWNlLklUb2FzdENvcmVDb25maWcpIHtcbiAgICAgICAgICAgIC8vIHJlZ2lvbiAqKiogbG9jYWwgVXNlckNvbmZpZyAoZGVmaW5lZCBvbiBwbGFjZSB3aGVyZSBkaWFsb2cgaXMgY2FsbGVkKSAqKipcbiAgICAgICAgICAgIGNvbnN0IGRhdGFDb250cm9sID0gbmV3IEdsb2JhbENsYXNzLkRhdGFDb250cm9sKCk7XG4gICAgICAgICAgICBkYXRhQ29udHJvbC5jb3B5VmFsdWVzRnJvbShfVG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcsIHRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuVG9hc3RDb3JlQ29uZmlnKTtcbiAgICAgICAgICAgIC8vIGVuZHJlZ2lvblxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBvcGVuVG9hc3ROb3RpZmljYXRpb24kKCk6IE9ic2VydmFibGU8VG9hc3ROb3RpZmljYXRpb25JbnRlcmZhY2UuSVByaXZhdGVSZXNwb25zZU1lcmdlZD4ge1xuICAgICAgICAgICAgaWYoIXRoaXMudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuTWVzc2FnZS5UaXRsZVxuICAgICAgICAgICAgICAgICYmICF0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLk1lc3NhZ2UuRGVzY3JpcHRpb24pe1xuICAgICAgICAgICAgICAgIHRocm93IEVycm9yKCdUb2FzdCBtZXNzYWdlIGZhaWwuJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHNlcnZpY2U6IFRvYXN0Tm90aWZpY2F0aW9uU2VydmljZSA9IFNlcnZpY2VMb2NhdG9yLmluamVjdG9yLmdldChUb2FzdE5vdGlmaWNhdGlvblNlcnZpY2UpO1xuICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2Uub3BlblRvYXN0JCh0aGlzLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cbiAgICBcbiAgICBleHBvcnQgY2xhc3MgR2xvYmFsVG9hc3RTZXR0aW5ncyBpbXBsZW1lbnRzIFRvYXN0Tm90aWZpY2F0aW9uSW50ZXJmYWNlLklHbG9iYWxUb2FzdFNldHRpbmdze1xuICAgICAgICBBbGxvd2VkTWVzc2FnZXNBdE9uY2U6IG51bWJlciA9IG51bGw7XG4gICAgfVxuICAgIFxuICAgIGV4cG9ydCBjbGFzcyBTZXR0aW5ncyB7XG4gICAgICAgIEJ1dHRvbnM6IEdsb2JhbEludGVyZmFjZS5JQnV0dG9uW10gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPSBbXTtcbiAgICAgICAgVG9hc3RDb3JlQ29uZmlnOiBUb2FzdE5vdGlmaWNhdGlvbkludGVyZmFjZS5JVG9hc3RDb3JlQ29uZmlnID0gbmV3IFRvYXN0Q29yZUNvbmZpZygpO1xuICAgICAgICBNZXNzYWdlOiBHbG9iYWxJbnRlcmZhY2UuSU1lc3NhZ2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gbmV3IEdsb2JhbENsYXNzLk1lc3NhZ2UoKTtcbiAgICAgICAgR2xvYmFsU2V0dGluZ3M6IEdsb2JhbFRvYXN0U2V0dGluZ3MgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IG5ldyBHbG9iYWxUb2FzdFNldHRpbmdzKCk7XG4gICAgICAgIFxuICAgIH1cbiAgICBcbiAgICBleHBvcnQgY2xhc3MgVG9hc3RDb3JlQ29uZmlnIGltcGxlbWVudHMgVG9hc3ROb3RpZmljYXRpb25JbnRlcmZhY2UuSVRvYXN0Q29yZUNvbmZpZyB7XG4gICAgICAgIFdpZHRoOiBzdHJpbmcgICAgICAgICAgICAgICAgICAgICA9IG51bGw7XG4gICAgICAgIEhlaWdodDogc3RyaW5nICAgICAgICAgICAgICAgICAgICA9IG51bGw7XG4gICAgICAgIEJ1dHRvblBvc2l0aW9uOiBWZXJ0aWNhbFBvc2l0aW9uICA9IG51bGw7XG4gICAgICAgIExheW91dFR5cGU6IERpYWxvZ0xheW91dERpc3BsYXkgICA9IG51bGw7XG4gICAgICAgIE1lc3NhZ2U6IEdsb2JhbEludGVyZmFjZS5JTWVzc2FnZSA9IG51bGw7XG4gICAgICAgIENvbmZpcm1MYWJlbDogc3RyaW5nICAgICAgICAgICAgICA9IG51bGw7XG4gICAgICAgIERlY2xpbmVMYWJlbDogc3RyaW5nICAgICAgICAgICAgICA9IG51bGw7XG4gICAgICAgIEF1dG9DbG9zZURlbGF5PzogbnVtYmVyICAgICAgICAgICA9IG51bGw7XG4gICAgfVxuICAgIFxuICAgIGV4cG9ydCBjbGFzcyBUb2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZyBleHRlbmRzIFRvYXN0Tm90aWZpY2F0aW9uQ2xhc3MuU2V0dGluZ3MgaW1wbGVtZW50cyBUb2FzdE5vdGlmaWNhdGlvbkludGVyZmFjZS5JVG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcge1xuICAgICAgICBcbiAgICAgICAgRW50aXR5VW5pcXVlSUQ6IHN0cmluZyA9ICdUJyArIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyLCA5KTtcbiAgICAgICAgRXZlbnRzQ29udHJvbGxlcjogVG9hc3ROb3RpZmljYXRpb25FdmVudHNDb250cm9sbGVyO1xuICAgICAgICBcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICAgICAgdGhpcy5FdmVudHNDb250cm9sbGVyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IG5ldyBUb2FzdE5vdGlmaWNhdGlvbkV2ZW50c0NvbnRyb2xsZXIodGhpcy5FbnRpdHlVbmlxdWVJRCk7XG4gICAgICAgICAgICBjb25zdCB0b2FzdE5vdGlmaWNhdGlvbkNvbmZpZ3VyYXRvcjogVG9hc3ROb3RpZmljYXRpb25Db25maWdTZXJ2aWNlID0gU2VydmljZUxvY2F0b3IuaW5qZWN0b3IuZ2V0KFRvYXN0Tm90aWZpY2F0aW9uQ29uZmlnU2VydmljZSk7XG4gICAgICAgICAgICBjb25zdCBiYXNlU2V0dGluZ3MgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gbmV3IFRvYXN0Tm90aWZpY2F0aW9uQ2xhc3MuU2V0dGluZ3MoKTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGFDb250cm9sICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPSBuZXcgR2xvYmFsQ2xhc3MuRGF0YUNvbnRyb2woKTtcbiAgICAgICAgICAgIGRhdGFDb250cm9sLmNvcHlWYWx1ZXNGcm9tKHRvYXN0Tm90aWZpY2F0aW9uQ29uZmlndXJhdG9yLnByb2R1Y3Rpb25Db25maWcuVG9hc3RDb3JlQ29uZmlnLCBiYXNlU2V0dGluZ3MuVG9hc3RDb3JlQ29uZmlnKTtcbiAgICAgICAgICAgIHRoaXMuVG9hc3RDb3JlQ29uZmlnID0gYmFzZVNldHRpbmdzLlRvYXN0Q29yZUNvbmZpZztcbiAgICAgICAgICAgIHRoaXMuQnV0dG9ucyAgICAgICAgICAgICAgICAgPSB0b2FzdE5vdGlmaWNhdGlvbkNvbmZpZ3VyYXRvci5wcm9kdWN0aW9uQ29uZmlnLkJ1dHRvbnMuc2xpY2UoKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG4gICAgXG4gICAgXG59XG4iXX0=