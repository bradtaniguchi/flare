import { Component, OnInit } from '@angular/core';
import { AppState } from './app-store/app-state';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CONFIG } from './config';
import { logger } from './core/logger';
import { validateEnv } from './core/env-validator';

@Component({
  selector: 'app-root',
  template: `
    <app-header (toggleNav)="sidenav.toggle()"></app-header>
    <app-loading-bar></app-loading-bar>
    <mat-sidenav-container class="main-view-container">
      <mat-sidenav #sidenav>
        <app-side-nav (close)="sidenav.close()"></app-side-nav>
      </mat-sidenav>
      <mat-sidenav-content>
        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  public state$: Observable<AppState>;
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.state$ = this.store.pipe(select(state => state));
    if (!environment.production) {
      logger.log('config: ', CONFIG);
      if (validateEnv(CONFIG)) {
        logger.error('missing API key in firebase config, app wont work');
      }
    }
  }
}
