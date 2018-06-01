import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CarlistComponent} from "./carlist/carlist.component";
import {CarDetailComponent} from './car-detail/car-detail.component';
import {WriteOrderComponent} from './write-order/write-order.component';
import {CarListResolver} from './router-guard/carlist-resolve';
import {SearchInfoResolver} from './router-guard/search-info-resolve';
import {AreaResolver} from '../common-resolve/area-resolve';
import {CarDetailResolver} from './router-guard/car-detail-resolve';
import {OrderResolver} from './router-guard/order-car-resolve';

const carRoutes: Routes = [
  {path: '', component: CarlistComponent, data: {title: '搜车结果'}, resolve: {carlist_data: CarListResolver, searchCity: SearchInfoResolver, areas: AreaResolver}},
  {path: 'car-detail/:id', component: CarDetailComponent, data: {title: '车辆详情'}, resolve: {car_detail: CarDetailResolver, carlist_data: CarListResolver, areas: AreaResolver}},
  {path: 'write-order', component: WriteOrderComponent, data: {title: '填写订单'}, resolve: {order: OrderResolver}}
]

@NgModule({
  imports: [RouterModule.forChild(carRoutes)],
  exports: [RouterModule],
  providers: [CarListResolver, SearchInfoResolver, AreaResolver, CarDetailResolver, OrderResolver]
})

export class CarRoutingModule {}
