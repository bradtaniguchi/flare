import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AppState } from 'src/app/app-store/app-state';
import { logger } from 'src/app/core/logger';

@Injectable({
  providedIn: 'root'
})
export class HasStudySessionGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.pipe(
      select(state => !!state.deckStudy && !!state.deckStudy.deck),
      tap(hasStudyDeck => {
        if (!hasStudyDeck) {
          logger.warn('No study deck found', next, state);
          this.router.navigate(['../../']);
        }
      }),
      take(1)
    );
  }
}
