import { Injectable } from '@angular/core';
import { Notify } from 'src/app/app-store/notify/notify.actions';
import {
  MatSnackBar,
  MatSnackBarDismiss,
  MatSnackBarConfig
} from '@angular/material';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  constructor(private snackBar: MatSnackBar) {}

  public open(notifyAction: Notify): Observable<MatSnackBarDismiss> {
    const { message, action, config } = notifyAction.payload;
    return this.snackBar
      .open(
        message,
        action || 'Ok',
        Object.assign(
          {
            duration: 1000
          } as MatSnackBarConfig,
          config
        )
      )
      .afterDismissed();
  }
}
