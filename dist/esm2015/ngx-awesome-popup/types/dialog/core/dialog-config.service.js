import { Inject, Injectable } from '@angular/core';
import { DialogClass } from './model';
import { DialogLayoutDisplay } from '../../../core/enums';
import { DefaultLoaderComponent } from '../../../default-loader/default-loader.component';
import { GlobalClass } from '../../../core/global';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLWNvbmZpZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbmd4LWF3ZXNvbWUtcG9wdXAvdHlwZXMvZGlhbG9nL2NvcmUvZGlhbG9nLWNvbmZpZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBQyxXQUFXLEVBQWtCLE1BQU0sU0FBUyxDQUFDO0FBQ3JELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3hELE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLGtEQUFrRCxDQUFDO0FBQ3hGLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQzs7QUFLakQsTUFBTSxPQUFPLG1CQUFtQjtJQUs1QixZQUE0QyxhQUFnRCxFQUFFO1FBQWxELGVBQVUsR0FBVixVQUFVLENBQXdDO1FBSDlGLGlCQUFZLEdBQTBDLElBQUksV0FBVyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZGLHFCQUFnQixHQUFzQyxJQUFJLFdBQVcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUluRiwyREFBMkQ7UUFDM0QsTUFBTSxjQUFjLEdBQUcsSUFBSSxXQUFXLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDeEQsTUFBTSxXQUFXLEdBQU0sSUFBSSxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDckQsV0FBVyxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLEVBQUUsY0FBYyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyx1REFBdUQ7UUFDakosVUFBVSxDQUFDLGdCQUFnQixHQUFHLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQztRQUU5RCxJQUFJLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLEtBQUssSUFBSSxFQUFFO1lBQ3RELFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsS0FBSyxJQUFJLENBQUM7U0FDbEc7UUFDRCxZQUFZO1FBRVosMEVBQTBFO1FBQzFFLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxHQUFhLE1BQU0sQ0FBQztRQUM1RCxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sR0FBWSxNQUFNLENBQUM7UUFDNUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLEdBQUksT0FBTyxDQUFDO1FBQzdELElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxHQUFLLEtBQUssQ0FBQztRQUMzRCxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsR0FBUSxtQkFBbUIsQ0FBQyxJQUFJLENBQUM7UUFDOUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLEdBQUcsc0JBQXNCLENBQUM7UUFDNUUsWUFBWTtRQUVaLFdBQVcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN2RyxXQUFXLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUVoRyxVQUFVO1FBQ1Y7Ozs7O1dBS0c7SUFFUCxDQUFDOzs7O1lBekNKLFVBQVUsU0FBQztnQkFDUixVQUFVLEVBQUUsTUFBTTthQUNyQjs7OzRDQU1nQixNQUFNLFNBQUMsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RGlhbG9nQ2xhc3MsIERpYWxvZ0ludGVyZmFjZX0gZnJvbSAnLi9tb2RlbCc7XG5pbXBvcnQge0RpYWxvZ0xheW91dERpc3BsYXl9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW51bXMnO1xuaW1wb3J0IHtEZWZhdWx0TG9hZGVyQ29tcG9uZW50fSBmcm9tICcuLi8uLi8uLi9kZWZhdWx0LWxvYWRlci9kZWZhdWx0LWxvYWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHtHbG9iYWxDbGFzc30gZnJvbSAnLi4vLi4vLi4vY29yZS9nbG9iYWwnO1xuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIERpYWxvZ0NvbmZpZ1NlcnZpY2Uge1xuICAgIFxuICAgIGF1dGhvckNvbmZpZzogRGlhbG9nSW50ZXJmYWNlLklEaWFsb2dVc2VyQ29uZmlnICAgICA9IG5ldyBEaWFsb2dDbGFzcy5EaWFsb2dTZXR0aW5ncygpO1xuICAgIHByb2R1Y3Rpb25Db25maWc6IERpYWxvZ0ludGVyZmFjZS5JRGlhbG9nVXNlckNvbmZpZyA9IG5ldyBEaWFsb2dDbGFzcy5EaWFsb2dTZXR0aW5ncygpO1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoJ2RpYWxvZ0NvbmZpZycpIHByaXZhdGUgdXNlckNvbmZpZzogRGlhbG9nSW50ZXJmYWNlLklEaWFsb2dVc2VyQ29uZmlnID0ge30pIHtcbiAgICAgICAgXG4gICAgICAgIC8vIHJlZ2lvbiAqKiogZGlhbG9nIHVzZXJDb25maWcgKHVzZXIgaW5wdXQgYXBwLW1vZHVsZSkgKioqXG4gICAgICAgIGNvbnN0IHVzZXJDb25maWdCYXNlID0gbmV3IERpYWxvZ0NsYXNzLkRpYWxvZ1NldHRpbmdzKCk7XG4gICAgICAgIGNvbnN0IGRhdGFDb250cm9sICAgID0gbmV3IEdsb2JhbENsYXNzLkRhdGFDb250cm9sKCk7XG4gICAgICAgIGRhdGFDb250cm9sLmNvcHlWYWx1ZXNGcm9tKHVzZXJDb25maWcuRGlhbG9nQ29yZUNvbmZpZywgdXNlckNvbmZpZ0Jhc2UuRGlhbG9nQ29yZUNvbmZpZyk7IC8vIHRoaXMgd2lsbCBtYWtlIHN1cmUgdGhhdCBvYmplY3QgaGFzIHJpZ2h0IHByb3BlcnRpZXNcbiAgICAgICAgdXNlckNvbmZpZy5EaWFsb2dDb3JlQ29uZmlnID0gdXNlckNvbmZpZ0Jhc2UuRGlhbG9nQ29yZUNvbmZpZztcbiAgICAgICAgXG4gICAgICAgIGlmICh1c2VyQ29uZmlnLkRpYWxvZ0NvcmVDb25maWcuTG9hZGVyQ29tcG9uZW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICB1c2VyQ29uZmlnLkRpYWxvZ0NvcmVDb25maWcuRGlzcGxheUxvYWRlciA9IHVzZXJDb25maWcuRGlhbG9nQ29yZUNvbmZpZy5EaXNwbGF5TG9hZGVyID09PSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIC8vIGVuZHJlZ2lvblxuICAgICAgICBcbiAgICAgICAgLy8gcmVnaW9uICoqKiBhdXRob3IgZGVmYXVsdCBjb25maWcgdmFsdWVzIChpZiB0aGVyZSBpcyBubyB1c2VyIGlucHV0KSAqKipcbiAgICAgICAgdGhpcy5hdXRob3JDb25maWcuRGlhbG9nQ29yZUNvbmZpZy5XaWR0aCAgICAgICAgICAgPSAnYXV0byc7XG4gICAgICAgIHRoaXMuYXV0aG9yQ29uZmlnLkRpYWxvZ0NvcmVDb25maWcuSGVpZ2h0ICAgICAgICAgID0gJ2F1dG8nO1xuICAgICAgICB0aGlzLmF1dGhvckNvbmZpZy5EaWFsb2dDb3JlQ29uZmlnLkJ1dHRvblBvc2l0aW9uICA9ICdyaWdodCc7XG4gICAgICAgIHRoaXMuYXV0aG9yQ29uZmlnLkRpYWxvZ0NvcmVDb25maWcuRGlzcGxheUxvYWRlciAgID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYXV0aG9yQ29uZmlnLkRpYWxvZ0NvcmVDb25maWcuTGF5b3V0VHlwZSAgICAgID0gRGlhbG9nTGF5b3V0RGlzcGxheS5OT05FO1xuICAgICAgICB0aGlzLmF1dGhvckNvbmZpZy5EaWFsb2dDb3JlQ29uZmlnLkxvYWRlckNvbXBvbmVudCA9IERlZmF1bHRMb2FkZXJDb21wb25lbnQ7XG4gICAgICAgIC8vIGVuZHJlZ2lvblxuICAgICAgICBcbiAgICAgICAgZGF0YUNvbnRyb2wuY29weVZhbHVlc0Zyb20odGhpcy5hdXRob3JDb25maWcuRGlhbG9nQ29yZUNvbmZpZywgdGhpcy5wcm9kdWN0aW9uQ29uZmlnLkRpYWxvZ0NvcmVDb25maWcpO1xuICAgICAgICBkYXRhQ29udHJvbC5jb3B5VmFsdWVzRnJvbSh1c2VyQ29uZmlnLkRpYWxvZ0NvcmVDb25maWcsIHRoaXMucHJvZHVjdGlvbkNvbmZpZy5EaWFsb2dDb3JlQ29uZmlnKTtcbiAgICAgICAgXG4gICAgICAgIC8vIEJ1dHRvbnNcbiAgICAgICAgLyppZih1c2VyQ29uZmlnLkJ1dHRvbnMpe1xuICAgICAgICAgICAgdGhpcy5jb25maWcuQnV0dG9ucy5wdXNoKFxuICAgICAgICAgICAgICAgIG5ldyBCdXR0b25NYWtlcignT2snLCAnb2snLCBCdXR0b25MYXlvdXREaXNwbGF5LlBSSU1BUlkpXG4gICAgICAgICAgICAgICAgLG5ldyBCdXR0b25NYWtlcignQ2FuY2VsJywgJ2NhbmNlbCcsIEJ1dHRvbkxheW91dERpc3BsYXkuU0VDT05EQVJZKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSovXG4gICAgICAgIFxuICAgIH1cbn1cbiJdfQ==