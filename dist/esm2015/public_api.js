import { ConfirmBoxInitializer } from './ngx-awesome-popup/types/confirm-box/core/classes';
import { DialogBelonging, DialogInitializer } from './ngx-awesome-popup/types/dialog/core/classes';
import { ResetToastGlobalSettings, ToastNotificationInitializer } from './ngx-awesome-popup/types/toast-notification/core/classes';
// endregion
export { ButtonLayoutDisplay } from './ngx-awesome-popup/core/enums';
export { DialogLayoutDisplay } from './ngx-awesome-popup/core/enums';
export { ToastPositionEnum } from './ngx-awesome-popup/types/toast-notification/core/enums';
export { ToastProgressBarEnum } from './ngx-awesome-popup/types/toast-notification/core/enums';
export { ToastUserViewTypeEnum } from './ngx-awesome-popup/types/toast-notification/core/enums';
/**
 * @returns It will return custom button object ready to be used in child component layout.
 */
export { ButtonMaker } from './ngx-awesome-popup/core/global-classes';
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
export { ResetGlobalConfig } from './ngx-awesome-popup/core/global-classes';
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
 *    constructor(@Inject('dialogBelonging') private dialogBelonging: DialogBelonging) {}
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
export { ToastNotificationConfigModule } from './ngx-awesome-popup/ngx-awesome-popup.module';
// endregion
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljX2FwaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3B1YmxpY19hcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBTUEsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFNM0YsT0FBTyxFQUNMLGVBQWUsRUFDZixpQkFBaUIsRUFDbEIsTUFBTSwrQ0FBK0MsQ0FBQztBQU92RCxPQUFPLEVBQ0wsd0JBQXdCLEVBQ3hCLDRCQUE0QixFQUM3QixNQUFNLDJEQUEyRCxDQUFDO0FBMkJuRSxZQUFZO0FBRVosT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDckUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFFckUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0seURBQXlELENBQUM7QUFDNUYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0seURBQXlELENBQUM7QUFDL0YsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0seURBQXlELENBQUM7QUFFaEc7O0dBRUc7QUFDSCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFFdEU7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBQ0gsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFFNUU7Ozs7Ozs7O0dBUUc7QUFDSCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsQ0FBQztBQUVwQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrREc7QUFDSCxPQUFPLEVBQUUsZUFBZSxFQUFFLENBQUM7QUFxQjNCLFlBQVk7QUFFWiw2QkFBNkI7QUFFN0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQ0c7QUFDSCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsQ0FBQztBQUN4Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQ0c7QUFDSCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsQ0FBQztBQUNqQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThDRztBQUNILE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxDQUFDO0FBQzdCLFlBQVk7QUFFWixnREFBZ0Q7QUFDaEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBQ0gsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDckY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThCRztBQUNILE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ2xGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0NHO0FBQ0gsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDdEY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVDRztBQUNILE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQzdGLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBJQnV0dG9uLFxuICBJQ29sb3JUeXBlcyxcbiAgSURpc3BhdGNoLFxuICBJR2xvYmFsVXNlckNvbmZpZ1xufSBmcm9tICcuL25neC1hd2Vzb21lLXBvcHVwL2NvcmUvZ2xvYmFsLWludGVyZmFjZXMnO1xuaW1wb3J0IHsgQ29uZmlybUJveEluaXRpYWxpemVyIH0gZnJvbSAnLi9uZ3gtYXdlc29tZS1wb3B1cC90eXBlcy9jb25maXJtLWJveC9jb3JlL2NsYXNzZXMnO1xuaW1wb3J0IHtcbiAgSUNvbmZpcm1Cb3hDb3JlQ29uZmlnLFxuICBJQ29uZmlybUJveFB1YmxpY1Jlc3BvbnNlLFxuICBJQ29uZmlybUJveFVzZXJDb25maWdcbn0gZnJvbSAnLi9uZ3gtYXdlc29tZS1wb3B1cC90eXBlcy9jb25maXJtLWJveC9jb3JlL2ludGVyZmFjZXMnO1xuaW1wb3J0IHtcbiAgRGlhbG9nQmVsb25naW5nLFxuICBEaWFsb2dJbml0aWFsaXplclxufSBmcm9tICcuL25neC1hd2Vzb21lLXBvcHVwL3R5cGVzL2RpYWxvZy9jb3JlL2NsYXNzZXMnO1xuaW1wb3J0IHtcbiAgSURpYWxvZ0NvcmVDb25maWcsXG4gIElEaWFsb2dFdmVudHNDb250cm9sbGVyLFxuICBJRGlhbG9nUHVibGljUmVzcG9uc2UsXG4gIElEaWFsb2dVc2VyQ29uZmlnXG59IGZyb20gJy4vbmd4LWF3ZXNvbWUtcG9wdXAvdHlwZXMvZGlhbG9nL2NvcmUvaW50ZXJmYWNlcyc7XG5pbXBvcnQge1xuICBSZXNldFRvYXN0R2xvYmFsU2V0dGluZ3MsXG4gIFRvYXN0Tm90aWZpY2F0aW9uSW5pdGlhbGl6ZXJcbn0gZnJvbSAnLi9uZ3gtYXdlc29tZS1wb3B1cC90eXBlcy90b2FzdC1ub3RpZmljYXRpb24vY29yZS9jbGFzc2VzJztcbmltcG9ydCB7XG4gIElHbG9iYWxUb2FzdFNldHRpbmdzLFxuICBJVG9hc3RDb3JlQ29uZmlnLFxuICBJVG9hc3ROb3RpZmljYXRpb25QdWJsaWNSZXNwb25zZSxcbiAgSVRvYXN0Tm90aWZpY2F0aW9uVXNlckNvbmZpZ1xufSBmcm9tICcuL25neC1hd2Vzb21lLXBvcHVwL3R5cGVzL3RvYXN0LW5vdGlmaWNhdGlvbi9jb3JlL2ludGVyZmFjZXMnO1xuXG4vLyByZWdpb24gKioqIEludGVyZmFjZSAqKipcbmV4cG9ydCB7IElHbG9iYWxVc2VyQ29uZmlnIH07XG5leHBvcnQgeyBJQnV0dG9uIH07XG5leHBvcnQgeyBJRGlzcGF0Y2ggfTtcbmV4cG9ydCB7IElDb2xvclR5cGVzIH07XG5cbmV4cG9ydCB7IElDb25maXJtQm94VXNlckNvbmZpZyB9O1xuZXhwb3J0IHsgSUNvbmZpcm1Cb3hDb3JlQ29uZmlnIH07XG5leHBvcnQgeyBJQ29uZmlybUJveFB1YmxpY1Jlc3BvbnNlIH07XG5cbmV4cG9ydCB7IElHbG9iYWxUb2FzdFNldHRpbmdzIH07XG5leHBvcnQgeyBJVG9hc3RDb3JlQ29uZmlnIH07XG5leHBvcnQgeyBJVG9hc3ROb3RpZmljYXRpb25Vc2VyQ29uZmlnIH07XG5leHBvcnQgeyBJVG9hc3ROb3RpZmljYXRpb25QdWJsaWNSZXNwb25zZSB9O1xuXG5leHBvcnQgeyBJRGlhbG9nVXNlckNvbmZpZyB9O1xuZXhwb3J0IHsgSURpYWxvZ0NvcmVDb25maWcgfTtcbmV4cG9ydCB7IElEaWFsb2dQdWJsaWNSZXNwb25zZSB9O1xuZXhwb3J0IHsgSURpYWxvZ0V2ZW50c0NvbnRyb2xsZXIgfTtcbi8vIGVuZHJlZ2lvblxuXG5leHBvcnQgeyBCdXR0b25MYXlvdXREaXNwbGF5IH0gZnJvbSAnLi9uZ3gtYXdlc29tZS1wb3B1cC9jb3JlL2VudW1zJztcbmV4cG9ydCB7IERpYWxvZ0xheW91dERpc3BsYXkgfSBmcm9tICcuL25neC1hd2Vzb21lLXBvcHVwL2NvcmUvZW51bXMnO1xuZXhwb3J0IHsgVmVydGljYWxQb3NpdGlvbiB9IGZyb20gJy4vbmd4LWF3ZXNvbWUtcG9wdXAvY29yZS9lbnVtcyc7XG5leHBvcnQgeyBUb2FzdFBvc2l0aW9uRW51bSB9IGZyb20gJy4vbmd4LWF3ZXNvbWUtcG9wdXAvdHlwZXMvdG9hc3Qtbm90aWZpY2F0aW9uL2NvcmUvZW51bXMnO1xuZXhwb3J0IHsgVG9hc3RQcm9ncmVzc0JhckVudW0gfSBmcm9tICcuL25neC1hd2Vzb21lLXBvcHVwL3R5cGVzL3RvYXN0LW5vdGlmaWNhdGlvbi9jb3JlL2VudW1zJztcbmV4cG9ydCB7IFRvYXN0VXNlclZpZXdUeXBlRW51bSB9IGZyb20gJy4vbmd4LWF3ZXNvbWUtcG9wdXAvdHlwZXMvdG9hc3Qtbm90aWZpY2F0aW9uL2NvcmUvZW51bXMnO1xuXG4vKipcbiAqIEByZXR1cm5zIEl0IHdpbGwgcmV0dXJuIGN1c3RvbSBidXR0b24gb2JqZWN0IHJlYWR5IHRvIGJlIHVzZWQgaW4gY2hpbGQgY29tcG9uZW50IGxheW91dC5cbiAqL1xuZXhwb3J0IHsgQnV0dG9uTWFrZXIgfSBmcm9tICcuL25neC1hd2Vzb21lLXBvcHVwL2NvcmUvZ2xvYmFsLWNsYXNzZXMnO1xuXG4vKipcbiAqYGBgdHlwZXNjcmlwdFxuICogLy8gSW5zdGFudGlhdGUgY29uZmlnIG9iamVjdCBhcyBleGFtcGxlIGJlbG93IHRvIGNoYW5nZSBnbG9iYWwgc2V0dGluZ3Mgb24tZmx5IGl0IHRha2VzIElHbG9iYWxVc2VyQ29uZmlnXG4gKiBhcyB0aGUgYXJndW1lbnQuXG4gKiBuZXcgUmVzZXRHbG9iYWxDb25maWcoe1xuICogICAgIENvbG9yTGlzdDoge1xuICogICAgICAgICAgICBQcmltYXJ5ICA6ICcjZmY5ZTAwJywgLy8gb3B0aW9uYWxcbiAqICAgICAgICAgICAgU2Vjb25kYXJ5OiAnIzk4OWVhNScsIC8vIG9wdGlvbmFsXG4gKiAgICAgICAgICAgIEluZm8gICAgIDogJyMyZjhlZTUnLCAvLyBvcHRpb25hbFxuICogICAgICAgICAgICBTdWNjZXNzICA6ICcjM2NhZWEzJywgLy8gb3B0aW9uYWxcbiAqICAgICAgICAgICAgV2FybmluZyAgOiAnI2ZmYzEwNycsIC8vIG9wdGlvbmFsXG4gKiAgICAgICAgICAgIERhbmdlciAgIDogJyNlNDY0NjQnLCAvLyBvcHRpb25hbFxuICogICAgICAgICAgICBMaWdodCAgICA6ICcjZmJmYmZiJywgLy8gb3B0aW9uYWxcbiAqICAgICAgICAgICAgRGFyayAgICAgOiAnIzM0M2E0MCcgIC8vIG9wdGlvbmFsXG4gKiAgICAgICAgICAgfVxuICogfSlcbiAqIGBgYFxuICovXG5leHBvcnQgeyBSZXNldEdsb2JhbENvbmZpZyB9IGZyb20gJy4vbmd4LWF3ZXNvbWUtcG9wdXAvY29yZS9nbG9iYWwtY2xhc3Nlcyc7XG5cbi8qKlxuICpgYGB0eXBlc2NyaXB0XG4gKiAvLyBJbnN0YW50aWF0ZSB0b2FzdCBnbG9iYWwgY29uZmlnIG9iamVjdCBhcyBleGFtcGxlIGJlbG93IHRvIGNoYW5nZSBnbG9iYWwgc2V0dGluZ3Mgb24tZmx5IGl0IHRha2VzIElHbG9iYWxUb2FzdFNldHRpbmdzXG4gKiBhcyB0aGUgYXJndW1lbnQuXG4gKiBuZXcgUmVzZXRUb2FzdEdsb2JhbFNldHRpbmdzKHtcbiAqICAgICBBbGxvd2VkTm90aWZpY2F0aW9uc0F0T25jZTogMlxuICogfSlcbiAqIGBgYFxuICovXG5leHBvcnQgeyBSZXNldFRvYXN0R2xvYmFsU2V0dGluZ3MgfTtcblxuLyoqXG4gKiBUaGlzIGlzIHRoZSBjbGFzcyB0aGF0IG5lZWRzIHRvIGJlIGFkZGVkIGFzIERJIGluIHRoZSBjb25zdHJ1Y3RvciBvZiBhIGNoaWxkIGNvbXBvbmVudCB0aGF0IHdpbGwgYmVcbiAqIG9wZW5lZCBkeW5hbWljYWxseSB3aXRoIHtAbGluayBEaWFsb2dJbml0aWFsaXplcn0uIEl0IGNvbnRhaW5zIHZhcmlvdXMgaW5mb3JtYXRpb24gb3JcbiAqIGV2ZW50IGNvbnRyb2xsZXJzLCBhbmQgbGlzdGVuZXJzIHRoYXQgY2FuIGJlIHVzZWQgaW4gYSBjaGlsZCBjb21wb25lbnQuIEFsc28sIHRoZXJlIGlzIGN1c3RvbSBkYXRhXG4gKiB0aGF0IGlzIHNlbnQgZnJvbSBjb21wb25lbnQgd2hlcmUgdGhlIHtAbGluayBEaWFsb2dJbml0aWFsaXplcn0gaXMuIFVzZXIgY2FuIHNldCBzcGVjaWZpYyB0eXBlIG9mXG4gKiBjdXN0b20gZGF0YSB0aGF0IGNoaWxkIGNvbXBvbmVudCB3aWxsIHJlY2VpdmUgYnkgaW5jbHVkaW5nIGl0IGFzIGdlbmVyaWMgdHlwZS5cbiAqXG4gKlxuICogRXhhbXBsZTpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqaW1wb3J0IHtEaWFsb2dCZWxvbmdpbmd9IGZyb20gJ25neC1hd2Vzb21lLXBvcHVwJztcbiAqQENvbXBvbmVudCh7XG4gKiAgICBzZWxlY3RvciAgIDogJ2FwcC1jdXAnLFxuICogICAgdGVtcGxhdGVVcmw6ICcuL2N1cC5jb21wb25lbnQuaHRtbCcsXG4gKiAgICBzdHlsZVVybHMgIDogWycuL2N1cC5jb21wb25lbnQuc2NzcyddXG4gKn0pXG4gKiBleHBvcnQgY2xhc3MgQ3VwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICpcbiAqICAgIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG4gKlxuICogICAgY29uc3RydWN0b3IoQEluamVjdCgnZGlhbG9nQmVsb25naW5nJykgcHJpdmF0ZSBkaWFsb2dCZWxvbmdpbmc6IERpYWxvZ0JlbG9uZ2luZykge31cbiAqXG4gKiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAqICAgIGNvbnNvbGUubG9nKHRoaXMuZGlhbG9nQmVsb25naW5nKTtcbiAqXG4gKiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gKiAgICAgICAgICAgIHRoaXMuZGlhbG9nQmVsb25naW5nLkV2ZW50c0NvbnRyb2xsZXIub25CdXR0b25DbGljayQuc3Vic2NyaWJlKChfQnV0dG9uKSA9PiB7XG4gKiAgICAgICAgICAgIGlmIChfQnV0dG9uLklEID09PSAnb2snKSB7XG4gKiAgICAgICAgICAgICAgICAvLyBEbyBzb21lIGxvZ2ljIGFuZCBjbG9zZSBwb3B1cC5cbiAqICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9nQmVsb25naW5nLkV2ZW50c0NvbnRyb2xsZXIuY2xvc2UoKTtcbiAqICAgICAgICAgICAgfSBlbHNlIGlmIChfQnV0dG9uLklEID09PSAnY2FuY2VsJykge1xuICogICAgICAgICAgICAgICAgLy8gRG8gc29tZSBsb2dpYyBhbmQgY2xvc2UgcG9wdXAuXG4gKiAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ0JlbG9uZ2luZy5FdmVudHNDb250cm9sbGVyLmNsb3NlKCk7XG4gKiAgICAgICAgICAgIH1cbiAqICAgICAgICB9KVxuICogICAgICAgICk7XG4gKlxuICogICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICogICAgICAgICAgICAvLyBDbG9zZSBsb2FkZXIgYWZ0ZXIgYXN5bmMgZGF0YSBpcyByZWFkeS5cbiAqICAgICAgICAgICAgdGhpcy5kaWFsb2dCZWxvbmdpbmcuRXZlbnRzQ29udHJvbGxlci5jbG9zZUxvYWRlcigpO1xuICogICAgICAgIH0sIDEwMDApO1xuICogICAgfVxuICp9XG5cbiBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgLy8gQ2xvc2UgYWxsIHN1YnNjcmlwdGlvbnMuXG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHN1YiA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XG4gICAgfVxuICogYGBgXG4gKiBAY2F0ZWdvcnkgY2hpbGQgZHluYW1pYyBjb21wb25lbnQgZGF0YSAmIGV2ZW50IGNvbnRyb2xsZXJcbiAqL1xuZXhwb3J0IHsgRGlhbG9nQmVsb25naW5nIH07XG5cbi8vIHJlZ2lvbiAqKiogT2JzZXJ2YWJsZSByZXNwb25zZSBhZnRlciBjbG9zaW5nIHBvcHVwICoqKlxuLyoqXG4gKiBSZWd1bGFyIGRlc2NyaXB0aW9uXG4gKlxuICogQGNhdGVnb3J5IE9ic2VydmFibGUgcmVzcG9uc2UgYWZ0ZXIgY2xvc2luZyBwb3B1cFxuICovXG5leHBvcnQgeyBJVG9hc3ROb3RpZmljYXRpb25QdWJsaWNSZXNwb25zZSBhcyBJVG9hc3ROb3RpZmljYXRpb25SZXNwb25zZSB9O1xuLyoqXG4gKiBSZWd1bGFyIGRlc2NyaXB0aW9uXG4gKlxuICogQGNhdGVnb3J5IE9ic2VydmFibGUgcmVzcG9uc2UgYWZ0ZXIgY2xvc2luZyBwb3B1cFxuICovXG5leHBvcnQgeyBJQ29uZmlybUJveFB1YmxpY1Jlc3BvbnNlIGFzIElDb25maXJtQm94UmVzcG9uc2UgfTtcbi8qKlxuICogUmVndWxhciBkZXNjcmlwdGlvblxuICpcbiAqIEBjYXRlZ29yeSBPYnNlcnZhYmxlIHJlc3BvbnNlIGFmdGVyIGNsb3NpbmcgcG9wdXBcbiAqL1xuZXhwb3J0IHsgSURpYWxvZ1B1YmxpY1Jlc3BvbnNlIGFzIElEaWFsb2dSZXNwb25zZSB9O1xuLy8gZW5kcmVnaW9uXG5cbi8vIHJlZ2lvbiAqKiogUG9wdXAgb3BlbiAgKioqXG5cbi8qKlxuICogVGhpcyBpcyB0aGUgY2xhc3MgdGhhdCBuZWVkcyB0byBiZSBpbnN0YW50aWF0ZWQgdG8gc2V0IHVwIGFuZCBpZ25pdGUgYSBUb2FzdE5vdGlmaWNhdGlvbixcbiAqIGl0cyBwdXJwb3NlIGlzIHRvIHNob3cgc2hvcnQgbm90aWZpY2F0aW9uIHRvIGVuZC11c2VyLCBvciBldmVuIGludGVyYWN0IHdpdGggdXNlci5cbiAqIEl0IGNhbiBiZSBldm9rZWQgZnJvbSBhbnkgYW5ndWxhciB0eXBlc2NyaXB0IGZpbGUuXG4gKlxuICogQmVsb3cgaXMgdGhlIGV4YW1wbGUgd2l0aCAoc29tZSBvcHRpb25hbCkgdXNlciBjb25maWd1cmF0aW9uLFxuICogaXQgd2lsbCBvdmVycmlkZSBkZWZhdWx0IGNvbmZpZ3VyYXRpb24gZnJvbSBhcHAubW9kdWxlLlxuICpcbiAqXG4gKiBFeGFtcGxlOlxuICogYGBgdHlwZXNjcmlwdFxuICogLy8gQ3JlYXRlIHRoZSBpbml0aWFsaXplci5cbiAqY29uc3QgbmV3VG9hc3ROb3RpZmljYXRpb24gPSBuZXcgVG9hc3ROb3RpZmljYXRpb25Jbml0aWFsaXplcigpO1xuICpcbiAqIC8vIFNldCBkZXNpcmVkIFRpdGxlLlxuICpuZXdUb2FzdE5vdGlmaWNhdGlvbi5zZXRUaXRsZSgnV2FybmluZyEnKTtcbiAqXG4gKiAvLyBTZXQgZGVzaXJlZCBNZXNzYWdlLlxuICpuZXdUb2FzdE5vdGlmaWNhdGlvbi5zZXRNZXNzYWdlKCdGb3JtIGlzIG5vdCB2YWxpZCEnKTtcbiAqXG4gKiAvLyBTZXQgZGVzaXJlZCBjb25maWd1cmF0aW9uLlxuICpuZXdUb2FzdE5vdGlmaWNhdGlvbi5zZXRDb25maWcoe1xuICogICAgICBMYXlvdXRUeXBlOiBEaWFsb2dMYXlvdXREaXNwbGF5LldBUk5JTkdcbiAqICAgfSk7XG5cbiAqIC8vIE9wZW4gYSBUb2FzdE5vdGlmaWNhdGlvbi5cbiAqIG5ld0NvbmZpcm1Cb3gub3BlbkNvbmZpcm1Cb3gkKCkuc3Vic2NyaWJlKHJlc3AgPT4ge1xuICogICBjb25zb2xlLmxvZygnY29uZmlybUJveCByZXNwb25zZTogJywgcmVzcCk7XG4gKiAgfSk7XG4gKiBgYGBcbiAqICogSVRvYXN0Q29yZUNvbmZpZzoge0BsaW5rIElUb2FzdENvcmVDb25maWd9XG4gKiAqIExheW91dFR5cGU6IHtAbGluayBEaWFsb2dMYXlvdXREaXNwbGF5fVxuICogKiBJVG9hc3ROb3RpZmljYXRpb25QdWJsaWNSZXNwb25zZToge0BsaW5rIElUb2FzdE5vdGlmaWNhdGlvblB1YmxpY1Jlc3BvbnNlfVxuICogQGNhdGVnb3J5IFBvcHVwIG9wZW5cbiAqL1xuZXhwb3J0IHsgVG9hc3ROb3RpZmljYXRpb25Jbml0aWFsaXplciB9O1xuLyoqXG4gKiBUaGlzIGlzIHRoZSBjbGFzcyB0aGF0IG5lZWRzIHRvIGJlIGluc3RhbnRpYXRlZCB0byBzZXQgdXAgYW5kIGlnbml0ZSBhIENvbmZpcm1Cb3ggYW5kIGNyZWF0ZSBjb250ZW50LlxuICogSXRzIHB1cnBvc2UgaXMgdG8gZ2V0IGNvbmZpcm1hdGlvbiByZXNwb25zZSBmcm9tIGVuZC11c2VyLiBJdCBjYW4gYmUgY2FsbGVkIGZyb20gYW55IGFuZ3VsYXJcbiAqIHR5cGVzY3JpcHQgZmlsZS5cbiAqXG4gKiBCZWxvdyBpcyBleGFtcGxlIHdpdGggKHNvbWUgb3B0aW9uYWwpIHVzZXIgY29uZmlndXJhdGlvbixcbiAqIGl0IHdpbGwgb3ZlcnJpZGUgZGVmYXVsdCBjb25maWd1cmF0aW9uIGZyb20gYXBwLm1vZHVsZS5cbiAqXG4gKlxuICogRXhhbXBsZTpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIC8vIENyZWF0ZSB0aGUgaW5pdGlhbGl6ZXIuXG4gKmNvbnN0IG5ld0NvbmZpcm1Cb3ggPSBuZXcgQ29uZmlybUJveEluaXRpYWxpemVyKCk7XG4gKlxuICogLy8gU2V0IGRlc2lyZWQgZGlzcGF0Y2g6IF9UaXRsZTogc3RyaW5nLCBfTWVzc2FnZTogc3RyaW5nLlxuICpuZXdDb25maXJtQm94LnNldERpc3BhdGNoKCdBcmUgeW91IHN1cmU/JywgJ1RoYXQgYWN0aW9uIHdpbGwgZGVsZXRlIHVzZXIhJyk7XG4gKlxuICogLy8gU2V0IGRlc2lyZWQgY29uZmlndXJhdGlvbi5cbiAqbmV3Q29uZmlybUJveC5zZXRDb25maWcoe1xuICogICAgICBMYXlvdXRUeXBlOiBEaWFsb2dMYXlvdXREaXNwbGF5LkRBTkdFUlxuICogICB9KTtcbiAqXG4gKiAvLyBTZXQgYnV0dG9uIGxhYmVscy5cbiAqIG5ld0NvbmZpcm1Cb3guc2V0QnV0dG9uTGFiZWxzKCdZRVMnLCAnTk8nKTtcbiAqXG4gKiAvLyBPcGVuIGEgQ29uZmlybUJveCwgYW5kIGdldCBjbGlja2VkIGJ1dHRvbi1pZCBpbiByZXNwb25zZS5cbiAqIG5ld0NvbmZpcm1Cb3gub3BlbkNvbmZpcm1Cb3gkKCkuc3Vic2NyaWJlKHJlc3AgPT4ge1xuICogICAvLyBJQ29uZmlybUJveFB1YmxpY1Jlc3BvbnNlXG4gKiAgIGNvbnNvbGUubG9nKCdjb25maXJtQm94IHJlc3BvbnNlOiAnLCByZXNwKTtcbiAqICB9KTtcbiAqIGBgYFxuICogKiBJQ29uZmlybUJveENvcmVDb25maWc6IHtAbGluayBJQ29uZmlybUJveENvcmVDb25maWd9XG4gKiAqIExheW91dFR5cGU6IHtAbGluayBEaWFsb2dMYXlvdXREaXNwbGF5fVxuICogKiBJQ29uZmlybUJveFB1YmxpY1Jlc3BvbnNlOiB7QGxpbmsgSUNvbmZpcm1Cb3hQdWJsaWNSZXNwb25zZX1cbiAqIEBjYXRlZ29yeSBQb3B1cCBvcGVuXG4gKi9cbmV4cG9ydCB7IENvbmZpcm1Cb3hJbml0aWFsaXplciB9O1xuLyoqXG4gKiBUaGlzIGlzIHRoZSBjbGFzcyB0aGF0IG5lZWRzIHRvIGJlIGluc3RhbnRpYXRlZCB0byBzZXQgdXAgYW5kIGlnbml0ZSBhIERpYWxvZyBhbmQgY3JlYXRlIGR5bmFtaWMgY29tcG9uZW50LFxuICogaXRzIHB1cnBvc2UgaXMgdG8gcmVuZGVyIGFueSBhbmd1bGFyIGNvbXBvbmVudCB2aWV3IHdpdGggc3BlY2lmaWMgY29uZmlndXJhdGlvbiBmcm9tIGFueSBhbmd1bGFyIHR5cGVzY3JpcHQgZmlsZS5cbiAqIER5bmFtaWMgY29tcG9uZW50IG1lYW5zIHRoYXQgdXNlciBjYW4gZXZva2UgdGhlIHBvcHVwIGZyb20gdHlwZXNjcmlwdCBhbmQgY29tcG9uZW50IHZpZXdcbiAqIGlzIGR5bmFtaWNhbGx5IGNyZWF0ZWQgd2l0aCB0aGUgQXdlc29tZSBQb3B1cCBlbmdpbmUuIFRoZXJlIGlzIG5vIG5lZWQgdG8gY2FsbCBhbnkgc2VsZWN0b3IgaW4gSFRNTCB0byBjcmVhdGUgY29tcG9uZW50IHZpZXcuXG4gKlxuICogRGlhbG9nSW5pdGlhbGl6ZXIgY2FuIHNlbmQgZGF0YSB0byBjaGlsZCBjb21wb25lbnQgKGR5bmFtaWMgY29tcG9uZW50KSB3aGVyZSBkYXRhIHdpbGwgYmUgYWNjZXNzaWJsZSB3aXRoIHtAbGluayBEaWFsb2dCZWxvbmdpbmd9LlxuICpcbiAqIEJlbG93IGlzIHRoZSBleGFtcGxlIHdpdGggKHNvbWUgb3B0aW9uYWwpIHVzZXIgY29uZmlndXJhdGlvbixcbiAqIGl0IHdpbGwgb3ZlcnJpZGUgZGVmYXVsdCBjb25maWd1cmF0aW9uIGZyb20gYXBwLm1vZHVsZS5cbiAqXG4gKlxuICogRXhhbXBsZTpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqICBpbXBvcnQge0RpYWxvZ0luaXRpYWxpemVyLCBEaWFsb2dMYXlvdXREaXNwbGF5LCBCdXR0b25NYWtlciwgQnV0dG9uTGF5b3V0RGlzcGxheX0gZnJvbSAnbmd4LWF3ZXNvbWUtcG9wdXAnOzxcbiAqICBpbXBvcnQge0N1cENvbXBvbmVudH0gZnJvbSAnLi9jdXAvY3VwLmNvbXBvbmVudCc7XG4gKlxuICogIGNvbnN0IG5ld0RpYWxvZ1BvcHVwID0gbmV3IERpYWxvZ0luaXRpYWxpemVyKEN1cENvbXBvbmVudCk7IC8vIEFueSBBbmd1bGFyIGNvbXBvbmVudC5cbiAqXG4gKiAgLy8gQ3VzdG9tIGRhdGEgd2lsbCBiZSBzZW50IHRvIGR5bmFtaWMgY29tcG9uZW50IGF2YWlsYWJsZSBpbiBkaWFsb2dCZWxvbmdpbmcgb2JqZWN0LlxuICogIG5ld0RpYWxvZ1BvcHVwLnNldEN1c3RvbURhdGEoe25hbWU6ICdKb2huJywgc3VybmFtZTogJ0RvZScsIGlkOiAxfSk7XG4gKlxuICogIC8vIExvY2FsIGNvbmZpZyBzZXR0aW5ncyBJRGlhbG9nQ29yZUNvbmZpZy5cbiAqICBuZXdEaWFsb2dQb3B1cC5zZXRDb25maWcoe1xuICogICAgICBIZWlnaHQ6ICc1MDBweCcsXG4gKiAgICAgIExheW91dFR5cGU6IERpYWxvZ0xheW91dERpc3BsYXkuSU5GTyxcbiAqICAgICAgTG9hZGVyQ29tcG9uZW50OiBBbnkgQW5ndWxhciBjb21wb25lbnQgbmFtZVxuICogICAgICAgfSk7XG4gKlxuICogIC8vIEN1c3RvbSBidXR0b25zLCBsaXN0ZW5lciBpcyBhdmFpbGFibGUgaW4gY2hpbGQgY29tcG9uZW50IGluIGRpYWxvZ0JlbG9uZ2luZyBvYmplY3QuXG4gKiAgbmV3RGlhbG9nUG9wdXAuc2V0QnV0dG9ucyhbXG4gKiAgICAgIG5ldyBCdXR0b25NYWtlcignT2snLCAnb2snLCBCdXR0b25MYXlvdXREaXNwbGF5LlBSSU1BUlkpLFxuICogICAgICBuZXcgQnV0dG9uTWFrZXIoJ0NhbmNlbCcsICdjYW5jZWwnLCBCdXR0b25MYXlvdXREaXNwbGF5LlNFQ09OREFSWSlcbiAqICBdKTtcbiAqXG4gKiAgLy8gQ29tbWFuZCB0byBvcGVuIGRpYWxvZywgaXQgcmV0dXJucyBvYnNlcnZhYmxlLlxuICogIG5ld0RpYWxvZ1BvcHVwLm9wZW5EaWFsb2ckPGFueT4oKS5zdWJzY3JpYmUocmVzcCA9PiB7XG4gKiAgICAgICAgICAgY29uc29sZS5sb2coJ3Jlc3BvbnNlOiAnLCByZXNwLlBheWxvYWQpO1xuICogICAgICAgfSk7XG4gKiBgYGBcbiAqICogSURpYWxvZ0NvcmVDb25maWc6IHtAbGluayBJRGlhbG9nQ29yZUNvbmZpZ31cbiAqICogTGF5b3V0VHlwZToge0BsaW5rIERpYWxvZ0xheW91dERpc3BsYXl9XG4gKiAqIEJ1dHRvbkxheW91dERpc3BsYXk6IHtAbGluayBCdXR0b25MYXlvdXREaXNwbGF5fVxuICogKiBCdXR0b25NYWtlcjoge0BsaW5rIEJ1dHRvbk1ha2VyfVxuICogKiBJRGlhbG9nUHVibGljUmVzcG9uc2U6IHtAbGluayBJRGlhbG9nUHVibGljUmVzcG9uc2V9XG4gKiBAY2F0ZWdvcnkgUG9wdXAgb3BlblxuICovXG5leHBvcnQgeyBEaWFsb2dJbml0aWFsaXplciB9O1xuLy8gZW5kcmVnaW9uXG5cbi8vIHJlZ2lvbiAqKiogSW1wb3J0cyBmb3IgYW5ndWxhciBhcHAubW9kdWxlICoqKlxuLyoqXG4gKiBUaGlzIGlzIHRoZSBtYWluIG1vZHVsZSBvZiB0aGUgbGlicmFyeSwgaXQgaXMgY3J1Y2lhbCB0byBiZSBhZGRlZCB3aXRoaW4gYW5ndWxhci5hcHBcbiAqIGltcG9ydHMgYXMgYW4gZXhhbXBsZSB3aXRoIG9wdGlvbmFsIGFyZ3VtZW50LCBsb29rOiB7QGxpbmsgSUdsb2JhbFVzZXJDb25maWd9XG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogLy8gYXBwLm1vZHVsZSBpbXBvcnRzOlxuICogTmd4QXdlc29tZVBvcHVwTW9kdWxlLmZvclJvb3Qoe1xuICogICAgIENvbG9yTGlzdDoge1xuICogICAgICAgICAgICBQcmltYXJ5ICA6ICcjZmY5ZTAwJywgLy8gb3B0aW9uYWxcbiAqICAgICAgICAgICAgU2Vjb25kYXJ5OiAnIzk4OWVhNScsIC8vIG9wdGlvbmFsXG4gKiAgICAgICAgICAgIEluZm8gICAgIDogJyMyZjhlZTUnLCAvLyBvcHRpb25hbFxuICogICAgICAgICAgICBTdWNjZXNzICA6ICcjM2NhZWEzJywgLy8gb3B0aW9uYWxcbiAqICAgICAgICAgICAgV2FybmluZyAgOiAnI2ZmYzEwNycsIC8vIG9wdGlvbmFsXG4gKiAgICAgICAgICAgIERhbmdlciAgIDogJyNlNDY0NjQnLCAvLyBvcHRpb25hbFxuICogICAgICAgICAgICBMaWdodCAgICA6ICcjZmJmYmZiJywgLy8gb3B0aW9uYWxcbiAqICAgICAgICAgICAgRGFyayAgICAgOiAnIzM0M2E0MCcgIC8vIG9wdGlvbmFsXG4gKiAgICAgICAgICAgfVxuICogfSlcbiAqIGBgYFxuICogQGNhdGVnb3J5IEltcG9ydHMgZm9yIGFuZ3VsYXIgYXBwLm1vZHVsZVxuICovXG5leHBvcnQgeyBOZ3hBd2Vzb21lUG9wdXBNb2R1bGUgfSBmcm9tICcuL25neC1hd2Vzb21lLXBvcHVwL25neC1hd2Vzb21lLXBvcHVwLm1vZHVsZSc7XG4vKipcbiAqIFRoaXMgaXMgdGhlIG1vZHVsZSB0aGF0IGlnbml0ZXMgZHluYW1pYyBkaWFsb2cgbW9kYWwsIGl0cyBwdXJwb3NlIGlzIHRvIGxvYWQgYW55IGFuZ3VsYXIgY29tcG9uZW50IGluXG4gKiBkaWFsb2cgd2luZG93LiBEeW5hbWljIGNvbXBvbmVudCBtZWFucyB0aGF0IHVzZXIgY2FuIGV2b2tlIGFueSBBbmd1bGFyIGNvbXBvbmVudCBpbiB0aGUgcG9wdXAganVzdCBmcm9tIHR5cGVzY3JpcHQuIENvbXBvbmVudCB2aWV3XG4gKiBpcyBkeW5hbWljYWxseSBjcmVhdGVkIHdpdGggdGhlIGxpYnJhcnkgZW5naW5lIGFuZCB0aGVyZSBpcyBubyBuZWVkIHRvIGNhbGwgYW55IHNlbGVjdG9yIGluIEhUTUwgdG8gY3JlYXRlIGNvbXBvbmVudCB2aWV3LlxuICpcbiAqIEl0IGlzIGNydWNpYWwgZm9yIHVzZXIgdG8gYWRkIHRoaXMgbW9kdWxlIGluIGFuZ3VsYXIuYXBwIGltcG9ydHMuXG4gKiBCZWxvdyBpcyB0aGUgZXhhbXBsZSB3aXRoIChvcHRpb25hbCkgZGVmYXVsdCB1c2VyIGNvbmZpZ3VyYXRpb24sIHRoYXQgaXMgd2hhdCB3aWxsIGJlIGluIHNldHVwIGlmIHRoZXJlIGlzIG5vXG4gKiBsb2NhbCBjb25maWcgd2hlbiBwb3B1cCBpcyBldm9rZWQsIHRoYXQgbWVhbnMgaXQgY2FuIGJlIG92ZXJyaWRkZW4gZGlyZWN0bHkgd2hlbiBwb3B1cCBpcyBjYWxsZWQuXG4gKiBGb3IgaW1wbGVtZW50YXRpb24gbG9vazoge0BsaW5rIElEaWFsb2dVc2VyQ29uZmlnfS5cbiAqXG4gKiBFeGFtcGxlOlxuICogYGBgdHlwZXNjcmlwdFxuICogLy8gYXBwLm1vZHVsZSBpbXBvcnRzOlxuICpEaWFsb2dDb25maWdNb2R1bGUuZm9yUm9vdCh7XG4gKiAgICAgRGlhbG9nQ29yZUNvbmZpZzoge1xuICogICAgICAgIFdpZHRoICAgICAgICA6ICc1MDBweCcsXG4gKiAgICAgICAgQnV0dG9uUG9zaXRpb246ICdyaWdodCcsXG4gKiAgICAgICAgTGF5b3V0VHlwZTogRGlhbG9nTGF5b3V0RGlzcGxheS5JTkZPLFxuICogICAgICAgIExvYWRlckNvbXBvbmVudDogLy8gQW55IGFuZ3VsYXIgY29tcG9uZW50IGNsYXNzIG5hbWUgY2FuIGJlIGluY2x1ZGVkIGFzIGEgbG9hZGVyLlxuICogICAgIH0sXG4gKiAgICAgQnV0dG9uczogW1xuICogICAgICAgIG5ldyBCdXR0b25NYWtlcignT2snLCAnb2snLCBCdXR0b25MYXlvdXREaXNwbGF5LlBSSU1BUlkpLFxuICogICAgICAgIG5ldyBCdXR0b25NYWtlcignQ2FuY2VsJywgJ2NhbmNlbCcsIEJ1dHRvbkxheW91dERpc3BsYXkuU0VDT05EQVJZKVxuICogICAgIF0sXG4gKiB9KVxuICogYGBgXG4gKiAqIERpYWxvZ0NvcmVDb25maWcuTGF5b3V0VHlwZToge0BsaW5rIERpYWxvZ0xheW91dERpc3BsYXl9XG4gKiAqIEJ1dHRvbkxheW91dERpc3BsYXk6IHtAbGluayBCdXR0b25MYXlvdXREaXNwbGF5fVxuICogKiBCdXR0b25NYWtlcjoge0BsaW5rIEJ1dHRvbk1ha2VyfVxuICogQGNhdGVnb3J5IEltcG9ydHMgZm9yIGFuZ3VsYXIgYXBwLm1vZHVsZVxuICovXG5leHBvcnQgeyBEaWFsb2dDb25maWdNb2R1bGUgfSBmcm9tICcuL25neC1hd2Vzb21lLXBvcHVwL25neC1hd2Vzb21lLXBvcHVwLm1vZHVsZSc7XG4vKipcbiAqIFRoaXMgaXMgdGhlIG1vZHVsZSB0aGF0IGlnbml0ZXMgQ29uZmlybSBib3ggZGlhbG9nLCBpdHMgcHVycG9zZSBpcyB0byBzaG93IHBvcHVwIGluIGFcbiAqIHNtYWxsIGRpYWxvZyB3aW5kb3cgaW4gdGhlIG1pZGRsZSBvZiB0aGUgc2NyZWVuLiBVc2VyIGNhbiBwcm92aWRlIHRpdGxlLCBtZXNzYWdlIGFuZCBpbmNsdWRlIGJ1dHRvbnMuXG4gKiBDb25maXJtIGJveCBpcyBhdmFpbGFibGUgaW4gcHJlZGVmaW5lZCBsYXlvdXQgdHlwZXMgKGVudW1zKToge0BsaW5rIERpYWxvZ0xheW91dERpc3BsYXl9LlxuICpcbiAqIEl0IGlzIGNydWNpYWwgZm9yIHVzZXIgdG8gYWRkIHRoaXMgbW9kdWxlIGluIGFuZ3VsYXIuYXBwIGltcG9ydHMuXG4gKiBCZWxvdyBpcyB0aGUgZXhhbXBsZSB3aXRoIChvcHRpb25hbCkgZGVmYXVsdCB1c2VyIGNvbmZpZ3VyYXRpb24sIHRoYXQncyB3aGF0IHdpbGwgYmUgdXNlZCBpZiB0aGVyZSBpcyBub1xuICogbG9jYWwgY29uZmlnIHdoZW4gcG9wdXAgaXMgZXZva2VkLCB0aGF0IG1lYW5zIGl0IGNhbiBiZSBvdmVycmlkZGVuIGRpcmVjdGx5IHdoZW4gcG9wdXAgaXMgZXZva2VkLlxuICogRm9yIGltcGxlbWVudGF0aW9uIGxvb2s6IHtAbGluayBJQ29uZmlybUJveFVzZXJDb25maWd9LlxuICpcbiAqIEV4YW1wbGU6XG4gKiBgYGB0eXBlc2NyaXB0XG4gKiAvLyBhcHAubW9kdWxlIGltcG9ydHM6XG4gKkNvbmZpcm1Cb3hDb25maWdNb2R1bGUuZm9yUm9vdCh7XG4gKiAgICBDb25maXJtQm94Q29yZUNvbmZpZzoge1xuICogICAgICAgV2lkdGg6ICc3MDBweCcsXG4gKiAgICAgICBMYXlvdXRUeXBlOiBEaWFsb2dMYXlvdXREaXNwbGF5LkRBTkdFUixcbiAqICAgICAgIEJ1dHRvblBvc2l0aW9uOiAnY2VudGVyJ1xuICogICAgfSxcbiAqICAgIERpc3BhdGNoOiB7ICAvLyBPcHRpb25hbCBkZWZhdWx0IGRpc3BhdGNoIG9iamVjdC5cbiAqICAgICAgIFRpdGxlOiAnRGVmYXVsdCB0aXRsZScsXG4gKiAgICAgICBNZXNzYWdlOiAnRGVmYXVsdCBtZXNzYWdlJ1xuICogICAgfSxcbiAqICAgIEJ1dHRvbnMgICAgIDogW1xuICogICAgICAgbmV3IEJ1dHRvbk1ha2VyKCdPaycsICdvaycsIEJ1dHRvbkxheW91dERpc3BsYXkuUFJJTUFSWSksXG4gKiAgICAgICBuZXcgQnV0dG9uTWFrZXIoJ0NhbmNlbCcsICdjYW5jZWwnLCBCdXR0b25MYXlvdXREaXNwbGF5LlNFQ09OREFSWSlcbiAqICAgIF1cbiAqIH0pXG4gKiBgYGBcbiAqICogQ29uZmlybUJveENvcmVDb25maWc6IHtAbGluayBJQ29uZmlybUJveENvcmVDb25maWd9XG4gKiAqIERpc3BhdGNoOiB7QGxpbmsgSURpc3BhdGNofVxuICogKiBCdXR0b25zOiB7QGxpbmsgSUJ1dHRvbn1cbiAqICogQnV0dG9uTWFrZXI6IHtAbGluayBCdXR0b25NYWtlcn1cbiAqIEBjYXRlZ29yeSBJbXBvcnRzIGZvciBhbmd1bGFyIGFwcC5tb2R1bGVcbiAqL1xuZXhwb3J0IHsgQ29uZmlybUJveENvbmZpZ01vZHVsZSB9IGZyb20gJy4vbmd4LWF3ZXNvbWUtcG9wdXAvbmd4LWF3ZXNvbWUtcG9wdXAubW9kdWxlJztcbi8qKlxuICogVGhpcyBpcyB0aGUgbW9kdWxlIHRoYXQgaWduaXRlcyBUb2FzdCBub3RpZmljYXRpb25zIGRpYWxvZywgaXRzIHB1cnBvc2UgaXMgdG8gc2hvdyB0b2FzdCBwb3B1cCBpbiBhXG4gKiBzbWFsbCBkaWFsb2cgd2luZG93IGluIHRoZSBjb3JuZXIgb2YgdGhlIHNjcmVlbi4gVXNlciBjYW4gcHJvdmlkZSB0aXRsZSBhbmQgbWVzc2FnZSBhbmQgaW5jbHVkZSBidXR0b25zLCBvciBzZXR1cCBhdXRvIGRpc2FwcGVhcmluZy5cbiAqIFRvYXN0IG5vdGlmaWNhdGlvbnMgYXJlIGF2YWlsYWJsZSBpbiBwcmVkZWZpbmVkIGxheW91dCB0eXBlcyAoZW51bXMpOiB7QGxpbmsgRGlhbG9nTGF5b3V0RGlzcGxheX0uXG4gKlxuICogSXQgaXMgY3J1Y2lhbCBmb3IgdXNlciB0byBhZGQgdGhpcyBtb2R1bGUgaW4gYW5ndWxhci5hcHAgaW1wb3J0cy5cbiAqIEJlbG93IGlzIHRoZSBleGFtcGxlIHdpdGggKG9wdGlvbmFsKSBkZWZhdWx0IHVzZXIgY29uZmlndXJhdGlvbiwgdGhhdCdzIHdoYXQgd2lsbCBiZSB1c2VkIGlmIHRoZXJlIGlzIG5vXG4gKiBsb2NhbCBjb25maWcgd2hlbiBwb3B1cCBpcyBldm9rZWQsIHRoYXQgbWVhbnMgaXQgY2FuIGJlIG92ZXJyaWRkZW4gZGlyZWN0bHkgd2hlbiBwb3B1cCBpcyBldm9rZWQuXG4gKiBGb3IgaW1wbGVtZW50YXRpb24gbG9vazoge0BsaW5rIElUb2FzdE5vdGlmaWNhdGlvblVzZXJDb25maWd9LlxuICpcbiAqIEV4YW1wbGU6XG4gKiBgYGB0eXBlc2NyaXB0XG4gKiAvLyBhcHAubW9kdWxlIGltcG9ydHM6XG4gKlRvYXN0Tm90aWZpY2F0aW9uQ29uZmlnTW9kdWxlLmZvclJvb3Qoe1xuICogICAgVG9hc3RDb3JlQ29uZmlnOiB7XG4gKiAgICAgICAvLyBNaWxsaXNlY29uZHMgaXQgd2lsbCBiZSBpZ25vcmVkIGlmIGJ1dHRvbnMgYXJlIGluY2x1ZGVkLlxuICogICAgICAgQXV0b0Nsb3NlRGVsYXk6IDMwMDBcbiAqICAgIH0sXG4gKiAgICBHbG9iYWxTZXR0aW5nczoge1xuICogICAgICAgLy8gVGhlIG51bWJlciBvZiB0b2FzdCBub3RpZmljYXRpb25zIHRoYXQgY2FuIGJlIHNob3duIGF0IG9uY2UuXG4gKiAgICAgICBBbGxvd2VkTm90aWZpY2F0aW9uc0F0T25jZTogNFxuICogICAgfSxcbiAqICAgIC8vIE9wdGlvbmFsIGRlZmF1bHQgZGlzcGF0Y2ggb2JqZWN0LlxuICogICAgRGlzcGF0Y2g6IHtcbiAqICAgICAgVGl0bGU6ICdEZWZhdWx0IHRpdGxlJyxcbiAqICAgICAgTWVzc2FnZTogJ0RlZmF1bHQgbWVzc2FnZSdcbiAqICAgfSxcbiAqICAgQnV0dG9uczogW1xuICogICAgICBuZXcgQnV0dG9uTWFrZXIoJ09rJywgJ29rJywgQnV0dG9uTGF5b3V0RGlzcGxheS5QUklNQVJZKSxcbiAqICAgICAgbmV3IEJ1dHRvbk1ha2VyKCdDYW5jZWwnLCAnY2FuY2VsJywgQnV0dG9uTGF5b3V0RGlzcGxheS5TRUNPTkRBUlkpXG4gKiAgIF1cbiAqfSlcbiAqIGBgYFxuICogKiBUb2FzdENvcmVDb25maWc6IHtAbGluayBJVG9hc3RDb3JlQ29uZmlnfVxuICogKiBHbG9iYWxTZXR0aW5nczoge0BsaW5rIElHbG9iYWxUb2FzdFNldHRpbmdzfVxuICogKiBEaXNwYXRjaDoge0BsaW5rIElEaXNwYXRjaH1cbiAqICogQnV0dG9uczoge0BsaW5rIElCdXR0b259XG4gKiAqIEJ1dHRvbk1ha2VyOiB7QGxpbmsgQnV0dG9uTWFrZXJ9XG4gKiBAY2F0ZWdvcnkgSW1wb3J0cyBmb3IgYW5ndWxhciBhcHAubW9kdWxlXG4gKi9cbmV4cG9ydCB7IFRvYXN0Tm90aWZpY2F0aW9uQ29uZmlnTW9kdWxlIH0gZnJvbSAnLi9uZ3gtYXdlc29tZS1wb3B1cC9uZ3gtYXdlc29tZS1wb3B1cC5tb2R1bGUnO1xuLy8gZW5kcmVnaW9uXG4iXX0=