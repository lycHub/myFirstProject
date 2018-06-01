import {Component, forwardRef, HostBinding, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'hq-checkbox-group',
  template: `<ng-template [ngIf]="_type === 'checkbox'">
    <hq-checkbox *ngFor="let option of _options"
                 (click)="onClick(option)"
                 [hqChecked]="option.checked"
                 [hqDisabled]="option.disabled || hqDisabled">
      <span [class.disabled]="option.disabled || hqDisabled">{{option.label}}</span>
    </hq-checkbox>
  </ng-template>

  <ng-template [ngIf]="_type === 'checkbox-btn'">
    <hq-checkbox-btn *ngFor="let option of _options"
                     [style.width]="hqBtnWidth"
                     (click)="onClick(option)"
                     [hqChecked]="option.checked"
                     [hqDisabled]="option.disabled || hqDisabled">
      <span>{{option.label}}</span>
    </hq-checkbox-btn>
  </ng-template>`,
  styles: ['.host{display: flex;}'],
  providers    : [
    {
      provide    : NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HqCheckboxGroupComponent),
      multi      : true
    }
  ]
})
export class HqCheckboxGroupComponent implements OnInit, ControlValueAccessor {
  _disabled = false;
  _options: any[];
  _type = 'checkbox';

  // 如果type === btn,控制btn的width
  @Input() hqBtnWidth = '30%';

  @Input()
  set hqDisabled(value: boolean) {
    this._disabled = value;
  }

  get hqDisabled(): boolean {
    return this._disabled;
  }

  @Input()
  set hqType(type: string) {
    this._type = type;
  }

  @HostBinding('class.host') flag = true;

  // ngModel Access
  onChange: any = Function.prototype;
  onTouched: any = Function.prototype;


  constructor() { }

  ngOnInit() {}

  onClick(option) {
    this._options.map(item => {
      if (item.value === option.value) item.checked = !item.checked;
    })
    this.onChange(this._options);
  }

  writeValue(value: any): void {
    this._options = value;
  }

  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }
}
