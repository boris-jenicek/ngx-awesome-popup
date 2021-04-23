import {GlobalClass} from './ngx-awesome-popup/core/global';
import {ConfirmBoxClass} from './ngx-awesome-popup/types/confirm-box/core/model';
import {ToastNotificationClass} from './ngx-awesome-popup/types/toast-notification/core/model';
import {DialogClass} from './ngx-awesome-popup/types/dialog/core/model';

var ButtonMaker                  = GlobalClass.ButtonMaker;
var ConfirmBoxInitializer        = ConfirmBoxClass.ConfirmBoxInitializer;
var ToastNotificationInitializer = ToastNotificationClass.ToastNotificationInitializer;
var DialogInitializer            = DialogClass.DialogInitializer;
var DialogBelonging              = DialogClass.DialogBelonging;
// endregion
export {ButtonLayoutDisplay} from './ngx-awesome-popup/core/enums';
export {DialogLayoutDisplay} from './ngx-awesome-popup/core/enums';
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
export {ToastNotificationConfigModule} from './ngx-awesome-popup/ngx-awesome-popup.module';
// endregion
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljX2FwaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3B1YmxpY19hcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFdBQVcsRUFBa0IsTUFBTSxpQ0FBaUMsQ0FBQztBQUM3RSxPQUFPLEVBQUMsZUFBZSxFQUFzQixNQUFNLGtEQUFrRCxDQUFDO0FBQ3RHLE9BQU8sRUFBQyxzQkFBc0IsRUFBNkIsTUFBTSx5REFBeUQsQ0FBQztBQUMzSCxPQUFPLEVBQUMsV0FBVyxFQUFrQixNQUFNLDZDQUE2QyxDQUFDO0FBTXpGLElBQU8sV0FBVyxHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUM7QUFLN0MsSUFBTyxxQkFBcUIsR0FBRyxlQUFlLENBQUMscUJBQXFCLENBQUM7QUFHckUsSUFBTyw0QkFBNEIsR0FBRyxzQkFBc0IsQ0FBQyw0QkFBNEIsQ0FBQztBQVMxRixJQUFPLGlCQUFpQixHQUFHLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQztBQUN6RCxJQUFPLGVBQWUsR0FBRyxXQUFXLENBQUMsZUFBZSxDQUFDO0FBcUJyRCxZQUFZO0FBRVosT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDbkUsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFJbkU7O0dBRUc7QUFDSCxPQUFPLEVBQUMsV0FBVyxFQUFDLENBQUM7QUFHckI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1ERztBQUNILE9BQU8sRUFBQyxlQUFlLEVBQUMsQ0FBQztBQXFCekIsWUFBWTtBQUVaLDZCQUE2QjtBQUU3Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtDRztBQUNILE9BQU8sRUFBQyw0QkFBNEIsRUFBQyxDQUFDO0FBQ3RDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1DRztBQUNILE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxDQUFDO0FBQy9COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOENHO0FBQ0gsT0FBTyxFQUFDLGlCQUFpQixFQUFDLENBQUM7QUFDM0IsWUFBWTtBQUVaLGdEQUFnRDtBQUNoRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFDSCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSw4Q0FBOEMsQ0FBQztBQUNuRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOEJHO0FBQ0gsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sOENBQThDLENBQUM7QUFDaEY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQ0c7QUFDSCxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSw4Q0FBOEMsQ0FBQztBQUNwRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Q0c7QUFDSCxPQUFPLEVBQUMsNkJBQTZCLEVBQUMsTUFBTSw4Q0FBOEMsQ0FBQztBQUMzRixZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtHbG9iYWxDbGFzcywgR2xvYmFsSW50ZXJmYWNlfSBmcm9tICcuL25neC1hd2Vzb21lLXBvcHVwL2NvcmUvZ2xvYmFsJztcbmltcG9ydCB7Q29uZmlybUJveENsYXNzLCBDb25maXJtQm94SW50ZXJmYWNlfSBmcm9tICcuL25neC1hd2Vzb21lLXBvcHVwL3R5cGVzL2NvbmZpcm0tYm94L2NvcmUvbW9kZWwnO1xuaW1wb3J0IHtUb2FzdE5vdGlmaWNhdGlvbkNsYXNzLCBUb2FzdE5vdGlmaWNhdGlvbkludGVyZmFjZX0gZnJvbSAnLi9uZ3gtYXdlc29tZS1wb3B1cC90eXBlcy90b2FzdC1ub3RpZmljYXRpb24vY29yZS9tb2RlbCc7XG5pbXBvcnQge0RpYWxvZ0NsYXNzLCBEaWFsb2dJbnRlcmZhY2V9IGZyb20gJy4vbmd4LWF3ZXNvbWUtcG9wdXAvdHlwZXMvZGlhbG9nL2NvcmUvbW9kZWwnO1xuXG5pbXBvcnQgSUJ1dHRvbiA9IEdsb2JhbEludGVyZmFjZS5JQnV0dG9uO1xuaW1wb3J0IElNZXNzYWdlID0gR2xvYmFsSW50ZXJmYWNlLklNZXNzYWdlO1xuaW1wb3J0IElHbG9iYWxVc2VyQ29uZmlnID0gR2xvYmFsSW50ZXJmYWNlLklHbG9iYWxVc2VyQ29uZmlnO1xuaW1wb3J0IElDb2xvclR5cGVzID0gR2xvYmFsSW50ZXJmYWNlLklDb2xvclR5cGVzO1xuaW1wb3J0IEJ1dHRvbk1ha2VyID0gR2xvYmFsQ2xhc3MuQnV0dG9uTWFrZXI7XG5cbmltcG9ydCBJQ29uZmlybUJveFB1YmxpY1Jlc3BvbnNlID0gQ29uZmlybUJveEludGVyZmFjZS5JQ29uZmlybUJveFB1YmxpY1Jlc3BvbnNlO1xuaW1wb3J0IElDb25maXJtQm94VXNlckNvbmZpZyA9IENvbmZpcm1Cb3hJbnRlcmZhY2UuSUNvbmZpcm1Cb3hVc2VyQ29uZmlnO1xuaW1wb3J0IElDb25maXJtQm94Q29yZUNvbmZpZyA9IENvbmZpcm1Cb3hJbnRlcmZhY2UuSUNvbmZpcm1Cb3hDb3JlQ29uZmlnO1xuaW1wb3J0IENvbmZpcm1Cb3hJbml0aWFsaXplciA9IENvbmZpcm1Cb3hDbGFzcy5Db25maXJtQm94SW5pdGlhbGl6ZXI7XG5cbmltcG9ydCBJVG9hc3ROb3RpZmljYXRpb25QdWJsaWNSZXNwb25zZSA9IFRvYXN0Tm90aWZpY2F0aW9uSW50ZXJmYWNlLklUb2FzdE5vdGlmaWNhdGlvblB1YmxpY1Jlc3BvbnNlO1xuaW1wb3J0IFRvYXN0Tm90aWZpY2F0aW9uSW5pdGlhbGl6ZXIgPSBUb2FzdE5vdGlmaWNhdGlvbkNsYXNzLlRvYXN0Tm90aWZpY2F0aW9uSW5pdGlhbGl6ZXI7XG5pbXBvcnQgSVRvYXN0Q29yZUNvbmZpZyA9IFRvYXN0Tm90aWZpY2F0aW9uSW50ZXJmYWNlLklUb2FzdENvcmVDb25maWc7XG5pbXBvcnQgSUdsb2JhbFRvYXN0U2V0dGluZ3MgPSBUb2FzdE5vdGlmaWNhdGlvbkludGVyZmFjZS5JR2xvYmFsVG9hc3RTZXR0aW5ncztcbmltcG9ydCBJVG9hc3ROb3RpZmljYXRpb25Vc2VyQ29uZmlnID0gVG9hc3ROb3RpZmljYXRpb25JbnRlcmZhY2UuSVRvYXN0Tm90aWZpY2F0aW9uVXNlckNvbmZpZztcblxuaW1wb3J0IElEaWFsb2dFdmVudHNDb250cm9sbGVyID0gRGlhbG9nSW50ZXJmYWNlLklEaWFsb2dFdmVudHNDb250cm9sbGVyO1xuaW1wb3J0IElEaWFsb2dQdWJsaWNSZXNwb25zZSA9IERpYWxvZ0ludGVyZmFjZS5JRGlhbG9nUHVibGljUmVzcG9uc2U7XG5pbXBvcnQgSURpYWxvZ1VzZXJDb25maWcgPSBEaWFsb2dJbnRlcmZhY2UuSURpYWxvZ1VzZXJDb25maWc7XG5pbXBvcnQgSURpYWxvZ0NvcmVDb25maWcgPSBEaWFsb2dJbnRlcmZhY2UuSURpYWxvZ0NvcmVDb25maWc7XG5pbXBvcnQgRGlhbG9nSW5pdGlhbGl6ZXIgPSBEaWFsb2dDbGFzcy5EaWFsb2dJbml0aWFsaXplcjtcbmltcG9ydCBEaWFsb2dCZWxvbmdpbmcgPSBEaWFsb2dDbGFzcy5EaWFsb2dCZWxvbmdpbmc7XG5cbi8vIHJlZ2lvbiAqKiogSW50ZXJmYWNlICoqKlxuZXhwb3J0IHtJR2xvYmFsVXNlckNvbmZpZ307XG5leHBvcnQge0lCdXR0b259O1xuZXhwb3J0IHtJTWVzc2FnZX07XG5leHBvcnQge0lDb2xvclR5cGVzfTtcblxuZXhwb3J0IHtJQ29uZmlybUJveFVzZXJDb25maWd9O1xuZXhwb3J0IHtJQ29uZmlybUJveENvcmVDb25maWd9O1xuZXhwb3J0IHtJQ29uZmlybUJveFB1YmxpY1Jlc3BvbnNlfTtcblxuZXhwb3J0IHtJR2xvYmFsVG9hc3RTZXR0aW5nc307XG5leHBvcnQge0lUb2FzdENvcmVDb25maWd9O1xuZXhwb3J0IHtJVG9hc3ROb3RpZmljYXRpb25Vc2VyQ29uZmlnfTtcbmV4cG9ydCB7SVRvYXN0Tm90aWZpY2F0aW9uUHVibGljUmVzcG9uc2V9O1xuXG5leHBvcnQge0lEaWFsb2dVc2VyQ29uZmlnfTtcbmV4cG9ydCB7SURpYWxvZ0NvcmVDb25maWd9O1xuZXhwb3J0IHtJRGlhbG9nUHVibGljUmVzcG9uc2V9O1xuZXhwb3J0IHtJRGlhbG9nRXZlbnRzQ29udHJvbGxlcn07XG4vLyBlbmRyZWdpb25cblxuZXhwb3J0IHtCdXR0b25MYXlvdXREaXNwbGF5fSBmcm9tICcuL25neC1hd2Vzb21lLXBvcHVwL2NvcmUvZW51bXMnO1xuZXhwb3J0IHtEaWFsb2dMYXlvdXREaXNwbGF5fSBmcm9tICcuL25neC1hd2Vzb21lLXBvcHVwL2NvcmUvZW51bXMnO1xuZXhwb3J0IHtWZXJ0aWNhbFBvc2l0aW9ufSBmcm9tICcuL25neC1hd2Vzb21lLXBvcHVwL2NvcmUvZW51bXMnO1xuXG5cbi8qKlxuICogQHJldHVybnMgSXQgd2lsbCByZXR1cm4gY3VzdG9tIGJ1dHRvbiBvYmplY3QgcmVhZHkgdG8gYmUgdXNlZCBpbiBjaGlsZCBjb21wb25lbnQgbGF5b3V0LlxuICovXG5leHBvcnQge0J1dHRvbk1ha2VyfTtcblxuXG4vKipcbiAqIFRoaXMgaXMgdGhlIGNsYXNzIHRoYXQgbmVlZHMgdG8gYmUgYWRkZWQgYXMgREkgaW4gdGhlIGNvbnN0cnVjdG9yIG9mIGEgY2hpbGQgY29tcG9uZW50IHRoYXQgd2lsbCBiZVxuICogb3BlbmVkIGR5bmFtaWNhbGx5IHdpdGgge0BsaW5rIERpYWxvZ0luaXRpYWxpemVyfS4gSXQgY29udGFpbnMgdmFyaW91cyBpbmZvcm1hdGlvbiBvclxuICogZXZlbnQgY29udHJvbGxlcnMsIGFuZCBsaXN0ZW5lcnMgdGhhdCBjYW4gYmUgdXNlZCBpbiBhIGNoaWxkIGNvbXBvbmVudC4gQWxzbywgdGhlcmUgaXMgY3VzdG9tIGRhdGFcbiAqIHRoYXQgaXMgc2VudCBmcm9tIGNvbXBvbmVudCB3aGVyZSB0aGUge0BsaW5rIERpYWxvZ0luaXRpYWxpemVyfSBpcy4gVXNlciBjYW4gc2V0IHNwZWNpZmljIHR5cGUgb2ZcbiAqIGN1c3RvbSBkYXRhIHRoYXQgY2hpbGQgY29tcG9uZW50IHdpbGwgcmVjZWl2ZSBieSBpbmNsdWRpbmcgaXQgYXMgZ2VuZXJpYyB0eXBlLlxuICpcbiAqXG4gKiBFeGFtcGxlOlxuICogYGBgdHlwZXNjcmlwdFxuICppbXBvcnQge0RpYWxvZ0JlbG9uZ2luZ30gZnJvbSAnbmd4LWF3ZXNvbWUtcG9wdXAnO1xuICpAQ29tcG9uZW50KHtcbiAqICAgIHNlbGVjdG9yICAgOiAnYXBwLWN1cCcsXG4gKiAgICB0ZW1wbGF0ZVVybDogJy4vY3VwLmNvbXBvbmVudC5odG1sJyxcbiAqICAgIHN0eWxlVXJscyAgOiBbJy4vY3VwLmNvbXBvbmVudC5zY3NzJ11cbiAqfSlcbiAqIGV4cG9ydCBjbGFzcyBDdXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gKlxuICogICAgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcbiAqXG4gKiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRpYWxvZ0JlbG9uZ2luZzogRGlhbG9nQmVsb25naW5nKSB7XG4gKiAgICB9XG4gKlxuICogICAgbmdPbkluaXQoKTogdm9pZCB7XG4gKiAgICBjb25zb2xlLmxvZyh0aGlzLmRpYWxvZ0JlbG9uZ2luZyk7XG4gKlxuICogICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICogICAgICAgICAgICB0aGlzLmRpYWxvZ0JlbG9uZ2luZy5FdmVudHNDb250cm9sbGVyLm9uQnV0dG9uQ2xpY2skLnN1YnNjcmliZSgoX0J1dHRvbikgPT4ge1xuICogICAgICAgICAgICBpZiAoX0J1dHRvbi5JRCA9PT0gJ29rJykge1xuICogICAgICAgICAgICAgICAgLy8gRG8gc29tZSBsb2dpYyBhbmQgY2xvc2UgcG9wdXAuXG4gKiAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ0JlbG9uZ2luZy5FdmVudHNDb250cm9sbGVyLmNsb3NlKCk7XG4gKiAgICAgICAgICAgIH0gZWxzZSBpZiAoX0J1dHRvbi5JRCA9PT0gJ2NhbmNlbCcpIHtcbiAqICAgICAgICAgICAgICAgIC8vIERvIHNvbWUgbG9naWMgYW5kIGNsb3NlIHBvcHVwLlxuICogICAgICAgICAgICAgICAgdGhpcy5kaWFsb2dCZWxvbmdpbmcuRXZlbnRzQ29udHJvbGxlci5jbG9zZSgpO1xuICogICAgICAgICAgICB9XG4gKiAgICAgICAgfSlcbiAqICAgICAgICApO1xuICpcbiAqICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAqICAgICAgICAgICAgLy8gQ2xvc2UgbG9hZGVyIGFmdGVyIGFzeW5jIGRhdGEgaXMgcmVhZHkuXG4gKiAgICAgICAgICAgIHRoaXMuZGlhbG9nQmVsb25naW5nLkV2ZW50c0NvbnRyb2xsZXIuY2xvc2VMb2FkZXIoKTtcbiAqICAgICAgICB9LCAxMDAwKTtcbiAqICAgIH1cbiAqfVxuIFxuIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICAvLyBDbG9zZSBhbGwgc3Vic2NyaXB0aW9ucy5cbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goc3ViID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcbiAgICB9XG4gKiBgYGBcbiAqIEBjYXRlZ29yeSBjaGlsZCBkeW5hbWljIGNvbXBvbmVudCBkYXRhICYgZXZlbnQgY29udHJvbGxlclxuICovXG5leHBvcnQge0RpYWxvZ0JlbG9uZ2luZ307XG5cbi8vIHJlZ2lvbiAqKiogT2JzZXJ2YWJsZSByZXNwb25zZSBhZnRlciBjbG9zaW5nIHBvcHVwICoqKlxuLyoqXG4gKiBSZWd1bGFyIGRlc2NyaXB0aW9uXG4gKlxuICogQGNhdGVnb3J5IE9ic2VydmFibGUgcmVzcG9uc2UgYWZ0ZXIgY2xvc2luZyBwb3B1cFxuICovXG5leHBvcnQge0lUb2FzdE5vdGlmaWNhdGlvblB1YmxpY1Jlc3BvbnNlIGFzIElUb2FzdE5vdGlmaWNhdGlvblJlc3BvbnNlfTtcbi8qKlxuICogUmVndWxhciBkZXNjcmlwdGlvblxuICpcbiAqIEBjYXRlZ29yeSBPYnNlcnZhYmxlIHJlc3BvbnNlIGFmdGVyIGNsb3NpbmcgcG9wdXBcbiAqL1xuZXhwb3J0IHtJQ29uZmlybUJveFB1YmxpY1Jlc3BvbnNlIGFzIElDb25maXJtQm94UmVzcG9uc2V9O1xuLyoqXG4gKiBSZWd1bGFyIGRlc2NyaXB0aW9uXG4gKlxuICogQGNhdGVnb3J5IE9ic2VydmFibGUgcmVzcG9uc2UgYWZ0ZXIgY2xvc2luZyBwb3B1cFxuICovXG5leHBvcnQge0lEaWFsb2dQdWJsaWNSZXNwb25zZSBhcyBJRGlhbG9nUmVzcG9uc2V9O1xuLy8gZW5kcmVnaW9uXG5cbi8vIHJlZ2lvbiAqKiogUG9wdXAgb3BlbiAgKioqXG5cbi8qKlxuICogVGhpcyBpcyB0aGUgY2xhc3MgdGhhdCBuZWVkcyB0byBiZSBpbnN0YW50aWF0ZWQgdG8gc2V0IHVwIGFuZCBpZ25pdGUgYSBUb2FzdE5vdGlmaWNhdGlvbixcbiAqIGl0cyBwdXJwb3NlIGlzIHRvIHNob3cgc2hvcnQgbm90aWZpY2F0aW9uIHRvIGVuZC11c2VyLCBvciBldmVuIGludGVyYWN0IHdpdGggdXNlci5cbiAqIEl0IGNhbiBiZSBldm9rZWQgZnJvbSBhbnkgYW5ndWxhciB0eXBlc2NyaXB0IGZpbGUuXG4gKlxuICogQmVsb3cgaXMgdGhlIGV4YW1wbGUgd2l0aCAoc29tZSBvcHRpb25hbCkgdXNlciBjb25maWd1cmF0aW9uLFxuICogaXQgd2lsbCBvdmVycmlkZSBkZWZhdWx0IGNvbmZpZ3VyYXRpb24gZnJvbSBhcHAubW9kdWxlLlxuICpcbiAqXG4gKiBFeGFtcGxlOlxuICogYGBgdHlwZXNjcmlwdFxuICogLy8gQ3JlYXRlIHRoZSBpbml0aWFsaXplci5cbiAqY29uc3QgbmV3VG9hc3ROb3RpZmljYXRpb24gPSBuZXcgVG9hc3ROb3RpZmljYXRpb25Jbml0aWFsaXplcigpO1xuICpcbiAqIC8vIFNldCBkZXNpcmVkIFRpdGxlLlxuICpuZXdUb2FzdE5vdGlmaWNhdGlvbi5zZXRUaXRsZSgnV2FybmluZyEnKTtcbiAqXG4gKiAvLyBTZXQgZGVzaXJlZCBEZXNjcmlwdGlvbi5cbiAqbmV3VG9hc3ROb3RpZmljYXRpb24uc2V0RGVzY3JpcHRpb24oJ0Zvcm0gaXMgbm90IHZhbGlkIScpO1xuICpcbiAqIC8vIFNldCBkZXNpcmVkIGNvbmZpZ3VyYXRpb24uXG4gKm5ld1RvYXN0Tm90aWZpY2F0aW9uLnNldENvbmZpZyh7XG4gKiAgICAgIExheW91dFR5cGU6IERpYWxvZ0xheW91dERpc3BsYXkuV0FSTklOR1xuICogICB9KTtcbiBcbiAqIC8vIE9wZW4gYSBUb2FzdE5vdGlmaWNhdGlvbi5cbiAqIG5ld0NvbmZpcm1Cb3gub3BlbkNvbmZpcm1Cb3gkKCkuc3Vic2NyaWJlKHJlc3AgPT4ge1xuICogICBjb25zb2xlLmxvZygnY29uZmlybUJveCByZXNwb25zZTogJywgcmVzcCk7XG4gKiAgfSk7XG4gKiBgYGBcbiAqICogSVRvYXN0Q29yZUNvbmZpZzoge0BsaW5rIElUb2FzdENvcmVDb25maWd9XG4gKiAqIExheW91dFR5cGU6IHtAbGluayBEaWFsb2dMYXlvdXREaXNwbGF5fVxuICogKiBJVG9hc3ROb3RpZmljYXRpb25QdWJsaWNSZXNwb25zZToge0BsaW5rIElUb2FzdE5vdGlmaWNhdGlvblB1YmxpY1Jlc3BvbnNlfVxuICogQGNhdGVnb3J5IFBvcHVwIG9wZW5cbiAqL1xuZXhwb3J0IHtUb2FzdE5vdGlmaWNhdGlvbkluaXRpYWxpemVyfTtcbi8qKlxuICogVGhpcyBpcyB0aGUgY2xhc3MgdGhhdCBuZWVkcyB0byBiZSBpbnN0YW50aWF0ZWQgdG8gc2V0IHVwIGFuZCBpZ25pdGUgYSBDb25maXJtQm94IGFuZCBjcmVhdGUgY29udGVudC5cbiAqIEl0cyBwdXJwb3NlIGlzIHRvIGdldCBjb25maXJtYXRpb24gcmVzcG9uc2UgZnJvbSBlbmQtdXNlci4gSXQgY2FuIGJlIGNhbGxlZCBmcm9tIGFueSBhbmd1bGFyXG4gKiB0eXBlc2NyaXB0IGZpbGUuXG4gKlxuICogQmVsb3cgaXMgZXhhbXBsZSB3aXRoIChzb21lIG9wdGlvbmFsKSB1c2VyIGNvbmZpZ3VyYXRpb24sXG4gKiBpdCB3aWxsIG92ZXJyaWRlIGRlZmF1bHQgY29uZmlndXJhdGlvbiBmcm9tIGFwcC5tb2R1bGUuXG4gKlxuICpcbiAqIEV4YW1wbGU6XG4gKiBgYGB0eXBlc2NyaXB0XG4gKiAvLyBDcmVhdGUgdGhlIGluaXRpYWxpemVyLlxuICpjb25zdCBuZXdDb25maXJtQm94ID0gbmV3IENvbmZpcm1Cb3hJbml0aWFsaXplcigpO1xuICpcbiAqIC8vIFNldCBkZXNpcmVkIG1lc3NhZ2U6IF9UaXRsZTogc3RyaW5nLCBfRGVzY3JpcHRpb246IHN0cmluZy5cbiAqbmV3Q29uZmlybUJveC5zZXRNZXNzYWdlKCdBcmUgeW91IHN1cmU/JywgJ1RoYXQgYWN0aW9uIHdpbGwgZGVsZXRlIHVzZXIhJyk7XG4gKlxuICogLy8gU2V0IGRlc2lyZWQgY29uZmlndXJhdGlvbi5cbiAqbmV3Q29uZmlybUJveC5zZXRDb25maWcoe1xuICogICAgICBMYXlvdXRUeXBlOiBEaWFsb2dMYXlvdXREaXNwbGF5LkRBTkdFUlxuICogICB9KTtcbiAqXG4gKiAvLyBTZXQgYnV0dG9uIGxhYmVscy5cbiAqIG5ld0NvbmZpcm1Cb3guc2V0QnV0dG9uTGFiZWxzKCdZRVMnLCAnTk8nKTtcbiAqXG4gKiAvLyBPcGVuIGEgQ29uZmlybUJveCwgYW5kIGdldCBjbGlja2VkIGJ1dHRvbi1pZCBpbiByZXNwb25zZS5cbiAqIG5ld0NvbmZpcm1Cb3gub3BlbkNvbmZpcm1Cb3gkKCkuc3Vic2NyaWJlKHJlc3AgPT4ge1xuICogICAvLyBJQ29uZmlybUJveFB1YmxpY1Jlc3BvbnNlXG4gKiAgIGNvbnNvbGUubG9nKCdjb25maXJtQm94IHJlc3BvbnNlOiAnLCByZXNwKTtcbiAqICB9KTtcbiAqIGBgYFxuICogKiBJQ29uZmlybUJveENvcmVDb25maWc6IHtAbGluayBJQ29uZmlybUJveENvcmVDb25maWd9XG4gKiAqIExheW91dFR5cGU6IHtAbGluayBEaWFsb2dMYXlvdXREaXNwbGF5fVxuICogKiBJQ29uZmlybUJveFB1YmxpY1Jlc3BvbnNlOiB7QGxpbmsgSUNvbmZpcm1Cb3hQdWJsaWNSZXNwb25zZX1cbiAqIEBjYXRlZ29yeSBQb3B1cCBvcGVuXG4gKi9cbmV4cG9ydCB7Q29uZmlybUJveEluaXRpYWxpemVyfTtcbi8qKlxuICogVGhpcyBpcyB0aGUgY2xhc3MgdGhhdCBuZWVkcyB0byBiZSBpbnN0YW50aWF0ZWQgdG8gc2V0IHVwIGFuZCBpZ25pdGUgYSBEaWFsb2cgYW5kIGNyZWF0ZSBkeW5hbWljIGNvbXBvbmVudCxcbiAqIGl0cyBwdXJwb3NlIGlzIHRvIHJlbmRlciBhbnkgYW5ndWxhciBjb21wb25lbnQgdmlldyB3aXRoIHNwZWNpZmljIGNvbmZpZ3VyYXRpb24gZnJvbSBhbnkgYW5ndWxhciB0eXBlc2NyaXB0IGZpbGUuXG4gKiBEeW5hbWljIGNvbXBvbmVudCBtZWFucyB0aGF0IHVzZXIgY2FuIGV2b2tlIHRoZSBwb3B1cCBmcm9tIHR5cGVzY3JpcHQgYW5kIGNvbXBvbmVudCB2aWV3XG4gKiBpcyBkeW5hbWljYWxseSBjcmVhdGVkIHdpdGggdGhlIEF3ZXNvbWUgUG9wdXAgZW5naW5lLiBUaGVyZSBpcyBubyBuZWVkIHRvIGNhbGwgYW55IHNlbGVjdG9yIGluIEhUTUwgdG8gY3JlYXRlIGNvbXBvbmVudCB2aWV3LlxuICpcbiAqIERpYWxvZ0luaXRpYWxpemVyIGNhbiBzZW5kIGRhdGEgdG8gY2hpbGQgY29tcG9uZW50IChkeW5hbWljIGNvbXBvbmVudCkgd2hlcmUgZGF0YSB3aWxsIGJlIGFjY2Vzc2libGUgd2l0aCB7QGxpbmsgRGlhbG9nQmVsb25naW5nfS5cbiAqXG4gKiBCZWxvdyBpcyB0aGUgZXhhbXBsZSB3aXRoIChzb21lIG9wdGlvbmFsKSB1c2VyIGNvbmZpZ3VyYXRpb24sXG4gKiBpdCB3aWxsIG92ZXJyaWRlIGRlZmF1bHQgY29uZmlndXJhdGlvbiBmcm9tIGFwcC5tb2R1bGUuXG4gKlxuICpcbiAqIEV4YW1wbGU6XG4gKiBgYGB0eXBlc2NyaXB0XG4gKiAgaW1wb3J0IHtEaWFsb2dJbml0aWFsaXplciwgRGlhbG9nTGF5b3V0RGlzcGxheSwgQnV0dG9uTWFrZXIsIEJ1dHRvbkxheW91dERpc3BsYXl9IGZyb20gJ25neC1hd2Vzb21lLXBvcHVwJzs8XG4gKiAgaW1wb3J0IHtDdXBDb21wb25lbnR9IGZyb20gJy4vY3VwL2N1cC5jb21wb25lbnQnO1xuICpcbiAqICBjb25zdCBuZXdEaWFsb2dQb3B1cCA9IG5ldyBEaWFsb2dJbml0aWFsaXplcihDdXBDb21wb25lbnQpOyAvLyBBbnkgQW5ndWxhciBjb21wb25lbnQuXG4gKlxuICogIC8vIEN1c3RvbSBkYXRhIHdpbGwgYmUgc2VudCB0byBkeW5hbWljIGNvbXBvbmVudCBhdmFpbGFibGUgaW4gZGlhbG9nQmVsb25naW5nIG9iamVjdC5cbiAqICBuZXdEaWFsb2dQb3B1cC5zZXRDdXN0b21EYXRhKHtuYW1lOiAnSm9obicsIHN1cm5hbWU6ICdEb2UnLCBpZDogMX0pO1xuICpcbiAqICAvLyBMb2NhbCBjb25maWcgc2V0dGluZ3MgSURpYWxvZ0NvcmVDb25maWcuXG4gKiAgbmV3RGlhbG9nUG9wdXAuc2V0Q29uZmlnKHtcbiAqICAgICAgSGVpZ2h0OiAnNTAwcHgnLFxuICogICAgICBMYXlvdXRUeXBlOiBEaWFsb2dMYXlvdXREaXNwbGF5LklORk8sXG4gKiAgICAgIExvYWRlckNvbXBvbmVudDogQW55IEFuZ3VsYXIgY29tcG9uZW50IG5hbWVcbiAqICAgICAgIH0pO1xuICpcbiAqICAvLyBDdXN0b20gYnV0dG9ucywgbGlzdGVuZXIgaXMgYXZhaWxhYmxlIGluIGNoaWxkIGNvbXBvbmVudCBpbiBkaWFsb2dCZWxvbmdpbmcgb2JqZWN0LlxuICogIG5ld0RpYWxvZ1BvcHVwLnNldEJ1dHRvbnMoW1xuICogICAgICBuZXcgQnV0dG9uTWFrZXIoJ09rJywgJ29rJywgQnV0dG9uTGF5b3V0RGlzcGxheS5QUklNQVJZKSxcbiAqICAgICAgbmV3IEJ1dHRvbk1ha2VyKCdDYW5jZWwnLCAnY2FuY2VsJywgQnV0dG9uTGF5b3V0RGlzcGxheS5TRUNPTkRBUlkpXG4gKiAgXSk7XG4gKlxuICogIC8vIENvbW1hbmQgdG8gb3BlbiBkaWFsb2csIGl0IHJldHVybnMgb2JzZXJ2YWJsZS5cbiAqICBuZXdEaWFsb2dQb3B1cC5vcGVuRGlhbG9nJDxhbnk+KCkuc3Vic2NyaWJlKHJlc3AgPT4ge1xuICogICAgICAgICAgIGNvbnNvbGUubG9nKCdyZXNwb25zZTogJywgcmVzcC5QYXlsb2FkKTtcbiAqICAgICAgIH0pO1xuICogYGBgXG4gKiAqIElEaWFsb2dDb3JlQ29uZmlnOiB7QGxpbmsgSURpYWxvZ0NvcmVDb25maWd9XG4gKiAqIExheW91dFR5cGU6IHtAbGluayBEaWFsb2dMYXlvdXREaXNwbGF5fVxuICogKiBCdXR0b25MYXlvdXREaXNwbGF5OiB7QGxpbmsgQnV0dG9uTGF5b3V0RGlzcGxheX1cbiAqICogQnV0dG9uTWFrZXI6IHtAbGluayBCdXR0b25NYWtlcn1cbiAqICogSURpYWxvZ1B1YmxpY1Jlc3BvbnNlOiB7QGxpbmsgSURpYWxvZ1B1YmxpY1Jlc3BvbnNlfVxuICogQGNhdGVnb3J5IFBvcHVwIG9wZW5cbiAqL1xuZXhwb3J0IHtEaWFsb2dJbml0aWFsaXplcn07XG4vLyBlbmRyZWdpb25cblxuLy8gcmVnaW9uICoqKiBJbXBvcnRzIGZvciBhbmd1bGFyIGFwcC5tb2R1bGUgKioqXG4vKipcbiAqIFRoaXMgaXMgdGhlIG1haW4gbW9kdWxlIG9mIHRoZSBsaWJyYXJ5LCBpdCBpcyBjcnVjaWFsIHRvIGJlIGFkZGVkIHdpdGhpbiBhbmd1bGFyLmFwcFxuICogaW1wb3J0cyBhcyBhbiBleGFtcGxlIHdpdGggb3B0aW9uYWwgYXJndW1lbnQsIGxvb2s6IHtAbGluayBJR2xvYmFsVXNlckNvbmZpZ31cbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiAvLyBhcHAubW9kdWxlIGltcG9ydHM6XG4gKiBOZ3hBd2Vzb21lUG9wdXBNb2R1bGUuZm9yUm9vdCh7XG4gKiAgICAgQ29sb3JMaXN0OiB7XG4gKiAgICAgICAgICAgIFByaW1hcnkgIDogJyNmZjllMDAnLCAvLyBvcHRpb25hbFxuICogICAgICAgICAgICBTZWNvbmRhcnk6ICcjOTg5ZWE1JywgLy8gb3B0aW9uYWxcbiAqICAgICAgICAgICAgSW5mbyAgICAgOiAnIzJmOGVlNScsIC8vIG9wdGlvbmFsXG4gKiAgICAgICAgICAgIFN1Y2Nlc3MgIDogJyMzY2FlYTMnLCAvLyBvcHRpb25hbFxuICogICAgICAgICAgICBXYXJuaW5nICA6ICcjZmZjMTA3JywgLy8gb3B0aW9uYWxcbiAqICAgICAgICAgICAgRGFuZ2VyICAgOiAnI2U0NjQ2NCcsIC8vIG9wdGlvbmFsXG4gKiAgICAgICAgICAgIExpZ2h0ICAgIDogJyNmYmZiZmInLCAvLyBvcHRpb25hbFxuICogICAgICAgICAgICBEYXJrICAgICA6ICcjMzQzYTQwJyAgLy8gb3B0aW9uYWxcbiAqICAgICAgICAgICB9XG4gKiB9KVxuICogYGBgXG4gKiBAY2F0ZWdvcnkgSW1wb3J0cyBmb3IgYW5ndWxhciBhcHAubW9kdWxlXG4gKi9cbmV4cG9ydCB7Tmd4QXdlc29tZVBvcHVwTW9kdWxlfSBmcm9tICcuL25neC1hd2Vzb21lLXBvcHVwL25neC1hd2Vzb21lLXBvcHVwLm1vZHVsZSc7XG4vKipcbiAqIFRoaXMgaXMgdGhlIG1vZHVsZSB0aGF0IGlnbml0ZXMgZHluYW1pYyBkaWFsb2cgbW9kYWwsIGl0cyBwdXJwb3NlIGlzIHRvIGxvYWQgYW55IGFuZ3VsYXIgY29tcG9uZW50IGluXG4gKiBkaWFsb2cgd2luZG93LiBEeW5hbWljIGNvbXBvbmVudCBtZWFucyB0aGF0IHVzZXIgY2FuIGV2b2tlIGFueSBBbmd1bGFyIGNvbXBvbmVudCBpbiB0aGUgcG9wdXAganVzdCBmcm9tIHR5cGVzY3JpcHQuIENvbXBvbmVudCB2aWV3XG4gKiBpcyBkeW5hbWljYWxseSBjcmVhdGVkIHdpdGggdGhlIGxpYnJhcnkgZW5naW5lIGFuZCB0aGVyZSBpcyBubyBuZWVkIHRvIGNhbGwgYW55IHNlbGVjdG9yIGluIEhUTUwgdG8gY3JlYXRlIGNvbXBvbmVudCB2aWV3LlxuICpcbiAqIEl0IGlzIGNydWNpYWwgZm9yIHVzZXIgdG8gYWRkIHRoaXMgbW9kdWxlIGluIGFuZ3VsYXIuYXBwIGltcG9ydHMuXG4gKiBCZWxvdyBpcyB0aGUgZXhhbXBsZSB3aXRoIChvcHRpb25hbCkgZGVmYXVsdCB1c2VyIGNvbmZpZ3VyYXRpb24sIHRoYXQgaXMgd2hhdCB3aWxsIGJlIGluIHNldHVwIGlmIHRoZXJlIGlzIG5vXG4gKiBsb2NhbCBjb25maWcgd2hlbiBwb3B1cCBpcyBldm9rZWQsIHRoYXQgbWVhbnMgaXQgY2FuIGJlIG92ZXJyaWRkZW4gZGlyZWN0bHkgd2hlbiBwb3B1cCBpcyBjYWxsZWQuXG4gKiBGb3IgaW1wbGVtZW50YXRpb24gbG9vazoge0BsaW5rIElEaWFsb2dVc2VyQ29uZmlnfS5cbiAqXG4gKiBFeGFtcGxlOlxuICogYGBgdHlwZXNjcmlwdFxuICogLy8gYXBwLm1vZHVsZSBpbXBvcnRzOlxuICpEaWFsb2dDb25maWdNb2R1bGUuZm9yUm9vdCh7XG4gKiAgICAgRGlhbG9nQ29yZUNvbmZpZzoge1xuICogICAgICAgIFdpZHRoICAgICAgICA6ICc1MDBweCcsXG4gKiAgICAgICAgQnV0dG9uUG9zaXRpb246ICdyaWdodCcsXG4gKiAgICAgICAgTGF5b3V0VHlwZTogRGlhbG9nTGF5b3V0RGlzcGxheS5JTkZPLFxuICogICAgICAgIExvYWRlckNvbXBvbmVudDogLy8gQW55IGFuZ3VsYXIgY29tcG9uZW50IGNsYXNzIG5hbWUgY2FuIGJlIGluY2x1ZGVkIGFzIGEgbG9hZGVyLlxuICogICAgIH0sXG4gKiAgICAgQnV0dG9uczogW1xuICogICAgICAgIG5ldyBCdXR0b25NYWtlcignT2snLCAnb2snLCBCdXR0b25MYXlvdXREaXNwbGF5LlBSSU1BUlkpLFxuICogICAgICAgIG5ldyBCdXR0b25NYWtlcignQ2FuY2VsJywgJ2NhbmNlbCcsIEJ1dHRvbkxheW91dERpc3BsYXkuU0VDT05EQVJZKVxuICogICAgIF0sXG4gKiB9KVxuICogYGBgXG4gKiAqIERpYWxvZ0NvcmVDb25maWcuTGF5b3V0VHlwZToge0BsaW5rIERpYWxvZ0xheW91dERpc3BsYXl9XG4gKiAqIEJ1dHRvbkxheW91dERpc3BsYXk6IHtAbGluayBCdXR0b25MYXlvdXREaXNwbGF5fVxuICogKiBCdXR0b25NYWtlcjoge0BsaW5rIEJ1dHRvbk1ha2VyfVxuICogQGNhdGVnb3J5IEltcG9ydHMgZm9yIGFuZ3VsYXIgYXBwLm1vZHVsZVxuICovXG5leHBvcnQge0RpYWxvZ0NvbmZpZ01vZHVsZX0gZnJvbSAnLi9uZ3gtYXdlc29tZS1wb3B1cC9uZ3gtYXdlc29tZS1wb3B1cC5tb2R1bGUnO1xuLyoqXG4gKiBUaGlzIGlzIHRoZSBtb2R1bGUgdGhhdCBpZ25pdGVzIENvbmZpcm0gYm94IGRpYWxvZywgaXRzIHB1cnBvc2UgaXMgdG8gc2hvdyBwb3B1cCBpbiBhXG4gKiBzbWFsbCBkaWFsb2cgd2luZG93IGluIHRoZSBtaWRkbGUgb2YgdGhlIHNjcmVlbi4gVXNlciBjYW4gcHJvdmlkZSB0aXRsZSwgZGVzY3JpcHRpb24gYW5kIGluY2x1ZGUgYnV0dG9ucy5cbiAqIENvbmZpcm0gYm94IGlzIGF2YWlsYWJsZSBpbiBwcmVkZWZpbmVkIGxheW91dCB0eXBlcyAoZW51bXMpOiB7QGxpbmsgRGlhbG9nTGF5b3V0RGlzcGxheX0uXG4gKlxuICogSXQgaXMgY3J1Y2lhbCBmb3IgdXNlciB0byBhZGQgdGhpcyBtb2R1bGUgaW4gYW5ndWxhci5hcHAgaW1wb3J0cy5cbiAqIEJlbG93IGlzIHRoZSBleGFtcGxlIHdpdGggKG9wdGlvbmFsKSBkZWZhdWx0IHVzZXIgY29uZmlndXJhdGlvbiwgdGhhdCdzIHdoYXQgd2lsbCBiZSB1c2VkIGlmIHRoZXJlIGlzIG5vXG4gKiBsb2NhbCBjb25maWcgd2hlbiBwb3B1cCBpcyBldm9rZWQsIHRoYXQgbWVhbnMgaXQgY2FuIGJlIG92ZXJyaWRkZW4gZGlyZWN0bHkgd2hlbiBwb3B1cCBpcyBldm9rZWQuXG4gKiBGb3IgaW1wbGVtZW50YXRpb24gbG9vazoge0BsaW5rIElDb25maXJtQm94VXNlckNvbmZpZ30uXG4gKlxuICogRXhhbXBsZTpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIC8vIGFwcC5tb2R1bGUgaW1wb3J0czpcbiAqQ29uZmlybUJveENvbmZpZ01vZHVsZS5mb3JSb290KHtcbiAqICAgIENvbmZpcm1Cb3hDb3JlQ29uZmlnOiB7XG4gKiAgICAgICBXaWR0aDogJzcwMHB4JyxcbiAqICAgICAgIExheW91dFR5cGU6IERpYWxvZ0xheW91dERpc3BsYXkuREFOR0VSLFxuICogICAgICAgQnV0dG9uUG9zaXRpb246ICdjZW50ZXInXG4gKiAgICB9LFxuICogICAgTWVzc2FnZTogeyAgLy8gT3B0aW9uYWwgZGVmYXVsdCBtZXNzYWdlIG9iamVjdC5cbiAqICAgICAgIFRpdGxlOiAnRGVmYXVsdCB0aXRsZScsXG4gKiAgICAgICBEZXNjcmlwdGlvbjogJ0RlZmF1bHQgZGVzY3JpcHRpb24nXG4gKiAgICB9LFxuICogICAgQnV0dG9ucyAgICAgOiBbXG4gKiAgICAgICBuZXcgQnV0dG9uTWFrZXIoJ09rJywgJ29rJywgQnV0dG9uTGF5b3V0RGlzcGxheS5QUklNQVJZKSxcbiAqICAgICAgIG5ldyBCdXR0b25NYWtlcignQ2FuY2VsJywgJ2NhbmNlbCcsIEJ1dHRvbkxheW91dERpc3BsYXkuU0VDT05EQVJZKVxuICogICAgXVxuICogfSlcbiAqIGBgYFxuICogKiBDb25maXJtQm94Q29yZUNvbmZpZzoge0BsaW5rIElDb25maXJtQm94Q29yZUNvbmZpZ31cbiAqICogTWVzc2FnZToge0BsaW5rIElNZXNzYWdlfVxuICogKiBCdXR0b25zOiB7QGxpbmsgSUJ1dHRvbn1cbiAqICogQnV0dG9uTWFrZXI6IHtAbGluayBCdXR0b25NYWtlcn1cbiAqIEBjYXRlZ29yeSBJbXBvcnRzIGZvciBhbmd1bGFyIGFwcC5tb2R1bGVcbiAqL1xuZXhwb3J0IHtDb25maXJtQm94Q29uZmlnTW9kdWxlfSBmcm9tICcuL25neC1hd2Vzb21lLXBvcHVwL25neC1hd2Vzb21lLXBvcHVwLm1vZHVsZSc7XG4vKipcbiAqIFRoaXMgaXMgdGhlIG1vZHVsZSB0aGF0IGlnbml0ZXMgVG9hc3Qgbm90aWZpY2F0aW9ucyBkaWFsb2csIGl0cyBwdXJwb3NlIGlzIHRvIHNob3cgdG9hc3QgcG9wdXAgaW4gYVxuICogc21hbGwgZGlhbG9nIHdpbmRvdyBpbiB0aGUgY29ybmVyIG9mIHRoZSBzY3JlZW4uIFVzZXIgY2FuIHByb3ZpZGUgdGl0bGUgYW5kIG1lc3NhZ2UgYW5kIGluY2x1ZGUgYnV0dG9ucywgb3Igc2V0dXAgYXV0byBkaXNhcHBlYXJpbmcuXG4gKiBUb2FzdCBtZXNzYWdlcyBhcmUgYXZhaWxhYmxlIGluIHByZWRlZmluZWQgbGF5b3V0IHR5cGVzIChlbnVtcyk6IHtAbGluayBEaWFsb2dMYXlvdXREaXNwbGF5fS5cbiAqXG4gKiBJdCBpcyBjcnVjaWFsIGZvciB1c2VyIHRvIGFkZCB0aGlzIG1vZHVsZSBpbiBhbmd1bGFyLmFwcCBpbXBvcnRzLlxuICogQmVsb3cgaXMgdGhlIGV4YW1wbGUgd2l0aCAob3B0aW9uYWwpIGRlZmF1bHQgdXNlciBjb25maWd1cmF0aW9uLCB0aGF0J3Mgd2hhdCB3aWxsIGJlIHVzZWQgaWYgdGhlcmUgaXMgbm9cbiAqIGxvY2FsIGNvbmZpZyB3aGVuIHBvcHVwIGlzIGV2b2tlZCwgdGhhdCBtZWFucyBpdCBjYW4gYmUgb3ZlcnJpZGRlbiBkaXJlY3RseSB3aGVuIHBvcHVwIGlzIGV2b2tlZC5cbiAqIEZvciBpbXBsZW1lbnRhdGlvbiBsb29rOiB7QGxpbmsgSVRvYXN0Tm90aWZpY2F0aW9uVXNlckNvbmZpZ30uXG4gKlxuICogRXhhbXBsZTpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIC8vIGFwcC5tb2R1bGUgaW1wb3J0czpcbiAqVG9hc3ROb3RpZmljYXRpb25Db25maWdNb2R1bGUuZm9yUm9vdCh7XG4gKiAgICBUb2FzdENvcmVDb25maWc6IHtcbiAqICAgICAgIFdpZHRoOiAnMzAwcHgnLFxuICogICAgfSxcbiAqICAgIEdsb2JhbFNldHRpbmdzOiB7XG4gKiAgICAgICAvLyBUaGUgbnVtYmVyIG9mIHRvYXN0IG1lc3NhZ2VzIHRoYXQgY2FuIGJlIHNob3duIGF0IG9uY2UuXG4gKiAgICAgICBBbGxvd2VkTWVzc2FnZXNBdE9uY2U6IDQsXG4gKlxuICogICAgICAgIC8vIE1pbGxpc2Vjb25kcyBpdCB3aWxsIGJlIGlnbm9yZWQgaWYgYnV0dG9ucyBhcmUgaW5jbHVkZWQuXG4gKiAgICAgICBBdXRvQ2xvc2VEZWxheTogMzAwMFxuICogICAgfSxcbiAqICAgIC8vIE9wdGlvbmFsIGRlZmF1bHQgbWVzc2FnZSBvYmplY3QuXG4gKiAgICBNZXNzYWdlOiB7XG4gKiAgICAgIFRpdGxlOiAnRGVmYXVsdCB0aXRsZScsXG4gKiAgICAgIERlc2NyaXB0aW9uOiAnRGVmYXVsdCBkZXNjcmlwdGlvbidcbiAqICAgfSxcbiAqICAgQnV0dG9uczogW1xuICogICAgICBuZXcgQnV0dG9uTWFrZXIoJ09rJywgJ29rJywgQnV0dG9uTGF5b3V0RGlzcGxheS5QUklNQVJZKSxcbiAqICAgICAgbmV3IEJ1dHRvbk1ha2VyKCdDYW5jZWwnLCAnY2FuY2VsJywgQnV0dG9uTGF5b3V0RGlzcGxheS5TRUNPTkRBUlkpXG4gKiAgIF1cbiAqfSlcbiAqIGBgYFxuICogKiBUb2FzdENvcmVDb25maWc6IHtAbGluayBJVG9hc3RDb3JlQ29uZmlnfVxuICogKiBHbG9iYWxTZXR0aW5nczoge0BsaW5rIElHbG9iYWxUb2FzdFNldHRpbmdzfVxuICogKiBNZXNzYWdlOiB7QGxpbmsgSU1lc3NhZ2V9XG4gKiAqIEJ1dHRvbnM6IHtAbGluayBJQnV0dG9ufVxuICogKiBCdXR0b25NYWtlcjoge0BsaW5rIEJ1dHRvbk1ha2VyfVxuICogQGNhdGVnb3J5IEltcG9ydHMgZm9yIGFuZ3VsYXIgYXBwLm1vZHVsZVxuICovXG5leHBvcnQge1RvYXN0Tm90aWZpY2F0aW9uQ29uZmlnTW9kdWxlfSBmcm9tICcuL25neC1hd2Vzb21lLXBvcHVwL25neC1hd2Vzb21lLXBvcHVwLm1vZHVsZSc7XG4vLyBlbmRyZWdpb25cbiJdfQ==
