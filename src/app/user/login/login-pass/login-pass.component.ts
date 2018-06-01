import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {validPhone} from '../../../util/validator';
import {CommonService} from '../../../service/common.service';
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-login-pass',
  templateUrl: './login-pass.component.html',
  styleUrls: ['./login-pass.component.scss']
})
export class LoginPassComponent implements OnInit, OnDestroy {
  // 控制加载中
  showLoading = false;


// 保存登陆后的去向
  loginTo: string;

  source_path: string;

  formModel: FormGroup;

  private doc: Document;

  constructor(@Inject(DOCUMENT) doc: any, private routeInfo: ActivatedRoute, private fb: FormBuilder, private commonServe: CommonService) {
    this.doc = doc;
    this.loginTo = this.routeInfo.snapshot.paramMap.get('loginTo') ? this.routeInfo.snapshot.paramMap.get('loginTo') : '/person-center';
    this.source_path = this.routeInfo.snapshot.paramMap.get('from') ? this.routeInfo.snapshot.paramMap.get('from') : '/main';
  }

  ngOnInit() {
    this.formModel = this.fb.group({
      username: [null, validPhone],
      password: [null, Validators.required]
    });
  }

  onSubmit(evt) {
    evt.preventDefault();
   // console.log(this.formModel.value);
    if (this.formModel.valid) {
      this.showLoading = true;
      if (this.formModel.valid) {
        // 登陆接口
        this.commonServe.login({
          username: this.formModel.get('username').value,
          password: this.formModel.get('password').value
        }, this.loginTo, this.source_path);
      }
    }
  }

  ngOnDestroy(): void {
    this.showLoading = true;
    this.doc.documentElement.style.overflowY = this.doc.body.style.overflowY = 'auto';
  }
}
