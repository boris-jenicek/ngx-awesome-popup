import { Inject, Injectable } from '@angular/core';
import { DialogLayoutDisplay } from '../../../core/enums';
import { GlobalClass } from '../../../core/global';
import { DefaultLoaderComponent } from '../../../default-loader/default-loader.component';
import { DialogClass } from './model';
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
            userConfig.DialogCoreConfig.DisplayLoader = userConfig.DialogCoreConfig.DisplayLoader === null;
        }
        // endregion
        // region *** author default config values (if there is no user input) ***
        this.authorConfig.DialogCoreConfig.Width = 'auto';
        this.authorConfig.DialogCoreConfig.Height = 'auto';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLWNvbmZpZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbmd4LWF3ZXNvbWUtcG9wdXAvdHlwZXMvZGlhbG9nL2NvcmUvZGlhbG9nLWNvbmZpZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3hELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNqRCxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxrREFBa0QsQ0FBQztBQUN4RixPQUFPLEVBQUMsV0FBVyxFQUFrQixNQUFNLFNBQVMsQ0FBQzs7QUFLckQsTUFBTSxPQUFPLG1CQUFtQjtJQUsvQixZQUE0QyxhQUFnRCxFQUFFO1FBQWxELGVBQVUsR0FBVixVQUFVLENBQXdDO1FBSDlGLGlCQUFZLEdBQTBDLElBQUksV0FBVyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZGLHFCQUFnQixHQUFzQyxJQUFJLFdBQVcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUl0RiwyREFBMkQ7UUFDM0QsTUFBTSxjQUFjLEdBQUcsSUFBSSxXQUFXLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDeEQsTUFBTSxXQUFXLEdBQU0sSUFBSSxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDckQsV0FBVyxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLEVBQUUsY0FBYyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyx1REFBdUQ7UUFDakosVUFBVSxDQUFDLGdCQUFnQixHQUFHLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQztRQUU5RCxJQUFJLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLEtBQUssSUFBSSxFQUFFO1lBQ3pELFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsS0FBSyxJQUFJLENBQUM7U0FDL0Y7UUFDRCxZQUFZO1FBRVosMEVBQTBFO1FBQzFFLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxHQUFhLE1BQU0sQ0FBQztRQUM1RCxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sR0FBWSxNQUFNLENBQUM7UUFDNUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLEdBQUksT0FBTyxDQUFDO1FBQzdELElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxHQUFLLEtBQUssQ0FBQztRQUMzRCxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsR0FBUSxtQkFBbUIsQ0FBQyxJQUFJLENBQUM7UUFDOUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLEdBQUcsc0JBQXNCLENBQUM7UUFDNUUsWUFBWTtRQUVaLFdBQVcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN2RyxXQUFXLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUVoRyxVQUFVO1FBQ1Y7Ozs7O1dBS0c7SUFFSixDQUFDOzs7O1lBekNELFVBQVUsU0FBQztnQkFDWCxVQUFVLEVBQUUsTUFBTTthQUNsQjs7OzRDQU1hLE1BQU0sU0FBQyxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtEaWFsb2dMYXlvdXREaXNwbGF5fSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudW1zJztcbmltcG9ydCB7R2xvYmFsQ2xhc3N9IGZyb20gJy4uLy4uLy4uL2NvcmUvZ2xvYmFsJztcbmltcG9ydCB7RGVmYXVsdExvYWRlckNvbXBvbmVudH0gZnJvbSAnLi4vLi4vLi4vZGVmYXVsdC1sb2FkZXIvZGVmYXVsdC1sb2FkZXIuY29tcG9uZW50JztcbmltcG9ydCB7RGlhbG9nQ2xhc3MsIERpYWxvZ0ludGVyZmFjZX0gZnJvbSAnLi9tb2RlbCc7XG5cbkBJbmplY3RhYmxlKHtcblx0cHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIERpYWxvZ0NvbmZpZ1NlcnZpY2Uge1xuXG5cdGF1dGhvckNvbmZpZzogRGlhbG9nSW50ZXJmYWNlLklEaWFsb2dVc2VyQ29uZmlnICAgICA9IG5ldyBEaWFsb2dDbGFzcy5EaWFsb2dTZXR0aW5ncygpO1xuXHRwcm9kdWN0aW9uQ29uZmlnOiBEaWFsb2dJbnRlcmZhY2UuSURpYWxvZ1VzZXJDb25maWcgPSBuZXcgRGlhbG9nQ2xhc3MuRGlhbG9nU2V0dGluZ3MoKTtcblxuXHRjb25zdHJ1Y3RvcihASW5qZWN0KCdkaWFsb2dDb25maWcnKSBwcml2YXRlIHVzZXJDb25maWc6IERpYWxvZ0ludGVyZmFjZS5JRGlhbG9nVXNlckNvbmZpZyA9IHt9KSB7XG5cblx0XHQvLyByZWdpb24gKioqIGRpYWxvZyB1c2VyQ29uZmlnICh1c2VyIGlucHV0IGFwcC1tb2R1bGUpICoqKlxuXHRcdGNvbnN0IHVzZXJDb25maWdCYXNlID0gbmV3IERpYWxvZ0NsYXNzLkRpYWxvZ1NldHRpbmdzKCk7XG5cdFx0Y29uc3QgZGF0YUNvbnRyb2wgICAgPSBuZXcgR2xvYmFsQ2xhc3MuRGF0YUNvbnRyb2woKTtcblx0XHRkYXRhQ29udHJvbC5jb3B5VmFsdWVzRnJvbSh1c2VyQ29uZmlnLkRpYWxvZ0NvcmVDb25maWcsIHVzZXJDb25maWdCYXNlLkRpYWxvZ0NvcmVDb25maWcpOyAvLyB0aGlzIHdpbGwgbWFrZSBzdXJlIHRoYXQgb2JqZWN0IGhhcyByaWdodCBwcm9wZXJ0aWVzXG5cdFx0dXNlckNvbmZpZy5EaWFsb2dDb3JlQ29uZmlnID0gdXNlckNvbmZpZ0Jhc2UuRGlhbG9nQ29yZUNvbmZpZztcblxuXHRcdGlmICh1c2VyQ29uZmlnLkRpYWxvZ0NvcmVDb25maWcuTG9hZGVyQ29tcG9uZW50ICE9PSBudWxsKSB7XG5cdFx0XHR1c2VyQ29uZmlnLkRpYWxvZ0NvcmVDb25maWcuRGlzcGxheUxvYWRlciA9IHVzZXJDb25maWcuRGlhbG9nQ29yZUNvbmZpZy5EaXNwbGF5TG9hZGVyID09PSBudWxsO1xuXHRcdH1cblx0XHQvLyBlbmRyZWdpb25cblxuXHRcdC8vIHJlZ2lvbiAqKiogYXV0aG9yIGRlZmF1bHQgY29uZmlnIHZhbHVlcyAoaWYgdGhlcmUgaXMgbm8gdXNlciBpbnB1dCkgKioqXG5cdFx0dGhpcy5hdXRob3JDb25maWcuRGlhbG9nQ29yZUNvbmZpZy5XaWR0aCAgICAgICAgICAgPSAnYXV0byc7XG5cdFx0dGhpcy5hdXRob3JDb25maWcuRGlhbG9nQ29yZUNvbmZpZy5IZWlnaHQgICAgICAgICAgPSAnYXV0byc7XG5cdFx0dGhpcy5hdXRob3JDb25maWcuRGlhbG9nQ29yZUNvbmZpZy5CdXR0b25Qb3NpdGlvbiAgPSAncmlnaHQnO1xuXHRcdHRoaXMuYXV0aG9yQ29uZmlnLkRpYWxvZ0NvcmVDb25maWcuRGlzcGxheUxvYWRlciAgID0gZmFsc2U7XG5cdFx0dGhpcy5hdXRob3JDb25maWcuRGlhbG9nQ29yZUNvbmZpZy5MYXlvdXRUeXBlICAgICAgPSBEaWFsb2dMYXlvdXREaXNwbGF5Lk5PTkU7XG5cdFx0dGhpcy5hdXRob3JDb25maWcuRGlhbG9nQ29yZUNvbmZpZy5Mb2FkZXJDb21wb25lbnQgPSBEZWZhdWx0TG9hZGVyQ29tcG9uZW50O1xuXHRcdC8vIGVuZHJlZ2lvblxuXG5cdFx0ZGF0YUNvbnRyb2wuY29weVZhbHVlc0Zyb20odGhpcy5hdXRob3JDb25maWcuRGlhbG9nQ29yZUNvbmZpZywgdGhpcy5wcm9kdWN0aW9uQ29uZmlnLkRpYWxvZ0NvcmVDb25maWcpO1xuXHRcdGRhdGFDb250cm9sLmNvcHlWYWx1ZXNGcm9tKHVzZXJDb25maWcuRGlhbG9nQ29yZUNvbmZpZywgdGhpcy5wcm9kdWN0aW9uQ29uZmlnLkRpYWxvZ0NvcmVDb25maWcpO1xuXG5cdFx0Ly8gQnV0dG9uc1xuXHRcdC8qaWYodXNlckNvbmZpZy5CdXR0b25zKXtcblx0XHRcdHRoaXMuY29uZmlnLkJ1dHRvbnMucHVzaChcblx0XHRcdFx0bmV3IEJ1dHRvbk1ha2VyKCdPaycsICdvaycsIEJ1dHRvbkxheW91dERpc3BsYXkuUFJJTUFSWSlcblx0XHRcdFx0LG5ldyBCdXR0b25NYWtlcignQ2FuY2VsJywgJ2NhbmNlbCcsIEJ1dHRvbkxheW91dERpc3BsYXkuU0VDT05EQVJZKVxuXHRcdFx0KTtcblx0XHR9Ki9cblxuXHR9XG59XG4iXX0=