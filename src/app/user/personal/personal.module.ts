import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonCenterComponent } from './person-center/person-center.component';
import {ShareModule} from '../../share/share.module';
import {OrderBriefComponent} from '../public-component-user/order-brief/order-brief.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';

import 'rxjs/add/observable/zip';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import {PersonHeaderComponent} from '../public-component-user/person-header/person-header.component';

@NgModule({
  imports: [
    CommonModule,
    ShareModule
  ],
  declarations: [OrderBriefComponent, PersonCenterComponent, OrderDetailComponent, PersonHeaderComponent]
})
export class PersonalModule { }
