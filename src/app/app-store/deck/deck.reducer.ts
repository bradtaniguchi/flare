import { Deck } from 'src/app/models/deck';
import { DeckActions, DeckActionTypes } from './deck.actions';
import { toMap } from 'src/app/utils/to-map';
import { AppState } from '../app-state';
import { User } from 'src/app/models/user';

/**
 * Selector function that returns the decks for a given group that exist within the store
 */
export const getDecksForGroup = (groupId: string) => (state: AppState) =>
  Object.values(state.decks.decks).filter(deck => deck.group === groupId);

/**
 * Selector function that returns all decks
 */
export const getDecks = (state: AppState) => Object.values(state.decks.decks);

/**
 * Selector function that returns decks only created by the user
 */
export const getUserDecks = (user: User) => (state: AppState) =>
  Object.values(state.decks.decks).filter(deck => deck.createdBy === user.uid);

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
    // create
    case DeckActionTypes.CreateSuccess:
      return {
        ...state,
        decks: { ...state.decks, [action.payload.uid]: action.payload }
      };
    case DeckActionTypes.Search:
      return { ...state, decksLoaded: false };
    case DeckActionTypes.SearchSuccess:
      return { ...state, decks: toMap(action.payload), decksLoaded: true };
    case DeckActionTypes.SearchFailed:
      return { ...state, decksLoaded: true };
    default:
      return state;
  }
}
