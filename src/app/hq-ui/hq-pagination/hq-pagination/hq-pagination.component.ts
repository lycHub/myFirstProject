import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'hq-pagination',
  templateUrl: './hq-pagination.component.html',
  styleUrls: ['./hq-pagination.component.scss']
})
export class HqPaginationComponent implements OnInit, OnChanges {
  // 当前页数
  @Input() hqCurrentPageNum = 1;

  // 总页数
  @Input() hqTotalPageNum: number;

  // 页码按钮
  btn_page = [];

  // 禁止点击上一页
  disablePrevPage: boolean;

  // 禁止点击下一页
  disableNextPage: boolean;

  // 省略号
  ellipsis = {
    left: false,
    right: false
  }

  // 发射当前选中页码
  @Output() hqSelectedPage: EventEmitter<number> = new EventEmitter();

  // 阻止快速改变页码
  private hqCanChange = true;

  constructor() { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.setPagination();
  }

  setPagination() {
    if (this.hqCurrentPageNum <= 0 || this.hqCurrentPageNum > this.hqTotalPageNum) {
      throw new Error('页数参数错误');
    }

    this.disablePrevPage = this.hqCurrentPageNum < 2;
    this.disableNextPage = this.hqCurrentPageNum >= this.hqTotalPageNum;

    this.ellipsis.left = this.hqCurrentPageNum > 3;
    this.ellipsis.right = this.hqTotalPageNum - this.hqCurrentPageNum >= 3;

    if (this.hqTotalPageNum > 1 && this.hqTotalPageNum <= 4) { // 总页数<=4
      // console.log(1);
      this.ellipsis.left = this.ellipsis.right = false;


      for (let a = 2; a < this.hqTotalPageNum; a++) {
        // 是否是当前页
        const active = a === this.hqCurrentPageNum;

        this.btn_page.push({
          label: a,
          active
        });
      }
    }else if (this.hqTotalPageNum > 4) { // 总页数>4
      // console.log(2);
      for (let a = 1; a <= 3; a++) {
        if (this.hqCurrentPageNum === 1 || this.hqCurrentPageNum === 2) {	// 如果当前页是2
          const active = a === this.hqCurrentPageNum;
          if (a !== 1) {
            this.btn_page.push({
              label: a,
              active
            });
          }
      }else if (this.hqCurrentPageNum === this.hqTotalPageNum || (this.hqTotalPageNum - this.hqCurrentPageNum) === 1) {	// 如果当前页是最后两页页
          // 当前页与i的关系
          const relativeNum = this.hqTotalPageNum - 3 + a;
          const active = relativeNum === this.hqCurrentPageNum;
          if (relativeNum !== this.hqTotalPageNum) {
            this.btn_page.push({
              label: relativeNum,
              active
            });
          }
        }else {
          // 当前页与i的关系
          const relativeNum = this.hqCurrentPageNum - 2 + a;
          const active = relativeNum === this.hqCurrentPageNum;
          this.btn_page.push({
            label: relativeNum,
            active
          });
        }
      }
    }
  }

  // 点击跳页
  tabPage(evt) {
    // console.log(this.hqCanChange);
    const disabled = evt.target.dataset.disabled === 'true';
    const page = Number.parseInt(evt.target.dataset.page);
    if (disabled || !this.hqCanChange || this.hqCurrentPageNum === page) return;
    this.hqCanChange = false;
    this.btn_page = [];
    this.hqCurrentPageNum = page;
    this.setPagination();

    this.hqSelectedPage.emit(page);
    setTimeout(() => this.hqCanChange = true, 500);
  }
}
