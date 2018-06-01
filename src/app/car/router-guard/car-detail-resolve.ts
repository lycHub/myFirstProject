import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {CompanyService} from '../../service/company/company-list.service';
import {BranchService} from '../../service/company/branch-list.service';
import {SingleCar} from '../carlist/carlist.component';
import {PackageService} from '../../service/car/car-packages';
import {FindAreaService} from "../../service/area/find-area.service";


@Injectable()
export class CarDetailResolver implements Resolve<any> {
  constructor(private areaServe$: FindAreaService, private router: Router, private branchServe$: BranchService, private companyServe$: CompanyService, private packageServe$: PackageService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    if (window.sessionStorage.getItem('car_detail') && window.sessionStorage.getItem('search_data_car')) {

      // 车辆信息
      const car_detail: SingleCar = JSON.parse(window.sessionStorage.getItem('car_detail'));

      // 搜车条件
      const search_data = JSON.parse(window.sessionStorage.getItem('search_data_car'));
      // console.log(search_data);

      const search_data$ = Observable.of(search_data);

      // 获取国家
      const country$ = this.areaServe$.getCounty(search_data.beginCity.country);
      const company$ = this.companyServe$.getCompany(car_detail.car.company);
      const branch$ = this.branchServe$.getBranch(car_detail.pick_branch_id);

      // 获取套包
      const packages$ = this.packageServe$.getPackages({
        beginDate: search_data.beginDate,
        endDate: search_data.endDate,
        // branchID: car_detail.pick_branch_id,
        beginBranchID: car_detail.pick_branch_id,
        endBranchID: car_detail.drop_branch_id,
        vehicleID: car_detail.car.id
      })

      return Observable.combineLatest(search_data$, country$, company$, branch$, packages$, (searchData, country, company, branch, packages) => {
        return {searchData, country, company, branch, packages};
      }).catch(error => {
        console.log(error);
        this.router.navigate(['/carlist']);
        return null;
      });
    }else {
      alert('请先搜索');
      this.router.navigate(['/carlist']);
      return null;
    }
  }
}
