import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Car} from '../../service/car/car-info/car.model';
import {SearchCarData} from "../../share/search-car/search-car.component";

@Injectable()
export class PayMethodResolver implements Resolve<any> {
  constructor(private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | null {
    if (window.sessionStorage.getItem('search_data_car') && window.sessionStorage.getItem('car_detail') && window.sessionStorage.getItem('order_car_res')) {
      const car_detail$: Observable<Car> = Observable.of(JSON.parse(window.sessionStorage.getItem('car_detail')).car);
      const search_data_car$: Observable<SearchCarData> = Observable.of(JSON.parse(window.sessionStorage.getItem('search_data_car')));
      const order_car_res$: Observable<any> = Observable.of(JSON.parse(window.sessionStorage.getItem('order_car_res')));

      return Observable.zip(car_detail$, search_data_car$, order_car_res$, (car, search_data, order_res) => {
        return {car, search_data, order_res};
      }).catch(error => {
        console.log(error);
        this.router.navigate(['/carlist']);
        return null;
      });
    }else {
      alert('非法操作');
      this.router.navigate(['/carlist']);
      return null;
    }
  }
}
