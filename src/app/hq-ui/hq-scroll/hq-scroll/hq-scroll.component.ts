import {
  AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'hq-scroll',
  template: `<div class="hq-scroll" #scroll [ngStyle]="scrollStyle"><ng-content></ng-content></div>`,
  styles: [`.hq-scroll{
    height:100%;
    overflow: hidden;
  }`]
})
export class HqScrollComponent implements AfterViewInit, OnChanges {
  myScroll;

  // 数据改变，用于刷新scroll
  @Input() data: any;

  // hq-scroll样式
  @Input() scrollStyle;

  @Input() probeType = 1;

  // 是否监听点击事件
  @Input() listenTap = false;

  // 发射点击事件
  @Output() myTap: EventEmitter<any> = new EventEmitter();


  // 是否监听滚动事件
  @Input() listenScroll = false;

  // 发射滚动事件
  @Output() scrolling: EventEmitter<number> = new EventEmitter();

  @ViewChild('scroll') wrap: ElementRef;
  constructor() {}

  ngAfterViewInit(): void {
    const dom = this.wrap.nativeElement;
    this.myScroll = new IScroll(dom, {
      mouseWheel: true,
      tap: this.listenTap,
      probeType: this.probeType
    });


    if (this.listenTap) {
      dom.addEventListener('tap', evt => this.myTap.emit(evt.target));
    }

    if (this.listenScroll) {
      this.myScroll.on('scroll', () => this.scrolling.emit(this.myScroll.y));
    }

    this.refreshScroll();
    }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) this.refreshScroll();
  }

  // 滚动到具体位置
  scrollTo(...args): void {
    this.myScroll.scrollTo.apply(this.myScroll, arguments);
  }

  // 滚动到某个元素
  scrollToElement(...args): void {
    this.myScroll.scrollToElement.apply(this.myScroll, arguments);
  }

  // 刷新
  refreshScroll(): void {
    setTimeout(() => {
      this.myScroll.refresh();
    }, 100);
  }
}
