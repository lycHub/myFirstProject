import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HqBreadcrumbComponent } from './hq-breadcrumb/hq-breadcrumb.component';
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [HqBreadcrumbComponent],
  exports: [HqBreadcrumbComponent]
})
export class HqBreadcrumbModule { }
