import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HqBacktopComponent } from './hq-backtop/hq-backtop.component';
import {SCROLL_SERVICE_PROVIDER} from "./hq-backtop.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HqBacktopComponent],
  exports: [HqBacktopComponent],
  providers: [SCROLL_SERVICE_PROVIDER]
})
export class HqBacktopModule { }
