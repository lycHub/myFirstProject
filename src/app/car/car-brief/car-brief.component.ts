import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Car} from '../../service/car/car-info/car.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-car-brief',
  templateUrl: './car-brief.component.html',
  styleUrls: ['./car-brief.component.scss']
})
export class CarBriefComponent {
  @Input() comment: number;

  // 车辆信息
  @Input() currentCar: Car;

  // 车型
  @Input() currentCarType: string;

  @Input() rateWidth = 'auto';

  // 广告
  @Input() ads: string;

  constructor() { }

}
