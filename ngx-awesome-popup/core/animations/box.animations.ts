import { animate, keyframes, transition, trigger } from '@angular/animations';
import * as kf from './keyframes';

export function boxAnimations() {
  return trigger('boxAnimations', [
    // in
    transition('* => bounceIn', animate('600ms cubic-bezier(0.215, 0.61, 0.355, 1)', keyframes(kf.bounceIn))),
    transition('* => swing', animate('800ms', keyframes(kf.swing))),
    transition('* => zoomIn', animate('400ms', keyframes(kf.zoomIn))),
    transition('* => zoomInRotate', animate('800ms ease-out', keyframes(kf.zoomInRotate))),
    transition('* => elastic', animate('1000ms', keyframes(kf.elastic))),
    transition('* => jello', animate(1000, keyframes(kf.jello))),
    transition('* => fadeIn', animate('400ms ease-out', keyframes(kf.fadeIn))),
    transition('* => slideInUp', animate('400ms ease-out', keyframes(kf.slideInUp))),
    transition('* => slideInDown', animate('400ms ease-out', keyframes(kf.slideInDown))),
    transition('* => slideInLeft', animate('400ms ease-out', keyframes(kf.slideInLeft))),
    transition('* => slideInRight', animate('400ms ease-out', keyframes(kf.slideInRight))),

    // out
    transition('* => zoomOutWind', animate('400ms ease-in', keyframes(kf.zoomOutWind))),
    transition('* => bounceOut', animate('400ms ease-in', keyframes(kf.bounceOut))),
    transition('* => flipOutY', animate('400ms ease-in', keyframes(kf.flipOutY))),
    transition('* => zoomOut', animate('400ms ease-in', keyframes(kf.zoomOut))),
    transition('* => zoomOutRotate', animate('400ms ease-out', keyframes(kf.zoomOutRotate))),
    transition('* => slideOutUp', animate('300ms ease-in', keyframes(kf.slideOutUp))),
    transition('* => slideOutDown', animate('300ms ease-in', keyframes(kf.slideOutDown))),
    transition('* => slideOutLeft', animate('300ms ease-in', keyframes(kf.slideOutLeft))),
    transition('* => slideOutRight', animate('300ms ease-in', keyframes(kf.slideOutRight))),

    // motion
    transition('* => wobble', animate(1000, keyframes(kf.wobble)))
  ]);
}
