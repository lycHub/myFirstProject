import {FindAreaService} from './area/find-area.service';
import {NgModule} from '@angular/core';
import {SearchCarService} from './car/search-car/search-car.service';
import {CarConfigService} from './car/car-config/car-config.service';
import {CarInfoService} from './car/car-info/car-info.service';
import {CompanyService} from './company/company-list.service';
import {BranchService} from './company/branch-list.service';
import {PackageService} from './car/car-packages';
import {UserService} from './member/user';
import {CommonService} from './common.service';
import {PlaceOrderService} from './order/place-order.service';
import {AboutusService} from "./aboutus/aboutus.service";
import {WxBrowserService} from "./wxBrowser/wx-browser.service";
import {GuideService} from "./guide/guide.service";
import {CarousalService} from "./main/carousal.service";
import {RoutingStateService} from "./routing-state.service";
import {SeoService} from "./seo/seo.service";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

@NgModule()
export class ServiceModule {
  static forRoot() {
    return {
      ngModule: ServiceModule,
      providers: [
        CarousalService,
        FindAreaService,
        SearchCarService,
        CarConfigService,
        CarInfoService,
        CompanyService,
        BranchService,
        PackageService,
        UserService,
        PlaceOrderService,
        AboutusService,
        WxBrowserService,
        GuideService,
        SeoService,
        CommonService,
        RoutingStateService
      ]
    };
  }
}
