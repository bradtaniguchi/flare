import { AuthState } from './auth/auth.state';

export interface AppState {
  readonly auth: AuthState;
  readonly loading: boolean;
  readonly sync: boolean;
}
