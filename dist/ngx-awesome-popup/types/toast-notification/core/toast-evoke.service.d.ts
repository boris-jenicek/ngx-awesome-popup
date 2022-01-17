import { Observable } from 'rxjs';
import { IToastNotificationPublicResponse } from './interfaces';
import * as i0 from "@angular/core";
export declare class ToastEvokeService {
    #private;
    success(title: string, message: string, confirmLabel?: string, declineLabel?: string): Observable<IToastNotificationPublicResponse>;
    info(title: string, message: string, confirmLabel?: string, declineLabel?: string): Observable<IToastNotificationPublicResponse>;
    warning(title: string, message: string, confirmLabel?: string, declineLabel?: string): Observable<IToastNotificationPublicResponse>;
    danger(title: string, message: string, confirmLabel?: string, declineLabel?: string): Observable<IToastNotificationPublicResponse>;
    customOne(title: string, message: string, confirmLabel?: string, declineLabel?: string): Observable<IToastNotificationPublicResponse>;
    customTwo(title: string, message: string, confirmLabel?: string, declineLabel?: string): Observable<IToastNotificationPublicResponse>;
    customThree(title: string, message: string, confirmLabel?: string, declineLabel?: string): Observable<IToastNotificationPublicResponse>;
    customFour(title: string, message: string, confirmLabel?: string, declineLabel?: string): Observable<IToastNotificationPublicResponse>;
    customFive(title: string, message: string, confirmLabel?: string, declineLabel?: string): Observable<IToastNotificationPublicResponse>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ToastEvokeService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ToastEvokeService>;
}
