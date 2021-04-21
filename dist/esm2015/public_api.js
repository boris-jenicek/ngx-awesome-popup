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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljX2FwaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3B1YmxpY19hcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFdBQVcsRUFBa0IsTUFBTSxpQ0FBaUMsQ0FBQztBQUM3RSxPQUFPLEVBQUMsZUFBZSxFQUFzQixNQUFNLGtEQUFrRCxDQUFDO0FBQ3RHLE9BQU8sRUFBQyxzQkFBc0IsRUFBNkIsTUFBTSx5REFBeUQsQ0FBQztBQUMzSCxPQUFPLEVBQUMsV0FBVyxFQUFrQixNQUFNLDZDQUE2QyxDQUFDO0FBTXpGLElBQU8sV0FBVyxHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUM7QUFLN0MsSUFBTyxxQkFBcUIsR0FBRyxlQUFlLENBQUMscUJBQXFCLENBQUM7QUFHckUsSUFBTyw0QkFBNEIsR0FBRyxzQkFBc0IsQ0FBQyw0QkFBNEIsQ0FBQztBQVExRixJQUFPLGlCQUFpQixHQUFHLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQztBQUN6RCxJQUFPLGVBQWUsR0FBRyxXQUFXLENBQUMsZUFBZSxDQUFDO0FBb0JyRCxZQUFZO0FBRVosT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDbkUsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFJbkU7O0dBRUc7QUFDSCxPQUFPLEVBQUMsV0FBVyxFQUFDLENBQUM7QUFFckI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1ERztBQUNILE9BQU8sRUFBQyxlQUFlLEVBQUMsQ0FBQztBQXFCekIsWUFBWTtBQUVaLDZCQUE2QjtBQUU3Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtDRztBQUNILE9BQU8sRUFBQyw0QkFBNEIsRUFBQyxDQUFDO0FBQ3RDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1DRztBQUNILE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxDQUFDO0FBQy9COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOENHO0FBQ0gsT0FBTyxFQUFDLGlCQUFpQixFQUFDLENBQUM7QUFDM0IsWUFBWTtBQUVaLGdEQUFnRDtBQUNoRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFDSCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSw4Q0FBOEMsQ0FBQztBQUNuRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOEJHO0FBQ0gsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sOENBQThDLENBQUM7QUFDaEY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQ0c7QUFDSCxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSw4Q0FBOEMsQ0FBQztBQUNwRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Q0c7QUFDSCxPQUFPLEVBQUMsNkJBQTZCLEVBQUMsTUFBTSw4Q0FBOEMsQ0FBQztBQUMzRixZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtHbG9iYWxDbGFzcywgR2xvYmFsSW50ZXJmYWNlfSBmcm9tICcuL25neC1hd2Vzb21lLXBvcHVwL2NvcmUvZ2xvYmFsJztcbmltcG9ydCB7Q29uZmlybUJveENsYXNzLCBDb25maXJtQm94SW50ZXJmYWNlfSBmcm9tICcuL25neC1hd2Vzb21lLXBvcHVwL3R5cGVzL2NvbmZpcm0tYm94L2NvcmUvbW9kZWwnO1xuaW1wb3J0IHtUb2FzdE5vdGlmaWNhdGlvbkNsYXNzLCBUb2FzdE5vdGlmaWNhdGlvbkludGVyZmFjZX0gZnJvbSAnLi9uZ3gtYXdlc29tZS1wb3B1cC90eXBlcy90b2FzdC1ub3RpZmljYXRpb24vY29yZS9tb2RlbCc7XG5pbXBvcnQge0RpYWxvZ0NsYXNzLCBEaWFsb2dJbnRlcmZhY2V9IGZyb20gJy4vbmd4LWF3ZXNvbWUtcG9wdXAvdHlwZXMvZGlhbG9nL2NvcmUvbW9kZWwnO1xuXG5pbXBvcnQgSUJ1dHRvbiA9IEdsb2JhbEludGVyZmFjZS5JQnV0dG9uO1xuaW1wb3J0IElNZXNzYWdlID0gR2xvYmFsSW50ZXJmYWNlLklNZXNzYWdlO1xuaW1wb3J0IElHbG9iYWxVc2VyQ29uZmlnID0gR2xvYmFsSW50ZXJmYWNlLklHbG9iYWxVc2VyQ29uZmlnO1xuaW1wb3J0IElDb2xvclR5cGVzID0gR2xvYmFsSW50ZXJmYWNlLklDb2xvclR5cGVzO1xuaW1wb3J0IEJ1dHRvbk1ha2VyID0gR2xvYmFsQ2xhc3MuQnV0dG9uTWFrZXI7XG5cbmltcG9ydCBJQ29uZmlybUJveFB1YmxpY1Jlc3BvbnNlID0gQ29uZmlybUJveEludGVyZmFjZS5JQ29uZmlybUJveFB1YmxpY1Jlc3BvbnNlO1xuaW1wb3J0IElDb25maXJtQm94VXNlckNvbmZpZyA9IENvbmZpcm1Cb3hJbnRlcmZhY2UuSUNvbmZpcm1Cb3hVc2VyQ29uZmlnO1xuaW1wb3J0IElDb25maXJtQm94Q29yZUNvbmZpZyA9IENvbmZpcm1Cb3hJbnRlcmZhY2UuSUNvbmZpcm1Cb3hDb3JlQ29uZmlnO1xuaW1wb3J0IENvbmZpcm1Cb3hJbml0aWFsaXplciA9IENvbmZpcm1Cb3hDbGFzcy5Db25maXJtQm94SW5pdGlhbGl6ZXI7XG5cbmltcG9ydCBJVG9hc3ROb3RpZmljYXRpb25QdWJsaWNSZXNwb25zZSA9IFRvYXN0Tm90aWZpY2F0aW9uSW50ZXJmYWNlLklUb2FzdE5vdGlmaWNhdGlvblB1YmxpY1Jlc3BvbnNlO1xuaW1wb3J0IFRvYXN0Tm90aWZpY2F0aW9uSW5pdGlhbGl6ZXIgPSBUb2FzdE5vdGlmaWNhdGlvbkNsYXNzLlRvYXN0Tm90aWZpY2F0aW9uSW5pdGlhbGl6ZXI7XG5pbXBvcnQgSVRvYXN0Q29yZUNvbmZpZyA9IFRvYXN0Tm90aWZpY2F0aW9uSW50ZXJmYWNlLklUb2FzdENvcmVDb25maWc7XG5pbXBvcnQgSUdsb2JhbFRvYXN0U2V0dGluZ3MgPSBUb2FzdE5vdGlmaWNhdGlvbkludGVyZmFjZS5JR2xvYmFsVG9hc3RTZXR0aW5ncztcbmltcG9ydCBJVG9hc3ROb3RpZmljYXRpb25Vc2VyQ29uZmlnID0gVG9hc3ROb3RpZmljYXRpb25JbnRlcmZhY2UuSVRvYXN0Tm90aWZpY2F0aW9uVXNlckNvbmZpZztcblxuaW1wb3J0IElEaWFsb2dQdWJsaWNSZXNwb25zZSA9IERpYWxvZ0ludGVyZmFjZS5JRGlhbG9nUHVibGljUmVzcG9uc2U7XG5pbXBvcnQgSURpYWxvZ1VzZXJDb25maWcgPSBEaWFsb2dJbnRlcmZhY2UuSURpYWxvZ1VzZXJDb25maWc7XG5pbXBvcnQgSURpYWxvZ0NvcmVDb25maWcgPSBEaWFsb2dJbnRlcmZhY2UuSURpYWxvZ0NvcmVDb25maWc7XG5pbXBvcnQgRGlhbG9nSW5pdGlhbGl6ZXIgPSBEaWFsb2dDbGFzcy5EaWFsb2dJbml0aWFsaXplcjtcbmltcG9ydCBEaWFsb2dCZWxvbmdpbmcgPSBEaWFsb2dDbGFzcy5EaWFsb2dCZWxvbmdpbmc7XG5cbi8vIHJlZ2lvbiAqKiogSW50ZXJmYWNlICoqKlxuZXhwb3J0IHtJR2xvYmFsVXNlckNvbmZpZ307XG5leHBvcnQge0lCdXR0b259O1xuZXhwb3J0IHtJTWVzc2FnZX07XG5leHBvcnQge0lDb2xvclR5cGVzfTtcblxuZXhwb3J0IHtJQ29uZmlybUJveFVzZXJDb25maWd9O1xuZXhwb3J0IHtJQ29uZmlybUJveENvcmVDb25maWd9O1xuZXhwb3J0IHtJQ29uZmlybUJveFB1YmxpY1Jlc3BvbnNlfTtcblxuZXhwb3J0IHtJR2xvYmFsVG9hc3RTZXR0aW5nc307XG5leHBvcnQge0lUb2FzdENvcmVDb25maWd9O1xuZXhwb3J0IHtJVG9hc3ROb3RpZmljYXRpb25Vc2VyQ29uZmlnfTtcbmV4cG9ydCB7SVRvYXN0Tm90aWZpY2F0aW9uUHVibGljUmVzcG9uc2V9O1xuXG5leHBvcnQge0lEaWFsb2dVc2VyQ29uZmlnfTtcbmV4cG9ydCB7SURpYWxvZ0NvcmVDb25maWd9O1xuZXhwb3J0IHtJRGlhbG9nUHVibGljUmVzcG9uc2V9O1xuLy8gZW5kcmVnaW9uXG5cbmV4cG9ydCB7QnV0dG9uTGF5b3V0RGlzcGxheX0gZnJvbSAnLi9uZ3gtYXdlc29tZS1wb3B1cC9jb3JlL2VudW1zJztcbmV4cG9ydCB7RGlhbG9nTGF5b3V0RGlzcGxheX0gZnJvbSAnLi9uZ3gtYXdlc29tZS1wb3B1cC9jb3JlL2VudW1zJztcbmV4cG9ydCB7VmVydGljYWxQb3NpdGlvbn0gZnJvbSAnLi9uZ3gtYXdlc29tZS1wb3B1cC9jb3JlL2VudW1zJztcblxuXG4vKipcbiAqIEByZXR1cm5zIEl0IHdpbGwgcmV0dXJuIGN1c3RvbSBidXR0b24gb2JqZWN0IHJlYWR5IHRvIGJlIHVzZWQgaW4gY2hpbGQgY29tcG9uZW50IGxheW91dC5cbiAqL1xuZXhwb3J0IHtCdXR0b25NYWtlcn07XG5cbi8qKlxuICogVGhpcyBpcyB0aGUgY2xhc3MgdGhhdCBuZWVkcyB0byBiZSBhZGRlZCBhcyBESSBpbiB0aGUgY29uc3RydWN0b3Igb2YgYSBjaGlsZCBjb21wb25lbnQgdGhhdCB3aWxsIGJlXG4gKiBvcGVuZWQgZHluYW1pY2FsbHkgd2l0aCB7QGxpbmsgRGlhbG9nSW5pdGlhbGl6ZXJ9LiBJdCBjb250YWlucyB2YXJpb3VzIGluZm9ybWF0aW9uIG9yXG4gKiBldmVudCBjb250cm9sbGVycywgYW5kIGxpc3RlbmVycyB0aGF0IGNhbiBiZSB1c2VkIGluIGEgY2hpbGQgY29tcG9uZW50LiBBbHNvLCB0aGVyZSBpcyBjdXN0b20gZGF0YVxuICogdGhhdCBpcyBzZW50IGZyb20gY29tcG9uZW50IHdoZXJlIHRoZSB7QGxpbmsgRGlhbG9nSW5pdGlhbGl6ZXJ9IGlzLiBVc2VyIGNhbiBzZXQgc3BlY2lmaWMgdHlwZSBvZlxuICogY3VzdG9tIGRhdGEgdGhhdCBjaGlsZCBjb21wb25lbnQgd2lsbCByZWNlaXZlIGJ5IGluY2x1ZGluZyBpdCBhcyBnZW5lcmljIHR5cGUuXG4gKlxuICpcbiAqIEV4YW1wbGU6XG4gKiBgYGB0eXBlc2NyaXB0XG4gKmltcG9ydCB7RGlhbG9nQmVsb25naW5nfSBmcm9tICduZ3gtYXdlc29tZS1wb3B1cCc7XG4gKkBDb21wb25lbnQoe1xuICogICAgc2VsZWN0b3IgICA6ICdhcHAtY3VwJyxcbiAqICAgIHRlbXBsYXRlVXJsOiAnLi9jdXAuY29tcG9uZW50Lmh0bWwnLFxuICogICAgc3R5bGVVcmxzICA6IFsnLi9jdXAuY29tcG9uZW50LnNjc3MnXVxuICp9KVxuICogZXhwb3J0IGNsYXNzIEN1cENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAqXG4gKiAgICBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuICpcbiAqICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZGlhbG9nQmVsb25naW5nOiBEaWFsb2dCZWxvbmdpbmcpIHtcbiAqICAgIH1cbiAqXG4gKiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAqICAgIGNvbnNvbGUubG9nKHRoaXMuZGlhbG9nQmVsb25naW5nKTtcbiAqXG4gKiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gKiAgICAgICAgICAgIHRoaXMuZGlhbG9nQmVsb25naW5nLkV2ZW50c0NvbnRyb2xsZXIub25CdXR0b25DbGljayQuc3Vic2NyaWJlKChfQnV0dG9uKSA9PiB7XG4gKiAgICAgICAgICAgIGlmIChfQnV0dG9uLklEID09PSAnb2snKSB7XG4gKiAgICAgICAgICAgICAgICAvLyBEbyBzb21lIGxvZ2ljIGFuZCBjbG9zZSBwb3B1cC5cbiAqICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9nQmVsb25naW5nLkV2ZW50c0NvbnRyb2xsZXIuY2xvc2UoKTtcbiAqICAgICAgICAgICAgfSBlbHNlIGlmIChfQnV0dG9uLklEID09PSAnY2FuY2VsJykge1xuICogICAgICAgICAgICAgICAgLy8gRG8gc29tZSBsb2dpYyBhbmQgY2xvc2UgcG9wdXAuXG4gKiAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ0JlbG9uZ2luZy5FdmVudHNDb250cm9sbGVyLmNsb3NlKCk7XG4gKiAgICAgICAgICAgIH1cbiAqICAgICAgICB9KVxuICogICAgICAgICk7XG4gKlxuICogICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICogICAgICAgICAgICAvLyBDbG9zZSBsb2FkZXIgYWZ0ZXIgYXN5bmMgZGF0YSBpcyByZWFkeS5cbiAqICAgICAgICAgICAgdGhpcy5kaWFsb2dCZWxvbmdpbmcuRXZlbnRzQ29udHJvbGxlci5jbG9zZUxvYWRlcigpO1xuICogICAgICAgIH0sIDEwMDApO1xuICogICAgfVxuICp9XG4gXG4gbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIC8vIENsb3NlIGFsbCBzdWJzY3JpcHRpb25zLlxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzdWIgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICAgIH1cbiAqIGBgYFxuICogQGNhdGVnb3J5IGNoaWxkIGR5bmFtaWMgY29tcG9uZW50IGRhdGEgJiBldmVudCBjb250cm9sbGVyXG4gKi9cbmV4cG9ydCB7RGlhbG9nQmVsb25naW5nfTtcblxuLy8gcmVnaW9uICoqKiBPYnNlcnZhYmxlIHJlc3BvbnNlIGFmdGVyIGNsb3NpbmcgcG9wdXAgKioqXG4vKipcbiAqIFJlZ3VsYXIgZGVzY3JpcHRpb25cbiAqXG4gKiBAY2F0ZWdvcnkgT2JzZXJ2YWJsZSByZXNwb25zZSBhZnRlciBjbG9zaW5nIHBvcHVwXG4gKi9cbmV4cG9ydCB7SVRvYXN0Tm90aWZpY2F0aW9uUHVibGljUmVzcG9uc2UgYXMgSVRvYXN0Tm90aWZpY2F0aW9uUmVzcG9uc2V9O1xuLyoqXG4gKiBSZWd1bGFyIGRlc2NyaXB0aW9uXG4gKlxuICogQGNhdGVnb3J5IE9ic2VydmFibGUgcmVzcG9uc2UgYWZ0ZXIgY2xvc2luZyBwb3B1cFxuICovXG5leHBvcnQge0lDb25maXJtQm94UHVibGljUmVzcG9uc2UgYXMgSUNvbmZpcm1Cb3hSZXNwb25zZX07XG4vKipcbiAqIFJlZ3VsYXIgZGVzY3JpcHRpb25cbiAqXG4gKiBAY2F0ZWdvcnkgT2JzZXJ2YWJsZSByZXNwb25zZSBhZnRlciBjbG9zaW5nIHBvcHVwXG4gKi9cbmV4cG9ydCB7SURpYWxvZ1B1YmxpY1Jlc3BvbnNlIGFzIElEaWFsb2dSZXNwb25zZX07XG4vLyBlbmRyZWdpb25cblxuLy8gcmVnaW9uICoqKiBQb3B1cCBvcGVuICAqKipcblxuLyoqXG4gKiBUaGlzIGlzIHRoZSBjbGFzcyB0aGF0IG5lZWRzIHRvIGJlIGluc3RhbnRpYXRlZCB0byBzZXQgdXAgYW5kIGlnbml0ZSBhIFRvYXN0Tm90aWZpY2F0aW9uLFxuICogaXRzIHB1cnBvc2UgaXMgdG8gc2hvdyBzaG9ydCBub3RpZmljYXRpb24gdG8gZW5kLXVzZXIsIG9yIGV2ZW4gaW50ZXJhY3Qgd2l0aCB1c2VyLlxuICogSXQgY2FuIGJlIGV2b2tlZCBmcm9tIGFueSBhbmd1bGFyIHR5cGVzY3JpcHQgZmlsZS5cbiAqXG4gKiBCZWxvdyBpcyB0aGUgZXhhbXBsZSB3aXRoIChzb21lIG9wdGlvbmFsKSB1c2VyIGNvbmZpZ3VyYXRpb24sXG4gKiBpdCB3aWxsIG92ZXJyaWRlIGRlZmF1bHQgY29uZmlndXJhdGlvbiBmcm9tIGFwcC5tb2R1bGUuXG4gKlxuICpcbiAqIEV4YW1wbGU6XG4gKiBgYGB0eXBlc2NyaXB0XG4gKiAvLyBDcmVhdGUgdGhlIGluaXRpYWxpemVyLlxuICpjb25zdCBuZXdUb2FzdE5vdGlmaWNhdGlvbiA9IG5ldyBUb2FzdE5vdGlmaWNhdGlvbkluaXRpYWxpemVyKCk7XG4gKlxuICogLy8gU2V0IGRlc2lyZWQgVGl0bGUuXG4gKm5ld1RvYXN0Tm90aWZpY2F0aW9uLnNldFRpdGxlKCdXYXJuaW5nIScpO1xuICpcbiAqIC8vIFNldCBkZXNpcmVkIERlc2NyaXB0aW9uLlxuICpuZXdUb2FzdE5vdGlmaWNhdGlvbi5zZXREZXNjcmlwdGlvbignRm9ybSBpcyBub3QgdmFsaWQhJyk7XG4gKlxuICogLy8gU2V0IGRlc2lyZWQgY29uZmlndXJhdGlvbi5cbiAqbmV3VG9hc3ROb3RpZmljYXRpb24uc2V0Q29uZmlnKHtcbiAqICAgICAgTGF5b3V0VHlwZTogRGlhbG9nTGF5b3V0RGlzcGxheS5XQVJOSU5HXG4gKiAgIH0pO1xuIFxuICogLy8gT3BlbiBhIFRvYXN0Tm90aWZpY2F0aW9uLlxuICogbmV3Q29uZmlybUJveC5vcGVuQ29uZmlybUJveCQoKS5zdWJzY3JpYmUocmVzcCA9PiB7XG4gKiAgIGNvbnNvbGUubG9nKCdjb25maXJtQm94IHJlc3BvbnNlOiAnLCByZXNwKTtcbiAqICB9KTtcbiAqIGBgYFxuICogKiBJVG9hc3RDb3JlQ29uZmlnOiB7QGxpbmsgSVRvYXN0Q29yZUNvbmZpZ31cbiAqICogTGF5b3V0VHlwZToge0BsaW5rIERpYWxvZ0xheW91dERpc3BsYXl9XG4gKiAqIElUb2FzdE5vdGlmaWNhdGlvblB1YmxpY1Jlc3BvbnNlOiB7QGxpbmsgSVRvYXN0Tm90aWZpY2F0aW9uUHVibGljUmVzcG9uc2V9XG4gKiBAY2F0ZWdvcnkgUG9wdXAgb3BlblxuICovXG5leHBvcnQge1RvYXN0Tm90aWZpY2F0aW9uSW5pdGlhbGl6ZXJ9O1xuLyoqXG4gKiBUaGlzIGlzIHRoZSBjbGFzcyB0aGF0IG5lZWRzIHRvIGJlIGluc3RhbnRpYXRlZCB0byBzZXQgdXAgYW5kIGlnbml0ZSBhIENvbmZpcm1Cb3ggYW5kIGNyZWF0ZSBjb250ZW50LlxuICogSXRzIHB1cnBvc2UgaXMgdG8gZ2V0IGNvbmZpcm1hdGlvbiByZXNwb25zZSBmcm9tIGVuZC11c2VyLiBJdCBjYW4gYmUgY2FsbGVkIGZyb20gYW55IGFuZ3VsYXJcbiAqIHR5cGVzY3JpcHQgZmlsZS5cbiAqXG4gKiBCZWxvdyBpcyBleGFtcGxlIHdpdGggKHNvbWUgb3B0aW9uYWwpIHVzZXIgY29uZmlndXJhdGlvbixcbiAqIGl0IHdpbGwgb3ZlcnJpZGUgZGVmYXVsdCBjb25maWd1cmF0aW9uIGZyb20gYXBwLm1vZHVsZS5cbiAqXG4gKlxuICogRXhhbXBsZTpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIC8vIENyZWF0ZSB0aGUgaW5pdGlhbGl6ZXIuXG4gKmNvbnN0IG5ld0NvbmZpcm1Cb3ggPSBuZXcgQ29uZmlybUJveEluaXRpYWxpemVyKCk7XG4gKlxuICogLy8gU2V0IGRlc2lyZWQgbWVzc2FnZTogX1RpdGxlOiBzdHJpbmcsIF9EZXNjcmlwdGlvbjogc3RyaW5nLlxuICpuZXdDb25maXJtQm94LnNldE1lc3NhZ2UoJ0FyZSB5b3Ugc3VyZT8nLCAnVGhhdCBhY3Rpb24gd2lsbCBkZWxldGUgdXNlciEnKTtcbiAqXG4gKiAvLyBTZXQgZGVzaXJlZCBjb25maWd1cmF0aW9uLlxuICpuZXdDb25maXJtQm94LnNldENvbmZpZyh7XG4gKiAgICAgIExheW91dFR5cGU6IERpYWxvZ0xheW91dERpc3BsYXkuREFOR0VSXG4gKiAgIH0pO1xuICpcbiAqIC8vIFNldCBidXR0b24gbGFiZWxzLlxuICogbmV3Q29uZmlybUJveC5zZXRCdXR0b25MYWJlbHMoJ1lFUycsICdOTycpO1xuICpcbiAqIC8vIE9wZW4gYSBDb25maXJtQm94LCBhbmQgZ2V0IGNsaWNrZWQgYnV0dG9uLWlkIGluIHJlc3BvbnNlLlxuICogbmV3Q29uZmlybUJveC5vcGVuQ29uZmlybUJveCQoKS5zdWJzY3JpYmUocmVzcCA9PiB7XG4gKiAgIC8vIElDb25maXJtQm94UHVibGljUmVzcG9uc2VcbiAqICAgY29uc29sZS5sb2coJ2NvbmZpcm1Cb3ggcmVzcG9uc2U6ICcsIHJlc3ApO1xuICogIH0pO1xuICogYGBgXG4gKiAqIElDb25maXJtQm94Q29yZUNvbmZpZzoge0BsaW5rIElDb25maXJtQm94Q29yZUNvbmZpZ31cbiAqICogTGF5b3V0VHlwZToge0BsaW5rIERpYWxvZ0xheW91dERpc3BsYXl9XG4gKiAqIElDb25maXJtQm94UHVibGljUmVzcG9uc2U6IHtAbGluayBJQ29uZmlybUJveFB1YmxpY1Jlc3BvbnNlfVxuICogQGNhdGVnb3J5IFBvcHVwIG9wZW5cbiAqL1xuZXhwb3J0IHtDb25maXJtQm94SW5pdGlhbGl6ZXJ9O1xuLyoqXG4gKiBUaGlzIGlzIHRoZSBjbGFzcyB0aGF0IG5lZWRzIHRvIGJlIGluc3RhbnRpYXRlZCB0byBzZXQgdXAgYW5kIGlnbml0ZSBhIERpYWxvZyBhbmQgY3JlYXRlIGR5bmFtaWMgY29tcG9uZW50LFxuICogaXRzIHB1cnBvc2UgaXMgdG8gcmVuZGVyIGFueSBhbmd1bGFyIGNvbXBvbmVudCB2aWV3IHdpdGggc3BlY2lmaWMgY29uZmlndXJhdGlvbiBmcm9tIGFueSBhbmd1bGFyIHR5cGVzY3JpcHQgZmlsZS5cbiAqIER5bmFtaWMgY29tcG9uZW50IG1lYW5zIHRoYXQgdXNlciBjYW4gZXZva2UgdGhlIHBvcHVwIGZyb20gdHlwZXNjcmlwdCBhbmQgY29tcG9uZW50IHZpZXdcbiAqIGlzIGR5bmFtaWNhbGx5IGNyZWF0ZWQgd2l0aCB0aGUgQXdlc29tZSBQb3B1cCBlbmdpbmUuIFRoZXJlIGlzIG5vIG5lZWQgdG8gY2FsbCBhbnkgc2VsZWN0b3IgaW4gSFRNTCB0byBjcmVhdGUgY29tcG9uZW50IHZpZXcuXG4gKlxuICogRGlhbG9nSW5pdGlhbGl6ZXIgY2FuIHNlbmQgZGF0YSB0byBjaGlsZCBjb21wb25lbnQgKGR5bmFtaWMgY29tcG9uZW50KSB3aGVyZSBkYXRhIHdpbGwgYmUgYWNjZXNzaWJsZSB3aXRoIHtAbGluayBEaWFsb2dCZWxvbmdpbmd9LlxuICpcbiAqIEJlbG93IGlzIHRoZSBleGFtcGxlIHdpdGggKHNvbWUgb3B0aW9uYWwpIHVzZXIgY29uZmlndXJhdGlvbixcbiAqIGl0IHdpbGwgb3ZlcnJpZGUgZGVmYXVsdCBjb25maWd1cmF0aW9uIGZyb20gYXBwLm1vZHVsZS5cbiAqXG4gKlxuICogRXhhbXBsZTpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqICBpbXBvcnQge0RpYWxvZ0luaXRpYWxpemVyLCBEaWFsb2dMYXlvdXREaXNwbGF5LCBCdXR0b25NYWtlciwgQnV0dG9uTGF5b3V0RGlzcGxheX0gZnJvbSAnbmd4LWF3ZXNvbWUtcG9wdXAnOzxcbiAqICBpbXBvcnQge0N1cENvbXBvbmVudH0gZnJvbSAnLi9jdXAvY3VwLmNvbXBvbmVudCc7XG4gKlxuICogIGNvbnN0IG5ld0RpYWxvZ1BvcHVwID0gbmV3IERpYWxvZ0luaXRpYWxpemVyKEN1cENvbXBvbmVudCk7IC8vIEFueSBBbmd1bGFyIGNvbXBvbmVudC5cbiAqXG4gKiAgLy8gQ3VzdG9tIGRhdGEgd2lsbCBiZSBzZW50IHRvIGR5bmFtaWMgY29tcG9uZW50IGF2YWlsYWJsZSBpbiBkaWFsb2dCZWxvbmdpbmcgb2JqZWN0LlxuICogIG5ld0RpYWxvZ1BvcHVwLnNldEN1c3RvbURhdGEoe25hbWU6ICdKb2huJywgc3VybmFtZTogJ0RvZScsIGlkOiAxfSk7XG4gKlxuICogIC8vIExvY2FsIGNvbmZpZyBzZXR0aW5ncyBJRGlhbG9nQ29yZUNvbmZpZy5cbiAqICBuZXdEaWFsb2dQb3B1cC5zZXRDb25maWcoe1xuICogICAgICBIZWlnaHQ6ICc1MDBweCcsXG4gKiAgICAgIExheW91dFR5cGU6IERpYWxvZ0xheW91dERpc3BsYXkuSU5GTyxcbiAqICAgICAgTG9hZGVyQ29tcG9uZW50OiBBbnkgQW5ndWxhciBjb21wb25lbnQgbmFtZVxuICogICAgICAgfSk7XG4gKlxuICogIC8vIEN1c3RvbSBidXR0b25zLCBsaXN0ZW5lciBpcyBhdmFpbGFibGUgaW4gY2hpbGQgY29tcG9uZW50IGluIGRpYWxvZ0JlbG9uZ2luZyBvYmplY3QuXG4gKiAgbmV3RGlhbG9nUG9wdXAuc2V0QnV0dG9ucyhbXG4gKiAgICAgIG5ldyBCdXR0b25NYWtlcignT2snLCAnb2snLCBCdXR0b25MYXlvdXREaXNwbGF5LlBSSU1BUlkpLFxuICogICAgICBuZXcgQnV0dG9uTWFrZXIoJ0NhbmNlbCcsICdjYW5jZWwnLCBCdXR0b25MYXlvdXREaXNwbGF5LlNFQ09OREFSWSlcbiAqICBdKTtcbiAqXG4gKiAgLy8gQ29tbWFuZCB0byBvcGVuIGRpYWxvZywgaXQgcmV0dXJucyBvYnNlcnZhYmxlLlxuICogIG5ld0RpYWxvZ1BvcHVwLm9wZW5EaWFsb2ckPGFueT4oKS5zdWJzY3JpYmUocmVzcCA9PiB7XG4gKiAgICAgICAgICAgY29uc29sZS5sb2coJ3Jlc3BvbnNlOiAnLCByZXNwLlBheWxvYWQpO1xuICogICAgICAgfSk7XG4gKiBgYGBcbiAqICogSURpYWxvZ0NvcmVDb25maWc6IHtAbGluayBJRGlhbG9nQ29yZUNvbmZpZ31cbiAqICogTGF5b3V0VHlwZToge0BsaW5rIERpYWxvZ0xheW91dERpc3BsYXl9XG4gKiAqIEJ1dHRvbkxheW91dERpc3BsYXk6IHtAbGluayBCdXR0b25MYXlvdXREaXNwbGF5fVxuICogKiBCdXR0b25NYWtlcjoge0BsaW5rIEJ1dHRvbk1ha2VyfVxuICogKiBJRGlhbG9nUHVibGljUmVzcG9uc2U6IHtAbGluayBJRGlhbG9nUHVibGljUmVzcG9uc2V9XG4gKiBAY2F0ZWdvcnkgUG9wdXAgb3BlblxuICovXG5leHBvcnQge0RpYWxvZ0luaXRpYWxpemVyfTtcbi8vIGVuZHJlZ2lvblxuXG4vLyByZWdpb24gKioqIEltcG9ydHMgZm9yIGFuZ3VsYXIgYXBwLm1vZHVsZSAqKipcbi8qKlxuICogVGhpcyBpcyB0aGUgbWFpbiBtb2R1bGUgb2YgdGhlIGxpYnJhcnksIGl0IGlzIGNydWNpYWwgdG8gYmUgYWRkZWQgd2l0aGluIGFuZ3VsYXIuYXBwXG4gKiBpbXBvcnRzIGFzIGFuIGV4YW1wbGUgd2l0aCBvcHRpb25hbCBhcmd1bWVudCwgbG9vazoge0BsaW5rIElHbG9iYWxVc2VyQ29uZmlnfVxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIC8vIGFwcC5tb2R1bGUgaW1wb3J0czpcbiAqIE5neEF3ZXNvbWVQb3B1cE1vZHVsZS5mb3JSb290KHtcbiAqICAgICBDb2xvckxpc3Q6IHtcbiAqICAgICAgICAgICAgUHJpbWFyeSAgOiAnI2ZmOWUwMCcsIC8vIG9wdGlvbmFsXG4gKiAgICAgICAgICAgIFNlY29uZGFyeTogJyM5ODllYTUnLCAvLyBvcHRpb25hbFxuICogICAgICAgICAgICBJbmZvICAgICA6ICcjMmY4ZWU1JywgLy8gb3B0aW9uYWxcbiAqICAgICAgICAgICAgU3VjY2VzcyAgOiAnIzNjYWVhMycsIC8vIG9wdGlvbmFsXG4gKiAgICAgICAgICAgIFdhcm5pbmcgIDogJyNmZmMxMDcnLCAvLyBvcHRpb25hbFxuICogICAgICAgICAgICBEYW5nZXIgICA6ICcjZTQ2NDY0JywgLy8gb3B0aW9uYWxcbiAqICAgICAgICAgICAgTGlnaHQgICAgOiAnI2ZiZmJmYicsIC8vIG9wdGlvbmFsXG4gKiAgICAgICAgICAgIERhcmsgICAgIDogJyMzNDNhNDAnICAvLyBvcHRpb25hbFxuICogICAgICAgICAgIH1cbiAqIH0pXG4gKiBgYGBcbiAqIEBjYXRlZ29yeSBJbXBvcnRzIGZvciBhbmd1bGFyIGFwcC5tb2R1bGVcbiAqL1xuZXhwb3J0IHtOZ3hBd2Vzb21lUG9wdXBNb2R1bGV9IGZyb20gJy4vbmd4LWF3ZXNvbWUtcG9wdXAvbmd4LWF3ZXNvbWUtcG9wdXAubW9kdWxlJztcbi8qKlxuICogVGhpcyBpcyB0aGUgbW9kdWxlIHRoYXQgaWduaXRlcyBkeW5hbWljIGRpYWxvZyBtb2RhbCwgaXRzIHB1cnBvc2UgaXMgdG8gbG9hZCBhbnkgYW5ndWxhciBjb21wb25lbnQgaW5cbiAqIGRpYWxvZyB3aW5kb3cuIER5bmFtaWMgY29tcG9uZW50IG1lYW5zIHRoYXQgdXNlciBjYW4gZXZva2UgYW55IEFuZ3VsYXIgY29tcG9uZW50IGluIHRoZSBwb3B1cCBqdXN0IGZyb20gdHlwZXNjcmlwdC4gQ29tcG9uZW50IHZpZXdcbiAqIGlzIGR5bmFtaWNhbGx5IGNyZWF0ZWQgd2l0aCB0aGUgbGlicmFyeSBlbmdpbmUgYW5kIHRoZXJlIGlzIG5vIG5lZWQgdG8gY2FsbCBhbnkgc2VsZWN0b3IgaW4gSFRNTCB0byBjcmVhdGUgY29tcG9uZW50IHZpZXcuXG4gKlxuICogSXQgaXMgY3J1Y2lhbCBmb3IgdXNlciB0byBhZGQgdGhpcyBtb2R1bGUgaW4gYW5ndWxhci5hcHAgaW1wb3J0cy5cbiAqIEJlbG93IGlzIHRoZSBleGFtcGxlIHdpdGggKG9wdGlvbmFsKSBkZWZhdWx0IHVzZXIgY29uZmlndXJhdGlvbiwgdGhhdCBpcyB3aGF0IHdpbGwgYmUgaW4gc2V0dXAgaWYgdGhlcmUgaXMgbm9cbiAqIGxvY2FsIGNvbmZpZyB3aGVuIHBvcHVwIGlzIGV2b2tlZCwgdGhhdCBtZWFucyBpdCBjYW4gYmUgb3ZlcnJpZGRlbiBkaXJlY3RseSB3aGVuIHBvcHVwIGlzIGNhbGxlZC5cbiAqIEZvciBpbXBsZW1lbnRhdGlvbiBsb29rOiB7QGxpbmsgSURpYWxvZ1VzZXJDb25maWd9LlxuICpcbiAqIEV4YW1wbGU6XG4gKiBgYGB0eXBlc2NyaXB0XG4gKiAvLyBhcHAubW9kdWxlIGltcG9ydHM6XG4gKkRpYWxvZ0NvbmZpZ01vZHVsZS5mb3JSb290KHtcbiAqICAgICBEaWFsb2dDb3JlQ29uZmlnOiB7XG4gKiAgICAgICAgV2lkdGggICAgICAgIDogJzUwMHB4JyxcbiAqICAgICAgICBCdXR0b25Qb3NpdGlvbjogJ3JpZ2h0JyxcbiAqICAgICAgICBMYXlvdXRUeXBlOiBEaWFsb2dMYXlvdXREaXNwbGF5LklORk8sXG4gKiAgICAgICAgTG9hZGVyQ29tcG9uZW50OiAvLyBBbnkgYW5ndWxhciBjb21wb25lbnQgY2xhc3MgbmFtZSBjYW4gYmUgaW5jbHVkZWQgYXMgYSBsb2FkZXIuXG4gKiAgICAgfSxcbiAqICAgICBCdXR0b25zOiBbXG4gKiAgICAgICAgbmV3IEJ1dHRvbk1ha2VyKCdPaycsICdvaycsIEJ1dHRvbkxheW91dERpc3BsYXkuUFJJTUFSWSksXG4gKiAgICAgICAgbmV3IEJ1dHRvbk1ha2VyKCdDYW5jZWwnLCAnY2FuY2VsJywgQnV0dG9uTGF5b3V0RGlzcGxheS5TRUNPTkRBUlkpXG4gKiAgICAgXSxcbiAqIH0pXG4gKiBgYGBcbiAqICogRGlhbG9nQ29yZUNvbmZpZy5MYXlvdXRUeXBlOiB7QGxpbmsgRGlhbG9nTGF5b3V0RGlzcGxheX1cbiAqICogQnV0dG9uTGF5b3V0RGlzcGxheToge0BsaW5rIEJ1dHRvbkxheW91dERpc3BsYXl9XG4gKiAqIEJ1dHRvbk1ha2VyOiB7QGxpbmsgQnV0dG9uTWFrZXJ9XG4gKiBAY2F0ZWdvcnkgSW1wb3J0cyBmb3IgYW5ndWxhciBhcHAubW9kdWxlXG4gKi9cbmV4cG9ydCB7RGlhbG9nQ29uZmlnTW9kdWxlfSBmcm9tICcuL25neC1hd2Vzb21lLXBvcHVwL25neC1hd2Vzb21lLXBvcHVwLm1vZHVsZSc7XG4vKipcbiAqIFRoaXMgaXMgdGhlIG1vZHVsZSB0aGF0IGlnbml0ZXMgQ29uZmlybSBib3ggZGlhbG9nLCBpdHMgcHVycG9zZSBpcyB0byBzaG93IHBvcHVwIGluIGFcbiAqIHNtYWxsIGRpYWxvZyB3aW5kb3cgaW4gdGhlIG1pZGRsZSBvZiB0aGUgc2NyZWVuLiBVc2VyIGNhbiBwcm92aWRlIHRpdGxlLCBkZXNjcmlwdGlvbiBhbmQgaW5jbHVkZSBidXR0b25zLlxuICogQ29uZmlybSBib3ggaXMgYXZhaWxhYmxlIGluIHByZWRlZmluZWQgbGF5b3V0IHR5cGVzIChlbnVtcyk6IHtAbGluayBEaWFsb2dMYXlvdXREaXNwbGF5fS5cbiAqXG4gKiBJdCBpcyBjcnVjaWFsIGZvciB1c2VyIHRvIGFkZCB0aGlzIG1vZHVsZSBpbiBhbmd1bGFyLmFwcCBpbXBvcnRzLlxuICogQmVsb3cgaXMgdGhlIGV4YW1wbGUgd2l0aCAob3B0aW9uYWwpIGRlZmF1bHQgdXNlciBjb25maWd1cmF0aW9uLCB0aGF0J3Mgd2hhdCB3aWxsIGJlIHVzZWQgaWYgdGhlcmUgaXMgbm9cbiAqIGxvY2FsIGNvbmZpZyB3aGVuIHBvcHVwIGlzIGV2b2tlZCwgdGhhdCBtZWFucyBpdCBjYW4gYmUgb3ZlcnJpZGRlbiBkaXJlY3RseSB3aGVuIHBvcHVwIGlzIGV2b2tlZC5cbiAqIEZvciBpbXBsZW1lbnRhdGlvbiBsb29rOiB7QGxpbmsgSUNvbmZpcm1Cb3hVc2VyQ29uZmlnfS5cbiAqXG4gKiBFeGFtcGxlOlxuICogYGBgdHlwZXNjcmlwdFxuICogLy8gYXBwLm1vZHVsZSBpbXBvcnRzOlxuICpDb25maXJtQm94Q29uZmlnTW9kdWxlLmZvclJvb3Qoe1xuICogICAgQ29uZmlybUJveENvcmVDb25maWc6IHtcbiAqICAgICAgIFdpZHRoOiAnNzAwcHgnLFxuICogICAgICAgTGF5b3V0VHlwZTogRGlhbG9nTGF5b3V0RGlzcGxheS5EQU5HRVIsXG4gKiAgICAgICBCdXR0b25Qb3NpdGlvbjogJ2NlbnRlcidcbiAqICAgIH0sXG4gKiAgICBNZXNzYWdlOiB7ICAvLyBPcHRpb25hbCBkZWZhdWx0IG1lc3NhZ2Ugb2JqZWN0LlxuICogICAgICAgVGl0bGU6ICdEZWZhdWx0IHRpdGxlJyxcbiAqICAgICAgIERlc2NyaXB0aW9uOiAnRGVmYXVsdCBkZXNjcmlwdGlvbidcbiAqICAgIH0sXG4gKiAgICBCdXR0b25zICAgICA6IFtcbiAqICAgICAgIG5ldyBCdXR0b25NYWtlcignT2snLCAnb2snLCBCdXR0b25MYXlvdXREaXNwbGF5LlBSSU1BUlkpLFxuICogICAgICAgbmV3IEJ1dHRvbk1ha2VyKCdDYW5jZWwnLCAnY2FuY2VsJywgQnV0dG9uTGF5b3V0RGlzcGxheS5TRUNPTkRBUlkpXG4gKiAgICBdXG4gKiB9KVxuICogYGBgXG4gKiAqIENvbmZpcm1Cb3hDb3JlQ29uZmlnOiB7QGxpbmsgSUNvbmZpcm1Cb3hDb3JlQ29uZmlnfVxuICogKiBNZXNzYWdlOiB7QGxpbmsgSU1lc3NhZ2V9XG4gKiAqIEJ1dHRvbnM6IHtAbGluayBJQnV0dG9ufVxuICogKiBCdXR0b25NYWtlcjoge0BsaW5rIEJ1dHRvbk1ha2VyfVxuICogQGNhdGVnb3J5IEltcG9ydHMgZm9yIGFuZ3VsYXIgYXBwLm1vZHVsZVxuICovXG5leHBvcnQge0NvbmZpcm1Cb3hDb25maWdNb2R1bGV9IGZyb20gJy4vbmd4LWF3ZXNvbWUtcG9wdXAvbmd4LWF3ZXNvbWUtcG9wdXAubW9kdWxlJztcbi8qKlxuICogVGhpcyBpcyB0aGUgbW9kdWxlIHRoYXQgaWduaXRlcyBUb2FzdCBub3RpZmljYXRpb25zIGRpYWxvZywgaXRzIHB1cnBvc2UgaXMgdG8gc2hvdyB0b2FzdCBwb3B1cCBpbiBhXG4gKiBzbWFsbCBkaWFsb2cgd2luZG93IGluIHRoZSBjb3JuZXIgb2YgdGhlIHNjcmVlbi4gVXNlciBjYW4gcHJvdmlkZSB0aXRsZSBhbmQgbWVzc2FnZSBhbmQgaW5jbHVkZSBidXR0b25zLCBvciBzZXR1cCBhdXRvIGRpc2FwcGVhcmluZy5cbiAqIFRvYXN0IG1lc3NhZ2VzIGFyZSBhdmFpbGFibGUgaW4gcHJlZGVmaW5lZCBsYXlvdXQgdHlwZXMgKGVudW1zKToge0BsaW5rIERpYWxvZ0xheW91dERpc3BsYXl9LlxuICpcbiAqIEl0IGlzIGNydWNpYWwgZm9yIHVzZXIgdG8gYWRkIHRoaXMgbW9kdWxlIGluIGFuZ3VsYXIuYXBwIGltcG9ydHMuXG4gKiBCZWxvdyBpcyB0aGUgZXhhbXBsZSB3aXRoIChvcHRpb25hbCkgZGVmYXVsdCB1c2VyIGNvbmZpZ3VyYXRpb24sIHRoYXQncyB3aGF0IHdpbGwgYmUgdXNlZCBpZiB0aGVyZSBpcyBub1xuICogbG9jYWwgY29uZmlnIHdoZW4gcG9wdXAgaXMgZXZva2VkLCB0aGF0IG1lYW5zIGl0IGNhbiBiZSBvdmVycmlkZGVuIGRpcmVjdGx5IHdoZW4gcG9wdXAgaXMgZXZva2VkLlxuICogRm9yIGltcGxlbWVudGF0aW9uIGxvb2s6IHtAbGluayBJVG9hc3ROb3RpZmljYXRpb25Vc2VyQ29uZmlnfS5cbiAqXG4gKiBFeGFtcGxlOlxuICogYGBgdHlwZXNjcmlwdFxuICogLy8gYXBwLm1vZHVsZSBpbXBvcnRzOlxuICpUb2FzdE5vdGlmaWNhdGlvbkNvbmZpZ01vZHVsZS5mb3JSb290KHtcbiAqICAgIFRvYXN0Q29yZUNvbmZpZzoge1xuICogICAgICAgV2lkdGg6ICczMDBweCcsXG4gKiAgICB9LFxuICogICAgR2xvYmFsU2V0dGluZ3M6IHtcbiAqICAgICAgIC8vIFRoZSBudW1iZXIgb2YgdG9hc3QgbWVzc2FnZXMgdGhhdCBjYW4gYmUgc2hvd24gYXQgb25jZS5cbiAqICAgICAgIEFsbG93ZWRNZXNzYWdlc0F0T25jZTogNCxcbiAqXG4gKiAgICAgICAgLy8gTWlsbGlzZWNvbmRzIGl0IHdpbGwgYmUgaWdub3JlZCBpZiBidXR0b25zIGFyZSBpbmNsdWRlZC5cbiAqICAgICAgIEF1dG9DbG9zZURlbGF5OiAzMDAwXG4gKiAgICB9LFxuICogICAgLy8gT3B0aW9uYWwgZGVmYXVsdCBtZXNzYWdlIG9iamVjdC5cbiAqICAgIE1lc3NhZ2U6IHtcbiAqICAgICAgVGl0bGU6ICdEZWZhdWx0IHRpdGxlJyxcbiAqICAgICAgRGVzY3JpcHRpb246ICdEZWZhdWx0IGRlc2NyaXB0aW9uJ1xuICogICB9LFxuICogICBCdXR0b25zOiBbXG4gKiAgICAgIG5ldyBCdXR0b25NYWtlcignT2snLCAnb2snLCBCdXR0b25MYXlvdXREaXNwbGF5LlBSSU1BUlkpLFxuICogICAgICBuZXcgQnV0dG9uTWFrZXIoJ0NhbmNlbCcsICdjYW5jZWwnLCBCdXR0b25MYXlvdXREaXNwbGF5LlNFQ09OREFSWSlcbiAqICAgXVxuICp9KVxuICogYGBgXG4gKiAqIFRvYXN0Q29yZUNvbmZpZzoge0BsaW5rIElUb2FzdENvcmVDb25maWd9XG4gKiAqIEdsb2JhbFNldHRpbmdzOiB7QGxpbmsgSUdsb2JhbFRvYXN0U2V0dGluZ3N9XG4gKiAqIE1lc3NhZ2U6IHtAbGluayBJTWVzc2FnZX1cbiAqICogQnV0dG9uczoge0BsaW5rIElCdXR0b259XG4gKiAqIEJ1dHRvbk1ha2VyOiB7QGxpbmsgQnV0dG9uTWFrZXJ9XG4gKiBAY2F0ZWdvcnkgSW1wb3J0cyBmb3IgYW5ndWxhciBhcHAubW9kdWxlXG4gKi9cbmV4cG9ydCB7VG9hc3ROb3RpZmljYXRpb25Db25maWdNb2R1bGV9IGZyb20gJy4vbmd4LWF3ZXNvbWUtcG9wdXAvbmd4LWF3ZXNvbWUtcG9wdXAubW9kdWxlJztcbi8vIGVuZHJlZ2lvblxuIl19