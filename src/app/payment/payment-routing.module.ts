import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PayMethodComponent} from './pay-method/pay-method.component';
import {PayCompleteComponent} from './pay-complete/pay-complete.component';
import {PayMethodResolver} from './router-guard/pay-method-resolve';
import {PayCompleteResolver} from './router-guard/pay-complete-resolve';


const paymentRoutes: Routes = [
  {path: '', component: PayMethodComponent, data: {title: '选择支付方式'}, resolve: {method: PayMethodResolver}},
  {path: 'pay-complete', component: PayCompleteComponent, data: {title: '支付成功'}, resolve: {order_status: PayCompleteResolver}}
]

@NgModule({
  imports: [RouterModule.forChild(paymentRoutes)],
  exports: [RouterModule],
  providers: [PayMethodResolver, PayCompleteResolver]
})
export class PaymentRoutingModule { }
