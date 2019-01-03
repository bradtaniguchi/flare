import { SyncTypes, SyncActions } from './sync.actions';

export function SyncReducer(_, action: SyncActions): boolean {
  switch (action.type) {
    case SyncTypes.Set:
      return !!action.payload;
    case SyncTypes.Start:
      return true;
    case SyncTypes.Stop:
    default:
      return false;
  }
}
