import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule
} from '@angular/material';
import { UserPipeModule } from '../user-pipe/user-pipe.module';
import { GroupDescriptionComponent } from './group-description/group-description.component';
import { GroupNameComponent } from './group-name/group-name.component';
import { UserAndRoleComponent } from './user-and-role/user-and-role.component';
import { RoleListFieldModule } from '../role-list-field/role-list-field.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DisplayFieldModule } from '../display-field/display-field.module';

@NgModule({
  declarations: [
    GroupDescriptionComponent,
    GroupNameComponent,
    UserAndRoleComponent
  ],
  imports: [
    CommonModule,
    UserPipeModule,
    RoleListFieldModule,
    DisplayFieldModule,
    // angular
    FormsModule,
    ReactiveFormsModule,
    // angular material
    FlexLayoutModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [GroupDescriptionComponent, GroupNameComponent, UserAndRoleComponent]
})
export class GroupFormModule {}
