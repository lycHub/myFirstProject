import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import {HqScrollService} from "../hq-backtop.service";
import {Subscription} from "rxjs/Subscription";
import { fromEvent } from 'rxjs/observable/fromEvent';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';
import { throttleTime } from 'rxjs/operators/throttleTime';
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'hq-backtop',
  template: `<div class="hq-backUp" [style.bottom]="hqBottom + 'px'" [@enterLeave] *ngIf="visible">
    <img src="../../../../assets/common/backtop.png" alt="图标" />
  </div>`,
  styles: [`.hq-backUp{
    position: fixed;
    right: 20px;
    height: 40px;
    width: 40px;
    z-index: 2;
    cursor: pointer;
  }`],
  animations: [
    trigger('enterLeave', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate(300, style({ opacity: 0 }))
      ])
    ])
  ],
})
export class HqBacktopComponent implements OnInit, OnDestroy {
  private scroll$: Subscription = null;
  private target: HTMLElement = null;
  visible = false;

  // botton
  @Input() hqBottom = 20;


  // 滚动多少距离显示
  private _visibilityHeight = 400;

  @Input()
  set hqVisibilityHeight(value: number) {
    this._visibilityHeight = Number(value);
  }
  get hqVisibilityHeight(): number {
    return this._visibilityHeight;
  }


  @Input()
  set hqTarget(el: HTMLElement) {
    this.target = el;
    this.registerScrollEvent();
  }


  @HostListener('click', ['$event']) toUp() {
    this.scrollSrv.scrollTo(this.getTarget(), 0);
  }


  constructor(private scrollSrv: HqScrollService,  private cd: ChangeDetectorRef) { }

  ngOnInit() {
    if (!this.scroll$) { this.registerScrollEvent(); }
  }

  private getTarget(): HTMLElement | Window {
    return this.target || window;
  }


  private handleScroll(): void {
    if (this.visible === this.scrollSrv.getScroll(this.getTarget()) > this.hqVisibilityHeight) { return; }
    this.visible = !this.visible;
    this.cd.detectChanges();
  }

  private removeListen(): void {
    if (this.scroll$) { this.scroll$.unsubscribe(); }
  }

  private registerScrollEvent(): void {
    this.removeListen();
    this.handleScroll();
    this.scroll$ = fromEvent(this.getTarget(), 'scroll').pipe(throttleTime(30), distinctUntilChanged()).subscribe(e => this.handleScroll());
  }

  ngOnDestroy(): void {
    this.removeListen();
  }

}
