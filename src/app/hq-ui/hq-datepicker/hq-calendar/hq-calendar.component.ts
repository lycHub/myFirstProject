import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {format, compareDesc, isToday, lastDayOfMonth, startOfMonth, startOfDay} from 'date-fns';

interface HqDate {
  label: number;
  value: string;
  isToday: boolean;
  disabled: boolean;
  notInCurrentMonth: boolean;
}

@Component({
  selector: 'hq-calendar',
  template: `<div class="hq-datepicker-day">
    <div class="hq-datepicker-header">
      <a class="hq-last-month" (click)="changeMonth('prev')">&lt;</a>
      <span>{{currentDate.getFullYear()}}年{{currentDate.getMonth() + 1}}月</span>
      <a class="hq-next-month" (click)="changeMonth('next')">&gt;</a>
    </div>

    <table>
      <thead>
      <tr>
        <th>日</th>
        <th>一</th>
        <th>二</th>
        <th>三</th>
        <th>四</th>
        <th>五</th>
        <th>六</th>
      </tr>
      </thead>

      <tbody>
      <tr *ngFor="let date of hqDate_arr;">
        <td *ngFor="let day of date.line;"
            (click)="selectDay(day)"
            [class.today]="day.isToday"
            [class.disabled]="day.disabled"
            [class.actived]="_value === day.value"
            [class.notInCurrentMonth]="day.notInCurrentMonth">
          {{day.label}}
        </td>
      </tr>
      </tbody>
    </table>
  </div>`,
  styleUrls: ['./hq-calendar.component.scss']
})
export class HqCalendarComponent implements OnInit {
  /**
   * @summary 当前日期
   * @desc 用于记录当前日历状态的Date对象，随用户的操作而不断更新
   * @type {Date}
   */
  currentDate = new Date();

  // 指定最小可点日期
  private hqMinEnableDate = new Date();

  // 日期数据，用于循环
  hqDate_arr;

  // 选中的日期
  _value: string;

  // 发射选中的日期
  @Output() selectedDay: EventEmitter<string> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    this.newCalendar(this.currentDate);
  }

  changeMonth(type: string) {
    let currentMonth = this.currentDate.getMonth();
    currentMonth = type === 'prev' ? --currentMonth : ++currentMonth;

    this.currentDate.setMonth(currentMonth);
    this.newCalendar(this.currentDate);
  }

  private newCalendar(currentDate) {
    const year = currentDate.getFullYear();               // 2018
    const month = currentDate.getMonth();                 // 2

    const thisMonthDay = new Date(year, month, 1);        // 当月1号
    const thisMonthFirstDay = thisMonthDay.getDay();      // 当月1号周几
    const thisMonthFirstDate = new Date(year, month, -thisMonthFirstDay);  // 日历主体第一行第一列的日期2018-2-24
    this.hqDate_arr = this.generateTable(thisMonthFirstDate, this.hqMinEnableDate);  //生成日历主体的日期区域
    // generateNav(year, month);  //生成导航区域
    currentDate.setYear(year);
    currentDate.setMonth(month);
  }

  private generateTable(firstDate: Date, minClickDate: Date): Array<{ line: HqDate[] }> {
    const date_arr = [];
    let date = firstDate.getDate();

    for (let i = 0; i < 6; i++) {
      const temp = {line: []};
      for (let j = 0; j < 7; j++) {
        firstDate.setDate(++date);  // fitstDate不断改变
        date = firstDate.getDate();

        // 当月第一天和最后一天
        const currentMonthFirst = startOfMonth(this.currentDate);
        const currentMonthLast = lastDayOfMonth(this.currentDate);

        temp.line.push({
          label: date,
          value: format(firstDate, 'YYYY-MM-DD'),
          isToday: isToday(firstDate),                            // 是当天吗
          disabled: compareDesc(firstDate, startOfDay(minClickDate)) === 1,   // 小于指定日期的不可点
          notInCurrentMonth: firstDate < currentMonthFirst || firstDate > currentMonthLast   // 是否是当月日期
        });
      }
      date_arr.push(temp);
    }
    // console.log(date_arr);
    return date_arr;
  }


  // 选中日期
  selectDay(day: HqDate): void {
    if (!day.disabled) {
      this._value = day.value;
      this.selectedDay.emit(day.value);
    }
  }
}
