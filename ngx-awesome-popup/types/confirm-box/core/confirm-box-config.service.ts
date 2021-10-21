import { Inject, Injectable } from '@angular/core';
import { DialogLayoutDisplay } from '../../../core/enums';
import { DataControl } from '../../../core/global-classes';
import { ConfirmBoxSettings } from './classes';
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
    dataControl.copyValuesFrom(
      userConfig.ConfirmBoxCoreConfig,
      userConfigBase.ConfirmBoxCoreConfig
    ); // this will make sure that object has right properties
    userConfig.ConfirmBoxCoreConfig = userConfigBase.ConfirmBoxCoreConfig;
    // endregion

    // region *** author default config values (if there is no user input) ***
    this.authorConfig.ConfirmBoxCoreConfig.Width = 'auto';
    this.authorConfig.ConfirmBoxCoreConfig.Height = 'auto';
    this.authorConfig.ConfirmBoxCoreConfig.ButtonPosition = 'center';
    this.authorConfig.ConfirmBoxCoreConfig.ConfirmLabel = 'Confirm';
    this.authorConfig.ConfirmBoxCoreConfig.DeclineLabel = 'Decline';
    this.authorConfig.ConfirmBoxCoreConfig.DisableIcon = false;
    this.authorConfig.ConfirmBoxCoreConfig.AllowHTMLMessage = false;
    this.authorConfig.ConfirmBoxCoreConfig.LayoutType =
      DialogLayoutDisplay.NONE;

    // endregion

    // region *** Production setup ***
    dataControl.copyValuesFrom(
      this.authorConfig.ConfirmBoxCoreConfig,
      this.productionConfig.ConfirmBoxCoreConfig
    );
    dataControl.copyValuesFrom(
      userConfig.ConfirmBoxCoreConfig,
      this.productionConfig.ConfirmBoxCoreConfig
    );
    // endregion
  }
}
