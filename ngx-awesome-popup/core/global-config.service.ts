import {Inject, Injectable} from '@angular/core';
import {GlobalClass, GlobalInterface} from './global';
import {ColorVariance} from './enums';
import IColorProvider = GlobalInterface.IColorProvider;

@Injectable({
    providedIn: 'root'
})
export class GlobalConfigService {
    
    productionGlobalConfig: GlobalInterface.IGlobalConfig     = new GlobalClass.GlobalConfig();
    private authorGlobalConfig: GlobalInterface.IGlobalConfig = new GlobalClass.GlobalConfig();
    
    constructor(@Inject('globalConfig') private userGlobalConfig: GlobalInterface.IGlobalUserConfig) {
        userGlobalConfig = new GlobalClass.GlobalUserConfig(userGlobalConfig);

        // region *** author global config values (if there is no user input) ***
        this.authorGlobalConfig.DisplayColor.Primary   = null; // new GlobalClass.ColorProvider('#ff9e00');
        this.authorGlobalConfig.DisplayColor.Secondary = null; // new GlobalClass.ColorProvider('#989ea5');
        this.authorGlobalConfig.DisplayColor.Success   = null; // new GlobalClass.ColorProvider('#3caea3');
        this.authorGlobalConfig.DisplayColor.Info      = null; // new GlobalClass.ColorProvider('#2f8ee5');
        this.authorGlobalConfig.DisplayColor.Warning   = null; // new GlobalClass.ColorProvider('#ffc107');
        this.authorGlobalConfig.DisplayColor.Danger    = null; // new GlobalClass.ColorProvider('#e46464');
        this.authorGlobalConfig.DisplayColor.Light     = null; // new GlobalClass.ColorProvider('#f8f9fa');
        this.authorGlobalConfig.DisplayColor.Dark      = null; // new GlobalClass.ColorProvider('#343a40');
        // endregion
        
        this.productionGlobalConfig.DisplayColor = this.authorGlobalConfig.DisplayColor;
        
        // region *** global userConfig (user input app-module) ***
        this.setUserColors(userGlobalConfig.ColorList);
        
        // endregion
        
        this.setToastNode();
        this.setNodeStyles(this.productionGlobalConfig.DisplayColor);
        
    }
    
    private setNodeStyles(_ProductionColorTypes: GlobalInterface.IColorObject) {
        
        Object.keys(_ProductionColorTypes).forEach(key => {
            if (_ProductionColorTypes[key]) {
                
                this.setButtonStyling(key, _ProductionColorTypes[key]);
                this.setIconStyling(key, _ProductionColorTypes[key]);
                this.setToastStyling(key, _ProductionColorTypes[key]);
                this.setDialogFrame(key, _ProductionColorTypes[key]);
                
                if (ColorVariance[key.toUpperCase()] === ColorVariance.PRIMARY) {
                    this.getSheet().addRule('.ngx-awesome-popup-overlay', `background:  ${_ProductionColorTypes[key].TransparentDarkenVariance}!important;`);
                }
            }
        });
        
    }
    
    private setToastStyling(_Key: string, _ColorProvider: IColorProvider) {
        
        const baseClass = `.overlay-toast .evolve-toast.${_Key.toLowerCase()}-dialog`;
        const baseStyle = `
        background:  ${_ColorProvider.BrightShade}!important;
        border-color: ${_ColorProvider.Brighten}!important;
        `;
        
        this.getSheet().addRule(baseClass, baseStyle);
    }
    
    private setButtonStyling(_Key: string, _ColorProvider: IColorProvider) {
        
        const baseButtonClass = `.ed-btn-${_Key.toLowerCase()}`;
        const baseStyle       = `
        color: ${_ColorProvider.ContrastColor}!important;
        background:  ${_ColorProvider.Base}!important;
        border-color: ${_ColorProvider.BrightenForShade}!important;
        `;
        
        const hoverButtonClass = `.ed-btn-${_Key.toLowerCase()}:hover`;
        const hoverStyle       = `
        background:  ${_ColorProvider.IsBaseBright ? _ColorProvider.DarkenForShade : _ColorProvider.BrightenForShade}!important;
        border-color: ${_ColorProvider.IsBaseBright ? _ColorProvider.Darken : _ColorProvider.Brighten}!important;
        `;
        
        const focusActiveButtonClass = `.ed-btn-${_Key.toLowerCase()}:focus, .ed-btn-${_Key.toLowerCase()}:active`;
        const focusActiveStyle       = `
        box-shadow: 0 0 1px 2px ${_ColorProvider.IsBaseBright ? _ColorProvider.Darken : _ColorProvider.Brighten}!important;
        `;
    
        this.getSheet().addRule(baseButtonClass, baseStyle);
        this.getSheet().addRule(hoverButtonClass, hoverStyle);
        this.getSheet().addRule(focusActiveButtonClass, focusActiveStyle);
    
    }
    
    private setIconStyling(_Key: string, _ColorProvider: IColorProvider) {
        
        const baseIconClass = `.ap-icon-${_Key.toLowerCase()}`;
        const baseStyle     = `color: ${_ColorProvider.BrightenForShade}!important;`;
        
        this.getSheet().addRule(baseIconClass, baseStyle);
        
    }
    
    private setDialogFrame(_Key: string, _ColorProvider: IColorProvider) {
        
        const baseDialogFrameClass = `.ngx-awesome-popup-overlay .${_Key.toLowerCase()}-dialog`;
        const baseStyle            = `
        border-color: ${_ColorProvider.Brighten}!important;
        `;
        
        this.getSheet().addRule(baseDialogFrameClass, baseStyle);
        
    }
    
    private getSheet() {
        // Create the <style> tag
        let evolveDialogStyleNode = document.getElementById('ngx-awesome-popup-styles') as HTMLStyleElement;
        if (!evolveDialogStyleNode) {
            const headNode = document.head || document.getElementsByTagName('head')[0];
            if (!headNode) {
                return;
            }
            
            evolveDialogStyleNode = document.createElement('style');
            evolveDialogStyleNode.setAttribute('id', 'ngx-awesome-popup-styles');
            evolveDialogStyleNode.appendChild(document.createTextNode(''));
            headNode.appendChild(evolveDialogStyleNode);
        }
        
        return evolveDialogStyleNode ? evolveDialogStyleNode.sheet : null;
    };
    
    private setToastNode() {
        const bodyNode = document.body || document.getElementsByTagName('body')[0];
        if (!bodyNode) {
            return;
        }
        
        const toastWrapper = document.createElement('div');
        toastWrapper.setAttribute('id', 'toast-wrapper');
        toastWrapper.appendChild(document.createTextNode(''));
        bodyNode.prepend(toastWrapper);
        // bodyNode.appendChild(toastWrapper);
    
    
        this.getSheet().addRule(`#toast-wrapper`, `position: fixed;
                                        z-index: 1001;
                                        top: 20px;
                                        right: 20px;`);
        this.getSheet().addRule(`.toast-entity`, `all 0.5s ease;`);
        this.getSheet().addRule(`.toast-entity:first-child`, `animation: move 0.7s ease-out;`);
        this.getSheet().addRule(`@-webkit-keyframes move`, `
                                        0% {margin-top: -5px; opacity: 0.4;}
                                        30% {margin-top: -4px; opacity: 0.7;}
                                        100% {margin-top: 0px; opacity: 1;}
                                        `);
        this.getSheet().addRule(`@keyframes move`, `
                                        0% {margin-top: -5px; opacity: 0.4;}
                                        30% {margin-top: -4px; opacity: 0.7;}
                                        100% {margin-top: 0px; opacity: 1;}
                                        `);
        
    }
    
    private setUserColors(_UserColorTypes: GlobalInterface.IColorTypes): void {
        
        if (typeof _UserColorTypes !== 'object') {
            return;
        }
        
        const userKeys             = Object.keys(_UserColorTypes);
        const productionObjectKeys = Object.keys(this.productionGlobalConfig.DisplayColor);
        
        userKeys.forEach(key => {
            
            if (productionObjectKeys.find(tKey => tKey === key)) {
                const baseColorProvider = new GlobalClass.ColorProvider(_UserColorTypes[key]);
                if (baseColorProvider.Base) {
                    
                    this.productionGlobalConfig.DisplayColor[key] = baseColorProvider;
                }
            }
        });
        
    }
    
}
