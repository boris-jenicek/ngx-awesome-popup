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
                declarations: [DialogWrapperComponent, DefaultLoaderComponent, InsertionDirective, InsertionLoaderDirective],
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
                declarations: [ToastNotificationWrapperComponent, ToastNotificationSimpleWrapperComponent],
                imports: [CommonModule],
                providers: [ToastNotificationService, ToastNotificationConfigService],
                entryComponents: [ToastNotificationWrapperComponent, ToastNotificationSimpleWrapperComponent]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWF3ZXNvbWUtcG9wdXAubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbmd4LWF3ZXNvbWUtcG9wdXAvbmd4LWF3ZXNvbWUtcG9wdXAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDeEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzFELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRW5FLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSx1RUFBdUUsQ0FBQztBQUNuSCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN2RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxxREFBcUQsQ0FBQztBQUM5RixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUVqRixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDOUQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDaEYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBRW5FLE9BQU8sRUFBRSxzQkFBc0IsRUFB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QUUsdUNBQXVDLENBQUM7Z0JBQzFGLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztnQkFDdkIsU0FBUyxFQUFFLENBQUMsd0JBQXdCLEVBQUUsOEJBQThCLENBQUM7Z0JBQ3JFLGVBQWUsRUFBRSxDQUFDLGlDQUFpQyxFQUFFLHVDQUF1QyxDQUFDO2FBQzlGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEluamVjdG9yLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQnJvd3Nlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgR2xvYmFsQ29uZmlnU2VydmljZSB9IGZyb20gJy4vY29yZS9nbG9iYWwtY29uZmlnLnNlcnZpY2UnO1xuaW1wb3J0IHsgSUdsb2JhbFVzZXJDb25maWcgfSBmcm9tICcuL2NvcmUvZ2xvYmFsLWludGVyZmFjZXMnO1xuaW1wb3J0IHsgSW5zZXJ0aW9uTG9hZGVyRGlyZWN0aXZlIH0gZnJvbSAnLi9jb3JlL2luc2VydGlvbi1sb2FkZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IEluc2VydGlvbkRpcmVjdGl2ZSB9IGZyb20gJy4vY29yZS9pbnNlcnRpb24uZGlyZWN0aXZlJztcbmltcG9ydCB7IERlZmF1bHRMb2FkZXJDb21wb25lbnQgfSBmcm9tICcuL2RlZmF1bHQtbG9hZGVyL2RlZmF1bHQtbG9hZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZXJ2aWNlTG9jYXRvciB9IGZyb20gJy4vbG9jYXRvci5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpcm1Cb3hXcmFwcGVyQ29tcG9uZW50IH0gZnJvbSAnLi90eXBlcy9jb25maXJtLWJveC9jb25maXJtLWJveC13cmFwcGVyL2NvbmZpcm0tYm94LXdyYXBwZXIuY29tcG9uZW50JztcbmltcG9ydCB7IENvbmZpcm1Cb3hCZWxvbmdpbmcgfSBmcm9tICcuL3R5cGVzL2NvbmZpcm0tYm94L2NvcmUvY2xhc3Nlcyc7XG5pbXBvcnQgeyBDb25maXJtQm94Q29uZmlnU2VydmljZSB9IGZyb20gJy4vdHlwZXMvY29uZmlybS1ib3gvY29yZS9jb25maXJtLWJveC1jb25maWcuc2VydmljZSc7XG5pbXBvcnQgeyBDb25maXJtQm94U2VydmljZSB9IGZyb20gJy4vdHlwZXMvY29uZmlybS1ib3gvY29yZS9jb25maXJtLWJveC1zZXJ2aWNlJztcbmltcG9ydCB7IElDb25maXJtQm94VXNlckNvbmZpZyB9IGZyb20gJy4vdHlwZXMvY29uZmlybS1ib3gvY29yZS9pbnRlcmZhY2VzJztcbmltcG9ydCB7IERpYWxvZ0JlbG9uZ2luZyB9IGZyb20gJy4vdHlwZXMvZGlhbG9nL2NvcmUvY2xhc3Nlcyc7XG5pbXBvcnQgeyBEaWFsb2dDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi90eXBlcy9kaWFsb2cvY29yZS9kaWFsb2ctY29uZmlnLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGlhbG9nU2VydmljZSB9IGZyb20gJy4vdHlwZXMvZGlhbG9nL2NvcmUvZGlhbG9nLnNlcnZpY2UnO1xuaW1wb3J0IHsgSURpYWxvZ1VzZXJDb25maWcgfSBmcm9tICcuL3R5cGVzL2RpYWxvZy9jb3JlL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgRGlhbG9nV3JhcHBlckNvbXBvbmVudCB9IGZyb20gJy4vdHlwZXMvZGlhbG9nL2RpYWxvZy13cmFwcGVyL2RpYWxvZy13cmFwcGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUb2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZyB9IGZyb20gJy4vdHlwZXMvdG9hc3Qtbm90aWZpY2F0aW9uL2NvcmUvY2xhc3Nlcyc7XG5pbXBvcnQgeyBJVG9hc3ROb3RpZmljYXRpb25Vc2VyQ29uZmlnIH0gZnJvbSAnLi90eXBlcy90b2FzdC1ub3RpZmljYXRpb24vY29yZS9pbnRlcmZhY2VzJztcbmltcG9ydCB7IFRvYXN0Tm90aWZpY2F0aW9uQ29uZmlnU2VydmljZSB9IGZyb20gJy4vdHlwZXMvdG9hc3Qtbm90aWZpY2F0aW9uL2NvcmUvdG9hc3Qtbm90aWZpY2F0aW9uLWNvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7IFRvYXN0Tm90aWZpY2F0aW9uU2VydmljZSB9IGZyb20gJy4vdHlwZXMvdG9hc3Qtbm90aWZpY2F0aW9uL2NvcmUvdG9hc3Qtbm90aWZpY2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgVG9hc3ROb3RpZmljYXRpb25TaW1wbGVXcmFwcGVyQ29tcG9uZW50IH0gZnJvbSAnLi90eXBlcy90b2FzdC1ub3RpZmljYXRpb24vdG9hc3Qtbm90aWZpY2F0aW9uLXNpbXBsZS13cmFwcGVyL3RvYXN0LW5vdGlmaWNhdGlvbi1zaW1wbGUtd3JhcHBlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVG9hc3ROb3RpZmljYXRpb25XcmFwcGVyQ29tcG9uZW50IH0gZnJvbSAnLi90eXBlcy90b2FzdC1ub3RpZmljYXRpb24vdG9hc3Qtbm90aWZpY2F0aW9uLXdyYXBwZXIvdG9hc3Qtbm90aWZpY2F0aW9uLXdyYXBwZXIuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgQnJvd3Nlck1vZHVsZSwgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGVdLFxuICBwcm92aWRlcnM6IFtHbG9iYWxDb25maWdTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hBd2Vzb21lUG9wdXBNb2R1bGUge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgIFNlcnZpY2VMb2NhdG9yLmluamVjdG9yID0gaW5qZWN0b3I7XG4gIH1cblxuICBzdGF0aWMgZm9yUm9vdChnbG9iYWxDb25maWc/OiBJR2xvYmFsVXNlckNvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnM8Tmd4QXdlc29tZVBvcHVwTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBOZ3hBd2Vzb21lUG9wdXBNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6ICdjZEdsb2JhbENvbmZpZycsIHVzZVZhbHVlOiBnbG9iYWxDb25maWcgfV1cbiAgICB9O1xuICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW0RpYWxvZ1dyYXBwZXJDb21wb25lbnQsIERlZmF1bHRMb2FkZXJDb21wb25lbnQsIEluc2VydGlvbkRpcmVjdGl2ZSwgSW5zZXJ0aW9uTG9hZGVyRGlyZWN0aXZlXSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIHByb3ZpZGVyczogW0RpYWxvZ1NlcnZpY2UsIERpYWxvZ0NvbmZpZ1NlcnZpY2VdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtEaWFsb2dXcmFwcGVyQ29tcG9uZW50LCBEZWZhdWx0TG9hZGVyQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBEaWFsb2dDb25maWdNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChkaWFsb2dDb25maWc/OiBJRGlhbG9nVXNlckNvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnM8RGlhbG9nQ29uZmlnTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBEaWFsb2dDb25maWdNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiAnZGlhbG9nQ29uZmlnJywgdXNlVmFsdWU6IGRpYWxvZ0NvbmZpZyB9LFxuICAgICAgICB7IHByb3ZpZGU6ICdkaWFsb2dCZWxvbmdpbmcnLCB1c2VDbGFzczogRGlhbG9nQmVsb25naW5nIH1cbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW0NvbmZpcm1Cb3hXcmFwcGVyQ29tcG9uZW50XSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIHByb3ZpZGVyczogW0NvbmZpcm1Cb3hTZXJ2aWNlLCBDb25maXJtQm94Q29uZmlnU2VydmljZV0sXG4gIGVudHJ5Q29tcG9uZW50czogW0NvbmZpcm1Cb3hXcmFwcGVyQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBDb25maXJtQm94Q29uZmlnTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoY29uZmlybUJveENvbmZpZz86IElDb25maXJtQm94VXNlckNvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnM8Q29uZmlybUJveENvbmZpZ01vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogQ29uZmlybUJveENvbmZpZ01vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6ICdjb25maXJtQm94Q29uZmlnJywgdXNlVmFsdWU6IGNvbmZpcm1Cb3hDb25maWcgfSxcbiAgICAgICAgeyBwcm92aWRlOiAnY29uZmlybUJveEJlbG9uZ2luZycsIHVzZUNsYXNzOiBDb25maXJtQm94QmVsb25naW5nIH1cbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1RvYXN0Tm90aWZpY2F0aW9uV3JhcHBlckNvbXBvbmVudCwgVG9hc3ROb3RpZmljYXRpb25TaW1wbGVXcmFwcGVyQ29tcG9uZW50XSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIHByb3ZpZGVyczogW1RvYXN0Tm90aWZpY2F0aW9uU2VydmljZSwgVG9hc3ROb3RpZmljYXRpb25Db25maWdTZXJ2aWNlXSxcbiAgZW50cnlDb21wb25lbnRzOiBbVG9hc3ROb3RpZmljYXRpb25XcmFwcGVyQ29tcG9uZW50LCBUb2FzdE5vdGlmaWNhdGlvblNpbXBsZVdyYXBwZXJDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIFRvYXN0Tm90aWZpY2F0aW9uQ29uZmlnTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoXG4gICAgdG9hc3ROb3RpZmljYXRpb25Db25maWc/OiBJVG9hc3ROb3RpZmljYXRpb25Vc2VyQ29uZmlnXG4gICk6IE1vZHVsZVdpdGhQcm92aWRlcnM8VG9hc3ROb3RpZmljYXRpb25Db25maWdNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFRvYXN0Tm90aWZpY2F0aW9uQ29uZmlnTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiAndG9hc3ROb3RpZmljYXRpb25Db25maWcnLFxuICAgICAgICAgIHVzZVZhbHVlOiB0b2FzdE5vdGlmaWNhdGlvbkNvbmZpZ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogJ3RvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nJyxcbiAgICAgICAgICB1c2VDbGFzczogVG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmdcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH07XG4gIH1cbn1cbiJdfQ==