import {Component, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {HqRadioComponent} from "../hq-radio/hq-radio.component";

@Component({
  selector: 'hq-radio-group',
  template: '<ng-content></ng-content>',
  styles: [],
  providers    : [
    {
      provide    : NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HqRadioGroupComponent),
      multi      : true
    }
  ]
})
export class HqRadioGroupComponent implements ControlValueAccessor {
  _value: string;

  radios: Array<HqRadioComponent> = [];

  // ngModel Access
  onChange: (_: string) => void = () => null;
  onTouched: () => void = () => null;
  constructor() { }

  addRadio(radio: HqRadioComponent): void {
    this.radios.push(radio);
    radio.hqChecked = radio.hqValue === this._value;
  }

  selectRadio(radio: HqRadioComponent): void {
    this.updateValue(radio.hqValue);
  }

  updateValue(value: string): void {
    if (this._value === value) {
      return;
    }
    this._value = value;
    this.onChange(value);
    this.checkRadios();
  }

  checkRadios(): void {
    this.radios.forEach(item => item.hqChecked = item.hqValue === this._value);
  }


  writeValue(value: string): void {
    this._value = value;
    this.checkRadios();
  }

  registerOnChange(fn: (_: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.radios.forEach(radio => radio.hqDisabled = isDisabled);
  }
}
