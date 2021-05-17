import { CommonModule } from "@angular/common";
import { Injector, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { GlobalConfigService } from "./core/global-config.service";
import { InsertionLoaderDirective } from "./core/insertion-loader.directive";
import { InsertionDirective } from "./core/insertion.directive";
import { DefaultLoaderComponent } from "./default-loader/default-loader.component";
import { ServiceLocator } from "./locator.service";
import { ConfirmBoxWrapperComponent } from "./types/confirm-box/confirm-box-wrapper/confirm-box-wrapper.component";
import { ConfirmBoxConfigService } from "./types/confirm-box/core/confirm-box-config.service";
import { ConfirmBoxService } from "./types/confirm-box/core/confirm-box-service";
import { ConfirmBoxClass, } from "./types/confirm-box/core/model";
import { DialogConfigService } from "./types/dialog/core/dialog-config.service";
import { DialogService } from "./types/dialog/core/dialog.service";
import { DialogClass } from "./types/dialog/core/model";
import { DialogWrapperComponent } from "./types/dialog/dialog-wrapper/dialog-wrapper.component";
import { ToastNotificationClass, } from "./types/toast-notification/core/model";
import { ToastNotificationConfigService } from "./types/toast-notification/core/toast-notification-config.service";
import { ToastNotificationService } from "./types/toast-notification/core/toast-notification.service";
import { ToastNotificationSimpleWrapperComponent } from "./types/toast-notification/toast-notification-simple-wrapper/toast-notification-simple-wrapper.component";
import { ToastNotificationWrapperComponent } from "./types/toast-notification/toast-notification-wrapper/toast-notification-wrapper.component";
export class NgxAwesomePopupModule {
    constructor(injector, gConfigService) {
        this.injector = injector;
        this.gConfigService = gConfigService;
        ServiceLocator.injector = injector;
    }
    static forRoot(globalConfig) {
        return {
            ngModule: NgxAwesomePopupModule,
            providers: [
                GlobalConfigService,
                { provide: "globalConfig", useValue: globalConfig },
            ],
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
                    ToastNotificationSimpleWrapperComponent,
                ],
                imports: [CommonModule, BrowserModule, BrowserAnimationsModule],
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
                    ToastNotificationClass.ToastNotificationBelonging,
                ],
                entryComponents: [
                    DialogWrapperComponent,
                    DefaultLoaderComponent,
                    ConfirmBoxWrapperComponent,
                    ToastNotificationWrapperComponent,
                    ToastNotificationSimpleWrapperComponent,
                ],
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
            providers: [
                DialogConfigService,
                { provide: "dialogConfig", useValue: dialogConfig },
            ],
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
            providers: [
                ConfirmBoxConfigService,
                { provide: "confirmBoxConfig", useValue: confirmBoxConfig },
            ],
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
            providers: [
                ToastNotificationConfigService,
                {
                    provide: "toastNotificationConfig",
                    useValue: toastNotificationConfig,
                },
            ],
        };
    }
}
ToastNotificationConfigModule.decorators = [
    { type: NgModule, args: [{},] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWF3ZXNvbWUtcG9wdXAubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbmd4LWF3ZXNvbWUtcG9wdXAvbmd4LWF3ZXNvbWUtcG9wdXAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDeEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzFELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBRS9FLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ25FLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSx1RUFBdUUsQ0FBQztBQUNuSCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxxREFBcUQsQ0FBQztBQUM5RixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUNqRixPQUFPLEVBQ0wsZUFBZSxHQUVoQixNQUFNLGdDQUFnQyxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNuRSxPQUFPLEVBQUUsV0FBVyxFQUFtQixNQUFNLDJCQUEyQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHdEQUF3RCxDQUFDO0FBQ2hHLE9BQU8sRUFDTCxzQkFBc0IsR0FFdkIsTUFBTSx1Q0FBdUMsQ0FBQztBQUMvQyxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxtRUFBbUUsQ0FBQztBQUNuSCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw0REFBNEQsQ0FBQztBQUN0RyxPQUFPLEVBQUUsdUNBQXVDLEVBQUUsTUFBTSwwR0FBMEcsQ0FBQztBQUNuSyxPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSw0RkFBNEYsQ0FBQztBQWlDL0ksTUFBTSxPQUFPLHFCQUFxQjtJQUNoQyxZQUNVLFFBQWtCLEVBQ2xCLGNBQW1DO1FBRG5DLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsbUJBQWMsR0FBZCxjQUFjLENBQXFCO1FBRTNDLGNBQWMsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQ3JDLENBQUM7SUFFRCxNQUFNLENBQUMsT0FBTyxDQUNaLFlBQWdEO1FBRWhELE9BQU87WUFDTCxRQUFRLEVBQUUscUJBQXFCO1lBQy9CLFNBQVMsRUFBRTtnQkFDVCxtQkFBbUI7Z0JBQ25CLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFO2FBQ3BEO1NBQ0YsQ0FBQztJQUNKLENBQUM7OztZQWpERixRQUFRLFNBQUM7Z0JBQ1IsWUFBWSxFQUFFO29CQUNaLHNCQUFzQjtvQkFDdEIsa0JBQWtCO29CQUNsQix3QkFBd0I7b0JBQ3hCLHNCQUFzQjtvQkFDdEIsMEJBQTBCO29CQUMxQixpQ0FBaUM7b0JBQ2pDLHVDQUF1QztpQkFDeEM7Z0JBQ0QsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGFBQWEsRUFBRSx1QkFBdUIsQ0FBQztnQkFDL0QsU0FBUyxFQUFFO29CQUNULGFBQWE7b0JBQ2IsaUJBQWlCO29CQUNqQix3QkFBd0I7b0JBQ3hCLG1CQUFtQjtvQkFDbkIsbUJBQW1CO29CQUNuQix1QkFBdUI7b0JBQ3ZCLDhCQUE4QjtvQkFDOUIsV0FBVyxDQUFDLGVBQWU7b0JBQzNCLGVBQWUsQ0FBQyxtQkFBbUI7b0JBQ25DLHNCQUFzQixDQUFDLDBCQUEwQjtpQkFDbEQ7Z0JBQ0QsZUFBZSxFQUFFO29CQUNmLHNCQUFzQjtvQkFDdEIsc0JBQXNCO29CQUN0QiwwQkFBMEI7b0JBQzFCLGlDQUFpQztvQkFDakMsdUNBQXVDO2lCQUN4QzthQUNGOzs7WUEzRFEsUUFBUTtZQUlSLG1CQUFtQjs7QUE4RTVCLE1BQU0sT0FBTyxrQkFBa0I7SUFDN0IsTUFBTSxDQUFDLE9BQU8sQ0FDWixZQUFnRDtRQUVoRCxPQUFPO1lBQ0wsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixTQUFTLEVBQUU7Z0JBQ1QsbUJBQW1CO2dCQUNuQixFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRTthQUNwRDtTQUNGLENBQUM7SUFDSixDQUFDOzs7WUFaRixRQUFRLFNBQUMsRUFBRTs7QUFnQlosTUFBTSxPQUFPLHNCQUFzQjtJQUNqQyxNQUFNLENBQUMsT0FBTyxDQUNaLGdCQUE0RDtRQUU1RCxPQUFPO1lBQ0wsUUFBUSxFQUFFLHNCQUFzQjtZQUNoQyxTQUFTLEVBQUU7Z0JBQ1QsdUJBQXVCO2dCQUN2QixFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUU7YUFDNUQ7U0FDRixDQUFDO0lBQ0osQ0FBQzs7O1lBWkYsUUFBUSxTQUFDLEVBQUU7O0FBZ0JaLE1BQU0sT0FBTyw2QkFBNkI7SUFDeEMsTUFBTSxDQUFDLE9BQU8sQ0FDWix1QkFBaUY7UUFFakYsT0FBTztZQUNMLFFBQVEsRUFBRSw2QkFBNkI7WUFDdkMsU0FBUyxFQUFFO2dCQUNULDhCQUE4QjtnQkFDOUI7b0JBQ0UsT0FBTyxFQUFFLHlCQUF5QjtvQkFDbEMsUUFBUSxFQUFFLHVCQUF1QjtpQkFDbEM7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDOzs7WUFmRixRQUFRLFNBQUMsRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7IEluamVjdG9yLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBCcm93c2VyTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXJcIjtcbmltcG9ydCB7IEJyb3dzZXJBbmltYXRpb25zTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9uc1wiO1xuaW1wb3J0IHsgR2xvYmFsSW50ZXJmYWNlIH0gZnJvbSBcIi4vY29yZS9nbG9iYWxcIjtcbmltcG9ydCB7IEdsb2JhbENvbmZpZ1NlcnZpY2UgfSBmcm9tIFwiLi9jb3JlL2dsb2JhbC1jb25maWcuc2VydmljZVwiO1xuaW1wb3J0IHsgSW5zZXJ0aW9uTG9hZGVyRGlyZWN0aXZlIH0gZnJvbSBcIi4vY29yZS9pbnNlcnRpb24tbG9hZGVyLmRpcmVjdGl2ZVwiO1xuaW1wb3J0IHsgSW5zZXJ0aW9uRGlyZWN0aXZlIH0gZnJvbSBcIi4vY29yZS9pbnNlcnRpb24uZGlyZWN0aXZlXCI7XG5pbXBvcnQgeyBEZWZhdWx0TG9hZGVyQ29tcG9uZW50IH0gZnJvbSBcIi4vZGVmYXVsdC1sb2FkZXIvZGVmYXVsdC1sb2FkZXIuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBTZXJ2aWNlTG9jYXRvciB9IGZyb20gXCIuL2xvY2F0b3Iuc2VydmljZVwiO1xuaW1wb3J0IHsgQ29uZmlybUJveFdyYXBwZXJDb21wb25lbnQgfSBmcm9tIFwiLi90eXBlcy9jb25maXJtLWJveC9jb25maXJtLWJveC13cmFwcGVyL2NvbmZpcm0tYm94LXdyYXBwZXIuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBDb25maXJtQm94Q29uZmlnU2VydmljZSB9IGZyb20gXCIuL3R5cGVzL2NvbmZpcm0tYm94L2NvcmUvY29uZmlybS1ib3gtY29uZmlnLnNlcnZpY2VcIjtcbmltcG9ydCB7IENvbmZpcm1Cb3hTZXJ2aWNlIH0gZnJvbSBcIi4vdHlwZXMvY29uZmlybS1ib3gvY29yZS9jb25maXJtLWJveC1zZXJ2aWNlXCI7XG5pbXBvcnQge1xuICBDb25maXJtQm94Q2xhc3MsXG4gIENvbmZpcm1Cb3hJbnRlcmZhY2UsXG59IGZyb20gXCIuL3R5cGVzL2NvbmZpcm0tYm94L2NvcmUvbW9kZWxcIjtcbmltcG9ydCB7IERpYWxvZ0NvbmZpZ1NlcnZpY2UgfSBmcm9tIFwiLi90eXBlcy9kaWFsb2cvY29yZS9kaWFsb2ctY29uZmlnLnNlcnZpY2VcIjtcbmltcG9ydCB7IERpYWxvZ1NlcnZpY2UgfSBmcm9tIFwiLi90eXBlcy9kaWFsb2cvY29yZS9kaWFsb2cuc2VydmljZVwiO1xuaW1wb3J0IHsgRGlhbG9nQ2xhc3MsIERpYWxvZ0ludGVyZmFjZSB9IGZyb20gXCIuL3R5cGVzL2RpYWxvZy9jb3JlL21vZGVsXCI7XG5pbXBvcnQgeyBEaWFsb2dXcmFwcGVyQ29tcG9uZW50IH0gZnJvbSBcIi4vdHlwZXMvZGlhbG9nL2RpYWxvZy13cmFwcGVyL2RpYWxvZy13cmFwcGVyLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtcbiAgVG9hc3ROb3RpZmljYXRpb25DbGFzcyxcbiAgVG9hc3ROb3RpZmljYXRpb25JbnRlcmZhY2UsXG59IGZyb20gXCIuL3R5cGVzL3RvYXN0LW5vdGlmaWNhdGlvbi9jb3JlL21vZGVsXCI7XG5pbXBvcnQgeyBUb2FzdE5vdGlmaWNhdGlvbkNvbmZpZ1NlcnZpY2UgfSBmcm9tIFwiLi90eXBlcy90b2FzdC1ub3RpZmljYXRpb24vY29yZS90b2FzdC1ub3RpZmljYXRpb24tY29uZmlnLnNlcnZpY2VcIjtcbmltcG9ydCB7IFRvYXN0Tm90aWZpY2F0aW9uU2VydmljZSB9IGZyb20gXCIuL3R5cGVzL3RvYXN0LW5vdGlmaWNhdGlvbi9jb3JlL3RvYXN0LW5vdGlmaWNhdGlvbi5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBUb2FzdE5vdGlmaWNhdGlvblNpbXBsZVdyYXBwZXJDb21wb25lbnQgfSBmcm9tIFwiLi90eXBlcy90b2FzdC1ub3RpZmljYXRpb24vdG9hc3Qtbm90aWZpY2F0aW9uLXNpbXBsZS13cmFwcGVyL3RvYXN0LW5vdGlmaWNhdGlvbi1zaW1wbGUtd3JhcHBlci5jb21wb25lbnRcIjtcbmltcG9ydCB7IFRvYXN0Tm90aWZpY2F0aW9uV3JhcHBlckNvbXBvbmVudCB9IGZyb20gXCIuL3R5cGVzL3RvYXN0LW5vdGlmaWNhdGlvbi90b2FzdC1ub3RpZmljYXRpb24td3JhcHBlci90b2FzdC1ub3RpZmljYXRpb24td3JhcHBlci5jb21wb25lbnRcIjtcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRGlhbG9nV3JhcHBlckNvbXBvbmVudCxcbiAgICBJbnNlcnRpb25EaXJlY3RpdmUsXG4gICAgSW5zZXJ0aW9uTG9hZGVyRGlyZWN0aXZlLFxuICAgIERlZmF1bHRMb2FkZXJDb21wb25lbnQsXG4gICAgQ29uZmlybUJveFdyYXBwZXJDb21wb25lbnQsXG4gICAgVG9hc3ROb3RpZmljYXRpb25XcmFwcGVyQ29tcG9uZW50LFxuICAgIFRvYXN0Tm90aWZpY2F0aW9uU2ltcGxlV3JhcHBlckNvbXBvbmVudCxcbiAgXSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgQnJvd3Nlck1vZHVsZSwgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGVdLFxuICBwcm92aWRlcnM6IFtcbiAgICBEaWFsb2dTZXJ2aWNlLFxuICAgIENvbmZpcm1Cb3hTZXJ2aWNlLFxuICAgIFRvYXN0Tm90aWZpY2F0aW9uU2VydmljZSxcbiAgICBHbG9iYWxDb25maWdTZXJ2aWNlLFxuICAgIERpYWxvZ0NvbmZpZ1NlcnZpY2UsXG4gICAgQ29uZmlybUJveENvbmZpZ1NlcnZpY2UsXG4gICAgVG9hc3ROb3RpZmljYXRpb25Db25maWdTZXJ2aWNlLFxuICAgIERpYWxvZ0NsYXNzLkRpYWxvZ0JlbG9uZ2luZyxcbiAgICBDb25maXJtQm94Q2xhc3MuQ29uZmlybUJveEJlbG9uZ2luZyxcbiAgICBUb2FzdE5vdGlmaWNhdGlvbkNsYXNzLlRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLFxuICBdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICBEaWFsb2dXcmFwcGVyQ29tcG9uZW50LFxuICAgIERlZmF1bHRMb2FkZXJDb21wb25lbnQsXG4gICAgQ29uZmlybUJveFdyYXBwZXJDb21wb25lbnQsXG4gICAgVG9hc3ROb3RpZmljYXRpb25XcmFwcGVyQ29tcG9uZW50LFxuICAgIFRvYXN0Tm90aWZpY2F0aW9uU2ltcGxlV3JhcHBlckNvbXBvbmVudCxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTmd4QXdlc29tZVBvcHVwTW9kdWxlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgcHJpdmF0ZSBnQ29uZmlnU2VydmljZTogR2xvYmFsQ29uZmlnU2VydmljZVxuICApIHtcbiAgICBTZXJ2aWNlTG9jYXRvci5pbmplY3RvciA9IGluamVjdG9yO1xuICB9XG5cbiAgc3RhdGljIGZvclJvb3QoXG4gICAgZ2xvYmFsQ29uZmlnPzogR2xvYmFsSW50ZXJmYWNlLklHbG9iYWxVc2VyQ29uZmlnXG4gICk6IE1vZHVsZVdpdGhQcm92aWRlcnM8Tmd4QXdlc29tZVBvcHVwTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBOZ3hBd2Vzb21lUG9wdXBNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgR2xvYmFsQ29uZmlnU2VydmljZSxcbiAgICAgICAgeyBwcm92aWRlOiBcImdsb2JhbENvbmZpZ1wiLCB1c2VWYWx1ZTogZ2xvYmFsQ29uZmlnIH0sXG4gICAgICBdLFxuICAgIH07XG4gIH1cbn1cblxuQE5nTW9kdWxlKHt9KVxuZXhwb3J0IGNsYXNzIERpYWxvZ0NvbmZpZ01vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KFxuICAgIGRpYWxvZ0NvbmZpZz86IERpYWxvZ0ludGVyZmFjZS5JRGlhbG9nVXNlckNvbmZpZ1xuICApOiBNb2R1bGVXaXRoUHJvdmlkZXJzPERpYWxvZ0NvbmZpZ01vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogRGlhbG9nQ29uZmlnTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIERpYWxvZ0NvbmZpZ1NlcnZpY2UsXG4gICAgICAgIHsgcHJvdmlkZTogXCJkaWFsb2dDb25maWdcIiwgdXNlVmFsdWU6IGRpYWxvZ0NvbmZpZyB9LFxuICAgICAgXSxcbiAgICB9O1xuICB9XG59XG5cbkBOZ01vZHVsZSh7fSlcbmV4cG9ydCBjbGFzcyBDb25maXJtQm94Q29uZmlnTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoXG4gICAgY29uZmlybUJveENvbmZpZz86IENvbmZpcm1Cb3hJbnRlcmZhY2UuSUNvbmZpcm1Cb3hVc2VyQ29uZmlnXG4gICk6IE1vZHVsZVdpdGhQcm92aWRlcnM8Q29uZmlybUJveENvbmZpZ01vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogQ29uZmlybUJveENvbmZpZ01vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICBDb25maXJtQm94Q29uZmlnU2VydmljZSxcbiAgICAgICAgeyBwcm92aWRlOiBcImNvbmZpcm1Cb3hDb25maWdcIiwgdXNlVmFsdWU6IGNvbmZpcm1Cb3hDb25maWcgfSxcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxufVxuXG5ATmdNb2R1bGUoe30pXG5leHBvcnQgY2xhc3MgVG9hc3ROb3RpZmljYXRpb25Db25maWdNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChcbiAgICB0b2FzdE5vdGlmaWNhdGlvbkNvbmZpZz86IFRvYXN0Tm90aWZpY2F0aW9uSW50ZXJmYWNlLklUb2FzdE5vdGlmaWNhdGlvblVzZXJDb25maWdcbiAgKTogTW9kdWxlV2l0aFByb3ZpZGVyczxUb2FzdE5vdGlmaWNhdGlvbkNvbmZpZ01vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogVG9hc3ROb3RpZmljYXRpb25Db25maWdNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgVG9hc3ROb3RpZmljYXRpb25Db25maWdTZXJ2aWNlLFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogXCJ0b2FzdE5vdGlmaWNhdGlvbkNvbmZpZ1wiLFxuICAgICAgICAgIHVzZVZhbHVlOiB0b2FzdE5vdGlmaWNhdGlvbkNvbmZpZyxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxufVxuIl19