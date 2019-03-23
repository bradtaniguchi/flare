import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupEditRoutingModule } from './group-edit-routing.module';
import { GroupEditComponent } from './group-edit.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material';
import { GroupFormModule } from 'src/app/shared/group-form/group-form.module';
import { DeckListFieldModule } from 'src/app/shared/deck-list-field/deck-list-field.module';
import { SpinnerModule } from 'src/app/shared/spinner/spinner.module';

@NgModule({
  declarations: [GroupEditComponent],
  imports: [
    CommonModule,
    GroupEditRoutingModule,
    GroupFormModule,
    DeckListFieldModule,
    SpinnerModule,
    // angular material
    FlexLayoutModule,
    MatButtonModule
  ]
})
export class GroupEditModule {}
