import { Action } from '@ngrx/store';
import { GroupPermission } from 'src/app/models/group-permission';
import { Group } from 'src/app/models/group';

export enum GroupActionTypes {
  // user permissions
  SEARCH_USER_PERMISSIONS_SUCCESS = '[GroupAction] SEARCH_USER_PERMISSIONS_SUCCESS',
  SEARCH_USER_PERMISSIONS_FAILED = '[GroupAction] SEARCH_USER_PERMISSIONS_FAILED',

  // user groups
  SEARCH_USER_GROUPS_SUCCESS = '[GroupAction] SEARCH_USER_GROUPS_SUCCESS',
  SEARCH_USER_GROUPS_FAILED = '[GroupAction] SEARCH_USER_GROUPS_FAILED'
}

export type GroupActions =
  | SearchUserPermissionsSuccess
  | SearchUserPermissionFailed
  | SearchUserGroupsSuccess
  | SearchUserGroupsFailed;

export class SearchUserPermissionsSuccess implements Action {
  readonly type = GroupActionTypes.SEARCH_USER_PERMISSIONS_SUCCESS;
  constructor(public payload: { permissions: GroupPermission[] }) {}
}

export class SearchUserPermissionFailed implements Action {
  readonly type = GroupActionTypes.SEARCH_USER_PERMISSIONS_FAILED;
}

export class SearchUserGroupsSuccess implements Action {
  readonly type = GroupActionTypes.SEARCH_USER_GROUPS_SUCCESS;
  constructor(public payload: { groups: Group[] }) {}
}

export class SearchUserGroupsFailed implements Action {
  readonly type = GroupActionTypes.SEARCH_USER_GROUPS_FAILED;
}
