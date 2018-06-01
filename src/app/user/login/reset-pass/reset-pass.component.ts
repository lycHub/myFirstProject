import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ResetPassParma, UserService} from '../../../service/member/user';
import {ActivatedRoute} from '@angular/router';
import {validPassRroup, validPhone} from '../../../util/validator';
import {CommonService} from '../../../service/common.service';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.scss']
})
export class ResetPassComponent implements OnInit, OnDestroy {
  // 控制加载中
  showLoading = false;


  // 控制验证码按钮
  codeBtnStatus = {
    disabled: false,
    label: '获取验证码'
  }

// 控制验证码输入控件
  codeStatus = true;

  // 目标页类型
  targetPageType: string;

  source_path: string;

  formModel: FormGroup;

  // pass不能有空格
  static validPass(c: FormControl): {[key: string]: any} | null {
    return /\s+/g.test(c.value) ? {pass: {errorMsg: '密码不能有空格'}} : null;
  }


  constructor(private fb: FormBuilder, private commonServe: CommonService, private routeInfo: ActivatedRoute, private userServe$: UserService) {
    this.targetPageType = this.routeInfo.snapshot.paramMap.get('loginTo') ? this.routeInfo.snapshot.paramMap.get('loginTo') : '/person-center';
    this.source_path = this.routeInfo.snapshot.paramMap.get('from') ? this.routeInfo.snapshot.paramMap.get('from') : '/main';

    this.formModel = this.fb.group({
      username: ['', validPhone],
      code: ['', Validators.maxLength(6)],
      newPass: this.fb.group({
        pwd1: ['', ResetPassComponent.validPass],
        pwd2: ['', ResetPassComponent.validPass]
      }, {validator: validPassRroup})
    });
  }

  ngOnInit() {

  }

  // 获取验证码
  getCode() {
    if (this.formModel.get('username').valid && !this.codeBtnStatus.disabled) {
      this.userServe$.getMobileCode(this.formModel.get('username').value).subscribe(code => {
        // console.log(code);
        if (code) { // 收到验证码
          this.codeStatus = false;
          this.codeBtnStatus.disabled = true;

          let sec = 60;

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
        alert('验证码获取失败');
      });
    }
  }

  onSubmit(evt): void {
    evt.preventDefault();
    if (this.formModel.valid) {

      this.showLoading = true;

      // 先调保存密码的接口
      const resetParma: ResetPassParma = {
        mobile: this.formModel.get('username').value.toString(),
        code: this.formModel.get('code').value,
        pwd1: this.formModel.get('newPass').value.pwd1,
        pwd2: this.formModel.get('newPass').value.pwd2
      }


      this.userServe$.resetpass(resetParma).subscribe(result => {
        if (result.code === 'success') {   // 重置成功调login接口登录
          this.commonServe.login({
            username: this.formModel.get('username').value,
            password: this.formModel.get('code').value
          }, this.targetPageType, this.source_path);
        }else {
          alert(result.msg);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.showLoading = true;
    document.documentElement.style.overflowY = document.body.style.overflowY = 'auto';
  }
}
