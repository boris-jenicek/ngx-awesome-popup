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
 *```
 * ## Choose between many appearing animations that are available
 * BOUNCE_IN
 * SWING
 * ZOOM_IN
 * ZOOM_IN_ROTATE
 * ELASTIC
 * JELLO
 * FADE_IN
 * SLIDE_IN_UP
 * SLIDE_IN_DOWN
 * SLIDE_IN_LEFT
 * SLIDE_IN_RIGHT
 * NONE // use thus value for disabling the animations
 */
export { AppearanceAnimation } from './ngx-awesome-popup/core/enums';
/**
 *```
 * ## Multiple different disappearing animations are available
 * ## Choose between many disappearing animations that are available
 * ZOOM_OUT_WIND
 * BOUNCE_OUT
 * FLIP_OUT
 * ZOOM_OUT
 * ZOOM_OUT_ROTATE
 * SLIDE_OUT_UP
 * SLIDE_OUT_DOWN
 * SLIDE_OUT_LEFT
 * SLIDE_OUT_RIGHT
 * NONE // use thus value for disabling the animations
 */
export { DisappearanceAnimation } from './ngx-awesome-popup/core/enums';
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
 *            Primary  : '#ff9e00', // optional shade of the overlay color
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
 *    selector   : 'app-dynamic',
 *    templateUrl: './dynamic.component.html',
 *    styleUrls  : ['./dynamic.component.scss']
 *})
 * export class DynamicComponent implements OnInit, OnDestroy {
 *
 *    subscriptions: Subscription = new Subscription();
 *
 *    constructor(@Inject('dialogBelonging') private dialogBelonging: DialogBelonging) {}
 *
 *    ngOnInit(): void {
 *    console.log(this.dialogBelonging);
 *
 *        this.subscriptions.add(
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
        this.subscriptions.unsubscribe();
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
 *  import {DynamicComponent} from './dynamic/dynamic.component';
 *
 *  const newDialogPopup = new DialogInitializer(DynamicComponent); // Any Angular component.
 *
 *  // Custom data will be sent to dynamic component available in dialogBelonging object.
 *  newDialogPopup.setCustomData({name: 'John', surname: 'Doe', id: 1});
 *
 *  // Local config settings IDialogCoreConfig.
 *  newDialogPopup.setConfig({
 *      LayoutType: DialogLayoutDisplay.INFO, // SUCCESS | INFO | NONE | DANGER | WARNING
 *      Height: '500px',  // optional
 *      // MaxHeight: '600px',  // optional
 *      // MinHeight: '200px',  // optional
 *      // Width: '500px', // optional
 *      // MaxWidth: '600px', // optional
 *      // MinWidth: '200px', // optional
 *      // HideScrollbar: true, // optional, default is false
 *      // FullScreen: true, // optional, default is false
 *      // EscapeKeyClose: true, // optional, default is false
 *      // ButtonPosition: "left", // optional, default is "right"
 *      // LoaderComponent: Any Angular component
 *   });
 *
 *  // Custom buttons, listener is available in child component in dialogBelonging object.
 *  newDialogPopup.setButtons([
 *      new ButtonMaker('Ok', 'ok', ButtonLayoutDisplay.PRIMARY),
 *      new ButtonMaker('Cancel', 'cancel', ButtonLayoutDisplay.SECONDARY) // SUCCESS | INFO | NONE | DANGER | WARNING | PRIMARY | SECONDARY | LINK | DARK | LIGHT
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
 * Style your application by adding a color list like in this example.
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
 * That mean it's predefined config, so it doesn't need to be configured each time when dialog is evoked.
 * For implementation look: {@link IDialogUserConfig}.
 *
 * Example:
 * ```typescript
 * // app.module imports:
 *DialogConfigModule.forRoot({
 *     DialogCoreConfig: {
 *        Width          : '500px',
 *        // MinWidth       : '300px',  // example
 *        // MaxWidth       : '700px',  // example
 *        Height         : '500px',
 *        // MinHeight      : '100vh',  // example
 *        // MaxHeight      : '100px',  // example
 *        ButtonPosition: 'right', // optional ' center', 'left', 'right'
 *        LayoutType: DialogLayoutDisplay.INFO, // SUCCESS | INFO | NONE | DANGER | WARNING
 *        LoaderComponent: // Any angular component class name can be included as a loader.
 *        HideScrollbar  : true,
 *        EscapeKeyClose : true,
 *        // FullScreen : true,
 *        ButtonPosition : 'right',
 *        LayoutType: DialogLayoutDisplay.INFO,
 *        // LoaderComponent: // Any Angular component class name can be included as a loader.
 *        DisplayLoader: false // This will override LoaderComponent.
 *        AnimationIn: AppearanceAnimation.BOUNCE_IN, // BOUNCE_IN | SWING | ZOOM_IN | ZOOM_IN_ROTATE | ELASTIC | JELLO | FADE_IN | SLIDE_IN_UP | SLIDE_IN_DOWN | SLIDE_IN_LEFT | SLIDE_IN_RIGHT | NONE
 *        AnimationOut: DisappearanceAnimation.BOUNCE_OUT, // BOUNCE_OUT | ZOOM_OUT | ZOOM_OUT_WIND | ZOOM_OUT_ROTATE | FLIP_OUT | SLIDE_OUT_UP | SLIDE_OUT_DOWN | SLIDE_OUT_LEFT | SLIDE_OUT_RIGHT | NONE
 *    },
 *    // optional predefined custom default buttons
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
 * That mean it's predefined config, so it doesn't need to be configured each time when confirm box is evoked.
 * For implementation look: {@link IConfirmBoxUserConfig}.
 *
 * Example:
 * ```typescript
 * // app.module imports:
 *ConfirmBoxConfigModule.forRoot({
 *    ConfirmBoxCoreConfig: {
 *       Width: '700px',
 *       LayoutType: DialogLayoutDisplay.DANGER,
 *       ButtonPosition: 'center', // optional ' center', 'left', 'right'
 *       LayoutType: DialogLayoutDisplay.SUCCESS, // SUCCESS | INFO | NONE | DANGER | WARNING
 *       AnimationIn: AppearanceAnimation.BOUNCE_IN, // BOUNCE_IN | SWING | ZOOM_IN | ZOOM_IN_ROTATE | ELASTIC | JELLO | FADE_IN | SLIDE_IN_UP | SLIDE_IN_DOWN | SLIDE_IN_LEFT | SLIDE_IN_RIGHT | NONE
 *       AnimationOut: DisappearanceAnimation.BOUNCE_OUT, // BOUNCE_OUT | ZOOM_OUT | ZOOM_OUT_WIND | ZOOM_OUT_ROTATE | FLIP_OUT | SLIDE_OUT_UP | SLIDE_OUT_DOWN | SLIDE_OUT_LEFT | SLIDE_OUT_RIGHT | NONE
 *       AllowHTMLMessage: true, // default false
 *       DisableIcon: true, // default false
 *    },
 *    Dispatch: {  // Optional default dispatch object.
 *       Title: 'Default title',
 *       Message: 'Default message'
 *    },
 *    // optional predefined custom default buttons
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
 * That mean it's predefined config, so it doesn't need to be configured each time when toast is evoked.
 * For implementation look: {@link IToastNotificationUserConfig}.
 *
 * Example:
 * ```typescript
 * // app.module imports:
 *ToastNotificationConfigModule.forRoot({
 *    ToastCoreConfig: {
 *       // AutoClose it will be ignored if buttons are included.
 *       AutoCloseDelay: 3000 // milliseconds, optional set 0 to never expires
 *       TextPosition: 'right', // optional ' center', 'left', 'right'
 *       LayoutType: DialogLayoutDisplay.SUCCESS, // SUCCESS | INFO | NONE | DANGER | WARNING
 *       ProgressBar: ToastProgressBarEnum.INCREASE, // INCREASE | DECREASE | NONE
 *       ToastUserViewType: ToastUserViewTypeEnum.SIMPLE, // STANDARD | SIMPLE
 *       AnimationIn: AppearanceAnimation.BOUNCE_IN, // BOUNCE_IN | SWING | ZOOM_IN | ZOOM_IN_ROTATE | ELASTIC | JELLO | FADE_IN | SLIDE_IN_UP | SLIDE_IN_DOWN | SLIDE_IN_LEFT | SLIDE_IN_RIGHT | NONE
 *       AnimationOut: DisappearanceAnimation.BOUNCE_OUT, // BOUNCE_OUT | ZOOM_OUT | ZOOM_OUT_WIND | ZOOM_OUT_ROTATE | FLIP_OUT | SLIDE_OUT_UP | SLIDE_OUT_DOWN | SLIDE_OUT_LEFT | SLIDE_OUT_RIGHT | NONE
 *       ToastPosition: ToastPositionEnum.TOP_RIGHT,  // TOP_LEFT | TOP_CENTER | TOP_RIGHT | TOP_FULL_WIDTH | BOTTOM_LEFT | BOTTOM_CENTER | BOTTOM_RIGHT | BOTTOM_FULL_WIDTH
 *       AllowHTMLMessage: true,  // default false
 *       DisableIcon: true, // default false
 *       ButtonPosition: 'right', / / optional ' center', 'left', 'right'
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
 *   // optional predefined custom default buttons
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljX2FwaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3B1YmxpY19hcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFNM0YsT0FBTyxFQUFFLGVBQWUsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBT25HLE9BQU8sRUFDTCx3QkFBd0IsRUFDeEIsNEJBQTRCLEVBQzdCLE1BQU0sMkRBQTJELENBQUM7QUEyQm5FLFlBQVk7QUFFWixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUVyRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx5REFBeUQsQ0FBQztBQUM1RixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx5REFBeUQsQ0FBQztBQUMvRixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5REFBeUQsQ0FBQztBQUNoRzs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNyRTs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQUNILE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3hFOztHQUVHO0FBQ0gsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBRXRFOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUNILE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBRTVFOzs7Ozs7OztHQVFHO0FBQ0gsT0FBTyxFQUFFLHdCQUF3QixFQUFFLENBQUM7QUFFcEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0RHO0FBQ0gsT0FBTyxFQUFFLGVBQWUsRUFBRSxDQUFDO0FBcUIzQixZQUFZO0FBRVosNkJBQTZCO0FBRTdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0NHO0FBQ0gsT0FBTyxFQUFFLDRCQUE0QixFQUFFLENBQUM7QUFDeEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUNHO0FBQ0gsT0FBTyxFQUFFLHFCQUFxQixFQUFFLENBQUM7QUFDakM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1REc7QUFDSCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQztBQUM3QixZQUFZO0FBRVosZ0RBQWdEO0FBQ2hEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFDSCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUNyRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThDRztBQUNILE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ2xGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlDRztBQUNILE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ3RGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtREc7QUFDSCxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUM3RixZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUJ1dHRvbiwgSUNvbG9yVHlwZXMsIElEaXNwYXRjaCwgSUdsb2JhbFVzZXJDb25maWcgfSBmcm9tICcuL25neC1hd2Vzb21lLXBvcHVwL2NvcmUvZ2xvYmFsLWludGVyZmFjZXMnO1xuaW1wb3J0IHsgQ29uZmlybUJveEluaXRpYWxpemVyIH0gZnJvbSAnLi9uZ3gtYXdlc29tZS1wb3B1cC90eXBlcy9jb25maXJtLWJveC9jb3JlL2NsYXNzZXMnO1xuaW1wb3J0IHtcbiAgSUNvbmZpcm1Cb3hDb3JlQ29uZmlnLFxuICBJQ29uZmlybUJveFB1YmxpY1Jlc3BvbnNlLFxuICBJQ29uZmlybUJveFVzZXJDb25maWdcbn0gZnJvbSAnLi9uZ3gtYXdlc29tZS1wb3B1cC90eXBlcy9jb25maXJtLWJveC9jb3JlL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgRGlhbG9nQmVsb25naW5nLCBEaWFsb2dJbml0aWFsaXplciB9IGZyb20gJy4vbmd4LWF3ZXNvbWUtcG9wdXAvdHlwZXMvZGlhbG9nL2NvcmUvY2xhc3Nlcyc7XG5pbXBvcnQge1xuICBJRGlhbG9nQ29yZUNvbmZpZyxcbiAgSURpYWxvZ0V2ZW50c0NvbnRyb2xsZXIsXG4gIElEaWFsb2dQdWJsaWNSZXNwb25zZSxcbiAgSURpYWxvZ1VzZXJDb25maWdcbn0gZnJvbSAnLi9uZ3gtYXdlc29tZS1wb3B1cC90eXBlcy9kaWFsb2cvY29yZS9pbnRlcmZhY2VzJztcbmltcG9ydCB7XG4gIFJlc2V0VG9hc3RHbG9iYWxTZXR0aW5ncyxcbiAgVG9hc3ROb3RpZmljYXRpb25Jbml0aWFsaXplclxufSBmcm9tICcuL25neC1hd2Vzb21lLXBvcHVwL3R5cGVzL3RvYXN0LW5vdGlmaWNhdGlvbi9jb3JlL2NsYXNzZXMnO1xuaW1wb3J0IHtcbiAgSUdsb2JhbFRvYXN0U2V0dGluZ3MsXG4gIElUb2FzdENvcmVDb25maWcsXG4gIElUb2FzdE5vdGlmaWNhdGlvblB1YmxpY1Jlc3BvbnNlLFxuICBJVG9hc3ROb3RpZmljYXRpb25Vc2VyQ29uZmlnXG59IGZyb20gJy4vbmd4LWF3ZXNvbWUtcG9wdXAvdHlwZXMvdG9hc3Qtbm90aWZpY2F0aW9uL2NvcmUvaW50ZXJmYWNlcyc7XG5cbi8vIHJlZ2lvbiAqKiogSW50ZXJmYWNlICoqKlxuZXhwb3J0IHsgSUdsb2JhbFVzZXJDb25maWcgfTtcbmV4cG9ydCB7IElCdXR0b24gfTtcbmV4cG9ydCB7IElEaXNwYXRjaCB9O1xuZXhwb3J0IHsgSUNvbG9yVHlwZXMgfTtcblxuZXhwb3J0IHsgSUNvbmZpcm1Cb3hVc2VyQ29uZmlnIH07XG5leHBvcnQgeyBJQ29uZmlybUJveENvcmVDb25maWcgfTtcbmV4cG9ydCB7IElDb25maXJtQm94UHVibGljUmVzcG9uc2UgfTtcblxuZXhwb3J0IHsgSUdsb2JhbFRvYXN0U2V0dGluZ3MgfTtcbmV4cG9ydCB7IElUb2FzdENvcmVDb25maWcgfTtcbmV4cG9ydCB7IElUb2FzdE5vdGlmaWNhdGlvblVzZXJDb25maWcgfTtcbmV4cG9ydCB7IElUb2FzdE5vdGlmaWNhdGlvblB1YmxpY1Jlc3BvbnNlIH07XG5cbmV4cG9ydCB7IElEaWFsb2dVc2VyQ29uZmlnIH07XG5leHBvcnQgeyBJRGlhbG9nQ29yZUNvbmZpZyB9O1xuZXhwb3J0IHsgSURpYWxvZ1B1YmxpY1Jlc3BvbnNlIH07XG5leHBvcnQgeyBJRGlhbG9nRXZlbnRzQ29udHJvbGxlciB9O1xuLy8gZW5kcmVnaW9uXG5cbmV4cG9ydCB7IEJ1dHRvbkxheW91dERpc3BsYXkgfSBmcm9tICcuL25neC1hd2Vzb21lLXBvcHVwL2NvcmUvZW51bXMnO1xuZXhwb3J0IHsgRGlhbG9nTGF5b3V0RGlzcGxheSB9IGZyb20gJy4vbmd4LWF3ZXNvbWUtcG9wdXAvY29yZS9lbnVtcyc7XG5leHBvcnQgeyBWZXJ0aWNhbFBvc2l0aW9uIH0gZnJvbSAnLi9uZ3gtYXdlc29tZS1wb3B1cC9jb3JlL2VudW1zJztcbmV4cG9ydCB7IFRvYXN0UG9zaXRpb25FbnVtIH0gZnJvbSAnLi9uZ3gtYXdlc29tZS1wb3B1cC90eXBlcy90b2FzdC1ub3RpZmljYXRpb24vY29yZS9lbnVtcyc7XG5leHBvcnQgeyBUb2FzdFByb2dyZXNzQmFyRW51bSB9IGZyb20gJy4vbmd4LWF3ZXNvbWUtcG9wdXAvdHlwZXMvdG9hc3Qtbm90aWZpY2F0aW9uL2NvcmUvZW51bXMnO1xuZXhwb3J0IHsgVG9hc3RVc2VyVmlld1R5cGVFbnVtIH0gZnJvbSAnLi9uZ3gtYXdlc29tZS1wb3B1cC90eXBlcy90b2FzdC1ub3RpZmljYXRpb24vY29yZS9lbnVtcyc7XG4vKipcbiAqYGBgXG4gKiAjIyBDaG9vc2UgYmV0d2VlbiBtYW55IGFwcGVhcmluZyBhbmltYXRpb25zIHRoYXQgYXJlIGF2YWlsYWJsZVxuICogQk9VTkNFX0lOXG4gKiBTV0lOR1xuICogWk9PTV9JTlxuICogWk9PTV9JTl9ST1RBVEVcbiAqIEVMQVNUSUNcbiAqIEpFTExPXG4gKiBGQURFX0lOXG4gKiBTTElERV9JTl9VUFxuICogU0xJREVfSU5fRE9XTlxuICogU0xJREVfSU5fTEVGVFxuICogU0xJREVfSU5fUklHSFRcbiAqIE5PTkUgLy8gdXNlIHRodXMgdmFsdWUgZm9yIGRpc2FibGluZyB0aGUgYW5pbWF0aW9uc1xuICovXG5leHBvcnQgeyBBcHBlYXJhbmNlQW5pbWF0aW9uIH0gZnJvbSAnLi9uZ3gtYXdlc29tZS1wb3B1cC9jb3JlL2VudW1zJztcbi8qKlxuICpgYGBcbiAqICMjIE11bHRpcGxlIGRpZmZlcmVudCBkaXNhcHBlYXJpbmcgYW5pbWF0aW9ucyBhcmUgYXZhaWxhYmxlXG4gKiAjIyBDaG9vc2UgYmV0d2VlbiBtYW55IGRpc2FwcGVhcmluZyBhbmltYXRpb25zIHRoYXQgYXJlIGF2YWlsYWJsZVxuICogWk9PTV9PVVRfV0lORFxuICogQk9VTkNFX09VVFxuICogRkxJUF9PVVRcbiAqIFpPT01fT1VUXG4gKiBaT09NX09VVF9ST1RBVEVcbiAqIFNMSURFX09VVF9VUFxuICogU0xJREVfT1VUX0RPV05cbiAqIFNMSURFX09VVF9MRUZUXG4gKiBTTElERV9PVVRfUklHSFRcbiAqIE5PTkUgLy8gdXNlIHRodXMgdmFsdWUgZm9yIGRpc2FibGluZyB0aGUgYW5pbWF0aW9uc1xuICovXG5leHBvcnQgeyBEaXNhcHBlYXJhbmNlQW5pbWF0aW9uIH0gZnJvbSAnLi9uZ3gtYXdlc29tZS1wb3B1cC9jb3JlL2VudW1zJztcbi8qKlxuICogQHJldHVybnMgSXQgd2lsbCByZXR1cm4gY3VzdG9tIGJ1dHRvbiBvYmplY3QgcmVhZHkgdG8gYmUgdXNlZCBpbiBjaGlsZCBjb21wb25lbnQgbGF5b3V0LlxuICovXG5leHBvcnQgeyBCdXR0b25NYWtlciB9IGZyb20gJy4vbmd4LWF3ZXNvbWUtcG9wdXAvY29yZS9nbG9iYWwtY2xhc3Nlcyc7XG5cbi8qKlxuICpgYGB0eXBlc2NyaXB0XG4gKiAvLyBJbnN0YW50aWF0ZSBjb25maWcgb2JqZWN0IGFzIGV4YW1wbGUgYmVsb3cgdG8gY2hhbmdlIGdsb2JhbCBzZXR0aW5ncyBvbi1mbHkgaXQgdGFrZXMgSUdsb2JhbFVzZXJDb25maWdcbiAqIGFzIHRoZSBhcmd1bWVudC5cbiAqIG5ldyBSZXNldEdsb2JhbENvbmZpZyh7XG4gKiAgICAgQ29sb3JMaXN0OiB7XG4gKiAgICAgICAgICAgIFByaW1hcnkgIDogJyNmZjllMDAnLCAvLyBvcHRpb25hbCBzaGFkZSBvZiB0aGUgb3ZlcmxheSBjb2xvclxuICogICAgICAgICAgICBTZWNvbmRhcnk6ICcjOTg5ZWE1JywgLy8gb3B0aW9uYWxcbiAqICAgICAgICAgICAgSW5mbyAgICAgOiAnIzJmOGVlNScsIC8vIG9wdGlvbmFsXG4gKiAgICAgICAgICAgIFN1Y2Nlc3MgIDogJyMzY2FlYTMnLCAvLyBvcHRpb25hbFxuICogICAgICAgICAgICBXYXJuaW5nICA6ICcjZmZjMTA3JywgLy8gb3B0aW9uYWxcbiAqICAgICAgICAgICAgRGFuZ2VyICAgOiAnI2U0NjQ2NCcsIC8vIG9wdGlvbmFsXG4gKiAgICAgICAgICAgIExpZ2h0ICAgIDogJyNmYmZiZmInLCAvLyBvcHRpb25hbFxuICogICAgICAgICAgICBEYXJrICAgICA6ICcjMzQzYTQwJyAgLy8gb3B0aW9uYWxcbiAqICAgICAgICAgICB9XG4gKiB9KVxuICogYGBgXG4gKi9cbmV4cG9ydCB7IFJlc2V0R2xvYmFsQ29uZmlnIH0gZnJvbSAnLi9uZ3gtYXdlc29tZS1wb3B1cC9jb3JlL2dsb2JhbC1jbGFzc2VzJztcblxuLyoqXG4gKmBgYHR5cGVzY3JpcHRcbiAqIC8vIEluc3RhbnRpYXRlIHRvYXN0IGdsb2JhbCBjb25maWcgb2JqZWN0IGFzIGV4YW1wbGUgYmVsb3cgdG8gY2hhbmdlIGdsb2JhbCBzZXR0aW5ncyBvbi1mbHkgaXQgdGFrZXMgSUdsb2JhbFRvYXN0U2V0dGluZ3NcbiAqIGFzIHRoZSBhcmd1bWVudC5cbiAqIG5ldyBSZXNldFRvYXN0R2xvYmFsU2V0dGluZ3Moe1xuICogICAgIEFsbG93ZWROb3RpZmljYXRpb25zQXRPbmNlOiAyXG4gKiB9KVxuICogYGBgXG4gKi9cbmV4cG9ydCB7IFJlc2V0VG9hc3RHbG9iYWxTZXR0aW5ncyB9O1xuXG4vKipcbiAqIFRoaXMgaXMgdGhlIGNsYXNzIHRoYXQgbmVlZHMgdG8gYmUgYWRkZWQgYXMgREkgaW4gdGhlIGNvbnN0cnVjdG9yIG9mIGEgY2hpbGQgY29tcG9uZW50IHRoYXQgd2lsbCBiZVxuICogb3BlbmVkIGR5bmFtaWNhbGx5IHdpdGgge0BsaW5rIERpYWxvZ0luaXRpYWxpemVyfS4gSXQgY29udGFpbnMgdmFyaW91cyBpbmZvcm1hdGlvbiBvclxuICogZXZlbnQgY29udHJvbGxlcnMsIGFuZCBsaXN0ZW5lcnMgdGhhdCBjYW4gYmUgdXNlZCBpbiBhIGNoaWxkIGNvbXBvbmVudC4gQWxzbywgdGhlcmUgaXMgY3VzdG9tIGRhdGFcbiAqIHRoYXQgaXMgc2VudCBmcm9tIGNvbXBvbmVudCB3aGVyZSB0aGUge0BsaW5rIERpYWxvZ0luaXRpYWxpemVyfSBpcy4gVXNlciBjYW4gc2V0IHNwZWNpZmljIHR5cGUgb2ZcbiAqIGN1c3RvbSBkYXRhIHRoYXQgY2hpbGQgY29tcG9uZW50IHdpbGwgcmVjZWl2ZSBieSBpbmNsdWRpbmcgaXQgYXMgZ2VuZXJpYyB0eXBlLlxuICpcbiAqXG4gKiBFeGFtcGxlOlxuICogYGBgdHlwZXNjcmlwdFxuICppbXBvcnQge0RpYWxvZ0JlbG9uZ2luZ30gZnJvbSAnbmd4LWF3ZXNvbWUtcG9wdXAnO1xuICpAQ29tcG9uZW50KHtcbiAqICAgIHNlbGVjdG9yICAgOiAnYXBwLWR5bmFtaWMnLFxuICogICAgdGVtcGxhdGVVcmw6ICcuL2R5bmFtaWMuY29tcG9uZW50Lmh0bWwnLFxuICogICAgc3R5bGVVcmxzICA6IFsnLi9keW5hbWljLmNvbXBvbmVudC5zY3NzJ11cbiAqfSlcbiAqIGV4cG9ydCBjbGFzcyBEeW5hbWljQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICpcbiAqICAgIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAqXG4gKiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KCdkaWFsb2dCZWxvbmdpbmcnKSBwcml2YXRlIGRpYWxvZ0JlbG9uZ2luZzogRGlhbG9nQmVsb25naW5nKSB7fVxuICpcbiAqICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICogICAgY29uc29sZS5sb2codGhpcy5kaWFsb2dCZWxvbmdpbmcpO1xuICpcbiAqICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICogICAgICAgICAgICB0aGlzLmRpYWxvZ0JlbG9uZ2luZy5FdmVudHNDb250cm9sbGVyLm9uQnV0dG9uQ2xpY2skLnN1YnNjcmliZSgoX0J1dHRvbikgPT4ge1xuICogICAgICAgICAgICBpZiAoX0J1dHRvbi5JRCA9PT0gJ29rJykge1xuICogICAgICAgICAgICAgICAgLy8gRG8gc29tZSBsb2dpYyBhbmQgY2xvc2UgcG9wdXAuXG4gKiAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ0JlbG9uZ2luZy5FdmVudHNDb250cm9sbGVyLmNsb3NlKCk7XG4gKiAgICAgICAgICAgIH0gZWxzZSBpZiAoX0J1dHRvbi5JRCA9PT0gJ2NhbmNlbCcpIHtcbiAqICAgICAgICAgICAgICAgIC8vIERvIHNvbWUgbG9naWMgYW5kIGNsb3NlIHBvcHVwLlxuICogICAgICAgICAgICAgICAgdGhpcy5kaWFsb2dCZWxvbmdpbmcuRXZlbnRzQ29udHJvbGxlci5jbG9zZSgpO1xuICogICAgICAgICAgICB9XG4gKiAgICAgICAgfSlcbiAqICAgICAgICApO1xuICpcbiAqICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAqICAgICAgICAgICAgLy8gQ2xvc2UgbG9hZGVyIGFmdGVyIGFzeW5jIGRhdGEgaXMgcmVhZHkuXG4gKiAgICAgICAgICAgIHRoaXMuZGlhbG9nQmVsb25naW5nLkV2ZW50c0NvbnRyb2xsZXIuY2xvc2VMb2FkZXIoKTtcbiAqICAgICAgICB9LCAxMDAwKTtcbiAqICAgIH1cbiAqfVxuXG4gbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIC8vIENsb3NlIGFsbCBzdWJzY3JpcHRpb25zLlxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gKiBgYGBcbiAqIEBjYXRlZ29yeSBjaGlsZCBkeW5hbWljIGNvbXBvbmVudCBkYXRhICYgZXZlbnQgY29udHJvbGxlclxuICovXG5leHBvcnQgeyBEaWFsb2dCZWxvbmdpbmcgfTtcblxuLy8gcmVnaW9uICoqKiBPYnNlcnZhYmxlIHJlc3BvbnNlIGFmdGVyIGNsb3NpbmcgcG9wdXAgKioqXG4vKipcbiAqIFJlZ3VsYXIgZGVzY3JpcHRpb25cbiAqXG4gKiBAY2F0ZWdvcnkgT2JzZXJ2YWJsZSByZXNwb25zZSBhZnRlciBjbG9zaW5nIHBvcHVwXG4gKi9cbmV4cG9ydCB7IElUb2FzdE5vdGlmaWNhdGlvblB1YmxpY1Jlc3BvbnNlIGFzIElUb2FzdE5vdGlmaWNhdGlvblJlc3BvbnNlIH07XG4vKipcbiAqIFJlZ3VsYXIgZGVzY3JpcHRpb25cbiAqXG4gKiBAY2F0ZWdvcnkgT2JzZXJ2YWJsZSByZXNwb25zZSBhZnRlciBjbG9zaW5nIHBvcHVwXG4gKi9cbmV4cG9ydCB7IElDb25maXJtQm94UHVibGljUmVzcG9uc2UgYXMgSUNvbmZpcm1Cb3hSZXNwb25zZSB9O1xuLyoqXG4gKiBSZWd1bGFyIGRlc2NyaXB0aW9uXG4gKlxuICogQGNhdGVnb3J5IE9ic2VydmFibGUgcmVzcG9uc2UgYWZ0ZXIgY2xvc2luZyBwb3B1cFxuICovXG5leHBvcnQgeyBJRGlhbG9nUHVibGljUmVzcG9uc2UgYXMgSURpYWxvZ1Jlc3BvbnNlIH07XG4vLyBlbmRyZWdpb25cblxuLy8gcmVnaW9uICoqKiBQb3B1cCBvcGVuICAqKipcblxuLyoqXG4gKiBUaGlzIGlzIHRoZSBjbGFzcyB0aGF0IG5lZWRzIHRvIGJlIGluc3RhbnRpYXRlZCB0byBzZXQgdXAgYW5kIGlnbml0ZSBhIFRvYXN0Tm90aWZpY2F0aW9uLFxuICogaXRzIHB1cnBvc2UgaXMgdG8gc2hvdyBzaG9ydCBub3RpZmljYXRpb24gdG8gZW5kLXVzZXIsIG9yIGV2ZW4gaW50ZXJhY3Qgd2l0aCB1c2VyLlxuICogSXQgY2FuIGJlIGV2b2tlZCBmcm9tIGFueSBhbmd1bGFyIHR5cGVzY3JpcHQgZmlsZS5cbiAqXG4gKiBCZWxvdyBpcyB0aGUgZXhhbXBsZSB3aXRoIChzb21lIG9wdGlvbmFsKSB1c2VyIGNvbmZpZ3VyYXRpb24sXG4gKiBpdCB3aWxsIG92ZXJyaWRlIGRlZmF1bHQgY29uZmlndXJhdGlvbiBmcm9tIGFwcC5tb2R1bGUuXG4gKlxuICpcbiAqIEV4YW1wbGU6XG4gKiBgYGB0eXBlc2NyaXB0XG4gKiAvLyBDcmVhdGUgdGhlIGluaXRpYWxpemVyLlxuICpjb25zdCBuZXdUb2FzdE5vdGlmaWNhdGlvbiA9IG5ldyBUb2FzdE5vdGlmaWNhdGlvbkluaXRpYWxpemVyKCk7XG4gKlxuICogLy8gU2V0IGRlc2lyZWQgVGl0bGUuXG4gKm5ld1RvYXN0Tm90aWZpY2F0aW9uLnNldFRpdGxlKCdXYXJuaW5nIScpO1xuICpcbiAqIC8vIFNldCBkZXNpcmVkIE1lc3NhZ2UuXG4gKm5ld1RvYXN0Tm90aWZpY2F0aW9uLnNldE1lc3NhZ2UoJ0Zvcm0gaXMgbm90IHZhbGlkIScpO1xuICpcbiAqIC8vIFNldCBkZXNpcmVkIGNvbmZpZ3VyYXRpb24uXG4gKm5ld1RvYXN0Tm90aWZpY2F0aW9uLnNldENvbmZpZyh7XG4gKiAgICAgIExheW91dFR5cGU6IERpYWxvZ0xheW91dERpc3BsYXkuV0FSTklOR1xuICogICB9KTtcblxuICogLy8gT3BlbiBhIFRvYXN0Tm90aWZpY2F0aW9uLlxuICogbmV3Q29uZmlybUJveC5vcGVuQ29uZmlybUJveCQoKS5zdWJzY3JpYmUocmVzcCA9PiB7XG4gKiAgIGNvbnNvbGUubG9nKCdjb25maXJtQm94IHJlc3BvbnNlOiAnLCByZXNwKTtcbiAqICB9KTtcbiAqIGBgYFxuICogKiBJVG9hc3RDb3JlQ29uZmlnOiB7QGxpbmsgSVRvYXN0Q29yZUNvbmZpZ31cbiAqICogTGF5b3V0VHlwZToge0BsaW5rIERpYWxvZ0xheW91dERpc3BsYXl9XG4gKiAqIElUb2FzdE5vdGlmaWNhdGlvblB1YmxpY1Jlc3BvbnNlOiB7QGxpbmsgSVRvYXN0Tm90aWZpY2F0aW9uUHVibGljUmVzcG9uc2V9XG4gKiBAY2F0ZWdvcnkgUG9wdXAgb3BlblxuICovXG5leHBvcnQgeyBUb2FzdE5vdGlmaWNhdGlvbkluaXRpYWxpemVyIH07XG4vKipcbiAqIFRoaXMgaXMgdGhlIGNsYXNzIHRoYXQgbmVlZHMgdG8gYmUgaW5zdGFudGlhdGVkIHRvIHNldCB1cCBhbmQgaWduaXRlIGEgQ29uZmlybUJveCBhbmQgY3JlYXRlIGNvbnRlbnQuXG4gKiBJdHMgcHVycG9zZSBpcyB0byBnZXQgY29uZmlybWF0aW9uIHJlc3BvbnNlIGZyb20gZW5kLXVzZXIuIEl0IGNhbiBiZSBjYWxsZWQgZnJvbSBhbnkgYW5ndWxhclxuICogdHlwZXNjcmlwdCBmaWxlLlxuICpcbiAqIEJlbG93IGlzIGV4YW1wbGUgd2l0aCAoc29tZSBvcHRpb25hbCkgdXNlciBjb25maWd1cmF0aW9uLFxuICogaXQgd2lsbCBvdmVycmlkZSBkZWZhdWx0IGNvbmZpZ3VyYXRpb24gZnJvbSBhcHAubW9kdWxlLlxuICpcbiAqXG4gKiBFeGFtcGxlOlxuICogYGBgdHlwZXNjcmlwdFxuICogLy8gQ3JlYXRlIHRoZSBpbml0aWFsaXplci5cbiAqY29uc3QgbmV3Q29uZmlybUJveCA9IG5ldyBDb25maXJtQm94SW5pdGlhbGl6ZXIoKTtcbiAqXG4gKiAvLyBTZXQgZGVzaXJlZCBkaXNwYXRjaDogX1RpdGxlOiBzdHJpbmcsIF9NZXNzYWdlOiBzdHJpbmcuXG4gKm5ld0NvbmZpcm1Cb3guc2V0RGlzcGF0Y2goJ0FyZSB5b3Ugc3VyZT8nLCAnVGhhdCBhY3Rpb24gd2lsbCBkZWxldGUgdXNlciEnKTtcbiAqXG4gKiAvLyBTZXQgZGVzaXJlZCBjb25maWd1cmF0aW9uLlxuICpuZXdDb25maXJtQm94LnNldENvbmZpZyh7XG4gKiAgICAgIExheW91dFR5cGU6IERpYWxvZ0xheW91dERpc3BsYXkuREFOR0VSXG4gKiAgIH0pO1xuICpcbiAqIC8vIFNldCBidXR0b24gbGFiZWxzLlxuICogbmV3Q29uZmlybUJveC5zZXRCdXR0b25MYWJlbHMoJ1lFUycsICdOTycpO1xuICpcbiAqIC8vIE9wZW4gYSBDb25maXJtQm94LCBhbmQgZ2V0IGNsaWNrZWQgYnV0dG9uLWlkIGluIHJlc3BvbnNlLlxuICogbmV3Q29uZmlybUJveC5vcGVuQ29uZmlybUJveCQoKS5zdWJzY3JpYmUocmVzcCA9PiB7XG4gKiAgIC8vIElDb25maXJtQm94UHVibGljUmVzcG9uc2VcbiAqICAgY29uc29sZS5sb2coJ2NvbmZpcm1Cb3ggcmVzcG9uc2U6ICcsIHJlc3ApO1xuICogIH0pO1xuICogYGBgXG4gKiAqIElDb25maXJtQm94Q29yZUNvbmZpZzoge0BsaW5rIElDb25maXJtQm94Q29yZUNvbmZpZ31cbiAqICogTGF5b3V0VHlwZToge0BsaW5rIERpYWxvZ0xheW91dERpc3BsYXl9XG4gKiAqIElDb25maXJtQm94UHVibGljUmVzcG9uc2U6IHtAbGluayBJQ29uZmlybUJveFB1YmxpY1Jlc3BvbnNlfVxuICogQGNhdGVnb3J5IFBvcHVwIG9wZW5cbiAqL1xuZXhwb3J0IHsgQ29uZmlybUJveEluaXRpYWxpemVyIH07XG4vKipcbiAqIFRoaXMgaXMgdGhlIGNsYXNzIHRoYXQgbmVlZHMgdG8gYmUgaW5zdGFudGlhdGVkIHRvIHNldCB1cCBhbmQgaWduaXRlIGEgRGlhbG9nIGFuZCBjcmVhdGUgZHluYW1pYyBjb21wb25lbnQsXG4gKiBpdHMgcHVycG9zZSBpcyB0byByZW5kZXIgYW55IGFuZ3VsYXIgY29tcG9uZW50IHZpZXcgd2l0aCBzcGVjaWZpYyBjb25maWd1cmF0aW9uIGZyb20gYW55IGFuZ3VsYXIgdHlwZXNjcmlwdCBmaWxlLlxuICogRHluYW1pYyBjb21wb25lbnQgbWVhbnMgdGhhdCB1c2VyIGNhbiBldm9rZSB0aGUgcG9wdXAgZnJvbSB0eXBlc2NyaXB0IGFuZCBjb21wb25lbnQgdmlld1xuICogaXMgZHluYW1pY2FsbHkgY3JlYXRlZCB3aXRoIHRoZSBBd2Vzb21lIFBvcHVwIGVuZ2luZS4gVGhlcmUgaXMgbm8gbmVlZCB0byBjYWxsIGFueSBzZWxlY3RvciBpbiBIVE1MIHRvIGNyZWF0ZSBjb21wb25lbnQgdmlldy5cbiAqXG4gKiBEaWFsb2dJbml0aWFsaXplciBjYW4gc2VuZCBkYXRhIHRvIGNoaWxkIGNvbXBvbmVudCAoZHluYW1pYyBjb21wb25lbnQpIHdoZXJlIGRhdGEgd2lsbCBiZSBhY2Nlc3NpYmxlIHdpdGgge0BsaW5rIERpYWxvZ0JlbG9uZ2luZ30uXG4gKlxuICogQmVsb3cgaXMgdGhlIGV4YW1wbGUgd2l0aCAoc29tZSBvcHRpb25hbCkgdXNlciBjb25maWd1cmF0aW9uLFxuICogaXQgd2lsbCBvdmVycmlkZSBkZWZhdWx0IGNvbmZpZ3VyYXRpb24gZnJvbSBhcHAubW9kdWxlLlxuICpcbiAqXG4gKiBFeGFtcGxlOlxuICogYGBgdHlwZXNjcmlwdFxuICogIGltcG9ydCB7RGlhbG9nSW5pdGlhbGl6ZXIsIERpYWxvZ0xheW91dERpc3BsYXksIEJ1dHRvbk1ha2VyLCBCdXR0b25MYXlvdXREaXNwbGF5fSBmcm9tICduZ3gtYXdlc29tZS1wb3B1cCc7PFxuICogIGltcG9ydCB7RHluYW1pY0NvbXBvbmVudH0gZnJvbSAnLi9keW5hbWljL2R5bmFtaWMuY29tcG9uZW50JztcbiAqXG4gKiAgY29uc3QgbmV3RGlhbG9nUG9wdXAgPSBuZXcgRGlhbG9nSW5pdGlhbGl6ZXIoRHluYW1pY0NvbXBvbmVudCk7IC8vIEFueSBBbmd1bGFyIGNvbXBvbmVudC5cbiAqXG4gKiAgLy8gQ3VzdG9tIGRhdGEgd2lsbCBiZSBzZW50IHRvIGR5bmFtaWMgY29tcG9uZW50IGF2YWlsYWJsZSBpbiBkaWFsb2dCZWxvbmdpbmcgb2JqZWN0LlxuICogIG5ld0RpYWxvZ1BvcHVwLnNldEN1c3RvbURhdGEoe25hbWU6ICdKb2huJywgc3VybmFtZTogJ0RvZScsIGlkOiAxfSk7XG4gKlxuICogIC8vIExvY2FsIGNvbmZpZyBzZXR0aW5ncyBJRGlhbG9nQ29yZUNvbmZpZy5cbiAqICBuZXdEaWFsb2dQb3B1cC5zZXRDb25maWcoe1xuICogICAgICBMYXlvdXRUeXBlOiBEaWFsb2dMYXlvdXREaXNwbGF5LklORk8sIC8vIFNVQ0NFU1MgfCBJTkZPIHwgTk9ORSB8IERBTkdFUiB8IFdBUk5JTkdcbiAqICAgICAgSGVpZ2h0OiAnNTAwcHgnLCAgLy8gb3B0aW9uYWxcbiAqICAgICAgLy8gTWF4SGVpZ2h0OiAnNjAwcHgnLCAgLy8gb3B0aW9uYWxcbiAqICAgICAgLy8gTWluSGVpZ2h0OiAnMjAwcHgnLCAgLy8gb3B0aW9uYWxcbiAqICAgICAgLy8gV2lkdGg6ICc1MDBweCcsIC8vIG9wdGlvbmFsXG4gKiAgICAgIC8vIE1heFdpZHRoOiAnNjAwcHgnLCAvLyBvcHRpb25hbFxuICogICAgICAvLyBNaW5XaWR0aDogJzIwMHB4JywgLy8gb3B0aW9uYWxcbiAqICAgICAgLy8gSGlkZVNjcm9sbGJhcjogdHJ1ZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgZmFsc2VcbiAqICAgICAgLy8gRnVsbFNjcmVlbjogdHJ1ZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgZmFsc2VcbiAqICAgICAgLy8gRXNjYXBlS2V5Q2xvc2U6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIGZhbHNlXG4gKiAgICAgIC8vIEJ1dHRvblBvc2l0aW9uOiBcImxlZnRcIiwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgXCJyaWdodFwiXG4gKiAgICAgIC8vIExvYWRlckNvbXBvbmVudDogQW55IEFuZ3VsYXIgY29tcG9uZW50XG4gKiAgIH0pO1xuICpcbiAqICAvLyBDdXN0b20gYnV0dG9ucywgbGlzdGVuZXIgaXMgYXZhaWxhYmxlIGluIGNoaWxkIGNvbXBvbmVudCBpbiBkaWFsb2dCZWxvbmdpbmcgb2JqZWN0LlxuICogIG5ld0RpYWxvZ1BvcHVwLnNldEJ1dHRvbnMoW1xuICogICAgICBuZXcgQnV0dG9uTWFrZXIoJ09rJywgJ29rJywgQnV0dG9uTGF5b3V0RGlzcGxheS5QUklNQVJZKSxcbiAqICAgICAgbmV3IEJ1dHRvbk1ha2VyKCdDYW5jZWwnLCAnY2FuY2VsJywgQnV0dG9uTGF5b3V0RGlzcGxheS5TRUNPTkRBUlkpIC8vIFNVQ0NFU1MgfCBJTkZPIHwgTk9ORSB8IERBTkdFUiB8IFdBUk5JTkcgfCBQUklNQVJZIHwgU0VDT05EQVJZIHwgTElOSyB8IERBUksgfCBMSUdIVFxuICogIF0pO1xuICpcbiAqICAvLyBDb21tYW5kIHRvIG9wZW4gZGlhbG9nLCBpdCByZXR1cm5zIG9ic2VydmFibGUuXG4gKiAgbmV3RGlhbG9nUG9wdXAub3BlbkRpYWxvZyQ8YW55PigpLnN1YnNjcmliZShyZXNwID0+IHtcbiAqICAgICAgICAgICBjb25zb2xlLmxvZygncmVzcG9uc2U6ICcsIHJlc3AuUGF5bG9hZCk7XG4gKiAgICAgICB9KTtcbiAqIGBgYFxuICogKiBJRGlhbG9nQ29yZUNvbmZpZzoge0BsaW5rIElEaWFsb2dDb3JlQ29uZmlnfVxuICogKiBMYXlvdXRUeXBlOiB7QGxpbmsgRGlhbG9nTGF5b3V0RGlzcGxheX1cbiAqICogQnV0dG9uTGF5b3V0RGlzcGxheToge0BsaW5rIEJ1dHRvbkxheW91dERpc3BsYXl9XG4gKiAqIEJ1dHRvbk1ha2VyOiB7QGxpbmsgQnV0dG9uTWFrZXJ9XG4gKiAqIElEaWFsb2dQdWJsaWNSZXNwb25zZToge0BsaW5rIElEaWFsb2dQdWJsaWNSZXNwb25zZX1cbiAqIEBjYXRlZ29yeSBQb3B1cCBvcGVuXG4gKi9cbmV4cG9ydCB7IERpYWxvZ0luaXRpYWxpemVyIH07XG4vLyBlbmRyZWdpb25cblxuLy8gcmVnaW9uICoqKiBJbXBvcnRzIGZvciBhbmd1bGFyIGFwcC5tb2R1bGUgKioqXG4vKipcbiAqIFRoaXMgaXMgdGhlIG1haW4gbW9kdWxlIG9mIHRoZSBsaWJyYXJ5LCBpdCBpcyBjcnVjaWFsIHRvIGJlIGFkZGVkIHdpdGhpbiBhbmd1bGFyLmFwcFxuICogaW1wb3J0cyBhcyBhbiBleGFtcGxlIHdpdGggb3B0aW9uYWwgYXJndW1lbnQsIGxvb2s6IHtAbGluayBJR2xvYmFsVXNlckNvbmZpZ31cbiAqIFN0eWxlIHlvdXIgYXBwbGljYXRpb24gYnkgYWRkaW5nIGEgY29sb3IgbGlzdCBsaWtlIGluIHRoaXMgZXhhbXBsZS5cbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiAvLyBhcHAubW9kdWxlIGltcG9ydHM6XG4gKiBOZ3hBd2Vzb21lUG9wdXBNb2R1bGUuZm9yUm9vdCh7XG4gKiAgICAgQ29sb3JMaXN0OiB7XG4gKiAgICAgICAgICAgIFByaW1hcnkgIDogJyNmZjllMDAnLCAvLyBvcHRpb25hbFxuICogICAgICAgICAgICBTZWNvbmRhcnk6ICcjOTg5ZWE1JywgLy8gb3B0aW9uYWxcbiAqICAgICAgICAgICAgSW5mbyAgICAgOiAnIzJmOGVlNScsIC8vIG9wdGlvbmFsXG4gKiAgICAgICAgICAgIFN1Y2Nlc3MgIDogJyMzY2FlYTMnLCAvLyBvcHRpb25hbFxuICogICAgICAgICAgICBXYXJuaW5nICA6ICcjZmZjMTA3JywgLy8gb3B0aW9uYWxcbiAqICAgICAgICAgICAgRGFuZ2VyICAgOiAnI2U0NjQ2NCcsIC8vIG9wdGlvbmFsXG4gKiAgICAgICAgICAgIExpZ2h0ICAgIDogJyNmYmZiZmInLCAvLyBvcHRpb25hbFxuICogICAgICAgICAgICBEYXJrICAgICA6ICcjMzQzYTQwJyAgLy8gb3B0aW9uYWxcbiAqICAgICAgICAgICB9XG4gKiB9KVxuICogYGBgXG4gKiBAY2F0ZWdvcnkgSW1wb3J0cyBmb3IgYW5ndWxhciBhcHAubW9kdWxlXG4gKi9cbmV4cG9ydCB7IE5neEF3ZXNvbWVQb3B1cE1vZHVsZSB9IGZyb20gJy4vbmd4LWF3ZXNvbWUtcG9wdXAvbmd4LWF3ZXNvbWUtcG9wdXAubW9kdWxlJztcbi8qKlxuICogVGhpcyBpcyB0aGUgbW9kdWxlIHRoYXQgaWduaXRlcyBkeW5hbWljIGRpYWxvZyBtb2RhbCwgaXRzIHB1cnBvc2UgaXMgdG8gbG9hZCBhbnkgYW5ndWxhciBjb21wb25lbnQgaW5cbiAqIGRpYWxvZyB3aW5kb3cuIER5bmFtaWMgY29tcG9uZW50IG1lYW5zIHRoYXQgdXNlciBjYW4gZXZva2UgYW55IEFuZ3VsYXIgY29tcG9uZW50IGluIHRoZSBwb3B1cCBqdXN0IGZyb20gdHlwZXNjcmlwdC4gQ29tcG9uZW50IHZpZXdcbiAqIGlzIGR5bmFtaWNhbGx5IGNyZWF0ZWQgd2l0aCB0aGUgbGlicmFyeSBlbmdpbmUgYW5kIHRoZXJlIGlzIG5vIG5lZWQgdG8gY2FsbCBhbnkgc2VsZWN0b3IgaW4gSFRNTCB0byBjcmVhdGUgY29tcG9uZW50IHZpZXcuXG4gKlxuICogSXQgaXMgY3J1Y2lhbCBmb3IgdXNlciB0byBhZGQgdGhpcyBtb2R1bGUgaW4gYW5ndWxhci5hcHAgaW1wb3J0cy5cbiAqIEJlbG93IGlzIHRoZSBleGFtcGxlIHdpdGggKG9wdGlvbmFsKSBkZWZhdWx0IHVzZXIgY29uZmlndXJhdGlvbiwgdGhhdCBpcyB3aGF0IHdpbGwgYmUgaW4gc2V0dXAgaWYgdGhlcmUgaXMgbm9cbiAqIGxvY2FsIGNvbmZpZyB3aGVuIHBvcHVwIGlzIGV2b2tlZCwgdGhhdCBtZWFucyBpdCBjYW4gYmUgb3ZlcnJpZGRlbiBkaXJlY3RseSB3aGVuIHBvcHVwIGlzIGNhbGxlZC5cbiAqIFRoYXQgbWVhbiBpdCdzIHByZWRlZmluZWQgY29uZmlnLCBzbyBpdCBkb2Vzbid0IG5lZWQgdG8gYmUgY29uZmlndXJlZCBlYWNoIHRpbWUgd2hlbiBkaWFsb2cgaXMgZXZva2VkLlxuICogRm9yIGltcGxlbWVudGF0aW9uIGxvb2s6IHtAbGluayBJRGlhbG9nVXNlckNvbmZpZ30uXG4gKlxuICogRXhhbXBsZTpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIC8vIGFwcC5tb2R1bGUgaW1wb3J0czpcbiAqRGlhbG9nQ29uZmlnTW9kdWxlLmZvclJvb3Qoe1xuICogICAgIERpYWxvZ0NvcmVDb25maWc6IHtcbiAqICAgICAgICBXaWR0aCAgICAgICAgICA6ICc1MDBweCcsXG4gKiAgICAgICAgLy8gTWluV2lkdGggICAgICAgOiAnMzAwcHgnLCAgLy8gZXhhbXBsZVxuICogICAgICAgIC8vIE1heFdpZHRoICAgICAgIDogJzcwMHB4JywgIC8vIGV4YW1wbGVcbiAqICAgICAgICBIZWlnaHQgICAgICAgICA6ICc1MDBweCcsXG4gKiAgICAgICAgLy8gTWluSGVpZ2h0ICAgICAgOiAnMTAwdmgnLCAgLy8gZXhhbXBsZVxuICogICAgICAgIC8vIE1heEhlaWdodCAgICAgIDogJzEwMHB4JywgIC8vIGV4YW1wbGVcbiAqICAgICAgICBCdXR0b25Qb3NpdGlvbjogJ3JpZ2h0JywgLy8gb3B0aW9uYWwgJyBjZW50ZXInLCAnbGVmdCcsICdyaWdodCdcbiAqICAgICAgICBMYXlvdXRUeXBlOiBEaWFsb2dMYXlvdXREaXNwbGF5LklORk8sIC8vIFNVQ0NFU1MgfCBJTkZPIHwgTk9ORSB8IERBTkdFUiB8IFdBUk5JTkdcbiAqICAgICAgICBMb2FkZXJDb21wb25lbnQ6IC8vIEFueSBhbmd1bGFyIGNvbXBvbmVudCBjbGFzcyBuYW1lIGNhbiBiZSBpbmNsdWRlZCBhcyBhIGxvYWRlci5cbiAqICAgICAgICBIaWRlU2Nyb2xsYmFyICA6IHRydWUsXG4gKiAgICAgICAgRXNjYXBlS2V5Q2xvc2UgOiB0cnVlLFxuICogICAgICAgIC8vIEZ1bGxTY3JlZW4gOiB0cnVlLFxuICogICAgICAgIEJ1dHRvblBvc2l0aW9uIDogJ3JpZ2h0JyxcbiAqICAgICAgICBMYXlvdXRUeXBlOiBEaWFsb2dMYXlvdXREaXNwbGF5LklORk8sXG4gKiAgICAgICAgLy8gTG9hZGVyQ29tcG9uZW50OiAvLyBBbnkgQW5ndWxhciBjb21wb25lbnQgY2xhc3MgbmFtZSBjYW4gYmUgaW5jbHVkZWQgYXMgYSBsb2FkZXIuXG4gKiAgICAgICAgRGlzcGxheUxvYWRlcjogZmFsc2UgLy8gVGhpcyB3aWxsIG92ZXJyaWRlIExvYWRlckNvbXBvbmVudC5cbiAqICAgICAgICBBbmltYXRpb25JbjogQXBwZWFyYW5jZUFuaW1hdGlvbi5CT1VOQ0VfSU4sIC8vIEJPVU5DRV9JTiB8IFNXSU5HIHwgWk9PTV9JTiB8IFpPT01fSU5fUk9UQVRFIHwgRUxBU1RJQyB8IEpFTExPIHwgRkFERV9JTiB8IFNMSURFX0lOX1VQIHwgU0xJREVfSU5fRE9XTiB8IFNMSURFX0lOX0xFRlQgfCBTTElERV9JTl9SSUdIVCB8IE5PTkVcbiAqICAgICAgICBBbmltYXRpb25PdXQ6IERpc2FwcGVhcmFuY2VBbmltYXRpb24uQk9VTkNFX09VVCwgLy8gQk9VTkNFX09VVCB8IFpPT01fT1VUIHwgWk9PTV9PVVRfV0lORCB8IFpPT01fT1VUX1JPVEFURSB8IEZMSVBfT1VUIHwgU0xJREVfT1VUX1VQIHwgU0xJREVfT1VUX0RPV04gfCBTTElERV9PVVRfTEVGVCB8IFNMSURFX09VVF9SSUdIVCB8IE5PTkVcbiAqICAgIH0sXG4gKiAgICAvLyBvcHRpb25hbCBwcmVkZWZpbmVkIGN1c3RvbSBkZWZhdWx0IGJ1dHRvbnNcbiAqICAgICBCdXR0b25zOiBbXG4gKiAgICAgICAgbmV3IEJ1dHRvbk1ha2VyKCdPaycsICdvaycsIEJ1dHRvbkxheW91dERpc3BsYXkuUFJJTUFSWSksXG4gKiAgICAgICAgbmV3IEJ1dHRvbk1ha2VyKCdDYW5jZWwnLCAnY2FuY2VsJywgQnV0dG9uTGF5b3V0RGlzcGxheS5TRUNPTkRBUlkpXG4gKiAgICAgXSxcbiAqIH0pXG4gKiBgYGBcbiAqICogRGlhbG9nQ29yZUNvbmZpZy5MYXlvdXRUeXBlOiB7QGxpbmsgRGlhbG9nTGF5b3V0RGlzcGxheX1cbiAqICogQnV0dG9uTGF5b3V0RGlzcGxheToge0BsaW5rIEJ1dHRvbkxheW91dERpc3BsYXl9XG4gKiAqIEJ1dHRvbk1ha2VyOiB7QGxpbmsgQnV0dG9uTWFrZXJ9XG4gKiBAY2F0ZWdvcnkgSW1wb3J0cyBmb3IgYW5ndWxhciBhcHAubW9kdWxlXG4gKi9cbmV4cG9ydCB7IERpYWxvZ0NvbmZpZ01vZHVsZSB9IGZyb20gJy4vbmd4LWF3ZXNvbWUtcG9wdXAvbmd4LWF3ZXNvbWUtcG9wdXAubW9kdWxlJztcbi8qKlxuICogVGhpcyBpcyB0aGUgbW9kdWxlIHRoYXQgaWduaXRlcyBDb25maXJtIGJveCBkaWFsb2csIGl0cyBwdXJwb3NlIGlzIHRvIHNob3cgcG9wdXAgaW4gYVxuICogc21hbGwgZGlhbG9nIHdpbmRvdyBpbiB0aGUgbWlkZGxlIG9mIHRoZSBzY3JlZW4uIFVzZXIgY2FuIHByb3ZpZGUgdGl0bGUsIG1lc3NhZ2UgYW5kIGluY2x1ZGUgYnV0dG9ucy5cbiAqIENvbmZpcm0gYm94IGlzIGF2YWlsYWJsZSBpbiBwcmVkZWZpbmVkIGxheW91dCB0eXBlcyAoZW51bXMpOiB7QGxpbmsgRGlhbG9nTGF5b3V0RGlzcGxheX0uXG4gKlxuICogSXQgaXMgY3J1Y2lhbCBmb3IgdXNlciB0byBhZGQgdGhpcyBtb2R1bGUgaW4gYW5ndWxhci5hcHAgaW1wb3J0cy5cbiAqIEJlbG93IGlzIHRoZSBleGFtcGxlIHdpdGggKG9wdGlvbmFsKSBkZWZhdWx0IHVzZXIgY29uZmlndXJhdGlvbiwgdGhhdCdzIHdoYXQgd2lsbCBiZSB1c2VkIGlmIHRoZXJlIGlzIG5vXG4gKiBsb2NhbCBjb25maWcgd2hlbiBwb3B1cCBpcyBldm9rZWQsIHRoYXQgbWVhbnMgaXQgY2FuIGJlIG92ZXJyaWRkZW4gZGlyZWN0bHkgd2hlbiBwb3B1cCBpcyBldm9rZWQuXG4gKiBUaGF0IG1lYW4gaXQncyBwcmVkZWZpbmVkIGNvbmZpZywgc28gaXQgZG9lc24ndCBuZWVkIHRvIGJlIGNvbmZpZ3VyZWQgZWFjaCB0aW1lIHdoZW4gY29uZmlybSBib3ggaXMgZXZva2VkLlxuICogRm9yIGltcGxlbWVudGF0aW9uIGxvb2s6IHtAbGluayBJQ29uZmlybUJveFVzZXJDb25maWd9LlxuICpcbiAqIEV4YW1wbGU6XG4gKiBgYGB0eXBlc2NyaXB0XG4gKiAvLyBhcHAubW9kdWxlIGltcG9ydHM6XG4gKkNvbmZpcm1Cb3hDb25maWdNb2R1bGUuZm9yUm9vdCh7XG4gKiAgICBDb25maXJtQm94Q29yZUNvbmZpZzoge1xuICogICAgICAgV2lkdGg6ICc3MDBweCcsXG4gKiAgICAgICBMYXlvdXRUeXBlOiBEaWFsb2dMYXlvdXREaXNwbGF5LkRBTkdFUixcbiAqICAgICAgIEJ1dHRvblBvc2l0aW9uOiAnY2VudGVyJywgLy8gb3B0aW9uYWwgJyBjZW50ZXInLCAnbGVmdCcsICdyaWdodCdcbiAqICAgICAgIExheW91dFR5cGU6IERpYWxvZ0xheW91dERpc3BsYXkuU1VDQ0VTUywgLy8gU1VDQ0VTUyB8IElORk8gfCBOT05FIHwgREFOR0VSIHwgV0FSTklOR1xuICogICAgICAgQW5pbWF0aW9uSW46IEFwcGVhcmFuY2VBbmltYXRpb24uQk9VTkNFX0lOLCAvLyBCT1VOQ0VfSU4gfCBTV0lORyB8IFpPT01fSU4gfCBaT09NX0lOX1JPVEFURSB8IEVMQVNUSUMgfCBKRUxMTyB8IEZBREVfSU4gfCBTTElERV9JTl9VUCB8IFNMSURFX0lOX0RPV04gfCBTTElERV9JTl9MRUZUIHwgU0xJREVfSU5fUklHSFQgfCBOT05FXG4gKiAgICAgICBBbmltYXRpb25PdXQ6IERpc2FwcGVhcmFuY2VBbmltYXRpb24uQk9VTkNFX09VVCwgLy8gQk9VTkNFX09VVCB8IFpPT01fT1VUIHwgWk9PTV9PVVRfV0lORCB8IFpPT01fT1VUX1JPVEFURSB8IEZMSVBfT1VUIHwgU0xJREVfT1VUX1VQIHwgU0xJREVfT1VUX0RPV04gfCBTTElERV9PVVRfTEVGVCB8IFNMSURFX09VVF9SSUdIVCB8IE5PTkVcbiAqICAgICAgIEFsbG93SFRNTE1lc3NhZ2U6IHRydWUsIC8vIGRlZmF1bHQgZmFsc2VcbiAqICAgICAgIERpc2FibGVJY29uOiB0cnVlLCAvLyBkZWZhdWx0IGZhbHNlXG4gKiAgICB9LFxuICogICAgRGlzcGF0Y2g6IHsgIC8vIE9wdGlvbmFsIGRlZmF1bHQgZGlzcGF0Y2ggb2JqZWN0LlxuICogICAgICAgVGl0bGU6ICdEZWZhdWx0IHRpdGxlJyxcbiAqICAgICAgIE1lc3NhZ2U6ICdEZWZhdWx0IG1lc3NhZ2UnXG4gKiAgICB9LFxuICogICAgLy8gb3B0aW9uYWwgcHJlZGVmaW5lZCBjdXN0b20gZGVmYXVsdCBidXR0b25zXG4gKiAgICBCdXR0b25zICAgICA6IFtcbiAqICAgICAgIG5ldyBCdXR0b25NYWtlcignT2snLCAnb2snLCBCdXR0b25MYXlvdXREaXNwbGF5LlBSSU1BUlkpLFxuICogICAgICAgbmV3IEJ1dHRvbk1ha2VyKCdDYW5jZWwnLCAnY2FuY2VsJywgQnV0dG9uTGF5b3V0RGlzcGxheS5TRUNPTkRBUlkpXG4gKiAgICBdXG4gKiB9KVxuICogYGBgXG4gKiAqIENvbmZpcm1Cb3hDb3JlQ29uZmlnOiB7QGxpbmsgSUNvbmZpcm1Cb3hDb3JlQ29uZmlnfVxuICogKiBEaXNwYXRjaDoge0BsaW5rIElEaXNwYXRjaH1cbiAqICogQnV0dG9uczoge0BsaW5rIElCdXR0b259XG4gKiAqIEJ1dHRvbk1ha2VyOiB7QGxpbmsgQnV0dG9uTWFrZXJ9XG4gKiBAY2F0ZWdvcnkgSW1wb3J0cyBmb3IgYW5ndWxhciBhcHAubW9kdWxlXG4gKi9cbmV4cG9ydCB7IENvbmZpcm1Cb3hDb25maWdNb2R1bGUgfSBmcm9tICcuL25neC1hd2Vzb21lLXBvcHVwL25neC1hd2Vzb21lLXBvcHVwLm1vZHVsZSc7XG4vKipcbiAqIFRoaXMgaXMgdGhlIG1vZHVsZSB0aGF0IGlnbml0ZXMgVG9hc3Qgbm90aWZpY2F0aW9ucyBkaWFsb2csIGl0cyBwdXJwb3NlIGlzIHRvIHNob3cgdG9hc3QgcG9wdXAgaW4gYVxuICogc21hbGwgZGlhbG9nIHdpbmRvdyBpbiB0aGUgY29ybmVyIG9mIHRoZSBzY3JlZW4uIFVzZXIgY2FuIHByb3ZpZGUgdGl0bGUgYW5kIG1lc3NhZ2UgYW5kIGluY2x1ZGUgYnV0dG9ucywgb3Igc2V0dXAgYXV0byBkaXNhcHBlYXJpbmcuXG4gKiBUb2FzdCBub3RpZmljYXRpb25zIGFyZSBhdmFpbGFibGUgaW4gcHJlZGVmaW5lZCBsYXlvdXQgdHlwZXMgKGVudW1zKToge0BsaW5rIERpYWxvZ0xheW91dERpc3BsYXl9LlxuICpcbiAqIEl0IGlzIGNydWNpYWwgZm9yIHVzZXIgdG8gYWRkIHRoaXMgbW9kdWxlIGluIGFuZ3VsYXIuYXBwIGltcG9ydHMuXG4gKiBCZWxvdyBpcyB0aGUgZXhhbXBsZSB3aXRoIChvcHRpb25hbCkgZGVmYXVsdCB1c2VyIGNvbmZpZ3VyYXRpb24sIHRoYXQncyB3aGF0IHdpbGwgYmUgdXNlZCBpZiB0aGVyZSBpcyBub1xuICogbG9jYWwgY29uZmlnIHdoZW4gcG9wdXAgaXMgZXZva2VkLCB0aGF0IG1lYW5zIGl0IGNhbiBiZSBvdmVycmlkZGVuIGRpcmVjdGx5IHdoZW4gcG9wdXAgaXMgZXZva2VkLlxuICogVGhhdCBtZWFuIGl0J3MgcHJlZGVmaW5lZCBjb25maWcsIHNvIGl0IGRvZXNuJ3QgbmVlZCB0byBiZSBjb25maWd1cmVkIGVhY2ggdGltZSB3aGVuIHRvYXN0IGlzIGV2b2tlZC5cbiAqIEZvciBpbXBsZW1lbnRhdGlvbiBsb29rOiB7QGxpbmsgSVRvYXN0Tm90aWZpY2F0aW9uVXNlckNvbmZpZ30uXG4gKlxuICogRXhhbXBsZTpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIC8vIGFwcC5tb2R1bGUgaW1wb3J0czpcbiAqVG9hc3ROb3RpZmljYXRpb25Db25maWdNb2R1bGUuZm9yUm9vdCh7XG4gKiAgICBUb2FzdENvcmVDb25maWc6IHtcbiAqICAgICAgIC8vIEF1dG9DbG9zZSBpdCB3aWxsIGJlIGlnbm9yZWQgaWYgYnV0dG9ucyBhcmUgaW5jbHVkZWQuXG4gKiAgICAgICBBdXRvQ2xvc2VEZWxheTogMzAwMCAvLyBtaWxsaXNlY29uZHMsIG9wdGlvbmFsIHNldCAwIHRvIG5ldmVyIGV4cGlyZXNcbiAqICAgICAgIFRleHRQb3NpdGlvbjogJ3JpZ2h0JywgLy8gb3B0aW9uYWwgJyBjZW50ZXInLCAnbGVmdCcsICdyaWdodCdcbiAqICAgICAgIExheW91dFR5cGU6IERpYWxvZ0xheW91dERpc3BsYXkuU1VDQ0VTUywgLy8gU1VDQ0VTUyB8IElORk8gfCBOT05FIHwgREFOR0VSIHwgV0FSTklOR1xuICogICAgICAgUHJvZ3Jlc3NCYXI6IFRvYXN0UHJvZ3Jlc3NCYXJFbnVtLklOQ1JFQVNFLCAvLyBJTkNSRUFTRSB8IERFQ1JFQVNFIHwgTk9ORVxuICogICAgICAgVG9hc3RVc2VyVmlld1R5cGU6IFRvYXN0VXNlclZpZXdUeXBlRW51bS5TSU1QTEUsIC8vIFNUQU5EQVJEIHwgU0lNUExFXG4gKiAgICAgICBBbmltYXRpb25JbjogQXBwZWFyYW5jZUFuaW1hdGlvbi5CT1VOQ0VfSU4sIC8vIEJPVU5DRV9JTiB8IFNXSU5HIHwgWk9PTV9JTiB8IFpPT01fSU5fUk9UQVRFIHwgRUxBU1RJQyB8IEpFTExPIHwgRkFERV9JTiB8IFNMSURFX0lOX1VQIHwgU0xJREVfSU5fRE9XTiB8IFNMSURFX0lOX0xFRlQgfCBTTElERV9JTl9SSUdIVCB8IE5PTkVcbiAqICAgICAgIEFuaW1hdGlvbk91dDogRGlzYXBwZWFyYW5jZUFuaW1hdGlvbi5CT1VOQ0VfT1VULCAvLyBCT1VOQ0VfT1VUIHwgWk9PTV9PVVQgfCBaT09NX09VVF9XSU5EIHwgWk9PTV9PVVRfUk9UQVRFIHwgRkxJUF9PVVQgfCBTTElERV9PVVRfVVAgfCBTTElERV9PVVRfRE9XTiB8IFNMSURFX09VVF9MRUZUIHwgU0xJREVfT1VUX1JJR0hUIHwgTk9ORVxuICogICAgICAgVG9hc3RQb3NpdGlvbjogVG9hc3RQb3NpdGlvbkVudW0uVE9QX1JJR0hULCAgLy8gVE9QX0xFRlQgfCBUT1BfQ0VOVEVSIHwgVE9QX1JJR0hUIHwgVE9QX0ZVTExfV0lEVEggfCBCT1RUT01fTEVGVCB8IEJPVFRPTV9DRU5URVIgfCBCT1RUT01fUklHSFQgfCBCT1RUT01fRlVMTF9XSURUSFxuICogICAgICAgQWxsb3dIVE1MTWVzc2FnZTogdHJ1ZSwgIC8vIGRlZmF1bHQgZmFsc2VcbiAqICAgICAgIERpc2FibGVJY29uOiB0cnVlLCAvLyBkZWZhdWx0IGZhbHNlXG4gKiAgICAgICBCdXR0b25Qb3NpdGlvbjogJ3JpZ2h0JywgLyAvIG9wdGlvbmFsICcgY2VudGVyJywgJ2xlZnQnLCAncmlnaHQnXG4gKiAgICB9LFxuICogICAgR2xvYmFsU2V0dGluZ3M6IHtcbiAqICAgICAgIC8vIFRoZSBudW1iZXIgb2YgdG9hc3Qgbm90aWZpY2F0aW9ucyB0aGF0IGNhbiBiZSBzaG93biBhdCBvbmNlLlxuICogICAgICAgQWxsb3dlZE5vdGlmaWNhdGlvbnNBdE9uY2U6IDRcbiAqICAgIH0sXG4gKiAgICAvLyBPcHRpb25hbCBkZWZhdWx0IGRpc3BhdGNoIG9iamVjdC5cbiAqICAgIERpc3BhdGNoOiB7XG4gKiAgICAgIFRpdGxlOiAnRGVmYXVsdCB0aXRsZScsXG4gKiAgICAgIE1lc3NhZ2U6ICdEZWZhdWx0IG1lc3NhZ2UnXG4gKiAgIH0sXG4gKiAgIC8vIG9wdGlvbmFsIHByZWRlZmluZWQgY3VzdG9tIGRlZmF1bHQgYnV0dG9uc1xuICogICBCdXR0b25zOiBbXG4gKiAgICAgIG5ldyBCdXR0b25NYWtlcignT2snLCAnb2snLCBCdXR0b25MYXlvdXREaXNwbGF5LlBSSU1BUlkpLFxuICogICAgICBuZXcgQnV0dG9uTWFrZXIoJ0NhbmNlbCcsICdjYW5jZWwnLCBCdXR0b25MYXlvdXREaXNwbGF5LlNFQ09OREFSWSlcbiAqICAgXVxuICp9KVxuICogYGBgXG4gKiAqIFRvYXN0Q29yZUNvbmZpZzoge0BsaW5rIElUb2FzdENvcmVDb25maWd9XG4gKiAqIEdsb2JhbFNldHRpbmdzOiB7QGxpbmsgSUdsb2JhbFRvYXN0U2V0dGluZ3N9XG4gKiAqIERpc3BhdGNoOiB7QGxpbmsgSURpc3BhdGNofVxuICogKiBCdXR0b25zOiB7QGxpbmsgSUJ1dHRvbn1cbiAqICogQnV0dG9uTWFrZXI6IHtAbGluayBCdXR0b25NYWtlcn1cbiAqIEBjYXRlZ29yeSBJbXBvcnRzIGZvciBhbmd1bGFyIGFwcC5tb2R1bGVcbiAqL1xuZXhwb3J0IHsgVG9hc3ROb3RpZmljYXRpb25Db25maWdNb2R1bGUgfSBmcm9tICcuL25neC1hd2Vzb21lLXBvcHVwL25neC1hd2Vzb21lLXBvcHVwLm1vZHVsZSc7XG4vLyBlbmRyZWdpb25cbiJdfQ==