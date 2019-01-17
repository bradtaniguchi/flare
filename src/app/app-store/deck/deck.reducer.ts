import { Deck } from 'src/app/models/deck';
import { DeckActions } from './deck.actions';

export interface DeckState {
  decks: Deck[];
  decksLoaded: boolean;
}

export function DeckReducer(
  state: DeckState = { decks: [], decksLoaded: true },
  action: DeckActions
): DeckState {
  switch (action.type) {
    default:
      return state;
  }
}
