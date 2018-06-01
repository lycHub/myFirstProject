import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'hq-button',
  template: `<button
    class="hq-btn"
    (click)="_emitClick($event)"
    [ngStyle]="hqBtnStyle"
    [type]="hqBtnType"
   [class.disabled]="hqDisabled"
   [disabled]="hqDisabled" *ngIf="hqType !== 'activity'">
    <ng-content></ng-content>
  </button>
  
  <button class="hq-btn-activity" *ngIf="hqType === 'activity'"
          [type]="hqBtnType"
          (click)="_emitActive()"
          [class.actived]="hqChecked"
          [class.disabled]="hqDisabled" 
          [disabled]="hqDisabled">
    {{hqTxt}}
  </button>`,
  styleUrls: ['./hq-button.component.scss']
})
export class HqButtonComponent implements OnInit {
  // 控制按钮样式
  @Input() hqType = 'default';

  // default下background和color
  @Input() hqBtnStyle = {
    'background-color': '#28abe3',
    'color': '#fff',
    'padding': '8px 0',
    'border-radius': '5px'
  }

  // 按钮类型
  @Input() hqBtnType;

  // 是否禁用
  @Input() hqDisabled = false;

  // 是否被选中
  @Input() hqChecked = false;

  // activity按钮的txt
  @Input() hqTxt: string;

  // 发射click事件
  @Output() hqClick: EventEmitter<Event> = new EventEmitter();

  // type为activity时，点击按钮发送选中状态
  @Output() changeChecked: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  _emitActive() {
    if (this.hqDisabled) return;
    this.hqChecked = !this.hqChecked;
    this.changeChecked.emit(this.hqChecked);
  }

  _emitClick(evt: Event): void {
    if (this.hqDisabled) return;
    this.hqClick.emit(evt);
  }
}
