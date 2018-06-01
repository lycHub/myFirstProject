import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-car-configs',
  templateUrl: './car-configs.component.html',
  styleUrls: ['./car-configs.component.scss']
})
export class CarConfigsComponent implements OnInit {
  // 接收已筛选并归类的配置
  @Input()  carConfigs;

  // 已筛选并归类的配置取出data_type=boolean的配置
  @Input() save_config_boolean;

  constructor() { }

  ngOnInit() {}
}
