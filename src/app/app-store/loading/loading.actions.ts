import { Action } from '@ngrx/store';

export enum LoadingTypes {
  Start = '[Loading] start',
  Stop = '[Loading] stop',
  Set = '[Loading] set'
}

export type LoadingActions = StartLoading | StopLoading | SetLoading;

export class StartLoading implements Action {
  readonly type = LoadingTypes.Start;
}

export class StopLoading implements Action {
  readonly type = LoadingTypes.Stop;
}

export class SetLoading implements Action {
  readonly type = LoadingTypes.Set;
  constructor(public payload: boolean) {}
}
