import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject
} from '@angular/core';
import { fadeInOut } from '../../../core/animations';
import { GlobalConfigService } from '../../../core/global-config.service';
import { ToastNotificationBelonging } from '../core/classes';
import { WrapperAbstraction } from '../core/wrapper-abstraction';

@Component({
  selector: 'app-toast-notification-simple-wrapper',
  templateUrl: './toast-notification-simple-wrapper.component.html',
  styleUrls: ['./toast-notification-simple-wrapper.component.scss'],
  animations: [fadeInOut(0, 1)]
})
export class ToastNotificationSimpleWrapperComponent
  extends WrapperAbstraction
  implements AfterViewInit {
  constructor(
    @Inject('toastNotificationBelonging')
    public toastNotificationBelonging: ToastNotificationBelonging,
    public gConfig: GlobalConfigService,
    private cd: ChangeDetectorRef
  ) {
    super(toastNotificationBelonging);
  }

  ngAfterViewInit(): void {
    this.setResponse(false);
    this.cd.detectChanges();
    this.autoClose();
  }
}
