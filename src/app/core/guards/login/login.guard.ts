import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app-store/app-state';
import { tap, take } from 'rxjs/operators';
import { logger } from '../../logger';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}

  canLoad(): Observable<boolean> {
    return this.canDo();
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.canDo();
  }

  /**
   * User's can only load the login page, if there is no auth.user then we don't do anything
   */
  private canDo(): Observable<boolean> {
    return this.store.pipe(
      select(_state => !_state.auth.user),
      tap(noAuth => {
        if (noAuth) {
          logger.log('user does not have auth, let them thru');
        }
      }),
      take(1)
    );
  }
}
