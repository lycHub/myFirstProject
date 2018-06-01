import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

interface HqYear {
  value: number;
  disabled: boolean;
  actived: boolean;
}

@Component({
  selector: 'hq-month',
  template: `<div class="hq-ym">
    <div class="hq-year" *ngIf="selectType === 'year'">
      <table>
        <tbody>
        <tr *ngFor="let year of hqYear_arr;">
          <td *ngFor="let item of year.line;" (click)="selectYear(item.value)" [class.actived]="item.value === selected_year">{{item.value}}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="hq-month" *ngIf="selectType === 'month'">
      <table>
        <tbody>
        <tr *ngFor="let month of [[1,2,3],[4,5,6],[7,8,9],[10,11,12]];">
          <td *ngFor="let item of month;" (click)="selectMonth(item)" [class.actived]="item === selected_month">{{item}}月</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>`,
  styleUrls: ['./hq-month.component.scss']
})
export class HqMonthComponent implements OnInit {
  // 初始年份
  @Input() hqInitYear = 2008;

  // 多少年
  @Input() hqYears = 108;

  // 年份数据
  hqYear_arr;

  // 控制显示年或月的面板
  selectType = 'year';

  // 选择的年份
  selected_year: number;

  // 选择的月份
  selected_month: number;

  // 向外发射selected_ym
  @Output() _emitYmData: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.hqYear_arr = this.generateTable(this.hqInitYear);
  }

  // 初始化年份数据
  private generateTable(initYear: number): Array<{ line: HqYear[] }> {
    const year_arr = [];

    for (let a = 0; a < (this.hqYears / 3); a++) {
      const temp = {line: []};
      for (let b = 0; b < 3; b++) {
        const temp_year = initYear--;
        temp.line.push({
          value: temp_year,
          disabled: false,
          actived: temp_year === this.selected_year
        });
      }
      year_arr.push(temp);
    }
    return year_arr;
  }

  // 选中年份
  selectYear(year: number): void {
    this.selected_year = year;
    this.selectType = 'month';
    // console.log(this.selected_year);
  }

  // 选中月份
  selectMonth(month: number): void {
    if (!this.selected_year) {
      alert('请先选择年份');
      this.selectType = 'year';
      return;
    }
    this.selected_month = month;
    this._emitYmData.emit(this.selected_year + '-' + this.selected_month);
    this.selectType = 'year';
  }

}
