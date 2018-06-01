import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-form-template',
  template: `<div class="form-template">
    <h2>{{title}}</h2>
    <ng-content></ng-content>
    <div class="toggle" [routerLink]="[changeLoginUrl, routerParmas]">{{changeLoginMethod}}</div>
  </div>`,
  styleUrls: ['./form-template.component.scss']
})
export class FormTemplateComponent {
  @Input() title = '登录/注册';

  @Input() changeLoginMethod = '切换密码登录';

  // 切换登录的路由(默认切换至密码登录)
  @Input() changeLoginUrl = '/login-pass';

  // 路由参数
  @Input() routerParmas = null;
  constructor() { }
}
