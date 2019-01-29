import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  catchError,
  map,
  switchMap,
  withLatestFrom,
  mergeMap,
  tap
} from 'rxjs/operators';
import { CardService } from 'src/app/core/services/card/card.service';
import { AppState } from '../app-state';
import {
  CardActionTypes,
  SearchRecentCardsFailed,
  SearchRecentCardsSuccess,
  CreateCard,
  CreateCardFailed,
  CreateCardSuccess
} from './card.actions';
import { logger } from 'src/app/core/logger';

@Injectable()
export class CardEffects {
  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private card: CardService
  ) {}
  @Effect()
  public create$ = this.actions$.pipe(
    ofType<CreateCard>(CardActionTypes.Create),
    withLatestFrom(this.store.select(state => state.auth.user)),
    mergeMap(([action, user]) => this.card.create(action.payload, user)),
    map(card => new CreateCardSuccess(card)),
    catchError(err => {
      logger.error(err);
      return of(new CreateCardFailed());
    })
  );

  @Effect()
  public searchRecent$ = this.actions$.pipe(
    ofType(CardActionTypes.SearchRecent),
    withLatestFrom(this.store.select(state => state.auth.user)),
    switchMap(([_, user]) => this.card.listRecent({ user })),
    map(res => new SearchRecentCardsSuccess(res)),
    catchError(err => {
      logger.error(err);
      return of(new SearchRecentCardsFailed());
    })
  );
}
