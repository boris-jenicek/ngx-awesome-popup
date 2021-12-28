import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { delay } from 'rxjs/operators';
import { boxAnimations } from '../../../core/animations/box.animations';
import { fadeInOut } from '../../../core/animations/fade-in-out.animation';
import { AppearanceAnimation, ButtonLayoutDisplay, DisappearanceAnimation } from '../../../core/enums';
import { IButton } from '../../../core/global-interfaces';
import { LayoutHelperService } from '../../../core/layout-helper.service';
import { ConfirmBoxBelonging, ConfirmBoxDefaultResponse } from '../core/classes';

@Component({
  selector: 'app-confirm-box-wrapper',
  templateUrl: './confirm-box-wrapper.component.html',
  animations: [fadeInOut(), boxAnimations()],
  providers: [LayoutHelperService]
})
export class ConfirmBoxWrapperComponent implements AfterViewInit {
  @ViewChild('elConfirmBoxWrapper') elConfirmBoxWrapper: ElementRef;
  @ViewChild('elTextWrapper') elTextWrapper: ElementRef;
  @ViewChild('elTitleWrapper') elTitleWrapper: ElementRef;
  @ViewChild('elButtonWrapper') elButtonWrapper: ElementRef;
  @ViewChildren('elButton') elButton: QueryList<ElementRef>;
  fadeInOutAnimation = 'open';
  boxAnimation: AppearanceAnimation | DisappearanceAnimation;
  appearanceAnimation = AppearanceAnimation;
  disappearanceAnimation = DisappearanceAnimation;

  constructor(
    @Inject('confirmBoxBelonging')
    public confirmBoxBelonging: ConfirmBoxBelonging,
    private cd: ChangeDetectorRef,
    public layoutHelper: LayoutHelperService
  ) {
    setTimeout(() => {
      this.boxAnimation = this.confirmBoxBelonging.confirmBoxCoreConfig.animationIn;
    }, 1);
  }

  ngAfterViewInit(): void {
    this.setResponse(false);
    this.cd.detectChanges();
    this.setCustomStyles();
  }

  setResponse(_IsSuccess: boolean, _ClickedButtonID?: string): void {
    const response = new ConfirmBoxDefaultResponse();
    if (_ClickedButtonID) {
      response.clickedButtonID = _ClickedButtonID;
    }

    response.setSuccess(_IsSuccess);
    response.setBelonging(this.confirmBoxBelonging);
    this.confirmBoxBelonging.eventsController.setDefaultResponse(response);
  }

  onOverlayClicked(evt: MouseEvent): void {
    // console.log('onOverlayClicked');
  }

  onCustomButton(_Button: IButton): void {
    this.confirmBoxBelonging.eventsController.onButtonClick(_Button);
    this.setResponse(true, _Button.ID);
    this.confirmBoxBelonging.eventsController.close();
  }

  onButtonClick(_Type: 'confirm' | 'decline'): void {
    let buttonID;
    if (_Type === 'confirm') {
      buttonID = this.confirmBoxBelonging.confirmBoxCoreConfig.confirmLabel.toLowerCase();
    } else if (_Type === 'decline') {
      buttonID = this.confirmBoxBelonging.confirmBoxCoreConfig.declineLabel.toLowerCase();
    }

    this.setResponse(_Type === 'confirm', buttonID);

    this.confirmBoxBelonging.eventsController.close();
  }

  closeParent$(): Observable<any> {
    this.boxAnimation = this.confirmBoxBelonging.confirmBoxCoreConfig.animationOut;
    const closeDuration = this.confirmBoxBelonging.confirmBoxCoreConfig.animationOut ? 800 : 200;
    this.fadeInOutAnimation = 'close-fast';
    return new Observable((observer: Observer<any>) => {
      observer.next('');
      observer.complete();
    }).pipe(delay(closeDuration));
  }

  setCustomStyles(): void {
    if (this.confirmBoxBelonging.confirmBoxCoreConfig.customStyles.wrapperCSS && this.elConfirmBoxWrapper) {
      this.elConfirmBoxWrapper.nativeElement.style.cssText += this.confirmBoxBelonging.confirmBoxCoreConfig.customStyles.wrapperCSS;
    }
    if (this.confirmBoxBelonging.confirmBoxCoreConfig.customStyles.textCSS && this.elTextWrapper) {
      this.elTextWrapper.nativeElement.style.cssText += this.confirmBoxBelonging.confirmBoxCoreConfig.customStyles.textCSS;
    }
    if (this.confirmBoxBelonging.confirmBoxCoreConfig.customStyles.titleCSS && this.elTitleWrapper) {
      this.elTitleWrapper.nativeElement.style.cssText += this.confirmBoxBelonging.confirmBoxCoreConfig.customStyles.titleCSS;
    }
    if (this.confirmBoxBelonging.confirmBoxCoreConfig.customStyles.buttonSectionCSS && this.elButtonWrapper) {
      this.elButtonWrapper.nativeElement.style.cssText += this.confirmBoxBelonging.confirmBoxCoreConfig.customStyles.buttonSectionCSS;
    }
    if (this.confirmBoxBelonging.confirmBoxCoreConfig.customStyles.buttonCSS && this.elButton) {
      this.elButton.forEach(el => {
        el.nativeElement.style.cssText += this.confirmBoxBelonging.confirmBoxCoreConfig.customStyles.buttonCSS;
      });
    }
  }

  getIconClasses(): string {
    return (
      'icon-type-confirm-box  ' +
      this.layoutHelper.getIconClasses(
        this.confirmBoxBelonging.confirmBoxCoreConfig.layoutType,
        this.confirmBoxBelonging.confirmBoxCoreConfig.iconStyleClass
      )
    );
  }

  getButtonClasses(layoutType: ButtonLayoutDisplay | null): string {
    return this.layoutHelper.getButtonClasses(layoutType);
  }
}
