import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <app-loading-bar></app-loading-bar>
    <mat-sidenav-container>
      <mat-sidenav #sidenav> <app-side-nav></app-side-nav> </mat-sidenav>
    </mat-sidenav-container>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {}
