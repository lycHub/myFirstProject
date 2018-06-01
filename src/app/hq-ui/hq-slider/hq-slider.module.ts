import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HqSliderService} from "./hq-slider.service";
import {HqSliderComponent} from "./hq-slider.component";
import {HqSliderTrackComponent} from "./hq-slider-track.component";
import {HqSliderStepComponent} from "./hq-slider-step.component";
import {HqSliderMarksComponent} from "./hq-slider-marks.component";
import {HqSliderHandleComponent} from "./hq-slider-handle.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HqSliderComponent,
    HqSliderTrackComponent,
    HqSliderStepComponent,
    HqSliderMarksComponent,
    HqSliderHandleComponent
  ],
  exports: [
    HqSliderComponent,
    HqSliderTrackComponent,
    HqSliderStepComponent,
    HqSliderMarksComponent,
    HqSliderHandleComponent
  ],
  providers: [HqSliderService]
})
export class HqSliderModule { }
