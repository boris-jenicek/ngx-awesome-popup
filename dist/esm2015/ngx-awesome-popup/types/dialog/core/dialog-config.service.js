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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLWNvbmZpZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbmd4LWF3ZXNvbWUtcG9wdXAvdHlwZXMvZGlhbG9nL2NvcmUvZGlhbG9nLWNvbmZpZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzFELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUMxRixPQUFPLEVBQUUsV0FBVyxFQUFtQixNQUFNLFNBQVMsQ0FBQzs7QUFLdkQsTUFBTSxPQUFPLG1CQUFtQjtJQUk5QixZQUVVLGFBQWdELEVBQUU7UUFBbEQsZUFBVSxHQUFWLFVBQVUsQ0FBd0M7UUFMNUQsaUJBQVksR0FBc0MsSUFBSSxXQUFXLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDbkYscUJBQWdCLEdBQXNDLElBQUksV0FBVyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBTXJGLDJEQUEyRDtRQUMzRCxNQUFNLGNBQWMsR0FBRyxJQUFJLFdBQVcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN4RCxNQUFNLFdBQVcsR0FBRyxJQUFJLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNsRCxXQUFXLENBQUMsY0FBYyxDQUN4QixVQUFVLENBQUMsZ0JBQWdCLEVBQzNCLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FDaEMsQ0FBQyxDQUFDLHVEQUF1RDtRQUMxRCxVQUFVLENBQUMsZ0JBQWdCLEdBQUcsY0FBYyxDQUFDLGdCQUFnQixDQUFDO1FBRTlELElBQUksVUFBVSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsS0FBSyxJQUFJLEVBQUU7WUFDeEQsVUFBVSxDQUFDLGdCQUFnQixDQUFDLGFBQWE7Z0JBQ3ZDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLEtBQUssSUFBSSxDQUFDO1NBQ3REO1FBQ0QsWUFBWTtRQUVaLDBFQUEwRTtRQUMxRSxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7UUFDbEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ25ELElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQztRQUM1RCxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDekQsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEdBQUcsbUJBQW1CLENBQUMsSUFBSSxDQUFDO1FBQ3pFLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxHQUFHLHNCQUFzQixDQUFDO1FBQzVFLFlBQVk7UUFFWixXQUFXLENBQUMsY0FBYyxDQUN4QixJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixFQUNsQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQ3ZDLENBQUM7UUFDRixXQUFXLENBQUMsY0FBYyxDQUN4QixVQUFVLENBQUMsZ0JBQWdCLEVBQzNCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FDdkMsQ0FBQztRQUVGLFVBQVU7UUFDVjs7Ozs7ZUFLQztJQUNILENBQUM7Ozs7WUFuREYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7NENBTUksTUFBTSxTQUFDLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgRGlhbG9nTGF5b3V0RGlzcGxheSB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudW1zXCI7XG5pbXBvcnQgeyBHbG9iYWxDbGFzcyB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2dsb2JhbFwiO1xuaW1wb3J0IHsgRGVmYXVsdExvYWRlckNvbXBvbmVudCB9IGZyb20gXCIuLi8uLi8uLi9kZWZhdWx0LWxvYWRlci9kZWZhdWx0LWxvYWRlci5jb21wb25lbnRcIjtcbmltcG9ydCB7IERpYWxvZ0NsYXNzLCBEaWFsb2dJbnRlcmZhY2UgfSBmcm9tIFwiLi9tb2RlbFwiO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46IFwicm9vdFwiLFxufSlcbmV4cG9ydCBjbGFzcyBEaWFsb2dDb25maWdTZXJ2aWNlIHtcbiAgYXV0aG9yQ29uZmlnOiBEaWFsb2dJbnRlcmZhY2UuSURpYWxvZ1VzZXJDb25maWcgPSBuZXcgRGlhbG9nQ2xhc3MuRGlhbG9nU2V0dGluZ3MoKTtcbiAgcHJvZHVjdGlvbkNvbmZpZzogRGlhbG9nSW50ZXJmYWNlLklEaWFsb2dVc2VyQ29uZmlnID0gbmV3IERpYWxvZ0NsYXNzLkRpYWxvZ1NldHRpbmdzKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChcImRpYWxvZ0NvbmZpZ1wiKVxuICAgIHByaXZhdGUgdXNlckNvbmZpZzogRGlhbG9nSW50ZXJmYWNlLklEaWFsb2dVc2VyQ29uZmlnID0ge31cbiAgKSB7XG4gICAgLy8gcmVnaW9uICoqKiBkaWFsb2cgdXNlckNvbmZpZyAodXNlciBpbnB1dCBhcHAtbW9kdWxlKSAqKipcbiAgICBjb25zdCB1c2VyQ29uZmlnQmFzZSA9IG5ldyBEaWFsb2dDbGFzcy5EaWFsb2dTZXR0aW5ncygpO1xuICAgIGNvbnN0IGRhdGFDb250cm9sID0gbmV3IEdsb2JhbENsYXNzLkRhdGFDb250cm9sKCk7XG4gICAgZGF0YUNvbnRyb2wuY29weVZhbHVlc0Zyb20oXG4gICAgICB1c2VyQ29uZmlnLkRpYWxvZ0NvcmVDb25maWcsXG4gICAgICB1c2VyQ29uZmlnQmFzZS5EaWFsb2dDb3JlQ29uZmlnXG4gICAgKTsgLy8gdGhpcyB3aWxsIG1ha2Ugc3VyZSB0aGF0IG9iamVjdCBoYXMgcmlnaHQgcHJvcGVydGllc1xuICAgIHVzZXJDb25maWcuRGlhbG9nQ29yZUNvbmZpZyA9IHVzZXJDb25maWdCYXNlLkRpYWxvZ0NvcmVDb25maWc7XG5cbiAgICBpZiAodXNlckNvbmZpZy5EaWFsb2dDb3JlQ29uZmlnLkxvYWRlckNvbXBvbmVudCAhPT0gbnVsbCkge1xuICAgICAgdXNlckNvbmZpZy5EaWFsb2dDb3JlQ29uZmlnLkRpc3BsYXlMb2FkZXIgPVxuICAgICAgICB1c2VyQ29uZmlnLkRpYWxvZ0NvcmVDb25maWcuRGlzcGxheUxvYWRlciA9PT0gbnVsbDtcbiAgICB9XG4gICAgLy8gZW5kcmVnaW9uXG5cbiAgICAvLyByZWdpb24gKioqIGF1dGhvciBkZWZhdWx0IGNvbmZpZyB2YWx1ZXMgKGlmIHRoZXJlIGlzIG5vIHVzZXIgaW5wdXQpICoqKlxuICAgIHRoaXMuYXV0aG9yQ29uZmlnLkRpYWxvZ0NvcmVDb25maWcuV2lkdGggPSBcImF1dG9cIjtcbiAgICB0aGlzLmF1dGhvckNvbmZpZy5EaWFsb2dDb3JlQ29uZmlnLkhlaWdodCA9IFwiYXV0b1wiO1xuICAgIHRoaXMuYXV0aG9yQ29uZmlnLkRpYWxvZ0NvcmVDb25maWcuQnV0dG9uUG9zaXRpb24gPSBcInJpZ2h0XCI7XG4gICAgdGhpcy5hdXRob3JDb25maWcuRGlhbG9nQ29yZUNvbmZpZy5EaXNwbGF5TG9hZGVyID0gZmFsc2U7XG4gICAgdGhpcy5hdXRob3JDb25maWcuRGlhbG9nQ29yZUNvbmZpZy5MYXlvdXRUeXBlID0gRGlhbG9nTGF5b3V0RGlzcGxheS5OT05FO1xuICAgIHRoaXMuYXV0aG9yQ29uZmlnLkRpYWxvZ0NvcmVDb25maWcuTG9hZGVyQ29tcG9uZW50ID0gRGVmYXVsdExvYWRlckNvbXBvbmVudDtcbiAgICAvLyBlbmRyZWdpb25cblxuICAgIGRhdGFDb250cm9sLmNvcHlWYWx1ZXNGcm9tKFxuICAgICAgdGhpcy5hdXRob3JDb25maWcuRGlhbG9nQ29yZUNvbmZpZyxcbiAgICAgIHRoaXMucHJvZHVjdGlvbkNvbmZpZy5EaWFsb2dDb3JlQ29uZmlnXG4gICAgKTtcbiAgICBkYXRhQ29udHJvbC5jb3B5VmFsdWVzRnJvbShcbiAgICAgIHVzZXJDb25maWcuRGlhbG9nQ29yZUNvbmZpZyxcbiAgICAgIHRoaXMucHJvZHVjdGlvbkNvbmZpZy5EaWFsb2dDb3JlQ29uZmlnXG4gICAgKTtcblxuICAgIC8vIEJ1dHRvbnNcbiAgICAvKmlmKHVzZXJDb25maWcuQnV0dG9ucyl7XG5cdFx0XHR0aGlzLmNvbmZpZy5CdXR0b25zLnB1c2goXG5cdFx0XHRcdG5ldyBCdXR0b25NYWtlcignT2snLCAnb2snLCBCdXR0b25MYXlvdXREaXNwbGF5LlBSSU1BUlkpXG5cdFx0XHRcdCxuZXcgQnV0dG9uTWFrZXIoJ0NhbmNlbCcsICdjYW5jZWwnLCBCdXR0b25MYXlvdXREaXNwbGF5LlNFQ09OREFSWSlcblx0XHRcdCk7XG5cdFx0fSovXG4gIH1cbn1cbiJdfQ==