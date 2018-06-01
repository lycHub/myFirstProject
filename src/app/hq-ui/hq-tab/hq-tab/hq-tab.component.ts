import {
  AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';

@Component({
  selector: 'hq-tab',
  templateUrl: './hq-tab.component.html',
  styleUrls: ['./hq-tab.component.scss']
})
export class HqTabComponent implements OnInit, AfterViewInit {
  _tabs;

  // 标题容器的宽度(labels)
  @Input() hqLabelWrapWidth = '100%';

  // 每个tab（label）的style
  @Input() hqLabelStyle = {
    'width': '75px',
    'font-size': '16px',
    'color': '#797979'
  };

  // 激活时的color
  @Input() activedColor = '#108ee9';


  // 高亮线dom
  @ViewChild('line') el_line: ElementRef;

  // label的dom
  @ViewChildren('label') els_label: QueryList<ElementRef>;

  // 保存label的offsetLeft
  labelsLeft: number[] = [];

  @Input()
  set hqTab(tabs) {
    this._tabs = tabs;
    // console.log(this._tabs);
  }

  // 发射当前tab的index
  @Output() hqSelectedIndex: EventEmitter<number> = new EventEmitter();

  // 发射当前tab
  @Output() hqSelectedTab: EventEmitter<any> = new EventEmitter();

  // content容器DOM
 @ViewChild('content') el_content: ElementRef;

 // 容器内每一个content的dom集合
  private el_contentItem: HTMLElement[];

  constructor() { }

  ngOnInit() {
    // console.log(this._tabs);
  }

  ngAfterViewInit(): void {
    // console.log(this.els_label['_results'][0].nativeElement.offsetLeft);
    this.els_label['_results'].forEach(dom => this.labelsLeft.push(dom.nativeElement.offsetLeft));

    this.el_contentItem = this.el_content.nativeElement.children;

    // 选中tab的index
    const activeIndex = this._tabs.findIndex(tab => tab.active);

    // 初始化横线位移
    this.el_line.nativeElement.style.left = this.labelsLeft[activeIndex] + 'px';
  }

  // 点击tab
  clickTab(index: number): void {
    // if (index === currentTabIndex) return;

    this._tabs.map((tab, key) => tab.active = key === index);
    // 横线位移
    this.el_line.nativeElement.style.left = this.labelsLeft[index] + 'px';

    // content透明度变化
    // for (let a = 0; a < this._tabs.length; a++) {
    //   this.el_contentItem[a].style.opacity = 0;
    //   // this.el_contentItem[a].style.opacity = a === index ? 1 : 0;
    // }
    // this.el_contentItem[index].style.opacity = 1;
    // [this.el_contentItem[0].style.opacity, this.el_contentItem[1].style.opacity] = [0, 0];

    //this.el_contentItem.map((dom, key) => dom.style.opacity = key === index ? 1 : 0);
    // const dis = this.el_content.nativeElement.style.width.split('p')[0] / this._tabs.length;
    // this.el_content.nativeElement.style.transform = `translateX(-${index * dis}px)`;

    // 发射事件
    this.hqSelectedIndex.emit(index);
    this.hqSelectedTab.emit(this._tabs[index]);
  }
}
