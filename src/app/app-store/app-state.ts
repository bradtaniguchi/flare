import { AuthState } from './auth/auth.state';
import { CardState } from './card/card.reducer';
import { DeckState } from './deck/deck.reducer';

export interface AppState {
  readonly auth: AuthState;
  readonly cards: CardState;
  readonly decks: DeckState;
  readonly loading: boolean;
  readonly sync: boolean;
}
