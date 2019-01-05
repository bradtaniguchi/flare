import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { CardActionTypes } from './card.actions';
import { mergeMap } from 'rxjs/operators';
import { CardService } from 'src/app/core/services/card/card.service';

@Injectable()
export class CardEffects {
  constructor(private actions$: Actions, private card: CardService) {}
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
}
