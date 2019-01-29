import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormControl, NgForm } from '@angular/forms';
import { Roles } from 'src/app/config/roles';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-role-list-field',
  template: `
    <mat-form-field appearance="outline" class="full-width">
      <mat-label>Role</mat-label>
      <mat-select
        [value]="role"
        [formControl]="control"
        required
        matInput
        name="role"
        [compareWith]="compareWith"
      >
        <mat-option [value]="role" *ngFor="let role of roles">
          {{ role.type }}
        </mat-option>
      </mat-select>
    </mat-form-field>
  `,
  styles: [],
  // changeDetection: ChangeDetectionStrategy.OnPush
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class RoleListFieldComponent implements OnInit {
  @Input() role: Role;
  @Input() control: FormControl;
  public roles: Role[];
  constructor() {}

  ngOnInit() {
    this.roles = Roles;
  }

  compareWith(role1: Role, role2: Role) {
    return role1.type === role2.type;
  }
}
