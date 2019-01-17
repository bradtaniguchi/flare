import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-dashboard-actions',
  template: `
    <div fxLayout="row" fxLayoutAlign="center">
      <button mat-button type="button" color="primary">Create Deck</button>
      <button mat-button type="button" color="primary">Create Card</button>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardActionsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
