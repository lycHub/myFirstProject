import { NgModule } from '@angular/core';
import { GuideComponent } from './guide/guide.component';
import {ShareModule} from "../share/share.module";
import {GuideRoutingModule} from "./guide-routing.module";
import { CountryComponent } from './public-components/country/country.component';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/catch';
import { SearchlistComponent } from './public-components/searchlist/searchlist.component';

@NgModule({
  imports: [
    ShareModule,
    GuideRoutingModule
  ],
  declarations: [GuideComponent, CountryComponent, SearchlistComponent]
})
export class GuideModule { }
