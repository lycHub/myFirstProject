import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'hq-tag',
  template: `<span class="hq-tag" [class.hq-tag-gold]="hqType === 'gold'"><ng-content></ng-content></span>`,
  styleUrls: ['./hq-tag.component.scss']
})
export class HqTagComponent implements OnInit {
  //控制颜色，默认红色
  @Input() hqType;

  constructor() { }

  ngOnInit() {
  }

}
