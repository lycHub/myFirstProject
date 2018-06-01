import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FriendlyLink, SeoArticleList} from "../../service/seo/seo.model";
import {SeoService} from "../../service/seo/seo.service";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit, OnDestroy {
  // 面包屑导航文字
  hqTxts = [{
    label: '首页',
    path: '/'
  }, {
    label: '房车租赁预订',
    path: '/'
  }, {
    label: '房车租赁常见问题',
    path: '/news'
  }];

  // 友情链接
  friendlyLink: FriendlyLink;

  // 文章数据
  articles: SeoArticleList;

  // 当前页
  currentPage = 1;

  // 总页数
  totalPage: number;

  // 每页数量
  pageSize: number;

  // 控制加载中
  showLoading = false;

  private doc: Document;

  constructor(private routerInfo: ActivatedRoute, private seoServe: SeoService, @Inject(DOCUMENT) doc: Document) {
    this.doc = doc;

    this.routerInfo.data.subscribe((res: {title: string; articleList: [FriendlyLink, SeoArticleList]}) => {
      [this.friendlyLink, this.articles] = [res.articleList[0], res.articleList[1]];

      this.pageSize = this.articles.results.length;

      this.totalPage = Math.ceil(this.articles.count / this.pageSize);
    });
  }

  ngOnInit() {}

  // 改变页码
  changePage(evt: number) {
    this.seoServe.getArticles(evt).then(res => {
      this.articles = res;
      this.totalPage = Math.ceil(this.articles.count / this.pageSize);
    });
  }


  // 友情链接trackby
  trackByLinks(friendlylink: FriendlyLink): number { return friendlylink.id; }


  ngOnDestroy(): void {
    this.showLoading = false;
    this.doc.documentElement.style.overflowY = 'auto';
  }
}
