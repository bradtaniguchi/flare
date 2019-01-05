import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AppState } from 'src/app/app-store/app-state';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private store: Store<AppState>, private router: Router) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.canDo();
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.canDo();
  }

  private canDo(): Observable<boolean> {
    return this.store.pipe(
      select(state => !!state.auth.user),
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          console.log('NOT AUTHENTICATED');
          this.router.navigate(['/login']);
        }
      }),
      take(1)
    );
  }
}
