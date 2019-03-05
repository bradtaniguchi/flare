import { Action } from '@ngrx/store';
import { Deck } from 'src/app/models/deck';
import { Group } from 'src/app/models/group';

export enum DashboardActionTypes {
  SET_LAST_DECK = '[Dashboard] SET_DECK_LIMIT',
  SEARCH_DECK_SUCCESS = '[Dashboard] SEARCH_DECK_SUCCESS',
  SEARCH_DECK_FAILED = '[Dashboard] SEARCH_DECK_FAILED',

  SET_LAST_GROUP = '[Dashboard] SET_LAST_GROUP',
  SEARCH_GROUP_SUCCESS = '[Dashboard] SEARCH_GROUP_SUCCESS',
  SEARCH_GROUP_FAILED = '[Dashboard] SEARCH_GROUP_FAILED'
}

export type DashboardAction =
  | SetLastDeck
  | SearchDeckSuccess
  | SearchDeckFailed
  | SetLastGroup
  | SearchGroupSuccess
  | SearchGroupFailed;

export class SetLastDeck implements Action {
  readonly type = DashboardActionTypes.SET_LAST_DECK;
  constructor(public payload: string) {}
}

export class SearchDeckSuccess implements Action {
  readonly type = DashboardActionTypes.SEARCH_DECK_SUCCESS;
  constructor(public payload: Deck[]) {}
}

export class SearchDeckFailed implements Action {
  readonly type = DashboardActionTypes.SEARCH_DECK_FAILED;
}

export class SetLastGroup implements Action {
  readonly type = DashboardActionTypes.SET_LAST_GROUP;
  constructor(public payload: string) {}
}

export class SearchGroupSuccess implements Action {
  readonly type = DashboardActionTypes.SEARCH_GROUP_SUCCESS;
  constructor(public payload: Group[]) {}
}

export class SearchGroupFailed implements Action {
  readonly type = DashboardActionTypes.SEARCH_GROUP_FAILED;
}
