import { Card } from 'src/app/models/card';
import { AppState } from '../app-state';
import { CardActions, CardActionTypes } from './card.actions';

export const getRecentCards = (state: AppState) =>
  state.cards.recent.map(cardId => state.cards.cards[cardId]);

export interface CardState {
  /**
   * List of cards that were "recently" viewed/edited.
   */
  recent: string[];
  /**
   * Local cache of cards locally
   */
  cards: { [key: string]: Card };
  recentLoaded: boolean;
}

export function CardReducer(
  state: CardState = { recent: [], cards: {}, recentLoaded: true },
  action: CardActions
): CardState {
  switch (action.type) {
    // create actions
    case CardActionTypes.CreateSuccess:
      return {
        ...state,
        cards: { ...state.cards, [action.payload.uid]: action.payload }
      };
    // searching actions
    case CardActionTypes.SearchRecent:
      return { ...state, recentLoaded: false };
    case CardActionTypes.SearchRecentSuccess:
      return {
        ...state,
        recent: action.payload.map(el => el.uid),
        recentLoaded: true
      };
    case CardActionTypes.SearchRecentFailed:
      return { ...state, recentLoaded: true };

    default:
      return state;
  }
}
