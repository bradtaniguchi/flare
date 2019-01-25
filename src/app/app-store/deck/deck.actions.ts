import { Deck } from 'src/app/models/deck';
import { Action } from '@ngrx/store';
import { QueryFn } from '@angular/fire/firestore';
import { CreateDeckForm } from 'src/app/modules/deck-create/create-deck-form';

export enum DeckActionTypes {
  // create
  Create = '[Deck] create',
  CreateSuccess = '[Deck] createSuccess',
  CreateFailed = '[Deck] createFailed',
  // search
  Search = '[Deck] searchRecent',
  SearchSuccess = '[Deck] searchSuccess',
  SearchFailed = '[Deck] searchFailed',
  SearchStop = '[Deck] searchStop'
}

export type DeckActions =
  | CreateDeck
  | CreateDeckSuccess
  | CreateDeckFailed
  | SearchDecks
  | SearchDecksSuccess
  | SearchDecksFailed;

export class CreateDeck implements Action {
  readonly type = DeckActionTypes.Create;
  constructor(public payload: CreateDeckForm) {}
}
export class CreateDeckSuccess implements Action {
  readonly type = DeckActionTypes.CreateSuccess;
  constructor(public payload: Deck) {}
}
export class CreateDeckFailed implements Action {
  readonly type = DeckActionTypes.CreateFailed;
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
