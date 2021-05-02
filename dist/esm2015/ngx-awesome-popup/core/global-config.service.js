import { Inject, Injectable } from '@angular/core';
import { ColorVariance } from './enums';
import { GlobalClass } from './global';
import * as i0 from "@angular/core";
export class GlobalConfigService {
    constructor(userGlobalConfig) {
        this.userGlobalConfig = userGlobalConfig;
        this.productionGlobalConfig = new GlobalClass.GlobalConfig();
        this.authorGlobalConfig = new GlobalClass.GlobalConfig();
        this.userGeneratedConfig = new GlobalClass.GlobalUserConfig(userGlobalConfig);
        // region *** author global config values (if there is no user input) ***
        this.authorGlobalConfig.DisplayColor.Primary = null; // new GlobalClass.ColorProvider('#ff9e00');
        this.authorGlobalConfig.DisplayColor.Secondary = null; // new GlobalClass.ColorProvider('#989ea5');
        this.authorGlobalConfig.DisplayColor.Success = null; // new GlobalClass.ColorProvider('#3caea3');
        this.authorGlobalConfig.DisplayColor.Info = null; // new GlobalClass.ColorProvider('#2f8ee5');
        this.authorGlobalConfig.DisplayColor.Warning = null; // new GlobalClass.ColorProvider('#ffc107');
        this.authorGlobalConfig.DisplayColor.Danger = null; // new GlobalClass.ColorProvider('#e46464');
        this.authorGlobalConfig.DisplayColor.Light = null; // new GlobalClass.ColorProvider('#f8f9fa');
        this.authorGlobalConfig.DisplayColor.Dark = null; // new GlobalClass.ColorProvider('#343a40');
        // endregion
        this.productionGlobalConfig.DisplayColor = this.authorGlobalConfig.DisplayColor;
        // region *** global userConfig (user input app-module) ***
        this.setUserColors(this.userGeneratedConfig.ColorList);
        // endregion
        this.setNodeStyles(this.productionGlobalConfig.DisplayColor);
    }
    resetStyles() {
        this.setUserColors(this.userGeneratedConfig.ColorList);
        this.setNodeStyles(this.productionGlobalConfig.DisplayColor, true);
    }
    setNodeStyles(_ProductionColorTypes, _Reset = false) {
        if (_Reset) {
            let evolveDialogStyleNode = document.getElementById('ngx-awesome-popup-glob-styles');
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
                    this.getSheet('ngx-awesome-popup-styles').addRule('.ngx-awesome-popup-overlay', `background:  ${_ProductionColorTypes[key].TransparentDarkenVariance}!important;`);
                }
            }
        });
    }
    setUserColors(_UserColorTypes) {
        if (typeof _UserColorTypes !== 'object') {
            return;
        }
        const userKeys = Object.keys(_UserColorTypes);
        const productionObjectKeys = Object.keys(this.productionGlobalConfig.DisplayColor);
        userKeys.forEach(key => {
            if (productionObjectKeys.find(tKey => tKey === key)) {
                if (_UserColorTypes[key]) {
                    const baseColorProvider = new GlobalClass.ColorProvider(_UserColorTypes[key]);
                    if (baseColorProvider.Base) {
                        this.productionGlobalConfig.DisplayColor[key] = baseColorProvider;
                    }
                }
                else {
                    this.productionGlobalConfig.DisplayColor[key] = null;
                }
            }
        });
    }
    getSheet(_StyleID) {
        // Create the <style> tag
        let evolveDialogStyleNode = document.getElementById(_StyleID);
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
    ;
    setToastStyling(_Key, _ColorProvider) {
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
    setButtonStyling(_Key, _ColorProvider) {
        const baseButtonClass = `.ed-btn-${_Key.toLowerCase()}`;
        const baseStyle = `
        color: ${_ColorProvider.ContrastColor}!important;
        background:  ${_ColorProvider.Base}!important;
        border-color: ${_ColorProvider.BrightenForShade}!important;
        `;
        const hoverButtonClass = `.ed-btn-${_Key.toLowerCase()}:hover`;
        const hoverStyle = `
        background:  ${_ColorProvider.IsBaseBright ? _ColorProvider.DarkenForShade : _ColorProvider.BrightenForShade}!important;
        border-color: ${_ColorProvider.IsBaseBright ? _ColorProvider.Darken : _ColorProvider.Brighten}!important;
        `;
        const focusActiveButtonClass = `.ed-btn-${_Key.toLowerCase()}:focus, .ed-btn-${_Key.toLowerCase()}:active`;
        const focusActiveStyle = `
        box-shadow: 0 0 1px 2px ${_ColorProvider.IsBaseBright ? _ColorProvider.Darken : _ColorProvider.Brighten}!important;
        `;
        this.getSheet('ngx-awesome-popup-glob-styles').addRule(baseButtonClass, baseStyle);
        this.getSheet('ngx-awesome-popup-glob-styles').addRule(hoverButtonClass, hoverStyle);
        this.getSheet('ngx-awesome-popup-glob-styles').addRule(focusActiveButtonClass, focusActiveStyle);
    }
    setIconStyling(_Key, _ColorProvider) {
        const baseIconClass = `.ap-icon-${_Key.toLowerCase()}`;
        const baseStyle = `color: ${_ColorProvider.BrightenForShade}!important;`;
        this.getSheet('ngx-awesome-popup-glob-styles').addRule(baseIconClass, baseStyle);
    }
    setDialogFrame(_Key, _ColorProvider) {
        const baseDialogFrameClass = `.ngx-awesome-popup-overlay .${_Key.toLowerCase()}-dialog`;
        const baseStyle = `
        border-color: ${_ColorProvider.Brighten}!important;
        `;
        this.getSheet('ngx-awesome-popup-glob-styles').addRule(baseDialogFrameClass, baseStyle);
    }
    setToastStyles() {
        this.getSheet('ngx-awesome-popup-styles').addRule(`.toast-entity`, `all 0.5s ease;`);
        this.getSheet('ngx-awesome-popup-styles').addRule(`.toast-entity:first-child`, `animation: move 0.7s ease-out;`);
        this.getSheet('ngx-awesome-popup-styles').addRule(`@-webkit-keyframes move`, `
                                        0% {margin-top: -5px; opacity: 0.4;}
                                        30% {margin-top: -4px; opacity: 0.7;}
                                        100% {margin-top: 0px; opacity: 1;}
                                        `);
        this.getSheet('ngx-awesome-popup-styles').addRule(`@keyframes move`, `
                                        0% {margin-top: -5px; opacity: 0.4;}
                                        30% {margin-top: -4px; opacity: 0.7;}
                                        100% {margin-top: 0px; opacity: 1;}
                                        `);
    }
}
GlobalConfigService.ɵprov = i0.ɵɵdefineInjectable({ factory: function GlobalConfigService_Factory() { return new GlobalConfigService(i0.ɵɵinject("globalConfig")); }, token: GlobalConfigService, providedIn: "root" });
GlobalConfigService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
GlobalConfigService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['globalConfig',] }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLWNvbmZpZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbmd4LWF3ZXNvbWUtcG9wdXAvY29yZS9nbG9iYWwtY29uZmlnLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUN0QyxPQUFPLEVBQUMsV0FBVyxFQUFrQixNQUFNLFVBQVUsQ0FBQzs7QUFNdEQsTUFBTSxPQUFPLG1CQUFtQjtJQU0vQixZQUE0QyxnQkFBbUQ7UUFBbkQscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFtQztRQUovRiwyQkFBc0IsR0FBc0MsSUFBSSxXQUFXLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDbkYsdUJBQWtCLEdBQWtDLElBQUksV0FBVyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBSTFGLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRTlFLHlFQUF5RTtRQUN6RSxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLE9BQU8sR0FBSyxJQUFJLENBQUMsQ0FBQyw0Q0FBNEM7UUFDbkcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLENBQUMsNENBQTRDO1FBQ25HLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsT0FBTyxHQUFLLElBQUksQ0FBQyxDQUFDLDRDQUE0QztRQUNuRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLElBQUksR0FBUSxJQUFJLENBQUMsQ0FBQyw0Q0FBNEM7UUFDbkcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxPQUFPLEdBQUssSUFBSSxDQUFDLENBQUMsNENBQTRD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QUVsRSxNQUFNLG9CQUFvQixHQUFHLCtCQUErQixJQUFJLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQztRQUN4RixNQUFNLFNBQVMsR0FBYzt3QkFDUCxjQUFjLENBQUMsUUFBUTtTQUN0QyxDQUFDO1FBRVIsSUFBSSxDQUFDLFFBQVEsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUV6RixDQUFDO0lBRU8sY0FBYztRQUdyQixJQUFJLENBQUMsUUFBUSxDQUFDLDBCQUEwQixDQUFDLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3JGLElBQUksQ0FBQyxRQUFRLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxPQUFPLENBQUMsMkJBQTJCLEVBQUUsZ0NBQWdDLENBQUMsQ0FBQztRQUNqSCxJQUFJLENBQUMsUUFBUSxDQUFDLDBCQUEwQixDQUFDLENBQUMsT0FBTyxDQUFDLHlCQUF5QixFQUFFOzs7O3lDQUl0QyxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLFFBQVEsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRTs7Ozt5Q0FJOUIsQ0FBQyxDQUFDO0lBQzFDLENBQUM7Ozs7WUFwTUQsVUFBVSxTQUFDO2dCQUNYLFVBQVUsRUFBRSxNQUFNO2FBQ2xCOzs7NENBT2EsTUFBTSxTQUFDLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbG9yVmFyaWFuY2V9IGZyb20gJy4vZW51bXMnO1xuaW1wb3J0IHtHbG9iYWxDbGFzcywgR2xvYmFsSW50ZXJmYWNlfSBmcm9tICcuL2dsb2JhbCc7XG5pbXBvcnQgSUNvbG9yUHJvdmlkZXIgPSBHbG9iYWxJbnRlcmZhY2UuSUNvbG9yUHJvdmlkZXI7XG5cbkBJbmplY3RhYmxlKHtcblx0cHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEdsb2JhbENvbmZpZ1NlcnZpY2Uge1xuXG5cdHByb2R1Y3Rpb25HbG9iYWxDb25maWc6IEdsb2JhbEludGVyZmFjZS5JR2xvYmFsQ29uZmlnICAgICA9IG5ldyBHbG9iYWxDbGFzcy5HbG9iYWxDb25maWcoKTtcblx0cHJpdmF0ZSBhdXRob3JHbG9iYWxDb25maWc6IEdsb2JhbEludGVyZmFjZS5JR2xvYmFsQ29uZmlnID0gbmV3IEdsb2JhbENsYXNzLkdsb2JhbENvbmZpZygpO1xuXHRwcml2YXRlIHVzZXJHZW5lcmF0ZWRDb25maWc6IEdsb2JhbEludGVyZmFjZS5JR2xvYmFsVXNlckNvbmZpZztcblxuXHRjb25zdHJ1Y3RvcihASW5qZWN0KCdnbG9iYWxDb25maWcnKSBwcml2YXRlIHVzZXJHbG9iYWxDb25maWc6IEdsb2JhbEludGVyZmFjZS5JR2xvYmFsVXNlckNvbmZpZykge1xuXHRcdHRoaXMudXNlckdlbmVyYXRlZENvbmZpZyA9IG5ldyBHbG9iYWxDbGFzcy5HbG9iYWxVc2VyQ29uZmlnKHVzZXJHbG9iYWxDb25maWcpO1xuXG5cdFx0Ly8gcmVnaW9uICoqKiBhdXRob3IgZ2xvYmFsIGNvbmZpZyB2YWx1ZXMgKGlmIHRoZXJlIGlzIG5vIHVzZXIgaW5wdXQpICoqKlxuXHRcdHRoaXMuYXV0aG9yR2xvYmFsQ29uZmlnLkRpc3BsYXlDb2xvci5QcmltYXJ5ICAgPSBudWxsOyAvLyBuZXcgR2xvYmFsQ2xhc3MuQ29sb3JQcm92aWRlcignI2ZmOWUwMCcpO1xuXHRcdHRoaXMuYXV0aG9yR2xvYmFsQ29uZmlnLkRpc3BsYXlDb2xvci5TZWNvbmRhcnkgPSBudWxsOyAvLyBuZXcgR2xvYmFsQ2xhc3MuQ29sb3JQcm92aWRlcignIzk4OWVhNScpO1xuXHRcdHRoaXMuYXV0aG9yR2xvYmFsQ29uZmlnLkRpc3BsYXlDb2xvci5TdWNjZXNzICAgPSBudWxsOyAvLyBuZXcgR2xvYmFsQ2xhc3MuQ29sb3JQcm92aWRlcignIzNjYWVhMycpO1xuXHRcdHRoaXMuYXV0aG9yR2xvYmFsQ29uZmlnLkRpc3BsYXlDb2xvci5JbmZvICAgICAgPSBudWxsOyAvLyBuZXcgR2xvYmFsQ2xhc3MuQ29sb3JQcm92aWRlcignIzJmOGVlNScpO1xuXHRcdHRoaXMuYXV0aG9yR2xvYmFsQ29uZmlnLkRpc3BsYXlDb2xvci5XYXJuaW5nICAgPSBudWxsOyAvLyBuZXcgR2xvYmFsQ2xhc3MuQ29sb3JQcm92aWRlcignI2ZmYzEwNycpO1xuXHRcdHRoaXMuYXV0aG9yR2xvYmFsQ29uZmlnLkRpc3BsYXlDb2xvci5EYW5nZXIgICAgPSBudWxsOyAvLyBuZXcgR2xvYmFsQ2xhc3MuQ29sb3JQcm92aWRlcignI2U0NjQ2NCcpO1xuXHRcdHRoaXMuYXV0aG9yR2xvYmFsQ29uZmlnLkRpc3BsYXlDb2xvci5MaWdodCAgICAgPSBudWxsOyAvLyBuZXcgR2xvYmFsQ2xhc3MuQ29sb3JQcm92aWRlcignI2Y4ZjlmYScpO1xuXHRcdHRoaXMuYXV0aG9yR2xvYmFsQ29uZmlnLkRpc3BsYXlDb2xvci5EYXJrICAgICAgPSBudWxsOyAvLyBuZXcgR2xvYmFsQ2xhc3MuQ29sb3JQcm92aWRlcignIzM0M2E0MCcpO1xuXHRcdC8vIGVuZHJlZ2lvblxuXG5cdFx0dGhpcy5wcm9kdWN0aW9uR2xvYmFsQ29uZmlnLkRpc3BsYXlDb2xvciA9IHRoaXMuYXV0aG9yR2xvYmFsQ29uZmlnLkRpc3BsYXlDb2xvcjtcblxuXHRcdC8vIHJlZ2lvbiAqKiogZ2xvYmFsIHVzZXJDb25maWcgKHVzZXIgaW5wdXQgYXBwLW1vZHVsZSkgKioqXG5cdFx0dGhpcy5zZXRVc2VyQ29sb3JzKHRoaXMudXNlckdlbmVyYXRlZENvbmZpZy5Db2xvckxpc3QpO1xuXG5cdFx0Ly8gZW5kcmVnaW9uXG5cblx0XHR0aGlzLnNldE5vZGVTdHlsZXModGhpcy5wcm9kdWN0aW9uR2xvYmFsQ29uZmlnLkRpc3BsYXlDb2xvcik7XG5cblx0fVxuXG5cdHJlc2V0U3R5bGVzKCk6IHZvaWQge1xuXHRcdHRoaXMuc2V0VXNlckNvbG9ycyh0aGlzLnVzZXJHZW5lcmF0ZWRDb25maWcuQ29sb3JMaXN0KTtcblx0XHR0aGlzLnNldE5vZGVTdHlsZXModGhpcy5wcm9kdWN0aW9uR2xvYmFsQ29uZmlnLkRpc3BsYXlDb2xvciwgdHJ1ZSk7XG5cdH1cblxuXHRzZXROb2RlU3R5bGVzKF9Qcm9kdWN0aW9uQ29sb3JUeXBlczogR2xvYmFsSW50ZXJmYWNlLklDb2xvck9iamVjdCwgX1Jlc2V0OiBib29sZWFuID0gZmFsc2UpIHtcblxuXHRcdGlmIChfUmVzZXQpIHtcblx0XHRcdGxldCBldm9sdmVEaWFsb2dTdHlsZU5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmd4LWF3ZXNvbWUtcG9wdXAtZ2xvYi1zdHlsZXMnKSBhcyBIVE1MU3R5bGVFbGVtZW50O1xuXHRcdFx0aWYgKGV2b2x2ZURpYWxvZ1N0eWxlTm9kZSkge1xuXHRcdFx0XHRldm9sdmVEaWFsb2dTdHlsZU5vZGUucmVtb3ZlKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuc2V0VG9hc3RTdHlsZXMoKTtcblxuXHRcdE9iamVjdC5rZXlzKF9Qcm9kdWN0aW9uQ29sb3JUeXBlcykuZm9yRWFjaChrZXkgPT4ge1xuXHRcdFx0aWYgKF9Qcm9kdWN0aW9uQ29sb3JUeXBlc1trZXldKSB7XG5cblx0XHRcdFx0dGhpcy5zZXRCdXR0b25TdHlsaW5nKGtleSwgX1Byb2R1Y3Rpb25Db2xvclR5cGVzW2tleV0pO1xuXHRcdFx0XHR0aGlzLnNldEljb25TdHlsaW5nKGtleSwgX1Byb2R1Y3Rpb25Db2xvclR5cGVzW2tleV0pO1xuXHRcdFx0XHR0aGlzLnNldFRvYXN0U3R5bGluZyhrZXksIF9Qcm9kdWN0aW9uQ29sb3JUeXBlc1trZXldKTtcblx0XHRcdFx0dGhpcy5zZXREaWFsb2dGcmFtZShrZXksIF9Qcm9kdWN0aW9uQ29sb3JUeXBlc1trZXldKTtcblxuXHRcdFx0XHRpZiAoQ29sb3JWYXJpYW5jZVtrZXkudG9VcHBlckNhc2UoKV0gPT09IENvbG9yVmFyaWFuY2UuUFJJTUFSWSkge1xuXHRcdFx0XHRcdHRoaXMuZ2V0U2hlZXQoJ25neC1hd2Vzb21lLXBvcHVwLXN0eWxlcycpLmFkZFJ1bGUoJy5uZ3gtYXdlc29tZS1wb3B1cC1vdmVybGF5JywgYGJhY2tncm91bmQ6ICAke19Qcm9kdWN0aW9uQ29sb3JUeXBlc1trZXldLlRyYW5zcGFyZW50RGFya2VuVmFyaWFuY2V9IWltcG9ydGFudDtgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cblx0fVxuXG5cdHB1YmxpYyBzZXRVc2VyQ29sb3JzKF9Vc2VyQ29sb3JUeXBlczogR2xvYmFsSW50ZXJmYWNlLklDb2xvclR5cGVzKTogdm9pZCB7XG5cblx0XHRpZiAodHlwZW9mIF9Vc2VyQ29sb3JUeXBlcyAhPT0gJ29iamVjdCcpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRjb25zdCB1c2VyS2V5cyAgICAgICAgICAgICA9IE9iamVjdC5rZXlzKF9Vc2VyQ29sb3JUeXBlcyk7XG5cdFx0Y29uc3QgcHJvZHVjdGlvbk9iamVjdEtleXMgPSBPYmplY3Qua2V5cyh0aGlzLnByb2R1Y3Rpb25HbG9iYWxDb25maWcuRGlzcGxheUNvbG9yKTtcblxuXHRcdHVzZXJLZXlzLmZvckVhY2goa2V5ID0+IHtcblxuXHRcdFx0aWYgKHByb2R1Y3Rpb25PYmplY3RLZXlzLmZpbmQodEtleSA9PiB0S2V5ID09PSBrZXkpKSB7XG5cdFx0XHRcdGlmIChfVXNlckNvbG9yVHlwZXNba2V5XSkge1xuXHRcdFx0XHRcdGNvbnN0IGJhc2VDb2xvclByb3ZpZGVyID0gbmV3IEdsb2JhbENsYXNzLkNvbG9yUHJvdmlkZXIoX1VzZXJDb2xvclR5cGVzW2tleV0pO1xuXHRcdFx0XHRcdGlmIChiYXNlQ29sb3JQcm92aWRlci5CYXNlKSB7XG5cblx0XHRcdFx0XHRcdHRoaXMucHJvZHVjdGlvbkdsb2JhbENvbmZpZy5EaXNwbGF5Q29sb3Jba2V5XSA9IGJhc2VDb2xvclByb3ZpZGVyO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLnByb2R1Y3Rpb25HbG9iYWxDb25maWcuRGlzcGxheUNvbG9yW2tleV0gPSBudWxsO1xuXHRcdFx0XHR9XG5cblx0XHRcdH1cblx0XHR9KTtcblxuXHR9XG5cblx0cHVibGljIGdldFNoZWV0KF9TdHlsZUlEOiBzdHJpbmcpIHtcblx0XHQvLyBDcmVhdGUgdGhlIDxzdHlsZT4gdGFnXG5cdFx0bGV0IGV2b2x2ZURpYWxvZ1N0eWxlTm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKF9TdHlsZUlEKSBhcyBIVE1MU3R5bGVFbGVtZW50O1xuXHRcdGlmICghZXZvbHZlRGlhbG9nU3R5bGVOb2RlKSB7XG5cdFx0XHRjb25zdCBoZWFkTm9kZSA9IGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcblx0XHRcdGlmICghaGVhZE5vZGUpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRldm9sdmVEaWFsb2dTdHlsZU5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXHRcdFx0ZXZvbHZlRGlhbG9nU3R5bGVOb2RlLnNldEF0dHJpYnV0ZSgnaWQnLCBfU3R5bGVJRCk7XG5cdFx0XHRldm9sdmVEaWFsb2dTdHlsZU5vZGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpKTtcblx0XHRcdGhlYWROb2RlLmFwcGVuZENoaWxkKGV2b2x2ZURpYWxvZ1N0eWxlTm9kZSk7XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gZXZvbHZlRGlhbG9nU3R5bGVOb2RlID8gZXZvbHZlRGlhbG9nU3R5bGVOb2RlLnNoZWV0IDogbnVsbDtcblx0fTtcblxuXHRwcml2YXRlIHNldFRvYXN0U3R5bGluZyhfS2V5OiBzdHJpbmcsIF9Db2xvclByb3ZpZGVyOiBJQ29sb3JQcm92aWRlcikge1xuXG5cdFx0Y29uc3Qgc3RhbmRhcmRUb2FzdCAgICAgID0gYC50b2FzdC13cmFwcGVyLnN0YW5kYXJkLXRvYXN0IC5ldm9sdmUtdG9hc3QuJHtfS2V5LnRvTG93ZXJDYXNlKCl9LWRpYWxvZ2A7XG5cdFx0Y29uc3Qgc3RhbmRhcmRUb2FzdFN0eWxlID0gYFxuICAgICAgICBiYWNrZ3JvdW5kOiAgJHtfQ29sb3JQcm92aWRlci5CcmlnaHRTaGFkZX0haW1wb3J0YW50O1xuICAgICAgICBib3JkZXItY29sb3I6ICR7X0NvbG9yUHJvdmlkZXIuQnJpZ2h0ZW59IWltcG9ydGFudDtcbiAgICAgICAgYDtcblxuXHRcdGNvbnN0IHNpbXBsZVRvYXN0ICAgICAgPSBgLnRvYXN0LXdyYXBwZXIuc2ltcGxlLXRvYXN0IC5ldm9sdmUtdG9hc3QuJHtfS2V5LnRvTG93ZXJDYXNlKCl9LWRpYWxvZ2A7XG5cdFx0Y29uc3Qgc2ltcGxlVG9hc3RTdHlsZSA9IGBcbiAgICAgICAgYmFja2dyb3VuZDogICR7X0NvbG9yUHJvdmlkZXIuQnJpZ2h0V2FybWx5fSFpbXBvcnRhbnQ7XG4gICAgICAgIGNvbG9yOiAgJHtfQ29sb3JQcm92aWRlci5EYXJrZW59IWltcG9ydGFudDtcbiAgICAgICAgYDtcblxuXHRcdGNvbnN0IGJhc2VQcm9ncmVzcyAgICAgID0gYC50b2FzdC13cmFwcGVyIC5ldm9sdmUtdG9hc3QuJHtfS2V5LnRvTG93ZXJDYXNlKCl9LWRpYWxvZyAucHJvZ3Jlc3MtYmFyYDtcblx0XHRjb25zdCBiYXNlUHJvZ3Jlc3NTdHlsZSA9IGBcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogICR7X0NvbG9yUHJvdmlkZXIuQnJpZ2h0ZW59IWltcG9ydGFudDtcbiAgICAgICAgYDtcblxuXHRcdHRoaXMuZ2V0U2hlZXQoJ25neC1hd2Vzb21lLXBvcHVwLWdsb2Itc3R5bGVzJykuYWRkUnVsZShiYXNlUHJvZ3Jlc3MsIGJhc2VQcm9ncmVzc1N0eWxlKTtcblx0XHR0aGlzLmdldFNoZWV0KCduZ3gtYXdlc29tZS1wb3B1cC1nbG9iLXN0eWxlcycpLmFkZFJ1bGUoc3RhbmRhcmRUb2FzdCwgc3RhbmRhcmRUb2FzdFN0eWxlKTtcblx0XHR0aGlzLmdldFNoZWV0KCduZ3gtYXdlc29tZS1wb3B1cC1nbG9iLXN0eWxlcycpLmFkZFJ1bGUoc2ltcGxlVG9hc3QsIHNpbXBsZVRvYXN0U3R5bGUpO1xuXHR9XG5cblx0cHJpdmF0ZSBzZXRCdXR0b25TdHlsaW5nKF9LZXk6IHN0cmluZywgX0NvbG9yUHJvdmlkZXI6IElDb2xvclByb3ZpZGVyKSB7XG5cblx0XHRjb25zdCBiYXNlQnV0dG9uQ2xhc3MgPSBgLmVkLWJ0bi0ke19LZXkudG9Mb3dlckNhc2UoKX1gO1xuXHRcdGNvbnN0IGJhc2VTdHlsZSAgICAgICA9IGBcbiAgICAgICAgY29sb3I6ICR7X0NvbG9yUHJvdmlkZXIuQ29udHJhc3RDb2xvcn0haW1wb3J0YW50O1xuICAgICAgICBiYWNrZ3JvdW5kOiAgJHtfQ29sb3JQcm92aWRlci5CYXNlfSFpbXBvcnRhbnQ7XG4gICAgICAgIGJvcmRlci1jb2xvcjogJHtfQ29sb3JQcm92aWRlci5CcmlnaHRlbkZvclNoYWRlfSFpbXBvcnRhbnQ7XG4gICAgICAgIGA7XG5cblx0XHRjb25zdCBob3ZlckJ1dHRvbkNsYXNzID0gYC5lZC1idG4tJHtfS2V5LnRvTG93ZXJDYXNlKCl9OmhvdmVyYDtcblx0XHRjb25zdCBob3ZlclN0eWxlICAgICAgID0gYFxuICAgICAgICBiYWNrZ3JvdW5kOiAgJHtfQ29sb3JQcm92aWRlci5Jc0Jhc2VCcmlnaHQgPyBfQ29sb3JQcm92aWRlci5EYXJrZW5Gb3JTaGFkZSA6IF9Db2xvclByb3ZpZGVyLkJyaWdodGVuRm9yU2hhZGV9IWltcG9ydGFudDtcbiAgICAgICAgYm9yZGVyLWNvbG9yOiAke19Db2xvclByb3ZpZGVyLklzQmFzZUJyaWdodCA/IF9Db2xvclByb3ZpZGVyLkRhcmtlbiA6IF9Db2xvclByb3ZpZGVyLkJyaWdodGVufSFpbXBvcnRhbnQ7XG4gICAgICAgIGA7XG5cblx0XHRjb25zdCBmb2N1c0FjdGl2ZUJ1dHRvbkNsYXNzID0gYC5lZC1idG4tJHtfS2V5LnRvTG93ZXJDYXNlKCl9OmZvY3VzLCAuZWQtYnRuLSR7X0tleS50b0xvd2VyQ2FzZSgpfTphY3RpdmVgO1xuXHRcdGNvbnN0IGZvY3VzQWN0aXZlU3R5bGUgICAgICAgPSBgXG4gICAgICAgIGJveC1zaGFkb3c6IDAgMCAxcHggMnB4ICR7X0NvbG9yUHJvdmlkZXIuSXNCYXNlQnJpZ2h0ID8gX0NvbG9yUHJvdmlkZXIuRGFya2VuIDogX0NvbG9yUHJvdmlkZXIuQnJpZ2h0ZW59IWltcG9ydGFudDtcbiAgICAgICAgYDtcblxuXHRcdHRoaXMuZ2V0U2hlZXQoJ25neC1hd2Vzb21lLXBvcHVwLWdsb2Itc3R5bGVzJykuYWRkUnVsZShiYXNlQnV0dG9uQ2xhc3MsIGJhc2VTdHlsZSk7XG5cdFx0dGhpcy5nZXRTaGVldCgnbmd4LWF3ZXNvbWUtcG9wdXAtZ2xvYi1zdHlsZXMnKS5hZGRSdWxlKGhvdmVyQnV0dG9uQ2xhc3MsIGhvdmVyU3R5bGUpO1xuXHRcdHRoaXMuZ2V0U2hlZXQoJ25neC1hd2Vzb21lLXBvcHVwLWdsb2Itc3R5bGVzJykuYWRkUnVsZShmb2N1c0FjdGl2ZUJ1dHRvbkNsYXNzLCBmb2N1c0FjdGl2ZVN0eWxlKTtcblxuXHR9XG5cblx0cHJpdmF0ZSBzZXRJY29uU3R5bGluZyhfS2V5OiBzdHJpbmcsIF9Db2xvclByb3ZpZGVyOiBJQ29sb3JQcm92aWRlcikge1xuXG5cdFx0Y29uc3QgYmFzZUljb25DbGFzcyA9IGAuYXAtaWNvbi0ke19LZXkudG9Mb3dlckNhc2UoKX1gO1xuXHRcdGNvbnN0IGJhc2VTdHlsZSAgICAgPSBgY29sb3I6ICR7X0NvbG9yUHJvdmlkZXIuQnJpZ2h0ZW5Gb3JTaGFkZX0haW1wb3J0YW50O2A7XG5cblx0XHR0aGlzLmdldFNoZWV0KCduZ3gtYXdlc29tZS1wb3B1cC1nbG9iLXN0eWxlcycpLmFkZFJ1bGUoYmFzZUljb25DbGFzcywgYmFzZVN0eWxlKTtcblx0fVxuXG5cdHByaXZhdGUgc2V0RGlhbG9nRnJhbWUoX0tleTogc3RyaW5nLCBfQ29sb3JQcm92aWRlcjogSUNvbG9yUHJvdmlkZXIpIHtcblxuXHRcdGNvbnN0IGJhc2VEaWFsb2dGcmFtZUNsYXNzID0gYC5uZ3gtYXdlc29tZS1wb3B1cC1vdmVybGF5IC4ke19LZXkudG9Mb3dlckNhc2UoKX0tZGlhbG9nYDtcblx0XHRjb25zdCBiYXNlU3R5bGUgICAgICAgICAgICA9IGBcbiAgICAgICAgYm9yZGVyLWNvbG9yOiAke19Db2xvclByb3ZpZGVyLkJyaWdodGVufSFpbXBvcnRhbnQ7XG4gICAgICAgIGA7XG5cblx0XHR0aGlzLmdldFNoZWV0KCduZ3gtYXdlc29tZS1wb3B1cC1nbG9iLXN0eWxlcycpLmFkZFJ1bGUoYmFzZURpYWxvZ0ZyYW1lQ2xhc3MsIGJhc2VTdHlsZSk7XG5cblx0fVxuXG5cdHByaXZhdGUgc2V0VG9hc3RTdHlsZXMoKSB7XG5cblxuXHRcdHRoaXMuZ2V0U2hlZXQoJ25neC1hd2Vzb21lLXBvcHVwLXN0eWxlcycpLmFkZFJ1bGUoYC50b2FzdC1lbnRpdHlgLCBgYWxsIDAuNXMgZWFzZTtgKTtcblx0XHR0aGlzLmdldFNoZWV0KCduZ3gtYXdlc29tZS1wb3B1cC1zdHlsZXMnKS5hZGRSdWxlKGAudG9hc3QtZW50aXR5OmZpcnN0LWNoaWxkYCwgYGFuaW1hdGlvbjogbW92ZSAwLjdzIGVhc2Utb3V0O2ApO1xuXHRcdHRoaXMuZ2V0U2hlZXQoJ25neC1hd2Vzb21lLXBvcHVwLXN0eWxlcycpLmFkZFJ1bGUoYEAtd2Via2l0LWtleWZyYW1lcyBtb3ZlYCwgYFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDAlIHttYXJnaW4tdG9wOiAtNXB4OyBvcGFjaXR5OiAwLjQ7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDMwJSB7bWFyZ2luLXRvcDogLTRweDsgb3BhY2l0eTogMC43O31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxMDAlIHttYXJnaW4tdG9wOiAwcHg7IG9wYWNpdHk6IDE7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGApO1xuXHRcdHRoaXMuZ2V0U2hlZXQoJ25neC1hd2Vzb21lLXBvcHVwLXN0eWxlcycpLmFkZFJ1bGUoYEBrZXlmcmFtZXMgbW92ZWAsIGBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwJSB7bWFyZ2luLXRvcDogLTVweDsgb3BhY2l0eTogMC40O31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAzMCUge21hcmdpbi10b3A6IC00cHg7IG9wYWNpdHk6IDAuNzt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMTAwJSB7bWFyZ2luLXRvcDogMHB4OyBvcGFjaXR5OiAxO31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgKTtcblx0fVxuXG59XG4iXX0=