/*
enum None {
  NONE = 0
}

enum CustomColors {
  CUSTOM_ONE = 20,
  CUSTOM_TWO = 21,
  CUSTOM_THREE = 22,
  CUSTOM_FOUR = 23,
  CUSTOM_FIVE = 24
}

enum BaseColors {
  SUCCESS = 1,
  INFO = 2,
  WARNING = 3,
  DANGER = 4
}

enum ExtraColors {
  DARK = 5,
  LIGHT = 6,
  PRIMARY = 7,
  SECONDARY = 8
}

enum ButtonExpand {
  LINK = 9
}
*/

export enum DialogLayoutDisplay {
  NONE = 0,
  SUCCESS = 1,
  INFO = 2,
  WARNING = 3,
  DANGER = 4,
  CUSTOM_ONE = 20,
  CUSTOM_TWO = 21,
  CUSTOM_THREE = 22,
  CUSTOM_FOUR = 23,
  CUSTOM_FIVE = 24
}

export enum ButtonLayoutDisplay {
  NONE = 0,
  SUCCESS = 1,
  INFO = 2,
  WARNING = 3,
  DANGER = 4,
  DARK = 5,
  LIGHT = 6,
  PRIMARY = 7,
  SECONDARY = 8,
  LINK = 9,
  CUSTOM_ONE = 20,
  CUSTOM_TWO = 21,
  CUSTOM_THREE = 22,
  CUSTOM_FOUR = 23,
  CUSTOM_FIVE = 24
}

export enum ColorVariance {
  SUCCESS = 1,
  INFO = 2,
  WARNING = 3,
  DANGER = 4,
  DARK = 5,
  LIGHT = 6,
  PRIMARY = 7,
  SECONDARY = 8,
  LINK = 9,
  CUSTOM_ONE = 20,
  CUSTOM_TWO = 21,
  CUSTOM_THREE = 22,
  CUSTOM_FOUR = 23,
  CUSTOM_FIVE = 24
}

export enum AppearanceAnimation {
  NONE = 'noneIn',
  BOUNCE_IN = 'bounceIn',
  SWING = 'swing',
  ZOOM_IN = 'zoomIn',
  ZOOM_IN_ROTATE = 'zoomInRotate',
  ELASTIC = 'elastic',
  JELLO = 'jello',
  FADE_IN = 'fadeIn',
  SLIDE_IN_UP = 'slideInUp',
  SLIDE_IN_DOWN = 'slideInDown',
  SLIDE_IN_LEFT = 'slideInLeft',
  SLIDE_IN_RIGHT = 'slideInRight'
}

export enum DisappearanceAnimation {
  NONE = 'noneOut',
  FADE_OUT = 'fadeOut',
  ZOOM_OUT_WIND = 'zoomOutWind',
  BOUNCE_OUT = 'bounceOut',
  FLIP_OUT = 'flipOutY',
  ZOOM_OUT = 'zoomOut',
  ZOOM_OUT_ROTATE = 'zoomOutRotate',
  SLIDE_OUT_UP = 'slideOutUp',
  SLIDE_OUT_DOWN = 'slideOutDown',
  SLIDE_OUT_LEFT = 'slideOutLeft',
  SLIDE_OUT_RIGHT = 'slideOutRight'
}

export enum MotionBlockAnimation {
  NONE = 0,
  WOBBLE = 'wobble'
}

export type VerticalPosition = 'left' | 'center' | 'right';
