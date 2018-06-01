import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

export interface Branch {
  id: number;
  address: string;
  pickup_return_rules: string;
  city: number;
  airport: string;
  train_station: string;
}

@Injectable()
export class BranchService {
  constructor(private http: HttpClient, @Inject('CommentApi') private api) { }
// 捕获错误
  static handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  //获取单个branch
  getBranch(id: number): Observable<Branch> {
    const url = `${this.api.uri}branch/${id}/`;
    return this.http.get(url).catch(BranchService.handleError);
  }

  //获取branch列表
  getBranchs(): Observable<Branch[]> {
    const url = `${this.api.uri}branch/`;
    return this.http.get(url).catch(BranchService.handleError);
  }

}
