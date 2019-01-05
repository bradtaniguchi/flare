import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/app-store/app-state';

@Injectable({
  providedIn: 'root'
})
export class AuthResolver implements Resolve<boolean> {
  constructor(private store: Store<AppState>) {}

  resolve(): Observable<boolean> {
    return this.store.pipe(select(state => !!state.auth.user));
  }
}
