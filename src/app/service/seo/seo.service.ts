import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {FriendlyLink, SeoArticleDetail, SeoArticleList} from "./seo.model";

@Injectable()
export class SeoService {

  constructor(private http: HttpClient, @Inject('CommentApi') private api) { }

  // 捕获错误
  static handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  // 获取文章列表
  getArticles(page: number = 1): Promise<SeoArticleList> {
    const url = `${this.api.uri}seo_word/?page=${page}`;
    return this.http.get(url).toPromise().then(res => res as SeoArticleList).catch(SeoService.handleError);
  }


  // 获取每篇文章的详情
  getArticle(id: number): Promise<SeoArticleDetail> {
    const url = `${this.api.uri}search_seo/`;
    const parmas = new HttpParams({fromString: `id=${id}`});
    return this.http.post(url, parmas).toPromise().then(res => res as SeoArticleDetail).catch(SeoService.handleError);
  }

  // 获取友情链接
  getFriendlyLink(): Promise<FriendlyLink> {
    const url = `${this.api.uri}friendly_link/`;
    return this.http.get(url).toPromise().then(res => res as FriendlyLink).catch(SeoService.handleError);
  }


  // 获取title
  getTitle(): Promise<Array<{ title: string; }>> {
    const url = `${this.api.uri}seo_title/`;
    return this.http.get(url).toPromise().then(res => res as Array<{ title: string; }>).catch(SeoService.handleError);
  }
}
