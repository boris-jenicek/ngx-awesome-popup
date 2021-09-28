import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  HostListener,
  OnDestroy,
  Type,
  ViewChild,
} from "@angular/core";
import { Observable, Observer } from "rxjs";
import { delay } from "rxjs/operators";
import { fadeInOut } from "../../../core/animations";
import { InsertionLoaderDirective } from "../../../core/insertion-loader.directive";
import { InsertionDirective } from "../../../core/insertion.directive";
import { DialogClass } from "../core/model";

@Component({
  selector: "dialog-popup-wrapper",
  templateUrl: "./dialog-wrapper.component.html",
  styleUrls: ["./dialog-wrapper.component.scss"],
  animations: [fadeInOut(0, 1)],
})
export class DialogWrapperComponent implements AfterViewInit, OnDestroy {
  fadeInOutAnimation: string = "open";
  showLoader: boolean = true;
  bodyOverflow: string;

  childComponentRef: ComponentRef<any>;
  childComponentType: Type<any>;
  loaderComponentRef: ComponentRef<any>;

  @ViewChild(InsertionDirective, { static: true })
  insertionPoint: InsertionDirective;
  @ViewChild(InsertionLoaderDirective, { static: true })
  loaderInsertionPoint: InsertionLoaderDirective;

  constructor(
    public dialogBelonging: DialogClass.DialogBelonging,
    private componentFactoryResolver: ComponentFactoryResolver,
    private cd: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.hideScrollbar(); // hide scrollbar if config enabled

    this.loadChildComponent(this.childComponentType);
    this.loadLoaderComponent(
      this.dialogBelonging.DialogCoreConfig.LoaderComponent
    );
    this.setDefaultResponse();
    this.cd.detectChanges();
  }

  hideScrollbar() {
    if (this.dialogBelonging.DialogCoreConfig.HideScrollbar) {
      this.bodyOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }
  }

  revertScrollbarSettings() {
    if (this.dialogBelonging.DialogCoreConfig.HideScrollbar) {
      document.body.style.overflow = this.bodyOverflow;
    }
  }

  setDefaultResponse(): void {
    const dialogResponse = new DialogClass.DialogDefaultResponse();
    dialogResponse.setBelonging(this.dialogBelonging);
    this.dialogBelonging.EventsController.setDefaultResponse(dialogResponse);
  }

  ngOnDestroy(): void {
    this.revertScrollbarSettings();

    if (this.childComponentRef) {
      this.childComponentRef.destroy();
    }
    if (this.loaderComponentRef) {
      this.loaderComponentRef.destroy();
    }
  }

  hideScroller() {}

  loadChildComponent(_ComponentType: Type<any>): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      _ComponentType
    );

    const viewContainerRef = this.insertionPoint.viewContainerRef;
    viewContainerRef.clear();

    this.childComponentRef = viewContainerRef.createComponent(componentFactory);

    this.childComponentRef.instance.dialogBelonging = this.dialogBelonging;
  }

  loadLoaderComponent(_LoaderRef: Type<any>): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      _LoaderRef
    );
    const viewContainerRef = this.loaderInsertionPoint.viewContainerRef;
    viewContainerRef.clear();

    this.loaderComponentRef = viewContainerRef.createComponent(
      componentFactory
    );
  }

  close() {
    this.dialogBelonging.EventsController.close();
  }

  closeParent$(_ClosingAnimation: string): Observable<any> {
    this.fadeInOutAnimation = _ClosingAnimation;
    const timer = _ClosingAnimation === "close-slow" ? 1400 : 150;

    return new Observable((observer: Observer<any>) => {
      observer.next("");
      observer.complete();
    }).pipe(delay(timer));
  }

  onOverlayClicked(evt: MouseEvent): void {
    // console.log('onOverlayClicked');
  }

  onCustomButton(_Button: any): void {
    this.dialogBelonging.EventsController.onButtonClick(_Button);
  }

  closeLoader(): void {
    this.showLoader = false;
  }

  @HostListener("window:keyup", ["$event"])
  keyEvent(event: KeyboardEvent) {
    if (event.key === "Escape") {
      this.close();
    }
  }
}
