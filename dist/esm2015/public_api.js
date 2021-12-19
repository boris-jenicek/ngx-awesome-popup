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
 *
 * ## Choose between many appearing animations that are available
 */
export { AppearanceAnimation } from './ngx-awesome-popup/core/enums';
/**
 *
 * ## Choose between many disappearing animations that are available
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
 *      // LoaderComponent: Any Angular component,
 *      // CustomStyles: {
 *      //     ButtonSectionCSS: 'background: #333',
 *      //     ButtonCSS: 'font-size: 30px;',
 *      //     WrapperCSS: 'background: #333;'
 *      //   }
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
 *        CustomStyles: {
 *          ButtonSectionCSS: 'background: #333',
 *          ButtonCSS: 'font-size: 30px;',
 *          WrapperCSS: 'background: #333;'
 *        }
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
 *       CustomStyles: {
 *           TitleCSS: 'color: #ddd; background: #333; font-size: 20px; padding: 20px',
 *           ButtonSectionCSS: 'background: #333',
 *           ButtonCSS: 'font-size: 14px;',
 *           TextCSS: 'color: #ddd; font-size: 16px; background: #333;',
 *           WrapperCSS: 'background: #333;'
 *       }
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
 *       AutoCloseDelay: 3000, // milliseconds, optional set 0 to never expires
 *       TextPosition: 'right', // optional ' center', 'left', 'right'
 *       LayoutType: DialogLayoutDisplay.SUCCESS, // SUCCESS | INFO | NONE | DANGER | WARNING
 *       ProgressBar: ToastProgressBarEnum.INCREASE, // INCREASE | DECREASE | NONE
 *       ToastUserViewType: ToastUserViewTypeEnum.SIMPLE, // STANDARD | SIMPLE
 *       AnimationIn: AppearanceAnimation.BOUNCE_IN, // BOUNCE_IN | SWING | ZOOM_IN | ZOOM_IN_ROTATE | ELASTIC | JELLO | FADE_IN | SLIDE_IN_UP | SLIDE_IN_DOWN | SLIDE_IN_LEFT | SLIDE_IN_RIGHT | NONE
 *       AnimationOut: DisappearanceAnimation.BOUNCE_OUT, // BOUNCE_OUT | ZOOM_OUT | ZOOM_OUT_WIND | ZOOM_OUT_ROTATE | FLIP_OUT | SLIDE_OUT_UP | SLIDE_OUT_DOWN | SLIDE_OUT_LEFT | SLIDE_OUT_RIGHT | NONE
 *       ToastPosition: ToastPositionEnum.TOP_RIGHT,  // TOP_LEFT | TOP_CENTER | TOP_RIGHT | TOP_FULL_WIDTH | BOTTOM_LEFT | BOTTOM_CENTER | BOTTOM_RIGHT | BOTTOM_FULL_WIDTH
 *       AllowHTMLMessage: true,  // default false
 *       DisableIcon: true, // default false
 *       ButtonPosition: 'right', // optional ' center', 'left', 'right'
 *       CustomStyles: {
 *           TitleCSS: 'background: rgba(0,0,0, .7); font-size: 20px; padding: 20px',
 *           ButtonSectionCSS: 'background: #333',
 *           ButtonCSS: 'font-size: 14px;',
 *           TextCSS: 'color: #ddd; font-size: 16px; background: #333;'
 *         }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljX2FwaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3B1YmxpY19hcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFNM0YsT0FBTyxFQUFFLGVBQWUsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBT25HLE9BQU8sRUFDTCx3QkFBd0IsRUFDeEIsNEJBQTRCLEVBQzdCLE1BQU0sMkRBQTJELENBQUM7QUEyQm5FLFlBQVk7QUFFWixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUVyRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx5REFBeUQsQ0FBQztBQUM1RixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx5REFBeUQsQ0FBQztBQUMvRixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5REFBeUQsQ0FBQztBQUNoRzs7O0dBR0c7QUFDSCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNyRTs7O0dBR0c7QUFDSCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN4RTs7R0FFRztBQUNILE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUV0RTs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFDSCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUU1RTs7Ozs7Ozs7R0FRRztBQUNILE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxDQUFDO0FBRXBDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtERztBQUNILE9BQU8sRUFBRSxlQUFlLEVBQUUsQ0FBQztBQXFCM0IsWUFBWTtBQUVaLDZCQUE2QjtBQUU3Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtDRztBQUNILE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxDQUFDO0FBQ3hDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1DRztBQUNILE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxDQUFDO0FBQ2pDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0REc7QUFDSCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQztBQUM3QixZQUFZO0FBRVosZ0RBQWdEO0FBQ2hEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFDSCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUNyRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbURHO0FBQ0gsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDbEY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWdERztBQUNILE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ3RGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5REc7QUFDSCxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUM3RixZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUJ1dHRvbiwgSUNvbG9yVHlwZXMsIElEaXNwYXRjaCwgSUdsb2JhbFVzZXJDb25maWcgfSBmcm9tICcuL25neC1hd2Vzb21lLXBvcHVwL2NvcmUvZ2xvYmFsLWludGVyZmFjZXMnO1xuaW1wb3J0IHsgQ29uZmlybUJveEluaXRpYWxpemVyIH0gZnJvbSAnLi9uZ3gtYXdlc29tZS1wb3B1cC90eXBlcy9jb25maXJtLWJveC9jb3JlL2NsYXNzZXMnO1xuaW1wb3J0IHtcbiAgSUNvbmZpcm1Cb3hDb3JlQ29uZmlnLFxuICBJQ29uZmlybUJveFB1YmxpY1Jlc3BvbnNlLFxuICBJQ29uZmlybUJveFVzZXJDb25maWdcbn0gZnJvbSAnLi9uZ3gtYXdlc29tZS1wb3B1cC90eXBlcy9jb25maXJtLWJveC9jb3JlL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgRGlhbG9nQmVsb25naW5nLCBEaWFsb2dJbml0aWFsaXplciB9IGZyb20gJy4vbmd4LWF3ZXNvbWUtcG9wdXAvdHlwZXMvZGlhbG9nL2NvcmUvY2xhc3Nlcyc7XG5pbXBvcnQge1xuICBJRGlhbG9nQ29yZUNvbmZpZyxcbiAgSURpYWxvZ0V2ZW50c0NvbnRyb2xsZXIsXG4gIElEaWFsb2dQdWJsaWNSZXNwb25zZSxcbiAgSURpYWxvZ1VzZXJDb25maWdcbn0gZnJvbSAnLi9uZ3gtYXdlc29tZS1wb3B1cC90eXBlcy9kaWFsb2cvY29yZS9pbnRlcmZhY2VzJztcbmltcG9ydCB7XG4gIFJlc2V0VG9hc3RHbG9iYWxTZXR0aW5ncyxcbiAgVG9hc3ROb3RpZmljYXRpb25Jbml0aWFsaXplclxufSBmcm9tICcuL25neC1hd2Vzb21lLXBvcHVwL3R5cGVzL3RvYXN0LW5vdGlmaWNhdGlvbi9jb3JlL2NsYXNzZXMnO1xuaW1wb3J0IHtcbiAgSUdsb2JhbFRvYXN0U2V0dGluZ3MsXG4gIElUb2FzdENvcmVDb25maWcsXG4gIElUb2FzdE5vdGlmaWNhdGlvblB1YmxpY1Jlc3BvbnNlLFxuICBJVG9hc3ROb3RpZmljYXRpb25Vc2VyQ29uZmlnXG59IGZyb20gJy4vbmd4LWF3ZXNvbWUtcG9wdXAvdHlwZXMvdG9hc3Qtbm90aWZpY2F0aW9uL2NvcmUvaW50ZXJmYWNlcyc7XG5cbi8vIHJlZ2lvbiAqKiogSW50ZXJmYWNlICoqKlxuZXhwb3J0IHsgSUdsb2JhbFVzZXJDb25maWcgfTtcbmV4cG9ydCB7IElCdXR0b24gfTtcbmV4cG9ydCB7IElEaXNwYXRjaCB9O1xuZXhwb3J0IHsgSUNvbG9yVHlwZXMgfTtcblxuZXhwb3J0IHsgSUNvbmZpcm1Cb3hVc2VyQ29uZmlnIH07XG5leHBvcnQgeyBJQ29uZmlybUJveENvcmVDb25maWcgfTtcbmV4cG9ydCB7IElDb25maXJtQm94UHVibGljUmVzcG9uc2UgfTtcblxuZXhwb3J0IHsgSUdsb2JhbFRvYXN0U2V0dGluZ3MgfTtcbmV4cG9ydCB7IElUb2FzdENvcmVDb25maWcgfTtcbmV4cG9ydCB7IElUb2FzdE5vdGlmaWNhdGlvblVzZXJDb25maWcgfTtcbmV4cG9ydCB7IElUb2FzdE5vdGlmaWNhdGlvblB1YmxpY1Jlc3BvbnNlIH07XG5cbmV4cG9ydCB7IElEaWFsb2dVc2VyQ29uZmlnIH07XG5leHBvcnQgeyBJRGlhbG9nQ29yZUNvbmZpZyB9O1xuZXhwb3J0IHsgSURpYWxvZ1B1YmxpY1Jlc3BvbnNlIH07XG5leHBvcnQgeyBJRGlhbG9nRXZlbnRzQ29udHJvbGxlciB9O1xuLy8gZW5kcmVnaW9uXG5cbmV4cG9ydCB7IEJ1dHRvbkxheW91dERpc3BsYXkgfSBmcm9tICcuL25neC1hd2Vzb21lLXBvcHVwL2NvcmUvZW51bXMnO1xuZXhwb3J0IHsgRGlhbG9nTGF5b3V0RGlzcGxheSB9IGZyb20gJy4vbmd4LWF3ZXNvbWUtcG9wdXAvY29yZS9lbnVtcyc7XG5leHBvcnQgeyBWZXJ0aWNhbFBvc2l0aW9uIH0gZnJvbSAnLi9uZ3gtYXdlc29tZS1wb3B1cC9jb3JlL2VudW1zJztcbmV4cG9ydCB7IFRvYXN0UG9zaXRpb25FbnVtIH0gZnJvbSAnLi9uZ3gtYXdlc29tZS1wb3B1cC90eXBlcy90b2FzdC1ub3RpZmljYXRpb24vY29yZS9lbnVtcyc7XG5leHBvcnQgeyBUb2FzdFByb2dyZXNzQmFyRW51bSB9IGZyb20gJy4vbmd4LWF3ZXNvbWUtcG9wdXAvdHlwZXMvdG9hc3Qtbm90aWZpY2F0aW9uL2NvcmUvZW51bXMnO1xuZXhwb3J0IHsgVG9hc3RVc2VyVmlld1R5cGVFbnVtIH0gZnJvbSAnLi9uZ3gtYXdlc29tZS1wb3B1cC90eXBlcy90b2FzdC1ub3RpZmljYXRpb24vY29yZS9lbnVtcyc7XG4vKipcbiAqXG4gKiAjIyBDaG9vc2UgYmV0d2VlbiBtYW55IGFwcGVhcmluZyBhbmltYXRpb25zIHRoYXQgYXJlIGF2YWlsYWJsZVxuICovXG5leHBvcnQgeyBBcHBlYXJhbmNlQW5pbWF0aW9uIH0gZnJvbSAnLi9uZ3gtYXdlc29tZS1wb3B1cC9jb3JlL2VudW1zJztcbi8qKlxuICpcbiAqICMjIENob29zZSBiZXR3ZWVuIG1hbnkgZGlzYXBwZWFyaW5nIGFuaW1hdGlvbnMgdGhhdCBhcmUgYXZhaWxhYmxlXG4gKi9cbmV4cG9ydCB7IERpc2FwcGVhcmFuY2VBbmltYXRpb24gfSBmcm9tICcuL25neC1hd2Vzb21lLXBvcHVwL2NvcmUvZW51bXMnO1xuLyoqXG4gKiBAcmV0dXJucyBJdCB3aWxsIHJldHVybiBjdXN0b20gYnV0dG9uIG9iamVjdCByZWFkeSB0byBiZSB1c2VkIGluIGNoaWxkIGNvbXBvbmVudCBsYXlvdXQuXG4gKi9cbmV4cG9ydCB7IEJ1dHRvbk1ha2VyIH0gZnJvbSAnLi9uZ3gtYXdlc29tZS1wb3B1cC9jb3JlL2dsb2JhbC1jbGFzc2VzJztcblxuLyoqXG4gKmBgYHR5cGVzY3JpcHRcbiAqIC8vIEluc3RhbnRpYXRlIGNvbmZpZyBvYmplY3QgYXMgZXhhbXBsZSBiZWxvdyB0byBjaGFuZ2UgZ2xvYmFsIHNldHRpbmdzIG9uLWZseSBpdCB0YWtlcyBJR2xvYmFsVXNlckNvbmZpZ1xuICogYXMgdGhlIGFyZ3VtZW50LlxuICogbmV3IFJlc2V0R2xvYmFsQ29uZmlnKHtcbiAqICAgICBDb2xvckxpc3Q6IHtcbiAqICAgICAgICAgICAgUHJpbWFyeSAgOiAnI2ZmOWUwMCcsIC8vIG9wdGlvbmFsIHNoYWRlIG9mIHRoZSBvdmVybGF5IGNvbG9yXG4gKiAgICAgICAgICAgIFNlY29uZGFyeTogJyM5ODllYTUnLCAvLyBvcHRpb25hbFxuICogICAgICAgICAgICBJbmZvICAgICA6ICcjMmY4ZWU1JywgLy8gb3B0aW9uYWxcbiAqICAgICAgICAgICAgU3VjY2VzcyAgOiAnIzNjYWVhMycsIC8vIG9wdGlvbmFsXG4gKiAgICAgICAgICAgIFdhcm5pbmcgIDogJyNmZmMxMDcnLCAvLyBvcHRpb25hbFxuICogICAgICAgICAgICBEYW5nZXIgICA6ICcjZTQ2NDY0JywgLy8gb3B0aW9uYWxcbiAqICAgICAgICAgICAgTGlnaHQgICAgOiAnI2ZiZmJmYicsIC8vIG9wdGlvbmFsXG4gKiAgICAgICAgICAgIERhcmsgICAgIDogJyMzNDNhNDAnICAvLyBvcHRpb25hbFxuICogICAgICAgICAgIH1cbiAqIH0pXG4gKiBgYGBcbiAqL1xuZXhwb3J0IHsgUmVzZXRHbG9iYWxDb25maWcgfSBmcm9tICcuL25neC1hd2Vzb21lLXBvcHVwL2NvcmUvZ2xvYmFsLWNsYXNzZXMnO1xuXG4vKipcbiAqYGBgdHlwZXNjcmlwdFxuICogLy8gSW5zdGFudGlhdGUgdG9hc3QgZ2xvYmFsIGNvbmZpZyBvYmplY3QgYXMgZXhhbXBsZSBiZWxvdyB0byBjaGFuZ2UgZ2xvYmFsIHNldHRpbmdzIG9uLWZseSBpdCB0YWtlcyBJR2xvYmFsVG9hc3RTZXR0aW5nc1xuICogYXMgdGhlIGFyZ3VtZW50LlxuICogbmV3IFJlc2V0VG9hc3RHbG9iYWxTZXR0aW5ncyh7XG4gKiAgICAgQWxsb3dlZE5vdGlmaWNhdGlvbnNBdE9uY2U6IDJcbiAqIH0pXG4gKiBgYGBcbiAqL1xuZXhwb3J0IHsgUmVzZXRUb2FzdEdsb2JhbFNldHRpbmdzIH07XG5cbi8qKlxuICogVGhpcyBpcyB0aGUgY2xhc3MgdGhhdCBuZWVkcyB0byBiZSBhZGRlZCBhcyBESSBpbiB0aGUgY29uc3RydWN0b3Igb2YgYSBjaGlsZCBjb21wb25lbnQgdGhhdCB3aWxsIGJlXG4gKiBvcGVuZWQgZHluYW1pY2FsbHkgd2l0aCB7QGxpbmsgRGlhbG9nSW5pdGlhbGl6ZXJ9LiBJdCBjb250YWlucyB2YXJpb3VzIGluZm9ybWF0aW9uIG9yXG4gKiBldmVudCBjb250cm9sbGVycywgYW5kIGxpc3RlbmVycyB0aGF0IGNhbiBiZSB1c2VkIGluIGEgY2hpbGQgY29tcG9uZW50LiBBbHNvLCB0aGVyZSBpcyBjdXN0b20gZGF0YVxuICogdGhhdCBpcyBzZW50IGZyb20gY29tcG9uZW50IHdoZXJlIHRoZSB7QGxpbmsgRGlhbG9nSW5pdGlhbGl6ZXJ9IGlzLiBVc2VyIGNhbiBzZXQgc3BlY2lmaWMgdHlwZSBvZlxuICogY3VzdG9tIGRhdGEgdGhhdCBjaGlsZCBjb21wb25lbnQgd2lsbCByZWNlaXZlIGJ5IGluY2x1ZGluZyBpdCBhcyBnZW5lcmljIHR5cGUuXG4gKlxuICpcbiAqIEV4YW1wbGU6XG4gKiBgYGB0eXBlc2NyaXB0XG4gKmltcG9ydCB7RGlhbG9nQmVsb25naW5nfSBmcm9tICduZ3gtYXdlc29tZS1wb3B1cCc7XG4gKkBDb21wb25lbnQoe1xuICogICAgc2VsZWN0b3IgICA6ICdhcHAtZHluYW1pYycsXG4gKiAgICB0ZW1wbGF0ZVVybDogJy4vZHluYW1pYy5jb21wb25lbnQuaHRtbCcsXG4gKiAgICBzdHlsZVVybHMgIDogWycuL2R5bmFtaWMuY29tcG9uZW50LnNjc3MnXVxuICp9KVxuICogZXhwb3J0IGNsYXNzIER5bmFtaWNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gKlxuICogICAgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICpcbiAqICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoJ2RpYWxvZ0JlbG9uZ2luZycpIHByaXZhdGUgZGlhbG9nQmVsb25naW5nOiBEaWFsb2dCZWxvbmdpbmcpIHt9XG4gKlxuICogICAgbmdPbkluaXQoKTogdm9pZCB7XG4gKiAgICBjb25zb2xlLmxvZyh0aGlzLmRpYWxvZ0JlbG9uZ2luZyk7XG4gKlxuICogICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gKiAgICAgICAgICAgIHRoaXMuZGlhbG9nQmVsb25naW5nLkV2ZW50c0NvbnRyb2xsZXIub25CdXR0b25DbGljayQuc3Vic2NyaWJlKChfQnV0dG9uKSA9PiB7XG4gKiAgICAgICAgICAgIGlmIChfQnV0dG9uLklEID09PSAnb2snKSB7XG4gKiAgICAgICAgICAgICAgICAvLyBEbyBzb21lIGxvZ2ljIGFuZCBjbG9zZSBwb3B1cC5cbiAqICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9nQmVsb25naW5nLkV2ZW50c0NvbnRyb2xsZXIuY2xvc2UoKTtcbiAqICAgICAgICAgICAgfSBlbHNlIGlmIChfQnV0dG9uLklEID09PSAnY2FuY2VsJykge1xuICogICAgICAgICAgICAgICAgLy8gRG8gc29tZSBsb2dpYyBhbmQgY2xvc2UgcG9wdXAuXG4gKiAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ0JlbG9uZ2luZy5FdmVudHNDb250cm9sbGVyLmNsb3NlKCk7XG4gKiAgICAgICAgICAgIH1cbiAqICAgICAgICB9KVxuICogICAgICAgICk7XG4gKlxuICogICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICogICAgICAgICAgICAvLyBDbG9zZSBsb2FkZXIgYWZ0ZXIgYXN5bmMgZGF0YSBpcyByZWFkeS5cbiAqICAgICAgICAgICAgdGhpcy5kaWFsb2dCZWxvbmdpbmcuRXZlbnRzQ29udHJvbGxlci5jbG9zZUxvYWRlcigpO1xuICogICAgICAgIH0sIDEwMDApO1xuICogICAgfVxuICp9XG5cbiBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgLy8gQ2xvc2UgYWxsIHN1YnNjcmlwdGlvbnMuXG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAqIGBgYFxuICogQGNhdGVnb3J5IGNoaWxkIGR5bmFtaWMgY29tcG9uZW50IGRhdGEgJiBldmVudCBjb250cm9sbGVyXG4gKi9cbmV4cG9ydCB7IERpYWxvZ0JlbG9uZ2luZyB9O1xuXG4vLyByZWdpb24gKioqIE9ic2VydmFibGUgcmVzcG9uc2UgYWZ0ZXIgY2xvc2luZyBwb3B1cCAqKipcbi8qKlxuICogUmVndWxhciBkZXNjcmlwdGlvblxuICpcbiAqIEBjYXRlZ29yeSBPYnNlcnZhYmxlIHJlc3BvbnNlIGFmdGVyIGNsb3NpbmcgcG9wdXBcbiAqL1xuZXhwb3J0IHsgSVRvYXN0Tm90aWZpY2F0aW9uUHVibGljUmVzcG9uc2UgYXMgSVRvYXN0Tm90aWZpY2F0aW9uUmVzcG9uc2UgfTtcbi8qKlxuICogUmVndWxhciBkZXNjcmlwdGlvblxuICpcbiAqIEBjYXRlZ29yeSBPYnNlcnZhYmxlIHJlc3BvbnNlIGFmdGVyIGNsb3NpbmcgcG9wdXBcbiAqL1xuZXhwb3J0IHsgSUNvbmZpcm1Cb3hQdWJsaWNSZXNwb25zZSBhcyBJQ29uZmlybUJveFJlc3BvbnNlIH07XG4vKipcbiAqIFJlZ3VsYXIgZGVzY3JpcHRpb25cbiAqXG4gKiBAY2F0ZWdvcnkgT2JzZXJ2YWJsZSByZXNwb25zZSBhZnRlciBjbG9zaW5nIHBvcHVwXG4gKi9cbmV4cG9ydCB7IElEaWFsb2dQdWJsaWNSZXNwb25zZSBhcyBJRGlhbG9nUmVzcG9uc2UgfTtcbi8vIGVuZHJlZ2lvblxuXG4vLyByZWdpb24gKioqIFBvcHVwIG9wZW4gICoqKlxuXG4vKipcbiAqIFRoaXMgaXMgdGhlIGNsYXNzIHRoYXQgbmVlZHMgdG8gYmUgaW5zdGFudGlhdGVkIHRvIHNldCB1cCBhbmQgaWduaXRlIGEgVG9hc3ROb3RpZmljYXRpb24sXG4gKiBpdHMgcHVycG9zZSBpcyB0byBzaG93IHNob3J0IG5vdGlmaWNhdGlvbiB0byBlbmQtdXNlciwgb3IgZXZlbiBpbnRlcmFjdCB3aXRoIHVzZXIuXG4gKiBJdCBjYW4gYmUgZXZva2VkIGZyb20gYW55IGFuZ3VsYXIgdHlwZXNjcmlwdCBmaWxlLlxuICpcbiAqIEJlbG93IGlzIHRoZSBleGFtcGxlIHdpdGggKHNvbWUgb3B0aW9uYWwpIHVzZXIgY29uZmlndXJhdGlvbixcbiAqIGl0IHdpbGwgb3ZlcnJpZGUgZGVmYXVsdCBjb25maWd1cmF0aW9uIGZyb20gYXBwLm1vZHVsZS5cbiAqXG4gKlxuICogRXhhbXBsZTpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIC8vIENyZWF0ZSB0aGUgaW5pdGlhbGl6ZXIuXG4gKmNvbnN0IG5ld1RvYXN0Tm90aWZpY2F0aW9uID0gbmV3IFRvYXN0Tm90aWZpY2F0aW9uSW5pdGlhbGl6ZXIoKTtcbiAqXG4gKiAvLyBTZXQgZGVzaXJlZCBUaXRsZS5cbiAqbmV3VG9hc3ROb3RpZmljYXRpb24uc2V0VGl0bGUoJ1dhcm5pbmchJyk7XG4gKlxuICogLy8gU2V0IGRlc2lyZWQgTWVzc2FnZS5cbiAqbmV3VG9hc3ROb3RpZmljYXRpb24uc2V0TWVzc2FnZSgnRm9ybSBpcyBub3QgdmFsaWQhJyk7XG4gKlxuICogLy8gU2V0IGRlc2lyZWQgY29uZmlndXJhdGlvbi5cbiAqbmV3VG9hc3ROb3RpZmljYXRpb24uc2V0Q29uZmlnKHtcbiAqICAgICAgTGF5b3V0VHlwZTogRGlhbG9nTGF5b3V0RGlzcGxheS5XQVJOSU5HXG4gKiAgIH0pO1xuXG4gKiAvLyBPcGVuIGEgVG9hc3ROb3RpZmljYXRpb24uXG4gKiBuZXdDb25maXJtQm94Lm9wZW5Db25maXJtQm94JCgpLnN1YnNjcmliZShyZXNwID0+IHtcbiAqICAgY29uc29sZS5sb2coJ2NvbmZpcm1Cb3ggcmVzcG9uc2U6ICcsIHJlc3ApO1xuICogIH0pO1xuICogYGBgXG4gKiAqIElUb2FzdENvcmVDb25maWc6IHtAbGluayBJVG9hc3RDb3JlQ29uZmlnfVxuICogKiBMYXlvdXRUeXBlOiB7QGxpbmsgRGlhbG9nTGF5b3V0RGlzcGxheX1cbiAqICogSVRvYXN0Tm90aWZpY2F0aW9uUHVibGljUmVzcG9uc2U6IHtAbGluayBJVG9hc3ROb3RpZmljYXRpb25QdWJsaWNSZXNwb25zZX1cbiAqIEBjYXRlZ29yeSBQb3B1cCBvcGVuXG4gKi9cbmV4cG9ydCB7IFRvYXN0Tm90aWZpY2F0aW9uSW5pdGlhbGl6ZXIgfTtcbi8qKlxuICogVGhpcyBpcyB0aGUgY2xhc3MgdGhhdCBuZWVkcyB0byBiZSBpbnN0YW50aWF0ZWQgdG8gc2V0IHVwIGFuZCBpZ25pdGUgYSBDb25maXJtQm94IGFuZCBjcmVhdGUgY29udGVudC5cbiAqIEl0cyBwdXJwb3NlIGlzIHRvIGdldCBjb25maXJtYXRpb24gcmVzcG9uc2UgZnJvbSBlbmQtdXNlci4gSXQgY2FuIGJlIGNhbGxlZCBmcm9tIGFueSBhbmd1bGFyXG4gKiB0eXBlc2NyaXB0IGZpbGUuXG4gKlxuICogQmVsb3cgaXMgZXhhbXBsZSB3aXRoIChzb21lIG9wdGlvbmFsKSB1c2VyIGNvbmZpZ3VyYXRpb24sXG4gKiBpdCB3aWxsIG92ZXJyaWRlIGRlZmF1bHQgY29uZmlndXJhdGlvbiBmcm9tIGFwcC5tb2R1bGUuXG4gKlxuICpcbiAqIEV4YW1wbGU6XG4gKiBgYGB0eXBlc2NyaXB0XG4gKiAvLyBDcmVhdGUgdGhlIGluaXRpYWxpemVyLlxuICpjb25zdCBuZXdDb25maXJtQm94ID0gbmV3IENvbmZpcm1Cb3hJbml0aWFsaXplcigpO1xuICpcbiAqIC8vIFNldCBkZXNpcmVkIGRpc3BhdGNoOiBfVGl0bGU6IHN0cmluZywgX01lc3NhZ2U6IHN0cmluZy5cbiAqbmV3Q29uZmlybUJveC5zZXREaXNwYXRjaCgnQXJlIHlvdSBzdXJlPycsICdUaGF0IGFjdGlvbiB3aWxsIGRlbGV0ZSB1c2VyIScpO1xuICpcbiAqIC8vIFNldCBkZXNpcmVkIGNvbmZpZ3VyYXRpb24uXG4gKm5ld0NvbmZpcm1Cb3guc2V0Q29uZmlnKHtcbiAqICAgICAgTGF5b3V0VHlwZTogRGlhbG9nTGF5b3V0RGlzcGxheS5EQU5HRVJcbiAqICAgfSk7XG4gKlxuICogLy8gU2V0IGJ1dHRvbiBsYWJlbHMuXG4gKiBuZXdDb25maXJtQm94LnNldEJ1dHRvbkxhYmVscygnWUVTJywgJ05PJyk7XG4gKlxuICogLy8gT3BlbiBhIENvbmZpcm1Cb3gsIGFuZCBnZXQgY2xpY2tlZCBidXR0b24taWQgaW4gcmVzcG9uc2UuXG4gKiBuZXdDb25maXJtQm94Lm9wZW5Db25maXJtQm94JCgpLnN1YnNjcmliZShyZXNwID0+IHtcbiAqICAgLy8gSUNvbmZpcm1Cb3hQdWJsaWNSZXNwb25zZVxuICogICBjb25zb2xlLmxvZygnY29uZmlybUJveCByZXNwb25zZTogJywgcmVzcCk7XG4gKiAgfSk7XG4gKiBgYGBcbiAqICogSUNvbmZpcm1Cb3hDb3JlQ29uZmlnOiB7QGxpbmsgSUNvbmZpcm1Cb3hDb3JlQ29uZmlnfVxuICogKiBMYXlvdXRUeXBlOiB7QGxpbmsgRGlhbG9nTGF5b3V0RGlzcGxheX1cbiAqICogSUNvbmZpcm1Cb3hQdWJsaWNSZXNwb25zZToge0BsaW5rIElDb25maXJtQm94UHVibGljUmVzcG9uc2V9XG4gKiBAY2F0ZWdvcnkgUG9wdXAgb3BlblxuICovXG5leHBvcnQgeyBDb25maXJtQm94SW5pdGlhbGl6ZXIgfTtcbi8qKlxuICogVGhpcyBpcyB0aGUgY2xhc3MgdGhhdCBuZWVkcyB0byBiZSBpbnN0YW50aWF0ZWQgdG8gc2V0IHVwIGFuZCBpZ25pdGUgYSBEaWFsb2cgYW5kIGNyZWF0ZSBkeW5hbWljIGNvbXBvbmVudCxcbiAqIGl0cyBwdXJwb3NlIGlzIHRvIHJlbmRlciBhbnkgYW5ndWxhciBjb21wb25lbnQgdmlldyB3aXRoIHNwZWNpZmljIGNvbmZpZ3VyYXRpb24gZnJvbSBhbnkgYW5ndWxhciB0eXBlc2NyaXB0IGZpbGUuXG4gKiBEeW5hbWljIGNvbXBvbmVudCBtZWFucyB0aGF0IHVzZXIgY2FuIGV2b2tlIHRoZSBwb3B1cCBmcm9tIHR5cGVzY3JpcHQgYW5kIGNvbXBvbmVudCB2aWV3XG4gKiBpcyBkeW5hbWljYWxseSBjcmVhdGVkIHdpdGggdGhlIEF3ZXNvbWUgUG9wdXAgZW5naW5lLiBUaGVyZSBpcyBubyBuZWVkIHRvIGNhbGwgYW55IHNlbGVjdG9yIGluIEhUTUwgdG8gY3JlYXRlIGNvbXBvbmVudCB2aWV3LlxuICpcbiAqIERpYWxvZ0luaXRpYWxpemVyIGNhbiBzZW5kIGRhdGEgdG8gY2hpbGQgY29tcG9uZW50IChkeW5hbWljIGNvbXBvbmVudCkgd2hlcmUgZGF0YSB3aWxsIGJlIGFjY2Vzc2libGUgd2l0aCB7QGxpbmsgRGlhbG9nQmVsb25naW5nfS5cbiAqXG4gKiBCZWxvdyBpcyB0aGUgZXhhbXBsZSB3aXRoIChzb21lIG9wdGlvbmFsKSB1c2VyIGNvbmZpZ3VyYXRpb24sXG4gKiBpdCB3aWxsIG92ZXJyaWRlIGRlZmF1bHQgY29uZmlndXJhdGlvbiBmcm9tIGFwcC5tb2R1bGUuXG4gKlxuICpcbiAqIEV4YW1wbGU6XG4gKiBgYGB0eXBlc2NyaXB0XG4gKiAgaW1wb3J0IHtEaWFsb2dJbml0aWFsaXplciwgRGlhbG9nTGF5b3V0RGlzcGxheSwgQnV0dG9uTWFrZXIsIEJ1dHRvbkxheW91dERpc3BsYXl9IGZyb20gJ25neC1hd2Vzb21lLXBvcHVwJzs8XG4gKiAgaW1wb3J0IHtEeW5hbWljQ29tcG9uZW50fSBmcm9tICcuL2R5bmFtaWMvZHluYW1pYy5jb21wb25lbnQnO1xuICpcbiAqICBjb25zdCBuZXdEaWFsb2dQb3B1cCA9IG5ldyBEaWFsb2dJbml0aWFsaXplcihEeW5hbWljQ29tcG9uZW50KTsgLy8gQW55IEFuZ3VsYXIgY29tcG9uZW50LlxuICpcbiAqICAvLyBDdXN0b20gZGF0YSB3aWxsIGJlIHNlbnQgdG8gZHluYW1pYyBjb21wb25lbnQgYXZhaWxhYmxlIGluIGRpYWxvZ0JlbG9uZ2luZyBvYmplY3QuXG4gKiAgbmV3RGlhbG9nUG9wdXAuc2V0Q3VzdG9tRGF0YSh7bmFtZTogJ0pvaG4nLCBzdXJuYW1lOiAnRG9lJywgaWQ6IDF9KTtcbiAqXG4gKiAgLy8gTG9jYWwgY29uZmlnIHNldHRpbmdzIElEaWFsb2dDb3JlQ29uZmlnLlxuICogIG5ld0RpYWxvZ1BvcHVwLnNldENvbmZpZyh7XG4gKiAgICAgIExheW91dFR5cGU6IERpYWxvZ0xheW91dERpc3BsYXkuSU5GTywgLy8gU1VDQ0VTUyB8IElORk8gfCBOT05FIHwgREFOR0VSIHwgV0FSTklOR1xuICogICAgICBIZWlnaHQ6ICc1MDBweCcsICAvLyBvcHRpb25hbFxuICogICAgICAvLyBNYXhIZWlnaHQ6ICc2MDBweCcsICAvLyBvcHRpb25hbFxuICogICAgICAvLyBNaW5IZWlnaHQ6ICcyMDBweCcsICAvLyBvcHRpb25hbFxuICogICAgICAvLyBXaWR0aDogJzUwMHB4JywgLy8gb3B0aW9uYWxcbiAqICAgICAgLy8gTWF4V2lkdGg6ICc2MDBweCcsIC8vIG9wdGlvbmFsXG4gKiAgICAgIC8vIE1pbldpZHRoOiAnMjAwcHgnLCAvLyBvcHRpb25hbFxuICogICAgICAvLyBIaWRlU2Nyb2xsYmFyOiB0cnVlLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxuICogICAgICAvLyBGdWxsU2NyZWVuOiB0cnVlLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxuICogICAgICAvLyBFc2NhcGVLZXlDbG9zZTogdHJ1ZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgZmFsc2VcbiAqICAgICAgLy8gQnV0dG9uUG9zaXRpb246IFwibGVmdFwiLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBcInJpZ2h0XCJcbiAqICAgICAgLy8gTG9hZGVyQ29tcG9uZW50OiBBbnkgQW5ndWxhciBjb21wb25lbnQsXG4gKiAgICAgIC8vIEN1c3RvbVN0eWxlczoge1xuICogICAgICAvLyAgICAgQnV0dG9uU2VjdGlvbkNTUzogJ2JhY2tncm91bmQ6ICMzMzMnLFxuICogICAgICAvLyAgICAgQnV0dG9uQ1NTOiAnZm9udC1zaXplOiAzMHB4OycsXG4gKiAgICAgIC8vICAgICBXcmFwcGVyQ1NTOiAnYmFja2dyb3VuZDogIzMzMzsnXG4gKiAgICAgIC8vICAgfVxuICogICB9KTtcbiAqXG4gKiAgLy8gQ3VzdG9tIGJ1dHRvbnMsIGxpc3RlbmVyIGlzIGF2YWlsYWJsZSBpbiBjaGlsZCBjb21wb25lbnQgaW4gZGlhbG9nQmVsb25naW5nIG9iamVjdC5cbiAqICBuZXdEaWFsb2dQb3B1cC5zZXRCdXR0b25zKFtcbiAqICAgICAgbmV3IEJ1dHRvbk1ha2VyKCdPaycsICdvaycsIEJ1dHRvbkxheW91dERpc3BsYXkuUFJJTUFSWSksXG4gKiAgICAgIG5ldyBCdXR0b25NYWtlcignQ2FuY2VsJywgJ2NhbmNlbCcsIEJ1dHRvbkxheW91dERpc3BsYXkuU0VDT05EQVJZKSAvLyBTVUNDRVNTIHwgSU5GTyB8IE5PTkUgfCBEQU5HRVIgfCBXQVJOSU5HIHwgUFJJTUFSWSB8IFNFQ09OREFSWSB8IExJTksgfCBEQVJLIHwgTElHSFRcbiAqICBdKTtcbiAqXG4gKiAgLy8gQ29tbWFuZCB0byBvcGVuIGRpYWxvZywgaXQgcmV0dXJucyBvYnNlcnZhYmxlLlxuICogIG5ld0RpYWxvZ1BvcHVwLm9wZW5EaWFsb2ckPGFueT4oKS5zdWJzY3JpYmUocmVzcCA9PiB7XG4gKiAgICAgICAgICAgY29uc29sZS5sb2coJ3Jlc3BvbnNlOiAnLCByZXNwLlBheWxvYWQpO1xuICogICAgICAgfSk7XG4gKiBgYGBcbiAqICogSURpYWxvZ0NvcmVDb25maWc6IHtAbGluayBJRGlhbG9nQ29yZUNvbmZpZ31cbiAqICogTGF5b3V0VHlwZToge0BsaW5rIERpYWxvZ0xheW91dERpc3BsYXl9XG4gKiAqIEJ1dHRvbkxheW91dERpc3BsYXk6IHtAbGluayBCdXR0b25MYXlvdXREaXNwbGF5fVxuICogKiBCdXR0b25NYWtlcjoge0BsaW5rIEJ1dHRvbk1ha2VyfVxuICogKiBJRGlhbG9nUHVibGljUmVzcG9uc2U6IHtAbGluayBJRGlhbG9nUHVibGljUmVzcG9uc2V9XG4gKiBAY2F0ZWdvcnkgUG9wdXAgb3BlblxuICovXG5leHBvcnQgeyBEaWFsb2dJbml0aWFsaXplciB9O1xuLy8gZW5kcmVnaW9uXG5cbi8vIHJlZ2lvbiAqKiogSW1wb3J0cyBmb3IgYW5ndWxhciBhcHAubW9kdWxlICoqKlxuLyoqXG4gKiBUaGlzIGlzIHRoZSBtYWluIG1vZHVsZSBvZiB0aGUgbGlicmFyeSwgaXQgaXMgY3J1Y2lhbCB0byBiZSBhZGRlZCB3aXRoaW4gYW5ndWxhci5hcHBcbiAqIGltcG9ydHMgYXMgYW4gZXhhbXBsZSB3aXRoIG9wdGlvbmFsIGFyZ3VtZW50LCBsb29rOiB7QGxpbmsgSUdsb2JhbFVzZXJDb25maWd9XG4gKiBTdHlsZSB5b3VyIGFwcGxpY2F0aW9uIGJ5IGFkZGluZyBhIGNvbG9yIGxpc3QgbGlrZSBpbiB0aGlzIGV4YW1wbGUuXG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogLy8gYXBwLm1vZHVsZSBpbXBvcnRzOlxuICogTmd4QXdlc29tZVBvcHVwTW9kdWxlLmZvclJvb3Qoe1xuICogICAgIENvbG9yTGlzdDoge1xuICogICAgICAgICAgICBQcmltYXJ5ICA6ICcjZmY5ZTAwJywgLy8gb3B0aW9uYWxcbiAqICAgICAgICAgICAgU2Vjb25kYXJ5OiAnIzk4OWVhNScsIC8vIG9wdGlvbmFsXG4gKiAgICAgICAgICAgIEluZm8gICAgIDogJyMyZjhlZTUnLCAvLyBvcHRpb25hbFxuICogICAgICAgICAgICBTdWNjZXNzICA6ICcjM2NhZWEzJywgLy8gb3B0aW9uYWxcbiAqICAgICAgICAgICAgV2FybmluZyAgOiAnI2ZmYzEwNycsIC8vIG9wdGlvbmFsXG4gKiAgICAgICAgICAgIERhbmdlciAgIDogJyNlNDY0NjQnLCAvLyBvcHRpb25hbFxuICogICAgICAgICAgICBMaWdodCAgICA6ICcjZmJmYmZiJywgLy8gb3B0aW9uYWxcbiAqICAgICAgICAgICAgRGFyayAgICAgOiAnIzM0M2E0MCcgIC8vIG9wdGlvbmFsXG4gKiAgICAgICAgICAgfVxuICogfSlcbiAqIGBgYFxuICogQGNhdGVnb3J5IEltcG9ydHMgZm9yIGFuZ3VsYXIgYXBwLm1vZHVsZVxuICovXG5leHBvcnQgeyBOZ3hBd2Vzb21lUG9wdXBNb2R1bGUgfSBmcm9tICcuL25neC1hd2Vzb21lLXBvcHVwL25neC1hd2Vzb21lLXBvcHVwLm1vZHVsZSc7XG4vKipcbiAqIFRoaXMgaXMgdGhlIG1vZHVsZSB0aGF0IGlnbml0ZXMgZHluYW1pYyBkaWFsb2cgbW9kYWwsIGl0cyBwdXJwb3NlIGlzIHRvIGxvYWQgYW55IGFuZ3VsYXIgY29tcG9uZW50IGluXG4gKiBkaWFsb2cgd2luZG93LiBEeW5hbWljIGNvbXBvbmVudCBtZWFucyB0aGF0IHVzZXIgY2FuIGV2b2tlIGFueSBBbmd1bGFyIGNvbXBvbmVudCBpbiB0aGUgcG9wdXAganVzdCBmcm9tIHR5cGVzY3JpcHQuIENvbXBvbmVudCB2aWV3XG4gKiBpcyBkeW5hbWljYWxseSBjcmVhdGVkIHdpdGggdGhlIGxpYnJhcnkgZW5naW5lIGFuZCB0aGVyZSBpcyBubyBuZWVkIHRvIGNhbGwgYW55IHNlbGVjdG9yIGluIEhUTUwgdG8gY3JlYXRlIGNvbXBvbmVudCB2aWV3LlxuICpcbiAqIEl0IGlzIGNydWNpYWwgZm9yIHVzZXIgdG8gYWRkIHRoaXMgbW9kdWxlIGluIGFuZ3VsYXIuYXBwIGltcG9ydHMuXG4gKiBCZWxvdyBpcyB0aGUgZXhhbXBsZSB3aXRoIChvcHRpb25hbCkgZGVmYXVsdCB1c2VyIGNvbmZpZ3VyYXRpb24sIHRoYXQgaXMgd2hhdCB3aWxsIGJlIGluIHNldHVwIGlmIHRoZXJlIGlzIG5vXG4gKiBsb2NhbCBjb25maWcgd2hlbiBwb3B1cCBpcyBldm9rZWQsIHRoYXQgbWVhbnMgaXQgY2FuIGJlIG92ZXJyaWRkZW4gZGlyZWN0bHkgd2hlbiBwb3B1cCBpcyBjYWxsZWQuXG4gKiBUaGF0IG1lYW4gaXQncyBwcmVkZWZpbmVkIGNvbmZpZywgc28gaXQgZG9lc24ndCBuZWVkIHRvIGJlIGNvbmZpZ3VyZWQgZWFjaCB0aW1lIHdoZW4gZGlhbG9nIGlzIGV2b2tlZC5cbiAqIEZvciBpbXBsZW1lbnRhdGlvbiBsb29rOiB7QGxpbmsgSURpYWxvZ1VzZXJDb25maWd9LlxuICpcbiAqIEV4YW1wbGU6XG4gKiBgYGB0eXBlc2NyaXB0XG4gKiAvLyBhcHAubW9kdWxlIGltcG9ydHM6XG4gKkRpYWxvZ0NvbmZpZ01vZHVsZS5mb3JSb290KHtcbiAqICAgICBEaWFsb2dDb3JlQ29uZmlnOiB7XG4gKiAgICAgICAgV2lkdGggICAgICAgICAgOiAnNTAwcHgnLFxuICogICAgICAgIC8vIE1pbldpZHRoICAgICAgIDogJzMwMHB4JywgIC8vIGV4YW1wbGVcbiAqICAgICAgICAvLyBNYXhXaWR0aCAgICAgICA6ICc3MDBweCcsICAvLyBleGFtcGxlXG4gKiAgICAgICAgSGVpZ2h0ICAgICAgICAgOiAnNTAwcHgnLFxuICogICAgICAgIC8vIE1pbkhlaWdodCAgICAgIDogJzEwMHZoJywgIC8vIGV4YW1wbGVcbiAqICAgICAgICAvLyBNYXhIZWlnaHQgICAgICA6ICcxMDBweCcsICAvLyBleGFtcGxlXG4gKiAgICAgICAgQnV0dG9uUG9zaXRpb246ICdyaWdodCcsIC8vIG9wdGlvbmFsICcgY2VudGVyJywgJ2xlZnQnLCAncmlnaHQnXG4gKiAgICAgICAgTGF5b3V0VHlwZTogRGlhbG9nTGF5b3V0RGlzcGxheS5JTkZPLCAvLyBTVUNDRVNTIHwgSU5GTyB8IE5PTkUgfCBEQU5HRVIgfCBXQVJOSU5HXG4gKiAgICAgICAgTG9hZGVyQ29tcG9uZW50OiAvLyBBbnkgYW5ndWxhciBjb21wb25lbnQgY2xhc3MgbmFtZSBjYW4gYmUgaW5jbHVkZWQgYXMgYSBsb2FkZXIuXG4gKiAgICAgICAgSGlkZVNjcm9sbGJhciAgOiB0cnVlLFxuICogICAgICAgIEVzY2FwZUtleUNsb3NlIDogdHJ1ZSxcbiAqICAgICAgICAvLyBGdWxsU2NyZWVuIDogdHJ1ZSxcbiAqICAgICAgICBCdXR0b25Qb3NpdGlvbiA6ICdyaWdodCcsXG4gKiAgICAgICAgTGF5b3V0VHlwZTogRGlhbG9nTGF5b3V0RGlzcGxheS5JTkZPLFxuICogICAgICAgIC8vIExvYWRlckNvbXBvbmVudDogLy8gQW55IEFuZ3VsYXIgY29tcG9uZW50IGNsYXNzIG5hbWUgY2FuIGJlIGluY2x1ZGVkIGFzIGEgbG9hZGVyLlxuICogICAgICAgIERpc3BsYXlMb2FkZXI6IGZhbHNlIC8vIFRoaXMgd2lsbCBvdmVycmlkZSBMb2FkZXJDb21wb25lbnQuXG4gKiAgICAgICAgQW5pbWF0aW9uSW46IEFwcGVhcmFuY2VBbmltYXRpb24uQk9VTkNFX0lOLCAvLyBCT1VOQ0VfSU4gfCBTV0lORyB8IFpPT01fSU4gfCBaT09NX0lOX1JPVEFURSB8IEVMQVNUSUMgfCBKRUxMTyB8IEZBREVfSU4gfCBTTElERV9JTl9VUCB8IFNMSURFX0lOX0RPV04gfCBTTElERV9JTl9MRUZUIHwgU0xJREVfSU5fUklHSFQgfCBOT05FXG4gKiAgICAgICAgQW5pbWF0aW9uT3V0OiBEaXNhcHBlYXJhbmNlQW5pbWF0aW9uLkJPVU5DRV9PVVQsIC8vIEJPVU5DRV9PVVQgfCBaT09NX09VVCB8IFpPT01fT1VUX1dJTkQgfCBaT09NX09VVF9ST1RBVEUgfCBGTElQX09VVCB8IFNMSURFX09VVF9VUCB8IFNMSURFX09VVF9ET1dOIHwgU0xJREVfT1VUX0xFRlQgfCBTTElERV9PVVRfUklHSFQgfCBOT05FXG4gKiAgICAgICAgQ3VzdG9tU3R5bGVzOiB7XG4gKiAgICAgICAgICBCdXR0b25TZWN0aW9uQ1NTOiAnYmFja2dyb3VuZDogIzMzMycsXG4gKiAgICAgICAgICBCdXR0b25DU1M6ICdmb250LXNpemU6IDMwcHg7JyxcbiAqICAgICAgICAgIFdyYXBwZXJDU1M6ICdiYWNrZ3JvdW5kOiAjMzMzOydcbiAqICAgICAgICB9XG4gKiAgICB9LFxuICogICAgLy8gb3B0aW9uYWwgcHJlZGVmaW5lZCBjdXN0b20gZGVmYXVsdCBidXR0b25zXG4gKiAgICAgQnV0dG9uczogW1xuICogICAgICAgIG5ldyBCdXR0b25NYWtlcignT2snLCAnb2snLCBCdXR0b25MYXlvdXREaXNwbGF5LlBSSU1BUlkpLFxuICogICAgICAgIG5ldyBCdXR0b25NYWtlcignQ2FuY2VsJywgJ2NhbmNlbCcsIEJ1dHRvbkxheW91dERpc3BsYXkuU0VDT05EQVJZKVxuICogICAgIF0sXG4gKiB9KVxuICogYGBgXG4gKiAqIERpYWxvZ0NvcmVDb25maWcuTGF5b3V0VHlwZToge0BsaW5rIERpYWxvZ0xheW91dERpc3BsYXl9XG4gKiAqIEJ1dHRvbkxheW91dERpc3BsYXk6IHtAbGluayBCdXR0b25MYXlvdXREaXNwbGF5fVxuICogKiBCdXR0b25NYWtlcjoge0BsaW5rIEJ1dHRvbk1ha2VyfVxuICogQGNhdGVnb3J5IEltcG9ydHMgZm9yIGFuZ3VsYXIgYXBwLm1vZHVsZVxuICovXG5leHBvcnQgeyBEaWFsb2dDb25maWdNb2R1bGUgfSBmcm9tICcuL25neC1hd2Vzb21lLXBvcHVwL25neC1hd2Vzb21lLXBvcHVwLm1vZHVsZSc7XG4vKipcbiAqIFRoaXMgaXMgdGhlIG1vZHVsZSB0aGF0IGlnbml0ZXMgQ29uZmlybSBib3ggZGlhbG9nLCBpdHMgcHVycG9zZSBpcyB0byBzaG93IHBvcHVwIGluIGFcbiAqIHNtYWxsIGRpYWxvZyB3aW5kb3cgaW4gdGhlIG1pZGRsZSBvZiB0aGUgc2NyZWVuLiBVc2VyIGNhbiBwcm92aWRlIHRpdGxlLCBtZXNzYWdlIGFuZCBpbmNsdWRlIGJ1dHRvbnMuXG4gKiBDb25maXJtIGJveCBpcyBhdmFpbGFibGUgaW4gcHJlZGVmaW5lZCBsYXlvdXQgdHlwZXMgKGVudW1zKToge0BsaW5rIERpYWxvZ0xheW91dERpc3BsYXl9LlxuICpcbiAqIEl0IGlzIGNydWNpYWwgZm9yIHVzZXIgdG8gYWRkIHRoaXMgbW9kdWxlIGluIGFuZ3VsYXIuYXBwIGltcG9ydHMuXG4gKiBCZWxvdyBpcyB0aGUgZXhhbXBsZSB3aXRoIChvcHRpb25hbCkgZGVmYXVsdCB1c2VyIGNvbmZpZ3VyYXRpb24sIHRoYXQncyB3aGF0IHdpbGwgYmUgdXNlZCBpZiB0aGVyZSBpcyBub1xuICogbG9jYWwgY29uZmlnIHdoZW4gcG9wdXAgaXMgZXZva2VkLCB0aGF0IG1lYW5zIGl0IGNhbiBiZSBvdmVycmlkZGVuIGRpcmVjdGx5IHdoZW4gcG9wdXAgaXMgZXZva2VkLlxuICogVGhhdCBtZWFuIGl0J3MgcHJlZGVmaW5lZCBjb25maWcsIHNvIGl0IGRvZXNuJ3QgbmVlZCB0byBiZSBjb25maWd1cmVkIGVhY2ggdGltZSB3aGVuIGNvbmZpcm0gYm94IGlzIGV2b2tlZC5cbiAqIEZvciBpbXBsZW1lbnRhdGlvbiBsb29rOiB7QGxpbmsgSUNvbmZpcm1Cb3hVc2VyQ29uZmlnfS5cbiAqXG4gKiBFeGFtcGxlOlxuICogYGBgdHlwZXNjcmlwdFxuICogLy8gYXBwLm1vZHVsZSBpbXBvcnRzOlxuICpDb25maXJtQm94Q29uZmlnTW9kdWxlLmZvclJvb3Qoe1xuICogICAgQ29uZmlybUJveENvcmVDb25maWc6IHtcbiAqICAgICAgIFdpZHRoOiAnNzAwcHgnLFxuICogICAgICAgTGF5b3V0VHlwZTogRGlhbG9nTGF5b3V0RGlzcGxheS5EQU5HRVIsXG4gKiAgICAgICBCdXR0b25Qb3NpdGlvbjogJ2NlbnRlcicsIC8vIG9wdGlvbmFsICcgY2VudGVyJywgJ2xlZnQnLCAncmlnaHQnXG4gKiAgICAgICBMYXlvdXRUeXBlOiBEaWFsb2dMYXlvdXREaXNwbGF5LlNVQ0NFU1MsIC8vIFNVQ0NFU1MgfCBJTkZPIHwgTk9ORSB8IERBTkdFUiB8IFdBUk5JTkdcbiAqICAgICAgIEFuaW1hdGlvbkluOiBBcHBlYXJhbmNlQW5pbWF0aW9uLkJPVU5DRV9JTiwgLy8gQk9VTkNFX0lOIHwgU1dJTkcgfCBaT09NX0lOIHwgWk9PTV9JTl9ST1RBVEUgfCBFTEFTVElDIHwgSkVMTE8gfCBGQURFX0lOIHwgU0xJREVfSU5fVVAgfCBTTElERV9JTl9ET1dOIHwgU0xJREVfSU5fTEVGVCB8IFNMSURFX0lOX1JJR0hUIHwgTk9ORVxuICogICAgICAgQW5pbWF0aW9uT3V0OiBEaXNhcHBlYXJhbmNlQW5pbWF0aW9uLkJPVU5DRV9PVVQsIC8vIEJPVU5DRV9PVVQgfCBaT09NX09VVCB8IFpPT01fT1VUX1dJTkQgfCBaT09NX09VVF9ST1RBVEUgfCBGTElQX09VVCB8IFNMSURFX09VVF9VUCB8IFNMSURFX09VVF9ET1dOIHwgU0xJREVfT1VUX0xFRlQgfCBTTElERV9PVVRfUklHSFQgfCBOT05FXG4gKiAgICAgICBBbGxvd0hUTUxNZXNzYWdlOiB0cnVlLCAvLyBkZWZhdWx0IGZhbHNlXG4gKiAgICAgICBEaXNhYmxlSWNvbjogdHJ1ZSwgLy8gZGVmYXVsdCBmYWxzZVxuICogICAgICAgQ3VzdG9tU3R5bGVzOiB7XG4gKiAgICAgICAgICAgVGl0bGVDU1M6ICdjb2xvcjogI2RkZDsgYmFja2dyb3VuZDogIzMzMzsgZm9udC1zaXplOiAyMHB4OyBwYWRkaW5nOiAyMHB4JyxcbiAqICAgICAgICAgICBCdXR0b25TZWN0aW9uQ1NTOiAnYmFja2dyb3VuZDogIzMzMycsXG4gKiAgICAgICAgICAgQnV0dG9uQ1NTOiAnZm9udC1zaXplOiAxNHB4OycsXG4gKiAgICAgICAgICAgVGV4dENTUzogJ2NvbG9yOiAjZGRkOyBmb250LXNpemU6IDE2cHg7IGJhY2tncm91bmQ6ICMzMzM7JyxcbiAqICAgICAgICAgICBXcmFwcGVyQ1NTOiAnYmFja2dyb3VuZDogIzMzMzsnXG4gKiAgICAgICB9XG4gKiAgICB9LFxuICogICAgRGlzcGF0Y2g6IHsgIC8vIE9wdGlvbmFsIGRlZmF1bHQgZGlzcGF0Y2ggb2JqZWN0LlxuICogICAgICAgVGl0bGU6ICdEZWZhdWx0IHRpdGxlJyxcbiAqICAgICAgIE1lc3NhZ2U6ICdEZWZhdWx0IG1lc3NhZ2UnXG4gKiAgICB9LFxuICogICAgLy8gb3B0aW9uYWwgcHJlZGVmaW5lZCBjdXN0b20gZGVmYXVsdCBidXR0b25zXG4gKiAgICBCdXR0b25zICAgICA6IFtcbiAqICAgICAgIG5ldyBCdXR0b25NYWtlcignT2snLCAnb2snLCBCdXR0b25MYXlvdXREaXNwbGF5LlBSSU1BUlkpLFxuICogICAgICAgbmV3IEJ1dHRvbk1ha2VyKCdDYW5jZWwnLCAnY2FuY2VsJywgQnV0dG9uTGF5b3V0RGlzcGxheS5TRUNPTkRBUlkpXG4gKiAgICBdXG4gKiB9KVxuICogYGBgXG4gKiAqIENvbmZpcm1Cb3hDb3JlQ29uZmlnOiB7QGxpbmsgSUNvbmZpcm1Cb3hDb3JlQ29uZmlnfVxuICogKiBEaXNwYXRjaDoge0BsaW5rIElEaXNwYXRjaH1cbiAqICogQnV0dG9uczoge0BsaW5rIElCdXR0b259XG4gKiAqIEJ1dHRvbk1ha2VyOiB7QGxpbmsgQnV0dG9uTWFrZXJ9XG4gKiBAY2F0ZWdvcnkgSW1wb3J0cyBmb3IgYW5ndWxhciBhcHAubW9kdWxlXG4gKi9cbmV4cG9ydCB7IENvbmZpcm1Cb3hDb25maWdNb2R1bGUgfSBmcm9tICcuL25neC1hd2Vzb21lLXBvcHVwL25neC1hd2Vzb21lLXBvcHVwLm1vZHVsZSc7XG4vKipcbiAqIFRoaXMgaXMgdGhlIG1vZHVsZSB0aGF0IGlnbml0ZXMgVG9hc3Qgbm90aWZpY2F0aW9ucyBkaWFsb2csIGl0cyBwdXJwb3NlIGlzIHRvIHNob3cgdG9hc3QgcG9wdXAgaW4gYVxuICogc21hbGwgZGlhbG9nIHdpbmRvdyBpbiB0aGUgY29ybmVyIG9mIHRoZSBzY3JlZW4uIFVzZXIgY2FuIHByb3ZpZGUgdGl0bGUgYW5kIG1lc3NhZ2UgYW5kIGluY2x1ZGUgYnV0dG9ucywgb3Igc2V0dXAgYXV0byBkaXNhcHBlYXJpbmcuXG4gKiBUb2FzdCBub3RpZmljYXRpb25zIGFyZSBhdmFpbGFibGUgaW4gcHJlZGVmaW5lZCBsYXlvdXQgdHlwZXMgKGVudW1zKToge0BsaW5rIERpYWxvZ0xheW91dERpc3BsYXl9LlxuICpcbiAqIEl0IGlzIGNydWNpYWwgZm9yIHVzZXIgdG8gYWRkIHRoaXMgbW9kdWxlIGluIGFuZ3VsYXIuYXBwIGltcG9ydHMuXG4gKiBCZWxvdyBpcyB0aGUgZXhhbXBsZSB3aXRoIChvcHRpb25hbCkgZGVmYXVsdCB1c2VyIGNvbmZpZ3VyYXRpb24sIHRoYXQncyB3aGF0IHdpbGwgYmUgdXNlZCBpZiB0aGVyZSBpcyBub1xuICogbG9jYWwgY29uZmlnIHdoZW4gcG9wdXAgaXMgZXZva2VkLCB0aGF0IG1lYW5zIGl0IGNhbiBiZSBvdmVycmlkZGVuIGRpcmVjdGx5IHdoZW4gcG9wdXAgaXMgZXZva2VkLlxuICogVGhhdCBtZWFuIGl0J3MgcHJlZGVmaW5lZCBjb25maWcsIHNvIGl0IGRvZXNuJ3QgbmVlZCB0byBiZSBjb25maWd1cmVkIGVhY2ggdGltZSB3aGVuIHRvYXN0IGlzIGV2b2tlZC5cbiAqIEZvciBpbXBsZW1lbnRhdGlvbiBsb29rOiB7QGxpbmsgSVRvYXN0Tm90aWZpY2F0aW9uVXNlckNvbmZpZ30uXG4gKlxuICogRXhhbXBsZTpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIC8vIGFwcC5tb2R1bGUgaW1wb3J0czpcbiAqVG9hc3ROb3RpZmljYXRpb25Db25maWdNb2R1bGUuZm9yUm9vdCh7XG4gKiAgICBUb2FzdENvcmVDb25maWc6IHtcbiAqICAgICAgIC8vIEF1dG9DbG9zZSBpdCB3aWxsIGJlIGlnbm9yZWQgaWYgYnV0dG9ucyBhcmUgaW5jbHVkZWQuXG4gKiAgICAgICBBdXRvQ2xvc2VEZWxheTogMzAwMCwgLy8gbWlsbGlzZWNvbmRzLCBvcHRpb25hbCBzZXQgMCB0byBuZXZlciBleHBpcmVzXG4gKiAgICAgICBUZXh0UG9zaXRpb246ICdyaWdodCcsIC8vIG9wdGlvbmFsICcgY2VudGVyJywgJ2xlZnQnLCAncmlnaHQnXG4gKiAgICAgICBMYXlvdXRUeXBlOiBEaWFsb2dMYXlvdXREaXNwbGF5LlNVQ0NFU1MsIC8vIFNVQ0NFU1MgfCBJTkZPIHwgTk9ORSB8IERBTkdFUiB8IFdBUk5JTkdcbiAqICAgICAgIFByb2dyZXNzQmFyOiBUb2FzdFByb2dyZXNzQmFyRW51bS5JTkNSRUFTRSwgLy8gSU5DUkVBU0UgfCBERUNSRUFTRSB8IE5PTkVcbiAqICAgICAgIFRvYXN0VXNlclZpZXdUeXBlOiBUb2FzdFVzZXJWaWV3VHlwZUVudW0uU0lNUExFLCAvLyBTVEFOREFSRCB8IFNJTVBMRVxuICogICAgICAgQW5pbWF0aW9uSW46IEFwcGVhcmFuY2VBbmltYXRpb24uQk9VTkNFX0lOLCAvLyBCT1VOQ0VfSU4gfCBTV0lORyB8IFpPT01fSU4gfCBaT09NX0lOX1JPVEFURSB8IEVMQVNUSUMgfCBKRUxMTyB8IEZBREVfSU4gfCBTTElERV9JTl9VUCB8IFNMSURFX0lOX0RPV04gfCBTTElERV9JTl9MRUZUIHwgU0xJREVfSU5fUklHSFQgfCBOT05FXG4gKiAgICAgICBBbmltYXRpb25PdXQ6IERpc2FwcGVhcmFuY2VBbmltYXRpb24uQk9VTkNFX09VVCwgLy8gQk9VTkNFX09VVCB8IFpPT01fT1VUIHwgWk9PTV9PVVRfV0lORCB8IFpPT01fT1VUX1JPVEFURSB8IEZMSVBfT1VUIHwgU0xJREVfT1VUX1VQIHwgU0xJREVfT1VUX0RPV04gfCBTTElERV9PVVRfTEVGVCB8IFNMSURFX09VVF9SSUdIVCB8IE5PTkVcbiAqICAgICAgIFRvYXN0UG9zaXRpb246IFRvYXN0UG9zaXRpb25FbnVtLlRPUF9SSUdIVCwgIC8vIFRPUF9MRUZUIHwgVE9QX0NFTlRFUiB8IFRPUF9SSUdIVCB8IFRPUF9GVUxMX1dJRFRIIHwgQk9UVE9NX0xFRlQgfCBCT1RUT01fQ0VOVEVSIHwgQk9UVE9NX1JJR0hUIHwgQk9UVE9NX0ZVTExfV0lEVEhcbiAqICAgICAgIEFsbG93SFRNTE1lc3NhZ2U6IHRydWUsICAvLyBkZWZhdWx0IGZhbHNlXG4gKiAgICAgICBEaXNhYmxlSWNvbjogdHJ1ZSwgLy8gZGVmYXVsdCBmYWxzZVxuICogICAgICAgQnV0dG9uUG9zaXRpb246ICdyaWdodCcsIC8vIG9wdGlvbmFsICcgY2VudGVyJywgJ2xlZnQnLCAncmlnaHQnXG4gKiAgICAgICBDdXN0b21TdHlsZXM6IHtcbiAqICAgICAgICAgICBUaXRsZUNTUzogJ2JhY2tncm91bmQ6IHJnYmEoMCwwLDAsIC43KTsgZm9udC1zaXplOiAyMHB4OyBwYWRkaW5nOiAyMHB4JyxcbiAqICAgICAgICAgICBCdXR0b25TZWN0aW9uQ1NTOiAnYmFja2dyb3VuZDogIzMzMycsXG4gKiAgICAgICAgICAgQnV0dG9uQ1NTOiAnZm9udC1zaXplOiAxNHB4OycsXG4gKiAgICAgICAgICAgVGV4dENTUzogJ2NvbG9yOiAjZGRkOyBmb250LXNpemU6IDE2cHg7IGJhY2tncm91bmQ6ICMzMzM7J1xuICogICAgICAgICB9XG4gKiAgICB9LFxuICogICAgR2xvYmFsU2V0dGluZ3M6IHtcbiAqICAgICAgIC8vIFRoZSBudW1iZXIgb2YgdG9hc3Qgbm90aWZpY2F0aW9ucyB0aGF0IGNhbiBiZSBzaG93biBhdCBvbmNlLlxuICogICAgICAgQWxsb3dlZE5vdGlmaWNhdGlvbnNBdE9uY2U6IDRcbiAqICAgIH0sXG4gKiAgICAvLyBPcHRpb25hbCBkZWZhdWx0IGRpc3BhdGNoIG9iamVjdC5cbiAqICAgIERpc3BhdGNoOiB7XG4gKiAgICAgIFRpdGxlOiAnRGVmYXVsdCB0aXRsZScsXG4gKiAgICAgIE1lc3NhZ2U6ICdEZWZhdWx0IG1lc3NhZ2UnXG4gKiAgIH0sXG4gKiAgIC8vIG9wdGlvbmFsIHByZWRlZmluZWQgY3VzdG9tIGRlZmF1bHQgYnV0dG9uc1xuICogICBCdXR0b25zOiBbXG4gKiAgICAgIG5ldyBCdXR0b25NYWtlcignT2snLCAnb2snLCBCdXR0b25MYXlvdXREaXNwbGF5LlBSSU1BUlkpLFxuICogICAgICBuZXcgQnV0dG9uTWFrZXIoJ0NhbmNlbCcsICdjYW5jZWwnLCBCdXR0b25MYXlvdXREaXNwbGF5LlNFQ09OREFSWSlcbiAqICAgXVxuICp9KVxuICogYGBgXG4gKiAqIFRvYXN0Q29yZUNvbmZpZzoge0BsaW5rIElUb2FzdENvcmVDb25maWd9XG4gKiAqIEdsb2JhbFNldHRpbmdzOiB7QGxpbmsgSUdsb2JhbFRvYXN0U2V0dGluZ3N9XG4gKiAqIERpc3BhdGNoOiB7QGxpbmsgSURpc3BhdGNofVxuICogKiBCdXR0b25zOiB7QGxpbmsgSUJ1dHRvbn1cbiAqICogQnV0dG9uTWFrZXI6IHtAbGluayBCdXR0b25NYWtlcn1cbiAqIEBjYXRlZ29yeSBJbXBvcnRzIGZvciBhbmd1bGFyIGFwcC5tb2R1bGVcbiAqL1xuZXhwb3J0IHsgVG9hc3ROb3RpZmljYXRpb25Db25maWdNb2R1bGUgfSBmcm9tICcuL25neC1hd2Vzb21lLXBvcHVwL25neC1hd2Vzb21lLXBvcHVwLm1vZHVsZSc7XG4vLyBlbmRyZWdpb25cbiJdfQ==