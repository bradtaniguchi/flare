import { AuthState } from './auth.state';
import { AuthActions, AuthActionTypes } from './auth.actions';

export function AuthReducer(
  state: AuthState = {},
  action: AuthActions
): AuthState {
  switch (action.type) {
    case AuthActionTypes.LoginSuccess:
    case AuthActionTypes.StateChange:
      return { user: action.payload };
    case AuthActionTypes.Logout:
    default:
      return {};
  }
}
