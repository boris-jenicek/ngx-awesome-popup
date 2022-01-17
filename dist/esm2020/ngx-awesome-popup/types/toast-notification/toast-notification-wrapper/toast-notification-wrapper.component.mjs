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
function ToastNotificationWrapperComponent_div_2_span_5_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span", 13);
    i0.ɵɵlistener("click", function ToastNotificationWrapperComponent_div_2_span_5_Template_span_click_0_listener() { i0.ɵɵrestoreView(_r9); const ctx_r8 = i0.ɵɵnextContext(2); return ctx_r8.closeIcon(); });
    i0.ɵɵelementEnd();
} }
function ToastNotificationWrapperComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8, 9);
    i0.ɵɵelementStart(2, "div", 10);
    i0.ɵɵelementStart(3, "div", 11);
    i0.ɵɵtext(4);
    i0.ɵɵtemplate(5, ToastNotificationWrapperComponent_div_2_span_5_Template, 1, 0, "span", 12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.toastNotificationBelonging.dispatch.title, " ");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r0.buttonsExist);
} }
function ToastNotificationWrapperComponent_div_3_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 20);
    i0.ɵɵelement(1, "span", 21);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r11 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("className", ctx_r11.getIconClasses());
} }
function ToastNotificationWrapperComponent_div_3_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 11);
    i0.ɵɵelementStart(1, "p");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r12 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r12.toastNotificationBelonging.dispatch.message);
} }
function ToastNotificationWrapperComponent_div_3_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 22);
} if (rf & 2) {
    const ctx_r13 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("innerHTML", ctx_r13.toastNotificationBelonging.dispatch.message, i0.ɵɵsanitizeHtml);
} }
function ToastNotificationWrapperComponent_div_3_span_7_Template(rf, ctx) { if (rf & 1) {
    const _r16 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span", 13);
    i0.ɵɵlistener("click", function ToastNotificationWrapperComponent_div_3_span_7_Template_span_click_0_listener() { i0.ɵɵrestoreView(_r16); const ctx_r15 = i0.ɵɵnextContext(2); return ctx_r15.closeIcon(); });
    i0.ɵɵelementEnd();
} }
const _c0 = function (a0) { return { "text-align": a0 }; };
const _c1 = function (a0) { return { "only-message": a0 }; };
function ToastNotificationWrapperComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 14, 15);
    i0.ɵɵtemplate(2, ToastNotificationWrapperComponent_div_3_div_2_Template, 2, 1, "div", 16);
    i0.ɵɵelementStart(3, "div", 17);
    i0.ɵɵelementStart(4, "div", 10);
    i0.ɵɵtemplate(5, ToastNotificationWrapperComponent_div_3_div_5_Template, 3, 1, "div", 18);
    i0.ɵɵtemplate(6, ToastNotificationWrapperComponent_div_3_div_6_Template, 1, 1, "div", 19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(7, ToastNotificationWrapperComponent_div_3_span_7_Template, 1, 0, "span", 12);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", !ctx_r1.toastNotificationBelonging.toastCoreConfig.disableIcon);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction1(6, _c0, ctx_r1.toastNotificationBelonging.toastCoreConfig.textPosition))("ngClass", i0.ɵɵpureFunction1(8, _c1, !ctx_r1.toastNotificationBelonging.dispatch.title));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", !ctx_r1.toastNotificationBelonging.toastCoreConfig.allowHtmlMessage);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.toastNotificationBelonging.toastCoreConfig.allowHtmlMessage);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.buttonsExist && !ctx_r1.toastNotificationBelonging.dispatch.title);
} }
function ToastNotificationWrapperComponent_div_6_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r21 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 25, 26);
    i0.ɵɵlistener("click", function ToastNotificationWrapperComponent_div_6_button_1_Template_button_click_0_listener() { const restoredCtx = i0.ɵɵrestoreView(_r21); const button_r18 = restoredCtx.$implicit; const ctx_r20 = i0.ɵɵnextContext(2); return ctx_r20.onCustomButton(button_r18); });
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const button_r18 = ctx.$implicit;
    const ctx_r17 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("className", ctx_r17.layoutHelper.getButtonClasses(button_r18.layoutType, "ed-btn ed-btn-sm"));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", button_r18.label, " ");
} }
function ToastNotificationWrapperComponent_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 23);
    i0.ɵɵtemplate(1, ToastNotificationWrapperComponent_div_6_button_1_Template, 3, 2, "button", 24);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction1(2, _c0, ctx_r3.toastNotificationBelonging.toastCoreConfig.buttonPosition));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r3.toastNotificationBelonging.buttons);
} }
function ToastNotificationWrapperComponent_div_7_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r26 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 25, 26);
    i0.ɵɵlistener("click", function ToastNotificationWrapperComponent_div_7_button_1_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r26); const ctx_r25 = i0.ɵɵnextContext(2); return ctx_r25.onButtonClick("confirm"); });
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r22 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("className", ctx_r22.layoutHelper.getButtonClasses(ctx_r22.toastNotificationBelonging.toastCoreConfig.layoutType, "ed-btn ed-btn-sm", "auto-button"));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r22.toastNotificationBelonging.toastCoreConfig.confirmLabel, " ");
} }
function ToastNotificationWrapperComponent_div_7_button_2_Template(rf, ctx) { if (rf & 1) {
    const _r29 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 29, 26);
    i0.ɵɵlistener("click", function ToastNotificationWrapperComponent_div_7_button_2_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r29); const ctx_r28 = i0.ɵɵnextContext(2); return ctx_r28.onButtonClick("decline"); });
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r23 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r23.toastNotificationBelonging.toastCoreConfig.declineLabel, " ");
} }
function ToastNotificationWrapperComponent_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 23);
    i0.ɵɵtemplate(1, ToastNotificationWrapperComponent_div_7_button_1_Template, 3, 2, "button", 27);
    i0.ɵɵtemplate(2, ToastNotificationWrapperComponent_div_7_button_2_Template, 3, 1, "button", 28);
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
function ToastNotificationWrapperComponent_div_8_Template(rf, ctx) { if (rf & 1) {
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
export class ToastNotificationWrapperComponent extends WrapperAbstraction {
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
ToastNotificationWrapperComponent.ɵfac = function ToastNotificationWrapperComponent_Factory(t) { return new (t || ToastNotificationWrapperComponent)(i0.ɵɵdirectiveInject('toastNotificationBelonging'), i0.ɵɵdirectiveInject(i1.GlobalConfigService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i2.LayoutHelperService)); };
ToastNotificationWrapperComponent.ɵcmp = i0.ɵɵdefineComponent({ type: ToastNotificationWrapperComponent, selectors: [["app-toast-notification-wrapper"]], features: [i0.ɵɵProvidersFeature([LayoutHelperService]), i0.ɵɵInheritDefinitionFeature], decls: 9, vars: 14, consts: [[1, "toast-wrapper", "standard-toast", 3, "dblclick"], [3, "className", "mouseover", "mouseout", "click"], ["class", "toast-title-content", 4, "ngIf"], ["class", "content-holder toast-text", 4, "ngIf"], [1, "button-holder"], ["elButtonWrapper", ""], ["class", "button-section", 3, "ngStyle", 4, "ngIf"], ["class", "progress-bar-container", 4, "ngIf"], [1, "toast-title-content"], ["elTitleWrapper", ""], [1, "dont-break-out"], [1, "text-wrapper", "dont-break-out"], ["class", "close-ico icon-times-circle", 3, "click", 4, "ngIf"], [1, "close-ico", "icon-times-circle", 3, "click"], [1, "content-holder", "toast-text"], ["elTextWrapper", ""], ["class", "icon-section", 4, "ngIf"], [1, "text-wrapper-section", "toast-inner-content", 3, "ngStyle", "ngClass"], ["class", "text-wrapper dont-break-out", 4, "ngIf"], ["class", "text-wrapper", 3, "innerHTML", 4, "ngIf"], [1, "icon-section"], [3, "className"], [1, "text-wrapper", 3, "innerHTML"], [1, "button-section", 3, "ngStyle"], [3, "className", "click", 4, "ngFor", "ngForOf"], [3, "className", "click"], ["elButton", ""], [3, "className", "click", 4, "ngIf"], ["class", "ed-btn ed-btn-sm ed-btn-secondary", 3, "click", 4, "ngIf"], [1, "ed-btn", "ed-btn-sm", "ed-btn-secondary", 3, "click"], [1, "progress-bar-container"], [1, "progress-bar", 3, "ngStyle"]], template: function ToastNotificationWrapperComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵlistener("dblclick", function ToastNotificationWrapperComponent_Template_div_dblclick_0_listener($event) { return ctx.onOverlayClicked($event); });
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵlistener("mouseover", function ToastNotificationWrapperComponent_Template_div_mouseover_1_listener() { return ctx.mouseOver(); })("mouseout", function ToastNotificationWrapperComponent_Template_div_mouseout_1_listener() { return ctx.mouseOut(); })("click", function ToastNotificationWrapperComponent_Template_div_click_1_listener($event) { return ctx.onToastClicked($event); });
        i0.ɵɵtemplate(2, ToastNotificationWrapperComponent_div_2_Template, 6, 2, "div", 2);
        i0.ɵɵtemplate(3, ToastNotificationWrapperComponent_div_3_Template, 8, 10, "div", 3);
        i0.ɵɵelementStart(4, "div", 4, 5);
        i0.ɵɵtemplate(6, ToastNotificationWrapperComponent_div_6_Template, 2, 4, "div", 6);
        i0.ɵɵtemplate(7, ToastNotificationWrapperComponent_div_7_Template, 3, 5, "div", 6);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(8, ToastNotificationWrapperComponent_div_8_Template, 2, 3, "div", 7);
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
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ToastNotificationWrapperComponent, [{
        type: Component,
        args: [{ selector: 'app-toast-notification-wrapper', animations: [fadeInOut(), boxAnimations()], providers: [LayoutHelperService], template: "<div\n  class=\"toast-wrapper standard-toast\"\n  (dblclick)=\"onOverlayClicked($event)\"\n  [@fadeInOut]=\"{\n    value: fadeInOutAnimation,\n    params: {\n      closeDelay: toastNotificationBelonging.toastCoreConfig.animationOut === disappearanceAnimation.NONE ? '200ms' : '300ms'\n    }\n  }\">\n  <div\n    [@.disabled]=\"\n      toastNotificationBelonging.toastCoreConfig.animationIn === appearanceAnimation.NONE &&\n      toastNotificationBelonging.toastCoreConfig.animationOut === disappearanceAnimation.NONE\n    \"\n    [@boxAnimations]=\"boxAnimation\"\n    (mouseover)=\"mouseOver()\"\n    (mouseout)=\"mouseOut()\"\n    (click)=\"onToastClicked($event)\"\n    [className]=\"layoutHelper.getBoxClasses(toastNotificationBelonging.toastCoreConfig.layoutType, 'evolve-toast')\">\n    <div class=\"toast-title-content\" #elTitleWrapper *ngIf=\"toastNotificationBelonging.dispatch.title\">\n      <div class=\"dont-break-out\">\n        <div class=\"text-wrapper dont-break-out\">\n          {{ toastNotificationBelonging.dispatch.title }}\n          <span class=\"close-ico icon-times-circle\" (click)=\"closeIcon()\" *ngIf=\"!buttonsExist\"></span>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"content-holder toast-text\" #elTextWrapper *ngIf=\"toastNotificationBelonging.dispatch.message\">\n      <div class=\"icon-section\" *ngIf=\"!toastNotificationBelonging.toastCoreConfig.disableIcon\">\n        <span [className]=\"getIconClasses()\"></span>\n      </div>\n      <div\n        class=\"text-wrapper-section toast-inner-content\"\n        [ngStyle]=\"{\n          'text-align': toastNotificationBelonging.toastCoreConfig.textPosition\n        }\"\n        [ngClass]=\"{\n          'only-message': !toastNotificationBelonging.dispatch.title\n        }\">\n        <div class=\"dont-break-out\">\n          <div class=\"text-wrapper dont-break-out\" *ngIf=\"!toastNotificationBelonging.toastCoreConfig.allowHtmlMessage\">\n            <p>{{ toastNotificationBelonging.dispatch.message }}</p>\n          </div>\n          <div\n            class=\"text-wrapper\"\n            *ngIf=\"toastNotificationBelonging.toastCoreConfig.allowHtmlMessage\"\n            [innerHTML]=\"toastNotificationBelonging.dispatch.message\"></div>\n        </div>\n      </div>\n      <span\n        class=\"close-ico icon-times-circle\"\n        (click)=\"closeIcon()\"\n        *ngIf=\"buttonsExist && !toastNotificationBelonging.dispatch.title\"></span>\n    </div>\n\n    <div class=\"button-holder\" #elButtonWrapper>\n      <div\n        class=\"button-section\"\n        *ngIf=\"toastNotificationBelonging.buttons.length\"\n        [ngStyle]=\"{\n          'text-align': toastNotificationBelonging.toastCoreConfig.buttonPosition\n        }\">\n        <button\n          #elButton\n          *ngFor=\"let button of toastNotificationBelonging.buttons\"\n          (click)=\"onCustomButton(button)\"\n          [className]=\"layoutHelper.getButtonClasses(button.layoutType, 'ed-btn ed-btn-sm')\">\n          {{ button.label }}\n        </button>\n      </div>\n\n      <div\n        class=\"button-section\"\n        [ngStyle]=\"{\n          'text-align': toastNotificationBelonging.toastCoreConfig.buttonPosition\n        }\"\n        *ngIf=\"\n          !toastNotificationBelonging.buttons.length &&\n          (toastNotificationBelonging.toastCoreConfig.declineLabel || toastNotificationBelonging.toastCoreConfig.confirmLabel)\n        \">\n        <button\n          #elButton\n          *ngIf=\"toastNotificationBelonging.toastCoreConfig.confirmLabel\"\n          (click)=\"onButtonClick('confirm')\"\n          [className]=\"\n            layoutHelper.getButtonClasses(toastNotificationBelonging.toastCoreConfig.layoutType, 'ed-btn ed-btn-sm', 'auto-button')\n          \">\n          {{ toastNotificationBelonging.toastCoreConfig.confirmLabel }}\n        </button>\n        <button\n          class=\"ed-btn ed-btn-sm ed-btn-secondary\"\n          #elButton\n          (click)=\"onButtonClick('decline')\"\n          *ngIf=\"toastNotificationBelonging.toastCoreConfig.declineLabel\">\n          {{ toastNotificationBelonging.toastCoreConfig.declineLabel }}\n        </button>\n      </div>\n    </div>\n\n    <div class=\"progress-bar-container\" *ngIf=\"!buttonsExist && toastNotificationBelonging.toastCoreConfig.progressBar !== 0\">\n      <div\n        class=\"progress-bar\"\n        [ngStyle]=\"{\n          width: (toastNotificationBelonging.toastCoreConfig.progressBar === 1 ? timer.Progress : timer.Remaining) + '%'\n        }\"></div>\n    </div>\n  </div>\n</div>\n" }]
    }], function () { return [{ type: i4.ToastNotificationBelonging, decorators: [{
                type: Inject,
                args: ['toastNotificationBelonging']
            }] }, { type: i1.GlobalConfigService }, { type: i0.ChangeDetectorRef }, { type: i2.LayoutHelperService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3Qtbm90aWZpY2F0aW9uLXdyYXBwZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbmd4LWF3ZXNvbWUtcG9wdXAvdHlwZXMvdG9hc3Qtbm90aWZpY2F0aW9uL3RvYXN0LW5vdGlmaWNhdGlvbi13cmFwcGVyL3RvYXN0LW5vdGlmaWNhdGlvbi13cmFwcGVyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL25neC1hd2Vzb21lLXBvcHVwL3R5cGVzL3RvYXN0LW5vdGlmaWNhdGlvbi90b2FzdC1ub3RpZmljYXRpb24td3JhcHBlci90b2FzdC1ub3RpZmljYXRpb24td3JhcHBlci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQW9DLFNBQVMsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUUzRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUUxRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7Ozs7Ozs7SUNpQnZELGdDQUFzRjtJQUE1QyxvTEFBUyxrQkFBVyxJQUFDO0lBQXVCLGlCQUFPOzs7SUFKbkcsaUNBQW1HO0lBQ2pHLCtCQUE0QjtJQUMxQiwrQkFBeUM7SUFDdkMsWUFDQTtJQUFBLDJGQUE2RjtJQUMvRixpQkFBTTtJQUNSLGlCQUFNO0lBQ1IsaUJBQU07OztJQUpBLGVBQ0E7SUFEQSxpRkFDQTtJQUFpRSxlQUFtQjtJQUFuQiwyQ0FBbUI7OztJQU14RiwrQkFBMEY7SUFDeEYsMkJBQTRDO0lBQzlDLGlCQUFNOzs7SUFERSxlQUE4QjtJQUE5QixvREFBOEI7OztJQVdsQywrQkFBOEc7SUFDNUcseUJBQUc7SUFB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QUFtRjt5R0R6RjlHLENBQUMsU0FBUyxFQUFFLEVBQUUsYUFBYSxFQUFFLENBQUM7dUZBRy9CLGlDQUFpQztjQU43QyxTQUFTOzJCQUNFLGdDQUFnQyxjQUU5QixDQUFDLFNBQVMsRUFBRSxFQUFFLGFBQWEsRUFBRSxDQUFDLGFBQy9CLENBQUMsbUJBQW1CLENBQUM7O3NCQUk3QixNQUFNO3VCQUFDLDRCQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgYm94QW5pbWF0aW9ucyB9IGZyb20gJy4uLy4uLy4uL2NvcmUvYW5pbWF0aW9ucy9ib3guYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBmYWRlSW5PdXQgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2FuaW1hdGlvbnMvZmFkZS1pbi1vdXQuYW5pbWF0aW9uJztcbmltcG9ydCB7IEdsb2JhbENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2dsb2JhbC1jb25maWcuc2VydmljZSc7XG5pbXBvcnQgeyBMYXlvdXRIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9sYXlvdXQtaGVscGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgVG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcgfSBmcm9tICcuLi9jb3JlL2NsYXNzZXMnO1xuaW1wb3J0IHsgV3JhcHBlckFic3RyYWN0aW9uIH0gZnJvbSAnLi4vY29yZS93cmFwcGVyLWFic3RyYWN0aW9uJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLXRvYXN0LW5vdGlmaWNhdGlvbi13cmFwcGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RvYXN0LW5vdGlmaWNhdGlvbi13cmFwcGVyLmNvbXBvbmVudC5odG1sJyxcbiAgYW5pbWF0aW9uczogW2ZhZGVJbk91dCgpLCBib3hBbmltYXRpb25zKCldLFxuICBwcm92aWRlcnM6IFtMYXlvdXRIZWxwZXJTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBUb2FzdE5vdGlmaWNhdGlvbldyYXBwZXJDb21wb25lbnQgZXh0ZW5kcyBXcmFwcGVyQWJzdHJhY3Rpb24gaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdCgndG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcnKVxuICAgIHB1YmxpYyB0b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZzogVG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcsXG4gICAgcHVibGljIGdDb25maWc6IEdsb2JhbENvbmZpZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHVibGljIGxheW91dEhlbHBlcjogTGF5b3V0SGVscGVyU2VydmljZVxuICApIHtcbiAgICBzdXBlcih0b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZywgbGF5b3V0SGVscGVyKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnNldFJlc3BvbnNlKGZhbHNlKTtcbiAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgICB0aGlzLmF1dG9DbG9zZSgpO1xuICAgIHRoaXMuc2V0Q3VzdG9tU3R5bGVzKCk7XG4gIH1cbn1cbiIsIjxkaXZcbiAgY2xhc3M9XCJ0b2FzdC13cmFwcGVyIHN0YW5kYXJkLXRvYXN0XCJcbiAgKGRibGNsaWNrKT1cIm9uT3ZlcmxheUNsaWNrZWQoJGV2ZW50KVwiXG4gIFtAZmFkZUluT3V0XT1cIntcbiAgICB2YWx1ZTogZmFkZUluT3V0QW5pbWF0aW9uLFxuICAgIHBhcmFtczoge1xuICAgICAgY2xvc2VEZWxheTogdG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcudG9hc3RDb3JlQ29uZmlnLmFuaW1hdGlvbk91dCA9PT0gZGlzYXBwZWFyYW5jZUFuaW1hdGlvbi5OT05FID8gJzIwMG1zJyA6ICczMDBtcydcbiAgICB9XG4gIH1cIj5cbiAgPGRpdlxuICAgIFtALmRpc2FibGVkXT1cIlxuICAgICAgdG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcudG9hc3RDb3JlQ29uZmlnLmFuaW1hdGlvbkluID09PSBhcHBlYXJhbmNlQW5pbWF0aW9uLk5PTkUgJiZcbiAgICAgIHRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLnRvYXN0Q29yZUNvbmZpZy5hbmltYXRpb25PdXQgPT09IGRpc2FwcGVhcmFuY2VBbmltYXRpb24uTk9ORVxuICAgIFwiXG4gICAgW0Bib3hBbmltYXRpb25zXT1cImJveEFuaW1hdGlvblwiXG4gICAgKG1vdXNlb3Zlcik9XCJtb3VzZU92ZXIoKVwiXG4gICAgKG1vdXNlb3V0KT1cIm1vdXNlT3V0KClcIlxuICAgIChjbGljayk9XCJvblRvYXN0Q2xpY2tlZCgkZXZlbnQpXCJcbiAgICBbY2xhc3NOYW1lXT1cImxheW91dEhlbHBlci5nZXRCb3hDbGFzc2VzKHRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLnRvYXN0Q29yZUNvbmZpZy5sYXlvdXRUeXBlLCAnZXZvbHZlLXRvYXN0JylcIj5cbiAgICA8ZGl2IGNsYXNzPVwidG9hc3QtdGl0bGUtY29udGVudFwiICNlbFRpdGxlV3JhcHBlciAqbmdJZj1cInRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLmRpc3BhdGNoLnRpdGxlXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiZG9udC1icmVhay1vdXRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtd3JhcHBlciBkb250LWJyZWFrLW91dFwiPlxuICAgICAgICAgIHt7IHRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLmRpc3BhdGNoLnRpdGxlIH19XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJjbG9zZS1pY28gaWNvbi10aW1lcy1jaXJjbGVcIiAoY2xpY2spPVwiY2xvc2VJY29uKClcIiAqbmdJZj1cIiFidXR0b25zRXhpc3RcIj48L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwiY29udGVudC1ob2xkZXIgdG9hc3QtdGV4dFwiICNlbFRleHRXcmFwcGVyICpuZ0lmPVwidG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuZGlzcGF0Y2gubWVzc2FnZVwiPlxuICAgICAgPGRpdiBjbGFzcz1cImljb24tc2VjdGlvblwiICpuZ0lmPVwiIXRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLnRvYXN0Q29yZUNvbmZpZy5kaXNhYmxlSWNvblwiPlxuICAgICAgICA8c3BhbiBbY2xhc3NOYW1lXT1cImdldEljb25DbGFzc2VzKClcIj48L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3M9XCJ0ZXh0LXdyYXBwZXItc2VjdGlvbiB0b2FzdC1pbm5lci1jb250ZW50XCJcbiAgICAgICAgW25nU3R5bGVdPVwie1xuICAgICAgICAgICd0ZXh0LWFsaWduJzogdG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcudG9hc3RDb3JlQ29uZmlnLnRleHRQb3NpdGlvblxuICAgICAgICB9XCJcbiAgICAgICAgW25nQ2xhc3NdPVwie1xuICAgICAgICAgICdvbmx5LW1lc3NhZ2UnOiAhdG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuZGlzcGF0Y2gudGl0bGVcbiAgICAgICAgfVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZG9udC1icmVhay1vdXRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC13cmFwcGVyIGRvbnQtYnJlYWstb3V0XCIgKm5nSWY9XCIhdG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcudG9hc3RDb3JlQ29uZmlnLmFsbG93SHRtbE1lc3NhZ2VcIj5cbiAgICAgICAgICAgIDxwPnt7IHRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLmRpc3BhdGNoLm1lc3NhZ2UgfX08L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3M9XCJ0ZXh0LXdyYXBwZXJcIlxuICAgICAgICAgICAgKm5nSWY9XCJ0b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy50b2FzdENvcmVDb25maWcuYWxsb3dIdG1sTWVzc2FnZVwiXG4gICAgICAgICAgICBbaW5uZXJIVE1MXT1cInRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLmRpc3BhdGNoLm1lc3NhZ2VcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxzcGFuXG4gICAgICAgIGNsYXNzPVwiY2xvc2UtaWNvIGljb24tdGltZXMtY2lyY2xlXCJcbiAgICAgICAgKGNsaWNrKT1cImNsb3NlSWNvbigpXCJcbiAgICAgICAgKm5nSWY9XCJidXR0b25zRXhpc3QgJiYgIXRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLmRpc3BhdGNoLnRpdGxlXCI+PC9zcGFuPlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cImJ1dHRvbi1ob2xkZXJcIiAjZWxCdXR0b25XcmFwcGVyPlxuICAgICAgPGRpdlxuICAgICAgICBjbGFzcz1cImJ1dHRvbi1zZWN0aW9uXCJcbiAgICAgICAgKm5nSWY9XCJ0b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5idXR0b25zLmxlbmd0aFwiXG4gICAgICAgIFtuZ1N0eWxlXT1cIntcbiAgICAgICAgICAndGV4dC1hbGlnbic6IHRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLnRvYXN0Q29yZUNvbmZpZy5idXR0b25Qb3NpdGlvblxuICAgICAgICB9XCI+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICAjZWxCdXR0b25cbiAgICAgICAgICAqbmdGb3I9XCJsZXQgYnV0dG9uIG9mIHRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLmJ1dHRvbnNcIlxuICAgICAgICAgIChjbGljayk9XCJvbkN1c3RvbUJ1dHRvbihidXR0b24pXCJcbiAgICAgICAgICBbY2xhc3NOYW1lXT1cImxheW91dEhlbHBlci5nZXRCdXR0b25DbGFzc2VzKGJ1dHRvbi5sYXlvdXRUeXBlLCAnZWQtYnRuIGVkLWJ0bi1zbScpXCI+XG4gICAgICAgICAge3sgYnV0dG9uLmxhYmVsIH19XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3M9XCJidXR0b24tc2VjdGlvblwiXG4gICAgICAgIFtuZ1N0eWxlXT1cIntcbiAgICAgICAgICAndGV4dC1hbGlnbic6IHRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLnRvYXN0Q29yZUNvbmZpZy5idXR0b25Qb3NpdGlvblxuICAgICAgICB9XCJcbiAgICAgICAgKm5nSWY9XCJcbiAgICAgICAgICAhdG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuYnV0dG9ucy5sZW5ndGggJiZcbiAgICAgICAgICAodG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcudG9hc3RDb3JlQ29uZmlnLmRlY2xpbmVMYWJlbCB8fCB0b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy50b2FzdENvcmVDb25maWcuY29uZmlybUxhYmVsKVxuICAgICAgICBcIj5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICNlbEJ1dHRvblxuICAgICAgICAgICpuZ0lmPVwidG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcudG9hc3RDb3JlQ29uZmlnLmNvbmZpcm1MYWJlbFwiXG4gICAgICAgICAgKGNsaWNrKT1cIm9uQnV0dG9uQ2xpY2soJ2NvbmZpcm0nKVwiXG4gICAgICAgICAgW2NsYXNzTmFtZV09XCJcbiAgICAgICAgICAgIGxheW91dEhlbHBlci5nZXRCdXR0b25DbGFzc2VzKHRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLnRvYXN0Q29yZUNvbmZpZy5sYXlvdXRUeXBlLCAnZWQtYnRuIGVkLWJ0bi1zbScsICdhdXRvLWJ1dHRvbicpXG4gICAgICAgICAgXCI+XG4gICAgICAgICAge3sgdG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcudG9hc3RDb3JlQ29uZmlnLmNvbmZpcm1MYWJlbCB9fVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIGNsYXNzPVwiZWQtYnRuIGVkLWJ0bi1zbSBlZC1idG4tc2Vjb25kYXJ5XCJcbiAgICAgICAgICAjZWxCdXR0b25cbiAgICAgICAgICAoY2xpY2spPVwib25CdXR0b25DbGljaygnZGVjbGluZScpXCJcbiAgICAgICAgICAqbmdJZj1cInRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLnRvYXN0Q29yZUNvbmZpZy5kZWNsaW5lTGFiZWxcIj5cbiAgICAgICAgICB7eyB0b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy50b2FzdENvcmVDb25maWcuZGVjbGluZUxhYmVsIH19XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwicHJvZ3Jlc3MtYmFyLWNvbnRhaW5lclwiICpuZ0lmPVwiIWJ1dHRvbnNFeGlzdCAmJiB0b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy50b2FzdENvcmVDb25maWcucHJvZ3Jlc3NCYXIgIT09IDBcIj5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3M9XCJwcm9ncmVzcy1iYXJcIlxuICAgICAgICBbbmdTdHlsZV09XCJ7XG4gICAgICAgICAgd2lkdGg6ICh0b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy50b2FzdENvcmVDb25maWcucHJvZ3Jlc3NCYXIgPT09IDEgPyB0aW1lci5Qcm9ncmVzcyA6IHRpbWVyLlJlbWFpbmluZykgKyAnJSdcbiAgICAgICAgfVwiPjwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuIl19