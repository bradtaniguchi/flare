import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule
} from '@angular/material';
import { SpinnerModule } from 'src/app/shared/spinner/spinner.module';
import { GroupListItemComponent } from './group-list-item/group-list-item.component';
import { GroupListRoutingModule } from './group-list-routing.module';
import { GroupListComponent } from './group-list.component';
import { FormSectionHeaderModule } from 'src/app/shared/form-section-header/form-section-header.module';

@NgModule({
  declarations: [GroupListComponent, GroupListItemComponent],
  imports: [
    CommonModule,
    GroupListRoutingModule,
    SpinnerModule,
    FormSectionHeaderModule,
    // angular material
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class GroupListModule {}
