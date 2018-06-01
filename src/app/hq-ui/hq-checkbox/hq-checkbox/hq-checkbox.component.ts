import {ChangeDetectionStrategy, Component, forwardRef, HostListener, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'hq-checkbox',
  template: `
    <label class="ant-checkbox-wrap">
      <span class="ant-checkbox" [class.ant-checkbox-checked]="_checked" [class.ant-checkbox-disabled]="_disabled"></span>
      <input type="checkbox" class="ant-checkbox-input" [ngModel]="hqChecked" [disabled]="_disabled"/>
      <ng-content></ng-content>
    </label>`,
  styleUrls: ['./hq-checkbox.component.scss'],
  providers    : [
    {
      provide    : NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HqCheckboxComponent),
      multi      : true
    }
  ]
})
export class HqCheckboxComponent implements ControlValueAccessor {
  _checked = false;
  _disabled = false;

  @Input()
  set hqChecked(value: boolean) {
    this._checked = value;
  }

  get hqChecked(): boolean {
    return this._checked;
  }

  @Input()
  set hqDisabled(value: boolean) {
    this._disabled = value;
  }

  get hqDisabled(): boolean {
    return this._disabled;
  }

  // ngModel Access
  private onChange: any = Function.prototype;
  private onTouched: any = Function.prototype;

  constructor() { }

  @HostListener('click', [ '$event' ]) onClick(e: MouseEvent): void {
    e.preventDefault();
    if (!this.hqDisabled) {
      this._checked = !this._checked;
      this.onChange(this._checked);
    }
  }

  writeValue(value: any): void {
    // console.log(value);
    this._checked = value;
  }

  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }
}
