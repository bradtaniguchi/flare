import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app-store/app-state';
import { AuthLogout } from 'src/app/app-store/auth/auth.actions';

@Component({
  selector: 'app-side-nav',
  template: `
    <div class="main-view-container">
      <mat-nav-list class="main-view-container">
        <a mat-list-item routerLink="/" routerLinkActive="active-link">
          <mat-icon matListIcon>chrome_reader_mode</mat-icon>
          <div matLine>Dashboard</div>
        </a>
        <!-- TODO: add correct route -->
        <a mat-list-item routerLink="/study" routerLinkActive="active-link">
          <mat-icon matListIcon>assessment</mat-icon>
          <div matLine>Study</div>
        </a>
        <a mat-list-item routerLink="/groups" routerLinkActive="active-link">
          <mat-icon matListIcon>group</mat-icon>
          <div matLine>Groups</div>
        </a>
        <mat-divider></mat-divider>
        <a mat-list-item (click)="logout()">
          <mat-icon matListIcon>exit_to_app</mat-icon>
          <div matLine>Logout</div>
        </a>
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
