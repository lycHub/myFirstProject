import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HqSpinComponent } from './hq-spin/hq-spin.component';
import {HqOverlayModule} from '../hq-overlay/hq-overlay.module';

@NgModule({
  imports: [
    CommonModule,
    HqOverlayModule
  ],
  declarations: [HqSpinComponent],
  exports: [HqSpinComponent]
})
export class HqSpinModule { }
