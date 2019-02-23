import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { mergeMap, map, take } from 'rxjs/operators';
import { AppState } from 'src/app/app-store/app-state';
import {
  SkipCard,
  FlipCard,
  GotCardIncorrect,
  GotCardCorrect,
  SelectCard
} from 'src/app/app-store/deck-study/deck-study.actions';
import { logger } from 'src/app/core/logger';
import { Card } from 'src/app/models/card';
import { DeckStudyUtilService } from 'src/app/core/services/deck-study-util/deck-study-util.service';

@Component({
  selector: 'app-study-card',
  template: `
    <div class="view-container-padding">
      <ng-container *ngIf="(card$ | async) as card; else noCard">
        <div class="full-height">
          <!-- container for text-->
          <mat-menu #overviewMenu>
            <button mat-menu-item (click)="showOverview()">overview</button>
            <button mat-menu-item (click)="exit()">exit</button>
          </mat-menu>
          <ng-template #showFront>
            <div fxLayout="row">
              <button
                mat-icon-button
                aria-label="Study Overview"
                [matMenuTriggerFor]="overviewMenu"
              >
                <mat-icon>more_vert</mat-icon>
              </button>
              <app-form-section-header
                header="Front"
                [description]="cardDescription$ | async"
              ></app-form-section-header>
            </div>
            <app-slim-card
              fxLayout="column"
              fxLayoutAlign="center center"
              class="margin-top-bottom"
            >
              <p class="mat-body-2">{{ card.front }}</p>
            </app-slim-card>
          </ng-template>
          <ng-container *ngIf="(flipped$ | async); else showFront">
            <div fxLayout="row">
              <button mat-icon-button aria-label="Study Overview">
                <mat-icon>more_vert</mat-icon>
              </button>
              <app-form-section-header
                header="Back"
                [description]="cardDescription$ | async"
              ></app-form-section-header>
            </div>
            <app-slim-card
              fxLayout="column"
              fxLayoutAlign="center center"
              class="margin-top-bottom"
            >
              <p class="mat-body-2">{{ card.back }}</p>
            </app-slim-card>
          </ng-container>
          <ng-template #showFrontBtns>
            <div fxLayout="row" fxLayoutGap="8px">
              <div fxFlex>
                <button
                  type="button"
                  (click)="skip(card)"
                  mat-stroked-button
                  class="full-width margin"
                >
                  Skip
                </button>
              </div>
              <div fxFlex>
                <button
                  type="button"
                  (click)="flip(card)"
                  mat-stroked-button
                  color="primary"
                  class="full-width margin"
                >
                  Flip
                </button>
              </div>
            </div>
          </ng-template>
          <ng-container *ngIf="(flipped$ | async); else showFrontBtns">
            <div fxLayout="row" fxLayoutGap="8px">
              <div fxFlex>
                <button
                  type="button"
                  (click)="wrong(card)"
                  mat-stroked-button
                  class="full-width margin"
                >
                  Got Wrong
                </button>
              </div>
              <div fxFlex>
                <button
                  type="button"
                  (click)="correct(card)"
                  mat-stroked-button
                  class="full-width"
                >
                  Got Correct
                </button>
              </div>
            </div>
          </ng-container>
        </div>
        <!-- container -->
      </ng-container>
      <ng-template #noCard>
        <div class="mat-display-1 no-margin center-text">
          Oops, no study session
        </div>
        <div fxLayout="row" fxLayoutAlign="center center">
          <button type="button" (click)="oops()" mat-button color="primary">
            Click here to start one
          </button>
        </div>
      </ng-template>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudyCardComponent implements OnInit {
  public card$: Observable<Card>;
  public flipped$: Observable<boolean>;
  public cardDescription$: Observable<string>;
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute,
    private deckStudyUtil: DeckStudyUtilService
  ) {}

  ngOnInit() {
    logger.log('study-card component called');
    this.card$ = this.store.pipe(
      select(state => state.deckStudy.card),
      mergeMap(cardId =>
        this.store.pipe(
          select(state =>
            state.deckStudy.cards.find(card => card.uid === cardId)
          )
        )
      )
    );
    this.flipped$ = this.store.pipe(select(state => state.deckStudy.flipped));
    this.cardDescription$ = this.observeCardDescription();
  }

  /**
   * Utility method that returns the description to show how many cards are finished in the deck
   * TODO: refactor to use "previous" attribute
   */
  private observeCardDescription(): Observable<string> {
    const correctCards$ = this.store.pipe(
      select(state => state.deckStudy.correct)
    );
    const missedCards$ = this.store.pipe(
      select(state => state.deckStudy.missed)
    );
    const skippedCards$ = this.store.pipe(
      select(state => state.deckStudy.skipped)
    );
    const totalCardsLength$ = this.store.pipe(
      select(state => state.deckStudy.cards.length)
    );
    return combineLatest(correctCards$, missedCards$, skippedCards$).pipe(
      map(
        ([correct, missed, skipped]) =>
          [...correct, ...missed, ...skipped].length
      ),
      mergeMap(finishedCards =>
        totalCardsLength$.pipe(
          map(
            totalCardsLength =>
              `${finishedCards}/${totalCardsLength} cards studied`
          )
        )
      )
    );
  }

  showOverview() {
    logger.log('showing overview');
  }
  exit() {
    logger.log('clicked exit');
  }
  skip(card: Card) {
    logger.log('clicked skip');
    this.store.dispatch(new SkipCard(card.uid));
  }
  flip(card: Card) {
    logger.log('clicked flip');
    this.store.dispatch(new FlipCard(card.uid));
  }
  wrong(card: Card) {
    logger.log('clicked wrong');
    this.store.dispatch(new GotCardIncorrect(card.uid));
  }
  correct(card: Card): void {
    logger.log('clicked right');
    this.store.dispatch(new GotCardCorrect(card.uid));
    this.store
      .pipe(
        select(state => state.deckStudy),
        take(1)
      )
      .subscribe(deckState => {
        const nextCard = this.deckStudyUtil.getNextCard(deckState);
        logger.log('test with nextCard: ', nextCard, deckState);
        if (nextCard) {
          return this.store.dispatch(new SelectCard(nextCard.uid));
        }
        logger.log('no next card going to review');
        this.router.navigate(['../../', 'review'], { relativeTo: this.route });
      });
  }
  oops() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
