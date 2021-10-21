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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLWNvbmZpZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbmd4LWF3ZXNvbWUtcG9wdXAvdHlwZXMvZGlhbG9nL2NvcmUvZGlhbG9nLWNvbmZpZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzFELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUMxRixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sV0FBVyxDQUFDOztBQU0zQyxNQUFNLE9BQU8sbUJBQW1CO0lBSTlCLFlBRVUsYUFBZ0MsRUFBRTtRQUFsQyxlQUFVLEdBQVYsVUFBVSxDQUF3QjtRQUw1QyxpQkFBWSxHQUFzQixJQUFJLGNBQWMsRUFBRSxDQUFDO1FBQ3ZELHFCQUFnQixHQUFzQixJQUFJLGNBQWMsRUFBRSxDQUFDO1FBTXpELDJEQUEyRDtRQUMzRCxNQUFNLGNBQWMsR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDO1FBQzVDLE1BQU0sV0FBVyxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7UUFDdEMsV0FBVyxDQUFDLGNBQWMsQ0FDeEIsVUFBVSxDQUFDLGdCQUFnQixFQUMzQixjQUFjLENBQUMsZ0JBQWdCLENBQ2hDLENBQUMsQ0FBQyx1REFBdUQ7UUFDMUQsVUFBVSxDQUFDLGdCQUFnQixHQUFHLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQztRQUU5RCxJQUFJLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLEtBQUssSUFBSSxFQUFFO1lBQ3hELFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhO2dCQUN2QyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxLQUFLLElBQUksQ0FBQztTQUN0RDtRQUNELFlBQVk7UUFFWiwwRUFBMEU7UUFDMUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO1FBQ2xELElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNuRCxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDekQsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1FBQzFELElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQztRQUM1RCxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDekQsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEdBQUcsbUJBQW1CLENBQUMsSUFBSSxDQUFDO1FBQ3pFLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxHQUFHLHNCQUFzQixDQUFDO1FBQzVFLFlBQVk7UUFFWixXQUFXLENBQUMsY0FBYyxDQUN4QixJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixFQUNsQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQ3ZDLENBQUM7UUFDRixXQUFXLENBQUMsY0FBYyxDQUN4QixVQUFVLENBQUMsZ0JBQWdCLEVBQzNCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FDdkMsQ0FBQztRQUVGLFVBQVU7UUFDVjs7Ozs7ZUFLQztJQUNILENBQUM7Ozs7WUFyREYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7NENBTUksTUFBTSxTQUFDLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERpYWxvZ0xheW91dERpc3BsYXkgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudW1zJztcbmltcG9ydCB7IERhdGFDb250cm9sIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9nbG9iYWwtY2xhc3Nlcyc7XG5pbXBvcnQgeyBEZWZhdWx0TG9hZGVyQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vZGVmYXVsdC1sb2FkZXIvZGVmYXVsdC1sb2FkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IERpYWxvZ1NldHRpbmdzIH0gZnJvbSAnLi9jbGFzc2VzJztcbmltcG9ydCB7IElEaWFsb2dVc2VyQ29uZmlnIH0gZnJvbSAnLi9pbnRlcmZhY2VzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgRGlhbG9nQ29uZmlnU2VydmljZSB7XG4gIGF1dGhvckNvbmZpZzogSURpYWxvZ1VzZXJDb25maWcgPSBuZXcgRGlhbG9nU2V0dGluZ3MoKTtcbiAgcHJvZHVjdGlvbkNvbmZpZzogSURpYWxvZ1VzZXJDb25maWcgPSBuZXcgRGlhbG9nU2V0dGluZ3MoKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KCdkaWFsb2dDb25maWcnKVxuICAgIHByaXZhdGUgdXNlckNvbmZpZzogSURpYWxvZ1VzZXJDb25maWcgPSB7fVxuICApIHtcbiAgICAvLyByZWdpb24gKioqIGRpYWxvZyB1c2VyQ29uZmlnICh1c2VyIGlucHV0IGFwcC1tb2R1bGUpICoqKlxuICAgIGNvbnN0IHVzZXJDb25maWdCYXNlID0gbmV3IERpYWxvZ1NldHRpbmdzKCk7XG4gICAgY29uc3QgZGF0YUNvbnRyb2wgPSBuZXcgRGF0YUNvbnRyb2woKTtcbiAgICBkYXRhQ29udHJvbC5jb3B5VmFsdWVzRnJvbShcbiAgICAgIHVzZXJDb25maWcuRGlhbG9nQ29yZUNvbmZpZyxcbiAgICAgIHVzZXJDb25maWdCYXNlLkRpYWxvZ0NvcmVDb25maWdcbiAgICApOyAvLyB0aGlzIHdpbGwgbWFrZSBzdXJlIHRoYXQgb2JqZWN0IGhhcyByaWdodCBwcm9wZXJ0aWVzXG4gICAgdXNlckNvbmZpZy5EaWFsb2dDb3JlQ29uZmlnID0gdXNlckNvbmZpZ0Jhc2UuRGlhbG9nQ29yZUNvbmZpZztcblxuICAgIGlmICh1c2VyQ29uZmlnLkRpYWxvZ0NvcmVDb25maWcuTG9hZGVyQ29tcG9uZW50ICE9PSBudWxsKSB7XG4gICAgICB1c2VyQ29uZmlnLkRpYWxvZ0NvcmVDb25maWcuRGlzcGxheUxvYWRlciA9XG4gICAgICAgIHVzZXJDb25maWcuRGlhbG9nQ29yZUNvbmZpZy5EaXNwbGF5TG9hZGVyID09PSBudWxsO1xuICAgIH1cbiAgICAvLyBlbmRyZWdpb25cblxuICAgIC8vIHJlZ2lvbiAqKiogYXV0aG9yIGRlZmF1bHQgY29uZmlnIHZhbHVlcyAoaWYgdGhlcmUgaXMgbm8gdXNlciBpbnB1dCkgKioqXG4gICAgdGhpcy5hdXRob3JDb25maWcuRGlhbG9nQ29yZUNvbmZpZy5XaWR0aCA9ICdhdXRvJztcbiAgICB0aGlzLmF1dGhvckNvbmZpZy5EaWFsb2dDb3JlQ29uZmlnLkhlaWdodCA9ICdhdXRvJztcbiAgICB0aGlzLmF1dGhvckNvbmZpZy5EaWFsb2dDb3JlQ29uZmlnLkhpZGVTY3JvbGxiYXIgPSBmYWxzZTtcbiAgICB0aGlzLmF1dGhvckNvbmZpZy5EaWFsb2dDb3JlQ29uZmlnLkVzY2FwZUtleUNsb3NlID0gZmFsc2U7XG4gICAgdGhpcy5hdXRob3JDb25maWcuRGlhbG9nQ29yZUNvbmZpZy5CdXR0b25Qb3NpdGlvbiA9ICdyaWdodCc7XG4gICAgdGhpcy5hdXRob3JDb25maWcuRGlhbG9nQ29yZUNvbmZpZy5EaXNwbGF5TG9hZGVyID0gZmFsc2U7XG4gICAgdGhpcy5hdXRob3JDb25maWcuRGlhbG9nQ29yZUNvbmZpZy5MYXlvdXRUeXBlID0gRGlhbG9nTGF5b3V0RGlzcGxheS5OT05FO1xuICAgIHRoaXMuYXV0aG9yQ29uZmlnLkRpYWxvZ0NvcmVDb25maWcuTG9hZGVyQ29tcG9uZW50ID0gRGVmYXVsdExvYWRlckNvbXBvbmVudDtcbiAgICAvLyBlbmRyZWdpb25cblxuICAgIGRhdGFDb250cm9sLmNvcHlWYWx1ZXNGcm9tKFxuICAgICAgdGhpcy5hdXRob3JDb25maWcuRGlhbG9nQ29yZUNvbmZpZyxcbiAgICAgIHRoaXMucHJvZHVjdGlvbkNvbmZpZy5EaWFsb2dDb3JlQ29uZmlnXG4gICAgKTtcbiAgICBkYXRhQ29udHJvbC5jb3B5VmFsdWVzRnJvbShcbiAgICAgIHVzZXJDb25maWcuRGlhbG9nQ29yZUNvbmZpZyxcbiAgICAgIHRoaXMucHJvZHVjdGlvbkNvbmZpZy5EaWFsb2dDb3JlQ29uZmlnXG4gICAgKTtcblxuICAgIC8vIEJ1dHRvbnNcbiAgICAvKmlmKHVzZXJDb25maWcuQnV0dG9ucyl7XG5cdFx0XHR0aGlzLmNvbmZpZy5CdXR0b25zLnB1c2goXG5cdFx0XHRcdG5ldyBCdXR0b25NYWtlcignT2snLCAnb2snLCBCdXR0b25MYXlvdXREaXNwbGF5LlBSSU1BUlkpXG5cdFx0XHRcdCxuZXcgQnV0dG9uTWFrZXIoJ0NhbmNlbCcsICdjYW5jZWwnLCBCdXR0b25MYXlvdXREaXNwbGF5LlNFQ09OREFSWSlcblx0XHRcdCk7XG5cdFx0fSovXG4gIH1cbn1cbiJdfQ==