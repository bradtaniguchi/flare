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
    <mat-card class="margin-top-bottom">
      <mat-card-title> {{ deck.name }} </mat-card-title>
      <mat-card-content>
        <p>{{ deck.name }}</p>
        <p># of cards: {{ tempCardCount() }}</p>
      </mat-card-content>
      <mat-card-actions align="end">
        <button
          type="button"
          mat-button
          color="warn"
          *ngIf="canDelete"
          (click)="remove.emit(deck)"
        >
          Delete
        </button>
        <button type="button" mat-button (click)="viewCards.emit(deck)">
          Cards
        </button>
        <button
          type="button"
          mat-button
          color="primary"
          (click)="study.emit(deck)"
        >
          Study
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
