import { AfterViewInit, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { boxAnimations } from '../../../core/animations/box.animations';
import { fadeInOut } from '../../../core/animations/fade-in-out.animation';
import { GlobalConfigService } from '../../../core/global-config.service';
import { ToastNotificationBelonging } from '../core/classes';
import { WrapperAbstraction } from '../core/wrapper-abstraction';

@Component({
  selector: 'app-toast-notification-wrapper',
  templateUrl: './toast-notification-wrapper.component.html',
  // styleUrls: ['../../../styles/types/toast-standard.scss'],
  animations: [fadeInOut(), boxAnimations()]
})
export class ToastNotificationWrapperComponent extends WrapperAbstraction implements AfterViewInit {
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
    this.setCustomStyles();
  }
}
