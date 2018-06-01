import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {differenceInCalendarDays} from 'date-fns';
import {SearchCarData} from "../../search-car/search-car.component";


@Component({
  selector: 'app-search-info-mid',
  templateUrl: './search-info-mid.component.html',
  styleUrls: ['./search-info-mid.component.scss']
})
export class SearchInfoMidComponent implements OnChanges {
  // 保存搜车信息
  @Input() city_data: SearchCarData;

  // 小时数
  hours: number;

  // 天数
  days: number;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes['city_data']);
    if (changes['city_data']) {
      const data = changes['city_data'].currentValue;
      this.days = differenceInCalendarDays(data.endDate.replace(/-/g, '/'), data.beginDate.replace(/-/g, '/'));
      // console.log(data);
      const pickupTime = data.pickupTime.split(':')[0];
      const dropoffTime = data.dropoffTime.split(':')[0];
      this.hours = pickupTime >= dropoffTime ? 0 : dropoffTime - pickupTime;
    }
  }
}
