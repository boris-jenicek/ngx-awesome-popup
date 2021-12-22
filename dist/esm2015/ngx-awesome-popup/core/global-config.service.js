import { Inject, Injectable } from '@angular/core';
import { ColorVariance } from './enums';
import { ColorProvider, GlobalConfig, GlobalUserConfig } from './global-classes';
import * as i0 from "@angular/core";
export class GlobalConfigService {
    constructor(userGlobalConfig) {
        this.userGlobalConfig = userGlobalConfig;
        this.authorGlobalConfig = new GlobalConfig();
        this.productionGlobalConfig = new GlobalConfig();
        this.userGeneratedConfig = new GlobalUserConfig(userGlobalConfig);
        // region *** author global config values (if there is no user input) ***
        this.authorGlobalConfig.displayColor.primary = null; // new ColorProvider('#ff9e00');
        this.authorGlobalConfig.displayColor.secondary = null; // new ColorProvider('#989ea5');
        this.authorGlobalConfig.displayColor.success = null; // new ColorProvider('#3caea3');
        this.authorGlobalConfig.displayColor.info = null; // new ColorProvider('#2f8ee5');
        this.authorGlobalConfig.displayColor.warning = null; // new ColorProvider('#ffc107');
        this.authorGlobalConfig.displayColor.danger = null; // new ColorProvider('#e46464');
        this.authorGlobalConfig.displayColor.light = null; // new ColorProvider('#f8f9fa');
        this.authorGlobalConfig.displayColor.dark = null; // new ColorProvider('#343a40');
        this.authorGlobalConfig.displayColor.customOne = null; // new ColorProvider('#343a40');
        this.authorGlobalConfig.displayColor.customTwo = null; // new ColorProvider('#343a40');
        this.authorGlobalConfig.displayColor.customThree = null; // new ColorProvider('#343a40');
        this.authorGlobalConfig.displayColor.customFour = null; // new ColorProvider('#343a40');
        this.authorGlobalConfig.displayColor.customFive = null; // new ColorProvider('#343a40');
        // endregion
        this.productionGlobalConfig.displayColor = this.authorGlobalConfig.displayColor;
        // region *** global userConfig (user input app-module) ***
        this.setUserColors(this.userGeneratedConfig.colorList);
        // endregion
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
GlobalConfigService.ɵprov = i0.ɵɵdefineInjectable({ factory: function GlobalConfigService_Factory() { return new GlobalConfigService(i0.ɵɵinject("cdGlobalConfig")); }, token: GlobalConfigService, providedIn: "root" });
GlobalConfigService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
GlobalConfigService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['cdGlobalConfig',] }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLWNvbmZpZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbmd4LWF3ZXNvbWUtcG9wdXAvY29yZS9nbG9iYWwtY29uZmlnLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUN4QyxPQUFPLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtCQUFrQixDQUFDOztBQU1qRixNQUFNLE9BQU8sbUJBQW1CO0lBSzlCLFlBRVUsZ0JBQW1DO1FBQW5DLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBbUI7UUFOckMsdUJBQWtCLEdBQWtCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFL0QsMkJBQXNCLEdBQWtCLElBQUksWUFBWSxFQUFFLENBQUM7UUFNekQsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUVsRSx5RUFBeUU7UUFDekUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLENBQUMsZ0NBQWdDO1FBQ3JGLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxDQUFDLGdDQUFnQztRQUN2RixJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQyxnQ0FBZ0M7UUFDckYsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsZ0NBQWdDO1FBQ2xGLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxDQUFDLGdDQUFnQztRQUNyRixJ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Q0FBQyxRQUFRLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxPQUFPLENBQy9DLGlCQUFpQixFQUNqQjs7Ozt5Q0FJaUMsQ0FDbEMsQ0FBQztTQUNIO0lBQ0gsQ0FBQzs7OztZQXpNRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs0Q0FPSSxNQUFNLFNBQUMsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb2xvclZhcmlhbmNlIH0gZnJvbSAnLi9lbnVtcyc7XG5pbXBvcnQgeyBDb2xvclByb3ZpZGVyLCBHbG9iYWxDb25maWcsIEdsb2JhbFVzZXJDb25maWcgfSBmcm9tICcuL2dsb2JhbC1jbGFzc2VzJztcbmltcG9ydCB7IElDb2xvck9iamVjdCwgSUNvbG9yUHJvdmlkZXIsIElDb2xvclR5cGVzLCBJR2xvYmFsQ29uZmlnLCBJR2xvYmFsVXNlckNvbmZpZyB9IGZyb20gJy4vZ2xvYmFsLWludGVyZmFjZXMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBHbG9iYWxDb25maWdTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBhdXRob3JHbG9iYWxDb25maWc6IElHbG9iYWxDb25maWcgPSBuZXcgR2xvYmFsQ29uZmlnKCk7XG4gIHByaXZhdGUgdXNlckdlbmVyYXRlZENvbmZpZzogSUdsb2JhbFVzZXJDb25maWc7XG4gIHByb2R1Y3Rpb25HbG9iYWxDb25maWc6IElHbG9iYWxDb25maWcgPSBuZXcgR2xvYmFsQ29uZmlnKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdCgnY2RHbG9iYWxDb25maWcnKVxuICAgIHByaXZhdGUgdXNlckdsb2JhbENvbmZpZzogSUdsb2JhbFVzZXJDb25maWdcbiAgKSB7XG4gICAgdGhpcy51c2VyR2VuZXJhdGVkQ29uZmlnID0gbmV3IEdsb2JhbFVzZXJDb25maWcodXNlckdsb2JhbENvbmZpZyk7XG5cbiAgICAvLyByZWdpb24gKioqIGF1dGhvciBnbG9iYWwgY29uZmlnIHZhbHVlcyAoaWYgdGhlcmUgaXMgbm8gdXNlciBpbnB1dCkgKioqXG4gICAgdGhpcy5hdXRob3JHbG9iYWxDb25maWcuZGlzcGxheUNvbG9yLnByaW1hcnkgPSBudWxsOyAvLyBuZXcgQ29sb3JQcm92aWRlcignI2ZmOWUwMCcpO1xuICAgIHRoaXMuYXV0aG9yR2xvYmFsQ29uZmlnLmRpc3BsYXlDb2xvci5zZWNvbmRhcnkgPSBudWxsOyAvLyBuZXcgQ29sb3JQcm92aWRlcignIzk4OWVhNScpO1xuICAgIHRoaXMuYXV0aG9yR2xvYmFsQ29uZmlnLmRpc3BsYXlDb2xvci5zdWNjZXNzID0gbnVsbDsgLy8gbmV3IENvbG9yUHJvdmlkZXIoJyMzY2FlYTMnKTtcbiAgICB0aGlzLmF1dGhvckdsb2JhbENvbmZpZy5kaXNwbGF5Q29sb3IuaW5mbyA9IG51bGw7IC8vIG5ldyBDb2xvclByb3ZpZGVyKCcjMmY4ZWU1Jyk7XG4gICAgdGhpcy5hdXRob3JHbG9iYWxDb25maWcuZGlzcGxheUNvbG9yLndhcm5pbmcgPSBudWxsOyAvLyBuZXcgQ29sb3JQcm92aWRlcignI2ZmYzEwNycpO1xuICAgIHRoaXMuYXV0aG9yR2xvYmFsQ29uZmlnLmRpc3BsYXlDb2xvci5kYW5nZXIgPSBudWxsOyAvLyBuZXcgQ29sb3JQcm92aWRlcignI2U0NjQ2NCcpO1xuICAgIHRoaXMuYXV0aG9yR2xvYmFsQ29uZmlnLmRpc3BsYXlDb2xvci5saWdodCA9IG51bGw7IC8vIG5ldyBDb2xvclByb3ZpZGVyKCcjZjhmOWZhJyk7XG4gICAgdGhpcy5hdXRob3JHbG9iYWxDb25maWcuZGlzcGxheUNvbG9yLmRhcmsgPSBudWxsOyAvLyBuZXcgQ29sb3JQcm92aWRlcignIzM0M2E0MCcpO1xuICAgIHRoaXMuYXV0aG9yR2xvYmFsQ29uZmlnLmRpc3BsYXlDb2xvci5jdXN0b21PbmUgPSBudWxsOyAvLyBuZXcgQ29sb3JQcm92aWRlcignIzM0M2E0MCcpO1xuICAgIHRoaXMuYXV0aG9yR2xvYmFsQ29uZmlnLmRpc3BsYXlDb2xvci5jdXN0b21Ud28gPSBudWxsOyAvLyBuZXcgQ29sb3JQcm92aWRlcignIzM0M2E0MCcpO1xuICAgIHRoaXMuYXV0aG9yR2xvYmFsQ29uZmlnLmRpc3BsYXlDb2xvci5jdXN0b21UaHJlZSA9IG51bGw7IC8vIG5ldyBDb2xvclByb3ZpZGVyKCcjMzQzYTQwJyk7XG4gICAgdGhpcy5hdXRob3JHbG9iYWxDb25maWcuZGlzcGxheUNvbG9yLmN1c3RvbUZvdXIgPSBudWxsOyAvLyBuZXcgQ29sb3JQcm92aWRlcignIzM0M2E0MCcpO1xuICAgIHRoaXMuYXV0aG9yR2xvYmFsQ29uZmlnLmRpc3BsYXlDb2xvci5jdXN0b21GaXZlID0gbnVsbDsgLy8gbmV3IENvbG9yUHJvdmlkZXIoJyMzNDNhNDAnKTtcbiAgICAvLyBlbmRyZWdpb25cblxuICAgIHRoaXMucHJvZHVjdGlvbkdsb2JhbENvbmZpZy5kaXNwbGF5Q29sb3IgPSB0aGlzLmF1dGhvckdsb2JhbENvbmZpZy5kaXNwbGF5Q29sb3I7XG5cbiAgICAvLyByZWdpb24gKioqIGdsb2JhbCB1c2VyQ29uZmlnICh1c2VyIGlucHV0IGFwcC1tb2R1bGUpICoqKlxuICAgIHRoaXMuc2V0VXNlckNvbG9ycyh0aGlzLnVzZXJHZW5lcmF0ZWRDb25maWcuY29sb3JMaXN0KTtcblxuICAgIC8vIGVuZHJlZ2lvblxuXG4gICAgdGhpcy5zZXROb2RlU3R5bGVzKHRoaXMucHJvZHVjdGlvbkdsb2JhbENvbmZpZy5kaXNwbGF5Q29sb3IpO1xuICB9XG5cbiAgcmVzZXRTdHlsZXMoKTogdm9pZCB7XG4gICAgdGhpcy5zZXRVc2VyQ29sb3JzKHRoaXMudXNlckdlbmVyYXRlZENvbmZpZy5jb2xvckxpc3QpO1xuICAgIHRoaXMuc2V0Tm9kZVN0eWxlcyh0aGlzLnByb2R1Y3Rpb25HbG9iYWxDb25maWcuZGlzcGxheUNvbG9yLCB0cnVlKTtcbiAgfVxuXG4gIHNldE5vZGVTdHlsZXMoX1Byb2R1Y3Rpb25Db2xvclR5cGVzOiBJQ29sb3JPYmplY3QsIF9SZXNldDogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XG4gICAgaWYgKF9SZXNldCkge1xuICAgICAgY29uc3QgZXZvbHZlRGlhbG9nU3R5bGVOb2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25neC1hd2Vzb21lLXBvcHVwLWdsb2Itc3R5bGVzJykgYXMgSFRNTFN0eWxlRWxlbWVudDtcbiAgICAgIGlmIChldm9sdmVEaWFsb2dTdHlsZU5vZGUpIHtcbiAgICAgICAgZXZvbHZlRGlhbG9nU3R5bGVOb2RlLnJlbW92ZSgpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnNldFRvYXN0U3R5bGVzKCk7XG5cbiAgICBPYmplY3Qua2V5cyhfUHJvZHVjdGlvbkNvbG9yVHlwZXMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGlmIChfUHJvZHVjdGlvbkNvbG9yVHlwZXNba2V5XSkge1xuICAgICAgICB0aGlzLnNldEJ1dHRvblN0eWxpbmcoa2V5LCBfUHJvZHVjdGlvbkNvbG9yVHlwZXNba2V5XSk7XG4gICAgICAgIHRoaXMuc2V0SWNvblN0eWxpbmcoa2V5LCBfUHJvZHVjdGlvbkNvbG9yVHlwZXNba2V5XSk7XG4gICAgICAgIHRoaXMuc2V0VG9hc3RTdHlsaW5nKGtleSwgX1Byb2R1Y3Rpb25Db2xvclR5cGVzW2tleV0pO1xuICAgICAgICB0aGlzLnNldERpYWxvZ0ZyYW1lKGtleSwgX1Byb2R1Y3Rpb25Db2xvclR5cGVzW2tleV0pO1xuXG4gICAgICAgIGlmIChDb2xvclZhcmlhbmNlW2tleS50b1VwcGVyQ2FzZSgpXSA9PT0gQ29sb3JWYXJpYW5jZS5QUklNQVJZKSB7XG4gICAgICAgICAgdGhpcy5nZXRTaGVldCgnbmd4LWF3ZXNvbWUtcG9wdXAtc3R5bGVzJykuYWRkUnVsZShcbiAgICAgICAgICAgICcubmd4LWF3ZXNvbWUtcG9wdXAtb3ZlcmxheScsXG4gICAgICAgICAgICBgYmFja2dyb3VuZDogICR7X1Byb2R1Y3Rpb25Db2xvclR5cGVzW2tleV0uVHJhbnNwYXJlbnREYXJrZW5WYXJpYW5jZX0haW1wb3J0YW50O2BcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc2V0VXNlckNvbG9ycyhfVXNlckNvbG9yVHlwZXM6IElDb2xvclR5cGVzKTogdm9pZCB7XG4gICAgaWYgKHR5cGVvZiBfVXNlckNvbG9yVHlwZXMgIT09ICdvYmplY3QnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgdXNlcktleXMgPSBPYmplY3Qua2V5cyhfVXNlckNvbG9yVHlwZXMpO1xuICAgIGNvbnN0IHByb2R1Y3Rpb25PYmplY3RLZXlzID0gT2JqZWN0LmtleXModGhpcy5wcm9kdWN0aW9uR2xvYmFsQ29uZmlnLmRpc3BsYXlDb2xvcik7XG5cbiAgICB1c2VyS2V5cy5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBpZiAocHJvZHVjdGlvbk9iamVjdEtleXMuZmluZCh0S2V5ID0+IHRLZXkgPT09IGtleSkpIHtcbiAgICAgICAgaWYgKF9Vc2VyQ29sb3JUeXBlc1trZXldKSB7XG4gICAgICAgICAgY29uc3QgYmFzZUNvbG9yUHJvdmlkZXIgPSBuZXcgQ29sb3JQcm92aWRlcihfVXNlckNvbG9yVHlwZXNba2V5XSk7XG4gICAgICAgICAgaWYgKGJhc2VDb2xvclByb3ZpZGVyLkJhc2UpIHtcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdGlvbkdsb2JhbENvbmZpZy5kaXNwbGF5Q29sb3Jba2V5XSA9IGJhc2VDb2xvclByb3ZpZGVyO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnByb2R1Y3Rpb25HbG9iYWxDb25maWcuZGlzcGxheUNvbG9yW2tleV0gPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0U2hlZXQoX1N0eWxlSUQ6IHN0cmluZyk6IHVuZGVmaW5lZCB8IENTU1N0eWxlU2hlZXQge1xuICAgIC8vIENyZWF0ZSB0aGUgPHN0eWxlPiB0YWdcbiAgICBsZXQgZXZvbHZlRGlhbG9nU3R5bGVOb2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoX1N0eWxlSUQpIGFzIEhUTUxTdHlsZUVsZW1lbnQ7XG4gICAgaWYgKCFldm9sdmVEaWFsb2dTdHlsZU5vZGUpIHtcbiAgICAgIGNvbnN0IGhlYWROb2RlID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xuICAgICAgaWYgKCFoZWFkTm9kZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGV2b2x2ZURpYWxvZ1N0eWxlTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICBldm9sdmVEaWFsb2dTdHlsZU5vZGUuc2V0QXR0cmlidXRlKCdpZCcsIF9TdHlsZUlEKTtcbiAgICAgIGV2b2x2ZURpYWxvZ1N0eWxlTm9kZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJykpO1xuICAgICAgaGVhZE5vZGUuYXBwZW5kQ2hpbGQoZXZvbHZlRGlhbG9nU3R5bGVOb2RlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZXZvbHZlRGlhbG9nU3R5bGVOb2RlID8gZXZvbHZlRGlhbG9nU3R5bGVOb2RlLnNoZWV0IDogbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgc2V0VG9hc3RTdHlsaW5nKF9LZXk6IHN0cmluZywgX0NvbG9yUHJvdmlkZXI6IElDb2xvclByb3ZpZGVyKTogdm9pZCB7XG4gICAgY29uc3Qgc3RhbmRhcmRUb2FzdCA9IGAudG9hc3Qtd3JhcHBlci5zdGFuZGFyZC10b2FzdCAuZXZvbHZlLXRvYXN0LiR7X0tleS50b0xvd2VyQ2FzZSgpfS1kaWFsb2dgO1xuICAgIGNvbnN0IHN0YW5kYXJkVG9hc3RTdHlsZSA9IGBcbiAgICAgICAgYmFja2dyb3VuZDogICR7X0NvbG9yUHJvdmlkZXIuQnJpZ2h0U2hhZGV9IWltcG9ydGFudDtcbiAgICAgICAgYm9yZGVyLWNvbG9yOiAke19Db2xvclByb3ZpZGVyLkJyaWdodGVufSFpbXBvcnRhbnQ7XG4gICAgICAgIGA7XG5cbiAgICBjb25zdCBzaW1wbGVUb2FzdCA9IGAudG9hc3Qtd3JhcHBlci5zaW1wbGUtdG9hc3QgLmV2b2x2ZS10b2FzdC4ke19LZXkudG9Mb3dlckNhc2UoKX0tZGlhbG9nYDtcbiAgICBjb25zdCBzaW1wbGVUb2FzdFN0eWxlID0gYFxuICAgICAgICBiYWNrZ3JvdW5kOiAgJHtfQ29sb3JQcm92aWRlci5CcmlnaHRXYXJtbHl9IWltcG9ydGFudDtcbiAgICAgICAgY29sb3I6ICAke19Db2xvclByb3ZpZGVyLkRhcmtlbn0haW1wb3J0YW50O1xuICAgICAgICBgO1xuXG4gICAgY29uc3QgYmFzZVByb2dyZXNzID0gYC50b2FzdC13cmFwcGVyIC5ldm9sdmUtdG9hc3QuJHtfS2V5LnRvTG93ZXJDYXNlKCl9LWRpYWxvZyAucHJvZ3Jlc3MtYmFyYDtcbiAgICBjb25zdCBiYXNlUHJvZ3Jlc3NTdHlsZSA9IGBcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogICR7X0NvbG9yUHJvdmlkZXIuQnJpZ2h0ZW59IWltcG9ydGFudDtcbiAgICAgICAgYDtcblxuICAgIHRoaXMuZ2V0U2hlZXQoJ25neC1hd2Vzb21lLXBvcHVwLWdsb2Itc3R5bGVzJykuYWRkUnVsZShiYXNlUHJvZ3Jlc3MsIGJhc2VQcm9ncmVzc1N0eWxlKTtcbiAgICB0aGlzLmdldFNoZWV0KCduZ3gtYXdlc29tZS1wb3B1cC1nbG9iLXN0eWxlcycpLmFkZFJ1bGUoc3RhbmRhcmRUb2FzdCwgc3RhbmRhcmRUb2FzdFN0eWxlKTtcbiAgICB0aGlzLmdldFNoZWV0KCduZ3gtYXdlc29tZS1wb3B1cC1nbG9iLXN0eWxlcycpLmFkZFJ1bGUoc2ltcGxlVG9hc3QsIHNpbXBsZVRvYXN0U3R5bGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRCdXR0b25TdHlsaW5nKF9LZXk6IHN0cmluZywgX0NvbG9yUHJvdmlkZXI6IElDb2xvclByb3ZpZGVyKTogdm9pZCB7XG4gICAgY29uc3QgYmFzZUJ1dHRvbkNsYXNzID0gYC5lZC1idG4tJHtfS2V5LnRvTG93ZXJDYXNlKCl9YDtcbiAgICBjb25zdCBiYXNlU3R5bGUgPSBgXG4gICAgICAgIGNvbG9yOiAke19Db2xvclByb3ZpZGVyLkNvbnRyYXN0Q29sb3J9IWltcG9ydGFudDtcbiAgICAgICAgYmFja2dyb3VuZDogICR7X0NvbG9yUHJvdmlkZXIuQmFzZX0haW1wb3J0YW50O1xuICAgICAgICBib3JkZXItY29sb3I6ICR7X0NvbG9yUHJvdmlkZXIuQnJpZ2h0ZW5Gb3JTaGFkZX0haW1wb3J0YW50O1xuICAgICAgICBgO1xuXG4gICAgY29uc3QgaG92ZXJCdXR0b25DbGFzcyA9IGAuZWQtYnRuLSR7X0tleS50b0xvd2VyQ2FzZSgpfTpob3ZlcmA7XG4gICAgY29uc3QgaG92ZXJTdHlsZSA9IGBcbiAgICAgICAgYmFja2dyb3VuZDogICR7XG4gICAgICAgICAgX0NvbG9yUHJvdmlkZXIuSXNCYXNlQnJpZ2h0ID8gX0NvbG9yUHJvdmlkZXIuRGFya2VuRm9yU2hhZGUgOiBfQ29sb3JQcm92aWRlci5CcmlnaHRlbkZvclNoYWRlXG4gICAgICAgIH0haW1wb3J0YW50O1xuICAgICAgICBib3JkZXItY29sb3I6ICR7X0NvbG9yUHJvdmlkZXIuSXNCYXNlQnJpZ2h0ID8gX0NvbG9yUHJvdmlkZXIuRGFya2VuIDogX0NvbG9yUHJvdmlkZXIuQnJpZ2h0ZW59IWltcG9ydGFudDtcbiAgICAgICAgYDtcblxuICAgIGNvbnN0IGZvY3VzQWN0aXZlQnV0dG9uQ2xhc3MgPSBgLmVkLWJ0bi0ke19LZXkudG9Mb3dlckNhc2UoKX06Zm9jdXMsIC5lZC1idG4tJHtfS2V5LnRvTG93ZXJDYXNlKCl9OmFjdGl2ZWA7XG4gICAgY29uc3QgZm9jdXNBY3RpdmVTdHlsZSA9IGBcbiAgICAgICAgYm94LXNoYWRvdzogMCAwIDFweCAycHggJHtcbiAgICAgICAgICBfQ29sb3JQcm92aWRlci5Jc0Jhc2VCcmlnaHQgPyBfQ29sb3JQcm92aWRlci5EYXJrZW4gOiBfQ29sb3JQcm92aWRlci5CcmlnaHRlblxuICAgICAgICB9IWltcG9ydGFudDtcbiAgICAgICAgYDtcblxuICAgIHRoaXMuZ2V0U2hlZXQoJ25neC1hd2Vzb21lLXBvcHVwLWdsb2Itc3R5bGVzJykuYWRkUnVsZShiYXNlQnV0dG9uQ2xhc3MsIGJhc2VTdHlsZSk7XG4gICAgdGhpcy5nZXRTaGVldCgnbmd4LWF3ZXNvbWUtcG9wdXAtZ2xvYi1zdHlsZXMnKS5hZGRSdWxlKGhvdmVyQnV0dG9uQ2xhc3MsIGhvdmVyU3R5bGUpO1xuICAgIHRoaXMuZ2V0U2hlZXQoJ25neC1hd2Vzb21lLXBvcHVwLWdsb2Itc3R5bGVzJykuYWRkUnVsZShmb2N1c0FjdGl2ZUJ1dHRvbkNsYXNzLCBmb2N1c0FjdGl2ZVN0eWxlKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0SWNvblN0eWxpbmcoX0tleTogc3RyaW5nLCBfQ29sb3JQcm92aWRlcjogSUNvbG9yUHJvdmlkZXIpOiB2b2lkIHtcbiAgICBjb25zdCBiYXNlSWNvbkNsYXNzID0gYC5hcC1pY29uLSR7X0tleS50b0xvd2VyQ2FzZSgpfWA7XG4gICAgY29uc3QgYmFzZVN0eWxlID0gYGNvbG9yOiAke19Db2xvclByb3ZpZGVyLkJyaWdodGVuRm9yU2hhZGV9IWltcG9ydGFudDtgO1xuXG4gICAgdGhpcy5nZXRTaGVldCgnbmd4LWF3ZXNvbWUtcG9wdXAtZ2xvYi1zdHlsZXMnKS5hZGRSdWxlKGJhc2VJY29uQ2xhc3MsIGJhc2VTdHlsZSk7XG4gIH1cblxuICBwcml2YXRlIHNldERpYWxvZ0ZyYW1lKF9LZXk6IHN0cmluZywgX0NvbG9yUHJvdmlkZXI6IElDb2xvclByb3ZpZGVyKTogdm9pZCB7XG4gICAgY29uc3QgYmFzZURpYWxvZ0ZyYW1lQ2xhc3MgPSBgLm5neC1hd2Vzb21lLXBvcHVwLW92ZXJsYXkgLiR7X0tleS50b0xvd2VyQ2FzZSgpfS1kaWFsb2dgO1xuICAgIGNvbnN0IGJhc2VTdHlsZSA9IGBcbiAgICAgICAgYm9yZGVyLWNvbG9yOiAke19Db2xvclByb3ZpZGVyLkJyaWdodGVufSFpbXBvcnRhbnQ7XG4gICAgICAgIGA7XG5cbiAgICB0aGlzLmdldFNoZWV0KCduZ3gtYXdlc29tZS1wb3B1cC1nbG9iLXN0eWxlcycpLmFkZFJ1bGUoYmFzZURpYWxvZ0ZyYW1lQ2xhc3MsIGJhc2VTdHlsZSk7XG4gIH1cblxuICBwcml2YXRlIHNldFRvYXN0U3R5bGVzKCk6IHZvaWQge1xuICAgIHRoaXMuZ2V0U2hlZXQoJ25neC1hd2Vzb21lLXBvcHVwLXN0eWxlcycpLmFkZFJ1bGUoYC50b2FzdC1lbnRpdHlgLCBgYWxsIDAuNXMgZWFzZTtgKTtcbiAgICB0aGlzLmdldFNoZWV0KCduZ3gtYXdlc29tZS1wb3B1cC1zdHlsZXMnKS5hZGRSdWxlKGAudG9hc3QtZW50aXR5OmZpcnN0LWNoaWxkYCwgYGFuaW1hdGlvbjogbW92ZSAwLjdzIGVhc2Utb3V0O2ApO1xuXG4gICAgY29uc3QgaXNJRU9yRWRnZSA9IC9tc2llXFxzfHRyaWRlbnRcXC8vaS50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgICBpZiAoIWlzSUVPckVkZ2UpIHtcbiAgICAgIHRoaXMuZ2V0U2hlZXQoJ25neC1hd2Vzb21lLXBvcHVwLXN0eWxlcycpLmFkZFJ1bGUoXG4gICAgICAgIGBALXdlYmtpdC1rZXlmcmFtZXMgbW92ZWAsXG4gICAgICAgIGBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwJSB7bWFyZ2luLXRvcDogLTVweDsgb3BhY2l0eTogMC40O31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAzMCUge21hcmdpbi10b3A6IC00cHg7IG9wYWNpdHk6IDAuNzt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMTAwJSB7bWFyZ2luLXRvcDogMHB4OyBvcGFjaXR5OiAxO31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgXG4gICAgICApO1xuICAgICAgdGhpcy5nZXRTaGVldCgnbmd4LWF3ZXNvbWUtcG9wdXAtc3R5bGVzJykuYWRkUnVsZShcbiAgICAgICAgYEBrZXlmcmFtZXMgbW92ZWAsXG4gICAgICAgIGBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwJSB7bWFyZ2luLXRvcDogLTVweDsgb3BhY2l0eTogMC40O31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAzMCUge21hcmdpbi10b3A6IC00cHg7IG9wYWNpdHk6IDAuNzt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMTAwJSB7bWFyZ2luLXRvcDogMHB4OyBvcGFjaXR5OiAxO31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgXG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuIl19