import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeckCreateRoutingModule } from './deck-create-routing.module';
import { DeckCreateComponent } from './deck-create.component';
import { DeckFormModule } from 'src/app/shared/deck-form/deck-form.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GroupListFieldModule } from 'src/app/shared/group-list-field/group-list-field.module';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { DeckCreateCardComponent } from './deck-create-card/deck-create-card.component';
import { CardFormModule } from 'src/app/shared/card-form/card-form.module';

@NgModule({
  declarations: [DeckCreateComponent, DeckCreateCardComponent],
  imports: [
    CommonModule,
    DeckCreateRoutingModule,
    DeckFormModule,
    CardFormModule,
    GroupListFieldModule,
    // angular
    FormsModule,
    ReactiveFormsModule,
    // angular material
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule
  ]
})
export class DeckCreateModule {}
