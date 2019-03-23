import { Injectable } from '@angular/core';
import { Effect } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, filter, map, mergeMap } from 'rxjs/operators';
import { AppState } from 'src/app/app-store/app-state';
import { logger } from 'src/app/core/logger';
import { DeckService } from 'src/app/core/services/deck/deck.service';
import { GroupService } from 'src/app/core/services/group/group.service';
import {
  SearchDeckFailed,
  SearchDeckSuccess,
  SearchGroupFailed,
  SearchGroupSuccess
} from './dashboard.actions';

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
      this.deck
        .list({
          user,
          queryFn: ref => ref.limit(5).where('createdBy', '==', user.uid)
        })
        .pipe(
          map(decks => new SearchDeckSuccess(decks)),
          catchError(err => {
            logger.error(err);
            return of(new SearchDeckFailed());
          })
        )
    )
  );

  @Effect()
  searchGroups$ = this.store.pipe(
    select(state => state.auth.user),
    mergeMap(user =>
      this.group
        .listUserGroups({
          user,
          queryFn: ref => ref.limit(5)
        })
        .pipe(
          map(groups => new SearchGroupSuccess(groups)),
          catchError(err => {
            logger.error(err);
            return of(new SearchGroupFailed());
          })
        )
    )
  );
}
