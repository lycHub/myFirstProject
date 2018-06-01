import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class CarousalService {

  constructor(private http: HttpClient, @Inject('CommentApi') private api) {}

  // 捕获错误
  static handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }


  // 获取轮播图
  getCarousal(): Promise<Carousal[]> {
    const url = `${this.api.uri}index_poster/`;
    return this.http.get(url).toPromise().then(res => res as Carousal[]).catch(CarousalService.handleError);
  }

}

export interface Carousal {
  sn: number;
  image: string;
  url: string;
}
