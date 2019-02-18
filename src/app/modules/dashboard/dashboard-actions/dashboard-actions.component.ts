import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-dashboard-actions',
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title> Create things to study </mat-card-title>
      </mat-card-header>
      <mat-card-content fxLayoutAlign="center" fxLayoutGap="16px">
        <button
          mat-raised-button
          type="button"
          color="primary"
          class="large"
          routerLink="/decks/create"
        >
          Create A New Deck
        </button>
        <button
          mat-raised-button
          type="button"
          color="primary"
          class="large"
          routerLink="/cards/create"
        >
          Create A New Card
        </button>
      </mat-card-content>
    </mat-card>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardActionsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
