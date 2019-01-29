import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-display-field',
  template: `
    <div class="mat-body-1"><ng-content></ng-content></div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisplayFieldComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
