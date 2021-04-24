import * as i0 from '@angular/core';
import {Inject, Injectable} from '@angular/core';
import {GlobalClass} from './global';
import {ColorVariance} from './enums';

export class GlobalConfigService {
    constructor(userGlobalConfig) {
        this.userGlobalConfig                          = userGlobalConfig;
        this.productionGlobalConfig                    = new GlobalClass.GlobalConfig();
        this.authorGlobalConfig                        = new GlobalClass.GlobalConfig();
        userGlobalConfig                               = new GlobalClass.GlobalUserConfig(userGlobalConfig);
        // region *** author global config values (if there is no user input) ***
        this.authorGlobalConfig.DisplayColor.Primary   = null; // new GlobalClass.ColorProvider('#ff9e00');
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
        const baseStyle     = `
        color: ${_ColorProvider.BrightenForShade}!important;`;
        this.getSheet().addRule(baseIconClass, baseStyle);
    }

    setDialogFrame(_Key, _ColorProvider) {
        const baseDialogFrameClass = `.ngx-awesome-popup-overlay .${_Key.toLowerCase()}-dialog`;
        const baseStyle            = `
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

GlobalConfigService.ɵprov          = i0.ɵɵdefineInjectable({
    factory: function GlobalConfigService_Factory() { return new GlobalConfigService(i0.ɵɵinject("globalConfig")); },
    token: GlobalConfigService,
    providedIn: "root"
});
GlobalConfigService.decorators     = [
    {
        type: Injectable, args: [{
            providedIn: 'root'
        },]
    }
];
GlobalConfigService.ctorParameters = () => [
    {type: undefined, decorators: [{type: Inject, args: ['globalConfig',]}]}
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLWNvbmZpZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbmd4LWF3ZXNvbWUtcG9wdXAvY29yZS9nbG9iYWwtY29uZmlnLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFDLFdBQVcsRUFBa0IsTUFBTSxVQUFVLENBQUM7QUFDdEQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLFNBQVMsQ0FBQzs7QUFPdEMsTUFBTSxPQUFPLG1CQUFtQjtJQUs1QixZQUE0QyxnQkFBbUQ7UUFBbkQscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFtQztRQUgvRiwyQkFBc0IsR0FBc0MsSUFBSSxXQUFXLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDbkYsdUJBQWtCLEdBQWtDLElBQUksV0FBVyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBR3ZGLGdCQUFnQixHQUFHLElBQUksV0FBVyxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFFdEUseUVBQXlFO1FBQ3pFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsT0FBTyxHQUFLLElBQUksQ0FBQyxDQUFDLDRDQUE0QztRQUNuRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsQ0FBQyw0Q0FBNEM7UUFDbkcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxPQUFPLEdBQUssSUFBSSxDQUFDLENBQUMsNENBQTRDO1FBQ25HLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsSUFBSSxHQUFRLElBQUksQ0FBQyxDQUFDLDRDQUE0QztRQUNuRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLE9BQU8sR0FBSyxJQUFJLENBQUMsQ0FBQyw0Q0FBNEM7UUFDbkcsSUFB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VUFBVSxFQUFFLE1BQU07YUFDckI7Ozs0Q0FNZ0IsTUFBTSxTQUFDLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0dsb2JhbENsYXNzLCBHbG9iYWxJbnRlcmZhY2V9IGZyb20gJy4vZ2xvYmFsJztcbmltcG9ydCB7Q29sb3JWYXJpYW5jZX0gZnJvbSAnLi9lbnVtcyc7XG5pbXBvcnQgSUNvbG9yUHJvdmlkZXIgPSBHbG9iYWxJbnRlcmZhY2UuSUNvbG9yUHJvdmlkZXI7XG5pbXBvcnQge0NvbmZpcm1Cb3hDbGFzc30gZnJvbSAnLi4vdHlwZXMvY29uZmlybS1ib3gvY29yZS9tb2RlbCc7XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgR2xvYmFsQ29uZmlnU2VydmljZSB7XG4gICAgXG4gICAgcHJvZHVjdGlvbkdsb2JhbENvbmZpZzogR2xvYmFsSW50ZXJmYWNlLklHbG9iYWxDb25maWcgICAgID0gbmV3IEdsb2JhbENsYXNzLkdsb2JhbENvbmZpZygpO1xuICAgIHByaXZhdGUgYXV0aG9yR2xvYmFsQ29uZmlnOiBHbG9iYWxJbnRlcmZhY2UuSUdsb2JhbENvbmZpZyA9IG5ldyBHbG9iYWxDbGFzcy5HbG9iYWxDb25maWcoKTtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KCdnbG9iYWxDb25maWcnKSBwcml2YXRlIHVzZXJHbG9iYWxDb25maWc6IEdsb2JhbEludGVyZmFjZS5JR2xvYmFsVXNlckNvbmZpZykge1xuICAgICAgICB1c2VyR2xvYmFsQ29uZmlnID0gbmV3IEdsb2JhbENsYXNzLkdsb2JhbFVzZXJDb25maWcodXNlckdsb2JhbENvbmZpZyk7XG5cbiAgICAgICAgLy8gcmVnaW9uICoqKiBhdXRob3IgZ2xvYmFsIGNvbmZpZyB2YWx1ZXMgKGlmIHRoZXJlIGlzIG5vIHVzZXIgaW5wdXQpICoqKlxuICAgICAgICB0aGlzLmF1dGhvckdsb2JhbENvbmZpZy5EaXNwbGF5Q29sb3IuUHJpbWFyeSAgID0gbnVsbDsgLy8gbmV3IEdsb2JhbENsYXNzLkNvbG9yUHJvdmlkZXIoJyNmZjllMDAnKTtcbiAgICAgICAgdGhpcy5hdXRob3JHbG9iYWxDb25maWcuRGlzcGxheUNvbG9yLlNlY29uZGFyeSA9IG51bGw7IC8vIG5ldyBHbG9iYWxDbGFzcy5Db2xvclByb3ZpZGVyKCcjOTg5ZWE1Jyk7XG4gICAgICAgIHRoaXMuYXV0aG9yR2xvYmFsQ29uZmlnLkRpc3BsYXlDb2xvci5TdWNjZXNzICAgPSBudWxsOyAvLyBuZXcgR2xvYmFsQ2xhc3MuQ29sb3JQcm92aWRlcignIzNjYWVhMycpO1xuICAgICAgICB0aGlzLmF1dGhvckdsb2JhbENvbmZpZy5EaXNwbGF5Q29sb3IuSW5mbyAgICAgID0gbnVsbDsgLy8gbmV3IEdsb2JhbENsYXNzLkNvbG9yUHJvdmlkZXIoJyMyZjhlZTUnKTtcbiAgICAgICAgdGhpcy5hdXRob3JHbG9iYWxDb25maWcuRGlzcGxheUNvbG9yLldhcm5pbmcgICA9IG51bGw7IC8vIG5ldyBHbG9iYWxDbGFzcy5Db2xvclByb3ZpZGVyKCcjZmZjMTA3Jyk7XG4gICAgICAgIHRoaXMuYXV0aG9yR2xvYmFsQ29uZmlnLkRpc3BsYXlDb2xvci5EYW5nZXIgICAgPSBudWxsOyAvLyBuZXcgR2xvYmFsQ2xhc3MuQ29sb3JQcm92aWRlcignI2U0NjQ2NCcpO1xuICAgICAgICB0aGlzLmF1dGhvckdsb2JhbENvbmZpZy5EaXNwbGF5Q29sb3IuTGlnaHQgICAgID0gbnVsbDsgLy8gbmV3IEdsb2JhbENsYXNzLkNvbG9yUHJvdmlkZXIoJyNmOGY5ZmEnKTtcbiAgICAgICAgdGhpcy5hdXRob3JHbG9iYWxDb25maWcuRGlzcGxheUNvbG9yLkRhcmsgICAgICA9IG51bGw7IC8vIG5ldyBHbG9iYWxDbGFzcy5Db2xvclByb3ZpZGVyKCcjMzQzYTQwJyk7XG4gICAgICAgIC8vIGVuZHJlZ2lvblxuICAgICAgICBcbiAgICAgICAgdGhpcy5wcm9kdWN0aW9uR2xvYmFsQ29uZmlnLkRpc3BsYXlDb2xvciA9IHRoaXMuYXV0aG9yR2xvYmFsQ29uZmlnLkRpc3BsYXlDb2xvcjtcbiAgICAgICAgXG4gICAgICAgIC8vIHJlZ2lvbiAqKiogZ2xvYmFsIHVzZXJDb25maWcgKHVzZXIgaW5wdXQgYXBwLW1vZHVsZSkgKioqXG4gICAgICAgIHRoaXMuc2V0VXNlckNvbG9ycyh1c2VyR2xvYmFsQ29uZmlnLkNvbG9yTGlzdCk7XG4gICAgICAgIFxuICAgICAgICAvLyBlbmRyZWdpb25cbiAgICAgICAgXG4gICAgICAgIHRoaXMuc2V0VG9hc3ROb2RlKCk7XG4gICAgICAgIHRoaXMuc2V0Tm9kZVN0eWxlcyh0aGlzLnByb2R1Y3Rpb25HbG9iYWxDb25maWcuRGlzcGxheUNvbG9yKTtcbiAgICAgICAgXG4gICAgfVxuICAgIFxuICAgIHByaXZhdGUgc2V0Tm9kZVN0eWxlcyhfUHJvZHVjdGlvbkNvbG9yVHlwZXM6IEdsb2JhbEludGVyZmFjZS5JQ29sb3JPYmplY3QpIHtcbiAgICAgICAgXG4gICAgICAgIE9iamVjdC5rZXlzKF9Qcm9kdWN0aW9uQ29sb3JUeXBlcykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgaWYgKF9Qcm9kdWN0aW9uQ29sb3JUeXBlc1trZXldKSB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRCdXR0b25TdHlsaW5nKGtleSwgX1Byb2R1Y3Rpb25Db2xvclR5cGVzW2tleV0pO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0SWNvblN0eWxpbmcoa2V5LCBfUHJvZHVjdGlvbkNvbG9yVHlwZXNba2V5XSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRUb2FzdFN0eWxpbmcoa2V5LCBfUHJvZHVjdGlvbkNvbG9yVHlwZXNba2V5XSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXREaWFsb2dGcmFtZShrZXksIF9Qcm9kdWN0aW9uQ29sb3JUeXBlc1trZXldKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoQ29sb3JWYXJpYW5jZVtrZXkudG9VcHBlckNhc2UoKV0gPT09IENvbG9yVmFyaWFuY2UuUFJJTUFSWSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFNoZWV0KCkuYWRkUnVsZSgnLm5neC1hd2Vzb21lLXBvcHVwLW92ZXJsYXknLCBgYmFja2dyb3VuZDogICR7X1Byb2R1Y3Rpb25Db2xvclR5cGVzW2tleV0uVHJhbnNwYXJlbnREYXJrZW5WYXJpYW5jZX0haW1wb3J0YW50O2ApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgIH1cbiAgICBcbiAgICBwcml2YXRlIHNldFRvYXN0U3R5bGluZyhfS2V5OiBzdHJpbmcsIF9Db2xvclByb3ZpZGVyOiBJQ29sb3JQcm92aWRlcikge1xuICAgICAgICBcbiAgICAgICAgY29uc3QgYmFzZUNsYXNzID0gYC5vdmVybGF5LXRvYXN0IC5ldm9sdmUtdG9hc3QuJHtfS2V5LnRvTG93ZXJDYXNlKCl9LWRpYWxvZ2A7XG4gICAgICAgIGNvbnN0IGJhc2VTdHlsZSA9IGBcbiAgICAgICAgYmFja2dyb3VuZDogICR7X0NvbG9yUHJvdmlkZXIuQnJpZ2h0U2hhZGV9IWltcG9ydGFudDtcbiAgICAgICAgYm9yZGVyLWNvbG9yOiAke19Db2xvclByb3ZpZGVyLkJyaWdodGVufSFpbXBvcnRhbnQ7XG4gICAgICAgIGA7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmdldFNoZWV0KCkuYWRkUnVsZShiYXNlQ2xhc3MsIGJhc2VTdHlsZSk7XG4gICAgfVxuICAgIFxuICAgIHByaXZhdGUgc2V0QnV0dG9uU3R5bGluZyhfS2V5OiBzdHJpbmcsIF9Db2xvclByb3ZpZGVyOiBJQ29sb3JQcm92aWRlcikge1xuICAgICAgICBcbiAgICAgICAgY29uc3QgYmFzZUJ1dHRvbkNsYXNzID0gYC5lZC1idG4tJHtfS2V5LnRvTG93ZXJDYXNlKCl9YDtcbiAgICAgICAgY29uc3QgYmFzZVN0eWxlICAgICAgID0gYFxuICAgICAgICBjb2xvcjogJHtfQ29sb3JQcm92aWRlci5Db250cmFzdENvbG9yfSFpbXBvcnRhbnQ7XG4gICAgICAgIGJhY2tncm91bmQ6ICAke19Db2xvclByb3ZpZGVyLkJhc2V9IWltcG9ydGFudDtcbiAgICAgICAgYm9yZGVyLWNvbG9yOiAke19Db2xvclByb3ZpZGVyLkJyaWdodGVuRm9yU2hhZGV9IWltcG9ydGFudDtcbiAgICAgICAgYDtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGhvdmVyQnV0dG9uQ2xhc3MgPSBgLmVkLWJ0bi0ke19LZXkudG9Mb3dlckNhc2UoKX06aG92ZXJgO1xuICAgICAgICBjb25zdCBob3ZlclN0eWxlICAgICAgID0gYFxuICAgICAgICBiYWNrZ3JvdW5kOiAgJHtfQ29sb3JQcm92aWRlci5Jc0Jhc2VCcmlnaHQgPyBfQ29sb3JQcm92aWRlci5EYXJrZW5Gb3JTaGFkZSA6IF9Db2xvclByb3ZpZGVyLkJyaWdodGVuRm9yU2hhZGV9IWltcG9ydGFudDtcbiAgICAgICAgYm9yZGVyLWNvbG9yOiAke19Db2xvclByb3ZpZGVyLklzQmFzZUJyaWdodCA/IF9Db2xvclByb3ZpZGVyLkRhcmtlbiA6IF9Db2xvclByb3ZpZGVyLkJyaWdodGVufSFpbXBvcnRhbnQ7XG4gICAgICAgIGA7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBmb2N1c0FjdGl2ZUJ1dHRvbkNsYXNzID0gYC5lZC1idG4tJHtfS2V5LnRvTG93ZXJDYXNlKCl9OmZvY3VzLCAuZWQtYnRuLSR7X0tleS50b0xvd2VyQ2FzZSgpfTphY3RpdmVgO1xuICAgICAgICBjb25zdCBmb2N1c0FjdGl2ZVN0eWxlICAgICAgID0gYFxuICAgICAgICBib3gtc2hhZG93OiAwIDAgMXB4IDJweCAke19Db2xvclByb3ZpZGVyLklzQmFzZUJyaWdodCA/IF9Db2xvclByb3ZpZGVyLkRhcmtlbiA6IF9Db2xvclByb3ZpZGVyLkJyaWdodGVufSFpbXBvcnRhbnQ7XG4gICAgICAgIGA7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmdldFNoZWV0KCkuYWRkUnVsZShiYXNlQnV0dG9uQ2xhc3MsIGJhc2VTdHlsZSk7XG4gICAgICAgIHRoaXMuZ2V0U2hlZXQoKS5hZGRSdWxlKGhvdmVyQnV0dG9uQ2xhc3MsIGhvdmVyU3R5bGUpO1xuICAgICAgICB0aGlzLmdldFNoZWV0KCkuYWRkUnVsZShmb2N1c0FjdGl2ZUJ1dHRvbkNsYXNzLCBmb2N1c0FjdGl2ZVN0eWxlKTtcbiAgICAgICAgXG4gICAgfVxuICAgIFxuICAgIHByaXZhdGUgc2V0SWNvblN0eWxpbmcoX0tleTogc3RyaW5nLCBfQ29sb3JQcm92aWRlcjogSUNvbG9yUHJvdmlkZXIpIHtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGJhc2VJY29uQ2xhc3MgPSBgLmFwLWljb24tJHtfS2V5LnRvTG93ZXJDYXNlKCl9YDtcbiAgICAgICAgY29uc3QgYmFzZVN0eWxlICAgICAgID0gYFxuICAgICAgICBjb2xvcjogJHtfQ29sb3JQcm92aWRlci5CcmlnaHRlbkZvclNoYWRlfSFpbXBvcnRhbnQ7YDtcbiAgICAgICAgXG4gICAgICBcbiAgICAgICAgdGhpcy5nZXRTaGVldCgpLmFkZFJ1bGUoYmFzZUljb25DbGFzcywgYmFzZVN0eWxlKTtcbiAgICAgICAgXG4gICAgfVxuICAgIFxuICAgIHByaXZhdGUgc2V0RGlhbG9nRnJhbWUoX0tleTogc3RyaW5nLCBfQ29sb3JQcm92aWRlcjogSUNvbG9yUHJvdmlkZXIpIHtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGJhc2VEaWFsb2dGcmFtZUNsYXNzID0gYC5uZ3gtYXdlc29tZS1wb3B1cC1vdmVybGF5IC4ke19LZXkudG9Mb3dlckNhc2UoKX0tZGlhbG9nYDtcbiAgICAgICAgY29uc3QgYmFzZVN0eWxlICAgICAgICAgICAgPSBgXG4gICAgICAgIGJvcmRlci1jb2xvcjogJHtfQ29sb3JQcm92aWRlci5CcmlnaHRlbn0haW1wb3J0YW50O1xuICAgICAgICBgO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5nZXRTaGVldCgpLmFkZFJ1bGUoYmFzZURpYWxvZ0ZyYW1lQ2xhc3MsIGJhc2VTdHlsZSk7XG4gICAgICAgIFxuICAgIH1cbiAgICBcbiAgICBwcml2YXRlIGdldFNoZWV0KCkge1xuICAgICAgICAvLyBDcmVhdGUgdGhlIDxzdHlsZT4gdGFnXG4gICAgICAgIGxldCBldm9sdmVEaWFsb2dTdHlsZU5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmd4LWF3ZXNvbWUtcG9wdXAtc3R5bGVzJykgYXMgSFRNTFN0eWxlRWxlbWVudDtcbiAgICAgICAgaWYgKCFldm9sdmVEaWFsb2dTdHlsZU5vZGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGhlYWROb2RlID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xuICAgICAgICAgICAgaWYgKCFoZWFkTm9kZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZXZvbHZlRGlhbG9nU3R5bGVOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgICAgICAgIGV2b2x2ZURpYWxvZ1N0eWxlTm9kZS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ25neC1hd2Vzb21lLXBvcHVwLXN0eWxlcycpO1xuICAgICAgICAgICAgZXZvbHZlRGlhbG9nU3R5bGVOb2RlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKSk7XG4gICAgICAgICAgICBoZWFkTm9kZS5hcHBlbmRDaGlsZChldm9sdmVEaWFsb2dTdHlsZU5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZXZvbHZlRGlhbG9nU3R5bGVOb2RlID8gZXZvbHZlRGlhbG9nU3R5bGVOb2RlLnNoZWV0IDogbnVsbDtcbiAgICB9O1xuICAgIFxuICAgIHByaXZhdGUgc2V0VG9hc3ROb2RlKCkge1xuICAgICAgICBjb25zdCBib2R5Tm9kZSA9IGRvY3VtZW50LmJvZHkgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXTtcbiAgICAgICAgaWYgKCFib2R5Tm9kZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBjb25zdCB0b2FzdFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdG9hc3RXcmFwcGVyLnNldEF0dHJpYnV0ZSgnaWQnLCAndG9hc3Qtd3JhcHBlcicpO1xuICAgICAgICB0b2FzdFdyYXBwZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpKTtcbiAgICAgICAgYm9keU5vZGUucHJlcGVuZCh0b2FzdFdyYXBwZXIpO1xuICAgICAgICAvLyBib2R5Tm9kZS5hcHBlbmRDaGlsZCh0b2FzdFdyYXBwZXIpO1xuICAgIFxuICAgIFxuICAgICAgICB0aGlzLmdldFNoZWV0KCkuYWRkUnVsZShgI3RvYXN0LXdyYXBwZXJgLCBgcG9zaXRpb246IGZpeGVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHotaW5kZXg6IDEwMDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiAyMHB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAyMHB4O2ApO1xuICAgICAgICB0aGlzLmdldFNoZWV0KCkuYWRkUnVsZShgLnRvYXN0LWVudGl0eWAsIGBhbGwgMC41cyBlYXNlO2ApO1xuICAgICAgICB0aGlzLmdldFNoZWV0KCkuYWRkUnVsZShgLnRvYXN0LWVudGl0eTpmaXJzdC1jaGlsZGAsIGBhbmltYXRpb246IG1vdmUgMC43cyBlYXNlLW91dDtgKTtcbiAgICAgICAgdGhpcy5nZXRTaGVldCgpLmFkZFJ1bGUoYEAtd2Via2l0LWtleWZyYW1lcyBtb3ZlYCwgYFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDAlIHttYXJnaW4tdG9wOiAtNXB4OyBvcGFjaXR5OiAwLjQ7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDMwJSB7bWFyZ2luLXRvcDogLTRweDsgb3BhY2l0eTogMC43O31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxMDAlIHttYXJnaW4tdG9wOiAwcHg7IG9wYWNpdHk6IDE7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGApO1xuICAgICAgICB0aGlzLmdldFNoZWV0KCkuYWRkUnVsZShgQGtleWZyYW1lcyBtb3ZlYCwgYFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDAlIHttYXJnaW4tdG9wOiAtNXB4OyBvcGFjaXR5OiAwLjQ7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDMwJSB7bWFyZ2luLXRvcDogLTRweDsgb3BhY2l0eTogMC43O31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxMDAlIHttYXJnaW4tdG9wOiAwcHg7IG9wYWNpdHk6IDE7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGApO1xuICAgICAgICBcbiAgICB9XG4gICAgXG4gICAgcHJpdmF0ZSBzZXRVc2VyQ29sb3JzKF9Vc2VyQ29sb3JUeXBlczogR2xvYmFsSW50ZXJmYWNlLklDb2xvclR5cGVzKTogdm9pZCB7XG4gICAgICAgIFxuICAgICAgICBpZiAodHlwZW9mIF9Vc2VyQ29sb3JUeXBlcyAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgY29uc3QgdXNlcktleXMgICAgICAgICAgICAgPSBPYmplY3Qua2V5cyhfVXNlckNvbG9yVHlwZXMpO1xuICAgICAgICBjb25zdCBwcm9kdWN0aW9uT2JqZWN0S2V5cyA9IE9iamVjdC5rZXlzKHRoaXMucHJvZHVjdGlvbkdsb2JhbENvbmZpZy5EaXNwbGF5Q29sb3IpO1xuICAgICAgICBcbiAgICAgICAgdXNlcktleXMuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAocHJvZHVjdGlvbk9iamVjdEtleXMuZmluZCh0S2V5ID0+IHRLZXkgPT09IGtleSkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBiYXNlQ29sb3JQcm92aWRlciA9IG5ldyBHbG9iYWxDbGFzcy5Db2xvclByb3ZpZGVyKF9Vc2VyQ29sb3JUeXBlc1trZXldKTtcbiAgICAgICAgICAgICAgICBpZiAoYmFzZUNvbG9yUHJvdmlkZXIuQmFzZSkge1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9kdWN0aW9uR2xvYmFsQ29uZmlnLkRpc3BsYXlDb2xvcltrZXldID0gYmFzZUNvbG9yUHJvdmlkZXI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgfVxufVxuIl19
