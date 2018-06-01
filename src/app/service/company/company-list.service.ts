import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

export interface Company {
  id: number;
  image: string;
  score: number;
  mileage_package_required: boolean;
}

@Injectable()
export class CompanyService {

  constructor(private http: HttpClient, @Inject('CommentApi') private api) { }
// 捕获错误
  static handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  //获取车行列表
  getCompanyList(): Observable<Company[]> {
    const url = `${this.api.uri}company/`;
    return this.http.get(url).catch(CompanyService.handleError);
  }

  //获取单个车行
  getCompany(id: number): Observable<Company> {
    const url = `${this.api.uri}company/${id}/`;
    return this.http.get(url).catch(CompanyService.handleError);
  }
}
