import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import {MainRoutingModule} from "./main-routing.module";
import {ShareModule} from "../share/share.module";

@NgModule({
  imports: [
    ShareModule,
    MainRoutingModule
  ],
  declarations: [MainComponent]
})
export class MainModule { }
