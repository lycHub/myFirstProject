import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Car} from './car.model';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CarInfoService {

  constructor(private http: HttpClient, @Inject('CommentApi') private api) { }
// 捕获错误
  static handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  //获取单个车辆
  getCar(id: number): Observable<Car> {
    const url = `${this.api.uri}vehicle/${id}`;
    return this.http.get(url).catch(CarInfoService.handleError);
  }
}
