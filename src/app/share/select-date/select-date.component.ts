import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {format, compareDesc, getDay} from 'date-fns';

enum Week {
  '日',
  '一',
  '二',
  '三',
  '四',
  '五',
  '六'
}


@Component({
  selector: 'app-select-date',
  templateUrl: './select-date.component.html',
  styleUrls: ['./select-date.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectDateComponent),
    multi: true
  }]
})
export class SelectDateComponent implements ControlValueAccessor {
  // 是否在国内
  @Input() inCountry: boolean;

  // 控制日历显示
  showCalendar = false;

  // 日期初始化
  date_info;


  // 几天后开始可选(分国内国外)
  @Input() startValidate = 3;


  // 计算周几
  week_info;

  // 时间用于双向绑定
  @Input() timesValue: number[];

  // 控制时间
  times = {
    begin: {
      title: '取车时间',
      show: false
    },

    end: {
      title: '还车时间',
      show: false
    }
  }

  // 向外发射time
  @Output() selectedTime: EventEmitter<number[]> = new EventEmitter();

  constructor() {}

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['inCountry']) console.log(changes['inCountry'].currentValue);
  // }

  setDate(evt) {
    [this.date_info.beginDate, this.date_info.endDate] = evt;
    this.caculatorWeek();
    // console.log(this.date_info);
    // const tempDate = {
    //   begin: null,
    //   end: null
    // };
    //
    //
    // [tempDate.begin, tempDate.end] = [format(this.date_info.begin.beginDate, 'YYYY年MM月DD日'), format(this.date_info.end.endDate, 'YYYY年MM月DD日')];
    // this.date_format = tempDate;
    this.onChange(this.date_info);
    this.showCalendar = false;
  }

  caculatorWeek(): void {
    const tempWeek = {
      beginWeek: null,
      endWeek: null
    };

    tempWeek.beginWeek = Week[getDay(this.date_info.beginDate.replace(/-/g, '/'))];
    tempWeek.endWeek = Week[getDay(this.date_info.endDate.replace(/-/g, '/'))];
    this.week_info = tempWeek;
    // console.log(this.week_info);
  }


  // 改变时间
  changeTime(type: string) {
    this.selectedTime.emit([this.timesValue[0], this.timesValue[1]]);
    this.times[type].show = false;
  }

  writeValue(obj: any): void {
    if (obj) {
      // console.log(obj);
      this.date_info = obj;
      // console.log(this.date_info);
      // console.log(this.date_info);
      // const tempDate = {
      //   begin: null,
      //   end: null
      // };

      //[tempDate.begin, tempDate.end] = [format(obj.begin.beginDate, 'YYYY年MM月DD日'), format(obj.end.endDate, 'YYYY年MM月DD日')];
      // this.date_format = tempDate;
      this.caculatorWeek();
      // console.log(this.date_info);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchChange = fn;
  }

  // accessor方法
  private onChange = (_: any) => {};
  private onTouchChange = (_: any) => {};
}
