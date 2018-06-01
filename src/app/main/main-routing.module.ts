import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainComponent} from "./main.component";
import {AreaResolver} from '../common-resolve/area-resolve';

const mainRoutes: Routes = [{path: '', component: MainComponent, data: {title: '环球房车'}, resolve: {areas: AreaResolver}}];

@NgModule({
  imports: [ RouterModule.forChild(mainRoutes)],
  exports: [RouterModule],
  providers: [AreaResolver]
})

export class MainRoutingModule { }
