import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {SearchCarService} from '../../service/car/search-car/search-car.service';
import {SearchCarData} from '../../share/search-car/search-car.component';
import {format} from 'date-fns';
import {CarConfigService} from '../../service/car/car-config/car-config.service';
import {Observable} from 'rxjs/Observable';
import {isEmptyObj} from "../../util/public_fn";


@Injectable()
export class CarListResolver implements Resolve<any> {
  constructor(private search_car: SearchCarService, private carConfigServe: CarConfigService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const parmas_searchCar: SearchCarData = {
      beginDate: null,
      endDate: null,
      beginCity: null,
      endCity: null,
      pickupTime: null,
      dropoffTime: null
    };

    if (window.sessionStorage.getItem('search_car_data')) {
      // console.log(1);
      const search_car_data: SearchCarData = JSON.parse(window.sessionStorage.getItem('search_car_data'));
      // console.log(search_car_data);
      [parmas_searchCar.beginDate,
        parmas_searchCar.endDate,
        parmas_searchCar.beginCity,
        parmas_searchCar.endCity,
        parmas_searchCar.pickupTime,
        parmas_searchCar.dropoffTime]
        =
        [search_car_data.beginDate,
          search_car_data.endDate,
          search_car_data.beginCity,
          search_car_data.endCity,
          search_car_data.pickupTime,
          search_car_data.dropoffTime];
    }else {
      // console.log(2);
      [parmas_searchCar.beginDate, parmas_searchCar.endDate, parmas_searchCar.beginCity, parmas_searchCar.endCity, parmas_searchCar.pickupTime, parmas_searchCar.dropoffTime] = [
        format(new Date(new Date().setDate(new Date().getDate() + 3)), 'YYYY-MM-DD'),
        format(new Date(new Date().setDate(new Date().getDate() + 3 + 7)), 'YYYY-MM-DD'),
        96, 96, '10:00', '10:00'];
      window.sessionStorage.setItem('search_car_data', JSON.stringify(parmas_searchCar));
    }
    // console.log(parmas_searchCar);
    const searchCar$ = this.search_car.searchCars(parmas_searchCar);
    const configs$ = this.carConfigServe.getConfigs();
    const configType$ = this.carConfigServe.getConfigType();

    return Observable.combineLatest(searchCar$, configs$, configType$, (search_result, configs, configType) => {
      const msg = search_result.result[0];
      if (!isEmptyObj(msg)) { // 无搜索结果
        alert(msg[Object.keys(msg)[0]]);
      }
      return {search_result: search_result.result[1], configs, configType};
    }).catch(error => {
      console.log(error);
      this.router.navigate(['/main']);
      return null;
    });
  }
}
