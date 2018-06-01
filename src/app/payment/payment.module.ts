import { NgModule } from '@angular/core';
import {PaymentRoutingModule} from './payment-routing.module';
import {ShareModule} from '../share/share.module';
import { PayMethodComponent } from './pay-method/pay-method.component';
import { PayCompleteComponent } from './pay-complete/pay-complete.component';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/zip';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

@NgModule({
  imports: [
    ShareModule,
    PaymentRoutingModule
  ],
  declarations: [PayMethodComponent, PayCompleteComponent]
})
export class PaymentModule { }
