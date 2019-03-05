import { DashboardAction, DashboardActionTypes } from './dashboard.actions';
import { logger } from 'src/app/core/logger';
import { Deck } from 'src/app/models/deck';
import { Group } from 'src/app/models/group';
export interface DashboardState {
  decks: {
    [key: string]: Deck;
  };
  deckIds: string[];
  decksLoading?: boolean;

  groups: {
    [key: string]: Group;
  };
  groupIds: string[];
  groupsLoading?: boolean;
}
const toMap = arr =>
  arr.reduce(
    (map, el: { uid: string }) => Object.assign(map, { [el.uid]: el }),
    {}
  );
export function DashboardReducer(
  state: DashboardState = {
    decksLoading: true,
    decks: {},
    deckIds: [],

    groupsLoading: true,
    groups: {},
    groupIds: []
  },
  action: DashboardAction
): DashboardState {
  switch (action.type) {
    case DashboardActionTypes.SEARCH_DECK_SUCCESS:
      logger.log('test in search deck success fired', state);
      return {
        ...state,
        decksLoading: false,
        deckIds: action.payload ? action.payload.map(deck => deck.uid) : [],
        decks: Object.assign({}, state.decks, toMap(action.payload))
      };
    case DashboardActionTypes.SEARCH_DECK_FAILED:
      return {
        ...state,
        decksLoading: false
      };
    case DashboardActionTypes.SEARCH_GROUP_SUCCESS:
      return {
        ...state,
        groupsLoading: false,
        groupIds: action.payload ? action.payload.map(group => group.uid) : [],
        groups: Object.assign({}, state.groups, toMap(action.payload))
      };
    case DashboardActionTypes.SEARCH_GROUP_FAILED:
      return {
        ...state,
        groupsLoading: false
      };
    default:
      return state;
  }
}
