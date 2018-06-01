import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HqButtonComponent } from './hq-button/hq-button.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HqButtonComponent],
  exports: [HqButtonComponent]
})
export class HqButtonModule { }
