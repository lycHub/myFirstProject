import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ArticleListComponent} from "./article-list/article-list.component";
import {ArticleDetailComponent} from "./article-detail/article-detail.component";
import {SeoArticleListResolver} from "./router-guard/article-list.resolve";
import {SeoArticleDetailResolver} from "./router-guard/article-detail.resolve";
const seoRoutes: Routes = [
  {path: '', component: ArticleListComponent, data: {title: '文章'},  resolve: {articleList: SeoArticleListResolver}},
  {path: 'news-detail/:id', component: ArticleDetailComponent, data: {title: '文章详情'}, resolve: {article: SeoArticleDetailResolver}}
]

@NgModule({
  imports: [RouterModule.forChild(seoRoutes)],
  exports: [RouterModule],
  providers: [SeoArticleListResolver, SeoArticleDetailResolver]
})

export class SeoRoutingModule {}
