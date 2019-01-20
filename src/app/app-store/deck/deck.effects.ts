import { Injectable } from '@angular/core';
import { AppState } from '../app-state';
import { Store } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import {
  DeckActionTypes,
  SearchDecksFailed,
  SearchDecksSuccess,
  SearchDecks
} from './deck.actions';
import { withLatestFrom, switchMap, catchError, map } from 'rxjs/operators';
import { DeckService } from 'src/app/core/services/deck/deck.service';
import { of } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable()
export class DeckEffects {
  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private deck: DeckService
  ) {}

  @Effect()
  public search$ = this.actions$.pipe(
    ofType(DeckActionTypes.Search),
    withLatestFrom(this.store.select(state => state.auth.user)),
    switchMap(([action, user]: [SearchDecks, User]) =>
      this.deck.list({ user, queryFn: action.payload })
    ),
    map(res => new SearchDecksSuccess(res)),
    catchError(err => {
      console.error(err);
      return of(new SearchDecksFailed());
    })
  );
}
