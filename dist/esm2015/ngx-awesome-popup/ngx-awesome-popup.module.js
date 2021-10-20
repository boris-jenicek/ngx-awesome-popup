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
            providers: [{ provide: GlobalConfigService, useValue: globalConfig }]
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
            providers: [
                DialogConfigService,
                { provide: 'dialogConfig', useValue: dialogConfig, multi: true }
            ]
        };
    }
}
DialogConfigModule.decorators = [
    { type: NgModule, args: [{},] }
];
// @dynamic
export class ConfirmBoxConfigModule {
    static forRoot(confirmBoxConfig) {
        return {
            ngModule: ConfirmBoxConfigModule,
            providers: [
                ConfirmBoxConfigService,
                { provide: 'confirmBoxConfig', useValue: confirmBoxConfig || {} }
            ]
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
                    provide: 'toastNotificationConfig',
                    useValue: toastNotificationConfig,
                    multi: true
                }
            ]
        };
    }
}
ToastNotificationConfigModule.decorators = [
    { type: NgModule, args: [{},] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWF3ZXNvbWUtcG9wdXAubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbmd4LWF3ZXNvbWUtcG9wdXAvbmd4LWF3ZXNvbWUtcG9wdXAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDeEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzFELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBRS9FLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ25FLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSx1RUFBdUUsQ0FBQztBQUNuSCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxxREFBcUQsQ0FBQztBQUM5RixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUNqRixPQUFPLEVBQ0wsZUFBZSxFQUVoQixNQUFNLGdDQUFnQyxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNuRSxPQUFPLEVBQUUsV0FBVyxFQUFtQixNQUFNLDJCQUEyQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxzQkFBc0IsRUFB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b250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBJbmplY3RvciwgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJyb3dzZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IEJyb3dzZXJBbmltYXRpb25zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7IEdsb2JhbEludGVyZmFjZSB9IGZyb20gJy4vY29yZS9nbG9iYWwnO1xuaW1wb3J0IHsgR2xvYmFsQ29uZmlnU2VydmljZSB9IGZyb20gJy4vY29yZS9nbG9iYWwtY29uZmlnLnNlcnZpY2UnO1xuaW1wb3J0IHsgSW5zZXJ0aW9uTG9hZGVyRGlyZWN0aXZlIH0gZnJvbSAnLi9jb3JlL2luc2VydGlvbi1sb2FkZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IEluc2VydGlvbkRpcmVjdGl2ZSB9IGZyb20gJy4vY29yZS9pbnNlcnRpb24uZGlyZWN0aXZlJztcbmltcG9ydCB7IERlZmF1bHRMb2FkZXJDb21wb25lbnQgfSBmcm9tICcuL2RlZmF1bHQtbG9hZGVyL2RlZmF1bHQtbG9hZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZXJ2aWNlTG9jYXRvciB9IGZyb20gJy4vbG9jYXRvci5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpcm1Cb3hXcmFwcGVyQ29tcG9uZW50IH0gZnJvbSAnLi90eXBlcy9jb25maXJtLWJveC9jb25maXJtLWJveC13cmFwcGVyL2NvbmZpcm0tYm94LXdyYXBwZXIuY29tcG9uZW50JztcbmltcG9ydCB7IENvbmZpcm1Cb3hDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi90eXBlcy9jb25maXJtLWJveC9jb3JlL2NvbmZpcm0tYm94LWNvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpcm1Cb3hTZXJ2aWNlIH0gZnJvbSAnLi90eXBlcy9jb25maXJtLWJveC9jb3JlL2NvbmZpcm0tYm94LXNlcnZpY2UnO1xuaW1wb3J0IHtcbiAgQ29uZmlybUJveENsYXNzLFxuICBDb25maXJtQm94SW50ZXJmYWNlXG59IGZyb20gJy4vdHlwZXMvY29uZmlybS1ib3gvY29yZS9tb2RlbCc7XG5pbXBvcnQgeyBEaWFsb2dDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi90eXBlcy9kaWFsb2cvY29yZS9kaWFsb2ctY29uZmlnLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGlhbG9nU2VydmljZSB9IGZyb20gJy4vdHlwZXMvZGlhbG9nL2NvcmUvZGlhbG9nLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGlhbG9nQ2xhc3MsIERpYWxvZ0ludGVyZmFjZSB9IGZyb20gJy4vdHlwZXMvZGlhbG9nL2NvcmUvbW9kZWwnO1xuaW1wb3J0IHsgRGlhbG9nV3JhcHBlckNvbXBvbmVudCB9IGZyb20gJy4vdHlwZXMvZGlhbG9nL2RpYWxvZy13cmFwcGVyL2RpYWxvZy13cmFwcGVyLmNvbXBvbmVudCc7XG5pbXBvcnQge1xuICBUb2FzdE5vdGlmaWNhdGlvbkNsYXNzLFxuICBUb2FzdE5vdGlmaWNhdGlvbkludGVyZmFjZVxufSBmcm9tICcuL3R5cGVzL3RvYXN0LW5vdGlmaWNhdGlvbi9jb3JlL21vZGVsJztcbmltcG9ydCB7IFRvYXN0Tm90aWZpY2F0aW9uQ29uZmlnU2VydmljZSB9IGZyb20gJy4vdHlwZXMvdG9hc3Qtbm90aWZpY2F0aW9uL2NvcmUvdG9hc3Qtbm90aWZpY2F0aW9uLWNvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7IFRvYXN0Tm90aWZpY2F0aW9uU2VydmljZSB9IGZyb20gJy4vdHlwZXMvdG9hc3Qtbm90aWZpY2F0aW9uL2NvcmUvdG9hc3Qtbm90aWZpY2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgVG9hc3ROb3RpZmljYXRpb25TaW1wbGVXcmFwcGVyQ29tcG9uZW50IH0gZnJvbSAnLi90eXBlcy90b2FzdC1ub3RpZmljYXRpb24vdG9hc3Qtbm90aWZpY2F0aW9uLXNpbXBsZS13cmFwcGVyL3RvYXN0LW5vdGlmaWNhdGlvbi1zaW1wbGUtd3JhcHBlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVG9hc3ROb3RpZmljYXRpb25XcmFwcGVyQ29tcG9uZW50IH0gZnJvbSAnLi90eXBlcy90b2FzdC1ub3RpZmljYXRpb24vdG9hc3Qtbm90aWZpY2F0aW9uLXdyYXBwZXIvdG9hc3Qtbm90aWZpY2F0aW9uLXdyYXBwZXIuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRGlhbG9nV3JhcHBlckNvbXBvbmVudCxcbiAgICBJbnNlcnRpb25EaXJlY3RpdmUsXG4gICAgSW5zZXJ0aW9uTG9hZGVyRGlyZWN0aXZlLFxuICAgIERlZmF1bHRMb2FkZXJDb21wb25lbnQsXG4gICAgQ29uZmlybUJveFdyYXBwZXJDb21wb25lbnQsXG4gICAgVG9hc3ROb3RpZmljYXRpb25XcmFwcGVyQ29tcG9uZW50LFxuICAgIFRvYXN0Tm90aWZpY2F0aW9uU2ltcGxlV3JhcHBlckNvbXBvbmVudFxuICBdLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBCcm93c2VyTW9kdWxlLCBCcm93c2VyQW5pbWF0aW9uc01vZHVsZV0sXG4gIHByb3ZpZGVyczogW1xuICAgIERpYWxvZ1NlcnZpY2UsXG4gICAgQ29uZmlybUJveFNlcnZpY2UsXG4gICAgVG9hc3ROb3RpZmljYXRpb25TZXJ2aWNlLFxuICAgIEdsb2JhbENvbmZpZ1NlcnZpY2UsXG4gICAgRGlhbG9nQ29uZmlnU2VydmljZSxcbiAgICBDb25maXJtQm94Q29uZmlnU2VydmljZSxcbiAgICBUb2FzdE5vdGlmaWNhdGlvbkNvbmZpZ1NlcnZpY2UsXG4gICAgRGlhbG9nQ2xhc3MuRGlhbG9nQmVsb25naW5nLFxuICAgIENvbmZpcm1Cb3hDbGFzcy5Db25maXJtQm94QmVsb25naW5nLFxuICAgIFRvYXN0Tm90aWZpY2F0aW9uQ2xhc3MuVG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmdcbiAgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgRGlhbG9nV3JhcHBlckNvbXBvbmVudCxcbiAgICBEZWZhdWx0TG9hZGVyQ29tcG9uZW50LFxuICAgIENvbmZpcm1Cb3hXcmFwcGVyQ29tcG9uZW50LFxuICAgIFRvYXN0Tm90aWZpY2F0aW9uV3JhcHBlckNvbXBvbmVudCxcbiAgICBUb2FzdE5vdGlmaWNhdGlvblNpbXBsZVdyYXBwZXJDb21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hBd2Vzb21lUG9wdXBNb2R1bGUge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgICBwcml2YXRlIGdDb25maWdTZXJ2aWNlOiBHbG9iYWxDb25maWdTZXJ2aWNlXG4gICkge1xuICAgIFNlcnZpY2VMb2NhdG9yLmluamVjdG9yID0gaW5qZWN0b3I7XG4gIH1cblxuICBzdGF0aWMgZm9yUm9vdChcbiAgICBnbG9iYWxDb25maWc/OiBHbG9iYWxJbnRlcmZhY2UuSUdsb2JhbFVzZXJDb25maWdcbiAgKTogTW9kdWxlV2l0aFByb3ZpZGVyczxOZ3hBd2Vzb21lUG9wdXBNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE5neEF3ZXNvbWVQb3B1cE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW3sgcHJvdmlkZTogR2xvYmFsQ29uZmlnU2VydmljZSwgdXNlVmFsdWU6IGdsb2JhbENvbmZpZyB9XVxuICAgIH07XG4gIH1cbn1cblxuQE5nTW9kdWxlKHt9KVxuZXhwb3J0IGNsYXNzIERpYWxvZ0NvbmZpZ01vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KFxuICAgIGRpYWxvZ0NvbmZpZz86IERpYWxvZ0ludGVyZmFjZS5JRGlhbG9nVXNlckNvbmZpZ1xuICApOiBNb2R1bGVXaXRoUHJvdmlkZXJzPERpYWxvZ0NvbmZpZ01vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogRGlhbG9nQ29uZmlnTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIERpYWxvZ0NvbmZpZ1NlcnZpY2UsXG4gICAgICAgIHsgcHJvdmlkZTogJ2RpYWxvZ0NvbmZpZycsIHVzZVZhbHVlOiBkaWFsb2dDb25maWcsIG11bHRpOiB0cnVlIH1cbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG4vLyBAZHluYW1pY1xuQE5nTW9kdWxlKHt9KVxuZXhwb3J0IGNsYXNzIENvbmZpcm1Cb3hDb25maWdNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChcbiAgICBjb25maXJtQm94Q29uZmlnPzogQ29uZmlybUJveEludGVyZmFjZS5JQ29uZmlybUJveFVzZXJDb25maWdcbiAgKTogTW9kdWxlV2l0aFByb3ZpZGVyczxDb25maXJtQm94Q29uZmlnTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBDb25maXJtQm94Q29uZmlnTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIENvbmZpcm1Cb3hDb25maWdTZXJ2aWNlLFxuICAgICAgICB7IHByb3ZpZGU6ICdjb25maXJtQm94Q29uZmlnJywgdXNlVmFsdWU6IGNvbmZpcm1Cb3hDb25maWcgfHwge30gfVxuICAgICAgXVxuICAgIH07XG4gIH1cbn1cblxuQE5nTW9kdWxlKHt9KVxuZXhwb3J0IGNsYXNzIFRvYXN0Tm90aWZpY2F0aW9uQ29uZmlnTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoXG4gICAgdG9hc3ROb3RpZmljYXRpb25Db25maWc/OiBUb2FzdE5vdGlmaWNhdGlvbkludGVyZmFjZS5JVG9hc3ROb3RpZmljYXRpb25Vc2VyQ29uZmlnXG4gICk6IE1vZHVsZVdpdGhQcm92aWRlcnM8VG9hc3ROb3RpZmljYXRpb25Db25maWdNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFRvYXN0Tm90aWZpY2F0aW9uQ29uZmlnTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIFRvYXN0Tm90aWZpY2F0aW9uQ29uZmlnU2VydmljZSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6ICd0b2FzdE5vdGlmaWNhdGlvbkNvbmZpZycsXG4gICAgICAgICAgdXNlVmFsdWU6IHRvYXN0Tm90aWZpY2F0aW9uQ29uZmlnLFxuICAgICAgICAgIG11bHRpOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG4iXX0=