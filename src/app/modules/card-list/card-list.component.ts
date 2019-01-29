import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AppState } from 'src/app/app-store/app-state';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { logger } from 'src/app/core/logger';

@Component({
  selector: 'app-card-list',
  template: `
    <ng-container *ngIf="(loaded$ | async); else showSpinner">
      LOADING
    </ng-container>
    <ng-template #showSpinner> SPINNER </ng-template>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardListComponent implements OnInit {
  public loaded$: Observable<boolean>;
  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit() {
    this.loaded$ = this.store.pipe(select(state => state.loading));
    logger.log('test with route', this.route);
  }
}
