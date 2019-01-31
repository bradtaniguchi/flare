import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppState } from 'src/app/app-store/app-state';
import { SearchDecks } from 'src/app/app-store/deck/deck.actions';
import { getDecks } from 'src/app/app-store/deck/deck.reducer';
import { logger } from 'src/app/core/logger';
import { Card } from 'src/app/models/card';
import { Deck } from 'src/app/models/deck';
import { User } from 'src/app/models/user';
import { Group } from 'src/app/models/group';
import { SearchUserGroups } from 'src/app/app-store/group/group.actions';

@Component({
  selector: 'app-dashboard',
  template: `
    <div
      fxLayout="row"
      class="full-height view-container-padding"
      fxLayoutAlign="space-between"
    >
      <!-- first column-->
      <section fxFlex="50" class="margin">
        <div>
          <app-form-section-header
            header="Decks created by you"
            description="Below are decks you have personally created"
          >
          </app-form-section-header>
          <!-- list of all decks -->
          <app-spinner-container [loading]="decksLoading$">
            <ng-container *ngIf="(decks$ | async) as decks">
              <ng-container *ngIf="!decks.length">
                <p>No Decks, please create one by clicking on the right</p>
              </ng-container>
              <app-dashboard-deck *ngFor="let deck of decks" [deck]="deck">
              </app-dashboard-deck>
            </ng-container>
          </app-spinner-container>
        </div>
        <div>
          <app-form-section-header
            header="Groups"
            description="Groups you are part of"
          >
          </app-form-section-header>
          <app-spinner-container [loading]="groupsLoading$">
            <ng-container *ngIf="(groups$ | async) as groups">
              <ng-container *ngIf="!groups.length">
                <p>There was an error getting groups</p>
              </ng-container>
              <app-dashboard-group *ngFor="let group of groups" [group]="group">
              </app-dashboard-group>
            </ng-container>
          </app-spinner-container>
        </div>
      </section>

      <!-- second column-->
      <section fxFlex="50" class="margin">
        <mat-card> <app-dashboard-actions></app-dashboard-actions> </mat-card>
      </section>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  public decks$: Observable<Deck[]>;
  public decksLoading$: Observable<boolean>;
  public groups$: Observable<Group[]>;
  public groupsLoading$: Observable<boolean>;

  private user: User;
  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit() {
    // used resolve value from resolver
    this.user = this.route.snapshot.data.user;
    // find all decks for the current user
    this.store.dispatch(
      new SearchDecks(ref => ref.where('createdBy', '==', this.user.uid))
    );

    // find all groups the user has access to
    this.store.dispatch(new SearchUserGroups());

    this.decksLoading$ = this.store.pipe(
      select(state => !state.decks.decksLoaded)
    );
    // any and all decks, will be "recent"
    this.decks$ = this.store.pipe(select(getDecks));

    this.groups$ = this.store.pipe(select(state => state.groups.usersGroups));
    this.groupsLoading$ = this.store.pipe(
      select(state => !state.groups.userGroupsLoaded)
    );
  }
}
