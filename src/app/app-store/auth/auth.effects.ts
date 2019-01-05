import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import {
  AuthActionTypes,
  AuthLoginFailed,
  AuthLoginSuccess
} from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private auth: AuthService) {}

  @Effect()
  login$ = this.actions$.pipe(
    ofType(AuthActionTypes.Login),
    mergeMap(() => this.auth.googleAuthLoginPopup()),
    map(userCredentials => new AuthLoginSuccess(userCredentials.user)),
    catchError(err => of(new AuthLoginFailed(err)))
  );

  @Effect()
  logout$ = this.actions$.pipe(
    ofType(AuthActionTypes.Logout),
    mergeMap(() => this.auth.logout())
  );
}
