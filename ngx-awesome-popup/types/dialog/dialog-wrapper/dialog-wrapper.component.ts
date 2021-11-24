import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  HostListener,
  Inject,
  OnDestroy,
  QueryList,
  Type,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { delay } from 'rxjs/operators';
import { boxAnimations } from '../../../core/animations/box.animations';
import { fadeInOut } from '../../../core/animations/fade-in-out.animation';
import { AppearanceAnimation, DisappearanceAnimation } from '../../../core/enums';
import { InsertionLoaderDirective } from '../../../core/insertion-loader.directive';
import { InsertionDirective } from '../../../core/insertion.directive';
import { DialogBelonging, DialogDefaultResponse } from '../core/classes';

@Component({
  selector: 'dialog-popup-wrapper',
  templateUrl: './dialog-wrapper.component.html',
  styleUrls: ['./dialog-wrapper.component.scss'],
  animations: [fadeInOut(), boxAnimations()]
})
export class DialogWrapperComponent implements AfterViewInit, OnDestroy {
  @ViewChild('elDialogWrapper') elDialogWrapper: ElementRef;
  @ViewChild('elButtonWrapper') elButtonWrapper: ElementRef;
  @ViewChildren('elButton') elButton: QueryList<ElementRef>;
  fadeInOutAnimation: string = 'open';
  showLoader: boolean = true;
  bodyOverflow: string;

  childComponentRef: ComponentRef<any>;
  childComponentType: Type<any>;
  loaderComponentRef: ComponentRef<any>;

  @ViewChild(InsertionDirective, { static: true })
  insertionPoint: InsertionDirective;
  @ViewChild(InsertionLoaderDirective, { static: true })
  loaderInsertionPoint: InsertionLoaderDirective;

  boxAnimation: AppearanceAnimation | DisappearanceAnimation;

  constructor(
    @Inject('dialogBelonging')
    public dialogBelonging: DialogBelonging,
    private componentFactoryResolver: ComponentFactoryResolver,
    private cd: ChangeDetectorRef
  ) {
    setTimeout(() => {
      this.boxAnimation = this.dialogBelonging.DialogCoreConfig.AnimationIn;
    }, 1);
  }

  ngAfterViewInit(): void {
    this.hideScrollbar(); // hide scrollbar if config enabled

    this.loadChildComponent(this.childComponentType);
    this.loadLoaderComponent(this.dialogBelonging.DialogCoreConfig.LoaderComponent);
    this.setDefaultResponse();
    this.cd.detectChanges();
    this.setCustomStyles();
  }

  hideScrollbar() {
    if (this.dialogBelonging.DialogCoreConfig.HideScrollbar) {
      this.bodyOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }
  }

  revertScrollbarSettings() {
    if (this.dialogBelonging.DialogCoreConfig.HideScrollbar) {
      document.body.style.overflow = this.bodyOverflow;
    }
  }

  setDefaultResponse(): void {
    const dialogResponse = new DialogDefaultResponse();
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
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(_ComponentType);
    const viewContainerRef = this.insertionPoint.viewContainerRef;
    viewContainerRef.clear();

    this.childComponentRef = viewContainerRef.createComponent(componentFactory);

    this.childComponentRef.instance.dialogBelonging = this.dialogBelonging;
  }

  loadLoaderComponent(_LoaderRef: Type<any>): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(_LoaderRef);
    const viewContainerRef = this.loaderInsertionPoint.viewContainerRef;
    viewContainerRef.clear();

    this.loaderComponentRef = viewContainerRef.createComponent(componentFactory);
  }

  close() {
    this.dialogBelonging.EventsController.close();
  }

  closeParent$(): Observable<any> {
    this.boxAnimation = this.dialogBelonging.DialogCoreConfig.AnimationOut;
    const closeDuration = this.dialogBelonging.DialogCoreConfig.AnimationOut ? 800 : 200;
    this.fadeInOutAnimation = 'close-fast';
    return new Observable((observer: Observer<any>) => {
      observer.next('');
      observer.complete();
    }).pipe(delay(closeDuration));
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

  setCustomStyles(): void {
    if (this.dialogBelonging.DialogCoreConfig.CustomStyles.WrapperCSS && this.elDialogWrapper) {
      this.elDialogWrapper.nativeElement.style.cssText += this.dialogBelonging.DialogCoreConfig.CustomStyles.WrapperCSS;
    }
    if (this.dialogBelonging.DialogCoreConfig.CustomStyles.ButtonSectionCSS && this.elButtonWrapper) {
      this.elButtonWrapper.nativeElement.style.cssText += this.dialogBelonging.DialogCoreConfig.CustomStyles.ButtonSectionCSS;
    }
    if (this.dialogBelonging.DialogCoreConfig.CustomStyles.ButtonCSS && this.elButton) {
      this.elButton.forEach(el => {
        el.nativeElement.style.cssText += this.dialogBelonging.DialogCoreConfig.CustomStyles.ButtonCSS;
      });
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.close();
    }
  }
}
