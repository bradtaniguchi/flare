import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/app-store/app-state';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private store: Store<AppState>) {}
  /**
   * User's can only load the login page, if there is no auth.user
   */
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.pipe(select(_state => !_state.auth.user));
  }
}
