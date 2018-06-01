import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HqModalComponent } from './hq-modal/hq-modal.component';
import {HqOverlayModule} from '../hq-overlay/hq-overlay.module';
import {HqScrollModule} from "../hq-scroll/hq-scroll.module";

@NgModule({
  imports: [
    CommonModule,
    HqOverlayModule,
    HqScrollModule
  ],
  declarations: [HqModalComponent],
  exports: [HqModalComponent]
})
export class HqModalModule { }
