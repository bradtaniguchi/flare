import { Group } from 'src/app/models/group';
import {
  GroupActions,
  SearchGroupsSuccess,
  GroupActionTypes
} from './group.actions';

export interface GroupState {
  groups: Group[];
  groupsLoaded: boolean;
}

export function GroupReducer(
  state: GroupState = { groups: [], groupsLoaded: true },
  action: GroupActions
): GroupState {
  switch (action.type) {
    case GroupActionTypes.SearchFailed:
      return { groups: [], groupsLoaded: true };
    case GroupActionTypes.SearchSuccess:
      return { groups: action.groups, groupsLoaded: true };
    case GroupActionTypes.Search:
      return { groups: state.groups, groupsLoaded: false };
    default:
      return state;
  }
}
