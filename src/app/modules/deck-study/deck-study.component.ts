import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { map, share, startWith, switchMap } from 'rxjs/operators';
import { CardService } from 'src/app/core/services/card/card.service';
import { DeckService } from 'src/app/core/services/deck/deck.service';
import { Card } from 'src/app/models/card';
import { Deck } from 'src/app/models/deck';
import { User } from 'src/app/models/user';

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
  private user: User;
  constructor(
    private route: ActivatedRoute,
    private deckService: DeckService,
    private cardService: CardService
  ) {}

  ngOnInit() {
    this.user = this.route.snapshot.data.user;
    this.deckId$ = this.route.params.pipe(map(params => params.deckId));
    this.deck$ = this.observeDeck();

    this.loadingDecks$ = this.deck$.pipe(
      startWith(true),
      map(deck => !deck)
    );

    this.cards$ = this.observeCards();
    this.cardsLoading$ = this.cards$.pipe(
      map(cards => !cards),
      startWith(true)
    );
  }

  private observeDeck(): Observable<Deck> {
    return this.deckId$.pipe(
      switchMap(deckId => this.deckService.get({ deckId, user: this.user })),
      share()
    );
  }

  private observeCards(): Observable<Card[]> {
    return this.deck$.pipe(
      switchMap(deck =>
        deck
          ? this.cardService.search({
              queryFn: ref => ref.where('deck', '==', deck.uid)
            })
          : of([])
      ),
      share()
    );
  }
}
