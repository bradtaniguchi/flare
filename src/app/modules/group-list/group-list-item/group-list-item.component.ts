import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, combineLatest, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/app-store/app-state';
import { Group } from 'src/app/models/group';

@Component({
  selector: 'app-group-list-item',
  template: `
    <mat-card class="margin-top-bottom">
      <mat-card-title> {{ group.name }} </mat-card-title>
      <mat-card-content>
        <p>{{ group.description }}</p>
        <p>Decks: {{ group.deckCount || 0 }}</p>
      </mat-card-content>
      <mat-card-actions align="end">
        <button
          type="button"
          (click)="leave.emit(group)"
          mat-button
          color="warn"
          *ngIf="(showLeave$ | async)"
        >
          Leave
        </button>
        <button type="button" (click)="info.emit(group)" mat-button>
          Info
        </button>
        <button
          type="button"
          (click)="join.emit(group)"
          mat-button
          color="primary"
          *ngIf="(showJoin$ | async)"
        >
          Join
        </button>
        <button
          type="button"
          (click)="request.emit(group)"
          mat-button
          color="primary"
          *ngIf="showRequest"
        >
          Request to Join
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupListItemComponent implements OnInit {
  @Input() group: Group;
  @Output() join = new EventEmitter();
  @Output() request = new EventEmitter();
  @Output() info = new EventEmitter();
  @Output() leave = new EventEmitter();
  public showJoin$: Observable<boolean>;
  public showLeave$: Observable<boolean>;
  public showRequest: boolean;

  private loadedUserGroups$: Observable<boolean>;
  private canLeave$: Observable<boolean>;
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.loadedUserGroups$ = of(true);
    this.canLeave$ = of(true);
    // this.loadedUserGroups$ = this.store.pipe(
    //   select(state => state.groups.userGroupsLoaded)
    // );
    // this.canLeave$ = this.store.pipe(
    //   select(state => state.groups.usersGroups),
    //   map(
    //     userGroups =>
    //       !!userGroups.find(userGroup => userGroup.uid === this.group.uid)
    //   )
    // );

    this.showJoin$ = this.showJoin();
    this.showLeave$ = this.showLeave();
    this.showRequest = this.group.private;
  }

  private showJoin(): Observable<boolean> {
    return combineLatest(this.loadedUserGroups$, this.canLeave$).pipe(
      // the user can see join, if canLeave is false AND the groups are loaded
      map(([loadedUserGroups, canLeave]) => !canLeave && loadedUserGroups)
    );
  }

  private showLeave(): Observable<boolean> {
    return combineLatest(this.loadedUserGroups$, this.canLeave$).pipe(
      map(([loadedUserGroups, canLeave]) => canLeave && loadedUserGroups)
    );
  }
}
