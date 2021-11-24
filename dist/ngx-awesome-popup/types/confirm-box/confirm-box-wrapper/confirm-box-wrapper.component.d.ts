import { AfterViewInit, ChangeDetectorRef, ElementRef, QueryList } from '@angular/core';
import { Observable } from 'rxjs';
import { AppearanceAnimation, DisappearanceAnimation } from '../../../core/enums';
import { IButton } from '../../../core/global-interfaces';
import { ConfirmBoxBelonging } from '../core/classes';
export declare class ConfirmBoxWrapperComponent implements AfterViewInit {
    confirmBoxBelonging: ConfirmBoxBelonging;
    private cd;
    elConfirmBoxWrapper: ElementRef;
    elTextWrapper: ElementRef;
    elTitleWrapper: ElementRef;
    elButtonWrapper: ElementRef;
    elButton: QueryList<ElementRef>;
    fadeInOutAnimation: string;
    animationFlyDirection: string;
    boxAnimation: AppearanceAnimation | DisappearanceAnimation;
    constructor(confirmBoxBelonging: ConfirmBoxBelonging, cd: ChangeDetectorRef);
    ngAfterViewInit(): void;
    setResponse(_IsSuccess: boolean, _ClickedButtonID?: string): void;
    onOverlayClicked(evt: MouseEvent): void;
    onCustomButton(_Button: IButton): void;
    onButtonClick(_Type: 'confirm' | 'decline'): void;
    closeParent$(): Observable<any>;
    setCustomStyles(): void;
}
