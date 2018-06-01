import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-business',
  template: `
    <div class="about-component">
      <div class="title-wrap">
        <h3>{{businessItem.title}}</h3>
      </div>


      <div class="about-wrapper">
        <div class="about-component-list">
          <div class="about-component-item" *ngFor="let item of businessItem.items;" (click)="onClick(item.type)" [routerLink]="['./aboutus', item.type]">
            <div class="about-component-item-wrap">
              <div class="pic"><img src="{{item.pic}}" alt="{{item.name}}" /></div>
              <span>{{item.name}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>`,
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent {
  @Input() title: string;

  @Input() businessItem;

  constructor() { }

  onClick(type: string): void {
    if (type.length <= 0) alert('正在添加');
  }

}
