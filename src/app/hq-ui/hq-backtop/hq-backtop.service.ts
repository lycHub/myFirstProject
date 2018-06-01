import { Inject, Injectable, Optional, Provider, SkipSelf } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {reqAnimFrame} from "../polyfill/request-animation";


export type EasyingFn = (t: number, b: number, c: number, d: number) => number;

function easeInOutCubic(t: number, b: number, c: number, d: number): number {
  const cc = c - b;
  let tt = t / (d / 2);
  if (tt < 1) {
    return cc / 2 * tt * tt * tt + b;
  } else {
    return cc / 2 * ((tt -= 2) * tt * tt + 2) + b;
  }
}


@Injectable()
export class HqScrollService {
  private doc: Document;

  constructor(@Inject(DOCUMENT) doc: any) {
    this.doc = doc;
  }

  /** 获取 `el` 滚动条位置 */
  getScroll(el?: Element | Window, top: boolean = true): number {
    const target = el ? el : window;
    const prop = top ? 'pageYOffset' : 'pageXOffset';
    const method = top ? 'scrollTop' : 'scrollLeft';
    const isWindow = target === window;
    let ret = isWindow ? target[ prop ] : target[ method ];
    if (isWindow && typeof ret !== 'number') {
      ret = this.doc.documentElement[ method ];
    }
    return ret;
  }


  /** 设置 `el` 滚动条位置 */
  setScrollTop(el: Element | Window, topValue: number = 0): void {
    if (el === window) {
      this.doc.body.scrollTop = topValue;
      this.doc.documentElement.scrollTop = topValue;
    } else {
      (el as Element).scrollTop = topValue;
    }
  }


  /**
   * 使用动画形式将 `el` 滚动至某位置
   *
   * @param containerEl 容器，默认 `window`
   * @param targetTopValue 滚动至目标 `top` 值，默认：0，相当于顶部
   * @param easing 动作算法，默认：`easeInOutCubic`
   * @param callback 动画结束后回调
   */
  scrollTo(
    containerEl: Element | Window,
    targetTopValue: number = 0,
    easing?: EasyingFn,
    callback?: () => void
  ): void {
    const target = containerEl ? containerEl : window;
    const scrollTop = this.getScroll(target);
    const startTime = Date.now();
    const frameFunc = () => {
      const timestamp = Date.now();
      const time = timestamp - startTime;
      this.setScrollTop(target, (easing || easeInOutCubic)(time, scrollTop, targetTopValue, 450));
      if (time < 450) {
        reqAnimFrame(frameFunc);
      } else {
        if (callback) callback();
      }
    };
    reqAnimFrame(frameFunc);
  }
}


export function SCROLL_SERVICE_PROVIDER_FACTORY(doc: Document, scrollService: HqScrollService): HqScrollService {
  return scrollService || new HqScrollService(doc);
}

export const SCROLL_SERVICE_PROVIDER: Provider = {
  provide   : HqScrollService,
  useFactory: SCROLL_SERVICE_PROVIDER_FACTORY,
  deps      : [ DOCUMENT, [ new Optional(), new SkipSelf(), HqScrollService ] ]
}
