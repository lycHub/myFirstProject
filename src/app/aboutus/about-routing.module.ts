import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AboutusComponent} from "./aboutus/aboutus.component";
import {AboutDetailComponent} from "./about-detail/about-detail.component";
import {AboutResolver} from "./router-guard/about-resolve";
const aboutRoutes: Routes = [
  {path: '', component: AboutusComponent, data: {title: '关于环球房车'}, children: [
    {path: 'aboutus/:type', component: AboutDetailComponent, resolve: {about: AboutResolver}}
  ]}
]

@NgModule({
  imports: [RouterModule.forChild(aboutRoutes)],
  exports: [RouterModule],
  providers: [AboutResolver]
})

export class AboutusRoutingModule {}
