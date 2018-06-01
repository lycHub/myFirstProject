import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HqInputNumberComponent } from './hq-input-number/hq-input-number.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [HqInputNumberComponent],
  exports: [HqInputNumberComponent, FormsModule]
})
export class HqInputNumberModule { }
