import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-city-item',
  template: `
<div class="city-item">
  <div class="cn">{{name_cn}}</div>
  <div class="en">{{name_en}}</div>
</div>`,
  styleUrls: ['./city-item.component.scss']
})
export class CityItemComponent {
  @Input() name_cn: string;
  @Input() name_en: string;

  constructor() { }

}
