import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {GuideComponent} from "./guide/guide.component";
import {GuideResolver} from "./router-guard/guide-resolve";
const carRoutes: Routes = [
   {path: '', component: GuideComponent, data: {title: '指南'}, resolve: {guide: GuideResolver}}
 ]

 @NgModule({
   imports: [RouterModule.forChild(carRoutes)],
   exports: [RouterModule],
   providers: [GuideResolver]
 })

 export class GuideRoutingModule {}

