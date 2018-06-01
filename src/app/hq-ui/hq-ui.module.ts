import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HqInputModule} from "./hq-input/hq-input.module";
import {HqSliderModule} from "./hq-slider/hq-slider.module";
import {HqCheckboxModule} from "./hq-checkbox/hq-checkbox.module";
import {HqButtonModule} from "./hq-button/hq-button.module";
import {HqModalModule} from "./hq-modal/hq-modal.module";
import {HqOverlayModule} from './hq-overlay/hq-overlay.module';
import {HqIconModule} from './hq-icon/hq-icon.module';
import {HqTagModule} from './hq-tag/hq-tag.module';
import {HqInputNumberModule} from './hq-input-number/hq-input-number.module';
import {HqRadioModule} from "./hq-radio/hq-radio.module";
import {HqProgressModule} from './hq-progress/hq-progress.module';
import {HqAlertModule} from './hq-alert/hq-alert.module';
import {HqSpinModule} from './hq-spin/hq-spin.module';
import {HqDatepickerModule} from './hq-datepicker/hq-datepicker.module';
import {HqSelectModule} from './hq-select/hq-select.module';
import {HqTabModule} from './hq-tab/hq-tab.module';
import {HqTimepickerModule} from "./hq-timepicker/hq-timepicker.module";
import {HqCollapseModule} from "./hq-collapse/hq-collapse.module";
import {HqBacktopModule} from "./hq-backtop/hq-backtop.module";
import {HqScrollModule} from "./hq-scroll/hq-scroll.module";
import {HqBreadcrumbModule} from "./hq-breadcrumb/hq-breadcrumb.module";
import {HqPaginationModule} from "./hq-pagination/hq-pagination.module";

@NgModule({
  imports: [
    CommonModule,
    HqInputModule,
    HqSliderModule,
    HqCheckboxModule,
    HqButtonModule,
    HqModalModule,
    HqOverlayModule,
    HqIconModule,
    HqTagModule,
    HqInputNumberModule,
    HqRadioModule,
    HqProgressModule,
    HqAlertModule,
    HqSpinModule,
    HqDatepickerModule,
    HqSelectModule,
    HqTabModule,
    HqTimepickerModule,
    HqCollapseModule,
    HqBacktopModule,
    HqScrollModule,
    HqBreadcrumbModule,
    HqPaginationModule
  ],
  exports: [
    CommonModule,
    HqInputModule,
    HqSliderModule,
    HqCheckboxModule,
    HqButtonModule,
    HqModalModule,
    HqOverlayModule,
    HqIconModule,
    HqTagModule,
    HqInputNumberModule,
    HqRadioModule,
    HqProgressModule,
    HqAlertModule,
    HqSpinModule,
    HqDatepickerModule,
    HqSelectModule,
    HqTabModule,
    HqTimepickerModule,
    HqCollapseModule,
    HqBacktopModule,
    HqScrollModule,
    HqBreadcrumbModule,
    HqPaginationModule
  ]
})
export class HqUiModule {}
