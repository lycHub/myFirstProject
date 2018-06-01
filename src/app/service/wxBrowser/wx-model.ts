// import {environment} from "../../../environments/environment";
const KEY = 'ypgr0cey2frpqommqv8bhdkxm7i1wqs6';
                                                                      // 测试
// const APPID = environment.production ? 'wx648d547a57a87d43' : 'wxad569962f75b3d80';
 const APPID = 'wx648d547a57a87d43';
 const APPID_WECHAT = 'wxb6656a75fe2ae498';  // 小程序

// getopenid返回的数据模型
interface OpenIdBack {
  openid: string;
  refresh_token: string;
  access_token: string;
  scope: string;
  expires_in: number;
}

// getAcessToken返回的数据模型
interface AcessTokenBack {
  access_token: string;
  expires_in: number;
}

// getTicket返回的数据模型
interface TicketBack {
  errcode: number;
  errmsg: string;
  ticket?: string;
  expires_in?: number;
}


// 付款所需的参数模型
interface ParamsOfPay {
  order_no: string;
  pay_type: string;
  order_type: string;
  openid?: string;
}


// 获取signature签名的参数模型
interface ParamsOfSignature {
  noncestr: string;
  jsapi_ticket: string;
  timestamp: string;
  url: string;
}

export {APPID, APPID_WECHAT, KEY, OpenIdBack, ParamsOfPay, ParamsOfSignature, AcessTokenBack, TicketBack };
