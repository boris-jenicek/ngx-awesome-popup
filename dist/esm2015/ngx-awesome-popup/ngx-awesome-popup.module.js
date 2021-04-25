import {Injector, NgModule} from '@angular/core';
import {DialogWrapperComponent} from './types/dialog/dialog-wrapper/dialog-wrapper.component';
import {InsertionDirective} from './core/insertion.directive';
import {InsertionLoaderDirective} from './core/insertion-loader.directive';
import {DefaultLoaderComponent} from './default-loader/default-loader.component';
import {ConfirmBoxWrapperComponent} from './types/confirm-box/confirm-box-wrapper/confirm-box-wrapper.component';
import {ToastNotificationWrapperComponent} from './types/toast-notification/toast-notification-wrapper/toast-notification-wrapper.component';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DialogService} from './types/dialog/core/dialog.service';
import {ConfirmBoxService} from './types/confirm-box/core/confirm-box-service';
import {ToastNotificationService} from './types/toast-notification/core/toast-notification.service';
import {GlobalConfigService} from './core/global-config.service';
import {ConfirmBoxConfigService} from './types/confirm-box/core/confirm-box-config.service';
import {DialogConfigService} from './types/dialog/core/dialog-config.service';
import {ToastNotificationConfigService} from './types/toast-notification/core/toast-notification-config.service';
import {ToastNotificationClass} from './types/toast-notification/core/model';
import {ConfirmBoxClass} from './types/confirm-box/core/model';
import {DialogClass} from './types/dialog/core/model';
import {ServiceLocator} from './locator.service';

export class NgxAwesomePopupModule {
    constructor(injector, gConfigService) {
        this.injector           = injector;
        this.gConfigService     = gConfigService;
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
                    ToastNotificationWrapperComponent
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
                    ToastNotificationWrapperComponent
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
            providers: [ToastNotificationConfigService, {
                provide: 'toastNotificationConfig',
                useValue: toastNotificationConfig
            }]
        };
    }
}

ToastNotificationConfigModule.decorators = [
    {type: NgModule, args: [{},]}
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWF3ZXNvbWUtcG9wdXAubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbmd4LWF3ZXNvbWUtcG9wdXAvbmd4LWF3ZXNvbWUtcG9wdXAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQXVCLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN0RSxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSx3REFBd0QsQ0FBQztBQUM5RixPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUM5RCxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUMzRSxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSwyQ0FBMkMsQ0FBQztBQUNqRixPQUFPLEVBQUMsMEJBQTBCLEVBQUMsTUFBTSx1RUFBdUUsQ0FBQztBQUNqSCxPQUFPLEVBQUMsaUNBQWlDLEVBQUMsTUFBTSw0RkFBNEYsQ0FBQztBQUM3SSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ3hELE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQzdFLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxvQ0FBb0MsQ0FBQztBQUNqRSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSw4Q0FBOEMsQ0FBQztBQUMvRSxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSw0REFBNEQsQ0FBQztBQUNwRyxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUNqRSxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxxREFBcUQsQ0FBQztBQUM1RixPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSwyQ0FBMkMsQ0FBQztBQUM5RSxPQUFPLEVBQUMsOEJBQThCLEVBQUMsTUFBTSxtRUFBbUUsQ0FBQztBQUNqSCxPQUFPLEVBQUMsc0JBQXNCLEVBQTZCLE1BQU0sdUNBQXVDLENBQUM7QUFDekcsT0FBTyxFQUFDLGVBQWUsRUFBc0IsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNwRixPQUFPLEVBQUMsV0FBVyxFQUFrQixNQUFNLDJCQUEyQixDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQXFDakQsTUFBTSxPQUFPLHFCQUFxQjtJQUM5QixZQUNZLFFBQWtCLEVBQ2xCLGNBQW1DO1FBRG5DLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsbUJBQWMsR0FBZCxjQUFjLENBQXFCO1FBRTNDLGNBQWMsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQ3ZDLENBQUM7SUFDRCxNQUFNLENBQUMsT0FBTyxDQUFDLFlBQWdEO1FBQzNELE9BQU87WUFDSCxRQUFRLEVBQUUscUJBQXFCO1lBQy9CLFNBQVMsRUFBRSxDQUFDLG1CQUFtQixFQUFFLEVBQUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFDLENBQUM7U0FFdEYsQ0FBQztJQUNOLENBQUM7OztZQS9DSixRQUFRLFNBQUM7Z0JBQ04sWUFBWSxFQUFFO29CQUNWLHNCQUFzQjtvQkFDdEIsa0JBQWtCO29CQUNsQix3QkFBd0I7b0JBQ3hCLHNCQUFzQjtvQkFDdEIsMEJBQTBCO29CQUMxQixpQ0FBaUM7aUJBQ3BDO2dCQUNELE9BQU8sRUFBTztvQkFDVixZQUFZO29CQUNaLGFBQWE7b0JBQ2IsdUJBQXVCO2lCQUMxQjtnQkFDRCxTQUFTLEVBQUs7b0JBQ1YsYUFBYTtvQkFDYixpQkFBaUI7b0JBQ2pCLHdCQUF3QjtvQkFDeEIsbUJBQW1CO29CQUNuQixtQkFBbUI7b0JBQ25CLHVCQUF1QjtvQkFDdkIsOEJBQThCO29CQUM5QixXQUFXLENBQUMsZUFBZTtvQkFDM0IsZUFBZSxDQUFDLG1CQUFtQjtvQkFDbkMsc0JBQXNCLENBQUMsMEJBQTBCO2lCQUNwRDtnQkFDRCxlQUFlLEVBQUU7b0JBQ2Isc0JBQXNCO29CQUN0QixzQkFBc0I7b0JBQ3RCLDBCQUEwQjtvQkFDMUIsaUNBQWlDO2lCQUNwQzthQUNKOzs7WUF2RE8sUUFBUTtZQWFSLG1CQUFtQjs7QUE4RDNCLE1BQU0sT0FBTyxrQkFBa0I7SUFFM0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFnRDtRQUMzRCxPQUFPO1lBQ0gsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixTQUFTLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxFQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBQyxDQUFDO1NBRXRGLENBQUM7SUFDTixDQUFDOzs7WUFUSixRQUFRLFNBQUMsRUFBRTs7QUFhWixNQUFNLE9BQU8sc0JBQXNCO0lBRS9CLE1BQU0sQ0FBQyxPQUFPLENBQUMsZ0JBQTREO1FBQ3ZFLE9BQU87WUFDSCxRQUFRLEVBQUUsc0JBQXNCO1lBQ2hDLFNBQVMsRUFBRSxDQUFDLHVCQUF1QixFQUFFLEVBQUMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBQyxDQUFDO1NBRWxHLENBQUM7SUFDTixDQUFDOzs7WUFUSixRQUFRLFNBQUMsRUFBRTs7QUFZWixNQUFNLE9BQU8sNkJBQTZCO0lBRXRDLE1BQU0sQ0FBQyxPQUFPLENBQUMsdUJBQWlGO1FBQzVGLE9BQU87WUFDSCxRQUFRLEVBQUUsNkJBQTZCO1lBQ3ZDLFNBQVMsRUFBRSxDQUFDLDhCQUE4QixFQUFFLEVBQUMsT0FBTyxFQUFFLHlCQUF5QixFQUFFLFFBQVEsRUFBRSx1QkFBdUIsRUFBQyxDQUFDO1NBRXZILENBQUM7SUFDTixDQUFDOzs7WUFUSixRQUFRLFNBQUMsRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0b3IsIE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RGlhbG9nV3JhcHBlckNvbXBvbmVudH0gZnJvbSAnLi90eXBlcy9kaWFsb2cvZGlhbG9nLXdyYXBwZXIvZGlhbG9nLXdyYXBwZXIuY29tcG9uZW50JztcbmltcG9ydCB7SW5zZXJ0aW9uRGlyZWN0aXZlfSBmcm9tICcuL2NvcmUvaW5zZXJ0aW9uLmRpcmVjdGl2ZSc7XG5pbXBvcnQge0luc2VydGlvbkxvYWRlckRpcmVjdGl2ZX0gZnJvbSAnLi9jb3JlL2luc2VydGlvbi1sb2FkZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7RGVmYXVsdExvYWRlckNvbXBvbmVudH0gZnJvbSAnLi9kZWZhdWx0LWxvYWRlci9kZWZhdWx0LWxvYWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHtDb25maXJtQm94V3JhcHBlckNvbXBvbmVudH0gZnJvbSAnLi90eXBlcy9jb25maXJtLWJveC9jb25maXJtLWJveC13cmFwcGVyL2NvbmZpcm0tYm94LXdyYXBwZXIuY29tcG9uZW50JztcbmltcG9ydCB7VG9hc3ROb3RpZmljYXRpb25XcmFwcGVyQ29tcG9uZW50fSBmcm9tICcuL3R5cGVzL3RvYXN0LW5vdGlmaWNhdGlvbi90b2FzdC1ub3RpZmljYXRpb24td3JhcHBlci90b2FzdC1ub3RpZmljYXRpb24td3JhcHBlci5jb21wb25lbnQnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0Jyb3dzZXJNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHtCcm93c2VyQW5pbWF0aW9uc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7RGlhbG9nU2VydmljZX0gZnJvbSAnLi90eXBlcy9kaWFsb2cvY29yZS9kaWFsb2cuc2VydmljZSc7XG5pbXBvcnQge0NvbmZpcm1Cb3hTZXJ2aWNlfSBmcm9tICcuL3R5cGVzL2NvbmZpcm0tYm94L2NvcmUvY29uZmlybS1ib3gtc2VydmljZSc7XG5pbXBvcnQge1RvYXN0Tm90aWZpY2F0aW9uU2VydmljZX0gZnJvbSAnLi90eXBlcy90b2FzdC1ub3RpZmljYXRpb24vY29yZS90b2FzdC1ub3RpZmljYXRpb24uc2VydmljZSc7XG5pbXBvcnQge0dsb2JhbENvbmZpZ1NlcnZpY2V9IGZyb20gJy4vY29yZS9nbG9iYWwtY29uZmlnLnNlcnZpY2UnO1xuaW1wb3J0IHtDb25maXJtQm94Q29uZmlnU2VydmljZX0gZnJvbSAnLi90eXBlcy9jb25maXJtLWJveC9jb3JlL2NvbmZpcm0tYm94LWNvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7RGlhbG9nQ29uZmlnU2VydmljZX0gZnJvbSAnLi90eXBlcy9kaWFsb2cvY29yZS9kaWFsb2ctY29uZmlnLnNlcnZpY2UnO1xuaW1wb3J0IHtUb2FzdE5vdGlmaWNhdGlvbkNvbmZpZ1NlcnZpY2V9IGZyb20gJy4vdHlwZXMvdG9hc3Qtbm90aWZpY2F0aW9uL2NvcmUvdG9hc3Qtbm90aWZpY2F0aW9uLWNvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7VG9hc3ROb3RpZmljYXRpb25DbGFzcywgVG9hc3ROb3RpZmljYXRpb25JbnRlcmZhY2V9IGZyb20gJy4vdHlwZXMvdG9hc3Qtbm90aWZpY2F0aW9uL2NvcmUvbW9kZWwnO1xuaW1wb3J0IHtDb25maXJtQm94Q2xhc3MsIENvbmZpcm1Cb3hJbnRlcmZhY2V9IGZyb20gJy4vdHlwZXMvY29uZmlybS1ib3gvY29yZS9tb2RlbCc7XG5pbXBvcnQge0RpYWxvZ0NsYXNzLCBEaWFsb2dJbnRlcmZhY2V9IGZyb20gJy4vdHlwZXMvZGlhbG9nL2NvcmUvbW9kZWwnO1xuaW1wb3J0IHtTZXJ2aWNlTG9jYXRvcn0gZnJvbSAnLi9sb2NhdG9yLnNlcnZpY2UnO1xuaW1wb3J0IHtHbG9iYWxJbnRlcmZhY2V9IGZyb20gJy4vY29yZS9nbG9iYWwnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBEaWFsb2dXcmFwcGVyQ29tcG9uZW50LFxuICAgICAgICBJbnNlcnRpb25EaXJlY3RpdmUsXG4gICAgICAgIEluc2VydGlvbkxvYWRlckRpcmVjdGl2ZSxcbiAgICAgICAgRGVmYXVsdExvYWRlckNvbXBvbmVudCxcbiAgICAgICAgQ29uZmlybUJveFdyYXBwZXJDb21wb25lbnQsXG4gICAgICAgIFRvYXN0Tm90aWZpY2F0aW9uV3JhcHBlckNvbXBvbmVudFxuICAgIF0sXG4gICAgaW1wb3J0cyAgICAgOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgQnJvd3Nlck1vZHVsZSxcbiAgICAgICAgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGVcbiAgICBdLFxuICAgIHByb3ZpZGVycyAgIDogW1xuICAgICAgICBEaWFsb2dTZXJ2aWNlLFxuICAgICAgICBDb25maXJtQm94U2VydmljZSxcbiAgICAgICAgVG9hc3ROb3RpZmljYXRpb25TZXJ2aWNlLFxuICAgICAgICBHbG9iYWxDb25maWdTZXJ2aWNlLFxuICAgICAgICBEaWFsb2dDb25maWdTZXJ2aWNlLFxuICAgICAgICBDb25maXJtQm94Q29uZmlnU2VydmljZSxcbiAgICAgICAgVG9hc3ROb3RpZmljYXRpb25Db25maWdTZXJ2aWNlLFxuICAgICAgICBEaWFsb2dDbGFzcy5EaWFsb2dCZWxvbmdpbmcsXG4gICAgICAgIENvbmZpcm1Cb3hDbGFzcy5Db25maXJtQm94QmVsb25naW5nLFxuICAgICAgICBUb2FzdE5vdGlmaWNhdGlvbkNsYXNzLlRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nXG4gICAgXSxcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICAgICAgRGlhbG9nV3JhcHBlckNvbXBvbmVudCxcbiAgICAgICAgRGVmYXVsdExvYWRlckNvbXBvbmVudCxcbiAgICAgICAgQ29uZmlybUJveFdyYXBwZXJDb21wb25lbnQsXG4gICAgICAgIFRvYXN0Tm90aWZpY2F0aW9uV3JhcHBlckNvbXBvbmVudFxuICAgIF1cbn0pXG5cbmV4cG9ydCBjbGFzcyBOZ3hBd2Vzb21lUG9wdXBNb2R1bGUge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgICAgICAgcHJpdmF0ZSBnQ29uZmlnU2VydmljZTogR2xvYmFsQ29uZmlnU2VydmljZVxuICAgICkge1xuICAgICAgICBTZXJ2aWNlTG9jYXRvci5pbmplY3RvciA9IGluamVjdG9yO1xuICAgIH1cbiAgICBzdGF0aWMgZm9yUm9vdChnbG9iYWxDb25maWc/OiBHbG9iYWxJbnRlcmZhY2UuSUdsb2JhbFVzZXJDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPE5neEF3ZXNvbWVQb3B1cE1vZHVsZT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmdNb2R1bGU6IE5neEF3ZXNvbWVQb3B1cE1vZHVsZSxcbiAgICAgICAgICAgIHByb3ZpZGVyczogW0dsb2JhbENvbmZpZ1NlcnZpY2UsIHtwcm92aWRlOiAnZ2xvYmFsQ29uZmlnJywgdXNlVmFsdWU6IGdsb2JhbENvbmZpZ31dXG4gICAgICAgICAgICBcbiAgICAgICAgfTtcbiAgICB9XG4gICAgXG59XG5cbkBOZ01vZHVsZSh7fSlcbmV4cG9ydCBjbGFzcyBEaWFsb2dDb25maWdNb2R1bGUge1xuICAgIFxuICAgIHN0YXRpYyBmb3JSb290KGRpYWxvZ0NvbmZpZz86IERpYWxvZ0ludGVyZmFjZS5JRGlhbG9nVXNlckNvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnM8RGlhbG9nQ29uZmlnTW9kdWxlPiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuZ01vZHVsZTogRGlhbG9nQ29uZmlnTW9kdWxlLFxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbRGlhbG9nQ29uZmlnU2VydmljZSwge3Byb3ZpZGU6ICdkaWFsb2dDb25maWcnLCB1c2VWYWx1ZTogZGlhbG9nQ29uZmlnfV1cbiAgICAgICAgICBcbiAgICAgICAgfTtcbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7fSlcbmV4cG9ydCBjbGFzcyBDb25maXJtQm94Q29uZmlnTW9kdWxlIHtcbiAgICBcbiAgICBzdGF0aWMgZm9yUm9vdChjb25maXJtQm94Q29uZmlnPzogQ29uZmlybUJveEludGVyZmFjZS5JQ29uZmlybUJveFVzZXJDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPENvbmZpcm1Cb3hDb25maWdNb2R1bGU+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5nTW9kdWxlOiBDb25maXJtQm94Q29uZmlnTW9kdWxlLFxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbQ29uZmlybUJveENvbmZpZ1NlcnZpY2UsIHtwcm92aWRlOiAnY29uZmlybUJveENvbmZpZycsIHVzZVZhbHVlOiBjb25maXJtQm94Q29uZmlnfV1cbiAgICAgICAgICAgIFxuICAgICAgICB9O1xuICAgIH1cbn1cbkBOZ01vZHVsZSh7fSlcbmV4cG9ydCBjbGFzcyBUb2FzdE5vdGlmaWNhdGlvbkNvbmZpZ01vZHVsZSB7XG4gICAgXG4gICAgc3RhdGljIGZvclJvb3QodG9hc3ROb3RpZmljYXRpb25Db25maWc/OiBUb2FzdE5vdGlmaWNhdGlvbkludGVyZmFjZS5JVG9hc3ROb3RpZmljYXRpb25Vc2VyQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVyczxUb2FzdE5vdGlmaWNhdGlvbkNvbmZpZ01vZHVsZT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmdNb2R1bGU6IFRvYXN0Tm90aWZpY2F0aW9uQ29uZmlnTW9kdWxlLFxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbVG9hc3ROb3RpZmljYXRpb25Db25maWdTZXJ2aWNlLCB7cHJvdmlkZTogJ3RvYXN0Tm90aWZpY2F0aW9uQ29uZmlnJywgdXNlVmFsdWU6IHRvYXN0Tm90aWZpY2F0aW9uQ29uZmlnfV1cbiAgICAgICAgICAgIFxuICAgICAgICB9O1xuICAgIH1cbn1cblxuXG4iXX0=
