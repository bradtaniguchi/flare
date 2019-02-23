import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { Card } from 'src/app/models/card';
import { Deck } from 'src/app/models/deck';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/app-store/app-state';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-study-overview-side-nav',
  template: `
    <div class="main-view-container">
      <div fxLayout="row" fxLayoutAlign="end center">
        <div>TIME</div>
        <button mat-icon-button aria-label="close">
          <mat-icon>close</mat-icon>
        </button>
      </div>
      <mat-divider></mat-divider>
      <ng-container *ngIf="(sidenavOpened$ | async)">
        <mat-nav-list class="main-view-container">
          <ng-container *ngFor="let card of (previousCards$ | async)">
            <div mat-list-item>{{ card.front }}</div>
          </ng-container>
        </mat-nav-list>
      </ng-container>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudyOverviewSideNavComponent implements OnInit {
  public sidenavOpened$: Observable<boolean>;
  public previousCards$: Observable<Card[]>;
  public deck$: Observable<Deck>;
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.sidenavOpened$ = this.store.pipe(
      select(state => state.deckStudy.sidenavOpened)
    );
    this.previousCards$ = this.observePreviousCards();
  }

  private observePreviousCards(): Observable<Card[]> {
    return combineLatest(
      this.store.pipe(select(state => state.deckStudy.previous)),
      this.store.pipe(select(state => state.deckStudy.cards))
    ).pipe(
      map(([previousIds, cards]) =>
        previousIds.map(previousId =>
          cards.find(card => previousId === card.uid)
        )
      )
    );
  }
}
