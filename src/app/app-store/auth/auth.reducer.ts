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
    default:
      return state;
    case AuthActionTypes.Logout:
      return {};
  }
}
