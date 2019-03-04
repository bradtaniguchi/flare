import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeckEditRoutingModule } from './deck-edit-routing.module';
import { DeckEditComponent } from './deck-edit.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeckFormModule } from 'src/app/shared/deck-form/deck-form.module';
import { CardFormModule } from 'src/app/shared/card-form/card-form.module';
import { GroupListFieldModule } from 'src/app/shared/group-list-field/group-list-field.module';
import { MatButtonModule } from '@angular/material';
import { FormSectionHeaderModule } from 'src/app/shared/form-section-header/form-section-header.module';

@NgModule({
  declarations: [DeckEditComponent],
  imports: [
    CommonModule,
    DeckEditRoutingModule,
    DeckFormModule,
    CardFormModule,
    GroupListFieldModule,
    FormSectionHeaderModule,
    // forms
    FormsModule,
    ReactiveFormsModule,
    // angular material
    FlexLayoutModule,
    MatButtonModule
  ]
})
export class DeckEditModule {}
