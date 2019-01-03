import { Action } from '@ngrx/store';

export enum SyncTypes {
  Start = '[Sync] start',
  Stop = '[Sync] stop',
  Set = '[Sync] set'
}

export type SyncActions = StartSync | StopSync | SetSync;

export class StartSync implements Action {
  readonly type = SyncTypes.Start;
}

export class StopSync implements Action {
  readonly type = SyncTypes.Stop;
}

export class SetSync implements Action {
  readonly type = SyncTypes.Set;
  constructor(public payload: boolean) {}
}
