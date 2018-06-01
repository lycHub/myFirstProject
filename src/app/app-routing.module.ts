import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const appRoutes: Routes = [
   //{path: '', redirectTo: '/main', pathMatch: 'full'},
   {path: 'main', loadChildren: 'app/main/main.module#MainModule'},
   {path: 'carlist', loadChildren: 'app/car/car.module#CarModule'},
   {path: 'pay-method', loadChildren: 'app/payment/payment.module#PaymentModule'},
   {path: 'about', loadChildren: 'app/aboutus/aboutus.module#AboutusModule'},
   {path: 'guide', loadChildren: 'app/guide/guide.module#GuideModule'},
   {path: 'news', loadChildren: 'app/seo/seo.module#SeoModule'},
   {path: 'activity', loadChildren: 'app/activity/activity.module#ActivityModule'},
   {path: '**',  redirectTo: '/main'}
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
