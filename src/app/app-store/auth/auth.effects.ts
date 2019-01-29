import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import {
  AuthActionTypes,
  AuthLoginFailed,
  AuthLoginSuccess,
  AuthRegister,
  AuthRegisterFailed,
  AuthRegisterSuccess,
  AuthLogoutFailed,
  AuthLogoutSuccess
} from './auth.actions';
import { UserService } from 'src/app/core/services/user/user.service';
import { logger } from 'src/app/core/logger';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private auth: AuthService,
    private user: UserService
  ) {}

  /**
   * Fired when the user logs into the app, we try to
   * also register the user.
   */
  @Effect()
  login$ = this.actions$.pipe(
    ofType(AuthActionTypes.Login),
    mergeMap(() => this.auth.googleAuthLoginPopup()),
    mergeMap(userCredentials => [
      new AuthRegister(userCredentials.user),
      new AuthLoginSuccess(userCredentials.user)
    ]),
    catchError(err => {
      logger.error(err);
      return of(new AuthLoginFailed(err));
    })
  );

  /**
   * Fired whenever a user is logged in, without ever logging in before.
   */
  @Effect()
  register$ = this.actions$.pipe(
    ofType(AuthActionTypes.Register),
    mergeMap((action: AuthRegister) => this.user.create(action.payload)),
    map(() => new AuthRegisterSuccess()),
    catchError(err => {
      logger.error(err);
      return of(new AuthRegisterFailed());
    })
  );

  @Effect()
  logout$ = this.actions$.pipe(
    ofType(AuthActionTypes.Logout),
    mergeMap(() => this.auth.logout()),
    map(() => new AuthLogoutSuccess()),
    catchError(err => {
      logger.error(err);
      return of(new AuthLogoutFailed());
    })
  );
}
