// 一级分类
export interface GuideCategory {
  id: number;
  name: string;
  sub_cat: GuideCategorySecond[];
}


// 二级分类
export interface GuideCategorySecond {
  id: number;
  name: string;
  desc: string;
}


// 搜索结果返回
export interface GuideSearchResult {
  parent_cat: number;   // tabid
  category: number;     // 二级id
  sn: number;
  title: string;
  country_id: number;
}
