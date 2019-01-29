import { Action } from '@ngrx/store';
import { User } from 'src/app/models/user';

export enum UserActionTypes {
  Search = '[User] search',
  SearchSuccess = '[User] searchSuccess',
  SearchFailed = '[User] searchFailed'
}

export type UserActions = SearchUsers | SearchUsersSuccess | SearchUserFailed;

export class SearchUsers implements Action {
  readonly type = UserActionTypes.Search;
  constructor(public payload: string) {}
}

export class SearchUsersSuccess implements Action {
  readonly type = UserActionTypes.SearchSuccess;
  constructor(public payload: User[]) {}
}

export class SearchUserFailed implements Action {
  readonly type = UserActionTypes.SearchFailed;
}
