import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  EventEmitter,
  Output
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-and-role',
  template: `
    <div fxLayout="row" fxLayoutGap="8px">
      <app-display-field fxFlex="49">
        <app-display-field-label> User </app-display-field-label>
        {{ formGroup.get('user').value | user }}
      </app-display-field>
      <div fxFlex="49">
        <app-role-list-field
          [role]="formGroup.get('role').value"
          [control]="formGroup.get('role')"
        >
        </app-role-list-field>
      </div>
      <div fxFlex fxLayoutAlign="center center" fxLayout="column">
        <button
          type="button"
          mat-icon-button
          style="margin-bottom: 20px"
          (click)="remove.emit(formGroup)"
          [disabled]="isDisabled()"
        >
          <mat-icon>close</mat-icon>
        </button>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserAndRoleComponent implements OnInit {
  /**
   * The current user using the form
   */
  @Input() user: User;
  /**
   * The user we are "looking at"
   */
  @Input() formGroup: FormGroup;

  @Output() remove = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  /**
   * Returns disabled if the user given is the user is the same as the user within the role
   */
  public isDisabled(): boolean {
    return this.user === this.formGroup.value.user;
  }
}
