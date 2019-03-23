import { Group } from 'src/app/models/group';
import { GroupActions, GroupActionTypes } from './group.actions';
import { GroupPermission } from 'src/app/models/group-permission';

export interface GroupState {
  groups: Group[];
  permissions: GroupPermission[];
}

export function GroupReducer(
  state: GroupState = {
    groups: [],
    permissions: []
  },
  action: GroupActions
): GroupState {
  switch (action.type) {
    case GroupActionTypes.SEARCH_USER_GROUPS_SUCCESS:
      return { ...state, ...action.payload };
    case GroupActionTypes.SEARCH_USER_GROUPS_FAILED:
      return { ...state, groups: [] };

    case GroupActionTypes.SEARCH_USER_PERMISSIONS_SUCCESS:
      return { ...state, ...action.payload };
    case GroupActionTypes.SEARCH_USER_PERMISSIONS_FAILED:
      return { ...state, permissions: [] };
  }
  return state;
}
