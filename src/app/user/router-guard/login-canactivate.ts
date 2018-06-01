import { Injectable } from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {isIncludes} from "../../util/public_fn";

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = window.sessionStorage.getItem('token');
    if (!token) {
      return true;
    }else {
      const loginTo = route.paramMap.get('loginTo');
      const from = route.paramMap.get('from');
      // console.log(loginTo);
      // console.log(from);

      if (isIncludes(this.router.url, 'write-order')) {
        // console.log(1);
        if (from) {
          // console.log(2);
          this.router.navigate([from]);
        }else {
          alert('非法操作');
          return false;
        }
      }else {
        if (loginTo) {
          this.router.navigate([loginTo]);
        }else {
          alert('非法操作');
          return false;
        }
      }
    }
  }
}
