import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class AboutusService {

  constructor(private http: HttpClient, @Inject('CommentApi') private api) {}
  // 捕获错误
  static handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  // 获取关于我们
  getAboutUs(): Promise<AboutDetail[]> {
    const url = `${this.api.uri}about_us/`;
    return this.http.get(url).toPromise().then(res => res as AboutDetail[]);
  }
}


export interface AboutDetail {
  title: string;
  content: string;
}
