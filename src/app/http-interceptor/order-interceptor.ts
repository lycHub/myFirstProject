import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {isIncludes} from "../util/public_fn";

@Injectable()
export class OrderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = window.sessionStorage.getItem('token');
    if (isIncludes(req.url, 'type=order') && token) {
      // console.log(req);
      const authReq = req.clone({headers: req.headers.set('Authorization', 'JWT ' + token)});
      return next.handle(authReq);
    }else {
      return next.handle(req);
    }
  }
}
