import { Inject, Injectable } from '@angular/core';
import { ServiceLocator } from '../locator.service';
import { ColorVariance } from './enums';
import { ColorProvider, GlobalConfig, GlobalUserConfig } from './global-classes';
import * as i0 from "@angular/core";
export class ResetGlobalConfig {
    constructor(globalConfig) {
        const globalConfigService = ServiceLocator.injector.get(GlobalConfigService);
        if (globalConfig) {
            globalConfigService.setUserColors(globalConfig.colorList);
            globalConfigService.setNodeStyles(globalConfigService.productionGlobalConfig.displayColor, true);
        }
        else {
            globalConfigService.resetStyles();
        }
    }
}
export class GlobalConfigService {
    constructor(userGlobalConfig) {
        this.userGlobalConfig = userGlobalConfig;
        this.authorGlobalConfig = new GlobalConfig();
        this.productionGlobalConfig = new GlobalConfig();
        this.userGeneratedConfig = new GlobalUserConfig(userGlobalConfig);
        this.authorGlobalConfig.displayColor.primary = null;
        this.authorGlobalConfig.displayColor.secondary = null;
        this.authorGlobalConfig.displayColor.success = null;
        this.authorGlobalConfig.displayColor.info = null;
        this.authorGlobalConfig.displayColor.warning = null;
        this.authorGlobalConfig.displayColor.danger = null;
        this.authorGlobalConfig.displayColor.light = null;
        this.authorGlobalConfig.displayColor.dark = null;
        this.authorGlobalConfig.displayColor.customOne = null;
        this.authorGlobalConfig.displayColor.customTwo = null;
        this.authorGlobalConfig.displayColor.customThree = null;
        this.authorGlobalConfig.displayColor.customFour = null;
        this.authorGlobalConfig.displayColor.customFive = null;
        this.productionGlobalConfig.displayColor = this.authorGlobalConfig.displayColor;
        this.setUserColors(this.userGeneratedConfig.colorList);
        this.setNodeStyles(this.productionGlobalConfig.displayColor);
    }
    resetStyles() {
        this.setUserColors(this.userGeneratedConfig.colorList);
        this.setNodeStyles(this.productionGlobalConfig.displayColor, true);
    }
    setNodeStyles(_ProductionColorTypes, _Reset = false) {
        if (_Reset) {
            const evolveDialogStyleNode = document.getElementById('ngx-awesome-popup-glob-styles');
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
        const productionObjectKeys = Object.keys(this.productionGlobalConfig.displayColor);
        userKeys.forEach(key => {
            if (productionObjectKeys.find(tKey => tKey === key)) {
                if (_UserColorTypes[key]) {
                    const baseColorProvider = new ColorProvider(_UserColorTypes[key]);
                    if (baseColorProvider.Base) {
                        this.productionGlobalConfig.displayColor[key] = baseColorProvider;
                    }
                }
                else {
                    this.productionGlobalConfig.displayColor[key] = null;
                }
            }
        });
    }
    getSheet(_StyleID) {
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
GlobalConfigService.ɵfac = function GlobalConfigService_Factory(t) { return new (t || GlobalConfigService)(i0.ɵɵinject('cdGlobalConfig')); };
GlobalConfigService.ɵprov = i0.ɵɵdefineInjectable({ token: GlobalConfigService, factory: GlobalConfigService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(GlobalConfigService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: ['cdGlobalConfig']
            }] }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLWNvbmZpZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbmd4LWF3ZXNvbWUtcG9wdXAvY29yZS9nbG9iYWwtY29uZmlnLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDeEMsT0FBTyxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7QUFHakYsTUFBTSxPQUFPLGlCQUFpQjtJQUM1QixZQUFZLFlBQWdDO1FBQzFDLE1BQU0sbUJBQW1CLEdBQXdCLGNBQWMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDbEcsSUFBSSxZQUFZLEVBQUU7WUFDaEIsbUJBQW1CLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMxRCxtQkFBbUIsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsc0JBQXNCLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ2xHO2FBQU07WUFDTCxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNuQztJQUNILENBQUM7Q0FDRjtBQUtELE1BQU0sT0FBTyxtQkFBbUI7SUFLOUIsWUFFVSxnQkFBbUM7UUFBbkMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFtQjtRQU5yQyx1QkFBa0IsR0FBa0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUUvRCwyQkFBc0IsR0FBa0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQU16RCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FB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QUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLE9BQU8sQ0FDL0MseUJBQXlCLEVBQ3pCOzs7O3lDQUlpQyxDQUNsQyxDQUFDO1lBQ0YsSUFBSSxDQUFDLFFBQVEsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLE9BQU8sQ0FDL0MsaUJBQWlCLEVBQ2pCOzs7O3lDQUlpQyxDQUNsQyxDQUFDO1NBQ0g7SUFDSCxDQUFDOztzRkFsTVUsbUJBQW1CLGNBTXBCLGdCQUFnQjsyREFOZixtQkFBbUIsV0FBbkIsbUJBQW1CLG1CQUZsQixNQUFNO3VGQUVQLG1CQUFtQjtjQUgvQixVQUFVO2VBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7O3NCQU9JLE1BQU07dUJBQUMsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTZXJ2aWNlTG9jYXRvciB9IGZyb20gJy4uL2xvY2F0b3Iuc2VydmljZSc7XG5pbXBvcnQgeyBDb2xvclZhcmlhbmNlIH0gZnJvbSAnLi9lbnVtcyc7XG5pbXBvcnQgeyBDb2xvclByb3ZpZGVyLCBHbG9iYWxDb25maWcsIEdsb2JhbFVzZXJDb25maWcgfSBmcm9tICcuL2dsb2JhbC1jbGFzc2VzJztcbmltcG9ydCB7IElDb2xvck9iamVjdCwgSUNvbG9yUHJvdmlkZXIsIElDb2xvclR5cGVzLCBJR2xvYmFsQ29uZmlnLCBJR2xvYmFsVXNlckNvbmZpZyB9IGZyb20gJy4vZ2xvYmFsLWludGVyZmFjZXMnO1xuXG5leHBvcnQgY2xhc3MgUmVzZXRHbG9iYWxDb25maWcge1xuICBjb25zdHJ1Y3RvcihnbG9iYWxDb25maWc/OiBJR2xvYmFsVXNlckNvbmZpZykge1xuICAgIGNvbnN0IGdsb2JhbENvbmZpZ1NlcnZpY2U6IEdsb2JhbENvbmZpZ1NlcnZpY2UgPSBTZXJ2aWNlTG9jYXRvci5pbmplY3Rvci5nZXQoR2xvYmFsQ29uZmlnU2VydmljZSk7XG4gICAgaWYgKGdsb2JhbENvbmZpZykge1xuICAgICAgZ2xvYmFsQ29uZmlnU2VydmljZS5zZXRVc2VyQ29sb3JzKGdsb2JhbENvbmZpZy5jb2xvckxpc3QpO1xuICAgICAgZ2xvYmFsQ29uZmlnU2VydmljZS5zZXROb2RlU3R5bGVzKGdsb2JhbENvbmZpZ1NlcnZpY2UucHJvZHVjdGlvbkdsb2JhbENvbmZpZy5kaXNwbGF5Q29sb3IsIHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBnbG9iYWxDb25maWdTZXJ2aWNlLnJlc2V0U3R5bGVzKCk7XG4gICAgfVxuICB9XG59XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEdsb2JhbENvbmZpZ1NlcnZpY2Uge1xuICBwcml2YXRlIGF1dGhvckdsb2JhbENvbmZpZzogSUdsb2JhbENvbmZpZyA9IG5ldyBHbG9iYWxDb25maWcoKTtcbiAgcHJpdmF0ZSB1c2VyR2VuZXJhdGVkQ29uZmlnOiBJR2xvYmFsVXNlckNvbmZpZztcbiAgcHJvZHVjdGlvbkdsb2JhbENvbmZpZzogSUdsb2JhbENvbmZpZyA9IG5ldyBHbG9iYWxDb25maWcoKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KCdjZEdsb2JhbENvbmZpZycpXG4gICAgcHJpdmF0ZSB1c2VyR2xvYmFsQ29uZmlnOiBJR2xvYmFsVXNlckNvbmZpZ1xuICApIHtcbiAgICB0aGlzLnVzZXJHZW5lcmF0ZWRDb25maWcgPSBuZXcgR2xvYmFsVXNlckNvbmZpZyh1c2VyR2xvYmFsQ29uZmlnKTtcblxuICAgIC8vIHJlZ2lvbiAqKiogYXV0aG9yIGdsb2JhbCBjb25maWcgdmFsdWVzIChpZiB0aGVyZSBpcyBubyB1c2VyIGlucHV0KSAqKipcbiAgICB0aGlzLmF1dGhvckdsb2JhbENvbmZpZy5kaXNwbGF5Q29sb3IucHJpbWFyeSA9IG51bGw7IC8vIG5ldyBDb2xvclByb3ZpZGVyKCcjZmY5ZTAwJyk7XG4gICAgdGhpcy5hdXRob3JHbG9iYWxDb25maWcuZGlzcGxheUNvbG9yLnNlY29uZGFyeSA9IG51bGw7IC8vIG5ldyBDb2xvclByb3ZpZGVyKCcjOTg5ZWE1Jyk7XG4gICAgdGhpcy5hdXRob3JHbG9iYWxDb25maWcuZGlzcGxheUNvbG9yLnN1Y2Nlc3MgPSBudWxsOyAvLyBuZXcgQ29sb3JQcm92aWRlcignIzNjYWVhMycpO1xuICAgIHRoaXMuYXV0aG9yR2xvYmFsQ29uZmlnLmRpc3BsYXlDb2xvci5pbmZvID0gbnVsbDsgLy8gbmV3IENvbG9yUHJvdmlkZXIoJyMyZjhlZTUnKTtcbiAgICB0aGlzLmF1dGhvckdsb2JhbENvbmZpZy5kaXNwbGF5Q29sb3Iud2FybmluZyA9IG51bGw7IC8vIG5ldyBDb2xvclByb3ZpZGVyKCcjZmZjMTA3Jyk7XG4gICAgdGhpcy5hdXRob3JHbG9iYWxDb25maWcuZGlzcGxheUNvbG9yLmRhbmdlciA9IG51bGw7IC8vIG5ldyBDb2xvclByb3ZpZGVyKCcjZTQ2NDY0Jyk7XG4gICAgdGhpcy5hdXRob3JHbG9iYWxDb25maWcuZGlzcGxheUNvbG9yLmxpZ2h0ID0gbnVsbDsgLy8gbmV3IENvbG9yUHJvdmlkZXIoJyNmOGY5ZmEnKTtcbiAgICB0aGlzLmF1dGhvckdsb2JhbENvbmZpZy5kaXNwbGF5Q29sb3IuZGFyayA9IG51bGw7IC8vIG5ldyBDb2xvclByb3ZpZGVyKCcjMzQzYTQwJyk7XG4gICAgdGhpcy5hdXRob3JHbG9iYWxDb25maWcuZGlzcGxheUNvbG9yLmN1c3RvbU9uZSA9IG51bGw7IC8vIG5ldyBDb2xvclByb3ZpZGVyKCcjMzQzYTQwJyk7XG4gICAgdGhpcy5hdXRob3JHbG9iYWxDb25maWcuZGlzcGxheUNvbG9yLmN1c3RvbVR3byA9IG51bGw7IC8vIG5ldyBDb2xvclByb3ZpZGVyKCcjMzQzYTQwJyk7XG4gICAgdGhpcy5hdXRob3JHbG9iYWxDb25maWcuZGlzcGxheUNvbG9yLmN1c3RvbVRocmVlID0gbnVsbDsgLy8gbmV3IENvbG9yUHJvdmlkZXIoJyMzNDNhNDAnKTtcbiAgICB0aGlzLmF1dGhvckdsb2JhbENvbmZpZy5kaXNwbGF5Q29sb3IuY3VzdG9tRm91ciA9IG51bGw7IC8vIG5ldyBDb2xvclByb3ZpZGVyKCcjMzQzYTQwJyk7XG4gICAgdGhpcy5hdXRob3JHbG9iYWxDb25maWcuZGlzcGxheUNvbG9yLmN1c3RvbUZpdmUgPSBudWxsOyAvLyBuZXcgQ29sb3JQcm92aWRlcignIzM0M2E0MCcpO1xuICAgIC8vIGVuZHJlZ2lvblxuXG4gICAgdGhpcy5wcm9kdWN0aW9uR2xvYmFsQ29uZmlnLmRpc3BsYXlDb2xvciA9IHRoaXMuYXV0aG9yR2xvYmFsQ29uZmlnLmRpc3BsYXlDb2xvcjtcblxuICAgIC8vIHJlZ2lvbiAqKiogZ2xvYmFsIHVzZXJDb25maWcgKHVzZXIgaW5wdXQgYXBwLW1vZHVsZSkgKioqXG4gICAgdGhpcy5zZXRVc2VyQ29sb3JzKHRoaXMudXNlckdlbmVyYXRlZENvbmZpZy5jb2xvckxpc3QpO1xuXG4gICAgLy8gZW5kcmVnaW9uXG5cbiAgICB0aGlzLnNldE5vZGVTdHlsZXModGhpcy5wcm9kdWN0aW9uR2xvYmFsQ29uZmlnLmRpc3BsYXlDb2xvcik7XG4gIH1cblxuICByZXNldFN0eWxlcygpOiB2b2lkIHtcbiAgICB0aGlzLnNldFVzZXJDb2xvcnModGhpcy51c2VyR2VuZXJhdGVkQ29uZmlnLmNvbG9yTGlzdCk7XG4gICAgdGhpcy5zZXROb2RlU3R5bGVzKHRoaXMucHJvZHVjdGlvbkdsb2JhbENvbmZpZy5kaXNwbGF5Q29sb3IsIHRydWUpO1xuICB9XG5cbiAgc2V0Tm9kZVN0eWxlcyhfUHJvZHVjdGlvbkNvbG9yVHlwZXM6IElDb2xvck9iamVjdCwgX1Jlc2V0OiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcbiAgICBpZiAoX1Jlc2V0KSB7XG4gICAgICBjb25zdCBldm9sdmVEaWFsb2dTdHlsZU5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmd4LWF3ZXNvbWUtcG9wdXAtZ2xvYi1zdHlsZXMnKSBhcyBIVE1MU3R5bGVFbGVtZW50O1xuICAgICAgaWYgKGV2b2x2ZURpYWxvZ1N0eWxlTm9kZSkge1xuICAgICAgICBldm9sdmVEaWFsb2dTdHlsZU5vZGUucmVtb3ZlKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuc2V0VG9hc3RTdHlsZXMoKTtcblxuICAgIE9iamVjdC5rZXlzKF9Qcm9kdWN0aW9uQ29sb3JUeXBlcykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgaWYgKF9Qcm9kdWN0aW9uQ29sb3JUeXBlc1trZXldKSB7XG4gICAgICAgIHRoaXMuc2V0QnV0dG9uU3R5bGluZyhrZXksIF9Qcm9kdWN0aW9uQ29sb3JUeXBlc1trZXldKTtcbiAgICAgICAgdGhpcy5zZXRJY29uU3R5bGluZyhrZXksIF9Qcm9kdWN0aW9uQ29sb3JUeXBlc1trZXldKTtcbiAgICAgICAgdGhpcy5zZXRUb2FzdFN0eWxpbmcoa2V5LCBfUHJvZHVjdGlvbkNvbG9yVHlwZXNba2V5XSk7XG4gICAgICAgIHRoaXMuc2V0RGlhbG9nRnJhbWUoa2V5LCBfUHJvZHVjdGlvbkNvbG9yVHlwZXNba2V5XSk7XG5cbiAgICAgICAgaWYgKENvbG9yVmFyaWFuY2Vba2V5LnRvVXBwZXJDYXNlKCldID09PSBDb2xvclZhcmlhbmNlLlBSSU1BUlkpIHtcbiAgICAgICAgICB0aGlzLmdldFNoZWV0KCduZ3gtYXdlc29tZS1wb3B1cC1zdHlsZXMnKS5hZGRSdWxlKFxuICAgICAgICAgICAgJy5uZ3gtYXdlc29tZS1wb3B1cC1vdmVybGF5JyxcbiAgICAgICAgICAgIGBiYWNrZ3JvdW5kOiAgJHtfUHJvZHVjdGlvbkNvbG9yVHlwZXNba2V5XS5UcmFuc3BhcmVudERhcmtlblZhcmlhbmNlfSFpbXBvcnRhbnQ7YFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRVc2VyQ29sb3JzKF9Vc2VyQ29sb3JUeXBlczogSUNvbG9yVHlwZXMpOiB2b2lkIHtcbiAgICBpZiAodHlwZW9mIF9Vc2VyQ29sb3JUeXBlcyAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB1c2VyS2V5cyA9IE9iamVjdC5rZXlzKF9Vc2VyQ29sb3JUeXBlcyk7XG4gICAgY29uc3QgcHJvZHVjdGlvbk9iamVjdEtleXMgPSBPYmplY3Qua2V5cyh0aGlzLnByb2R1Y3Rpb25HbG9iYWxDb25maWcuZGlzcGxheUNvbG9yKTtcblxuICAgIHVzZXJLZXlzLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGlmIChwcm9kdWN0aW9uT2JqZWN0S2V5cy5maW5kKHRLZXkgPT4gdEtleSA9PT0ga2V5KSkge1xuICAgICAgICBpZiAoX1VzZXJDb2xvclR5cGVzW2tleV0pIHtcbiAgICAgICAgICBjb25zdCBiYXNlQ29sb3JQcm92aWRlciA9IG5ldyBDb2xvclByb3ZpZGVyKF9Vc2VyQ29sb3JUeXBlc1trZXldKTtcbiAgICAgICAgICBpZiAoYmFzZUNvbG9yUHJvdmlkZXIuQmFzZSkge1xuICAgICAgICAgICAgdGhpcy5wcm9kdWN0aW9uR2xvYmFsQ29uZmlnLmRpc3BsYXlDb2xvcltrZXldID0gYmFzZUNvbG9yUHJvdmlkZXI7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucHJvZHVjdGlvbkdsb2JhbENvbmZpZy5kaXNwbGF5Q29sb3Jba2V5XSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRTaGVldChfU3R5bGVJRDogc3RyaW5nKTogdW5kZWZpbmVkIHwgQ1NTU3R5bGVTaGVldCB7XG4gICAgLy8gQ3JlYXRlIHRoZSA8c3R5bGU+IHRhZ1xuICAgIGxldCBldm9sdmVEaWFsb2dTdHlsZU5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChfU3R5bGVJRCkgYXMgSFRNTFN0eWxlRWxlbWVudDtcbiAgICBpZiAoIWV2b2x2ZURpYWxvZ1N0eWxlTm9kZSkge1xuICAgICAgY29uc3QgaGVhZE5vZGUgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gICAgICBpZiAoIWhlYWROb2RlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgZXZvbHZlRGlhbG9nU3R5bGVOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgIGV2b2x2ZURpYWxvZ1N0eWxlTm9kZS5zZXRBdHRyaWJ1dGUoJ2lkJywgX1N0eWxlSUQpO1xuICAgICAgZXZvbHZlRGlhbG9nU3R5bGVOb2RlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKSk7XG4gICAgICBoZWFkTm9kZS5hcHBlbmRDaGlsZChldm9sdmVEaWFsb2dTdHlsZU5vZGUpO1xuICAgIH1cblxuICAgIHJldHVybiBldm9sdmVEaWFsb2dTdHlsZU5vZGUgPyBldm9sdmVEaWFsb2dTdHlsZU5vZGUuc2hlZXQgOiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRUb2FzdFN0eWxpbmcoX0tleTogc3RyaW5nLCBfQ29sb3JQcm92aWRlcjogSUNvbG9yUHJvdmlkZXIpOiB2b2lkIHtcbiAgICBjb25zdCBzdGFuZGFyZFRvYXN0ID0gYC50b2FzdC13cmFwcGVyLnN0YW5kYXJkLXRvYXN0IC5ldm9sdmUtdG9hc3QuJHtfS2V5LnRvTG93ZXJDYXNlKCl9LWRpYWxvZ2A7XG4gICAgY29uc3Qgc3RhbmRhcmRUb2FzdFN0eWxlID0gYFxuICAgICAgICBiYWNrZ3JvdW5kOiAgJHtfQ29sb3JQcm92aWRlci5CcmlnaHRTaGFkZX0haW1wb3J0YW50O1xuICAgICAgICBib3JkZXItY29sb3I6ICR7X0NvbG9yUHJvdmlkZXIuQnJpZ2h0ZW59IWltcG9ydGFudDtcbiAgICAgICAgYDtcblxuICAgIGNvbnN0IHNpbXBsZVRvYXN0ID0gYC50b2FzdC13cmFwcGVyLnNpbXBsZS10b2FzdCAuZXZvbHZlLXRvYXN0LiR7X0tleS50b0xvd2VyQ2FzZSgpfS1kaWFsb2dgO1xuICAgIGNvbnN0IHNpbXBsZVRvYXN0U3R5bGUgPSBgXG4gICAgICAgIGJhY2tncm91bmQ6ICAke19Db2xvclByb3ZpZGVyLkJyaWdodFdhcm1seX0haW1wb3J0YW50O1xuICAgICAgICBjb2xvcjogICR7X0NvbG9yUHJvdmlkZXIuRGFya2VufSFpbXBvcnRhbnQ7XG4gICAgICAgIGA7XG5cbiAgICBjb25zdCBiYXNlUHJvZ3Jlc3MgPSBgLnRvYXN0LXdyYXBwZXIgLmV2b2x2ZS10b2FzdC4ke19LZXkudG9Mb3dlckNhc2UoKX0tZGlhbG9nIC5wcm9ncmVzcy1iYXJgO1xuICAgIGNvbnN0IGJhc2VQcm9ncmVzc1N0eWxlID0gYFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAgJHtfQ29sb3JQcm92aWRlci5CcmlnaHRlbn0haW1wb3J0YW50O1xuICAgICAgICBgO1xuXG4gICAgdGhpcy5nZXRTaGVldCgnbmd4LWF3ZXNvbWUtcG9wdXAtZ2xvYi1zdHlsZXMnKS5hZGRSdWxlKGJhc2VQcm9ncmVzcywgYmFzZVByb2dyZXNzU3R5bGUpO1xuICAgIHRoaXMuZ2V0U2hlZXQoJ25neC1hd2Vzb21lLXBvcHVwLWdsb2Itc3R5bGVzJykuYWRkUnVsZShzdGFuZGFyZFRvYXN0LCBzdGFuZGFyZFRvYXN0U3R5bGUpO1xuICAgIHRoaXMuZ2V0U2hlZXQoJ25neC1hd2Vzb21lLXBvcHVwLWdsb2Itc3R5bGVzJykuYWRkUnVsZShzaW1wbGVUb2FzdCwgc2ltcGxlVG9hc3RTdHlsZSk7XG4gIH1cblxuICBwcml2YXRlIHNldEJ1dHRvblN0eWxpbmcoX0tleTogc3RyaW5nLCBfQ29sb3JQcm92aWRlcjogSUNvbG9yUHJvdmlkZXIpOiB2b2lkIHtcbiAgICBjb25zdCBiYXNlQnV0dG9uQ2xhc3MgPSBgLmVkLWJ0bi0ke19LZXkudG9Mb3dlckNhc2UoKX1gO1xuICAgIGNvbnN0IGJhc2VTdHlsZSA9IGBcbiAgICAgICAgY29sb3I6ICR7X0NvbG9yUHJvdmlkZXIuQ29udHJhc3RDb2xvcn0haW1wb3J0YW50O1xuICAgICAgICBiYWNrZ3JvdW5kOiAgJHtfQ29sb3JQcm92aWRlci5CYXNlfSFpbXBvcnRhbnQ7XG4gICAgICAgIGJvcmRlci1jb2xvcjogJHtfQ29sb3JQcm92aWRlci5CcmlnaHRlbkZvclNoYWRlfSFpbXBvcnRhbnQ7XG4gICAgICAgIGA7XG5cbiAgICBjb25zdCBob3ZlckJ1dHRvbkNsYXNzID0gYC5lZC1idG4tJHtfS2V5LnRvTG93ZXJDYXNlKCl9OmhvdmVyYDtcbiAgICBjb25zdCBob3ZlclN0eWxlID0gYFxuICAgICAgICBiYWNrZ3JvdW5kOiAgJHtfQ29sb3JQcm92aWRlci5Jc0Jhc2VCcmlnaHQgPyBfQ29sb3JQcm92aWRlci5EYXJrZW5Gb3JTaGFkZSA6IF9Db2xvclByb3ZpZGVyLkJyaWdodGVuRm9yU2hhZGV9IWltcG9ydGFudDtcbiAgICAgICAgYm9yZGVyLWNvbG9yOiAke19Db2xvclByb3ZpZGVyLklzQmFzZUJyaWdodCA/IF9Db2xvclByb3ZpZGVyLkRhcmtlbiA6IF9Db2xvclByb3ZpZGVyLkJyaWdodGVufSFpbXBvcnRhbnQ7XG4gICAgICAgIGA7XG5cbiAgICBjb25zdCBmb2N1c0FjdGl2ZUJ1dHRvbkNsYXNzID0gYC5lZC1idG4tJHtfS2V5LnRvTG93ZXJDYXNlKCl9OmZvY3VzLCAuZWQtYnRuLSR7X0tleS50b0xvd2VyQ2FzZSgpfTphY3RpdmVgO1xuICAgIGNvbnN0IGZvY3VzQWN0aXZlU3R5bGUgPSBgXG4gICAgICAgIGJveC1zaGFkb3c6IDAgMCAxcHggMnB4ICR7X0NvbG9yUHJvdmlkZXIuSXNCYXNlQnJpZ2h0ID8gX0NvbG9yUHJvdmlkZXIuRGFya2VuIDogX0NvbG9yUHJvdmlkZXIuQnJpZ2h0ZW59IWltcG9ydGFudDtcbiAgICAgICAgYDtcblxuICAgIHRoaXMuZ2V0U2hlZXQoJ25neC1hd2Vzb21lLXBvcHVwLWdsb2Itc3R5bGVzJykuYWRkUnVsZShiYXNlQnV0dG9uQ2xhc3MsIGJhc2VTdHlsZSk7XG4gICAgdGhpcy5nZXRTaGVldCgnbmd4LWF3ZXNvbWUtcG9wdXAtZ2xvYi1zdHlsZXMnKS5hZGRSdWxlKGhvdmVyQnV0dG9uQ2xhc3MsIGhvdmVyU3R5bGUpO1xuICAgIHRoaXMuZ2V0U2hlZXQoJ25neC1hd2Vzb21lLXBvcHVwLWdsb2Itc3R5bGVzJykuYWRkUnVsZShmb2N1c0FjdGl2ZUJ1dHRvbkNsYXNzLCBmb2N1c0FjdGl2ZVN0eWxlKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0SWNvblN0eWxpbmcoX0tleTogc3RyaW5nLCBfQ29sb3JQcm92aWRlcjogSUNvbG9yUHJvdmlkZXIpOiB2b2lkIHtcbiAgICBjb25zdCBiYXNlSWNvbkNsYXNzID0gYC5hcC1pY29uLSR7X0tleS50b0xvd2VyQ2FzZSgpfWA7XG4gICAgY29uc3QgYmFzZVN0eWxlID0gYGNvbG9yOiAke19Db2xvclByb3ZpZGVyLkJyaWdodGVuRm9yU2hhZGV9IWltcG9ydGFudDtgO1xuXG4gICAgdGhpcy5nZXRTaGVldCgnbmd4LWF3ZXNvbWUtcG9wdXAtZ2xvYi1zdHlsZXMnKS5hZGRSdWxlKGJhc2VJY29uQ2xhc3MsIGJhc2VTdHlsZSk7XG4gIH1cblxuICBwcml2YXRlIHNldERpYWxvZ0ZyYW1lKF9LZXk6IHN0cmluZywgX0NvbG9yUHJvdmlkZXI6IElDb2xvclByb3ZpZGVyKTogdm9pZCB7XG4gICAgY29uc3QgYmFzZURpYWxvZ0ZyYW1lQ2xhc3MgPSBgLm5neC1hd2Vzb21lLXBvcHVwLW92ZXJsYXkgLiR7X0tleS50b0xvd2VyQ2FzZSgpfS1kaWFsb2dgO1xuICAgIGNvbnN0IGJhc2VTdHlsZSA9IGBcbiAgICAgICAgYm9yZGVyLWNvbG9yOiAke19Db2xvclByb3ZpZGVyLkJyaWdodGVufSFpbXBvcnRhbnQ7XG4gICAgICAgIGA7XG5cbiAgICB0aGlzLmdldFNoZWV0KCduZ3gtYXdlc29tZS1wb3B1cC1nbG9iLXN0eWxlcycpLmFkZFJ1bGUoYmFzZURpYWxvZ0ZyYW1lQ2xhc3MsIGJhc2VTdHlsZSk7XG4gIH1cblxuICBwcml2YXRlIHNldFRvYXN0U3R5bGVzKCk6IHZvaWQge1xuICAgIHRoaXMuZ2V0U2hlZXQoJ25neC1hd2Vzb21lLXBvcHVwLXN0eWxlcycpLmFkZFJ1bGUoYC50b2FzdC1lbnRpdHlgLCBgYWxsIDAuNXMgZWFzZTtgKTtcbiAgICB0aGlzLmdldFNoZWV0KCduZ3gtYXdlc29tZS1wb3B1cC1zdHlsZXMnKS5hZGRSdWxlKGAudG9hc3QtZW50aXR5OmZpcnN0LWNoaWxkYCwgYGFuaW1hdGlvbjogbW92ZSAwLjdzIGVhc2Utb3V0O2ApO1xuXG4gICAgY29uc3QgaXNJRU9yRWRnZSA9IC9tc2llXFxzfHRyaWRlbnRcXC8vaS50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgICBpZiAoIWlzSUVPckVkZ2UpIHtcbiAgICAgIHRoaXMuZ2V0U2hlZXQoJ25neC1hd2Vzb21lLXBvcHVwLXN0eWxlcycpLmFkZFJ1bGUoXG4gICAgICAgIGBALXdlYmtpdC1rZXlmcmFtZXMgbW92ZWAsXG4gICAgICAgIGBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwJSB7bWFyZ2luLXRvcDogLTVweDsgb3BhY2l0eTogMC40O31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAzMCUge21hcmdpbi10b3A6IC00cHg7IG9wYWNpdHk6IDAuNzt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMTAwJSB7bWFyZ2luLXRvcDogMHB4OyBvcGFjaXR5OiAxO31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgXG4gICAgICApO1xuICAgICAgdGhpcy5nZXRTaGVldCgnbmd4LWF3ZXNvbWUtcG9wdXAtc3R5bGVzJykuYWRkUnVsZShcbiAgICAgICAgYEBrZXlmcmFtZXMgbW92ZWAsXG4gICAgICAgIGBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwJSB7bWFyZ2luLXRvcDogLTVweDsgb3BhY2l0eTogMC40O31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAzMCUge21hcmdpbi10b3A6IC00cHg7IG9wYWNpdHk6IDAuNzt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMTAwJSB7bWFyZ2luLXRvcDogMHB4OyBvcGFjaXR5OiAxO31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgXG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuIl19