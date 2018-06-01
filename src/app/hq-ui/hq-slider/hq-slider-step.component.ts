import { Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import {MarksArray} from "./hq-slider-marks.component";
import {toBoolean} from "../../util/public_fn";

@Component({
  selector     : 'hq-slider-step',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <div class="{{hqPrefixCls}}-step">
      <span *ngFor="let attr of attrs; trackBy: trackById" [ngClass]="attr.classes" [ngStyle]="attr.style"></span>
    </div>
  `
})
export class HqSliderStepComponent implements OnChanges {
  private _vertical = false;
  private _included = false;

  // Dynamic properties
  @Input() hqLowerBound: number = null;
  @Input() hqUpperBound: number = null;
  @Input() hqMarksArray: MarksArray;

  // Static properties
  @Input() hqPrefixCls: string;

  @Input()
  set hqVertical(value: boolean) { // Required
    this._vertical = toBoolean(value);
  }

  get hqVertical(): boolean {
    return this._vertical;
  }

  @Input()
  set hqIncluded(value: boolean) {
    this._included = toBoolean(value);
  }

  get hqIncluded(): boolean {
    return this._included;
  }

  // TODO: using named interface
  attrs: Array<{ id: number, value: number, offset: number, classes: { [key: string]: boolean }, style: object }>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hqMarksArray) {
      this.buildAttrs();
    }
    if (changes.hqMarksArray || changes.hqLowerBound || changes.hqUpperBound) {
      this.togglePointActive();
    }
  }

  trackById(index: number, attr: { id: number, value: number, offset: number, classes: { [key: string]: boolean }, style: object }): number {
    return attr.id;
  }

  buildAttrs(): void {
    const orient = this.hqVertical ? 'bottom' : 'left';
    const prefixCls = this.hqPrefixCls;
    this.attrs = this.hqMarksArray.map(mark => {
      const { value, offset } = mark;
      return {
        id     : value,
        value,
        offset,
        style  : {
          [orient]: `${offset}%`
        },
        classes: {
          [`${prefixCls}-dot`]       : true,
          [`${prefixCls}-dot-active`]: false
        }
      };
    });
  }

  togglePointActive(): void {
    if (this.attrs && this.hqLowerBound !== null && this.hqUpperBound !== null) {
      this.attrs.forEach(attr => {
        const value    = attr.value;
        const isActive = (!this.hqIncluded && value === this.hqUpperBound) ||
          (this.hqIncluded && value <= this.hqUpperBound && value >= this.hqLowerBound);
        attr.classes[ `${this.hqPrefixCls}-dot-active` ] = isActive;
      });
    }
  }

}
