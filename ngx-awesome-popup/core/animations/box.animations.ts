import { animate, AnimationTriggerMetadata, keyframes, state, style, transition, trigger } from '@angular/animations';
import * as kf from './keyframes';

export function boxAnimations(): AnimationTriggerMetadata {
  return trigger('boxAnimations', [
    state('reset', style({ opacity: 1 })),
    // in
    state('noneIn', style({ opacity: 1 })),
    state('bounceIn', style({ opacity: 1 })),
    state('swing', style({ opacity: 1 })),
    state('zoomIn', style({ opacity: 1 })),
    state('zoomInRotate', style({ opacity: 1 })),
    state('elastic', style({ opacity: 1 })),
    state('jello', style({ opacity: 1 })),
    state('fadeIn', style({ opacity: 1 })),
    state('slideInUp', style({ opacity: 1 })),
    state('slideInDown', style({ opacity: 1 })),
    state('slideInLeft', style({ opacity: 1 })),
    state('slideInRight', style({ opacity: 1 })),

    transition('* => noneIn', animate('10ms', keyframes(kf.fadeIn))),
    transition('* => bounceIn', animate('1000ms cubic-bezier(0.215, 0.61, 0.355, 1)', keyframes(kf.bounceIn))),
    transition('* => swing', animate('800ms', keyframes(kf.swing))),
    transition('* => zoomIn', animate('400ms ease-in', keyframes(kf.zoomIn))),
    transition('* => zoomInRotate', animate('800ms ease-in', keyframes(kf.zoomInRotate))),
    transition('* => elastic', animate('1000ms', keyframes(kf.elastic))),
    transition('* => jello', animate(1000, keyframes(kf.jello))),
    transition('* => fadeIn', animate('400ms ease-in', keyframes(kf.fadeIn))),
    transition('* => slideInUp', animate('400ms ease-in', keyframes(kf.slideInUp))),
    transition('* => slideInDown', animate('400ms ease-in', keyframes(kf.slideInDown))),
    transition('* => slideInLeft', animate('400ms ease-in', keyframes(kf.slideInLeft))),
    transition('* => slideInRight', animate('400ms ease-in', keyframes(kf.slideInRight))),
    transition('* => reset', style({ opacity: 1 })),

    // out
    state('noneOut', style({ opacity: 0 })),
    state('fadeOut', style({ opacity: 0 })),
    state('zoomOutWind', style({ opacity: 0 })),
    state('bounceOut', style({ opacity: 0 })),
    state('flipOutY', style({ opacity: 0 })),
    state('zoomOut', style({ opacity: 0 })),
    state('zoomOutRotate', style({ opacity: 0 })),
    state('slideOutUp', style({ opacity: 0 })),
    state('slideOutDown', style({ opacity: 0 })),
    state('slideOutLeft', style({ opacity: 0 })),
    state('slideOutRight', style({ opacity: 0 })),

    transition('* => noneOut', animate('100ms ease-out', keyframes(kf.fadeOut))),
    transition('* => fadeOut', animate('300ms ease-out', keyframes(kf.fadeOut))),
    transition('* => zoomOutWind', animate('400ms ease-out', keyframes(kf.zoomOutWind))),
    transition('* => bounceOut', animate('400ms ease-out', keyframes(kf.bounceOut))),
    transition('* => flipOutY', animate('400ms ease-out', keyframes(kf.flipOutY))),
    transition('* => zoomOut', animate('400ms ease-out', keyframes(kf.zoomOut))),
    transition('* => zoomOutRotate', animate('400ms ease-out', keyframes(kf.zoomOutRotate))),
    transition('* => slideOutUp', animate('300ms ease-out', keyframes(kf.slideOutUp))),
    transition('* => slideOutDown', animate('300ms ease-out', keyframes(kf.slideOutDown))),
    transition('* => slideOutLeft', animate('300ms ease-out', keyframes(kf.slideOutLeft))),
    transition('* => slideOutRight', animate('300ms ease-out', keyframes(kf.slideOutRight))),

    // motion
    transition('* => wobble', animate(1000, keyframes(kf.wobble)))
  ]);
}
