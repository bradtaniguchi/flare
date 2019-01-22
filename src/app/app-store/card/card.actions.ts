import { CreateCardForm } from 'src/app/modules/card-create/create-card-form';
import { Action } from '@ngrx/store';
import { Card } from 'src/app/models/card';
import { QueryFn } from '@angular/fire/firestore';

export enum CardActionTypes {
  Create = '[Card] create',
  CreateSuccess = '[Card] createSuccess',
  CreateFailed = '[Card] createFailed',
  // search
  Search = '[Card] search',
  SearchSuccess = '[Card] search',
  SearchFailed = '[Card] search',
  // recent actions
  SearchRecent = '[Card] searchRecent',
  SearchRecentSuccess = '[Card] searchRecentSuccess',
  SearchRecentFailed = '[Card] searchRecentFailed',
  SearchRecentStop = '[Card] searchRecentStop'
}

export type CardActions =
  | CreateCard
  | CreateCardSuccess
  | CreateCardFailed
  // search
  | SearchCards
  | SearchCardsSuccess
  | SearchCardsFailed
  // recent
  | SearchRecentCards
  | SearchRecentCardsFailed
  | SearchRecentCardsSuccess
  | SearchRecentCardsStop;

export class CreateCard implements Action {
  readonly type = CardActionTypes.Create;
  constructor(public payload: CreateCardForm) {}
}
export class CreateCardSuccess implements Action {
  readonly type = CardActionTypes.CreateSuccess;
  constructor(public payload: Card) {}
}
export class CreateCardFailed implements Action {
  readonly type = CardActionTypes.CreateFailed;
}

// search
export class SearchCards implements Action {
  readonly type = CardActionTypes.Search;
  constructor(
    public payload: {
      queryFn?: QueryFn;
      groupId?: string;
    }
  ) {}
}
export class SearchCardsSuccess implements Action {
  readonly type = CardActionTypes.SearchSuccess;
  constructor(public payload: Card[]) {}
}

export class SearchCardsFailed implements Action {
  readonly type = CardActionTypes.SearchFailed;
}
// recent
export class SearchRecentCards implements Action {
  readonly type = CardActionTypes.SearchRecent;
}

export class SearchRecentCardsSuccess implements Action {
  readonly type = CardActionTypes.SearchRecentSuccess;
  constructor(public payload: Card[]) {}
}

export class SearchRecentCardsFailed implements Action {
  readonly type = CardActionTypes.SearchRecentFailed;
  constructor() {}
}

export class SearchRecentCardsStop implements Action {
  readonly type = CardActionTypes.SearchRecentStop;
}
