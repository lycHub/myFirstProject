import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {format, distanceInWordsStrict, addDays, compareDesc} from 'date-fns';
import {SearchCarService} from '../../service/car/search-car/search-car.service';
import {FindAreaService} from '../../service/area/find-area.service';
import {SearchCarData} from "../search-car/search-car.component";
import {isEmptyObj} from "../../util/public_fn";

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit, OnChanges {
  // 是否国内
  @Input() inCountry: boolean;

  // 接收session
  search_car_data: SearchCarData;

  // 控制加载中
  showLoading = false;

  // 是否在carlist页面
  @Input() inCarlist: boolean;


  // 表单数据
  form_data;

  // 所有的area数据
  @Input() all_area_data;

  // 保存取车城市的数据
  // save_beginCity: City;

  // 几天后开始可选(分国内国外)
  startValidate = 3;

  // time双向数据
  timesValue: number[];

  formModel: FormGroup;


  // 发送弹窗关闭事件
  @Output() _emitClose: EventEmitter<any> = new EventEmitter();
  constructor(private fb: FormBuilder, private router: Router, private search_car: SearchCarService, private findArea_serve: FindAreaService) {}

  ngOnInit() {
    // console.log(this.search_car_data);
    // 表单模型
    // console.log(this.form_data);




    // 涉及到国内外切换，就更新一下时间
   /* this.formModel.get('selectedArea').valueChanges.subscribe(res => {
      const hisBeginCountry = this.save_beginCity.country;                        // 上一次的countryId
      this.save_beginCity = this.all_area_data[1].find(item => item.id === res[0]);     // 新的countryId
      this.startValidate = this.save_beginCity.country === 1 ? 3 : 7;

      if ((hisBeginCountry === 1 && this.save_beginCity.country !== 1) || (hisBeginCountry !== 1 && this.save_beginCity.country === 1)) {
        this.update_date_info(this.startValidate);
        this.formModel.get('selectedDate').patchValue(this.form_data.date_info);
      }
    });*/
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.search_car_data);
    let tempFormData = null;
    if (!tempFormData) {
      const initAreaInfo = this.inCountry ? [96, 96] : [170, 170];

      tempFormData = {
        area_info: initAreaInfo,
        date_info: {
          beginDate: null,
          endDate: null
        }
      }
    }

    if (!this.formModel) {
      this.formModel = this.fb.group({
        selectedArea: [tempFormData.area_info, Validators.required],
        selectedDate: [tempFormData.date_info, Validators.required]
      });
    }

    if (changes['inCountry']) {
        // 获取session
      if (window.sessionStorage.getItem('search_car_data')) {
        this.search_car_data = JSON.parse(window.sessionStorage.getItem('search_car_data'));
        // console.log(this.search_car_data);

        // 判断session是否在国内
          const sessionInCountry = this.all_area_data[1].find(city => city.id === this.search_car_data.beginCity).country === 1;

          if (changes['inCountry'].currentValue !== sessionInCountry) {   // 有切换不同的tab，强行改变
            // console.log(1);
            tempFormData.area_info = changes['inCountry'].currentValue ? [96, 96] : [170, 170];

            this.startValidate = changes['inCountry'].currentValue ? 3 : 7;
            this.update_date_info(this.startValidate, null, {beginDate: this.search_car_data.beginDate, endDate: this.search_car_data.endDate});

            if (!this.form_data.date_info.beginDate && !this.form_data.date_info.endDate) {
              [this.form_data.date_info.beginDate, this.form_data.date_info.endDate] = [format(this.search_car_data.beginDate, 'YYYY/M/D'), format(this.search_car_data.endDate, 'YYYY/M/D')];
            }

            this.formModel.get('selectedDate').patchValue(this.form_data.date_info);
            // this.update_date_info(this.startValidate, null, {beginDate: this.search_car_data.beginDate, endDate: this.search_car_data.endDate});
            // console.log(this.form_data.date_info);

          }else {
            // console.log(2);
            tempFormData.area_info = [this.search_car_data.beginCity, this.search_car_data.endCity];
            [tempFormData.date_info.beginDate, tempFormData.date_info.endDate] = [format(this.search_car_data.beginDate, 'YYYY/M/D'), format(this.search_car_data.endDate, 'YYYY/M/D')];
            this.startValidate = changes['inCountry'].currentValue ? 3 : 7;
            this.formModel.get('selectedDate').patchValue(tempFormData.date_info);
          }

       // console.log(this.formModel.get('selectedDate').value);

        this.timesValue = [Number.parseInt(this.search_car_data.pickupTime.split(':')[0]), Number.parseInt(this.search_car_data.dropoffTime.split(':')[0])];

          // this.save_beginCity = this.all_area_data[1].find(item => item.id === tempFormData.area_info[0]);    // 取车城市信息
          this.form_data = tempFormData;
        }else {
          this.form_data = tempFormData;
          this.timesValue = [10, 10];
         // this.save_beginCity = this.all_area_data[1].find(item => item.id === initAreaInfo[0]);    // 取车城市信息
          this.startValidate = this.inCountry ? 3 : 7;
          this.update_date_info(this.startValidate, 'init');
          this.formModel.get('selectedDate').patchValue(this.form_data.date_info);
        }

      // console.log(this.form_data);
      this.formModel.get('selectedArea').patchValue(this.form_data.area_info);
      // console.log(this.formModel.get('selectedDate').value);
    }
  }


  // 更新date_info并限制日历可选日期
  update_date_info(days: number, type?: string, date_info?: any) {
    if (type && type === 'init') {
      [this.form_data.date_info.beginDate, this.form_data.date_info.endDate] = [
        format(addDays(Date.now(), days), 'YYYY/M/D'),
        format(addDays(Date.now(), days + 7), 'YYYY/M/D')
      ];
    }else {
      // 出发日期和当前日期的差值
      const distance = Number.parseInt(distanceInWordsStrict(date_info.beginDate, Date.now(), {unit: 'd', partialMethod: 'ceil'}).split(' ', 2)[0]);
      // console.log(distance + '||' + days);
      if (distance < days) {  // 将默认的出发日期改掉
        this.form_data.date_info.beginDate = format(addDays(Date.now(), days), 'YYYY/M/D');
        this.form_data.date_info.endDate = compareDesc(date_info.beginDate, date_info.endDate) === -1 ? date_info.endDate = format(addDays(date_info.beginDate, 1), 'YYYY/M/D') : date_info.endDate;
      }else {
        return;
      }
    }
  }


  onSubmit(evt: Event): void {
    evt.preventDefault();
    this.showLoading = true;

    // console.log(this.timesValue);
    if (this.formModel.valid) {
      const formValue = this.formModel.value;
      const parmas_searchCar: SearchCarData = {
        beginDate: format(formValue.selectedDate.beginDate, 'YYYY-M-D'),
        endDate: format(formValue.selectedDate.endDate, 'YYYY-M-D'),
        beginCity: formValue.selectedArea[0],
        endCity: formValue.selectedArea[1],
        pickupTime: this.timesValue ? this.timesValue[0] + ':00' : '10:00',
        dropoffTime: this.timesValue ? this.timesValue[1] + ':00' : '10:00'
      };



      // 关闭弹窗事件
      if (this.inCarlist) {
        this.search_car.searchCars(parmas_searchCar).subscribe(search_result => {
          const msg = search_result.result[0];
          if (!isEmptyObj(msg)) { // 无搜索结果
            this.showLoading = false;
            alert(msg[Object.keys(msg)[0]]);
          }else {
            window.sessionStorage.setItem('search_car_data', JSON.stringify(parmas_searchCar));
            Promise.all([
              this.findArea_serve.getCity(parmas_searchCar.beginCity),
              this.findArea_serve.getCity(parmas_searchCar.endCity)
            ]).then(city => {
              this._emitClose.emit({
                beginCity: city[0],
                endCity: city[1],
                beginDate: parmas_searchCar.beginDate,
                endDate: parmas_searchCar.endDate,
                pickupTime: parmas_searchCar.pickupTime,
                dropoffTime: parmas_searchCar.dropoffTime,
                search_result: search_result.result[1]
              });
              this.showLoading = false;
            });
          }
        });
      }else {
        window.sessionStorage.setItem('search_car_data', JSON.stringify(parmas_searchCar));
        this.router.navigate(['/carlist']);
      }
    }
  }

}
