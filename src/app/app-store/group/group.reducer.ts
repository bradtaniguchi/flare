import { Group } from 'src/app/models/group';
import { GroupActions } from './group.actions';

export interface GroupState {
  groups: Group[];
  groupsLoaded: boolean;
}

export function GroupReducer(
  state: GroupState = { groups: [], groupsLoaded: true },
  action: GroupActions
): GroupState {
  switch (action.type) {
    default:
      return state;
  }
}
