import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { auth } from 'firebase/auth';
import { from, Observable } from 'rxjs';
import { AppState } from 'src/app/app-store/app-state';
import { AuthStateChange } from 'src/app/app-store/auth/auth.actions';
import { logger } from '../../logger';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private fireAuth: AngularFireAuth,
    private store: Store<AppState>
  ) {
    this.fireAuth.authState.subscribe(user =>
      this.store.dispatch(new AuthStateChange(user))
    );
  }

  public googleAuthLoginPopup(): Observable<auth.UserCredential> {
    const provider = new auth.GoogleAuthProvider();
    return from(this.fireAuth.auth.signInWithPopup(provider));
  }

  /**
   * TODO: need to verify how this works
   */
  public googleAuthLoginRedirect(): Observable<void> {
    const provider = new auth.GoogleAuthProvider();
    return from(this.fireAuth.auth.signInWithRedirect(provider));
  }
  public logout(): Observable<void> {
    logger.log('logout called');
    return from(this.fireAuth.auth.signOut());
  }
}
