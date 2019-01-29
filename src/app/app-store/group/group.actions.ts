import { Action } from '@ngrx/store';
import { Group } from 'src/app/models/group';
import { QueryFn } from '@angular/fire/firestore';
import { CreateGroupForm } from 'src/app/modules/group-create/create-group-form';

export enum GroupActionTypes {
  Create = '[Group] create',
  CreateSuccess = '[Group] createSuccess',
  CreateFailed = '[Group] createFailed',
  Search = '[Group] search',
  SearchSuccess = '[Group] searchSuccess',
  SearchFailed = '[Group] searchFailed',
  SearchStop = '[Group] searchStop'
}
export type GroupActions =
  | CreateGroup
  | CreateGroupSuccess
  | CreateGroupFailed
  | SearchGroups
  | SearchGroupsSuccess
  | SearchGroupsFailed;

export class CreateGroup implements Action {
  readonly type = GroupActionTypes.Create;
  constructor(public payload: CreateGroupForm) {}
}
export class CreateGroupSuccess implements Action {
  readonly type = GroupActionTypes.CreateSuccess;
  constructor(public payload: Group) {}
}
export class CreateGroupFailed implements Action {
  readonly type = GroupActionTypes.CreateFailed;
}

export class SearchGroups implements Action {
  readonly type = GroupActionTypes.Search;
  constructor(public payload?: QueryFn) {}
}

export class SearchGroupsSuccess implements Action {
  readonly type = GroupActionTypes.SearchSuccess;
  constructor(public groups: Group[]) {}
}

export class SearchGroupsFailed implements Action {
  readonly type = GroupActionTypes.SearchFailed;
}
