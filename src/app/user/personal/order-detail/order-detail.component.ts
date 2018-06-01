import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  // 订单信息
  order_data;

  // 套包信息
  packages;

  constructor(private routeInfo: ActivatedRoute) {

  }

  ngOnInit() {
    this.routeInfo.data.subscribe(data => {
      this.order_data = {
        searchInfo: data.order.data.searchInfo,
        carInfo: data.order.car,
        pick_branch: data.order.data.pick_branch,
        order_car_res: data.order.order_detail
      };
      this.packages = JSON.parse(this.order_data.order_car_res.company_package);
    });
  }
}
