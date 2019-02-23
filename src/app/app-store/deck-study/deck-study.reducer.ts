import { DeckStudyActions, DeckStudyActionTypes } from './deck-study.actions';
import { Card } from 'src/app/models/card';
import { Deck } from 'src/app/models/deck';

export interface DeckStudyState {
  /**
   * The current card being viewed
   */
  card: string;
  /**
   * The current deck being gone over
   */
  deck: Deck;
  /**
   * The group the deck belongs to
   */
  group: string;
  /**
   * If we are showing the "back" of the currently selected card or not
   */
  flipped: boolean;
  /**
   * List of cards we already went over, this is used to display
   * the cards within the display.
   */
  previous: string[];
  /**
   * The cards the user is studying
   */
  cards: Card[];
  /**
   * The cards the user missed
   */
  missed: string[];
  /**
   * The cards correct
   */
  correct: string[];
  /**
   * The cards marked as skipped
   */
  skipped: string[];

  /**
   * If the deckStudy overview sidenav is open or not
   */
  sidenavOpened?: boolean;
}

export function DeckStudyReducer(
  state: DeckStudyState = {
    card: undefined,
    deck: undefined,
    group: undefined,
    flipped: false,
    previous: [],
    cards: [],
    missed: [],
    correct: [],
    skipped: []
  },
  action: DeckStudyActions
): DeckStudyState {
  switch (action.type) {
    case DeckStudyActionTypes.INIT:
      return {
        card: undefined,
        cards: action.payload.cards,
        deck: action.payload.deck,
        group: action.payload.deck.group,
        flipped: false,
        previous: [],
        missed: [],
        correct: [],
        skipped: []
      };
    case DeckStudyActionTypes.CLEAR:
      return {
        card: undefined,
        cards: [],
        deck: undefined,
        group: undefined,
        flipped: false,
        previous: [],
        missed: [],
        correct: [],
        skipped: []
      };
    case DeckStudyActionTypes.SELECT:
      return {
        ...state,
        card: action.payload,
        flipped: false
      };
    case DeckStudyActionTypes.FLIP:
      return {
        ...state,
        flipped: true
      };
    case DeckStudyActionTypes.CORRECT:
      return {
        ...state,
        previous: [...state.previous, action.payload],
        correct: [...state.correct, action.payload || state.card]
      };
    case DeckStudyActionTypes.INCORRECT:
      return {
        ...state,
        previous: [...state.previous, action.payload],
        missed: [...state.missed, action.payload || state.card]
      };
    case DeckStudyActionTypes.SKIP:
      return {
        ...state,
        previous: [...state.previous, action.payload],
        skipped: [...state.missed, action.payload || state.card]
      };
    default:
      return state;
  }
}
