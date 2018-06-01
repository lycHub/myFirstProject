import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class PackageService {
  constructor(private http: HttpClient, @Inject('CommentApi') private api) { }
  // 捕获错误
  static handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  //获取套包
  getPackages({beginDate, endDate, beginBranchID, endBranchID, vehicleID}): Observable<any> {
    const url = `${this.api.uri}package-list/`;
    const parmas = new HttpParams({fromString: `beginDate=${beginDate}&endDate=${endDate}&beginBranchID=${beginBranchID}&endBranchID=${endBranchID}&vehicleID=${vehicleID}`});
    return this.http.post(url, parmas).catch(PackageService.handleError);
  }

/*  getPackages({beginDate, endDate, branchID, vehicleID}): Observable<any> {
    const url = `${this.api.uri}package-list/`;
    const parmas = new HttpParams({fromString: `beginDate=${beginDate}&endDate=${endDate}&branchID=${branchID}&vehicleID=${vehicleID}`});
    return this.http.post(url, parmas).catch(PackageService.handleError);
  }*/
}
