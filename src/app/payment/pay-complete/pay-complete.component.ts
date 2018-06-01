import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FindAreaService} from '../../service/area/find-area.service';
import {differenceInCalendarDays, format} from 'date-fns';
import {SearchCarData} from "../../share/search-car/search-car.component";

@Component({
  selector: 'app-pay-complete',
  templateUrl: './pay-complete.component.html',
  styleUrls: ['./pay-complete.component.scss']
})
export class PayCompleteComponent implements OnInit, OnDestroy {
  // 控制加载中
  showLoading = false;


  //当前进度
  currentProgress = 50;

  //控制进度样式和文字
  progressTxt = [{
    label: '待支付定金',
    value: 20
  }, {
    label: '确认车辆信息',
    value: 50
  }, {
    label: '待支付尾款',
    value: 75
  }, {
    label: '预订成功',
    value: 100
  }]

  // 订单状态
  order_status;

  constructor(private routeInfo: ActivatedRoute, private area$: FindAreaService, private router: Router) { }

  ngOnInit() {
    this.routeInfo.data.subscribe(data => {
      // 长度为3的数组，data.order_status[1]为取车点，data.order_status[2]为还车点
      this.order_status = data.order_status;
      switch (this.order_status[0].status) {
        case 'paying':    // 待支付尾款
          this.currentProgress = 75;
          break;
        case 'success':
          this.currentProgress = 100;
          break;
        default:
          this.currentProgress = 50;
          break;
      }
    });
  }


  // 进入订单详情
  orderDetail() {
    if (this.order_status) {
      this.showLoading = true;
      // 根据取还车点获取起点和终点的城市
      Promise.all([
        this.area$.getCity(this.order_status[1].city),
        this.area$.getCity(this.order_status[2].city)
      ]).then(city => {
        // 搜索信息
        const searchInfo = {
          beginCity: city[0],
          endCity: city[1],
          beginDate: this.order_status[0].start_date,
          endDate: this.order_status[0].end_date
          // days: differenceInCalendarDays(format(this.order_status[0].end_date, 'YYYY/M/D'), format(this.order_status[0].start_date, 'YYYY/M/D'))
        }

        const order_data = {
          pick_branch: this.order_status[1],
          searchInfo: searchInfo
        }

        window.sessionStorage.setItem('order_data', JSON.stringify(order_data));
        this.router.navigate(['/order-detail/' + this.order_status[0].order_id, {car_id: this.order_status[0].car_id}]);
      });
    }
  }

  ngOnDestroy(): void {
    this.showLoading = false;
    document.body.style.overflowY = document.documentElement.style.overflowY = 'auto';
  }
}
