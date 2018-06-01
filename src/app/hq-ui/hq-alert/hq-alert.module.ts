import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HqAlertComponent } from './hq-alert/hq-alert.component';
import {HqOverlayModule} from '../hq-overlay/hq-overlay.module';

@NgModule({
  imports: [
    CommonModule,
    HqOverlayModule
  ],
  declarations: [HqAlertComponent],
  exports: [HqAlertComponent]
})
export class HqAlertModule { }
