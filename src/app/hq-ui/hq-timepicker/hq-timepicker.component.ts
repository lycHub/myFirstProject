import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {isIncludes} from "../../util/public_fn";

@Component({
  selector: 'hq-timepicker',
  template: `<hq-overlay [hqAcitve]="hqShow" (hqClick)="hqClose.emit(false)"></hq-overlay>

  <div class="hq-time" [class.show]="hqShow">
    <div class="hq-time-wrapper">
      <div class="hq-time-title">{{hqTitle}}</div>
      <table>
        <tbody>
        <tr *ngFor="let month of [[8,9,10],[11,12,13],[14,15,16],[17,18,19], [20]];">
          <td *ngFor="let item of month;" (click)="selectTime(item)" [class.actived]="item === _value" [class.disabled]="hqDisabled && hqDisabled.indexOf(item) !== -1">{{item}}:00</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>`,
  styleUrls: ['./hq-timepicker.component.scss'],
  providers    : [
    {
      provide    : NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HqTimepickerComponent),
      multi      : true
    }
  ]
})
export class HqTimepickerComponent implements OnInit {
  // 用于双向绑定
  _value: number;

  @Input() hqTitle: string;

  @Input() hqDisabled: number[];

  // 组件的显示
  @Input() hqShow = false;

  // 发射关闭事件
  @Output() hqClose: EventEmitter<boolean> = new EventEmitter();

  // ngModel Access
  onChange: (value: number) => void = () => null;
  onTouched: () => void = () => null;
  constructor() {}

  ngOnInit() {}


  // 点击选择时间
  selectTime(time: number): void {
    if ((this.hqDisabled && isIncludes(this.hqDisabled, time))) return;
    if (time === this._value) {
      this.hqClose.emit(false);
      return;
    }
    this._value = time;
    this.onChange(time);
    this.hqClose.emit(false);
  }

  writeValue(value: number): void {
    if (value === this._value) {
      return;
    }
    this._value = value;
  }

  registerOnChange(fn: (_: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
