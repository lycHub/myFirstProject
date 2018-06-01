import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {PlaceOrderService} from '../../service/order/place-order.service';
import {CarInfoService} from '../../service/car/car-info/car-info.service';

@Injectable()
export class OrderDetailResolver implements Resolve<any> {
  constructor(private router: Router, private orderServe$: PlaceOrderService, private carServe$: CarInfoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | null {
    const token = window.sessionStorage.getItem('token');
    const order_data = window.sessionStorage.getItem('order_data');
    const car_id = route.paramMap.get('car_id');
    const order_id = route.paramMap.get('id');

    if (token && order_data && car_id && order_id) {
      const order_data$ = Observable.of(JSON.parse(order_data));
      const car$ = this.carServe$.getCar(Number.parseInt(car_id));
      const order$ = this.orderServe$.get_SingleOrder(Number.parseInt(order_id));

      return Observable.zip(order_data$, car$, order$, (data, car, order_detail) => {
        return {data, car, order_detail};
      });
    }else {
      alert('请先登录');
      this.router.navigate(['/login-phone']);
    }
  }
}
