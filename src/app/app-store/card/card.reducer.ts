import { Card } from 'src/app/models/card';
import { CardActions, CardActionTypes } from './card.actions';

export interface CardState {
  /**
   * List of cards that were "recently" viewed/edited
   */
  recent: Card[];
  recentLoaded: boolean;
}

export function CardReducer(
  state: CardState = { recent: [], recentLoaded: true },
  action: CardActions
): CardState {
  switch (action.type) {
    // searching actions
    case CardActionTypes.SearchRecent:
      return { ...state, recentLoaded: false };
    case CardActionTypes.SearchRecentSuccess:
      return { ...state, recent: action.payload, recentLoaded: true };
    case CardActionTypes.SearchRecentFailed:
      return { ...state, recent: [], recentLoaded: true };

    default:
      return state;
  }
}
