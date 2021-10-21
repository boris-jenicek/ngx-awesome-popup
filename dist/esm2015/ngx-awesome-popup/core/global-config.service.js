import { Inject, Injectable } from '@angular/core';
import { ColorVariance } from './enums';
import { ColorProvider, GlobalConfig, GlobalUserConfig } from './global-classes';
import * as i0 from "@angular/core";
export class GlobalConfigService {
    constructor(userGlobalConfig) {
        this.userGlobalConfig = userGlobalConfig;
        this.productionGlobalConfig = new GlobalConfig();
        this.authorGlobalConfig = new GlobalConfig();
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
                    const baseColorProvider = new ColorProvider(_UserColorTypes[key]);
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
        background:  ${_ColorProvider.IsBaseBright
            ? _ColorProvider.DarkenForShade
            : _ColorProvider.BrightenForShade}!important;
        border-color: ${_ColorProvider.IsBaseBright
            ? _ColorProvider.Darken
            : _ColorProvider.Brighten}!important;
        `;
        const focusActiveButtonClass = `.ed-btn-${_Key.toLowerCase()}:focus, .ed-btn-${_Key.toLowerCase()}:active`;
        const focusActiveStyle = `
        box-shadow: 0 0 1px 2px ${_ColorProvider.IsBaseBright
            ? _ColorProvider.Darken
            : _ColorProvider.Brighten}!important;
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
        const isIEOrEdge = /msie\s|trident\//i.test(window.navigator.userAgent);
        if (!isIEOrEdge) {
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
}
GlobalConfigService.ɵprov = i0.ɵɵdefineInjectable({ factory: function GlobalConfigService_Factory() { return new GlobalConfigService(i0.ɵɵinject("cdGlobalConfig")); }, token: GlobalConfigService, providedIn: "root" });
GlobalConfigService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
GlobalConfigService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['cdGlobalConfig',] }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLWNvbmZpZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbmd4LWF3ZXNvbWUtcG9wdXAvY29yZS9nbG9iYWwtY29uZmlnLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUN4QyxPQUFPLEVBQ0wsYUFBYSxFQUNiLFlBQVksRUFDWixnQkFBZ0IsRUFDakIsTUFBTSxrQkFBa0IsQ0FBQzs7QUFZMUIsTUFBTSxPQUFPLG1CQUFtQjtJQUs5QixZQUVVLGdCQUFtQztRQUFuQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQW1CO1FBTjdDLDJCQUFzQixHQUFrQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ25ELHVCQUFrQixHQUFrQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBTzdELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFFbEUseUVBQXlFO1FBQ3pFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxDQUFDLGdDQUFnQztRQUNyRixJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsQ0FBQyxnQ0FBZ0M7UUFDdkYsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLENBQUMsZ0NBQWdDO1FBQ3JGLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLGdDQUFnQztRQUNsRixJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQyxnQ0FBZ0M7UUFDckYs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QUFvQixHQUFHLCtCQUErQixJQUFJLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQztRQUN4RixNQUFNLFNBQVMsR0FBRzt3QkFDRSxjQUFjLENBQUMsUUFBUTtTQUN0QyxDQUFDO1FBRU4sSUFBSSxDQUFDLFFBQVEsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDLE9BQU8sQ0FDcEQsb0JBQW9CLEVBQ3BCLFNBQVMsQ0FDVixDQUFDO0lBQ0osQ0FBQztJQUVPLGNBQWM7UUFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLE9BQU8sQ0FDL0MsZUFBZSxFQUNmLGdCQUFnQixDQUNqQixDQUFDO1FBQ0YsSUFBSSxDQUFDLFFBQVEsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLE9BQU8sQ0FDL0MsMkJBQTJCLEVBQzNCLGdDQUFnQyxDQUNqQyxDQUFDO1FBRUYsTUFBTSxVQUFVLEdBQUcsbUJBQW1CLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDeEUsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNmLElBQUksQ0FBQyxRQUFRLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxPQUFPLENBQy9DLHlCQUF5QixFQUN6Qjs7Ozt5Q0FJaUMsQ0FDbEMsQ0FBQztZQUNGLElBQUksQ0FBQyxRQUFRLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxPQUFPLENBQy9DLGlCQUFpQixFQUNqQjs7Ozt5Q0FJaUMsQ0FDbEMsQ0FBQztTQUNIO0lBQ0gsQ0FBQzs7OztZQWpQRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs0Q0FPSSxNQUFNLFNBQUMsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb2xvclZhcmlhbmNlIH0gZnJvbSAnLi9lbnVtcyc7XG5pbXBvcnQge1xuICBDb2xvclByb3ZpZGVyLFxuICBHbG9iYWxDb25maWcsXG4gIEdsb2JhbFVzZXJDb25maWdcbn0gZnJvbSAnLi9nbG9iYWwtY2xhc3Nlcyc7XG5pbXBvcnQge1xuICBJQ29sb3JPYmplY3QsXG4gIElDb2xvclByb3ZpZGVyLFxuICBJQ29sb3JUeXBlcyxcbiAgSUdsb2JhbENvbmZpZyxcbiAgSUdsb2JhbFVzZXJDb25maWdcbn0gZnJvbSAnLi9nbG9iYWwtaW50ZXJmYWNlcyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEdsb2JhbENvbmZpZ1NlcnZpY2Uge1xuICBwcm9kdWN0aW9uR2xvYmFsQ29uZmlnOiBJR2xvYmFsQ29uZmlnID0gbmV3IEdsb2JhbENvbmZpZygpO1xuICBwcml2YXRlIGF1dGhvckdsb2JhbENvbmZpZzogSUdsb2JhbENvbmZpZyA9IG5ldyBHbG9iYWxDb25maWcoKTtcbiAgcHJpdmF0ZSB1c2VyR2VuZXJhdGVkQ29uZmlnOiBJR2xvYmFsVXNlckNvbmZpZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KCdjZEdsb2JhbENvbmZpZycpXG4gICAgcHJpdmF0ZSB1c2VyR2xvYmFsQ29uZmlnOiBJR2xvYmFsVXNlckNvbmZpZ1xuICApIHtcbiAgICB0aGlzLnVzZXJHZW5lcmF0ZWRDb25maWcgPSBuZXcgR2xvYmFsVXNlckNvbmZpZyh1c2VyR2xvYmFsQ29uZmlnKTtcblxuICAgIC8vIHJlZ2lvbiAqKiogYXV0aG9yIGdsb2JhbCBjb25maWcgdmFsdWVzIChpZiB0aGVyZSBpcyBubyB1c2VyIGlucHV0KSAqKipcbiAgICB0aGlzLmF1dGhvckdsb2JhbENvbmZpZy5EaXNwbGF5Q29sb3IuUHJpbWFyeSA9IG51bGw7IC8vIG5ldyBDb2xvclByb3ZpZGVyKCcjZmY5ZTAwJyk7XG4gICAgdGhpcy5hdXRob3JHbG9iYWxDb25maWcuRGlzcGxheUNvbG9yLlNlY29uZGFyeSA9IG51bGw7IC8vIG5ldyBDb2xvclByb3ZpZGVyKCcjOTg5ZWE1Jyk7XG4gICAgdGhpcy5hdXRob3JHbG9iYWxDb25maWcuRGlzcGxheUNvbG9yLlN1Y2Nlc3MgPSBudWxsOyAvLyBuZXcgQ29sb3JQcm92aWRlcignIzNjYWVhMycpO1xuICAgIHRoaXMuYXV0aG9yR2xvYmFsQ29uZmlnLkRpc3BsYXlDb2xvci5JbmZvID0gbnVsbDsgLy8gbmV3IENvbG9yUHJvdmlkZXIoJyMyZjhlZTUnKTtcbiAgICB0aGlzLmF1dGhvckdsb2JhbENvbmZpZy5EaXNwbGF5Q29sb3IuV2FybmluZyA9IG51bGw7IC8vIG5ldyBDb2xvclByb3ZpZGVyKCcjZmZjMTA3Jyk7XG4gICAgdGhpcy5hdXRob3JHbG9iYWxDb25maWcuRGlzcGxheUNvbG9yLkRhbmdlciA9IG51bGw7IC8vIG5ldyBDb2xvclByb3ZpZGVyKCcjZTQ2NDY0Jyk7XG4gICAgdGhpcy5hdXRob3JHbG9iYWxDb25maWcuRGlzcGxheUNvbG9yLkxpZ2h0ID0gbnVsbDsgLy8gbmV3IENvbG9yUHJvdmlkZXIoJyNmOGY5ZmEnKTtcbiAgICB0aGlzLmF1dGhvckdsb2JhbENvbmZpZy5EaXNwbGF5Q29sb3IuRGFyayA9IG51bGw7IC8vIG5ldyBDb2xvclByb3ZpZGVyKCcjMzQzYTQwJyk7XG4gICAgLy8gZW5kcmVnaW9uXG5cbiAgICB0aGlzLnByb2R1Y3Rpb25HbG9iYWxDb25maWcuRGlzcGxheUNvbG9yID0gdGhpcy5hdXRob3JHbG9iYWxDb25maWcuRGlzcGxheUNvbG9yO1xuXG4gICAgLy8gcmVnaW9uICoqKiBnbG9iYWwgdXNlckNvbmZpZyAodXNlciBpbnB1dCBhcHAtbW9kdWxlKSAqKipcbiAgICB0aGlzLnNldFVzZXJDb2xvcnModGhpcy51c2VyR2VuZXJhdGVkQ29uZmlnLkNvbG9yTGlzdCk7XG5cbiAgICAvLyBlbmRyZWdpb25cblxuICAgIHRoaXMuc2V0Tm9kZVN0eWxlcyh0aGlzLnByb2R1Y3Rpb25HbG9iYWxDb25maWcuRGlzcGxheUNvbG9yKTtcbiAgfVxuXG4gIHJlc2V0U3R5bGVzKCk6IHZvaWQge1xuICAgIHRoaXMuc2V0VXNlckNvbG9ycyh0aGlzLnVzZXJHZW5lcmF0ZWRDb25maWcuQ29sb3JMaXN0KTtcbiAgICB0aGlzLnNldE5vZGVTdHlsZXModGhpcy5wcm9kdWN0aW9uR2xvYmFsQ29uZmlnLkRpc3BsYXlDb2xvciwgdHJ1ZSk7XG4gIH1cblxuICBzZXROb2RlU3R5bGVzKF9Qcm9kdWN0aW9uQ29sb3JUeXBlczogSUNvbG9yT2JqZWN0LCBfUmVzZXQ6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIGlmIChfUmVzZXQpIHtcbiAgICAgIGxldCBldm9sdmVEaWFsb2dTdHlsZU5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAgICAgJ25neC1hd2Vzb21lLXBvcHVwLWdsb2Itc3R5bGVzJ1xuICAgICAgKSBhcyBIVE1MU3R5bGVFbGVtZW50O1xuICAgICAgaWYgKGV2b2x2ZURpYWxvZ1N0eWxlTm9kZSkge1xuICAgICAgICBldm9sdmVEaWFsb2dTdHlsZU5vZGUucmVtb3ZlKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuc2V0VG9hc3RTdHlsZXMoKTtcblxuICAgIE9iamVjdC5rZXlzKF9Qcm9kdWN0aW9uQ29sb3JUeXBlcykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgaWYgKF9Qcm9kdWN0aW9uQ29sb3JUeXBlc1trZXldKSB7XG4gICAgICAgIHRoaXMuc2V0QnV0dG9uU3R5bGluZyhrZXksIF9Qcm9kdWN0aW9uQ29sb3JUeXBlc1trZXldKTtcbiAgICAgICAgdGhpcy5zZXRJY29uU3R5bGluZyhrZXksIF9Qcm9kdWN0aW9uQ29sb3JUeXBlc1trZXldKTtcbiAgICAgICAgdGhpcy5zZXRUb2FzdFN0eWxpbmcoa2V5LCBfUHJvZHVjdGlvbkNvbG9yVHlwZXNba2V5XSk7XG4gICAgICAgIHRoaXMuc2V0RGlhbG9nRnJhbWUoa2V5LCBfUHJvZHVjdGlvbkNvbG9yVHlwZXNba2V5XSk7XG5cbiAgICAgICAgaWYgKENvbG9yVmFyaWFuY2Vba2V5LnRvVXBwZXJDYXNlKCldID09PSBDb2xvclZhcmlhbmNlLlBSSU1BUlkpIHtcbiAgICAgICAgICB0aGlzLmdldFNoZWV0KCduZ3gtYXdlc29tZS1wb3B1cC1zdHlsZXMnKS5hZGRSdWxlKFxuICAgICAgICAgICAgJy5uZ3gtYXdlc29tZS1wb3B1cC1vdmVybGF5JyxcbiAgICAgICAgICAgIGBiYWNrZ3JvdW5kOiAgJHtfUHJvZHVjdGlvbkNvbG9yVHlwZXNba2V5XS5UcmFuc3BhcmVudERhcmtlblZhcmlhbmNlfSFpbXBvcnRhbnQ7YFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRVc2VyQ29sb3JzKF9Vc2VyQ29sb3JUeXBlczogSUNvbG9yVHlwZXMpOiB2b2lkIHtcbiAgICBpZiAodHlwZW9mIF9Vc2VyQ29sb3JUeXBlcyAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB1c2VyS2V5cyA9IE9iamVjdC5rZXlzKF9Vc2VyQ29sb3JUeXBlcyk7XG4gICAgY29uc3QgcHJvZHVjdGlvbk9iamVjdEtleXMgPSBPYmplY3Qua2V5cyhcbiAgICAgIHRoaXMucHJvZHVjdGlvbkdsb2JhbENvbmZpZy5EaXNwbGF5Q29sb3JcbiAgICApO1xuXG4gICAgdXNlcktleXMuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgaWYgKHByb2R1Y3Rpb25PYmplY3RLZXlzLmZpbmQodEtleSA9PiB0S2V5ID09PSBrZXkpKSB7XG4gICAgICAgIGlmIChfVXNlckNvbG9yVHlwZXNba2V5XSkge1xuICAgICAgICAgIGNvbnN0IGJhc2VDb2xvclByb3ZpZGVyID0gbmV3IENvbG9yUHJvdmlkZXIoX1VzZXJDb2xvclR5cGVzW2tleV0pO1xuICAgICAgICAgIGlmIChiYXNlQ29sb3JQcm92aWRlci5CYXNlKSB7XG4gICAgICAgICAgICB0aGlzLnByb2R1Y3Rpb25HbG9iYWxDb25maWcuRGlzcGxheUNvbG9yW2tleV0gPSBiYXNlQ29sb3JQcm92aWRlcjtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5wcm9kdWN0aW9uR2xvYmFsQ29uZmlnLkRpc3BsYXlDb2xvcltrZXldID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGdldFNoZWV0KF9TdHlsZUlEOiBzdHJpbmcpIHtcbiAgICAvLyBDcmVhdGUgdGhlIDxzdHlsZT4gdGFnXG4gICAgbGV0IGV2b2x2ZURpYWxvZ1N0eWxlTm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgICAgX1N0eWxlSURcbiAgICApIGFzIEhUTUxTdHlsZUVsZW1lbnQ7XG4gICAgaWYgKCFldm9sdmVEaWFsb2dTdHlsZU5vZGUpIHtcbiAgICAgIGNvbnN0IGhlYWROb2RlID1cbiAgICAgICAgZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xuICAgICAgaWYgKCFoZWFkTm9kZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGV2b2x2ZURpYWxvZ1N0eWxlTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICBldm9sdmVEaWFsb2dTdHlsZU5vZGUuc2V0QXR0cmlidXRlKCdpZCcsIF9TdHlsZUlEKTtcbiAgICAgIGV2b2x2ZURpYWxvZ1N0eWxlTm9kZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJykpO1xuICAgICAgaGVhZE5vZGUuYXBwZW5kQ2hpbGQoZXZvbHZlRGlhbG9nU3R5bGVOb2RlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZXZvbHZlRGlhbG9nU3R5bGVOb2RlID8gZXZvbHZlRGlhbG9nU3R5bGVOb2RlLnNoZWV0IDogbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgc2V0VG9hc3RTdHlsaW5nKF9LZXk6IHN0cmluZywgX0NvbG9yUHJvdmlkZXI6IElDb2xvclByb3ZpZGVyKSB7XG4gICAgY29uc3Qgc3RhbmRhcmRUb2FzdCA9IGAudG9hc3Qtd3JhcHBlci5zdGFuZGFyZC10b2FzdCAuZXZvbHZlLXRvYXN0LiR7X0tleS50b0xvd2VyQ2FzZSgpfS1kaWFsb2dgO1xuICAgIGNvbnN0IHN0YW5kYXJkVG9hc3RTdHlsZSA9IGBcbiAgICAgICAgYmFja2dyb3VuZDogICR7X0NvbG9yUHJvdmlkZXIuQnJpZ2h0U2hhZGV9IWltcG9ydGFudDtcbiAgICAgICAgYm9yZGVyLWNvbG9yOiAke19Db2xvclByb3ZpZGVyLkJyaWdodGVufSFpbXBvcnRhbnQ7XG4gICAgICAgIGA7XG5cbiAgICBjb25zdCBzaW1wbGVUb2FzdCA9IGAudG9hc3Qtd3JhcHBlci5zaW1wbGUtdG9hc3QgLmV2b2x2ZS10b2FzdC4ke19LZXkudG9Mb3dlckNhc2UoKX0tZGlhbG9nYDtcbiAgICBjb25zdCBzaW1wbGVUb2FzdFN0eWxlID0gYFxuICAgICAgICBiYWNrZ3JvdW5kOiAgJHtfQ29sb3JQcm92aWRlci5CcmlnaHRXYXJtbHl9IWltcG9ydGFudDtcbiAgICAgICAgY29sb3I6ICAke19Db2xvclByb3ZpZGVyLkRhcmtlbn0haW1wb3J0YW50O1xuICAgICAgICBgO1xuXG4gICAgY29uc3QgYmFzZVByb2dyZXNzID0gYC50b2FzdC13cmFwcGVyIC5ldm9sdmUtdG9hc3QuJHtfS2V5LnRvTG93ZXJDYXNlKCl9LWRpYWxvZyAucHJvZ3Jlc3MtYmFyYDtcbiAgICBjb25zdCBiYXNlUHJvZ3Jlc3NTdHlsZSA9IGBcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogICR7X0NvbG9yUHJvdmlkZXIuQnJpZ2h0ZW59IWltcG9ydGFudDtcbiAgICAgICAgYDtcblxuICAgIHRoaXMuZ2V0U2hlZXQoJ25neC1hd2Vzb21lLXBvcHVwLWdsb2Itc3R5bGVzJykuYWRkUnVsZShcbiAgICAgIGJhc2VQcm9ncmVzcyxcbiAgICAgIGJhc2VQcm9ncmVzc1N0eWxlXG4gICAgKTtcbiAgICB0aGlzLmdldFNoZWV0KCduZ3gtYXdlc29tZS1wb3B1cC1nbG9iLXN0eWxlcycpLmFkZFJ1bGUoXG4gICAgICBzdGFuZGFyZFRvYXN0LFxuICAgICAgc3RhbmRhcmRUb2FzdFN0eWxlXG4gICAgKTtcbiAgICB0aGlzLmdldFNoZWV0KCduZ3gtYXdlc29tZS1wb3B1cC1nbG9iLXN0eWxlcycpLmFkZFJ1bGUoXG4gICAgICBzaW1wbGVUb2FzdCxcbiAgICAgIHNpbXBsZVRvYXN0U3R5bGVcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRCdXR0b25TdHlsaW5nKF9LZXk6IHN0cmluZywgX0NvbG9yUHJvdmlkZXI6IElDb2xvclByb3ZpZGVyKSB7XG4gICAgY29uc3QgYmFzZUJ1dHRvbkNsYXNzID0gYC5lZC1idG4tJHtfS2V5LnRvTG93ZXJDYXNlKCl9YDtcbiAgICBjb25zdCBiYXNlU3R5bGUgPSBgXG4gICAgICAgIGNvbG9yOiAke19Db2xvclByb3ZpZGVyLkNvbnRyYXN0Q29sb3J9IWltcG9ydGFudDtcbiAgICAgICAgYmFja2dyb3VuZDogICR7X0NvbG9yUHJvdmlkZXIuQmFzZX0haW1wb3J0YW50O1xuICAgICAgICBib3JkZXItY29sb3I6ICR7X0NvbG9yUHJvdmlkZXIuQnJpZ2h0ZW5Gb3JTaGFkZX0haW1wb3J0YW50O1xuICAgICAgICBgO1xuXG4gICAgY29uc3QgaG92ZXJCdXR0b25DbGFzcyA9IGAuZWQtYnRuLSR7X0tleS50b0xvd2VyQ2FzZSgpfTpob3ZlcmA7XG4gICAgY29uc3QgaG92ZXJTdHlsZSA9IGBcbiAgICAgICAgYmFja2dyb3VuZDogICR7XG4gICAgICAgICAgX0NvbG9yUHJvdmlkZXIuSXNCYXNlQnJpZ2h0XG4gICAgICAgICAgICA/IF9Db2xvclByb3ZpZGVyLkRhcmtlbkZvclNoYWRlXG4gICAgICAgICAgICA6IF9Db2xvclByb3ZpZGVyLkJyaWdodGVuRm9yU2hhZGVcbiAgICAgICAgfSFpbXBvcnRhbnQ7XG4gICAgICAgIGJvcmRlci1jb2xvcjogJHtcbiAgICAgICAgICBfQ29sb3JQcm92aWRlci5Jc0Jhc2VCcmlnaHRcbiAgICAgICAgICAgID8gX0NvbG9yUHJvdmlkZXIuRGFya2VuXG4gICAgICAgICAgICA6IF9Db2xvclByb3ZpZGVyLkJyaWdodGVuXG4gICAgICAgIH0haW1wb3J0YW50O1xuICAgICAgICBgO1xuXG4gICAgY29uc3QgZm9jdXNBY3RpdmVCdXR0b25DbGFzcyA9IGAuZWQtYnRuLSR7X0tleS50b0xvd2VyQ2FzZSgpfTpmb2N1cywgLmVkLWJ0bi0ke19LZXkudG9Mb3dlckNhc2UoKX06YWN0aXZlYDtcbiAgICBjb25zdCBmb2N1c0FjdGl2ZVN0eWxlID0gYFxuICAgICAgICBib3gtc2hhZG93OiAwIDAgMXB4IDJweCAke1xuICAgICAgICAgIF9Db2xvclByb3ZpZGVyLklzQmFzZUJyaWdodFxuICAgICAgICAgICAgPyBfQ29sb3JQcm92aWRlci5EYXJrZW5cbiAgICAgICAgICAgIDogX0NvbG9yUHJvdmlkZXIuQnJpZ2h0ZW5cbiAgICAgICAgfSFpbXBvcnRhbnQ7XG4gICAgICAgIGA7XG5cbiAgICB0aGlzLmdldFNoZWV0KCduZ3gtYXdlc29tZS1wb3B1cC1nbG9iLXN0eWxlcycpLmFkZFJ1bGUoXG4gICAgICBiYXNlQnV0dG9uQ2xhc3MsXG4gICAgICBiYXNlU3R5bGVcbiAgICApO1xuICAgIHRoaXMuZ2V0U2hlZXQoJ25neC1hd2Vzb21lLXBvcHVwLWdsb2Itc3R5bGVzJykuYWRkUnVsZShcbiAgICAgIGhvdmVyQnV0dG9uQ2xhc3MsXG4gICAgICBob3ZlclN0eWxlXG4gICAgKTtcbiAgICB0aGlzLmdldFNoZWV0KCduZ3gtYXdlc29tZS1wb3B1cC1nbG9iLXN0eWxlcycpLmFkZFJ1bGUoXG4gICAgICBmb2N1c0FjdGl2ZUJ1dHRvbkNsYXNzLFxuICAgICAgZm9jdXNBY3RpdmVTdHlsZVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIHNldEljb25TdHlsaW5nKF9LZXk6IHN0cmluZywgX0NvbG9yUHJvdmlkZXI6IElDb2xvclByb3ZpZGVyKSB7XG4gICAgY29uc3QgYmFzZUljb25DbGFzcyA9IGAuYXAtaWNvbi0ke19LZXkudG9Mb3dlckNhc2UoKX1gO1xuICAgIGNvbnN0IGJhc2VTdHlsZSA9IGBjb2xvcjogJHtfQ29sb3JQcm92aWRlci5CcmlnaHRlbkZvclNoYWRlfSFpbXBvcnRhbnQ7YDtcblxuICAgIHRoaXMuZ2V0U2hlZXQoJ25neC1hd2Vzb21lLXBvcHVwLWdsb2Itc3R5bGVzJykuYWRkUnVsZShcbiAgICAgIGJhc2VJY29uQ2xhc3MsXG4gICAgICBiYXNlU3R5bGVcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXREaWFsb2dGcmFtZShfS2V5OiBzdHJpbmcsIF9Db2xvclByb3ZpZGVyOiBJQ29sb3JQcm92aWRlcikge1xuICAgIGNvbnN0IGJhc2VEaWFsb2dGcmFtZUNsYXNzID0gYC5uZ3gtYXdlc29tZS1wb3B1cC1vdmVybGF5IC4ke19LZXkudG9Mb3dlckNhc2UoKX0tZGlhbG9nYDtcbiAgICBjb25zdCBiYXNlU3R5bGUgPSBgXG4gICAgICAgIGJvcmRlci1jb2xvcjogJHtfQ29sb3JQcm92aWRlci5CcmlnaHRlbn0haW1wb3J0YW50O1xuICAgICAgICBgO1xuXG4gICAgdGhpcy5nZXRTaGVldCgnbmd4LWF3ZXNvbWUtcG9wdXAtZ2xvYi1zdHlsZXMnKS5hZGRSdWxlKFxuICAgICAgYmFzZURpYWxvZ0ZyYW1lQ2xhc3MsXG4gICAgICBiYXNlU3R5bGVcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRUb2FzdFN0eWxlcygpIHtcbiAgICB0aGlzLmdldFNoZWV0KCduZ3gtYXdlc29tZS1wb3B1cC1zdHlsZXMnKS5hZGRSdWxlKFxuICAgICAgYC50b2FzdC1lbnRpdHlgLFxuICAgICAgYGFsbCAwLjVzIGVhc2U7YFxuICAgICk7XG4gICAgdGhpcy5nZXRTaGVldCgnbmd4LWF3ZXNvbWUtcG9wdXAtc3R5bGVzJykuYWRkUnVsZShcbiAgICAgIGAudG9hc3QtZW50aXR5OmZpcnN0LWNoaWxkYCxcbiAgICAgIGBhbmltYXRpb246IG1vdmUgMC43cyBlYXNlLW91dDtgXG4gICAgKTtcblxuICAgIGNvbnN0IGlzSUVPckVkZ2UgPSAvbXNpZVxcc3x0cmlkZW50XFwvL2kudGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgaWYgKCFpc0lFT3JFZGdlKSB7XG4gICAgICB0aGlzLmdldFNoZWV0KCduZ3gtYXdlc29tZS1wb3B1cC1zdHlsZXMnKS5hZGRSdWxlKFxuICAgICAgICBgQC13ZWJraXQta2V5ZnJhbWVzIG1vdmVgLFxuICAgICAgICBgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMCUge21hcmdpbi10b3A6IC01cHg7IG9wYWNpdHk6IDAuNDt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMzAlIHttYXJnaW4tdG9wOiAtNHB4OyBvcGFjaXR5OiAwLjc7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDEwMCUge21hcmdpbi10b3A6IDBweDsgb3BhY2l0eTogMTt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYFxuICAgICAgKTtcbiAgICAgIHRoaXMuZ2V0U2hlZXQoJ25neC1hd2Vzb21lLXBvcHVwLXN0eWxlcycpLmFkZFJ1bGUoXG4gICAgICAgIGBAa2V5ZnJhbWVzIG1vdmVgLFxuICAgICAgICBgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMCUge21hcmdpbi10b3A6IC01cHg7IG9wYWNpdHk6IDAuNDt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMzAlIHttYXJnaW4tdG9wOiAtNHB4OyBvcGFjaXR5OiAwLjc7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDEwMCUge21hcmdpbi10b3A6IDBweDsgb3BhY2l0eTogMTt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYFxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==