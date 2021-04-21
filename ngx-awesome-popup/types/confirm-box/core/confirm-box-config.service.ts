import {Inject, Injectable} from '@angular/core';
import {ConfirmBoxClass, ConfirmBoxInterface} from './model';
import {GlobalClass} from '../../../core/global';
import {DialogLayoutDisplay} from '../../../core/enums';

@Injectable({
    providedIn: 'root'
})
export class ConfirmBoxConfigService {
    
    authorConfig: ConfirmBoxInterface.IConfirmBoxUserConfig     = new ConfirmBoxClass.Settings();
    productionConfig: ConfirmBoxInterface.IConfirmBoxUserConfig = new ConfirmBoxClass.Settings();
    
    constructor(@Inject('confirmBoxConfig') private userConfig: ConfirmBoxInterface.IConfirmBoxUserConfig = {}) {
        
        // region *** confirmBox userConfig (user input app-module) ***
        const userConfigBase = new ConfirmBoxClass.Settings();
        const dataControl    = new GlobalClass.DataControl();
        dataControl.copyValuesFrom(userConfig.ConfirmBoxCoreConfig, userConfigBase.ConfirmBoxCoreConfig); // this will make sure that object has right properties
        userConfig.ConfirmBoxCoreConfig = userConfigBase.ConfirmBoxCoreConfig;
        // endregion
        
        // region *** author default config values (if there is no user input) ***
        this.authorConfig.ConfirmBoxCoreConfig.Width          = 'auto';
        this.authorConfig.ConfirmBoxCoreConfig.Height         = 'auto';
        this.authorConfig.ConfirmBoxCoreConfig.ButtonPosition = 'center';
        this.authorConfig.ConfirmBoxCoreConfig.ConfirmLabel   = 'Confirm';
        this.authorConfig.ConfirmBoxCoreConfig.DeclineLabel   = 'Decline';
        this.authorConfig.ConfirmBoxCoreConfig.LayoutType     = DialogLayoutDisplay.NONE;
        
        // endregion
        
        // region *** Production setup ***
        dataControl.copyValuesFrom(this.authorConfig.ConfirmBoxCoreConfig, this.productionConfig.ConfirmBoxCoreConfig);
        dataControl.copyValuesFrom(userConfig.ConfirmBoxCoreConfig, this.productionConfig.ConfirmBoxCoreConfig);
        // endregion
        
    }
}
