import { Inject, Injectable } from '@angular/core';
import { AppearanceAnimation, DialogLayoutDisplay, DisappearanceAnimation } from '../../../core/enums';
import { DataControl } from '../../../core/global-classes';
import { ToastCustomStyles, ToastSettings } from './classes';
import { ToastPositionEnum, ToastProgressBarEnum, ToastUserViewTypeEnum } from './enums';
import { IGlobalToastSettings, IToastNotificationUserConfig } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class ToastNotificationConfigService {
  private dataControl = new DataControl();
  authorConfig: IToastNotificationUserConfig = new ToastSettings();
  productionConfig: IToastNotificationUserConfig = new ToastSettings();

  constructor(
    @Inject('toastNotificationConfig')
    private userConfig: IToastNotificationUserConfig = {}
  ) {
    // region *** toastNotification userConfig (user input app-module) ***
    const userConfigBase = new ToastSettings();

    this.dataControl.copyValuesFrom(userConfig.toastCoreConfig, userConfigBase.toastCoreConfig); // this will make sure that object has right properties

    userConfig.toastCoreConfig = userConfigBase.toastCoreConfig;
    // endregion

    // region *** author default config values (if there is no user input) ***
    this.authorConfig.toastCoreConfig.buttonPosition = 'right';
    this.authorConfig.toastCoreConfig.textPosition = 'left';
    this.authorConfig.toastCoreConfig.toastPosition = ToastPositionEnum.TOP_RIGHT;
    this.authorConfig.toastCoreConfig.progressBar = ToastProgressBarEnum.INCREASE;
    this.authorConfig.toastCoreConfig.toastUserViewType = ToastUserViewTypeEnum.SIMPLE;
    this.authorConfig.toastCoreConfig.autoCloseDelay = 2500;
    this.authorConfig.toastCoreConfig.disableIcon = false;
    this.authorConfig.toastCoreConfig.allowHtmlMessage = true;
    this.authorConfig.toastCoreConfig.layoutType = DialogLayoutDisplay.NONE;
    this.authorConfig.globalSettings.allowedNotificationsAtOnce = 5;
    this.authorConfig.toastCoreConfig.animationIn = AppearanceAnimation.ZOOM_IN;
    this.authorConfig.toastCoreConfig.animationOut = DisappearanceAnimation.ZOOM_OUT;
    this.authorConfig.toastCoreConfig.customStyles = new ToastCustomStyles();
    this.authorConfig.toastCoreConfig.iconStyleClass = null;

    // endregion

    // region *** Production setup ***

    this.setResetGlobalToastConfig();
    this.dataControl.copyValuesFrom(this.authorConfig.toastCoreConfig, this.productionConfig.toastCoreConfig);
    this.dataControl.copyValuesFrom(this.userConfig.toastCoreConfig, this.productionConfig.toastCoreConfig);
    // endregion
  }

  setResetGlobalToastConfig(globalToastConfig?: IGlobalToastSettings): void {
    this.dataControl.copyValuesFrom(this.authorConfig.globalSettings, this.productionConfig.globalSettings);
    this.dataControl.copyValuesFrom(
      globalToastConfig ? globalToastConfig : this.userConfig.globalSettings,
      this.productionConfig.globalSettings
    );
  }
}
