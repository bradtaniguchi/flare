import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { MatDrawer } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { map, switchMap, take, takeUntil } from 'rxjs/operators';
import { AppState } from 'src/app/app-store/app-state';
import { InitDeckStudy } from 'src/app/app-store/deck-study/deck-study.actions';
import { CardService } from 'src/app/core/services/card/card.service';
import { DeckService } from 'src/app/core/services/deck/deck.service';
import { Card } from 'src/app/models/card';
import { Deck } from 'src/app/models/deck';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-study',
  template: `
    <mat-drawer-container>
      <mat-drawer #drawer [opened]="sidenavOpened$ | async">
        <app-study-overview-side-nav></app-study-overview-side-nav>
      </mat-drawer>
      <mat-drawer-content> <router-outlet></router-outlet> </mat-drawer-content>
    </mat-drawer-container>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudyComponent implements OnInit, OnDestroy {
  @ViewChild('drawer') drawer: MatDrawer;
  public sidenavOpened$: Observable<boolean>;
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
    this.sidenavOpened$ = this.store.pipe(
      select(state => state.deckStudy.sidenavOpened),
      map(sidenavOpened => !!sidenavOpened)
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
