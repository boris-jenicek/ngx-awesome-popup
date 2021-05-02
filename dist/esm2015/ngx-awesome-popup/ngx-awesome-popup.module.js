import { Injector, NgModule } from '@angular/core';
import { DialogWrapperComponent } from './types/dialog/dialog-wrapper/dialog-wrapper.component';
import { InsertionDirective } from './core/insertion.directive';
import { InsertionLoaderDirective } from './core/insertion-loader.directive';
import { DefaultLoaderComponent } from './default-loader/default-loader.component';
import { ConfirmBoxWrapperComponent } from './types/confirm-box/confirm-box-wrapper/confirm-box-wrapper.component';
import { ToastNotificationWrapperComponent } from './types/toast-notification/toast-notification-wrapper/toast-notification-wrapper.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogService } from './types/dialog/core/dialog.service';
import { ConfirmBoxService } from './types/confirm-box/core/confirm-box-service';
import { ToastNotificationService } from './types/toast-notification/core/toast-notification.service';
import { GlobalConfigService } from './core/global-config.service';
import { ConfirmBoxConfigService } from './types/confirm-box/core/confirm-box-config.service';
import { DialogConfigService } from './types/dialog/core/dialog-config.service';
import { ToastNotificationConfigService } from './types/toast-notification/core/toast-notification-config.service';
import { ToastNotificationClass } from './types/toast-notification/core/model';
import { ConfirmBoxClass } from './types/confirm-box/core/model';
import { DialogClass } from './types/dialog/core/model';
import { ServiceLocator } from './locator.service';
import { ToastNotificationSimpleWrapperComponent } from './types/toast-notification/toast-notification-simple-wrapper/toast-notification-simple-wrapper.component';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWF3ZXNvbWUtcG9wdXAubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbmd4LWF3ZXNvbWUtcG9wdXAvbmd4LWF3ZXNvbWUtcG9wdXAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQXVCLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN0RSxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSx3REFBd0QsQ0FBQztBQUM5RixPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUM5RCxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUMzRSxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSwyQ0FBMkMsQ0FBQztBQUNqRixPQUFPLEVBQUMsMEJBQTBCLEVBQUMsTUFBTSx1RUFBdUUsQ0FBQztBQUNqSCxPQUFPLEVBQUMsaUNBQWlDLEVBQUMsTUFBTSw0RkFBNEYsQ0FBQztBQUM3SSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ3hELE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQzdFLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxvQ0FBb0MsQ0FBQztBQUNqRSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSw4Q0FBOEMsQ0FBQztBQUMvRSxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSw0REFBNEQsQ0FBQztBQUNwRyxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUNqRSxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxxREFBcUQsQ0FBQztBQUM1RixPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSwyQ0FBMkMsQ0FBQztBQUM5RSxPQUFPLEVBQUMsOEJBQThCLEVBQUMsTUFBTSxtRUFBbUUsQ0FBQztBQUNqSCxPQUFPLEVBQUMsc0JBQXNCLEVBQTZCLE1BQU0sdUNBQXVDLENBQUM7QUFDekcsT0FBTyxFQUFDLGVBQWUsRUFBc0IsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNwRixPQUFPLEVBQUMsV0FBVyxFQUFrQixNQUFNLDJCQUEyQixDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUVqRCxPQUFPLEVBQUUsdUNBQXVDLEVBQUUsTUFBTSwwR0FBMEcsQ0FBQztBQXNDbkssTUFBTSxPQUFPLHFCQUFxQjtJQUM5QixZQUNZLFFBQWtCLEVBQ2xCLGNBQW1DO1FBRG5DLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsbUJBQWMsR0FBZCxjQUFjLENBQXFCO1FBRTNDLGNBQWMsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQ3ZDLENBQUM7SUFDRCxNQUFNLENBQUMsT0FBTyxDQUFDLFlBQWdEO1FBQzNELE9BQU87WUFDSCxRQUFRLEVBQUUscUJBQXFCO1lBQy9CLFNBQVMsRUFBRSxDQUFDLG1CQUFtQixFQUFFLEVBQUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFDLENBQUM7U0FFdEYsQ0FBQztJQUNOLENBQUM7OztZQWpESixRQUFRLFNBQUM7Z0JBQ04sWUFBWSxFQUFFO29CQUNWLHNCQUFzQjtvQkFDdEIsa0JBQWtCO29CQUNsQix3QkFBd0I7b0JBQ3hCLHNCQUFzQjtvQkFDdEIsMEJBQTBCO29CQUMxQixpQ0FBaUM7b0JBQ2pDLHVDQUF1QztpQkFDMUM7Z0JBQ0QsT0FBTyxFQUFPO29CQUNWLFlBQVk7b0JBQ1osYUFBYTtvQkFDYix1QkFBdUI7aUJBQzFCO2dCQUNELFNBQVMsRUFBSztvQkFDVixhQUFhO29CQUNiLGlCQUFpQjtvQkFDakIsd0JBQXdCO29CQUN4QixtQkFBbUI7b0JBQ25CLG1CQUFtQjtvQkFDbkIsdUJBQXVCO29CQUN2Qiw4QkFBOEI7b0JBQzlCLFdBQVcsQ0FBQyxlQUFlO29CQUMzQixlQUFlLENBQUMsbUJBQW1CO29CQUNuQyxzQkFBc0IsQ0FBQywwQkFBMEI7aUJBQ3BEO2dCQUNELGVBQWUsRUFBRTtvQkFDYixzQkFBc0I7b0JBQ3RCLHNCQUFzQjtvQkFDdEIsMEJBQTBCO29CQUMxQixpQ0FBaUM7b0JBQ2pDLHVDQUF1QztpQkFDMUM7YUFDSjs7O1lBMURPLFFBQVE7WUFhUixtQkFBbUI7O0FBaUUzQixNQUFNLE9BQU8sa0JBQWtCO0lBRTNCLE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBZ0Q7UUFDM0QsT0FBTztZQUNILFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsU0FBUyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsRUFBQyxPQUFPLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUMsQ0FBQztTQUV0RixDQUFDO0lBQ04sQ0FBQzs7O1lBVEosUUFBUSxTQUFDLEVBQUU7O0FBYVosTUFBTSxPQUFPLHNCQUFzQjtJQUUvQixNQUFNLENBQUMsT0FBTyxDQUFDLGdCQUE0RDtRQUN2RSxPQUFPO1lBQ0gsUUFBUSxFQUFFLHNCQUFzQjtZQUNoQyxTQUFTLEVBQUUsQ0FBQyx1QkFBdUIsRUFBRSxFQUFDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUMsQ0FBQztTQUVsRyxDQUFDO0lBQ04sQ0FBQzs7O1lBVEosUUFBUSxTQUFDLEVBQUU7O0FBWVosTUFBTSxPQUFPLDZCQUE2QjtJQUV0QyxNQUFNLENBQUMsT0FBTyxDQUFDLHVCQUFpRjtRQUM1RixPQUFPO1lBQ0gsUUFBUSxFQUFFLDZCQUE2QjtZQUN2QyxTQUFTLEVBQUUsQ0FBQyw4QkFBOEIsRUFBRSxFQUFDLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxRQUFRLEVBQUUsdUJBQXVCLEVBQUMsQ0FBQztTQUV2SCxDQUFDO0lBQ04sQ0FBQzs7O1lBVEosUUFBUSxTQUFDLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdG9yLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RpYWxvZ1dyYXBwZXJDb21wb25lbnR9IGZyb20gJy4vdHlwZXMvZGlhbG9nL2RpYWxvZy13cmFwcGVyL2RpYWxvZy13cmFwcGVyLmNvbXBvbmVudCc7XG5pbXBvcnQge0luc2VydGlvbkRpcmVjdGl2ZX0gZnJvbSAnLi9jb3JlL2luc2VydGlvbi5kaXJlY3RpdmUnO1xuaW1wb3J0IHtJbnNlcnRpb25Mb2FkZXJEaXJlY3RpdmV9IGZyb20gJy4vY29yZS9pbnNlcnRpb24tbG9hZGVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQge0RlZmF1bHRMb2FkZXJDb21wb25lbnR9IGZyb20gJy4vZGVmYXVsdC1sb2FkZXIvZGVmYXVsdC1sb2FkZXIuY29tcG9uZW50JztcbmltcG9ydCB7Q29uZmlybUJveFdyYXBwZXJDb21wb25lbnR9IGZyb20gJy4vdHlwZXMvY29uZmlybS1ib3gvY29uZmlybS1ib3gtd3JhcHBlci9jb25maXJtLWJveC13cmFwcGVyLmNvbXBvbmVudCc7XG5pbXBvcnQge1RvYXN0Tm90aWZpY2F0aW9uV3JhcHBlckNvbXBvbmVudH0gZnJvbSAnLi90eXBlcy90b2FzdC1ub3RpZmljYXRpb24vdG9hc3Qtbm90aWZpY2F0aW9uLXdyYXBwZXIvdG9hc3Qtbm90aWZpY2F0aW9uLXdyYXBwZXIuY29tcG9uZW50JztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtCcm93c2VyTW9kdWxlfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7QnJvd3NlckFuaW1hdGlvbnNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge0RpYWxvZ1NlcnZpY2V9IGZyb20gJy4vdHlwZXMvZGlhbG9nL2NvcmUvZGlhbG9nLnNlcnZpY2UnO1xuaW1wb3J0IHtDb25maXJtQm94U2VydmljZX0gZnJvbSAnLi90eXBlcy9jb25maXJtLWJveC9jb3JlL2NvbmZpcm0tYm94LXNlcnZpY2UnO1xuaW1wb3J0IHtUb2FzdE5vdGlmaWNhdGlvblNlcnZpY2V9IGZyb20gJy4vdHlwZXMvdG9hc3Qtbm90aWZpY2F0aW9uL2NvcmUvdG9hc3Qtbm90aWZpY2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHtHbG9iYWxDb25maWdTZXJ2aWNlfSBmcm9tICcuL2NvcmUvZ2xvYmFsLWNvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7Q29uZmlybUJveENvbmZpZ1NlcnZpY2V9IGZyb20gJy4vdHlwZXMvY29uZmlybS1ib3gvY29yZS9jb25maXJtLWJveC1jb25maWcuc2VydmljZSc7XG5pbXBvcnQge0RpYWxvZ0NvbmZpZ1NlcnZpY2V9IGZyb20gJy4vdHlwZXMvZGlhbG9nL2NvcmUvZGlhbG9nLWNvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7VG9hc3ROb3RpZmljYXRpb25Db25maWdTZXJ2aWNlfSBmcm9tICcuL3R5cGVzL3RvYXN0LW5vdGlmaWNhdGlvbi9jb3JlL3RvYXN0LW5vdGlmaWNhdGlvbi1jb25maWcuc2VydmljZSc7XG5pbXBvcnQge1RvYXN0Tm90aWZpY2F0aW9uQ2xhc3MsIFRvYXN0Tm90aWZpY2F0aW9uSW50ZXJmYWNlfSBmcm9tICcuL3R5cGVzL3RvYXN0LW5vdGlmaWNhdGlvbi9jb3JlL21vZGVsJztcbmltcG9ydCB7Q29uZmlybUJveENsYXNzLCBDb25maXJtQm94SW50ZXJmYWNlfSBmcm9tICcuL3R5cGVzL2NvbmZpcm0tYm94L2NvcmUvbW9kZWwnO1xuaW1wb3J0IHtEaWFsb2dDbGFzcywgRGlhbG9nSW50ZXJmYWNlfSBmcm9tICcuL3R5cGVzL2RpYWxvZy9jb3JlL21vZGVsJztcbmltcG9ydCB7U2VydmljZUxvY2F0b3J9IGZyb20gJy4vbG9jYXRvci5zZXJ2aWNlJztcbmltcG9ydCB7R2xvYmFsSW50ZXJmYWNlfSBmcm9tICcuL2NvcmUvZ2xvYmFsJztcbmltcG9ydCB7IFRvYXN0Tm90aWZpY2F0aW9uU2ltcGxlV3JhcHBlckNvbXBvbmVudCB9IGZyb20gJy4vdHlwZXMvdG9hc3Qtbm90aWZpY2F0aW9uL3RvYXN0LW5vdGlmaWNhdGlvbi1zaW1wbGUtd3JhcHBlci90b2FzdC1ub3RpZmljYXRpb24tc2ltcGxlLXdyYXBwZXIuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgRGlhbG9nV3JhcHBlckNvbXBvbmVudCxcbiAgICAgICAgSW5zZXJ0aW9uRGlyZWN0aXZlLFxuICAgICAgICBJbnNlcnRpb25Mb2FkZXJEaXJlY3RpdmUsXG4gICAgICAgIERlZmF1bHRMb2FkZXJDb21wb25lbnQsXG4gICAgICAgIENvbmZpcm1Cb3hXcmFwcGVyQ29tcG9uZW50LFxuICAgICAgICBUb2FzdE5vdGlmaWNhdGlvbldyYXBwZXJDb21wb25lbnQsXG4gICAgICAgIFRvYXN0Tm90aWZpY2F0aW9uU2ltcGxlV3JhcHBlckNvbXBvbmVudFxuICAgIF0sXG4gICAgaW1wb3J0cyAgICAgOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgQnJvd3Nlck1vZHVsZSxcbiAgICAgICAgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGVcbiAgICBdLFxuICAgIHByb3ZpZGVycyAgIDogW1xuICAgICAgICBEaWFsb2dTZXJ2aWNlLFxuICAgICAgICBDb25maXJtQm94U2VydmljZSxcbiAgICAgICAgVG9hc3ROb3RpZmljYXRpb25TZXJ2aWNlLFxuICAgICAgICBHbG9iYWxDb25maWdTZXJ2aWNlLFxuICAgICAgICBEaWFsb2dDb25maWdTZXJ2aWNlLFxuICAgICAgICBDb25maXJtQm94Q29uZmlnU2VydmljZSxcbiAgICAgICAgVG9hc3ROb3RpZmljYXRpb25Db25maWdTZXJ2aWNlLFxuICAgICAgICBEaWFsb2dDbGFzcy5EaWFsb2dCZWxvbmdpbmcsXG4gICAgICAgIENvbmZpcm1Cb3hDbGFzcy5Db25maXJtQm94QmVsb25naW5nLFxuICAgICAgICBUb2FzdE5vdGlmaWNhdGlvbkNsYXNzLlRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nXG4gICAgXSxcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICAgICAgRGlhbG9nV3JhcHBlckNvbXBvbmVudCxcbiAgICAgICAgRGVmYXVsdExvYWRlckNvbXBvbmVudCxcbiAgICAgICAgQ29uZmlybUJveFdyYXBwZXJDb21wb25lbnQsXG4gICAgICAgIFRvYXN0Tm90aWZpY2F0aW9uV3JhcHBlckNvbXBvbmVudCxcbiAgICAgICAgVG9hc3ROb3RpZmljYXRpb25TaW1wbGVXcmFwcGVyQ29tcG9uZW50XG4gICAgXVxufSlcblxuZXhwb3J0IGNsYXNzIE5neEF3ZXNvbWVQb3B1cE1vZHVsZSB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgICAgICBwcml2YXRlIGdDb25maWdTZXJ2aWNlOiBHbG9iYWxDb25maWdTZXJ2aWNlXG4gICAgKSB7XG4gICAgICAgIFNlcnZpY2VMb2NhdG9yLmluamVjdG9yID0gaW5qZWN0b3I7XG4gICAgfVxuICAgIHN0YXRpYyBmb3JSb290KGdsb2JhbENvbmZpZz86IEdsb2JhbEludGVyZmFjZS5JR2xvYmFsVXNlckNvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnM8Tmd4QXdlc29tZVBvcHVwTW9kdWxlPiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuZ01vZHVsZTogTmd4QXdlc29tZVBvcHVwTW9kdWxlLFxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbR2xvYmFsQ29uZmlnU2VydmljZSwge3Byb3ZpZGU6ICdnbG9iYWxDb25maWcnLCB1c2VWYWx1ZTogZ2xvYmFsQ29uZmlnfV1cblxuICAgICAgICB9O1xuICAgIH1cblxufVxuXG5ATmdNb2R1bGUoe30pXG5leHBvcnQgY2xhc3MgRGlhbG9nQ29uZmlnTW9kdWxlIHtcblxuICAgIHN0YXRpYyBmb3JSb290KGRpYWxvZ0NvbmZpZz86IERpYWxvZ0ludGVyZmFjZS5JRGlhbG9nVXNlckNvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnM8RGlhbG9nQ29uZmlnTW9kdWxlPiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuZ01vZHVsZTogRGlhbG9nQ29uZmlnTW9kdWxlLFxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbRGlhbG9nQ29uZmlnU2VydmljZSwge3Byb3ZpZGU6ICdkaWFsb2dDb25maWcnLCB1c2VWYWx1ZTogZGlhbG9nQ29uZmlnfV1cblxuICAgICAgICB9O1xuICAgIH1cbn1cblxuQE5nTW9kdWxlKHt9KVxuZXhwb3J0IGNsYXNzIENvbmZpcm1Cb3hDb25maWdNb2R1bGUge1xuXG4gICAgc3RhdGljIGZvclJvb3QoY29uZmlybUJveENvbmZpZz86IENvbmZpcm1Cb3hJbnRlcmZhY2UuSUNvbmZpcm1Cb3hVc2VyQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVyczxDb25maXJtQm94Q29uZmlnTW9kdWxlPiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuZ01vZHVsZTogQ29uZmlybUJveENvbmZpZ01vZHVsZSxcbiAgICAgICAgICAgIHByb3ZpZGVyczogW0NvbmZpcm1Cb3hDb25maWdTZXJ2aWNlLCB7cHJvdmlkZTogJ2NvbmZpcm1Cb3hDb25maWcnLCB1c2VWYWx1ZTogY29uZmlybUJveENvbmZpZ31dXG5cbiAgICAgICAgfTtcbiAgICB9XG59XG5ATmdNb2R1bGUoe30pXG5leHBvcnQgY2xhc3MgVG9hc3ROb3RpZmljYXRpb25Db25maWdNb2R1bGUge1xuXG4gICAgc3RhdGljIGZvclJvb3QodG9hc3ROb3RpZmljYXRpb25Db25maWc/OiBUb2FzdE5vdGlmaWNhdGlvbkludGVyZmFjZS5JVG9hc3ROb3RpZmljYXRpb25Vc2VyQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVyczxUb2FzdE5vdGlmaWNhdGlvbkNvbmZpZ01vZHVsZT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmdNb2R1bGU6IFRvYXN0Tm90aWZpY2F0aW9uQ29uZmlnTW9kdWxlLFxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbVG9hc3ROb3RpZmljYXRpb25Db25maWdTZXJ2aWNlLCB7cHJvdmlkZTogJ3RvYXN0Tm90aWZpY2F0aW9uQ29uZmlnJywgdXNlVmFsdWU6IHRvYXN0Tm90aWZpY2F0aW9uQ29uZmlnfV1cblxuICAgICAgICB9O1xuICAgIH1cbn1cbiJdfQ==