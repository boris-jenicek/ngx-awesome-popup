import { AfterViewInit, ChangeDetectorRef, Component } from "@angular/core";
import { fadeInOut } from "../../../core/animations";
import { GlobalConfigService } from "../../../core/global-config.service";
import { ToastNotificationClass } from "../core/model";
import { WrapperAbstraction } from "../core/wrapper-abstraction";

@Component({
  selector: "app-toast-notification-wrapper",
  templateUrl: "./toast-notification-wrapper.component.html",
  styleUrls: ["./toast-notification-wrapper.component.scss"],
  animations: [fadeInOut(0, 1)],
})
export class ToastNotificationWrapperComponent
  extends WrapperAbstraction
  implements AfterViewInit {
  constructor(
    public gConfig: GlobalConfigService,
    public toastNotificationBelonging: ToastNotificationClass.ToastNotificationBelonging,
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
