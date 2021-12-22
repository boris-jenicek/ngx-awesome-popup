import { AfterViewInit, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { boxAnimations } from '../../../core/animations/box.animations';
import { fadeInOut } from '../../../core/animations/fade-in-out.animation';
import { GlobalConfigService } from '../../../core/global-config.service';
import { LayoutHelperService } from '../../../core/layout-helper.service';
import { ToastNotificationBelonging } from '../core/classes';
import { WrapperAbstraction } from '../core/wrapper-abstraction';

@Component({
  selector: 'app-toast-notification-simple-wrapper',
  templateUrl: './toast-notification-simple-wrapper.component.html',
  animations: [fadeInOut(), boxAnimations()],
  providers: [LayoutHelperService]
})
export class ToastNotificationSimpleWrapperComponent extends WrapperAbstraction implements AfterViewInit {
  constructor(
    @Inject('toastNotificationBelonging')
    public toastNotificationBelonging: ToastNotificationBelonging,
    public gConfig: GlobalConfigService,
    private cd: ChangeDetectorRef,
    public layoutHelper: LayoutHelperService
  ) {
    super(toastNotificationBelonging, layoutHelper);
  }

  ngAfterViewInit(): void {
    this.setResponse(false);
    this.cd.detectChanges();
    this.autoClose();
    this.setCustomStyles();
  }
}
