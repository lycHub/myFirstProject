import {Component, Inject, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-order-brief',
  templateUrl: './order-brief.component.html',
  styleUrls: ['./order-brief.component.scss']
})
export class OrderBriefComponent implements OnInit, OnDestroy, OnChanges {
  // 是否显示订单状态
  @Input() showOrderStatus = true;

  // 控制加载中（支付页）
  showLoading = {
    pay: false,
    order_detail: false
  }

  // 防止多次提交
  disabled = true;

  // 订单信息
  @Input() order_data;

  // 订单状态
  order_status: string;

  private doc: Document;
  constructor(private router: Router, @Inject(DOCUMENT) doc: any) {
    this.doc = doc;
  }

  ngOnInit() {
    // console.log(this.order_data.order_car_res);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['order_data']) this.order_status = changes['order_data'].currentValue.order_car_res.order_status;
  }

  // 进入订单详情
  orderDetail() {
    // 详情页所需数据

    if (this.order_data) {
      this.showLoading.order_detail = true;
      const order_data = {
        pick_branch: this.order_data.pick_branch,
        searchInfo: this.order_data.searchInfo
      }

      window.sessionStorage.setItem('order_data', JSON.stringify(order_data));
      this.router.navigate(['/order-detail/' + this.order_data.order_car_res.id, {car_id: this.order_data.carInfo.id}]);
    }
  }

  // 支付尾款
  pay() {
    if (!this.disabled) return;
    this.disabled = false;
    this.showLoading.pay = true;

    if (this.order_data) {

      window.sessionStorage.setItem('search_data_car', JSON.stringify(this.order_data.searchInfo));
      window.sessionStorage.setItem('car_detail', JSON.stringify({car: this.order_data.carInfo}));
      window.sessionStorage.setItem('order_car_res', JSON.stringify(this.order_data.order_car_res));

      this.disabled = true;
      this.router.navigate(['/pay-method']);
    }
  }

  ngOnDestroy(): void {
    this.showLoading.pay = this.showLoading.order_detail = false;
    this.doc.body.style.overflowY = this.doc.documentElement.style.overflowY = 'auto';
  }
}
