import { Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import {toBoolean} from "../../util/public_fn";

@Component({
  selector     : 'hq-slider-track',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <div [class]="hqClassName" [ngStyle]="style"></div>
  `
})
export class HqSliderTrackComponent implements OnChanges {
  private _vertical = false;
  private _included = false;

  // Dynamic properties
  @Input() hqOffset;
  @Input() hqLength;

  // Static properties
  @Input() hqClassName;

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

  style: { bottom?: string, height?: string, left?: string, width?: string, visibility?: string } = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hqIncluded) {
      this.style.visibility = this.hqIncluded ? 'visible' : 'hidden';
    }
    if (changes.hqVertical || changes.hqOffset || changes.hqLength) {
      if (this.hqVertical) {
        this.style.bottom = `${this.hqOffset}%`;
        this.style.height = `${this.hqLength}%`;
      } else {
        this.style.left = `${this.hqOffset}%`;
        this.style.width = `${this.hqLength}%`;
      }
    }
  }

}
