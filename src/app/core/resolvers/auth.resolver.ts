import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app-store/app-state';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthResolver implements Resolve<boolean> {
  constructor(private store: Store<AppState>) {}

  resolve(): Observable<boolean> {
    return this.store.pipe(
      select(state => !!state.auth.user),
      take(1)
    );
  }
}
