import {
  Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, ViewChild,
  ViewChildren
} from '@angular/core';
import {Country} from "../../../../service/area/area-interface";
import {HqScrollComponent} from "../../../../hq-ui/hq-scroll/hq-scroll/hq-scroll.component";

// 右侧字母导航每个字母的height
const HEIGHT = 18;

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss']
})
export class AreasComponent implements OnInit, OnChanges {
  // 保存国家数据
  @Input() save_country: Country[];

  // 当前选中的国家
  @Input() selectedCountry: number;

  // 发射选中的国家
  @Output() changeCountry: EventEmitter<number> = new EventEmitter();

  // 当前选中国家按字母分组后的city
  @Input() groupingCityList: any;

  // 发射选中的城市
  @Output() selectCity: EventEmitter<any> = new EventEmitter();

  // 字母
  shortcut: string[];

  // touch相关数据
  private touch = {
    y1: null,               // 按下的位置
    y2: null,               // 滑动到的位置
    anchorIndex: null       // 按下的字母索引
  }

  // 保存(group)offsetHeight
  private listHeight: number[];

  // 右侧字幕条是否被触摸(用于控制样式)
  isTouching = false;

  // 右侧当前索引(用于高亮)
  currentShortCutIndex = 0;

  // 实时记录滚动位置
  private scrollY = 0;

  // hq-scroll组件
  @ViewChild(HqScrollComponent) hqScroll: HqScrollComponent;

  // 城市dom节点数组
  @ViewChildren('cityGroup') cityGroup: QueryList<ElementRef>;

  constructor() {}

  ngOnInit() {
    // console.log(this.groupingCityList);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['groupingCityList']) {
      const arr = changes['groupingCityList'].currentValue.map(item => item.letter);
      arr.splice(0, 1, '★')
      this.shortcut = arr;

      // 计算高度
      if (this.cityGroup) {
       setTimeout(() => {
         this._calculateHeight();
         this._scrollTo(0);
       }, 100);
      }
    }
  }

  _emitCountry(evt): void {
    const id = Number.parseInt(evt.target.dataset.id);
    if (this.selectedCountry === id) return;
    this.changeCountry.emit(id);
  }

  _emitselectCity(city): void {
    this.selectCity.emit(city);
  }

  // 获取滚动位置
  onScrolling(poi: number): void {
    this.scrollY = poi;

    const listHeight = this.listHeight;

    if (poi > 0) {
      this.currentShortCutIndex = 0;
      return;
    }

    // 只要scrollY的高度在某一group之间，就高亮那个字母

    // 在中间部分滚动
    for (let i = 0; i < listHeight.length - 1; i++) {
      const upperHeight = listHeight[i];    // 上线
      const lowerHeight = listHeight[i + 1]; // 下限

      if (!lowerHeight || (-poi >= upperHeight && -poi < lowerHeight)) {
        this.currentShortCutIndex = i;
        return;
      }
    }

    // 当滚动底部，且-newY > 最后一个group的上限
    // 因为listHeight比group多一个0，所以减2
    this.currentShortCutIndex = listHeight.length - 2;    // 也可以是this.shortcut.length - 1
  }


  // 触摸开始
  onShortCutTouchStart(evt): void {
    this.isTouching = true;

    // 获取字母索引
    const anchorIndex = Number.parseInt(evt.target.dataset.index);

    // 按下的位置
    this.touch.y1 = evt.touches[0].pageY;

    // 按下的字母索引
    this.touch.anchorIndex = anchorIndex;

    this._scrollTo(anchorIndex);
  }


  // 触摸滑动
  onShortCutTouchMove(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    // 滑动的位置
    this.touch.y2 = evt.touches[0].pageY;

    // 滑动的距离
    const dixY =  this.touch.y2 -  this.touch.y1;

    // 经过了几个字母
    const delta = Math.floor(dixY / HEIGHT);

    // 移动到了第几个字母
    const anchorIndex = this.touch.anchorIndex + delta;

    this._scrollTo(anchorIndex);
  }

  // 滚动到目标位置
  private _scrollTo(index: number) {
    if (index < 0) {
      index = 0;
    } else if (index > this.shortcut.length - 1) {
      index = this.shortcut.length - 1;
    }

    if ((!index && index !== 0) || this.currentShortCutIndex === index) return;

    this.currentShortCutIndex = index;
    const el = this.cityGroup['_results'][index].nativeElement;
    // this.hqScroll.scrollToElement(el, 0);
    this.hqScroll.scrollTo(0, -el.offsetTop);
  }

  // 计算(group)offsetHeight
  private _calculateHeight() {
    let height = 0;
    this.listHeight = [height];

    const listGroup = this.cityGroup['_results'];

    listGroup.forEach(item => {
      height += item.nativeElement.offsetHeight;
      this.listHeight.push(height);
    });
  }
}
