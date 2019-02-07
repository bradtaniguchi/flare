import { AuthState } from './auth/auth.state';
import { UserState } from './user/user.reducer';

export interface AppState {
  readonly auth: AuthState;
  // readonly cards: CardState;
  // readonly decks: DeckState;
  // readonly groups: GroupState;
  readonly users: UserState;
  readonly loading: boolean;
  readonly sync: boolean;
}
