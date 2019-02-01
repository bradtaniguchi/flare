import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output
} from '@angular/core';
import { Deck } from 'src/app/models/deck';

@Component({
  selector: 'app-dashboard-deck',
  template: `
    <mat-card
      class="margin-top-bottom clickable"
      (click)="study.emit(deck)"
      matRipple
    >
      <mat-card-header>
        <mat-icon mat-card-avatar class="center-icon">library_books</mat-icon>
        <mat-card-title> {{ deck.name }} </mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p>{{ deck.name }}</p>
        <p># of cards: {{ tempCardCount() }}</p>
        <mat-divider></mat-divider>
      </mat-card-content>
      <mat-card-actions fxLayout="row" fxLayoutAlign="space-between">
        <!--<button
          type="button"
          mat-button
          color="warn"
          *ngIf="canDelete"
          (click)="remove.emit(deck)"
        >
          Delete
        </button>-->
        <div>
          <button
            type="button"
            mat-button
            color="primary"
            (click)="study.emit(deck)"
          >
            Study
          </button>
          <button type="button" mat-button (click)="viewCards.emit(deck)">
            Cards
          </button>
        </div>
        <button
          type="button"
          mat-icon-button
          aria-label="More Options"
          fxFlexAlign="end"
        >
          <!-- TODO: make menu appear -->
          <mat-icon>more_vert</mat-icon>
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardDeckComponent implements OnInit {
  @Input() deck: Deck;
  @Output() remove = new EventEmitter();
  @Output() viewCards = new EventEmitter();
  @Output() study = new EventEmitter();
  // TODO change later
  public canDelete = true;
  constructor() {}

  ngOnInit() {}

  tempCardCount(): number {
    return Object.keys(this.deck.cards || {}).length;
  }
}
