import {Component, HostBinding, OnInit} from '@angular/core';
import { AboutDetail } from "../../service/aboutus/aboutus.service";
import { ActivatedRoute } from "@angular/router";
import {slideToRight} from "../../util/animations/router.animate";

@Component({
  selector: 'app-about-detail',
  templateUrl: './about-detail.component.html',
  styleUrls: ['./about-detail.component.scss'],
  animations: [slideToRight]
})
export class AboutDetailComponent implements OnInit {
  @HostBinding('@routeAnim') state;

  about: AboutDetail;
  constructor(private routerInfo: ActivatedRoute) {
    this.routerInfo.data.subscribe((res: {about: AboutDetail}) => {
      // console.log(res);
      this.about = res.about;
    });
  }

  ngOnInit() {}

  back() {
    history.back();
  }

}
