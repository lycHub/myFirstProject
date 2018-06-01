import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SeoArticleDetail} from "../../service/seo/seo.model";
import {SeoService} from "../../service/seo/seo.service";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit, OnDestroy {
  // 当前文章
  articles: SeoArticleDetail;

  // 阻止快速切换文章
  private canChange = true;

  // 控制加载中
  showLoading = false;

  private doc: Document;

  constructor(private routerInfo: ActivatedRoute,  private seoServe: SeoService, @Inject(DOCUMENT) doc: Document) {
    this.doc = doc;
    this.routerInfo.data.subscribe((res: {title: string; article: SeoArticleDetail}) => this.articles = res.article);
  }
  ngOnInit() {

  }

  // 切换文章
  changeArticle(evt): void {
    const id = Number.parseInt(evt.target.dataset.id);
    if (!id || !this.canChange) return;
    this.canChange = false;
    this.seoServe.getArticle(id).then(res => {
      this.articles = res;
      this.canChange = true;
    });
  }

  ngOnDestroy(): void {
    this.showLoading = false;
    this.doc.documentElement.style.overflowY = 'auto';
  }
}
