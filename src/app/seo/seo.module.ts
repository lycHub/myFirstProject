import { NgModule } from '@angular/core';
import {ShareModule} from "../share/share.module";
import {SeoRoutingModule} from "./seo-routing.module";
import { ArticleListComponent } from './article-list/article-list.component';
import { SeoHeaderComponent } from './public-components/seo-header/seo-header.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';

@NgModule({
  imports: [
    ShareModule,
    SeoRoutingModule
  ],
  declarations: [ArticleListComponent, SeoHeaderComponent, ArticleDetailComponent]
})
export class SeoModule { }
