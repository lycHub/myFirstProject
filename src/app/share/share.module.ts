import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectAreaComponent } from './select-area/select-area.component';
import { AreaListComponent } from './select-area/area-list/area-list.component';
import {CityItemComponent} from "./select-area/area-list/city-item/city-item.component";
import { SelectDateComponent } from './select-date/select-date.component';
import {HqUiModule} from "../hq-ui/hq-ui.module";
import { CalendarComponent } from './select-date/calendar/calendar.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SearchCarComponent} from "./search-car/search-car.component";
import { SearchInfoComponent } from './search-info/search-info.component';
import { TitleLineComponent } from './title-line/title-line.component';
import { FooterOrderComponent } from './footer-order/footer-order.component';
import { SearchInfoMidComponent } from './search-info/search-info-mid/search-info-mid.component';
import {RouterModule} from '@angular/router';
import { SearchFormComponent } from './search-form/search-form.component';
import {SafeHtmlPipe} from "./pipes/safeHtml";
import { AreasComponent } from './select-area/area-list/areas/areas.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HqUiModule
  ],
  declarations: [
    SearchCarComponent,
    SelectAreaComponent,
    AreaListComponent,
    CityItemComponent,
    SelectDateComponent,
    CalendarComponent,
    SearchInfoComponent,
    TitleLineComponent,
    FooterOrderComponent,
    SearchInfoMidComponent,
    SearchFormComponent,
    SafeHtmlPipe,
    AreasComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HqUiModule,
    SearchCarComponent,
    SelectAreaComponent,
    AreaListComponent,
    CityItemComponent,
    SelectDateComponent,
    CalendarComponent,
    SearchInfoComponent,
    TitleLineComponent,
    FooterOrderComponent,
    SearchInfoMidComponent,
    SearchFormComponent,
    AreasComponent,
    SafeHtmlPipe
  ]
})
export class ShareModule { }
