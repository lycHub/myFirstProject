import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ActivityComponent} from "./activity/activity.component";

const activityRoutes: Routes = [
  {path: '', component: ActivityComponent, data: {title: '活动'}}
]

@NgModule({
  imports: [RouterModule.forChild(activityRoutes)],
  exports: [RouterModule]
})

export class ActivityRoutingModule {}
