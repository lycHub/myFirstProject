import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HqCheckboxComponent } from './hq-checkbox/hq-checkbox.component';
import { HqCheckboxBtnComponent } from './hq-checkbox-btn/hq-checkbox-btn.component';
import { HqCheckboxGroupComponent } from './hq-checkbox-group/hq-checkbox-group.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [HqCheckboxComponent, HqCheckboxBtnComponent, HqCheckboxGroupComponent],
  exports: [HqCheckboxComponent, HqCheckboxBtnComponent, HqCheckboxGroupComponent]
})
export class HqCheckboxModule { }
