import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SearchCarData} from "../../../share/search-car/search-car.component";

@Injectable()
export class SearchCarService {

  constructor(private http: HttpClient, @Inject('CommentApi') private api) { }
  // 捕获错误
  static handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  searchCars(obj: SearchCarData): Observable<any> {
    const url = `${this.api.uri}search-rv/`;
    const parmas = new HttpParams({fromString: `beginCity=${obj.beginCity}&endCity=${obj.endCity}&beginDate=${obj.beginDate}&endDate=${obj.endDate}&pickupTime=${obj.pickupTime}&dropoffTime=${obj.dropoffTime}`});
    return this.http.post(url, parmas).catch(SearchCarService.handleError);
  }
}
