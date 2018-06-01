import {ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'hq-input-number',
  template: `<div class="hq-input-number" [class.disabled]="hqDisabled || hqReadonly">
    <i (click)="onReduce()"></i>
    <input type="number" class="hq-input"
           [step]="hqStep"
           [disabled]="hqDisabled"
           [readonly]="hqReadonly"
           [max]="max"
           [min]="min"
           [value]="_value"
           [placeholder]="hqPlaceHolder"
           (input)="onInput($event)"
    /><!--[(ngModel)]="_value"-->
    <i (click)="onAdd()"></i>
  </div>`,
  styleUrls: ['./hq-input-number.component.scss'],
  providers    : [
    {
      provide    : NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HqInputNumberComponent),
      multi      : true
    }
  ]
})
export class HqInputNumberComponent implements OnInit, ControlValueAccessor {
  @Input() hqStep = 1;
  @Input() hqDisabled = false;
  @Input() hqReadonly = false;
  @Input() max = 100;
  @Input() min = 0;
  @Input() hqPlaceHolder: string;

  _value: number;

  @Input()
    set hqValue(value: number) {
      this._value = value;
  }

    get hqValue(): number {
      return this._value;
    }

    // 发射新值
  @Output() _emitNewValue: EventEmitter<number> = new EventEmitter();

  // ngModel Access
  onChange: (value: number) => void = () => null;
  onTouched: () => void = () => null;

  constructor() { }

  ngOnInit() {}

  //输入事件
  onInput(evt): void {
    const newValue = Number.parseInt(evt.target.value) > 0 ? Number.parseInt(evt.target.value) : 0;
    if (newValue === this._value) return;

    this._value = newValue;
    this.onChange(newValue);
    this._emitNewValue.emit(this._value);
  }

  //点击-
  onReduce(): void {
    if (this.hqDisabled) return;
    if (this._value > this.min) {
      this._value -= this.hqStep;
      this.onChange(this._value);
      this._emitNewValue.emit(this._value);
    }else {
      return;
    }
  }

  //点击+
  onAdd(): void {
    if (this.hqDisabled) return;
    if (this.max && this._value < this.max) {
      this._value += this.hqStep;
      this.onChange(this._value);
      this._emitNewValue.emit(this._value);
    }else {
      return;
    }
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
