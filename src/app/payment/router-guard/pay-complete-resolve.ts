import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {BranchService} from '../../service/company/branch-list.service';

@Injectable()
export class PayCompleteResolver implements Resolve<any> {
  constructor(private router: Router, private branch$: BranchService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> | null {
    const parmas = {
      car_id: route.paramMap.get('car_id'),
      order_id: route.paramMap.get('order_id'),
      pick_branch_id: route.paramMap.get('pick_branch_id'),
      drop_branch_id: route.paramMap.get('drop_branch_id'),
      order_status: route.paramMap.get('order_status'),
      start_date: route.paramMap.get('start_date'),
      end_date: route.paramMap.get('end_date')
    };

    return Promise.all([
      new Promise((success, fail) => {
        success({
          order_id: parmas.order_id,
          car_id: parmas.car_id,
          status: parmas.order_status,
          start_date: parmas.start_date,
          end_date: parmas.end_date
        });
        fail('订单获取错误');
      }),
      this.branch$.getBranch(Number.parseInt(parmas.pick_branch_id)).toPromise(),
      this.branch$.getBranch(Number.parseInt(parmas.drop_branch_id)).toPromise()
    ]).catch(error => {
      console.error(error);
      this.router.navigate(['/carlist']);
      return null;
    });
  }
}
