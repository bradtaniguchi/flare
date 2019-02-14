import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeckService } from 'src/app/core/services/deck/deck.service';
import { CardService } from 'src/app/core/services/card/card.service';
import { Subject, Observable, of, combineLatest } from 'rxjs';
import { map, switchMap, share, takeUntil, take } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { Deck } from 'src/app/models/deck';
import { Card } from 'src/app/models/card';
import { AppState } from 'src/app/app-store/app-state';
import { Store } from '@ngrx/store';
import { InitDeckStudy } from 'src/app/app-store/deck-study/deck-study.actions';

@Component({
  selector: 'app-study',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudyComponent implements OnInit, OnDestroy {
  private deckId$: Observable<string>;
  private deck$: Observable<Deck>;
  private cards$: Observable<Card[]>;
  private user: User;
  private takeUntil = new Subject();
  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private deckService: DeckService,
    private cardService: CardService
  ) {}

  ngOnInit() {
    this.user = this.route.snapshot.data.user;
    this.deckId$ = this.route.params.pipe(map(params => params.deckId));
    this.deck$ = this.observeDeck();
    this.cards$ = this.observeCards();
    combineLatest(this.deck$, this.cards$)
      .pipe(
        take(1),
        takeUntil(this.takeUntil)
      )
      .subscribe(([deck, cards]) =>
        this.store.dispatch(new InitDeckStudy({ deck, cards }))
      );
  }

  ngOnDestroy() {
    this.takeUntil.next();
    this.takeUntil.unsubscribe();
  }

  private observeDeck(): Observable<Deck> {
    return this.deckId$.pipe(
      switchMap(deckId => this.deckService.get({ deckId, user: this.user }))
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
      )
    );
  }
}
