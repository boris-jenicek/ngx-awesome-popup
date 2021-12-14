import {
  animate,
  animateChild,
  AnimationTriggerMetadata,
  query,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

export function fadeInOut(): AnimationTriggerMetadata {
  return trigger('fadeInOut', [
    state(
      'open',
      style({
        opacity: 1
      })
    ),
    state(
      'close-fast',
      style({
        opacity: 0
      })
    ),
    state(
      'close-instant',
      style({
        opacity: 0
      })
    ),
    transition('* => close-fast', [query('*', [animateChild()]), animate('{{closeDelay}}')]),
    transition('* => open', [animate(100)]),
    transition('* => close-instant', [animate(0)])
  ]);
}
