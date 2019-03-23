import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, filter } from 'rxjs/operators';
import { AppState } from 'src/app/app-store/app-state';
import { logger } from 'src/app/core/logger';
import { DeckService } from 'src/app/core/services/deck/deck.service';
import {
  SearchDeckFailed,
  SearchDeckSuccess,
  SearchGroupSuccess,
  SearchGroupFailed
} from './dashboard.actions';
import { GroupService } from 'src/app/core/services/group/group.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardEffects {
  constructor(
    private store: Store<AppState>,
    private deck: DeckService,
    private group: GroupService
  ) {}

  @Effect()
  searchDecks$ = this.store.pipe(
    select(state => state.auth.user),
    // we only want to get items if the user exists
    filter(user => !!user),
    mergeMap(user =>
      this.deck.list({
        user,
        queryFn: ref => ref.limit(5).where('createdBy', '==', user.uid)
      })
    ),
    map(decks => new SearchDeckSuccess(decks)),
    catchError(err => {
      logger.error(err);
      return of(new SearchDeckFailed());
    })
  );

  @Effect()
  searchGroups$ = this.store.pipe(
    select(state => state.auth.user),
    mergeMap(user =>
      this.group.listUserGroups({
        user,
        queryFn: ref => ref.limit(5)
      })
    ),
    map(groups => new SearchGroupSuccess(groups)),
    catchError(err => {
      logger.error(err);
      return of(new SearchGroupFailed());
    })
  );
}
