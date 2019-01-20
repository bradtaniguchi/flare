import { Deck } from 'src/app/models/deck';
import { Action } from '@ngrx/store';
import { QueryFn } from '@angular/fire/firestore';

export enum DeckActionTypes {
  Create = '[Deck] create',
  Search = '[Deck] searchRecent',
  SearchSuccess = '[Deck] searchSuccess',
  SearchFailed = '[Deck] searchFailed',
  SearchStop = '[Deck] searchStop'
}

export type DeckActions =
  | CreateDeck
  | SearchDecks
  | SearchDecksSuccess
  | SearchDecksFailed;

export class CreateDeck implements Action {
  readonly type = DeckActionTypes.Create;
  constructor(public payload: Deck) {}
}

export class SearchDecks implements Action {
  readonly type = DeckActionTypes.Search;
  constructor(public payload?: QueryFn) {}
}

export class SearchDecksSuccess implements Action {
  readonly type = DeckActionTypes.SearchSuccess;
  constructor(public payload: Deck[]) {}
}

export class SearchDecksFailed implements Action {
  readonly type = DeckActionTypes.SearchFailed;
}
