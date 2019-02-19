import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AppState } from 'src/app/app-store/app-state';
import { Store } from '@ngrx/store';
import { Notify } from 'src/app/app-store/notify/notify.actions';

@Component({
  selector: 'app-dashboard-study-actions',
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title> Start Studying </mat-card-title>
      </mat-card-header>
      <mat-card-content fxLayoutAlign="center" fxLayoutGap="16px">
        <button
          mat-raised-button
          type="primary"
          color="primary"
          class="large"
          (click)="noop()"
        >
          Study Random Deck
        </button>
      </mat-card-content>
    </mat-card>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardStudyActionsComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit() {}

  noop() {
    this.store.dispatch(
      new Notify({
        message: 'Sorry feature is not setup yet'
      })
    );
  }
}
