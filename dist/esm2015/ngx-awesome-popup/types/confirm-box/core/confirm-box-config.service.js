import * as i0 from '@angular/core';
import {Inject, Injectable} from '@angular/core';
import {ConfirmBoxClass} from './model';
import {GlobalClass} from '../../../core/global';
import {DialogLayoutDisplay} from '../../../core/enums';

export class ConfirmBoxConfigService {
    constructor(userConfig = {}) {
        this.userConfig       = userConfig;
        this.authorConfig     = new ConfirmBoxClass.Settings();
        this.productionConfig = new ConfirmBoxClass.Settings();
        // region *** confirmBox userConfig (user input app-module) ***
        const userConfigBase  = new ConfirmBoxClass.Settings();
        const dataControl     = new GlobalClass.DataControl();
        dataControl.copyValuesFrom(userConfig.ConfirmBoxCoreConfig, userConfigBase.ConfirmBoxCoreConfig); // this will make sure that object has right properties
        userConfig.ConfirmBoxCoreConfig = userConfigBase.ConfirmBoxCoreConfig;
        // endregion
        // region *** author default config values (if there is no user input) ***
        this.authorConfig.ConfirmBoxCoreConfig.Width            = 'auto';
        this.authorConfig.ConfirmBoxCoreConfig.Height           = 'auto';
        this.authorConfig.ConfirmBoxCoreConfig.ButtonPosition   = 'center';
        this.authorConfig.ConfirmBoxCoreConfig.ConfirmLabel     = 'Confirm';
        this.authorConfig.ConfirmBoxCoreConfig.DeclineLabel     = 'Decline';
        this.authorConfig.ConfirmBoxCoreConfig.DisableIcon      = false;
        this.authorConfig.ConfirmBoxCoreConfig.AllowHTMLMessage = false;
        this.authorConfig.ConfirmBoxCoreConfig.LayoutType       = DialogLayoutDisplay.NONE;
        // endregion
        // region *** Production setup ***
        dataControl.copyValuesFrom(this.authorConfig.ConfirmBoxCoreConfig, this.productionConfig.ConfirmBoxCoreConfig);
        dataControl.copyValuesFrom(userConfig.ConfirmBoxCoreConfig, this.productionConfig.ConfirmBoxCoreConfig);
        // endregion
    }
}

ConfirmBoxConfigService.ɵprov          = i0.ɵɵdefineInjectable({
    factory: function ConfirmBoxConfigService_Factory() { return new ConfirmBoxConfigService(i0.ɵɵinject("confirmBoxConfig")); },
    token: ConfirmBoxConfigService,
    providedIn: "root"
});
ConfirmBoxConfigService.decorators     = [
    {
        type: Injectable, args: [{
            providedIn: 'root'
        },]
    }
];
ConfirmBoxConfigService.ctorParameters = () => [
    {type: undefined, decorators: [{type: Inject, args: ['confirmBoxConfig',]}]}
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlybS1ib3gtY29uZmlnLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9uZ3gtYXdlc29tZS1wb3B1cC90eXBlcy9jb25maXJtLWJveC9jb3JlL2NvbmZpcm0tYm94LWNvbmZpZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBQyxlQUFlLEVBQXNCLE1BQU0sU0FBUyxDQUFDO0FBQzdELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNqRCxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQzs7QUFLeEQsTUFBTSxPQUFPLHVCQUF1QjtJQUtoQyxZQUFnRCxhQUF3RCxFQUFFO1FBQTFELGVBQVUsR0FBVixVQUFVLENBQWdEO1FBSDFHLGlCQUFZLEdBQWtELElBQUksZUFBZSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzdGLHFCQUFnQixHQUE4QyxJQUFJLGVBQWUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUl6RiwrREFBK0Q7UUFDL0QsTUFBTSxjQUFjLEdBQUcsSUFBSSxlQUFlLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDdEQsTUFBTSxXQUFXLEdBQU0sSUFBSSxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDckQsV0FBVyxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsb0JBQW9CLEVBQUUsY0FBYyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyx1REFBdUQ7UUFDekosVUFBVSxDQUFDLG9CQUFvQixHQUFHLGNBQWMsQ0FBQyxvQkFBb0IsQ0FBQztRQUN0RSxZQUFZO1FBRVosMEVBQTBFO1FBQzFFLElBQUksQ0FBQyxZQUFZLENBQUMsb0JBQW9CLENBQUMsS0FBSyxHQUFZLE1BQU0sQ0FBQztRQUMvRCxJQUFJLENBQUMsWUFBWSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sR0FBVyxNQUFNLENBQUM7UUFDL0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQyxjQUFjLEdBQUcsUUFBUSxDQUFDO1FBQ2pFLElBQUksQ0FBQyxZQUFZLENBQUMsb0JBQW9CLENBQUMsWUFBWSxHQUFLLFNBQVMsQ0FBQztRQUNsRSxJQUFJLENBQUMsWUFBWSxDQUFDLG9CQUFvQixDQUFDLFlBQVksR0FBSyxTQUFTLENBQUM7UUFDbEUsSUFBSSxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLEdBQUssS0FBSyxDQUFDO1FBQzdELElBQUksQ0FBQyxZQUFZLENBQUMsb0JBQW9CLENBQUMsZ0JBQWdCLEdBQUssS0FBSyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxZQUFZLENBQUMsb0JBQW9CLENBQUMsVUFBVSxHQUFPLG1CQUFtQixDQUFDLElBQUksQ0FBQztRQUVqRixZQUFZO1FBRVosa0NBQWtDO1FBQ2xDLFdBQVcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUMvRyxXQUFXLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUN4RyxZQUFZO0lBRWhCLENBQUM7Ozs7WUFsQ0osVUFBVSxTQUFDO2dCQUNSLFVBQVUsRUFBRSxNQUFNO2FBQ3JCOzs7NENBTWdCLE1BQU0sU0FBQyxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbmZpcm1Cb3hDbGFzcywgQ29uZmlybUJveEludGVyZmFjZX0gZnJvbSAnLi9tb2RlbCc7XG5pbXBvcnQge0dsb2JhbENsYXNzfSBmcm9tICcuLi8uLi8uLi9jb3JlL2dsb2JhbCc7XG5pbXBvcnQge0RpYWxvZ0xheW91dERpc3BsYXl9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW51bXMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIENvbmZpcm1Cb3hDb25maWdTZXJ2aWNlIHtcbiAgICBcbiAgICBhdXRob3JDb25maWc6IENvbmZpcm1Cb3hJbnRlcmZhY2UuSUNvbmZpcm1Cb3hVc2VyQ29uZmlnICAgICA9IG5ldyBDb25maXJtQm94Q2xhc3MuU2V0dGluZ3MoKTtcbiAgICBwcm9kdWN0aW9uQ29uZmlnOiBDb25maXJtQm94SW50ZXJmYWNlLklDb25maXJtQm94VXNlckNvbmZpZyA9IG5ldyBDb25maXJtQm94Q2xhc3MuU2V0dGluZ3MoKTtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KCdjb25maXJtQm94Q29uZmlnJykgcHJpdmF0ZSB1c2VyQ29uZmlnOiBDb25maXJtQm94SW50ZXJmYWNlLklDb25maXJtQm94VXNlckNvbmZpZyA9IHt9KSB7XG4gICAgICAgIFxuICAgICAgICAvLyByZWdpb24gKioqIGNvbmZpcm1Cb3ggdXNlckNvbmZpZyAodXNlciBpbnB1dCBhcHAtbW9kdWxlKSAqKipcbiAgICAgICAgY29uc3QgdXNlckNvbmZpZ0Jhc2UgPSBuZXcgQ29uZmlybUJveENsYXNzLlNldHRpbmdzKCk7XG4gICAgICAgIGNvbnN0IGRhdGFDb250cm9sICAgID0gbmV3IEdsb2JhbENsYXNzLkRhdGFDb250cm9sKCk7XG4gICAgICAgIGRhdGFDb250cm9sLmNvcHlWYWx1ZXNGcm9tKHVzZXJDb25maWcuQ29uZmlybUJveENvcmVDb25maWcsIHVzZXJDb25maWdCYXNlLkNvbmZpcm1Cb3hDb3JlQ29uZmlnKTsgLy8gdGhpcyB3aWxsIG1ha2Ugc3VyZSB0aGF0IG9iamVjdCBoYXMgcmlnaHQgcHJvcGVydGllc1xuICAgICAgICB1c2VyQ29uZmlnLkNvbmZpcm1Cb3hDb3JlQ29uZmlnID0gdXNlckNvbmZpZ0Jhc2UuQ29uZmlybUJveENvcmVDb25maWc7XG4gICAgICAgIC8vIGVuZHJlZ2lvblxuICAgICAgICBcbiAgICAgICAgLy8gcmVnaW9uICoqKiBhdXRob3IgZGVmYXVsdCBjb25maWcgdmFsdWVzIChpZiB0aGVyZSBpcyBubyB1c2VyIGlucHV0KSAqKipcbiAgICAgICAgdGhpcy5hdXRob3JDb25maWcuQ29uZmlybUJveENvcmVDb25maWcuV2lkdGggICAgICAgICAgPSAnYXV0byc7XG4gICAgICAgIHRoaXMuYXV0aG9yQ29uZmlnLkNvbmZpcm1Cb3hDb3JlQ29uZmlnLkhlaWdodCAgICAgICAgID0gJ2F1dG8nO1xuICAgICAgICB0aGlzLmF1dGhvckNvbmZpZy5Db25maXJtQm94Q29yZUNvbmZpZy5CdXR0b25Qb3NpdGlvbiA9ICdjZW50ZXInO1xuICAgICAgICB0aGlzLmF1dGhvckNvbmZpZy5Db25maXJtQm94Q29yZUNvbmZpZy5Db25maXJtTGFiZWwgICA9ICdDb25maXJtJztcbiAgICAgICAgdGhpcy5hdXRob3JDb25maWcuQ29uZmlybUJveENvcmVDb25maWcuRGVjbGluZUxhYmVsICAgPSAnRGVjbGluZSc7XG4gICAgICAgIHRoaXMuYXV0aG9yQ29uZmlnLkNvbmZpcm1Cb3hDb3JlQ29uZmlnLkRpc2FibGVJY29uICAgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5hdXRob3JDb25maWcuQ29uZmlybUJveENvcmVDb25maWcuQWxsb3dIVE1MTWVzc2FnZSAgID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYXV0aG9yQ29uZmlnLkNvbmZpcm1Cb3hDb3JlQ29uZmlnLkxheW91dFR5cGUgICAgID0gRGlhbG9nTGF5b3V0RGlzcGxheS5OT05FO1xuICAgICAgICBcbiAgICAgICAgLy8gZW5kcmVnaW9uXG4gICAgICAgIFxuICAgICAgICAvLyByZWdpb24gKioqIFByb2R1Y3Rpb24gc2V0dXAgKioqXG4gICAgICAgIGRhdGFDb250cm9sLmNvcHlWYWx1ZXNGcm9tKHRoaXMuYXV0aG9yQ29uZmlnLkNvbmZpcm1Cb3hDb3JlQ29uZmlnLCB0aGlzLnByb2R1Y3Rpb25Db25maWcuQ29uZmlybUJveENvcmVDb25maWcpO1xuICAgICAgICBkYXRhQ29udHJvbC5jb3B5VmFsdWVzRnJvbSh1c2VyQ29uZmlnLkNvbmZpcm1Cb3hDb3JlQ29uZmlnLCB0aGlzLnByb2R1Y3Rpb25Db25maWcuQ29uZmlybUJveENvcmVDb25maWcpO1xuICAgICAgICAvLyBlbmRyZWdpb25cbiAgICAgICAgXG4gICAgfVxufVxuIl19
