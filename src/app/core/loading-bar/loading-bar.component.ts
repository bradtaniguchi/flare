import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject, merge } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/app-store/app-state';
import { Router, NavigationStart } from '@angular/router';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-loading-bar',
  template: `
    <mat-progress-bar
      *ngIf="(showLoading$ | async)"
      color="primary"
      mode="indeterminate"
    ></mat-progress-bar>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingBarComponent implements OnInit {
  public showLoading$ = new BehaviorSubject<boolean>(false);
  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit() {
    merge(
      this.store.pipe(select(state => state.loading)),
      this.router.events.pipe(
        map(event => {
          if (event instanceof NavigationStart) {
            return true;
          }
          return false;
        })
      )
    ).subscribe(showLoading => this.showLoading$.next(showLoading));
  }
}
