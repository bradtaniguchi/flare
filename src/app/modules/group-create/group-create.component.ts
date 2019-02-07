import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { AppState } from 'src/app/app-store/app-state';
import { SetLoading } from 'src/app/app-store/loading/loading.actions';
import { Notify } from 'src/app/app-store/notify/notify.actions';
import { ADMIN_ROLE, EDITOR_ROLE } from 'src/app/config/roles';
import { GroupService } from 'src/app/core/services/group/group.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-group-create',
  template: `
    <div class="view-container-padding">
      <form [formGroup]="form" (submit)="submit(form)">
        <section fxLayout="column">
          <app-group-name [control]="form.get('name')" [group]="group">
          </app-group-name>
          <app-group-description
            [control]="form.get('description')"
            [group]="group"
          >
          </app-group-description>
        </section>
        <section fxLayout="column">
          <!-- select the user to add here -->
          <app-form-section-header
            description="The users and roles to add, you can do this later"
            header="Users"
          >
          </app-form-section-header>
          <app-user-list-field
            [control]="form.get('_user')"
            (optionSelected)="addUser($event)"
          ></app-user-list-field>
          <!-- list of users to select -->
          <ng-container
            *ngFor="let formGroup of userControls"
            [formGroup]="formGroup"
          >
            <app-user-and-role
              [formGroup]="formGroup"
              [user]="user"
              (remove)="removeUser($event)"
            >
            </app-user-and-role>
          </ng-container>
        </section>
        <section fxLayout="row" fxLayoutAlign="end">
          <button type="button" mat-button (click)="back()">Back</button>
          <button type="submit" mat-button color="primary">Submit</button>
        </section>
      </form>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupCreateComponent implements OnInit {
  public group = {};
  public form: FormGroup;
  public user: User;
  public userControls: FormGroup[];
  constructor(
    private store: Store<AppState>,
    private groupService: GroupService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.user = this.route.snapshot.data.user;
    this.form = this.buildForm();
    this.userControls = (this.form.get('users') as FormArray)
      .controls as FormGroup[];
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      name: this.fb.control('', [Validators.required]),
      description: this.fb.control(''),
      _user: this.fb.control(undefined),
      users: this.fb.array([this.createUserGroup(this.user, true)])
    });
  }
  /**
   * @param user the user to add to the creation of the group.
   */
  private createUserGroup(user: User, isAdmin?: boolean): FormGroup {
    return this.fb.group({
      // this wont actually be a formField
      user: this.fb.control(user),
      role: this.fb.control(isAdmin ? ADMIN_ROLE : EDITOR_ROLE, [
        Validators.required
      ])
    });
  }
  /**
   * Adds the given user to the list of users to add
   * @param user the user to add to the form of selected users
   */
  addUser(user: User) {
    const users = this.form.get('users') as FormArray;
    users.push(this.createUserGroup(user));
    // clear the selected user
    const userControl = this.form.get('_user');
    userControl.setValue(undefined);
  }

  removeUser(group: FormGroup) {
    const users = this.form.get('users') as FormArray;
    const index = users.controls.indexOf(group);
    if (index > -1) {
      users.controls.splice(index, 1);
    }
  }

  back() {
    this.location.back();
  }

  submit(form: FormGroup) {
    if (form.valid) {
      this.store.dispatch(new SetLoading(true));
      this.groupService
        .create(form.value, this.user)
        .pipe(take(1))
        .subscribe(
          () => {
            this.store.dispatch(
              new Notify({ message: 'Successfully created group' })
            );
            this.router.navigate(['/']);
          },
          () =>
            this.store.dispatch(new Notify({ message: 'Error created group' })),
          () => this.store.dispatch(new SetLoading(false))
        );
    }
  }
}
