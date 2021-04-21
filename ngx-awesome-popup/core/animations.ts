import {animate, state, style, transition, trigger} from '@angular/animations';


export function fadeInOut(_OpacityMin = 0, _OpacityMax = 1) {
    
    return trigger('fadeInOut', [
        // ...
        state('open', style({
            opacity: _OpacityMax
        })),
        state('closed', style({
            opacity: _OpacityMin
        })),
        transition('* => close-fast', [
            animate('0.1s')
        ]),
        transition('* => open', [
            animate('0.2s')
        ]),
        transition('* => close-slow', [
            animate('1.3s')
        ]),
        transition('* => close-instant', [
            animate('0s')
        ])
    ]);
};
