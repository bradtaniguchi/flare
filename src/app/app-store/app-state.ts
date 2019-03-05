import { AuthState } from './auth/auth.state';
import { UserState } from './user/user.reducer';
import { DeckStudyState } from './deck-study/deck-study.reducer';
import { DashboardState } from './dashboard/dashboard.reducer';
export interface AppState {
  readonly auth: AuthState;
  readonly deckStudy?: DeckStudyState;
  readonly users: UserState;
  readonly loading: boolean;
  readonly sync: boolean;
  readonly dashboard?: DashboardState;
}
