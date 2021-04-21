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
 * // Set desired Description.
 *newToastNotification.setDescription('Form is not valid!');
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
 * // Set desired message: _Title: string, _Description: string.
 *newConfirmBox.setMessage('Are you sure?', 'That action will delete user!');
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
 * small dialog window in the middle of the screen. User can provide title, description and include buttons.
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
 *    Message: {  // Optional default message object.
 *       Title: 'Default title',
 *       Description: 'Default description'
 *    },
 *    Buttons     : [
 *       new ButtonMaker('Ok', 'ok', ButtonLayoutDisplay.PRIMARY),
 *       new ButtonMaker('Cancel', 'cancel', ButtonLayoutDisplay.SECONDARY)
 *    ]
 * })
 * ```
 * * ConfirmBoxCoreConfig: {@link IConfirmBoxCoreConfig}
 * * Message: {@link IMessage}
 * * Buttons: {@link IButton}
 * * ButtonMaker: {@link ButtonMaker}
 * @category Imports for angular app.module
 */
export { ConfirmBoxConfigModule } from './ngx-awesome-popup/ngx-awesome-popup.module';
/**
 * This is the module that ignites Toast notifications dialog, its purpose is to show toast popup in a
 * small dialog window in the corner of the screen. User can provide title and message and include buttons, or setup auto disappearing.
 * Toast messages are available in predefined layout types (enums): {@link DialogLayoutDisplay}.
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
 *       // The number of toast messages that can be shown at once.
 *       AllowedMessagesAtOnce: 4,
 *
 *        // Milliseconds it will be ignored if buttons are included.
 *       AutoCloseDelay: 3000
 *    },
 *    // Optional default message object.
 *    Message: {
 *      Title: 'Default title',
 *      Description: 'Default description'
 *   },
 *   Buttons: [
 *      new ButtonMaker('Ok', 'ok', ButtonLayoutDisplay.PRIMARY),
 *      new ButtonMaker('Cancel', 'cancel', ButtonLayoutDisplay.SECONDARY)
 *   ]
 *})
 * ```
 * * ToastCoreConfig: {@link IToastCoreConfig}
 * * GlobalSettings: {@link IGlobalToastSettings}
 * * Message: {@link IMessage}
 * * Buttons: {@link IButton}
 * * ButtonMaker: {@link ButtonMaker}
 * @category Imports for angular app.module
 */
export { ToastNotificationConfigModule } from './ngx-awesome-popup/ngx-awesome-popup.module';
// endregion
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljX2FwaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3B1YmxpY19hcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFdBQVcsRUFBa0IsTUFBTSxpQ0FBaUMsQ0FBQztBQUM3RSxPQUFPLEVBQUMsZUFBZSxFQUFzQixNQUFNLGtEQUFrRCxDQUFDO0FBQ3RHLE9BQU8sRUFBQyxzQkFBc0IsRUFBNkIsTUFBTSx5REFBeUQsQ0FBQztBQUMzSCxPQUFPLEVBQUMsV0FBVyxFQUFrQixNQUFNLDZDQUE2QyxDQUFDO0FBTXpGLElBQU8sV0FBVyxHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUM7QUFLN0MsSUFBTyxxQkFBcUIsR0FBRyxlQUFlLENBQUMscUJBQXFCLENBQUM7QUFHckUsSUFBTyw0QkFBNEIsR0FBRyxzQkFBc0IsQ0FBQyw0QkFBNEIsQ0FBQztBQVMxRixJQUFPLGlCQUFpQixHQUFHLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQztBQUN6RCxJQUFPLGVBQWUsR0FBRyxXQUFXLENBQUMsZUFBZSxDQUFDO0FBcUJyRCxZQUFZO0FBRVosT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDbkUsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFJbkU7O0dBRUc7QUFDSCxPQUFPLEVBQUMsV0FBVyxFQUFDLENBQUM7QUFFckI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1ERztBQUNILE9BQU8sRUFBQyxlQUFlLEVBQUMsQ0FBQztBQXFCekIsWUFBWTtBQUVaLDZCQUE2QjtBQUU3Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtDRztBQUNILE9BQU8sRUFBQyw0QkFBNEIsRUFBQyxDQUFDO0FBQ3RDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1DRztBQUNILE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxDQUFDO0FBQy9COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOENHO0FBQ0gsT0FBTyxFQUFDLGlCQUFpQixFQUFDLENBQUM7QUFDM0IsWUFBWTtBQUVaLGdEQUFnRDtBQUNoRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFDSCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSw4Q0FBOEMsQ0FBQztBQUNuRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOEJHO0FBQ0gsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sOENBQThDLENBQUM7QUFDaEY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQ0c7QUFDSCxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSw4Q0FBOEMsQ0FBQztBQUNwRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Q0c7QUFDSCxPQUFPLEVBQUMsNkJBQTZCLEVBQUMsTUFBTSw4Q0FBOEMsQ0FBQztBQUMzRixZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtHbG9iYWxDbGFzcywgR2xvYmFsSW50ZXJmYWNlfSBmcm9tICcuL25neC1hd2Vzb21lLXBvcHVwL2NvcmUvZ2xvYmFsJztcbmltcG9ydCB7Q29uZmlybUJveENsYXNzLCBDb25maXJtQm94SW50ZXJmYWNlfSBmcm9tICcuL25neC1hd2Vzb21lLXBvcHVwL3R5cGVzL2NvbmZpcm0tYm94L2NvcmUvbW9kZWwnO1xuaW1wb3J0IHtUb2FzdE5vdGlmaWNhdGlvbkNsYXNzLCBUb2FzdE5vdGlmaWNhdGlvbkludGVyZmFjZX0gZnJvbSAnLi9uZ3gtYXdlc29tZS1wb3B1cC90eXBlcy90b2FzdC1ub3RpZmljYXRpb24vY29yZS9tb2RlbCc7XG5pbXBvcnQge0RpYWxvZ0NsYXNzLCBEaWFsb2dJbnRlcmZhY2V9IGZyb20gJy4vbmd4LWF3ZXNvbWUtcG9wdXAvdHlwZXMvZGlhbG9nL2NvcmUvbW9kZWwnO1xuXG5pbXBvcnQgSUJ1dHRvbiA9IEdsb2JhbEludGVyZmFjZS5JQnV0dG9uO1xuaW1wb3J0IElNZXNzYWdlID0gR2xvYmFsSW50ZXJmYWNlLklNZXNzYWdlO1xuaW1wb3J0IElHbG9iYWxVc2VyQ29uZmlnID0gR2xvYmFsSW50ZXJmYWNlLklHbG9iYWxVc2VyQ29uZmlnO1xuaW1wb3J0IElDb2xvclR5cGVzID0gR2xvYmFsSW50ZXJmYWNlLklDb2xvclR5cGVzO1xuaW1wb3J0IEJ1dHRvbk1ha2VyID0gR2xvYmFsQ2xhc3MuQnV0dG9uTWFrZXI7XG5cbmltcG9ydCBJQ29uZmlybUJveFB1YmxpY1Jlc3BvbnNlID0gQ29uZmlybUJveEludGVyZmFjZS5JQ29uZmlybUJveFB1YmxpY1Jlc3BvbnNlO1xuaW1wb3J0IElDb25maXJtQm94VXNlckNvbmZpZyA9IENvbmZpcm1Cb3hJbnRlcmZhY2UuSUNvbmZpcm1Cb3hVc2VyQ29uZmlnO1xuaW1wb3J0IElDb25maXJtQm94Q29yZUNvbmZpZyA9IENvbmZpcm1Cb3hJbnRlcmZhY2UuSUNvbmZpcm1Cb3hDb3JlQ29uZmlnO1xuaW1wb3J0IENvbmZpcm1Cb3hJbml0aWFsaXplciA9IENvbmZpcm1Cb3hDbGFzcy5Db25maXJtQm94SW5pdGlhbGl6ZXI7XG5cbmltcG9ydCBJVG9hc3ROb3RpZmljYXRpb25QdWJsaWNSZXNwb25zZSA9IFRvYXN0Tm90aWZpY2F0aW9uSW50ZXJmYWNlLklUb2FzdE5vdGlmaWNhdGlvblB1YmxpY1Jlc3BvbnNlO1xuaW1wb3J0IFRvYXN0Tm90aWZpY2F0aW9uSW5pdGlhbGl6ZXIgPSBUb2FzdE5vdGlmaWNhdGlvbkNsYXNzLlRvYXN0Tm90aWZpY2F0aW9uSW5pdGlhbGl6ZXI7XG5pbXBvcnQgSVRvYXN0Q29yZUNvbmZpZyA9IFRvYXN0Tm90aWZpY2F0aW9uSW50ZXJmYWNlLklUb2FzdENvcmVDb25maWc7XG5pbXBvcnQgSUdsb2JhbFRvYXN0U2V0dGluZ3MgPSBUb2FzdE5vdGlmaWNhdGlvbkludGVyZmFjZS5JR2xvYmFsVG9hc3RTZXR0aW5ncztcbmltcG9ydCBJVG9hc3ROb3RpZmljYXRpb25Vc2VyQ29uZmlnID0gVG9hc3ROb3RpZmljYXRpb25JbnRlcmZhY2UuSVRvYXN0Tm90aWZpY2F0aW9uVXNlckNvbmZpZztcblxuaW1wb3J0IElEaWFsb2dFdmVudHNDb250cm9sbGVyID0gRGlhbG9nSW50ZXJmYWNlLklEaWFsb2dFdmVudHNDb250cm9sbGVyO1xuaW1wb3J0IElEaWFsb2dQdWJsaWNSZXNwb25zZSA9IERpYWxvZ0ludGVyZmFjZS5JRGlhbG9nUHVibGljUmVzcG9uc2U7XG5pbXBvcnQgSURpYWxvZ1VzZXJDb25maWcgPSBEaWFsb2dJbnRlcmZhY2UuSURpYWxvZ1VzZXJDb25maWc7XG5pbXBvcnQgSURpYWxvZ0NvcmVDb25maWcgPSBEaWFsb2dJbnRlcmZhY2UuSURpYWxvZ0NvcmVDb25maWc7XG5pbXBvcnQgRGlhbG9nSW5pdGlhbGl6ZXIgPSBEaWFsb2dDbGFzcy5EaWFsb2dJbml0aWFsaXplcjtcbmltcG9ydCBEaWFsb2dCZWxvbmdpbmcgPSBEaWFsb2dDbGFzcy5EaWFsb2dCZWxvbmdpbmc7XG5cbi8vIHJlZ2lvbiAqKiogSW50ZXJmYWNlICoqKlxuZXhwb3J0IHtJR2xvYmFsVXNlckNvbmZpZ307XG5leHBvcnQge0lCdXR0b259O1xuZXhwb3J0IHtJTWVzc2FnZX07XG5leHBvcnQge0lDb2xvclR5cGVzfTtcblxuZXhwb3J0IHtJQ29uZmlybUJveFVzZXJDb25maWd9O1xuZXhwb3J0IHtJQ29uZmlybUJveENvcmVDb25maWd9O1xuZXhwb3J0IHtJQ29uZmlybUJveFB1YmxpY1Jlc3BvbnNlfTtcblxuZXhwb3J0IHtJR2xvYmFsVG9hc3RTZXR0aW5nc307XG5leHBvcnQge0lUb2FzdENvcmVDb25maWd9O1xuZXhwb3J0IHtJVG9hc3ROb3RpZmljYXRpb25Vc2VyQ29uZmlnfTtcbmV4cG9ydCB7SVRvYXN0Tm90aWZpY2F0aW9uUHVibGljUmVzcG9uc2V9O1xuXG5leHBvcnQge0lEaWFsb2dVc2VyQ29uZmlnfTtcbmV4cG9ydCB7SURpYWxvZ0NvcmVDb25maWd9O1xuZXhwb3J0IHtJRGlhbG9nUHVibGljUmVzcG9uc2V9O1xuZXhwb3J0IHtJRGlhbG9nRXZlbnRzQ29udHJvbGxlcn07XG4vLyBlbmRyZWdpb25cblxuZXhwb3J0IHtCdXR0b25MYXlvdXREaXNwbGF5fSBmcm9tICcuL25neC1hd2Vzb21lLXBvcHVwL2NvcmUvZW51bXMnO1xuZXhwb3J0IHtEaWFsb2dMYXlvdXREaXNwbGF5fSBmcm9tICcuL25neC1hd2Vzb21lLXBvcHVwL2NvcmUvZW51bXMnO1xuZXhwb3J0IHtWZXJ0aWNhbFBvc2l0aW9ufSBmcm9tICcuL25neC1hd2Vzb21lLXBvcHVwL2NvcmUvZW51bXMnO1xuXG5cbi8qKlxuICogQHJldHVybnMgSXQgd2lsbCByZXR1cm4gY3VzdG9tIGJ1dHRvbiBvYmplY3QgcmVhZHkgdG8gYmUgdXNlZCBpbiBjaGlsZCBjb21wb25lbnQgbGF5b3V0LlxuICovXG5leHBvcnQge0J1dHRvbk1ha2VyfTtcblxuLyoqXG4gKiBUaGlzIGlzIHRoZSBjbGFzcyB0aGF0IG5lZWRzIHRvIGJlIGFkZGVkIGFzIERJIGluIHRoZSBjb25zdHJ1Y3RvciBvZiBhIGNoaWxkIGNvbXBvbmVudCB0aGF0IHdpbGwgYmVcbiAqIG9wZW5lZCBkeW5hbWljYWxseSB3aXRoIHtAbGluayBEaWFsb2dJbml0aWFsaXplcn0uIEl0IGNvbnRhaW5zIHZhcmlvdXMgaW5mb3JtYXRpb24gb3JcbiAqIGV2ZW50IGNvbnRyb2xsZXJzLCBhbmQgbGlzdGVuZXJzIHRoYXQgY2FuIGJlIHVzZWQgaW4gYSBjaGlsZCBjb21wb25lbnQuIEFsc28sIHRoZXJlIGlzIGN1c3RvbSBkYXRhXG4gKiB0aGF0IGlzIHNlbnQgZnJvbSBjb21wb25lbnQgd2hlcmUgdGhlIHtAbGluayBEaWFsb2dJbml0aWFsaXplcn0gaXMuIFVzZXIgY2FuIHNldCBzcGVjaWZpYyB0eXBlIG9mXG4gKiBjdXN0b20gZGF0YSB0aGF0IGNoaWxkIGNvbXBvbmVudCB3aWxsIHJlY2VpdmUgYnkgaW5jbHVkaW5nIGl0IGFzIGdlbmVyaWMgdHlwZS5cbiAqXG4gKlxuICogRXhhbXBsZTpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqaW1wb3J0IHtEaWFsb2dCZWxvbmdpbmd9IGZyb20gJ25neC1hd2Vzb21lLXBvcHVwJztcbiAqQENvbXBvbmVudCh7XG4gKiAgICBzZWxlY3RvciAgIDogJ2FwcC1jdXAnLFxuICogICAgdGVtcGxhdGVVcmw6ICcuL2N1cC5jb21wb25lbnQuaHRtbCcsXG4gKiAgICBzdHlsZVVybHMgIDogWycuL2N1cC5jb21wb25lbnQuc2NzcyddXG4gKn0pXG4gKiBleHBvcnQgY2xhc3MgQ3VwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICpcbiAqICAgIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG4gKlxuICogICAgY29uc3RydWN0b3IocHJpdmF0ZSBkaWFsb2dCZWxvbmdpbmc6IERpYWxvZ0JlbG9uZ2luZykge1xuICogICAgfVxuICpcbiAqICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICogICAgY29uc29sZS5sb2codGhpcy5kaWFsb2dCZWxvbmdpbmcpO1xuICpcbiAqICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAqICAgICAgICAgICAgdGhpcy5kaWFsb2dCZWxvbmdpbmcuRXZlbnRzQ29udHJvbGxlci5vbkJ1dHRvbkNsaWNrJC5zdWJzY3JpYmUoKF9CdXR0b24pID0+IHtcbiAqICAgICAgICAgICAgaWYgKF9CdXR0b24uSUQgPT09ICdvaycpIHtcbiAqICAgICAgICAgICAgICAgIC8vIERvIHNvbWUgbG9naWMgYW5kIGNsb3NlIHBvcHVwLlxuICogICAgICAgICAgICAgICAgdGhpcy5kaWFsb2dCZWxvbmdpbmcuRXZlbnRzQ29udHJvbGxlci5jbG9zZSgpO1xuICogICAgICAgICAgICB9IGVsc2UgaWYgKF9CdXR0b24uSUQgPT09ICdjYW5jZWwnKSB7XG4gKiAgICAgICAgICAgICAgICAvLyBEbyBzb21lIGxvZ2ljIGFuZCBjbG9zZSBwb3B1cC5cbiAqICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9nQmVsb25naW5nLkV2ZW50c0NvbnRyb2xsZXIuY2xvc2UoKTtcbiAqICAgICAgICAgICAgfVxuICogICAgICAgIH0pXG4gKiAgICAgICAgKTtcbiAqXG4gKiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gKiAgICAgICAgICAgIC8vIENsb3NlIGxvYWRlciBhZnRlciBhc3luYyBkYXRhIGlzIHJlYWR5LlxuICogICAgICAgICAgICB0aGlzLmRpYWxvZ0JlbG9uZ2luZy5FdmVudHNDb250cm9sbGVyLmNsb3NlTG9hZGVyKCk7XG4gKiAgICAgICAgfSwgMTAwMCk7XG4gKiAgICB9XG4gKn1cbiBcbiBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgLy8gQ2xvc2UgYWxsIHN1YnNjcmlwdGlvbnMuXG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHN1YiA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XG4gICAgfVxuICogYGBgXG4gKiBAY2F0ZWdvcnkgY2hpbGQgZHluYW1pYyBjb21wb25lbnQgZGF0YSAmIGV2ZW50IGNvbnRyb2xsZXJcbiAqL1xuZXhwb3J0IHtEaWFsb2dCZWxvbmdpbmd9O1xuXG4vLyByZWdpb24gKioqIE9ic2VydmFibGUgcmVzcG9uc2UgYWZ0ZXIgY2xvc2luZyBwb3B1cCAqKipcbi8qKlxuICogUmVndWxhciBkZXNjcmlwdGlvblxuICpcbiAqIEBjYXRlZ29yeSBPYnNlcnZhYmxlIHJlc3BvbnNlIGFmdGVyIGNsb3NpbmcgcG9wdXBcbiAqL1xuZXhwb3J0IHtJVG9hc3ROb3RpZmljYXRpb25QdWJsaWNSZXNwb25zZSBhcyBJVG9hc3ROb3RpZmljYXRpb25SZXNwb25zZX07XG4vKipcbiAqIFJlZ3VsYXIgZGVzY3JpcHRpb25cbiAqXG4gKiBAY2F0ZWdvcnkgT2JzZXJ2YWJsZSByZXNwb25zZSBhZnRlciBjbG9zaW5nIHBvcHVwXG4gKi9cbmV4cG9ydCB7SUNvbmZpcm1Cb3hQdWJsaWNSZXNwb25zZSBhcyBJQ29uZmlybUJveFJlc3BvbnNlfTtcbi8qKlxuICogUmVndWxhciBkZXNjcmlwdGlvblxuICpcbiAqIEBjYXRlZ29yeSBPYnNlcnZhYmxlIHJlc3BvbnNlIGFmdGVyIGNsb3NpbmcgcG9wdXBcbiAqL1xuZXhwb3J0IHtJRGlhbG9nUHVibGljUmVzcG9uc2UgYXMgSURpYWxvZ1Jlc3BvbnNlfTtcbi8vIGVuZHJlZ2lvblxuXG4vLyByZWdpb24gKioqIFBvcHVwIG9wZW4gICoqKlxuXG4vKipcbiAqIFRoaXMgaXMgdGhlIGNsYXNzIHRoYXQgbmVlZHMgdG8gYmUgaW5zdGFudGlhdGVkIHRvIHNldCB1cCBhbmQgaWduaXRlIGEgVG9hc3ROb3RpZmljYXRpb24sXG4gKiBpdHMgcHVycG9zZSBpcyB0byBzaG93IHNob3J0IG5vdGlmaWNhdGlvbiB0byBlbmQtdXNlciwgb3IgZXZlbiBpbnRlcmFjdCB3aXRoIHVzZXIuXG4gKiBJdCBjYW4gYmUgZXZva2VkIGZyb20gYW55IGFuZ3VsYXIgdHlwZXNjcmlwdCBmaWxlLlxuICpcbiAqIEJlbG93IGlzIHRoZSBleGFtcGxlIHdpdGggKHNvbWUgb3B0aW9uYWwpIHVzZXIgY29uZmlndXJhdGlvbixcbiAqIGl0IHdpbGwgb3ZlcnJpZGUgZGVmYXVsdCBjb25maWd1cmF0aW9uIGZyb20gYXBwLm1vZHVsZS5cbiAqXG4gKlxuICogRXhhbXBsZTpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIC8vIENyZWF0ZSB0aGUgaW5pdGlhbGl6ZXIuXG4gKmNvbnN0IG5ld1RvYXN0Tm90aWZpY2F0aW9uID0gbmV3IFRvYXN0Tm90aWZpY2F0aW9uSW5pdGlhbGl6ZXIoKTtcbiAqXG4gKiAvLyBTZXQgZGVzaXJlZCBUaXRsZS5cbiAqbmV3VG9hc3ROb3RpZmljYXRpb24uc2V0VGl0bGUoJ1dhcm5pbmchJyk7XG4gKlxuICogLy8gU2V0IGRlc2lyZWQgRGVzY3JpcHRpb24uXG4gKm5ld1RvYXN0Tm90aWZpY2F0aW9uLnNldERlc2NyaXB0aW9uKCdGb3JtIGlzIG5vdCB2YWxpZCEnKTtcbiAqXG4gKiAvLyBTZXQgZGVzaXJlZCBjb25maWd1cmF0aW9uLlxuICpuZXdUb2FzdE5vdGlmaWNhdGlvbi5zZXRDb25maWcoe1xuICogICAgICBMYXlvdXRUeXBlOiBEaWFsb2dMYXlvdXREaXNwbGF5LldBUk5JTkdcbiAqICAgfSk7XG4gXG4gKiAvLyBPcGVuIGEgVG9hc3ROb3RpZmljYXRpb24uXG4gKiBuZXdDb25maXJtQm94Lm9wZW5Db25maXJtQm94JCgpLnN1YnNjcmliZShyZXNwID0+IHtcbiAqICAgY29uc29sZS5sb2coJ2NvbmZpcm1Cb3ggcmVzcG9uc2U6ICcsIHJlc3ApO1xuICogIH0pO1xuICogYGBgXG4gKiAqIElUb2FzdENvcmVDb25maWc6IHtAbGluayBJVG9hc3RDb3JlQ29uZmlnfVxuICogKiBMYXlvdXRUeXBlOiB7QGxpbmsgRGlhbG9nTGF5b3V0RGlzcGxheX1cbiAqICogSVRvYXN0Tm90aWZpY2F0aW9uUHVibGljUmVzcG9uc2U6IHtAbGluayBJVG9hc3ROb3RpZmljYXRpb25QdWJsaWNSZXNwb25zZX1cbiAqIEBjYXRlZ29yeSBQb3B1cCBvcGVuXG4gKi9cbmV4cG9ydCB7VG9hc3ROb3RpZmljYXRpb25Jbml0aWFsaXplcn07XG4vKipcbiAqIFRoaXMgaXMgdGhlIGNsYXNzIHRoYXQgbmVlZHMgdG8gYmUgaW5zdGFudGlhdGVkIHRvIHNldCB1cCBhbmQgaWduaXRlIGEgQ29uZmlybUJveCBhbmQgY3JlYXRlIGNvbnRlbnQuXG4gKiBJdHMgcHVycG9zZSBpcyB0byBnZXQgY29uZmlybWF0aW9uIHJlc3BvbnNlIGZyb20gZW5kLXVzZXIuIEl0IGNhbiBiZSBjYWxsZWQgZnJvbSBhbnkgYW5ndWxhclxuICogdHlwZXNjcmlwdCBmaWxlLlxuICpcbiAqIEJlbG93IGlzIGV4YW1wbGUgd2l0aCAoc29tZSBvcHRpb25hbCkgdXNlciBjb25maWd1cmF0aW9uLFxuICogaXQgd2lsbCBvdmVycmlkZSBkZWZhdWx0IGNvbmZpZ3VyYXRpb24gZnJvbSBhcHAubW9kdWxlLlxuICpcbiAqXG4gKiBFeGFtcGxlOlxuICogYGBgdHlwZXNjcmlwdFxuICogLy8gQ3JlYXRlIHRoZSBpbml0aWFsaXplci5cbiAqY29uc3QgbmV3Q29uZmlybUJveCA9IG5ldyBDb25maXJtQm94SW5pdGlhbGl6ZXIoKTtcbiAqXG4gKiAvLyBTZXQgZGVzaXJlZCBtZXNzYWdlOiBfVGl0bGU6IHN0cmluZywgX0Rlc2NyaXB0aW9uOiBzdHJpbmcuXG4gKm5ld0NvbmZpcm1Cb3guc2V0TWVzc2FnZSgnQXJlIHlvdSBzdXJlPycsICdUaGF0IGFjdGlvbiB3aWxsIGRlbGV0ZSB1c2VyIScpO1xuICpcbiAqIC8vIFNldCBkZXNpcmVkIGNvbmZpZ3VyYXRpb24uXG4gKm5ld0NvbmZpcm1Cb3guc2V0Q29uZmlnKHtcbiAqICAgICAgTGF5b3V0VHlwZTogRGlhbG9nTGF5b3V0RGlzcGxheS5EQU5HRVJcbiAqICAgfSk7XG4gKlxuICogLy8gU2V0IGJ1dHRvbiBsYWJlbHMuXG4gKiBuZXdDb25maXJtQm94LnNldEJ1dHRvbkxhYmVscygnWUVTJywgJ05PJyk7XG4gKlxuICogLy8gT3BlbiBhIENvbmZpcm1Cb3gsIGFuZCBnZXQgY2xpY2tlZCBidXR0b24taWQgaW4gcmVzcG9uc2UuXG4gKiBuZXdDb25maXJtQm94Lm9wZW5Db25maXJtQm94JCgpLnN1YnNjcmliZShyZXNwID0+IHtcbiAqICAgLy8gSUNvbmZpcm1Cb3hQdWJsaWNSZXNwb25zZVxuICogICBjb25zb2xlLmxvZygnY29uZmlybUJveCByZXNwb25zZTogJywgcmVzcCk7XG4gKiAgfSk7XG4gKiBgYGBcbiAqICogSUNvbmZpcm1Cb3hDb3JlQ29uZmlnOiB7QGxpbmsgSUNvbmZpcm1Cb3hDb3JlQ29uZmlnfVxuICogKiBMYXlvdXRUeXBlOiB7QGxpbmsgRGlhbG9nTGF5b3V0RGlzcGxheX1cbiAqICogSUNvbmZpcm1Cb3hQdWJsaWNSZXNwb25zZToge0BsaW5rIElDb25maXJtQm94UHVibGljUmVzcG9uc2V9XG4gKiBAY2F0ZWdvcnkgUG9wdXAgb3BlblxuICovXG5leHBvcnQge0NvbmZpcm1Cb3hJbml0aWFsaXplcn07XG4vKipcbiAqIFRoaXMgaXMgdGhlIGNsYXNzIHRoYXQgbmVlZHMgdG8gYmUgaW5zdGFudGlhdGVkIHRvIHNldCB1cCBhbmQgaWduaXRlIGEgRGlhbG9nIGFuZCBjcmVhdGUgZHluYW1pYyBjb21wb25lbnQsXG4gKiBpdHMgcHVycG9zZSBpcyB0byByZW5kZXIgYW55IGFuZ3VsYXIgY29tcG9uZW50IHZpZXcgd2l0aCBzcGVjaWZpYyBjb25maWd1cmF0aW9uIGZyb20gYW55IGFuZ3VsYXIgdHlwZXNjcmlwdCBmaWxlLlxuICogRHluYW1pYyBjb21wb25lbnQgbWVhbnMgdGhhdCB1c2VyIGNhbiBldm9rZSB0aGUgcG9wdXAgZnJvbSB0eXBlc2NyaXB0IGFuZCBjb21wb25lbnQgdmlld1xuICogaXMgZHluYW1pY2FsbHkgY3JlYXRlZCB3aXRoIHRoZSBBd2Vzb21lIFBvcHVwIGVuZ2luZS4gVGhlcmUgaXMgbm8gbmVlZCB0byBjYWxsIGFueSBzZWxlY3RvciBpbiBIVE1MIHRvIGNyZWF0ZSBjb21wb25lbnQgdmlldy5cbiAqXG4gKiBEaWFsb2dJbml0aWFsaXplciBjYW4gc2VuZCBkYXRhIHRvIGNoaWxkIGNvbXBvbmVudCAoZHluYW1pYyBjb21wb25lbnQpIHdoZXJlIGRhdGEgd2lsbCBiZSBhY2Nlc3NpYmxlIHdpdGgge0BsaW5rIERpYWxvZ0JlbG9uZ2luZ30uXG4gKlxuICogQmVsb3cgaXMgdGhlIGV4YW1wbGUgd2l0aCAoc29tZSBvcHRpb25hbCkgdXNlciBjb25maWd1cmF0aW9uLFxuICogaXQgd2lsbCBvdmVycmlkZSBkZWZhdWx0IGNvbmZpZ3VyYXRpb24gZnJvbSBhcHAubW9kdWxlLlxuICpcbiAqXG4gKiBFeGFtcGxlOlxuICogYGBgdHlwZXNjcmlwdFxuICogIGltcG9ydCB7RGlhbG9nSW5pdGlhbGl6ZXIsIERpYWxvZ0xheW91dERpc3BsYXksIEJ1dHRvbk1ha2VyLCBCdXR0b25MYXlvdXREaXNwbGF5fSBmcm9tICduZ3gtYXdlc29tZS1wb3B1cCc7PFxuICogIGltcG9ydCB7Q3VwQ29tcG9uZW50fSBmcm9tICcuL2N1cC9jdXAuY29tcG9uZW50JztcbiAqXG4gKiAgY29uc3QgbmV3RGlhbG9nUG9wdXAgPSBuZXcgRGlhbG9nSW5pdGlhbGl6ZXIoQ3VwQ29tcG9uZW50KTsgLy8gQW55IEFuZ3VsYXIgY29tcG9uZW50LlxuICpcbiAqICAvLyBDdXN0b20gZGF0YSB3aWxsIGJlIHNlbnQgdG8gZHluYW1pYyBjb21wb25lbnQgYXZhaWxhYmxlIGluIGRpYWxvZ0JlbG9uZ2luZyBvYmplY3QuXG4gKiAgbmV3RGlhbG9nUG9wdXAuc2V0Q3VzdG9tRGF0YSh7bmFtZTogJ0pvaG4nLCBzdXJuYW1lOiAnRG9lJywgaWQ6IDF9KTtcbiAqXG4gKiAgLy8gTG9jYWwgY29uZmlnIHNldHRpbmdzIElEaWFsb2dDb3JlQ29uZmlnLlxuICogIG5ld0RpYWxvZ1BvcHVwLnNldENvbmZpZyh7XG4gKiAgICAgIEhlaWdodDogJzUwMHB4JyxcbiAqICAgICAgTGF5b3V0VHlwZTogRGlhbG9nTGF5b3V0RGlzcGxheS5JTkZPLFxuICogICAgICBMb2FkZXJDb21wb25lbnQ6IEFueSBBbmd1bGFyIGNvbXBvbmVudCBuYW1lXG4gKiAgICAgICB9KTtcbiAqXG4gKiAgLy8gQ3VzdG9tIGJ1dHRvbnMsIGxpc3RlbmVyIGlzIGF2YWlsYWJsZSBpbiBjaGlsZCBjb21wb25lbnQgaW4gZGlhbG9nQmVsb25naW5nIG9iamVjdC5cbiAqICBuZXdEaWFsb2dQb3B1cC5zZXRCdXR0b25zKFtcbiAqICAgICAgbmV3IEJ1dHRvbk1ha2VyKCdPaycsICdvaycsIEJ1dHRvbkxheW91dERpc3BsYXkuUFJJTUFSWSksXG4gKiAgICAgIG5ldyBCdXR0b25NYWtlcignQ2FuY2VsJywgJ2NhbmNlbCcsIEJ1dHRvbkxheW91dERpc3BsYXkuU0VDT05EQVJZKVxuICogIF0pO1xuICpcbiAqICAvLyBDb21tYW5kIHRvIG9wZW4gZGlhbG9nLCBpdCByZXR1cm5zIG9ic2VydmFibGUuXG4gKiAgbmV3RGlhbG9nUG9wdXAub3BlbkRpYWxvZyQ8YW55PigpLnN1YnNjcmliZShyZXNwID0+IHtcbiAqICAgICAgICAgICBjb25zb2xlLmxvZygncmVzcG9uc2U6ICcsIHJlc3AuUGF5bG9hZCk7XG4gKiAgICAgICB9KTtcbiAqIGBgYFxuICogKiBJRGlhbG9nQ29yZUNvbmZpZzoge0BsaW5rIElEaWFsb2dDb3JlQ29uZmlnfVxuICogKiBMYXlvdXRUeXBlOiB7QGxpbmsgRGlhbG9nTGF5b3V0RGlzcGxheX1cbiAqICogQnV0dG9uTGF5b3V0RGlzcGxheToge0BsaW5rIEJ1dHRvbkxheW91dERpc3BsYXl9XG4gKiAqIEJ1dHRvbk1ha2VyOiB7QGxpbmsgQnV0dG9uTWFrZXJ9XG4gKiAqIElEaWFsb2dQdWJsaWNSZXNwb25zZToge0BsaW5rIElEaWFsb2dQdWJsaWNSZXNwb25zZX1cbiAqIEBjYXRlZ29yeSBQb3B1cCBvcGVuXG4gKi9cbmV4cG9ydCB7RGlhbG9nSW5pdGlhbGl6ZXJ9O1xuLy8gZW5kcmVnaW9uXG5cbi8vIHJlZ2lvbiAqKiogSW1wb3J0cyBmb3IgYW5ndWxhciBhcHAubW9kdWxlICoqKlxuLyoqXG4gKiBUaGlzIGlzIHRoZSBtYWluIG1vZHVsZSBvZiB0aGUgbGlicmFyeSwgaXQgaXMgY3J1Y2lhbCB0byBiZSBhZGRlZCB3aXRoaW4gYW5ndWxhci5hcHBcbiAqIGltcG9ydHMgYXMgYW4gZXhhbXBsZSB3aXRoIG9wdGlvbmFsIGFyZ3VtZW50LCBsb29rOiB7QGxpbmsgSUdsb2JhbFVzZXJDb25maWd9XG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogLy8gYXBwLm1vZHVsZSBpbXBvcnRzOlxuICogTmd4QXdlc29tZVBvcHVwTW9kdWxlLmZvclJvb3Qoe1xuICogICAgIENvbG9yTGlzdDoge1xuICogICAgICAgICAgICBQcmltYXJ5ICA6ICcjZmY5ZTAwJywgLy8gb3B0aW9uYWxcbiAqICAgICAgICAgICAgU2Vjb25kYXJ5OiAnIzk4OWVhNScsIC8vIG9wdGlvbmFsXG4gKiAgICAgICAgICAgIEluZm8gICAgIDogJyMyZjhlZTUnLCAvLyBvcHRpb25hbFxuICogICAgICAgICAgICBTdWNjZXNzICA6ICcjM2NhZWEzJywgLy8gb3B0aW9uYWxcbiAqICAgICAgICAgICAgV2FybmluZyAgOiAnI2ZmYzEwNycsIC8vIG9wdGlvbmFsXG4gKiAgICAgICAgICAgIERhbmdlciAgIDogJyNlNDY0NjQnLCAvLyBvcHRpb25hbFxuICogICAgICAgICAgICBMaWdodCAgICA6ICcjZmJmYmZiJywgLy8gb3B0aW9uYWxcbiAqICAgICAgICAgICAgRGFyayAgICAgOiAnIzM0M2E0MCcgIC8vIG9wdGlvbmFsXG4gKiAgICAgICAgICAgfVxuICogfSlcbiAqIGBgYFxuICogQGNhdGVnb3J5IEltcG9ydHMgZm9yIGFuZ3VsYXIgYXBwLm1vZHVsZVxuICovXG5leHBvcnQge05neEF3ZXNvbWVQb3B1cE1vZHVsZX0gZnJvbSAnLi9uZ3gtYXdlc29tZS1wb3B1cC9uZ3gtYXdlc29tZS1wb3B1cC5tb2R1bGUnO1xuLyoqXG4gKiBUaGlzIGlzIHRoZSBtb2R1bGUgdGhhdCBpZ25pdGVzIGR5bmFtaWMgZGlhbG9nIG1vZGFsLCBpdHMgcHVycG9zZSBpcyB0byBsb2FkIGFueSBhbmd1bGFyIGNvbXBvbmVudCBpblxuICogZGlhbG9nIHdpbmRvdy4gRHluYW1pYyBjb21wb25lbnQgbWVhbnMgdGhhdCB1c2VyIGNhbiBldm9rZSBhbnkgQW5ndWxhciBjb21wb25lbnQgaW4gdGhlIHBvcHVwIGp1c3QgZnJvbSB0eXBlc2NyaXB0LiBDb21wb25lbnQgdmlld1xuICogaXMgZHluYW1pY2FsbHkgY3JlYXRlZCB3aXRoIHRoZSBsaWJyYXJ5IGVuZ2luZSBhbmQgdGhlcmUgaXMgbm8gbmVlZCB0byBjYWxsIGFueSBzZWxlY3RvciBpbiBIVE1MIHRvIGNyZWF0ZSBjb21wb25lbnQgdmlldy5cbiAqXG4gKiBJdCBpcyBjcnVjaWFsIGZvciB1c2VyIHRvIGFkZCB0aGlzIG1vZHVsZSBpbiBhbmd1bGFyLmFwcCBpbXBvcnRzLlxuICogQmVsb3cgaXMgdGhlIGV4YW1wbGUgd2l0aCAob3B0aW9uYWwpIGRlZmF1bHQgdXNlciBjb25maWd1cmF0aW9uLCB0aGF0IGlzIHdoYXQgd2lsbCBiZSBpbiBzZXR1cCBpZiB0aGVyZSBpcyBub1xuICogbG9jYWwgY29uZmlnIHdoZW4gcG9wdXAgaXMgZXZva2VkLCB0aGF0IG1lYW5zIGl0IGNhbiBiZSBvdmVycmlkZGVuIGRpcmVjdGx5IHdoZW4gcG9wdXAgaXMgY2FsbGVkLlxuICogRm9yIGltcGxlbWVudGF0aW9uIGxvb2s6IHtAbGluayBJRGlhbG9nVXNlckNvbmZpZ30uXG4gKlxuICogRXhhbXBsZTpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIC8vIGFwcC5tb2R1bGUgaW1wb3J0czpcbiAqRGlhbG9nQ29uZmlnTW9kdWxlLmZvclJvb3Qoe1xuICogICAgIERpYWxvZ0NvcmVDb25maWc6IHtcbiAqICAgICAgICBXaWR0aCAgICAgICAgOiAnNTAwcHgnLFxuICogICAgICAgIEJ1dHRvblBvc2l0aW9uOiAncmlnaHQnLFxuICogICAgICAgIExheW91dFR5cGU6IERpYWxvZ0xheW91dERpc3BsYXkuSU5GTyxcbiAqICAgICAgICBMb2FkZXJDb21wb25lbnQ6IC8vIEFueSBhbmd1bGFyIGNvbXBvbmVudCBjbGFzcyBuYW1lIGNhbiBiZSBpbmNsdWRlZCBhcyBhIGxvYWRlci5cbiAqICAgICB9LFxuICogICAgIEJ1dHRvbnM6IFtcbiAqICAgICAgICBuZXcgQnV0dG9uTWFrZXIoJ09rJywgJ29rJywgQnV0dG9uTGF5b3V0RGlzcGxheS5QUklNQVJZKSxcbiAqICAgICAgICBuZXcgQnV0dG9uTWFrZXIoJ0NhbmNlbCcsICdjYW5jZWwnLCBCdXR0b25MYXlvdXREaXNwbGF5LlNFQ09OREFSWSlcbiAqICAgICBdLFxuICogfSlcbiAqIGBgYFxuICogKiBEaWFsb2dDb3JlQ29uZmlnLkxheW91dFR5cGU6IHtAbGluayBEaWFsb2dMYXlvdXREaXNwbGF5fVxuICogKiBCdXR0b25MYXlvdXREaXNwbGF5OiB7QGxpbmsgQnV0dG9uTGF5b3V0RGlzcGxheX1cbiAqICogQnV0dG9uTWFrZXI6IHtAbGluayBCdXR0b25NYWtlcn1cbiAqIEBjYXRlZ29yeSBJbXBvcnRzIGZvciBhbmd1bGFyIGFwcC5tb2R1bGVcbiAqL1xuZXhwb3J0IHtEaWFsb2dDb25maWdNb2R1bGV9IGZyb20gJy4vbmd4LWF3ZXNvbWUtcG9wdXAvbmd4LWF3ZXNvbWUtcG9wdXAubW9kdWxlJztcbi8qKlxuICogVGhpcyBpcyB0aGUgbW9kdWxlIHRoYXQgaWduaXRlcyBDb25maXJtIGJveCBkaWFsb2csIGl0cyBwdXJwb3NlIGlzIHRvIHNob3cgcG9wdXAgaW4gYVxuICogc21hbGwgZGlhbG9nIHdpbmRvdyBpbiB0aGUgbWlkZGxlIG9mIHRoZSBzY3JlZW4uIFVzZXIgY2FuIHByb3ZpZGUgdGl0bGUsIGRlc2NyaXB0aW9uIGFuZCBpbmNsdWRlIGJ1dHRvbnMuXG4gKiBDb25maXJtIGJveCBpcyBhdmFpbGFibGUgaW4gcHJlZGVmaW5lZCBsYXlvdXQgdHlwZXMgKGVudW1zKToge0BsaW5rIERpYWxvZ0xheW91dERpc3BsYXl9LlxuICpcbiAqIEl0IGlzIGNydWNpYWwgZm9yIHVzZXIgdG8gYWRkIHRoaXMgbW9kdWxlIGluIGFuZ3VsYXIuYXBwIGltcG9ydHMuXG4gKiBCZWxvdyBpcyB0aGUgZXhhbXBsZSB3aXRoIChvcHRpb25hbCkgZGVmYXVsdCB1c2VyIGNvbmZpZ3VyYXRpb24sIHRoYXQncyB3aGF0IHdpbGwgYmUgdXNlZCBpZiB0aGVyZSBpcyBub1xuICogbG9jYWwgY29uZmlnIHdoZW4gcG9wdXAgaXMgZXZva2VkLCB0aGF0IG1lYW5zIGl0IGNhbiBiZSBvdmVycmlkZGVuIGRpcmVjdGx5IHdoZW4gcG9wdXAgaXMgZXZva2VkLlxuICogRm9yIGltcGxlbWVudGF0aW9uIGxvb2s6IHtAbGluayBJQ29uZmlybUJveFVzZXJDb25maWd9LlxuICpcbiAqIEV4YW1wbGU6XG4gKiBgYGB0eXBlc2NyaXB0XG4gKiAvLyBhcHAubW9kdWxlIGltcG9ydHM6XG4gKkNvbmZpcm1Cb3hDb25maWdNb2R1bGUuZm9yUm9vdCh7XG4gKiAgICBDb25maXJtQm94Q29yZUNvbmZpZzoge1xuICogICAgICAgV2lkdGg6ICc3MDBweCcsXG4gKiAgICAgICBMYXlvdXRUeXBlOiBEaWFsb2dMYXlvdXREaXNwbGF5LkRBTkdFUixcbiAqICAgICAgIEJ1dHRvblBvc2l0aW9uOiAnY2VudGVyJ1xuICogICAgfSxcbiAqICAgIE1lc3NhZ2U6IHsgIC8vIE9wdGlvbmFsIGRlZmF1bHQgbWVzc2FnZSBvYmplY3QuXG4gKiAgICAgICBUaXRsZTogJ0RlZmF1bHQgdGl0bGUnLFxuICogICAgICAgRGVzY3JpcHRpb246ICdEZWZhdWx0IGRlc2NyaXB0aW9uJ1xuICogICAgfSxcbiAqICAgIEJ1dHRvbnMgICAgIDogW1xuICogICAgICAgbmV3IEJ1dHRvbk1ha2VyKCdPaycsICdvaycsIEJ1dHRvbkxheW91dERpc3BsYXkuUFJJTUFSWSksXG4gKiAgICAgICBuZXcgQnV0dG9uTWFrZXIoJ0NhbmNlbCcsICdjYW5jZWwnLCBCdXR0b25MYXlvdXREaXNwbGF5LlNFQ09OREFSWSlcbiAqICAgIF1cbiAqIH0pXG4gKiBgYGBcbiAqICogQ29uZmlybUJveENvcmVDb25maWc6IHtAbGluayBJQ29uZmlybUJveENvcmVDb25maWd9XG4gKiAqIE1lc3NhZ2U6IHtAbGluayBJTWVzc2FnZX1cbiAqICogQnV0dG9uczoge0BsaW5rIElCdXR0b259XG4gKiAqIEJ1dHRvbk1ha2VyOiB7QGxpbmsgQnV0dG9uTWFrZXJ9XG4gKiBAY2F0ZWdvcnkgSW1wb3J0cyBmb3IgYW5ndWxhciBhcHAubW9kdWxlXG4gKi9cbmV4cG9ydCB7Q29uZmlybUJveENvbmZpZ01vZHVsZX0gZnJvbSAnLi9uZ3gtYXdlc29tZS1wb3B1cC9uZ3gtYXdlc29tZS1wb3B1cC5tb2R1bGUnO1xuLyoqXG4gKiBUaGlzIGlzIHRoZSBtb2R1bGUgdGhhdCBpZ25pdGVzIFRvYXN0IG5vdGlmaWNhdGlvbnMgZGlhbG9nLCBpdHMgcHVycG9zZSBpcyB0byBzaG93IHRvYXN0IHBvcHVwIGluIGFcbiAqIHNtYWxsIGRpYWxvZyB3aW5kb3cgaW4gdGhlIGNvcm5lciBvZiB0aGUgc2NyZWVuLiBVc2VyIGNhbiBwcm92aWRlIHRpdGxlIGFuZCBtZXNzYWdlIGFuZCBpbmNsdWRlIGJ1dHRvbnMsIG9yIHNldHVwIGF1dG8gZGlzYXBwZWFyaW5nLlxuICogVG9hc3QgbWVzc2FnZXMgYXJlIGF2YWlsYWJsZSBpbiBwcmVkZWZpbmVkIGxheW91dCB0eXBlcyAoZW51bXMpOiB7QGxpbmsgRGlhbG9nTGF5b3V0RGlzcGxheX0uXG4gKlxuICogSXQgaXMgY3J1Y2lhbCBmb3IgdXNlciB0byBhZGQgdGhpcyBtb2R1bGUgaW4gYW5ndWxhci5hcHAgaW1wb3J0cy5cbiAqIEJlbG93IGlzIHRoZSBleGFtcGxlIHdpdGggKG9wdGlvbmFsKSBkZWZhdWx0IHVzZXIgY29uZmlndXJhdGlvbiwgdGhhdCdzIHdoYXQgd2lsbCBiZSB1c2VkIGlmIHRoZXJlIGlzIG5vXG4gKiBsb2NhbCBjb25maWcgd2hlbiBwb3B1cCBpcyBldm9rZWQsIHRoYXQgbWVhbnMgaXQgY2FuIGJlIG92ZXJyaWRkZW4gZGlyZWN0bHkgd2hlbiBwb3B1cCBpcyBldm9rZWQuXG4gKiBGb3IgaW1wbGVtZW50YXRpb24gbG9vazoge0BsaW5rIElUb2FzdE5vdGlmaWNhdGlvblVzZXJDb25maWd9LlxuICpcbiAqIEV4YW1wbGU6XG4gKiBgYGB0eXBlc2NyaXB0XG4gKiAvLyBhcHAubW9kdWxlIGltcG9ydHM6XG4gKlRvYXN0Tm90aWZpY2F0aW9uQ29uZmlnTW9kdWxlLmZvclJvb3Qoe1xuICogICAgVG9hc3RDb3JlQ29uZmlnOiB7XG4gKiAgICAgICBXaWR0aDogJzMwMHB4JyxcbiAqICAgIH0sXG4gKiAgICBHbG9iYWxTZXR0aW5nczoge1xuICogICAgICAgLy8gVGhlIG51bWJlciBvZiB0b2FzdCBtZXNzYWdlcyB0aGF0IGNhbiBiZSBzaG93biBhdCBvbmNlLlxuICogICAgICAgQWxsb3dlZE1lc3NhZ2VzQXRPbmNlOiA0LFxuICpcbiAqICAgICAgICAvLyBNaWxsaXNlY29uZHMgaXQgd2lsbCBiZSBpZ25vcmVkIGlmIGJ1dHRvbnMgYXJlIGluY2x1ZGVkLlxuICogICAgICAgQXV0b0Nsb3NlRGVsYXk6IDMwMDBcbiAqICAgIH0sXG4gKiAgICAvLyBPcHRpb25hbCBkZWZhdWx0IG1lc3NhZ2Ugb2JqZWN0LlxuICogICAgTWVzc2FnZToge1xuICogICAgICBUaXRsZTogJ0RlZmF1bHQgdGl0bGUnLFxuICogICAgICBEZXNjcmlwdGlvbjogJ0RlZmF1bHQgZGVzY3JpcHRpb24nXG4gKiAgIH0sXG4gKiAgIEJ1dHRvbnM6IFtcbiAqICAgICAgbmV3IEJ1dHRvbk1ha2VyKCdPaycsICdvaycsIEJ1dHRvbkxheW91dERpc3BsYXkuUFJJTUFSWSksXG4gKiAgICAgIG5ldyBCdXR0b25NYWtlcignQ2FuY2VsJywgJ2NhbmNlbCcsIEJ1dHRvbkxheW91dERpc3BsYXkuU0VDT05EQVJZKVxuICogICBdXG4gKn0pXG4gKiBgYGBcbiAqICogVG9hc3RDb3JlQ29uZmlnOiB7QGxpbmsgSVRvYXN0Q29yZUNvbmZpZ31cbiAqICogR2xvYmFsU2V0dGluZ3M6IHtAbGluayBJR2xvYmFsVG9hc3RTZXR0aW5nc31cbiAqICogTWVzc2FnZToge0BsaW5rIElNZXNzYWdlfVxuICogKiBCdXR0b25zOiB7QGxpbmsgSUJ1dHRvbn1cbiAqICogQnV0dG9uTWFrZXI6IHtAbGluayBCdXR0b25NYWtlcn1cbiAqIEBjYXRlZ29yeSBJbXBvcnRzIGZvciBhbmd1bGFyIGFwcC5tb2R1bGVcbiAqL1xuZXhwb3J0IHtUb2FzdE5vdGlmaWNhdGlvbkNvbmZpZ01vZHVsZX0gZnJvbSAnLi9uZ3gtYXdlc29tZS1wb3B1cC9uZ3gtYXdlc29tZS1wb3B1cC5tb2R1bGUnO1xuLy8gZW5kcmVnaW9uXG4iXX0=