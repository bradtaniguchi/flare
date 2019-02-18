import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-dashboard-study-actions',
  template: `
    <mat-card> Study actions </mat-card>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardStudyActionsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
