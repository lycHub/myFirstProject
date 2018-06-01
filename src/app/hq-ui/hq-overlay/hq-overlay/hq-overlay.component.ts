import {ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'hq-overlay',
  template: `<div class="hq-overlay" [class.active]="_show" [style.z-index]="hqZindex" [style.background-color]="hqBackGroundColor"></div>`,
  styleUrls: ['./hq-overlay.component.scss']
})
export class HqOverlayComponent {
  // 背景颜色
  @Input() hqBackGroundColor = '#000';

  _show = false;

  @Input()
  set hqAcitve(val: boolean) {
    this._show = val;
  }

  get hqAcitve(): boolean {
    return this._show;
  }

  @Input() hqZindex = 1;

  // 发射点击事件
  @Output() hqClick: EventEmitter<MouseEvent> = new EventEmitter();
  constructor() { }

  @HostListener('click', [ '$event' ]) onClick(e: MouseEvent): void {
    this.hqClick.emit(e);
  }

  @HostListener('touchmove', [ '$event' ]) onTauchmove(e: Event): void {
    e.preventDefault();
    e.stopPropagation();
  }
}
