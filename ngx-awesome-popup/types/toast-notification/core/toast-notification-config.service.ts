import {Inject, Injectable} from '@angular/core';
import {ToastNotificationClass, ToastNotificationInterface} from './model';
import {GlobalClass} from '../../../core/global';
import {DialogLayoutDisplay} from '../../../core/enums';

@Injectable({
    providedIn: 'root'
})
export class ToastNotificationConfigService {
    
    authorConfig: ToastNotificationInterface.IToastNotificationUserConfig     = new ToastNotificationClass.Settings();
    productionConfig: ToastNotificationInterface.IToastNotificationUserConfig = new ToastNotificationClass.Settings();
    
    
    constructor(@Inject('toastNotificationConfig') private userConfig: ToastNotificationInterface.IToastNotificationUserConfig = {}) {
        
        // region *** confirmBox userConfig (user input app-module) ***
        const userConfigBase = new ToastNotificationClass.Settings();
        const dataControl    = new GlobalClass.DataControl();
        dataControl.copyValuesFrom(userConfig.ToastCoreConfig, userConfigBase.ToastCoreConfig); // this will make sure that object has right properties
        
        userConfig.ToastCoreConfig = userConfigBase.ToastCoreConfig;
        // endregion
        
        // region *** author default config values (if there is no user input) ***
        this.authorConfig.ToastCoreConfig.Width          = 'auto';
        this.authorConfig.ToastCoreConfig.Height         = 'auto';
        this.authorConfig.ToastCoreConfig.ButtonPosition = 'right';
        // this.authorConfig.ToastCoreConfig.ConfirmLabel   = 'Confirm';
        // this.authorConfig.ToastCoreConfig.DeclineLabel   = 'Decline';
        this.authorConfig.ToastCoreConfig.AutoCloseDelay       = 2500;
        this.authorConfig.ToastCoreConfig.LayoutType           = DialogLayoutDisplay.NONE;
        this.authorConfig.GlobalSettings.AllowedMessagesAtOnce = 5;

        // endregion
        
        // region *** Production setup ***
        
        dataControl.copyValuesFrom(this.authorConfig.GlobalSettings, this.productionConfig.GlobalSettings);
        dataControl.copyValuesFrom(userConfig.GlobalSettings, this.productionConfig.GlobalSettings);
        dataControl.copyValuesFrom(this.authorConfig.ToastCoreConfig, this.productionConfig.ToastCoreConfig);
        dataControl.copyValuesFrom(userConfig.ToastCoreConfig, this.productionConfig.ToastCoreConfig);
        // endregion
    }
}
