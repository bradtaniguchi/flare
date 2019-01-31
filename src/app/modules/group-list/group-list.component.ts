import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app-store/app-state';
import {
  SearchGroups,
  JoinGroup,
  LeaveGroup,
  SearchUserGroups
} from 'src/app/app-store/group/group.actions';
import { Group } from 'src/app/models/group';
import { logger } from 'src/app/core/logger';

@Component({
  selector: 'app-group-list',
  template: `
    <div class="view-container-padding">
      <app-spinner-container [loading]="groupsLoading$">
        <div>
          <app-form-section-header
            header="Public Groups"
            description="Below are all the public groups available to join"
          >
          </app-form-section-header>
        </div>
        <ng-container *ngFor="let group of (groups$ | async) as groups">
          <app-group-list-item
            [group]="group"
            (info)="info($event)"
            (join)="join($event, groups)"
            (leave)="leave($event, groups)"
            (request)="request($event, groups)"
          ></app-group-list-item>
        </ng-container>
      </app-spinner-container>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupListComponent implements OnInit {
  public groupsLoading$: Observable<boolean>;
  public groups$: Observable<Group[]>;
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    // search all groups.
    this.store.dispatch(new SearchGroups());
    // also search the groups we already have.
    this.store.dispatch(new SearchUserGroups());
    this.groups$ = this.store.pipe(select(state => state.groups.groups));
    this.groupsLoading$ = this.store.pipe(
      select(state => !state.groups.groupsLoaded)
    );
  }

  info(group: Group) {
    logger.log('clicked on info for group');
  }

  join(group: Group, groups: Group[]) {
    logger.log('join called');
    this.store.dispatch(
      new JoinGroup({
        group
      })
    );
  }

  leave(group: Group, groups: Group[]) {
    logger.log('leave called');
    this.store.dispatch(new LeaveGroup(group));
  }

  request(group: Group, groups: Group[]) {
    logger.log('clicked on request group');
  }
}
