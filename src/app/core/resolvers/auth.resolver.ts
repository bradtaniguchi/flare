import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthResolver implements Resolve<boolean> {
  constructor(private auth: AuthService) {}

  resolve(): Observable<boolean> {
    return this.auth.authLoaded;
  }
}
