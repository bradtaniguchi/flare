import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { GroupService } from 'src/app/core/services/group/group.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state';
import {
  GroupActionTypes,
  SearchGroupsSuccess,
  SearchGroupsFailed,
  SearchGroups,
  CreateGroup,
  CreateGroupSuccess,
  CreateGroupFailed,
  JoinGroup,
  JoinGroupSuccess,
  JoinGroupFailed,
  LeaveGroup,
  LeaveGroupSuccess,
  LeaveGroupFailed,
  SearchUserGroups,
  SearchUserGroupsSuccess,
  SearchUserGroupsFailed
} from './group.actions';
import {
  withLatestFrom,
  switchMap,
  catchError,
  map,
  tap,
  mergeMap
} from 'rxjs/operators';
import { of } from 'rxjs';
import { User } from 'src/app/models/user';
import { logger } from 'src/app/core/logger';
import { GroupSecurityService } from 'src/app/core/services/group-security/group-security.service';
import { RoleTypes } from 'src/app/config/roles';

@Injectable()
export class GroupEffects {
  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private group: GroupService,
    private groupSecurity: GroupSecurityService
  ) {}

  @Effect()
  public create$ = this.actions$.pipe(
    ofType(GroupActionTypes.Create),
    withLatestFrom(this.store.select(state => state.auth.user)),
    switchMap(([action, user]: [CreateGroup, User]) =>
      this.group.create(action.payload, user)
    ),
    map(res => new CreateGroupSuccess(res as any)),
    catchError(err => {
      logger.error(err);
      return of(new CreateGroupFailed());
    })
  );

  @Effect()
  public join$ = this.actions$.pipe(
    ofType(GroupActionTypes.Join),
    withLatestFrom(this.store.select(state => state.auth.user)),
    mergeMap(([action, user]: [JoinGroup, User]) =>
      this.groupSecurity.join({
        type: action.payload.type || RoleTypes.Viewer,
        group: action.payload.group,
        user
      })
    ),
    map(res => new JoinGroupSuccess()),
    catchError(err => {
      logger.error(err);
      return of(new JoinGroupFailed());
    })
  );

  @Effect()
  public leave$ = this.actions$.pipe(
    ofType(GroupActionTypes.Leave),
    withLatestFrom(this.store.select(state => state.auth.user)),
    mergeMap(([action, user]: [LeaveGroup, User]) =>
      this.groupSecurity.leave({
        group: action.payload,
        user
      })
    ),
    map(res => new LeaveGroupSuccess()),
    catchError(err => {
      logger.error(err);
      return of(new LeaveGroupFailed());
    })
  );

  @Effect()
  public search$ = this.actions$.pipe(
    ofType(GroupActionTypes.Search),
    withLatestFrom(this.store.select(state => state.auth.user)),
    switchMap(([action, user]: [SearchGroups, User]) =>
      this.group.list({ user, queryFn: action.payload })
    ),
    map(res => new SearchGroupsSuccess(res)),
    catchError(err => {
      logger.error(err);
      return of(new SearchGroupsFailed());
    })
  );

  @Effect()
  public searchUserGroups$ = this.actions$.pipe(
    ofType(GroupActionTypes.SearchUsers),
    withLatestFrom(this.store.select(state => state.auth.user)),
    switchMap(([action, user]: [SearchUserGroups, User]) =>
      this.group.listUserGroups({ user, queryFn: action.payload })
    ),
    map(res => new SearchUserGroupsSuccess(res)),
    catchError(err => {
      logger.error(err);
      return of(new SearchUserGroupsFailed());
    })
  );
}
