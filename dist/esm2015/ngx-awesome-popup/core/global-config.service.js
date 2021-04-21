import { Inject, Injectable } from '@angular/core';
import { GlobalClass } from './global';
import { ColorVariance } from './enums';
import * as i0 from "@angular/core";
export class GlobalConfigService {
    constructor(userGlobalConfig) {
        this.userGlobalConfig = userGlobalConfig;
        this.productionGlobalConfig = new GlobalClass.GlobalConfig();
        this.authorGlobalConfig = new GlobalClass.GlobalConfig();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLWNvbmZpZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbmd4LWF3ZXNvbWUtcG9wdXAvY29yZS9nbG9iYWwtY29uZmlnLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFDLFdBQVcsRUFBa0IsTUFBTSxVQUFVLENBQUM7QUFDdEQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLFNBQVMsQ0FBQzs7QUFNdEMsTUFBTSxPQUFPLG1CQUFtQjtJQUs1QixZQUE0QyxnQkFBbUQ7UUFBbkQscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFtQztRQUgvRiwyQkFBc0IsR0FBc0MsSUFBSSxXQUFXLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDbkYsdUJBQWtCLEdBQWtDLElBQUksV0FBVyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBS3ZGLHlFQUF5RTtRQUN6RSxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLE9BQU8sR0FBSyxJQUFJLENBQUMsQ0FBQyw0Q0FBNEM7UUFDbkcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLENBQUMsNENBQTRDO1FBQ25HLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsT0FBTyxHQUFLLElBQUksQ0FBQyxDQUFDLDRDQUE0QztRQUNuRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLElBQUksR0FBUSxJQUFJLENBQUMsQ0FBQyw0Q0FBNEM7UUFDbkcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxPQUFPLEdBQUssSUFBSSxDQUFDLENBQUMsNENBQTRDO1FBQ25HLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFNLElBQUksQ0FBQyxDQUFDLDRDQUE0QztR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QUU5RCxJQUFJLE9BQU8sZUFBZSxLQUFLLFFBQVEsRUFBRTtZQUNyQyxPQUFPO1NBQ1Y7UUFFRCxNQUFNLFFBQVEsR0FBZSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzFELE1BQU0sb0JBQW9CLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFbkYsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUVuQixJQUFJLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRTtnQkFDakQsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLFdBQVcsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQzlFLElBQUksaUJBQWlCLENBQUMsSUFBSSxFQUFFO29CQUV4QixJQUFJLENBQUMsc0JBQXNCLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxHQUFHLGlCQUFpQixDQUFDO2lCQUNyRTthQUNKO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFUCxDQUFDOzs7O1lBektKLFVBQVUsU0FBQztnQkFDUixVQUFVLEVBQUUsTUFBTTthQUNyQjs7OzRDQU1nQixNQUFNLFNBQUMsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7R2xvYmFsQ2xhc3MsIEdsb2JhbEludGVyZmFjZX0gZnJvbSAnLi9nbG9iYWwnO1xuaW1wb3J0IHtDb2xvclZhcmlhbmNlfSBmcm9tICcuL2VudW1zJztcbmltcG9ydCBJQ29sb3JQcm92aWRlciA9IEdsb2JhbEludGVyZmFjZS5JQ29sb3JQcm92aWRlcjtcblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBHbG9iYWxDb25maWdTZXJ2aWNlIHtcbiAgICBcbiAgICBwcm9kdWN0aW9uR2xvYmFsQ29uZmlnOiBHbG9iYWxJbnRlcmZhY2UuSUdsb2JhbENvbmZpZyAgICAgPSBuZXcgR2xvYmFsQ2xhc3MuR2xvYmFsQ29uZmlnKCk7XG4gICAgcHJpdmF0ZSBhdXRob3JHbG9iYWxDb25maWc6IEdsb2JhbEludGVyZmFjZS5JR2xvYmFsQ29uZmlnID0gbmV3IEdsb2JhbENsYXNzLkdsb2JhbENvbmZpZygpO1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoJ2dsb2JhbENvbmZpZycpIHByaXZhdGUgdXNlckdsb2JhbENvbmZpZzogR2xvYmFsSW50ZXJmYWNlLklHbG9iYWxVc2VyQ29uZmlnKSB7XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgLy8gcmVnaW9uICoqKiBhdXRob3IgZ2xvYmFsIGNvbmZpZyB2YWx1ZXMgKGlmIHRoZXJlIGlzIG5vIHVzZXIgaW5wdXQpICoqKlxuICAgICAgICB0aGlzLmF1dGhvckdsb2JhbENvbmZpZy5EaXNwbGF5Q29sb3IuUHJpbWFyeSAgID0gbnVsbDsgLy8gbmV3IEdsb2JhbENsYXNzLkNvbG9yUHJvdmlkZXIoJyNmZjllMDAnKTtcbiAgICAgICAgdGhpcy5hdXRob3JHbG9iYWxDb25maWcuRGlzcGxheUNvbG9yLlNlY29uZGFyeSA9IG51bGw7IC8vIG5ldyBHbG9iYWxDbGFzcy5Db2xvclByb3ZpZGVyKCcjOTg5ZWE1Jyk7XG4gICAgICAgIHRoaXMuYXV0aG9yR2xvYmFsQ29uZmlnLkRpc3BsYXlDb2xvci5TdWNjZXNzICAgPSBudWxsOyAvLyBuZXcgR2xvYmFsQ2xhc3MuQ29sb3JQcm92aWRlcignIzNjYWVhMycpO1xuICAgICAgICB0aGlzLmF1dGhvckdsb2JhbENvbmZpZy5EaXNwbGF5Q29sb3IuSW5mbyAgICAgID0gbnVsbDsgLy8gbmV3IEdsb2JhbENsYXNzLkNvbG9yUHJvdmlkZXIoJyMyZjhlZTUnKTtcbiAgICAgICAgdGhpcy5hdXRob3JHbG9iYWxDb25maWcuRGlzcGxheUNvbG9yLldhcm5pbmcgICA9IG51bGw7IC8vIG5ldyBHbG9iYWxDbGFzcy5Db2xvclByb3ZpZGVyKCcjZmZjMTA3Jyk7XG4gICAgICAgIHRoaXMuYXV0aG9yR2xvYmFsQ29uZmlnLkRpc3BsYXlDb2xvci5EYW5nZXIgICAgPSBudWxsOyAvLyBuZXcgR2xvYmFsQ2xhc3MuQ29sb3JQcm92aWRlcignI2U0NjQ2NCcpO1xuICAgICAgICB0aGlzLmF1dGhvckdsb2JhbENvbmZpZy5EaXNwbGF5Q29sb3IuTGlnaHQgICAgID0gbnVsbDsgLy8gbmV3IEdsb2JhbENsYXNzLkNvbG9yUHJvdmlkZXIoJyNmOGY5ZmEnKTtcbiAgICAgICAgdGhpcy5hdXRob3JHbG9iYWxDb25maWcuRGlzcGxheUNvbG9yLkRhcmsgICAgICA9IG51bGw7IC8vIG5ldyBHbG9iYWxDbGFzcy5Db2xvclByb3ZpZGVyKCcjMzQzYTQwJyk7XG4gICAgICAgIC8vIGVuZHJlZ2lvblxuICAgICAgICBcbiAgICAgICAgdGhpcy5wcm9kdWN0aW9uR2xvYmFsQ29uZmlnLkRpc3BsYXlDb2xvciA9IHRoaXMuYXV0aG9yR2xvYmFsQ29uZmlnLkRpc3BsYXlDb2xvcjtcbiAgICAgICAgXG4gICAgICAgIC8vIHJlZ2lvbiAqKiogZ2xvYmFsIHVzZXJDb25maWcgKHVzZXIgaW5wdXQgYXBwLW1vZHVsZSkgKioqXG4gICAgICAgIHRoaXMuc2V0VXNlckNvbG9ycyh1c2VyR2xvYmFsQ29uZmlnLkNvbG9yTGlzdCk7XG4gICAgICAgIFxuICAgICAgICAvLyBlbmRyZWdpb25cbiAgICAgICAgXG4gICAgICAgIHRoaXMuc2V0VG9hc3ROb2RlKCk7XG4gICAgICAgIHRoaXMuc2V0Tm9kZVN0eWxlcyh0aGlzLnByb2R1Y3Rpb25HbG9iYWxDb25maWcuRGlzcGxheUNvbG9yKTtcbiAgICAgICAgXG4gICAgfVxuICAgIFxuICAgIHByaXZhdGUgc2V0Tm9kZVN0eWxlcyhfUHJvZHVjdGlvbkNvbG9yVHlwZXM6IEdsb2JhbEludGVyZmFjZS5JQ29sb3JPYmplY3QpIHtcbiAgICAgICAgXG4gICAgICAgIE9iamVjdC5rZXlzKF9Qcm9kdWN0aW9uQ29sb3JUeXBlcykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgaWYgKF9Qcm9kdWN0aW9uQ29sb3JUeXBlc1trZXldKSB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRCdXR0b25TdHlsaW5nKGtleSwgX1Byb2R1Y3Rpb25Db2xvclR5cGVzW2tleV0pO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0VG9hc3RTdHlsaW5nKGtleSwgX1Byb2R1Y3Rpb25Db2xvclR5cGVzW2tleV0pO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGlhbG9nRnJhbWUoa2V5LCBfUHJvZHVjdGlvbkNvbG9yVHlwZXNba2V5XSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKENvbG9yVmFyaWFuY2Vba2V5LnRvVXBwZXJDYXNlKCldID09PSBDb2xvclZhcmlhbmNlLlBSSU1BUlkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRTaGVldCgpLmFkZFJ1bGUoJy5uZ3gtYXdlc29tZS1wb3B1cC1vdmVybGF5JywgYGJhY2tncm91bmQ6ICAke19Qcm9kdWN0aW9uQ29sb3JUeXBlc1trZXldLlRyYW5zcGFyZW50RGFya2VuVmFyaWFuY2V9IWltcG9ydGFudDtgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICB9XG4gICAgXG4gICAgcHJpdmF0ZSBzZXRUb2FzdFN0eWxpbmcoX0tleTogc3RyaW5nLCBfQ29sb3JQcm92aWRlcjogSUNvbG9yUHJvdmlkZXIpIHtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGJhc2VDbGFzcyA9IGAub3ZlcmxheS10b2FzdCAuZXZvbHZlLXRvYXN0LiR7X0tleS50b0xvd2VyQ2FzZSgpfS1kaWFsb2dgO1xuICAgICAgICBjb25zdCBiYXNlU3R5bGUgPSBgXG4gICAgICAgIGJhY2tncm91bmQ6ICAke19Db2xvclByb3ZpZGVyLkJyaWdodFNoYWRlfSFpbXBvcnRhbnQ7XG4gICAgICAgIGJvcmRlci1jb2xvcjogJHtfQ29sb3JQcm92aWRlci5CcmlnaHRlbn0haW1wb3J0YW50O1xuICAgICAgICBgO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5nZXRTaGVldCgpLmFkZFJ1bGUoYmFzZUNsYXNzLCBiYXNlU3R5bGUpO1xuICAgIH1cbiAgICBcbiAgICBwcml2YXRlIHNldEJ1dHRvblN0eWxpbmcoX0tleTogc3RyaW5nLCBfQ29sb3JQcm92aWRlcjogSUNvbG9yUHJvdmlkZXIpIHtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGJhc2VCdXR0b25DbGFzcyA9IGAuZWQtYnRuLSR7X0tleS50b0xvd2VyQ2FzZSgpfWA7XG4gICAgICAgIGNvbnN0IGJhc2VTdHlsZSAgICAgICA9IGBcbiAgICAgICAgY29sb3I6ICR7X0NvbG9yUHJvdmlkZXIuQ29udHJhc3RDb2xvcn0haW1wb3J0YW50O1xuICAgICAgICBiYWNrZ3JvdW5kOiAgJHtfQ29sb3JQcm92aWRlci5CYXNlfSFpbXBvcnRhbnQ7XG4gICAgICAgIGJvcmRlci1jb2xvcjogJHtfQ29sb3JQcm92aWRlci5CcmlnaHRlbkZvclNoYWRlfSFpbXBvcnRhbnQ7XG4gICAgICAgIGA7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBob3ZlckJ1dHRvbkNsYXNzID0gYC5lZC1idG4tJHtfS2V5LnRvTG93ZXJDYXNlKCl9OmhvdmVyYDtcbiAgICAgICAgY29uc3QgaG92ZXJTdHlsZSAgICAgICA9IGBcbiAgICAgICAgYmFja2dyb3VuZDogICR7X0NvbG9yUHJvdmlkZXIuSXNCYXNlQnJpZ2h0ID8gX0NvbG9yUHJvdmlkZXIuRGFya2VuRm9yU2hhZGUgOiBfQ29sb3JQcm92aWRlci5CcmlnaHRlbkZvclNoYWRlfSFpbXBvcnRhbnQ7XG4gICAgICAgIGJvcmRlci1jb2xvcjogJHtfQ29sb3JQcm92aWRlci5Jc0Jhc2VCcmlnaHQgPyBfQ29sb3JQcm92aWRlci5EYXJrZW4gOiBfQ29sb3JQcm92aWRlci5CcmlnaHRlbn0haW1wb3J0YW50O1xuICAgICAgICBgO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgZm9jdXNBY3RpdmVCdXR0b25DbGFzcyA9IGAuZWQtYnRuLSR7X0tleS50b0xvd2VyQ2FzZSgpfTpmb2N1cywgLmVkLWJ0bi0ke19LZXkudG9Mb3dlckNhc2UoKX06YWN0aXZlYDtcbiAgICAgICAgY29uc3QgZm9jdXNBY3RpdmVTdHlsZSAgICAgICA9IGBcbiAgICAgICAgYm94LXNoYWRvdzogMCAwIDFweCAycHggJHtfQ29sb3JQcm92aWRlci5Jc0Jhc2VCcmlnaHQgPyBfQ29sb3JQcm92aWRlci5EYXJrZW4gOiBfQ29sb3JQcm92aWRlci5CcmlnaHRlbn0haW1wb3J0YW50O1xuICAgICAgICBgO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5nZXRTaGVldCgpLmFkZFJ1bGUoYmFzZUJ1dHRvbkNsYXNzLCBiYXNlU3R5bGUpO1xuICAgICAgICB0aGlzLmdldFNoZWV0KCkuYWRkUnVsZShob3ZlckJ1dHRvbkNsYXNzLCBob3ZlclN0eWxlKTtcbiAgICAgICAgdGhpcy5nZXRTaGVldCgpLmFkZFJ1bGUoZm9jdXNBY3RpdmVCdXR0b25DbGFzcywgZm9jdXNBY3RpdmVTdHlsZSk7XG4gICAgICAgIFxuICAgIH1cbiAgICBcbiAgICBwcml2YXRlIHNldERpYWxvZ0ZyYW1lKF9LZXk6IHN0cmluZywgX0NvbG9yUHJvdmlkZXI6IElDb2xvclByb3ZpZGVyKSB7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBiYXNlRGlhbG9nRnJhbWVDbGFzcyA9IGAubmd4LWF3ZXNvbWUtcG9wdXAtb3ZlcmxheSAuJHtfS2V5LnRvTG93ZXJDYXNlKCl9LWRpYWxvZ2A7XG4gICAgICAgIGNvbnN0IGJhc2VTdHlsZSAgICAgICAgICAgID0gYFxuICAgICAgICBib3JkZXItY29sb3I6ICR7X0NvbG9yUHJvdmlkZXIuQnJpZ2h0ZW59IWltcG9ydGFudDtcbiAgICAgICAgYDtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZ2V0U2hlZXQoKS5hZGRSdWxlKGJhc2VEaWFsb2dGcmFtZUNsYXNzLCBiYXNlU3R5bGUpO1xuICAgICAgICBcbiAgICB9XG4gICAgXG4gICAgcHJpdmF0ZSBnZXRTaGVldCgpIHtcbiAgICAgICAgLy8gQ3JlYXRlIHRoZSA8c3R5bGU+IHRhZ1xuICAgICAgICBsZXQgZXZvbHZlRGlhbG9nU3R5bGVOb2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25neC1hd2Vzb21lLXBvcHVwLXN0eWxlcycpIGFzIEhUTUxTdHlsZUVsZW1lbnQ7XG4gICAgICAgIGlmICghZXZvbHZlRGlhbG9nU3R5bGVOb2RlKSB7XG4gICAgICAgICAgICBjb25zdCBoZWFkTm9kZSA9IGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcbiAgICAgICAgICAgIGlmICghaGVhZE5vZGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGV2b2x2ZURpYWxvZ1N0eWxlTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICAgICAgICBldm9sdmVEaWFsb2dTdHlsZU5vZGUuc2V0QXR0cmlidXRlKCdpZCcsICduZ3gtYXdlc29tZS1wb3B1cC1zdHlsZXMnKTtcbiAgICAgICAgICAgIGV2b2x2ZURpYWxvZ1N0eWxlTm9kZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJykpO1xuICAgICAgICAgICAgaGVhZE5vZGUuYXBwZW5kQ2hpbGQoZXZvbHZlRGlhbG9nU3R5bGVOb2RlKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGV2b2x2ZURpYWxvZ1N0eWxlTm9kZSA/IGV2b2x2ZURpYWxvZ1N0eWxlTm9kZS5zaGVldCA6IG51bGw7XG4gICAgfTtcbiAgICBcbiAgICBwcml2YXRlIHNldFRvYXN0Tm9kZSgpIHtcbiAgICAgICAgY29uc3QgYm9keU5vZGUgPSBkb2N1bWVudC5ib2R5IHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF07XG4gICAgICAgIGlmICghYm9keU5vZGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgY29uc3QgdG9hc3RXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRvYXN0V3JhcHBlci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3RvYXN0LXdyYXBwZXInKTtcbiAgICAgICAgdG9hc3RXcmFwcGVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKSk7XG4gICAgICAgIGJvZHlOb2RlLnByZXBlbmQodG9hc3RXcmFwcGVyKTtcbiAgICAgICAgLy8gYm9keU5vZGUuYXBwZW5kQ2hpbGQodG9hc3RXcmFwcGVyKTtcbiAgICBcbiAgICBcbiAgICAgICAgdGhpcy5nZXRTaGVldCgpLmFkZFJ1bGUoYCN0b2FzdC13cmFwcGVyYCwgYHBvc2l0aW9uOiBmaXhlZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6LWluZGV4OiAxMDAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogMjBweDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByaWdodDogMjBweDtgKTtcbiAgICAgICAgdGhpcy5nZXRTaGVldCgpLmFkZFJ1bGUoYC50b2FzdC1lbnRpdHlgLCBgYWxsIDAuNXMgZWFzZTtgKTtcbiAgICAgICAgdGhpcy5nZXRTaGVldCgpLmFkZFJ1bGUoYC50b2FzdC1lbnRpdHk6Zmlyc3QtY2hpbGRgLCBgYW5pbWF0aW9uOiBtb3ZlIDAuN3MgZWFzZS1vdXQ7YCk7XG4gICAgICAgIHRoaXMuZ2V0U2hlZXQoKS5hZGRSdWxlKGBALXdlYmtpdC1rZXlmcmFtZXMgbW92ZWAsIGBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwJSB7bWFyZ2luLXRvcDogLTVweDsgb3BhY2l0eTogMC40O31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAzMCUge21hcmdpbi10b3A6IC00cHg7IG9wYWNpdHk6IDAuNzt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMTAwJSB7bWFyZ2luLXRvcDogMHB4OyBvcGFjaXR5OiAxO31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgKTtcbiAgICAgICAgdGhpcy5nZXRTaGVldCgpLmFkZFJ1bGUoYEBrZXlmcmFtZXMgbW92ZWAsIGBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwJSB7bWFyZ2luLXRvcDogLTVweDsgb3BhY2l0eTogMC40O31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAzMCUge21hcmdpbi10b3A6IC00cHg7IG9wYWNpdHk6IDAuNzt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMTAwJSB7bWFyZ2luLXRvcDogMHB4OyBvcGFjaXR5OiAxO31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgKTtcbiAgICAgICAgXG4gICAgfVxuICAgIFxuICAgIHByaXZhdGUgc2V0VXNlckNvbG9ycyhfVXNlckNvbG9yVHlwZXM6IEdsb2JhbEludGVyZmFjZS5JQ29sb3JUeXBlcyk6IHZvaWQge1xuICAgICAgICBcbiAgICAgICAgaWYgKHR5cGVvZiBfVXNlckNvbG9yVHlwZXMgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHVzZXJLZXlzICAgICAgICAgICAgID0gT2JqZWN0LmtleXMoX1VzZXJDb2xvclR5cGVzKTtcbiAgICAgICAgY29uc3QgcHJvZHVjdGlvbk9iamVjdEtleXMgPSBPYmplY3Qua2V5cyh0aGlzLnByb2R1Y3Rpb25HbG9iYWxDb25maWcuRGlzcGxheUNvbG9yKTtcbiAgICAgICAgXG4gICAgICAgIHVzZXJLZXlzLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHByb2R1Y3Rpb25PYmplY3RLZXlzLmZpbmQodEtleSA9PiB0S2V5ID09PSBrZXkpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYmFzZUNvbG9yUHJvdmlkZXIgPSBuZXcgR2xvYmFsQ2xhc3MuQ29sb3JQcm92aWRlcihfVXNlckNvbG9yVHlwZXNba2V5XSk7XG4gICAgICAgICAgICAgICAgaWYgKGJhc2VDb2xvclByb3ZpZGVyLkJhc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvZHVjdGlvbkdsb2JhbENvbmZpZy5EaXNwbGF5Q29sb3Jba2V5XSA9IGJhc2VDb2xvclByb3ZpZGVyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgIH1cbn1cbiJdfQ==