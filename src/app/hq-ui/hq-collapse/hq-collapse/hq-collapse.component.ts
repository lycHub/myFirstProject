import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Optional, Output} from '@angular/core';
import {HqCollapsesetComponent} from "../hq-collapseset/hq-collapseset.component";
import {toBoolean} from "../../../util/public_fn";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'hq-collapse',
  templateUrl: './hq-collapse.component.html',
  styleUrls: ['./hq-collapse.component.scss']
})
export class HqCollapseComponent implements OnInit {
  // 是否禁用
  @Input() hqDisabled = false;

  // 是否激活
  _active = false;
  @Input()
    set hqActive(val: boolean) {
      // console.log(val);
      this._active = toBoolean(val);
    }

    get hqActive(): boolean {
      return this._active;
    }

  // 标题
  @Input() hqTitle: string;

  // 标题样式
  @Input() hqTitleStyle = {
    'background-color': '#29abe2',
    'color': '#fff',
    'font-size': '14px',
    'border': 'none'
  }

  // 发射点击header的事件
  @Output() hqClickTitle: EventEmitter<null> = new EventEmitter();
  constructor(@Optional() private collapseset: HqCollapsesetComponent) { }

  ngOnInit() {
    if (this.collapseset) this.collapseset.addCollapse(this);
  }

  // 点击控制折叠面板
  controlPanel(): void {
    if (this.hqDisabled) return;

    this._active = !this._active;
    // console.log(this._active);
    if (this.collapseset) this.collapseset.changeCollapse(this);
    this.hqClickTitle.emit();
  }

}
