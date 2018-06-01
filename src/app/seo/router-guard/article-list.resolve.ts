import {
  ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Resolve, Router,
  RouterStateSnapshot
} from "@angular/router";
import {Injectable} from "@angular/core";
import {SeoService} from "../../service/seo/seo.service";
import {FriendlyLink, SeoArticleList} from "../../service/seo/seo.model";
import {map, mergeMap} from "rxjs/operators";
import {Title} from "@angular/platform-browser";

@Injectable()
export class SeoArticleListResolver implements Resolve<any> {
  constructor(private router: Router, private seoServe: SeoService, private routerInfo: ActivatedRoute, private titleService: Title) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<[FriendlyLink, SeoArticleList]> {
    this.seoServe.getTitle().then(res => {
      //设置title
      this.router.events
        .filter(event => event instanceof NavigationEnd)
        .pipe(map(() => this.routerInfo), map(navgate => {
          while (route.firstChild) navgate = navgate.firstChild;
          return navgate;
        }), mergeMap(navgate => navgate.data)).subscribe(event => this.titleService.setTitle(res[0].title));
    })


    return Promise.all([
      this.seoServe.getFriendlyLink(),
      this.seoServe.getArticles()
    ]).catch(error => {
      console.log(error);
      this.router.navigate(['/main']);
      return null;
    });
  }
}
