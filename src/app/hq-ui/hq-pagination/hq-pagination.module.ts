import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HqPaginationComponent } from './hq-pagination/hq-pagination.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HqPaginationComponent],
  exports: [HqPaginationComponent]
})
export class HqPaginationModule { }
