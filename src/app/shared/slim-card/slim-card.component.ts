import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-slim-card',
  template: `
    <ng-content></ng-content>
  `,
  styles: [
    `
      :host {
        border: 1px solid currentColor;
        border-color: rgba(255, 255, 255, 0.12);
        padding: 16px;
        display: block;
        position: relative;
        border-radius: 4px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlimCardComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
