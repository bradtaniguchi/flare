import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  withLatestFrom
} from 'rxjs/operators';
import { logger } from 'src/app/core/logger';
import { CardService } from 'src/app/core/services/card/card.service';
import { AppState } from '../app-state';
import {
  CardActionTypes,
  CreateCard,
  CreateCardFailed,
  CreateCardSuccess,
  GetCards,
  GetCardsFailed,
  GetCardsSuccess
} from './card.actions';

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
  public get$ = this.actions$.pipe(
    ofType(CardActionTypes.Get),
    // withLatestFrom(this.store.select(state => state.auth.user)),
    switchMap((action: GetCards) =>
      this.card.search({
        queryFn: ref => ref.where('deck', '==', action.payload)
      })
    ),
    map(res => new GetCardsSuccess(res)),
    catchError(err => {
      logger.error(err);
      return of(new GetCardsFailed());
    })
  );
}
