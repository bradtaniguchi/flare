import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { GroupService } from 'src/app/core/services/group/group.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state';
import {
  GroupActionTypes,
  SearchGroupsSuccess,
  SearchGroupsFailed
} from './group.actions';
import { withLatestFrom, switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class GroupEffects {
  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private group: GroupService
  ) {}
  @Effect()
  public search$ = this.actions$.pipe(
    ofType(GroupActionTypes.Search),
    withLatestFrom(this.store.select(state => state.auth.user)),
    switchMap(([action, user]) => this.group.list({ user })),
    map(res => new SearchGroupsSuccess(res)),
    catchError(err => {
      console.error(err);
      return of(new SearchGroupsFailed());
    })
  );
}
