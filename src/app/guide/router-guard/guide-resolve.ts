import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {GuideService} from "../../service/guide/guide.service";
import {FindAreaService} from "../../service/area/find-area.service";

@Injectable()
export class GuideResolver implements Resolve<any> {
  constructor(private router: Router, private guideServe: GuideService, private areaServe: FindAreaService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const country$ = this.areaServe.getCountries();
    const guideCategory$ = this.guideServe.getGuideCategory();



    return Observable.combineLatest(country$, guideCategory$, (country, guide) => {
      return {country, guide};
    }).catch(error => {
      console.log(error);
      this.router.navigate(['/main']);
      return null;
    });
  }
}
