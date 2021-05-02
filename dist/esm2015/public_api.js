import { GlobalClass } from './ngx-awesome-popup/core/global';
import { ConfirmBoxClass } from './ngx-awesome-popup/types/confirm-box/core/model';
import { ToastNotificationClass } from './ngx-awesome-popup/types/toast-notification/core/model';
import { DialogClass } from './ngx-awesome-popup/types/dialog/core/model';
var ButtonMaker = GlobalClass.ButtonMaker;
var ResetGlobalConfig = GlobalClass.ResetGlobalConfig;
var ConfirmBoxInitializer = ConfirmBoxClass.ConfirmBoxInitializer;
var ToastNotificationInitializer = ToastNotificationClass.ToastNotificationInitializer;
var ResetToastGlobalSettings = ToastNotificationClass.ResetToastGlobalSettings;
var DialogInitializer = DialogClass.DialogInitializer;
var DialogBelonging = DialogClass.DialogBelonging;
// endregion
export { ButtonLayoutDisplay } from './ngx-awesome-popup/core/enums';
export { DialogLayoutDisplay } from './ngx-awesome-popup/core/enums';
export { ToastPositionEnum } from './ngx-awesome-popup/types/toast-notification/core/model';
export { ToastProgressBarEnum } from './ngx-awesome-popup/types/toast-notification/core/model';
export { ToastUserViewTypeEnum } from './ngx-awesome-popup/types/toast-notification/core/model';
/**
 * @returns It will return custom button object ready to be used in child component layout.
 */
export { ButtonMaker };
/**
 *```typescript
 * // Instantiate config object as example below to change global settings on-fly it takes {@link IGlobalUserConfig}
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
 * // Instantiate toast global config object as example below to change global settings on-fly it takes {@link IGlobalToastSettings}
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
export { NgxAwesomePopupModule } from './ngx-awesome-popup/ngx-awesome-popup.module';
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
export { DialogConfigModule } from './ngx-awesome-popup/ngx-awesome-popup.module';
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
export { ConfirmBoxConfigModule } from './ngx-awesome-popup/ngx-awesome-popup.module';
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
 *       Width: '300px',
 *    },
 *    GlobalSettings: {
 *       // The number of toast notifications that can be shown at once.
 *       AllowedNotificationsAtOnce: 4,
 *
 *        // Milliseconds it will be ignored if buttons are included.
 *       AutoCloseDelay: 3000
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
export { ToastNotificationConfigModule } from './ngx-awesome-popup/ngx-awesome-popup.module';
// endregion
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljX2FwaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3B1YmxpY19hcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFdBQVcsRUFBa0IsTUFBTSxpQ0FBaUMsQ0FBQztBQUM3RSxPQUFPLEVBQUMsZUFBZSxFQUFzQixNQUFNLGtEQUFrRCxDQUFDO0FBQ3RHLE9BQU8sRUFBQyxzQkFBc0IsRUFBdUUsTUFBTSx5REFBeUQsQ0FBQztBQUNySyxPQUFPLEVBQUMsV0FBVyxFQUFrQixNQUFNLDZDQUE2QyxDQUFDO0FBTXpGLElBQU8sV0FBVyxHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUM7QUFDN0MsSUFBTyxpQkFBaUIsR0FBRyxXQUFXLENBQUMsaUJBQWlCLENBQUM7QUFLekQsSUFBTyxxQkFBcUIsR0FBRyxlQUFlLENBQUMscUJBQXFCLENBQUM7QUFHckUsSUFBTyw0QkFBNEIsR0FBRyxzQkFBc0IsQ0FBQyw0QkFBNEIsQ0FBQztBQUkxRixJQUFPLHdCQUF3QixHQUFHLHNCQUFzQixDQUFDLHdCQUF3QixDQUFDO0FBTWxGLElBQU8saUJBQWlCLEdBQUcsV0FBVyxDQUFDLGlCQUFpQixDQUFDO0FBQ3pELElBQU8sZUFBZSxHQUFHLFdBQVcsQ0FBQyxlQUFlLENBQUM7QUFxQnJELFlBQVk7QUFFWixPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNuRSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUVuRSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSx5REFBeUQsQ0FBQztBQUMxRixPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSx5REFBeUQsQ0FBQztBQUM3RixPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx5REFBeUQsQ0FBQztBQUc5Rjs7R0FFRztBQUNILE9BQU8sRUFBQyxXQUFXLEVBQUMsQ0FBQztBQUVyQjs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFDSCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsQ0FBQztBQUUzQjs7Ozs7Ozs7R0FRRztBQUNILE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxDQUFDO0FBR2xDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtREc7QUFDSCxPQUFPLEVBQUMsZUFBZSxFQUFDLENBQUM7QUFxQnpCLFlBQVk7QUFFWiw2QkFBNkI7QUFFN0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQ0c7QUFDSCxPQUFPLEVBQUMsNEJBQTRCLEVBQUMsQ0FBQztBQUN0Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQ0c7QUFDSCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsQ0FBQztBQUMvQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThDRztBQUNILE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxDQUFDO0FBQzNCLFlBQVk7QUFFWixnREFBZ0Q7QUFDaEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBQ0gsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sOENBQThDLENBQUM7QUFDbkY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThCRztBQUNILE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLDhDQUE4QyxDQUFDO0FBQ2hGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0NHO0FBQ0gsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sOENBQThDLENBQUM7QUFDcEY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUNHO0FBQ0gsT0FBTyxFQUFDLDZCQUE2QixFQUFDLE1BQU0sOENBQThDLENBQUM7QUFDM0YsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7R2xvYmFsQ2xhc3MsIEdsb2JhbEludGVyZmFjZX0gZnJvbSAnLi9uZ3gtYXdlc29tZS1wb3B1cC9jb3JlL2dsb2JhbCc7XG5pbXBvcnQge0NvbmZpcm1Cb3hDbGFzcywgQ29uZmlybUJveEludGVyZmFjZX0gZnJvbSAnLi9uZ3gtYXdlc29tZS1wb3B1cC90eXBlcy9jb25maXJtLWJveC9jb3JlL21vZGVsJztcbmltcG9ydCB7VG9hc3ROb3RpZmljYXRpb25DbGFzcywgVG9hc3ROb3RpZmljYXRpb25JbnRlcmZhY2UsIFRvYXN0UG9zaXRpb25FbnVtLCBUb2FzdFVzZXJWaWV3VHlwZUVudW19IGZyb20gJy4vbmd4LWF3ZXNvbWUtcG9wdXAvdHlwZXMvdG9hc3Qtbm90aWZpY2F0aW9uL2NvcmUvbW9kZWwnO1xuaW1wb3J0IHtEaWFsb2dDbGFzcywgRGlhbG9nSW50ZXJmYWNlfSBmcm9tICcuL25neC1hd2Vzb21lLXBvcHVwL3R5cGVzL2RpYWxvZy9jb3JlL21vZGVsJztcblxuaW1wb3J0IElCdXR0b24gPSBHbG9iYWxJbnRlcmZhY2UuSUJ1dHRvbjtcbmltcG9ydCBJRGlzcGF0Y2ggPSBHbG9iYWxJbnRlcmZhY2UuSURpc3BhdGNoO1xuaW1wb3J0IElHbG9iYWxVc2VyQ29uZmlnID0gR2xvYmFsSW50ZXJmYWNlLklHbG9iYWxVc2VyQ29uZmlnO1xuaW1wb3J0IElDb2xvclR5cGVzID0gR2xvYmFsSW50ZXJmYWNlLklDb2xvclR5cGVzO1xuaW1wb3J0IEJ1dHRvbk1ha2VyID0gR2xvYmFsQ2xhc3MuQnV0dG9uTWFrZXI7XG5pbXBvcnQgUmVzZXRHbG9iYWxDb25maWcgPSBHbG9iYWxDbGFzcy5SZXNldEdsb2JhbENvbmZpZztcblxuaW1wb3J0IElDb25maXJtQm94UHVibGljUmVzcG9uc2UgPSBDb25maXJtQm94SW50ZXJmYWNlLklDb25maXJtQm94UHVibGljUmVzcG9uc2U7XG5pbXBvcnQgSUNvbmZpcm1Cb3hVc2VyQ29uZmlnID0gQ29uZmlybUJveEludGVyZmFjZS5JQ29uZmlybUJveFVzZXJDb25maWc7XG5pbXBvcnQgSUNvbmZpcm1Cb3hDb3JlQ29uZmlnID0gQ29uZmlybUJveEludGVyZmFjZS5JQ29uZmlybUJveENvcmVDb25maWc7XG5pbXBvcnQgQ29uZmlybUJveEluaXRpYWxpemVyID0gQ29uZmlybUJveENsYXNzLkNvbmZpcm1Cb3hJbml0aWFsaXplcjtcblxuaW1wb3J0IElUb2FzdE5vdGlmaWNhdGlvblB1YmxpY1Jlc3BvbnNlID0gVG9hc3ROb3RpZmljYXRpb25JbnRlcmZhY2UuSVRvYXN0Tm90aWZpY2F0aW9uUHVibGljUmVzcG9uc2U7XG5pbXBvcnQgVG9hc3ROb3RpZmljYXRpb25Jbml0aWFsaXplciA9IFRvYXN0Tm90aWZpY2F0aW9uQ2xhc3MuVG9hc3ROb3RpZmljYXRpb25Jbml0aWFsaXplcjtcbmltcG9ydCBJVG9hc3RDb3JlQ29uZmlnID0gVG9hc3ROb3RpZmljYXRpb25JbnRlcmZhY2UuSVRvYXN0Q29yZUNvbmZpZztcbmltcG9ydCBJR2xvYmFsVG9hc3RTZXR0aW5ncyA9IFRvYXN0Tm90aWZpY2F0aW9uSW50ZXJmYWNlLklHbG9iYWxUb2FzdFNldHRpbmdzO1xuaW1wb3J0IElUb2FzdE5vdGlmaWNhdGlvblVzZXJDb25maWcgPSBUb2FzdE5vdGlmaWNhdGlvbkludGVyZmFjZS5JVG9hc3ROb3RpZmljYXRpb25Vc2VyQ29uZmlnO1xuaW1wb3J0IFJlc2V0VG9hc3RHbG9iYWxTZXR0aW5ncyA9IFRvYXN0Tm90aWZpY2F0aW9uQ2xhc3MuUmVzZXRUb2FzdEdsb2JhbFNldHRpbmdzO1xuXG5pbXBvcnQgSURpYWxvZ0V2ZW50c0NvbnRyb2xsZXIgPSBEaWFsb2dJbnRlcmZhY2UuSURpYWxvZ0V2ZW50c0NvbnRyb2xsZXI7XG5pbXBvcnQgSURpYWxvZ1B1YmxpY1Jlc3BvbnNlID0gRGlhbG9nSW50ZXJmYWNlLklEaWFsb2dQdWJsaWNSZXNwb25zZTtcbmltcG9ydCBJRGlhbG9nVXNlckNvbmZpZyA9IERpYWxvZ0ludGVyZmFjZS5JRGlhbG9nVXNlckNvbmZpZztcbmltcG9ydCBJRGlhbG9nQ29yZUNvbmZpZyA9IERpYWxvZ0ludGVyZmFjZS5JRGlhbG9nQ29yZUNvbmZpZztcbmltcG9ydCBEaWFsb2dJbml0aWFsaXplciA9IERpYWxvZ0NsYXNzLkRpYWxvZ0luaXRpYWxpemVyO1xuaW1wb3J0IERpYWxvZ0JlbG9uZ2luZyA9IERpYWxvZ0NsYXNzLkRpYWxvZ0JlbG9uZ2luZztcblxuLy8gcmVnaW9uICoqKiBJbnRlcmZhY2UgKioqXG5leHBvcnQge0lHbG9iYWxVc2VyQ29uZmlnfTtcbmV4cG9ydCB7SUJ1dHRvbn07XG5leHBvcnQge0lEaXNwYXRjaH07XG5leHBvcnQge0lDb2xvclR5cGVzfTtcblxuZXhwb3J0IHtJQ29uZmlybUJveFVzZXJDb25maWd9O1xuZXhwb3J0IHtJQ29uZmlybUJveENvcmVDb25maWd9O1xuZXhwb3J0IHtJQ29uZmlybUJveFB1YmxpY1Jlc3BvbnNlfTtcblxuZXhwb3J0IHtJR2xvYmFsVG9hc3RTZXR0aW5nc307XG5leHBvcnQge0lUb2FzdENvcmVDb25maWd9O1xuZXhwb3J0IHtJVG9hc3ROb3RpZmljYXRpb25Vc2VyQ29uZmlnfTtcbmV4cG9ydCB7SVRvYXN0Tm90aWZpY2F0aW9uUHVibGljUmVzcG9uc2V9O1xuXG5leHBvcnQge0lEaWFsb2dVc2VyQ29uZmlnfTtcbmV4cG9ydCB7SURpYWxvZ0NvcmVDb25maWd9O1xuZXhwb3J0IHtJRGlhbG9nUHVibGljUmVzcG9uc2V9O1xuZXhwb3J0IHtJRGlhbG9nRXZlbnRzQ29udHJvbGxlcn07XG4vLyBlbmRyZWdpb25cblxuZXhwb3J0IHtCdXR0b25MYXlvdXREaXNwbGF5fSBmcm9tICcuL25neC1hd2Vzb21lLXBvcHVwL2NvcmUvZW51bXMnO1xuZXhwb3J0IHtEaWFsb2dMYXlvdXREaXNwbGF5fSBmcm9tICcuL25neC1hd2Vzb21lLXBvcHVwL2NvcmUvZW51bXMnO1xuZXhwb3J0IHtWZXJ0aWNhbFBvc2l0aW9ufSBmcm9tICcuL25neC1hd2Vzb21lLXBvcHVwL2NvcmUvZW51bXMnO1xuZXhwb3J0IHtUb2FzdFBvc2l0aW9uRW51bX0gZnJvbSAnLi9uZ3gtYXdlc29tZS1wb3B1cC90eXBlcy90b2FzdC1ub3RpZmljYXRpb24vY29yZS9tb2RlbCc7XG5leHBvcnQge1RvYXN0UHJvZ3Jlc3NCYXJFbnVtfSBmcm9tICcuL25neC1hd2Vzb21lLXBvcHVwL3R5cGVzL3RvYXN0LW5vdGlmaWNhdGlvbi9jb3JlL21vZGVsJztcbmV4cG9ydCB7VG9hc3RVc2VyVmlld1R5cGVFbnVtfSBmcm9tICcuL25neC1hd2Vzb21lLXBvcHVwL3R5cGVzL3RvYXN0LW5vdGlmaWNhdGlvbi9jb3JlL21vZGVsJztcblxuXG4vKipcbiAqIEByZXR1cm5zIEl0IHdpbGwgcmV0dXJuIGN1c3RvbSBidXR0b24gb2JqZWN0IHJlYWR5IHRvIGJlIHVzZWQgaW4gY2hpbGQgY29tcG9uZW50IGxheW91dC5cbiAqL1xuZXhwb3J0IHtCdXR0b25NYWtlcn07XG5cbi8qKlxuICpgYGB0eXBlc2NyaXB0XG4gKiAvLyBJbnN0YW50aWF0ZSBjb25maWcgb2JqZWN0IGFzIGV4YW1wbGUgYmVsb3cgdG8gY2hhbmdlIGdsb2JhbCBzZXR0aW5ncyBvbi1mbHkgaXQgdGFrZXMge0BsaW5rIElHbG9iYWxVc2VyQ29uZmlnfVxuICogYXMgdGhlIGFyZ3VtZW50LlxuICogbmV3IFJlc2V0R2xvYmFsQ29uZmlnKHtcbiAqICAgICBDb2xvckxpc3Q6IHtcbiAqICAgICAgICAgICAgUHJpbWFyeSAgOiAnI2ZmOWUwMCcsIC8vIG9wdGlvbmFsXG4gKiAgICAgICAgICAgIFNlY29uZGFyeTogJyM5ODllYTUnLCAvLyBvcHRpb25hbFxuICogICAgICAgICAgICBJbmZvICAgICA6ICcjMmY4ZWU1JywgLy8gb3B0aW9uYWxcbiAqICAgICAgICAgICAgU3VjY2VzcyAgOiAnIzNjYWVhMycsIC8vIG9wdGlvbmFsXG4gKiAgICAgICAgICAgIFdhcm5pbmcgIDogJyNmZmMxMDcnLCAvLyBvcHRpb25hbFxuICogICAgICAgICAgICBEYW5nZXIgICA6ICcjZTQ2NDY0JywgLy8gb3B0aW9uYWxcbiAqICAgICAgICAgICAgTGlnaHQgICAgOiAnI2ZiZmJmYicsIC8vIG9wdGlvbmFsXG4gKiAgICAgICAgICAgIERhcmsgICAgIDogJyMzNDNhNDAnICAvLyBvcHRpb25hbFxuICogICAgICAgICAgIH1cbiAqIH0pXG4gKiBgYGBcbiAqL1xuZXhwb3J0IHtSZXNldEdsb2JhbENvbmZpZ307XG5cbi8qKlxuICpgYGB0eXBlc2NyaXB0XG4gKiAvLyBJbnN0YW50aWF0ZSB0b2FzdCBnbG9iYWwgY29uZmlnIG9iamVjdCBhcyBleGFtcGxlIGJlbG93IHRvIGNoYW5nZSBnbG9iYWwgc2V0dGluZ3Mgb24tZmx5IGl0IHRha2VzIHtAbGluayBJR2xvYmFsVG9hc3RTZXR0aW5nc31cbiAqIGFzIHRoZSBhcmd1bWVudC5cbiAqIG5ldyBSZXNldFRvYXN0R2xvYmFsU2V0dGluZ3Moe1xuICogICAgIEFsbG93ZWROb3RpZmljYXRpb25zQXRPbmNlOiAyXG4gKiB9KVxuICogYGBgXG4gKi9cbmV4cG9ydCB7UmVzZXRUb2FzdEdsb2JhbFNldHRpbmdzfTtcblxuXG4vKipcbiAqIFRoaXMgaXMgdGhlIGNsYXNzIHRoYXQgbmVlZHMgdG8gYmUgYWRkZWQgYXMgREkgaW4gdGhlIGNvbnN0cnVjdG9yIG9mIGEgY2hpbGQgY29tcG9uZW50IHRoYXQgd2lsbCBiZVxuICogb3BlbmVkIGR5bmFtaWNhbGx5IHdpdGgge0BsaW5rIERpYWxvZ0luaXRpYWxpemVyfS4gSXQgY29udGFpbnMgdmFyaW91cyBpbmZvcm1hdGlvbiBvclxuICogZXZlbnQgY29udHJvbGxlcnMsIGFuZCBsaXN0ZW5lcnMgdGhhdCBjYW4gYmUgdXNlZCBpbiBhIGNoaWxkIGNvbXBvbmVudC4gQWxzbywgdGhlcmUgaXMgY3VzdG9tIGRhdGFcbiAqIHRoYXQgaXMgc2VudCBmcm9tIGNvbXBvbmVudCB3aGVyZSB0aGUge0BsaW5rIERpYWxvZ0luaXRpYWxpemVyfSBpcy4gVXNlciBjYW4gc2V0IHNwZWNpZmljIHR5cGUgb2ZcbiAqIGN1c3RvbSBkYXRhIHRoYXQgY2hpbGQgY29tcG9uZW50IHdpbGwgcmVjZWl2ZSBieSBpbmNsdWRpbmcgaXQgYXMgZ2VuZXJpYyB0eXBlLlxuICpcbiAqXG4gKiBFeGFtcGxlOlxuICogYGBgdHlwZXNjcmlwdFxuICppbXBvcnQge0RpYWxvZ0JlbG9uZ2luZ30gZnJvbSAnbmd4LWF3ZXNvbWUtcG9wdXAnO1xuICpAQ29tcG9uZW50KHtcbiAqICAgIHNlbGVjdG9yICAgOiAnYXBwLWN1cCcsXG4gKiAgICB0ZW1wbGF0ZVVybDogJy4vY3VwLmNvbXBvbmVudC5odG1sJyxcbiAqICAgIHN0eWxlVXJscyAgOiBbJy4vY3VwLmNvbXBvbmVudC5zY3NzJ11cbiAqfSlcbiAqIGV4cG9ydCBjbGFzcyBDdXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gKlxuICogICAgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcbiAqXG4gKiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRpYWxvZ0JlbG9uZ2luZzogRGlhbG9nQmVsb25naW5nKSB7XG4gKiAgICB9XG4gKlxuICogICAgbmdPbkluaXQoKTogdm9pZCB7XG4gKiAgICBjb25zb2xlLmxvZyh0aGlzLmRpYWxvZ0JlbG9uZ2luZyk7XG4gKlxuICogICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICogICAgICAgICAgICB0aGlzLmRpYWxvZ0JlbG9uZ2luZy5FdmVudHNDb250cm9sbGVyLm9uQnV0dG9uQ2xpY2skLnN1YnNjcmliZSgoX0J1dHRvbikgPT4ge1xuICogICAgICAgICAgICBpZiAoX0J1dHRvbi5JRCA9PT0gJ29rJykge1xuICogICAgICAgICAgICAgICAgLy8gRG8gc29tZSBsb2dpYyBhbmQgY2xvc2UgcG9wdXAuXG4gKiAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ0JlbG9uZ2luZy5FdmVudHNDb250cm9sbGVyLmNsb3NlKCk7XG4gKiAgICAgICAgICAgIH0gZWxzZSBpZiAoX0J1dHRvbi5JRCA9PT0gJ2NhbmNlbCcpIHtcbiAqICAgICAgICAgICAgICAgIC8vIERvIHNvbWUgbG9naWMgYW5kIGNsb3NlIHBvcHVwLlxuICogICAgICAgICAgICAgICAgdGhpcy5kaWFsb2dCZWxvbmdpbmcuRXZlbnRzQ29udHJvbGxlci5jbG9zZSgpO1xuICogICAgICAgICAgICB9XG4gKiAgICAgICAgfSlcbiAqICAgICAgICApO1xuICpcbiAqICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAqICAgICAgICAgICAgLy8gQ2xvc2UgbG9hZGVyIGFmdGVyIGFzeW5jIGRhdGEgaXMgcmVhZHkuXG4gKiAgICAgICAgICAgIHRoaXMuZGlhbG9nQmVsb25naW5nLkV2ZW50c0NvbnRyb2xsZXIuY2xvc2VMb2FkZXIoKTtcbiAqICAgICAgICB9LCAxMDAwKTtcbiAqICAgIH1cbiAqfVxuXG4gbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIC8vIENsb3NlIGFsbCBzdWJzY3JpcHRpb25zLlxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzdWIgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICAgIH1cbiAqIGBgYFxuICogQGNhdGVnb3J5IGNoaWxkIGR5bmFtaWMgY29tcG9uZW50IGRhdGEgJiBldmVudCBjb250cm9sbGVyXG4gKi9cbmV4cG9ydCB7RGlhbG9nQmVsb25naW5nfTtcblxuLy8gcmVnaW9uICoqKiBPYnNlcnZhYmxlIHJlc3BvbnNlIGFmdGVyIGNsb3NpbmcgcG9wdXAgKioqXG4vKipcbiAqIFJlZ3VsYXIgZGVzY3JpcHRpb25cbiAqXG4gKiBAY2F0ZWdvcnkgT2JzZXJ2YWJsZSByZXNwb25zZSBhZnRlciBjbG9zaW5nIHBvcHVwXG4gKi9cbmV4cG9ydCB7SVRvYXN0Tm90aWZpY2F0aW9uUHVibGljUmVzcG9uc2UgYXMgSVRvYXN0Tm90aWZpY2F0aW9uUmVzcG9uc2V9O1xuLyoqXG4gKiBSZWd1bGFyIGRlc2NyaXB0aW9uXG4gKlxuICogQGNhdGVnb3J5IE9ic2VydmFibGUgcmVzcG9uc2UgYWZ0ZXIgY2xvc2luZyBwb3B1cFxuICovXG5leHBvcnQge0lDb25maXJtQm94UHVibGljUmVzcG9uc2UgYXMgSUNvbmZpcm1Cb3hSZXNwb25zZX07XG4vKipcbiAqIFJlZ3VsYXIgZGVzY3JpcHRpb25cbiAqXG4gKiBAY2F0ZWdvcnkgT2JzZXJ2YWJsZSByZXNwb25zZSBhZnRlciBjbG9zaW5nIHBvcHVwXG4gKi9cbmV4cG9ydCB7SURpYWxvZ1B1YmxpY1Jlc3BvbnNlIGFzIElEaWFsb2dSZXNwb25zZX07XG4vLyBlbmRyZWdpb25cblxuLy8gcmVnaW9uICoqKiBQb3B1cCBvcGVuICAqKipcblxuLyoqXG4gKiBUaGlzIGlzIHRoZSBjbGFzcyB0aGF0IG5lZWRzIHRvIGJlIGluc3RhbnRpYXRlZCB0byBzZXQgdXAgYW5kIGlnbml0ZSBhIFRvYXN0Tm90aWZpY2F0aW9uLFxuICogaXRzIHB1cnBvc2UgaXMgdG8gc2hvdyBzaG9ydCBub3RpZmljYXRpb24gdG8gZW5kLXVzZXIsIG9yIGV2ZW4gaW50ZXJhY3Qgd2l0aCB1c2VyLlxuICogSXQgY2FuIGJlIGV2b2tlZCBmcm9tIGFueSBhbmd1bGFyIHR5cGVzY3JpcHQgZmlsZS5cbiAqXG4gKiBCZWxvdyBpcyB0aGUgZXhhbXBsZSB3aXRoIChzb21lIG9wdGlvbmFsKSB1c2VyIGNvbmZpZ3VyYXRpb24sXG4gKiBpdCB3aWxsIG92ZXJyaWRlIGRlZmF1bHQgY29uZmlndXJhdGlvbiBmcm9tIGFwcC5tb2R1bGUuXG4gKlxuICpcbiAqIEV4YW1wbGU6XG4gKiBgYGB0eXBlc2NyaXB0XG4gKiAvLyBDcmVhdGUgdGhlIGluaXRpYWxpemVyLlxuICpjb25zdCBuZXdUb2FzdE5vdGlmaWNhdGlvbiA9IG5ldyBUb2FzdE5vdGlmaWNhdGlvbkluaXRpYWxpemVyKCk7XG4gKlxuICogLy8gU2V0IGRlc2lyZWQgVGl0bGUuXG4gKm5ld1RvYXN0Tm90aWZpY2F0aW9uLnNldFRpdGxlKCdXYXJuaW5nIScpO1xuICpcbiAqIC8vIFNldCBkZXNpcmVkIE1lc3NhZ2UuXG4gKm5ld1RvYXN0Tm90aWZpY2F0aW9uLnNldE1lc3NhZ2UoJ0Zvcm0gaXMgbm90IHZhbGlkIScpO1xuICpcbiAqIC8vIFNldCBkZXNpcmVkIGNvbmZpZ3VyYXRpb24uXG4gKm5ld1RvYXN0Tm90aWZpY2F0aW9uLnNldENvbmZpZyh7XG4gKiAgICAgIExheW91dFR5cGU6IERpYWxvZ0xheW91dERpc3BsYXkuV0FSTklOR1xuICogICB9KTtcblxuICogLy8gT3BlbiBhIFRvYXN0Tm90aWZpY2F0aW9uLlxuICogbmV3Q29uZmlybUJveC5vcGVuQ29uZmlybUJveCQoKS5zdWJzY3JpYmUocmVzcCA9PiB7XG4gKiAgIGNvbnNvbGUubG9nKCdjb25maXJtQm94IHJlc3BvbnNlOiAnLCByZXNwKTtcbiAqICB9KTtcbiAqIGBgYFxuICogKiBJVG9hc3RDb3JlQ29uZmlnOiB7QGxpbmsgSVRvYXN0Q29yZUNvbmZpZ31cbiAqICogTGF5b3V0VHlwZToge0BsaW5rIERpYWxvZ0xheW91dERpc3BsYXl9XG4gKiAqIElUb2FzdE5vdGlmaWNhdGlvblB1YmxpY1Jlc3BvbnNlOiB7QGxpbmsgSVRvYXN0Tm90aWZpY2F0aW9uUHVibGljUmVzcG9uc2V9XG4gKiBAY2F0ZWdvcnkgUG9wdXAgb3BlblxuICovXG5leHBvcnQge1RvYXN0Tm90aWZpY2F0aW9uSW5pdGlhbGl6ZXJ9O1xuLyoqXG4gKiBUaGlzIGlzIHRoZSBjbGFzcyB0aGF0IG5lZWRzIHRvIGJlIGluc3RhbnRpYXRlZCB0byBzZXQgdXAgYW5kIGlnbml0ZSBhIENvbmZpcm1Cb3ggYW5kIGNyZWF0ZSBjb250ZW50LlxuICogSXRzIHB1cnBvc2UgaXMgdG8gZ2V0IGNvbmZpcm1hdGlvbiByZXNwb25zZSBmcm9tIGVuZC11c2VyLiBJdCBjYW4gYmUgY2FsbGVkIGZyb20gYW55IGFuZ3VsYXJcbiAqIHR5cGVzY3JpcHQgZmlsZS5cbiAqXG4gKiBCZWxvdyBpcyBleGFtcGxlIHdpdGggKHNvbWUgb3B0aW9uYWwpIHVzZXIgY29uZmlndXJhdGlvbixcbiAqIGl0IHdpbGwgb3ZlcnJpZGUgZGVmYXVsdCBjb25maWd1cmF0aW9uIGZyb20gYXBwLm1vZHVsZS5cbiAqXG4gKlxuICogRXhhbXBsZTpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIC8vIENyZWF0ZSB0aGUgaW5pdGlhbGl6ZXIuXG4gKmNvbnN0IG5ld0NvbmZpcm1Cb3ggPSBuZXcgQ29uZmlybUJveEluaXRpYWxpemVyKCk7XG4gKlxuICogLy8gU2V0IGRlc2lyZWQgZGlzcGF0Y2g6IF9UaXRsZTogc3RyaW5nLCBfTWVzc2FnZTogc3RyaW5nLlxuICpuZXdDb25maXJtQm94LnNldERpc3BhdGNoKCdBcmUgeW91IHN1cmU/JywgJ1RoYXQgYWN0aW9uIHdpbGwgZGVsZXRlIHVzZXIhJyk7XG4gKlxuICogLy8gU2V0IGRlc2lyZWQgY29uZmlndXJhdGlvbi5cbiAqbmV3Q29uZmlybUJveC5zZXRDb25maWcoe1xuICogICAgICBMYXlvdXRUeXBlOiBEaWFsb2dMYXlvdXREaXNwbGF5LkRBTkdFUlxuICogICB9KTtcbiAqXG4gKiAvLyBTZXQgYnV0dG9uIGxhYmVscy5cbiAqIG5ld0NvbmZpcm1Cb3guc2V0QnV0dG9uTGFiZWxzKCdZRVMnLCAnTk8nKTtcbiAqXG4gKiAvLyBPcGVuIGEgQ29uZmlybUJveCwgYW5kIGdldCBjbGlja2VkIGJ1dHRvbi1pZCBpbiByZXNwb25zZS5cbiAqIG5ld0NvbmZpcm1Cb3gub3BlbkNvbmZpcm1Cb3gkKCkuc3Vic2NyaWJlKHJlc3AgPT4ge1xuICogICAvLyBJQ29uZmlybUJveFB1YmxpY1Jlc3BvbnNlXG4gKiAgIGNvbnNvbGUubG9nKCdjb25maXJtQm94IHJlc3BvbnNlOiAnLCByZXNwKTtcbiAqICB9KTtcbiAqIGBgYFxuICogKiBJQ29uZmlybUJveENvcmVDb25maWc6IHtAbGluayBJQ29uZmlybUJveENvcmVDb25maWd9XG4gKiAqIExheW91dFR5cGU6IHtAbGluayBEaWFsb2dMYXlvdXREaXNwbGF5fVxuICogKiBJQ29uZmlybUJveFB1YmxpY1Jlc3BvbnNlOiB7QGxpbmsgSUNvbmZpcm1Cb3hQdWJsaWNSZXNwb25zZX1cbiAqIEBjYXRlZ29yeSBQb3B1cCBvcGVuXG4gKi9cbmV4cG9ydCB7Q29uZmlybUJveEluaXRpYWxpemVyfTtcbi8qKlxuICogVGhpcyBpcyB0aGUgY2xhc3MgdGhhdCBuZWVkcyB0byBiZSBpbnN0YW50aWF0ZWQgdG8gc2V0IHVwIGFuZCBpZ25pdGUgYSBEaWFsb2cgYW5kIGNyZWF0ZSBkeW5hbWljIGNvbXBvbmVudCxcbiAqIGl0cyBwdXJwb3NlIGlzIHRvIHJlbmRlciBhbnkgYW5ndWxhciBjb21wb25lbnQgdmlldyB3aXRoIHNwZWNpZmljIGNvbmZpZ3VyYXRpb24gZnJvbSBhbnkgYW5ndWxhciB0eXBlc2NyaXB0IGZpbGUuXG4gKiBEeW5hbWljIGNvbXBvbmVudCBtZWFucyB0aGF0IHVzZXIgY2FuIGV2b2tlIHRoZSBwb3B1cCBmcm9tIHR5cGVzY3JpcHQgYW5kIGNvbXBvbmVudCB2aWV3XG4gKiBpcyBkeW5hbWljYWxseSBjcmVhdGVkIHdpdGggdGhlIEF3ZXNvbWUgUG9wdXAgZW5naW5lLiBUaGVyZSBpcyBubyBuZWVkIHRvIGNhbGwgYW55IHNlbGVjdG9yIGluIEhUTUwgdG8gY3JlYXRlIGNvbXBvbmVudCB2aWV3LlxuICpcbiAqIERpYWxvZ0luaXRpYWxpemVyIGNhbiBzZW5kIGRhdGEgdG8gY2hpbGQgY29tcG9uZW50IChkeW5hbWljIGNvbXBvbmVudCkgd2hlcmUgZGF0YSB3aWxsIGJlIGFjY2Vzc2libGUgd2l0aCB7QGxpbmsgRGlhbG9nQmVsb25naW5nfS5cbiAqXG4gKiBCZWxvdyBpcyB0aGUgZXhhbXBsZSB3aXRoIChzb21lIG9wdGlvbmFsKSB1c2VyIGNvbmZpZ3VyYXRpb24sXG4gKiBpdCB3aWxsIG92ZXJyaWRlIGRlZmF1bHQgY29uZmlndXJhdGlvbiBmcm9tIGFwcC5tb2R1bGUuXG4gKlxuICpcbiAqIEV4YW1wbGU6XG4gKiBgYGB0eXBlc2NyaXB0XG4gKiAgaW1wb3J0IHtEaWFsb2dJbml0aWFsaXplciwgRGlhbG9nTGF5b3V0RGlzcGxheSwgQnV0dG9uTWFrZXIsIEJ1dHRvbkxheW91dERpc3BsYXl9IGZyb20gJ25neC1hd2Vzb21lLXBvcHVwJzs8XG4gKiAgaW1wb3J0IHtDdXBDb21wb25lbnR9IGZyb20gJy4vY3VwL2N1cC5jb21wb25lbnQnO1xuICpcbiAqICBjb25zdCBuZXdEaWFsb2dQb3B1cCA9IG5ldyBEaWFsb2dJbml0aWFsaXplcihDdXBDb21wb25lbnQpOyAvLyBBbnkgQW5ndWxhciBjb21wb25lbnQuXG4gKlxuICogIC8vIEN1c3RvbSBkYXRhIHdpbGwgYmUgc2VudCB0byBkeW5hbWljIGNvbXBvbmVudCBhdmFpbGFibGUgaW4gZGlhbG9nQmVsb25naW5nIG9iamVjdC5cbiAqICBuZXdEaWFsb2dQb3B1cC5zZXRDdXN0b21EYXRhKHtuYW1lOiAnSm9obicsIHN1cm5hbWU6ICdEb2UnLCBpZDogMX0pO1xuICpcbiAqICAvLyBMb2NhbCBjb25maWcgc2V0dGluZ3MgSURpYWxvZ0NvcmVDb25maWcuXG4gKiAgbmV3RGlhbG9nUG9wdXAuc2V0Q29uZmlnKHtcbiAqICAgICAgSGVpZ2h0OiAnNTAwcHgnLFxuICogICAgICBMYXlvdXRUeXBlOiBEaWFsb2dMYXlvdXREaXNwbGF5LklORk8sXG4gKiAgICAgIExvYWRlckNvbXBvbmVudDogQW55IEFuZ3VsYXIgY29tcG9uZW50IG5hbWVcbiAqICAgICAgIH0pO1xuICpcbiAqICAvLyBDdXN0b20gYnV0dG9ucywgbGlzdGVuZXIgaXMgYXZhaWxhYmxlIGluIGNoaWxkIGNvbXBvbmVudCBpbiBkaWFsb2dCZWxvbmdpbmcgb2JqZWN0LlxuICogIG5ld0RpYWxvZ1BvcHVwLnNldEJ1dHRvbnMoW1xuICogICAgICBuZXcgQnV0dG9uTWFrZXIoJ09rJywgJ29rJywgQnV0dG9uTGF5b3V0RGlzcGxheS5QUklNQVJZKSxcbiAqICAgICAgbmV3IEJ1dHRvbk1ha2VyKCdDYW5jZWwnLCAnY2FuY2VsJywgQnV0dG9uTGF5b3V0RGlzcGxheS5TRUNPTkRBUlkpXG4gKiAgXSk7XG4gKlxuICogIC8vIENvbW1hbmQgdG8gb3BlbiBkaWFsb2csIGl0IHJldHVybnMgb2JzZXJ2YWJsZS5cbiAqICBuZXdEaWFsb2dQb3B1cC5vcGVuRGlhbG9nJDxhbnk+KCkuc3Vic2NyaWJlKHJlc3AgPT4ge1xuICogICAgICAgICAgIGNvbnNvbGUubG9nKCdyZXNwb25zZTogJywgcmVzcC5QYXlsb2FkKTtcbiAqICAgICAgIH0pO1xuICogYGBgXG4gKiAqIElEaWFsb2dDb3JlQ29uZmlnOiB7QGxpbmsgSURpYWxvZ0NvcmVDb25maWd9XG4gKiAqIExheW91dFR5cGU6IHtAbGluayBEaWFsb2dMYXlvdXREaXNwbGF5fVxuICogKiBCdXR0b25MYXlvdXREaXNwbGF5OiB7QGxpbmsgQnV0dG9uTGF5b3V0RGlzcGxheX1cbiAqICogQnV0dG9uTWFrZXI6IHtAbGluayBCdXR0b25NYWtlcn1cbiAqICogSURpYWxvZ1B1YmxpY1Jlc3BvbnNlOiB7QGxpbmsgSURpYWxvZ1B1YmxpY1Jlc3BvbnNlfVxuICogQGNhdGVnb3J5IFBvcHVwIG9wZW5cbiAqL1xuZXhwb3J0IHtEaWFsb2dJbml0aWFsaXplcn07XG4vLyBlbmRyZWdpb25cblxuLy8gcmVnaW9uICoqKiBJbXBvcnRzIGZvciBhbmd1bGFyIGFwcC5tb2R1bGUgKioqXG4vKipcbiAqIFRoaXMgaXMgdGhlIG1haW4gbW9kdWxlIG9mIHRoZSBsaWJyYXJ5LCBpdCBpcyBjcnVjaWFsIHRvIGJlIGFkZGVkIHdpdGhpbiBhbmd1bGFyLmFwcFxuICogaW1wb3J0cyBhcyBhbiBleGFtcGxlIHdpdGggb3B0aW9uYWwgYXJndW1lbnQsIGxvb2s6IHtAbGluayBJR2xvYmFsVXNlckNvbmZpZ31cbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiAvLyBhcHAubW9kdWxlIGltcG9ydHM6XG4gKiBOZ3hBd2Vzb21lUG9wdXBNb2R1bGUuZm9yUm9vdCh7XG4gKiAgICAgQ29sb3JMaXN0OiB7XG4gKiAgICAgICAgICAgIFByaW1hcnkgIDogJyNmZjllMDAnLCAvLyBvcHRpb25hbFxuICogICAgICAgICAgICBTZWNvbmRhcnk6ICcjOTg5ZWE1JywgLy8gb3B0aW9uYWxcbiAqICAgICAgICAgICAgSW5mbyAgICAgOiAnIzJmOGVlNScsIC8vIG9wdGlvbmFsXG4gKiAgICAgICAgICAgIFN1Y2Nlc3MgIDogJyMzY2FlYTMnLCAvLyBvcHRpb25hbFxuICogICAgICAgICAgICBXYXJuaW5nICA6ICcjZmZjMTA3JywgLy8gb3B0aW9uYWxcbiAqICAgICAgICAgICAgRGFuZ2VyICAgOiAnI2U0NjQ2NCcsIC8vIG9wdGlvbmFsXG4gKiAgICAgICAgICAgIExpZ2h0ICAgIDogJyNmYmZiZmInLCAvLyBvcHRpb25hbFxuICogICAgICAgICAgICBEYXJrICAgICA6ICcjMzQzYTQwJyAgLy8gb3B0aW9uYWxcbiAqICAgICAgICAgICB9XG4gKiB9KVxuICogYGBgXG4gKiBAY2F0ZWdvcnkgSW1wb3J0cyBmb3IgYW5ndWxhciBhcHAubW9kdWxlXG4gKi9cbmV4cG9ydCB7Tmd4QXdlc29tZVBvcHVwTW9kdWxlfSBmcm9tICcuL25neC1hd2Vzb21lLXBvcHVwL25neC1hd2Vzb21lLXBvcHVwLm1vZHVsZSc7XG4vKipcbiAqIFRoaXMgaXMgdGhlIG1vZHVsZSB0aGF0IGlnbml0ZXMgZHluYW1pYyBkaWFsb2cgbW9kYWwsIGl0cyBwdXJwb3NlIGlzIHRvIGxvYWQgYW55IGFuZ3VsYXIgY29tcG9uZW50IGluXG4gKiBkaWFsb2cgd2luZG93LiBEeW5hbWljIGNvbXBvbmVudCBtZWFucyB0aGF0IHVzZXIgY2FuIGV2b2tlIGFueSBBbmd1bGFyIGNvbXBvbmVudCBpbiB0aGUgcG9wdXAganVzdCBmcm9tIHR5cGVzY3JpcHQuIENvbXBvbmVudCB2aWV3XG4gKiBpcyBkeW5hbWljYWxseSBjcmVhdGVkIHdpdGggdGhlIGxpYnJhcnkgZW5naW5lIGFuZCB0aGVyZSBpcyBubyBuZWVkIHRvIGNhbGwgYW55IHNlbGVjdG9yIGluIEhUTUwgdG8gY3JlYXRlIGNvbXBvbmVudCB2aWV3LlxuICpcbiAqIEl0IGlzIGNydWNpYWwgZm9yIHVzZXIgdG8gYWRkIHRoaXMgbW9kdWxlIGluIGFuZ3VsYXIuYXBwIGltcG9ydHMuXG4gKiBCZWxvdyBpcyB0aGUgZXhhbXBsZSB3aXRoIChvcHRpb25hbCkgZGVmYXVsdCB1c2VyIGNvbmZpZ3VyYXRpb24sIHRoYXQgaXMgd2hhdCB3aWxsIGJlIGluIHNldHVwIGlmIHRoZXJlIGlzIG5vXG4gKiBsb2NhbCBjb25maWcgd2hlbiBwb3B1cCBpcyBldm9rZWQsIHRoYXQgbWVhbnMgaXQgY2FuIGJlIG92ZXJyaWRkZW4gZGlyZWN0bHkgd2hlbiBwb3B1cCBpcyBjYWxsZWQuXG4gKiBGb3IgaW1wbGVtZW50YXRpb24gbG9vazoge0BsaW5rIElEaWFsb2dVc2VyQ29uZmlnfS5cbiAqXG4gKiBFeGFtcGxlOlxuICogYGBgdHlwZXNjcmlwdFxuICogLy8gYXBwLm1vZHVsZSBpbXBvcnRzOlxuICpEaWFsb2dDb25maWdNb2R1bGUuZm9yUm9vdCh7XG4gKiAgICAgRGlhbG9nQ29yZUNvbmZpZzoge1xuICogICAgICAgIFdpZHRoICAgICAgICA6ICc1MDBweCcsXG4gKiAgICAgICAgQnV0dG9uUG9zaXRpb246ICdyaWdodCcsXG4gKiAgICAgICAgTGF5b3V0VHlwZTogRGlhbG9nTGF5b3V0RGlzcGxheS5JTkZPLFxuICogICAgICAgIExvYWRlckNvbXBvbmVudDogLy8gQW55IGFuZ3VsYXIgY29tcG9uZW50IGNsYXNzIG5hbWUgY2FuIGJlIGluY2x1ZGVkIGFzIGEgbG9hZGVyLlxuICogICAgIH0sXG4gKiAgICAgQnV0dG9uczogW1xuICogICAgICAgIG5ldyBCdXR0b25NYWtlcignT2snLCAnb2snLCBCdXR0b25MYXlvdXREaXNwbGF5LlBSSU1BUlkpLFxuICogICAgICAgIG5ldyBCdXR0b25NYWtlcignQ2FuY2VsJywgJ2NhbmNlbCcsIEJ1dHRvbkxheW91dERpc3BsYXkuU0VDT05EQVJZKVxuICogICAgIF0sXG4gKiB9KVxuICogYGBgXG4gKiAqIERpYWxvZ0NvcmVDb25maWcuTGF5b3V0VHlwZToge0BsaW5rIERpYWxvZ0xheW91dERpc3BsYXl9XG4gKiAqIEJ1dHRvbkxheW91dERpc3BsYXk6IHtAbGluayBCdXR0b25MYXlvdXREaXNwbGF5fVxuICogKiBCdXR0b25NYWtlcjoge0BsaW5rIEJ1dHRvbk1ha2VyfVxuICogQGNhdGVnb3J5IEltcG9ydHMgZm9yIGFuZ3VsYXIgYXBwLm1vZHVsZVxuICovXG5leHBvcnQge0RpYWxvZ0NvbmZpZ01vZHVsZX0gZnJvbSAnLi9uZ3gtYXdlc29tZS1wb3B1cC9uZ3gtYXdlc29tZS1wb3B1cC5tb2R1bGUnO1xuLyoqXG4gKiBUaGlzIGlzIHRoZSBtb2R1bGUgdGhhdCBpZ25pdGVzIENvbmZpcm0gYm94IGRpYWxvZywgaXRzIHB1cnBvc2UgaXMgdG8gc2hvdyBwb3B1cCBpbiBhXG4gKiBzbWFsbCBkaWFsb2cgd2luZG93IGluIHRoZSBtaWRkbGUgb2YgdGhlIHNjcmVlbi4gVXNlciBjYW4gcHJvdmlkZSB0aXRsZSwgbWVzc2FnZSBhbmQgaW5jbHVkZSBidXR0b25zLlxuICogQ29uZmlybSBib3ggaXMgYXZhaWxhYmxlIGluIHByZWRlZmluZWQgbGF5b3V0IHR5cGVzIChlbnVtcyk6IHtAbGluayBEaWFsb2dMYXlvdXREaXNwbGF5fS5cbiAqXG4gKiBJdCBpcyBjcnVjaWFsIGZvciB1c2VyIHRvIGFkZCB0aGlzIG1vZHVsZSBpbiBhbmd1bGFyLmFwcCBpbXBvcnRzLlxuICogQmVsb3cgaXMgdGhlIGV4YW1wbGUgd2l0aCAob3B0aW9uYWwpIGRlZmF1bHQgdXNlciBjb25maWd1cmF0aW9uLCB0aGF0J3Mgd2hhdCB3aWxsIGJlIHVzZWQgaWYgdGhlcmUgaXMgbm9cbiAqIGxvY2FsIGNvbmZpZyB3aGVuIHBvcHVwIGlzIGV2b2tlZCwgdGhhdCBtZWFucyBpdCBjYW4gYmUgb3ZlcnJpZGRlbiBkaXJlY3RseSB3aGVuIHBvcHVwIGlzIGV2b2tlZC5cbiAqIEZvciBpbXBsZW1lbnRhdGlvbiBsb29rOiB7QGxpbmsgSUNvbmZpcm1Cb3hVc2VyQ29uZmlnfS5cbiAqXG4gKiBFeGFtcGxlOlxuICogYGBgdHlwZXNjcmlwdFxuICogLy8gYXBwLm1vZHVsZSBpbXBvcnRzOlxuICpDb25maXJtQm94Q29uZmlnTW9kdWxlLmZvclJvb3Qoe1xuICogICAgQ29uZmlybUJveENvcmVDb25maWc6IHtcbiAqICAgICAgIFdpZHRoOiAnNzAwcHgnLFxuICogICAgICAgTGF5b3V0VHlwZTogRGlhbG9nTGF5b3V0RGlzcGxheS5EQU5HRVIsXG4gKiAgICAgICBCdXR0b25Qb3NpdGlvbjogJ2NlbnRlcidcbiAqICAgIH0sXG4gKiAgICBEaXNwYXRjaDogeyAgLy8gT3B0aW9uYWwgZGVmYXVsdCBkaXNwYXRjaCBvYmplY3QuXG4gKiAgICAgICBUaXRsZTogJ0RlZmF1bHQgdGl0bGUnLFxuICogICAgICAgTWVzc2FnZTogJ0RlZmF1bHQgbWVzc2FnZSdcbiAqICAgIH0sXG4gKiAgICBCdXR0b25zICAgICA6IFtcbiAqICAgICAgIG5ldyBCdXR0b25NYWtlcignT2snLCAnb2snLCBCdXR0b25MYXlvdXREaXNwbGF5LlBSSU1BUlkpLFxuICogICAgICAgbmV3IEJ1dHRvbk1ha2VyKCdDYW5jZWwnLCAnY2FuY2VsJywgQnV0dG9uTGF5b3V0RGlzcGxheS5TRUNPTkRBUlkpXG4gKiAgICBdXG4gKiB9KVxuICogYGBgXG4gKiAqIENvbmZpcm1Cb3hDb3JlQ29uZmlnOiB7QGxpbmsgSUNvbmZpcm1Cb3hDb3JlQ29uZmlnfVxuICogKiBEaXNwYXRjaDoge0BsaW5rIElEaXNwYXRjaH1cbiAqICogQnV0dG9uczoge0BsaW5rIElCdXR0b259XG4gKiAqIEJ1dHRvbk1ha2VyOiB7QGxpbmsgQnV0dG9uTWFrZXJ9XG4gKiBAY2F0ZWdvcnkgSW1wb3J0cyBmb3IgYW5ndWxhciBhcHAubW9kdWxlXG4gKi9cbmV4cG9ydCB7Q29uZmlybUJveENvbmZpZ01vZHVsZX0gZnJvbSAnLi9uZ3gtYXdlc29tZS1wb3B1cC9uZ3gtYXdlc29tZS1wb3B1cC5tb2R1bGUnO1xuLyoqXG4gKiBUaGlzIGlzIHRoZSBtb2R1bGUgdGhhdCBpZ25pdGVzIFRvYXN0IG5vdGlmaWNhdGlvbnMgZGlhbG9nLCBpdHMgcHVycG9zZSBpcyB0byBzaG93IHRvYXN0IHBvcHVwIGluIGFcbiAqIHNtYWxsIGRpYWxvZyB3aW5kb3cgaW4gdGhlIGNvcm5lciBvZiB0aGUgc2NyZWVuLiBVc2VyIGNhbiBwcm92aWRlIHRpdGxlIGFuZCBtZXNzYWdlIGFuZCBpbmNsdWRlIGJ1dHRvbnMsIG9yIHNldHVwIGF1dG8gZGlzYXBwZWFyaW5nLlxuICogVG9hc3Qgbm90aWZpY2F0aW9ucyBhcmUgYXZhaWxhYmxlIGluIHByZWRlZmluZWQgbGF5b3V0IHR5cGVzIChlbnVtcyk6IHtAbGluayBEaWFsb2dMYXlvdXREaXNwbGF5fS5cbiAqXG4gKiBJdCBpcyBjcnVjaWFsIGZvciB1c2VyIHRvIGFkZCB0aGlzIG1vZHVsZSBpbiBhbmd1bGFyLmFwcCBpbXBvcnRzLlxuICogQmVsb3cgaXMgdGhlIGV4YW1wbGUgd2l0aCAob3B0aW9uYWwpIGRlZmF1bHQgdXNlciBjb25maWd1cmF0aW9uLCB0aGF0J3Mgd2hhdCB3aWxsIGJlIHVzZWQgaWYgdGhlcmUgaXMgbm9cbiAqIGxvY2FsIGNvbmZpZyB3aGVuIHBvcHVwIGlzIGV2b2tlZCwgdGhhdCBtZWFucyBpdCBjYW4gYmUgb3ZlcnJpZGRlbiBkaXJlY3RseSB3aGVuIHBvcHVwIGlzIGV2b2tlZC5cbiAqIEZvciBpbXBsZW1lbnRhdGlvbiBsb29rOiB7QGxpbmsgSVRvYXN0Tm90aWZpY2F0aW9uVXNlckNvbmZpZ30uXG4gKlxuICogRXhhbXBsZTpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIC8vIGFwcC5tb2R1bGUgaW1wb3J0czpcbiAqVG9hc3ROb3RpZmljYXRpb25Db25maWdNb2R1bGUuZm9yUm9vdCh7XG4gKiAgICBUb2FzdENvcmVDb25maWc6IHtcbiAqICAgICAgIFdpZHRoOiAnMzAwcHgnLFxuICogICAgfSxcbiAqICAgIEdsb2JhbFNldHRpbmdzOiB7XG4gKiAgICAgICAvLyBUaGUgbnVtYmVyIG9mIHRvYXN0IG5vdGlmaWNhdGlvbnMgdGhhdCBjYW4gYmUgc2hvd24gYXQgb25jZS5cbiAqICAgICAgIEFsbG93ZWROb3RpZmljYXRpb25zQXRPbmNlOiA0LFxuICpcbiAqICAgICAgICAvLyBNaWxsaXNlY29uZHMgaXQgd2lsbCBiZSBpZ25vcmVkIGlmIGJ1dHRvbnMgYXJlIGluY2x1ZGVkLlxuICogICAgICAgQXV0b0Nsb3NlRGVsYXk6IDMwMDBcbiAqICAgIH0sXG4gKiAgICAvLyBPcHRpb25hbCBkZWZhdWx0IGRpc3BhdGNoIG9iamVjdC5cbiAqICAgIERpc3BhdGNoOiB7XG4gKiAgICAgIFRpdGxlOiAnRGVmYXVsdCB0aXRsZScsXG4gKiAgICAgIE1lc3NhZ2U6ICdEZWZhdWx0IG1lc3NhZ2UnXG4gKiAgIH0sXG4gKiAgIEJ1dHRvbnM6IFtcbiAqICAgICAgbmV3IEJ1dHRvbk1ha2VyKCdPaycsICdvaycsIEJ1dHRvbkxheW91dERpc3BsYXkuUFJJTUFSWSksXG4gKiAgICAgIG5ldyBCdXR0b25NYWtlcignQ2FuY2VsJywgJ2NhbmNlbCcsIEJ1dHRvbkxheW91dERpc3BsYXkuU0VDT05EQVJZKVxuICogICBdXG4gKn0pXG4gKiBgYGBcbiAqICogVG9hc3RDb3JlQ29uZmlnOiB7QGxpbmsgSVRvYXN0Q29yZUNvbmZpZ31cbiAqICogR2xvYmFsU2V0dGluZ3M6IHtAbGluayBJR2xvYmFsVG9hc3RTZXR0aW5nc31cbiAqICogRGlzcGF0Y2g6IHtAbGluayBJRGlzcGF0Y2h9XG4gKiAqIEJ1dHRvbnM6IHtAbGluayBJQnV0dG9ufVxuICogKiBCdXR0b25NYWtlcjoge0BsaW5rIEJ1dHRvbk1ha2VyfVxuICogQGNhdGVnb3J5IEltcG9ydHMgZm9yIGFuZ3VsYXIgYXBwLm1vZHVsZVxuICovXG5leHBvcnQge1RvYXN0Tm90aWZpY2F0aW9uQ29uZmlnTW9kdWxlfSBmcm9tICcuL25neC1hd2Vzb21lLXBvcHVwL25neC1hd2Vzb21lLXBvcHVwLm1vZHVsZSc7XG4vLyBlbmRyZWdpb25cbiJdfQ==