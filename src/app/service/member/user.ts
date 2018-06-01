import {Inject, Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable()
export class UserService {
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient, @Inject('CommentApi') private api) { }

  // 捕获错误
  static handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  // 注册
  register(obj: RegisterParma): Observable<any> {
    const url = `${this.api.uri}user/`;
    return this.http.post(url, obj, {headers: this.headers}).catch(UserService.handleError);
  }

  // 登陆
  login(obj: LoginParma): Observable<{token: string}> {
    const url = `${this.api.uri}login/`;
    return this.http.post(url, obj, {headers: this.headers}).catch(UserService.handleError);
  }

  // 手机验证码
  getMobileCode(mobile): Observable<Code> {
    const url = `${this.api.uri}sms/`;
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const parmas = new HttpParams().set('mobile', mobile);
    return this.http.post(url, parmas.toString(), {headers: headers}).map(res => res as Code).catch(UserService.handleError);
  }

  // 重置密码
  resetpass(obj: ResetPassParma): Observable<{code: string; msg: string}> {
    const url = `${this.api.uri}change_password/`;
    const parmas = new HttpParams({fromString: `mobile=${obj.mobile}&code=${obj.code}&pwd1=${obj.pwd1}&pwd2=${obj.pwd2}`});
    return this.http.post(url, parmas).catch(UserService.handleError);
  }
}


export interface Code {
  mobile: number;
  code: number;
}


// 重置密码的参数模型
export interface ResetPassParma {
  mobile: string;
  code: string;
  pwd1: string;
  pwd2: string;
}


// 登录参数模型
export interface LoginParma {
  username: number;
  password: string;
}

// 注册参数模型
export interface RegisterParma {
  username: number;
  code: string;
}
