import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {PlaceOrderService} from '../../service/order/place-order.service';
import {FindAreaService} from '../../service/area/find-area.service';
import {BranchService} from '../../service/company/branch-list.service';

@Injectable()
export class PersonCenterResolver implements Resolve<any> {
  constructor(private router: Router, private orderServe$: PlaceOrderService, private findAreaS: FindAreaService, private branch$: BranchService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> | null {
    const token = window.sessionStorage.getItem('token');
    const phone = window.sessionStorage.getItem('phone');

    if (token && phone) {
      return Promise.all([
        new Promise(success => {
          success(phone);
        }),
        this.findAreaS.getCities(),
        this.branch$.getBranchs().toPromise(),
        this.orderServe$.get_orders().toPromise()
      ]).catch(error => {
        console.log(error);
        this.router.navigate(['/login-phone']);
        return null;
      });
    }else {
      alert('请先登录');
      this.router.navigate(['/login-phone']);
    }
  }
}
