import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {City, Country} from './area-interface';

@Injectable()
export class FindAreaService {
  constructor(private http: HttpClient, @Inject('CommentApi') private api) {}

  // 捕获错误
  static handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }


  //获取国家
  getCountries(): Promise<Country[]> {
    const url = `${this.api.uri}country/`;
    return this.http.get(url).toPromise().then(country => country as Country[]).catch(FindAreaService.handleError);
  }

  // 获取国家
  getCounty(id: number): Promise<Country> {
    const url = `${this.api.uri}country/${id}/`;
    return this.http.get(url).toPromise().then(country => country as Country).catch(FindAreaService.handleError);
  }


  //获取城市
  getCities(): Promise<City[]> {
    const url = `${this.api.uri}city/`;
    return this.http.get(url).toPromise().then(city => city as City[]).catch(FindAreaService.handleError);
  }

  //获取单个城市
  getCity(id: number): Promise<City> {
    const url = `${this.api.uri}city/${id}/`;
    return this.http.get(url).toPromise().then(city => city as City).catch(FindAreaService.handleError);
  }


  //获取return-list
  getCityReturnList(): Promise<any> {
    const url = `${this.api.uri}city-return-list/`;
    return this.http.get(url).toPromise().catch(FindAreaService.handleError);
  }

}
