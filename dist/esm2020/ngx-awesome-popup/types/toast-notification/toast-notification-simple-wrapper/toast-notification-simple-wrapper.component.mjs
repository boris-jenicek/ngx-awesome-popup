import { Component, Inject } from '@angular/core';
import { boxAnimations } from '../../../core/animations/box.animations';
import { fadeInOut } from '../../../core/animations/fade-in-out.animation';
import { LayoutHelperService } from '../../../core/layout-helper.service';
import { WrapperAbstraction } from '../core/wrapper-abstraction';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/global-config.service";
import * as i2 from "../../../core/layout-helper.service";
import * as i3 from "@angular/common";
import * as i4 from "../core/classes";
function ToastNotificationSimpleWrapperComponent_div_2_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 14);
    i0.ɵɵelement(1, "span", 15);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r7 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("className", ctx_r7.getIconClasses());
} }
function ToastNotificationSimpleWrapperComponent_div_2_span_6_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span", 16);
    i0.ɵɵlistener("click", function ToastNotificationSimpleWrapperComponent_div_2_span_6_Template_span_click_0_listener() { i0.ɵɵrestoreView(_r10); const ctx_r9 = i0.ɵɵnextContext(2); return ctx_r9.closeIcon(); });
    i0.ɵɵelementEnd();
} }
function ToastNotificationSimpleWrapperComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8, 9);
    i0.ɵɵtemplate(2, ToastNotificationSimpleWrapperComponent_div_2_div_2_Template, 2, 1, "div", 10);
    i0.ɵɵelementStart(3, "div", 11);
    i0.ɵɵelementStart(4, "div", 12);
    i0.ɵɵtext(5);
    i0.ɵɵtemplate(6, ToastNotificationSimpleWrapperComponent_div_2_span_6_Template, 1, 0, "span", 13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", !ctx_r0.toastNotificationBelonging.toastCoreConfig.disableIcon);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.toastNotificationBelonging.dispatch.title, " ");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r0.buttonsExist);
} }
function ToastNotificationSimpleWrapperComponent_div_3_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 12);
    i0.ɵɵelementStart(1, "p");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r12 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r12.toastNotificationBelonging.dispatch.message);
} }
function ToastNotificationSimpleWrapperComponent_div_3_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 22);
} if (rf & 2) {
    const ctx_r13 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("innerHTML", ctx_r13.toastNotificationBelonging.dispatch.message, i0.ɵɵsanitizeHtml);
} }
function ToastNotificationSimpleWrapperComponent_div_3_span_6_Template(rf, ctx) { if (rf & 1) {
    const _r16 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span", 16);
    i0.ɵɵlistener("click", function ToastNotificationSimpleWrapperComponent_div_3_span_6_Template_span_click_0_listener() { i0.ɵɵrestoreView(_r16); const ctx_r15 = i0.ɵɵnextContext(2); return ctx_r15.closeIcon(); });
    i0.ɵɵelementEnd();
} }
const _c0 = function (a0) { return { "text-align": a0 }; };
const _c1 = function (a0) { return { "only-message": a0 }; };
function ToastNotificationSimpleWrapperComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 17, 18);
    i0.ɵɵelementStart(2, "div", 19);
    i0.ɵɵelementStart(3, "div", 11);
    i0.ɵɵtemplate(4, ToastNotificationSimpleWrapperComponent_div_3_div_4_Template, 3, 1, "div", 20);
    i0.ɵɵtemplate(5, ToastNotificationSimpleWrapperComponent_div_3_div_5_Template, 1, 1, "div", 21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, ToastNotificationSimpleWrapperComponent_div_3_span_6_Template, 1, 0, "span", 13);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction1(5, _c0, ctx_r1.toastNotificationBelonging.toastCoreConfig.textPosition))("ngClass", i0.ɵɵpureFunction1(7, _c1, !ctx_r1.toastNotificationBelonging.dispatch.title));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", !ctx_r1.toastNotificationBelonging.toastCoreConfig.allowHtmlMessage);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.toastNotificationBelonging.toastCoreConfig.allowHtmlMessage);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.buttonsExist && !ctx_r1.toastNotificationBelonging.dispatch.title);
} }
function ToastNotificationSimpleWrapperComponent_div_6_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r21 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 25, 26);
    i0.ɵɵlistener("click", function ToastNotificationSimpleWrapperComponent_div_6_button_1_Template_button_click_0_listener() { const restoredCtx = i0.ɵɵrestoreView(_r21); const button_r18 = restoredCtx.$implicit; const ctx_r20 = i0.ɵɵnextContext(2); return ctx_r20.onCustomButton(button_r18); });
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const button_r18 = ctx.$implicit;
    const ctx_r17 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("className", ctx_r17.layoutHelper.getButtonClasses(button_r18.layoutType, "ed-btn ed-btn-sm"));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", button_r18.label, " ");
} }
function ToastNotificationSimpleWrapperComponent_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 23);
    i0.ɵɵtemplate(1, ToastNotificationSimpleWrapperComponent_div_6_button_1_Template, 3, 2, "button", 24);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction1(2, _c0, ctx_r3.toastNotificationBelonging.toastCoreConfig.buttonPosition));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r3.toastNotificationBelonging.buttons);
} }
function ToastNotificationSimpleWrapperComponent_div_7_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r25 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 25);
    i0.ɵɵlistener("click", function ToastNotificationSimpleWrapperComponent_div_7_button_1_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r25); const ctx_r24 = i0.ɵɵnextContext(2); return ctx_r24.onButtonClick("confirm"); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r22 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("className", ctx_r22.layoutHelper.getButtonClasses(ctx_r22.toastNotificationBelonging.toastCoreConfig.layoutType, "ed-btn ed-btn-sm", "auto-button"));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r22.toastNotificationBelonging.toastCoreConfig.confirmLabel, " ");
} }
function ToastNotificationSimpleWrapperComponent_div_7_button_2_Template(rf, ctx) { if (rf & 1) {
    const _r27 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 29);
    i0.ɵɵlistener("click", function ToastNotificationSimpleWrapperComponent_div_7_button_2_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r27); const ctx_r26 = i0.ɵɵnextContext(2); return ctx_r26.onButtonClick("decline"); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r23 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r23.toastNotificationBelonging.toastCoreConfig.declineLabel, " ");
} }
function ToastNotificationSimpleWrapperComponent_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 23);
    i0.ɵɵtemplate(1, ToastNotificationSimpleWrapperComponent_div_7_button_1_Template, 2, 2, "button", 27);
    i0.ɵɵtemplate(2, ToastNotificationSimpleWrapperComponent_div_7_button_2_Template, 2, 1, "button", 28);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction1(3, _c0, ctx_r4.toastNotificationBelonging.toastCoreConfig.buttonPosition));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r4.toastNotificationBelonging.toastCoreConfig.confirmLabel);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r4.toastNotificationBelonging.toastCoreConfig.declineLabel);
} }
const _c2 = function (a0) { return { width: a0 }; };
function ToastNotificationSimpleWrapperComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 30);
    i0.ɵɵelement(1, "div", 31);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction1(1, _c2, (ctx_r5.toastNotificationBelonging.toastCoreConfig.progressBar === 1 ? ctx_r5.timer.Progress : ctx_r5.timer.Remaining) + "%"));
} }
const _c3 = function (a0) { return { closeDelay: a0 }; };
const _c4 = function (a0, a1) { return { value: a0, params: a1 }; };
export class ToastNotificationSimpleWrapperComponent extends WrapperAbstraction {
    constructor(toastNotificationBelonging, gConfig, cd, layoutHelper) {
        super(toastNotificationBelonging, layoutHelper);
        this.toastNotificationBelonging = toastNotificationBelonging;
        this.gConfig = gConfig;
        this.cd = cd;
        this.layoutHelper = layoutHelper;
    }
    ngAfterViewInit() {
        this.setResponse(false);
        this.cd.detectChanges();
        this.autoClose();
        this.setCustomStyles();
    }
}
ToastNotificationSimpleWrapperComponent.ɵfac = function ToastNotificationSimpleWrapperComponent_Factory(t) { return new (t || ToastNotificationSimpleWrapperComponent)(i0.ɵɵdirectiveInject('toastNotificationBelonging'), i0.ɵɵdirectiveInject(i1.GlobalConfigService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i2.LayoutHelperService)); };
ToastNotificationSimpleWrapperComponent.ɵcmp = i0.ɵɵdefineComponent({ type: ToastNotificationSimpleWrapperComponent, selectors: [["app-toast-notification-simple-wrapper"]], features: [i0.ɵɵProvidersFeature([LayoutHelperService]), i0.ɵɵInheritDefinitionFeature], decls: 9, vars: 14, consts: [[1, "toast-wrapper", "simple-toast", 3, "dblclick"], [3, "className", "mouseover", "mouseout", "click"], ["class", "toast-title-content", 4, "ngIf"], ["class", "content-holder toast-text", 4, "ngIf"], [1, "button-holder"], ["elButtonWrapper", ""], ["class", "button-section", 3, "ngStyle", 4, "ngIf"], ["class", "progress-bar-container", 4, "ngIf"], [1, "toast-title-content"], ["elTitleWrapper", ""], ["class", "icon-section", 4, "ngIf"], [1, "dont-break-out"], [1, "text-wrapper", "dont-break-out"], ["class", "close-ico icon-times-circle", 3, "click", 4, "ngIf"], [1, "icon-section"], [3, "className"], [1, "close-ico", "icon-times-circle", 3, "click"], [1, "content-holder", "toast-text"], ["elTextWrapper", ""], [1, "text-wrapper-section", "toast-inner-content", 3, "ngStyle", "ngClass"], ["class", "text-wrapper dont-break-out", 4, "ngIf"], ["class", "text-wrapper", 3, "innerHTML", 4, "ngIf"], [1, "text-wrapper", 3, "innerHTML"], [1, "button-section", 3, "ngStyle"], [3, "className", "click", 4, "ngFor", "ngForOf"], [3, "className", "click"], ["elButton", ""], [3, "className", "click", 4, "ngIf"], ["class", "ed-btn ed-btn-sm ed-btn-secondary", 3, "click", 4, "ngIf"], [1, "ed-btn", "ed-btn-sm", "ed-btn-secondary", 3, "click"], [1, "progress-bar-container"], [1, "progress-bar", 3, "ngStyle"]], template: function ToastNotificationSimpleWrapperComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵlistener("dblclick", function ToastNotificationSimpleWrapperComponent_Template_div_dblclick_0_listener($event) { return ctx.onOverlayClicked($event); });
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵlistener("mouseover", function ToastNotificationSimpleWrapperComponent_Template_div_mouseover_1_listener() { return ctx.mouseOver(); })("mouseout", function ToastNotificationSimpleWrapperComponent_Template_div_mouseout_1_listener() { return ctx.mouseOut(); })("click", function ToastNotificationSimpleWrapperComponent_Template_div_click_1_listener($event) { return ctx.onToastClicked($event); });
        i0.ɵɵtemplate(2, ToastNotificationSimpleWrapperComponent_div_2_Template, 7, 3, "div", 2);
        i0.ɵɵtemplate(3, ToastNotificationSimpleWrapperComponent_div_3_Template, 7, 9, "div", 3);
        i0.ɵɵelementStart(4, "div", 4, 5);
        i0.ɵɵtemplate(6, ToastNotificationSimpleWrapperComponent_div_6_Template, 2, 4, "div", 6);
        i0.ɵɵtemplate(7, ToastNotificationSimpleWrapperComponent_div_7_Template, 3, 5, "div", 6);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(8, ToastNotificationSimpleWrapperComponent_div_8_Template, 2, 3, "div", 7);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("@fadeInOut", i0.ɵɵpureFunction2(11, _c4, ctx.fadeInOutAnimation, i0.ɵɵpureFunction1(9, _c3, ctx.toastNotificationBelonging.toastCoreConfig.animationOut === ctx.disappearanceAnimation.NONE ? "200ms" : "300ms")));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("@.disabled", ctx.toastNotificationBelonging.toastCoreConfig.animationIn === ctx.appearanceAnimation.NONE && ctx.toastNotificationBelonging.toastCoreConfig.animationOut === ctx.disappearanceAnimation.NONE)("@boxAnimations", ctx.boxAnimation)("className", ctx.layoutHelper.getBoxClasses(ctx.toastNotificationBelonging.toastCoreConfig.layoutType, "evolve-toast"));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.toastNotificationBelonging.dispatch.title);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.toastNotificationBelonging.dispatch.message);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx.toastNotificationBelonging.buttons.length);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.toastNotificationBelonging.buttons.length && (ctx.toastNotificationBelonging.toastCoreConfig.declineLabel || ctx.toastNotificationBelonging.toastCoreConfig.confirmLabel));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.buttonsExist && ctx.toastNotificationBelonging.toastCoreConfig.progressBar !== 0);
    } }, directives: [i3.NgIf, i3.NgStyle, i3.NgClass, i3.NgForOf], encapsulation: 2, data: { animation: [fadeInOut(), boxAnimations()] } });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ToastNotificationSimpleWrapperComponent, [{
        type: Component,
        args: [{ selector: 'app-toast-notification-simple-wrapper', animations: [fadeInOut(), boxAnimations()], providers: [LayoutHelperService], template: "<div\n  class=\"toast-wrapper simple-toast\"\n  (dblclick)=\"onOverlayClicked($event)\"\n  [@fadeInOut]=\"{\n    value: fadeInOutAnimation,\n    params: {\n      closeDelay: toastNotificationBelonging.toastCoreConfig.animationOut === disappearanceAnimation.NONE ? '200ms' : '300ms'\n    }\n  }\">\n  <div\n    [@.disabled]=\"\n      toastNotificationBelonging.toastCoreConfig.animationIn === appearanceAnimation.NONE &&\n      toastNotificationBelonging.toastCoreConfig.animationOut === disappearanceAnimation.NONE\n    \"\n    [@boxAnimations]=\"boxAnimation\"\n    (mouseover)=\"mouseOver()\"\n    (mouseout)=\"mouseOut()\"\n    (click)=\"onToastClicked($event)\"\n    [className]=\"layoutHelper.getBoxClasses(toastNotificationBelonging.toastCoreConfig.layoutType, 'evolve-toast')\">\n    <div class=\"toast-title-content\" #elTitleWrapper *ngIf=\"toastNotificationBelonging.dispatch.title\">\n      <div class=\"icon-section\" *ngIf=\"!toastNotificationBelonging.toastCoreConfig.disableIcon\">\n        <span [className]=\"getIconClasses()\"></span>\n      </div>\n      <div class=\"dont-break-out\">\n        <div class=\"text-wrapper dont-break-out\">\n          {{ toastNotificationBelonging.dispatch.title }}\n          <span class=\"close-ico icon-times-circle\" (click)=\"closeIcon()\" *ngIf=\"!buttonsExist\"></span>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"content-holder toast-text\" #elTextWrapper *ngIf=\"toastNotificationBelonging.dispatch.message\">\n      <div\n        class=\"text-wrapper-section toast-inner-content\"\n        [ngStyle]=\"{\n          'text-align': toastNotificationBelonging.toastCoreConfig.textPosition\n        }\"\n        [ngClass]=\"{\n          'only-message': !toastNotificationBelonging.dispatch.title\n        }\">\n        <div class=\"dont-break-out\">\n          <div class=\"text-wrapper dont-break-out\" *ngIf=\"!toastNotificationBelonging.toastCoreConfig.allowHtmlMessage\">\n            <p>{{ toastNotificationBelonging.dispatch.message }}</p>\n          </div>\n          <div\n            class=\"text-wrapper\"\n            *ngIf=\"toastNotificationBelonging.toastCoreConfig.allowHtmlMessage\"\n            [innerHTML]=\"toastNotificationBelonging.dispatch.message\"></div>\n        </div>\n      </div>\n      <span\n        class=\"close-ico icon-times-circle\"\n        (click)=\"closeIcon()\"\n        *ngIf=\"buttonsExist && !toastNotificationBelonging.dispatch.title\"></span>\n    </div>\n\n    <div class=\"button-holder\" #elButtonWrapper>\n      <div\n        class=\"button-section\"\n        *ngIf=\"toastNotificationBelonging.buttons.length\"\n        [ngStyle]=\"{\n          'text-align': toastNotificationBelonging.toastCoreConfig.buttonPosition\n        }\">\n        <button\n          #elButton\n          *ngFor=\"let button of toastNotificationBelonging.buttons\"\n          (click)=\"onCustomButton(button)\"\n          [className]=\"layoutHelper.getButtonClasses(button.layoutType, 'ed-btn ed-btn-sm')\">\n          {{ button.label }}\n        </button>\n      </div>\n\n      <div\n        class=\"button-section\"\n        [ngStyle]=\"{\n          'text-align': toastNotificationBelonging.toastCoreConfig.buttonPosition\n        }\"\n        *ngIf=\"\n          !toastNotificationBelonging.buttons.length &&\n          (toastNotificationBelonging.toastCoreConfig.declineLabel || toastNotificationBelonging.toastCoreConfig.confirmLabel)\n        \">\n        <button\n          *ngIf=\"toastNotificationBelonging.toastCoreConfig.confirmLabel\"\n          (click)=\"onButtonClick('confirm')\"\n          [className]=\"\n            layoutHelper.getButtonClasses(toastNotificationBelonging.toastCoreConfig.layoutType, 'ed-btn ed-btn-sm', 'auto-button')\n          \">\n          {{ toastNotificationBelonging.toastCoreConfig.confirmLabel }}\n        </button>\n        <button\n          class=\"ed-btn ed-btn-sm ed-btn-secondary\"\n          (click)=\"onButtonClick('decline')\"\n          *ngIf=\"toastNotificationBelonging.toastCoreConfig.declineLabel\">\n          {{ toastNotificationBelonging.toastCoreConfig.declineLabel }}\n        </button>\n      </div>\n    </div>\n\n    <div class=\"progress-bar-container\" *ngIf=\"!buttonsExist && toastNotificationBelonging.toastCoreConfig.progressBar !== 0\">\n      <div\n        class=\"progress-bar\"\n        [ngStyle]=\"{\n          width: (toastNotificationBelonging.toastCoreConfig.progressBar === 1 ? timer.Progress : timer.Remaining) + '%'\n        }\"></div>\n    </div>\n  </div>\n</div>\n" }]
    }], function () { return [{ type: i4.ToastNotificationBelonging, decorators: [{
                type: Inject,
                args: ['toastNotificationBelonging']
            }] }, { type: i1.GlobalConfigService }, { type: i0.ChangeDetectorRef }, { type: i2.LayoutHelperService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3Qtbm90aWZpY2F0aW9uLXNpbXBsZS13cmFwcGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL25neC1hd2Vzb21lLXBvcHVwL3R5cGVzL3RvYXN0LW5vdGlmaWNhdGlvbi90b2FzdC1ub3RpZmljYXRpb24tc2ltcGxlLXdyYXBwZXIvdG9hc3Qtbm90aWZpY2F0aW9uLXNpbXBsZS13cmFwcGVyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL25neC1hd2Vzb21lLXBvcHVwL3R5cGVzL3RvYXN0LW5vdGlmaWNhdGlvbi90b2FzdC1ub3RpZmljYXRpb24tc2ltcGxlLXdyYXBwZXIvdG9hc3Qtbm90aWZpY2F0aW9uLXNpbXBsZS13cmFwcGVyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBb0MsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNwRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDeEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdEQUFnRCxDQUFDO0FBRTNFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBRTFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDOzs7Ozs7O0lDYzNELCtCQUEwRjtJQUN4RiwyQkFBNEM7SUFDOUMsaUJBQU07OztJQURFLGVBQThCO0lBQTlCLG1EQUE4Qjs7OztJQUtsQyxnQ0FBc0Y7SUFBNUMsMkxBQVMsa0JBQVcsSUFBQztJQUF1QixpQkFBTzs7O0lBUG5HLGlDQUFtRztJQUNqRywrRkFFTTtJQUNOLCtCQUE0QjtJQUMxQiwrQkFBeUM7SUFDdkMsWUFDQTtJQUFBLGlHQUE2RjtJQUMvRixpQkFBTTtJQUNSLGlCQUFNO0lBQ1IsaUJBQU07OztJQVR1QixlQUE2RDtJQUE3RCxxRkFBNkQ7SUFLcEYs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QztRQUhELHFNQUdDO1FBa0IrQixlQUFtRjtRQUFuRiw0R0FBbUY7eUdEdkY5RyxDQUFDLFNBQVMsRUFBRSxFQUFFLGFBQWEsRUFBRSxDQUFDO3VGQUcvQix1Q0FBdUM7Y0FObkQsU0FBUzsyQkFDRSx1Q0FBdUMsY0FFckMsQ0FBQyxTQUFTLEVBQUUsRUFBRSxhQUFhLEVBQUUsQ0FBQyxhQUMvQixDQUFDLG1CQUFtQixDQUFDOztzQkFJN0IsTUFBTTt1QkFBQyw0QkFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGJveEFuaW1hdGlvbnMgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2FuaW1hdGlvbnMvYm94LmFuaW1hdGlvbnMnO1xuaW1wb3J0IHsgZmFkZUluT3V0IH0gZnJvbSAnLi4vLi4vLi4vY29yZS9hbmltYXRpb25zL2ZhZGUtaW4tb3V0LmFuaW1hdGlvbic7XG5pbXBvcnQgeyBHbG9iYWxDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9nbG9iYWwtY29uZmlnLnNlcnZpY2UnO1xuaW1wb3J0IHsgTGF5b3V0SGVscGVyU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvbGF5b3V0LWhlbHBlci5zZXJ2aWNlJztcbmltcG9ydCB7IFRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nIH0gZnJvbSAnLi4vY29yZS9jbGFzc2VzJztcbmltcG9ydCB7IFdyYXBwZXJBYnN0cmFjdGlvbiB9IGZyb20gJy4uL2NvcmUvd3JhcHBlci1hYnN0cmFjdGlvbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC10b2FzdC1ub3RpZmljYXRpb24tc2ltcGxlLXdyYXBwZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vdG9hc3Qtbm90aWZpY2F0aW9uLXNpbXBsZS13cmFwcGVyLmNvbXBvbmVudC5odG1sJyxcbiAgYW5pbWF0aW9uczogW2ZhZGVJbk91dCgpLCBib3hBbmltYXRpb25zKCldLFxuICBwcm92aWRlcnM6IFtMYXlvdXRIZWxwZXJTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBUb2FzdE5vdGlmaWNhdGlvblNpbXBsZVdyYXBwZXJDb21wb25lbnQgZXh0ZW5kcyBXcmFwcGVyQWJzdHJhY3Rpb24gaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdCgndG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcnKVxuICAgIHB1YmxpYyB0b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZzogVG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcsXG4gICAgcHVibGljIGdDb25maWc6IEdsb2JhbENvbmZpZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHVibGljIGxheW91dEhlbHBlcjogTGF5b3V0SGVscGVyU2VydmljZVxuICApIHtcbiAgICBzdXBlcih0b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZywgbGF5b3V0SGVscGVyKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnNldFJlc3BvbnNlKGZhbHNlKTtcbiAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgICB0aGlzLmF1dG9DbG9zZSgpO1xuICAgIHRoaXMuc2V0Q3VzdG9tU3R5bGVzKCk7XG4gIH1cbn1cbiIsIjxkaXZcbiAgY2xhc3M9XCJ0b2FzdC13cmFwcGVyIHNpbXBsZS10b2FzdFwiXG4gIChkYmxjbGljayk9XCJvbk92ZXJsYXlDbGlja2VkKCRldmVudClcIlxuICBbQGZhZGVJbk91dF09XCJ7XG4gICAgdmFsdWU6IGZhZGVJbk91dEFuaW1hdGlvbixcbiAgICBwYXJhbXM6IHtcbiAgICAgIGNsb3NlRGVsYXk6IHRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLnRvYXN0Q29yZUNvbmZpZy5hbmltYXRpb25PdXQgPT09IGRpc2FwcGVhcmFuY2VBbmltYXRpb24uTk9ORSA/ICcyMDBtcycgOiAnMzAwbXMnXG4gICAgfVxuICB9XCI+XG4gIDxkaXZcbiAgICBbQC5kaXNhYmxlZF09XCJcbiAgICAgIHRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLnRvYXN0Q29yZUNvbmZpZy5hbmltYXRpb25JbiA9PT0gYXBwZWFyYW5jZUFuaW1hdGlvbi5OT05FICYmXG4gICAgICB0b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy50b2FzdENvcmVDb25maWcuYW5pbWF0aW9uT3V0ID09PSBkaXNhcHBlYXJhbmNlQW5pbWF0aW9uLk5PTkVcbiAgICBcIlxuICAgIFtAYm94QW5pbWF0aW9uc109XCJib3hBbmltYXRpb25cIlxuICAgIChtb3VzZW92ZXIpPVwibW91c2VPdmVyKClcIlxuICAgIChtb3VzZW91dCk9XCJtb3VzZU91dCgpXCJcbiAgICAoY2xpY2spPVwib25Ub2FzdENsaWNrZWQoJGV2ZW50KVwiXG4gICAgW2NsYXNzTmFtZV09XCJsYXlvdXRIZWxwZXIuZ2V0Qm94Q2xhc3Nlcyh0b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy50b2FzdENvcmVDb25maWcubGF5b3V0VHlwZSwgJ2V2b2x2ZS10b2FzdCcpXCI+XG4gICAgPGRpdiBjbGFzcz1cInRvYXN0LXRpdGxlLWNvbnRlbnRcIiAjZWxUaXRsZVdyYXBwZXIgKm5nSWY9XCJ0b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5kaXNwYXRjaC50aXRsZVwiPlxuICAgICAgPGRpdiBjbGFzcz1cImljb24tc2VjdGlvblwiICpuZ0lmPVwiIXRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLnRvYXN0Q29yZUNvbmZpZy5kaXNhYmxlSWNvblwiPlxuICAgICAgICA8c3BhbiBbY2xhc3NOYW1lXT1cImdldEljb25DbGFzc2VzKClcIj48L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJkb250LWJyZWFrLW91dFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC13cmFwcGVyIGRvbnQtYnJlYWstb3V0XCI+XG4gICAgICAgICAge3sgdG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuZGlzcGF0Y2gudGl0bGUgfX1cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImNsb3NlLWljbyBpY29uLXRpbWVzLWNpcmNsZVwiIChjbGljayk9XCJjbG9zZUljb24oKVwiICpuZ0lmPVwiIWJ1dHRvbnNFeGlzdFwiPjwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJjb250ZW50LWhvbGRlciB0b2FzdC10ZXh0XCIgI2VsVGV4dFdyYXBwZXIgKm5nSWY9XCJ0b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5kaXNwYXRjaC5tZXNzYWdlXCI+XG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzPVwidGV4dC13cmFwcGVyLXNlY3Rpb24gdG9hc3QtaW5uZXItY29udGVudFwiXG4gICAgICAgIFtuZ1N0eWxlXT1cIntcbiAgICAgICAgICAndGV4dC1hbGlnbic6IHRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLnRvYXN0Q29yZUNvbmZpZy50ZXh0UG9zaXRpb25cbiAgICAgICAgfVwiXG4gICAgICAgIFtuZ0NsYXNzXT1cIntcbiAgICAgICAgICAnb25seS1tZXNzYWdlJzogIXRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLmRpc3BhdGNoLnRpdGxlXG4gICAgICAgIH1cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRvbnQtYnJlYWstb3V0XCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtd3JhcHBlciBkb250LWJyZWFrLW91dFwiICpuZ0lmPVwiIXRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLnRvYXN0Q29yZUNvbmZpZy5hbGxvd0h0bWxNZXNzYWdlXCI+XG4gICAgICAgICAgICA8cD57eyB0b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5kaXNwYXRjaC5tZXNzYWdlIH19PC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzPVwidGV4dC13cmFwcGVyXCJcbiAgICAgICAgICAgICpuZ0lmPVwidG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcudG9hc3RDb3JlQ29uZmlnLmFsbG93SHRtbE1lc3NhZ2VcIlxuICAgICAgICAgICAgW2lubmVySFRNTF09XCJ0b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5kaXNwYXRjaC5tZXNzYWdlXCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8c3BhblxuICAgICAgICBjbGFzcz1cImNsb3NlLWljbyBpY29uLXRpbWVzLWNpcmNsZVwiXG4gICAgICAgIChjbGljayk9XCJjbG9zZUljb24oKVwiXG4gICAgICAgICpuZ0lmPVwiYnV0dG9uc0V4aXN0ICYmICF0b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5kaXNwYXRjaC50aXRsZVwiPjwvc3Bhbj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJidXR0b24taG9sZGVyXCIgI2VsQnV0dG9uV3JhcHBlcj5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3M9XCJidXR0b24tc2VjdGlvblwiXG4gICAgICAgICpuZ0lmPVwidG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuYnV0dG9ucy5sZW5ndGhcIlxuICAgICAgICBbbmdTdHlsZV09XCJ7XG4gICAgICAgICAgJ3RleHQtYWxpZ24nOiB0b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy50b2FzdENvcmVDb25maWcuYnV0dG9uUG9zaXRpb25cbiAgICAgICAgfVwiPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgI2VsQnV0dG9uXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGJ1dHRvbiBvZiB0b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5idXR0b25zXCJcbiAgICAgICAgICAoY2xpY2spPVwib25DdXN0b21CdXR0b24oYnV0dG9uKVwiXG4gICAgICAgICAgW2NsYXNzTmFtZV09XCJsYXlvdXRIZWxwZXIuZ2V0QnV0dG9uQ2xhc3NlcyhidXR0b24ubGF5b3V0VHlwZSwgJ2VkLWJ0biBlZC1idG4tc20nKVwiPlxuICAgICAgICAgIHt7IGJ1dHRvbi5sYWJlbCB9fVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzPVwiYnV0dG9uLXNlY3Rpb25cIlxuICAgICAgICBbbmdTdHlsZV09XCJ7XG4gICAgICAgICAgJ3RleHQtYWxpZ24nOiB0b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy50b2FzdENvcmVDb25maWcuYnV0dG9uUG9zaXRpb25cbiAgICAgICAgfVwiXG4gICAgICAgICpuZ0lmPVwiXG4gICAgICAgICAgIXRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLmJ1dHRvbnMubGVuZ3RoICYmXG4gICAgICAgICAgKHRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLnRvYXN0Q29yZUNvbmZpZy5kZWNsaW5lTGFiZWwgfHwgdG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcudG9hc3RDb3JlQ29uZmlnLmNvbmZpcm1MYWJlbClcbiAgICAgICAgXCI+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICAqbmdJZj1cInRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLnRvYXN0Q29yZUNvbmZpZy5jb25maXJtTGFiZWxcIlxuICAgICAgICAgIChjbGljayk9XCJvbkJ1dHRvbkNsaWNrKCdjb25maXJtJylcIlxuICAgICAgICAgIFtjbGFzc05hbWVdPVwiXG4gICAgICAgICAgICBsYXlvdXRIZWxwZXIuZ2V0QnV0dG9uQ2xhc3Nlcyh0b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy50b2FzdENvcmVDb25maWcubGF5b3V0VHlwZSwgJ2VkLWJ0biBlZC1idG4tc20nLCAnYXV0by1idXR0b24nKVxuICAgICAgICAgIFwiPlxuICAgICAgICAgIHt7IHRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLnRvYXN0Q29yZUNvbmZpZy5jb25maXJtTGFiZWwgfX1cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBjbGFzcz1cImVkLWJ0biBlZC1idG4tc20gZWQtYnRuLXNlY29uZGFyeVwiXG4gICAgICAgICAgKGNsaWNrKT1cIm9uQnV0dG9uQ2xpY2soJ2RlY2xpbmUnKVwiXG4gICAgICAgICAgKm5nSWY9XCJ0b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy50b2FzdENvcmVDb25maWcuZGVjbGluZUxhYmVsXCI+XG4gICAgICAgICAge3sgdG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcudG9hc3RDb3JlQ29uZmlnLmRlY2xpbmVMYWJlbCB9fVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cInByb2dyZXNzLWJhci1jb250YWluZXJcIiAqbmdJZj1cIiFidXR0b25zRXhpc3QgJiYgdG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcudG9hc3RDb3JlQ29uZmlnLnByb2dyZXNzQmFyICE9PSAwXCI+XG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzPVwicHJvZ3Jlc3MtYmFyXCJcbiAgICAgICAgW25nU3R5bGVdPVwie1xuICAgICAgICAgIHdpZHRoOiAodG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcudG9hc3RDb3JlQ29uZmlnLnByb2dyZXNzQmFyID09PSAxID8gdGltZXIuUHJvZ3Jlc3MgOiB0aW1lci5SZW1haW5pbmcpICsgJyUnXG4gICAgICAgIH1cIj48L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5cbiJdfQ==