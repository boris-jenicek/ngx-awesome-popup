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
NgxAwesomePopupModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NgxAwesomePopupModule, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.NgModule });
NgxAwesomePopupModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NgxAwesomePopupModule, imports: [CommonModule, BrowserModule, BrowserAnimationsModule] });
NgxAwesomePopupModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NgxAwesomePopupModule, providers: [GlobalConfigService], imports: [[CommonModule, BrowserModule, BrowserAnimationsModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NgxAwesomePopupModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, BrowserModule, BrowserAnimationsModule],
                    providers: [GlobalConfigService]
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });
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
DialogConfigModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: DialogConfigModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
DialogConfigModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: DialogConfigModule, declarations: [DialogWrapperComponent, DefaultLoaderComponent, InsertionDirective, InsertionLoaderDirective], imports: [CommonModule] });
DialogConfigModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: DialogConfigModule, providers: [DialogService, DialogConfigService], imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: DialogConfigModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [DialogWrapperComponent, DefaultLoaderComponent, InsertionDirective, InsertionLoaderDirective],
                    imports: [CommonModule],
                    providers: [DialogService, DialogConfigService],
                    entryComponents: [DialogWrapperComponent, DefaultLoaderComponent]
                }]
        }] });
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
ConfirmBoxConfigModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ConfirmBoxConfigModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfirmBoxConfigModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ConfirmBoxConfigModule, declarations: [ConfirmBoxWrapperComponent], imports: [CommonModule] });
ConfirmBoxConfigModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ConfirmBoxConfigModule, providers: [ConfirmBoxService, ConfirmBoxConfigService], imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ConfirmBoxConfigModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ConfirmBoxWrapperComponent],
                    imports: [CommonModule],
                    providers: [ConfirmBoxService, ConfirmBoxConfigService],
                    entryComponents: [ConfirmBoxWrapperComponent]
                }]
        }] });
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
ToastNotificationConfigModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ToastNotificationConfigModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ToastNotificationConfigModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ToastNotificationConfigModule, declarations: [ToastNotificationWrapperComponent, ToastNotificationSimpleWrapperComponent], imports: [CommonModule] });
ToastNotificationConfigModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ToastNotificationConfigModule, providers: [ToastNotificationService, ToastNotificationConfigService], imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ToastNotificationConfigModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ToastNotificationWrapperComponent, ToastNotificationSimpleWrapperComponent],
                    imports: [CommonModule],
                    providers: [ToastNotificationService, ToastNotificationConfigService],
                    entryComponents: [ToastNotificationWrapperComponent, ToastNotificationSimpleWrapperComponent]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWF3ZXNvbWUtcG9wdXAubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbmd4LWF3ZXNvbWUtcG9wdXAvbmd4LWF3ZXNvbWUtcG9wdXAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQWlDLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDMUQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDL0UsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFbkUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDN0UsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDaEUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDbkYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHVFQUF1RSxDQUFDO0FBQ25ILE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHFEQUFxRCxDQUFDO0FBQzlGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBRWpGLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNoRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFFbkUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sd0RB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LEVBQUUsQ0FBQywwQkFBMEIsQ0FBQztvQkFDMUMsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixTQUFTLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSx1QkFBdUIsQ0FBQztvQkFDdkQsZUFBZSxFQUFFLENBQUMsMEJBQTBCLENBQUM7aUJBQzlDOztBQW1CRCxNQUFNLE9BQU8sNkJBQTZCO0lBQ3hDLE1BQU0sQ0FBQyxPQUFPLENBQUMsdUJBQXNEO1FBQ25FLE9BQU87WUFDTCxRQUFRLEVBQUUsNkJBQTZCO1lBQ3ZDLFNBQVMsRUFBRTtnQkFDVDtvQkFDRSxPQUFPLEVBQUUseUJBQXlCO29CQUNsQyxRQUFRLEVBQUUsdUJBQXVCO2lCQUNsQztnQkFDRDtvQkFDRSxPQUFPLEVBQUUsNEJBQTRCO29CQUNyQyxRQUFRLEVBQUUsMEJBQTBCO2lCQUNyQzthQUNGO1NBQ0YsQ0FBQztJQUNKLENBQUM7OzBIQWZVLDZCQUE2QjsySEFBN0IsNkJBQTZCLGlCQUx6QixpQ0FBaUMsRUFBRSx1Q0FBdUMsYUFDL0UsWUFBWTsySEFJWCw2QkFBNkIsYUFIN0IsQ0FBQyx3QkFBd0IsRUFBRSw4QkFBOEIsQ0FBQyxZQUQ1RCxDQUFDLFlBQVksQ0FBQzsyRkFJWiw2QkFBNkI7a0JBTnpDLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFLENBQUMsaUNBQWlDLEVBQUUsdUNBQXVDLENBQUM7b0JBQzFGLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDdkIsU0FBUyxFQUFFLENBQUMsd0JBQXdCLEVBQUUsOEJBQThCLENBQUM7b0JBQ3JFLGVBQWUsRUFBRSxDQUFDLGlDQUFpQyxFQUFFLHVDQUF1QyxDQUFDO2lCQUM5RiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBJbmplY3RvciwgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJyb3dzZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IEJyb3dzZXJBbmltYXRpb25zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7IEdsb2JhbENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL2NvcmUvZ2xvYmFsLWNvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7IElHbG9iYWxVc2VyQ29uZmlnIH0gZnJvbSAnLi9jb3JlL2dsb2JhbC1pbnRlcmZhY2VzJztcbmltcG9ydCB7IEluc2VydGlvbkxvYWRlckRpcmVjdGl2ZSB9IGZyb20gJy4vY29yZS9pbnNlcnRpb24tbG9hZGVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBJbnNlcnRpb25EaXJlY3RpdmUgfSBmcm9tICcuL2NvcmUvaW5zZXJ0aW9uLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEZWZhdWx0TG9hZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9kZWZhdWx0LWxvYWRlci9kZWZhdWx0LWxvYWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VydmljZUxvY2F0b3IgfSBmcm9tICcuL2xvY2F0b3Iuc2VydmljZSc7XG5pbXBvcnQgeyBDb25maXJtQm94V3JhcHBlckNvbXBvbmVudCB9IGZyb20gJy4vdHlwZXMvY29uZmlybS1ib3gvY29uZmlybS1ib3gtd3JhcHBlci9jb25maXJtLWJveC13cmFwcGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb25maXJtQm94QmVsb25naW5nIH0gZnJvbSAnLi90eXBlcy9jb25maXJtLWJveC9jb3JlL2NsYXNzZXMnO1xuaW1wb3J0IHsgQ29uZmlybUJveENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL3R5cGVzL2NvbmZpcm0tYm94L2NvcmUvY29uZmlybS1ib3gtY29uZmlnLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uZmlybUJveFNlcnZpY2UgfSBmcm9tICcuL3R5cGVzL2NvbmZpcm0tYm94L2NvcmUvY29uZmlybS1ib3gtc2VydmljZSc7XG5pbXBvcnQgeyBJQ29uZmlybUJveFVzZXJDb25maWcgfSBmcm9tICcuL3R5cGVzL2NvbmZpcm0tYm94L2NvcmUvaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBEaWFsb2dCZWxvbmdpbmcgfSBmcm9tICcuL3R5cGVzL2RpYWxvZy9jb3JlL2NsYXNzZXMnO1xuaW1wb3J0IHsgRGlhbG9nQ29uZmlnU2VydmljZSB9IGZyb20gJy4vdHlwZXMvZGlhbG9nL2NvcmUvZGlhbG9nLWNvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7IERpYWxvZ1NlcnZpY2UgfSBmcm9tICcuL3R5cGVzL2RpYWxvZy9jb3JlL2RpYWxvZy5zZXJ2aWNlJztcbmltcG9ydCB7IElEaWFsb2dVc2VyQ29uZmlnIH0gZnJvbSAnLi90eXBlcy9kaWFsb2cvY29yZS9pbnRlcmZhY2VzJztcbmltcG9ydCB7IERpYWxvZ1dyYXBwZXJDb21wb25lbnQgfSBmcm9tICcuL3R5cGVzL2RpYWxvZy9kaWFsb2ctd3JhcHBlci9kaWFsb2ctd3JhcHBlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcgfSBmcm9tICcuL3R5cGVzL3RvYXN0LW5vdGlmaWNhdGlvbi9jb3JlL2NsYXNzZXMnO1xuaW1wb3J0IHsgSVRvYXN0Tm90aWZpY2F0aW9uVXNlckNvbmZpZyB9IGZyb20gJy4vdHlwZXMvdG9hc3Qtbm90aWZpY2F0aW9uL2NvcmUvaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBUb2FzdE5vdGlmaWNhdGlvbkNvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL3R5cGVzL3RvYXN0LW5vdGlmaWNhdGlvbi9jb3JlL3RvYXN0LW5vdGlmaWNhdGlvbi1jb25maWcuc2VydmljZSc7XG5pbXBvcnQgeyBUb2FzdE5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tICcuL3R5cGVzL3RvYXN0LW5vdGlmaWNhdGlvbi9jb3JlL3RvYXN0LW5vdGlmaWNhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFRvYXN0Tm90aWZpY2F0aW9uU2ltcGxlV3JhcHBlckNvbXBvbmVudCB9IGZyb20gJy4vdHlwZXMvdG9hc3Qtbm90aWZpY2F0aW9uL3RvYXN0LW5vdGlmaWNhdGlvbi1zaW1wbGUtd3JhcHBlci90b2FzdC1ub3RpZmljYXRpb24tc2ltcGxlLXdyYXBwZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFRvYXN0Tm90aWZpY2F0aW9uV3JhcHBlckNvbXBvbmVudCB9IGZyb20gJy4vdHlwZXMvdG9hc3Qtbm90aWZpY2F0aW9uL3RvYXN0LW5vdGlmaWNhdGlvbi13cmFwcGVyL3RvYXN0LW5vdGlmaWNhdGlvbi13cmFwcGVyLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEJyb3dzZXJNb2R1bGUsIEJyb3dzZXJBbmltYXRpb25zTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbR2xvYmFsQ29uZmlnU2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgTmd4QXdlc29tZVBvcHVwTW9kdWxlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgICBTZXJ2aWNlTG9jYXRvci5pbmplY3RvciA9IGluamVjdG9yO1xuICB9XG5cbiAgc3RhdGljIGZvclJvb3QoZ2xvYmFsQ29uZmlnPzogSUdsb2JhbFVzZXJDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPE5neEF3ZXNvbWVQb3B1cE1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTmd4QXdlc29tZVBvcHVwTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiAnY2RHbG9iYWxDb25maWcnLCB1c2VWYWx1ZTogZ2xvYmFsQ29uZmlnIH1dXG4gICAgfTtcbiAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtEaWFsb2dXcmFwcGVyQ29tcG9uZW50LCBEZWZhdWx0TG9hZGVyQ29tcG9uZW50LCBJbnNlcnRpb25EaXJlY3RpdmUsIEluc2VydGlvbkxvYWRlckRpcmVjdGl2ZV0sXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBwcm92aWRlcnM6IFtEaWFsb2dTZXJ2aWNlLCBEaWFsb2dDb25maWdTZXJ2aWNlXSxcbiAgZW50cnlDb21wb25lbnRzOiBbRGlhbG9nV3JhcHBlckNvbXBvbmVudCwgRGVmYXVsdExvYWRlckNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgRGlhbG9nQ29uZmlnTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoZGlhbG9nQ29uZmlnPzogSURpYWxvZ1VzZXJDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPERpYWxvZ0NvbmZpZ01vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogRGlhbG9nQ29uZmlnTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHsgcHJvdmlkZTogJ2RpYWxvZ0NvbmZpZycsIHVzZVZhbHVlOiBkaWFsb2dDb25maWcgfSxcbiAgICAgICAgeyBwcm92aWRlOiAnZGlhbG9nQmVsb25naW5nJywgdXNlQ2xhc3M6IERpYWxvZ0JlbG9uZ2luZyB9XG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtDb25maXJtQm94V3JhcHBlckNvbXBvbmVudF0sXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBwcm92aWRlcnM6IFtDb25maXJtQm94U2VydmljZSwgQ29uZmlybUJveENvbmZpZ1NlcnZpY2VdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtDb25maXJtQm94V3JhcHBlckNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgQ29uZmlybUJveENvbmZpZ01vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KGNvbmZpcm1Cb3hDb25maWc/OiBJQ29uZmlybUJveFVzZXJDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPENvbmZpcm1Cb3hDb25maWdNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IENvbmZpcm1Cb3hDb25maWdNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiAnY29uZmlybUJveENvbmZpZycsIHVzZVZhbHVlOiBjb25maXJtQm94Q29uZmlnIH0sXG4gICAgICAgIHsgcHJvdmlkZTogJ2NvbmZpcm1Cb3hCZWxvbmdpbmcnLCB1c2VDbGFzczogQ29uZmlybUJveEJlbG9uZ2luZyB9XG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtUb2FzdE5vdGlmaWNhdGlvbldyYXBwZXJDb21wb25lbnQsIFRvYXN0Tm90aWZpY2F0aW9uU2ltcGxlV3JhcHBlckNvbXBvbmVudF0sXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBwcm92aWRlcnM6IFtUb2FzdE5vdGlmaWNhdGlvblNlcnZpY2UsIFRvYXN0Tm90aWZpY2F0aW9uQ29uZmlnU2VydmljZV0sXG4gIGVudHJ5Q29tcG9uZW50czogW1RvYXN0Tm90aWZpY2F0aW9uV3JhcHBlckNvbXBvbmVudCwgVG9hc3ROb3RpZmljYXRpb25TaW1wbGVXcmFwcGVyQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBUb2FzdE5vdGlmaWNhdGlvbkNvbmZpZ01vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KHRvYXN0Tm90aWZpY2F0aW9uQ29uZmlnPzogSVRvYXN0Tm90aWZpY2F0aW9uVXNlckNvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnM8VG9hc3ROb3RpZmljYXRpb25Db25maWdNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFRvYXN0Tm90aWZpY2F0aW9uQ29uZmlnTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiAndG9hc3ROb3RpZmljYXRpb25Db25maWcnLFxuICAgICAgICAgIHVzZVZhbHVlOiB0b2FzdE5vdGlmaWNhdGlvbkNvbmZpZ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogJ3RvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nJyxcbiAgICAgICAgICB1c2VDbGFzczogVG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmdcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH07XG4gIH1cbn1cbiJdfQ==