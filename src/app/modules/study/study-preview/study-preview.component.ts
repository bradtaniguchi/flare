import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, startWith, take, tap } from 'rxjs/operators';
import { AppState } from 'src/app/app-store/app-state';
import { logger } from 'src/app/core/logger';
import { DeckStudyUtilService } from 'src/app/core/services/deck-study-util/deck-study-util.service';
import { Card } from 'src/app/models/card';
import { Deck } from 'src/app/models/deck';
import { SelectCard } from 'src/app/app-store/deck-study/deck-study.actions';

@Component({
  selector: 'app-study-preview',
  template: `
    <div class="view-container-padding">
      <app-spinner-container [loading]="deckLoading$">
        <ng-container *ngIf="(deck$ | async) as deck">
          <app-form-section-header header="Studying this deck">
          </app-form-section-header>
          <div matRipple class="margin-top-bottom">
            <mat-card class="clickable" (click)="start()">
              <mat-card-header>
                <mat-icon mat-card-avatar class="center-icon icon"
                  >style</mat-icon
                >
                <mat-card-title> {{ deck.name }} </mat-card-title>
                <mat-card-subtitle>
                  # of cards: {{ (cards$ | async).length }}
                </mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <p>{{ deck.description }}</p>
                <mat-divider></mat-divider>
              </mat-card-content>
              <mat-card-actions align="end">
                <button type="button" (click)="back()" mat-button>Back</button>
                <button
                  type="button"
                  (click)="start()"
                  mat-button
                  color="primary"
                >
                  Start
                </button>
              </mat-card-actions>
            </mat-card>
          </div>
        </ng-container>
      </app-spinner-container>
      <div fxLayout="row" fxLayoutGap="16px">
        <div fxFlex>
          <mat-card class="margin-top-bottom">
            <mat-card-content>
              Previous session information will go here...
            </mat-card-content>
          </mat-card>
        </div>
        <div fxFlex>
          <mat-card class="margin-top-bottom">
            <mat-card-content>
              Average Deck session information will go here
            </mat-card-content>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudyPreviewComponent implements OnInit {
  public deck$: Observable<Deck>;
  public cards$: Observable<Card[]>;
  public deckLoading$: Observable<boolean>;
  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router,
    private deckStudyUtil: DeckStudyUtilService
  ) {}

  ngOnInit() {
    this.deck$ = this.store.pipe(select(state => state.deckStudy.deck));
    this.cards$ = this.store.pipe(select(state => state.deckStudy.cards));
    this.deckLoading$ = this.deck$.pipe(
      map(deck => !deck),
      startWith(true)
    );
  }

  back() {
    this.router.navigate(['']);
  }
  start() {
    logger.log('clicked start');
    this.store
      .pipe(
        select(state => state.deckStudy),
        map(deckState => this.deckStudyUtil.getNextCard(deckState)),
        tap(card => this.store.dispatch(new SelectCard(card.uid))),
        take(1)
      )
      .subscribe(card =>
        card
          ? this.router.navigate(['card', card.uid], { relativeTo: this.route })
          : this.handleNoNextCard()
      );
  }
  private handleNoNextCard() {
    logger.log('no next card');
  }
}
