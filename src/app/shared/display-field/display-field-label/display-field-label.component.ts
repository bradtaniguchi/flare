import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-display-field-label',
  template: `
    <div class="mat-body-2"><ng-content></ng-content></div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisplayFieldLabelComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
