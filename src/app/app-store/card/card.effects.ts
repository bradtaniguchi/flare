import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  catchError,
  map,
  switchMap,
  withLatestFrom,
  mergeMap
} from 'rxjs/operators';
import { CardService } from 'src/app/core/services/card/card.service';
import { AppState } from '../app-state';
import {
  CardActionTypes,
  SearchRecentCardsFailed,
  SearchRecentCardsSuccess,
  CreateCard
} from './card.actions';

@Injectable()
export class CardEffects {
  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private card: CardService
  ) {}
  // @Effect()
  // public create$ = this.actions$.pipe(ofType(CardActionTypes.Create),
  // // mergeMap(action => this.card.create()));

  // login$: Observable<Action> = this.actions$.pipe(
  //   ofType('LOGIN'),
  //   mergeMap(action =>
  //     this.http.post('/auth', action.payload).pipe(
  //       // If successful, dispatch success action with result
  //       map(data => ({ type: 'LOGIN_SUCCESS', payload: data })),
  //       // If request fails, dispatch failed action
  //       catchError(() => of({ type: 'LOGIN_FAILED' }))
  //     )
  //   )
  // );
  @Effect()
  public create$ = this.actions$.pipe(
    ofType<CreateCard>(CardActionTypes.Create),
    withLatestFrom(this.store.select(state => state.auth.user)),
    mergeMap(([action, user]) => this.card.create(action.payload, user))
  );

  @Effect()
  public searchRecent$ = this.actions$.pipe(
    ofType(CardActionTypes.SearchRecent),
    withLatestFrom(this.store.select(state => state.auth.user)),
    switchMap(([_, user]) => this.card.listRecent({ user })),
    map(res => new SearchRecentCardsSuccess(res)),
    catchError(err => {
      console.error(err);
      return of(new SearchRecentCardsFailed());
    })
  );
}
