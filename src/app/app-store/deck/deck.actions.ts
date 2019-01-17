import { Deck } from 'src/app/models/deck';
import { Action } from '@ngrx/store';

export enum DeckActionTypes {
  Create = '[Deck] create',
  Search = '[Deck] searchRecent',
  SearchSuccess = '[Deck] searchSuccess',
  SearchFailed = '[Deck] searchFailed',
  SearchStop = '[Deck] searchStop'
}

export type DeckActions = CreateDeck;

export class CreateDeck implements Action {
  readonly type = DeckActionTypes.Create;
  constructor(public payload: Deck) {}
}

export class SearchDecks implements Action {
  readonly type = DeckActionTypes.Search;
  constructor() {}
}

export class SearchDecksSuccess implements Action {
  readonly type = DeckActionTypes.SearchSuccess;
  constructor(public payload: Deck[]) {}
}

export class SearchDecksFailed implements Action {
  readonly type = DeckActionTypes.SearchFailed;
}
