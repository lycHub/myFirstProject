import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'hq-breadcrumb',
  template: `<div class="hq-bread-crumb">
    <div dlass="hq-bread-crumb-item" *ngFor="let item of hqTxts; last as isLast" (click)="navigate(item.path)">
      <span>{{item.label}}</span>
      <span class="hq-separator" [hidden]="isLast">{{hqSeparator}}</span>
    </div>
  </div>`,
  styleUrls: ['./hq-breadcrumb.component.scss']
})
export class HqBreadcrumbComponent {
  // 导航文字
  @Input() hqTxts: Array<{ label: string; path: string; }>;

  // 分隔符
  @Input() hqSeparator = '>'

  constructor(private router: Router) { }

  navigate(path: string): void {
    if (!path) return;
    this.router.navigate([path]);
  }

}
