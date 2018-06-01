import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HqTagComponent } from './hq-tag/hq-tag.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HqTagComponent],
  exports: [HqTagComponent]
})
export class HqTagModule { }
