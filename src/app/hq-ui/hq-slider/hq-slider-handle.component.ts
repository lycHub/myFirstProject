import { Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import {HqSliderComponent} from "./hq-slider.component";

@Component({
  selector     : 'hq-slider-handle',
  encapsulation: ViewEncapsulation.None,
  template     : `<div [class]="hqClassName" [ngStyle]="style"></div>`,
  styles: [`.ant-slider-handle{
    position: absolute;
    margin-left: -10px;
    margin-top: -8px;
    width: 20px;
    height: 20px;
    cursor: pointer;
    border-radius: 50%;
    border: 2px solid #88c7f4;
    background-color: #fff;
    -webkit-transition: border-color .3s ease,-webkit-transform .3s cubic-bezier(.18,.89,.32,1.28);
  }`]
})
export class HqSliderHandleComponent implements OnChanges {

  // Static properties
  @Input() hqClassName: string;
  @Input() hqVertical: string;
  @Input() hqOffset: number;
  /*@Input() hqValue: number; // [For tooltip]
   @Input() hqTipFormatter: (value: number) => string; // [For tooltip]
   @Input() set hqActive(value: boolean) { // [For tooltip]
   const show = toBoolean(value);
   if (this.tooltip) {
   if (show) {
   this.tooltip.show();
   } else {
   this.tooltip.hide();
   }
   }
   }*/

  // Locals
  /*  @ViewChild('tooltip') tooltip: hqToolTipComponent; // [For tooltip]
   tooltipTitle: string; // [For tooltip]*/
  style: object = {};

  constructor(private _slider: HqSliderComponent) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hqOffset) {
      this._updateStyle();
    }
    /*if (changes.hqValue) {
     this._updateTooltipTitle(); // [For tooltip]
     this._updateTooltipPosition(); // [For tooltip]
     }*/
  }

  // Hover to toggle tooltip when not dragging
  /* @HostListener('mouseenter', [ '$event' ])
   onMouseEnter($event: MouseEvent): void {
   if (!this._slider.isDragging) {
   this.hqActive = true;
   }
   }
   @HostListener('mouseleave', [ '$event' ])
   onMouseLeave($event: MouseEvent): void {
   if (!this._slider.isDragging) {
   this.hqActive = false;
   }
   }*/

  /*private _updateTooltipTitle(): void { // [For tooltip]
   this.tooltipTitle = this.hqTipFormatter ? this.hqTipFormatter(this.hqValue) : `${this.hqValue}`;
   }

   private _updateTooltipPosition(): void { // [For tooltip]
   if (this.tooltip) {
   window.setTimeout(() => this.tooltip.updatePosition(), 0); // MAY use ngAfterViewChecked? but this will be called so many times.
   }
   }*/

  private _updateStyle(): void {
    this.style[ this.hqVertical ? 'bottom' : 'left' ] = `${this.hqOffset}%`;
  }
}
