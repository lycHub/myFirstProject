import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GuideCategory, GuideSearchResult} from "../../service/guide/guide.model";
import {Country} from "../../service/area/area-interface";
import {GuideService} from "../../service/guide/guide.service";
import {arrSort} from "../../util/public_fn";

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.scss']
})
export class GuideComponent implements AfterViewInit {
  // tab样式
  tabStyle = {
    'width': '40px',
    'font-size': '12px',
    'color': '#fff'
  }

  // collapse样式
  collapseStyle = {
    'background-color': '#fcfcfc',
    'color': '#000',
    'font-size': '14px',
    'border-top': '1px solid #f2f2f2',
    'border-bottom': '1px solid #f2f2f2'
  }

  // 是否显示国家下拉列表
  showCountryList = false;

  // 国家下拉容器的高度
  trueHeight: number;

  // 国家
  countries: Country[];

  // 所有目录数据
  allCategory: GuideCategory[];

  // 一级目录
  tabs = [];

  // 当前tab
  currentTabId = 1;

  // 二级目录
  secondSort = [];

  // 控制二级目录的展开
  secondSortActive: boolean | null;

  // 当前展开的二级目录id
  currentSortId: number;

  // 当前国家
  currentCountry: Country;

  // 某二级目录下的具体问答
  questions;

  // 展开问题的sn
  sn_ques: number;

  // 用户的搜索词
  private keyWords: string;

  // 是否显示搜索列表
  showSearchList = false;

  // 搜索结果
  searchResult: GuideSearchResult[];

  // 国家下拉容器
  @ViewChild('coutrylist') coutrylist: ElementRef;

  constructor(private routeInfo: ActivatedRoute, private guideServe: GuideService) {
    this.routeInfo.data.subscribe(data => {
      this.countries = data.guide.country;
      this.currentCountry = this.countries.find(item => item.id === 1);

      this.allCategory = data.guide.guide;

      this.tabs = data.guide.guide.map(item => Object.assign(item, {active: item.id === 1}));

      this.secondSort = this.allCategory.filter(category => category.id === this.currentTabId)[0].sub_cat;

      this.currentSortId = this.secondSort[0].id;


      // 默认展开
      this.guideServe.getQuestions({
        category: this.currentSortId,
        country: this.currentCountry.id
      }).subscribe(res => {
        this.questions = arrSort(res.result, 'sn');
      });
    });
  }

  ngAfterViewInit(): void {
    if (this.coutrylist) {
      const children = this.coutrylist.nativeElement.children;
      this.trueHeight = children[0].offsetHeight * children.length;
    }
    // console.log(this.coutrylist.nativeElement.children[1].offsetHeight);
  }

  // 选择国家
  selectCountry(country: Country): void {
    if (country.id === this.currentCountry.id) {
      this.showCountryList = false;
      return;
    }

    this.currentCountry = country;

    this.showSearchList = false;

    this.sn_ques = null;

    this.secondSortActive = null;

    // 重置currentSortId
    this.currentSortId = -1;

    // 关闭列表
    this.showCountryList = false;
  }


  // 改变tab
  // sortId为需要展开的2级目录的id
  changeTab(tab, sortId?: number): void {
    // if (this.currentTabId === tab.id) return;
    // console.log(tab);
    this.sn_ques = null;
    this.currentTabId = tab.id;
    this.secondSort = this.allCategory.filter(category => category.id === this.currentTabId)[0].sub_cat;
    // console.log(this.secondSort);

    // 默认展开
    const secondIndex = sortId ? this.secondSort.findIndex(item => item.id === sortId) : 0;
    this.currentSortId = this.secondSort[secondIndex].id;
   // console.log(this.currentSortId);
    this.guideServe.getQuestions({
      category: this.currentSortId,
      country: this.currentCountry.id
    }).subscribe(res => {
      this.questions = arrSort(res.result, 'sn');
      // console.log(this.questions);
    });
  }


  // 选中某二级目录，展开问答
  selectSort(sortid: number): void {
    if (this.currentSortId === sortid) return;
    // 问题清空
    this.questions = null;

    this.currentSortId = sortid;
    console.log(this.currentSortId);
    // console.log(this.currentCountry.id);
    this.guideServe.getQuestions({
      category: sortid,
      country: this.currentCountry.id
    }).subscribe(res => this.questions = arrSort(res.result, 'sn'));
  }


  // 搜索框获取焦点
  onFocus(evt) {
    this.showSearchList = evt.target.value.length;
  }

  // 回车搜索
  search(evt): void {
    const target = evt.target;
    const val = target.value;
    this.showSearchList = val.length;

    if (val === this.keyWords || evt.keyCode !== 13) return;
    target.blur();
    this.keyWords = val;
    this.guideServe.getSearchResult(this.keyWords).subscribe(ques => {
      this.searchResult = ques.length > 0 ? ques : null;
      // console.log(this.searchResult);
      if (!this.searchResult) {
        alert('暂无结果');
        this.showSearchList = false;
      }else {
        this.showSearchList = true;
      }
    });
  }

  // 选中某搜索问题
  selectItem(ques: GuideSearchResult): void {
    this.showSearchList = false;
    this.tabs.map(item => item.active = item.id === ques.parent_cat);

    const currentTab = this.tabs.find(item => item.active);
    this.changeTab(currentTab, ques.category);
    this.sn_ques = ques.sn;


    // const currentIndex = this.tabs.findIndex(item => item.active);
    // this.hqTab.clickTab(currentIndex);


  }


  // 返回
  back() {
    history.back();
  }
}
