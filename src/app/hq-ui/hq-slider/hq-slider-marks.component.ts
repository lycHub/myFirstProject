import { Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import {toBoolean} from "../../util/public_fn";

@Component({
  selector     : 'hq-slider-marks',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <div [class]="hqClassName">
      <span *ngFor="let attr of attrs; trackBy: trackById" [ngClass]="attr.classes" [ngStyle]="attr.style" [innerHTML]="attr.label"></span>
    </div>
  `,
  styles: [`.ant-slider-mark-text{
    position: absolute;
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    cursor: pointer;
    color: rgba(0,0,0,.43);
    top:15px;
  }`]
})
export class HqSliderMarksComponent implements OnChanges {
  private _vertical = false;
  private _included = false;

  // Dynamic properties
  @Input() hqLowerBound: number = null;
  @Input() hqUpperBound: number = null;
  @Input() hqMarksArray: MarksArray;

  // Static properties
  @Input() hqClassName: string;
  @Input() hqMin: number; // Required
  @Input() hqMax: number; // Required
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
  attrs: Array<{ id: number, value: number, offset: number, classes: { [key: string]: boolean }, style: object, label: Mark }>; // points for inner use
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hqMarksArray) {
      this.buildAttrs();
    }
    if (changes.hqMarksArray || changes.hqLowerBound || changes.hqUpperBound) {
      this.togglePointActive();
    }
  }

  trackById(index: number, attr: { id: number, value: number, offset: number, classes: { [key: string]: boolean }, style: object, label: Mark }): number {
    return attr.id;
  }

  buildAttrs(): void {
    const range = this.hqMax - this.hqMin;
    this.attrs = this.hqMarksArray.map(mark => {
      const { value, offset, config } = mark;
      // calc styles
      let label = config;
      let style: object;
      if (this.hqVertical) {
        style = {
          marginBottom: '-50%',
          bottom      : `${(value - this.hqMin) / range * 100}%`
        };
      } else {
        const marksCount = this.hqMarksArray.length;
        const unit       = 100 / (marksCount - 1);
        const markWidth  = unit * 0.9;
        style = {
          width     : `${markWidth}%`,
          marginLeft: `${-markWidth / 2}%`,
          left      : `${(value - this.hqMin) / range * 100}%`
        };
      }
      // custom configuration
      if (typeof config === 'object') {
        label = config.label;
        if (config.style) {
          style = { ...style, ...config.style };
        }
      }
      return {
        id     : value,
        value,
        offset,
        classes: {
          [`${this.hqClassName}-text`]: true
        },
        style,
        label
      };
    }); // END - map
  }

  togglePointActive(): void {
    if (this.attrs && this.hqLowerBound !== null && this.hqUpperBound !== null) {
      this.attrs.forEach(attr => {
        const value    = attr.value;
        const isActive = (!this.hqIncluded && value === this.hqUpperBound) ||
          (this.hqIncluded && value <= this.hqUpperBound && value >= this.hqLowerBound);
        attr.classes[ `${this.hqClassName}-text-active` ] = isActive;
      });
    }
  }

}

// DEFINITIONS
export type Mark = string | {
  style: object;
  label: string;
};

export class Marks {
  number: Mark;
}

// TODO: extends Array could cause unexpected behavior when targeting es5 or below
export class MarksArray extends Array<{ value: number, offset: number, config: Mark }> {
  [index: number]: {
    value: number;
    offset: number;
    config: Mark;
  }
}
