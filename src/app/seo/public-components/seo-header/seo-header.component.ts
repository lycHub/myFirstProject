import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-seo-header',
  template: `<div class="seo-header">
    <div class="header-wrapper">
      <div class="back" [routerLink]="[backPath]"></div>
      <h2>环球房车</h2>
      <div class="home" routerLink="/main"></div>
    </div>
  </div>`,
  styleUrls: ['./seo-header.component.scss']
})
export class SeoHeaderComponent {
  // 返回的链接
  @Input() backPath = '/';
  constructor() { }
}
