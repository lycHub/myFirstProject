import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'hq-select',
  template: `<hq-overlay [hqAcitve]="showSelectPanel" (hqClick)="showSelectPanel = false;" [hqBackGroundColor]="'transparent'"></hq-overlay>
  <div class="hq-select">
    <div class="hq-select-wrapper">
      <div class="hq-select-input" (click)="showSelectPanel = !showSelectPanel">
        <div class="hq-select-placeholder" [hidden]="_value">{{hqPlaceholder}}</div>
        <div class="hq-select-value" *ngIf="_value">{{_value.label}}</div>
        <div class="hq-select-arrow"></div>
      </div>
    </div>

    <div class="hq-select-list" *ngIf="showSelectPanel">
      <ul>
        <li *ngFor="let item of _options;" [class.selected]="item.selected" [class.multiple]="hqType === 'multiple'" (click)="select(item)">{{item.label}}</li>
      </ul>
    </div>
  </div>
  `,
  styleUrls: ['./hq-select.component.scss'],
  providers    : [
    {
      provide    : NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HqSelectComponent),
      multi      : true
    }
  ]
})
export class HqSelectComponent implements OnInit, ControlValueAccessor {
  // 模式单选或多项
  @Input() hqType = 'default';

  @Input() hqPlaceholder: string;

  // 控制下拉
  showSelectPanel = false;


// 用于双向绑定
  _value;
  _options;


  @Input()
    set hqOptions(options) {
      this._options = options;

      const selected = this._options.find(item => item.selected);
      if (selected) this._value =  selected;
  }



  @Input()
  set hqSelected(value) {
    this._value = this._options.find(item => item.value === value);
    // this._value = value;
    this.selectedClass();
  }

  get hqSelected(): any {
    return this._value;
  }


  // ngModel Access
  private onChange: any = Function.prototype;
  private onTouched: any = Function.prototype;
  constructor() {}

  ngOnInit() {}

  // 点击选择
  select(option): void {
    this._value = option;
    this.selectedClass();
    this.onChange(this._value.value);
    this.showSelectPanel = false;
  }

  // 切换选中样式
  selectedClass(): void {
    if (!this._options) return;
    this._options.map(item => item.selected = item.value === this._value.value);
  }

  writeValue(value: any): void {
    this._value = this._options.find(item => item.value === value);
    if (this._value) this.selectedClass();
  }

  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }
}
