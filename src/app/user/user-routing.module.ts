import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {LoginPhoneComponent} from './login/login-phone/login-phone.component';
import {LoginPassComponent} from './login/login-pass/login-pass.component';
import {ResetPassComponent} from './login/reset-pass/reset-pass.component';
import {PersonCenterComponent} from './personal/person-center/person-center.component';
import {PersonCenterResolver} from './router-guard/person-center-resolve';
import {OrderDetailComponent} from './personal/order-detail/order-detail.component';
import {OrderDetailResolver} from './router-guard/order-detail-resolve';
import {LoginGuard} from "./router-guard/login-canactivate";

const userRoutes: Routes = [
  {path: 'login-phone', component: LoginPhoneComponent, data: {title: '手机登录'}, canActivate: [LoginGuard]},
  {path: 'login-pass', component: LoginPassComponent, data: {title: '密码登录'}, canActivate: [LoginGuard]},
  {path: 'reset-pass', component: ResetPassComponent, data: {title: '重设密码'}, canActivate: [LoginGuard]},
  {path: 'person-center', component: PersonCenterComponent, data: {title: '个人中心'}, resolve: {orderList: PersonCenterResolver}},
  {path: 'order-detail/:id', component: OrderDetailComponent, data: {title: '订单详情'}, resolve: {order: OrderDetailResolver}}
]

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule],
  providers: [PersonCenterResolver, OrderDetailResolver, LoginGuard]
})

export class UserRoutingModule {}
