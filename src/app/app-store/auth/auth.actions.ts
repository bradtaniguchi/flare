import { Action } from '@ngrx/store';
import { User } from 'src/app/models/user';

export enum AuthActionTypes {
  Login = '[Auth] Login',
  LoginSuccess = '[Auth] LoginSuccess',
  LoginFailed = '[Auth] LoginFailed',

  StateChange = '[Auth] StateChange',
  Logout = '[Auth] Logout'
}

export type AuthActions =
  | AuthLogin
  | AuthLoginSuccess
  | AuthLoginFailed
  | AuthStateChange
  | AuthLogout;

// LOGIN
export class AuthLogin implements Action {
  readonly type = AuthActionTypes.Login;
  constructor(public payload: 'popup' | 'redirect') {}
}
export class AuthLoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess;
  constructor(public payload: User) {}
}
export class AuthLoginFailed implements Action {
  readonly type = AuthActionTypes.LoginFailed;
  constructor(public payload: Error) {}
}

// STATE CHANGE
export class AuthStateChange implements Action {
  readonly type = AuthActionTypes.StateChange;
  constructor(public payload: User) {}
}
// LOGOUT
export class AuthLogout implements Action {
  readonly type = AuthActionTypes.Logout;
}
