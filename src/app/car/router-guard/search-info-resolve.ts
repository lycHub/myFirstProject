import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {FindAreaService} from '../../service/area/find-area.service';

@Injectable()
export class SearchInfoResolver implements Resolve<any> {
  constructor(private findArea_serve: FindAreaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    if (window.sessionStorage.getItem('search_car_data')) {
      const search_car_data = JSON.parse(window.sessionStorage.getItem('search_car_data'));
      return Promise.all([
        this.findArea_serve.getCity(search_car_data.beginCity),
        this.findArea_serve.getCity(search_car_data.endCity)
      ]).catch(error => {
          console.log(error);
          this.router.navigate(['/main']);
          return null;
      });
    }else {
      return new Promise((success, fail) => {
        success(null);
      });
    }
  }
}


