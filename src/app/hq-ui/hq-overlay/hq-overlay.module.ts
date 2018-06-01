import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HqOverlayComponent } from './hq-overlay/hq-overlay.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HqOverlayComponent],
  exports: [HqOverlayComponent]
})
export class HqOverlayModule { }
