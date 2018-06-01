import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GuideSearchResult} from "../../../service/guide/guide.model";

@Component({
  selector: 'app-searchlist',
  templateUrl: './searchlist.component.html',
  styleUrls: ['./searchlist.component.scss']
})
export class SearchlistComponent implements OnInit {
  @Input() searchList: GuideSearchResult[];

  // 发射选中的数据
  @Output() selectItem: EventEmitter<GuideSearchResult> = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  // scroll发射的点击事件
  _emitselectItem(target) {
    const ques = this.searchList.find(item => item.title === target.title);
    this.selectItem.emit(ques);
  }

  // _emitselectItem(ques: GuideSearchResult): void {
  //   console.log(1);
  //   this.selectItem.emit(ques);
  // }
}
