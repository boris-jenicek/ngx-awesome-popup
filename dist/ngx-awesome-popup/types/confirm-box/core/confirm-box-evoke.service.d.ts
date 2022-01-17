import { Observable } from 'rxjs';
import { IConfirmBoxPublicResponse } from './interfaces';
import * as i0 from "@angular/core";
export declare class ConfirmBoxEvokeService {
    #private;
    success(title: string, message: string, confirmLabel: string, declineLabel?: string): Observable<IConfirmBoxPublicResponse>;
    info(title: string, message: string, confirmLabel: string, declineLabel?: string): Observable<IConfirmBoxPublicResponse>;
    warning(title: string, message: string, confirmLabel: string, declineLabel?: string): Observable<IConfirmBoxPublicResponse>;
    danger(title: string, message: string, confirmLabel: string, declineLabel?: string): Observable<IConfirmBoxPublicResponse>;
    customOne(title: string, message: string, confirmLabel: string, declineLabel?: string): Observable<IConfirmBoxPublicResponse>;
    customTwo(title: string, message: string, confirmLabel: string, declineLabel?: string): Observable<IConfirmBoxPublicResponse>;
    customThree(title: string, message: string, confirmLabel: string, declineLabel?: string): Observable<IConfirmBoxPublicResponse>;
    customFour(title: string, message: string, confirmLabel: string, declineLabel?: string): Observable<IConfirmBoxPublicResponse>;
    customFive(title: string, message: string, confirmLabel: string, declineLabel?: string): Observable<IConfirmBoxPublicResponse>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfirmBoxEvokeService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConfirmBoxEvokeService>;
}
