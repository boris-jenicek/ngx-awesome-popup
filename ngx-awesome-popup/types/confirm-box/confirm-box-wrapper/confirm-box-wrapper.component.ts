import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject
} from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { delay } from 'rxjs/operators';
import { fadeInOut } from '../../../core/animations';
import { IButton } from '../../../core/global-interfaces';
import {
  ConfirmBoxBelonging,
  ConfirmBoxDefaultResponse
} from '../core/classes';

@Component({
  selector: 'app-confirm-box-wrapper',
  templateUrl: './confirm-box-wrapper.component.html',
  styleUrls: ['./confirm-box-wrapper.component.scss'],
  animations: [fadeInOut(0, 1)]
})
export class ConfirmBoxWrapperComponent implements AfterViewInit {
  fadeInOutAnimation: string = 'open';

  constructor(
    @Inject('confirmBoxBelonging')
    public confirmBoxBelonging: ConfirmBoxBelonging,
    private cd: ChangeDetectorRef
  ) {}

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

  closeParent$(_ClosingAnimation: string): Observable<any> {
    this.fadeInOutAnimation = _ClosingAnimation;
    const timer = _ClosingAnimation === 'close-slow' ? 1400 : 150;

    return new Observable((observer: Observer<any>) => {
      observer.next('');
      observer.complete();
    }).pipe(delay(timer));
  }
}
