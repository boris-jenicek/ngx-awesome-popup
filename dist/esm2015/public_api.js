import { GlobalClass } from './ngx-awesome-popup/core/global';
import { ConfirmBoxClass } from './ngx-awesome-popup/types/confirm-box/core/model';
import { ToastNotificationClass } from './ngx-awesome-popup/types/toast-notification/core/model';
import { DialogClass } from './ngx-awesome-popup/types/dialog/core/model';
var ButtonMaker = GlobalClass.ButtonMaker;
var ConfirmBoxInitializer = ConfirmBoxClass.ConfirmBoxInitializer;
var ToastNotificationInitializer = ToastNotificationClass.ToastNotificationInitializer;
var DialogInitializer = DialogClass.DialogInitializer;
var DialogBelonging = DialogClass.DialogBelonging;
// endregion
export { ButtonLayoutDisplay } from './ngx-awesome-popup/core/enums';
export { DialogLayoutDisplay } from './ngx-awesome-popup/core/enums';
/**
 * @returns It will return custom button object ready to be used in child component layout.
 */
export { ButtonMaker };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljX2FwaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3B1YmxpY19hcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFdBQVcsRUFBa0IsTUFBTSxpQ0FBaUMsQ0FBQztBQUM3RSxPQUFPLEVBQUMsZUFBZSxFQUFzQixNQUFNLGtEQUFrRCxDQUFDO0FBQ3RHLE9BQU8sRUFBQyxzQkFBc0IsRUFBNkIsTUFBTSx5REFBeUQsQ0FBQztBQUMzSCxPQUFPLEVBQUMsV0FBVyxFQUFrQixNQUFNLDZDQUE2QyxDQUFDO0FBTXpGLElBQU8sV0FBVyxHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUM7QUFLN0MsSUFBTyxxQkFBcUIsR0FBRyxlQUFlLENBQUMscUJBQXFCLENBQUM7QUFHckUsSUFBTyw0QkFBNEIsR0FBRyxzQkFBc0IsQ0FBQyw0QkFBNEIsQ0FBQztBQVMxRixJQUFPLGlCQUFpQixHQUFHLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQztBQUN6RCxJQUFPLGVBQWUsR0FBRyxXQUFXLENBQUMsZUFBZSxDQUFDO0FBcUJyRCxZQUFZO0FBRVosT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDbkUsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFJbkU7O0dBRUc7QUFDSCxPQUFPLEVBQUMsV0FBVyxFQUFDLENBQUM7QUFHckI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1ERztBQUNILE9BQU8sRUFBQyxlQUFlLEVBQUMsQ0FBQztBQXFCekIsWUFBWTtBQUVaLDZCQUE2QjtBQUU3Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtDRztBQUNILE9BQU8sRUFBQyw0QkFBNEIsRUFBQyxDQUFDO0FBQ3RDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1DRztBQUNILE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxDQUFDO0FBQy9COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOENHO0FBQ0gsT0FBTyxFQUFDLGlCQUFpQixFQUFDLENBQUM7QUFDM0IsWUFBWTtBQUVaLGdEQUFnRDtBQUNoRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFDSCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSw4Q0FBOEMsQ0FBQztBQUNuRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOEJHO0FBQ0gsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sOENBQThDLENBQUM7QUFDaEY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQ0c7QUFDSCxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSw4Q0FBOEMsQ0FBQztBQUNwRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Q0c7QUFDSCxPQUFPLEVBQUMsNkJBQTZCLEVBQUMsTUFBTSw4Q0FBOEMsQ0FBQztBQUMzRixZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtHbG9iYWxDbGFzcywgR2xvYmFsSW50ZXJmYWNlfSBmcm9tICcuL25neC1hd2Vzb21lLXBvcHVwL2NvcmUvZ2xvYmFsJztcbmltcG9ydCB7Q29uZmlybUJveENsYXNzLCBDb25maXJtQm94SW50ZXJmYWNlfSBmcm9tICcuL25neC1hd2Vzb21lLXBvcHVwL3R5cGVzL2NvbmZpcm0tYm94L2NvcmUvbW9kZWwnO1xuaW1wb3J0IHtUb2FzdE5vdGlmaWNhdGlvbkNsYXNzLCBUb2FzdE5vdGlmaWNhdGlvbkludGVyZmFjZX0gZnJvbSAnLi9uZ3gtYXdlc29tZS1wb3B1cC90eXBlcy90b2FzdC1ub3RpZmljYXRpb24vY29yZS9tb2RlbCc7XG5pbXBvcnQge0RpYWxvZ0NsYXNzLCBEaWFsb2dJbnRlcmZhY2V9IGZyb20gJy4vbmd4LWF3ZXNvbWUtcG9wdXAvdHlwZXMvZGlhbG9nL2NvcmUvbW9kZWwnO1xuXG5pbXBvcnQgSUJ1dHRvbiA9IEdsb2JhbEludGVyZmFjZS5JQnV0dG9uO1xuaW1wb3J0IElEaXNwYXRjaCA9IEdsb2JhbEludGVyZmFjZS5JRGlzcGF0Y2g7XG5pbXBvcnQgSUdsb2JhbFVzZXJDb25maWcgPSBHbG9iYWxJbnRlcmZhY2UuSUdsb2JhbFVzZXJDb25maWc7XG5pbXBvcnQgSUNvbG9yVHlwZXMgPSBHbG9iYWxJbnRlcmZhY2UuSUNvbG9yVHlwZXM7XG5pbXBvcnQgQnV0dG9uTWFrZXIgPSBHbG9iYWxDbGFzcy5CdXR0b25NYWtlcjtcblxuaW1wb3J0IElDb25maXJtQm94UHVibGljUmVzcG9uc2UgPSBDb25maXJtQm94SW50ZXJmYWNlLklDb25maXJtQm94UHVibGljUmVzcG9uc2U7XG5pbXBvcnQgSUNvbmZpcm1Cb3hVc2VyQ29uZmlnID0gQ29uZmlybUJveEludGVyZmFjZS5JQ29uZmlybUJveFVzZXJDb25maWc7XG5pbXBvcnQgSUNvbmZpcm1Cb3hDb3JlQ29uZmlnID0gQ29uZmlybUJveEludGVyZmFjZS5JQ29uZmlybUJveENvcmVDb25maWc7XG5pbXBvcnQgQ29uZmlybUJveEluaXRpYWxpemVyID0gQ29uZmlybUJveENsYXNzLkNvbmZpcm1Cb3hJbml0aWFsaXplcjtcblxuaW1wb3J0IElUb2FzdE5vdGlmaWNhdGlvblB1YmxpY1Jlc3BvbnNlID0gVG9hc3ROb3RpZmljYXRpb25JbnRlcmZhY2UuSVRvYXN0Tm90aWZpY2F0aW9uUHVibGljUmVzcG9uc2U7XG5pbXBvcnQgVG9hc3ROb3RpZmljYXRpb25Jbml0aWFsaXplciA9IFRvYXN0Tm90aWZpY2F0aW9uQ2xhc3MuVG9hc3ROb3RpZmljYXRpb25Jbml0aWFsaXplcjtcbmltcG9ydCBJVG9hc3RDb3JlQ29uZmlnID0gVG9hc3ROb3RpZmljYXRpb25JbnRlcmZhY2UuSVRvYXN0Q29yZUNvbmZpZztcbmltcG9ydCBJR2xvYmFsVG9hc3RTZXR0aW5ncyA9IFRvYXN0Tm90aWZpY2F0aW9uSW50ZXJmYWNlLklHbG9iYWxUb2FzdFNldHRpbmdzO1xuaW1wb3J0IElUb2FzdE5vdGlmaWNhdGlvblVzZXJDb25maWcgPSBUb2FzdE5vdGlmaWNhdGlvbkludGVyZmFjZS5JVG9hc3ROb3RpZmljYXRpb25Vc2VyQ29uZmlnO1xuXG5pbXBvcnQgSURpYWxvZ0V2ZW50c0NvbnRyb2xsZXIgPSBEaWFsb2dJbnRlcmZhY2UuSURpYWxvZ0V2ZW50c0NvbnRyb2xsZXI7XG5pbXBvcnQgSURpYWxvZ1B1YmxpY1Jlc3BvbnNlID0gRGlhbG9nSW50ZXJmYWNlLklEaWFsb2dQdWJsaWNSZXNwb25zZTtcbmltcG9ydCBJRGlhbG9nVXNlckNvbmZpZyA9IERpYWxvZ0ludGVyZmFjZS5JRGlhbG9nVXNlckNvbmZpZztcbmltcG9ydCBJRGlhbG9nQ29yZUNvbmZpZyA9IERpYWxvZ0ludGVyZmFjZS5JRGlhbG9nQ29yZUNvbmZpZztcbmltcG9ydCBEaWFsb2dJbml0aWFsaXplciA9IERpYWxvZ0NsYXNzLkRpYWxvZ0luaXRpYWxpemVyO1xuaW1wb3J0IERpYWxvZ0JlbG9uZ2luZyA9IERpYWxvZ0NsYXNzLkRpYWxvZ0JlbG9uZ2luZztcblxuLy8gcmVnaW9uICoqKiBJbnRlcmZhY2UgKioqXG5leHBvcnQge0lHbG9iYWxVc2VyQ29uZmlnfTtcbmV4cG9ydCB7SUJ1dHRvbn07XG5leHBvcnQge0lEaXNwYXRjaH07XG5leHBvcnQge0lDb2xvclR5cGVzfTtcblxuZXhwb3J0IHtJQ29uZmlybUJveFVzZXJDb25maWd9O1xuZXhwb3J0IHtJQ29uZmlybUJveENvcmVDb25maWd9O1xuZXhwb3J0IHtJQ29uZmlybUJveFB1YmxpY1Jlc3BvbnNlfTtcblxuZXhwb3J0IHtJR2xvYmFsVG9hc3RTZXR0aW5nc307XG5leHBvcnQge0lUb2FzdENvcmVDb25maWd9O1xuZXhwb3J0IHtJVG9hc3ROb3RpZmljYXRpb25Vc2VyQ29uZmlnfTtcbmV4cG9ydCB7SVRvYXN0Tm90aWZpY2F0aW9uUHVibGljUmVzcG9uc2V9O1xuXG5leHBvcnQge0lEaWFsb2dVc2VyQ29uZmlnfTtcbmV4cG9ydCB7SURpYWxvZ0NvcmVDb25maWd9O1xuZXhwb3J0IHtJRGlhbG9nUHVibGljUmVzcG9uc2V9O1xuZXhwb3J0IHtJRGlhbG9nRXZlbnRzQ29udHJvbGxlcn07XG4vLyBlbmRyZWdpb25cblxuZXhwb3J0IHtCdXR0b25MYXlvdXREaXNwbGF5fSBmcm9tICcuL25neC1hd2Vzb21lLXBvcHVwL2NvcmUvZW51bXMnO1xuZXhwb3J0IHtEaWFsb2dMYXlvdXREaXNwbGF5fSBmcm9tICcuL25neC1hd2Vzb21lLXBvcHVwL2NvcmUvZW51bXMnO1xuZXhwb3J0IHtWZXJ0aWNhbFBvc2l0aW9ufSBmcm9tICcuL25neC1hd2Vzb21lLXBvcHVwL2NvcmUvZW51bXMnO1xuXG5cbi8qKlxuICogQHJldHVybnMgSXQgd2lsbCByZXR1cm4gY3VzdG9tIGJ1dHRvbiBvYmplY3QgcmVhZHkgdG8gYmUgdXNlZCBpbiBjaGlsZCBjb21wb25lbnQgbGF5b3V0LlxuICovXG5leHBvcnQge0J1dHRvbk1ha2VyfTtcblxuXG4vKipcbiAqIFRoaXMgaXMgdGhlIGNsYXNzIHRoYXQgbmVlZHMgdG8gYmUgYWRkZWQgYXMgREkgaW4gdGhlIGNvbnN0cnVjdG9yIG9mIGEgY2hpbGQgY29tcG9uZW50IHRoYXQgd2lsbCBiZVxuICogb3BlbmVkIGR5bmFtaWNhbGx5IHdpdGgge0BsaW5rIERpYWxvZ0luaXRpYWxpemVyfS4gSXQgY29udGFpbnMgdmFyaW91cyBpbmZvcm1hdGlvbiBvclxuICogZXZlbnQgY29udHJvbGxlcnMsIGFuZCBsaXN0ZW5lcnMgdGhhdCBjYW4gYmUgdXNlZCBpbiBhIGNoaWxkIGNvbXBvbmVudC4gQWxzbywgdGhlcmUgaXMgY3VzdG9tIGRhdGFcbiAqIHRoYXQgaXMgc2VudCBmcm9tIGNvbXBvbmVudCB3aGVyZSB0aGUge0BsaW5rIERpYWxvZ0luaXRpYWxpemVyfSBpcy4gVXNlciBjYW4gc2V0IHNwZWNpZmljIHR5cGUgb2ZcbiAqIGN1c3RvbSBkYXRhIHRoYXQgY2hpbGQgY29tcG9uZW50IHdpbGwgcmVjZWl2ZSBieSBpbmNsdWRpbmcgaXQgYXMgZ2VuZXJpYyB0eXBlLlxuICpcbiAqXG4gKiBFeGFtcGxlOlxuICogYGBgdHlwZXNjcmlwdFxuICppbXBvcnQge0RpYWxvZ0JlbG9uZ2luZ30gZnJvbSAnbmd4LWF3ZXNvbWUtcG9wdXAnO1xuICpAQ29tcG9uZW50KHtcbiAqICAgIHNlbGVjdG9yICAgOiAnYXBwLWN1cCcsXG4gKiAgICB0ZW1wbGF0ZVVybDogJy4vY3VwLmNvbXBvbmVudC5odG1sJyxcbiAqICAgIHN0eWxlVXJscyAgOiBbJy4vY3VwLmNvbXBvbmVudC5zY3NzJ11cbiAqfSlcbiAqIGV4cG9ydCBjbGFzcyBDdXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gKlxuICogICAgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcbiAqXG4gKiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRpYWxvZ0JlbG9uZ2luZzogRGlhbG9nQmVsb25naW5nKSB7XG4gKiAgICB9XG4gKlxuICogICAgbmdPbkluaXQoKTogdm9pZCB7XG4gKiAgICBjb25zb2xlLmxvZyh0aGlzLmRpYWxvZ0JlbG9uZ2luZyk7XG4gKlxuICogICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICogICAgICAgICAgICB0aGlzLmRpYWxvZ0JlbG9uZ2luZy5FdmVudHNDb250cm9sbGVyLm9uQnV0dG9uQ2xpY2skLnN1YnNjcmliZSgoX0J1dHRvbikgPT4ge1xuICogICAgICAgICAgICBpZiAoX0J1dHRvbi5JRCA9PT0gJ29rJykge1xuICogICAgICAgICAgICAgICAgLy8gRG8gc29tZSBsb2dpYyBhbmQgY2xvc2UgcG9wdXAuXG4gKiAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ0JlbG9uZ2luZy5FdmVudHNDb250cm9sbGVyLmNsb3NlKCk7XG4gKiAgICAgICAgICAgIH0gZWxzZSBpZiAoX0J1dHRvbi5JRCA9PT0gJ2NhbmNlbCcpIHtcbiAqICAgICAgICAgICAgICAgIC8vIERvIHNvbWUgbG9naWMgYW5kIGNsb3NlIHBvcHVwLlxuICogICAgICAgICAgICAgICAgdGhpcy5kaWFsb2dCZWxvbmdpbmcuRXZlbnRzQ29udHJvbGxlci5jbG9zZSgpO1xuICogICAgICAgICAgICB9XG4gKiAgICAgICAgfSlcbiAqICAgICAgICApO1xuICpcbiAqICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAqICAgICAgICAgICAgLy8gQ2xvc2UgbG9hZGVyIGFmdGVyIGFzeW5jIGRhdGEgaXMgcmVhZHkuXG4gKiAgICAgICAgICAgIHRoaXMuZGlhbG9nQmVsb25naW5nLkV2ZW50c0NvbnRyb2xsZXIuY2xvc2VMb2FkZXIoKTtcbiAqICAgICAgICB9LCAxMDAwKTtcbiAqICAgIH1cbiAqfVxuIFxuIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICAvLyBDbG9zZSBhbGwgc3Vic2NyaXB0aW9ucy5cbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goc3ViID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcbiAgICB9XG4gKiBgYGBcbiAqIEBjYXRlZ29yeSBjaGlsZCBkeW5hbWljIGNvbXBvbmVudCBkYXRhICYgZXZlbnQgY29udHJvbGxlclxuICovXG5leHBvcnQge0RpYWxvZ0JlbG9uZ2luZ307XG5cbi8vIHJlZ2lvbiAqKiogT2JzZXJ2YWJsZSByZXNwb25zZSBhZnRlciBjbG9zaW5nIHBvcHVwICoqKlxuLyoqXG4gKiBSZWd1bGFyIGRlc2NyaXB0aW9uXG4gKlxuICogQGNhdGVnb3J5IE9ic2VydmFibGUgcmVzcG9uc2UgYWZ0ZXIgY2xvc2luZyBwb3B1cFxuICovXG5leHBvcnQge0lUb2FzdE5vdGlmaWNhdGlvblB1YmxpY1Jlc3BvbnNlIGFzIElUb2FzdE5vdGlmaWNhdGlvblJlc3BvbnNlfTtcbi8qKlxuICogUmVndWxhciBkZXNjcmlwdGlvblxuICpcbiAqIEBjYXRlZ29yeSBPYnNlcnZhYmxlIHJlc3BvbnNlIGFmdGVyIGNsb3NpbmcgcG9wdXBcbiAqL1xuZXhwb3J0IHtJQ29uZmlybUJveFB1YmxpY1Jlc3BvbnNlIGFzIElDb25maXJtQm94UmVzcG9uc2V9O1xuLyoqXG4gKiBSZWd1bGFyIGRlc2NyaXB0aW9uXG4gKlxuICogQGNhdGVnb3J5IE9ic2VydmFibGUgcmVzcG9uc2UgYWZ0ZXIgY2xvc2luZyBwb3B1cFxuICovXG5leHBvcnQge0lEaWFsb2dQdWJsaWNSZXNwb25zZSBhcyBJRGlhbG9nUmVzcG9uc2V9O1xuLy8gZW5kcmVnaW9uXG5cbi8vIHJlZ2lvbiAqKiogUG9wdXAgb3BlbiAgKioqXG5cbi8qKlxuICogVGhpcyBpcyB0aGUgY2xhc3MgdGhhdCBuZWVkcyB0byBiZSBpbnN0YW50aWF0ZWQgdG8gc2V0IHVwIGFuZCBpZ25pdGUgYSBUb2FzdE5vdGlmaWNhdGlvbixcbiAqIGl0cyBwdXJwb3NlIGlzIHRvIHNob3cgc2hvcnQgbm90aWZpY2F0aW9uIHRvIGVuZC11c2VyLCBvciBldmVuIGludGVyYWN0IHdpdGggdXNlci5cbiAqIEl0IGNhbiBiZSBldm9rZWQgZnJvbSBhbnkgYW5ndWxhciB0eXBlc2NyaXB0IGZpbGUuXG4gKlxuICogQmVsb3cgaXMgdGhlIGV4YW1wbGUgd2l0aCAoc29tZSBvcHRpb25hbCkgdXNlciBjb25maWd1cmF0aW9uLFxuICogaXQgd2lsbCBvdmVycmlkZSBkZWZhdWx0IGNvbmZpZ3VyYXRpb24gZnJvbSBhcHAubW9kdWxlLlxuICpcbiAqXG4gKiBFeGFtcGxlOlxuICogYGBgdHlwZXNjcmlwdFxuICogLy8gQ3JlYXRlIHRoZSBpbml0aWFsaXplci5cbiAqY29uc3QgbmV3VG9hc3ROb3RpZmljYXRpb24gPSBuZXcgVG9hc3ROb3RpZmljYXRpb25Jbml0aWFsaXplcigpO1xuICpcbiAqIC8vIFNldCBkZXNpcmVkIFRpdGxlLlxuICpuZXdUb2FzdE5vdGlmaWNhdGlvbi5zZXRUaXRsZSgnV2FybmluZyEnKTtcbiAqXG4gKiAvLyBTZXQgZGVzaXJlZCBNZXNzYWdlLlxuICpuZXdUb2FzdE5vdGlmaWNhdGlvbi5zZXRNZXNzYWdlKCdGb3JtIGlzIG5vdCB2YWxpZCEnKTtcbiAqXG4gKiAvLyBTZXQgZGVzaXJlZCBjb25maWd1cmF0aW9uLlxuICpuZXdUb2FzdE5vdGlmaWNhdGlvbi5zZXRDb25maWcoe1xuICogICAgICBMYXlvdXRUeXBlOiBEaWFsb2dMYXlvdXREaXNwbGF5LldBUk5JTkdcbiAqICAgfSk7XG4gXG4gKiAvLyBPcGVuIGEgVG9hc3ROb3RpZmljYXRpb24uXG4gKiBuZXdDb25maXJtQm94Lm9wZW5Db25maXJtQm94JCgpLnN1YnNjcmliZShyZXNwID0+IHtcbiAqICAgY29uc29sZS5sb2coJ2NvbmZpcm1Cb3ggcmVzcG9uc2U6ICcsIHJlc3ApO1xuICogIH0pO1xuICogYGBgXG4gKiAqIElUb2FzdENvcmVDb25maWc6IHtAbGluayBJVG9hc3RDb3JlQ29uZmlnfVxuICogKiBMYXlvdXRUeXBlOiB7QGxpbmsgRGlhbG9nTGF5b3V0RGlzcGxheX1cbiAqICogSVRvYXN0Tm90aWZpY2F0aW9uUHVibGljUmVzcG9uc2U6IHtAbGluayBJVG9hc3ROb3RpZmljYXRpb25QdWJsaWNSZXNwb25zZX1cbiAqIEBjYXRlZ29yeSBQb3B1cCBvcGVuXG4gKi9cbmV4cG9ydCB7VG9hc3ROb3RpZmljYXRpb25Jbml0aWFsaXplcn07XG4vKipcbiAqIFRoaXMgaXMgdGhlIGNsYXNzIHRoYXQgbmVlZHMgdG8gYmUgaW5zdGFudGlhdGVkIHRvIHNldCB1cCBhbmQgaWduaXRlIGEgQ29uZmlybUJveCBhbmQgY3JlYXRlIGNvbnRlbnQuXG4gKiBJdHMgcHVycG9zZSBpcyB0byBnZXQgY29uZmlybWF0aW9uIHJlc3BvbnNlIGZyb20gZW5kLXVzZXIuIEl0IGNhbiBiZSBjYWxsZWQgZnJvbSBhbnkgYW5ndWxhclxuICogdHlwZXNjcmlwdCBmaWxlLlxuICpcbiAqIEJlbG93IGlzIGV4YW1wbGUgd2l0aCAoc29tZSBvcHRpb25hbCkgdXNlciBjb25maWd1cmF0aW9uLFxuICogaXQgd2lsbCBvdmVycmlkZSBkZWZhdWx0IGNvbmZpZ3VyYXRpb24gZnJvbSBhcHAubW9kdWxlLlxuICpcbiAqXG4gKiBFeGFtcGxlOlxuICogYGBgdHlwZXNjcmlwdFxuICogLy8gQ3JlYXRlIHRoZSBpbml0aWFsaXplci5cbiAqY29uc3QgbmV3Q29uZmlybUJveCA9IG5ldyBDb25maXJtQm94SW5pdGlhbGl6ZXIoKTtcbiAqXG4gKiAvLyBTZXQgZGVzaXJlZCBkaXNwYXRjaDogX1RpdGxlOiBzdHJpbmcsIF9NZXNzYWdlOiBzdHJpbmcuXG4gKm5ld0NvbmZpcm1Cb3guc2V0RGlzcGF0Y2goJ0FyZSB5b3Ugc3VyZT8nLCAnVGhhdCBhY3Rpb24gd2lsbCBkZWxldGUgdXNlciEnKTtcbiAqXG4gKiAvLyBTZXQgZGVzaXJlZCBjb25maWd1cmF0aW9uLlxuICpuZXdDb25maXJtQm94LnNldENvbmZpZyh7XG4gKiAgICAgIExheW91dFR5cGU6IERpYWxvZ0xheW91dERpc3BsYXkuREFOR0VSXG4gKiAgIH0pO1xuICpcbiAqIC8vIFNldCBidXR0b24gbGFiZWxzLlxuICogbmV3Q29uZmlybUJveC5zZXRCdXR0b25MYWJlbHMoJ1lFUycsICdOTycpO1xuICpcbiAqIC8vIE9wZW4gYSBDb25maXJtQm94LCBhbmQgZ2V0IGNsaWNrZWQgYnV0dG9uLWlkIGluIHJlc3BvbnNlLlxuICogbmV3Q29uZmlybUJveC5vcGVuQ29uZmlybUJveCQoKS5zdWJzY3JpYmUocmVzcCA9PiB7XG4gKiAgIC8vIElDb25maXJtQm94UHVibGljUmVzcG9uc2VcbiAqICAgY29uc29sZS5sb2coJ2NvbmZpcm1Cb3ggcmVzcG9uc2U6ICcsIHJlc3ApO1xuICogIH0pO1xuICogYGBgXG4gKiAqIElDb25maXJtQm94Q29yZUNvbmZpZzoge0BsaW5rIElDb25maXJtQm94Q29yZUNvbmZpZ31cbiAqICogTGF5b3V0VHlwZToge0BsaW5rIERpYWxvZ0xheW91dERpc3BsYXl9XG4gKiAqIElDb25maXJtQm94UHVibGljUmVzcG9uc2U6IHtAbGluayBJQ29uZmlybUJveFB1YmxpY1Jlc3BvbnNlfVxuICogQGNhdGVnb3J5IFBvcHVwIG9wZW5cbiAqL1xuZXhwb3J0IHtDb25maXJtQm94SW5pdGlhbGl6ZXJ9O1xuLyoqXG4gKiBUaGlzIGlzIHRoZSBjbGFzcyB0aGF0IG5lZWRzIHRvIGJlIGluc3RhbnRpYXRlZCB0byBzZXQgdXAgYW5kIGlnbml0ZSBhIERpYWxvZyBhbmQgY3JlYXRlIGR5bmFtaWMgY29tcG9uZW50LFxuICogaXRzIHB1cnBvc2UgaXMgdG8gcmVuZGVyIGFueSBhbmd1bGFyIGNvbXBvbmVudCB2aWV3IHdpdGggc3BlY2lmaWMgY29uZmlndXJhdGlvbiBmcm9tIGFueSBhbmd1bGFyIHR5cGVzY3JpcHQgZmlsZS5cbiAqIER5bmFtaWMgY29tcG9uZW50IG1lYW5zIHRoYXQgdXNlciBjYW4gZXZva2UgdGhlIHBvcHVwIGZyb20gdHlwZXNjcmlwdCBhbmQgY29tcG9uZW50IHZpZXdcbiAqIGlzIGR5bmFtaWNhbGx5IGNyZWF0ZWQgd2l0aCB0aGUgQXdlc29tZSBQb3B1cCBlbmdpbmUuIFRoZXJlIGlzIG5vIG5lZWQgdG8gY2FsbCBhbnkgc2VsZWN0b3IgaW4gSFRNTCB0byBjcmVhdGUgY29tcG9uZW50IHZpZXcuXG4gKlxuICogRGlhbG9nSW5pdGlhbGl6ZXIgY2FuIHNlbmQgZGF0YSB0byBjaGlsZCBjb21wb25lbnQgKGR5bmFtaWMgY29tcG9uZW50KSB3aGVyZSBkYXRhIHdpbGwgYmUgYWNjZXNzaWJsZSB3aXRoIHtAbGluayBEaWFsb2dCZWxvbmdpbmd9LlxuICpcbiAqIEJlbG93IGlzIHRoZSBleGFtcGxlIHdpdGggKHNvbWUgb3B0aW9uYWwpIHVzZXIgY29uZmlndXJhdGlvbixcbiAqIGl0IHdpbGwgb3ZlcnJpZGUgZGVmYXVsdCBjb25maWd1cmF0aW9uIGZyb20gYXBwLm1vZHVsZS5cbiAqXG4gKlxuICogRXhhbXBsZTpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqICBpbXBvcnQge0RpYWxvZ0luaXRpYWxpemVyLCBEaWFsb2dMYXlvdXREaXNwbGF5LCBCdXR0b25NYWtlciwgQnV0dG9uTGF5b3V0RGlzcGxheX0gZnJvbSAnbmd4LWF3ZXNvbWUtcG9wdXAnOzxcbiAqICBpbXBvcnQge0N1cENvbXBvbmVudH0gZnJvbSAnLi9jdXAvY3VwLmNvbXBvbmVudCc7XG4gKlxuICogIGNvbnN0IG5ld0RpYWxvZ1BvcHVwID0gbmV3IERpYWxvZ0luaXRpYWxpemVyKEN1cENvbXBvbmVudCk7IC8vIEFueSBBbmd1bGFyIGNvbXBvbmVudC5cbiAqXG4gKiAgLy8gQ3VzdG9tIGRhdGEgd2lsbCBiZSBzZW50IHRvIGR5bmFtaWMgY29tcG9uZW50IGF2YWlsYWJsZSBpbiBkaWFsb2dCZWxvbmdpbmcgb2JqZWN0LlxuICogIG5ld0RpYWxvZ1BvcHVwLnNldEN1c3RvbURhdGEoe25hbWU6ICdKb2huJywgc3VybmFtZTogJ0RvZScsIGlkOiAxfSk7XG4gKlxuICogIC8vIExvY2FsIGNvbmZpZyBzZXR0aW5ncyBJRGlhbG9nQ29yZUNvbmZpZy5cbiAqICBuZXdEaWFsb2dQb3B1cC5zZXRDb25maWcoe1xuICogICAgICBIZWlnaHQ6ICc1MDBweCcsXG4gKiAgICAgIExheW91dFR5cGU6IERpYWxvZ0xheW91dERpc3BsYXkuSU5GTyxcbiAqICAgICAgTG9hZGVyQ29tcG9uZW50OiBBbnkgQW5ndWxhciBjb21wb25lbnQgbmFtZVxuICogICAgICAgfSk7XG4gKlxuICogIC8vIEN1c3RvbSBidXR0b25zLCBsaXN0ZW5lciBpcyBhdmFpbGFibGUgaW4gY2hpbGQgY29tcG9uZW50IGluIGRpYWxvZ0JlbG9uZ2luZyBvYmplY3QuXG4gKiAgbmV3RGlhbG9nUG9wdXAuc2V0QnV0dG9ucyhbXG4gKiAgICAgIG5ldyBCdXR0b25NYWtlcignT2snLCAnb2snLCBCdXR0b25MYXlvdXREaXNwbGF5LlBSSU1BUlkpLFxuICogICAgICBuZXcgQnV0dG9uTWFrZXIoJ0NhbmNlbCcsICdjYW5jZWwnLCBCdXR0b25MYXlvdXREaXNwbGF5LlNFQ09OREFSWSlcbiAqICBdKTtcbiAqXG4gKiAgLy8gQ29tbWFuZCB0byBvcGVuIGRpYWxvZywgaXQgcmV0dXJucyBvYnNlcnZhYmxlLlxuICogIG5ld0RpYWxvZ1BvcHVwLm9wZW5EaWFsb2ckPGFueT4oKS5zdWJzY3JpYmUocmVzcCA9PiB7XG4gKiAgICAgICAgICAgY29uc29sZS5sb2coJ3Jlc3BvbnNlOiAnLCByZXNwLlBheWxvYWQpO1xuICogICAgICAgfSk7XG4gKiBgYGBcbiAqICogSURpYWxvZ0NvcmVDb25maWc6IHtAbGluayBJRGlhbG9nQ29yZUNvbmZpZ31cbiAqICogTGF5b3V0VHlwZToge0BsaW5rIERpYWxvZ0xheW91dERpc3BsYXl9XG4gKiAqIEJ1dHRvbkxheW91dERpc3BsYXk6IHtAbGluayBCdXR0b25MYXlvdXREaXNwbGF5fVxuICogKiBCdXR0b25NYWtlcjoge0BsaW5rIEJ1dHRvbk1ha2VyfVxuICogKiBJRGlhbG9nUHVibGljUmVzcG9uc2U6IHtAbGluayBJRGlhbG9nUHVibGljUmVzcG9uc2V9XG4gKiBAY2F0ZWdvcnkgUG9wdXAgb3BlblxuICovXG5leHBvcnQge0RpYWxvZ0luaXRpYWxpemVyfTtcbi8vIGVuZHJlZ2lvblxuXG4vLyByZWdpb24gKioqIEltcG9ydHMgZm9yIGFuZ3VsYXIgYXBwLm1vZHVsZSAqKipcbi8qKlxuICogVGhpcyBpcyB0aGUgbWFpbiBtb2R1bGUgb2YgdGhlIGxpYnJhcnksIGl0IGlzIGNydWNpYWwgdG8gYmUgYWRkZWQgd2l0aGluIGFuZ3VsYXIuYXBwXG4gKiBpbXBvcnRzIGFzIGFuIGV4YW1wbGUgd2l0aCBvcHRpb25hbCBhcmd1bWVudCwgbG9vazoge0BsaW5rIElHbG9iYWxVc2VyQ29uZmlnfVxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIC8vIGFwcC5tb2R1bGUgaW1wb3J0czpcbiAqIE5neEF3ZXNvbWVQb3B1cE1vZHVsZS5mb3JSb290KHtcbiAqICAgICBDb2xvckxpc3Q6IHtcbiAqICAgICAgICAgICAgUHJpbWFyeSAgOiAnI2ZmOWUwMCcsIC8vIG9wdGlvbmFsXG4gKiAgICAgICAgICAgIFNlY29uZGFyeTogJyM5ODllYTUnLCAvLyBvcHRpb25hbFxuICogICAgICAgICAgICBJbmZvICAgICA6ICcjMmY4ZWU1JywgLy8gb3B0aW9uYWxcbiAqICAgICAgICAgICAgU3VjY2VzcyAgOiAnIzNjYWVhMycsIC8vIG9wdGlvbmFsXG4gKiAgICAgICAgICAgIFdhcm5pbmcgIDogJyNmZmMxMDcnLCAvLyBvcHRpb25hbFxuICogICAgICAgICAgICBEYW5nZXIgICA6ICcjZTQ2NDY0JywgLy8gb3B0aW9uYWxcbiAqICAgICAgICAgICAgTGlnaHQgICAgOiAnI2ZiZmJmYicsIC8vIG9wdGlvbmFsXG4gKiAgICAgICAgICAgIERhcmsgICAgIDogJyMzNDNhNDAnICAvLyBvcHRpb25hbFxuICogICAgICAgICAgIH1cbiAqIH0pXG4gKiBgYGBcbiAqIEBjYXRlZ29yeSBJbXBvcnRzIGZvciBhbmd1bGFyIGFwcC5tb2R1bGVcbiAqL1xuZXhwb3J0IHtOZ3hBd2Vzb21lUG9wdXBNb2R1bGV9IGZyb20gJy4vbmd4LWF3ZXNvbWUtcG9wdXAvbmd4LWF3ZXNvbWUtcG9wdXAubW9kdWxlJztcbi8qKlxuICogVGhpcyBpcyB0aGUgbW9kdWxlIHRoYXQgaWduaXRlcyBkeW5hbWljIGRpYWxvZyBtb2RhbCwgaXRzIHB1cnBvc2UgaXMgdG8gbG9hZCBhbnkgYW5ndWxhciBjb21wb25lbnQgaW5cbiAqIGRpYWxvZyB3aW5kb3cuIER5bmFtaWMgY29tcG9uZW50IG1lYW5zIHRoYXQgdXNlciBjYW4gZXZva2UgYW55IEFuZ3VsYXIgY29tcG9uZW50IGluIHRoZSBwb3B1cCBqdXN0IGZyb20gdHlwZXNjcmlwdC4gQ29tcG9uZW50IHZpZXdcbiAqIGlzIGR5bmFtaWNhbGx5IGNyZWF0ZWQgd2l0aCB0aGUgbGlicmFyeSBlbmdpbmUgYW5kIHRoZXJlIGlzIG5vIG5lZWQgdG8gY2FsbCBhbnkgc2VsZWN0b3IgaW4gSFRNTCB0byBjcmVhdGUgY29tcG9uZW50IHZpZXcuXG4gKlxuICogSXQgaXMgY3J1Y2lhbCBmb3IgdXNlciB0byBhZGQgdGhpcyBtb2R1bGUgaW4gYW5ndWxhci5hcHAgaW1wb3J0cy5cbiAqIEJlbG93IGlzIHRoZSBleGFtcGxlIHdpdGggKG9wdGlvbmFsKSBkZWZhdWx0IHVzZXIgY29uZmlndXJhdGlvbiwgdGhhdCBpcyB3aGF0IHdpbGwgYmUgaW4gc2V0dXAgaWYgdGhlcmUgaXMgbm9cbiAqIGxvY2FsIGNvbmZpZyB3aGVuIHBvcHVwIGlzIGV2b2tlZCwgdGhhdCBtZWFucyBpdCBjYW4gYmUgb3ZlcnJpZGRlbiBkaXJlY3RseSB3aGVuIHBvcHVwIGlzIGNhbGxlZC5cbiAqIEZvciBpbXBsZW1lbnRhdGlvbiBsb29rOiB7QGxpbmsgSURpYWxvZ1VzZXJDb25maWd9LlxuICpcbiAqIEV4YW1wbGU6XG4gKiBgYGB0eXBlc2NyaXB0XG4gKiAvLyBhcHAubW9kdWxlIGltcG9ydHM6XG4gKkRpYWxvZ0NvbmZpZ01vZHVsZS5mb3JSb290KHtcbiAqICAgICBEaWFsb2dDb3JlQ29uZmlnOiB7XG4gKiAgICAgICAgV2lkdGggICAgICAgIDogJzUwMHB4JyxcbiAqICAgICAgICBCdXR0b25Qb3NpdGlvbjogJ3JpZ2h0JyxcbiAqICAgICAgICBMYXlvdXRUeXBlOiBEaWFsb2dMYXlvdXREaXNwbGF5LklORk8sXG4gKiAgICAgICAgTG9hZGVyQ29tcG9uZW50OiAvLyBBbnkgYW5ndWxhciBjb21wb25lbnQgY2xhc3MgbmFtZSBjYW4gYmUgaW5jbHVkZWQgYXMgYSBsb2FkZXIuXG4gKiAgICAgfSxcbiAqICAgICBCdXR0b25zOiBbXG4gKiAgICAgICAgbmV3IEJ1dHRvbk1ha2VyKCdPaycsICdvaycsIEJ1dHRvbkxheW91dERpc3BsYXkuUFJJTUFSWSksXG4gKiAgICAgICAgbmV3IEJ1dHRvbk1ha2VyKCdDYW5jZWwnLCAnY2FuY2VsJywgQnV0dG9uTGF5b3V0RGlzcGxheS5TRUNPTkRBUlkpXG4gKiAgICAgXSxcbiAqIH0pXG4gKiBgYGBcbiAqICogRGlhbG9nQ29yZUNvbmZpZy5MYXlvdXRUeXBlOiB7QGxpbmsgRGlhbG9nTGF5b3V0RGlzcGxheX1cbiAqICogQnV0dG9uTGF5b3V0RGlzcGxheToge0BsaW5rIEJ1dHRvbkxheW91dERpc3BsYXl9XG4gKiAqIEJ1dHRvbk1ha2VyOiB7QGxpbmsgQnV0dG9uTWFrZXJ9XG4gKiBAY2F0ZWdvcnkgSW1wb3J0cyBmb3IgYW5ndWxhciBhcHAubW9kdWxlXG4gKi9cbmV4cG9ydCB7RGlhbG9nQ29uZmlnTW9kdWxlfSBmcm9tICcuL25neC1hd2Vzb21lLXBvcHVwL25neC1hd2Vzb21lLXBvcHVwLm1vZHVsZSc7XG4vKipcbiAqIFRoaXMgaXMgdGhlIG1vZHVsZSB0aGF0IGlnbml0ZXMgQ29uZmlybSBib3ggZGlhbG9nLCBpdHMgcHVycG9zZSBpcyB0byBzaG93IHBvcHVwIGluIGFcbiAqIHNtYWxsIGRpYWxvZyB3aW5kb3cgaW4gdGhlIG1pZGRsZSBvZiB0aGUgc2NyZWVuLiBVc2VyIGNhbiBwcm92aWRlIHRpdGxlLCBtZXNzYWdlIGFuZCBpbmNsdWRlIGJ1dHRvbnMuXG4gKiBDb25maXJtIGJveCBpcyBhdmFpbGFibGUgaW4gcHJlZGVmaW5lZCBsYXlvdXQgdHlwZXMgKGVudW1zKToge0BsaW5rIERpYWxvZ0xheW91dERpc3BsYXl9LlxuICpcbiAqIEl0IGlzIGNydWNpYWwgZm9yIHVzZXIgdG8gYWRkIHRoaXMgbW9kdWxlIGluIGFuZ3VsYXIuYXBwIGltcG9ydHMuXG4gKiBCZWxvdyBpcyB0aGUgZXhhbXBsZSB3aXRoIChvcHRpb25hbCkgZGVmYXVsdCB1c2VyIGNvbmZpZ3VyYXRpb24sIHRoYXQncyB3aGF0IHdpbGwgYmUgdXNlZCBpZiB0aGVyZSBpcyBub1xuICogbG9jYWwgY29uZmlnIHdoZW4gcG9wdXAgaXMgZXZva2VkLCB0aGF0IG1lYW5zIGl0IGNhbiBiZSBvdmVycmlkZGVuIGRpcmVjdGx5IHdoZW4gcG9wdXAgaXMgZXZva2VkLlxuICogRm9yIGltcGxlbWVudGF0aW9uIGxvb2s6IHtAbGluayBJQ29uZmlybUJveFVzZXJDb25maWd9LlxuICpcbiAqIEV4YW1wbGU6XG4gKiBgYGB0eXBlc2NyaXB0XG4gKiAvLyBhcHAubW9kdWxlIGltcG9ydHM6XG4gKkNvbmZpcm1Cb3hDb25maWdNb2R1bGUuZm9yUm9vdCh7XG4gKiAgICBDb25maXJtQm94Q29yZUNvbmZpZzoge1xuICogICAgICAgV2lkdGg6ICc3MDBweCcsXG4gKiAgICAgICBMYXlvdXRUeXBlOiBEaWFsb2dMYXlvdXREaXNwbGF5LkRBTkdFUixcbiAqICAgICAgIEJ1dHRvblBvc2l0aW9uOiAnY2VudGVyJ1xuICogICAgfSxcbiAqICAgIERpc3BhdGNoOiB7ICAvLyBPcHRpb25hbCBkZWZhdWx0IGRpc3BhdGNoIG9iamVjdC5cbiAqICAgICAgIFRpdGxlOiAnRGVmYXVsdCB0aXRsZScsXG4gKiAgICAgICBNZXNzYWdlOiAnRGVmYXVsdCBtZXNzYWdlJ1xuICogICAgfSxcbiAqICAgIEJ1dHRvbnMgICAgIDogW1xuICogICAgICAgbmV3IEJ1dHRvbk1ha2VyKCdPaycsICdvaycsIEJ1dHRvbkxheW91dERpc3BsYXkuUFJJTUFSWSksXG4gKiAgICAgICBuZXcgQnV0dG9uTWFrZXIoJ0NhbmNlbCcsICdjYW5jZWwnLCBCdXR0b25MYXlvdXREaXNwbGF5LlNFQ09OREFSWSlcbiAqICAgIF1cbiAqIH0pXG4gKiBgYGBcbiAqICogQ29uZmlybUJveENvcmVDb25maWc6IHtAbGluayBJQ29uZmlybUJveENvcmVDb25maWd9XG4gKiAqIERpc3BhdGNoOiB7QGxpbmsgSURpc3BhdGNofVxuICogKiBCdXR0b25zOiB7QGxpbmsgSUJ1dHRvbn1cbiAqICogQnV0dG9uTWFrZXI6IHtAbGluayBCdXR0b25NYWtlcn1cbiAqIEBjYXRlZ29yeSBJbXBvcnRzIGZvciBhbmd1bGFyIGFwcC5tb2R1bGVcbiAqL1xuZXhwb3J0IHtDb25maXJtQm94Q29uZmlnTW9kdWxlfSBmcm9tICcuL25neC1hd2Vzb21lLXBvcHVwL25neC1hd2Vzb21lLXBvcHVwLm1vZHVsZSc7XG4vKipcbiAqIFRoaXMgaXMgdGhlIG1vZHVsZSB0aGF0IGlnbml0ZXMgVG9hc3Qgbm90aWZpY2F0aW9ucyBkaWFsb2csIGl0cyBwdXJwb3NlIGlzIHRvIHNob3cgdG9hc3QgcG9wdXAgaW4gYVxuICogc21hbGwgZGlhbG9nIHdpbmRvdyBpbiB0aGUgY29ybmVyIG9mIHRoZSBzY3JlZW4uIFVzZXIgY2FuIHByb3ZpZGUgdGl0bGUgYW5kIG1lc3NhZ2UgYW5kIGluY2x1ZGUgYnV0dG9ucywgb3Igc2V0dXAgYXV0byBkaXNhcHBlYXJpbmcuXG4gKiBUb2FzdCBub3RpZmljYXRpb25zIGFyZSBhdmFpbGFibGUgaW4gcHJlZGVmaW5lZCBsYXlvdXQgdHlwZXMgKGVudW1zKToge0BsaW5rIERpYWxvZ0xheW91dERpc3BsYXl9LlxuICpcbiAqIEl0IGlzIGNydWNpYWwgZm9yIHVzZXIgdG8gYWRkIHRoaXMgbW9kdWxlIGluIGFuZ3VsYXIuYXBwIGltcG9ydHMuXG4gKiBCZWxvdyBpcyB0aGUgZXhhbXBsZSB3aXRoIChvcHRpb25hbCkgZGVmYXVsdCB1c2VyIGNvbmZpZ3VyYXRpb24sIHRoYXQncyB3aGF0IHdpbGwgYmUgdXNlZCBpZiB0aGVyZSBpcyBub1xuICogbG9jYWwgY29uZmlnIHdoZW4gcG9wdXAgaXMgZXZva2VkLCB0aGF0IG1lYW5zIGl0IGNhbiBiZSBvdmVycmlkZGVuIGRpcmVjdGx5IHdoZW4gcG9wdXAgaXMgZXZva2VkLlxuICogRm9yIGltcGxlbWVudGF0aW9uIGxvb2s6IHtAbGluayBJVG9hc3ROb3RpZmljYXRpb25Vc2VyQ29uZmlnfS5cbiAqXG4gKiBFeGFtcGxlOlxuICogYGBgdHlwZXNjcmlwdFxuICogLy8gYXBwLm1vZHVsZSBpbXBvcnRzOlxuICpUb2FzdE5vdGlmaWNhdGlvbkNvbmZpZ01vZHVsZS5mb3JSb290KHtcbiAqICAgIFRvYXN0Q29yZUNvbmZpZzoge1xuICogICAgICAgV2lkdGg6ICczMDBweCcsXG4gKiAgICB9LFxuICogICAgR2xvYmFsU2V0dGluZ3M6IHtcbiAqICAgICAgIC8vIFRoZSBudW1iZXIgb2YgdG9hc3Qgbm90aWZpY2F0aW9ucyB0aGF0IGNhbiBiZSBzaG93biBhdCBvbmNlLlxuICogICAgICAgQWxsb3dlZE5vdGlmaWNhdGlvbnNBdE9uY2U6IDQsXG4gKlxuICogICAgICAgIC8vIE1pbGxpc2Vjb25kcyBpdCB3aWxsIGJlIGlnbm9yZWQgaWYgYnV0dG9ucyBhcmUgaW5jbHVkZWQuXG4gKiAgICAgICBBdXRvQ2xvc2VEZWxheTogMzAwMFxuICogICAgfSxcbiAqICAgIC8vIE9wdGlvbmFsIGRlZmF1bHQgZGlzcGF0Y2ggb2JqZWN0LlxuICogICAgRGlzcGF0Y2g6IHtcbiAqICAgICAgVGl0bGU6ICdEZWZhdWx0IHRpdGxlJyxcbiAqICAgICAgTWVzc2FnZTogJ0RlZmF1bHQgbWVzc2FnZSdcbiAqICAgfSxcbiAqICAgQnV0dG9uczogW1xuICogICAgICBuZXcgQnV0dG9uTWFrZXIoJ09rJywgJ29rJywgQnV0dG9uTGF5b3V0RGlzcGxheS5QUklNQVJZKSxcbiAqICAgICAgbmV3IEJ1dHRvbk1ha2VyKCdDYW5jZWwnLCAnY2FuY2VsJywgQnV0dG9uTGF5b3V0RGlzcGxheS5TRUNPTkRBUlkpXG4gKiAgIF1cbiAqfSlcbiAqIGBgYFxuICogKiBUb2FzdENvcmVDb25maWc6IHtAbGluayBJVG9hc3RDb3JlQ29uZmlnfVxuICogKiBHbG9iYWxTZXR0aW5nczoge0BsaW5rIElHbG9iYWxUb2FzdFNldHRpbmdzfVxuICogKiBEaXNwYXRjaDoge0BsaW5rIElEaXNwYXRjaH1cbiAqICogQnV0dG9uczoge0BsaW5rIElCdXR0b259XG4gKiAqIEJ1dHRvbk1ha2VyOiB7QGxpbmsgQnV0dG9uTWFrZXJ9XG4gKiBAY2F0ZWdvcnkgSW1wb3J0cyBmb3IgYW5ndWxhciBhcHAubW9kdWxlXG4gKi9cbmV4cG9ydCB7VG9hc3ROb3RpZmljYXRpb25Db25maWdNb2R1bGV9IGZyb20gJy4vbmd4LWF3ZXNvbWUtcG9wdXAvbmd4LWF3ZXNvbWUtcG9wdXAubW9kdWxlJztcbi8vIGVuZHJlZ2lvblxuIl19