import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-title-line',
  template: `<div class="title"><hr /><h5><ng-content></ng-content></h5><hr /></div>`,
  styleUrls: ['./title-line.component.scss']
})
export class TitleLineComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
