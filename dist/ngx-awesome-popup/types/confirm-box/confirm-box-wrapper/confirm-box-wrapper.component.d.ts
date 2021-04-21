import { AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { GlobalInterface } from '../../../core/global';
import { ConfirmBoxClass } from '../core/model';
import { Observable } from 'rxjs';
export declare class ConfirmBoxWrapperComponent implements AfterViewInit {
    confirmBoxBelonging: ConfirmBoxClass.ConfirmBoxBelonging;
    private cd;
    fadeInOutAnimation: string;
    constructor(confirmBoxBelonging: ConfirmBoxClass.ConfirmBoxBelonging, cd: ChangeDetectorRef);
    ngAfterViewInit(): void;
    setResponse(_IsSuccess: boolean, _ClickedButtonID?: string): void;
    onOverlayClicked(evt: MouseEvent): void;
    onCustomButton(_Button: GlobalInterface.IButton): void;
    onButtonClick(_Type: 'confirm' | 'decline'): void;
    closeParent$(_ClosingAnimation: string): Observable<any>;
}
