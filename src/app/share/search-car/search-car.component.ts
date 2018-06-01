import {Component, EventEmitter, HostBinding, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

// 定义搜索数据
export interface SearchCarData {
  beginCity: any;
  beginDate: string | null;
  endDate: string | null;
  endCity: any;
  pickupTime?: string | null;
  dropoffTime?: string | null;
}


@Component({
  selector: 'app-search-car',
  templateUrl: './search-car.component.html',
  styleUrls: ['./search-car.component.scss']
})
export class SearchCarComponent implements OnInit {
  all_area_data;

  tabs = [
     {
       name: '国内租车',
       active: null
     },
     {
       name: '海外租车',
       active: null
     }
   ];

  // 当前激活的tab索引
  currentTabIndex = 0;

  // 是否在国内
  inCountry: boolean;

  // sessiion
  search_car_data: SearchCarData;


  // 作为弹窗需要改变width
  @HostBinding('class.width') @Input() isDialog = false;

  // 是否在carlist页面
  @Input() inCarlist = false;

  // 发送弹窗关闭事件
  @Output() _emitClose: EventEmitter<any> = new EventEmitter();

  constructor(private routeInfo: ActivatedRoute) {
    this.routeInfo.data.subscribe((data: { title: string; areas: any; }) => {
     // console.log(data.areas);
      this.all_area_data = data.areas;

      if (window.sessionStorage.getItem('search_car_data')) {
        this.search_car_data = JSON.parse(window.sessionStorage.getItem('search_car_data'));
        // console.log(this.search_car_data);
        // 确定是否在国内
        this.inCountry = this.all_area_data[1].find(city => city.id === this.search_car_data.beginCity).country === 1;

        this.currentTabIndex = this.inCountry ? 0 : 1;

        this.tabs.map((tab, key, arr) => {
          if (this.inCountry) {
            [arr[0].active, arr[1].active] = [true, false];
          }else {
            [arr[0].active, arr[1].active] = [false, true];
          }
        });
      }else {
        this.inCountry = true;
        [this.tabs[0].active, this.tabs[1].active] = [true, false];
        this.currentTabIndex = 0;
      }
      // console.log(this.currentTabIndex);
    });
  }

  ngOnInit() {}

  // 切换tab
  changeTab(index: number) {
    if (this.currentTabIndex === index) return;
    this.currentTabIndex = index;
    this.inCountry = this.currentTabIndex === 0;
  }
}
