import { NgModule, Optional, SkipSelf} from '@angular/core';
import {MainModule} from "../main/main.module";
import {AppRoutingModule} from "../app-routing.module";
import {ShareModule} from "../share/share.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import {CarModule} from "../car/car.module";
import {PaymentModule} from '../payment/payment.module';
import {UserModule} from '../user/user.module';
import {ServiceModule} from '../service/service.module';
import {OrderInterceptor} from '../http-interceptor/order-interceptor';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AboutusModule} from "../aboutus/aboutus.module";
import {GuideModule} from "../guide/guide.module";
import {SeoModule} from "../seo/seo.module";
import {ActivityModule} from "../activity/activity.module";

@NgModule({
  imports: [
    HttpClientModule,
    ShareModule,
    MainModule,
    CarModule,
    PaymentModule,
    UserModule,
    AboutusModule,
    GuideModule,
    SeoModule,
    ActivityModule,
    ServiceModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  declarations: [FooterComponent],
  exports: [
    ShareModule,
    FooterComponent
  ],
  providers: [
    // {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: 'CommentApi', useValue: {
      uri: 'https://www.hqrvs.cn/api/'
    }},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: OrderInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parent: CoreModule) {
    if (parent) {
      throw new Error('模块已存在!');
    }
  }
}
