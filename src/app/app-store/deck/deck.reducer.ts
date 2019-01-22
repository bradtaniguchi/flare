import { Deck } from 'src/app/models/deck';
import { DeckActions, DeckActionTypes } from './deck.actions';
import { toMap } from 'src/app/utils/to-map';
import { AppState } from '../app-state';

/**
 * Selector function that returns the decks for a given group that exist within the store
 */
export const getDecksForGroup = (groupId: string) => (state: AppState) =>
  Object.values(state.decks.decks).filter(deck => deck.group === groupId);

/**
 * Selector function that returns the "recent" decks
 */
export const getRecentDecks = (state: AppState) =>
  Object.keys(state.decks.recent).map(deckId => state.decks.decks[deckId]);

export interface DeckState {
  recent: string[];
  decks: { [key: string]: Deck };
  decksLoaded: boolean;
}

export function DeckReducer(
  state: DeckState = { recent: [], decks: {}, decksLoaded: true },
  action: DeckActions
): DeckState {
  switch (action.type) {
    case DeckActionTypes.Search:
      return { ...state, decksLoaded: false };
    case DeckActionTypes.SearchSuccess:
      return { ...state, decks: toMap(action.payload), decksLoaded: true };
    default:
      return state;
  }
}
