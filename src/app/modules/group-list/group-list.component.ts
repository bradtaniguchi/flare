import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app-store/app-state';
import { Group } from 'src/app/models/group';
import { logger } from 'src/app/core/logger';
import { GroupService } from 'src/app/core/services/group/group.service';
import { User } from 'src/app/models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { share, startWith, map } from 'rxjs/operators';

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

  private user: User;
  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private groupService: GroupService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.route.snapshot.data.user;
    // search all groups.
    // this.store.dispatch(new SearchGroups());
    // also search the groups we already have.
    // this.store.dispatch(new SearchUserGroups());
    this.groups$ = this.groupService
      .listUserGroups({ user: this.user })
      .pipe(share());
    this.groupsLoading$ = this.groups$.pipe(
      map(groups => !groups),
      startWith(true)
    );
  }

  info(group: Group) {
    logger.log('clicked on info for group', group);
    this.router.navigateByUrl(`/groups/${group.uid}/decks`);
  }

  join(group: Group, groups: Group[]) {
    logger.log('join called');
  }

  leave(group: Group, groups: Group[]) {
    logger.log('leave called');
    // this.store.dispatch(new LeaveGroup(group));
  }

  request(group: Group, groups: Group[]) {
    logger.log('clicked on request group');
  }
}
