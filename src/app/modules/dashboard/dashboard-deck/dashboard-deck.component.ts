import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { Deck } from 'src/app/models/deck';

@Component({
  selector: 'app-dashboard-deck',
  template: `
    <div matRipple class="margin-top-bottom">
      <mat-card class="clickable" (click)="study.emit(deck)">
        <mat-card-header>
          <mat-icon mat-card-avatar class="center-icon">library_books</mat-icon>
          <mat-card-title> {{ deck.name }} </mat-card-title>
          <mat-card-subtitle>
            # of cards: {{ tempCardCount() }}
          </mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p>{{ deck.name }}</p>
          <mat-divider></mat-divider>
        </mat-card-content>
        <mat-card-actions
          fxLayout="row"
          fxLayoutAlign="space-between"
          class="last-child"
        >
          <div>
            <button
              type="button"
              mat-button
              color="primary"
              (click)="study.emit(deck); $event.stopPropagation()"
            >
              Study
            </button>
            <button
              type="button"
              mat-button
              (click)="edit.emit(deck); $event.stopPropagation()"
            >
              <mat-icon>edit</mat-icon> Edit
            </button>
          </div>
          <button
            type="button"
            mat-icon-button
            aria-label="More Options"
            fxFlexAlign="end"
            [matMenuTriggerFor]="menu"
            (click)="$event.stopPropagation()"
          >
            <!-- TODO: make menu appear -->
            <mat-icon>more_vert</mat-icon>
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
    <mat-menu #menu="matMenu">
      <button mat-menu-item type="button" (click)="remove.emit(deck)">
        Delete
      </button>
    </mat-menu>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardDeckComponent implements OnInit {
  @Input() deck: Deck;
  @Output() remove = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() study = new EventEmitter();
  // TODO change later
  public canDelete = true;
  constructor() {}

  ngOnInit() {}

  tempCardCount(): number {
    return Object.keys(this.deck.cards || {}).length;
  }
}
