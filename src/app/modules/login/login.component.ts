import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AppState } from 'src/app/app-store/app-state';
import { Store } from '@ngrx/store';
import { AuthLogin } from 'src/app/app-store/auth/auth.actions';
import { filter, take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
    <div fxLayout="row" fxLayoutAlign="center center">
      <div class="padding-top">
        <button type="button" mat-button color="primary" (click)="login()">
          Google Login
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .padding-top {
        padding-top: 64px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit() {}

  login() {
    this.store.dispatch(new AuthLogin('popup'));
    this.store
      .select(state => state.auth.user)
      .pipe(
        filter(user => !!user),
        take(1)
      )
      .subscribe(() => this.router.navigate(['/']));
  }
}
