import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {FindAreaService} from '../service/area/find-area.service';

@Injectable()
export class AreaResolver implements Resolve<any> {

  constructor(private findAreaS: FindAreaService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    return Promise.all([
      this.findAreaS.getCountries(),
      this.findAreaS.getCities(),
      this.findAreaS.getCityReturnList()
    ]).catch(error => {
      console.log(error);
      //this.router.navigate(['/campbook']);
      return null;
    });
  }
}
