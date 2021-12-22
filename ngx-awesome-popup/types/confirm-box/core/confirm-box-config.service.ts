import { Inject, Injectable } from '@angular/core';
import { AppearanceAnimation, DialogLayoutDisplay, DisappearanceAnimation } from '../../../core/enums';
import { DataControl } from '../../../core/global-classes';
import { ConfirmBoxCustomStyles, ConfirmBoxSettings } from './classes';
import { IConfirmBoxUserConfig } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class ConfirmBoxConfigService {
  authorConfig: IConfirmBoxUserConfig = new ConfirmBoxSettings();
  productionConfig: IConfirmBoxUserConfig = new ConfirmBoxSettings();

  constructor(
    @Inject('confirmBoxConfig')
    private userConfig: IConfirmBoxUserConfig = {}
  ) {
    // region *** confirmBox userConfig (user input app-module) ***
    const userConfigBase = new ConfirmBoxSettings();
    const dataControl = new DataControl();
    dataControl.copyValuesFrom(userConfig.confirmBoxCoreConfig, userConfigBase.confirmBoxCoreConfig); // this will make sure that object has right properties
    userConfig.confirmBoxCoreConfig = userConfigBase.confirmBoxCoreConfig;
    // endregion

    // region *** author default config values (if there is no user input) ***
    this.authorConfig.confirmBoxCoreConfig.width = 'auto';
    this.authorConfig.confirmBoxCoreConfig.height = 'auto';
    this.authorConfig.confirmBoxCoreConfig.buttonPosition = 'center';
    this.authorConfig.confirmBoxCoreConfig.confirmLabel = 'Confirm';
    this.authorConfig.confirmBoxCoreConfig.declineLabel = 'Decline';
    this.authorConfig.confirmBoxCoreConfig.disableIcon = false;
    this.authorConfig.confirmBoxCoreConfig.allowHtmlMessage = false;
    this.authorConfig.confirmBoxCoreConfig.layoutType = DialogLayoutDisplay.NONE;
    this.authorConfig.confirmBoxCoreConfig.animationIn = AppearanceAnimation.ZOOM_IN;
    this.authorConfig.confirmBoxCoreConfig.animationOut = DisappearanceAnimation.ZOOM_OUT;
    this.authorConfig.confirmBoxCoreConfig.customStyles = new ConfirmBoxCustomStyles();
    this.authorConfig.confirmBoxCoreConfig.iconStyleClass = null;

    // endregion

    // region *** Production setup ***
    dataControl.copyValuesFrom(this.authorConfig.confirmBoxCoreConfig, this.productionConfig.confirmBoxCoreConfig);
    dataControl.copyValuesFrom(userConfig.confirmBoxCoreConfig, this.productionConfig.confirmBoxCoreConfig);
    // endregion
  }
}
