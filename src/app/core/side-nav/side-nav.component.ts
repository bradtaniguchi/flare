import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/app-store/app-state';
import { AuthLogout } from 'src/app/app-store/auth/auth.actions';
import { Router } from '@angular/router';
import { take, filter } from 'rxjs/operators';

@Component({
  selector: 'app-side-nav',
  template: `
    <div>
      <mat-nav-list>
        <mat-divider></mat-divider>
        <button type="button" mat-button (click)="logout()">Log Out</button>
      </mat-nav-list>
    </div>
  `,
  styles: [
    `
      .side-nav {
        margin: 4px;
        height: calc(100% - 70px);
        overflow: auto;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideNavComponent implements OnInit {
  @Output() close = new EventEmitter();
  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit() {}

  logout() {
    this.store.dispatch(new AuthLogout());
    this.close.emit();
    this.router.navigate(['/login']);
  }
}
