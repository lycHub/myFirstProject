import {Component, forwardRef, Inject, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {toBoolean} from '../../../util/public_fn';
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'hq-datepicker',
  template: `<hq-overlay [hqAcitve]="hqShow" (hqClick)="closeDatePicker()"></hq-overlay>
  <hq-input [hqLabel]="hqLabel" [hqLabelColor]="hqLabelColor" [hqPlaceHolder]="hqPlaceHolder" (click)="hqShow = true;" [hqValue]="_value" [hqReadOnly]="true"></hq-input>
  <div class="hqDate" [class.show]="_show">
    <hq-calendar (selectedDay)="selectDate($event)" *ngIf="hqMode === 'day'"></hq-calendar>


    <!--只选年月-->
    <hq-month *ngIf="hqMode === 'month'" (_emitYmData)="selectDate($event)"></hq-month>
  </div>`,
  styleUrls: ['./hq-datepicker.component.scss'],
  providers    : [
    {
      provide    : NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HqDatepickerComponent),
      multi      : true
    }
  ]
})
export class HqDatepickerComponent implements ControlValueAccessor {
  private doc: Document;

  // 输入框各种文字信息
  @Input() hqLabel: string;
  @Input() hqLabelColor = '#8dd3f0';
  @Input() hqPlaceHolder: string;


  // 日期值yyyy-mm-dd用于双向绑定
  _value: string;

  // 日历显示和控制滚动条
  _show: boolean;

  @Input()
  set hqShow(val: boolean) {
    // console.log(val);
    this._show = toBoolean(val);
    if (this._show) this.doc.body.style.overflowY = this.doc.documentElement.style.overflowY = 'hidden';
  }

  get hqShow(): boolean {
    return this._show;
  }

  // 日历模式，month或day
  @Input() hqMode = 'month';

  // ngModel Access
  onChange: (value: string) => void = () => null;
  onTouched: () => void = () => null;

  constructor(@Inject(DOCUMENT) doc: any) {
    this.doc = doc;
  }

  // 选中日期
  selectDate(evt: string): void {
      if (evt === this._value) {
        this.closeDatePicker();
        return;
      }
      this._value = evt;
      this.onChange(evt);
      this.closeDatePicker();
  }

  // 关闭日历
  closeDatePicker(): void {
    this.doc.body.style.overflowY = this.doc.documentElement.style.overflowY = 'auto';
    this._show = false;
  }

  writeValue(value: string): void {
    if (value === this._value) {
      return;
    }
    this._value = value;
  }

  registerOnChange(fn: (_: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
