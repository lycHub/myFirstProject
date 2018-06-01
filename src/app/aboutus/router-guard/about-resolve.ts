import {
  ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Resolve, Router,
  RouterStateSnapshot
} from "@angular/router";
import {Injectable} from "@angular/core";
import {AboutDetail, AboutusService} from "../../service/aboutus/aboutus.service";
import {map, mergeMap} from "rxjs/operators";
import {Title} from "@angular/platform-browser";

enum AboutType {
  'us' = '关于我们',
  'law' = '法律声明'
}

@Injectable()
export class AboutResolver implements Resolve<any> {
  constructor(private routerInfo: ActivatedRoute, private router: Router, private aboutServe$: AboutusService, private titleService: Title) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<AboutDetail> {
    const type = route.paramMap.get('type') || 'us';

    //设置title
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .pipe(map(() => this.routerInfo), map(navgate => {
        while (route.firstChild) navgate = navgate.firstChild;
        return navgate;
      }), mergeMap(navgate => navgate.data))
      .subscribe(event => this.titleService.setTitle(AboutType[type]));

    return new Promise((resolve, reject) => {
      this.aboutServe$.getAboutUs().then(res => {
        const detail = res.find(item => item.title === AboutType[type]);
        resolve(detail);
      }).catch(error => {
        reject(error);
        this.router.navigate(['/about']);
        return null;
      });
    });
  }
}
