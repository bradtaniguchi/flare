import { Injectable } from '@angular/core';
import { AppState } from '../app-state';
import { Store } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import {
  DeckActionTypes,
  SearchDecksFailed,
  SearchDecksSuccess,
  SearchDecks,
  CreateDeck,
  CreateDeckSuccess,
  CreateDeckFailed
} from './deck.actions';
import {
  withLatestFrom,
  switchMap,
  catchError,
  map,
  mergeMap
} from 'rxjs/operators';
import { DeckService } from 'src/app/core/services/deck/deck.service';
import { of } from 'rxjs';
import { User } from 'src/app/models/user';
import { Notify } from '../notify/notify.actions';
import { logger } from 'src/app/core/logger';

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
}
