import { IButton, IColorTypes, IDispatch, IGlobalUserConfig } from './ngx-awesome-popup/core/global-interfaces';
import { ConfirmBoxInitializer } from './ngx-awesome-popup/types/confirm-box/core/classes';
import {
  IConfirmBoxCoreConfig,
  IConfirmBoxPublicResponse,
  IConfirmBoxUserConfig
} from './ngx-awesome-popup/types/confirm-box/core/interfaces';
import { DialogBelonging, DialogInitializer } from './ngx-awesome-popup/types/dialog/core/classes';
import {
  IDialogCoreConfig,
  IDialogEventsController,
  IDialogPublicResponse,
  IDialogUserConfig
} from './ngx-awesome-popup/types/dialog/core/interfaces';
import {
  ResetToastGlobalSettings,
  ToastNotificationInitializer
} from './ngx-awesome-popup/types/toast-notification/core/classes';
import {
  IGlobalToastSettings,
  IToastCoreConfig,
  IToastNotificationPublicResponse,
  IToastNotificationUserConfig
} from './ngx-awesome-popup/types/toast-notification/core/interfaces';

// region *** Interface ***
export { IGlobalUserConfig };
export { IButton };
export { IDispatch };
export { IColorTypes };

export { IConfirmBoxUserConfig };
export { IConfirmBoxCoreConfig };
export { IConfirmBoxPublicResponse };

export { IGlobalToastSettings };
export { IToastCoreConfig };
export { IToastNotificationUserConfig };
export { IToastNotificationPublicResponse };

export { IDialogUserConfig };
export { IDialogCoreConfig };
export { IDialogPublicResponse };
export { IDialogEventsController };
// endregion

export { ButtonLayoutDisplay } from './ngx-awesome-popup/core/enums';
export { DialogLayoutDisplay } from './ngx-awesome-popup/core/enums';
export { VerticalPosition } from './ngx-awesome-popup/core/enums';
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

// region *** Observable response after closing popup ***
/**
 * Regular description
 *
 * @category Observable response after closing popup
 */
export { IToastNotificationPublicResponse as IToastNotificationResponse };
/**
 * Regular description
 *
 * @category Observable response after closing popup
 */
export { IConfirmBoxPublicResponse as IConfirmBoxResponse };
/**
 * Regular description
 *
 * @category Observable response after closing popup
 */
export { IDialogPublicResponse as IDialogResponse };
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
