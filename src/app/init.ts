import { AngularFireAuth } from '@angular/fire/auth';
import { AppState } from './app-store/app-state';
import { Store } from '@ngrx/store';
import { AuthStateChange } from './app-store/auth/auth.actions';
import { tap, take } from 'rxjs/operators';

/**
 * Returns a function to initialize the app
 */
export function initAppFactory(
  auth: AngularFireAuth,
  store: Store<AppState>
): () => Promise<firebase.User> {
  return () =>
    auth.authState
      .pipe(
        tap(user => store.dispatch(new AuthStateChange(user))),
        take(1)
      )
      .toPromise();
}
