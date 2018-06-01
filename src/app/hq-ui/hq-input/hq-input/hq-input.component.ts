import {Component, forwardRef, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewChild, ElementRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {toBoolean} from '../../../util/public_fn';
import {format} from 'date-fns';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'hq-input',
  templateUrl: './hq-input.component.html',
  styleUrls: ['./hq-input.component.scss'],
  providers    : [
    {
      provide    : NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HqInputComponent),
      multi      : true
    }
  ]
})
export class HqInputComponent implements ControlValueAccessor {
  // value用于双向绑定
  _value = null;

  // 输入框标签(label)
  @Input() hqLabel: string;

  // 控制label的显示和颜色
  showLabel = false;
  @Input() hqLabelColor = '#333';

  // placeholder
  @Input() hqPlaceHolder: string;

  // 错误提示
  @Input() hqError = false;

  // 如果hqError = true,接收errorMsg
  @Input() hqErrorMsg: string;

  // 是否只读
  @Input() hqReadOnly = false;

  //是否禁用
  @Input() hqDisabled = false;


  // 控件size
  @Input() hqSize = 'normal';

  //控件type
  @Input() hqType = 'text';

  // 文字text-align
  @Input() hqAlign = 'left';


  @Output() hqFocus: EventEmitter<FocusEvent> = new EventEmitter();
  @Output() hqBlur: EventEmitter<FocusEvent> = new EventEmitter();

  // modelChange事件
  @Output() hqModelChange: EventEmitter<string> = new EventEmitter();

  //是否获得焦点
  _focus = false;

  @Input()
    set hqAutoFocus(value: boolean) {
      this._focus = toBoolean(value);
    }

  get hqAutoFocus(): boolean {
    return this._focus;
  }

  @Input()
  set hqValue(value: string) {
    if ((this._value === value) || ((this._value == null) && (value == null))) {
      return;
    }
    this._value = this.hqType === 'calendar' ? format(value, 'YYYY-M-D') : value;
    if (this._value) {
      this.showLabel = this._value.length > 0;
    }
  }

  get hqValue(): string {
    return this._value;
  }


  //如果hqType是calendar类型，则可以接收周几
  week: string;
  @Input()
    set currentWeek(value: string) {
      if (this.hqType !== 'calendar') {
        return;
      }

      this.week =  value;
    // console.log(this.week);
  }

    get currentWeek(): string{
      return this.week;
    }

    @ViewChild('input') inputEl: ElementRef;


  // ngModel Access
  onChange: (value: string) => void = () => null;
  onTouched: () => void = () => null;

  constructor() {

  }

  _emitFocus(evt: FocusEvent): void {
    this._focus = true;
    this.hqFocus.emit(evt);
  }

  _emitBlur(evt: FocusEvent): void {
    this._focus = false;
    this.hqBlur.emit(evt);
  }
  //value改变事件
  _emitModelChange(evt: string): void {
    this.hqModelChange.emit(evt);
    this.onChange(evt);

    if (this._value) {
      this.showLabel = this._value.length > 0;
    }
  }


  writeValue(value: string): void {
    if (value === this._value) {
      return;
    }
    this._value = value;
    this.showLabel = this._value.length > 0;
  }

  registerOnChange(fn: (_: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
