import { style } from '@angular/animations';

// in
export const bounceIn = [
  style({
    transform: 'scale3d(0.7, 0.7, 0.7)',
    offset: 0,
    opacity: 0
  }),
  style({
    transform: 'scale3d(1.3, 1.3, 1.3)',
    offset: 0.3,
    opacity: 0.3
  }),
  style({
    transform: 'scale3d(0.95, 0.95, 0.95)',
    offset: 0.6,
    opacity: 1
  }),
  style({
    transform: 'scale3d(1.03, 1.03, 1.03)',
    opacity: 1,
    offset: 0.8
  }),
  style({
    transform: 'scale3d(0.97, 0.97, 0.97)',
    offset: 0.9
  }),
  style({
    transform: 'scale3d(1, 1, 1)',
    offset: 1,
    opacity: 1
  })
];

export const swing = [
  style({ offset: 0, opacity: 0 }),
  style({ transform: 'rotate3d(0, 0, 1, 10deg)', offset: 0.2 }),
  style({ transform: 'rotate3d(0, 0, 1, -7deg)', offset: 0.3, opacity: 1 }),
  style({ transform: 'rotate3d(0, 0, 1, 3deg)', offset: 0.55 }),
  style({ transform: 'rotate3d(0, 0, 1, -3deg)', offset: 0.8 }),
  style({ transform: 'none', offset: 1 })
];

export const zoomIn = [
  style({
    transform: 'scale3d(0.3, 0.3, 0.3)',
    offset: 0
  }),
  style({
    offset: 0.1,
    opacity: 1
  }),
  style({
    transform: 'scale3d(1, 1, 1)',
    offset: 1
  })
];

export const zoomInRotate = [
  style({
    transform: 'scale(0.1) rotate(30deg)',
    offset: 0,
    opacity: 0
  }),
  style({
    transform: 'rotate(-10deg)',
    offset: 0.5,
    opacity: 1
  }),
  style({
    transform: 'rotate(3deg)',
    offset: 0.7
  }),
  style({
    transform: 'scale(1)',
    offset: 1
  })
];

export const elastic = [
  style({ transform: 'scale3d(1, 1, 1)', offset: 0, opacity: 0 }),
  style({ transform: 'scale3d(1.25, 0.75, 1)', offset: 0.3 }),
  style({ transform: 'scale3d(0.75, 1.25, 1)', offset: 0.4, opacity: 1 }),
  style({ transform: 'scale3d(1.15, 0.85, 1)', offset: 0.5 }),
  style({ transform: 'scale3d(0.95, 1.05, 1)', offset: 0.6 }),
  style({ transform: 'scale3d(1.05, 0.95, 1)', offset: 0.7 }),
  style({ transform: 'scale3d(1, 1, 1)', offset: 1 })
];

export const jello = [
  style({ offset: 0, opacity: 0 }),
  style({ transform: 'skewX(-12.5deg) skewY(-12.5deg)', offset: 0.111 }),
  style({ transform: 'skewX(6.25deg) skewY(6.25deg)', offset: 0.222 }),
  style({ transform: 'skewX(-3.125deg) skewY(-3.125deg)', offset: 0.333, opacity: 1 }),
  style({ transform: 'skewX(1.5625deg) skewY(1.5625deg)', offset: 0.444 }),
  style({ transform: 'skewX(-0.78125deg) skewY(-0.78125deg)', offset: 0.555 }),
  style({ transform: 'skewX(0.390625deg) skewY(0.390625deg)', offset: 0.666 }),
  style({ transform: 'skewX(0.390625deg) skewY(0.390625deg)', offset: 0.777 }),
  style({
    transform: 'skewX(-0.1953125deg) skewY(-0.1953125deg)',
    offset: 0.888
  }),
  style({ transform: 'none', offset: 1 })
];

export const fadeIn = [style({ offset: 0, opacity: 0 }), style({ offset: 1, opacity: 1 })];

export const slideInUp = [
  style({ offset: 0, opacity: 0, transform: 'translate3d(0, 100%, 0)' }),
  style({ offset: 1, opacity: 1, transform: 'translate3d(0, 0, 0)' })
];

export const slideInDown = [
  style({ offset: 0, opacity: 0, transform: 'translate3d(0, -100%, 0)' }),
  style({ offset: 1, opacity: 1, transform: 'translate3d(0, 0, 0)' })
];

export const slideInLeft = [
  style({ offset: 0, opacity: 0, transform: 'translate3d(-100%, 0, 0)' }),
  style({ offset: 1, opacity: 1, transform: 'translate3d(0, 0, 0)' })
];

export const slideInRight = [
  style({ offset: 0, opacity: 0, transform: 'translate3d(100%, 0, 0)' }),
  style({ offset: 1, opacity: 1, transform: 'translate3d(0, 0, 0)' })
];

// out

export const fadeOut = [style({ offset: 0, opacity: 1 }), style({ offset: 1, opacity: 0 })];

export const zoomOutWind = [
  style({
    transform: 'scale3d(.475, .475, .475) translate3d(-42px, 0, 0)',
    offset: 0.4
  }),
  style({
    transform: 'scale(.1) translate3d(400px, 0, 0)',
    'transform-origin': 'top center',
    offset: 1,
    opacity: 0
  })
];

export const bounceOut = [
  style({
    transform: 'scale3d(1.3, 1.3, 1.3)',
    offset: 0.3
  }),
  style({
    transform: 'scale3d(0.9, 0.9, 0.9)',
    offset: 0.5
  }),
  style({
    transform: 'scale3d(0.3, 0.3, 0.3)',
    opacity: 0,
    offset: 1
  })
];

export const flipOutY = [
  style({ transform: 'perspective(400px)', offset: 0 }),
  style({
    transform: 'perspective(400px) rotate3d(0, 1, 0, -15deg)',
    opacity: 1,
    offset: 0.33
  }),
  style({
    transform: 'perspective(400px) rotate3d(0, 1, 0, 90deg)',
    opacity: 0,
    offset: 0.9
  })
];

export const zoomOut = [
  style({
    opacity: 1,
    offset: 0
  }),
  style({
    offset: 0.5,
    transform: 'scale3d(0.3, 0.3, 0.3)',
    opacity: 0
  }),
  style({
    offset: 1,
    opacity: 0
  })
];

export const zoomOutRotate = [
  style({
    opacity: 1,
    offset: 0
  }),
  style({
    offset: 0.9,
    transform: 'rotate(200deg) scale(0.1)',
    opacity: 0
  })
];

export const slideOutUp = [
  style({ transform: 'translate3d(0, 0, 0)', offset: 0 }),
  style({ transform: 'translate3d(0, -100%, 0)', opacity: 0, offset: 1 })
];

export const slideOutDown = [
  style({ transform: 'translate3d(0, 0, 0)', offset: 0 }),
  style({ transform: 'translate3d(0, 100%, 0)', opacity: 0, offset: 1 })
];

export const slideOutLeft = [
  style({ transform: 'translate3d(0, 0, 0)', offset: 0 }),
  style({ transform: 'translate3d(-100%, 0, 0)', opacity: 0, offset: 1 })
];

export const slideOutRight = [
  style({ transform: 'translate3d(0, 0, 0)', offset: 0 }),
  style({ transform: 'translate3d(100%, 0, 0)', opacity: 0, offset: 1 })
];

// motion

export const wobble = [
  style({
    transform: 'translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg)',
    offset: 0.15
  }),
  style({
    transform: 'translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg)',
    offset: 0.3
  }),
  style({
    transform: 'translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg)',
    offset: 0.45
  }),
  style({
    transform: 'translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg)',
    offset: 0.6
  }),
  style({
    transform: 'translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg)',
    offset: 0.75
  }),
  style({ transform: 'none', offset: 1 })
];
