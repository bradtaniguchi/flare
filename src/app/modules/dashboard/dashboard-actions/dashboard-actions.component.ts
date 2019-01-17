import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-dashboard-actions',
  template: `
    <div fxLayout="row" fxLayoutAlign="center">
      <button
        mat-button
        type="button"
        color="primary"
        routerLink="/decks/create"
      >
        Create Deck
      </button>
      <button
        mat-button
        type="button"
        color="primary"
        routerLink="/cards/create"
      >
        Create Card
      </button>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardActionsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
