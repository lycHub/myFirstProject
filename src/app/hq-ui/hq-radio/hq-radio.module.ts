import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HqRadioComponent } from './hq-radio/hq-radio.component';
import {FormsModule} from "@angular/forms";
import { HqRadioGroupComponent } from './hq-radio-group/hq-radio-group.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [HqRadioComponent, HqRadioGroupComponent],
  exports: [HqRadioComponent, HqRadioGroupComponent]
})
export class HqRadioModule { }
