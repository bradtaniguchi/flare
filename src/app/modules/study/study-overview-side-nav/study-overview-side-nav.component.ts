import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-study-overview-side-nav',
  template: `
    <p>study-overview-side-nav works!</p>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudyOverviewSideNavComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
