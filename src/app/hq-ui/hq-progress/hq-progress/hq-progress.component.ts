import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'hq-progress',
  template: `<div class="hq-progress">
    <div class="hq-progress-wrapper">
      <div class="hq-progress-inner">
        <div class="hq-progress-bg" [ngStyle]="activeStyle"></div>
      </div>
    </div>
  </div>`,
  styleUrls: ['./hq-progress.component.scss']
})
export class HqProgressComponent implements OnInit {
  activeStyle = {
    width: '0',
    height: '0'
  }

  _value: number;

  @Input()
  set hqValue(value: number) {
    if (this._value === value) return;
    this._value = value;
    if (this._value !== 0) {
      [this.activeStyle.width, this.activeStyle.height] = [this._value + '%', '10px'];
    }else {
      [this.activeStyle.width, this.activeStyle.height] = ['0', '0'];
    }
  }

  get hqValue(): number {
    return this._value;
  }



  constructor() { }

  ngOnInit() {
  }

}
