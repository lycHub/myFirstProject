import {AfterViewInit, Component, forwardRef, QueryList, ViewChildren} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {HqInputComponent} from '../../../hq-ui/hq-input/hq-input/hq-input.component';

@Component({
  selector: 'app-code-control',
  template: `<div class="code">
    <hq-input [hqType]="'number'" [hqAlign]="'center'" *ngFor="let code of codeControlStatus; let x = index;" [hqValue]="code.value" [hqAutoFocus]="x === 0" (hqModelChange)="onInput($event, x)"></hq-input>
  </div>`,
  styleUrls: ['./code-control.component.scss'],
  providers    : [
    {
      provide    : NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CodeControlComponent),
      multi      : true
    }
  ]
})
export class CodeControlComponent implements ControlValueAccessor, AfterViewInit {
// 验证码输入控件状态
  codeControlStatus = [{
    focus: false,
    value: null
  }, {
    focus: false,
    value: null
  }, {
    focus: false,
    value: null
  }, {
    focus: false,
    value: null
  }, {
    focus: false,
    value: null
  }, {
    focus: false,
    value: null
  }];

  _value: string;


  @ViewChildren(HqInputComponent) slideContents: QueryList<HqInputComponent>;

  // ngModel Access
  onChange: (value: string) => void = () => null;
  onTouched: () => void = () => null;
  constructor() { }

  ngAfterViewInit(): void {

  }

  // 输入验证码
  onInput(evt, index: number) {
    // console.log(this.slideContents['_results']);
    const reg = /^\d{1}$/;
    if (!reg.test(evt)) evt = null;

      this.codeControlStatus[index].value = evt;

    const spaceIndex = this.codeControlStatus.findIndex(item => !item.value && item.value !== 0);

      if (evt) {
        if (spaceIndex !== -1) {  // 还有没填的
          if (index < this.codeControlStatus.length - 1) {    // 如果不是最后一个，下一个focus=true,其他的false
            this.slideContents['_results'][index + 1].inputEl.nativeElement.focus();
          }else {
            this.slideContents['_results'][spaceIndex].inputEl.nativeElement.focus();
          }
        }
      }


    let codeResult = '';
    this.codeControlStatus.forEach(item => {
      if (item.value) codeResult += item.value;
    });
    this.onChange(codeResult);
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
