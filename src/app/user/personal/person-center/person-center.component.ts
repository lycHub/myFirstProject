import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OrderCarRes} from '../../../service/order/order-cb.model';
import {City} from '../../../service/area/area-interface';
import {differenceInCalendarDays, format} from 'date-fns';
import {Branch} from '../../../service/company/branch-list.service';
import {CarInfoService} from '../../../service/car/car-info/car-info.service';

// 车辆状态
enum VehicleStatus {
  'wait' = '待确认',
  'true' = '确认有车',
  'false' = '确认无车'
}

// 订单状态
enum OrderStatus {
  'deposit' = '待支付',
  'paying' = '付尾款',
  'success' = '已预订',
  'refund' = '已退款',
  'cancel' = '已取消'
}

@Component({
  selector: 'app-person-center',
  templateUrl: './person-center.component.html',
  styleUrls: ['./person-center.component.scss']
})
export class PersonCenterComponent implements OnInit {
  // 手机号
  username: string;

  // 城市列表
  cities: City[];

  // 车行列表
  pick_branchs: Branch[];

  // 订单列表
  order_list: OrderCarRes[];

  // 用于模板的订单列表
  order_list_show = [];

  // 点击返回的目标页路径
  back_path: string;

  constructor(private routeInfo: ActivatedRoute, private car$: CarInfoService) {
    this.back_path = this.routeInfo.snapshot.paramMap.get('source_path') ? this.routeInfo.snapshot.paramMap.get('source_path') : '/main';
    // console.log(this.back_path);
  }

  ngOnInit() {
    this.routeInfo.data.subscribe(data => {
      [this.username, this.cities, this.pick_branchs, this.order_list] = [data.orderList[0], data.orderList[1], data.orderList[2], data.orderList[3]];
      if (this.order_list.length <= 0) return;
      this.order_list.forEach(order => {
        const pick_branch = this.pick_branchs.find(branch => branch.id === order.pick_branch);
        const drop_branch = this.pick_branchs.find(branch => branch.id === order.drop_branch);

        // console.log(this.username);
        // 搜索信息
        const searchInfo = {
          beginCity: this.cities.find(city => city.id === pick_branch.city),
          endCity: this.cities.find(city => city.id === drop_branch.city),
          beginDate: format(order.start_date, 'YYYY/MM/DD'),
          endDate: format(order.end_date, 'YYYY/MM/DD'),
          pickupTime: format(order.start_date, 'hh:mm'),
          dropoffTime: format(order.end_date, 'hh:mm')
          // days: differenceInCalendarDays(order.end_date, order.start_date)
        }

        // 订单信息
        const order_car_res = {
          id: order.id,
          order_no: order.order_no,
          order_status: OrderStatus[order.order_status],
          vehicle_status: VehicleStatus[order.vehicle_status],
          total: order.total,
          discount: order.discount,
          currency_symbol: order.symbol
        }


        // 获取车辆
        this.car$.getCar(order.vehicle).subscribe(car => {
          this.order_list_show.push({
            searchInfo: searchInfo,
            carInfo: car,
            pick_branch: pick_branch,
            order_car_res: order_car_res
          });
          // console.log(this.order_list_show);
        });
      });



      // console.log(this.cities.find(city => city.id === this.pick_branchs.find(branch => branch.id === this.order_list[0].pick_branch)[0].city));
    });
  }

}
