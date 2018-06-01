import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {SeoService} from "../../service/seo/seo.service";
import {SeoArticleDetail} from "../../service/seo/seo.model";
@Injectable()
export class SeoArticleDetailResolver implements Resolve<any> {
  constructor(private router: Router, private seoServe: SeoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<SeoArticleDetail> {
    const id = Number.parseInt(route.paramMap.get('id'));
    if (!id) {
      alert('请先选择文章！');
      this.router.navigate(['/news']);
    }else {
      return this.seoServe.getArticle(id).catch(error => {
        console.log(error);
        this.router.navigate(['/news']);
        return null;
      });
    }
  }
}
