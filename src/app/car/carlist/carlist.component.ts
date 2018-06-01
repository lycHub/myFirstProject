import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CarConfig, CarConfigType} from '../../service/car/car-config/config.model';
import {CarInfoService} from '../../service/car/car-info/car-info.service';
import {Company, CompanyService} from '../../service/company/company-list.service';
import {Car} from '../../service/car/car-info/car.model';
import {Subscription} from "rxjs/Subscription";
import { fromEvent } from 'rxjs/observable/fromEvent';
import {DOCUMENT} from "@angular/common";
import {SearchCarData} from "../../share/search-car/search-car.component";

// 顶部显示的当前搜索信息模型
/*export interface CurrentSearchData {
  beginCity: City | null;
  endCity: City | null;
  beginDate: string | null;
  endDate: string | null;
  pickupTime?: string;
  dropoffTime?: string;
  days?: number;
}*/


// 单个车辆模型
export interface SingleCar {
  car: Car;
  vehicly_type: string;
  currency_symbol: string;
  pick_branch_id: number;
  drop_branch_id: number;
  price_list: any[];
  daily_rents: number;
  regular_price: number;
  total: number;
  tax: number;
  oneway_fee: {type: string; charge_amount: number; tax_amount?: number; total: number; description?: string; };
  discount: {list: any; deduct_amount: 0};
  special_fee: {total: number; list: any; charge_amount: number; };
}


@Component({
  selector: 'app-carlist',
  templateUrl: './carlist.component.html',
  styleUrls: ['./carlist.component.scss']
})
export class CarlistComponent implements OnInit, OnDestroy {
  // 控制加载中
  showLoading = false;

  // 返回loading
  private back$: Subscription;

  // 保存搜车信息
  city_data: SearchCarData;

  // 初始化车辆配置
  initConfig = {
    max_seats: 2
  }

  // 控制搜索表单的弹窗
  showSearchForm = false;


  //控制筛选面板
  showFilterPanel = false;

  //控制车行弹窗
  showModal = false;

  // 车行弹窗的title
  titleOfChehang: string;

  // 保存配置类型
  configType: CarConfigType[];

  // 保存所有配置
  save_config_all: CarConfig[];

  // 保存需要进行筛选的配置
  save_config_filter: CarConfig[];


  // 保存搜车结果
  save_search_result;

  // 保存车辆列表
  save_carlist: SingleCar[];

  // 保存用户筛选配置
  save_user_filter: string[] = [];

  // 保存筛选后的车辆列表
  save_carlist_filter: SingleCar[];

  // 保存company
  save_company = [];

  private doc: Document;
  constructor(@Inject(DOCUMENT) doc: any, private routeInfo: ActivatedRoute, private getCarServe: CarInfoService, private company$: CompanyService, private router: Router) {
    this.doc = doc;
    if (!this.back$) {
      this.back$ = fromEvent(window, 'popstate').subscribe(e => this.showLoading = true);
    }
  }

  ngOnInit() {
    this.routeInfo.data.subscribe(data => {
      // 初始化数据
      [this.save_config_all, this.save_config_filter, this.save_search_result, this.configType] = [
        data.carlist_data.configs,
        data.carlist_data.configs.filter(config => config.search_filter),
        data.carlist_data.search_result,
        data.carlist_data.configType
      ];

      //console.log(data.carlist_data.search_result);

      // 初始化车辆
      if (window.sessionStorage.getItem('search_car_data')) {
        const search_car_data = JSON.parse(window.sessionStorage.getItem('search_car_data'));
        // console.log(search_car_data);
        const searchData = {
          beginCity: data.searchCity[0],
          endCity: data.searchCity[1],
          beginDate: search_car_data.beginDate,
          endDate: search_car_data.endDate,
          pickupTime: search_car_data.pickupTime,
          dropoffTime: search_car_data.dropoffTime,
          search_result: data.carlist_data.search_result
        }
        //console.log(data.carlist_data.search_result);
        this.updateData(searchData);
      }else {
        this.router.navigate(['/main']);
        throw new Error('没有搜索数据');
      }
    });
  }


  // 控制搜索表单的弹窗
  controlSearchForm(type: string): void {
    if (type === 'open') {
      this.showSearchForm = true;
      this.doc.body.style.overflowY = this.doc.documentElement.style.overflowY = 'hidden';
    }else {
      this.doc.body.style.overflowY = this.doc.documentElement.style.overflowY = 'auto';
      this.showSearchForm = false;
    }
  }


  // 弹窗更新搜索结果
  updateSearchResult(evt) {
    this.updateData(evt);
    this.doc.body.style.overflowY = this.doc.documentElement.style.overflowY = 'auto';
    this.showSearchForm = false;
  }


  // 数据更新
  updateData(data) {
   // console.log(data);
    // 初始化时间
    const {beginCity, endCity, beginDate, endDate, pickupTime, dropoffTime} = data;

    this.city_data = {beginCity, endCity, beginDate, endDate, pickupTime, dropoffTime};


    this.save_carlist = [];
    const temp_save_company: Company[] = [];
    // console.log(data.search_result);
    data.search_result.forEach((result, key, arr) => {
      this.getCarServe.getCar(result.vehicle_id).zip(this.company$.getCompany(result.company_id), (car, company) => {
        return {car, company};
      }).subscribe(res => {
        temp_save_company.push(res.company);

        const singleCar = res.car;
        // console.log(singleCar);
        // 先用默认条件筛选一次
        if (singleCar['max_seats'] >= this.initConfig.max_seats && this.save_user_filter.every(config => singleCar[config])) {
          this.save_carlist.push({
            car: singleCar,
            vehicly_type: result.vehicly_type,
            currency_symbol: result.currency_symbol,
            pick_branch_id: result.pick_branch_id,
            drop_branch_id: result.drop_branch_id,
            regular_price: result.regular_price,
            price_list: result.price_list,
            daily_rents: result.daily_rents,
            total: result.total,
            tax: result.tax,
            oneway_fee: result.oneway_fee,
            discount: result.discount,
            special_fee: result.special_fee
          });
          // 最后一次循环价格排序
          if (key === arr.length - 1) {
            this.save_carlist.sort((a, b) => {
              return a.total - b.total;
            });
          }

          const recommendCar = this.save_carlist.filter(item => item.car.recommend);
          const normalCar = this.save_carlist.filter(item => !item.car.recommend);
          this.save_carlist_filter = recommendCar.concat(normalCar);
          // console.log(this.save_carlist_filter);
        }

        this.save_company = [];
        const temp_company = {};
        temp_save_company.forEach(company => {
          if (!temp_company[company.id.toString()]) {
            temp_company[company.id.toString()] = true;
            this.save_company.push({
              id: company.id,
              img: company.image,
              count: 1
            });
          }else {
            this.save_company.map(item => {
              if (item.id === company.id) item.count++;
            });
          }
        });
        this.titleOfChehang = `共有${this.save_company.length}家车行可选`;
        // console.log(this.save_company);
      });
    });
  }

  filterCar(config_name: string): void {
    //console.log(this.save_carlist);
    // 查询索引
    const index = this.save_user_filter.findIndex(item => item === config_name);

    if (index > -1) { // splice
      this.save_user_filter.splice(index, 1);
    }else {   // push
      this.save_user_filter.push(config_name);
    }


    this.save_carlist_filter = [];
    this.save_carlist.forEach(car => {
      const singleCar = car.car;
      if (singleCar['max_seats'] >= this.initConfig.max_seats && this.save_user_filter.every(config => singleCar[config])) {
        this.save_carlist_filter.push(car);
      }
    });
    // console.log(this.save_carlist_filter.length);
  }


  // 筛选面板点击确定后更新数据
  afterFilter(evt) {
    [this.initConfig.max_seats, this.save_carlist_filter] = [evt.max_seats, evt.carlist_filter];
    this.save_user_filter = [];
    evt.configs.forEach(filter => this.save_user_filter.push(filter.value));    // configs

    // 关闭窗口
    this.doc.body.style.overflowY = this.doc.documentElement.style.overflowY = 'auto';
    this.showFilterPanel = false;
  }


  // 跳至详情页
  gotoDetail(car: SingleCar) {
    this.showLoading = true;
    window.sessionStorage.setItem('car_detail', JSON.stringify(car));
    // console.log(car);
    window.sessionStorage.setItem('search_data_car', JSON.stringify(this.city_data));
    this.router.navigate(['/car-detail/' + car.car.id]);
  }

  ngOnDestroy(): void {
    this.showLoading = false;
    this.back$.unsubscribe();
    this.doc.body.style.overflowY = this.doc.documentElement.style.overflowY = 'auto';
  }
}
