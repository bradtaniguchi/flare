import { Group } from 'src/app/models/group';
import { GroupActions, GroupActionTypes } from './group.actions';

export interface GroupState {
  groups: Group[];
  usersGroups: Group[];
  userGroupsLoaded: boolean;
  groupsLoaded: boolean;
}

export function GroupReducer(
  state: GroupState = {
    groups: [],
    usersGroups: [],
    userGroupsLoaded: false,
    groupsLoaded: true
  },
  action: GroupActions
): GroupState {
  switch (action.type) {
    // user group searching
    case GroupActionTypes.SearchUsers:
      return { ...state, userGroupsLoaded: false };
    case GroupActionTypes.SearchUsersSuccess:
      return { ...state, userGroupsLoaded: true, usersGroups: action.payload };
    case GroupActionTypes.SearchUsersFailed:
      return { ...state, userGroupsLoaded: true, usersGroups: [] };
    // general searching
    case GroupActionTypes.Search:
      return { ...state, groupsLoaded: false };
    case GroupActionTypes.SearchFailed:
      return { ...state, groups: [], groupsLoaded: true };
    case GroupActionTypes.SearchSuccess:
      return { ...state, groups: action.payload, groupsLoaded: true };
    default:
      return state;
  }
}
