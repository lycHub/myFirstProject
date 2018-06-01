import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ConvertPinyin} from '../../util/pinyin';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {validPhone} from '../../util/validator';
import {Country} from "../../service/area/area-interface";



@Component({
  selector: 'app-write-order',
  templateUrl: './write-order.component.html',
  styleUrls: ['./write-order.component.scss']
})
export class WriteOrderComponent implements OnInit {
  // 国家
  country: Country;

  // 搜索信息
  search_data;

  // 车辆信息
  car_branch_info;

  // 订单信息
  order_data;

  // 英文名
  name_en = ['', ''];

  // 国内可选时间
  timeOptions = [];

  formModel: FormGroup;

  constructor(private routeInfo: ActivatedRoute, private fb: FormBuilder) {
    this.routeInfo.data.subscribe(data => {
      [this.country, this.search_data, this.car_branch_info, this.order_data] = [data.order.country, data.order.searchData, data.order.car_branch_info, data.order.order_data];
    });

    this.formModel = this.fb.group({
      driver_name: ['', Validators.required],
      name_en: this.fb.group({
        first: [this.name_en[0], Validators.required],
        last: [this.name_en[1], Validators.required]
      }),
      birth: ['', Validators.required],
      name: ['', Validators.required],
      tel: [null, validPhone],
      email: ['', Validators.email],
      memberInfo: this.fb.group({
        children: [0],
        adult: [2],
        elder: [0]
      }),
      time: this.fb.group({
        beginTime: ['14:00', Validators.required],
        endTime: ['9:00', Validators.required]
      }),
      flight: this.fb.group({
        flightNo: [],
        flightDate: []
      }),
      user_request: []
    });
  }

  ngOnInit(): void {
    for (let time = 8; time <= 20; time++) {
      this.timeOptions.push({
        label: time + ':00',
        value: time + ':00'
      });
    }
  }


  onBlur(evt) {
    const name_en_arr = ConvertPinyin(evt.target.value);
    if (name_en_arr.length === 2) this.name_en = name_en_arr;
  }
}
