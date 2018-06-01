import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HqCollapseComponent } from './hq-collapse/hq-collapse.component';
import { HqCollapsesetComponent } from './hq-collapseset/hq-collapseset.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HqCollapseComponent, HqCollapsesetComponent],
  exports: [HqCollapseComponent, HqCollapsesetComponent]
})
export class HqCollapseModule { }
