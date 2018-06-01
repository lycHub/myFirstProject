import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {validPhone} from '../../../util/validator';
import {ActivatedRoute} from '@angular/router';
import {CommonService} from '../../../service/common.service';
import {UserService} from '../../../service/member/user';
import {Subscription} from "rxjs/Subscription";
import {fromEvent} from "rxjs/observable/fromEvent";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-login-phone',
  templateUrl: './login-phone.component.html',
  styleUrls: ['./login-phone.component.scss']
})
export class LoginPhoneComponent implements OnInit, OnDestroy {
  // 控制加载中
  showLoading = false;


  // 控制验证码按钮
  codeBtnStatus = {
    disabled: false,
    label: '获取验证码'
  }

  // 控制验证码输入控件
  codeStatus = false;

  // 目标页类型
  targetPageType: string;

  // 来源路径
  source_path: string;

  formModel: FormGroup;

  // 返回loading
  private back$: Subscription;

  private doc: Document;
  constructor(@Inject(DOCUMENT) doc: any, private fb: FormBuilder, private commonServe: CommonService, private routeInfo: ActivatedRoute, private userServe$: UserService) {
    this.doc = doc;
    this.targetPageType = this.routeInfo.snapshot.paramMap.get('loginTo') ? this.routeInfo.snapshot.paramMap.get('loginTo') : '/person-center';
    this.source_path = this.routeInfo.snapshot.paramMap.get('from') ? this.routeInfo.snapshot.paramMap.get('from') : '/main';

    this.formModel = this.fb.group({
      username: ['', validPhone],
      code: ['', Validators.maxLength(6)]
    });
  }

  ngOnInit() {
    if (!this.back$) {
      this.back$ = fromEvent(window, 'popstate').subscribe(e => this.showLoading = true);
    }
  }

  // 获取验证码
  getCode() {
    if (this.formModel.get('username').valid && !this.codeBtnStatus.disabled) {
      this.userServe$.getMobileCode(this.formModel.get('username').value).subscribe(code => {
        // console.log(code);
        if (code) { // 收到验证码
          this.codeStatus = this.codeBtnStatus.disabled = true;

          let sec = 60;
          this.codeBtnStatus.label = sec + '秒后重新获取';

          const interval = setInterval(() => {
            if (sec-- > 0) {
              this.codeBtnStatus.label = sec + '秒后重新获取';
            }else {
              [this.codeBtnStatus.disabled, this.codeBtnStatus.label] = [false, '获取验证码'];
              clearInterval(interval);
            }
          }, 1000);
        }
      }, error => {
        console.log(error);
        alert('验证码获取过于频繁，建议60秒后再次获取');
      });
    }
  }

  // 提交登录
  onSubmit(evt): void {
    evt.preventDefault();
    if (this.formModel.valid) {
      this.showLoading = true;
      this.commonServe.regist({
        username: this.formModel.get('username').value,
        password: this.formModel.get('code').value
      }, this.targetPageType, this.source_path);
    }
  }

  ngOnDestroy(): void {
    this.showLoading = false;
    this.back$.unsubscribe();
    this.doc.documentElement.style.overflowY = this.doc.body.style.overflowY = 'auto';
  }
}
