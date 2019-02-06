import { Card } from 'src/app/models/card';
import { AppState } from '../app-state';
import { CardActions, CardActionTypes } from './card.actions';
import { toMap } from 'src/app/utils/to-map';
import { logger } from 'src/app/core/logger';

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
  cardsLoaded: boolean;
  recentLoaded: boolean;
}

export function CardReducer(
  state: CardState = {
    recent: [],
    cards: {},
    cardsLoaded: false,
    recentLoaded: true
  },
  action: CardActions
): CardState {
  switch (action.type) {
    // create actions
    case CardActionTypes.CreateSuccess:
      return {
        ...state,
        cards: { ...state.cards, [action.payload.uid]: action.payload }
      };
    // generic searching
    case CardActionTypes.Search:
      return { ...state, cardsLoaded: false };
    case CardActionTypes.SearchSuccess:
      return { ...state, cards: toMap(action.payload) };
    case CardActionTypes.SearchFailed:
      return { ...state, cards: {} };

    // get for deck
    case CardActionTypes.Get:
      return { ...state, cardsLoaded: false };
    case CardActionTypes.GetSuccess:
      return { ...state, cards: toMap(action.payload), cardsLoaded: true };
    case CardActionTypes.GetFailed:
      return { ...state, cardsLoaded: false };
    default:
      return state;
  }
}
