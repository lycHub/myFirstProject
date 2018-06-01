// 友情链接
export interface FriendlyLink {
  id: number;
  sn: number;
  name: string;
  url: string;
  mtime: string;
  ctime: string;
}


// seo返回的文章数据
export interface SeoArticleList {
  count: number;
  next: string | null;
  previous: string | null;
  results: SeoArticle[];
}

// 每篇文章
export interface SeoArticleDetail {
  before: { title: string; id: number; };
  seo_word: SeoArticle;
  after: { title: string; id: number; };
}


interface SeoArticle {
  id: number;
  main_pic: string;
  title: string;
  content: string;
  mtime: string;
  ctime: string;
  username: string;
  abstract: string;
}
