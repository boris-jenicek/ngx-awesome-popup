import { ConfirmBoxInitializer } from './ngx-awesome-popup/types/confirm-box/core/classes';
import { DialogBelonging, DialogInitializer } from './ngx-awesome-popup/types/dialog/core/classes';
import {
  ResetToastGlobalSettings,
  ToastNotificationInitializer
} from './ngx-awesome-popup/types/toast-notification/core/classes';
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
 *     colorList: {
 *            primary  : '#ff9e00', // optional shade of the overlay color
 *            secondary: '#989ea5', // optional
 *            info     : '#2f8ee5', // optional
 *            success  : '#3caea3', // optional
 *            warning  : '#ffc107', // optional
 *            danger   : '#e46464', // optional
 *            light    : '#fbfbfb', // optional
 *            dark     : '#343a40'  // optional
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
 *     allowedNotificationsAtOnce: 2
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
 *    styleUrls  : ["./dynamic.component.scss"]
 *})
 * export class DynamicComponent implements OnInit, OnDestroy {
 *
 *    subscriptions: Subscription = new Subscription();
 *
 *    constructor(@Inject("dialogBelonging") private dialogBelonging: DialogBelonging) {}
 *
 *    ngOnInit(): void {
 *    console.log(this.dialogBelonging);
 *
 *        this.subscriptions.add(
 *            this.dialogBelonging.eventsController.onButtonClick$.subscribe((_Button) => {
 *            if (_Button.ID === 'ok') {
 *                // Do some logic and close popup.
 *                this.dialogBelonging.eventsController.close();
 *            } else if (_Button.ID === 'cancel') {
 *                // Do some logic and close popup.
 *                this.dialogBelonging.eventsController.close();
 *            }
 *        })
 *        );
 *
 *        setTimeout(() => {
 *            // Close loader after async data is ready.
 *            this.dialogBelonging.eventsController.closeLoader();
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
 *      layoutType: DialogLayoutDisplay.WARNING
 *   });

 * // Open a ToastNotification.
 * newConfirmBox.openConfirmBox$().subscribe(resp => {
 *   console.log('confirmBox response: ', resp);
 *  });
 * ```
 * * IToastCoreConfig: {@link IToastCoreConfig}
 * * layoutType: {@link DialogLayoutDisplay}
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
 *      layoutType: DialogLayoutDisplay.DANGER
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
 * * layoutType: {@link DialogLayoutDisplay}
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
 *  import {DialogInitializer, DialogLayoutDisplay, ButtonMaker, ButtonLayoutDisplay} from 'ngx-awesome-popup';
 *  import {DynamicComponent} from './dynamic/dynamic.component';
 *
 *  const newDialogPopup = new DialogInitializer(DynamicComponent); // Any Angular component.
 *
 *  // Custom data will be sent to dynamic component available in dialogBelonging object.
 *  newDialogPopup.setCustomData({name: 'John', surname: 'Doe', id: 1});
 *
 *  // Local config settings IDialogCoreConfig.
 *  newDialogPopup.setConfig({
 *      layoutType: DialogLayoutDisplay.INFO, // SUCCESS | INFO | NONE | DANGER | WARNING
 *      height: '500px',  // optional
 *      // maxHeight: '600px',  // optional
 *      // minHeight: '200px',  // optional
 *      // width: '500px', // optional
 *      // maxWidth: '600px', // optional
 *      // minWidth: '200px', // optional
 *      // hideScrollbar: true, // optional, default is false
 *      // fullScreen: true, // optional, default is false
 *      // escapeKeyClose: true, // optional, default is false
 *      // buttonPosition: "left", // optional, default is "right"
 *      // loaderComponent: Any Angular component,
 *      // customStyles: {
 *      //     buttonSectionCSS: 'background: #333',
 *      //     buttonCSS: 'font-size: 30px;',
 *      //     wrapperCSS: 'background: #333;'
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
 * * layoutType: {@link DialogLayoutDisplay}
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
 *     colorList: {
 *            primary  : '#ff9e00', // optional
 *            secondary: '#989ea5', // optional
 *            info     : '#2f8ee5', // optional
 *            success  : '#3caea3', // optional
 *            warning  : '#ffc107', // optional
 *            danger   : '#e46464', // optional
 *            light    : '#fbfbfb', // optional
 *            dark     : '#343a40'  // optional
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
 *     dialogCoreConfig: {
 *        width          : '500px',
 *        // minWidth       : '300px',  // example
 *        // maxWidth       : '700px',  // example
 *        height         : '500px',
 *        // minHeight      : '100vh',  // example
 *        // maxHeight      : '100px',  // example
 *        buttonPosition: 'right', // optional ' center', 'left', 'right'
 *        layoutType: DialogLayoutDisplay.INFO, // SUCCESS | INFO | NONE | DANGER | WARNING
 *        // loaderComponent: // Any angular component class name can be included as a loader.
 *        hideScrollbar  : true,
 *        escapeKeyClose : true,
 *        // FullScreen : true,
 *        buttonPosition : 'right',
 *        layoutType: DialogLayoutDisplay.INFO,
 *        // LoaderComponent: // Any Angular component class name can be included as a loader.
 *        displayLoader: false // This will override LoaderComponent.
 *        animationIn: AppearanceAnimation.BOUNCE_IN, // BOUNCE_IN | SWING | ZOOM_IN | ZOOM_IN_ROTATE | ELASTIC | JELLO | FADE_IN | SLIDE_IN_UP | SLIDE_IN_DOWN | SLIDE_IN_LEFT | SLIDE_IN_RIGHT | NONE
 *        animationOut: DisappearanceAnimation.BOUNCE_OUT, // BOUNCE_OUT | ZOOM_OUT | ZOOM_OUT_WIND | ZOOM_OUT_ROTATE | FLIP_OUT | SLIDE_OUT_UP | SLIDE_OUT_DOWN | SLIDE_OUT_LEFT | SLIDE_OUT_RIGHT | NONE
 *        customStyles: {
 *          buttonSectionCSS: 'background: #333',
 *          buttonCSS: 'font-size: 30px;',
 *          wrapperCSS: 'background: #333;'
 *        }
 *    },
 *    // optional predefined custom default buttons
 *     buttons: [
 *        new ButtonMaker('Ok', 'ok', ButtonLayoutDisplay.PRIMARY),
 *        new ButtonMaker('Cancel', 'cancel', ButtonLayoutDisplay.SECONDARY)
 *     ],
 * })
 * ```
 * * dialogCoreConfig.layoutType: {@link DialogLayoutDisplay}
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
 *    confirmBoxCoreConfig: {
 *       width: '700px',
 *       layoutType: DialogLayoutDisplay.DANGER,
 *       buttonPosition: 'center', // optional ' center', 'left', 'right'
 *       layoutType: DialogLayoutDisplay.SUCCESS, // SUCCESS | INFO | NONE | DANGER | WARNING
 *       animationIn: AppearanceAnimation.BOUNCE_IN, // BOUNCE_IN | SWING | ZOOM_IN | ZOOM_IN_ROTATE | ELASTIC | JELLO | FADE_IN | SLIDE_IN_UP | SLIDE_IN_DOWN | SLIDE_IN_LEFT | SLIDE_IN_RIGHT | NONE
 *       animationOut: DisappearanceAnimation.BOUNCE_OUT, // BOUNCE_OUT | ZOOM_OUT | ZOOM_OUT_WIND | ZOOM_OUT_ROTATE | FLIP_OUT | SLIDE_OUT_UP | SLIDE_OUT_DOWN | SLIDE_OUT_LEFT | SLIDE_OUT_RIGHT | NONE
 *       allowHtmlMessage: true, // default false
 *       disableIcon: true, // default false
 *       customStyles: {
 *           titleCSS: 'color: #ddd; background: #333; font-size: 20px; padding: 20px',
 *           buttonSectionCSS: 'background: #333',
 *           buttonCSS: 'font-size: 14px;',
 *           textCSS: 'color: #ddd; font-size: 16px; background: #333;',
 *           wrapperCSS: 'background: #333;'
 *       }
 *    },
 *    dispatch: {  // Optional default dispatch object.
 *       title: 'Default title',
 *       message: 'Default message'
 *    },
 *    // optional predefined custom default buttons
 *    buttons     : [
 *       new ButtonMaker('Ok', 'ok', ButtonLayoutDisplay.PRIMARY),
 *       new ButtonMaker('Cancel', 'cancel', ButtonLayoutDisplay.SECONDARY)
 *    ]
 * })
 * ```
 * * confirmBoxCoreConfig: {@link IConfirmBoxCoreConfig}
 * * dispatch: {@link IDispatch}
 * * buttons: {@link IButton}
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
 *    toastCoreConfig: {
 *       // AutoClose it will be ignored if buttons are included.
 *       autoCloseDelay: 3000, // milliseconds, optional set 0 to never expires
 *       textPosition: 'right', // optional ' center', 'left', 'right'
 *       layoutType: DialogLayoutDisplay.SUCCESS, // SUCCESS | INFO | NONE | DANGER | WARNING
 *       progressBar: ToastProgressBarEnum.INCREASE, // INCREASE | DECREASE | NONE
 *       toastUserViewType: ToastUserViewTypeEnum.SIMPLE, // STANDARD | SIMPLE
 *       animationIn: AppearanceAnimation.BOUNCE_IN, // BOUNCE_IN | SWING | ZOOM_IN | ZOOM_IN_ROTATE | ELASTIC | JELLO | FADE_IN | SLIDE_IN_UP | SLIDE_IN_DOWN | SLIDE_IN_LEFT | SLIDE_IN_RIGHT | NONE
 *       animationOut: DisappearanceAnimation.BOUNCE_OUT, // BOUNCE_OUT | ZOOM_OUT | ZOOM_OUT_WIND | ZOOM_OUT_ROTATE | FLIP_OUT | SLIDE_OUT_UP | SLIDE_OUT_DOWN | SLIDE_OUT_LEFT | SLIDE_OUT_RIGHT | NONE
 *       toastPosition: ToastPositionEnum.TOP_RIGHT,  // TOP_LEFT | TOP_CENTER | TOP_RIGHT | TOP_FULL_WIDTH | BOTTOM_LEFT | BOTTOM_CENTER | BOTTOM_RIGHT | BOTTOM_FULL_WIDTH
 *       allowHtmlMessage: true,  // default false
 *       disableIcon: true, // default false
 *       buttonPosition: 'right', // optional ' center', 'left', 'right'
 *       customStyles: {
 *           titleCSS: 'background: rgba(0,0,0, .7); font-size: 20px; padding: 20px',
 *           buttonSectionCSS: 'background: #333',
 *           buttonCSS: 'font-size: 14px;',
 *           textCSS: 'color: #ddd; font-size: 16px; background: #333;'
 *         }
 *    },
 *    globalSettings: {
 *       // The number of toast notifications that can be shown at once.
 *       allowedNotificationsAtOnce: 4
 *    },
 *    // Optional default dispatch object.
 *    dispatch: {
 *      title: 'Default title',
 *      message: 'Default message'
 *   },
 *   // optional predefined custom default buttons
 *   buttons: [
 *      new ButtonMaker('Ok', 'ok', ButtonLayoutDisplay.PRIMARY),
 *      new ButtonMaker('Cancel', 'cancel', ButtonLayoutDisplay.SECONDARY)
 *   ]
 *})
 * ```
 * * toastCoreConfig: {@link IToastCoreConfig}
 * * globalSettings: {@link IGlobalToastSettings}
 * * dispatch: {@link IDispatch}
 * * buttons: {@link IButton}
 * * ButtonMaker: {@link ButtonMaker}
 * @category Imports for angular app.module
 */
export { ToastNotificationConfigModule } from './ngx-awesome-popup/ngx-awesome-popup.module';
// endregion
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljX2FwaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3B1YmxpY19hcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFNM0YsT0FBTyxFQUFFLGVBQWUsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBT25HLE9BQU8sRUFDTCx3QkFBd0IsRUFDeEIsNEJBQTRCLEVBQzdCLE1BQU0sMkRBQTJELENBQUM7QUEyQm5FLFlBQVk7QUFFWixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUVyRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx5REFBeUQsQ0FBQztBQUM1RixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx5REFBeUQsQ0FBQztBQUMvRixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5REFBeUQsQ0FBQztBQUNoRzs7O0dBR0c7QUFDSCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNyRTs7O0dBR0c7QUFDSCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN4RTs7R0FFRztBQUNILE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUV0RTs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFDSCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUU1RTs7Ozs7Ozs7R0FRRztBQUNILE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxDQUFDO0FBRXBDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtERztBQUNILE9BQU8sRUFBRSxlQUFlLEVBQUUsQ0FBQztBQXFCM0IsWUFBWTtBQUVaLDZCQUE2QjtBQUU3Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtDRztBQUNILE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxDQUFDO0FBQ3hDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1DRztBQUNILE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxDQUFDO0FBQ2pDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0REc7QUFDSCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQztBQUM3QixZQUFZO0FBRVosZ0RBQWdEO0FBQ2hEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFDSCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUNyRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbURHO0FBQ0gsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDbEY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWdERztBQUNILE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ3RGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5REc7QUFDSCxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUM3RixZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUJ1dHRvbiwgSUNvbG9yVHlwZXMsIElEaXNwYXRjaCwgSUdsb2JhbFVzZXJDb25maWcgfSBmcm9tICcuL25neC1hd2Vzb21lLXBvcHVwL2NvcmUvZ2xvYmFsLWludGVyZmFjZXMnO1xuaW1wb3J0IHsgQ29uZmlybUJveEluaXRpYWxpemVyIH0gZnJvbSAnLi9uZ3gtYXdlc29tZS1wb3B1cC90eXBlcy9jb25maXJtLWJveC9jb3JlL2NsYXNzZXMnO1xuaW1wb3J0IHtcbiAgSUNvbmZpcm1Cb3hDb3JlQ29uZmlnLFxuICBJQ29uZmlybUJveFB1YmxpY1Jlc3BvbnNlLFxuICBJQ29uZmlybUJveFVzZXJDb25maWdcbn0gZnJvbSAnLi9uZ3gtYXdlc29tZS1wb3B1cC90eXBlcy9jb25maXJtLWJveC9jb3JlL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgRGlhbG9nQmVsb25naW5nLCBEaWFsb2dJbml0aWFsaXplciB9IGZyb20gJy4vbmd4LWF3ZXNvbWUtcG9wdXAvdHlwZXMvZGlhbG9nL2NvcmUvY2xhc3Nlcyc7XG5pbXBvcnQge1xuICBJRGlhbG9nQ29yZUNvbmZpZyxcbiAgSURpYWxvZ2V2ZW50c0NvbnRyb2xsZXIsXG4gIElEaWFsb2dQdWJsaWNSZXNwb25zZSxcbiAgSURpYWxvZ1VzZXJDb25maWdcbn0gZnJvbSAnLi9uZ3gtYXdlc29tZS1wb3B1cC90eXBlcy9kaWFsb2cvY29yZS9pbnRlcmZhY2VzJztcbmltcG9ydCB7XG4gIFJlc2V0VG9hc3RHbG9iYWxTZXR0aW5ncyxcbiAgVG9hc3ROb3RpZmljYXRpb25Jbml0aWFsaXplclxufSBmcm9tICcuL25neC1hd2Vzb21lLXBvcHVwL3R5cGVzL3RvYXN0LW5vdGlmaWNhdGlvbi9jb3JlL2NsYXNzZXMnO1xuaW1wb3J0IHtcbiAgSUdsb2JhbFRvYXN0U2V0dGluZ3MsXG4gIElUb2FzdENvcmVDb25maWcsXG4gIElUb2FzdE5vdGlmaWNhdGlvblB1YmxpY1Jlc3BvbnNlLFxuICBJVG9hc3ROb3RpZmljYXRpb25Vc2VyQ29uZmlnXG59IGZyb20gJy4vbmd4LWF3ZXNvbWUtcG9wdXAvdHlwZXMvdG9hc3Qtbm90aWZpY2F0aW9uL2NvcmUvaW50ZXJmYWNlcyc7XG5cbi8vIHJlZ2lvbiAqKiogSW50ZXJmYWNlICoqKlxuZXhwb3J0IHsgSUdsb2JhbFVzZXJDb25maWcgfTtcbmV4cG9ydCB7IElCdXR0b24gfTtcbmV4cG9ydCB7IElEaXNwYXRjaCB9O1xuZXhwb3J0IHsgSUNvbG9yVHlwZXMgfTtcblxuZXhwb3J0IHsgSUNvbmZpcm1Cb3hVc2VyQ29uZmlnIH07XG5leHBvcnQgeyBJQ29uZmlybUJveENvcmVDb25maWcgfTtcbmV4cG9ydCB7IElDb25maXJtQm94UHVibGljUmVzcG9uc2UgfTtcblxuZXhwb3J0IHsgSUdsb2JhbFRvYXN0U2V0dGluZ3MgfTtcbmV4cG9ydCB7IElUb2FzdENvcmVDb25maWcgfTtcbmV4cG9ydCB7IElUb2FzdE5vdGlmaWNhdGlvblVzZXJDb25maWcgfTtcbmV4cG9ydCB7IElUb2FzdE5vdGlmaWNhdGlvblB1YmxpY1Jlc3BvbnNlIH07XG5cbmV4cG9ydCB7IElEaWFsb2dVc2VyQ29uZmlnIH07XG5leHBvcnQgeyBJRGlhbG9nQ29yZUNvbmZpZyB9O1xuZXhwb3J0IHsgSURpYWxvZ1B1YmxpY1Jlc3BvbnNlIH07XG5leHBvcnQgeyBJRGlhbG9nZXZlbnRzQ29udHJvbGxlciB9O1xuLy8gZW5kcmVnaW9uXG5cbmV4cG9ydCB7IEJ1dHRvbkxheW91dERpc3BsYXkgfSBmcm9tICcuL25neC1hd2Vzb21lLXBvcHVwL2NvcmUvZW51bXMnO1xuZXhwb3J0IHsgRGlhbG9nTGF5b3V0RGlzcGxheSB9IGZyb20gJy4vbmd4LWF3ZXNvbWUtcG9wdXAvY29yZS9lbnVtcyc7XG5leHBvcnQgeyBWZXJ0aWNhbFBvc2l0aW9uIH0gZnJvbSAnLi9uZ3gtYXdlc29tZS1wb3B1cC9jb3JlL2VudW1zJztcbmV4cG9ydCB7IFRvYXN0UG9zaXRpb25FbnVtIH0gZnJvbSAnLi9uZ3gtYXdlc29tZS1wb3B1cC90eXBlcy90b2FzdC1ub3RpZmljYXRpb24vY29yZS9lbnVtcyc7XG5leHBvcnQgeyBUb2FzdFByb2dyZXNzQmFyRW51bSB9IGZyb20gJy4vbmd4LWF3ZXNvbWUtcG9wdXAvdHlwZXMvdG9hc3Qtbm90aWZpY2F0aW9uL2NvcmUvZW51bXMnO1xuZXhwb3J0IHsgVG9hc3RVc2VyVmlld1R5cGVFbnVtIH0gZnJvbSAnLi9uZ3gtYXdlc29tZS1wb3B1cC90eXBlcy90b2FzdC1ub3RpZmljYXRpb24vY29yZS9lbnVtcyc7XG4vKipcbiAqXG4gKiAjIyBDaG9vc2UgYmV0d2VlbiBtYW55IGFwcGVhcmluZyBhbmltYXRpb25zIHRoYXQgYXJlIGF2YWlsYWJsZVxuICovXG5leHBvcnQgeyBBcHBlYXJhbmNlQW5pbWF0aW9uIH0gZnJvbSAnLi9uZ3gtYXdlc29tZS1wb3B1cC9jb3JlL2VudW1zJztcbi8qKlxuICpcbiAqICMjIENob29zZSBiZXR3ZWVuIG1hbnkgZGlzYXBwZWFyaW5nIGFuaW1hdGlvbnMgdGhhdCBhcmUgYXZhaWxhYmxlXG4gKi9cbmV4cG9ydCB7IERpc2FwcGVhcmFuY2VBbmltYXRpb24gfSBmcm9tICcuL25neC1hd2Vzb21lLXBvcHVwL2NvcmUvZW51bXMnO1xuLyoqXG4gKiBAcmV0dXJucyBJdCB3aWxsIHJldHVybiBjdXN0b20gYnV0dG9uIG9iamVjdCByZWFkeSB0byBiZSB1c2VkIGluIGNoaWxkIGNvbXBvbmVudCBsYXlvdXQuXG4gKi9cbmV4cG9ydCB7IEJ1dHRvbk1ha2VyIH0gZnJvbSAnLi9uZ3gtYXdlc29tZS1wb3B1cC9jb3JlL2dsb2JhbC1jbGFzc2VzJztcblxuLyoqXG4gKmBgYHR5cGVzY3JpcHRcbiAqIC8vIEluc3RhbnRpYXRlIGNvbmZpZyBvYmplY3QgYXMgZXhhbXBsZSBiZWxvdyB0byBjaGFuZ2UgZ2xvYmFsIHNldHRpbmdzIG9uLWZseSBpdCB0YWtlcyBJR2xvYmFsVXNlckNvbmZpZ1xuICogYXMgdGhlIGFyZ3VtZW50LlxuICogbmV3IFJlc2V0R2xvYmFsQ29uZmlnKHtcbiAqICAgICBjb2xvckxpc3Q6IHtcbiAqICAgICAgICAgICAgcHJpbWFyeSAgOiAnI2ZmOWUwMCcsIC8vIG9wdGlvbmFsIHNoYWRlIG9mIHRoZSBvdmVybGF5IGNvbG9yXG4gKiAgICAgICAgICAgIHNlY29uZGFyeTogJyM5ODllYTUnLCAvLyBvcHRpb25hbFxuICogICAgICAgICAgICBpbmZvICAgICA6ICcjMmY4ZWU1JywgLy8gb3B0aW9uYWxcbiAqICAgICAgICAgICAgc3VjY2VzcyAgOiAnIzNjYWVhMycsIC8vIG9wdGlvbmFsXG4gKiAgICAgICAgICAgIHdhcm5pbmcgIDogJyNmZmMxMDcnLCAvLyBvcHRpb25hbFxuICogICAgICAgICAgICBkYW5nZXIgICA6ICcjZTQ2NDY0JywgLy8gb3B0aW9uYWxcbiAqICAgICAgICAgICAgbGlnaHQgICAgOiAnI2ZiZmJmYicsIC8vIG9wdGlvbmFsXG4gKiAgICAgICAgICAgIGRhcmsgICAgIDogJyMzNDNhNDAnICAvLyBvcHRpb25hbFxuICogICAgICAgICAgIH1cbiAqIH0pXG4gKiBgYGBcbiAqL1xuZXhwb3J0IHsgUmVzZXRHbG9iYWxDb25maWcgfSBmcm9tICcuL25neC1hd2Vzb21lLXBvcHVwL2NvcmUvZ2xvYmFsLWNsYXNzZXMnO1xuXG4vKipcbiAqYGBgdHlwZXNjcmlwdFxuICogLy8gSW5zdGFudGlhdGUgdG9hc3QgZ2xvYmFsIGNvbmZpZyBvYmplY3QgYXMgZXhhbXBsZSBiZWxvdyB0byBjaGFuZ2UgZ2xvYmFsIHNldHRpbmdzIG9uLWZseSBpdCB0YWtlcyBJR2xvYmFsVG9hc3RTZXR0aW5nc1xuICogYXMgdGhlIGFyZ3VtZW50LlxuICogbmV3IFJlc2V0VG9hc3RHbG9iYWxTZXR0aW5ncyh7XG4gKiAgICAgYWxsb3dlZE5vdGlmaWNhdGlvbnNBdE9uY2U6IDJcbiAqIH0pXG4gKiBgYGBcbiAqL1xuZXhwb3J0IHsgUmVzZXRUb2FzdEdsb2JhbFNldHRpbmdzIH07XG5cbi8qKlxuICogVGhpcyBpcyB0aGUgY2xhc3MgdGhhdCBuZWVkcyB0byBiZSBhZGRlZCBhcyBESSBpbiB0aGUgY29uc3RydWN0b3Igb2YgYSBjaGlsZCBjb21wb25lbnQgdGhhdCB3aWxsIGJlXG4gKiBvcGVuZWQgZHluYW1pY2FsbHkgd2l0aCB7QGxpbmsgRGlhbG9nSW5pdGlhbGl6ZXJ9LiBJdCBjb250YWlucyB2YXJpb3VzIGluZm9ybWF0aW9uIG9yXG4gKiBldmVudCBjb250cm9sbGVycywgYW5kIGxpc3RlbmVycyB0aGF0IGNhbiBiZSB1c2VkIGluIGEgY2hpbGQgY29tcG9uZW50LiBBbHNvLCB0aGVyZSBpcyBjdXN0b20gZGF0YVxuICogdGhhdCBpcyBzZW50IGZyb20gY29tcG9uZW50IHdoZXJlIHRoZSB7QGxpbmsgRGlhbG9nSW5pdGlhbGl6ZXJ9IGlzLiBVc2VyIGNhbiBzZXQgc3BlY2lmaWMgdHlwZSBvZlxuICogY3VzdG9tIGRhdGEgdGhhdCBjaGlsZCBjb21wb25lbnQgd2lsbCByZWNlaXZlIGJ5IGluY2x1ZGluZyBpdCBhcyBnZW5lcmljIHR5cGUuXG4gKlxuICpcbiAqIEV4YW1wbGU6XG4gKiBgYGB0eXBlc2NyaXB0XG4gKmltcG9ydCB7RGlhbG9nQmVsb25naW5nfSBmcm9tICduZ3gtYXdlc29tZS1wb3B1cCc7XG4gKkBDb21wb25lbnQoe1xuICogICAgc2VsZWN0b3IgICA6ICdhcHAtZHluYW1pYycsXG4gKiAgICB0ZW1wbGF0ZVVybDogJy4vZHluYW1pYy5jb21wb25lbnQuaHRtbCcsXG4gKiAgICBzdHlsZVVybHMgIDogWycuL2R5bmFtaWMuY29tcG9uZW50LnNjc3MnXVxuICp9KVxuICogZXhwb3J0IGNsYXNzIER5bmFtaWNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gKlxuICogICAgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICpcbiAqICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoJ2RpYWxvZ0JlbG9uZ2luZycpIHByaXZhdGUgZGlhbG9nQmVsb25naW5nOiBEaWFsb2dCZWxvbmdpbmcpIHt9XG4gKlxuICogICAgbmdPbkluaXQoKTogdm9pZCB7XG4gKiAgICBjb25zb2xlLmxvZyh0aGlzLmRpYWxvZ0JlbG9uZ2luZyk7XG4gKlxuICogICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gKiAgICAgICAgICAgIHRoaXMuZGlhbG9nQmVsb25naW5nLmV2ZW50c0NvbnRyb2xsZXIub25CdXR0b25DbGljayQuc3Vic2NyaWJlKChfQnV0dG9uKSA9PiB7XG4gKiAgICAgICAgICAgIGlmIChfQnV0dG9uLklEID09PSAnb2snKSB7XG4gKiAgICAgICAgICAgICAgICAvLyBEbyBzb21lIGxvZ2ljIGFuZCBjbG9zZSBwb3B1cC5cbiAqICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9nQmVsb25naW5nLmV2ZW50c0NvbnRyb2xsZXIuY2xvc2UoKTtcbiAqICAgICAgICAgICAgfSBlbHNlIGlmIChfQnV0dG9uLklEID09PSAnY2FuY2VsJykge1xuICogICAgICAgICAgICAgICAgLy8gRG8gc29tZSBsb2dpYyBhbmQgY2xvc2UgcG9wdXAuXG4gKiAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ0JlbG9uZ2luZy5ldmVudHNDb250cm9sbGVyLmNsb3NlKCk7XG4gKiAgICAgICAgICAgIH1cbiAqICAgICAgICB9KVxuICogICAgICAgICk7XG4gKlxuICogICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICogICAgICAgICAgICAvLyBDbG9zZSBsb2FkZXIgYWZ0ZXIgYXN5bmMgZGF0YSBpcyByZWFkeS5cbiAqICAgICAgICAgICAgdGhpcy5kaWFsb2dCZWxvbmdpbmcuZXZlbnRzQ29udHJvbGxlci5jbG9zZUxvYWRlcigpO1xuICogICAgICAgIH0sIDEwMDApO1xuICogICAgfVxuICp9XG5cbiBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgLy8gQ2xvc2UgYWxsIHN1YnNjcmlwdGlvbnMuXG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAqIGBgYFxuICogQGNhdGVnb3J5IGNoaWxkIGR5bmFtaWMgY29tcG9uZW50IGRhdGEgJiBldmVudCBjb250cm9sbGVyXG4gKi9cbmV4cG9ydCB7IERpYWxvZ0JlbG9uZ2luZyB9O1xuXG4vLyByZWdpb24gKioqIE9ic2VydmFibGUgcmVzcG9uc2UgYWZ0ZXIgY2xvc2luZyBwb3B1cCAqKipcbi8qKlxuICogUmVndWxhciBkZXNjcmlwdGlvblxuICpcbiAqIEBjYXRlZ29yeSBPYnNlcnZhYmxlIHJlc3BvbnNlIGFmdGVyIGNsb3NpbmcgcG9wdXBcbiAqL1xuZXhwb3J0IHsgSVRvYXN0Tm90aWZpY2F0aW9uUHVibGljUmVzcG9uc2UgYXMgSVRvYXN0Tm90aWZpY2F0aW9uUmVzcG9uc2UgfTtcbi8qKlxuICogUmVndWxhciBkZXNjcmlwdGlvblxuICpcbiAqIEBjYXRlZ29yeSBPYnNlcnZhYmxlIHJlc3BvbnNlIGFmdGVyIGNsb3NpbmcgcG9wdXBcbiAqL1xuZXhwb3J0IHsgSUNvbmZpcm1Cb3hQdWJsaWNSZXNwb25zZSBhcyBJQ29uZmlybUJveFJlc3BvbnNlIH07XG4vKipcbiAqIFJlZ3VsYXIgZGVzY3JpcHRpb25cbiAqXG4gKiBAY2F0ZWdvcnkgT2JzZXJ2YWJsZSByZXNwb25zZSBhZnRlciBjbG9zaW5nIHBvcHVwXG4gKi9cbmV4cG9ydCB7IElEaWFsb2dQdWJsaWNSZXNwb25zZSBhcyBJRGlhbG9nUmVzcG9uc2UgfTtcbi8vIGVuZHJlZ2lvblxuXG4vLyByZWdpb24gKioqIFBvcHVwIG9wZW4gICoqKlxuXG4vKipcbiAqIFRoaXMgaXMgdGhlIGNsYXNzIHRoYXQgbmVlZHMgdG8gYmUgaW5zdGFudGlhdGVkIHRvIHNldCB1cCBhbmQgaWduaXRlIGEgVG9hc3ROb3RpZmljYXRpb24sXG4gKiBpdHMgcHVycG9zZSBpcyB0byBzaG93IHNob3J0IG5vdGlmaWNhdGlvbiB0byBlbmQtdXNlciwgb3IgZXZlbiBpbnRlcmFjdCB3aXRoIHVzZXIuXG4gKiBJdCBjYW4gYmUgZXZva2VkIGZyb20gYW55IGFuZ3VsYXIgdHlwZXNjcmlwdCBmaWxlLlxuICpcbiAqIEJlbG93IGlzIHRoZSBleGFtcGxlIHdpdGggKHNvbWUgb3B0aW9uYWwpIHVzZXIgY29uZmlndXJhdGlvbixcbiAqIGl0IHdpbGwgb3ZlcnJpZGUgZGVmYXVsdCBjb25maWd1cmF0aW9uIGZyb20gYXBwLm1vZHVsZS5cbiAqXG4gKlxuICogRXhhbXBsZTpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIC8vIENyZWF0ZSB0aGUgaW5pdGlhbGl6ZXIuXG4gKmNvbnN0IG5ld1RvYXN0Tm90aWZpY2F0aW9uID0gbmV3IFRvYXN0Tm90aWZpY2F0aW9uSW5pdGlhbGl6ZXIoKTtcbiAqXG4gKiAvLyBTZXQgZGVzaXJlZCBUaXRsZS5cbiAqbmV3VG9hc3ROb3RpZmljYXRpb24uc2V0VGl0bGUoJ1dhcm5pbmchJyk7XG4gKlxuICogLy8gU2V0IGRlc2lyZWQgTWVzc2FnZS5cbiAqbmV3VG9hc3ROb3RpZmljYXRpb24uc2V0TWVzc2FnZSgnRm9ybSBpcyBub3QgdmFsaWQhJyk7XG4gKlxuICogLy8gU2V0IGRlc2lyZWQgY29uZmlndXJhdGlvbi5cbiAqbmV3VG9hc3ROb3RpZmljYXRpb24uc2V0Q29uZmlnKHtcbiAqICAgICAgbGF5b3V0VHlwZTogRGlhbG9nTGF5b3V0RGlzcGxheS5XQVJOSU5HXG4gKiAgIH0pO1xuXG4gKiAvLyBPcGVuIGEgVG9hc3ROb3RpZmljYXRpb24uXG4gKiBuZXdDb25maXJtQm94Lm9wZW5Db25maXJtQm94JCgpLnN1YnNjcmliZShyZXNwID0+IHtcbiAqICAgY29uc29sZS5sb2coJ2NvbmZpcm1Cb3ggcmVzcG9uc2U6ICcsIHJlc3ApO1xuICogIH0pO1xuICogYGBgXG4gKiAqIElUb2FzdENvcmVDb25maWc6IHtAbGluayBJVG9hc3RDb3JlQ29uZmlnfVxuICogKiBsYXlvdXRUeXBlOiB7QGxpbmsgRGlhbG9nTGF5b3V0RGlzcGxheX1cbiAqICogSVRvYXN0Tm90aWZpY2F0aW9uUHVibGljUmVzcG9uc2U6IHtAbGluayBJVG9hc3ROb3RpZmljYXRpb25QdWJsaWNSZXNwb25zZX1cbiAqIEBjYXRlZ29yeSBQb3B1cCBvcGVuXG4gKi9cbmV4cG9ydCB7IFRvYXN0Tm90aWZpY2F0aW9uSW5pdGlhbGl6ZXIgfTtcbi8qKlxuICogVGhpcyBpcyB0aGUgY2xhc3MgdGhhdCBuZWVkcyB0byBiZSBpbnN0YW50aWF0ZWQgdG8gc2V0IHVwIGFuZCBpZ25pdGUgYSBDb25maXJtQm94IGFuZCBjcmVhdGUgY29udGVudC5cbiAqIEl0cyBwdXJwb3NlIGlzIHRvIGdldCBjb25maXJtYXRpb24gcmVzcG9uc2UgZnJvbSBlbmQtdXNlci4gSXQgY2FuIGJlIGNhbGxlZCBmcm9tIGFueSBhbmd1bGFyXG4gKiB0eXBlc2NyaXB0IGZpbGUuXG4gKlxuICogQmVsb3cgaXMgZXhhbXBsZSB3aXRoIChzb21lIG9wdGlvbmFsKSB1c2VyIGNvbmZpZ3VyYXRpb24sXG4gKiBpdCB3aWxsIG92ZXJyaWRlIGRlZmF1bHQgY29uZmlndXJhdGlvbiBmcm9tIGFwcC5tb2R1bGUuXG4gKlxuICpcbiAqIEV4YW1wbGU6XG4gKiBgYGB0eXBlc2NyaXB0XG4gKiAvLyBDcmVhdGUgdGhlIGluaXRpYWxpemVyLlxuICpjb25zdCBuZXdDb25maXJtQm94ID0gbmV3IENvbmZpcm1Cb3hJbml0aWFsaXplcigpO1xuICpcbiAqIC8vIFNldCBkZXNpcmVkIGRpc3BhdGNoOiBfVGl0bGU6IHN0cmluZywgX01lc3NhZ2U6IHN0cmluZy5cbiAqbmV3Q29uZmlybUJveC5zZXREaXNwYXRjaCgnQXJlIHlvdSBzdXJlPycsICdUaGF0IGFjdGlvbiB3aWxsIGRlbGV0ZSB1c2VyIScpO1xuICpcbiAqIC8vIFNldCBkZXNpcmVkIGNvbmZpZ3VyYXRpb24uXG4gKm5ld0NvbmZpcm1Cb3guc2V0Q29uZmlnKHtcbiAqICAgICAgbGF5b3V0VHlwZTogRGlhbG9nTGF5b3V0RGlzcGxheS5EQU5HRVJcbiAqICAgfSk7XG4gKlxuICogLy8gU2V0IGJ1dHRvbiBsYWJlbHMuXG4gKiBuZXdDb25maXJtQm94LnNldEJ1dHRvbkxhYmVscygnWUVTJywgJ05PJyk7XG4gKlxuICogLy8gT3BlbiBhIENvbmZpcm1Cb3gsIGFuZCBnZXQgY2xpY2tlZCBidXR0b24taWQgaW4gcmVzcG9uc2UuXG4gKiBuZXdDb25maXJtQm94Lm9wZW5Db25maXJtQm94JCgpLnN1YnNjcmliZShyZXNwID0+IHtcbiAqICAgLy8gSUNvbmZpcm1Cb3hQdWJsaWNSZXNwb25zZVxuICogICBjb25zb2xlLmxvZygnY29uZmlybUJveCByZXNwb25zZTogJywgcmVzcCk7XG4gKiAgfSk7XG4gKiBgYGBcbiAqICogSUNvbmZpcm1Cb3hDb3JlQ29uZmlnOiB7QGxpbmsgSUNvbmZpcm1Cb3hDb3JlQ29uZmlnfVxuICogKiBsYXlvdXRUeXBlOiB7QGxpbmsgRGlhbG9nTGF5b3V0RGlzcGxheX1cbiAqICogSUNvbmZpcm1Cb3hQdWJsaWNSZXNwb25zZToge0BsaW5rIElDb25maXJtQm94UHVibGljUmVzcG9uc2V9XG4gKiBAY2F0ZWdvcnkgUG9wdXAgb3BlblxuICovXG5leHBvcnQgeyBDb25maXJtQm94SW5pdGlhbGl6ZXIgfTtcbi8qKlxuICogVGhpcyBpcyB0aGUgY2xhc3MgdGhhdCBuZWVkcyB0byBiZSBpbnN0YW50aWF0ZWQgdG8gc2V0IHVwIGFuZCBpZ25pdGUgYSBEaWFsb2cgYW5kIGNyZWF0ZSBkeW5hbWljIGNvbXBvbmVudCxcbiAqIGl0cyBwdXJwb3NlIGlzIHRvIHJlbmRlciBhbnkgYW5ndWxhciBjb21wb25lbnQgdmlldyB3aXRoIHNwZWNpZmljIGNvbmZpZ3VyYXRpb24gZnJvbSBhbnkgYW5ndWxhciB0eXBlc2NyaXB0IGZpbGUuXG4gKiBEeW5hbWljIGNvbXBvbmVudCBtZWFucyB0aGF0IHVzZXIgY2FuIGV2b2tlIHRoZSBwb3B1cCBmcm9tIHR5cGVzY3JpcHQgYW5kIGNvbXBvbmVudCB2aWV3XG4gKiBpcyBkeW5hbWljYWxseSBjcmVhdGVkIHdpdGggdGhlIEF3ZXNvbWUgUG9wdXAgZW5naW5lLiBUaGVyZSBpcyBubyBuZWVkIHRvIGNhbGwgYW55IHNlbGVjdG9yIGluIEhUTUwgdG8gY3JlYXRlIGNvbXBvbmVudCB2aWV3LlxuICpcbiAqIERpYWxvZ0luaXRpYWxpemVyIGNhbiBzZW5kIGRhdGEgdG8gY2hpbGQgY29tcG9uZW50IChkeW5hbWljIGNvbXBvbmVudCkgd2hlcmUgZGF0YSB3aWxsIGJlIGFjY2Vzc2libGUgd2l0aCB7QGxpbmsgRGlhbG9nQmVsb25naW5nfS5cbiAqXG4gKiBCZWxvdyBpcyB0aGUgZXhhbXBsZSB3aXRoIChzb21lIG9wdGlvbmFsKSB1c2VyIGNvbmZpZ3VyYXRpb24sXG4gKiBpdCB3aWxsIG92ZXJyaWRlIGRlZmF1bHQgY29uZmlndXJhdGlvbiBmcm9tIGFwcC5tb2R1bGUuXG4gKlxuICpcbiAqIEV4YW1wbGU6XG4gKiBgYGB0eXBlc2NyaXB0XG4gKiAgaW1wb3J0IHtEaWFsb2dJbml0aWFsaXplciwgRGlhbG9nTGF5b3V0RGlzcGxheSwgQnV0dG9uTWFrZXIsIEJ1dHRvbkxheW91dERpc3BsYXl9IGZyb20gJ25neC1hd2Vzb21lLXBvcHVwJztcbiAqICBpbXBvcnQge0R5bmFtaWNDb21wb25lbnR9IGZyb20gJy4vZHluYW1pYy9keW5hbWljLmNvbXBvbmVudCc7XG4gKlxuICogIGNvbnN0IG5ld0RpYWxvZ1BvcHVwID0gbmV3IERpYWxvZ0luaXRpYWxpemVyKER5bmFtaWNDb21wb25lbnQpOyAvLyBBbnkgQW5ndWxhciBjb21wb25lbnQuXG4gKlxuICogIC8vIEN1c3RvbSBkYXRhIHdpbGwgYmUgc2VudCB0byBkeW5hbWljIGNvbXBvbmVudCBhdmFpbGFibGUgaW4gZGlhbG9nQmVsb25naW5nIG9iamVjdC5cbiAqICBuZXdEaWFsb2dQb3B1cC5zZXRDdXN0b21EYXRhKHtuYW1lOiAnSm9obicsIHN1cm5hbWU6ICdEb2UnLCBpZDogMX0pO1xuICpcbiAqICAvLyBMb2NhbCBjb25maWcgc2V0dGluZ3MgSURpYWxvZ0NvcmVDb25maWcuXG4gKiAgbmV3RGlhbG9nUG9wdXAuc2V0Q29uZmlnKHtcbiAqICAgICAgbGF5b3V0VHlwZTogRGlhbG9nTGF5b3V0RGlzcGxheS5JTkZPLCAvLyBTVUNDRVNTIHwgSU5GTyB8IE5PTkUgfCBEQU5HRVIgfCBXQVJOSU5HXG4gKiAgICAgIGhlaWdodDogJzUwMHB4JywgIC8vIG9wdGlvbmFsXG4gKiAgICAgIC8vIG1heEhlaWdodDogJzYwMHB4JywgIC8vIG9wdGlvbmFsXG4gKiAgICAgIC8vIG1pbkhlaWdodDogJzIwMHB4JywgIC8vIG9wdGlvbmFsXG4gKiAgICAgIC8vIHdpZHRoOiAnNTAwcHgnLCAvLyBvcHRpb25hbFxuICogICAgICAvLyBtYXhXaWR0aDogJzYwMHB4JywgLy8gb3B0aW9uYWxcbiAqICAgICAgLy8gbWluV2lkdGg6ICcyMDBweCcsIC8vIG9wdGlvbmFsXG4gKiAgICAgIC8vIGhpZGVTY3JvbGxiYXI6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIGZhbHNlXG4gKiAgICAgIC8vIGZ1bGxTY3JlZW46IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIGZhbHNlXG4gKiAgICAgIC8vIGVzY2FwZUtleUNsb3NlOiB0cnVlLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxuICogICAgICAvLyBidXR0b25Qb3NpdGlvbjogXCJsZWZ0XCIsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIFwicmlnaHRcIlxuICogICAgICAvLyBsb2FkZXJDb21wb25lbnQ6IEFueSBBbmd1bGFyIGNvbXBvbmVudCxcbiAqICAgICAgLy8gY3VzdG9tU3R5bGVzOiB7XG4gKiAgICAgIC8vICAgICBidXR0b25TZWN0aW9uQ1NTOiAnYmFja2dyb3VuZDogIzMzMycsXG4gKiAgICAgIC8vICAgICBidXR0b25DU1M6ICdmb250LXNpemU6IDMwcHg7JyxcbiAqICAgICAgLy8gICAgIHdyYXBwZXJDU1M6ICdiYWNrZ3JvdW5kOiAjMzMzOydcbiAqICAgICAgLy8gICB9XG4gKiAgIH0pO1xuICpcbiAqICAvLyBDdXN0b20gYnV0dG9ucywgbGlzdGVuZXIgaXMgYXZhaWxhYmxlIGluIGNoaWxkIGNvbXBvbmVudCBpbiBkaWFsb2dCZWxvbmdpbmcgb2JqZWN0LlxuICogIG5ld0RpYWxvZ1BvcHVwLnNldEJ1dHRvbnMoW1xuICogICAgICBuZXcgQnV0dG9uTWFrZXIoJ09rJywgJ29rJywgQnV0dG9uTGF5b3V0RGlzcGxheS5QUklNQVJZKSxcbiAqICAgICAgbmV3IEJ1dHRvbk1ha2VyKCdDYW5jZWwnLCAnY2FuY2VsJywgQnV0dG9uTGF5b3V0RGlzcGxheS5TRUNPTkRBUlkpIC8vIFNVQ0NFU1MgfCBJTkZPIHwgTk9ORSB8IERBTkdFUiB8IFdBUk5JTkcgfCBQUklNQVJZIHwgU0VDT05EQVJZIHwgTElOSyB8IERBUksgfCBMSUdIVFxuICogIF0pO1xuICpcbiAqICAvLyBDb21tYW5kIHRvIG9wZW4gZGlhbG9nLCBpdCByZXR1cm5zIG9ic2VydmFibGUuXG4gKiAgbmV3RGlhbG9nUG9wdXAub3BlbkRpYWxvZyQ8YW55PigpLnN1YnNjcmliZShyZXNwID0+IHtcbiAqICAgICAgICAgICBjb25zb2xlLmxvZygncmVzcG9uc2U6ICcsIHJlc3AuUGF5bG9hZCk7XG4gKiAgICAgICB9KTtcbiAqIGBgYFxuICogKiBJRGlhbG9nQ29yZUNvbmZpZzoge0BsaW5rIElEaWFsb2dDb3JlQ29uZmlnfVxuICogKiBsYXlvdXRUeXBlOiB7QGxpbmsgRGlhbG9nTGF5b3V0RGlzcGxheX1cbiAqICogQnV0dG9uTGF5b3V0RGlzcGxheToge0BsaW5rIEJ1dHRvbkxheW91dERpc3BsYXl9XG4gKiAqIEJ1dHRvbk1ha2VyOiB7QGxpbmsgQnV0dG9uTWFrZXJ9XG4gKiAqIElEaWFsb2dQdWJsaWNSZXNwb25zZToge0BsaW5rIElEaWFsb2dQdWJsaWNSZXNwb25zZX1cbiAqIEBjYXRlZ29yeSBQb3B1cCBvcGVuXG4gKi9cbmV4cG9ydCB7IERpYWxvZ0luaXRpYWxpemVyIH07XG4vLyBlbmRyZWdpb25cblxuLy8gcmVnaW9uICoqKiBJbXBvcnRzIGZvciBhbmd1bGFyIGFwcC5tb2R1bGUgKioqXG4vKipcbiAqIFRoaXMgaXMgdGhlIG1haW4gbW9kdWxlIG9mIHRoZSBsaWJyYXJ5LCBpdCBpcyBjcnVjaWFsIHRvIGJlIGFkZGVkIHdpdGhpbiBhbmd1bGFyLmFwcFxuICogaW1wb3J0cyBhcyBhbiBleGFtcGxlIHdpdGggb3B0aW9uYWwgYXJndW1lbnQsIGxvb2s6IHtAbGluayBJR2xvYmFsVXNlckNvbmZpZ31cbiAqIFN0eWxlIHlvdXIgYXBwbGljYXRpb24gYnkgYWRkaW5nIGEgY29sb3IgbGlzdCBsaWtlIGluIHRoaXMgZXhhbXBsZS5cbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiAvLyBhcHAubW9kdWxlIGltcG9ydHM6XG4gKiBOZ3hBd2Vzb21lUG9wdXBNb2R1bGUuZm9yUm9vdCh7XG4gKiAgICAgY29sb3JMaXN0OiB7XG4gKiAgICAgICAgICAgIHByaW1hcnkgIDogJyNmZjllMDAnLCAvLyBvcHRpb25hbFxuICogICAgICAgICAgICBzZWNvbmRhcnk6ICcjOTg5ZWE1JywgLy8gb3B0aW9uYWxcbiAqICAgICAgICAgICAgaW5mbyAgICAgOiAnIzJmOGVlNScsIC8vIG9wdGlvbmFsXG4gKiAgICAgICAgICAgIHN1Y2Nlc3MgIDogJyMzY2FlYTMnLCAvLyBvcHRpb25hbFxuICogICAgICAgICAgICB3YXJuaW5nICA6ICcjZmZjMTA3JywgLy8gb3B0aW9uYWxcbiAqICAgICAgICAgICAgZGFuZ2VyICAgOiAnI2U0NjQ2NCcsIC8vIG9wdGlvbmFsXG4gKiAgICAgICAgICAgIGxpZ2h0ICAgIDogJyNmYmZiZmInLCAvLyBvcHRpb25hbFxuICogICAgICAgICAgICBkYXJrICAgICA6ICcjMzQzYTQwJyAgLy8gb3B0aW9uYWxcbiAqICAgICAgICAgICB9XG4gKiB9KVxuICogYGBgXG4gKiBAY2F0ZWdvcnkgSW1wb3J0cyBmb3IgYW5ndWxhciBhcHAubW9kdWxlXG4gKi9cbmV4cG9ydCB7IE5neEF3ZXNvbWVQb3B1cE1vZHVsZSB9IGZyb20gJy4vbmd4LWF3ZXNvbWUtcG9wdXAvbmd4LWF3ZXNvbWUtcG9wdXAubW9kdWxlJztcbi8qKlxuICogVGhpcyBpcyB0aGUgbW9kdWxlIHRoYXQgaWduaXRlcyBkeW5hbWljIGRpYWxvZyBtb2RhbCwgaXRzIHB1cnBvc2UgaXMgdG8gbG9hZCBhbnkgYW5ndWxhciBjb21wb25lbnQgaW5cbiAqIGRpYWxvZyB3aW5kb3cuIER5bmFtaWMgY29tcG9uZW50IG1lYW5zIHRoYXQgdXNlciBjYW4gZXZva2UgYW55IEFuZ3VsYXIgY29tcG9uZW50IGluIHRoZSBwb3B1cCBqdXN0IGZyb20gdHlwZXNjcmlwdC4gQ29tcG9uZW50IHZpZXdcbiAqIGlzIGR5bmFtaWNhbGx5IGNyZWF0ZWQgd2l0aCB0aGUgbGlicmFyeSBlbmdpbmUgYW5kIHRoZXJlIGlzIG5vIG5lZWQgdG8gY2FsbCBhbnkgc2VsZWN0b3IgaW4gSFRNTCB0byBjcmVhdGUgY29tcG9uZW50IHZpZXcuXG4gKlxuICogSXQgaXMgY3J1Y2lhbCBmb3IgdXNlciB0byBhZGQgdGhpcyBtb2R1bGUgaW4gYW5ndWxhci5hcHAgaW1wb3J0cy5cbiAqIEJlbG93IGlzIHRoZSBleGFtcGxlIHdpdGggKG9wdGlvbmFsKSBkZWZhdWx0IHVzZXIgY29uZmlndXJhdGlvbiwgdGhhdCBpcyB3aGF0IHdpbGwgYmUgaW4gc2V0dXAgaWYgdGhlcmUgaXMgbm9cbiAqIGxvY2FsIGNvbmZpZyB3aGVuIHBvcHVwIGlzIGV2b2tlZCwgdGhhdCBtZWFucyBpdCBjYW4gYmUgb3ZlcnJpZGRlbiBkaXJlY3RseSB3aGVuIHBvcHVwIGlzIGNhbGxlZC5cbiAqIFRoYXQgbWVhbiBpdCdzIHByZWRlZmluZWQgY29uZmlnLCBzbyBpdCBkb2Vzbid0IG5lZWQgdG8gYmUgY29uZmlndXJlZCBlYWNoIHRpbWUgd2hlbiBkaWFsb2cgaXMgZXZva2VkLlxuICogRm9yIGltcGxlbWVudGF0aW9uIGxvb2s6IHtAbGluayBJRGlhbG9nVXNlckNvbmZpZ30uXG4gKlxuICogRXhhbXBsZTpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIC8vIGFwcC5tb2R1bGUgaW1wb3J0czpcbiAqRGlhbG9nQ29uZmlnTW9kdWxlLmZvclJvb3Qoe1xuICogICAgIGRpYWxvZ0NvcmVDb25maWc6IHtcbiAqICAgICAgICB3aWR0aCAgICAgICAgICA6ICc1MDBweCcsXG4gKiAgICAgICAgLy8gbWluV2lkdGggICAgICAgOiAnMzAwcHgnLCAgLy8gZXhhbXBsZVxuICogICAgICAgIC8vIG1heFdpZHRoICAgICAgIDogJzcwMHB4JywgIC8vIGV4YW1wbGVcbiAqICAgICAgICBoZWlnaHQgICAgICAgICA6ICc1MDBweCcsXG4gKiAgICAgICAgLy8gbWluSGVpZ2h0ICAgICAgOiAnMTAwdmgnLCAgLy8gZXhhbXBsZVxuICogICAgICAgIC8vIG1heEhlaWdodCAgICAgIDogJzEwMHB4JywgIC8vIGV4YW1wbGVcbiAqICAgICAgICBidXR0b25Qb3NpdGlvbjogJ3JpZ2h0JywgLy8gb3B0aW9uYWwgJyBjZW50ZXInLCAnbGVmdCcsICdyaWdodCdcbiAqICAgICAgICBsYXlvdXRUeXBlOiBEaWFsb2dMYXlvdXREaXNwbGF5LklORk8sIC8vIFNVQ0NFU1MgfCBJTkZPIHwgTk9ORSB8IERBTkdFUiB8IFdBUk5JTkdcbiAqICAgICAgICBsb2FkZXJDb21wb25lbnQ6IC8vIEFueSBhbmd1bGFyIGNvbXBvbmVudCBjbGFzcyBuYW1lIGNhbiBiZSBpbmNsdWRlZCBhcyBhIGxvYWRlci5cbiAqICAgICAgICBoaWRlU2Nyb2xsYmFyICA6IHRydWUsXG4gKiAgICAgICAgZXNjYXBlS2V5Q2xvc2UgOiB0cnVlLFxuICogICAgICAgIC8vIEZ1bGxTY3JlZW4gOiB0cnVlLFxuICogICAgICAgIGJ1dHRvblBvc2l0aW9uIDogJ3JpZ2h0JyxcbiAqICAgICAgICBsYXlvdXRUeXBlOiBEaWFsb2dMYXlvdXREaXNwbGF5LklORk8sXG4gKiAgICAgICAgLy8gTG9hZGVyQ29tcG9uZW50OiAvLyBBbnkgQW5ndWxhciBjb21wb25lbnQgY2xhc3MgbmFtZSBjYW4gYmUgaW5jbHVkZWQgYXMgYSBsb2FkZXIuXG4gKiAgICAgICAgZGlzcGxheUxvYWRlcjogZmFsc2UgLy8gVGhpcyB3aWxsIG92ZXJyaWRlIExvYWRlckNvbXBvbmVudC5cbiAqICAgICAgICBhbmltYXRpb25JbjogQXBwZWFyYW5jZUFuaW1hdGlvbi5CT1VOQ0VfSU4sIC8vIEJPVU5DRV9JTiB8IFNXSU5HIHwgWk9PTV9JTiB8IFpPT01fSU5fUk9UQVRFIHwgRUxBU1RJQyB8IEpFTExPIHwgRkFERV9JTiB8IFNMSURFX0lOX1VQIHwgU0xJREVfSU5fRE9XTiB8IFNMSURFX0lOX0xFRlQgfCBTTElERV9JTl9SSUdIVCB8IE5PTkVcbiAqICAgICAgICBhbmltYXRpb25PdXQ6IERpc2FwcGVhcmFuY2VBbmltYXRpb24uQk9VTkNFX09VVCwgLy8gQk9VTkNFX09VVCB8IFpPT01fT1VUIHwgWk9PTV9PVVRfV0lORCB8IFpPT01fT1VUX1JPVEFURSB8IEZMSVBfT1VUIHwgU0xJREVfT1VUX1VQIHwgU0xJREVfT1VUX0RPV04gfCBTTElERV9PVVRfTEVGVCB8IFNMSURFX09VVF9SSUdIVCB8IE5PTkVcbiAqICAgICAgICBjdXN0b21TdHlsZXM6IHtcbiAqICAgICAgICAgIGJ1dHRvblNlY3Rpb25DU1M6ICdiYWNrZ3JvdW5kOiAjMzMzJyxcbiAqICAgICAgICAgIGJ1dHRvbkNTUzogJ2ZvbnQtc2l6ZTogMzBweDsnLFxuICogICAgICAgICAgd3JhcHBlckNTUzogJ2JhY2tncm91bmQ6ICMzMzM7J1xuICogICAgICAgIH1cbiAqICAgIH0sXG4gKiAgICAvLyBvcHRpb25hbCBwcmVkZWZpbmVkIGN1c3RvbSBkZWZhdWx0IGJ1dHRvbnNcbiAqICAgICBidXR0b25zOiBbXG4gKiAgICAgICAgbmV3IEJ1dHRvbk1ha2VyKCdPaycsICdvaycsIEJ1dHRvbkxheW91dERpc3BsYXkuUFJJTUFSWSksXG4gKiAgICAgICAgbmV3IEJ1dHRvbk1ha2VyKCdDYW5jZWwnLCAnY2FuY2VsJywgQnV0dG9uTGF5b3V0RGlzcGxheS5TRUNPTkRBUlkpXG4gKiAgICAgXSxcbiAqIH0pXG4gKiBgYGBcbiAqICogZGlhbG9nQ29yZUNvbmZpZy5sYXlvdXRUeXBlOiB7QGxpbmsgRGlhbG9nTGF5b3V0RGlzcGxheX1cbiAqICogQnV0dG9uTGF5b3V0RGlzcGxheToge0BsaW5rIEJ1dHRvbkxheW91dERpc3BsYXl9XG4gKiAqIEJ1dHRvbk1ha2VyOiB7QGxpbmsgQnV0dG9uTWFrZXJ9XG4gKiBAY2F0ZWdvcnkgSW1wb3J0cyBmb3IgYW5ndWxhciBhcHAubW9kdWxlXG4gKi9cbmV4cG9ydCB7IERpYWxvZ0NvbmZpZ01vZHVsZSB9IGZyb20gJy4vbmd4LWF3ZXNvbWUtcG9wdXAvbmd4LWF3ZXNvbWUtcG9wdXAubW9kdWxlJztcbi8qKlxuICogVGhpcyBpcyB0aGUgbW9kdWxlIHRoYXQgaWduaXRlcyBDb25maXJtIGJveCBkaWFsb2csIGl0cyBwdXJwb3NlIGlzIHRvIHNob3cgcG9wdXAgaW4gYVxuICogc21hbGwgZGlhbG9nIHdpbmRvdyBpbiB0aGUgbWlkZGxlIG9mIHRoZSBzY3JlZW4uIFVzZXIgY2FuIHByb3ZpZGUgdGl0bGUsIG1lc3NhZ2UgYW5kIGluY2x1ZGUgYnV0dG9ucy5cbiAqIENvbmZpcm0gYm94IGlzIGF2YWlsYWJsZSBpbiBwcmVkZWZpbmVkIGxheW91dCB0eXBlcyAoZW51bXMpOiB7QGxpbmsgRGlhbG9nTGF5b3V0RGlzcGxheX0uXG4gKlxuICogSXQgaXMgY3J1Y2lhbCBmb3IgdXNlciB0byBhZGQgdGhpcyBtb2R1bGUgaW4gYW5ndWxhci5hcHAgaW1wb3J0cy5cbiAqIEJlbG93IGlzIHRoZSBleGFtcGxlIHdpdGggKG9wdGlvbmFsKSBkZWZhdWx0IHVzZXIgY29uZmlndXJhdGlvbiwgdGhhdCdzIHdoYXQgd2lsbCBiZSB1c2VkIGlmIHRoZXJlIGlzIG5vXG4gKiBsb2NhbCBjb25maWcgd2hlbiBwb3B1cCBpcyBldm9rZWQsIHRoYXQgbWVhbnMgaXQgY2FuIGJlIG92ZXJyaWRkZW4gZGlyZWN0bHkgd2hlbiBwb3B1cCBpcyBldm9rZWQuXG4gKiBUaGF0IG1lYW4gaXQncyBwcmVkZWZpbmVkIGNvbmZpZywgc28gaXQgZG9lc24ndCBuZWVkIHRvIGJlIGNvbmZpZ3VyZWQgZWFjaCB0aW1lIHdoZW4gY29uZmlybSBib3ggaXMgZXZva2VkLlxuICogRm9yIGltcGxlbWVudGF0aW9uIGxvb2s6IHtAbGluayBJQ29uZmlybUJveFVzZXJDb25maWd9LlxuICpcbiAqIEV4YW1wbGU6XG4gKiBgYGB0eXBlc2NyaXB0XG4gKiAvLyBhcHAubW9kdWxlIGltcG9ydHM6XG4gKkNvbmZpcm1Cb3hDb25maWdNb2R1bGUuZm9yUm9vdCh7XG4gKiAgICBjb25maXJtQm94Q29yZUNvbmZpZzoge1xuICogICAgICAgd2lkdGg6ICc3MDBweCcsXG4gKiAgICAgICBsYXlvdXRUeXBlOiBEaWFsb2dMYXlvdXREaXNwbGF5LkRBTkdFUixcbiAqICAgICAgIGJ1dHRvblBvc2l0aW9uOiAnY2VudGVyJywgLy8gb3B0aW9uYWwgJyBjZW50ZXInLCAnbGVmdCcsICdyaWdodCdcbiAqICAgICAgIGxheW91dFR5cGU6IERpYWxvZ0xheW91dERpc3BsYXkuU1VDQ0VTUywgLy8gU1VDQ0VTUyB8IElORk8gfCBOT05FIHwgREFOR0VSIHwgV0FSTklOR1xuICogICAgICAgYW5pbWF0aW9uSW46IEFwcGVhcmFuY2VBbmltYXRpb24uQk9VTkNFX0lOLCAvLyBCT1VOQ0VfSU4gfCBTV0lORyB8IFpPT01fSU4gfCBaT09NX0lOX1JPVEFURSB8IEVMQVNUSUMgfCBKRUxMTyB8IEZBREVfSU4gfCBTTElERV9JTl9VUCB8IFNMSURFX0lOX0RPV04gfCBTTElERV9JTl9MRUZUIHwgU0xJREVfSU5fUklHSFQgfCBOT05FXG4gKiAgICAgICBhbmltYXRpb25PdXQ6IERpc2FwcGVhcmFuY2VBbmltYXRpb24uQk9VTkNFX09VVCwgLy8gQk9VTkNFX09VVCB8IFpPT01fT1VUIHwgWk9PTV9PVVRfV0lORCB8IFpPT01fT1VUX1JPVEFURSB8IEZMSVBfT1VUIHwgU0xJREVfT1VUX1VQIHwgU0xJREVfT1VUX0RPV04gfCBTTElERV9PVVRfTEVGVCB8IFNMSURFX09VVF9SSUdIVCB8IE5PTkVcbiAqICAgICAgIGFsbG93SHRtbE1lc3NhZ2U6IHRydWUsIC8vIGRlZmF1bHQgZmFsc2VcbiAqICAgICAgIGRpc2FibGVJY29uOiB0cnVlLCAvLyBkZWZhdWx0IGZhbHNlXG4gKiAgICAgICBjdXN0b21TdHlsZXM6IHtcbiAqICAgICAgICAgICB0aXRsZUNTUzogJ2NvbG9yOiAjZGRkOyBiYWNrZ3JvdW5kOiAjMzMzOyBmb250LXNpemU6IDIwcHg7IHBhZGRpbmc6IDIwcHgnLFxuICogICAgICAgICAgIGJ1dHRvblNlY3Rpb25DU1M6ICdiYWNrZ3JvdW5kOiAjMzMzJyxcbiAqICAgICAgICAgICBidXR0b25DU1M6ICdmb250LXNpemU6IDE0cHg7JyxcbiAqICAgICAgICAgICB0ZXh0Q1NTOiAnY29sb3I6ICNkZGQ7IGZvbnQtc2l6ZTogMTZweDsgYmFja2dyb3VuZDogIzMzMzsnLFxuICogICAgICAgICAgIHdyYXBwZXJDU1M6ICdiYWNrZ3JvdW5kOiAjMzMzOydcbiAqICAgICAgIH1cbiAqICAgIH0sXG4gKiAgICBkaXNwYXRjaDogeyAgLy8gT3B0aW9uYWwgZGVmYXVsdCBkaXNwYXRjaCBvYmplY3QuXG4gKiAgICAgICB0aXRsZTogJ0RlZmF1bHQgdGl0bGUnLFxuICogICAgICAgbWVzc2FnZTogJ0RlZmF1bHQgbWVzc2FnZSdcbiAqICAgIH0sXG4gKiAgICAvLyBvcHRpb25hbCBwcmVkZWZpbmVkIGN1c3RvbSBkZWZhdWx0IGJ1dHRvbnNcbiAqICAgIGJ1dHRvbnMgICAgIDogW1xuICogICAgICAgbmV3IEJ1dHRvbk1ha2VyKCdPaycsICdvaycsIEJ1dHRvbkxheW91dERpc3BsYXkuUFJJTUFSWSksXG4gKiAgICAgICBuZXcgQnV0dG9uTWFrZXIoJ0NhbmNlbCcsICdjYW5jZWwnLCBCdXR0b25MYXlvdXREaXNwbGF5LlNFQ09OREFSWSlcbiAqICAgIF1cbiAqIH0pXG4gKiBgYGBcbiAqICogY29uZmlybUJveENvcmVDb25maWc6IHtAbGluayBJQ29uZmlybUJveENvcmVDb25maWd9XG4gKiAqIGRpc3BhdGNoOiB7QGxpbmsgSURpc3BhdGNofVxuICogKiBidXR0b25zOiB7QGxpbmsgSUJ1dHRvbn1cbiAqICogQnV0dG9uTWFrZXI6IHtAbGluayBCdXR0b25NYWtlcn1cbiAqIEBjYXRlZ29yeSBJbXBvcnRzIGZvciBhbmd1bGFyIGFwcC5tb2R1bGVcbiAqL1xuZXhwb3J0IHsgQ29uZmlybUJveENvbmZpZ01vZHVsZSB9IGZyb20gJy4vbmd4LWF3ZXNvbWUtcG9wdXAvbmd4LWF3ZXNvbWUtcG9wdXAubW9kdWxlJztcbi8qKlxuICogVGhpcyBpcyB0aGUgbW9kdWxlIHRoYXQgaWduaXRlcyBUb2FzdCBub3RpZmljYXRpb25zIGRpYWxvZywgaXRzIHB1cnBvc2UgaXMgdG8gc2hvdyB0b2FzdCBwb3B1cCBpbiBhXG4gKiBzbWFsbCBkaWFsb2cgd2luZG93IGluIHRoZSBjb3JuZXIgb2YgdGhlIHNjcmVlbi4gVXNlciBjYW4gcHJvdmlkZSB0aXRsZSBhbmQgbWVzc2FnZSBhbmQgaW5jbHVkZSBidXR0b25zLCBvciBzZXR1cCBhdXRvIGRpc2FwcGVhcmluZy5cbiAqIFRvYXN0IG5vdGlmaWNhdGlvbnMgYXJlIGF2YWlsYWJsZSBpbiBwcmVkZWZpbmVkIGxheW91dCB0eXBlcyAoZW51bXMpOiB7QGxpbmsgRGlhbG9nTGF5b3V0RGlzcGxheX0uXG4gKlxuICogSXQgaXMgY3J1Y2lhbCBmb3IgdXNlciB0byBhZGQgdGhpcyBtb2R1bGUgaW4gYW5ndWxhci5hcHAgaW1wb3J0cy5cbiAqIEJlbG93IGlzIHRoZSBleGFtcGxlIHdpdGggKG9wdGlvbmFsKSBkZWZhdWx0IHVzZXIgY29uZmlndXJhdGlvbiwgdGhhdCdzIHdoYXQgd2lsbCBiZSB1c2VkIGlmIHRoZXJlIGlzIG5vXG4gKiBsb2NhbCBjb25maWcgd2hlbiBwb3B1cCBpcyBldm9rZWQsIHRoYXQgbWVhbnMgaXQgY2FuIGJlIG92ZXJyaWRkZW4gZGlyZWN0bHkgd2hlbiBwb3B1cCBpcyBldm9rZWQuXG4gKiBUaGF0IG1lYW4gaXQncyBwcmVkZWZpbmVkIGNvbmZpZywgc28gaXQgZG9lc24ndCBuZWVkIHRvIGJlIGNvbmZpZ3VyZWQgZWFjaCB0aW1lIHdoZW4gdG9hc3QgaXMgZXZva2VkLlxuICogRm9yIGltcGxlbWVudGF0aW9uIGxvb2s6IHtAbGluayBJVG9hc3ROb3RpZmljYXRpb25Vc2VyQ29uZmlnfS5cbiAqXG4gKiBFeGFtcGxlOlxuICogYGBgdHlwZXNjcmlwdFxuICogLy8gYXBwLm1vZHVsZSBpbXBvcnRzOlxuICpUb2FzdE5vdGlmaWNhdGlvbkNvbmZpZ01vZHVsZS5mb3JSb290KHtcbiAqICAgIHRvYXN0Q29yZUNvbmZpZzoge1xuICogICAgICAgLy8gQXV0b0Nsb3NlIGl0IHdpbGwgYmUgaWdub3JlZCBpZiBidXR0b25zIGFyZSBpbmNsdWRlZC5cbiAqICAgICAgIGF1dG9DbG9zZURlbGF5OiAzMDAwLCAvLyBtaWxsaXNlY29uZHMsIG9wdGlvbmFsIHNldCAwIHRvIG5ldmVyIGV4cGlyZXNcbiAqICAgICAgIHRleHRQb3NpdGlvbjogJ3JpZ2h0JywgLy8gb3B0aW9uYWwgJyBjZW50ZXInLCAnbGVmdCcsICdyaWdodCdcbiAqICAgICAgIGxheW91dFR5cGU6IERpYWxvZ0xheW91dERpc3BsYXkuU1VDQ0VTUywgLy8gU1VDQ0VTUyB8IElORk8gfCBOT05FIHwgREFOR0VSIHwgV0FSTklOR1xuICogICAgICAgcHJvZ3Jlc3NCYXI6IFRvYXN0UHJvZ3Jlc3NCYXJFbnVtLklOQ1JFQVNFLCAvLyBJTkNSRUFTRSB8IERFQ1JFQVNFIHwgTk9ORVxuICogICAgICAgdG9hc3RVc2VyVmlld1R5cGU6IFRvYXN0VXNlclZpZXdUeXBlRW51bS5TSU1QTEUsIC8vIFNUQU5EQVJEIHwgU0lNUExFXG4gKiAgICAgICBhbmltYXRpb25JbjogQXBwZWFyYW5jZUFuaW1hdGlvbi5CT1VOQ0VfSU4sIC8vIEJPVU5DRV9JTiB8IFNXSU5HIHwgWk9PTV9JTiB8IFpPT01fSU5fUk9UQVRFIHwgRUxBU1RJQyB8IEpFTExPIHwgRkFERV9JTiB8IFNMSURFX0lOX1VQIHwgU0xJREVfSU5fRE9XTiB8IFNMSURFX0lOX0xFRlQgfCBTTElERV9JTl9SSUdIVCB8IE5PTkVcbiAqICAgICAgIGFuaW1hdGlvbk91dDogRGlzYXBwZWFyYW5jZUFuaW1hdGlvbi5CT1VOQ0VfT1VULCAvLyBCT1VOQ0VfT1VUIHwgWk9PTV9PVVQgfCBaT09NX09VVF9XSU5EIHwgWk9PTV9PVVRfUk9UQVRFIHwgRkxJUF9PVVQgfCBTTElERV9PVVRfVVAgfCBTTElERV9PVVRfRE9XTiB8IFNMSURFX09VVF9MRUZUIHwgU0xJREVfT1VUX1JJR0hUIHwgTk9ORVxuICogICAgICAgdG9hc3RQb3NpdGlvbjogVG9hc3RQb3NpdGlvbkVudW0uVE9QX1JJR0hULCAgLy8gVE9QX0xFRlQgfCBUT1BfQ0VOVEVSIHwgVE9QX1JJR0hUIHwgVE9QX0ZVTExfV0lEVEggfCBCT1RUT01fTEVGVCB8IEJPVFRPTV9DRU5URVIgfCBCT1RUT01fUklHSFQgfCBCT1RUT01fRlVMTF9XSURUSFxuICogICAgICAgYWxsb3dIdG1sTWVzc2FnZTogdHJ1ZSwgIC8vIGRlZmF1bHQgZmFsc2VcbiAqICAgICAgIGRpc2FibGVJY29uOiB0cnVlLCAvLyBkZWZhdWx0IGZhbHNlXG4gKiAgICAgICBidXR0b25Qb3NpdGlvbjogJ3JpZ2h0JywgLy8gb3B0aW9uYWwgJyBjZW50ZXInLCAnbGVmdCcsICdyaWdodCdcbiAqICAgICAgIGN1c3RvbVN0eWxlczoge1xuICogICAgICAgICAgIHRpdGxlQ1NTOiAnYmFja2dyb3VuZDogcmdiYSgwLDAsMCwgLjcpOyBmb250LXNpemU6IDIwcHg7IHBhZGRpbmc6IDIwcHgnLFxuICogICAgICAgICAgIGJ1dHRvblNlY3Rpb25DU1M6ICdiYWNrZ3JvdW5kOiAjMzMzJyxcbiAqICAgICAgICAgICBidXR0b25DU1M6ICdmb250LXNpemU6IDE0cHg7JyxcbiAqICAgICAgICAgICB0ZXh0Q1NTOiAnY29sb3I6ICNkZGQ7IGZvbnQtc2l6ZTogMTZweDsgYmFja2dyb3VuZDogIzMzMzsnXG4gKiAgICAgICAgIH1cbiAqICAgIH0sXG4gKiAgICBnbG9iYWxTZXR0aW5nczoge1xuICogICAgICAgLy8gVGhlIG51bWJlciBvZiB0b2FzdCBub3RpZmljYXRpb25zIHRoYXQgY2FuIGJlIHNob3duIGF0IG9uY2UuXG4gKiAgICAgICBhbGxvd2VkTm90aWZpY2F0aW9uc0F0T25jZTogNFxuICogICAgfSxcbiAqICAgIC8vIE9wdGlvbmFsIGRlZmF1bHQgZGlzcGF0Y2ggb2JqZWN0LlxuICogICAgZGlzcGF0Y2g6IHtcbiAqICAgICAgdGl0bGU6ICdEZWZhdWx0IHRpdGxlJyxcbiAqICAgICAgbWVzc2FnZTogJ0RlZmF1bHQgbWVzc2FnZSdcbiAqICAgfSxcbiAqICAgLy8gb3B0aW9uYWwgcHJlZGVmaW5lZCBjdXN0b20gZGVmYXVsdCBidXR0b25zXG4gKiAgIGJ1dHRvbnM6IFtcbiAqICAgICAgbmV3IEJ1dHRvbk1ha2VyKCdPaycsICdvaycsIEJ1dHRvbkxheW91dERpc3BsYXkuUFJJTUFSWSksXG4gKiAgICAgIG5ldyBCdXR0b25NYWtlcignQ2FuY2VsJywgJ2NhbmNlbCcsIEJ1dHRvbkxheW91dERpc3BsYXkuU0VDT05EQVJZKVxuICogICBdXG4gKn0pXG4gKiBgYGBcbiAqICogdG9hc3RDb3JlQ29uZmlnOiB7QGxpbmsgSVRvYXN0Q29yZUNvbmZpZ31cbiAqICogZ2xvYmFsU2V0dGluZ3M6IHtAbGluayBJR2xvYmFsVG9hc3RTZXR0aW5nc31cbiAqICogZGlzcGF0Y2g6IHtAbGluayBJRGlzcGF0Y2h9XG4gKiAqIGJ1dHRvbnM6IHtAbGluayBJQnV0dG9ufVxuICogKiBCdXR0b25NYWtlcjoge0BsaW5rIEJ1dHRvbk1ha2VyfVxuICogQGNhdGVnb3J5IEltcG9ydHMgZm9yIGFuZ3VsYXIgYXBwLm1vZHVsZVxuICovXG5leHBvcnQgeyBUb2FzdE5vdGlmaWNhdGlvbkNvbmZpZ01vZHVsZSB9IGZyb20gJy4vbmd4LWF3ZXNvbWUtcG9wdXAvbmd4LWF3ZXNvbWUtcG9wdXAubW9kdWxlJztcbi8vIGVuZHJlZ2lvblxuIl19
