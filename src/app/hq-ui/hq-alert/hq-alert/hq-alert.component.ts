import {ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {toBoolean} from '../../../util/public_fn';
import {DOCUMENT} from "@angular/common";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'hq-alert',
  template: `<hq-overlay [hqAcitve]="_show"></hq-overlay><!--(hqClick)="closeAlert()"-->
  <div class="hq-alert" [class.active]="_show">
    <div class="hq-alert-wrapper">
      <div class="hq-alert-title">支付确认</div>
      <ng-content></ng-content>
    </div>
    <div class="btns">
      <span (click)="closeAlert()">取消</span>
      <span (click)="complete()">支付完成</span>
    </div>
  </div>
  `,
  styleUrls: ['./hq-alert.component.scss']
})
export class HqAlertComponent implements OnInit {
  _show = false;

  @Input()
  set hqShow(value: boolean) {
    this._show = toBoolean(value);
    if (this._show) this.doc.body.style.overflowY = this.doc.documentElement.style.overflowY = 'hidden';
  }

  get hqShow(): boolean {
    return this._show;
  }


  // 发射关闭事件
  @Output() hqClose: EventEmitter<boolean> = new EventEmitter();

  // 发射完成事件
  @Output() hqComplete: EventEmitter<any> = new EventEmitter();

  private doc: Document;
  constructor(@Inject(DOCUMENT) doc: any) {
    this.doc = doc;
  }

  ngOnInit() {
  }

  // 点击取消
  closeAlert(): void {
    this.hqClose.emit(false);
  }

  // 点击完成
  complete(): void {
    this.doc.body.style.overflowY = this.doc.documentElement.style.overflowY = 'auto';
    this.hqComplete.emit();
  }
}
