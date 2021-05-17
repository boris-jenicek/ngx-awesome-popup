import { Inject, Injectable } from "@angular/core";
import { DialogLayoutDisplay } from "../../../core/enums";
import { GlobalClass } from "../../../core/global";
import {
  ToastNotificationClass,
  ToastNotificationInterface,
  ToastPositionEnum,
  ToastProgressBarEnum,
  ToastUserViewTypeEnum,
} from "./model";

@Injectable({
  providedIn: "root",
})
export class ToastNotificationConfigService {
  authorConfig: ToastNotificationInterface.IToastNotificationUserConfig = new ToastNotificationClass.Settings();
  productionConfig: ToastNotificationInterface.IToastNotificationUserConfig = new ToastNotificationClass.Settings();
  private dataControl = new GlobalClass.DataControl();

  constructor(
    @Inject("toastNotificationConfig")
    private userConfig: ToastNotificationInterface.IToastNotificationUserConfig = {}
  ) {
    // region *** confirmBox userConfig (user input app-module) ***
    const userConfigBase = new ToastNotificationClass.Settings();

    this.dataControl.copyValuesFrom(
      userConfig.ToastCoreConfig,
      userConfigBase.ToastCoreConfig
    ); // this will make sure that object has right properties

    userConfig.ToastCoreConfig = userConfigBase.ToastCoreConfig;
    // endregion

    // region *** author default config values (if there is no user input) ***
    this.authorConfig.ToastCoreConfig.ButtonPosition = "right";
    this.authorConfig.ToastCoreConfig.TextPosition = "left";
    this.authorConfig.ToastCoreConfig.ToastPosition =
      ToastPositionEnum.TOP_RIGHT;
    this.authorConfig.ToastCoreConfig.ProgressBar =
      ToastProgressBarEnum.INCREASE;
    this.authorConfig.ToastCoreConfig.ToastUserViewType =
      ToastUserViewTypeEnum.SIMPLE;
    this.authorConfig.ToastCoreConfig.AutoCloseDelay = 2500;
    this.authorConfig.ToastCoreConfig.DisableIcon = false;
    this.authorConfig.ToastCoreConfig.AllowHTMLMessage = true;
    this.authorConfig.ToastCoreConfig.LayoutType = DialogLayoutDisplay.NONE;
    this.authorConfig.GlobalSettings.AllowedNotificationsAtOnce = 5;

    // endregion

    // region *** Production setup ***

    this.setResetGlobalToastConfig();
    this.dataControl.copyValuesFrom(
      this.authorConfig.ToastCoreConfig,
      this.productionConfig.ToastCoreConfig
    );
    this.dataControl.copyValuesFrom(
      this.userConfig.ToastCoreConfig,
      this.productionConfig.ToastCoreConfig
    );
    // endregion
  }

  setResetGlobalToastConfig(
    globalToastConfig?: ToastNotificationInterface.IGlobalToastSettings
  ): void {
    this.dataControl.copyValuesFrom(
      this.authorConfig.GlobalSettings,
      this.productionConfig.GlobalSettings
    );
    this.dataControl.copyValuesFrom(
      globalToastConfig ? globalToastConfig : this.userConfig.GlobalSettings,
      this.productionConfig.GlobalSettings
    );
  }
}
