import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HqDatepickerComponent } from './hq-datepicker/hq-datepicker.component';
import {HqOverlayModule} from '../hq-overlay/hq-overlay.module';
import { HqCalendarComponent } from './hq-calendar/hq-calendar.component';
import { HqMonthComponent } from './hq-month/hq-month.component';
import {HqInputModule} from '../hq-input/hq-input.module';

@NgModule({
  imports: [
    CommonModule,
    HqOverlayModule,
    HqInputModule
  ],
  declarations: [HqDatepickerComponent, HqCalendarComponent, HqMonthComponent],
  exports: [HqDatepickerComponent]
})
export class HqDatepickerModule { }
