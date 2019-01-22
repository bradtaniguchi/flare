import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app-store/app-state';
import { User } from 'src/app/models/user';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<User> {
  constructor(private store: Store<AppState>) {}

  resolve(): Observable<User> {
    return this.store.pipe(
      select(state => state.auth.user),
      take(1)
    );
  }
}
