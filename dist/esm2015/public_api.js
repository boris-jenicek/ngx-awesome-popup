import { GlobalClass } from "./ngx-awesome-popup/core/global";
import { ConfirmBoxClass, } from "./ngx-awesome-popup/types/confirm-box/core/model";
import { DialogClass, } from "./ngx-awesome-popup/types/dialog/core/model";
import { ToastNotificationClass, } from "./ngx-awesome-popup/types/toast-notification/core/model";
var ConfirmBoxInitializer = ConfirmBoxClass.ConfirmBoxInitializer;
var DialogBelonging = DialogClass.DialogBelonging;
var DialogInitializer = DialogClass.DialogInitializer;
var ButtonMaker = GlobalClass.ButtonMaker;
var ResetGlobalConfig = GlobalClass.ResetGlobalConfig;
var ResetToastGlobalSettings = ToastNotificationClass.ResetToastGlobalSettings;
var ToastNotificationInitializer = ToastNotificationClass.ToastNotificationInitializer;
// endregion
export { ButtonLayoutDisplay } from "./ngx-awesome-popup/core/enums";
export { DialogLayoutDisplay } from "./ngx-awesome-popup/core/enums";
export { ToastPositionEnum } from "./ngx-awesome-popup/types/toast-notification/core/model";
export { ToastProgressBarEnum } from "./ngx-awesome-popup/types/toast-notification/core/model";
export { ToastUserViewTypeEnum } from "./ngx-awesome-popup/types/toast-notification/core/model";
/**
 * @returns It will return custom button object ready to be used in child component layout.
 */
export { ButtonMaker };
/**
 *```typescript
 * // Instantiate config object as example below to change global settings on-fly it takes IGlobalUserConfig
 * as the argument.
 * new ResetGlobalConfig({
 *     ColorList: {
 *            Primary  : '#ff9e00', // optional
 *            Secondary: '#989ea5', // optional
 *            Info     : '#2f8ee5', // optional
 *            Success  : '#3caea3', // optional
 *            Warning  : '#ffc107', // optional
 *            Danger   : '#e46464', // optional
 *            Light    : '#fbfbfb', // optional
 *            Dark     : '#343a40'  // optional
 *           }
 * })
 * ```
 */
export { ResetGlobalConfig };
/**
 *```typescript
 * // Instantiate toast global config object as example below to change global settings on-fly it takes IGlobalToastSettings
 * as the argument.
 * new ResetToastGlobalSettings({
 *     AllowedNotificationsAtOnce: 2
 * })
 * ```
 */
export { ResetToastGlobalSettings };
/**
 * This is the class that needs to be added as DI in the constructor of a child component that will be
 * opened dynamically with {@link DialogInitializer}. It contains various information or
 * event controllers, and listeners that can be used in a child component. Also, there is custom data
 * that is sent from component where the {@link DialogInitializer} is. User can set specific type of
 * custom data that child component will receive by including it as generic type.
 *
 *
 * Example:
 * ```typescript
 *import {DialogBelonging} from 'ngx-awesome-popup';
 *@Component({
 *    selector   : 'app-cup',
 *    templateUrl: './cup.component.html',
 *    styleUrls  : ['./cup.component.scss']
 *})
 * export class CupComponent implements OnInit, OnDestroy {
 *
 *    subscriptions: Subscription[] = [];
 *
 *    constructor(private dialogBelonging: DialogBelonging) {
 *    }
 *
 *    ngOnInit(): void {
 *    console.log(this.dialogBelonging);
 *
 *        this.subscriptions.push(
 *            this.dialogBelonging.EventsController.onButtonClick$.subscribe((_Button) => {
 *            if (_Button.ID === 'ok') {
 *                // Do some logic and close popup.
 *                this.dialogBelonging.EventsController.close();
 *            } else if (_Button.ID === 'cancel') {
 *                // Do some logic and close popup.
 *                this.dialogBelonging.EventsController.close();
 *            }
 *        })
 *        );
 *
 *        setTimeout(() => {
 *            // Close loader after async data is ready.
 *            this.dialogBelonging.EventsController.closeLoader();
 *        }, 1000);
 *    }
 *}

 ngOnDestroy(): void {
        // Close all subscriptions.
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
 * ```
 * @category child dynamic component data & event controller
 */
export { DialogBelonging };
// endregion
// region *** Popup open  ***
/**
 * This is the class that needs to be instantiated to set up and ignite a ToastNotification,
 * its purpose is to show short notification to end-user, or even interact with user.
 * It can be evoked from any angular typescript file.
 *
 * Below is the example with (some optional) user configuration,
 * it will override default configuration from app.module.
 *
 *
 * Example:
 * ```typescript
 * // Create the initializer.
 *const newToastNotification = new ToastNotificationInitializer();
 *
 * // Set desired Title.
 *newToastNotification.setTitle('Warning!');
 *
 * // Set desired Message.
 *newToastNotification.setMessage('Form is not valid!');
 *
 * // Set desired configuration.
 *newToastNotification.setConfig({
 *      LayoutType: DialogLayoutDisplay.WARNING
 *   });

 * // Open a ToastNotification.
 * newConfirmBox.openConfirmBox$().subscribe(resp => {
 *   console.log('confirmBox response: ', resp);
 *  });
 * ```
 * * IToastCoreConfig: {@link IToastCoreConfig}
 * * LayoutType: {@link DialogLayoutDisplay}
 * * IToastNotificationPublicResponse: {@link IToastNotificationPublicResponse}
 * @category Popup open
 */
export { ToastNotificationInitializer };
/**
 * This is the class that needs to be instantiated to set up and ignite a ConfirmBox and create content.
 * Its purpose is to get confirmation response from end-user. It can be called from any angular
 * typescript file.
 *
 * Below is example with (some optional) user configuration,
 * it will override default configuration from app.module.
 *
 *
 * Example:
 * ```typescript
 * // Create the initializer.
 *const newConfirmBox = new ConfirmBoxInitializer();
 *
 * // Set desired dispatch: _Title: string, _Message: string.
 *newConfirmBox.setDispatch('Are you sure?', 'That action will delete user!');
 *
 * // Set desired configuration.
 *newConfirmBox.setConfig({
 *      LayoutType: DialogLayoutDisplay.DANGER
 *   });
 *
 * // Set button labels.
 * newConfirmBox.setButtonLabels('YES', 'NO');
 *
 * // Open a ConfirmBox, and get clicked button-id in response.
 * newConfirmBox.openConfirmBox$().subscribe(resp => {
 *   // IConfirmBoxPublicResponse
 *   console.log('confirmBox response: ', resp);
 *  });
 * ```
 * * IConfirmBoxCoreConfig: {@link IConfirmBoxCoreConfig}
 * * LayoutType: {@link DialogLayoutDisplay}
 * * IConfirmBoxPublicResponse: {@link IConfirmBoxPublicResponse}
 * @category Popup open
 */
export { ConfirmBoxInitializer };
/**
 * This is the class that needs to be instantiated to set up and ignite a Dialog and create dynamic component,
 * its purpose is to render any angular component view with specific configuration from any angular typescript file.
 * Dynamic component means that user can evoke the popup from typescript and component view
 * is dynamically created with the Awesome Popup engine. There is no need to call any selector in HTML to create component view.
 *
 * DialogInitializer can send data to child component (dynamic component) where data will be accessible with {@link DialogBelonging}.
 *
 * Below is the example with (some optional) user configuration,
 * it will override default configuration from app.module.
 *
 *
 * Example:
 * ```typescript
 *  import {DialogInitializer, DialogLayoutDisplay, ButtonMaker, ButtonLayoutDisplay} from 'ngx-awesome-popup';<
 *  import {CupComponent} from './cup/cup.component';
 *
 *  const newDialogPopup = new DialogInitializer(CupComponent); // Any Angular component.
 *
 *  // Custom data will be sent to dynamic component available in dialogBelonging object.
 *  newDialogPopup.setCustomData({name: 'John', surname: 'Doe', id: 1});
 *
 *  // Local config settings IDialogCoreConfig.
 *  newDialogPopup.setConfig({
 *      Height: '500px',
 *      LayoutType: DialogLayoutDisplay.INFO,
 *      LoaderComponent: Any Angular component name
 *       });
 *
 *  // Custom buttons, listener is available in child component in dialogBelonging object.
 *  newDialogPopup.setButtons([
 *      new ButtonMaker('Ok', 'ok', ButtonLayoutDisplay.PRIMARY),
 *      new ButtonMaker('Cancel', 'cancel', ButtonLayoutDisplay.SECONDARY)
 *  ]);
 *
 *  // Command to open dialog, it returns observable.
 *  newDialogPopup.openDialog$<any>().subscribe(resp => {
 *           console.log('response: ', resp.Payload);
 *       });
 * ```
 * * IDialogCoreConfig: {@link IDialogCoreConfig}
 * * LayoutType: {@link DialogLayoutDisplay}
 * * ButtonLayoutDisplay: {@link ButtonLayoutDisplay}
 * * ButtonMaker: {@link ButtonMaker}
 * * IDialogPublicResponse: {@link IDialogPublicResponse}
 * @category Popup open
 */
export { DialogInitializer };
// endregion
// region *** Imports for angular app.module ***
/**
 * This is the main module of the library, it is crucial to be added within angular.app
 * imports as an example with optional argument, look: {@link IGlobalUserConfig}
 *
 * ```typescript
 * // app.module imports:
 * NgxAwesomePopupModule.forRoot({
 *     ColorList: {
 *            Primary  : '#ff9e00', // optional
 *            Secondary: '#989ea5', // optional
 *            Info     : '#2f8ee5', // optional
 *            Success  : '#3caea3', // optional
 *            Warning  : '#ffc107', // optional
 *            Danger   : '#e46464', // optional
 *            Light    : '#fbfbfb', // optional
 *            Dark     : '#343a40'  // optional
 *           }
 * })
 * ```
 * @category Imports for angular app.module
 */
export { NgxAwesomePopupModule } from "./ngx-awesome-popup/ngx-awesome-popup.module";
/**
 * This is the module that ignites dynamic dialog modal, its purpose is to load any angular component in
 * dialog window. Dynamic component means that user can evoke any Angular component in the popup just from typescript. Component view
 * is dynamically created with the library engine and there is no need to call any selector in HTML to create component view.
 *
 * It is crucial for user to add this module in angular.app imports.
 * Below is the example with (optional) default user configuration, that is what will be in setup if there is no
 * local config when popup is evoked, that means it can be overridden directly when popup is called.
 * For implementation look: {@link IDialogUserConfig}.
 *
 * Example:
 * ```typescript
 * // app.module imports:
 *DialogConfigModule.forRoot({
 *     DialogCoreConfig: {
 *        Width        : '500px',
 *        ButtonPosition: 'right',
 *        LayoutType: DialogLayoutDisplay.INFO,
 *        LoaderComponent: // Any angular component class name can be included as a loader.
 *     },
 *     Buttons: [
 *        new ButtonMaker('Ok', 'ok', ButtonLayoutDisplay.PRIMARY),
 *        new ButtonMaker('Cancel', 'cancel', ButtonLayoutDisplay.SECONDARY)
 *     ],
 * })
 * ```
 * * DialogCoreConfig.LayoutType: {@link DialogLayoutDisplay}
 * * ButtonLayoutDisplay: {@link ButtonLayoutDisplay}
 * * ButtonMaker: {@link ButtonMaker}
 * @category Imports for angular app.module
 */
export { DialogConfigModule } from "./ngx-awesome-popup/ngx-awesome-popup.module";
/**
 * This is the module that ignites Confirm box dialog, its purpose is to show popup in a
 * small dialog window in the middle of the screen. User can provide title, message and include buttons.
 * Confirm box is available in predefined layout types (enums): {@link DialogLayoutDisplay}.
 *
 * It is crucial for user to add this module in angular.app imports.
 * Below is the example with (optional) default user configuration, that's what will be used if there is no
 * local config when popup is evoked, that means it can be overridden directly when popup is evoked.
 * For implementation look: {@link IConfirmBoxUserConfig}.
 *
 * Example:
 * ```typescript
 * // app.module imports:
 *ConfirmBoxConfigModule.forRoot({
 *    ConfirmBoxCoreConfig: {
 *       Width: '700px',
 *       LayoutType: DialogLayoutDisplay.DANGER,
 *       ButtonPosition: 'center'
 *    },
 *    Dispatch: {  // Optional default dispatch object.
 *       Title: 'Default title',
 *       Message: 'Default message'
 *    },
 *    Buttons     : [
 *       new ButtonMaker('Ok', 'ok', ButtonLayoutDisplay.PRIMARY),
 *       new ButtonMaker('Cancel', 'cancel', ButtonLayoutDisplay.SECONDARY)
 *    ]
 * })
 * ```
 * * ConfirmBoxCoreConfig: {@link IConfirmBoxCoreConfig}
 * * Dispatch: {@link IDispatch}
 * * Buttons: {@link IButton}
 * * ButtonMaker: {@link ButtonMaker}
 * @category Imports for angular app.module
 */
export { ConfirmBoxConfigModule } from "./ngx-awesome-popup/ngx-awesome-popup.module";
/**
 * This is the module that ignites Toast notifications dialog, its purpose is to show toast popup in a
 * small dialog window in the corner of the screen. User can provide title and message and include buttons, or setup auto disappearing.
 * Toast notifications are available in predefined layout types (enums): {@link DialogLayoutDisplay}.
 *
 * It is crucial for user to add this module in angular.app imports.
 * Below is the example with (optional) default user configuration, that's what will be used if there is no
 * local config when popup is evoked, that means it can be overridden directly when popup is evoked.
 * For implementation look: {@link IToastNotificationUserConfig}.
 *
 * Example:
 * ```typescript
 * // app.module imports:
 *ToastNotificationConfigModule.forRoot({
 *    ToastCoreConfig: {
 *       // Milliseconds it will be ignored if buttons are included.
 *       AutoCloseDelay: 3000
 *    },
 *    GlobalSettings: {
 *       // The number of toast notifications that can be shown at once.
 *       AllowedNotificationsAtOnce: 4
 *    },
 *    // Optional default dispatch object.
 *    Dispatch: {
 *      Title: 'Default title',
 *      Message: 'Default message'
 *   },
 *   Buttons: [
 *      new ButtonMaker('Ok', 'ok', ButtonLayoutDisplay.PRIMARY),
 *      new ButtonMaker('Cancel', 'cancel', ButtonLayoutDisplay.SECONDARY)
 *   ]
 *})
 * ```
 * * ToastCoreConfig: {@link IToastCoreConfig}
 * * GlobalSettings: {@link IGlobalToastSettings}
 * * Dispatch: {@link IDispatch}
 * * Buttons: {@link IButton}
 * * ButtonMaker: {@link ButtonMaker}
 * @category Imports for angular app.module
 */
export { ToastNotificationConfigModule } from "./ngx-awesome-popup/ngx-awesome-popup.module";
// endregion
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljX2FwaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3B1YmxpY19hcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBbUIsTUFBTSxpQ0FBaUMsQ0FBQztBQUMvRSxPQUFPLEVBQ0wsZUFBZSxHQUVoQixNQUFNLGtEQUFrRCxDQUFDO0FBQzFELE9BQU8sRUFDTCxXQUFXLEdBRVosTUFBTSw2Q0FBNkMsQ0FBQztBQUNyRCxPQUFPLEVBQ0wsc0JBQXNCLEdBSXZCLE1BQU0seURBQXlELENBQUM7QUFDakUsSUFBTyxxQkFBcUIsR0FBRyxlQUFlLENBQUMscUJBQXFCLENBQUM7QUFLckUsSUFBTyxlQUFlLEdBQUcsV0FBVyxDQUFDLGVBQWUsQ0FBQztBQUNyRCxJQUFPLGlCQUFpQixHQUFHLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQztBQU16RCxJQUFPLFdBQVcsR0FBRyxXQUFXLENBQUMsV0FBVyxDQUFDO0FBQzdDLElBQU8saUJBQWlCLEdBQUcsV0FBVyxDQUFDLGlCQUFpQixDQUFDO0FBTXpELElBQU8sd0JBQXdCLEdBQUcsc0JBQXNCLENBQUMsd0JBQXdCLENBQUM7QUFDbEYsSUFBTyw0QkFBNEIsR0FBRyxzQkFBc0IsQ0FBQyw0QkFBNEIsQ0FBQztBQTBCMUYsWUFBWTtBQUVaLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBRXJFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHlEQUF5RCxDQUFDO0FBQzVGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHlEQUF5RCxDQUFDO0FBQy9GLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlEQUF5RCxDQUFDO0FBRWhHOztHQUVHO0FBQ0gsT0FBTyxFQUFFLFdBQVcsRUFBRSxDQUFDO0FBRXZCOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUNILE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxDQUFDO0FBRTdCOzs7Ozs7OztHQVFHO0FBQ0gsT0FBTyxFQUFFLHdCQUF3QixFQUFFLENBQUM7QUFFcEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1ERztBQUNILE9BQU8sRUFBRSxlQUFlLEVBQUUsQ0FBQztBQXFCM0IsWUFBWTtBQUVaLDZCQUE2QjtBQUU3Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtDRztBQUNILE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxDQUFDO0FBQ3hDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1DRztBQUNILE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxDQUFDO0FBQ2pDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOENHO0FBQ0gsT0FBTyxFQUFFLGlCQUFpQixFQUFFLENBQUM7QUFDN0IsWUFBWTtBQUVaLGdEQUFnRDtBQUNoRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFDSCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUNyRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOEJHO0FBQ0gsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDbEY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQ0c7QUFDSCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUN0Rjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUNHO0FBQ0gsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDN0YsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdsb2JhbENsYXNzLCBHbG9iYWxJbnRlcmZhY2UgfSBmcm9tIFwiLi9uZ3gtYXdlc29tZS1wb3B1cC9jb3JlL2dsb2JhbFwiO1xuaW1wb3J0IHtcbiAgQ29uZmlybUJveENsYXNzLFxuICBDb25maXJtQm94SW50ZXJmYWNlLFxufSBmcm9tIFwiLi9uZ3gtYXdlc29tZS1wb3B1cC90eXBlcy9jb25maXJtLWJveC9jb3JlL21vZGVsXCI7XG5pbXBvcnQge1xuICBEaWFsb2dDbGFzcyxcbiAgRGlhbG9nSW50ZXJmYWNlLFxufSBmcm9tIFwiLi9uZ3gtYXdlc29tZS1wb3B1cC90eXBlcy9kaWFsb2cvY29yZS9tb2RlbFwiO1xuaW1wb3J0IHtcbiAgVG9hc3ROb3RpZmljYXRpb25DbGFzcyxcbiAgVG9hc3ROb3RpZmljYXRpb25JbnRlcmZhY2UsXG4gIFRvYXN0UG9zaXRpb25FbnVtLFxuICBUb2FzdFVzZXJWaWV3VHlwZUVudW0sXG59IGZyb20gXCIuL25neC1hd2Vzb21lLXBvcHVwL3R5cGVzL3RvYXN0LW5vdGlmaWNhdGlvbi9jb3JlL21vZGVsXCI7XG5pbXBvcnQgQ29uZmlybUJveEluaXRpYWxpemVyID0gQ29uZmlybUJveENsYXNzLkNvbmZpcm1Cb3hJbml0aWFsaXplcjtcbmltcG9ydCBJQ29uZmlybUJveENvcmVDb25maWcgPSBDb25maXJtQm94SW50ZXJmYWNlLklDb25maXJtQm94Q29yZUNvbmZpZztcblxuaW1wb3J0IElDb25maXJtQm94UHVibGljUmVzcG9uc2UgPSBDb25maXJtQm94SW50ZXJmYWNlLklDb25maXJtQm94UHVibGljUmVzcG9uc2U7XG5pbXBvcnQgSUNvbmZpcm1Cb3hVc2VyQ29uZmlnID0gQ29uZmlybUJveEludGVyZmFjZS5JQ29uZmlybUJveFVzZXJDb25maWc7XG5pbXBvcnQgRGlhbG9nQmVsb25naW5nID0gRGlhbG9nQ2xhc3MuRGlhbG9nQmVsb25naW5nO1xuaW1wb3J0IERpYWxvZ0luaXRpYWxpemVyID0gRGlhbG9nQ2xhc3MuRGlhbG9nSW5pdGlhbGl6ZXI7XG5pbXBvcnQgSURpYWxvZ0NvcmVDb25maWcgPSBEaWFsb2dJbnRlcmZhY2UuSURpYWxvZ0NvcmVDb25maWc7XG5cbmltcG9ydCBJRGlhbG9nRXZlbnRzQ29udHJvbGxlciA9IERpYWxvZ0ludGVyZmFjZS5JRGlhbG9nRXZlbnRzQ29udHJvbGxlcjtcbmltcG9ydCBJRGlhbG9nUHVibGljUmVzcG9uc2UgPSBEaWFsb2dJbnRlcmZhY2UuSURpYWxvZ1B1YmxpY1Jlc3BvbnNlO1xuaW1wb3J0IElEaWFsb2dVc2VyQ29uZmlnID0gRGlhbG9nSW50ZXJmYWNlLklEaWFsb2dVc2VyQ29uZmlnO1xuaW1wb3J0IEJ1dHRvbk1ha2VyID0gR2xvYmFsQ2xhc3MuQnV0dG9uTWFrZXI7XG5pbXBvcnQgUmVzZXRHbG9iYWxDb25maWcgPSBHbG9iYWxDbGFzcy5SZXNldEdsb2JhbENvbmZpZztcblxuaW1wb3J0IElCdXR0b24gPSBHbG9iYWxJbnRlcmZhY2UuSUJ1dHRvbjtcbmltcG9ydCBJQ29sb3JUeXBlcyA9IEdsb2JhbEludGVyZmFjZS5JQ29sb3JUeXBlcztcbmltcG9ydCBJRGlzcGF0Y2ggPSBHbG9iYWxJbnRlcmZhY2UuSURpc3BhdGNoO1xuaW1wb3J0IElHbG9iYWxVc2VyQ29uZmlnID0gR2xvYmFsSW50ZXJmYWNlLklHbG9iYWxVc2VyQ29uZmlnO1xuaW1wb3J0IFJlc2V0VG9hc3RHbG9iYWxTZXR0aW5ncyA9IFRvYXN0Tm90aWZpY2F0aW9uQ2xhc3MuUmVzZXRUb2FzdEdsb2JhbFNldHRpbmdzO1xuaW1wb3J0IFRvYXN0Tm90aWZpY2F0aW9uSW5pdGlhbGl6ZXIgPSBUb2FzdE5vdGlmaWNhdGlvbkNsYXNzLlRvYXN0Tm90aWZpY2F0aW9uSW5pdGlhbGl6ZXI7XG5pbXBvcnQgSUdsb2JhbFRvYXN0U2V0dGluZ3MgPSBUb2FzdE5vdGlmaWNhdGlvbkludGVyZmFjZS5JR2xvYmFsVG9hc3RTZXR0aW5ncztcbmltcG9ydCBJVG9hc3RDb3JlQ29uZmlnID0gVG9hc3ROb3RpZmljYXRpb25JbnRlcmZhY2UuSVRvYXN0Q29yZUNvbmZpZztcblxuaW1wb3J0IElUb2FzdE5vdGlmaWNhdGlvblB1YmxpY1Jlc3BvbnNlID0gVG9hc3ROb3RpZmljYXRpb25JbnRlcmZhY2UuSVRvYXN0Tm90aWZpY2F0aW9uUHVibGljUmVzcG9uc2U7XG5pbXBvcnQgSVRvYXN0Tm90aWZpY2F0aW9uVXNlckNvbmZpZyA9IFRvYXN0Tm90aWZpY2F0aW9uSW50ZXJmYWNlLklUb2FzdE5vdGlmaWNhdGlvblVzZXJDb25maWc7XG5cbi8vIHJlZ2lvbiAqKiogSW50ZXJmYWNlICoqKlxuZXhwb3J0IHsgSUdsb2JhbFVzZXJDb25maWcgfTtcbmV4cG9ydCB7IElCdXR0b24gfTtcbmV4cG9ydCB7IElEaXNwYXRjaCB9O1xuZXhwb3J0IHsgSUNvbG9yVHlwZXMgfTtcblxuZXhwb3J0IHsgSUNvbmZpcm1Cb3hVc2VyQ29uZmlnIH07XG5leHBvcnQgeyBJQ29uZmlybUJveENvcmVDb25maWcgfTtcbmV4cG9ydCB7IElDb25maXJtQm94UHVibGljUmVzcG9uc2UgfTtcblxuZXhwb3J0IHsgSUdsb2JhbFRvYXN0U2V0dGluZ3MgfTtcbmV4cG9ydCB7IElUb2FzdENvcmVDb25maWcgfTtcbmV4cG9ydCB7IElUb2FzdE5vdGlmaWNhdGlvblVzZXJDb25maWcgfTtcbmV4cG9ydCB7IElUb2FzdE5vdGlmaWNhdGlvblB1YmxpY1Jlc3BvbnNlIH07XG5cbmV4cG9ydCB7IElEaWFsb2dVc2VyQ29uZmlnIH07XG5leHBvcnQgeyBJRGlhbG9nQ29yZUNvbmZpZyB9O1xuZXhwb3J0IHsgSURpYWxvZ1B1YmxpY1Jlc3BvbnNlIH07XG5leHBvcnQgeyBJRGlhbG9nRXZlbnRzQ29udHJvbGxlciB9O1xuLy8gZW5kcmVnaW9uXG5cbmV4cG9ydCB7IEJ1dHRvbkxheW91dERpc3BsYXkgfSBmcm9tIFwiLi9uZ3gtYXdlc29tZS1wb3B1cC9jb3JlL2VudW1zXCI7XG5leHBvcnQgeyBEaWFsb2dMYXlvdXREaXNwbGF5IH0gZnJvbSBcIi4vbmd4LWF3ZXNvbWUtcG9wdXAvY29yZS9lbnVtc1wiO1xuZXhwb3J0IHsgVmVydGljYWxQb3NpdGlvbiB9IGZyb20gXCIuL25neC1hd2Vzb21lLXBvcHVwL2NvcmUvZW51bXNcIjtcbmV4cG9ydCB7IFRvYXN0UG9zaXRpb25FbnVtIH0gZnJvbSBcIi4vbmd4LWF3ZXNvbWUtcG9wdXAvdHlwZXMvdG9hc3Qtbm90aWZpY2F0aW9uL2NvcmUvbW9kZWxcIjtcbmV4cG9ydCB7IFRvYXN0UHJvZ3Jlc3NCYXJFbnVtIH0gZnJvbSBcIi4vbmd4LWF3ZXNvbWUtcG9wdXAvdHlwZXMvdG9hc3Qtbm90aWZpY2F0aW9uL2NvcmUvbW9kZWxcIjtcbmV4cG9ydCB7IFRvYXN0VXNlclZpZXdUeXBlRW51bSB9IGZyb20gXCIuL25neC1hd2Vzb21lLXBvcHVwL3R5cGVzL3RvYXN0LW5vdGlmaWNhdGlvbi9jb3JlL21vZGVsXCI7XG5cbi8qKlxuICogQHJldHVybnMgSXQgd2lsbCByZXR1cm4gY3VzdG9tIGJ1dHRvbiBvYmplY3QgcmVhZHkgdG8gYmUgdXNlZCBpbiBjaGlsZCBjb21wb25lbnQgbGF5b3V0LlxuICovXG5leHBvcnQgeyBCdXR0b25NYWtlciB9O1xuXG4vKipcbiAqYGBgdHlwZXNjcmlwdFxuICogLy8gSW5zdGFudGlhdGUgY29uZmlnIG9iamVjdCBhcyBleGFtcGxlIGJlbG93IHRvIGNoYW5nZSBnbG9iYWwgc2V0dGluZ3Mgb24tZmx5IGl0IHRha2VzIElHbG9iYWxVc2VyQ29uZmlnXG4gKiBhcyB0aGUgYXJndW1lbnQuXG4gKiBuZXcgUmVzZXRHbG9iYWxDb25maWcoe1xuICogICAgIENvbG9yTGlzdDoge1xuICogICAgICAgICAgICBQcmltYXJ5ICA6ICcjZmY5ZTAwJywgLy8gb3B0aW9uYWxcbiAqICAgICAgICAgICAgU2Vjb25kYXJ5OiAnIzk4OWVhNScsIC8vIG9wdGlvbmFsXG4gKiAgICAgICAgICAgIEluZm8gICAgIDogJyMyZjhlZTUnLCAvLyBvcHRpb25hbFxuICogICAgICAgICAgICBTdWNjZXNzICA6ICcjM2NhZWEzJywgLy8gb3B0aW9uYWxcbiAqICAgICAgICAgICAgV2FybmluZyAgOiAnI2ZmYzEwNycsIC8vIG9wdGlvbmFsXG4gKiAgICAgICAgICAgIERhbmdlciAgIDogJyNlNDY0NjQnLCAvLyBvcHRpb25hbFxuICogICAgICAgICAgICBMaWdodCAgICA6ICcjZmJmYmZiJywgLy8gb3B0aW9uYWxcbiAqICAgICAgICAgICAgRGFyayAgICAgOiAnIzM0M2E0MCcgIC8vIG9wdGlvbmFsXG4gKiAgICAgICAgICAgfVxuICogfSlcbiAqIGBgYFxuICovXG5leHBvcnQgeyBSZXNldEdsb2JhbENvbmZpZyB9O1xuXG4vKipcbiAqYGBgdHlwZXNjcmlwdFxuICogLy8gSW5zdGFudGlhdGUgdG9hc3QgZ2xvYmFsIGNvbmZpZyBvYmplY3QgYXMgZXhhbXBsZSBiZWxvdyB0byBjaGFuZ2UgZ2xvYmFsIHNldHRpbmdzIG9uLWZseSBpdCB0YWtlcyBJR2xvYmFsVG9hc3RTZXR0aW5nc1xuICogYXMgdGhlIGFyZ3VtZW50LlxuICogbmV3IFJlc2V0VG9hc3RHbG9iYWxTZXR0aW5ncyh7XG4gKiAgICAgQWxsb3dlZE5vdGlmaWNhdGlvbnNBdE9uY2U6IDJcbiAqIH0pXG4gKiBgYGBcbiAqL1xuZXhwb3J0IHsgUmVzZXRUb2FzdEdsb2JhbFNldHRpbmdzIH07XG5cbi8qKlxuICogVGhpcyBpcyB0aGUgY2xhc3MgdGhhdCBuZWVkcyB0byBiZSBhZGRlZCBhcyBESSBpbiB0aGUgY29uc3RydWN0b3Igb2YgYSBjaGlsZCBjb21wb25lbnQgdGhhdCB3aWxsIGJlXG4gKiBvcGVuZWQgZHluYW1pY2FsbHkgd2l0aCB7QGxpbmsgRGlhbG9nSW5pdGlhbGl6ZXJ9LiBJdCBjb250YWlucyB2YXJpb3VzIGluZm9ybWF0aW9uIG9yXG4gKiBldmVudCBjb250cm9sbGVycywgYW5kIGxpc3RlbmVycyB0aGF0IGNhbiBiZSB1c2VkIGluIGEgY2hpbGQgY29tcG9uZW50LiBBbHNvLCB0aGVyZSBpcyBjdXN0b20gZGF0YVxuICogdGhhdCBpcyBzZW50IGZyb20gY29tcG9uZW50IHdoZXJlIHRoZSB7QGxpbmsgRGlhbG9nSW5pdGlhbGl6ZXJ9IGlzLiBVc2VyIGNhbiBzZXQgc3BlY2lmaWMgdHlwZSBvZlxuICogY3VzdG9tIGRhdGEgdGhhdCBjaGlsZCBjb21wb25lbnQgd2lsbCByZWNlaXZlIGJ5IGluY2x1ZGluZyBpdCBhcyBnZW5lcmljIHR5cGUuXG4gKlxuICpcbiAqIEV4YW1wbGU6XG4gKiBgYGB0eXBlc2NyaXB0XG4gKmltcG9ydCB7RGlhbG9nQmVsb25naW5nfSBmcm9tICduZ3gtYXdlc29tZS1wb3B1cCc7XG4gKkBDb21wb25lbnQoe1xuICogICAgc2VsZWN0b3IgICA6ICdhcHAtY3VwJyxcbiAqICAgIHRlbXBsYXRlVXJsOiAnLi9jdXAuY29tcG9uZW50Lmh0bWwnLFxuICogICAgc3R5bGVVcmxzICA6IFsnLi9jdXAuY29tcG9uZW50LnNjc3MnXVxuICp9KVxuICogZXhwb3J0IGNsYXNzIEN1cENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAqXG4gKiAgICBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuICpcbiAqICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZGlhbG9nQmVsb25naW5nOiBEaWFsb2dCZWxvbmdpbmcpIHtcbiAqICAgIH1cbiAqXG4gKiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAqICAgIGNvbnNvbGUubG9nKHRoaXMuZGlhbG9nQmVsb25naW5nKTtcbiAqXG4gKiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gKiAgICAgICAgICAgIHRoaXMuZGlhbG9nQmVsb25naW5nLkV2ZW50c0NvbnRyb2xsZXIub25CdXR0b25DbGljayQuc3Vic2NyaWJlKChfQnV0dG9uKSA9PiB7XG4gKiAgICAgICAgICAgIGlmIChfQnV0dG9uLklEID09PSAnb2snKSB7XG4gKiAgICAgICAgICAgICAgICAvLyBEbyBzb21lIGxvZ2ljIGFuZCBjbG9zZSBwb3B1cC5cbiAqICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9nQmVsb25naW5nLkV2ZW50c0NvbnRyb2xsZXIuY2xvc2UoKTtcbiAqICAgICAgICAgICAgfSBlbHNlIGlmIChfQnV0dG9uLklEID09PSAnY2FuY2VsJykge1xuICogICAgICAgICAgICAgICAgLy8gRG8gc29tZSBsb2dpYyBhbmQgY2xvc2UgcG9wdXAuXG4gKiAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ0JlbG9uZ2luZy5FdmVudHNDb250cm9sbGVyLmNsb3NlKCk7XG4gKiAgICAgICAgICAgIH1cbiAqICAgICAgICB9KVxuICogICAgICAgICk7XG4gKlxuICogICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICogICAgICAgICAgICAvLyBDbG9zZSBsb2FkZXIgYWZ0ZXIgYXN5bmMgZGF0YSBpcyByZWFkeS5cbiAqICAgICAgICAgICAgdGhpcy5kaWFsb2dCZWxvbmdpbmcuRXZlbnRzQ29udHJvbGxlci5jbG9zZUxvYWRlcigpO1xuICogICAgICAgIH0sIDEwMDApO1xuICogICAgfVxuICp9XG5cbiBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgLy8gQ2xvc2UgYWxsIHN1YnNjcmlwdGlvbnMuXG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHN1YiA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XG4gICAgfVxuICogYGBgXG4gKiBAY2F0ZWdvcnkgY2hpbGQgZHluYW1pYyBjb21wb25lbnQgZGF0YSAmIGV2ZW50IGNvbnRyb2xsZXJcbiAqL1xuZXhwb3J0IHsgRGlhbG9nQmVsb25naW5nIH07XG5cbi8vIHJlZ2lvbiAqKiogT2JzZXJ2YWJsZSByZXNwb25zZSBhZnRlciBjbG9zaW5nIHBvcHVwICoqKlxuLyoqXG4gKiBSZWd1bGFyIGRlc2NyaXB0aW9uXG4gKlxuICogQGNhdGVnb3J5IE9ic2VydmFibGUgcmVzcG9uc2UgYWZ0ZXIgY2xvc2luZyBwb3B1cFxuICovXG5leHBvcnQgeyBJVG9hc3ROb3RpZmljYXRpb25QdWJsaWNSZXNwb25zZSBhcyBJVG9hc3ROb3RpZmljYXRpb25SZXNwb25zZSB9O1xuLyoqXG4gKiBSZWd1bGFyIGRlc2NyaXB0aW9uXG4gKlxuICogQGNhdGVnb3J5IE9ic2VydmFibGUgcmVzcG9uc2UgYWZ0ZXIgY2xvc2luZyBwb3B1cFxuICovXG5leHBvcnQgeyBJQ29uZmlybUJveFB1YmxpY1Jlc3BvbnNlIGFzIElDb25maXJtQm94UmVzcG9uc2UgfTtcbi8qKlxuICogUmVndWxhciBkZXNjcmlwdGlvblxuICpcbiAqIEBjYXRlZ29yeSBPYnNlcnZhYmxlIHJlc3BvbnNlIGFmdGVyIGNsb3NpbmcgcG9wdXBcbiAqL1xuZXhwb3J0IHsgSURpYWxvZ1B1YmxpY1Jlc3BvbnNlIGFzIElEaWFsb2dSZXNwb25zZSB9O1xuLy8gZW5kcmVnaW9uXG5cbi8vIHJlZ2lvbiAqKiogUG9wdXAgb3BlbiAgKioqXG5cbi8qKlxuICogVGhpcyBpcyB0aGUgY2xhc3MgdGhhdCBuZWVkcyB0byBiZSBpbnN0YW50aWF0ZWQgdG8gc2V0IHVwIGFuZCBpZ25pdGUgYSBUb2FzdE5vdGlmaWNhdGlvbixcbiAqIGl0cyBwdXJwb3NlIGlzIHRvIHNob3cgc2hvcnQgbm90aWZpY2F0aW9uIHRvIGVuZC11c2VyLCBvciBldmVuIGludGVyYWN0IHdpdGggdXNlci5cbiAqIEl0IGNhbiBiZSBldm9rZWQgZnJvbSBhbnkgYW5ndWxhciB0eXBlc2NyaXB0IGZpbGUuXG4gKlxuICogQmVsb3cgaXMgdGhlIGV4YW1wbGUgd2l0aCAoc29tZSBvcHRpb25hbCkgdXNlciBjb25maWd1cmF0aW9uLFxuICogaXQgd2lsbCBvdmVycmlkZSBkZWZhdWx0IGNvbmZpZ3VyYXRpb24gZnJvbSBhcHAubW9kdWxlLlxuICpcbiAqXG4gKiBFeGFtcGxlOlxuICogYGBgdHlwZXNjcmlwdFxuICogLy8gQ3JlYXRlIHRoZSBpbml0aWFsaXplci5cbiAqY29uc3QgbmV3VG9hc3ROb3RpZmljYXRpb24gPSBuZXcgVG9hc3ROb3RpZmljYXRpb25Jbml0aWFsaXplcigpO1xuICpcbiAqIC8vIFNldCBkZXNpcmVkIFRpdGxlLlxuICpuZXdUb2FzdE5vdGlmaWNhdGlvbi5zZXRUaXRsZSgnV2FybmluZyEnKTtcbiAqXG4gKiAvLyBTZXQgZGVzaXJlZCBNZXNzYWdlLlxuICpuZXdUb2FzdE5vdGlmaWNhdGlvbi5zZXRNZXNzYWdlKCdGb3JtIGlzIG5vdCB2YWxpZCEnKTtcbiAqXG4gKiAvLyBTZXQgZGVzaXJlZCBjb25maWd1cmF0aW9uLlxuICpuZXdUb2FzdE5vdGlmaWNhdGlvbi5zZXRDb25maWcoe1xuICogICAgICBMYXlvdXRUeXBlOiBEaWFsb2dMYXlvdXREaXNwbGF5LldBUk5JTkdcbiAqICAgfSk7XG5cbiAqIC8vIE9wZW4gYSBUb2FzdE5vdGlmaWNhdGlvbi5cbiAqIG5ld0NvbmZpcm1Cb3gub3BlbkNvbmZpcm1Cb3gkKCkuc3Vic2NyaWJlKHJlc3AgPT4ge1xuICogICBjb25zb2xlLmxvZygnY29uZmlybUJveCByZXNwb25zZTogJywgcmVzcCk7XG4gKiAgfSk7XG4gKiBgYGBcbiAqICogSVRvYXN0Q29yZUNvbmZpZzoge0BsaW5rIElUb2FzdENvcmVDb25maWd9XG4gKiAqIExheW91dFR5cGU6IHtAbGluayBEaWFsb2dMYXlvdXREaXNwbGF5fVxuICogKiBJVG9hc3ROb3RpZmljYXRpb25QdWJsaWNSZXNwb25zZToge0BsaW5rIElUb2FzdE5vdGlmaWNhdGlvblB1YmxpY1Jlc3BvbnNlfVxuICogQGNhdGVnb3J5IFBvcHVwIG9wZW5cbiAqL1xuZXhwb3J0IHsgVG9hc3ROb3RpZmljYXRpb25Jbml0aWFsaXplciB9O1xuLyoqXG4gKiBUaGlzIGlzIHRoZSBjbGFzcyB0aGF0IG5lZWRzIHRvIGJlIGluc3RhbnRpYXRlZCB0byBzZXQgdXAgYW5kIGlnbml0ZSBhIENvbmZpcm1Cb3ggYW5kIGNyZWF0ZSBjb250ZW50LlxuICogSXRzIHB1cnBvc2UgaXMgdG8gZ2V0IGNvbmZpcm1hdGlvbiByZXNwb25zZSBmcm9tIGVuZC11c2VyLiBJdCBjYW4gYmUgY2FsbGVkIGZyb20gYW55IGFuZ3VsYXJcbiAqIHR5cGVzY3JpcHQgZmlsZS5cbiAqXG4gKiBCZWxvdyBpcyBleGFtcGxlIHdpdGggKHNvbWUgb3B0aW9uYWwpIHVzZXIgY29uZmlndXJhdGlvbixcbiAqIGl0IHdpbGwgb3ZlcnJpZGUgZGVmYXVsdCBjb25maWd1cmF0aW9uIGZyb20gYXBwLm1vZHVsZS5cbiAqXG4gKlxuICogRXhhbXBsZTpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIC8vIENyZWF0ZSB0aGUgaW5pdGlhbGl6ZXIuXG4gKmNvbnN0IG5ld0NvbmZpcm1Cb3ggPSBuZXcgQ29uZmlybUJveEluaXRpYWxpemVyKCk7XG4gKlxuICogLy8gU2V0IGRlc2lyZWQgZGlzcGF0Y2g6IF9UaXRsZTogc3RyaW5nLCBfTWVzc2FnZTogc3RyaW5nLlxuICpuZXdDb25maXJtQm94LnNldERpc3BhdGNoKCdBcmUgeW91IHN1cmU/JywgJ1RoYXQgYWN0aW9uIHdpbGwgZGVsZXRlIHVzZXIhJyk7XG4gKlxuICogLy8gU2V0IGRlc2lyZWQgY29uZmlndXJhdGlvbi5cbiAqbmV3Q29uZmlybUJveC5zZXRDb25maWcoe1xuICogICAgICBMYXlvdXRUeXBlOiBEaWFsb2dMYXlvdXREaXNwbGF5LkRBTkdFUlxuICogICB9KTtcbiAqXG4gKiAvLyBTZXQgYnV0dG9uIGxhYmVscy5cbiAqIG5ld0NvbmZpcm1Cb3guc2V0QnV0dG9uTGFiZWxzKCdZRVMnLCAnTk8nKTtcbiAqXG4gKiAvLyBPcGVuIGEgQ29uZmlybUJveCwgYW5kIGdldCBjbGlja2VkIGJ1dHRvbi1pZCBpbiByZXNwb25zZS5cbiAqIG5ld0NvbmZpcm1Cb3gub3BlbkNvbmZpcm1Cb3gkKCkuc3Vic2NyaWJlKHJlc3AgPT4ge1xuICogICAvLyBJQ29uZmlybUJveFB1YmxpY1Jlc3BvbnNlXG4gKiAgIGNvbnNvbGUubG9nKCdjb25maXJtQm94IHJlc3BvbnNlOiAnLCByZXNwKTtcbiAqICB9KTtcbiAqIGBgYFxuICogKiBJQ29uZmlybUJveENvcmVDb25maWc6IHtAbGluayBJQ29uZmlybUJveENvcmVDb25maWd9XG4gKiAqIExheW91dFR5cGU6IHtAbGluayBEaWFsb2dMYXlvdXREaXNwbGF5fVxuICogKiBJQ29uZmlybUJveFB1YmxpY1Jlc3BvbnNlOiB7QGxpbmsgSUNvbmZpcm1Cb3hQdWJsaWNSZXNwb25zZX1cbiAqIEBjYXRlZ29yeSBQb3B1cCBvcGVuXG4gKi9cbmV4cG9ydCB7IENvbmZpcm1Cb3hJbml0aWFsaXplciB9O1xuLyoqXG4gKiBUaGlzIGlzIHRoZSBjbGFzcyB0aGF0IG5lZWRzIHRvIGJlIGluc3RhbnRpYXRlZCB0byBzZXQgdXAgYW5kIGlnbml0ZSBhIERpYWxvZyBhbmQgY3JlYXRlIGR5bmFtaWMgY29tcG9uZW50LFxuICogaXRzIHB1cnBvc2UgaXMgdG8gcmVuZGVyIGFueSBhbmd1bGFyIGNvbXBvbmVudCB2aWV3IHdpdGggc3BlY2lmaWMgY29uZmlndXJhdGlvbiBmcm9tIGFueSBhbmd1bGFyIHR5cGVzY3JpcHQgZmlsZS5cbiAqIER5bmFtaWMgY29tcG9uZW50IG1lYW5zIHRoYXQgdXNlciBjYW4gZXZva2UgdGhlIHBvcHVwIGZyb20gdHlwZXNjcmlwdCBhbmQgY29tcG9uZW50IHZpZXdcbiAqIGlzIGR5bmFtaWNhbGx5IGNyZWF0ZWQgd2l0aCB0aGUgQXdlc29tZSBQb3B1cCBlbmdpbmUuIFRoZXJlIGlzIG5vIG5lZWQgdG8gY2FsbCBhbnkgc2VsZWN0b3IgaW4gSFRNTCB0byBjcmVhdGUgY29tcG9uZW50IHZpZXcuXG4gKlxuICogRGlhbG9nSW5pdGlhbGl6ZXIgY2FuIHNlbmQgZGF0YSB0byBjaGlsZCBjb21wb25lbnQgKGR5bmFtaWMgY29tcG9uZW50KSB3aGVyZSBkYXRhIHdpbGwgYmUgYWNjZXNzaWJsZSB3aXRoIHtAbGluayBEaWFsb2dCZWxvbmdpbmd9LlxuICpcbiAqIEJlbG93IGlzIHRoZSBleGFtcGxlIHdpdGggKHNvbWUgb3B0aW9uYWwpIHVzZXIgY29uZmlndXJhdGlvbixcbiAqIGl0IHdpbGwgb3ZlcnJpZGUgZGVmYXVsdCBjb25maWd1cmF0aW9uIGZyb20gYXBwLm1vZHVsZS5cbiAqXG4gKlxuICogRXhhbXBsZTpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqICBpbXBvcnQge0RpYWxvZ0luaXRpYWxpemVyLCBEaWFsb2dMYXlvdXREaXNwbGF5LCBCdXR0b25NYWtlciwgQnV0dG9uTGF5b3V0RGlzcGxheX0gZnJvbSAnbmd4LWF3ZXNvbWUtcG9wdXAnOzxcbiAqICBpbXBvcnQge0N1cENvbXBvbmVudH0gZnJvbSAnLi9jdXAvY3VwLmNvbXBvbmVudCc7XG4gKlxuICogIGNvbnN0IG5ld0RpYWxvZ1BvcHVwID0gbmV3IERpYWxvZ0luaXRpYWxpemVyKEN1cENvbXBvbmVudCk7IC8vIEFueSBBbmd1bGFyIGNvbXBvbmVudC5cbiAqXG4gKiAgLy8gQ3VzdG9tIGRhdGEgd2lsbCBiZSBzZW50IHRvIGR5bmFtaWMgY29tcG9uZW50IGF2YWlsYWJsZSBpbiBkaWFsb2dCZWxvbmdpbmcgb2JqZWN0LlxuICogIG5ld0RpYWxvZ1BvcHVwLnNldEN1c3RvbURhdGEoe25hbWU6ICdKb2huJywgc3VybmFtZTogJ0RvZScsIGlkOiAxfSk7XG4gKlxuICogIC8vIExvY2FsIGNvbmZpZyBzZXR0aW5ncyBJRGlhbG9nQ29yZUNvbmZpZy5cbiAqICBuZXdEaWFsb2dQb3B1cC5zZXRDb25maWcoe1xuICogICAgICBIZWlnaHQ6ICc1MDBweCcsXG4gKiAgICAgIExheW91dFR5cGU6IERpYWxvZ0xheW91dERpc3BsYXkuSU5GTyxcbiAqICAgICAgTG9hZGVyQ29tcG9uZW50OiBBbnkgQW5ndWxhciBjb21wb25lbnQgbmFtZVxuICogICAgICAgfSk7XG4gKlxuICogIC8vIEN1c3RvbSBidXR0b25zLCBsaXN0ZW5lciBpcyBhdmFpbGFibGUgaW4gY2hpbGQgY29tcG9uZW50IGluIGRpYWxvZ0JlbG9uZ2luZyBvYmplY3QuXG4gKiAgbmV3RGlhbG9nUG9wdXAuc2V0QnV0dG9ucyhbXG4gKiAgICAgIG5ldyBCdXR0b25NYWtlcignT2snLCAnb2snLCBCdXR0b25MYXlvdXREaXNwbGF5LlBSSU1BUlkpLFxuICogICAgICBuZXcgQnV0dG9uTWFrZXIoJ0NhbmNlbCcsICdjYW5jZWwnLCBCdXR0b25MYXlvdXREaXNwbGF5LlNFQ09OREFSWSlcbiAqICBdKTtcbiAqXG4gKiAgLy8gQ29tbWFuZCB0byBvcGVuIGRpYWxvZywgaXQgcmV0dXJucyBvYnNlcnZhYmxlLlxuICogIG5ld0RpYWxvZ1BvcHVwLm9wZW5EaWFsb2ckPGFueT4oKS5zdWJzY3JpYmUocmVzcCA9PiB7XG4gKiAgICAgICAgICAgY29uc29sZS5sb2coJ3Jlc3BvbnNlOiAnLCByZXNwLlBheWxvYWQpO1xuICogICAgICAgfSk7XG4gKiBgYGBcbiAqICogSURpYWxvZ0NvcmVDb25maWc6IHtAbGluayBJRGlhbG9nQ29yZUNvbmZpZ31cbiAqICogTGF5b3V0VHlwZToge0BsaW5rIERpYWxvZ0xheW91dERpc3BsYXl9XG4gKiAqIEJ1dHRvbkxheW91dERpc3BsYXk6IHtAbGluayBCdXR0b25MYXlvdXREaXNwbGF5fVxuICogKiBCdXR0b25NYWtlcjoge0BsaW5rIEJ1dHRvbk1ha2VyfVxuICogKiBJRGlhbG9nUHVibGljUmVzcG9uc2U6IHtAbGluayBJRGlhbG9nUHVibGljUmVzcG9uc2V9XG4gKiBAY2F0ZWdvcnkgUG9wdXAgb3BlblxuICovXG5leHBvcnQgeyBEaWFsb2dJbml0aWFsaXplciB9O1xuLy8gZW5kcmVnaW9uXG5cbi8vIHJlZ2lvbiAqKiogSW1wb3J0cyBmb3IgYW5ndWxhciBhcHAubW9kdWxlICoqKlxuLyoqXG4gKiBUaGlzIGlzIHRoZSBtYWluIG1vZHVsZSBvZiB0aGUgbGlicmFyeSwgaXQgaXMgY3J1Y2lhbCB0byBiZSBhZGRlZCB3aXRoaW4gYW5ndWxhci5hcHBcbiAqIGltcG9ydHMgYXMgYW4gZXhhbXBsZSB3aXRoIG9wdGlvbmFsIGFyZ3VtZW50LCBsb29rOiB7QGxpbmsgSUdsb2JhbFVzZXJDb25maWd9XG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogLy8gYXBwLm1vZHVsZSBpbXBvcnRzOlxuICogTmd4QXdlc29tZVBvcHVwTW9kdWxlLmZvclJvb3Qoe1xuICogICAgIENvbG9yTGlzdDoge1xuICogICAgICAgICAgICBQcmltYXJ5ICA6ICcjZmY5ZTAwJywgLy8gb3B0aW9uYWxcbiAqICAgICAgICAgICAgU2Vjb25kYXJ5OiAnIzk4OWVhNScsIC8vIG9wdGlvbmFsXG4gKiAgICAgICAgICAgIEluZm8gICAgIDogJyMyZjhlZTUnLCAvLyBvcHRpb25hbFxuICogICAgICAgICAgICBTdWNjZXNzICA6ICcjM2NhZWEzJywgLy8gb3B0aW9uYWxcbiAqICAgICAgICAgICAgV2FybmluZyAgOiAnI2ZmYzEwNycsIC8vIG9wdGlvbmFsXG4gKiAgICAgICAgICAgIERhbmdlciAgIDogJyNlNDY0NjQnLCAvLyBvcHRpb25hbFxuICogICAgICAgICAgICBMaWdodCAgICA6ICcjZmJmYmZiJywgLy8gb3B0aW9uYWxcbiAqICAgICAgICAgICAgRGFyayAgICAgOiAnIzM0M2E0MCcgIC8vIG9wdGlvbmFsXG4gKiAgICAgICAgICAgfVxuICogfSlcbiAqIGBgYFxuICogQGNhdGVnb3J5IEltcG9ydHMgZm9yIGFuZ3VsYXIgYXBwLm1vZHVsZVxuICovXG5leHBvcnQgeyBOZ3hBd2Vzb21lUG9wdXBNb2R1bGUgfSBmcm9tIFwiLi9uZ3gtYXdlc29tZS1wb3B1cC9uZ3gtYXdlc29tZS1wb3B1cC5tb2R1bGVcIjtcbi8qKlxuICogVGhpcyBpcyB0aGUgbW9kdWxlIHRoYXQgaWduaXRlcyBkeW5hbWljIGRpYWxvZyBtb2RhbCwgaXRzIHB1cnBvc2UgaXMgdG8gbG9hZCBhbnkgYW5ndWxhciBjb21wb25lbnQgaW5cbiAqIGRpYWxvZyB3aW5kb3cuIER5bmFtaWMgY29tcG9uZW50IG1lYW5zIHRoYXQgdXNlciBjYW4gZXZva2UgYW55IEFuZ3VsYXIgY29tcG9uZW50IGluIHRoZSBwb3B1cCBqdXN0IGZyb20gdHlwZXNjcmlwdC4gQ29tcG9uZW50IHZpZXdcbiAqIGlzIGR5bmFtaWNhbGx5IGNyZWF0ZWQgd2l0aCB0aGUgbGlicmFyeSBlbmdpbmUgYW5kIHRoZXJlIGlzIG5vIG5lZWQgdG8gY2FsbCBhbnkgc2VsZWN0b3IgaW4gSFRNTCB0byBjcmVhdGUgY29tcG9uZW50IHZpZXcuXG4gKlxuICogSXQgaXMgY3J1Y2lhbCBmb3IgdXNlciB0byBhZGQgdGhpcyBtb2R1bGUgaW4gYW5ndWxhci5hcHAgaW1wb3J0cy5cbiAqIEJlbG93IGlzIHRoZSBleGFtcGxlIHdpdGggKG9wdGlvbmFsKSBkZWZhdWx0IHVzZXIgY29uZmlndXJhdGlvbiwgdGhhdCBpcyB3aGF0IHdpbGwgYmUgaW4gc2V0dXAgaWYgdGhlcmUgaXMgbm9cbiAqIGxvY2FsIGNvbmZpZyB3aGVuIHBvcHVwIGlzIGV2b2tlZCwgdGhhdCBtZWFucyBpdCBjYW4gYmUgb3ZlcnJpZGRlbiBkaXJlY3RseSB3aGVuIHBvcHVwIGlzIGNhbGxlZC5cbiAqIEZvciBpbXBsZW1lbnRhdGlvbiBsb29rOiB7QGxpbmsgSURpYWxvZ1VzZXJDb25maWd9LlxuICpcbiAqIEV4YW1wbGU6XG4gKiBgYGB0eXBlc2NyaXB0XG4gKiAvLyBhcHAubW9kdWxlIGltcG9ydHM6XG4gKkRpYWxvZ0NvbmZpZ01vZHVsZS5mb3JSb290KHtcbiAqICAgICBEaWFsb2dDb3JlQ29uZmlnOiB7XG4gKiAgICAgICAgV2lkdGggICAgICAgIDogJzUwMHB4JyxcbiAqICAgICAgICBCdXR0b25Qb3NpdGlvbjogJ3JpZ2h0JyxcbiAqICAgICAgICBMYXlvdXRUeXBlOiBEaWFsb2dMYXlvdXREaXNwbGF5LklORk8sXG4gKiAgICAgICAgTG9hZGVyQ29tcG9uZW50OiAvLyBBbnkgYW5ndWxhciBjb21wb25lbnQgY2xhc3MgbmFtZSBjYW4gYmUgaW5jbHVkZWQgYXMgYSBsb2FkZXIuXG4gKiAgICAgfSxcbiAqICAgICBCdXR0b25zOiBbXG4gKiAgICAgICAgbmV3IEJ1dHRvbk1ha2VyKCdPaycsICdvaycsIEJ1dHRvbkxheW91dERpc3BsYXkuUFJJTUFSWSksXG4gKiAgICAgICAgbmV3IEJ1dHRvbk1ha2VyKCdDYW5jZWwnLCAnY2FuY2VsJywgQnV0dG9uTGF5b3V0RGlzcGxheS5TRUNPTkRBUlkpXG4gKiAgICAgXSxcbiAqIH0pXG4gKiBgYGBcbiAqICogRGlhbG9nQ29yZUNvbmZpZy5MYXlvdXRUeXBlOiB7QGxpbmsgRGlhbG9nTGF5b3V0RGlzcGxheX1cbiAqICogQnV0dG9uTGF5b3V0RGlzcGxheToge0BsaW5rIEJ1dHRvbkxheW91dERpc3BsYXl9XG4gKiAqIEJ1dHRvbk1ha2VyOiB7QGxpbmsgQnV0dG9uTWFrZXJ9XG4gKiBAY2F0ZWdvcnkgSW1wb3J0cyBmb3IgYW5ndWxhciBhcHAubW9kdWxlXG4gKi9cbmV4cG9ydCB7IERpYWxvZ0NvbmZpZ01vZHVsZSB9IGZyb20gXCIuL25neC1hd2Vzb21lLXBvcHVwL25neC1hd2Vzb21lLXBvcHVwLm1vZHVsZVwiO1xuLyoqXG4gKiBUaGlzIGlzIHRoZSBtb2R1bGUgdGhhdCBpZ25pdGVzIENvbmZpcm0gYm94IGRpYWxvZywgaXRzIHB1cnBvc2UgaXMgdG8gc2hvdyBwb3B1cCBpbiBhXG4gKiBzbWFsbCBkaWFsb2cgd2luZG93IGluIHRoZSBtaWRkbGUgb2YgdGhlIHNjcmVlbi4gVXNlciBjYW4gcHJvdmlkZSB0aXRsZSwgbWVzc2FnZSBhbmQgaW5jbHVkZSBidXR0b25zLlxuICogQ29uZmlybSBib3ggaXMgYXZhaWxhYmxlIGluIHByZWRlZmluZWQgbGF5b3V0IHR5cGVzIChlbnVtcyk6IHtAbGluayBEaWFsb2dMYXlvdXREaXNwbGF5fS5cbiAqXG4gKiBJdCBpcyBjcnVjaWFsIGZvciB1c2VyIHRvIGFkZCB0aGlzIG1vZHVsZSBpbiBhbmd1bGFyLmFwcCBpbXBvcnRzLlxuICogQmVsb3cgaXMgdGhlIGV4YW1wbGUgd2l0aCAob3B0aW9uYWwpIGRlZmF1bHQgdXNlciBjb25maWd1cmF0aW9uLCB0aGF0J3Mgd2hhdCB3aWxsIGJlIHVzZWQgaWYgdGhlcmUgaXMgbm9cbiAqIGxvY2FsIGNvbmZpZyB3aGVuIHBvcHVwIGlzIGV2b2tlZCwgdGhhdCBtZWFucyBpdCBjYW4gYmUgb3ZlcnJpZGRlbiBkaXJlY3RseSB3aGVuIHBvcHVwIGlzIGV2b2tlZC5cbiAqIEZvciBpbXBsZW1lbnRhdGlvbiBsb29rOiB7QGxpbmsgSUNvbmZpcm1Cb3hVc2VyQ29uZmlnfS5cbiAqXG4gKiBFeGFtcGxlOlxuICogYGBgdHlwZXNjcmlwdFxuICogLy8gYXBwLm1vZHVsZSBpbXBvcnRzOlxuICpDb25maXJtQm94Q29uZmlnTW9kdWxlLmZvclJvb3Qoe1xuICogICAgQ29uZmlybUJveENvcmVDb25maWc6IHtcbiAqICAgICAgIFdpZHRoOiAnNzAwcHgnLFxuICogICAgICAgTGF5b3V0VHlwZTogRGlhbG9nTGF5b3V0RGlzcGxheS5EQU5HRVIsXG4gKiAgICAgICBCdXR0b25Qb3NpdGlvbjogJ2NlbnRlcidcbiAqICAgIH0sXG4gKiAgICBEaXNwYXRjaDogeyAgLy8gT3B0aW9uYWwgZGVmYXVsdCBkaXNwYXRjaCBvYmplY3QuXG4gKiAgICAgICBUaXRsZTogJ0RlZmF1bHQgdGl0bGUnLFxuICogICAgICAgTWVzc2FnZTogJ0RlZmF1bHQgbWVzc2FnZSdcbiAqICAgIH0sXG4gKiAgICBCdXR0b25zICAgICA6IFtcbiAqICAgICAgIG5ldyBCdXR0b25NYWtlcignT2snLCAnb2snLCBCdXR0b25MYXlvdXREaXNwbGF5LlBSSU1BUlkpLFxuICogICAgICAgbmV3IEJ1dHRvbk1ha2VyKCdDYW5jZWwnLCAnY2FuY2VsJywgQnV0dG9uTGF5b3V0RGlzcGxheS5TRUNPTkRBUlkpXG4gKiAgICBdXG4gKiB9KVxuICogYGBgXG4gKiAqIENvbmZpcm1Cb3hDb3JlQ29uZmlnOiB7QGxpbmsgSUNvbmZpcm1Cb3hDb3JlQ29uZmlnfVxuICogKiBEaXNwYXRjaDoge0BsaW5rIElEaXNwYXRjaH1cbiAqICogQnV0dG9uczoge0BsaW5rIElCdXR0b259XG4gKiAqIEJ1dHRvbk1ha2VyOiB7QGxpbmsgQnV0dG9uTWFrZXJ9XG4gKiBAY2F0ZWdvcnkgSW1wb3J0cyBmb3IgYW5ndWxhciBhcHAubW9kdWxlXG4gKi9cbmV4cG9ydCB7IENvbmZpcm1Cb3hDb25maWdNb2R1bGUgfSBmcm9tIFwiLi9uZ3gtYXdlc29tZS1wb3B1cC9uZ3gtYXdlc29tZS1wb3B1cC5tb2R1bGVcIjtcbi8qKlxuICogVGhpcyBpcyB0aGUgbW9kdWxlIHRoYXQgaWduaXRlcyBUb2FzdCBub3RpZmljYXRpb25zIGRpYWxvZywgaXRzIHB1cnBvc2UgaXMgdG8gc2hvdyB0b2FzdCBwb3B1cCBpbiBhXG4gKiBzbWFsbCBkaWFsb2cgd2luZG93IGluIHRoZSBjb3JuZXIgb2YgdGhlIHNjcmVlbi4gVXNlciBjYW4gcHJvdmlkZSB0aXRsZSBhbmQgbWVzc2FnZSBhbmQgaW5jbHVkZSBidXR0b25zLCBvciBzZXR1cCBhdXRvIGRpc2FwcGVhcmluZy5cbiAqIFRvYXN0IG5vdGlmaWNhdGlvbnMgYXJlIGF2YWlsYWJsZSBpbiBwcmVkZWZpbmVkIGxheW91dCB0eXBlcyAoZW51bXMpOiB7QGxpbmsgRGlhbG9nTGF5b3V0RGlzcGxheX0uXG4gKlxuICogSXQgaXMgY3J1Y2lhbCBmb3IgdXNlciB0byBhZGQgdGhpcyBtb2R1bGUgaW4gYW5ndWxhci5hcHAgaW1wb3J0cy5cbiAqIEJlbG93IGlzIHRoZSBleGFtcGxlIHdpdGggKG9wdGlvbmFsKSBkZWZhdWx0IHVzZXIgY29uZmlndXJhdGlvbiwgdGhhdCdzIHdoYXQgd2lsbCBiZSB1c2VkIGlmIHRoZXJlIGlzIG5vXG4gKiBsb2NhbCBjb25maWcgd2hlbiBwb3B1cCBpcyBldm9rZWQsIHRoYXQgbWVhbnMgaXQgY2FuIGJlIG92ZXJyaWRkZW4gZGlyZWN0bHkgd2hlbiBwb3B1cCBpcyBldm9rZWQuXG4gKiBGb3IgaW1wbGVtZW50YXRpb24gbG9vazoge0BsaW5rIElUb2FzdE5vdGlmaWNhdGlvblVzZXJDb25maWd9LlxuICpcbiAqIEV4YW1wbGU6XG4gKiBgYGB0eXBlc2NyaXB0XG4gKiAvLyBhcHAubW9kdWxlIGltcG9ydHM6XG4gKlRvYXN0Tm90aWZpY2F0aW9uQ29uZmlnTW9kdWxlLmZvclJvb3Qoe1xuICogICAgVG9hc3RDb3JlQ29uZmlnOiB7XG4gKiAgICAgICAvLyBNaWxsaXNlY29uZHMgaXQgd2lsbCBiZSBpZ25vcmVkIGlmIGJ1dHRvbnMgYXJlIGluY2x1ZGVkLlxuICogICAgICAgQXV0b0Nsb3NlRGVsYXk6IDMwMDBcbiAqICAgIH0sXG4gKiAgICBHbG9iYWxTZXR0aW5nczoge1xuICogICAgICAgLy8gVGhlIG51bWJlciBvZiB0b2FzdCBub3RpZmljYXRpb25zIHRoYXQgY2FuIGJlIHNob3duIGF0IG9uY2UuXG4gKiAgICAgICBBbGxvd2VkTm90aWZpY2F0aW9uc0F0T25jZTogNFxuICogICAgfSxcbiAqICAgIC8vIE9wdGlvbmFsIGRlZmF1bHQgZGlzcGF0Y2ggb2JqZWN0LlxuICogICAgRGlzcGF0Y2g6IHtcbiAqICAgICAgVGl0bGU6ICdEZWZhdWx0IHRpdGxlJyxcbiAqICAgICAgTWVzc2FnZTogJ0RlZmF1bHQgbWVzc2FnZSdcbiAqICAgfSxcbiAqICAgQnV0dG9uczogW1xuICogICAgICBuZXcgQnV0dG9uTWFrZXIoJ09rJywgJ29rJywgQnV0dG9uTGF5b3V0RGlzcGxheS5QUklNQVJZKSxcbiAqICAgICAgbmV3IEJ1dHRvbk1ha2VyKCdDYW5jZWwnLCAnY2FuY2VsJywgQnV0dG9uTGF5b3V0RGlzcGxheS5TRUNPTkRBUlkpXG4gKiAgIF1cbiAqfSlcbiAqIGBgYFxuICogKiBUb2FzdENvcmVDb25maWc6IHtAbGluayBJVG9hc3RDb3JlQ29uZmlnfVxuICogKiBHbG9iYWxTZXR0aW5nczoge0BsaW5rIElHbG9iYWxUb2FzdFNldHRpbmdzfVxuICogKiBEaXNwYXRjaDoge0BsaW5rIElEaXNwYXRjaH1cbiAqICogQnV0dG9uczoge0BsaW5rIElCdXR0b259XG4gKiAqIEJ1dHRvbk1ha2VyOiB7QGxpbmsgQnV0dG9uTWFrZXJ9XG4gKiBAY2F0ZWdvcnkgSW1wb3J0cyBmb3IgYW5ndWxhciBhcHAubW9kdWxlXG4gKi9cbmV4cG9ydCB7IFRvYXN0Tm90aWZpY2F0aW9uQ29uZmlnTW9kdWxlIH0gZnJvbSBcIi4vbmd4LWF3ZXNvbWUtcG9wdXAvbmd4LWF3ZXNvbWUtcG9wdXAubW9kdWxlXCI7XG4vLyBlbmRyZWdpb25cbiJdfQ==