import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {OrderCarRes} from './order-cb.model';
import {ParamsOfPay} from "../wxBrowser/wx-model";

@Injectable()
export class PlaceOrderService {

  constructor(private http: HttpClient, @Inject('CommentApi') private api) { }

  // 下单
  place_order(obj: PlaceOrderParma, type: string = 'car'): Observable<OrderCarRes> {
    const post_type = type === 'car' ? 'vehicle_order/' : 'camp_order/';
    const url = `${this.api.uri}${post_type}?type=order`;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(url, JSON.stringify(obj), {headers: headers}).map(res => res as OrderCarRes);
  }

  // 获取订单列表
  get_orders(type: string = 'car'): Observable<OrderCarRes[]> {
    const post_type = type === 'car' ? 'vehicle_order/' : 'camp_order/';
    const url = `${this.api.uri}${post_type}?type=order`;
    return this.http.get(url).map(res => res as OrderCarRes[]);
  }

  // 获取单个订单
  get_SingleOrder(id: number, type: string = 'car'): Observable<OrderCarRes> {
    const post_type = type === 'car' ? 'vehicle_order/' : 'camp_order/';
    const url = `${this.api.uri}${post_type}${id}/?type=order`;
    return this.http.get(url).map(res => res as OrderCarRes);
  }

  // 获取付款链接
  getPayUrl(obj: ParamsOfPay, type: string = 'wxpay'): Observable<string> {
    const url = `${this.api.uri}${type}/`;
    //const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const parmas = new HttpParams({fromString: `order_no=${obj.order_no}&pay_type=${obj.pay_type}&order_type=${obj.order_type}`});
    return this.http.post(url, parmas).map(res => res as string);
  }
}

// 下单参数接口
export interface PlaceOrderParma {
  base_price: string;   // 价格分解
  birth: string;
  tel: string | number;
  first_name: string;
  company_package: string;
  last_name: string;
  adult: number;
  email: string;
  user_request: string | null;
  start_date: string;
  company: number;
  name: string;
  driver_name: string;
  children: number;
  drop_branch: number;
  flight_no: number | null;
  pick_branch: number;
  amount: number;
  vehicle: number;
  own_package: string | null;
  end_date: string;
  flight_time: string | null;
  total: number;
  elder: number;
}
