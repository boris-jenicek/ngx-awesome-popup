import { Inject, Injectable } from '@angular/core';
import { ColorVariance } from './enums';
import { ColorProvider, GlobalConfig, GlobalUserConfig } from './global-classes';
import { IColorObject, IColorProvider, IColorTypes, IGlobalConfig, IGlobalUserConfig } from './global-interfaces';

@Injectable({
  providedIn: 'root'
})
export class GlobalConfigService {
  private authorGlobalConfig: IGlobalConfig = new GlobalConfig();
  private userGeneratedConfig: IGlobalUserConfig;
  productionGlobalConfig: IGlobalConfig = new GlobalConfig();

  constructor(
    @Inject('cdGlobalConfig')
    private userGlobalConfig: IGlobalUserConfig
  ) {
    this.userGeneratedConfig = new GlobalUserConfig(userGlobalConfig);

    // region *** author global config values (if there is no user input) ***
    this.authorGlobalConfig.DisplayColor.Primary = null; // new ColorProvider('#ff9e00');
    this.authorGlobalConfig.DisplayColor.Secondary = null; // new ColorProvider('#989ea5');
    this.authorGlobalConfig.DisplayColor.Success = null; // new ColorProvider('#3caea3');
    this.authorGlobalConfig.DisplayColor.Info = null; // new ColorProvider('#2f8ee5');
    this.authorGlobalConfig.DisplayColor.Warning = null; // new ColorProvider('#ffc107');
    this.authorGlobalConfig.DisplayColor.Danger = null; // new ColorProvider('#e46464');
    this.authorGlobalConfig.DisplayColor.Light = null; // new ColorProvider('#f8f9fa');
    this.authorGlobalConfig.DisplayColor.Dark = null; // new ColorProvider('#343a40');
    // endregion

    this.productionGlobalConfig.DisplayColor = this.authorGlobalConfig.DisplayColor;

    // region *** global userConfig (user input app-module) ***
    this.setUserColors(this.userGeneratedConfig.ColorList);

    // endregion

    this.setNodeStyles(this.productionGlobalConfig.DisplayColor);
  }

  resetStyles(): void {
    this.setUserColors(this.userGeneratedConfig.ColorList);
    this.setNodeStyles(this.productionGlobalConfig.DisplayColor, true);
  }

  setNodeStyles(_ProductionColorTypes: IColorObject, _Reset: boolean = false): void {
    if (_Reset) {
      const evolveDialogStyleNode = document.getElementById('ngx-awesome-popup-glob-styles') as HTMLStyleElement;
      if (evolveDialogStyleNode) {
        evolveDialogStyleNode.remove();
      }
    }
    this.setToastStyles();

    Object.keys(_ProductionColorTypes).forEach(key => {
      if (_ProductionColorTypes[key]) {
        this.setButtonStyling(key, _ProductionColorTypes[key]);
        this.setIconStyling(key, _ProductionColorTypes[key]);
        this.setToastStyling(key, _ProductionColorTypes[key]);
        this.setDialogFrame(key, _ProductionColorTypes[key]);

        if (ColorVariance[key.toUpperCase()] === ColorVariance.PRIMARY) {
          this.getSheet('ngx-awesome-popup-styles').addRule(
            '.ngx-awesome-popup-overlay',
            `background:  ${_ProductionColorTypes[key].TransparentDarkenVariance}!important;`
          );
        }
      }
    });
  }

  public setUserColors(_UserColorTypes: IColorTypes): void {
    if (typeof _UserColorTypes !== 'object') {
      return;
    }

    const userKeys = Object.keys(_UserColorTypes);
    const productionObjectKeys = Object.keys(this.productionGlobalConfig.DisplayColor);

    userKeys.forEach(key => {
      if (productionObjectKeys.find(tKey => tKey === key)) {
        if (_UserColorTypes[key]) {
          const baseColorProvider = new ColorProvider(_UserColorTypes[key]);
          if (baseColorProvider.Base) {
            this.productionGlobalConfig.DisplayColor[key] = baseColorProvider;
          }
        } else {
          this.productionGlobalConfig.DisplayColor[key] = null;
        }
      }
    });
  }

  public getSheet(_StyleID: string): undefined | CSSStyleSheet {
    // Create the <style> tag
    let evolveDialogStyleNode = document.getElementById(_StyleID) as HTMLStyleElement;
    if (!evolveDialogStyleNode) {
      const headNode = document.head || document.getElementsByTagName('head')[0];
      if (!headNode) {
        return;
      }

      evolveDialogStyleNode = document.createElement('style');
      evolveDialogStyleNode.setAttribute('id', _StyleID);
      evolveDialogStyleNode.appendChild(document.createTextNode(''));
      headNode.appendChild(evolveDialogStyleNode);
    }

    return evolveDialogStyleNode ? evolveDialogStyleNode.sheet : null;
  }

  private setToastStyling(_Key: string, _ColorProvider: IColorProvider): void {
    const standardToast = `.toast-wrapper.standard-toast .evolve-toast.${_Key.toLowerCase()}-dialog`;
    const standardToastStyle = `
        background:  ${_ColorProvider.BrightShade}!important;
        border-color: ${_ColorProvider.Brighten}!important;
        `;

    const simpleToast = `.toast-wrapper.simple-toast .evolve-toast.${_Key.toLowerCase()}-dialog`;
    const simpleToastStyle = `
        background:  ${_ColorProvider.BrightWarmly}!important;
        color:  ${_ColorProvider.Darken}!important;
        `;

    const baseProgress = `.toast-wrapper .evolve-toast.${_Key.toLowerCase()}-dialog .progress-bar`;
    const baseProgressStyle = `
        background-color:  ${_ColorProvider.Brighten}!important;
        `;

    this.getSheet('ngx-awesome-popup-glob-styles').addRule(baseProgress, baseProgressStyle);
    this.getSheet('ngx-awesome-popup-glob-styles').addRule(standardToast, standardToastStyle);
    this.getSheet('ngx-awesome-popup-glob-styles').addRule(simpleToast, simpleToastStyle);
  }

  private setButtonStyling(_Key: string, _ColorProvider: IColorProvider): void {
    const baseButtonClass = `.ed-btn-${_Key.toLowerCase()}`;
    const baseStyle = `
        color: ${_ColorProvider.ContrastColor}!important;
        background:  ${_ColorProvider.Base}!important;
        border-color: ${_ColorProvider.BrightenForShade}!important;
        `;

    const hoverButtonClass = `.ed-btn-${_Key.toLowerCase()}:hover`;
    const hoverStyle = `
        background:  ${
          _ColorProvider.IsBaseBright ? _ColorProvider.DarkenForShade : _ColorProvider.BrightenForShade
        }!important;
        border-color: ${_ColorProvider.IsBaseBright ? _ColorProvider.Darken : _ColorProvider.Brighten}!important;
        `;

    const focusActiveButtonClass = `.ed-btn-${_Key.toLowerCase()}:focus, .ed-btn-${_Key.toLowerCase()}:active`;
    const focusActiveStyle = `
        box-shadow: 0 0 1px 2px ${
          _ColorProvider.IsBaseBright ? _ColorProvider.Darken : _ColorProvider.Brighten
        }!important;
        `;

    this.getSheet('ngx-awesome-popup-glob-styles').addRule(baseButtonClass, baseStyle);
    this.getSheet('ngx-awesome-popup-glob-styles').addRule(hoverButtonClass, hoverStyle);
    this.getSheet('ngx-awesome-popup-glob-styles').addRule(focusActiveButtonClass, focusActiveStyle);
  }

  private setIconStyling(_Key: string, _ColorProvider: IColorProvider): void {
    const baseIconClass = `.ap-icon-${_Key.toLowerCase()}`;
    const baseStyle = `color: ${_ColorProvider.BrightenForShade}!important;`;

    this.getSheet('ngx-awesome-popup-glob-styles').addRule(baseIconClass, baseStyle);
  }

  private setDialogFrame(_Key: string, _ColorProvider: IColorProvider): void {
    const baseDialogFrameClass = `.ngx-awesome-popup-overlay .${_Key.toLowerCase()}-dialog`;
    const baseStyle = `
        border-color: ${_ColorProvider.Brighten}!important;
        `;

    this.getSheet('ngx-awesome-popup-glob-styles').addRule(baseDialogFrameClass, baseStyle);
  }

  private setToastStyles(): void {
    this.getSheet('ngx-awesome-popup-styles').addRule(`.toast-entity`, `all 0.5s ease;`);
    this.getSheet('ngx-awesome-popup-styles').addRule(`.toast-entity:first-child`, `animation: move 0.7s ease-out;`);

    const isIEOrEdge = /msie\s|trident\//i.test(window.navigator.userAgent);
    if (!isIEOrEdge) {
      this.getSheet('ngx-awesome-popup-styles').addRule(
        `@-webkit-keyframes move`,
        `
                                        0% {margin-top: -5px; opacity: 0.4;}
                                        30% {margin-top: -4px; opacity: 0.7;}
                                        100% {margin-top: 0px; opacity: 1;}
                                        `
      );
      this.getSheet('ngx-awesome-popup-styles').addRule(
        `@keyframes move`,
        `
                                        0% {margin-top: -5px; opacity: 0.4;}
                                        30% {margin-top: -4px; opacity: 0.7;}
                                        100% {margin-top: 0px; opacity: 1;}
                                        `
      );
    }
  }
}
