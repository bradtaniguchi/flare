import { Injectable } from '@angular/core';
import { AppState } from '../app-state';
import { Store, select } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import {
  DeckActionTypes,
  SearchDecksFailed,
  SearchDecksSuccess,
  SearchDecks,
  CreateDeck,
  CreateDeckSuccess,
  CreateDeckFailed,
  GetDeck,
  GetDeckSuccess,
  GetDeckFailed
} from './deck.actions';
import {
  withLatestFrom,
  switchMap,
  catchError,
  map,
  mergeMap
} from 'rxjs/operators';
import { DeckService } from 'src/app/core/services/deck/deck.service';
import { of, Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { Notify } from '../notify/notify.actions';
import { logger } from 'src/app/core/logger';
import { Deck } from 'src/app/models/deck';

@Injectable()
export class DeckEffects {
  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private deck: DeckService
  ) {}

  @Effect()
  public create$ = this.actions$.pipe(
    ofType<CreateDeck>(DeckActionTypes.Create),
    withLatestFrom(this.store.select(state => state.auth.user)),
    mergeMap(([action, user]) => this.deck.create(action.payload, user)),
    switchMap(deck => [
      new CreateDeckSuccess(deck),
      new Notify({
        message: 'Successfully Created Deck'
      })
    ]),
    catchError(err => {
      logger.error(err);
      return of(new CreateDeckFailed());
    })
  );

  @Effect()
  public search$ = this.actions$.pipe(
    ofType(DeckActionTypes.Search),
    withLatestFrom(this.store.select(state => state.auth.user)),
    switchMap(([action, user]: [SearchDecks, User]) =>
      this.deck.list({ user, queryFn: action.payload })
    ),
    map(res => new SearchDecksSuccess(res)),
    catchError(err => {
      logger.error(err);
      return of(new SearchDecksFailed());
    })
  );

  @Effect()
  public get$ = this.actions$.pipe(
    ofType(DeckActionTypes.Get),
    withLatestFrom(this.store.select(state => state.auth.user)),
    switchMap(([action, user]: [GetDeck, User]) =>
      this.deck.get({ deckId: action.payload, user })
    ),
    map(res => new GetDeckSuccess(res)),
    catchError(err => {
      logger.error(err);
      return of(new GetDeckFailed());
    })
  );
}
