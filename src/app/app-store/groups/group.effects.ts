import { Store, select } from '@ngrx/store';
import { AppState } from '../app-state';
import { Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { filter, mergeMap, map, catchError } from 'rxjs/operators';
import { GroupSecurityService } from 'src/app/core/services/group-security/group-security.service';
import {
  SearchUserPermissionsSuccess,
  SearchUserPermissionFailed
} from './group.actions';
import { logger } from 'src/app/core/logger';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GroupEffects {
  constructor(
    private store: Store<AppState>,
    private groupSecurity: GroupSecurityService
  ) {}

  @Effect()
  userPermissions$ = this.store.pipe(
    select(state => state.auth.user),
    filter(user => !!user),
    mergeMap(user =>
      this.groupSecurity.getUsersPermissions(user).pipe(
        map(permissions => new SearchUserPermissionsSuccess({ permissions })),
        catchError(err => {
          logger.error(err);
          return of(new SearchUserPermissionFailed());
        })
      )
    )
  );
}
