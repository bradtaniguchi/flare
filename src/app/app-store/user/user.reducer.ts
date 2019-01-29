import { User } from 'src/app/models/user';
import { UserActions, UserActionTypes } from './user.actions';

export interface UserState {
  usersLoading?: boolean;
  users: User[];
}
export function UserReducer(
  state: UserState = { users: [] },
  action: UserActions
): UserState {
  switch (action.type) {
    case UserActionTypes.Search:
      return { ...state, usersLoading: true };
    case UserActionTypes.SearchSuccess:
      return { ...state, usersLoading: false, users: action.payload };
    case UserActionTypes.SearchFailed:
      return { ...state, usersLoading: false };
  }
  return state;
}
