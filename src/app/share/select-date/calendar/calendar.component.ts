import {Component, EventEmitter, Input, Output, OnInit, ChangeDetectionStrategy, OnChanges, SimpleChanges} from '@angular/core';
import {getDate} from '../../../util/date';
import {getDaysInMonth, differenceInCalendarDays, startOfDay, compareDesc, format, isToday, addDays, isEqual, isAfter, isBefore} from 'date-fns';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnChanges {
  // 日历是否显示
  @Input() _visible = false;

  // 几天后开始可选(分国内国外)
  @Input() startValidate = 3;

  // 发射日历关闭事件
  @Output() closeCalendar: EventEmitter<boolean> = new EventEmitter();

  // 发射日期数据时间
  @Output() setDate: EventEmitter<string[] | number[]> = new EventEmitter();

  // 起点和终点的日期信息
  date_info;

  // 天数
  days: number;

  @Input()
  set hqDate_Info(value) {
    if (value) {
      this.date_info = value;
      this.days = differenceInCalendarDays(this.date_info.endDate.replace(/-/g, '/'), this.date_info.beginDate.replace(/-/g, '/'));
      // console.log(this.date_info);
    }
  }

  // 控制begin样式
  beginClass = false;


  // 计数器
  num = 0;

  // 时间数据集合
  dateArr = [];

  constructor() {}
  ngOnInit() {
    this.initCalendar();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['startValidate']) this.initCalendar();
  }


  // 日历初始化
  initCalendar() {
    this.dateArr = getDate(12); //  获取数据 参数: 拿6个月的数据
    // console.log(this.dateArr[0].data_title);

    // 天数模板
    this.dateArr.forEach(item => {
      // 当月天数
      const days = getDaysInMonth(item.data_title);


      // 当月一号
      let firthDate = item.data_title.getDate();


      // 当月一号星期几
      const nowweek = item.data_title.getDay();

      // 保存每个月的day
      const temp_days = [];
      for (let a = 0; a < days + nowweek; a++) {
        // console.log(item.data_title.toLocaleDateString());
        if (a < nowweek) {
          temp_days.push({
            // index: null,
            date: null,
            text: null,
            disabled: false,
            through: false,
            beginClass: false,
            active: false,
            end: false
          });

        }else {
          // 当前时间 + startValidate的日子不可点


          if (compareDesc(item.data_title, startOfDay(addDays(new Date(), this.startValidate))) === 1) {
            //console.log(item.data_title.toLocaleDateString());
            // listIndex++;
            // console.log(listIndex);
            temp_days.push({
              // index: listIndex,
              date: format(item.data_title, 'YYYY/M/D'),
              text: firthDate,
              disabled: true,
              through: false,
              beginClass: false,
              active: false,
              end: false
            });


          }else if (compareDesc(new Date(this.date_info.beginDate), item.data_title) === 0) {   // 默认入住时间（今天）
            // listIndex++;
            // this.date_info.begin.beginIndex = listIndex;
            this.date_info.beginDate = format(item.data_title, 'YYYY/M/D');
            temp_days.push({
              // index: listIndex,
              date: format(item.data_title, 'YYYY/M/D'),
              text: firthDate,
              disabled: false,
              through: false,
              beginClass: true,
              active: true,
              end: false
            });

            //item.data_title.setDate(++firthDate);

          }else if (compareDesc(new Date(this.date_info.endDate), item.data_title) === 0) {   // 默认离开时间（明天）

            // listIndex++;
            // this.date_info.end.endIndex = listIndex;
            this.date_info.endDate = format(item.data_title, 'YYYY/M/D');
            temp_days.push({
              //  index: listIndex,
              date: format(item.data_title, 'YYYY/M/D'),
              text: firthDate,
              disabled: false,
              through: false,
              beginClass: false,
              active: false,
              end: true
            });

            //item.data_title.setDate(++firthDate);

          }else {
            // listIndex++;
            temp_days.push({
              // index: listIndex,
              date: format(item.data_title, 'YYYY/M/D'),
              text: firthDate,
              disabled: false,
              through: false,
              beginClass: false,
              active: false,
              end: false
            });

            //item.data_title.setDate(++firthDate);

          }
          item.data_title.setDate(++firthDate);
        }
        Object.assign(item, {days: temp_days});
      }
    });
    // console.log(this.dateArr);
    this.addThrough();
  }

  // 点击选择日期
  selectDay(day) {
    if (day.text && !day.disabled) {
      // 移除through和begin样式
      this.dateArr.forEach(item => item.days.forEach(item_day => item_day.through = item_day.beginClass = item_day.end = item_day.active = false));

      if (this.num % 2 === 0) { // begin
        // this.date_info.end.endIndex = -1;
        // this.date_info.begin.beginIndex = day.index;
        this.date_info.beginDate = day.date;
        this.dateArr.forEach(item => item.days.forEach(item_day => item_day.active = isEqual(item_day.date, this.date_info.beginDate)));
        this.num++;
      }else { // end
        if (!isEqual(day.date, this.date_info.beginDate)) {
          // this.date_info.end.endIndex = day.index;
          this.date_info.endDate = day.date;

          if (isAfter(this.date_info.beginDate, this.date_info.endDate)) {
            // [this.date_info.begin.beginIndex, this.date_info.end.endIndex] = [this.date_info.end.endIndex, this.date_info.begin.beginIndex];
            [this.date_info.beginDate, this.date_info.endDate] = [this.date_info.endDate, this.date_info.beginDate];
          }

          this.days = differenceInCalendarDays(this.date_info.endDate, this.date_info.beginDate);

          this.dateArr.forEach(item => item.days.forEach(item_day => {
            item_day.beginClass = item_day.active = isEqual(item_day.date, this.date_info.beginDate);
            item_day.end = isEqual(item_day.date, this.date_info.endDate);
          }))
          this.addThrough();
          this.num++;
        }else {
          return;
        }
      }
    }
  }

  // 添加through样式
  addThrough() {
    this.dateArr.forEach(item => {
      item.days.forEach(item_day => item_day.through = isAfter(item_day.date, this.date_info.beginDate) && isBefore(item_day.date, this.date_info.endDate));
    });
  }


  // 关闭日历
  _emitcloseCalendar(): void {
    if (isAfter(this.date_info.beginDate, this.date_info.endDate)) this.exchangeDate();
    this.closeCalendar.emit(false);
  }

  // 点击确定发送日期
  selectDate(evt: MouseEvent) {
    evt.preventDefault();

    // console.log(this.num);
    if (this.date_info.beginDate && this.date_info.endDate) {

      if (isAfter(this.date_info.beginDate, this.date_info.endDate)) this.exchangeDate();

      this.setDate.emit([this.date_info.beginDate, this.date_info.endDate]);
    }else {
      alert('请选择还车日期');
    }
  }

  // 互换日期
  private exchangeDate(): void {
    [this.date_info.beginDate, this.date_info.endDate] = [this.date_info.endDate, this.date_info.beginDate];
  }
}
