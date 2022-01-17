import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
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
import * as i0 from "@angular/core";
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
NgxAwesomePopupModule.ɵfac = function NgxAwesomePopupModule_Factory(t) { return new (t || NgxAwesomePopupModule)(i0.ɵɵinject(i0.Injector)); };
NgxAwesomePopupModule.ɵmod = i0.ɵɵdefineNgModule({ type: NgxAwesomePopupModule });
NgxAwesomePopupModule.ɵinj = i0.ɵɵdefineInjector({ providers: [GlobalConfigService], imports: [[CommonModule, BrowserModule, BrowserAnimationsModule]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NgxAwesomePopupModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, BrowserModule, BrowserAnimationsModule],
                providers: [GlobalConfigService]
            }]
    }], function () { return [{ type: i0.Injector }]; }, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NgxAwesomePopupModule, { imports: [CommonModule, BrowserModule, BrowserAnimationsModule] }); })();
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
DialogConfigModule.ɵfac = function DialogConfigModule_Factory(t) { return new (t || DialogConfigModule)(); };
DialogConfigModule.ɵmod = i0.ɵɵdefineNgModule({ type: DialogConfigModule });
DialogConfigModule.ɵinj = i0.ɵɵdefineInjector({ providers: [DialogService, DialogConfigService], imports: [[CommonModule]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DialogConfigModule, [{
        type: NgModule,
        args: [{
                declarations: [DialogWrapperComponent, DefaultLoaderComponent, InsertionDirective, InsertionLoaderDirective],
                imports: [CommonModule],
                providers: [DialogService, DialogConfigService],
                entryComponents: [DialogWrapperComponent, DefaultLoaderComponent]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(DialogConfigModule, { declarations: [DialogWrapperComponent, DefaultLoaderComponent, InsertionDirective, InsertionLoaderDirective], imports: [CommonModule] }); })();
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
ConfirmBoxConfigModule.ɵfac = function ConfirmBoxConfigModule_Factory(t) { return new (t || ConfirmBoxConfigModule)(); };
ConfirmBoxConfigModule.ɵmod = i0.ɵɵdefineNgModule({ type: ConfirmBoxConfigModule });
ConfirmBoxConfigModule.ɵinj = i0.ɵɵdefineInjector({ providers: [ConfirmBoxService, ConfirmBoxConfigService], imports: [[CommonModule]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ConfirmBoxConfigModule, [{
        type: NgModule,
        args: [{
                declarations: [ConfirmBoxWrapperComponent],
                imports: [CommonModule],
                providers: [ConfirmBoxService, ConfirmBoxConfigService],
                entryComponents: [ConfirmBoxWrapperComponent]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(ConfirmBoxConfigModule, { declarations: [ConfirmBoxWrapperComponent], imports: [CommonModule] }); })();
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
ToastNotificationConfigModule.ɵfac = function ToastNotificationConfigModule_Factory(t) { return new (t || ToastNotificationConfigModule)(); };
ToastNotificationConfigModule.ɵmod = i0.ɵɵdefineNgModule({ type: ToastNotificationConfigModule });
ToastNotificationConfigModule.ɵinj = i0.ɵɵdefineInjector({ providers: [ToastNotificationService, ToastNotificationConfigService], imports: [[CommonModule]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ToastNotificationConfigModule, [{
        type: NgModule,
        args: [{
                declarations: [ToastNotificationWrapperComponent, ToastNotificationSimpleWrapperComponent],
                imports: [CommonModule],
                providers: [ToastNotificationService, ToastNotificationConfigService],
                entryComponents: [ToastNotificationWrapperComponent, ToastNotificationSimpleWrapperComponent]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(ToastNotificationConfigModule, { declarations: [ToastNotificationWrapperComponent, ToastNotificationSimpleWrapperComponent], imports: [CommonModule] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWF3ZXNvbWUtcG9wdXAubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbmd4LWF3ZXNvbWUtcG9wdXAvbmd4LWF3ZXNvbWUtcG9wdXAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQWlDLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDMUQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDL0UsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFbkUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDN0UsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDaEUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDbkYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHVFQUF1RSxDQUFDO0FBQ25ILE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHFEQUFxRCxDQUFDO0FBQzlGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBRWpGLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNoRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFFbkUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sd0RB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QUMsWUFBWSxDQUFDO2dCQUN2QixTQUFTLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSx1QkFBdUIsQ0FBQztnQkFDdkQsZUFBZSxFQUFFLENBQUMsMEJBQTBCLENBQUM7YUFDOUM7O3dGQUNZLHNCQUFzQixtQkFMbEIsMEJBQTBCLGFBQy9CLFlBQVk7QUFzQnhCLE1BQU0sT0FBTyw2QkFBNkI7SUFDeEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyx1QkFBc0Q7UUFDbkUsT0FBTztZQUNMLFFBQVEsRUFBRSw2QkFBNkI7WUFDdkMsU0FBUyxFQUFFO2dCQUNUO29CQUNFLE9BQU8sRUFBRSx5QkFBeUI7b0JBQ2xDLFFBQVEsRUFBRSx1QkFBdUI7aUJBQ2xDO2dCQUNEO29CQUNFLE9BQU8sRUFBRSw0QkFBNEI7b0JBQ3JDLFFBQVEsRUFBRSwwQkFBMEI7aUJBQ3JDO2FBQ0Y7U0FDRixDQUFDO0lBQ0osQ0FBQzs7MEdBZlUsNkJBQTZCO2lFQUE3Qiw2QkFBNkI7c0VBSDdCLENBQUMsd0JBQXdCLEVBQUUsOEJBQThCLENBQUMsWUFENUQsQ0FBQyxZQUFZLENBQUM7dUZBSVosNkJBQTZCO2NBTnpDLFFBQVE7ZUFBQztnQkFDUixZQUFZLEVBQUUsQ0FBQyxpQ0FBaUMsRUFBRSx1Q0FBdUMsQ0FBQztnQkFDMUYsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO2dCQUN2QixTQUFTLEVBQUUsQ0FBQyx3QkFBd0IsRUFBRSw4QkFBOEIsQ0FBQztnQkFDckUsZUFBZSxFQUFFLENBQUMsaUNBQWlDLEVBQUUsdUNBQXVDLENBQUM7YUFDOUY7O3dGQUNZLDZCQUE2QixtQkFMekIsaUNBQWlDLEVBQUUsdUNBQXVDLGFBQy9FLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSW5qZWN0b3IsIE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCcm93c2VyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBHbG9iYWxDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi9jb3JlL2dsb2JhbC1jb25maWcuc2VydmljZSc7XG5pbXBvcnQgeyBJR2xvYmFsVXNlckNvbmZpZyB9IGZyb20gJy4vY29yZS9nbG9iYWwtaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBJbnNlcnRpb25Mb2FkZXJEaXJlY3RpdmUgfSBmcm9tICcuL2NvcmUvaW5zZXJ0aW9uLWxvYWRlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgSW5zZXJ0aW9uRGlyZWN0aXZlIH0gZnJvbSAnLi9jb3JlL2luc2VydGlvbi5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGVmYXVsdExvYWRlckNvbXBvbmVudCB9IGZyb20gJy4vZGVmYXVsdC1sb2FkZXIvZGVmYXVsdC1sb2FkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFNlcnZpY2VMb2NhdG9yIH0gZnJvbSAnLi9sb2NhdG9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uZmlybUJveFdyYXBwZXJDb21wb25lbnQgfSBmcm9tICcuL3R5cGVzL2NvbmZpcm0tYm94L2NvbmZpcm0tYm94LXdyYXBwZXIvY29uZmlybS1ib3gtd3JhcHBlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29uZmlybUJveEJlbG9uZ2luZyB9IGZyb20gJy4vdHlwZXMvY29uZmlybS1ib3gvY29yZS9jbGFzc2VzJztcbmltcG9ydCB7IENvbmZpcm1Cb3hDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi90eXBlcy9jb25maXJtLWJveC9jb3JlL2NvbmZpcm0tYm94LWNvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpcm1Cb3hTZXJ2aWNlIH0gZnJvbSAnLi90eXBlcy9jb25maXJtLWJveC9jb3JlL2NvbmZpcm0tYm94LXNlcnZpY2UnO1xuaW1wb3J0IHsgSUNvbmZpcm1Cb3hVc2VyQ29uZmlnIH0gZnJvbSAnLi90eXBlcy9jb25maXJtLWJveC9jb3JlL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgRGlhbG9nQmVsb25naW5nIH0gZnJvbSAnLi90eXBlcy9kaWFsb2cvY29yZS9jbGFzc2VzJztcbmltcG9ydCB7IERpYWxvZ0NvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL3R5cGVzL2RpYWxvZy9jb3JlL2RpYWxvZy1jb25maWcuc2VydmljZSc7XG5pbXBvcnQgeyBEaWFsb2dTZXJ2aWNlIH0gZnJvbSAnLi90eXBlcy9kaWFsb2cvY29yZS9kaWFsb2cuc2VydmljZSc7XG5pbXBvcnQgeyBJRGlhbG9nVXNlckNvbmZpZyB9IGZyb20gJy4vdHlwZXMvZGlhbG9nL2NvcmUvaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBEaWFsb2dXcmFwcGVyQ29tcG9uZW50IH0gZnJvbSAnLi90eXBlcy9kaWFsb2cvZGlhbG9nLXdyYXBwZXIvZGlhbG9nLXdyYXBwZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nIH0gZnJvbSAnLi90eXBlcy90b2FzdC1ub3RpZmljYXRpb24vY29yZS9jbGFzc2VzJztcbmltcG9ydCB7IElUb2FzdE5vdGlmaWNhdGlvblVzZXJDb25maWcgfSBmcm9tICcuL3R5cGVzL3RvYXN0LW5vdGlmaWNhdGlvbi9jb3JlL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgVG9hc3ROb3RpZmljYXRpb25Db25maWdTZXJ2aWNlIH0gZnJvbSAnLi90eXBlcy90b2FzdC1ub3RpZmljYXRpb24vY29yZS90b2FzdC1ub3RpZmljYXRpb24tY29uZmlnLnNlcnZpY2UnO1xuaW1wb3J0IHsgVG9hc3ROb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi90eXBlcy90b2FzdC1ub3RpZmljYXRpb24vY29yZS90b2FzdC1ub3RpZmljYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBUb2FzdE5vdGlmaWNhdGlvblNpbXBsZVdyYXBwZXJDb21wb25lbnQgfSBmcm9tICcuL3R5cGVzL3RvYXN0LW5vdGlmaWNhdGlvbi90b2FzdC1ub3RpZmljYXRpb24tc2ltcGxlLXdyYXBwZXIvdG9hc3Qtbm90aWZpY2F0aW9uLXNpbXBsZS13cmFwcGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUb2FzdE5vdGlmaWNhdGlvbldyYXBwZXJDb21wb25lbnQgfSBmcm9tICcuL3R5cGVzL3RvYXN0LW5vdGlmaWNhdGlvbi90b2FzdC1ub3RpZmljYXRpb24td3JhcHBlci90b2FzdC1ub3RpZmljYXRpb24td3JhcHBlci5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBCcm93c2VyTW9kdWxlLCBCcm93c2VyQW5pbWF0aW9uc01vZHVsZV0sXG4gIHByb3ZpZGVyczogW0dsb2JhbENvbmZpZ1NlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIE5neEF3ZXNvbWVQb3B1cE1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgU2VydmljZUxvY2F0b3IuaW5qZWN0b3IgPSBpbmplY3RvcjtcbiAgfVxuXG4gIHN0YXRpYyBmb3JSb290KGdsb2JhbENvbmZpZz86IElHbG9iYWxVc2VyQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVyczxOZ3hBd2Vzb21lUG9wdXBNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE5neEF3ZXNvbWVQb3B1cE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW3sgcHJvdmlkZTogJ2NkR2xvYmFsQ29uZmlnJywgdXNlVmFsdWU6IGdsb2JhbENvbmZpZyB9XVxuICAgIH07XG4gIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbRGlhbG9nV3JhcHBlckNvbXBvbmVudCwgRGVmYXVsdExvYWRlckNvbXBvbmVudCwgSW5zZXJ0aW9uRGlyZWN0aXZlLCBJbnNlcnRpb25Mb2FkZXJEaXJlY3RpdmVdLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbRGlhbG9nU2VydmljZSwgRGlhbG9nQ29uZmlnU2VydmljZV0sXG4gIGVudHJ5Q29tcG9uZW50czogW0RpYWxvZ1dyYXBwZXJDb21wb25lbnQsIERlZmF1bHRMb2FkZXJDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIERpYWxvZ0NvbmZpZ01vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KGRpYWxvZ0NvbmZpZz86IElEaWFsb2dVc2VyQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVyczxEaWFsb2dDb25maWdNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IERpYWxvZ0NvbmZpZ01vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6ICdkaWFsb2dDb25maWcnLCB1c2VWYWx1ZTogZGlhbG9nQ29uZmlnIH0sXG4gICAgICAgIHsgcHJvdmlkZTogJ2RpYWxvZ0JlbG9uZ2luZycsIHVzZUNsYXNzOiBEaWFsb2dCZWxvbmdpbmcgfVxuICAgICAgXVxuICAgIH07XG4gIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbQ29uZmlybUJveFdyYXBwZXJDb21wb25lbnRdLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbQ29uZmlybUJveFNlcnZpY2UsIENvbmZpcm1Cb3hDb25maWdTZXJ2aWNlXSxcbiAgZW50cnlDb21wb25lbnRzOiBbQ29uZmlybUJveFdyYXBwZXJDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIENvbmZpcm1Cb3hDb25maWdNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChjb25maXJtQm94Q29uZmlnPzogSUNvbmZpcm1Cb3hVc2VyQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVyczxDb25maXJtQm94Q29uZmlnTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBDb25maXJtQm94Q29uZmlnTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHsgcHJvdmlkZTogJ2NvbmZpcm1Cb3hDb25maWcnLCB1c2VWYWx1ZTogY29uZmlybUJveENvbmZpZyB9LFxuICAgICAgICB7IHByb3ZpZGU6ICdjb25maXJtQm94QmVsb25naW5nJywgdXNlQ2xhc3M6IENvbmZpcm1Cb3hCZWxvbmdpbmcgfVxuICAgICAgXVxuICAgIH07XG4gIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbVG9hc3ROb3RpZmljYXRpb25XcmFwcGVyQ29tcG9uZW50LCBUb2FzdE5vdGlmaWNhdGlvblNpbXBsZVdyYXBwZXJDb21wb25lbnRdLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbVG9hc3ROb3RpZmljYXRpb25TZXJ2aWNlLCBUb2FzdE5vdGlmaWNhdGlvbkNvbmZpZ1NlcnZpY2VdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtUb2FzdE5vdGlmaWNhdGlvbldyYXBwZXJDb21wb25lbnQsIFRvYXN0Tm90aWZpY2F0aW9uU2ltcGxlV3JhcHBlckNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgVG9hc3ROb3RpZmljYXRpb25Db25maWdNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdCh0b2FzdE5vdGlmaWNhdGlvbkNvbmZpZz86IElUb2FzdE5vdGlmaWNhdGlvblVzZXJDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFRvYXN0Tm90aWZpY2F0aW9uQ29uZmlnTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBUb2FzdE5vdGlmaWNhdGlvbkNvbmZpZ01vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogJ3RvYXN0Tm90aWZpY2F0aW9uQ29uZmlnJyxcbiAgICAgICAgICB1c2VWYWx1ZTogdG9hc3ROb3RpZmljYXRpb25Db25maWdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6ICd0b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZycsXG4gICAgICAgICAgdXNlQ2xhc3M6IFRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG4iXX0=