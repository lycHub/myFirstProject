import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HqProgressComponent } from './hq-progress/hq-progress.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HqProgressComponent],
  exports: [HqProgressComponent]
})
export class HqProgressModule { }
