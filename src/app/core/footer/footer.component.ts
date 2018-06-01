import {Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit} from '@angular/core';

declare const ClipboardJS: any;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, AfterViewInit {
  clipboard;

  @ViewChild('weChat') weChat: ElementRef;
  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    if (this.weChat) {
      const dom = this.weChat.nativeElement;
      this.clipboard = new ClipboardJS(dom);
    }
  }

  copy() {
    this.clipboard.on('success', function(e) {
      alert('已复制到剪切板，欢迎进入微信搜索关注!');
      e.clearSelection();
    });
    this.clipboard.on('error', () => alert('复制失败!'));
  }
}
