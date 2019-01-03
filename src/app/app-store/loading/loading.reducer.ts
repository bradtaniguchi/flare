import { LoadingTypes, LoadingActions } from './loading.actions';

export function LoadingReducer(_, action: LoadingActions): boolean {
  switch (action.type) {
    case LoadingTypes.Set:
      return !!action.payload;
    case LoadingTypes.Start:
      return true;
    case LoadingTypes.Stop:
    default:
      return false;
  }
}
