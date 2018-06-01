import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HqTimepickerComponent } from './hq-timepicker.component';
import {HqOverlayModule} from "../hq-overlay/hq-overlay.module";

@NgModule({
  imports: [
    CommonModule,
    HqOverlayModule
  ],
  declarations: [HqTimepickerComponent],
  exports: [HqTimepickerComponent]
})
export class HqTimepickerModule { }
