import {ChangeDetectionStrategy, Component, forwardRef} from '@angular/core';
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {HqCheckboxComponent} from "../hq-checkbox/hq-checkbox.component";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'hq-checkbox-btn',
  template: `
    <label class="ant-checkbox-btn" [class.ant-checkbox-btn-checked]="_checked" [class.ant-checkbox-btn-disabled]="_disabled">
      <ng-content></ng-content>
    </label>`,
  styleUrls: ['./hq-checkbox-btn.component.scss'],
  providers    : [
    {
      provide    : NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HqCheckboxBtnComponent),
      multi      : true
    }
  ]
})
export class HqCheckboxBtnComponent extends HqCheckboxComponent {
  // _checked = false;
  // _disabled = false;
  //
  // @Input()
  // set hqChecked(value: boolean) {
  //   this._checked = value;
  // }
  //
  // get hqChecked(): boolean {
  //   return this._checked;
  // }
  //
  // @Input()
  // set hqDisabled(value: boolean) {
  //   this._disabled = value;
  // }
  //
  // get hqDisabled(): boolean {
  //   return this._disabled;
  // }

  //@HostBinding('class.ant-checkbox-btn-host') flag = true;
}
