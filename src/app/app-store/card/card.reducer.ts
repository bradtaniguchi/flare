import { Card } from 'src/app/models/card';
import { toMap } from 'src/app/utils/to-map';
import { CardActions, CardActionTypes } from './card.actions';

export interface CardState {
  /**
   * List of cards for the current deck being viewed/edited
   */
  cards: { [key: string]: Card };
  cardsLoaded: boolean;
}
export function CardReducer(
  state: CardState = {
    cards: {},
    cardsLoaded: false
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
    // get cards for deck
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
