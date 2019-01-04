import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authLoaded$ = new BehaviorSubject<boolean>(false);
  private user$ = new BehaviorSubject<User>(undefined);
  constructor(private fireAuth: AngularFireAuth) {
    this.fireAuth.authState.subscribe(user => this.user$.next(user));
  }

  public get authLoaded(): Observable<boolean> {
    return this.authLoaded$;
  }
  public get user(): Observable<User> {
    return this.user$;
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
  public logout(): Promise<void> {
    return this.fireAuth.auth.signOut();
  }
}
