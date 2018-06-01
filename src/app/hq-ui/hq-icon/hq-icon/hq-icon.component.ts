import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'hq-icon',
  template: `<i></i>`,
  styleUrls: ['./hq-icon.component.scss']
})
export class HqIconComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
