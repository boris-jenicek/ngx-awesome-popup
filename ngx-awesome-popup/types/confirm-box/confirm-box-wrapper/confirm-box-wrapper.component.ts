import { AfterViewInit, ChangeDetectorRef, Component, Inject } from '@angular/core';
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
}
