import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {SingleCar} from '../carlist/carlist.component';
import {Branch, BranchService} from '../../service/company/branch-list.service';
import {SearchCarData} from "../../share/search-car/search-car.component";
import {FindAreaService} from "../../service/area/find-area.service";


@Injectable()
export class OrderResolver implements Resolve<any> {
  constructor(private areaServe$: FindAreaService, private router: Router, private branchServe$: BranchService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    if (window.sessionStorage.getItem('search_data_car') && window.sessionStorage.getItem('car_detail') && window.sessionStorage.getItem('order_data_car')) {
      const search_data = JSON.parse(window.sessionStorage.getItem('search_data_car'));

      const search_data$: Observable<SearchCarData> = Observable.of(search_data);

      // 获取国家
      const country$ = this.areaServe$.getCounty(search_data.beginCity.country);


      const order_data$: Observable<any> = Observable.of(JSON.parse(window.sessionStorage.getItem('order_data_car')));

      const carInfo: SingleCar = JSON.parse(window.sessionStorage.getItem('car_detail'));

      // car + branch
      const carInfo$: Observable<SingleCar> = Observable.of(carInfo);
      const pick_branch$: Observable<Branch> = this.branchServe$.getBranch(carInfo.pick_branch_id);

      const car_branch_info$ = carInfo$.zip(pick_branch$, (car, branch) => {
        return {car: car, branch: branch};
      })

      return Observable.combineLatest(country$, search_data$, car_branch_info$, order_data$, (country, searchData, car_branch_info, order_data) => {
        return {country, searchData, car_branch_info, order_data};
      });
    }else {
      this.router.navigate(['/carlist']);
      return;
    }
  }
}


/*
*
* 下单页需要的额外数据

 搜索数据		getItem('search_data_car')		getItem('search_data_car')
 车辆信息		getItem('car_detail')			getItem('car_detail')

 套包
 总价(含套包)									getItem('order_data_car')
* */
