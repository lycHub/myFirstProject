import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CarConfig, CarConfigType} from './config.model';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CarConfigService {

  constructor(private http: HttpClient, @Inject('CommentApi') private api) { }
  // 捕获错误
  static handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }


  getConfigs(): Observable<CarConfig[]> {
    const url = `${this.api.uri}vehicle_spec/`;
    return this.http.get(url).catch(CarConfigService.handleError);;
  }

  getConfigType(): Observable<CarConfigType[]> {
    const url = `${this.api.uri}vehicle_spec_type/`;
    return this.http.get(url).map(res => res as CarConfigType[]).catch(CarConfigService.handleError);;
  }
}
