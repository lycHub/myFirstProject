import {Component, Inject, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {SingleCar} from '../../car/carlist/carlist.component';
import {Router} from '@angular/router';
import {Branch} from '../../service/company/branch-list.service';
import {FormGroup} from '@angular/forms';
import {PlaceOrderService} from '../../service/order/place-order.service';
import {Country} from "../../service/area/area-interface";
import {DOCUMENT} from "@angular/common";

enum ErrorMsg {
  'driver_name' = '请填写驾驶人姓名',
  'name_en' = '请填写驾驶人英文名',
  'birth' = '请填写出生年月',
  'name' = '请填写联系人姓名',
  'tel' = '请填写正确的手机号',
  'email' = '请填写正确的邮箱'
}

/*节假日附加费或超市费*/
enum addReturnFee {
  'weekend' = '周末附加费',
  'holiday' = '节假日附加费'
}

@Component({
  selector: 'app-footer-order',
  templateUrl: './footer-order.component.html',
  styleUrls: ['./footer-order.component.scss']
})
export class FooterOrderComponent implements OnChanges, OnDestroy {
// 控制明细弹窗
  showPriceListDialog = false;

  // 控制加载中
  showLoading = false;

  // 接收定金说明
  @Input() country: Country;

  // 接收当前车辆信息
  @Input() car_info: SingleCar;

  // 总价格
  @Input() allPrice: number;

  // 用户选择的套包
  @Input() user_packages;

  // 套包总价
  package_price: number;

  // 取车行信息
  @Input() pick_branch: Branch;

  // 下一步页面类型(写订单或支付)
  @Input() nextPageType = 'order';

  // 如果下一步是支付，接收订单数据
  @Input() formModel: FormGroup;

  // 搜索信息
  @Input() search_data;

  private doc: Document;

  constructor(@Inject(DOCUMENT) doc: any, private router: Router, private place_order$: PlaceOrderService) {
    this.doc = doc;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.search_data);
    // if (changes['search_data']) {
    //   console.log(changes['search_data'].currentValue.price_list);
    // }

    if (this.user_packages.length > 0) {
      // console.log(this.user_packages);
      this.package_price = 0;
      this.user_packages.forEach(pack => {
        this.package_price += pack.price * pack.count;
      });
    }
     // console.log(this.car_info);
  }

  // 前往下单或支付
  ording(type): void {

    const orderData = {
      pick_branch: this.pick_branch,
      packages: this.user_packages,
      totalPrice: this.allPrice
    };

    // 如果有token,就下单或支付，否则进入手机登录
    const token = window.sessionStorage.getItem('token');
    if (token) {
      switch (type) {
        case 'order': // 填订单
          window.sessionStorage.setItem('order_data_car', JSON.stringify(orderData));
          this.router.navigate(['/write-order']);
          break;
        default:  // 支付
          const needValid = ['driver_name', 'name_en', 'birth', 'name', 'tel', 'email'];

          // 保存出错的字段
          let errorItem;
          needValid.forEach(item => {
            if (this.formModel.get(item).invalid)  errorItem = ErrorMsg[item];
          })
          if (!errorItem) { // 没有错误字段，即验证成功
            this.showLoading = true;

            // 取车时间
            const time = {pickupTime: null, dropoffTime: null};

            if (this.country.id === 1) { // 国内
              [time.pickupTime, time.dropoffTime] = [this.search_data.pickupTime, this.search_data.dropoffTime];
            }else {
              [time.pickupTime, time.dropoffTime] = [this.formModel.get('time').value.beginTime, this.formModel.get('time').value.endTime];
            }

            const order_data = {
              base_price: null,
              birth: null,
              tel: null,
              email: null,
              first_name: null,
              last_name: null,
              company_package: null,
              adult: null,
              children: null,
              elder: null,
              user_request: null,
              start_date: null,
              end_date: null,
              company: null,
              name: null,
              driver_name: null,
              pick_branch: null,
              drop_branch: null,
              flight_no: null,
              flight_time: null,
              amount: null,
              vehicle: null,
              own_package: null,
              total: null
            };

            [
              order_data.base_price,
              order_data.birth,
              order_data.tel,
              order_data.email,
              order_data.first_name,
              order_data.last_name,
              order_data.company_package,
              order_data.adult,
              order_data.children,
              order_data.elder,
              order_data.user_request,
              order_data.start_date,
              order_data.end_date,
              order_data.company,
              order_data.name,    // 联系人名称
              order_data.driver_name,
              order_data.pick_branch,
              order_data.drop_branch,
              order_data.flight_no,
              order_data.flight_time,
              order_data.amount,
              order_data.vehicle,
              order_data.own_package,
              order_data.total
            ] = [
              JSON.stringify(this.car_info.price_list),
              this.formModel.get('birth').value + '-1',
              this.formModel.get('tel').value,
              this.formModel.get('email').value,
              this.formModel.get('name_en').value.first,
              this.formModel.get('name_en').value.last,
              JSON.stringify(this.user_packages),
              this.formModel.get('memberInfo').value.adult,
              this.formModel.get('memberInfo').value.children,
              this.formModel.get('memberInfo').value.elder,
              this.formModel.get('user_request').value ? this.formModel.get('user_request').value : '',
              this.search_data.beginDate + ' ' + time.pickupTime,
              this.search_data.endDate + ' ' + time.dropoffTime,
              this.car_info.car.company,
              this.formModel.get('name').value,
              this.formModel.get('driver_name').value,
              this.car_info.pick_branch_id,
              this.car_info.drop_branch_id,
              this.formModel.get('flight').value.flightNo ? this.formModel.get('flight').value.flightNo : '',
              this.formModel.get('flight').value.flightDate ? this.formModel.get('flight').value.flightDate : null,
              1,       // 车数量
              this.car_info.car.id,
              '1',    // 自营包
              Number.parseFloat(this.allPrice.toFixed(1))
            ];

            // console.log(order_data);
            this.place_order$.place_order(order_data).subscribe(res => {
              // console.log(res);
              const res_data = {
                id: res.id,
                order_no: res.order_no,
                order_status: res.order_status,
                vehicle_status: res.vehicle_status,
                total: res.total,
                discount: res.discount,
                currency_symbol: this.car_info.currency_symbol
              }
              // console.log(res_data);
              window.sessionStorage.setItem('order_car_res', JSON.stringify(res_data));
              this.router.navigate(['/pay-method']);
            }, error => console.log(error));
          }else {
            alert(errorItem);
          }
          break;
      }
    }else {
      window.sessionStorage.setItem('order_data_car', JSON.stringify(orderData));
      this.router.navigate(['/login-phone', {loginTo: type, from: '/car-detail/' + this.car_info.car.id}]);
    }
  }

  ngOnDestroy(): void {
    this.showLoading = false;
    this.doc.body.style.overflowY = this.doc.documentElement.style.overflowY = 'auto';
  }
}
