import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-country',
  template: `<div class="country">
    <div class="icon">
      <img src="{{icon}}" alt="国家">
    </div>
    <span [style.color]="textColor">{{name}}</span>
  </div>
  `,
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  // 图标
  @Input() icon: string;

  // 名称
  @Input() name: string;

  // 名称颜色
  @Input() textColor = '#fff';

  constructor() { }

  ngOnInit() {
  }

}
