import { UserService } from 'src/app/core/services/user/user.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  UserActionTypes,
  SearchUsers,
  SearchUsersSuccess,
  SearchUserFailed
} from './user.actions';
import { switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private user: UserService) {}

  @Effect()
  public search$ = this.actions$.pipe(
    ofType(UserActionTypes.Search),
    switchMap((action: SearchUsers) => this.user.startSearch(action.payload)),
    map((res: User[]) => new SearchUsersSuccess(res)),
    catchError(err => {
      console.error(err);
      return of(new SearchUserFailed());
    })
  );
}
