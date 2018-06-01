import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HqInputComponent } from './hq-input/hq-input.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [HqInputComponent],
  exports: [FormsModule, HqInputComponent]
})
export class HqInputModule { }
