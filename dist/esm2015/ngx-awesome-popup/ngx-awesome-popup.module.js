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
import { ConfirmBoxBelonging } from './types/confirm-box/core/classes';
import { ConfirmBoxConfigService } from './types/confirm-box/core/confirm-box-config.service';
import { ConfirmBoxService } from './types/confirm-box/core/confirm-box-service';
import { DialogBelonging } from './types/dialog/core/classes';
import { DialogConfigService } from './types/dialog/core/dialog-config.service';
import { DialogService } from './types/dialog/core/dialog.service';
import { DialogWrapperComponent } from './types/dialog/dialog-wrapper/dialog-wrapper.component';
import { ToastNotificationBelonging } from './types/toast-notification/core/classes';
import { ToastNotificationConfigService } from './types/toast-notification/core/toast-notification-config.service';
import { ToastNotificationService } from './types/toast-notification/core/toast-notification.service';
import { ToastNotificationSimpleWrapperComponent } from './types/toast-notification/toast-notification-simple-wrapper/toast-notification-simple-wrapper.component';
import { ToastNotificationWrapperComponent } from './types/toast-notification/toast-notification-wrapper/toast-notification-wrapper.component';
export class NgxAwesomePopupModule {
    constructor(injector) {
        this.injector = injector;
        ServiceLocator.injector = injector;
    }
    static forRoot(globalConfig) {
        return {
            ngModule: NgxAwesomePopupModule,
            providers: [{ provide: 'cdGlobalConfig', useValue: globalConfig }]
        };
    }
}
NgxAwesomePopupModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, BrowserModule, BrowserAnimationsModule],
                providers: [GlobalConfigService]
            },] }
];
NgxAwesomePopupModule.ctorParameters = () => [
    { type: Injector }
];
export class DialogConfigModule {
    static forRoot(dialogConfig) {
        return {
            ngModule: DialogConfigModule,
            providers: [
                { provide: 'dialogConfig', useValue: dialogConfig },
                { provide: 'dialogBelonging', useClass: DialogBelonging }
            ]
        };
    }
}
DialogConfigModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    DialogWrapperComponent,
                    DefaultLoaderComponent,
                    InsertionDirective,
                    InsertionLoaderDirective
                ],
                imports: [CommonModule],
                providers: [DialogService, DialogConfigService],
                entryComponents: [DialogWrapperComponent, DefaultLoaderComponent]
            },] }
];
export class ConfirmBoxConfigModule {
    static forRoot(confirmBoxConfig) {
        return {
            ngModule: ConfirmBoxConfigModule,
            providers: [
                { provide: 'confirmBoxConfig', useValue: confirmBoxConfig },
                { provide: 'confirmBoxBelonging', useClass: ConfirmBoxBelonging }
            ]
        };
    }
}
ConfirmBoxConfigModule.decorators = [
    { type: NgModule, args: [{
                declarations: [ConfirmBoxWrapperComponent],
                imports: [CommonModule],
                providers: [ConfirmBoxService, ConfirmBoxConfigService],
                entryComponents: [ConfirmBoxWrapperComponent]
            },] }
];
export class ToastNotificationConfigModule {
    static forRoot(toastNotificationConfig) {
        return {
            ngModule: ToastNotificationConfigModule,
            providers: [
                {
                    provide: 'toastNotificationConfig',
                    useValue: toastNotificationConfig
                },
                {
                    provide: 'toastNotificationBelonging',
                    useClass: ToastNotificationBelonging
                }
            ]
        };
    }
}
ToastNotificationConfigModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    ToastNotificationWrapperComponent,
                    ToastNotificationSimpleWrapperComponent
                ],
                imports: [CommonModule],
                providers: [ToastNotificationService, ToastNotificationConfigService],
                entryComponents: [
                    ToastNotificationWrapperComponent,
                    ToastNotificationSimpleWrapperComponent
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWF3ZXNvbWUtcG9wdXAubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbmd4LWF3ZXNvbWUtcG9wdXAvbmd4LWF3ZXNvbWUtcG9wdXAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDeEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzFELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRW5FLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSx1RUFBdUUsQ0FBQztBQUNuSCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN2RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxxREFBcUQsQ0FBQztBQUM5RixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUVqRixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDOUQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDaEYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBRW5FLE9BQU8sRUFBRSxzQkFBc0IsRUFB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Q1osaUNBQWlDO29CQUNqQyx1Q0FBdUM7aUJBQ3hDO2dCQUNELE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztnQkFDdkIsU0FBUyxFQUFFLENBQUMsd0JBQXdCLEVBQUUsOEJBQThCLENBQUM7Z0JBQ3JFLGVBQWUsRUFBRTtvQkFDZixpQ0FBaUM7b0JBQ2pDLHVDQUF1QztpQkFDeEM7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBJbmplY3RvciwgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJyb3dzZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IEJyb3dzZXJBbmltYXRpb25zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7IEdsb2JhbENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL2NvcmUvZ2xvYmFsLWNvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7IElHbG9iYWxVc2VyQ29uZmlnIH0gZnJvbSAnLi9jb3JlL2dsb2JhbC1pbnRlcmZhY2VzJztcbmltcG9ydCB7IEluc2VydGlvbkxvYWRlckRpcmVjdGl2ZSB9IGZyb20gJy4vY29yZS9pbnNlcnRpb24tbG9hZGVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBJbnNlcnRpb25EaXJlY3RpdmUgfSBmcm9tICcuL2NvcmUvaW5zZXJ0aW9uLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEZWZhdWx0TG9hZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9kZWZhdWx0LWxvYWRlci9kZWZhdWx0LWxvYWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VydmljZUxvY2F0b3IgfSBmcm9tICcuL2xvY2F0b3Iuc2VydmljZSc7XG5pbXBvcnQgeyBDb25maXJtQm94V3JhcHBlckNvbXBvbmVudCB9IGZyb20gJy4vdHlwZXMvY29uZmlybS1ib3gvY29uZmlybS1ib3gtd3JhcHBlci9jb25maXJtLWJveC13cmFwcGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb25maXJtQm94QmVsb25naW5nIH0gZnJvbSAnLi90eXBlcy9jb25maXJtLWJveC9jb3JlL2NsYXNzZXMnO1xuaW1wb3J0IHsgQ29uZmlybUJveENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL3R5cGVzL2NvbmZpcm0tYm94L2NvcmUvY29uZmlybS1ib3gtY29uZmlnLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uZmlybUJveFNlcnZpY2UgfSBmcm9tICcuL3R5cGVzL2NvbmZpcm0tYm94L2NvcmUvY29uZmlybS1ib3gtc2VydmljZSc7XG5pbXBvcnQgeyBJQ29uZmlybUJveFVzZXJDb25maWcgfSBmcm9tICcuL3R5cGVzL2NvbmZpcm0tYm94L2NvcmUvaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBEaWFsb2dCZWxvbmdpbmcgfSBmcm9tICcuL3R5cGVzL2RpYWxvZy9jb3JlL2NsYXNzZXMnO1xuaW1wb3J0IHsgRGlhbG9nQ29uZmlnU2VydmljZSB9IGZyb20gJy4vdHlwZXMvZGlhbG9nL2NvcmUvZGlhbG9nLWNvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7IERpYWxvZ1NlcnZpY2UgfSBmcm9tICcuL3R5cGVzL2RpYWxvZy9jb3JlL2RpYWxvZy5zZXJ2aWNlJztcbmltcG9ydCB7IElEaWFsb2dVc2VyQ29uZmlnIH0gZnJvbSAnLi90eXBlcy9kaWFsb2cvY29yZS9pbnRlcmZhY2VzJztcbmltcG9ydCB7IERpYWxvZ1dyYXBwZXJDb21wb25lbnQgfSBmcm9tICcuL3R5cGVzL2RpYWxvZy9kaWFsb2ctd3JhcHBlci9kaWFsb2ctd3JhcHBlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcgfSBmcm9tICcuL3R5cGVzL3RvYXN0LW5vdGlmaWNhdGlvbi9jb3JlL2NsYXNzZXMnO1xuaW1wb3J0IHsgSVRvYXN0Tm90aWZpY2F0aW9uVXNlckNvbmZpZyB9IGZyb20gJy4vdHlwZXMvdG9hc3Qtbm90aWZpY2F0aW9uL2NvcmUvaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBUb2FzdE5vdGlmaWNhdGlvbkNvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL3R5cGVzL3RvYXN0LW5vdGlmaWNhdGlvbi9jb3JlL3RvYXN0LW5vdGlmaWNhdGlvbi1jb25maWcuc2VydmljZSc7XG5pbXBvcnQgeyBUb2FzdE5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tICcuL3R5cGVzL3RvYXN0LW5vdGlmaWNhdGlvbi9jb3JlL3RvYXN0LW5vdGlmaWNhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFRvYXN0Tm90aWZpY2F0aW9uU2ltcGxlV3JhcHBlckNvbXBvbmVudCB9IGZyb20gJy4vdHlwZXMvdG9hc3Qtbm90aWZpY2F0aW9uL3RvYXN0LW5vdGlmaWNhdGlvbi1zaW1wbGUtd3JhcHBlci90b2FzdC1ub3RpZmljYXRpb24tc2ltcGxlLXdyYXBwZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFRvYXN0Tm90aWZpY2F0aW9uV3JhcHBlckNvbXBvbmVudCB9IGZyb20gJy4vdHlwZXMvdG9hc3Qtbm90aWZpY2F0aW9uL3RvYXN0LW5vdGlmaWNhdGlvbi13cmFwcGVyL3RvYXN0LW5vdGlmaWNhdGlvbi13cmFwcGVyLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEJyb3dzZXJNb2R1bGUsIEJyb3dzZXJBbmltYXRpb25zTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbR2xvYmFsQ29uZmlnU2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgTmd4QXdlc29tZVBvcHVwTW9kdWxlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgICBTZXJ2aWNlTG9jYXRvci5pbmplY3RvciA9IGluamVjdG9yO1xuICB9XG5cbiAgc3RhdGljIGZvclJvb3QoXG4gICAgZ2xvYmFsQ29uZmlnPzogSUdsb2JhbFVzZXJDb25maWdcbiAgKTogTW9kdWxlV2l0aFByb3ZpZGVyczxOZ3hBd2Vzb21lUG9wdXBNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE5neEF3ZXNvbWVQb3B1cE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW3sgcHJvdmlkZTogJ2NkR2xvYmFsQ29uZmlnJywgdXNlVmFsdWU6IGdsb2JhbENvbmZpZyB9XVxuICAgIH07XG4gIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRGlhbG9nV3JhcHBlckNvbXBvbmVudCxcbiAgICBEZWZhdWx0TG9hZGVyQ29tcG9uZW50LFxuICAgIEluc2VydGlvbkRpcmVjdGl2ZSxcbiAgICBJbnNlcnRpb25Mb2FkZXJEaXJlY3RpdmVcbiAgXSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIHByb3ZpZGVyczogW0RpYWxvZ1NlcnZpY2UsIERpYWxvZ0NvbmZpZ1NlcnZpY2VdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtEaWFsb2dXcmFwcGVyQ29tcG9uZW50LCBEZWZhdWx0TG9hZGVyQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBEaWFsb2dDb25maWdNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChcbiAgICBkaWFsb2dDb25maWc/OiBJRGlhbG9nVXNlckNvbmZpZ1xuICApOiBNb2R1bGVXaXRoUHJvdmlkZXJzPERpYWxvZ0NvbmZpZ01vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogRGlhbG9nQ29uZmlnTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHsgcHJvdmlkZTogJ2RpYWxvZ0NvbmZpZycsIHVzZVZhbHVlOiBkaWFsb2dDb25maWcgfSxcbiAgICAgICAgeyBwcm92aWRlOiAnZGlhbG9nQmVsb25naW5nJywgdXNlQ2xhc3M6IERpYWxvZ0JlbG9uZ2luZyB9XG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtDb25maXJtQm94V3JhcHBlckNvbXBvbmVudF0sXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBwcm92aWRlcnM6IFtDb25maXJtQm94U2VydmljZSwgQ29uZmlybUJveENvbmZpZ1NlcnZpY2VdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtDb25maXJtQm94V3JhcHBlckNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgQ29uZmlybUJveENvbmZpZ01vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KFxuICAgIGNvbmZpcm1Cb3hDb25maWc/OiBJQ29uZmlybUJveFVzZXJDb25maWdcbiAgKTogTW9kdWxlV2l0aFByb3ZpZGVyczxDb25maXJtQm94Q29uZmlnTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBDb25maXJtQm94Q29uZmlnTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHsgcHJvdmlkZTogJ2NvbmZpcm1Cb3hDb25maWcnLCB1c2VWYWx1ZTogY29uZmlybUJveENvbmZpZyB9LFxuICAgICAgICB7IHByb3ZpZGU6ICdjb25maXJtQm94QmVsb25naW5nJywgdXNlQ2xhc3M6IENvbmZpcm1Cb3hCZWxvbmdpbmcgfVxuICAgICAgXVxuICAgIH07XG4gIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgVG9hc3ROb3RpZmljYXRpb25XcmFwcGVyQ29tcG9uZW50LFxuICAgIFRvYXN0Tm90aWZpY2F0aW9uU2ltcGxlV3JhcHBlckNvbXBvbmVudFxuICBdLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbVG9hc3ROb3RpZmljYXRpb25TZXJ2aWNlLCBUb2FzdE5vdGlmaWNhdGlvbkNvbmZpZ1NlcnZpY2VdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICBUb2FzdE5vdGlmaWNhdGlvbldyYXBwZXJDb21wb25lbnQsXG4gICAgVG9hc3ROb3RpZmljYXRpb25TaW1wbGVXcmFwcGVyQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgVG9hc3ROb3RpZmljYXRpb25Db25maWdNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChcbiAgICB0b2FzdE5vdGlmaWNhdGlvbkNvbmZpZz86IElUb2FzdE5vdGlmaWNhdGlvblVzZXJDb25maWdcbiAgKTogTW9kdWxlV2l0aFByb3ZpZGVyczxUb2FzdE5vdGlmaWNhdGlvbkNvbmZpZ01vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogVG9hc3ROb3RpZmljYXRpb25Db25maWdNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6ICd0b2FzdE5vdGlmaWNhdGlvbkNvbmZpZycsXG4gICAgICAgICAgdXNlVmFsdWU6IHRvYXN0Tm90aWZpY2F0aW9uQ29uZmlnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiAndG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcnLFxuICAgICAgICAgIHVzZUNsYXNzOiBUb2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZ1xuICAgICAgICB9XG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuIl19