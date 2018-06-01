import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {toBoolean} from '../../../util/public_fn';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'hq-modal',
  template: `<hq-overlay [hqAcitve]="_show" (hqClick)="_emitCloseModal($event)"></hq-overlay>
    <div class="hq-modal" [class.active]="_show" [style.z-index]="hqZindex" [style.top]="hqTop + 'px'">
    <hq-scroll [scrollStyle]="scrollStyle" [data]="_show">
      <div class="hq-modal-wrapper">
        <div class="hq-model-title">{{hqTitle}}</div>
        <ng-content></ng-content>
      </div>
    </hq-scroll>
      <div class="hq-modal-close" (click)="_emitCloseModal($event)">&times;</div>
  </div>`,
  styleUrls: ['./hq-modal.component.scss']
})
export class HqModalComponent {
  // scroll外层样式
  scrollStyle = {
    'position': 'relative',
    'width': '100%',
    'height': '420px',
    'border': '1px dashed rgba(40,171,227,1)',
    'border-radius': '10px'
  }

  @Input() hqTitle: string;

  //z-index
  @Input() hqZindex = 1;

  // 控制modal高度
  @Input() hqTop = 70;

  _show = false;
  @Input()
  set hqShow(val: boolean) {
    this._show = toBoolean(val);
    // if (this._show) document.body.style.overflowY = document.documentElement.style.overflowY = 'hidden';
  }

  get hqShow(): boolean {
    return this._show;
  }

  //发射关闭事件
  @Output() hqCloseModal: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  //点击关闭的事件
  _emitCloseModal(evt: MouseEvent): void {
    evt.stopPropagation();
    // document.body.style.overflowY = document.documentElement.style.overflowY = 'auto';
    this.hqCloseModal.emit(false);
  }
}
