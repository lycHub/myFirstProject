import { Injectable } from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

@Injectable()
export class RoutingStateService {
  history = [];
  constructor(private router: Router) { }

  loadRouting(): void {
    this.router.events
      .subscribe(event => {
        if (event instanceof NavigationEnd) this.history = [...this.history, event.urlAfterRedirects]
      });
  }

  getHistory(): string[] {
    return this.history;
  }

  getPreviousUrl(): string {
    return this.history[this.history.length - 2] || '/main';
  }
}
