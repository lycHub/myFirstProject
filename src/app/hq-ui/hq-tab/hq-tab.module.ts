import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HqTabComponent } from './hq-tab/hq-tab.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HqTabComponent],
  exports: [HqTabComponent]
})
export class HqTabModule { }
