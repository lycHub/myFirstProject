import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {
  business = [{
    title: '合作加盟',
    items: [{
      type: '',
      pic: '../../../assets/aboutus/icon_car.png',
      name: '车辆合作'
    }, {
      type: '',
      pic: '../../../assets/aboutus/icon_camp.png',
      name: '营地合作'
    }, {
      type: '',
      pic: '../../../assets/aboutus/icon_agency.png',
      name: '旅行社合作'
    }]
  }, {
    title: '人才加盟',
    items: [{
      type: '',
      pic: '../../../assets/aboutus/icon_nanchang.png',
      name: '南昌'
    }, {
      type: '',
      pic: '../../../assets/aboutus/icon_shanghai.png',
      name: '上海'
    }, {
      type: '',
      pic: '../../../assets/aboutus/icon_Los_Angeles.png',
      name: '洛杉矶'
    }]
  }, {
    title: '法律声明',
    items: [{
      type: 'law',
      pic: '../../../assets/aboutus/icon_copyright.png',
      name: '版权声明'
    }, {
      type: '',
      pic: '../../../assets/aboutus/icon_law.png',
      name: '法律声明'
    }]
  }]

  constructor() {}

  ngOnInit() {}

  back() {
    history.back();
  }
}
