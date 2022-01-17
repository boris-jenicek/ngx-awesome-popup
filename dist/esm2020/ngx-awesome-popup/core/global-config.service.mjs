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
GlobalConfigService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: GlobalConfigService, deps: [{ token: 'cdGlobalConfig' }], target: i0.ɵɵFactoryTarget.Injectable });
GlobalConfigService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: GlobalConfigService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: GlobalConfigService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: ['cdGlobalConfig']
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLWNvbmZpZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbmd4LWF3ZXNvbWUtcG9wdXAvY29yZS9nbG9iYWwtY29uZmlnLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDeEMsT0FBTyxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7QUFHakYsTUFBTSxPQUFPLGlCQUFpQjtJQUM1QixZQUFZLFlBQWdDO1FBQzFDLE1BQU0sbUJBQW1CLEdBQXdCLGNBQWMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDbEcsSUFBSSxZQUFZLEVBQUU7WUFDaEIsbUJBQW1CLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMxRCxtQkFBbUIsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsc0JBQXNCLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ2xHO2FBQU07WUFDTCxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNuQztJQUNILENBQUM7Q0FDRjtBQUtELE1BQU0sT0FBTyxtQkFBbUI7SUFLOUIsWUFFVSxnQkFBbUM7UUFBbkMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFtQjtRQU5yQyx1QkFBa0IsR0FBa0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUUvRCwyQkFBc0IsR0FBa0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQU16RCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FB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QUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLE9BQU8sQ0FDL0MseUJBQXlCLEVBQ3pCOzs7O3lDQUlpQyxDQUNsQyxDQUFDO1lBQ0YsSUFBSSxDQUFDLFFBQVEsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLE9BQU8sQ0FDL0MsaUJBQWlCLEVBQ2pCOzs7O3lDQUlpQyxDQUNsQyxDQUFDO1NBQ0g7SUFDSCxDQUFDOztnSEFsTVUsbUJBQW1CLGtCQU1wQixnQkFBZ0I7b0hBTmYsbUJBQW1CLGNBRmxCLE1BQU07MkZBRVAsbUJBQW1CO2tCQUgvQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7MEJBT0ksTUFBTTsyQkFBQyxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNlcnZpY2VMb2NhdG9yIH0gZnJvbSAnLi4vbG9jYXRvci5zZXJ2aWNlJztcbmltcG9ydCB7IENvbG9yVmFyaWFuY2UgfSBmcm9tICcuL2VudW1zJztcbmltcG9ydCB7IENvbG9yUHJvdmlkZXIsIEdsb2JhbENvbmZpZywgR2xvYmFsVXNlckNvbmZpZyB9IGZyb20gJy4vZ2xvYmFsLWNsYXNzZXMnO1xuaW1wb3J0IHsgSUNvbG9yT2JqZWN0LCBJQ29sb3JQcm92aWRlciwgSUNvbG9yVHlwZXMsIElHbG9iYWxDb25maWcsIElHbG9iYWxVc2VyQ29uZmlnIH0gZnJvbSAnLi9nbG9iYWwtaW50ZXJmYWNlcyc7XG5cbmV4cG9ydCBjbGFzcyBSZXNldEdsb2JhbENvbmZpZyB7XG4gIGNvbnN0cnVjdG9yKGdsb2JhbENvbmZpZz86IElHbG9iYWxVc2VyQ29uZmlnKSB7XG4gICAgY29uc3QgZ2xvYmFsQ29uZmlnU2VydmljZTogR2xvYmFsQ29uZmlnU2VydmljZSA9IFNlcnZpY2VMb2NhdG9yLmluamVjdG9yLmdldChHbG9iYWxDb25maWdTZXJ2aWNlKTtcbiAgICBpZiAoZ2xvYmFsQ29uZmlnKSB7XG4gICAgICBnbG9iYWxDb25maWdTZXJ2aWNlLnNldFVzZXJDb2xvcnMoZ2xvYmFsQ29uZmlnLmNvbG9yTGlzdCk7XG4gICAgICBnbG9iYWxDb25maWdTZXJ2aWNlLnNldE5vZGVTdHlsZXMoZ2xvYmFsQ29uZmlnU2VydmljZS5wcm9kdWN0aW9uR2xvYmFsQ29uZmlnLmRpc3BsYXlDb2xvciwgdHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdsb2JhbENvbmZpZ1NlcnZpY2UucmVzZXRTdHlsZXMoKTtcbiAgICB9XG4gIH1cbn1cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgR2xvYmFsQ29uZmlnU2VydmljZSB7XG4gIHByaXZhdGUgYXV0aG9yR2xvYmFsQ29uZmlnOiBJR2xvYmFsQ29uZmlnID0gbmV3IEdsb2JhbENvbmZpZygpO1xuICBwcml2YXRlIHVzZXJHZW5lcmF0ZWRDb25maWc6IElHbG9iYWxVc2VyQ29uZmlnO1xuICBwcm9kdWN0aW9uR2xvYmFsQ29uZmlnOiBJR2xvYmFsQ29uZmlnID0gbmV3IEdsb2JhbENvbmZpZygpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoJ2NkR2xvYmFsQ29uZmlnJylcbiAgICBwcml2YXRlIHVzZXJHbG9iYWxDb25maWc6IElHbG9iYWxVc2VyQ29uZmlnXG4gICkge1xuICAgIHRoaXMudXNlckdlbmVyYXRlZENvbmZpZyA9IG5ldyBHbG9iYWxVc2VyQ29uZmlnKHVzZXJHbG9iYWxDb25maWcpO1xuXG4gICAgLy8gcmVnaW9uICoqKiBhdXRob3IgZ2xvYmFsIGNvbmZpZyB2YWx1ZXMgKGlmIHRoZXJlIGlzIG5vIHVzZXIgaW5wdXQpICoqKlxuICAgIHRoaXMuYXV0aG9yR2xvYmFsQ29uZmlnLmRpc3BsYXlDb2xvci5wcmltYXJ5ID0gbnVsbDsgLy8gbmV3IENvbG9yUHJvdmlkZXIoJyNmZjllMDAnKTtcbiAgICB0aGlzLmF1dGhvckdsb2JhbENvbmZpZy5kaXNwbGF5Q29sb3Iuc2Vjb25kYXJ5ID0gbnVsbDsgLy8gbmV3IENvbG9yUHJvdmlkZXIoJyM5ODllYTUnKTtcbiAgICB0aGlzLmF1dGhvckdsb2JhbENvbmZpZy5kaXNwbGF5Q29sb3Iuc3VjY2VzcyA9IG51bGw7IC8vIG5ldyBDb2xvclByb3ZpZGVyKCcjM2NhZWEzJyk7XG4gICAgdGhpcy5hdXRob3JHbG9iYWxDb25maWcuZGlzcGxheUNvbG9yLmluZm8gPSBudWxsOyAvLyBuZXcgQ29sb3JQcm92aWRlcignIzJmOGVlNScpO1xuICAgIHRoaXMuYXV0aG9yR2xvYmFsQ29uZmlnLmRpc3BsYXlDb2xvci53YXJuaW5nID0gbnVsbDsgLy8gbmV3IENvbG9yUHJvdmlkZXIoJyNmZmMxMDcnKTtcbiAgICB0aGlzLmF1dGhvckdsb2JhbENvbmZpZy5kaXNwbGF5Q29sb3IuZGFuZ2VyID0gbnVsbDsgLy8gbmV3IENvbG9yUHJvdmlkZXIoJyNlNDY0NjQnKTtcbiAgICB0aGlzLmF1dGhvckdsb2JhbENvbmZpZy5kaXNwbGF5Q29sb3IubGlnaHQgPSBudWxsOyAvLyBuZXcgQ29sb3JQcm92aWRlcignI2Y4ZjlmYScpO1xuICAgIHRoaXMuYXV0aG9yR2xvYmFsQ29uZmlnLmRpc3BsYXlDb2xvci5kYXJrID0gbnVsbDsgLy8gbmV3IENvbG9yUHJvdmlkZXIoJyMzNDNhNDAnKTtcbiAgICB0aGlzLmF1dGhvckdsb2JhbENvbmZpZy5kaXNwbGF5Q29sb3IuY3VzdG9tT25lID0gbnVsbDsgLy8gbmV3IENvbG9yUHJvdmlkZXIoJyMzNDNhNDAnKTtcbiAgICB0aGlzLmF1dGhvckdsb2JhbENvbmZpZy5kaXNwbGF5Q29sb3IuY3VzdG9tVHdvID0gbnVsbDsgLy8gbmV3IENvbG9yUHJvdmlkZXIoJyMzNDNhNDAnKTtcbiAgICB0aGlzLmF1dGhvckdsb2JhbENvbmZpZy5kaXNwbGF5Q29sb3IuY3VzdG9tVGhyZWUgPSBudWxsOyAvLyBuZXcgQ29sb3JQcm92aWRlcignIzM0M2E0MCcpO1xuICAgIHRoaXMuYXV0aG9yR2xvYmFsQ29uZmlnLmRpc3BsYXlDb2xvci5jdXN0b21Gb3VyID0gbnVsbDsgLy8gbmV3IENvbG9yUHJvdmlkZXIoJyMzNDNhNDAnKTtcbiAgICB0aGlzLmF1dGhvckdsb2JhbENvbmZpZy5kaXNwbGF5Q29sb3IuY3VzdG9tRml2ZSA9IG51bGw7IC8vIG5ldyBDb2xvclByb3ZpZGVyKCcjMzQzYTQwJyk7XG4gICAgLy8gZW5kcmVnaW9uXG5cbiAgICB0aGlzLnByb2R1Y3Rpb25HbG9iYWxDb25maWcuZGlzcGxheUNvbG9yID0gdGhpcy5hdXRob3JHbG9iYWxDb25maWcuZGlzcGxheUNvbG9yO1xuXG4gICAgLy8gcmVnaW9uICoqKiBnbG9iYWwgdXNlckNvbmZpZyAodXNlciBpbnB1dCBhcHAtbW9kdWxlKSAqKipcbiAgICB0aGlzLnNldFVzZXJDb2xvcnModGhpcy51c2VyR2VuZXJhdGVkQ29uZmlnLmNvbG9yTGlzdCk7XG5cbiAgICAvLyBlbmRyZWdpb25cblxuICAgIHRoaXMuc2V0Tm9kZVN0eWxlcyh0aGlzLnByb2R1Y3Rpb25HbG9iYWxDb25maWcuZGlzcGxheUNvbG9yKTtcbiAgfVxuXG4gIHJlc2V0U3R5bGVzKCk6IHZvaWQge1xuICAgIHRoaXMuc2V0VXNlckNvbG9ycyh0aGlzLnVzZXJHZW5lcmF0ZWRDb25maWcuY29sb3JMaXN0KTtcbiAgICB0aGlzLnNldE5vZGVTdHlsZXModGhpcy5wcm9kdWN0aW9uR2xvYmFsQ29uZmlnLmRpc3BsYXlDb2xvciwgdHJ1ZSk7XG4gIH1cblxuICBzZXROb2RlU3R5bGVzKF9Qcm9kdWN0aW9uQ29sb3JUeXBlczogSUNvbG9yT2JqZWN0LCBfUmVzZXQ6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xuICAgIGlmIChfUmVzZXQpIHtcbiAgICAgIGNvbnN0IGV2b2x2ZURpYWxvZ1N0eWxlTm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZ3gtYXdlc29tZS1wb3B1cC1nbG9iLXN0eWxlcycpIGFzIEhUTUxTdHlsZUVsZW1lbnQ7XG4gICAgICBpZiAoZXZvbHZlRGlhbG9nU3R5bGVOb2RlKSB7XG4gICAgICAgIGV2b2x2ZURpYWxvZ1N0eWxlTm9kZS5yZW1vdmUoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5zZXRUb2FzdFN0eWxlcygpO1xuXG4gICAgT2JqZWN0LmtleXMoX1Byb2R1Y3Rpb25Db2xvclR5cGVzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBpZiAoX1Byb2R1Y3Rpb25Db2xvclR5cGVzW2tleV0pIHtcbiAgICAgICAgdGhpcy5zZXRCdXR0b25TdHlsaW5nKGtleSwgX1Byb2R1Y3Rpb25Db2xvclR5cGVzW2tleV0pO1xuICAgICAgICB0aGlzLnNldEljb25TdHlsaW5nKGtleSwgX1Byb2R1Y3Rpb25Db2xvclR5cGVzW2tleV0pO1xuICAgICAgICB0aGlzLnNldFRvYXN0U3R5bGluZyhrZXksIF9Qcm9kdWN0aW9uQ29sb3JUeXBlc1trZXldKTtcbiAgICAgICAgdGhpcy5zZXREaWFsb2dGcmFtZShrZXksIF9Qcm9kdWN0aW9uQ29sb3JUeXBlc1trZXldKTtcblxuICAgICAgICBpZiAoQ29sb3JWYXJpYW5jZVtrZXkudG9VcHBlckNhc2UoKV0gPT09IENvbG9yVmFyaWFuY2UuUFJJTUFSWSkge1xuICAgICAgICAgIHRoaXMuZ2V0U2hlZXQoJ25neC1hd2Vzb21lLXBvcHVwLXN0eWxlcycpLmFkZFJ1bGUoXG4gICAgICAgICAgICAnLm5neC1hd2Vzb21lLXBvcHVwLW92ZXJsYXknLFxuICAgICAgICAgICAgYGJhY2tncm91bmQ6ICAke19Qcm9kdWN0aW9uQ29sb3JUeXBlc1trZXldLlRyYW5zcGFyZW50RGFya2VuVmFyaWFuY2V9IWltcG9ydGFudDtgXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHNldFVzZXJDb2xvcnMoX1VzZXJDb2xvclR5cGVzOiBJQ29sb3JUeXBlcyk6IHZvaWQge1xuICAgIGlmICh0eXBlb2YgX1VzZXJDb2xvclR5cGVzICE9PSAnb2JqZWN0Jykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHVzZXJLZXlzID0gT2JqZWN0LmtleXMoX1VzZXJDb2xvclR5cGVzKTtcbiAgICBjb25zdCBwcm9kdWN0aW9uT2JqZWN0S2V5cyA9IE9iamVjdC5rZXlzKHRoaXMucHJvZHVjdGlvbkdsb2JhbENvbmZpZy5kaXNwbGF5Q29sb3IpO1xuXG4gICAgdXNlcktleXMuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgaWYgKHByb2R1Y3Rpb25PYmplY3RLZXlzLmZpbmQodEtleSA9PiB0S2V5ID09PSBrZXkpKSB7XG4gICAgICAgIGlmIChfVXNlckNvbG9yVHlwZXNba2V5XSkge1xuICAgICAgICAgIGNvbnN0IGJhc2VDb2xvclByb3ZpZGVyID0gbmV3IENvbG9yUHJvdmlkZXIoX1VzZXJDb2xvclR5cGVzW2tleV0pO1xuICAgICAgICAgIGlmIChiYXNlQ29sb3JQcm92aWRlci5CYXNlKSB7XG4gICAgICAgICAgICB0aGlzLnByb2R1Y3Rpb25HbG9iYWxDb25maWcuZGlzcGxheUNvbG9yW2tleV0gPSBiYXNlQ29sb3JQcm92aWRlcjtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5wcm9kdWN0aW9uR2xvYmFsQ29uZmlnLmRpc3BsYXlDb2xvcltrZXldID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGdldFNoZWV0KF9TdHlsZUlEOiBzdHJpbmcpOiB1bmRlZmluZWQgfCBDU1NTdHlsZVNoZWV0IHtcbiAgICAvLyBDcmVhdGUgdGhlIDxzdHlsZT4gdGFnXG4gICAgbGV0IGV2b2x2ZURpYWxvZ1N0eWxlTm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKF9TdHlsZUlEKSBhcyBIVE1MU3R5bGVFbGVtZW50O1xuICAgIGlmICghZXZvbHZlRGlhbG9nU3R5bGVOb2RlKSB7XG4gICAgICBjb25zdCBoZWFkTm9kZSA9IGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcbiAgICAgIGlmICghaGVhZE5vZGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBldm9sdmVEaWFsb2dTdHlsZU5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgZXZvbHZlRGlhbG9nU3R5bGVOb2RlLnNldEF0dHJpYnV0ZSgnaWQnLCBfU3R5bGVJRCk7XG4gICAgICBldm9sdmVEaWFsb2dTdHlsZU5vZGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpKTtcbiAgICAgIGhlYWROb2RlLmFwcGVuZENoaWxkKGV2b2x2ZURpYWxvZ1N0eWxlTm9kZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGV2b2x2ZURpYWxvZ1N0eWxlTm9kZSA/IGV2b2x2ZURpYWxvZ1N0eWxlTm9kZS5zaGVldCA6IG51bGw7XG4gIH1cblxuICBwcml2YXRlIHNldFRvYXN0U3R5bGluZyhfS2V5OiBzdHJpbmcsIF9Db2xvclByb3ZpZGVyOiBJQ29sb3JQcm92aWRlcik6IHZvaWQge1xuICAgIGNvbnN0IHN0YW5kYXJkVG9hc3QgPSBgLnRvYXN0LXdyYXBwZXIuc3RhbmRhcmQtdG9hc3QgLmV2b2x2ZS10b2FzdC4ke19LZXkudG9Mb3dlckNhc2UoKX0tZGlhbG9nYDtcbiAgICBjb25zdCBzdGFuZGFyZFRvYXN0U3R5bGUgPSBgXG4gICAgICAgIGJhY2tncm91bmQ6ICAke19Db2xvclByb3ZpZGVyLkJyaWdodFNoYWRlfSFpbXBvcnRhbnQ7XG4gICAgICAgIGJvcmRlci1jb2xvcjogJHtfQ29sb3JQcm92aWRlci5CcmlnaHRlbn0haW1wb3J0YW50O1xuICAgICAgICBgO1xuXG4gICAgY29uc3Qgc2ltcGxlVG9hc3QgPSBgLnRvYXN0LXdyYXBwZXIuc2ltcGxlLXRvYXN0IC5ldm9sdmUtdG9hc3QuJHtfS2V5LnRvTG93ZXJDYXNlKCl9LWRpYWxvZ2A7XG4gICAgY29uc3Qgc2ltcGxlVG9hc3RTdHlsZSA9IGBcbiAgICAgICAgYmFja2dyb3VuZDogICR7X0NvbG9yUHJvdmlkZXIuQnJpZ2h0V2FybWx5fSFpbXBvcnRhbnQ7XG4gICAgICAgIGNvbG9yOiAgJHtfQ29sb3JQcm92aWRlci5EYXJrZW59IWltcG9ydGFudDtcbiAgICAgICAgYDtcblxuICAgIGNvbnN0IGJhc2VQcm9ncmVzcyA9IGAudG9hc3Qtd3JhcHBlciAuZXZvbHZlLXRvYXN0LiR7X0tleS50b0xvd2VyQ2FzZSgpfS1kaWFsb2cgLnByb2dyZXNzLWJhcmA7XG4gICAgY29uc3QgYmFzZVByb2dyZXNzU3R5bGUgPSBgXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICAke19Db2xvclByb3ZpZGVyLkJyaWdodGVufSFpbXBvcnRhbnQ7XG4gICAgICAgIGA7XG5cbiAgICB0aGlzLmdldFNoZWV0KCduZ3gtYXdlc29tZS1wb3B1cC1nbG9iLXN0eWxlcycpLmFkZFJ1bGUoYmFzZVByb2dyZXNzLCBiYXNlUHJvZ3Jlc3NTdHlsZSk7XG4gICAgdGhpcy5nZXRTaGVldCgnbmd4LWF3ZXNvbWUtcG9wdXAtZ2xvYi1zdHlsZXMnKS5hZGRSdWxlKHN0YW5kYXJkVG9hc3QsIHN0YW5kYXJkVG9hc3RTdHlsZSk7XG4gICAgdGhpcy5nZXRTaGVldCgnbmd4LWF3ZXNvbWUtcG9wdXAtZ2xvYi1zdHlsZXMnKS5hZGRSdWxlKHNpbXBsZVRvYXN0LCBzaW1wbGVUb2FzdFN0eWxlKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0QnV0dG9uU3R5bGluZyhfS2V5OiBzdHJpbmcsIF9Db2xvclByb3ZpZGVyOiBJQ29sb3JQcm92aWRlcik6IHZvaWQge1xuICAgIGNvbnN0IGJhc2VCdXR0b25DbGFzcyA9IGAuZWQtYnRuLSR7X0tleS50b0xvd2VyQ2FzZSgpfWA7XG4gICAgY29uc3QgYmFzZVN0eWxlID0gYFxuICAgICAgICBjb2xvcjogJHtfQ29sb3JQcm92aWRlci5Db250cmFzdENvbG9yfSFpbXBvcnRhbnQ7XG4gICAgICAgIGJhY2tncm91bmQ6ICAke19Db2xvclByb3ZpZGVyLkJhc2V9IWltcG9ydGFudDtcbiAgICAgICAgYm9yZGVyLWNvbG9yOiAke19Db2xvclByb3ZpZGVyLkJyaWdodGVuRm9yU2hhZGV9IWltcG9ydGFudDtcbiAgICAgICAgYDtcblxuICAgIGNvbnN0IGhvdmVyQnV0dG9uQ2xhc3MgPSBgLmVkLWJ0bi0ke19LZXkudG9Mb3dlckNhc2UoKX06aG92ZXJgO1xuICAgIGNvbnN0IGhvdmVyU3R5bGUgPSBgXG4gICAgICAgIGJhY2tncm91bmQ6ICAke19Db2xvclByb3ZpZGVyLklzQmFzZUJyaWdodCA/IF9Db2xvclByb3ZpZGVyLkRhcmtlbkZvclNoYWRlIDogX0NvbG9yUHJvdmlkZXIuQnJpZ2h0ZW5Gb3JTaGFkZX0haW1wb3J0YW50O1xuICAgICAgICBib3JkZXItY29sb3I6ICR7X0NvbG9yUHJvdmlkZXIuSXNCYXNlQnJpZ2h0ID8gX0NvbG9yUHJvdmlkZXIuRGFya2VuIDogX0NvbG9yUHJvdmlkZXIuQnJpZ2h0ZW59IWltcG9ydGFudDtcbiAgICAgICAgYDtcblxuICAgIGNvbnN0IGZvY3VzQWN0aXZlQnV0dG9uQ2xhc3MgPSBgLmVkLWJ0bi0ke19LZXkudG9Mb3dlckNhc2UoKX06Zm9jdXMsIC5lZC1idG4tJHtfS2V5LnRvTG93ZXJDYXNlKCl9OmFjdGl2ZWA7XG4gICAgY29uc3QgZm9jdXNBY3RpdmVTdHlsZSA9IGBcbiAgICAgICAgYm94LXNoYWRvdzogMCAwIDFweCAycHggJHtfQ29sb3JQcm92aWRlci5Jc0Jhc2VCcmlnaHQgPyBfQ29sb3JQcm92aWRlci5EYXJrZW4gOiBfQ29sb3JQcm92aWRlci5CcmlnaHRlbn0haW1wb3J0YW50O1xuICAgICAgICBgO1xuXG4gICAgdGhpcy5nZXRTaGVldCgnbmd4LWF3ZXNvbWUtcG9wdXAtZ2xvYi1zdHlsZXMnKS5hZGRSdWxlKGJhc2VCdXR0b25DbGFzcywgYmFzZVN0eWxlKTtcbiAgICB0aGlzLmdldFNoZWV0KCduZ3gtYXdlc29tZS1wb3B1cC1nbG9iLXN0eWxlcycpLmFkZFJ1bGUoaG92ZXJCdXR0b25DbGFzcywgaG92ZXJTdHlsZSk7XG4gICAgdGhpcy5nZXRTaGVldCgnbmd4LWF3ZXNvbWUtcG9wdXAtZ2xvYi1zdHlsZXMnKS5hZGRSdWxlKGZvY3VzQWN0aXZlQnV0dG9uQ2xhc3MsIGZvY3VzQWN0aXZlU3R5bGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRJY29uU3R5bGluZyhfS2V5OiBzdHJpbmcsIF9Db2xvclByb3ZpZGVyOiBJQ29sb3JQcm92aWRlcik6IHZvaWQge1xuICAgIGNvbnN0IGJhc2VJY29uQ2xhc3MgPSBgLmFwLWljb24tJHtfS2V5LnRvTG93ZXJDYXNlKCl9YDtcbiAgICBjb25zdCBiYXNlU3R5bGUgPSBgY29sb3I6ICR7X0NvbG9yUHJvdmlkZXIuQnJpZ2h0ZW5Gb3JTaGFkZX0haW1wb3J0YW50O2A7XG5cbiAgICB0aGlzLmdldFNoZWV0KCduZ3gtYXdlc29tZS1wb3B1cC1nbG9iLXN0eWxlcycpLmFkZFJ1bGUoYmFzZUljb25DbGFzcywgYmFzZVN0eWxlKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0RGlhbG9nRnJhbWUoX0tleTogc3RyaW5nLCBfQ29sb3JQcm92aWRlcjogSUNvbG9yUHJvdmlkZXIpOiB2b2lkIHtcbiAgICBjb25zdCBiYXNlRGlhbG9nRnJhbWVDbGFzcyA9IGAubmd4LWF3ZXNvbWUtcG9wdXAtb3ZlcmxheSAuJHtfS2V5LnRvTG93ZXJDYXNlKCl9LWRpYWxvZ2A7XG4gICAgY29uc3QgYmFzZVN0eWxlID0gYFxuICAgICAgICBib3JkZXItY29sb3I6ICR7X0NvbG9yUHJvdmlkZXIuQnJpZ2h0ZW59IWltcG9ydGFudDtcbiAgICAgICAgYDtcblxuICAgIHRoaXMuZ2V0U2hlZXQoJ25neC1hd2Vzb21lLXBvcHVwLWdsb2Itc3R5bGVzJykuYWRkUnVsZShiYXNlRGlhbG9nRnJhbWVDbGFzcywgYmFzZVN0eWxlKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0VG9hc3RTdHlsZXMoKTogdm9pZCB7XG4gICAgdGhpcy5nZXRTaGVldCgnbmd4LWF3ZXNvbWUtcG9wdXAtc3R5bGVzJykuYWRkUnVsZShgLnRvYXN0LWVudGl0eWAsIGBhbGwgMC41cyBlYXNlO2ApO1xuICAgIHRoaXMuZ2V0U2hlZXQoJ25neC1hd2Vzb21lLXBvcHVwLXN0eWxlcycpLmFkZFJ1bGUoYC50b2FzdC1lbnRpdHk6Zmlyc3QtY2hpbGRgLCBgYW5pbWF0aW9uOiBtb3ZlIDAuN3MgZWFzZS1vdXQ7YCk7XG5cbiAgICBjb25zdCBpc0lFT3JFZGdlID0gL21zaWVcXHN8dHJpZGVudFxcLy9pLnRlc3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgIGlmICghaXNJRU9yRWRnZSkge1xuICAgICAgdGhpcy5nZXRTaGVldCgnbmd4LWF3ZXNvbWUtcG9wdXAtc3R5bGVzJykuYWRkUnVsZShcbiAgICAgICAgYEAtd2Via2l0LWtleWZyYW1lcyBtb3ZlYCxcbiAgICAgICAgYFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDAlIHttYXJnaW4tdG9wOiAtNXB4OyBvcGFjaXR5OiAwLjQ7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDMwJSB7bWFyZ2luLXRvcDogLTRweDsgb3BhY2l0eTogMC43O31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxMDAlIHttYXJnaW4tdG9wOiAwcHg7IG9wYWNpdHk6IDE7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBcbiAgICAgICk7XG4gICAgICB0aGlzLmdldFNoZWV0KCduZ3gtYXdlc29tZS1wb3B1cC1zdHlsZXMnKS5hZGRSdWxlKFxuICAgICAgICBgQGtleWZyYW1lcyBtb3ZlYCxcbiAgICAgICAgYFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDAlIHttYXJnaW4tdG9wOiAtNXB4OyBvcGFjaXR5OiAwLjQ7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDMwJSB7bWFyZ2luLXRvcDogLTRweDsgb3BhY2l0eTogMC43O31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxMDAlIHttYXJnaW4tdG9wOiAwcHg7IG9wYWNpdHk6IDE7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBcbiAgICAgICk7XG4gICAgfVxuICB9XG59XG4iXX0=