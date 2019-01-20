import { AuthActions, AuthActionTypes } from './auth.actions';
import { AuthState } from './auth.state';

export function AuthReducer(
  state: AuthState = {},
  action: AuthActions
): AuthState {
  switch (action.type) {
    case AuthActionTypes.LoginSuccess:
    case AuthActionTypes.StateChange:
      return { user: action.payload };
    case AuthActionTypes.RegisterSuccess:
      return { newRegister: true };
    default:
      return state;
    case AuthActionTypes.Logout:
      return {};
  }
}
