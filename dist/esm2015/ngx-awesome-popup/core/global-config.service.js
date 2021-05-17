import { Inject, Injectable } from "@angular/core";
import { ColorVariance } from "./enums";
import { GlobalClass } from "./global";
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
            let evolveDialogStyleNode = document.getElementById("ngx-awesome-popup-glob-styles");
            if (evolveDialogStyleNode) {
                evolveDialogStyleNode.remove();
            }
        }
        this.setToastStyles();
        Object.keys(_ProductionColorTypes).forEach((key) => {
            if (_ProductionColorTypes[key]) {
                this.setButtonStyling(key, _ProductionColorTypes[key]);
                this.setIconStyling(key, _ProductionColorTypes[key]);
                this.setToastStyling(key, _ProductionColorTypes[key]);
                this.setDialogFrame(key, _ProductionColorTypes[key]);
                if (ColorVariance[key.toUpperCase()] === ColorVariance.PRIMARY) {
                    this.getSheet("ngx-awesome-popup-styles").addRule(".ngx-awesome-popup-overlay", `background:  ${_ProductionColorTypes[key].TransparentDarkenVariance}!important;`);
                }
            }
        });
    }
    setUserColors(_UserColorTypes) {
        if (typeof _UserColorTypes !== "object") {
            return;
        }
        const userKeys = Object.keys(_UserColorTypes);
        const productionObjectKeys = Object.keys(this.productionGlobalConfig.DisplayColor);
        userKeys.forEach((key) => {
            if (productionObjectKeys.find((tKey) => tKey === key)) {
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
            const headNode = document.head || document.getElementsByTagName("head")[0];
            if (!headNode) {
                return;
            }
            evolveDialogStyleNode = document.createElement("style");
            evolveDialogStyleNode.setAttribute("id", _StyleID);
            evolveDialogStyleNode.appendChild(document.createTextNode(""));
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
        this.getSheet("ngx-awesome-popup-glob-styles").addRule(baseProgress, baseProgressStyle);
        this.getSheet("ngx-awesome-popup-glob-styles").addRule(standardToast, standardToastStyle);
        this.getSheet("ngx-awesome-popup-glob-styles").addRule(simpleToast, simpleToastStyle);
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
        this.getSheet("ngx-awesome-popup-glob-styles").addRule(baseButtonClass, baseStyle);
        this.getSheet("ngx-awesome-popup-glob-styles").addRule(hoverButtonClass, hoverStyle);
        this.getSheet("ngx-awesome-popup-glob-styles").addRule(focusActiveButtonClass, focusActiveStyle);
    }
    setIconStyling(_Key, _ColorProvider) {
        const baseIconClass = `.ap-icon-${_Key.toLowerCase()}`;
        const baseStyle = `color: ${_ColorProvider.BrightenForShade}!important;`;
        this.getSheet("ngx-awesome-popup-glob-styles").addRule(baseIconClass, baseStyle);
    }
    setDialogFrame(_Key, _ColorProvider) {
        const baseDialogFrameClass = `.ngx-awesome-popup-overlay .${_Key.toLowerCase()}-dialog`;
        const baseStyle = `
        border-color: ${_ColorProvider.Brighten}!important;
        `;
        this.getSheet("ngx-awesome-popup-glob-styles").addRule(baseDialogFrameClass, baseStyle);
    }
    setToastStyles() {
        this.getSheet("ngx-awesome-popup-styles").addRule(`.toast-entity`, `all 0.5s ease;`);
        this.getSheet("ngx-awesome-popup-styles").addRule(`.toast-entity:first-child`, `animation: move 0.7s ease-out;`);
        this.getSheet("ngx-awesome-popup-styles").addRule(`@-webkit-keyframes move`, `
                                        0% {margin-top: -5px; opacity: 0.4;}
                                        30% {margin-top: -4px; opacity: 0.7;}
                                        100% {margin-top: 0px; opacity: 1;}
                                        `);
        this.getSheet("ngx-awesome-popup-styles").addRule(`@keyframes move`, `
                                        0% {margin-top: -5px; opacity: 0.4;}
                                        30% {margin-top: -4px; opacity: 0.7;}
                                        100% {margin-top: 0px; opacity: 1;}
                                        `);
    }
}
GlobalConfigService.ɵprov = i0.ɵɵdefineInjectable({ factory: function GlobalConfigService_Factory() { return new GlobalConfigService(i0.ɵɵinject("globalConfig")); }, token: GlobalConfigService, providedIn: "root" });
GlobalConfigService.decorators = [
    { type: Injectable, args: [{
                providedIn: "root",
            },] }
];
GlobalConfigService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ["globalConfig",] }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLWNvbmZpZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbmd4LWF3ZXNvbWUtcG9wdXAvY29yZS9nbG9iYWwtY29uZmlnLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUN4QyxPQUFPLEVBQUUsV0FBVyxFQUFtQixNQUFNLFVBQVUsQ0FBQzs7QUFNeEQsTUFBTSxPQUFPLG1CQUFtQjtJQUs5QixZQUVVLGdCQUFtRDtRQUFuRCxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQW1DO1FBTjdELDJCQUFzQixHQUFrQyxJQUFJLFdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMvRSx1QkFBa0IsR0FBa0MsSUFBSSxXQUFXLENBQUMsWUFBWSxFQUFFLENBQUM7UUFPekYsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksV0FBVyxDQUFDLGdCQUFnQixDQUN6RCxnQkFBZ0IsQ0FDakIsQ0FBQztRQUVGLHlFQUF5RTtRQUN6RSxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQyw0Q0FBNEM7UUFDakcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLENBQUMsNENBQTRDO1FBQ25HLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxDQUFDLDRDQUE0QztRQUNqRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyw0Q0FBNEM7UUFDOUYsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLENBQUMsNENBQTRD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Q0FBQyxJQUFZLEVBQUUsY0FBOEI7UUFDakUsTUFBTSxvQkFBb0IsR0FBRywrQkFBK0IsSUFBSSxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUM7UUFDeEYsTUFBTSxTQUFTLEdBQUc7d0JBQ0UsY0FBYyxDQUFDLFFBQVE7U0FDdEMsQ0FBQztRQUVOLElBQUksQ0FBQyxRQUFRLENBQUMsK0JBQStCLENBQUMsQ0FBQyxPQUFPLENBQ3BELG9CQUFvQixFQUNwQixTQUFTLENBQ1YsQ0FBQztJQUNKLENBQUM7SUFFTyxjQUFjO1FBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxPQUFPLENBQy9DLGVBQWUsRUFDZixnQkFBZ0IsQ0FDakIsQ0FBQztRQUNGLElBQUksQ0FBQyxRQUFRLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxPQUFPLENBQy9DLDJCQUEyQixFQUMzQixnQ0FBZ0MsQ0FDakMsQ0FBQztRQUNGLElBQUksQ0FBQyxRQUFRLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxPQUFPLENBQy9DLHlCQUF5QixFQUN6Qjs7Ozt5Q0FJbUMsQ0FDcEMsQ0FBQztRQUNGLElBQUksQ0FBQyxRQUFRLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxPQUFPLENBQy9DLGlCQUFpQixFQUNqQjs7Ozt5Q0FJbUMsQ0FDcEMsQ0FBQztJQUNKLENBQUM7Ozs7WUFwUEYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7NENBT0ksTUFBTSxTQUFDLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ29sb3JWYXJpYW5jZSB9IGZyb20gXCIuL2VudW1zXCI7XG5pbXBvcnQgeyBHbG9iYWxDbGFzcywgR2xvYmFsSW50ZXJmYWNlIH0gZnJvbSBcIi4vZ2xvYmFsXCI7XG5pbXBvcnQgSUNvbG9yUHJvdmlkZXIgPSBHbG9iYWxJbnRlcmZhY2UuSUNvbG9yUHJvdmlkZXI7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogXCJyb290XCIsXG59KVxuZXhwb3J0IGNsYXNzIEdsb2JhbENvbmZpZ1NlcnZpY2Uge1xuICBwcm9kdWN0aW9uR2xvYmFsQ29uZmlnOiBHbG9iYWxJbnRlcmZhY2UuSUdsb2JhbENvbmZpZyA9IG5ldyBHbG9iYWxDbGFzcy5HbG9iYWxDb25maWcoKTtcbiAgcHJpdmF0ZSBhdXRob3JHbG9iYWxDb25maWc6IEdsb2JhbEludGVyZmFjZS5JR2xvYmFsQ29uZmlnID0gbmV3IEdsb2JhbENsYXNzLkdsb2JhbENvbmZpZygpO1xuICBwcml2YXRlIHVzZXJHZW5lcmF0ZWRDb25maWc6IEdsb2JhbEludGVyZmFjZS5JR2xvYmFsVXNlckNvbmZpZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KFwiZ2xvYmFsQ29uZmlnXCIpXG4gICAgcHJpdmF0ZSB1c2VyR2xvYmFsQ29uZmlnOiBHbG9iYWxJbnRlcmZhY2UuSUdsb2JhbFVzZXJDb25maWdcbiAgKSB7XG4gICAgdGhpcy51c2VyR2VuZXJhdGVkQ29uZmlnID0gbmV3IEdsb2JhbENsYXNzLkdsb2JhbFVzZXJDb25maWcoXG4gICAgICB1c2VyR2xvYmFsQ29uZmlnXG4gICAgKTtcblxuICAgIC8vIHJlZ2lvbiAqKiogYXV0aG9yIGdsb2JhbCBjb25maWcgdmFsdWVzIChpZiB0aGVyZSBpcyBubyB1c2VyIGlucHV0KSAqKipcbiAgICB0aGlzLmF1dGhvckdsb2JhbENvbmZpZy5EaXNwbGF5Q29sb3IuUHJpbWFyeSA9IG51bGw7IC8vIG5ldyBHbG9iYWxDbGFzcy5Db2xvclByb3ZpZGVyKCcjZmY5ZTAwJyk7XG4gICAgdGhpcy5hdXRob3JHbG9iYWxDb25maWcuRGlzcGxheUNvbG9yLlNlY29uZGFyeSA9IG51bGw7IC8vIG5ldyBHbG9iYWxDbGFzcy5Db2xvclByb3ZpZGVyKCcjOTg5ZWE1Jyk7XG4gICAgdGhpcy5hdXRob3JHbG9iYWxDb25maWcuRGlzcGxheUNvbG9yLlN1Y2Nlc3MgPSBudWxsOyAvLyBuZXcgR2xvYmFsQ2xhc3MuQ29sb3JQcm92aWRlcignIzNjYWVhMycpO1xuICAgIHRoaXMuYXV0aG9yR2xvYmFsQ29uZmlnLkRpc3BsYXlDb2xvci5JbmZvID0gbnVsbDsgLy8gbmV3IEdsb2JhbENsYXNzLkNvbG9yUHJvdmlkZXIoJyMyZjhlZTUnKTtcbiAgICB0aGlzLmF1dGhvckdsb2JhbENvbmZpZy5EaXNwbGF5Q29sb3IuV2FybmluZyA9IG51bGw7IC8vIG5ldyBHbG9iYWxDbGFzcy5Db2xvclByb3ZpZGVyKCcjZmZjMTA3Jyk7XG4gICAgdGhpcy5hdXRob3JHbG9iYWxDb25maWcuRGlzcGxheUNvbG9yLkRhbmdlciA9IG51bGw7IC8vIG5ldyBHbG9iYWxDbGFzcy5Db2xvclByb3ZpZGVyKCcjZTQ2NDY0Jyk7XG4gICAgdGhpcy5hdXRob3JHbG9iYWxDb25maWcuRGlzcGxheUNvbG9yLkxpZ2h0ID0gbnVsbDsgLy8gbmV3IEdsb2JhbENsYXNzLkNvbG9yUHJvdmlkZXIoJyNmOGY5ZmEnKTtcbiAgICB0aGlzLmF1dGhvckdsb2JhbENvbmZpZy5EaXNwbGF5Q29sb3IuRGFyayA9IG51bGw7IC8vIG5ldyBHbG9iYWxDbGFzcy5Db2xvclByb3ZpZGVyKCcjMzQzYTQwJyk7XG4gICAgLy8gZW5kcmVnaW9uXG5cbiAgICB0aGlzLnByb2R1Y3Rpb25HbG9iYWxDb25maWcuRGlzcGxheUNvbG9yID0gdGhpcy5hdXRob3JHbG9iYWxDb25maWcuRGlzcGxheUNvbG9yO1xuXG4gICAgLy8gcmVnaW9uICoqKiBnbG9iYWwgdXNlckNvbmZpZyAodXNlciBpbnB1dCBhcHAtbW9kdWxlKSAqKipcbiAgICB0aGlzLnNldFVzZXJDb2xvcnModGhpcy51c2VyR2VuZXJhdGVkQ29uZmlnLkNvbG9yTGlzdCk7XG5cbiAgICAvLyBlbmRyZWdpb25cblxuICAgIHRoaXMuc2V0Tm9kZVN0eWxlcyh0aGlzLnByb2R1Y3Rpb25HbG9iYWxDb25maWcuRGlzcGxheUNvbG9yKTtcbiAgfVxuXG4gIHJlc2V0U3R5bGVzKCk6IHZvaWQge1xuICAgIHRoaXMuc2V0VXNlckNvbG9ycyh0aGlzLnVzZXJHZW5lcmF0ZWRDb25maWcuQ29sb3JMaXN0KTtcbiAgICB0aGlzLnNldE5vZGVTdHlsZXModGhpcy5wcm9kdWN0aW9uR2xvYmFsQ29uZmlnLkRpc3BsYXlDb2xvciwgdHJ1ZSk7XG4gIH1cblxuICBzZXROb2RlU3R5bGVzKFxuICAgIF9Qcm9kdWN0aW9uQ29sb3JUeXBlczogR2xvYmFsSW50ZXJmYWNlLklDb2xvck9iamVjdCxcbiAgICBfUmVzZXQ6IGJvb2xlYW4gPSBmYWxzZVxuICApIHtcbiAgICBpZiAoX1Jlc2V0KSB7XG4gICAgICBsZXQgZXZvbHZlRGlhbG9nU3R5bGVOb2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgICAgIFwibmd4LWF3ZXNvbWUtcG9wdXAtZ2xvYi1zdHlsZXNcIlxuICAgICAgKSBhcyBIVE1MU3R5bGVFbGVtZW50O1xuICAgICAgaWYgKGV2b2x2ZURpYWxvZ1N0eWxlTm9kZSkge1xuICAgICAgICBldm9sdmVEaWFsb2dTdHlsZU5vZGUucmVtb3ZlKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuc2V0VG9hc3RTdHlsZXMoKTtcblxuICAgIE9iamVjdC5rZXlzKF9Qcm9kdWN0aW9uQ29sb3JUeXBlcykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBpZiAoX1Byb2R1Y3Rpb25Db2xvclR5cGVzW2tleV0pIHtcbiAgICAgICAgdGhpcy5zZXRCdXR0b25TdHlsaW5nKGtleSwgX1Byb2R1Y3Rpb25Db2xvclR5cGVzW2tleV0pO1xuICAgICAgICB0aGlzLnNldEljb25TdHlsaW5nKGtleSwgX1Byb2R1Y3Rpb25Db2xvclR5cGVzW2tleV0pO1xuICAgICAgICB0aGlzLnNldFRvYXN0U3R5bGluZyhrZXksIF9Qcm9kdWN0aW9uQ29sb3JUeXBlc1trZXldKTtcbiAgICAgICAgdGhpcy5zZXREaWFsb2dGcmFtZShrZXksIF9Qcm9kdWN0aW9uQ29sb3JUeXBlc1trZXldKTtcblxuICAgICAgICBpZiAoQ29sb3JWYXJpYW5jZVtrZXkudG9VcHBlckNhc2UoKV0gPT09IENvbG9yVmFyaWFuY2UuUFJJTUFSWSkge1xuICAgICAgICAgIHRoaXMuZ2V0U2hlZXQoXCJuZ3gtYXdlc29tZS1wb3B1cC1zdHlsZXNcIikuYWRkUnVsZShcbiAgICAgICAgICAgIFwiLm5neC1hd2Vzb21lLXBvcHVwLW92ZXJsYXlcIixcbiAgICAgICAgICAgIGBiYWNrZ3JvdW5kOiAgJHtfUHJvZHVjdGlvbkNvbG9yVHlwZXNba2V5XS5UcmFuc3BhcmVudERhcmtlblZhcmlhbmNlfSFpbXBvcnRhbnQ7YFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRVc2VyQ29sb3JzKF9Vc2VyQ29sb3JUeXBlczogR2xvYmFsSW50ZXJmYWNlLklDb2xvclR5cGVzKTogdm9pZCB7XG4gICAgaWYgKHR5cGVvZiBfVXNlckNvbG9yVHlwZXMgIT09IFwib2JqZWN0XCIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB1c2VyS2V5cyA9IE9iamVjdC5rZXlzKF9Vc2VyQ29sb3JUeXBlcyk7XG4gICAgY29uc3QgcHJvZHVjdGlvbk9iamVjdEtleXMgPSBPYmplY3Qua2V5cyhcbiAgICAgIHRoaXMucHJvZHVjdGlvbkdsb2JhbENvbmZpZy5EaXNwbGF5Q29sb3JcbiAgICApO1xuXG4gICAgdXNlcktleXMuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBpZiAocHJvZHVjdGlvbk9iamVjdEtleXMuZmluZCgodEtleSkgPT4gdEtleSA9PT0ga2V5KSkge1xuICAgICAgICBpZiAoX1VzZXJDb2xvclR5cGVzW2tleV0pIHtcbiAgICAgICAgICBjb25zdCBiYXNlQ29sb3JQcm92aWRlciA9IG5ldyBHbG9iYWxDbGFzcy5Db2xvclByb3ZpZGVyKFxuICAgICAgICAgICAgX1VzZXJDb2xvclR5cGVzW2tleV1cbiAgICAgICAgICApO1xuICAgICAgICAgIGlmIChiYXNlQ29sb3JQcm92aWRlci5CYXNlKSB7XG4gICAgICAgICAgICB0aGlzLnByb2R1Y3Rpb25HbG9iYWxDb25maWcuRGlzcGxheUNvbG9yW2tleV0gPSBiYXNlQ29sb3JQcm92aWRlcjtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5wcm9kdWN0aW9uR2xvYmFsQ29uZmlnLkRpc3BsYXlDb2xvcltrZXldID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGdldFNoZWV0KF9TdHlsZUlEOiBzdHJpbmcpIHtcbiAgICAvLyBDcmVhdGUgdGhlIDxzdHlsZT4gdGFnXG4gICAgbGV0IGV2b2x2ZURpYWxvZ1N0eWxlTm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgICAgX1N0eWxlSURcbiAgICApIGFzIEhUTUxTdHlsZUVsZW1lbnQ7XG4gICAgaWYgKCFldm9sdmVEaWFsb2dTdHlsZU5vZGUpIHtcbiAgICAgIGNvbnN0IGhlYWROb2RlID1cbiAgICAgICAgZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XG4gICAgICBpZiAoIWhlYWROb2RlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgZXZvbHZlRGlhbG9nU3R5bGVOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICAgICAgZXZvbHZlRGlhbG9nU3R5bGVOb2RlLnNldEF0dHJpYnV0ZShcImlkXCIsIF9TdHlsZUlEKTtcbiAgICAgIGV2b2x2ZURpYWxvZ1N0eWxlTm9kZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIlwiKSk7XG4gICAgICBoZWFkTm9kZS5hcHBlbmRDaGlsZChldm9sdmVEaWFsb2dTdHlsZU5vZGUpO1xuICAgIH1cblxuICAgIHJldHVybiBldm9sdmVEaWFsb2dTdHlsZU5vZGUgPyBldm9sdmVEaWFsb2dTdHlsZU5vZGUuc2hlZXQgOiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRUb2FzdFN0eWxpbmcoX0tleTogc3RyaW5nLCBfQ29sb3JQcm92aWRlcjogSUNvbG9yUHJvdmlkZXIpIHtcbiAgICBjb25zdCBzdGFuZGFyZFRvYXN0ID0gYC50b2FzdC13cmFwcGVyLnN0YW5kYXJkLXRvYXN0IC5ldm9sdmUtdG9hc3QuJHtfS2V5LnRvTG93ZXJDYXNlKCl9LWRpYWxvZ2A7XG4gICAgY29uc3Qgc3RhbmRhcmRUb2FzdFN0eWxlID0gYFxuICAgICAgICBiYWNrZ3JvdW5kOiAgJHtfQ29sb3JQcm92aWRlci5CcmlnaHRTaGFkZX0haW1wb3J0YW50O1xuICAgICAgICBib3JkZXItY29sb3I6ICR7X0NvbG9yUHJvdmlkZXIuQnJpZ2h0ZW59IWltcG9ydGFudDtcbiAgICAgICAgYDtcblxuICAgIGNvbnN0IHNpbXBsZVRvYXN0ID0gYC50b2FzdC13cmFwcGVyLnNpbXBsZS10b2FzdCAuZXZvbHZlLXRvYXN0LiR7X0tleS50b0xvd2VyQ2FzZSgpfS1kaWFsb2dgO1xuICAgIGNvbnN0IHNpbXBsZVRvYXN0U3R5bGUgPSBgXG4gICAgICAgIGJhY2tncm91bmQ6ICAke19Db2xvclByb3ZpZGVyLkJyaWdodFdhcm1seX0haW1wb3J0YW50O1xuICAgICAgICBjb2xvcjogICR7X0NvbG9yUHJvdmlkZXIuRGFya2VufSFpbXBvcnRhbnQ7XG4gICAgICAgIGA7XG5cbiAgICBjb25zdCBiYXNlUHJvZ3Jlc3MgPSBgLnRvYXN0LXdyYXBwZXIgLmV2b2x2ZS10b2FzdC4ke19LZXkudG9Mb3dlckNhc2UoKX0tZGlhbG9nIC5wcm9ncmVzcy1iYXJgO1xuICAgIGNvbnN0IGJhc2VQcm9ncmVzc1N0eWxlID0gYFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAgJHtfQ29sb3JQcm92aWRlci5CcmlnaHRlbn0haW1wb3J0YW50O1xuICAgICAgICBgO1xuXG4gICAgdGhpcy5nZXRTaGVldChcIm5neC1hd2Vzb21lLXBvcHVwLWdsb2Itc3R5bGVzXCIpLmFkZFJ1bGUoXG4gICAgICBiYXNlUHJvZ3Jlc3MsXG4gICAgICBiYXNlUHJvZ3Jlc3NTdHlsZVxuICAgICk7XG4gICAgdGhpcy5nZXRTaGVldChcIm5neC1hd2Vzb21lLXBvcHVwLWdsb2Itc3R5bGVzXCIpLmFkZFJ1bGUoXG4gICAgICBzdGFuZGFyZFRvYXN0LFxuICAgICAgc3RhbmRhcmRUb2FzdFN0eWxlXG4gICAgKTtcbiAgICB0aGlzLmdldFNoZWV0KFwibmd4LWF3ZXNvbWUtcG9wdXAtZ2xvYi1zdHlsZXNcIikuYWRkUnVsZShcbiAgICAgIHNpbXBsZVRvYXN0LFxuICAgICAgc2ltcGxlVG9hc3RTdHlsZVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIHNldEJ1dHRvblN0eWxpbmcoX0tleTogc3RyaW5nLCBfQ29sb3JQcm92aWRlcjogSUNvbG9yUHJvdmlkZXIpIHtcbiAgICBjb25zdCBiYXNlQnV0dG9uQ2xhc3MgPSBgLmVkLWJ0bi0ke19LZXkudG9Mb3dlckNhc2UoKX1gO1xuICAgIGNvbnN0IGJhc2VTdHlsZSA9IGBcbiAgICAgICAgY29sb3I6ICR7X0NvbG9yUHJvdmlkZXIuQ29udHJhc3RDb2xvcn0haW1wb3J0YW50O1xuICAgICAgICBiYWNrZ3JvdW5kOiAgJHtfQ29sb3JQcm92aWRlci5CYXNlfSFpbXBvcnRhbnQ7XG4gICAgICAgIGJvcmRlci1jb2xvcjogJHtfQ29sb3JQcm92aWRlci5CcmlnaHRlbkZvclNoYWRlfSFpbXBvcnRhbnQ7XG4gICAgICAgIGA7XG5cbiAgICBjb25zdCBob3ZlckJ1dHRvbkNsYXNzID0gYC5lZC1idG4tJHtfS2V5LnRvTG93ZXJDYXNlKCl9OmhvdmVyYDtcbiAgICBjb25zdCBob3ZlclN0eWxlID0gYFxuICAgICAgICBiYWNrZ3JvdW5kOiAgJHtcbiAgICAgICAgICBfQ29sb3JQcm92aWRlci5Jc0Jhc2VCcmlnaHRcbiAgICAgICAgICAgID8gX0NvbG9yUHJvdmlkZXIuRGFya2VuRm9yU2hhZGVcbiAgICAgICAgICAgIDogX0NvbG9yUHJvdmlkZXIuQnJpZ2h0ZW5Gb3JTaGFkZVxuICAgICAgICB9IWltcG9ydGFudDtcbiAgICAgICAgYm9yZGVyLWNvbG9yOiAke1xuICAgICAgICAgIF9Db2xvclByb3ZpZGVyLklzQmFzZUJyaWdodFxuICAgICAgICAgICAgPyBfQ29sb3JQcm92aWRlci5EYXJrZW5cbiAgICAgICAgICAgIDogX0NvbG9yUHJvdmlkZXIuQnJpZ2h0ZW5cbiAgICAgICAgfSFpbXBvcnRhbnQ7XG4gICAgICAgIGA7XG5cbiAgICBjb25zdCBmb2N1c0FjdGl2ZUJ1dHRvbkNsYXNzID0gYC5lZC1idG4tJHtfS2V5LnRvTG93ZXJDYXNlKCl9OmZvY3VzLCAuZWQtYnRuLSR7X0tleS50b0xvd2VyQ2FzZSgpfTphY3RpdmVgO1xuICAgIGNvbnN0IGZvY3VzQWN0aXZlU3R5bGUgPSBgXG4gICAgICAgIGJveC1zaGFkb3c6IDAgMCAxcHggMnB4ICR7XG4gICAgICAgICAgX0NvbG9yUHJvdmlkZXIuSXNCYXNlQnJpZ2h0XG4gICAgICAgICAgICA/IF9Db2xvclByb3ZpZGVyLkRhcmtlblxuICAgICAgICAgICAgOiBfQ29sb3JQcm92aWRlci5CcmlnaHRlblxuICAgICAgICB9IWltcG9ydGFudDtcbiAgICAgICAgYDtcblxuICAgIHRoaXMuZ2V0U2hlZXQoXCJuZ3gtYXdlc29tZS1wb3B1cC1nbG9iLXN0eWxlc1wiKS5hZGRSdWxlKFxuICAgICAgYmFzZUJ1dHRvbkNsYXNzLFxuICAgICAgYmFzZVN0eWxlXG4gICAgKTtcbiAgICB0aGlzLmdldFNoZWV0KFwibmd4LWF3ZXNvbWUtcG9wdXAtZ2xvYi1zdHlsZXNcIikuYWRkUnVsZShcbiAgICAgIGhvdmVyQnV0dG9uQ2xhc3MsXG4gICAgICBob3ZlclN0eWxlXG4gICAgKTtcbiAgICB0aGlzLmdldFNoZWV0KFwibmd4LWF3ZXNvbWUtcG9wdXAtZ2xvYi1zdHlsZXNcIikuYWRkUnVsZShcbiAgICAgIGZvY3VzQWN0aXZlQnV0dG9uQ2xhc3MsXG4gICAgICBmb2N1c0FjdGl2ZVN0eWxlXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0SWNvblN0eWxpbmcoX0tleTogc3RyaW5nLCBfQ29sb3JQcm92aWRlcjogSUNvbG9yUHJvdmlkZXIpIHtcbiAgICBjb25zdCBiYXNlSWNvbkNsYXNzID0gYC5hcC1pY29uLSR7X0tleS50b0xvd2VyQ2FzZSgpfWA7XG4gICAgY29uc3QgYmFzZVN0eWxlID0gYGNvbG9yOiAke19Db2xvclByb3ZpZGVyLkJyaWdodGVuRm9yU2hhZGV9IWltcG9ydGFudDtgO1xuXG4gICAgdGhpcy5nZXRTaGVldChcIm5neC1hd2Vzb21lLXBvcHVwLWdsb2Itc3R5bGVzXCIpLmFkZFJ1bGUoXG4gICAgICBiYXNlSWNvbkNsYXNzLFxuICAgICAgYmFzZVN0eWxlXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0RGlhbG9nRnJhbWUoX0tleTogc3RyaW5nLCBfQ29sb3JQcm92aWRlcjogSUNvbG9yUHJvdmlkZXIpIHtcbiAgICBjb25zdCBiYXNlRGlhbG9nRnJhbWVDbGFzcyA9IGAubmd4LWF3ZXNvbWUtcG9wdXAtb3ZlcmxheSAuJHtfS2V5LnRvTG93ZXJDYXNlKCl9LWRpYWxvZ2A7XG4gICAgY29uc3QgYmFzZVN0eWxlID0gYFxuICAgICAgICBib3JkZXItY29sb3I6ICR7X0NvbG9yUHJvdmlkZXIuQnJpZ2h0ZW59IWltcG9ydGFudDtcbiAgICAgICAgYDtcblxuICAgIHRoaXMuZ2V0U2hlZXQoXCJuZ3gtYXdlc29tZS1wb3B1cC1nbG9iLXN0eWxlc1wiKS5hZGRSdWxlKFxuICAgICAgYmFzZURpYWxvZ0ZyYW1lQ2xhc3MsXG4gICAgICBiYXNlU3R5bGVcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRUb2FzdFN0eWxlcygpIHtcbiAgICB0aGlzLmdldFNoZWV0KFwibmd4LWF3ZXNvbWUtcG9wdXAtc3R5bGVzXCIpLmFkZFJ1bGUoXG4gICAgICBgLnRvYXN0LWVudGl0eWAsXG4gICAgICBgYWxsIDAuNXMgZWFzZTtgXG4gICAgKTtcbiAgICB0aGlzLmdldFNoZWV0KFwibmd4LWF3ZXNvbWUtcG9wdXAtc3R5bGVzXCIpLmFkZFJ1bGUoXG4gICAgICBgLnRvYXN0LWVudGl0eTpmaXJzdC1jaGlsZGAsXG4gICAgICBgYW5pbWF0aW9uOiBtb3ZlIDAuN3MgZWFzZS1vdXQ7YFxuICAgICk7XG4gICAgdGhpcy5nZXRTaGVldChcIm5neC1hd2Vzb21lLXBvcHVwLXN0eWxlc1wiKS5hZGRSdWxlKFxuICAgICAgYEAtd2Via2l0LWtleWZyYW1lcyBtb3ZlYCxcbiAgICAgIGBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwJSB7bWFyZ2luLXRvcDogLTVweDsgb3BhY2l0eTogMC40O31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAzMCUge21hcmdpbi10b3A6IC00cHg7IG9wYWNpdHk6IDAuNzt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMTAwJSB7bWFyZ2luLXRvcDogMHB4OyBvcGFjaXR5OiAxO31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgXG4gICAgKTtcbiAgICB0aGlzLmdldFNoZWV0KFwibmd4LWF3ZXNvbWUtcG9wdXAtc3R5bGVzXCIpLmFkZFJ1bGUoXG4gICAgICBgQGtleWZyYW1lcyBtb3ZlYCxcbiAgICAgIGBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwJSB7bWFyZ2luLXRvcDogLTVweDsgb3BhY2l0eTogMC40O31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAzMCUge21hcmdpbi10b3A6IC00cHg7IG9wYWNpdHk6IDAuNzt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMTAwJSB7bWFyZ2luLXRvcDogMHB4OyBvcGFjaXR5OiAxO31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgXG4gICAgKTtcbiAgfVxufVxuIl19