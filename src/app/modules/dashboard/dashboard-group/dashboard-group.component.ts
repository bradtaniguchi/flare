import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output
} from '@angular/core';
import { Group } from 'src/app/models/group';

@Component({
  selector: 'app-dashboard-group',
  template: `
    <mat-card class="margin-top-bottom">
      <mat-card-title> {{ group.name }} </mat-card-title>
      <mat-card-content>
        <p>{{ group.description }}</p>
        <p>Decks: {{ group.deckCount || 0 }}</p>
      </mat-card-content>
      <mat-card-actions align="end">
        <button
          type="button"
          (click)="leave.emit(group)"
          mat-button
          color="warn"
        >
          Leave
        </button>
        <button type="button" (click)="addDeck.emit(group)" mat-button>
          Add Deck
        </button>
        <button
          type="button"
          (click)="viewDecks.emit(group)"
          mat-button
          *ngIf="group.deckCount"
        >
          Decks
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardGroupComponent implements OnInit {
  @Input() group: Group;
  @Output() leave = new EventEmitter();
  @Output() addDeck = new EventEmitter();
  @Output() viewDecks = new EventEmitter();
  constructor() {}

  ngOnInit() {}
}
