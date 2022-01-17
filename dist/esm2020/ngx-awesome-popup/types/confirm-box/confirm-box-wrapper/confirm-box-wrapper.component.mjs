import { Component, Inject, ViewChild, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { boxAnimations } from '../../../core/animations/box.animations';
import { fadeInOut } from '../../../core/animations/fade-in-out.animation';
import { AppearanceAnimation, DisappearanceAnimation } from '../../../core/enums';
import { LayoutHelperService } from '../../../core/layout-helper.service';
import { ConfirmBoxDefaultResponse } from '../core/classes';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/layout-helper.service";
import * as i2 from "@angular/common";
import * as i3 from "../core/classes";
const _c0 = ["elConfirmBoxWrapper"];
const _c1 = ["elTextWrapper"];
const _c2 = ["elTitleWrapper"];
const _c3 = ["elButtonWrapper"];
const _c4 = ["elButton"];
function ConfirmBoxWrapperComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8, 9);
    i0.ɵɵelementStart(2, "div", 10);
    i0.ɵɵelementStart(3, "div", 11);
    i0.ɵɵelementStart(4, "div", 12);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.confirmBoxBelonging.dispatch.title, " ");
} }
function ConfirmBoxWrapperComponent_div_4_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 18);
    i0.ɵɵelement(1, "span", 19);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r8 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("className", ctx_r8.getIconClasses());
} }
function ConfirmBoxWrapperComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 13, 14);
    i0.ɵɵtemplate(2, ConfirmBoxWrapperComponent_div_4_div_2_Template, 2, 1, "div", 15);
    i0.ɵɵelementStart(3, "div", 16);
    i0.ɵɵelementStart(4, "div", 10);
    i0.ɵɵelement(5, "div", 17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngClass", ctx_r2.confirmBoxBelonging.dispatch.title ? "" : "without-title");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", !ctx_r2.confirmBoxBelonging.confirmBoxCoreConfig.disableIcon);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("innerHTML", ctx_r2.confirmBoxBelonging.dispatch.message, i0.ɵɵsanitizeHtml);
} }
function ConfirmBoxWrapperComponent_div_7_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 22, 23);
    i0.ɵɵlistener("click", function ConfirmBoxWrapperComponent_div_7_button_1_Template_button_click_0_listener() { const restoredCtx = i0.ɵɵrestoreView(_r13); const button_r10 = restoredCtx.$implicit; const ctx_r12 = i0.ɵɵnextContext(2); return ctx_r12.onCustomButton(button_r10); });
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const button_r10 = ctx.$implicit;
    const ctx_r9 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("className", ctx_r9.layoutHelper.getButtonClasses(button_r10.layoutType, "ed-btn ed-btn-md"));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", button_r10.label, " ");
} }
const _c5 = function (a0) { return { "text-align": a0 }; };
function ConfirmBoxWrapperComponent_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 20);
    i0.ɵɵtemplate(1, ConfirmBoxWrapperComponent_div_7_button_1_Template, 3, 2, "button", 21);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction1(2, _c5, ctx_r4.confirmBoxBelonging.confirmBoxCoreConfig.buttonPosition));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r4.confirmBoxBelonging.buttons);
} }
function ConfirmBoxWrapperComponent_div_8_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r18 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 26, 23);
    i0.ɵɵlistener("click", function ConfirmBoxWrapperComponent_div_8_button_4_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r18); const ctx_r17 = i0.ɵɵnextContext(2); return ctx_r17.onButtonClick("decline"); });
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r15 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r15.confirmBoxBelonging.confirmBoxCoreConfig.declineLabel, " ");
} }
function ConfirmBoxWrapperComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    const _r20 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 20);
    i0.ɵɵelementStart(1, "button", 24, 23);
    i0.ɵɵlistener("click", function ConfirmBoxWrapperComponent_div_8_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r20); const ctx_r19 = i0.ɵɵnextContext(); return ctx_r19.onButtonClick("confirm"); });
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, ConfirmBoxWrapperComponent_div_8_button_4_Template, 3, 1, "button", 25);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction1(4, _c5, ctx_r5.confirmBoxBelonging.confirmBoxCoreConfig.buttonPosition));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("className", ctx_r5.layoutHelper.getButtonClasses(ctx_r5.confirmBoxBelonging.confirmBoxCoreConfig.layoutType, "ed-btn ed-btn-md", "auto-button"));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r5.confirmBoxBelonging.confirmBoxCoreConfig.confirmLabel, " ");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r5.confirmBoxBelonging.confirmBoxCoreConfig.declineLabel);
} }
const _c6 = function (a0) { return { closeDelay: a0 }; };
const _c7 = function (a0, a1) { return { value: a0, params: a1 }; };
const _c8 = function (a0, a1, a2) { return { width: a0, height: a1, opacity: a2 }; };
export class ConfirmBoxWrapperComponent {
    constructor(confirmBoxBelonging, cd, layoutHelper) {
        this.confirmBoxBelonging = confirmBoxBelonging;
        this.cd = cd;
        this.layoutHelper = layoutHelper;
        this.fadeInOutAnimation = 'open';
        this.appearanceAnimation = AppearanceAnimation;
        this.disappearanceAnimation = DisappearanceAnimation;
        setTimeout(() => {
            this.boxAnimation = this.confirmBoxBelonging.confirmBoxCoreConfig.animationIn;
        }, 1);
    }
    ngAfterViewInit() {
        this.setResponse(false);
        this.cd.detectChanges();
        this.setCustomStyles();
    }
    setResponse(_IsSuccess, _ClickedButtonID) {
        const response = new ConfirmBoxDefaultResponse();
        if (_ClickedButtonID) {
            response.clickedButtonID = _ClickedButtonID;
        }
        response.setSuccess(_IsSuccess);
        response.setBelonging(this.confirmBoxBelonging);
        this.confirmBoxBelonging.eventsController.setDefaultResponse(response);
    }
    onOverlayClicked(evt) {
    }
    onCustomButton(_Button) {
        this.confirmBoxBelonging.eventsController.onButtonClick(_Button);
        this.setResponse(true, _Button.ID);
        this.confirmBoxBelonging.eventsController.close();
    }
    onButtonClick(_Type) {
        let buttonID;
        if (_Type === 'confirm') {
            buttonID = this.confirmBoxBelonging.confirmBoxCoreConfig.confirmLabel.toLowerCase();
        }
        else if (_Type === 'decline') {
            buttonID = this.confirmBoxBelonging.confirmBoxCoreConfig.declineLabel.toLowerCase();
        }
        this.setResponse(_Type === 'confirm', buttonID);
        this.confirmBoxBelonging.eventsController.close();
    }
    closeParent$() {
        this.boxAnimation = this.confirmBoxBelonging.confirmBoxCoreConfig.animationOut;
        const closeDuration = this.confirmBoxBelonging.confirmBoxCoreConfig.animationOut ? 800 : 200;
        this.fadeInOutAnimation = 'close-fast';
        return new Observable((observer) => {
            observer.next('');
            observer.complete();
        }).pipe(delay(closeDuration));
    }
    setCustomStyles() {
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
    getIconClasses() {
        return ('icon-type-confirm-box  ' +
            this.layoutHelper.getIconClasses(this.confirmBoxBelonging.confirmBoxCoreConfig.layoutType, this.confirmBoxBelonging.confirmBoxCoreConfig.iconStyleClass));
    }
    getButtonClasses(layoutType) {
        return this.layoutHelper.getButtonClasses(layoutType);
    }
}
ConfirmBoxWrapperComponent.ɵfac = function ConfirmBoxWrapperComponent_Factory(t) { return new (t || ConfirmBoxWrapperComponent)(i0.ɵɵdirectiveInject('confirmBoxBelonging'), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1.LayoutHelperService)); };
ConfirmBoxWrapperComponent.ɵcmp = i0.ɵɵdefineComponent({ type: ConfirmBoxWrapperComponent, selectors: [["app-confirm-box-wrapper"]], viewQuery: function ConfirmBoxWrapperComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 5);
        i0.ɵɵviewQuery(_c1, 5);
        i0.ɵɵviewQuery(_c2, 5);
        i0.ɵɵviewQuery(_c3, 5);
        i0.ɵɵviewQuery(_c4, 5);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.elConfirmBoxWrapper = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.elTextWrapper = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.elTitleWrapper = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.elButtonWrapper = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.elButton = _t);
    } }, features: [i0.ɵɵProvidersFeature([LayoutHelperService])], decls: 9, vars: 18, consts: [[1, "ngx-awesome-popup-overlay", "confirm-box-overlay", 3, "dblclick"], [3, "className", "ngStyle"], ["elConfirmBoxWrapper", ""], ["class", "confirm-box-title-content", 4, "ngIf"], ["class", "content-holder", 3, "ngClass", 4, "ngIf"], [1, "button-holder"], ["elButtonWrapper", ""], ["class", "button-section", 3, "ngStyle", 4, "ngIf"], [1, "confirm-box-title-content"], ["elTitleWrapper", ""], [1, "dont-break-out"], [1, "text-wrapper", "dont-break-out"], [1, "confirm-box-title-text"], [1, "content-holder", 3, "ngClass"], ["elTextWrapper", ""], ["class", "icon-section", 4, "ngIf"], [1, "text-wrapper-section", "confirm-box-inner-content"], [1, "text-wrapper", 3, "innerHTML"], [1, "icon-section"], [3, "className"], [1, "button-section", 3, "ngStyle"], [3, "className", "click", 4, "ngFor", "ngForOf"], [3, "className", "click"], ["elButton", ""], [1, "ed-btn", "ed-btn-md", 3, "className", "click"], ["class", "ed-btn ed-btn-md ed-btn-secondary", 3, "click", 4, "ngIf"], [1, "ed-btn", "ed-btn-md", "ed-btn-secondary", 3, "click"]], template: function ConfirmBoxWrapperComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵlistener("dblclick", function ConfirmBoxWrapperComponent_Template_div_dblclick_0_listener($event) { return ctx.onOverlayClicked($event); });
        i0.ɵɵelementStart(1, "div", 1, 2);
        i0.ɵɵtemplate(3, ConfirmBoxWrapperComponent_div_3_Template, 6, 1, "div", 3);
        i0.ɵɵtemplate(4, ConfirmBoxWrapperComponent_div_4_Template, 6, 3, "div", 4);
        i0.ɵɵelementStart(5, "div", 5, 6);
        i0.ɵɵtemplate(7, ConfirmBoxWrapperComponent_div_7_Template, 2, 4, "div", 7);
        i0.ɵɵtemplate(8, ConfirmBoxWrapperComponent_div_8_Template, 5, 6, "div", 7);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("@fadeInOut", i0.ɵɵpureFunction2(11, _c7, ctx.fadeInOutAnimation, i0.ɵɵpureFunction1(9, _c6, ctx.confirmBoxBelonging.confirmBoxCoreConfig.animationOut === ctx.disappearanceAnimation.NONE ? "200ms" : "300ms")));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("@.disabled", ctx.confirmBoxBelonging.confirmBoxCoreConfig.animationIn === ctx.appearanceAnimation.NONE && ctx.confirmBoxBelonging.confirmBoxCoreConfig.animationOut === ctx.disappearanceAnimation.NONE)("@boxAnimations", ctx.boxAnimation)("className", ctx.layoutHelper.getBoxClasses(ctx.confirmBoxBelonging.confirmBoxCoreConfig.layoutType, "evolve-confirm-box"))("ngStyle", i0.ɵɵpureFunction3(14, _c8, ctx.confirmBoxBelonging.confirmBoxCoreConfig.width, ctx.confirmBoxBelonging.confirmBoxCoreConfig.height, ctx.confirmBoxBelonging.confirmBoxCoreConfig.animationIn === ctx.appearanceAnimation.NONE ? 1 : 0));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.confirmBoxBelonging.dispatch.title);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.confirmBoxBelonging.dispatch.message);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx.confirmBoxBelonging.buttons.length);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.confirmBoxBelonging.buttons.length);
    } }, directives: [i2.NgStyle, i2.NgIf, i2.NgClass, i2.NgForOf], encapsulation: 2, data: { animation: [fadeInOut(), boxAnimations()] } });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ConfirmBoxWrapperComponent, [{
        type: Component,
        args: [{ selector: 'app-confirm-box-wrapper', animations: [fadeInOut(), boxAnimations()], providers: [LayoutHelperService], template: "<div\n  class=\"ngx-awesome-popup-overlay confirm-box-overlay\"\n  (dblclick)=\"onOverlayClicked($event)\"\n  [@fadeInOut]=\"{\n    value: fadeInOutAnimation,\n    params: {\n      closeDelay: confirmBoxBelonging.confirmBoxCoreConfig.animationOut === disappearanceAnimation.NONE ? '200ms' : '300ms'\n    }\n  }\">\n  <div\n    [@.disabled]=\"\n      confirmBoxBelonging.confirmBoxCoreConfig.animationIn === appearanceAnimation.NONE &&\n      confirmBoxBelonging.confirmBoxCoreConfig.animationOut === disappearanceAnimation.NONE\n    \"\n    [@boxAnimations]=\"boxAnimation\"\n    #elConfirmBoxWrapper\n    [className]=\"layoutHelper.getBoxClasses(confirmBoxBelonging.confirmBoxCoreConfig.layoutType, 'evolve-confirm-box')\"\n    [ngStyle]=\"{\n      width: confirmBoxBelonging.confirmBoxCoreConfig.width,\n      height: confirmBoxBelonging.confirmBoxCoreConfig.height,\n      opacity: confirmBoxBelonging.confirmBoxCoreConfig.animationIn === appearanceAnimation.NONE ? 1 : 0\n    }\">\n    <div class=\"confirm-box-title-content\" #elTitleWrapper *ngIf=\"confirmBoxBelonging.dispatch.title\">\n      <div class=\"dont-break-out\">\n        <div class=\"text-wrapper dont-break-out\">\n          <div class=\"confirm-box-title-text\">\n            {{ confirmBoxBelonging.dispatch.title }}\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div\n      class=\"content-holder\"\n      #elTextWrapper\n      [ngClass]=\"confirmBoxBelonging.dispatch.title ? '' : 'without-title'\"\n      *ngIf=\"confirmBoxBelonging.dispatch.message\">\n      <div class=\"icon-section\" *ngIf=\"!confirmBoxBelonging.confirmBoxCoreConfig.disableIcon\">\n        <span [className]=\"getIconClasses()\"></span>\n      </div>\n      <div class=\"text-wrapper-section confirm-box-inner-content\">\n        <div class=\"dont-break-out\">\n          <div class=\"text-wrapper\" [innerHTML]=\"confirmBoxBelonging.dispatch.message\"></div>\n        </div>\n      </div>\n    </div>\n    <div class=\"button-holder\" #elButtonWrapper>\n      <div\n        class=\"button-section\"\n        *ngIf=\"confirmBoxBelonging.buttons.length\"\n        [ngStyle]=\"{\n          'text-align': confirmBoxBelonging.confirmBoxCoreConfig.buttonPosition\n        }\">\n        <button\n          #elButton\n          *ngFor=\"let button of confirmBoxBelonging.buttons\"\n          (click)=\"onCustomButton(button)\"\n          [className]=\"layoutHelper.getButtonClasses(button.layoutType, 'ed-btn ed-btn-md')\">\n          {{ button.label }}\n        </button>\n      </div>\n      <div\n        class=\"button-section\"\n        *ngIf=\"!confirmBoxBelonging.buttons.length\"\n        [ngStyle]=\"{\n          'text-align': confirmBoxBelonging.confirmBoxCoreConfig.buttonPosition\n        }\">\n        <button\n          class=\"ed-btn ed-btn-md\"\n          #elButton\n          (click)=\"onButtonClick('confirm')\"\n          [className]=\"\n            layoutHelper.getButtonClasses(confirmBoxBelonging.confirmBoxCoreConfig.layoutType, 'ed-btn ed-btn-md', 'auto-button')\n          \">\n          {{ confirmBoxBelonging.confirmBoxCoreConfig.confirmLabel }}\n        </button>\n        <button\n          class=\"ed-btn ed-btn-md ed-btn-secondary\"\n          #elButton\n          (click)=\"onButtonClick('decline')\"\n          *ngIf=\"confirmBoxBelonging.confirmBoxCoreConfig.declineLabel\">\n          {{ confirmBoxBelonging.confirmBoxCoreConfig.declineLabel }}\n        </button>\n      </div>\n    </div>\n  </div>\n</div>\n" }]
    }], function () { return [{ type: i3.ConfirmBoxBelonging, decorators: [{
                type: Inject,
                args: ['confirmBoxBelonging']
            }] }, { type: i0.ChangeDetectorRef }, { type: i1.LayoutHelperService }]; }, { elConfirmBoxWrapper: [{
            type: ViewChild,
            args: ['elConfirmBoxWrapper']
        }], elTextWrapper: [{
            type: ViewChild,
            args: ['elTextWrapper']
        }], elTitleWrapper: [{
            type: ViewChild,
            args: ['elTitleWrapper']
        }], elButtonWrapper: [{
            type: ViewChild,
            args: ['elButtonWrapper']
        }], elButton: [{
            type: ViewChildren,
            args: ['elButton']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlybS1ib3gtd3JhcHBlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9uZ3gtYXdlc29tZS1wb3B1cC90eXBlcy9jb25maXJtLWJveC9jb25maXJtLWJveC13cmFwcGVyL2NvbmZpcm0tYm94LXdyYXBwZXIuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vbmd4LWF3ZXNvbWUtcG9wdXAvdHlwZXMvY29uZmlybS1ib3gvY29uZmlybS1ib3gtd3JhcHBlci9jb25maXJtLWJveC13cmFwcGVyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBb0MsU0FBUyxFQUFjLE1BQU0sRUFBYSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BJLE9BQU8sRUFBRSxVQUFVLEVBQVksTUFBTSxNQUFNLENBQUM7QUFDNUMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDM0UsT0FBTyxFQUFFLG1CQUFtQixFQUF1QixzQkFBc0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXZHLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzFFLE9BQU8sRUFBdUIseUJBQXlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7Ozs7Ozs7SUNjN0UsaUNBQWtHO0lBQ2hHLCtCQUE0QjtJQUMxQiwrQkFBeUM7SUFDdkMsK0JBQW9DO0lBQ2xDLFlBQ0Y7SUFBQSxpQkFBTTtJQUNSLGlCQUFNO0lBQ1IsaUJBQU07SUFDUixpQkFBTTs7O0lBSkUsZUFDRjtJQURFLDBFQUNGOzs7SUFVSiwrQkFBd0Y7SUFDdEYsMkJBQTRDO0lBQzlDLGlCQUFNOzs7SUFE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U0FBUzttQkFBQyxnQkFBZ0I7WUFDRyxlQUFlO2tCQUE1QyxTQUFTO21CQUFDLGlCQUFpQjtZQUNGLFFBQVE7a0JBQWpDLFlBQVk7bUJBQUMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEluamVjdCwgUXVlcnlMaXN0LCBWaWV3Q2hpbGQsIFZpZXdDaGlsZHJlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgT2JzZXJ2ZXIgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlbGF5IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgYm94QW5pbWF0aW9ucyB9IGZyb20gJy4uLy4uLy4uL2NvcmUvYW5pbWF0aW9ucy9ib3guYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBmYWRlSW5PdXQgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2FuaW1hdGlvbnMvZmFkZS1pbi1vdXQuYW5pbWF0aW9uJztcbmltcG9ydCB7IEFwcGVhcmFuY2VBbmltYXRpb24sIEJ1dHRvbkxheW91dERpc3BsYXksIERpc2FwcGVhcmFuY2VBbmltYXRpb24gfSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudW1zJztcbmltcG9ydCB7IElCdXR0b24gfSBmcm9tICcuLi8uLi8uLi9jb3JlL2dsb2JhbC1pbnRlcmZhY2VzJztcbmltcG9ydCB7IExheW91dEhlbHBlclNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2xheW91dC1oZWxwZXIuc2VydmljZSc7XG5pbXBvcnQgeyBDb25maXJtQm94QmVsb25naW5nLCBDb25maXJtQm94RGVmYXVsdFJlc3BvbnNlIH0gZnJvbSAnLi4vY29yZS9jbGFzc2VzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLWNvbmZpcm0tYm94LXdyYXBwZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vY29uZmlybS1ib3gtd3JhcHBlci5jb21wb25lbnQuaHRtbCcsXG4gIGFuaW1hdGlvbnM6IFtmYWRlSW5PdXQoKSwgYm94QW5pbWF0aW9ucygpXSxcbiAgcHJvdmlkZXJzOiBbTGF5b3V0SGVscGVyU2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgQ29uZmlybUJveFdyYXBwZXJDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgQFZpZXdDaGlsZCgnZWxDb25maXJtQm94V3JhcHBlcicpIGVsQ29uZmlybUJveFdyYXBwZXI6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ2VsVGV4dFdyYXBwZXInKSBlbFRleHRXcmFwcGVyOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdlbFRpdGxlV3JhcHBlcicpIGVsVGl0bGVXcmFwcGVyOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdlbEJ1dHRvbldyYXBwZXInKSBlbEJ1dHRvbldyYXBwZXI6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGRyZW4oJ2VsQnV0dG9uJykgZWxCdXR0b246IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPjtcbiAgZmFkZUluT3V0QW5pbWF0aW9uID0gJ29wZW4nO1xuICBib3hBbmltYXRpb246IEFwcGVhcmFuY2VBbmltYXRpb24gfCBEaXNhcHBlYXJhbmNlQW5pbWF0aW9uO1xuICBhcHBlYXJhbmNlQW5pbWF0aW9uID0gQXBwZWFyYW5jZUFuaW1hdGlvbjtcbiAgZGlzYXBwZWFyYW5jZUFuaW1hdGlvbiA9IERpc2FwcGVhcmFuY2VBbmltYXRpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdCgnY29uZmlybUJveEJlbG9uZ2luZycpXG4gICAgcHVibGljIGNvbmZpcm1Cb3hCZWxvbmdpbmc6IENvbmZpcm1Cb3hCZWxvbmdpbmcsXG4gICAgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHVibGljIGxheW91dEhlbHBlcjogTGF5b3V0SGVscGVyU2VydmljZVxuICApIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuYm94QW5pbWF0aW9uID0gdGhpcy5jb25maXJtQm94QmVsb25naW5nLmNvbmZpcm1Cb3hDb3JlQ29uZmlnLmFuaW1hdGlvbkluO1xuICAgIH0sIDEpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuc2V0UmVzcG9uc2UoZmFsc2UpO1xuICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIHRoaXMuc2V0Q3VzdG9tU3R5bGVzKCk7XG4gIH1cblxuICBzZXRSZXNwb25zZShfSXNTdWNjZXNzOiBib29sZWFuLCBfQ2xpY2tlZEJ1dHRvbklEPzogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBuZXcgQ29uZmlybUJveERlZmF1bHRSZXNwb25zZSgpO1xuICAgIGlmIChfQ2xpY2tlZEJ1dHRvbklEKSB7XG4gICAgICByZXNwb25zZS5jbGlja2VkQnV0dG9uSUQgPSBfQ2xpY2tlZEJ1dHRvbklEO1xuICAgIH1cblxuICAgIHJlc3BvbnNlLnNldFN1Y2Nlc3MoX0lzU3VjY2Vzcyk7XG4gICAgcmVzcG9uc2Uuc2V0QmVsb25naW5nKHRoaXMuY29uZmlybUJveEJlbG9uZ2luZyk7XG4gICAgdGhpcy5jb25maXJtQm94QmVsb25naW5nLmV2ZW50c0NvbnRyb2xsZXIuc2V0RGVmYXVsdFJlc3BvbnNlKHJlc3BvbnNlKTtcbiAgfVxuXG4gIG9uT3ZlcmxheUNsaWNrZWQoZXZ0OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgLy8gY29uc29sZS5sb2coJ29uT3ZlcmxheUNsaWNrZWQnKTtcbiAgfVxuXG4gIG9uQ3VzdG9tQnV0dG9uKF9CdXR0b246IElCdXR0b24pOiB2b2lkIHtcbiAgICB0aGlzLmNvbmZpcm1Cb3hCZWxvbmdpbmcuZXZlbnRzQ29udHJvbGxlci5vbkJ1dHRvbkNsaWNrKF9CdXR0b24pO1xuICAgIHRoaXMuc2V0UmVzcG9uc2UodHJ1ZSwgX0J1dHRvbi5JRCk7XG4gICAgdGhpcy5jb25maXJtQm94QmVsb25naW5nLmV2ZW50c0NvbnRyb2xsZXIuY2xvc2UoKTtcbiAgfVxuXG4gIG9uQnV0dG9uQ2xpY2soX1R5cGU6ICdjb25maXJtJyB8ICdkZWNsaW5lJyk6IHZvaWQge1xuICAgIGxldCBidXR0b25JRDtcbiAgICBpZiAoX1R5cGUgPT09ICdjb25maXJtJykge1xuICAgICAgYnV0dG9uSUQgPSB0aGlzLmNvbmZpcm1Cb3hCZWxvbmdpbmcuY29uZmlybUJveENvcmVDb25maWcuY29uZmlybUxhYmVsLnRvTG93ZXJDYXNlKCk7XG4gICAgfSBlbHNlIGlmIChfVHlwZSA9PT0gJ2RlY2xpbmUnKSB7XG4gICAgICBidXR0b25JRCA9IHRoaXMuY29uZmlybUJveEJlbG9uZ2luZy5jb25maXJtQm94Q29yZUNvbmZpZy5kZWNsaW5lTGFiZWwudG9Mb3dlckNhc2UoKTtcbiAgICB9XG5cbiAgICB0aGlzLnNldFJlc3BvbnNlKF9UeXBlID09PSAnY29uZmlybScsIGJ1dHRvbklEKTtcblxuICAgIHRoaXMuY29uZmlybUJveEJlbG9uZ2luZy5ldmVudHNDb250cm9sbGVyLmNsb3NlKCk7XG4gIH1cblxuICBjbG9zZVBhcmVudCQoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICB0aGlzLmJveEFuaW1hdGlvbiA9IHRoaXMuY29uZmlybUJveEJlbG9uZ2luZy5jb25maXJtQm94Q29yZUNvbmZpZy5hbmltYXRpb25PdXQ7XG4gICAgY29uc3QgY2xvc2VEdXJhdGlvbiA9IHRoaXMuY29uZmlybUJveEJlbG9uZ2luZy5jb25maXJtQm94Q29yZUNvbmZpZy5hbmltYXRpb25PdXQgPyA4MDAgOiAyMDA7XG4gICAgdGhpcy5mYWRlSW5PdXRBbmltYXRpb24gPSAnY2xvc2UtZmFzdCc7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcjogT2JzZXJ2ZXI8YW55PikgPT4ge1xuICAgICAgb2JzZXJ2ZXIubmV4dCgnJyk7XG4gICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgIH0pLnBpcGUoZGVsYXkoY2xvc2VEdXJhdGlvbikpO1xuICB9XG5cbiAgc2V0Q3VzdG9tU3R5bGVzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNvbmZpcm1Cb3hCZWxvbmdpbmcuY29uZmlybUJveENvcmVDb25maWcuY3VzdG9tU3R5bGVzLndyYXBwZXJDU1MgJiYgdGhpcy5lbENvbmZpcm1Cb3hXcmFwcGVyKSB7XG4gICAgICB0aGlzLmVsQ29uZmlybUJveFdyYXBwZXIubmF0aXZlRWxlbWVudC5zdHlsZS5jc3NUZXh0ICs9IHRoaXMuY29uZmlybUJveEJlbG9uZ2luZy5jb25maXJtQm94Q29yZUNvbmZpZy5jdXN0b21TdHlsZXMud3JhcHBlckNTUztcbiAgICB9XG4gICAgaWYgKHRoaXMuY29uZmlybUJveEJlbG9uZ2luZy5jb25maXJtQm94Q29yZUNvbmZpZy5jdXN0b21TdHlsZXMudGV4dENTUyAmJiB0aGlzLmVsVGV4dFdyYXBwZXIpIHtcbiAgICAgIHRoaXMuZWxUZXh0V3JhcHBlci5uYXRpdmVFbGVtZW50LnN0eWxlLmNzc1RleHQgKz0gdGhpcy5jb25maXJtQm94QmVsb25naW5nLmNvbmZpcm1Cb3hDb3JlQ29uZmlnLmN1c3RvbVN0eWxlcy50ZXh0Q1NTO1xuICAgIH1cbiAgICBpZiAodGhpcy5jb25maXJtQm94QmVsb25naW5nLmNvbmZpcm1Cb3hDb3JlQ29uZmlnLmN1c3RvbVN0eWxlcy50aXRsZUNTUyAmJiB0aGlzLmVsVGl0bGVXcmFwcGVyKSB7XG4gICAgICB0aGlzLmVsVGl0bGVXcmFwcGVyLm5hdGl2ZUVsZW1lbnQuc3R5bGUuY3NzVGV4dCArPSB0aGlzLmNvbmZpcm1Cb3hCZWxvbmdpbmcuY29uZmlybUJveENvcmVDb25maWcuY3VzdG9tU3R5bGVzLnRpdGxlQ1NTO1xuICAgIH1cbiAgICBpZiAodGhpcy5jb25maXJtQm94QmVsb25naW5nLmNvbmZpcm1Cb3hDb3JlQ29uZmlnLmN1c3RvbVN0eWxlcy5idXR0b25TZWN0aW9uQ1NTICYmIHRoaXMuZWxCdXR0b25XcmFwcGVyKSB7XG4gICAgICB0aGlzLmVsQnV0dG9uV3JhcHBlci5uYXRpdmVFbGVtZW50LnN0eWxlLmNzc1RleHQgKz0gdGhpcy5jb25maXJtQm94QmVsb25naW5nLmNvbmZpcm1Cb3hDb3JlQ29uZmlnLmN1c3RvbVN0eWxlcy5idXR0b25TZWN0aW9uQ1NTO1xuICAgIH1cbiAgICBpZiAodGhpcy5jb25maXJtQm94QmVsb25naW5nLmNvbmZpcm1Cb3hDb3JlQ29uZmlnLmN1c3RvbVN0eWxlcy5idXR0b25DU1MgJiYgdGhpcy5lbEJ1dHRvbikge1xuICAgICAgdGhpcy5lbEJ1dHRvbi5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgZWwubmF0aXZlRWxlbWVudC5zdHlsZS5jc3NUZXh0ICs9IHRoaXMuY29uZmlybUJveEJlbG9uZ2luZy5jb25maXJtQm94Q29yZUNvbmZpZy5jdXN0b21TdHlsZXMuYnV0dG9uQ1NTO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0SWNvbkNsYXNzZXMoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gKFxuICAgICAgJ2ljb24tdHlwZS1jb25maXJtLWJveCAgJyArXG4gICAgICB0aGlzLmxheW91dEhlbHBlci5nZXRJY29uQ2xhc3NlcyhcbiAgICAgICAgdGhpcy5jb25maXJtQm94QmVsb25naW5nLmNvbmZpcm1Cb3hDb3JlQ29uZmlnLmxheW91dFR5cGUsXG4gICAgICAgIHRoaXMuY29uZmlybUJveEJlbG9uZ2luZy5jb25maXJtQm94Q29yZUNvbmZpZy5pY29uU3R5bGVDbGFzc1xuICAgICAgKVxuICAgICk7XG4gIH1cblxuICBnZXRCdXR0b25DbGFzc2VzKGxheW91dFR5cGU6IEJ1dHRvbkxheW91dERpc3BsYXkgfCBudWxsKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5sYXlvdXRIZWxwZXIuZ2V0QnV0dG9uQ2xhc3NlcyhsYXlvdXRUeXBlKTtcbiAgfVxufVxuIiwiPGRpdlxuICBjbGFzcz1cIm5neC1hd2Vzb21lLXBvcHVwLW92ZXJsYXkgY29uZmlybS1ib3gtb3ZlcmxheVwiXG4gIChkYmxjbGljayk9XCJvbk92ZXJsYXlDbGlja2VkKCRldmVudClcIlxuICBbQGZhZGVJbk91dF09XCJ7XG4gICAgdmFsdWU6IGZhZGVJbk91dEFuaW1hdGlvbixcbiAgICBwYXJhbXM6IHtcbiAgICAgIGNsb3NlRGVsYXk6IGNvbmZpcm1Cb3hCZWxvbmdpbmcuY29uZmlybUJveENvcmVDb25maWcuYW5pbWF0aW9uT3V0ID09PSBkaXNhcHBlYXJhbmNlQW5pbWF0aW9uLk5PTkUgPyAnMjAwbXMnIDogJzMwMG1zJ1xuICAgIH1cbiAgfVwiPlxuICA8ZGl2XG4gICAgW0AuZGlzYWJsZWRdPVwiXG4gICAgICBjb25maXJtQm94QmVsb25naW5nLmNvbmZpcm1Cb3hDb3JlQ29uZmlnLmFuaW1hdGlvbkluID09PSBhcHBlYXJhbmNlQW5pbWF0aW9uLk5PTkUgJiZcbiAgICAgIGNvbmZpcm1Cb3hCZWxvbmdpbmcuY29uZmlybUJveENvcmVDb25maWcuYW5pbWF0aW9uT3V0ID09PSBkaXNhcHBlYXJhbmNlQW5pbWF0aW9uLk5PTkVcbiAgICBcIlxuICAgIFtAYm94QW5pbWF0aW9uc109XCJib3hBbmltYXRpb25cIlxuICAgICNlbENvbmZpcm1Cb3hXcmFwcGVyXG4gICAgW2NsYXNzTmFtZV09XCJsYXlvdXRIZWxwZXIuZ2V0Qm94Q2xhc3Nlcyhjb25maXJtQm94QmVsb25naW5nLmNvbmZpcm1Cb3hDb3JlQ29uZmlnLmxheW91dFR5cGUsICdldm9sdmUtY29uZmlybS1ib3gnKVwiXG4gICAgW25nU3R5bGVdPVwie1xuICAgICAgd2lkdGg6IGNvbmZpcm1Cb3hCZWxvbmdpbmcuY29uZmlybUJveENvcmVDb25maWcud2lkdGgsXG4gICAgICBoZWlnaHQ6IGNvbmZpcm1Cb3hCZWxvbmdpbmcuY29uZmlybUJveENvcmVDb25maWcuaGVpZ2h0LFxuICAgICAgb3BhY2l0eTogY29uZmlybUJveEJlbG9uZ2luZy5jb25maXJtQm94Q29yZUNvbmZpZy5hbmltYXRpb25JbiA9PT0gYXBwZWFyYW5jZUFuaW1hdGlvbi5OT05FID8gMSA6IDBcbiAgICB9XCI+XG4gICAgPGRpdiBjbGFzcz1cImNvbmZpcm0tYm94LXRpdGxlLWNvbnRlbnRcIiAjZWxUaXRsZVdyYXBwZXIgKm5nSWY9XCJjb25maXJtQm94QmVsb25naW5nLmRpc3BhdGNoLnRpdGxlXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiZG9udC1icmVhay1vdXRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtd3JhcHBlciBkb250LWJyZWFrLW91dFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb25maXJtLWJveC10aXRsZS10ZXh0XCI+XG4gICAgICAgICAgICB7eyBjb25maXJtQm94QmVsb25naW5nLmRpc3BhdGNoLnRpdGxlIH19XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2XG4gICAgICBjbGFzcz1cImNvbnRlbnQtaG9sZGVyXCJcbiAgICAgICNlbFRleHRXcmFwcGVyXG4gICAgICBbbmdDbGFzc109XCJjb25maXJtQm94QmVsb25naW5nLmRpc3BhdGNoLnRpdGxlID8gJycgOiAnd2l0aG91dC10aXRsZSdcIlxuICAgICAgKm5nSWY9XCJjb25maXJtQm94QmVsb25naW5nLmRpc3BhdGNoLm1lc3NhZ2VcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJpY29uLXNlY3Rpb25cIiAqbmdJZj1cIiFjb25maXJtQm94QmVsb25naW5nLmNvbmZpcm1Cb3hDb3JlQ29uZmlnLmRpc2FibGVJY29uXCI+XG4gICAgICAgIDxzcGFuIFtjbGFzc05hbWVdPVwiZ2V0SWNvbkNsYXNzZXMoKVwiPjwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInRleHQtd3JhcHBlci1zZWN0aW9uIGNvbmZpcm0tYm94LWlubmVyLWNvbnRlbnRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRvbnQtYnJlYWstb3V0XCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtd3JhcHBlclwiIFtpbm5lckhUTUxdPVwiY29uZmlybUJveEJlbG9uZ2luZy5kaXNwYXRjaC5tZXNzYWdlXCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImJ1dHRvbi1ob2xkZXJcIiAjZWxCdXR0b25XcmFwcGVyPlxuICAgICAgPGRpdlxuICAgICAgICBjbGFzcz1cImJ1dHRvbi1zZWN0aW9uXCJcbiAgICAgICAgKm5nSWY9XCJjb25maXJtQm94QmVsb25naW5nLmJ1dHRvbnMubGVuZ3RoXCJcbiAgICAgICAgW25nU3R5bGVdPVwie1xuICAgICAgICAgICd0ZXh0LWFsaWduJzogY29uZmlybUJveEJlbG9uZ2luZy5jb25maXJtQm94Q29yZUNvbmZpZy5idXR0b25Qb3NpdGlvblxuICAgICAgICB9XCI+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICAjZWxCdXR0b25cbiAgICAgICAgICAqbmdGb3I9XCJsZXQgYnV0dG9uIG9mIGNvbmZpcm1Cb3hCZWxvbmdpbmcuYnV0dG9uc1wiXG4gICAgICAgICAgKGNsaWNrKT1cIm9uQ3VzdG9tQnV0dG9uKGJ1dHRvbilcIlxuICAgICAgICAgIFtjbGFzc05hbWVdPVwibGF5b3V0SGVscGVyLmdldEJ1dHRvbkNsYXNzZXMoYnV0dG9uLmxheW91dFR5cGUsICdlZC1idG4gZWQtYnRuLW1kJylcIj5cbiAgICAgICAgICB7eyBidXR0b24ubGFiZWwgfX1cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3M9XCJidXR0b24tc2VjdGlvblwiXG4gICAgICAgICpuZ0lmPVwiIWNvbmZpcm1Cb3hCZWxvbmdpbmcuYnV0dG9ucy5sZW5ndGhcIlxuICAgICAgICBbbmdTdHlsZV09XCJ7XG4gICAgICAgICAgJ3RleHQtYWxpZ24nOiBjb25maXJtQm94QmVsb25naW5nLmNvbmZpcm1Cb3hDb3JlQ29uZmlnLmJ1dHRvblBvc2l0aW9uXG4gICAgICAgIH1cIj5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIGNsYXNzPVwiZWQtYnRuIGVkLWJ0bi1tZFwiXG4gICAgICAgICAgI2VsQnV0dG9uXG4gICAgICAgICAgKGNsaWNrKT1cIm9uQnV0dG9uQ2xpY2soJ2NvbmZpcm0nKVwiXG4gICAgICAgICAgW2NsYXNzTmFtZV09XCJcbiAgICAgICAgICAgIGxheW91dEhlbHBlci5nZXRCdXR0b25DbGFzc2VzKGNvbmZpcm1Cb3hCZWxvbmdpbmcuY29uZmlybUJveENvcmVDb25maWcubGF5b3V0VHlwZSwgJ2VkLWJ0biBlZC1idG4tbWQnLCAnYXV0by1idXR0b24nKVxuICAgICAgICAgIFwiPlxuICAgICAgICAgIHt7IGNvbmZpcm1Cb3hCZWxvbmdpbmcuY29uZmlybUJveENvcmVDb25maWcuY29uZmlybUxhYmVsIH19XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgY2xhc3M9XCJlZC1idG4gZWQtYnRuLW1kIGVkLWJ0bi1zZWNvbmRhcnlcIlxuICAgICAgICAgICNlbEJ1dHRvblxuICAgICAgICAgIChjbGljayk9XCJvbkJ1dHRvbkNsaWNrKCdkZWNsaW5lJylcIlxuICAgICAgICAgICpuZ0lmPVwiY29uZmlybUJveEJlbG9uZ2luZy5jb25maXJtQm94Q29yZUNvbmZpZy5kZWNsaW5lTGFiZWxcIj5cbiAgICAgICAgICB7eyBjb25maXJtQm94QmVsb25naW5nLmNvbmZpcm1Cb3hDb3JlQ29uZmlnLmRlY2xpbmVMYWJlbCB9fVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuIl19