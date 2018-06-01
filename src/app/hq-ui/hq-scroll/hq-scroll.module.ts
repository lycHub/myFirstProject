import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HqScrollComponent} from "./hq-scroll/hq-scroll.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HqScrollComponent],
  exports: [HqScrollComponent]
})
export class HqScrollModule { }
