import {Component, Input, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from "rxjs/Subscription";
import {fromEvent} from "rxjs/observable/fromEvent";

@Component({
  selector: 'app-person-header',
  template: `<div class="header">
  <h2>{{title}}</h2>
  <span (click)="back()">&lt;</span>
</div>
  <!--加载中-->
  <hq-spin [hqShow]="showLoading"></hq-spin>`,
  styleUrls: ['./person-header.component.scss']
})
export class PersonHeaderComponent implements OnDestroy {
  // title内容
  @Input() title: string;

  // 点击返回 目标页的路径
  @Input() back_path: string;

  // 返回loading
  private back$: Subscription;

  // 控制加载中
  showLoading = false;
  constructor(private router: Router) {
    if (!this.back$) {
      this.back$ = fromEvent(window, 'popstate').subscribe(e => this.showLoading = true);
    }
  }

  // 返回
  back() {
    if (this.back_path) {
      this.showLoading = true;
      this.router.navigate([this.back_path]);
    }else {
      history.back();
    }

  }

  ngOnDestroy(): void {
    this.showLoading = false;
    this.back$.unsubscribe();
  }
}
