import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { ControlContainer, FormControl, NgForm } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  takeUntil
} from 'rxjs/operators';
import { AppState } from 'src/app/app-store/app-state';
import { SearchUsers } from 'src/app/app-store/user/user.actions';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-list-field',
  template: `
    <mat-form-field appearance="outline" class="full-width">
      <mat-label>User Name</mat-label>
      <input
        matInput
        [matAutocomplete]="auto"
        [value]="user"
        [formControl]="control"
        (blur)="blur()"
      />
      <mat-autocomplete
        #auto="matAutocomplete"
        [displayWith]="displayWith"
        (optionSelected)="optionSelected.emit(this.control.value)"
      >
        <mat-option [value]="user" *ngFor="let user of (users$ | async)">
          {{ user.displayName }}
        </mat-option>
      </mat-autocomplete>
      <mat-progress-spinner
        matSuffix
        [diameter]="25"
        mode="indeterminate"
        *ngIf="(usersLoading$ | async)"
      ></mat-progress-spinner>
      <mat-hint align="end">Search a user to add</mat-hint>
    </mat-form-field>
  `,
  styles: [],
  // changeDetection: ChangeDetectionStrategy.OnPush
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class UserListFieldComponent implements OnInit, OnDestroy {
  @Input() user: User;
  @Input() control: FormControl;
  @Output() optionSelected = new EventEmitter();
  public users$: Observable<User[]>;
  public usersLoading$: Observable<boolean>;
  private takeUntil = new Subject();
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.users$ = this.store.pipe(select(state => state.users.users));
    this.usersLoading$ = this.store.pipe(
      select(state => state.users.usersLoading)
    );
    this.control.valueChanges
      .pipe(
        filter((str: string) => str.length > 3),
        map(str => str.toLowerCase()),
        debounceTime(150),
        distinctUntilChanged(),
        takeUntil(this.takeUntil)
      )
      .subscribe(str => this.change(str));
  }
  ngOnDestroy() {
    this.takeUntil.next();
    this.takeUntil.unsubscribe();
  }

  displayWith(user: User) {
    return user && user.displayName ? user.displayName : '';
  }

  change(str: string) {
    this.store.dispatch(new SearchUsers(str));
  }

  blur() {
    if (typeof this.control.value !== 'object') {
      this.control.setValue({});
    }
  }
}
