import { Action } from '@ngrx/store';
import { MatSnackBarConfig } from '@angular/material';

export enum NotifyActionTypes {
  Notify = '[Notify] notify'
}

export class Notify implements Action {
  readonly type = NotifyActionTypes.Notify;
  constructor(
    public payload: {
      message: string;
      action?: string;
      config?: MatSnackBarConfig;
    }
  ) {}
}
