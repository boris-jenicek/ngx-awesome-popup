import { Inject, Injectable } from '@angular/core';
import { AppearanceAnimation, DialogLayoutDisplay, DisappearanceAnimation } from '../../../core/enums';
import { DataControl } from '../../../core/global-classes';
import { DefaultLoaderComponent } from '../../../default-loader/default-loader.component';
import { DialogSettings } from './classes';
import { IDialogUserConfig } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class DialogConfigService {
  authorConfig: IDialogUserConfig = new DialogSettings();
  productionConfig: IDialogUserConfig = new DialogSettings();

  constructor(
    @Inject('dialogConfig')
    private userConfig: IDialogUserConfig = {}
  ) {
    // region *** dialog userConfig (user input app-module) ***
    const userConfigBase = new DialogSettings();
    const dataControl = new DataControl();
    dataControl.copyValuesFrom(userConfig.DialogCoreConfig, userConfigBase.DialogCoreConfig); // this will make sure that object has right properties
    userConfig.DialogCoreConfig = userConfigBase.DialogCoreConfig;

    if (userConfig.DialogCoreConfig.LoaderComponent !== null) {
      userConfig.DialogCoreConfig.DisplayLoader = userConfig.DialogCoreConfig.DisplayLoader === null;
    }
    // endregion

    // region *** author default config values (if there is no user input) ***
    this.authorConfig.DialogCoreConfig.Width = 'auto';
    this.authorConfig.DialogCoreConfig.Height = 'auto';
    this.authorConfig.DialogCoreConfig.HideScrollbar = false;
    this.authorConfig.DialogCoreConfig.EscapeKeyClose = false;
    this.authorConfig.DialogCoreConfig.ButtonPosition = 'right';
    this.authorConfig.DialogCoreConfig.DisplayLoader = false;
    this.authorConfig.DialogCoreConfig.FullScreen = false;
    this.authorConfig.DialogCoreConfig.LayoutType = DialogLayoutDisplay.NONE;
    this.authorConfig.DialogCoreConfig.LoaderComponent = DefaultLoaderComponent;
    this.authorConfig.DialogCoreConfig.AnimationIn = AppearanceAnimation.ZOOM_IN;
    this.authorConfig.DialogCoreConfig.AnimationOut = DisappearanceAnimation.ZOOM_OUT;

    // endregion

    dataControl.copyValuesFrom(this.authorConfig.DialogCoreConfig, this.productionConfig.DialogCoreConfig);
    dataControl.copyValuesFrom(userConfig.DialogCoreConfig, this.productionConfig.DialogCoreConfig);

    // Buttons
    /*if(userConfig.Buttons){
			this.config.Buttons.push(
				new ButtonMaker('Ok', 'ok', ButtonLayoutDisplay.PRIMARY)
				,new ButtonMaker('Cancel', 'cancel', ButtonLayoutDisplay.SECONDARY)
			);
		}*/
  }
}
