import { AfterViewInit, ChangeDetectorRef, ElementRef, QueryList } from '@angular/core';
import { Observable } from 'rxjs';
import { AppearanceAnimation, ButtonLayoutDisplay, DisappearanceAnimation } from '../../../core/enums';
import { IButton } from '../../../core/global-interfaces';
import { LayoutHelperService } from '../../../core/layout-helper.service';
import { ConfirmBoxBelonging } from '../core/classes';
export declare class ConfirmBoxWrapperComponent implements AfterViewInit {
    confirmBoxBelonging: ConfirmBoxBelonging;
    private cd;
    layoutHelper: LayoutHelperService;
    elConfirmBoxWrapper: ElementRef;
    elTextWrapper: ElementRef;
    elTitleWrapper: ElementRef;
    elButtonWrapper: ElementRef;
    elButton: QueryList<ElementRef>;
    fadeInOutAnimation: string;
    boxAnimation: AppearanceAnimation | DisappearanceAnimation;
    constructor(confirmBoxBelonging: ConfirmBoxBelonging, cd: ChangeDetectorRef, layoutHelper: LayoutHelperService);
    ngAfterViewInit(): void;
    setResponse(_IsSuccess: boolean, _ClickedButtonID?: string): void;
    onOverlayClicked(evt: MouseEvent): void;
    onCustomButton(_Button: IButton): void;
    onButtonClick(_Type: 'confirm' | 'decline'): void;
    closeParent$(): Observable<any>;
    setCustomStyles(): void;
    getIconClasses(): string;
    getButtonClasses(layoutType: ButtonLayoutDisplay | null): string;
}
