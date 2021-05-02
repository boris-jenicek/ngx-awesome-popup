import { CommonModule } from '@angular/common';
import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GlobalConfigService } from './core/global-config.service';
import { InsertionLoaderDirective } from './core/insertion-loader.directive';
import { InsertionDirective } from './core/insertion.directive';
import { DefaultLoaderComponent } from './default-loader/default-loader.component';
import { ServiceLocator } from './locator.service';
import { ConfirmBoxWrapperComponent } from './types/confirm-box/confirm-box-wrapper/confirm-box-wrapper.component';
import { ConfirmBoxConfigService } from './types/confirm-box/core/confirm-box-config.service';
import { ConfirmBoxService } from './types/confirm-box/core/confirm-box-service';
import { ConfirmBoxClass } from './types/confirm-box/core/model';
import { DialogConfigService } from './types/dialog/core/dialog-config.service';
import { DialogService } from './types/dialog/core/dialog.service';
import { DialogClass } from './types/dialog/core/model';
import { DialogWrapperComponent } from './types/dialog/dialog-wrapper/dialog-wrapper.component';
import { ToastNotificationClass } from './types/toast-notification/core/model';
import { ToastNotificationConfigService } from './types/toast-notification/core/toast-notification-config.service';
import { ToastNotificationService } from './types/toast-notification/core/toast-notification.service';
import { ToastNotificationSimpleWrapperComponent } from './types/toast-notification/toast-notification-simple-wrapper/toast-notification-simple-wrapper.component';
import { ToastNotificationWrapperComponent } from './types/toast-notification/toast-notification-wrapper/toast-notification-wrapper.component';
export class NgxAwesomePopupModule {
    constructor(injector, gConfigService) {
        this.injector = injector;
        this.gConfigService = gConfigService;
        ServiceLocator.injector = injector;
    }
    static forRoot(globalConfig) {
        return {
            ngModule: NgxAwesomePopupModule,
            providers: [GlobalConfigService, { provide: 'globalConfig', useValue: globalConfig }]
        };
    }
}
NgxAwesomePopupModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    DialogWrapperComponent,
                    InsertionDirective,
                    InsertionLoaderDirective,
                    DefaultLoaderComponent,
                    ConfirmBoxWrapperComponent,
                    ToastNotificationWrapperComponent,
                    ToastNotificationSimpleWrapperComponent
                ],
                imports: [
                    CommonModule,
                    BrowserModule,
                    BrowserAnimationsModule
                ],
                providers: [
                    DialogService,
                    ConfirmBoxService,
                    ToastNotificationService,
                    GlobalConfigService,
                    DialogConfigService,
                    ConfirmBoxConfigService,
                    ToastNotificationConfigService,
                    DialogClass.DialogBelonging,
                    ConfirmBoxClass.ConfirmBoxBelonging,
                    ToastNotificationClass.ToastNotificationBelonging
                ],
                entryComponents: [
                    DialogWrapperComponent,
                    DefaultLoaderComponent,
                    ConfirmBoxWrapperComponent,
                    ToastNotificationWrapperComponent,
                    ToastNotificationSimpleWrapperComponent
                ]
            },] }
];
NgxAwesomePopupModule.ctorParameters = () => [
    { type: Injector },
    { type: GlobalConfigService }
];
export class DialogConfigModule {
    static forRoot(dialogConfig) {
        return {
            ngModule: DialogConfigModule,
            providers: [DialogConfigService, { provide: 'dialogConfig', useValue: dialogConfig }]
        };
    }
}
DialogConfigModule.decorators = [
    { type: NgModule, args: [{},] }
];
export class ConfirmBoxConfigModule {
    static forRoot(confirmBoxConfig) {
        return {
            ngModule: ConfirmBoxConfigModule,
            providers: [ConfirmBoxConfigService, { provide: 'confirmBoxConfig', useValue: confirmBoxConfig }]
        };
    }
}
ConfirmBoxConfigModule.decorators = [
    { type: NgModule, args: [{},] }
];
export class ToastNotificationConfigModule {
    static forRoot(toastNotificationConfig) {
        return {
            ngModule: ToastNotificationConfigModule,
            providers: [ToastNotificationConfigService, { provide: 'toastNotificationConfig', useValue: toastNotificationConfig }]
        };
    }
}
ToastNotificationConfigModule.decorators = [
    { type: NgModule, args: [{},] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWF3ZXNvbWUtcG9wdXAubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbmd4LWF3ZXNvbWUtcG9wdXAvbmd4LWF3ZXNvbWUtcG9wdXAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsUUFBUSxFQUF1QixRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdEUsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ3hELE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBRTdFLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQ2pFLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLG1DQUFtQyxDQUFDO0FBQzNFLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQzlELE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLDJDQUEyQyxDQUFDO0FBQ2pGLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsMEJBQTBCLEVBQUMsTUFBTSx1RUFBdUUsQ0FBQztBQUNqSCxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxxREFBcUQsQ0FBQztBQUM1RixPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSw4Q0FBOEMsQ0FBQztBQUMvRSxPQUFPLEVBQUMsZUFBZSxFQUFzQixNQUFNLGdDQUFnQyxDQUFDO0FBQ3BGLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLDJDQUEyQyxDQUFDO0FBQzlFLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxvQ0FBb0MsQ0FBQztBQUNqRSxPQUFPLEVBQUMsV0FBVyxFQUFrQixNQUFNLDJCQUEyQixDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLHdEQUF3RCxDQUFDO0FBQzlGLE9BQU8sRUFBQyxzQkFBc0IsRUFBNkIsTUFBTSx1Q0FBdUMsQ0FBQztBQUN6RyxPQUFPLEVBQUMsOEJBQThCLEVBQUMsTUFBTSxtRUFBbUUsQ0FBQztBQUNqSCxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSw0REFBNEQsQ0FBQztBQUNwRyxPQUFPLEVBQUMsdUNBQXVDLEVBQUMsTUFBTSwwR0FBMEcsQ0FBQztBQUNqSyxPQUFPLEVBQUMsaUNBQWlDLEVBQUMsTUFBTSw0RkFBNEYsQ0FBQztBQXNDN0ksTUFBTSxPQUFPLHFCQUFxQjtJQUNqQyxZQUNTLFFBQWtCLEVBQ2xCLGNBQW1DO1FBRG5DLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsbUJBQWMsR0FBZCxjQUFjLENBQXFCO1FBRTNDLGNBQWMsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQ3BDLENBQUM7SUFFRCxNQUFNLENBQUMsT0FBTyxDQUFDLFlBQWdEO1FBQzlELE9BQU87WUFDTixRQUFRLEVBQUcscUJBQXFCO1lBQ2hDLFNBQVMsRUFBRSxDQUFDLG1CQUFtQixFQUFFLEVBQUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFDLENBQUM7U0FFbkYsQ0FBQztJQUNILENBQUM7OztZQWxERCxRQUFRLFNBQUM7Z0JBQ1QsWUFBWSxFQUFLO29CQUNoQixzQkFBc0I7b0JBQ3RCLGtCQUFrQjtvQkFDbEIsd0JBQXdCO29CQUN4QixzQkFBc0I7b0JBQ3RCLDBCQUEwQjtvQkFDMUIsaUNBQWlDO29CQUNqQyx1Q0FBdUM7aUJBQ3ZDO2dCQUNELE9BQU8sRUFBVTtvQkFDaEIsWUFBWTtvQkFDWixhQUFhO29CQUNiLHVCQUF1QjtpQkFDdkI7Z0JBQ0QsU0FBUyxFQUFRO29CQUNoQixhQUFhO29CQUNiLGlCQUFpQjtvQkFDakIsd0JBQXdCO29CQUN4QixtQkFBbUI7b0JBQ25CLG1CQUFtQjtvQkFDbkIsdUJBQXVCO29CQUN2Qiw4QkFBOEI7b0JBQzlCLFdBQVcsQ0FBQyxlQUFlO29CQUMzQixlQUFlLENBQUMsbUJBQW1CO29CQUNuQyxzQkFBc0IsQ0FBQywwQkFBMEI7aUJBQ2pEO2dCQUNELGVBQWUsRUFBRTtvQkFDaEIsc0JBQXNCO29CQUN0QixzQkFBc0I7b0JBQ3RCLDBCQUEwQjtvQkFDMUIsaUNBQWlDO29CQUNqQyx1Q0FBdUM7aUJBQ3ZDO2FBQ0Q7OztZQXpETyxRQUFRO1lBSVIsbUJBQW1COztBQTBFM0IsTUFBTSxPQUFPLGtCQUFrQjtJQUU5QixNQUFNLENBQUMsT0FBTyxDQUFDLFlBQWdEO1FBQzlELE9BQU87WUFDTixRQUFRLEVBQUcsa0JBQWtCO1lBQzdCLFNBQVMsRUFBRSxDQUFDLG1CQUFtQixFQUFFLEVBQUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFDLENBQUM7U0FFbkYsQ0FBQztJQUNILENBQUM7OztZQVRELFFBQVEsU0FBQyxFQUFFOztBQWFaLE1BQU0sT0FBTyxzQkFBc0I7SUFFbEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxnQkFBNEQ7UUFDMUUsT0FBTztZQUNOLFFBQVEsRUFBRyxzQkFBc0I7WUFDakMsU0FBUyxFQUFFLENBQUMsdUJBQXVCLEVBQUUsRUFBQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixFQUFDLENBQUM7U0FFL0YsQ0FBQztJQUNILENBQUM7OztZQVRELFFBQVEsU0FBQyxFQUFFOztBQWFaLE1BQU0sT0FBTyw2QkFBNkI7SUFFekMsTUFBTSxDQUFDLE9BQU8sQ0FBQyx1QkFBaUY7UUFDL0YsT0FBTztZQUNOLFFBQVEsRUFBRyw2QkFBNkI7WUFDeEMsU0FBUyxFQUFFLENBQUMsOEJBQThCLEVBQUUsRUFBQyxPQUFPLEVBQUUseUJBQXlCLEVBQUUsUUFBUSxFQUFFLHVCQUF1QixFQUFDLENBQUM7U0FFcEgsQ0FBQztJQUNILENBQUM7OztZQVRELFFBQVEsU0FBQyxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0luamVjdG9yLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Jyb3dzZXJNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHtCcm93c2VyQW5pbWF0aW9uc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7R2xvYmFsSW50ZXJmYWNlfSBmcm9tICcuL2NvcmUvZ2xvYmFsJztcbmltcG9ydCB7R2xvYmFsQ29uZmlnU2VydmljZX0gZnJvbSAnLi9jb3JlL2dsb2JhbC1jb25maWcuc2VydmljZSc7XG5pbXBvcnQge0luc2VydGlvbkxvYWRlckRpcmVjdGl2ZX0gZnJvbSAnLi9jb3JlL2luc2VydGlvbi1sb2FkZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7SW5zZXJ0aW9uRGlyZWN0aXZlfSBmcm9tICcuL2NvcmUvaW5zZXJ0aW9uLmRpcmVjdGl2ZSc7XG5pbXBvcnQge0RlZmF1bHRMb2FkZXJDb21wb25lbnR9IGZyb20gJy4vZGVmYXVsdC1sb2FkZXIvZGVmYXVsdC1sb2FkZXIuY29tcG9uZW50JztcbmltcG9ydCB7U2VydmljZUxvY2F0b3J9IGZyb20gJy4vbG9jYXRvci5zZXJ2aWNlJztcbmltcG9ydCB7Q29uZmlybUJveFdyYXBwZXJDb21wb25lbnR9IGZyb20gJy4vdHlwZXMvY29uZmlybS1ib3gvY29uZmlybS1ib3gtd3JhcHBlci9jb25maXJtLWJveC13cmFwcGVyLmNvbXBvbmVudCc7XG5pbXBvcnQge0NvbmZpcm1Cb3hDb25maWdTZXJ2aWNlfSBmcm9tICcuL3R5cGVzL2NvbmZpcm0tYm94L2NvcmUvY29uZmlybS1ib3gtY29uZmlnLnNlcnZpY2UnO1xuaW1wb3J0IHtDb25maXJtQm94U2VydmljZX0gZnJvbSAnLi90eXBlcy9jb25maXJtLWJveC9jb3JlL2NvbmZpcm0tYm94LXNlcnZpY2UnO1xuaW1wb3J0IHtDb25maXJtQm94Q2xhc3MsIENvbmZpcm1Cb3hJbnRlcmZhY2V9IGZyb20gJy4vdHlwZXMvY29uZmlybS1ib3gvY29yZS9tb2RlbCc7XG5pbXBvcnQge0RpYWxvZ0NvbmZpZ1NlcnZpY2V9IGZyb20gJy4vdHlwZXMvZGlhbG9nL2NvcmUvZGlhbG9nLWNvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7RGlhbG9nU2VydmljZX0gZnJvbSAnLi90eXBlcy9kaWFsb2cvY29yZS9kaWFsb2cuc2VydmljZSc7XG5pbXBvcnQge0RpYWxvZ0NsYXNzLCBEaWFsb2dJbnRlcmZhY2V9IGZyb20gJy4vdHlwZXMvZGlhbG9nL2NvcmUvbW9kZWwnO1xuaW1wb3J0IHtEaWFsb2dXcmFwcGVyQ29tcG9uZW50fSBmcm9tICcuL3R5cGVzL2RpYWxvZy9kaWFsb2ctd3JhcHBlci9kaWFsb2ctd3JhcHBlci5jb21wb25lbnQnO1xuaW1wb3J0IHtUb2FzdE5vdGlmaWNhdGlvbkNsYXNzLCBUb2FzdE5vdGlmaWNhdGlvbkludGVyZmFjZX0gZnJvbSAnLi90eXBlcy90b2FzdC1ub3RpZmljYXRpb24vY29yZS9tb2RlbCc7XG5pbXBvcnQge1RvYXN0Tm90aWZpY2F0aW9uQ29uZmlnU2VydmljZX0gZnJvbSAnLi90eXBlcy90b2FzdC1ub3RpZmljYXRpb24vY29yZS90b2FzdC1ub3RpZmljYXRpb24tY29uZmlnLnNlcnZpY2UnO1xuaW1wb3J0IHtUb2FzdE5vdGlmaWNhdGlvblNlcnZpY2V9IGZyb20gJy4vdHlwZXMvdG9hc3Qtbm90aWZpY2F0aW9uL2NvcmUvdG9hc3Qtbm90aWZpY2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHtUb2FzdE5vdGlmaWNhdGlvblNpbXBsZVdyYXBwZXJDb21wb25lbnR9IGZyb20gJy4vdHlwZXMvdG9hc3Qtbm90aWZpY2F0aW9uL3RvYXN0LW5vdGlmaWNhdGlvbi1zaW1wbGUtd3JhcHBlci90b2FzdC1ub3RpZmljYXRpb24tc2ltcGxlLXdyYXBwZXIuY29tcG9uZW50JztcbmltcG9ydCB7VG9hc3ROb3RpZmljYXRpb25XcmFwcGVyQ29tcG9uZW50fSBmcm9tICcuL3R5cGVzL3RvYXN0LW5vdGlmaWNhdGlvbi90b2FzdC1ub3RpZmljYXRpb24td3JhcHBlci90b2FzdC1ub3RpZmljYXRpb24td3JhcHBlci5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuXHRkZWNsYXJhdGlvbnMgICA6IFtcblx0XHREaWFsb2dXcmFwcGVyQ29tcG9uZW50LFxuXHRcdEluc2VydGlvbkRpcmVjdGl2ZSxcblx0XHRJbnNlcnRpb25Mb2FkZXJEaXJlY3RpdmUsXG5cdFx0RGVmYXVsdExvYWRlckNvbXBvbmVudCxcblx0XHRDb25maXJtQm94V3JhcHBlckNvbXBvbmVudCxcblx0XHRUb2FzdE5vdGlmaWNhdGlvbldyYXBwZXJDb21wb25lbnQsXG5cdFx0VG9hc3ROb3RpZmljYXRpb25TaW1wbGVXcmFwcGVyQ29tcG9uZW50XG5cdF0sXG5cdGltcG9ydHMgICAgICAgIDogW1xuXHRcdENvbW1vbk1vZHVsZSxcblx0XHRCcm93c2VyTW9kdWxlLFxuXHRcdEJyb3dzZXJBbmltYXRpb25zTW9kdWxlXG5cdF0sXG5cdHByb3ZpZGVycyAgICAgIDogW1xuXHRcdERpYWxvZ1NlcnZpY2UsXG5cdFx0Q29uZmlybUJveFNlcnZpY2UsXG5cdFx0VG9hc3ROb3RpZmljYXRpb25TZXJ2aWNlLFxuXHRcdEdsb2JhbENvbmZpZ1NlcnZpY2UsXG5cdFx0RGlhbG9nQ29uZmlnU2VydmljZSxcblx0XHRDb25maXJtQm94Q29uZmlnU2VydmljZSxcblx0XHRUb2FzdE5vdGlmaWNhdGlvbkNvbmZpZ1NlcnZpY2UsXG5cdFx0RGlhbG9nQ2xhc3MuRGlhbG9nQmVsb25naW5nLFxuXHRcdENvbmZpcm1Cb3hDbGFzcy5Db25maXJtQm94QmVsb25naW5nLFxuXHRcdFRvYXN0Tm90aWZpY2F0aW9uQ2xhc3MuVG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmdcblx0XSxcblx0ZW50cnlDb21wb25lbnRzOiBbXG5cdFx0RGlhbG9nV3JhcHBlckNvbXBvbmVudCxcblx0XHREZWZhdWx0TG9hZGVyQ29tcG9uZW50LFxuXHRcdENvbmZpcm1Cb3hXcmFwcGVyQ29tcG9uZW50LFxuXHRcdFRvYXN0Tm90aWZpY2F0aW9uV3JhcHBlckNvbXBvbmVudCxcblx0XHRUb2FzdE5vdGlmaWNhdGlvblNpbXBsZVdyYXBwZXJDb21wb25lbnRcblx0XVxufSlcblxuZXhwb3J0IGNsYXNzIE5neEF3ZXNvbWVQb3B1cE1vZHVsZSB7XG5cdGNvbnN0cnVjdG9yKFxuXHRcdHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLFxuXHRcdHByaXZhdGUgZ0NvbmZpZ1NlcnZpY2U6IEdsb2JhbENvbmZpZ1NlcnZpY2Vcblx0KSB7XG5cdFx0U2VydmljZUxvY2F0b3IuaW5qZWN0b3IgPSBpbmplY3Rvcjtcblx0fVxuXG5cdHN0YXRpYyBmb3JSb290KGdsb2JhbENvbmZpZz86IEdsb2JhbEludGVyZmFjZS5JR2xvYmFsVXNlckNvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnM8Tmd4QXdlc29tZVBvcHVwTW9kdWxlPiB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdG5nTW9kdWxlIDogTmd4QXdlc29tZVBvcHVwTW9kdWxlLFxuXHRcdFx0cHJvdmlkZXJzOiBbR2xvYmFsQ29uZmlnU2VydmljZSwge3Byb3ZpZGU6ICdnbG9iYWxDb25maWcnLCB1c2VWYWx1ZTogZ2xvYmFsQ29uZmlnfV1cblxuXHRcdH07XG5cdH1cblxufVxuXG5ATmdNb2R1bGUoe30pXG5leHBvcnQgY2xhc3MgRGlhbG9nQ29uZmlnTW9kdWxlIHtcblxuXHRzdGF0aWMgZm9yUm9vdChkaWFsb2dDb25maWc/OiBEaWFsb2dJbnRlcmZhY2UuSURpYWxvZ1VzZXJDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPERpYWxvZ0NvbmZpZ01vZHVsZT4ge1xuXHRcdHJldHVybiB7XG5cdFx0XHRuZ01vZHVsZSA6IERpYWxvZ0NvbmZpZ01vZHVsZSxcblx0XHRcdHByb3ZpZGVyczogW0RpYWxvZ0NvbmZpZ1NlcnZpY2UsIHtwcm92aWRlOiAnZGlhbG9nQ29uZmlnJywgdXNlVmFsdWU6IGRpYWxvZ0NvbmZpZ31dXG5cblx0XHR9O1xuXHR9XG59XG5cbkBOZ01vZHVsZSh7fSlcbmV4cG9ydCBjbGFzcyBDb25maXJtQm94Q29uZmlnTW9kdWxlIHtcblxuXHRzdGF0aWMgZm9yUm9vdChjb25maXJtQm94Q29uZmlnPzogQ29uZmlybUJveEludGVyZmFjZS5JQ29uZmlybUJveFVzZXJDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPENvbmZpcm1Cb3hDb25maWdNb2R1bGU+IHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0bmdNb2R1bGUgOiBDb25maXJtQm94Q29uZmlnTW9kdWxlLFxuXHRcdFx0cHJvdmlkZXJzOiBbQ29uZmlybUJveENvbmZpZ1NlcnZpY2UsIHtwcm92aWRlOiAnY29uZmlybUJveENvbmZpZycsIHVzZVZhbHVlOiBjb25maXJtQm94Q29uZmlnfV1cblxuXHRcdH07XG5cdH1cbn1cblxuQE5nTW9kdWxlKHt9KVxuZXhwb3J0IGNsYXNzIFRvYXN0Tm90aWZpY2F0aW9uQ29uZmlnTW9kdWxlIHtcblxuXHRzdGF0aWMgZm9yUm9vdCh0b2FzdE5vdGlmaWNhdGlvbkNvbmZpZz86IFRvYXN0Tm90aWZpY2F0aW9uSW50ZXJmYWNlLklUb2FzdE5vdGlmaWNhdGlvblVzZXJDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFRvYXN0Tm90aWZpY2F0aW9uQ29uZmlnTW9kdWxlPiB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdG5nTW9kdWxlIDogVG9hc3ROb3RpZmljYXRpb25Db25maWdNb2R1bGUsXG5cdFx0XHRwcm92aWRlcnM6IFtUb2FzdE5vdGlmaWNhdGlvbkNvbmZpZ1NlcnZpY2UsIHtwcm92aWRlOiAndG9hc3ROb3RpZmljYXRpb25Db25maWcnLCB1c2VWYWx1ZTogdG9hc3ROb3RpZmljYXRpb25Db25maWd9XVxuXG5cdFx0fTtcblx0fVxufVxuIl19