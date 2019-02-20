import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/app-store/app-state';
import { AuthLogout } from 'src/app/app-store/auth/auth.actions';
import { Observable } from 'rxjs';
import { map, tap, mapTo, filter } from 'rxjs/operators';
import { logger } from '../logger';

@Component({
  selector: 'app-side-nav',
  template: `
    <div class="main-view-container">
      <ng-container *ngIf="!!(auth$ | async); else showNonAuthSidenav">
        <mat-nav-list class="main-view-container">
          <a
            mat-list-item
            routerLink="/dashboard"
            routerLinkActive="active-link"
            [routerLinkActiveOptions]="{ exact: true }"
            (click)="close.emit()"
          >
            <mat-icon
              matListIcon
              [color]="url$ | isActive: '/dashboard' | async"
              >chrome_reader_mode</mat-icon
            >
            <div matLine>Dashboard</div>
          </a>
          <!-- TODO: add correct route -->
          <a
            mat-list-item
            routerLink="/study"
            routerLinkActive="active-link"
            [routerLinkActiveOptions]="{ exact: true }"
            (click)="close.emit()"
          >
            <mat-icon matListIcon [color]="url$ | isActive: '/study' | async"
              >assessment</mat-icon
            >
            <div matLine>Study</div>
          </a>
          <a
            mat-list-item
            routerLink="/groups"
            routerLinkActive="active-link"
            [routerLinkActiveOptions]="{ exact: true }"
            (click)="close.emit()"
          >
            <mat-icon matListIcon [color]="url$ | isActive: '/groups' | async"
              >group</mat-icon
            >
            <div matLine>Groups</div>
          </a>
          <a
            mat-list-item
            routerLink="/settings"
            routerLinkActive="active-link"
            [routerLinkActiveOptions]="{ exact: true }"
            (click)="close.emit()"
          >
            <mat-icon matListIcon [color]="url$ | isActive: '/settings' | async"
              >settings</mat-icon
            >
            <div matLine>Settings</div>
          </a>
          <a
            mat-list-item
            routerLink="/about"
            routerLinkActive="active-link"
            [routerLinkActiveOptions]="{ exact: true }"
            (click)="close.emit()"
          >
            <mat-icon matListIcon [color]="url$ | isActive: '/about' | async"
              >info</mat-icon
            >
            <div matLine>About</div>
          </a>
          <mat-divider></mat-divider>
          <a mat-list-item (click)="logout()">
            <mat-icon matListIcon>exit_to_app</mat-icon>
            <div matLine>Logout</div>
          </a>
        </mat-nav-list>
      </ng-container>
      <ng-template #showNonAuthSidenav>
        <mat-nav-list class="main-view-container">
          <a
            mat-list-item
            routerLink="/login"
            routerLinkActive="active-link"
            [routerLinkActiveOptions]="{ exact: true }"
            (click)="close.emit()"
          >
            <mat-icon matListIcon [color]="url$ | isActive: '/login' | async"
              >exit_to_app</mat-icon
            >
            <div matLine>Login</div>
          </a>
          <a
            mat-list-item
            routerLink="/about"
            routerLinkActive="active-link"
            [routerLinkActiveOptions]="{ exact: true }"
            (click)="close.emit()"
          >
            <mat-icon matListIcon [color]="url$ | isActive: '/about' | async"
              >info</mat-icon
            >
            <div matLine>About</div>
          </a>
        </mat-nav-list>
      </ng-template>
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
  public auth$: Observable<boolean>;
  public url$: Observable<string>;
  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit() {
    this.auth$ = this.store.pipe(
      select(state => state.auth.user),
      map(user => !!user),
      tap(hasAuth => logger.log('has auth:', hasAuth))
    );
    this.url$ = this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map((event: NavigationEnd) => event.urlAfterRedirects)
    );
  }

  logout() {
    this.store.dispatch(new AuthLogout());
    this.close.emit();
    this.router.navigate(['/login']);
  }

  /**
   * Not working properly at this time
   */
  isActive(url: string): 'primary' | '' {
    // logger.log('test with side-nav.isActive', url, this.router.url);
    return '';
    // return window.location.pathname === url ? 'primary' : '';
  }
}
