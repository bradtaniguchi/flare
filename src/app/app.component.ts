import { Component, OnInit } from '@angular/core';
import { AppState } from './app-store/app-state';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <app-header (toggleNav)="sidenav.toggle()"></app-header>
    <app-loading-bar></app-loading-bar>
    <mat-sidenav-container class="main-view-container">
      <mat-sidenav #sidenav> <app-side-nav></app-side-nav> </mat-sidenav>
      <mat-sidenav-content>
        <router-outlet></router-outlet>
        <!--<pre>
          {{ state$ | async | json }}
        </pre
        >-->
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
  }
}
