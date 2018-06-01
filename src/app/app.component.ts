import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {isIncludes, isWeixin} from "./util/public_fn";
import {WxBrowserService} from "./service/wxBrowser/wx-browser.service";
import {map, mergeMap} from "rxjs/operators";

declare const FastClick: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  //控制底部
  showFooter = true;

  // 控制loading
  showLoading = false;

  constructor(private wxService: WxBrowserService, private titleService: Title, private router: Router, private routeInfo: ActivatedRoute) {
    if (isWeixin()) {
      // alert('14:35' + window.sessionStorage.getItem('openid'));
      if (window.sessionStorage.getItem('openid') !== null) return;
      // alert('14:35' + window.sessionStorage.getItem('openid'));

      const url = location.href;

      this.wxService.getWxUrl().then(res => {
        if (res.code === 'success') {
          const hasParmas = /(\?|&)(code=)+/.test(url);
          if (hasParmas) {
            // console.log('网址：' + url);
            const parma = url.split('?')[1];
            this.wxService.getOpenid(parma).then(token => {
              // 保存openid
              window.sessionStorage.setItem('openid', token.openid);
            });
          }else {
            // console.log(res.url);
            location.href = res.url;
          }
        }
      });
    }
  }
  ngOnInit(): void {
    //应该隐藏底部的路由
    const urlForHideFooter = ['car-detail', 'write-order', 'activity'];

    this.router.events.filter(evt => evt instanceof NavigationEnd)
      .map(_ => this.router.url).subscribe(url => this.showFooter = !urlForHideFooter.some(item => isIncludes(url, item)));




    //设置title
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .pipe(map(() => this.routeInfo), map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }), mergeMap(route => route.data))
      .subscribe(event => this.titleService.setTitle(event['title']));


    // 顶部滚动条置顶
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

    // fastclick
    FastClick.attach(document.body);
  }
}
