import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {AcessTokenBack, OpenIdBack, ParamsOfPay, ParamsOfSignature, TicketBack} from "./wx-model";

@Injectable()
export class WxBrowserService {

  constructor(private http: HttpClient, @Inject('CommentApi') private api) {}

  // 获取静默授权url
  getWxUrl(): Promise<{ code: string; url: string; }> {
    const url = this.api.uri + 'wechat_web_access/?scope=snsapi_base';
    return this.http.get(url).toPromise().then(res => res as { code: string; url: string; });
  }

  // 获取openid
  getOpenid(params: string): Promise<OpenIdBack> {
    const url = this.api.uri + 'wechat_oauth2_access_token/?' + params;
    return this.http.get(url).toPromise().then(res => res as OpenIdBack);
  }

  // 获取access_token
  getAcessToken(): Promise<AcessTokenBack> {
    const url = this.api.uri + 'wechat_access_token/';
    return this.http.get(url).toPromise().then(res => res as AcessTokenBack);
  }

  // 根据acess_token获取ticket
  getTicket(params: string): Promise<TicketBack> {
    const url = `${this.api.uri}wechat_jsapi_ticket/?access_token=${params}`;
    return this.http.get(url).toPromise().then(res => res as TicketBack);
  }

  // 获取signature签名
  getSignature(obj: ParamsOfSignature): Promise<string> {
    const url = `${this.api.uri}wechat_sign/`;
    const parmas = new HttpParams({fromString: `noncestr=${obj.noncestr}&jsapi_ticket=${obj.jsapi_ticket}&timestamp=${obj.timestamp}&url=${obj.url}`});
    return this.http.post(url, parmas).toPromise().then(res => res as string);
  }


  // 获取prepay_id
  getPrepayId(obj: ParamsOfPay): Promise<string> {
    const url = `${this.api.uri}wxpay/`;
    const parmas = new HttpParams({fromString: `order_no=${obj.order_no}&pay_type=${obj.pay_type}&order_type=${obj.order_type}&openid=${obj.openid}`});
    return this.http.post(url, parmas).toPromise().then(res => res as string);
  }
}
