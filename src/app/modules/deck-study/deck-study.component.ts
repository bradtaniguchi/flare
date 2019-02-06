import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { AppState } from 'src/app/app-store/app-state';
import { GetCards } from 'src/app/app-store/card/card.actions';
import { GetDeck } from 'src/app/app-store/deck/deck.actions';
import { Card } from 'src/app/models/card';
import { Deck } from 'src/app/models/deck';

@Component({
  selector: 'app-deck-study',
  template: `
    <div class="view-container-padding">
      <app-spinner-container [loading]="loadingDecks$">
        <div fxLayout="row" class="full-height">
          <div fxFlex="90">
            <div fxLayout="column" fxLayoutAlign="space-between" fxFlex>
              <div>
                <p>deck-study works! {{ deckId$ | async }}</p>
                <p>deck name: {{ (deck$ | async)?.name }}</p>
                <p>cards: {{ cards$ | async | json }}</p>
                <router-outlet></router-outlet>
              </div>
              <div>
                <!-- actions -->
                <button type="button" (click)="flip.next()" mat-stroked-button>
                  Flip
                </button>
                <button
                  type="button"
                  (click)="correct.next()"
                  mat-stroked-button
                  color="primary"
                >
                  Got Correct
                </button>
                <button
                  type="button"
                  (click)="wrong.next()"
                  mat-stroked-button
                  color="warn"
                >
                  Got Wrong
                </button>
              </div>
            </div>
          </div>
          <div fxFlex="10" fxLayoutAlign="end">
            <app-skip-button></app-skip-button>
          </div>
        </div>
      </app-spinner-container>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeckStudyComponent implements OnInit {
  public flip = new Subject();
  public correct = new Subject();
  public wrong = new Subject();

  public deckId$: Observable<string>;
  public deck$: Observable<Deck>;
  public loadingDecks$: Observable<boolean>;

  public cards$: Observable<Card[]>;
  public cardsLoading$: Observable<boolean>;
  constructor(private route: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit() {
    this.deckId$ = this.route.params.pipe(map(params => params.deckId));
    this.deckId$.pipe(take(1)).subscribe(deckId => {
      this.store.dispatch(new GetDeck(deckId));
      this.store.dispatch(new GetCards(deckId));
    });
    this.deck$ = this.observeDeck();

    this.loadingDecks$ = this.store.pipe(
      select(state => !state.decks.decksLoaded)
    );
    this.cards$ = this.observeCards();
    this.cardsLoading$ = this.store.pipe(
      select(state => !state.cards.recentLoaded)
    );
  }

  private observeDeck(): Observable<Deck> {
    return this.deckId$.pipe(
      switchMap(deckId =>
        // this wont work until we "wait" until the decks are loaded
        this.store.pipe(select(state => state.decks.decks[deckId]))
      )
    );
  }

  private observeCards(): Observable<Card[]> {
    return this.deck$.pipe(
      switchMap(deck =>
        this.store.pipe(
          select(state => state.cards.cards),
          map(cardMap =>
            deck
              ? Object.keys(deck.cards || {}).map(cardId => cardMap[cardId])
              : []
          )
        )
      )
    );
  }
}
