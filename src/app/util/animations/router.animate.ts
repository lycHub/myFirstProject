import {animate, state, style, transition, trigger} from '@angular/animations';

export const slideToRight = trigger('routeAnim', [
  state('void', style({'position': 'fixed', 'width': '100%', 'height': '100%', 'top': 0, 'overflow-y': 'auto', 'background-color': '#fff'})),
  state('*', style({'position': 'fixed', 'width': '100%', 'height': '100%', 'top': 0, 'overflow-y': 'auto', 'background-color': '#fff'})),
  transition(':enter', [
    style({transform: 'translateX(-100%)'}),
    animate('.3s ease-in-out', style({transform: 'translateX(0)'}))
  ]),
  transition(':leave', [
    style({transform: 'translateX(0)'}),
    animate('.3s ease-in-out', style({transform: 'translateX(100%)'}))
  ])
]);
