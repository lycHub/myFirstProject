import {Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import {isIncludes, toBoolean} from '../../../util/public_fn';
import {Country} from '../../../service/area/area-interface';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';
import { debounceTime } from 'rxjs/operators/debounceTime';
import {Subscription} from "rxjs/Subscription";
import {fromEvent} from "rxjs/observable/fromEvent";

@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.scss']
})
export class AreaListComponent implements OnInit, OnChanges, OnDestroy {
  // 是否是国内
  @Input() inCountry: boolean;

  // dataType
  @Input() dataType: string;

  //当前选中的国家
  @Input() selectedCountry: number;

  // 当前已选的取还车城市
  @Input() alreadSelectedCity: any;

  // 历史记录
  @Input() historyCity = null;

  //保存国家数据
  @Input() save_country: Country[];

  // 符合要求的citylist
  @Input() returnCityList: any;

  // 当前选中国家按字母分组后的city
  groupingCityList: any;

  // 搜索筛选后的city
  filterCityList = null;


  // arealist组件显示
  _visible = false;

  // 发射选中的城市
  @Output() cityData: EventEmitter<any> = new EventEmitter();

  // 关闭事件
  @Output() closePanel: EventEmitter<boolean> = new EventEmitter();

  // 外部控制组件的显示
  @Input()
  set hqVisible(value: boolean) {
    this._visible = toBoolean(value);
    if (this._visible) this.bindInput();
  }

  // 用户搜索词
  // searchWord: string;
  private input$: Subscription;

  // 输入框
  @ViewChild('search') searchEl: ElementRef;

  // 控制搜索面板
  showSearch = false;

  // 是否有搜索结果
  hasSearchResult = true;

  constructor() {

  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
   // console.log(changes['historyCity']);
    if (changes['returnCityList']) {
      this.changeCityData(this.selectedCountry);
    }
  }


  //点击切换国家
  changeCountry(countryId: number): void {
    if (countryId === this.selectedCountry) return;
    this.selectedCountry = countryId;
    this.changeCityData(countryId);
  }


  // 变更当前城市数据
  changeCityData(countryId: number) {
    const currentCityListTemp = [];
    // console.log(countryId);
    // console.log(this.returnCityList);

    // 当前选中国家的citylist
    for (const attr in this.returnCityList) {
      const currentItem = this.returnCityList[attr];
      // console.log(currentItem.country);
      if (currentItem.country === countryId) {
       // console.log(currentItem);
        currentCityListTemp.push(currentItem);
      }
    }
    // console.log(currentCityListTemp);
    // citylist分组
    this.groupingCityList = this.cityGroup(currentCityListTemp);
    // console.log(this.groupingCityList);
  }

  // city按字母分组,city_arr是原数组，返回分组后的新数组(groupedData)
  cityGroup(city_arr: any[]) {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    let data = null;
    const groupedData = [];
    letters.forEach(item => {
      data = {letter: item, citys: []};
      data.citys = city_arr.filter(city => city.name_native.charAt(0).toUpperCase() === item);

      if (data.citys.length > 0) {
        groupedData.push(data);
      }
    });

    return [{
      letter: '当前城市',
      citys: [this.alreadSelectedCity.begin]
    }].concat(groupedData);
  }

  //点击选择城市
  selectCity(city): void {
    this.cityData.emit(city);
    //console.log(this.alreadSelectedCity);
  }


  // 快速选择城市
  /*quickSelect(city): void {
    const id = city.id || city.city_id;
    switch (this.dataType) {
      case 'begin':
        // console.log(this.inCountry);
        // console.log(this.selectedCountry);

        /!*if (this.selectedCountry !== city.country) {
          alert('不支持');
        }*!/

        this.cityData.emit(city);
        break;
      default:
        if (this.returnCityList.findIndex(item => item.id === id) > -1) {
          this.cityData.emit(city);
        }else {
          alert('当前取车城市不支持该地区还车');
        }
        break;
    }
  }*/


  // 关闭面板
  _emitColsePanel() {
    if (this.input$) this.input$.unsubscribe();
    this.showSearch = false;
    this.searchEl.nativeElement.value = this.filterCityList = null;
    this.closePanel.emit(false);
  }

  ngOnDestroy(): void {
    if (this.input$) this.input$.unsubscribe();
  }

  // 失去焦点时，如果输入框没内容，就关闭搜索面板
  onBlur(value: string) {
    if (value.length > 0) return;
    // this.showSearch = false;
  }


  // 搜索框input筛选事件
  private bindInput(): void {
    this.input$ = fromEvent(this.searchEl.nativeElement, 'input').pipe(debounceTime(300), distinctUntilChanged()).subscribe((evt: any) => {
      const value = evt.target.value;

      console.log(value);
      if (value.length <= 0) {
        this.showSearch = false;
        this.filterCityList = null;
        return;
      }

      this.showSearch = true;

      const tempFilterCity = [];

      // 去除空格和特殊字符
      const reg = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？ ]");
      let rs = '';

      if (value.length > 0) {
        for (let i = 0; i < value.length; i++) {
          rs = rs + value.substr(i, 1).replace(reg, '');
        }
        //const isChinese = new RegExp(/^[\u4e00-\u9fa5]*$/).test(value);   // 匹配中文

        for (const attr in this.returnCityList) {
          const item = this.returnCityList[attr];
          const item_en_name = item.name_native.toLowerCase();
          if (isIncludes(item.name, rs) || isIncludes(item_en_name, rs.toLowerCase())) {
            tempFilterCity.push(item);
          }
        }


        // 优先级排序
        tempFilterCity.sort(function(a, b){
          return b.priority - a.priority;
        });

        // 按英文名排序
        for (let i = 0; i < tempFilterCity.length; i++) {
          for (let j = 0; j < tempFilterCity.length - i - 1; j++) {
            if (tempFilterCity[j].priority === tempFilterCity[j + 1].priority && tempFilterCity[j].name_native > tempFilterCity[j + 1].name_native) {
              [tempFilterCity[j], tempFilterCity[j + 1]] = [tempFilterCity[j + 1], tempFilterCity[j]];
            }
          }
        }
      }


      if (tempFilterCity.length > 0) {  // 有结果
        this.hasSearchResult = true;

        // 如果搜索也需要显示当前城市的话
        // this.filterCityList = tempFilterCity.unshift(this.alreadSelectedCity.begin);
        this.filterCityList = tempFilterCity;
      }else {
        this.hasSearchResult = false;
        this.filterCityList = null;
      }
      // console.log(this.filterCityList);
    });
  }
}
