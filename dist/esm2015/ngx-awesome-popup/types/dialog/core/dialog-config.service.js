import { Inject, Injectable } from "@angular/core";
import { DialogLayoutDisplay } from "../../../core/enums";
import { GlobalClass } from "../../../core/global";
import { DefaultLoaderComponent } from "../../../default-loader/default-loader.component";
import { DialogClass } from "./model";
import * as i0 from "@angular/core";
export class DialogConfigService {
    constructor(userConfig = {}) {
        this.userConfig = userConfig;
        this.authorConfig = new DialogClass.DialogSettings();
        this.productionConfig = new DialogClass.DialogSettings();
        // region *** dialog userConfig (user input app-module) ***
        const userConfigBase = new DialogClass.DialogSettings();
        const dataControl = new GlobalClass.DataControl();
        dataControl.copyValuesFrom(userConfig.DialogCoreConfig, userConfigBase.DialogCoreConfig); // this will make sure that object has right properties
        userConfig.DialogCoreConfig = userConfigBase.DialogCoreConfig;
        if (userConfig.DialogCoreConfig.LoaderComponent !== null) {
            userConfig.DialogCoreConfig.DisplayLoader =
                userConfig.DialogCoreConfig.DisplayLoader === null;
        }
        // endregion
        // region *** author default config values (if there is no user input) ***
        this.authorConfig.DialogCoreConfig.Width = "auto";
        this.authorConfig.DialogCoreConfig.Height = "auto";
        this.authorConfig.DialogCoreConfig.HideScrollbar = false;
        this.authorConfig.DialogCoreConfig.EscapeKeyClose = false;
        this.authorConfig.DialogCoreConfig.ButtonPosition = "right";
        this.authorConfig.DialogCoreConfig.DisplayLoader = false;
        this.authorConfig.DialogCoreConfig.LayoutType = DialogLayoutDisplay.NONE;
        this.authorConfig.DialogCoreConfig.LoaderComponent = DefaultLoaderComponent;
        // endregion
        dataControl.copyValuesFrom(this.authorConfig.DialogCoreConfig, this.productionConfig.DialogCoreConfig);
        dataControl.copyValuesFrom(userConfig.DialogCoreConfig, this.productionConfig.DialogCoreConfig);
        // Buttons
        /*if(userConfig.Buttons){
                this.config.Buttons.push(
                    new ButtonMaker('Ok', 'ok', ButtonLayoutDisplay.PRIMARY)
                    ,new ButtonMaker('Cancel', 'cancel', ButtonLayoutDisplay.SECONDARY)
                );
            }*/
    }
}
DialogConfigService.ɵprov = i0.ɵɵdefineInjectable({ factory: function DialogConfigService_Factory() { return new DialogConfigService(i0.ɵɵinject("dialogConfig")); }, token: DialogConfigService, providedIn: "root" });
DialogConfigService.decorators = [
    { type: Injectable, args: [{
                providedIn: "root",
            },] }
];
DialogConfigService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ["dialogConfig",] }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLWNvbmZpZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbmd4LWF3ZXNvbWUtcG9wdXAvdHlwZXMvZGlhbG9nL2NvcmUvZGlhbG9nLWNvbmZpZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzFELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUMxRixPQUFPLEVBQUUsV0FBVyxFQUFtQixNQUFNLFNBQVMsQ0FBQzs7QUFLdkQsTUFBTSxPQUFPLG1CQUFtQjtJQUk5QixZQUVVLGFBQWdELEVBQUU7UUFBbEQsZUFBVSxHQUFWLFVBQVUsQ0FBd0M7UUFMNUQsaUJBQVksR0FBc0MsSUFBSSxXQUFXLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDbkYscUJBQWdCLEdBQXNDLElBQUksV0FBVyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBTXJGLDJEQUEyRDtRQUMzRCxNQUFNLGNBQWMsR0FBRyxJQUFJLFdBQVcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN4RCxNQUFNLFdBQVcsR0FBRyxJQUFJLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNsRCxXQUFXLENBQUMsY0FBYyxDQUN4QixVQUFVLENBQUMsZ0JBQWdCLEVBQzNCLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FDaEMsQ0FBQyxDQUFDLHVEQUF1RDtRQUMxRCxVQUFVLENBQUMsZ0JBQWdCLEdBQUcsY0FBYyxDQUFDLGdCQUFnQixDQUFDO1FBRTlELElBQUksVUFBVSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsS0FBSyxJQUFJLEVBQUU7WUFDeEQsVUFBVSxDQUFDLGdCQUFnQixDQUFDLGFBQWE7Z0JBQ3ZDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLEtBQUssSUFBSSxDQUFDO1NBQ3REO1FBQ0QsWUFBWTtRQUVaLDBFQUEwRTtRQUMxRSxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7UUFDbEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ25ELElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUN6RCxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7UUFDMUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDO1FBQzVELElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUN6RCxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsR0FBRyxtQkFBbUIsQ0FBQyxJQUFJLENBQUM7UUFDekUsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLEdBQUcsc0JBQXNCLENBQUM7UUFDNUUsWUFBWTtRQUVaLFdBQVcsQ0FBQyxjQUFjLENBQ3hCLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLEVBQ2xDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FDdkMsQ0FBQztRQUNGLFdBQVcsQ0FBQyxjQUFjLENBQ3hCLFVBQVUsQ0FBQyxnQkFBZ0IsRUFDM0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixDQUN2QyxDQUFDO1FBRUYsVUFBVTtRQUNWOzs7OztlQUtDO0lBQ0gsQ0FBQzs7OztZQXJERixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs0Q0FNSSxNQUFNLFNBQUMsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBEaWFsb2dMYXlvdXREaXNwbGF5IH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW51bXNcIjtcbmltcG9ydCB7IEdsb2JhbENsYXNzIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZ2xvYmFsXCI7XG5pbXBvcnQgeyBEZWZhdWx0TG9hZGVyQ29tcG9uZW50IH0gZnJvbSBcIi4uLy4uLy4uL2RlZmF1bHQtbG9hZGVyL2RlZmF1bHQtbG9hZGVyLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgRGlhbG9nQ2xhc3MsIERpYWxvZ0ludGVyZmFjZSB9IGZyb20gXCIuL21vZGVsXCI7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogXCJyb290XCIsXG59KVxuZXhwb3J0IGNsYXNzIERpYWxvZ0NvbmZpZ1NlcnZpY2Uge1xuICBhdXRob3JDb25maWc6IERpYWxvZ0ludGVyZmFjZS5JRGlhbG9nVXNlckNvbmZpZyA9IG5ldyBEaWFsb2dDbGFzcy5EaWFsb2dTZXR0aW5ncygpO1xuICBwcm9kdWN0aW9uQ29uZmlnOiBEaWFsb2dJbnRlcmZhY2UuSURpYWxvZ1VzZXJDb25maWcgPSBuZXcgRGlhbG9nQ2xhc3MuRGlhbG9nU2V0dGluZ3MoKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KFwiZGlhbG9nQ29uZmlnXCIpXG4gICAgcHJpdmF0ZSB1c2VyQ29uZmlnOiBEaWFsb2dJbnRlcmZhY2UuSURpYWxvZ1VzZXJDb25maWcgPSB7fVxuICApIHtcbiAgICAvLyByZWdpb24gKioqIGRpYWxvZyB1c2VyQ29uZmlnICh1c2VyIGlucHV0IGFwcC1tb2R1bGUpICoqKlxuICAgIGNvbnN0IHVzZXJDb25maWdCYXNlID0gbmV3IERpYWxvZ0NsYXNzLkRpYWxvZ1NldHRpbmdzKCk7XG4gICAgY29uc3QgZGF0YUNvbnRyb2wgPSBuZXcgR2xvYmFsQ2xhc3MuRGF0YUNvbnRyb2woKTtcbiAgICBkYXRhQ29udHJvbC5jb3B5VmFsdWVzRnJvbShcbiAgICAgIHVzZXJDb25maWcuRGlhbG9nQ29yZUNvbmZpZyxcbiAgICAgIHVzZXJDb25maWdCYXNlLkRpYWxvZ0NvcmVDb25maWdcbiAgICApOyAvLyB0aGlzIHdpbGwgbWFrZSBzdXJlIHRoYXQgb2JqZWN0IGhhcyByaWdodCBwcm9wZXJ0aWVzXG4gICAgdXNlckNvbmZpZy5EaWFsb2dDb3JlQ29uZmlnID0gdXNlckNvbmZpZ0Jhc2UuRGlhbG9nQ29yZUNvbmZpZztcblxuICAgIGlmICh1c2VyQ29uZmlnLkRpYWxvZ0NvcmVDb25maWcuTG9hZGVyQ29tcG9uZW50ICE9PSBudWxsKSB7XG4gICAgICB1c2VyQ29uZmlnLkRpYWxvZ0NvcmVDb25maWcuRGlzcGxheUxvYWRlciA9XG4gICAgICAgIHVzZXJDb25maWcuRGlhbG9nQ29yZUNvbmZpZy5EaXNwbGF5TG9hZGVyID09PSBudWxsO1xuICAgIH1cbiAgICAvLyBlbmRyZWdpb25cblxuICAgIC8vIHJlZ2lvbiAqKiogYXV0aG9yIGRlZmF1bHQgY29uZmlnIHZhbHVlcyAoaWYgdGhlcmUgaXMgbm8gdXNlciBpbnB1dCkgKioqXG4gICAgdGhpcy5hdXRob3JDb25maWcuRGlhbG9nQ29yZUNvbmZpZy5XaWR0aCA9IFwiYXV0b1wiO1xuICAgIHRoaXMuYXV0aG9yQ29uZmlnLkRpYWxvZ0NvcmVDb25maWcuSGVpZ2h0ID0gXCJhdXRvXCI7XG4gICAgdGhpcy5hdXRob3JDb25maWcuRGlhbG9nQ29yZUNvbmZpZy5IaWRlU2Nyb2xsYmFyID0gZmFsc2U7XG4gICAgdGhpcy5hdXRob3JDb25maWcuRGlhbG9nQ29yZUNvbmZpZy5Fc2NhcGVLZXlDbG9zZSA9IGZhbHNlO1xuICAgIHRoaXMuYXV0aG9yQ29uZmlnLkRpYWxvZ0NvcmVDb25maWcuQnV0dG9uUG9zaXRpb24gPSBcInJpZ2h0XCI7XG4gICAgdGhpcy5hdXRob3JDb25maWcuRGlhbG9nQ29yZUNvbmZpZy5EaXNwbGF5TG9hZGVyID0gZmFsc2U7XG4gICAgdGhpcy5hdXRob3JDb25maWcuRGlhbG9nQ29yZUNvbmZpZy5MYXlvdXRUeXBlID0gRGlhbG9nTGF5b3V0RGlzcGxheS5OT05FO1xuICAgIHRoaXMuYXV0aG9yQ29uZmlnLkRpYWxvZ0NvcmVDb25maWcuTG9hZGVyQ29tcG9uZW50ID0gRGVmYXVsdExvYWRlckNvbXBvbmVudDtcbiAgICAvLyBlbmRyZWdpb25cblxuICAgIGRhdGFDb250cm9sLmNvcHlWYWx1ZXNGcm9tKFxuICAgICAgdGhpcy5hdXRob3JDb25maWcuRGlhbG9nQ29yZUNvbmZpZyxcbiAgICAgIHRoaXMucHJvZHVjdGlvbkNvbmZpZy5EaWFsb2dDb3JlQ29uZmlnXG4gICAgKTtcbiAgICBkYXRhQ29udHJvbC5jb3B5VmFsdWVzRnJvbShcbiAgICAgIHVzZXJDb25maWcuRGlhbG9nQ29yZUNvbmZpZyxcbiAgICAgIHRoaXMucHJvZHVjdGlvbkNvbmZpZy5EaWFsb2dDb3JlQ29uZmlnXG4gICAgKTtcblxuICAgIC8vIEJ1dHRvbnNcbiAgICAvKmlmKHVzZXJDb25maWcuQnV0dG9ucyl7XG5cdFx0XHR0aGlzLmNvbmZpZy5CdXR0b25zLnB1c2goXG5cdFx0XHRcdG5ldyBCdXR0b25NYWtlcignT2snLCAnb2snLCBCdXR0b25MYXlvdXREaXNwbGF5LlBSSU1BUlkpXG5cdFx0XHRcdCxuZXcgQnV0dG9uTWFrZXIoJ0NhbmNlbCcsICdjYW5jZWwnLCBCdXR0b25MYXlvdXREaXNwbGF5LlNFQ09OREFSWSlcblx0XHRcdCk7XG5cdFx0fSovXG4gIH1cbn1cbiJdfQ==