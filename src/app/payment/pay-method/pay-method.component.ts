import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Car} from '../../service/car/car-info/car.model';
import {PlaceOrderService} from '../../service/order/place-order.service';
import {SearchCarData} from '../../share/search-car/search-car.component';
import {differenceInDays, format} from 'date-fns';
import {APPID, APPID_WECHAT, KEY, ParamsOfPay} from '../../service/wxBrowser/wx-model';
import {countDown, isWeixin} from '../../util/public_fn';
import {WxBrowserService} from '../../service/wxBrowser/wx-browser.service';
import {Md5} from 'ts-md5/dist/md5';
import base64 from 'base-64';

declare const WeixinJSBridge: any;

declare namespace window {
  const __wxjs_environment: any;
  const sessionStorage: any;
  const innerWidth: any;
}

@Component({
  selector: 'app-pay-method',
  templateUrl: './pay-method.component.html',
  styleUrls: ['./pay-method.component.scss']
})
export class PayMethodComponent implements OnInit {
  // 车辆信息
  car: Car;

  // 搜索信息
  search_data: SearchCarData;

  // 天数
  days: number;

  // 订单相应信息
  order_res;

  // 控制支付弹窗和弹窗的提示内容
  payAlert = {
    show: false,
    text: '支付宝'
  }

  // 选中的支付方式
  selectedMethod: string;

  // 生成的链接
  pay_url: string;

  // 是否是微信浏览器
  inWeChat: boolean;

  // prepay_id
  prepay_id: string;

  // 倒计时
  discount: string | null;

  constructor(private wxService: WxBrowserService, private routeInfo: ActivatedRoute, private orderServe$: PlaceOrderService, private router: Router) {
    this.inWeChat = isWeixin();
    /*
     微信接口权限配置，以后可能会有用
    this.router.events.subscribe(evt => {
      if (evt instanceof NavigationEnd) {
        if (!this.inWeChat) return;

          // 获取acess_token
          this.wxService.getAcessToken().then(token => {
            // console.log('access_token' + token);
            if (token.access_token) {
              // 获取ticket
              this.wxService.getTicket(token.access_token).then(ticket => {
                // console.log('ticket' + token);
                if (ticket.errcode === 0) { // 获取ticket成功
                  // 获取签名
                  const timestamp = new Date().getTime().toString().substr(0, 10);
                  const nonceStr = Math.random().toString();
                  const url  = location.href;

                  const params: ParamsOfSignature = {
                    noncestr: nonceStr,
                    jsapi_ticket: ticket.ticket,
                    timestamp: timestamp,
                    url: url
                  }


                  this.wxService.getSignature(params).then(sign => {
                    // console.log(sign);
                    wx.config({
                      debug: false,
                      appId: APPID,
                      timestamp: timestamp,
                      nonceStr: nonceStr,
                      signature: sign,
                      jsApiList: ['chooseWXPay']
                    });
                  });
                }
              });
            }
          });
      }
    });*/
  }

  ngOnInit() {
    this.routeInfo.data.subscribe(data => {
      [this.car, this.search_data, this.order_res] = [data.method.car, data.method.search_data, data.method.order_res];
      this.days = differenceInDays(this.search_data.endDate.replace(/-/g, '/'), this.search_data.beginDate.replace(/-/g, '/'));
      // console.log(this.order_res);
      if (this.order_res.order_status === '付尾款' && this.order_res.discount) {
        let time = this.order_res.discount * 1000;
        this.discount = countDown(time);
        const timer = setInterval(() => {
          if (time > 1000) {
            time = time - 1000;
            this.discount = countDown(time);
          }else {
            clearInterval(timer);
            this.discount = null;
          }
        }, 1000);
      }
    });
  }

  // 选择支付方式
  payMethod(type: string) {
    if (this.selectedMethod === type) return;
    this.selectedMethod = type;

    if (this.inWeChat) {  // 微信内浏览器
      const openid = window.sessionStorage.getItem('openid');

      if (openid) {
        // 获取prepay_id
        const parmas: ParamsOfPay = {
          order_no: this.order_res.order_no,
          pay_type: 'jsapi',
          order_type: 'vehicle',
          openid: openid
        }


        this.wxService.getPrepayId(parmas).then(res => this.prepay_id = res);
      }else {
        alert('无openid');
        return;
      }
    }else { // h5浏览器
      let payType = '';
      if (type === 'wxpay') {
        payType = this.inWeChat ? 'code' : 'h5';
      }else {
        payType = window.innerWidth > 760 ? 'page' : 'wap';
      }

      const parmas: ParamsOfPay = {
        order_no: this.order_res.order_no,
        pay_type: payType,
        order_type: 'vehicle'
      }

      this.orderServe$.getPayUrl(parmas, type).subscribe(url => this.pay_url = url);
    }
  }



  // 处理微信环境的支付
  pay() {
    if (!this.selectedMethod) {
      alert('请选择支付方式');
      return;
    }

    if (this.inWeChat && this.prepay_id) {
      // console.log(this.prepay_id);
      const appid = window.__wxjs_environment === 'miniprogram' ? APPID_WECHAT : APPID;
      const timestamp = new Date().getTime().toString().substr(0, 10);
      const nonceStr = Math.random().toString();
      const myPackage = 'prepay_id=' + this.prepay_id;
      const signType = 'MD5';
      const key = KEY;


      const params = {
        'appId': appid,
        'timeStamp': timestamp,
        'nonceStr': nonceStr,
        'package': myPackage,
        'signType': signType
      }

      // console.log(appid);

      const stringA = `appId=${appid}&nonceStr=${nonceStr}&package=${myPackage}&signType=${signType}&timeStamp=${timestamp}`;
      const stringSignTemp = stringA + '&key=' + key;
      const str = Md5.hashStr(stringSignTemp);
      let sign = '';
      for (let a = 0; a < str.length; a++) {
        sign += str[a];
      }
      const paySign = sign.toUpperCase();

      Object.assign(params, {'paySign': paySign});
      // console.log(params);

      // 是否在小程序中
      /*if (window.__wxjs_environment === 'miniprogram') {
        const modeStr = JSON.stringify(params);
        const mode64 = base64.encode(modeStr);
        const modeEncode = encodeURIComponent(mode64);

        console.log('appid = ' + appid);

        wx.miniProgram.navigateTo({
          url: '/pages/pay/pay?params=' + modeEncode
        });
      }else {
        WeixinJSBridge.invoke('getBrandWCPayRequest', params, res => {
          console.log(JSON.stringify(res));
          // console.log(res.err_msg);
        });
      }*/
      WeixinJSBridge.invoke('getBrandWCPayRequest', params, res => {
        console.log(JSON.stringify(res));
        // console.log(res.err_msg);
      });
    }
    this.payAlert.show = true;
    this.payAlert.text = this.selectedMethod === 'wxpay' ? '微信' : '支付宝';
  }


  // 点击支付完成
  payComplate(id: number): void {
    // 查询该订单状态
    this.orderServe$.get_SingleOrder(id).subscribe(res => {
      // console.log(res);
      if (res.order_status !== 'deposit') {
        const parmas = {
          order_id: res.id,
          order_status: res.order_status,
          car_id: res.vehicle,
          pick_branch_id: res.pick_branch,
          drop_branch_id: res.drop_branch,
          start_date: res.start_date,
          end_date: res.end_date
        }
        this.router.navigate(['/pay-complete', parmas]);
      }else {
        alert('定金支付失败');
      }
    }, error => {
      console.log(error);
      alert('定金支付失败');
    });
  }
}
