import {Component, forwardRef, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {City, Country} from '../../service/area/area-interface';
import {SearchCarData} from "../search-car/search-car.component";
import {isIncludes} from "../../util/public_fn";

@Component({
  selector: 'app-select-area',
  templateUrl: './select-area.component.html',
  styleUrls: ['./select-area.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectAreaComponent),
    multi: true
  }]
})
export class SelectAreaComponent implements ControlValueAccessor, OnChanges {
  // 是否国内
  @Input() inCountry: boolean;

  // 接收所有area数据
  @Input() all_area_data;

  // 搜索数据
  @Input() search_car_data: SearchCarData;

  //保存国家数据
  save_country: Country[];

  // 保存城市数据
  save_city: City[];

  //保存城市数据
  returnCityList: any;

  // 面板要显示的citylist
  showCityList: any;


  // 当前选中的国家
  selectedCountry: number;

  // 城市列表类型(取车还是还车)
  dataType = 'begin';


  // 城市列表组件是否显示
  _visible = false;

  // 选中的城市id
  currentCityId = {
    begin: null,
    end: null
  }

  @Input()
    set area_info(value: number[]) {
      [this.currentCityId.begin, this.currentCityId.end] = value;
      this.initData(value);
    }

  // 选中的城市信息
  currentCity;

  // 历史记录
  historyCity;

  // accessor
  private onChange = (_: any) => {};
  private onTouched: () => void = () => null;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    /*if (changes['all_area_data'].firstChange) {
        // 保存原始数据
        [this.save_country, this.save_city, this.returnCityList] = changes['all_area_data'].currentValue;
        this.showCityList = this.returnCityList;

        const tempCurrentCity = {begin: null, end: null};
        let tempHistoryCity = {begin: null, end: null};

        const search_car_data: SearchCarData = JSON.parse(window.sessionStorage.getItem('search_car_data'));

        if (search_car_data) {

          if (this.returnCityList) {
            tempCurrentCity.begin = tempHistoryCity.begin = this.save_city.find(city => city.id === search_car_data.beginCity);
            tempCurrentCity.end = tempHistoryCity.end = this.save_city.find(city => city.id === search_car_data.endCity);
          }

        }else {
          tempCurrentCity.begin = this.returnCityList['1'];
          tempCurrentCity.end = this.save_city.find(city => city.id === 1);
          tempHistoryCity = null;
        }

        this.currentCity = tempCurrentCity;
        this.historyCity = tempHistoryCity;

        console.log(this.currentCity);

      // 选中的国家
      this.selectedCountry = this.currentCity.begin ? this.currentCity.begin.country : 1;
    }*/
    if (changes['inCountry'].currentValue !== changes['inCountry'].previousValue) {
      this.initData([this.currentCityId.begin, this.currentCityId.end]);
    }
  }


  // 初始化数据
  initData(cityIds: number[]) {
    // 保存原始数据
    let temp_country: Country[];
    [temp_country, this.save_city, this.returnCityList] = this.all_area_data;
    this.save_country = temp_country.filter(country => this.inCountry ? country.id === 1 : country.id !== 1);
    // console.log(this.save_country);
    // this.showCityList = this.returnCityList;

    const tempCurrentCity = {begin: null, end: null};
    let tempHistoryCity = {begin: null, end: null};


    if (this.search_car_data) {
      // console.log(this.currentCityId);
      tempCurrentCity.begin = this.save_city.find(city => city.id === cityIds[0]);
      tempCurrentCity.end = this.save_city.find(city => city.id === cityIds[1]);

      tempHistoryCity.begin = this.save_city.find(city => city.id === this.search_car_data.beginCity);
      tempHistoryCity.end = this.save_city.find(city => city.id === this.search_car_data.endCity);
    }else {
      const initCityId = this.inCountry ? 96 : 170;
      tempCurrentCity.begin = this.returnCityList[initCityId.toString()];
      tempCurrentCity.end = this.save_city.find(city => city.id === initCityId);
      tempHistoryCity = null;
    }
    // console.log(tempCurrentCity);
    this.currentCity = tempCurrentCity;
    this.historyCity = tempHistoryCity;

    // console.log(this.historyCity);
    // console.log(this.currentCity);

    // 选中的国家
    this.selectedCountry = this.currentCity.begin ? this.currentCity.begin.country : 1;
  }

  // 打开城市面板
  openCityList(type: string): void {
    this.dataType = type;
    if (this.dataType !== 'begin') {  // 如果是end面板，调的是city接口
      const tempRetrunCitylist = this.currentCity.begin.returnCityList ? this.currentCity.begin.returnCityList : this.returnCityList[this.currentCity.begin.id.toString()].returnCityList;
      // console.log(tempRetrunCitylist);
      this.showCityList = this.save_city.filter(city => isIncludes(tempRetrunCitylist, city.id));
      // console.log(this.showCityList);
    }else {
      const tempCityList = [];
      for (const attr in this.returnCityList) {
        if (this.inCountry) { // 筛选国内的cityList
          if (this.returnCityList[attr].country === 1) {
            tempCityList.push(this.returnCityList[attr]);
          }
        }else {
          if (this.returnCityList[attr].country !== 1) {
            tempCityList.push(this.returnCityList[attr]);
          }
        }
      }
      this.showCityList = tempCityList;
    }
    this._visible = true;
  }



  //选中某城市
  selectedCity(evt): void {
    const id = evt.id || evt.city_id;
    if (this.dataType === 'begin') {   // 选中取车城市
      if (this.currentCityId.begin === id) {
        this._visible = false;
        return;
      }
      this.currentCityId.begin = id;
      this.currentCity.begin = evt;


      if (this.selectedCountry !== evt.country) this.selectedCountry = evt.country;    // 更新当前国家
      // 起点改变后自动改变终点
      for (const attr in this.returnCityList) {
        if (Number.parseInt(attr) === this.currentCityId.begin) {
          const arr = this.returnCityList[attr].returnCityList;
          if (isIncludes(arr, this.currentCityId.begin)) {
            this.currentCityId.end = arr[0];
            this.currentCity.end = this.returnCityList[arr[0].toString()];
            // console.log(this.currentCity.end);
            this.onChange([this.currentCityId.begin, this.currentCityId.end]);
            this._visible = false;
            return;
          }
        }
      }
    }else { // 选中还车城市
      if (this.currentCityId.end === id) {
        this._visible = false;
        return;
      }
      this.currentCityId.end = id;
      this.currentCity.end = evt;
    }
    this.onChange([this.currentCityId.begin, this.currentCityId.end]);
    this._visible = false;
  }

  writeValue(obj: any): void {
    [this.currentCityId.begin, this.currentCityId.end] = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
