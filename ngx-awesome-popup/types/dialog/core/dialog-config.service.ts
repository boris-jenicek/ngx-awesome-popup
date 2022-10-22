import { Inject, Injectable } from '@angular/core';
import { AppearanceAnimation, DialogLayoutDisplay, DisappearanceAnimation } from '../../../core/enums';
import { DataControl } from '../../../core/global-classes';
import { GlobalConfigService } from '../../../core/global-config.service';
import { DefaultLoaderComponent } from '../../../default-loader/default-loader.component';
import { DialogCustomStyles, DialogSettings } from './classes';
import { IDialogUserConfig } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class DialogConfigService {
  authorConfig: IDialogUserConfig = new DialogSettings();
  productionConfig: IDialogUserConfig = new DialogSettings();

  constructor(
    @Inject('dialogConfig')
    private userConfig: IDialogUserConfig = {},
    private gConfigService: GlobalConfigService
  ) {
    // region *** dialog userConfig (user input app-module) ***
    const userConfigBase = new DialogSettings();
    const dataControl = new DataControl();
    dataControl.copyValuesFrom(userConfig.dialogCoreConfig, userConfigBase.dialogCoreConfig); // this will make sure that object has right properties
    userConfig.dialogCoreConfig = userConfigBase.dialogCoreConfig;

    if (userConfig.dialogCoreConfig.loaderComponent !== null) {
      userConfig.dialogCoreConfig.displayLoader = userConfig.dialogCoreConfig.displayLoader === null;
    }
    // endregion

    // region *** author default config values (if there is no user input) ***
    this.authorConfig.dialogCoreConfig.width = 'auto';
    this.authorConfig.dialogCoreConfig.height = 'auto';
    this.authorConfig.dialogCoreConfig.hideScrollbar = false;
    this.authorConfig.dialogCoreConfig.escapeKeyClose = false;
    this.authorConfig.dialogCoreConfig.buttonPosition = 'right';
    this.authorConfig.dialogCoreConfig.displayLoader = false;
    this.authorConfig.dialogCoreConfig.fullScreen = false;
    this.authorConfig.dialogCoreConfig.layoutType = DialogLayoutDisplay.NONE;
    this.authorConfig.dialogCoreConfig.loaderComponent = DefaultLoaderComponent;
    this.authorConfig.dialogCoreConfig.animationIn = AppearanceAnimation.ZOOM_IN;
    this.authorConfig.dialogCoreConfig.animationOut = DisappearanceAnimation.ZOOM_OUT;
    this.authorConfig.dialogCoreConfig.customStyles = new DialogCustomStyles();

    // endregion

    dataControl.copyValuesFrom(this.authorConfig.dialogCoreConfig, this.productionConfig.dialogCoreConfig);
    dataControl.copyValuesFrom(userConfig.dialogCoreConfig, this.productionConfig.dialogCoreConfig);

    // buttons
    /*if(userConfig.buttons){
			this.config.buttons.push(
				new ButtonMaker('Ok', 'ok', ButtonLayoutDisplay.PRIMARY)
				,new ButtonMaker('Cancel', 'cancel', ButtonLayoutDisplay.SECONDARY)
			);
		}*/
  }
}
