import { Action } from '@ngrx/store';
import { User } from 'src/app/models/user';

export enum AuthActionTypes {
  Login = '[Auth] Login',
  LoginSuccess = '[Auth] LoginSuccess',
  LoginFailed = '[Auth] LoginFailed',

  StateChange = '[Auth] StateChange',
  Logout = '[Auth] Logout',
  LogoutSuccess = '[Auth] LogoutSuccess',
  LogoutFailed = '[Auth] LogoutFailed',

  // AuthRegistration
  Register = '[Auth] Register',
  RegisterSuccess = '[Auth] RegisterSuccess',
  RegisterFailed = '[Auth] RegisterFailed'
}

export type AuthActions =
  // login
  | AuthLogin
  | AuthLoginSuccess
  | AuthLoginFailed
  | AuthStateChange
  // Logout
  | AuthLogout
  // AuthRegistration
  | AuthRegister
  | AuthRegisterSuccess
  | AuthRegisterFailed;

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
export class AuthLogoutSuccess implements Action {
  readonly type = AuthActionTypes.LogoutSuccess;
}
export class AuthLogoutFailed implements Action {
  readonly type = AuthActionTypes.LogoutFailed;
}

// Auth Registration
export class AuthRegister implements Action {
  readonly type = AuthActionTypes.Register;
  constructor(public payload: firebase.User) {}
}

export class AuthRegisterSuccess implements Action {
  readonly type = AuthActionTypes.RegisterSuccess;
}

export class AuthRegisterFailed implements Action {
  readonly type = AuthActionTypes.RegisterFailed;
}
