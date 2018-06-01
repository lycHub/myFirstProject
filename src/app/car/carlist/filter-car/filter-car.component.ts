import {Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CarConfig} from '../../../service/car/car-config/config.model';
import {isIncludes, toBoolean} from '../../../util/public_fn';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {SingleCar} from '../carlist.component';
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-filter-car',
  templateUrl: './filter-car.component.html',
  styleUrls: ['./filter-car.component.scss']
})
export class FilterCarComponent implements OnInit, OnDestroy {
  _show: boolean;

  //人数刻度
  marks_people = {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10
  }

  //车长刻度
  marks_carLen = {
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    11: 11,
    12: 12
  }

  // 需要筛选的配置
  @Input() save_config_filter: CarConfig[];

  // 搜索结果
  @Input() save_carlist: SingleCar[];

  // 外部搜索后的结果
  @Input() carlist_filter_out: SingleCar[];

  // 已选中的配置
  @Input() save_user_filter: string[];

  // 新的车辆搜索结果(筛选后)
  save_carlist_filter = [];

  checkOptions = [];

  @Input() max_seats: number;


  @Input()
  set showFilterPanel(value: boolean) {
    this._show = toBoolean(value);

    if (this._show) {
      this.doc.body.style.overflowY = this.doc.documentElement.style.overflowY = 'hidden';
      if (this.save_config_filter) {
        this.save_config_filter.forEach(config => {
          if (config.id !== 2) {    // 过滤掉最大成员数
            const checked = isIncludes(this.save_user_filter, config.name_english);
            this.checkOptions.push({
              label: config.name,
              value: config.name_english,
              checked: checked
            });
          }
        });
      }
    }else {
      this.checkOptions = [];
    }
     this.save_carlist_filter = this.carlist_filter_out;
    // console.log(this.save_carlist.length);
    //   console.log(this.carlist_filter_out.length);
  }

  get showFilterPanel(): boolean {
    return this._show;
  }

  sub: Subscription;

  formModel: FormGroup;

  //发射关闭状态
  @Output() closePanel: EventEmitter<boolean> = new EventEmitter();

  // 发射筛选后的数据
   @Output() afterFilter: EventEmitter<any> = new EventEmitter();

  private doc: Document;

  constructor(private fb: FormBuilder, @Inject(DOCUMENT) doc: any) {
    this.doc = doc;
    this.formModel = this.fb.group({
      max_seats: [],
      configs: []
    });
  }

  ngOnInit() {
    const max_seats$ = this.formModel.get('max_seats').valueChanges;
    const configs$ = this.formModel.get('configs').valueChanges;

    const combine$ = Observable.combineLatest(max_seats$, configs$, (max_seats, configItems) => {
     //  if (length[0] > length[1]) [length[0], length[1]] = [length[1], length[0]];
      return {max_seats, configItems};
    })

    this.sub = combine$.subscribe(filter => {
      this.save_carlist_filter = [];

      const temp_user_filter = filter.configItems.filter(config => config.checked);
      // console.log(temp_user_filter);



      if (this.save_carlist) {
        // console.log(this.save_carlist.length);   // 原始的车辆数据
        this.save_carlist.forEach(car => {
          const singleCar = car.car;
          if (singleCar['max_seats'] >= filter.max_seats && temp_user_filter.every(config => singleCar[config.value])) {
            this.save_carlist_filter.push(car);
          }
        });
          // console.log(this.save_carlist_filter.length);
      }
    });
  }
  ngOnDestroy(): void {
     this.sub.unsubscribe();
  }


  onSubmit(evt) {
    evt.preventDefault();

    this.afterFilter.emit({
      max_seats: this.formModel.get('max_seats').value,
      configs: this.formModel.get('configs').value.filter(config => config.checked),
      carlist_filter: this.save_carlist_filter
    });
  }

  onReset(evt) {
    evt.preventDefault();
    this.checkOptions.map(config => config.checked = false);
     this.formModel.reset({
       max_seats: 2,
       configs: this.checkOptions
     });
  }

  //点击X关闭
  _emitClose(): void {
    this.closePanel.emit(false);
    this.doc.body.style.overflowY = this.doc.documentElement.style.overflowY = 'auto';
  }
}
