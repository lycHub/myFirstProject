import { Injectable } from '@angular/core';
import {LoginParma, UserService} from './member/user';
import {Router} from '@angular/router';

@Injectable()
export class CommonService {

  constructor(private userServe$: UserService, private router: Router) { }
  // 注册登录
  regist(obj, loginTo: string = '/person-center', source_path: string = '/main'): void {

    const regParma = {
      username: obj.username,
      code: obj.password
    }

    // 先调注册user
    this.userServe$.register(regParma).subscribe(res => {
      // console.log(regParma);
      if (res.token) this.navigator(loginTo, res.token, regParma.username, source_path);
    }, error => {
      console.log(error);

      // 用户已存在调登录
      this.login(obj, loginTo, source_path);
    });
}

// 直接登录login
  login(obj: LoginParma, loginTarget: string, source_path: string): void {
    this.userServe$.login(obj).subscribe(res => {
      // console.log(obj);
      if (res.token) this.navigator(loginTarget, res.token, obj.username, source_path);
    }, fail => {
      console.log(fail);
      alert('登陆失败，请重试');
      location.reload();
    });
  }


// 登录或注册后跳转
  navigator(target_page: string, token: string, phone: number, source_path: string): void {
    // 保存token和手机号
    window.sessionStorage.setItem('token', token);
    window.sessionStorage.setItem('phone', phone.toString());
    this.router.navigate([target_page, {source_path}]);

   /* switch (type) { // 根据参数决定登陆后跳转到哪页
      case 'personCenter':
        this.router.navigate(['/person-center', {source_path: source_path}]);
        break;
      default:
        this.router.navigate(['/write-order']);
        break;
    }*/
  }
}
