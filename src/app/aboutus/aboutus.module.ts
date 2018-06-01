import { NgModule } from '@angular/core';
import { AboutusComponent } from './aboutus/aboutus.component';
import {AboutusRoutingModule} from "./about-routing.module";
import {ShareModule} from "../share/share.module";
import { BusinessComponent } from './common-component/business/business.component';
import { AboutDetailComponent } from './about-detail/about-detail.component';

@NgModule({
  imports: [
    ShareModule,
    AboutusRoutingModule
  ],
  declarations: [AboutusComponent, BusinessComponent, AboutDetailComponent]
})
export class AboutusModule { }
