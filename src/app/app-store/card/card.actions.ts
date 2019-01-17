import { CreateCardForm } from 'src/app/modules/card-create/create-card-form';
import { Action } from '@ngrx/store';
import { Card } from 'src/app/models/card';

export enum CardActionTypes {
  Create = '[Card] create',
  SearchRecent = '[Card] searchRecent',
  SearchRecentSuccess = '[Card] searchRecentSuccess',
  SearchRecentFailed = '[Card] searchRecentFailed',
  SearchRecentStop = '[Card] searchRecentStop'
}

export type CardActions =
  | CreateCard
  | SearchRecentCards
  | SearchRecentCardsFailed
  | SearchRecentCardsSuccess
  | SearchRecentCardsStop;

export class CreateCard implements Action {
  readonly type = CardActionTypes.Create;
  constructor(public payload: CreateCardForm) {}
}

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
