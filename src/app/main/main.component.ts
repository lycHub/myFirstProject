import {AfterViewInit, Component, Inject, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {arrSort, swiper} from '../util/public_fn';
import {Carousal, CarousalService} from "../service/main/carousal.service";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnDestroy, AfterViewInit {
  // 控制加载中
  showLoading = false;

  // 轮播图
  carousal: Carousal[];

  private doc: Document;
  constructor(@Inject(DOCUMENT) doc: any, private router: Router, private carousalServe: CarousalService) {
    this.doc = doc;
  }

  // 进入个人中心
  login(type: string = '/person-center') {
    // 如果有token,就进入个人中心，否则进入手机登录
    if (window.sessionStorage.getItem('token')) {
      // console.log(1);
      this.showLoading = true;
      this.router.navigate(['/person-center', {source_path: '/main', from: '/main'}]);
    }else {
     // console.log(2);
      this.router.navigate(['/login-phone', {loginTo: type, from: '/main'}]);
    }
  }

  ngAfterViewInit(): void {
    this.carousalServe.getCarousal().then(res => {
      this.carousal = arrSort(res, 'sn');
      // console.log(this.carousal);

      setTimeout(() => {
        swiper('#mainCarousal', {
          loop: true,
          setWrapperSize : true,
          roundLengths : true,
          watchOverflow: true,
          runCallbacksOnInit : false,
          autoplay: true
        });
      }, 20);
    });
  }

  ngOnDestroy(): void {
    this.showLoading = false;
    this.doc.documentElement.style.overflowY = 'auto';
  }
}
