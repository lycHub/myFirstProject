import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {HqCollapseComponent} from "../hq-collapse/hq-collapse.component";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'hq-collapseset',
  template: `<div class="hq-collapseset">
    <ng-content></ng-content>
  </div>`
})
export class HqCollapsesetComponent implements OnInit {
  // 保存collapse
  _collapses: HqCollapseComponent[] = [];

  // 是否只打开一个面板(手风琴模式)
  @Input() hqAccordion = false;
  constructor() { }

  ngOnInit() {}

  // 添加collapses组件
  addCollapse(collapse: HqCollapseComponent): void {
    this._collapses.push(collapse);
  }

  // 当某个组件被点击后，更新_collapses，使其他组件的isOpen = false
  changeCollapse(collapse: HqCollapseComponent): void {
    if (!this.hqAccordion || !collapse.hqActive) return;

    this._collapses.map(item => item.hqActive = item.hqTitle === collapse.hqTitle);
    // console.log(collapse);
  }

}
