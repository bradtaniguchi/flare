import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `
    <div flexLayout="row" fxLayoutAlign="center center" class="full-height">
      <mat-progress-spinner mode="indeterminate" color="primary" diameter="50">
      </mat-progress-spinner>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
