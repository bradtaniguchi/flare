import { Action } from '@ngrx/store';
import { Group } from 'src/app/models/group';
import { QueryFn } from '@angular/fire/firestore';
import { CreateGroupForm } from 'src/app/modules/group-create/create-group-form';
import { RoleTypes } from 'src/app/config/roles';

export enum GroupActionTypes {
  // creation
  Create = '[Group] create',
  CreateSuccess = '[Group] createSuccess',
  CreateFailed = '[Group] createFailed',
  // searching
  Search = '[Group] search',
  SearchSuccess = '[Group] searchSuccess',
  SearchFailed = '[Group] searchFailed',
  SearchStop = '[Group] searchStop',
  // searching user groups
  SearchUsers = '[Group] searchUsers',
  SearchUsersSuccess = '[Group] searchUsersSuccess',
  SearchUsersFailed = '[Group] SearchUsersFailed',
  // permissions
  Join = '[Group] join',
  JoinSuccess = '[Group] joinSuccess',
  JoinFailed = '[Group] joinFailed',
  Leave = '[Group] leave',
  LeaveSuccess = '[Group] leaveSuccess',
  LeaveFailed = '[Group] leaveFailed'
}
export type GroupActions =
  | CreateGroup
  | CreateGroupSuccess
  | CreateGroupFailed
  | SearchGroups
  | SearchGroupsSuccess
  | SearchGroupsFailed
  | SearchUserGroups
  | SearchUserGroupsSuccess
  | SearchUserGroupsFailed
  | JoinGroup
  | JoinGroupSuccess
  | JoinGroupFailed
  | LeaveGroup
  | LeaveGroupSuccess
  | LeaveGroupFailed;

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
// searching

export class SearchGroups implements Action {
  readonly type = GroupActionTypes.Search;
  constructor(public payload?: QueryFn) {}
}

export class SearchGroupsSuccess implements Action {
  readonly type = GroupActionTypes.SearchSuccess;
  constructor(public payload: Group[]) {}
}

export class SearchGroupsFailed implements Action {
  readonly type = GroupActionTypes.SearchFailed;
}

export class SearchUserGroups implements Action {
  readonly type = GroupActionTypes.SearchUsers;
  constructor(public payload?: QueryFn) {}
}
export class SearchUserGroupsSuccess implements Action {
  readonly type = GroupActionTypes.SearchUsersSuccess;
  constructor(public payload: Group[]) {}
}
export class SearchUserGroupsFailed implements Action {
  readonly type = GroupActionTypes.SearchUsersFailed;
}

// user permission actions
export class JoinGroup implements Action {
  readonly type = GroupActionTypes.Join;
  constructor(
    public payload: {
      group: Group;
      type?: RoleTypes;
    }
  ) {}
}
export class JoinGroupSuccess implements Action {
  readonly type = GroupActionTypes.JoinSuccess;
}
export class JoinGroupFailed implements Action {
  readonly type = GroupActionTypes.JoinFailed;
}

export class LeaveGroup implements Action {
  readonly type = GroupActionTypes.Leave;
  constructor(public payload: Group) {}
}

export class LeaveGroupSuccess implements Action {
  readonly type = GroupActionTypes.LeaveSuccess;
}

export class LeaveGroupFailed implements Action {
  readonly type = GroupActionTypes.LeaveFailed;
}
