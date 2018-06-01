import {Component, EventEmitter, Inject, Input, OnDestroy, Output} from '@angular/core';
import {Router} from '@angular/router';
import {SearchCarData} from "../search-car/search-car.component";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-search-info',
  templateUrl: './search-info.component.html',
  styleUrls: ['./search-info.component.scss']
})
export class SearchInfoComponent implements OnDestroy {
  // 控制加载中
  showLoading = false;

  // 控制中间部分的内容
  @Input() pageType = 'car';

  //当pageType !== car时，显示的内容
  @Input() text: string;

  @Input() city_data: SearchCarData;

  // 发射打开搜索表单的事件
  @Output() _emitOpenSearchForm: EventEmitter<boolean> = new EventEmitter();

  // 返回的路径
  @Input() private backToPath: string;

  private doc: Document;

  constructor(@Inject(DOCUMENT) doc: any, private router: Router) {
    this.doc = doc;
  }

  // 发射打开搜索表单的事件
  openSearchForm(): void {
    this._emitOpenSearchForm.emit(true);
  }

  // 进入个人中心
  login(type: string = '/person-center') {
    // 如果有token,就进入个人中心，否则进入手机登录
    if (window.sessionStorage.getItem('token')) {
      // console.log(1);
      this.showLoading = true;
      this.router.navigate(['/person-center', {source_path: this.router.url}]);
    }else {
      // console.log(2);
      this.router.navigate(['/login-phone', {loginTo: type, from: this.router.url}]);
    }
  }

  // 返回
  back() {
    this.showLoading = true;
    if (this.backToPath) {
      this.router.navigate([this.backToPath]);
    }else {
     history.back();
    }
    // this.router.navigate([this])
  }

  ngOnDestroy(): void {
    this.showLoading = false;
    this.doc.documentElement.style.overflowY = 'auto';
  }
}
