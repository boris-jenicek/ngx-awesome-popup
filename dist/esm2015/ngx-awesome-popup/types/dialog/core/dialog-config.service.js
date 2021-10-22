import { Inject, Injectable } from '@angular/core';
import { DialogLayoutDisplay } from '../../../core/enums';
import { DataControl } from '../../../core/global-classes';
import { DefaultLoaderComponent } from '../../../default-loader/default-loader.component';
import { DialogSettings } from './classes';
import * as i0 from "@angular/core";
export class DialogConfigService {
    constructor(userConfig = {}) {
        this.userConfig = userConfig;
        this.authorConfig = new DialogSettings();
        this.productionConfig = new DialogSettings();
        // region *** dialog userConfig (user input app-module) ***
        const userConfigBase = new DialogSettings();
        const dataControl = new DataControl();
        dataControl.copyValuesFrom(userConfig.DialogCoreConfig, userConfigBase.DialogCoreConfig); // this will make sure that object has right properties
        userConfig.DialogCoreConfig = userConfigBase.DialogCoreConfig;
        if (userConfig.DialogCoreConfig.LoaderComponent !== null) {
            userConfig.DialogCoreConfig.DisplayLoader =
                userConfig.DialogCoreConfig.DisplayLoader === null;
        }
        // endregion
        // region *** author default config values (if there is no user input) ***
        this.authorConfig.DialogCoreConfig.Width = 'auto';
        this.authorConfig.DialogCoreConfig.Height = 'auto';
        this.authorConfig.DialogCoreConfig.HideScrollbar = false;
        this.authorConfig.DialogCoreConfig.EscapeKeyClose = false;
        this.authorConfig.DialogCoreConfig.ButtonPosition = 'right';
        this.authorConfig.DialogCoreConfig.DisplayLoader = false;
        this.authorConfig.DialogCoreConfig.FullScreen = false;
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
                providedIn: 'root'
            },] }
];
DialogConfigService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['dialogConfig',] }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLWNvbmZpZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbmd4LWF3ZXNvbWUtcG9wdXAvdHlwZXMvZGlhbG9nL2NvcmUvZGlhbG9nLWNvbmZpZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzFELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUMxRixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sV0FBVyxDQUFDOztBQU0zQyxNQUFNLE9BQU8sbUJBQW1CO0lBSTlCLFlBRVUsYUFBZ0MsRUFBRTtRQUFsQyxlQUFVLEdBQVYsVUFBVSxDQUF3QjtRQUw1QyxpQkFBWSxHQUFzQixJQUFJLGNBQWMsRUFBRSxDQUFDO1FBQ3ZELHFCQUFnQixHQUFzQixJQUFJLGNBQWMsRUFBRSxDQUFDO1FBTXpELDJEQUEyRDtRQUMzRCxNQUFNLGNBQWMsR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDO1FBQzVDLE1BQU0sV0FBVyxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7UUFDdEMsV0FBVyxDQUFDLGNBQWMsQ0FDeEIsVUFBVSxDQUFDLGdCQUFnQixFQUMzQixjQUFjLENBQUMsZ0JBQWdCLENBQ2hDLENBQUMsQ0FBQyx1REFBdUQ7UUFDMUQsVUFBVSxDQUFDLGdCQUFnQixHQUFHLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQztRQUU5RCxJQUFJLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLEtBQUssSUFBSSxFQUFFO1lBQ3hELFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhO2dCQUN2QyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxLQUFLLElBQUksQ0FBQztTQUN0RDtRQUNELFlBQVk7UUFFWiwwRUFBMEU7UUFDMUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO1FBQ2xELElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNuRCxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDekQsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1FBQzFELElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQztRQUM1RCxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDekQsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ3RELElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxHQUFHLG1CQUFtQixDQUFDLElBQUksQ0FBQztRQUN6RSxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsR0FBRyxzQkFBc0IsQ0FBQztRQUM1RSxZQUFZO1FBRVosV0FBVyxDQUFDLGNBQWMsQ0FDeEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsRUFDbEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixDQUN2QyxDQUFDO1FBQ0YsV0FBVyxDQUFDLGNBQWMsQ0FDeEIsVUFBVSxDQUFDLGdCQUFnQixFQUMzQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQ3ZDLENBQUM7UUFFRixVQUFVO1FBQ1Y7Ozs7O2VBS0M7SUFDSCxDQUFDOzs7O1lBdERGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OzRDQU1JLE1BQU0sU0FBQyxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEaWFsb2dMYXlvdXREaXNwbGF5IH0gZnJvbSAnLi4vLi4vLi4vY29yZS9lbnVtcyc7XG5pbXBvcnQgeyBEYXRhQ29udHJvbCB9IGZyb20gJy4uLy4uLy4uL2NvcmUvZ2xvYmFsLWNsYXNzZXMnO1xuaW1wb3J0IHsgRGVmYXVsdExvYWRlckNvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL2RlZmF1bHQtbG9hZGVyL2RlZmF1bHQtbG9hZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEaWFsb2dTZXR0aW5ncyB9IGZyb20gJy4vY2xhc3Nlcyc7XG5pbXBvcnQgeyBJRGlhbG9nVXNlckNvbmZpZyB9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIERpYWxvZ0NvbmZpZ1NlcnZpY2Uge1xuICBhdXRob3JDb25maWc6IElEaWFsb2dVc2VyQ29uZmlnID0gbmV3IERpYWxvZ1NldHRpbmdzKCk7XG4gIHByb2R1Y3Rpb25Db25maWc6IElEaWFsb2dVc2VyQ29uZmlnID0gbmV3IERpYWxvZ1NldHRpbmdzKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdCgnZGlhbG9nQ29uZmlnJylcbiAgICBwcml2YXRlIHVzZXJDb25maWc6IElEaWFsb2dVc2VyQ29uZmlnID0ge31cbiAgKSB7XG4gICAgLy8gcmVnaW9uICoqKiBkaWFsb2cgdXNlckNvbmZpZyAodXNlciBpbnB1dCBhcHAtbW9kdWxlKSAqKipcbiAgICBjb25zdCB1c2VyQ29uZmlnQmFzZSA9IG5ldyBEaWFsb2dTZXR0aW5ncygpO1xuICAgIGNvbnN0IGRhdGFDb250cm9sID0gbmV3IERhdGFDb250cm9sKCk7XG4gICAgZGF0YUNvbnRyb2wuY29weVZhbHVlc0Zyb20oXG4gICAgICB1c2VyQ29uZmlnLkRpYWxvZ0NvcmVDb25maWcsXG4gICAgICB1c2VyQ29uZmlnQmFzZS5EaWFsb2dDb3JlQ29uZmlnXG4gICAgKTsgLy8gdGhpcyB3aWxsIG1ha2Ugc3VyZSB0aGF0IG9iamVjdCBoYXMgcmlnaHQgcHJvcGVydGllc1xuICAgIHVzZXJDb25maWcuRGlhbG9nQ29yZUNvbmZpZyA9IHVzZXJDb25maWdCYXNlLkRpYWxvZ0NvcmVDb25maWc7XG5cbiAgICBpZiAodXNlckNvbmZpZy5EaWFsb2dDb3JlQ29uZmlnLkxvYWRlckNvbXBvbmVudCAhPT0gbnVsbCkge1xuICAgICAgdXNlckNvbmZpZy5EaWFsb2dDb3JlQ29uZmlnLkRpc3BsYXlMb2FkZXIgPVxuICAgICAgICB1c2VyQ29uZmlnLkRpYWxvZ0NvcmVDb25maWcuRGlzcGxheUxvYWRlciA9PT0gbnVsbDtcbiAgICB9XG4gICAgLy8gZW5kcmVnaW9uXG5cbiAgICAvLyByZWdpb24gKioqIGF1dGhvciBkZWZhdWx0IGNvbmZpZyB2YWx1ZXMgKGlmIHRoZXJlIGlzIG5vIHVzZXIgaW5wdXQpICoqKlxuICAgIHRoaXMuYXV0aG9yQ29uZmlnLkRpYWxvZ0NvcmVDb25maWcuV2lkdGggPSAnYXV0byc7XG4gICAgdGhpcy5hdXRob3JDb25maWcuRGlhbG9nQ29yZUNvbmZpZy5IZWlnaHQgPSAnYXV0byc7XG4gICAgdGhpcy5hdXRob3JDb25maWcuRGlhbG9nQ29yZUNvbmZpZy5IaWRlU2Nyb2xsYmFyID0gZmFsc2U7XG4gICAgdGhpcy5hdXRob3JDb25maWcuRGlhbG9nQ29yZUNvbmZpZy5Fc2NhcGVLZXlDbG9zZSA9IGZhbHNlO1xuICAgIHRoaXMuYXV0aG9yQ29uZmlnLkRpYWxvZ0NvcmVDb25maWcuQnV0dG9uUG9zaXRpb24gPSAncmlnaHQnO1xuICAgIHRoaXMuYXV0aG9yQ29uZmlnLkRpYWxvZ0NvcmVDb25maWcuRGlzcGxheUxvYWRlciA9IGZhbHNlO1xuICAgIHRoaXMuYXV0aG9yQ29uZmlnLkRpYWxvZ0NvcmVDb25maWcuRnVsbFNjcmVlbiA9IGZhbHNlO1xuICAgIHRoaXMuYXV0aG9yQ29uZmlnLkRpYWxvZ0NvcmVDb25maWcuTGF5b3V0VHlwZSA9IERpYWxvZ0xheW91dERpc3BsYXkuTk9ORTtcbiAgICB0aGlzLmF1dGhvckNvbmZpZy5EaWFsb2dDb3JlQ29uZmlnLkxvYWRlckNvbXBvbmVudCA9IERlZmF1bHRMb2FkZXJDb21wb25lbnQ7XG4gICAgLy8gZW5kcmVnaW9uXG5cbiAgICBkYXRhQ29udHJvbC5jb3B5VmFsdWVzRnJvbShcbiAgICAgIHRoaXMuYXV0aG9yQ29uZmlnLkRpYWxvZ0NvcmVDb25maWcsXG4gICAgICB0aGlzLnByb2R1Y3Rpb25Db25maWcuRGlhbG9nQ29yZUNvbmZpZ1xuICAgICk7XG4gICAgZGF0YUNvbnRyb2wuY29weVZhbHVlc0Zyb20oXG4gICAgICB1c2VyQ29uZmlnLkRpYWxvZ0NvcmVDb25maWcsXG4gICAgICB0aGlzLnByb2R1Y3Rpb25Db25maWcuRGlhbG9nQ29yZUNvbmZpZ1xuICAgICk7XG5cbiAgICAvLyBCdXR0b25zXG4gICAgLyppZih1c2VyQ29uZmlnLkJ1dHRvbnMpe1xuXHRcdFx0dGhpcy5jb25maWcuQnV0dG9ucy5wdXNoKFxuXHRcdFx0XHRuZXcgQnV0dG9uTWFrZXIoJ09rJywgJ29rJywgQnV0dG9uTGF5b3V0RGlzcGxheS5QUklNQVJZKVxuXHRcdFx0XHQsbmV3IEJ1dHRvbk1ha2VyKCdDYW5jZWwnLCAnY2FuY2VsJywgQnV0dG9uTGF5b3V0RGlzcGxheS5TRUNPTkRBUlkpXG5cdFx0XHQpO1xuXHRcdH0qL1xuICB9XG59XG4iXX0=