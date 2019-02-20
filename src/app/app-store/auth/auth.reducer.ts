import { AuthActions, AuthActionTypes } from './auth.actions';
import { AuthState } from './auth.state';

export function AuthReducer(
  state: AuthState = {},
  action: AuthActions
): AuthState {
  switch (action.type) {
    case AuthActionTypes.LoginSuccess:
    case AuthActionTypes.StateChange:
      return { ...state, user: action.payload };
    case AuthActionTypes.RegisterSuccess:
      return { ...state, newRegister: true };
    case AuthActionTypes.Logout:
      return {};
    default:
      return state;
  }
}
