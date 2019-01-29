import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupCreateRoutingModule } from './group-create-routing.module';
import { GroupCreateComponent } from './group-create.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material';
import { GroupFormModule } from 'src/app/shared/group-form/group-form.module';
import { UserListFieldModule } from 'src/app/shared/user-list-field/user-list-field.module';
import { FormSectionHeaderModule } from 'src/app/shared/form-section-header/form-section-header.module';

@NgModule({
  declarations: [GroupCreateComponent],
  imports: [
    CommonModule,
    GroupCreateRoutingModule,
    GroupFormModule,
    UserListFieldModule,
    FormSectionHeaderModule,
    // angular
    FormsModule,
    ReactiveFormsModule,
    // angular material
    MatButtonModule,
    FlexLayoutModule
  ]
})
export class GroupCreateModule {}
