import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {GuideCategory, GuideSearchResult} from "./guide.model";

@Injectable()
export class GuideService {
  constructor(private http: HttpClient, @Inject('CommentApi') private api) { }

  // 捕获错误
  static handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }


  // 获取指南分类
  getGuideCategory(): Observable<GuideCategory[]> {
    const url = `${this.api.uri}guide_category/`;
    return this.http.get(url).catch(GuideService.handleError);
  }

  // 获取二级分类下的具体问题
  getQuestions(obj: { country: number; category: number; }): Observable<any> {
    const url = `${this.api.uri}guide_detail/`;
    // const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const parmas = new HttpParams({fromString: `country=${obj.country}&category=${obj.category}`});
    return this.http.post(url, parmas).catch(GuideService.handleError);
  }

  // 获取搜索结果
  getSearchResult(key: string): Observable<GuideSearchResult[]> {
    const url = `${this.api.uri}guide_word/?search=${key}`;
    // const headers = new HttpHeaders().set('Content-Type', 'application/json');
    // const parmas = new HttpParams({fromString: `country=${obj.country}&category=${obj.category}`});
    return this.http.get(url).catch(GuideService.handleError);
  }
}
