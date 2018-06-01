import { NgModule } from '@angular/core';
import {CarRoutingModule} from "./car-routing.module";
import { CarlistComponent } from './carlist/carlist.component';
import {ShareModule} from "../share/share.module";
import { FilterCarComponent } from './carlist/filter-car/filter-car.component';
import { CarConfigsComponent } from './car-configs/car-configs.component';
import { CarBriefComponent } from './car-brief/car-brief.component';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { CarConfigBriefComponent } from './car-config-brief/car-config-brief.component';
import { WriteOrderComponent } from './write-order/write-order.component';
import {LazyLoadImageModule} from 'ng-lazyload-image';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/zip';
import 'rxjs/add/operator/distinctUntilChanged';

@NgModule({
  imports: [
    ShareModule,
    LazyLoadImageModule,
    CarRoutingModule
  ],
  declarations: [CarlistComponent, FilterCarComponent, CarConfigsComponent, CarBriefComponent, CarDetailComponent, CarConfigBriefComponent, WriteOrderComponent]
})
export class CarModule { }
