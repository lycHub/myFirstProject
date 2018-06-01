import {Component, forwardRef, HostListener, Input, OnInit, Optional} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {toBoolean} from "../../../util/public_fn";
import {HqRadioGroupComponent} from "../hq-radio-group/hq-radio-group.component";

@Component({
  selector: 'hq-radio',
  templateUrl: './hq-radio.component.html',
  styleUrls: ['./hq-radio.component.scss'],
  providers    : [
    {
      provide    : NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HqRadioComponent),
      multi      : true
    }
  ]
})
export class HqRadioComponent implements OnInit, ControlValueAccessor {
  _value: string;
  _checked = false;
  _disabled = false;

  @Input() hqLabel: string;
  @Input()
  set hqDisabled(value: boolean) {
    this._disabled = toBoolean(value);
  }

  get hqDisabled(): boolean {
    return this._disabled;
  }


  @Input()
  set hqChecked(value: boolean) {
    this._checked = toBoolean(value);
  }

  get hqChecked(): boolean {
    return this._checked;
  }


  @Input()
  set hqValue(value: string) {
    if (this._value === value) {
      return;
    }
    this._value = value;
  }

  get hqValue(): string {
    return this._value;
  }


  @HostListener('click', [ '$event' ]) onClick(e: MouseEvent): void {
    e.preventDefault();
    if (!this._disabled) {
      if (this._hqRadioGroup) {
        this._checked = true;
        this._hqRadioGroup.selectRadio(this);
      } else {
        this.updateValue(!this._checked);
      }
    }
  }

  // ngModel Access
  onChange: (_: boolean) => void = () => null;
  onTouched: () => void = () => null;

  constructor(@Optional() private _hqRadioGroup: HqRadioGroupComponent) { }

  ngOnInit() {
    if (this._hqRadioGroup) this._hqRadioGroup.addRadio(this);
  }

  updateValue(value: boolean): void {
    if (value === this._checked) {
      return;
    }
    this.onChange(value);
    this._checked = value;
  }


  writeValue(value: boolean): void {
    this._checked = value;
  }

  registerOnChange(fn: (_: boolean) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }
}
