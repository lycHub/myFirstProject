import {ChangeDetectionStrategy, Component, HostListener, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Car} from '../../service/car/car-info/car.model';
import {CarConfig, CarConfigType} from '../../service/car/car-config/config.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-car-config-brief',
  templateUrl: './car-config-brief.component.html',
  styleUrls: ['./car-config-brief.component.scss']
})
export class CarConfigBriefComponent implements OnInit, OnChanges {
  // 配置详情的弹窗
  showConfigDetail = false;

  // 接收配置类型
  @Input() configType: CarConfigType[];

  // 接收所有配置
  @Input() save_config_all: CarConfig[];

  // 保存需要显示的配置
  save_config_show = [];

  // 需要显示的配置取出data_type=boolean的配置
  save_config_boolean;

  // 接收当前车辆
  @Input() currentCar: Car;

  @HostListener('click', [ '$event' ]) openPanel(evt: MouseEvent) {
    evt.stopPropagation();
    this.showConfigDetail = true;
  }

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    const temp_config = [];
    const temp_config_show = [];

    if (this.currentCar) {
      this.save_config_all.forEach(config => {
        const configProperty = config.name_english;
        if (config.display && this.currentCar[configProperty]) {
          temp_config.push({
            name: config.name,
            value: this.currentCar[configProperty],
            type: config.type,
            data_type: config.data_type
          });
        }
      });

      this.configType.forEach(type => {
        temp_config.forEach(config => {
          if (type.id === config.type) {
            temp_config_show.push(config);
          }
        });
      });
      this.save_config_show = temp_config_show.filter(item => item.data_type !== 'boolean');
       this.save_config_boolean = temp_config_show.filter(item => item.data_type === 'boolean');
      // console.log(this.save_config_show);
      // console.log(this.save_config_boolean);
    }
  }
}
