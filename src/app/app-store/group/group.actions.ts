import { Action } from '@ngrx/store';
import { Group } from 'src/app/models/group';

export enum GroupActionTypes {
  Create = '[Group] create',
  Search = '[Group] search',
  SearchSuccess = '[Group] searchSuccess',
  SearchFailed = '[Group] searchFailed',
  SearchStop = '[Group] searchStop'
}
export type GroupActions =
  | CreateGroup
  | SearchGroups
  | SearchGroupsSuccess
  | SearchGroupsFailed;

export class CreateGroup implements Action {
  readonly type = GroupActionTypes.Create;
  constructor(public payload: Group) {}
}

export class SearchGroups implements Action {
  readonly type = GroupActionTypes.Search;
  constructor() {}
}

export class SearchGroupsSuccess implements Action {
  readonly type = GroupActionTypes.SearchSuccess;
  constructor(public groups: Group[]) {}
}

export class SearchGroupsFailed implements Action {
  readonly type = GroupActionTypes.SearchFailed;
}
