import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HqSelectComponent} from './hq-select.component';
import {HqOverlayModule} from '../hq-overlay/hq-overlay.module';

@NgModule({
  imports: [
    CommonModule,
    HqOverlayModule
  ],
  declarations: [HqSelectComponent],
  exports: [HqSelectComponent]
})
export class HqSelectModule { }
