import { NgModule } from '@angular/core';
import { ActivityComponent } from './activity/activity.component';
import {ActivityRoutingModule} from "./activity-routing.module";
import {ShareModule} from "../share/share.module";

@NgModule({
  imports: [
    ShareModule,
    ActivityRoutingModule
  ],
  declarations: [ActivityComponent]
})
export class ActivityModule { }
