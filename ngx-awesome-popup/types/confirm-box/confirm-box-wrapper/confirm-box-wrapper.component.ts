import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { delay } from 'rxjs/operators';
import { boxAnimations } from '../../../core/animations/box.animations';
import { fadeInOut } from '../../../core/animations/fade-in-out.animation';
import { AppearanceAnimation, DisappearanceAnimation } from '../../../core/enums';
import { IButton } from '../../../core/global-interfaces';
import { ConfirmBoxBelonging, ConfirmBoxDefaultResponse } from '../core/classes';

@Component({
  selector: 'app-confirm-box-wrapper',
  templateUrl: './confirm-box-wrapper.component.html',
  styleUrls: ['./confirm-box-wrapper.component.scss'],
  animations: [fadeInOut(), boxAnimations()]
})
export class ConfirmBoxWrapperComponent implements AfterViewInit {
  @ViewChild('elConfirmBoxWrapper') elConfirmBoxWrapper: ElementRef;
  @ViewChild('elTextWrapper') elTextWrapper: ElementRef;
  @ViewChild('elTitleWrapper') elTitleWrapper: ElementRef;
  @ViewChild('elButtonWrapper') elButtonWrapper: ElementRef;
  @ViewChildren('elButton') elButton: QueryList<ElementRef>;
  fadeInOutAnimation: string = 'open';
  animationFlyDirection = 'none';
  boxAnimation: AppearanceAnimation | DisappearanceAnimation;

  constructor(
    @Inject('confirmBoxBelonging')
    public confirmBoxBelonging: ConfirmBoxBelonging,
    private cd: ChangeDetectorRef
  ) {
    setTimeout(() => {
      this.boxAnimation = this.confirmBoxBelonging.ConfirmBoxCoreConfig.AnimationIn;
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
      response.ClickedButtonID = _ClickedButtonID;
    }

    response.setSuccess(_IsSuccess);
    response.setBelonging(this.confirmBoxBelonging);
    this.confirmBoxBelonging.EventsController.setDefaultResponse(response);
  }

  onOverlayClicked(evt: MouseEvent): void {
    // console.log('onOverlayClicked');
  }

  onCustomButton(_Button: IButton): void {
    this.confirmBoxBelonging.EventsController.onButtonClick(_Button);
    this.setResponse(true, _Button.ID);
    this.confirmBoxBelonging.EventsController.close();
  }

  onButtonClick(_Type: 'confirm' | 'decline') {
    let buttonID;
    if (_Type === 'confirm') {
      buttonID = this.confirmBoxBelonging.ConfirmBoxCoreConfig.ConfirmLabel.toLowerCase();
    } else if (_Type === 'decline') {
      buttonID = this.confirmBoxBelonging.ConfirmBoxCoreConfig.DeclineLabel.toLowerCase();
    }

    this.setResponse(_Type === 'confirm', buttonID);

    this.confirmBoxBelonging.EventsController.close();
  }

  closeParent$(): Observable<any> {
    this.boxAnimation = this.confirmBoxBelonging.ConfirmBoxCoreConfig.AnimationOut;
    const closeDuration = this.confirmBoxBelonging.ConfirmBoxCoreConfig.AnimationOut ? 800 : 200;
    this.fadeInOutAnimation = 'close-fast';
    return new Observable((observer: Observer<any>) => {
      observer.next('');
      observer.complete();
    }).pipe(delay(closeDuration));
  }

  setCustomStyles(): void {
    if (this.confirmBoxBelonging.ConfirmBoxCoreConfig.CustomStyles.WrapperCSS && this.elConfirmBoxWrapper) {
      this.elConfirmBoxWrapper.nativeElement.style.cssText += this.confirmBoxBelonging.ConfirmBoxCoreConfig.CustomStyles.WrapperCSS;
    }
    if (this.confirmBoxBelonging.ConfirmBoxCoreConfig.CustomStyles.TextCSS && this.elTextWrapper) {
      this.elTextWrapper.nativeElement.style.cssText += this.confirmBoxBelonging.ConfirmBoxCoreConfig.CustomStyles.TextCSS;
    }
    if (this.confirmBoxBelonging.ConfirmBoxCoreConfig.CustomStyles.TitleCSS && this.elTitleWrapper) {
      this.elTitleWrapper.nativeElement.style.cssText += this.confirmBoxBelonging.ConfirmBoxCoreConfig.CustomStyles.TitleCSS;
    }
    if (this.confirmBoxBelonging.ConfirmBoxCoreConfig.CustomStyles.ButtonSectionCSS && this.elButtonWrapper) {
      this.elButtonWrapper.nativeElement.style.cssText += this.confirmBoxBelonging.ConfirmBoxCoreConfig.CustomStyles.ButtonSectionCSS;
    }
    if (this.confirmBoxBelonging.ConfirmBoxCoreConfig.CustomStyles.ButtonCSS && this.elButton) {
      this.elButton.forEach(el => {
        el.nativeElement.style.cssText += this.confirmBoxBelonging.ConfirmBoxCoreConfig.CustomStyles.ButtonCSS;
      });
    }
  }
}
