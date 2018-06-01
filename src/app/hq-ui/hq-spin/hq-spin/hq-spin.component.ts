import {Component, Input, OnInit} from '@angular/core';
import {toBoolean} from '../../../util/public_fn';

@Component({
  selector: 'hq-spin',
  template: `<hq-overlay [hqAcitve]="_show"></hq-overlay>
  <div class="hq-spin-wrapper"  *ngIf="_show">
    <div class="hq-spin"></div>
    <span class="hq-txt">{{hqTip}}</span>
  </div>
  `,
  styleUrls: ['./hq-spin.component.scss']
})
export class HqSpinComponent implements OnInit {
  _show = false;

  @Input() hqTip: string;

  @Input()
  set hqShow(value: boolean) {
    this._show = toBoolean(value);
    if (this._show) document.body.style.overflowY = document.documentElement.style.overflowY = 'hidden';
  }

  get hqShow(): boolean{
    return this._show;
  }

  constructor() { }

  ngOnInit() {}
}
