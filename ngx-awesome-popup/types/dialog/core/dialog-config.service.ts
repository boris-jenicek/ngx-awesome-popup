import {Inject, Injectable} from '@angular/core';
import {DialogLayoutDisplay} from '../../../core/enums';
import {GlobalClass} from '../../../core/global';
import {DefaultLoaderComponent} from '../../../default-loader/default-loader.component';
import {DialogClass, DialogInterface} from './model';

@Injectable({
	providedIn: 'root'
})
export class DialogConfigService {

	authorConfig: DialogInterface.IDialogUserConfig     = new DialogClass.DialogSettings();
	productionConfig: DialogInterface.IDialogUserConfig = new DialogClass.DialogSettings();

	constructor(@Inject('dialogConfig') private userConfig: DialogInterface.IDialogUserConfig = {}) {

		// region *** dialog userConfig (user input app-module) ***
		const userConfigBase = new DialogClass.DialogSettings();
		const dataControl    = new GlobalClass.DataControl();
		dataControl.copyValuesFrom(userConfig.DialogCoreConfig, userConfigBase.DialogCoreConfig); // this will make sure that object has right properties
		userConfig.DialogCoreConfig = userConfigBase.DialogCoreConfig;

		if (userConfig.DialogCoreConfig.LoaderComponent !== null) {
			userConfig.DialogCoreConfig.DisplayLoader = userConfig.DialogCoreConfig.DisplayLoader === null;
		}
		// endregion

		// region *** author default config values (if there is no user input) ***
		this.authorConfig.DialogCoreConfig.Width           = 'auto';
		this.authorConfig.DialogCoreConfig.Height          = 'auto';
		this.authorConfig.DialogCoreConfig.ButtonPosition  = 'right';
		this.authorConfig.DialogCoreConfig.DisplayLoader   = false;
		this.authorConfig.DialogCoreConfig.LayoutType      = DialogLayoutDisplay.NONE;
		this.authorConfig.DialogCoreConfig.LoaderComponent = DefaultLoaderComponent;
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
