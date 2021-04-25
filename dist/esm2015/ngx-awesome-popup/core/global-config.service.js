import { Inject, Injectable } from '@angular/core';
import { GlobalClass } from './global';
import { ColorVariance } from './enums';
import * as i0 from "@angular/core";
export class GlobalConfigService {
    constructor(userGlobalConfig) {
        this.userGlobalConfig = userGlobalConfig;
        this.productionGlobalConfig = new GlobalClass.GlobalConfig();
        this.authorGlobalConfig = new GlobalClass.GlobalConfig();
        userGlobalConfig = new GlobalClass.GlobalUserConfig(userGlobalConfig);
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
        this.setUserColors(userGlobalConfig.ColorList);
        // endregion
        this.setToastNode();
        this.setNodeStyles(this.productionGlobalConfig.DisplayColor);
    }
    setNodeStyles(_ProductionColorTypes) {
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
    setToastStyling(_Key, _ColorProvider) {
        const baseClass = `.overlay-toast .evolve-toast.${_Key.toLowerCase()}-dialog`;
        const baseStyle = `
        background:  ${_ColorProvider.BrightShade}!important;
        border-color: ${_ColorProvider.Brighten}!important;
        `;
        this.getSheet().addRule(baseClass, baseStyle);
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
        this.getSheet().addRule(baseButtonClass, baseStyle);
        this.getSheet().addRule(hoverButtonClass, hoverStyle);
        this.getSheet().addRule(focusActiveButtonClass, focusActiveStyle);
    }
    setIconStyling(_Key, _ColorProvider) {
        const baseIconClass = `.ap-icon-${_Key.toLowerCase()}`;
        const baseStyle = `color: ${_ColorProvider.BrightenForShade}!important;`;
        this.getSheet().addRule(baseIconClass, baseStyle);
    }
    setDialogFrame(_Key, _ColorProvider) {
        const baseDialogFrameClass = `.ngx-awesome-popup-overlay .${_Key.toLowerCase()}-dialog`;
        const baseStyle = `
        border-color: ${_ColorProvider.Brighten}!important;
        `;
        this.getSheet().addRule(baseDialogFrameClass, baseStyle);
    }
    getSheet() {
        // Create the <style> tag
        let evolveDialogStyleNode = document.getElementById('ngx-awesome-popup-styles');
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
    }
    ;
    setToastNode() {
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
    setUserColors(_UserColorTypes) {
        if (typeof _UserColorTypes !== 'object') {
            return;
        }
        const userKeys = Object.keys(_UserColorTypes);
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
GlobalConfigService.ɵprov = i0.ɵɵdefineInjectable({ factory: function GlobalConfigService_Factory() { return new GlobalConfigService(i0.ɵɵinject("globalConfig")); }, token: GlobalConfigService, providedIn: "root" });
GlobalConfigService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
GlobalConfigService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['globalConfig',] }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLWNvbmZpZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbmd4LWF3ZXNvbWUtcG9wdXAvY29yZS9nbG9iYWwtY29uZmlnLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFDLFdBQVcsRUFBa0IsTUFBTSxVQUFVLENBQUM7QUFDdEQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLFNBQVMsQ0FBQzs7QUFNdEMsTUFBTSxPQUFPLG1CQUFtQjtJQUs1QixZQUE0QyxnQkFBbUQ7UUFBbkQscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFtQztRQUgvRiwyQkFBc0IsR0FBc0MsSUFBSSxXQUFXLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDbkYsdUJBQWtCLEdBQWtDLElBQUksV0FBVyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBR3ZGLGdCQUFnQixHQUFHLElBQUksV0FBVyxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFFdEUseUVBQXlFO1FBQ3pFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsT0FBTyxHQUFLLElBQUksQ0FBQyxDQUFDLDRDQUE0QztRQUNuRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsQ0FBQyw0Q0FBNEM7UUFDbkcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxPQUFPLEdBQUssSUFBSSxDQUFDLENBQUMsNENBQTRDO1FBQ25HLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsSUFBSSxHQUFRLElBQUksQ0FBQyxDQUFDLDRDQUE0QztRQUNuRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLE9BQU8sR0FBSyxJQUFJLENBQUMsQ0FBQyw0Q0FBNEM7UUFDbkcsSUFB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QUFVLEVBQUUsTUFBTTthQUNyQjs7OzRDQU1nQixNQUFNLFNBQUMsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7R2xvYmFsQ2xhc3MsIEdsb2JhbEludGVyZmFjZX0gZnJvbSAnLi9nbG9iYWwnO1xuaW1wb3J0IHtDb2xvclZhcmlhbmNlfSBmcm9tICcuL2VudW1zJztcbmltcG9ydCBJQ29sb3JQcm92aWRlciA9IEdsb2JhbEludGVyZmFjZS5JQ29sb3JQcm92aWRlcjtcblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBHbG9iYWxDb25maWdTZXJ2aWNlIHtcbiAgICBcbiAgICBwcm9kdWN0aW9uR2xvYmFsQ29uZmlnOiBHbG9iYWxJbnRlcmZhY2UuSUdsb2JhbENvbmZpZyAgICAgPSBuZXcgR2xvYmFsQ2xhc3MuR2xvYmFsQ29uZmlnKCk7XG4gICAgcHJpdmF0ZSBhdXRob3JHbG9iYWxDb25maWc6IEdsb2JhbEludGVyZmFjZS5JR2xvYmFsQ29uZmlnID0gbmV3IEdsb2JhbENsYXNzLkdsb2JhbENvbmZpZygpO1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoJ2dsb2JhbENvbmZpZycpIHByaXZhdGUgdXNlckdsb2JhbENvbmZpZzogR2xvYmFsSW50ZXJmYWNlLklHbG9iYWxVc2VyQ29uZmlnKSB7XG4gICAgICAgIHVzZXJHbG9iYWxDb25maWcgPSBuZXcgR2xvYmFsQ2xhc3MuR2xvYmFsVXNlckNvbmZpZyh1c2VyR2xvYmFsQ29uZmlnKTtcblxuICAgICAgICAvLyByZWdpb24gKioqIGF1dGhvciBnbG9iYWwgY29uZmlnIHZhbHVlcyAoaWYgdGhlcmUgaXMgbm8gdXNlciBpbnB1dCkgKioqXG4gICAgICAgIHRoaXMuYXV0aG9yR2xvYmFsQ29uZmlnLkRpc3BsYXlDb2xvci5QcmltYXJ5ICAgPSBudWxsOyAvLyBuZXcgR2xvYmFsQ2xhc3MuQ29sb3JQcm92aWRlcignI2ZmOWUwMCcpO1xuICAgICAgICB0aGlzLmF1dGhvckdsb2JhbENvbmZpZy5EaXNwbGF5Q29sb3IuU2Vjb25kYXJ5ID0gbnVsbDsgLy8gbmV3IEdsb2JhbENsYXNzLkNvbG9yUHJvdmlkZXIoJyM5ODllYTUnKTtcbiAgICAgICAgdGhpcy5hdXRob3JHbG9iYWxDb25maWcuRGlzcGxheUNvbG9yLlN1Y2Nlc3MgICA9IG51bGw7IC8vIG5ldyBHbG9iYWxDbGFzcy5Db2xvclByb3ZpZGVyKCcjM2NhZWEzJyk7XG4gICAgICAgIHRoaXMuYXV0aG9yR2xvYmFsQ29uZmlnLkRpc3BsYXlDb2xvci5JbmZvICAgICAgPSBudWxsOyAvLyBuZXcgR2xvYmFsQ2xhc3MuQ29sb3JQcm92aWRlcignIzJmOGVlNScpO1xuICAgICAgICB0aGlzLmF1dGhvckdsb2JhbENvbmZpZy5EaXNwbGF5Q29sb3IuV2FybmluZyAgID0gbnVsbDsgLy8gbmV3IEdsb2JhbENsYXNzLkNvbG9yUHJvdmlkZXIoJyNmZmMxMDcnKTtcbiAgICAgICAgdGhpcy5hdXRob3JHbG9iYWxDb25maWcuRGlzcGxheUNvbG9yLkRhbmdlciAgICA9IG51bGw7IC8vIG5ldyBHbG9iYWxDbGFzcy5Db2xvclByb3ZpZGVyKCcjZTQ2NDY0Jyk7XG4gICAgICAgIHRoaXMuYXV0aG9yR2xvYmFsQ29uZmlnLkRpc3BsYXlDb2xvci5MaWdodCAgICAgPSBudWxsOyAvLyBuZXcgR2xvYmFsQ2xhc3MuQ29sb3JQcm92aWRlcignI2Y4ZjlmYScpO1xuICAgICAgICB0aGlzLmF1dGhvckdsb2JhbENvbmZpZy5EaXNwbGF5Q29sb3IuRGFyayAgICAgID0gbnVsbDsgLy8gbmV3IEdsb2JhbENsYXNzLkNvbG9yUHJvdmlkZXIoJyMzNDNhNDAnKTtcbiAgICAgICAgLy8gZW5kcmVnaW9uXG4gICAgICAgIFxuICAgICAgICB0aGlzLnByb2R1Y3Rpb25HbG9iYWxDb25maWcuRGlzcGxheUNvbG9yID0gdGhpcy5hdXRob3JHbG9iYWxDb25maWcuRGlzcGxheUNvbG9yO1xuICAgICAgICBcbiAgICAgICAgLy8gcmVnaW9uICoqKiBnbG9iYWwgdXNlckNvbmZpZyAodXNlciBpbnB1dCBhcHAtbW9kdWxlKSAqKipcbiAgICAgICAgdGhpcy5zZXRVc2VyQ29sb3JzKHVzZXJHbG9iYWxDb25maWcuQ29sb3JMaXN0KTtcbiAgICAgICAgXG4gICAgICAgIC8vIGVuZHJlZ2lvblxuICAgICAgICBcbiAgICAgICAgdGhpcy5zZXRUb2FzdE5vZGUoKTtcbiAgICAgICAgdGhpcy5zZXROb2RlU3R5bGVzKHRoaXMucHJvZHVjdGlvbkdsb2JhbENvbmZpZy5EaXNwbGF5Q29sb3IpO1xuICAgICAgICBcbiAgICB9XG4gICAgXG4gICAgcHJpdmF0ZSBzZXROb2RlU3R5bGVzKF9Qcm9kdWN0aW9uQ29sb3JUeXBlczogR2xvYmFsSW50ZXJmYWNlLklDb2xvck9iamVjdCkge1xuICAgICAgICBcbiAgICAgICAgT2JqZWN0LmtleXMoX1Byb2R1Y3Rpb25Db2xvclR5cGVzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICBpZiAoX1Byb2R1Y3Rpb25Db2xvclR5cGVzW2tleV0pIHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0aGlzLnNldEJ1dHRvblN0eWxpbmcoa2V5LCBfUHJvZHVjdGlvbkNvbG9yVHlwZXNba2V5XSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRJY29uU3R5bGluZyhrZXksIF9Qcm9kdWN0aW9uQ29sb3JUeXBlc1trZXldKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFRvYXN0U3R5bGluZyhrZXksIF9Qcm9kdWN0aW9uQ29sb3JUeXBlc1trZXldKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldERpYWxvZ0ZyYW1lKGtleSwgX1Byb2R1Y3Rpb25Db2xvclR5cGVzW2tleV0pO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChDb2xvclZhcmlhbmNlW2tleS50b1VwcGVyQ2FzZSgpXSA9PT0gQ29sb3JWYXJpYW5jZS5QUklNQVJZKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0U2hlZXQoKS5hZGRSdWxlKCcubmd4LWF3ZXNvbWUtcG9wdXAtb3ZlcmxheScsIGBiYWNrZ3JvdW5kOiAgJHtfUHJvZHVjdGlvbkNvbG9yVHlwZXNba2V5XS5UcmFuc3BhcmVudERhcmtlblZhcmlhbmNlfSFpbXBvcnRhbnQ7YCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgfVxuICAgIFxuICAgIHByaXZhdGUgc2V0VG9hc3RTdHlsaW5nKF9LZXk6IHN0cmluZywgX0NvbG9yUHJvdmlkZXI6IElDb2xvclByb3ZpZGVyKSB7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBiYXNlQ2xhc3MgPSBgLm92ZXJsYXktdG9hc3QgLmV2b2x2ZS10b2FzdC4ke19LZXkudG9Mb3dlckNhc2UoKX0tZGlhbG9nYDtcbiAgICAgICAgY29uc3QgYmFzZVN0eWxlID0gYFxuICAgICAgICBiYWNrZ3JvdW5kOiAgJHtfQ29sb3JQcm92aWRlci5CcmlnaHRTaGFkZX0haW1wb3J0YW50O1xuICAgICAgICBib3JkZXItY29sb3I6ICR7X0NvbG9yUHJvdmlkZXIuQnJpZ2h0ZW59IWltcG9ydGFudDtcbiAgICAgICAgYDtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZ2V0U2hlZXQoKS5hZGRSdWxlKGJhc2VDbGFzcywgYmFzZVN0eWxlKTtcbiAgICB9XG4gICAgXG4gICAgcHJpdmF0ZSBzZXRCdXR0b25TdHlsaW5nKF9LZXk6IHN0cmluZywgX0NvbG9yUHJvdmlkZXI6IElDb2xvclByb3ZpZGVyKSB7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBiYXNlQnV0dG9uQ2xhc3MgPSBgLmVkLWJ0bi0ke19LZXkudG9Mb3dlckNhc2UoKX1gO1xuICAgICAgICBjb25zdCBiYXNlU3R5bGUgICAgICAgPSBgXG4gICAgICAgIGNvbG9yOiAke19Db2xvclByb3ZpZGVyLkNvbnRyYXN0Q29sb3J9IWltcG9ydGFudDtcbiAgICAgICAgYmFja2dyb3VuZDogICR7X0NvbG9yUHJvdmlkZXIuQmFzZX0haW1wb3J0YW50O1xuICAgICAgICBib3JkZXItY29sb3I6ICR7X0NvbG9yUHJvdmlkZXIuQnJpZ2h0ZW5Gb3JTaGFkZX0haW1wb3J0YW50O1xuICAgICAgICBgO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgaG92ZXJCdXR0b25DbGFzcyA9IGAuZWQtYnRuLSR7X0tleS50b0xvd2VyQ2FzZSgpfTpob3ZlcmA7XG4gICAgICAgIGNvbnN0IGhvdmVyU3R5bGUgICAgICAgPSBgXG4gICAgICAgIGJhY2tncm91bmQ6ICAke19Db2xvclByb3ZpZGVyLklzQmFzZUJyaWdodCA/IF9Db2xvclByb3ZpZGVyLkRhcmtlbkZvclNoYWRlIDogX0NvbG9yUHJvdmlkZXIuQnJpZ2h0ZW5Gb3JTaGFkZX0haW1wb3J0YW50O1xuICAgICAgICBib3JkZXItY29sb3I6ICR7X0NvbG9yUHJvdmlkZXIuSXNCYXNlQnJpZ2h0ID8gX0NvbG9yUHJvdmlkZXIuRGFya2VuIDogX0NvbG9yUHJvdmlkZXIuQnJpZ2h0ZW59IWltcG9ydGFudDtcbiAgICAgICAgYDtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGZvY3VzQWN0aXZlQnV0dG9uQ2xhc3MgPSBgLmVkLWJ0bi0ke19LZXkudG9Mb3dlckNhc2UoKX06Zm9jdXMsIC5lZC1idG4tJHtfS2V5LnRvTG93ZXJDYXNlKCl9OmFjdGl2ZWA7XG4gICAgICAgIGNvbnN0IGZvY3VzQWN0aXZlU3R5bGUgICAgICAgPSBgXG4gICAgICAgIGJveC1zaGFkb3c6IDAgMCAxcHggMnB4ICR7X0NvbG9yUHJvdmlkZXIuSXNCYXNlQnJpZ2h0ID8gX0NvbG9yUHJvdmlkZXIuRGFya2VuIDogX0NvbG9yUHJvdmlkZXIuQnJpZ2h0ZW59IWltcG9ydGFudDtcbiAgICAgICAgYDtcbiAgICBcbiAgICAgICAgdGhpcy5nZXRTaGVldCgpLmFkZFJ1bGUoYmFzZUJ1dHRvbkNsYXNzLCBiYXNlU3R5bGUpO1xuICAgICAgICB0aGlzLmdldFNoZWV0KCkuYWRkUnVsZShob3ZlckJ1dHRvbkNsYXNzLCBob3ZlclN0eWxlKTtcbiAgICAgICAgdGhpcy5nZXRTaGVldCgpLmFkZFJ1bGUoZm9jdXNBY3RpdmVCdXR0b25DbGFzcywgZm9jdXNBY3RpdmVTdHlsZSk7XG4gICAgXG4gICAgfVxuICAgIFxuICAgIHByaXZhdGUgc2V0SWNvblN0eWxpbmcoX0tleTogc3RyaW5nLCBfQ29sb3JQcm92aWRlcjogSUNvbG9yUHJvdmlkZXIpIHtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGJhc2VJY29uQ2xhc3MgPSBgLmFwLWljb24tJHtfS2V5LnRvTG93ZXJDYXNlKCl9YDtcbiAgICAgICAgY29uc3QgYmFzZVN0eWxlICAgICA9IGBjb2xvcjogJHtfQ29sb3JQcm92aWRlci5CcmlnaHRlbkZvclNoYWRlfSFpbXBvcnRhbnQ7YDtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZ2V0U2hlZXQoKS5hZGRSdWxlKGJhc2VJY29uQ2xhc3MsIGJhc2VTdHlsZSk7XG4gICAgICAgIFxuICAgIH1cbiAgICBcbiAgICBwcml2YXRlIHNldERpYWxvZ0ZyYW1lKF9LZXk6IHN0cmluZywgX0NvbG9yUHJvdmlkZXI6IElDb2xvclByb3ZpZGVyKSB7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBiYXNlRGlhbG9nRnJhbWVDbGFzcyA9IGAubmd4LWF3ZXNvbWUtcG9wdXAtb3ZlcmxheSAuJHtfS2V5LnRvTG93ZXJDYXNlKCl9LWRpYWxvZ2A7XG4gICAgICAgIGNvbnN0IGJhc2VTdHlsZSAgICAgICAgICAgID0gYFxuICAgICAgICBib3JkZXItY29sb3I6ICR7X0NvbG9yUHJvdmlkZXIuQnJpZ2h0ZW59IWltcG9ydGFudDtcbiAgICAgICAgYDtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZ2V0U2hlZXQoKS5hZGRSdWxlKGJhc2VEaWFsb2dGcmFtZUNsYXNzLCBiYXNlU3R5bGUpO1xuICAgICAgICBcbiAgICB9XG4gICAgXG4gICAgcHJpdmF0ZSBnZXRTaGVldCgpIHtcbiAgICAgICAgLy8gQ3JlYXRlIHRoZSA8c3R5bGU+IHRhZ1xuICAgICAgICBsZXQgZXZvbHZlRGlhbG9nU3R5bGVOb2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25neC1hd2Vzb21lLXBvcHVwLXN0eWxlcycpIGFzIEhUTUxTdHlsZUVsZW1lbnQ7XG4gICAgICAgIGlmICghZXZvbHZlRGlhbG9nU3R5bGVOb2RlKSB7XG4gICAgICAgICAgICBjb25zdCBoZWFkTm9kZSA9IGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcbiAgICAgICAgICAgIGlmICghaGVhZE5vZGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGV2b2x2ZURpYWxvZ1N0eWxlTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICAgICAgICBldm9sdmVEaWFsb2dTdHlsZU5vZGUuc2V0QXR0cmlidXRlKCdpZCcsICduZ3gtYXdlc29tZS1wb3B1cC1zdHlsZXMnKTtcbiAgICAgICAgICAgIGV2b2x2ZURpYWxvZ1N0eWxlTm9kZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJykpO1xuICAgICAgICAgICAgaGVhZE5vZGUuYXBwZW5kQ2hpbGQoZXZvbHZlRGlhbG9nU3R5bGVOb2RlKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGV2b2x2ZURpYWxvZ1N0eWxlTm9kZSA/IGV2b2x2ZURpYWxvZ1N0eWxlTm9kZS5zaGVldCA6IG51bGw7XG4gICAgfTtcbiAgICBcbiAgICBwcml2YXRlIHNldFRvYXN0Tm9kZSgpIHtcbiAgICAgICAgY29uc3QgYm9keU5vZGUgPSBkb2N1bWVudC5ib2R5IHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF07XG4gICAgICAgIGlmICghYm9keU5vZGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgY29uc3QgdG9hc3RXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRvYXN0V3JhcHBlci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3RvYXN0LXdyYXBwZXInKTtcbiAgICAgICAgdG9hc3RXcmFwcGVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKSk7XG4gICAgICAgIGJvZHlOb2RlLnByZXBlbmQodG9hc3RXcmFwcGVyKTtcbiAgICAgICAgLy8gYm9keU5vZGUuYXBwZW5kQ2hpbGQodG9hc3RXcmFwcGVyKTtcbiAgICBcbiAgICBcbiAgICAgICAgdGhpcy5nZXRTaGVldCgpLmFkZFJ1bGUoYCN0b2FzdC13cmFwcGVyYCwgYHBvc2l0aW9uOiBmaXhlZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6LWluZGV4OiAxMDAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogMjBweDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByaWdodDogMjBweDtgKTtcbiAgICAgICAgdGhpcy5nZXRTaGVldCgpLmFkZFJ1bGUoYC50b2FzdC1lbnRpdHlgLCBgYWxsIDAuNXMgZWFzZTtgKTtcbiAgICAgICAgdGhpcy5nZXRTaGVldCgpLmFkZFJ1bGUoYC50b2FzdC1lbnRpdHk6Zmlyc3QtY2hpbGRgLCBgYW5pbWF0aW9uOiBtb3ZlIDAuN3MgZWFzZS1vdXQ7YCk7XG4gICAgICAgIHRoaXMuZ2V0U2hlZXQoKS5hZGRSdWxlKGBALXdlYmtpdC1rZXlmcmFtZXMgbW92ZWAsIGBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwJSB7bWFyZ2luLXRvcDogLTVweDsgb3BhY2l0eTogMC40O31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAzMCUge21hcmdpbi10b3A6IC00cHg7IG9wYWNpdHk6IDAuNzt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMTAwJSB7bWFyZ2luLXRvcDogMHB4OyBvcGFjaXR5OiAxO31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgKTtcbiAgICAgICAgdGhpcy5nZXRTaGVldCgpLmFkZFJ1bGUoYEBrZXlmcmFtZXMgbW92ZWAsIGBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwJSB7bWFyZ2luLXRvcDogLTVweDsgb3BhY2l0eTogMC40O31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAzMCUge21hcmdpbi10b3A6IC00cHg7IG9wYWNpdHk6IDAuNzt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMTAwJSB7bWFyZ2luLXRvcDogMHB4OyBvcGFjaXR5OiAxO31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgKTtcbiAgICAgICAgXG4gICAgfVxuICAgIFxuICAgIHByaXZhdGUgc2V0VXNlckNvbG9ycyhfVXNlckNvbG9yVHlwZXM6IEdsb2JhbEludGVyZmFjZS5JQ29sb3JUeXBlcyk6IHZvaWQge1xuICAgICAgICBcbiAgICAgICAgaWYgKHR5cGVvZiBfVXNlckNvbG9yVHlwZXMgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHVzZXJLZXlzICAgICAgICAgICAgID0gT2JqZWN0LmtleXMoX1VzZXJDb2xvclR5cGVzKTtcbiAgICAgICAgY29uc3QgcHJvZHVjdGlvbk9iamVjdEtleXMgPSBPYmplY3Qua2V5cyh0aGlzLnByb2R1Y3Rpb25HbG9iYWxDb25maWcuRGlzcGxheUNvbG9yKTtcbiAgICAgICAgXG4gICAgICAgIHVzZXJLZXlzLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHByb2R1Y3Rpb25PYmplY3RLZXlzLmZpbmQodEtleSA9PiB0S2V5ID09PSBrZXkpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYmFzZUNvbG9yUHJvdmlkZXIgPSBuZXcgR2xvYmFsQ2xhc3MuQ29sb3JQcm92aWRlcihfVXNlckNvbG9yVHlwZXNba2V5XSk7XG4gICAgICAgICAgICAgICAgaWYgKGJhc2VDb2xvclByb3ZpZGVyLkJhc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvZHVjdGlvbkdsb2JhbENvbmZpZy5EaXNwbGF5Q29sb3Jba2V5XSA9IGJhc2VDb2xvclByb3ZpZGVyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgIH1cbiAgICBcbn1cbiJdfQ==